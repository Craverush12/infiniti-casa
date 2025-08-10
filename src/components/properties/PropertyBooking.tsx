import React, { useMemo, useState } from 'react';
import { 
  Calendar, 
  Users, 
  MapPin, 
  Star, 
  Shield, 
  CheckCircle,
  Clock,
  Zap,
  Heart,
  Share2,
  MessageCircle,
  Phone,
  CreditCard,
  Lock,
  Award,
  Sparkles
} from 'lucide-react';
import type { PropertyDetailData } from '../../data/propertyDetails';
import AvailabilityCalendar from '../AvailabilityCalendar';

interface PropertyBookingProps {
  property: PropertyDetailData;
  onBookNow?: () => void;
  themeHex?: string;
}

const PropertyBooking: React.FC<PropertyBookingProps> = ({ property, onBookNow, themeHex = '#0f766e' }) => {
  const [selectedDates, setSelectedDates] = useState({ checkIn: '', checkOut: '' });
  const [guests, setGuests] = useState(2);
  const maxGuests = 4; // Default maximum guests until data model includes this

  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString()}`;
  };

  const nights = useMemo(() => {
    if (!selectedDates.checkIn || !selectedDates.checkOut) return 1;
    const diff = new Date(selectedDates.checkOut).getTime() - new Date(selectedDates.checkIn).getTime();
    return Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  }, [selectedDates]);

  const totalBeforeDiscounts = useMemo(() => property.hero.price * nights, [property.hero.price, nights]);

  const discountedTotal = useMemo(() => {
    // Use pricing rules if provided
    const pricing = property.pricing;
    let subtotal = totalBeforeDiscounts;
    if (nights >= 28) {
      subtotal = subtotal * (1 - (pricing?.monthlyDiscount || 0) / 100);
    } else if (nights >= 7) {
      subtotal = subtotal * (1 - (pricing?.weeklyDiscount || 0) / 100);
    }
    const fees = (pricing?.cleaningFee || 0) + (pricing?.serviceFee || 0);
    return subtotal + fees;
  }, [property.pricing, totalBeforeDiscounts, nights]);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Booking Form */}
            <div className="rounded-2xl p-8 shadow-lg border" style={{ borderColor: `${themeHex}33`, background: 'linear-gradient(135deg, #ffffff, #f9fafb)' }}>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Reserve Your Stay
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Check-in
                  </label>
                  <input
                    type="date"
                    value={selectedDates.checkIn}
                    onChange={(e) => setSelectedDates(prev => ({ ...prev, checkIn: e.target.value }))}
                    className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:border-transparent"
                    style={{ borderColor: `${themeHex}55`, outlineColor: themeHex }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Check-out
                  </label>
                  <input
                    type="date"
                    value={selectedDates.checkOut}
                    onChange={(e) => setSelectedDates(prev => ({ ...prev, checkOut: e.target.value }))}
                    className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:border-transparent"
                    style={{ borderColor: `${themeHex}55`, outlineColor: themeHex }}
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Guests
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:border-transparent"
                  style={{ borderColor: `${themeHex}55`, outlineColor: themeHex }}
                >
                  {[1, 2, 3, 4, 5, 6].map(num => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'guest' : 'guests'}
                    </option>
                  ))}
                </select>
              </div>

            {/* Property Highlights */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-gray-500" />
                  <span className="text-sm text-gray-700">
                    Up to {maxGuests} guests
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-gray-500" />
                  <span className="text-sm text-gray-700">
                    {property.hero.location}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span className="text-sm text-gray-700">
                    {property.hero.rating} ({property.hero.reviews_count} reviews)
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-gray-500" />
                  <span className="text-sm text-gray-700">
                    Instant booking
                  </span>
                </div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
                <Shield className="w-8 h-8 mx-auto mb-2" style={{ color: themeHex }} />
                <div className="text-sm font-medium text-gray-900">Secure Booking</div>
                <div className="text-xs text-gray-600">100% Safe</div>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
                <Calendar className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <div className="text-sm font-medium text-gray-900">Free Cancellation</div>
                <div className="text-xs text-gray-600">Up to 24h</div>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
                <CreditCard className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <div className="text-sm font-medium text-gray-900">No Hidden Fees</div>
                <div className="text-xs text-gray-600">Transparent Pricing</div>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
                <Award className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                <div className="text-sm font-medium text-gray-900">Premium Quality</div>
                <div className="text-xs text-gray-600">Verified Property</div>
              </div>
            </div>

            {/* Availability Calendar */}
            <AvailabilityCalendar className="mt-6" />
          </div>

          {/* Sticky Booking Panel */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 bg-white rounded-2xl p-6 shadow-xl" style={{ border: `2px solid ${themeHex}33` }}>
              {/* Price Display */}
              <div className="mb-6">
                <div className="flex items-baseline space-x-2 mb-2">
                  <span className="text-3xl font-bold text-gray-900">
                    {formatPrice(property.hero.price)}
                  </span>
                  <span className="text-lg text-gray-600">per night</span>
                </div>
                {selectedDates.checkIn && selectedDates.checkOut && (
                  <div className="text-sm text-gray-600 space-y-1">
                    <div>Subtotal: {formatPrice(totalBeforeDiscounts)} for {nights} {nights === 1 ? 'night' : 'nights'}</div>
                    <div>Fees: {formatPrice((property.pricing?.cleaningFee || 0) + (property.pricing?.serviceFee || 0))}</div>
                    <div className="font-medium text-gray-900">Total: {formatPrice(discountedTotal)}</div>
                  </div>
                )}
              </div>

              {/* Book Now CTA */}
              <button 
                onClick={onBookNow}
                className="w-full text-white py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 mb-4"
                style={{ background: themeHex }}
              >
                Book Now
              </button>

              {/* Quick Actions */}
              <div className="flex space-x-3 mb-6">
                <button className="flex-1 flex items-center justify-center space-x-2 py-3 px-4 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-300">
                  <Heart className="w-5 h-5" />
                  <span className="font-medium">Save</span>
                </button>
                <button className="flex-1 flex items-center justify-center space-x-2 py-3 px-4 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-300">
                  <Share2 className="w-5 h-5" />
                  <span className="font-medium">Share</span>
                </button>
              </div>

              {/* Contact Options */}
              <div className="space-y-3">
                <button className="w-full flex items-center justify-center space-x-2 py-3 px-4 text-white rounded-xl transition-all duration-300" style={{ background: themeHex }}>
                  <MessageCircle className="w-5 h-5" />
                  <span className="font-medium">WhatsApp</span>
                </button>
                <button className="w-full flex items-center justify-center space-x-2 py-3 px-4 border text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-300" style={{ borderColor: `${themeHex}55` }}>
                  <Phone className="w-5 h-5" />
                  <span className="font-medium">Call Host</span>
                </button>
              </div>

              {/* Additional Trust Badges */}
              <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-700">Instant confirmation</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Zap className="w-5 h-5" style={{ color: themeHex }} />
                  <span className="text-sm text-gray-700">No booking fees</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Sparkles className="w-5 h-5 text-purple-500" />
                  <span className="text-sm text-gray-700">Premium experience</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyBooking; 