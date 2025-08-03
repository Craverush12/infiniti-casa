import React from 'react';
import { getPropertyImageUrls } from '../utils/propertyAssets';

const AssetTestPage: React.FC = () => {
  const testProperties = [
    'Sky Lounge',
    'The Little White Bandra Studio',
    'India House',
    'City Zen',
    'Bandra Cottage',
    'The Bandra Art House'
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Asset Test Page</h1>
        
        {testProperties.map((propertyName) => {
          const images = getPropertyImageUrls(propertyName);
          
          return (
            <div key={propertyName} className="mb-8 p-6 bg-white rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">{propertyName}</h2>
              <p className="text-sm text-gray-600 mb-4">
                Found {images.length} images
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {images.slice(0, 8).map((imageUrl, index) => (
                  <div key={index} className="relative">
                    <img
                      src={imageUrl}
                      alt={`${propertyName} - Image ${index + 1}`}
                      className="w-full h-32 object-cover rounded"
                      onError={(e) => {
                        console.error(`Failed to load image: ${imageUrl}`);
                        e.currentTarget.style.border = '2px solid red';
                      }}
                      onLoad={() => {
                        console.log(`Successfully loaded image: ${imageUrl}`);
                      }}
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1">
                      {imageUrl.split('/').pop()}
                    </div>
                  </div>
                ))}
              </div>
              
              {images.length === 0 && (
                <div className="text-red-500">
                  No images found for this property
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AssetTestPage; 