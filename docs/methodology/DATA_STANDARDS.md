# Data Hygiene Standards & Protocols
## The Deflation Index - Data Management Framework

**Version**: 1.0  
**Last Updated**: December 15, 2025  
**Purpose**: Establish "gold standard" data hygiene practices for The Deflation Index  
**Principle**: "Garbage In, Garbage Out" — Pristine data collection is non-negotiable

---

## TABLE OF CONTENTS

1. [Philosophy: Why Data Hygiene Matters](#1-philosophy-why-data-hygiene-matters)
2. [Excel File Standards](#2-excel-file-standards)
3. [Source Documentation Protocol](#3-source-documentation-protocol)
4. [Data Entry & Validation](#4-data-entry--validation)
5. [Formula Construction Rules](#5-formula-construction-rules)
6. [Version Control & Archival](#6-version-control--archival)
7. [Quality Assurance Checks](#7-quality-assurance-checks)
8. [Error Prevention & Detection](#8-error-prevention--detection)
9. [Data Update Procedures](#9-data-update-procedures)
10. [Long-Term Maintenance](#10-long-term-maintenance)

---

## 1. PHILOSOPHY: WHY DATA HYGIENE MATTERS

### 1.1 The Stakes

**The Deflation Index will succeed or fail based on data quality.**

If DI becomes a trusted reference (like CPI, M2, or GDP), it will be because:
- Every data point is sourced and verifiable
- Every calculation is reproducible
- Every assumption is documented and justified
- Every change is tracked and explained

### 1.2 Core Principles

**TRANSPARENCY FIRST**: 
- If we can't explain it, we don't publish it
- All methodology is public and replicable
- External researchers should be able to reproduce our results within ±0.5%

**CONSERVATISM**: 
- When uncertain, use conservative (lower deflation) estimates
- Never cherry-pick data to support narrative
- Document all judgment calls

**CONSISTENCY**: 
- Same methodology across all sectors and all years
- If methodology improves, recalculate entire history
- Document any deviations with clear justification

**AUDITABILITY**: 
- Every cell tells a story (source or formula)
- Every decision is documented
- Every version is archived

### 1.3 Target Audience

These standards are written for:
1. **Current maintainers** (ensuring consistency)
2. **Future maintainers** (knowledge transfer)
3. **External auditors** (verification)
4. **Academic researchers** (replication)
5. **Data journalists** (understanding methodology)

**Test**: Could a competent data analyst, given only our documentation, rebuild the entire DI from original sources?
**Answer must be**: YES

---

## 2. EXCEL FILE STANDARDS

### 2.1 File Naming Convention

**Format**: `{sector}_deflation_index_v{major}.{minor}.xlsx`

**Examples**:
- `computing_deflation_index_v2.3.xlsx`
- `transportation_deflation_index_v1.0.xlsx`
- `master_deflation_index_v3.5.xlsx`

**Version Numbering**:
- Major version (x.0): Methodology change, new component added, weighting change
- Minor version (0.x): Data update only, no methodology change

**Date Convention**: 
- Do NOT include dates in filename (use version numbers)
- Include "Last Updated" in file metadata and first worksheet

### 2.2 Required Worksheets (Every Sector File)

**1. Master_Data** (THE authoritative data sheet)
- All raw data with sources
- All quality-adjusted data
- All intermediate calculations
- Minimum columns: Year, Raw_Data, Source, Real_Data, Quality_Metric, QA_Data, Notes

**2. Sector_Index** (Final calculations)
- Component indices (1990=100 baseline)
- Component weights
- Weighted sector index
- Annual deflation rates

**3. Sources** (Complete bibliography)
- Source name, URL, access date, citation
- Contact information (if available)
- Data availability notes
- Alternative sources considered

**4. Methodology** (Calculation documentation)
- Formulas explained in plain language
- Quality adjustment methodology
- Weighting rationale
- Any deviations from Master Methodology document

**5. Changelog** (Version history)
- Date, version, changes made, impact on index
- Who made the change
- Why the change was necessary

**6. Assumptions** (Explicit documentation)
- All interpolation methods
- All estimation approaches
- All judgement calls
- Sensitivity of results to assumptions

**7. QA_Checks** (Quality assurance)
- Formula error log (from recalc.py)
- Data outlier flags
- Cross-validation results
- Manual review checklist

### 2.3 Excel Formatting Standards

**COLOR CODING** (MANDATORY - per xlsx SKILL.md):

**Text Colors**:
- **Blue (RGB: 0,0,255)**: Hardcoded source data (all numbers from external sources)
- **Black (RGB: 0,0,0)**: ALL formulas and calculated values
- **Green (RGB: 0,128,0)**: Links to other worksheets within same file
- **Red (RGB: 255,0,0)**: External links to other Excel files (avoid if possible)

**Background Colors**:
- **Yellow (RGB: 255,255,0)**: Assumptions needing attention, estimated values, interpolated data
- **Light gray (RGB: 211,211,211)**: Header rows
- **White (RGB: 255,255,255)**: Standard data cells

**Number Formatting**:
- **Currency**: $#,##0 (no cents unless necessary)
  - Specify units in header: "Battery Cost ($/kWh)" not just "Battery Cost"
- **Percentages**: 0.0% (one decimal place)
- **Years**: Format as TEXT (e.g., "2024" not "2,024")
- **Zeros**: Display as "-" using format: `$#,##0;($#,##0);-`
- **Negatives**: Use parentheses (100) not minus -100

**Example Formatting**:
```
Year | Battery_Cost_per_kWh | Annual_Deflation_Rate | Notes
2024 | $139 [BLUE] | -6.7% [BLACK] | BNEF Report 2024
2023 | $149 [BLUE] | -13.3% [BLACK] | BNEF Report 2023
2022 | =C5*(1+D5) [BLACK] | -2.3% [BLACK] | [YELLOW BG] Interpolated
```

### 2.4 Cell Comment Standards

**EVERY hardcoded data cell MUST have a comment** with full source citation:

**Template**:
```
Source: [Organization/Author]
Document: [Report/Paper Title]
Date: [Publication Date]
Page/Table: [Specific Location]
URL: [Link]
Cross-check: [Secondary source validation]
Accessed: [Date you downloaded/accessed]
```

**Example**:
```
Cell B15 (2015 Battery Cost: $350/kWh)

Source: BloombergNEF
Document: Battery Price Survey 2015
Date: November 2015
Page: Slide 12, Figure 3
URL: https://about.bnef.com/blog/battery-price-survey-2015
Cross-check: DOE VTO Annual Report 2015 ($345/kWh) ✓
Accessed: December 15, 2025
```

**Insert Comment**: Right-click cell → Insert Comment (or Shift+F2)

### 2.5 Worksheet Layout Best Practices

**Horizontal Layout** (Time series across columns):
```
Year →     | 1990 | 1991 | 1992 | ... | 2024
-----------|------|------|------|-----|------
Metric 1   | 100  | 95   | 88   | ... | 12
Metric 2   | 50   | 48   | 46   | ... | 15
```

**Vertical Layout** (Time series down rows):
```
Year | Metric_1 | Metric_2 | Metric_3 | ...
-----|----------|----------|----------|----
1990 | 100      | 50       | 75       | ...
1991 | 95       | 48       | 72       | ...
2024 | 12       | 15       | 8        | ...
```

**Choose based on**:
- Horizontal: Many years (>20), fewer metrics (<10)
- Vertical: Fewer years (<20), many metrics (>10)
- DI Standard: **Vertical** (1990-2024 = 35 rows, multiple metrics)

**Header Row Requirements**:
- Row 1: Dataset title ("Transportation Sector - EV Battery Costs")
- Row 2: Units and definitions
- Row 3: Column headers
- Row 4+: Data

**Freeze Panes**: 
- Always freeze header rows (View → Freeze Panes → Freeze Top Row)
- For wide datasets, also freeze first column

---

## 3. SOURCE DOCUMENTATION PROTOCOL

### 3.1 Five-Point Source Verification

**Every data point must pass 5 checks**:

**1. AUTHORITY CHECK**
- [ ] Source is government, peer-reviewed, or industry standard-setter
- [ ] Source has established methodology and track record
- [ ] Source is independent (not advocacy group with conflict of interest)
- [ ] Source data is used by other reputable researchers

**2. ACCESSIBILITY CHECK**
- [ ] Source is permanently accessible (stable URL or DOI)
- [ ] Source can be re-accessed by external researchers
- [ ] If paywalled, document cost and access method
- [ ] If proprietary, document how others can request access

**3. METHODOLOGY CHECK**
- [ ] Source discloses data collection methodology
- [ ] Source explains any estimation or modeling approaches
- [ ] Methodology is scientifically sound
- [ ] We understand and can explain the methodology

**4. CONSISTENCY CHECK**
- [ ] Data point fits expected trend (no unexplained jumps)
- [ ] Units are clear and consistent with other years
- [ ] Definition of metric hasn't changed mid-series
- [ ] Any anomalies are explained in source document

**5. CROSS-VALIDATION CHECK**
- [ ] Data point is validated against 1-2 secondary sources
- [ ] If sources conflict, we investigated and documented reason
- [ ] We chose conservative (lower deflation) estimate if uncertain
- [ ] Validation sources are documented in Excel comments

**If ANY check fails → Do NOT use the data point until resolved**

### 3.2 Source Documentation Template

**For Sources Worksheet**:

| Column | Required Content |
|--------|------------------|
| Source_ID | Unique identifier (e.g., "BNEF_2024") |
| Source_Name | Full organization/author name |
| Document_Title | Complete title of report/paper |
| Publication_Date | Month and year published |
| URL | Permanent link (DOI if available) |
| Access_Date | When we last verified access |
| Access_Method | Free/Academic/Paid subscription/Request |
| Cost | If paid, document price |
| Frequency | Annual/Biennial/Irregular |
| Coverage | Years covered by this source |
| Reliability_Score | 0-100 (from Research Dashboard rubric) |
| Methodology_URL | Link to methodology documentation (if separate) |
| Contact | Email/phone for data requests |
| Notes | Alternative sources, known limitations, etc. |

**Example Row**:
```
BNEF_2024 | BloombergNEF | Battery Price Survey 2024 | Nov 2024 | 
https://about.bnef.com/blog/... | Dec 15, 2025 | Free (summary), 
Full report paid | $5,000/year subscription | Annual | 2010-2024 | 95 | 
https://about.bnef.com/methodology | data@bloombergnef.com | 
Industry gold standard for EV battery costs
```

### 3.3 Data Provenance Tracking

**For EVERY data cell, we must be able to answer**:
1. Where did this number come from? (source)
2. When did we get it? (access date)
3. What does it represent? (metric definition)
4. How was it measured? (methodology)
5. Has it been validated? (cross-check)
6. Has it been adjusted? (inflation, quality, etc.)

**Audit Trail in Excel**:
- Cell comment: Source citation
- Adjacent cell: Quality adjustment formula (if applicable)
- Notes column: Any special handling (interpolation, estimation, etc.)
- Assumptions sheet: Justification for any non-standard approach

**Example Master_Data Row**:
```
Year | Raw_Cost_USD | [Comment: BNEF 2024] | CPI_2024 | Real_Cost_2024_USD | Energy_Density_Wh_per_kg | [Comment: BNEF Tech Specs] | QA_Cost | Notes
2024 | 139 | [FULL CITATION] | 316.2 | 139.00 | 300 | [FULL CITATION] | =E15*(300/G15) | None
```

---

## 4. DATA ENTRY & VALIDATION

### 4.1 Data Entry Workflow

**STEP 1: Source Evaluation**
1. Evaluate source using Research Dashboard rubric
2. Only proceed if score ≥70 (Tier 2 or better)
3. Document in Research Dashboard

**STEP 2: Data Extraction**
1. Download/save source document to `/data/sources` folder
2. Create entry in Sources worksheet
3. Open new row in Master_Data worksheet

**STEP 3: Data Recording**
1. Enter value in blue text
2. Add cell comment with full citation (use template)
3. Enter in adjacent cell: Source_ID (reference to Sources sheet)
4. Flag any uncertainties with yellow background

**STEP 4: Validation**
1. Check value against 1-2 secondary sources
2. If discrepancy >10%, investigate further
3. Document cross-check in cell comment
4. If conflict unresolved, use conservative estimate + document

**STEP 5: Quality Check**
1. Verify units are correct
2. Check for typos (compare to source document twice)
3. Ensure value is within plausible range
4. Run data outlier detection (see Section 7.3)

**STEP 6: Formula Creation**
1. Create inflation adjustment formula (if needed)
2. Create quality adjustment formula (if applicable)
3. Verify formulas calculate correctly
4. Test formula by changing inputs slightly

**STEP 7: Documentation**
1. Update Notes column with any special handling
2. Update Assumptions sheet if new estimation method used
3. Update Changelog with data addition
4. Run recalc.py to verify zero formula errors

### 4.2 Double-Entry Verification

**For critical data points** (large impact on index, unusual values, or historical reconstructions):

**Two-Person Protocol**:
1. Person A: Enters data following workflow above
2. Person B: Independently extracts same data point from source
3. Compare entries
4. If match: Approve and proceed
5. If mismatch: Re-check source, resolve discrepancy, document

**When to Use**:
- Any reconstructed/estimated pre-2000 data
- Any data point that changes index by >2%
- Any data point where source is ambiguous
- Annual review of all hardcoded values

### 4.3 Data Type Standards

**Text Data**:
- Years: Format as text ("2024"), not numbers (2,024)
- Source IDs: Alphanumeric, no spaces (use underscores)
- Notes: Free text, but use consistent abbreviations

**Numeric Data**:
- Always specify units in column header
- Use consistent decimal places (typically 2)
- Never mix units in same column
- Document any unit conversions in formula comments

**Date Data**:
- Use format: YYYY-MM-DD (ISO 8601)
- For year-only data, use YYYY-01-01
- Document precision in Notes column

**Boolean/Flag Data**:
- Use: TRUE/FALSE (not 1/0 or Yes/No)
- Or use: "Verified", "Pending", "Flagged"

---

## 5. FORMULA CONSTRUCTION RULES

### 5.1 Formula Principles

**CRITICAL RULE: Use formulas, NEVER hardcode calculated values**

**❌ WRONG**:
```excel
Cell B10: 5000  [calculated in Python, pasted as value]
Cell C5: 0.15   [computed growth rate, hardcoded]
```

**✅ CORRECT**:
```excel
Cell B10: =SUM(B2:B9)  [Excel calculates the sum]
Cell C5: =(C4-C2)/C2   [Excel calculates growth rate]
```

**Why**: Formulas are:
- Transparent (anyone can see the calculation)
- Dynamic (update when source data changes)
- Auditable (can trace logic)
- Reproducible (no hidden Python scripts required)

### 5.2 Formula Best Practices

**Reference Cells, Not Values**:
```excel
❌ =B5*1.05           [hardcoded growth rate]
✅ =B5*(1+$B$6)       [references assumption cell]
```

**Use Named Ranges for Important Constants**:
```excel
CPI_2024 = 316.2  [named range]
=B5*(CPI_2024/C5) [formula using named range]
```

**Absolute vs. Relative References**:
- Absolute ($B$5): Lock both row and column (for constants)
- Mixed ($B5): Lock column only (for table lookups)
- Relative (B5): Default (for copying formulas down/across)

**Break Complex Formulas into Steps**:
```excel
❌ =((B5*(C5/D5))*(1+(E5/F5)))/((G5-H5)*I5)  [too complex]

✅ Step 1 (J5): =B5*(C5/D5)         [intermediate calc]
✅ Step 2 (K5): =1+(E5/F5)          [intermediate calc]
✅ Step 3 (L5): =(G5-H5)*I5         [intermediate calc]
✅ Final (M5): =(J5*K5)/L5          [final result]
```

### 5.3 Formula Documentation

**Add Comments to Complex Formulas**:
```excel
Cell D15: =(B15/$CPI$_2024)*(300/C15)

Comment:
"Quality-adjusted cost calculation:
= (Raw cost / CPI adjustment) * (Quality factor)
= (Nominal cost converted to real 2024$) * (Normalize for energy density)
Quality baseline: 300 Wh/kg (2024 technology)
See Methodology sheet for full explanation"
```

**Use Descriptive Column Headers**:
```excel
❌ A | B | C | D
✅ Year | Raw_Cost_USD | CPI_Index | Real_Cost_2024_USD
```

### 5.4 Formula Testing Protocol

**Before finalizing any formula**:

1. **Spot Check**: Calculate expected result manually for 1-2 cells
2. **Boundary Test**: Test with edge cases (zero, negative, very large values)
3. **Error Check**: Ensure no #DIV/0!, #REF!, #VALUE!, #N/A errors
4. **Propagation Test**: Copy formula down column, verify all cells calculate correctly
5. **Recalc.py**: Run script to verify zero errors across entire workbook

**Document Test Results**:
```excel
QA_Checks sheet:
Formula: =(B15/$CPI$_2024)*(300/C15)
Tested: Dec 15, 2025
Test Cases: 
- B15=$100, C15=200 → Expected: $158.10, Actual: $158.10 ✓
- B15=$0, C15=300 → Expected: $0, Actual: $0 ✓
Edge Cases: All pass ✓
Recalc.py: Zero errors ✓
```

---

## 6. VERSION CONTROL & ARCHIVAL

### 6.1 Git Repository Structure

```
deflation-index/
├── data/
│   ├── current/
│   │   ├── computing_deflation_index_v2.3.xlsx
│   │   ├── communications_deflation_index_v2.1.xlsx
│   │   ├── energy_deflation_index_v2.4.xlsx
│   │   ├── transportation_deflation_index_v1.0.xlsx
│   │   └── master_deflation_index_v3.1.xlsx
│   ├── archive/
│   │   ├── v3.0/  [previous major version]
│   │   ├── v2.3/
│   │   └── v2.2/
│   └── sources/  [downloaded source documents]
│       ├── BNEF_Battery_Price_Survey_2024.pdf
│       ├── DOE_TEDB_Edition42_2024.xlsx
│       └── ...
├── docs/
│   ├── MASTER_METHODOLOGY.md
│   ├── TRANSPORTATION_METHODOLOGY.md
│   ├── RESEARCH_DASHBOARD.md
│   ├── DATA_HYGIENE_STANDARDS.md
│   └── ...
├── public/
│   └── [website files]
├── CHANGELOG.md
└── README.md
```

### 6.2 Version Control Workflow

**When to Increment Version**:

**Minor Version (x.1 → x.2)**: Data update only
- New year's data added
- Source updated with revised figures
- Typo/error correction (no methodology change)
- Commit message: "v2.3: Add 2024 battery cost data from BNEF"

**Major Version (2.x → 3.x)**: Methodology change
- New component added to sector
- Weighting changed
- Quality adjustment formula revised
- New sector added to Master Index
- Commit message: "v3.0: Add Transportation sector, rebalance weights"

### 6.3 Archival Process

**Before Incrementing Major Version**:
1. Copy entire `/data/current` folder to `/data/archive/v{old_version}`
2. Tag Git commit: `git tag v2.3`
3. Create backup on external drive / cloud storage
4. Document in CHANGELOG.md

**Retention Policy**:
- Keep all major versions indefinitely
- Keep minor versions for 5 years, then archive compressed

### 6.4 Change Documentation

**CHANGELOG.md Format**:

```markdown
# Deflation Index Changelog

## [v3.1] - 2025-03-15
### Added
- 2024 data for all existing sectors
- Transportation sector preliminary data (2010-2024)

### Changed
- Updated sector weights: Transportation now 15%, reduced Computing to 25%
- Revised quality adjustment for EV batteries (improved methodology)

### Fixed
- Corrected 2022 solar panel cost (typo: was $0.28/W, corrected to $0.26/W)
- Impact: Energy sector index 2022 changed from 12.3 to 12.5 (+1.6%)

### Data Sources Updated
- BNEF Battery Price Survey 2024
- DOE TEDB Edition 42
- IRENA Renewable Cost Report 2024

## [v3.0] - 2025-01-15
### Added
- Transportation sector (new)
- Components: EV batteries, autonomous tech, efficiency, ride-sharing

### Changed
- Major rebalancing: Computing 35%→25%, Energy 35%→25%, added Transportation 15%
- Recalculated entire Master Index with new weights

### Methodology
- See TRANSPORTATION_METHODOLOGY.md for full sector methodology
```

---

## 7. QUALITY ASSURANCE CHECKS

### 7.1 Daily Checks (During Active Development)

**Before Closing Excel Each Day**:
- [ ] Save file
- [ ] Run `recalc.py {filename}.xlsx`
- [ ] Verify zero formula errors
- [ ] Commit to Git with descriptive message

**Quick Visual Check**:
- [ ] Scan for any #REF!, #DIV/0!, #VALUE!, #N/A errors
- [ ] Check that blue text cells are hardcoded values
- [ ] Check that black text cells are formulas
- [ ] Verify no blank cells in data columns (except Notes)

### 7.2 Weekly Checks

**Data Integrity**:
- [ ] Spot-check 5-10 random source citations (do URLs work?)
- [ ] Verify 3-5 random calculations manually
- [ ] Check for consistent units across all years
- [ ] Review Notes column for any unresolved flags

**Methodology Consistency**:
- [ ] Verify all sectors use same inflation adjustment (CPI-U, 2024 dollars)
- [ ] Check that quality adjustment formulas are correctly applied
- [ ] Ensure component weights sum to 1.0
- [ ] Verify sector weights sum to 1.0 in Master Index

### 7.3 Monthly Checks

**Outlier Detection**:

**Automated Outlier Flagging**:
```excel
In QA_Checks sheet, create:
=IF(ABS((B15-AVERAGE(B$2:B$35))/STDEV(B$2:B$35))>3, "OUTLIER", "OK")
```

**Flags any value >3 standard deviations from mean**

**Manual Review of Outliers**:
1. Is this a data entry error? → Fix immediately
2. Is this a real discontinuity (e.g., technology breakthrough)? → Document in Notes
3. Is this a methodology inconsistency? → Investigate and resolve

**Cross-Sector Validation**:
- [ ] Compare sector deflation rates to known benchmarks
- [ ] Check if Master DI trend matches expectations
- [ ] Verify capture rate calculations are sensible

### 7.4 Quarterly Checks (Every 3 Months)

**External Validation**:
- [ ] Compare DI findings to recent academic papers
- [ ] Check if any major sources have issued corrections
- [ ] Search for alternative data sources for validation
- [ ] Review Research Dashboard for new potential sources

**Sensitivity Analysis**:
- [ ] Test index with ±5% weight changes
- [ ] Test with alternative quality metrics
- [ ] Document results in QA_Checks sheet

**Documentation Review**:
- [ ] Verify all hardcoded cells have source comments
- [ ] Check that Changelog is up to date
- [ ] Ensure Assumptions sheet documents all judgement calls
- [ ] Update RESEARCH_DASHBOARD.md with any new sources

### 7.5 Annual Audit (Full Review)

**Comprehensive Data Verification** (Q1 each year):
1. **Source Revalidation**: 
   - Re-download all source documents
   - Verify URLs still work (update if changed)
   - Check if sources have issued revisions

2. **Calculation Verification**:
   - Independently recalculate 10% of all data points
   - Have second person verify all major version changes
   - Trace all formulas from source to Master Index

3. **Methodology Review**:
   - Assess if current methodology is still best practice
   - Review recent academic literature for improvements
   - Consider if any sectors need weight adjustments

4. **Documentation Audit**:
   - Verify every data point has source
   - Check that all formulas are documented
   - Ensure Assumptions sheet is complete
   - Review and update all .md documentation files

5. **External Review** (Optional):
   - Share methodology with 2-3 external experts
   - Incorporate feedback
   - Acknowledge reviewers in documentation

---

## 8. ERROR PREVENTION & DETECTION

### 8.1 Common Excel Errors & Prevention

**#REF! (Invalid Reference)**:
- **Cause**: Deleted row/column that formula referenced
- **Prevention**: Use named ranges for important constants
- **Detection**: recalc.py flags all instances

**#DIV/0! (Division by Zero)**:
- **Cause**: Formula divides by cell containing zero or blank
- **Prevention**: Use `=IF(B5=0, "N/A", A5/B5)`
- **Detection**: recalc.py flags all instances

**#VALUE! (Wrong Data Type)**:
- **Cause**: Text where number expected, or vice versa
- **Prevention**: Verify data types on entry, use data validation
- **Detection**: recalc.py flags all instances

**#N/A (Not Available)**:
- **Cause**: Lookup function (VLOOKUP, MATCH) can't find value
- **Prevention**: Use `IFERROR()` wrapper: `=IFERROR(VLOOKUP(...), "Not Found")`
- **Detection**: recalc.py flags all instances

**#NAME? (Unrecognized Name)**:
- **Cause**: Misspelled function name or named range
- **Prevention**: Use autocomplete, verify named ranges exist
- **Detection**: recalc.py flags all instances

**Circular Reference**:
- **Cause**: Formula refers to its own cell (directly or indirectly)
- **Prevention**: Trace formula dependencies, break circular logic
- **Detection**: Excel warns on file open, recalc.py flags

### 8.2 recalc.py Script Usage

**Purpose**: Recalculate all formulas and scan for errors

**Command**:
```bash
cd /mnt/skills/public/xlsx
python recalc.py /path/to/file.xlsx
```

**Output**:
```json
{
  "status": "success",           // or "errors_found"
  "total_errors": 0,
  "total_formulas": 1247,
  "error_summary": {}            // Empty if no errors
}
```

**If Errors Found**:
```json
{
  "status": "errors_found",
  "total_errors": 3,
  "total_formulas": 1247,
  "error_summary": {
    "#REF!": {
      "count": 2,
      "locations": ["Master_Data!B15", "Sector_Index!C8"]
    },
    "#DIV/0!": {
      "count": 1,
      "locations": ["Master_Data!D23"]
    }
  }
}
```

**Response Protocol**:
1. Fix all errors immediately (before proceeding with any other work)
2. Re-run recalc.py to verify fixes
3. Document error in Data_Issues_Log.md (if significant)
4. Update CHANGELOG.md if error affected published values

**Frequency**:
- Every time you modify Excel file
- Before every Git commit
- Before publishing any update

### 8.3 Manual Error Detection

**Monthly Manual Scan**:

1. **Visual Scan**: 
   - Use Find & Replace to search for: #REF, #DIV, #VALUE, #N/A, #NAME
   - Should find ZERO instances (if recalc.py is used correctly)

2. **Formula Audit**:
   - Select random 10 cells with formulas
   - Use "Trace Precedents" (Formulas → Trace Precedents)
   - Verify logic makes sense

3. **Data Type Check**:
   - Sort each column
   - Look for text mixed with numbers
   - Check for unusual formatting

4. **Cross-Check Key Totals**:
   - Manually calculate 2-3 critical values
   - Compare to Excel results
   - Should match to ±$0.01 (rounding)

---

## 9. DATA UPDATE PROCEDURES

### 9.1 Annual Data Update Workflow (Q1 Each Year)

**PHASE 1: SOURCE MONITORING** (Jan 1-15)
1. Check all primary sources for new data releases
2. Download new reports/datasets
3. Save to `/data/sources` folder with clear filename
4. Update Research Dashboard with new source information

**PHASE 2: DATA EXTRACTION** (Jan 15-31)
1. Extract relevant data points from new sources
2. Enter in Excel following data entry workflow (Section 4.1)
3. Add source citations in cell comments
4. Flag any data quality concerns

**PHASE 3: VALIDATION** (Feb 1-15)
1. Cross-validate against secondary sources
2. Check for consistency with prior year trends
3. Investigate and document any anomalies
4. Run outlier detection (Section 7.3)

**PHASE 4: CALCULATION** (Feb 15-28)
1. Update CPI index for 2024 constant dollar conversions
2. Recalculate quality-adjusted costs
3. Update sector indices
4. Recalculate Master Deflation Index
5. Run recalc.py to verify zero errors

**PHASE 5: QUALITY ASSURANCE** (Mar 1-15)
1. Complete full QA checklist (Section 7.5)
2. Conduct sensitivity analysis
3. External review (if available)
4. Fix any identified issues

**PHASE 6: PUBLICATION** (Mar 15-31)
1. Increment version number (minor version for data update)
2. Update CHANGELOG.md
3. Archive previous version
4. Commit to Git with tag
5. Update website
6. Issue release notes

### 9.2 Mid-Year Correction Procedure

**If source issues correction or we discover error**:

**Assessment** (within 24 hours):
- Calculate impact on index (% change)
- Determine severity: Critical (>5%), Major (1-5%), Minor (<1%)

**Critical Errors** (>5% impact):
1. Fix immediately
2. Issue public correction notice
3. Update website with corrected data
4. Increment major version
5. Document in CHANGELOG.md prominently

**Major Errors** (1-5% impact):
1. Fix within 1 week
2. Note in CHANGELOG.md
3. Include in next scheduled update
4. Consider whether public notice needed

**Minor Errors** (<1% impact):
1. Fix in next quarterly review
2. Note in internal Data_Issues_Log.md
3. Include in next scheduled update
4. No public notice required

### 9.3 Source Revision Handling

**If primary source revises historical data**:

1. **Assess Scope**:
   - Which years affected?
   - How large are revisions?
   - Do revisions change methodology?

2. **Update Data**:
   - Replace old values with revised values
   - Update cell comments to note revision
   - Document in Assumptions sheet: "Source revised historical series on [date]"

3. **Recalculate**:
   - Recalculate all dependent values
   - Update all affected years in Master Index
   - Run full QA checks

4. **Document**:
   - Major revision: Create CHANGELOG entry
   - Note in Sources sheet: "Historical data revised YYYY-MM-DD"
   - If published, issue correction notice

---

## 10. LONG-TERM MAINTENANCE

### 10.1 Knowledge Transfer

**Documentation for Future Maintainers**:

All critical knowledge must be documented in writing (not just "tribal knowledge"):

1. **Methodology Documents**: 
   - Master Methodology (this document)
   - Sector-specific methodology docs
   - Research Dashboard

2. **Excel File Internal Docs**:
   - Methodology sheet in each file
   - Assumptions sheet with all judgement calls
   - Sources sheet with contact information

3. **Institutional Knowledge**:
   - Why certain sources were chosen over others
   - How to handle data gaps
   - Common pitfalls and solutions

**Onboarding Checklist for New Maintainer**:
- [ ] Read Master Methodology cover-to-cover
- [ ] Read Data Hygiene Standards (this document)
- [ ] Review all sector methodology documents
- [ ] Open each Excel file, review structure
- [ ] Practice data entry workflow with test data
- [ ] Run recalc.py on all files
- [ ] Shadow current maintainer for one full annual update cycle
- [ ] Independently replicate one small calculation end-to-end

### 10.2 Technology Evolution

**Excel Alternative Assessment** (Every 5 years):

Consider whether to migrate from Excel to:
- Database (PostgreSQL, MySQL)
- Data science tools (Python/pandas, R)
- Business intelligence platforms (Tableau, Power BI)

**Decision Criteria**:
- Transparency: Can external researchers still verify?
- Accessibility: Can users without specialized software access data?
- Reproducibility: Can calculations still be traced?
- Maintenance: Is new system more or less complex?

**Current Stance**: Excel is optimal because:
- Universal (everyone has Excel or LibreOffice)
- Transparent (formulas visible)
- Auditable (recalc.py verifies)
- No coding required for verification

### 10.3 Scalability Planning

**As DI Grows** (more sectors, more components, more years):

**When to Split Files**:
- If single Excel file exceeds 50 MB → Split by sector
- If calculation time exceeds 30 seconds → Optimize or split

**Maintaining Consistency Across Files**:
- Shared "Constants" workbook (CPI data, M2 data, etc.)
- Link sector files to Master Index file
- Document all cross-file references clearly

**Automation Opportunities**:
- Python scripts for data download (if APIs available)
- Automated data validation checks (beyond recalc.py)
- Automated chart generation for website

**BUT**: Always maintain Excel files as source of truth (for transparency)

### 10.4 Continuous Improvement

**Annual Methodology Review** (Q4 each year):

1. **Academic Literature Review**:
   - Search for recent papers on deflation measurement
   - Check for methodological innovations
   - Assess if DI methodology should be updated

2. **User Feedback Integration**:
   - Review any questions/comments from users
   - Identify areas of confusion in documentation
   - Improve clarity for next year

3. **Quality Metric Assessment**:
   - Are current quality adjustments still appropriate?
   - Are there better metrics available now?
   - Should hedonic weights be revised?

4. **Source Evaluation**:
   - Are current sources still best available?
   - Have new authoritative sources emerged?
   - Should any sources be replaced?

**Update Master Methodology if improvements identified**

---

## APPENDIX A: CHECKLISTS

### A.1 New Sector Addition Checklist

- [ ] Research Dashboard evaluation completed (score ≥70)
- [ ] Sector methodology document created
- [ ] Excel file created with all required worksheets
- [ ] Source citations added for all data points
- [ ] Quality adjustment methodology documented
- [ ] Hedonic pricing applied (if needed)
- [ ] Component weights justified and documented
- [ ] All formulas tested and verified (recalc.py passes)
- [ ] QA checks completed (Section 7)
- [ ] Master Index weights rebalanced
- [ ] Historical Master Index recalculated
- [ ] CHANGELOG.md updated
- [ ] External review completed (optional)
- [ ] Version number incremented (major version)
- [ ] Git commit and tag created

### A.2 Annual Data Update Checklist

- [ ] All source documents downloaded and saved
- [ ] New data entered in Excel (blue text)
- [ ] Source citations added in cell comments
- [ ] Cross-validation completed
- [ ] Outlier detection run
- [ ] CPI data updated for inflation adjustment
- [ ] Quality metrics updated
- [ ] All formulas recalculated
- [ ] recalc.py shows zero errors
- [ ] Spot-check manual calculations (5-10 values)
- [ ] Master Index updated
- [ ] Charts/visualizations updated
- [ ] CHANGELOG.md updated
- [ ] Version incremented (minor version)
- [ ] Previous version archived
- [ ] Git commit with tag
- [ ] Website updated
- [ ] Release notes published

### A.3 Monthly Maintenance Checklist

- [ ] Verify all source URLs still work
- [ ] Check for any source corrections/revisions
- [ ] Run outlier detection
- [ ] Manual scan for formula errors
- [ ] Review Notes column for unresolved issues
- [ ] Update Research Dashboard with new sources
- [ ] Check Git repository is backed up
- [ ] Document any issues in Data_Issues_Log.md

### A.4 Error Discovery Response Checklist

- [ ] Document error in Data_Issues_Log.md immediately
- [ ] Assess severity (Critical/Major/Minor)
- [ ] Calculate impact on index
- [ ] Determine if published data is affected
- [ ] Fix error in Excel file
- [ ] Recalculate all dependent values
- [ ] Run recalc.py to verify fix
- [ ] Update CHANGELOG.md
- [ ] Increment version (major if critical error)
- [ ] Issue correction notice (if critical)
- [ ] Archive previous (incorrect) version
- [ ] Document lessons learned

---

## APPENDIX B: TOOLS & RESOURCES

### B.1 Required Software

- **Excel or LibreOffice Calc**: For data management
- **Python 3.8+**: For recalc.py script
- **Git**: For version control
- **Text editor**: For markdown documentation

### B.2 Useful Excel Shortcuts

| Action | Shortcut (Windows) | Shortcut (Mac) |
|--------|-------------------|----------------|
| Insert Comment | Shift+F2 | Cmd+Option+M |
| Trace Precedents | Alt+M, P | Cmd+T (custom) |
| Trace Dependents | Alt+M, D | Cmd+D (custom) |
| Formula Auditing | Alt+M | Tools→Formula Auditing |
| Find & Replace | Ctrl+H | Cmd+H |
| Go To Special | Ctrl+G, Alt+S | Cmd+G |

### B.3 recalc.py Error Codes

| Error Code | Meaning | Common Cause |
|------------|---------|--------------|
| #REF! | Invalid cell reference | Deleted row/column referenced in formula |
| #DIV/0! | Division by zero | Denominator is zero or blank |
| #VALUE! | Wrong data type | Text in numeric calculation |
| #N/A | Not available | VLOOKUP/MATCH can't find value |
| #NAME? | Unrecognized name | Misspelled function or named range |
| #NUM! | Invalid numeric value | Invalid argument to function |
| #NULL! | Invalid range | Space used instead of comma in range |

---

## APPENDIX C: ESCALATION PROCEDURES

### When to Seek External Help

**Immediate Escalation (Critical Issues)**:
- Formula error that can't be resolved within 24 hours
- Discovered error with >5% impact on published index
- Primary source becomes permanently unavailable
- Methodology question that affects core principles

**Scheduled Escalation (Major Issues)**:
- Need for methodology revision
- Addition of new sector
- Significant source conflict (>20% difference between sources)
- Software/infrastructure failure

**Resources for Escalation**:
1. Excel experts: Excel community forums, Stack Overflow
2. Data scientists: Academic contacts, consulting network
3. Domain experts: Sector-specific researchers
4. Statistical consultants: For methodology questions

**Decision Authority**:
- Minor errors (<1% impact): Maintainer decision
- Major errors (1-5% impact): Require second review
- Critical errors (>5% impact): Require external expert review

---

**Document Control**:
- **Author**: Deflation Index LLC
- **Version**: 1.0
- **Status**: Active
- **Review Cycle**: Annual (Q4)
- **Next Review**: December 2026
- **Contact**: data@deflationindex.com (for questions on standards)
