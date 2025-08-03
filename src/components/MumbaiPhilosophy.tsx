import React, { useState, useEffect, useRef } from 'react';
import { Compass, Sparkles, Users, ArrowRight } from 'lucide-react';
import { getPropertyImageUrls } from '../utils/propertyAssets';

const MumbaiPhilosophy: React.FC = () => {
  const [activePhilosophy, setActivePhilosophy] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const philosophies = [
    {
      title: "Cultural Immersion",
      icon: Compass,
      description: "Every property connects you to Mumbai's authentic cultural heartbeat",
      image: getPropertyImageUrls("Art Loft Bandra")[0] || "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      details: "From art galleries in Bandra to heritage walks in Colaba, experience Mumbai like a local."
    },
    {
      title: "Curated Experiences",
      icon: Sparkles,
      description: "Handpicked properties that tell Mumbai's diverse neighborhood stories",
      image: getPropertyImageUrls("Heritage Garden Cottage")[0] || "https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      details: "Each space is carefully selected for its unique character and connection to local culture."
    },
    {
      title: "Community Connection",
      icon: Users,
      description: "Building bridges between travelers and Mumbai's vibrant communities",
      image: getPropertyImageUrls("Zen Suite")[0] || "https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      details: "Meet local artists, taste authentic cuisine, and discover hidden neighborhood gems."
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePhilosophy((prev) => (prev + 1) % philosophies.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="about" className="py-16 sm:py-24 bg-gradient-to-br from-warm-gray-50 via-blue-50 to-purple-50 overflow-hidden relative">
      {/* Glassmorphic Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-gradient-to-r from-gold-400/10 to-amber-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className={`text-center mb-12 sm:mb-16 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-gray-900 mb-4 sm:mb-6 tracking-wide">
            Our Mumbai Philosophy
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto font-light">
            More than accommodation—we create authentic connections to Mumbai's soul
          </p>
        </div>

        {/* Interactive Philosophy Cards */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-12 sm:mb-16">
          {/* Philosophy Navigation */}
          <div className={`space-y-4 sm:space-y-6 transform transition-all duration-1000 delay-200 ${
            isVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
          }`}>
            {philosophies.map((philosophy, index) => (
              <div
                key={index}
                onClick={() => setActivePhilosophy(index)}
                className={`p-4 sm:p-6 rounded-2xl cursor-pointer transition-all duration-500 transform hover:scale-105 backdrop-blur-xl border ${
                  activePhilosophy === index
                    ? 'bg-white/80 shadow-2xl border-gold-200 border-l-4 border-l-gold-500'
                    : 'bg-white/40 hover:bg-white/60 hover:shadow-xl border-white/30'
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-colors duration-300 backdrop-blur-sm ${
                    activePhilosophy === index
                      ? 'bg-gold-500 text-white shadow-lg'
                      : 'bg-white/50 text-gray-600 border border-white/50'
                  }`}>
                    <philosophy.icon className="w-6 h-6 sm:w-7 sm:h-7" />
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-lg sm:text-xl font-medium mb-2 transition-colors duration-300 ${
                      activePhilosophy === index ? 'text-gray-900' : 'text-gray-700'
                    }`}>
                      {philosophy.title}
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base font-light leading-relaxed">
                      {philosophy.description}
                    </p>
                    {activePhilosophy === index && (
                      <div className="mt-3 pt-3 border-t border-gray-200/50">
                        <p className="text-gray-700 text-sm font-light leading-relaxed">
                          {philosophy.details}
                        </p>
                      </div>
                    )}
                  </div>
                  {activePhilosophy === index && (
                    <ArrowRight className="w-5 h-5 text-gold-500 animate-pulse" />
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Philosophy Image */}
          <div className={`transform transition-all duration-1000 delay-400 ${
            isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
          }`}>
            <div className="relative h-80 sm:h-96 rounded-2xl overflow-hidden group">
              <img
                src={philosophies[activePhilosophy].image}
                alt={philosophies[activePhilosophy].title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              
              {/* Image Overlay Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4">
                  <h4 className="text-lg font-medium text-gray-900 mb-2">
                    {philosophies[activePhilosophy].title}
                  </h4>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {philosophies[activePhilosophy].details}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Philosophy Stats */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 transform transition-all duration-1000 delay-600 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <div className="text-center p-6 sm:p-8 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/50">
            <div className="w-16 h-16 bg-gold-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Compass className="w-8 h-8 text-gold-600" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">Cultural Immersion</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Every property connects you to Mumbai's authentic cultural heartbeat
            </p>
          </div>

          <div className="text-center p-6 sm:p-8 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/50">
            <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">Curated Experiences</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Handpicked properties that tell Mumbai's diverse neighborhood stories
            </p>
          </div>

          <div className="text-center p-6 sm:p-8 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/50">
            <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">Community Connection</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Building bridges between travelers and Mumbai's vibrant communities
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MumbaiPhilosophy;