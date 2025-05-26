import * as React from 'react';
import { useEffect, useRef } from 'react';
import { useBooking } from '../../context/BookingContext';
import { BookingStepId } from '../../types/booking.types';

interface BookingErrorLoggerProps {
  children: React.ReactNode;
  stepId: BookingStepId;
  componentName: string;
}

/**
 * BookingErrorLogger
 * 
 * A component that logs detailed state information when errors occur in the booking system.
 * This helps with debugging by capturing the exact state at the time of failure.
 */
const BookingErrorLogger: React.FC<BookingErrorLoggerProps> = ({ 
  children, 
  stepId, 
  componentName 
}) => {
  const { state } = useBooking();
  const prevStateRef = useRef(state);
  
  // Log important state changes for debugging
  useEffect(() => {
    if (JSON.stringify(prevStateRef.current) !== JSON.stringify(state)) {
      console.debug(`[BookingErrorLogger:${componentName}] State updated:`, {
        currentStep: state.currentStep,
        selectedService: state.selectedService ? {
          id: state.selectedService.id,
          name: state.selectedService.name,
          // Omit potentially large fields for cleaner logs
          hasImage: !!state.selectedService.image
        } : null,
        selectedDate: state.selectedDate,
        selectedTimeSlot: state.selectedTimeSlot ? {
          id: state.selectedTimeSlot.id,
          startTime: state.selectedTimeSlot.startTime,
          available: state.selectedTimeSlot.available
        } : null,
        hasClientInfo: !!state.clientInfo,
        apiError: state.apiError,
        loading: state.loading,
        loadingState: state.loadingState,
        servicesCount: state.availableServices?.length || 0
      });
      
      prevStateRef.current = state;
    }
  }, [state, componentName]);
  
  // Set up global error handler for unhandled errors
  useEffect(() => {
    const handleGlobalError = (event: ErrorEvent) => {
      console.error(`[BookingErrorLogger:${componentName}] Unhandled error:`, event.error);
      
      // Log current state for debugging
      console.error(`[BookingErrorLogger:${componentName}] State at error time:`, {
        currentStep: state.currentStep,
        stepId,
        selectedService: state.selectedService ? {
          id: state.selectedService.id,
          name: state.selectedService.name,
          type: state.selectedService.type,
          hasImage: !!state.selectedService.image
        } : null,
        availableServices: state.availableServices?.map(s => ({
          id: s.id,
          name: s.name,
          hasImage: !!s.image
        })),
        selectedDate: state.selectedDate,
        selectedTimeSlot: state.selectedTimeSlot,
        clientInfo: state.clientInfo ? {
          ...state.clientInfo,
          // Redact sensitive information
          email: state.clientInfo.email ? '[REDACTED]' : null,
          phone: state.clientInfo.phone ? '[REDACTED]' : null
        } : null,
        apiError: state.apiError,
        loadingState: state.loadingState,
        url: window.location.href,
        userAgent: navigator.userAgent
      });
      
      // Prevent default handler to avoid double-logging
      event.preventDefault();
    };
    
    window.addEventListener('error', handleGlobalError);
    return () => window.removeEventListener('error', handleGlobalError);
  }, [state, stepId, componentName]);
  
  return <>{children}</>;
};

export default BookingErrorLogger; 