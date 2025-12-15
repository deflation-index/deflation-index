# Master Methodology Document
## The Deflation Index - Cross-Sector Standards & Protocols

**Version**: 2.0  
**Last Updated**: December 15, 2025  
**Scope**: All sectors in The Deflation Index  
**Status**: Living Document - Updated with each sector addition

---

## TABLE OF CONTENTS

1. [Philosophy & Purpose](#1-philosophy--purpose)
2. [Core Methodology Framework](#2-core-methodology-framework)
3. [Normalization Standards](#3-normalization-standards)
4. [Quality Adjustment Protocols](#4-quality-adjustment-protocols)
5. [Hedonic Pricing Implementation](#5-hedonic-pricing-implementation)
6. [Weighting Rationale](#6-weighting-rationale)
7. [Cross-Sector Consistency Rules](#7-cross-sector-consistency-rules)
8. [Index Construction Mathematics](#8-index-construction-mathematics)
9. [Validation & Quality Assurance](#9-validation--quality-assurance)
10. [Revision & Update Protocols](#10-revision--update-protocols)

---

## 1. PHILOSOPHY & PURPOSE

### 1.1 What The Deflation Index Measures

**Core Thesis**: The DI quantifies the **technological force of deflation** — the rate at which technology reduces the real cost of fundamental goods and services, measured independently of monetary policy and official inflation metrics.

**What We Track**:
- ✅ Technological capability per dollar (e.g., computing power, energy storage, data transmission)
- ✅ Real cost reductions driven by innovation, automation, and efficiency
- ✅ Quality-adjusted price changes (better product for same/lower price)

**What We Explicitly Do NOT Track**:
- ❌ General price levels (that's CPI's job)
- ❌ Monetary inflation/deflation (that's M2/Fed's domain)
- ❌ Asset prices or financial market movements
- ❌ Wage levels or labor market conditions

### 1.2 Why This Matters

The gap between:
1. **Technological Deflation** (what tech delivers: ~20-25% annual cost reductions)
2. **Monetary Expansion** (M2 growth: ~6-7% annually)
3. **Consumer Experience** (CPI: ~2-3% annually)

...reveals where the gains from technological progress flow. The DI makes this visible.

### 1.3 Design Principles

**TRANSPARENCY**: Every calculation must be reproducible by external researcher
**CONSERVATISM**: When uncertain, use conservative (lower deflation) estimates
**CONSISTENCY**: Apply identical methodology across all sectors and time periods
**INDEPENDENCE**: Never cherry-pick data to support a predetermined conclusion
**DOCUMENTATION**: Source every data point, explain every assumption

---

## 2. CORE METHODOLOGY FRAMEWORK

### 2.1 Five-Step Process (Applied to Every Sector)

```
RAW DATA → NORMALIZATION → QUALITY ADJUSTMENT → HEDONIC PRICING → SECTOR INDEX
```

**Step 1: Raw Data Collection**
- Gather authoritative source data (see Research Dashboard)
- Document source, date, methodology
- Store in Excel with blue-text formatting

**Step 2: Normalization**
- Convert all nominal values to 2024 constant dollars
- Standardize units ($/unit across all years)
- Calculate year-over-year percentage changes

**Step 3: Quality Adjustment**
- Identify capability improvements over time
- Calculate quality-adjusted cost (better product = lower real cost)
- Document quality metrics and sources

**Step 4: Hedonic Pricing**
- Separate pure price deflation from capability improvements
- Weight quality dimensions by importance
- Calculate hedonic-adjusted deflation rate

**Step 5: Sector Index Construction**
- Combine component metrics using evidence-based weights
- Calculate cumulative index (1990=100 baseline)
- Integrate into Master DI with sector weight

### 2.2 Temporal Scope

**Primary Period**: 1990-2024 (35 years)
- Chosen for data availability across all core sectors
- Long enough to show exponential trends
- Recent enough to be policy-relevant

**Extension Strategy**:
- Pre-1990: Reconstruct where possible (document as "estimated")
- Post-2024: Update annually in Q1 following calendar year

---

## 3. NORMALIZATION STANDARDS

### 3.1 Inflation Adjustment (Constant Dollar Conversion)

**Primary Method**: BLS CPI-U (Consumer Price Index for All Urban Consumers)

**Formula**:
```
Real_Value[2024_dollars] = Nominal_Value[year] × (CPI[2024] / CPI[year])
```

**Why CPI-U**:
- Most widely recognized inflation measure
- Consistent methodology since 1978
- Allows comparison to official inflation metrics
- Data freely available from FRED (Federal Reserve Economic Data)

**Source**: https://fred.stlouisfed.org/series/CPIAUCSL

**Validation**: Cross-check with PCE (Personal Consumption Expenditures) price index
- If CPI and PCE diverge >1% for any year, investigate and document
- Use CPI as primary, note PCE in methodology appendix

**Documentation Standard**:
```excel
Year | Nominal_Cost_USD | CPI_Index | Real_Cost_2024_USD | Calculation_Check
2015 | 500.00 | 237.0 | 648.52 | =B2*(CPI_2024/CPI_2015) ✓
```

### 3.2 Unit Standardization

**Principle**: All metrics must be expressed as "cost per standardized unit"

**Examples by Sector**:
| Sector | Unit Standard | Example |
|--------|---------------|---------|
| Computing | $/GFLOPS (Gigaflops of compute) | $5.00/GFLOPS (2010) → $0.001/GFLOPS (2024) |
| Communications | $/GB of data transmitted | $10/GB (2000) → $0.05/GB (2024) |
| Energy | $/kWh (kilowatt-hour) | $0.50/kWh (solar, 2010) → $0.04/kWh (2024) |
| Transportation | $/mile of transport capacity | $0.45/mile (2015) → $0.15/mile (2024 EV) |

**Conversion Rules**:
1. Choose unit that best represents core capability
2. Must be measurable across entire time series (1990-2024)
3. Unit must be comparable across technologies (e.g., kWh works for coal, solar, wind)
4. Document all unit conversions with formulas

### 3.3 Annual Deflation Rate Calculation

**Standard Formula**:
```
Annual_Deflation_Rate[year] = ((Cost_Per_Unit[year] / Cost_Per_Unit[year-1]) - 1) × 100
```

**Interpretation**:
- Negative value = deflation (costs falling)
- Positive value = inflation (costs rising)
- Example: -25% = costs fell by 25% year-over-year

**Geometric Mean (Multi-Year)**:
```
CAGR[period] = (Cost_Per_Unit[end] / Cost_Per_Unit[start])^(1/years) - 1
```

**When to Use Each**:
- Annual rates: For year-by-year analysis and charts
- CAGR: For summary statistics and long-term trends

---

## 4. QUALITY ADJUSTMENT PROTOCOLS

### 4.1 The Quality Adjustment Problem

**Problem**: A 2024 laptop at $1,000 is not the same as a 1990 laptop at $2,000 (inflation-adjusted)

The 2024 laptop has:
- 10,000x faster processor
- 1,000x more RAM
- 10,000x more storage
- Better screen, battery life, connectivity, etc.

**If we only track nominal price deflation, we dramatically understate the true technological deflation.**

### 4.2 Quality Metrics Framework

**For Each Sector, Identify**:

1. **Primary Quality Dimension** (most important capability)
   - Computing: Processing speed (FLOPS)
   - Energy: Efficiency (capacity factor, degradation rate)
   - Transportation: Range/efficiency (miles per kWh)

2. **Secondary Quality Dimensions** (important but not primary)
   - Computing: RAM, storage, battery life
   - Energy: Lifespan, safety, energy density
   - Transportation: Safety (autonomy levels), comfort

3. **Tertiary Quality Dimensions** (nice-to-have features)
   - Computing: Screen resolution, weight
   - Energy: Aesthetics, integration features
   - Transportation: Entertainment features, brand value

### 4.3 Quality-Adjusted Cost Calculation

**General Formula**:
```
Quality_Adjusted_Cost[year] = 
  Nominal_Cost[year] × (Primary_Quality[baseline] / Primary_Quality[year])
```

**Example (Computing - $/GFLOPS)**:
- 2010 laptop: $1,000, 50 GFLOPS → $20/GFLOPS
- 2024 laptop: $1,000, 5,000 GFLOPS → $0.20/GFLOPS
- Quality-adjusted deflation: 99% reduction in cost per unit of performance

**Multi-Dimensional Quality Adjustment**:
```
Quality_Adjusted_Cost[year] = Nominal_Cost[year] × 
  (0.70 × Primary_Quality_Ratio + 
   0.20 × Secondary_Quality_Ratio + 
   0.10 × Tertiary_Quality_Ratio)
```

**Weighting Justification**:
- 70% primary: Core functionality is dominant factor
- 20% secondary: Important but not decisive
- 10% tertiary: Contributes to overall value but minor

### 4.4 Documentation Requirements

**For every quality adjustment, document**:
1. Quality metric chosen (e.g., Wh/kg for batteries)
2. Data source for quality metric
3. Baseline year for comparison (typically 2024)
4. Calculation formula in Excel
5. Rationale for metric choice (why this matters to consumers)

**Excel Template**:
```
Year | Raw_Cost | Quality_Metric | Quality_Ratio | Adjusted_Cost | Source_Quality_Data
2020 | 250 | 200 Wh/kg | 0.67 | 375 | BNEF Battery Report 2020, p.15
```

---

## 5. HEDONIC PRICING IMPLEMENTATION

### 5.1 What is Hedonic Pricing?

**Definition**: A method that decomposes a product's price into its constituent characteristics to isolate pure price changes from quality changes.

**Purpose in DI**: Separate:
- **Pure deflation**: Same product is cheaper
- **Quality deflation**: Better product at same (or lower) price

### 5.2 Hedonic Regression Approach

**When to Use**: For products with multiple measurable attributes

**Example: Computing**

**Regression Model**:
```
Price[laptop] = β₀ + β₁(CPU_Speed) + β₂(RAM) + β₃(Storage) + β₄(Screen_Quality) + ε
```

**Coefficients (β) represent** the implicit price of each attribute

**Hedonic Deflation Rate**:
```
Hedonic_Deflation = 
  (Predicted_Price[year, constant_quality] / Actual_Price[year]) - 1
```

**Interpretation**: 
- If a 2024 laptop with 2010 specs would theoretically cost $2,000, but 2024 laptops actually cost $1,000, the hedonic deflation is 50%

### 5.3 Simplified Hedonic Method (When Regression Not Feasible)

**Challenge**: Sometimes we lack granular attribute-level data

**Alternative: Quality-Standardized Price Index**

**Formula**:
```
Hedonic_Price_Index[year] = 
  (Raw_Price[year] / Quality_Index[year]) × 100
```

**Where**:
```
Quality_Index[year] = 
  Weighted_Average(Attribute_Improvement_Factors[year])
```

**Example (EV Batteries)**:
- 2010: $1,160/kWh, 100 Wh/kg, 500 cycles
- 2024: $139/kWh, 300 Wh/kg, 3,000 cycles

Quality improvements:
- Energy density: 3x (weight = 50%)
- Cycle life: 6x (weight = 30%)
- Charging speed: 4x (weight = 20%)

Quality_Index[2024] = (3.0 × 0.50) + (6.0 × 0.30) + (4.0 × 0.20) = 4.1

Hedonic_Price[2024] = ($139 / 4.1) = $34/kWh equivalent

**Hedonic deflation (2010-2024)**: $1,160 → $34 = 97.1% reduction

### 5.4 Quality Dimension Weighting

**How to Determine Weights**:

1. **Consumer Surveys**: What do buyers value most? (if available)
2. **Price Premium Analysis**: How much more do consumers pay for feature X?
3. **Expert Judgment**: Industry analysts' assessment of importance
4. **Revealed Preference**: Market behavior (what features drive purchasing decisions)

**Example (Transportation - EV Batteries)**:

| Quality Dimension | Weight | Justification |
|-------------------|--------|---------------|
| Energy Density | 50% | Directly determines vehicle range (primary buying factor) |
| Cycle Life | 30% | Affects total cost of ownership (battery replacement cost) |
| Charging Speed | 20% | Convenience factor, but infrastructure-dependent |

**Document in Excel**:
```excel
Dimension | Weight | Justification | Source
Energy_Density | 0.50 | Range anxiety surveys | EV Consumer Report 2023
Cycle_Life | 0.30 | TCO modeling | DOE Battery Longevity Study
```

### 5.5 When NOT to Use Hedonic Adjustments

**Skip hedonic pricing if**:
1. Product is commodity with no quality variation (e.g., kWh of electricity)
2. Quality metrics are not measurable or available
3. Quality changes are negligible over study period
4. Simple quality adjustment (Section 4) is sufficient

**Default Rule**: Use quality adjustment (Section 4) for all sectors. Add hedonic pricing (Section 5) only when:
- Multiple quality dimensions exist
- Quality improvements are substantial (>2x)
- Data to weight dimensions is available

---

## 6. WEIGHTING RATIONALE

### 6.1 Two-Level Weighting System

**Level 1: Component Weights Within Each Sector**
- Example: Within Transportation, EV batteries = 60%, Autonomy = 25%, etc.

**Level 2: Sector Weights Within Master Index**
- Example: Computing = 25%, Communications = 20%, Energy = 25%, Transportation = 15%, etc.

### 6.2 Sector Weight Determination (Master Index)

**Primary Method: GDP Contribution + Consumer Expenditure**

**Formula**:
```
Sector_Weight = 0.50 × GDP_Share + 0.50 × Consumer_Expenditure_Share
```

**Rationale**:
- GDP share: Economic importance of sector
- Consumer spending: Direct impact on households
- Equal weighting: Balance production-side and consumption-side perspectives

**Example (Transportation)**:

| Measure | Value | Source |
|---------|-------|--------|
| GDP Contribution | 9.8% | BEA GDP by Industry (2023) |
| Consumer Spending | 16.8% | BLS Consumer Expenditure Survey (2023) |
| **DI Weight** | **13.3%** | Geometric mean |
| **Rounded** | **15%** | For simplicity |

**Why Round**:
- Makes index easier to communicate
- 5% increments are sufficient precision
- Allows flexibility for future rebalancing

### 6.3 Component Weight Determination (Within Sector)

**Primary Method: Market Size + Deflation Magnitude**

**Formula**:
```
Component_Weight = 
  0.60 × (Component_Market_Size / Sector_Market_Size) +
  0.40 × (Component_Deflation_Rate / Sector_Avg_Deflation_Rate)
```

**Rationale**:
- 60% market size: Larger components should have more weight
- 40% deflation rate: Components with faster deflation deserve extra weight (they're driving more of the story)

**Example (Transportation - EV Batteries)**:

| Component | Market Size | Deflation Rate | Calculated Weight | Assigned Weight |
|-----------|-------------|----------------|-------------------|-----------------|
| EV Batteries | 35% | 30%/year | 63% | **60%** |
| Autonomy | 15% | 22%/year | 23% | **25%** |
| Efficiency | 40% | 5%/year | 11% | **10%** |
| Ride-sharing | 10% | 12%/year | 13% | **5%** |

**Note**: Calculated weights are adjusted for practical implementation (round to 5% increments, ensure sum = 100%)

### 6.4 Rebalancing Protocol

**When to Rebalance Weights**:
1. Every 5 years (2025, 2030, 2035, etc.)
2. When new sector is added
3. When component market share changes >10 percentage points
4. When GDP/spending data shows structural shift

**How to Rebalance**:
1. Recalculate weights using current GDP/spending data
2. Smooth transition over 2 years to avoid index volatility
3. Recalculate historical index with both old and new weights
4. Document reasoning in CHANGELOG.md

**Example Transition**:
- Year 1: 75% old weights + 25% new weights
- Year 2: 50% old weights + 50% new weights
- Year 3: 25% old weights + 75% new weights
- Year 4+: 100% new weights

---

## 7. CROSS-SECTOR CONSISTENCY RULES

### 7.1 Mandatory Standards (Apply to ALL Sectors)

**Data Quality**:
- [ ] Every data point has documented source
- [ ] Every source has URL or DOI
- [ ] Every assumption has written justification
- [ ] Every formula is reproducible in Excel

**Temporal Coverage**:
- [ ] Primary data covers 2000-2024 minimum
- [ ] Pre-2000 data is reconstructed with clear "estimated" flag
- [ ] Annual frequency (or interpolated from less frequent data)
- [ ] No gaps >2 consecutive years without documented reason

**Inflation Adjustment**:
- [ ] All dollar values converted to 2024 constant dollars using CPI-U
- [ ] Cross-check with PCE for validation
- [ ] Document CPI source (FRED series CPIAUCSL)
- [ ] Verify adjustment calculations quarterly

**Quality Metrics**:
- [ ] Primary quality metric identified and measured
- [ ] Quality adjustment formula documented
- [ ] Hedonic pricing applied if >2 quality dimensions
- [ ] Weights for quality dimensions justified with sources

**Excel Formatting**:
- [ ] Blue text: Hardcoded source data
- [ ] Black text: Calculated fields
- [ ] Yellow highlight: Assumptions/estimates
- [ ] Cell comments: Source citations
- [ ] Zero formula errors (verified by recalc.py)

### 7.2 Prohibited Practices

**NEVER**:
- ❌ Use data from single company without independent validation
- ❌ Cherry-pick years or data points to achieve desired result
- ❌ Change methodology mid-series without recalculating all prior years
- ❌ Use proprietary data without documenting access method
- ❌ Extrapolate >5 years beyond last observed data point
- ❌ Aggregate components with incompatible units
- ❌ Use nominal dollars without inflation adjustment

### 7.3 Handling Missing Data

**Acceptable Methods** (in order of preference):

1. **Linear Interpolation** (if gap is 1-2 years)
   ```
   Value[year_t] = Value[year_t-1] + 
     ((Value[year_t+1] - Value[year_t-1]) / 2)
   ```
   Flag as "interpolated" in notes

2. **Exponential Interpolation** (for technology costs with expected exponential trends)
   ```
   Value[year_t] = Value[year_t-1] × 
     (Value[year_t+1] / Value[year_t-1])^(1/gap_years)
   ```
   Flag as "exponential interpolation" in notes

3. **Proxy Data** (use related metric with known correlation)
   Example: If solar panel cost data missing for 1995, use crystalline silicon cost as proxy
   Document: "Proxy used: Silicon cost × 1.8 (historical ratio)"

4. **Conservative Estimate** (if no other method available)
   Use higher bound of plausible range
   Document: "Conservative estimate, range: $X-$Y, used $Y"

**Unacceptable Methods**:
- ❌ Forward-filling (assuming flat value)
- ❌ Mean imputation (using average of other years)
- ❌ Undocumented "estimates"

### 7.4 Version Control & Reproducibility

**Every Excel File Must Include**:
1. Version number in filename (semantic versioning)
2. "Changelog" worksheet documenting all changes
3. "Methodology" worksheet summarizing calculations
4. "Sources" worksheet with full bibliography

**Example Filename**: `computing_deflation_index_v2.3.xlsx`
- Major version (2.x): Methodology change or new component added
- Minor version (x.3): Data update only

**Git Repository Structure**:
```
/data
  /v2.3
    computing_deflation_index_v2.3.xlsx
    communications_deflation_index_v2.3.xlsx
    energy_deflation_index_v2.3.xlsx
  /archive
    /v2.2
    /v2.1
```

---

## 8. INDEX CONSTRUCTION MATHEMATICS

### 8.1 Sector Index Formula

**For each sector**:

```
Sector_Index[year] = Σ(Component_i[year] × Weight_i)
```

Where:
- Component_i[year] = quality-adjusted cost index for component i
- Weight_i = component weight (sum of all weights = 1.0)

**Step-by-Step**:

1. **Normalize each component to 1990 = 100**
   ```
   Component_Index[1990] = 100
   Component_Index[year] = Component_Index[year-1] × (1 + Annual_Deflation_Rate[year])
   ```

2. **Apply component weights**
   ```
   Sector_Index[year] = 
     (Component_A_Index[year] × Weight_A) +
     (Component_B_Index[year] × Weight_B) + ...
   ```

3. **Verify sum of weights = 1.0**

### 8.2 Master Deflation Index Formula

**Cross-Sector Aggregation**:

```
Master_DI[year] = Σ(Sector_j[year] × Sector_Weight_j)
```

**Example (Current 4 Sectors)**:
```
Master_DI[2024] = 
  (Computing_Index[2024] × 0.25) +
  (Communications_Index[2024] × 0.20) +
  (Energy_Index[2024] × 0.25) +
  (Transportation_Index[2024] × 0.15) +
  (Future_Sectors × 0.15)  // Reserved for expansion
```

### 8.3 Annualized Deflation Rate

**For reporting and analysis**:

```
Annual_Master_DI_Deflation[year] = 
  (Master_DI[year] / Master_DI[year-1]) - 1
```

**Cumulative (1990-2024)**:
```
Cumulative_Deflation_1990_2024 = 
  (Master_DI[2024] / Master_DI[1990]) - 1
```

**Compound Annual Growth Rate (CAGR)**:
```
DI_CAGR_1990_2024 = 
  (Master_DI[2024] / Master_DI[1990])^(1/34) - 1
```

### 8.4 Comparison to M2 and CPI

**Gap Analysis**:

```
Technology_vs_Monetary_Gap[year] = 
  DI_Deflation_Rate[year] - M2_Growth_Rate[year]
```

```
Technology_vs_CPI_Gap[year] = 
  DI_Deflation_Rate[year] - CPI_Inflation_Rate[year]
```

**Capture Rate** (what % of technology deflation actually reaches consumers):

```
Capture_Rate[year] = 
  (CPI_Inflation[year] - Baseline_Inflation) / 
  (DI_Deflation[year] + CPI_Inflation[year])
```

Where Baseline_Inflation = average CPI without technology effects (estimated ~4-5%)

---

## 9. VALIDATION & QUALITY ASSURANCE

### 9.1 Pre-Publication Checklist

Before releasing any index update, verify:

**Data Integrity**:
- [ ] All Excel files open without errors
- [ ] recalc.py returns zero formula errors
- [ ] All cell references point to valid cells
- [ ] No circular references (unless documented)
- [ ] All hardcoded values have source citations

**Methodology Consistency**:
- [ ] Inflation adjustment applied uniformly (CPI-U, 2024 dollars)
- [ ] Quality adjustments use documented formulas
- [ ] Component weights sum to 1.0 for each sector
- [ ] Sector weights sum to 1.0 for master index
- [ ] No methodology changes mid-series (or all years recalculated)

**Documentation**:
- [ ] CHANGELOG.md updated with all changes
- [ ] Methodology document reflects current calculations
- [ ] All new sources added to Research Dashboard
- [ ] Version numbers incremented correctly

**Sanity Checks**:
- [ ] Annual deflation rates are within expected ranges (-50% to +10%)
- [ ] No unexplained jumps >50% year-over-year
- [ ] Trends match known technological progress patterns
- [ ] Master DI shows consistent exponential deflation

### 9.2 External Validation Methods

**Quarterly Cross-Checks**:

1. **Compare to Related Indices**:
   - Computing: Compare to DRAM spot prices, GPU benchmarks
   - Energy: Compare to IRENA renewable cost reports
   - Communications: Compare to FCC broadband reports
   - Transportation: Compare to BNEF EV battery reports

2. **Academic Literature**:
   - Search for recent papers on technology cost trends
   - Compare DI findings to published research
   - Document any significant discrepancies

3. **Industry Expert Review**:
   - Share methodology with 2-3 domain experts per sector
   - Incorporate feedback (document in CHANGELOG)
   - Acknowledge reviewers in methodology appendix

### 9.3 Sensitivity Analysis

**Annual Requirement**: Test how index responds to assumption changes

**Key Assumptions to Test**:
1. Component weights (±5 percentage points)
2. Quality adjustment formulas (alternative metrics)
3. Hedonic price weights (±10% on each dimension)
4. Missing data interpolation (alternative methods)

**Acceptance Criteria**:
- Index should change by <5% with reasonable assumption variations
- Trend direction should remain consistent
- If sensitivity >10%, investigate and potentially revise methodology

**Document Results**:
```
Assumption Change | Master DI Impact | Sector Most Affected | Action
Component weight ±5% | ±3.2% | Transportation | Acceptable, no change
Quality metric alternative | ±8.7% | Computing | Review metric choice
```

---

## 10. REVISION & UPDATE PROTOCOLS

### 10.1 Annual Update Schedule

**Timeline**:
- **January 15**: Source data collection begins
- **February 15**: All new data entered in Excel
- **March 1**: Quality checks and validation complete
- **March 15**: External review completed
- **March 31**: New index published

### 10.2 Emergency Corrections

**If error discovered post-publication**:

1. **Severity Assessment**:
   - **Critical** (>5% index impact): Immediate correction + public notice
   - **Major** (1-5% impact): Correction in next update + changelog note
   - **Minor** (<1% impact): Note in next update, no urgent action

2. **Correction Protocol**:
   - Document error in Data_Issues_Log.md
   - Fix in Excel + recalculate all dependent values
   - Update version number (increment major for critical errors)
   - Issue correction notice (for critical errors)
   - Update CHANGELOG.md with full explanation

### 10.3 Methodology Revisions

**When methodology must change** (e.g., better data source found, improved quality metric):

1. **Impact Analysis**:
   - Recalculate entire historical series with new methodology
   - Compare old vs. new index values
   - Document differences

2. **Justification Required**:
   - Why is new methodology superior?
   - What are limitations of old methodology?
   - How does this affect index interpretation?

3. **Publication**:
   - Release both old and new series for 1 year (transparency)
   - Update all documentation
   - Major version increment (e.g., v2.0 → v3.0)

### 10.4 Long-Term Maintenance

**Every 5 Years (2025, 2030, 2035...)**:

1. **Comprehensive Review**:
   - Re-evaluate all component weights
   - Re-evaluate all sector weights
   - Consider new sectors for addition
   - Review quality adjustment methodologies

2. **Stakeholder Consultation**:
   - Survey users on methodology
   - Incorporate feedback from researchers using DI
   - Update based on academic best practices

3. **Technology Assessment**:
   - Are current sectors still most important?
   - Are new technologies emerging that should be tracked?
   - Should any sectors be sunset (if no longer deflationary)?

---

## APPENDIX A: FORMULA QUICK REFERENCE

### Inflation Adjustment
```
Real_Value[2024] = Nominal_Value[year] × (CPI[2024] / CPI[year])
```

### Annual Deflation Rate
```
Deflation_Rate[year] = (Cost[year] / Cost[year-1]) - 1
```

### Quality-Adjusted Cost
```
QA_Cost[year] = Nominal_Cost[year] × (Quality[baseline] / Quality[year])
```

### Hedonic Price Index
```
Hedonic_Price[year] = Raw_Price[year] / Quality_Index[year]
```

### Sector Index
```
Sector_Index[year] = Σ(Component[year] × Weight)
```

### Master Deflation Index
```
Master_DI[year] = Σ(Sector_Index[year] × Sector_Weight)
```

### CAGR (Compound Annual Growth Rate)
```
CAGR = (Final_Value / Initial_Value)^(1/years) - 1
```

---

## APPENDIX B: DATA QUALITY TIERS

**Tier 1** (Score 85-100):
- Government statistics (BLS, BEA, DOE, etc.)
- Peer-reviewed academic research
- Industry standard-setters (IEEE, IRENA, etc.)
- Use as primary sources

**Tier 2** (Score 70-84):
- Reputable private research (BNEF, IFR, etc.)
- Trade association data with disclosed methodology
- Use as primary with validation, or as secondary sources

**Tier 3** (Score 50-69):
- Industry publications
- Company disclosures (10-K, 10-Q)
- Use as secondary sources only

**Below Tier 3** (Score <50):
- Do not use in DI
- May reference in contextual discussion only

---

**Document Control**:
- **Authors**: Deflation Index LLC
- **Version**: 2.0 (expanded from initial v1.0)
- **Effective Date**: December 15, 2025
- **Review Cycle**: Annual (Q1)
- **Next Review**: March 31, 2026
