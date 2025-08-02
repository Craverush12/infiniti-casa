import { dummyBookings, dummyProperties, simulateDelay, generateId } from '../data/dummyData';
import type { Database } from '../lib/database.types';

type Booking = Database['public']['Tables']['bookings']['Row'];
type BookingInsert = Database['public']['Tables']['bookings']['Insert'];
type BookingUpdate = Database['public']['Tables']['bookings']['Update'];
type BookingStatus = Database['public']['Enums']['booking_status'];
type PaymentStatus = Database['public']['Enums']['payment_status'];

export class MockBookingService {
  static async createBooking(bookingData: BookingInsert): Promise<Booking> {
    try {
      await simulateDelay(1200); // Simulate network delay
      
      const newBooking: Booking = {
        ...bookingData,
        id: Math.max(...dummyBookings.map(b => parseInt(b.id))) + 1,
        confirmation_code: generateId().toUpperCase(),
        status: (bookingData.status as BookingStatus) || 'pending',
        payment_status: (bookingData.payment_status as PaymentStatus) || 'pending',
        guest_details: bookingData.guest_details || {},
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      dummyBookings.push(newBooking);
      
      console.log('📅 New booking created:', newBooking.confirmation_code);
      
      return newBooking;
    } catch (error) {
      console.error('MockBookingService.createBooking error:', error);
      throw error;
    }
  }

  static async getBookingById(id: string): Promise<Booking | null> {
    try {
      await simulateDelay(500); // Simulate network delay
      
      const booking = dummyBookings.find(b => b.id === id);
      return booking || null;
    } catch (error) {
      console.error('MockBookingService.getBookingById error:', error);
      return null;
    }
  }

  static async getUserBookings(userId: string): Promise<Booking[]> {
    try {
      await simulateDelay(800); // Simulate network delay
      
      return dummyBookings.filter(b => b.user_id === userId);
    } catch (error) {
      console.error('MockBookingService.getUserBookings error:', error);
      throw error;
    }
  }

  static async getPropertyBookings(propertyId: number): Promise<Booking[]> {
    try {
      await simulateDelay(600); // Simulate network delay
      
      return dummyBookings.filter(b => b.property_id === propertyId);
    } catch (error) {
      console.error('MockBookingService.getPropertyBookings error:', error);
      throw error;
    }
  }

  static async updateBookingStatus(id: string, status: BookingStatus): Promise<Booking> {
    try {
      await simulateDelay(600); // Simulate network delay
      
      const bookingIndex = dummyBookings.findIndex(b => b.id === id);
      
      if (bookingIndex === -1) {
        throw new Error('Booking not found');
      }

      const updatedBooking = {
        ...dummyBookings[bookingIndex],
        status,
        updated_at: new Date().toISOString()
      };

      dummyBookings[bookingIndex] = updatedBooking;
      
      console.log('📅 Booking status updated:', id, status);
      
      return updatedBooking;
    } catch (error) {
      console.error('MockBookingService.updateBookingStatus error:', error);
      throw error;
    }
  }

  static async cancelBooking(id: string, reason?: string): Promise<Booking> {
    try {
      await simulateDelay(800); // Simulate network delay
      
      const bookingIndex = dummyBookings.findIndex(b => b.id === id);
      
      if (bookingIndex === -1) {
        throw new Error('Booking not found');
      }

      const updatedBooking = {
        ...dummyBookings[bookingIndex],
        status: 'cancelled' as BookingStatus,
        updated_at: new Date().toISOString()
      };

      dummyBookings[bookingIndex] = updatedBooking;
      
      console.log('📅 Booking cancelled:', id, reason);
      
      return updatedBooking;
    } catch (error) {
      console.error('MockBookingService.cancelBooking error:', error);
      throw error;
    }
  }

  static async checkAvailability(propertyId: number, checkIn: string, checkOut: string): Promise<{
    available: boolean;
    conflictingBookings?: Booking[];
  }> {
    try {
      await simulateDelay(700); // Simulate network delay
      
      const propertyBookings = dummyBookings.filter(b => 
        b.property_id === propertyId && 
        b.status !== 'cancelled'
      );

      const checkInDate = new Date(checkIn);
      const checkOutDate = new Date(checkOut);

      const conflictingBookings = propertyBookings.filter(booking => {
        const bookingCheckIn = new Date(booking.check_in);
        const bookingCheckOut = new Date(booking.check_out);

        return (
          (checkInDate >= bookingCheckIn && checkInDate < bookingCheckOut) ||
          (checkOutDate > bookingCheckIn && checkOutDate <= bookingCheckOut) ||
          (checkInDate <= bookingCheckIn && checkOutDate >= bookingCheckOut)
        );
      });

      return {
        available: conflictingBookings.length === 0,
        conflictingBookings: conflictingBookings.length > 0 ? conflictingBookings : undefined
      };
    } catch (error) {
      console.error('MockBookingService.checkAvailability error:', error);
      throw error;
    }
  }

  static async getBookingStats(): Promise<{
    totalBookings: number;
    confirmedBookings: number;
    pendingBookings: number;
    cancelledBookings: number;
    totalRevenue: number;
  }> {
    try {
      await simulateDelay(500); // Simulate network delay
      
      const stats = {
        totalBookings: dummyBookings.length,
        confirmedBookings: dummyBookings.filter(b => b.status === 'confirmed').length,
        pendingBookings: dummyBookings.filter(b => b.status === 'pending').length,
        cancelledBookings: dummyBookings.filter(b => b.status === 'cancelled').length,
        totalRevenue: dummyBookings
          .filter(b => b.status === 'confirmed')
          .reduce((sum, b) => sum + b.total_amount, 0)
      };

      return stats;
    } catch (error) {
      console.error('MockBookingService.getBookingStats error:', error);
      throw error;
    }
  }

  static async searchBookings(filters: {
    userId?: string;
    propertyId?: number;
    status?: BookingStatus;
    checkIn?: string;
    checkOut?: string;
  }): Promise<Booking[]> {
    try {
      await simulateDelay(600); // Simulate network delay
      
      let filtered = [...dummyBookings];

      if (filters.userId) {
        filtered = filtered.filter(b => b.user_id === filters.userId);
      }

      if (filters.propertyId) {
        filtered = filtered.filter(b => b.property_id === filters.propertyId);
      }

      if (filters.status) {
        filtered = filtered.filter(b => b.status === filters.status);
      }

      if (filters.checkIn) {
        const checkInDate = new Date(filters.checkIn);
        filtered = filtered.filter(b => new Date(b.check_in) >= checkInDate);
      }

      if (filters.checkOut) {
        const checkOutDate = new Date(filters.checkOut);
        filtered = filtered.filter(b => new Date(b.check_out) <= checkOutDate);
      }

      return filtered;
    } catch (error) {
      console.error('MockBookingService.searchBookings error:', error);
      throw error;
    }
  }

  static async calculateBookingTotal(
    propertyId: number,
    checkIn: string,
    checkOut: string,
    guests: number
  ): Promise<{
    totalAmount: number;
    breakdown: {
      basePrice: number;
      serviceFee: number;
      taxes: number;
    };
  }> {
    try {
      await simulateDelay(400); // Simulate network delay
      
      const property = dummyProperties.find(p => p.id === propertyId);
      if (!property) {
        throw new Error('Property not found');
      }

      const checkInDate = new Date(checkIn);
      const checkOutDate = new Date(checkOut);
      const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));

      const basePrice = property.price * nights;
      const serviceFee = basePrice * 0.10; // 10% service fee
      const taxes = basePrice * 0.05; // 5% taxes
      const totalAmount = basePrice + serviceFee + taxes;

      return {
        totalAmount,
        breakdown: {
          basePrice,
          serviceFee,
          taxes
        }
      };
    } catch (error) {
      console.error('MockBookingService.calculateBookingTotal error:', error);
      throw error;
    }
  }

  static async getUpcomingBookings(userId: string): Promise<Booking[]> {
    try {
      await simulateDelay(500); // Simulate network delay
      
      const now = new Date();
      return dummyBookings.filter(b => 
        b.user_id === userId && 
        b.status === 'confirmed' && 
        new Date(b.check_in) > now
      );
    } catch (error) {
      console.error('MockBookingService.getUpcomingBookings error:', error);
      throw error;
    }
  }

  static async getPastBookings(userId: string): Promise<Booking[]> {
    try {
      await simulateDelay(500); // Simulate network delay
      
      const now = new Date();
      return dummyBookings.filter(b => 
        b.user_id === userId && 
        b.status === 'confirmed' && 
        new Date(b.check_out) < now
      );
    } catch (error) {
      console.error('MockBookingService.getPastBookings error:', error);
      throw error;
    }
  }
} 