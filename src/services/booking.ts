/**
 * Booking Service
 * 
 * Provides API calls and utilities for the booking system.
 * Implements sacred geometry principles for timing and data structures.
 */

import { 
  ServiceType,
  BookingStatus,
  ApiError,
  ApiErrorCode,
  HttpStatusCode,
  TimeSlot
} from '../types/api.types';

import { PHI, FIBONACCI } from '../constants/sacred-geometry';
import apiClient from './api';
import { retryWithFibonacci, categorizeError } from '../utils/apiUtils';
import { vlog, verror } from '../utils/debugLogger';

// Service details interface
export interface ServiceDetails {
  type: ServiceType;
  name: string;
  description: string;
  duration: number;
  price: number;
  availableForNewClients: boolean;
}

// Updated interfaces to match actual API
export interface CreateBookingRequestData {
  serviceType: ServiceType;
  startTime: string;
  endTime: string;
  clientInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    preferredContactMethod: 'email' | 'phone' | 'text';
    additionalNotes?: string;
  };
  isNewClient: boolean;
  existingClientId?: string;
}

export interface BookingResponseData {
  id: string;
  serviceType: ServiceType;
  startTime: string;
  endTime: string;
  duration: number;
  status: BookingStatus;
  clientInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    preferredContactMethod: 'email' | 'phone' | 'text';
    additionalNotes?: string;
  };
  createdAt: string;
  updatedAt: string;
  confirmationCode: string;
}

// Available slots request interface
export interface AvailableSlotsRequestData {
  serviceId: string;
  serviceType: ServiceType;
  date: string;
  duration?: number;
}

// Time slot request interface
export interface TimeSlotRequest {
  serviceId: string;
  date: string;
}

// Client creation request interface
export interface CreateClientRequestData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  caseType: string;
  estimatedLoss?: number;
  urgencyLevel: string;
  preferredContact: string;
  consentToContact: boolean;
  privacyPolicyAccepted: boolean;
}

/**
 * Main booking service object with all booking-related operations
 * Implements sacred geometry principles for optimal timing and user experience
 */
export const bookingService = {
  /**
   * Get available time slots for a specific service and date
   */
  async getAvailableTimeSlots(request: TimeSlotRequest): Promise<TimeSlot[]> {
    try {
      vlog('[BookingService] Fetching available time slots...', request);
      
      const startTime = Date.now();
      
      return await retryWithFibonacci(async () => {
        try {
          const response = await apiClient.getAvailableSlots(
            request.serviceId,
            request.date
          );
          
          const endTime = Date.now();
          vlog(`[BookingService] Time slots fetched in ${endTime - startTime}ms`);
          
          // Extract slots from response data with proper type handling
          const responseData = response.data as Record<string, unknown> || {};
          const slotsData = (responseData.data as unknown[]) || (responseData.slots as unknown[]) || (response.data as unknown[]) || [];
          
          if (!Array.isArray(slotsData)) {
            throw new Error(`Expected time slots array, got ${typeof slotsData}`);
          }
          
          return slotsData.map((slot: unknown) => {
            const slotObj = slot as Record<string, unknown>;
            return {
              id: String(slotObj.id || ''),
              startTime: String(slotObj.startTime || ''),
              endTime: String(slotObj.endTime || ''),
              duration: Number(slotObj.duration) || 60,
              isAvailable: slotObj.isAvailable !== false
            } as TimeSlot;
          });
          
        } catch (error) {
          const categorizedError = categorizeError(error);
          
          // Check if categorizedError has expected properties
          if (categorizedError && typeof categorizedError === 'object' && 'code' in categorizedError) {
            if (categorizedError.code === ApiErrorCode.VALIDATION_ERROR) {
              throw new Error(`Invalid request: ${categorizedError.message}`);
            }
          }
          
          throw error;
        }
      }, 'Get available time slots');
      
      } catch (error) {
      verror('[BookingService] Failed to fetch time slots', error);
      throw error;
      }
  },

  /**
   * Get available services with detailed information
   */
  async getServices(): Promise<ServiceDetails[]> {
    try {
      vlog('[BookingService] Fetching services...');
      
      const startTime = Date.now();
      
      // Use retry mechanism for resilience
      const response = await retryWithFibonacci(
        () => apiClient.getServices(),
        'Get available services'
      );
      
      const endTime = Date.now();
      vlog(`[BookingService] Services fetched in ${endTime - startTime}ms`);

      // Extract services data with proper type handling
      const responseData = response.data as Record<string, unknown> || {};
      const servicesData = (responseData.data as unknown[]) || (responseData.services as unknown[]) || (response.data as unknown[]) || [];
      
      if (!Array.isArray(servicesData)) {
        throw new Error(`Expected services array, got ${typeof servicesData}`);
      }

      return servicesData.map((service: unknown) => {
        const serviceObj = service as Record<string, unknown>;
        return {
          type: serviceObj.type as ServiceType,
          name: String(serviceObj.name || ''),
          description: String(serviceObj.description || ''),
          duration: Number(serviceObj.duration) || 60,
          price: Number(serviceObj.price) || 0,
          availableForNewClients: Boolean(serviceObj.availableForNewClients !== false)
        };
      });
      
      } catch (error) {
      verror('[BookingService] Failed to fetch services', error);
      
      // Categorize and potentially transform the error
      const categorizedError = categorizeError(error);
      
      // Check if categorizedError has expected properties
      if (categorizedError && typeof categorizedError === 'object' && 'code' in categorizedError) {
        if (categorizedError.code === ApiErrorCode.NETWORK_ERROR) {
          throw new Error('Unable to connect to booking services. Please check your internet connection and try again.');
        }
      }
      
      // Re-throw the original error for other cases
      throw error;
    }
  },

  /**
   * Create a new booking
   * @param bookingData Booking request data
   * @returns Created booking response with confirmation details
   */
  async createBooking(
    bookingData: CreateBookingRequestData
  ): Promise<BookingResponseData> {
    // Validate required fields
    if (!bookingData.serviceType || !bookingData.startTime || !bookingData.endTime || !bookingData.clientInfo) {
      throw new ApiError(
        ApiErrorCode.VALIDATION_ERROR,
        'Invalid booking request data - missing required fields',
        HttpStatusCode.BAD_REQUEST
      );
    }

    return await retryWithFibonacci(async () => {
      try {
        // Create client if needed
        let clientId: string;
        
        if (bookingData.existingClientId) {
          clientId = bookingData.existingClientId;
        } else {
          const clientData = {
            firstName: bookingData.clientInfo.firstName,
            lastName: bookingData.clientInfo.lastName,
            email: bookingData.clientInfo.email,
            phone: bookingData.clientInfo.phone,
            preferredContactMethod: bookingData.clientInfo.preferredContactMethod,
            additionalNotes: bookingData.clientInfo.additionalNotes
          };
          
          const clientResponse = await apiClient.createClient(clientData);
          const clientResponseData = clientResponse.data as Record<string, unknown> || {};
          clientId = String((clientResponseData.id as string) || (clientResponseData.data as Record<string, unknown>)?.id || '');
        }

        // Get services to find the service ID
        const servicesResponse = await apiClient.getServices();
        const servicesData = servicesResponse.data as Record<string, unknown> || {};
        const servicesArray = (servicesData.data as unknown[]) || (servicesData.services as unknown[]) || (servicesResponse.data as unknown[]) || [];
        const service = servicesArray.find((s: unknown) => {
          const serviceObj = s as Record<string, unknown>;
          return serviceObj.type === bookingData.serviceType;
        }) as Record<string, unknown> | undefined;
        
        if (!service) {
          throw new ApiError(
            ApiErrorCode.RESOURCE_NOT_FOUND,
            'Selected service not found',
            HttpStatusCode.NOT_FOUND
          );
        }

        // Create the booking
        const bookingResponse = await apiClient.createBooking({
          clientId: clientId,
          serviceId: String(service.id || ''),
          date: bookingData.startTime.split('T')[0], // Extract date part
          timeSlotId: `${bookingData.startTime}_${bookingData.endTime}`, // Create timeSlot ID
          specialRequests: bookingData.clientInfo.additionalNotes
        });
        
        const bookingResponseData = bookingResponse.data as Record<string, unknown> || {};
        const booking = (bookingResponseData.data as Record<string, unknown>) || bookingResponseData;
        
        // Transform the response to match our expected format
        return {
          id: String(booking.id || ''),
          serviceType: bookingData.serviceType,
          startTime: bookingData.startTime,
          endTime: bookingData.endTime,
          duration: Math.round((new Date(bookingData.endTime).getTime() - new Date(bookingData.startTime).getTime()) / (1000 * 60)),
          status: (booking.status as BookingStatus) || BookingStatus.PENDING,
          clientInfo: bookingData.clientInfo,
          createdAt: String(booking.createdAt || new Date().toISOString()),
          updatedAt: String(booking.updatedAt || new Date().toISOString()),
          confirmationCode: String(booking.confirmationCode || `RO-${Date.now()}`)
        };
      } catch (error) {
        const apiError = categorizeError(error);
        
        // Special handling for validation errors
        if (apiError.code === ApiErrorCode.VALIDATION_ERROR) {
          throw new ApiError(
            ApiErrorCode.VALIDATION_ERROR,
            'Please check your booking information and try again',
            HttpStatusCode.UNPROCESSABLE_ENTITY,
            apiError.details
          );
        }
        
        // Special handling for booking conflicts
        if (apiError.code === ApiErrorCode.BOOKING_CONFLICT) {
          throw new ApiError(
            ApiErrorCode.BOOKING_CONFLICT,
            'This time slot is no longer available. Please select another time.',
            HttpStatusCode.CONFLICT
          );
        }
        
        throw apiError;
      }
    }, 'Create booking');
  },

  /**
   * Cancel an existing booking
   * @param bookingId ID of the booking to cancel
   * @param _reason Optional cancellation reason
   * @returns Cancellation confirmation
   */
  async cancelBooking(
    bookingId: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _reason?: string
  ): Promise<{ success: boolean; message: string }> {
    if (!bookingId || typeof bookingId !== 'string') {
      throw new ApiError(
        ApiErrorCode.VALIDATION_ERROR,
        'Invalid booking ID',
        HttpStatusCode.BAD_REQUEST
      );
    }

    return await retryWithFibonacci(async () => {
      try {
        // Note: This method doesn't exist in our current API client
        // This is placeholder code that would need actual implementation
        throw new Error('cancelBooking not implemented - API client missing cancelBooking method');
      } catch (error) {
        const apiError = categorizeError(error);
        
        // Handle booking not found
        if (apiError.code === ApiErrorCode.RESOURCE_NOT_FOUND) {
          throw new ApiError(
            ApiErrorCode.RESOURCE_NOT_FOUND,
            'Booking not found',
            HttpStatusCode.NOT_FOUND
          );
        }
        
        throw apiError;
      }
    }, 'Cancel booking');
  },

  /**
   * Reschedule an existing booking
   * @param bookingId ID of the booking to reschedule
   * @param newStartTime New start time
   * @param newEndTime New end time
   * @returns Updated booking information
   */
  async rescheduleBooking(
    bookingId: string,
    newStartTime: string,
    newEndTime: string
  ): Promise<BookingResponseData> {
    if (!bookingId || !newStartTime || !newEndTime) {
      throw new ApiError(
        ApiErrorCode.VALIDATION_ERROR,
        'Missing required parameters for rescheduling',
        HttpStatusCode.BAD_REQUEST
      );
    }

    return await retryWithFibonacci(async () => {
      try {
        // Note: This method doesn't exist in our current API client
        // This is placeholder code that would need actual implementation
        throw new Error('rescheduleBooking not implemented - API client missing rescheduleBooking method');
      } catch (error) {
        const apiError = categorizeError(error);
        
        // Handle booking conflicts for reschedule
        if (apiError.code === ApiErrorCode.BOOKING_CONFLICT) {
          throw new ApiError(
            ApiErrorCode.BOOKING_CONFLICT,
            'The requested time slot is not available for rescheduling',
            HttpStatusCode.CONFLICT
          );
        }
        
        throw apiError;
      }
    }, 'Reschedule booking');
  },

  /**
   * Get available dates for a specific service
   * @param startDate Start date for availability check
   * @param endDate End date for availability check
   * @returns Array of available dates with slot counts
   */
  async getAvailableDates(
    startDate: string,
    endDate: string
  ): Promise<Array<{ date: string; availableSlots: number }>> {
    try {
      vlog('[BookingService] Fetching available dates...', { startDate, endDate });
      
      return await retryWithFibonacci(async () => {
        try {
          // For now, return mock data since the API endpoint may not exist
          const dates: Array<{ date: string; availableSlots: number }> = [];
          const start = new Date(startDate);
          const end = new Date(endDate);
          
          for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
            // Skip weekends for professional services
            if (d.getDay() !== 0 && d.getDay() !== 6) {
              dates.push({
                date: d.toISOString().split('T')[0],
                availableSlots: Math.floor(Math.random() * 8) + 2 // Mock 2-10 slots
              });
            }
          }
          
          return dates;
      } catch (error) {
          throw categorizeError(error);
        }
      }, 'Get available dates');
      
    } catch (error) {
      verror('[BookingService] Failed to fetch available dates', error);
      throw error;
    }
  }
};

/**
 * Calculate optimal session duration based on sacred geometry principles
 * @param requestedMinutes Requested session duration in minutes
 * @returns Optimized session duration following Fibonacci sequence
 */
export function calculateOptimalSessionDuration(requestedMinutes: number): number {
  // Convert requested duration to the nearest Fibonacci number
  const fibValues = Object.values(FIBONACCI);
  
  // Find the closest Fibonacci value (minimum 30 minutes, maximum 120 minutes)
  const validFibValues = fibValues.filter(v => v >= 30 && v <= 120);
  
  const closestFib = validFibValues.reduce((prev, curr) => 
    Math.abs(curr - requestedMinutes) < Math.abs(prev - requestedMinutes) ? curr : prev
  );
  
  return closestFib;
}

/**
 * Calculate price based on duration following golden ratio principles
 * @param durationMinutes Session duration in minutes
 * @param basePrice Base price for the standard session
 * @returns Calculated price
 */
export function calculatePriceFromDuration(durationMinutes: number, basePrice: number = 75): number {
  // Standard session is 50 minutes at base price
  const standardDuration = 50;
  
  // Apply golden ratio to calculate the price proportionally
  const priceRatio = (durationMinutes / standardDuration) * PHI;
  
  // Round to nearest whole dollar
  return Math.round(basePrice * priceRatio);
}

/**
 * Recommend optimal booking times based on sacred geometry principles
 * @param availableSlots Array of available time slots
 * @param count Number of recommendations to return
 * @returns Array of recommended time slots
 */
export function recommendOptimalBookingTimes(availableSlots: TimeSlot[], count: number = 3): TimeSlot[] {
  // Filter to only available slots
  const availableOnly = availableSlots.filter(slot => slot.isAvailable);
  
  if (availableOnly.length <= count) {
    return availableOnly;
  }
  
  // Get slots at golden ratio positions through the day
  const totalSlots = availableOnly.length;
  const recommendations: TimeSlot[] = [];
  
  // Get slots at golden ratio intervals
  for (let i = 0; i < count; i++) {
    // Calculate position using golden ratio to spread throughout the day
    const position = Math.floor((i * PHI) % 1 * totalSlots);
    if (position >= 0 && position < availableOnly.length) {
      recommendations.push(availableOnly[position]);
    }
  }
  
  return recommendations;
} 






