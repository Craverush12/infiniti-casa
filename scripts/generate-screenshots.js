import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Simple PNG data for placeholder screenshots
const createPlaceholderPNG = () => {
  // This is a minimal 1x1 blue PNG encoded in base64
  const base64PNG = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';
  return Buffer.from(base64PNG, 'base64');
};

// Generate screenshots
const generateScreenshots = () => {
  const screenshotsDir = path.join(__dirname, '../public/screenshots');
  
  // Ensure screenshots directory exists
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }
  
  const screenshots = [
    'desktop-1.png',
    'mobile-1.png'
  ];
  
  screenshots.forEach(filename => {
    const filepath = path.join(screenshotsDir, filename);
    const pngData = createPlaceholderPNG();
    fs.writeFileSync(filepath, pngData);
    console.log(`Generated: ${filename}`);
  });
  
  console.log('Screenshot generation complete!');
};

// Run the script
generateScreenshots(); 