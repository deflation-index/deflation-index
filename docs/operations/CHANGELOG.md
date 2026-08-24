# Changelog

All notable changes to the Deflation Index will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [4.0.1] - 2026-08-24 — final release

The freeze. The index is complete through 2025 and no further updates are planned. The site stays live, the repo is archived read-only, and everything needed to verify, extend, or argue with the work is public. Copy and disclosure changes only — no data or method change; the headline stands.

### Added - METHOD

- **Weighting circularity disclosed and sized.** One of the three weighting factors (deflationary force) is the magnitude of a sector's cost decline, so the index is partly weighted by the thing it measures. Disclosed in `docs/methodology/WEIGHT_JUSTIFICATION.md` ("A Circularity in the Weighting") with a published sensitivity: removing the factor and redistributing its share to GDP contribution and enabling effect leaves the composite at **−99.98%** (−21.1%/yr) vs. the published **−99.97%** (−20.4%/yr) — slightly deeper, not shallower, because the redistributed share flows mostly to computing. Computation: `scripts/sensitivity_no_df.py` → `data/v4/sensitivity_no_df.json`. Linked from the method page where the factors are listed. Headline unchanged.

### Changed - SITE

- **Completion dateline** under the hero, in the footer, and in the static SEO fallback: *Complete through 2025 · no further updates planned*.
- **Denominator made inseparable from the headline.** Every surface carrying −99.97% now carries its denominator: "Technology inputs fell 99.97% per unit of capability, 1990–2025." Hero subhead, dark stat band ("cost per unit of capability"), static SEO fallback, OG/Twitter/meta descriptions, method page opener (interactive + static), README.
- **JSON-LD dataset fixed**: version bumped to 4.0.1; the stale distribution link to the archived v3.0.3 Excel workbook removed (the JSON distributions are the v4 dataset). The v3 workbooks remain in `data/excel/` as historical artifacts.
- Footer gains a contact line (info@deflationindex.com). Forward-looking copy retired: the timeline's "we'll report the answer either way," the method page's "continuous maintenance," and the newsletter dek now reflect the freeze.

## [4.0.0] - 2026-07-13

The audited rebuild. The published index was understating technology deflation — this release corrects the method, the data, and the labels, and moves the headline from **−96.5%** to **−99.97%** (1990–2025). Full findings: [`docs/methodology/AUDIT_2026-07_COMPUTING_SERIES.md`](../methodology/AUDIT_2026-07_COMPUTING_SERIES.md).

### Changed - METHOD

- Aggregation moves from weighted arithmetic to weighted **geometric** means at both the sector and master level. Arithmetic means are floored by their slowest components; the retired arithmetic variant is published as a sensitivity in `data/v4/draft_output.json`.
- Every sector is now the single metric its label claims, from published sources, starting when defensible measurement starts: **computing** = compute ($/GFLOPS) / storage ($/GB) / memory ($/GB) geometric blend, 1990–2025; **communications** = wholesale IP transit $/Mbps·month (DrPeering, TeleGeography), 1998–2025; **energy** = IRENA utility PV LCOE, 2010–2025; **transportation** = BNEF Li-ion pack $/kWh, 2010–2025. Late-start sectors hold at 100 before their first datapoint.
- Sector weights unchanged (0.2941 / 0.2353 / 0.2941 / 0.1765).

### Changed - DATA

- All anchor datapoints carry per-row provenance and verification status in `data/v4/*.csv`; the build refuses to mark output final while any row is unverified. Retired: the v3 sector workbooks' synthetic early-year series and unsourced blend components.
- 2025 is a **measured** index year across all four sectors (IRENA 2025, BNEF 2025, TeleGeography 2025, published compute/storage record) — the "early read" framing retires.
- Headline set: DI 2025 = 0.0345 (−99.97%, −20.4%/yr, all sectors nominal); abundance gap 526pp (2025); annual DI–M2 gap 26.0pp. `data/master_index.json` regenerated 1990–2025; `data/sectors.json` marked superseded.
- Honest movements in both directions: computing deepens to ~−36.7%/yr; communications ~−30%/yr since 1998; energy is now **−84% nominal since 2010** (−89% in IRENA's real terms; the −98.5%-since-1990 claim rested on synthetic data and is withdrawn), and in nominal terms solar LCOE has risen since 2023; transportation −91% since 2010. Recorded plateaus and upticks: solar LCOE flat since 2023 (+0.6% in 2024); battery packs flat 2020–2023; storage and memory prices **rose** from late 2025 on AI datacenter demand.

### Changed - SITE

- Homepage, sector pages, Explore, timeline, $100 test, Method page (geometric formula, per-sector sources, verification-ledger status), stories, and static SEO fallback all updated to the v4 set.
- Ledger closed for release under four ratified verification standards (`data/v4/sources_manifest.md`): zero unverified placeholders; every datapoint cites a published source (24 primary-verified, 33 cross-checked, 1 bounded interpolation). Primary-promotion continues in public after release.

## [3.1.3] - 2026-07-12

Data correction and site delivery patch. No changes to the weighted Deflation Index, M2 series, sector data, or Excel workbooks.

### Fixed - CPI 2024 ENDPOINT (ERRATUM)

- **CORRECTED** CPI 2024 index: 254.65 → **243.5** (1990 = 100). The prior figure mixed a Dec-2024 numerator with a 1989 annual-average base. On the series' Jan-1990-base convention (see `data/sources/fred/CPIAUCSL_1990-2024.csv`), the 2024 endpoint is 243.5.
- **CORRECTED** CPI cumulative inflation 1990–2024: +155% → **+143.5%**; CAGR 2.72% → **2.65%**; multiplier 2.55× → **2.44×**.
- **CORRECTED** Abundance gap (cumulative, 1990–2024): 491pp → **503pp** (96.25 + 550.02 − 143.5 ≈ 503). The annual DI–M2 gap (14.9pp) is unaffected — CPI is not part of that calculation.
- Propagated through `data/constants.json`, `src/data.js`, story essays, `docs/about/`, `docs/reference/GLOSSARY.md`, `docs/methodology/README.md`, `data/sources/SOURCES.md`, and `scripts/verify_statistics.py`. The 2025 early-read figures (CPI +150.1%, gap 522pp) were already on the correct base and are unchanged.

### Changed - SITE DELIVERY

- Homepage stats now derive from `data.js` `headline` (single source of truth) instead of hardcoded JSX literals; hero prose and the Four Numbers section use the 2025 early-read set consistently.
- JSX precompiled to `dist/` via `npm run build` (@babel/cli, classic runtime); Babel standalone removed from the browser. Static SEO fallback, canonical link, and schema.org Dataset JSON-LD added to `index.html`.
- Newsletter form now hands off to Substack signup with the email prefilled; footer Newsletter/RSS/Data links point to real destinations.
- New 1200×630 OG/Twitter card (`assets/logo/marks/di_og_card.png`) replaces the square image that `summary_large_image` cropped.
- Accessibility: keyboard `:focus-visible` ring, aria-labels on Explore sliders; $100-test emoji replaced with SVG motif icons.

## [3.1.2] - 2026-05-06

Site delivery patch. Substantial frontend rewrite with no changes to the underlying weighted Deflation Index, M2/CPI series, sector weights, or Excel workbooks.

### Changed - SITE V2 (REACT SPA)

- Migrated from a seven-page static HTML site to a single-page React application served from `index.html`. JSX is transpiled in-browser via Babel standalone, so the project remains build-step-free and deployable to any static host. Hash routing covers `home`, `sectors`, `sectors/:id`, `explore`, `stories`, `stories/:slug`, and `method`.
- Repository layout flattened. Component source under `src/`; runtime data at `data/{constants,master_index,sectors}.json`; in-product logo at `assets/logo/`; archival mark variants at `assets/logo/marks/`.
- Old multi-page files (`about.html`, `blog.html`, `data.html`, `faq.html`, `methodology.html`, `products.html`, `blog/why-technology-matters.html`) removed — content ported into SPA routes.
- Legacy v3.0 JSON API contract archived to [`data/api_legacy_v3.0/`](../../data/api_legacy_v3.0/) (formerly `data/api/`). Schemas preserved unchanged for any external consumers.
- React 18.3.1 production builds and `marked@12.0.2` are served from unpkg with SHA-384 SRI hashes pinned to the npm tarballs.

### Changed - BRAND

- Logo replaced. The cyan-on-dark "DI" wordset has been retired in favor of a serif mark — black roman D + gold italic I on cream paper. New mark at `assets/logo/di_logo_no_border.svg`; bordered, monochrome, OG, and social-profile variants under `assets/logo/marks/`.
- `assets/logo/README.md` rewritten to describe the new four-color palette (paper / ink / gold / divider) and its current placements.

### Added - STORIES

- Four story essays at `data/stories/{what-is-deflation-index, the-abundance-gap, battery-breakeven, ai-compute-halving}.md`. Each is grounded in v3.1.1 numbers and runs 4–7 minutes.
- New `StoryDetailV2` component at `src/abundance-v2-pages.jsx` fetches the markdown via `marked.parse`, renders into a scoped `.di-prose` block, and shows a back link. Story index cards now navigate to detail routes (previously inert).

### Changed - MOBILE

- Mobile-first responsive layer added. New `useIsMobile()` hook (matchMedia at 768px) plus a CSS utility set covering grid stacking, nav visibility, and touch-target sizing.
- Bottom tab bar visible on phones (≤768px); desktop pill nav takes over on tablet+.
- Hero typography clamp floor lowered from 2.8rem to 2rem so headlines fit a 360px viewport.
- Chart heights scale with viewport (300/280/320 px on mobile, 420/400/460 px on desktop).
- Removed the public-facing "DI" floating dev-panel trigger button. The panel itself remains gated behind `__activate_edit_mode` postMessage.

### Changed - LICENSE & DOCS

- License clarified as a three-part split: MIT for code, CC BY 4.0 for data, methodology, and documentation, trademark reserved for the brand marks. Codified in [`LICENSE`](../../LICENSE) and surfaced in the root README.
- [`CONTRIBUTING.md`](CONTRIBUTING.md) rewritten as "PRs welcome" with explicit source-quality standards and a data-correction PR template.
- Operational docs trimmed: `DEPLOYMENT.md`, `QUICKSTART.md`, `RESEARCH_DASHBOARD.md`, and `v3.1_2025_update_plan.md` removed (superseded by the release notes and the in-app methodology page).
- [`docs/reference/API.md`](../reference/API.md) rewritten as a concise "Programmatic Data Access" page. The previous version still pitched a paid API with pricing tiers — that direction has been retired in favor of the open CC BY 4.0 license. The static JSON, CSV, and Excel files in this repo are the API.

### Not Changed

- The 1990–2024 weighted Deflation Index remains `DI = 3.74` at 2024.
- `data/constants.json`, `data/master_index.json`, `data/sectors.json` schemas and headline values match v3.1.1 exactly.
- M2 / CPI series, sector weights, and all Excel workbooks are unchanged.

## [3.1.1] - 2026-04-19

### Changed - LIVE FRED CSV REFRESH

- Live FRED CSV download of M2SL and CPIAUCSL replaced the v3.1.0 press-release-only figures. All 2025 monthly values are now measured, not summarized.
- `data/constants.json` bumped `3.1.0 → 3.1.1`. The `supplemental_2025` block now contains the full 12-month 2025 series for both M2 and CPI plus 2025 annual averages:
  - M2 2025 annual avg: **$21,967.7B** (+3.95% vs 2024 avg of $21,133.9B as currently reported by FRED)
  - M2 Dec 2025: **$22,386.9B** (live FRED, was $22,366.2B from press release)
  - M2 Jan 2026: **$22,469.1B**
  - CPI-U 2025 annual avg: **322.186** (+2.71% vs 2024 avg of 313.689)
  - CPI-U Dec 2025: **326.031** (with revised seasonal factors)
  - CPI-U Oct 2025: **324.654** (linear interpolation between Sep 2025 = 324.245 and Nov 2025 = 325.063; only Oct was missing due to the appropriations lapse)
- `data/api/m2_data.json` bumped `3.0.3 → 3.1.1`; added 2025 annual entry `{year: 2025, m2_billions: 21967.7, index_value: 670.4, yoy_change_pct: 3.13}` rebased to the existing 1990 anchor ($3,276.8B) so the 1990–2025 series is internally continuous.
- `index.html` 2025 early-read panel: M2 Dec 2025 updated from `$22.37T` to `$22.39T`; note updated to cite the 2024→2025 annual-average YoY (+3.95%) and to reflect that only Oct 2025 CPI required interpolation.
- Added `note_on_rebasing` field in `supplemental_2025.m2` documenting the ~1.7% gap between the FRED-live 1990 anchor ($3,222.2B) and the existing v3.0.3 series anchor ($3,276.8B), deferred to v4.0 for full rebase.

### Not Changed

- The 1990–2024 weighted Deflation Index is still `DI = 3.74` at 2024.
- Excel workbooks, sector weights, and 1990–2024 M2/CPI time series are unchanged.
- v4.0 blockers (IRENA 2025, NREL ATB 2025, FCC 2025) remain.

---

## [3.1.0] - 2026-04-19

### Added - 2025 EARLY READ (additive release)

- `docs/operations/v3.1_release_notes.md` — full release notes documenting 2025 sources and v4.0 blockers.
- `supplemental_2025` block in `data/constants.json` with measured 2025 headline values:
  - M2 Dec 2025: $22,366.20B (FRED M2SL)
  - M2 Jan 2026: $22,442.10B
  - CPI-U 12-month change Dec 2025: +2.7% (BLS)
  - Battery pack 2025 avg: $108/kWh (BNEF); BEV $99/kWh, stationary $70/kWh
  - AI compute price-performance: −37%/yr (Epoch AI); doubling every 2.2 years
- "2025 early read" panel on `index.html` clearly separated from the weighted 1990–2024 headline.
- Versions & updates section on `data.html` showing current / in-progress / planned releases.

### Changed

- `data/constants.json` version bump `3.0.3 → 3.1.0`; DI reference updated to `master_deflation_index_v3.0.3.xlsx`.
- `data/sources/SOURCES.md` version bump `3.0.2 → 3.1.0` with v3.1 changes note.
- `index.html` footer stamp `v3.0.3 · data reflects year-end 2024` → `v3.1 · weighted DI through 2024 · 2025 early read`.
- `data.html` ported to current design system; added versions, update schedule, and improved file inventory.
- `about.html`, `faq.html`, `methodology.html`, `blog.html` ported to current design system (paper/ink palette; Fraunces / Inter / IBM Plex Mono).

### Not Changed

- Weighted Deflation Index 1990–2024 (`DI = 3.74` at 2024) is unchanged.
- Excel workbooks (`master_deflation_index_v3.0.3.xlsx`, EQUAL variant, sector files) are unchanged.
- `m2_money_supply.annual_data` series and sector weights are unchanged. Full 2025 integration is deferred to v4.0 (target Q3 2026), gated on IRENA *Renewable Power Generation Costs in 2025* and NREL ATB 2025.

### Known limitations

- 2025 monthly M2 and CPI time series are not yet reflected in `data/m2_data.json`. Headline Dec-2025 and YoY figures are published in `supplemental_2025` with the monthly extension deferred pending direct FRED CSV access.
- CPI Oct & Nov 2025 monthly values are unpublished due to the 2025 appropriations lapse; when the annual 2025 average is eventually computed, they will be filled by linear interpolation between Sep 2025 and Dec 2025 values per the v3.1 update plan.

## [3.0.3] - 2026-01-10

### Changed - SIMPLIFIED SENSITIVITY ANALYSIS

**Reduced from 4 variants to 2 methodologies**:
- **Retained**: Multi-Factor (Primary) and Equal-Weighted (Baseline)
- **Removed**: Expenditure-Weighted and GDP-Weighted variants

**Rationale**: Previous Expenditure and GDP variants implied derivation from official BLS/BEA statistics that was not rigorously implemented. We prioritize verifiability over comprehensiveness—better to have 2 bulletproof methodologies than 4 with questionable foundations.

**Results Unchanged**:
- Multi-Factor: -96.25% cumulative, -9.21% annual
- Equal-Weighted: -95.04% cumulative, -8.45% annual
- Core finding robust: Both confirm massive technological deflation

### Removed

**Excel Files Deleted**:
- `master_deflation_index_v3.0.1_EXPENDITURE.xlsx`
- `master_deflation_index_v3.0.1_GDP.xlsx`

**Documentation References**:
- All references to "4 variants" updated to "2 methodologies"
- Expenditure/GDP sections removed from VARIANTS.md and WEIGHT_JUSTIFICATION.md

### Added

**Future Roadmap**:
- v4.0 (2027-2028) will implement rigorous BLS/BEA-derived sensitivity analyses
- Expenditure-weighting from BLS Consumer Expenditure Survey
- GDP-weighting from BEA GDP-by-Industry data
- Requires expanded sector coverage (7+ sectors) for meaningful implementation

### Impact Assessment

**Core Finding UNCHANGED**:
- Massive technological deflation confirmed (95-96% cumulative)
- Both retained methodologies show same directional finding
- Simplified approach is more defensible for academic/policy audiences

**Why This Matters**:
- Eliminates attack surface from unverifiable claims
- Invites community collaboration on future rigorous sensitivity analysis
- Maintains credibility through transparency about limitations

---

## [3.0.2] - 2025-12-30

### Changed - M2 DATA CORRECTION (CRITICAL)

**M2 Money Supply Data Corrected from FRED M2SL**:
- **CORRECTED** M2 cumulative expansion: 615% → **550.2%**
- **CORRECTED** M2 annual growth rate: 5.9% → **5.66%**
- **CORRECTED** M2 index (2024): 820.8 → **650.2**
- **CORRECTED** 1990 M2 base value: ~$3.0T → **$3.277T**
- **CORRECTED** M2 multiplier: 7.15x → **6.5x**

**Gap Analysis Recalculated**:
- **CORRECTED** DI-M2 annual gap: 15.1pp → **14.9pp**
- **CORRECTED** Abundance gap: 560pp → **491pp**

**Data Source**: Federal Reserve FRED Series M2SL
- URL: https://fred.stlouisfed.org/series/M2SL
- 1990 annual average: $3,276.8 billion (verified)
- 2024 value: ~$21,300 billion (verified)
- True expansion: (21,300 / 3,276.8) - 1 = 550.2%

### Added

**Single Source of Truth**:
- Created `data/constants.json` with all authoritative statistics
- Contains complete M2 year-by-year data from FRED (1990-2024)
- All documentation now references this single source

**Documentation Restructure**:
- New `docs/README.md` navigation index
- New `docs/methodology/README.md` overview
- New `docs/reference/GLOSSARY.md` key terms
- Reorganized docs into: methodology/, reference/, about/, operations/
- Renamed files for clarity (shorter names)

### Removed

**Outdated Planning Documents**:
- `docs/guides/QUICK_ACTION_GUIDE.md` (one-time instructions)
- `docs/guides/PROJECT_SUMMARY.md` (redundant)
- `docs/project/GITHUB_UPDATE_PLAN.md` (completed plan)
- `docs/summaries/DATA_POPULATION_SUMMARY.md` (status tracking)
- `docs/summaries/MISSION_COMPLETE.md` (celebratory)

### Impact Assessment

**Core Finding UNCHANGED**:
- DI annual rate: -9.21% ✓ (unchanged)
- DI cumulative: -96.26% ✓ (unchanged)
- Technology deflation thesis fully intact

**M2 Side Corrected**:
- Previous M2 figures were ~12% overstated
- Gap narrows slightly but remains massive (14.9pp annually)
- Story strengthened by FRED-verified accuracy

**Why This Matters**:
- Data credibility is paramount for academic/policy acceptance
- FRED is the authoritative source for M2 data
- Correction demonstrates commitment to accuracy over narrative

---

## [3.0.1] - 2025-12-19

### Changed - MAJOR REBUILD

**Complete Formula-Based Rebuild**:
- **REBUILT** all Master_DI calculations from source data with formulas
- **CORRECTED** cumulative deflation: -84.3% → -96.26% (more accurate, reflects true source data)
- **CORRECTED** annual average deflation: -5.2% → -9.21% (direct calculation from raw costs)
- **CORRECTED** 2024 Master DI: 15.68 → 3.74 (formula-based calculation)

**Technical Improvements**:
- **UPDATED** sector weights to 4-decimal precision (0.2941, 0.2353, 0.2941, 0.1765)
- **FIXED** Master_DI formulas to reference Sector_Weights sheet (not hard-coded values)
- **VERIFIED** all calculations - zero formula errors
- **INTEGRATED** M2, CPI, and gap analysis in master file

**Data Quality**:
- All Master_DI values now use formulas (except 1990 baseline)
- Weights referenced from single source (Sector_Weights sheet)
- Complete reproducibility and verification
- Can trace every calculation from source data to final index

### Removed

- Hard-coded weights in formulas (now referenced)
- 3-decimal rounding (weights now sum to exactly 1.0000)
- All references to unapproved plans or frameworks

### Why Numbers Changed

**Original v3.0 Issue**:
- Master_DI values were hard-coded (no formulas)
- Could not verify or reproduce calculations
- Appeared to be manually calculated or externally computed

**v3.0.1 Solution**:
- Rebuilt calculations DIRECTLY from raw source data
- Every value traceable to authoritative sources
- Shows TRUE magnitude of technological deflation
- More accurate and fully verifiable

---

## [3.0.0] - 2025-12-15

### Added
- Transportation sector (EV batteries, autonomous tech, vehicle efficiency, ridesharing)
- 15 years of transportation data (2010-2024)
- Expanded index from 3 to 4 sectors

### Changed
- Updated sector weights to include Transportation
- Rebalanced weights: Computing 29.4%, Communications 23.5%, Energy 29.4%, Transportation 17.6%
- Updated all calculations and documentation

---

## [2.0.0] - 2024-01-15

### Added
- 2024 data for all sectors
- Updated M2 and CPI data through 2024

### Changed
- Annual data update
- Minor methodology refinements

---

## [1.0.0] - 2024-01-01

### Added
- Initial release
- Three sectors: Computing, Communications, Energy
- 35 years of data (1990-2024)
- Complete methodology documentation
- Excel files with 700+ formulas

---

## Version Numbering

- **Major version** (X.0.0): Adding/removing sectors, major methodology changes
- **Minor version** (3.X.0): Annual data updates, methodology refinements
- **Patch version** (3.0.X): Bug fixes, documentation updates, data corrections

---

## Upcoming

### v3.1 (Q2-Q3 2026)
- 2025 data integration
- First annual update with v3.0.3 methodology

### v4.0 (2027-2028)
- Healthcare, Education, Housing sectors
- Major weight rebalancing
- Rigorous BLS/BEA-derived sensitivity analyses

---

**For detailed methodology changes, see docs/methodology/MASTER_METHODOLOGY.md**
