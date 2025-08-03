import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import PropertyGrid from './components/PropertyGrid';
import PropertyDetail from './components/PropertyDetail';
import PropertySuggestion from './components/PropertySuggestion';
import VisualStoriesSection from './components/VisualStoriesSection';
import PropertyStorySection from './components/PropertyStorySection';
import MumbaiGuidePreview from './components/MumbaiGuidePreview';
import ContactSection from './components/ContactSection';
import LoadingScreen from './components/LoadingScreen';
import ScrollToTop from './components/ScrollToTop';
import QuickActions from './components/QuickActions';
import NewsletterSignup from './components/NewsletterSignup';
import UserGuidanceSection from './components/UserGuidanceSection';
import TestimonialsSection from './components/TestimonialsSection';
import InstagramTestimonials from './components/InstagramTestimonials';
import LongTermBookingSection from './components/LongTermBookingSection';
import FeaturesShowcase from './components/FeaturesShowcase';
import PhoneAuth from './components/PhoneAuth';
import BookingConfirmation from './components/BookingConfirmation';
import UserBookings from './components/UserBookings';
import UserProfileComponent from './components/UserProfile';
import PropertySearch from './components/PropertySearch';
import PropertyComparison from './components/PropertyComparison';
import SocialSharing from './components/SocialSharing';
import AdminDashboard from './components/AdminDashboard';
import AssetTestPage from './components/AssetTestPage';
import AllPropertiesView from './components/AllPropertiesView';
import PropertiesPage from './components/PropertiesPage';
import DedicatedPropertiesPage from './components/DedicatedPropertiesPage';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';

import { mockUseAuth as useAuth } from './hooks/mockUseAuth';
import { getAllPropertyDetails } from './data/propertyDetails';
import type { Database } from './lib/database.types';
import PWAService from './services/pwaService';

type UserProfile = Database['public']['Tables']['user_profiles']['Row'];
type Property = Database['public']['Tables']['properties']['Row'];

interface SearchFilters {
  location: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  priceRange: [number, number];
  amenities: string[];
  propertyType: string[];
  rating: number;
  sortBy: 'price' | 'rating' | 'popularity' | 'distance';
  sortOrder: 'asc' | 'desc';
}

// Type guard for property features
interface PropertyFeatures {
  amenities: string[];
  rating: number;
  reviews_count: number;
  is_available: boolean;
}

const isPropertyFeatures = (features: any): features is PropertyFeatures => {
  return features && 
    typeof features === 'object' &&
    Array.isArray(features.amenities) &&
    typeof features.rating === 'number' &&
    typeof features.reviews_count === 'number' &&
    typeof features.is_available === 'boolean';
};

const getPropertyFeatures = (property: Property): PropertyFeatures => {
  if (property.features && isPropertyFeatures(property.features)) {
    return property.features;
  }
  // Default features if not available
  return {
    amenities: [],
    rating: 0,
    reviews_count: 0,
    is_available: true
  };
};

function App() {
  const { user, loading: authLoading, isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [currentView, setCurrentView] = useState<'home' | 'property' | 'booking-confirmation' | 'user-bookings' | 'user-profile' | 'asset-test' | 'all-properties' | 'properties' | 'dedicated-properties' | 'search-results'>('home');
  const [selectedProperty, setSelectedProperty] = useState<number | null>(null);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [showNewsletter, setShowNewsletter] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [comparisonProperties, setComparisonProperties] = useState<number[]>([]);
  const [showSocialSharing, setShowSocialSharing] = useState(false);
  const [socialSharingData, setSocialSharingData] = useState<any>(null);
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);
  const [showDatabaseTest, setShowDatabaseTest] = useState(false); // Database test completed

  // Search state
  const [searchResults, setSearchResults] = useState<Property[]>([]);
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    location: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
    priceRange: [0, 50000],
    amenities: [],
    propertyType: [],
    rating: 0,
    sortBy: 'popularity',
    sortOrder: 'desc'
  });
  const [isSearching, setIsSearching] = useState(false);

  // Show newsletter popup after 45 seconds on first visit
  useEffect(() => {
    const hasSeenNewsletter = localStorage.getItem('hasSeenNewsletter');
    if (!hasSeenNewsletter && !isLoading && !authLoading) {
      const timer = setTimeout(() => {
        setShowNewsletter(true);
        localStorage.setItem('hasSeenNewsletter', 'true');
      }, 45000);
      return () => clearTimeout(timer);
    }
  }, [isLoading, authLoading]);

  // Show auth modal for new users after 10 seconds
  useEffect(() => {
    if (!isLoading && !authLoading && !isAuthenticated) {
      const hasSeenAuth = localStorage.getItem('hasSeenAuth');
      if (!hasSeenAuth) {
        const timer = setTimeout(() => {
          setShowAuth(true);
          localStorage.setItem('hasSeenAuth', 'true');
        }, 10000);
        return () => clearTimeout(timer);
      }
    }
  }, [isLoading, authLoading, isAuthenticated]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const handlePropertySelect = (propertyId: number) => {
    setSelectedProperty(propertyId);
    setCurrentView('property');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedProperty(null);
  };

  const handleSuggestionClick = () => {
    if (!isAuthenticated) {
      setShowAuth(true);
      return;
    }
    setShowSuggestion(true);
  };

  const handleCloseSuggestion = () => {
    setShowSuggestion(false);
  };

  const handleContactClick = () => {
    document.getElementById('contact')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  const handleAuthSuccess = (result: { user: UserProfile; isNewUser: boolean }) => {
    setShowAuth(false);
    if (result.isNewUser) {
      // Show welcome message or onboarding
      console.log('Welcome new user!', result.user);
    }
  };

  const handleBookingSuccess = (bookingId: string) => {
    setSelectedBookingId(bookingId);
    setCurrentView('booking-confirmation');
  };

  const handleViewUserBookings = () => {
    setCurrentView('user-bookings');
  };

  const handleViewUserProfile = () => {
    setCurrentView('user-profile');
  };

  const handleViewBooking = (bookingId: string) => {
    setSelectedBookingId(bookingId);
    setCurrentView('booking-confirmation');
  };

  const handleAuthClose = () => {
    setShowAuth(false);
  };

  const handleShowAuth = () => {
    setShowAuth(true);
  };

  const handleShowSearch = () => {
    setShowSearch(true);
  };

  const handleShowComparison = (propertyIds?: number[]) => {
    if (propertyIds) {
      setComparisonProperties(propertyIds);
    }
    setShowComparison(true);
  };

  const handleShowSocialSharing = (data?: any) => {
    if (data) {
      setSocialSharingData(data);
    }
    setShowSocialSharing(true);
  };

  const handleShowAdminDashboard = () => {
    setShowAdminDashboard(true);
  };

  const handleShowProperties = () => {
    setCurrentView('dedicated-properties');
  };

  // Enhanced search functionality
  const handleSearch = async (filters: SearchFilters) => {
    try {
      setIsSearching(true);
      setSearchFilters(filters);
      
      // Simulate search delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Get all properties from mock data and filter them
      const allProperties = getAllPropertyDetails();
      
      let filteredProperties = allProperties;

      // Apply location filter
      if (filters.location) {
        filteredProperties = filteredProperties.filter(property =>
          property.hero.location.toLowerCase().includes(filters.location.toLowerCase()) ||
          property.name.toLowerCase().includes(filters.location.toLowerCase())
        );
      }

      // Apply price filter
      filteredProperties = filteredProperties.filter(property =>
        property.hero.price >= filters.priceRange[0] && property.hero.price <= filters.priceRange[1]
      );

      // Apply amenities filter
      if (filters.amenities.length > 0) {
        filteredProperties = filteredProperties.filter(property => {
          const features = property.amenities.features || [];
          return filters.amenities.every(amenity =>
            features.includes(amenity)
          );
        });
      }

      // Apply rating filter
      if (filters.rating > 0) {
        filteredProperties = filteredProperties.filter(property => {
          return property.hero.rating >= filters.rating;
        });
      }

      // Sort results
      filteredProperties.sort((a, b) => {
        switch (filters.sortBy) {
          case 'price':
            return filters.sortOrder === 'asc' ? a.hero.price - b.hero.price : b.hero.price - a.hero.price;
          case 'rating':
            return filters.sortOrder === 'asc' 
              ? a.hero.rating - b.hero.rating 
              : b.hero.rating - a.hero.rating;
          case 'popularity':
            return filters.sortOrder === 'asc' 
              ? a.hero.reviews_count - b.hero.reviews_count 
              : b.hero.reviews_count - a.hero.reviews_count;
          default:
            return 0;
        }
      });

      // Convert PropertyDetailData to Property type for search results
      const convertedProperties = filteredProperties.map(property => ({
        id: property.id,
        name: property.name,
        location: property.hero.location,
        description: property.story.content,
        guests: 4, // Default value since PropertyDetailData doesn't have guests
        bedrooms: 2, // Default value
        bathrooms: 2, // Default value
        price: property.hero.price,
        category: 'Luxury', // Default value
        aesthetic: 'Modern', // Default value
        virtual_tour_url: null,
        video_url: null,
        images: property.hero.images,
        features: {
          amenities: property.amenities.features || [],
          rating: property.hero.rating,
          reviews_count: property.hero.reviews_count,
          is_available: true
        },
        story: property.story.content,
        testimonials: property.testimonials,
        highlights: property.hero.highlights,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }));

      setSearchResults(convertedProperties);
      setCurrentView('search-results');
      setShowSearch(false);
      
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleClearSearch = () => {
    setSearchResults([]);
    setSearchFilters({
      location: '',
      checkIn: '',
      checkOut: '',
      guests: 1,
      priceRange: [0, 50000],
      amenities: [],
      propertyType: [],
      rating: 0,
      sortBy: 'popularity',
      sortOrder: 'desc'
    });
    setCurrentView('home');
  };



  // Initialize PWA
  useEffect(() => {
    PWAService.injectManifest();
  }, []);

  // Show loading screen while auth is initializing
  if (authLoading || isLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <ErrorBoundary>
      <div className="bg-dynamic-gradient">
        {/* Hide Navigation when viewing property detail to avoid duplicate navbars */}
        {currentView !== 'property' && (
          <Navigation
            onSuggestionClick={handleSuggestionClick}
            user={user}
            onShowAuth={handleShowAuth}
            isAuthenticated={isAuthenticated}
            onViewUserProfile={handleViewUserProfile}
            onShowSearch={handleShowSearch}
            onShowAdminDashboard={handleShowAdminDashboard}
            onShowProperties={handleShowProperties}
            currentView={currentView}
            breadcrumbs={
              currentView === 'search-results' 
                ? [
                    { label: 'Search Results', onClick: () => setCurrentView('home') }
                  ]
                : currentView === 'all-properties'
                ? [
                    { label: 'All Properties', onClick: () => setCurrentView('home') }
                  ]
                : currentView === 'dedicated-properties'
                ? [
                    { label: 'Properties', onClick: () => setCurrentView('home') }
                  ]
                : currentView === 'user-bookings'
                ? [
                    { label: 'My Bookings', onClick: () => setCurrentView('home') }
                  ]
                : currentView === 'user-profile'
                ? [
                    { label: 'My Profile', onClick: () => setCurrentView('home') }
                  ]
                : currentView === 'booking-confirmation'
                ? [
                    { label: 'Booking Confirmation', onClick: () => setCurrentView('home') }
                  ]
                : []
            }
          />
        )}
        
        {currentView === 'home' && (
          <>
            <Hero onSuggestionClick={handleSuggestionClick} />
            <LongTermBookingSection onContactClick={handleContactClick} />
            <div id="stories">
              <PropertyStorySection onPropertySelect={handlePropertySelect} />
            </div>

            {/* <VisualStoriesSection onPropertySelect={handlePropertySelect} /> */}
            <div id="features">
              <FeaturesShowcase />
            </div>
            {/* <PropertyStorySection onPropertySelect={handlePropertySelect} /> */}

            {/* <UserGuidanceSection /> */}

            {/* Properties section removed - now opens as separate page */}
            

            {/* <TestimonialsSection /> */}
            {/* <MumbaiGuidePreview /> */}
            <div id="contact">
              <ContactSection />
            </div>
            <Footer />
          </>
        )}

        {currentView === 'property' && (
          <PropertyDetail
            propertyId={selectedProperty!}
            onBackToHome={handleBackToHome}
            onPropertySelect={handlePropertySelect}
            user={user}
            isAuthenticated={isAuthenticated}
            onBookingSuccess={handleBookingSuccess}
            onShowSocialSharing={handleShowSocialSharing}
          />
        )}

        {currentView === 'booking-confirmation' && selectedBookingId && (
          <BookingConfirmation
            bookingId={selectedBookingId}
            onBackToHome={handleBackToHome}
            onViewBooking={handleViewBooking}
          />
        )}

        {currentView === 'user-bookings' && (
          <UserBookings
            onBackToHome={handleBackToHome}
            onViewBooking={handleViewBooking}
          />
        )}

        {currentView === 'user-profile' && (
          <UserProfileComponent
            onBackToHome={handleBackToHome}
            onViewBooking={handleViewBooking}
          />
        )}

        {currentView === 'asset-test' && (
          <div className="min-h-screen bg-gray-50">
            <div className="max-w-6xl mx-auto px-4 py-8">
              <button
                onClick={handleBackToHome}
                className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                ← Back to Home
              </button>
              <AssetTestPage />
            </div>
          </div>
        )}

        {currentView === 'all-properties' && (
          <AllPropertiesView onBackToHome={handleBackToHome} />
        )}

        {currentView === 'properties' && (
          <PropertiesPage properties={getAllPropertyDetails()} />
        )}

        {currentView === 'dedicated-properties' && (
          <DedicatedPropertiesPage
            properties={getAllPropertyDetails()}
            onPropertyClick={(property) => handlePropertySelect(property.id)}
            onBackToHome={handleBackToHome}
          />
        )}

        {/* Search Results View */}
        {currentView === 'search-results' && (
          <div className="min-h-screen bg-gray-50 pt-20">
            <div className="max-w-6xl mx-auto px-4 py-8">
              {/* Search Results Header */}
              <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">Search Results</h1>
                    <p className="text-gray-600">
                      Found {searchResults.length} properties
                      {searchFilters.location && ` in ${searchFilters.location}`}
                    </p>
                  </div>
                  <button
                    onClick={handleBackToHome}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    ← Back to Home
                  </button>
                </div>
                
                {/* Active Filters */}
                <div className="flex flex-wrap gap-2">
                  {searchFilters.location && (
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                      Location: {searchFilters.location}
                    </span>
                  )}
                  {searchFilters.guests > 1 && (
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                      {searchFilters.guests} Guests
                    </span>
                  )}
                  {searchFilters.rating > 0 && (
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">
                      {searchFilters.rating}+ Stars
                    </span>
                  )}
                  <button
                    onClick={handleClearSearch}
                    className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm hover:bg-red-200 transition-colors"
                  >
                    Clear All
                  </button>
                </div>
              </div>

              {/* Search Results Grid */}
              {searchResults.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {searchResults.map((property) => {
                    const features = getPropertyFeatures(property);
                    return (
                      <div
                        key={property.id}
                        onClick={() => handlePropertySelect(property.id)}
                        className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                      >
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={property.images[0]}
                            alt={property.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg">
                            <span className="text-sm font-semibold text-gray-900">
                              ₹{property.price.toLocaleString()}
                            </span>
                          </div>
                        </div>
                        <div className="p-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {property.name}
                          </h3>
                          <p className="text-gray-600 text-sm mb-3">
                            {property.location} • {property.bedrooms} bed • {property.bathrooms} bath
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <span className="text-yellow-500 mr-1">★</span>
                              <span className="text-sm text-gray-600">
                                {features.rating} ({features.reviews_count} reviews)
                              </span>
                            </div>
                            <span className="text-sm text-gray-500">
                              {property.guests} guests
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-6xl mb-4">🏠</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No properties found</h3>
                  <p className="text-gray-600 mb-6">
                    Try adjusting your search criteria or browse all properties
                  </p>
                  <button
                    onClick={() => setCurrentView('all-properties')}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    View All Properties
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Enhanced UI Components */}
        <ScrollToTop />
        <QuickActions 
          onContactClick={handleContactClick}
        />

        {/* Modals */}
        {showSuggestion && (
          <PropertySuggestion 
            onPropertySelect={handlePropertySelect}
            onClose={handleCloseSuggestion}
            user={user}
          />
        )}

        {showNewsletter && (
          <NewsletterSignup 
            onClose={() => setShowNewsletter(false)}
            user={user}
          />
        )}

        {/* Authentication Modal */}
        <PhoneAuth
          isOpen={showAuth}
          onSuccess={handleAuthSuccess}
          onClose={handleAuthClose}
        />

        {/* Property Search Modal */}
        {showSearch && (
          <PropertySearch
            onSearch={handleSearch}
            onClear={handleClearSearch}
            properties={searchResults}
            isLoading={isSearching}
          />
        )}

        {/* Property Comparison Modal */}
        <PropertyComparison
          isOpen={showComparison}
          initialProperties={comparisonProperties}
          onPropertySelect={handlePropertySelect}
          onClose={() => setShowComparison(false)}
        />

        {/* Social Sharing Modal */}
        <SocialSharing
          isOpen={showSocialSharing}
          shareData={socialSharingData}
          onClose={() => setShowSocialSharing(false)}
        />

        {/* Admin Dashboard Modal */}
        <AdminDashboard
          isOpen={showAdminDashboard}
          onClose={() => setShowAdminDashboard(false)}
        />
      </div>
    </ErrorBoundary>
  );
}

export default App;