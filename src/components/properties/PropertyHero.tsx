import React from 'react';
import { 
  Star, 
  MapPin, 
  Award,
  Sparkles
} from 'lucide-react';
import type { PropertyDetailData } from '../../data/propertyDetails';
import { getVibrantImageUrlForProperty } from '../../utils/propertyAssets';

interface PropertyHeroProps {
  property: PropertyDetailData;
  onImageClick?: (index: number) => void;
}

const PropertyHero: React.FC<PropertyHeroProps> = ({ property }) => {
  const bgImage = getVibrantImageUrlForProperty(property.name) || '/assets/afrohemia.png';

  return (
    <section className="relative h-screen overflow-hidden pt-16">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={bgImage}
          alt="Afrohemian background"
          className="w-full h-full object-cover"
          loading="eager"
          sizes="100vw"
          decoding="sync"
        />
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
      </div>

      {/* Content Container */}
      <div className="relative h-full w-full z-10">
        
        {/* Quality Badge - shifted down to avoid nav overlap */}
        <div className="absolute top-24 left-8">
          <div className="bg-white/95 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-full shadow-xl flex items-center space-x-2">
            <Award className="w-4 h-4 text-primary-500" />
            <span className="text-sm font-medium">Afrohemian Design</span>
          </div>
        </div>

        {/* Hero Content Overlay */}
        <div className="absolute inset-0 flex items-end">
          <div className="w-full max-w-6xl mx-auto px-8 pb-20">
            {/* Left-aligned Glassmorphic Info Card - slightly nudged right */}
            <div className="max-w-sm md:max-w-md bg-white/35 backdrop-blur-md border border-white/40 rounded-2xl p-6 md:p-8 shadow-elegant md:absolute md:left-16 md:bottom-24">
              {/* Property Name & Subtitle */}
              <div className="space-y-3">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-editorial font-light text-white leading-tight tracking-tight">
                  {property.hero.title}
                </h1>
                <p className="text-lg md:text-xl text-white/90 leading-relaxed">
                  {property.hero.subtitle}
                </p>
              </div>

              {/* Micro indicators (softened rating badge) */}
              <div className="mt-5 flex flex-wrap items-center gap-3">
                {/* Rating */}
                <div className="flex items-center space-x-2 bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full text-white">
                  <Star className="w-4 h-4 text-yellow-300" />
                  <span className="text-sm">{property.hero.rating}</span>
                  <span className="text-xs text-white/80">({property.hero.reviews_count})</span>
                </div>

                {/* Guest Favorite */}
                <div className="flex items-center space-x-2 bg-primary-500/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full shadow-xl">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-sm font-medium">Guest Favorite</span>
                </div>

                {/* Superhost */}
                <div className="flex items-center space-x-2 bg-white/15 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/25 text-white">
                  <Award className="w-4 h-4" />
                  <span className="text-sm font-medium">Superhost</span>
                </div>
              </div>

              {/* Location */}
              <div className="mt-4 flex items-center space-x-2 text-white/90">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{property.hero.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyHero;