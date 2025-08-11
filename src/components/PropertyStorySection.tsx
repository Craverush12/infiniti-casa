import React, { useState, useEffect, useRef } from 'react';
import { getPropertyImageUrls } from '../utils/propertyAssets';

interface PropertyStorySectionProps {
  onPropertySelect?: (propertyId: number) => void;
}

const allStories = [
  {
    id: 1,
    title: 'Skyline Dreams',
    subtitle: 'Penthouse above the city',
    description: '',
    image: getPropertyImageUrls('Sky Lounge (Penthouse + Terrace)')[0],
    hoverImage: getPropertyImageUrls('Sky Lounge (Penthouse + Terrace)')[1] || getPropertyImageUrls('Sky Lounge (Penthouse + Terrace)')[0],
    quote: 'Where sunsets meet the sea and skyline.',
    propertyName: 'Sky Lounge (Penthouse + Terrace)'
  },
  {
    id: 2,
    title: 'Minimal & Central',
    subtitle: 'Cozy studio near the ocean',
    description: '',
    image: getPropertyImageUrls('The Little White Bandra Studio')[0],
    hoverImage: getPropertyImageUrls('The Little White Bandra Studio')[1] || getPropertyImageUrls('The Little White Bandra Studio')[0],
    quote: 'Peaceful, compact, and complete.',
    propertyName: 'The Little White Bandra Studio'
  },
  {
    id: 3,
    title: 'Terrace Living',
    subtitle: 'Bungalow with private terrace',
    description: '',
    image: getPropertyImageUrls('India House – (Full Bungalow with Private Terrace)')[0],
    hoverImage: getPropertyImageUrls('India House – (Full Bungalow with Private Terrace)')[1] || getPropertyImageUrls('India House – (Full Bungalow with Private Terrace)')[0],
    quote: 'Ocean breeze and open skies.',
    propertyName: 'India House – (Full Bungalow with Private Terrace)'
  },
  {
    id: 4,
    title: 'Asian Calm',
    subtitle: 'Spacious zen-inspired home',
    description: '',
    image: getPropertyImageUrls('City Zen (Asian home Bandra)')[0],
    hoverImage: getPropertyImageUrls('City Zen (Asian home Bandra)')[1] || getPropertyImageUrls('City Zen (Asian home Bandra)')[0],
    quote: 'Tranquility in the heart of Bandra.',
    propertyName: 'City Zen (Asian home Bandra)'
  },
  {
    id: 5,
    title: 'Garden Comfort',
    subtitle: 'Warm cottage with a yard',
    description: '',
    image: getPropertyImageUrls('Bandra Cottage with Yard')[0],
    hoverImage: getPropertyImageUrls('Bandra Cottage with Yard')[1] || getPropertyImageUrls('Bandra Cottage with Yard')[0],
    quote: 'A gentle pause in Bandra.',
    propertyName: 'Bandra Cottage with Yard'
  },
  {
    id: 6,
    title: 'Afro-Boho Story',
    subtitle: 'Designed by Nicole Padival',
    description: '',
    image: getPropertyImageUrls('The Quaint Afrohemian 1BHK (Bandra West)')[0],
    hoverImage: getPropertyImageUrls('The Quaint Afrohemian 1BHK (Bandra West)')[1] || getPropertyImageUrls('The Quaint Afrohemian 1BHK (Bandra West)')[0],
    quote: 'Rich colors, textures, and calm.',
    propertyName: 'The Quaint Afrohemian 1BHK (Bandra West)'
  },
  {
    id: 7,
    title: 'Dopamine Decor',
    subtitle: 'Artist-designed home',
    description: '',
    image: getPropertyImageUrls('The Bandra Art House (Dopamine Decor)')[0],
    hoverImage: getPropertyImageUrls('The Bandra Art House (Dopamine Decor)')[1] || getPropertyImageUrls('The Bandra Art House (Dopamine Decor)')[0],
    quote: 'Creative energy and sunlight.',
    propertyName: 'The Bandra Art House (Dopamine Decor)'
  }
];

const PropertyStorySection: React.FC<PropertyStorySectionProps> = ({ onPropertySelect }) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Auto-rotate removed for clarity; focus on hover interactions only

  return (
    <section 
      ref={containerRef}
      className="relative py-16 md:py-24 overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img 
          src="/site/assets/afrohemia.png" 
          alt="Afrohemian background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 "></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-24 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <h2 className="text-5xl md:text-6xl font-light text-gray-900 mb-8 leading-tight">
            <span className="block text-gray-800">Every stay</span>
            <span className="block text-gray-600 font-normal italic">tells a story</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover the unique narratives behind each of our carefully curated properties
          </p>
        </div>

        {/* Vertical, reel-like portrait cards in a horizontal scroll (all breakpoints) */}
        <div className="-mx-4 px-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory">
          <div className="flex gap-4 md:gap-6">
            {allStories.map((story, index) => (
              <div
                key={story.id}
                className={`snap-start group cursor-pointer transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
                style={{ transitionDelay: `${index * 120}ms` }}
                onClick={() => onPropertySelect?.(story.id)}
              >
                <div
                  className="relative rounded-2xl overflow-hidden boutique-shadow"
                  style={{ height: '78vh', width: 'clamp(320px, 85vw, 480px)', aspectRatio: '9 / 16' }}
                >
                  {/* Base image */}
                  <img src={story.image} alt={story.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
                  {/* Dim overlay on hover */}
                  <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/40" />
                  {/* Optional hover image crossfade */}
                  {Boolean((story as any).hoverImage) && (
                    <img src={(story as any).hoverImage} alt={story.title} className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-80" />
                  )}
                  {/* Centered property name with brand font, hidden until hover */}
                  <div className="absolute inset-0 flex items-center justify-center px-3 sm:px-4">
                    <div className="opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 bg-black/45 backdrop-blur-sm text-white rounded-xl px-4 sm:px-5 py-2 shadow-lg ring-1 ring-white/20 max-w-[85%]">
                      <span className="text-base sm:text-lg md:text-xl font-editorial tracking-wide drop-shadow-sm text-center break-words">{story.propertyName}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* No progress indicators/dots for mobile aesthetics */}
      </div>
    </section>
  );
};

export default PropertyStorySection; 