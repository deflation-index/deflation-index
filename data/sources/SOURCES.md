# Deflation Index Source Documentation

**Version**: 3.0.2  
**Last Updated**: December 2025  
**Purpose**: Complete bibliography and source verification for independent reproducibility

---

## Table of Contents

1. [Monetary Data (M2, CPI)](#1-monetary-data-m2-cpi)
2. [Computing Sector](#2-computing-sector)
3. [Communications Sector](#3-communications-sector)
4. [Energy Sector](#4-energy-sector)
5. [Transportation Sector](#5-transportation-sector)
6. [Source File Inventory](#6-source-file-inventory)
7. [Data Extraction Notes](#7-data-extraction-notes)

---

## 1. Monetary Data (M2, CPI)

### 1.1 M2 Money Supply

**Primary Source**: Federal Reserve Economic Data (FRED)  
**Series ID**: M2SL  
**URL**: https://fred.stlouisfed.org/series/M2SL  
**Publisher**: Board of Governors of the Federal Reserve System (US)  
**Release**: H.6 Money Stock Measures  
**Frequency**: Monthly, Seasonally Adjusted  
**Units**: Billions of Dollars  
**Access**: Public Domain (Citation Requested)

**Data Extracted**:
| Year | M2 Value ($B) | Index (1990=100) |
|------|---------------|------------------|
| 1990 | 3,276.8 | 100.00 |
| 2000 | 4,917.2 | 150.06 |
| 2010 | 8,662.3 | 264.37 |
| 2020 | 18,321.7 | 559.19 |
| 2024 | 21,300.0 | 650.20 |

**Calculation**: 
- Cumulative expansion: (21,300 - 3,276.8) / 3,276.8 = 550.2%
- CAGR: (21,300 / 3,276.8)^(1/34) - 1 = 5.66%

**Citation**:
> Board of Governors of the Federal Reserve System (US), M2 [M2SL], retrieved from FRED, Federal Reserve Bank of St. Louis; https://fred.stlouisfed.org/series/M2SL

**Local File**: `fred/M2SL_1990-2024.csv`

---

### 1.2 Consumer Price Index (CPI)

**Primary Source**: Federal Reserve Economic Data (FRED)  
**Series ID**: CPIAUCSL  
**URL**: https://fred.stlouisfed.org/series/CPIAUCSL  
**Publisher**: U.S. Bureau of Labor Statistics  
**Frequency**: Monthly, Seasonally Adjusted  
**Units**: Index (1982-1984=100)  
**Access**: Public Domain (Citation Requested)

**Data Extracted**:
| Year | CPI Value | Index (1990=100) |
|------|-----------|------------------|
| 1990 | 130.7 | 100.00 |
| 2000 | 172.2 | 131.75 |
| 2010 | 218.1 | 166.87 |
| 2020 | 258.8 | 198.01 |
| 2024 | 314.7 | 240.78 |

**Calculation**:
- Cumulative inflation: 155% (used as context, not in gap calculation)
- Annual rate: ~2.8%

**Citation**:
> U.S. Bureau of Labor Statistics, Consumer Price Index for All Urban Consumers: All Items in U.S. City Average [CPIAUCSL], retrieved from FRED, Federal Reserve Bank of St. Louis; https://fred.stlouisfed.org/series/CPIAUCSL

**Local File**: `fred/CPIAUCSL_1990-2024.csv`

---

## 2. Computing Sector

### 2.1 Historical Computing Cost Trends

**Primary Source**: AI Impacts  
**URL**: https://aiimpacts.org/trends-in-the-cost-of-computing/  
**Last Updated**: August 2022  
**Access**: Free

**Key Findings Used**:
- FLOPS/$ grows by factor of 10 every ~4 years (recent quarter century)
- MIPS/$ grows by factor of 10 every 5.6 years (Sandberg & Bostrom)
- Since 1940s: FLOPS/$ grows by factor of 10 every 7.7 years

**Citation**:
> AI Impacts. "Trends in the cost of computing." Published January 2014, last updated August 2022. https://aiimpacts.org/trends-in-the-cost-of-computing/

---

### 2.2 Nordhaus Computing Study

**Primary Source**: William D. Nordhaus, Yale University  
**Title**: "The Progress of Computing"  
**Publication**: Cowles Foundation Discussion Paper No. 1324  
**Date**: 2001  
**URL**: https://cowles.yale.edu/sites/default/files/files/pub/d13/d1324.pdf  
**Access**: Free

**Key Findings Used**:
- Long-run analysis of computing costs from 1850s-2000
- Converts all data to "million standard operations per second" (MSOPS)
- Documents exponential decline in computation costs

**Citation**:
> Nordhaus, William D. "The Progress of Computing." Cowles Foundation Discussion Paper No. 1324, Yale University, 2001.

**Local File**: `academic/nordhaus_computing_2001.pdf`

---

### 2.3 Sandberg & Bostrom Whole Brain Emulation Roadmap

**Primary Source**: Anders Sandberg & Nick Bostrom, Future of Humanity Institute  
**Title**: "Whole Brain Emulation: A Roadmap"  
**Publication**: Technical Report #2008-3  
**Date**: 2008  
**URL**: https://www.fhi.ox.ac.uk/brain-emulation-roadmap-report.pdf  
**Access**: Free

**Key Findings Used** (Appendix B):
- MIPS/$ grows by factor of 10 every 5.6 years (95% CI: 5.3-5.9)
- FLOPS/$ grows by factor of 10 every 7.7 years (95% CI: 6.5-9.2)
- Data source: John McCallum's CPU price performance dataset

**Citation**:
> Sandberg, Anders, and Nick Bostrom. "Whole Brain Emulation: A Roadmap." Technical Report #2008-3, Future of Humanity Institute, Oxford University, 2008.

**Local File**: `academic/sandberg_bostrom_wbe_roadmap_2008.pdf`

---

### 2.4 GPU Price-Performance Trends

**Primary Source**: Epoch AI  
**Title**: "Trends in GPU price-performance"  
**Date**: June 2022  
**URL**: https://epoch.ai/blog/trends-in-gpu-price-performance  
**Access**: Free

**Key Findings Used**:
- Analysis of 470 GPUs from 2006-2021
- FLOPS/$ doubles every ~2.5 years
- ML-relevant GPUs: FLOPS/$ doubles every 2.07 years

**Citation**:
> Epoch AI. "Trends in GPU price-performance." June 2022. https://epoch.ai/blog/trends-in-gpu-price-performance

---

### 2.5 Hard Drive Cost Data

**Primary Source**: Backblaze  
**Title**: "Hard Drive Cost Per Gigabyte"  
**URL**: https://www.backblaze.com/blog/hard-drive-cost-per-gigabyte/  
**Access**: Free

**Key Data Points**:
- 1980: ~$400,000/GB
- 1990: ~$10,000/GB
- 2000: ~$10/GB
- 2010: ~$0.10/GB
- 2020: ~$0.02/GB

**Citation**:
> Backblaze. "Hard Drive Cost Per Gigabyte." https://www.backblaze.com/blog/hard-drive-cost-per-gigabyte/

---

## 3. Communications Sector

### 3.1 FCC Internet Access Services Report

**Primary Source**: Federal Communications Commission  
**Title**: "Internet Access Services: Status as of December 31, 2022"  
**Date**: October 2023  
**URL**: https://www.fcc.gov/internet-access-services-reports  
**Access**: Free (PDF)

**Key Data Used**:
- Historical broadband subscription data
- Speed tier distributions
- Price per Mbps trends

**Citation**:
> Federal Communications Commission. "Internet Access Services: Status as of December 31, 2022." October 2023.

**Local File**: `fcc/internet_access_services_2023.pdf`

---

### 3.2 BLS Telephone Services Price Index

**Primary Source**: Bureau of Labor Statistics  
**Series**: CPI - Telephone Services  
**URL**: https://www.bls.gov/cpi/  
**Access**: Free

**Data Used**:
- Historical telephone service price indices
- Wireless telephone services pricing trends

**Citation**:
> U.S. Bureau of Labor Statistics. Consumer Price Index - Telephone Services.

---

### 3.3 Wireless Industry Data (CTIA)

**Primary Source**: CTIA - The Wireless Association  
**Title**: "Annual Wireless Industry Survey"  
**URL**: https://www.ctia.org/news/report-2023-annual-survey-highlights  
**Access**: Free summary, detailed data by request

**Key Data Used**:
- Historical wireless minutes/data usage
- Revenue per minute/MB trends
- Network capacity expansion

**Citation**:
> CTIA. "Annual Wireless Industry Survey." Various years.

---

## 4. Energy Sector

### 4.1 IRENA Renewable Power Generation Costs (Primary)

**Primary Source**: International Renewable Energy Agency (IRENA)  
**Title**: "Renewable Power Generation Costs in 2024"  
**Date**: July 2025  
**URL**: https://www.irena.org/-/media/Files/IRENA/Agency/Publication/2025/Jul/IRENA_TEC_RPGC_in_2024_2025.pdf  
**Access**: Free (PDF)

**Key Data Used**:
- Solar PV LCOE: $0.044/kWh (2024) - 41% cheaper than cheapest fossil fuel
- Onshore wind LCOE: 53% lower than fossil fuel alternatives
- Historical cost trends 2010-2024

**LCOE Trends (Global Weighted Average)**:
| Technology | 2010 | 2024 | Decline |
|------------|------|------|---------|
| Solar PV | $0.417/kWh | $0.044/kWh | -89% |
| Onshore Wind | $0.111/kWh | $0.033/kWh | -70% |
| Offshore Wind | $0.197/kWh | $0.072/kWh | -63% |

**Citation**:
> IRENA (2025), Renewable power generation costs in 2024, International Renewable Energy Agency, Abu Dhabi.

**Local File**: `irena/IRENA_renewable_power_costs_2024.pdf`

---

### 4.2 IRENA Renewable Power Generation Costs (2023)

**Primary Source**: IRENA  
**Title**: "Renewable Power Generation Costs in 2023"  
**Date**: September 2024  
**URL**: https://www.irena.org/-/media/Files/IRENA/Agency/Publication/2024/Sep/IRENA_Renewable_power_generation_costs_in_2023.pdf  
**Access**: Free (PDF)

**Citation**:
> IRENA (2024), Renewable power generation costs in 2023, International Renewable Energy Agency, Abu Dhabi.

**Local File**: `irena/IRENA_renewable_power_costs_2023.pdf`

---

### 4.3 DOE Solid-State Lighting R&D Plan

**Primary Source**: U.S. Department of Energy  
**Title**: "2024 DOE SSL R&D Opportunities"  
**URL**: https://www.energy.gov/eere/ssl/solid-state-lighting  
**Access**: Free

**Key Data Used**:
- LED efficacy improvements (lumens/watt)
- LED cost per kilolumen trends
- Comparison to incandescent/CFL baselines

**Citation**:
> U.S. Department of Energy, Office of Energy Efficiency and Renewable Energy. "Solid-State Lighting Program."

**Local File**: `doe/ssl_rd_opportunities_2024.pdf`

---

### 4.4 NREL Annual Technology Baseline

**Primary Source**: National Renewable Energy Laboratory  
**Title**: "Annual Technology Baseline (ATB)"  
**URL**: https://atb.nrel.gov/  
**Access**: Free

**Key Data Used**:
- Utility-scale solar PV capital costs
- Wind turbine cost projections
- Battery storage cost trends

**Citation**:
> National Renewable Energy Laboratory. "Annual Technology Baseline." https://atb.nrel.gov/

---

## 5. Transportation Sector

### 5.1 BloombergNEF Lithium-Ion Battery Price Survey

**Primary Source**: BloombergNEF (BNEF)  
**Title**: "Lithium-Ion Battery Price Survey"  
**Date**: December 2024 (2024 data), December 2025 (2025 data)  
**Access**: ⚠️ **PAYWALLED** - Summary data publicly available

**Public Summary URLs**:
- https://about.bnef.com/insights/clean-transport/lithium-ion-battery-pack-prices-see-largest-drop-since-2017-falling-to-115-per-kilowatt-hour-bloombergnef/
- https://about.bnef.com/insights/clean-transport/lithium-ion-battery-pack-prices-fall-to-108-per-kilowatt-hour-despite-rising-metal-prices-bloombergnef/

**Key Data Used** (from public summaries):
| Year | Pack Price ($/kWh) | YoY Change |
|------|-------------------|------------|
| 2010 | ~$1,200 | — |
| 2015 | ~$400 | — |
| 2020 | ~$140 | — |
| 2023 | $139 | -14% |
| 2024 | $115 | -20% |
| 2025 | $108 | -8% |

**93% decline since 2010** (adjusted to 2025 dollars)

**Citation**:
> BloombergNEF. "Lithium-Ion Battery Price Survey." Annual reports 2010-2025.

**Note**: Full BNEF reports require subscription. Data points above are from public press releases and widely cited in secondary sources.

**Secondary Source Verification**:
- pv-magazine.com (December 2024)
- energy-storage.news (December 2024, December 2025)

---

### 5.2 DOE Transportation Energy Data Book

**Primary Source**: Oak Ridge National Laboratory / U.S. Department of Energy  
**Title**: "Transportation Energy Data Book: Edition 40"  
**URL**: https://tedb.ornl.gov/  
**Access**: Free (PDF and Excel)

**Key Data Used**:
- Historical vehicle fuel economy
- Transportation energy consumption trends
- Fleet composition data

**Citation**:
> Davis, Stacy C., and Robert G. Boundy. "Transportation Energy Data Book: Edition 40." Oak Ridge National Laboratory, ORNL/TM-2022/2384, 2022.

**Local File**: `doe/tedb_edition40.pdf`

---

### 5.3 Rideshare Company SEC Filings

**Primary Sources**:

**Uber Technologies, Inc.**
- 10-K Annual Reports (2019-2024)
- URL: https://investor.uber.com/financials/
- Access: Free (SEC EDGAR)

**Lyft, Inc.**
- 10-K Annual Reports (2019-2024)
- URL: https://investor.lyft.com/financials/
- Access: Free (SEC EDGAR)

**Key Data Used**:
- Revenue per trip trends
- Cost per mile metrics
- Driver utilization rates

**Citation**:
> Uber Technologies, Inc. Form 10-K. Various years. SEC EDGAR.
> Lyft, Inc. Form 10-K. Various years. SEC EDGAR.

---

### 5.4 EV Price Parity Analysis

**Primary Source**: Various industry analyses  
**Key Finding**: EVs reached price parity with ICE vehicles in China in 2024

**Supporting Sources**:
- BloombergNEF (cited above)
- International Energy Agency, "Global EV Outlook 2024"
- URL: https://www.iea.org/reports/global-ev-outlook-2024

**Citation**:
> International Energy Agency. "Global EV Outlook 2024." IEA, Paris, 2024.

---

## 6. Source File Inventory

### Recommended Directory Structure

```
data/sources/
├── SOURCES.md              ← This file
├── fred/
│   ├── M2SL_1990-2024.csv
│   └── CPIAUCSL_1990-2024.csv
├── irena/
│   ├── IRENA_renewable_power_costs_2024.pdf
│   └── IRENA_renewable_power_costs_2023.pdf
├── doe/
│   ├── tedb_edition40.pdf
│   └── ssl_rd_opportunities_2024.pdf
├── fcc/
│   └── internet_access_services_2023.pdf
├── academic/
│   ├── nordhaus_computing_2001.pdf
│   └── sandberg_bostrom_wbe_roadmap_2008.pdf
└── sec/
    └── (Optional: relevant 10-K excerpts)
```

### Download Links (Freely Available)

| File | Direct Download URL |
|------|---------------------|
| FRED M2SL | https://fred.stlouisfed.org/graph/fredgraph.csv?id=M2SL |
| FRED CPI | https://fred.stlouisfed.org/graph/fredgraph.csv?id=CPIAUCSL |
| IRENA Costs 2024 | https://www.irena.org/-/media/Files/IRENA/Agency/Publication/2025/Jul/IRENA_TEC_RPGC_in_2024_2025.pdf |
| IRENA Costs 2023 | https://www.irena.org/-/media/Files/IRENA/Agency/Publication/2024/Sep/IRENA_Renewable_power_generation_costs_in_2023.pdf |
| Nordhaus 2001 | https://cowles.yale.edu/sites/default/files/files/pub/d13/d1324.pdf |
| Sandberg & Bostrom 2008 | https://www.fhi.ox.ac.uk/brain-emulation-roadmap-report.pdf |
| TEDB Edition 40 | https://tedb.ornl.gov/wp-content/uploads/2022/03/TEDB_Ed_40.pdf |

---

## 7. Data Extraction Notes

### Methodology for Index Construction

1. **Base Year**: 1990 = 100 for all indices
2. **Deflation Calculation**: (End Value / Start Value - 1) × 100
3. **CAGR Calculation**: (End Value / Start Value)^(1/n) - 1
4. **Weighting**: See `docs/methodology/WEIGHT_JUSTIFICATION.md`

### Data Quality Notes

| Source | Reliability | Notes |
|--------|-------------|-------|
| FRED M2/CPI | ★★★★★ | Official government data |
| IRENA | ★★★★★ | Intergovernmental, peer-reviewed |
| AI Impacts | ★★★★☆ | Academic, well-documented methodology |
| BloombergNEF | ★★★★★ | Industry standard, but paywalled |
| DOE TEDB | ★★★★★ | Official government data |

### Known Limitations

1. **BloombergNEF**: Full historical battery data requires paid subscription. Public summaries used for key data points.

2. **Computing Costs**: Multiple methodologies exist (FLOPS, MIPS, benchmarks). We use AI Impacts synthesis which reconciles major sources.

3. **Communications**: Historical data pre-2000 is less granular. FCC reports provide best available data.

4. **Energy**: LCOE calculations depend on assumptions about capacity factors, lifetimes, and discount rates. IRENA uses standardized methodology.

### Verification Checklist

- [ ] M2 data matches FRED M2SL series
- [ ] CPI data matches FRED CPIAUCSL series  
- [ ] Solar LCOE matches IRENA 2024 report
- [ ] Battery prices match BNEF public summaries
- [ ] Computing trends consistent with AI Impacts analysis

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | Dec 2025 | Initial documentation for v3.0.2 |

---

**Document prepared for**: Deflation Index v3.0.2  
**Maintainer**: Deflation Index LLC  
**Contact**: [deflationindex.com](https://deflationindex.com)
