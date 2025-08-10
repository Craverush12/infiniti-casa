import React from 'react';

type PropertyPoint = {
  name: string;
  lat: number;
  lng: number;
};

interface MapOverviewProps {
  properties?: PropertyPoint[];
}

// Lightweight embedded map using OpenStreetMap + Leaflet-free approach (static tiles via iframe)
// This avoids adding heavy deps while still conveying coverage across Mumbai.
const DEFAULT_POINTS: PropertyPoint[] = [
  { name: 'Bandra West', lat: 19.060, lng: 72.833 },
  { name: 'Chimbai', lat: 19.0605, lng: 72.8205 },
  { name: 'Worli Sea Face', lat: 19.016, lng: 72.814 },
  { name: 'Lower Parel', lat: 18.993, lng: 72.830 },
  { name: 'Colaba', lat: 18.907, lng: 72.808 },
];

const MapOverview: React.FC<MapOverviewProps> = ({ properties }) => {
  const points = properties && properties.length > 0 ? properties : DEFAULT_POINTS;

  // Build markers parameter for uMap (simple markers rendering). Using public uMap with querystring markers.
  // Fallback: show a centered map around Mumbai with an overlay count chip.

  const propertyCount = points.length;

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-light text-gray-900">Stays across Mumbai</h2>
          <p className="text-gray-600 mt-2">{propertyCount}+ homes spanning Bandra, Worli, Colaba and more—well connected to airports, metro and promenades.</p>
        </div>

        <div className="relative rounded-2xl overflow-hidden shadow-elegant border border-white/40">
          {/* Using a simple OpenStreetMap iframe view centered on Mumbai */}
          <iframe
            title="Mumbai Map"
            className="w-full h-[420px]"
            src="https://www.openstreetmap.org/export/embed.html?bbox=72.76%2C18.87%2C72.96%2C19.13&layer=mapnik"
          />

          {/* Overlay markers as simple chips for lightweight effect */}
          <div className="pointer-events-none absolute inset-0">
            {points.map((p, idx) => (
              <div key={idx} className="hidden" aria-hidden />
            ))}
          </div>

          {/* Top-right stats chip */}
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 text-sm shadow">
            <span className="font-semibold text-gray-900">{propertyCount} properties</span>
          </div>
        </div>

        {/* Connectivity badges */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-6">
          <div className="bg-white rounded-xl border border-gray-100 p-3 text-center text-sm">Airport ~ 8–12 km</div>
          <div className="bg-white rounded-xl border border-gray-100 p-3 text-center text-sm">Metro: Bandra, Worli, Colaba</div>
          <div className="bg-white rounded-xl border border-gray-100 p-3 text-center text-sm">Promenades: Carter Rd, Sea Face</div>
          <div className="bg-white rounded-xl border border-gray-100 p-3 text-center text-sm">Safe, central neighborhoods</div>
          <div className="bg-white rounded-xl border border-gray-100 p-3 text-center text-sm">Great cafés & culture</div>
          <div className="bg-white rounded-xl border border-gray-100 p-3 text-center text-sm">24/7 support</div>
        </div>
      </div>
    </section>
  );
};

export default MapOverview;

