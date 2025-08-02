import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, MapPin, Sparkles, Calendar, X, Image as ImageIcon, ChevronDown, Flag, Share, Heart, Home, ChevronRight as ChevronRightIcon, MessageCircle, Shield, Clock, Globe, Award, Camera, Loader2, Users, Bed, Wifi, Car, Coffee, Utensils, CheckCircle, Zap, ShoppingBag, Smartphone, Bus } from 'lucide-react';
import { MockPropertyService as PropertyService } from '../services/mockPropertyService';
import BookingCalendar from './BookingCalendar';
import AvailabilityCalendar from './AvailabilityCalendar';
import SimilarListings from './SimilarListings';
import NeighborhoodGuide from './NeighborhoodGuide';
import SafetyFeatures from './SafetyFeatures';
import PhotoLightbox from './PhotoLightbox';
import InstagramTestimonials from './InstagramTestimonials';
import PropertyStoryGallery from './PropertyStoryGallery';
import GuestStoriesSection from './GuestStoriesSection';
import PropertyNarrative from './PropertyNarrative';
import BookingModal from './BookingModal';
import Footer from './Footer';
import type { Database } from '../lib/database.types';

type Property = Database['public']['Tables']['properties']['Row'];

interface PropertyDetailProps {
  propertyId: number;
  onBackToHome: () => void;
  user?: any;
  isAuthenticated?: boolean;
  onBookingSuccess?: (bookingId: string) => void;
  onShowSocialSharing?: (data: any) => void;
}

const PropertyDetail: React.FC<PropertyDetailProps> = ({ propertyId, onBackToHome, user, isAuthenticated, onBookingSuccess, onShowSocialSharing }) => {
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [showMoreDetails, setShowMoreDetails] = useState(false);

  // Mock data for fallback when database is not available
  const mockProperty: Property = {
    id: 1,
    name: "The Bandra Cottage",
    location: "Bandra West, Mumbai",
    description: "A beautifully restored heritage cottage that seamlessly blends colonial charm with modern luxury. This unique property offers an authentic Mumbai experience with contemporary comforts.",
    guests: 4,
    bedrooms: 2,
    bathrooms: 2,
    price: 6200,
    category: "Heritage",
    aesthetic: "colonial grandeur",
    virtual_tour_url: null,
    video_url: null,
    highlights: ["Colonial Architecture", "Historical Significance", "Garden Parties", "Heritage Tours"],
    images: [
      "https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      "https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
    ],
    features: {
      amenities: ["High-Speed WiFi", "Private Garden", "Vintage Furnishings", "Library", "Butler Service", "High Tea Service", "Air Conditioning", "Security", "Parking"],
      highlights: ["Colonial Architecture", "Historical Significance", "Garden Parties", "Heritage Tours"]
    },
    story: "Built in 1923, this colonial cottage has witnessed the transformation of Bombay into Mumbai. Each room tells a story of the city's rich history, from the original teak woodwork to the stained glass windows. The garden, planted by the original British owners, continues to bloom with century-old trees and exotic flowers. Recently restored with painstaking attention to detail, this property now offers the perfect blend of heritage charm and modern luxury.",
    testimonials: [
      { name: "Priya Sharma", rating: 5, comment: "A magical step back in time. The colonial charm and garden tranquility made our family vacation extraordinary." },
      { name: "Rajesh Mehta", rating: 5, comment: "Perfect for our anniversary celebration. The heritage atmosphere and butler service exceeded all expectations." },
      { name: "Sarah Johnson", rating: 5, comment: "The perfect blend of history and luxury. Every detail was thoughtfully curated." }
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  // Load property data
  useEffect(() => {
    const loadProperty = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await PropertyService.getPropertyById(propertyId);
        setProperty(data || mockProperty);
      } catch (err) {
        console.error('Error loading property:', err);
        setProperty(mockProperty); // Use mock data as fallback
      } finally {
        setLoading(false);
      }
    };

    loadProperty();
  }, [propertyId]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === (property?.images?.length || 1) - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? (property?.images?.length || 1) - 1 : prev - 1
    );
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'heritage':
        return 'from-amber-500 to-orange-500';
      case 'luxury':
        return 'from-purple-500 to-pink-500';
      case 'boutique':
        return 'from-blue-500 to-cyan-500';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-rust-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading property details...</p>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Unable to load property details</p>
          <button 
            onClick={onBackToHome}
            className="bg-rust-600 text-white px-6 py-2 rounded-lg hover:bg-rust-700 transition-colors"
          >
            Back to Properties
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Enhanced Mobile-Optimized Header */}
      <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <button 
              onClick={onBackToHome}
              className={`flex items-center space-x-1 sm:space-x-2 transition-colors font-medium ${
                isScrolled ? 'text-gray-900 hover:text-rust-600' : 'text-white hover:text-white/80'
              }`}
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Back to Properties</span>
              <span className="sm:hidden">Back</span>
            </button>
            
            {/* Simplified Action Buttons */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              <button 
                onClick={() => onShowSocialSharing?.({
                  title: property.name,
                  description: property.description,
                  image: property.images[0],
                  url: `${window.location.origin}/property/${property.id}`,
                  price: property.price,
                  location: property.location
                })}
                className={`p-2 sm:p-2.5 rounded-full transition-colors ${
                  isScrolled ? 'hover:bg-gray-100 text-gray-600' : 'hover:bg-white/10 text-white'
                }`}
                title="Share Property"
              >
                <Share className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile-Optimized Floating Action Buttons */}
      <div className="fixed bottom-4 right-4 z-40 lg:hidden">
        <div className="flex flex-col space-y-3">
          {/* Primary CTA - Mobile Optimized */}
          <button 
            onClick={() => setIsBookingModalOpen(true)}
            className="bg-gradient-to-r from-rust-500 to-rust-600 hover:from-rust-600 hover:to-rust-700 text-white font-semibold py-4 px-8 rounded-full shadow-xl transition-all duration-200 text-base flex items-center space-x-3 transform hover:scale-105 active:scale-95 min-h-[56px]"
          >
            <Calendar className="w-5 h-5" />
            <span>Book Now</span>
          </button>
          
          {/* Secondary CTA - Mobile Optimized */}
          <button 
            onClick={() => openLightbox(0)}
            className="bg-white/95 backdrop-blur-md hover:bg-white text-gray-900 font-medium py-4 px-8 rounded-full shadow-xl transition-all duration-200 text-base flex items-center space-x-3 border border-gray-200 transform hover:scale-105 active:scale-95 min-h-[56px]"
          >
            <Camera className="w-5 h-5" />
            <span>Photos</span>
          </button>
        </div>
      </div>

      {/* Mobile-Optimized Hero Section */}
      <div className="relative h-[70vh] sm:h-[75vh] md:h-[80vh] lg:h-[85vh] overflow-hidden">
        {/* Enhanced Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/80 z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/50 z-10"></div>
        
        {/* Main Image */}
        <img
          src={(property.images || [])[currentImageIndex] || (property.images || [])[0] || ''}
          alt={`${property.name} - Luxury accommodation in ${property.location}`}
          className="w-full h-full object-cover object-center"
        />

        {/* Mobile-Optimized Content Overlay */}
        <div className="absolute inset-0 z-20">
          <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col justify-end h-full pb-6 sm:pb-8 md:pb-12">
              {/* Mobile-First Layout */}
              <div className="space-y-4 sm:space-y-6">
                {/* Simplified Property Title - Mobile Optimized */}
                <div className="space-y-3 sm:space-y-4">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light leading-tight text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                    {property.name}
                  </h1>
                  
                  {/* Mobile-Optimized Location & Rating */}
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-white/95">
                    <div className="flex items-center bg-white/25 backdrop-blur-sm px-3 py-2 rounded-full">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span className="text-sm sm:text-base font-medium">{property.location}</span>
                    </div>
                    <div className="flex items-center bg-white/25 backdrop-blur-sm px-3 py-2 rounded-full">
                      <Star className="w-4 h-4 text-yellow-400 fill-current mr-2" />
                      <span className="text-sm sm:text-base font-medium">4.9 (42)</span>
                    </div>
                  </div>
                </div>

                {/* Mobile-Optimized Trust Indicators */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-white/90">
                  <div className="flex items-center space-x-2 bg-green-500/40 backdrop-blur-sm px-3 py-2 rounded-full border border-green-400/50">
                    <Shield className="w-4 h-4 text-green-300" />
                    <span className="text-sm font-medium">Verified Host</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-blue-500/40 backdrop-blur-sm px-3 py-2 rounded-full border border-blue-400/50">
                    <CheckCircle className="w-4 h-4 text-blue-300" />
                    <span className="text-sm font-medium">Instant booking</span>
                  </div>
                </div>

                {/* Mobile-Optimized Quick Stats */}
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 border border-white/30 text-center">
                    <div className="text-lg sm:text-xl font-bold text-white">{property.guests}</div>
                    <div className="text-xs text-white/90 font-medium">Guests</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 border border-white/30 text-center">
                    <div className="text-lg sm:text-xl font-bold text-white">{property.bedrooms}</div>
                    <div className="text-xs text-white/90 font-medium">Bedrooms</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 border border-white/30 text-center">
                    <div className="text-lg sm:text-xl font-bold text-white">{property.bathrooms}</div>
                    <div className="text-xs text-white/90 font-medium">Bathrooms</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile-Optimized Image Navigation */}
        <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 z-30">
          <div className="flex space-x-2 sm:space-x-3">
            {(property.images || []).slice(0, 5).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-200 min-w-[12px] min-h-[12px] ${
                  index === currentImageIndex 
                    ? 'bg-white shadow-lg scale-110' 
                    : 'bg-white/50 hover:bg-white/75 hover:scale-105'
                }`}
                aria-label={`View image ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Mobile-Optimized Image Controls */}
        <button
          onClick={prevImage}
          className="absolute left-3 sm:left-4 md:left-6 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm p-3 sm:p-4 rounded-full hover:bg-white/30 transition-all duration-200 min-w-[48px] min-h-[48px] flex items-center justify-center shadow-lg hover:shadow-xl"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </button>
        
        <button
          onClick={nextImage}
          className="absolute right-3 sm:right-4 md:right-6 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm p-3 sm:p-4 rounded-full hover:bg-white/30 transition-all duration-200 min-w-[48px] min-h-[48px] flex items-center justify-center shadow-lg hover:shadow-xl"
          aria-label="Next image"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </button>
      </div>

      {/* Mobile-Optimized Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
          {/* Mobile-Optimized Main Content */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            {/* Mobile-Optimized Price & Booking Section */}
            <div className="lg:hidden bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 shadow-lg sticky top-20 z-30">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-gray-900">{formatPrice(property.price)}</div>
                  <div className="text-sm text-gray-600">per night</div>
                </div>
                <button 
                  onClick={() => setIsBookingModalOpen(true)}
                  className="bg-gradient-to-r from-rust-500 to-rust-600 hover:from-rust-600 hover:to-rust-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 text-base shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
                >
                  Book Now
                </button>
              </div>
              
                             {/* Mobile-Optimized Urgency Indicator - Removed for cleaner mobile UX */}
            </div>

            {/* Mobile-Optimized Property Highlights */}
            <div className="bg-gradient-to-r from-rust-50 to-orange-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-rust-100">
              <h2 className="text-lg sm:text-xl font-medium text-gray-900 mb-4">Why Choose This Property?</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-rust-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Award className="w-4 h-4 text-rust-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 text-sm sm:text-base">Heritage Experience</h3>
                    <p className="text-xs sm:text-sm text-gray-600">Authentic colonial architecture</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-rust-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4 text-rust-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 text-sm sm:text-base">Prime Location</h3>
                    <p className="text-xs sm:text-sm text-gray-600">Walking distance to attractions</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-rust-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Shield className="w-4 h-4 text-rust-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 text-sm sm:text-base">Verified & Safe</h3>
                    <p className="text-xs sm:text-sm text-gray-600">Professional cleaning, 24/7 support</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-rust-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Star className="w-4 h-4 text-rust-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 text-sm sm:text-base">Exceptional Service</h3>
                    <p className="text-xs sm:text-sm text-gray-600">Butler service, cultural concierge</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile-Optimized Quick Summary Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              <div className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 text-center hover:shadow-md transition-shadow">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <div className="text-xs sm:text-sm font-medium text-gray-900">Free WiFi</div>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 text-center hover:shadow-md transition-shadow">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Coffee className="w-4 h-4 text-blue-600" />
                </div>
                <div className="text-xs sm:text-sm font-medium text-gray-900">Breakfast</div>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 text-center hover:shadow-md transition-shadow">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Car className="w-4 h-4 text-purple-600" />
                </div>
                <div className="text-xs sm:text-sm font-medium text-gray-900">Parking</div>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 text-center hover:shadow-md transition-shadow">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <X className="w-4 h-4 text-red-600" />
                </div>
                <div className="text-xs sm:text-sm font-medium text-gray-900">No Pets</div>
              </div>
            </div>

            {/* Mobile-Optimized Property Stats */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-6 lg:space-x-8 text-gray-600 border-b border-gray-200 pb-4 sm:pb-6">
              <div className="flex items-center">
                <Users className="w-5 h-5 mr-3" />
                <span className="text-sm sm:text-base font-medium">{property.guests} guests</span>
              </div>
              <div className="flex items-center">
                <Bed className="w-5 h-5 mr-3" />
                <span className="text-sm sm:text-base font-medium">{property.bedrooms} bedrooms</span>
              </div>
              <div className="flex items-center">
                <Shield className="w-5 h-5 mr-3" />
                <span className="text-sm sm:text-base font-medium">{property.bathrooms} bathrooms</span>
              </div>
            </div>

            {/* Mobile-Optimized Category Badge */}
            <div className="flex items-center">
              <div className="inline-block">
                <span className={`bg-gradient-to-r ${getCategoryColor(property.category)} text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm font-medium shadow-lg`}>
                  {property.category}
                </span>
              </div>
            </div>

            {/* Mobile-Optimized Description with Progressive Disclosure */}
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-light text-gray-900 mb-4 sm:mb-6">About this place</h2>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                  {property.description}
                </p>
                
                {/* Progressive Disclosure for Mobile */}
                {!showMoreDetails && (
                  <button
                    onClick={() => setShowMoreDetails(true)}
                    className="text-rust-600 hover:text-rust-700 font-medium text-sm sm:text-base flex items-center space-x-2"
                  >
                    <span>Read more</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                )}
                
                {showMoreDetails && (
                  <div className="space-y-4">
                    <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                      {property.story}
                    </p>
                    <button
                      onClick={() => setShowMoreDetails(false)}
                      className="text-rust-600 hover:text-rust-700 font-medium text-sm sm:text-base flex items-center space-x-2"
                    >
                      <span>Show less</span>
                      <ChevronDown className="w-4 h-4 rotate-180" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile-Optimized Amenities */}
            <div>
              <h2 className="text-xl sm:text-2xl font-light text-gray-900 mb-4 sm:mb-6">What this place offers</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {(() => {
                  const features = property.features as any;
                  const amenities = features?.amenities || 
                    (features?.amenities === undefined && Array.isArray(features) ? features : []) ||
                    (mockProperty.features as any)?.amenities || [];
                  
                  return amenities.map((amenity: string, index: number) => (
                    <div key={index} className="flex items-center space-x-3 p-3 sm:p-4 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-rust-100 rounded-full flex items-center justify-center">
                        <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-rust-600" />
                      </div>
                      <span className="text-gray-700 font-medium text-sm sm:text-base">{amenity}</span>
                    </div>
                  ));
                })()}
              </div>
            </div>
            
            {/* Mobile-Optimized Reviews */}
            <div>
              <h2 className="text-xl sm:text-2xl font-light text-gray-900 mb-4 sm:mb-6">Guest Reviews</h2>
              <div className="space-y-4 sm:space-y-6">
                {(() => {
                  const testimonials = (property.testimonials as any[]) || 
                    (mockProperty.testimonials as any[]) || [];
                  
                  return testimonials.slice(0, 2).map((review, index) => (
                    <div key={index} className="bg-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                      <div className="flex items-center justify-between mb-3 sm:mb-4">
                        <div>
                          <h4 className="font-medium text-gray-900 text-sm sm:text-base">{review.name}</h4>
                          <p className="text-gray-600 text-xs sm:text-sm">Verified Guest</p>
                        </div>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current mr-1" />
                          <span className="font-medium text-sm sm:text-base">{review.rating}.0</span>
                        </div>
                      </div>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base">{review.comment}</p>
                    </div>
                  ));
                })()}
              </div>
            </div>

            {/* Mobile-Optimized Neighborhood Guide */}
            <div>
              <h2 className="text-xl sm:text-2xl font-light text-gray-900 mb-4 sm:mb-6">Neighborhood Guide</h2>
              <div className="bg-gradient-to-r from-sage-50 to-teal-50 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-4">{property.location}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2 text-sm sm:text-base">Nearby Attractions</h4>
                    <ul className="space-y-1 sm:space-y-2 text-gray-700 text-xs sm:text-sm">
                      <li>• Bandra Fort (5 min walk)</li>
                      <li>• Carter Road Promenade (8 min walk)</li>
                      <li>• Linking Road Shopping (10 min walk)</li>
                      <li>• Bandra Station (12 min walk)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2 text-sm sm:text-base">Local Highlights</h4>
                    <ul className="space-y-1 sm:space-y-2 text-gray-700 text-xs sm:text-sm">
                      <li>• Best cafes and restaurants</li>
                      <li>• Art galleries and cultural spots</li>
                      <li>• Shopping and entertainment</li>
                      <li>• Public transport access</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile-Optimized Sidebar */}
          <div className="lg:col-span-1">
            {/* Desktop CTA Card - Hidden on Mobile */}
            <div className="hidden lg:block sticky top-8">
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{formatPrice(property.price)}</div>
                    <div className="text-sm text-gray-600">per night</div>
                  </div>
                </div>
                
                                 {/* Urgency Indicator - Removed for cleaner UX */}

                <button 
                  onClick={() => setIsBookingModalOpen(true)}
                  className="w-full bg-gradient-to-r from-rust-500 to-rust-600 hover:from-rust-600 hover:to-rust-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 text-base shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile-Optimized Additional Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <div className="space-y-6 sm:space-y-8">
          {/* Mobile-Optimized Safety Features */}
          <SafetyFeatures />
          
          {/* Mobile-Optimized Similar Listings */}
          <SimilarListings currentPropertyId={property.id} />
          
          {/* Mobile-Optimized Guest Stories */}
          <GuestStoriesSection 
            propertyId={property.id}
            propertyName={property.name}
            onStoryClick={(story) => {
              console.log('Story clicked:', story);
            }}
          />
          
          {/* Mobile-Optimized Instagram Testimonials */}
          <InstagramTestimonials 
            propertyId={property.id}
            onPropertySelect={(id) => {
              console.log('Selected property:', id);
            }}
          />
        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* Mobile-Optimized Modals */}
      {isLightboxOpen && (
        <PhotoLightbox
          images={(property.images || []).map((url, index) => ({ 
            url, 
            title: `${property.name} - Image ${index + 1}` 
          }))}
          initialIndex={currentImageIndex}
          isOpen={isLightboxOpen}
          onClose={closeLightbox}
        />
      )}

      {isBookingModalOpen && (
        <BookingModal
          property={property}
          isOpen={isBookingModalOpen}
          onClose={() => setIsBookingModalOpen(false)}
          onBookingSuccess={onBookingSuccess}
        />
      )}
    </div>
  );
};

export default PropertyDetail;