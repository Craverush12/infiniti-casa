import React from 'react';
import type { PropertyDetailData } from '../data/propertyDetails';
import { MapPin, Star } from 'lucide-react';

interface MosaicPropertyGridProps {
  properties: PropertyDetailData[];
  onPropertyClick?: (property: PropertyDetailData) => void;
}

const PropertyTile: React.FC<{
  property: PropertyDetailData;
  onClick: () => void;
  variant: 'feature' | 'medium' | 'standard';
}> = ({ property, onClick, variant }) => {
  const img = property.hero.images?.[0] || '';
  const base =
    'relative overflow-hidden rounded-2xl shadow-lg group cursor-pointer bg-white';

  const sizeClasses =
    variant === 'feature'
      ? 'h-[520px]'
      : variant === 'medium'
      ? 'h-[250px] md:h-[250px]'
      : 'aspect-[4/3] md:aspect-[16/10]';

  return (
    <div className={`${base} ${sizeClasses}`} onClick={onClick}>
      <img
        src={img}
        alt={property.name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        loading="lazy"
        decoding="async"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
        <div>
          <h3 className={`text-white ${variant === 'feature' ? 'text-2xl' : 'text-base md:text-lg'} font-editorial leading-tight drop-shadow`}>{property.name}</h3>
          <div className="mt-1 flex items-center gap-3 text-white/90 text-xs md:text-sm">
            <span className="inline-flex items-center"><MapPin className="w-3 h-3 mr-1" />{property.hero.location}</span>
            <span className="inline-flex items-center"><Star className="w-3 h-3 mr-1 text-yellow-400" />{property.hero.rating} · {property.hero.reviews_count}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const MosaicPropertyGrid: React.FC<MosaicPropertyGridProps> = ({ properties, onPropertyClick }) => {
  const items = properties.slice(0, 7);
  const feature = items[0];
  const mediums = items.slice(1, 3);
  const rest = items.slice(3);

  return (
    <div className="space-y-6">
      {/* Top mosaic: feature + two stacked mediums */}
      {feature && (
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <PropertyTile
              property={feature}
              variant="feature"
              onClick={() => onPropertyClick?.(feature)}
            />
          </div>
          <div className="flex flex-col gap-6">
            {mediums.map((p) => (
              <PropertyTile
                key={p.id}
                property={p}
                variant="medium"
                onClick={() => onPropertyClick?.(p)}
              />)
            )}
          </div>
        </div>
      )}

      {/* Remaining standard grid */}
      {rest.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {rest.map((p) => (
            <PropertyTile
              key={p.id}
              property={p}
              variant="standard"
              onClick={() => onPropertyClick?.(p)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MosaicPropertyGrid;


