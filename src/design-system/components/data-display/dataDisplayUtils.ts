import { PHI, PHI_INVERSE, FIBONACCI } from '../../../constants/sacred-geometry';

/**
 * Data Display Utilities
 * 
 * Utility functions for data display components that follow sacred geometry principles.
 * These functions help with truncation, formatting, spacing, and layout calculations.
 */

/**
 * Truncate text with ellipsis while respecting word boundaries
 * 
 * @param text Text to truncate
 * @param maxLength Maximum length including ellipsis
 * @returns Truncated text
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (!text || text.length <= maxLength) return text;
  
  // Find the last space before the limit
  const truncatePoint = text.substring(0, maxLength - 3).lastIndexOf(' ');
  
  // If no space found, just cut at the max length
  if (truncatePoint === -1) {
    return text.substring(0, maxLength - 3) + '...';
  }
  
  // Otherwise cut at the last space and add ellipsis
  return text.substring(0, truncatePoint) + '...';
};

/**
 * Format a number according to sacred geometry grid
 * Uses Fibonacci sequence for decimal precision when appropriate
 * 
 * @param value Number to format
 * @param options Formatting options
 * @returns Formatted number string
 */
export const formatNumber = (
  value: number,
  options: {
    /** Decimal precision (defaults to nearest Fibonacci sequence) */
    precision?: number;
    /** Whether to use grouping separators */
    useGrouping?: boolean;
    /** Locale to use for formatting */
    locale?: string;
    /** Currency code for currency formatting */
    currency?: string;
    /** Whether to use compact notation */
    compact?: boolean;
  } = {}
): string => {
  const { 
    precision,
    useGrouping = true, 
    locale = 'en-US',
    currency,
    compact = false
  } = options;
  
  // Determine precision based on Fibonacci sequence if not specified
  const fibPrecision = precision ?? determineFibonacciPrecision(value);
  
  // Format options
  const formatOptions: Intl.NumberFormatOptions = {
    minimumFractionDigits: fibPrecision,
    maximumFractionDigits: fibPrecision,
    useGrouping,
  };
  
  // Add currency if specified
  if (currency) {
    formatOptions.style = 'currency';
    formatOptions.currency = currency;
  }
  
  // Add compact notation if specified
  if (compact) {
    formatOptions.notation = 'compact';
  }
  
  // Format the number
  return new Intl.NumberFormat(locale, formatOptions).format(value);
};

/**
 * Determine appropriate decimal precision based on Fibonacci sequence
 */
const determineFibonacciPrecision = (value: number): number => {
  // Use more precision for smaller numbers, less for larger numbers
  const absValue = Math.abs(value);
  
  if (absValue >= 10000) return 0; // No decimals for large numbers
  if (absValue >= 100) return 1;   // 1 decimal for medium numbers
  if (absValue >= 10) return 2;    // 2 decimals for smaller numbers
  if (absValue >= 1) return 3;     // 3 decimals (fib[4] ?? 1) for numbers >= 1
  if (absValue >= 0.1) return 5;   // 5 decimals (fib[5] ?? 1) for numbers >= 0.1
  if (absValue >= 0.01) return 8;  // 8 decimals (fib[6] ?? 1) for numbers >= 0.01
  return 13;                       // 13 decimals (fib[7] ?? 1) for very small numbers
};

/**
 * Format a date according to sacred geometry principles
 * 
 * @param date Date to format
 * @param options Formatting options
 * @returns Formatted date string
 */
export const formatDate = (
  date: Date | string | number,
  options: {
    /** Format style (short, medium, long, full) */
    dateStyle?: 'short' | 'medium' | 'long' | 'full';
    /** Format style for time (short, medium, long, full) */
    timeStyle?: 'short' | 'medium' | 'long' | 'full';
    /** Locale to use for formatting */
    locale?: string;
    /** Whether to include time */
    includeTime?: boolean;
  } = {}
): string => {
  const { 
    dateStyle = 'medium', 
    timeStyle = 'short',
    locale = 'en-US',
    includeTime = false
  } = options;
  
  const dateObj = date instanceof Date ? date : new Date(date);
  
  // Format options
  const formatOptions: Intl.DateTimeFormatOptions = {
    dateStyle,
  };
  
  // Add time if specified
  if (includeTime) {
    formatOptions.timeStyle = timeStyle;
  }
  
  // Format the date
  return new Intl.DateTimeFormat(locale, formatOptions).format(dateObj);
};

/**
 * Calculate columns for a responsive grid based on Fibonacci sequence
 * 
 * @param containerWidth Container width in pixels
 * @param minItemWidth Minimum width for each item
 * @returns Optimal number of columns based on Fibonacci sequence
 */
export const calculateGridColumns = (
  containerWidth: number,
  minItemWidth: number
): number => {
  // Calculate raw number of columns
  const rawColumns = Math.floor(containerWidth / minItemWidth);
  
  // Convert FIBONACCI to an array of values
  const fibArray = Object.values(FIBONACCI);
  
  // Find the closest Fibonacci number that's less than or equal to the raw columns
  const fibNumber = fibArray.reduce((prev: number, curr: number) => 
    curr <= rawColumns ? curr : prev, 1);
  
  // Ensure we have at least 1 column
  return Math.max(1, fibNumber);
};

/**
 * Calculate optimal item size based on golden ratio
 * 
 * @param containerWidth Container width in pixels
 * @param columns Number of columns
 * @param gapSize Gap size in pixels
 * @returns Item width and height based on golden ratio
 */
export const calculateGoldenItemSize = (
  containerWidth: number,
  columns: number,
  gapSize: number = 0
): { width: number; height: number } => {
  // Calculate available width accounting for gaps
  const totalGapWidth = gapSize * (columns - 1);
  const availableWidth = containerWidth - totalGapWidth;
  
  // Calculate item width
  const itemWidth = availableWidth / columns;
  
  // Calculate height based on golden ratio
  const itemHeight = itemWidth / PHI;
  
  return { width: itemWidth, height: itemHeight };
};

/**
 * Generate a golden ratio-based color palette from a base color
 * 
 * @param baseColor Base color in hex format
 * @param steps Number of steps to generate
 * @returns Array of colors following golden ratio harmony
 */
export const generateGoldenPalette = (
  baseColor: string,
  steps: number = 5
): string[] => {
  // Parse the base color
  const r = parseInt(baseColor.substring(1, 3), 16);
  const g = parseInt(baseColor.substring(3, 5), 16);
  const b = parseInt(baseColor.substring(5, 7), 16);
  
  // Generate palette
  const palette: string[] = [baseColor];
  
  // Generate lighter shades
  for (let i = 1; i <= steps; i++) {
    // Use PHI_INVERSE to calculate steps for lighter shades
    const factor = 1 - (PHI_INVERSE * (i / steps));
    
    const newR = Math.min(255, Math.round(r + (255 - r) * (1 - factor)));
    const newG = Math.min(255, Math.round(g + (255 - g) * (1 - factor)));
    const newB = Math.min(255, Math.round(b + (255 - b) * (1 - factor)));
    
    palette.push(`#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`);
  }
  
  // Generate darker shades
  for (let i = 1; i <= steps; i++) {
    // Use PHI_INVERSE to calculate steps for darker shades
    const factor = 1 - (PHI_INVERSE * (i / steps));
    
    const newR = Math.max(0, Math.round(r * factor));
    const newG = Math.max(0, Math.round(g * factor));
    const newB = Math.max(0, Math.round(b * factor));
    
    palette.unshift(`#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`);
  }
  
  return palette;
};

/**
 * Parse a string-based value with units into a number
 * 
 * @param value String value with units (e.g. '10px', '1.5rem')
 * @param defaultValue Default value if parsing fails
 * @returns Parsed number without units
 */
export const parseUnit = (
  value: string | number,
  defaultValue: number = 0
): number => {
  if (typeof value === 'number') return value;
  
  const match = value.match(/^([\d.]+)([a-z%]*)$/);
  
  if (match && match[1]) {
    return parseFloat(match[1]);
  }
  
  return defaultValue;
};

/**
 * Create a Fibonacci spacing function for consistent spacing in data displays
 * 
 * @param baseFibIndex Base Fibonacci index for sizing
 * @returns Function that returns spacing values
 */
export const createFibonacciSpacer = (baseFibIndex: number = 5) => {
  return (multiplier: number = 1): number => {
    // Convert FIBONACCI to an array of values for safe indexing
    const fibValues = Object.values(FIBONACCI);
    
    // Ensure the index is within bounds
    const index = Math.min(
      Math.max(0, baseFibIndex + Math.round(multiplier) - 1),
      fibValues.length - 1
    );
    
    // Get the value from the array
    return fibValues[index] || 1;
  };
};

/**
 * Format percentage according to sacred proportions
 * 
 * @param value Value as a decimal (0-1)
 * @param options Formatting options
 * @returns Formatted percentage string
 */
export const formatPercentage = (
  value: number,
  options: {
    /** Decimal precision */
    precision?: number;
    /** Whether to include % symbol */
    includeSymbol?: boolean;
    /** Locale to use for formatting */
    locale?: string;
  } = {}
): string => {
  const { 
    precision = 1,
    includeSymbol = true,
    locale = 'en-US'
  } = options;
  
  // Format options
  const formatOptions: Intl.NumberFormatOptions = {
    style: includeSymbol ? 'percent' : 'decimal',
    minimumFractionDigits: precision,
    maximumFractionDigits: precision
  };
  
  // Format the percentage
  return new Intl.NumberFormat(locale, formatOptions).format(value);
};

/**
 * Calculate the optimal font size based on container width following golden ratio
 * 
 * @param containerWidth Container width in pixels
 * @param baseFontSize Base font size in pixels
 * @returns Optimal font size in pixels
 */
export const calculateGoldenFontSize = (
  containerWidth: number,
  baseFontSize: number = 16
): number => {
  // Calculate ratio of container width to base font size
  const ratio = containerWidth / baseFontSize;
  
  // Find the golden ratio multiplier
  const multiplier = Math.max(1, Math.min(2, ratio * PHI_INVERSE * 0.1));
  
  // Calculate font size
  return baseFontSize * multiplier;
};

/**
 * Extract initials from a full name following sacred geometry patterns
 * 
 * @param fullName Full name to extract initials from
 * @param maxInitials Maximum number of initials to extract
 * @returns Extracted initials
 */
export const extractInitials = (
  fullName: string,
  maxInitials: number = 2
): string => {
  if (!fullName) return '';
  
  // Split the name by spaces and other separators
  const parts = fullName.split(/[\s-_]+/).filter(Boolean);
  
  // Convert FIBONACCI to an array of values
  const fibArray = Object.values(FIBONACCI);
  
  // Use Fibonacci sequence to determine which parts to use for initials
  // For names with 1-3 parts, use first and last
  // For names with 4+ parts, use parts at Fibonacci indices
  let initialsArray: string[] = [];
  
  if (parts.length <= 3) {
    // Use first and last parts for shorter names
    initialsArray = [parts[0], parts[parts.length - 1]];
  } else {
    // For longer names, use Fibonacci-based selection
    const fibIndices = fibArray.slice(0, 5).filter(i => i < parts.length);
    initialsArray = fibIndices.map(i => parts[i]);
  }
  
  // Extract first letter from each selected part
  const initials = initialsArray
    .map(part => part.charAt(0).toUpperCase())
    .join('')
    .substring(0, maxInitials);
  
  return initials;
};

/**
 * Format file size using Fibonacci thresholds
 * 
 * @param bytes File size in bytes
 * @param options Formatting options
 * @returns Formatted file size string
 */
export const formatFileSize = (
  bytes: number,
  options: {
    /** Decimal precision */
    precision?: number;
    /** Locale to use for formatting */
    locale?: string;
  } = {}
): string => {
  const { 
    precision = 1,
    locale = 'en-US'
  } = options;
  
  if (bytes === 0) return '0 Bytes';
  
  // Use PHI-based thresholds instead of standard 1024
  const phi2 = Math.pow(PHI, 2); // ~2.618
  const multiplier = Math.pow(phi2, 5); // ~132.5, closer to standard 1000
  
  // Units follow Fibonacci progression (8, 13, 21...)
  const units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  
  // Calculate the appropriate unit
  const i = Math.floor(Math.log(bytes) / Math.log(multiplier));
  const size = bytes / Math.pow(multiplier, i);
  
  // Format the size
  return `${new Intl.NumberFormat(locale, {
    minimumFractionDigits: precision,
    maximumFractionDigits: precision
  }).format(size)} ${units[i] ?? 1}`;
}; 






