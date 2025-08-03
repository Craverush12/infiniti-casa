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
import PropertyHero from './properties/PropertyHero';
import PropertyStory from './properties/PropertyStory';
import PropertyAmenities from './properties/PropertyAmenities';
import PropertyLocation from './properties/PropertyLocation';
import PropertyTestimonials from './properties/PropertyTestimonials';
import PropertyNavigation from './PropertyNavigation';
import TrustIndicators from './TrustIndicators';
import SimplifiedBooking from './SimplifiedBooking';
import LoadingSkeleton from './LoadingSkeleton';
import { getPropertyDetail } from '../data/propertyDetails';
import type { Database } from '../lib/database.types';
import type { PropertyDetailData } from '../data/propertyDetails';

type Property = Database['public']['Tables']['properties']['Row'];

interface PropertyDetailProps {
  propertyId: number;
  onBackToHome: () => void;
  onPropertySelect?: (propertyId: number) => void;
  user?: any;
  isAuthenticated?: boolean;
  onBookingSuccess?: (bookingId: string) => void;
  onShowSocialSharing?: (data: any) => void;
}

const PropertyDetail: React.FC<PropertyDetailProps> = ({ 
  propertyId, 
  onBackToHome, 
  onPropertySelect,
  user, 
  isAuthenticated, 
  onBookingSuccess, 
  onShowSocialSharing 
}) => {
  const [property, setProperty] = useState<Property | null>(null);
  const [propertyDetail, setPropertyDetail] = useState<PropertyDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [showMoreDetails, setShowMoreDetails] = useState(false);

  // Load property data
  useEffect(() => {
    const loadProperty = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Load property detail data
        const detailData = getPropertyDetail(propertyId);
        if (detailData) {
          setPropertyDetail(detailData);
        }
        
        // Load basic property data as fallback
        const data = await PropertyService.getPropertyById(propertyId);
        setProperty(data);
      } catch (err) {
        console.error('Error loading property:', err);
        setError('Failed to load property details');
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
    if (propertyDetail) {
      setCurrentImageIndex((prev) => 
        prev === propertyDetail.hero.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (propertyDetail) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? propertyDetail.hero.images.length - 1 : prev - 1
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <LoadingSkeleton type="hero" />
        <LoadingSkeleton type="amenities" />
        <LoadingSkeleton type="booking" />
        <LoadingSkeleton type="testimonials" />
      </div>
    );
  }

  if (error || !propertyDetail) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'Property not found'}</p>
          <button
            onClick={onBackToHome}
            className="bg-rust-600 text-white px-6 py-3 rounded-lg hover:bg-rust-700 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBackToHome}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                isScrolled 
                  ? 'bg-gray-100 text-gray-900 hover:bg-gray-200' 
                  : 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
            
            <div className="flex items-center space-x-4">
              <button
                className={`p-2 rounded-lg transition-colors ${
                  isScrolled 
                    ? 'bg-gray-100 text-gray-900 hover:bg-gray-200' 
                    : 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30'
                }`}
              >
                <Share className="w-5 h-5" />
              </button>
              <button
                className={`p-2 rounded-lg transition-colors ${
                  isScrolled 
                    ? 'bg-gray-100 text-gray-900 hover:bg-gray-200' 
                    : 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30'
                }`}
              >
                <Heart className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Property Hero Section */}
      <PropertyHero 
        property={propertyDetail}
        onImageClick={openLightbox}
      />

      {/* Property Story Section */}
      <PropertyStory property={propertyDetail} />

      {/* Trust Indicators Section */}
      <section className="py-16 bg-gradient-to-br from-slate-50 to-orange-50">
        <div className="max-w-6xl mx-auto px-6">
          <TrustIndicators
            rating={propertyDetail.hero.rating}
            reviewsCount={propertyDetail.hero.reviews_count}
            responseRate={propertyDetail.host.responseRate}
            responseTime={propertyDetail.host.responseTime}
            isSuperhost={propertyDetail.host.superhost}
            verifiedHost={true}
            instantBookable={true}
            cancellationPolicy={propertyDetail.booking.cancellationPolicy}
          />
        </div>
      </section>

      {/* Property Amenities Section */}
      <PropertyAmenities property={propertyDetail} />

      {/* Property Location Section */}
      <PropertyLocation property={propertyDetail} />

      {/* Property Testimonials Section */}
      <PropertyTestimonials property={propertyDetail} />

      {/* Simplified Booking Section */}
      <section className="py-16 bg-gradient-to-br from-slate-50 to-orange-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">
              Ready to book your stay?
            </h3>
            <p className="text-lg text-slate-600">
              Simple 3-step booking process - no hidden fees
            </p>
          </div>
          <SimplifiedBooking
            property={{
              name: propertyDetail.name,
              price: propertyDetail.hero.price,
              basePrice: propertyDetail.pricing.basePrice,
              cleaningFee: propertyDetail.pricing.cleaningFee,
              serviceFee: propertyDetail.pricing.serviceFee,
              totalPerNight: propertyDetail.pricing.totalPerNight
            }}
            onBookingSuccess={onBookingSuccess}
          />
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Property Navigation */}
      <PropertyNavigation
        currentPropertyId={propertyId}
        onPropertySelect={onPropertySelect || (() => {})}
        onBackToHome={onBackToHome}
      />

      {/* Photo Lightbox */}
      {isLightboxOpen && propertyDetail && (
        <PhotoLightbox
          images={propertyDetail.hero.images.map((url, index) => ({ 
            url, 
            title: `${propertyDetail.name} - Image ${index + 1}` 
          }))}
          initialIndex={currentImageIndex}
          isOpen={isLightboxOpen}
          onClose={closeLightbox}
        />
      )}

      {/* Booking Modal */}
      {isBookingModalOpen && propertyDetail && (
        <BookingModal
          property={{
            id: propertyDetail.id,
            name: propertyDetail.name,
            location: propertyDetail.hero.location,
            description: propertyDetail.story.content,
            guests: 4, // Default value
            bedrooms: 2, // Default value
            bathrooms: 2, // Default value
            price: propertyDetail.hero.price,
            category: 'luxury',
            aesthetic: 'modern',
            virtual_tour_url: null,
            video_url: null,
            images: propertyDetail.hero.images,
            features: {
              amenities: propertyDetail.amenities.features,
              rating: propertyDetail.hero.rating,
              reviews_count: propertyDetail.hero.reviews_count,
              is_available: true
            },
            story: propertyDetail.story.content,
            testimonials: propertyDetail.testimonials.map(t => ({
              name: t.user,
              rating: t.rating,
              comment: t.comment
            })),
            highlights: propertyDetail.hero.highlights,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }}
          isOpen={isBookingModalOpen}
          onClose={() => setIsBookingModalOpen(false)}
          onBookingSuccess={onBookingSuccess}
          user={user}
          isAuthenticated={isAuthenticated}
        />
      )}
    </div>
  );
};

export default PropertyDetail;