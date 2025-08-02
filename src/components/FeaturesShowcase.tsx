import React, { useState, useEffect, useRef } from 'react';
import { Wifi, Car, Coffee, Utensils, Home, Shield, Clock, Star, Users, Heart } from 'lucide-react';

interface Amenity {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const amenities: Amenity[] = [
  {
    id: 1,
    icon: <Wifi className="w-8 h-8 text-gray-700" />,
    title: "High-speed Wi-Fi",
    description: "Complimentary high-speed internet throughout your stay"
  },
  {
    id: 2,
    icon: <Car className="w-8 h-8 text-gray-700" />,
    title: "Private Parking",
    description: "Secure parking spaces available for all guests"
  },
  {
    id: 3,
    icon: <Coffee className="w-8 h-8 text-gray-700" />,
    title: "Welcome Breakfast",
    description: "Complimentary breakfast served daily from 7-11 AM"
  },
  {
    id: 4,
    icon: <Utensils className="w-8 h-8 text-gray-700" />,
    title: "Fully Equipped Kitchen",
    description: "Complete kitchen facilities with premium appliances"
  },
  {
    id: 5,
    icon: <Home className="w-8 h-8 text-gray-700" />,
    title: "Heated Floors",
    description: "Underfloor heating for ultimate comfort"
  },
  {
    id: 6,
    icon: <Shield className="w-8 h-8 text-gray-700" />,
    title: "24/7 Security",
    description: "Round-the-clock security and concierge service"
  },
  {
    id: 7,
    icon: <Clock className="w-8 h-8 text-gray-700" />,
    title: "Flexible Check-in",
    description: "Self check-in available anytime after 3 PM"
  },
  {
    id: 8,
    icon: <Star className="w-8 h-8 text-gray-700" />,
    title: "Luxury Amenities",
    description: "Premium toiletries and high-quality linens"
  },
  {
    id: 9,
    icon: <Users className="w-8 h-8 text-gray-700" />,
    title: "Personalized Service",
    description: "Dedicated concierge for local recommendations"
  },
  {
    id: 10,
    icon: <Heart className="w-8 h-8 text-gray-700" />,
    title: "Wellness Focused",
    description: "Air purifiers and wellness amenities in every room"
  }
];

const FeaturesShowcase: React.FC = () => {
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

  return (
    <section 
      ref={containerRef}
      className="py-16 sm:py-24 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Better Spacing */}
        <div className={`text-center mb-16 sm:mb-24 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-8 sm:mb-12 leading-tight">
            <span className="block text-gray-800">You become part</span>
            <span className="block text-gray-600 font-normal italic">of our Mumbai story</span>
          </h2>
          <div className="w-16 sm:w-24 h-px bg-gray-300 mx-auto mb-8 sm:mb-12"></div>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
            All properties meet these exacting standards about safety, service, and hospitality.
            We hand-pick every amenity to ensure your stay is nothing short of extraordinary.
          </p>
        </div>

        {/* Enhanced Amenities Grid with Card Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 sm:gap-8">
          {amenities.map((amenity, index) => (
            <div 
              key={amenity.id}
              className={`group transform transition-all duration-1000 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Card Design */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group-hover:border-gray-200 h-full">
                {/* Icon Container */}
                <div className="mb-6 flex justify-center">
                  <div className="p-4 sm:p-5 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl group-hover:from-gray-100 group-hover:to-gray-200 transition-all duration-300">
                    <div className="w-8 h-8 text-gray-700 group-hover:text-gray-900 transition-colors">
                      {amenity.icon}
                    </div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="text-center">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors">
                    {amenity.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    {amenity.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Bottom Story Section */}
        <div className={`mt-20 sm:mt-32 transform transition-all duration-1000 delay-800 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-8 sm:p-12 border border-gray-200">
            <div className="max-w-4xl mx-auto text-center">
              <h3 className="text-2xl sm:text-3xl font-light text-gray-900 mb-6 sm:mb-8">
                Beyond the Basics
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                <div>
                  <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-4">
                    But there's more such as: All properties meet these exacting standards about 
                    safety, service, and hospitality. We hand-pick every property to ensure your 
                    stay is nothing short of extraordinary.
                  </p>
                  <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                    From the moment you arrive, you'll feel at home with our thoughtfully curated amenities.
                  </p>
                </div>
                <div>
                  <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-4">
                    Many of our properties include special features like rooftop gardens, 
                    private balconies, and locally sourced artwork.
                  </p>
                  <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                    Each stay supports the local community and gives you an authentic Mumbai experience.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesShowcase; 