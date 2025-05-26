/**
 * BookingNavControls Component
 * 
 * Navigation controls for the booking flow that adapt to each step of the process.
 * 
 * Features:
 * - Context-aware button labels based on current step
 * - Responsive layout that works on mobile and desktop
 * - Accessibility support with ARIA labels
 * - Visual alignment with sacred geometry principles
 * 
 * @example
 * ```tsx
 * <BookingNavControls
 *   currentStep={BookingStepId.DATE_SELECTION}
 *   canGoBack={true}
 *   canGoNext={!!selectedDate}
 *   onPrevious={handlePrevious}
 *   onNext={handleNext}
 *   onSubmit={handleSubmit}
 *   isSubmitting={false}
 * />
 * ```
 */

import * as React from 'react';
import { Box } from '../../design-system/components/layout/Box';
import { Flex } from '../../design-system/components/layout/Flex';
import { Button } from '../../design-system/components/button/Button';
import { BookingStepId } from '../../types/booking.types';
import { SACRED_SPACING } from '../../constants/sacred-geometry';
import { useBreakpointValue } from '../../hooks/useBreakpointValue';
import styled from 'styled-components';

// Create a styled navigation container
const NavigationContainer = styled.nav`
  padding-top: ${SACRED_SPACING.lg}px;
  border-top: 1px solid ${props => props.theme.colors.border.light};
`;

// Create a styled container for the button that will be first on mobile
const MobileFirstButton = styled.div<{ isMobile: boolean }>`
  ${props => props.isMobile && `
    width: 100%;
    order: 1;
  `}
`;

// Create a styled container for the button that will be second on mobile
const MobileSecondButton = styled.div<{ isMobile: boolean }>`
  ${props => props.isMobile && `
    width: 100%;
    order: 2;
  `}
`;

interface BookingNavControlsProps {
  /**
   * Current step in the booking process 
   */
  currentStep: BookingStepId;
  
  /**
   * Whether the back button should be enabled
   */
  canGoBack: boolean;
  
  /**
   * Whether the next button should be enabled
   */
  canGoNext: boolean;
  
  /**
   * Callback when the user goes to the previous step
   */
  onPrevious: () => void;
  
  /**
   * Callback when the user proceeds to the next step
   */
  onNext: () => void;
  
  /**
   * Callback when the user completes the booking
   */
  onSubmit: () => void;
  
  /**
   * Whether the form is currently being submitted
   */
  isSubmitting: boolean;
}

export const BookingNavControls: React.FC<BookingNavControlsProps> = ({
  currentStep,
  canGoBack,
  canGoNext,
  onPrevious,
  onNext,
  onSubmit,
  isSubmitting
}) => {
  // Get responsive values based on viewport
  const isMobile = useBreakpointValue({ base: true, md: false });
  const buttonSize = useBreakpointValue<"sm" | "md" | "lg">({ 
    base: "md", 
    md: "lg" 
  }) || "md"; // Provide fallback
  const spacing = useBreakpointValue({ 
    base: SACRED_SPACING.md, 
    md: SACRED_SPACING.lg 
  });
  
  // Determine if this is the final step
  const isFinalStep = currentStep === BookingStepId.CONFIRMATION;
  
  // Get button text based on current step
  const getNextButtonText = () => {
    if (isFinalStep) {
      return 'Confirm Booking';
    }
    
    switch (currentStep) {
      case BookingStepId.SERVICE_SELECTION:
        return 'Select Date & Time';
      case BookingStepId.DATE_SELECTION:
        return 'Enter Your Information';
      case BookingStepId.CLIENT_INFORMATION:
        return 'Review & Pay';
      default:
        return 'Next';
    }
  };
  
  // Get back button text
  const getBackButtonText = () => {
    switch (currentStep) {
      case BookingStepId.DATE_SELECTION:
        return 'Change Service';
      case BookingStepId.CLIENT_INFORMATION:
        return 'Change Date & Time';
      case BookingStepId.CONFIRMATION:
        return 'Edit Information';
      default:
        return 'Back';
    }
  };
  
  // Get ARIA labels for buttons to improve screen reader experience
  const getNextButtonAriaLabel = () => {
    if (isFinalStep) {
      return 'Confirm booking and complete reservation';
    }
    
    switch (currentStep) {
      case BookingStepId.SERVICE_SELECTION:
        return 'Continue to date and time selection';
      case BookingStepId.DATE_SELECTION:
        return 'Continue to enter your personal information';
      case BookingStepId.CLIENT_INFORMATION:
        return 'Continue to review booking and payment';
      default:
        return 'Continue to next step';
    }
  };
  
  const getBackButtonAriaLabel = () => {
    switch (currentStep) {
      case BookingStepId.DATE_SELECTION:
        return 'Go back to service selection';
      case BookingStepId.CLIENT_INFORMATION:
        return 'Go back to date and time selection';
      case BookingStepId.CONFIRMATION:
        return 'Go back to edit your information';
      default:
        return 'Go back to previous step';
    }
  };
  
  // Handle next button click
  const handleNextClick = () => {
    if (isFinalStep) {
      onSubmit();
    } else {
      onNext();
    }
  };
  
  return (
    <NavigationContainer aria-label="Booking navigation controls">
      <Flex 
        justifyContent="space-between" 
        alignItems="center"
        flexDirection={isMobile ? 'column' : 'row'}
        gap={spacing}
      >
        {/* Back button */}
        {canGoBack ? (
          <MobileSecondButton isMobile={!!isMobile}>
            <Button
              variant="outline"
              size={buttonSize}
              onClick={onPrevious}
              width={isMobile ? '100%' : 'auto'}
              aria-label={getBackButtonAriaLabel()}
            >
              {getBackButtonText()}
            </Button>
          </MobileSecondButton>
        ) : (
          <Box aria-hidden="true" /> // Empty spacer for layout when back button is hidden
        )}
        
        {/* Next/Submit button */}
        <MobileFirstButton isMobile={!!isMobile}>
          <Button
            variant="primary"
            size={buttonSize}
            onClick={handleNextClick}
            isDisabled={!canGoNext}
            isLoading={isFinalStep && isSubmitting}
            width={isMobile ? '100%' : 'auto'}
            aria-label={getNextButtonAriaLabel()}
          >
            {getNextButtonText()}
          </Button>
        </MobileFirstButton>
      </Flex>
    </NavigationContainer>
  );
}; 













