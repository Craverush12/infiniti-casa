import { dummyProperties, dummyCategories, dummyAesthetics, dummyLocations, simulateDelay, generateId } from '../data/dummyData';
import type { Database } from '../lib/database.types';

type Property = Database['public']['Tables']['properties']['Row'];
type PropertyInsert = Database['public']['Tables']['properties']['Insert'];
type PropertyUpdate = Database['public']['Tables']['properties']['Update'];

export class MockPropertyService {
  static async getAllProperties(): Promise<Property[]> {
    try {
      await simulateDelay(800); // Simulate network delay
      
      return [...dummyProperties];
    } catch (error) {
      console.error('MockPropertyService.getAllProperties error:', error);
      throw error;
    }
  }

  static async getPropertyById(id: number): Promise<Property | null> {
    try {
      await simulateDelay(500); // Simulate network delay
      
      const property = dummyProperties.find(p => p.id === id);
      return property || null;
    } catch (error) {
      console.error('MockPropertyService.getPropertyById error:', error);
      return null;
    }
  }

  static async getPropertiesByCategory(category: string): Promise<Property[]> {
    try {
      await simulateDelay(600); // Simulate network delay
      
      return dummyProperties.filter(p => p.category === category);
    } catch (error) {
      console.error('MockPropertyService.getPropertiesByCategory error:', error);
      throw error;
    }
  }

  static async getPropertiesByAesthetic(aesthetic: string): Promise<Property[]> {
    try {
      await simulateDelay(600); // Simulate network delay
      
      return dummyProperties.filter(p => p.aesthetic === aesthetic);
    } catch (error) {
      console.error('MockPropertyService.getPropertiesByAesthetic error:', error);
      throw error;
    }
  }

  static async searchProperties(query: string): Promise<Property[]> {
    try {
      await simulateDelay(700); // Simulate network delay
      
      const searchTerm = query.toLowerCase();
      return dummyProperties.filter(property => 
        property.name.toLowerCase().includes(searchTerm) ||
        property.location.toLowerCase().includes(searchTerm) ||
        property.description.toLowerCase().includes(searchTerm)
      );
    } catch (error) {
      console.error('MockPropertyService.searchProperties error:', error);
      throw error;
    }
  }

  static async filterProperties(filters: {
    minPrice?: number;
    maxPrice?: number;
    guests?: number;
    bedrooms?: number;
    category?: string;
    aesthetic?: string;
    location?: string;
  }): Promise<Property[]> {
    try {
      await simulateDelay(800); // Simulate network delay
      
      let filtered = [...dummyProperties];

      if (filters.minPrice !== undefined) {
        filtered = filtered.filter(p => p.price >= filters.minPrice!);
      }

      if (filters.maxPrice !== undefined) {
        filtered = filtered.filter(p => p.price <= filters.maxPrice!);
      }

      if (filters.guests !== undefined) {
        filtered = filtered.filter(p => p.guests >= filters.guests!);
      }

      if (filters.bedrooms !== undefined) {
        filtered = filtered.filter(p => p.bedrooms >= filters.bedrooms!);
      }

      if (filters.category) {
        filtered = filtered.filter(p => p.category === filters.category);
      }

      if (filters.aesthetic) {
        filtered = filtered.filter(p => p.aesthetic === filters.aesthetic);
      }

      if (filters.location) {
        filtered = filtered.filter(p => p.location === filters.location);
      }

      return filtered;
    } catch (error) {
      console.error('MockPropertyService.filterProperties error:', error);
      throw error;
    }
  }

  static async createProperty(property: PropertyInsert): Promise<Property> {
    try {
      await simulateDelay(1000); // Simulate network delay
      
      const newProperty: Property = {
        ...property,
        id: Math.max(...dummyProperties.map(p => p.id)) + 1,
        virtual_tour_url: property.virtual_tour_url || null,
        video_url: property.video_url || null,
        images: property.images || [],
        features: property.features || {},
        story: property.story || '',
        testimonials: property.testimonials || [],
        highlights: property.highlights || [],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      dummyProperties.push(newProperty);
      
      console.log('🏠 New property created:', newProperty.name);
      
      return newProperty;
    } catch (error) {
      console.error('MockPropertyService.createProperty error:', error);
      throw error;
    }
  }

  static async updateProperty(id: number, updates: PropertyUpdate): Promise<Property> {
    try {
      await simulateDelay(800); // Simulate network delay
      
      const propertyIndex = dummyProperties.findIndex(p => p.id === id);
      
      if (propertyIndex === -1) {
        throw new Error('Property not found');
      }

      const updatedProperty = {
        ...dummyProperties[propertyIndex],
        ...updates,
        updated_at: new Date().toISOString()
      };

      dummyProperties[propertyIndex] = updatedProperty;
      
      console.log('🏠 Property updated:', updatedProperty.name);
      
      return updatedProperty;
    } catch (error) {
      console.error('MockPropertyService.updateProperty error:', error);
      throw error;
    }
  }

  static async deleteProperty(id: number): Promise<void> {
    try {
      await simulateDelay(600); // Simulate network delay
      
      const propertyIndex = dummyProperties.findIndex(p => p.id === id);
      
      if (propertyIndex === -1) {
        throw new Error('Property not found');
      }

      const deletedProperty = dummyProperties[propertyIndex];
      dummyProperties.splice(propertyIndex, 1);
      
      console.log('🏠 Property deleted:', deletedProperty.name);
    } catch (error) {
      console.error('MockPropertyService.deleteProperty error:', error);
      throw error;
    }
  }

  static async getPropertyCategories(): Promise<string[]> {
    try {
      await simulateDelay(300); // Simulate network delay
      
      return [...dummyCategories];
    } catch (error) {
      console.error('MockPropertyService.getPropertyCategories error:', error);
      throw error;
    }
  }

  static async getPropertyAesthetics(): Promise<string[]> {
    try {
      await simulateDelay(300); // Simulate network delay
      
      return [...dummyAesthetics];
    } catch (error) {
      console.error('MockPropertyService.getPropertyAesthetics error:', error);
      throw error;
    }
  }

  static async getPropertyLocations(): Promise<string[]> {
    try {
      await simulateDelay(300); // Simulate network delay
      
      return [...dummyLocations];
    } catch (error) {
      console.error('MockPropertyService.getPropertyLocations error:', error);
      throw error;
    }
  }

  // Additional helper methods for demo purposes
  static async getFeaturedProperties(): Promise<Property[]> {
    try {
      await simulateDelay(500); // Simulate network delay
      
      // Return properties with highest ratings
      return dummyProperties
        .sort((a, b) => (b.features as any).rating - (a.features as any).rating)
        .slice(0, 4);
    } catch (error) {
      console.error('MockPropertyService.getFeaturedProperties error:', error);
      throw error;
    }
  }

  static async getPopularProperties(): Promise<Property[]> {
    try {
      await simulateDelay(500); // Simulate network delay
      
      // Return properties with most reviews
      return dummyProperties
        .sort((a, b) => (b.features as any).reviews_count - (a.features as any).reviews_count)
        .slice(0, 6);
    } catch (error) {
      console.error('MockPropertyService.getPopularProperties error:', error);
      throw error;
    }
  }

  static async getPropertiesByLocation(location: string): Promise<Property[]> {
    try {
      await simulateDelay(600); // Simulate network delay
      
      return dummyProperties.filter(p => p.location === location);
    } catch (error) {
      console.error('MockPropertyService.getPropertiesByLocation error:', error);
      throw error;
    }
  }

  static async getSimilarProperties(propertyId: number): Promise<Property[]> {
    try {
      await simulateDelay(700); // Simulate network delay
      
      const property = dummyProperties.find(p => p.id === propertyId);
      if (!property) return [];

      // Find properties with similar category or aesthetic
      return dummyProperties
        .filter(p => p.id !== propertyId && (p.category === property.category || p.aesthetic === property.aesthetic))
        .slice(0, 4);
    } catch (error) {
      console.error('MockPropertyService.getSimilarProperties error:', error);
      throw error;
    }
  }
} 