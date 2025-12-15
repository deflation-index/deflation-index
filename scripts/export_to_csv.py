#!/usr/bin/env python3
"""
Export Deflation Index Excel files to CSV format.
Extracts key data tables from Excel workbooks and saves as CSV.

Usage:
    python export_to_csv.py

Requirements:
    pip install pandas openpyxl
"""

import pandas as pd
from pathlib import Path
import sys

# Paths (adjust if running from different directory)
EXCEL_DIR = Path("../data/excel")
CSV_DIR = Path("../data/csv")

def setup_directories():
    """Create CSV directory if it doesn't exist."""
    CSV_DIR.mkdir(parents=True, exist_ok=True)
    print(f"📁 Output directory: {CSV_DIR.absolute()}")

def export_master_index():
    """Export Master Deflation Index to CSV."""
    print("\n📊 Exporting Master Deflation Index...")
    
    try:
        # Read Master_Index sheet
        df = pd.read_excel(
            EXCEL_DIR / "master_deflation_index_v3.0.xlsx",
            sheet_name="Master_Index",
            usecols="A:L",  # Year through Capture_Rate
            skiprows=7,     # Skip header rows
            nrows=35        # 1990-2024 (35 rows)
        )
        
        # Set proper column names
        df.columns = [
            "Year",
            "Computing_Index",
            "Communications_Index",
            "Energy_Index",
            "Transportation_Index",
            "Master_DI",
            "Annual_Deflation",
            "M2_Growth",
            "CPI_Inflation",
            "Gap_vs_M2",
            "Gap_vs_CPI",
            "Capture_Rate"
        ]
        
        # Convert Year to integer
        df['Year'] = df['Year'].astype(int)
        
        # Save to CSV
        output_file = CSV_DIR / "master_di_1990_2024.csv"
        df.to_csv(output_file, index=False, float_format='%.6f')
        
        print(f"   ✅ Exported {len(df)} rows to {output_file.name}")
        print(f"   📅 Coverage: {df['Year'].min()}-{df['Year'].max()}")
        
        return True
        
    except Exception as e:
        print(f"   ❌ Error: {e}")
        return False

def export_sector(sector_name, filename, years=35):
    """Export individual sector data to CSV."""
    print(f"\n📊 Exporting {sector_name.title()} Sector...")
    
    try:
        # Read Master_Data sheet
        df = pd.read_excel(
            EXCEL_DIR / filename,
            sheet_name="Master_Data",
            usecols="A:R",  # Year through Quality_Flag
            skiprows=5,     # Skip header rows
            nrows=years     # 35 for most, 15 for Transportation
        )
        
        # Clean up column names (will vary by sector, but this is general structure)
        # Keep original column headers from Excel
        
        # Convert Year to integer
        if 'Year' in df.columns or df.columns[0] == 'Year':
            df.iloc[:, 0] = df.iloc[:, 0].astype(int)
        
        # Save to CSV
        start_year = 1990 if years == 35 else 2010
        end_year = start_year + years - 1
        output_file = CSV_DIR / f"{sector_name}_{start_year}_{end_year}.csv"
        df.to_csv(output_file, index=False, float_format='%.6f')
        
        print(f"   ✅ Exported {len(df)} rows to {output_file.name}")
        print(f"   📅 Coverage: {start_year}-{end_year}")
        
        return True
        
    except Exception as e:
        print(f"   ❌ Error: {e}")
        return False

def export_all():
    """Export all sectors and master index."""
    print("=" * 60)
    print("DEFLATION INDEX - EXCEL TO CSV EXPORT")
    print("=" * 60)
    
    setup_directories()
    
    success_count = 0
    total_count = 5
    
    # Export master index
    if export_master_index():
        success_count += 1
    
    # Export Computing (1990-2024, 35 years)
    if export_sector("computing", "computing_deflation_index_v1.0.xlsx", 35):
        success_count += 1
    
    # Export Communications (1990-2024, 35 years)
    if export_sector("communications", "communications_deflation_index_v1.0.xlsx", 35):
        success_count += 1
    
    # Export Energy (1990-2024, 35 years)
    if export_sector("energy", "energy_deflation_index_v1.0.xlsx", 35):
        success_count += 1
    
    # Export Transportation (2010-2024, 15 years)
    if export_sector("transportation", "transportation_deflation_index_v1.0.xlsx", 15):
        success_count += 1
    
    # Summary
    print("\n" + "=" * 60)
    if success_count == total_count:
        print("✅ ALL EXPORTS COMPLETED SUCCESSFULLY!")
    else:
        print(f"⚠️  {success_count}/{total_count} exports completed")
    print("=" * 60)
    
    print(f"\n📂 CSV files saved to: {CSV_DIR.absolute()}")
    print("\nNext steps:")
    print("  1. Verify CSV files look correct")
    print("  2. Commit to git: git add data/csv/*.csv")
    print("  3. Push to GitHub: git push origin main")

def main():
    """Main entry point."""
    try:
        export_all()
        return 0
    except KeyboardInterrupt:
        print("\n\n⚠️  Export cancelled by user")
        return 1
    except Exception as e:
        print(f"\n❌ Unexpected error: {e}")
        import traceback
        traceback.print_exc()
        return 1

if __name__ == "__main__":
    sys.exit(main())
