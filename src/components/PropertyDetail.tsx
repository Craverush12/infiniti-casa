import React, { useEffect, useState, Suspense, lazy } from 'react';
import { propertyDetails } from '../data/propertyDetails';
import Footer from './Footer';
import MetaService from '../services/metaService';
import { getPropertyTheme } from '../utils/propertyTheme';

const PropertyHero = lazy(() => import('./properties/PropertyHero'));
const PropertyAbout = lazy(() => import('./properties/PropertyAbout'));
const PropertyGallery = lazy(() => import('./properties/PropertyGallery'));
const PropertyHighlights = lazy(() => import('./properties/PropertyHighlights'));
const PropertyAmenities = lazy(() => import('./properties/PropertyAmenities'));
const PropertyBooking = lazy(() => import('./properties/PropertyBooking'));
const PropertyReviews = lazy(() => import('./properties/PropertyReviews'));
const PropertyLocation = lazy(() => import('./properties/PropertyLocation'));
const PropertyRules = lazy(() => import('./properties/PropertyRules'));

const PropertyMoments = lazy(() => import('./properties/PropertyMoments'));
const PhotoLightbox = lazy(() => import('./PhotoLightbox'));
const BookingModal = lazy(() => import('./BookingModal'));

interface PropertyDetailProps {
  propertyId?: number;
  onBackToHome?: () => void;
  onPropertySelect?: (propertyId: number) => void;
  user?: any;
  isAuthenticated?: boolean;
  onBookingSuccess?: (bookingId: string) => void;
  onShowSocialSharing?: (data: any) => void;
}

const PropertyDetail: React.FC<PropertyDetailProps> = ({ 
  propertyId = 1,
  onBackToHome: _onBackToHome,
  onPropertySelect: _onPropertySelect,
  user,
  isAuthenticated,
  onBookingSuccess,
  onShowSocialSharing: _onShowSocialSharing
}) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const propertyDetail = propertyDetails[propertyId];
  const theme = propertyDetail ? getPropertyTheme(propertyDetail.name) : { hex: '#0f766e' };

  // Update meta tags and structured data per property
  useEffect(() => {
    if (propertyDetail) {
      MetaService.updatePropertyMetaTags({
        id: propertyDetail.id,
        name: propertyDetail.name,
        location: propertyDetail.hero.location,
        description: propertyDetail.story.content,
        category: 'Luxury',
        images: propertyDetail.hero.images,
        price: propertyDetail.hero.price
      });
      const sd = MetaService.generateStructuredData(propertyDetail as any);
      MetaService.injectStructuredData(sd);
    }
  }, [propertyDetail]);

  // Reveal on scroll for smooth experiential animations
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll('.fade-in-up')) as HTMLElement[];
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  if (!propertyDetail) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Property Not Found</h1>
          <p className="text-gray-600">The property you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
    setIsLightboxOpen(true);
  };

  const handleBookNow = () => {
    setIsBookingModalOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Top Accent Band */}
      <div style={{ backgroundColor: theme.hex }} className="h-2 w-full" />
      {/* Hero Section */}
      <Suspense fallback={null}>
        <PropertyHero 
          property={propertyDetail} 
          onImageClick={handleImageClick}
        />
      </Suspense>

      {/* USP Chips under hero */}
      <div className="bg-white">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex flex-wrap gap-2">
            {(propertyDetail.hero.highlights?.slice(0,5) || []).map((usp, i) => (
              <span key={i} style={{ backgroundColor: theme.hex }} className="text-white px-3 py-1.5 rounded-full text-sm">
                {usp}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Guest Testimonial Section with subtle reveal */}
      <div className="py-16 bg-gradient-to-br from-cream-50 via-white to-sage-50 relative overflow-hidden fade-in-up">
        {/* Subtle background decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-32 h-32 rounded-full" style={{ backgroundColor: theme.hex }}></div>
          <div className="absolute bottom-10 right-10 w-20 h-20 rounded-full" style={{ backgroundColor: theme.hex }}></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-2 mb-4" style={{ color: theme.hex }}>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium tracking-wide">Guest Experiences</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-editorial font-light text-gray-900">What our guests say</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Main Testimonial */}
            <div className="space-y-6">
              <div className="relative">
                <div className="absolute -top-4 -left-4 text-6xl opacity-20" style={{ color: theme.hex }}>
                  "
                </div>
                <blockquote className="text-xl md:text-2xl font-light italic text-gray-800 leading-relaxed pl-8">
                  {propertyDetail.testimonials?.[0]?.comment || 'Our guests consistently praise the design, comfort, and service.'}
                </blockquote>
              </div>
              
              <div className="flex items-center space-x-4 pl-8">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold" style={{ backgroundColor: theme.hex }}>
                  {propertyDetail.testimonials?.[0]?.user?.charAt(0) || 'G'}
                </div>
                <div>
                  <div className="font-medium text-gray-900">
                    {propertyDetail.testimonials?.[0]?.user || 'Verified Guest'}
                  </div>
                  <div className="text-sm text-gray-500">
                    {propertyDetail.testimonials?.[0]?.stayDuration || 'Recent stay'} • {propertyDetail.testimonials?.[0]?.date || 'This month'}
                  </div>
                </div>
              </div>
            </div>

            {/* Rating & Stats */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-8 shadow-xl border" style={{ borderColor: `${theme.hex}22` }}>
                <div className="text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ backgroundColor: `${theme.hex}15` }}>
                    <svg className="w-8 h-8" style={{ color: theme.hex }} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  
                  <div>
                    <div className="text-4xl font-bold text-gray-900">{propertyDetail.hero.rating}</div>
                    <div className="text-sm text-gray-500 font-medium">out of 5 stars</div>
                  </div>
                  
                  <div className="pt-4 border-t" style={{ borderColor: `${theme.hex}22` }}>
                    <div className="text-2xl font-semibold text-gray-900">{propertyDetail.hero.reviews_count}</div>
                    <div className="text-sm text-gray-500">verified reviews</div>
                  </div>
                  
                  <div className="flex items-center justify-center space-x-1 pt-2">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${i < Math.floor(propertyDetail.hero.rating) ? 'text-yellow-400' : 'text-gray-200'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>

              {/* Additional testimonial snippet */}
              {propertyDetail.testimonials?.[1] && (
                <div className="bg-white rounded-xl p-6 border" style={{ borderColor: `${theme.hex}22` }}>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium" style={{ backgroundColor: theme.hex }}>
                      {propertyDetail.testimonials[1].user.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-700 italic text-sm leading-relaxed">
                        "{propertyDetail.testimonials[1].comment.substring(0, 100)}..."
                      </p>
                      <p className="text-xs text-gray-500 mt-2">— {propertyDetail.testimonials[1].user}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* About This Home Section */}
      <Suspense fallback={null}>
        <div className="fade-in-up">
          <PropertyAbout property={propertyDetail} themeHex={theme.hex} />
        </div>
      </Suspense>

      {/* Moments Made Section */}
      <Suspense fallback={null}>
        <div className="fade-in-up">
          <PropertyMoments 
            property={propertyDetail} 
            onImageClick={handleImageClick}
            themeHex={theme.hex}
          />
        </div>
      </Suspense>

      {/* Gallery Section */}
      <Suspense fallback={null}>
        <div className="fade-in-up">
          <PropertyGallery 
            property={propertyDetail} 
            onImageClick={handleImageClick}
            themeHex={theme.hex}
          />
        </div>
      </Suspense>

      {/* Highlights Section */}
      <Suspense fallback={null}>
        <div className="fade-in-up">
          <PropertyHighlights property={propertyDetail} themeHex={theme.hex} />
        </div>
      </Suspense>

      {/* Amenities Section */}
      <Suspense fallback={null}>
        <div className="fade-in-up">
          <PropertyAmenities property={propertyDetail} themeHex={theme.hex} />
        </div>
      </Suspense>

      {/* Booking Section */}
      <Suspense fallback={null}>
        <div className="fade-in-up">
          <PropertyBooking 
            property={propertyDetail}
            themeHex={theme.hex}
            onBookNow={handleBookNow}
          />
        </div>
      </Suspense>

      {/* Reviews Section */}
      <Suspense fallback={null}>
        <div className="fade-in-up">
          <PropertyReviews property={propertyDetail} themeHex={theme.hex} />
        </div>
      </Suspense>

      {/* Location Section */}
      <Suspense fallback={null}>
        <div className="fade-in-up">
          <PropertyLocation property={propertyDetail} themeHex={theme.hex} />
        </div>
      </Suspense>

      {/* House Rules & Security Section */}
      <Suspense fallback={null}>
        <div className="fade-in-up">
          <PropertyRules property={propertyDetail} themeHex={theme.hex} />
        </div>
      </Suspense>

      {/* Footer */}
      <Footer />

      {/* Photo Lightbox */}
      {isLightboxOpen && (
        <Suspense fallback={null}>
          <PhotoLightbox
            images={propertyDetail.hero.images.map((url, index) => ({ 
              url, 
              title: `${propertyDetail.name} - Image ${index + 1}` 
            }))}
            initialIndex={currentImageIndex}
            isOpen={isLightboxOpen}
            onClose={closeLightbox}
          />
        </Suspense>
      )}

      {/* Booking Modal */}
      {isBookingModalOpen && (
        <Suspense fallback={null}>
          <BookingModal
            isOpen={isBookingModalOpen}
            property={{
            id: propertyDetail.id,
            name: propertyDetail.name,
            location: propertyDetail.hero.location,
            description: propertyDetail.hero.subtitle,
            guests: 4,
            bedrooms: 2,
            bathrooms: 2,
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
              host: propertyDetail.host
            },
            story: propertyDetail.story.content,
            testimonials: propertyDetail.testimonials.map(t => ({
              name: t.user,
              rating: 5,
              comment: t.comment
            })),
            highlights: propertyDetail.hero.highlights,
            created_at: '2024-01-01T00:00:00Z',
            updated_at: '2024-01-01T00:00:00Z'
          }}
            onClose={closeBookingModal}
            onBookingSuccess={onBookingSuccess}
            user={user}
            isAuthenticated={isAuthenticated}
          />
        </Suspense>
      )}
    </div>
  );
};

export default PropertyDetail;