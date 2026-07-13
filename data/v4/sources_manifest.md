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

**Conversion note:** OWID values are inflation-adjusted; nominal anchors were derived as `adj$/TB ÷ 1000 × CPI(year)/CPI(2023)` using the repo's Jan-value CPIAUCSL series. The OWID deflator base year is assumed 2023 pending metadata confirmation — a wrong base shifts all memory anchors by a constant factor, which barely moves the geometric index (levels shift, growth rates don't).

## 2025 sector data (for the measured 2025 index point)

| Sector | Source | Status |
|---|---|---|
| Energy | IRENA, Renewable Power Generation Costs in 2025 (pub. 2026-07) — utility PV $44/MWh, ~flat vs 2024 | published |
| Communications | FCC 2026 Urban Rate Survey (pub. 2025-12-19) — 100/20 benchmark ~$96/mo, up from $85.85; convert to $/GB with usage data | published |
| Transportation | BNEF Li-ion survey (pub. 2025-12) — $108/kWh pack | published |
| Computing | Wikipedia FLOPS table Mar-2025 row + Epoch | published |
