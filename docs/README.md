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
- **General inquiries**: contact@deflationindex.com
