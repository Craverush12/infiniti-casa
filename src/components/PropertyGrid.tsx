import React from 'react';
import { MapPin, Star, Users, Bed, Bath, Wifi, Car, Shield, Heart, Eye } from 'lucide-react';
import { OptimizedImage } from '../utils/imageOptimization';
import type { Database } from '../lib/database.types';
import type { PropertyDetailData } from '../data/propertyDetails';

type DbProperty = Database['public']['Tables']['properties']['Row'];
type GridProperty = DbProperty | PropertyDetailData;

interface PropertyGridProps {
  properties: GridProperty[];
  onPropertyClick?: (property: any) => void;
  className?: string;
}

const PropertyGrid: React.FC<PropertyGridProps> = ({
  properties,
  onPropertyClick,
  className = ''
}) => {
  // hover state removed for now to avoid unused warnings

  // price formatting not used in current card design

  const isDetailData = (p: any): p is PropertyDetailData => {
    return p && typeof p === 'object' && p.hero && Array.isArray(p.hero.images);
  };

  const getPropertyImageUrls = (property: GridProperty): string[] => {
    if (isDetailData(property)) {
      return (property.hero.images || []).slice(0, 4);
    }
    const p = property as DbProperty;
    if (p.images && Array.isArray(p.images)) {
      return p.images.slice(0, 4);
    }
    return [];
  };

  const getPropertyFeatures = (property: GridProperty) => {
    if (isDetailData(property)) {
      return {
        amenities: property.amenities?.features || [],
        rating: property.hero?.rating ?? 0,
        reviews_count: property.hero?.reviews_count ?? 0
      };
    }
    const p = property as DbProperty;
    if (p.features && typeof p.features === 'object') {
      const features = p.features as any;
      return {
        amenities: features.amenities || [],
        rating: features.rating || 4.5,
        reviews_count: features.reviews_count || 0
      };
    }
    return {
      amenities: [],
      rating: 0,
      reviews_count: 0
    };
  };

  const getLocationString = (property: GridProperty): string => {
    if (isDetailData(property)) {
      return property.hero?.location || '';
    }
    const p = property as DbProperty;
    return typeof p.location === 'string' ? p.location : '';
  };

  const getCategoryLabel = (property: GridProperty): string => {
    if (isDetailData(property)) {
      return property.amenities?.categories?.[0] || 'Featured';
    }
    const p = property as DbProperty;
    return (p as any).category || 'Featured';
  };

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${className}`}>
      {properties.map((property) => {
        const imageUrls = getPropertyImageUrls(property);
        const features = getPropertyFeatures(property);
        // image optimization handled by OptimizedImage below

        return (
          <div
            key={(property as any).id}
            className="relative cursor-pointer group overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white/90 flex flex-col h-[460px] md:h-[480px]"
            onClick={() => onPropertyClick?.(property)}
            onMouseEnter={() => {}}
            onMouseLeave={() => {}}
          >
            {/* Subtle textured background */}
            <div
              className="absolute inset-0 opacity-[0.08] pointer-events-none"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cg fill='%23000000'%3E%3Ccircle cx='2' cy='2' r='1'/%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3Ccircle cx='58' cy='58' r='1'/%3E%3C/g%3E%3C/svg%3E\")",
                backgroundSize: '60px 60px'
              }}
            />
            {/* Image Container */}
            <div className="relative overflow-hidden h-52 md:h-56">
              {/* Optimized Image */}
              <OptimizedImage
                src={imageUrls[0] || ''}
                alt={`${(property as any).name} - ${getLocationString(property)}`}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
                decoding="async"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              
              {/* Overlay always-on for info visibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              
              {/* Category Badge */}
              <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-white/80 backdrop-blur-sm rounded-full px-2 sm:px-3 py-1 sm:py-1.5 shadow-lg border border-white/40">
                <span className="text-primary-700 font-semibold text-xs sm:text-sm">{getCategoryLabel(property)}</span>
              </div>
              
              {/* Favorite Button */}
              <button className="absolute top-3 sm:top-4 left-3 sm:left-4 w-8 h-8 sm:w-10 sm:h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-primary-50 border border-white/40 transition-colors duration-200">
                <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-gray-700 hover:text-primary-500 transition-colors" />
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

            {/* Content - flex column to pin CTA to bottom */}
            <div className="relative p-4 sm:p-5 flex flex-col flex-1">
              <div
                className="absolute inset-0 rounded-b-2xl opacity-[0.06] pointer-events-none"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Cpath d='M0 60 Q30 30 60 60 T120 60' stroke='%23000' stroke-width='1' fill='none'/%3E%3C/svg%3E\")",
                  backgroundSize: '120px 120px'
                }}
              />
              {/* Header */}
              <div className="mb-2 sm:mb-3">
                <h3 className="font-semibold text-gray-900 text-base sm:text-lg mb-1 line-clamp-2">
                  {(property as any).name}
                </h3>
                <div className="flex items-center space-x-2 text-gray-700 text-xs sm:text-sm">
                  <MapPin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span className="line-clamp-1">{getLocationString(property)}</span>
                </div>
              </div>

              {/* Rating & Reviews */}
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current" />
                      <span className="text-xs sm:text-sm font-medium text-gray-800">
                      {features.rating}
                    </span>
                  </div>
                    <span className="text-gray-600 text-xs sm:text-sm">
                    ({features.reviews_count} reviews)
                  </span>
                </div>
                  <div className="flex items-center space-x-1 text-gray-700">
                  <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                  <span className="text-xs">Verified</span>
                </div>
              </div>

              {/* Property Details */}
              <div className="flex items-center justify-between text-xs sm:text-sm text-gray-700 mb-3 sm:mb-4">
                <div className="flex items-center space-x-2 sm:space-x-4">
                  {/* Suppress DB-specific counts when using detail data */}
                  {(property as any).guests != null && (
                    <div className="flex items-center space-x-1">
                      <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="hidden sm:inline">{(property as any).guests} guests</span>
                      <span className="sm:hidden">{(property as any).guests}</span>
                    </div>
                  )}
                  {(property as any).bedrooms != null && (
                    <div className="flex items-center space-x-1">
                      <Bed className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="hidden sm:inline">{(property as any).bedrooms} beds</span>
                      <span className="sm:hidden">{(property as any).bedrooms}</span>
                    </div>
                  )}
                  {(property as any).bathrooms != null && (
                    <div className="flex items-center space-x-1">
                      <Bath className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="hidden sm:inline">{(property as any).bathrooms} baths</span>
                      <span className="sm:hidden">{(property as any).bathrooms}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Amenities (limit to 2 for consistent height) */}
              {features.amenities && features.amenities.length > 0 && (
                <div className="flex items-center space-x-2 sm:space-x-3 text-xs text-gray-600 mb-3 sm:mb-4">
                  {features.amenities.slice(0, 2).map((amenity: string, index: number) => (
                    <div key={index} className="flex items-center space-x-1">
                      {amenity.toLowerCase().includes('wifi') && <Wifi className="w-2 h-2 sm:w-3 sm:h-3" />}
                      {amenity.toLowerCase().includes('parking') && <Car className="w-2 h-2 sm:w-3 sm:h-3" />}
                      <span className="line-clamp-1 text-xs">{amenity}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Action Button */}
              <button
                className="mt-auto w-full btn-glass-primary py-2.5 px-4 rounded-lg font-medium transform hover:scale-105 active:scale-95 text-sm sm:text-base"
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