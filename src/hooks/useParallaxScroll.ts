// TODO: This file contains direct window access without SSR checks
/**
 * useParallaxScroll Hook
 * 
 * This hook creates parallax scrolling effects based on sacred geometry principles.
 * It uses the Golden Ratio to create natural, harmonious depth effects that respond
 * to scroll position.
 */

import { useState, useEffect, useRef, RefObject } from 'react';
import { PHI, PHI_INVERSE } from '../constants/sacred-geometry';
import { useReducedMotion } from './useReducedMotion';

export interface ParallaxOptions {
  /**
   * Speed factor for the parallax effect
   * - Positive values: element moves slower than scroll (background effect)
   * - Negative values: element moves faster than scroll (foreground effect)
   * - 0: element moves at normal scroll speed
   * @default -0.5
   */
  speed?: number;
  
  /**
   * Whether to apply the effect on the horizontal axis instead of vertical
   * @default false
   */
  horizontal?: boolean;
  
  /**
   * Whether to apply golden ratio principles to the parallax effect
   * @default true
   */
  useGoldenRatio?: boolean;
  
  /**
   * Range of motion in pixels for the parallax effect
   * @default 100
   */
  range?: number;
  
  /**
   * Offset for where the parallax effect starts (0-1)
   * 0 = top of viewport, 1 = bottom of viewport
   * @default 0.5
   */
  offset?: number;
  
  /**
   * Whether to enable or disable the parallax effect
   * @default true
   */
  enabled?: boolean;
  
  /**
   * Element to use as the scroll container
   * @default window
   */
  scrollContainer?: RefObject<HTMLElement> | null;
  
  /**
   * Whether to apply easing to the parallax effect
   * @default true
   */
  useEasing?: boolean;
}

export interface ParallaxResult {
  /**
   * The calculated transform value to apply to the element
   */
  transform: string;
  
  /**
   * Reference to attach to the element being parallaxed
   */
  ref: RefObject<HTMLElement>;
  
  /**
   * Current progress value (0-1) of the element through the viewport
   */
  progress: number;
  
  /**
   * Whether the element is currently in the viewport
   */
  inView: boolean;
}

/**
 * Hook for creating parallax scrolling effects based on sacred geometry
 * 
 * @param options - Configuration options for the parallax effect
 * @returns Parallax controller and calculated transform values
 */
export const useParallaxScroll = ({
  speed = -0.5,
  horizontal = false,
  useGoldenRatio = true,
  range = 100,
  offset = 0.5,
  enabled = true,
  scrollContainer = null,
  useEasing = true
}: ParallaxOptions = {}): ParallaxResult => {
  const [transform, setTransform] = useState('translate3d(0, 0, 0)');
  const [progress, setProgress] = useState(0);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const { prefersReducedMotion } = useReducedMotion();
  
  // Adjust range and speed if using golden ratio
  const effectiveRange = useGoldenRatio ? range * PHI_INVERSE : range;
  const effectiveSpeed = useGoldenRatio ? speed * PHI : speed;
  
  // Disable parallax if user prefers reduced motion
  const isEnabled = enabled && !prefersReducedMotion;
  
  useEffect(() => {
    if (!isEnabled || !ref.current) {
      return;
    }
    
    const element = ref.current;
    const container = scrollContainer?.current || window;
    
    const calculateTransform = () => {
      // Get element's position relative to the viewport
      const rect = element.getBoundingClientRect();
      
      // Get viewport dimensions
      const viewportHeight = container === window ? window.innerHeight : (container as HTMLElement).clientHeight;
      const viewportWidth = container === window ? window.innerWidth : (container as HTMLElement).clientWidth;
      
      // Calculate the element's position in the viewport
      const viewportSize = horizontal ? viewportWidth : viewportHeight;
      const elementSize = horizontal ? rect.width : rect.height;
      const elementPosition = horizontal ? rect.left : rect.top;
      
      // Calculate the progress through the viewport (0 to 1)
      const viewportProgress = 1 - (elementPosition + elementSize * offset) / viewportSize;
      
      // Clamp the progress value between 0 and 1
      const clampedProgress = Math.max(0, Math.min(1, viewportProgress));
      setProgress(clampedProgress);
      
      // Check if the element is in view
      const elementIsInView = 
        (horizontal ? rect.right > 0 && rect.left < viewportWidth : rect.bottom > 0 && rect.top < viewportHeight);
      setInView(elementIsInView);
      
      // If not in view, don't calculate parallax
      if (!elementIsInView) {
        return;
      }
      
      // Calculate the parallax offset
      // Use a sine curve for easing if enabled (creates natural motion)
      let parallaxOffset;
      if (useEasing) {
        // Use a sine-based easing curve for more natural motion
        const easedProgress = Math.sin((clampedProgress - 0.5) * Math.PI) * 0.5 + 0.5;
        parallaxOffset = (easedProgress - 0.5) * effectiveRange * effectiveSpeed;
      } else {
        // Linear motion
        parallaxOffset = (clampedProgress - 0.5) * effectiveRange * effectiveSpeed;
      }
      
      // Apply transform based on direction
      const transformValue = horizontal
        ? `translate3d(${parallaxOffset}px, 0, 0)`
        : `translate3d(0, ${parallaxOffset}px, 0)`;
      
      setTransform(transformValue);
    };
    
    // Calculate initial transform
    calculateTransform();
    
    // Setup scroll event listener
    const handleScroll = () => {
      requestAnimationFrame(calculateTransform);
    };
    
    // Add event listener to container
    if (container === window) {
      window.addEventListener('scroll', handleScroll, { passive: true });
      window.addEventListener('resize', handleScroll, { passive: true });
    } else {
      (container as HTMLElement).addEventListener('scroll', handleScroll, { passive: true });
      window.addEventListener('resize', handleScroll, { passive: true });
    }
    
    // Clean up event listeners
    return () => {
      if (container === window) {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleScroll);
      } else {
        (container as HTMLElement).removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleScroll);
      }
    };
  }, [
    isEnabled, 
    horizontal, 
    effectiveRange, 
    effectiveSpeed, 
    offset, 
    scrollContainer, 
    useEasing
  ]);
  
  return {
    transform,
    ref,
    progress,
    inView
  };
};

export default useParallaxScroll; 






