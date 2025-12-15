# Research Dashboard - Data Source Tracking
## The Deflation Index - Sector Expansion Research

**Version**: 1.0  
**Last Updated**: December 15, 2025  
**Purpose**: Track and evaluate potential data sources for all sectors before committing to inclusion

---

## HOW TO USE THIS DASHBOARD

**Workflow**:
1. Add potential data sources to "PIPELINE" as they're discovered
2. Evaluate each source using the scoring rubric
3. Move to "APPROVED" when all criteria are met
4. Document in sector methodology file
5. Archive completed sources in "COMPLETED"

**Status Definitions**:
- 🔍 **PIPELINE**: Under investigation, not yet evaluated
- ⚠️ **IN REVIEW**: Being evaluated, awaiting final decision
- ✅ **APPROVED**: Meets all criteria, ready for implementation
- ❌ **REJECTED**: Does not meet criteria
- ✔️ **COMPLETED**: Implemented in DI dataset

---

## DATA SOURCE EVALUATION RUBRIC

### Quality Score (0-100 points)

**Reliability (0-30 points)**:
- [ ] 30: Government/peer-reviewed/industry standard-setter
- [ ] 20: Reputable private research firm with disclosed methodology
- [ ] 10: Industry publications with editorial review
- [ ] 0: Unverified or single-source claims

**Historical Coverage (0-25 points)**:
- [ ] 25: 1990-2024 complete coverage
- [ ] 20: 2000-2024 complete coverage
- [ ] 15: 2010-2024 complete coverage
- [ ] 10: Partial coverage, reconstructible
- [ ] 0: Insufficient historical data

**Update Frequency (0-15 points)**:
- [ ] 15: Annual or more frequent
- [ ] 10: Every 2-3 years
- [ ] 5: Irregular updates
- [ ] 0: One-time publication

**Accessibility (0-15 points)**:
- [ ] 15: Free, public, permanent URL
- [ ] 10: Academic access or paid subscription
- [ ] 5: Requires special request
- [ ] 0: Not publicly accessible

**Methodology Transparency (0-15 points)**:
- [ ] 15: Full methodology disclosed, reproducible
- [ ] 10: Methodology disclosed, some details missing
- [ ] 5: Limited methodology information
- [ ] 0: Black box / no methodology disclosed

**Total Score Requirements**:
- **85-100**: APPROVED - Tier 1 primary source
- **70-84**: APPROVED - Tier 2 primary source (supplement with cross-checks)
- **50-69**: IN REVIEW - Potential secondary source only
- **Below 50**: REJECTED

---

## TRANSPORTATION SECTOR

### ✅ APPROVED SOURCES

#### EV Battery Costs - BloombergNEF
**Status**: APPROVED ✅ | **Score**: 95/100  
**Source**: BloombergNEF Battery Price Survey (Annual)  
**URL**: https://about.bnef.com/blog/  
**Coverage**: 2010-2024 (primary), 1990-2009 (reconstructed)  
**Reliability**: 30/30 | **Coverage**: 20/25 | **Frequency**: 15/15 | **Access**: 15/15 | **Transparency**: 15/15  
**Notes**: Industry gold standard. Used by DOE, IRENA, major automakers. Detailed methodology published.  
**Action Items**:
- [x] Verify historical data back to 2010
- [x] Document reconstruction methodology for 1990-2009
- [x] Identify secondary sources for cross-validation
**Next Steps**: Implement in transportation_deflation_index.xlsx

#### Vehicle Efficiency - DOE Transportation Energy Data Book
**Status**: APPROVED ✅ | **Score**: 98/100  
**Source**: U.S. Department of Energy / Oak Ridge National Laboratory  
**URL**: https://tedb.ornl.gov/  
**Coverage**: 1970-2024 (exceptional)  
**Reliability**: 30/30 | **Coverage**: 25/25 | **Frequency**: 15/15 | **Access**: 15/15 | **Transparency**: 13/15  
**Notes**: Authoritative government source. Consistent methodology since 1970s. Some calculation details require inference.  
**Action Items**:
- [x] Download latest edition (Edition 42, 2024)
- [ ] Extract relevant tables (2.6, 2.12, 4.1)
- [ ] Verify units and conversion factors
**Next Steps**: Begin data extraction Q1 2026

### ⚠️ IN REVIEW

#### Autonomous Vehicle Costs - RAND Corporation
**Status**: IN REVIEW ⚠️ | **Score**: 72/100  
**Source**: RAND AV Cost-Benefit Studies  
**URL**: https://www.rand.org/topics/autonomous-vehicles.html  
**Coverage**: 2016-2023 (limited)  
**Reliability**: 30/30 | **Coverage**: 15/25 | **Frequency**: 10/15 | **Access**: 15/15 | **Transparency**: 12/15  
**Issues**:
- Historical coverage begins 2016 only (tech didn't exist earlier)
- Updates are irregular (tied to research projects)
- Some cost estimates are projections, not actual data
**Potential Uses**:
- Secondary validation source for Waymo data
- Cross-check for sensor cost trends
- Policy context for AV adoption modeling
**Decision**: ⏳ Hold until Waymo primary data is secured, then evaluate as secondary source  
**Action Items**:
- [ ] Review 3 most recent RAND reports on AV economics
- [ ] Compare RAND estimates to actual Waymo/Cruise disclosed costs
- [ ] Decide: primary source or secondary validation only?

#### Ride-Sharing Economics - UC Berkeley Transportation Studies
**Status**: IN REVIEW ⚠️ | **Score**: 68/100  
**Source**: UC Berkeley Institute of Transportation Studies  
**URL**: https://its.berkeley.edu/  
**Coverage**: 2018-2023  
**Reliability**: 25/30 | **Coverage**: 12/25 | **Frequency**: 10/15 | **Access**: 15/15 | **Transparency**: 13/15  
**Issues**:
- Limited to California data (not national)
- Methodology varies across studies (different research teams)
- Some metrics not directly comparable to SEC filings
**Potential Uses**:
- Validation of Uber/Lyft SEC filing interpretations
- Regional cost variation analysis
- Congestion impact modeling
**Decision**: ⏳ Evaluate alongside Uber/Lyft 10-K data to determine if adds unique value  
**Action Items**:
- [ ] Catalog all UC Berkeley ride-sharing studies 2016-2024
- [ ] Extract consistent metrics across studies
- [ ] Compare to Uber/Lyft investor disclosures

### 🔍 PIPELINE (Not Yet Evaluated)

#### Public Transit Cost Indices
**Source**: American Public Transportation Association (APTA)  
**URL**: https://www.apta.com/research-technical-resources/  
**Initial Assessment**: May have good data on bus/rail operating costs per passenger-mile  
**Next Steps**: Review APTA's Public Transportation Fact Book (annual)  
**Target Score**: 75-85 (government association, likely good transparency)  
**Priority**: Medium (expansion beyond personal vehicles)

#### Freight Transportation Efficiency
**Source**: Bureau of Transportation Statistics (BTS)  
**URL**: https://www.bts.gov/  
**Initial Assessment**: Likely excellent coverage, government source  
**Next Steps**: Review Freight Facts & Figures publication  
**Target Score**: 90+ (BTS is typically excellent)  
**Priority**: Medium (commercial vs. consumer focus)

#### Micro-Mobility Data
**Source**: NABSA (North American Bikeshare & Scooter Association)  
**URL**: https://nabsa.net/  
**Initial Assessment**: Unknown - need to investigate data availability  
**Next Steps**: Email NABSA requesting historical data access  
**Target Score**: Unknown  
**Priority**: Low (emerging sector, limited historical data)

### ❌ REJECTED SOURCES

#### Tesla Battery Costs (Self-Reported)
**Status**: REJECTED ❌ | **Score**: 42/100  
**Reason**: Single company, no independent verification, inconsistent disclosures  
**Reliability**: 10/30 | **Coverage**: 10/25 | **Frequency**: 10/15 | **Access**: 5/15 | **Transparency**: 7/15  
**Decision Date**: Dec 15, 2025  
**Alternative**: Use BNEF industry-wide data instead

---

## FOOD PRODUCTION SECTOR

### 🔍 PIPELINE (Priority Research)

#### Precision Agriculture - USDA NASS
**Source**: USDA National Agricultural Statistics Service  
**URL**: https://www.nass.usda.gov/  
**Initial Assessment**: Yield per acre data available 1990-2024  
**Next Steps**: 
- [ ] Review Crop Production reports
- [ ] Identify key crops for tracking (corn, wheat, soy)
- [ ] Determine if data can isolate technology vs. weather effects
**Target Score**: 85-90 (government source, excellent coverage)  
**Priority**: HIGH (Tier 1 sector)

#### Vertical Farming Economics - CEA Industry Reports
**Source**: Controlled Environment Agriculture Industry  
**URL**: Various (Agrilyst, Artemis, CEA Working Groups)  
**Initial Assessment**: Fragmented, emerging industry  
**Issues to Investigate**:
- Is there a consistent industry association?
- Historical data likely limited (industry <10 years old)
- Cost per kg production data may be proprietary
**Target Score**: 50-65 (likely secondary source only)  
**Priority**: Medium (interesting but limited historical data)

#### Lab-Grown Protein Costs - Good Food Institute
**Source**: The Good Food Institute (GFI)  
**URL**: https://gfi.org/  
**Initial Assessment**: Nonprofit, research-focused, likely transparent  
**Next Steps**: Review their "State of the Industry" annual reports  
**Coverage Concern**: Industry only ~5 years old for commercial production  
**Target Score**: 70-80 (nonprofit research, good transparency, but limited history)  
**Priority**: Medium (transformative but too recent for 1990-2024 comparison)

### ⚠️ IN REVIEW

#### Agricultural Robotics Costs
**Source**: Association for Advancing Automation (A3)  
**URL**: https://www.automate.org/  
**Initial Assessment**: Industry trade group, may have cost data  
**Next Steps**: Request historical pricing data for ag robots  
**Concern**: May be proprietary/paywalled  
**Target Score**: 65-75  
**Priority**: Medium

### ❌ REJECTED SOURCES

#### Individual Vertical Farming Startups
**Status**: REJECTED ❌  
**Reason**: Single companies, no industry-wide data, non-representative  
**Decision Date**: Dec 15, 2025  
**Alternative**: Wait for industry consolidation and standard reporting

---

## MANUFACTURING SECTOR

### 🔍 PIPELINE

#### Industrial Robotics - International Federation of Robotics (IFR)
**Source**: IFR World Robotics Report (Annual)  
**URL**: https://ifr.org/  
**Initial Assessment**: Authoritative industry source  
**Coverage**: Likely 2000-2024 (need to verify earlier data)  
**Concern**: Reports are expensive (~$1,000+)  
**Next Steps**: 
- [ ] Contact IFR for pricing and historical data access
- [ ] Check university library access
- [ ] Review free summary reports
**Target Score**: 80-85 (excellent but accessibility concern)  
**Priority**: HIGH (Tier 1 sector)

#### 3D Printing Costs - Wohlers Report
**Source**: Wohlers Associates Annual Report  
**URL**: https://wohlersassociates.com/  
**Initial Assessment**: Industry bible for 3D printing  
**Coverage**: Reports since 1995  
**Concern**: Expensive subscription ($595-$995/year)  
**Target Score**: 85-90 (excellent reliability but access cost)  
**Priority**: HIGH (critical manufacturing deflation story)  
**Action Items**:
- [ ] Review free executive summaries
- [ ] Assess if subscription is justified for DI project
- [ ] Check for academic/library access

#### Manufacturing Productivity - Bureau of Labor Statistics (BLS)
**Source**: BLS Manufacturing Productivity and Costs  
**URL**: https://www.bls.gov/lpc/  
**Initial Assessment**: Free government data, excellent  
**Coverage**: 1987-2024  
**Target Score**: 95-100 (government, free, excellent)  
**Priority**: HIGH  
**Next Steps**: 
- [ ] Download Major Sector Productivity and Costs dataset
- [ ] Identify relevant tables for manufacturing output per hour

---

## MEDIA & ENTERTAINMENT SECTOR

### 🔍 PIPELINE

#### Streaming Service Costs
**Source**: Company 10-K filings (Netflix, Disney+, etc.)  
**Initial Assessment**: Directly from SEC filings  
**Coverage**: 2010-2024 (Netflix), 2019-2024 (Disney+, others)  
**Metric**: Cost per subscriber per month (content + delivery)  
**Target Score**: 85 (authoritative but limited history)  
**Priority**: Medium

#### CGI/VFX Production Costs
**Source**: Visual Effects Society / Industry Publications  
**Initial Assessment**: Unknown data availability  
**Metric**: Cost per minute of CGI (normalized for quality)  
**Next Steps**: Research VFX industry publications  
**Target Score**: Unknown  
**Priority**: Low (interesting but hard to quantify)

---

## RETAIL/LOGISTICS SECTOR

### 🔍 PIPELINE

#### Warehouse Automation - MHI Industry Reports
**Source**: Material Handling Institute (MHI)  
**URL**: https://www.mhi.org/  
**Initial Assessment**: Trade association, likely good data  
**Next Steps**: Review MHI's annual industry report  
**Target Score**: 70-80  
**Priority**: Medium

#### Last-Mile Delivery Economics
**Source**: Various (UPS, FedEx 10-Ks + academic studies)  
**Initial Assessment**: Mix of sources needed  
**Next Steps**: Identify primary academic research on delivery costs  
**Target Score**: 65-75  
**Priority**: Medium

---

## FINANCIAL SERVICES SECTOR

### 🔍 PIPELINE

#### Payment Processing Fees
**Source**: Nilson Report, Federal Reserve Payments Study  
**URL**: https://nilsonreport.com/ (paid), https://www.federalreserve.gov/ (free)  
**Initial Assessment**: Fed data is free and excellent, Nilson is industry standard but paid  
**Strategy**: Use Fed as primary, Nilson for validation if accessible  
**Target Score**: Fed=95, Nilson=90  
**Priority**: Medium

#### Trading Costs - SEC Market Structure Data
**Source**: U.S. Securities and Exchange Commission  
**URL**: https://www.sec.gov/  
**Initial Assessment**: Regulatory data, should be excellent  
**Metric**: Cost per trade over time  
**Target Score**: 90-95  
**Priority**: Medium

---

## HEALTHCARE SECTOR (Long-Term)

### 🔍 PIPELINE (Future Research)

#### Genomic Sequencing Costs
**Source**: National Human Genome Research Institute (NHGRI)  
**URL**: https://www.genome.gov/about-genomics/fact-sheets/DNA-Sequencing-Costs-Data  
**Initial Assessment**: EXCEPTIONAL - This is a must-have  
**Coverage**: 2001-2024, cost per genome  
**Deflation Story**: $100M (2001) → $600 (2024) = 99.9994% deflation  
**Target Score**: 100/100 (literally perfect)  
**Priority**: HIGH (but Healthcare is Tier 3, so not immediate)  
**Notes**: This will be THE flagship metric for Healthcare sector when we add it

#### Medical Imaging Costs
**Source**: Medicare reimbursement rates + equipment costs  
**URL**: CMS.gov  
**Next Steps**: Research feasibility  
**Priority**: Medium (for future Healthcare addition)

#### Telemedicine Platform Economics
**Source**: Teladoc, Amwell 10-K filings  
**Coverage**: 2015-2024 (limited historical)  
**Priority**: Low (too recent for 1990-2024 comparison)

---

## EDUCATION SECTOR (Long-Term)

### 🔍 PIPELINE (Future Research)

#### Online Learning Platform Costs
**Source**: Coursera, edX, etc. (if publicly available)  
**Next Steps**: Determine data availability  
**Priority**: Low

#### Educational Software Pricing
**Source**: Unknown - need to research  
**Priority**: Low

---

## RESEARCH METHODOLOGY NOTES

### Source Discovery Strategy

**Where to Look for Data Sources**:
1. **Government Agencies**: BLS, BEA, DOE, USDA, Census Bureau, SEC
2. **Industry Associations**: Trade groups for each sector (e.g., IFR for robotics)
3. **International Organizations**: OECD, World Bank, IRENA, IEA
4. **Research Institutions**: NBER, RAND, Brookings, university research centers
5. **Financial Disclosures**: 10-K, 10-Q filings for public companies
6. **Academic Literature**: Papers often cite authoritative datasets
7. **Consulting Firms**: McKinsey, BCG, Bain (sector reports)

### Red Flags (Automatic Rejection)

- [ ] No disclosed methodology
- [ ] Single company self-reported data without validation
- [ ] Inconsistent definitions across time periods
- [ ] Aggregated data that can't be disaggregated
- [ ] Paywalls >$5,000/year without university access
- [ ] Data that contradicts multiple reliable sources

### Ideal Source Characteristics

- [x] Government or university-backed
- [x] Annual updates for 15+ years
- [x] Free and permanently accessible
- [x] Peer-reviewed or editorially reviewed
- [x] Consistent methodology over time
- [x] Raw data available (not just summaries)
- [x] Clear documentation of calculation methods

---

## DECISION LOG

### Major Source Decisions

**Dec 15, 2025**: BloombergNEF Battery Data - APPROVED
- Rationale: Industry standard, used by major institutions, transparent methodology
- Alternative Considered: Individual automaker disclosures (rejected - inconsistent)

**Dec 15, 2025**: Tesla Self-Reported Battery Costs - REJECTED
- Rationale: Cannot verify independently, single company bias
- Alternative: BNEF provides industry-wide view

---

## QUARTERLY REVIEW SCHEDULE

**Q1 (Jan-Mar)**: Review all APPROVED sources for annual updates  
**Q2 (Apr-Jun)**: Evaluate IN REVIEW sources, move to approved/rejected  
**Q3 (Jul-Sep)**: Research new PIPELINE sources  
**Q4 (Oct-Dec)**: Planning session for next year's expansions  

---

**Document Owner**: Deflation Index LLC  
**Review Cycle**: Quarterly  
**Next Review**: March 31, 2026
