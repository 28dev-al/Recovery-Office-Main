/**
 * Sequence Component
 * 
 * Animates a sequence of child elements with staggered timing based on
 * sacred geometry principles. Uses Fibonacci timing for natural, 
 * harmonious animation sequences.
 */

import * as React from 'react';;
import { forwardRef, isValidElement, Children } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { PHI_INVERSE, FIBONACCI, SACRED_EASINGS } from '../constants/sacred-geometry';
import { BoxProps } from '../design-system/types/styled.types';

// Define types for the Sequence component
export type SequenceVariant = 'fade' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'scale' | 'none';

export interface SequenceProps extends Omit<BoxProps, 'as' | 'ref'> {
  /**
   * The children to animate in sequence
   */
  children: React.ReactNode;
  
  /**
   * Whether the sequence is visible
   * @default true
   */
  isVisible?: boolean;
  
  /**
   * Animation variant for child elements
   * @default 'fade'
   */
  variant?: SequenceVariant;
  
  /**
   * Delay between child animations in seconds
   * @default 0.1
   */
  staggerDelay?: number;
  
  /**
   * Whether to use Fibonacci sequence for stagger timing
   * @default true
   */
  useFibonacciStagger?: boolean;
  
  /**
   * Animation duration for each child in seconds
   * @default 0.5
   */
  duration?: number;
  
  /**
   * Easing function to use
   * @default 'standard'
   */
  easing?: keyof typeof SACRED_EASINGS;
  
  /**
   * Distance to move when using slide variants (in pixels)
   * @default 34 (Fibonacci number)
   */
  distance?: number;
  
  /**
   * Whether to animate on mount
   * @default true
   */
  animateOnMount?: boolean;
  
  /**
   * Container element to use
   * @default 'div'
   */
  containerElement?: keyof JSX.IntrinsicElements;
  
  /**
   * Whether to allow animations to overlap
   * @default false
   */
  allowOverlap?: boolean;
  
  /**
   * Whether to disable animations
   * @default false
   */
  disableAnimation?: boolean;
  
  /**
   * Direction of the sequence
   * @default 'forward'
   */
  direction?: 'forward' | 'reverse';
}

/**
 * Sequence component with ref forwarding
 * Creates natural staggered animations for child elements
 */
export const Sequence = forwardRef<HTMLDivElement, SequenceProps>(
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
    // containerElement = 'div', // Unused prop
    // allowOverlap = false, // Unused prop
    disableAnimation = false,
    direction = 'forward',
    ...rest
  }, ref) => {
    // Track whether the component has mounted
    const [hasMounted, setHasMounted] = React.useState(false);
    
    // Set mounted state on initial render
    React.useEffect(() => {
      setHasMounted(true);
    }, []);
    
    // Should we animate (based on props and mount state)
    const shouldAnimate = !disableAnimation && (animateOnMount || hasMounted);
    
    // Get child count for stagger calculations
    const childCount = Children.count(children);
    
    // Get the easing function from SACRED_EASINGS
    const easingValues = SACRED_EASINGS[easing];
    // Ensure the easing value is an array
    const easingFunction = Array.isArray(easingValues) 
      ? easingValues 
      : [PHI_INVERSE, 0, 1 - PHI_INVERSE, 1]; // Default fallback
    
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
    
    // Get variants for the animation type
    const childVariants = getVariants(variant, distance, duration, easingFunction);
    
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
    const processedChildren = Children.map(children, (child, index) => {
      if (!isValidElement(child)) return child;
      
      // Skip animation if disabled
      if (disableAnimation) return child;
      
      const delay = getCustomDelay(index);
      
      // Create custom variants with the calculated delay
      const customVariants = {
        ...childVariants,
        visible: {
          ...childVariants.visible,
          transition: childVariants.visible && 'transition' in childVariants.visible
            ? { ...childVariants.visible.transition, delay }
            : { delay }
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
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isVisible && shouldAnimate ? "visible" : "hidden"}
        {...rest}
      >
        <AnimatePresence mode="wait">
          {isVisible && processedChildren}
        </AnimatePresence>
      </motion.div>
    );
  }
);

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
  
  // For Fibonacci staggering, use the ratio of Fibonacci numbers for more natural timing
  const fibValues = Object.values(FIBONACCI);
  const fibonacciIndex = Math.min(effectiveIndex + 3, fibValues.length - 1);
  const fibValue = fibValues[fibonacciIndex] || 1;
  
  // Get the sum of the Fibonacci numbers up to the total number of children
  const maxFibIndex = Math.min(total + 2, fibValues.length - 1);
  const fibSum = fibValues.slice(0, maxFibIndex + 1).reduce((sum, num) => sum + num, 0) || 1;
  
  // Calculate a proportional delay based on the Fibonacci sequence
  const proportionalDelay = fibValue / fibSum;
  
  // Apply the base delay, scale by PHI for harmony
  return proportionalDelay * baseDelay * total * PHI_INVERSE;
};

/**
 * Get animation variants based on the selected animation type
 */
const getVariants = (variant: SequenceVariant, distance: number, duration: number, easing: number[]): Variants => {
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
        hidden: { scale: PHI_INVERSE, opacity: 0 },
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

Sequence.displayName = 'Sequence';

export default Sequence; 















