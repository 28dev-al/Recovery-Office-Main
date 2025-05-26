/**
 * useBreakpointValue Hook
 * 
 * A hook that returns different values based on the current breakpoint.
 * Implements sacred geometry principles for responsive design.
 */

import { useEffect, useState } from 'react';
import { theme } from '../design-system/theme';
import { BreakpointKey } from '../design-system/tokens/breakpoints';

type BreakpointValues<T> = {
  [key in BreakpointKey]?: T;
} & {
  base: T;
};

/**
 * Returns a value based on the current breakpoint
 * 
 * @param values - Object with values for different breakpoints
 * @returns The value for the current breakpoint
 */
export function useBreakpointValue<T>(values: BreakpointValues<T>): T {
  // Default to the base value
  const [value, setValue] = useState<T>(values.base);
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Get breakpoint values
    const breakpointValues = theme.breakpoints.values;
    
    // Create media query handlers for each breakpoint
    const mediaQueryLists: Record<string, MediaQueryList> = {};
    const handlers: Record<string, (e: MediaQueryListEvent) => void> = {};
    
    // Function to set the appropriate value based on breakpoints
    const updateValue = () => {
      // Create a map to hold the values for matched breakpoints
      const matchedBreakpoints = new Map<number, T>();
      
      // Get all matched breakpoints
      for (const [key, mql] of Object.entries(mediaQueryLists)) {
        if (mql.matches && key in values) {
          const breakpointValue = breakpointValues[key as BreakpointKey];
          if (breakpointValue !== undefined) {
            matchedBreakpoints.set(breakpointValue, values[key as BreakpointKey] as T);
          }
        }
      }
      
      // If no breakpoints match, use the base value
      if (matchedBreakpoints.size === 0) {
        setValue(values.base);
        return;
      }
      
      // Find the largest matched breakpoint
      const maxBreakpoint = Math.max(...Array.from(matchedBreakpoints.keys()));
      const maxValue = matchedBreakpoints.get(maxBreakpoint);
      
      // Set the value to the largest matched breakpoint
      setValue(maxValue !== undefined ? maxValue : values.base);
    };
    
    // Create media queries for all breakpoint keys except 'base'
    Object.entries(breakpointValues).forEach(([key, width]) => {
      if (key !== 'base') {
        const mediaQuery = `(min-width: ${width}px)`;
        const mql = window.matchMedia(mediaQuery);
        mediaQueryLists[key] = mql;
        
        const handler = () => {
          updateValue();
        };
        
        handlers[key] = handler;
        
        // Add event listener using the appropriate API
        if (mql.addEventListener) {
          mql.addEventListener('change', handler);
        } else {
          // Fallback for older browsers
          mql.addListener(handler);
        }
      }
    });
    
    // Initial update
    updateValue();
    
    // Cleanup function
    return () => {
      Object.entries(mediaQueryLists).forEach(([key, mql]) => {
        if (mql.removeEventListener) {
          mql.removeEventListener('change', handlers[key]);
        } else {
          // Fallback for older browsers
          mql.removeListener(handlers[key]);
        }
      });
    };
  }, [values]);
  
  return value;
}

export default useBreakpointValue; 