import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface MaterialSwatchesProps {
  labels?: string[];
  images?: string[];
  transparent?: boolean; // when true, renders without section background to overlay on previous image
  className?: string;
  variant?: 'light' | 'dark';
  backgroundColor?: string;
}

const DEFAULT_LABELS = ['Bedroom', 'Bathroom', 'Living', 'Kitchen', 'Neighborhood'];

const MaterialSwatches: React.FC<MaterialSwatchesProps> = ({ labels = DEFAULT_LABELS, images = [], transparent = false, className = '', variant = 'light', backgroundColor }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start center', 'end center'] });
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.6, 0]);
  const useCustomBg = !!backgroundColor && !transparent;

  return (
    <div
      ref={containerRef}
      className={`relative h-screen md:h-screen w-full overflow-hidden ${
        transparent
          ? 'bg-transparent'
          : useCustomBg
          ? `${variant === 'light' ? 'text-gray-900' : 'text-white'}`
          : variant === 'light'
          ? 'bg-gradient-to-br from-cream-50 via-white to-sage-50 text-gray-900'
          : 'bg-neutral-950 text-white'
      } ${className}`}
      style={useCustomBg ? { backgroundColor } : undefined}
    >
      {!transparent && variant === 'dark' && (
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse at 30% 10%, rgba(255,255,255,0.08), transparent 40%), radial-gradient(ellipse at 70% 90%, rgba(255,255,255,0.06), transparent 40%)',
            }}
          />
        </div>
      )}
      {/* Center-triggered transition overlay (beige/white gradient) */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute inset-0"
          style={{
            opacity: overlayOpacity,
            background:
              variant === 'light'
                ? 'linear-gradient(180deg, rgba(248,243,231,0.7), rgba(248,243,231,0.0))'
                : 'linear-gradient(180deg, rgba(248,243,231,0.12), rgba(248,243,231,0.0))',
          }}
        />
      </div>
      <div className="relative h-full max-w-7xl mx-auto px-6 md:px-10 flex flex-col">
        <div className="pt-10 pb-6">
          <h3 className={`text-xl md:text-2xl font-editorial tracking-wide ${variant === 'light' ? 'text-gray-900' : 'text-white'}`}>Spaces</h3>
          <p className={`${variant === 'light' ? 'text-gray-600' : 'text-white/70'} text-sm md:text-base mt-1`}>
            Peek into key corners of the home.
          </p>
        </div>
        <div className="flex-1">
          {/* Horizontal scroll of 5 swatches */}
          <div className="h-[60vh] md:h-[65vh] -mx-6 md:-mx-10 px-6 md:px-10 overflow-x-auto overflow-y-hidden scrollbar-hide snap-x snap-mandatory">
            <div className="h-full flex gap-4 md:gap-6">
              {labels.slice(0, 5).map((label, idx) => (
                <motion.div
                  key={idx}
                  initial={false}
                  animate={false}
                  className={`snap-start group relative rounded-2xl overflow-hidden border ${
                    variant === 'light' ? 'border-gray-200 bg-white' : 'border-white/10 bg-neutral-900/60 backdrop-blur-sm'
                  } shadow-elegant flex-shrink-0 w-[70%] sm:w-[45%] md:w-[32%] lg:w-[22%]`}
                >
                  <img
                    src={images[idx] || images[0] || 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=640&h=480&fit=crop'}
                    alt={label}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className={`absolute inset-0 ${variant === 'light' ? 'bg-gradient-to-t from-black/20 via-black/5 to-transparent' : 'bg-gradient-to-t from-black/50 via-black/10 to-transparent'}`} />
                  <div className="relative h-full p-3 flex items-end">
                    <span className={`inline-flex items-center px-2.5 py-1.5 rounded-full ${
                      variant === 'light' ? 'bg-white/90 text-gray-900' : 'bg-white/90 text-gray-900'
                    } text-xs font-medium`}>
                      {label}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaterialSwatches;


