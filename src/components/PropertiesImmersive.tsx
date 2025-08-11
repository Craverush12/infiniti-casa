import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
// Removed GSAP/Lenis smooth scrolling to prevent flicker and enforce snap-to-section
import { ArrowDown, ArrowUp, MapPin, Star } from 'lucide-react';
import MaterialSwatches from './MaterialSwatches';
import type { PropertyDetailData } from '../data/propertyDetails';

interface PropertiesImmersiveProps {
  properties: PropertyDetailData[];
  onPropertyClick?: (property: PropertyDetailData) => void;
}

// Small curated palette to theme sections without image color extraction
const ACCENT_PALETTE = [
  '#0e7490', // cyan-700
  '#b45309', // amber-700
  '#065f46', // emerald-800
  '#7c3aed', // violet-600
  '#dc2626', // red-600
  '#2563eb', // blue-600
  '#16a34a', // green-600
];

function getAccentColor(index: number): string {
  return ACCENT_PALETTE[index % ACCENT_PALETTE.length];
}

const Section: React.FC<{
  property: PropertyDetailData;
  index: number;
  total: number;
  onViewDetails: () => void;
  align: 'left' | 'right';
}> = ({ property, index, total, onViewDetails, align }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  // Parallax: background slower, label slightly opposing
  const bgY = useTransform(scrollYProgress, [0, 1], ['-4%', '4%']);
  const labelY = useTransform(scrollYProgress, [0, 1], ['3%', '-3%']);

  const accent = getAccentColor(index);
  const heroImage = property.hero.images?.[0] || '';

  return (
    <section ref={ref} className="relative h-screen w-full snap-start overflow-hidden" aria-label={property.name}>
      {/* Background image with subtle Ken Burns (always visible) */}
      <motion.img
        src={heroImage}
        alt={property.name}
        initial={{ scale: 1.02 }}
        animate={{ scale: 1.04 }}
        transition={{ duration: 1.0, ease: 'easeOut' }}
        className="absolute inset-0 w-full h-full object-cover will-change-transform"
        style={{ y: bgY }}
      />
      {/* Light scrim to ensure content legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent" />

      {/* Bottom-anchored card */}
      <motion.div
        className="absolute inset-x-0 bottom-0 px-4 pb-[max(env(safe-area-inset-bottom),1rem)]"
        style={{ y: labelY }}
      >
        <div className="w-full max-w-5xl mx-auto">
          <div className="rounded-3xl shadow-2xl overflow-hidden bg-white/95 backdrop-blur-sm border border-white/70">
            <div className="grid grid-cols-1 md:grid-cols-3">
              {/* Left: image */}
              <div className="md:col-span-1 h-40 md:h-56 relative">
                <img src={heroImage} alt={property.name} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
              </div>
              {/* Right: details */}
              <div className="md:col-span-2 p-5 md:p-6">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-gray-900 font-editorial text-2xl md:text-3xl leading-tight">{property.name}</h2>
                  <span className="text-gray-800 text-sm md:text-base">₹{property.hero.price.toLocaleString()} / night</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700 text-sm md:text-base">
                  <span className="inline-flex items-center"><MapPin className="w-4 h-4 mr-1" />{property.hero.location}</span>
                  <span className="inline-flex items-center"><Star className="w-4 h-4 text-yellow-400 mr-1" />{property.hero.rating} · {property.hero.reviews_count}</span>
                </div>
                <ul className="mt-3 grid grid-cols-2 md:grid-cols-3 gap-2 text-gray-700 text-sm">
                  {property.hero.highlights.slice(0, 6).map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
                <div className="mt-4 flex items-center gap-3">
                  <button
                    onClick={onViewDetails}
                    className="px-4 py-2 rounded-full font-medium shadow-lg bg-primary-600 text-white hover:bg-primary-700 transition"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

const IntroSection: React.FC = () => {
  return (
    <section className="relative h-screen w-full snap-start overflow-hidden">
      {/* Background image */}
      <img
        src="/site/assets/afrohemia.png"
        alt="Properties background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/10" />
      <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 18 }}
            className="text-white font-editorial text-4xl sm:text-6xl md:text-7xl"
          >
            Our Properties
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 100, damping: 20 }}
            className="mt-4 text-white/90 text-base sm:text-lg max-w-2xl mx-auto"
          >
            A curated collection of homes—scroll to enter each space.
          </motion.p>
          {/* Scroll nudge removed per request */}
        </div>
      </div>
    </section>
  );
};

const PropertiesImmersive: React.FC<PropertiesImmersiveProps> = ({ properties, onPropertyClick }) => {
  const [showLoader] = useState(false);
  const sectionsRef = useRef<Array<HTMLElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  // Removed smooth scrolling setup
  useEffect(() => {
    // no-op
  }, []);

  // keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const currentIndex = getCurrentSectionIndex();
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        scrollToIndex(Math.min(properties.length, currentIndex + 1));
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        scrollToIndex(Math.max(0, currentIndex - 1));
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [properties.length]);

  const scrollToIndex = (i: number) => {
    const el = sectionsRef.current[i];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const getCurrentSectionIndex = () => {
    let closestIndex = 0;
    let minDelta = Number.POSITIVE_INFINITY;
    sectionsRef.current.forEach((el, idx) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const delta = Math.abs(rect.top);
      if (delta < minDelta) {
        minDelta = delta;
        closestIndex = idx;
      }
    });
    return closestIndex;
  };

  // Observe active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = sectionsRef.current.findIndex((el) => el === entry.target);
            if (idx !== -1) setActiveIndex(idx);
          }
        });
      },
      { root: null, threshold: 0.6 }
    );
    sectionsRef.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const total = properties.length + 1; // include intro

  return (
    <div className="relative min-h-screen snap-y snap-mandatory">
      {/* Loader */}
      {showLoader && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-cream-50 via-white to-sage-50"
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 120, damping: 18 }}
            className="text-center px-6"
          >
            <div className="text-3xl sm:text-4xl md:text-5xl font-editorial text-gray-900">Our Properties</div>
            <div className="mt-3 text-gray-600 max-w-xl">
              A curated collection of homes. Scroll to tour each space.
            </div>
            <motion.div
              className="mx-auto mt-8 h-1 w-40 rounded-full bg-gray-200 overflow-hidden"
            >
              <motion.div
                className="h-full bg-gray-900"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.1, ease: 'easeInOut' }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}

      {/* Chapters (document scroll) */}
      <div>
        {/* Intro hero */}
        <section ref={(el) => (sectionsRef.current[0] = el)} className="h-screen w-full snap-start" key="intro">
          <IntroSection />
        </section>
        {properties.map((p, idx) => (
          <React.Fragment key={p.id}>
            {/* Property Hero Section */}
            <section ref={(el) => (sectionsRef.current[idx + 1] = el)} className="h-screen w-full snap-start">
              <Section
                property={p}
                index={idx}
                total={total}
                align={idx % 2 === 0 ? 'right' : 'left'}
                onViewDetails={() => onPropertyClick?.(p)}
              />
            </section>
            {/* Property Swatches Detail Section (hard snap at center) */}
            <section
              ref={(el) => (sectionsRef.current[(idx + 1) * 2 as any] = el as any)}
              className="h-screen w-full snap-center"
              aria-label={`${p.name} details`}
            >
              <MaterialSwatches
                images={[
                  p.hero.images[1] || p.hero.images[0],
                  p.hero.images[2] || p.hero.images[0],
                  p.hero.images[3] || p.hero.images[0],
                  p.hero.images[4] || p.hero.images[0],
                ]}
                labels={["Bedroom", "Bathroom", "Living", "Kitchen", "Neighborhood"]}
                variant="light"
                backgroundColor={(() => {
                  const name = p.name.toLowerCase();
                  if (name.includes('sky lounge')) return '#1F212E';
                  if (name.includes('little white bandra studio')) return '#3A4052';
                  if (name.includes('india house')) return '#BB3D3F';
                  if (name.includes('city zen')) return '#E89958';
                  if (name.includes('bandra cottage')) return '#A67939';
                  if (name.includes('afrohemian')) return '#587286';
                  if (name.includes('bandra art house')) return '#1C0B1D';
                  return undefined;
                })()}
                className=""
              />
            </section>
          </React.Fragment>
        ))}
      </div>

      {/* Dot navigation */}
      <div className="pointer-events-auto fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden sm:flex flex-col gap-2">
        {[0, ...properties.map((_, i) => i + 1)].map((val, idx) => (
          <button
            key={val}
            aria-label={idx === 0 ? 'Go to intro' : `Go to property ${idx}`}
            onClick={() => scrollToIndex(val)}
            className={`w-3 h-3 rounded-full border transition ${activeIndex === val ? 'border-white bg-white' : 'border-white/70 bg-white/40 hover:bg-white/80'}`}
          />
        ))}
      </div>

      {/* Scroll cue removed per request */}
    </div>
  );
};

export default PropertiesImmersive;


