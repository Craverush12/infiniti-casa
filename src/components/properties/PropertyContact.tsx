import React, { useState } from 'react';
import { 
  MessageCircle, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Users,
  Heart,
  Share2,
  Star,
  Award,
  CheckCircle,
  Zap,
  Shield,
  Sparkles
} from 'lucide-react';
import type { PropertyDetailData } from '../../data/propertyDetails';

interface PropertyContactProps {
  property: PropertyDetailData;
  onBookNow?: () => void;
}

const PropertyContact: React.FC<PropertyContactProps> = ({ property, onBookNow }) => {
  const [showContactForm, setShowContactForm] = useState(false);

  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString()}`;
  };

  return (
    <>
      {/* Main Contact Section */}
      <section className="py-16 bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="space-y-8">
            {/* Section Header */}
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center space-x-2 text-primary-400">
                <MessageCircle className="w-5 h-5" />
                <span className="text-sm font-medium tracking-wide">Contact</span>
              </div>
              <h2 className="text-3xl font-editorial font-light">
                Get in touch
              </h2>
              <p className="text-lg text-white/80 max-w-2xl mx-auto">
                Have questions? We're here to help you plan your perfect stay
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-editorial font-light mb-4">
                    Contact information
                  </h3>
                  <p className="text-white/80 mb-6">
                    Reach out to us through any of these channels
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 bg-white/5 backdrop-blur rounded-xl border border-white/10">
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-medium">Phone</div>
                      <div className="text-white/80">+91 98765 43210</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-4 bg-white/5 backdrop-blur rounded-xl border border-white/10">
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                      <MessageCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-medium">WhatsApp</div>
                      <div className="text-white/80">+91 98765 43210</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-4 bg-white/5 backdrop-blur rounded-xl border border-white/10">
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-medium">Email</div>
                      <div className="text-white/80">hello@infiniticasa.com</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-4 bg-white/5 backdrop-blur rounded-xl border border-white/10">
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-medium">Response Time</div>
                      <div className="text-white/80">Usually responds within 1 hour</div>
                    </div>
                  </div>
                </div>

                {/* Host Information */}
                <div className="rounded-xl p-6 border border-white/10 bg-white/5 backdrop-blur">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {property.host.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium text-white">{property.host.name}</div>
                      <div className="text-white/80">Superhost</div>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm text-white/80">
                    <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-primary-300" />
                      <span>{property.host.responseRate}% response rate</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-primary-300" />
                      <span>Responds within {property.host.responseTime}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-editorial font-light mb-4">
                    Quick actions
                  </h3>
                  <p className="text-white/80 mb-6">
                    Book instantly or get in touch for personalized assistance
                  </p>
                </div>

                <div className="space-y-4">
                  <button 
                    onClick={onBookNow}
                    className="w-full bg-primary-500 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:bg-primary-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    Book Now - {formatPrice(property.hero.price)}/night
                  </button>

                  <button className="w-full bg-white/10 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl">
                    <div className="flex items-center justify-center space-x-2">
                      <MessageCircle className="w-5 h-5" />
                      <span>WhatsApp Us</span>
                    </div>
                  </button>

                  <button className="w-full border border-white/10 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:bg-white/10 transition-all duration-300">
                    <div className="flex items-center justify-center space-x-2">
                      <Phone className="w-5 h-5" />
                      <span>Call Host</span>
                    </div>
                  </button>

                  <div className="flex space-x-3">
                    <button className="flex-1 flex items-center justify-center space-x-2 py-3 px-4 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-300">
                      <Heart className="w-5 h-5" />
                      <span className="font-medium">Save</span>
                    </button>
                    <button className="flex-1 flex items-center justify-center space-x-2 py-3 px-4 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-300">
                      <Share2 className="w-5 h-5" />
                      <span className="font-medium">Share</span>
                    </button>
                  </div>
                </div>

                {/* Trust Indicators */}
                 <div className="border border-white/10 rounded-xl p-6 bg-white/5 backdrop-blur">
                  <h4 className="font-medium text-white mb-4">Why book with us?</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-primary-300" />
                      <span className="text-sm text-white/80">Instant confirmation</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Shield className="w-5 h-5 text-primary-300" />
                      <span className="text-sm text-white/80">Secure booking</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Zap className="w-5 h-5 text-primary-300" />
                      <span className="text-sm text-white/80">No booking fees</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Award className="w-5 h-5 text-primary-300" />
                      <span className="text-sm text-white/80">Premium quality</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Action Buttons for Mobile */}
      <div className="fixed bottom-6 left-6 right-6 z-50 md:hidden">
        <div className="flex space-x-3">
          <button 
            onClick={onBookNow}
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold shadow-lg"
          >
            Book Now
          </button>
          <button className="bg-green-600 text-white p-4 rounded-xl shadow-lg">
            <MessageCircle className="w-6 h-6" />
          </button>
          <button className="bg-white text-gray-700 p-4 rounded-xl shadow-lg border border-gray-200">
            <Phone className="w-6 h-6" />
          </button>
        </div>
      </div>
    </>
  );
};

export default PropertyContact; 