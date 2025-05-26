// TODO: This file contains direct document access without SSR checks
/**
 * Radio Component
 * 
 * A radio button input component that implements sacred geometry principles
 * for proportions, spacing, and visual harmony.
 * 
 * The Radio component creates a harmonious user interface element
 * using Golden Ratio and Fibonacci-based measurements.
 */

import * as React from 'react';
import { useState } from 'react';;
import styled from 'styled-components';
import { DefaultTheme } from 'styled-components';
import { Box } from '../layout';
import { RadioProps } from '../../types';
import { PHI, PHI_INVERSE, SACRED_EASINGS } from '../../../constants/sacred-geometry';
import { radius, spacing } from '../../tokens';

// Size-specific styles
const getSizeStyles = (size: 'sm' | 'md' | 'lg', theme: DefaultTheme) => {
  switch (size) {
    case 'sm':
      return {
        size: 13, // Fibonacci number
        fontSize: theme.typography.fontSize.sm,
        dotSize: 5, // ~8 * PHI_INVERSE
      };
    case 'lg':
      return {
        size: 21, // Fibonacci number
        fontSize: theme.typography.fontSize.md,
        dotSize: 8, // Fibonacci number
      };
    case 'md':
    default:
      return {
        size: 16, // Approximation of 8 * PHI
        fontSize: theme.typography.fontSize.base,
        dotSize: 6, // ~10 * PHI_INVERSE
      };
  }
};

// Get the color for different states and color schemes
const getColorByScheme = (
  colorScheme: 'primary' | 'secondary' | 'accent',
  state: 'normal' | 'hover' | 'focus' | 'disabled',
  theme: DefaultTheme
) => {
  const base = {
    primary: {
      bg: theme.colors.primary[500] || '#4caf50',
      hover: theme.colors.primary[600] || '#388e3c',
      focus: theme.colors.primary[400] || '#66bb6a',
      disabled: theme.colors.background[300] || '#e0e0e0',
    },
    secondary: {
      bg: theme.colors.secondary[500] || '#81976F',
      hover: theme.colors.secondary[600] || '#697a59',
      focus: theme.colors.secondary[400] || '#9aad8a',
      disabled: theme.colors.background[300] || '#e0e0e0',
    },
    accent: {
      bg: theme.colors.accent.gold || '#d4a76a',
      hover: theme.colors.accent.copper || '#ba8d5a',
      focus: theme.colors.accent.teal || '#66b2b2',
      disabled: theme.colors.background[300] || '#e0e0e0',
    },
  };

  switch (state) {
    case 'hover':
      return base[colorScheme]?.hover || base.primary.hover;
    case 'focus':
      return base[colorScheme]?.focus || base.primary.focus;
    case 'disabled':
      return base[colorScheme]?.disabled || base.primary.disabled;
    case 'normal':
    default:
      return base[colorScheme]?.bg || base.primary.bg;
  }
};

// Hidden native radio input
const HiddenRadio = styled.input.attrs({ type: 'radio' })`
  position: absolute;
  opacity: 0;
  height: 0;
  width: 0;
  margin: 0;
  padding: 0;
  overflow: hidden;
  white-space: nowrap;
`;

// Styled visual radio with sacred geometry proportions
const StyledRadio = styled.div<{
  isChecked?: boolean;
  isDisabled?: boolean;
  hasFocus?: boolean;
  useGoldenRatio?: boolean;
  colorScheme?: 'primary' | 'secondary' | 'accent';
  componentSize?: 'sm' | 'md' | 'lg';
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s cubic-bezier(${props => SACRED_EASINGS.standard.join(', ')});
  background-color: ${props => 
    props.isChecked
      ? getColorByScheme(props.colorScheme || 'primary', props.isDisabled ? 'disabled' : 'normal', props.theme)
      : props.theme.colors.background[50] ?? 1
  };
  border: 1px solid ${props => 
    props.isChecked
      ? 'transparent'
      : props.isDisabled
        ? props.theme.colors.background[300] ?? 1
        : props.theme.colors.background[400] ?? 1
  };
  border-radius: 50%; // Always circular for radio buttons
  
  /* Size-specific styles */
  ${props => {
    const sizeStyles = getSizeStyles(props.componentSize || 'md', props.theme);
    
    // If using golden ratio, apply proportional sizing
    if (props.useGoldenRatio) {
      return `
        width: ${sizeStyles.size}px;
        height: ${sizeStyles.size}px;
      `;
    }
    
    // Otherwise use a simple circle
    return `
      width: ${sizeStyles.size}px;
      height: ${sizeStyles.size}px;
    `;
  }}
  
  /* Focus state with golden ratio-based glow */
  ${props => props.hasFocus && !props.isDisabled && `
    box-shadow: 0 0 0 ${PHI_INVERSE * 5}px ${
      getColorByScheme(props.colorScheme || 'primary', 'focus', props.theme) + '40' // 40 = 25% opacity in hex
    };
  `}
  
  /* Disabled state */
  ${props => props.isDisabled && `
    opacity: ${PHI_INVERSE};
    cursor: not-allowed;
  `}
  
  /* Hover state */
  &:hover {
    ${props => !props.isDisabled && `
      background-color: ${
        props.isChecked
          ? getColorByScheme(props.colorScheme || 'primary', 'hover', props.theme)
          : props.theme.colors.background[100] ?? 1
      };
      border-color: ${
        props.isChecked
          ? 'transparent'
          : props.theme.colors.background[500] ?? 1
      };
    `}
  }
`;

// Radio dot indicator with sacred proportions
const RadioDot = styled.div<{
  componentSize?: 'sm' | 'md' | 'lg';
}>`
  width: ${props => getSizeStyles(props.componentSize || 'md', props.theme).dotSize}px;
  height: ${props => getSizeStyles(props.componentSize || 'md', props.theme).dotSize}px;
  background-color: white;
  border-radius: 50%;
`;

// Radio container for layout
const RadioContainer = styled(Box)<{
  isDisabled?: boolean;
}>`
  display: inline-flex;
  align-items: center;
  cursor: ${props => props.isDisabled ? 'not-allowed' : 'pointer'};
  user-select: none;
`;

// Radio label with proper spacing
const RadioLabel = styled.label<{
  isDisabled?: boolean;
  componentSize?: 'sm' | 'md' | 'lg';
}>`
  margin-left: ${props => props.theme.spacing.xs}px;
  font-family: ${props => props.theme.typography.fontFamily.body};
  font-size: ${props => getSizeStyles(props.componentSize || 'md', props.theme).fontSize}px;
  color: ${props => props.isDisabled ? props.theme.colors.text.disabled : props.theme.colors.text.primary};
`;

/**
 * Radio Component with ref forwarding
 * 
 * Creates a radio button with sacred geometry proportions
 */
export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ 
    id,
    name,
    value,
    checked,
    defaultChecked,
    disabled = false,
    required = false,
    isInvalid = false,
    useGoldenRatio = true,
    colorScheme = 'primary',
    size = 'md',
    onChange,
    children,
    ...rest 
  }, ref) => {
    // State for focus tracking
    const [hasFocus, setHasFocus] = useState(false);
    
    // Focus handling
    const handleFocus = () => setHasFocus(true);
    const handleBlur = () => setHasFocus(false);
    
    // Generate a unique ID if one is not provided
    const generatedId = React.useId();
    const radioId = id || `${name ? name + '-' : ''}radio-${value}-${generatedId}`;
    
    return (
      <RadioContainer isDisabled={disabled}>
        <Box position="relative" display="flex" alignItems="center">
          {/* Hidden native radio for accessibility */}
          <HiddenRadio
            id={radioId}
            name={name}
            value={value}
            checked={checked}
            defaultChecked={defaultChecked}
            required={required}
            disabled={disabled}
            aria-invalid={isInvalid}
            onChange={onChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            ref={ref}
            {...rest}
          />
          
          {/* Visual radio */}
          <StyledRadio
            isChecked={checked || defaultChecked}
            isDisabled={disabled}
            hasFocus={hasFocus}
            useGoldenRatio={useGoldenRatio}
            colorScheme={colorScheme}
            componentSize={size}
            onClick={() => {
              const input = document.getElementById(radioId) as HTMLInputElement;
              if (input && !disabled) {
                input.click();
              }
            }}
          >
            {(checked || defaultChecked) && (
              <RadioDot componentSize={size} />
            )}
          </StyledRadio>
        </Box>
        
        {/* Label */}
        {children && (
          <RadioLabel
            htmlFor={radioId}
            isDisabled={disabled}
            componentSize={size}
          >
            {children}
          </RadioLabel>
        )}
      </RadioContainer>
    );
  }
);

Radio.displayName = 'Radio';

export default Radio; 






