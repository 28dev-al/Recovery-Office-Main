// TODO: This file contains direct window access without SSR checks
/**
 * Animation Utilities
 * 
 * This module provides utility functions for animations following sacred
 * geometry principles. These utilities can be used throughout the application
 * to create harmonious, natural animations.
 */

import { 
  PHI, 
  PHI_INVERSE, 
  FIBONACCI, 
  SACRED_EASINGS, 
  ANIMATION_TIMING,
  FibonacciIndex
} from '../constants/sacred-geometry';

// Export animation hooks for easier access
export * from '../hooks/useReducedMotion';
export * from '../hooks/useAnimationSequence';
export * from '../hooks/useParallaxScroll';



/**
 * Resolves a duration value to seconds based on predefined timing constants
 * 
 * @param duration - Duration value as a predefined keyword or number of seconds
 * @returns The duration value in seconds
 */
export const resolveDuration = (
  duration: 'faster' | 'fast' | 'normal' | 'slow' | 'slower' | number
): number => {
  if (typeof duration === 'number') {
    return duration;
  }
  
  switch (duration) {
    case 'faster': return ANIMATION_TIMING.quick * 0.5;
    case 'fast': return ANIMATION_TIMING.quick;
    case 'normal': return ANIMATION_TIMING.standard;
    case 'slow': return ANIMATION_TIMING.slow;
    case 'slower': return ANIMATION_TIMING.slow * 1.3;
    default: return ANIMATION_TIMING.standard;
  }
};

/**
 * Applies golden ratio to a duration for more natural timing
 * 
 * @param duration - Duration in seconds
 * @returns Duration adjusted by golden ratio
 */
export const applyGoldenRatioDuration = (duration: number): number => {
  return duration * PHI_INVERSE;
};

/**
 * Generates CSS cubic-bezier function string from a sacred easing key
 * 
 * @param easingKey - Key from SACRED_EASINGS
 * @returns CSS cubic-bezier function string
 */
export const getSacredEasingCss = (
  easingKey: keyof typeof SACRED_EASINGS
): string => {
  const easingValues = SACRED_EASINGS[easingKey as keyof typeof SACRED_EASINGS];
  
  // Ensure easingValues is an array with 4 elements
  if (Array.isArray(easingValues) && easingValues.length === 4) {
    return `cubic-bezier(${easingValues[0] || 0}, ${easingValues[1] || 0}, ${easingValues[2] || 0}, ${easingValues[3] || 0})`;
  }
  
  // Fallback to default cubic-bezier based on golden ratio
  return `cubic-bezier(${PHI_INVERSE}, 0, ${1 - PHI_INVERSE}, 1)`;
};

/**
 * Get all keys from the FIBONACCI object as a sorted array
 * @returns Array of Fibonacci keys sorted in ascending order
 */
export const getFibonacciKeys = (): number[] => {
  return Object.keys(FIBONACCI)
    .map(Number)
    .sort((a, b) => a - b);
};

/**
 * Get all values from the FIBONACCI object as a sorted array
 * @returns Array of Fibonacci values sorted in ascending order
 */
export const getFibonacciValues = (): number[] => {
  const keys = getFibonacciKeys();
  return keys.map(key => FIBONACCI[key as unknown as FibonacciIndex] ?? 1);
};

/**
 * Generates Fibonacci numbers beyond what's available in the FIBONACCI constant
 * @param start Starting index in the Fibonacci sequence
 * @param end Ending index in the Fibonacci sequence (exclusive)
 * @returns Array of Fibonacci numbers from start to end
 */
export const fibonacciSlice = (start: number, end: number): number[] => {
  // Get existing Fibonacci values
  const existingValues = getFibonacciValues();
  
  // If we have all the values we need, return them directly
  if (end <= existingValues.length) {
    return existingValues.slice(start, end);
  }
  
  // We need to generate additional Fibonacci numbers
  const result: number[] = [...existingValues];
  
  // Generate additional Fibonacci numbers
  if (result.length < 2) {
    // Ensure we have at least the first two Fibonacci numbers
    result.push(1, 1);
  }
  
  // Generate numbers up to the end index
  while (result.length < end) {
    const nextFib = result[result.length - 1] + result[result.length - 2];
    result.push(nextFib);
  }
  
  // Return the requested slice
  return result.slice(start, end);
};

/**
 * Creates staggered animation delays based on Fibonacci sequence
 * @param count Number of items to create delays for
 * @param baseDuration Base duration in seconds
 * @returns Array of delay values in seconds
 */
export const createFibonacciAnimationDelays = (
  count: number,
  baseDuration: number = 0.1
): number[] => {
  // Get appropriate Fibonacci values
  const fibValues = fibonacciSlice(2, 2 + count); // Start from the 3rd Fibonacci number
  
  // Calculate the sum to normalize
  const sum = fibValues.reduce((acc, val) => acc + val, 0);
  
  // Convert to animation delays
  return fibValues.map(val => (val / sum) * baseDuration * count);
};

/**
 * Creates staggered animation delays based on golden ratio
 * @param count Number of items to create delays for
 * @param baseDuration Base duration in seconds
 * @returns Array of delay values in seconds
 */
export const createGoldenRatioAnimationDelays = (
  count: number,
  baseDuration: number = 0.1
): number[] => {
  return Array.from({ length: count }, (_, i) => {
    // Use powers of the golden ratio for a natural feel
    const power = Math.min(i, 7); // Cap at PHI^7 to avoid extreme values
    return baseDuration * (Math.pow(PHI, power) - 1);
  });
};

/**
 * Generates accessible animation config based on user's motion preferences
 * @param regularConfig Config for users without motion sensitivity
 * @param reducedConfig Config for users with motion sensitivity
 * @returns The appropriate config based on user preferences
 */
export const getAccessibleAnimationConfig = <T>(
  regularConfig: T,
  reducedConfig: T
): T => {
  // Check if in browser context
  if (typeof window === 'undefined') return regularConfig;
  
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  return prefersReducedMotion ? reducedConfig : regularConfig;
};

/**
 * Get Fibonacci value by index position
 * @param index - Index position (0-based)
 * @returns Fibonacci value at that position
 */
export const getFibonacciByIndex = (index: number): number => {
  const values = getFibonacciValues();
  // Safety checks for out-of-bounds access
  if (values.length === 0) return 1; // Default fallback
  if (index < 0) return values[0] || 1;
  if (index >= values.length) return values[values.length - 1] || 1;
  return values[index] || 1;
};

/**
 * Calculates a staggered delay for sequence animations
 * 
 * @param index - Item index in the sequence
 * @param total - Total number of items
 * @param baseDelay - Base delay in seconds
 * @param useFibonacci - Whether to use Fibonacci sequence for staggering
 * @returns The calculated delay in seconds
 */
export const calculateStaggerDelay = (
  index: number, 
  total: number, 
  baseDelay: number = 0.1, 
  useFibonacci: boolean = true
): number => {
  if (!useFibonacci) {
    return index * baseDelay;
  }
  
  // Use Fibonacci sequence for more natural timing
  const fibValues = getFibonacciValues();
  if (fibValues.length === 0) return index * baseDelay; // Fallback if no values
  
  const fibIndex = Math.min(index + 3, fibValues.length - 1);
  const fibValue = fibValues[fibIndex] ?? 1; // Provide a safe default
  
  // Calculate proportional delay using the ratio of Fibonacci numbers
  const maxFibIndex = Math.min(total + 2, fibValues.length - 1);
  
  // Safely get a slice of the array (handle array bounds properly)
  const getFibSlice = (start: number, end: number): number[] => {
    const validStart = Math.max(0, Math.min(start, fibValues.length));
    const validEnd = Math.max(validStart, Math.min(end, fibValues.length));
    return fibValues.slice(validStart, validEnd);
  };
  
  // Get the sum of relevant Fibonacci numbers (default to 1 if empty)
  const fibSum = getFibSlice(3, maxFibIndex + 1)
    .reduce((sum: number, num: number) => sum + num, 0) || 1;
  
  // Calculate the proportional delay (avoid division by zero)
  const proportionalDelay = fibValue / fibSum;
  
  // Apply golden ratio for harmony
  return proportionalDelay * baseDelay * total * PHI_INVERSE;
};

/**
 * Calculates points along a golden spiral for animations
 * 
 * @param steps - Number of points to generate
 * @param maxAngle - Maximum angle in radians
 * @returns Array of points along the spiral
 */
export const generateGoldenSpiralPoints = (
  steps: number,
  maxAngle: number = 4 * Math.PI
): Array<{ x: number; y: number }> => {
  // Ensure we have at least 2 points to avoid division by zero
  const safeSteps = Math.max(2, steps);
  const points: Array<{ x: number; y: number }> = [];
  const angleStep = maxAngle / safeSteps;
  
  for (let i = 0; i < safeSteps; i++) {
    const angle = i * angleStep;
    const radius = Math.pow(PHI, 2 * angle / Math.PI) / 4;
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    
    points.push({ x, y });
  }
  
  return points;
};

/**
 * Generates keyframe stops based on golden ratio
 * 
 * @param steps - Number of keyframe stops to generate
 * @returns Array of progress values (0-1) for keyframes
 */
export const generateGoldenKeyframes = (steps: number): number[] => {
  const safeSteps = Math.max(1, steps); // Ensure at least one step
  const keyframes: number[] = [0]; // Start with 0
  
  // Generate intermediate keyframes based on golden ratio
  for (let i = 1; i < safeSteps; i++) {
    // Use PHI_INVERSE to create a more natural progression
    const progress = 1 - Math.pow(PHI_INVERSE, i);
    keyframes.push(Math.min(progress, 1));
  }
  
  // Ensure the last value is exactly 1
  if (keyframes.length > 0) {
    keyframes[keyframes.length - 1] = 1;
  }
  
  return keyframes;
};

/**
 * Creates a spring animation config based on golden ratio
 * 
 * @param damping - Optional damping value (uses PHI-based value if not provided)
 * @param stiffness - Optional stiffness value (uses PHI-based value if not provided)
 * @returns Spring animation configuration
 */
export const goldenSpring = (
  damping?: number,
  stiffness?: number
): { 
  type: 'spring'; 
  damping: number; 
  stiffness: number; 
  restDelta: number 
} => {
  // Use golden ratio to create natural spring physics
  return {
    type: 'spring',
    damping: damping ?? 10 * PHI_INVERSE,
    stiffness: stiffness ?? 100 * PHI,
    restDelta: 0.001
  };
};

/**
 * Creates transition delays for responsive animations based on viewport sizes
 * 
 * @param baseDelay - Base delay in seconds
 * @returns Object with delays for different viewport sizes
 */
export const responsiveAnimationDelay = (
  baseDelay: number = 0.2
): Record<string, number> => {
  return {
    xs: baseDelay * 0.5,
    sm: baseDelay * 0.6,
    md: baseDelay * 0.8,
    lg: baseDelay,
    xl: baseDelay * PHI_INVERSE,
  };
};

/**
 * Checks if reduced motion is preferred by the user
 * 
 * @returns Whether reduced motion is preferred
 */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Gets appropriate animation settings based on user's motion preferences
 * 
 * @param standardDuration - Standard animation duration
 * @param standardDistance - Standard animation distance
 * @returns Appropriate animation settings
 */
export const getAccessibleAnimationSettings = (
  standardDuration: number = ANIMATION_TIMING.standard,
  standardDistance: number = 30
): { 
  duration: number; 
  distance: number; 
  shouldAnimate: boolean 
} => {
  const reducedMotion = prefersReducedMotion();
  
  if (reducedMotion) {
    return {
      duration: standardDuration * 0.5,
      distance: standardDistance * 0.3,
      shouldAnimate: false
    };
  }
  
  return {
    duration: standardDuration,
    distance: standardDistance,
    shouldAnimate: true
  };
}; 





