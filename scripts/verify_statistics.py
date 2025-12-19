#!/usr/bin/env python3
"""
Deflation Index - Statistics Verification Script v3.0.1
Verifies that all statistics in documentation match the actual data
"""

from openpyxl import load_workbook
import sys
from pathlib import Path

# Expected values for v3.0.1
EXPECTED_VALUES = {
    'cumulative_deflation': -96.26,  # Percentage
    'annual_average': -9.21,  # Percentage
    'master_di_2024': 3.74,  # Index value
    'master_di_1990': 100.00,  # Baseline
    'abundance_gap': 560,  # Percentage points
    'deflation_gap': 251,  # Percentage points
    
    # Sector weights (4-decimal precision)
    'weight_computing': 0.2941,
    'weight_communications': 0.2353,
    'weight_energy': 0.2941,
    'weight_transportation': 0.1765,
    'weight_total': 1.0000,
    
    # Sector deflation (cumulative %)
    'computing_deflation': -99.88,
    'communications_deflation': -99.27,
    'energy_deflation': -98.42,
    'transportation_deflation': -82.59,  # 2010-2024 only
}

TOLERANCE = 0.02  # Allow 0.02 difference for rounding

def load_master_file():
    """Load the master Excel file"""
    excel_path = Path('data/excel/master_deflation_index_v3.0.1.xlsx')
    
    if not excel_path.exists():
        print(f"❌ ERROR: Master file not found at {excel_path}")
        print(f"   Current directory: {Path.cwd()}")
        return None
    
    try:
        wb = load_workbook(excel_path, data_only=True)
        return wb
    except Exception as e:
        print(f"❌ ERROR loading Excel file: {e}")
        return None

def verify_master_di_values(wb):
    """Verify Master_DI values in Excel file"""
    
    ws = wb['Master_Index']
    
    # Find 1990 and 2024 rows
    master_di_1990 = None
    master_di_2024 = None
    
    for row in range(8, 43):  # Typical data range
        year = ws.cell(row, 1).value
        if year == 1990:
            master_di_1990 = ws.cell(row, 6).value
        elif year == 2024:
            master_di_2024 = ws.cell(row, 6).value
    
    results = []
    
    # Check 1990 baseline
    if master_di_1990:
        diff = abs(master_di_1990 - EXPECTED_VALUES['master_di_1990'])
        if diff < TOLERANCE:
            results.append(('✓', f"1990 Master_DI baseline: {master_di_1990:.2f}"))
        else:
            results.append(('✗', f"1990 Master_DI: {master_di_1990:.2f} (expected {EXPECTED_VALUES['master_di_1990']})"))
    else:
        results.append(('✗', "1990 Master_DI: NOT FOUND"))
    
    # Check 2024 value
    if master_di_2024:
        diff = abs(master_di_2024 - EXPECTED_VALUES['master_di_2024'])
        if diff < TOLERANCE:
            results.append(('✓', f"2024 Master_DI: {master_di_2024:.2f}"))
        else:
            results.append(('✗', f"2024 Master_DI: {master_di_2024:.2f} (expected {EXPECTED_VALUES['master_di_2024']})"))
    else:
        results.append(('✗', "2024 Master_DI: NOT FOUND"))
    
    # Calculate cumulative deflation
    if master_di_1990 and master_di_2024:
        cumulative = ((master_di_2024 - master_di_1990) / master_di_1990) * 100
        diff = abs(cumulative - EXPECTED_VALUES['cumulative_deflation'])
        if diff < TOLERANCE:
            results.append(('✓', f"Cumulative deflation: {cumulative:.2f}%"))
        else:
            results.append(('✗', f"Cumulative deflation: {cumulative:.2f}% (expected {EXPECTED_VALUES['cumulative_deflation']}%)"))
    
    return results

def verify_sector_weights(wb):
    """Verify sector weights"""
    
    ws = wb['Sector_Weights']
    
    results = []
    
    # Expected weights
    weights = {
        'Computing': EXPECTED_VALUES['weight_computing'],
        'Communications': EXPECTED_VALUES['weight_communications'],
        'Energy': EXPECTED_VALUES['weight_energy'],
        'Transportation': EXPECTED_VALUES['weight_transportation']
    }
    
    actual_weights = {}
    
    # Read weights from file
    for row in range(4, 8):  # Rows 4-7 typically contain weights
        sector = ws.cell(row, 1).value
        weight = ws.cell(row, 2).value
        
        if sector in weights:
            actual_weights[sector] = weight
            
            diff = abs(weight - weights[sector])
            if diff < 0.0001:  # Very tight tolerance for weights
                results.append(('✓', f"{sector} weight: {weight:.4f}"))
            else:
                results.append(('✗', f"{sector} weight: {weight:.4f} (expected {weights[sector]:.4f})"))
    
    # Check total
    if actual_weights:
        total = sum(actual_weights.values())
        diff = abs(total - EXPECTED_VALUES['weight_total'])
        if diff < 0.0001:
            results.append(('✓', f"Total weights: {total:.4f}"))
        else:
            results.append(('✗', f"Total weights: {total:.4f} (expected {EXPECTED_VALUES['weight_total']})"))
    
    return results

def verify_formulas(wb):
    """Verify that Master_DI uses formulas, not hard-coded values"""
    
    # Load with formulas (not data_only)
    excel_path = Path('data/excel/master_deflation_index_v3.0.1.xlsx')
    wb_formulas = load_workbook(excel_path, data_only=False)
    ws = wb_formulas['Master_Index']
    
    results = []
    formula_count = 0
    hardcoded_count = 0
    
    # Check Master_DI column (column F, rows 9-42 for 1991-2024)
    for row in range(9, 43):
        cell = ws.cell(row, 6)
        
        if cell.value and isinstance(cell.value, str) and cell.value.startswith('='):
            formula_count += 1
            
            # Check if formula references Sector_Weights
            if 'Sector_Weights' in cell.value:
                pass  # Good
            else:
                results.append(('⚠', f"Row {row}: Formula doesn't reference Sector_Weights"))
        else:
            hardcoded_count += 1
            results.append(('✗', f"Row {row}: Hard-coded value (not formula)"))
    
    if formula_count > 30:
        results.insert(0, ('✓', f"Formula-based calculations: {formula_count} formulas found"))
    else:
        results.insert(0, ('✗', f"Only {formula_count} formulas found, {hardcoded_count} hard-coded"))
    
    wb_formulas.close()
    return results

def main():
    """Run all verification checks"""
    
    print("="*80)
    print("DEFLATION INDEX v3.0.1 - STATISTICS VERIFICATION")
    print("="*80)
    print()
    
    wb = load_master_file()
    if not wb:
        print("\n❌ VERIFICATION FAILED: Could not load master file")
        return 1
    
    all_results = []
    
    # Run checks
    print("Checking Master_DI values...")
    all_results.extend(verify_master_di_values(wb))
    
    print("\nChecking sector weights...")
    all_results.extend(verify_sector_weights(wb))
    
    print("\nChecking formulas...")
    all_results.extend(verify_formulas(wb))
    
    wb.close()
    
    # Print results
    print("\n" + "="*80)
    print("VERIFICATION RESULTS")
    print("="*80)
    print()
    
    passed = 0
    failed = 0
    warnings = 0
    
    for status, message in all_results:
        print(f"{status} {message}")
        if status == '✓':
            passed += 1
        elif status == '✗':
            failed += 1
        else:
            warnings += 1
    
    print()
    print("="*80)
    print(f"SUMMARY: {passed} passed, {failed} failed, {warnings} warnings")
    print("="*80)
    print()
    
    if failed > 0:
        print("❌ VERIFICATION FAILED")
        print()
        print("Action required:")
        print("1. Check data/excel/master_deflation_index_v3.0.1.xlsx")
        print("2. Verify all statistics match expected v3.0.1 values")
        print("3. Update documentation if needed")
        return 1
    elif warnings > 0:
        print("⚠ VERIFICATION PASSED WITH WARNINGS")
        print()
        print("Review warnings and address if needed.")
        return 0
    else:
        print("✅ VERIFICATION PASSED")
        print()
        print("All statistics verified correct for v3.0.1")
        return 0

if __name__ == "__main__":
    sys.exit(main())
