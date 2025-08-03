// Asset mapping utility for property images
export interface PropertyAssets {
  propertyName: string;
  assetFolder: string;
  images: string[];
}

// Map property names to their asset folders
export const propertyAssetMap: Record<string, string> = {
  'Penthouse Sky Lounge': 'Sky Lounge',
  'Heritage Garden Cottage': 'Photos Bandra Cottage',
  'Studio Bandra': 'Little White Bandra Studio',
  'Art Loft Bandra': 'Bandra Art House',
  'Zen Suite': 'City Zen',
  // Add more mappings as needed
};

// Function to get asset path for a property
export const getPropertyAssets = (propertyName: string): string[] => {
  const assetFolder = propertyAssetMap[propertyName];
  if (!assetFolder) {
    console.warn(`No asset folder found for property: ${propertyName}`);
    return [];
  }
  
  // In a real implementation, you would import the images dynamically
  // For now, we'll return the folder path that can be used to construct image URLs
  return [`/src/asssets/${assetFolder}/`];
};

// Function to get all available property assets
export const getAllPropertyAssets = (): PropertyAssets[] => {
  return Object.entries(propertyAssetMap).map(([propertyName, assetFolder]) => ({
    propertyName,
    assetFolder,
    images: getPropertyAssets(propertyName)
  }));
};

// Function to convert HEIC files to web-compatible format
export const getImageUrl = (folderName: string, fileName: string): string => {
  // Remove .heic extension and assume we have web-compatible versions
  const baseName = fileName.replace(/\.(heic|HEIC)$/i, '');
  return `/src/asssets/${folderName}/${baseName}.jpg`; // Assuming converted to JPG
}; 