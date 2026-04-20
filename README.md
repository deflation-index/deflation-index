<p align="center">
  <img src="assets/logo/icon/di_logo_primary.svg" alt="The Deflation Index" height="80">
</p>

<h1 align="center">The Deflation Index</h1>
<h3 align="center">Measuring technological deflation</h3>

<p align="center">
Technology got dramatically cheaper. Computing power increased 100,000x. Solar panels fell 90%. Data became nearly free.
</p>

<p align="center">
<strong>The Deflation Index measures technological cost reduction across four fundamental sectors, helping you understand where the productivity gains flow.</strong>
</p>

[![License](https://img.shields.io/badge/license-CC%20BY%204.0-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-3.1.1-blue.svg)](docs/operations/CHANGELOG.md)
[![Data Points](https://img.shields.io/badge/data%20points-400%2B-green.svg)](#)
[![Formulas](https://img.shields.io/badge/formulas-900%2B-green.svg)](#)

---

## 📊 Key Findings (1990-2024)

* **Technology deflation**: -96% cumulative (-9% annual average)
* **Compare to:** CPI +2.8% annually | M2 +5.7% annually | Asset prices vary widely
* **Distribution question**: Where did the productivity gains flow?

*Note: Narrative values rounded for readability; precise values maintained in datasets.*

---

## 👥 Who Uses This

The Deflation Index serves four primary audiences:

**📊 Investors** - Identify which sectors have real deflation vs monetary distortion. Allocate capital based on fundamental cost trends, not just nominal prices.

**🏢 Businesses** - See which sectors are experiencing sustainable cost reduction. Build where technology delivers real abundance, not just monetary inflation.

**👤 Individuals** - Understand why rent tripled while computing collapsed. See the data behind why life feels more expensive despite obvious technological progress.

**📚 Researchers** - Access rigorous methodology with transparent calculations. All data sourced, all formulas verifiable, all assumptions documented.

The core question: "Technology got cheaper - where did the abundance go?"

---

## 🎯 Current Scope (v3.1.1)

**Four Sectors Covered:**
1. **Computing (29.41%)**: Cost per billion floating-point operations per second ($/GFLOPS) - 99.88% deflation
2. **Communications (23.53%)**: Cost per gigabyte of data transmission ($/GB) - 99.27% deflation
3. **Energy (29.41%)**: Levelized cost of electricity from solar ($/kWh) - 98.42% deflation
4. **Transportation (17.65%)**: Battery pack cost per kilowatt-hour ($/kWh) - 82.59% deflation

**Time Coverage**: 1990–2024 weighted index; 2025 early-read for M2 and CPI (full 2025 weighted DI arrives in v4.0, Q3 2026, gated on IRENA & NREL)
**Data Points**: 400+ verified measurements
**Formulas**: 900+ calculations
**Update Frequency**: Annual major updates, point releases for monetary-data refreshes



## 💡 Why Focus on Technology?

Technology is the primary driver of long-term productivity growth. This isn't ideology - it's historical fact.

**The Evidence:**
- GDP per capita was flat for 2,000 years until the Industrial Revolution
- Every major productivity leap correlates with technological breakthroughs
- From 1990-2024: Computing costs fell 99.88%, solar energy 98.42%, data transmission 99.27%

**The Question:**

If technology sectors show exponential cost reductions, why don't consumer prices fall proportionally?

The Deflation Index measures technological cost reduction rigorously and transparently. We track cost-per-performance in four technology sectors and compare to multiple economic indicators (CPI, M2, wage growth) to understand where productivity gains flow.

**The core insight:** Technology delivered massive deflation, but the benefits distributed unevenly, concentrating in asset prices and financial complexity rather than broad-based consumer price reductions.

**Full context:** [Why Technology Matters](docs/about/WHY_TECHNOLOGY_MATTERS.md)

---
---

## 📁 Repository Structure

```
deflation-index/
├── assets/                     # Brand assets and images
│   └── logo/                   # Official logos (see assets/logo/README.md)
├── blog/                       # Blog posts
├── data/                       # Source data and calculations
│   ├── constants.json          # Single source of truth (v3.1.1)
│   ├── api/                    # JSON data for API/integrations
│   ├── excel/                  # Excel workbooks with formulas
│   ├── csv/                    # Exported CSV files
│   └── sources/                # Raw source documents
├── docs/                       # Documentation
│   ├── methodology/            # Sector methodologies
│   ├── reference/              # API, glossary, guides
│   ├── about/                  # Executive summary, essays
│   └── operations/             # Changelog, deployment, contributing
├── scripts/                    # Verification and automation
├── favicon.ico                 # Browser tab icon
├── di_logo_32.png              # Favicon 32x32
├── di_logo_64.png              # Favicon 64x64
├── index.html                  # Homepage
├── about.html                  # About page (includes collaboration section)
├── blog.html                   # Blog landing page
├── methodology.html            # Methodology page
├── faq.html                    # FAQ page
├── data.html                   # Data, downloads, sources, versions
├── products.html               # Redirect stub → /data.html (legacy URL)
├── LICENSE                     # CC BY 4.0
└── README.md                   # This file
```

---

## 🔍 Known Limitations & Future Improvements

**We're transparent about where the Deflation Index is currently limited:**

### Current Scope Limitations

**Sectors Covered (v3.1.1)**:
- ✅ Computing, Communications, Energy, Transportation
- ❌ Healthcare, Education, Housing, Agriculture, Materials, Software-as-Service

**Coverage**: The current four sectors represent approximately 40% of measurable technological deflation, not 100%. We prioritize defensible measurement over comprehensive coverage.

**Expansion Timeline**: v4.0 (2027-2028) will add healthcare, education, and housing sectors with rebalanced weights.

### Methodological Choices

**Weighting System**:
- Current weights (29.41%, 23.53%, 29.41%, 17.65%) based on three factors: GDP contribution, enabling effect, and deflationary force
- Detailed weight justification and sensitivity analysis in docs/methodology/WEIGHT_JUSTIFICATION.md
- Equal-weighted baseline tested to confirm robustness (see sensitivity analysis below)
- Results robust across methodologies (8.45-9.21% annual deflation)

**Index Construction**:
- Weighted averages used to capture sector contributions
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

### The DI Formula

```
DI = (Computing × 0.2941) + (Communications × 0.2353) + (Energy × 0.2941) + (Transport × 0.1765)
```

**Weight Justification**:

These weights reflect relative economic importance across three dimensions:

1. **GDP Contribution**: Share of US GDP from these sectors
2. **Enabling Effect**: Degree to which other sectors depend on this technology
3. **Deflationary Force**: Magnitude of cost reduction in sector

**Sensitivity Analysis**:

We provide two weighting methodologies to demonstrate robustness:

| Methodology | Annual Rate | Cumulative | 2024 DI |
|-------------|-------------|------------|---------|
| **Multi-Factor (Primary)** | -9.21% | -96.25% | 3.74 |
| Equal-Weighted (Baseline) | -8.45% | -95.04% | 4.96 |

**Result**: Both methodologies confirm massive technological deflation (95-96% cumulative). The core finding is robust regardless of weighting choice. Future versions (v4.0+) will implement rigorous BLS/BEA-derived sensitivity analyses when sector coverage expands.

Full methodology documentation: [docs/methodology/](docs/methodology/)

### Calculation Process

1. **Measure cost-per-performance** for each component ($/GFLOPS, $/GB, $/kWh)
2. **Index to base year** (1990=100 for most components)
3. **Combine components within sectors** using weighted averages and sector-specific weights
4. **Calculate DI** from sector indices using formula above
5. **Compare to M2** to reveal the gap

### The DI-M2 Gap

```
DI-M2 Gap = |DI Annual Rate| + M2 Annual Rate
          = 9.21% + 5.7% = 14.9 percentage points annually
```

This measures the annual divergence between technological deflation and monetary expansion. Over 35 years, this compounds dramatically - technology pushed costs down while money supply expansion pushed them up. The gap represents productivity gains that didn't reach consumers as lower prices.

---

## ✅ Data Quality & Verification

**Every number is verifiable. Every formula is transparent. Every source is cited.**

### The Numbers

- **900+ formulas**: Every calculation is formula-driven in Excel
- **400+ data points**: Comprehensive coverage across 35 years
- **100% sourced**: Every data point has source citation in cell comments
- **Fully reproducible**: Download the Excel files and verify every calculation

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

### Version History

**v3.1.1 (April 2026)**: Live FRED CSV retrieval of M2SL and CPIAUCSL replaced v3.1.0 press-release figures. Full 2025 monthly series for M2 and CPI added to `data/constants.json`; `data/api/m2_data.json` extended through 2025.

**v3.1.0 (April 2026)**: Additive 2025 early-read release. Added `supplemental_2025` block with measured 2025 inputs (M2, CPI, battery, AI compute). Weighted DI 1990–2024 unchanged.

**v3.0.3 (January 2026)**: Simplified sensitivity analysis from 4 variants to 2 methodologies (Multi-Factor + Equal-Weighted). Removed Expenditure and GDP variants pending rigorous BLS/BEA derivation in v4.0.

**v3.0.2 (December 2025)**: Complete rebuild with formula-based calculations, M2 data correction from FRED M2SL, 4-decimal weight precision.

**Why numbers are trustworthy**: All calculations derive directly from raw source data. Every value is traceable to authoritative sources.

---

## 🤝 Academic Review & Collaboration

**The Deflation Index methodology is open for academic scrutiny.**

### Seeking Review & Collaboration

We welcome engagement from multiple perspectives:

**Practitioners:**
- Investment analysts evaluating technology sectors
- Business strategists making allocation decisions
- Policy analysts studying economic trends

**Academics:**
- Economists studying monetary policy and price indices
- Statisticians specializing in quality adjustment and index construction
- Sector experts in energy, computing, communications, or transportation

**Critical Feedback:**
We especially value constructive criticism on methodology, data quality, and assumptions.

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

**Contact**: info@deflationindex.com

---

## 🚀 Roadmap

### v3.1.1 (Current — April 2026)
- ✅ Four sectors: Computing, Communications, Energy, Transportation
- ✅ 1990–2024 weighted index; 2025 early-read for M2 and CPI
- ✅ Live FRED CSV retrieval (M2SL + CPIAUCSL)
- ✅ 900+ verified formulas
- ✅ Complete methodology documentation
- ✅ Simplified sensitivity analysis (2 methodologies)
- ✅ 4-decimal weight precision

### v4.0 (Q3 2026)
- Full 2025 weighted DI recalculation
- Gated on IRENA *Renewable Power Generation Costs in 2025* (~July 2026)
- Gated on NREL ATB 2025 (late spring 2026)
- Re-anchor 1990 baseline against current FRED snapshot

### v5.0+ (2027–2028)
- Healthcare sector: Drug costs, medical devices, genomic sequencing
- Education sector: Online learning, digital textbooks, MOOCs
- Housing sector: Construction productivity, modular housing, smart home tech
- Rebalanced weights across seven sectors
- Rigorous BLS/BEA-derived sensitivity analyses

### Beyond
- Geographic breakdowns (US states, international)
- Additional sectors as methodology permits
- Open data API for programmatic access

---

## 📄 Documentation

### Core Documentation
- **[Methodology Overview](docs/methodology/MASTER_METHODOLOGY.md)**: Complete methodology
- **[Executive Summary](docs/about/EXECUTIVE_SUMMARY.md)**: High-level overview
- **[Data Standards](docs/methodology/DATA_STANDARDS.md)**: Quality control processes
- **[Weight Justification](docs/methodology/WEIGHT_JUSTIFICATION.md)**: Detailed weight rationale and sensitivity analysis

### Sector Documentation
- **[Computing Methodology](docs/methodology/COMPUTING.md)**
- **[Communications Methodology](docs/methodology/COMMUNICATIONS.md)**
- **[Energy Methodology](docs/methodology/ENERGY.md)**
- **[Transportation Methodology](docs/methodology/TRANSPORTATION.md)**

### Additional Resources
- **[CHANGELOG](docs/operations/CHANGELOG.md)**: Version history and updates
- **[Contributing Guidelines](docs/operations/CONTRIBUTING.md)**: How to contribute

---

## 💼 Usage & Citation

The Deflation Index data, calculations, and methodology are licensed under
[Creative Commons Attribution 4.0 (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/).
You are free to share and adapt the material — including commercially —
as long as you give appropriate credit.

Code in this repository is licensed under MIT.
Brand assets (name, logo) are trademarks and governed separately — see
[LICENSE](LICENSE) and [assets/logo/README.md](assets/logo/README.md).

### Suggested Citation

```
The Deflation Index: Measuring Technological Progress (1990–2024)
Deflation Index LLC, v3.1.1. CC BY 4.0.
Available at: deflationindex.com and github.com/deflation-index/deflation-index
```

### Common Use Cases

- **Academic research** — papers, dissertations, presentations
- **Journalism** — articles, explainers, reports
- **Policy analysis** — briefings, testimony, white papers
- **Education** — teaching economics, monetary policy, technology trends
- **Commercial analysis** — investment research, sector reports, newsletters

There are no access tiers, rate limits, or fees. All JSON, CSV, and Excel
files in this repo are the same data the site uses.

---

## 📞 Contact

- **Website**: [deflationindex.com](https://deflationindex.com)
- **Email**: info@deflationindex.com
- **GitHub Issues**: [Technical discussions](https://github.com/deflation-index/deflation-index/issues)

---

## 📜 License

© 2026 Deflation Index LLC. Licensed for open use.

- **Code** (scripts, HTML, CSS, JS) — [MIT License](LICENSE)
- **Data, methodology, and documentation** — [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)
- **Brand assets** (name, logo) — trademarks reserved; attribution and editorial/academic use permitted. See [assets/logo/README.md](assets/logo/README.md).

See [LICENSE](LICENSE) for full terms.

---

## 🎯 Mission

**Built to measure the force of technological progress and track where the abundance goes.**

Technology is the primary driver of human prosperity. Understanding where those gains flow (to consumers, to capital holders, to asset prices, to complexity costs) is essential for economic policy and social equity.

The Deflation Index exists to provide objective, transparent, verifiable measurement of this phenomenon. Not as theory, but as data. Not as advocacy, but as economics. Not as accusation, but as measurement.

---

**Version**: 3.1.1
**Last Updated**: April 2026
**Next Update**: v4.0 — Q3 2026 (full 2025 weighted DI recalculation)
