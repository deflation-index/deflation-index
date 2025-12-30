# Transportation Sector Methodology
## The Deflation Index - Transportation Component

**Version**: 1.0  
**Last Updated**: December 15, 2025  
**Status**: Initial Development  
**Proposed Weight in Master Index**: 15%

---

## EXECUTIVE SUMMARY

The Transportation sector tracks technological deflation in mobility costs through four primary metrics:
1. **Electric Vehicle Battery Costs** ($/kWh) - 60% of sector weight
2. **Autonomous Vehicle Technology** ($/mile capability) - 25% of sector weight
3. **Vehicle Efficiency** (Real $/mile) - 10% of sector weight
4. **Ride-Sharing Platform Economics** (Cost per passenger-mile) - 5% of sector weight

**Historical Deflation Rate (Preliminary)**: ~18-22% annually (2010-2024)

---

## 1. DATA SOURCES & COLLECTION PROTOCOLS

### 1.1 Electric Vehicle Battery Costs

#### PRIMARY SOURCE
**BloombergNEF (BNEF) Battery Price Survey**
- **URL**: https://about.bnef.com/blog/ (Annual reports)
- **Frequency**: Annual
- **Coverage**: 2010-2024 (comprehensive), 1990-2009 (estimated via academic sources)
- **Metric**: Lithium-ion battery pack price ($/kWh)
- **Reliability**: ★★★★★ (Industry standard)

**Data Collection Protocol**:
1. Download annual BNEF battery price reports (typically published Q4)
2. Extract volume-weighted average pack price for passenger EVs
3. Cross-reference with BNEF's published charts and press releases
4. Document exact report title, date, and page number

**Data Structure**:
```
Year | Battery_Price_Raw_USD_per_kWh | Source_Document | Source_Date | Notes
2024 | 139 | BNEF Battery Price Survey 2024 | Nov 2024 | Volume-weighted avg
2023 | 149 | BNEF Battery Price Survey 2023 | Nov 2023 | Volume-weighted avg
```

#### SECONDARY SOURCES (for validation)
- **IRENA**: Renewable Energy Cost Database (cross-checks EV battery trends)
- **DOE Vehicle Technologies Office**: Annual Progress Reports
- **Argonne National Laboratory**: BatPaC model estimates

#### HISTORICAL RECONSTRUCTION (Pre-2010)
- **MIT Technology Review** (2008): Tesla Roadster battery costs (~$1,000/kWh estimate)
- **USABC Technical Reports** (1990s): Advanced battery development targets
- **Academic Literature**: Nykvist & Nilsson (2015) Nature Climate Change - historical cost curves

**Methodology for 1990-2009**:
- Use exponential regression from known 2010 data point
- Validate against published automotive industry reports
- Conservative approach: Use upper bound of estimate ranges
- Flag as "reconstructed estimate" in master dataset

### 1.2 Autonomous Vehicle Technology Costs

#### PRIMARY SOURCE
**Waymo Safety Reports & Industry Disclosures**
- **Metric**: System cost per vehicle + operational cost per mile
- **Frequency**: Annual (investor reports, regulatory filings)
- **Coverage**: 2016-2024

**Key Data Points**:
- Sensor suite costs (LIDAR, cameras, radar)
- Computing hardware costs
- Insurance cost per mile
- Miles per disengagement (safety metric)

**Data Collection Protocol**:
1. Track sensor cost reductions via public company earnings calls (Luminar, Velodyne, etc.)
2. Monitor autonomous vehicle regulatory reports (CPUC, NHTSA)
3. Calculate $/mile of capability using: `Total System Cost / (Vehicle Lifetime Miles × Safety Factor)`
4. Safety Factor = miles per disengagement / 1,000,000 (normalized to human driver baseline)

**Data Structure**:
```
Year | LIDAR_Cost_USD | Sensor_Suite_Total_USD | AV_System_Cost_USD | Miles_Per_Disengagement | Normalized_Cost_Per_Mile
2024 | 500 | 8,000 | 25,000 | 25,000 | 0.045
```

#### SECONDARY SOURCES
- **RAND Corporation**: AV cost-benefit studies
- **SAE International**: AV cost modeling frameworks
- **University Research**: Stanford, MIT, Carnegie Mellon AV cost papers

### 1.3 Vehicle Efficiency (Real $/Mile)

#### PRIMARY SOURCE
**U.S. Department of Energy - Transportation Energy Data Book**
- **URL**: https://tedb.ornl.gov/
- **Frequency**: Annual
- **Coverage**: 1970-2024
- **Metric**: Real energy cost per passenger-mile (constant dollars)

**Supplementary Data**:
- **EPA Fuel Economy Trends**: Average new vehicle MPG by year
- **EIA Gasoline Price Data**: Historical prices (nominal + inflation-adjusted)
- **BLS CPI**: For inflation adjustment

**Calculation Protocol**:
```
Real_Cost_Per_Mile[year] = 
  (Average_Fuel_Price_Constant_Dollars[year] / Average_MPG[year]) + 
  (Maintenance_Cost_Per_Mile[year] / Vehicle_Miles_Per_Year[year])
```

**Data Structure**:
```
Year | Avg_MPG | Fuel_Price_Real_2024_USD | Maint_Cost_Per_Mile_Real | Total_Cost_Per_Mile_Real
2024 | 26.4 | 3.25 | 0.09 | 0.213
```

### 1.4 Ride-Sharing Platform Economics

#### PRIMARY SOURCE
**Company SEC Filings (10-K, 10-Q)**
- Uber, Lyft: Revenue per mile, cost per mile
- **Frequency**: Quarterly
- **Coverage**: 2016-2024

**Metric Calculation**:
```
Cost_Per_Passenger_Mile = 
  (Platform_Fee + Driver_Earnings + Vehicle_Operating_Cost) / Average_Passengers_Per_Trip
```

#### SECONDARY SOURCES
- **Academic Studies**: UC Berkeley, MIT ride-sharing economics research
- **Third-party Analytics**: Second Measure, YipitData

---

## 2. NORMALIZATION & STANDARDIZATION

### 2.1 Unit Cost Deflation Rate Formula

**Core Formula**:
```
Annual_Deflation_Rate[year] = 
  ((Cost_Per_Unit[year] / Cost_Per_Unit[year-1]) - 1) × 100
```

**Geometric Mean for Period Analysis**:
```
Cumulative_Deflation_Rate[1990-2024] = 
  (Cost_Per_Unit[2024] / Cost_Per_Unit[1990])^(1/34) - 1
```

### 2.2 Quality Adjustment Methodology

**Problem**: Raw cost data doesn't account for capability improvements

**Solution: Hedonic Deflation Adjustment**

#### For EV Batteries:
```
Quality_Adjusted_Cost[year] = 
  Raw_Cost[year] × (Energy_Density[year] / Energy_Density[2024])
```

**Rationale**: Modern batteries have 3x energy density vs. 2010, providing more range per kWh

**Data Required**:
- Volumetric energy density (Wh/L) by year
- Gravimetric energy density (Wh/kg) by year
- Source: BNEF, DOE Battery Reports

#### For Autonomous Vehicles:
```
Quality_Adjusted_Cost[year] = 
  Raw_System_Cost[year] × (Miles_Per_Disengagement[2024] / Miles_Per_Disengagement[year])
```

**Rationale**: A system that disengages every 100 miles is not equivalent to one that operates 25,000 miles continuously

### 2.3 Hedonic Pricing Implementation

**Three-Step Process**:

1. **Identify Quality Dimensions**
   - Battery: Energy density, cycle life, charging speed, safety rating
   - AV: Safety metrics, geographic capability, weather performance
   - Efficiency: Performance (0-60mph), cargo capacity, comfort features

2. **Weight Quality Dimensions**
   - Primary: Safety and core functionality (70%)
   - Secondary: Convenience features (20%)
   - Tertiary: Luxury attributes (10%)

3. **Calculate Hedonic Deflation**
   ```
   Hedonic_Deflation_Rate = 
     Raw_Deflation_Rate - Quality_Improvement_Rate
   ```

**Example (EV Batteries)**:
- 2024 battery costs $139/kWh at 300 Wh/kg
- 2010 battery costs $1,160/kWh at 100 Wh/kg
- Raw deflation: 88% reduction
- Quality adjustment: +200% capability (3x energy density)
- **Hedonic deflation**: ~92% (accounts for better product)

### 2.4 Inflation Adjustment

**All nominal dollar figures converted to 2024 constant dollars using**:
- **Primary**: BLS CPI-U (All Items)
- **Secondary**: PCE Price Index (for cross-validation)

**Formula**:
```
Real_Value[2024_dollars] = 
  Nominal_Value × (CPI[2024] / CPI[year_of_measurement])
```

---

## 3. WEIGHTING RATIONALE (Transportation Sector = 15% of Master Index)

### 3.1 Component Weights Within Transportation

| Component | Weight | Justification |
|-----------|--------|---------------|
| EV Battery Costs | 60% | Largest cost component of EV (30-40% of vehicle); scales to energy storage broadly |
| Autonomous Tech | 25% | Transformative technology; will define 2025-2035 transportation |
| Vehicle Efficiency | 10% | Steady improvement over 35 years; affects all vehicles |
| Ride-Sharing | 5% | Platform efficiency gains; limited historical data |

### 3.2 Transportation Weight in Master Index (15%)

**Basis**: GDP contribution + consumer spending

- **U.S. GDP Contribution**: Transportation sector = 9-11% of GDP (BEA data)
- **Consumer Spending**: ~17% of household expenditures (BLS Consumer Expenditure Survey)
- **DI Weight (15%)**: Geometric mean of GDP (10%) and consumer spending (17%)

**Justification**: 
- Higher weight than GDP alone due to universal impact on consumers
- Lower than raw spending data due to less dramatic deflation vs. Computing/Communications
- Balances with existing sectors (Computing 25%, Communications 20%, Energy 25%)

---

## 4. DATA QUALITY CONTROLS

### 4.1 Five-Point Data Verification Protocol

Every data point must pass 5 checks before inclusion:

**1. SOURCE VERIFICATION**
- [ ] Primary source is authoritative (government, industry standard-setter, peer-reviewed)
- [ ] Source document is archived and URL is recorded
- [ ] Source date and version are documented
- [ ] Source methodology is understood and documented

**2. CROSS-VALIDATION**
- [ ] Data point is validated against 1-2 secondary sources
- [ ] Discrepancies are investigated and documented
- [ ] If conflict exists, conservative (higher cost) estimate is used
- [ ] Validation source is documented in "Cross_Check" column

**3. CONSISTENCY CHECK**
- [ ] Data point fits within expected trend (no unexplained jumps >50%)
- [ ] Units are consistent across time series
- [ ] Currency adjustments are correctly applied
- [ ] Formula logic is verified in Excel (no #REF! errors)

**4. QUALITY ADJUSTMENT VERIFICATION**
- [ ] Hedonic adjustment is appropriate for the metric
- [ ] Quality dimension data is available and reliable
- [ ] Adjustment calculation is documented and reproducible
- [ ] Both raw and adjusted values are retained in dataset

**5. DOCUMENTATION COMPLETENESS**
- [ ] Every cell has a source note or formula
- [ ] Assumptions are explicitly stated
- [ ] Calculations can be replicated by external researcher
- [ ] "Notes" column explains any unusual circumstances

### 4.2 Excel Data Hygiene Standards

**MANDATORY FORMATTING** (per xlsx SKILL.md):

1. **Color Coding**:
   - Blue text: Hardcoded source data (battery costs, MPG data)
   - Black text: All calculated fields (deflation rates, weighted averages)
   - Yellow highlight: Assumptions needing attention (e.g., pre-2010 estimates)

2. **Cell Comments**:
   ```
   Example for cell B15 (2015 battery cost):
   "Source: BNEF Battery Price Survey 2015, Nov 2015, Slide 12
   URL: https://about.bnef.com/blog/battery-price-survey-2015
   Cross-check: DOE VTO Annual Report 2015 ($350/kWh) ✓"
   ```

3. **Formula Standards**:
   - Use cell references, NEVER hardcode calculations
   - Example: `=(B15/B14)-1` NOT `=0.15`
   - All formulas must recalculate cleanly (zero errors via recalc.py)

4. **Source Documentation Sheet**:
   - Every Excel file includes "Sources" tab with:
     - Source name, URL, access date, specific citation
     - Contact information (if available)
     - Download date and file version

### 4.3 Update Frequency & Maintenance

**Data Refresh Schedule**:
- **Annual Update**: Q1 following calendar year (by March 31)
- **Mid-Year Check**: Q3 (by Sept 30) for any major data revisions
- **Ad-Hoc Updates**: Within 30 days of major source publication

**Version Control**:
- Excel files use semantic versioning: `transportation_deflation_index_v1.2.xlsx`
- Major version (1.x): Methodology change
- Minor version (x.2): Data update only

**Change Log Requirements**:
- Every update documented in CHANGELOG.md
- Format: Date | Version | Changes | Impact on Index

### 4.4 Error Detection & Correction Protocol

**Monthly Automated Checks**:
1. Run `recalc.py` on all sector Excel files
2. Verify zero formula errors
3. Check for data outliers (>3 std dev from trend)
4. Validate cross-sheet references

**If Error Detected**:
1. Document in "Data_Issues_Log.md"
2. Investigate root cause
3. Correct in source Excel file
4. Recalculate all dependent metrics
5. Update CHANGELOG.md
6. Issue correction notice if published

### 4.5 Reproducibility Standard

**Gold Standard**: Any researcher with:
- Access to cited sources
- Excel + recalc.py script
- This methodology document

...should be able to reproduce DI Transportation values within ±0.5 percentage points

**Test Protocol**:
- Annually, have external party attempt full replication
- Document any reproducibility issues
- Update methodology to eliminate ambiguities

---

## 5. CALCULATION METHODOLOGY

### 5.1 Sector Composite Index Construction

**Step 1: Calculate Component Deflation Rates**

For each component (batteries, AV, efficiency, ride-sharing):
```
Component_Deflation[year] = 
  (Quality_Adjusted_Cost[year] / Quality_Adjusted_Cost[year-1]) - 1
```

**Step 2: Apply Component Weights**
```
Transportation_Deflation[year] = 
  (Battery_Deflation[year] × 0.60) +
  (AV_Deflation[year] × 0.25) +
  (Efficiency_Deflation[year] × 0.10) +
  (Rideshare_Deflation[year] × 0.05)
```

**Step 3: Calculate Cumulative Index**
```
Transportation_Index[1990] = 100.0
Transportation_Index[year] = 
  Transportation_Index[year-1] × (1 + Transportation_Deflation[year])
```

### 5.2 Integration into Master Deflation Index

**Master Index Calculation**:
```
Master_DI[year] = 
  (Computing_Index[year] × 0.25) +
  (Communications_Index[year] × 0.20) +
  (Energy_Index[year] × 0.25) +
  (Transportation_Index[year] × 0.15) +
  (Future_Sectors × remaining weight)
```

### 5.3 Comparison to M2 and CPI

**Annual Capture Rate**:
```
Capture_Rate[year] = 
  (Actual_Price_Change[year] - DI_Deflation[year]) / DI_Deflation[year]
```

Where:
- Actual_Price_Change = CPI or PCE inflation
- DI_Deflation = Master Deflation Index rate

---

## 6. KNOWN LIMITATIONS & FUTURE IMPROVEMENTS

### 6.1 Current Limitations

**Data Gaps**:
- Pre-2010 EV battery costs are estimates, not direct measurements
- AV data only from 2016 forward (technology didn't exist earlier)
- Ride-sharing data begins 2016 (Uber/Lyft IPO disclosures)

**Methodological Challenges**:
- Quality adjustments are somewhat subjective (energy density vs. cycle life tradeoffs)
- Autonomous vehicle "capability" metric is imperfect proxy for value
- Ride-sharing platform economics include non-tech factors (driver wages)

### 6.2 Planned Improvements

**2025 Roadmap**:
- [ ] Incorporate public transit cost data (buses, trains) for broader coverage
- [ ] Add freight transportation component (trucking logistics efficiency)
- [ ] Develop better AV capability metric using multi-dimensional scaling
- [ ] Expand international data (China, Europe EV costs for validation)

**2026+ Future Work**:
- [ ] Include micro-mobility (e-bikes, e-scooters)
- [ ] Add aviation efficiency metrics
- [ ] Develop transportation-as-a-service (TaaS) comprehensive model

---

## 7. APPENDIX

### 7.1 Key Sources Bibliography

**Government & International Organizations**:
1. U.S. Department of Energy - Vehicle Technologies Office: https://www.energy.gov/eere/vehicles/vehicle-technologies-office
2. U.S. EIA - Transportation Energy Data: https://www.eia.gov/totalenergy/data/browser/index.php?tbl=T02.01
3. NHTSA - Autonomous Vehicle Regulations: https://www.nhtsa.gov/vehicle-safety/automated-vehicles-safety

**Industry Standards**:
4. BloombergNEF - Energy Transition Research: https://about.bnef.com/
5. SAE International - Automated Driving Standards: https://www.sae.org/standards/content/j3016_202104/

**Academic Research**:
6. Nykvist, B., & Nilsson, M. (2015). "Rapidly falling costs of battery packs for electric vehicles." Nature Climate Change, 5(4), 329-332.
7. Litman, T. (2024). "Autonomous Vehicle Implementation Predictions." Victoria Transport Policy Institute.

### 7.2 Data File Specifications

**Excel File Structure**: `transportation_deflation_index.xlsx`

**Required Worksheets**:
1. **Master_Data**: All raw data with sources
2. **Quality_Adjustments**: Hedonic calculations
3. **Sector_Index**: Final deflation rates and index values
4. **Sources**: Complete bibliography with URLs
5. **Changelog**: Version history
6. **Assumptions**: All methodological choices documented

**Master_Data Columns** (minimum required):
- Year (1990-2024)
- Component_Raw_Cost (original nominal $)
- Component_Real_Cost (2024 constant $)
- Component_Quality_Metric (e.g., Wh/kg for batteries)
- Component_Quality_Adjusted_Cost
- Source_Primary
- Source_Date
- Cross_Check_Source
- Notes
- Data_Quality_Flag (A=Excellent, B=Good, C=Estimated)

---

**Document Control**:
- **Created**: December 15, 2025
- **Author**: Deflation Index LLC
- **Review Cycle**: Annual (Q1)
- **Next Review**: March 2026
