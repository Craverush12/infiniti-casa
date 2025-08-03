import React, { useState } from 'react';
import { Wifi, AirVent, Utensils, Car, Shield, Coffee, CheckCircle, Sparkles, Award, Heart, Users, Bed, Bath, Tv, Smartphone, Bus, MapPin, Clock, Star, BookOpen, ChevronDown, ChevronUp } from 'lucide-react';
import type { PropertyDetailData } from '../../data/propertyDetails';

interface PropertyAmenitiesProps {
  property: PropertyDetailData;
}

const PropertyAmenities: React.FC<PropertyAmenitiesProps> = ({ property }) => {
  const [showAllAmenities, setShowAllAmenities] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const getAmenityIcon = (amenity: string) => {
    const iconMap: Record<string, React.ComponentType<any>> = {
      'WiFi': Wifi,
      'Air Conditioning': AirVent,
      'Kitchen': Utensils,
      'Parking': Car,
      'Security': Shield,
      'Coffee': Coffee,
      'Essentials': Utensils,
      'TV': Tv,
      'Cable TV': Tv,
      'Dedicated workspace': Smartphone,
      'Free parking on premises': Car,
      'Private entrance': Shield,
      'Washing machine': Utensils,
      'Dryer': Utensils,
      'Hair dryer': Utensils,
      'Iron': Utensils,
      'Shampoo': Utensils,
      'Hot water': Utensils,
      'Bed linens': Bed,
      'Extra pillows and blankets': Bed,
      'Room-darkening shades': Bed,
      'Hangers': Utensils,
      'Fire extinguisher': Shield,
      'Smoke alarm': Shield,
      'Carbon monoxide alarm': Shield,
      'First aid kit': Shield,
      'Security cameras on property': Shield,
      'Balcony': MapPin,
      'Sea View': MapPin,
      'Garden': MapPin,
      'Private Terrace': MapPin,
      'Butler Service': Users,
      'Valet Parking': Car,
      'Gym Access': Award,
      'Concierge': Users,
      'Library': BookOpen,
      'Art Studio': Sparkles,
      'Creative Space': Sparkles,
      'Traditional Artwork': Sparkles,
      'Cultural Experience': Heart,
      'Heritage': Award,
      'Vintage furnishings': Award,
      'Colonial architecture': Award,
      'Historical significance': Award,
      'Century-old garden': MapPin,
      'Private garden': MapPin,
      'Zen atmosphere': Heart,
      'Meditation space': Heart,
      'Peaceful retreat': Heart,
      'Urban sanctuary': Heart,
      'Smart layout': Award,
      'Prime location': MapPin,
      'Modern design': Award,
      'Bandra vibes': Heart,
      'Contemporary design': Award,
      'Floor-to-ceiling windows': Award,
      'Private balcony': MapPin,
      'Contemporary furnishings': Award,
      'Panoramic city views': MapPin,
      'Business center access': Award,
      'Concierge service': Users,
      'Gym facilities': Award,
      '360-degree views': MapPin,
      'Personalized service': Users,
      'Luxury amenities': Award,
      'Original artwork': Sparkles,
      'Creative studio space': Sparkles,
      'Cultural heritage': Heart,
      'Artistic community': Heart,
      'Traditional Indian design': Award,
      'Authentic hospitality': Heart,
      'Heritage elements': Award
    };

    return iconMap[amenity] || CheckCircle;
  };

  // Get essential amenities (first 3 from each category)
  const getEssentialAmenities = () => {
    return property.amenities.categories.map((category, index) => ({
      category,
      features: property.amenities.features
        .filter((_, featureIndex) => featureIndex % 3 === index)
        .slice(0, 3)
    }));
  };

  // Get all amenities for expanded view
  const getAllAmenities = () => {
    return property.amenities.categories.map((category, index) => ({
      category,
      features: property.amenities.features
        .filter((_, featureIndex) => featureIndex % 3 === index)
    }));
  };

  const amenitiesToShow = showAllAmenities ? getAllAmenities() : getEssentialAmenities();

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 to-orange-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            What this place offers
          </h2>
          <p className="text-lg text-slate-600">
            Discover the unique amenities and features that make {property.name} special
          </p>
        </div>

        {/* Essential Amenities */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {amenitiesToShow.map((categoryData, index) => (
            <div key={index} className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-slate-200/50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-slate-900">
                  {categoryData.category}
                </h3>
                {showAllAmenities && categoryData.features.length > 3 && (
                  <button
                    onClick={() => setExpandedCategory(expandedCategory === categoryData.category ? null : categoryData.category)}
                    className="text-orange-600 hover:text-orange-700 transition-colors"
                  >
                    {expandedCategory === categoryData.category ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>
                )}
              </div>
              <div className="space-y-3">
                {categoryData.features
                  .slice(0, showAllAmenities && expandedCategory === categoryData.category ? undefined : 6)
                  .map((feature, featureIndex) => {
                    const Icon = getAmenityIcon(feature);
                    return (
                      <div key={featureIndex} className="flex items-center space-x-3">
                        <Icon className="w-5 h-5 text-orange-600" />
                        <span className="text-slate-700">{feature}</span>
                      </div>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>

        {/* Show More/Less Button */}
        <div className="text-center mb-12">
          <button
            onClick={() => setShowAllAmenities(!showAllAmenities)}
            className="inline-flex items-center space-x-2 bg-white/90 backdrop-blur-sm text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-white transition-all duration-300 shadow-sm border border-orange-200/50"
          >
            {showAllAmenities ? (
              <>
                <span>Show Less</span>
                <ChevronUp className="w-5 h-5" />
              </>
            ) : (
              <>
                <span>Show All Amenities</span>
                <ChevronDown className="w-5 h-5" />
              </>
            )}
          </button>
        </div>

        {/* Unique Features */}
        <div className="bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 rounded-2xl p-8 shadow-lg">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">
              What makes this place special
            </h3>
            <p className="text-slate-600">
              Unique features that set {property.name} apart
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {property.amenities.uniqueFeatures.map((feature, index) => {
              const Icon = getAmenityIcon(feature);
              return (
                <div key={index} className="bg-white/95 backdrop-blur-sm rounded-xl p-6 text-center shadow-sm hover:shadow-lg transition-all duration-300 border border-orange-200/50">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-orange-700" />
                  </div>
                  <h4 className="font-semibold text-slate-900 mb-2">{feature}</h4>
                  <p className="text-sm text-slate-600">
                    Exclusive to this property
                  </p>
                </div>
              );
            })}
          </div>
        </div>


      </div>
    </section>
  );
};

export default PropertyAmenities; 