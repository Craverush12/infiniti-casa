import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const ASSETS_DIR = path.join(__dirname, '../src/asssets');
const OUTPUT_DIR = path.join(__dirname, '../public/assets');

// Property mapping
const PROPERTY_ASSET_MAP = {
  'Sky Lounge': 'Penthouse Sky Lounge',
  'Photos Bandra Cottage': 'Heritage Garden Cottage',
  'Little White Bandra Studio': 'Studio Bandra',
  'Bandra Art House': 'Art Loft Bandra',
  'City Zen': 'Zen Suite',
  'India House': 'India House'
};

// Function to get all HEIC files from a directory
function getHeicFiles(dirPath) {
  const files = fs.readdirSync(dirPath);
  return files.filter(file => 
    file.toLowerCase().endsWith('.heic') || 
    file.toLowerCase().endsWith('.HEIC')
  );
}

// Function to generate web-compatible image URLs
function generateImageUrls(folderName, heicFiles) {
  return heicFiles.map(file => {
    const baseName = file.replace(/\.(heic|HEIC)$/i, '');
    return `/assets/${folderName}/${baseName}.jpg`;
  });
}

// Function to create asset mapping
function createAssetMapping() {
  const assetMapping = {};
  
  // Read all asset folders
  const assetFolders = fs.readdirSync(ASSETS_DIR);
  
  assetFolders.forEach(folder => {
    const folderPath = path.join(ASSETS_DIR, folder);
    if (fs.statSync(folderPath).isDirectory()) {
      const heicFiles = getHeicFiles(folderPath);
      const imageUrls = generateImageUrls(folder, heicFiles);
      
      const propertyName = PROPERTY_ASSET_MAP[folder];
      if (propertyName) {
        assetMapping[propertyName] = {
          assetFolder: folder,
          images: imageUrls,
          imageCount: heicFiles.length
        };
      }
    }
  });
  
  return assetMapping;
}

// Function to generate TypeScript asset mapping
function generateTypeScriptMapping() {
  const mapping = createAssetMapping();
  
  let tsCode = `// Auto-generated asset mapping
export const PROPERTY_ASSETS = ${JSON.stringify(mapping, null, 2)} as const;

export const getPropertyAssets = (propertyName: string) => {
  return PROPERTY_ASSETS[propertyName as keyof typeof PROPERTY_ASSETS] || null;
};

export const getAllPropertyAssets = () => {
  return Object.entries(PROPERTY_ASSETS).map(([propertyName, assets]) => ({
    propertyName,
    ...assets
  }));
};
`;
  
  return tsCode;
}

// Function to create output directories
function createOutputDirectories() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
  
  const assetFolders = fs.readdirSync(ASSETS_DIR);
  assetFolders.forEach(folder => {
    const folderPath = path.join(ASSETS_DIR, folder);
    if (fs.statSync(folderPath).isDirectory()) {
      const outputFolder = path.join(OUTPUT_DIR, folder);
      if (!fs.existsSync(outputFolder)) {
        fs.mkdirSync(outputFolder, { recursive: true });
      }
    }
  });
}

// Main execution
function main() {
  console.log('🔍 Scanning asset folders...');
  
  // Create output directories
  createOutputDirectories();
  
  // Generate asset mapping
  const mapping = createAssetMapping();
  
  console.log('📊 Asset mapping found:');
  Object.entries(mapping).forEach(([propertyName, assets]) => {
    console.log(`  ${propertyName}: ${assets.imageCount} images in ${assets.assetFolder}`);
  });
  
  // Generate TypeScript mapping
  const tsCode = generateTypeScriptMapping();
  const outputPath = path.join(__dirname, '../src/utils/generatedAssets.ts');
  fs.writeFileSync(outputPath, tsCode);
  
  console.log(`✅ Generated asset mapping: ${outputPath}`);
  console.log(`📁 Created output directories: ${OUTPUT_DIR}`);
  console.log('\n📝 Next steps:');
  console.log('1. Convert HEIC files to JPG/WebP using an image converter');
  console.log('2. Place converted images in public/assets/[folder-name]/');
  console.log('3. Update the asset URLs in your property data');
}

// Run the script
main(); 