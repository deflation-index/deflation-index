# Excel Templates Guide
## The Deflation Index - Data Entry & Maintenance

**Created**: December 15, 2025  
**Updated**: January 2026  
**Version**: 1.2  
**Purpose**: Complete guide for using the Deflation Index Excel templates

---

## 📦 WHAT YOU HAVE

### **Six Excel Files Ready to Use:**

**Sector Files (4):**
1. **computing_deflation_index_v1.0.xlsx** - Computing sector (with sample 2020-2024 data)
2. **communications_deflation_index_v1.0.xlsx** - Communications sector (template)
3. **energy_deflation_index_v1.0.xlsx** - Energy sector (template)
4. **transportation_deflation_index_v1.0.xlsx** - Transportation sector (template)

**Master Files (2 methodologies):**
5. **master_deflation_index_v3.0.2.xlsx** - Master index (primary multi-factor weights)
6. **master_deflation_index_v3.0.1_EQUAL.xlsx** - Equal-weighted baseline (25% each)

### **Each Sector File Contains 7 Worksheets:**

1. **Master_Data** - The authoritative data sheet (where you enter data)
2. **Sector_Index** - Calculated indices and deflation rates
3. **Sources** - Complete bibliography of data sources
4. **Methodology** - Summary of calculation approach
5. **Changelog** - Version history and changes
6. **Assumptions** - Documented judgement calls
7. **QA_Checks** - Quality assurance logs

---

## 🎯 QUICK START: Your First Data Entry

### **Step 1: Open Computing Template** (has sample data to learn from)

1. Download `computing_deflation_index_v1.0.xlsx`
2. Open in Excel or LibreOffice Calc
3. Go to **Master_Data** worksheet
4. Scroll to rows 36-40 (years 2020-2024) to see sample data

### **Step 2: Understand the Color System** (CRITICAL!)

**Blue Text** = Hardcoded data from external sources
- Raw cost data (columns B, C, D)
- CPI index values (column E)
- Quality metrics (columns I, J, K)
- Sources and notes

**Black Text** = Calculated formulas
- Real (inflation-adjusted) costs (columns F, G, H)
- Quality-adjusted costs (columns L, M, N)
- All derived metrics

**Yellow Background** = Estimated/interpolated data
- Pre-2000 reconstructed data
- Gaps where direct measurement unavailable

**Green Text** = Cross-sheet references (formulas pulling from other sheets)

### **Step 3: Enter Your First Data Point**

Let's enter 2019 data (row 35) as an example:

**A. Find Your Source**
- Go to AI Impacts website (aiimpacts.org/trends-in-the-cost-of-computing/)
- Find 2019 computing power cost: ~$0.0012/GFLOPS

**B. Enter Data in Excel**
1. Click cell B35 (Computing_Power_Raw_USD_GFLOPS)
2. Type: `0.0012`
3. Format: Blue text, currency format `$#,##0.0000`
4. Right-click → Insert Comment

**C. Add Source Citation in Comment**
```
Source: AI Impacts - Trends in Cost of Computing
Date: 2019-Q4
Benchmark: PassMark RTX 2080 Ti, 78 GFLOPS @ $1,199
Calculation: $1,199 / 78 GFLOPS = $15.37/GFLOPS → normalized
URL: https://aiimpacts.org/trends-in-the-cost-of-computing/
Cross-check: PassMark CPU Benchmark (ID: 3384) ✓
Accessed: 2025-12-15
Quality: A (Excellent)
```

**D. Let Formulas Calculate**
- Columns F, G, H will auto-calculate (inflation-adjusted)
- Columns L, M, N will auto-calculate (quality-adjusted)
- DO NOT type values in formula columns - they calculate automatically!

**E. Add Cross-Validation**
- Column P: Enter secondary source that confirms your data
- Example: "Validated against Top500.org 2019 cost/GFLOPS ✓"

**F. Add Quality Flag**
- Column R: Enter `A` (Excellent), `B` (Good), `C` (Estimated), or `D` (Needs Review)

---

## 📋 COMPLETE DATA ENTRY WORKFLOW

### **Phase 1: Source Evaluation** (Before Entering Any Data)

1. Open **Research_Dashboard.md**
2. Evaluate source using 0-100 rubric
3. Only proceed if score ≥70 (Tier 2 or better)
4. Add approved source to **Sources** worksheet

### **Phase 2: Data Collection**

1. Download source document (save to `/data/sources` folder in your repo)
2. Create entry in **Sources** worksheet:
   - Source_ID: `AI_IMPACTS_2019`
   - Source_Name: `AI Impacts`
   - Document_Title: `Trends in Cost of Computing`
   - Publication_Date: `2019-Q4`
   - URL: `https://aiimpacts.org/...`
   - Access_Date: `2025-12-15`
   - Reliability_Score: `95`

### **Phase 3: Data Entry**

**For each year (1990-2024):**

1. **Enter Raw Data** (Blue text)
   - Computing Power ($/GFLOPS)
   - Storage ($/GB)
   - Memory ($/GB)
   - CPI Index (from FRED)

2. **Enter Quality Metrics** (Blue text)
   - Performance per watt
   - Transfer speed
   - Bandwidth

3. **Add Comments** (Every blue cell)
   - Full source citation
   - Cross-check source
   - Access date

4. **Verify Formulas Calculate** (Black text)
   - Real costs auto-calculate
   - Quality-adjusted costs auto-calculate
   - Do NOT manually enter values in formula columns

5. **Document Special Cases**
   - Interpolated data: Yellow background + note in column Q
   - Technology transitions: Explain in Notes column
   - Outliers: Flag and explain

### **Phase 4: Quality Checks**

**After entering each year:**
- [ ] Blue text only in hardcoded columns
- [ ] Black text only in formula columns
- [ ] Cell comment added to all blue cells
- [ ] Cross-validation documented
- [ ] Quality flag assigned
- [ ] Notes column filled for anything unusual

**After completing 5+ years:**
- [ ] Run outlier detection (values >3 std dev)
- [ ] Check for unexplained jumps (>50% YoY)
- [ ] Verify technology transitions documented
- [ ] Ensure no gaps >2 consecutive years

### **Phase 5: Validation with recalc.py**

**CRITICAL: Run this after EVERY Excel editing session**

```bash
cd /mnt/skills/public/xlsx
python3 recalc.py /path/to/computing_deflation_index_v1.0.xlsx
```

**Expected Output:**
```json
{
  "status": "success",
  "total_errors": 0,
  "error_summary": {},
  "total_formulas": 245
}
```

**If you see errors:**
```json
{
  "status": "errors_found",
  "total_errors": 2,
  "error_summary": {
    "#REF!": {"count": 1, "locations": ["Master_Data!B15"]},
    "#DIV/0!": {"count": 1, "locations": ["Master_Data!F20"]}
  }
}
```

**Fix immediately:**
- #REF! = Invalid cell reference (you deleted a row/column)
- #DIV/0! = Division by zero (denominator is empty or zero)
- See DATA_STANDARDS.md Section 8.1 for all error types

**DO NOT proceed until status = "success" and total_errors = 0**

### **Phase 6: Update Supporting Sheets**

**Sources Worksheet:**
- Add new sources as you use them
- Keep bibliographic information complete
- Include contact information where available

**Changelog Worksheet:**
- Document every data addition/change
- Format: Date | Version | Changes | Impact | Author
- Increment version (minor for data, major for methodology)

**Assumptions Worksheet:**
- Document any interpolation methods
- Explain any estimation approaches
- Note sensitivity to assumptions

**QA_Checks Worksheet:**
- Update "Last recalc.py run" date
- Log any cross-validation results
- Flag any outliers found and resolution

---

## 🔄 SECTOR_INDEX CALCULATIONS

Once Master_Data is complete (1990-2024), the Sector_Index sheet calculates:

### **Component Indices** (Computing example)

Starting from 1990 baseline = 100.0:

```
Computing_Index[1991] = Computing_Index[1990] × (QA_Cost[1991] / QA_Cost[1990])
```

This compounds each year, creating cumulative index.

**Example:**
- 1990: Index = 100.0
- 2000: Index = ~15.0 (85% deflation)
- 2010: Index = ~2.0 (98% deflation)
- 2024: Index = ~0.15 (99.85% deflation)

### **Weighted Sector Index**

```
Sector_Index[year] = 
  (Computing_Index × 0.60) +
  (Storage_Index × 0.30) +
  (Memory_Index × 0.10)
```

Component weights are sector-specific and documented in each methodology file.

---

## 🔗 INTEGRATION WITH MASTER INDEX

Once all four sector files are complete (1990-2024):

### **Step 1: Open master_deflation_index_v3.0.2.xlsx**

### **Step 2: Link Sector Indices**

In Master_Index sheet, link to each sector file:

**Cell B8** (Computing Index 1990):
```
='[computing_deflation_index_v1.0.xlsx]Sector_Index'!$E$11
```

**Cell C8** (Communications Index 1990):
```
='[communications_deflation_index_v1.0.xlsx]Sector_Index'!$E$11
```

Repeat for Energy and Transportation.

### **Step 3: Verify Weights**

In Sector_Weights sheet, verify (v3.0.3 weights):
- Computing: 29.41%
- Communications: 23.53%
- Energy: 29.41%
- Transportation: 17.65%
- **TOTAL = 100.00%**

Note: These weights are referenced by formulas throughout the Master_Index sheet. Changing them will automatically update all calculations.

### **Step 4: Add M2 and CPI Data**

**M2 Growth:**
- Source: Federal Reserve H.6 Statistical Release
- URL: https://fred.stlouisfed.org/series/M2SL
- Enter in column H (Master_Index sheet)

**CPI Inflation:**
- Source: BLS CPI-U
- URL: https://fred.stlouisfed.org/series/CPIAUCSL
- Calculate YoY % change
- Enter in column I (Master_Index sheet)

### **Step 5: Verify Gap Calculations**

Columns J, K, L auto-calculate:
- Tech vs. Monetary Gap
- Tech vs. CPI Gap
- Capture Rate

These reveal where technological gains flow.

---

## 📆 MAINTENANCE SCHEDULE

### **Daily** (during active data entry)
- [ ] Run recalc.py after every Excel session
- [ ] Save incremental backups
- [ ] Document in Changelog

### **Weekly** (during active development)
- [ ] Spot-check 5-10 random source citations
- [ ] Verify 3-5 random calculations manually
- [ ] Review Notes column for unresolved flags

### **Monthly**
- [ ] Run outlier detection across all years
- [ ] Check all sources still accessible (URLs work)
- [ ] Update QA_Checks worksheet
- [ ] Commit to Git with descriptive message

### **Quarterly**
- [ ] Compare DI findings to recent academic papers
- [ ] Check if sources have issued corrections
- [ ] Search for alternative validation sources
- [ ] Update Research Dashboard

### **Annually** (Q1 following calendar year)
- [ ] Add new year's data (by March 31)
- [ ] Update CPI to latest baseline
- [ ] Recalculate entire index
- [ ] External review (optional but recommended)
- [ ] Increment version number
- [ ] Archive previous version
- [ ] Update website

---

## 🆘 TROUBLESHOOTING

### **Problem: recalc.py shows formula errors**

**Solution:**
1. Note the cell location (e.g., "Master_Data!B15")
2. Open Excel, go to that cell
3. Check if formula references valid cells
4. Common fixes:
   - #REF!: Restore deleted row/column
   - #DIV/0!: Check denominator not zero/empty
   - #VALUE!: Check data types match
5. Save and re-run recalc.py

### **Problem: Can't find source document**

**Solution:**
1. Check `/data/sources` folder
2. Check URL in Sources worksheet
3. Use Internet Archive (web.archive.org) for old pages
4. Document in Notes: "Original source unavailable, used archived version"
5. Find alternative source if archive also unavailable

### **Problem: Data sources conflict (>20% difference)**

**Solution:**
1. Investigate both sources thoroughly
2. Check if different methodologies
3. Check if different time periods (Q3 vs. Q4)
4. Check if different market segments (enterprise vs. consumer)
5. Use conservative (higher cost) estimate
6. Document discrepancy in Notes column
7. Add to Assumptions sheet: "Chose Source A over Source B because..."

### **Problem: Missing data for a year**

**Solution:**
1. Search for proxy data (related metric)
2. If gap is 1-2 years: Linear or exponential interpolation
3. Document method in Notes: "Interpolated using [method]"
4. Yellow background to flag as estimate
5. Add to Assumptions sheet with justification
6. Update when/if real data becomes available

### **Problem: Technology transition (DDR3 → DDR4)**

**Solution:**
1. Document transition year in Notes
2. Normalize for bandwidth/speed differences
3. Example: "2014 transition DDR3→DDR4. Normalized for 1.5x bandwidth increase"
4. Add to Assumptions sheet: "DDR4 1.5x faster than DDR3, adjusted pricing accordingly"
5. Quality metric captures the improvement

---

## 📚 ADDITIONAL RESOURCES

**Essential Documents:**
- `MASTER_METHODOLOGY.md` - Cross-sector framework
- `DATA_STANDARDS.md` - Quality protocols
- `RESEARCH_DASHBOARD.md` - Source evaluation
- `COMPUTING.md`, `COMMUNICATIONS.md`, `ENERGY.md`, `TRANSPORTATION.md` - Sector-specific details

**Key Skills:**
- `/mnt/skills/public/xlsx/SKILL.md` - Excel best practices
- `recalc.py` script - Formula error detection

**Data Sources:**
- See Sources worksheet in each Excel file
- See Section 7 (Appendix) in each methodology document

---

## ✅ FINAL CHECKLIST (Before Publishing)

### **Data Quality**
- [ ] All years 1990-2024 have data (or documented gaps)
- [ ] Every blue cell has source comment
- [ ] Every source in Sources worksheet
- [ ] recalc.py returns zero errors
- [ ] No unexplained outliers (>3 std dev)

### **Documentation**
- [ ] Changelog updated with all changes
- [ ] Assumptions worksheet complete
- [ ] QA_Checks worksheet updated
- [ ] Version number incremented
- [ ] Git commit with descriptive message

### **Verification**
- [ ] Spot-checked 10%+ of calculations manually
- [ ] Cross-validated with 2+ secondary sources
- [ ] Compared results to known benchmarks
- [ ] External review completed (if available)

### **Formatting**
- [ ] Blue text only in hardcoded columns
- [ ] Black text only in formula columns
- [ ] Yellow background only on estimates
- [ ] All numbers properly formatted

---

**You now have everything needed to build the highest-quality economic index of technological deflation!**

**Remember:** "Garbage in, garbage out" — pristine data collection is non-negotiable. Take the time to do it right, and The Deflation Index will become the authoritative reference for measuring technological progress.
