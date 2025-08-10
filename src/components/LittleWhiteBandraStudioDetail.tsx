import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  Star, 
  MapPin, 
  Wifi, 
  Coffee, 
  Utensils, 
  Car, 
  PawPrint, 
  Tv, 
  Key, 
  Sparkles, 
  Shield, 
  Clock, 
  Users, 
  Bed, 
  Bath, 
  Home, 
  Garden, 
  Leaf, 
  Heart,
  Share,
  MessageCircle,
  Calendar,
  CheckCircle,
  Zap,
  Smartphone,
  Bus,
  Train,
  Plane,
  Mountain,
  Eye,
  Lock,
  Camera,
  Volume2,
  Crown,
  Waves,
  Cloud,
  Sunset,
  Coffee as CoffeeIcon,
  Palette,
  Brush,
  Award,
  Users as UsersIcon,
  ArrowRight,
  Building,
  MapPin as MapPinIcon
} from 'lucide-react';
import PhotoLightbox from './PhotoLightbox';
import BookingModal from './BookingModal';
import LoadingSkeleton from './LoadingSkeleton';
import PropertyHero from './properties/PropertyHero';
import { getPropertyTheme } from '../utils/propertyTheme';
import PropertyMoments from './properties/PropertyMoments';
import { getPropertyDetail } from '../data/propertyDetails';
import type { PropertyDetailData } from '../data/propertyDetails';

interface LittleWhiteBandraStudioDetailProps {
  propertyId: number;
  onBackToHome: () => void;
  onPropertySelect?: (propertyId: number) => void;
  user?: any;
  isAuthenticated?: boolean;
  onBookingSuccess?: (bookingId: string) => void;
  onShowSocialSharing?: (data: any) => void;
}

const LittleWhiteBandraStudioDetail: React.FC<LittleWhiteBandraStudioDetailProps> = ({ 
  propertyId, 
  onBackToHome, 
  onPropertySelect,
  user, 
  isAuthenticated, 
  onBookingSuccess, 
  onShowSocialSharing 
}) => {
  const [propertyDetail, setPropertyDetail] = useState<PropertyDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  // Load property data
  useEffect(() => {
    const loadProperty = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const detailData = getPropertyDetail(propertyId);
        if (detailData) {
          setPropertyDetail(detailData);
        } else {
          setError('Property not found');
        }
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

  const reviewStats = {
    overall: 4.63,
    cleanliness: 4.7,
    accuracy: 4.6,
    checkIn: 4.7,
    communication: 4.7,
    location: 4.7,
    value: 4.4,
    totalReviews: 62,
    fiveStar: 71,
    fourStar: 24,
    threeStar: 2,
    twoStar: 3,
    oneStar: 0
  };

  const theme = getPropertyTheme(propertyDetail.name);

  return (
    <div className="min-h-screen bg-white">
      {/* Top Accent Band */}
      <div style={{ backgroundColor: theme.hex }} className="h-2 w-full" />
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

      {/* USP Chips */}
      <div className="bg-white">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex flex-wrap gap-2">
            {[ 'Prime central location', 'Walk everywhere', 'Cozy studio', 'Self check-in', 'Daily cleaning' ]
              .map((usp, i) => (
                <span key={i} style={{ backgroundColor: theme.hex }} className="text-white px-3 py-1.5 rounded-full text-sm">
                  {usp}
                </span>
              ))}
          </div>
        </div>
      </div>

      {/* Moments Made Section */}
      <PropertyMoments 
        property={propertyDetail}
        onImageClick={openLightbox}
      />

      {/* Property Info Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Property Description */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  {propertyDetail.story.title}
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  {propertyDetail.story.content}
                </p>
                
                {/* Capacity */}
                <div className="grid grid-cols-4 gap-6 mb-8">
                  <div className="text-center">
                    <Users className="w-8 h-8 mx-auto mb-2 text-rust-600" />
                    <div className="font-semibold text-gray-900">2 Guests</div>
                    <div className="text-sm text-gray-600">Maximum</div>
                  </div>
                  <div className="text-center">
                    <Bed className="w-8 h-8 mx-auto mb-2 text-rust-600" />
                    <div className="font-semibold text-gray-900">1 Bedroom</div>
                    <div className="text-sm text-gray-600">Studio Layout</div>
                  </div>
                  <div className="text-center">
                    <Bath className="w-8 h-8 mx-auto mb-2 text-rust-600" />
                    <div className="font-semibold text-gray-900">1.5 Bathrooms</div>
                    <div className="text-sm text-gray-600">Private</div>
                  </div>
                  <div className="text-center">
                    <Home className="w-8 h-8 mx-auto mb-2 text-rust-600" />
                    <div className="font-semibold text-gray-900">Studio</div>
                    <div className="text-sm text-gray-600">Entire Unit</div>
                  </div>
                </div>
              </div>

              {/* Amenities */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">What this place offers</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {propertyDetail.amenities.features.map((amenity, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-gray-700">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Location Over Size Section */}
              <div className="mb-12 bg-blue-50 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <MapPinIcon className="w-6 h-6 text-blue-600" />
                  <h3 className="text-xl font-bold text-gray-900">Location Over Size</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <ArrowRight className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-700">Less than one minute walk from Pali Hill</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <ArrowRight className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-700">Less than one minute walk from Carter Road</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <ArrowRight className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-700">Prime central location</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <ArrowRight className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-700">Surrounded by restaurants and cafés</span>
                  </div>
                </div>
              </div>

              {/* Cozy Studio Section */}
              <div className="mb-12 bg-pink-50 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Home className="w-6 h-6 text-pink-600" />
                  <h3 className="text-xl font-bold text-gray-900">Cozy Studio Features</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-pink-600" />
                    <span className="text-gray-700">150 square foot cozy studio</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-pink-600" />
                    <span className="text-gray-700">Third floor walk-up (no elevator)</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-pink-600" />
                    <span className="text-gray-700">Perfect for solo travelers or couples</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-pink-600" />
                    <span className="text-gray-700">Ideal for backpackers and remote workers</span>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Location</h3>
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-start space-x-3 mb-4">
                    <MapPin className="w-6 h-6 text-rust-600 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900">Bandra West, Mumbai, Maharashtra, India</p>
                      <p className="text-gray-600">Less than one minute's walk from Pali Hill and Carter Road (prime central location, surrounded by restaurants and cafés, quick walk to ocean promenade)</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Nearby Attractions</h4>
                      <ul className="space-y-1 text-gray-600">
                        <li>• Pali Hill (less than 1 minute walk)</li>
                        <li>• Carter Road (less than 1 minute walk)</li>
                        <li>• Ocean promenade</li>
                        <li>• Best cafés and restaurants</li>
                        <li>• Prime central location</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Transportation</h4>
                      <ul className="space-y-1 text-gray-600">
                        <li>• Airport: 8 km</li>
                        <li>• Railway: Bandra Terminus</li>
                        <li>• Metro: Bandra West Metro</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="font-semibold text-gray-900">Perfect for</span>
                    </div>
                    <ul className="space-y-1 text-gray-600 text-sm">
                      <li>• Single travelers or couples</li>
                      <li>• Backpackers and remote workers</li>
                      <li>• Those who prioritize location over size</li>
                      <li>• Quick access to Bandra's best spots</li>
                      <li>• Walkable lifestyle</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Reviews */}
              <div className="mb-12">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">
                    Reviews ({reviewStats.totalReviews})
                  </h3>
                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{reviewStats.overall}</span>
                  </div>
                </div>

                {/* Review Stats */}
                <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{reviewStats.cleanliness}</div>
                    <div className="text-sm text-gray-600">Cleanliness</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{reviewStats.accuracy}</div>
                    <div className="text-sm text-gray-600">Accuracy</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{reviewStats.checkIn}</div>
                    <div className="text-sm text-gray-600">Check-in</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{reviewStats.communication}</div>
                    <div className="text-sm text-gray-600">Communication</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{reviewStats.location}</div>
                    <div className="text-sm text-gray-600">Location</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{reviewStats.value}</div>
                    <div className="text-sm text-gray-600">Value</div>
                  </div>
                </div>

                {/* Review Highlights */}
                <div className="space-y-6">
                  {propertyDetail.testimonials.map((review, index) => (
                    <div key={index} className="border-b border-gray-200 pb-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-gray-900">{review.user}</span>
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700 mb-2">{review.comment}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>{review.date}</span>
                        <span>{review.stayDuration}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Booking Card */}
              <div className="sticky top-24 bg-white border border-gray-200 rounded-lg p-6 shadow-lg">
                <div className="text-2xl font-bold text-gray-900 mb-2">
                  ₹{propertyDetail.hero.price.toLocaleString()}
                  <span className="text-lg font-normal text-gray-600"> / night</span>
                </div>
                
                <div className="mb-6">
                  <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{reviewStats.overall} ({reviewStats.totalReviews} reviews)</span>
                  </div>
                </div>

                <button
                  onClick={() => setIsBookingModalOpen(true)}
                  className="w-full bg-rust-600 text-white py-3 rounded-lg font-semibold hover:bg-rust-700 transition-colors mb-4"
                >
                  Reserve
                </button>

                <div className="text-center text-sm text-gray-600 mb-4">
                  You won't be charged yet
                </div>

                {/* Check-in/Check-out */}
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Check-in
                    </label>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>After 2:00 PM</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Check-out
                    </label>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>Before 10:00 AM</span>
                    </div>
                  </div>
                </div>

                {/* Rules */}
                <div className="border-t border-gray-200 pt-4">
                  <h4 className="font-semibold text-gray-900 mb-2">House Rules</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• 2 guests maximum</li>
                    <li>• No smoking</li>
                    <li>• No parties</li>
                    <li>• Third floor walk-up (no elevator)</li>
                    <li>• Respect property and neighbors</li>
                  </ul>
                </div>

                {/* Unique Features */}
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Unique Features</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <Home className="w-4 h-4" />
                      <span>150 square foot cozy studio</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPinIcon className="w-4 h-4" />
                      <span>Prime central location</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>Daily cleaning service</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      {propertyDetail.hero.images.length > 1 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6">
            <h3 className="text-3xl font-bold text-gray-900 mb-8">Photos</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {propertyDetail.hero.images.slice(1, 9).map((image, index) => (
                <div
                  key={index}
                  className="aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => openLightbox(index + 1)}
                >
                  <img
                    src={image}
                    alt={`${propertyDetail.name} - Photo ${index + 2}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

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
            guests: 2,
            bedrooms: 1,
            bathrooms: 1.5,
            price: propertyDetail.hero.price,
            category: 'studio',
            aesthetic: 'cozy',
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

export default LittleWhiteBandraStudioDetail; 