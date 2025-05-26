/**
 * Sacred Geometry Utility Functions
 * 
 * This file provides utility functions for implementing sacred geometry principles
 * throughout the Recovery Office application. These functions help ensure consistent
 * application of the Golden Ratio and Fibonacci sequence.
 */

import { 
  PHI, 
  PHI_INVERSE, 
  FIBONACCI, 
  SACRED_SPACING,
  SACRED_TYPOGRAPHY
} from '../constants/sacred-geometry';

/**
 * Type for the FIBONACCI object from sacred-geometry.ts
 */
type FibonacciObj = typeof FIBONACCI;

/**
 * Helper function to get Fibonacci keys as numbers
 */
export const getFibonacciKeys = (): number[] => {
  return Object.keys(FIBONACCI).map(Number).sort((a, b) => a - b);
};

/**
 * Helper function to get Fibonacci values as an array
 */
export const getFibonacciValues = (): number[] => {
  const keys = getFibonacciKeys();
  return keys.map(key => FIBONACCI[key as keyof FibonacciObj]);
};

/**
 * Helper function to safely get a Fibonacci value with a fallback
 */
const safeGetFib = (index: number, fallback: number): number => {
  const fibValues = getFibonacciValues();
  if (index < 0 || index >= fibValues.length) {
    return fallback;
  }
  return fibValues[index] || fallback;
};

/**
 * Gets a Fibonacci number by index
 * 
 * @param index - Index in the Fibonacci sequence
 * @returns The Fibonacci number
 */
export const getFibonacci = (index: number): number => {
  const fibonacciKeys = getFibonacciKeys();
  
  // Handle edge cases
  if (index <= 0) return safeGetFib(0, 1);
  if (index >= fibonacciKeys.length) return safeGetFib(fibonacciKeys.length - 1, 1);
  
  return safeGetFib(index, 1);
};

/**
 * Gets a Fibonacci value by its sequence index
 * Independent implementation to avoid circular dependencies
 * 
 * @param index The index in the Fibonacci sequence
 * @returns The Fibonacci number at that index
 */
export const getFibonacciByIndex = (index: number): number => {
  // Convert index to the corresponding key in the FIBONACCI object
  // The FIBONACCI object uses the actual Fibonacci numbers as keys
  const fibKeys = getFibonacciKeys();
  // Ensure the index is valid
  const safeIndex = Math.max(0, Math.min(index, fibKeys.length - 1));
  // Return the Fibonacci value
  const key = fibKeys[safeIndex];
  return key ? FIBONACCI[key as keyof FibonacciObj] : 1;
};

/**
 * Calculates a Golden Ratio segment of a given value
 * 
 * @param value - The total value to divide according to the Golden Ratio
 * @param isMajor - Whether to return the major (61.8%) or minor (38.2%) segment
 * @returns The calculated segment value
 */
export const goldenRatioSegment = (value: number, isMajor = true): number => {
  return isMajor ? value * PHI_INVERSE : value * (1 - PHI_INVERSE);
};

/**
 * Scales a base value by the Golden Ratio a specified number of times
 * 
 * @param value - The base value to scale
 * @param steps - Number of times to multiply by the Golden Ratio (can be negative for division)
 * @returns The scaled value
 */
export const goldenRatioScale = (value: number, steps = 1): number => {
  return value * Math.pow(PHI, steps);
};

/**
 * Finds the closest Fibonacci number to a given value
 * 
 * @param value - The value to find the closest Fibonacci number for
 * @returns The closest Fibonacci number
 */
export const closestFibonacci = (value: number): number => {
  // Handle edge cases
  if (value <= 0) return getFibonacciByIndex(1);
  
  const fibValues = getFibonacciValues();
  const maxValue = fibValues[fibValues.length - 1];
  
  // Safety check to ensure maxValue is defined
  if (maxValue !== undefined && value >= maxValue) return maxValue;
  
  // Find the closest Fibonacci number
  let closest: number = fibValues[0] || 1;
  
  let closestDiff = Math.abs(value - closest);
  
  for (let i = 1; i < fibValues.length; i++) {
    const fibValue = fibValues[i] || 1;
    
    const diff = Math.abs(value - fibValue);
    if (diff < closestDiff) {
      closest = fibValue;
      closestDiff = diff;
    }
  }
  
  // Final safety check
  return closest || getFibonacciByIndex(1);
};

/**
 * Converts a pixel value to rem using the sacred typography base
 * 
 * @param px - The pixel value to convert
 * @returns The equivalent rem value as a string with 'rem' unit
 */
export const pxToRem = (px: number): string => {
  return `${px / SACRED_TYPOGRAPHY.baseFontSize}rem`;
};

/**
 * Creates spacing values based on Fibonacci sequence multiples
 * 
 * @param value - The base value (can be a number or a key of SACRED_SPACING)
 * @param multiplier - Number to multiply the spacing by
 * @returns The calculated spacing value in pixels
 */
export const createSpacing = (
  value: number | keyof typeof SACRED_SPACING, 
  multiplier = 1
): number => {
  let baseValue: number;
  
  if (typeof value === 'number') {
    baseValue = value;
  } else {
    // Get the value safely from SACRED_SPACING
    const spacingValue = SACRED_SPACING[value] || 0;
    
    // If the value is an object (like buttonPadding), use default md value
    if (typeof spacingValue === 'object' && spacingValue !== null) {
      // Need to handle spacingValue as Record<string, unknown> since we don't know its exact structure
      const spacingObj = spacingValue as Record<string, unknown>;
      baseValue = typeof spacingObj.md === 'number' ? spacingObj.md : 13; // Default to the md value (13) if not found
    } else {
      baseValue = spacingValue as number;
    }
  }
    
  return baseValue * multiplier;
};

/**
 * Calculates a position along a Golden Spiral
 * 
 * @param angle - The angle in radians
 * @param growthFactor - Growth factor for the spiral (default: Golden Ratio)
 * @returns Coordinates {x, y} along the spiral
 */
export const goldenSpiralPosition = (
  angle: number, 
  growthFactor = PHI
): { x: number; y: number } => {
  const radius = Math.pow(growthFactor, angle / (2 * Math.PI));
  return {
    x: radius * Math.cos(angle),
    y: radius * Math.sin(angle),
  };
};

/**
 * Generates an array of positions along a Golden Spiral
 * 
 * @param count - Number of points to generate
 * @param maxAngle - Maximum angle in radians (default: 4π, two full rotations)
 * @returns Array of {x, y} coordinates along the spiral
 */
export const generateGoldenSpiralPoints = (
  count: number, 
  maxAngle = 4 * Math.PI
): Array<{ x: number; y: number }> => {
  // Ensure we have at least 2 points to avoid division by zero
  const safeCount = Math.max(2, count);
  const points = [];
  
  for (let i = 0; i < safeCount; i++) {
    const angle = (i / (safeCount - 1)) * maxAngle;
    points.push(goldenSpiralPosition(angle));
  }
  
  return points;
};

/**
 * Creates a cubic bezier curve based on sacred geometry
 * 
 * @param type - The type of easing to create
 * @returns CSS cubic-bezier function string
 */
export const createSacredBezier = (
  type: 'standard' | 'easeIn' | 'easeOut' | 'botanical'
): string => {
  const beziers = {
    standard: [PHI_INVERSE, 0, 1 - PHI_INVERSE, 1],
    easeIn: [PHI_INVERSE, 0, 1, 1],
    easeOut: [0, 0, 1 - PHI_INVERSE, 1],
    botanical: [0.175, 0.885, 0.32, 1.275]
  };
  
  const bezierPoints = beziers[type] || beziers.standard;
  const [x1, y1, x2, y2] = bezierPoints;
  
  return `cubic-bezier(${x1}, ${y1}, ${x2}, ${y2})`;
};

/**
 * Calculates values to achieve the Golden Rectangle
 * 
 * @param width - The width of the rectangle
 * @returns The height needed to create a Golden Rectangle
 */
export const goldenRectangleHeight = (width: number): number => {
  return width / PHI;
};

/**
 * Calculates whether a position falls at a "sacred point" within a container
 * Used for determining optimal placement of key elements
 * 
 * @param x - X position (0-1 representing percentage across width)
 * @param y - Y position (0-1 representing percentage across height)
 * @param tolerance - Acceptable deviation from exact golden ratio points
 * @returns Whether the position is at a sacred point
 */
export const isSacredPoint = (
  x: number, 
  y: number, 
  tolerance = 0.05
): boolean => {
  // Check if point is at a golden ratio position on either axis
  const sacredXPoints = [PHI_INVERSE, 1 - PHI_INVERSE, 0.5];
  const sacredYPoints = [PHI_INVERSE, 1 - PHI_INVERSE, 0.5];
  
  const isXSacred = sacredXPoints.some(point => Math.abs(x - point) <= tolerance);
  const isYSacred = sacredYPoints.some(point => Math.abs(y - point) <= tolerance);
  
  return isXSacred && isYSacred;
};

/**
 * Calculate Fibonacci grid columns based on total columns available
 * 
 * This creates a layout grid where column sizes follow the Fibonacci sequence.
 * 
 * @param totalColumns - Total number of grid columns available
 * @returns Object of column spans with keys corresponding to index position
 */
export const fibonacciGridColumns = (totalColumns: number): Record<string, number> => {
  const result: Record<string, number> = {};
  const fibValues = getFibonacciValues();
  
  // Calculate sum of Fibonacci values we'll use to normalize
  let fibSum = 0;
  for (let i = 0; i < fibValues.length; i++) {
    const fibValue = fibValues[i] || 1; 
    fibSum += fibValue;
  }
  
  // Normalize Fibonacci values to fit the total columns
  // and round to nearest integer
  for (let i = 0; i < fibValues.length; i++) {
    const key = `col${i + 1}`;
    const value = fibValues[i] || 1;
    result[key] = Math.max(1, Math.round((value / fibSum) * totalColumns));
  }
  
  return result;
};

/**
 * Get an array of Fibonacci numbers within a range
 * 
 * @param start - Starting index (inclusive)
 * @param end - Ending index (inclusive)
 * @returns Array of Fibonacci numbers
 */
export const getFibonacciRange = (start: number, end: number): number[] => {
  const result: number[] = [];
  for (let i = start; i <= end; i++) {
    result.push(getFibonacci(i));
  }
  return result;
};

/**
 * Get a subset of the Fibonacci sequence as an array
 * 
 * This is a replacement for the non-existent FIBONACCI.slice() method
 * 
 * @param start - Starting index (inclusive)
 * @param end - Ending index (exclusive)
 * @returns Array of Fibonacci numbers
 */
export const fibonacciSlice = (start: number, end: number): number[] => {
  return getFibonacciRange(start, end - 1);
};

/**
 * Calculate the Golden Ratio of a value
 * 
 * @param value - The value to calculate the golden ratio of
 * @returns The golden ratio of the value
 */
export const goldenRatio = (value: number): number => {
  return value * PHI;
};

/**
 * Calculate the inverse Golden Ratio of a value
 * 
 * @param value - The value to calculate the inverse golden ratio of
 * @returns The inverse golden ratio of the value
 */
export const inverseGoldenRatio = (value: number): number => {
  return value * PHI_INVERSE;
};

/**
 * Calculate a value using the golden section
 * 
 * @param total - Total value to divide according to golden ratio
 * @param useMajor - Whether to return the major (61.8%) or minor (38.2%) section
 * @returns The calculated section value
 */
export const goldenSection = (total: number, useMajor = true): number => {
  return useMajor ? total * PHI_INVERSE : total * (1 - PHI_INVERSE);
};

/**
 * Calculate spacing using the Fibonacci sequence
 * 
 * @param level - Spacing level (1-5, where higher means more space)
 * @returns Spacing value in pixels
 */
export const fibonacciSpacing = (level: number): number => {
  // Map level to appropriate Fibonacci index
  const index = Math.min(Math.max(1, level + 2), 10);
  return getFibonacci(index);
};

/**
 * Get a sacred spacing value by key or with a default fallback
 * 
 * @param key - The spacing key to retrieve
 * @param defaultValue - Default value if key doesn't exist
 * @returns The sacred spacing value
 */
export const getSacredSpacing = (
  key: keyof typeof SACRED_SPACING | string, 
  defaultValue?: number
): number => {
  // Type guard to check if key exists in SACRED_SPACING
  const isValidKey = (k: string): k is string & keyof typeof SACRED_SPACING => 
    Object.prototype.hasOwnProperty.call(SACRED_SPACING, k);
    
  if (isValidKey(key)) {
    const spacingValue = SACRED_SPACING[key] || 0;
    
    // If the value is an object (like buttonPadding), use default md value
    if (typeof spacingValue === 'object' && spacingValue !== null) {
      // Need to handle spacingValue as Record<string, unknown> since we don't know its exact structure
      const spacingObj = spacingValue as Record<string, unknown>; 
      return typeof spacingObj.md === 'number' ? spacingObj.md : 13; // Default to the md value (13) if not found
    } 
    
    // Otherwise return the number value
    return spacingValue as number;
  }
  
  return defaultValue !== undefined ? defaultValue : SACRED_SPACING.md;
};

/**
 * Applies golden ratio to value, increasing it by phi
 * @param value The base value to scale
 * @returns Value multiplied by phi
 */
export const goldenScale = (value: number): number => value * PHI;

/**
 * Applies inverse golden ratio to value, decreasing it by phi inverse
 * @param value The base value to scale
 * @returns Value multiplied by phi inverse
 */
export const goldenInverseScale = (value: number): number => value * PHI_INVERSE;

/**
 * Converts px values to rem
 * @param px Pixel value
 * @returns Equivalent rem value as string with 'rem' suffix
 */
export const toRem = (px: number): string => `${px / 16}rem`;

/**
 * Converts a Fibonacci index to rem
 * @param index Fibonacci sequence index
 * @returns Equivalent rem value as string with 'rem' suffix
 */
export const fibonacciToRem = (index: number): string => {
  const fibValue = getFibonacciByIndex(index);
  return toRem(fibValue);
};

export {
  PHI,
  PHI_INVERSE,
  FIBONACCI
}; 





