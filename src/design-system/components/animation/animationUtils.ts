// TODO: This file contains direct window access without SSR checks
import { getFibonacciByIndex } from '../../../utils/getFibonacciByIndex';
import { cubicBezier } from 'framer-motion';

import { PHI, PHI_INVERSE, FIBONACCI } from '../../../constants/sacred-geometry';


/**
 * Sacred Animation Utilities
 * 
 * This module provides animation utilities based on sacred geometry principles.
 * The easing functions, timing, and sequences follow golden ratio and Fibonacci patterns
 * to create naturally pleasing motion.
 */

// ===== Sacred Easing Functions =====

/**
 * Sacred easing functions based on the golden ratio.
 */
export const sacredEasing = {
  /**
   * Standard sacred easing - balanced golden ratio curve
   * Uses the golden ratio for the x1 and x2 cubic bezier points
   */
  standard: cubicBezier(PHI_INVERSE, 0, 1 - PHI_INVERSE, 1),
  
  /**
   * Quick ease-in then slow ease-out
   * Particularly good for entrance animations
   */
  entrance: cubicBezier(PHI_INVERSE / 2, 0, PHI_INVERSE, 1),
  
  /**
   * Slow ease-in then quick ease-out
   * Good for exit animations and actions
   */
  exit: cubicBezier(1 - PHI_INVERSE, 0, 1, 1),
  
  /**
   * Golden ease-in - smooth acceleration
   */
  easeIn: cubicBezier(PHI_INVERSE, 0, 1, 1),
  
  /**
   * Golden ease-out - smooth deceleration
   */
  easeOut: cubicBezier(0, 0, PHI_INVERSE, 1),
  
  /**
   * Precisely balanced golden ease-in-out
   */
  easeInOut: cubicBezier(PHI_INVERSE, 0, 1 - PHI_INVERSE, 1),
  
  /**
   * Natural bounce effect using golden ratio
   */
  bounce: cubicBezier(PHI_INVERSE, -0.3 * PHI_INVERSE, 0.7, 1.3),
  
  /**
   * Sacred anticipation - slight pullback before main animation
   */
  anticipate: cubicBezier(0.8, -0.3 * PHI, 0.2, 1.2),
};

// ===== Sacred Timing Functions =====

/**
 * Utility to get the nth Fibonacci value from the FIBONACCI object.
 * Ensures safe, ordered access by index (0-based).
 */
const getFibonacciValueByIndex = (index: number): number => {
  const keys = Object.keys(FIBONACCI)
    .map(Number)
    .sort((a, b) => a - b);
  const safeIndex = Math.max(0, Math.min(index, keys.length - 1));
  const key = keys[safeIndex] ?? 1;
  return FIBONACCI[key as keyof typeof FIBONACCI];
};

/**
 * Returns a duration in seconds based on the Fibonacci sequence.
 * @param index The index in the Fibonacci sequence (0-indexed)
 * @returns Duration in seconds
 */
export const fibonacciDuration = (index: number): number => {
  // Use the utility to get the Fibonacci value by index
  return getFibonacciValueByIndex(index) / 100;
};

/**
 * Returns golden ratio based durations for common animation types.
 */
export const sacredDurations = {
  /**
   * Very quick animations (UI feedback)
   */
  ultraFast: PHI_INVERSE / 10, // 0.062s
  
  /**
   * Fast animations (small transitions)
   */
  fast: PHI_INVERSE / 5, // 0.124s
  
  /**
   * Standard animations (most UI interactions)
   */
  standard: PHI_INVERSE / 2, // 0.309s
  
  /**
   * Slow animations (entrances, emphasis)
   */
  slow: PHI_INVERSE, // 0.618s
  
  /**
   * Very slow animations (dramatic effects)
   */
  verySlow: PHI_INVERSE * PHI, // 1.0s
};

// ===== Staggered Animation Helpers =====

/**
 * Calculate delay for staggered children based on Fibonacci sequence.
 * 
 * @param index The index of the child element (0-indexed)
 * @param baseDelay The base delay before starting the sequence
 * @param staggerFactor Multiplier for the stagger effect (defaults to 0.05)
 * @returns Delay in seconds
 */
export const fibonacciStaggerDelay = (
  index: number,
  baseDelay: number = 0,
  staggerFactor: number = 0.05
): number => {
  // Use the utility to get the Fibonacci value by index
  return baseDelay + (getFibonacciValueByIndex(index) * staggerFactor);
};

/**
 * Calculate delay for staggered children based on Golden Ratio.
 * 
 * @param index The index of the child element (0-indexed)
 * @param baseDelay The base delay before starting the sequence
 * @param staggerFactor Multiplier for the stagger effect (defaults to 0.05)
 * @returns Delay in seconds
 */
export const goldenRatioStaggerDelay = (
  index: number,
  baseDelay: number = 0,
  staggerFactor: number = 0.05
): number => {
  // Use powers of the golden ratio for a natural feel
  const goldenPower = Math.min(index, 7); // Cap at PHI^7 to avoid extreme values
  const delayMultiplier = Math.pow(PHI, goldenPower) - 1;
  
  return baseDelay + (delayMultiplier * staggerFactor);
};

/**
 * Create a natural stagger effect where middle items have the most delay.
 * This follows the golden ratio curve for a more natural distribution.
 * 
 * @param index The index of the child element (0-indexed)
 * @param totalItems Total number of items in the sequence
 * @param maxDelay Maximum delay to apply to the middle item
 * @param baseDelay Base delay before starting the sequence
 * @returns Delay in seconds
 */
export const naturalArcStagger = (
  index: number,
  totalItems: number,
  maxDelay: number = 0.3,
  baseDelay: number = 0
): number => {
  // Calculate relative position in the sequence (0 to 1)
  const position = index / (totalItems - 1);
  
  // Use golden ratio inspired bell curve: 4^(-PHI * (x-0.5)^2)
  // This creates a bell curve with peak at 0.5 (middle items)
  const bellCurve = Math.pow(4, -PHI * Math.pow(position - 0.5, 2));
  
  return baseDelay + (maxDelay * bellCurve);
};

// ===== Animation Performance Monitoring =====

/**
 * Options for performance monitoring.
 */
interface PerformanceMonitorOptions {
  /**
   * The name of the animation for logging
   */
  name: string;
  
  /**
   * Logging threshold in ms - logs performance only if 
   * it exceeds this threshold
   */
  threshold?: number;
  
  /**
   * Whether to log all timing information
   */
  verbose?: boolean;
}

/**
 * Monitor animation performance with sacred thresholds.
 * 
 * @param callback Animation function to monitor
 * @param options Performance monitoring options
 * @returns The result of the callback
 */
export const monitorAnimationPerformance = <T>(
  callback: () => T,
  options: PerformanceMonitorOptions
): T => {
  // Only enable monitoring in development
  if (process.env.NODE_ENV !== 'development') {
    return callback();
  }
  
  const { 
    name, 
    threshold = getFibonacciByIndex(7), // 13ms (close to 16ms frame budget)
    verbose = false 
  } = options;
  
  // Start performance measurement
  const start = performance.now();
  
  // Execute the animation function
  const result = callback();
  
  // End performance measurement
  const end = performance.now();
  const duration = end - start;
  
  // Only log if verbose or above threshold
  if (verbose || duration > threshold) {
    console.log(
      `%cAnimation Performance: ${name}`,
      'font-weight: bold; color: #0A4021',
      `\nDuration: ${duration.toFixed(2)}ms`,
      duration > threshold 
        ? `\nExceeds sacred threshold of ${threshold}ms!` 
        : '\nWithin sacred threshold ✓',
      `\nSpending ${(duration / (1000 / 60)).toFixed(2)}ms of 16.67ms frame budget`
    );
  }
  
  return result;
};

/**
 * Check if reduced motion is preferred. 
 * This respects the user's system preferences.
 * 
 * @returns Whether reduced motion is preferred
 */
export const prefersReducedMotion = (): boolean => {
  // Check if window is defined (for SSR compatibility)
  if (typeof window === 'undefined') return false;
  
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Gets animation configuration based on reduced motion preference.
 * If reduced motion is preferred, returns simplified animations.
 * 
 * @param fullAnimationConfig The full animation configuration
 * @param reducedAnimationConfig The reduced animation configuration
 * @returns The appropriate animation configuration
 */
export const getAccessibleAnimationConfig = <T>(
  fullAnimationConfig: T,
  reducedAnimationConfig: T
): T => {
  return prefersReducedMotion() ? reducedAnimationConfig : fullAnimationConfig;
}; 










