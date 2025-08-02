import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Camera, MapPin, Clock, Users, Heart, Share2, Play, Pause, Maximize2, Grid3X3, BookOpen, Sparkles, Award, Zap } from 'lucide-react';

interface PropertyImage {
  id: string;
  url: string;
  title: string;
  description: string;
  category: 'hero' | 'lifestyle' | 'architecture' | 'neighborhood' | 'details' | 'seasonal';
  tags: string[];
  featured: boolean;
}

interface PropertyStoryGalleryProps {
  propertyId: number;
  propertyName: string;
  onImageClick?: (image: PropertyImage) => void;
}

const PropertyStoryGallery: React.FC<PropertyStoryGalleryProps> = ({ 
  propertyId, 
  propertyName, 
  onImageClick 
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Comprehensive property images with storytelling
  const propertyImages: PropertyImage[] = [
    // Hero Images
    {
      id: 'hero-1',
      url: 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
      title: 'The Grand Entrance',
      description: 'Step into a world where colonial elegance meets modern comfort. The grand entrance sets the tone for your entire stay.',
      category: 'hero',
      tags: ['colonial', 'elegant', 'entrance'],
      featured: true
    },
    {
      id: 'hero-2',
      url: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
      title: 'Morning Light in the Garden',
      description: 'Where every morning begins with the gentle play of sunlight through century-old trees.',
      category: 'hero',
      tags: ['garden', 'morning', 'natural-light'],
      featured: true
    },
    {
      id: 'hero-3',
      url: 'https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
      title: 'The Living Room Sanctuary',
      description: 'A space designed for both intimate conversations and grand gatherings.',
      category: 'hero',
      tags: ['living-room', 'comfort', 'gathering'],
      featured: true
    },

    // Lifestyle Images
    {
      id: 'lifestyle-1',
      url: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
      title: 'Workation Setup',
      description: 'Transform your productivity in our thoughtfully designed workspace with garden views.',
      category: 'lifestyle',
      tags: ['workation', 'productivity', 'garden-views'],
      featured: false
    },
    {
      id: 'lifestyle-2',
      url: 'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
      title: 'Evening Ambiance',
      description: 'As the sun sets, the space transforms into a warm, inviting haven for relaxation.',
      category: 'lifestyle',
      tags: ['evening', 'ambiance', 'relaxation'],
      featured: false
    },
    {
      id: 'lifestyle-3',
      url: 'https://images.pexels.com/photos/1571461/pexels-photo-1571461.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
      title: 'Family Gathering Space',
      description: 'Where memories are made and stories are shared around the dining table.',
      category: 'lifestyle',
      tags: ['family', 'gathering', 'dining'],
      featured: false
    },

    // Architecture Images
    {
      id: 'architecture-1',
      url: 'https://images.pexels.com/photos/1571462/pexels-photo-1571462.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
      title: 'Stained Glass Windows',
      description: 'Original 1923 stained glass windows that tell stories of a bygone era.',
      category: 'architecture',
      tags: ['stained-glass', 'heritage', 'windows'],
      featured: false
    },
    {
      id: 'architecture-2',
      url: 'https://images.pexels.com/photos/1571464/pexels-photo-1571464.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
      title: 'Teak Woodwork',
      description: 'Handcrafted teak woodwork that showcases the craftsmanship of colonial artisans.',
      category: 'architecture',
      tags: ['teak', 'woodwork', 'craftsmanship'],
      featured: false
    },

    // Neighborhood Images
    {
      id: 'neighborhood-1',
      url: 'https://images.pexels.com/photos/1571465/pexels-photo-1571465.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
      title: 'Bandra West Streets',
      description: 'The vibrant streets of Bandra West, just steps from your colonial haven.',
      category: 'neighborhood',
      tags: ['bandra-west', 'streets', 'vibrant'],
      featured: false
    },
    {
      id: 'neighborhood-2',
      url: 'https://images.pexels.com/photos/1571466/pexels-photo-1571466.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
      title: 'Local Cafe Scene',
      description: 'Discover the eclectic cafe culture that makes Bandra West a food lover\'s paradise.',
      category: 'neighborhood',
      tags: ['cafe', 'food', 'culture'],
      featured: false
    },

    // Detail Images
    {
      id: 'details-1',
      url: 'https://images.pexels.com/photos/1571467/pexels-photo-1571467.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
      title: 'Butler Service Setup',
      description: 'Every detail thoughtfully curated, including our signature butler service.',
      category: 'details',
      tags: ['butler-service', 'luxury', 'curated'],
      featured: false
    },
    {
      id: 'details-2',
      url: 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
      title: 'Library Corner',
      description: 'A quiet corner with carefully selected books that reflect the property\'s heritage.',
      category: 'details',
      tags: ['library', 'books', 'heritage'],
      featured: false
    },

    // Seasonal Images
    {
      id: 'seasonal-1',
      url: 'https://images.pexels.com/photos/1571469/pexels-photo-1571469.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
      title: 'Monsoon Magic',
      description: 'Experience the property during Mumbai\'s magical monsoon season.',
      category: 'seasonal',
      tags: ['monsoon', 'seasonal', 'mumbai'],
      featured: false
    },
    {
      id: 'seasonal-2',
      url: 'https://images.pexels.com/photos/1571470/pexels-photo-1571470.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
      title: 'Winter Warmth',
      description: 'Cozy winter evenings with the fireplace and warm lighting.',
      category: 'seasonal',
      tags: ['winter', 'fireplace', 'cozy'],
      featured: false
    }
  ];

  const categories = [
    { id: 'all', name: 'All Photos', icon: Grid3X3 },
    { id: 'hero', name: 'Hero Shots', icon: Award },
    { id: 'lifestyle', name: 'Lifestyle', icon: Users },
    { id: 'architecture', name: 'Architecture', icon: BookOpen },
    { id: 'neighborhood', name: 'Neighborhood', icon: MapPin },
    { id: 'details', name: 'Details', icon: Sparkles },
    { id: 'seasonal', name: 'Seasonal', icon: Clock }
  ];

  const filteredImages = activeCategory === 'all' 
    ? propertyImages 
    : propertyImages.filter(img => img.category === activeCategory);

  const featuredImages = propertyImages.filter(img => img.featured);

  const handleImageClick = (image: PropertyImage) => {
    onImageClick?.(image);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === featuredImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? featuredImages.length - 1 : prev - 1
    );
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-light text-gray-900 mb-4">
            Discover {propertyName}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Every corner tells a story, every detail has a purpose. Explore the visual journey of this extraordinary property.
          </p>
        </div>

        {/* Featured Hero Gallery */}
        <div className="mb-16">
          <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden group">
            <img
              src={featuredImages[currentImageIndex].url}
              alt={featuredImages[currentImageIndex].title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-opacity duration-300"></div>
            
            {/* Image Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
              <h3 className="text-2xl font-medium text-white mb-2">
                {featuredImages[currentImageIndex].title}
              </h3>
              <p className="text-white/90 text-lg">
                {featuredImages[currentImageIndex].description}
              </p>
            </div>

            {/* Navigation Controls */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            {/* Play/Pause Auto-play */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 text-white" />
              ) : (
                <Play className="w-5 h-5 text-white" />
              )}
            </button>

            {/* Image Counter */}
            <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/40 backdrop-blur-sm text-white text-sm">
              {currentImageIndex + 1} / {featuredImages.length}
            </div>
          </div>

          {/* Thumbnail Navigation */}
          <div className="flex justify-center mt-6 space-x-2">
            {featuredImages.map((image, index) => (
              <button
                key={image.id}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-16 h-16 rounded-lg overflow-hidden transition-all duration-300 ${
                  index === currentImageIndex 
                    ? 'ring-2 ring-rust-500 scale-110' 
                    : 'hover:scale-105'
                }`}
              >
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                    activeCategory === category.id
                      ? 'bg-rust-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{category.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Filtered Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((image) => (
            <div
              key={image.id}
              className="group cursor-pointer"
              onClick={() => handleImageClick(image)}
            >
              <div className="relative h-64 rounded-xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-500">
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-opacity duration-300"></div>
                
                {/* Image Info */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <h4 className="text-white font-medium mb-1">{image.title}</h4>
                  <p className="text-white/80 text-sm line-clamp-2">{image.description}</p>
                </div>

                {/* Action Buttons */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300">
                    <Maximize2 className="w-4 h-4 text-white" />
                  </button>
                </div>

                {/* Tags */}
                <div className="absolute top-4 left-4">
                  <div className="flex flex-wrap gap-1">
                    {image.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Gallery Stats */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-8 bg-gray-50 rounded-2xl px-8 py-4">
            <div className="flex items-center space-x-2">
              <Camera className="w-5 h-5 text-rust-500" />
              <span className="text-gray-700 font-medium">{propertyImages.length} Photos</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-rust-500" />
              <span className="text-gray-700 font-medium">6 Categories</span>
            </div>
            <div className="flex items-center space-x-2">
              <Heart className="w-5 h-5 text-rust-500" />
              <span className="text-gray-700 font-medium">High Resolution</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyStoryGallery; 