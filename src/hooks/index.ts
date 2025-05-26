/**
 * Custom Hooks Index
 * 
 * This file exports all custom hooks from a single entry point
 * to provide consistent imports throughout the application.
 */

export { default as useReducedMotion } from './useReducedMotion';
export { default as useAnimationSequence } from './useAnimationSequence';
export { default as useParallaxScroll } from './useParallaxScroll';
export { default as useMediaQuery } from './useMediaQuery';
export { useBookingStepValidation } from './useBookingStepValidation';
export { default as useToast } from './useToast';

// Export types
export type { AnimationSequenceOptions, AnimationSequenceResult } from './useAnimationSequence';
export type { ParallaxOptions, ParallaxResult } from './useParallaxScroll';

// Named exports for better intellisense
export * from './useAnimationSequence';
export * from './useMediaQuery';
export * from './useParallaxScroll';
export * from './useReducedMotion';
export * from './useBookingStepValidation';
export * from './useToast'; 





