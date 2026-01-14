# Deflation Index Documentation

**Version**: 3.0.3  
**Last Updated**: January 10, 2026

Welcome to the Deflation Index documentation. This index helps you navigate our comprehensive methodology, reference materials, and operational guides.

---

## 📁 Documentation Structure

### [methodology/](methodology/)
Core methodology and sector-specific documentation.

| Document | Description |
|----------|-------------|
| [MASTER_METHODOLOGY.md](methodology/MASTER_METHODOLOGY.md) | Complete methodology (start here) |
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
Deployment, contribution, and operational guides.

| Document | Description |
|----------|-------------|
| [CHANGELOG.md](operations/CHANGELOG.md) | Version history and changes |
| [CONTRIBUTING.md](operations/CONTRIBUTING.md) | How to contribute |
| [DEPLOYMENT.md](operations/DEPLOYMENT.md) | Cloudflare Pages deployment guide |
| [QUICKSTART.md](operations/QUICKSTART.md) | 30-minute setup guide |
| [RESEARCH_DASHBOARD.md](operations/RESEARCH_DASHBOARD.md) | Source tracking and evaluation |

---

## 🚀 Quick Links

### New to the Deflation Index?
1. Start with [EXECUTIVE_SUMMARY.md](about/EXECUTIVE_SUMMARY.md)
2. Read [WHY_TECHNOLOGY_MATTERS.md](about/WHY_TECHNOLOGY_MATTERS.md)
3. Dive into [MASTER_METHODOLOGY.md](methodology/MASTER_METHODOLOGY.md)

### Want to understand the data?
1. Review [DATA_STANDARDS.md](methodology/DATA_STANDARDS.md)
2. Check [EXCEL_GUIDE.md](reference/EXCEL_GUIDE.md)
3. Explore sector methodologies in [methodology/](methodology/)

### Want to contribute or deploy?
1. Read [CONTRIBUTING.md](operations/CONTRIBUTING.md)
2. Follow [QUICKSTART.md](operations/QUICKSTART.md)
3. Use [DEPLOYMENT.md](operations/DEPLOYMENT.md) for production

---

## 📊 Key Statistics (v3.0.3)

| Metric | Value | Source |
|--------|-------|--------|
| DI Annual Rate | -9.21% | Master DI v3.0.2 |
| DI Cumulative | -96.25% | Master DI v3.0.2 |
| M2 Annual Rate | +5.66% | FRED M2SL |
| M2 Cumulative | +550.0% | FRED M2SL |
| DI-M2 Gap | 14.9pp | Calculated |

**Single Source of Truth**: All statistics derive from `data/constants.json`

---

## 🎯 Current Scope & Limitations

### What's Included in v3.0.3

The Deflation Index currently measures **four foundational technology sectors**:

| Sector | Coverage Period | Cumulative Deflation |
|--------|----------------|---------------------|
| Computing | 1990-2024 (35 years) | -99.88% |
| Communications | 1990-2024 (35 years) | -99.27% |
| Energy | 1990-2024 (35 years) | -98.42% |
| Transportation | 2010-2024 (15 years) | -82.59% |

**Coverage:** These sectors represent approximately **40% of direct technological impact** on the US economy.

### Why These Four Sectors?

We selected these sectors because they are **foundational technologies** that:

1. ✅ **Enable other sectors** – Computing powers everything from healthcare to finance; energy is required for all economic activity
2. ✅ **Show measurable deflation** – Clear cost-per-performance metrics ($/GFLOPS, $/kWh, $/GB)
3. ✅ **Have high-quality data** – Tier 1 sources from government agencies and established institutions
4. ✅ **Represent diverse types** – Digital (computing, communications), physical (energy, transportation)

**This is not cherry-picking.** These are the sectors where:
- Data quality is highest (Tier 1: FRED, IRENA, BloombergNEF, BLS, DOE)
- Measurements are most reliable (standardized metrics, authoritative sources)
- Deflation is most consistent (35-year time series demonstrates trend durability)

### What's NOT Included (Yet)

**Sectors excluded from v3.0.3:**

| Sector | Status | Reason for Exclusion |
|--------|--------|---------------------|
| Healthcare | ❌ Planned v4.0 (2026-2027) | Complexity costs rising despite tech deflation (genomic sequencing ↓99.9%, but healthcare spending ↑) |
| Education | ❌ Planned v4.0 (2026-2027) | Mixed signals: online learning ↓90% cost, but university tuition ↑400% |
| Housing | ❌ Planned v4.0 (2027-2028) | Methodology needs development: how to isolate tech deflation (modular construction) from land/regulatory costs? |
| Food/Agriculture | ⏸️ Under evaluation | Genetic engineering delivers deflation, but consumer prices complex (distribution, retail markup) |
| Manufacturing | ⏸️ Under evaluation | Automation delivers productivity, but complexity costs may offset |

**Why excluded?** Not because they don't matter or don't have technological deflation, but because:
1. **Data quality insufficient** for Tier 1 inclusion (require Tier 2-3 sources with lower reliability)
2. **Complexity costs may offset deflation** (healthcare tech improves, but system costs rise faster)
3. **Methodology needs development** (isolating technology deflation from other factors is challenging)

**We'd rather be accurate with 4 sectors than speculative with 10.**

### Roadmap for Expansion

**Our expansion plan maintains quality standards while broadening coverage:**

#### v3.1 (Q2 2026)
- Quarterly data updates (no new sectors)
- Enhanced automation and real-time pulls
- API beta launch

#### v4.0 (2026-2027) – Healthcare Sector
**Target:** Add healthcare as 5th sector
- **Metrics:** Genomic sequencing costs ($/genome), medical imaging ($/scan), telemedicine ($/consultation)
- **Challenge:** Isolate technology deflation from system complexity and regulatory costs
- **Coverage:** ~50% of technological impact when combined with existing 4 sectors
- **Methodology:** Collaborate with health economists on quality-adjusted measurements

#### v4.1 (2027) – Education Sector  
**Target:** Add education as 6th sector
- **Metrics:** Online learning costs, digital textbook prices, AI tutoring costs
- **Challenge:** Separate technology benefits from credential inflation
- **Coverage:** ~55-60% of technological impact
- **Methodology:** Work with education researchers on learning outcome measurements

#### v5.0 (2028) – Housing/Construction Sector
**Target:** Add housing as 7th sector
- **Metrics:** Modular construction costs, building automation, smart home technology
- **Challenge:** Isolate technology costs from land values and regulatory burdens
- **Coverage:** ~65-70% of technological impact
- **Methodology:** Partner with urban economists on hedonic housing models

**Goal:** Expand to **7+ sectors representing 60-70% of technological impact by 2028.**

### Transparency Commitment

We explicitly acknowledge our limitations:

✅ **Current index is partial, not comprehensive** (40% coverage)  
✅ **Findings are robust within measured sectors** (sensitivity analysis confirms)  
✅ **Expansion planned with same quality standards** (no compromise on data rigor)  
✅ **Transparent about what's included and excluded** (no hidden assumptions)

**Core principle:** We'd rather have a smaller index that's bulletproof than a larger index that's questionable.

---

## 🔄 Sensitivity Analysis

We provide two weighting methodologies to demonstrate robustness:

| Methodology | 2024 DI | Cumulative | Annual |
|-------------|---------|------------|--------|
| **Multi-Factor (Primary)** | 3.74 | -96.25% | -9.21% |
| Equal-Weighted (Baseline) | 4.96 | -95.04% | -8.45% |

**Key Finding**: Both methodologies confirm massive technological deflation (95-96% cumulative). See [VARIANTS.md](methodology/VARIANTS.md) for details.

---

## 📁 Data Files

| File | Location | Description |
|------|----------|-------------|
| `constants.json` | `data/constants.json` | Authoritative statistics |
| Master Index | `data/excel/master_deflation_index_v3.0.2.xlsx` | Primary calculations |
| Equal-Weighted | `data/excel/master_deflation_index_v3.0.1_EQUAL.xlsx` | Baseline methodology |
| Sector Files | `data/excel/[sector]_deflation_index_v1.0.xlsx` | Sector data |
| CSV Exports | `data/csv/` | Machine-readable exports |

---

## 🔗 External Links

- **Website**: [deflationindex.com](https://deflationindex.com)
- **GitHub**: [github.com/deflation-index/deflation-index](https://github.com/deflation-index/deflation-index)
- **FRED M2 Data**: [fred.stlouisfed.org/series/M2SL](https://fred.stlouisfed.org/series/M2SL)

---

## ❓ Questions?

- **Technical issues**: Open a GitHub issue
- **Methodology questions**: See [MASTER_METHODOLOGY.md](methodology/MASTER_METHODOLOGY.md)
- **General inquiries**: info@deflationindex.com
