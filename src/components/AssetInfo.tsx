import React from 'react';
import { getPropertyAssetInfo, getAssetFolderStructure } from '../utils/propertyAssets';

interface AssetInfoProps {
  propertyName?: string;
}

const AssetInfo: React.FC<AssetInfoProps> = ({ propertyName }) => {
  const assetStructure = getAssetFolderStructure();

  if (propertyName) {
    const assetInfo = getPropertyAssetInfo(propertyName);
    
    if (!assetInfo) {
      return (
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h3 className="text-lg font-semibold text-yellow-800">No Assets Found</h3>
          <p className="text-yellow-700">No asset folder found for property: {propertyName}</p>
        </div>
      );
    }

    return (
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800">Asset Information</h3>
                 <div className="mt-2 space-y-2">
           <p><strong>Property:</strong> {assetInfo.propertyName}</p>
           <p><strong>Asset Folder:</strong> {assetInfo.assetFolder}</p>
           <p><strong>HEIC Files:</strong> {assetInfo.heicFiles.length} files available</p>
           <p><strong>Converted Images:</strong> {assetInfo.placeholderImages.length} images</p>
         </div>
        
        <div className="mt-4">
          <h4 className="font-medium text-blue-700">HEIC Files:</h4>
          <ul className="mt-1 text-sm text-blue-600">
            {assetInfo.heicFiles.map((file, index) => (
              <li key={index} className="font-mono">{file}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
      <h3 className="text-lg font-semibold text-green-800">Asset Structure</h3>
      <div className="mt-2 space-y-2">
        {assetStructure.map((asset, index) => (
          <div key={index} className="p-2 bg-white rounded border">
            <p><strong>Property:</strong> {asset.propertyName}</p>
            <p><strong>Asset Folder:</strong> {asset.assetFolder}</p>
            <p><strong>Status:</strong> {asset.hasAssets ? '✅ Assets Available' : '❌ No Assets'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssetInfo; 