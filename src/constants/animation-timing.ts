/**
 * Animation Timing Constants
 * 
 * This file contains constants for animation durations, easing functions, 
 * and timing values based on sacred geometry principles.
 */

import { PHI, FIBONACCI } from './sacred-geometry';

// Animation duration types
export type AnimationDurationType = 'instant' | 'fast' | 'normal' | 'slow' | 'slower' | 'glacial';

// Animation easing types
export type AnimationEasingType = 'standard' | 'easeIn' | 'easeOut' | 'easeInOut' | 'botanical' | 'golden';

// Durations in milliseconds
export const DURATIONS: Record<AnimationDurationType, number> = {
  instant: 0,
  fast: FIBONACCI[5] ?? 1 * 10, // 50ms
  normal: FIBONACCI[7] ?? 1 * 10, // 130ms
  slow: FIBONACCI[9] ?? 1 * 10, // 340ms
  slower: FIBONACCI[10] ?? 1 * 10, // 550ms
  glacial: FIBONACCI[12] ?? 1 * 10, // 1440ms
};

// Sacred easing functions based on golden ratio
export const EASINGS: Record<AnimationEasingType, [number, number, number, number]> = {
  // Standard easing with golden ratio influence
  standard: [0.618, 0, 0.382, 1], // Based on PHI_INVERSE and (1 - PHI_INVERSE)
  
  // Ease in with golden ratio influence
  easeIn: [0.618, 0, 1, 1],
  
  // Ease out with golden ratio influence
  easeOut: [0, 0, 0.382, 1],
  
  // Ease in-out with golden ratio influence
  easeInOut: [0.618, 0, 0.382, 1],
  
  // Botanical motion for plant-inspired animations
  botanical: [0.175, 0.885, 0.32, 1.275],
  
  // Pure golden ratio easing
  golden: [0, PHI - 1, 1, 1],
};

// Stagger delays for sequential animations (in milliseconds)
export const STAGGER_DELAYS = {
  minimal: FIBONACCI[3] ?? 1, // 2ms
  small: FIBONACCI[5] ?? 1, // 5ms
  medium: FIBONACCI[6] ?? 1, // 8ms
  large: FIBONACCI[7] ?? 1, // 13ms
  extraLarge: FIBONACCI[8] ?? 1, // 21ms
};

// Animation steps for multi-stage animations
export const ANIMATION_STEPS = {
  minimal: FIBONACCI[4] ?? 1, // 3 steps
  simple: FIBONACCI[5] ?? 1, // 5 steps
  moderate: FIBONACCI[7] ?? 1, // 13 steps
  complex: FIBONACCI[9] ?? 1, // 34 steps
  elaborate: FIBONACCI[11] ?? 1, // 89 steps
};

// Default values for animation configuration
export const DEFAULT_ANIMATION_CONFIG = {
  duration: DURATIONS.normal,
  easing: EASINGS.standard,
  staggerDelay: STAGGER_DELAYS.medium,
  steps: ANIMATION_STEPS.simple,
};

// Helper function to resolve duration string to number
export const resolveDuration = (duration: AnimationDurationType | number): number => {
  if (typeof duration === 'number') {
    return duration;
  }
  return (DURATIONS[duration] ?? 1) || DURATIONS.normal;
};

// Helper function to resolve easing string to cubic-bezier array
export const resolveEasing = (easing: AnimationEasingType | [number, number, number, number]): [number, number, number, number] => {
  if (Array.isArray(easing)) {
    return easing;
  }
  return (EASINGS[easing] ?? EASINGS.standard);
};

// Helper function to create a cubic-bezier string for CSS
export const createCubicBezier = (easing: AnimationEasingType | [number, number, number, number]): string => {
  const easingArray = resolveEasing(easing);
  return `cubic-bezier(${easingArray.join(', ')})`;
}; 





