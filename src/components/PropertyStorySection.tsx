import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Quote } from 'lucide-react';
import { getPropertyImageUrls } from '../utils/propertyAssets';

interface PropertyStorySectionProps {
  onPropertySelect?: (propertyId: number) => void;
}

const stories = [
  {
    id: 1,
    title: "Art Meets Soul",
    subtitle: "Where contemporary design meets Mumbai's cultural heart",
    description: "Step into spaces where every corner tells a story of artistic expression and cultural richness.",
    image: getPropertyImageUrls("Art Loft Bandra")[0] || "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    backgroundImage: getPropertyImageUrls("Art Loft Bandra")[0] || "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
    quote: "Every piece of art in our spaces has been carefully chosen to reflect Mumbai's vibrant creative spirit."
  },
  {
    id: 2,
    title: "Heritage Reimagined",
    subtitle: "Colonial charm with modern luxury",
    description: "Experience the perfect blend of Mumbai's rich history and contemporary comfort in thoughtfully restored spaces.",
    image: getPropertyImageUrls("Heritage Garden Cottage")[0] || "https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    backgroundImage: getPropertyImageUrls("Heritage Garden Cottage")[0] || "https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
    quote: "We preserve the architectural heritage while creating modern sanctuaries for today's travelers."
  },
  {
    id: 3,
    title: "Urban Sanctuary",
    subtitle: "Zen in the heart of the city",
    description: "Find peace and tranquility in thoughtfully designed urban retreats that offer respite from city life.",
    image: getPropertyImageUrls("Zen Suite")[0] || "https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    backgroundImage: getPropertyImageUrls("Zen Suite")[0] || "https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
    quote: "Our spaces are designed to be havens of calm in the bustling energy of Mumbai."
  }
];

const PropertyStorySection: React.FC<PropertyStorySectionProps> = ({ onPropertySelect }) => {
  const [currentStory, setCurrentStory] = useState(0);
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

  // Auto-rotate stories
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStory((prev) => (prev + 1) % stories.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative py-24 overflow-hidden"
    >
      {/* Background Images */}
      <div className="absolute inset-0">
        {stories.map((story, index) => (
          <div
            key={story.id}
            className={`absolute inset-0 transition-all duration-1000 ${
              index === currentStory ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={story.backgroundImage}
              alt={story.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-white/85 backdrop-blur-sm"></div>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-20 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <h2 className="text-5xl md:text-6xl font-light text-gray-900 mb-6 leading-tight">
            <span className="block text-gray-800">Every stay</span>
            <span className="block text-gray-600 font-normal italic">tells a story</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover the unique narratives behind each of our carefully curated properties
          </p>
        </div>

        {/* Story Cards */}
        <div className="grid lg:grid-cols-3 gap-8">
          {stories.map((story, index) => (
            <div
              key={story.id}
              className={`group cursor-pointer transform transition-all duration-1000 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
              onClick={() => onPropertySelect?.(story.id)}
            >
              <div className="relative h-80 rounded-2xl overflow-hidden mb-6 group-hover:shadow-2xl transition-all duration-500">
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
                {/* Quote Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4">
                    <Quote className="w-5 h-5 text-gray-600 mb-2" />
                    <p className="text-gray-800 text-sm font-light italic leading-relaxed">
                      {story.quote}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-2xl font-light text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {story.title}
                  </h3>
                  <p className="text-lg text-gray-600 font-medium mb-3">
                    {story.subtitle}
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    {story.description}
                  </p>
                </div>

                <button className="inline-flex items-center gap-2 text-gray-900 font-medium hover:gap-3 transition-all duration-300 group-hover:text-blue-600">
                  <span>Read the story</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Story Navigation */}
        <div className="flex justify-center mt-12 space-x-3">
          {stories.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentStory(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentStory 
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

export default PropertyStorySection; 