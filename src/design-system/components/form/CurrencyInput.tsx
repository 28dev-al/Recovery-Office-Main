/**
 * CurrencyInput Component
 * 
 * A specialized input component for monetary values that implements
 * sacred geometry principles for proportions and visual harmony.
 * 
 * Features automatic formatting, currency symbols, and specialized
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

// Specialized props for currency input
export interface CurrencyInputProps extends Omit<InputProps, 'type' | 'value' | 'defaultValue' | 'onChange'> {
  /**
   * The monetary value (as a number)
   */
  value?: number;
  
  /**
   * Default value for uncontrolled inputs
   */
  defaultValue?: number;
  
  /**
   * Currency symbol to display
   * @default '$'
   */
  currencySymbol?: string;
  
  /**
   * Currency code (e.g., 'USD', 'EUR')
   */
  currencyCode?: string;
  
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
   * Thousands separator character
   * @default ','
   */
  thousandsSeparator?: string;
  
  /**
   * Whether to allow negative values
   * @default true
   */
  allowNegative?: boolean;
  
  /**
   * Maximum value allowed
   */
  max?: number;
  
  /**
   * Minimum value allowed
   */
  min?: number;
  
  /**
   * Callback when value changes
   */
  onChange?: (value: number | null) => void;
  
  /**
   * Whether to display the currency symbol on the right
   * @default false
   */
  symbolOnRight?: boolean;
  
  /**
   * Whether to automatically add decimal places on blur
   * @default true
   */
  padDecimals?: boolean;
}

// Styled currency wrapper
const CurrencyContainer = styled(Box)<{
  $hasFocus: boolean;
  isDisabled?: boolean;
  isInvalid?: boolean;
}>`
  position: relative;
  width: 100%;
  transition: all 0.3s cubic-bezier(${props => SACRED_EASINGS.standard.join(', ')});
`;

// Currency symbol element
const CurrencySymbol = styled.span<{
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
 * Function to format currency with appropriate separators
 */
const formatCurrency = (
  value: number | undefined,
  decimals: number = 2,
  decimalSeparator: string = '.',
  thousandsSeparator: string = ','
): string => {
  if (value === undefined || value === null) return '';
  
  // Handle formatting
  const fixedValue = value.toFixed(decimals);
  const [integerPart, decimalPart] = fixedValue.split('.');
  
  // Format integer part with thousands separator
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator);
  
  // Combine with decimal part if needed
  return decimals > 0
    ? `${formattedInteger}${decimalSeparator}${decimalPart}`
    : formattedInteger;
};

/**
 * Function to parse currency string back to number
 */
const parseCurrency = (
  value: string,
  decimalSeparator: string = '.',
  thousandsSeparator: string = ',',
  allowNegative: boolean = true
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
  
  return isNaN(parsed) ? null : parsed;
};

/**
 * CurrencyInput Component
 * 
 * A specialized input for monetary values with formatting.
 */
const CurrencyInput: React.FC<CurrencyInputProps> = ({
  value,
  defaultValue,
  currencySymbol = '$',
  currencyCode,
  decimals = 2,
  decimalSeparator = '.',
  thousandsSeparator = ',',
  allowNegative = true,
  max,
  min,
  onChange,
  symbolOnRight = false,
  padDecimals = true,
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
    const formatted = formatCurrency(initialValue, decimals, decimalSeparator, thousandsSeparator);
    setDisplayValue(formatted);
  }, [value, defaultValue, decimals, decimalSeparator, thousandsSeparator]);
  
  // Format the currency for display
  const formatForDisplay = useCallback((numValue: number | null): string => {
    if (numValue === null) return '';
    return formatCurrency(numValue, decimals, decimalSeparator, thousandsSeparator);
  }, [decimals, decimalSeparator, thousandsSeparator]);
  
  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    
    // Store the display value regardless of validity
    setDisplayValue(rawValue);
    
    // Parse the input to a number for the actual value
    const parsedValue = parseCurrency(rawValue, decimalSeparator, thousandsSeparator, allowNegative);
    
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
    const parsedValue = parseCurrency(displayValue, decimalSeparator, thousandsSeparator, allowNegative);
    
    // Check if we need to pad decimals
    if (padDecimals && parsedValue !== null) {
      setDisplayValue(formatForDisplay(parsedValue));
    }
  };
  
  // Calculate padding based on currency symbol position
  const inputPadding = {
    paddingLeft: symbolOnRight ? undefined : `${currencySymbol.length * 10 + 8}px`,
    paddingRight: symbolOnRight ? `${currencySymbol.length * 10 + 8}px` : undefined,
  };
  
  // Check if the value is negative for styling
  const isNegative = typeof value === 'number' && value < 0;
  
  return (
    <CurrencyContainer $hasFocus={hasFocus} isDisabled={disabled} isInvalid={isInvalid}>
      <CurrencySymbol 
        $position={symbolOnRight ? 'right' : 'left'} 
        $hasFocus={hasFocus}
        $size={size}
        $isNegative={isNegative}
      >
        {currencySymbol}
      </CurrencySymbol>
      
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
    </CurrencyContainer>
  );
};

export default CurrencyInput; 