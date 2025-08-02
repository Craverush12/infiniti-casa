import { simulateDelay, generateId } from '../data/dummyData';

interface MessageData {
  to: string;
  message: string;
  type?: 'text' | 'template' | 'media';
  templateName?: string;
  variables?: Record<string, string>;
}

interface MessageResponse {
  success: boolean;
  messageId?: string;
  status?: string;
  error?: string;
}

class MockWhatsAppService {
  private static instance: MockWhatsAppService;
  private messageHistory: Map<string, MessageData> = new Map();

  private constructor() {}

  static getInstance(): MockWhatsAppService {
    if (!MockWhatsAppService.instance) {
      MockWhatsAppService.instance = new MockWhatsAppService();
    }
    return MockWhatsAppService.instance;
  }

  async sendMessage(messageData: MessageData): Promise<MessageResponse> {
    try {
      await simulateDelay(1000); // Simulate message sending delay
      
      const messageId = generateId();
      
      // Store message in history
      this.messageHistory.set(messageId, messageData);
      
      console.log('📱 WhatsApp message sent:', {
        to: messageData.to,
        message: messageData.message.substring(0, 50) + '...',
        type: messageData.type || 'text'
      });
      
      return {
        success: true,
        messageId,
        status: 'sent'
      };
    } catch (error) {
      console.error('MockWhatsAppService.sendMessage error:', error);
      return {
        success: false,
        error: 'Failed to send WhatsApp message'
      };
    }
  }

  async sendOTP(phone: string, otp: string): Promise<MessageResponse> {
    try {
      await simulateDelay(800); // Simulate OTP sending delay
      
      const messageData: MessageData = {
        to: phone,
        message: `Your Infiniti Casa verification code is: ${otp}. Valid for 10 minutes.`,
        type: 'template',
        templateName: 'otp_verification',
        variables: {
          otp,
          validity: '10 minutes'
        }
      };
      
      return await this.sendMessage(messageData);
    } catch (error) {
      console.error('MockWhatsAppService.sendOTP error:', error);
      return {
        success: false,
        error: 'Failed to send OTP'
      };
    }
  }

  async sendBookingConfirmation(phone: string, bookingData: {
    bookingId: string;
    propertyName: string;
    checkIn: string;
    checkOut: string;
    totalAmount: number;
  }): Promise<MessageResponse> {
    try {
      await simulateDelay(1000); // Simulate message sending delay
      
      const messageData: MessageData = {
        to: phone,
        message: `🎉 Booking Confirmed!
        
Booking ID: ${bookingData.bookingId}
Property: ${bookingData.propertyName}
Check-in: ${bookingData.checkIn}
Check-out: ${bookingData.checkOut}
Total: ₹${bookingData.totalAmount}

Thank you for choosing Infiniti Casa!`,
        type: 'template',
        templateName: 'booking_confirmation',
        variables: {
          booking_id: bookingData.bookingId,
          property_name: bookingData.propertyName,
          check_in: bookingData.checkIn,
          check_out: bookingData.checkOut,
          total_amount: bookingData.totalAmount.toString()
        }
      };
      
      return await this.sendMessage(messageData);
    } catch (error) {
      console.error('MockWhatsAppService.sendBookingConfirmation error:', error);
      return {
        success: false,
        error: 'Failed to send booking confirmation'
      };
    }
  }

  async sendReminder(phone: string, reminderData: {
    type: 'checkin' | 'checkout' | 'payment';
    propertyName: string;
    date: string;
    details?: string;
  }): Promise<MessageResponse> {
    try {
      await simulateDelay(800); // Simulate message sending delay
      
      let message = '';
      switch (reminderData.type) {
        case 'checkin':
          message = `🔔 Check-in Reminder
          
Your stay at ${reminderData.propertyName} starts tomorrow (${reminderData.date}).
Please arrive between 2:00 PM - 4:00 PM.`;
          break;
        case 'checkout':
          message = `🔔 Check-out Reminder
          
Your stay at ${reminderData.propertyName} ends tomorrow (${reminderData.date}).
Please check out by 11:00 AM.`;
          break;
        case 'payment':
          message = `💳 Payment Reminder
          
Payment due for ${reminderData.propertyName}: ${reminderData.details}
Due date: ${reminderData.date}`;
          break;
      }
      
      const messageData: MessageData = {
        to: phone,
        message,
        type: 'template',
        templateName: 'reminder',
        variables: {
          type: reminderData.type,
          property_name: reminderData.propertyName,
          date: reminderData.date
        }
      };
      
      return await this.sendMessage(messageData);
    } catch (error) {
      console.error('MockWhatsAppService.sendReminder error:', error);
      return {
        success: false,
        error: 'Failed to send reminder'
      };
    }
  }

  async getMessageStatus(messageId: string): Promise<MessageResponse> {
    try {
      await simulateDelay(300); // Simulate status check delay
      
      const message = this.messageHistory.get(messageId);
      if (!message) {
        return {
          success: false,
          error: 'Message not found'
        };
      }
      
      // Simulate different message statuses
      const statuses = ['sent', 'delivered', 'read'];
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
      
      return {
        success: true,
        messageId,
        status: randomStatus
      };
    } catch (error) {
      console.error('MockWhatsAppService.getMessageStatus error:', error);
      return {
        success: false,
        error: 'Failed to get message status'
      };
    }
  }

  async getMessageHistory(phone?: string): Promise<Array<{ id: string; data: MessageData; status: string }>> {
    try {
      await simulateDelay(500); // Simulate network delay
      
      const messages = Array.from(this.messageHistory.entries()).map(([id, data]) => ({
        id,
        data,
        status: 'delivered'
      }));
      
      if (phone) {
        return messages.filter(msg => msg.data.to === phone);
      }
      
      return messages;
    } catch (error) {
      console.error('MockWhatsAppService.getMessageHistory error:', error);
      return [];
    }
  }

  // Helper method to validate phone number
  validatePhoneNumber(phone: string): boolean {
    // Simple validation for demo
    return phone.length >= 10 && phone.length <= 15;
  }

  // Helper method to format phone number
  formatPhoneNumber(phone: string): string {
    // Remove all non-digit characters
    const cleaned = phone.replace(/\D/g, '');
    
    // Add country code if not present
    if (!cleaned.startsWith('91') && cleaned.length === 10) {
      return `91${cleaned}`;
    }
    
    return cleaned;
  }
}

export default MockWhatsAppService.getInstance(); 