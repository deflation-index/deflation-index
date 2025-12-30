# Computing Sector Methodology
## The Deflation Index - Computing Component

**Version**: 1.0  
**Last Updated**: December 15, 2025  
**Status**: Production (Existing Sector - Documenting Current Methodology)  
**Current Weight in Master Index**: 25% (reduced from 35% with Transportation addition)

---

## EXECUTIVE SUMMARY

The Computing sector tracks technological deflation in computational capability costs through three primary metrics:
1. **Computing Power** ($/GFLOPS) - 60% of sector weight
2. **Data Storage** ($/GB) - 30% of sector weight
3. **Memory** ($/GB RAM) - 10% of sector weight

**Historical Deflation Rate**: ~35-40% annually (1990-2024)
**Key Finding**: Computing costs have fallen by 99.9%+ since 1990, the most dramatic deflation in modern economic history

---

## 1. DATA SOURCES & COLLECTION PROTOCOLS

### 1.1 Computing Power ($/GFLOPS)

#### PRIMARY SOURCE
**AI Impacts - Compute Trends Across Time**
- **URL**: https://aiimpacts.org/trends-in-the-cost-of-computing/
- **Frequency**: Irregular updates (uses historical academic literature)
- **Coverage**: 1940s-2024
- **Metric**: Floating Point Operations Per Second (FLOPS) cost
- **Reliability**: ★★★★★ (Peer-reviewed academic research)

**Data Collection Protocol**:
1. Download AI Impacts compute cost dataset (based on Stanford HAI research)
2. Extract $/GFLOPS (billion floating-point operations per second)
3. Verify against Top500.org supercomputer data for recent years
4. Cross-reference with academic papers (Nordhaus 2007, Turing Award lectures)
5. Document exact data point sources and calculation methods

**Data Structure**:
```
Year | GFLOPS_Cost_Raw_USD | Source_Document | Compute_Type | Quality_Metric | Notes
2024 | 0.0001 | AI Impacts 2024 | Consumer GPU | NVIDIA RTX 4090 benchmark
2020 | 0.0008 | AI Impacts 2020 | Consumer GPU | NVIDIA RTX 3090 benchmark
2015 | 0.005 | Top500.org | HPC System | Titan supercomputer
```

#### SECONDARY SOURCES (for validation)
- **Top500.org**: Twice-yearly list of most powerful supercomputers (price/performance data)
- **PassMark Software**: Consumer CPU/GPU benchmarks with MSRP data
- **NVIDIA/AMD/Intel**: Product specifications and pricing at launch
- **Academic Literature**: 
  - Nordhaus, W.D. (2007) "Two Centuries of Productivity Growth in Computing"
  - Thompson, N.C. et al. (2020) "The Computational Limits of Deep Learning"

#### HISTORICAL RECONSTRUCTION (Pre-1990)
- Use AI Impacts comprehensive historical dataset
- Trace from ENIAC (1940s) through mainframe era
- Validate against Nordhaus (2007) seminal paper
- Flag pre-1990 data as "historical context" (DI baseline starts 1990)

**Methodology for 1990-2000**:
- Rely on PC processor benchmarks (Intel 486, Pentium series)
- Use SPEC benchmarks where available
- Consumer-level computing (not supercomputers) for consistency
- Document as "consumer PC baseline" in notes

### 1.2 Data Storage ($/GB)

#### PRIMARY SOURCE
**Backblaze Hard Drive Stats + Industry Reports**
- **URL**: https://www.backblaze.com/blog/hard-drive-cost-per-gigabyte/
- **Frequency**: Quarterly (for recent years)
- **Coverage**: 2009-2024 (comprehensive), 1990-2008 (industry reports)
- **Metric**: Consumer hard drive cost per gigabyte
- **Reliability**: ★★★★ (Real-world data from major storage provider)

**Data Collection Protocol**:
1. Download Backblaze quarterly storage cost reports
2. Extract cost per GB for mainstream HDDs (exclude enterprise/specialty)
3. For pre-2009 data, use industry reports (IDC, Gartner, Coughlin Associates)
4. Document drive capacity and price at time of data point
5. Adjust for inflation to 2024 constant dollars

**Data Structure**:
```
Year | HDD_GB_Cost_Raw_USD | Drive_Capacity_GB | Source | Cross_Check
2024 | 0.015 | 20,000 | Backblaze Q4 2024 | Amazon retail $300/20TB
2020 | 0.023 | 14,000 | Backblaze Q4 2020 | Validated ✓
2015 | 0.035 | 6,000 | Backblaze Q4 2015 | Validated ✓
```

#### SECONDARY SOURCES
- **Amazon/Newegg Historical Pricing**: Consumer retail data for validation
- **IDC Storage Tracker**: Enterprise storage pricing trends
- **SSD Pricing**: Solid State Drive $/GB as parallel technology track
- **Coughlin Associates**: Storage market research (historical data)

**SSD vs HDD Consideration**:
- Primary metric: HDD (longer historical data, mainstream until recently)
- Track SSD separately as quality improvement proxy
- Note transition point (~2015) when SSDs became consumer mainstream
- Consider blended metric in future revisions

### 1.3 Memory ($/GB RAM)

#### PRIMARY SOURCE
**DRAM Exchange Historical Pricing + jcmit.net Historical Data**
- **URL**: https://www.dramexchange.com/ (TrendForce subsidiary)
- **Frequency**: Monthly
- **Coverage**: 2000-2024 (comprehensive)
- **Metric**: Spot price for DDR memory modules per GB
- **Reliability**: ★★★★ (Industry standard for memory pricing)

**Data Collection Protocol**:
1. Download DRAM Exchange contract/spot prices (monthly averages)
2. Extract $/GB for consumer-grade DDR memory (DDR3, DDR4, DDR5 transition)
3. For 1990-1999, use jcmit.net historical memory prices + academic sources
4. Normalize across technology transitions (SDRAM → DDR → DDR2 → DDR3/4/5)
5. Document memory type and technology node

**Data Structure**:
```
Year | RAM_GB_Cost_Raw_USD | Memory_Type | Source | Technology_Node
2024 | 3.50 | DDR5 | DRAM Exchange Q4 2024 | 10nm
2020 | 4.00 | DDR4 | DRAM Exchange Q4 2020 | 14nm
2015 | 6.50 | DDR3 | DRAM Exchange Q4 2015 | 20nm
```

#### SECONDARY SOURCES
- **jcmit.net**: Comprehensive historical memory prices (1990s-2000s)
- **Crucial/Kingston**: Consumer memory module pricing (validation)
- **IC Insights**: DRAM market reports
- **Academic Literature**: Memory technology cost curves

**Technology Transition Handling**:
- Normalize to equivalent speed/bandwidth when technology shifts
- DDR3 → DDR4 transition (~2014): Account for bandwidth improvement
- DDR4 → DDR5 transition (~2021): Account for speed increase
- Document adjustment factor in quality metrics

---

## 2. NORMALIZATION & STANDARDIZATION

### 2.1 Unit Cost Deflation Rate Formula

**Core Formula**:
```
Annual_Deflation_Rate[year] = 
  ((Cost_Per_Unit[year] / Cost_Per_Unit[year-1]) - 1) × 100
```

**Computing-Specific Units**:
- Computing Power: $/GFLOPS (billion floating-point operations per second)
- Storage: $/GB (gigabyte of storage capacity)
- Memory: $/GB (gigabyte of RAM)

### 2.2 Quality Adjustment Methodology

#### For Computing Power:
**Challenge**: Raw GFLOPS doesn't capture full computing capability

**Quality Dimensions**:
1. **Performance per Watt** (energy efficiency)
2. **Integer vs. Floating-Point Balance** (workload versatility)
3. **Memory Bandwidth** (data access speed)

**Quality-Adjusted Formula**:
```
Quality_Adjusted_GFLOPS_Cost[year] = 
  Raw_Cost[year] × (Perf_Per_Watt[2024] / Perf_Per_Watt[year])^0.3
```

**Rationale**: 
- Energy efficiency matters (30% weight) but not dominant
- Primary metric (GFLOPS) already captures core capability
- Conservative adjustment (power efficiency is secondary to raw speed)

#### For Storage:
**Challenge**: HDDs have improved in reliability, speed, form factor

**Quality Dimensions**:
1. **Reliability** (Mean Time Between Failures - MTBF)
2. **Transfer Speed** (MB/s sequential read/write)
3. **Form Factor** (physical size efficiency)

**Quality-Adjusted Formula**:
```
Quality_Adjusted_Storage_Cost[year] = 
  Raw_Cost[year] × (Transfer_Speed[2024] / Transfer_Speed[year])^0.2
```

**Rationale**: 
- Transfer speed is measurable and meaningful
- MTBF has improved but harder to quantify consistently
- Primary metric ($/GB) captures most of the value
- Conservative 20% weight on speed improvement

#### For Memory:
**Challenge**: RAM speed and bandwidth have increased dramatically

**Quality Dimensions**:
1. **Clock Speed** (MHz/GHz)
2. **Bandwidth** (GB/s)
3. **Latency** (CAS latency)

**Quality-Adjusted Formula**:
```
Quality_Adjusted_Memory_Cost[year] = 
  Raw_Cost[year] × (Bandwidth[2024] / Bandwidth[year])^0.4
```

**Rationale**: 
- Bandwidth is most important quality metric for memory
- Clock speed and bandwidth are correlated but bandwidth captures more
- 40% weight: Memory speed meaningfully affects performance
- DDR3→DDR4→DDR5 transitions driven by bandwidth increases

### 2.3 Hedonic Pricing Implementation

**Simplified Hedonic Approach for Computing**:

Since computing components have clear primary metrics (FLOPS, GB, GB RAM), we use **single-dimensional hedonic adjustment** rather than full regression:

**Formula**:
```
Hedonic_Deflation_Rate = 
  ((Nominal_Cost[year] / Nominal_Cost[year-1]) / 
   (Quality_Index[year] / Quality_Index[year-1])) - 1
```

**Example (Computing Power 2020→2024)**:
- 2020: $0.0008/GFLOPS, 10 GFLOPS/watt
- 2024: $0.0001/GFLOPS, 30 GFLOPS/watt

Quality improvement: 30/10 = 3x
Raw deflation: 87.5% reduction
Quality-adjusted: Effective cost reduction even larger

### 2.4 Inflation Adjustment

**All nominal figures converted to 2024 constant dollars using**:
- **Primary**: BLS CPI-U (All Items)
- **Cross-check**: PCE Price Index

**Formula**:
```
Real_Value[2024_dollars] = 
  Nominal_Value × (CPI[2024] / CPI[year_of_measurement])
```

---

## 3. WEIGHTING RATIONALE (Computing Sector = 25% of Master Index)

### 3.1 Component Weights Within Computing

| Component | Weight | Justification |
|-----------|--------|---------------|
| Computing Power | 60% | Core capability, drives AI/ML revolution, most dramatic deflation |
| Data Storage | 30% | Critical bottleneck historically, massive datasets drive modern economy |
| Memory | 10% | Important but secondary to processing power, smaller market |

**Justification Details**:

**Computing Power (60%)**:
- Drives AI, machine learning, scientific computing
- Most visible Moore's Law effect
- Fastest deflation rate (~40% annually)
- Consumer perception of "computing" primarily means processing speed

**Data Storage (30%)**:
- Second most dramatic deflation story
- Enables big data, cloud computing, streaming media
- Universal need (every device needs storage)
- ~30% deflation annually

**Memory (10%)**:
- Essential but less consumer-facing
- Deflation slower than compute/storage (~15-20% annually)
- Smaller market size relative to CPUs/storage
- Often bundled consideration with CPU purchases

### 3.2 Computing Weight in Master Index (25%)

**Basis**: GDP contribution + Consumer Expenditure + Deflation Magnitude

| Measure | Value | Source |
|---------|-------|--------|
| GDP Contribution (IT Services) | 8.2% | BEA GDP by Industry 2023 |
| Consumer Electronics Spending | 7.3% | BLS Consumer Expenditure 2023 |
| Business IT Investment | 12% | BEA Fixed Asset Tables 2023 |
| **Weighted Average** | **~9%** | |
| **DI Weight Multiplier** | **2.8x** | Accounts for deflation magnitude |
| **Final DI Weight** | **25%** | Rounded from 25.2% |

**Why Higher Than GDP Share?**:
- Computing has fastest deflation (35-40% vs. 20-25% Master Index average)
- Pervasive impact: Affects all other sectors (infrastructure technology)
- Consumer perception: Computing deflation most visible/recognized
- Historical precedent: Moore's Law as canonical exponential improvement

---

## 4. DATA QUALITY CONTROLS

### 4.1 Five-Point Data Verification Protocol

**Computing-Specific Checks**:

**1. SOURCE VERIFICATION**
- [ ] Academic peer-review OR industry standard-setter OR major vendor data
- [ ] Multiple independent sources for price points
- [ ] Benchmark methodology disclosed (SPEC, PassMark, etc.)
- [ ] Consistent measurement approach across years

**2. CROSS-VALIDATION**
- [ ] AI Impacts data validated against Top500 data
- [ ] Storage pricing validated against consumer retail (Amazon/Newegg)
- [ ] Memory pricing validated against module vendor pricing
- [ ] At least 2 independent sources within 20% for each data point

**3. CONSISTENCY CHECK**
- [ ] No unexplained jumps >50% year-over-year
- [ ] Exponential trend follows historical Moore's Law (~2x/18-24 months)
- [ ] Technology transitions (DDR3→DDR4) are documented
- [ ] Units remain consistent (GFLOPS not MFLOPS mid-series)

**4. QUALITY ADJUSTMENT VERIFICATION**
- [ ] Performance-per-watt data available from vendor specs
- [ ] Transfer speed data from manufacturer specifications
- [ ] Memory bandwidth from JEDEC standards or vendor specs
- [ ] Quality multiplier documented with source

**5. DOCUMENTATION COMPLETENESS**
- [ ] Every benchmark has source (PassMark test ID, SPEC result ID)
- [ ] Every price has date and vendor/source
- [ ] Technology transitions explained (Socket 370→LGA775, DDR3→DDR4)
- [ ] Outliers flagged and investigated

### 4.2 Excel Data Hygiene Standards

**MANDATORY FORMATTING**:

1. **Color Coding**:
   - Blue text: Price data from vendors/benchmarks
   - Black text: All calculated deflation rates, quality adjustments
   - Yellow highlight: Estimated/interpolated data (pre-2000), technology transitions

2. **Cell Comments**:
   ```
   Example for cell B15 (2015 compute cost):
   "Source: PassMark PerformanceTest v9.0
   CPU: Intel Core i7-6700K @ 4.0GHz
   Price: $350 MSRP (Newegg Nov 2015)
   GFLOPS: 70 (PassMark result ID: 2847193)
   Cost: $350/70 = $5.00/GFLOPS
   Cross-check: AI Impacts dataset ($4.80/GFLOPS) ✓"
   ```

3. **Source Documentation**:
   - Every CPU/GPU benchmark: PassMark ID or SPEC result ID
   - Every price: Vendor + date + URL
   - Every historical point: Academic paper citation

### 4.3 Computing-Specific Quality Checks

**Moore's Law Sanity Test**:
- Computing power should roughly double every 18-24 months
- If deviation >30% from trend, investigate thoroughly
- Document if real breakthrough (GPUs, TPUs) or data error

**Price Floor Check**:
- Manufacturing costs can't go below zero
- $/GFLOPS has floor around $0.00001 (amortized fab costs)
- If approaching floor, flag for methodology review

**Technology Transition Check**:
- When CPU architecture changes (x86→ARM, Intel→AMD→NVIDIA)
- When storage technology shifts (HDD→SSD, SATA→NVMe)
- When memory transitions (DDR3→DDR4→DDR5)
- Ensure apples-to-apples comparison across transitions

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
Computing_Deflation[year] = 
  (Compute_Power_Deflation[year] × 0.60) +
  (Storage_Deflation[year] × 0.30) +
  (Memory_Deflation[year] × 0.10)
```

**Step 3: Calculate Cumulative Index**
```
Computing_Index[1990] = 100.0
Computing_Index[year] = 
  Computing_Index[year-1] × (1 + Computing_Deflation[year])
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

**Note**: Computing weight reduced from 35% to 25% with Transportation addition

---

## 6. KNOWN LIMITATIONS & FUTURE IMPROVEMENTS

### 6.1 Current Limitations

**Data Gaps**:
- Pre-1990 data relies on academic reconstructions (not primary sources)
- Consumer vs. enterprise pricing sometimes conflated
- GPU/TPU explosion (2015+) not fully captured in "computing power" metric
- Quantum computing not yet included (technology too nascent)

**Methodological Challenges**:
- Moore's Law slowing down (2020+) — how to capture efficiency gains vs. raw speed
- Specialized accelerators (TPUs, NPUs) harder to compare to general-purpose CPUs
- Cloud computing pricing introduces new complexity ($/compute-hour vs. $/hardware)
- Quality adjustments are conservative estimates (may understate true capability gains)

### 6.2 Planned Improvements

**2025 Roadmap**:
- [ ] Split "Computing Power" into CPU vs. GPU vs. AI Accelerator tracks
- [ ] Add cloud computing $/compute-hour as parallel metric
- [ ] Incorporate SSD pricing more prominently (now dominant over HDD)
- [ ] Better capture AI/ML specific compute costs (training vs. inference)

**2026+ Future Work**:
- [ ] Quantum computing cost tracking (when commercially relevant)
- [ ] Edge computing / IoT processor costs
- [ ] Neuromorphic computing (if significant market emerges)
- [ ] Consider splitting Computing into "General Computing" and "AI/ML Computing"

---

## 7. APPENDIX

### 7.1 Key Sources Bibliography

**Computing Power**:
1. AI Impacts: https://aiimpacts.org/trends-in-the-cost-of-computing/
2. Top500 Supercomputer List: https://www.top500.org/
3. Nordhaus, W.D. (2007): "Two Centuries of Productivity Growth in Computing"
4. PassMark Software: https://www.cpubenchmark.net/
5. SPEC Benchmarks: https://www.spec.org/

**Data Storage**:
6. Backblaze Hard Drive Stats: https://www.backblaze.com/blog/hard-drive-cost-per-gigabyte/
7. IDC Worldwide Hard Disk Drive Tracker
8. Coughlin Associates Storage Market Reports
9. Amazon/Newegg Historical Pricing (consumer validation)

**Memory**:
10. DRAM Exchange (TrendForce): https://www.dramexchange.com/
11. jcmit.net Historical Memory Prices: http://www.jcmit.net/memoryprice.htm
12. IC Insights: https://www.icinsights.com/
13. Crucial Memory: https://www.crucial.com/

### 7.2 Technology Evolution Timeline

**1990-1995**: 486/Pentium era, SDRAM, HDD dominance
**1995-2000**: Pentium II/III, DDR memory emergence, 10GB HDDs
**2000-2005**: Pentium 4/Athlon, DDR2, 100GB HDDs, Moore's Law peak
**2005-2010**: Core 2 Duo, multi-core era, DDR3, 1TB HDDs
**2010-2015**: Sandy Bridge, DDR3 mature, 4TB HDDs, SSD adoption begins
**2015-2020**: Skylake/Ryzen, DDR4, 10TB HDDs, SSD mainstream, GPU compute explosion
**2020-2024**: Zen 3/4, Apple M-series, DDR5, 20TB HDDs, NVMe SSD standard, AI accelerators

### 7.3 Moore's Law Historical Context

**Original Moore's Law** (1965): Transistor count doubles every ~18-24 months
**Computing Cost Corollary**: Cost per transistor (and thus per FLOP) halves every ~18-24 months

**Historical Rates**:
- 1970-1990: ~60% annual deflation (Moore's Law peak)
- 1990-2010: ~40% annual deflation (sustained exponential)
- 2010-2020: ~30% annual deflation (Moore's Law slowing)
- 2020-2024: ~25% annual deflation (efficiency gains, not density)

**DI Computing Sector** captures this evolution with quality adjustments

---

**Document Control**:
- **Created**: December 15, 2025
- **Author**: Deflation Index LLC
- **Status**: Production (documenting existing methodology)
- **Review Cycle**: Annual (Q1)
- **Next Review**: March 2026
