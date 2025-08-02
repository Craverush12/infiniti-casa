import React, { useState } from 'react';
import { Phone, Mail, MessageCircle, X } from 'lucide-react';

interface QuickActionsProps {
  onContactClick: () => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({ 
  onContactClick
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const actions = [
    {
      icon: Phone,
      label: 'Call Now',
      onClick: () => window.open('tel:+91-98765-43210'),
      color: 'from-green-500 to-emerald-500',
      description: '24/7 support'
    },
    {
      icon: Mail,
      label: 'Email Us',
      onClick: onContactClick,
      color: 'from-blue-500 to-cyan-500',
      description: 'Send us a message'
    },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      onClick: () => window.open('https://wa.me/919876543210'),
      color: 'from-green-600 to-green-500',
      description: 'Quick chat'
    }
  ];

  return (
    <div className="fixed bottom-4 sm:bottom-6 left-4 sm:left-6 z-40">
      <div className="flex flex-col-reverse space-y-reverse space-y-2 sm:space-y-3">
        {/* Action Buttons */}
        {actions.map((action, index) => (
          <div
            key={index}
            className={`transform transition-all duration-300 ease-out ${
              isExpanded ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-16 opacity-0 scale-75'
            }`}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <button
              onClick={action.onClick}
              className={`w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r ${action.color} text-white rounded-full shadow-lg backdrop-blur-sm border border-white/20 transition-all duration-300 transform hover:scale-110 active:scale-95 touch-manipulation group relative`}
              title={action.label}
              aria-label={action.label}
            >
              <action.icon className="w-5 h-5 sm:w-6 sm:h-6 mx-auto" />
              
              {/* Tooltip for mobile */}
              <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="backdrop-blur-xl bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                  {action.label}
                </div>
                <div className="absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-black/80 border-t-2 border-t-transparent border-b-2 border-b-transparent"></div>
              </div>
            </button>
          </div>
        ))}

        {/* Main Toggle Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-gold-500 to-amber-500 hover:from-gold-600 hover:to-amber-600 text-white rounded-full shadow-lg backdrop-blur-sm border border-white/20 transition-all duration-300 transform hover:scale-110 active:scale-95 touch-manipulation relative group"
          aria-label={isExpanded ? 'Close quick actions' : 'Open quick actions'}
        >
          <div className={`transition-transform duration-300 ${isExpanded ? 'rotate-45' : 'rotate-0'}`}>
            {isExpanded ? (
              <X className="w-6 h-6 sm:w-7 sm:h-7 mx-auto" />
            ) : (
              <>
                <div className="w-5 h-0.5 sm:w-6 sm:h-0.5 bg-white mx-auto mb-1"></div>
                <div className="w-5 h-0.5 sm:w-6 sm:h-0.5 bg-white mx-auto rotate-90 -mt-0.5"></div>
              </>
            )}
          </div>
          
          {/* Tooltip */}
          <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="backdrop-blur-xl bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
              {isExpanded ? 'Close' : 'Quick Contact'}
            </div>
            <div className="absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-black/80 border-t-2 border-t-transparent border-b-2 border-b-transparent"></div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default QuickActions;