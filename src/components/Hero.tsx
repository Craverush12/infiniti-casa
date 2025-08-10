import React, { useEffect, useState } from 'react';
import { Calendar, ArrowRight, MapPin, Search, X } from 'lucide-react';
import heroImg from '../asssets/mainmodelheroimage.avif';

interface HeroProps {
  onSuggestionClick?: () => void;
  onPropertySelect?: (propertyId: number) => void;
  onSearchWithDates?: (query: string, checkIn: string, checkOut: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onSuggestionClick, onSearchWithDates }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [checkIn, setCheckIn] = useState<string>('');
  const [checkOut, setCheckOut] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative h-screen overflow-hidden" aria-label="Hero">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="Luxury stay experience in Mumbai"
          className="w-full h-full object-cover"
          loading="eager"
          decoding="sync"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/60"></div>
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
            <div
              className={`mb-10 sm:mb-12 transform transition-all duration-1000 ease-out delay-300 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
              }`}
            >
              <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-6 max-w-2xl mx-auto shadow-2xl">
                {/* Row 1: destination + search */}
                <div className="flex items-center gap-3 text-gray-700 w-full">
                  <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Where would you like to stay?"
                    className="w-full bg-transparent border-none outline-none text-gray-700 placeholder-gray-400 text-base sm:text-lg focus:placeholder-gray-300"
                    aria-label="Search destination"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        setIsDateOpen(true);
                      }
                    }}
                  />
                  <button
                    onClick={() => setIsDateOpen(true)}
                    className="bg-amber-600 hover:bg-amber-700 text-white px-5 py-3 rounded-xl font-medium shadow-lg whitespace-nowrap"
                  >
                    Search
                  </button>
                </div>
                {/* Date buttons removed per new flow; dates are collected after pressing Search */}
              </div>
            </div>
            </div>

            {/* CTAs */}
            <div className={`transform transition-all duration-1000 ease-out delay-500 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}>
              <div className="flex flex-row flex-wrap gap-4 justify-center items-center">
                <button
                  onClick={onSuggestionClick}
                  className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href="#stories"
                  className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full font-medium hover:bg-white/30 transition-all duration-300 hover:scale-105"
                >
                  <MapPin className="w-4 h-4" />
                  <span>Explore Properties</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      {/* Date Range Modal */}
      {isDateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={() => setIsDateOpen(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-[92vw] max-w-md p-4 sm:p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-medium text-gray-900">Select dates</h3>
              <button onClick={() => setIsDateOpen(false)} className="p-2 rounded-full hover:bg-gray-100">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Check-in</label>
                <input type="date" className="input-elegant" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Check-out</label>
                <input type="date" className="input-elegant" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <button className="text-sm text-gray-600 hover:text-gray-900" onClick={() => { setCheckIn(''); setCheckOut(''); }}>Clear</button>
              <button
                className="bg-amber-600 hover:bg-amber-700 text-white px-5 py-2 rounded-xl font-medium"
                onClick={() => {
                  setIsDateOpen(false);
                  if (onSearchWithDates && searchQuery.trim() && checkIn && checkOut) {
                    onSearchWithDates(searchQuery.trim(), checkIn, checkOut);
                  }
                }}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;