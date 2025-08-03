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
    name: "Art Loft Bandra",
    location: "Bandra West, Mumbai",
    description: "A contemporary art gallery meets luxury accommodation. Every corner tells a story of Mumbai's vibrant art scene, with rotating exhibitions and artist studio access.",
    price: 12000,
    guests: 4,
    bedrooms: 2,
    image: getPropertyImageUrls("Art Loft Bandra")[0] || "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop",
    highlights: ["Private Art Studio", "Rotating Exhibitions", "Artist Meetups", "Gallery Lighting"],
    category: "Art & Culture",
    rating: 4.9
  },
  {
    id: 2,
    name: "Heritage Garden Cottage",
    location: "Bandra West, Mumbai",
    description: "Step into Mumbai's colonial past with this beautifully restored heritage property. Vintage charm meets modern luxury in a private garden setting.",
    price: 15000,
    guests: 6,
    bedrooms: 3,
    image: getPropertyImageUrls("Heritage Garden Cottage")[0] || "https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop",
    highlights: ["Private Garden", "Vintage Library", "Colonial Architecture", "Heritage Tours"],
    category: "Heritage",
    rating: 4.8
  },
  {
    id: 3,
    name: "Zen Suite",
    location: "Lower Parel, Mumbai",
    description: "Urban zen sanctuary in the heart of Mumbai's business district. Find peace and tranquility with panoramic city views and minimalist design.",
    price: 18000,
    guests: 2,
    bedrooms: 1,
    image: getPropertyImageUrls("Zen Suite")[0] || "https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop",
    highlights: ["Meditation Pavilion", "Zen Garden", "Rooftop Yoga", "City Views"],
    category: "Urban Zen",
    rating: 4.7
  },
  {
    id: 4,
    name: "Studio Bandra",
    location: "Worli, Mumbai",
    description: "A creative haven for artists and designers. High ceilings, natural light, and inspiring views make this the perfect space for creative work and relaxation.",
    price: 14000,
    guests: 3,
    bedrooms: 1,
    image: getPropertyImageUrls("Studio Bandra")[0] || "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop",
    highlights: ["Creative Studio", "Natural Light", "Art Supplies", "Inspiring Views"],
    category: "Studio",
    rating: 4.6
  },
  {
    id: 5,
    name: "Penthouse Sky Lounge",
    location: "Worli Sea Face, Mumbai",
    description: "The epitome of luxury living with breathtaking sea views. Premium amenities, private terrace, and exclusive access to Mumbai's finest experiences.",
    price: 25000,
    guests: 8,
    bedrooms: 4,
    image: getPropertyImageUrls("Penthouse Sky Lounge")[0] || "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop",
    highlights: ["Private Terrace", "Sea Views", "Concierge Service", "Premium Amenities"],
    category: "Penthouse",
    rating: 5.0
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
          className="relative h-96 md:h-[500px] rounded-3xl overflow-hidden group"
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

          {/* Content Overlay */}
          <div className="absolute inset-0 flex items-end">
            <div className="w-full p-8 md:p-12">
              <div className="max-w-2xl">
                {/* Category Badge */}
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium mb-4">
                  <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${getCategoryColor(property.category)} mr-2`}></span>
                  {property.category}
                </div>

                {/* Property Title */}
                <h3 className="text-3xl md:text-4xl font-light text-white mb-4">
                  {property.name}
                </h3>

                {/* Property Description */}
                <p className="text-white/90 text-lg mb-6 line-clamp-2">
                  {property.description}
                </p>

                {/* Property Stats */}
                <div className="flex items-center space-x-6 text-white/90 mb-6">
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

                {/* Highlights */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {property.highlights.slice(0, 3).map((highlight, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm rounded-full"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>

                {/* Price and CTA */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/80 text-sm">Starting from</p>
                    <p className="text-2xl font-bold text-white">{formatPrice(property.price)}</p>
                    <p className="text-white/80 text-sm">per night</p>
                  </div>
                  <button
                    onClick={() => onPropertySelect?.(property.id)}
                    className="flex items-center space-x-2 bg-white text-gray-900 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
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

          {/* Property Counter */}
          <div className="absolute top-4 left-4 px-4 py-2 rounded-full bg-black/40 backdrop-blur-sm text-white text-sm">
            {currentProperty + 1} / {properties.length}
          </div>

          {/* Auto-play Indicator */}
          <div className="absolute top-4 right-4 px-4 py-2 rounded-full bg-black/40 backdrop-blur-sm text-white text-sm">
            {isHovered ? 'Paused' : 'Auto-play'}
          </div>
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