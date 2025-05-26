import * as React from 'react';
import styled from 'styled-components';
import Flex from '../../design-system/components/layout/Flex';
import { Box } from '../../design-system/components/layout/Box';
import { Button } from '../../design-system/components/button/Button';
import { useBooking } from '../../context/BookingContext';
import { BookingStepId } from '../../types/booking.types';
import { useBookingStepValidation } from '../../hooks/useBookingStepValidation';

interface BookingNavigationProps {
  currentStepId: BookingStepId;
}

// Premium styled components for navigation
const NavigationContainer = styled(Flex)`
  width: 100%;
  justify-content: space-between;
  padding: 24px 40px;
  border-top: 1px solid rgba(10, 64, 33, 0.1);
  background-color: #fff;
  
  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const BackButton = styled(Button)`
  background-color: transparent;
  color: #0A4021;
  border: 1px solid rgba(10, 64, 33, 0.2);
  padding: 12px 24px;
  font-weight: 500;
  border-radius: 8px;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: rgba(10, 64, 33, 0.05);
    border-color: rgba(10, 64, 33, 0.3);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const NextButton = styled(Button)`
  background: linear-gradient(to right, #D4AF37, #E5C158);
  color: white;
  padding: 12px 32px;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(212, 175, 55, 0.2);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(212, 175, 55, 0.3);
  }
  
  &:active {
    transform: translateY(1px);
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

// Arrow icons
const ArrowLeftIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '8px' }}>
    <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: '8px' }}>
    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/**
 * BookingNavigation component
 * Premium navigation controls for the booking process
 */
export const BookingNavigation: React.FC<BookingNavigationProps> = ({ currentStepId }) => {
  const bookingContext = useBooking();
  const { goToNextStep, goToPreviousStep } = bookingContext;
  const { isCurrentStepValid, validateCurrentStep } = useBookingStepValidation();
  
  // Use loadingState from the context
  const isLoading = (resource: 'services' | 'dates' | 'timeSlots' | 'booking' | 'cancellation' | 'rescheduling' | 'paymentIntent'): boolean => 
    bookingContext.isResourceLoading(resource);
  
  // Determine if we can go to next step
  const canGoToNextStep = isCurrentStepValid();
  
  // Determine if next button should be disabled
  const isNextButtonDisabled = !canGoToNextStep;
  
  // Determine if next button should show loading state
  const isNextButtonLoading = 
    (currentStepId === BookingStepId.SERVICE_SELECTION && isLoading('dates')) ||
    (currentStepId === BookingStepId.DATE_SELECTION && isLoading('timeSlots')) ||
    (currentStepId === BookingStepId.CONFIRMATION && (isLoading('paymentIntent') || isLoading('booking')));
  
  // Get next button text based on current step
  const getNextButtonText = () => {
    switch (currentStepId) {
      case BookingStepId.SERVICE_SELECTION:
        return 'Select Date & Time';
      case BookingStepId.DATE_SELECTION:
        return 'Continue to Your Details';
      case BookingStepId.CLIENT_INFORMATION:
        return 'Review & Confirm';
      case BookingStepId.CONFIRMATION:
        return 'Complete Booking';
      default:
        return 'Continue';
    }
  };
  
  // Handle next button click
  const handleNextClick = async () => {
    const isValid = await validateCurrentStep();
    if (isValid) {
      goToNextStep();
    }
  };
  
  // Handle back button click
  const handleBackClick = () => {
    goToPreviousStep();
  };
  
  // Determine if we should show the back button
  const showBackButton = currentStepId !== BookingStepId.SERVICE_SELECTION;
  
  return (
    <NavigationContainer>
      <Box>
        {showBackButton && (
          <BackButton
            onClick={handleBackClick}
            disabled={isNextButtonLoading}
          >
            <ArrowLeftIcon />
            Back
          </BackButton>
        )}
      </Box>
      
      <NextButton
        onClick={handleNextClick}
        disabled={isNextButtonDisabled || isNextButtonLoading}
      >
        {isNextButtonLoading ? 'Processing...' : getNextButtonText()}
        {!isNextButtonLoading && <ArrowRightIcon />}
      </NextButton>
    </NavigationContainer>
  );
}; 













