import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Star, Heart, Share2, ArrowRight } from 'lucide-react';
import { getAllPropertyDetails, getPropertyDetail } from '../data/propertyDetails';
import type { PropertyDetailData } from '../data/propertyDetails';

interface PropertyNavigationProps {
  currentPropertyId: number;
  onPropertySelect: (propertyId: number) => void;
  onBackToHome: () => void;
}

const PropertyNavigation: React.FC<PropertyNavigationProps> = ({ 
  currentPropertyId, 
  onPropertySelect, 
  onBackToHome 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const allProperties = getAllPropertyDetails();
  const currentIndex = allProperties.findIndex(p => p.id === currentPropertyId);
  
  const nextProperty = allProperties[(currentIndex + 1) % allProperties.length];
  const prevProperty = allProperties[currentIndex === 0 ? allProperties.length - 1 : currentIndex - 1];

  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString()}`;
  };

  return (
    <div className="fixed bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4 z-50">
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
        {/* Main Navigation Bar */}
        <div className="flex items-center justify-between p-3 sm:p-4">
          {/* Previous Property */}
          <button
            onClick={() => onPropertySelect(prevProperty.id)}
            className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 rounded-lg sm:rounded-xl hover:bg-gray-50 transition-colors group min-w-0"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-gray-600 flex-shrink-0" />
            <div className="hidden sm:block text-left min-w-0">
              <div className="text-xs sm:text-sm text-gray-500">Previous</div>
              <div className="font-medium text-gray-900 truncate max-w-24 sm:max-w-32 text-xs sm:text-sm">
                {prevProperty.name}
              </div>
            </div>
          </button>

          {/* Current Property Info */}
          <div className="flex items-center space-x-2 sm:space-x-4 flex-1 justify-center min-w-0">
            <div className="text-center">
              <div className="text-xs sm:text-sm text-gray-500">
                Property {currentIndex + 1} of {allProperties.length}
              </div>
              <div className="font-semibold text-gray-900 text-sm sm:text-base truncate max-w-32 sm:max-w-48">
                {getPropertyDetail(currentPropertyId)?.name}
              </div>
            </div>
          </div>

          {/* Next Property */}
          <button
            onClick={() => onPropertySelect(nextProperty.id)}
            className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 rounded-lg sm:rounded-xl hover:bg-gray-50 transition-colors group min-w-0"
          >
            <div className="hidden sm:block text-right min-w-0">
              <div className="text-xs sm:text-sm text-gray-500">Next</div>
              <div className="font-medium text-gray-900 truncate max-w-24 sm:max-w-32 text-xs sm:text-sm">
                {nextProperty.name}
              </div>
            </div>
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-gray-600 flex-shrink-0" />
          </button>

          {/* Action Buttons */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            <button className="p-2 rounded-lg hover:bg-gray-50 transition-colors">
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
            </button>
            <button className="p-2 rounded-lg hover:bg-gray-50 transition-colors">
              <Share2 className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
            </button>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <ArrowRight className={`w-4 h-4 sm:w-5 sm:h-5 text-gray-600 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
            </button>
          </div>
        </div>

        {/* Expanded Property Grid */}
        {isExpanded && (
          <div className="border-t border-gray-200 p-3 sm:p-4 bg-gray-50">
            <div className="mb-3 sm:mb-4">
              <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">All Properties</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
                {allProperties.map((property) => (
                  <button
                    key={property.id}
                    onClick={() => {
                      onPropertySelect(property.id);
                      setIsExpanded(false);
                    }}
                    className={`text-left p-2 sm:p-3 rounded-lg transition-all ${
                      property.id === currentPropertyId
                        ? 'bg-rust-100 border-2 border-rust-500'
                        : 'bg-white hover:bg-gray-50 border border-gray-200'
                    }`}
                  >
                    <div className="relative mb-2">
                      <img
                        src={property.hero.images[0]}
                        alt={property.name}
                        className="w-full h-16 sm:h-20 object-cover rounded-lg"
                      />
                      {property.id === currentPropertyId && (
                        <div className="absolute top-1 right-1 bg-rust-500 text-white text-xs px-1 sm:px-2 py-1 rounded-full">
                          Current
                        </div>
                      )}
                    </div>
                    <div className="space-y-1">
                      <div className="font-medium text-xs sm:text-sm text-gray-900 truncate">
                        {property.name}
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-2 h-2 sm:w-3 sm:h-3 text-gray-400 flex-shrink-0" />
                        <span className="text-xs text-gray-600 truncate">
                          {property.hero.location}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          <Star className="w-2 h-2 sm:w-3 sm:h-3 text-yellow-400 fill-yellow-400" />
                          <span className="text-xs text-gray-600">
                            {property.hero.rating}
                          </span>
                        </div>
                        <span className="text-xs font-medium text-gray-900">
                          {formatPrice(property.hero.price)}
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Back to Home Button */}
            <div className="text-center">
              <button
                onClick={onBackToHome}
                className="bg-rust-600 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-rust-700 transition-colors text-sm sm:text-base"
              >
                Back to Home
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyNavigation; 