import React, { useState, useEffect, useRef } from 'react';
import { Star, MapPin } from 'lucide-react';
import { getPropertyImageUrls } from '../utils/propertyAssets';

interface Testimonial {
  id: number;
  name: string;
  location: string;
  avatar: string;
  propertyImage?: string;
  propertyName?: string;
  rating: number;
  text: string;
  stayDuration: string;
  size: 'small' | 'medium' | 'large';
  position: string;
  type: 'image' | 'text-only';
  imageOrientation?: 'vertical' | 'horizontal';
}

const testimonials: Testimonial[] = [
  { id: 1, name: 'Priya Sharma', location: 'Delhi', avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop', propertyImage: getPropertyImageUrls('Art Loft Bandra')[0] || 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop', propertyName: 'Art Loft Bandra', rating: 5, text: "Every corner revealed something new—it was like staying in a living gallery where art and life became one. The attention to detail in every piece of artwork and the way the space flows is absolutely magical.", stayDuration: '5 nights', size: 'large', position: 'top-left', type: 'image', imageOrientation: 'horizontal' },
  { id: 2, name: 'Raj Patel', location: 'Bangalore', avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop', propertyImage: getPropertyImageUrls('Heritage Garden Cottage')[0] || 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop', propertyName: 'Heritage Garden Cottage', rating: 5, text: 'The heritage cottage transported me back in time while providing all modern comforts. The garden was absolutely stunning.', stayDuration: '3 nights', size: 'medium', position: 'top-right', type: 'image', imageOrientation: 'vertical' },
  { id: 3, name: 'Sarah Johnson', location: 'London', avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop', propertyImage: getPropertyImageUrls('Zen Suite')[0] || 'https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop', propertyName: 'Zen Suite', rating: 5, text: 'An oasis of calm in the bustling city. Perfect.', stayDuration: '7 nights', size: 'small', position: 'middle-left', type: 'image', imageOrientation: 'vertical' },
  { id: 4, name: 'Arjun Mehta', location: 'Chennai', avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop', rating: 5, text: "The views from the penthouse were breathtaking. Every sunset felt like a private show. The service was impeccable and the location couldn't be better.", stayDuration: '4 nights', size: 'medium', position: 'middle-right', type: 'text-only' },
  { id: 5, name: 'Emma Wilson', location: 'New York', avatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop', rating: 5, text: 'Perfect for a romantic getaway. Incredible attention to detail.', stayDuration: '2 nights', size: 'small', position: 'bottom-left', type: 'text-only' },
  { id: 6, name: 'Michael Chen', location: 'Singapore', avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop', rating: 5, text: "The cultural immersion was beyond expectations. Mumbai's history came alive in every corner of this beautifully restored property. The hosts were incredibly knowledgeable and made our stay truly memorable.", stayDuration: '6 nights', size: 'large', position: 'bottom-right', type: 'text-only' },
  // extra cards to ensure full coverage and better distribution
  { id: 7, name: 'Neha Gupta', location: 'Pune', avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop', propertyImage: getPropertyImageUrls('Penthouse Sky Lounge')[0] || 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop', propertyName: 'Sky Lounge', rating: 5, text: 'Sunsets from the terrace were unreal. The whole space feels curated and calm.', stayDuration: '3 nights', size: 'medium', position: 'x', type: 'image', imageOrientation: 'horizontal' },
  { id: 8, name: 'Aditya Rao', location: 'Hyderabad', avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop', rating: 5, text: 'Design, comfort, and hospitality—everything was on point. Would gladly return.', stayDuration: '4 nights', size: 'small', position: 'x', type: 'text-only' },
  { id: 9, name: 'Laura Kim', location: 'Seoul', avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop', propertyImage: getPropertyImageUrls('Bandra Cottage with Yard')[0] || 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop', propertyName: 'Bandra Cottage', rating: 5, text: 'A green pocket in the city. The yard was my favorite retreat each morning.', stayDuration: '5 nights', size: 'small', position: 'x', type: 'image', imageOrientation: 'horizontal' },
];

const TestimonialsSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const [activeCardId, setActiveCardId] = useState<number | null>(null);
  const [activeColumn, setActiveColumn] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setIsVisible(true); }, { threshold: 0.1 });
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => { setActiveTestimonial((prev) => (prev + 1) % testimonials.length); }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Balance columns so the grid looks fully covered
  const estimateWeight = (t: Testimonial): number => {
    const sizeWeight = t.size === 'large' ? 3 : t.size === 'medium' ? 2 : 1;
    const imageWeight = t.type === 'image' ? 1 : 0.6;
    const orientationBump = t.imageOrientation === 'vertical' ? 0.4 : 0.2;
    return sizeWeight + imageWeight + orientationBump;
  };

  const distributeIntoColumns = (items: Testimonial[], columnCount: number): Testimonial[][] => {
    const cols: { items: Testimonial[]; weight: number }[] = Array.from({ length: columnCount }, () => ({ items: [], weight: 0 }));
    items.forEach((it) => {
      cols.sort((a, b) => a.weight - b.weight);
      cols[0].items.push(it);
      cols[0].weight += estimateWeight(it);
    });
    return cols.map((c) => c.items);
  };

  // Base height estimator used for balancing and transitions
  function baseCardHeight(t: Testimonial): number {
    if (t.type === 'image') {
      const imgBase = t.size === 'large' ? 320 : t.size === 'medium' ? 256 : 192;
      const vertBonus = t.imageOrientation === 'vertical' ? 64 : 0;
      const content = t.size === 'large' ? 180 : t.size === 'medium' ? 140 : 120;
      return imgBase + vertBonus + content;
    }
    // text-only
    return t.size === 'large' ? 260 : t.size === 'medium' ? 220 : 180;
  }

  let columns = distributeIntoColumns(testimonials, 3);

  // Even out column bottoms by adding a tiny filler to the center if it's noticeably shorter
  const calcTotalHeight = (col: Testimonial[]) => col.reduce((sum, t) => sum + baseCardHeight(t), 0);
  {
    const [leftH, centerH, rightH] = [calcTotalHeight(columns[0]), calcTotalHeight(columns[1]), calcTotalHeight(columns[2])];
    const tallest = Math.max(leftH, centerH, rightH);
    if (tallest - centerH > 140) {
      const filler: Testimonial = {
        id: 900000 + testimonials.length,
        name: 'Verified Guest',
        location: 'Mumbai',
        avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        rating: 5,
        text: 'Design, comfort and hospitality were excellent. Would love to return!',
        stayDuration: '2 nights',
        size: 'small',
        position: 'balanced',
        type: 'text-only'
      };
      columns[1] = [...columns[1], filler];
    }
  }

  // Keep column total height steady by redistributing height deltas on hover

  const computeHeightsForColumn = (col: Testimonial[], colIndex: number): Record<number, number> => {
    const baseHeights = col.map(baseCardHeight);
    const total = baseHeights.reduce((a, b) => a + b, 0);
    const hoveredIndex = col.findIndex((c) => c.id === activeCardId && activeColumn === colIndex);
    if (hoveredIndex === -1) {
      // normal heights
      return col.reduce((acc, c, i) => { acc[c.id] = baseHeights[i]; return acc; }, {} as Record<number, number>);
    }
    const expandBy = 80; // px to add to hovered
    const minCollapsed = 96; // keep headers readable
    const heights = [...baseHeights];
    heights[hoveredIndex] = baseHeights[hoveredIndex] + expandBy;
    // subtract from others proportionally
    const otherTotal = total - baseHeights[hoveredIndex];
    let remainingToSubtract = expandBy;
    for (let i = 0; i < heights.length; i++) {
      if (i === hoveredIndex) continue;
      const share = Math.round((baseHeights[i] / otherTotal) * expandBy);
      const newH = Math.max(minCollapsed, baseHeights[i] - share);
      const actualSub = baseHeights[i] - newH;
      heights[i] = newH;
      remainingToSubtract -= actualSub;
    }
    // distribute any rounding leftover
    let j = 0;
    while (remainingToSubtract > 0 && j < heights.length) {
      if (j !== hoveredIndex && heights[j] > minCollapsed) { heights[j] -= 1; remainingToSubtract -= 1; }
      j = (j + 1) % heights.length;
    }
    return col.reduce((acc, c, i) => { acc[c.id] = heights[i]; return acc; }, {} as Record<number, number>);
  };

  const renderCard = (t: Testimonial, colIndex: number, heightPx: number) => {
    const isActive = activeCardId === t.id && activeColumn === colIndex;
    const isCollapsedSibling = activeColumn === colIndex && activeCardId !== null && activeCardId !== t.id;

    const commonContainer = `rounded-2xl bg-white shadow-lg transition-all duration-300 ease-out overflow-hidden ${
      isActive ? 'ring-2 ring-gray-900/10' : ''
    }`;

    const style = { height: heightPx, transition: 'height 300ms ease-out' } as React.CSSProperties;

    if (isCollapsedSibling) {
      return (
        <div className={`${commonContainer}`} style={style}>
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <img src={t.avatar} alt={t.name} className="w-9 h-9 rounded-full object-cover" />
              <div>
                <div className="text-sm font-semibold text-gray-900">{t.name}</div>
                <div className="text-xs text-gray-500">{t.location}</div>
              </div>
            </div>
            <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full">
              <Star className="w-3 h-3 text-yellow-400 fill-current" />
              <span className="text-xs font-medium text-gray-700">{t.rating}</span>
            </div>
          </div>
        </div>
      );
    }

    if (t.type === 'image' && t.propertyImage) {
      const imgBase = t.size === 'large' ? 320 : t.size === 'medium' ? 256 : 192;
      const vertBonus = t.imageOrientation === 'vertical' ? 64 : 0;
      const imageHeight = Math.min(heightPx - 120, imgBase + vertBonus + (isActive ? 32 : 0));
      return (
        <div className={commonContainer} style={style}>
          <div className="relative overflow-hidden" style={{ height: imageHeight }}>
            <img src={t.propertyImage} alt={t.propertyName} className={`w-full h-full object-cover transition-transform duration-500 ${isActive ? 'scale-105' : ''}`} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            <div className="absolute top-4 right-4 flex items-center gap-1 bg-white/90 backdrop-blur-sm border border-white/30 px-3 py-2 rounded-full">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="font-semibold text-gray-700">{t.rating}</span>
            </div>
            <div className="absolute bottom-4 left-4 text-white">
              <h4 className="font-semibold text-lg text-white drop-shadow-md">{t.propertyName}</h4>
              <div className="flex items-center gap-2 text-sm opacity-90"><MapPin className="w-4 h-4" /><span>Mumbai</span></div>
            </div>
          </div>
          <div className="p-4">
            <p className={`text-gray-700 leading-relaxed text-sm ${t.size === 'large' ? 'line-clamp-6' : t.size === 'medium' ? 'line-clamp-4' : 'line-clamp-3'}`}>"{t.text}"</p>
            <div className="mt-4 flex items-center gap-3">
              <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
              <div>
                <div className="font-semibold text-gray-900 text-sm">{t.name}</div>
                <div className="text-xs text-gray-500">{t.location}</div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className={commonContainer} style={style}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
              <div>
                <div className="font-semibold text-gray-900">{t.name}</div>
                <div className="text-sm text-gray-500">{t.location}</div>
              </div>
            </div>
            <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full"><Star className="w-4 h-4 text-yellow-400 fill-current" /><span className="text-sm font-medium text-gray-700">{t.rating}</span></div>
          </div>
          <p className={`text-gray-700 leading-relaxed ${t.size === 'large' ? 'line-clamp-8' : t.size === 'medium' ? 'line-clamp-5' : 'line-clamp-3'}`}>"{t.text}"</p>
        </div>
      </div>
    );
  };

  return (
    <section ref={containerRef} className="py-16 sm:py-24 relative overflow-hidden">
      <div className="absolute inset-0"><img src="/site/assets/bluecosoms.jpeg" alt="Blue cosmos background" className="w-full h-full object-cover" /><div className="absolute inset-0 bg-white/90"></div></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-12 sm:mb-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <h2 className="text-4xl sm:text-5xl font-light text-gray-900 mb-6 leading-tight"><span className="block text-gray-800">What our guests</span><span className="block text-gray-600 font-normal italic">are saying</span></h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">Real experiences from travelers who discovered Mumbai through our curated stays</p>
        </div>
        <div className={`grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 transform transition-all duration-700 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          {columns.map((col, colIndex) => {
            const heights = computeHeightsForColumn(col, colIndex);
            return (
              <div key={colIndex} className="flex flex-col gap-6 lg:gap-8" onMouseLeave={() => { setActiveCardId(null); setActiveColumn(null); }}>
                {col.map((t) => (
                  <div key={t.id} onMouseEnter={() => { setActiveCardId(t.id); setActiveColumn(colIndex); }} className="transition-all duration-300 ease-out">
                    {renderCard(t, colIndex, heights[t.id])}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
        <div className="flex justify-center mt-12 space-x-3" aria-label="Testimonials navigation">
          {testimonials.map((_, index) => (<button key={index} onClick={() => setActiveTestimonial(index)} className={`w-3 h-3 rounded-full transition-all duration-300 ${index === activeTestimonial ? 'bg-primary-500 scale-125' : 'bg-gray-300 hover:bg-gray-400'}`} aria-label={`Show testimonial ${index + 1}`} />))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;