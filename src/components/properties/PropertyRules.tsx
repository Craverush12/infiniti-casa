import React from 'react';
import { 
  Shield, 
  Clock, 
  Users, 
  PawPrint, 
  XCircle, 
  Music,
  Camera,
  Lock,
  AlertTriangle,
  CheckCircle,
  Info,
  Heart,
  Star,
  Award,
  Sparkles
} from 'lucide-react';
import type { PropertyDetailData } from '../../data/propertyDetails';

interface PropertyRulesProps {
  property: PropertyDetailData;
  themeHex?: string;
}

const PropertyRules: React.FC<PropertyRulesProps> = ({ property, themeHex = '#0f766e' }) => {
  const rules = [
    { 
      icon: Clock, 
      title: 'Check-in/Check-out', 
      description: 'Check-in: 3:00 PM, Check-out: 11:00 AM',
      type: 'info',
      color: 'blue'
    },
    { 
      icon: Users, 
      title: 'Guest Limit', 
      description: `Maximum guests allowed`,
      type: 'info',
      color: 'green'
    },
    { 
      icon: PawPrint, 
      title: 'Pet Policy', 
      description: 'Pets allowed with prior approval',
      type: 'allowed',
      color: 'green'
    },
    { 
      icon: XCircle, 
      title: 'Smoking', 
      description: 'No smoking inside the property',
      type: 'not-allowed',
      color: 'red'
    },
    { 
      icon: Music, 
      title: 'Quiet Hours', 
      description: '10:00 PM - 8:00 AM',
      type: 'info',
      color: 'blue'
    },
    { 
      icon: Camera, 
      title: 'Security Cameras', 
      description: 'Exterior cameras for safety',
      type: 'info',
      color: 'purple'
    }
  ];

  const securityFeatures = [
    { icon: Lock, title: 'Smart Lock', description: 'Keyless entry system' },
    { icon: Shield, title: '24/7 Security', description: 'Building security staff' },
    { icon: Camera, title: 'CCTV Cameras', description: 'Exterior surveillance' },
    { icon: AlertTriangle, title: 'Fire Safety', description: 'Smoke detectors & extinguishers' }
  ];

  const getIconColor = (color: string) => {
    const colors = {
      blue: themeHex,
      green: 'text-green-600',
      red: 'text-red-600',
      purple: 'text-purple-600',
      orange: 'text-orange-600'
    };
    return colors[color as keyof typeof colors] || 'text-gray-600';
  };

  const getBgColor = (color: string) => {
    const colors = {
      blue: `${themeHex}11`,
      green: 'bg-green-50',
      red: 'bg-red-50',
      purple: 'bg-purple-50',
      orange: 'bg-orange-50'
    };
    return colors[color as keyof typeof colors] || 'bg-gray-50';
  };

  return (
    <section className="py-16 bg-gradient-to-br from-cream-50 via-white to-sage-50 text-gray-900">
      <div className="max-w-6xl mx-auto px-6">
        <div className="space-y-8">
          {/* Section Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-2" style={{ color: themeHex }}>
              <Shield className="w-5 h-5" />
              <span className="text-sm font-medium tracking-wide">House Rules & Security</span>
            </div>
            <h2 className="text-3xl font-editorial font-light text-gray-900">
              Important Information
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Please review our house rules and security measures for a safe and enjoyable stay
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* House Rules */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-editorial font-light mb-4 text-gray-900">
                  House Rules
                </h3>
                <p className="text-gray-600 mb-6">
                  To ensure everyone has a great experience, please follow these guidelines
                </p>
              </div>

              <div className="grid gap-4">
                {rules.map((rule, index) => (
                  <div key={index} className="p-6 rounded-xl bg-white border backdrop-blur" style={{ borderColor: `${themeHex}22` }}>
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${themeHex}15` }}>
                        <rule.icon className="w-5 h-5" style={{ color: themeHex }} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-medium text-gray-900">{rule.title}</h4>
                          {rule.type === 'allowed' && (
                            <CheckCircle className="w-4 h-4" style={{ color: themeHex }} />
                          )}
                          {rule.type === 'not-allowed' && (
                            <XCircle className="w-4 h-4" style={{ color: themeHex }} />
                          )}
                          {rule.type === 'info' && (
                            <Info className="w-4 h-4" style={{ color: themeHex }} />
                          )}
                        </div>
                        <p className="text-gray-600">{rule.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Security Features */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-editorial font-light mb-4 text-gray-900">
                  Security & Safety
                </h3>
                <p className="text-gray-600 mb-6">
                  Your safety is our top priority with comprehensive security measures
                </p>
              </div>

              <div className="grid gap-4">
                {securityFeatures.map((feature, index) => (
                  <div key={index} className="p-6 rounded-xl bg-white border backdrop-blur" style={{ borderColor: `${themeHex}22` }}>
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${themeHex}15` }}>
                        <feature.icon className="w-5 h-5" style={{ color: themeHex }} />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">{feature.title}</h4>
                        <p className="text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Safety Stats */}
              <div className="rounded-xl p-6 bg-white border backdrop-blur" style={{ borderColor: `${themeHex}22` }}>
                <h4 className="text-lg font-medium text-gray-900 mb-4">Safety Statistics</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-semibold" style={{ color: themeHex }}>100%</div>
                    <div className="text-sm text-gray-500">Safe Area</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-semibold" style={{ color: themeHex }}>24/7</div>
                    <div className="text-sm text-gray-500">Security</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="rounded-2xl p-8 border border-white/10 bg-white/5 backdrop-blur">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-editorial font-light mb-4 text-white">
                  What to Expect
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary-300" />
                    <span className="text-white/80">Professional cleaning between stays</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary-300" />
                    <span className="text-white/80">Contactless check-in available</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary-300" />
                    <span className="text-white/80">24/7 host support</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary-300" />
                    <span className="text-white/80">Emergency contact information provided</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-editorial font-light mb-4 text-white">
                  Cancellation Policy
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-primary-300" />
                    <span className="text-white/80">Free cancellation up to 24 hours before check-in</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <AlertTriangle className="w-5 h-5 text-primary-300" />
                    <span className="text-white/80">50% refund for cancellations within 24 hours</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <XCircle className="w-5 h-5 text-primary-300" />
                    <span className="text-white/80">No refund for same-day cancellations</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div className="text-sm text-white">Verified Property</div>
              <div className="text-xs text-white/70">Safety Checked</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Lock className="w-6 h-6 text-white" />
              </div>
              <div className="text-sm text-white">Secure Booking</div>
              <div className="text-xs text-white/70">100% Safe</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div className="text-sm text-white">Premium Quality</div>
              <div className="text-xs text-white/70">High Standards</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div className="text-sm text-white">Guest Favorite</div>
              <div className="text-xs text-white/70">Highly Rated</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyRules; 