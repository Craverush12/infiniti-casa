import React, { useState, useEffect, useRef } from 'react';
import { Star, Quote, Heart, MapPin } from 'lucide-react';
import { getPropertyImageUrls } from '../utils/propertyAssets';

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
    propertyImage: getPropertyImageUrls("Art Loft Bandra")[0] || "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
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
    propertyImage: getPropertyImageUrls("Heritage Garden Cottage")[0] || "https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
    propertyName: "Heritage Garden Cottage",
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
    propertyImage: getPropertyImageUrls("Zen Suite")[0] || "https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
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
    propertyImage: getPropertyImageUrls("Penthouse Sky Lounge")[0] || "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
    propertyName: "Penthouse Sky Lounge",
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
    propertyImage: getPropertyImageUrls("Studio Bandra")[0] || "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
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
    propertyImage: getPropertyImageUrls("Heritage Garden Cottage")[1] || "https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
    propertyName: "Heritage Garden Cottage",
    rating: 5,
    text: "The cultural immersion was beyond expectations. Mumbai's history came alive.",
    stayDuration: "6 nights",
    size: "large",
    position: "bottom-right"
  }
];

const TestimonialsSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
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

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const getCardSize = (size: string) => {
    switch (size) {
      case 'small':
        return 'col-span-1 row-span-1';
      case 'medium':
        return 'col-span-1 row-span-2';
      case 'large':
        return 'col-span-2 row-span-2';
      default:
        return 'col-span-1 row-span-1';
    }
  };

  const getGridPosition = (position: string, index: number) => {
    switch (position) {
      case 'top-left':
        return 'col-start-1 row-start-1';
      case 'top-right':
        return 'col-start-2 row-start-1';
      case 'middle-left':
        return 'col-start-1 row-start-2';
      case 'middle-right':
        return 'col-start-2 row-start-2';
      case 'bottom-left':
        return 'col-start-1 row-start-3';
      case 'bottom-right':
        return 'col-start-2 row-start-3';
      default:
        return '';
    }
  };

  return (
    <section ref={containerRef} className="py-16 sm:py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-12 sm:mb-16 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <h2 className="text-4xl sm:text-5xl font-light text-gray-900 mb-6 leading-tight">
            <span className="block text-gray-800">What our guests</span>
            <span className="block text-gray-600 font-normal italic">are saying</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Real experiences from travelers who discovered Mumbai through our curated stays
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 transform transition-all duration-1000 delay-200 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`group cursor-pointer transform transition-all duration-500 hover:scale-105 ${
                getCardSize(testimonial.size)
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden h-full">
                {/* Property Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={testimonial.propertyImage}
                    alt={testimonial.propertyName}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  
                  {/* Property Info Overlay */}
                  <div className="absolute bottom-4 left-4 text-white">
                    <h4 className="font-semibold text-sm">{testimonial.propertyName}</h4>
                    <div className="flex items-center space-x-1 text-xs opacity-90">
                      <MapPin className="w-3 h-3" />
                      <span>Mumbai</span>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="absolute top-4 right-4 flex items-center space-x-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    <span className="text-xs font-medium text-gray-700">{testimonial.rating}</span>
                  </div>
                </div>

                {/* Testimonial Content */}
                <div className="p-6">
                  {/* Quote Icon */}
                  <Quote className="w-6 h-6 text-gray-300 mb-4" />
                  
                  {/* Testimonial Text */}
                  <p className="text-gray-700 leading-relaxed mb-4 text-sm">
                    "{testimonial.text}"
                  </p>

                  {/* Guest Info */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <h5 className="font-semibold text-gray-900 text-sm">{testimonial.name}</h5>
                        <p className="text-xs text-gray-500">{testimonial.location}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">{testimonial.stayDuration}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center mt-12 space-x-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === activeTestimonial 
                  ? 'bg-blue-600 scale-125' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;