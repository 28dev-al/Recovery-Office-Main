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

import * as React from 'react';;
import { forwardRef, useRef, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { ParallaxLayerProps } from './animation.d';
import { prefersReducedMotion, getFibonacciByIndex } from '../utils/animation';
import { mergeRefs } from '../utils/refs';

/**
 * ParallaxLayer Component with ref forwarding
 * 
 * Creates harmonic parallax scrolling effects based on sacred geometry
 */
export const ParallaxLayer = forwardRef<HTMLDivElement, ParallaxLayerProps>(
  ({ 
    children,
    speed = -0.5,
    horizontal = false,
    enabled = true,
    range = 100,
    ...rest
  }, ref) => {
    const internalRef = useRef<HTMLDivElement>(null);
    const [elementTop, setElementTop] = React.useState(0);
    const [viewportHeight, setViewportHeight] = React.useState(0);
    const [elementHeight, setElementHeight] = React.useState(0);
    
    // Check for reduced motion preference
    const shouldReduceMotion = prefersReducedMotion();
    
    // Disable parallax effect if reduced motion is preferred
    const isEffectivelyEnabled = enabled && !shouldReduceMotion;
    
    // Calculate range based on Fibonacci sequence for harmonious movement
    const effectiveRange = range || getFibonacciByIndex(8); // Default to Fibonacci number 34
    
    // Get scroll progress using Framer Motion
    const { scrollY, scrollX } = useScroll();
    
    // Update element position measurements using the internal ref
    React.useEffect(() => {
      if (!internalRef.current || !isEffectivelyEnabled) return;
      
      const updatePosition = () => {
        const element = internalRef.current;
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
    
    // Use useTransform at the component level, not in a nested function
    const transformValue = useTransform(
      scrollProgress,
      [
        elementTop - viewportHeight || 0,
        elementTop + elementHeight || 100
      ],
      [effectiveRange * -speed, effectiveRange * speed]
    );
    
    // Only apply transformValue when the effect is enabled
    const effectiveTransformValue = isEffectivelyEnabled ? transformValue : 0;
    
    // Apply transforms based on direction
    const transformX = horizontal ? effectiveTransformValue : 0;
    const transformY = horizontal ? 0 : effectiveTransformValue;
    
    // Memoize the merged ref callback for performance
    const combinedRef = useMemo(
      () => mergeRefs([internalRef, ref]),
      [ref]
    );
    
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
















