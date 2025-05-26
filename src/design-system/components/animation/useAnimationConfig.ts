import { useState, useEffect } from 'react';
import { AnimationProps } from 'framer-motion';
import { prefersReducedMotion } from '../../../utils/animation';
import { PHI_INVERSE } from '../../../constants/sacred-geometry';

import { SlideDirection, AnimationConfigOptions } from '../../types/animation.types';

// Define these constants here since they're used in this file
export const sacredEasing = {
  standard: [0.618, 0, 0.382, 1],
  entrance: [0.309, 0, 0.618, 1],
  exit: [0.382, 0, 1, 1],
  easeIn: [0.618, 0, 1, 1],
  easeOut: [0, 0, 0.618, 1],
  easeInOut: [0.618, 0, 0.382, 1],
  bounce: [0.618, -0.185, 0.7, 1.3],
  anticipate: [0.8, -0.498, 0.2, 1.2],
  botanical: [0.175, 0.885, 0.32, 1.275],
  goldenEaseIn: (t: number) => 1 - Math.pow(1 - t, PHI_INVERSE),
  goldenEaseOut: (t: number) => Math.pow(t, PHI_INVERSE),
  goldenEaseInOut: (t: number) => t < 0.5
    ? (1 - Math.pow(1 - t * 2, PHI_INVERSE)) / 2
    : 0.5 + Math.pow((t - 0.5) * 2, PHI_INVERSE) / 2
} as const;

export const sacredDurations = {
  ultraFast: 0.062,
  fast: 0.124,
  standard: 0.309,
  slow: 0.618,
  verySlow: 1.0,
  quick: 0.2,
  stagger: 0.05
} as const;

// Define type for duration keys for type safety
type DurationKeys = keyof typeof sacredDurations;

/**
 * Custom hook for creating sacred geometry based animations
 * Uses the golden ratio and Fibonacci sequence to create harmonious animation timing
 */
export const useAnimationConfig = (options: AnimationConfigOptions): AnimationProps => {
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  
  useEffect(() => {
    setIsReducedMotion(prefersReducedMotion());
  }, []);
  
  const {
    type,
    direction = 'up',
    duration = 'standard',
    easing = 'standard',
    distance = 34, // Based on Fibonacci number
    initialScale = PHI_INVERSE,
    reducedMotionConfig
  } = options;
  
  // Calculate duration value from named duration or use number directly
  const durationValue = typeof duration === 'string' 
    ? (sacredDurations[duration as DurationKeys] ?? sacredDurations.standard) 
    : duration;
  
  // Get easing value - properly handle both string keys and functions
  const easingValue = typeof easing === 'function' 
    ? easing  // It's a custom function
    : typeof easing === 'string' && easing in sacredEasing
      ? sacredEasing[easing as keyof typeof sacredEasing]  
      : sacredEasing.standard;  // Fallback to standard
  
  // Base configuration for all animations
  const baseConfig: AnimationProps = {
    initial: {},
    animate: {},
    exit: {},
    transition: {
      duration: durationValue,
      ease: easingValue
    }
  };
  
  if (!isReducedMotion) {
    // Choose animation type
    switch (type) {
      case 'fadeIn':
        baseConfig.initial = { opacity: 0 };
        baseConfig.animate = { opacity: 1 };
        baseConfig.exit = { opacity: 0 };
        break;
        
      case 'fadeOut':
        baseConfig.initial = { opacity: 1 };
        baseConfig.animate = { opacity: 0 };
        baseConfig.exit = { opacity: 1 };
        break;
        
      case 'scaleIn':
        baseConfig.initial = { opacity: 0, scale: initialScale };
        baseConfig.animate = { opacity: 1, scale: 1 };
        baseConfig.exit = { opacity: 0, scale: initialScale };
        break;
        
      case 'scaleOut':
        baseConfig.initial = { opacity: 1, scale: 1 };
        baseConfig.animate = { opacity: 0, scale: initialScale };
        baseConfig.exit = { opacity: 1, scale: 1 };
        break;
        
      case 'slideIn':
        baseConfig.initial = getSlideValues(direction, distance, 'initial');
        baseConfig.animate = getSlideValues(direction, distance, 'animate');
        baseConfig.exit = getSlideValues(direction, distance, 'exit');
        break;
        
      case 'slideOut':
        baseConfig.initial = getSlideValues(direction, distance, 'animate');
        baseConfig.animate = getSlideValues(direction, distance, 'initial');
        baseConfig.exit = getSlideValues(direction, distance, 'animate');
        break;
        
      case 'rotate':
        baseConfig.initial = { opacity: 0, rotate: -90 };
        baseConfig.animate = { opacity: 1, rotate: 0 };
        baseConfig.exit = { opacity: 0, rotate: 90 };
        break;
        
      case 'path':
        // Path animations are handled through SVG path properties
        baseConfig.transition = {
          duration: durationValue * 1.5
        };
        break;
    }
  } else {
    // Reduced motion configuration - simple fade or no animation
    if (reducedMotionConfig) {
      return { ...baseConfig, ...reducedMotionConfig };
    }
    
    // Default reduced motion is a simple fade or immediate appearance
    if (type !== 'fadeIn') {
      baseConfig.initial = { opacity: 0 };
      baseConfig.animate = { opacity: 1 };
      baseConfig.exit = { opacity: 0 };
      baseConfig.transition = {
        duration: durationValue * 0.5
      };
    }
  }
  
  return baseConfig;
};

/**
 * Helper function to get slide animation values based on direction
 */
const getSlideValues = (
  direction: SlideDirection,
  distance: number,
  state: 'initial' | 'animate' | 'exit'
) => {
  // Default values
  const values = { opacity: 0, x: 0, y: 0 };
  
  // Set direction-based transform
  if (state === 'initial' || state === 'exit') {
    switch (direction) {
      case 'up':
        values.y = distance;
        break;
      case 'down':
        values.y = -distance;
        break;
      case 'left':
        values.x = distance;
        break;
      case 'right':
        values.x = -distance;
        break;
    }
  }
  
  // Set opacity based on state
  if (state === 'animate') {
    values.opacity = 1;
  }
  
  return values;
};

export default useAnimationConfig; 








