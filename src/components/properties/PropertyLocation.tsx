import React from 'react';
import { MapPin, Navigation, Bus, Train, Plane, Clock, Star, Heart, Camera, Coffee, Utensils, ShoppingBag, Award } from 'lucide-react';
import type { PropertyDetailData } from '../../data/propertyDetails';

interface PropertyLocationProps {
  property: PropertyDetailData;
}

const PropertyLocation: React.FC<PropertyLocationProps> = ({ property }) => {
  const getAttractionIcon = (attraction: string) => {
    if (attraction.includes('Shopping') || attraction.includes('Causeway')) return ShoppingBag;
    if (attraction.includes('Beach') || attraction.includes('Promenade')) return Camera;
    if (attraction.includes('Fort') || attraction.includes('Gateway')) return Award;
    if (attraction.includes('Palace') || attraction.includes('Taj')) return Award;
    if (attraction.includes('Business') || attraction.includes('District')) return Award;
    if (attraction.includes('Phoenix') || attraction.includes('High Street')) return ShoppingBag;
    return MapPin;
  };

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 via-sage-50 to-cream-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Location & Neighborhood
          </h2>
          <p className="text-lg text-gray-600">
            Discover what makes {property.location.neighborhood} special
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Location Details */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center space-x-3 mb-6">
                <MapPin className="w-6 h-6 text-blue-600" />
                <h3 className="text-2xl font-bold text-gray-900">
                  {property.location.neighborhood}
                </h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Address</h4>
                  <p className="text-gray-600">{property.location.address}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Neighborhood</h4>
                  <p className="text-gray-600">
                    Located in the heart of {property.location.neighborhood}, this property offers easy access to all the best attractions and amenities the area has to offer.
                  </p>
                </div>
              </div>
            </div>

            {/* Transportation */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Getting Around</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Plane className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="font-semibold text-gray-900">Airport</div>
                    <div className="text-gray-600">{property.location.transportation.airport_distance} away</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Train className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="font-semibold text-gray-900">Railway Station</div>
                    <div className="text-gray-600">{property.location.transportation.railway_station}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Bus className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="font-semibold text-gray-900">Metro Station</div>
                    <div className="text-gray-600">{property.location.transportation.metro_station}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Nearby Attractions */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Nearby Attractions</h3>
              <div className="grid gap-4">
                {property.location.nearbyAttractions.map((attraction, index) => {
                  const Icon = getAttractionIcon(attraction);
                  return (
                    <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Icon className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">{attraction}</div>
                        <div className="text-sm text-gray-600">Walking distance</div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-sm text-gray-600">4.5</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Neighborhood Highlights */}
            <div className="bg-gradient-to-r from-rust-500 to-rust-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Why {property.location.neighborhood}?</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Heart className="w-5 h-5" />
                  <span>Vibrant local culture and community</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Coffee className="w-5 h-5" />
                  <span>Excellent dining and entertainment options</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Camera className="w-5 h-5" />
                  <span>Beautiful landmarks and photo opportunities</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Navigation className="w-5 h-5" />
                  <span>Easy access to public transportation</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Map Placeholder */}
        <div className="mt-12 bg-white rounded-2xl p-8 shadow-lg">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Location Map</h3>
            <div className="bg-gray-200 rounded-xl h-64 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Interactive map coming soon</p>
                <p className="text-sm text-gray-500">Exact location: {property.location.address}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyLocation; 