import React, { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, Star, ArrowRight, Shield, CheckCircle } from 'lucide-react';

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const validateForm = () => {
    const errors = {
      name: '',
      email: '',
      message: ''
    };

    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      errors.message = 'Message must be at least 10 characters long';
    }

    setFormErrors(errors);
    return !Object.values(errors).some(error => error);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Form submitted:', formData);
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    setFormErrors({ name: '', email: '', message: '' });
    
    // Reset success state after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6 text-gray-700" />,
      title: "Call Us",
      content: "+91-98765-43210",
      description: "Available 24/7",
      href: "tel:+91-98765-43210"
    },
    {
      icon: <Mail className="w-6 h-6 text-gray-700" />,
      title: "Email Us",
      content: "hello@infiniti-casa.com",
      description: "We'll respond within 2 hours",
      href: "mailto:hello@infiniti-casa.com"
    },
    {
      icon: <MapPin className="w-6 h-6 text-gray-700" />,
      title: "Visit Us",
      content: "Bandra West, Mumbai",
      description: "Our local office",
      href: "#"
    }
  ];

  return (
    <>
      {/* Location Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-stone-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-12 sm:mb-20 transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-4 sm:mb-6 leading-tight">
              <span className="block text-gray-800">Where you</span>
              <span className="block text-gray-600 font-normal italic">can find us</span>
            </h2>
            <div className="w-16 sm:w-24 h-px bg-gray-300 mx-auto mb-6 sm:mb-8"></div>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed px-4">
              Our carefully curated properties are located in Mumbai's most desirable neighborhoods
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-16 items-center">
            {/* Map Placeholder */}
            <div className={`transform transition-all duration-1000 delay-300 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              <div className="relative h-64 sm:h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50 border border-gray-200 shadow-lg">
                {/* Map Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100"></div>
                
                {/* Map Content */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-3 sm:mb-4" />
                    <p className="text-gray-600 text-base sm:text-lg font-medium">Interactive Map</p>
                    <p className="text-gray-500 text-xs sm:text-sm mt-1 sm:mt-2">Mumbai's Premium Neighborhoods</p>
                  </div>
                </div>

                {/* Location Markers */}
                <div className="absolute top-1/4 left-1/3 w-4 h-4 bg-red-500 rounded-full animate-pulse shadow-lg"></div>
                <div className="absolute top-1/2 right-1/4 w-4 h-4 bg-red-500 rounded-full animate-pulse shadow-lg"></div>
                <div className="absolute bottom-1/3 left-1/2 w-4 h-4 bg-red-500 rounded-full animate-pulse shadow-lg"></div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent"></div>
              </div>
            </div>

            {/* Location Details */}
            <div className={`transform transition-all duration-1000 delay-500 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              <div className="space-y-6 sm:space-y-8">
                <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
                  <h3 className="text-xl sm:text-2xl font-light text-gray-900 mb-4 sm:mb-6">Our Locations</h3>
                  <div className="space-y-4 sm:space-y-6">
                    <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1 text-sm sm:text-base">Bandra West</h4>
                        <p className="text-gray-600 text-xs sm:text-sm">3 premium properties • Sea views • Vibrant nightlife</p>
                        <p className="text-gray-500 text-xs mt-1">Art galleries, cafes, and cultural hotspots</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-50 rounded-full flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1 text-sm sm:text-base">Colaba</h4>
                        <p className="text-gray-600 text-xs sm:text-sm">2 heritage properties • Historic charm • Cultural hub</p>
                        <p className="text-gray-500 text-xs mt-1">Gateway of India, museums, and colonial architecture</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-50 rounded-full flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1 text-sm sm:text-base">Lower Parel</h4>
                        <p className="text-gray-600 text-xs sm:text-sm">1 penthouse • Modern skyline • Business district</p>
                        <p className="text-gray-500 text-xs mt-1">Corporate offices, shopping malls, and fine dining</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Explore Button */}
                <button className="w-full bg-gray-900 text-white py-3 sm:py-4 rounded-full font-medium hover:bg-gray-800 active:bg-gray-700 transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl">
                  <span>Explore All Locations</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section 
        ref={containerRef}
        id="contact"
        className="py-16 sm:py-24 bg-gray-900 text-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className={`text-center mb-12 sm:mb-20 transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white mb-4 sm:mb-6 leading-tight">
              <span className="block text-white/90">Get in</span>
              <span className="block text-white/70 font-normal italic">touch</span>
            </h2>
            <div className="w-16 sm:w-24 h-px bg-white/30 mx-auto mb-6 sm:mb-8"></div>
            <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed px-4">
              Ready to experience Mumbai's finest accommodations? We're here to help you find your perfect stay.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-16">
            {/* Contact Info */}
            <div className={`transform transition-all duration-1000 delay-200 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              <div className="space-y-4 sm:space-y-6 mb-8 sm:mb-12">
                {contactInfo.map((info, index) => (
                  <a
                    key={index}
                    href={info.href}
                    className="group block bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 hover:bg-white/20 transition-all duration-300 border border-white/20 transform hover:scale-105"
                  >
                    <div className="flex items-center">
                      <div className="p-2 sm:p-3 bg-white/10 rounded-full mr-3 sm:mr-4 group-hover:bg-white/20 transition-colors">
                        <div className="w-4 h-4 sm:w-6 sm:h-6 text-gray-700">
                          {info.icon}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-base sm:text-lg font-medium text-white mb-1">{info.title}</h3>
                        <p className="text-white/90 font-medium text-sm sm:text-base">{info.content}</p>
                        <p className="text-white/70 text-xs sm:text-sm">{info.description}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-white/50 group-hover:text-white transition-colors" />
                    </div>
                  </a>
                ))}
              </div>

              {/* Trust Indicators */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/20">
                <h3 className="text-base sm:text-lg font-medium text-white mb-3 sm:mb-4">Why Choose Infiniti Casa?</h3>
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-center text-white/80">
                    <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 mr-2" />
                    <span className="text-sm sm:text-base">Curated luxury properties</span>
                  </div>
                  <div className="flex items-center text-white/80">
                    <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-green-400 mr-2" />
                    <span className="text-sm sm:text-base">24/7 guest support</span>
                  </div>
                  <div className="flex items-center text-white/80">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400 mr-2" />
                    <span className="text-sm sm:text-base">Flexible check-in times</span>
                  </div>
                  <div className="flex items-center text-white/80">
                    <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-400 mr-2" />
                    <span className="text-sm sm:text-base">Free cancellation up to 24h</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Contact Form */}
            <div className={`transform transition-all duration-1000 delay-400 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/20">
                <h3 className="text-xl sm:text-2xl font-light text-white mb-4 sm:mb-6">Send us a message</h3>
                
                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-white/90 text-xs sm:text-sm font-medium mb-1 sm:mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className={`w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/10 border rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all text-sm sm:text-base ${
                        formErrors.name ? 'border-red-400' : 'border-white/20'
                      }`}
                      placeholder="Your full name"
                    />
                    {formErrors.name && (
                      <p className="text-red-400 text-xs mt-1">{formErrors.name}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-white/90 text-xs sm:text-sm font-medium mb-1 sm:mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={`w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/10 border rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all text-sm sm:text-base ${
                        formErrors.email ? 'border-red-400' : 'border-white/20'
                      }`}
                      placeholder="your.email@example.com"
                    />
                    {formErrors.email && (
                      <p className="text-red-400 text-xs mt-1">{formErrors.email}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-white/90 text-xs sm:text-sm font-medium mb-1 sm:mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className={`w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/10 border rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all resize-none text-sm sm:text-base ${
                        formErrors.message ? 'border-red-400' : 'border-white/20'
                      }`}
                      placeholder="Tell us about your perfect stay..."
                    />
                    {formErrors.message && (
                      <p className="text-red-400 text-xs mt-1">{formErrors.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-rust-500 text-white py-3 sm:py-4 rounded-lg font-medium hover:bg-rust-600 active:bg-rust-700 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Sending...</span>
                      </>
                    ) : isSubmitted ? (
                      <>
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span>Message Sent!</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactSection;