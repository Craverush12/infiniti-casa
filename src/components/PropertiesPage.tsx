import React, { useState } from 'react';
import { Search, Filter, MapPin, Star, Heart, Share2, Grid, List } from 'lucide-react';
import PropertyGrid from './PropertyGrid';
import PropertyFilters from './PropertyFilters';
import type { PropertyDetailData } from '../data/propertyDetails';

interface PropertiesPageProps {
  properties: PropertyDetailData[];
}

const PropertiesPage: React.FC<PropertiesPageProps> = ({ properties }) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    priceRange: [0, 50000],
    location: '',
    amenities: [] as string[],
    propertyType: '',
    guests: 1
  });

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         property.hero.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesPrice = property.hero.price >= filters.priceRange[0] && 
                        property.hero.price <= filters.priceRange[1];
    
    const matchesLocation = !filters.location || 
                           property.hero.location.toLowerCase().includes(filters.location.toLowerCase());
    
    const matchesGuests = property.amenities.guests >= filters.guests;
    
    return matchesSearch && matchesPrice && matchesLocation && matchesGuests;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm-beige-50 via-sage-50 to-cream-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Our Properties</h1>
              <p className="text-gray-600 mt-1">Discover our curated collection of exceptional stays</p>
            </div>
            
            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-rust-100 text-rust-600' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-rust-100 text-rust-600' 
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
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <PropertyFilters filters={filters} onFiltersChange={setFilters} />
          </div>

          {/* Properties Grid */}
          <div className="lg:col-span-3">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search properties by name or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rust-500 focus:border-rust-500"
                />
              </div>
            </div>

            {/* Results Count */}
            <div className="mb-6">
              <p className="text-gray-600">
                {filteredProperties.length} of {properties.length} properties
              </p>
            </div>

            {/* Properties Grid/List */}
            <PropertyGrid 
              properties={filteredProperties} 
              viewMode={viewMode}
              className=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertiesPage; 