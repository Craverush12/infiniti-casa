// Property Assets Management System
import type { Database } from '../lib/database.types';
import { getPropertyAssets as getGeneratedAssets } from './generatedAssets';

type Property = Database['public']['Tables']['properties']['Row'];

// Property asset mapping for local images
export const propertyAssetMapping: Record<string, string> = {
  'Luxury Penthouse with Sea View': 'Penthouse Sky Lounge',
  'Modern Studio in Bandra West': 'Studio Bandra',
  'Heritage Villa in Colaba': 'India House',
  'Zen Retreat in South Mumbai': 'Zen Suite',
  'Charming Cottage in Bandra': 'Heritage Garden Cottage',
  'Artistic Loft in Bandra': 'Art Loft Bandra'
};

// Function to get property image URLs based on property name
export const getPropertyImageUrls = (propertyName: string): string[] => {
  // First try to get assets from the generated assets file
  const generatedAssets = getGeneratedAssets(propertyName);
  
  if (generatedAssets && generatedAssets.images.length > 0) {
    return [...generatedAssets.images];
  }

  // Fallback to mapped folder if no generated assets found
  const mappedFolder = propertyAssetMapping[propertyName];
  
  if (!mappedFolder) {
    console.warn(`No asset mapping found for property: ${propertyName}`);
    return [];
  }

  // Try to get assets using the mapped folder name
  const mappedAssets = getGeneratedAssets(mappedFolder);
  
  if (mappedAssets && mappedAssets.images.length > 0) {
    return [...mappedAssets.images];
  }

  console.warn(`No assets found for property: ${propertyName} or mapped folder: ${mappedFolder}`);
  return [];
};

// Function to generate property-specific story images for PropertyStoryGallery
export const getPropertyStoryImages = (propertyName: string) => {
  const propertyImages = getPropertyImageUrls(propertyName);
  
  if (propertyImages.length === 0) {
    // Fallback to generic story images if no property assets found
    return [
      {
        id: 'hero-1',
        url: 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
        title: 'The Grand Entrance',
        description: 'Step into a world where colonial elegance meets modern comfort.',
        category: 'hero' as const,
        tags: ['colonial', 'elegant', 'entrance'],
        featured: true
      },
      {
        id: 'hero-2',
        url: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
        title: 'Morning Light',
        description: 'Where every morning begins with the gentle play of sunlight.',
        category: 'hero' as const,
        tags: ['morning', 'natural-light'],
        featured: true
      }
    ];
  }

  // Create story images using actual property photos
  const storyImages = [];
  let imageIndex = 0;

  // Hero Images (first 3 images)
  for (let i = 0; i < Math.min(3, propertyImages.length); i++) {
    storyImages.push({
      id: `hero-${i + 1}`,
      url: propertyImages[imageIndex],
      title: getPropertyStoryTitle(propertyName, 'hero', i + 1),
      description: getPropertyStoryDescription(propertyName, 'hero', i + 1),
      category: 'hero' as const,
      tags: getPropertyStoryTags(propertyName, 'hero'),
      featured: i < 2
    });
    imageIndex++;
  }

  // Lifestyle Images (next 3 images)
  for (let i = 0; i < Math.min(3, propertyImages.length - imageIndex); i++) {
    storyImages.push({
      id: `lifestyle-${i + 1}`,
      url: propertyImages[imageIndex],
      title: getPropertyStoryTitle(propertyName, 'lifestyle', i + 1),
      description: getPropertyStoryDescription(propertyName, 'lifestyle', i + 1),
      category: 'lifestyle' as const,
      tags: getPropertyStoryTags(propertyName, 'lifestyle'),
      featured: false
    });
    imageIndex++;
  }

  // Architecture Images (next 2 images)
  for (let i = 0; i < Math.min(2, propertyImages.length - imageIndex); i++) {
    storyImages.push({
      id: `architecture-${i + 1}`,
      url: propertyImages[imageIndex],
      title: getPropertyStoryTitle(propertyName, 'architecture', i + 1),
      description: getPropertyStoryDescription(propertyName, 'architecture', i + 1),
      category: 'architecture' as const,
      tags: getPropertyStoryTags(propertyName, 'architecture'),
      featured: false
    });
    imageIndex++;
  }

  // Neighborhood Images (next 2 images)
  for (let i = 0; i < Math.min(2, propertyImages.length - imageIndex); i++) {
    storyImages.push({
      id: `neighborhood-${i + 1}`,
      url: propertyImages[imageIndex],
      title: getPropertyStoryTitle(propertyName, 'neighborhood', i + 1),
      description: getPropertyStoryDescription(propertyName, 'neighborhood', i + 1),
      category: 'neighborhood' as const,
      tags: getPropertyStoryTags(propertyName, 'neighborhood'),
      featured: false
    });
    imageIndex++;
  }

  // Detail Images (next 2 images)
  for (let i = 0; i < Math.min(2, propertyImages.length - imageIndex); i++) {
    storyImages.push({
      id: `details-${i + 1}`,
      url: propertyImages[imageIndex],
      title: getPropertyStoryTitle(propertyName, 'details', i + 1),
      description: getPropertyStoryDescription(propertyName, 'details', i + 1),
      category: 'details' as const,
      tags: getPropertyStoryTags(propertyName, 'details'),
      featured: false
    });
    imageIndex++;
  }

  // Seasonal Images (remaining images)
  for (let i = 0; i < Math.min(2, propertyImages.length - imageIndex); i++) {
    storyImages.push({
      id: `seasonal-${i + 1}`,
      url: propertyImages[imageIndex],
      title: getPropertyStoryTitle(propertyName, 'seasonal', i + 1),
      description: getPropertyStoryDescription(propertyName, 'seasonal', i + 1),
      category: 'seasonal' as const,
      tags: getPropertyStoryTags(propertyName, 'seasonal'),
      featured: false
    });
    imageIndex++;
  }

  return storyImages;
};

// Helper functions for story generation
const getPropertyStoryTitle = (propertyName: string, category: string, index: number): string => {
  const titles = {
    'Sky Lounge': {
      hero: ['The Sky Lounge Experience', 'Panoramic City Views', 'Luxury Penthouse Living'],
      lifestyle: ['Workation in the Sky', 'Evening Ambiance', 'Social Gathering Space'],
      architecture: ['Modern Design Elements', 'Premium Finishes'],
      neighborhood: ['Bandra West Views', 'Local Scene'],
      details: ['Luxury Amenities', 'Design Details'],
      seasonal: ['Monsoon Magic', 'Winter Warmth']
    },
    'The Little White Bandra Studio': {
      hero: ['The Garden Cottage', 'Colonial Charm', 'Heritage Living'],
      lifestyle: ['Garden Retreat', 'Peaceful Mornings', 'Family Gatherings'],
      architecture: ['Stained Glass Windows', 'Teak Woodwork'],
      neighborhood: ['Colaba Heritage', 'Local Culture'],
      details: ['Heritage Details', 'Garden Features'],
      seasonal: ['Garden in Bloom', 'Cozy Winters']
    },
    'Little White Bandra Studio': {
      hero: ['The Garden Cottage', 'Colonial Charm', 'Heritage Living'],
      lifestyle: ['Garden Retreat', 'Peaceful Mornings', 'Family Gatherings'],
      architecture: ['Stained Glass Windows', 'Teak Woodwork'],
      neighborhood: ['Colaba Heritage', 'Local Culture'],
      details: ['Heritage Details', 'Garden Features'],
      seasonal: ['Garden in Bloom', 'Cozy Winters']
    },
    'India House': {
      hero: ['The Garden Cottage', 'Colonial Charm', 'Heritage Living'],
      lifestyle: ['Garden Retreat', 'Peaceful Mornings', 'Family Gatherings'],
      architecture: ['Stained Glass Windows', 'Teak Woodwork'],
      neighborhood: ['Colaba Heritage', 'Local Culture'],
      details: ['Heritage Details', 'Garden Features'],
      seasonal: ['Garden in Bloom', 'Cozy Winters']
    },
    'City Zen': {
      hero: ['The Garden Cottage', 'Colonial Charm', 'Heritage Living'],
      lifestyle: ['Garden Retreat', 'Peaceful Mornings', 'Family Gatherings'],
      architecture: ['Stained Glass Windows', 'Teak Woodwork'],
      neighborhood: ['Colaba Heritage', 'Local Culture'],
      details: ['Heritage Details', 'Garden Features'],
      seasonal: ['Garden in Bloom', 'Cozy Winters']
    },
    'Photos Bandra Cottage': {
      hero: ['The Garden Cottage', 'Colonial Charm', 'Heritage Living'],
      lifestyle: ['Garden Retreat', 'Peaceful Mornings', 'Family Gatherings'],
      architecture: ['Stained Glass Windows', 'Teak Woodwork'],
      neighborhood: ['Colaba Heritage', 'Local Culture'],
      details: ['Heritage Details', 'Garden Features'],
      seasonal: ['Garden in Bloom', 'Cozy Winters']
    },
    'Bandra Art House': {
      hero: ['The Art Loft', 'Creative Sanctuary', 'Artistic Living'],
      lifestyle: ['Artist\'s Studio', 'Creative Inspiration', 'Artistic Gatherings'],
      architecture: ['Artistic Design', 'Creative Spaces'],
      neighborhood: ['Bandra Art Scene', 'Creative Community'],
      details: ['Artistic Details', 'Creative Features'],
      seasonal: ['Artistic Seasons', 'Creative Comfort']
    }
  };

  const propertyTitles = titles[propertyName as keyof typeof titles];
  if (propertyTitles && propertyTitles[category as keyof typeof propertyTitles]) {
    const categoryTitles = propertyTitles[category as keyof typeof propertyTitles] as string[];
    return categoryTitles[index - 1] || `${category.charAt(0).toUpperCase() + category.slice(1)} ${index}`;
  }

  return `${category.charAt(0).toUpperCase() + category.slice(1)} ${index}`;
};

const getPropertyStoryDescription = (propertyName: string, category: string, index: number): string => {
  const propertyDescriptions = {
    'Sky Lounge': {
      hero: [
        'Experience luxury living at its finest with panoramic city views.',
        'Indulge in the ultimate urban retreat with stunning skyline vistas.',
        'Discover sophisticated comfort in this architectural masterpiece.'
      ],
      lifestyle: [
        'Perfect workation space with city views and modern amenities.',
        'Ideal for digital nomads seeking productivity and luxury.',
        'Experience the perfect blend of work and relaxation.'
      ],
      architecture: [
        'Modern architectural design with premium finishes.',
        'Contemporary luxury with attention to every detail.',
        'Sophisticated urban living with world-class amenities.'
      ],
      neighborhood: [
        'Located in vibrant Bandra West with easy access to everything.',
        'Experience the energy of Mumbai\'s most dynamic neighborhood.',
        'Perfect location for exploring the city\'s best attractions.'
      ],
      details: [
        'Every detail crafted for the discerning traveler.',
        'Premium amenities and thoughtful touches throughout.',
        'Luxury living with all the comforts of home.'
      ],
      seasonal: [
        'Comfortable year-round with climate control.',
        'Perfect for any season with modern amenities.',
        'Enjoy the best of Mumbai in every season.'
      ]
    },
    'The Little White Bandra Studio': {
      hero: [
        'Step into a world of colonial elegance and garden tranquility.',
        'Experience the charm of heritage architecture with modern comfort.',
        'Discover the perfect blend of history and luxury.'
      ],
      lifestyle: [
        'Peaceful retreat surrounded by lush gardens.',
        'Perfect for those seeking tranquility and heritage charm.',
        'Experience the slower pace of colonial living.'
      ],
      architecture: [
        'Beautiful colonial architecture with period details.',
        'Heritage craftsmanship meets modern convenience.',
        'Timeless design with contemporary amenities.'
      ],
      neighborhood: [
        'Located in historic Colaba with rich cultural heritage.',
        'Experience the charm of Mumbai\'s colonial past.',
        'Perfect location for exploring heritage sites.'
      ],
      details: [
        'Every corner tells a story of Mumbai\'s rich history.',
        'Carefully preserved details with modern updates.',
        'Heritage charm with all the comforts of today.'
      ],
      seasonal: [
        'Beautiful gardens that change with the seasons.',
        'Perfect for experiencing Mumbai\'s pleasant weather.',
        'Enjoy the outdoors in every season.'
      ]
    },
    'Little White Bandra Studio': {
      hero: [
        'Step into a world of colonial elegance and garden tranquility.',
        'Experience the charm of heritage architecture with modern comfort.',
        'Discover the perfect blend of history and luxury.'
      ],
      lifestyle: [
        'Peaceful retreat surrounded by lush gardens.',
        'Perfect for those seeking tranquility and heritage charm.',
        'Experience the slower pace of colonial living.'
      ],
      architecture: [
        'Beautiful colonial architecture with period details.',
        'Heritage craftsmanship meets modern convenience.',
        'Timeless design with contemporary amenities.'
      ],
      neighborhood: [
        'Located in historic Colaba with rich cultural heritage.',
        'Experience the charm of Mumbai\'s colonial past.',
        'Perfect location for exploring heritage sites.'
      ],
      details: [
        'Every corner tells a story of Mumbai\'s rich history.',
        'Carefully preserved details with modern updates.',
        'Heritage charm with all the comforts of today.'
      ],
      seasonal: [
        'Beautiful gardens that change with the seasons.',
        'Perfect for experiencing Mumbai\'s pleasant weather.',
        'Enjoy the outdoors in every season.'
      ]
    },
    'India House': {
      hero: [
        'Step into a world of colonial elegance and garden tranquility.',
        'Experience the charm of heritage architecture with modern comfort.',
        'Discover the perfect blend of history and luxury.'
      ],
      lifestyle: [
        'Peaceful retreat surrounded by lush gardens.',
        'Perfect for those seeking tranquility and heritage charm.',
        'Experience the slower pace of colonial living.'
      ],
      architecture: [
        'Beautiful colonial architecture with period details.',
        'Heritage craftsmanship meets modern convenience.',
        'Timeless design with contemporary amenities.'
      ],
      neighborhood: [
        'Located in historic Colaba with rich cultural heritage.',
        'Experience the charm of Mumbai\'s colonial past.',
        'Perfect location for exploring heritage sites.'
      ],
      details: [
        'Every corner tells a story of Mumbai\'s rich history.',
        'Carefully preserved details with modern updates.',
        'Heritage charm with all the comforts of today.'
      ],
      seasonal: [
        'Beautiful gardens that change with the seasons.',
        'Perfect for experiencing Mumbai\'s pleasant weather.',
        'Enjoy the outdoors in every season.'
      ]
    },
    'City Zen': {
      hero: [
        'Step into a world of colonial elegance and garden tranquility.',
        'Experience the charm of heritage architecture with modern comfort.',
        'Discover the perfect blend of history and luxury.'
      ],
      lifestyle: [
        'Peaceful retreat surrounded by lush gardens.',
        'Perfect for those seeking tranquility and heritage charm.',
        'Experience the slower pace of colonial living.'
      ],
      architecture: [
        'Beautiful colonial architecture with period details.',
        'Heritage craftsmanship meets modern convenience.',
        'Timeless design with contemporary amenities.'
      ],
      neighborhood: [
        'Located in historic Colaba with rich cultural heritage.',
        'Experience the charm of Mumbai\'s colonial past.',
        'Perfect location for exploring heritage sites.'
      ],
      details: [
        'Every corner tells a story of Mumbai\'s rich history.',
        'Carefully preserved details with modern updates.',
        'Heritage charm with all the comforts of today.'
      ],
      seasonal: [
        'Beautiful gardens that change with the seasons.',
        'Perfect for experiencing Mumbai\'s pleasant weather.',
        'Enjoy the outdoors in every season.'
      ]
    },
    'Photos Bandra Cottage': {
      hero: [
        'Step into a world of colonial elegance and garden tranquility.',
        'Experience the charm of heritage architecture with modern comfort.',
        'Discover the perfect blend of history and luxury.'
      ],
      lifestyle: [
        'Peaceful retreat surrounded by lush gardens.',
        'Perfect for those seeking tranquility and heritage charm.',
        'Experience the slower pace of colonial living.'
      ],
      architecture: [
        'Beautiful colonial architecture with period details.',
        'Heritage craftsmanship meets modern convenience.',
        'Timeless design with contemporary amenities.'
      ],
      neighborhood: [
        'Located in historic Colaba with rich cultural heritage.',
        'Experience the charm of Mumbai\'s colonial past.',
        'Perfect location for exploring heritage sites.'
      ],
      details: [
        'Every corner tells a story of Mumbai\'s rich history.',
        'Carefully preserved details with modern updates.',
        'Heritage charm with all the comforts of today.'
      ],
      seasonal: [
        'Beautiful gardens that change with the seasons.',
        'Perfect for experiencing Mumbai\'s pleasant weather.',
        'Enjoy the outdoors in every season.'
      ]
    },
    'Bandra Art House': {
      hero: [
        'Immerse yourself in the vibrant artistic culture of Bandra.',
        'Experience creative living in this beautifully curated art house.',
        'Discover the perfect blend of art and comfort.'
      ],
      lifestyle: [
        'Creative sanctuary for artists and art lovers.',
        'Perfect for those seeking inspiration and cultural immersion.',
        'Experience the artistic soul of Mumbai\'s most creative neighborhood.'
      ],
      architecture: [
        'Contemporary design with artistic flair and local artwork.',
        'Creative space designed for inspiration and comfort.',
        'Modern amenities with artistic touches throughout.'
      ],
      neighborhood: [
        'Located in Bandra West, Mumbai\'s artistic heart.',
        'Experience the vibrant culture and creative energy.',
        'Perfect location for exploring art galleries and cafes.'
      ],
      details: [
        'Every piece of artwork tells a story of local culture.',
        'Thoughtfully designed space for creative inspiration.',
        'Artistic details with all modern conveniences.'
      ],
      seasonal: [
        'Creative energy that thrives in every season.',
        'Perfect for experiencing Bandra\'s artistic community.',
        'Enjoy the cultural vibrancy year-round.'
      ]
    }
  };

  if (propertyDescriptions && propertyDescriptions[propertyName as keyof typeof propertyDescriptions]) {
    const propertyDesc = propertyDescriptions[propertyName as keyof typeof propertyDescriptions] as any;
    const categoryDescriptions = propertyDesc[category] as string[];
    return categoryDescriptions[index - 1] || `Experience the ${category} of ${propertyName}.`;
  }

  return `Experience the ${category} of ${propertyName}.`;
};

const getPropertyStoryTags = (propertyName: string, category: string): string[] => {
  const tags = {
    'Sky Lounge': {
      hero: ['luxury', 'penthouse', 'city-views'],
      lifestyle: ['workation', 'productivity', 'city-views'],
      architecture: ['modern', 'design', 'luxury'],
      neighborhood: ['bandra-west', 'city-life', 'vibrant'],
      details: ['luxury', 'amenities', 'design'],
      seasonal: ['monsoon', 'winter', 'comfort']
    },
    'The Little White Bandra Studio': {
      hero: ['colonial', 'heritage', 'garden'],
      lifestyle: ['retreat', 'peaceful', 'garden'],
      architecture: ['heritage', 'colonial', 'craftsmanship'],
      neighborhood: ['colaba', 'heritage', 'culture'],
      details: ['heritage', 'garden', 'details'],
      seasonal: ['garden', 'heritage', 'comfort']
    },
    'Little White Bandra Studio': {
      hero: ['colonial', 'heritage', 'garden'],
      lifestyle: ['retreat', 'peaceful', 'garden'],
      architecture: ['heritage', 'colonial', 'craftsmanship'],
      neighborhood: ['colaba', 'heritage', 'culture'],
      details: ['heritage', 'garden', 'details'],
      seasonal: ['garden', 'heritage', 'comfort']
    },
    'India House': {
      hero: ['colonial', 'heritage', 'garden'],
      lifestyle: ['retreat', 'peaceful', 'garden'],
      architecture: ['heritage', 'colonial', 'craftsmanship'],
      neighborhood: ['colaba', 'heritage', 'culture'],
      details: ['heritage', 'garden', 'details'],
      seasonal: ['garden', 'heritage', 'comfort']
    },
    'City Zen': {
      hero: ['colonial', 'heritage', 'garden'],
      lifestyle: ['retreat', 'peaceful', 'garden'],
      architecture: ['heritage', 'colonial', 'craftsmanship'],
      neighborhood: ['colaba', 'heritage', 'culture'],
      details: ['heritage', 'garden', 'details'],
      seasonal: ['garden', 'heritage', 'comfort']
    },
    'Photos Bandra Cottage': {
      hero: ['colonial', 'heritage', 'garden'],
      lifestyle: ['retreat', 'peaceful', 'garden'],
      architecture: ['heritage', 'colonial', 'craftsmanship'],
      neighborhood: ['colaba', 'heritage', 'culture'],
      details: ['heritage', 'garden', 'details'],
      seasonal: ['garden', 'heritage', 'comfort']
    },
    'Bandra Art House': {
      hero: ['artistic', 'creative', 'cultural'],
      lifestyle: ['artistic', 'creative', 'inspiration'],
      architecture: ['contemporary', 'artistic', 'design'],
      neighborhood: ['bandra-west', 'artistic', 'cultural'],
      details: ['artistic', 'creative', 'local-art'],
      seasonal: ['artistic', 'creative', 'cultural']
    }
  };

  const propertyTags = tags[propertyName as keyof typeof tags];
  if (propertyTags && typeof propertyTags === 'object' && category in propertyTags) {
    const categoryTags = (propertyTags as Record<string, string[]>)[category];
    if (Array.isArray(categoryTags)) {
      return categoryTags;
    }
  }

  return [category, propertyName.toLowerCase().replace(/\s+/g, '-')];
};

// Function to get HEIC file paths (for future use)
export const getHeicFilePaths = (propertyName: string): string[] => {
  const assetFolder = propertyAssetMapping[propertyName];
  if (!assetFolder) {
    return [];
  }

  // Return paths to HEIC files in the assets folder
  return [
    `/src/asssets/${assetFolder}/IMG_1407.heic`,
    `/src/asssets/${assetFolder}/IMG_1427.heic`,
    `/src/asssets/${assetFolder}/IMG_1481.HEIC`,
    `/src/asssets/${assetFolder}/IMG_1451.HEIC`,
    `/src/asssets/${assetFolder}/IMG_1429.heic`
  ];
};

// Function to update property data with local assets
export const updatePropertyWithLocalAssets = (property: any): any => {
  const images = getPropertyImageUrls(property.name);
  return {
    ...property,
    images: images.length > 0 ? images : property.images
  };
};

// Function to get all properties with local assets
export const getPropertiesWithLocalAssets = (properties: Property[]): Property[] => {
  return properties.map(updatePropertyWithLocalAssets);
};

// Function to check if a property has local assets
export const hasLocalAssets = (propertyName: string): boolean => {
  return propertyName in propertyAssetMapping;
};

// Function to get asset folder structure for debugging
export const getAssetFolderStructure = () => {
  return Object.entries(propertyAssetMapping).map(([assetFolder, propertyName]) => ({
    assetFolder,
    propertyName,
    hasAssets: true
  }));
};

// Function to get asset info for a property
export const getPropertyAssetInfo = (propertyName: string) => {
  const assetFolder = propertyAssetMapping[propertyName];
  if (!assetFolder) {
    return null;
  }

  return {
    propertyName,
    assetFolder,
    heicFiles: getHeicFilePaths(propertyName),
    placeholderImages: getPropertyImageUrls(propertyName),
    hasAssets: true
  };
};