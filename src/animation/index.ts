/**
 * Animation Components
 * 
 * This module exports animation components and utilities that follow sacred geometry principles.
 * All animations use the golden ratio and Fibonacci sequence for timing and motion.
 */

// Animation components
export { default as FadeIn } from './FadeIn';
export { default as ScaleFade } from './ScaleFade';
export { default as SlideIn } from './SlideIn';
export { default as ScrollReveal } from './ScrollReveal';
export { default as ParallaxLayer } from './ParallaxLayer';
export { default as Sequence } from './Sequence';
export { default as Morph } from './Morph';

// Export re-exports from design system animation components
export {
  MorphingShape
} from '../design-system/components/animation/MorphingShape';

export {
  sacredEasing,
  sacredDurations
} from '../design-system/components/animation/useAnimationConfig';

// Animation utilities
export * from './animation.d';
export { 
  resolveDuration, 
  applyGoldenRatioDuration,
  calculateStaggerDelay,
  getFibonacciByIndex,
  prefersReducedMotion,
  getAccessibleAnimationSettings,
  getAccessibleAnimationConfig
} from '../utils/animation';

// Export useAnimationConfig hook and its types
export { default as useAnimationConfig } from './useAnimationConfig';
export type { 
  SlideDirection,
  AnimationConfigOptions 
} from './useAnimationConfig';












