/**
 * FormError Component
 * 
 * A component for displaying form field errors that follows sacred geometry
 * principles for typography, spacing, and visual emphasis.
 * 
 * The form error implements harmonious typography and spacing using Golden Ratio
 * and Fibonacci-based values.
 */

import * as React from 'react';
import styled from 'styled-components';
import { DefaultTheme } from 'styled-components';
import { Box } from '../layout';
import { FormErrorProps } from '../../types';
import { PHI_INVERSE } from '../../../constants/sacred-geometry';


// Size-specific styles
const getSizeStyles = (size: 'sm' | 'md' | 'lg', theme: DefaultTheme) => {
  switch (size) {
    case 'sm':
      return {
        fontSize: theme.typography.fontSize.xs,
        iconSize: theme.typography.fontSize.xs * PHI_INVERSE * 2, // Scaled down by golden ratio
      };
    case 'lg':
      return {
        fontSize: theme.typography.fontSize.sm,
        iconSize: theme.typography.fontSize.sm * PHI_INVERSE * 2, // Scaled down by golden ratio
      };
    case 'md':
    default:
      return {
        fontSize: theme.typography.fontSize.xs,
        iconSize: theme.typography.fontSize.xs * PHI_INVERSE * 2, // Scaled down by golden ratio
      };
  }
};

// Styled error container with sacred geometry proportions
const StyledErrorContainer = styled(Box)<{
  size?: 'sm' | 'md' | 'lg';
}>`
  display: flex;
  align-items: center;
  color: ${props => props.theme.colors.feedback.error.main};
  
  /* Size-specific styles */
  ${props => {
    const sizeStyles = getSizeStyles(props.size || 'md', props.theme);
    return `
      font-size: ${sizeStyles.fontSize}px;
    `;
  }}
`;

// Icon component for the error
const ErrorIcon = styled.div<{ 
  children?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}>`
  display: inline-flex;
  margin-right: ${props => props.theme.spacing.xxs}px;
  
  /* Size-specific icon styles */
  ${props => {
    const sizeStyles = getSizeStyles(props.size || 'md', props.theme);
    return `
      width: ${sizeStyles.iconSize}px;
      height: ${sizeStyles.iconSize}px;
    `;
  }}
  
  &::before {
    content: '!';
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: ${props => props.theme.colors.feedback.error.main};
    color: white;
    font-size: 0.75em;
    font-weight: ${props => props.theme.typography.fontWeight.bold};
  }
`;

/**
 * FormError Component with ref forwarding
 * 
 * Creates an error message for form fields with sacred geometry proportions
 */
export const FormError = React.forwardRef<HTMLDivElement, FormErrorProps>(
  ({ 
    size = 'md',
    showIcon = true,
    children,
    ...rest 
  }, ref) => {
    return (
      <StyledErrorContainer
        aria-live="polite"
        size={size}
        ref={ref}
        {...rest}
      >
        {showIcon && <ErrorIcon size={size} />}
        <Box>{children}</Box>
      </StyledErrorContainer>
    );
  }
);

FormError.displayName = 'FormError';

export default FormError; 








