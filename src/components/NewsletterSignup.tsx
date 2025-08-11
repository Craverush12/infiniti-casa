import React, { useState } from 'react';
import { Mail, CheckCircle, X } from 'lucide-react';

interface NewsletterSignupProps {
  onClose: () => void;
  user?: any;
}

const NewsletterSignup: React.FC<NewsletterSignupProps> = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    setIsSubscribed(true);
    
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  if (isSubscribed) {
    return (
      <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="backdrop-blur-xl bg-white/90 rounded-3xl p-8 max-w-md w-full shadow-2xl border border-white/50 text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-light text-gray-900 mb-2">Welcome to Infiniti Casa!</h3>
          <p className="text-gray-600 font-light">
            You'll receive exclusive Mumbai property updates and special offers.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden border border-white/20 backdrop-blur-xl bg-gradient-to-br from-cream-50/95 via-white/95 to-sage-50/95">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-600 to-amber-500 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/90 hover:text-white transition-colors p-1 bg-white/10 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center">
            <Mail className="w-6 h-6 mr-3" />
            <div>
              <h2 className="text-xl font-editorial mb-1">Stay Updated</h2>
              <p className="text-white/90 text-sm">Exclusive Mumbai property insights</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-editorial text-gray-900 mb-2">
              Get Exclusive Access
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Be the first to know about new properties, special offers, and Mumbai travel insights from our local experts.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full px-4 py-3 bg-white/80 border border-white/60 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 shadow-sm"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 text-white py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                  Subscribing...
                </div>
              ) : (
                'Subscribe to Updates'
              )}
            </button>
          </form>

          <p className="text-xs text-gray-500 mt-4 text-center">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewsletterSignup;