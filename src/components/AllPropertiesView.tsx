import React, { useState } from 'react';
import { Star, MapPin, Users, Bed, Bath, Calendar, Award, Sparkles, Heart, MessageCircle, Share2, Eye, ArrowRight, Home, Camera, Clock, Shield, CheckCircle, Grid, List } from 'lucide-react';
import { getAllPropertyDetails } from '../data/propertyDetails';

interface AllPropertiesViewProps {
  onPropertySelect?: (propertyId: number) => void;
  onBackToHome?: () => void;
}

const AllPropertiesView: React.FC<AllPropertiesViewProps> = ({ onPropertySelect, onBackToHome }) => {
  const [selectedProperty, setSelectedProperty] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const properties = getAllPropertyDetails();

  const handlePropertyClick = (propertyId: number) => {
    setSelectedProperty(propertyId);
    onPropertySelect?.(propertyId);
  };

  const getPropertyStatus = (property: any) => {
    if (property.host?.superhost) return 'Superhost';
    if (property.booking?.instantBookable) return 'Instant Book';
    return 'Available';
  };

  const getPropertyType = (property: any) => {
    return property.booking?.type || 'Entire place';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm-beige-50 via-sage-50 to-cream-50 py-4 sm:py-6 lg:py-8">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          {onBackToHome && (
            <div className="text-left mb-4">
              <button
                onClick={onBackToHome}
                className="flex items-center text-rust-600 hover:text-rust-700 font-medium text-sm sm:text-base"
              >
                ← Back to Home
              </button>
            </div>
          )}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">
            All Properties
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 mb-4 sm:mb-6 px-4">
            Explore our complete collection of enhanced properties with comprehensive details
          </p>
          
          {/* View Mode Toggle */}
          <div className="flex justify-center mb-4 sm:mb-6">
            <div className="bg-white rounded-lg p-1 shadow-sm">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors flex items-center gap-1 ${
                  viewMode === 'grid'
                    ? 'bg-rust-500 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Grid className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Grid View</span>
                <span className="sm:hidden">Grid</span>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors flex items-center gap-1 ${
                  viewMode === 'list'
                    ? 'bg-rust-500 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <List className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">List View</span>
                <span className="sm:hidden">List</span>
              </button>
            </div>
          </div>
        </div>

        {/* Properties Grid/List */}
        <div className={`${
          viewMode === 'grid' 
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6' 
            : 'space-y-4 sm:space-y-6'
        }`}>
          {properties.map((property) => (
            <div
              key={property.id}
              className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer ${
                selectedProperty === property.id ? 'ring-2 ring-rust-500' : ''
              } ${viewMode === 'list' ? 'flex flex-col sm:flex-row' : ''}`}
              onClick={() => handlePropertyClick(property.id)}
            >
              {/* Property Image */}
              <div className={`relative overflow-hidden ${viewMode === 'list' ? 'sm:w-1/3' : 'h-48 sm:h-56 lg:h-64'}`}>
                <img
                  src={property.hero.images[0] || 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'}
                  alt={property.name}
                  className={`w-full object-cover ${viewMode === 'list' ? 'h-48 sm:h-full' : 'h-full'}`}
                />
                <div className="absolute top-2 sm:top-3 left-2 sm:left-3">
                  <span className="bg-rust-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    {getPropertyStatus(property)}
                  </span>
                </div>
                <div className="absolute top-2 sm:top-3 right-2 sm:right-3">
                  <span className="bg-white/90 text-gray-800 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="hidden sm:inline">{property.hero.rating}</span>
                  </span>
                </div>
              </div>

              {/* Property Info */}
              <div className={`p-4 sm:p-6 ${viewMode === 'list' ? 'sm:flex-1' : ''}`}>
                <div className={`flex items-start justify-between mb-3 ${viewMode === 'list' ? 'sm:flex-col sm:items-start sm:gap-2' : ''}`}>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1 truncate">
                      {property.name}
                    </h3>
                    <div className="flex items-center text-gray-600 text-sm mb-2">
                      <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                      <span className="truncate">{property.hero.location}</span>
                    </div>
                  </div>
                  <div className={`text-right ${viewMode === 'list' ? 'sm:text-left' : ''}`}>
                    <div className="text-xl sm:text-2xl font-bold text-gray-900">
                      ₹{property.hero.price?.toLocaleString()}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600">per night</div>
                  </div>
                </div>

                {/* Property Type & Capacity */}
                <div className="flex items-center gap-2 sm:gap-4 mb-3 text-xs sm:text-sm text-gray-600">
                  <div className="flex items-center">
                    <Users className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                    <span className="hidden sm:inline">4 guests</span>
                    <span className="sm:hidden">4</span>
                  </div>
                  <div className="flex items-center">
                    <Bed className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                    <span className="hidden sm:inline">2 beds</span>
                    <span className="sm:hidden">2</span>
                  </div>
                  <div className="flex items-center">
                    <Bath className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                    <span className="hidden sm:inline">2 baths</span>
                    <span className="sm:hidden">2</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-xs sm:text-sm mb-4 line-clamp-2">
                  {property.story.content}
                </p>

                {/* Enhanced Features */}
                {property.hero.highlights && (
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                      {property.hero.highlights.slice(0, 3).map((highlight: string, index: number) => (
                        <span
                          key={index}
                          className="bg-rust-50 text-rust-700 px-2 py-1 rounded-full text-xs font-medium"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                )}



                {/* Property Details */}
                {property.booking && (
                  <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="w-3 h-3 mr-1" />
                      <span className="truncate">{property.booking.checkIn}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Shield className="w-3 h-3 mr-1" />
                      <span className="truncate">{property.booking.cancellationPolicy}</span>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center text-xs sm:text-sm text-gray-600">
                    <Eye className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                    <span className="hidden sm:inline">{property.hero.reviews_count} reviews</span>
                    <span className="sm:hidden">{property.hero.reviews_count}</span>
                  </div>
                  <button className="flex items-center text-rust-600 hover:text-rust-700 text-xs sm:text-sm font-medium">
                    <span className="hidden sm:inline">View Details</span>
                    <span className="sm:hidden">Details</span>
                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="mt-8 sm:mt-12 bg-white rounded-xl shadow-lg p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Property Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-rust-600">{properties.length}</div>
              <div className="text-xs sm:text-sm text-gray-600">Total Properties</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-moss-600">
                {properties.length}
              </div>
              <div className="text-xs sm:text-sm text-gray-600">Curated Properties</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-coral-600">
                {properties.filter(p => p.booking?.instantBookable).length}
              </div>
              <div className="text-xs sm:text-sm text-gray-600">Instant Book</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-teal-600">
                {properties.reduce((sum, p) => sum + p.hero.reviews_count, 0)}
              </div>
              <div className="text-xs sm:text-sm text-gray-600">Total Reviews</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllPropertiesView; 