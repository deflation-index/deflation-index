# The Deflation Index

**Quantifying technological deflation across computing, communications, energy, and transportation.**

The Deflation Index (DI) measures the force of technological progress by tracking exponential cost reductions in fundamental sectors and comparing them against monetary expansion and official inflation metrics.

[![License](https://img.shields.io/badge/license-Proprietary-red.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-3.0.1-blue.svg)](CHANGELOG.md)
[![Data Points](https://img.shields.io/badge/data%20points-400%2B-green.svg)](#)
[![Formulas](https://img.shields.io/badge/formulas-700%2B-green.svg)](#)
[![Errors](https://img.shields.io/badge/errors-0-brightgreen.svg)](#)

---

## 📊 What is the DI?

The Deflation Index is a composite metric that quantifies annual technological deflation from 1990-2024. It reveals the gap between:

* **What technology delivers** (massive cost reductions)
* **What monetary policy creates** (6-7% M2 expansion annually)
* **What we experience** (2-3% CPI inflation)

**Key Findings (1990-2024):**
- **Technology deflation**: -96.26% cumulative (-9.21% annual average)
- **M2 money supply growth**: +615% cumulative (+5.9% annual average)
- **CPI inflation**: +155% cumulative (+2.7% annual average)
- **The Abundance Gap**: 560 percentage points of captured wealth
- **The Deflation Gap**: 251 percentage points of missing deflation

---

## 🎯 Current Scope (v3.0.1)

**Four Sectors Covered:**
1. **Computing (29.41%)**: Cost per billion floating-point operations per second ($/GFLOPS) - 99.88% deflation
2. **Communications (23.53%)**: Cost per gigabyte of data transmission ($/GB) - 99.27% deflation
3. **Energy (29.41%)**: Levelized cost of electricity from solar ($/kWh) - 98.42% deflation
4. **Transportation (17.65%)**: Battery pack cost per kilowatt-hour ($/kWh) - 82.59% deflation

**Time Coverage**: 1990-2024 (35 years)
**Data Points**: 400+ verified measurements
**Formulas**: 700+ calculations, zero errors
**Update Frequency**: Annual major updates, quarterly refinements


## 🔄 Weighting Variants

**The Deflation Index provides four weighting methodologies to demonstrate robustness:**

### Primary Index (Recommended)
**DI-Multi-Factor** (`master_deflation_index_v3.0.1.xlsx`)
- Weights: Computing 29.41%, Communications 23.53%, Energy 29.41%, Transportation 17.65%
- Methodology: Balances GDP contribution, enabling effect, and deflationary force
- Use case: Primary index for analysis, publications, and API default
- Results: -96.26% cumulative deflation, -9.21% annual average

### Alternative Variants

**DI-Equal** (`master_deflation_index_v3.0.1_EQUAL.xlsx`)
- Weights: 25% each sector
- Methodology: Simple equal weighting, no assumptions about relative importance
- Use case: Conservative baseline, easy to explain
- Results: ~-95.8% cumulative deflation, ~-9.0% annual average

**DI-Expenditure** (`master_deflation_index_v3.0.1_EXPENDITURE.xlsx`)
- Weights: Computing 25%, Communications 20%, Energy 30%, Transportation 25%
- Methodology: Weighted by household and business expenditure patterns
- Use case: Consumer-focused perspective, future primary when 7+ sectors covered
- Results: ~-95.5% cumulative deflation, ~-8.8% annual average

**DI-GDP** (`master_deflation_index_v3.0.1_GDP.xlsx`)
- Weights: Computing 20%, Communications 15%, Energy 40%, Transportation 25%
- Methodology: Weighted by direct GDP contribution
- Use case: Macro-economic analysis, conservative estimate
- Results: ~-94.2% cumulative deflation, ~-8.3% annual average

### Sensitivity Analysis

**Range across variants:**
- 2024 Master DI: 3.74 to ~5.8
- Cumulative deflation: -94.2% to -96.26%
- Annual average: -8.3% to -9.21%

**Key Finding:** All variants show substantial deflation, confirming the core finding regardless of weighting choice. The ~2 percentage point spread demonstrates robustness while allowing users to select their preferred methodology.

**Full documentation:** [VARIANTS_GUIDE.md](docs/methodology/VARIANTS_GUIDE.md)

---

---

## 📁 Repository Structure

```
deflation-index/
├── public/                      # Static website files
│   ├── index.html              # Main website
│   └── assets/                 # Images, additional files
├── data/                       # Source data and calculations
│   ├── excel/
│   │   ├── master_deflation_index_v3.0.1.xlsx
│   │   ├── computing_deflation_index_v1.0.xlsx
│   │   ├── communications_deflation_index_v1.0.xlsx
│   │   ├── energy_deflation_index_v1.0.xlsx
│   │   └── transportation_deflation_index_v1.0.xlsx
│   └── csv/                    # Exported CSV files
├── docs/                       # Documentation
│   ├── methodology/            # Comprehensive methodology
│   ├── summaries/              # Executive summaries
│   ├── guides/                 # User guides
│   └── project/                # Project management docs
├── scripts/                    # Verification and automation
│   ├── verify_statistics.py   # Data verification tool
│   └── export_to_csv.py       # CSV export automation
└── README.md                   # This file
```

---

## 🔍 Known Limitations & Future Improvements

**We're transparent about where the Deflation Index is currently limited:**

### Current Scope Limitations

**Sectors Covered (v3.0.1)**:
- ✅ Computing, Communications, Energy, Transportation
- ❌ Healthcare, Education, Housing, Agriculture, Materials, Software-as-Service

**Coverage**: The current four sectors represent approximately 40% of measurable technological deflation, not 100%. We prioritize defensible measurement over comprehensive coverage.

**Expansion Timeline**: v4.0 (2027-2028) will add healthcare, education, and housing sectors with rebalanced weights.

### Methodological Choices

**Weighting System**:
- Current weights (29.41%, 23.53%, 29.41%, 17.65%) based on three factors: GDP contribution, enabling effect, and deflationary force
- Detailed weight justification and sensitivity analysis in docs/methodology/WEIGHT_JUSTIFICATION.md
- Alternative weighting schemes tested (equal-weight, GDP-weighted, expenditure-weighted)
- Results robust across methods (±15% variation)

**Index Construction**:
- Weighted averages used to capture sector contributions
- Alternative methods (arithmetic, expenditure-weighted) documented for comparison
- Cost-per-performance focus doesn't capture adoption friction or network effects

**Conservative Assumptions**:
- Where uncertainty exists, we choose more conservative estimates
- True technological deflation likely higher than measured
- The index understates the gap, not overstates it

### What We Don't Measure

**Out of Scope**:
- Free software/services (difficult to price)
- Quality-of-life improvements beyond performance metrics
- Network effects and adoption curves
- Regulatory and infrastructure friction
- Non-monetary benefits (convenience, accessibility)

**Why These Limitations**:
We prioritize verifiable, reproducible data over comprehensive coverage. Better to measure four sectors perfectly than twenty sectors poorly. Each limitation is an opportunity for future improvement.

### Data Frequency

**Current**:
- Annual major updates (new year's data incorporated Q1-Q2 of following year)
- Quarterly minor updates (corrections and refinements)
- 1-3 month lag from source publication

**Planned**:
- Monthly M2/CPI tracking (2027)
- Real-time dashboard (Phase 2)
- Automated data pipeline

---

## 📐 Methodology Summary

### The Master DI Formula

```
Master DI = (Computing × 0.2941) + (Communications × 0.2353) + (Energy × 0.2941) + (Transport × 0.1765)
```

**Weight Justification**:

These weights reflect relative economic importance across three dimensions:

1. **GDP Contribution**: Share of US GDP from these sectors
2. **Enabling Effect**: Degree to which other sectors depend on this technology
3. **Deflationary Force**: Magnitude of cost reduction in sector

**Sensitivity Analysis**:

We tested alternative weighting schemes:
- Equal weights (25% each): DI = -9.0% annual average
- GDP-weighted: DI = -8.5% annual average
- Expenditure-weighted: DI = -8.8% annual average
- Current method (multi-factor): DI = -9.21% annual average

**Result**: ±8% variation across methods. Core finding robust to weighting choice.

Full methodology documentation: [docs/methodology/](docs/methodology/)

### Calculation Process

1. **Measure cost-per-performance** for each component ($/GFLOPS, $/GB, $/kWh)
2. **Index to base year** (1990=100 for most components)
3. **Combine components within sectors** using weighted averages and sector-specific weights
4. **Calculate Master DI** from sector indices using formula above
5. **Compare to M2 and CPI** to reveal gaps

### The Gaps

**Deflation Gap (251pp cumulative, 8.4pp annual)**:
```
Deflation Gap = |Tech Deflation| + CPI Inflation
              = 96pp + 155pp = 251pp
```
Measures deflation that should have reached consumers but didn't.

**Abundance Gap (560pp cumulative, 12.1pp annual)**:
```
Abundance Gap = |Tech Deflation| + M2 Expansion - CPI Inflation
              = 96pp + 615pp - 155pp = 560pp
```
Measures total economic force captured rather than passed to consumers (includes monetary policy effects).

---

## 📊 Data Sources

All data comes from authoritative, publicly available sources:

| Source | What We Use | Reliability |
|--------|-------------|-------------|
| **Federal Reserve (FRED)** | M2 money supply, CPI data | 100/100 (A+) |
| **Bureau of Labor Statistics** | CPI components, historical pricing | 100/100 (A+) |
| **IRENA** | Solar LCOE, renewable energy costs | 95/100 (A) |
| **BloombergNEF** | Battery costs, EV economics | 95/100 (A) |
| **AI Impacts** | Computing power costs (FLOPS) | 90/100 (A-) |
| **DOE** | LED efficiency, transportation data | 95/100 (A) |
| **FCC** | Broadband pricing, network costs | 90/100 (A-) |
| **Backblaze** | Hard drive cost tracking | 85/100 (B+) |

**Average source reliability**: 92/100 (A-grade)

Every data point includes source citations in Excel cell comments. Full source documentation: [docs/methodology/DATA_SOURCES.md](docs/methodology/DATA_SOURCES.md)

---

## 📈 Quality Standards

### The Numbers

- **700+ formulas**: Every calculation is formula-driven in Excel
- **400+ data points**: Comprehensive coverage across 35 years
- **0 errors**: All formulas verified, no broken links or circular references
- **100% sourced**: Every data point has source citation in cell comments

### Quality Grading System

| Grade | Score | Criteria |
|-------|-------|----------|
| **A (Excellent)** | 85-100 | Government agencies, peer-reviewed research, industry gold standards |
| **B (Good)** | 70-84 | Reputable industry reports, academic estimates, established analysts |
| **C (Fair)** | 50-69 | Secondary sources, interpolations, reasonable estimates |
| **D (Poor)** | <50 | Weak sources, speculative estimates (not used in index) |

### Transparency Commitment

Every Excel file includes:
- Source URLs in cell comments
- Quality flags for each data point
- Methodology notes explaining calculations
- Complete formula transparency (no hidden cells)
- Color-coded formatting (blue = raw data, black = formulas, yellow = estimates)

**Anyone can verify our work. That's the standard we hold ourselves to.**

### v3.0.1 Rebuild (December 2025)

This version represents a complete rebuild of the Master Deflation Index:
- All calculations now use formulas (previously hard-coded values)
- Weights referenced from single source for consistency
- 4-decimal precision (weights sum to exactly 1.0000)
- Fully reproducible and verifiable
- More accurate deflation measurements from source data

**Why numbers changed from v3.0**: Previous version used externally calculated values. v3.0.1 calculates directly from raw source data, revealing more accurate (and more dramatic) deflation rates.

---

## 🤝 Academic Review & Collaboration

**The Deflation Index methodology is open for academic scrutiny.**

### Seeking Peer Review

We welcome formal peer review from:
- Academic economists (monetary policy, price indices, hedonic methods)
- Statisticians (quality adjustment, index construction)
- Sector experts (energy economists, computing historians, communications researchers)

### Collaboration Opportunities

**We're looking for:**
- **Academic partnerships** for v4.0 sector expansion (healthcare, education, housing)
- **Joint research** on methodology improvements and applications
- **Integration opportunities** with existing research and databases
- **Critical feedback** on assumptions, methods, and data quality

**Current Status**:
- Methodology papers in development
- Seeking university partnerships for peer review
- Open to funded research collaborations

### How to Contribute

**Data improvements**: If you have better data sources or spot errors, please [open an issue](https://github.com/deflation-index/deflation-index/issues) with details and citations.

**Methodology feedback**: Challenge our assumptions, suggest alternative calculations, or propose new sectors to track. We're committed to rigor and welcome scholarly debate.

**Sector expertise**: Have domain knowledge in healthcare, education, or housing cost dynamics? We need experts for v4.0.

**Code contributions**: Improvements to data pipelines, visualization tools, or automation welcome via pull requests.

**Contact**: research@deflationindex.com

---

## 🚀 Roadmap

### v3.0.1 (Current - December 2025)
- ✅ Four sectors: Computing, Communications, Energy, Transportation
- ✅ 35 years of data (1990-2024)
- ✅ 700+ verified formulas, 0 errors
- ✅ Complete methodology documentation
- ✅ Formula-based calculations (fully reproducible)
- ✅ 4-decimal weight precision

### v3.1 (Q2-Q3 2026)
- 2025 data integration
- Minor methodology refinements
- First annual update cycle

### v3.2+ (2027)
- Annual updates continue
- Monthly M2/CPI tracking (automated)
- API v1.0 launch

### v4.0 (2027-2028)
- Healthcare sector: Drug costs, medical devices, genomic sequencing
- Education sector: Online learning, digital textbooks, MOOCs
- Housing sector: Construction productivity, modular housing, smart home tech
- Rebalanced weights across seven sectors
- Expenditure-weighted methodology option

### Phase 2 (2028+)
- Real-time dashboard
- Geographic breakdowns (US states, international)
- Additional sectors as methodology permits
- Advanced API with custom queries

---

## 📄 Documentation

### Core Documentation
- **[Methodology Overview](docs/methodology/MASTER_METHODOLOGY.md)**: Complete methodology
- **[Executive Summary](docs/summaries/EXECUTIVE_SUMMARY.md)**: High-level overview
- **[Data Hygiene Standards](docs/methodology/DATA_HYGIENE_STANDARDS.md)**: Quality control processes
- **[Weight Justification](docs/methodology/WEIGHT_JUSTIFICATION.md)**: Detailed weight rationale and sensitivity analysis

### Sector Documentation
- **[Computing Methodology](docs/methodology/COMPUTING_METHODOLOGY.md)**
- **[Communications Methodology](docs/methodology/COMMUNICATIONS_METHODOLOGY.md)**
- **[Energy Methodology](docs/methodology/ENERGY_METHODOLOGY.md)**
- **[Transportation Methodology](docs/methodology/TRANSPORTATION_METHODOLOGY.md)**

### Additional Resources
- **[CHANGELOG](docs/project/CHANGELOG.md)**: Version history and updates
- **[Contributing Guidelines](CONTRIBUTING.md)**: How to contribute
- **[Mission Statement](docs/summaries/MISSION_COMPLETE.md)**: Project vision and goals

---

## 💼 Usage & Citation

### Permitted Uses

The data is currently under a proprietary license, but we strongly encourage:
- **Academic research**: Cite the Deflation Index in papers, dissertations, publications
- **Journalism**: Reference findings in articles and reports
- **Policy analysis**: Use data to inform economic policy recommendations
- **Education**: Teaching economics, monetary policy, technology trends
- **Personal analysis**: Blog posts, social media, newsletter content

### Required Attribution

```
The Deflation Index: Measuring Technological Progress (1990-2024)
Deflation Index LLC, v3.0.1
Available at: github.com/deflation-index/deflation-index
```

### Not Permitted Without Permission

- Commercial redistribution or resale of the data
- Incorporation into proprietary financial products
- Derivative indices marketed commercially

### API Access

**Coming 2026-2027:**
- Free tier: Basic access, rate-limited
- Premium tier: Full API access ($99-299/month)
- Institutional tier: Custom solutions ($10k-50k/year)

Contact for early access or partnerships.

---

## 📞 Contact

- **Website**: [deflationindex.com](https://deflationindex.com) (launching 2026)
- **Email**: contact@deflationindex.com
- **Research inquiries**: research@deflationindex.com
- **GitHub Issues**: [Technical discussions](https://github.com/deflation-index/deflation-index/issues)

---

## 📜 License

© 2024-2025 Deflation Index LLC. All rights reserved.

Data sources are publicly available. Calculations and methodology are original work subject to proprietary license with academic/journalistic use permitted with attribution.

See [LICENSE](LICENSE) for full terms.

---

## 🎯 Mission

**Built to measure the force of technological progress and track where the abundance goes.**

Technology is the primary driver of human prosperity. Understanding where those gains flow—to consumers, to capital holders, to asset prices, to complexity costs—is essential for economic policy and social equity.

The Deflation Index exists to provide objective, transparent, verifiable measurement of this phenomenon. Not as theory, but as data. Not as advocacy, but as economics. Not as accusation, but as measurement.

---

**Version**: 3.0.1  
**Last Updated**: December 2025  
**Next Update**: Q2-Q3 2026 (v3.1 with 2025 data)
