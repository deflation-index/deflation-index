#!/usr/bin/env python3
"""
Deflation Index Statistics Verification Script

Automatically verifies that all claims in documentation match the source Excel data.
This prevents transcription errors and ensures consistency across all documents.

Usage:
    python verify_statistics.py

Requirements:
    pip install pandas openpyxl
"""

import pandas as pd
from pathlib import Path
import sys

# Colors for terminal output
class Colors:
    GREEN = '\033[92m'
    RED = '\033[91m'
    YELLOW = '\033[93m'
    BLUE = '\033[94m'
    BOLD = '\033[1m'
    END = '\033[0m'

def print_header(text):
    print(f"\n{Colors.BOLD}{Colors.BLUE}{'='*70}{Colors.END}")
    print(f"{Colors.BOLD}{Colors.BLUE}{text.center(70)}{Colors.END}")
    print(f"{Colors.BOLD}{Colors.BLUE}{'='*70}{Colors.END}\n")

def print_pass(text):
    print(f"{Colors.GREEN}✓ {text}{Colors.END}")

def print_fail(text):
    print(f"{Colors.RED}✗ {text}{Colors.END}")

def print_warn(text):
    print(f"{Colors.YELLOW}⚠ {text}{Colors.END}")

def verify_master_index(excel_path):
    """Verify all statistics from master deflation index."""
    
    print_header("VERIFYING DEFLATION INDEX STATISTICS")
    
    # Read data
    df = pd.read_excel(excel_path, sheet_name='Master_Index', skiprows=6, header=0)
    
    # Store results
    results = {
        'passed': 0,
        'failed': 0,
        'warnings': 0,
        'errors': []
    }
    
    # 1. TECH DEFLATION (Master DI)
    print(f"{Colors.BOLD}1. TECHNOLOGY DEFLATION:{Colors.END}")
    di_1990 = 100.0
    di_2024 = df[df['Year'] == 2024]['Master_DI'].values[0]
    tech_deflation_pct = (di_2024 / di_1990 - 1) * 100
    tech_deflation_magnitude = abs(tech_deflation_pct)
    
    print(f"   1990 Index: {di_1990:.2f}")
    print(f"   2024 Index: {di_2024:.6f}")
    print(f"   Total Deflation: {tech_deflation_magnitude:.2f}%")
    
    if abs(tech_deflation_magnitude - 84.32) < 0.5:
        print_pass("Cumulative deflation: 84.32% ✓")
        results['passed'] += 1
    else:
        print_fail(f"Expected ~84.3%, got {tech_deflation_magnitude:.2f}%")
        results['failed'] += 1
        results['errors'].append(f"Tech deflation: expected 84.3%, actual {tech_deflation_magnitude:.2f}%")
    
    # Annual rate
    deflation_rates = df['Annual_Deflation_%'].dropna()
    avg_deflation_annual = deflation_rates.mean() * 100
    print(f"   Annual Average: {avg_deflation_annual:.2f}%")
    
    if abs(avg_deflation_annual - (-5.2)) < 0.1:
        print_pass("Annual deflation: -5.2% ✓")
        results['passed'] += 1
    else:
        print_fail(f"Expected -5.2%, got {avg_deflation_annual:.2f}%")
        results['failed'] += 1
        results['errors'].append(f"Annual deflation: expected -5.2%, actual {avg_deflation_annual:.2f}%")
    
    # 2. M2 GROWTH
    print(f"\n{Colors.BOLD}2. M2 MONEY SUPPLY:{Colors.END}")
    m2_growth_rates = df['M2_Growth_%'].dropna()
    avg_m2_annual = m2_growth_rates.mean() * 100
    
    # Compound cumulative
    m2_cumulative = 100
    for rate in m2_growth_rates:
        m2_cumulative *= (1 + rate)
    m2_growth_pct = (m2_cumulative / 100 - 1) * 100
    
    print(f"   Annual Average: {avg_m2_annual:.2f}%")
    print(f"   Cumulative Growth: {m2_growth_pct:.2f}%")
    print(f"   Multiplier: {m2_cumulative/100:.2f}x")
    
    if abs(avg_m2_annual - 5.86) < 0.1:
        print_pass("Annual M2 growth: 5.86% ✓")
        results['passed'] += 1
    else:
        print_fail(f"Expected 5.86%, got {avg_m2_annual:.2f}%")
        results['failed'] += 1
        results['errors'].append(f"Annual M2: expected 5.86%, actual {avg_m2_annual:.2f}%")
    
    if abs(m2_growth_pct - 614.84) < 5:
        print_pass("Cumulative M2 growth: 614.84% ✓")
        results['passed'] += 1
    else:
        print_fail(f"Expected 614.84%, got {m2_growth_pct:.2f}%")
        results['failed'] += 1
        results['errors'].append(f"Cumulative M2: expected 614.84%, actual {m2_growth_pct:.2f}%")
    
    # 3. CPI INFLATION
    print(f"\n{Colors.BOLD}3. CPI INFLATION:{Colors.END}")
    cpi_growth_rates = df['CPI_Inflation_%'].dropna()
    avg_cpi_annual = cpi_growth_rates.mean() * 100
    
    # Compound cumulative
    cpi_cumulative = 100
    for rate in cpi_growth_rates:
        cpi_cumulative *= (1 + rate)
    cpi_growth_pct = (cpi_cumulative / 100 - 1) * 100
    
    print(f"   Annual Average: {avg_cpi_annual:.2f}%")
    print(f"   Cumulative Growth: {cpi_growth_pct:.2f}%")
    print(f"   Multiplier: {cpi_cumulative/100:.2f}x")
    
    if abs(avg_cpi_annual - 2.72) < 0.1:
        print_pass("Annual CPI inflation: 2.72% ✓")
        results['passed'] += 1
    else:
        print_fail(f"Expected 2.72%, got {avg_cpi_annual:.2f}%")
        results['failed'] += 1
        results['errors'].append(f"Annual CPI: expected 2.72%, actual {avg_cpi_annual:.2f}%")
    
    if abs(cpi_growth_pct - 154.65) < 2:
        print_pass("Cumulative CPI growth: 154.65% ✓")
        results['passed'] += 1
    else:
        print_fail(f"Expected 154.65%, got {cpi_growth_pct:.2f}%")
        results['failed'] += 1
        results['errors'].append(f"Cumulative CPI: expected 154.65%, actual {cpi_growth_pct:.2f}%")
    
    # 4. THE GAP
    print(f"\n{Colors.BOLD}4. THE GAP (The Wealth Transfer):{Colors.END}")
    
    # Annual gap
    gap_annual = df['Tech_vs_CPI_Gap'].dropna().mean() * 100
    print(f"   Annual Average: {abs(gap_annual):.2f}pp")
    
    # Cumulative gap (The Missing Wealth Transfer)
    # Formula: |Tech Deflation| + M2 Growth - CPI Growth
    gap_cumulative = tech_deflation_magnitude + m2_growth_pct - cpi_growth_pct
    
    print(f"   Cumulative Gap: {gap_cumulative:.2f}pp")
    print(f"   ")
    print(f"   Calculation:")
    print(f"     Tech deflation magnitude: {tech_deflation_magnitude:.2f}pp")
    print(f"     + M2 expansion: {m2_growth_pct:.2f}pp")
    print(f"     - CPI inflation: {cpi_growth_pct:.2f}pp")
    print(f"     = Missing wealth: {gap_cumulative:.2f}pp")
    
    if abs(abs(gap_annual) - 7.83) < 0.2:
        print_pass("Annual gap: 7.83pp ✓")
        results['passed'] += 1
    else:
        print_fail(f"Expected 7.83pp, got {abs(gap_annual):.2f}pp")
        results['failed'] += 1
        results['errors'].append(f"Annual gap: expected 7.83pp, actual {abs(gap_annual):.2f}pp")
    
    if abs(gap_cumulative - 544.52) < 5:
        print_pass("Cumulative gap: 544.52pp ✓")
        results['passed'] += 1
    else:
        print_fail(f"Expected 544.52pp, got {gap_cumulative:.2f}pp")
        results['failed'] += 1
        results['errors'].append(f"Cumulative gap: expected 544.52pp, actual {gap_cumulative:.2f}pp")
    
    return results, {
        'tech_deflation_annual': avg_deflation_annual,
        'tech_deflation_cumulative': tech_deflation_magnitude,
        'm2_growth_annual': avg_m2_annual,
        'm2_growth_cumulative': m2_growth_pct,
        'cpi_inflation_annual': avg_cpi_annual,
        'cpi_inflation_cumulative': cpi_growth_pct,
        'gap_annual': abs(gap_annual),
        'gap_cumulative': gap_cumulative
    }

def generate_reference_card(stats):
    """Generate a quick reference card with all correct statistics."""
    
    print_header("OFFICIAL STATISTICS REFERENCE CARD")
    
    print(f"{Colors.BOLD}Copy these numbers for all documentation:{Colors.END}\n")
    
    print(f"{Colors.BOLD}TECHNOLOGY DEFLATION:{Colors.END}")
    print(f"  Annual Average: -5.20% (precise: {stats['tech_deflation_annual']:.4f}%)")
    print(f"  Cumulative (1990-2024): -{stats['tech_deflation_cumulative']:.2f}%")
    print()
    
    print(f"{Colors.BOLD}M2 MONEY SUPPLY EXPANSION:{Colors.END}")
    print(f"  Annual Average: +5.86% (precise: {stats['m2_growth_annual']:.4f}%)")
    print(f"  Cumulative (1990-2024): +{stats['m2_growth_cumulative']:.2f}%")
    print(f"  Multiplier: {(stats['m2_growth_cumulative']/100 + 1):.2f}x")
    print()
    
    print(f"{Colors.BOLD}CPI INFLATION:{Colors.END}")
    print(f"  Annual Average: +2.72% (precise: {stats['cpi_inflation_annual']:.4f}%)")
    print(f"  Cumulative (1990-2024): +{stats['cpi_inflation_cumulative']:.2f}%")
    print(f"  Multiplier: {(stats['cpi_inflation_cumulative']/100 + 1):.2f}x")
    print()
    
    print(f"{Colors.BOLD}THE GAP (The Wealth Transfer):{Colors.END}")
    print(f"  Annual Average: {stats['gap_annual']:.2f} percentage points")
    print(f"  Cumulative (1990-2024): {stats['gap_cumulative']:.2f} percentage points")
    print()
    
    print(f"{Colors.BOLD}HERO STATS FOR WEBSITE:{Colors.END}")
    print(f"  Tech Deflation: -5.2% annual | -84.3% cumulative")
    print(f"  M2 Growth: +5.9% annual | +615% cumulative")
    print(f"  CPI Inflation: +2.7% annual | +155% cumulative")
    print(f"  The Gap: 7.8pp annual | 545pp cumulative")
    print()
    
    print(f"{Colors.BOLD}THE NARRATIVE:{Colors.END}")
    print(f"  Technology delivered {stats['tech_deflation_cumulative']:.0f}pp of price reductions.")
    print(f"  M2 expanded {stats['m2_growth_cumulative']:.0f}pp over the same period.")
    print(f"  Consumer prices (CPI) rose only {stats['cpi_inflation_cumulative']:.0f}pp.")
    print(f"  The Gap: {stats['gap_cumulative']:.0f}pp of missing wealth represents")
    print(f"  productivity gains captured by asset holders, not consumers.")

def main():
    """Main verification routine."""
    
    # Find Excel file
    excel_path = Path('../data/excel/master_deflation_index_v3.0.xlsx')
    
    if not excel_path.exists():
        # Try alternative paths
        alt_paths = [
            Path('data/excel/master_deflation_index_v3.0.xlsx'),
            Path('master_deflation_index_v3.0.xlsx'),
            Path('/mnt/user-data/outputs/master_deflation_index_v3.0.xlsx')
        ]
        
        for alt in alt_paths:
            if alt.exists():
                excel_path = alt
                break
        else:
            print_fail("Could not find master_deflation_index_v3.0.xlsx")
            print("Searched paths:")
            for p in [excel_path] + alt_paths:
                print(f"  - {p}")
            return 1
    
    print(f"Reading data from: {excel_path}\n")
    
    # Run verification
    try:
        results, stats = verify_master_index(excel_path)
    except Exception as e:
        print_fail(f"Error during verification: {e}")
        import traceback
        traceback.print_exc()
        return 1
    
    # Print reference card
    generate_reference_card(stats)
    
    # Print summary
    print_header("VERIFICATION SUMMARY")
    
    total_checks = results['passed'] + results['failed']
    pass_rate = (results['passed'] / total_checks * 100) if total_checks > 0 else 0
    
    print(f"Total Checks: {total_checks}")
    print(f"Passed: {Colors.GREEN}{results['passed']}{Colors.END}")
    print(f"Failed: {Colors.RED}{results['failed']}{Colors.END}")
    print(f"Pass Rate: {pass_rate:.1f}%")
    
    if results['failed'] > 0:
        print(f"\n{Colors.RED}ERRORS FOUND:{Colors.END}")
        for error in results['errors']:
            print(f"  • {error}")
        print(f"\n{Colors.YELLOW}Action required: Update documentation with correct values.{Colors.END}")
        return 1
    else:
        print(f"\n{Colors.GREEN}{Colors.BOLD}✓ ALL CHECKS PASSED{Colors.END}")
        print(f"{Colors.GREEN}All statistics verified against source data.{Colors.END}")
        return 0

if __name__ == "__main__":
    sys.exit(main())
