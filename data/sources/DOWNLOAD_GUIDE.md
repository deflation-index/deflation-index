# Source Download Guide

**Purpose**: Step-by-step instructions to download all source documents for the Deflation Index.

---

## Quick Download Links

### 1. FRED Economic Data (CSV - Direct Download)

Right-click and "Save Link As" or paste into browser:

| Series | Download URL |
|--------|--------------|
| **M2 Money Supply** | https://fred.stlouisfed.org/graph/fredgraph.csv?id=M2SL&cosd=1990-01-01&coed=2024-12-31 |
| **CPI All Items** | https://fred.stlouisfed.org/graph/fredgraph.csv?id=CPIAUCSL&cosd=1990-01-01&coed=2024-12-31 |

**Alternative**: Use FRED's Excel Add-in or API for automated updates.

---

### 2. IRENA Reports (PDF - Direct Download)

| Report | Download URL |
|--------|--------------|
| **Renewable Power Costs 2024** | https://www.irena.org/-/media/Files/IRENA/Agency/Publication/2025/Jul/IRENA_TEC_RPGC_in_2024_2025.pdf |
| **Renewable Power Costs 2023** | https://www.irena.org/-/media/Files/IRENA/Agency/Publication/2024/Sep/IRENA_Renewable_power_generation_costs_in_2023.pdf |
| **Executive Summary 2023** | https://www.irena.org/-/media/Files/IRENA/Agency/Publication/2024/Sep/IRENA_Renewable_power_generation_costs_in_2023_executive_summary.pdf |

---

### 3. Academic Papers (PDF - Direct Download)

| Paper | Download URL |
|-------|--------------|
| **Nordhaus (2001) - Progress of Computing** | https://cowles.yale.edu/sites/default/files/files/pub/d13/d1324.pdf |
| **Sandberg & Bostrom (2008) - WBE Roadmap** | https://www.fhi.ox.ac.uk/brain-emulation-roadmap-report.pdf |

---

### 4. DOE / ORNL Reports (PDF)

| Report | Access URL |
|--------|------------|
| **Transportation Energy Data Book Ed. 40** | https://tedb.ornl.gov/ → Click "Download PDF" |
| **SSL R&D Plan** | https://www.energy.gov/eere/ssl/solid-state-lighting → Publications section |
| **NREL ATB** | https://atb.nrel.gov/ → Download data tables |

---

### 5. FCC Reports (PDF)

| Report | Access URL |
|--------|------------|
| **Internet Access Services Report** | https://www.fcc.gov/internet-access-services-reports |

Select the most recent report and download PDF.

---

### 6. AI Impacts (Web Archive)

These are web pages, not PDFs. For archival purposes, save as HTML or use Wayback Machine:

| Page | URL |
|------|-----|
| **Computing Cost Trends** | https://aiimpacts.org/trends-in-the-cost-of-computing/ |
| **2017 Cost Trends** | https://aiimpacts.org/recent-trend-in-the-cost-of-computing/ |
| **GPU Price Trends (Epoch AI)** | https://epoch.ai/blog/trends-in-gpu-price-performance |

---

### 7. BloombergNEF Battery Data (Paywalled - Public Summaries)

Full reports require subscription. Use these public summary links for citation:

| Report | Public Summary URL |
|--------|-------------------|
| **2024 Battery Price Survey** | https://about.bnef.com/insights/clean-transport/lithium-ion-battery-pack-prices-see-largest-drop-since-2017-falling-to-115-per-kilowatt-hour-bloombergnef/ |
| **2025 Battery Price Survey** | https://about.bnef.com/insights/clean-transport/lithium-ion-battery-pack-prices-fall-to-108-per-kilowatt-hour-despite-rising-metal-prices-bloombergnef/ |

**Secondary verification sources** (free):
- https://www.pv-magazine.com/2024/12/11/bnef-lithium-ion-battery-pack-prices-drop-to-record-low-of-115-kwh/
- https://www.energy-storage.news/lithium-ion-battery-pack-prices-fall-20-in-2024-amidst-fight-for-market-share/

---

## Folder Setup Instructions

1. Create folder structure:
```
data/sources/
├── fred/
├── irena/
├── doe/
├── fcc/
├── academic/
└── sec/
```

2. Download files to appropriate folders:
   - FRED CSVs → `fred/`
   - IRENA PDFs → `irena/`
   - Nordhaus, Sandberg → `academic/`
   - TEDB, SSL → `doe/`
   - FCC reports → `fcc/`

3. Verify file names match SOURCES.md inventory

---

## Verification Checklist

After downloading, verify these key data points:

### M2 Money Supply
- [ ] 1990 value: ~$3,276.8 billion
- [ ] 2024 value: ~$21,300 billion
- [ ] Cumulative growth: ~550%

### Solar PV (IRENA)
- [ ] 2010 LCOE: ~$0.417/kWh
- [ ] 2024 LCOE: ~$0.044/kWh
- [ ] Decline: ~89%

### Battery Prices (BNEF summaries)
- [ ] 2010: ~$1,200/kWh
- [ ] 2024: $115/kWh
- [ ] Decline: ~90%

### Computing (AI Impacts)
- [ ] FLOPS/$ factor of 10 improvement: every ~4 years (recent)
- [ ] Long-run (1940s-present): every ~7.7 years

---

## Notes

1. **FRED data** can also be accessed via the FRED API for automated updates
2. **IRENA** publishes new cost reports annually (typically Q3)
3. **BloombergNEF** battery survey released annually in December
4. **DOE TEDB** Edition 41 delayed; Edition 40 is current as of Dec 2025

---

**Document Version**: 1.0  
**Last Updated**: December 2025
