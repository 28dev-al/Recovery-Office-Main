// TODO: This file contains direct window access without SSR checks
/**
 * Animation Context
 * 
 * Provides animation preferences and settings for the entire application.
 * Implements sacred geometry principles for timing and easing functions.
 * Includes support for reduced motion preferences.
 */

import * as React from 'react';
import { 
  useEffect,
  createContext,
  useState,
  useContext,
  ReactNode
} from 'react';
import { 
  ANIMATION_TIMING, 
  SACRED_EASINGS 
} from '../constants/sacred-geometry';

// Define types for animation settings
export type AnimationDuration = 'fast' | 'medium' | 'slow' | 'slower' | 'slowest';
export type AnimationEasing = 'smooth' | 'bouncy' | 'sharp' | 'elastic' | 'golden';
export type StaggerDirection = 'forward' | 'reverse' | 'center' | 'edges';

interface AnimationContextType {
  // Animation preferences
  prefersReducedMotion: boolean;
  animationsEnabled: boolean;
  
  // Animation settings
  defaultDuration: AnimationDuration;
  defaultEasing: AnimationEasing;
  staggerAmount: number;
  staggerDirection: StaggerDirection;
  
  // Actions
  setAnimationsEnabled: (enabled: boolean) => void;
  setDefaultDuration: (duration: AnimationDuration) => void;
  setDefaultEasing: (easing: AnimationEasing) => void;
  setStaggerAmount: (amount: number) => void;
  setStaggerDirection: (direction: StaggerDirection) => void;
}

// Create context with default values
const AnimationContext = createContext<AnimationContextType>({
  prefersReducedMotion: false,
  animationsEnabled: true,
  defaultDuration: 'medium',
  defaultEasing: 'smooth',
  staggerAmount: 8, // Using Fibonacci number directly
  staggerDirection: 'forward',
  setAnimationsEnabled: () => {},
  setDefaultDuration: () => {},
  setDefaultEasing: () => {},
  setStaggerAmount: () => {},
  setStaggerDirection: () => {},
});

interface AnimationProviderProps {
  children: ReactNode;
  initialSettings?: Partial<AnimationContextType>;
}

export const AnimationProvider: React.FC<AnimationProviderProps> = ({ 
  children, 
  initialSettings = {} 
}) => {
  // Check for reduced motion preference
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(
    typeof window !== 'undefined' 
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
      : false
  );
  
  // Animation preferences with defaults merged with initialSettings
  const [animationsEnabled, setAnimationsEnabled] = useState<boolean>(
    initialSettings.animationsEnabled ?? true
  );
  
  const [defaultDuration, setDefaultDuration] = useState<AnimationDuration>(
    initialSettings.defaultDuration ?? 'medium'
  );
  
  const [defaultEasing, setDefaultEasing] = useState<AnimationEasing>(
    initialSettings.defaultEasing ?? 'smooth'
  );
  
  const [staggerAmount, setStaggerAmount] = useState<number>(
    initialSettings.staggerAmount ?? 8
  );
  
  const [staggerDirection, setStaggerDirection] = useState<StaggerDirection>(
    initialSettings.staggerDirection ?? 'forward'
  );
  
  // Listen for changes in reduced motion preference
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    // Use proper event listener pattern based on browser support
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
        // Fallback for older browsers
        mediaQuery.addListener(handleChange);
    }
      
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);
  
  // Combine context values
  const contextValue: AnimationContextType = {
    prefersReducedMotion,
    animationsEnabled,
    defaultDuration,
    defaultEasing,
    staggerAmount,
    staggerDirection,
    setAnimationsEnabled,
    setDefaultDuration,
    setDefaultEasing,
    setStaggerAmount,
    setStaggerDirection,
  };
  
  return (
    <AnimationContext.Provider value={contextValue}>
      {children}
    </AnimationContext.Provider>
  );
};

// Custom hooks for accessing animation settings

// Hook to determine if animations should run
export const useShouldAnimate = (): boolean => {
  const { prefersReducedMotion, animationsEnabled } = useContext(AnimationContext);
  return !prefersReducedMotion && animationsEnabled;
};

// Hook to get animation duration in milliseconds
export const useAnimationDuration = (
  duration?: AnimationDuration
): number => {
  const { defaultDuration, prefersReducedMotion } = useContext(AnimationContext);
  
  // Return minimal duration if user prefers reduced motion
  if (prefersReducedMotion) {
    return ANIMATION_TIMING.quick;
  }
  
  // Use specified duration or default from context
  const durationKey = duration || defaultDuration;
  
  // The ANIMATION_TIMING object might not have the exact keys, so we need to map them
  const durationMap: Record<AnimationDuration, keyof typeof ANIMATION_TIMING> = {
    'fast': 'quick',
    'medium': 'standard',
    'slow': 'slow',
    'slower': 'slow',
    'slowest': 'slow'
  };
  
  // Get the mapped key with a fallback to 'standard'
  const mappedKey = durationMap[durationKey] || 'standard';
  return ANIMATION_TIMING[mappedKey] as number;
};

// Hook to get animation easing function
export const useAnimationEasing = (
  easing?: AnimationEasing
): string => {
  const { defaultEasing, prefersReducedMotion } = useContext(AnimationContext);
  
  // Use linear easing for reduced motion preference
  if (prefersReducedMotion) {
    return 'linear'; // Simple string for linear easing
  }
  
  // Use specified easing or default from context
  const easingKey = easing || defaultEasing;
  
  // Map animation context easing types to SACRED_EASINGS keys
  const easingMap: Record<AnimationEasing, keyof typeof SACRED_EASINGS> = {
    smooth: 'standard',
    bouncy: 'naturalBounce',
    sharp: 'sharpIn',
    elastic: 'naturalSpring',
    golden: 'golden'
  };
  
  const mappedKey = easingMap[easingKey] || 'standard';
  // Return the easing value as a string representation
  return JSON.stringify(SACRED_EASINGS[mappedKey]);
};

// Hook to calculate stagger delay based on index
export const useStaggerDelay = (index: number = 0): number => {
  const { staggerAmount, staggerDirection, prefersReducedMotion } = useContext(AnimationContext);
  
  // No stagger for reduced motion preference
  if (prefersReducedMotion) {
    return 0;
  }
  
  // Calculate delay based on stagger direction
  switch (staggerDirection) {
    case 'forward':
      return index * staggerAmount;
      
    case 'reverse':
      return -index * staggerAmount; // Negative stagger
      
    case 'center': {
      // Items closer to center appear first
      const centerOffset = Math.abs(index);
      return centerOffset * staggerAmount;
    }
      
    case 'edges': {
      // Items at edges appear first
      const totalItems = 10; // Estimate - ideally would be passed in
      const distanceFromEdge = Math.min(index, totalItems - index - 1);
      return distanceFromEdge * staggerAmount;
    }
      
    default:
      return index * staggerAmount;
  }
};

// Hook to get all animation context values
export const useAnimation = () => useContext(AnimationContext);

export default AnimationContext; 







