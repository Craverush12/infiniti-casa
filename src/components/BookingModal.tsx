import React, { useState, useEffect } from 'react';
import { X, Calendar, Users, MapPin, Star, Shield, CheckCircle, Zap, CreditCard, ArrowRight, ArrowLeft, Loader2, Mail, Phone, MessageCircle, Clock, AlertCircle } from 'lucide-react';
import type { Database } from '../lib/database.types';

type Property = Database['public']['Tables']['properties']['Row'];

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: Property;
  user?: any;
  isAuthenticated?: boolean;
  onBookingSuccess?: (bookingId: string) => void;
}

interface FormErrors {
  checkIn?: string;
  checkOut?: string;
  guests?: string;
  fullName?: string;
  email?: string;
  phone?: string;
}

const BookingModal: React.FC<BookingModalProps> = ({ 
  isOpen, 
  onClose, 
  property, 
  user, 
  isAuthenticated, 
  onBookingSuccess 
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  
  // Form data
  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 2,
    fullName: '',
    email: '',
    phone: '',
    purpose: '',
    specialRequests: ''
  });

  const [bookingTotal, setBookingTotal] = useState<{
    nightlyRate: number;
    totalNights: number;
    subtotal: number;
    serviceFee: number;
    total: number;
  } | null>(null);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentStep(1);
      setError(null);
      setFormErrors({});
      setFormData({
        checkIn: '',
        checkOut: '',
        guests: 2,
        fullName: user?.full_name || '',
        email: '',
        phone: user?.phone || '',
        purpose: '',
        specialRequests: ''
      });
    }
  }, [isOpen, user]);

  // Calculate booking total when dates change
  useEffect(() => {
    if (formData.checkIn && formData.checkOut) {
      calculateBookingTotal();
    }
  }, [formData.checkIn, formData.checkOut, formData.guests]);

  const calculateBookingTotal = () => {
    const checkInDate = new Date(formData.checkIn);
    const checkOutDate = new Date(formData.checkOut);
    const totalNights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (totalNights <= 0) return;
    
    const subtotal = property.price * totalNights;
    const serviceFee = Math.round(subtotal * 0.12); // 12% service fee
    const total = subtotal + serviceFee;
    
    setBookingTotal({
      nightlyRate: property.price,
      totalNights,
      subtotal,
      serviceFee,
      total
    });
  };

  const validateStep1 = (): boolean => {
    const errors: FormErrors = {};
    
    if (!formData.checkIn) {
      errors.checkIn = 'Check-in date is required';
    } else {
      const checkInDate = new Date(formData.checkIn);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (checkInDate < today) {
        errors.checkIn = 'Check-in date cannot be in the past';
      }
    }
    
    if (!formData.checkOut) {
      errors.checkOut = 'Check-out date is required';
    } else if (formData.checkIn) {
      const checkInDate = new Date(formData.checkIn);
      const checkOutDate = new Date(formData.checkOut);
      
      if (checkOutDate <= checkInDate) {
        errors.checkOut = 'Check-out date must be after check-in date';
      }
    }
    
    if (formData.guests < 1) {
      errors.guests = 'At least 1 guest is required';
    } else if (formData.guests > property.guests) {
      errors.guests = `Maximum ${property.guests} guests allowed`;
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateStep2 = (): boolean => {
    const errors: FormErrors = {};
    
    if (!formData.fullName.trim()) {
      errors.fullName = 'Full name is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/\s/g, ''))) {
      errors.phone = 'Please enter a valid phone number';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (formErrors[field as keyof FormErrors]) {
      setFormErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const nextStep = () => {
    setError(null);
    
    if (currentStep === 1) {
      if (!validateStep1()) {
        return;
      }
    }
    
    if (currentStep === 2) {
      if (!validateStep2()) {
        return;
      }
    }
    
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setError(null);
    setFormErrors({});
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleBooking = async () => {
    if (!isAuthenticated) {
      setError('Please sign in to complete your booking');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Simulate booking creation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const bookingId = Math.random().toString(36).substr(2, 9);
      onBookingSuccess?.(bookingId);
      onClose();
      
    } catch (err) {
      setError('Failed to create booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getMinimumCheckOutDate = () => {
    if (!formData.checkIn) return '';
    const checkInDate = new Date(formData.checkIn);
    checkInDate.setDate(checkInDate.getDate() + 1);
    return checkInDate.toISOString().split('T')[0];
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[85vh]">
          {/* Header */}
          <div className="relative bg-gradient-to-r from-rust-500 to-orange-500 text-white p-4">
            <button
              onClick={onClose}
              className="absolute top-3 right-3 p-1.5 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-light">Book Your Stay</h2>
                <p className="text-white/90 text-sm">{property.name}</p>
              </div>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="px-4 py-3 bg-gray-50">
            <div className="flex items-center justify-center space-x-6">
              {['Dates & Guests', 'Guest Details', 'Review & Confirm'].map((step, index) => (
                <div key={index} className="flex items-center">
                  <div className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium ${
                    currentStep > index + 1 
                      ? 'bg-green-500 text-white' 
                      : currentStep === index + 1 
                        ? 'bg-rust-500 text-white' 
                        : 'bg-gray-200 text-gray-600'
                  }`}>
                    {currentStep > index + 1 ? (
                      <CheckCircle className="w-3 h-3" />
                    ) : (
                      <span>{index + 1}</span>
                    )}
                  </div>
                  {index < 2 && (
                    <div className={`w-8 h-0.5 ml-2 ${
                      currentStep > index + 1 ? 'bg-green-500' : 'bg-gray-200'
                    }`}></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[60vh]">
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Dates & Guests</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Check-in Date
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="date"
                          value={formData.checkIn}
                          onChange={(e) => handleInputChange('checkIn', e.target.value)}
                          className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-rust-500 focus:border-transparent ${
                            formErrors.checkIn ? 'border-red-300' : 'border-gray-300'
                          }`}
                          min={new Date().toISOString().split('T')[0]}
                        />
                      </div>
                      {formErrors.checkIn && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {formErrors.checkIn}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Check-out Date
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="date"
                          value={formData.checkOut}
                          onChange={(e) => handleInputChange('checkOut', e.target.value)}
                          className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-rust-500 focus:border-transparent ${
                            formErrors.checkOut ? 'border-red-300' : 'border-gray-300'
                          }`}
                          min={getMinimumCheckOutDate()}
                        />
                      </div>
                      {formErrors.checkOut && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {formErrors.checkOut}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Guests
                    </label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <select
                        value={formData.guests}
                        onChange={(e) => handleInputChange('guests', parseInt(e.target.value))}
                        className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-rust-500 focus:border-transparent ${
                          formErrors.guests ? 'border-red-300' : 'border-gray-300'
                        }`}
                      >
                        {Array.from({ length: property.guests }, (_, i) => i + 1).map(num => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? 'Guest' : 'Guests'}
                          </option>
                        ))}
                      </select>
                    </div>
                    {formErrors.guests && (
                      <p className="text-red-500 text-sm mt-1 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {formErrors.guests}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Guest Information</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        className={`w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-rust-500 focus:border-transparent ${
                          formErrors.fullName ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="Enter your full name"
                      />
                      {formErrors.fullName && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {formErrors.fullName}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-rust-500 focus:border-transparent ${
                            formErrors.email ? 'border-red-300' : 'border-gray-300'
                          }`}
                          placeholder="Enter your email address"
                        />
                      </div>
                      {formErrors.email && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {formErrors.email}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-rust-500 focus:border-transparent ${
                            formErrors.phone ? 'border-red-300' : 'border-gray-300'
                          }`}
                          placeholder="Enter your phone number"
                        />
                      </div>
                      {formErrors.phone && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {formErrors.phone}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Purpose of Stay
                      </label>
                      <textarea
                        value={formData.purpose}
                        onChange={(e) => handleInputChange('purpose', e.target.value)}
                        className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rust-500 focus:border-transparent"
                        placeholder="Business, Leisure, etc. (optional)"
                        rows={2}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Special Requests
                      </label>
                      <textarea
                        value={formData.specialRequests}
                        onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                        className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rust-500 focus:border-transparent"
                        placeholder="Any special requirements or requests (optional)"
                        rows={3}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Review & Confirm</h3>
                  
                  {/* Booking Summary */}
                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <h4 className="font-medium text-gray-900 mb-3">Booking Summary</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Property:</span>
                        <span className="font-medium">{property.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Check-in:</span>
                        <span className="font-medium">{formData.checkIn}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Check-out:</span>
                        <span className="font-medium">{formData.checkOut}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Guests:</span>
                        <span className="font-medium">{formData.guests}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Guest Name:</span>
                        <span className="font-medium">{formData.fullName}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Pricing Breakdown */}
                  {bookingTotal && (
                    <div className="bg-white border rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-3">Pricing Breakdown</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">
                            {formatPrice(bookingTotal.nightlyRate)} × {bookingTotal.totalNights} nights
                          </span>
                          <span>{formatPrice(bookingTotal.subtotal)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Service fee</span>
                          <span>{formatPrice(bookingTotal.serviceFee)}</span>
                        </div>
                        <div className="border-t pt-2">
                          <div className="flex justify-between font-semibold">
                            <span>Total</span>
                            <span>{formatPrice(bookingTotal.total)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Cancellation Policy */}
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-blue-900 mb-1">Cancellation Policy</h4>
                        <p className="text-sm text-blue-700">
                          Free cancellation up to 24 hours before check-in. No refund for cancellations within 24 hours of check-in.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="px-6 pb-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <div className="flex items-center">
                  <AlertCircle className="w-4 h-4 text-red-600 mr-2" />
                  <span className="text-red-700 text-sm">{error}</span>
                </div>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t">
            <div className="flex items-center justify-between">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              
              {currentStep < 3 ? (
                <button
                  onClick={nextStep}
                  className="flex items-center space-x-2 px-6 py-2 bg-rust-500 hover:bg-rust-600 text-white rounded-lg font-medium transition-colors"
                >
                  <span>Next</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleBooking}
                  disabled={loading || !isAuthenticated}
                  className="flex items-center space-x-2 px-6 py-2 bg-rust-500 hover:bg-rust-600 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4" />
                      <span>Confirm Booking</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingModal; 