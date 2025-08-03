import React from 'react';
import { Shield, Star, Users, Clock, Award, CheckCircle, Verified } from 'lucide-react';

interface TrustIndicatorsProps {
  rating: number;
  reviewsCount: number;
  responseRate: number;
  responseTime: string;
  isSuperhost: boolean;
  verifiedHost: boolean;
  instantBookable?: boolean;
  cancellationPolicy?: string;
}

const TrustIndicators: React.FC<TrustIndicatorsProps> = ({
  rating,
  reviewsCount,
  responseRate,
  responseTime,
  isSuperhost,
  verifiedHost,
  instantBookable = false,
  cancellationPolicy = "Flexible"
}) => {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-orange-200/50">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">Trust & Safety</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Rating */}
        <div className="text-center p-3 bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg">
          <div className="flex items-center justify-center mb-2">
            <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
            <span className="ml-1 font-semibold text-slate-900">{rating}</span>
          </div>
          <p className="text-xs text-slate-600">{reviewsCount} reviews</p>
        </div>

        {/* Response Rate */}
        <div className="text-center p-3 bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg">
          <div className="flex items-center justify-center mb-2">
            <Clock className="w-5 h-5 text-orange-600" />
            <span className="ml-1 font-semibold text-slate-900">{responseRate}%</span>
          </div>
          <p className="text-xs text-slate-600">Response rate</p>
        </div>

        {/* Response Time */}
        <div className="text-center p-3 bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg">
          <div className="flex items-center justify-center mb-2">
            <Users className="w-5 h-5 text-orange-600" />
            <span className="ml-1 font-semibold text-slate-900">{responseTime}</span>
          </div>
          <p className="text-xs text-slate-600">Response time</p>
        </div>

        {/* Cancellation */}
        <div className="text-center p-3 bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg">
          <div className="flex items-center justify-center mb-2">
            <Shield className="w-5 h-5 text-orange-600" />
            <span className="ml-1 font-semibold text-slate-900">{cancellationPolicy}</span>
          </div>
          <p className="text-xs text-slate-600">Cancellation</p>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="mt-6 flex flex-wrap gap-3">
        {isSuperhost && (
          <div className="flex items-center space-x-2 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 px-3 py-2 rounded-full text-sm font-medium">
            <Award className="w-4 h-4" />
            <span>Superhost</span>
          </div>
        )}
        
        {verifiedHost && (
          <div className="flex items-center space-x-2 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 px-3 py-2 rounded-full text-sm font-medium">
            <Verified className="w-4 h-4" />
            <span>Verified Host</span>
          </div>
        )}
        
        {instantBookable && (
          <div className="flex items-center space-x-2 bg-gradient-to-r from-rust-100 to-rust-200 text-rust-800 px-3 py-2 rounded-full text-sm font-medium">
            <CheckCircle className="w-4 h-4" />
            <span>Instant Book</span>
          </div>
        )}
      </div>

      {/* Trust Message */}
      <div className="mt-6 p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg border border-orange-200/50">
        <div className="flex items-start space-x-3">
          <Shield className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-slate-900 mb-1">Safe & Secure Booking</h4>
            <p className="text-sm text-slate-600">
              Your payment is protected by our secure booking system. Free cancellation up to 24 hours before check-in.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustIndicators; 