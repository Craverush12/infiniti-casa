import React, { useState } from 'react';
import { Calendar, Users, CreditCard, CheckCircle, ArrowRight } from 'lucide-react';

interface SimplifiedBookingProps {
  property: {
    name: string;
    price: number;
    basePrice: number;
    cleaningFee: number;
    serviceFee: number;
    totalPerNight: number;
  };
  onBookingSuccess?: (bookingId: string) => void;
}

const SimplifiedBooking: React.FC<SimplifiedBookingProps> = ({ property, onBookingSuccess }) => {
  const [step, setStep] = useState(1);
  const [guests, setGuests] = useState(2);
  const [nights, setNights] = useState(1);

  const totalPrice = property.totalPerNight * nights;

  const steps = [
    { id: 1, title: 'Select Dates', icon: Calendar },
    { id: 2, title: 'Choose Guests', icon: Users },
    { id: 3, title: 'Confirm Booking', icon: CreditCard }
  ];

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Simulate booking success
      const bookingId = `BK-${Date.now()}`;
      onBookingSuccess?.(bookingId);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-orange-200/50">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((stepItem, index) => (
            <div key={stepItem.id} className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                step >= stepItem.id 
                  ? 'bg-gradient-to-r from-orange-500 to-amber-600 text-white' 
                  : 'bg-slate-200 text-slate-600'
              }`}>
                {step > stepItem.id ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <stepItem.icon className="w-5 h-5" />
                )}
              </div>
              {index < steps.length - 1 && (
                <div className={`w-16 h-1 mx-2 ${
                  step > stepItem.id ? 'bg-orange-500' : 'bg-slate-200'
                }`} />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2">
          {steps.map((stepItem) => (
            <span key={stepItem.id} className={`text-sm ${
              step >= stepItem.id ? 'text-orange-600 font-medium' : 'text-slate-500'
            }`}>
              {stepItem.title}
            </span>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="mb-8">
        {step === 1 && (
          <div className="text-center">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">When are you traveling?</h3>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-left">
                <label className="block text-sm font-medium text-slate-700 mb-2">Check-in</label>
                <input 
                  type="date" 
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div className="text-left">
                <label className="block text-sm font-medium text-slate-700 mb-2">Check-out</label>
                <input 
                  type="date" 
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="text-center">
              <p className="text-slate-600 mb-2">Quick selection:</p>
              <div className="flex justify-center space-x-2">
                {[1, 2, 3, 7].map((nights) => (
                  <button
                    key={nights}
                    onClick={() => setNights(nights)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      nights === 1 
                        ? 'bg-orange-500 text-white' 
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {nights} night{nights > 1 ? 's' : ''}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="text-center">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">How many guests?</h3>
            <div className="flex items-center justify-center space-x-4 mb-6">
              <button
                onClick={() => setGuests(Math.max(1, guests - 1))}
                className="w-12 h-12 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                -
              </button>
              <div className="text-4xl font-bold text-slate-900 mx-8">{guests}</div>
              <button
                onClick={() => setGuests(guests + 1)}
                className="w-12 h-12 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                +
              </button>
            </div>
            <p className="text-slate-600">Maximum 4 guests allowed</p>
          </div>
        )}

        {step === 3 && (
          <div className="text-center">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Confirm your booking</h3>
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-6 mb-6">
              <h4 className="font-semibold text-slate-900 mb-4">{property.name}</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Base price</span>
                  <span className="text-slate-900">₹{property.basePrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Cleaning fee</span>
                  <span className="text-slate-900">₹{property.cleaningFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Service fee</span>
                  <span className="text-slate-900">₹{property.serviceFee.toLocaleString()}</span>
                </div>
                <div className="border-t border-orange-200 pt-2">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>₹{totalPrice.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-sm text-slate-600">
              <p>✓ Free cancellation up to 24 hours before check-in</p>
              <p>✓ Secure payment processing</p>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        {step > 1 && (
          <button
            onClick={handleBack}
            className="px-6 py-3 text-slate-600 hover:text-slate-800 transition-colors"
          >
            Back
          </button>
        )}
        <button
          onClick={handleNext}
          className="ml-auto bg-gradient-to-r from-orange-500 to-amber-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-amber-700 transition-all duration-300 shadow-lg flex items-center space-x-2"
        >
          <span>{step === 3 ? 'Confirm Booking' : 'Continue'}</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default SimplifiedBooking; 