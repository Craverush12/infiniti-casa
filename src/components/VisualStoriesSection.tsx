import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star, MapPin, Users, Bed, ArrowRight } from 'lucide-react';
import { getPropertyImageUrls } from '../utils/propertyAssets';

interface Property {
  id: number;
  name: string;
  location: string;
  description: string;
  price: number;
  guests: number;
  bedrooms: number;
  image: string;
  highlights: string[];
  category: string;
  rating: number;
}

// Updated properties with real asset mapping
const properties: Property[] = [
  {
    id: 1,
    name: "Sky Lounge (Penthouse + Terrace)",
    location: "Bandra West, Mumbai",
    description: "Unique one-bedroom hall penthouse with panoramic sea and skyline views, private terrace for sunset lounging.",
    price: 22000,
    guests: 2,
    bedrooms: 1,
    image: getPropertyImageUrls("Sky Lounge (Penthouse + Terrace)")[0] || "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop",
    highlights: ["Private Terrace", "Sea & Skyline Views", "Guest Favorite", "Premium Amenities"],
    category: "Penthouse",
    rating: 4.93
  },
  {
    id: 2,
    name: "The Little White Bandra Studio",
    location: "Bandra West, Mumbai",
    description: "Cozy, peaceful, and centrally located 150 sq ft studio near Pali Hill and Carter Road.",
    price: 6500,
    guests: 2,
    bedrooms: 1,
    image: getPropertyImageUrls("The Little White Bandra Studio")[0] || "https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop",
    highlights: ["Smartlock Self Check-in", "Prime Location", "Daily Cleaning", "1-min to Ocean"],
    category: "Cozy Studio",
    rating: 4.63
  },
  {
    id: 3,
    name: "India House – (Full Bungalow with Private Terrace)",
    location: "Bandra West, Mumbai",
    description: "1050 sq ft apartment + 1050 sq ft private terrace, 30 seconds from Ocean.",
    price: 18000,
    guests: 6,
    bedrooms: 2,
    image: getPropertyImageUrls("India House – (Full Bungalow with Private Terrace)")[0] || "https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop",
    highlights: ["Private Terrace", "Ocean Breeze", "Prime Location", "Smartlock"],
    category: "Bungalow",
    rating: 5.0
  },
  {
    id: 4,
    name: "City Zen (Asian home Bandra)",
    location: "Bandra, Mumbai",
    description: "Brand new luxurious 3-bedroom apartment with Asian/Far East inspired furnishings.",
    price: 15000,
    guests: 10,
    bedrooms: 3,
    image: getPropertyImageUrls("City Zen (Asian home Bandra)")[0] || "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop",
    highlights: ["Valley View", "Daily Cleaning", "Smartlock", "Spacious"],
    category: "Urban Zen",
    rating: 4.74
  },
  {
    id: 5,
    name: "Bandra Cottage with Yard",
    location: "Bandra, Mumbai",
    description: "Cozy cottage with warm interiors and a small private attached garden.",
    price: 8500,
    guests: 4,
    bedrooms: 1,
    image: getPropertyImageUrls("Bandra Cottage with Yard")[0] || "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop",
    highlights: ["Private Garden", "Retro Kitchen", "Daily Cleaning", "Pet-friendly"],
    category: "Cottage",
    rating: 4.86
  },
  {
    id: 6,
    name: "The Quaint Afrohemian 1BHK (Bandra West)",
    location: "Bandra West, Mumbai",
    description: "Afro-Bohemian themed home designed by Nicole Padival.",
    price: 9500,
    guests: 2,
    bedrooms: 1,
    image: getPropertyImageUrls("The Quaint Afrohemian 1BHK (Bandra West)")[0] || "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop",
    highlights: ["Pour-over Coffee", "Daily Cleaning", "Lockbox", "Quiet"],
    category: "Afro-Boho",
    rating: 4.85
  },
  {
    id: 7,
    name: "The Bandra Art House (Dopamine Decor)",
    location: "Chimbai, Bandra West",
    description: "Artist-designed dopamine decor with city skyline & bay views.",
    price: 12000,
    guests: 5,
    bedrooms: 2,
    image: getPropertyImageUrls("The Bandra Art House (Dopamine Decor)")[0] || "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop",
    highlights: ["Artist-designed", "Daily Cleaning", "Smartlock", "Views"],
    category: "Art House",
    rating: 4.81
  }
];

interface VisualStoriesSectionProps {
  onPropertySelect?: (propertyId: number) => void;
}

const VisualStoriesSection: React.FC<VisualStoriesSectionProps> = ({ onPropertySelect }) => {
  const [currentProperty, setCurrentProperty] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout>();

  const property = properties[currentProperty];

  useEffect(() => {
    if (!isHovered) {
      autoPlayRef.current = setInterval(() => {
        setCurrentProperty(prev => (prev + 1) % properties.length);
      }, 2000);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isHovered]);

  const nextProperty = () => {
    setCurrentProperty(prev => (prev + 1) % properties.length);
  };

  const prevProperty = () => {
    setCurrentProperty(prev => (prev - 1 + properties.length) % properties.length);
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Art & Culture': 'from-purple-500 to-pink-500',
      'Heritage': 'from-amber-500 to-orange-500',
      'Urban Zen': 'from-green-500 to-teal-500',
      'Studio': 'from-blue-500 to-indigo-500',
      'Penthouse': 'from-red-500 to-pink-500'
    };
    return colors[category as keyof typeof colors] || 'from-gray-500 to-gray-600';
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-light text-gray-900 mb-4">
            Visual Stories
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the unique character and charm of each property through our curated visual stories. 
            Every space has a tale to tell.
          </p>
        </div>

        {/* Interactive Property Showcase */}
        <div 
          className="relative h-[460px] md:h-[560px] rounded-3xl overflow-hidden group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={property.image}
              alt={property.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/40"></div>
          </div>

          {/* Content Overlay (mobile simplified) */}
          <div className="absolute inset-0 flex items-end">
            <div className="w-full p-4 md:p-12">
              <div className="max-w-2xl">
                {/* Category Badge */}
                <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs md:text-sm font-medium mb-2 md:mb-4">
                  <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${getCategoryColor(property.category)} mr-2`}></span>
                  {property.category}
                </div>

                {/* Property Title */}
                <h3 className="text-2xl md:text-4xl font-light text-white mb-2 md:mb-4">
                  {property.name}
                </h3>

                {/* Property Description (hide on mobile) */}
                <p className="hidden md:block text-white/90 text-lg mb-6 line-clamp-2">
                  {property.description}
                </p>

                {/* Property Stats (compact on mobile) */}
                <div className="hidden md:flex items-center space-x-6 text-white/90 mb-6">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{property.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-2" />
                    <span>{property.guests} guests</span>
                  </div>
                  <div className="flex items-center">
                    <Bed className="w-4 h-4 mr-2" />
                    <span>{property.bedrooms} bedrooms</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 mr-1" />
                    <span>{property.rating}</span>
                  </div>
                </div>

                {/* Highlights (hide on mobile) */}
                <div className="hidden md:flex flex-wrap gap-2 mb-6">
                  {property.highlights.slice(0, 3).map((highlight, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm rounded-full"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>

                {/* CTA only */}
                <div className="flex items-center justify-start">
                  <button
                    onClick={() => onPropertySelect?.(property.id)}
                    className="inline-flex items-center space-x-2 bg-white/90 md:bg-white text-gray-900 px-4 md:px-6 py-2.5 md:py-3 rounded-lg font-medium hover:bg-white transition-colors"
                  >
                    <span>Explore Property</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <button
            onClick={prevProperty}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          
          <button
            onClick={nextProperty}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          {/* Removed extra counters/indicators for a cleaner look */}
        </div>

        {/* Property Thumbnails */}
        <div className="flex justify-center mt-8 space-x-4">
          {properties.map((prop, index) => (
            <button
              key={prop.id}
              onClick={() => setCurrentProperty(index)}
              className={`w-16 h-16 rounded-lg overflow-hidden transition-all duration-300 ${
                index === currentProperty 
                  ? 'ring-2 ring-blue-500 scale-110' 
                  : 'hover:scale-105'
              }`}
            >
              <img
                src={prop.image}
                alt={prop.name}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VisualStoriesSection; 