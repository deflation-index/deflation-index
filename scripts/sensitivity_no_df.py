#!/usr/bin/env python3
"""
Sensitivity: master index with the DEFLATIONARY-FORCE weighting factor removed.

The published v4.0 sector weights balance three factors (WEIGHT_JUSTIFICATION.md):
GDP contribution, enabling effect, and deflationary force. The third factor is
the magnitude of a sector's cost decline — i.e. the index is partly weighted by
the thing it measures. This script sizes that circularity.

Construction of the no-DF weights: WEIGHT_JUSTIFICATION.md documents the
single-factor weight vectors. Removing deflationary force and redistributing
its share equally across the two remaining factors is equivalent to an equal
blend of the GDP-only and enabling-only vectors:

    GDP-contribution only:  computing 30, communications  5, energy 40, transportation 25
    Enabling-effect only:   computing 40, communications 30, energy 20, transportation 10
    Equal blend (no-DF):    computing 35, communications 17.5, energy 30, transportation 17.5

Everything else — sector series, geometric aggregation, late-start convention —
is identical to the published v4.0 build (scripts/build_v4_index.py).

Writes data/v4/sensitivity_no_df.json and prints the comparison.

Usage: python3 scripts/sensitivity_no_df.py
"""
import csv
import math
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
V4 = ROOT / 'data' / 'v4'

YEARS = list(range(1990, 2026))

COMPUTING_WEIGHTS = {'computing_power': 0.6, 'storage': 0.3, 'memory': 0.1}

PUBLISHED_WEIGHTS = {'computing': 0.2941, 'communications': 0.2353,
                     'energy': 0.2941, 'transportation': 0.1765}

# Single-factor vectors as documented in docs/methodology/WEIGHT_JUSTIFICATION.md
GDP_ONLY = {'computing': 0.30, 'communications': 0.05,
            'energy': 0.40, 'transportation': 0.25}
ENABLING_ONLY = {'computing': 0.40, 'communications': 0.30,
                 'energy': 0.20, 'transportation': 0.10}
NO_DF_WEIGHTS = {k: (GDP_ONLY[k] + ENABLING_ONLY[k]) / 2 for k in GDP_ONLY}


def load_anchors(name):
    rows = []
    with open(V4 / f'{name}.csv') as f:
        for r in csv.DictReader(f):
            price_col = [k for k in r if k.startswith('usd_per')][0]
            rows.append((int(r['year']), float(r[price_col])))
    rows.sort()
    return rows


def log_interp(anchors, years):
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
    return {y: math.exp(sum(w * math.log(indices[k][y]) for k, w in weights.items()))
            for y in YEARS}


def cagr(index_2025_base100, years=35):
    return (math.exp(math.log(index_2025_base100 / 100.0) / years) - 1) * 100


def main():
    sub = {name: rebase(log_interp(load_anchors(name), YEARS))
           for name in COMPUTING_WEIGHTS}
    comp_geo = geometric(sub, COMPUTING_WEIGHTS)

    sectors = {
        'computing': comp_geo,
        'communications': rebase(log_interp(load_anchors('comms_transit'), YEARS)),
        'energy': rebase(log_interp(load_anchors('energy_solar'), YEARS)),
        'transportation': rebase(log_interp(load_anchors('transportation_battery'), YEARS)),
    }

    published = geometric(sectors, PUBLISHED_WEIGHTS)
    no_df = geometric(sectors, NO_DF_WEIGHTS)

    print('Weights:')
    for k in PUBLISHED_WEIGHTS:
        print(f'  {k:>16}: published {PUBLISHED_WEIGHTS[k]:.4f} | no-DF {NO_DF_WEIGHTS[k]:.4f}')
    print()
    print(f'{"":>12} {"published":>14} {"no-DF":>14}')
    for y in [1990, 2000, 2010, 2020, 2025]:
        print(f'{y:>12} {published[y]:>14.4f} {no_df[y]:>14.4f}')
    print()
    pub_cum, pub_ann = published[2025] - 100, cagr(published[2025])
    ndf_cum, ndf_ann = no_df[2025] - 100, cagr(no_df[2025])
    print(f'Published (v4.0):  cumulative {pub_cum:.3f}%  annual {pub_ann:.2f}%/yr')
    print(f'No-DF variant:     cumulative {ndf_cum:.3f}%  annual {ndf_ann:.2f}%/yr')

    out = {
        'description': 'Sensitivity: v4.0 master geometric index recomputed with the '
                       'deflationary-force weighting factor removed. No-DF weights are the '
                       'equal blend of the GDP-contribution-only and enabling-effect-only '
                       'vectors documented in docs/methodology/WEIGHT_JUSTIFICATION.md. '
                       'Sector series identical to the published build.',
        'weights_published': PUBLISHED_WEIGHTS,
        'weights_no_df': NO_DF_WEIGHTS,
        'master_no_df': {y: round(no_df[y], 6) for y in YEARS},
        'headline': {
            'published_cumulative_pct_2025': round(pub_cum, 3),
            'published_annual_pct': round(pub_ann, 2),
            'no_df_cumulative_pct_2025': round(ndf_cum, 3),
            'no_df_annual_pct': round(ndf_ann, 2),
        },
    }
    (V4 / 'sensitivity_no_df.json').write_text(json.dumps(out, indent=1))
    print(f'\nWrote data/v4/sensitivity_no_df.json')


if __name__ == '__main__':
    main()
