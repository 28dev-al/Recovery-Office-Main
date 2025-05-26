/**
 * FormLabel Component
 * 
 * A label component for form fields that follows sacred geometry principles
 * for typography, spacing, and visual emphasis.
 * 
 * The form label implements harmonious typography using Golden Ratio and
 * Fibonacci-based sizing.
 */

import * as React from 'react';
import styled from 'styled-components';
import { DefaultTheme } from 'styled-components';
import { Box } from '../layout';
import { FormLabelProps } from '../../types';
import { PHI_INVERSE } from '../../../constants/sacred-geometry';


// Calculate size-specific styles
const getSizeStyles = (size: 'sm' | 'md' | 'lg', theme: DefaultTheme) => {
  switch (size) {
    case 'sm':
      return {
        fontSize: theme.typography.fontSize.sm,
        marginBottom: theme.spacing.xxs,
      };
    case 'lg':
      return {
        fontSize: theme.typography.fontSize.md,
        marginBottom: theme.spacing.xs,
      };
    case 'md':
    default:
      return {
        fontSize: theme.typography.fontSize.base,
        marginBottom: theme.spacing.xxs,
      };
  }
};

// Styled label component with sacred geometry proportions
const StyledLabel = styled(Box)<{
  isDisabled?: boolean;
  isRequired?: boolean;
  size?: 'sm' | 'md' | 'lg';
}>`
  font-family: ${props => props.theme.typography.fontFamily.body};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  color: ${props => props.theme.colors.text.primary};
  
  /* Size-specific styles */
  ${props => {
    const sizeStyles = getSizeStyles(props.size || 'md', props.theme);
    return `
      font-size: ${sizeStyles.fontSize}px;
      margin-bottom: ${sizeStyles.marginBottom}px;
    `;
  }}
  
  /* Disabled state */
  ${props => props.isDisabled && `
    opacity: ${PHI_INVERSE};
    cursor: not-allowed;
  `}
`;

// Required indicator with sacred proportions
const RequiredIndicator = styled.span`
  color: ${props => props.theme.colors.feedback.error.main};
  margin-left: ${props => props.theme.spacing.xxs}px;
  font-size: ${props => props.theme.typography.fontSize.base * PHI_INVERSE}px;
  position: relative;
  top: -0.1em;
`;

/**
 * FormLabel Component with ref forwarding
 * 
 * Creates a label for form fields with sacred geometry proportions
 */
export const FormLabel = React.forwardRef<HTMLLabelElement, FormLabelProps>(
  ({ 
    htmlFor,
    isRequired = false,
    isDisabled = false,
    size = 'md',
    showRequiredIndicator = true,
    children,
    ...rest 
  }, ref) => {
    return (
      <StyledLabel
        as="label"
        htmlFor={htmlFor}
        isDisabled={isDisabled}
        isRequired={isRequired}
        size={size}
        ref={ref}
        {...rest}
      >
        {children}
        {isRequired && showRequiredIndicator && (
          <RequiredIndicator aria-hidden="true">*</RequiredIndicator>
        )}
      </StyledLabel>
    );
  }
);

FormLabel.displayName = 'FormLabel';

export default FormLabel; 







