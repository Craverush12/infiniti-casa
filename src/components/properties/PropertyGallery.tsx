import React, { useState, useRef, useCallback } from 'react';
import { OptimizedImage } from '../../utils/imageOptimization';
import { 
  ArrowLeft, 
  ArrowRight, 
  Maximize2, 
  Camera
} from 'lucide-react';
import type { PropertyDetailData } from '../../data/propertyDetails';

interface PropertyGalleryProps {
  property: PropertyDetailData;
  onImageClick?: (index: number) => void;
  themeHex?: string;
}

const PropertyGallery: React.FC<PropertyGalleryProps> = ({ property, onImageClick, themeHex = '#0f766e' }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => 
      prev === property.hero.images.length - 1 ? 0 : prev + 1
    );
  }, [property.hero.images.length]);

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? property.hero.images.length - 1 : prev - 1
    );
  }, [property.hero.images.length]);

  return (
    <section className="py-16 bg-gradient-to-br from-cream-50 via-white to-sage-50 text-gray-900">
      <div className="max-w-6xl mx-auto px-6">
        <div className="space-y-8">
          {/* Section Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-2" style={{ color: themeHex }}>
              <Camera className="w-5 h-5" />
              <span className="text-sm font-medium tracking-wide">Gallery</span>
            </div>
            <h2 className="text-3xl font-editorial font-light">
              Explore this home
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover every corner through carefully curated photography
            </p>
          </div>

          {/* Main Gallery */}
          <div 
            ref={galleryRef}
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Main Image */}
            <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <OptimizedImage
                src={property.hero.images[currentImageIndex]}
                alt={`${property.name} - Image ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
                loading="eager"
                decoding="sync"
                sizes="100vw"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              
              {/* Navigation Arrows */}
              <div className={`absolute inset-0 flex items-center justify-between px-6 transition-opacity duration-300 ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}>
                <button
                  onClick={prevImage}
                  aria-label="Previous image"
                  className="bg-white/95 hover:bg-white text-gray-800 p-3 rounded-full transition-all duration-300 shadow-xl focus:outline-none focus:ring-2 focus:ring-gray-300 hover:scale-110 backdrop-blur-sm"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextImage}
                  aria-label="Next image"
                  className="bg-white/95 hover:bg-white text-gray-800 p-3 rounded-full transition-all duration-300 shadow-xl focus:outline-none focus:ring-2 focus:ring-gray-300 hover:scale-110 backdrop-blur-sm"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>

              {/* Expand Button */}
              <button
                onClick={() => onImageClick?.(currentImageIndex)}
                className="absolute top-4 right-4 bg-white/95 hover:bg-white text-gray-800 p-3 rounded-full transition-all duration-300 shadow-xl hover:scale-110 backdrop-blur-sm"
              >
                <Maximize2 className="w-5 h-5" />
              </button>

              {/* Image Counter */}
              <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                {currentImageIndex + 1} / {property.hero.images.length}
              </div>
            </div>

            {/* Thumbnail Preview */}
            <div className="mt-6">
              <div className="flex space-x-4 overflow-x-auto pb-4">
                {property.hero.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative flex-shrink-0 transition-all duration-300 ${
                      index === currentImageIndex
                        ? 'scale-105'
                        : 'hover:scale-105'
                    }`}
                    style={index === currentImageIndex ? { boxShadow: `0 0 0 2px ${themeHex}` } : undefined}
                  >
                    <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-lg overflow-hidden">
                      <OptimizedImage
                        src={image}
                        alt={`${property.name} thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                        sizes="(max-width: 1024px) 33vw, 200px"
                      />
                    </div>
                    {index === currentImageIndex && (
                      <div className="absolute inset-0 rounded-lg" style={{ backgroundColor: `${themeHex}33` }} />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PropertyGallery; 