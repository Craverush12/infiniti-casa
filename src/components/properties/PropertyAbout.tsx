import React from 'react';
import { BookOpen, Sparkles, Quote } from 'lucide-react';
import type { PropertyDetailData } from '../../data/propertyDetails';
import { getPropertyImageUrls, pickVibrantImage } from '../../utils/propertyAssets';

interface PropertyAboutProps {
  property: PropertyDetailData;
  themeHex?: string;
}

const PropertyAbout: React.FC<PropertyAboutProps> = ({ property, themeHex = '#0f766e' }) => {
  return (
    <section className="py-16 bg-gradient-to-br from-cream-50 via-white to-sage-50 text-gray-900">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-center space-x-2" style={{ color: themeHex }}>
                <BookOpen className="w-5 h-5" />
                <span className="text-sm font-medium tracking-wide">About This Home</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-editorial font-light">
                {property.story.title}
              </h2>
              
              {/* Punchy Lines About Unique Features */}
              <div className="space-y-4">
                <p className="text-xl text-gray-700 leading-relaxed">
                  {property.story.content}
                </p>
              </div>
            </div>

            {/* Unique Features Grid */}
            <div className="grid grid-cols-2 gap-4">
              {property.story.features.slice(0, 4).map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: themeHex }}></div>
                  <span className="text-gray-800">{feature}</span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t" style={{ borderColor: `${themeHex}22` }}>
              <div className="text-center">
                <div className="text-2xl font-semibold text-gray-900">
                  {property.hero.rating}
                </div>
                <div className="text-sm text-gray-500">Guest Rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-semibold text-gray-900">
                  {property.hero.reviews_count}
                </div>
                <div className="text-sm text-gray-500">Reviews</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-semibold text-gray-900">
                  {property.host.responseRate}%
                </div>
                <div className="text-sm text-gray-500">Response Rate</div>
              </div>
            </div>
          </div>

          {/* Visual Elements (Right column) */}
          <div className="space-y-6">
            {/* Hero/ambient image above quote and features */}
            <div className="relative rounded-2xl overflow-hidden border bg-white" style={{ borderColor: `${themeHex}22` }}>
              {(() => {
                const imgs = getPropertyImageUrls(property.name);
                const hero = pickVibrantImage(imgs);
                return (
                  <img
                    src={hero || imgs[0] || property.hero.images?.[0]}
                    alt={`${property.name} ambient`}
                    className="w-full h-64 md:h-72 object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                );
              })()}
              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/50 to-transparent">
                <div className="text-white text-sm">A glimpse of {property.name}</div>
              </div>
            </div>
            {/* Quote Card (moody) */}
            <div className="p-8 rounded-2xl border backdrop-blur bg-white" style={{ borderColor: `${themeHex}22` }}>
              <div className="flex items-start space-x-4">
                <Quote className="w-8 h-8 mt-1" style={{ color: themeHex }} />
                <div>
                  <p className="text-gray-700 italic mb-4 text-lg">
                    "Every detail has been thoughtfully curated to create an unforgettable experience for our guests."
                  </p>
                  <div className="flex items-center space-x-3 text-gray-700">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-medium" style={{ backgroundColor: themeHex }}>
                      IC
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">Infiniti Casa</div>
                      <div className="text-xs text-gray-500">Curated by us</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature Highlights */}
            <div className="grid grid-cols-2 gap-4">
              {property.hero.highlights.slice(0, 4).map((highlight, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl border backdrop-blur bg-white"
                  style={{ borderColor: `${themeHex}22` }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: themeHex }}>
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm text-gray-800">{highlight}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyAbout; 