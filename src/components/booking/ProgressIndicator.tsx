/**
 * ProgressIndicator Component
 * 
 * A visual indicator that shows the user's progress through the booking steps,
 * implementing sacred geometry principles for natural visual progression.
 * 
 * Design Features:
 * - Golden ratio (PHI) used for sizing and scaling of active elements
 * - Fibonacci sequence for spacing and dimensions
 * - Responsive markers with completion states
 * - Accessible labeling for each step
 * 
 * @example
 * ```tsx
 * <ProgressIndicator
 *   steps={BOOKING_STEPS}
 *   currentStep={BookingStepId.DATE_SELECTION}
 *   completedSteps={new Set([BookingStepId.SERVICE_SELECTION])}
 * />
 * ```
 */

import * as React from 'react';
import styled from 'styled-components';
import { PHI, PHI_INVERSE, SACRED_SPACING, FIBONACCI } from '../../constants/sacred-geometry';
import { getFibonacciByIndex } from '../../utils/getFibonacciByIndex';
import { ProgressIndicatorProps, BookingStepId, BookingStepMeta } from '../../types/booking.types';

/**
 * Container for the progress indicator that spans the full width
 */
const ProgressContainer = styled.div`
  width: 100%;
  margin-bottom: ${SACRED_SPACING.xl}px;
`;

/**
 * Progress track that shows the background line for the progress
 */
const ProgressTrack = styled.div`
  width: 100%;
  height: ${getFibonacciByIndex(4)}px;
  background-color: ${props => props.theme.colors.background.light};
  border-radius: ${getFibonacciByIndex(4)}px;
  margin-bottom: ${SACRED_SPACING.md}px;
  position: relative;
  overflow: hidden;
`;

/**
 * Container for the step markers
 */
const StepMarkersContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

interface StepMarkerProps {
  isFirst?: boolean;
  isLast?: boolean;
}

/**
 * Container for individual step marker and label
 */
const StepMarker = styled.div<StepMarkerProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  
  /* Special alignment for first and last items */
  ${props => props.isFirst && `
    align-items: flex-start;
    text-align: left;
  `}
  
  ${props => props.isLast && `
    align-items: flex-end;
    text-align: right;
  `}
`;

/**
 * ProgressIndicator component
 */
const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  steps,
  currentStep,
  completedSteps,
  className
}) => {
  // Convert steps to array if needed
  const stepsArray: BookingStepMeta[] = Array.isArray(steps) ? steps : Object.values(steps);
  
  // Sort steps by their order property
  const sortedSteps = [...stepsArray].sort((a, b) => a.order - b.order);
  
  // Find the index of the current step in the sorted array
  const currentStepIndex = sortedSteps.findIndex(step => step.id === currentStep);
  
  // Calculate the total number of steps
  const totalSteps = sortedSteps.length;
  
  // Calculate the fill percentage based on the current step
  const fillPercentage = currentStepIndex >= 0 
    ? (currentStepIndex / (totalSteps - 1)) * 100
    : 0;

  return (
    <ProgressContainer className={className}>
      <ProgressTrack>
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: `${fillPercentage}%`,
            backgroundColor: '#9B8579', // accent.main color
            borderRadius: `${getFibonacciByIndex(4)}px`,
            transition: `width ${getFibonacciByIndex(7) * 10}ms ease-in-out`
          }}
        />
      </ProgressTrack>
      
      <StepMarkersContainer>
        {sortedSteps.map((step, index) => {
          const isActive = step.id === currentStep;
          const isCompleted = completedSteps.has(step.id);
          const isFirst = index === 0;
          const isLast = index === totalSteps - 1;
          
          return (
            <StepMarker 
              key={`step-${step.id}`}
              isFirst={isFirst}
              isLast={isLast}
            >
              <div
                style={{
                  width: isActive ? `${getFibonacciByIndex(6)}px` : `${getFibonacciByIndex(5)}px`,
                  height: isActive ? `${getFibonacciByIndex(6)}px` : `${getFibonacciByIndex(5)}px`,
                  borderRadius: '50%',
                  backgroundColor: isCompleted || isActive ? '#9B8579' : '#E2E8F0',
                  marginBottom: `${SACRED_SPACING.xxs}px`,
                  transition: `all ${getFibonacciByIndex(6) * 10}ms ease-in-out`,
                  transform: isActive ? `scale(${PHI_INVERSE + 1})` : 'scale(1)'
                }}
              />
              <span
                style={{
                  fontSize: '0.875rem',
                  fontWeight: (isActive || isCompleted) ? 600 : 400,
                  color: isActive ? '#2D3748' : isCompleted ? '#7D6B5D' : '#718096',
                  transition: `all ${getFibonacciByIndex(6) * 10}ms ease-in-out`,
                  maxWidth: `${SACRED_SPACING.xxl}px`
                }}
              >
                {step.title}
              </span>
            </StepMarker>
          );
        })}
      </StepMarkersContainer>
    </ProgressContainer>
  );
};

export default ProgressIndicator; 













