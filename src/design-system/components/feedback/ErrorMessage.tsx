/**
 * ErrorMessage Component
 * 
 * A component for displaying inline error messages.
 * Uses sacred geometry principles for spacing and typography.
 */

import * as React from 'react';
import styled from 'styled-components';
import { Text } from '../typography/Text';
import { SACRED_SPACING } from '../../../constants/sacred-geometry';

export interface ErrorMessageProps {
  /**
   * The error message content
   */
  children: React.ReactNode;
  
  /**
   * Whether the error message is visible
   * @default true
   */
  isVisible?: boolean;
  
  /**
   * Icon to display before the error message
   */
  icon?: React.ReactNode;
  
  /**
   * Additional CSS class name
   */
  className?: string;
  
  /**
   * ID for accessibility
   */
  id?: string;
}

const ErrorContainer = styled.div<{ $isVisible?: boolean }>`
  display: ${props => props.$isVisible ? 'flex' : 'none'};
  align-items: center;
  margin-top: ${SACRED_SPACING.xs}px;
  color: ${props => props.theme.colors.feedback.error.main};
`;

const ErrorIcon = styled.span`
  margin-right: ${SACRED_SPACING.xxs}px;
  display: flex;
  align-items: center;
`;

/**
 * ErrorMessage Component
 * 
 * Displays inline error messages
 */
export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  children,
  isVisible = true,
  icon,
  className,
  id
}) => {
  if (!isVisible || !children) {
    return null;
  }

  return (
    <ErrorContainer 
      $isVisible={isVisible} 
      className={className}
      role="alert"
      id={id}
    >
      {icon && <ErrorIcon>{icon}</ErrorIcon>}
      <Text 
        variant="caption" 
        color="inherit"
        fontStyle="italic"
      >
        {children}
      </Text>
    </ErrorContainer>
  );
};

export default ErrorMessage; 