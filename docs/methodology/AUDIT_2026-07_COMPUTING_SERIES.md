# Computing Series & Aggregation Audit

**Date:** 2026-07-13
**Status:** Findings confirmed; remediation scheduled for v4.0
**Scope:** Computing sector sub-series (`data/excel/computing_deflation_index_v1.0.xlsx`), sector-level aggregation, master-index aggregation
**Author:** Internal audit (reproducible — every figure below can be recomputed from the workbook and cited sources)

---

## Summary

Three compounding issues cause the published index to **understate** technological deflation:

1. **Arithmetic aggregation mutes the fastest-falling components.** Weighted arithmetic means of rebased index levels converge to the slowest-falling series. The computing composite is effectively a storage-and-RAM index; the master DI level is 82% transportation.
2. **The methodology text and the implementation disagree.** `COMPUTING.md` claims "~35–40% annual" computing deflation, which matches *geometric* aggregation of the workbook's own data (−29.6%/yr). The workbook implements arithmetic aggregation, which compounds at −17.9%/yr.
3. **The computing workbook's early-year anchors do not match the published record**, understating 1990 prices by 2–3 orders of magnitude.

All three fixes move the headline in the same direction: **more deflation, not less.** The current index is unintentionally conservative.

---

## Finding 1 — Arithmetic aggregation

The computing sector index is `0.6·I_compute + 0.3·I_storage + 0.1·I_memory`, each rebased to 1990 = 100. From the workbook's own raw values, the 2024 sub-indices are:

| Component | Weight | 2024 sub-index (1990=100) |
|---|---|---|
| Computing power | 0.6 | 0.000012 |
| Storage | 0.3 | 0.1830 |
| Memory | 0.1 | 0.6903 |

Arithmetic: `0.6(0.000012) + 0.3(0.1830) + 0.1(0.6903) = 0.1239` — reproduces the published computing index exactly. The compute term, carrying 60% of the weight, contributes **0.006%** of the composite's level. Once any component approaches zero, an arithmetic mean is floored by the others: the composite can never fall below `0.3·I_storage + 0.1·I_memory` no matter what happens to compute.

Geometric (weighted mean of logs) on identical data: `exp(0.6·ln 0.000012 + 0.3·ln 0.1830 + 0.1·ln 0.6903) = 0.000647` → −99.99935% cumulative, **−29.6%/yr** — consistent with the methodology text's claimed 35–40% range.

Geometric aggregation is standard for price indices spanning orders of magnitude (BLS geometric means within item categories; Nordhaus 2007 and all compute-cost literature work in log space).

### Same flaw at the master level

DI 2024 = 3.75 decomposes as:

| Sector | Weight | Index 2024 | Contribution | Share of DI level |
|---|---|---|---|---|
| Computing | 0.2941 | 0.1239 | 0.036 | 1% |
| Communications | 0.2353 | 0.7320 | 0.172 | 5% |
| Energy | 0.2941 | 1.5845 | 0.466 | 12% |
| Transportation | 0.1765 | 17.4138 | 3.074 | **82%** |

The headline "−96.25%" is substantially a lithium-ion battery statement. Geometric aggregation of the same four sector indices gives **0.953 → −99.05%** cumulative.

---

## Finding 2 — Historical anchors vs the published record

Workbook raw values against the literature (period dollars; anchors approximate, to be re-verified from primary sources during v4.0):

| Metric | Workbook 1990 | Published record ~1990 | Off by | Record source |
|---|---|---|---|---|
| $/GFLOPS | $831 | ~$1–3M (1984: $42.8M; 1997: ~$42k) | ~10³ | Cost-of-computing tables (AI Impacts; Nordhaus 2007) |
| Storage $/GB | $7.65 | ~$10,000 | ~10³ | Komorowski (mkomo.com); Backblaze historical |
| RAM $/GB | $507 | ~$50,000–85,000 (~$50–85/MB) | ~10² | McCallum memory price series (jcmit.net) |

The workbook's 1990 values resemble **actual ~2000–2001 prices**. Spot checks mid-series show the same compression (workbook 1995 storage $1.95/GB vs record ~$1,000/GB; workbook 2000 compute $7.55/GFLOPS vs record ~$1,300). Recent years (2020–2024) are approximately correct, so the series understates cumulative deflation from the wrong end.

The cited sources (AI Impacts, Backblaze, jcmit) publish figures matching the "published record" column, not the workbook — provenance for the workbook's early values could not be established.

**Downstream inheritances of the $831 anchor:** the site timeline ("a GFLOP of compute cost about $831"), `raw1990` in `src/data.js`, the $100-test's "0.12 GFLOPS in 1990", and the Explore page's computing base unit. Separately, older outreach copy claims "$42 million in 1990" — that figure belongs to ~1984 and matches neither the site nor the 1990 record.

---

## Finding 3 — Combined impact (illustrative)

| Configuration | Computing 2024 (1990=100) | Computing CAGR | Master DI 2024 | Master cumulative |
|---|---|---|---|---|
| Published (arithmetic, current anchors) | 0.1239 | −17.9%/yr | 3.75 | −96.25% |
| Geometric, current anchors | 0.00065 | −29.6%/yr | 0.95 | −99.05% |
| Geometric, corrected anchors (est.) | ~5×10⁻⁷ | ~−43%/yr | ~0.02 | ~−99.98% |

Corrected-anchor figures are order-of-magnitude estimates pending v4.0 data work. Directionally, the honest index shows technology deflation far beyond the published −96.25% — the thesis strengthens; the number changes.

---

## v4.0 remediation spec

1. **Rebuild the computing sub-series from primary published data**, with per-datapoint provenance in `data/constants.json` style:
   - Compute: AI Impacts / Epoch cost-of-compute series; Nordhaus (2007) for early years; Epoch for 2020+.
   - Storage: Komorowski series (1990–2009) spliced to Backblaze quarterly (2009+); document the splice.
   - Memory: McCallum series (jcmit.net) 1990–2010 spliced to DRAMeXchange.
2. **Switch sector-level and master-level aggregation to weighted geometric means.** Keep weights unchanged; the change is the mean, not the weighting.
3. **Publish the arithmetic variant as a sensitivity** alongside the existing equal-weights variant (`docs/methodology/VARIANTS.md`), so the change is transparent and critics can compare.
4. **Re-anchor all site copy** derived from the workbook: timeline 1990 entry, `raw1990`/`buysPer100` in `data.js`, Explore base units, and the four-motif captions.
5. **Extend QA:** add landmark cross-checks to `scripts/verify_statistics.py` (e.g., storage ~$10/GB in 2000 ±50%, compute ~$42k/GFLOPS in 1997 ±50%) so anchor regressions fail CI; add a smoke-test assertion that no sector contributes >50% of the master level.
6. **Audit the other sectors' anchors** while at it: communications ($94/GB, 1990) needs the same provenance check; transportation's 2025 index value (13.53) vs its own raw quote ($1,160 → $108 = 9.31 rebased) needs reconciliation; energy's $3.05/kWh 1990 solar LCOE appears plausible but should be pinned to an IRENA/NREL citation.
7. **Version and announce:** this lands with v4.0 (already scheduled mid-2026 for the 2025 sector data), with a changelog erratum section and a short essay explaining why the headline moved from −96% to deeper — written before anyone else writes it.

## Interim measures (v3.x, live now)

- "Known limitations" paragraph on the site's Method page disclosing the conservative aggregation (shipped alongside this memo).
- Outreach copy avoids the unsupported dollar anchors ("$831 per GFLOPS in 1990" stays only where the site's own data requires it; "$42M in 1990" is retired — the supportable claim is "~$42M in 1984").
- No changes to published v3.x index values; corrections arrive as v4.0, versioned.
