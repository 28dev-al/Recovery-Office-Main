// TODO: This file contains direct window access without SSR checks
/**
 * useReducedMotion Hook
 * 
 * This hook detects the user's motion preference from the 'prefers-reduced-motion' media query.
 * It can be used throughout the application to ensure animations respect accessibility preferences.
 * 
 * The hook is responsive to changes in the user's system settings and will update in real-time.
 */

import { useState, useEffect } from 'react';
import { PHI_INVERSE } from '../constants/sacred-geometry';

/**
 * Type for a safe media query that works in both browser and SSR environments
 */
interface SafeMediaQuery {
  matches: boolean;
  addEventListener?: (event: string, handler: (e: MediaQueryListEvent) => void) => void;
  removeEventListener?: (event: string, handler: (e: MediaQueryListEvent) => void) => void;
  addListener?: (handler: (e: MediaQueryListEvent) => void) => void;
  removeListener?: (handler: (e: MediaQueryListEvent) => void) => void;
}

/**
 * Create a safe media query that works in both browser and SSR environments
 */
const createSafeMediaQuery = (): SafeMediaQuery => {
  if (typeof window === 'undefined') {
    return { 
      matches: false, 
      addEventListener: () => {}, 
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {} 
    };
  }
  
  return window.matchMedia('(prefers-reduced-motion: reduce)');
};

/**
 * Hook to detect if the user prefers reduced motion
 * 
 * @returns {Object} Object containing:
 *   - prefersReducedMotion: Whether the user prefers reduced motion
 *   - shouldAnimate: Whether animations should be shown (inverse of prefersReducedMotion)
 *   - duration: Recommended duration for any necessary animations (shorter if reduced motion is preferred)
 *   - distance: Recommended distance for any necessary animations (shorter if reduced motion is preferred)
 */
export const useReducedMotion = () => {
  // Create media query to detect preference
  const mediaQuery = createSafeMediaQuery();

  // Initialize state based on current preference
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(mediaQuery.matches);

  useEffect(() => {
    // Handler for when the preference changes
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    // Add event listener with browser compatibility check
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      
      // Cleanup on unmount
      return () => {
        mediaQuery.removeEventListener?.('change', handleChange);
      };
    } else if (mediaQuery.addListener) {
      // For older browsers
      mediaQuery.addListener(handleChange);
      
      // Cleanup on unmount
      return () => {
        mediaQuery.removeListener?.(handleChange);
      };
    }
    
    return undefined;
  }, [mediaQuery]);

  // Derive values based on reduced motion preference
  return {
    prefersReducedMotion,
    shouldAnimate: !prefersReducedMotion,
    duration: prefersReducedMotion ? 0.15 : 0.3, // Shorter duration if reduced motion is preferred
    distance: prefersReducedMotion ? 5 : 20, // Shorter distance if reduced motion is preferred
    scale: prefersReducedMotion ? 0.95 : PHI_INVERSE, // Smaller scale change if reduced motion is preferred
  };
};

export default useReducedMotion; 







