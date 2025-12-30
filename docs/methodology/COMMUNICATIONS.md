# Communications Sector Methodology
## The Deflation Index - Communications Component

**Version**: 1.0  
**Last Updated**: December 15, 2025  
**Status**: Production (Existing Sector - Documenting Current Methodology)  
**Current Weight in Master Index**: 20% (reduced from 30% with Transportation addition)

---

## EXECUTIVE SUMMARY

The Communications sector tracks technological deflation in data transmission and connectivity costs through three primary metrics:
1. **Data Transmission** ($/GB transferred) - 70% of sector weight
2. **Voice Communications** ($/minute) - 20% of sector weight
3. **Network Access** ($/Mbps connection) - 10% of sector weight

**Historical Deflation Rate**: ~30-35% annually (1990-2024)
**Key Finding**: Cost per GB of data transmission has fallen 99.9%+ since 1995, enabling streaming, cloud computing, and mobile internet revolution

---

## 1. DATA SOURCES & COLLECTION PROTOCOLS

### 1.1 Data Transmission ($/GB transferred)

#### PRIMARY SOURCE
**FCC Internet Access Services Report + Academic Research**
- **URL**: https://www.fcc.gov/reports-research/reports/internet-access-services-reports
- **Frequency**: Annual
- **Coverage**: 2000-2024 (FCC), 1990-1999 (academic reconstruction)
- **Metric**: Cost per gigabyte of data transmitted (consumer internet)
- **Reliability**: ★★★★★ (Government regulatory data)

**Data Collection Protocol**:
1. Download FCC Internet Access Services report (annual)
2. Extract average price per Mbps for residential broadband
3. Calculate $/GB using formula: (Monthly_Cost / Speed_Mbps) / (720_hours × 3600_seconds × 0.125_GB_per_Mb)
4. For 1990-1999: Use dial-up costs + early broadband (DSL, Cable)
5. Account for actual usage patterns (not theoretical max throughput)
6. Document ISP type (dial-up, DSL, cable, fiber) and typical usage

**Data Structure**:
```
Year | Monthly_Cost_USD | Speed_Mbps | Effective_GB_Month | Cost_Per_GB | Connection_Type | Notes
2024 | 65 | 500 | 1000 | 0.065 | Fiber/Cable | Typical US broadband
2020 | 70 | 200 | 800 | 0.088 | Cable/Fiber | Pre-pandemic baseline
2015 | 50 | 50 | 300 | 0.167 | Cable/DSL | Mix of technologies
2010 | 45 | 10 | 100 | 0.450 | Cable/DSL | Early streaming era
2005 | 40 | 3 | 30 | 1.333 | Cable/DSL | Broadband adoption
2000 | 20 | 0.056 | 5 | 4.000 | Dial-up/Early DSL | Transition period
```

#### SECONDARY SOURCES (for validation)
- **OECD Broadband Portal**: International pricing comparisons
- **Akamai State of the Internet**: Data delivery costs from major CDN
- **Sandvine Global Internet Phenomena Report**: Actual usage patterns
- **Academic Papers**: 
  - Greenstein & McDevitt (2011): "Broadband Internet and Local Network Competition"
  - Downes & Greenstein (2007): "The Evolving Internet Market"

#### HISTORICAL RECONSTRUCTION (Pre-2000)
**1995-1999: Dial-Up Era**
- Primary: AOL pricing ($19.95/month unlimited, ~20 hours actual usage)
- Calculate $/MB based on 56k modem theoretical max
- Actual usage: ~10-50 MB/month per household
- Cost: ~$1-2 per MB (extremely expensive by today's standards)

**1990-1994: Pre-Internet Consumer Era**
- CompuServe, Prodigy pricing
- Per-hour charges ($3-6/hour)
- Minimal data transfer (text-only, images rare)
- Estimated: $5-10 per MB

**Challenge**: "Internet" as we know it didn't exist for consumers pre-1995
**Solution**: Use online service pricing as proxy, flag as "pre-consumer-internet estimate"

### 1.2 Voice Communications ($/minute)

#### PRIMARY SOURCE
**FCC Telecommunications Industry Revenues Report + BLS Telephone Services CPI**
- **URL**: https://www.fcc.gov/telecommunications-industry-revenues
- **Frequency**: Annual (revenues), Monthly (CPI)
- **Coverage**: 1990-2024
- **Metric**: Cost per minute of voice calling (long-distance + local + mobile)
- **Reliability**: ★★★★★ (Government regulatory + statistical data)

**Data Collection Protocol**:
1. Extract FCC data on consumer telephone spending (landline + mobile)
2. Extract FCC data on total minutes of use
3. Calculate: Total_Spending / Total_Minutes = $/minute
4. Cross-check with BLS CPI for Telephone Services (category CUSR0000SEED)
5. Separate landline vs. mobile trends (document transition)
6. Account for "unlimited" plans (calculate effective cost per actual usage minute)

**Data Structure**:
```
Year | Landline_Cost_Min | Mobile_Cost_Min | Weighted_Avg_Cost_Min | Market_Share_Mobile | Notes
2024 | 0.005 | 0.001 | 0.002 | 95% | Nearly all mobile, VoIP common
2020 | 0.008 | 0.003 | 0.003 | 90% | Unlimited plans dominant
2015 | 0.010 | 0.010 | 0.010 | 80% | Mobile majority
2010 | 0.015 | 0.030 | 0.024 | 60% | Mobile growing
2005 | 0.020 | 0.080 | 0.044 | 40% | Mobile expensive
2000 | 0.050 | 0.150 | 0.090 | 20% | Landline still dominant
1995 | 0.100 | 0.300 | 0.140 | 5% | Long-distance expensive
1990 | 0.150 | 0.500 | 0.180 | 1% | Mobile rare, LD very expensive
```

#### SECONDARY SOURCES
- **AT&T Historical Rate Cards**: Long-distance pricing (1990s)
- **Verizon Wireless Historical Plans**: Mobile plan evolution
- **ITU World Telecommunication Indicators**: International comparison
- **Consumer Reports Archives**: Historical phone plan reviews

**Technology Transition Tracking**:
- 1990-2000: Landline dominant, long-distance vs. local
- 2000-2010: Mobile adoption, "anytime minutes" plans
- 2010-2015: Unlimited voice becoming standard
- 2015-2024: Voice essentially free (bundled with data), VoIP/WhatsApp

### 1.3 Network Access ($/Mbps connection speed)

#### PRIMARY SOURCE
**FCC Measuring Broadband America Report**
- **URL**: https://www.fcc.gov/general/measuring-broadband-america
- **Frequency**: Annual (sometimes biannual)
- **Coverage**: 2011-2024 (comprehensive), 2000-2010 (reconstructed)
- **Metric**: Monthly cost divided by advertised download speed (Mbps)
- **Reliability**: ★★★★ (Government measurement program)

**Data Collection Protocol**:
1. Download FCC Measuring Broadband America report
2. Extract median price per tier (50Mbps, 100Mbps, 250Mbps, 500Mbps, 1Gbps)
3. Calculate weighted average $/Mbps across all tiers
4. Weight by subscriber count per tier
5. For 2000-2010: Use FCC Form 477 data + industry reports
6. Document technology type (DSL, cable, fiber) and availability

**Data Structure**:
```
Year | Median_Price_USD | Median_Speed_Mbps | Cost_Per_Mbps | Fiber_Availability_% | Notes
2024 | 65 | 500 | 0.13 | 60% | Gigabit increasingly common
2020 | 70 | 200 | 0.35 | 40% | COVID-19 highlighted gaps
2015 | 55 | 50 | 1.10 | 20% | 4G LTE competing
2010 | 45 | 15 | 3.00 | 5% | Cable broadband dominant
2005 | 40 | 5 | 8.00 | 1% | DSL vs. Cable competition
2000 | 30 | 1.5 | 20.00 | <1% | Early broadband
```

#### SECONDARY SOURCES
- **Ookla Speedtest Data**: Real-world speeds vs. advertised
- **OpenSignal Mobile Network Reports**: Mobile broadband performance
- **BroadbandNow Research**: ISP pricing database
- **Consumer Reports**: Broadband plan comparisons

---

## 2. NORMALIZATION & STANDARDIZATION

### 2.1 Unit Cost Deflation Rate Formula

**Core Formula**:
```
Annual_Deflation_Rate[year] = 
  ((Cost_Per_Unit[year] / Cost_Per_Unit[year-1]) - 1) × 100
```

**Communications-Specific Units**:
- Data Transmission: $/GB transferred
- Voice: $/minute of calling
- Network Access: $/Mbps of connection speed

### 2.2 Quality Adjustment Methodology

#### For Data Transmission:
**Challenge**: 2024 internet is qualitatively different from 2000 internet

**Quality Dimensions**:
1. **Latency** (ping time in milliseconds)
2. **Reliability** (uptime percentage)
3. **Geographic Coverage** (availability)

**Quality-Adjusted Formula**:
```
Quality_Adjusted_Data_Cost[year] = 
  Raw_Cost[year] × (Latency[year] / Latency[2024])^0.2 × (Reliability[2024] / Reliability[year])^0.1
```

**Rationale**: 
- Lower latency is better (invert ratio)
- Primary metric ($/GB) captures most value
- Quality adjustment modest (30% total weight) — speed/price is dominant factor

**Example**:
- 2000: $4/GB, 200ms latency, 95% uptime
- 2024: $0.065/GB, 20ms latency, 99.9% uptime
- Latency improvement: 10x better
- Reliability improvement: 1.05x better
- Quality multiplier: (200/20)^0.2 × (99.9/95)^0.1 = 1.58 × 1.005 = 1.59
- Effective cost: $4 × 1.59 = $6.36/GB (2000 internet was even worse than raw price suggests)

#### For Voice Communications:
**Challenge**: Call quality has improved dramatically

**Quality Dimensions**:
1. **Audio Quality** (codec quality: G.711 → AMR → HD Voice → Opus)
2. **Call Completion Rate** (% of calls that connect)
3. **Call Drop Rate** (% of calls that fail mid-conversation)

**Quality-Adjusted Formula**:
```
Quality_Adjusted_Voice_Cost[year] = 
  Raw_Cost[year] × (Quality_Index[2024] / Quality_Index[year])
```

**Quality Index**:
- 2024: 100 (HD Voice, >99% completion, <0.5% drop rate)
- 2010: 80 (Digital clear, ~97% completion, 2% drop rate)
- 2000: 60 (Digital, ~95% completion, 5% drop rate)
- 1990: 40 (Analog, ~90% completion, 10% drop rate, long-distance noise)

**Rationale**: Voice quality improvements are significant but secondary to cost reductions

#### For Network Access:
**Challenge**: Advertised speed vs. actual speed has converged over time

**Quality Dimensions**:
1. **Speed Consistency** (actual vs. advertised)
2. **Upload/Download Symmetry** (for modern applications)
3. **Capacity/Congestion** (performance under load)

**Quality-Adjusted Formula**:
```
Quality_Adjusted_Access_Cost[year] = 
  Raw_Cost[year] × (Actual_Speed[year] / Advertised_Speed[year]) / 
                    (Actual_Speed[2024] / Advertised_Speed[2024])
```

**Measured Ratios** (from FCC Measuring Broadband America):
- 2024: 98% (actual matches advertised)
- 2015: 85% (actual significantly below advertised)
- 2010: 70% (major gap between advertised and actual)

### 2.3 Hedonic Pricing Implementation

**Communications-Specific Approach**:

Given multiple quality dimensions that have improved, use:

```
Hedonic_Price_Index[year] = 
  (Nominal_Price[year] / Quality_Index[year]) × 100
```

**Where Quality_Index accounts for**:
- Bandwidth (primary)
- Latency (secondary)
- Reliability (secondary)
- Coverage (tertiary)

**Example (Broadband 2010→2024)**:
- 2010: $45/month for 15 Mbps, 100ms latency, 97% uptime
- 2024: $65/month for 500 Mbps, 15ms latency, 99.9% uptime

Raw price: +44%
Speed improvement: 33x
Latency improvement: 6.7x
Reliability improvement: 1.03x

Hedonic deflation: Price went up 44%, but capability went up >33x = **massive deflation**

### 2.4 Inflation Adjustment

**All nominal figures converted to 2024 constant dollars**:
- **Primary**: BLS CPI-U (All Items)
- **Cross-check**: BLS CPI for Telephone Services (CUSR0000SEED)
- **Special consideration**: Communications CPI historically understates deflation (doesn't capture usage increases)

**Formula**:
```
Real_Value[2024_dollars] = 
  Nominal_Value × (CPI[2024] / CPI[year_of_measurement])
```

---

## 3. WEIGHTING RATIONALE (Communications Sector = 20% of Master Index)

### 3.1 Component Weights Within Communications

| Component | Weight | Justification |
|-----------|--------|---------------|
| Data Transmission | 70% | Dominant use case, drives modern economy, fastest growth |
| Voice Communications | 20% | Historical importance, now commodity, declining relevance |
| Network Access | 10% | Infrastructure metric, correlated with data transmission |

**Justification Details**:

**Data Transmission (70%)**:
- Primary value of internet connectivity today
- Enables streaming, cloud computing, remote work, social media
- 1000x+ usage growth 2000-2024
- Most dramatic deflation story in communications

**Voice Communications (20%)**:
- Was primary telecom service (1990-2005)
- Now essentially free (bundled with data)
- Still important for emergency services, business
- Declining as percentage of communication (vs. messaging, video)

**Network Access (10%)**:
- Correlated with data transmission (faster network = more data capacity)
- Important policy metric (digital divide discussions)
- Less consumer-facing than data transmission itself

**Historical Note**: Voice was 50%+ of sector weight in 1990s methodology, has declined as data became dominant

### 3.2 Communications Weight in Master Index (20%)

**Basis**: GDP contribution + Consumer Spending + Deflation Magnitude

| Measure | Value | Source |
|---------|-------|--------|
| Telecom GDP Contribution | 2.3% | BEA GDP by Industry 2023 |
| Household Telecom Spending | 2.8% | BLS Consumer Expenditure 2023 |
| Business Telecom Spending | 4.1% | BEA Intermediate Inputs 2023 |
| **Weighted Average** | **~3%** | |
| **DI Weight Multiplier** | **6.7x** | Accounts for deflation magnitude + ubiquity |
| **Final DI Weight** | **20%** | Rounded from 20.1% |

**Why Higher Than GDP Share?**:
- Communications has second-fastest deflation after Computing (~30-35% annually)
- Ubiquitous: Affects every household and business
- Enabling technology: Makes remote work, e-commerce, streaming possible
- Consumer perception: Internet/mobile bills are highly visible

**Why Lower Than Computing (25%)?**:
- Smaller GDP footprint
- Deflation slightly slower than computing
- Less direct consumer purchasing (vs. buying new laptops/phones)

---

## 4. DATA QUALITY CONTROLS

### 4.1 Five-Point Data Verification Protocol

**Communications-Specific Checks**:

**1. SOURCE VERIFICATION**
- [ ] FCC regulatory data (primary for US market)
- [ ] OECD for international comparison/validation
- [ ] BLS CPI data for price trends
- [ ] Industry association data (CTIA for mobile, NCTA for cable)

**2. CROSS-VALIDATION**
- [ ] FCC data validated against BLS Telephone Services CPI
- [ ] Broadband pricing validated against ISP plan databases (BroadbandNow)
- [ ] Mobile pricing validated against carrier plan archives
- [ ] At least 2 independent sources within 15% for each data point

**3. CONSISTENCY CHECK**
- [ ] No unexplained jumps >40% year-over-year
- [ ] Technology transitions documented (dial-up→DSL→cable→fiber)
- [ ] Market share shifts documented (landline→mobile)
- [ ] Usage pattern changes noted (voice→data dominance)

**4. QUALITY ADJUSTMENT VERIFICATION**
- [ ] Latency data from Ookla/Speedtest archives
- [ ] Reliability data from ISP SLA disclosures
- [ ] Voice quality benchmarks from ITU standards
- [ ] Actual vs. advertised speed from FCC Measuring Broadband America

**5. DOCUMENTATION COMPLETENESS**
- [ ] Every price point: ISP/carrier name, plan details, date
- [ ] Every quality metric: Measurement method and source
- [ ] Technology transitions: Timeline and market share data
- [ ] Usage assumptions: Documented and justified (e.g., "typical 1000 GB/month 2024")

### 4.2 Excel Data Hygiene Standards

**MANDATORY FORMATTING**:

1. **Color Coding**:
   - Blue text: Price data from FCC reports, carrier plan sheets
   - Black text: All calculated deflation rates, quality adjustments
   - Yellow highlight: Estimated pre-2000 data, reconstructed usage patterns

2. **Cell Comments**:
   ```
   Example for cell B15 (2015 data cost):
   "Source: FCC Internet Access Services Report 2015
   Plan: Comcast Performance Tier - $55/month, 50 Mbps
   Usage: 300 GB/month average (Sandvine Global Internet Report 2015)
   Cost per GB: $55 / 300 = $0.183/GB
   Cross-check: FCC Measuring Broadband America 2015 ($1.10/Mbps) ✓"
   ```

3. **Usage Pattern Documentation**:
   ```
   Assumptions Sheet entry:
   "2024 Usage: 1000 GB/month (Netflix 4K: 300GB, YouTube: 200GB, 
   Web browsing: 100GB, Cloud backup: 200GB, Other: 200GB)
   Source: Sandvine Global Internet Phenomena Report 2024"
   ```

### 4.3 Communications-Specific Quality Checks

**Usage Growth Validation**:
- Data usage should grow exponentially (streaming, cloud adoption)
- If usage growth >100% YoY, validate with Sandvine reports
- Document drivers (Netflix launch, COVID-19 remote work, etc.)

**Price/Speed Relationship Check**:
- $/Mbps should decline exponentially
- If $/GB doesn't decline faster than $/Mbps, investigate (suggests usage not growing)
- Cross-reference with video streaming adoption curves

**Technology Transition Completeness**:
- When modeling DSL→Cable→Fiber transitions
- Ensure market share data matches pricing data
- Weighted averages should reflect actual consumer mix

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
Communications_Deflation[year] = 
  (Data_Transmission_Deflation[year] × 0.70) +
  (Voice_Deflation[year] × 0.20) +
  (Network_Access_Deflation[year] × 0.10)
```

**Step 3: Calculate Cumulative Index**
```
Communications_Index[1990] = 100.0
Communications_Index[year] = 
  Communications_Index[year-1] × (1 + Communications_Deflation[year])
```

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

**Note**: Communications weight reduced from 30% to 20% with Transportation addition

---

## 6. KNOWN LIMITATIONS & FUTURE IMPROVEMENTS

### 6.1 Current Limitations

**Data Gaps**:
- Pre-1995 "internet" data is proxy (CompuServe, AOL) not true internet
- Rural vs. urban pricing significantly different (using national averages)
- Business vs. consumer pricing often conflated
- International calling costs excluded (focus on domestic)

**Methodological Challenges**:
- "Unlimited" plans make per-unit costs hard to calculate (must assume usage)
- Quality improvements hard to quantify (how much better is 4K streaming capability?)
- Bundled services (internet + TV + phone) require unbundling assumptions
- Mobile data vs. home broadband treated separately but increasingly substitutes

**Emerging Issues**:
- 5G mobile as broadband substitute not fully captured
- Satellite internet (Starlink) creates new comparison challenges
- Net neutrality policy changes affect pricing/throttling assumptions

### 6.2 Planned Improvements

**2025 Roadmap**:
- [ ] Split "Data Transmission" into home broadband vs. mobile data
- [ ] Add latency as separate quality-adjusted component
- [ ] Better capture streaming vs. download cost differences
- [ ] Incorporate Starlink/satellite broadband pricing

**2026+ Future Work**:
- [ ] 5G vs. fiber cost competitiveness analysis
- [ ] International roaming costs (huge deflation story)
- [ ] Video calling quality/cost as separate component
- [ ] Consider splitting Communications into "Connectivity" and "Data Services"

---

## 7. APPENDIX

### 7.1 Key Sources Bibliography

**Data Transmission**:
1. FCC Internet Access Services Report: https://www.fcc.gov/reports-research/reports/internet-access-services-reports
2. OECD Broadband Portal: https://www.oecd.org/digital/broadband/broadband-statistics/
3. Sandvine Global Internet Phenomena Report (usage data)
4. Akamai State of the Internet Reports
5. BroadbandNow Research: ISP pricing database

**Voice Communications**:
6. FCC Telecommunications Industry Revenues: https://www.fcc.gov/telecommunications-industry-revenues
7. BLS Telephone Services CPI: Series CUSR0000SEED
8. ITU World Telecommunication Indicators Database
9. CTIA Wireless Industry Survey (mobile data)

**Network Access**:
10. FCC Measuring Broadband America: https://www.fcc.gov/general/measuring-broadband-america
11. Ookla Speedtest Global Index: https://www.speedtest.net/global-index
12. OpenSignal Mobile Network Experience Reports

### 7.2 Technology Evolution Timeline

**1990-1995**: Dial-up modems (14.4k→56k), CompuServe/AOL online services, long-distance calling expensive
**1995-2000**: Internet goes mainstream, early DSL/cable modems, $20/month unlimited dial-up
**2000-2005**: Broadband adoption accelerates, DSL vs. cable competition, VoIP emerges
**2005-2010**: Mobile data begins (EDGE→3G), streaming video appears, unlimited voice plans
**2010-2015**: 4G LTE revolution, mobile data explodes, "cord-cutting" begins
**2015-2020**: Gigabit fiber expands, 4K streaming standard, unlimited mobile data plans, voice essentially free
**2020-2024**: COVID-19 accelerates usage, fiber to >50% of homes, 5G deployment, Starlink competition

### 7.3 Usage Pattern Evolution

**1990s**: Dial-up for email and basic web (10-50 MB/month)
**2000s**: Broadband for music downloads and early video (5-20 GB/month)
**2010s**: Streaming music/video explodes (100-400 GB/month)
**2020s**: 4K streaming, cloud backup, video calls, gaming (800-1500 GB/month)

**Key Driver**: Every 5 years, average usage increases ~10x, while costs stay flat or decline

---

**Document Control**:
- **Created**: December 15, 2025
- **Author**: Deflation Index LLC
- **Status**: Production (documenting existing methodology)
- **Review Cycle**: Annual (Q1)
- **Next Review**: March 2026
