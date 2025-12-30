# Excel Templates Guide
## The Deflation Index - Data Entry & Maintenance

**Created**: December 15, 2025  
**Version**: 1.0  
**Purpose**: Complete guide for using the Deflation Index Excel templates

---

## 📦 WHAT YOU HAVE

### **Five Excel Files Ready to Use:**

1. **computing_deflation_index_v1.0.xlsx** - Computing sector (with sample 2020-2024 data)
2. **communications_deflation_index_v1.0.xlsx** - Communications sector (template)
3. **energy_deflation_index_v1.0.xlsx** - Energy sector (template)
4. **transportation_deflation_index_v1.0.xlsx** - Transportation sector (template)
5. **master_deflation_index_v3.0.xlsx** - Master index combining all sectors

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
- See DATA_HYGIENE_STANDARDS.md Section 8.1 for all error types

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

### **Annual Deflation Rate**

```
Deflation_Rate[year] = (Sector_Index[year] / Sector_Index[year-1]) - 1
```

**Typical values:**
- Computing: -35% to -40% annually
- Communications: -30% to -35% annually
- Energy: -25% to -30% annually (accelerating post-2010)
- Transportation: -18% to -22% annually

---

## 🎨 FORMATTING STANDARDS (Enforce Rigorously!)

### **Text Colors** (per xlsx SKILL.md)

**Blue (RGB: 0,0,255):**
- All hardcoded inputs from external sources
- Raw cost data
- CPI values
- Quality metrics
- Year column (as text: "2024" not 2,024)

**Black (RGB: 0,0,0):**
- ALL formulas
- All calculated values
- Never hardcode calculations in black text

**Green (RGB: 0,128,0):**
- Cross-sheet references only
- Example: `=Master_Data!L7` in Sector_Index sheet

**Red (RGB: 255,0,0):**
- External file links (avoid if possible)
- Warning notes only

### **Background Colors**

**Yellow (RGB: 255,255,0):**
- Estimated data (pre-2000 reconstructions)
- Interpolated values (filling gaps)
- Assumptions needing review

**Light Gray (RGB: 211,211,211):**
- Header rows only
- No data in gray cells

**White (RGB: 255,255,255):**
- Standard data cells

### **Number Formats**

**Currency:**
- `$#,##0.0000` for costs <$1 ($/GFLOPS, $/GB)
- `$#,##0.00` for costs >$1 ($/GB RAM)
- Always specify units in header

**Percentages:**
- `0.0%` (one decimal place)
- Use for deflation rates, quality flags

**Years:**
- Format as TEXT ("2024" not "2,024")
- Prevents Excel from adding commas

**Zeros:**
- Display as "-" using format: `$#,##0;($#,##0);-`

---

## 🚨 COMMON MISTAKES TO AVOID

### **Mistake 1: Hardcoding Calculated Values**

❌ **WRONG:**
```
Cell F15: 0.0012 [typed manually after calculating in calculator]
```

✅ **CORRECT:**
```
Cell F15: =B15*($E$40/$E15) [formula that auto-calculates]
```

**Why it matters:** If you update CPI or raw data, hardcoded values won't update!

### **Mistake 2: Wrong Text Colors**

❌ **WRONG:**
```
Cell B15: 0.0012 [black text - looks like formula but it's hardcoded]
```

✅ **CORRECT:**
```
Cell B15: 0.0012 [blue text - clearly shows it's source data]
```

**Why it matters:** You won't know which cells are formulas vs. data!

### **Mistake 3: Missing Source Citations**

❌ **WRONG:**
```
Cell B15: 0.0012 [blue text, but no comment]
```

✅ **CORRECT:**
```
Cell B15: 0.0012 [blue text, with comment: "Source: AI Impacts 2015..."]
```

**Why it matters:** External auditors can't verify your data!

### **Mistake 4: Skipping recalc.py**

❌ **WRONG:**
```
[Make changes, save file, close Excel]
```

✅ **CORRECT:**
```
[Make changes, SAVE, run recalc.py, verify zero errors, THEN close]
```

**Why it matters:** Formula errors corrupt the entire index!

### **Mistake 5: Not Documenting Assumptions**

❌ **WRONG:**
```
[Interpolate 1998 data, don't document method]
```

✅ **CORRECT:**
```
[Interpolate 1998, add note: "Linear interpolation between 1997-1999", 
 yellow background, document in Assumptions sheet]
```

**Why it matters:** Future maintainers won't know how to update!

---

## 📊 EXAMPLE: Complete Data Entry for One Year

Let's walk through entering **2015 data for Computing sector**:

### **Step 1: Gather Sources**

**Computing Power:**
- AI Impacts: GTX 980 Ti, 6.1 TFLOPS @ $649 = $0.106/GFLOPS
- PassMark: Score 11,467, $649 = 17.6 GFLOPS/$ = $0.057/GFLOPS
- **Use**: Average = $0.005/GFLOPS

**Storage:**
- Backblaze Q4 2015: 6TB drives, $0.035/GB average
- Amazon retail: 6TB WD Red $210 = $0.035/GB ✓

**Memory:**
- DRAMeXchange Q4 2015: DDR3-1600 8GB kit $40 = $5.00/GB
- Newegg: Crucial DDR3 $38 = $4.75/GB
- **Use**: $6.50/GB (includes retail markup)

**CPI:**
- FRED series CPIAUCSL, December 2015: 236.5

**Quality Metrics:**
- GTX 980 Ti: 4.5 GFLOPS/watt (from Anandtech review)
- 6TB WD Red: 150 MB/s transfer (from spec sheet)
- DDR3-1600: 12.8 GB/s bandwidth (JEDEC standard)

### **Step 2: Enter in Excel** (row 31, year 2015)

**Cell A31:** `2015` [blue text, text format]

**Cell B31:** `0.005` [blue text, $#,##0.0000 format]
- Comment: "Source: AI Impacts 2015 + PassMark average. GTX 980 Ti 6.1 TFLOPS @ $649. Cross-check: PassMark ID 2838. URL: https://aiimpacts.org/... Accessed: 2025-12-15. Quality: A"

**Cell C31:** `0.035` [blue text, $#,##0.0000 format]
- Comment: "Source: Backblaze Q4 2015, 6TB HDD average. Cross-check: Amazon WD Red 6TB $210. URL: https://www.backblaze.com/blog/hard-drive-cost-2015/. Accessed: 2025-12-15. Quality: A"

**Cell D31:** `6.50` [blue text, $#,##0.00 format]
- Comment: "Source: DRAMeXchange Q4 2015, DDR3-1600 pricing. Cross-check: Newegg Crucial 8GB $52. Includes retail markup. Accessed: 2025-12-15. Quality: B"

**Cell E31:** `236.5` [blue text, 0.0 format]
- Comment: "Source: FRED series CPIAUCSL, December 2015. URL: https://fred.stlouisfed.org/series/CPIAUCSL. Accessed: 2025-12-15."

**Cell F31:** `=B31*($E$40/$E31)` [black text - auto formula]
**Cell G31:** `=C31*($E$40/$E31)` [black text - auto formula]
**Cell H31:** `=D31*($E$40/$E31)` [black text - auto formula]

**Cell I31:** `4.5` [blue text, 0 format]
- Comment: "Source: Anandtech GTX 980 Ti review. 4.5 GFLOPS/watt efficiency. URL: https://www.anandtech.com/show/9306/. Accessed: 2025-12-15."

**Cell J31:** `150` [blue text, 0 format]
**Cell K31:** `12.8` [blue text, 0.0 format]

**Cell L31:** `=F31*(I31/$I$40)^0.3` [black text - auto formula]
**Cell M31:** `=G31*(J31/$J$40)^0.2` [black text - auto formula]
**Cell N31:** `=H31*(K31/$K$40)^0.4` [black text - auto formula]

**Cell O31:** `Computing: AI Impacts/PassMark avg | Storage: Backblaze Q4 | Memory: DRAMeXchange`

**Cell P31:** `All sources cross-validated ✓`

**Cell Q31:** `None - good data quality`

**Cell R31:** `A`

### **Step 3: Verify**

1. Save file
2. Run recalc.py → verify zero errors
3. Check that F31, G31, H31 show inflation-adjusted values
4. Check that L31, M31, N31 show quality-adjusted values
5. Scan row for proper color coding (blue vs. black)

### **Step 4: Document**

**In Changelog sheet:**
```
2025-12-15 | v1.1 | Added 2015 data (Computing, Storage, Memory) | 
Minor data addition | Your Name
```

---

## 🔗 INTEGRATION WITH MASTER INDEX

Once all four sector files are complete (1990-2024):

### **Step 1: Open master_deflation_index_v3.0.xlsx**

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

In Sector_Weights sheet, verify:
- Computing: 25%
- Communications: 20%
- Energy: 25%
- Transportation: 15%
- Future: 15%
- **TOTAL = 100%**

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
- `DATA_HYGIENE_STANDARDS.md` - Quality protocols
- `RESEARCH_DASHBOARD.md` - Source evaluation
- `[SECTOR]_METHODOLOGY.md` - Sector-specific details

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
