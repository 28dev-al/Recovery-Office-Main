/**
 * Booking API Service
 * Enhanced with email confirmation support
 */

import { config } from '../config/environment';

const API_BASE_URL = config.api.baseURL;

interface BookingSubmissionData {
  // Client Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  preferredContactMethod?: string;
  
  // Case Information
  caseType: string;
  estimatedLoss?: number;
  urgencyLevel?: string;
  
  // Booking Details
  serviceId: string;
  serviceName: string;
  selectedDate: string;
  selectedTimeSlot: string;
  
  // Additional Information
  notes?: string;
  marketingConsent?: boolean;
  termsAccepted: boolean;
}

interface BookingResponse {
  success: boolean;
  message: string;
  data?: {
    bookingId: string;
    reference: string;
    confirmationEmailSent: boolean;
    internalNotificationSent?: boolean;
  };
  error?: string;
}

export const bookingApi = {
  /**
   * Submit a new booking with email confirmation
   */
  async submitBooking(bookingData: BookingSubmissionData): Promise<BookingResponse> {
    try {
      console.log('[Booking API] Submitting booking with email integration:', bookingData);
      
      const response = await fetch(`${API_BASE_URL}/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          ...bookingData,
          // Email system flags
          sendConfirmationEmail: true,
          sendInternalNotification: true,
          emailProvider: 'protonmail',
          
          // Professional tracking
          submissionTimestamp: new Date().toISOString(),
          clientBrowser: navigator.userAgent,
          submissionSource: 'website'
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const result: BookingResponse = await response.json();
      
      console.log('[Booking API] Booking submitted successfully:', result);
      
      // Log email confirmation status
      if (result.data?.confirmationEmailSent) {
        console.log('✅ [Booking API] Client confirmation email sent to:', bookingData.email);
      }
      
      if (result.data?.internalNotificationSent) {
        console.log('✅ [Booking API] Internal notification sent to Recovery Office team');
      }
      
      return result;
      
    } catch (error) {
      console.error('[Booking API] Booking submission failed:', error);
      
      return {
        success: false,
        message: 'Failed to submit booking. Please try again or contact us directly.',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  },

  /**
   * Validate email before booking submission
   */
  async validateClientEmail(email: string): Promise<{ valid: boolean; message?: string }> {
    try {
      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return { valid: false, message: 'Please enter a valid email address' };
      }
      
      // Additional validation could be added here when backend is ready
      console.log('[Booking API] Email validation passed:', email);
      
      return { valid: true };
      
    } catch (error) {
      console.error('[Booking API] Email validation error:', error);
      return { valid: false, message: 'Email validation failed' };
    }
  },

  /**
   * Generate booking reference (frontend fallback)
   */
  generateBookingReference(): string {
    const timestamp = Date.now().toString();
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `RO-${timestamp.slice(-6)}-${random}`;
  },

  /**
   * Prepare email data for backend processing
   */
  prepareEmailData(bookingData: BookingSubmissionData) {
    return {
      clientData: {
        firstName: bookingData.firstName,
        lastName: bookingData.lastName,
        email: bookingData.email,
        phone: bookingData.phone,
        preferredContactMethod: bookingData.preferredContactMethod || 'email',
        caseType: bookingData.caseType,
        estimatedLoss: bookingData.estimatedLoss || 0,
        notes: bookingData.notes || ''
      },
      bookingData: {
        reference: this.generateBookingReference(),
        serviceName: bookingData.serviceName,
        selectedDate: bookingData.selectedDate,
        selectedTimeSlot: bookingData.selectedTimeSlot,
        urgencyLevel: bookingData.urgencyLevel || 'standard'
      },
      emailSettings: {
        sendClientConfirmation: true,
        sendInternalNotification: true,
        emailProvider: 'protonmail',
        fromAddress: 'contact@recovery-office.com',
        internalNotificationAddress: 'contact@recovery-office.com'
      }
    };
  }
};

export type { BookingSubmissionData, BookingResponse }; 