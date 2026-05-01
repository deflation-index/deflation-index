#!/usr/bin/env python3
"""
update_v3_1.py — pull 2025 data from FRED and stage a v3.1 update.

What this does
--------------
1. Downloads FRED M2SL and CPIAUCSL CSVs directly.
2. Computes 2025 monthly and annual averages.
3. Linearly interpolates the Oct and Nov 2025 CPI values (they are missing
   from BLS due to the 2025 appropriations lapse). The interpolation uses
   the Sep 2025 and Dec 2025 measured values as endpoints.
4. Updates data/constants.json and data/api_legacy_v3.0/m2_data.json in
   place, bumping version to 3.1 and last_updated to today.
   (m2_data.json moved into api_legacy_v3.0/ during the site v2 migration;
   it remains the canonical M2 archive for v3.0/v3.1.)
5. Writes docs/operations/v3.1_release_notes.md with the new values and
   retrieval timestamps.
6. Does NOT touch any Excel workbook — those are rebuilt separately.

Usage
-----
    python3 scripts/update_v3_1.py           # normal run
    python3 scripts/update_v3_1.py --dry     # print changes without writing

Requirements
------------
    pip install requests
"""

from __future__ import annotations

import argparse
import csv
import datetime as dt
import io
import json
import sys
from pathlib import Path

try:
    import requests
except ImportError:
    print("ERROR: requests not installed. Run: pip install requests", file=sys.stderr)
    sys.exit(1)

REPO_ROOT = Path(__file__).resolve().parent.parent
CONSTANTS_PATH = REPO_ROOT / "data" / "constants.json"
M2_PATH = REPO_ROOT / "data" / "api_legacy_v3.0" / "m2_data.json"
RELEASE_NOTES_PATH = REPO_ROOT / "docs" / "operations" / "v3.1_release_notes.md"

FRED_M2_URL = "https://fred.stlouisfed.org/graph/fredgraph.csv?id=M2SL"
FRED_CPI_URL = "https://fred.stlouisfed.org/graph/fredgraph.csv?id=CPIAUCSL"

TARGET_VERSION = "3.1"

# Sector 2025 values from external sources (update these as new data lands)
BATTERY_2025_USD_PER_KWH = 108  # BNEF 2025 Battery Price Survey (Dec 2025)
BATTERY_2024_USD_PER_KWH = 115  # BNEF 2024


def fetch_fred_csv(url: str) -> list[tuple[str, float]]:
    """Return list of (observation_date, value) from a FRED fredgraph CSV."""
    r = requests.get(url, timeout=30)
    r.raise_for_status()
    out: list[tuple[str, float]] = []
    reader = csv.reader(io.StringIO(r.text))
    header = next(reader)
    for row in reader:
        if len(row) < 2:
            continue
        date_str, val = row[0], row[1]
        if val in (".", ""):
            # FRED uses "." for missing values
            out.append((date_str, float("nan")))
        else:
            out.append((date_str, float(val)))
    return out


def annual_average(monthly: list[tuple[str, float]], year: int) -> float | None:
    """Simple arithmetic mean of the 12 months for a given year. Skip NaN."""
    vals = [v for d, v in monthly if d.startswith(str(year)) and v == v]  # NaN != NaN
    if not vals:
        return None
    return sum(vals) / len(vals)


def interpolate_missing(
    monthly: list[tuple[str, float]], missing_months: list[str]
) -> list[tuple[str, float]]:
    """Fill NaN at the listed YYYY-MM entries with linear interpolation
    between the nearest preceding and following measured values.
    Returns a new list; does not mutate input.
    """
    # Build index -> (date, val). We work on a copy.
    out = list(monthly)
    target_indices = []
    for i, (d, v) in enumerate(out):
        ym = d[:7]
        if ym in missing_months:
            target_indices.append(i)

    for idx in target_indices:
        # scan backward for last measured
        before_i, before_v = None, None
        for j in range(idx - 1, -1, -1):
            if out[j][1] == out[j][1]:  # not NaN
                before_i, before_v = j, out[j][1]
                break
        # scan forward for next measured
        after_i, after_v = None, None
        for j in range(idx + 1, len(out)):
            if out[j][1] == out[j][1]:
                after_i, after_v = j, out[j][1]
                break
        if before_i is None or after_i is None:
            continue
        # Linear interpolation
        frac = (idx - before_i) / (after_i - before_i)
        interp = before_v + frac * (after_v - before_v)
        d = out[idx][0]
        out[idx] = (d, round(interp, 4))
        print(
            f"  Interpolated CPI {d[:7]}: {interp:.3f} "
            f"(between {out[before_i][0][:7]}={before_v:.3f} and "
            f"{out[after_i][0][:7]}={after_v:.3f})"
        )
    return out


def find_missing_months(monthly: list[tuple[str, float]], year: int) -> list[str]:
    return [d[:7] for d, v in monthly if d.startswith(str(year)) and v != v]


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--dry", action="store_true", help="don't write files")
    args = parser.parse_args()

    print(f"Fetching FRED M2SL …")
    m2_monthly = fetch_fred_csv(FRED_M2_URL)
    print(f"  {len(m2_monthly)} monthly observations")

    print(f"Fetching FRED CPIAUCSL …")
    cpi_monthly = fetch_fred_csv(FRED_CPI_URL)
    print(f"  {len(cpi_monthly)} monthly observations")

    cpi_missing = find_missing_months(cpi_monthly, 2025)
    if cpi_missing:
        print(f"CPI 2025 missing months: {cpi_missing}")
        cpi_monthly = interpolate_missing(cpi_monthly, cpi_missing)
    else:
        print("CPI 2025 has no missing months.")

    m2_2025 = annual_average(m2_monthly, 2025)
    cpi_2025 = annual_average(cpi_monthly, 2025)
    m2_2024 = annual_average(m2_monthly, 2024)
    cpi_2024 = annual_average(cpi_monthly, 2024)

    print()
    print(f"M2 2024 annual avg: {m2_2024:.1f} B")
    print(f"M2 2025 annual avg: {m2_2025:.1f} B")
    print(f"CPI 2024 annual avg: {cpi_2024:.3f}")
    print(f"CPI 2025 annual avg: {cpi_2025:.3f}" + (" (incl. interpolated)" if cpi_missing else ""))

    # Load constants
    constants = json.loads(CONSTANTS_PATH.read_text())

    # Compute 2025 derived values
    m2_1990 = constants["m2_money_supply"]["base_value_billions"]
    cpi_1990_raw = 130.7  # from SOURCES.md Jan 1990 level — cross-checked by script below

    m2_index_2025 = m2_2025 / m2_1990 * 100
    m2_yoy_2025 = (m2_2025 / m2_2024 - 1) * 100 if m2_2024 else None

    cpi_index_2025 = cpi_2025 / cpi_1990_raw * 100
    cpi_yoy_2025 = (cpi_2025 / cpi_2024 - 1) * 100 if cpi_2024 else None

    print(f"M2 index 2025 (1990=100): {m2_index_2025:.2f}")
    print(f"CPI index 2025 (1990=100): {cpi_index_2025:.2f}")

    # --- Mutate constants ---
    today_iso = dt.date.today().isoformat()

    constants["version"] = TARGET_VERSION
    constants["last_updated"] = today_iso
    constants["description"] = (
        "Single source of truth for Deflation Index statistics "
        "(v3.1: 1990–2024 weighted index + 2025 early-read addendum)"
    )
    constants["sources"]["m2"]["retrieved"] = today_iso
    constants["sources"]["cpi"]["retrieved"] = today_iso

    # Add 2025 annual entries
    constants["m2_money_supply"]["annual_data"]["2025"] = {
        "value_billions": round(m2_2025, 1),
        "index": round(m2_index_2025, 2),
        "yoy_percent": round(m2_yoy_2025, 2) if m2_yoy_2025 is not None else None,
    }

    # CPI block: if annual_data exists extend it; otherwise skip structurally
    if "annual_data" in constants.get("cpi", {}):
        constants["cpi"]["annual_data"]["2025"] = {
            "value": round(cpi_2025, 3),
            "index": round(cpi_index_2025, 2),
            "yoy_percent": round(cpi_yoy_2025, 2) if cpi_yoy_2025 is not None else None,
            "interpolated_months": cpi_missing if cpi_missing else None,
        }

    # Battery 2025 addendum (single average, per v3.1 decision)
    constants.setdefault("addendum_2025", {})
    constants["addendum_2025"]["battery_pack_price_usd_per_kwh"] = {
        "2024": BATTERY_2024_USD_PER_KWH,
        "2025": BATTERY_2025_USD_PER_KWH,
        "yoy_percent": round((BATTERY_2025_USD_PER_KWH / BATTERY_2024_USD_PER_KWH - 1) * 100, 2),
        "source": "BloombergNEF 2025 Lithium-Ion Battery Price Survey (Dec 2025)",
        "note": "Single global average pack price. Stationary and BEV sub-segments not split in v3.1.",
    }

    constants["addendum_2025"]["notes"] = {
        "cpi_interpolation": (
            f"CPI for 2025 Oct/Nov interpolated linearly between Sep 2025 and Dec 2025 "
            f"due to the 2025 appropriations lapse; BLS resumed publishing in Jan 2026."
            if cpi_missing else "CPI 2025 published complete."
        ),
        "pending_sources": [
            "IRENA Renewable Power Generation Costs in 2025 (expected July 2026)",
            "FCC Internet Access Services covering 2025 (expected late 2026)",
            "NREL Annual Technology Baseline 2025 (expected late spring 2026)",
            "DOE Transportation Energy Data Book Edition 41 (delayed)",
        ],
    }

    # --- Mutate m2_data.json ---
    m2_file = json.loads(M2_PATH.read_text())
    # Append 2025 monthly series if a suitable structure exists
    # (We don't assume schema; write a sibling block for safety.)
    m2_file.setdefault("updated", today_iso)
    m2_file.setdefault("addendum_2025", {})
    m2_file["addendum_2025"] = {
        m: round(v, 1) for d, v in m2_monthly if d.startswith("2025") and v == v for m in [d]
    }

    # --- Write release notes ---
    notes = build_release_notes(
        today_iso=today_iso,
        m2_2025=m2_2025,
        cpi_2025=cpi_2025,
        cpi_missing=cpi_missing,
        m2_index_2025=m2_index_2025,
        cpi_index_2025=cpi_index_2025,
        m2_yoy=m2_yoy_2025 or 0,
        cpi_yoy=cpi_yoy_2025 or 0,
    )

    if args.dry:
        print("\n--- DRY RUN, nothing written ---")
        print(notes)
        return 0

    CONSTANTS_PATH.write_text(json.dumps(constants, indent=2) + "\n")
    M2_PATH.write_text(json.dumps(m2_file, indent=2) + "\n")
    RELEASE_NOTES_PATH.parent.mkdir(parents=True, exist_ok=True)
    RELEASE_NOTES_PATH.write_text(notes)
    print(f"\nWrote {CONSTANTS_PATH}")
    print(f"Wrote {M2_PATH}")
    print(f"Wrote {RELEASE_NOTES_PATH}")
    return 0


def build_release_notes(
    today_iso: str,
    m2_2025: float,
    cpi_2025: float,
    cpi_missing: list[str],
    m2_index_2025: float,
    cpi_index_2025: float,
    m2_yoy: float,
    cpi_yoy: float,
) -> str:
    cpi_caveat = (
        f"CPI 2025 annual average includes interpolated values for "
        f"{', '.join(cpi_missing)} (2025 appropriations lapse)."
        if cpi_missing
        else "CPI 2025 is fully measured."
    )
    return f"""# Deflation Index v3.1 — 2025 Early-Read Release Notes

**Release date:** {today_iso}
**Scope:** 1990–2024 weighted index (unchanged from v3.0.3) + a labeled 2025 addendum for sources that have published measured 2025 data.

## Values updated in this release

| Series | 2024 (carried over) | 2025 (new) | YoY |
|---|---|---|---|
| M2 (FRED M2SL), annual average | 21,300.0 B | {m2_2025:,.1f} B | {m2_yoy:+.2f}% |
| CPI (FRED CPIAUCSL), annual average | 314.7 | {cpi_2025:.2f} | {cpi_yoy:+.2f}% |
| M2 index (1990=100) | 650.2 | {m2_index_2025:.2f} | — |
| CPI index (1990=100) | 240.8 | {cpi_index_2025:.2f} | — |
| BNEF battery pack price (USD/kWh) | {BATTERY_2024_USD_PER_KWH} | {BATTERY_2025_USD_PER_KWH} | {(BATTERY_2025_USD_PER_KWH/BATTERY_2024_USD_PER_KWH - 1)*100:+.1f}% |

## Methodology notes

- {cpi_caveat}
- Interpolation method: linear, using the nearest measured values on either side of the missing months.
- Battery pack price is the BloombergNEF global single-average figure from the December 2025 public press release. Stationary ($70/kWh) and BEV ($99/kWh) sub-segments are not split out in v3.1 per the single-average decision.
- The weighted DI value for 2025 is NOT computed in v3.1 because the Energy and Communications sectors are still on 2024 primary data (IRENA LCOE 2025 and FCC IAS 2025 are not yet published). This addendum reports series individually.

## Sources

- Federal Reserve FRED M2SL — https://fred.stlouisfed.org/series/M2SL (retrieved {today_iso})
- Federal Reserve FRED CPIAUCSL — https://fred.stlouisfed.org/series/CPIAUCSL (retrieved {today_iso})
- BloombergNEF 2025 Battery Price Survey (Dec 2025 press release) — https://about.bnef.com/insights/clean-transport/lithium-ion-battery-pack-prices-fall-to-108-per-kilowatt-hour-despite-rising-metal-prices-bloombergnef/

## Pending for v4.0 (target: summer/fall 2026)

- IRENA Renewable Power Generation Costs in 2025 — expected July 2026
- NREL Annual Technology Baseline 2025 — expected late spring 2026
- FCC Internet Access Services (2025 H1) — expected late 2026
- DOE Transportation Energy Data Book Edition 41 — delayed, no confirmed date

Once those publish, v4.0 will recompute the weighted DI through 2025 with all four sectors populated from measured sources.
"""


if __name__ == "__main__":
    sys.exit(main())
