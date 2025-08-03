import React, { useState } from 'react';
import { MapPin, Star, Users, Bed, Bath, Wifi, Car, Shield, Heart, Eye } from 'lucide-react';
import { OptimizedImage, createResponsiveImage } from '../utils/imageOptimization';
import type { Database } from '../lib/database.types';

type Property = Database['public']['Tables']['properties']['Row'];

interface PropertyGridProps {
  properties: Property[];
  onPropertyClick?: (property: Property) => void;
  showFilters?: boolean;
  className?: string;
}

const PropertyGrid: React.FC<PropertyGridProps> = ({
  properties,
  onPropertyClick,
  showFilters = false,
  className = ''
}) => {
  const [hoveredProperty, setHoveredProperty] = useState<string | null>(null);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getPropertyImageUrls = (property: Property): string[] => {
    if (property.images && Array.isArray(property.images)) {
      return property.images.slice(0, 4); // Show first 4 images
    }
    return [];
  };

  const getPropertyFeatures = (property: Property) => {
    if (property.features && typeof property.features === 'object') {
      const features = property.features as any;
      return {
        amenities: features.amenities || [],
        rating: features.rating || 4.5,
        reviews_count: features.reviews_count || 0
      };
    }
    return {
      amenities: [],
      rating: 4.5,
      reviews_count: 0
    };
  };

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 ${className}`}>
      {properties.map((property) => {
        const imageUrls = getPropertyImageUrls(property);
        const features = getPropertyFeatures(property);
        const responsiveConfig = createResponsiveImage(
          imageUrls[0] || '',
          `${property.name} - ${property.location}`,
          'w-full h-40 sm:h-48 object-cover rounded-t-lg'
        );

        return (
          <div
            key={property.id}
            className="bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group overflow-hidden"
            onClick={() => onPropertyClick?.(property)}
            onMouseEnter={() => setHoveredProperty(property.id.toString())}
            onMouseLeave={() => setHoveredProperty(null)}
          >
            {/* Image Container */}
            <div className="relative overflow-hidden">
              {/* Optimized Image */}
              <OptimizedImage
                src={imageUrls[0] || ''}
                alt={`${property.name} - ${property.location}`}
                className="w-full h-40 sm:h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
                decoding="async"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Price Badge */}
              <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-white/95 backdrop-blur-sm rounded-full px-2 sm:px-3 py-1 sm:py-1.5 shadow-lg">
                <span className="text-primary-600 font-semibold text-xs sm:text-sm">
                  {property.category}
                </span>
                <span className="text-gray-500 text-xs">/night</span>
              </div>
              
              {/* Favorite Button */}
              <button className="absolute top-3 sm:top-4 left-3 sm:left-4 w-8 h-8 sm:w-10 sm:h-10 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-primary-50 transition-colors duration-200">
                <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 hover:text-primary-500 transition-colors" />
              </button>
              
              {/* Image Gallery Indicator */}
              {imageUrls.length > 1 && (
                <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 bg-black/70 backdrop-blur-sm rounded-full px-2 py-1">
                  <div className="flex items-center space-x-1">
                    <Eye className="w-2 h-2 sm:w-3 sm:h-3 text-white" />
                    <span className="text-white text-xs font-medium">
                      +{imageUrls.length - 1}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-3 sm:p-4">
              {/* Header */}
              <div className="mb-2 sm:mb-3">
                <h3 className="font-semibold text-gray-900 text-base sm:text-lg mb-1 line-clamp-1">
                  {property.name}
                </h3>
                <div className="flex items-center space-x-2 text-gray-600 text-xs sm:text-sm">
                  <MapPin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span className="line-clamp-1">{property.location}</span>
                </div>
              </div>

              {/* Rating & Reviews */}
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current" />
                    <span className="text-xs sm:text-sm font-medium text-gray-900">
                      {features.rating}
                    </span>
                  </div>
                  <span className="text-gray-500 text-xs sm:text-sm">
                    ({features.reviews_count} reviews)
                  </span>
                </div>
                <div className="flex items-center space-x-1 text-gray-600">
                  <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                  <span className="text-xs">Verified</span>
                </div>
              </div>

              {/* Property Details */}
              <div className="flex items-center justify-between text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
                <div className="flex items-center space-x-2 sm:space-x-4">
                  <div className="flex items-center space-x-1">
                    <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">{property.guests} guests</span>
                    <span className="sm:hidden">{property.guests}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Bed className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">{property.bedrooms} beds</span>
                    <span className="sm:hidden">{property.bedrooms}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Bath className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">{property.bathrooms} baths</span>
                    <span className="sm:hidden">{property.bathrooms}</span>
                  </div>
                </div>
              </div>

              {/* Amenities */}
              {features.amenities && features.amenities.length > 0 && (
                <div className="flex items-center space-x-2 sm:space-x-3 text-xs text-gray-500 mb-3 sm:mb-4">
                  {features.amenities.slice(0, 3).map((amenity: string, index: number) => (
                    <div key={index} className="flex items-center space-x-1">
                      {amenity.toLowerCase().includes('wifi') && <Wifi className="w-2 h-2 sm:w-3 sm:h-3" />}
                      {amenity.toLowerCase().includes('parking') && <Car className="w-2 h-2 sm:w-3 sm:h-3" />}
                      <span className="line-clamp-1 text-xs">{amenity}</span>
                    </div>
                  ))}
                  {features.amenities.length > 3 && (
                    <span className="text-gray-400 text-xs">+{features.amenities.length - 3} more</span>
                  )}
                </div>
              )}

              {/* Action Button */}
              <button
                className="w-full bg-primary-500 hover:bg-primary-600 text-white py-2 px-3 sm:px-4 rounded-lg font-medium transition-colors duration-200 transform hover:scale-105 active:scale-95 text-sm sm:text-base"
                onClick={(e) => {
                  e.stopPropagation();
                  onPropertyClick?.(property);
                }}
              >
                <span className="hidden sm:inline">View Details</span>
                <span className="sm:hidden">Details</span>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PropertyGrid;