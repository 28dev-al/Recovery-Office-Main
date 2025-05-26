/**
 * Checkbox Component
 * 
 * A checkbox input component that implements sacred geometry principles
 * for proportions, spacing, and visual harmony.
 * 
 * The Checkbox component creates a harmonious user interface element
 * using Golden Ratio and Fibonacci-based measurements.
 */

import * as React from 'react';
import { useState, useEffect, useRef, useCallback } from 'react';;
import styled from 'styled-components';
import { DefaultTheme } from 'styled-components';
import { Box } from '../layout';
import { CheckboxProps } from '../../types';
import { PHI, PHI_INVERSE, SACRED_EASINGS } from '../../../constants/sacred-geometry';
import { radius, spacing } from '../../tokens';

// Size-specific styles
const getSizeStyles = (size: 'sm' | 'md' | 'lg', theme: DefaultTheme) => {
  switch (size) {
    case 'sm':
      return {
        size: 13, // Fibonacci number
        borderRadius: theme.radius.xs,
        fontSize: theme.typography.fontSize.sm,
        checkmarkSize: 8, // Fibonacci number
      };
    case 'lg':
      return {
        size: 21, // Fibonacci number
        borderRadius: theme.radius.sm,
        fontSize: theme.typography.fontSize.md,
        checkmarkSize: 13, // Fibonacci number
      };
    case 'md':
    default:
      return {
        size: 16, // Approximation of 8 * PHI
        borderRadius: theme.radius.xs,
        fontSize: theme.typography.fontSize.base,
        checkmarkSize: 10, // Approximation of PHI * 6
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

// Hidden native checkbox input
const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  position: absolute;
  opacity: 0;
  height: 0;
  width: 0;
  margin: 0;
  padding: 0;
  overflow: hidden;
  white-space: nowrap;
`;

// Styled visual checkbox with sacred geometry proportions
const StyledCheckbox = styled.div<{
  isChecked?: boolean;
  isIndeterminate?: boolean;
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
    props.isChecked || props.isIndeterminate
      ? getColorByScheme(props.colorScheme || 'primary', props.isDisabled ? 'disabled' : 'normal', props.theme)
      : props.theme.colors.background[50] || 'white'
  };
  border: 1px solid ${props => 
    props.isChecked || props.isIndeterminate
      ? 'transparent'
      : props.isDisabled
        ? props.theme.colors.background[300] || '#e0e0e0'
        : props.theme.colors.background[400] || '#bdbdbd'
  };
  
  /* Size-specific styles */
  ${props => {
    const sizeStyles = getSizeStyles(props.componentSize || 'md', props.theme);
    
    // If using golden ratio, apply rounded square shape
    if (props.useGoldenRatio) {
      return `
        width: ${sizeStyles.size}px;
        height: ${sizeStyles.size}px;
        border-radius: ${sizeStyles.borderRadius}px;
      `;
    }
    
    // Otherwise use a simple square
    return `
      width: ${sizeStyles.size}px;
      height: ${sizeStyles.size}px;
      border-radius: ${sizeStyles.borderRadius}px;
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
        props.isChecked || props.isIndeterminate
          ? getColorByScheme(props.colorScheme || 'primary', 'hover', props.theme)
          : props.theme.colors.background[100] || '#f5f5f5'
      };
      border-color: ${
        props.isChecked || props.isIndeterminate
          ? 'transparent'
          : props.theme.colors.background[500] || '#9e9e9e'
      };
    `}
  }
`;

// Checkmark icon with sacred proportions
const CheckIcon = styled.div<{
  componentSize?: 'sm' | 'md' | 'lg';
}>`
  /* Checkmark is a simple SVG path drawn with the golden ratio in mind */
  width: ${props => getSizeStyles(props.componentSize || 'md', props.theme).checkmarkSize}px;
  height: ${props => getSizeStyles(props.componentSize || 'md', props.theme).checkmarkSize}px;
  position: relative;
  
  &::before,
  &::after {
    content: '';
    position: absolute;
    background-color: white;
    border-radius: ${props => props.theme.radius.xs / 2}px;
  }
  
  /* The shorter line in the checkmark is PHI_INVERSE times the longer line */
  &::before {
    width: ${props => getSizeStyles(props.componentSize || 'md', props.theme).checkmarkSize * 0.5}px;
    height: 2px;
    bottom: ${props => getSizeStyles(props.componentSize || 'md', props.theme).checkmarkSize * 0.3}px;
    left: 0;
    transform: rotate(45deg);
    transform-origin: left bottom;
  }
  
  &::after {
    width: ${props => getSizeStyles(props.componentSize || 'md', props.theme).checkmarkSize * 0.8}px;
    height: 2px;
    bottom: ${props => getSizeStyles(props.componentSize || 'md', props.theme).checkmarkSize * 0.3}px;
    left: ${props => getSizeStyles(props.componentSize || 'md', props.theme).checkmarkSize * 0.4}px;
    transform: rotate(-50deg);
    transform-origin: left bottom;
  }
`;

// Indeterminate icon
const IndeterminateIcon = styled.div<{
  componentSize?: 'sm' | 'md' | 'lg';
}>`
  width: ${props => getSizeStyles(props.componentSize || 'md', props.theme).checkmarkSize * 0.8}px;
  height: 2px;
  background-color: white;
  border-radius: ${props => props.theme.radius.xs / 2}px;
`;

// Checkbox container for layout
const CheckboxContainer = styled(Box)<{
  isDisabled?: boolean;
}>`
  display: inline-flex;
  align-items: center;
  cursor: ${props => props.isDisabled ? 'not-allowed' : 'pointer'};
  user-select: none;
`;

// Checkbox label with proper spacing
const CheckboxLabel = styled.label<{
  isDisabled?: boolean;
  componentSize?: 'sm' | 'md' | 'lg';
}>`
  margin-left: ${props => props.theme.spacing.xs}px;
  font-family: ${props => props.theme.typography.fontFamily.body};
  font-size: ${props => getSizeStyles(props.componentSize || 'md', props.theme).fontSize}px;
  color: ${props => props.isDisabled ? props.theme.colors.text.disabled : props.theme.colors.text.primary};
`;

/**
 * Checkbox Component with ref forwarding
 * 
 * Creates a checkbox with sacred geometry proportions
 */
export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ 
    id,
    name,
    checked,
    defaultChecked,
    disabled = false,
    required = false,
    isInvalid = false,
    indeterminate = false,
    colorScheme = 'primary',
    useGoldenRatio = true,
    onChange,
    children,
    size = 'md',
    ...rest 
  }, ref) => {
    // State for focus handling
    const [hasFocus, setHasFocus] = useState(false);
    
    // Internal checkbox ref
    const internalRef = useRef<HTMLInputElement>(null);
    
    // Combine the internal ref with the forwarded ref
    const combinedRef = useCallback((node: HTMLInputElement) => {
      if (node) {
        // Use type assertion to handle read-only property
        (internalRef as React.MutableRefObject<HTMLInputElement | null>).current = node;
        
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          // Cast to React.MutableRefObject to silence TypeScript errors
          // This is safe because we're checking that ref exists
          (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
        }
      }
    }, [ref]);
    
    // Set indeterminate state - React doesn't handle this as a prop
    useEffect(() => {
      if (internalRef.current) {
        internalRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);
    
    // Handle focus events
    const handleFocus = () => setHasFocus(true);
    const handleBlur = () => setHasFocus(false);
    
    return (
      <CheckboxContainer isDisabled={disabled}>
        <HiddenCheckbox
          id={id}
          name={name}
          ref={combinedRef}
          checked={checked}
          defaultChecked={defaultChecked}
          disabled={disabled}
          required={required}
          aria-invalid={isInvalid}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...rest}
        />
        
        <StyledCheckbox
          isChecked={checked ?? internalRef.current?.checked ?? defaultChecked}
          isIndeterminate={indeterminate}
          isDisabled={disabled}
          hasFocus={hasFocus}
          useGoldenRatio={useGoldenRatio}
          colorScheme={colorScheme}
          componentSize={size}
          onClick={() => internalRef.current?.click()}
        >
          {(checked || (internalRef.current?.checked ?? defaultChecked)) && !indeterminate && (
            <CheckIcon componentSize={size} />
          )}
          
          {indeterminate && (
            <IndeterminateIcon componentSize={size} />
          )}
        </StyledCheckbox>
        
        {children && (
          <CheckboxLabel
            htmlFor={id}
            isDisabled={disabled}
            componentSize={size}
          >
            {children}
          </CheckboxLabel>
        )}
      </CheckboxContainer>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox; 






