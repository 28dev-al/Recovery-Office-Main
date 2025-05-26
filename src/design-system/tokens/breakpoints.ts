/**
 * Breakpoints Tokens
 * 
 * This file defines the responsive breakpoints for the Recovery Office design system,
 * based on the Fibonacci sequence to create natural, harmonious responsive layouts.
 * 
 * Breakpoints are strategically placed at values derived from the Fibonacci sequence,
 * creating a natural progression of screen sizes.
 */

import { SACRED_GRID } from "../../constants/sacred-geometry";
import { getFibonacciByIndex } from '../../utils/sacredGeometry';

/**
 * Breakpoint values in pixels
 * Based on Fibonacci values for natural scaling
 */
export const breakpointValues = {
  xs: getFibonacciByIndex(10),        // 55px - Mobile small (theoretical, not practical as a min-width)
  sm: getFibonacciByIndex(13),        // 233px - Mobile
  md: getFibonacciByIndex(14),        // 377px - Mobile large
  lg: getFibonacciByIndex(15),        // 610px - Tablet
  xl: getFibonacciByIndex(16),        // 987px - Desktop
  xxl: SACRED_GRID.containers.xl, // 1440px - Large desktop
};

/**
 * Breakpoint keys
 */
export type BreakpointKey = keyof typeof breakpointValues;

/**
 * Media query strings for use in styled-components
 */
export const breakpoints = {
  /**
   * Raw breakpoint values
   */
  values: breakpointValues,
  
  /**
   * Media query for screen width above the given breakpoint (inclusive)
   */
  up: (key: BreakpointKey): string => {
    return `@media (min-width: ${breakpointValues[key] ?? 1}px)`;
  },
  
  /**
   * Media query for screen width below the given breakpoint (exclusive)
   */
  down: (key: BreakpointKey): string => {
    return `@media (max-width: ${breakpointValues[key] ?? 1 - 0.1}px)`;
  },
  
  /**
   * Media query for screen width between the given breakpoints (inclusive)
   */
  between: (start: BreakpointKey, end: BreakpointKey): string => {
    return `@media (min-width: ${breakpointValues[start] ?? 1}px) and (max-width: ${breakpointValues[end] ?? 1 - 0.1}px)`;
  },
  
  /**
   * Media query for screen width exactly at the given breakpoint
   */
  only: (key: BreakpointKey): string => {
    const keys = Object.keys(breakpointValues) as BreakpointKey[];
    const keyIndex = keys.indexOf(key);
    
    if (keyIndex === keys.length - 1) {
      return breakpoints.up(key);
    }
    
    const nextKey = keys[keyIndex + 1];
    return breakpoints.between(key, nextKey);
  },
  
  /**
   * Custom media query with raw pixel value
   */
  custom: (minWidth: number): string => {
    return `@media (min-width: ${minWidth}px)`;
  },
  
  /**
   * Media query for print
   */
  print: '@media print',
  
  /**
   * Media query for devices that support hover
   */
  hover: '@media (hover: hover)',
  
  /**
   * Media query for devices that prefer reduced motion
   */
  reducedMotion: '@media (prefers-reduced-motion: reduce)',
  
  /**
   * Media query for devices that prefer dark color scheme
   */
  prefersDark: '@media (prefers-color-scheme: dark)',
  
  /**
   * Media query for devices that prefer light color scheme
   */
  prefersLight: '@media (prefers-color-scheme: light)',
};

export default breakpoints; 








