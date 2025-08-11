import React, { useState } from 'react';
import { Search, Grid, List, Sparkles, Star, MapPin } from 'lucide-react';
import PropertyGrid from './PropertyGrid';
import PropertyFilters from './PropertyFilters';
import PropertiesImmersive from './PropertiesImmersive';
import type { PropertyDetailData } from '../data/propertyDetails';
import Footer from './Footer';
import MosaicPropertyGrid from './MosaicPropertyGrid';

interface PropertiesPageProps {
  properties: PropertyDetailData[];
  onPropertyClick?: (property: PropertyDetailData) => void;
}

const PropertiesPage: React.FC<PropertiesPageProps> = ({ properties, onPropertyClick }) => {
  const [viewMode, setViewMode] = useState<'immersive' | 'grid' | 'list'>('immersive');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
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
    
    // PropertyDetailData has no guests field; skip guests filter
    return matchesSearch && matchesPrice && matchesLocation;
  });

  if (viewMode === 'immersive') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cream-50 via-white to-sage-50">
        {/* Top sticky title and toggle */}
       
        {/* Smooth, deterministic animations are controlled inside PropertiesImmersive; no additional effects here */}
        <PropertiesImmersive properties={filteredProperties as any} onPropertyClick={onPropertyClick as any} />
        {/* Floating global view toggle (always accessible) */}
        <div className="fixed bottom-6 right-4 z-50">
          <div className="backdrop-blur-md bg-white/90 border border-gray-200 rounded-full p-1 flex items-center gap-1 shadow-lg" role="group" aria-label="Change properties view">
            <button
              onClick={() => setViewMode('immersive')}
              className={`px-3 py-1.5 rounded-full text-sm ${viewMode === 'immersive' ? 'bg-primary-100 text-primary-700' : 'text-gray-700 hover:bg-gray-100'}`}
              aria-label="Immersive view"
            >
              Immersive
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 rounded-full text-sm ${viewMode === 'grid' ? 'bg-primary-100 text-primary-700' : 'text-gray-700 hover:bg-gray-100'}`}
              aria-label="Grid view"
            >
              Grid
            </button>
            {/* List view removed per request */}
          </div>
        </div>
        {/* Page Footer */}
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-white to-sage-50">
      {/* Narrative Hero */}
      <section className="relative overflow-hidden min-h-screen sm:min-h-0">
        <div className="absolute inset-0 pointer-events-none">
          <div className="glass-orb glass-orb-1" />
          <div className="glass-orb glass-orb-2" />
          <div className="glass-orb glass-orb-3" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-[calc(7rem+env(safe-area-inset-top))] pb-10 sm:pt-32 sm:pb-16">
          <div className="grid lg:grid-cols-3 gap-8 items-end">
            <div className="lg:col-span-2">
              <h1 className="text-4xl md:text-5xl font-editorial text-gray-900 leading-tight pt-2 sm:pt-0">
                Stays that feel like art, curated for the way you travel
              </h1>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl">
                A collection of intimate homes across Mumbai—crafted with soul, design-first, and hospitality that lingers.
              </p>
              <div className="mt-6 flex flex-wrap gap-2 sm:gap-3">
                <span className="inline-flex items-center space-x-2 bg-white/70 backdrop-blur-sm border border-white/40 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm text-gray-800">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span>Avg. 4.9 rating</span>
                </span>
                <span className="inline-flex items-center space-x-2 bg-primary-500/90 text-white px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm">
                  <Sparkles className="w-4 h-4" />
                  <span>Guest Favorite Hosts</span>
                </span>
                <span className="inline-flex items-center space-x-2 bg-white/70 backdrop-blur-sm border border-white/40 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm text-gray-800">
                  <MapPin className="w-4 h-4" />
                  <span>Mumbai • Bandra • Colaba • Juhu</span>
                </span>
              </div>
            </div>
            {/* View Toggle + Search */}
            <div className="lg:justify-self-end w-full lg:w-auto">
              <div className="glass-card rounded-2xl p-4 flex items-center gap-2 w-full md:w-80">
                <Search className="w-5 h-5 text-gray-500" />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name or neighborhood"
                  className="flex-1 bg-transparent outline-none placeholder:text-gray-500"
                />
                {/* View toggle moved to persistent floating control */}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
         {/* Magazine-style mosaic grid for 7 properties */}
         <div className="mb-10">
           <MosaicPropertyGrid
             properties={filteredProperties as any}
             onPropertyClick={onPropertyClick as any}
           />
         </div>
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1 space-y-4">
            <button onClick={() => setIsFiltersOpen(true)} className="w-full btn-glass-primary py-3 rounded-xl">
              Refine Filters
            </button>
            <div className="hidden lg:block card-glass-light p-4 border border-white/30">
              <p className="text-sm text-gray-700">Handpicked homes with thoughtful design and service-first hosting. Expect character, comfort, and creative energy.</p>
            </div>
          </aside>

          {/* Properties Grid */}
          <main className="lg:col-span-3">
             {/* Results Count */}
             <div className="mb-6 flex items-center justify-between">
               <p className="text-gray-600">
                 {filteredProperties.length} of {properties.length} properties
               </p>
             </div>

             {/* Uniform grid fallback below mosaic (for more than 7 or after filters) */}
             <PropertyGrid 
               properties={filteredProperties as any}
               className=""
               onPropertyClick={onPropertyClick as any}
             />
          </main>
        </div>
      </div>

      {/* Mobile Sticky Refine */}
      <div className="lg:hidden fixed bottom-4 left-0 right-0 flex justify-center pointer-events-none">
        <button
          onClick={() => setIsFiltersOpen(true)}
          className="pointer-events-auto btn-glass-primary px-6 py-3 rounded-full shadow-elegant"
        >
          Refine
        </button>
      </div>

      {/* Filters Modal Sheet */}
      {isFiltersOpen && (
        <PropertyFilters
          onFiltersChange={(f: any) => setFilters((prev) => ({ ...prev, ...f }))}
          onClose={() => setIsFiltersOpen(false)}
        />
      )}

      {/* Floating global view toggle (always accessible) */}
      <div className="fixed bottom-6 right-4 z-50">
        <div className="backdrop-blur-md bg-white/90 border border-gray-200 rounded-full p-1 flex items-center gap-1 shadow-lg" role="group" aria-label="Change properties view">
          <button
            onClick={() => setViewMode('immersive')}
            className={`px-3 py-1.5 rounded-full text-sm ${viewMode === 'immersive' ? 'bg-primary-100 text-primary-700' : 'text-gray-700 hover:bg-gray-100'}`}
            aria-label="Immersive view"
          >
            Immersive
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`px-3 py-1.5 rounded-full text-sm ${viewMode === 'grid' ? 'bg-primary-100 text-primary-700' : 'text-gray-700 hover:bg-gray-100'}`}
            aria-label="Grid view"
          >
            Grid
          </button>
            {/* List view removed per request */}
        </div>
      </div>

      {/* Page Footer */}
      <Footer />
    </div>
  );
};

export default PropertiesPage; 