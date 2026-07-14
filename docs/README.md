# Deflation Index Documentation

**Version**: 3.1.1
**Last Updated**: April 2026

Welcome to the Deflation Index documentation. This index helps you navigate our comprehensive methodology, reference materials, and operational guides.

---

## Documentation Structure

### [methodology/](methodology/)
Core methodology and sector-specific documentation.

| Document | Description |
|----------|-------------|
| [MASTER_METHODOLOGY.md](methodology/MASTER_METHODOLOGY.md) | Complete methodology (start here) |
| [INPUT_LAYER_PRINCIPLE.md](methodology/INPUT_LAYER_PRINCIPLE.md) | Why the DI measures input costs, not headline prices |
| [COMPUTING.md](methodology/COMPUTING.md) | Computing sector methodology |
| [COMMUNICATIONS.md](methodology/COMMUNICATIONS.md) | Communications sector methodology |
| [ENERGY.md](methodology/ENERGY.md) | Energy sector methodology |
| [TRANSPORTATION.md](methodology/TRANSPORTATION.md) | Transportation sector methodology |
| [WEIGHT_JUSTIFICATION.md](methodology/WEIGHT_JUSTIFICATION.md) | Sector weight rationale |
| [VARIANTS.md](methodology/VARIANTS.md) | Sensitivity analysis (2 methodologies) |
| [DATA_STANDARDS.md](methodology/DATA_STANDARDS.md) | Data hygiene and quality standards |

### [reference/](reference/)
Technical reference and API documentation.

| Document | Description |
|----------|-------------|
| [API.md](reference/API.md) | API documentation (coming soon) |
| [EXCEL_GUIDE.md](reference/EXCEL_GUIDE.md) | Excel file structure and usage |
| [GLOSSARY.md](reference/GLOSSARY.md) | Key terms and definitions |

### [about/](about/)
Overview and context documents.

| Document | Description |
|----------|-------------|
| [EXECUTIVE_SUMMARY.md](about/EXECUTIVE_SUMMARY.md) | High-level overview and key findings |
| [WHY_TECHNOLOGY_MATTERS.md](about/WHY_TECHNOLOGY_MATTERS.md) | Essay on technology as productivity driver |

### [operations/](operations/)
Version history, contribution, and release documentation.

| Document | Description |
|----------|-------------|
| [CHANGELOG.md](operations/CHANGELOG.md) | Version history and changes |
| [CONTRIBUTING.md](operations/CONTRIBUTING.md) | How to contribute |
| [v3.1_release_notes.md](operations/v3.1_release_notes.md) | v3.1 / v3.1.1 release notes (2025 early-read) |

---

## Quick Links

### New to the Deflation Index?
1. Start with [EXECUTIVE_SUMMARY.md](about/EXECUTIVE_SUMMARY.md)
2. Read [WHY_TECHNOLOGY_MATTERS.md](about/WHY_TECHNOLOGY_MATTERS.md)
3. Dive into [MASTER_METHODOLOGY.md](methodology/MASTER_METHODOLOGY.md)

### Want to understand the data?
1. Review [DATA_STANDARDS.md](methodology/DATA_STANDARDS.md)
2. Check [EXCEL_GUIDE.md](reference/EXCEL_GUIDE.md)
3. Explore sector methodologies in [methodology/](methodology/)

### Want to contribute?
1. Read [CONTRIBUTING.md](operations/CONTRIBUTING.md)
2. Open an issue or PR on [GitHub](https://github.com/deflation-index/deflation-index)

---

## Key Statistics (v4.0.0, geometric DI 1990–2025)

| Metric | Value | Source |
|--------|-------|--------|
| DI Annual Rate | -20.4% | v4.0 geometric |
| DI Cumulative | -99.97% | v4.0 geometric |
| M2 Annual Rate | +5.66% | FRED M2SL |
| M2 Cumulative | +576% | FRED M2SL |
| DI-M2 Gap | 26.0pp | Calculated |

**Single Source of Truth**: All statistics derive from `data/constants.json`

---

## Current Scope & Limitations

### What's Included in v4.0.0

The Deflation Index currently measures **four foundational technology sectors**, each a single sourced metric that starts when defensible measurement starts:

| Sector | Coverage Period | Cumulative Deflation |
|--------|----------------|---------------------|
| Computing | 1990-2025 (36 years) | -99.99% |
| Communications | 1998-2025 (since 1998) | -99.99% |
| Energy | 2010-2025 (since 2010) | -84.1% |
| Transportation | 2010-2025 (since 2010) | -90.7% |

**Coverage:** These sectors represent approximately **40% of direct technological impact** on the US economy.

### Why These Four Sectors?

We selected these sectors because they are **foundational technologies** that:

1. **Enable other sectors** – Computing powers everything from healthcare to finance; energy is required for all economic activity
2. **Show measurable deflation** – Clear cost-per-performance metrics ($/GFLOPS, $/kWh, $/GB)
3. **Have high-quality data** – Tier 1 sources from government agencies and established institutions
4. **Represent diverse types** – Digital (computing, communications), physical (energy, transportation)

**This is not cherry-picking.** These are the sectors where:
- Data quality is highest (Tier 1: FRED, IRENA, BloombergNEF, BLS, DOE)
- Measurements are most reliable (standardized metrics, authoritative sources)
- Deflation is most consistent (35-year time series demonstrates trend durability)

### What's NOT Yet Included

The four sectors above are the **first generation** of measured input layers — chosen because their data quality is highest and their input-to-headline coupling is tightest. Several other sectors belong in the index conceptually but aren't yet measured to the same standard.

| Sector | Why it belongs | What it would measure |
|--------|---------------|----------------------|
| **Healthcare** | Tech-driven input cost reductions are dramatic (genomic sequencing has fallen four orders of magnitude since 2001), but consumer healthcare prices have risen ~300%. The gap is the most important data point in the entire index. | Genomic sequencing cost-per-genome; medical imaging cost-per-scan; telemedicine cost-per-consultation; AI-assisted diagnostic cost. *Not* insurance premiums. |
| **Education** | Online learning cost has collapsed; AI tutoring is dramatically cheaper than 1:1 instruction; digital materials are near-free. Tuition has gone the opposite direction. | Online-learning cost-per-credit; AI-tutoring cost-per-hour; digital textbook costs. *Not* tuition. |
| **Housing / Construction** | Modular construction, smart-home technology, energy-efficiency components, and building automation all have measurable cost curves. Headline home prices are driven mostly by land and credit. | Modular-construction cost-per-square-foot; smart-home component costs; building-automation system costs. *Not* home prices. |
| Food / Agriculture, Manufacturing, others | Real input-cost deflation in genetic engineering, robotic automation, supply-chain logistics — but the path from input layer to consumer headline is more complex. Under active evaluation. | TBD per sector. |

The principle behind these expansions is documented in [INPUT_LAYER_PRINCIPLE.md](methodology/INPUT_LAYER_PRINCIPLE.md): the Deflation Index measures the technology input layer of each sector, not headline consumer prices. The fact that a sector's headline rose while its input layer fell is *the reason* to include it — that gap is the project's central observation.

We expand the index when, and only when, the data for a sector reaches the same Tier 1 standard the current four meet. We'd rather wait for measurements we can defend than publish numbers we can't. Timelines are deliberately not pinned: sectors land when their data lands.

### Transparency Commitment

We explicitly acknowledge our limitations:

- **Current index is partial, not comprehensive** (40% coverage)
- **Findings are robust within measured sectors** (sensitivity analysis confirms)
- **Expansion planned with same quality standards** (no compromise on data rigor)
- **Transparent about what's included and excluded** (no hidden assumptions)

**Core principle:** We'd rather have a smaller index that's bulletproof than a larger index that's questionable.

---

## Sensitivity Analysis

We provide two weighting methodologies to demonstrate robustness:

| Aggregation | 2025 DI | Cumulative | Annual |
|-------------|---------|------------|--------|
| **Weighted geometric (Primary)** | 0.034 | -99.97% | -20.4% |
| Weighted arithmetic (Sensitivity) | 6.31 | -93.7% | -7.6% |

**Key Finding**: Both aggregation methods show deep technological deflation. The v4.0 primary (geometric) is -99.97% cumulative; a weighted-arithmetic sensitivity lands at -93.7%. The arithmetic variant is published in [`data/v4/draft_output.json`](../data/v4/draft_output.json); the retired v3 weighting comparison is preserved in [VARIANTS.md](methodology/VARIANTS.md).

---

## Data Files

| File | Location | Description |
|------|----------|-------------|
| `constants.json` | `data/constants.json` | Authoritative v4.0 statistics |
| Master Index (v4) | `data/master_index.json` | Primary v4.0 geometric index, 1990–2025 |
| v4 anchor ledger | `data/v4/` | Per-sector sourced anchors + verification status |
| Legacy workbooks (v3) | `data/excel/master_deflation_index_v3.0.3.xlsx` (+ EQUAL variant) | Retired v3 multi-factor calculations |
| CSV Exports | `data/csv/` | Machine-readable exports |

---

## External Links

- **Website**: [deflationindex.com](https://deflationindex.com)
- **GitHub**: [github.com/deflation-index/deflation-index](https://github.com/deflation-index/deflation-index)
- **FRED M2 Data**: [fred.stlouisfed.org/series/M2SL](https://fred.stlouisfed.org/series/M2SL)

---

## Questions?

- **Technical issues**: Open a GitHub issue
- **Methodology questions**: See [MASTER_METHODOLOGY.md](methodology/MASTER_METHODOLOGY.md)
- **General inquiries**: info@deflationindex.com
