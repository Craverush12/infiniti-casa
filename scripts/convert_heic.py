#!/usr/bin/env python3
"""
HEIC to JPG Converter for Property Assets
Converts HEIC files to web-compatible JPG format
"""

import os
import sys
from pathlib import Path
import argparse
from typing import List, Tuple
import shutil

try:
    from PIL import Image
    import pillow_heif
except ImportError as e:
    print(f"❌ Missing required libraries: {e}")
    print("📦 Install required packages:")
    print("   pip install Pillow pillow-heif")
    sys.exit(1)

# Configuration
SCRIPT_DIR = Path(__file__).parent
PROJECT_ROOT = SCRIPT_DIR.parent
ASSETS_DIR = PROJECT_ROOT / "src" / "asssets"
OUTPUT_DIR = PROJECT_ROOT / "public" / "assets"

# Property mapping
PROPERTY_ASSET_MAP = {
    'Sky Lounge': 'Penthouse Sky Lounge',
    'Photos Bandra Cottage': 'Heritage Garden Cottage',
    'Little White Bandra Studio': 'Studio Bandra',
    'Bandra Art House': 'Art Loft Bandra',
    'City Zen': 'Zen Suite',
    'India House': 'India House'
}

def get_heic_files(directory: Path) -> List[Path]:
    """Get all HEIC files from a directory recursively."""
    heic_files = []
    
    if not directory.exists():
        return heic_files
    
    for file_path in directory.rglob("*"):
        if file_path.is_file() and file_path.suffix.lower() in ['.heic', '.HEIC']:
            heic_files.append(file_path)
    
    return heic_files

def convert_heic_to_jpg(input_path: Path, output_path: Path, quality: int = 85) -> bool:
    """Convert a single HEIC file to JPG."""
    try:
        # Register HEIF opener
        pillow_heif.register_heif_opener()
        
        # Open HEIC image
        with Image.open(input_path) as img:
            # Convert to RGB if necessary
            if img.mode in ('RGBA', 'LA', 'P'):
                img = img.convert('RGB')
            
            # Create output directory if it doesn't exist
            output_path.parent.mkdir(parents=True, exist_ok=True)
            
            # Save as JPG
            img.save(output_path, 'JPEG', quality=quality, optimize=True)
            
        return True
    except Exception as e:
        print(f"❌ Error converting {input_path.name}: {e}")
        return False

def convert_folder(folder_path: Path, output_folder: Path, quality: int = 85) -> Tuple[int, int]:
    """Convert all HEIC files in a folder."""
    heic_files = get_heic_files(folder_path)
    successful = 0
    failed = 0
    
    print(f"📁 Processing folder: {folder_path.name}")
    print(f"   Found {len(heic_files)} HEIC files")
    
    for heic_file in heic_files:
        # Create output filename
        output_filename = heic_file.stem + '.jpg'
        output_path = output_folder / output_filename
        
        print(f"   Converting: {heic_file.name} → {output_filename}")
        
        if convert_heic_to_jpg(heic_file, output_path, quality):
            successful += 1
        else:
            failed += 1
    
    return successful, failed

def main():
    parser = argparse.ArgumentParser(description='Convert HEIC files to JPG format')
    parser.add_argument('--quality', type=int, default=85, help='JPEG quality (1-100, default: 85)')
    parser.add_argument('--folder', type=str, help='Convert specific folder only')
    parser.add_argument('--dry-run', action='store_true', help='Show what would be converted without doing it')
    
    args = parser.parse_args()
    
    print("🖼️  HEIC to JPG Converter")
    print("=" * 50)
    
    # Check if assets directory exists
    if not ASSETS_DIR.exists():
        print(f"❌ Assets directory not found: {ASSETS_DIR}")
        print("   Make sure your assets are in: src/asssets/")
        sys.exit(1)
    
    # Create output directory
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    
    # Get all asset folders
    asset_folders = [f for f in ASSETS_DIR.iterdir() if f.is_dir()]
    
    if args.folder:
        # Convert specific folder only
        specific_folder = ASSETS_DIR / args.folder
        if not specific_folder.exists():
            print(f"❌ Folder not found: {args.folder}")
            sys.exit(1)
        asset_folders = [specific_folder]
    
    total_successful = 0
    total_failed = 0
    
    print(f"\n📊 Found {len(asset_folders)} asset folders:")
    for folder in asset_folders:
        heic_count = len(get_heic_files(folder))
        property_name = PROPERTY_ASSET_MAP.get(folder.name, 'Unknown')
        print(f"   • {folder.name} ({heic_count} files) → {property_name}")
    
    if args.dry_run:
        print("\n🔍 Dry run - no files will be converted")
        return
    
    print(f"\n🚀 Starting conversion (quality: {args.quality})...")
    print()
    
    # Convert each folder
    for folder in asset_folders:
        output_folder = OUTPUT_DIR / folder.name
        
        if args.folder and folder.name != args.folder:
            continue
            
        successful, failed = convert_folder(folder, output_folder, args.quality)
        total_successful += successful
        total_failed += failed
        
        if successful > 0:
            print(f"   ✅ {successful} files converted successfully")
        if failed > 0:
            print(f"   ❌ {failed} files failed to convert")
        print()
    
    # Summary
    print("=" * 50)
    print("📈 Conversion Summary:")
    print(f"   ✅ Successful: {total_successful}")
    print(f"   ❌ Failed: {total_failed}")
    print(f"   📁 Output directory: {OUTPUT_DIR}")
    
    if total_successful > 0:
        print("\n🎉 Conversion complete!")
        print("📝 Next steps:")
        print("   1. Check converted images in public/assets/")
        print("   2. Update your property data to use local images")
        print("   3. Test the asset integration")
    else:
        print("\n⚠️  No files were converted successfully")
        print("   Check the error messages above")

if __name__ == "__main__":
    main() 