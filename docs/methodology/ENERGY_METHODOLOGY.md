# Energy Sector Methodology
## The Deflation Index - Energy Component

**Version**: 1.0  
**Last Updated**: December 15, 2025  
**Status**: Production (Existing Sector - Documenting Current Methodology)  
**Current Weight in Master Index**: 25% (reduced from 35% with Transportation addition)

---

## EXECUTIVE SUMMARY

The Energy sector tracks technological deflation in energy generation and storage costs through three primary metrics:
1. **Solar Energy** ($/kWh LCOE) - 50% of sector weight
2. **Battery Storage** ($/kWh capacity) - 40% of sector weight
3. **LED Lighting** ($/lumen) - 10% of sector weight

**Historical Deflation Rate**: ~25-30% annually (2010-2024), accelerating from ~10-15% (1990-2010)
**Key Finding**: Solar and batteries have achieved grid parity, fundamentally disrupting energy economics

---

## 1. DATA SOURCES & COLLECTION PROTOCOLS

### 1.1 Solar Energy ($/kWh Levelized Cost)

#### PRIMARY SOURCE
**IRENA Renewable Energy Cost Database**
- **URL**: https://www.irena.org/costs
- **Frequency**: Annual
- **Coverage**: 2010-2024 (comprehensive global data), 1990-2009 (academic + NREL)
- **Metric**: Levelized Cost of Energy (LCOE) for utility-scale solar PV in $/kWh
- **Reliability**: ★★★★★ (International agency, data from 20,000+ projects globally)

**Data Collection Protocol**:
1. Download IRENA Renewable Power Generation Costs annual report
2. Extract global weighted-average LCOE for utility-scale solar PV
3. Use nominal USD, then adjust to 2024 constant dollars
4. For 1990-2009: Use NREL historical data + academic papers
5. Cross-reference with BloombergNEF (BNEF) energy transition reports
6. Document module efficiency and project characteristics

**Data Structure**:
```
Year | Solar_LCOE_USD_kWh | Module_Efficiency_% | Source_Document | Capacity_Factor | Notes
2024 | 0.040 | 22% | IRENA RPGC 2024 | 24% | Grid parity achieved globally
2020 | 0.057 | 20% | IRENA RPGC 2020 | 23% | Bifacial modules emerging
2015 | 0.122 | 18% | IRENA RPGC 2015 | 21% | Costs falling rapidly
2010 | 0.378 | 15% | IRENA RPGC 2010 | 19% | Polysilicon price drop
2005 | 0.550 | 13% | NREL | 17% | Feed-in tariffs driving deployment
2000 | 0.800 | 12% | NREL + Academic | 15% | Early commercial projects
1995 | 1.200 | 10% | Academic papers | 13% | Niche applications
1990 | 1.800 | 8% | Academic reconstruct | 12% | Space/remote only
```

#### SECONDARY SOURCES (for validation)
- **NREL (National Renewable Energy Laboratory)**: U.S. solar cost benchmarks
- **BloombergNEF**: New Energy Outlook, energy transition economics
- **LBNL (Lawrence Berkeley National Lab)**: Tracking the Sun reports
- **IEA (International Energy Agency)**: World Energy Outlook solar data
- **Academic Literature**:
  - Barbose et al. (LBNL): "Tracking the Sun" series
  - Haegel et al. (2019): "Terawatt-scale photovoltaics"

#### HISTORICAL RECONSTRUCTION (Pre-2010)
**1990-2000: Early Commercial Era**
- Very limited deployment data (mostly off-grid)
- Module costs from Strategies Unlimited reports
- LCOE estimated from module cost using standard methodology
- Conservative assumptions (lower capacity factors, higher O&M)

**2000-2010: Subsidy-Driven Growth**
- German feed-in tariffs create market
- More systematic data from IEA PVPS program
- NREL begins tracking U.S. installations
- Still relatively expensive vs. fossil fuels

**Methodology**:
```
LCOE = (CAPEX × Capital_Recovery_Factor + Annual_O&M) / 
       (Capacity × Capacity_Factor × 8760_hours)
```

### 1.2 Battery Storage ($/kWh capacity)

#### PRIMARY SOURCE
**BloombergNEF Battery Price Survey** (Same as Transportation sector EV batteries)
- **URL**: https://about.bnef.com/blog/
- **Frequency**: Annual
- **Coverage**: 2010-2024 (comprehensive), 1990-2009 (limited data + estimates)
- **Metric**: Lithium-ion battery pack price per kWh of capacity
- **Reliability**: ★★★★★ (Industry standard)

**Note**: This metric overlaps with Transportation sector (EV batteries), but serves different use case:
- **Transportation**: Mobile power for vehicles
- **Energy**: Stationary storage for grid/home applications

**Data Collection Protocol**:
1. Use same BNEF data as Transportation sector (for consistency)
2. Separate out stationary storage pricing when available (typically 10-20% cheaper than EV packs)
3. For 1990-2009: Limited lithium-ion data; use lead-acid as proxy + document
4. Cross-reference with utility-scale storage project costs
5. Note technology transitions (lead-acid → NiMH → Li-ion)

**Data Structure**:
```
Year | Stationary_Storage_USD_kWh | EV_Pack_USD_kWh | Technology | Source | Notes
2024 | 125 | 139 | Li-ion | BNEF 2024 | Utility-scale cheaper
2020 | 135 | 149 | Li-ion | BNEF 2020 | LFP gaining share
2015 | 320 | 350 | Li-ion | BNEF 2015 | Home storage emerging
2010 | 1,050 | 1,160 | Li-ion | BNEF 2010 | Very limited deployment
2005 | 1,500 | -- | NiMH/Lead-acid | Industry reports | Pre-Li-ion era
2000 | 2,000 | -- | Lead-acid | Industry reports | UPS/telecom primary use
1995 | 2,500 | -- | Lead-acid | Estimated | Off-grid systems
1990 | 3,000 | -- | Lead-acid | Estimated | Industrial only
```

#### SECONDARY SOURCES
- **DOE Energy Storage Database**: U.S. project-level costs
- **NREL Storage Cost Benchmarks**: Annual reports on storage costs
- **Lazard LCOS Analysis**: Levelized cost of storage
- **Academic Literature**: 
  - Schmidt et al. (2019): "Projecting the future LCOE of batteries"
  - Ziegler & Trancik (2021): "Re-examining rates of lithium-ion battery tech improvement"

#### Technology Transition Handling
**Key Challenge**: Battery chemistry changed fundamentally 1990-2024

**Timeline**:
- 1990-2000: Lead-acid dominant (heavy, short cycle life)
- 2000-2010: NiMH for hybrid vehicles, Li-ion emerging
- 2010-2015: Li-ion becomes dominant, price crash begins
- 2015-2024: Li-ion optimized, LFP for storage, solid-state on horizon

**Normalization Approach**:
- Use $/kWh capacity as primary metric (technology-agnostic)
- Track cycle life separately as quality metric
- Adjust for energy density improvements (lead-acid → Li-ion = 3-5x denser)

### 1.3 LED Lighting ($/lumen)

#### PRIMARY SOURCE
**DOE Solid-State Lighting Program Reports + Retail Pricing Data**
- **URL**: https://www.energy.gov/eere/ssl/solid-state-lighting-program
- **Frequency**: Annual (DOE reports), Continuous (retail)
- **Coverage**: 2000-2024 (LED era), 1990-1999 (incandescent/CFL baseline)
- **Metric**: Cost per kilolumen (1,000 lumens) of light output
- **Reliability**: ★★★★ (Government + verified retail data)

**Data Collection Protocol**:
1. Download DOE SSL Multi-Year Program Plan + annual R&D reports
2. Extract LED efficacy (lumens per watt) and $/lumen trends
3. Cross-reference with retail pricing (Amazon, Home Depot historic prices)
4. For 1990-1999: Use incandescent bulb pricing as baseline
5. Calculate $/lumen accounting for bulb lifetime (LED lasts 50x longer than incandescent)
6. Document efficacy improvements and technology generations

**Data Structure**:
```
Year | LED_Price_USD | Lumens_Output | Efficacy_LPW | Lifetime_Hours | Cost_Per_Kilolumen | Notes
2024 | 3.00 | 1600 | 150 | 50,000 | 0.00019 | Commodity product
2020 | 5.00 | 1600 | 130 | 50,000 | 0.00031 | Prices stabilizing
2015 | 12.00 | 1600 | 100 | 50,000 | 0.00075 | Mass market penetration
2010 | 35.00 | 1600 | 70 | 50,000 | 0.00219 | Early adopter pricing
2005 | 80.00 | 800 | 50 | 50,000 | 0.01000 | Niche applications
2000 | 150.00 | 400 | 30 | 50,000 | 0.03750 | R&D phase
1995 | -- | -- | -- | -- | 0.05000 | CFL emerging
1990 | -- | -- | -- | -- | 0.08000 | Incandescent only (baseline)
```

#### SECONDARY SOURCES
- **Retail Price Archives**: Amazon, Home Depot, Lowe's historical pricing
- **DOE SSL R&D Plan**: Annual technology roadmaps
- **Strategies Unlimited**: LED market reports
- **Academic Literature**: LED cost curve studies

#### Methodology Note: Total Cost of Ownership
**Critical**: Must account for bulb lifetime, not just purchase price

**Incandescent (1990 baseline)**:
- Cost: $0.50/bulb, 800 lumens, 1,000-hour lifetime
- To equal 50,000-hour LED: Need 50 bulbs = $25 + electricity cost
- $/kilolumen (capital only): $25 / (0.8 × 50,000 hours) = $0.000625/kilolumen-hour

**LED (2024)**:
- Cost: $3.00/bulb, 1,600 lumens, 50,000-hour lifetime
- $/kilolumen (capital only): $3 / (1.6 × 50,000 hours) = $0.0000375/kilolumen-hour

**Deflation**: 94% reduction in capital cost per lumen-hour, PLUS 75% reduction in electricity usage (efficacy 15 LPW → 150 LPW)

---

## 2. NORMALIZATION & STANDARDIZATION

### 2.1 Unit Cost Deflation Rate Formula

**Core Formula**:
```
Annual_Deflation_Rate[year] = 
  ((Cost_Per_Unit[year] / Cost_Per_Unit[year-1]) - 1) × 100
```

**Energy-Specific Units**:
- Solar: $/kWh (levelized cost of energy)
- Battery: $/kWh (storage capacity)
- LED: $/kilolumen-hour (cost of light output over lifetime)

### 2.2 Quality Adjustment Methodology

#### For Solar Energy:
**Challenge**: Solar panels in 2024 are dramatically more efficient than 1990

**Quality Dimensions**:
1. **Module Efficiency** (% of sunlight converted to electricity)
2. **Degradation Rate** (performance loss per year)
3. **Capacity Factor** (actual vs. theoretical output)

**Quality-Adjusted Formula**:
```
Quality_Adjusted_Solar_Cost[year] = 
  LCOE[year] × (Module_Efficiency[year] / Module_Efficiency[2024])^0.3 × 
               (Degradation_Rate[2024] / Degradation_Rate[year])^0.1
```

**Rationale**: 
- Module efficiency primarily captured in LCOE calculation already
- Quality adjustment modest (40% total weight) to avoid double-counting
- Better modules last longer and produce more (degradation matters)

**Example**:
- 1990: $1.80/kWh LCOE, 8% efficient, 1% annual degradation
- 2024: $0.04/kWh LCOE, 22% efficient, 0.3% annual degradation
- Efficiency ratio: (8/22)^0.3 = 0.71
- Degradation ratio: (0.3/1.0)^0.1 = 0.89
- Quality multiplier: 0.71 × 0.89 = 0.63
- Effective cost: $1.80 × 0.63 = $1.13/kWh (1990 solar was even worse than raw LCOE)

#### For Battery Storage:
**Challenge**: Li-ion batteries have 10x cycle life vs. lead-acid

**Quality Dimensions**:
1. **Cycle Life** (full charge/discharge cycles before 80% capacity)
2. **Energy Density** (Wh/kg, affects installation cost)
3. **Round-Trip Efficiency** (% of energy retained charge→discharge)

**Quality-Adjusted Formula**:
```
Quality_Adjusted_Battery_Cost[year] = 
  Raw_Cost[year] × (Cycle_Life[2024] / Cycle_Life[year])^0.5 × 
                   (Efficiency[2024] / Efficiency[year])^0.2
```

**Rationale**: 
- Cycle life is CRITICAL for stationary storage economics
- A battery with 5,000 cycles is fundamentally different from 500-cycle battery
- High weight (50%) on cycle life reflects economic importance

**Example**:
- 1990: $3,000/kWh (lead-acid), 500 cycles, 80% round-trip efficiency
- 2024: $125/kWh (Li-ion), 5,000 cycles, 95% round-trip efficiency
- Cycle life ratio: (5,000/500)^0.5 = 3.16
- Efficiency ratio: (95/80)^0.2 = 1.03
- Quality multiplier: 3.16 × 1.03 = 3.25
- Effective cost: $3,000 × 3.25 = $9,750/kWh (lead-acid was even worse per useful cycle)

**Key Insight**: Per-cycle cost is what matters, not just upfront $/kWh

#### For LED Lighting:
**Challenge**: LED efficacy has increased 5x since 2000

**Quality Dimensions**:
1. **Luminous Efficacy** (lumens per watt)
2. **Color Rendering Index** (CRI, quality of light)
3. **Lifetime** (hours before failure)

**Quality-Adjusted Formula**:
```
Quality_Adjusted_LED_Cost[year] = 
  Raw_Cost[year] × (Efficacy[year] / Efficacy[2024])^0.4
```

**Rationale**: 
- Efficacy is dominant quality metric (directly affects electricity cost)
- CRI has improved but subjective
- Lifetime already accounted for in $/kilolumen-hour calculation
- 40% weight on efficacy reflects both cost and environmental impact

**Example**:
- 2005: $80 for 800 lumens, 50 LPW, 50,000 hours
- 2024: $3 for 1,600 lumens, 150 LPW, 50,000 hours
- Efficacy ratio: (50/150)^0.4 = 0.57
- Base $/kilolumen: 2005=$0.01, 2024=$0.0002
- Quality-adjusted: $0.01 × 0.57 = $0.0057 (2005 LEDs worse than raw price suggests)

### 2.3 Hedonic Pricing Implementation

**Energy-Specific Hedonic Approach**:

Solar and batteries have clear **learning curves** (cost falls with cumulative deployment):

**Wright's Law Formula**:
```
Cost[deployment] = Cost[initial] × (Cumulative_Deployment[deployment] / Cumulative_Deployment[initial])^(-Learning_Rate)
```

**Observed Learning Rates**:
- Solar PV: 28% (cost drops 28% per doubling of cumulative capacity)
- Lithium-ion batteries: 19% (cost drops 19% per doubling of production)
- LED: 25% (cost drops 25% per doubling of production)

**Source**: MIT Future of Solar Study (2015), Schmidt et al. (2019) battery study

**Hedonic Deflation** combines:
1. Learning curve cost reductions (manufacturing scale)
2. Technology improvements (efficiency, durability)
3. Supply chain optimization

**Result**: Energy sector deflation accelerates over time (unlike linear deflation)

### 2.4 Inflation Adjustment

**All nominal figures converted to 2024 constant dollars**:
- **Primary**: BLS CPI-U (All Items)
- **Cross-check**: BLS CPI for Energy (CUSR0000SA0E) — but note this tracks fossil fuel prices, not renewable tech
- **Special consideration**: Energy CPI captures oil/gas volatility, NOT renewable technology deflation

**Formula**:
```
Real_Value[2024_dollars] = 
  Nominal_Value × (CPI[2024] / CPI[year_of_measurement])
```

---

## 3. WEIGHTING RATIONALE (Energy Sector = 25% of Master Index)

### 3.1 Component Weights Within Energy

| Component | Weight | Justification |
|-----------|--------|---------------|
| Solar Energy | 50% | Largest renewable sector, fastest growth, grid parity achieved |
| Battery Storage | 40% | Enables renewable integration, dramatic deflation, transformative |
| LED Lighting | 10% | Completed transition, mature technology, broad consumer impact |

**Justification Details**:

**Solar Energy (50%)**:
- Largest capacity additions globally (2023: 400+ GW)
- Achieved grid parity in most markets
- Costs fallen 90%+ since 2010
- Residential, commercial, utility-scale applications
- Primary driver of energy transition narrative

**Battery Storage (40%)**:
- Critical enabler of high-renewable grids
- Fastest-growing energy storage segment
- Costs fallen 95%+ since 2010 (even more dramatic than solar)
- Dual application: Grid + EV (counted here for grid storage)
- 2023-2024: Massive deployment acceleration (battery energy storage systems - BESS)

**LED Lighting (10%)**:
- Market penetration >70% in developed markets
- Technology mature, deflation slowing
- Consumer-facing, highly visible
- Lighting = ~15% of global electricity use, so efficiency gains matter
- Included for comprehensive energy picture, but smaller weight than generation/storage

**Historical Note**: Wind energy considered but excluded due to:
- Geographic limitations (not universally deployable like solar)
- Slower cost reductions vs. solar
- Harder to measure "unit cost" (site-specific)
- May add in future revision as complementary metric

### 3.2 Energy Weight in Master Index (25%)

**Basis**: GDP contribution + Consumer Spending + Deflation Magnitude + Global Importance

| Measure | Value | Source |
|---------|-------|--------|
| Utilities GDP Contribution | 1.8% | BEA GDP by Industry 2023 |
| Household Energy Spending | 3.2% | BLS Consumer Expenditure 2023 |
| Industrial Energy % of Costs | 8-12% | BEA Intermediate Inputs 2023 |
| **Weighted Average** | **~4%** | |
| **DI Weight Multiplier** | **6.25x** | Accounts for deflation magnitude + climate importance |
| **Final DI Weight** | **25%** | Rounded from 25.0% |

**Why Equal to Computing (25%)?**:
- Energy is fundamental input to ALL economic activity (even more than computing)
- Climate crisis makes energy transition globally critical
- Deflation accelerating (solar/batteries learning curves steepening)
- Affects every household and business directly

**Why Higher Than Communications (20%)?**:
- Larger economic footprint (energy more expensive than internet)
- More dramatic recent deflation (2010-2024 especially)
- Greater global policy focus (Paris Agreement, net-zero commitments)
- Storage revolution is game-changing (enables renewable grids)

**Why Lower Than Pre-Transportation Weight (35%)?**:
- With Transportation added, total must = 100%
- Energy and Computing share "fundamental input" status
- Reduced from 35% to 25% maintains balance across sectors

---

## 4. DATA QUALITY CONTROLS

### 4.1 Five-Point Data Verification Protocol

**Energy-Specific Checks**:

**1. SOURCE VERIFICATION**
- [ ] IRENA for solar (primary international authority)
- [ ] BNEF for batteries (industry standard)
- [ ] DOE SSL for LEDs (government technical expertise)
- [ ] Cross-reference with NREL, LBNL, IEA, Lazard

**2. CROSS-VALIDATION**
- [ ] IRENA solar data validated against LBNL Tracking the Sun (US data)
- [ ] BNEF battery data validated against NREL cost benchmarks
- [ ] LED pricing validated against retail archives (Amazon, Home Depot)
- [ ] At least 2 independent sources within 20% for each data point

**3. CONSISTENCY CHECK**
- [ ] Solar LCOE follows expected learning curve (28% per doubling)
- [ ] Battery costs follow expected learning curve (19% per doubling)
- [ ] LED efficacy improvements follow technical roadmaps
- [ ] No unexplained jumps >50% year-over-year (except technology breakthroughs)

**4. QUALITY ADJUSTMENT VERIFICATION**
- [ ] Module efficiency data from manufacturer datasheets (SolarReviews, NREL)
- [ ] Battery cycle life from academic studies + manufacturer specs
- [ ] LED efficacy from DOE testing + Energy Star database
- [ ] All quality metrics documented with sources

**5. DOCUMENTATION COMPLETENESS**
- [ ] Every LCOE value: Project details, location, financing assumptions
- [ ] Every battery cost: Chemistry, application (EV vs. stationary), volume
- [ ] Every LED price: Retailer, date, product specifications, Energy Star rating
- [ ] Learning curve calculations: Cumulative deployment data documented

### 4.2 Excel Data Hygiene Standards

**MANDATORY FORMATTING**:

1. **Color Coding**:
   - Blue text: LCOE from IRENA reports, battery prices from BNEF, LED retail prices
   - Black text: All calculated deflation rates, quality adjustments, learning curves
   - Yellow highlight: Estimated pre-2010 data, lead-acid battery proxies

2. **Cell Comments**:
   ```
   Example for cell B15 (2015 solar LCOE):
   "Source: IRENA Renewable Power Generation Costs 2015, Figure 2.4
   LCOE: $0.122/kWh (global weighted average, utility-scale PV)
   Module efficiency: 18% (typical 2015 polysilicon)
   Capacity factor: 21% (global average)
   Cross-check: Lazard LCOE 2015 ($0.125/kWh) ✓"
   ```

3. **Learning Curve Documentation**:
   ```
   Assumptions Sheet entry:
   "Solar Learning Rate: 28% per doubling of cumulative capacity
   Source: MIT Future of Solar Energy Study (2015)
   Validation: Observed 2010-2024 data matches predicted curve within 5%
   2010 cumulative: 40 GW global → 2024 cumulative: 1,600 GW (40x or ~5.3 doublings)
   Predicted cost reduction: (0.72)^5.3 = 0.15 (85% reduction)
   Actual: $0.378 → $0.040 = 0.106 (89% reduction) ✓ Within expected range"
   ```

### 4.3 Energy-Specific Quality Checks

**Learning Curve Validation**:
- Plot cumulative deployment vs. cost on log-log scale
- Should be approximately linear (Wright's Law)
- Significant deviations indicate data errors or technology breakthroughs
- Document causes of deviations (e.g., 2010 polysilicon shortage)

**Technology Transition Validation**:
- Lead-acid → Li-ion battery transition (~2010-2015)
- Incandescent → CFL → LED lighting transition (~2005-2015)
- Crystalline silicon → thin film → back to improved crystalline (solar)
- Ensure continuity across transitions (apples-to-apples comparisons)

**Grid Parity Verification**:
- Solar LCOE should cross fossil fuel generation costs 2015-2020
- Document when/where grid parity achieved
- Validate against utility procurement data (solar PPAs vs. gas peaker plants)

---

## 5. CALCULATION METHODOLOGY

### 5.1 Sector Composite Index Construction

**Step 1: Calculate Component Deflation Rates**

For each component:
```
Component_Deflation[year] = 
  (Quality_Adjusted_Cost[year] / Quality_Adjusted_Cost[year-1]) - 1
```

**Step 2: Apply Component Weights**
```
Energy_Deflation[year] = 
  (Solar_Deflation[year] × 0.50) +
  (Battery_Deflation[year] × 0.40) +
  (LED_Deflation[year] × 0.10)
```

**Step 3: Calculate Cumulative Index**
```
Energy_Index[1990] = 100.0
Energy_Index[year] = 
  Energy_Index[year-1] × (1 + Energy_Deflation[year])
```

**Note**: Energy deflation accelerated post-2010 (learning curves steepening)

### 5.2 Integration into Master Deflation Index

**Current Integration** (with 4 sectors):
```
Master_DI[year] = 
  (Computing_Index[year] × 0.25) +
  (Communications_Index[year] × 0.20) +
  (Energy_Index[year] × 0.25) +
  (Transportation_Index[year] × 0.15) +
  (Future_Sectors × 0.15)
```

**Note**: Energy weight reduced from 35% to 25% with Transportation addition

---

## 6. KNOWN LIMITATIONS & FUTURE IMPROVEMENTS

### 6.1 Current Limitations

**Data Gaps**:
- Pre-2010 solar data sparse (limited deployment)
- Pre-2010 lithium-ion battery data very limited (lead-acid proxy used)
- Geographic variation large (LCOE in Arizona ≠ LCOE in Germany)
- Financing assumptions affect LCOE significantly (WACC matters)

**Methodological Challenges**:
- LCOE methodology has evolved (comparing 1990 vs. 2024 calculations difficult)
- Battery costs: Stationary vs. EV pricing sometimes conflated
- LED "quality of light" hard to quantify (CRI, color temperature subjective)
- Grid integration costs not fully captured (intermittency, curtailment)

**Emerging Issues**:
- Next-gen technologies on horizon (perovskite solar, solid-state batteries)
- Energy storage expanding beyond Li-ion (flow batteries, compressed air, hydrogen)
- Microgrids and distributed generation change cost calculations

### 6.2 Planned Improvements

**2025 Roadmap**:
- [ ] Add wind energy as separate component (onshore + offshore)
- [ ] Split battery storage into short-duration (<4h) vs. long-duration (>10h)
- [ ] Include residential solar + storage economics (behind-the-meter)
- [ ] Add geothermal heat pumps as energy efficiency component

**2026+ Future Work**:
- [ ] Hydrogen production costs (green hydrogen via electrolysis)
- [ ] Grid-scale storage beyond batteries (CAES, pumped hydro, flow batteries)
- [ ] Perovskite and other next-gen solar technologies
- [ ] Nuclear SMRs (if costs become competitive and deployment scales)

---

## 7. APPENDIX

### 7.1 Key Sources Bibliography

**Solar Energy**:
1. IRENA Renewable Power Generation Costs: https://www.irena.org/costs
2. NREL Annual Technology Baseline: https://atb.nrel.gov/
3. LBNL Tracking the Sun: https://emp.lbl.gov/tracking-the-sun/
4. BloombergNEF New Energy Outlook
5. Lazard Levelized Cost of Energy Analysis (LCOE)
6. MIT Future of Solar Energy Study (2015)

**Battery Storage**:
7. BloombergNEF Battery Price Survey: https://about.bnef.com/blog/
8. NREL Energy Storage Cost Benchmarks
9. DOE Energy Storage Database: https://www.sandia.gov/ess-ssl/gesdb/
10. Schmidt et al. (2019): "Projecting future LCOE for lithium-ion"
11. Ziegler & Trancik (2021): Nature Energy battery cost study

**LED Lighting**:
12. DOE Solid-State Lighting Program: https://www.energy.gov/eere/ssl/
13. Energy Star LED Product Database
14. Amazon/Home Depot Historical Pricing (retail validation)
15. Strategies Unlimited LED Market Reports

### 7.2 Technology Evolution Timeline

**1990-2000: Renewable Niche Era**
- Solar: $1.80/kWh, <1 GW global capacity, mostly off-grid
- Batteries: Lead-acid dominant, $3,000/kWh, 500 cycles
- Lighting: Incandescent only, 15 lumens/watt, CFLs emerging

**2000-2010: Early Adoption**
- Solar: $0.38/kWh by 2010, feed-in tariffs drive deployment, 40 GW global
- Batteries: Li-ion emerging, $1,160/kWh by 2010, 1,000 cycles
- Lighting: CFLs gain share, LEDs expensive ($80/bulb), 50 lumens/watt

**2010-2015: Cost Crash Begins**
- Solar: $0.12/kWh by 2015 (68% cost drop), Chinese manufacturing scale-up
- Batteries: $350/kWh by 2015 (70% cost drop), EVs driving volume
- Lighting: LED mainstream, $12/bulb by 2015, 100 lumens/watt, CFL decline

**2015-2020: Grid Parity Achieved**
- Solar: $0.057/kWh by 2020 (53% further drop), cheapest electricity source
- Batteries: $149/kWh by 2020 (57% further drop), utility-scale storage boom
- Lighting: LED commodity, $5/bulb by 2020, 130 lumens/watt, incandescent banned

**2020-2024: Acceleration Continues**
- Solar: $0.040/kWh by 2024 (30% further drop), multi-GW projects common
- Batteries: $139/kWh by 2024 (7% further drop, slowing), LFP for storage
- Lighting: LED mature, $3/bulb by 2024, 150 lumens/watt, near-theoretical max

### 7.3 Grid Parity Milestones

**Solar Grid Parity Timeline** (when solar LCOE < retail electricity rates):
- 2015: Chile, UAE (first major markets)
- 2016: India, parts of US Southwest
- 2018: China, most of US
- 2020: Most of Europe
- 2024: Nearly universal in sunny regions

**Battery + Solar Grid Parity** (when solar+4h battery < gas peaker):
- 2018: First projects competitive in California
- 2020: Competitive in several US states
- 2022: Competitive in most sunny regions
- 2024: Undercutting new gas peakers in many markets

**This is the energy transition inflection point captured by DI Energy sector deflation**

---

**Document Control**:
- **Created**: December 15, 2025
- **Author**: Deflation Index LLC
- **Status**: Production (documenting existing methodology)
- **Review Cycle**: Annual (Q1)
- **Next Review**: March 2026
