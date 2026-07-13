# v4.0 Data Rebuild — Working Directory

**Status:** IN PROGRESS — draft data, not published. Nothing here feeds the live site until v4.0 ships.
**Spec:** [`docs/methodology/AUDIT_2026-07_COMPUTING_SERIES.md`](../../docs/methodology/AUDIT_2026-07_COMPUTING_SERIES.md)

## What v4.0 changes

1. Computing sub-series (compute, storage, memory) rebuilt from primary published sources with per-datapoint provenance.
2. Sector and master aggregation switch from weighted arithmetic to weighted **geometric** means (weights unchanged). Arithmetic published as a sensitivity variant.
3. 2025 becomes a measured index year (IRENA 2025 published 2026-07; FCC URS 2026 published 2025-12; BNEF and Epoch already measured).
4. Anchor audits for communications, energy, transportation.

## Source status (checked 2026-07-13)

| Series | Source | Status |
|---|---|---|
| Solar LCOE 2025 | IRENA Renewable Power Generation Costs in 2025 | **PUBLISHED 2026-07** — utility PV $44/MWh (≈flat vs 2024) |
| Broadband pricing 2025 | FCC 2026 Urban Rate Survey | **PUBLISHED 2025-12-19** — 100/20 benchmark ~$96/mo, up from $85.85 |
| Battery pack 2025 | BNEF Li-ion price survey | **PUBLISHED 2025-12** — $108/kWh pack, $99 BEV |
| AI compute 2025 | Epoch AI | **PUBLISHED** — ~−37%/yr price-performance |
| Compute $/GFLOPS history | AI Impacts / Nordhaus (2007) / Epoch | To collect + verify |
| Storage $/GB history | Komorowski (mkomo.com) 1990–2009 → Backblaze 2009+ | To collect + verify (mkomo data embedded in chart JS; scrape or transcribe) |
| Memory $/GB history | McCallum (jcmit.net) → DRAMeXchange | To collect + verify (jcmit blocks automated fetch; transcribe manually) |

Two flags from the 2025 measured data: solar LCOE was **flat** in 2025 and the FCC benchmark price **rose** — both softer than the v3.1.x early-read trend extrapolations, so expect the measured 2025 DI point to move modestly against the extrapolated 3.48.

## Files

- `sources_manifest.md` — every sub-series: source, URL, access method, verification status
- `computing_power.csv`, `storage.csv`, `memory.csv` — anchor-year raw prices. **Every row carries a `status` column**: `verified` (checked against the primary document) or `to_verify` (landmark value from the published record, pending primary-source confirmation). The build script refuses to mark output as final while any row is `to_verify`.
- `../../scripts/build_v4_index.py` — log-linear interpolation between anchors, geometric sub-series aggregation, geometric master; prints comparison against published v3 values and the arithmetic sensitivity

## Workflow

1. Fill/verify anchor rows in the CSVs (cite the exact document + page/figure in `source` column, flip `status` to `verified`).
2. `python3 scripts/build_v4_index.py` — recomputes everything, prints the comparison table.
3. When all rows are verified and the other sector audits are done, wire output into `data/constants.json` / `src/data.js` as v4.0, with changelog + essay.
