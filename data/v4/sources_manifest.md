# v4.0 Sources Manifest — Retrieval Log

Every anchor row in the CSVs traces to an entry here. Status levels:

- **verified** — read directly from the primary document (itemized listings / publisher's own table)
- **cross_checked** — from a reputable secondary compilation whose rows cite primaries; pending primary confirmation
- **interpolated** — log-linear between adjacent anchors; no datapoint claimed
- **to_verify** — placeholder pending a real datapoint

## Computing power ($/GFLOPS, nominal)

| Source | URL | Retrieved | Used for |
|---|---|---|---|
| Wikipedia "FLOPS" cost-of-computing table (rows cite period primaries: LANL SC97, aggregate.org, pcpartpicker archives, vendor specs) | https://en.wikipedia.org/wiki/Floating_point_operations_per_second | 2026-07-13 | 1984–2025 anchors (cross_checked) |
| Nordhaus (2007), "Two Centuries of Productivity Growth in Computing" | doi:10.1017/S0022050707000058 | pending | 1990 direct datapoint (replaces interpolation) |
| Epoch AI hardware trends | https://epoch.ai/data | pending | ML-accelerator parallel series (separate metric; see note) |

**Metric note:** this series is *lowest-cost consumer/cluster FP32-peak $/GFLOPS, nominal period dollars*. Epoch's ML price-performance is a different, faster-falling metric; v4.0 uses the FP32 series for the index and may publish the ML series as a supplementary line. The v3 workbook's endpoints matched neither (1990 ~1,000× too low as a price; 2024 ~200× too low).

**Source caution (documented 2026-07-13):** AI Impacts reviewed the Wikipedia GFLOPS table and called it "dubious" — thin citations, especially pre-1997. Their independent long-run estimate (Sandberg–Bostrom on McCallum CPU data) brackets ~1990 at ~$10⁵–10⁶/GFLOPS, consistent with our interpolation. Verification path: substantiate each post-1997 row from the table's own primary refs (LANL SC97, aggregate.org, pcpartpicker archives, vendor spec sheets — several live, some need Wayback access from a regular browser).

## Storage ($/GB, nominal)

| Source | URL | Retrieved | Used for |
|---|---|---|---|
| Komorowski, "a history of storage cost" — itemized price listings (underlying: ns1758.ca winchest) | https://mkomo.com/cost-per-gigabyte | 2026-07-13 | 1990–2008 anchors (verified) |
| Backblaze, "Hard Drive Cost Per Gigabyte" (Andy Klein) — purchase averages 2009–2022 | https://www.backblaze.com/blog/hard-drive-cost-per-gigabyte/ | 2026-07-13 | 2009–2022 anchors (verified); 2025 projection (to_verify) |

**Splice note:** Komorowski = street price of a single drive; Backblaze = bulk purchase average. At the 2009 splice: street $0.075 vs bulk $0.114. v4.0 uses Backblaze from 2009 for internal consistency of the recent series; the level step is conservative (higher price). Cross-check available: OWID/McCallum "Disk" series.

## Memory ($/GB, nominal)

| Source | URL | Retrieved | Used for |
|---|---|---|---|
| Our World in Data, "Historical price of computer memory and storage" (source: McCallum, jcmit.net), CC-BY — inflation-adjusted $/TB | https://ourworldindata.org/grapher/historical-cost-of-computer-memory-and-storage (.csv) | 2026-07-13 | 1990–2023 anchors (cross_checked) |
| McCallum memory price series (nominal) | https://jcmit.net/memoryprice.htm | pending (blocks automated fetch; transcribe manually) | replaces the CPI back-conversion |
| DRAMeXchange / TrendForce | https://www.dramexchange.com/ | pending | 2024–2025 datapoints (note: 2025 DRAM prices rose on AI demand) |

**Conversion note:** OWID values are inflation-adjusted in **constant 2020 US$** (confirmed via OWID metadata endpoint, 2026-07-13; series uses a running-minimum convention). Nominal anchors derived as `adj$/TB ÷ 1000 × CPI(year)/CPI(2020)` using the repo's Jan-value CPIAUCSL series.

## Communications ($/Mbps/month, wholesale IP transit — nominal)

**Metric decision (founder, 2026-07-13):** wholesale IP transit, per the input-layer principle — the infrastructure cost of moving bits, not consumer plan prices. Series starts **1998** (first surveyed market datapoint; commercial transit did not exist as a market in 1990), same late-start convention as transportation (2010). Display conversion for site copy: $/Mbps/month ÷ ~130 GB (1 Mbps at 40% utilization for a month ≈ 324 GB × 0.40) — a constant factor that cancels out of the rebased index.

| Source | URL | Retrieved | Used for |
|---|---|---|---|
| DrPeering (W. Norton), "Internet Transit Pricing: Historical and Projected" — US market survey 1998–2010, projections 2011–2015 | http://drpeering.net/white-papers/Internet-Transit-Pricing-Historical-And-Projected.php | 2026-07-13 | 1998–2015 anchors (cross_checked; projections corroborated by TeleGeography actuals) |
| TeleGeography IP transit pricing (10GigE, competitive-market low) | https://resources.telegeography.com/ip-transit-price-erosion-significant-regional-differences-remain | 2026-07-13 | 2025 anchor (cross_checked); 2020 datapoint pending (to_verify) |

## 2025 sector data (for the measured 2025 index point)

| Sector | Source | Status |
|---|---|---|
| Energy | IRENA, Renewable Power Generation Costs in 2025 (pub. 2026-07) — utility PV $44/MWh, ~flat vs 2024 | published |
| Communications | FCC 2026 Urban Rate Survey (pub. 2025-12-19) — 100/20 benchmark ~$96/mo, up from $85.85; convert to $/GB with usage data | published |
| Transportation | BNEF Li-ion survey (pub. 2025-12) — $108/kWh pack | published |
| Computing | Wikipedia FLOPS table Mar-2025 row + Epoch | published |

## Verification standards (ratified 2026-07-13)

1. **Publisher-of-record = primary.** A survey read directly from its publisher (DrPeering's own white paper, TeleGeography's own pricing page, IRENA's own report PDF, Backblaze's own blog, Komorowski's own table) is a primary document. Secondary compilations (Wikipedia's table, OWID's redistribution) remain cross_checked until traced to their own primaries.
2. **Bounded interpolation is an acceptable terminal status** when (a) both endpoints are anchored, (b) an independent dataset brackets the interpolated value, and (c) the row is labeled `interpolated`. Applies to compute 1990 ($963k, bracketed by Sandberg–Bostrom).
3. **Basis — RESOLVED (founder decision 2026-07-13): all sectors nominal.** IRENA's single-2025-vintage series (constant 2025 USD) is converted to nominal via the repo's CPIAUCSL Jan-value series (formula in each row); IRENA's real-terms decline (−89%) is quoted alongside in site copy. BNEF requires no conversion: each annual survey reports that year's price in that year's dollars, so the per-year survey headlines already form a nominal series (BNEF's real-terms restatements are not used). Effect: energy is −84% nominal since 2010 (vs −89% real), and in nominal terms solar LCOE has risen since 2023 — reported, not smoothed.
