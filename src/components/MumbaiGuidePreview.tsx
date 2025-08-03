import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Star, ArrowRight, Camera, Coffee, Utensils, ShoppingBag } from 'lucide-react';
import { getPropertyImageUrls } from '../utils/propertyAssets';

interface GuideItem {
  id: number;
  category: 'dining' | 'culture' | 'shopping' | 'nature';
  name: string;
  description: string;
  distance: string;
  rating: number;
  image: string;
  priceRange: string;
}

const guideItems: GuideItem[] = [
  {
    id: 1,
    category: 'dining',
    name: "Trishna",
    description: "Award-winning seafood restaurant with innovative Indian coastal cuisine",
    distance: "5 min walk",
    rating: 4.8,
    image: getPropertyImageUrls("Art Loft Bandra")[0] || "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
    priceRange: "₹₹₹₹"
  },
  {
    id: 2,
    category: 'culture',
    name: "Gateway of India",
    description: "Iconic Mumbai monument and historic architectural marvel",
    distance: "10 min walk",
    rating: 4.9,
    image: getPropertyImageUrls("Heritage Garden Cottage")[0] || "https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
    priceRange: "Free"
  },
  {
    id: 3,
    category: 'shopping',
    name: "Colaba Causeway",
    description: "Vibrant street market for unique souvenirs and local fashion",
    distance: "8 min walk",
    rating: 4.3,
    image: getPropertyImageUrls("Zen Suite")[0] || "https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
    priceRange: "₹₹"
  },
  {
    id: 4,
    category: 'nature',
    name: "Marine Drive",
    description: "Scenic waterfront promenade perfect for sunset walks",
    distance: "15 min walk",
    rating: 4.7,
    image: getPropertyImageUrls("Studio Bandra")[0] || "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
    priceRange: "Free"
  }
];

const categoryIcons = {
  dining: Utensils,
  culture: Camera,
  shopping: ShoppingBag,
  nature: MapPin
};

const categoryColors = {
  dining: 'from-rust-400 to-coral-400',
  culture: 'from-sage-400 to-teal-400',
  shopping: 'from-coral-400 to-rust-400',
  nature: 'from-teal-400 to-sage-400'
};

const MumbaiGuidePreview: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('dining');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const section = document.getElementById('mumbai-guide');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const filteredItems = guideItems.filter(item => item.category === activeCategory);

  return (
    <section id="mumbai-guide" className="py-16 sm:py-24 bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-12 sm:mb-16 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <h2 className="text-4xl sm:text-5xl font-light text-gray-900 mb-6 leading-tight">
            <span className="block text-gray-800">Mumbai</span>
            <span className="block text-gray-600 font-normal italic">Local Guide</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover the best of Mumbai through our curated local recommendations
          </p>
        </div>

        {/* Category Filter */}
        <div className={`flex flex-wrap justify-center gap-4 mb-12 transform transition-all duration-1000 delay-200 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          {Object.entries(categoryIcons).map(([category, Icon]) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 ${
                activeCategory === category
                  ? `bg-gradient-to-r ${categoryColors[category as keyof typeof categoryColors]} text-white shadow-lg`
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm font-medium capitalize">{category}</span>
            </button>
          ))}
        </div>

        {/* Guide Items Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 transform transition-all duration-1000 delay-400 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className="group cursor-pointer"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 group-hover:scale-105">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${categoryColors[item.category as keyof typeof categoryColors]}`}>
                      {item.category}
                    </span>
                  </div>

                  {/* Rating */}
                  <div className="absolute top-3 right-3 flex items-center space-x-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    <span className="text-xs font-medium text-gray-700">{item.rating}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {item.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2 text-gray-500">
                      <MapPin className="w-3 h-3" />
                      <span>{item.distance}</span>
                    </div>
                    <span className="text-gray-700 font-medium">{item.priceRange}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className={`text-center mt-12 transform transition-all duration-1000 delay-600 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <button className="inline-flex items-center space-x-2 bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-800 transition-all duration-300 hover:space-x-3">
            <span>Explore Full Guide</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default MumbaiGuidePreview;