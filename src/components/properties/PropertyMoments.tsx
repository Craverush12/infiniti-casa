import React, { useState, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Camera,
  Users,
  Star,
  Award,
  Sparkles,
  Play,
  ExternalLink,
  Quote
} from 'lucide-react';
import type { PropertyDetailData } from '../../data/propertyDetails';

interface PropertyMomentsProps {
  property: PropertyDetailData;
  onImageClick?: (index: number) => void;
  themeHex?: string;
}

interface MomentCard {
  id: number;
  image: string;
  alt: string;
  name: string;
  badge: string;
  description: string;
  quote: string;
  quoteAuthor: string;
  type: 'family' | 'creator' | 'brand' | 'solo' | 'couple';
  photos?: string[];
  video?: string;
}

const PropertyMoments: React.FC<PropertyMomentsProps> = ({ property, themeHex = '#0f766e' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMoment, setSelectedMoment] = useState<MomentCard | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Placeholder-only moments to avoid missing assets
  const placeholder = 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop';
  const moments: MomentCard[] = [
    { id: 1, image: placeholder, alt: 'Guest moment placeholder', name: 'Guest Story', badge: 'Stay', description: 'A cozy memory from a recent stay.', quote: 'Felt like home, but better.', quoteAuthor: '@guest', type: 'family' },
    { id: 2, image: placeholder, alt: 'Guest moment placeholder', name: 'Creative Session', badge: 'Creator', description: 'Captured some beautiful frames.', quote: 'Every corner is photogenic.', quoteAuthor: '@creator', type: 'creator' },
    { id: 3, image: placeholder, alt: 'Guest moment placeholder', name: 'Remote Work', badge: 'Workation', description: 'A productive and peaceful retreat.', quote: 'Best spot to focus.', quoteAuthor: '@remote', type: 'solo' }
  ];

  const getBadgeColor = (type: string) => {
    // Use theme color with different opacity for variety
    const opacity = {
      family: '100',
      creator: '90',
      brand: '80',
      solo: '85',
      couple: '95'
    };
    return opacity[type as keyof typeof opacity] || '100';
  };

  const getBadgeIcon = (type: string) => {
    const icons = {
      family: Users,
      creator: Camera,
      brand: Award,
      solo: Star,
      couple: Heart
    };
    return icons[type as keyof typeof icons] || Sparkles;
  };

  const scrollToNext = () => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.offsetWidth * 0.8;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollToPrev = () => {
    if (carouselRef.current) {
      const scrollAmount = -(carouselRef.current.offsetWidth * 0.8);
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleMomentClick = (moment: MomentCard) => {
    setSelectedMoment(moment);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMoment(null);
  };

  return (
    <>
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="space-y-8">
            {/* Section Header */}
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center space-x-2" style={{ color: themeHex }}>
                <Heart className="w-5 h-5" />
                <span className="text-sm font-medium">Guest Experiences</span>
              </div>
              <h2 className="text-4xl font-bold text-gray-900">
                Moments Made at {property.name}
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                See how guests and creators crafted unique memories in this cozy {property.hero.location.toLowerCase()} cottage.
              </p>
            </div>

            {/* Carousel Container */}
            <div className="relative">
              {/* Navigation Buttons */}
              <button
                onClick={scrollToPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-all duration-200 hover:scale-110 border"
                style={{ borderColor: `${themeHex}22` }}
                aria-label="Previous moments"
              >
                <ChevronLeft className="w-6 h-6" style={{ color: themeHex }} />
              </button>

              <button
                onClick={scrollToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-all duration-200 hover:scale-110 border"
                style={{ borderColor: `${themeHex}22` }}
                aria-label="Next moments"
              >
                <ChevronRight className="w-6 h-6" style={{ color: themeHex }} />
              </button>

              {/* Carousel */}
              <div
                ref={carouselRef}
                className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {moments.map((moment) => {
                  const BadgeIcon = getBadgeIcon(moment.type);
                  return (
                    <div
                      key={moment.id}
                      className="flex-shrink-0 w-80 h-96 snap-start"
                    >
                      <div
                        className="group relative h-full bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
                        onClick={() => handleMomentClick(moment)}
                      >
                        {/* Image */}
                        <div className="relative h-full w-full">
                          <img
                            src={moment.image}
                            alt={moment.alt}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            loading="lazy"
                          />
                          
                          {/* Gradient Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          
                          {/* Badge */}
                          <div 
                            className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 text-white"
                            style={{ backgroundColor: `${themeHex}${getBadgeColor(moment.type) === '100' ? '' : getBadgeColor(moment.type)}` }}
                          >
                            <BadgeIcon className="w-3 h-3" />
                            <span>{moment.badge}</span>
                          </div>

                          {/* Play button for video content */}
                          {moment.video && (
                            <div className="absolute top-4 right-4 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center">
                              <Play className="w-4 h-4 text-gray-700 ml-0.5" />
                            </div>
                          )}

                          {/* Hover Overlay Content */}
                          <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="space-y-3">
                              {/* Name */}
                              <h3 className="text-white font-semibold text-lg">
                                {moment.name}
                              </h3>
                              
                              {/* Description */}
                              <p className="text-white/90 text-sm">
                                {moment.description}
                              </p>
                              
                              {/* Quote */}
                              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                                <div className="flex items-start space-x-2">
                                  <Quote className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: themeHex }} />
                                  <div>
                                    <p className="text-white italic text-sm leading-relaxed">
                                      "{moment.quote}"
                                    </p>
                                    <p className="text-white/80 text-xs mt-2">
                                      — {moment.quoteAuthor}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              
                              {/* See More Button */}
                              <button
                                className="w-full bg-white/20 backdrop-blur-sm text-white py-2 px-4 rounded-xl font-medium hover:bg-white/30 transition-all duration-200 flex items-center justify-center space-x-2 border"
                                style={{ borderColor: `${themeHex}55` }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleMomentClick(moment);
                                }}
                              >
                                <span>See More</span>
                                <ExternalLink className="w-4 h-4" style={{ color: themeHex }} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Scroll Indicator */}
            <div className="flex justify-center space-x-2">
              {moments.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (carouselRef.current) {
                      const cardWidth = 320; // w-80 = 320px
                      const gap = 24; // gap-6 = 24px
                      const scrollPosition = index * (cardWidth + gap);
                      carouselRef.current.scrollTo({ left: scrollPosition, behavior: 'smooth' });
                      setCurrentIndex(index);
                    }
                  }}
                  className={`h-2 rounded-full transition-all duration-200 ${
                    index === currentIndex ? 'w-6' : 'w-2 bg-gray-300'
                  }`}
                  style={index === currentIndex ? { backgroundColor: themeHex } : undefined}
                  aria-label={`Go to moment ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Modal for expanded view */}
      {isModalOpen && selectedMoment && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  {selectedMoment.name}
                </h3>
                <button
                  onClick={closeModal}
                  className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <span className="sr-only">Close</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Gallery Grid */}
              {selectedMoment.photos && selectedMoment.photos.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                  {selectedMoment.photos.map((photo, index) => (
                    <div key={index} className="aspect-square rounded-xl overflow-hidden">
                      <img
                        src={photo}
                        alt={`${selectedMoment.name} experience photo ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Video if available */}
              {selectedMoment.video && (
                <div className="mb-6">
                  <video
                    controls
                    className="w-full rounded-xl"
                    poster={selectedMoment.image}
                  >
                    <source src={selectedMoment.video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}

              {/* Quote and Description */}
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="flex items-start space-x-3">
                    <Quote className="w-6 h-6 mt-1" style={{ color: themeHex }} />
                    <div>
                      <p className="text-gray-700 italic text-lg leading-relaxed">
                        "{selectedMoment.quote}"
                      </p>
                      <p className="text-gray-500 mt-3">
                        — {selectedMoment.quoteAuthor}
                      </p>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600">
                  {selectedMoment.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PropertyMoments; 