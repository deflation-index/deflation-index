# Glossary of Terms

**Version**: 4.0.0
**Last Updated**: July 2026

Key terms and definitions used in the Deflation Index project.

---

## A

### Abundance Gap
The cumulative difference between technological deflation, monetary expansion, and consumer price inflation. Represents productivity gains that did not reach consumers. Currently ~526 percentage points (1990–2025), on the v4.0 geometric index.

**Formula**: |DI Cumulative| + M2 Cumulative - CPI Cumulative

---

## C

### CAGR (Compound Annual Growth Rate)
The mean annual growth rate over a specified time period longer than one year. Used to express annual deflation/inflation rates.

**Formula**: CAGR = (End Value / Start Value)^(1/years) - 1

### CPI (Consumer Price Index)
The Bureau of Labor Statistics measure of average change in prices paid by urban consumers for a basket of goods and services. The Deflation Index uses CPI-U (all urban consumers).

**Source**: FRED Series CPIAUCSL

### Cumulative Deflation
The total percentage decline in the Deflation Index from the 1990 baseline to the current year. Currently -99.97% (meaning technology made things about 99.97% cheaper), on the v4.0 geometric index (1990–2025).

---

## D

### Deflation
A decrease in the general price level of goods and services. In the Deflation Index context, specifically refers to technology-driven cost reductions.

### Deflation Index (DI)
A composite index measuring the cost of technology across four sectors (Computing, Communications, Energy, Transportation) relative to a 1990 baseline of 100.

### DI-M2 Gap
The annual difference between the Deflation Index rate and M2 expansion rate. Currently 26.0 percentage points per year, on the v4.0 geometric index.

**Formula**: |DI Annual Rate| + M2 Annual Rate = |-20.37%| + 5.66% = 26.03pp

---

## F

### FRED (Federal Reserve Economic Data)
The Federal Reserve Bank of St. Louis database containing hundreds of thousands of economic data series. Primary source for M2 and CPI data.

**URL**: https://fred.stlouisfed.org

---

## G

### GFLOPS (Giga Floating-Point Operations Per Second)
A measure of computing performance. One billion floating-point operations per second. Used to measure computing cost deflation ($/GFLOPS).

---

## I

### Index Value
A number expressing the relative change from a baseline. The Deflation Index uses 1990 = 100 as the baseline, so a 2025 value of 0.034 means costs are 0.034% of their 1990 level.

---

## L

### LCOE (Levelized Cost of Energy)
The average net present cost of electricity generation over a power plant's lifetime. Used to measure solar energy cost deflation.

**Unit**: $/kWh or $/MWh

---

## M

### M2 Money Supply
A measure of the money supply that includes cash, checking deposits, and easily convertible near money. The Federal Reserve's primary measure of broad money.

**Source**: FRED Series M2SL

### Master DI
The combined Deflation Index weighted across all four sectors. The primary output of the Deflation Index project.

---

## P

### Percentage Point (pp)
A unit for the arithmetic difference between two percentages. If M2 grows 5.66% and DI declines 20.37%, the gap is 26.03 percentage points (not percent).

---

## Q

### Quality Adjustment
Modifications to raw price data to account for improvements in product quality over time. For example, a computer that costs the same but is twice as fast represents a 50% quality-adjusted price decline.

---

## S

### Sector Index
The deflation index for a single sector (Computing, Communications, Energy, or Transportation) before weighting is applied.

### Sector Weight
The percentage contribution of each sector to the Master DI. Based on multi-factor analysis including GDP contribution, enabling effect (how much other sectors depend on this technology), and deflationary force (magnitude of cost reductions).

| Sector | Weight |
|--------|--------|
| Computing | 29.41% |
| Communications | 23.53% |
| Energy | 29.41% |
| Transportation | 17.65% |

---

## T

### Tier 1 Source
The highest quality data sources used in the Deflation Index. Includes government agencies (FRED, BLS, DOE), international organizations (IRENA), and established industry sources (BloombergNEF).

---

## W

### Wright's Law
The observation that costs decline by a constant percentage with each doubling of cumulative production. Typically 20-30% cost reduction per doubling. Validated across solar, batteries, and other technologies.

**Formula**: C(x) = C₀ × x^(-b)

Where b is the learning rate parameter.

---

## Y

### YoY (Year-over-Year)
The change from one year to the same period in the previous year. Used to express annual growth or decline rates.

---

## Symbols

### $ (Dollar)
All monetary values are in nominal US dollars unless otherwise specified.

### % (Percent)
Relative change expressed as parts per hundred.

### pp (Percentage Points)
Arithmetic difference between two percentages.

---

## Data Source References

| Abbreviation | Full Name | URL |
|--------------|-----------|-----|
| FRED | Federal Reserve Economic Data | fred.stlouisfed.org |
| BLS | Bureau of Labor Statistics | bls.gov |
| IRENA | International Renewable Energy Agency | irena.org |
| BNEF | BloombergNEF | about.bnef.com |
| DOE | Department of Energy | energy.gov |
| FCC | Federal Communications Commission | fcc.gov |
| IEA | International Energy Agency | iea.org |
| NREL | National Renewable Energy Laboratory | nrel.gov |

---

## See Also

- [MASTER_METHODOLOGY.md](../methodology/MASTER_METHODOLOGY.md) - Complete methodology
- [DATA_STANDARDS.md](../methodology/DATA_STANDARDS.md) - Data quality standards
- [constants.json](../../data/constants.json) - Authoritative statistics
