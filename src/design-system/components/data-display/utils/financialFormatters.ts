/**
 * Financial Formatters
 * 
 * Utility functions for formatting financial data in a consistent way
 * throughout the application, ensuring professional presentation of monetary values.
 */

// Format options type
export interface FormatOptions {
  /**
   * The locale to use for formatting
   * @default 'en-US'
   */
  locale?: string;
  
  /**
   * The currency code to use (for currency formatting)
   * @default 'USD'
   */
  currency?: string;
  
  /**
   * Whether to use the currency symbol
   * @default true
   */
  symbol?: boolean;
  
  /**
   * Number of decimal places
   * @default 2
   */
  decimals?: number;
  
  /**
   * Whether to use compact notation for large numbers
   * @default false
   */
  compact?: boolean;
  
  /**
   * Custom formatting for special cases
   */
  custom?: {
    /**
     * Format for zero values
     * @example '-', 'N/A', '$0.00'
     */
    zero?: string;
    
    /**
     * Format for null/undefined values
     * @example '-', 'N/A'
     */
    empty?: string;
    
    /**
     * Format for negative values (applied after formatting)
     * @example '(${value})', '-${value}'
     */
    negative?: string;
  };
}

/**
 * Format a monetary value as currency
 * 
 * @param value The numeric value to format
 * @param options Formatting options
 * @returns Formatted currency string
 */
export function formatCurrency(value: number | null | undefined, options: FormatOptions = {}): string {
  // Handle null/undefined
  if (value === null || value === undefined) {
    return options.custom?.empty || '-';
  }
  
  // Handle zero values
  if (value === 0) {
    return options.custom?.zero !== undefined ? options.custom.zero : formatNonZeroCurrency(0, options);
  }
  
  // Handle regular values
  return formatNonZeroCurrency(value, options);
}

/**
 * Helper function to format non-zero currency values
 */
function formatNonZeroCurrency(value: number, options: FormatOptions): string {
  const {
    locale = 'en-US',
    currency = 'USD',
    symbol = true,
    decimals = 2,
    compact = false,
  } = options;
  
  // Check if we need to apply a custom negative format
  const isNegative = value < 0;
  const absValue = Math.abs(value);
  
  // Format using Intl.NumberFormat
  const formatter = new Intl.NumberFormat(locale, {
    style: symbol ? 'currency' : 'decimal',
    currency: symbol ? currency : undefined,
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
    notation: compact ? 'compact' : 'standard',
    signDisplay: isNegative && !options.custom?.negative ? 'always' : 'auto',
  });
  
  const formatted = formatter.format(isNegative ? -absValue : absValue);
  
  // Apply custom negative formatting if specified
  if (isNegative && options.custom?.negative) {
    return options.custom.negative.replace('${value}', formatter.format(absValue));
  }
  
  return formatted;
}

/**
 * Format a number as a percentage
 * 
 * @param value The numeric value to format (0.01 = 1%)
 * @param options Formatting options
 * @returns Formatted percentage string
 */
export function formatPercentage(value: number | null | undefined, options: FormatOptions = {}): string {
  // Handle null/undefined
  if (value === null || value === undefined) {
    return options.custom?.empty || '-';
  }
  
  // Handle zero values
  if (value === 0) {
    return options.custom?.zero !== undefined ? options.custom.zero : formatNonZeroPercentage(0, options);
  }
  
  // Handle regular values
  return formatNonZeroPercentage(value, options);
}

/**
 * Helper function to format non-zero percentage values
 */
function formatNonZeroPercentage(value: number, options: FormatOptions): string {
  const {
    locale = 'en-US',
    decimals = 2,
    compact = false,
  } = options;
  
  // Check if we need to apply a custom negative format
  const isNegative = value < 0;
  const absValue = Math.abs(value);
  
  // Convert decimal to percentage (if value is already a percentage, set options.asIs = true)
  const percentValue = options.custom?.hasOwnProperty('asIs') ? absValue : absValue * 100;
  
  // Format using Intl.NumberFormat
  const formatter = new Intl.NumberFormat(locale, {
    style: 'percent',
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
    notation: compact ? 'compact' : 'standard',
    signDisplay: isNegative && !options.custom?.negative ? 'always' : 'auto',
  });
  
  // Convert to percentage format (0.01 => 1%)
  const formatted = formatter.format(isNegative ? -percentValue / 100 : percentValue / 100);
  
  // Apply custom negative formatting if specified
  if (isNegative && options.custom?.negative) {
    const positiveFormatted = formatter.format(percentValue / 100);
    return options.custom.negative.replace('${value}', positiveFormatted);
  }
  
  return formatted;
}

/**
 * Format a number with thousands separators and decimal places
 * 
 * @param value The numeric value to format
 * @param options Formatting options
 * @returns Formatted number string
 */
export function formatNumber(value: number | null | undefined, options: FormatOptions = {}): string {
  // Handle null/undefined
  if (value === null || value === undefined) {
    return options.custom?.empty || '-';
  }
  
  // Handle zero values
  if (value === 0) {
    return options.custom?.zero !== undefined ? options.custom.zero : formatNonZeroNumber(0, options);
  }
  
  // Handle regular values
  return formatNonZeroNumber(value, options);
}

/**
 * Helper function to format non-zero numeric values
 */
function formatNonZeroNumber(value: number, options: FormatOptions): string {
  const {
    locale = 'en-US',
    decimals = 0,
    compact = false,
  } = options;
  
  // Check if we need to apply a custom negative format
  const isNegative = value < 0;
  const absValue = Math.abs(value);
  
  // Format using Intl.NumberFormat
  const formatter = new Intl.NumberFormat(locale, {
    style: 'decimal',
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
    notation: compact ? 'compact' : 'standard',
    signDisplay: isNegative && !options.custom?.negative ? 'always' : 'auto',
  });
  
  const formatted = formatter.format(isNegative ? -absValue : absValue);
  
  // Apply custom negative formatting if specified
  if (isNegative && options.custom?.negative) {
    return options.custom.negative.replace('${value}', formatter.format(absValue));
  }
  
  return formatted;
}

/**
 * Format a date with a professional, financial-appropriate format
 * 
 * @param date The date to format
 * @param options Formatting options
 * @returns Formatted date string
 */
export function formatDate(date: Date | string | number | null | undefined, options: {
  format?: 'short' | 'medium' | 'long' | 'full';
  locale?: string;
  custom?: string;
  empty?: string;
} = {}): string {
  // Handle null/undefined/invalid
  if (!date) {
    return options.empty || '-';
  }
  
  try {
    const dateObj = typeof date === 'object' ? date : new Date(date);
    
    // Check for invalid date
    if (isNaN(dateObj.getTime())) {
      return options.empty || '-';
    }
    
    // Custom format
    if (options.custom) {
      return formatDateCustom(dateObj, options.custom);
    }
    
    // Standard format
    const { format = 'short', locale = 'en-US' } = options;
    
    const formatter = new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: format === 'short' ? 'numeric' : format === 'medium' ? 'short' : 'long',
      day: 'numeric',
      ...(format === 'full' && { 
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZoneName: 'short'
      })
    });
    
    return formatter.format(dateObj);
  } catch (error) {
    return options.empty || '-';
  }
}

/**
 * Helper function to format dates with a custom format string
 * Supports: YYYY, MM, DD, HH, mm, ss
 */
function formatDateCustom(date: Date, format: string): string {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  
  // Replace tokens with actual values
  return format
    .replace('YYYY', year.toString())
    .replace('MM', month.toString().padStart(2, '0'))
    .replace('DD', day.toString().padStart(2, '0'))
    .replace('HH', hours.toString().padStart(2, '0'))
    .replace('mm', minutes.toString().padStart(2, '0'))
    .replace('ss', seconds.toString().padStart(2, '0'));
}

/**
 * Format a financial ratio (e.g., P/E ratio, dividend yield)
 */
export function formatRatio(value: number | null | undefined, options: FormatOptions = {}): string {
  // Handle null/undefined
  if (value === null || value === undefined) {
    return options.custom?.empty || '-';
  }
  
  // Use the number formatter with appropriate decimals
  return formatNumber(value, {
    ...options,
    decimals: options.decimals !== undefined ? options.decimals : 2
  });
}

/**
 * Format a delta/change value with appropriate sign
 */
export function formatDelta(value: number | null | undefined, options: {
  format?: 'percentage' | 'currency' | 'number';
  withSign?: boolean;
  withColor?: boolean;
  formatOptions?: FormatOptions;
} = {}): { formatted: string; color?: string } {
  // Handle null/undefined
  if (value === null || value === undefined) {
    return {
      formatted: options.formatOptions?.custom?.empty || '-'
    };
  }
  
  const { format = 'number', withSign = true, withColor = false } = options;
  const formatOptions = options.formatOptions || {};
  
  // Determine sign
  const prefix = withSign && value > 0 ? '+' : '';
  
  // Format the value based on format type
  let formatted: string;
  
  switch (format) {
    case 'percentage':
      formatted = formatPercentage(value, formatOptions);
      break;
    case 'currency':
      formatted = formatCurrency(value, formatOptions);
      break;
    case 'number':
    default:
      formatted = formatNumber(value, formatOptions);
      break;
  }
  
  // Apply sign if needed and not already present
  if (withSign && value > 0 && !formatted.startsWith('+')) {
    formatted = prefix + formatted;
  }
  
  // Return with color information if requested
  if (withColor) {
    // Get color based on value
    const color = value > 0 ? 'success.main' : value < 0 ? 'error.main' : undefined;
    return { formatted, color };
  }
  
  return { formatted };
} 