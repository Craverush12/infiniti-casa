import React, { useState } from 'react';
import { Users, Heart, Palette, Building, Home, Star, ArrowRight, X } from 'lucide-react';

interface SuggestionFormData {
  groupSize: string;
  purpose: string;
  aesthetic: string;
  budget: string;
  duration: string;
}

interface PropertySuggestionProps {
  onPropertySelect: (propertyId: number) => void;
  onClose: () => void;
  user?: any;
}

const PropertySuggestion: React.FC<PropertySuggestionProps> = ({ onPropertySelect, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<SuggestionFormData>({
    groupSize: '',
    purpose: '',
    aesthetic: '',
    budget: '',
    duration: ''
  });
  const [suggestedProperty, setSuggestedProperty] = useState<any>(null);

  const properties = {
    1: { id: 1, name: "Bandra Art House", category: "Art & Culture", price: 8500, guests: 6, aesthetic: "contemporary" },
    2: { id: 2, name: "Bandra Cottage", category: "Heritage", price: 6200, guests: 4, aesthetic: "heritage" },
    3: { id: 3, name: "City Zen", category: "Urban Zen", price: 12000, guests: 8, aesthetic: "minimalist" },
    4: { id: 4, name: "India House", category: "Heritage", price: 15000, guests: 10, aesthetic: "grandeur" },
    5: { id: 5, name: "Little White Bandra Studio", category: "Studio", price: 4500, guests: 2, aesthetic: "scandinavian" },
    6: { id: 6, name: "Sky Lounge", category: "Penthouse", price: 20000, guests: 12, aesthetic: "luxury" }
  };

  const getSuggestion = () => {
    let scores: { [key: number]: number } = {};
    
    // Initialize scores
    Object.keys(properties).forEach(id => {
      scores[parseInt(id)] = 0;
    });

    // Group size scoring
    const groupSize = parseInt(formData.groupSize);
    Object.entries(properties).forEach(([id, property]) => {
      if (groupSize <= property.guests) {
        scores[parseInt(id)] += 3;
        if (Math.abs(groupSize - property.guests) <= 2) {
          scores[parseInt(id)] += 2; // Bonus for optimal size
        }
      }
    });

    // Purpose scoring
    if (formData.purpose === 'romantic') {
      scores[5] += 5; // Little White Studio
      scores[2] += 3; // Bandra Cottage
    } else if (formData.purpose === 'business') {
      scores[3] += 5; // City Zen
      scores[6] += 4; // Sky Lounge
    } else if (formData.purpose === 'celebration') {
      scores[6] += 5; // Sky Lounge
      scores[4] += 4; // India House
    } else if (formData.purpose === 'cultural') {
      scores[1] += 5; // Art House
      scores[4] += 4; // India House
      scores[2] += 3; // Bandra Cottage
    } else if (formData.purpose === 'relaxation') {
      scores[3] += 5; // City Zen
      scores[5] += 4; // Little White Studio
    }

    // Aesthetic scoring
    if (formData.aesthetic === 'modern') {
      scores[6] += 4; scores[3] += 4; scores[1] += 3;
    } else if (formData.aesthetic === 'traditional') {
      scores[4] += 5; scores[2] += 4;
    } else if (formData.aesthetic === 'artistic') {
      scores[1] += 5; scores[5] += 3;
    } else if (formData.aesthetic === 'minimalist') {
      scores[3] += 5; scores[5] += 4;
    }

    // Budget scoring
    const budget = parseInt(formData.budget);
    Object.entries(properties).forEach(([id, property]) => {
      if (property.price <= budget) {
        scores[parseInt(id)] += 3;
        if (property.price <= budget * 0.8) {
          scores[parseInt(id)] += 2; // Bonus for being well within budget
        }
      }
    });

    // Find highest scoring property
    const bestMatch = Object.entries(scores).reduce((a, b) => scores[parseInt(a[0])] > scores[parseInt(b[0])] ? a : b);
    const propertyId = parseInt(bestMatch[0]);
    
    setSuggestedProperty(properties[propertyId as keyof typeof properties]);
  };

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else {
      getSuggestion();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateFormData = (field: keyof SuggestionFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1: return formData.groupSize !== '';
      case 2: return formData.purpose !== '';
      case 3: return formData.aesthetic !== '';
      case 4: return formData.budget !== '';
      case 5: return formData.duration !== '';
      default: return false;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4">
      <div className="backdrop-blur-xl bg-white/95 rounded-2xl sm:rounded-3xl lg:rounded-3xl w-full max-w-xs sm:max-w-lg lg:max-w-2xl max-h-[85vh] overflow-hidden shadow-2xl border border-white/50">
        {/* Enhanced Header */}
        <div className="bg-gradient-to-r from-rust-500 to-orange-500 backdrop-blur-xl p-4 sm:p-6 lg:p-8 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-3 sm:top-4 lg:top-6 right-3 sm:right-4 lg:right-6 text-white/80 hover:text-white transition-all duration-200 p-2 backdrop-blur-sm bg-white/20 hover:bg-white/30 rounded-full"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
          </button>
          <div className="flex items-center space-x-4 mb-3 sm:mb-4 lg:mb-6">
            <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-white/20 rounded-full flex items-center justify-center">
              <Home className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl lg:text-3xl font-light mb-1">Find Your Perfect Mumbai Stay</h2>
              <p className="text-white/90 font-light text-sm sm:text-base">Let us suggest the ideal property for your needs</p>
            </div>
          </div>
          
          {/* Enhanced Progress Bar */}
          <div className="bg-white/20 backdrop-blur-sm rounded-full h-2 sm:h-2.5 lg:h-3 border border-white/30">
            <div 
              className="bg-white rounded-full h-2 sm:h-2.5 lg:h-3 transition-all duration-500 shadow-sm"
              style={{ width: `${(currentStep / 5) * 100}%` }}
            />
          </div>
        </div>

        <div className="p-3 sm:p-4 lg:p-6 overflow-y-auto max-h-[calc(85vh-120px)] sm:max-h-[calc(85vh-140px)] lg:max-h-[calc(85vh-160px)]">
          {!suggestedProperty ? (
            <>
              {/* Step 1: Group Size */}
              {currentStep === 1 && (
                <div className="space-y-3 sm:space-y-4 lg:space-y-6">
                  <div className="text-center mb-4 sm:mb-6 lg:mb-8">
                    <h3 className="text-base sm:text-lg lg:text-xl font-light text-gray-900 mb-1 lg:mb-2">How many guests?</h3>
                    <p className="text-gray-600 text-xs sm:text-sm lg:text-base">This helps us match you with the right space</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:gap-4">
                    {['1-2', '3-4', '5-8', '9+'].map((size) => (
                      <button
                        key={size}
                        onClick={() => updateFormData('groupSize', size === '9+' ? '12' : size.split('-')[1] || size)}
                        className={`p-3 sm:p-4 lg:p-5 rounded-xl sm:rounded-2xl lg:rounded-3xl border-2 transition-all duration-300 backdrop-blur-sm shadow-lg hover:shadow-xl ${
                          formData.groupSize === (size === '9+' ? '12' : size.split('-')[1] || size)
                            ? 'border-rust-500 bg-gradient-to-r from-rust-50 to-orange-50 text-rust-700 shadow-xl'
                            : 'border-gray-200 bg-white/80 hover:border-rust-300 hover:bg-gradient-to-r hover:from-rust-50/50 hover:to-orange-50/50'
                        }`}
                      >
                        <div className="text-base sm:text-lg lg:text-xl font-semibold">{size}</div>
                        <div className="text-xs sm:text-sm text-gray-500">guests</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Purpose */}
              {currentStep === 2 && (
                <div className="space-y-3 sm:space-y-4 lg:space-y-6">
                  <div className="text-center mb-4 sm:mb-6 lg:mb-8">
                    <h3 className="text-base sm:text-lg lg:text-xl font-light text-gray-900 mb-1 lg:mb-2">What's the occasion?</h3>
                    <p className="text-gray-600 text-xs sm:text-sm lg:text-base">Help us understand your travel purpose</p>
                  </div>
                  
                  <div className="space-y-2 lg:space-y-3">
                    {[
                      { value: 'romantic', label: 'Romantic Getaway', desc: 'Intimate spaces for couples' },
                      { value: 'business', label: 'Business Travel', desc: 'Professional environment with amenities' },
                      { value: 'celebration', label: 'Celebration', desc: 'Special occasions and gatherings' },
                      { value: 'cultural', label: 'Cultural Experience', desc: 'Immerse in Mumbai\'s heritage' },
                      { value: 'relaxation', label: 'Relaxation', desc: 'Peace and tranquility' }
                    ].map((purpose) => (
                      <button
                        key={purpose.value}
                        onClick={() => updateFormData('purpose', purpose.value)}
                        className={`w-full p-2 sm:p-3 lg:p-4 rounded-lg sm:rounded-xl lg:rounded-2xl border-2 text-left transition-all duration-300 backdrop-blur-sm ${
                          formData.purpose === purpose.value
                            ? 'border-gold-500 bg-gold-500/20 shadow-lg'
                            : 'border-white/50 bg-white/30 hover:border-gold-300 hover:bg-white/50'
                        }`}
                      >
                        <div className="font-medium text-gray-900 text-xs sm:text-sm lg:text-base">{purpose.label}</div>
                        <div className="text-xs sm:text-sm text-gray-500">{purpose.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Aesthetic */}
              {currentStep === 3 && (
                <div className="space-y-3 sm:space-y-4 lg:space-y-6">
                  <div className="text-center mb-4 sm:mb-6 lg:mb-8">
                    <h3 className="text-base sm:text-lg lg:text-xl font-light text-gray-900 mb-1 lg:mb-2">What's your style?</h3>
                    <p className="text-gray-600 text-xs sm:text-sm lg:text-base">Choose the aesthetic that speaks to you</p>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-2 sm:gap-3 lg:gap-4">
                    {[
                      { value: 'modern', label: 'Modern & Contemporary', desc: 'Clean lines, latest amenities' },
                      { value: 'traditional', label: 'Heritage & Traditional', desc: 'Colonial charm, cultural elements' },
                      { value: 'artistic', label: 'Artistic & Creative', desc: 'Gallery spaces, creative inspiration' },
                      { value: 'minimalist', label: 'Zen & Minimalist', desc: 'Calm, uncluttered spaces' }
                    ].map((aesthetic) => (
                      <button
                        key={aesthetic.value}
                        onClick={() => updateFormData('aesthetic', aesthetic.value)}
                        className={`p-2 sm:p-3 lg:p-4 rounded-lg sm:rounded-xl lg:rounded-2xl border-2 text-left transition-all duration-300 backdrop-blur-sm ${
                          formData.aesthetic === aesthetic.value
                            ? 'border-gold-500 bg-gold-500/20 shadow-lg'
                            : 'border-white/50 bg-white/30 hover:border-gold-300 hover:bg-white/50'
                        }`}
                      >
                        <div className="font-medium text-gray-900 text-xs sm:text-sm lg:text-base">{aesthetic.label}</div>
                        <div className="text-xs sm:text-sm text-gray-500">{aesthetic.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 4: Budget */}
              {currentStep === 4 && (
                <div className="space-y-3 sm:space-y-4 lg:space-y-6">
                  <div className="text-center mb-4 sm:mb-6 lg:mb-8">
                    <h3 className="text-base sm:text-lg lg:text-xl font-light text-gray-900 mb-1 lg:mb-2">What's your budget?</h3>
                    <p className="text-gray-600 text-xs sm:text-sm lg:text-base">Per night in Indian Rupees</p>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-2 sm:gap-3 lg:gap-4">
                    {[
                      { value: '7000', label: 'Under ₹7,000', desc: 'Cozy and comfortable' },
                      { value: '12000', label: '₹7,000 - ₹12,000', desc: 'Premium comfort' },
                      { value: '18000', label: '₹12,000 - ₹18,000', desc: 'Luxury experience' },
                      { value: '25000', label: '₹18,000+', desc: 'Ultra-luxury' }
                    ].map((budget) => (
                      <button
                        key={budget.value}
                        onClick={() => updateFormData('budget', budget.value)}
                        className={`p-2 sm:p-3 lg:p-4 rounded-lg sm:rounded-xl lg:rounded-2xl border-2 text-left transition-all duration-300 backdrop-blur-sm ${
                          formData.budget === budget.value
                            ? 'border-gold-500 bg-gold-500/20 shadow-lg'
                            : 'border-white/50 bg-white/30 hover:border-gold-300 hover:bg-white/50'
                        }`}
                      >
                        <div className="font-medium text-gray-900 text-xs sm:text-sm lg:text-base">{budget.label}</div>
                        <div className="text-xs sm:text-sm text-gray-500">{budget.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 5: Duration */}
              {currentStep === 5 && (
                <div className="space-y-3 sm:space-y-4 lg:space-y-6">
                  <div className="text-center mb-4 sm:mb-6 lg:mb-8">
                    <h3 className="text-base sm:text-lg lg:text-xl font-light text-gray-900 mb-1 lg:mb-2">How long is your stay?</h3>
                    <p className="text-gray-600 text-xs sm:text-sm lg:text-base">This helps us understand your needs</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:gap-4">
                    {[
                      { value: '1-2', label: '1-2 nights', desc: 'Quick getaway' },
                      { value: '3-5', label: '3-5 nights', desc: 'Short vacation' },
                      { value: '6-10', label: '6-10 nights', desc: 'Extended stay' },
                      { value: '10+', label: '10+ nights', desc: 'Long term' }
                    ].map((duration) => (
                      <button
                        key={duration.value}
                        onClick={() => updateFormData('duration', duration.value)}
                        className={`p-2 sm:p-3 lg:p-4 rounded-lg sm:rounded-xl lg:rounded-2xl border-2 text-center transition-all duration-300 backdrop-blur-sm ${
                          formData.duration === duration.value
                            ? 'border-gold-500 bg-gold-500/20 shadow-lg'
                            : 'border-white/50 bg-white/30 hover:border-gold-300 hover:bg-white/50'
                        }`}
                      >
                        <div className="font-medium text-gray-900 text-xs sm:text-sm lg:text-base">{duration.label}</div>
                        <div className="text-xs text-gray-500">{duration.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Enhanced Navigation */}
              <div className="flex justify-between mt-4 sm:mt-6 lg:mt-8 pt-3 sm:pt-4 lg:pt-6 border-t border-gray-200">
                <button
                  onClick={handleBack}
                  disabled={currentStep === 1}
                  className="px-4 sm:px-6 lg:px-8 py-3 text-gray-600 disabled:text-gray-300 disabled:cursor-not-allowed transition-all duration-200 text-sm sm:text-base lg:text-lg backdrop-blur-sm bg-white/80 hover:bg-white rounded-xl border border-gray-200 hover:border-rust-300"
                >
                  Back
                </button>
                <button
                  onClick={handleNext}
                  disabled={!isStepValid()}
                  className="px-6 sm:px-8 lg:px-10 py-3 bg-gradient-to-r from-rust-500 to-orange-500 hover:from-rust-600 hover:to-orange-600 disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed text-white rounded-xl font-medium transition-all duration-300 transform hover:scale-105 text-sm sm:text-base lg:text-lg shadow-lg hover:shadow-xl backdrop-blur-sm"
                >
                  {currentStep === 5 ? 'Get Suggestion' : 'Next'}
                </button>
              </div>
            </>
          ) : (
            /* Enhanced Suggestion Result */
            <div className="text-center space-y-4 sm:space-y-6 lg:space-y-8">
              <div className="mb-6 sm:mb-8 lg:mb-10">
                <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-r from-rust-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-xl">
                  <Star className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-light text-gray-900 mb-2 lg:mb-3">Perfect Match Found!</h3>
                <p className="text-gray-600 text-sm sm:text-base lg:text-lg">Based on your preferences, we recommend:</p>
              </div>

              <div className="backdrop-blur-xl bg-gradient-to-br from-rust-50/90 to-orange-50/90 rounded-2xl sm:rounded-3xl lg:rounded-3xl p-6 sm:p-8 lg:p-10 border border-rust-200/50 shadow-2xl">
                <h4 className="text-xl sm:text-2xl lg:text-3xl font-light text-gray-900 mb-2 lg:mb-3">{suggestedProperty.name}</h4>
                <p className="text-rust-700 font-medium mb-3 sm:mb-4 lg:mb-6 text-sm sm:text-base lg:text-lg">{suggestedProperty.category}</p>
                <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-6 lg:space-x-8 text-gray-700 mb-4 sm:mb-6 lg:mb-8">
                  <div className="flex items-center">
                    <Users className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 mr-2" />
                    <span className="text-sm sm:text-base lg:text-lg">Up to {suggestedProperty.guests} guests</span>
                  </div>
                  <div className="text-lg sm:text-xl lg:text-2xl font-light">
                    ₹{suggestedProperty.price.toLocaleString()}/night
                  </div>
                </div>
                
                <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:space-x-4 lg:space-x-6 justify-center">
                  <button
                    onClick={() => {
                      onPropertySelect(suggestedProperty.id);
                      onClose();
                    }}
                    className="px-6 sm:px-8 lg:px-10 py-3 bg-gradient-to-r from-rust-500 to-orange-500 hover:from-rust-600 hover:to-orange-600 text-white rounded-xl font-medium transition-all duration-300 transform hover:scale-105 flex items-center justify-center text-sm sm:text-base lg:text-lg shadow-lg hover:shadow-xl backdrop-blur-sm"
                  >
                    View Property
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 ml-2" />
                  </button>
                  <button
                    onClick={() => {
                      setSuggestedProperty(null);
                      setCurrentStep(1);
                      setFormData({
                        groupSize: '',
                        purpose: '',
                        aesthetic: '',
                        budget: '',
                        duration: ''
                      });
                    }}
                    className="px-6 sm:px-8 lg:px-10 py-3 border-2 border-rust-500 text-rust-600 hover:bg-rust-50 rounded-xl font-medium transition-all duration-300 text-sm sm:text-base lg:text-lg backdrop-blur-sm bg-white/80"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertySuggestion;