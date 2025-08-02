import { dummyUsers, dummyOTPData, simulateDelay, generateId } from '../data/dummyData';
import type { Database } from '../lib/database.types';

type UserProfile = Database['public']['Tables']['user_profiles']['Row'];
type UserProfileUpdate = Database['public']['Tables']['user_profiles']['Update'];

// In-memory storage for demo purposes
let currentUser: UserProfile | null = null;
let otpStorage = { ...dummyOTPData };

export class MockAuthService {
  // Generate OTP for phone verification
  static async generateOTP(phone: string): Promise<{ success: boolean; message: string }> {
    try {
      await simulateDelay(1000); // Simulate network delay
      
      // Generate a 6-digit OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiry

      // Store OTP in memory
      otpStorage[phone.replace(/\D/g, '')] = {
        otp,
        expires_at: expiresAt.toISOString(),
        is_used: false
      };

      // Simulate WhatsApp delivery
      console.log(`📱 OTP sent to ${phone}: ${otp}`);

      return {
        success: true,
        message: 'OTP sent successfully via WhatsApp'
      };
    } catch (error) {
      console.error('MockAuthService.generateOTP error:', error);
      return {
        success: false,
        message: 'Failed to send OTP'
      };
    }
  }

  // Verify OTP and create/update user profile
  static async verifyOTP(phone: string, otp: string): Promise<{ 
    success: boolean; 
    user?: UserProfile; 
    message: string;
    isNewUser?: boolean;
  }> {
    try {
      await simulateDelay(1500); // Simulate network delay
      
      const phoneKey = phone.replace(/\D/g, '');
      const otpData = otpStorage[phoneKey];

      if (!otpData || otpData.otp !== otp || otpData.is_used || new Date(otpData.expires_at) < new Date()) {
        return {
          success: false,
          message: 'Invalid or expired OTP'
        };
      }

      // Mark OTP as used
      otpData.is_used = true;

      // Check if user profile exists
      let user = dummyUsers.find(u => u.phone === phone);
      let isNewUser = false;

      if (!user) {
        // Create new user profile
        const newUser: UserProfile = {
          id: generateId(),
          phone,
          full_name: `User ${phone.slice(-4)}`,
          email: `user${phone.slice(-4)}@example.com`,
          is_verified: true,
          preferences: { 
            notifications: true, 
            language: 'en',
            theme: 'light',
            currency: 'INR'
          },
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        
        dummyUsers.push(newUser);
        user = newUser;
        isNewUser = true;
      }

      // Set as current user
      currentUser = user;

      return {
        success: true,
        user,
        message: isNewUser ? 'Welcome! Your account has been created successfully.' : 'Welcome back!',
        isNewUser
      };
    } catch (error) {
      console.error('MockAuthService.verifyOTP error:', error);
      return {
        success: false,
        message: 'Failed to verify OTP'
      };
    }
  }

  // Get current user profile
  static async getCurrentUserProfile(): Promise<UserProfile | null> {
    try {
      await simulateDelay(500); // Simulate network delay
      
      // For demo purposes, return the first user if no current user
      if (!currentUser && dummyUsers.length > 0) {
        currentUser = dummyUsers[0];
      }
      
      return currentUser;
    } catch (error) {
      console.error('MockAuthService.getCurrentUserProfile error:', error);
      return null;
    }
  }

  // Update user profile
  static async updateProfile(updates: UserProfileUpdate): Promise<UserProfile | null> {
    try {
      await simulateDelay(800); // Simulate network delay
      
      if (!currentUser) {
        return null;
      }

      // Update the current user
      const updatedUser = { ...currentUser, ...updates, updated_at: new Date().toISOString() };
      currentUser = updatedUser;

      // Update in dummy users array
      const userIndex = dummyUsers.findIndex(u => u.id === currentUser.id);
      if (userIndex !== -1) {
        dummyUsers[userIndex] = updatedUser;
      }

      return updatedUser;
    } catch (error) {
      console.error('MockAuthService.updateProfile error:', error);
      return null;
    }
  }

  // Sign out user
  static async signOut(): Promise<{ success: boolean; message: string }> {
    try {
      await simulateDelay(300); // Simulate network delay
      
      currentUser = null;
      
      return {
        success: true,
        message: 'Signed out successfully'
      };
    } catch (error) {
      console.error('MockAuthService.signOut error:', error);
      return {
        success: false,
        message: 'Failed to sign out'
      };
    }
  }

  // Check if phone is verified
  static async isPhoneVerified(phone: string): Promise<boolean> {
    try {
      await simulateDelay(200); // Simulate network delay
      
      const user = dummyUsers.find(u => u.phone === phone);
      return user?.is_verified || false;
    } catch (error) {
      console.error('MockAuthService.isPhoneVerified error:', error);
      return false;
    }
  }

  // Resend OTP
  static async resendOTP(phone: string): Promise<{ success: boolean; message: string }> {
    try {
      await simulateDelay(1000); // Simulate network delay
      
      // Generate new OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

      const phoneKey = phone.replace(/\D/g, '');
      otpStorage[phoneKey] = {
        otp,
        expires_at: expiresAt.toISOString(),
        is_used: false
      };

      console.log(`📱 OTP resent to ${phone}: ${otp}`);

      return {
        success: true,
        message: 'OTP resent successfully via WhatsApp'
      };
    } catch (error) {
      console.error('MockAuthService.resendOTP error:', error);
      return {
        success: false,
        message: 'Failed to resend OTP'
      };
    }
  }

  // Get user by phone
  static async getUserByPhone(phone: string): Promise<UserProfile | null> {
    try {
      await simulateDelay(300); // Simulate network delay
      
      return dummyUsers.find(u => u.phone === phone) || null;
    } catch (error) {
      console.error('MockAuthService.getUserByPhone error:', error);
      return null;
    }
  }

  // Update user preferences
  static async updatePreferences(preferences: Record<string, any>): Promise<boolean> {
    try {
      await simulateDelay(500); // Simulate network delay
      
      if (!currentUser) {
        return false;
      }

      const updatedUser = { 
        ...currentUser, 
        preferences: { ...currentUser.preferences, ...preferences },
        updated_at: new Date().toISOString()
      };
      
      currentUser = updatedUser;

      // Update in dummy users array
      const userIndex = dummyUsers.findIndex(u => u.id === currentUser.id);
      if (userIndex !== -1) {
        dummyUsers[userIndex] = updatedUser;
      }

      return true;
    } catch (error) {
      console.error('MockAuthService.updatePreferences error:', error);
      return false;
    }
  }

  // Log activity (for demo purposes)
  private static async logActivity(
    userId: string, 
    activityType: string, 
    activityData: Record<string, any>
  ): Promise<void> {
    console.log(`📊 Activity logged: ${activityType}`, { userId, ...activityData });
  }
} 