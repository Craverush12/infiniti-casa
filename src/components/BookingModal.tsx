import React, { useState, useEffect } from 'react';
import { X, Calendar, Users, MapPin, Star, Shield, CheckCircle, Zap, CreditCard, ArrowRight, ArrowLeft, Loader2, Mail, Phone, MessageCircle, Clock } from 'lucide-react';
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

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep === 1) {
      if (!formData.checkIn || !formData.checkOut) {
        setError('Please select check-in and check-out dates');
        return;
      }
      if (formData.guests < 1) {
        setError('Please select at least 1 guest');
        return;
      }
    }
    
    if (currentStep === 2) {
      if (!formData.fullName || !formData.email || !formData.phone) {
        setError('Please fill in all required fields');
        return;
      }
    }
    
    setError(null);
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setError(null);
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
                     <div className={`w-8 h-0.5 mx-1.5 ${
                       currentStep > index + 1 ? 'bg-green-500' : 'bg-gray-200'
                     }`} />
                   )}
                 </div>
               ))}
             </div>
           </div>

                     {/* Error Message */}
           {error && (
             <div className="mx-4 mt-3 p-2.5 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
               <X className="w-3 h-3 text-red-500" />
               <span className="text-red-700 text-xs">{error}</span>
             </div>
           )}

                                                       {/* Content */}
                  <div className="p-3 sm:p-4 overflow-y-auto max-h-[calc(85vh-180px)]">
                                                               {currentStep === 1 && (
                      <div className="space-y-3">
                 {/* Date Selection */}
                 <div className="grid grid-cols-2 gap-3">
                   <div>
                                           <label className="block text-xs font-medium text-gray-700 mb-1.5">
                        Check-in Date
                      </label>
                     <input
                       type="date"
                       value={formData.checkIn}
                       onChange={(e) => handleInputChange('checkIn', e.target.value)}
                       min={new Date().toISOString().split('T')[0]}
                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rust-500 focus:border-transparent transition-all duration-200 text-sm"
                     />
                   </div>
                   <div>
                                           <label className="block text-xs font-medium text-gray-700 mb-1.5">
                        Check-out Date
                      </label>
                     <input
                       type="date"
                       value={formData.checkOut}
                       onChange={(e) => handleInputChange('checkOut', e.target.value)}
                       min={formData.checkIn || new Date().toISOString().split('T')[0]}
                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rust-500 focus:border-transparent transition-all duration-200 text-sm"
                     />
                   </div>
                 </div>

                                                                               {/* Guest Selection */}
                        <div>
                                                     <label className="block text-xs font-medium text-gray-700 mb-1.5">
                             Number of Guests
                           </label>
                          <div className="bg-gray-50 rounded-lg p-2.5">
                     <div className="flex items-center justify-between">
                       <div className="flex items-center space-x-2">
                         <button
                           onClick={() => handleInputChange('guests', Math.max(1, formData.guests - 1))}
                           className="w-8 h-8 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center hover:border-rust-500 hover:bg-rust-50 transition-all duration-200 text-gray-600 hover:text-rust-600 font-bold text-base shadow-sm"
                         >
                           -
                         </button>
                         <div className="text-center">
                           <div className="text-xl font-bold text-gray-900">{formData.guests}</div>
                           <div className="text-xs text-gray-500">Guest{formData.guests !== 1 ? 's' : ''}</div>
                         </div>
                         <button
                           onClick={() => handleInputChange('guests', formData.guests + 1)}
                           className="w-8 h-8 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center hover:border-rust-500 hover:bg-rust-50 transition-all duration-200 text-gray-600 hover:text-rust-600 font-bold text-base shadow-sm"
                         >
                           +
                         </button>
                       </div>
                     </div>
                   </div>
                 </div>

                                                                               {/* Property Info */}
                        <div className="bg-gradient-to-r from-rust-50 to-orange-50 rounded-lg p-2.5 border border-rust-100">
                   <div className="flex items-center space-x-2 mb-2">
                     <MapPin className="w-4 h-4 text-rust-600" />
                     <span className="font-medium text-gray-900 text-sm">{property.location}</span>
                   </div>
                   <div className="flex items-center space-x-3 text-xs text-gray-600">
                     <div className="flex items-center space-x-1">
                       <Star className="w-3 h-3 text-yellow-400 fill-current" />
                       <span>4.9 (42 reviews)</span>
                     </div>
                     <div className="flex items-center space-x-1">
                       <Shield className="w-3 h-3 text-green-500" />
                       <span>Verified Host</span>
                     </div>
                   </div>
                 </div>
              </div>
            )}

                                                               {currentStep === 2 && (
                      <div className="space-y-3">
                 {/* Guest Details */}
                 <div className="grid grid-cols-2 gap-3">
                   <div>
                                           <label className="block text-xs font-medium text-gray-700 mb-1.5">
                        Full Name *
                      </label>
                     <input
                       type="text"
                       value={formData.fullName}
                       onChange={(e) => handleInputChange('fullName', e.target.value)}
                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rust-500 focus:border-transparent transition-all duration-200 text-sm"
                       placeholder="Enter your full name"
                       required
                     />
                   </div>
                   <div>
                                           <label className="block text-xs font-medium text-gray-700 mb-1.5">
                        Email Address *
                      </label>
                     <input
                       type="email"
                       value={formData.email}
                       onChange={(e) => handleInputChange('email', e.target.value)}
                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rust-500 focus:border-transparent transition-all duration-200 text-sm"
                       placeholder="your.email@example.com"
                       required
                     />
                   </div>
                 </div>

                                 <div>
                                       <label className="block text-xs font-medium text-gray-700 mb-1.5">
                      Phone Number *
                    </label>
                   <input
                     type="tel"
                     value={formData.phone}
                     onChange={(e) => handleInputChange('phone', e.target.value)}
                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rust-500 focus:border-transparent transition-all duration-200 text-sm"
                     placeholder="+91 98765 43210"
                     required
                   />
                 </div>

                                 <div>
                                       <label className="block text-xs font-medium text-gray-700 mb-1.5">
                      Purpose of Stay
                    </label>
                   <select
                     value={formData.purpose}
                     onChange={(e) => handleInputChange('purpose', e.target.value)}
                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rust-500 focus:border-transparent transition-all duration-200 text-sm"
                   >
                     <option value="">Select purpose</option>
                     <option value="leisure">🏖️ Leisure/Vacation</option>
                     <option value="business">💼 Business</option>
                     <option value="family">👨‍👩‍👧‍👦 Family Visit</option>
                     <option value="romantic">💕 Romantic Getaway</option>
                     <option value="other">✨ Other</option>
                   </select>
                 </div>

                                 <div>
                                       <label className="block text-xs font-medium text-gray-700 mb-1.5">
                      Special Requests
                    </label>
                   <textarea
                     value={formData.specialRequests}
                     onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                     rows={2}
                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rust-500 focus:border-transparent transition-all duration-200 resize-none text-sm"
                     placeholder="Any special requests, dietary requirements, or accessibility needs..."
                   />
                 </div>
              </div>
            )}

                                                               {currentStep === 3 && (
                      <div className="space-y-3">
                 {/* Booking Summary */}
                 <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
                   <h4 className="font-semibold text-gray-900 mb-3 flex items-center text-sm">
                     <Calendar className="w-4 h-4 mr-1.5 text-blue-600" />
                     Booking Summary
                   </h4>
                   <div className="space-y-2 text-xs">
                                         <div className="flex justify-between items-center py-1.5 border-b border-blue-100">
                       <span className="text-gray-600 flex items-center">
                         <MapPin className="w-3 h-3 mr-1.5 text-blue-500" />
                         Check-in:
                       </span>
                       <span className="font-medium text-gray-900 text-xs">{new Date(formData.checkIn).toLocaleDateString()} at 2:00 PM</span>
                     </div>
                     <div className="flex justify-between items-center py-1.5 border-b border-blue-100">
                       <span className="text-gray-600 flex items-center">
                         <MapPin className="w-3 h-3 mr-1.5 text-blue-500" />
                         Check-out:
                       </span>
                       <span className="font-medium text-gray-900 text-xs">{new Date(formData.checkOut).toLocaleDateString()} at 11:00 AM</span>
                     </div>
                     <div className="flex justify-between items-center py-1.5 border-b border-blue-100">
                       <span className="text-gray-600 flex items-center">
                         <Users className="w-3 h-3 mr-1.5 text-blue-500" />
                         Guests:
                       </span>
                       <span className="font-medium text-gray-900 text-xs">{formData.guests} guest{formData.guests !== 1 ? 's' : ''}</span>
                     </div>
                     <div className="flex justify-between items-center py-1.5">
                       <span className="text-gray-600 flex items-center">
                         <Clock className="w-3 h-3 mr-1.5 text-blue-500" />
                         Duration:
                       </span>
                       <span className="font-medium text-gray-900 text-xs">{bookingTotal?.totalNights || 0} night{(bookingTotal?.totalNights || 0) !== 1 ? 's' : ''}</span>
                     </div>
                  </div>
                </div>

                                 {/* Price Breakdown */}
                 {bookingTotal && (
                   <div className="bg-gray-50 rounded-lg p-4">
                     <h4 className="font-semibold text-gray-900 mb-3 text-sm">Price Breakdown</h4>
                     <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-600">{formatPrice(bookingTotal.nightlyRate)} × {bookingTotal.totalNights} nights</span>
                        <span className="font-medium">{formatPrice(bookingTotal.subtotal)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Service fee</span>
                        <span className="font-medium">{formatPrice(bookingTotal.serviceFee)}</span>
                      </div>
                                             <div className="border-t border-gray-300 pt-2 flex justify-between font-semibold text-sm">
                         <span>Total</span>
                         <span>{formatPrice(bookingTotal.total)}</span>
                       </div>
                    </div>
                  </div>
                )}

                                 {/* Verification Notice */}
                 <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                   <div className="flex items-start space-x-2">
                     <Shield className="w-4 h-4 text-blue-600 mt-0.5" />
                     <div>
                       <h4 className="font-medium text-blue-900 mb-1 text-sm">Verification Required</h4>
                       <p className="text-blue-700 text-xs">
                         Your booking will be verified after payment. We'll contact you within 2 hours to confirm your stay.
                       </p>
                     </div>
                   </div>
                 </div>
              </div>
            )}

                                                               {/* Navigation Buttons */}
                    <div className="flex justify-between mt-4 pt-3 border-t border-gray-200">
               <button
                 onClick={prevStep}
                 disabled={currentStep === 1}
                 className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 rounded-lg hover:bg-gray-100 text-sm"
               >
                 <ArrowLeft className="w-3 h-3" />
                 <span className="font-medium">Previous</span>
               </button>

                             {currentStep < 3 ? (
                 <button
                   onClick={nextStep}
                   disabled={loading}
                   className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-rust-500 to-rust-600 text-white rounded-lg hover:from-rust-600 hover:to-rust-700 transition-all duration-200 disabled:opacity-50 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 text-sm"
                 >
                   <span className="font-medium">Continue</span>
                   <ArrowRight className="w-3 h-3" />
                 </button>
               ) : (
                 <button
                   onClick={handleBooking}
                   disabled={loading || !isAuthenticated}
                   className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 disabled:opacity-50 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 text-sm"
                 >
                   {loading ? (
                     <>
                       <Loader2 className="w-3 h-3 animate-spin" />
                       <span className="font-medium">Processing...</span>
                     </>
                   ) : (
                     <>
                       <CreditCard className="w-3 h-3" />
                       <span className="font-medium">Complete Booking</span>
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