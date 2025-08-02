import React, { useState, useEffect, useRef } from 'react';
import { Star, Quote, Heart, MapPin } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  location: string;
  avatar: string;
  propertyImage: string;
  propertyName: string;
  rating: number;
  text: string;
  stayDuration: string;
  size: 'small' | 'medium' | 'large';
  position: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Delhi",
    avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    propertyImage: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
    propertyName: "Art Loft Bandra",
    rating: 5,
    text: "Every corner revealed something new—it was like staying in a living gallery where art and life became one.",
    stayDuration: "5 nights",
    size: "large",
    position: "top-left"
  },
  {
    id: 2,
    name: "Raj Patel",
    location: "Bangalore",
    avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    propertyImage: "https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
    propertyName: "Heritage Cottage",
    rating: 5,
    text: "The heritage cottage transported me back in time while providing all modern comforts.",
    stayDuration: "3 nights",
    size: "medium",
    position: "top-right"
  },
  {
    id: 3,
    name: "Sarah Johnson",
    location: "London",
    avatar: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    propertyImage: "https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
    propertyName: "Zen Suite",
    rating: 5,
    text: "An oasis of calm in the bustling city. The minimalist design was perfect.",
    stayDuration: "7 nights",
    size: "small",
    position: "middle-left"
  },
  {
    id: 4,
    name: "Arjun Mehta",
    location: "Chennai",
    avatar: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    propertyImage: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
    propertyName: "Penthouse Worli",
    rating: 5,
    text: "The views from the penthouse were breathtaking. Every sunset felt like a private show.",
    stayDuration: "4 nights",
    size: "medium",
    position: "middle-right"
  },
  {
    id: 5,
    name: "Emma Wilson",
    location: "New York",
    avatar: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    propertyImage: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
    propertyName: "Studio Bandra",
    rating: 5,
    text: "Perfect for a romantic getaway. The attention to detail was incredible.",
    stayDuration: "2 nights",
    size: "small",
    position: "bottom-left"
  },
  {
    id: 6,
    name: "Michael Chen",
    location: "Singapore",
    avatar: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    propertyImage: "https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
    propertyName: "Colonial Manor",
    rating: 5,
    text: "The cultural immersion was beyond expectations. Mumbai's history came alive.",
    stayDuration: "6 nights",
    size: "large",
    position: "bottom-right"
  }
];

const TestimonialsSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
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

  const getCardSize = (size: string) => {
    switch (size) {
      case 'large':
        return 'md:col-span-2 md:row-span-2';
      case 'medium':
        return 'md:col-span-1 md:row-span-2';
      case 'small':
        return 'md:col-span-1 md:row-span-1';
      default:
        return 'md:col-span-1 md:row-span-1';
    }
  };

  const getGridPosition = (position: string, index: number) => {
    // Simplified positioning for better visual hierarchy
    return '';
  };

  return (
    <section 
      ref={containerRef}
      className="py-16 sm:py-24 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Better Spacing */}
        <div className={`text-center mb-16 sm:mb-24 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-gray-900 mb-8 sm:mb-12 leading-tight">
            <span className="block opacity-90">Guest</span>
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Stories
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4 leading-relaxed">
            Real experiences from guests who discovered Mumbai through our properties
          </p>
        </div>

        {/* Improved Card Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 auto-rows-min">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`relative ${getCardSize(testimonial.size)} transform transition-all duration-1000 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
              onMouseEnter={() => setHoveredCard(testimonial.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Enhanced Card Design */}
              <div className="relative h-full bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group cursor-pointer border border-gray-100">
                {/* Background Image with Better Overlay */}
                <div className="absolute inset-0">
                  <img
                    src={testimonial.propertyImage}
                    alt={testimonial.propertyName}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                </div>

                {/* Floating Quote Icon */}
                <div className="absolute top-6 right-6">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 flex items-center justify-center">
                    <Quote className="w-6 h-6 text-white" />
                  </div>
                </div>

                {/* Content with Better Typography */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 text-white">
                  <div className={`transform transition-all duration-500 ${
                    hoveredCard === testimonial.id ? 'translate-y-0' : 'translate-y-2'
                  }`}>
                    {/* Property Badge - Simplified */}
                    <div className="inline-flex items-center px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-4">
                      {testimonial.propertyName}
                    </div>

                    {/* Rating and Duration - Combined */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <span className="text-white/80 text-sm">
                        {testimonial.stayDuration}
                      </span>
                    </div>

                    {/* Testimonial Text - Improved Typography */}
                    <blockquote className={`text-white/95 leading-relaxed mb-6 ${
                      testimonial.size === 'large' ? 'text-lg sm:text-xl' : 'text-base sm:text-lg'
                    }`}>
                      "{testimonial.text}"
                    </blockquote>

                    {/* Guest Info - Cleaner Layout */}
                    <div className="flex items-center gap-3">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-white/30"
                      />
                      <div>
                        <div className="font-semibold text-white text-base">
                          {testimonial.name}
                        </div>
                        <div className="flex items-center gap-1 text-white/70 text-sm">
                          <MapPin className="w-3 h-3" />
                          {testimonial.location}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Subtle Hover Effect */}
                <div className={`absolute inset-0 bg-gradient-to-t from-blue-900/10 to-transparent transition-opacity duration-300 ${
                  hoveredCard === testimonial.id ? 'opacity-100' : 'opacity-0'
                }`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators Section */}
        <div className={`mt-20 sm:mt-32 transform transition-all duration-1000 delay-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-lg border border-gray-100">
            <div className="text-center mb-8">
              <h3 className="text-2xl sm:text-3xl font-light text-gray-900 mb-4">
                Trusted by Guests Worldwide
              </h3>
              <p className="text-gray-600 text-lg">
                Join thousands of satisfied guests who've experienced Mumbai through our properties
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">4.9/5</div>
                <div className="text-gray-600">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">500+</div>
                <div className="text-gray-600">Happy Guests</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">24/7</div>
                <div className="text-gray-600">Guest Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;