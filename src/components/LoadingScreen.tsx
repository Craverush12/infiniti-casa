import React, { useEffect, useState } from 'react';
import { Loader2, Home, Search, Calendar, User } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
  message?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  onComplete, 
  message = "Loading your perfect stay..." 
}) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { icon: Home, text: "Preparing your experience", duration: 800 },
    { icon: Search, text: "Finding perfect properties", duration: 1000 },
    { icon: Calendar, text: "Checking availability", duration: 600 },
    { icon: User, text: "Setting up your profile", duration: 400 }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2800);

    return () => clearTimeout(timer);
  }, [onComplete]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const stepTimer = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= steps.length - 1) {
          clearInterval(stepTimer);
          return prev;
        }
        return prev + 1;
      });
    }, 700);

    return () => clearInterval(stepTimer);
  }, [steps.length]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-rust-50 via-white to-sage-50 flex items-center justify-center z-50">
      <div className="text-center max-w-md mx-auto px-6">
        {/* Logo */}
        <div className="mb-8">
          <h1 className="text-3xl font-light text-gray-900 mb-2">Infiniti Casa</h1>
          <p className="text-gray-600 text-sm">Luxury Boutique Rentals</p>
        </div>

        {/* Loading Animation */}
        <div className="mb-8">
          <div className="relative w-16 h-16 mx-auto mb-4">
            <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
            <div 
              className="absolute inset-0 border-4 border-primary-500 rounded-full border-t-transparent animate-spin"
              style={{ 
                background: `conic-gradient(from 0deg, transparent ${progress * 3.6}deg, #e07a5f ${progress * 3.6}deg, #e07a5f 360deg)` 
              }}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="w-6 h-6 text-primary-500 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-rust-500 to-coral-500 h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-2">{Math.round(progress)}%</p>
        </div>

        {/* Current Step */}
        <div className="mb-6">
          <div className="flex items-center justify-center space-x-2 mb-2">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={index}
                  className={`flex items-center space-x-1 transition-all duration-300 ${
                    index <= currentStep 
                      ? 'text-primary-500' 
                      : 'text-gray-400'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {index < steps.length - 1 && (
                    <div className={`w-8 h-0.5 transition-all duration-300 ${
                      index < currentStep ? 'bg-primary-500' : 'bg-gray-200'
                    }`}></div>
                  )}
                </div>
              );
            })}
          </div>
          <p className="text-gray-700 font-medium">
            {steps[currentStep]?.text || "Almost ready..."}
          </p>
        </div>

        {/* Message */}
        <p className="text-gray-600 text-sm">{message}</p>

        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-primary-100 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 bg-coral-100 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-5 w-10 h-10 bg-primary-100 rounded-full opacity-20 animate-pulse delay-1500"></div>
      </div>
    </div>
  );
};

export default LoadingScreen;