/**
 * BookingWizard Component
 * 
 * Multi-step booking wizard that guides users through the consultation booking process.
 * Integrates with the BookingContext for state management.
 */

import React, { useState } from 'react';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { useBooking } from '../../context/BookingContext';
import { BookingStepId } from '../../types/booking.types';
import { ServiceOption } from '../../types/booking.types';
import ServiceSelectionStep from './steps/ServiceSelectionStep';
import DateSelectionStep from './steps/DateSelectionStep';
import ClientInfoStep from './steps/ClientInfoStep';
import ConfirmationStep from './steps/ConfirmationStep';
import PremiumButton from '../../design-system/components/button/PremiumButton';
import { ProgressIndicator } from '../../design-system/components/feedback/ProgressIndicator';
import { LoadingOverlay } from '../../design-system/components/feedback/LoadingOverlay';
import { ErrorDisplay } from '../../design-system/components/feedback/ErrorDisplay';
import { PREMIUM_COLORS } from '../../design-system/tokens/colors.premium';

// Styled components
const WizardContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  overflow: hidden;
`;

const WizardHeader = styled.div`
  background: linear-gradient(135deg, 
    ${PREMIUM_COLORS.BASE_COLORS.forest[500]} 0%, 
    ${PREMIUM_COLORS.BASE_COLORS.forest[600]} 100%
  );
  padding: 24px 32px;
  color: white;
`;

const WizardTitle = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: 28px;
  font-weight: 700;
  margin: 0 0 8px 0;
`;

const WizardSubtitle = styled.p`
  font-size: 16px;
  margin: 0;
  opacity: 0.9;
`;

const WizardBody = styled.div`
  padding: 32px;
  min-height: 400px;
  position: relative;
`;

const StepContainer = styled(motion.div)`
  width: 100%;
`;

const NavigationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid ${PREMIUM_COLORS.BASE_COLORS.ivory[300]};
`;

const StepInfo = styled.div`
  font-size: 14px;
  color: ${PREMIUM_COLORS.BASE_COLORS.gray[600]};
`;

// Animation variants
const stepVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0
  }),
  center: {
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 1000 : -1000,
    opacity: 0
  })
};

const stepTransition = {
  x: { type: "spring", stiffness: 300, damping: 30 },
  opacity: { duration: 0.2 }
};

interface BookingWizardProps {
  onComplete?: () => void;
  onCancel?: () => void;
}

export const BookingWizard: React.FC<BookingWizardProps> = ({
  onComplete,
  onCancel
}) => {
  const {
    state,
    goToNextStep,
    goToPreviousStep,
    goToStep,
    canProceedToStep,
    isResourceLoading,
    hasApiError,
    submitBooking,
    selectService
  } = useBooking();

  const [direction, setDirection] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentStep = state.currentStep || BookingStepId.SERVICE_SELECTION;

  // Handle service selection
  const handleServiceSelect = (service: ServiceOption) => {
    console.log('[BookingWizard] Service selected:', service.name);
    selectService(service);
  };

  // Step titles mapping
  const stepTitles: Record<BookingStepId, { title: string; subtitle: string }> = {
    [BookingStepId.SERVICE_SELECTION]: {
      title: "Select Your Recovery Service",
      subtitle: "Choose the financial asset recovery service that best suits your case"
    },
    [BookingStepId.DATE_SELECTION]: {
      title: "Choose Consultation Date & Time",
      subtitle: "Select your preferred consultation appointment slot"
    },
    [BookingStepId.CLIENT_INFORMATION]: {
      title: "Your Information",
      subtitle: "Please provide your contact details for our confidential consultation"
    },
    [BookingStepId.CONFIRMATION]: {
      title: "Review & Confirm",
      subtitle: "Review your consultation details before confirmation"
    },
    [BookingStepId.SUCCESS]: {
      title: "Consultation Confirmed",
      subtitle: "Your financial recovery consultation has been successfully scheduled"
    }
  };

  const handleNext = () => {
    if (canProceedToStep(currentStep + 1)) {
      setDirection(1);
      goToNextStep();
    }
  };

  const handlePrevious = () => {
    setDirection(-1);
    goToPreviousStep();
  };

  const handleSubmit = async () => {
    if (!state.selectedService || !state.selectedDate || !state.selectedTimeSlot || !state.clientInfo) {
      return;
    }

    setIsSubmitting(true);
    try {
      // Ensure client info has all required properties for the submitBooking interface
      const enhancedClientInfo = {
        ...state.clientInfo,
        isReturningClient: state.clientInfo.isNewClient ? false : true,
        privacyPolicyAccepted: true as const, // Explicitly type as literal true
        fraudType: state.clientInfo.fraudType || 'other', // Provide default value if undefined
        caseDescription: state.clientInfo.caseDescription || 'Financial recovery consultation',
        approximateLossAmount: state.clientInfo.approximateLossAmount || '0'
      };

      // Create service data
      const serviceData = {
        serviceId: state.selectedService.id,
        isRecurring: false
      };

      // Create confirmation data with required fields
      const confirmationData = {
        detailsConfirmed: true as const,
        paymentMethod: 'credit_card' as const,
        cancellationPolicyAgreed: true as const,
        receiveReminders: true,
        reminderMethod: 'email' as const
      };

      await submitBooking(
        serviceData,
        enhancedClientInfo,
        confirmationData
      );

      goToStep(BookingStepId.SUCCESS);
      
      if (onComplete) {
        onComplete();
      }
    } catch (error) {
      console.error('Consultation booking failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case BookingStepId.SERVICE_SELECTION:
        return (
          <ServiceSelectionStep
            onServiceSelect={handleServiceSelect}
            onNext={() => {
              setDirection(1);
              goToNextStep();
            }}
          />
        );
      case BookingStepId.DATE_SELECTION:
        if (!state.selectedService) {
          return <div>Please select a service first.</div>;
        }
        return <DateSelectionStep selectedService={state.selectedService} />;
      case BookingStepId.CLIENT_INFORMATION:
        return <ClientInfoStep onComplete={(data) => {
          // Handle completion - update wizard state
          console.log('[BookingWizard] Client info completed:', data);
          // Add logic to move to next step
        }} />;
      case BookingStepId.CONFIRMATION:
        if (!state.selectedService || !state.selectedDate || !state.selectedTimeSlot || !state.clientInfo) {
          return <div>Missing required booking information.</div>;
        }
        return (
          <ConfirmationStep 
            bookingData={{
              service: state.selectedService,
              date: state.selectedDate,
              timeSlot: state.selectedTimeSlot,
              clientInfo: state.clientInfo
            }}
          />
        );
      case BookingStepId.SUCCESS:
        return (
          <div style={{ textAlign: 'center', padding: '48px 0' }}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.5 }}
            >
              <div style={{
                width: 80,
                height: 80,
                margin: '0 auto 24px',
                background: PREMIUM_COLORS.BASE_COLORS.forest[500],
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                  <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" fill="white" />
                </svg>
              </div>
            </motion.div>
            <h3 style={{ marginBottom: 16 }}>Consultation Confirmed!</h3>
            <p style={{ color: PREMIUM_COLORS.BASE_COLORS.gray[600], marginBottom: 8 }}>
              Your consultation reference is:
            </p>
            <p style={{ 
              fontSize: 24, 
              fontWeight: 600, 
              color: PREMIUM_COLORS.BASE_COLORS.navy[500],
              marginBottom: 24
            }}>
              {state.bookingReference || 'REF-123456'}
            </p>
            <p style={{ color: PREMIUM_COLORS.BASE_COLORS.gray[600] }}>
              A confirmation email has been sent to your registered email address with all consultation details.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  const isFirstStep = currentStep === BookingStepId.SERVICE_SELECTION;
  const isLastStep = currentStep === BookingStepId.CONFIRMATION;
  const isSuccessStep = currentStep === BookingStepId.SUCCESS;

  // Show loading overlay for any resource loading
  const isLoading = isResourceLoading('services') || 
                    isResourceLoading('dates') || 
                    isResourceLoading('timeSlots') || 
                    isSubmitting;

  return (
    <WizardContainer>
      <WizardHeader>
        <WizardTitle>{stepTitles[currentStep].title}</WizardTitle>
        <WizardSubtitle>{stepTitles[currentStep].subtitle}</WizardSubtitle>
      </WizardHeader>

      {!isSuccessStep && (
        <ProgressIndicator
          steps={4}
          currentStep={currentStep}
          style={{ padding: '24px 32px', borderBottom: `1px solid ${PREMIUM_COLORS.BASE_COLORS.ivory[300]}` }}
        />
      )}

      <WizardBody>
        {hasApiError() && (
          <div style={{ marginBottom: '24px' }}>
            <ErrorDisplay
              message="An error occurred. Please try again."
              onRetry={() => {}}
            />
          </div>
        )}

        <AnimatePresence mode="wait" custom={direction}>
          <StepContainer
            key={currentStep}
            custom={direction}
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={stepTransition}
          >
            {renderStep()}
          </StepContainer>
        </AnimatePresence>

        {!isSuccessStep && (
          <NavigationContainer>
            <PremiumButton
              variant="outline"
              onClick={isFirstStep ? onCancel : handlePrevious}
              disabled={isLoading}
            >
              {isFirstStep ? 'Cancel' : 'Previous'}
            </PremiumButton>

            <StepInfo>
              Step {currentStep + 1} of 4
            </StepInfo>

            <PremiumButton
              variant="primary"
              onClick={isLastStep ? handleSubmit : handleNext}
              disabled={!canProceedToStep(currentStep + 1) || isLoading}
              isLoading={isSubmitting}
            >
              {isLastStep ? 'Confirm Consultation' : 'Next'}
            </PremiumButton>
          </NavigationContainer>
        )}

        {isSuccessStep && (
          <NavigationContainer style={{ justifyContent: 'center' }}>
            <PremiumButton
              variant="primary"
              onClick={() => window.location.href = '/'}
            >
              Return to Home
            </PremiumButton>
          </NavigationContainer>
        )}
      </WizardBody>

      {isLoading && <LoadingOverlay />}
    </WizardContainer>
  );
};

export default BookingWizard; 