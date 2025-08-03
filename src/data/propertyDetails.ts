import { getPropertyImageUrls } from '../utils/propertyAssets';

export interface PropertyDetailData {
  id: number;
  name: string;
  hero: {
    title: string;
    subtitle: string;
    images: string[];
    highlights: string[];
    location: string;
    price: number;
    rating: number;
    reviews_count: number;
  };
  story: {
    title: string;
    content: string;
    images: string[];
    features: string[];
  };
  amenities: {
    categories: string[];
    features: string[];
    uniqueFeatures: string[];
  };
  location: {
    neighborhood: string;
    address: string;
    nearbyAttractions: string[];
    transportation: {
      airport_distance: string;
      railway_station: string;
      metro_station: string;
    };
  };
  host: {
    name: string;
    bio: string;
    responseRate: number;
    responseTime: string;
    languages: string[];
    memberSince: string;
    verified: boolean;
    superhost: boolean;
  };
  testimonials: Array<{
    user: string;
    rating: number;
    comment: string;
    date: string;
    stayDuration: string;
  }>;
  booking: {
    checkIn: string;
    checkOut: string;
    cancellationPolicy: string;
    minimumNights: number;
    instantBookable: boolean;
  };
  pricing: {
    basePrice: number;
    cleaningFee: number;
    serviceFee: number;
    totalPerNight: number;
    weeklyDiscount: number;
    monthlyDiscount: number;
  };
}

// Property-specific detailed data aligned with Airbnb listings
export const propertyDetails: Record<number, PropertyDetailData> = {
  1: {
    id: 1,
    name: 'Luxury Penthouse with Sea View',
    hero: {
      title: 'Luxury Penthouse with Sea View',
      subtitle: 'Luxury penthouse with panoramic city views',
      images: getPropertyImageUrls('Luxury Penthouse with Sea View'),
      highlights: ['360° City Views', 'Luxury Amenities', 'Private Terrace', 'Exclusive Service'],
      location: 'Worli, Mumbai',
      price: 25000,
      rating: 4.9,
      reviews_count: 203
    },
    story: {
      title: 'Ultimate Luxury Experience',
      content: 'An exclusive penthouse with 360-degree city views, featuring luxury amenities, private terrace, and personalized service. The ultimate luxury experience in Mumbai\'s most prestigious neighborhood.',
      images: getPropertyImageUrls('Sky Lounge'),
      features: ['360-degree city views', 'Private terrace', 'Luxury amenities', 'Personalized service']
    },
    amenities: {
      categories: ['Luxury', 'Exclusive', 'Premium'],
      features: ['WiFi', 'Air Conditioning', 'Kitchen', 'Private Terrace', 'Butler Service', 'Valet Parking'],
      uniqueFeatures: ['360-degree views', 'Private terrace', 'Butler service', 'Valet parking']
    },
    location: {
      neighborhood: 'Worli',
      address: 'Worli Sea Face, Worli, Mumbai',
      nearbyAttractions: ['Worli Sea Face', 'Bandra-Worli Sea Link', 'High Street Phoenix', 'Worli Fort'],
      transportation: {
        airport_distance: '15 km',
        railway_station: 'Worli',
        metro_station: 'Worli Metro'
      }
    },
    host: {
      name: 'Vikram',
      bio: 'Luxury hospitality expert with a passion for creating unforgettable experiences',
      responseRate: 100,
      responseTime: '15 minutes',
      languages: ['English', 'Hindi', 'French'],
      memberSince: '2018',
      verified: true,
      superhost: true
    },
    testimonials: [
      {
        user: 'Michael R.',
        rating: 5,
        comment: 'The ultimate luxury experience. The views and service are unmatched.',
        date: '2024-01-30',
        stayDuration: '7 nights'
      },
      {
        user: 'Priya S.',
        rating: 5,
        comment: 'Absolutely stunning penthouse with incredible city views. Perfect for special occasions.',
        date: '2024-01-28',
        stayDuration: '3 nights'
      }
    ],
    booking: {
      checkIn: '4:00 PM',
      checkOut: '12:00 PM',
      cancellationPolicy: 'Flexible',
      minimumNights: 3,
      instantBookable: true
    },
    pricing: {
      basePrice: 25000,
      cleaningFee: 2000,
      serviceFee: 2500,
      totalPerNight: 29500,
      weeklyDiscount: 20,
      monthlyDiscount: 30
    }
  },
  2: {
    id: 2,
    name: 'Modern Studio in Bandra West',
    hero: {
      title: 'Modern Studio in Bandra West',
      subtitle: 'Modern white studio in the heart of Bandra',
      images: getPropertyImageUrls('Modern Studio in Bandra West'),
      highlights: ['Smart Studio Layout', 'Prime Bandra Location', 'Modern Amenities', 'Bandra Vibes'],
      location: 'Bandra West, Mumbai',
      price: 7500,
      rating: 4.6,
      reviews_count: 189
    },
    story: {
      title: 'Modern Sanctuary for Urban Explorers',
      content: 'The Little White Bandra Studio was created as a modern sanctuary for the urban explorer. Every element has been thoughtfully designed to provide comfort and functionality, from the smart layout to the contemporary furnishings.',
      images: getPropertyImageUrls('The Little White Bandra Studio'),
      features: ['Smart layout', 'Contemporary design', 'Modern amenities', 'Urban comfort']
    },
    amenities: {
      categories: ['Modern', 'Urban', 'Comfort'],
      features: ['WiFi', 'Air Conditioning', 'Kitchen', 'Balcony', 'Central Location', 'Dedicated Workspace'],
      uniqueFeatures: ['Smart studio layout', 'Prime location', 'Modern design', 'Bandra vibes']
    },
    location: {
      neighborhood: 'Bandra West',
      address: 'Linking Road, Bandra West, Mumbai, Maharashtra, India',
      nearbyAttractions: ['Linking Road Shopping', 'Bandra Bandstand', 'Carter Road Promenade', 'Bandra Fort'],
      transportation: {
        airport_distance: '8 km',
        railway_station: 'Bandra Terminus',
        metro_station: 'Bandra West Metro'
      }
    },
    host: {
      name: 'Aisha',
      bio: 'Urban explorer who loves sharing the vibrant culture of Bandra',
      responseRate: 100,
      responseTime: '1 hour',
      languages: ['English', 'Hindi', 'Marathi'],
      memberSince: '2020',
      verified: true,
      superhost: true
    },
    testimonials: [
      {
        user: 'Priya M.',
        rating: 5,
        comment: 'Perfect studio for exploring Bandra! The smart layout and prime location made our stay both comfortable and convenient.',
        date: '2024-01-25',
        stayDuration: '5 nights'
      },
      {
        user: 'Rajesh K.',
        rating: 5,
        comment: 'Great modern studio with all the Bandra vibes. The location is perfect for shopping and exploring the neighborhood.',
        date: '2024-01-20',
        stayDuration: '3 nights'
      }
    ],
    booking: {
      checkIn: '3:00 PM',
      checkOut: '11:00 AM',
      cancellationPolicy: 'Flexible',
      minimumNights: 2,
      instantBookable: true
    },
    pricing: {
      basePrice: 7500,
      cleaningFee: 800,
      serviceFee: 750,
      totalPerNight: 9050,
      weeklyDiscount: 10,
      monthlyDiscount: 20
    }
  },
  3: {
    id: 3,
    name: 'Heritage Villa in Colaba',
    hero: {
      title: 'Heritage Villa in Colaba',
      subtitle: 'Traditional Indian heritage villa with modern comforts',
      images: getPropertyImageUrls('Heritage Villa in Colaba'),
      highlights: ['Traditional Indian Design', 'Cultural Experience', 'Authentic Hospitality', 'Indian Heritage'],
      location: 'Colaba, Mumbai',
      price: 13500,
      rating: 4.8,
      reviews_count: 156
    },
    story: {
      title: 'Authentic Indian Hospitality',
      content: 'Experience the authentic essence of Indian hospitality in this beautifully curated heritage-inspired home. This unique property combines traditional Indian design elements with modern comfort, creating a perfect sanctuary for travelers seeking an immersive cultural experience.',
      images: getPropertyImageUrls('India House'),
      features: ['Traditional Indian design', 'Cultural experience', 'Authentic hospitality', 'Heritage elements']
    },
    amenities: {
      categories: ['Cultural', 'Traditional', 'Heritage'],
      features: ['WiFi', 'Air Conditioning', 'Kitchen', 'Traditional Artwork', 'Garden', 'Cultural Experience'],
      uniqueFeatures: ['Traditional Indian design', 'Cultural experience', 'Authentic hospitality', 'Heritage elements']
    },
    location: {
      neighborhood: 'Fort',
      address: 'Fort Area, Mumbai, Maharashtra, India',
      nearbyAttractions: ['Gateway of India', 'Taj Mahal Palace', 'Colaba Causeway', 'Marine Drive'],
      transportation: {
        airport_distance: '18 km',
        railway_station: 'Churchgate',
        metro_station: 'Colaba Metro'
      }
    },
    host: {
      name: 'Priya',
      bio: 'Cultural enthusiast who loves sharing the authentic Indian experience',
      responseRate: 100,
      responseTime: '1 hour',
      languages: ['English', 'Hindi', 'Marathi'],
      memberSince: '2020',
      verified: true,
      superhost: true
    },
    testimonials: [
      {
        user: 'Emma L.',
        rating: 5,
        comment: 'A truly authentic Indian experience. The traditional design and hospitality were incredible.',
        date: '2024-01-25',
        stayDuration: '5 nights'
      },
      {
        user: 'David M.',
        rating: 5,
        comment: 'Perfect for experiencing Indian culture. The property and host were exceptional.',
        date: '2024-01-20',
        stayDuration: '3 nights'
      }
    ],
    booking: {
      checkIn: '3:00 PM',
      checkOut: '11:00 AM',
      cancellationPolicy: 'Flexible',
      minimumNights: 2,
      instantBookable: true
    },
    pricing: {
      basePrice: 13500,
      cleaningFee: 1200,
      serviceFee: 1350,
      totalPerNight: 16050,
      weeklyDiscount: 10,
      monthlyDiscount: 20
    }
  },
  4: {
    id: 4,
    name: 'Zen Retreat in South Mumbai',
    hero: {
      title: 'Zen Retreat in South Mumbai',
      subtitle: 'Peaceful urban retreat with meditation space',
      images: getPropertyImageUrls('Zen Retreat in South Mumbai'),
      highlights: ['Dedicated Meditation Corner', 'City Views', 'Natural Materials', 'Modern Design'],
      location: 'South Mumbai',
      price: 11000,
      rating: 4.7,
      reviews_count: 142
    },
    story: {
      title: 'Urban Sanctuary',
      content: 'Find peace and tranquility in this thoughtfully designed urban retreat that offers respite from city life. The zen atmosphere helps you focus and recharge while enjoying modern comforts.',
      images: getPropertyImageUrls('City Zen'),
      features: ['Zen atmosphere', 'Peaceful retreat', 'Modern comfort', 'Urban sanctuary']
    },
    amenities: {
      categories: ['Wellness', 'Comfort', 'Modern'],
      features: ['WiFi', 'Air Conditioning', 'Kitchen', 'Balcony', 'Dedicated Workspace', 'Meditation Space'],
      uniqueFeatures: ['Zen atmosphere', 'Meditation space', 'Peaceful retreat', 'Urban sanctuary']
    },
    location: {
      neighborhood: 'Lower Parel',
      address: 'One Horizon Center, Lower Parel, Mumbai',
      nearbyAttractions: ['High Street Phoenix', 'Worli Sea Face', 'BKC Business District', 'Lower Parel Station'],
      transportation: {
        airport_distance: '12 km',
        railway_station: 'Lower Parel',
        metro_station: 'Lower Parel Metro'
      }
    },
    host: {
      name: 'Sarah',
      bio: 'Wellness enthusiast who believes in creating peaceful spaces for travelers',
      responseRate: 95,
      responseTime: '2 hours',
      languages: ['English', 'Hindi'],
      memberSince: '2021',
      verified: true,
      superhost: false
    },
    testimonials: [
      {
        user: 'Sarah J.',
        rating: 5,
        comment: 'The perfect blend of work and relaxation. The zen atmosphere helped me focus and recharge.',
        date: '2024-01-25',
        stayDuration: '5 nights'
      },
      {
        user: 'Emma L.',
        rating: 5,
        comment: 'Amazing studio in the heart of the city! The modern amenities and central location made our stay perfect.',
        date: '2024-01-15',
        stayDuration: '3 nights'
      }
    ],
    booking: {
      checkIn: '3:00 PM',
      checkOut: '11:00 AM',
      cancellationPolicy: 'Moderate',
      minimumNights: 2,
      instantBookable: true
    },
    pricing: {
      basePrice: 9500,
      cleaningFee: 900,
      serviceFee: 950,
      totalPerNight: 11350,
      weeklyDiscount: 10,
      monthlyDiscount: 20
    }
  },
  5: {
    id: 5,
    name: 'Charming Cottage in Bandra',
    hero: {
      title: 'Charming Cottage in Bandra',
      subtitle: 'Cozy heritage cottage with garden',
      images: getPropertyImageUrls('Charming Cottage in Bandra'),
      highlights: ['Charming Design', 'Prime Location', 'Comfortable Stay', 'Bandra Charm'],
      location: 'Bandra West, Mumbai',
      price: 8500,
      rating: 4.6,
      reviews_count: 178
    },
    story: {
      title: 'Charming Bandra Retreat',
      content: 'A charming cottage nestled in the heart of Bandra, offering a perfect blend of comfort and character. This unique property combines cozy design with modern amenities, creating an ideal sanctuary for travelers seeking an authentic Bandra experience.',
      images: getPropertyImageUrls('Bandra Cottage'),
      features: ['Charming design', 'Prime location', 'Comfortable stay', 'Bandra charm']
    },
    amenities: {
      categories: ['Comfort', 'Charm', 'Location'],
      features: ['WiFi', 'Air Conditioning', 'Kitchen', 'Balcony', 'Garden', 'Comfortable Living'],
      uniqueFeatures: ['Charming design', 'Prime location', 'Comfortable stay', 'Bandra charm']
    },
    location: {
      neighborhood: 'Bandra West',
      address: 'Carter Road, Bandra West, Mumbai, Maharashtra, India',
      nearbyAttractions: ['Carter Road Promenade', 'Bandra Fort', 'Linking Road Shopping', 'Juhu Beach'],
      transportation: {
        airport_distance: '8 km',
        railway_station: 'Bandra Terminus',
        metro_station: 'Bandra West Metro'
      }
    },
    host: {
      name: 'Rajesh',
      bio: 'Local Bandra enthusiast who loves sharing the neighborhood charm',
      responseRate: 100,
      responseTime: '1 hour',
      languages: ['English', 'Hindi', 'Marathi'],
      memberSince: '2019',
      verified: true,
      superhost: true
    },
    testimonials: [
      {
        user: 'Priya M.',
        rating: 5,
        comment: 'Charming cottage in the perfect location! The comfort and Bandra charm made our stay unforgettable.',
        date: '2024-01-25',
        stayDuration: '5 nights'
      },
      {
        user: 'Rajesh K.',
        rating: 5,
        comment: 'Great cottage with all the comforts. The location is perfect for exploring Bandra.',
        date: '2024-01-20',
        stayDuration: '3 nights'
      }
    ],
    booking: {
      checkIn: '3:00 PM',
      checkOut: '11:00 AM',
      cancellationPolicy: 'Flexible',
      minimumNights: 2,
      instantBookable: true
    },
    pricing: {
      basePrice: 8500,
      cleaningFee: 800,
      serviceFee: 850,
      totalPerNight: 10150,
      weeklyDiscount: 10,
      monthlyDiscount: 20
    }
  },
  6: {
    id: 6,
    name: 'Artistic Loft in Bandra',
    hero: {
      title: 'Artistic Loft in Bandra',
      subtitle: 'Creative space with local artwork',
      images: getPropertyImageUrls('Artistic Loft in Bandra'),
      highlights: ['Artistic Design', 'Creative Spaces', 'Local Artwork', 'Cultural Experience'],
      location: 'Bandra West, Mumbai',
      price: 8500,
      rating: 4.5,
      reviews_count: 123
    },
    story: {
      title: 'Where Art Meets Soul',
      content: 'The Bandra Art House was created as a celebration of Mumbai\'s vibrant artistic community. Every piece of artwork tells a story of the city\'s rich cultural heritage, while the space itself serves as both a comfortable home and an inspiring creative sanctuary.',
      images: getPropertyImageUrls('The Bandra Art House'),
      features: ['Original artwork', 'Creative studio space', 'Cultural heritage', 'Artistic community']
    },
    amenities: {
      categories: ['Creative', 'Cultural', 'Artistic'],
      features: ['WiFi', 'Air Conditioning', 'Kitchen', 'Art Studio', 'Balcony', 'Creative Space'],
      uniqueFeatures: ['Art studio', 'Original artwork', 'Creative space', 'Cultural experience']
    },
    location: {
      neighborhood: 'Bandra West',
      address: 'Carter Road, Bandra West, Mumbai, Maharashtra, India',
      nearbyAttractions: ['Linking Road Shopping', 'Bandra Bandstand', 'Carter Road Promenade', 'Bandra Fort'],
      transportation: {
        airport_distance: '8 km',
        railway_station: 'Bandra Terminus',
        metro_station: 'Bandra West Metro'
      }
    },
    host: {
      name: 'Aisha',
      bio: 'Artist and cultural enthusiast who loves sharing Mumbai\'s creative spirit',
      responseRate: 100,
      responseTime: '1 hour',
      languages: ['English', 'Hindi', 'Marathi'],
      memberSince: '2020',
      verified: true,
      superhost: true
    },
    testimonials: [
      {
        user: 'Priya M.',
        rating: 5,
        comment: 'Perfect studio for exploring Bandra! The smart layout and prime location made our stay both comfortable and convenient.',
        date: '2024-01-25',
        stayDuration: '5 nights'
      },
      {
        user: 'Rajesh K.',
        rating: 5,
        comment: 'Great modern studio with all the Bandra vibes. The location is perfect for shopping and exploring the neighborhood.',
        date: '2024-01-20',
        stayDuration: '3 nights'
      }
    ],
    booking: {
      checkIn: '3:00 PM',
      checkOut: '11:00 AM',
      cancellationPolicy: 'Flexible',
      minimumNights: 2,
      instantBookable: true
    },
    pricing: {
      basePrice: 8500,
      cleaningFee: 800,
      serviceFee: 850,
      totalPerNight: 10150,
      weeklyDiscount: 10,
      monthlyDiscount: 20
    }
  }
};

export const getPropertyDetail = (propertyId: number): PropertyDetailData | null => {
  return propertyDetails[propertyId] || null;
};

export const getAllPropertyDetails = (): PropertyDetailData[] => {
  return Object.values(propertyDetails);
}; 