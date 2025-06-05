/**
 * ScrollReveal Component
 * 
 * A component that reveals its children with an animation when they
 * enter the viewport. Uses safe animations to prevent Framer Motion errors.
 */

import * as React from 'react';
import { motion, useAnimation, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { PROFESSIONAL_ANIMATIONS } from '../utils/animations';
import { ScrollRevealProps } from './animation.d';

/**
 * ScrollReveal Component with ref forwarding and safe animations
 */
export const ScrollReveal = React.forwardRef<HTMLDivElement, ScrollRevealProps>(
  ({ 
    children,
    variant = 'fade',
    duration = 'normal',
    delay = 0,
    threshold = 0.2,
    distance = 30,
    resetOnExit = false,
    rootMargin = "0px",
    initialScale = 0.95,
    ...rest
  }, ref) => {
    
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
    
    // Check for reduced motion preference
    const prefersReducedMotion = React.useMemo(() => {
      return typeof window !== 'undefined' && 
             window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }, []);
    
    // Get safe animation variants
    const getVariants = (): Variants => {
      // Disable animation completely if reduced motion is preferred
      if (prefersReducedMotion) {
        return {
          hidden: { opacity: 1 },
          visible: { opacity: 1 }
        };
      }
      
      // Get safe duration based on duration prop
      const getDurationValue = (duration: string | number): number => {
        if (typeof duration === 'number') return duration;
        switch (duration) {
          case 'fast': return 0.3;
          case 'normal': return 0.6;
          case 'slow': return 0.9;
          default: return 0.6;
        }
      };
      
      const durationValue = getDurationValue(duration);
      
      // Create safe transition settings
      const transition = {
        duration: durationValue,
        delay,
        ease: "easeOut" // Use safe string easing
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
            hidden: { y: distance, opacity: 0 },
            visible: { y: 0, opacity: 1, transition }
          };
          
        case 'slide-down':
          return {
            hidden: { y: -distance, opacity: 0 },
            visible: { y: 0, opacity: 1, transition }
          };
          
        case 'slide-left':
          return {
            hidden: { x: distance, opacity: 0 },
            visible: { x: 0, opacity: 1, transition }
          };
          
        case 'slide-right':
          return {
            hidden: { x: -distance, opacity: 0 },
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
                scale: { ...transition, duration: durationValue * 1.2 }
              }
            }
          };
          
        case 'none':
          return {
            hidden: {},
            visible: { transition }
          };
          
        default:
          // Use pre-defined safe animation variant
          return PROFESSIONAL_ANIMATIONS.variants.fadeIn;
      }
    };
    
    // Wrap in error boundary with fallback
    try {
      return (
        <motion.div
          ref={combinedRef}
          initial="hidden"
          animate={controls}
          variants={getVariants()}
          style={{ willChange: 'transform, opacity' }}
          {...rest}
        >
          {children}
        </motion.div>
      );
    } catch (error) {
      console.warn('ScrollReveal animation failed:', error);
      // Fallback to non-animated version
      return (
        <div ref={combinedRef} {...rest}>
          {children}
        </div>
      );
    }
  }
);

ScrollReveal.displayName = 'ScrollReveal';

export default ScrollReveal; 














