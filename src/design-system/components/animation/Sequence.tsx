/**
 * Sequence Component
 * 
 * Animates a sequence of child elements with staggered timing based on
 * sacred geometry principles. Uses Fibonacci timing for natural, 
 * harmonious animation sequences.
 */

import * as React from 'react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import styled from 'styled-components';
import { PHI_INVERSE, FIBONACCI, SACRED_EASINGS } from '../../../constants/sacred-geometry';
import type { SequenceProps, SequenceVariant, EasingValue } from '../../types/animation.types';

// Create styled motion.div that inherits Box styling system
const StyledMotionDiv = styled(motion.div)``;

/**
 * Sequence component with ref forwarding
 * Creates natural staggered animations for child elements
 */
export const Sequence = React.forwardRef<HTMLDivElement, SequenceProps>(
  ({
    children,
    isVisible = true,
    variant = 'fade',
    staggerDelay = 0.1,
    useFibonacciStagger = true,
    duration = 0.5,
    easing = 'standard',
    distance = 34, // Fibonacci number
    animateOnMount = true,
    disableAnimation = false,
    direction = 'forward',
    style,
    ...rest
  }, ref) => {
    // Track whether the component has mounted
    const [hasMounted, setHasMounted] = useState(false);
    
    // Set mounted state on initial render
    useEffect(() => {
      setHasMounted(true);
    }, []);
    
    // Should we animate (based on props and mount state)
    const shouldAnimate = !disableAnimation && (animateOnMount || hasMounted);
    
    // Get child count for stagger calculations
    const childCount = React.Children.count(children);
    
    // Variants for the container
    const containerVariants: Variants = {
      hidden: {},
      visible: {
        transition: {
          staggerChildren: staggerDelay,
          delayChildren: 0,
          staggerDirection: direction === 'reverse' ? -1 : 1,
        },
      },
    };
    
    // Handle custom easing function or use predefined sacred easing
    const easingValue = typeof easing === 'function' 
      ? easing  // If it's a function, pass it directly
      : easing; // If it's a string, just pass the name directly
    
    // Get variants for the animation type
    const childVariants = getVariants(variant, distance, typeof duration === 'string' ? 0.5 : duration, easingValue);
    
    // Create a function to modify the delay for each child
    const getCustomDelay = (index: number) => {
      return calculateStaggerDelay(
        index,
        childCount,
        staggerDelay,
        useFibonacciStagger,
        direction
      );
    };
    
    // Process children to add animation properties
    const processedChildren = React.Children.map(children, (child, index) => {
      if (!React.isValidElement(child)) return child;
      
      // Skip animation if disabled
      if (disableAnimation) return child;
      
      const delay = getCustomDelay(index);
      
      // Create custom variants with the calculated delay
      const customVariants = {
        ...childVariants,
        visible: {
          ...childVariants.visible,
          transition: typeof childVariants.visible === 'function' 
            ? undefined 
            : {
                ...(childVariants.visible && 'transition' in childVariants.visible 
                  ? childVariants.visible.transition 
                  : {}),
                delay,
              },
        },
      };
      
      // Wrap the child in a motion div with the custom variants
      return (
        <motion.div
          key={`sequence-item-${index}`}
          custom={index}
          variants={customVariants}
          initial="hidden"
          animate={isVisible && shouldAnimate ? "visible" : "hidden"}
          exit="hidden"
          style={{ 
            display: 'contents', 
            willChange: 'transform, opacity' // Performance optimization
          }}
        >
          {child}
        </motion.div>
      );
    });
    
    return (
      <StyledMotionDiv
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isVisible && shouldAnimate ? "visible" : "hidden"}
        style={{
          ...style
        }}
        {...rest}
      >
        <AnimatePresence mode="wait">
          {isVisible && processedChildren}
        </AnimatePresence>
      </StyledMotionDiv>
    );
  }
);

Sequence.displayName = 'Sequence';

/**
 * Calculate stagger delay for each child element
 * Uses Fibonacci sequence for natural timing
 */
const calculateStaggerDelay = (
  index: number, 
  total: number, 
  baseDelay: number, 
  useFibonacci: boolean,
  direction: SequenceProps['direction']
): number => {
  // Adjust index for reverse direction
  const effectiveIndex = direction === 'reverse' ? total - 1 - index : index;
  
  // For standard staggering, just multiply by the base delay
  if (!useFibonacci) {
    return effectiveIndex * baseDelay;
  }
  
  // Convert FIBONACCI object to array for safer access
  const fibValues = Object.values(FIBONACCI);
  
  // For Fibonacci staggering, use the ratio of Fibonacci numbers for more natural timing
  const fibonacciIndex = Math.min(effectiveIndex + 3, fibValues.length - 1);
  const fibValue = fibValues[fibonacciIndex] ?? 1;
  
  // Get the sum of the Fibonacci numbers up to the total number of children
  const maxFibIndex = Math.min(total + 2, fibValues.length - 1);
  const fibSum = fibValues.slice(3, maxFibIndex + 1).reduce((sum, num) => sum + num, 0);
  
  // Calculate a proportional delay based on the Fibonacci sequence
  const proportionalDelay = fibValue / (fibSum || 1);
  
  // Apply the base delay, scale by PHI for harmony
  return proportionalDelay * baseDelay * total * PHI_INVERSE;
};

/**
 * Get animation variants based on the selected animation type
 */
const getVariants = (
  variant: SequenceVariant, 
  distance: number, 
  duration: number, 
  easing: any // Change from EasingValue to any to accommodate Framer Motion's easing types
): Variants => {
  // Base transition to use across variants
  const baseTransition = {
    duration,
    ease: easing,
  };
  
  // Return appropriate variants based on the animation type
  switch (variant) {
    case 'fade':
      return {
        hidden: { opacity: 0 },
        visible: { 
          opacity: 1,
          transition: baseTransition
        },
      };
      
    case 'slide-up':
      return {
        hidden: { y: distance, opacity: 0 },
        visible: { 
          y: 0, 
          opacity: 1,
          transition: baseTransition
        },
      };
      
    case 'slide-down':
      return {
        hidden: { y: -distance, opacity: 0 },
        visible: { 
          y: 0, 
          opacity: 1,
          transition: baseTransition
        },
      };
      
    case 'slide-left':
      return {
        hidden: { x: distance, opacity: 0 },
        visible: { 
          x: 0, 
          opacity: 1,
          transition: baseTransition
        },
      };
      
    case 'slide-right':
      return {
        hidden: { x: -distance, opacity: 0 },
        visible: { 
          x: 0, 
          opacity: 1,
          transition: baseTransition
        },
      };
      
    case 'scale':
      return {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { 
          scale: 1, 
          opacity: 1,
          transition: baseTransition
        },
      };
      
    case 'none':
      return {
        hidden: {},
        visible: {
          transition: baseTransition
        },
      };
      
    default:
      return {
        hidden: { opacity: 0 },
        visible: { 
          opacity: 1,
          transition: baseTransition
        },
      };
  }
};

export default Sequence; 







