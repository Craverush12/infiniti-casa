import React, { useState } from 'react';
import { Search, Filter, MapPin, Star, Heart, Share2, Grid, List, ArrowLeft } from 'lucide-react';
import PropertyDetailGrid from './PropertyDetailGrid';
import type { PropertyDetailData } from '../data/propertyDetails';

interface DedicatedPropertiesPageProps {
  properties: PropertyDetailData[];
  onPropertyClick: (property: PropertyDetailData) => void;
  onBackToHome: () => void;
}

const DedicatedPropertiesPage: React.FC<DedicatedPropertiesPageProps> = ({
  properties,
  onPropertyClick,
  onBackToHome
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    priceRange: [0, 50000],
    location: '',
    guests: 1
  });

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         property.hero.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesPrice = property.hero.price >= filters.priceRange[0] && 
                        property.hero.price <= filters.priceRange[1];
    
    const matchesLocation = !filters.location || 
                           property.hero.location.toLowerCase().includes(filters.location.toLowerCase());
    
    // Note: PropertyDetailData doesn't have guests field, so we'll skip that filter
    return matchesSearch && matchesPrice && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm-beige-50 via-sage-50 to-cream-50 pt-20">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={onBackToHome}
                className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Our Properties</h1>
                <p className="text-gray-600 mt-1">Discover our curated collection of exceptional stays</p>
              </div>
            </div>
            
            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-primary-100 text-primary-600' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-primary-100 text-primary-600' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            {/* Search Bar */}
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search properties by name or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>

            {/* Price Range Filter */}
            <div>
              <select
                value={filters.priceRange[1]}
                onChange={(e) => setFilters(prev => ({ ...prev, priceRange: [0, parseInt(e.target.value)] }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value={50000}>Any Price</option>
                <option value={5000}>Under ₹5,000</option>
                <option value={10000}>Under ₹10,000</option>
                <option value={15000}>Under ₹15,000</option>
                <option value={25000}>Under ₹25,000</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            {filteredProperties.length} of {properties.length} properties
          </p>
        </div>

        {/* Properties Grid */}
        {filteredProperties.length > 0 ? (
          <PropertyDetailGrid 
            properties={filteredProperties}
            onPropertyClick={onPropertyClick}
            className=""
          />
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🏠</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No properties found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search criteria
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setFilters({ priceRange: [0, 50000], location: '', guests: 1 });
              }}
              className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DedicatedPropertiesPage; 