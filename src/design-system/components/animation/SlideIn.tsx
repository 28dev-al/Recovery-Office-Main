/**
 * SlideIn Component
 * 
 * A component that animates content entering from a specific direction
 * using sacred geometry principles for natural, harmonious motion.
 * 
 * The component applies the Golden Ratio (PHI) to create naturally
 * pleasing animations with harmonious timing and proportions.
 */

import * as React from 'react';
import { motion, AnimatePresence, Variants, ForwardRefComponent, MotionProps } from 'framer-motion';
import { PHI_INVERSE, SACRED_EASINGS } from '../../../constants/sacred-geometry';
import Box from '../layout/Box';
import { SlideInProps, SlideDirection } from '../../types/animation.types';
import { resolveDuration, applyGoldenRatioDuration } from '../../../utils/animation';
import { BoxProps } from '../../types/styled.types';

/**
 * Create a typed motion Box component
 * This resolves the type compatibility issues between Box props and motion props
 */
const MotionBox = motion(Box) as ForwardRefComponent<HTMLDivElement, BoxProps & MotionProps>;

/**
 * Get directional offsets based on the slide direction
 */
const getDirectionalOffsets = (direction: SlideDirection, distance: number): Record<string, number> => {
  switch (direction) {
    case 'up':
      return { y: distance };
    case 'down':
      return { y: -distance };
    case 'left':
      return { x: distance };
    case 'right':
      return { x: -distance };
    default:
      return { y: distance };
  }
};

/**
 * SlideIn Component with ref forwarding
 * 
 * Animates its children with a slide effect from the specified direction
 */
export const SlideIn = React.forwardRef<HTMLDivElement, SlideInProps>(
  ({ 
    children,
    isVisible = true,
    direction = 'up',
    distance = 34, // Fibonacci number
    duration = 'normal',
    delay = 0,
    easing = 'standard',
    withFade = true,
    initialOpacity = 0,
    stayMounted = false,
    ...rest
  }, ref) => {
    // Convert duration string to numerical value
    const durationValue = resolveDuration(duration);
    
    // Apply golden ratio to duration for natural timing
    const effectiveDuration = applyGoldenRatioDuration(durationValue);
    
    // Get directional offsets based on direction
    const directionalOffsets = getDirectionalOffsets(direction, distance);
    
    // Handle custom easing function or use predefined sacred easing
    const easingValue = typeof easing === 'function' 
      ? easing
      : SACRED_EASINGS[easing as keyof typeof SACRED_EASINGS] || SACRED_EASINGS.standard;
    
    // Create animation variants
    const variants: Variants = {
      visible: { 
        ...Object.fromEntries(Object.entries(directionalOffsets).map(([key, _]) => [key, 0])),
        opacity: 1,
        transition: {
          duration: effectiveDuration,
          delay,
          ease: easingValue,
        }
      },
      hidden: { 
        ...directionalOffsets,
        opacity: withFade ? initialOpacity : 1,
        transition: {
          duration: effectiveDuration * PHI_INVERSE, // Slightly shorter for exit
          ease: easingValue,
        }
      }
    };
    
    // Define motion props
    const motionProps = {
      initial: "hidden",
      animate: isVisible ? "visible" : "hidden",
      exit: "hidden",
      variants
    };
    
    // If not visible but should stay mounted, return a hidden div
    if (!isVisible && stayMounted) {
      return (
        <MotionBox 
          ref={ref}
          display="none"
          {...rest}
        >
          {children}
        </MotionBox>
      );
    }
    
    // Otherwise, return the animated component
    return (
      <AnimatePresence mode="wait">
        {isVisible && (
          <MotionBox
            ref={ref}
            {...motionProps}
            {...rest}
          >
            {children}
          </MotionBox>
        )}
      </AnimatePresence>
    );
  }
);

SlideIn.displayName = 'SlideIn';

export default SlideIn;








