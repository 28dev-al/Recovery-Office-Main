import { ApiResponse, ApiErrorResponse, ApiError } from '../types/api.types';
import { ClientInformationData } from '../components/booking/validation/clientInformation.schema';
import { ConfirmationStepData } from '../components/booking/validation/confirmationStep.schema';
import { ServiceSelectionData } from '../components/booking/validation/serviceSelection.schema';
import apiClient from './api.client';
import { getFibonacciByIndex } from '../constants/sacred-geometry';
import { 
  Service, 
  AvailableDateResponse, 
  AvailableTimeSlot, 
  PaymentIntentResponse,
  BookingRequest,
  BookingResponse,
  ClientInfo
} from '../types/booking.types';

// Request timeout in milliseconds based on Fibonacci sequence
// Note: Kept for reference, might be used in future API implementations
// const REQUEST_TIMEOUT = getFibonacciByIndex(8) * 1000; // Using Fibonacci number at index 8 for timeout

/**
 * Creates a booking request payload by combining validated data from multiple steps
 * 
 * @param service Service selection data
 * @param client Client information data
 * @param confirmation Confirmation step data
 * @returns Complete booking request payload
 */
const createBookingPayload = (
  service: ServiceSelectionData,
  client: ClientInformationData,
  confirmation: ConfirmationStepData
): BookingRequest => {
  // Create a client info object that satisfies the ClientInfo interface
  const clientInfo: ClientInfo = {
    firstName: client.firstName,
    lastName: client.lastName,
    email: client.email.toLowerCase(),
    phone: client.phone,
    dateOfBirth: '', // Default value since this is required
    address: {
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: ''
    },
    marketingOptIn: Boolean(client.privacyPolicyAccepted)
  };

  // Create the booking request
  return {
    serviceId: service.serviceId,
    practitionerId: service.practitionerId,
    date: service.date || '', // Ensure date is provided
    timeSlot: service.timeSlot || '', // Ensure timeSlot is provided
    client: clientInfo,
    paymentMethod: confirmation.paymentMethod,
    paymentIntentId: confirmation.paymentIntentId || '',
  };
};

/**
 * Transforms an Axios response to our ApiResponse format
 * @param axiosResponse The Axios response object
 * @returns ApiResponse with the correct format
 */
function transformResponse<T>(axiosResponse: { data: T }): ApiResponse<T> {
  return {
    success: true,
    data: axiosResponse.data,
    timestamp: new Date().toISOString()
  };
}

/**
 * BookingService class
 * Handles all booking-related API interactions
 * Implements caching for frequently accessed data
 */
export class BookingService {
  private static instance: BookingService;
  private servicesCache: Service[] | null = null;
  private availableDatesCache: Map<string, AvailableDateResponse> = new Map();
  private availableTimeSlotsCache: Map<string, AvailableTimeSlot[]> = new Map();
  
  private constructor() {}
  
  /**
   * Get singleton instance of BookingService
   */
  public static getInstance(): BookingService {
    if (!BookingService.instance) {
      BookingService.instance = new BookingService();
    }
    return BookingService.instance;
  }

  /**
   * Get available services - Static method for testing
   */
  public static async getAvailableServices(): Promise<ApiResponse<Service[]>> {
    return BookingService.getInstance().getServices();
  }

  /**
   * Get available dates - Static method for testing
   */
  public static async getAvailableDates(
    serviceId: string,
    practitionerId?: string
  ): Promise<ApiResponse<AvailableDateResponse>> {
    return BookingService.getInstance().getAvailableDates(serviceId, practitionerId);
  }

  /**
   * Get available time slots - Static method for testing
   */
  public static async getAvailableTimeSlots(
    serviceId: string,
    date: string,
    practitionerId?: string
  ): Promise<ApiResponse<AvailableTimeSlot[]>> {
    return BookingService.getInstance().getAvailableTimeSlots(serviceId, date, practitionerId);
  }

  /**
   * Submit booking - Static method for testing
   */
  public static async submitBooking(
    bookingRequest: BookingRequest
  ): Promise<ApiResponse<BookingResponse>> {
    try {
      const response = await apiClient.post<BookingResponse>('/bookings', bookingRequest);
      return transformResponse<BookingResponse>(response);
    } catch (error) {
      throw BookingService.getInstance().handleApiError(error);
    }
  }

  /**
   * Create booking - Static method for testing
   */
  public static async createBooking(
    serviceData: ServiceSelectionData,
    clientData: ClientInformationData,
    confirmationData: ConfirmationStepData
  ): Promise<ApiResponse<BookingResponse>> {
    return BookingService.getInstance().createBooking(serviceData, clientData, confirmationData);
  }

  /**
   * Cancel booking - Static method for testing
   */
  public static async cancelBooking(
    bookingId: string,
    reason?: string
  ): Promise<ApiResponse<{ success: boolean }>> {
    return BookingService.getInstance().cancelBooking(bookingId, reason);
  }

  /**
   * Reschedule booking - Static method for testing
   */
  public static async rescheduleBooking(
    bookingId: string,
    newDate: string,
    newTimeSlot: string
  ): Promise<ApiResponse<BookingResponse>> {
    return BookingService.getInstance().rescheduleBooking(bookingId, newDate, newTimeSlot);
  }
  
  /**
   * Clear all cached data
   */
  public clearCache(): void {
    this.servicesCache = null;
    this.availableDatesCache.clear();
    this.availableTimeSlotsCache.clear();
  }
  
  /**
   * Get all available services
   * @param forceRefresh Force a refresh of cached data
   * @returns Promise with services array
   */
  public async getServices(forceRefresh = false): Promise<ApiResponse<Service[]>> {
    // Return cached services if available and not forcing refresh
    if (this.servicesCache && !forceRefresh) {
      return {
        success: true,
        data: this.servicesCache,
        timestamp: new Date().toISOString()
      };
    }
    
    try {
      // Store the response object in a variable
      const apiResponse = await apiClient.get<Service[]>('/services');
      
      // Process the response data only once and store it
      const processedData = apiResponse.data;
      
      // Cache the services
      this.servicesCache = processedData;
      
      // Return the transformed response using the already processed data
      return transformResponse<Service[]>({
        ...apiResponse,
        data: processedData
      });
    } catch (error) {
      throw this.handleApiError(error);
    }
  }
  
  /**
   * Get available dates for a service
   * @param serviceId The ID of the service
   * @param practitionerId Optional practitioner ID
   * @param forceRefresh Force a refresh of cached data
   * @returns Promise with available dates response
   */
  public async getAvailableDates(
    serviceId: string,
    practitionerId?: string,
    forceRefresh = false
  ): Promise<ApiResponse<AvailableDateResponse>> {
    // Create a cache key
    const cacheKey = `${serviceId}${practitionerId ? `-${practitionerId}` : ''}`;
    
    // Return cached dates if available and not forcing refresh
    if (this.availableDatesCache.has(cacheKey) && !forceRefresh) {
      return {
        success: true,
        data: this.availableDatesCache.get(cacheKey)!,
        timestamp: new Date().toISOString()
      };
    }
    
    try {
      const queryParams = practitionerId ? `?practitionerId=${practitionerId}` : '';
      const response = await apiClient.get<AvailableDateResponse>(`/services/${serviceId}/available-dates${queryParams}`);
      
      // Cache the available dates
      this.availableDatesCache.set(cacheKey, response.data);
      
      return transformResponse<AvailableDateResponse>(response);
    } catch (error) {
      throw this.handleApiError(error);
    }
  }
  
  /**
   * Get available time slots for a service on a specific date
   * @param serviceId The ID of the service
   * @param date The date string in ISO format
   * @param practitionerId Optional practitioner ID
   * @param forceRefresh Force a refresh of cached data
   * @returns Promise with available time slots array
   */
  public async getAvailableTimeSlots(
    serviceId: string,
    date: string,
    practitionerId?: string,
    forceRefresh = false
  ): Promise<ApiResponse<AvailableTimeSlot[]>> {
    // Create a cache key
    const cacheKey = `${serviceId}-${date}${practitionerId ? `-${practitionerId}` : ''}`;
    
    // Return cached time slots if available and not forcing refresh
    if (this.availableTimeSlotsCache.has(cacheKey) && !forceRefresh) {
      return {
        success: true,
        data: this.availableTimeSlotsCache.get(cacheKey)!,
        timestamp: new Date().toISOString()
      };
    }
    
    try {
      const queryParams = practitionerId ? `&practitionerId=${practitionerId}` : '';
      const response = await apiClient.get<AvailableTimeSlot[]>(
        `/services/${serviceId}/available-time-slots?date=${date}${queryParams}`
      );
      
      // Cache the available time slots
      this.availableTimeSlotsCache.set(cacheKey, response.data);
      
      return transformResponse<AvailableTimeSlot[]>(response);
    } catch (error) {
      throw this.handleApiError(error);
    }
  }
  
  /**
   * Create a new booking
   * @param serviceData Service selection data
   * @param clientData Client information data
   * @param confirmationData Confirmation step data
   * @returns Promise with booking response
   */
  public async createBooking(
    serviceData: ServiceSelectionData,
    clientData: ClientInformationData,
    confirmationData: ConfirmationStepData
  ): Promise<ApiResponse<BookingResponse>> {
    try {
      const bookingData = createBookingPayload(serviceData, clientData, confirmationData);
      const response = await apiClient.post<BookingResponse>('/bookings', bookingData);
      return transformResponse<BookingResponse>(response);
    } catch (error) {
      throw this.handleApiError(error);
    }
  }
  
  /**
   * Cancel a booking
   * @param bookingId The ID of the booking to cancel
   * @param reason Optional cancellation reason
   * @returns Promise with success response
   */
  public async cancelBooking(bookingId: string, reason?: string): Promise<ApiResponse<{ success: boolean }>> {
    try {
      const response = await apiClient.post<{ success: boolean }>(`/bookings/${bookingId}/cancel`, { reason });
      return transformResponse<{ success: boolean }>(response);
    } catch (error) {
      throw this.handleApiError(error);
    }
  }
  
  /**
   * Reschedule a booking
   * @param bookingId The ID of the booking to reschedule
   * @param newDate New date string in ISO format
   * @param newTimeSlot New time slot string
   * @returns Promise with updated booking response
   */
  public async rescheduleBooking(
    bookingId: string,
    newDate: string,
    newTimeSlot: string
  ): Promise<ApiResponse<BookingResponse>> {
    try {
      const response = await apiClient.post<BookingResponse>(`/bookings/${bookingId}/reschedule`, {
        date: newDate,
        timeSlot: newTimeSlot
      });
      return transformResponse<BookingResponse>(response);
    } catch (error) {
      throw this.handleApiError(error);
    }
  }
  
  /**
   * Create a payment intent for a booking
   * @param amount Payment amount in cents
   * @param currency Currency code (default: 'usd')
   * @returns Promise with payment intent response
   */
  public static async createPaymentIntent(
    amount: number,
    currency: string = 'usd'
  ): Promise<ApiResponse<PaymentIntentResponse>> {
    try {
      const response = await apiClient.post<PaymentIntentResponse>('/payments/create-intent', {
        amount,
        currency
      });
      return transformResponse<PaymentIntentResponse>(response);
    } catch (error) {
      throw BookingService.getInstance().handleApiError(error);
    }
  }
  
  /**
   * Instance method version of createPaymentIntent for backward compatibility
   * @param amount Payment amount in cents
   * @param currency Currency code (default: 'usd')
   * @returns Promise with payment intent response
   */
  public async createPaymentIntent(
    amount: number,
    currency: string = 'usd'
  ): Promise<ApiResponse<PaymentIntentResponse>> {
    return BookingService.createPaymentIntent(amount, currency);
  }
  
  /**
   * Get a booking by ID
   * @param bookingId The ID of the booking
   * @returns Promise with booking response
   */
  public async getBooking(bookingId: string): Promise<ApiResponse<BookingResponse>> {
    try {
      const response = await apiClient.get<BookingResponse>(`/bookings/${bookingId}`);
      return transformResponse<BookingResponse>(response);
    } catch (error) {
      throw this.handleApiError(error);
    }
  }
  
  /**
   * Handle API errors consistently
   * @param error The error object from API call
   * @returns Formatted error response
   */
  private handleApiError(error: unknown): ApiErrorResponse {
    if (error instanceof Error) {
      // If it's already our ApiError type
      if (error instanceof ApiError) {
        return {
          success: false,
          error: {
            code: error.code,
            message: error.message,
            details: error.details
          },
          timestamp: new Date().toISOString()
        };
      }
      
      // If it's an Axios error with a response
      if ('response' in error && error['response']) {
        const response = error['response'] as { data?: { code?: string; message?: string; details?: Record<string, unknown> } };
        return {
          success: false,
          error: {
            code: response.data?.code || 'SERVER_ERROR',
            message: response.data?.message || error.message,
            details: response.data?.details
          },
          timestamp: new Date().toISOString()
        };
      }
      
      // Network error or other error
      return {
        success: false,
        error: {
          code: 'NETWORK_ERROR',
          message: error.message,
        },
        timestamp: new Date().toISOString()
      };
    }
    
    // Unknown error
    return {
      success: false,
      error: {
        code: 'UNEXPECTED_ERROR',
        message: 'An unknown error occurred',
      },
      timestamp: new Date().toISOString()
    };
  }
}

// Export singleton instance
export const bookingService = BookingService.getInstance(); 





