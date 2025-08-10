import React from 'react';
import {
  MapPin,
  Navigation,
  Plane,
  Train,
  Car,
  Bus,
  Coffee,
  Utensils,
  ShoppingBag,
  Camera,
  Music,
  TreePine,
  Building,
  Heart,
  Star,
  Clock,
  Users,
  Award,
  CheckCircle
} from 'lucide-react';
import type { PropertyDetailData } from '../../data/propertyDetails';

interface PropertyLocationProps {
  property: PropertyDetailData;
  themeHex?: string;
}

const PropertyLocation: React.FC<PropertyLocationProps> = ({ property, themeHex = '#0f766e' }) => {
  const nearbyPlaces = [
    { icon: Plane, name: 'Mumbai Airport', distance: '12 km', type: 'Transport' },
    { icon: Train, name: 'Bandra Station', distance: '0.8 km', type: 'Transport' },
    { icon: Bus, name: 'Bus Terminal', distance: '0.5 km', type: 'Transport' },
    { icon: Coffee, name: 'Café Coffee Day', distance: '0.2 km', type: 'Food' },
    { icon: Utensils, name: 'Fine Dining', distance: '0.3 km', type: 'Food' },
    { icon: ShoppingBag, name: 'Shopping Mall', distance: '1.2 km', type: 'Shopping' },
    { icon: Camera, name: 'Tourist Spots', distance: '2.5 km', type: 'Attractions' },
    { icon: Music, name: 'Nightlife', distance: '0.4 km', type: 'Entertainment' },
    { icon: TreePine, name: 'Public Park', distance: '0.6 km', type: 'Recreation' },
    { icon: Building, name: 'Business District', distance: '1.8 km', type: 'Business' }
  ];

  const getIconColor = (type: string) => {
    const colors = {
      Transport: themeHex,
      Food: 'text-green-600',
      Shopping: 'text-purple-600',
      Attractions: 'text-orange-600',
      Entertainment: 'text-pink-600',
      Recreation: 'text-teal-600',
      Business: 'text-gray-600'
    };
    return colors[type as keyof typeof colors] || 'text-gray-600';
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="space-y-8">
          {/* Section Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-2 text-amber-600">
              <MapPin className="w-5 h-5" />
              <span className="text-sm font-medium">Location</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              Perfect Location
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover the vibrant neighborhood and convenient access to everything you need
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Map Section */}
            <div className="space-y-6">
              <div className="bg-gray-100 rounded-2xl p-6 h-96 flex items-center justify-center border border-gray-200">
                <div className="text-center space-y-4">
                  <MapPin className="w-16 h-16 text-gray-400 mx-auto" />
                  <h3 className="text-xl font-semibold text-gray-700">
                    Interactive Map
                  </h3>
                  <p className="text-gray-600">
                    Map embed will be integrated here
                  </p>
                  <button className="bg-amber-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-amber-700 transition-colors">
                    View on Map
                  </button>
                </div>
              </div>

              {/* Location Highlights */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl border" style={{ borderColor: `${themeHex}22` }}>
                  <div className="flex items-center space-x-3">
                    <Navigation className="w-6 h-6" style={{ color: themeHex }} />
                    <div>
                      <div className="font-medium text-gray-900">Prime Location</div>
                      <div className="text-sm text-gray-600">Central Bandra</div>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <Star className="w-6 h-6 text-green-600" />
                    <div>
                      <div className="font-medium text-gray-900">Safe Area</div>
                      <div className="text-sm text-gray-600">24/7 Security</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Nearby Places */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  What's Nearby
                </h3>
                <p className="text-gray-600 mb-6">
                  Everything you need is just a short walk or drive away
                </p>
              </div>

              {/* Nearby Places Grid */}
              <div className="grid grid-cols-1 gap-4">
                {nearbyPlaces.map((place, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm`}>
                        <place.icon className={`w-5 h-5 ${getIconColor(place.type)}`} />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{place.name}</div>
                        <div className="text-sm text-gray-600">{place.type}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-gray-900">{place.distance}</div>
                      <div className="text-sm text-gray-600">away</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Location Stats */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">0.8km</div>
                  <div className="text-sm text-gray-600">To Metro</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">12km</div>
                  <div className="text-sm text-gray-600">To Airport</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">5min</div>
                  <div className="text-sm text-gray-600">Walk to Center</div>
                </div>
              </div>
            </div>
          </div>

          {/* Neighborhood Guide */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  About the Neighborhood
                </h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {property.hero.location} is one of Mumbai's most vibrant and sought-after neighborhoods.
                  Known for its artistic community, trendy cafes, and cultural diversity, this area offers
                  the perfect blend of urban convenience and local charm.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">Safe and family-friendly area</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">Excellent public transportation</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">Rich cultural heritage</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  Popular Attractions
                </h4>
                <div className="space-y-3">
                  {['Art Galleries', 'Street Food Markets', 'Historical Sites', 'Shopping Districts'].map((attraction, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <Heart className="w-4 h-4 text-red-500" />
                      <span className="text-gray-700">{attraction}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyLocation; 