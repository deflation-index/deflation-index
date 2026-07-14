> **v4.0.0 (2026-07-13):** `data/master_index.json` is regenerated on the v4.0 geometric index (1990–2025, 4-decimal precision); `data/sectors.json` carries a superseded note and preserves v3 sector data. The v4 anchor ledger lives in [`data/v4/`](../../data/v4/sources_manifest.md).

# Programmatic Data Access

**Last updated:** July 2026

The Deflation Index does not currently expose a hosted HTTP API. All data is published as static files in this repository, refreshed on the same cadence as the site itself. For the vast majority of academic, journalism, and dashboard use cases, those files are sufficient — they're version-controlled, attributable, and free to consume directly.

This page is the canonical reference for what's available, what shape it's in, and how to cite it.

## Files you can read directly

| File | Format | Description |
|------|--------|-------------|
| [`data/constants.json`](../../data/constants.json) | JSON | Single source of truth: headline statistics, source URLs, retrieval dates, the 2025 measured block. |
| [`data/master_index.json`](../../data/master_index.json) | JSON | Computed weighted geometric Deflation Index 1990–2025, M2 index, year-over-year deltas, gap. Annual granularity. |
| [`data/sectors.json`](../../data/sectors.json) | JSON | Per-sector series (computing, communications, energy, transportation) with metadata, weights, and source citations. |
| [`data/excel/master_deflation_index_v3.0.3.xlsx`](../../data/excel/master_deflation_index_v3.0.3.xlsx) | Excel | Multi-factor weighted index workbook with all formulas exposed. |
| [`data/excel/master_deflation_index_v3.0.3_EQUAL.xlsx`](../../data/excel/master_deflation_index_v3.0.3_EQUAL.xlsx) | Excel | Equal-weighted baseline workbook. |
| [`data/excel/{sector}_deflation_index_v1.0.xlsx`](../../data/excel/) | Excel | Per-sector workbooks (computing, communications, energy, transportation). |
| [`data/api_legacy_v3.0/`](../../data/api_legacy_v3.0/) | JSON | Frozen v3.0 JSON API contract preserved for compatibility with anyone who linked the old paths. |

The schemas are stable across patch releases. Breaking shape changes only happen at major version boundaries (v3 → v4).

## Loading the data

```python
import json, urllib.request

base = "https://raw.githubusercontent.com/deflation-index/deflation-index/main/data"
master = json.loads(urllib.request.urlopen(f"{base}/master_index.json").read())

print(master["summary"]["cumulative_deflation_pct"])   # -99.97
print(master["annual_data"][-1])                       # 2025 row
```

```javascript
const r = await fetch(
  "https://raw.githubusercontent.com/deflation-index/deflation-index/main/data/master_index.json"
);
const master = await r.json();
console.log(master.summary.cumulative_deflation_pct);  // -99.97
```

```r
library(jsonlite)
master <- fromJSON(
  "https://raw.githubusercontent.com/deflation-index/deflation-index/main/data/master_index.json"
)
master$summary$cumulative_deflation_pct  # -99.97
```

For Excel-based workflows, download the workbooks directly from the `data/excel/` directory and read with `openpyxl`, `pandas.read_excel`, or any standard library.

## Versioning and stability

The index follows semantic versioning. Patch releases (e.g. v3.1.0 → v3.1.1) update headline values and add measured data points without changing the schemas. Minor releases (v3.1 → v3.2) may add fields, never remove them. Major releases (v3 → v4) are reserved for changes that break consumers — for example, a recalculated weighted index with new sectors.

The current release is documented at the top of `data/constants.json` and in [`docs/operations/CHANGELOG.md`](../operations/CHANGELOG.md). The legacy v3.0 JSON files live at `data/api_legacy_v3.0/` and will not change.

## License and attribution

Data, methodology, and documentation are released under [Creative Commons Attribution 4.0 International (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/). You can copy, redistribute, transform, and build upon the data for any purpose, including commercially, provided you attribute the source.

A suitable academic citation:

```
Deflation Index LLC. (2026). The Deflation Index: Measuring Technological
Progress (1990–2025) [Data set]. https://github.com/deflation-index/deflation-index
```

A suitable inline credit:

> Source: [The Deflation Index](https://deflationindex.com), CC BY 4.0.

The repository's [LICENSE](../../LICENSE) file contains the full text and explains how the three-part split (MIT for code, CC BY 4.0 for data and docs, trademark reserved for the brand marks) applies.

## What's not on offer

- A live, authenticated HTTP API with rate limits or pricing tiers. Not currently planned.
- Real-time streaming. The data refreshes annually; all four sectors are measured through 2025.
- White-label or embed-ready widgets. Build your own from the JSON files; we'd love to see what you make.

## If you have a use case the static files don't cover

Open an issue on GitHub describing what you'd want and what you're trying to do. Concrete requests with a worked example are most useful — that's how we decide whether a richer access pattern is worth building.

For general questions: `info@deflationindex.com`.
