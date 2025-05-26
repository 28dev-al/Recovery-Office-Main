/**
 * PercentageInput Component
 * 
 * A specialized input component for percentage values that implements
 * sacred geometry principles for proportions and visual harmony.
 * 
 * Features automatic formatting, percentage symbols, and specialized
 * keyboard handling for financial data entry.
 */

import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { Box } from '../layout';
import { InputProps } from '../../types';
import { PHI, PHI_INVERSE, SACRED_EASINGS } from '../../../constants/sacred-geometry';

// Import base Input component to inherit styles
import Input from './Input';

// Specialized props for percentage input
export interface PercentageInputProps extends Omit<InputProps, 'type' | 'value' | 'defaultValue' | 'onChange'> {
  /**
   * The percentage value (as a number)
   */
  value?: number;
  
  /**
   * Default value for uncontrolled inputs
   */
  defaultValue?: number;
  
  /**
   * Number of decimal places to show
   * @default 2
   */
  decimals?: number;
  
  /**
   * Decimal separator character
   * @default '.'
   */
  decimalSeparator?: string;
  
  /**
   * Whether to allow negative values
   * @default false
   */
  allowNegative?: boolean;
  
  /**
   * Maximum value allowed (typically 100 for percentages)
   * @default undefined
   */
  max?: number;
  
  /**
   * Minimum value allowed
   * @default undefined
   */
  min?: number;
  
  /**
   * Callback when value changes
   */
  onChange?: (value: number | null) => void;
  
  /**
   * Whether to display the percentage symbol on the right
   * @default true
   */
  symbolOnRight?: boolean;
  
  /**
   * Whether to automatically add decimal places on blur
   * @default true
   */
  padDecimals?: boolean;
  
  /**
   * Internal value representation - true for decimal (0.05 for 5%), false for whole number (5 for 5%)
   * @default false
   */
  decimalValue?: boolean;
}

// Styled percentage wrapper
const PercentageContainer = styled(Box)<{
  $hasFocus: boolean;
  isDisabled?: boolean;
  isInvalid?: boolean;
}>`
  position: relative;
  width: 100%;
  transition: all 0.3s cubic-bezier(${props => SACRED_EASINGS.standard.join(', ')});
`;

// Percentage symbol element
const PercentageSymbol = styled.span<{
  $position: 'left' | 'right';
  $hasFocus: boolean;
  $size?: 'sm' | 'md' | 'lg';
  $isNegative?: boolean;
}>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-family: ${props => props.theme.typography.fontFamily.body};
  color: ${props => props.$hasFocus 
    ? props.theme.colors.primary[700] 
    : props.$isNegative 
      ? props.theme.colors.feedback.error.main
      : props.theme.colors.text.secondary};
  pointer-events: none;
  user-select: none;
  
  ${props => props.$position === 'left' && `
    left: ${props.theme.spacing.sm}px;
  `}
  
  ${props => props.$position === 'right' && `
    right: ${props.theme.spacing.sm}px;
  `}
  
  /* Size-specific styles */
  ${props => {
    switch (props.$size) {
      case 'sm':
        return `font-size: ${props.theme.typography.fontSize.sm}px;`;
      case 'lg':
        return `font-size: ${props.theme.typography.fontSize.md}px;`;
      case 'md':
      default:
        return `font-size: ${props.theme.typography.fontSize.base}px;`;
    }
  }}
  
  transition: color 0.2s ease-in-out;
`;

/**
 * Function to format percentage with appropriate decimals
 */
const formatPercentage = (
  value: number | undefined,
  decimals: number = 2,
  decimalSeparator: string = '.',
  decimalValue: boolean = false
): string => {
  if (value === undefined || value === null) return '';
  
  // Convert from decimal to percentage for display if needed
  const displayValue = decimalValue ? value * 100 : value;
  
  // Handle formatting
  const fixedValue = displayValue.toFixed(decimals);
  
  // Use locale-specific separator if needed
  if (decimalSeparator !== '.') {
    return fixedValue.replace('.', decimalSeparator);
  }
  
  return fixedValue;
};

/**
 * Function to parse percentage string back to number
 */
const parsePercentage = (
  value: string,
  decimalSeparator: string = '.',
  allowNegative: boolean = false,
  decimalValue: boolean = false
): number | null => {
  if (!value) return null;
  
  // Remove everything except digits, decimal separator, and negative sign
  let cleanValue = value
    .replace(new RegExp(`[^0-9${decimalSeparator}${allowNegative ? '-' : ''}]`, 'g'), '')
    .replace(new RegExp(`\\${decimalSeparator}`, 'g'), '.');
  
  // Handle multiple decimal points (keep only the first one)
  const decimalPoints = cleanValue.match(/\./g) || [];
  if (decimalPoints.length > 1) {
    const parts = cleanValue.split('.');
    cleanValue = parts[0] + '.' + parts.slice(1).join('');
  }
  
  // If we don't allow negative but there's a negative sign, remove it
  if (!allowNegative && cleanValue.includes('-')) {
    cleanValue = cleanValue.replace(/-/g, '');
  }
  
  // Parse string to number
  const parsed = parseFloat(cleanValue);
  
  // Convert from percentage to decimal if needed
  return isNaN(parsed) ? null : (decimalValue ? parsed / 100 : parsed);
};

/**
 * PercentageInput Component
 * 
 * A specialized input for percentage values with formatting.
 */
const PercentageInput: React.FC<PercentageInputProps> = ({
  value,
  defaultValue,
  decimals = 2,
  decimalSeparator = '.',
  allowNegative = false,
  max,
  min,
  onChange,
  symbolOnRight = true,
  padDecimals = true,
  decimalValue = false,
  size = 'md',
  disabled = false,
  isInvalid = false,
  placeholder = '0.00',
  ...rest
}) => {
  // Track internal representation of display and focus state
  const [displayValue, setDisplayValue] = useState<string>('');
  const [hasFocus, setHasFocus] = useState<boolean>(false);
  
  // Initialize with default or controlled value
  useEffect(() => {
    const initialValue = value !== undefined ? value : defaultValue;
    const formatted = formatPercentage(initialValue, decimals, decimalSeparator, decimalValue);
    setDisplayValue(formatted);
  }, [value, defaultValue, decimals, decimalSeparator, decimalValue]);
  
  // Format the percentage for display
  const formatForDisplay = useCallback((numValue: number | null): string => {
    if (numValue === null) return '';
    return formatPercentage(numValue, decimals, decimalSeparator, decimalValue);
  }, [decimals, decimalSeparator, decimalValue]);
  
  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    
    // Store the display value regardless of validity
    setDisplayValue(rawValue);
    
    // Parse the input to a number for the actual value
    const parsedValue = parsePercentage(rawValue, decimalSeparator, allowNegative, decimalValue);
    
    // Apply min/max constraints
    let constrainedValue = parsedValue;
    if (parsedValue !== null) {
      if (max !== undefined && parsedValue > max) constrainedValue = max;
      if (min !== undefined && parsedValue < min) constrainedValue = min;
      
      // If constrained value is different, update display
      if (constrainedValue !== parsedValue) {
        setDisplayValue(formatForDisplay(constrainedValue));
      }
    }
    
    // Call onChange with the parsed value
    if (onChange) {
      onChange(constrainedValue);
    }
  };
  
  // Handle focus (select all text on focus)
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setHasFocus(true);
    // Select all text on focus for easy retyping
    e.target.select();
  };
  
  // Handle blur (format properly on blur)
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setHasFocus(false);
    
    // Parse the current display value
    const parsedValue = parsePercentage(displayValue, decimalSeparator, allowNegative, decimalValue);
    
    // Check if we need to pad decimals
    if (padDecimals && parsedValue !== null) {
      setDisplayValue(formatForDisplay(parsedValue));
    }
  };
  
  // Calculate padding based on percentage symbol position
  const inputPadding = {
    paddingLeft: symbolOnRight ? undefined : '30px',
    paddingRight: symbolOnRight ? '30px' : undefined,
  };
  
  // Check if the value is negative for styling
  const isNegative = typeof value === 'number' && value < 0;
  
  return (
    <PercentageContainer $hasFocus={hasFocus} isDisabled={disabled} isInvalid={isInvalid}>
      {!symbolOnRight && (
        <PercentageSymbol 
          $position="left" 
          $hasFocus={hasFocus}
          $size={size}
          $isNegative={isNegative}
        >
          %
        </PercentageSymbol>
      )}
      
      <Input
        type="text"
        value={displayValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        style={inputPadding}
        size={size}
        disabled={disabled}
        isInvalid={isInvalid}
        {...rest}
      />
      
      {symbolOnRight && (
        <PercentageSymbol 
          $position="right" 
          $hasFocus={hasFocus}
          $size={size}
          $isNegative={isNegative}
        >
          %
        </PercentageSymbol>
      )}
    </PercentageContainer>
  );
};

export default PercentageInput; 