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
export { default as Sequence } from './Sequence';
export { default as ParallaxLayer } from './ParallaxLayer';
export { default as Parallax } from './Parallax';
export { default as Morph } from './Morph';
export { default as MorphingShape } from './MorphingShape';

// Animation utilities and hooks
export { 
  resolveDuration, 
  applyGoldenRatioDuration,
  prefersReducedMotion,
  getAccessibleAnimationSettings,
  getAccessibleAnimationConfig
} from '../../../utils/animation';

export { default as useAnimationConfig } from './useAnimationConfig';

// Type exports
export type { 
  SlideDirection,
  FadeInProps,
  ScaleFadeProps,
  SlideInProps,
  ScrollRevealProps, 
  ScrollRevealVariant,
  SequenceProps,
  SequenceVariant,
  ParallaxLayerProps,
  ParallaxProps,
  MorphProps,
  MorphingShapeProps,
  AnimationDuration,
  CustomEasingFunction,
  EasingValue,
  BaseAnimationProps,
  AnimationConfigOptions
} from '../../types/animation.types';






