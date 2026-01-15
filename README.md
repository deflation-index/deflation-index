<p align="center">
  <img src="assets/logo/icon/di_logo_primary.svg" alt="The Deflation Index" height="80">
</p>

<h1 align="center">The Deflation Index</h1>
<h3 align="center">Tracking where the abundance goes</h3>

<p align="center">
Technology got dramatically cheaper. Computing power increased 100,000x. Solar panels fell 90%. Data became nearly free. But life didn't get cheaper.
</p>

<p align="center">
<strong>The Deflation Index measures this gap across four fundamental sectors—and reveals where the abundance went.</strong>
</p>

[![License](https://img.shields.io/badge/license-Proprietary-red.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-3.0.3-blue.svg)](CHANGELOG.md)
[![Data Points](https://img.shields.io/badge/data%20points-400%2B-green.svg)](#)
[![Formulas](https://img.shields.io/badge/formulas-900%2B-green.svg)](#)

---

## 📊 Key Findings (1990-2024)

* **Technology deflation**: -96% cumulative (-9% annual average)
* **M2 money supply growth**: +550% cumulative (+6% annual average)  
* **Cumulative gap**: 646 percentage points (15pp annually)

*Note: Narrative values rounded for readability; precise values maintained in datasets.*

---

## 👥 Who Uses This

The Deflation Index serves four primary audiences:

**📊 Investors** — Identify which sectors have real deflation vs monetary distortion. Allocate capital based on fundamental cost trends, not just nominal prices.

**🏢 Businesses** — See which sectors are experiencing sustainable cost reduction. Build where technology delivers real abundance, not just monetary inflation.

**👤 Individuals** — Understand why rent tripled while computing collapsed. See the data behind why life feels more expensive despite obvious technological progress.

**📚 Researchers** — Access rigorous methodology with transparent calculations. All data sourced, all formulas verifiable, all assumptions documented.

The core question: "Technology got cheaper—where did the abundance go?"

---

## 🎯 Current Scope (v3.0.3)

**Four Sectors Covered:**
1. **Computing (29.41%)**: Cost per billion floating-point operations per second ($/GFLOPS) - 99.88% deflation
2. **Communications (23.53%)**: Cost per gigabyte of data transmission ($/GB) - 99.27% deflation
3. **Energy (29.41%)**: Levelized cost of electricity from solar ($/kWh) - 98.42% deflation
4. **Transportation (17.65%)**: Battery pack cost per kilowatt-hour ($/kWh) - 82.59% deflation

**Time Coverage**: 1990-2024 (35 years)
**Data Points**: 400+ verified measurements
**Formulas**: 900+ calculations
**Update Frequency**: Annual major updates, quarterly refinements



## 💡 Why Focus on Technology?

Technology is the primary driver of long-term productivity growth. This isn't ideology—it's historical fact.

**The Evidence:**
- GDP per capita was flat for 2,000 years until the Industrial Revolution
- Every major productivity leap correlates with technological breakthroughs
- From 1990-2024: Computing costs fell 99.88%, solar energy 98.42%, data transmission 99.27%

**The Question:**

If technology sectors show exponential cost reductions, why don't consumer prices fall proportionally?

The Deflation Index measures this divergence. We track cost-per-performance in four technology sectors, compare to M2, and calculate the gap: **14.9 percentage points annually.**

**This gap represents captured productivity.** It went somewhere. This index exists to measure where.

**Full context:** [Why Technology Matters](docs/WHY_TECHNOLOGY_MATTERS.md)

---
---

## 📁 Repository Structure

```
deflation-index/
├── assets/                     # Brand assets and images
│   └── logo/                   # Official logos (see assets/logo/README.md)
├── data/                       # Source data and calculations
│   ├── constants.json          # Single source of truth (v3.0.3)
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
├── about.html                  # About page
├── methodology.html            # Methodology page
├── faq.html                    # FAQ page
├── collaborate.html            # Collaboration page
├── products.html               # Products/API page
├── LICENSE                     # Proprietary license
└── README.md                   # This file
```

---

## 🔍 Known Limitations & Future Improvements

**We're transparent about where the Deflation Index is currently limited:**

### Current Scope Limitations

**Sectors Covered (v3.0.3)**:
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

This measures the annual divergence between technological deflation and monetary expansion. Over 35 years, this compounds dramatically—technology pushed costs down while money supply expansion pushed them up. The gap represents productivity gains that didn't reach consumers as lower prices.

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

### v3.0.3 (Current - January 2026)
- ✅ Four sectors: Computing, Communications, Energy, Transportation
- ✅ 35 years of data (1990-2024)
- ✅ 900+ verified formulas
- ✅ Complete methodology documentation
- ✅ Simplified sensitivity analysis (2 methodologies)
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
- Rigorous BLS/BEA-derived sensitivity analyses

### Phase 2 (2028+)
- Real-time dashboard
- Geographic breakdowns (US states, international)
- Additional sectors as methodology permits
- Advanced API with custom queries

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
- **[Contributing Guidelines](CONTRIBUTING.md)**: How to contribute

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
Deflation Index LLC, v3.0.3
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

- **Website**: [deflationindex.com](https://deflationindex.com)
- **Email**: info@deflationindex.com
- **GitHub Issues**: [Technical discussions](https://github.com/deflation-index/deflation-index/issues)

---

## 📜 License

© 2026 Deflation Index LLC. All rights reserved.

### Data & Methodology
Data sources are publicly available. Calculations and methodology are original work subject to proprietary license with academic/journalistic use permitted with attribution.

### Brand Assets
The Deflation Index name, logo, and brand assets (located in `/assets/`) are proprietary trademarks of Deflation Index LLC. Use is permitted for attribution, academic citation, and journalistic reference. See [assets/logo/README.md](assets/logo/README.md) for usage guidelines.

See [LICENSE](LICENSE) for full terms.

---

## 🎯 Mission

**Built to measure the force of technological progress and track where the abundance goes.**

Technology is the primary driver of human prosperity. Understanding where those gains flow—to consumers, to capital holders, to asset prices, to complexity costs—is essential for economic policy and social equity.

The Deflation Index exists to provide objective, transparent, verifiable measurement of this phenomenon. Not as theory, but as data. Not as advocacy, but as economics. Not as accusation, but as measurement.

---

**Version**: 3.0.3  
**Last Updated**: January 2026  
**Next Update**: Q2-Q3 2026 (v3.1 with 2025 data)
