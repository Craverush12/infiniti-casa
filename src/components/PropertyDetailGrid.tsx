import React, { useState } from 'react';
import { MapPin, Star, Users, Bed, Bath, Wifi, Car, Shield, Heart, Eye } from 'lucide-react';
import { OptimizedImage, createResponsiveImage } from '../utils/imageOptimization';
import type { PropertyDetailData } from '../data/propertyDetails';

interface PropertyDetailGridProps {
  properties: PropertyDetailData[];
  onPropertyClick?: (property: PropertyDetailData) => void;
  showFilters?: boolean;
  className?: string;
}

const PropertyDetailGrid: React.FC<PropertyDetailGridProps> = ({
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

  const getPropertyImageUrls = (property: PropertyDetailData): string[] => {
    if (property.hero.images && Array.isArray(property.hero.images)) {
      return property.hero.images.slice(0, 4); // Show first 4 images
    }
    return [];
  };

  const getPropertyFeatures = (property: PropertyDetailData) => {
    return {
      amenities: property.amenities.features || [],
      rating: property.hero.rating || 4.5,
      reviews_count: property.hero.reviews_count || 0
    };
  };

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${className}`}>
      {properties.map((property) => {
        const imageUrls = getPropertyImageUrls(property);
        const features = getPropertyFeatures(property);

        return (
          <div
            key={property.id}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group overflow-hidden flex flex-col h-full"
            onClick={() => onPropertyClick?.(property)}
            onMouseEnter={() => setHoveredProperty(property.id.toString())}
            onMouseLeave={() => setHoveredProperty(null)}
          >
            {/* Image Container - Fixed Height */}
            <div className="relative overflow-hidden h-48 sm:h-56">
              {/* Optimized Image */}
              <OptimizedImage
                src={imageUrls[0] || ''}
                alt={`${property.name} - ${property.hero.location}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
                decoding="async"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Price Badge */}
              <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-lg">
                <span className="text-primary-600 font-semibold text-sm">
                  {formatPrice(property.hero.price)}
                </span>
                <span className="text-gray-500 text-xs">/night</span>
              </div>
              
              {/* Favorite Button */}
              <button className="absolute top-3 left-3 w-10 h-10 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-primary-50 transition-colors duration-200">
                <Heart className="w-4 h-4 text-gray-600 hover:text-primary-500 transition-colors" />
              </button>
            </div>

            {/* Content - Flex Grow to Fill Space */}
            <div className="p-4 sm:p-6 flex flex-col flex-grow">
              {/* Title and Location */}
              <div className="mb-3">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[3rem]">
                  {property.name}
                </h3>
                <div className="flex items-center text-gray-600 text-sm">
                  <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                  <span className="line-clamp-1">{property.hero.location}</span>
                </div>
              </div>

              {/* Rating and Reviews */}
              <div className="flex items-center mb-3">
                <Star className="w-4 h-4 text-yellow-400 mr-1" />
                <span className="text-sm font-medium text-gray-900">
                  {features.rating}
                </span>
                <span className="text-sm text-gray-500 ml-1">
                  ({features.reviews_count} reviews)
                </span>
              </div>

              {/* Amenities - Fixed Height */}
              <div className="flex flex-wrap gap-2 mb-4 min-h-[2rem]">
                {features.amenities.slice(0, 3).map((amenity, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                  >
                    {amenity}
                  </span>
                ))}
                {features.amenities.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                    +{features.amenities.length - 3} more
                  </span>
                )}
              </div>

              {/* Price and Button - Push to Bottom */}
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                <div>
                  <span className="text-lg font-bold text-gray-900">
                    {formatPrice(property.hero.price)}
                  </span>
                  <span className="text-sm text-gray-500"> / night</span>
                </div>
                
                {/* View Details Button */}
                <button
                  onClick={() => onPropertyClick?.(property)}
                  className="px-4 py-2 bg-primary-600 text-white text-sm rounded-lg hover:bg-primary-700 transition-colors"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PropertyDetailGrid; 