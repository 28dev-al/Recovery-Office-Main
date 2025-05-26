import { BookingService } from '../booking.service';
import { ApiError } from '../types/api.types';
import { BookingRequest } from '../../types/booking.types';

// Mock fetch API
global.fetch = jest.fn();

describe('BookingService', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('getAvailableServices', () => {
    it('should return available services on successful API call', async () => {
      const mockServices = [
        { id: '1', name: 'Massage', duration: 60, price: 100 },
        { id: '2', name: 'Acupuncture', duration: 90, price: 150 },
      ];

      // Mock the successful response
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: mockServices }),
      });

      const result = await BookingService.getAvailableServices();
      
      expect(global.fetch).toHaveBeenCalledWith('/api/services', expect.any(Object));
      expect(result).toEqual(mockServices);
    });

    it('should throw ApiError on API failure', async () => {
      const errorMessage = 'Service unavailable';
      
      // Mock the failed response
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 503,
        statusText: 'Service Unavailable',
        json: async () => ({ 
          error: { 
            code: 'SERVER_ERROR', 
            message: errorMessage 
          }
        }),
      });

      await expect(BookingService.getAvailableServices()).rejects.toThrow(ApiError);
      await expect(BookingService.getAvailableServices()).rejects.toMatchObject({
        message: errorMessage,
        statusCode: 503,
      });
    });

    it('should handle network errors properly', async () => {
      const networkError = new Error('Network failure');
      
      // Mock a network failure
      (global.fetch as jest.Mock).mockRejectedValueOnce(networkError);

      await expect(BookingService.getAvailableServices()).rejects.toThrow('Network failure');
    });
  });

  describe('getAvailableDates', () => {
    const serviceId = '1';

    it('should return available dates for a service', async () => {
      const mockDates = ['2023-06-01', '2023-06-02', '2023-06-03'];

      // Mock the successful response
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: mockDates }),
      });

      const result = await BookingService.getAvailableDates(serviceId);
      
      expect(global.fetch).toHaveBeenCalledWith(`/api/availability/dates?serviceId=${serviceId}`, expect.any(Object));
      expect(result).toEqual(mockDates);
    });

    it('should throw ApiError when service ID is invalid', async () => {
      const errorMessage = 'Invalid service ID';
      
      // Mock the failed response
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 400,
        statusText: 'Bad Request',
        json: async () => ({ 
          error: { 
            code: 'VALIDATION_ERROR', 
            message: errorMessage 
          }
        }),
      });

      await expect(BookingService.getAvailableDates(serviceId)).rejects.toThrow(ApiError);
      await expect(BookingService.getAvailableDates(serviceId)).rejects.toMatchObject({
        message: errorMessage,
        statusCode: 400,
      });
    });
  });

  describe('getAvailableTimeSlots', () => {
    const serviceId = '1';
    const date = '2023-06-01';

    it('should return available time slots for a service and date', async () => {
      const mockTimeSlots = ['09:00', '10:00', '11:00', '14:00', '15:00'];

      // Mock the successful response
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: mockTimeSlots }),
      });

      const result = await BookingService.getAvailableTimeSlots(serviceId, date);
      
      expect(global.fetch).toHaveBeenCalledWith(
        `/api/availability/time-slots?serviceId=${serviceId}&date=${date}`, 
        expect.any(Object)
      );
      expect(result).toEqual(mockTimeSlots);
    });

    it('should throw ApiError when no time slots are available', async () => {
      const errorMessage = 'No available time slots for the selected date';
      
      // Mock the failed response
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
        json: async () => ({ 
          error: { 
            code: 'RESOURCE_NOT_FOUND', 
            message: errorMessage 
          }
        }),
      });

      await expect(BookingService.getAvailableTimeSlots(serviceId, date)).rejects.toThrow(ApiError);
      await expect(BookingService.getAvailableTimeSlots(serviceId, date)).rejects.toMatchObject({
        message: errorMessage,
        statusCode: 404,
      });
    });
  });

  describe('submitBooking', () => {
    const mockBookingRequest: BookingRequest = {
      serviceId: '1',
      date: '2023-06-01',
      timeSlot: '10:00',
      client: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phone: '123-456-7890',
        dateOfBirth: '',
        address: {
          street: '',
          city: '',
          state: '',
          postalCode: '',
          country: ''
        },
        marketingOptIn: false
      },
      paymentIntentId: 'pi_123456',
      paymentMethod: 'card'
    };

    it('should successfully submit a booking', async () => {
      const mockResponse = {
        bookingId: 'booking-123',
        status: 'confirmed',
        details: {
          service: 'Massage',
          date: '2023-06-01',
          time: '10:00',
          practitioner: 'Dr. Smith'
        }
      };

      // Mock the successful response
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: mockResponse }),
      });

      const result = await BookingService.submitBooking(mockBookingRequest);
      
      expect(global.fetch).toHaveBeenCalledWith('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mockBookingRequest),
      });
      expect(result).toEqual(mockResponse);
    });

    it('should throw ApiError when booking request is invalid', async () => {
      const errorMessage = 'Invalid booking data';
      
      // Mock the failed response
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 400,
        statusText: 'Bad Request',
        json: async () => ({ 
          error: { 
            code: 'VALIDATION_ERROR', 
            message: errorMessage,
            details: {
              serviceId: 'Service ID is required',
            }
          }
        }),
      });

      await expect(BookingService.submitBooking(mockBookingRequest)).rejects.toThrow(ApiError);
      await expect(BookingService.submitBooking(mockBookingRequest)).rejects.toMatchObject({
        message: errorMessage,
        statusCode: 400,
      });
    });
  });

  describe('cancelBooking', () => {
    const bookingId = 'booking-123';
    const reason = 'Schedule conflict';

    it('should successfully cancel a booking', async () => {
      const mockResponse = {
        bookingId,
        status: 'cancelled',
        cancellationReason: reason,
        refundAmount: 0,
      };

      // Mock the successful response
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: mockResponse }),
      });

      const result = await BookingService.cancelBooking(bookingId, reason);
      
      expect(global.fetch).toHaveBeenCalledWith(`/api/bookings/${bookingId}/cancel`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reason }),
      });
      expect(result).toEqual(mockResponse);
    });

    it('should throw ApiError when booking cannot be cancelled', async () => {
      const errorMessage = 'Booking cannot be cancelled within 24 hours of appointment';
      
      // Mock the failed response
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 400,
        statusText: 'Bad Request',
        json: async () => ({ 
          error: { 
            code: 'BUSINESS_RULE_VIOLATION', 
            message: errorMessage 
          }
        }),
      });

      await expect(BookingService.cancelBooking(bookingId, reason)).rejects.toThrow(ApiError);
      await expect(BookingService.cancelBooking(bookingId, reason)).rejects.toMatchObject({
        message: errorMessage,
        statusCode: 400,
      });
    });
  });

  describe('rescheduleBooking', () => {
    const bookingId = 'booking-123';
    const newDate = '2023-06-10';
    const newTimeSlot = '14:00';

    it('should successfully reschedule a booking', async () => {
      const mockResponse = {
        bookingId,
        status: 'rescheduled',
        previousDate: '2023-06-01',
        previousTime: '10:00',
        newDate,
        newTime: newTimeSlot,
      };

      // Mock the successful response
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: mockResponse }),
      });

      const result = await BookingService.rescheduleBooking(bookingId, newDate, newTimeSlot);
      
      expect(global.fetch).toHaveBeenCalledWith(`/api/bookings/${bookingId}/reschedule`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ date: newDate, timeSlot: newTimeSlot }),
      });
      expect(result).toEqual(mockResponse);
    });

    it('should throw ApiError when booking cannot be rescheduled', async () => {
      const errorMessage = 'Selected time slot is not available';
      
      // Mock the failed response
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 409,
        statusText: 'Conflict',
        json: async () => ({ 
          error: { 
            code: 'RESOURCE_CONFLICT', 
            message: errorMessage 
          }
        }),
      });

      await expect(BookingService.rescheduleBooking(bookingId, newDate, newTimeSlot)).rejects.toThrow(ApiError);
      await expect(BookingService.rescheduleBooking(bookingId, newDate, newTimeSlot)).rejects.toMatchObject({
        message: errorMessage,
        statusCode: 409,
      });
    });
  });

  describe('createPaymentIntent', () => {
    const amount = 100;
    const currency = 'usd';

    it('should successfully create a payment intent', async () => {
      const mockResponse = {
        clientSecret: 'pi_secret_123',
        paymentIntentId: 'pi_123',
        amount,
        currency,
      };

      // Mock the successful response
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: mockResponse }),
      });

      const result = await BookingService.createPaymentIntent(amount, currency);
      
      expect(global.fetch).toHaveBeenCalledWith('/api/payments/create-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount, currency }),
      });
      expect(result).toEqual(mockResponse);
    });

    it('should throw ApiError when payment creation fails', async () => {
      const errorMessage = 'Payment processing is temporarily unavailable';
      
      // Mock the failed response
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 503,
        statusText: 'Service Unavailable',
        json: async () => ({ 
          error: { 
            code: 'PAYMENT_PROCESSOR_ERROR', 
            message: errorMessage 
          }
        }),
      });

      await expect(BookingService.createPaymentIntent(amount, currency)).rejects.toThrow(ApiError);
      await expect(BookingService.createPaymentIntent(amount, currency)).rejects.toMatchObject({
        message: errorMessage,
        statusCode: 503,
      });
    });
  });
}); 






