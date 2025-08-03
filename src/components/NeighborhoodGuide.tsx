import React, { useState } from 'react';
import { MapPin, Coffee, Utensils, ShoppingBag, Camera, Star, Clock, Navigation } from 'lucide-react';
import { getPropertyImageUrls } from '../utils/propertyAssets';

interface NeighborhoodPlace {
  id: number;
  name: string;
  category: 'restaurant' | 'cafe' | 'shopping' | 'attraction' | 'nightlife';
  description: string;
  rating: number;
  distance: string;
  walkTime: string;
  image: string;
  priceRange?: string;
}

interface NeighborhoodGuideProps {
  location: string;
  className?: string;
}

const neighborhoodPlaces: NeighborhoodPlace[] = [
  {
    id: 1,
    name: 'Linking Road',
    category: 'shopping',
    description: 'Famous street shopping destination with trendy clothes, accessories, and street food.',
    rating: 4.5,
    distance: '0.3 km',
    walkTime: '4 min',
    image: getPropertyImageUrls("Art Loft Bandra")[0] || 'https://images.pexels.com/photos/1109541/pexels-photo-1109541.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
    priceRange: '₹₹'
  },
  {
    id: 2,
    name: 'Bandra Bandstand',
    category: 'attraction',
    description: 'Scenic promenade with sea views, perfect for evening walks and sunset photography.',
    rating: 4.7,
    distance: '1.2 km',
    walkTime: '15 min',
    image: getPropertyImageUrls("Studio Bandra")[0] || 'https://images.pexels.com/photos/1007426/pexels-photo-1007426.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
  },
  {
    id: 3,
    name: 'Olive Bar & Kitchen',
    category: 'restaurant',
    description: 'Upscale Mediterranean restaurant with beautiful ambiance and excellent food.',
    rating: 4.3,
    distance: '0.8 km',
    walkTime: '10 min',
    image: getPropertyImageUrls("Heritage Garden Cottage")[0] || 'https://images.pexels.com/photos/2696064/pexels-photo-2696064.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
    priceRange: '₹₹₹₹'
  },
  {
    id: 4,
    name: 'Elbow Room',
    category: 'cafe',
    description: 'Cozy cafe known for excellent coffee, breakfast, and relaxed atmosphere.',
    rating: 4.4,
    distance: '0.5 km',
    walkTime: '6 min',
    image: getPropertyImageUrls("Zen Suite")[0] || 'https://images.pexels.com/photos/1833306/pexels-photo-1833306.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
    priceRange: '₹₹'
  },
  {
    id: 5,
    name: 'Toto\'s Garage',
    category: 'nightlife',
    description: 'Popular pub with live music, great cocktails, and vibrant nightlife scene.',
    rating: 4.2,
    distance: '0.7 km',
    walkTime: '9 min',
    image: getPropertyImageUrls("Art Loft Bandra")[1] || 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
    priceRange: '₹₹₹'
  },
  {
    id: 6,
    name: 'Bandra Fort',
    category: 'attraction',
    description: 'Historic Portuguese fort with panoramic views of the Bandra-Worli Sea Link.',
    rating: 4.1,
    distance: '1.5 km',
    walkTime: '18 min',
    image: getPropertyImageUrls("Studio Bandra")[1] || 'https://images.pexels.com/photos/1007426/pexels-photo-1007426.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
  }
];

const categoryIcons = {
  restaurant: Utensils,
  cafe: Coffee,
  shopping: ShoppingBag,
  attraction: Camera,
  nightlife: Clock
};

const categoryColors = {
  restaurant: 'bg-red-100 text-red-600',
  cafe: 'bg-amber-100 text-amber-600',
  shopping: 'bg-purple-100 text-purple-600',
  attraction: 'bg-green-100 text-green-600',
  nightlife: 'bg-blue-100 text-blue-600'
};

const NeighborhoodGuide: React.FC<NeighborhoodGuideProps> = ({
  location,
  className = ''
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredPlaces = activeCategory === 'all' 
    ? neighborhoodPlaces 
    : neighborhoodPlaces.filter(place => place.category === activeCategory);

  return (
    <div className={`bg-white rounded-2xl shadow-lg p-6 ${className}`}>
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center space-x-2 mb-2">
          <MapPin className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Neighborhood Guide</h3>
        </div>
        <p className="text-gray-600 text-sm">Discover the best places around {location}</p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
            activeCategory === 'all'
              ? 'bg-blue-100 text-blue-600'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          All
        </button>
        {Object.entries(categoryIcons).map(([category, Icon]) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium transition-colors ${
              activeCategory === category
                ? categoryColors[category as keyof typeof categoryColors]
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Icon className="w-3 h-3" />
            <span className="capitalize">{category}</span>
          </button>
        ))}
      </div>

      {/* Places Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredPlaces.map((place) => {
          const Icon = categoryIcons[place.category];
          return (
            <div key={place.id} className="group cursor-pointer">
              <div className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-md transition-all duration-300">
                {/* Image */}
                <div className="relative h-32 overflow-hidden">
                  <img
                    src={place.image}
                    alt={place.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-2 left-2">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${categoryColors[place.category as keyof typeof categoryColors]}`}>
                      {place.category}
                    </span>
                  </div>

                  {/* Rating */}
                  <div className="absolute top-2 right-2 flex items-center space-x-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    <span className="text-xs font-medium text-gray-700">{place.rating}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-3">
                  <h4 className="font-medium text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                    {place.name}
                  </h4>
                  <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                    {place.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2 text-gray-500">
                      <Navigation className="w-3 h-3" />
                      <span>{place.distance}</span>
                      <span>•</span>
                      <span>{place.walkTime}</span>
                    </div>
                    {place.priceRange && (
                      <span className="text-gray-700 font-medium">{place.priceRange}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* View All Button */}
      <div className="mt-6 text-center">
        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
          View all places →
        </button>
      </div>
    </div>
  );
};

export default NeighborhoodGuide; 