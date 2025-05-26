// TODO: This file contains direct window access without SSR checks
/**
 * useAnimationSequence Hook
 * 
 * This hook creates animation sequences with timing based on 
 * sacred geometry principles. It leverages the Fibonacci sequence
 * and golden ratio to create natural, harmonious animations.
 */

import { useState, useEffect, useCallback } from 'react';;
import { useRef } from 'react';
import { PHI_INVERSE } from '../constants/sacred-geometry';
import { useReducedMotion } from './useReducedMotion';
import { getFibonacciValues, fibonacciSlice } from '../utils/animation';

export interface AnimationSequenceOptions {
  /**
   * Total number of steps in the sequence
   */
  totalSteps: number;
  
  /**
   * Base delay between steps in seconds
   * @default 0.1
   */
  baseDelay?: number;
  
  /**
   * Total duration of the entire sequence in seconds
   * If provided, will override baseDelay to fit all steps within this duration
   */
  totalDuration?: number;
  
  /**
   * Whether to use Fibonacci sequence for timing
   * @default true
   */
  useFibonacci?: boolean;
  
  /**
   * Whether animation should run when component mounts
   * @default true
   */
  autoPlay?: boolean;
  
  /**
   * Whether animation should loop
   * @default false
   */
  loop?: boolean;
  
  /**
   * Delay before the sequence starts in seconds
   * @default 0
   */
  initialDelay?: number;
  
  /**
   * Direction of the sequence
   * @default 'forward'
   */
  direction?: 'forward' | 'reverse';
}

export interface AnimationSequenceResult {
  /**
   * Current active step in the sequence (-1 if not started)
   */
  currentStep: number;
  
  /**
   * Whether the sequence is currently playing
   */
  isPlaying: boolean;
  
  /**
   * Start or restart the animation sequence
   */
  play: () => void;
  
  /**
   * Pause the animation sequence
   */
  pause: () => void;
  
  /**
   * Reset the sequence to the beginning
   */
  reset: () => void;
  
  /**
   * Whether a specific step should be animated
   * @param step - The step to check
   */
  shouldAnimateStep: (step: number) => boolean;
  
  /**
   * Array of delays for each step
   */
  delays: number[];
}

/**
 * Hook for creating animation sequences based on sacred geometry principles
 * 
 * @param options - Configuration options for the animation sequence
 * @returns Animation sequence controller
 */
export const useAnimationSequence = ({
  totalSteps,
  baseDelay = 0.1,
  totalDuration,
  useFibonacci = true,
  autoPlay = true,
  loop = false,
  initialDelay = 0,
  direction = 'forward'
}: AnimationSequenceOptions): AnimationSequenceResult => {
  const [currentStep, setCurrentStep] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const timeoutsRef = useRef<number[]>([]);
  const { prefersReducedMotion } = useReducedMotion();
  
  // Calculate delays based on Fibonacci sequence or linear spacing
  const calculateDelays = useCallback((): number[] => {
    // If reduced motion is preferred, use minimal delays
    if (prefersReducedMotion) {
      return Array(totalSteps).fill(0.05);
    }
    
    // Use Fibonacci sequence for natural timing
    if (useFibonacci) {
      // Get relevant Fibonacci numbers (starting from index 3 to avoid too small values)
      const fibValues = getFibonacciValues();
      
      // Create a function to safely get a subset of Fibonacci values
      const getSafeFibRange = (startIndex: number, count: number): number[] => {
        // If our fibValues array is empty, generate a simple progression
        if (fibValues.length === 0) {
          return Array.from({ length: count }, (_, i) => (i + 1) * baseDelay * 10);
        }
        
        // Ensure startIndex is within bounds
        const safeStartIndex = Math.max(0, Math.min(startIndex, fibValues.length - 1));
        
        // If we can get values directly from the array
        if (safeStartIndex + count <= fibValues.length) {
          return fibValues.slice(safeStartIndex, safeStartIndex + count);
        }
        
        // If we need more values than we have, use fibonacciSlice utility
        // that can generate values beyond what's in the constant
        return fibonacciSlice(safeStartIndex, safeStartIndex + count);
      };
      
      // Get a subset of Fibonacci values starting from the 3rd element
      const startIndex = 2; // 0-indexed, so 3rd element is at index 2
      const relevantFibs = getSafeFibRange(startIndex, totalSteps);
      
      // Calculate the sum to normalize (ensure it's never zero)
      const fibSum = relevantFibs.reduce((sum, val) => sum + val, 0) || 1;
      
      // Calculate delays based on the ratio of each Fibonacci number to the sum
      return relevantFibs.map(fib => {
        const ratio = fib / fibSum;
        // If totalDuration is specified, distribute steps to fit within it
        if (totalDuration) {
          return ratio * totalDuration * PHI_INVERSE;
        }
        // Otherwise use baseDelay as a multiplier
        return ratio * baseDelay * totalSteps;
      });
    }
    
    // Linear spacing (equal delays between steps)
    if (totalDuration) {
      const stepDuration = totalDuration / totalSteps;
      return Array(totalSteps).fill(stepDuration);
    }
    
    // Default to baseDelay for each step
    return Array(totalSteps).fill(baseDelay);
  }, [totalSteps, baseDelay, totalDuration, useFibonacci, prefersReducedMotion]);
  
  // Memoize the delays
  const delays = calculateDelays();
  
  // Clean up any running timeouts
  const cleanupTimeouts = useCallback(() => {
    timeoutsRef.current.forEach(timeoutId => window.clearTimeout(timeoutId));
    timeoutsRef.current = [];
  }, []);
  
  // Reset the animation sequence
  const reset = useCallback(() => {
    cleanupTimeouts();
    setCurrentStep(-1);
  }, [cleanupTimeouts]);
  
  // Pause the animation sequence
  const pause = useCallback(() => {
    cleanupTimeouts();
    setIsPlaying(false);
  }, [cleanupTimeouts]);
  
  // Start or restart the animation sequence
  const play = useCallback(() => {
    // Clean up existing timeouts
    cleanupTimeouts();
    
    // Reset current step
    setCurrentStep(-1);
    setIsPlaying(true);
    
    // Don't animate if reduced motion is preferred and this is purely decorative
    if (prefersReducedMotion) {
      // Immediately jump to the end
      setCurrentStep(totalSteps - 1);
      return;
    }
    
    // Calculate the cumulative delays
    let cumulativeDelay = initialDelay * 1000; // Convert to milliseconds
    
    // Set up timeouts for each step
    const timeouts: number[] = [];
    
    for (let i = 0; i < totalSteps; i++) {
      // Get the actual step index based on direction
      const stepIndex = direction === 'forward' ? i : totalSteps - 1 - i;
      
      // Add the delay for this step (ensure we have a valid delay value)
      const stepDelay = (delays[i] ?? 1) || baseDelay;
      cumulativeDelay += (stepDelay * 1000); // Convert to milliseconds
      
      // Create timeout
      const timeoutId = window.setTimeout(() => {
        setCurrentStep(stepIndex);
        
        // If this is the last step and loop is true, restart the sequence
        if (i === totalSteps - 1 && loop) {
          timeouts.push(window.setTimeout(() => {
            reset();
            play();
          }, 1000)); // Wait 1 second before restarting
        }
      }, cumulativeDelay);
      
      timeouts.push(timeoutId);
    }
    
    // Store timeouts for cleanup
    timeoutsRef.current = timeouts;
  }, [cleanupTimeouts, delays, direction, initialDelay, loop, prefersReducedMotion, reset, totalSteps, baseDelay]);
  
  // Check if a specific step should be animated
  const shouldAnimateStep = useCallback((step: number): boolean => {
    if (direction === 'forward') {
      return step <= currentStep;
    }
    return step >= currentStep;
  }, [currentStep, direction]);
  
  // Autoplay on mount
  useEffect(() => {
    if (autoPlay) {
      play();
    }
    
    return () => {
      cleanupTimeouts();
    };
  }, [autoPlay, cleanupTimeouts, play]);
  
  return {
    currentStep,
    isPlaying,
    play,
    pause,
    reset,
    shouldAnimateStep,
    delays
  };
};

export default useAnimationSequence; 







