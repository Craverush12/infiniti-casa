import React, { useState } from 'react';
import { BookOpen, MapPin, Calendar, Award, Sparkles, Heart, Users, Camera, Clock, ArrowRight, Quote, Star, Shield, Zap, Globe, Home, Tree, Coffee, Utensils, Music, Palette, Camera as CameraIcon, MapPin as MapPinIcon, Clock as ClockIcon } from 'lucide-react';

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
        image: 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
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
        image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
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
        image: 'https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
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
        image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
      }
    },
    {
      id: 'seasonal',
      title: 'Seasonal Magic',
      icon: Calendar,
      color: 'from-indigo-500 to-purple-500',
      bgColor: 'from-indigo-50 to-purple-50',
      content: {
        subtitle: 'A Year-Round Experience',
        description: 'Each season brings a unique character to the property, from monsoon romance to winter warmth.',
        highlights: [
          'Monsoon garden parties',
          'Winter fireplace evenings',
          'Spring bloom celebrations',
          'Summer cool retreats'
        ],
        story: 'During monsoon, the garden transforms into a magical space with rain-kissed flowers and cozy indoor gatherings. Winters bring the warmth of the fireplace and hot chai sessions, while spring showcases the garden in full bloom.',
        image: 'https://images.pexels.com/photos/1571461/pexels-photo-1571461.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
      }
    },
    {
      id: 'community',
      title: 'Community Connection',
      icon: Users,
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'from-yellow-50 to-orange-50',
      content: {
        subtitle: 'Building Lasting Relationships',
        description: 'We believe in creating not just guests, but friends and family who return year after year.',
        highlights: [
          'Regular guest events',
          'Local community partnerships',
          'Cultural exchange programs',
          'Sustainable tourism practices'
        ],
        story: 'Our guests often become part of our extended family. We host regular events that bring together travelers from around the world, creating a global community connected by their love for this special place.',
        image: 'https://images.pexels.com/photos/1571462/pexels-photo-1571462.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
      }
    }
  ];

  const currentSection = narrativeSections.find(section => section.id === activeSection) || narrativeSections[0];

  const handleSectionClick = (sectionId: string) => {
    setActiveSection(sectionId);
    onSectionClick?.(sectionId);
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-light text-gray-900 mb-4">
            The Story of {propertyName}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Every property has a story. Discover the rich history, cultural significance, and personal touches that make this place truly extraordinary.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {narrativeSections.map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => handleSectionClick(section.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 ${
                  activeSection === section.id
                    ? `bg-gradient-to-r ${section.color} text-white shadow-lg`
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{section.title}</span>
              </button>
            );
          })}
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div>
              <h3 className="text-3xl font-light text-gray-900 mb-4">
                {currentSection.content.subtitle}
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                {currentSection.content.description}
              </p>
            </div>

            {/* Highlights */}
            <div className="grid grid-cols-2 gap-4">
              {currentSection.content.highlights.map((highlight, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${currentSection.color}`}></div>
                  <span className="text-sm text-gray-700 font-medium">{highlight}</span>
                </div>
              ))}
            </div>

            {/* Story */}
            <div className={`bg-gradient-to-r ${currentSection.bgColor} rounded-2xl p-6 border-l-4 border-gradient-to-b ${currentSection.color}`}>
              <Quote className="w-8 h-8 text-gray-400 mb-4" />
              <p className="text-gray-700 leading-relaxed italic">
                "{currentSection.content.story}"
              </p>
            </div>

            {/* Call to Action */}
            <div className="flex items-center space-x-4">
              <button className="bg-rust-500 text-white px-6 py-3 rounded-full font-medium hover:bg-rust-600 transition-colors flex items-center space-x-2">
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button className="text-rust-600 font-medium hover:text-rust-700 transition-colors">
                View Gallery
              </button>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={currentSection.content.image}
                alt={currentSection.content.subtitle}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              
              {/* Image Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center space-x-2 text-white mb-2">
                  <Camera className="w-4 h-4" />
                  <span className="text-sm font-medium">Professional Photography</span>
                </div>
                <h4 className="text-white font-medium text-lg">
                  {currentSection.content.subtitle}
                </h4>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-rust-500 to-orange-500 rounded-full opacity-20"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-20"></div>
          </div>
        </div>

        {/* Additional Sections Grid */}
        <div className="mt-16">
          <h3 className="text-2xl font-light text-gray-900 mb-8 text-center">
            Explore More Stories
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {narrativeSections.filter(section => section.id !== activeSection).map((section) => {
              const Icon = section.icon;
              return (
                <div
                  key={section.id}
                  className="group cursor-pointer"
                  onClick={() => handleSectionClick(section.id)}
                >
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                    <div className="relative h-48">
                      <img
                        src={section.content.image}
                        alt={section.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      
                      {/* Section Info */}
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${section.color} flex items-center justify-center`}>
                            <Icon className="w-4 h-4 text-white" />
                          </div>
                          <h4 className="text-white font-medium">{section.title}</h4>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <h5 className="font-medium text-gray-900 mb-2">
                        {section.content.subtitle}
                      </h5>
                      <p className="text-gray-600 text-sm line-clamp-3">
                        {section.content.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Testimonial Section */}
        <div className="mt-16 bg-gradient-to-r from-gray-50 to-white rounded-3xl p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-light text-gray-900 mb-4">
              What Our Community Says
            </h3>
            <p className="text-gray-600">
              Hear from guests who have experienced the magic of our story
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote: "This place isn't just a stay, it's an experience that connects you to Mumbai's soul.",
                author: "Priya Sharma",
                rating: 5,
                type: "Family Guest"
              },
              {
                quote: "The attention to detail and cultural authenticity make this property truly special.",
                author: "Rajesh Mehta",
                rating: 5,
                type: "Romantic Getaway"
              },
              {
                quote: "A perfect blend of heritage charm and modern luxury. We'll definitely return.",
                author: "Sarah Johnson",
                rating: 5,
                type: "Solo Traveler"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-gray-700 italic mb-4">
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{testimonial.author}</p>
                    <p className="text-sm text-gray-500">{testimonial.type}</p>
                  </div>
                  <Shield className="w-5 h-5 text-blue-400" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-rust-500 to-orange-500 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-medium mb-4">Become Part of Our Story</h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Experience the magic of {propertyName} and create your own chapter in our ongoing story of heritage, culture, and luxury.
            </p>
            <button className="bg-white text-rust-600 px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors">
              Book Your Stay
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyNarrative; 