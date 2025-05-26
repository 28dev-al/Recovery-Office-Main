import * as React from 'react';;
import { AnimationProps } from 'framer-motion';
import { PHI_INVERSE } from '../constants/sacred-geometry';
import { prefersReducedMotion } from '../utils/animation';

// Define these constants here since they're used in this file
export const sacredEasing = {
  standard: [0.618, 0, 0.382, 1],
  entrance: [0.309, 0, 0.618, 1],
  exit: [0.382, 0, 1, 1],
  easeIn: [0.618, 0, 1, 1],
  easeOut: [0, 0, 0.618, 1],
  easeInOut: [0.618, 0, 0.382, 1],
  bounce: [0.618, -0.185, 0.7, 1.3],
  anticipate: [0.8, -0.498, 0.2, 1.2]
} as const;

export const sacredDurations = {
  ultraFast: 0.062,
  fast: 0.124,
  standard: 0.309,
  slow: 0.618,
  verySlow: 1.0
} as const;

// Define the SlideDirection type here
export type SlideDirection = 'up' | 'down' | 'left' | 'right';

// Animation config options
export interface AnimationConfigOptions {
  duration?: number;
  delay?: number;
  easing?: [number, number, number, number];
  stiffness?: number;
  damping?: number;
  mass?: number;
  once?: boolean;
}

/**
 * useAnimationConfig hook
 * 
 * A custom hook that returns animation configurations based on sacred geometry principles.
 * It automatically handles reduced motion preferences and applies the golden ratio.
 * 
 * @param options - Animation configuration options
 * @returns Animation configurations for Framer Motion
 */
const useAnimationConfig = (options: AnimationConfigOptions = {}) => {
  const [shouldReduceMotion, setShouldReduceMotion] = React.useState(false);
  
  // Check for reduced motion preference
  React.useEffect(() => {
    setShouldReduceMotion(prefersReducedMotion());
  }, []);
  
  // Base animation duration in seconds (phi-based)
  const baseDuration = options.duration || PHI_INVERSE * 1.5;
  
  // Actual animation duration, considering reduced motion preference
  const duration = shouldReduceMotion ? 0.01 : baseDuration;
  
  // Default delay in seconds
  const delay = options.delay || 0;
  
  // Default cubic bezier easing curve based on golden ratio
  const easing = options.easing || [0.618, 0, 0.382, 1];
  
  // Spring animation options based on golden ratio
  const spring = {
    stiffness: options.stiffness || 100 * PHI_INVERSE,
    damping: options.damping || 10 * PHI_INVERSE,
    mass: options.mass || PHI_INVERSE,
  };
  
  // Generate fade animation variants
  const fade = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration,
        delay,
        ease: easing 
      }
    },
    exit: {
      opacity: 0,
      transition: { 
        duration: duration * PHI_INVERSE,
        ease: easing 
      }
    }
  };
  
  // Generate scale animation variants
  const scale = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration,
        delay,
        ease: easing 
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { 
        duration: duration * PHI_INVERSE,
        ease: easing 
      }
    }
  };
  
  // Generate slide variants
  const slide = (direction: SlideDirection = 'up', distance: number = 30) => {
    let x = 0;
    let y = 0;
    
    if (direction === 'up') y = distance;
    if (direction === 'down') y = -distance;
    if (direction === 'left') x = distance;
    if (direction === 'right') x = -distance;
    
    return {
      hidden: { 
        opacity: 0, 
        x, 
        y 
      },
      visible: { 
        opacity: 1, 
        x: 0, 
        y: 0,
        transition: { 
          duration,
          delay,
          ease: easing 
        }
      },
      exit: {
        opacity: 0,
        x: x * PHI_INVERSE,
        y: y * PHI_INVERSE,
        transition: { 
          duration: duration * PHI_INVERSE,
          ease: easing 
        }
      }
    };
  };
  
  // Return animation configurations
  return {
    shouldReduceMotion,
    duration,
    delay,
    easing,
    spring,
    variants: {
      fade,
      scale,
      slide
    },
    transition: {
      duration,
      delay,
      ease: easing
    } as AnimationProps['transition']
  };
};

export default useAnimationConfig; 














