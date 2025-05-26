/**
 * Function Utilities
 * 
 * Helper functions for function manipulation including debounce, throttle, and memoization
 * with sacred geometry principles for timing.
 */

import { ANIMATION_TIMING, PHI } from '../constants/sacred-geometry';

/**
 * Debounce function with sacred geometry timing
 * 
 * Creates a function that delays invoking func until after wait milliseconds have elapsed
 * since the last time the debounced function was invoked.
 *
 * @param func - The function to debounce
 * @param wait - The number of milliseconds to delay (defaults to PHI based standard timing)
 * @param immediate - Whether to invoke the function on the leading edge instead of trailing
 * @returns A debounced function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait = ANIMATION_TIMING.standard * 1000, // Default to standard sacred timing
  immediate = false
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return function(this: any, ...args: Parameters<T>): void {
    const context = this;
    
    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    
    const callNow = immediate && !timeout;
    
    if (timeout) {
      clearTimeout(timeout);
    }
    
    timeout = setTimeout(later, wait);
    
    if (callNow) {
      func.apply(context, args);
    }
  };
}

/**
 * Throttle function with sacred geometry timing
 * 
 * Creates a function that only invokes func at most once per every wait milliseconds.
 *
 * @param func - The function to throttle
 * @param wait - The number of milliseconds to throttle (defaults to PHI based standard timing)
 * @returns A throttled function
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait = ANIMATION_TIMING.standard * 1000 // Default to standard sacred timing
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  let previous = 0;
  
  return function(this: any, ...args: Parameters<T>): void {
    const context = this;
    const now = Date.now();
    
    // Calculate remaining time with PHI-based adjustments for more natural timing
    const remaining = Math.max(0, previous + wait - now);
    
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      
      previous = now;
      func.apply(context, args);
    } else if (!timeout) {
      // Apply fibonacci timing for smoother throttling
      const adjustedRemaining = remaining * PHI;
      
      const timeoutFn = () => {
        previous = Date.now();
        timeout = null;
        func.apply(context, args);
      };
      
      timeout = setTimeout(timeoutFn, adjustedRemaining);
    }
  };
}

/**
 * Simple memoize function for expensive calculations
 * 
 * Creates a function that memoizes the result of func. If the function is called
 * with the same arguments, the cached result is returned.
 *
 * @param func - The function to memoize
 * @returns A memoized function
 */
export function memoize<T extends (...args: any[]) => any>(
  func: T
): (...args: Parameters<T>) => ReturnType<T> {
  const cache = new Map<string, ReturnType<T>>();
  
  return function(this: any, ...args: Parameters<T>): ReturnType<T> {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key) as ReturnType<T>;
    }
    
    const result = func.apply(this, args);
    cache.set(key, result);
    
    return result;
  };
}

/**
 * Once function
 * 
 * Creates a function that is restricted to invoking func once.
 * Repeat calls to the function return the value of the first invocation.
 *
 * @param func - The function to restrict
 * @returns A function that can only be called once
 */
export function once<T extends (...args: any[]) => any>(
  func: T
): (...args: Parameters<T>) => ReturnType<T> {
  let result: ReturnType<T>;
  let called = false;
  
  return function(this: any, ...args: Parameters<T>): ReturnType<T> {
    if (!called) {
      called = true;
      result = func.apply(this, args);
    }
    
    return result;
  };
} 





