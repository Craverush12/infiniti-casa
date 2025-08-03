import React, { useEffect, useState } from 'react';
import { Calendar, ArrowRight, MapPin, Play, Search } from 'lucide-react';

interface HeroProps {
  onSuggestionClick?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onSuggestionClick }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/src/asssets/mainmodelheroimage.avif"
          alt="Luxury Stay Experience"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center text-white max-w-5xl mx-auto px-4">
          <div className={`transform transition-all duration-1000 ease-out ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-white mb-6 sm:mb-8 leading-tight">
              <span className="block text-white/90">You Deserve</span>
              <span className="block font-normal italic text-white/80">a perfect stay</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl md:text-2xl text-white/80 mb-10 sm:mb-12 font-light max-w-2xl mx-auto leading-relaxed px-4">
              Luxuriously curated stays in Mumbai's most sought-after neighborhoods
            </p>

            {/* Search Widget */}
            <div className={`mb-10 sm:mb-12 transform transition-all duration-1000 ease-out delay-300 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}>
              <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-6 max-w-2xl mx-auto shadow-2xl mx-4">
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-4 items-center">
                  <div className="flex-1 flex items-center gap-3 text-gray-700 w-full">
                    <Search className="w-5 h-5 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
                    <input
                      type="text"
                      placeholder="Where would you like to stay?"
                      className="w-full bg-transparent border-none outline-none text-gray-700 placeholder-gray-400 text-base sm:text-lg focus:placeholder-gray-300 transition-colors"
                    />
                  </div>
                  
                  <div className="flex-1 flex items-center gap-3 text-gray-700 w-full">
                    <Calendar className="w-5 h-5 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
                    <input
                      type="date"
                      className="w-full bg-transparent border-none outline-none text-gray-700 text-base sm:text-lg"
                    />
                  </div>
                  
                  <button className="bg-rust-600 hover:bg-rust-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-medium transition-all duration-300 hover:scale-105 shadow-lg w-full sm:w-auto">
                    <span className="hidden sm:inline">Search</span>
                    <Search className="w-5 h-5 sm:hidden" />
                  </button>
                </div>
              </div>
            </div>

            {/* Property Suggestion */}
            <div className={`transform transition-all duration-1000 ease-out delay-500 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}>
              <button
                onClick={onSuggestionClick}
                className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full font-medium hover:bg-white/30 transition-all duration-300 hover:scale-105"
              >
                <MapPin className="w-4 h-4" />
                <span>Discover our featured properties</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Play Video Button */}
        <div className="absolute bottom-8 right-8">
          <button className="bg-white/20 backdrop-blur-sm text-white p-4 rounded-full hover:bg-white/30 transition-all duration-300 hover:scale-110">
            <Play className="w-6 h-6 ml-1" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;