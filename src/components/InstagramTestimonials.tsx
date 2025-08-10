import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Share2, Star, Camera, MapPin, Clock, Users, Sparkles, ArrowLeft, ArrowRight, Play, Pause, Instagram, Eye, Calendar, Award, Zap, ChevronRight, ChevronLeft, TrendingUp, Award as AwardIcon, CheckCircle, Shield } from 'lucide-react';
import { getPropertyImageUrls } from '../utils/propertyAssets';

interface GuestStory {
  id: string;
  username: string;
  userAvatar: string;
  userHandle: string;
  location: string;
  rating: number;
  storyTitle: string;
  storyDescription: string;
  photos: {
    url: string;
    caption: string;
    timestamp: string;
    likes: number;
    comments: number;
  }[];
  totalLikes: number;
  totalComments: number;
  timestamp: string;
  verified: boolean;
  propertyName: string;
  propertyImage: string;
  tags: string[];
  propertyId: number;
  guestJourney: {
    phase: string;
    description: string;
    icon: any;
  }[];
  experienceType: 'family' | 'romantic' | 'business' | 'solo' | 'group';
  highlightMoment: string;
}

interface InstagramTestimonialsProps {
  propertyId?: number;
  onPropertySelect?: (propertyId: number) => void;
}

const InstagramTestimonials: React.FC<InstagramTestimonialsProps> = ({ propertyId, onPropertySelect }) => {
  const [activeTab, setActiveTab] = useState<'stories' | 'live' | 'highlights'>('stories');
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [likedStories, setLikedStories] = useState<Set<string>>(new Set());

  // Multiple immersive guest stories
  const guestStories: GuestStory[] = [
    {
      id: '1',
      username: 'Priya Sharma',
      userAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      userHandle: '@priya_sharma',
      location: 'Bandra West, Mumbai',
      rating: 5,
      storyTitle: 'A Magical Family Getaway',
      storyDescription: 'From the moment we stepped into this colonial paradise, every detail exceeded our expectations.',
      photos: [
        {
          url: getPropertyImageUrls("Heritage Garden Cottage")[0] || 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
          caption: 'First glimpse of our home for the weekend - absolutely breathtaking! 🌸✨',
          timestamp: '2 hours ago',
          likes: 342,
          comments: 28
        },
        {
          url: getPropertyImageUrls("Heritage Garden Cottage")[1] || 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
          caption: 'Morning coffee in the garden - pure serenity ☕️',
          timestamp: '1 hour ago',
          likes: 289,
          comments: 15
        }
      ],
      totalLikes: 1198,
      totalComments: 85,
      timestamp: '2 hours ago',
      verified: true,
      propertyName: 'Heritage Garden Cottage',
      propertyImage: getPropertyImageUrls("Heritage Garden Cottage")[0] || 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      tags: ['#MumbaiStay', '#HeritageCharm', '#PerfectGetaway'],
      propertyId: 1,
      guestJourney: [
        { phase: 'Arrival', description: 'Warm welcome with traditional tea', icon: Calendar },
        { phase: 'Settle In', description: 'Perfect room setup and amenities', icon: Award },
        { phase: 'Experience', description: 'Immersive heritage and luxury', icon: Sparkles },
        { phase: 'Departure', description: 'Reluctant to leave this paradise', icon: Heart }
      ],
      experienceType: 'family',
      highlightMoment: 'Garden breakfast with family'
    },
    {
      id: '2',
      username: 'Rajesh Mehta',
      userAvatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      userHandle: '@rajesh_mehta',
      location: 'Colaba, Mumbai',
      rating: 5,
      storyTitle: 'Our Perfect Anniversary Celebration',
      storyDescription: 'Every moment was curated to perfection. The butler service and sunset views created pure magic.',
      photos: [
        {
          url: getPropertyImageUrls("Art Loft Bandra")[0] || 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
          caption: 'Art meets luxury in this stunning loft! 🎨✨',
          timestamp: '3 hours ago',
          likes: 456,
          comments: 32
        },
        {
          url: getPropertyImageUrls("Art Loft Bandra")[1] || 'https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
          caption: 'Sunset views that take your breath away 🌅',
          timestamp: '2 hours ago',
          likes: 523,
          comments: 41
        }
      ],
      totalLikes: 1456,
      totalComments: 98,
      timestamp: '3 hours ago',
      verified: true,
      propertyName: 'Art Loft Bandra',
      propertyImage: getPropertyImageUrls("Art Loft Bandra")[0] || 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      tags: ['#RomanticGetaway', '#ArtLoft', '#BandraWest'],
      propertyId: 2,
      guestJourney: [
        { phase: 'Arrival', description: 'Champagne welcome and rose petals', icon: Sparkles },
        { phase: 'Settle In', description: 'Luxury amenities and art curation', icon: Award },
        { phase: 'Experience', description: 'Private dining and sunset views', icon: Heart },
        { phase: 'Departure', description: 'Memories that will last forever', icon: Star }
      ],
      experienceType: 'romantic',
      highlightMoment: 'Private rooftop dinner'
    },
    {
      id: '3',
      username: 'Sarah Johnson',
      userAvatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      userHandle: '@sarah_johnson',
      location: 'Lower Parel, Mumbai',
      rating: 5,
      storyTitle: 'Business Trip Turned Staycation',
      storyDescription: 'The perfect blend of work and relaxation. The zen atmosphere helped me focus and recharge.',
      photos: [
        {
          url: getPropertyImageUrls("Zen Suite")[0] || 'https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
          caption: 'My workspace with a view - productivity meets tranquility 💼',
          timestamp: '5 hours ago',
          likes: 234,
          comments: 18
        },
        {
          url: getPropertyImageUrls("Zen Suite")[1] || 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
          caption: 'Evening meditation spot - pure zen 🧘‍♀️',
          timestamp: '4 hours ago',
          likes: 198,
          comments: 12
        }
      ],
      totalLikes: 892,
      totalComments: 56,
      timestamp: '5 hours ago',
      verified: true,
      propertyName: 'Zen Suite',
      propertyImage: getPropertyImageUrls("Zen Suite")[0] || 'https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      tags: ['#BusinessTravel', '#ZenSuite', '#WorkLifeBalance'],
      propertyId: 3,
      guestJourney: [
        { phase: 'Arrival', description: 'Peaceful check-in and orientation', icon: Calendar },
        { phase: 'Settle In', description: 'Dedicated workspace setup', icon: Award },
        { phase: 'Experience', description: 'Focus and productivity boost', icon: Zap },
        { phase: 'Departure', description: 'Refreshed and accomplished', icon: CheckCircle }
      ],
      experienceType: 'business',
      highlightMoment: 'Sunrise work session'
    }
  ];

  // Filter stories by property ID
  const filteredStories = propertyId 
    ? guestStories.filter(story => story.propertyId === propertyId)
    : guestStories;

  const displayStories = filteredStories.length > 0 ? filteredStories : guestStories;

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentStoryIndex((prev) => (prev + 1) % displayStories.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isPlaying, displayStories.length]);

  const handleLike = (storyId: string) => {
    setLikedStories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(storyId)) {
        newSet.delete(storyId);
      } else {
        newSet.add(storyId);
      }
      return newSet;
    });
  };

  const getExperienceIcon = (type: string) => {
    switch (type) {
      case 'family': return Users;
      case 'romantic': return Heart;
      case 'business': return AwardIcon;
      case 'solo': return Eye;
      case 'group': return Users;
      default: return Users;
    }
  };

  const getExperienceColor = (type: string) => {
    switch (type) {
      case 'family': return 'from-blue-500 to-cyan-500';
      case 'romantic': return 'from-pink-500 to-rose-500';
      case 'business': return 'from-purple-500 to-indigo-500';
      case 'solo': return 'from-green-500 to-emerald-500';
      case 'group': return 'from-purple-500 to-indigo-500';
      default: return 'from-rust-500 to-orange-500';
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
            {propertyId ? 'Guest Stories from This Property' : 'Real Stories from Our Guests'}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {propertyId 
              ? 'Discover authentic experiences from guests who made this property their home'
              : 'Real stories from real guests - each one a unique journey of discovery and luxury'
            }
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/40 backdrop-blur-sm rounded-xl p-1 border border-white/30">
            <div className="flex space-x-1">
              {[
                { id: 'stories', label: 'Guest Stories', icon: Camera },
                { id: 'live', label: 'Live Updates', icon: Instagram },
                { id: 'highlights', label: 'Highlights', icon: Award }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-white/70 text-primary-700 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        {activeTab === 'stories' && (
          <div className="space-y-8">
            {/* Featured Story */}
            <div className="card-glass-medium rounded-2xl overflow-hidden shadow-elegant border border-white/40">
              <div className="relative h-80 md:h-96">
                <img
                  src={displayStories[currentStoryIndex].photos[0].url}
                  alt={displayStories[currentStoryIndex].storyTitle}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
                {/* Story Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center space-x-4 mb-3">
                    <img
                      src={displayStories[currentStoryIndex].userAvatar}
                      alt={displayStories[currentStoryIndex].username}
                      className="w-12 h-12 rounded-full border-2 border-white/20"
                    />
                    <div className="text-white">
                      <h3 className="text-xl font-semibold mb-1">
                        {displayStories[currentStoryIndex].storyTitle}
                      </h3>
                      <p className="text-white/80 text-sm">
                        by {displayStories[currentStoryIndex].username}
                      </p>
                    </div>
                  </div>
                  <p className="text-white/90 text-base leading-relaxed max-w-2xl">
                    {displayStories[currentStoryIndex].storyDescription}
                  </p>
                </div>

                {/* Navigation */}
                {displayStories.length > 1 && (
                  <>
                    <button
                      onClick={() => setCurrentStoryIndex((prev) => (prev - 1 + displayStories.length) % displayStories.length)}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setCurrentStoryIndex((prev) => (prev + 1) % displayStories.length)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Guest Stories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {displayStories.map((story, index) => (
                <div
                  key={story.id}
                  className="card-glass-light rounded-xl overflow-hidden hover:shadow-elegant transition-all duration-300 border border-white/30"
                >
                  {/* Story Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={story.photos[0].url}
                      alt={story.storyTitle}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    
                    {/* Experience Badge */}
                    <div className={`absolute top-3 right-3 px-2 py-1 rounded-full bg-gradient-to-r ${getExperienceColor(story.experienceType)} text-white text-xs font-medium flex items-center space-x-1`}>
                      {(() => {
                        const IconComponent = getExperienceIcon(story.experienceType);
                        return <IconComponent className="w-3 h-3" />;
                      })()}
                      <span className="capitalize">{story.experienceType}</span>
                    </div>

                    {/* Rating */}
                    <div className="absolute bottom-3 left-3 flex items-center space-x-1 bg-white/70 backdrop-blur-sm border border-white/30 rounded-full px-2 py-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <span className="text-xs font-semibold text-gray-900">{story.rating}</span>
                    </div>
                  </div>

                  {/* Story Content */}
                  <div className="p-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <img
                        src={story.userAvatar}
                        alt={story.username}
                        className="w-8 h-8 rounded-full"
                      />
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm">{story.username}</h4>
                        <p className="text-xs text-gray-500">{story.timestamp}</p>
                      </div>
                    </div>

                    <h5 className="font-semibold text-gray-900 text-sm mb-2 line-clamp-2">
                      {story.storyTitle}
                    </h5>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {story.storyDescription}
                    </p>

                    {/* Highlight Moment */}
                    <div className="bg-gradient-to-r from-rust-50 to-orange-50 rounded-lg p-2 mb-3">
                      <div className="flex items-center space-x-2">
                        <Sparkles className="w-3 h-3 text-rust-500" />
                        <span className="text-xs font-medium text-rust-700">
                          {story.highlightMoment}
                        </span>
                      </div>
                    </div>

                    {/* Engagement */}
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => handleLike(story.id)}
                        className={`flex items-center space-x-1 transition-colors ${
                          likedStories.has(story.id) ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${likedStories.has(story.id) ? 'fill-current' : ''}`} />
                        <span className="text-xs">{story.totalLikes}</span>
                      </button>
                      <div className="flex items-center space-x-1 text-gray-500">
                        <MessageCircle className="w-4 h-4" />
                        <span className="text-xs">{story.totalComments}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'live' && (
          <div className="card-glass-medium rounded-2xl p-8 border border-white/40">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <Instagram className="w-6 h-6 text-primary-500" />
                <h3 className="text-xl font-semibold text-gray-900">Live Updates</h3>
              </div>
              <p className="text-gray-600">Real-time updates from guests currently staying at this property</p>
            </div>
            
            {/* Live Feed Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayStories.slice(0, 6).map((story, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <div className="flex items-center space-x-3 mb-3">
                    <img
                      src={story.userAvatar}
                      alt={story.username}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">{story.username}</h4>
                      <p className="text-xs text-gray-500">{story.timestamp}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm mb-3">{story.photos[0].caption}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>❤️ {story.totalLikes}</span>
                    <span>💬 {story.totalComments}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'highlights' && (
          <div className="card-glass-medium rounded-2xl p-8 border border-white/40">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <Award className="w-6 h-6 text-primary-500" />
                <h3 className="text-xl font-semibold text-gray-900">Property Highlights</h3>
              </div>
              <p className="text-gray-600">Most loved moments and experiences shared by our guests</p>
            </div>
            
            {/* Highlights Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'Sunset Views', count: '89%', icon: Eye },
                { title: 'Breakfast Experience', count: '94%', icon: Award },
                { title: 'Service Quality', count: '97%', icon: TrendingUp },
                { title: 'Location', count: '92%', icon: MapPin },
                { title: 'Cleanliness', count: '96%', icon: Award },
                { title: 'Value for Money', count: '91%', icon: Star }
              ].map((highlight, index) => (
                <div key={index} className="bg-gradient-to-r from-primary-50 to-cream-50 rounded-xl p-6 border border-primary-100 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <highlight.icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">{highlight.title}</h4>
                  <div className="text-2xl font-bold text-rust-600">{highlight.count}</div>
                  <p className="text-sm text-gray-600 mt-1">of guests loved this</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Call to Action */}
          <div className="text-center mt-12">
            <div className="bg-gradient-to-r from-primary-50 to-cream-50 rounded-2xl p-8 border border-primary-100">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              {propertyId ? 'Ready to Create Your Own Story?' : 'Inspired by These Experiences?'}
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              {propertyId 
                ? 'Join hundreds of satisfied guests who have made this property their perfect getaway'
                : 'Start your journey today and discover the luxury that awaits you'
              }
            </p>
            <button className="inline-flex items-center space-x-2 px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium transition-colors shadow-sm">
              <Camera className="w-4 h-4" />
              <span>{propertyId ? 'Book This Property' : 'Explore Properties'}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstagramTestimonials;