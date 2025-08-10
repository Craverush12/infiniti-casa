import React, { useState } from 'react';
import { 
  Wifi, 
  Monitor, 
  Bath, 
  ChefHat, 
  PawPrint, 
  Sparkles,
  Tv,
  Coffee,
  Car,
  Umbrella,
  Snowflake,
  Flame,
  Shield,
  Lock,
  Users,
  Bed,
  Sofa,
  Table,
  Lamp,
  Fan,
  Leaf,
  Mountain,
  Camera,
  Music,
  BookOpen,
  Gamepad2,
  Dumbbell,
  TreePine,
  Sun,
  Moon,
  Cloud,
  Zap,
  CheckCircle
} from 'lucide-react';
import type { PropertyDetailData } from '../../data/propertyDetails';

interface PropertyAmenitiesProps {
  property: PropertyDetailData;
  themeHex?: string;
}

const PropertyAmenities: React.FC<PropertyAmenitiesProps> = ({ property, themeHex = '#0f766e' }) => {
  const amenities = [
    { icon: Wifi, label: 'High-Speed WiFi', category: 'Essential' },
    { icon: Monitor, label: 'Dedicated Workspace', category: 'Work' },
    { icon: Bath, label: 'Private Bathroom', category: 'Bathroom' },
    { icon: ChefHat, label: 'Full Kitchen', category: 'Kitchen' },
    { icon: PawPrint, label: 'Pet Friendly', category: 'Pets' },
    { icon: Sparkles, label: 'Daily Cleaning', category: 'Service' },
    { icon: Tv, label: 'Smart TV', category: 'Entertainment' },
    { icon: Coffee, label: 'Coffee Maker', category: 'Kitchen' },
    { icon: Car, label: 'Free Parking', category: 'Transport' },
    { icon: Umbrella, label: 'Balcony/Terrace', category: 'Outdoor' },
    { icon: Snowflake, label: 'Air Conditioning', category: 'Climate' },
    { icon: Flame, label: 'Heating', category: 'Climate' },
    { icon: Shield, label: 'Security System', category: 'Safety' },
    { icon: Lock, label: 'Smart Lock', category: 'Safety' },
    { icon: Users, label: 'Host Greeting', category: 'Service' },
    { icon: Bed, label: 'Premium Bedding', category: 'Sleep' },
    { icon: Sofa, label: 'Living Room', category: 'Living' },
    { icon: Table, label: 'Dining Area', category: 'Dining' },
    { icon: Table, label: 'Work Desk', category: 'Work' },
    { icon: Lamp, label: 'Reading Lights', category: 'Lighting' },
    { icon: Fan, label: 'Ceiling Fan', category: 'Climate' },
    { icon: Leaf, label: 'Garden View', category: 'Outdoor' },
    { icon: Mountain, label: 'Mountain View', category: 'Outdoor' },
    { icon: Camera, label: 'Security Cameras', category: 'Safety' },
    { icon: Music, label: 'Bluetooth Speaker', category: 'Entertainment' },
    { icon: BookOpen, label: 'Library', category: 'Entertainment' },
    { icon: Gamepad2, label: 'Board Games', category: 'Entertainment' },
    { icon: Dumbbell, label: 'Fitness Equipment', category: 'Wellness' },
    { icon: TreePine, label: 'Swimming Pool', category: 'Recreation' },
    { icon: TreePine, label: 'Private Garden', category: 'Outdoor' },
    { icon: Sun, label: 'Sun Deck', category: 'Outdoor' },
    { icon: Moon, label: 'Stargazing Deck', category: 'Outdoor' },
    { icon: Cloud, label: 'Climate Control', category: 'Climate' },
    { icon: Zap, label: 'Fast Charging', category: 'Tech' }
  ];

  const categories = ['Essential', 'Work', 'Bathroom', 'Kitchen', 'Pets', 'Service', 'Entertainment', 'Transport', 'Outdoor', 'Climate', 'Safety', 'Sleep', 'Living', 'Dining', 'Lighting', 'Wellness', 'Recreation', 'Tech'];

  const [showAll, setShowAll] = useState(false);

  const specialFeatures = property.amenities.features || [];
  const visibleSpecial = showAll ? specialFeatures : specialFeatures.slice(0, 6);
  const totalCount = specialFeatures.length + amenities.length;

  return (
    <section className="py-16 bg-[#fefcf8]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="space-y-8">
          {/* Section Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-2" style={{ color: themeHex }}>
              <CheckCircle className="w-5 h-5" />
              <span className="text-sm font-medium">Amenities</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 text-editorial">Everything You Need</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">From essential comforts to luxury touches, curated for your stay</p>
          </div>

          {/* Compact highlight chips (collapsed) */}
          {!showAll && (
            <div className="flex flex-wrap justify-center gap-2">
              {visibleSpecial.map((amenity, idx) => (
                <span key={idx} className="px-3 py-1 rounded-full text-sm bg-white border border-sage-200 text-gray-700">
                  {amenity}
                </span>
              ))}
            </div>
          )}

          {/* Full amenities (expanded) */}
          {showAll && (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                {amenities.map((amenity, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:scale-105 group"
                  >
                    <div className="flex flex-col items-center space-y-3 text-center">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: themeHex }}>
                        <amenity.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-900 block">
                          {amenity.label}
                        </span>
                        <span className="text-xs text-gray-500 block mt-1">
                          {amenity.category}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Property-Specific Amenities */}
          <div className="mt-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Special Features</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleSpecial.map((amenity: string, index: number) => (
                <div key={index} className="bg-white p-6 rounded-xl border border-sage-200 shadow-sm">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: themeHex }}>
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-medium text-gray-900">{amenity}</span>
                  </div>
                </div>
              ))}
            </div>
            {specialFeatures.length > 6 && (
              <div className="text-center mt-8">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="btn-secondary px-6 py-3 rounded-xl"
                >
                  {showAll ? 'Hide amenities' : `View all amenities (${totalCount})`}
                </button>
              </div>
            )}
          </div>

          {/* Minimal stats (optional, toned-down) */}
          {showAll && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{amenities.length}</div>
                <div className="text-sm text-gray-600">Total Amenities</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{categories.length}</div>
                <div className="text-sm text-gray-600">Categories</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">24/7</div>
                <div className="text-sm text-gray-600">Support</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">100%</div>
                <div className="text-sm text-gray-600">Verified</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PropertyAmenities; 