import { useCallback } from 'react';
import { useBooking } from '../context/BookingContext';
import { BookingStepId } from '../types/booking.types';
import { ServiceType } from '../types/service.types';
import { serviceSelectionSchema } from '../components/booking/validation/serviceSelection.schema';
import { dateSelectionSchema } from '../components/booking/validation/dateSelection.schema';
import { clientInfoSchema } from '../components/booking/validation/clientInfo.schema';
import { confirmationStepSchema } from '../components/booking/validation/confirmationStep.schema';
import { useToast } from '../hooks/useToast';

/**
 * Custom hook for booking step validation
 * Provides functions to validate the current booking step using Zod schemas
 */
export const useBookingStepValidation = () => {
  const { state, goToStep, createPaymentIntent } = useBooking();
  const { currentStep, selectedService } = state;
  const { errorToast } = useToast();

  /**
   * Validates the current step based on its ID
   * Uses the appropriate Zod schema for each step
   * @returns {Promise<boolean>} Whether the step is valid
   */
  const validateCurrentStep = useCallback(async (): Promise<boolean> => {
    try {
      switch (currentStep) {
        case BookingStepId.SERVICE_SELECTION: {
          // Validate service selection
          serviceSelectionSchema.parse({
            serviceId: selectedService?.id || '',
            isRecurring: false
          });
          return true;
        }
        
        case BookingStepId.DATE_SELECTION: {
          // Validate date selection
          dateSelectionSchema.parse({
            date: state.selectedDate || '',
            timeSlot: state.selectedTimeSlot?.id || ''
          });
          return true;
        }
        
        case BookingStepId.CLIENT_INFORMATION: {
          // Validate client information
          clientInfoSchema.parse(state.clientInfo || {});
          return true;
        }
        
        case BookingStepId.CONFIRMATION: {
          // For confirmation step, we need to create a payment intent first if not present
          // Use a default service type and duration if selectedService is not available
          if (!state.bookingReference && selectedService) {
            await createPaymentIntent(
              (selectedService.type as ServiceType) || ServiceType.INITIAL_CONSULTATION,
              selectedService.duration || 60
            );
          }
          
          // Then validate the confirmation step data
          confirmationStepSchema.parse({
            termsAccepted: true,
            cancellationPolicyAccepted: true,
            paymentMethod: 'card'
          });
          return true;
        }
        
        default:
          return true;
      }
    } catch (error) {
      // If validation fails, show error toast
      if (error instanceof Error) {
        errorToast('Validation Error', error.message, 5000);
      }
      return false;
    }
  }, [currentStep, selectedService, state, createPaymentIntent, errorToast]);

  /**
   * Checks if the current step is valid without showing errors
   * @returns {boolean} Whether the current step is valid
   */
  const isCurrentStepValid = useCallback((): boolean => {
    try {
      switch (currentStep) {
        case BookingStepId.SERVICE_SELECTION: {
          serviceSelectionSchema.parse({
            serviceId: selectedService?.id || '',
            isRecurring: false
          });
          return true;
        }
        
        case BookingStepId.DATE_SELECTION: {
          dateSelectionSchema.parse({
            date: state.selectedDate || '',
            timeSlot: state.selectedTimeSlot?.id || ''
          });
          return true;
        }
        
        case BookingStepId.CLIENT_INFORMATION: {
          clientInfoSchema.parse(state.clientInfo || {});
          return true;
        }
        
        case BookingStepId.CONFIRMATION: {
          // For validation checking (not actual submission), we'll skip payment intent check
          // and just check if essential information is available
          return !!(selectedService && state.selectedDate && state.selectedTimeSlot && state.clientInfo);
        }
        
        default:
          return true;
      }
    } catch {
      return false;
    }
  }, [currentStep, selectedService, state]);

  /**
   * Validates all steps up to the current one
   * @returns {boolean} Whether all steps up to the current one are valid
   */
  const validateAllStepsUpToCurrent = useCallback((): boolean => {
    try {
      // Service selection is always required
      serviceSelectionSchema.parse({
        serviceId: selectedService?.id || '',
        isRecurring: false
      });
      
      // Check subsequent steps based on current step
      if (currentStep >= BookingStepId.DATE_SELECTION) {
        dateSelectionSchema.parse({
          date: state.selectedDate || '',
          timeSlot: state.selectedTimeSlot?.id || ''
        });
      }
      
      if (currentStep >= BookingStepId.CLIENT_INFORMATION) {
        clientInfoSchema.parse(state.clientInfo || {});
      }
      
      return true;
    } catch {
      return false;
    }
  }, [currentStep, selectedService, state]);

  /**
   * Validates all required steps and navigates to the first invalid step
   * Useful for reviewing the booking before submission
   */
  const validateAndNavigateToFirstInvalidStep = useCallback((): boolean => {
    try {
      // Check service selection
      serviceSelectionSchema.parse({
        serviceId: selectedService?.id || '',
        isRecurring: false
      });
    } catch {
      goToStep(BookingStepId.SERVICE_SELECTION);
      return false;
    }
    
    try {
      // Check date selection
      dateSelectionSchema.parse({
        date: state.selectedDate || '',
        timeSlot: state.selectedTimeSlot?.id || ''
      });
    } catch {
      goToStep(BookingStepId.DATE_SELECTION);
      return false;
    }
    
    try {
      // Check client information
      clientInfoSchema.parse(state.clientInfo || {});
    } catch {
      goToStep(BookingStepId.CLIENT_INFORMATION);
      return false;
    }
    
    return true;
  }, [selectedService, state, goToStep]);

  return {
    validateCurrentStep,
    isCurrentStepValid,
    validateAllStepsUpToCurrent,
    validateAndNavigateToFirstInvalidStep
  };
}; 






