import React, { useState } from 'react';
import { Star, Quote, Heart, Calendar, Users, Award, CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import type { PropertyDetailData } from '../../data/propertyDetails';

interface PropertyTestimonialsProps {
  property: PropertyDetailData;
}

const PropertyTestimonials: React.FC<PropertyTestimonialsProps> = ({ property }) => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => 
      prev === property.testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => 
      prev === 0 ? property.testimonials.length - 1 : prev - 1
    );
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What guests say about {property.name}
          </h2>
          <p className="text-lg text-gray-600">
            Real experiences from our valued guests
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {property.testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center space-x-1 mb-4">
                {renderStars(testimonial.rating)}
              </div>
              <blockquote className="text-gray-700 mb-4 italic">
                "{testimonial.comment}"
              </blockquote>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonial.user}
                  </div>
                  <div className="text-sm text-gray-600">
                    {testimonial.stayDuration} • {testimonial.date}
                  </div>
                </div>
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                  {testimonial.user[0]}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Testimonial */}
        <div className="bg-gradient-to-r from-rust-500 to-rust-600 rounded-2xl p-8 text-white">
          <div className="text-center mb-8">
            <Quote className="w-12 h-12 mx-auto mb-4 opacity-80" />
            <h3 className="text-2xl font-bold mb-4">Featured Review</h3>
          </div>
          
          <div className="relative">
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={prevTestimonial}
                className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center space-x-1">
                {renderStars(property.testimonials[currentTestimonial].rating)}
              </div>
              <button
                onClick={nextTestimonial}
                className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            
            <blockquote className="text-xl italic mb-6 text-center">
              "{property.testimonials[currentTestimonial].comment}"
            </blockquote>
            
            <div className="flex items-center justify-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white text-lg font-bold">
                {property.testimonials[currentTestimonial].user[0]}
              </div>
              <div className="text-center">
                <div className="font-semibold">
                  {property.testimonials[currentTestimonial].user}
                </div>
                <div className="text-sm opacity-80">
                  {property.testimonials[currentTestimonial].stayDuration} • {property.testimonials[currentTestimonial].date}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">
              {property.hero.rating}
            </div>
            <div className="text-sm text-gray-600">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">
              {property.hero.reviews_count}
            </div>
            <div className="text-sm text-gray-600">Total Reviews</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">
              {property.testimonials.filter(t => t.rating === 5).length}
            </div>
            <div className="text-sm text-gray-600">5-Star Reviews</div>
          </div>

        </div>


      </div>
    </section>
  );
};

export default PropertyTestimonials; 