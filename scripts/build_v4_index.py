#!/usr/bin/env python3
"""
v4.0 index builder — DRAFT.

Reads anchor-year raw prices from data/v4/*.csv, log-linearly interpolates
to an annual 1990-2025 series, aggregates with weighted GEOMETRIC means
(sub-series -> computing sector; sectors -> master), and prints a
comparison against the published v3 values and the arithmetic sensitivity.

Refuses to claim final output while any anchor row is status=to_verify.

Usage: python3 scripts/build_v4_index.py
"""
import csv
import math
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
V4 = ROOT / 'data' / 'v4'

YEARS = list(range(1990, 2026))

# Component weights within computing (unchanged from v3 methodology)
COMPUTING_WEIGHTS = {'computing_power': 0.6, 'storage': 0.3, 'memory': 0.1}
# Sector weights (unchanged from v3.1.x)
SECTOR_WEIGHTS = {'computing': 0.2941, 'communications': 0.2353,
                  'energy': 0.2941, 'transportation': 0.1765}


def load_anchors(name):
    """Statuses: verified (primary) / cross_checked (cited secondary) /
    interpolated / to_verify. Only 'verified' counts as final."""
    rows = []
    counts = {}
    with open(V4 / f'{name}.csv') as f:
        for r in csv.DictReader(f):
            price_col = [k for k in r if k.startswith('usd_per')][0]
            rows.append((int(r['year']), float(r[price_col])))
            s = r['status'].strip()
            counts[s] = counts.get(s, 0) + 1
    rows.sort()
    return rows, counts


def log_interp(anchors, years):
    """Log-linear interpolation between anchor years; flat extrapolation."""
    out = {}
    for y in years:
        if y <= anchors[0][0]:
            out[y] = anchors[0][1]
            continue
        if y >= anchors[-1][0]:
            out[y] = anchors[-1][1]
            continue
        for (y0, v0), (y1, v1) in zip(anchors, anchors[1:]):
            if y0 <= y <= y1:
                t = (y - y0) / (y1 - y0)
                out[y] = math.exp(math.log(v0) + t * (math.log(v1) - math.log(v0)))
                break
    return out


def rebase(series, base_year=1990):
    base = series[base_year]
    return {y: 100.0 * v / base for y, v in series.items()}


def geometric(indices, weights):
    """Weighted geometric mean of index dicts (same keys)."""
    out = {}
    for y in YEARS:
        out[y] = math.exp(sum(w * math.log(indices[k][y]) for k, w in weights.items()))
    return out


def arithmetic(indices, weights):
    out = {}
    for y in YEARS:
        out[y] = sum(w * indices[k][y] for k, w in weights.items())
    return out


def cagr(index_2025_base100, years=35):
    return (math.exp(math.log(index_2025_base100 / 100.0) / years) - 1) * 100


def main():
    status_totals = {}
    sub_indices = {}
    for name in COMPUTING_WEIGHTS:
        anchors, counts = load_anchors(name)
        for s, n in counts.items():
            status_totals[s] = status_totals.get(s, 0) + n
        sub_indices[name] = rebase(log_interp(anchors, YEARS))
    total_unverified = sum(n for s, n in status_totals.items() if s != 'verified')

    comp_geo = geometric(sub_indices, COMPUTING_WEIGHTS)
    comp_arith = arithmetic(sub_indices, COMPUTING_WEIGHTS)

    # v3 sector series for the other three sectors (from src/data.js, 1990=100).
    # These carry their own pending anchor audits — see the audit memo.
    data_js = (ROOT / 'src' / 'data.js').read_text()

    def extract(name):
        start = data_js.index(f'const {name} = [') + len(f'const {name} = [')
        end = data_js.index('];', start)
        vals = [float(x) for x in
                data_js[start:end].replace('\n', ' ').split('//')[0].split(',')
                if x.strip() and not x.strip().startswith('/')]
        # arrays include inline comments; fall back to json-ish parse
        return vals

    def extract_array(name):
        import re
        start = data_js.index(f'const {name} = [')
        end = data_js.index('];', start)
        body = data_js[start:end]
        body = re.sub(r'//.*', '', body)
        nums = re.findall(r'-?\d+\.?\d*(?:[eE]-?\d+)?', body)
        return [float(n) for n in nums]

    v3 = {
        'communications': extract_array('communications'),
        'energy': extract_array('energy'),
        'transportation': extract_array('transportation'),
        'computing_v3': extract_array('computing'),
    }
    # Communications v4: wholesale IP transit (input-layer decision 2026-07-13).
    # Series starts 1998; flat-at-100 before its first anchor (log_interp
    # extends the first anchor backward, so the rebased index is 100 until
    # 1998 — same late-start convention as transportation/2010).
    def load_v4_sector(csv_name):
        anchors, counts = load_anchors(csv_name)
        for s, n in counts.items():
            status_totals[s] = status_totals.get(s, 0) + n
        return rebase(log_interp(anchors, YEARS))

    # v4 single-metric sectors. Late-start convention (flat at 100 before the
    # first anchor — log_interp extends the first anchor backward):
    #   communications 1998 (commercial IP transit market begins)
    #   energy 2010 (IRENA RPGC coverage begins; drops the synthetic 1990s glide)
    #   transportation 2010 (BNEF pack survey begins; unchanged from v3 framing)
    comms_v4 = load_v4_sector('comms_transit')
    energy_v4 = load_v4_sector('energy_solar')
    transport_v4 = load_v4_sector('transportation_battery')

    sector_indices = {
        'computing': comp_geo,
        'communications': comms_v4,
        'energy': energy_v4,
        'transportation': transport_v4,
    }

    master_geo = geometric(sector_indices, SECTOR_WEIGHTS)
    master_arith = arithmetic(sector_indices, SECTOR_WEIGHTS)

    print('=' * 76)
    print('v4.0 DRAFT INDEX — geometric aggregation, rebuilt computing anchors')
    print('=' * 76)
    if total_unverified:
        breakdown = ', '.join(f'{n} {s}' for s, n in sorted(status_totals.items()))
        print(f'\n*** DRAFT: anchor status — {breakdown} (final requires all verified) ***\n')

    print('Computing sector (1990=100):')
    print(f'{"year":>6} {"v4 geometric":>14} {"v4 arithmetic":>14} {"v3 published":>14}')
    v3c = {y: v3['computing_v3'][y - 1990] for y in YEARS}
    for y in [1990, 2000, 2010, 2020, 2024, 2025]:
        print(f'{y:>6} {comp_geo[y]:>14.3e} {comp_arith[y]:>14.4f} {v3c[y]:>14.4f}')
    print(f'\nComputing CAGR 1990-2025: v4 geometric {cagr(comp_geo[2025]):.1f}%/yr '
          f'| v4 arithmetic {cagr(comp_arith[2025]):.1f}%/yr '
          f'| v3 published {cagr(v3c[2025]):.1f}%/yr')

    print('\nMaster DI (1990=100):')
    print(f'{"year":>6} {"v4 geometric":>14} {"v4 arithmetic":>14}')
    for y in [1990, 2000, 2010, 2020, 2024, 2025]:
        print(f'{y:>6} {master_geo[y]:>14.4f} {master_arith[y]:>14.4f}')
    print(f'\nMaster cumulative 1990-2025: geometric {master_geo[2025]-100:.3f}% '
          f'| arithmetic {master_arith[2025]-100:.2f}% | v3 published -96.52%')
    print(f'Master CAGR: geometric {cagr(master_geo[2025]):.1f}%/yr '
          f'| arithmetic {cagr(master_arith[2025]):.1f}%/yr | v3 published -9.2%/yr')

    print('\nSector indices, v4 vs v3 (1990=100):')
    print(f'{"":>16} {"2010":>10} {"2020":>10} {"2025":>10}   start')
    v3map = {'communications': 'communications', 'energy': 'energy', 'transportation': 'transportation'}
    starts = {'computing': 1990, 'communications': 1998, 'energy': 2010, 'transportation': 2010}
    for k in ['computing', 'communications', 'energy', 'transportation']:
        s = sector_indices[k]
        print(f'{k:>16} {s[2010]:>10.4g} {s[2020]:>10.4g} {s[2025]:>10.4g}   {starts[k]}')
        if k in v3map:
            v = {y: v3[v3map[k]][y - 1990] for y in YEARS}
            print(f'{"(v3)":>16} {v[2010]:>10.4g} {v[2020]:>10.4g} {v[2025]:>10.4g}')

    print('\nAll four sectors now run on v4 single-metric series.')
    print('Late-start sectors hold flat at 100 before their first datapoint,')
    print('so early-period master deflation is driven by computing alone —')
    print('the honest, defensible reading.')

    def cum(idx):  # cumulative % change from 1990 base
        return round(idx - 100.0, 4)

    def rate(idx, years_n):  # CAGR % over years_n
        return round((math.exp(math.log(idx / 100.0) / years_n) - 1) * 100, 2)

    out = {
        'status': 'draft' if total_unverified else 'anchors_verified',
        'status_breakdown': status_totals,
        'sector_series': {k: {y: round(v[y], 8) for y in YEARS} for k, v in sector_indices.items()},
        'master_geometric': {y: round(master_geo[y], 6) for y in YEARS},
        'master_arithmetic_sensitivity': {y: round(master_arith[y], 4) for y in YEARS},
        'computing_arithmetic_sensitivity': {y: round(comp_arith[y], 6) for y in YEARS},
        'headline': {
            'di_2025': round(master_geo[2025], 4),
            'di_cumulative_pct_2025': cum(master_geo[2025]),
            'di_annual_pct': rate(master_geo[2025], 35),
            'di_2024': round(master_geo[2024], 4),
            'sector_2025': {k: round(sector_indices[k][2025], 8) for k in sector_indices},
            'sector_cagr': {
                'computing': rate(sector_indices['computing'][2025], 35),
                'communications': rate(100 * sector_indices['communications'][2025] /
                                       sector_indices['communications'][1998], 27),
                'energy': rate(100 * sector_indices['energy'][2025] /
                               sector_indices['energy'][2010], 15),
                'transportation': rate(100 * sector_indices['transportation'][2025] /
                                       sector_indices['transportation'][2010], 15),
            },
        },
    }
    (V4 / 'draft_output.json').write_text(json.dumps(out, indent=1))
    print(f'\nWrote data/v4/draft_output.json ({out["status"]})')


if __name__ == '__main__':
    main()
