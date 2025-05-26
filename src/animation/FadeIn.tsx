/**
 * FadeIn Component
 * 
 * A component that gradually reveals its children with a fade animation
 * using sacred geometry principles for timing and easing.
 * 
 * This component uses the golden ratio (PHI) for natural, harmonious
 * animation timing and easing functions derived from sacred geometry.
 */

import * as React from 'react';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  useAnimationDuration, 
  useAnimationEasing,
  useStaggerDelay,
  useShouldAnimate,
  AnimationDuration,
  AnimationEasing
} from '../context/AnimationContext';

export interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: AnimationDuration;
  easing?: AnimationEasing;
  staggerIndex?: number;
  threshold?: number;
  once?: boolean;
  className?: string;
  onAnimationComplete?: () => void;
  initialOpacity?: number;
  targetOpacity?: number;
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0,
  duration,
  easing,
  staggerIndex = 0,
  threshold = 0.2,
  once = true,
  className = '',
  onAnimationComplete,
  initialOpacity = 0,
  targetOpacity = 1
}) => {
  const shouldAnimate = useShouldAnimate();
  const animationDuration = useAnimationDuration(duration);
  const animationEasing = useAnimationEasing(easing);
  const staggerDelay = useStaggerDelay(staggerIndex);
  
  // Calculate total delay including base delay and stagger
  const totalDelay = delay + staggerDelay;
  
  // Reference for intersection observer
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: threshold, once });

  // If animations are disabled, render children directly
  if (!shouldAnimate) {
    return <div ref={ref} className={className}>{children}</div>;
  }

  // Animation variants
  const variants = {
    hidden: {
      opacity: initialOpacity
    },
    visible: {
      opacity: targetOpacity,
      transition: {
        duration: animationDuration / 1000, // Convert ms to seconds for framer-motion
        delay: totalDelay / 1000,
        ease: animationEasing
      }
    }
  };

  return (
    <motion.div
      ref={ref}
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

export default FadeIn; 












