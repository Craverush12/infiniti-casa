import React, { useState } from 'react';
import { BookOpen, MapPin, Calendar, Award, Sparkles, Heart, Users, Camera, Clock, ArrowRight, Quote, Star, Shield, Zap, Globe, Home, Tree, Coffee, Utensils, Music, Palette, Camera as CameraIcon, MapPin as MapPinIcon, Clock as ClockIcon } from 'lucide-react';
import { getPropertyImageUrls } from '../utils/propertyAssets';

interface PropertyNarrativeProps {
  propertyId: number;
  propertyName: string;
  onSectionClick?: (section: string) => void;
}

const PropertyNarrative: React.FC<PropertyNarrativeProps> = ({ 
  propertyId, 
  propertyName, 
  onSectionClick 
}) => {
  const [activeSection, setActiveSection] = useState<string>('story');

  const narrativeSections = [
    {
      id: 'story',
      title: 'The Story Behind',
      icon: BookOpen,
      color: 'from-rust-500 to-orange-500',
      bgColor: 'from-rust-50 to-orange-50',
      content: {
        subtitle: 'A Legacy of Elegance',
        description: 'Built in 1923, this colonial cottage has witnessed the transformation of Bombay into Mumbai. Each room tells a story of the city\'s rich history, from the original teak woodwork to the stained glass windows.',
        highlights: [
          'Original 1923 construction',
          'Colonial British architecture',
          'Historical significance',
          'Family-owned for generations'
        ],
        story: 'The garden, planted by the original British owners, continues to bloom with century-old trees and exotic flowers. Recently restored with painstaking attention to detail, this property now offers the perfect blend of heritage charm and modern luxury.',
        image: getPropertyImageUrls("Heritage Garden Cottage")[0] || 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
      }
    },
    {
      id: 'design',
      title: 'Design Philosophy',
      icon: Palette,
      color: 'from-blue-500 to-teal-500',
      bgColor: 'from-blue-50 to-teal-50',
      content: {
        subtitle: 'Where Heritage Meets Contemporary',
        description: 'Every design choice reflects a deep understanding of colonial aesthetics while embracing modern comfort and functionality.',
        highlights: [
          'Colonial color palette',
          'Vintage furnishings',
          'Natural materials',
          'Symmetrical layouts'
        ],
        story: 'The color scheme draws inspiration from the British colonial era - deep mahogany, cream whites, and gold accents. The furniture pieces are carefully selected to maintain the historical authenticity while ensuring modern comfort.',
        image: getPropertyImageUrls("Heritage Garden Cottage")[1] || 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
      }
    },
    {
      id: 'culture',
      title: 'Cultural Integration',
      icon: Globe,
      color: 'from-orange-500 to-red-500',
      bgColor: 'from-orange-50 to-red-50',
      content: {
        subtitle: 'Mumbai\'s Heritage Preserved',
        description: 'This property serves as a living museum of Mumbai\'s colonial past, while celebrating the city\'s vibrant contemporary culture.',
        highlights: [
          'Local art integration',
          'Cultural events hosting',
          'Community engagement',
          'Heritage preservation'
        ],
        story: 'We actively collaborate with local artists and cultural organizations to host events that celebrate Mumbai\'s rich heritage. The property has become a hub for cultural exchange and artistic expression.',
        image: getPropertyImageUrls("Art Loft Bandra")[0] || 'https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
      }
    },
    {
      id: 'neighborhood',
      title: 'Neighborhood Story',
      icon: MapPin,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-50 to-emerald-50',
      content: {
        subtitle: 'Bandra West\'s Hidden Gem',
        description: 'Located in the heart of Bandra West, this property is surrounded by the neighborhood\'s eclectic mix of colonial charm and modern vibrancy.',
        highlights: [
          'Historic Bandra Fort nearby',
          'Art galleries and cafes',
          'Cultural landmarks',
          'Local community events'
        ],
        story: 'The neighborhood has evolved from a quiet fishing village to Mumbai\'s most artistic and culturally rich area. Our property stands as a testament to this transformation, offering guests a front-row seat to Bandra\'s unique character.',
        image: getPropertyImageUrls("Art Loft Bandra")[1] || 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
      }
    },
    {
      id: 'seasonal',
      title: 'Seasonal Magic',
      icon: Calendar,
      color: 'from-indigo-500 to-purple-500',
      bgColor: 'from-indigo-50 to-purple-50',
      content: {
        subtitle: 'Year-Round Enchantment',
        description: 'Each season brings its own unique charm to this property, from monsoon magic to winter warmth.',
        highlights: [
          'Monsoon garden beauty',
          'Winter cozy evenings',
          'Spring blooming flowers',
          'Summer cool retreat'
        ],
        story: 'During monsoon, the garden transforms into a magical green paradise. Winter brings cozy evenings by the fireplace, while spring showcases the blooming flowers. Summer offers a cool retreat from the city heat.',
        image: getPropertyImageUrls("Zen Suite")[0] || 'https://images.pexels.com/photos/1571461/pexels-photo-1571461.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
      }
    },
    {
      id: 'experiences',
      title: 'Guest Experiences',
      icon: Heart,
      color: 'from-pink-500 to-rose-500',
      bgColor: 'from-pink-50 to-rose-50',
      content: {
        subtitle: 'Memories That Last',
        description: 'Every guest leaves with a unique story, a personal connection to Mumbai\'s rich cultural tapestry.',
        highlights: [
          'Personalized experiences',
          'Cultural immersion',
          'Local connections',
          'Authentic moments'
        ],
        story: 'Our guests often share stories of magical moments - from morning tea in the garden to evening conversations with local artists. These experiences create lasting memories and deep connections to Mumbai\'s soul.',
        image: getPropertyImageUrls("Zen Suite")[1] || 'https://images.pexels.com/photos/1571462/pexels-photo-1571462.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
      }
    }
  ];

  const handleSectionClick = (sectionId: string) => {
    setActiveSection(sectionId);
    onSectionClick?.(sectionId);
  };

  const activeContent = narrativeSections.find(section => section.id === activeSection)?.content;

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-light text-gray-900 mb-4">
            The Story of {propertyName}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the rich narrative behind this extraordinary property
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {narrativeSections.map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => handleSectionClick(section.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                  activeSection === section.id
                    ? `bg-gradient-to-r ${section.color} text-white shadow-lg`
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{section.title}</span>
              </button>
            );
          })}
        </div>

        {/* Content Display */}
        {activeContent && (
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative">
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={activeContent.image}
                  alt={activeContent.subtitle}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-6">
              <div>
                <h3 className="text-3xl font-light text-gray-900 mb-2">
                  {activeContent.subtitle}
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  {activeContent.description}
                </p>
              </div>

              {/* Highlights */}
              <div className="grid grid-cols-2 gap-4">
                {activeContent.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">{highlight}</span>
                  </div>
                ))}
              </div>

              {/* Story */}
              <div className="bg-gray-50 rounded-xl p-6">
                <p className="text-gray-700 leading-relaxed">
                  {activeContent.story}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertyNarrative; 