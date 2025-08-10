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
    name: 'Sky Lounge (Penthouse + Terrace)',
    hero: {
      title: 'Sky Lounge (Penthouse + Terrace)',
      subtitle: 'Unique one-bedroom hall penthouse in Bandra West with panoramic Mumbai skyline & ocean view, private terrace for sunset lounging',
      images: getPropertyImageUrls('Sky Lounge (Penthouse + Terrace)'),
      highlights: ['Great Check-in Experience', 'Vibrant Neighbourhood', 'At-home Coffee', 'Panoramic Views', 'Guest Favourite'],
      location: 'Bandra West, Mumbai, Maharashtra, India',
      price: 22000,
      rating: 4.93,
      reviews_count: 27
    },
    story: {
      title: 'Designed for Dreamers, Creators, Introspection and Imagination',
      content: 'Unique one-bedroom hall penthouse in Bandra West, panoramic Mumbai skyline & ocean view, private terrace for sunset lounging. Designed for dreamers, creators, introspection and imagination. Centrally amidst many cafes and restaurants. The property offers exceptional views from the 13th floor with unobstructed city and sea views. Guests consistently highlight the terrace as the best part, with its magical dining experience under the open night sky. The space is super clean with daily maid service, and hosts are proactive and responsive. No outside visitors allowed for privacy and tranquility.',
      images: getPropertyImageUrls('Sky Lounge (Penthouse + Terrace)'),
      features: ['13th floor panoramic views', 'Private terrace for sunset', 'Pour-over coffee maker', 'Daily maid service', 'Central cafe location']
    },
    amenities: {
      categories: ['Luxury', 'Panoramic Views', 'Premium'],
      features: [
        'Wifi',
        'HDTV',
        'Lift',
        'Free washer – in-unit',
        'Air conditioning',
        'Pour-over coffee maker',
        'Private terrace with panoramic views',
        'Great check-in experience',
        'Vibrant walkable neighbourhood',
        'Daily cleaning service',
        'Self check-in (smartlock)',
        'No outside visitors policy'
      ],
      uniqueFeatures: [
        'One-of-a-kind 1-bedroom penthouse',
        'Panoramic Mumbai skyline views',
        'Private attached terrace',
        '13th floor ocean views',
        'Pour-over coffee maker included',
        'Daily maid service'
      ]
    },
    location: {
      neighborhood: 'Bandra West',
      address: 'Bandra West, Mumbai, Maharashtra, India',
      nearbyAttractions: [
        'Vibrant cafés and restaurants',
        'Local attractions',
        'Walking-friendly neighborhood',
        'Dining options',
        'Central location'
      ],
      transportation: {
        airport_distance: '8 km',
        railway_station: 'Bandra Terminus',
        metro_station: 'Bandra West Metro'
      }
    },
    host: {
      name: 'Sky Lounge Host',
      bio: 'Dedicated to providing exceptional experiences in one of Mumbai\'s most unique penthouses',
      responseRate: 100,
      responseTime: '1 hour',
      languages: ['English', 'Hindi', 'Marathi'],
      memberSince: '2020',
      verified: true,
      superhost: true
    },
    testimonials: [
      {
        user: 'Sushen',
        rating: 5,
        comment: 'Super clean, maid came every morning, balcony view next level, hosts responsive.',
        date: '2024-12-28',
        stayDuration: '4 nights'
      },
      {
        user: 'Nachiket',
        rating: 5,
        comment: 'Sea view from 13th floor was insane, perfect for get-together.',
        date: '2024-12-15',
        stayDuration: '3 nights'
      },
      {
        user: 'Clint',
        rating: 5,
        comment: 'Terrace is the best part, unobstructed city and sea views, host very proactive.',
        date: '2024-12-10',
        stayDuration: '5 nights'
      },
      {
        user: 'Rushabh',
        rating: 5,
        comment: 'Iconic, the photos don\'t do justice, hosts prompt.',
        date: '2024-12-05',
        stayDuration: '2 nights'
      },
      {
        user: 'Junaid',
        rating: 5,
        comment: 'Best place in Mumbai for a stay, amazing aura, hosts always check in.',
        date: '2024-11-30',
        stayDuration: '3 nights'
      },
      {
        user: 'Bhawar',
        rating: 5,
        comment: 'Clean, cozy, exactly as described, easy check-in, friendly host.',
        date: '2024-11-25',
        stayDuration: '4 nights'
      }
    ],
    booking: {
      checkIn: '2:00 PM',
      checkOut: '10:00 AM',
      cancellationPolicy: 'Strict',
      minimumNights: 2,
      instantBookable: true
    },
    pricing: {
      basePrice: 22000,
      cleaningFee: 1800,
      serviceFee: 2200,
      totalPerNight: 26000,
      weeklyDiscount: 15,
      monthlyDiscount: 25
    }
  },
  2: {
    id: 2,
    name: 'The Little White Bandra Studio',
    hero: {
      title: 'The Little White Bandra Studio',
      subtitle: 'Cozy, peaceful, and centrally located 150 sq ft studio, less than one minute walk from both Pali Hill and Carter Road',
      images: getPropertyImageUrls('The Little White Bandra Studio'),
      highlights: ['Self Check-in via Smartlock', 'Prime Location', '1-min to Ocean Promenade', 'Ideal for Solo/Duo Backpackers', 'Free Daily Cleaning'],
      location: 'Bandra West, Mumbai, Maharashtra, India',
      price: 6500,
      rating: 4.63,
      reviews_count: 62
    },
    story: {
      title: 'Ideal for Solo or Duo Backpackers, Peaceful Work-from-Home Spot',
      content: 'Cozy, peaceful, and centrally located 150 sq ft studio apartment. Less than one minute walk from both Pali Hill and Carter Road. Third floor (no elevator). Self check-in via smartlock. Prime location: 1-minute walk from Ocean Promenade, Carter Road, and Pali Hill. Ideal for solo or duo backpackers, travellers looking for a peaceful "work from home" spot. The entire space is reserved for you. Free daily cleaning services during designated time slots. Surrounded by many restaurants and cafés.',
      images: getPropertyImageUrls('The Little White Bandra Studio'),
      features: ['150 sq ft compact studio', '1-min walk to ocean', 'Third floor no elevator', 'Self check-in smartlock', 'Surrounded by restaurants']
    },
    amenities: {
      categories: ['Cozy', 'Central', 'Convenient'],
      features: [
        'Wifi',
        'Dedicated workspace',
        'Free on-street parking',
        'Pets allowed',
        'TV',
        'Self check-in via smartlock',
        'Daily cleaning services',
        'Third floor (no elevator)',
        'Entire space reserved for guests',
        'Peaceful environment',
        'Surrounded by restaurants and cafés',
        'Less than 1-minute to Pali Hill and Carter Road'
      ],
      uniqueFeatures: [
        '150 sq ft compact studio apartment',
        'Less than one minute walk from Pali Hill and Carter Road',
        'Third floor (no elevator access)',
        'Ideal for solo or duo backpackers',
        'Perfect peaceful work-from-home spot',
        'Prime central Bandra West location'
      ]
    },
    location: {
      neighborhood: 'Bandra West',
      address: 'Bandra West, Mumbai, Maharashtra, India',
      nearbyAttractions: [
        'Pali Hill (less than 1 minute walk)',
        'Carter Road (less than 1 minute walk)',
        'Ocean promenade',
        'Best cafés and restaurants',
        'Prime central location'
      ],
      transportation: {
        airport_distance: '8 km',
        railway_station: 'Bandra Terminus',
        metro_station: 'Bandra West Metro'
      }
    },
    host: {
      name: 'Little White Studio Host',
      bio: 'Dedicated to providing comfortable stays in the heart of Bandra West',
      responseRate: 100,
      responseTime: '1 hour',
      languages: ['English', 'Hindi', 'Marathi'],
      memberSince: '2020',
      verified: true,
      superhost: true
    },
    testimonials: [
      {
        user: 'Shubham',
        rating: 5,
        comment: 'Loved the stay, host extremely communicative, situated near Pali Hills and Carter Road, small and cozy, comfortable bed, all necessary amenities.',
        date: '2024-12-28',
        stayDuration: '4 nights'
      },
      {
        user: 'Candida',
        rating: 5,
        comment: 'Varun is the sweetest and most thoughtful host, always available, made me feel completely taken care of, really puts his heart into making guests comfortable.',
        date: '2024-12-15',
        stayDuration: '5 nights'
      },
      {
        user: 'Aryan',
        rating: 5,
        comment: 'Bunch of cafes and restaurants nearby, place is clean, feels like home, management excellent.',
        date: '2024-12-10',
        stayDuration: '3 nights'
      },
      {
        user: 'Aditi',
        rating: 5,
        comment: 'Cute, well-maintained, beautiful vicinity and walkable area, recommend for a great time in Bandra.',
        date: '2024-12-05',
        stayDuration: '2 nights'
      },
      {
        user: 'Kevin',
        rating: 5,
        comment: 'Amazing experience, Vraj (the Happiness Manager) checked on me, made sure I was ok.',
        date: '2024-11-30',
        stayDuration: '4 nights'
      },
      {
        user: 'Kiran',
        rating: 4,
        comment: 'As described, comfortable, clean but very small, quiet at night, AC does a good job, kitchen very well stocked for small space, nice area with lots to do.',
        date: '2024-11-25',
        stayDuration: '3 nights'
      }
    ],
    booking: {
      checkIn: '2:00 PM',
      checkOut: '10:00 AM',
      cancellationPolicy: 'Strict',
      minimumNights: 2,
      instantBookable: true
    },
    pricing: {
      basePrice: 6500,
      cleaningFee: 600,
      serviceFee: 650,
      totalPerNight: 7750,
      weeklyDiscount: 10,
      monthlyDiscount: 20
    }
  },
  3: {
    id: 3,
    name: 'India House – (Full Bungalow with Private Terrace)',
    hero: {
      title: 'India House – (Full Bungalow with Private Terrace)',
      subtitle: '1050 sq ft apartment + 1050 sq ft private terrace, 30 seconds from Ocean (Carter Road), 1 minute from Pali Hill',
      images: getPropertyImageUrls('India House – (Full Bungalow with Private Terrace)'),
      highlights: ['Self Check-in via Smartlock', 'Unbeatable Location', 'Exceptional Host Communication', 'Guest Favourite Badge', 'Unlimited Ocean Breeze'],
      location: 'Bandra West, Mumbai, Maharashtra, India',
      price: 18000,
      rating: 5.0,
      reviews_count: 5
    },
    story: {
      title: 'Full Bungalow with Private Terrace - 30 Seconds from Ocean',
      content: '1050 sq ft apartment plus 1050 sq ft private terrace. Suitable for up to 6 guests with 2 bedrooms, 2 beds, 3 bathrooms, and 1 car parking space. 30 seconds from the Ocean (Carter Road), 1 minute from Pali Hill, meters from celebrity homes. Unlimited ocean breeze and dedicated workspace. Guests have access to the entire bungalow. 100% of guests in the last year rated the location 5-stars. Exceptional host communication with consistent 5-star ratings. Guest favourite badge based on reviews and reliability.',
      images: getPropertyImageUrls('India House – (Full Bungalow with Private Terrace)'),
      features: ['1050 sq ft apartment + terrace', '30 seconds to ocean', '1 minute to Pali Hill', 'Celebrity neighborhood', 'Unlimited ocean breeze']
    },
    amenities: {
      categories: ['Premium', 'Indian Theme', 'Luxury'],
      features: [
        'Kitchen',
        'Wifi',
        'Dedicated workspace',
        'Free parking on premises',
        'Pets allowed',
        'Self check-in via smartlock',
        'Noise decibel monitors on property',
        'Unlimited ocean breeze',
        'Private terrace (1050 sq ft)',
        'Full bungalow access',
        'Unbeatable location (5-star rated)',
        'Exceptional host communication'
      ],
      uniqueFeatures: [
        '1050 sq ft apartment + 1050 sq ft private terrace',
        '30 seconds from Ocean (Carter Road)',
        '1 minute from Pali Hill',
        'Meters from celebrity homes',
        'Guest favourite badge',
        '100% 5-star location rating from recent guests'
      ]
    },
    location: {
      neighborhood: 'Bandra West',
      address: 'Bandra West, Mumbai, Maharashtra, India',
      nearbyAttractions: [
        'Carter Road (30 seconds walk)',
        'Pali Hill (1 minute walk)',
        'Celebrity homes',
        'Upscale neighborhoods',
        'Ocean promenade'
      ],
      transportation: {
        airport_distance: '8 km',
        railway_station: 'Bandra Terminus',
        metro_station: 'Bandra West Metro'
      }
    },
    host: {
      name: 'India House Host',
      bio: 'Dedicated to providing authentic Indian hospitality in one of Mumbai\'s most prestigious locations',
      responseRate: 100,
      responseTime: '1 hour',
      languages: ['English', 'Hindi', 'Marathi'],
      memberSince: '2020',
      verified: true,
      superhost: true
    },
    testimonials: [
      {
        user: 'Guest Review 1',
        rating: 5,
        comment: 'Amazing property, felt like home, best in Mumbai for space and value',
        date: '2024-12-20',
        stayDuration: '4 nights'
      },
      {
        user: 'Guest Review 2',
        rating: 5,
        comment: 'Very good experience, friendly host, clean, spacious, terrace is aesthetic',
        date: '2024-12-15',
        stayDuration: '3 nights'
      },
      {
        user: 'Guest Review 3',
        rating: 5,
        comment: 'Hidden gem, peaceful, clean, relaxing',
        date: '2024-12-10',
        stayDuration: '5 nights'
      },
      {
        user: 'Guest Review 4',
        rating: 5,
        comment: 'Huge space, ideal for 4-6, rooftop a highlight, cozy interiors, friendly host, privacy',
        date: '2024-12-05',
        stayDuration: '2 nights'
      },
      {
        user: 'Guest Review 5',
        rating: 5,
        comment: 'Great Airbnb, highly recommend for stopover in Mumbai',
        date: '2024-11-30',
        stayDuration: '3 nights'
      }
    ],
    booking: {
      checkIn: '2:00 PM',
      checkOut: '10:00 AM',
      cancellationPolicy: 'Strict',
      minimumNights: 2,
      instantBookable: true
    },
    pricing: {
      basePrice: 18000,
      cleaningFee: 1500,
      serviceFee: 1800,
      totalPerNight: 21300,
      weeklyDiscount: 15,
      monthlyDiscount: 25
    }
  },
  4: {
    id: 4,
    name: 'City Zen (Asian home Bandra)',
    hero: {
      title: 'City Zen (Asian home Bandra)',
      subtitle: 'Brand new, luxurious 3-bedroom apartment with Asian/Far East inspired furnishings, second floor, valley view',
      images: getPropertyImageUrls('City Zen (Asian home Bandra)'),
      highlights: ['Self Check-in', 'Extra Spacious', 'Valley View', 'Daily Cleaning Service', 'Asian/Far East Style'],
      location: 'Bandra, Mumbai, Maharashtra, India',
      price: 15000,
      rating: 4.74,
      reviews_count: 91
    },
    story: {
      title: 'Brand New Asian/Far East Inspired 3-Bedroom with Valley View',
      content: 'Maximum guests: 10, Bedrooms: 3, Beds: 3, Bathrooms: 3 (each bedroom has an attached bathroom). Brand new property. Luxurious furnishings inspired by the Far East (Asian style). Spacious with multiple nooks and corners for group gatherings. Daily free cleaning services during designated times. Self check-in (smartlock). Free on-street parking. Second floor, no elevator access. Valley view offered as amenity and highlight. More than one outside visitor is not allowed during your stay.',
      images: getPropertyImageUrls('City Zen (Asian home Bandra)'),
      features: ['3 BHK with attached bathrooms', 'Valley view', 'Multiple nooks for groups', 'Asian/Far East furnishings', 'Daily cleaning service']
    },
    amenities: {
      categories: ['Asian Style', 'Spacious', 'Zen'],
      features: [
        'Valley view',
        'Wifi',
        'Dedicated workspace',
        'Free on-street parking',
        'Pets allowed',
        'Self check-in (smartlock)',
        'Daily free cleaning services',
        'Brand new property',
        'Luxurious Far East inspired furnishings',
        'Multiple nooks and corners',
        'Second floor (no elevator)',
        'No outside visitors policy'
      ],
      uniqueFeatures: [
        'Brand new property with Asian/Far East inspired furnishings',
        'Valley view (offered as amenity)',
        '3 bedrooms with attached bathrooms each',
        'Spacious with multiple nooks for group gatherings',
        'Daily free cleaning during designated times',
        'Second floor location (no elevator access)'
      ]
    },
    location: {
      neighborhood: 'Bandra',
      address: 'Bandra, Mumbai, Maharashtra, India',
      nearbyAttractions: [
        'Best restaurants in Bandra',
        'Bandra hotspots',
        'Local shops and markets',
        'Nightlife venues',
        'Cultural attractions'
      ],
      transportation: {
        airport_distance: '8 km',
        railway_station: 'Bandra Terminus',
        metro_station: 'Bandra West Metro'
      }
    },
    host: {
      name: 'Zen Host',
      bio: 'Dedicated to creating peaceful, Asian-inspired spaces for travelers seeking tranquility and comfort',
      responseRate: 100,
      responseTime: '1 hour',
      languages: ['English', 'Hindi', 'Marathi'],
      memberSince: '2020',
      verified: true,
      superhost: true
    },
    testimonials: [
      {
        user: 'Harsh',
        rating: 5,
        comment: 'Loved Asian style, many nooks, very responsive host, great for large groups, close to best restaurants/hangouts',
        date: '2024-12-25',
        stayDuration: '4 nights'
      },
      {
        user: 'Arushi',
        rating: 5,
        comment: 'Wonderful stay, sweet and accommodating hosts, quick responses, essentials provided, convenient stores below house',
        date: '2024-12-20',
        stayDuration: '3 nights'
      },
      {
        user: 'Priyal',
        rating: 5,
        comment: 'Planned proposal, could have 10 guests, followed rules, special thanks to Ajay, Nishant, Vraj',
        date: '2024-12-15',
        stayDuration: '2 nights'
      },
      {
        user: 'Dhiraaj',
        rating: 5,
        comment: 'Great for loud friends, peaceful, comfy, spacious, perfect for chilling/dancing',
        date: '2024-12-10',
        stayDuration: '5 nights'
      },
      {
        user: 'Rajanbir',
        rating: 5,
        comment: 'Host communicative/proactive, great recommendations and flexibility, central Bandra location, clean, spacious, special mention to Vraj for help with parking',
        date: '2024-12-05',
        stayDuration: '3 nights'
      },
      {
        user: 'Karan',
        rating: 4,
        comment: 'Comfortable, helpful host, fast responses, comfy beds/rooms/AC, good towels, great showers, clear directions, good for families, restaurants nearby',
        date: '2024-11-30',
        stayDuration: '4 nights'
      }
    ],
    booking: {
      checkIn: '2:00 PM',
      checkOut: '10:00 AM',
      cancellationPolicy: 'Strict',
      minimumNights: 2,
      instantBookable: true
    },
    pricing: {
      basePrice: 15000,
      cleaningFee: 1200,
      serviceFee: 1500,
      totalPerNight: 17700,
      weeklyDiscount: 15,
      monthlyDiscount: 25
    }
  },
  5: {
    id: 5,
    name: 'Bandra Cottage with Yard',
    hero: {
      title: 'Bandra Cottage with Yard',
      subtitle: 'Cozy cottage with the coziest interior imaginable, low wooden ceilings, warm lights, small private attached garden',
      images: getPropertyImageUrls('Bandra Cottage with Yard'),
      highlights: ['Self Check-in', 'Dedicated Workspace', 'Pet-friendly', 'Daily Cleaning', 'Small Attached Garden'],
      location: 'Bandra, Mumbai, Maharashtra, India',
      price: 8500,
      rating: 4.86,
      reviews_count: 111
    },
    story: {
      title: 'Cozy Cottage with the Coziest Interior Imaginable',
      content: 'Entire home/cottage (loft/cottage style) for maximum 4 guests, 1 bedroom, 1 bed, 1 bathroom. Coziest interior imaginable, low wooden ceilings, warm lights, sofa cum bed convertible for comfort. Low ceiling room, smart TV (pre-loaded with leading digital platforms). Retro diner vibe kitchen, fully equipped. Compact, fully equipped bathroom with sustainability-centered furnishing (mostly recyclable materials). Small, private, attached garden for relaxing. Centrally located, 5 min walk from Carter Road, Bandstand—along the ocean. More than one outside visitor is not allowed during stay.',
      images: getPropertyImageUrls('Bandra Cottage with Yard'),
      features: ['Cozy low wooden ceilings', 'Smart TV with platforms', 'Retro diner kitchen', 'Recyclable materials', '5-min to ocean']
    },
    amenities: {
      categories: ['Comfort', 'Sustainability', 'Location'],
      features: [
        'Kitchen',
        'Wifi',
        'Dedicated workspace',
        'Free on-street parking',
        'Pets allowed',
        'Self check-in (smartlock)',
        'Daily cleaning services',
        'Small private attached garden',
        'Smart TV (pre-loaded platforms)',
        'Retro diner vibe kitchen',
        'Sustainability-centered furnishing',
        'No outside visitors policy'
      ],
      uniqueFeatures: [
        'Coziest interior imaginable with low wooden ceilings',
        'Small, private, attached garden for relaxing',
        'Retro diner vibe, fully equipped kitchen',
        'Sustainability-centered furnishing (recyclable materials)',
        'Smart TV pre-loaded with leading digital platforms',
        '5 min walk from Carter Road, Bandstand—along the ocean'
      ]
    },
    location: {
      neighborhood: 'Bandra',
      address: 'Bandra, Mumbai, Maharashtra, India',
      nearbyAttractions: [
        'Carter Road (5-minute walk)',
        'Bandra Bandstand (5-minute walk)',
        'Ocean promenade',
        'Heritage architecture',
        'Local cafes and restaurants'
      ],
      transportation: {
        airport_distance: '8 km',
        railway_station: 'Bandra Terminus',
        metro_station: 'Bandra West Metro'
      }
    },
    host: {
      name: 'Superhost',
      bio: 'Dedicated to providing exceptional hospitality with a focus on sustainability and guest comfort',
      responseRate: 100,
      responseTime: '1 hour',
      languages: ['English', 'Hindi', 'Marathi'],
      memberSince: '2019',
      verified: true,
      superhost: true
    },
    testimonials: [
      {
        user: 'Mariam',
        rating: 5,
        comment: 'Peaceful garden retreat, spotless, thoughtful',
        date: '2024-12-25',
        stayDuration: '4 nights'
      },
      {
        user: 'Aishani',
        rating: 5,
        comment: 'Beautiful and well-designed, all amenities, café/heritage-rich area',
        date: '2024-12-20',
        stayDuration: '3 nights'
      },
      {
        user: 'Disha',
        rating: 5,
        comment: 'Warm host, cozy vibes, relaxing',
        date: '2024-12-15',
        stayDuration: '5 nights'
      },
      {
        user: 'Jiwon',
        rating: 5,
        comment: 'Clean, spacious, welcoming, perfect location near attractions',
        date: '2024-12-10',
        stayDuration: '2 nights'
      },
      {
        user: 'Vikas',
        rating: 3,
        comment: 'Room felt small vs. lawn, roof "hitting head", entrance felt run-down, rats/unhygienic outside',
        date: '2024-12-05',
        stayDuration: '3 nights'
      },
      {
        user: 'Tisha',
        rating: 5,
        comment: 'Clean, cozy, calm, better nighttime vibes',
        date: '2024-11-30',
        stayDuration: '4 nights'
      }
    ],
    booking: {
      checkIn: '2:00 PM',
      checkOut: '10:00 AM',
      cancellationPolicy: 'Flexible',
      minimumNights: 2,
      instantBookable: true
    },
    pricing: {
      basePrice: 8500,
      cleaningFee: 800,
      serviceFee: 850,
      totalPerNight: 10150,
      weeklyDiscount: 15,
      monthlyDiscount: 25
    }
  },
  6: {
    id: 6,
    name: 'The Quaint Afrohemian 1BHK (Bandra West)',
    hero: {
      title: 'The Quaint Afrohemian 1BHK (Bandra West)',
      subtitle: 'A 300 sqft, Afro-Bohemian themed home designed by Nicole Padival, second floor (no elevator), quiet peaceful location',
      images: getPropertyImageUrls('The Quaint Afrohemian 1BHK (Bandra West)'),
      highlights: ['Self Check-in via Lockbox', 'Pour-over Coffee Maker', 'Free Daily Cleaning', 'Quiet Peaceful Location', 'Afro-Bohemian Design'],
      location: 'Veronica Road, Bandra West, Mumbai, Maharashtra, India',
      price: 9500,
      rating: 4.85,
      reviews_count: 41
    },
    story: {
      title: 'Afro-Bohemian Themed Home Designed by Nicole Padival',
      content: 'Maximum guests: 2, Bedrooms: 1, Beds: 1, Bathrooms: 1, Total area: 300 sq ft. Second floor, no elevator access. Theme: Afro-Bohemian aesthetic, designed by Nicole Padival. Self check-in via lockbox. Pour-over coffee maker provided (at-home coffee highlight). Free daily cleaning services during designated time slots. No outside visitors allowed. Quiet, peaceful location; close to cafes & restaurants. Decor: African prints, handcrafted artifacts, mix of rich colors & textures, blend of tradition and contemporary flair. Cozy living area, fully equipped kitchen, stylish bedroom, compact bathroom.',
      images: getPropertyImageUrls('The Quaint Afrohemian 1BHK (Bandra West)'),
      features: ['300 sq ft Afro-Bohemian home', 'Designed by Nicole Padival', 'Pour-over coffee maker', 'African prints & artifacts', 'Close to cafes & restaurants']
    },
    amenities: {
      categories: ['Afro-Bohemian', 'Cultural', 'Artistic'],
      features: [
        'Kitchen',
        'Wifi',
        'Dedicated workspace',
        'TV',
        'Pets allowed',
        'Self check-in via lockbox',
        'Pour-over coffee maker',
        'Free daily cleaning services',
        'Second floor (no elevator)',
        'No outside visitors allowed',
        'Close to cafes & restaurants',
        'Quiet, peaceful location'
      ],
      uniqueFeatures: [
        'Afro-Bohemian aesthetic designed by Nicole Padival',
        'African prints, handcrafted artifacts throughout',
        'Mix of rich colors & textures',
        'Blend of tradition and contemporary flair',
        'Pour-over coffee maker provided',
        '300 sq ft cozy living space'
      ]
    },
    location: {
      neighborhood: 'Veronica Road, Bandra West',
      address: 'Veronica Road, Bandra West, Mumbai, Maharashtra, India',
      nearbyAttractions: [
        'Top cafés and restaurants',
        'Walking culture of Bandra',
        'Best Bandra neighborhood',
        'Peaceful, quiet area',
        'Central location'
      ],
      transportation: {
        airport_distance: '8 km',
        railway_station: 'Bandra Terminus',
        metro_station: 'Bandra West Metro'
      }
    },
    host: {
      name: 'Afrohemian Host',
      bio: 'Dedicated to creating unique Afro-Bohemian spaces that celebrate cultural heritage and artistic expression',
      responseRate: 100,
      responseTime: '1 hour',
      languages: ['English', 'Hindi', 'Marathi'],
      memberSince: '2020',
      verified: true,
      superhost: true
    },
    testimonials: [
      {
        user: 'Abhimanyu',
        rating: 5,
        comment: 'Lovely, clean, minimal; quiet and peaceful; great location near Bandra cafes; hosts very responsive; highly recommend',
        date: '2024-12-20',
        stayDuration: '4 nights'
      },
      {
        user: 'Yatish',
        rating: 5,
        comment: 'Quaint 1BHK, short walk to cafes, quiet neighborhood, well ventilated, lots of sunlight, very kind hosts, responsive even at midnight',
        date: '2024-12-15',
        stayDuration: '3 nights'
      },
      {
        user: 'Aman',
        rating: 4,
        comment: 'Clean, spacious for size, decent equipment, minor gripes (TV slow, small bathroom), overall recommended',
        date: '2024-12-10',
        stayDuration: '5 nights'
      },
      {
        user: 'Himgauri',
        rating: 5,
        comment: 'Perfect little space, afro-boho vibes, great location with many cafes, must visit for suburban experience, prompt/helpful host',
        date: '2024-12-05',
        stayDuration: '2 nights'
      },
      {
        user: 'Urmila',
        rating: 5,
        comment: 'Splendid location, cute, everything in walking distance, great charm, like a storybook',
        date: '2024-11-30',
        stayDuration: '3 nights'
      },
      {
        user: 'Harsh',
        rating: 5,
        comment: 'Great, cozy, all amenities in heart of Bandra, responsive host, good local recommendations',
        date: '2024-11-25',
        stayDuration: '4 nights'
      }
    ],
    booking: {
      checkIn: '2:00 PM',
      checkOut: '10:00 AM',
      cancellationPolicy: 'Strict',
      minimumNights: 2,
      instantBookable: true
    },
    pricing: {
      basePrice: 9500,
      cleaningFee: 800,
      serviceFee: 950,
      totalPerNight: 11250,
      weeklyDiscount: 15,
      monthlyDiscount: 25
    }
  },
  7: {
    id: 7,
    name: 'The Bandra Art House (Dopamine Decor)',
    hero: {
      title: 'The Bandra Art House (Dopamine Decor)',
      subtitle: 'Unique 2 BHK art house designed by three artists (award-winning model, actor/producer, fashion entrepreneur) with city skyline and bay views',
      images: getPropertyImageUrls('The Bandra Art House (Dopamine Decor)'),
      highlights: ['Self Check-in', 'City Skyline and Bay View', 'Dedicated Workspace', 'Artist-Designed Dopamine Decor', 'Daily Cleaning'],
      location: 'Chimbai, Bandra West, Mumbai, Maharashtra, India',
      price: 12000,
      rating: 4.81,
      reviews_count: 70
    },
    story: {
      title: 'Artist-Designed Dopamine Decor with City & Bay Views',
      content: 'Entire rental unit (2 BHK apartment, "Art House" style) for maximum 5 guests. 2 bedrooms, 2 beds, 1 bathroom. Private access: Whole 5th floor (one apartment per floor, fully private). Artistic theme: Property designed by three artists (an award-winning model, an actor turned producer, and a fashion entrepreneur). Strong intention on creating a unique, vibrant, and creative "dopamine decor" space. Each corner filled with sunlight, bright during the day. Daily cleaning: Free/complimentary daily cleaning during specified slots. Visitor policy: No more than one outside visitor permitted. Views: City skyline, bay view, notable natural sunlight, no tall blocking buildings.',
      images: getPropertyImageUrls('The Bandra Art House (Dopamine Decor)'),
      features: ['Designed by three artists', 'Dopamine decor concept', 'Whole 5th floor private', 'City skyline & bay views', 'Daily cleaning service']
    },
    amenities: {
      categories: ['Artistic', 'Creative', 'Cultural'],
      features: [
        'City skyline and bay view',
        'Kitchen',
        'Wifi',
        'Dedicated workspace',
        'Self check-in (smartlock)',
        'Daily cleaning service',
        'Whole 5th floor private',
        'No more than one outside visitor',
        'Artistic dopamine decor',
        'Bright with natural sunlight',
        'Former fishing village location',
        'Near cafes and old architecture'
      ],
      uniqueFeatures: [
        'Designed by three artists (award-winning model, actor/producer, fashion entrepreneur)',
        'Unique, vibrant, creative "dopamine decor" space',
        'Whole 5th floor private (one apartment per floor)',
        'City skyline and bay views with natural sunlight',
        'Located in Chimbai (former fisherman\'s village)',
        'Each corner filled with sunlight, bright during the day'
      ]
    },
    location: {
      neighborhood: 'Chimbai, Bandra West',
      address: 'Chimbai, Bandra West, Mumbai, Maharashtra, India',
      nearbyAttractions: [
        'Former fishing village with cafés',
        'Old architecture',
        'Sea proximity',
        'Hill Road',
        'St Andrew Church',
        'Major attractions and shopping'
      ],
      transportation: {
        airport_distance: '8 km',
        railway_station: 'Bandra Terminus',
        metro_station: 'Bandra West Metro'
      }
    },
    host: {
      name: 'Bandra Art House Host',
      bio: 'Three artists - award-winning model, actor/producer, and fashion entrepreneur - dedicated to creating unique art-inspired spaces',
      responseRate: 100,
      responseTime: '1 hour',
      languages: ['English', 'Hindi', 'Marathi'],
      memberSince: '2020',
      verified: true,
      superhost: true
    },
    testimonials: [
      {
        user: 'Arya',
        rating: 5,
        comment: 'Exceptionally proactive & welcoming host, shares curated local tips, highly recommended',
        date: '2024-12-25',
        stayDuration: '4 nights'
      },
      {
        user: 'Vishal',
        rating: 5,
        comment: 'See the ocean from the windows, cozy space, all facilities, attentive host, ideal location',
        date: '2024-12-20',
        stayDuration: '3 nights'
      },
      {
        user: 'Monica',
        rating: 5,
        comment: 'Clean and comfortable, prompt and kind host, cozy, family-friendly vibe, good kitchen & WiFi',
        date: '2024-12-15',
        stayDuration: '5 nights'
      },
      {
        user: 'Ankul',
        rating: 5,
        comment: 'Hosts attentive & responsive, daily cleaning, prime Bandra location, walkable to shops and historic sites',
        date: '2024-12-10',
        stayDuration: '2 nights'
      },
      {
        user: 'Cleto Philip',
        rating: 5,
        comment: 'Host/co-host (Vraj) checks in regularly, centrally located for local exploration, clean, helpful for families/kids',
        date: '2024-12-05',
        stayDuration: '3 nights'
      },
      {
        user: 'Meenakshi',
        rating: 4,
        comment: 'Comfortable rooms, great service, recommended',
        date: '2024-11-30',
        stayDuration: '4 nights'
      }
    ],
    booking: {
      checkIn: '2:00 PM',
      checkOut: '10:00 AM',
      cancellationPolicy: 'Strict',
      minimumNights: 2,
      instantBookable: true
    },
    pricing: {
      basePrice: 12000,
      cleaningFee: 1000,
      serviceFee: 1200,
      totalPerNight: 14200,
      weeklyDiscount: 15,
      monthlyDiscount: 25
    }
  }
};

export const getPropertyDetail = (propertyId: number): PropertyDetailData | null => {
  return propertyDetails[propertyId] || null;
};

export const getAllPropertyDetails = (): PropertyDetailData[] => {
  return Object.values(propertyDetails);
}; 