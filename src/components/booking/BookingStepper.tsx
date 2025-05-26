import * as React from 'react';
import styled from 'styled-components';
import { BookingStepId } from '../../types/booking.types';
import { useBooking } from '../../context/BookingContext';
import { motion } from 'framer-motion';
import Flex from '../../design-system/components/layout/Flex';
import Box from '../../design-system/components/layout/Box';
import { Text } from '../../design-system/components/typography/Text';

/**
 * Interface for a booking step item
 */
interface BookingStep {
  id: BookingStepId;
  title: string;
  label: string;
  description?: string;
}

/**
 * Props for the BookingStepper component
 */
interface BookingStepperProps {
  steps: BookingStep[];
  currentStepId: BookingStepId;
  onStepClick?: (stepId: BookingStepId) => void;
}

// Premium styled components for the stepper

/**
 * Container for the stepper component
 */
const StepperContainer = styled(Box)`
  width: 100%;
  margin: 0;
`;

/**
 * Line showing progress track
 */
const ProgressLine = styled(Box)`
  position: relative;
  height: 3px;
  background-color: rgba(10, 64, 33, 0.1);
  border-radius: 2px;
  margin-bottom: 32px;
  margin-left: 16px;
  margin-right: 16px;
`;

/**
 * Animated progress bar
 */
const ProgressBar = styled(motion.div)`
  height: 100%;
  border-radius: 2px;
  background: linear-gradient(to right, #D4AF37, #E5C158);
  position: absolute;
  left: 0;
  top: 0;
`;

/**
 * Container for step indicator dots
 */
const StepIndicators = styled(Flex)`
  position: absolute; 
  width: 100%; 
  justify-content: space-between; 
  top: 50%; 
  transform: translateY(-50%);
`;

/**
 * Individual step dot component
 */
const StepDot = styled.button<{ $status: 'completed' | 'active' | 'upcoming' }>`
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease-in-out;
  z-index: 2;
  display: flex;
  background-color: ${(props) =>
    props.$status === 'completed'
      ? '#D4AF37'
      : props.$status === 'active'
      ? 'white'
      : 'rgba(10, 64, 33, 0.05)'};
  border: ${(props) => (props.$status === 'active' ? '2px solid' : 'none')};
  border-color: ${(props) => (props.$status === 'active' ? '#D4AF37' : 'transparent')};
  color: ${(props) =>
    props.$status === 'completed'
      ? 'white'
      : props.$status === 'active'
      ? '#0A4021'
      : 'rgba(10, 64, 33, 0.6)'};
  box-shadow: ${(props) =>
    props.$status === 'active'
      ? '0 4px 8px rgba(212, 175, 55, 0.2)'
      : 'none'};
  cursor: pointer;
  outline: none;
  border-width: 2px;
  border-style: solid;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  font-size: 0.8rem;
  font-weight: 600;
  
  &:focus {
    box-shadow: 0 0 0 2px rgba(212, 175, 55, 0.3);
  }
  
  &:hover {
    transform: ${(props) => (props.$status !== 'upcoming' ? 'scale(1.08)' : 'none')};
  }
`;

/**
 * Step label text
 */
const StepLabel = styled(Text)<{ $isActive: boolean }>`
  position: absolute;
  text-align: center;
  font-size: 0.8rem;
  white-space: nowrap;
  top: 28px;
  left: 50%;
  transform: translateX(-50%);
  font-weight: ${(props) => props.$isActive ? '600' : '400'};
  color: ${(props) => props.$isActive ? '#0A4021' : 'rgba(10, 64, 33, 0.6)'};
  
  @media (max-width: 768px) {
    display: none;
  }
`;

/**
 * Check mark for completed steps
 */
const CheckMark = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 12L10 17L19 8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/**
 * Mobile-only step text
 */
const MobileStepText = styled(Text)`
  text-align: center;
  font-weight: 600;
  font-size: 1rem;
  color: #0A4021;
  margin-bottom: 16px;
  
  @media (min-width: 769px) {
    display: none;
  }
`;

/**
 * BookingStepper component
 * Displays a premium visual representation of the booking process steps
 */
export const BookingStepper: React.FC<BookingStepperProps> = ({
  steps,
  currentStepId,
  onStepClick
}) => {
  const { state } = useBooking();
  const { completedSteps } = state;
  
  // Calculate progress percentage based on current step
  const progressPercentage = React.useMemo(() => {
    const currentStepIndex = steps.findIndex(step => step.id === currentStepId);
    // Move the progress bar to the middle of the current step 
    // to give a more accurate visual representation
    const stepsTotal = steps.length - 1;
    if (currentStepIndex === 0) return 0;
    return ((currentStepIndex) / stepsTotal) * 100;
  }, [currentStepId, steps]);
  
  // Check if a step is clickable (can only go to previous steps or current step)
  const isStepClickable = (stepId: BookingStepId) => {
    return stepId <= currentStepId && typeof onStepClick === 'function';
  };
  
  // Handle step click
  const handleStepClick = (stepId: BookingStepId) => {
    if (isStepClickable(stepId) && onStepClick) {
      onStepClick(stepId);
    }
  };
  
  // Get step status (completed, active, upcoming)
  const getStepStatus = (stepId: BookingStepId): 'completed' | 'active' | 'upcoming' => {
    if (completedSteps.has(stepId) || stepId < currentStepId) return 'completed';
    if (stepId === currentStepId) return 'active';
    return 'upcoming';
  };
  
  return (
    <StepperContainer>
      {/* Mobile view: current step name */}
      <MobileStepText>
        {steps.find(step => step.id === currentStepId)?.title || 'Next Step'}
      </MobileStepText>
      
      {/* Step progress line */}
      <ProgressLine>
        <ProgressBar
          initial={{ width: 0 }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ 
            duration: 0.4, 
            ease: [0.4, 0, 0.2, 1]
          }}
        />
        
        {/* Step indicators */}
        <StepIndicators>
          {steps.map((step, index) => {
            const status = getStepStatus(step.id);
            const isActive = status === 'active';
            const isClickable = isStepClickable(step.id);
            
            // For active step, make indicator larger
            const size = isActive ? 32 : 24;
            
            return (
              <StepDot
                key={step.id}
                $status={status}
                onClick={isClickable ? () => handleStepClick(step.id) : undefined}
                aria-current={isActive ? 'step' : undefined}
                aria-label={`${step.label} ${status === 'completed' ? '(completed)' : status === 'active' ? '(current)' : '(upcoming)'}`}
                tabIndex={isClickable ? 0 : -1}
                disabled={!isClickable}
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  transform: `translateX(-${size / 2}px)`
                }}
              >
                {status === 'completed' ? (
                  <CheckMark />
                ) : (
                  <span>{index + 1}</span>
                )}
                <StepLabel
                  $isActive={isActive}
                >
                  {step.title || step.label}
                </StepLabel>
              </StepDot>
            );
          })}
        </StepIndicators>
      </ProgressLine>
    </StepperContainer>
  );
}; 














