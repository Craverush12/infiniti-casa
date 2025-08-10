import React from 'react';
import { 
  Sparkles, 
  Shield, 
  PawPrint, 
  Wifi, 
  Zap, 
  Lock,
  Mountain,
  Leaf,
  Star,
  Award,
  CheckCircle
} from 'lucide-react';
import type { PropertyDetailData } from '../../data/propertyDetails';

interface PropertyHighlightsProps {
  property: PropertyDetailData;
  themeHex?: string;
}

const PropertyHighlights: React.FC<PropertyHighlightsProps> = ({ property, themeHex = '#0f766e' }) => {
  const highlights = [
    { icon: Leaf, label: 'Zen Ambiance', color: 'bg-green-500' },
    { icon: Mountain, label: 'Valley View', color: 'bg-blue-500' },
    { icon: Shield, label: 'Superhost', color: 'bg-purple-500' },
    { icon: PawPrint, label: 'Pet Friendly', color: 'bg-orange-500' },
    { icon: Sparkles, label: 'Free Cleaning', color: 'bg-pink-500' },
    { icon: Lock, label: 'Smartlock', color: 'bg-indigo-500' },
    { icon: Wifi, label: 'High-Speed WiFi', color: 'bg-cyan-500' },
    { icon: Zap, label: 'Instant Booking', color: 'bg-yellow-500' },
    { icon: Star, label: 'Guest Favorite', color: 'bg-amber-500' },
    { icon: Award, label: 'Premium Quality', color: 'bg-emerald-500' }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-cream-50 via-white to-sage-50 text-gray-900">
      <div className="max-w-6xl mx-auto px-6">
        <div className="space-y-8">
          {/* Section Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-2" style={{ color: themeHex }}>
              <Sparkles className="w-5 h-5" />
              <span className="text-sm font-medium tracking-wide">Highlights</span>
            </div>
            <h2 className="text-3xl font-editorial font-light">
              What makes this place special
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover the art-forward details and comforts that shape your stay
            </p>
          </div>

          {/* Horizontal Scroll Highlights */}
          <div className="relative">
            <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
              {highlights.map((highlight, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 rounded-2xl p-6 bg-white backdrop-blur transition-transform duration-300 hover:scale-105 min-w-[200px] border"
                  style={{ borderColor: `${themeHex}22` }}
                >
                  <div className="flex flex-col items-center space-y-3 text-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center`} style={{ backgroundColor: themeHex }}>
                      <highlight.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-gray-800 text-sm">
                      {highlight.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* No dot indicators to keep it minimal */}
          </div>

          {/* Property-Specific Highlights */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {property.hero.highlights.map((highlight, index) => (
              <div
                key={index}
                className="p-6 rounded-xl border bg-white backdrop-blur"
                style={{ borderColor: `${themeHex}22` }}
              >
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 flex-shrink-0" style={{ color: themeHex }} />
                  <span className="text-gray-800">{highlight}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Trust Indicators (soft) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t" style={{ borderColor: `${themeHex}22` }}>
            <div className="text-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 border" style={{ borderColor: `${themeHex}22` }}>
                <Shield className="w-6 h-6" style={{ color: themeHex }} />
              </div>
              <div className="text-sm text-gray-900">Secure Booking</div>
              <div className="text-xs text-gray-600">100% Safe</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 border" style={{ borderColor: `${themeHex}22` }}>
                <CheckCircle className="w-6 h-6" style={{ color: themeHex }} />
              </div>
              <div className="text-sm text-gray-900">Verified Property</div>
              <div className="text-xs text-gray-600">Quality Assured</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 border" style={{ borderColor: `${themeHex}22` }}>
                <Zap className="w-6 h-6" style={{ color: themeHex }} />
              </div>
              <div className="text-sm text-gray-900">Instant Booking</div>
              <div className="text-xs text-gray-600">No Hidden Fees</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 border" style={{ borderColor: `${themeHex}22` }}>
                <Star className="w-6 h-6" style={{ color: themeHex }} />
              </div>
              <div className="text-sm text-gray-900">Guest Favorite</div>
              <div className="text-xs text-gray-600">Highly Rated</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyHighlights; 