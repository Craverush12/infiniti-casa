import React, { useState } from 'react';
import { Clock, Star, MapPin, ArrowRight, Sparkles, Home, Users, MessageCircle } from 'lucide-react';
import { getPropertyImageUrls } from '../utils/propertyAssets';

interface LongTermBookingSectionProps {
  onContactClick?: () => void;
}

const LongTermBookingSection: React.FC<LongTermBookingSectionProps> = ({ onContactClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const benefits = [
    {
      icon: Star,
      title: 'Special Rates',
      description: 'Discounted pricing for extended stays'
    },
    {
      icon: Home,
      title: 'Fully Furnished',
      description: 'Everything you need for comfortable living'
    },
    {
      icon: Users,
      title: 'Personalized Service',
      description: 'Dedicated support for long-term guests'
    },
    {
      icon: Clock,
      title: 'Flexible Terms',
      description: 'Customizable check-in/check-out times'
    }
  ];

  // Trust indicators removed from layout per new design (kept features only)

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-blue-500 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 items-start">
          {/* Content Section (Left) */}
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-primary-500">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-xs sm:text-sm font-medium uppercase tracking-wide">Extended Stays</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-gray-900 leading-tight">
                <span className="block">Perfect for</span>
                <span className="block font-medium">Extended Stays</span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-lg">
                Whether you're relocating, on a long business trip, or simply want to immerse yourself in Mumbai's vibrant culture, our extended stay options offer the perfect blend of comfort and convenience.
              </p>
            </div>

            {/* Benefits removed from LEFT per new layout */}

            {/* Contact CTA only on LEFT */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
              <button
                onClick={onContactClick}
                className="group flex items-center justify-center space-x-2 px-6 sm:px-8 py-3 sm:py-4 bg-primary-500 text-white rounded-xl hover:bg-primary-600 active:bg-primary-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 text-sm sm:text-base"
              >
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="font-medium">Contact for Extended Stay</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Moved trust indicators out to right card per new layout (removed here) */}
          </div>

          {/* Right Card: Sky Lounge image + Benefits Grid (moved from left) */}
          <div className="relative mt-4 lg:mt-0">
            <div
              className={`relative bg-white rounded-2xl shadow-2xl p-6 sm:p-7 transform transition-all duration-500 ${
                isHovered ? 'scale-105 rotate-1' : 'scale-100 rotate-0'
              }`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Header removed per request */}

              {/* Property Preview - Sky Lounge image */}
              <div className="relative mb-4 sm:mb-6">
                <img
                  src={getPropertyImageUrls("Penthouse Sky Lounge")[0] || getPropertyImageUrls('skylounge')[0] || "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"}
                  alt="Extended Stay Property"
                  className="w-full h-44 sm:h-52 object-cover rounded-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl"></div>
                <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 text-white">
                  <h4 className="font-semibold text-sm sm:text-base">Penthouse Sky Lounge</h4>
                  <div className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm">
                    <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>Bandra West, Mumbai</span>
                  </div>
                </div>
              </div>

              {/* Benefits Grid inside the card (as-is) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-xl shadow-sm flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{benefit.title}</h3>
                      <p className="text-xs sm:text-sm text-gray-600">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full shadow-lg"></div>
            </div>

            {/* Background Decorative Elements */}
            <div className="absolute -top-8 -left-8 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-20 blur-xl"></div>
            <div className="absolute -bottom-8 -right-8 w-20 h-20 bg-gradient-to-br from-green-400 to-teal-500 rounded-full opacity-20 blur-xl"></div>
          </div>
        </div>

        {/* Bottom Stats */}
        {/* <div className="mt-12 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 text-center">
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">500+</div>
            <div className="text-xs sm:text-sm text-gray-600">Extended Stay Guests</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">4.9★</div>
            <div className="text-xs sm:text-sm text-gray-600">Average Rating</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">30+</div>
            <div className="text-xs sm:text-sm text-gray-600">Days Minimum</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">24/7</div>
            <div className="text-xs sm:text-sm text-gray-600">Support Available</div>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default LongTermBookingSection;