import * as React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Box } from '../../design-system/components/layout/Box';
import { SACRED_SPACING } from '../../constants/sacred-geometry';
import { ErrorDisplay } from '../../design-system/components/feedback/ErrorDisplay';
import { LoadingOverlay } from '../../design-system/components/feedback/LoadingOverlay';
import { VisuallyHidden } from '../../design-system/components/utility/VisuallyHidden';
import { BookingStepId, ServiceOption } from '../../types/booking.types';
import { useBooking } from '../../context/BookingContext';
import { Portal } from '../../design-system/components/utility/Portal';
import { GlobalStyles } from '../../design-system/components/utility/GlobalStyles';
import ServiceSelectionStep from './steps/ServiceSelectionStep';
import DateSelectionStep from './steps/DateSelectionStep';
import ClientInfoStep from './steps/ClientInfoStep';
import ConfirmationStep from './steps/ConfirmationStep';

// --- Styled Components ---
const BookingContainer = styled(Box)`
  max-width: ${props => props.maxWidth || '800px'};
  margin: 0 auto;
  padding: 0 ${SACRED_SPACING.md}px;
  position: relative;
  
  @media (max-width: 600px) {
    padding: 0 ${SACRED_SPACING.sm}px;
  }
`;

// --- Styled Components ---
const BookingCard = styled(Box)`
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  margin-top: ${SACRED_SPACING.lg}px;
  margin-bottom: ${SACRED_SPACING.xl}px;
`;

/**
 * Main booking interface component
 * Handles the complete booking flow, state, and layout
 */
const BookingInterface: React.FC = () => {
  // Get booking context and state
  const {
    state,
    goToStep,
    fetchAvailableServices,
    submitBooking,
    isResourceLoading,
    hasApiError,
    getApiErrorForResource
  } = useBooking();
  
  // Local component state
  const [bookingComplete, setBookingComplete] = useState(false);
  const [stepChangeAnnouncement, setStepChangeAnnouncement] = useState('');
  const [containerMaxWidth, setContainerMaxWidth] = useState('800px');
  
  const { currentStep, selectedService, selectedDate, selectedTimeSlot, clientInfo } = state;
  
  // Load services on component mount
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        await fetchAvailableServices();
      } catch (error) {
        console.error('Failed to load initial services data:', error);
      }
    };
    
    loadInitialData();
    
    // Adjust container width based on step
    if (currentStep === BookingStepId.CLIENT_INFORMATION || currentStep === BookingStepId.CONFIRMATION) {
      setContainerMaxWidth('700px');
    } else {
      setContainerMaxWidth('800px');
    }
  }, [fetchAvailableServices, currentStep]);
  
  // Set up step announcements for screen readers
  useEffect(() => {
    const stepNames: Record<number, string> = {
      [BookingStepId.SERVICE_SELECTION]: 'Service Selection',
      [BookingStepId.DATE_SELECTION]: 'Date Selection',
      [BookingStepId.CLIENT_INFORMATION]: 'Your Information',
      [BookingStepId.CONFIRMATION]: 'Booking Confirmation'
    };
    
    setStepChangeAnnouncement(`Step ${currentStep + 1} of 4: ${stepNames[currentStep] || ''}`);
  }, [currentStep]);
  
  // Handle retry after error
  const handleRetryAfterError = () => {
    // Implement retry logic
    const loadData = async () => {
      try {
        await fetchAvailableServices();
      } catch (err) {
        console.error('Retry failed:', err);
      }
    };
    loadData();
  };
  
  // Handle step completion
  const handleNext = (data: unknown): void => {
    const typedData = data as Record<string, unknown>;
    
    switch (currentStep) {
      case BookingStepId.SERVICE_SELECTION:
        // Save service and proceed to date selection
        if ('selectedService' in typedData && typedData.selectedService) {
          goToStep(BookingStepId.DATE_SELECTION);
        }
        break;
        
      case BookingStepId.DATE_SELECTION:
        // Save date/time and proceed to client info
        if ('selectedDate' in typedData && 'selectedTimeSlot' in typedData && typedData.selectedDate && typedData.selectedTimeSlot) {
          goToStep(BookingStepId.CLIENT_INFORMATION);
        }
        break;
        
      case BookingStepId.CLIENT_INFORMATION:
        // Save client info and proceed to confirmation
        if ('clientInfo' in typedData && typedData.clientInfo) {
          goToStep(BookingStepId.CONFIRMATION);
        }
        break;
        
      case BookingStepId.CONFIRMATION:
        // Submit booking
        handleSubmitBooking();
        break;
    }
  };
  
  // Handle going back to previous step
  const handleBack = () => {
    const prevStep = currentStep - 1;
    if (prevStep >= 0) {
      goToStep(prevStep as BookingStepId);
    }
  };

  // Handle service selection
  const handleServiceSelect = (service: ServiceOption) => {
    console.log('[BookingInterface] Service selected:', service.name);
    // The service selection is handled by the context automatically
    // This is just for logging and any additional processing if needed
  };
  
  // Handle booking submission
  const handleSubmitBooking = async () => {
    try {
      if (!selectedService || !selectedDate || !selectedTimeSlot || !clientInfo) {
        console.error('Missing required booking data');
        return;
      }
      
      // Create service data
      const serviceData = {
        serviceId: selectedService.id,
        isRecurring: false
      };
      
      // Create client data with required fields
      const clientData = {
        email: clientInfo.email,
        firstName: clientInfo.firstName,
        lastName: clientInfo.lastName,
        phone: clientInfo.phone,
        preferredContactMethod: clientInfo.preferredContactMethod,
        isReturningClient: !clientInfo.isNewClient,
        fraudType: clientInfo.fraudType || 'investment_fraud',
        hasReportedToAuthorities: clientInfo.hasReportedToAuthorities || false,
        // Add required fields with default values
        caseDescription: clientInfo.caseDescription || '',
        approximateLossAmount: clientInfo.approximateLossAmount || '',
        privacyPolicyAccepted: true as const,
        // Add additional fields that might be required
        additionalNotes: clientInfo.additionalNotes || ''
      };
      
      // Create confirmation data with required fields
      const confirmationData = {
        detailsConfirmed: true as const,
        paymentMethod: 'credit_card' as const,
        cancellationPolicyAgreed: true as const,
        receiveReminders: true,
        reminderMethod: 'email' as const
      };
      
      // Call the submitBooking with the correct parameter format
      await submitBooking(serviceData, clientData, confirmationData);
      
      setBookingComplete(true);
    } catch (error) {
      console.error('Error submitting booking:', error instanceof Error ? error.message : String(error));
    }
  };
  
  // Render success message after booking is complete
  const renderSuccessMessage = () => {
    return (
      <Box padding={SACRED_SPACING.lg} textAlign="center">
        <ErrorDisplay 
          title="Booking Successful!" 
          message="Thank you for booking a consultation. We will be in touch soon to confirm your appointment."
          showRetry={false}
          showIcon={false}
          className="success-message"
        />
      </Box>
    );
  };
  
  // Render current step content
  const renderStepContent = () => {
    if (bookingComplete) {
      return renderSuccessMessage();
    }
    
    try {
      switch (currentStep) {
        case BookingStepId.SERVICE_SELECTION:
          return (
            <ServiceSelectionStep
              onServiceSelect={handleServiceSelect}
              onNext={() => handleNext({})}
              onBack={handleBack}
            />
          );
        
        case BookingStepId.DATE_SELECTION:
          // Make sure we have a selected service before proceeding
          if (!selectedService) {
            return (
              <ErrorDisplay
                title="Service Selection Required"
                message="Please select a service first."
                showRetry={true}
                retryText="Go Back to Service Selection"
                onRetry={() => goToStep(BookingStepId.SERVICE_SELECTION)}
              />
            );
          }
          
          return (
            <DateSelectionStep
              onComplete={handleNext}
              onBack={handleBack}
              isLoading={isResourceLoading('dates') || isResourceLoading('timeSlots')}
              initialData={{
                selectedDate,
                selectedTimeSlot
              }}
              selectedService={selectedService}
            />
          );
          
        case BookingStepId.CLIENT_INFORMATION:
          // Make sure we have date/time selected
          if (!selectedTimeSlot || !selectedDate) {
            return (
              <ErrorDisplay
                title="Date & Time Required"
                message="Please select a date and time first."
                showRetry={true}
                retryText="Go Back to Date Selection"
                onRetry={() => goToStep(BookingStepId.DATE_SELECTION)}
              />
            );
          }
          
          return (
            <ClientInfoStep
              onComplete={handleNext}
              onBack={handleBack}
              isLoading={false}
              initialData={{ clientInfo: clientInfo }}
            />
          );
          
        case BookingStepId.CONFIRMATION:
          // Make sure we have client info
          if (!clientInfo) {
            return (
              <ErrorDisplay
                title="Client Information Required"
                message="Please provide your contact information first."
                showRetry={true}
                retryText="Go Back to Contact Information"
                onRetry={() => goToStep(BookingStepId.CLIENT_INFORMATION)}
              />
            );
          }
          
          // Ensure all required data is available and use type assertions where necessary
          if (selectedService && selectedDate && selectedTimeSlot) {
            return (
              <ConfirmationStep
                onComplete={handleNext}
                onBack={handleBack}
                isLoading={isResourceLoading('booking')}
                bookingData={{
                  service: selectedService,
                  date: selectedDate,
                  timeSlot: selectedTimeSlot,
                  clientInfo: clientInfo
                }}
              />
            );
          }
          
          // Fallback for missing data
          return (
            <ErrorDisplay
              title="Missing Information"
              message="We're missing some required booking information. Please try again."
              showRetry={true}
              retryText="Start Over"
              onRetry={() => goToStep(BookingStepId.SERVICE_SELECTION)}
            />
          );
          
        default:
          return (
            <ErrorDisplay
              title="Unknown Step"
              message={`We encountered an error with the booking process. Unknown step: ${currentStep}`}
              showRetry={true}
              retryText="Start Over"
              onRetry={() => goToStep(BookingStepId.SERVICE_SELECTION)}
            />
          );
      }
    } catch (error) {
      console.error('Error rendering step content:', error instanceof Error ? error.message : String(error));
      return (
        <ErrorDisplay
          title="Error Loading Content"
          message="We encountered an error loading this step. Please try again."
          showRetry={true}
          retryText="Try Again"
          onRetry={handleRetryAfterError}
        />
      );
    }
  };
  
  // Determine if we have any API errors
  const hasAnyApiError = hasApiError();
  const serviceError = getApiErrorForResource('services');
  const isLoadingServices = isResourceLoading('services');
  
  return (
    <>
      <GlobalStyles styles={`
        body {
          overflow-x: hidden;
        }
      `} />
      <BookingContainer maxWidth={containerMaxWidth}>
        {/* Screen reader announcements */}
        <VisuallyHidden aria-live="polite" aria-atomic={true}>
          {stepChangeAnnouncement}
        </VisuallyHidden>
        
        {/* Main booking card */}
        <BookingCard>
          {/* Error display if API errors occur */}
          {hasAnyApiError && !isLoadingServices && (
            <Box padding={SACRED_SPACING.md}>
              <ErrorDisplay
                title="Service Unavailable"
                message={typeof serviceError === 'object' && serviceError !== null ? (serviceError as Error).message || String(serviceError) : "We're having trouble connecting to our booking service. Please try again later."}
                showRetry={true}
                retryText="Try Again"
                onRetry={handleRetryAfterError}
              />
            </Box>
          )}
          
          {/* Loading overlay */}
          {(isLoadingServices && currentStep === BookingStepId.SERVICE_SELECTION) && (
            <Portal>
              <LoadingOverlay 
                message="Loading available services..."
              />
            </Portal>
          )}
          
          {/* Current step content */}
          {renderStepContent()}
        </BookingCard>
      </BookingContainer>
    </>
  );
};

export default BookingInterface; 
















