import React, { useState, useEffect, useRef } from 'react';
import { Star, MapPin, Users, Bed, Bath, Calendar, Heart, Share2, ArrowLeft, ArrowRight, Maximize2, Play, Pause, ChevronDown } from 'lucide-react';
import type { PropertyDetailData } from '../../data/propertyDetails';

interface PropertyHeroProps {
  property: PropertyDetailData;
  onImageClick?: (index: number) => void;
}

const PropertyHero: React.FC<PropertyHeroProps> = ({ property, onImageClick }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [showSwipeHint, setShowSwipeHint] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === property.hero.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? property.hero.images.length - 1 : prev - 1
    );
  };

  // Touch gesture handling
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setShowSwipeHint(false); // Hide hint on first interaction
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextImage();
    }
    if (isRightSwipe) {
      prevImage();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(nextImage, 3000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, property.hero.images.length]);

  // Auto-hide swipe hint after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSwipeHint(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString()}`;
  };

  return (
    <div className="relative min-h-screen bg-gray-900">
      {/* Image Carousel */}
      <div 
        ref={carouselRef}
        className="relative h-screen overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {property.hero.images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image}
              alt={`${property.name} - Image ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40" />
          </div>
        ))}

        {/* Navigation Arrows - Hidden on mobile, shown on larger screens */}
        <button
          onClick={prevImage}
          aria-label="Previous image"
          className="hidden md:block absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/50"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextImage}
          aria-label="Next image"
          className="hidden md:block absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/50"
        >
          <ArrowRight className="w-6 h-6" />
        </button>

        {/* Modern Image Indicators - Hidden on mobile, smaller on desktop */}
        <div className="hidden md:block absolute bottom-6 left-1/2 transform -translate-x-1/2">
          <div className="flex items-center space-x-2 bg-black/30 backdrop-blur-sm rounded-full px-3 py-2">
            {property.hero.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`transition-all duration-300 ${
                  index === currentImageIndex
                    ? 'w-6 h-1.5 bg-white rounded-full'
                    : 'w-1.5 h-1.5 bg-white/50 rounded-full hover:bg-white/75'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Mobile Controls - Simplified for mobile */}
        <div className="md:hidden absolute top-4 right-4 flex space-x-2">
          <button
            onClick={() => onImageClick?.(currentImageIndex)}
            className="bg-black/30 backdrop-blur-sm text-white p-2 rounded-full transition-all duration-300"
          >
            <Maximize2 className="w-5 h-5" />
          </button>
        </div>

        {/* Desktop Controls - Full controls for larger screens */}
        <div className="hidden md:block absolute top-8 right-8 flex space-x-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
          >
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
          </button>
          <button
            onClick={() => onImageClick?.(currentImageIndex)}
            className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
          >
            <Maximize2 className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Swipe Hint - Show briefly on first load */}
        {showSwipeHint && (
          <div className="md:hidden absolute bottom-32 left-1/2 transform -translate-x-1/2 text-center">
            <div className="bg-black/30 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs animate-pulse">
              Swipe to navigate
            </div>
          </div>
        )}
      </div>

      {/* Content Overlay - Clean white title */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full max-w-4xl mx-auto px-6 text-center text-white">
          {/* Phase 1: Property Name with Clean White Title */}
          <div className="flex flex-col items-center justify-center min-h-screen md:min-h-0">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 relative animate-fade-in text-center text-white">
              {property.hero.title}
            </h1>
            
            {/* Phase 2: Subtitle and Location - Initially hidden on mobile */}
            <div className={`transition-all duration-500 ${showDetails ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-6">
                {property.hero.subtitle}
              </p>
              <div className="flex items-center justify-center space-x-4 text-lg">
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  {property.hero.location}
                </div>
                <div className="flex items-center">
                  <Star className="w-5 h-5 mr-2 fill-yellow-400 text-yellow-400" />
                  {property.hero.rating} ({property.hero.reviews_count} reviews)
                </div>
              </div>
            </div>
          </div>

          {/* Phase 3: Highlights - Hidden on mobile initially */}
          <div className={`mb-8 transition-all duration-500 ${showDetails ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="flex flex-wrap justify-center gap-3">
              {property.hero.highlights.map((highlight, index) => (
                <span
                  key={index}
                  className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium"
                >
                  {highlight}
                </span>
              ))}
            </div>
          </div>

          {/* Phase 4: Price and Booking - Hidden on mobile initially */}
          <div className={`transition-all duration-500 ${showDetails ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold">{formatPrice(property.hero.price)}</div>
                <div className="text-slate-200">per night</div>
              </div>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                <button 
                  className="bg-white/95 backdrop-blur-sm text-slate-900 px-6 py-3 rounded-lg font-semibold hover:bg-white transition-all duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-white/50"
                  aria-label="Book this property now"
                >
                  Book Now
                </button>
                <button 
                  className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/30 transition-all duration-300 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
                  aria-label="Save this property to your wishlist"
                >
                  <Heart className="w-5 h-5 inline mr-2" />
                  Save
                </button>
                <button 
                  className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/30 transition-all duration-300 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
                  aria-label="Share this property"
                >
                  <Share2 className="w-5 h-5 inline mr-2" />
                  Share
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Interaction Hint - Only show on mobile when details are hidden */}
          {!showDetails && (
            <div className="md:hidden absolute bottom-20 left-1/2 transform -translate-x-1/2 text-center">
              <button
                onClick={() => setShowDetails(true)}
                className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-2 mx-auto hover:bg-white/30 transition-all duration-300 animate-bounce"
              >
                <span>View Details</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyHero; 