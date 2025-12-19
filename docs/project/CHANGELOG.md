# Changelog

All notable changes to the Deflation Index will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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

**Impact**:
- Numbers changed significantly (~12 percentage points more deflation)
- But now backed by formulas, not assumptions
- Can be verified by any external researcher
- Foundation is now bulletproof for scaling

**Gap Analysis Updates**:
- Abundance Gap: 545pp → 560pp (15pp wider)
- Deflation Gap: 239pp → 251pp (12pp wider)
- The missing wealth transfer is LARGER than previously measured

## [3.0.0] - 2025-12-15

### Added
- Transportation sector (EV batteries, autonomous tech, vehicle efficiency, ridesharing)
- 15 years of transportation data (2010-2024)
- Expanded index from 3 to 4 sectors

### Changed
- Updated sector weights to include Transportation
- Rebalanced weights: Computing 29.4%, Communications 23.5%, Energy 29.4%, Transportation 17.6%
- Updated all calculations and documentation

## [2.0.0] - 2024-01-15

### Added
- 2024 data for all sectors
- Updated M2 and CPI data through 2024

### Changed
- Annual data update
- Minor methodology refinements

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
- **Patch version** (3.0.X): Bug fixes, documentation updates, minor corrections

---

## Upcoming

### v3.1 (Q2-Q3 2026)
- 2025 data integration
- First annual update with v3.0.1 formula-based methodology

### v4.0 (2027-2028)
- Healthcare, Education, Housing sectors
- Major weight rebalancing
- Expenditure-weighted option

---

**For detailed methodology changes, see docs/methodology/MASTER_METHODOLOGY.md**
