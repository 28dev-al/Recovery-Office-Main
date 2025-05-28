import * as React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BookingProvider, useBooking } from '../BookingContext';
import { BookingService } from "../../services/booking.service";
import { useToast } from '../../hooks/useToast';
import '@testing-library/jest-dom';
import { ServiceType } from '../../types/service.types';

// Mock the booking service
jest.mock('../../services/booking.service', () => ({
  BookingService: {
    getAvailableServices: jest.fn(),
    getAvailableDates: jest.fn(),
    getAvailableTimeSlots: jest.fn(),
    submitBooking: jest.fn(),
    cancelBooking: jest.fn(),
    rescheduleBooking: jest.fn(),
    createPaymentIntent: jest.fn(),
  }
}));

// Mock the toast hooks
jest.mock('../../hooks/useToast', () => ({
  useToast: jest.fn().mockReturnValue({
    successToast: jest.fn(),
    errorToast: jest.fn(),
    showToast: jest.fn(),
    toast: jest.fn()
  })
}));

// Test component to access context
const TestComponent = ({ testId = 'test-component' }) => {
  const {
    state,
    goToNextStep: nextStep,
    goToPreviousStep: prevStep,
    selectService: setSelectedService,
    selectDate: setSelectedDate,
    selectTimeSlot: setSelectedTimeSlot,
    setClientInfo,
    fetchAvailableServices,
    fetchAvailableDates,
    fetchAvailableTimeSlots,
    submitBooking,
    cancelBooking,
    rescheduleBooking,
    createPaymentIntent
  } = useBooking();
  
  return (
    <div data-testid={testId}>
      <div data-testid="current-step">{state.currentStep}</div>
      <div data-testid="loading-services">{String(state.loadingState.services)}</div>
      <div data-testid="loading-dates">{String(state.loadingState.dates)}</div>
      <div data-testid="loading-time-slots">{String(state.loadingState.timeSlots)}</div>
      <div data-testid="loading-submission">{String(state.loadingState.booking)}</div>
      <div data-testid="loading-cancellation">{String(state.loadingState.cancellation)}</div>
      <div data-testid="loading-reschedule">{String(state.loadingState.rescheduling)}</div>
      <div data-testid="loading-payment">{String(state.loadingState.paymentIntent)}</div>
      <div data-testid="error">{state.error || 'no-error'}</div>
      
      <button data-testid="next-step" onClick={nextStep}>Next</button>
      <button data-testid="prev-step" onClick={prevStep}>Back</button>
      <button 
        data-testid="fetch-services" 
        onClick={() => fetchAvailableServices()}
      >
        Fetch Services
      </button>
      <button 
        data-testid="fetch-dates" 
        onClick={() => fetchAvailableDates('2023-05-01', '2023-05-30', 'service-123')}
      >
        Fetch Dates
      </button>
      <button 
        data-testid="fetch-time-slots" 
        onClick={() => fetchAvailableTimeSlots('2023-05-15', 'service-123')}
      >
        Fetch Time Slots
      </button>
      <button 
        data-testid="submit-booking" 
        onClick={() => submitBooking(
          { 
            serviceId: 'service-123',
            isRecurring: false 
          },
          { 
            firstName: 'Test', 
            lastName: 'User', 
            email: 'test@example.com',
            phone: '123-456-7890',
            preferredContactMethod: 'email',
            isReturningClient: false,
            privacyPolicyAccepted: true,
            fraudType: "investment_fraud",
            caseDescription: "Test case description for unit testing",
            approximateLossAmount: "5000"
          },
          { 
            paymentMethod: 'credit_card',
            detailsConfirmed: true,
            cancellationPolicyAgreed: true,
            receiveReminders: true
          }
        )}
      >
        Submit Booking
      </button>
      <button 
        data-testid="create-payment" 
        onClick={() => createPaymentIntent(ServiceType.INITIAL_CONSULTATION, 60)}
      >
        Create Payment Intent
      </button>
      <button 
        data-testid="cancel-booking" 
        onClick={() => cancelBooking('booking-123')}
      >
        Cancel Booking
      </button>
      <button 
        data-testid="reschedule-booking" 
        onClick={() => rescheduleBooking('booking-123', '2023-05-16', 'slot-456')}
      >
        Reschedule Booking
      </button>
      <button 
        data-testid="set-service" 
        onClick={() => setSelectedService({
          id: 'service-123',
          name: 'Test Service',
          duration: 60,
          price: 100,
          type: ServiceType.INITIAL_CONSULTATION,
          description: 'Test service description'
        })}
      >
        Set Service
      </button>
      <button 
        data-testid="set-date" 
        onClick={() => setSelectedDate('2023-05-15')}
      >
        Set Date
      </button>
      <button 
        data-testid="set-time-slot" 
        onClick={() => setSelectedTimeSlot({
          id: 'slot-123',
          startTime: '10:00',
          endTime: '11:00',
          duration: 60,
          available: true
        })}
      >
        Set Time Slot
      </button>
      <button 
        data-testid="set-client-info" 
        onClick={() => setClientInfo({ 
          firstName: 'Test', 
          lastName: 'User', 
          email: 'test@example.com',
          phone: '123-456-7890',
          dateOfBirth: '1990-01-01',
          preferredContactMethod: 'email',
          isNewClient: true,
          fraudType: 'investment_fraud',
          caseDescription: 'Test case description for unit testing',
          approximateLossAmount: '5000',
          hasReportedToAuthorities: false,
          // Add missing required properties
          preferredContact: 'email',
          caseType: 'investment-fraud',
          estimatedLoss: 'under-10k',
          urgencyLevel: 'medium',
          consentToContact: true,
          privacyPolicyAccepted: true,
          dataProcessingAgreed: true
        })}
      >
        Set Client Info
      </button>
    </div>
  );
};

describe('BookingContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with the correct default state', () => {
    render(
      <BookingProvider>
        <TestComponent />
      </BookingProvider>
    );
    
    expect(screen.getByTestId('current-step')).toHaveTextContent('1');
    expect(screen.getByTestId('loading-services')).toHaveTextContent('false');
    expect(screen.getByTestId('loading-dates')).toHaveTextContent('false');
    expect(screen.getByTestId('loading-time-slots')).toHaveTextContent('false');
    expect(screen.getByTestId('loading-submission')).toHaveTextContent('false');
    expect(screen.getByTestId('error')).toHaveTextContent('no-error');
  });

  it('should navigate through steps', async () => {
    render(
      <BookingProvider>
        <TestComponent />
      </BookingProvider>
    );
    
    expect(screen.getByTestId('current-step')).toHaveTextContent('1');
    
    await userEvent.click(screen.getByTestId('next-step'));
    expect(screen.getByTestId('current-step')).toHaveTextContent('2');
    
    await userEvent.click(screen.getByTestId('next-step'));
    expect(screen.getByTestId('current-step')).toHaveTextContent('3');
    
    await userEvent.click(screen.getByTestId('prev-step'));
    expect(screen.getByTestId('current-step')).toHaveTextContent('2');
  });

  it('should fetch available services', async () => {
    const mockServices = [
      { id: 'service-1', name: 'Service 1', duration: 60, price: 100 },
      { id: 'service-2', name: 'Service 2', duration: 90, price: 150 }
    ];
    
    (BookingService.getAvailableServices as jest.Mock).mockResolvedValue({
      data: mockServices,
      success: true
    });
    
    render(
      <BookingProvider>
        <TestComponent />
      </BookingProvider>
    );
    
    await userEvent.click(screen.getByTestId('fetch-services'));
    
    expect(screen.getByTestId('loading-services')).toHaveTextContent('true');
    
    await waitFor(() => {
      expect(BookingService.getAvailableServices).toHaveBeenCalledTimes(1);
      expect(screen.getByTestId('loading-services')).toHaveTextContent('false');
    });
  });

  it('should fetch available dates', async () => {
    const mockDates = ['2023-05-15', '2023-05-16', '2023-05-17'];
    
    (BookingService.getAvailableDates as jest.Mock).mockResolvedValue({
      data: mockDates,
      success: true
    });
    
    render(
      <BookingProvider>
        <TestComponent />
      </BookingProvider>
    );
    
    await userEvent.click(screen.getByTestId('fetch-dates'));
    
    expect(screen.getByTestId('loading-dates')).toHaveTextContent('true');
    
    await waitFor(() => {
      expect(BookingService.getAvailableDates).toHaveBeenCalledWith('service-123');
      expect(screen.getByTestId('loading-dates')).toHaveTextContent('false');
    });
  });

  it('should fetch available time slots', async () => {
    const mockTimeSlots = [
      { id: 'slot-1', startTime: '10:00', endTime: '11:00' },
      { id: 'slot-2', startTime: '11:30', endTime: '12:30' }
    ];
    
    (BookingService.getAvailableTimeSlots as jest.Mock).mockResolvedValue({
      data: mockTimeSlots,
      success: true
    });
    
    render(
      <BookingProvider>
        <TestComponent />
      </BookingProvider>
    );
    
    await userEvent.click(screen.getByTestId('fetch-time-slots'));
    
    expect(screen.getByTestId('loading-time-slots')).toHaveTextContent('true');
    
    await waitFor(() => {
      expect(BookingService.getAvailableTimeSlots).toHaveBeenCalledWith('service-123', '2023-05-15');
      expect(screen.getByTestId('loading-time-slots')).toHaveTextContent('false');
    });
  });

  it('should handle API errors', async () => {
    (BookingService.getAvailableServices as jest.Mock).mockRejectedValue(new Error('API error'));
    
    render(
      <BookingProvider>
        <TestComponent />
      </BookingProvider>
    );
    
    await userEvent.click(screen.getByTestId('fetch-services'));
    
    await waitFor(() => {
      expect(screen.getByTestId('error')).toHaveTextContent('API error');
      expect(useToast().errorToast).toHaveBeenCalled();
    });
  });

  it('should submit booking', async () => {
    (BookingService.submitBooking as jest.Mock).mockResolvedValue({
      data: { bookingId: 'booking-123' },
      success: true
    });
    
    render(
      <BookingProvider>
        <TestComponent />
      </BookingProvider>
    );
    
    // Set necessary booking data
    await userEvent.click(screen.getByTestId('set-service'));
    await userEvent.click(screen.getByTestId('set-date'));
    await userEvent.click(screen.getByTestId('set-time-slot'));
    await userEvent.click(screen.getByTestId('set-client-info'));
    
    await userEvent.click(screen.getByTestId('submit-booking'));
    
    expect(screen.getByTestId('loading-submission')).toHaveTextContent('true');
    
    await waitFor(() => {
      expect(BookingService.submitBooking).toHaveBeenCalled();
      expect(screen.getByTestId('loading-submission')).toHaveTextContent('false');
      expect(useToast().successToast).toHaveBeenCalled();
    });
  });

  it('should create payment intent', async () => {
    (BookingService.createPaymentIntent as jest.Mock).mockResolvedValue({
      data: { clientSecret: 'secret-123' },
      success: true
    });
    
    render(
      <BookingProvider>
        <TestComponent />
      </BookingProvider>
    );
    
    // Set necessary booking data
    await userEvent.click(screen.getByTestId('set-service'));
    
    await userEvent.click(screen.getByTestId('create-payment'));
    
    expect(screen.getByTestId('loading-payment')).toHaveTextContent('true');
    
    await waitFor(() => {
      expect(BookingService.createPaymentIntent).toHaveBeenCalled();
      expect(screen.getByTestId('loading-payment')).toHaveTextContent('false');
    });
  });

  it('should cache API results', async () => {
    const mockServices = [
      { id: 'service-1', name: 'Service 1', duration: 60, price: 100 },
      { id: 'service-2', name: 'Service 2', duration: 90, price: 150 }
    ];
    
    (BookingService.getAvailableServices as jest.Mock).mockResolvedValue({
      data: mockServices,
      success: true
    });
    
    render(
      <BookingProvider>
        <TestComponent />
      </BookingProvider>
    );
    
    // First call should make the API request
    await userEvent.click(screen.getByTestId('fetch-services'));
    await waitFor(() => {
      expect(BookingService.getAvailableServices).toHaveBeenCalledTimes(1);
    });
    
    // Reset mocks to verify second call
    jest.clearAllMocks();
    
    // Second call should use cached data
    await userEvent.click(screen.getByTestId('fetch-services'));
    
    // Should not make a second API call
    expect(BookingService.getAvailableServices).not.toHaveBeenCalled();
  });

  it('should handle back navigation correctly', async () => {
    render(
      <BookingProvider>
        <TestComponent />
      </BookingProvider>
    );
    
    // Navigate to step 3
    await userEvent.click(screen.getByTestId('next-step'));
    await userEvent.click(screen.getByTestId('next-step'));
    expect(screen.getByTestId('current-step')).toHaveTextContent('3');
    
    // Go back to step 2
    await userEvent.click(screen.getByTestId('prev-step'));
    expect(screen.getByTestId('current-step')).toHaveTextContent('2');
    
    // Go back to step 1
    await userEvent.click(screen.getByTestId('prev-step'));
    expect(screen.getByTestId('current-step')).toHaveTextContent('1');
    
    // Cannot go back from step 1
    await userEvent.click(screen.getByTestId('prev-step'));
    expect(screen.getByTestId('current-step')).toHaveTextContent('1');
  });
}); 






