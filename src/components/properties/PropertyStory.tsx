import React from 'react';
import { BookOpen, Sparkles, Award, Heart, Quote, Camera, MapPin, Clock, Users, Star } from 'lucide-react';
import type { PropertyDetailData } from '../../data/propertyDetails';

interface PropertyStoryProps {
  property: PropertyDetailData;
  themeHex?: string;
}

const PropertyStory: React.FC<PropertyStoryProps> = ({ property, themeHex = '#0f766e' }) => {
  return (
    <div className="max-w-6xl mx-auto px-6">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Content */}
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2" style={{ color: themeHex }}>
              <BookOpen className="w-5 h-5" />
              <span className="text-sm font-medium">Property Story</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900">
              {property.story.title}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              {property.story.content}
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 gap-4">
            {property.story.features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: themeHex }}></div>
                <span className="text-gray-700 font-medium">{feature}</span>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 pt-6 border-t border-gray-200">
            <div className="text-center">
              <div className="text-2xl font-bold" style={{ color: themeHex }}>
                {property.hero.rating}
              </div>
              <div className="text-sm text-gray-600">Guest Rating</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {property.hero.reviews_count}
              </div>
              <div className="text-sm text-gray-600">Reviews</div>
            </div>

          </div>
        </div>

        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {property.story.images.slice(0, 4).map((image, index) => (
              <div
                key={index}
                className={`relative overflow-hidden rounded-xl ${
                  index === 0 ? 'col-span-2 h-64' : 'h-32'
                }`}
              >
                <img
                  src={image}
                  alt={`${property.name} story image ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 hover:bg-opacity-0 transition-all duration-300" />
              </div>
            ))}
          </div>
          
          {/* Quote */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-start space-x-4">
              <Quote className="w-8 h-8 text-blue-500 mt-1" />
              <div>
                <p className="text-gray-700 italic mb-3">
                  "Every detail has been thoughtfully curated to create an unforgettable experience for our guests."
                </p>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-rust-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    L
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      Luxury Stays
                    </div>
                    <div className="text-xs text-gray-600">Curated by us</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyStory; 