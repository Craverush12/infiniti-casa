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
  ,
  // Added more per section
  { id: 11, category: 'dining', name: 'The Table', description: 'Modern global cuisine in a chic space', distance: '12 min drive', rating: 4.7, image: getPropertyImageUrls('Art Loft Bandra')[1] || 'https://images.pexels.com/photos/2641886/pexels-photo-2641886.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', priceRange: '₹₹₹' },
  { id: 12, category: 'dining', name: 'Bombay Canteen', description: 'Inventive Indian dishes and cocktails', distance: '18 min drive', rating: 4.6, image: getPropertyImageUrls('Zen Suite')[1] || 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', priceRange: '₹₹₹' },
  { id: 21, category: 'culture', name: 'Jehangir Art Gallery', description: 'Historic art gallery showcasing Indian art', distance: '15 min drive', rating: 4.7, image: getPropertyImageUrls('The Bandra Art House (Dopamine Decor)')[0] || 'https://images.pexels.com/photos/356133/pexels-photo-356133.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', priceRange: 'Free' },
  { id: 22, category: 'culture', name: 'Nehru Centre', description: 'Science and cultural center with planetarium', distance: '20 min drive', rating: 4.5, image: getPropertyImageUrls('Sky Lounge (Penthouse + Terrace)')[0] || 'https://images.pexels.com/photos/256369/pexels-photo-256369.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', priceRange: '₹' },
  { id: 31, category: 'shopping', name: 'Palladium Mall', description: 'Upscale shopping and dining', distance: '22 min drive', rating: 4.6, image: getPropertyImageUrls('City Zen (Asian home Bandra)')[0] || 'https://images.pexels.com/photos/135620/pexels-photo-135620.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', priceRange: '₹₹₹' },
  { id: 32, category: 'shopping', name: 'Hill Road', description: 'Local boutiques and street shopping', distance: '8 min drive', rating: 4.2, image: getPropertyImageUrls('Bandra Cottage with Yard')[0] || 'https://images.pexels.com/photos/1005638/pexels-photo-1005638.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', priceRange: '₹' },
  { id: 41, category: 'nature', name: 'Sanjay Gandhi National Park', description: 'Lush greenery and trails', distance: '55 min drive', rating: 4.6, image: getPropertyImageUrls('India House – (Full Bungalow with Private Terrace)')[0] || 'https://images.pexels.com/photos/70441/pexels-photo-70441.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', priceRange: '₹' },
  { id: 42, category: 'nature', name: 'Hanging Gardens', description: 'Terraced gardens with views', distance: '25 min drive', rating: 4.4, image: getPropertyImageUrls('Studio Bandra')[0] || 'https://images.pexels.com/photos/164522/pexels-photo-164522.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', priceRange: 'Free' },
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
  const categories: Array<'all' | 'dining' | 'culture' | 'shopping' | 'nature'> = ['all', 'dining', 'culture', 'shopping', 'nature'];

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

  const filteredItems = activeCategory === 'all'
    ? guideItems
    : guideItems.filter(item => item.category === (activeCategory as any));

  return (
    <section id="mumbai-guide" className="py-16 sm:py-24 bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl sm:text-5xl font-light text-gray-900 mb-3 leading-tight">Mumbai Local Guide</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">A concise curation: eat, culture, shop, stroll.</p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8">
          {categories.map((category) => {
            const Icon = category === 'all' ? MapPin : categoryIcons[category as keyof typeof categoryIcons];
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 ${
                  activeCategory === category
                    ? (category === 'all' ? 'bg-gray-900 text-white shadow-lg' : `bg-gradient-to-r ${categoryColors[category as keyof typeof categoryColors]} text-white shadow-lg`)
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {Icon && <Icon className="w-4 h-4" />}
                <span className="text-sm font-medium capitalize">{category}</span>
              </button>
            );
          })}
        </div>

        {/* Guide Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className="group cursor-pointer"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-transform duration-300">
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

        {/* CTA */}
        <div className="text-center mt-10">
          <button className="inline-flex items-center space-x-2 bg-gray-900 text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors">
            <span>Explore Full Guide</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default MumbaiGuidePreview;