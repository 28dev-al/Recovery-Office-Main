import * as React from 'react';
import styled from 'styled-components';
import { DefaultTheme } from 'styled-components';
import { PHI_INVERSE, SACRED_SPACING } from '../../constants/sacred-geometry';
import { getFibonacciByIndex } from "../../utils/getFibonacciByIndex";

/**
 * Props for the BookingControls component
 * 
 * @interface BookingControlsProps
 * @property {boolean} canGoBack - Whether the user can navigate to the previous step
 * @property {boolean} canContinue - Whether the user can navigate to the next step
 * @property {boolean} isLastStep - Whether the current step is the last step
 * @property {() => void} onBack - Function to go to the previous step
 * @property {() => void} onContinue - Function to go to the next step
 * @property {() => void} onSubmit - Function to submit the booking form
 */
interface BookingControlsProps {
  canGoBack: boolean;
  canContinue: boolean;
  isLastStep: boolean;
  onBack: () => void;
  onContinue: () => void;
  onSubmit: () => void;
}

/**
 * Container for the booking controls that ensures proper spacing
 * Uses Fibonacci sequence for spacing and margin calculations
 */
const ControlsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${SACRED_SPACING.xl}px;
  padding-top: ${SACRED_SPACING.md}px;
  border-top: 1px solid ${({ theme }: { theme: DefaultTheme }) => theme.colors.border.light};
`;

/**
 * Left side of the controls containing the back button
 * Uses PHI ratio for width distribution
 */
const BackSection = styled.div`
  width: ${100 * (1 - PHI_INVERSE)}%;
`;

/**
 * Right side of the controls containing the continue/submit button
 * Uses PHI ratio for width distribution
 */
const ContinueSection = styled.div`
  width: ${100 * PHI_INVERSE}%;
  display: flex;
  justify-content: flex-end;
`;

/**
 * Button base styling with sacred geometry proportions
 */
const Button = styled.button<{ isSecondary?: boolean }>`
  padding: ${SACRED_SPACING.xs}px ${SACRED_SPACING.md}px;
  border-radius: ${SACRED_SPACING.xxs}px;
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
  transition: all ${getFibonacciByIndex(6) * 10}ms ease-in-out;
  border: 1px solid ${({ theme, isSecondary }: { theme: DefaultTheme; isSecondary?: boolean }) => 
    isSecondary ? theme.colors.border.main : 'transparent'
  };
  background-color: ${({ theme, isSecondary }: { theme: DefaultTheme; isSecondary?: boolean }) => 
    isSecondary ? 'transparent' : theme.colors.accent.main
  };
  color: ${({ theme, isSecondary }: { theme: DefaultTheme; isSecondary?: boolean }) => 
    isSecondary ? theme.colors.text.main : theme.colors.text.light
  };
  
  &:hover {
    background-color: ${({ theme, isSecondary }: { theme: DefaultTheme; isSecondary?: boolean }) => 
      isSecondary ? theme.colors.background.light : theme.colors.accent.dark
    };
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

/**
 * BookingControls component
 * Provides navigation controls for the booking process with back and continue/submit buttons
 * Follows sacred geometry principles for layout and spacing
 */
export const BookingControls: React.FC<BookingControlsProps> = ({
  canGoBack,
  canContinue,
  isLastStep,
  onBack,
  onContinue,
  onSubmit
}) => {
  return (
    <ControlsContainer>
      <BackSection>
        {canGoBack && (
          <Button 
            isSecondary 
            onClick={onBack}
            type="button"
          >
            Back
          </Button>
        )}
      </BackSection>
      <ContinueSection>
        <Button
          onClick={isLastStep ? onSubmit : onContinue}
          disabled={!canContinue}
          type={isLastStep ? "submit" : "button"}
        >
          {isLastStep ? 'Submit' : 'Continue'}
        </Button>
      </ContinueSection>
    </ControlsContainer>
  );
};

export default BookingControls; 













