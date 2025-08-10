import React from 'react';
import { MapPin, Phone, Mail, Globe, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-cream-50 via-white to-cream-100 border-t border-cream-200">
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="glass-orb glass-orb-1" />
        <div className="glass-orb glass-orb-2" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8">
          {/* Brand */}
          <div className="lg:col-span-5 sm:col-span-2">
            <h3 className="text-2xl font-editorial text-gray-900 tracking-tight mb-3">Infiniti Casa</h3>
            <p className="text-gray-600 max-w-md mb-6">
              Boutique stays in Mumbai crafted with warmth, artistry, and comfort. Designed to feel like home.
            </p>
            <form className="flex flex-col sm:flex-row gap-2 max-w-md" aria-label="Newsletter signup">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 input-elegant"
                aria-label="Email address"
              />
              <button type="submit" className="btn-golden-shine btn-glass-primary rounded-lg px-5 py-3 whitespace-nowrap">
                Subscribe
              </button>
            </form>
            <div className="flex items-center space-x-5 text-gray-600 mt-6">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-primary-500" />
                <span className="text-sm">Mumbai, India</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-primary-500" />
                <span className="text-sm">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-primary-500" />
                <span className="text-sm">hello@infiniticasa.com</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="lg:col-span-3 sm:col-span-1">
            <h4 className="text-sm font-semibold tracking-wide text-gray-900 mb-4">Explore</h4>
            <ul className="space-y-3 text-gray-600">
              <li><a href="#" className="hover:text-primary-600 transition-colors">Properties</a></li>
              <li><a href="#" className="hover:text-primary-600 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-primary-600 transition-colors">Neighborhood Guide</a></li>
              <li><a href="#" className="hover:text-primary-600 transition-colors">Stories</a></li>
            </ul>
          </div>

          <div className="lg:col-span-2 sm:col-span-1">
            <h4 className="text-sm font-semibold tracking-wide text-gray-900 mb-4">Support</h4>
            <ul className="space-y-3 text-gray-600">
              <li><a href="#" className="hover:text-primary-600 transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-primary-600 transition-colors">Booking Guide</a></li>
              <li><a href="#" className="hover:text-primary-600 transition-colors">Safety</a></li>
              <li><a href="#" className="hover:text-primary-600 transition-colors">Terms</a></li>
            </ul>
          </div>

          <div className="lg:col-span-2 sm:col-span-2">
            <h4 className="text-sm font-semibold tracking-wide text-gray-900 mb-4">Connect</h4>
            <div className="flex items-center space-x-4">
              <a href="#" className="glass-button p-2 rounded-lg"><Globe className="w-4 h-4" /></a>
              <a href="#" className="glass-button p-2 rounded-lg"><Mail className="w-4 h-4" /></a>
              <a href="#" className="glass-button p-2 rounded-lg"><Heart className="w-4 h-4" /></a>
              <a href="https://wa.me/919876543210" className="btn-glass-primary rounded-lg px-3 py-2 text-sm">WhatsApp</a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-cream-200 flex flex-col sm:flex-row justify-between items-center text-gray-500 text-sm">
          <p>© 2024 Infiniti Casa. All rights reserved.</p>
          <p className="mt-3 sm:mt-0">Designed for comfort • Crafted with care</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 