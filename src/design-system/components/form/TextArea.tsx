/**
 * TextArea Component
 * 
 * A multiline text input component that implements sacred geometry principles
 * for proportions, spacing, and visual harmony.
 * 
 * The TextArea component creates a harmonious user interface element
 * using Golden Ratio and Fibonacci-based measurements.
 */

import * as React from 'react';
import { useState, useEffect, useCallback, useRef } from 'react';;
import styled from 'styled-components';
import { DefaultTheme } from 'styled-components';
import { Box } from '../layout';
import { TextAreaProps } from '../../types';
import { PHI, PHI_INVERSE, SACRED_EASINGS } from '../../../constants/sacred-geometry';
import { radius, spacing } from '../../tokens';

// Size-specific styles
const getSizeStyles = (size: 'sm' | 'md' | 'lg', theme: DefaultTheme) => {
  switch (size) {
    case 'sm':
      return {
        fontSize: theme.typography.fontSize.sm,
        padding: `${theme.spacing.xxs}px ${theme.spacing.xs}px`,
        borderRadius: theme.radius.xs,
        minHeight: 8 * PHI * 5, // ~64.7px (based on Fibonacci and Golden Ratio)
      };
    case 'lg':
      return {
        fontSize: theme.typography.fontSize.md,
        padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
        borderRadius: theme.radius.md,
        minHeight: 13 * PHI * 5, // ~105px (based on Fibonacci and Golden Ratio)
      };
    case 'md':
    default:
      return {
        fontSize: theme.typography.fontSize.base,
        padding: `${theme.spacing.xxs}px ${theme.spacing.sm}px`,
        borderRadius: theme.radius.sm,
        minHeight: 8 * PHI * 8, // ~103.5px (based on Fibonacci and Golden Ratio)
      };
  }
};

// Styled textarea container with sacred geometry proportions
const TextAreaContainer = styled(Box)<{
  isDisabled?: boolean;
  isInvalid?: boolean;
  isValidating?: boolean;
  hasFocus?: boolean;
  componentSize?: 'sm' | 'md' | 'lg';
}>`
  position: relative;
  width: 100%;
  display: flex;
  transition: all 0.3s cubic-bezier(${props => SACRED_EASINGS.standard.join(', ')});
  
  /* Size-specific styles */
  ${props => {
    const sizeStyles = getSizeStyles(props.componentSize || 'md', props.theme);
    return `
      border-radius: ${sizeStyles.borderRadius}px;
      min-height: ${sizeStyles.minHeight}px;
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
`;

// Styled textarea element
const StyledTextArea = styled.textarea<{
  isDisabled?: boolean;
  componentSize?: 'sm' | 'md' | 'lg';
  autoResize?: boolean;
}>`
  width: 100%;
  border: none;
  outline: none;
  resize: ${props => props.autoResize ? 'none' : 'vertical'};
  background: transparent;
  font-family: ${props => props.theme.typography.fontFamily.body};
  color: ${props => props.theme.colors.text.primary};
  line-height: ${PHI}; // Golden ratio line height (1.618)
  
  /* Size-specific styles */
  ${props => {
    const sizeStyles = getSizeStyles(props.componentSize || 'md', props.theme);
    return `
      font-size: ${sizeStyles.fontSize}px;
      padding: ${sizeStyles.padding};
      min-height: ${sizeStyles.minHeight}px;
      border-radius: ${sizeStyles.borderRadius}px;
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

/**
 * TextArea Component with ref forwarding
 * 
 * Creates a multiline text input with sacred geometry proportions
 */
export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ 
    id,
    name,
    value,
    defaultValue,
    placeholder,
    rows = 3,
    autoResize = false,
    maxHeight,
    minHeight,
    disabled = false,
    readOnly = false,
    required = false,
    isInvalid = false,
    isValidating = false,
    size = 'md',
    onChange,
    onFocus,
    onBlur,
    ...rest 
  }, ref) => {
    // Create an internal ref if one is not provided
    const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
    const combinedRef = useCallback((node: HTMLTextAreaElement) => {
      if (node) {
        // Use type assertion to handle the read-only property
        (textAreaRef as React.MutableRefObject<HTMLTextAreaElement | null>).current = node;
        
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current = node;
        }
      }
    }, [ref]);
    
    // State for tracking focus
    const [hasFocus, setHasFocus] = useState(false);
    
    // Auto-resize function
    const resizeTextArea = useCallback(() => {
      if (autoResize && textAreaRef.current) {
        // Reset height to auto to get the correct scrollHeight
        textAreaRef.current.style.height = 'auto';
        
        // Set new height to scrollHeight
        let newHeight = textAreaRef.current.scrollHeight;
        
        // Apply max height constraint if specified
        if (maxHeight && newHeight > parseInt(maxHeight.toString(), 10)) {
          newHeight = parseInt(maxHeight.toString(), 10);
        }
        
        // Apply min height constraint if specified
        if (minHeight && newHeight < parseInt(minHeight.toString(), 10)) {
          newHeight = parseInt(minHeight.toString(), 10);
        }
        
        textAreaRef.current.style.height = `${newHeight}px`;
      }
    }, [autoResize, maxHeight, minHeight]);
    
    // Auto-resize on value change and on mount
    useEffect(() => {
      resizeTextArea();
    }, [value, defaultValue, resizeTextArea]);
    
    // Handle focus events
    const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setHasFocus(true);
      if (onFocus) onFocus(e);
    };
    
    // Handle blur events
    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setHasFocus(false);
      if (onBlur) onBlur(e);
    };
    
    // Handle change events
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (onChange) onChange(e);
      if (autoResize) resizeTextArea();
    };
    
    return (
      <TextAreaContainer
        isDisabled={disabled}
        isInvalid={isInvalid}
        isValidating={isValidating}
        hasFocus={hasFocus}
        componentSize={size}
      >
        <StyledTextArea
          id={id}
          name={name}
          value={value}
          defaultValue={defaultValue}
          placeholder={placeholder}
          rows={rows}
          autoResize={autoResize}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          aria-invalid={isInvalid}
          aria-required={required}
          componentSize={size}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          ref={combinedRef}
          style={{
            maxHeight: maxHeight ? `${maxHeight}px` : undefined,
            minHeight: minHeight ? `${minHeight}px` : undefined,
          }}
          {...rest}
        />
      </TextAreaContainer>
    );
  }
);

TextArea.displayName = 'TextArea';

export default TextArea; 






