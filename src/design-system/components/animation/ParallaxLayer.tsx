// TODO: This file contains direct window access without SSR checks
/**
 * ParallaxLayer Component
 * 
 * A component that creates parallax scrolling effects, where elements
 * move at different speeds as the user scrolls. Uses sacred geometry 
 * principles for natural, harmonious movement.
 * 
 * The component applies the Golden Ratio (PHI) to create naturally
 * pleasing parallax effects with harmonious depth perception.
 */

import * as React from 'react';
import { useState, useEffect, useRef } from 'react';;
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

import { ParallaxLayerProps } from '../../types/animation.types';
import { prefersReducedMotion } from '../../../utils/animation';
import { mergeRefs } from '../../../utils/refs';
import { FIBONACCI, FibonacciIndex } from '../../../constants/sacred-geometry';

// Helper function to safely access Fibonacci values by index
const getFibonacciByIndex = (index: number): number => {
  const fibKeys = Object.keys(FIBONACCI).map(Number).sort((a, b) => a - b);
  const safeIndex = Math.max(0, Math.min(index, fibKeys.length - 1));
  return FIBONACCI[fibKeys[safeIndex] as FibonacciIndex] || 1;
};

/**
 * ParallaxLayer Component with ref forwarding
 * 
 * Creates harmonic parallax scrolling effects based on sacred geometry
 */
export const ParallaxLayer = React.forwardRef<HTMLDivElement, ParallaxLayerProps>(
  ({ 
    children,
    speed = -0.5,
    horizontal = false,
    range = 100,
    enabled = true,
    ...rest
  }, ref) => {
    const elementRef = useRef<HTMLDivElement>(null);
    const [elementTop, setElementTop] = useState(0);
    const [viewportHeight, setViewportHeight] = useState(0);
    const [elementHeight, setElementHeight] = useState(0);
    
    // Check for reduced motion preference
    const shouldReduceMotion = prefersReducedMotion();
    
    // Disable parallax effect if reduced motion is preferred
    const isEffectivelyEnabled = enabled && !shouldReduceMotion;
    
    // Calculate range based on Fibonacci sequence for harmonious movement
    const effectiveRange = range || getFibonacciByIndex(9); // 34px (9th Fibonacci number)
    
    // Get scroll progress using Framer Motion
    const { scrollY, scrollX } = useScroll();
    
    // Update element position measurements
    useEffect(() => {
      if (!elementRef.current || !isEffectivelyEnabled) return;
      
      const updatePosition = () => {
        const element = elementRef.current;
        if (!element) return;
        
        const { top, height } = element.getBoundingClientRect();
        setElementTop(top + window.scrollY);
        setElementHeight(height);
        setViewportHeight(window.innerHeight);
      };
      
      updatePosition();
      window.addEventListener('resize', updatePosition);
      
      return () => {
        window.removeEventListener('resize', updatePosition);
      };
    }, [isEffectivelyEnabled]);
    
    // Create scroll-based transformations
    const scrollProgress = horizontal ? scrollX : scrollY;
    
    // Create the transform value at the component level (not in a nested function)
    const transformValue = useTransform(
      scrollProgress,
      [
        elementTop - viewportHeight,
        elementTop + elementHeight
      ],
      [effectiveRange * -speed, effectiveRange * speed]
    );
    
    // Only use transform when effect is enabled
    const effectiveTransformValue = isEffectivelyEnabled ? transformValue : 0;
    
    // Apply transforms based on direction
    const transformX = horizontal ? effectiveTransformValue : 0;
    const transformY = horizontal ? 0 : effectiveTransformValue;
    
    // Use mergeRefs utility to combine refs safely
    const combinedRef = mergeRefs([elementRef, ref]);
    
    return (
      <motion.div
        ref={combinedRef}
        style={{ 
          x: transformX,
          y: transformY,
          willChange: 'transform' // Performance optimization
        }}
        {...rest}
      >
        {children}
      </motion.div>
    );
  }
);

ParallaxLayer.displayName = 'ParallaxLayer';

export default ParallaxLayer; 









