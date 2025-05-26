/**
 * Input Component
 * 
 * A text input component that implements sacred geometry principles
 * for proportions, spacing, and visual harmony.
 * 
 * The Input component creates a harmonious user interface element
 * using Golden Ratio and Fibonacci-based measurements.
 */

import * as React from 'react';
import { useState } from 'react';;
import styled from 'styled-components';
import { DefaultTheme } from 'styled-components';
import { Box } from '../layout';
import { InputProps } from '../../types';
import { radius, spacing } from '../../tokens';
import { 
  PHI, 
  PHI_INVERSE, 
  GOLDEN_SECTIONS,
  SACRED_EASINGS 
} from '../../../constants/sacred-geometry';

// Size-specific styles
const getSizeStyles = (size: 'sm' | 'md' | 'lg', theme: DefaultTheme) => {
  switch (size) {
    case 'sm':
      return {
        fontSize: theme.typography.fontSize.sm,
        padding: `${theme.spacing.xxs}px ${theme.spacing.xs}px`,
        height: 8 * PHI * 3, // ~38.8px (based on Fibonacci and Golden Ratio)
        borderRadius: theme.radius.xs,
        iconSize: theme.typography.fontSize.base,
      };
    case 'lg':
      return {
        fontSize: theme.typography.fontSize.md,
        padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
        height: 13 * PHI * 3, // ~63px (based on Fibonacci and Golden Ratio)
        borderRadius: theme.radius.md,
        iconSize: theme.typography.fontSize.lg,
      };
    case 'md':
    default:
      return {
        fontSize: theme.typography.fontSize.base,
        padding: `${theme.spacing.xxs}px ${theme.spacing.sm}px`,
        height: 8 * PHI * 4, // ~51.8px (based on Fibonacci and Golden Ratio)
        borderRadius: theme.radius.sm,
        iconSize: theme.typography.fontSize.md,
      };
  }
};

// Styled input container with sacred geometry proportions
const InputContainer = styled(Box)<{
  isDisabled?: boolean;
  isInvalid?: boolean;
  isValidating?: boolean;
  hasFocus?: boolean;
  hasStartIcon?: boolean;
  hasEndIcon?: boolean;
  size?: 'sm' | 'md' | 'lg';
}>`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  transition: all 0.3s cubic-bezier(${props => SACRED_EASINGS.standard.join(', ')});
  
  /* Size-specific styles */
  ${props => {
    const sizeStyles = getSizeStyles(props.size || 'md', props.theme);
    return `
      height: ${sizeStyles.height}px;
      border-radius: ${sizeStyles.borderRadius}px;
    `;
  }}
  
  /* States */
  background-color: ${props => props.theme.colors.background[50] ?? 1};
  border: 1px solid ${props => {
    if (props.isInvalid) return props.theme.colors.feedback.error.main;
    if (props.hasFocus) return props.theme.colors.primary[500] ?? 1;
    if (props.isValidating) return props.theme.colors.feedback.info.main;
    return props.theme.colors.background[300] ?? 1;
  }};
  
  /* Focus state with golden ratio-based glow */
  ${props => props.hasFocus && !props.isDisabled && `
    box-shadow: 0 0 0 ${PHI_INVERSE * 5}px ${props.isInvalid 
      ? props.theme.colors.feedback.error.light + '40'  // 40 = 25% opacity in hex
      : props.theme.colors.primary[200] ?? 1 + '40'};        // 40 = 25% opacity in hex
  `}
  
  /* Disabled state */
  ${props => props.isDisabled && `
    opacity: ${PHI_INVERSE};
    cursor: not-allowed;
    background-color: ${props.theme.colors.background[100] ?? 1};
  `}
  
  /* Invalid state */
  ${props => props.isInvalid && `
    border-color: ${props.theme.colors.feedback.error.main};
  `}
  
  /* Validating state */
  ${props => props.isValidating && `
    border-color: ${props.theme.colors.feedback.info.main};
  `}
  
  /* Icon padding adjustments */
  ${props => props.hasStartIcon && `
    padding-left: ${props.theme.spacing.md}px;
  `}
  
  ${props => props.hasEndIcon && `
    padding-right: ${props.theme.spacing.md}px;
  `}
`;

// Styled input element
const StyledInput = styled.input<{
  isDisabled?: boolean;
  inputSize?: 'sm' | 'md' | 'lg';  // Renamed from 'size' to 'inputSize' to avoid conflicts
}>`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  background: transparent;
  font-family: ${props => props.theme.typography.fontFamily.body};
  color: ${props => props.theme.colors.text.primary};
  
  /* Size-specific styles */
  ${props => {
    const sizeStyles = getSizeStyles(props.inputSize || 'md', props.theme);
    return `
      font-size: ${sizeStyles.fontSize}px;
      padding: ${sizeStyles.padding};
    `;
  }}
  
  /* Placeholder with golden ratio opacity */
  &::placeholder {
    color: ${props => props.theme.colors.text.tertiary};
    opacity: ${PHI_INVERSE};
  }
  
  /* Disabled state */
  ${props => props.isDisabled && `
    cursor: not-allowed;
  `}
`;

// Icon container
const IconContainer = styled(Box)<{
  $position: 'start' | 'end';
  size?: 'sm' | 'md' | 'lg';
}>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.text.secondary};
  z-index: 2;
  
  /* Position */
  ${props => props.$position === 'start' && `
    left: ${props.theme.spacing.xs}px;
  `}
  
  ${props => props.$position === 'end' && `
    right: ${props.theme.spacing.xs}px;
  `}
  
  /* Size-specific styles */
  ${props => {
    const sizeStyles = getSizeStyles(props.size || 'md', props.theme);
    return `
      font-size: ${sizeStyles.iconSize}px;
    `;
  }}
`;

/**
 * Input Component with ref forwarding
 * 
 * Creates an input field with sacred geometry proportions
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ 
    id,
    name,
    type = 'text',
    value,
    defaultValue,
    placeholder,
    disabled = false,
    readOnly = false,
    required = false,
    isInvalid = false,
    isValidating = false,
    size = 'md',
    onChange,
    onFocus,
    onBlur,
    startIcon,
    endIcon,
    useSacredProportions = true,
    ...rest 
  }, ref) => {
    // State for tracking focus
    const [hasFocus, setHasFocus] = useState(false);
    
    // Handle focus events
    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setHasFocus(true);
      if (onFocus) onFocus(e);
    };
    
    // Handle blur events
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setHasFocus(false);
      if (onBlur) onBlur(e);
    };
    
    return (
      <InputContainer
        isDisabled={disabled}
        isInvalid={isInvalid}
        isValidating={isValidating}
        hasFocus={hasFocus}
        hasStartIcon={!!startIcon}
        hasEndIcon={!!endIcon}
        size={size}
      >
        {/* Start icon */}
        {startIcon && (
          <IconContainer $position="start" size={size}>
            {startIcon}
          </IconContainer>
        )}
        
        {/* Input element */}
        <StyledInput
          id={id}
          name={name}
          type={type}
          value={value}
          defaultValue={defaultValue}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          ref={ref}
          isDisabled={disabled}
          inputSize={size}
          {...rest}
        />
        
        {/* End icon */}
        {endIcon && (
          <IconContainer $position="end" size={size}>
            {endIcon}
          </IconContainer>
        )}
      </InputContainer>
    );
  }
);

Input.displayName = 'Input';

export default Input; 






