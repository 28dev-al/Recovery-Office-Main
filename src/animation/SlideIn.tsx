/**
 * SlideIn Component
 * 
 * A component that animates content entering from a specific direction
 * using sacred geometry principles for natural, harmonious motion.
 * 
 * The component applies the Golden Ratio (PHI) to create naturally
 * pleasing animations with harmonious timing and proportions.
 */

import * as React from 'react';;
import { motion, useInView } from 'framer-motion';
import { 
  useAnimationDuration, 
  useAnimationEasing,
  useStaggerDelay,
  useShouldAnimate,
  AnimationDuration,
  AnimationEasing
} from '../context/AnimationContext';
import { useRef } from 'react';

// Direction options for the slide animation
export type SlideDirection = 'up' | 'down' | 'left' | 'right' | 'top';

export interface SlideInProps {
  children: React.ReactNode;
  direction?: SlideDirection;
  distance?: number;
  delay?: number;
  duration?: AnimationDuration;
  easing?: AnimationEasing;
  staggerIndex?: number;
  threshold?: number;
  once?: boolean;
  className?: string;
  onAnimationComplete?: () => void;
  withFade?: boolean;
}

export const SlideIn: React.FC<SlideInProps> = ({
  children,
  direction = 'up',
  distance = 50,
  delay = 0,
  duration,
  easing,
  staggerIndex = 0,
  threshold = 0.2,
  once = true,
  className = '',
  onAnimationComplete,
  withFade = true
}) => {
  const shouldAnimate = useShouldAnimate();
  const animationDuration = useAnimationDuration(duration);
  const animationEasing = useAnimationEasing(easing);
  const staggerDelay = useStaggerDelay(staggerIndex);
  
  // Calculate total delay including base delay and stagger
  const totalDelay = delay + staggerDelay;
  
  // Reference for intersection observer
  const slideRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(slideRef, { amount: threshold, once });
  
  // If animations are disabled, render children directly
  if (!shouldAnimate) {
    return <div className={className}>{children}</div>;
  }

  // Determine initial position based on direction
  const getInitialOffset = () => {
    switch (direction) {
      case 'up':
      case 'top': return { y: distance }; // Map 'top' to 'up' behavior
      case 'down': return { y: -distance };
      case 'left': return { x: distance };
      case 'right': return { x: -distance };
      default: return { y: distance };
    }
  };

  // Animation variants
  const variants = {
    hidden: {
      ...getInitialOffset(),
      opacity: withFade ? 0 : 1
    },
    visible: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        duration: animationDuration / 1000, // Convert ms to seconds for framer-motion
        delay: totalDelay / 1000,
        ease: animationEasing
      }
    }
  };

  return (
    <motion.div
      ref={slideRef}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      onAnimationComplete={() => {
        if (isInView && onAnimationComplete) {
          onAnimationComplete();
        }
      }}
    >
      {children}
    </motion.div>
  );
};

export default SlideIn;













