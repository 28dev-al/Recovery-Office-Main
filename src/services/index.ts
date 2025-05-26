/**
 * Services Index
 * 
 * This file exports all service functions for API, booking, contact, and newsletter services.
 * All services implement sacred geometry principles for timing and data structures.
 */

// Import the default export from api.client and re-export it with names
import apiClientDefault from './api.client';
export const api = apiClientDefault;
export const apiClient = apiClientDefault;
import { ApiRequestOptions } from '../types/api.types';
export const getWithRetry = (url: string, options?: ApiRequestOptions) => {
  return apiClientDefault.get(url, options);
};

// Import the BookingService first since we use it below
import { BookingService, bookingService } from './booking.service';

// Export Booking service
export { BookingService, bookingService };

// Re-export static methods for backward compatibility
export const getAvailableDates = BookingService.getAvailableDates;
export const getAvailableSlots = BookingService.getAvailableTimeSlots;
export const getAvailableServices = BookingService.getAvailableServices;
export const createBooking = BookingService.submitBooking;
export const getBookingById = BookingService.prototype.getBooking;
export const cancelBooking = BookingService.cancelBooking;

// Export Contact service
export {
  submitContactForm,
  getContactSubmission,
  getContactSubmissions,
  submitFeedback,
  calculateEstimatedResponseTime,
  determinePriority
} from './contact';

// Export Newsletter service
export {
  subscribeToNewsletter,
  unsubscribeFromNewsletter,
  confirmNewsletterSubscription,
  updateNewsletterPreferences,
  getNewsletterSubscription,
  getNewsletterStats
} from './newsletter';

// Export types from api.types instead of newsletter
export type { 
  NewsletterSubscriptionRequest,
  NewsletterSubscriptionResponse
} from '../types/api.types';

// Export re-export all booking service types
export * from './booking.service';

// Additional services will be exported as they are implemented
// export * from './booking';
// export * from './newsletter';
// export * from './contact'; 





