import type { Database } from '../lib/database.types';

type Property = Database['public']['Tables']['properties']['Row'];
type UserProfile = Database['public']['Tables']['user_profiles']['Row'];
type Booking = Database['public']['Tables']['bookings']['Row'];

// Dummy User Profiles
export const dummyUsers: UserProfile[] = [
  {
    id: '1',
    phone: '+91-98765-43210',
    full_name: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    is_verified: true,
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
    email: 'raj.patel@example.com',
    is_verified: true,
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
    email: 'sarah.johnson@example.com',
    is_verified: true,
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

// Dummy Properties
export const dummyProperties: Property[] = [
  {
    id: 1,
    name: 'Sea View Zen Loft',
    description: 'A minimalist loft with breathtaking sea views, perfect for those seeking tranquility and luxury. Features floor-to-ceiling windows, a private balcony, and contemporary furnishings.',
    location: 'Bandra West',
    guests: 4,
    bedrooms: 2,
    bathrooms: 2,
    price: 8500,
    category: 'luxury',
    aesthetic: 'minimalist',
    virtual_tour_url: null,
    video_url: null,
    images: [
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      'https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop'
    ],
    features: {
      amenities: ['WiFi', 'Air Conditioning', 'Kitchen', 'Balcony', 'Sea View', 'Parking'],
      rating: 4.9,
      reviews_count: 127,
      is_available: true
    },
    story: 'This stunning loft was designed with tranquility in mind, offering guests a peaceful retreat from the bustling city below.',
    testimonials: [
      {
        user: 'Priya S.',
        rating: 5,
        comment: 'Absolutely breathtaking views and perfect for our anniversary!'
      }
    ],
    highlights: ['Sea View', 'Private Balcony', 'Minimalist Design', 'Luxury Amenities'],
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 2,
    name: 'Heritage Garden Cottage',
    description: 'A charming heritage cottage nestled in a lush garden, offering a perfect blend of colonial charm and modern comfort. Features vintage furniture and a private garden.',
    location: 'Colaba',
    address: 'Cuffe Parade, Colaba, Mumbai',
    price: 12000,
    price_per_night: true,
    guests: 6,
    bedrooms: 3,
    bathrooms: 2,
    category: 'heritage',
    aesthetic: 'colonial',
    amenities: ['WiFi', 'Garden', 'Kitchen', 'Heritage', 'Parking', 'Security'],
    images: [
      'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop'
    ],
    rating: 4.8,
    reviews_count: 89,
    is_available: true,
    host_id: '2',
    created_at: '2024-01-02T00:00:00Z',
    updated_at: '2024-01-02T00:00:00Z'
  },
  {
    id: 3,
    name: 'Minimalist Sky Suite',
    description: 'A sophisticated sky suite with panoramic city views, featuring clean lines, neutral tones, and state-of-the-art amenities. Perfect for business travelers.',
    location: 'Lower Parel',
    address: 'One Horizon Center, Lower Parel, Mumbai',
    price: 15000,
    price_per_night: true,
    guests: 2,
    bedrooms: 1,
    bathrooms: 1,
    category: 'business',
    aesthetic: 'minimalist',
    amenities: ['WiFi', 'Air Conditioning', 'Kitchen', 'City View', 'Gym Access', 'Concierge'],
    images: [
      'https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop'
    ],
    rating: 4.7,
    reviews_count: 156,
    is_available: true,
    host_id: '3',
    created_at: '2024-01-03T00:00:00Z',
    updated_at: '2024-01-03T00:00:00Z'
  },
  {
    id: 4,
    name: 'Penthouse Sky Lounge',
    description: 'An exclusive penthouse with 360-degree city views, featuring luxury amenities, private terrace, and personalized service. The ultimate luxury experience.',
    location: 'Worli',
    address: 'Worli Sea Face, Worli, Mumbai',
    price: 25000,
    price_per_night: true,
    guests: 8,
    bedrooms: 4,
    bathrooms: 3,
    category: 'luxury',
    aesthetic: 'modern',
    amenities: ['WiFi', 'Air Conditioning', 'Kitchen', 'Terrace', 'Pool', 'Butler Service'],
    images: [
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      'https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop'
    ],
    rating: 4.9,
    reviews_count: 203,
    is_available: true,
    host_id: '1',
    created_at: '2024-01-04T00:00:00Z',
    updated_at: '2024-01-04T00:00:00Z'
  },
  {
    id: 5,
    name: 'Art Loft Bandra',
    description: 'A creative loft space filled with local artwork and contemporary design. Perfect for artists and creative professionals seeking inspiration.',
    location: 'Bandra West',
    address: 'Carter Road, Bandra West, Mumbai',
    price: 9500,
    price_per_night: true,
    guests: 3,
    bedrooms: 1,
    bathrooms: 1,
    category: 'creative',
    aesthetic: 'artistic',
    amenities: ['WiFi', 'Air Conditioning', 'Kitchen', 'Art Studio', 'Balcony', 'Creative Space'],
    images: [
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      'https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop'
    ],
    rating: 4.6,
    reviews_count: 78,
    is_available: true,
    host_id: '2',
    created_at: '2024-01-05T00:00:00Z',
    updated_at: '2024-01-05T00:00:00Z'
  },
  {
    id: 6,
    name: 'Zen Suite',
    description: 'A peaceful zen-inspired suite with natural materials, meditation space, and calming aesthetics. Perfect for wellness retreats and mindful travelers.',
    location: 'Juhu',
    address: 'Juhu Beach Road, Juhu, Mumbai',
    price: 11000,
    price_per_night: true,
    guests: 2,
    bedrooms: 1,
    bathrooms: 1,
    category: 'wellness',
    aesthetic: 'zen',
    amenities: ['WiFi', 'Air Conditioning', 'Kitchen', 'Meditation Space', 'Garden', 'Yoga Studio'],
    images: [
      'https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop'
    ],
    rating: 4.8,
    reviews_count: 92,
    is_available: true,
    host_id: '3',
    created_at: '2024-01-06T00:00:00Z',
    updated_at: '2024-01-06T00:00:00Z'
  },
  {
    id: 7,
    name: 'Studio Bandra',
    description: 'A cozy studio apartment in the heart of Bandra, perfect for solo travelers or couples. Features modern amenities and a prime location.',
    location: 'Bandra West',
    address: 'Linking Road, Bandra West, Mumbai',
    price: 6500,
    price_per_night: true,
    guests: 2,
    bedrooms: 1,
    bathrooms: 1,
    category: 'studio',
    aesthetic: 'modern',
    amenities: ['WiFi', 'Air Conditioning', 'Kitchen', 'Balcony', 'Central Location'],
    images: [
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop'
    ],
    rating: 4.5,
    reviews_count: 134,
    is_available: true,
    host_id: '1',
    created_at: '2024-01-07T00:00:00Z',
    updated_at: '2024-01-07T00:00:00Z'
  },
  {
    id: 8,
    name: 'Colonial Manor',
    description: 'A grand colonial manor with period architecture, antique furnishings, and a rich history. Experience the elegance of a bygone era.',
    location: 'Colaba',
    address: 'Fort Area, Colaba, Mumbai',
    price: 18000,
    price_per_night: true,
    guests: 10,
    bedrooms: 5,
    bathrooms: 3,
    category: 'heritage',
    aesthetic: 'colonial',
    amenities: ['WiFi', 'Air Conditioning', 'Kitchen', 'Garden', 'Library', 'Butler Service'],
    images: [
      'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop'
    ],
    rating: 4.9,
    reviews_count: 167,
    is_available: true,
    host_id: '2',
    created_at: '2024-01-08T00:00:00Z',
    updated_at: '2024-01-08T00:00:00Z'
  }
];

// Dummy Bookings
export const dummyBookings: Booking[] = [
  {
    id: '1',
    user_id: '1',
    property_id: 1,
    check_in: '2024-02-15',
    check_out: '2024-02-18',
    guests: 2,
    total_amount: 25500,
    status: 'confirmed',
    payment_status: 'paid',
    special_requests: 'Early check-in if possible',
    created_at: '2024-01-20T10:30:00Z',
    updated_at: '2024-01-20T10:30:00Z'
  },
  {
    id: '2',
    user_id: '2',
    property_id: 3,
    check_in: '2024-02-20',
    check_out: '2024-02-22',
    guests: 1,
    total_amount: 30000,
    status: 'confirmed',
    payment_status: 'paid',
    special_requests: 'Late check-out',
    created_at: '2024-01-18T14:20:00Z',
    updated_at: '2024-01-18T14:20:00Z'
  },
  {
    id: '3',
    user_id: '3',
    property_id: 2,
    check_in: '2024-02-10',
    check_out: '2024-02-12',
    guests: 4,
    total_amount: 24000,
    status: 'completed',
    payment_status: 'paid',
    special_requests: 'Extra towels needed',
    created_at: '2024-01-15T09:15:00Z',
    updated_at: '2024-01-15T09:15:00Z'
  },
  {
    id: '4',
    user_id: '1',
    property_id: 4,
    check_in: '2024-03-01',
    check_out: '2024-03-05',
    guests: 6,
    total_amount: 100000,
    status: 'pending',
    payment_status: 'pending',
    special_requests: 'Celebration setup',
    created_at: '2024-01-25T16:45:00Z',
    updated_at: '2024-01-25T16:45:00Z'
  }
];

// Dummy Categories
export const dummyCategories = [
  'luxury',
  'heritage',
  'business',
  'creative',
  'wellness',
  'studio',
  'family',
  'romantic'
];

// Dummy Aesthetics
export const dummyAesthetics = [
  'minimalist',
  'colonial',
  'modern',
  'artistic',
  'zen',
  'vintage',
  'industrial',
  'tropical'
];

// Dummy Locations
export const dummyLocations = [
  'Bandra West',
  'Colaba',
  'Lower Parel',
  'Worli',
  'Juhu',
  'Andheri West',
  'Powai',
  'Bandra East'
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
  totalProperties: 8,
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