/**
 * Professional Animation Constants
 * 
 * This file contains professional animation timing and easing functions
 * for financial service components, providing consistent motion patterns
 * throughout the application.
 */

// Standard animation durations (in seconds)
export const ANIMATION_DURATION = {
  instant: 0,
  fast: 0.2,
  standard: 0.3,
  medium: 0.4,
  slow: 0.5
};

// Professional easing functions as cubic-bezier arrays
export const PROFESSIONAL_EASINGS = {
  // Standard ease for most UI interactions
  standard: [0.4, 0.0, 0.2, 1.0],
  
  // Ease-in for elements entering the screen
  easeIn: [0.4, 0.0, 1.0, 1.0],
  
  // Ease-out for elements exiting the screen
  easeOut: [0.0, 0.0, 0.2, 1.0],
  
  // Sharp ease-out for responsive feedback
  sharp: [0.4, 0.0, 0.6, 1.0],
  
  // Gentle ease for subtle animations
  gentle: [0.25, 0.1, 0.25, 1.0]
};

// Common timing patterns for financial components
export const TIMING_PATTERNS = {
  // Base durations in milliseconds
  stagger: {
    fast: 50,
    standard: 80,
    slow: 120
  },
  
  // More detailed timing controls
  accordion: {
    expand: 300,
    collapse: 250
  },
  
  tabs: {
    transition: 300,
    fade: 200
  },
  
  alerts: {
    enter: 300,
    exit: 250
  },
  
  tooltips: {
    enter: 200,
    exit: 150
  }
};

// Convert animation values to CSS strings
export const toCubicBezier = (points: number[]): string => {
  return `cubic-bezier(${points.join(', ')})`;
};

// Animation utilities for component use
export const createTransition = (
  properties: string[] = ['all'],
  duration: number = ANIMATION_DURATION.standard,
  easing: number[] = PROFESSIONAL_EASINGS.standard,
  delay: number = 0
): string => {
  return properties
    .map(property => `${property} ${duration}s ${toCubicBezier(easing)} ${delay}s`)
    .join(', ');
}; 