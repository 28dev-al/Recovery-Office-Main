import { PHI, PHI_INVERSE } from '../../../../constants/sacred-geometry';

/**
 * Data Formatting Utilities
 * 
 * These utilities help format and prepare data for display components,
 * following sacred geometry principles where applicable.
 */

/**
 * Truncates text to a specified length and adds an ellipsis
 * @param text - The text to truncate
 * @param length - The maximum length before truncation (default: calculated using PHI)
 */
export const truncateText = (text: string, length?: number): string => {
  // Default length based on PHI value (using the golden ratio)
  const defaultLength = Math.round(100 * PHI_INVERSE);
  const maxLength = length || defaultLength;
  
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};

/**
 * Creates a responsive grid layout based on Fibonacci sequence
 * @param itemCount - Number of items in the grid
 * @returns CSS grid template columns string
 */
export const createFibonacciGrid = (itemCount: number): string => {
  const fibonacciSequence = [1, 1, 2, 3, 5, 8, 13, 21];
  
  // Find the appropriate column count based on item count and fibonacci numbers
  let columns = 1;
  for (let i = 0; i < fibonacciSequence.length; i++) {
    if (itemCount <= fibonacciSequence[i]) {
      columns = Math.max(1, i);
      break;
    }
    if (i === fibonacciSequence.length - 1) {
      columns = i + 1;
    }
  }
  
  return `repeat(${columns}, 1fr)`;
};

/**
 * Calculates optimal image dimensions based on golden ratio
 * @param width - The base width to calculate from
 * @returns Object with width and height calculated using golden ratio
 */
export const goldenRatioImageDimensions = (width: number): { width: number, height: number } => {
  return {
    width,
    height: Math.round(width * PHI_INVERSE) // Use PHI_INVERSE for pleasing height proportion
  };
};

/**
 * Formats a number with thousands separators
 * @param value - The number to format
 * @param locale - The locale to use for formatting (default: 'en-US')
 */
export const formatNumber = (value: number, locale = 'en-US'): string => {
  return new Intl.NumberFormat(locale).format(value);
};

/**
 * Formats currency values
 * @param value - The number to format as currency
 * @param currency - Currency code (default: 'USD')
 * @param locale - The locale to use for formatting (default: 'en-US')
 */
export const formatCurrency = (
  value: number, 
  currency = 'USD', 
  locale = 'en-US'
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(value);
};

/**
 * Formats dates according to sacred geometrical time principles
 * @param date - The date to format
 * @param format - Format type ('short', 'medium', 'long', 'full')
 * @param locale - The locale to use for formatting (default: 'en-US')
 */
export const formatDate = (
  date: Date, 
  format: 'short' | 'medium' | 'long' | 'full' = 'medium',
  locale = 'en-US'
): string => {
  return new Intl.DateTimeFormat(locale, { dateStyle: format }).format(date);
};

/**
 * Creates a color intensity based on value magnitude using PHI
 * @param value - The value to base the color intensity on (0-100)
 * @param baseColor - The base HSL color (default: 210 for blue)
 * @returns HSL color string with lightness adjusted by golden ratio
 */
export const getColorIntensity = (value: number, baseColor = 210): string => {
  // Normalize value to 0-100 range
  const normalizedValue = Math.max(0, Math.min(100, value));
  
  // Calculate lightness using PHI-based curve
  // Higher values have lower lightness (deeper color)
  const lightness = 95 - (normalizedValue * PHI_INVERSE * 0.8);
  
  return `hsl(${baseColor}, 70%, ${lightness}%)`;
};

/**
 * Groups array items in chunks based on Fibonacci numbers
 * @param items - Array of items to group
 * @returns Array of arrays grouped according to Fibonacci sequence
 */
export const groupInFibonacciChunks = <T>(items: T[]): T[][] => {
  const fibSizes = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55];
  const result: T[][] = [];
  
  let startIndex = 0;
  let currentFibIndex = 2; // Start with 2 as a reasonable chunk size
  
  while (startIndex < items.length) {
    const chunkSize = fibSizes[Math.min(currentFibIndex, fibSizes.length - 1)];
    result.push(items.slice(startIndex, startIndex + chunkSize));
    startIndex += chunkSize;
    currentFibIndex++;
  }
  
  return result;
};

/**
 * Calculates the ideal line height based on font size using the golden ratio
 * @param fontSize - The font size in pixels
 * @returns Ideal line height based on sacred geometry
 */
export const calculateIdealLineHeight = (fontSize: number): number => {
  return Math.round(fontSize * PHI * 100) / 100;
}; 






