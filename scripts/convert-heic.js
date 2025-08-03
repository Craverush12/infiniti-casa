import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const ASSETS_DIR = path.join(__dirname, '../src/asssets');
const OUTPUT_DIR = path.join(__dirname, '../public/assets');

// Function to get all HEIC files recursively
function getHeicFiles(dirPath) {
  const files = [];
  const items = fs.readdirSync(dirPath);
  
  for (const item of items) {
    const fullPath = path.join(dirPath, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      files.push(...getHeicFiles(fullPath));
    } else if (item.toLowerCase().endsWith('.heic') || item.toLowerCase().endsWith('.HEIC')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

// Function to create conversion instructions
function generateConversionInstructions() {
  console.log('📋 HEIC to Web Format Conversion Instructions\n');
  
  const assetFolders = fs.readdirSync(ASSETS_DIR);
  
  assetFolders.forEach(folder => {
    const folderPath = path.join(ASSETS_DIR, folder);
    if (fs.statSync(folderPath).isDirectory()) {
      const heicFiles = getHeicFiles(folderPath);
      
      if (heicFiles.length > 0) {
        console.log(`📁 ${folder} (${heicFiles.length} files):`);
        
        // Create output directory
        const outputFolder = path.join(OUTPUT_DIR, folder);
        if (!fs.existsSync(outputFolder)) {
          fs.mkdirSync(outputFolder, { recursive: true });
        }
        
        heicFiles.forEach(file => {
          const fileName = path.basename(file);
          const baseName = fileName.replace(/\.(heic|HEIC)$/i, '');
          const outputPath = path.join(outputFolder, `${baseName}.jpg`);
          
                     console.log(`  Convert: ${fileName} → ${baseName}.jpg`);
           console.log(`  Command: magick "${file}" "${outputPath}"`);
           console.log(`  Or use: "C:\\Program Files\\ImageMagick-7.0.11-Q16\\magick.exe" "${file}" "${outputPath}"`);
        });
        
        console.log('');
      }
    }
  });
  
  console.log('🛠️  Windows Conversion Options:');
  console.log('1. Use online converters: https://convertio.co/heic-jpg/');
  console.log('2. Use ImageMagick (Windows): https://imagemagick.org/script/download.php#windows');
  console.log('3. Use IrfanView: https://www.irfanview.com/ (free image viewer with HEIC support)');
  console.log('4. Use Windows Photos app: Open HEIC → Save as JPG');
  console.log('5. Use PowerShell with ImageMagick: magick input.heic output.jpg');
  console.log('6. Use batch conversion with ImageMagick: magick mogrify -format jpg *.heic');
  console.log('');
  console.log('📁 Output directory created: public/assets/');
  console.log('📝 After conversion, images will be served from /assets/');
}

// Function to create a simple HTML viewer for testing
function createAssetViewer() {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Property Assets Viewer</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .property { margin-bottom: 40px; }
        .property h2 { color: #333; }
        .images { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 10px; }
        .image { width: 100%; height: 150px; object-fit: cover; border-radius: 8px; }
        .placeholder { background: #f0f0f0; display: flex; align-items: center; justify-content: center; color: #666; }
    </style>
</head>
<body>
    <h1>Property Assets Viewer</h1>
    <div id="properties"></div>
    
    <script>
        const properties = [
            { name: 'Penthouse Sky Lounge', folder: 'Sky Lounge' },
            { name: 'Heritage Garden Cottage', folder: 'Photos Bandra Cottage' },
            { name: 'Studio Bandra', folder: 'Little White Bandra Studio' },
            { name: 'Art Loft Bandra', folder: 'Bandra Art House' },
            { name: 'Zen Suite', folder: 'City Zen' },
            { name: 'India House', folder: 'India House' }
        ];
        
        properties.forEach(property => {
            const div = document.createElement('div');
            div.className = 'property';
            div.innerHTML = \`
                <h2>\${property.name}</h2>
                <p>Folder: \${property.folder}</p>
                <div class="images">
                    <div class="placeholder">Convert HEIC files to JPG and place in /assets/\${property.folder}/</div>
                </div>
            \`;
            document.getElementById('properties').appendChild(div);
        });
    </script>
</body>
</html>`;
  
  const outputPath = path.join(__dirname, '../public/asset-viewer.html');
  fs.writeFileSync(outputPath, html);
  console.log(`📄 Created asset viewer: public/asset-viewer.html`);
}

// Main execution
function main() {
  console.log('🔍 Scanning for HEIC files...\n');
  
  // Create output directories
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
  
  // Generate conversion instructions
  generateConversionInstructions();
  
  // Create asset viewer
  createAssetViewer();
  
  console.log('✅ Setup complete!');
  console.log('📝 Next steps:');
  console.log('1. Convert HEIC files using the commands above');
  console.log('2. Place converted JPG files in public/assets/[folder-name]/');
  console.log('3. Test the asset viewer at http://localhost:5173/asset-viewer.html');
}

main(); 