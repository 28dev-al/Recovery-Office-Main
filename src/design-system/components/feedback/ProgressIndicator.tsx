/**
 * ProgressIndicator Component
 * 
 * Shows progress through a multi-step process with visual indicators
 */

import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { PREMIUM_COLORS } from '../../tokens/colors.premium';

interface ProgressIndicatorProps {
  /** Total number of steps */
  steps: number;
  /** Current step (0-indexed) */
  currentStep: number;
  /** Whether to show step labels */
  showLabels?: boolean;
  /** Step labels (optional) */
  labels?: string[];
  /** Additional CSS styles */
  style?: React.CSSProperties;
  /** Additional CSS class */
  className?: string;
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  position: relative;
`;

const StepContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 1;
`;

const Step = styled.div<{ $active: boolean; $completed: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 16px;
  transition: all 0.3s ease;
  background-color: ${props => 
    props.$completed ? PREMIUM_COLORS.BASE_COLORS.forest[500] : 
    props.$active ? PREMIUM_COLORS.BASE_COLORS.gold[500] : 
    PREMIUM_COLORS.BASE_COLORS.ivory[300]};
  color: ${props => 
    props.$completed || props.$active ? 'white' : 
    PREMIUM_COLORS.BASE_COLORS.gray[600]};
  border: 2px solid ${props =>
    props.$completed ? PREMIUM_COLORS.BASE_COLORS.forest[500] :
    props.$active ? PREMIUM_COLORS.BASE_COLORS.gold[500] :
    PREMIUM_COLORS.BASE_COLORS.ivory[400]};
`;

const StepLabel = styled.div<{ $active: boolean }>`
  margin-top: 8px;
  font-size: 12px;
  font-weight: ${props => props.$active ? 600 : 400};
  color: ${props => props.$active ? 
    PREMIUM_COLORS.BASE_COLORS.gray[800] : 
    PREMIUM_COLORS.BASE_COLORS.gray[600]};
  white-space: nowrap;
`;

const ProgressLine = styled.div`
  position: absolute;
  top: 20px;
  left: 0;
  right: 0;
  height: 2px;
  background-color: ${PREMIUM_COLORS.BASE_COLORS.ivory[300]};
  z-index: 0;
`;

const ProgressFill = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background-color: ${PREMIUM_COLORS.BASE_COLORS.forest[500]};
  transform-origin: left;
`;

const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" fill="currentColor" />
  </svg>
);

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  steps,
  currentStep,
  showLabels = false,
  labels = [],
  style,
  className
}) => {
  const progress = (currentStep / (steps - 1)) * 100;

  return (
    <Container style={style} className={className}>
      <ProgressLine>
        <ProgressFill
          initial={{ scaleX: 0 }}
          animate={{ scaleX: progress / 100 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </ProgressLine>
      
      {Array.from({ length: steps }, (_, index) => {
        const isActive = index === currentStep;
        const isCompleted = index < currentStep;
        
        return (
          <StepContainer key={index}>
            <Step $active={isActive} $completed={isCompleted}>
              {isCompleted ? <CheckIcon /> : index + 1}
            </Step>
            {showLabels && labels[index] && (
              <StepLabel $active={isActive}>
                {labels[index]}
              </StepLabel>
            )}
          </StepContainer>
        );
      })}
    </Container>
  );
};

export default ProgressIndicator; 