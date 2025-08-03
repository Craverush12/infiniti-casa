import React, { useState, useEffect } from 'react';
import { Grid3X3, Award, Users, BookOpen, MapPin, Sparkles, Clock, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { getPropertyStoryImages } from '../utils/propertyAssets';

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

  // Use property-specific story images instead of hardcoded Pexels URLs
  const propertyImages: PropertyImage[] = getPropertyStoryImages(propertyName);

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
      prev === filteredImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? filteredImages.length - 1 : prev - 1
    );
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying || filteredImages.length === 0) return;

    const interval = setInterval(() => {
      nextImage();
    }, 3000);

    return () => clearInterval(interval);
  }, [isPlaying, filteredImages.length]);

  if (propertyImages.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Grid3X3 className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No photos available</h3>
        <p className="text-gray-600">Photos for this property will be available soon.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Featured Images Carousel */}
      {featuredImages.length > 0 && (
        <div className="relative">
          <div className="relative h-96 rounded-2xl overflow-hidden">
            <img
              src={featuredImages[currentImageIndex]?.url}
              alt={featuredImages[currentImageIndex]?.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20"></div>
            
            {/* Image Info */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
              <h3 className="text-white text-xl font-semibold mb-2">
                {featuredImages[currentImageIndex]?.title}
              </h3>
              <p className="text-white/90 text-sm">
                {featuredImages[currentImageIndex]?.description}
              </p>
            </div>

            {/* Navigation Controls */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 transition-all"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 transition-all"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            {/* Play/Pause Button */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 transition-all"
            >
              {isPlaying ? (
                <div className="w-6 h-6 border-2 border-white rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              ) : (
                <div className="w-6 h-6 border-2 border-white rounded-full flex items-center justify-center">
                  <div className="w-0 h-0 border-l-4 border-l-white border-t-2 border-t-transparent border-b-2 border-b-transparent ml-1"></div>
                </div>
              )}
            </button>
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center mt-4 space-x-2">
            {featuredImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentImageIndex 
                    ? 'bg-blue-600' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all ${
              activeCategory === category.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <category.icon className="w-4 h-4" />
            <span className="text-sm font-medium">{category.name}</span>
          </button>
        ))}
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

      {/* Empty State */}
      {filteredImages.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Grid3X3 className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No photos in this category</h3>
          <p className="text-gray-600">Try selecting a different category or view all photos.</p>
        </div>
      )}
    </div>
  );
};

export default PropertyStoryGallery; 