import { simulateDelay, generateId } from '../data/dummyData';
import type { Database } from '../lib/database.types';

type PaymentStatus = Database['public']['Enums']['payment_status'];

interface PaymentRequest {
  amount: number;
  currency: string;
  paymentMethod: string;
  bookingId: number;
  customerDetails: {
    name: string;
    email: string;
    phone: string;
  };
}

interface PaymentResponse {
  success: boolean;
  paymentId?: string;
  status?: PaymentStatus;
  message?: string;
  error?: string;
}

export class MockPaymentService {
  static async processPayment(paymentRequest: PaymentRequest): Promise<PaymentResponse> {
    try {
      await simulateDelay(2000); // Simulate payment processing delay
      
      // Simulate payment success/failure (90% success rate for demo)
      const isSuccess = Math.random() > 0.1;
      
      if (isSuccess) {
        const paymentId = generateId().toUpperCase();
        
        console.log('💳 Payment processed successfully:', paymentId, paymentRequest.amount);
        
        return {
          success: true,
          paymentId,
          status: 'completed' as PaymentStatus,
          message: 'Payment processed successfully'
        };
      } else {
        console.log('💳 Payment failed:', paymentRequest.amount);
        
        return {
          success: false,
          status: 'failed' as PaymentStatus,
          error: 'Payment processing failed. Please try again.'
        };
      }
    } catch (error) {
      console.error('MockPaymentService.processPayment error:', error);
      return {
        success: false,
        status: 'failed' as PaymentStatus,
        error: 'Payment service unavailable'
      };
    }
  }

  static async getPaymentStatus(paymentId: string): Promise<PaymentResponse> {
    try {
      await simulateDelay(500); // Simulate network delay
      
      // Simulate payment status check
      const statuses: PaymentStatus[] = ['pending', 'completed', 'failed'];
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
      
      return {
        success: true,
        paymentId,
        status: randomStatus,
        message: `Payment status: ${randomStatus}`
      };
    } catch (error) {
      console.error('MockPaymentService.getPaymentStatus error:', error);
      return {
        success: false,
        error: 'Failed to get payment status'
      };
    }
  }

  static async refundPayment(paymentId: string, amount: number): Promise<PaymentResponse> {
    try {
      await simulateDelay(1500); // Simulate refund processing delay
      
      console.log('💳 Refund processed:', paymentId, amount);
      
      return {
        success: true,
        paymentId,
        status: 'refunded' as PaymentStatus,
        message: 'Refund processed successfully'
      };
    } catch (error) {
      console.error('MockPaymentService.refundPayment error:', error);
      return {
        success: false,
        error: 'Failed to process refund'
      };
    }
  }

  static async updateBookingPaymentStatus(bookingId: number, status: PaymentStatus): Promise<boolean> {
    try {
      await simulateDelay(300); // Simulate network delay
      
      console.log('💳 Booking payment status updated:', bookingId, status);
      
      return true;
    } catch (error) {
      console.error('MockPaymentService.updateBookingPaymentStatus error:', error);
      return false;
    }
  }

  // Helper method to validate payment details
  static validatePaymentDetails(paymentRequest: PaymentRequest): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    if (paymentRequest.amount <= 0) {
      errors.push('Invalid amount');
    }
    
    if (!paymentRequest.customerDetails.name) {
      errors.push('Customer name is required');
    }
    
    if (!paymentRequest.customerDetails.email) {
      errors.push('Customer email is required');
    }
    
    if (!paymentRequest.customerDetails.phone) {
      errors.push('Customer phone is required');
    }
    
    return {
      valid: errors.length === 0,
      errors
    };
  }

  // Helper method to generate payment receipt
  static generateReceipt(paymentId: string, amount: number, currency: string): string {
    return `
      PAYMENT RECEIPT
      ===============
      Payment ID: ${paymentId}
      Amount: ${currency} ${amount}
      Date: ${new Date().toLocaleDateString()}
      Time: ${new Date().toLocaleTimeString()}
      Status: Completed
    `;
  }
} 