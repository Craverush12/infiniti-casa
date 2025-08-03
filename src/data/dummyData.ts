import type { Database } from '../lib/database.types';
import { getPropertyImageUrls, updatePropertyWithLocalAssets } from '../utils/propertyAssets';

type Property = Database['public']['Tables']['properties']['Row'];
type UserProfile = Database['public']['Tables']['user_profiles']['Row'];
type Booking = Database['public']['Tables']['bookings']['Row'];

// Dummy User Profiles
export const dummyUsers: UserProfile[] = [
  {
    id: '1',
    phone: '+91-98765-43210',
    full_name: 'Priya Sharma',
    date_of_birth: null,
    nationality: null,
    profile_image_url: null,
    bio: null,
    preferred_language: 'en',
    marketing_consent: true,
    newsletter_subscribed: true,
    preferences: {
      notifications: true,
      language: 'en',
      theme: 'light',
      currency: 'INR'
    },
    created_at: '2024-01-15T10:30:00Z',
    updated_at: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    phone: '+91-98765-43211',
    full_name: 'Raj Patel',
    date_of_birth: null,
    nationality: null,
    profile_image_url: null,
    bio: null,
    preferred_language: 'en',
    marketing_consent: true,
    newsletter_subscribed: true,
    preferences: {
      notifications: true,
      language: 'en',
      theme: 'dark',
      currency: 'INR'
    },
    created_at: '2024-01-10T14:20:00Z',
    updated_at: '2024-01-10T14:20:00Z'
  },
  {
    id: '3',
    phone: '+91-98765-43212',
    full_name: 'Sarah Johnson',
    date_of_birth: null,
    nationality: null,
    profile_image_url: null,
    bio: null,
    preferred_language: 'en',
    marketing_consent: false,
    newsletter_subscribed: false,
    preferences: {
      notifications: false,
      language: 'en',
      theme: 'light',
      currency: 'USD'
    },
    created_at: '2024-01-05T09:15:00Z',
    updated_at: '2024-01-05T09:15:00Z'
  }
];

// Properties data
export const dummyProperties: Property[] = [
  {
    id: 1,
    name: 'Luxury Penthouse with Sea View',
    location: 'Worli, Mumbai',
    description: 'An exclusive penthouse with 360-degree city views, featuring luxury amenities, private terrace, and personalized service. The ultimate luxury experience in Mumbai\'s most prestigious neighborhood.',
    price: 25000,
    guests: 6,
    bedrooms: 3,
    bathrooms: 3,
    category: 'luxury',
    aesthetic: 'modern',
    virtual_tour_url: null,
    video_url: null,
    images: getPropertyImageUrls('Luxury Penthouse with Sea View'),
    features: {
      amenities: ['WiFi', 'Air Conditioning', 'Kitchen', 'Private Terrace', 'Butler Service', 'Valet Parking'],
      rating: 4.9,
      reviews_count: 203,
      is_available: true
    },
    story: 'Sky Lounge was created as the ultimate luxury experience in Mumbai. Every element has been thoughtfully designed to provide the highest level of comfort and service, from the 360-degree city views to the personalized butler service. Located in Mumbai\'s most prestigious neighborhood, this property offers guests a unique opportunity to experience the pinnacle of luxury living.',
    testimonials: [
      {
        user: 'Michael R.',
        rating: 5,
        comment: 'The ultimate luxury experience. The views and service are unmatched.',
        date: '2024-01-30'
      },
      {
        user: 'Priya S.',
        rating: 5,
        comment: 'Absolutely stunning penthouse with incredible city views. Perfect for special occasions.',
        date: '2024-01-28'
      }
    ],
    highlights: ['360° City Views', 'Luxury Amenities', 'Private Terrace', 'Exclusive Service'],
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 2,
    name: 'Modern Studio in Bandra West',
    location: 'Bandra West, Mumbai',
    description: 'Modern white studio in the heart of Bandra, featuring smart layout, contemporary design, and all modern amenities. Perfect for solo travelers, couples, or digital nomads seeking a comfortable base in the heart of Bandra.',
    price: 7500,
    guests: 2,
    bedrooms: 1,
    bathrooms: 1,
    category: 'modern',
    aesthetic: 'contemporary',
    virtual_tour_url: null,
    video_url: null,
    images: getPropertyImageUrls('Modern Studio in Bandra West'),
    features: {
      amenities: ['WiFi', 'Air Conditioning', 'Kitchen', 'Smart TV', 'Work Desk', 'Balcony'],
      rating: 4.6,
      reviews_count: 189,
      is_available: true
    },
    story: 'The Little White Bandra Studio was created as a modern sanctuary for the urban explorer. Every element has been thoughtfully designed to provide comfort and functionality, from the smart layout to the contemporary furnishings. Located in the heart of Bandra West, this property offers guests a unique opportunity to experience the authentic essence of urban living.',
    testimonials: [
      {
        user: 'Alex K.',
        rating: 5,
        comment: 'Perfect location and modern amenities. The studio layout is brilliant.',
        date: '2024-01-25'
      },
      {
        user: 'Maria S.',
        rating: 4,
        comment: 'Great stay in the heart of Bandra. Clean and comfortable.',
        date: '2024-01-20'
      }
    ],
    highlights: ['Smart Studio Layout', 'Prime Bandra Location', 'Modern Amenities', 'Bandra Vibes'],
    created_at: '2024-01-02T00:00:00Z',
    updated_at: '2024-01-02T00:00:00Z'
  },
  {
    id: 3,
    name: 'Heritage Villa in Colaba',
    location: 'Colaba, Mumbai',
    description: 'This unique property combines traditional Indian design elements with modern comfort, creating a perfect sanctuary for travelers seeking an immersive cultural experience.',
    price: 13500,
    guests: 4,
    bedrooms: 2,
    bathrooms: 2,
    category: 'heritage',
    aesthetic: 'traditional',
    virtual_tour_url: null,
    video_url: null,
    images: getPropertyImageUrls('Heritage Villa in Colaba'),
    features: {
      amenities: ['WiFi', 'Air Conditioning', 'Kitchen', 'Garden', 'Traditional Decor', 'Cultural Experience'],
      rating: 4.8,
      reviews_count: 156,
      is_available: true
    },
    story: 'India House was created as a celebration of traditional Indian hospitality. Every element has been thoughtfully designed to showcase the authentic essence of Indian living, from the handcrafted furniture to the traditional artwork. Located in the historic Colaba area, this property offers guests a unique opportunity to experience the rich cultural heritage of Mumbai.',
    testimonials: [
      {
        user: 'Priya M.',
        rating: 5,
        comment: 'Absolutely magical! The traditional design and cultural elements made our stay truly authentic. Perfect for experiencing Indian hospitality.',
        date: '2024-01-25'
      },
      {
        user: 'Rajesh K.',
        rating: 5,
        comment: 'The heritage charm and traditional hospitality were incredible. A truly unique experience.',
        date: '2024-01-20'
      }
    ],
    highlights: ['Traditional Indian Design', 'Cultural Experience', 'Authentic Hospitality', 'Indian Heritage'],
    created_at: '2024-01-03T00:00:00Z',
    updated_at: '2024-01-03T00:00:00Z'
  },
  {
    id: 4,
    name: 'Zen Retreat in South Mumbai',
    location: 'South Mumbai',
    description: 'This sophisticated retreat combines contemporary design with mindful living, creating the perfect sanctuary for modern travelers seeking balance in the heart of the city.',
    price: 11000,
    guests: 2,
    bedrooms: 1,
    bathrooms: 1,
    category: 'wellness',
    aesthetic: 'zen',
    virtual_tour_url: null,
    video_url: null,
    images: getPropertyImageUrls('Zen Retreat in South Mumbai'),
    features: {
      amenities: ['WiFi', 'Air Conditioning', 'Kitchen', 'Meditation Corner', 'City Views', 'Natural Materials'],
      rating: 4.7,
      reviews_count: 142,
      is_available: true
    },
    story: 'City Zen was created as a modern sanctuary for the urban professional. Every element has been thoughtfully designed to promote both productivity and wellness, from the dedicated workspace to the meditation corner. Located in the heart of Mumbai\'s business district, this property offers guests a unique opportunity to experience the perfect balance of work and wellness.',
    testimonials: [
      {
        user: 'Sarah L.',
        rating: 5,
        comment: 'The zen atmosphere helped me stay focused during my business trip. The modern amenities and peaceful design are exactly what I needed.',
        date: '2024-01-20'
      },
      {
        user: 'David K.',
        rating: 4,
        comment: 'Perfect for workation. The meditation corner was a great addition.',
        date: '2024-01-15'
      }
    ],
    highlights: ['Dedicated Meditation Corner', 'City Views', 'Natural Materials', 'Modern Design'],
    created_at: '2024-01-04T00:00:00Z',
    updated_at: '2024-01-04T00:00:00Z'
  },
  {
    id: 5,
    name: 'Charming Cottage in Bandra',
    location: 'Bandra West, Mumbai',
    description: 'This unique property combines cozy design with modern amenities, creating an ideal sanctuary for travelers seeking an authentic Bandra experience.',
    price: 8500,
    guests: 3,
    bedrooms: 2,
    bathrooms: 1,
    category: 'cottage',
    aesthetic: 'charming',
    virtual_tour_url: null,
    video_url: null,
    images: getPropertyImageUrls('Charming Cottage in Bandra'),
    features: {
      amenities: ['WiFi', 'Air Conditioning', 'Kitchen', 'Garden', 'Cozy Interior', 'Bandra Charm'],
      rating: 4.6,
      reviews_count: 178,
      is_available: true
    },
    story: 'Bandra Cottage was created as a charming retreat in the heart of Bandra. Every element has been thoughtfully designed to provide comfort and character, from the cozy furnishings to the peaceful garden. Located in the heart of Bandra West, this property offers guests a unique opportunity to experience the authentic essence of Bandra living.',
    testimonials: [
      {
        user: 'Anita R.',
        rating: 5,
        comment: 'Charming cottage with perfect location. The garden was a lovely surprise.',
        date: '2024-01-22'
      },
      {
        user: 'Rahul S.',
        rating: 4,
        comment: 'Great stay in a cozy cottage. Perfect for a peaceful retreat.',
        date: '2024-01-18'
      }
    ],
    highlights: ['Charming Design', 'Prime Location', 'Comfortable Stay', 'Bandra Charm'],
    created_at: '2024-01-05T00:00:00Z',
    updated_at: '2024-01-05T00:00:00Z'
  },
  {
    id: 6,
    name: 'Artistic Loft in Bandra',
    location: 'Bandra West, Mumbai',
    description: 'This unique space combines contemporary design with local artistic flair, featuring original artwork, a creative studio space, and a private balcony with stunning city views.',
    price: 8500,
    guests: 2,
    bedrooms: 1,
    bathrooms: 1,
    category: 'creative',
    aesthetic: 'artistic',
    virtual_tour_url: null,
    video_url: null,
    images: getPropertyImageUrls('Artistic Loft in Bandra'),
    features: {
      amenities: ['WiFi', 'Air Conditioning', 'Kitchen', 'Art Studio', 'Local Artwork', 'Creative Space'],
      rating: 4.5,
      reviews_count: 123,
      is_available: true
    },
    story: 'The Bandra Art House was created as a creative sanctuary for artists and art lovers. Every element has been thoughtfully designed to inspire creativity and cultural immersion, from the original artwork to the dedicated studio space. Located in the heart of Bandra\'s artistic district, this property offers guests a unique opportunity to experience the vibrant creative culture of Mumbai.',
    testimonials: [
      {
        user: 'Aisha K.',
        rating: 5,
        comment: 'Incredible artistic space with local artwork. Perfect for creative inspiration.',
        date: '2024-01-25'
      },
      {
        user: 'Carlos M.',
        rating: 4,
        comment: 'Beautiful loft with artistic touches. Great for creative work.',
        date: '2024-01-20'
      }
    ],
    highlights: ['Artistic Design', 'Creative Spaces', 'Local Artwork', 'Cultural Experience'],
    created_at: '2024-01-06T00:00:00Z',
    updated_at: '2024-01-06T00:00:00Z'
  }
];

// Dummy Bookings
export const dummyBookings: Booking[] = [
  {
    id: 1,
    user_id: '1',
    property_id: 1,
    check_in: '2024-02-15',
    check_out: '2024-02-18',
    guests: 2,
    total_amount: 88500,
    status: 'confirmed',
    payment_status: 'completed',
    special_requests: 'Early check-in if possible',
    confirmation_code: 'BK-20240120-001',
    guest_details: {
      name: 'Priya Sharma',
      phone: '+91-98765-43210',
      email: 'priya.sharma@example.com'
    },
    created_at: '2024-01-20T10:30:00Z',
    updated_at: '2024-01-20T10:30:00Z'
  },
  {
    id: 2,
    user_id: '2',
    property_id: 2,
    check_in: '2024-02-20',
    check_out: '2024-02-22',
    guests: 1,
    total_amount: 18100,
    status: 'confirmed',
    payment_status: 'completed',
    special_requests: 'Late check-out',
    confirmation_code: 'BK-20240118-002',
    guest_details: {
      name: 'Raj Patel',
      phone: '+91-98765-43211',
      email: 'raj.patel@example.com'
    },
    created_at: '2024-01-18T14:20:00Z',
    updated_at: '2024-01-18T14:20:00Z'
  },
  {
    id: 3,
    user_id: '3',
    property_id: 3,
    check_in: '2024-02-10',
    check_out: '2024-02-12',
    guests: 4,
    total_amount: 32100,
    status: 'confirmed',
    payment_status: 'completed',
    special_requests: 'Extra towels needed',
    confirmation_code: 'BK-20240115-003',
    guest_details: {
      name: 'Sarah Johnson',
      phone: '+91-98765-43212',
      email: 'sarah.johnson@example.com'
    },
    created_at: '2024-01-15T09:15:00Z',
    updated_at: '2024-01-15T09:15:00Z'
  },
  {
    id: 4,
    user_id: '1',
    property_id: 4,
    check_in: '2024-03-01',
    check_out: '2024-03-05',
    guests: 2,
    total_amount: 52400,
    status: 'pending',
    payment_status: 'pending',
    special_requests: 'Celebration setup',
    confirmation_code: null,
    guest_details: {
      name: 'Priya Sharma',
      phone: '+91-98765-43210',
      email: 'priya.sharma@example.com'
    },
    created_at: '2024-01-25T16:45:00Z',
    updated_at: '2024-01-25T16:45:00Z'
  }
];

// Dummy Categories
export const dummyCategories = [
  'luxury',
  'heritage',
  'creative',
  'wellness',
  'studio',
  'cottage'
];

// Dummy Aesthetics
export const dummyAesthetics = [
  'modern',
  'traditional',
  'artistic',
  'zen',
  'charming',
  'luxury'
];

// Dummy Locations
export const dummyLocations = [
  'Bandra West',
  'Worli',
  'Fort',
  'Lower Parel'
];

// Dummy OTP Data
export const dummyOTPData = {
  '9876543210': {
    otp: '123456',
    expires_at: new Date(Date.now() + 10 * 60 * 1000).toISOString(),
    is_used: false
  }
};

// Dummy Admin Data
export const dummyAdminData = {
  totalUsers: 156,
  totalProperties: 6,
  totalBookings: 342,
  totalRevenue: 2845000,
  monthlyStats: {
    newUsers: 23,
    newBookings: 45,
    revenue: 450000
  },
  recentBookings: dummyBookings.slice(0, 5),
  popularProperties: dummyProperties.slice(0, 4)
};

// Helper function to simulate network delay
export const simulateDelay = (ms: number = 500) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// Helper function to generate random ID
export const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
}; 