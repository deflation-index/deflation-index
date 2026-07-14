> **v4.0.0 (2026-07-13):** The index now uses weighted geometric aggregation over single sourced metrics per sector. Anchor ledger and verification standards: [`data/v4/sources_manifest.md`](../../data/v4/sources_manifest.md). Audit: [`AUDIT_2026-07_COMPUTING_SERIES.md`](AUDIT_2026-07_COMPUTING_SERIES.md). Documents in this folder describing v3 construction carry a superseded banner.

# Methodology Documentation

**Version**: 3.1.1
**Last Updated**: April 2026

This folder contains the complete methodology documentation for the Deflation Index.

---

## Document Overview

### Core Methodology

| Document | Description | Read Time |
|----------|-------------|-----------|
| [MASTER_METHODOLOGY.md](MASTER_METHODOLOGY.md) | **Start here** - Complete methodology, formulas, and rationale | 45 min |
| [WEIGHT_JUSTIFICATION.md](WEIGHT_JUSTIFICATION.md) | Why sectors are weighted as they are | 15 min |
| [VARIANTS.md](VARIANTS.md) | Alternative weighting schemes (Equal, Expenditure, GDP) | 10 min |
| [DATA_STANDARDS.md](DATA_STANDARDS.md) | Data quality, formatting, and hygiene standards | 10 min |

### Sector Methodologies

| Document | Sector | Weight | Coverage |
|----------|--------|--------|----------|
| [COMPUTING.md](COMPUTING.md) | Computing | 29.41% | 1990-2025 |
| [COMMUNICATIONS.md](COMMUNICATIONS.md) | Communications | 23.53% | 1998-2025 |
| [ENERGY.md](ENERGY.md) | Energy | 29.41% | 2010-2025 |
| [TRANSPORTATION.md](TRANSPORTATION.md) | Transportation | 17.65% | 2010-2025 |

---

## Key Methodological Principles

### 1. Formula-Based Calculations
Every value in the Deflation Index is calculated via Excel formulas, not hard-coded. This ensures:
- Complete reproducibility
- Traceable calculations
- Easy verification

### 2. Authoritative Sources Only
We use Tier 1 sources whenever possible:
- **FRED** (Federal Reserve Economic Data)
- **IRENA** (International Renewable Energy Agency)
- **BloombergNEF** (Battery pricing)
- **BLS** (Bureau of Labor Statistics)
- **DOE** (Department of Energy)

### 3. Conservative Estimates
When data is uncertain, we choose the more conservative estimate. This understates deflation rather than overstating it.

### 4. Quality Adjustments
Raw price changes are adjusted for quality improvements:
- Performance per dollar
- Efficiency gains
- Durability improvements

---

## The Master Formula

```
Master_DI = Σ (Sector_Index × Sector_Weight)
```

Where:
- **Computing**: 29.41% weight
- **Communications**: 23.53% weight
- **Energy**: 29.41% weight
- **Transportation**: 17.65% weight
- **Total**: 100.00%

---

## Key Statistics (v4.0.0, geometric DI 1990–2025)

### Deflation Index
| Metric | Value |
|--------|-------|
| 1990 Baseline | 100.00 |
| 2025 Value | 0.034 |
| Cumulative Deflation | -99.97% |
| Annual Rate (CAGR) | -20.4% |

### M2 Money Supply (FRED M2SL)
| Metric | Value |
|--------|-------|
| 1990 Value | $3,276.8B |
| 2025 Value | $21,970B |
| Cumulative Expansion | +575.7% |
| Annual Rate (CAGR) | +5.66% |

### The Gap
| Metric | Value |
|--------|-------|
| Annual DI-M2 Gap | 26.0pp (v4) |
| Cumulative Gap | ~526pp (1990–2025, v4) |

---

## Related Files

- **Data Source**: `data/constants.json`
- **v4 Master Index**: `data/master_index.json` (+ anchor ledger in `data/v4/`)
- **Legacy Excel Master (v3)**: `data/excel/master_deflation_index_v3.0.3.xlsx`
- **Verification**: `scripts/verify_statistics.py`

---

## Questions?

For methodology questions, see [MASTER_METHODOLOGY.md](MASTER_METHODOLOGY.md) Section 10 (FAQ) or open a GitHub issue.
