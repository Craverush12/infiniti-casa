import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Star, Camera, MapPin, Clock, Users, Sparkles, ArrowLeft, ArrowRight, Play, Pause, Instagram, Eye, Calendar, Award, Zap, ChevronRight, ChevronLeft, TrendingUp, Award as AwardIcon, CheckCircle, Shield, Quote, User, Camera as CameraIcon, MapPin as MapPinIcon, Clock as ClockIcon, Users as UsersIcon, Home, BookOpen, Briefcase } from 'lucide-react';
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
    emotion: string;
  }[];
  experienceType: 'family' | 'romantic' | 'business' | 'solo' | 'group';
  highlightMoment: string;
  emotionalImpact: string;
  recommendation: string;
  returnIntent: boolean;
  socialProof: {
    followers: number;
    verified: boolean;
    previousStays: number;
  };
}

interface GuestStoriesSectionProps {
  propertyId: number;
  propertyName: string;
  onStoryClick?: (story: GuestStory) => void;
}

const GuestStoriesSection: React.FC<GuestStoriesSectionProps> = ({ 
  propertyId, 
  propertyName, 
  onStoryClick 
}) => {
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'featured' | 'recent' | 'categories'>('featured');
  const [likedStories, setLikedStories] = useState<Set<string>>(new Set());

  // Comprehensive guest stories with psychological triggers
  const guestStories: GuestStory[] = [
    {
      id: '1',
      username: 'Priya Sharma',
      userAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      userHandle: '@priya_sharma',
      location: 'Mumbai, India',
      rating: 5,
      storyTitle: 'A Magical Family Getaway That Changed Everything',
      storyDescription: 'From the moment we stepped into this colonial paradise, every detail exceeded our expectations. The kids were mesmerized by the stained glass windows, and my husband and I found our perfect romantic corner in the garden.',
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
        },
        {
          url: getPropertyImageUrls("Heritage Garden Cottage")[2] || 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
          caption: 'Kids exploring the heritage library - they learned so much! 📚',
          timestamp: '30 minutes ago',
          likes: 156,
          comments: 8
        }
      ],
      totalLikes: 1198,
      totalComments: 85,
      timestamp: '2 hours ago',
      verified: true,
      propertyName: propertyName,
      propertyImage: getPropertyImageUrls("Heritage Garden Cottage")[0] || 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      tags: ['#FamilyGetaway', '#HeritageCharm', '#PerfectWeekend'],
      propertyId: propertyId,
      guestJourney: [
        { phase: 'Arrival', description: 'Warm welcome with traditional tea', icon: Calendar, emotion: 'excited' },
        { phase: 'Settle In', description: 'Perfect room setup and amenities', icon: Award, emotion: 'comfortable' },
        { phase: 'Experience', description: 'Immersive heritage and luxury', icon: Sparkles, emotion: 'amazed' },
        { phase: 'Departure', description: 'Reluctant to leave this paradise', icon: Heart, emotion: 'nostalgic' }
      ],
      experienceType: 'family',
      highlightMoment: 'Garden breakfast with family',
      emotionalImpact: 'Created lasting memories that brought our family closer together',
      recommendation: 'Perfect for families seeking both luxury and cultural immersion',
      returnIntent: true,
      socialProof: {
        followers: 15420,
        verified: true,
        previousStays: 3
      }
    },
    {
      id: '2',
      username: 'Rajesh Mehta',
      userAvatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      userHandle: '@rajesh_mehta',
      location: 'Delhi, India',
      rating: 5,
      storyTitle: 'Our Perfect Anniversary Celebration',
      storyDescription: 'Every moment was curated to perfection. The butler service and sunset views created pure magic. We felt like royalty in this stunning property.',
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
        },
        {
          url: getPropertyImageUrls("Art Loft Bandra")[2] || 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
          caption: 'Private dining experience - pure romance 💕',
          timestamp: '1 hour ago',
          likes: 398,
          comments: 25
        }
      ],
      totalLikes: 1456,
      totalComments: 98,
      timestamp: '3 hours ago',
      verified: true,
      propertyName: propertyName,
      propertyImage: getPropertyImageUrls("Art Loft Bandra")[0] || 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      tags: ['#AnniversaryTrip', '#RomanticGetaway', '#LuxuryStay'],
      propertyId: propertyId,
      guestJourney: [
        { phase: 'Arrival', description: 'Champagne welcome and rose petals', icon: Sparkles, emotion: 'romantic' },
        { phase: 'Settle In', description: 'Luxury amenities and art curation', icon: Award, emotion: 'impressed' },
        { phase: 'Experience', description: 'Private dining and sunset views', icon: Heart, emotion: 'enamored' },
        { phase: 'Departure', description: 'Memories that will last forever', icon: Star, emotion: 'fulfilled' }
      ],
      experienceType: 'romantic',
      highlightMoment: 'Private rooftop dinner',
      emotionalImpact: 'Reignited our love and created unforgettable moments',
      recommendation: 'Ideal for couples celebrating special occasions',
      returnIntent: true,
      socialProof: {
        followers: 8920,
        verified: true,
        previousStays: 1
      }
    },
    {
      id: '3',
      username: 'Sarah Johnson',
      userAvatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      userHandle: '@sarah_johnson',
      location: 'London, UK',
      rating: 5,
      storyTitle: 'Business Trip Turned Staycation',
      storyDescription: 'The perfect blend of work and relaxation. The zen atmosphere helped me focus and recharge. I accomplished more in this peaceful environment than in any office.',
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
        },
        {
          url: getPropertyImageUrls("Zen Suite")[2] || 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
          caption: 'Sunrise work session - the best productivity hack 🌅',
          timestamp: '3 hours ago',
          likes: 167,
          comments: 9
        }
      ],
      totalLikes: 892,
      totalComments: 56,
      timestamp: '5 hours ago',
      verified: true,
      propertyName: propertyName,
      propertyImage: getPropertyImageUrls("Zen Suite")[0] || 'https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      tags: ['#BusinessTravel', '#WorkLifeBalance', '#ZenRetreat'],
      propertyId: propertyId,
      guestJourney: [
        { phase: 'Arrival', description: 'Peaceful check-in and orientation', icon: Calendar, emotion: 'calm' },
        { phase: 'Settle In', description: 'Dedicated workspace setup', icon: Award, emotion: 'focused' },
        { phase: 'Experience', description: 'Focus and productivity boost', icon: Zap, emotion: 'energized' },
        { phase: 'Departure', description: 'Refreshed and accomplished', icon: CheckCircle, emotion: 'satisfied' }
      ],
      experienceType: 'business',
      highlightMoment: 'Sunrise work session',
      emotionalImpact: 'Found perfect work-life balance and increased productivity',
      recommendation: 'Excellent for business travelers seeking tranquility',
      returnIntent: true,
      socialProof: {
        followers: 12340,
        verified: true,
        previousStays: 2
      }
    }
  ];

  const experienceCategories = [
    { id: 'family', name: 'Family Getaways', icon: Users, count: 15 },
    { id: 'romantic', name: 'Romantic Escapes', icon: Heart, count: 23 },
    { id: 'business', name: 'Business Travel', icon: Briefcase, count: 8 },
    { id: 'solo', name: 'Solo Adventures', icon: User, count: 12 },
    { id: 'group', name: 'Group Celebrations', icon: Users, count: 6 }
  ];

  const handleLikeStory = (storyId: string) => {
    const newLikedStories = new Set(likedStories);
    if (newLikedStories.has(storyId)) {
      newLikedStories.delete(storyId);
    } else {
      newLikedStories.add(storyId);
    }
    setLikedStories(newLikedStories);
  };

  const currentStory = guestStories[activeStoryIndex];
  const filteredStories = activeTab === 'featured' 
    ? guestStories.filter(story => story.verified)
    : activeTab === 'recent'
    ? guestStories.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    : guestStories;

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-light text-gray-900 mb-4">
            Real Stories from Real Guests
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover how our guests experienced the magic of {propertyName}. Every story is unique, every memory is precious.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-1 bg-gray-100 rounded-2xl p-1">
            {[
              { id: 'featured', name: 'Featured Stories', icon: Award },
              { id: 'recent', name: 'Recent Experiences', icon: Clock },
              { id: 'categories', name: 'By Experience', icon: Users }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-white text-rust-600 shadow-lg'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{tab.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Featured Story Display */}
        {activeTab !== 'categories' && (
          <div className="mb-12">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Story Images */}
                <div className="relative h-96 lg:h-full">
                  <div className="relative h-full">
                    <img
                      src={currentStory.photos[0].url}
                      alt={currentStory.storyTitle}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    
                    {/* Story Info Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="flex items-center space-x-3 mb-3">
                        <img
                          src={currentStory.userAvatar}
                          alt={currentStory.username}
                          className="w-12 h-12 rounded-full border-2 border-white"
                        />
                        <div>
                          <h3 className="text-white font-medium">{currentStory.username}</h3>
                          <p className="text-white/80 text-sm">{currentStory.userHandle}</p>
                        </div>
                        {currentStory.verified && (
                          <div className="ml-auto">
                            <Shield className="w-5 h-5 text-blue-400" />
                          </div>
                        )}
                      </div>
                      
                      {/* Rating */}
                      <div className="flex items-center space-x-2 mb-3">
                        <div className="flex space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < currentStory.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                        <span className="text-white/80 text-sm">{currentStory.rating}.0</span>
                      </div>
                    </div>

                    {/* Navigation */}
                    <button
                      onClick={() => setActiveStoryIndex(prev => prev === 0 ? guestStories.length - 1 : prev - 1)}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300"
                    >
                      <ChevronLeft className="w-6 h-6 text-white" />
                    </button>
                    <button
                      onClick={() => setActiveStoryIndex(prev => prev === guestStories.length - 1 ? 0 : prev + 1)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300"
                    >
                      <ChevronRight className="w-6 h-6 text-white" />
                    </button>
                  </div>
                </div>

                {/* Story Content */}
                <div className="p-8 lg:p-12">
                  <div className="mb-6">
                    <h3 className="text-2xl font-medium text-gray-900 mb-3">
                      {currentStory.storyTitle}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {currentStory.storyDescription}
                    </p>
                  </div>

                  {/* Guest Journey Timeline */}
                  <div className="mb-6">
                    <h4 className="text-lg font-medium text-gray-900 mb-4">Their Journey</h4>
                    <div className="space-y-3">
                      {currentStory.guestJourney.map((journey, index) => {
                        const Icon = journey.icon;
                        return (
                          <div key={index} className="flex items-start space-x-3">
                            <div className="flex-shrink-0 w-8 h-8 bg-rust-100 rounded-full flex items-center justify-center">
                              <Icon className="w-4 h-4 text-rust-600" />
                            </div>
                            <div className="flex-1">
                              <h5 className="text-sm font-medium text-gray-900">{journey.phase}</h5>
                              <p className="text-sm text-gray-600">{journey.description}</p>
                              <span className="text-xs text-rust-500 font-medium">{journey.emotion}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Highlight Moment */}
                  <div className="bg-gradient-to-r from-rust-50 to-orange-50 rounded-xl p-4 mb-6">
                    <h4 className="text-lg font-medium text-gray-900 mb-2">✨ Highlight Moment</h4>
                    <p className="text-gray-700 italic">"{currentStory.highlightMoment}"</p>
                  </div>

                  {/* Social Proof */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => handleLikeStory(currentStory.id)}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                          likedStories.has(currentStory.id)
                            ? 'bg-red-100 text-red-600'
                            : 'bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${likedStories.has(currentStory.id) ? 'fill-current' : ''}`} />
                        <span className="text-sm font-medium">{currentStory.totalLikes}</span>
                      </button>
                      <button className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all duration-300">
                        <MessageCircle className="w-4 h-4" />
                        <span className="text-sm font-medium">{currentStory.totalComments}</span>
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">{currentStory.timestamp}</p>
                      <p className="text-xs text-gray-400">{currentStory.socialProof.followers.toLocaleString()} followers</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Experience Categories */}
        {activeTab === 'categories' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {experienceCategories.map((category) => {
              const Icon = category.icon;
              const categoryStories = guestStories.filter(story => story.experienceType === category.id);
              const featuredStory = categoryStories[0];
              
              return (
                <div key={category.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="relative h-48">
                    <img
                      src={featuredStory?.photos[0].url || 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'}
                      alt={category.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                      <div className="flex items-center space-x-2 text-white">
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{category.name}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl font-bold text-gray-900">{category.count}</span>
                      <span className="text-sm text-gray-500">stories</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">
                      Discover how guests experienced {propertyName} for {category.name.toLowerCase()}
                    </p>
                    <button className="w-full bg-rust-500 text-white py-2 rounded-lg hover:bg-rust-600 transition-colors font-medium">
                      View Stories
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Story Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStories.map((story) => (
            <div
              key={story.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
              onClick={() => onStoryClick?.(story)}
            >
              <div className="relative h-48">
                <img
                  src={story.photos[0].url}
                  alt={story.storyTitle}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
                {/* Story Info */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <img
                      src={story.userAvatar}
                      alt={story.username}
                      className="w-8 h-8 rounded-full border border-white"
                    />
                    <div>
                      <h4 className="text-white font-medium text-sm">{story.username}</h4>
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span className="text-white/80 text-xs">{story.rating}.0</span>
                      </div>
                    </div>
                    {story.verified && (
                      <Shield className="w-4 h-4 text-blue-400 ml-auto" />
                    )}
                  </div>
                </div>

                {/* Experience Type Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-2 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full">
                    {story.experienceType}
                  </span>
                </div>
              </div>
              
              <div className="p-4">
                <h4 className="font-medium text-gray-900 mb-2 line-clamp-2">
                  {story.storyTitle}
                </h4>
                <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                  {story.storyDescription}
                </p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {story.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Engagement */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLikeStory(story.id);
                      }}
                      className={`flex items-center space-x-1 ${
                        likedStories.has(story.id) ? 'text-red-500' : 'text-gray-400'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${likedStories.has(story.id) ? 'fill-current' : ''}`} />
                      <span className="text-xs">{story.totalLikes}</span>
                    </button>
                    <div className="flex items-center space-x-1 text-gray-400">
                      <MessageCircle className="w-4 h-4" />
                      <span className="text-xs">{story.totalComments}</span>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">{story.timestamp}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-rust-500 to-orange-500 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-medium mb-4">Share Your Story</h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Have you experienced the magic of {propertyName}? Share your story and inspire others to create their own memories.
            </p>
            <button className="bg-white text-rust-600 px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors">
              Share Your Experience
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuestStoriesSection; 