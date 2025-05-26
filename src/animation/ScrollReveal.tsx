/**
 * ScrollReveal Component
 * 
 * A component that reveals its children with an animation when they
 * enter the viewport. Uses sacred geometry principles for timing
 * and animation properties.
 * 
 * This component applies the Golden Ratio (PHI) to create naturally
 * pleasing reveal animations with harmonious timing.
 */

import * as React from 'react';;
import { motion, useAnimation, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { PHI_INVERSE, SACRED_EASINGS } from '../constants/sacred-geometry';
import { ScrollRevealProps } from './animation.d';
import { resolveDuration, applyGoldenRatioDuration, getAccessibleAnimationSettings } from '../utils/animation';

/**
 * ScrollReveal Component with ref forwarding
 * 
 * Animates its children when they enter the viewport
 */
export const ScrollReveal = React.forwardRef<HTMLDivElement, ScrollRevealProps>(
  ({ 
    children,
    variant = 'fade',
    duration = 'normal',
    delay = 0,
    easing = 'standard',
    threshold = 0.2,
    distance = 34, // Fibonacci number
    resetOnExit = false,
    rootMargin = "0px",
    initialScale = PHI_INVERSE,
    useGoldenRatio = true,
    ...rest
  }, ref) => {
    // Convert duration string to numerical value
    const durationValue = resolveDuration(duration);
    
    // Apply golden ratio to duration if enabled
    const effectiveDuration = useGoldenRatio 
      ? applyGoldenRatioDuration(durationValue) 
      : durationValue;
    
    // Check for accessibility settings
    const accessibleSettings = getAccessibleAnimationSettings(effectiveDuration, distance);
    
    // Animation controls
    const controls = useAnimation();
    
    // Track if element is in view
    const { ref: inViewRef, inView } = useInView({
      threshold,
      rootMargin,
      triggerOnce: !resetOnExit,
    });
    
    // Combine refs
    const combinedRef = (node: HTMLDivElement) => {
      inViewRef(node);
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    };
    
    // Run animation when inView changes
    React.useEffect(() => {
      if (inView) {
        controls.start('visible');
      } else if (resetOnExit) {
        controls.start('hidden');
      }
    }, [controls, inView, resetOnExit]);
    
    // Get animation variants based on the chosen type
    const getVariants = (): Variants => {
      // Use accessible values if reduced motion is preferred
      const { duration: finalDuration, distance: finalDistance, shouldAnimate } = accessibleSettings;
      
      // Disable animation completely if shouldAnimate is false
      if (!shouldAnimate) {
        return {
          hidden: { opacity: 1 },
          visible: { opacity: 1 }
        };
      }
      
      // Get the easing function from SACRED_EASINGS
      const easingValues = SACRED_EASINGS[easing];
      // Ensure the easing value is proper for Framer Motion
      const easingFunction = Array.isArray(easingValues) 
        ? easingValues 
        : [PHI_INVERSE, 0, 1 - PHI_INVERSE, 1]; // Default fallback
      
      // Create base transition settings
      const transition = {
        duration: finalDuration,
        delay,
        ease: easingFunction
      };
      
      // Return appropriate variants based on the animation type
      switch (variant) {
        case 'fade':
          return {
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition }
          };
          
        case 'slide-up':
          return {
            hidden: { y: finalDistance, opacity: 0 },
            visible: { y: 0, opacity: 1, transition }
          };
          
        case 'slide-down':
          return {
            hidden: { y: -finalDistance, opacity: 0 },
            visible: { y: 0, opacity: 1, transition }
          };
          
        case 'slide-left':
          return {
            hidden: { x: finalDistance, opacity: 0 },
            visible: { x: 0, opacity: 1, transition }
          };
          
        case 'slide-right':
          return {
            hidden: { x: -finalDistance, opacity: 0 },
            visible: { x: 0, opacity: 1, transition }
          };
          
        case 'scale':
          return {
            hidden: { scale: initialScale, opacity: 0 },
            visible: { scale: 1, opacity: 1, transition }
          };
          
        case 'scale-fade':
          return {
            hidden: { scale: initialScale, opacity: 0 },
            visible: { 
              scale: 1, 
              opacity: 1, 
              transition: {
                ...transition,
                scale: { ...transition, duration: finalDuration * 1.2 }
              }
            }
          };
          
        case 'none':
          return {
            hidden: {},
            visible: { transition }
          };
          
        default:
          return {
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition }
          };
      }
    };
    
    // Use the motion component directly with as prop
    return (
      <motion.div
        ref={combinedRef}
        initial="hidden"
        animate={controls}
        variants={getVariants()}
        style={{ willChange: 'transform, opacity' }} // Add performance optimization
        {...rest}
      >
        {children}
      </motion.div>
    );
  }
);

ScrollReveal.displayName = 'ScrollReveal';

export default ScrollReveal; 














