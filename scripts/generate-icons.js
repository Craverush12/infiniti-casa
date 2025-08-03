import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Icon sizes needed
const iconSizes = [72, 96, 128, 144, 152, 192, 384, 512];

// Simple PNG data for a blue square icon (base64 encoded minimal PNG)
const createSimplePNG = (size) => {
  // This is a minimal 1x1 blue PNG encoded in base64
  const base64PNG = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';
  
  // For now, we'll create a simple text file as placeholder
  // In a real implementation, you'd use a library like sharp or canvas to generate proper PNGs
  return Buffer.from(base64PNG, 'base64');
};

// Generate icons
const generateIcons = () => {
  const iconsDir = path.join(__dirname, '../public/icons');
  
  // Ensure icons directory exists
  if (!fs.existsSync(iconsDir)) {
    fs.mkdirSync(iconsDir, { recursive: true });
  }
  
  iconSizes.forEach(size => {
    const filename = `icon-${size}x${size}.png`;
    const filepath = path.join(iconsDir, filename);
    
    // Create a simple placeholder file
    const pngData = createSimplePNG(size);
    fs.writeFileSync(filepath, pngData);
    
    console.log(`Generated: ${filename}`);
  });
  
  console.log('Icon generation complete!');
};

// Run the script
generateIcons(); 