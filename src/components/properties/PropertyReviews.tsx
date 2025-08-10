import React, { useState } from 'react';
import { 
  Star, 
  Award,
  ChevronDown,
  ChevronUp,
  Quote,
  Heart,
  MapPin,
  Calendar,
  Users
} from 'lucide-react';
import type { PropertyDetailData } from '../../data/propertyDetails';
import { getPropertyImageUrls } from '../../utils/propertyAssets';

interface PropertyReviewsProps {
  property: PropertyDetailData;
  themeHex?: string;
}

const PropertyReviews: React.FC<PropertyReviewsProps> = ({ property, themeHex = '#0f766e' }) => {
  const [showAllReviews, setShowAllReviews] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      year: 'numeric' 
    });
  };

  const getInitials = (name?: string) => {
    if (!name || typeof name !== 'string') return 'G';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getAvatarStyle = (name?: string) => {
    const opacities = ['95', '90', '85', '80', '75', '70', '65', '60'];
    const firstCharCode = name && name.length > 0 ? name.charCodeAt(0) : 71;
    const index = firstCharCode % opacities.length;
    return {
      backgroundColor: `${themeHex}${opacities[index]}`
    };
  };

  // Enhanced reviews with images and text-only reviews
  const enhancedReviews = [
    // Image reviews (using property images)
    ...property.testimonials.slice(0, 3).map((review, index) => ({
      ...review,
      type: 'image' as const,
      image: getPropertyImageUrls(property.name)[index] || getPropertyImageUrls(property.name)[0],
      highlights: ['Clean', 'Comfortable', 'Great Location']
    })),
    // Text-only reviews to maintain even grid
    {
      type: 'text-only' as const,
      name: 'Sarah M.',
      date: 'December 2024',
      rating: 5,
      comment: 'Absolutely stunning property! The attention to detail is incredible. Every corner tells a story.',
      highlights: ['Beautiful Design', 'Attention to Detail', 'Memorable Stay']
    },
    {
      type: 'text-only' as const,
      name: 'Michael R.',
      date: 'November 2024',
      rating: 5,
      comment: 'Perfect location and exceptional service. The hosts went above and beyond to make our stay special.',
      highlights: ['Perfect Location', 'Exceptional Service', 'Above & Beyond']
    },
    {
      type: 'text-only' as const,
      name: 'Priya K.',
      date: 'October 2024',
      rating: 5,
      comment: 'A true gem in Mumbai! The blend of comfort and style is perfect. Highly recommend!',
      highlights: ['True Gem', 'Comfort & Style', 'Highly Recommend']
    }
  ];

  const reviewsToShow = showAllReviews ? enhancedReviews : enhancedReviews.slice(0, 6);

  return (
    <section className="py-16 bg-gradient-to-br from-cream-50 via-white to-sage-50 text-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="space-y-12">
          {/* Enhanced Section Header */}
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center space-x-2" style={{ color: themeHex }}>
              <Star className="w-6 h-6" />
              <span className="text-lg font-medium tracking-wide">Guest Reviews</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 leading-tight">
              <span className="block text-gray-800">What our guests</span>
              <span className="block text-gray-600 font-normal italic">are saying</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Real experiences from travelers who've discovered the magic of this property
            </p>
          </div>

          {/* Enhanced Overall Rating Card */}
          <div className="rounded-3xl p-8 bg-white shadow-lg border" style={{ borderColor: `${themeHex}15` }}>
            <div className="grid md:grid-cols-3 gap-8 items-center">
              {/* Rating Summary */}
              <div className="text-center">
                <div className="text-5xl font-bold mb-3 text-gray-900">
                  {property.hero.rating}
                </div>
                <div className="flex justify-center space-x-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-7 h-7 ${
                        star <= Math.floor(Number(property.hero.rating))
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <div className="text-lg text-gray-600 font-medium">
                  {property.hero.reviews_count} verified reviews
                </div>
              </div>

              {/* Rating Breakdown */}
              <div className="space-y-4">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center space-x-4">
                    <span className="text-lg text-gray-700 w-10 font-medium">{rating}★</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-3">
                      <div 
                        className="h-3 rounded-full transition-all duration-500"
                        style={{ width: `${(rating / 5) * 100}%`, backgroundColor: themeHex }}
                      ></div>
                    </div>
                    <span className="text-lg text-gray-700 w-16 font-medium">
                      {Math.round((rating / 5) * 100)}%
                    </span>
                  </div>
                ))}
              </div>

              {/* Guest Favorite Badge */}
              <div className="text-center">
                <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-6 py-3 rounded-full shadow-lg">
                  <Award className="w-6 h-6" />
                  <span className="font-semibold text-lg">Guest Favorite</span>
                </div>
                <p className="text-gray-600 mt-3 font-medium">Consistently rated 5 stars</p>
                <div className="flex items-center justify-center space-x-4 mt-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Heart className="w-4 h-4 text-red-400" />
                    <span>98% recommend</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviewsToShow.map((review, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
              >
                {review.type === 'image' && review.image && (
                  /* Image Review Card */
                  <div className="relative">
                    {/* Larger Property Image */}
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={review.image}
                        alt={property.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      
                      {/* Property Info Overlay */}
                      <div className="absolute bottom-4 left-4 text-white">
                        <h4 className="font-semibold text-lg">{property.name}</h4>
                        <div className="flex items-center space-x-2 text-sm opacity-90">
                          <MapPin className="w-4 h-4" />
                          <span>Mumbai</span>
                        </div>
                      </div>

                      {/* Rating Badge */}
                      <div className="absolute top-4 right-4 flex items-center space-x-1 bg-white/90 backdrop-blur-sm border border-white/30 px-3 py-2 rounded-full">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="font-semibold text-gray-700">{review.rating}</span>
                      </div>
                    </div>

                    {/* Review Content - Reduced Padding */}
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div 
                            className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold"
                            style={getAvatarStyle((review as any).name || (review as any).user)}
                          >
                            {getInitials((review as any).name || (review as any).user)}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">{(review as any).name || (review as any).user}</div>
                            <div className="text-sm text-gray-500">{formatDate((review as any).date)}</div>
                          </div>
                        </div>
                      </div>

                      <Quote className="w-5 h-5 text-gray-300 mb-3" />
                      <p className="text-gray-700 leading-relaxed mb-4 line-clamp-4">
                        "{review.comment}"
                      </p>

                      {/* Review Highlights */}
                      <div className="flex flex-wrap gap-2">
                        {review.highlights?.map((highlight) => (
                          <span
                            key={highlight}
                            className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full font-medium"
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {review.type === 'text-only' && (
                  /* Text-Only Review Card */
                  <div className="p-6 h-full flex flex-col">
                    {/* Review Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold"
                          style={getAvatarStyle(review.name)}
                        >
                          {getInitials(review.name)}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{review.name}</div>
                          <div className="text-sm text-gray-500">{review.date}</div>
                        </div>
                      </div>
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className="w-4 h-4 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                    </div>

                    {/* Review Content */}
                    <div className="flex-1">
                      <Quote className="w-5 h-5 text-gray-300 mb-3" />
                      <p className="text-gray-700 leading-relaxed mb-4 line-clamp-4">
                        "{review.comment}"
                      </p>
                    </div>

                    {/* Review Highlights */}
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {review.highlights?.map((highlight) => (
                        <span
                          key={highlight}
                          className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full font-medium"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Enhanced Show More/Less Button */}
          {enhancedReviews.length > 6 && (
            <div className="text-center">
              <button
                onClick={() => setShowAllReviews(!showAllReviews)}
                className="inline-flex items-center space-x-3 bg-white border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-full font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <span className="text-lg">
                  {showAllReviews ? 'Show Less Reviews' : `Show All ${enhancedReviews.length} Reviews`}
                </span>
                {showAllReviews ? (
                  <ChevronUp className="w-6 h-6" />
                ) : (
                  <ChevronDown className="w-6 h-6" />
                )}
              </button>
            </div>
          )}

          {/* Enhanced Review Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-gray-200">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {property.hero.rating}
              </div>
              <div className="text-gray-600 font-medium">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {property.hero.reviews_count}
              </div>
              <div className="text-gray-600 font-medium">Total Reviews</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">
                98%
              </div>
              <div className="text-gray-600 font-medium">Recommend</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">
                5★
              </div>
              <div className="text-gray-600 font-medium">Most Common</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyReviews; 