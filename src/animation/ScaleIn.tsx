import * as React from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { 
  useAnimationDuration, 
  useAnimationEasing, 
  useShouldAnimate,
  useStaggerDelay
} from '../context/AnimationContext';
import { PHI_INVERSE } from '../constants/sacred-geometry';

interface ScaleInProps {
  children: React.ReactNode;
  initialScale?: number;
  delay?: number;
  duration?: 'fast' | 'medium' | 'slow';
  staggerIndex?: number;
  threshold?: number;
  once?: boolean;
  className?: string;
  origin?: string;
  onAnimationComplete?: () => void;
}

export const ScaleIn: React.FC<ScaleInProps> = ({
  children,
  initialScale = PHI_INVERSE, // Using golden ratio inverse for natural scaling
  delay = 0,
  duration = 'medium',
  staggerIndex,
  threshold = 0.1,
  once = true,
  className = '',
  origin = 'center',
  onAnimationComplete,
}) => {
  // Get animation settings from context
  const animationDuration = useAnimationDuration(duration);
  const easing = useAnimationEasing('elastic');
  const shouldAnimate = useShouldAnimate();
  
  // Calculate total delay including stagger if present
  const staggerDelay = useStaggerDelay(staggerIndex ?? 0);
  const totalDelay = delay + staggerDelay;

  // If animations are disabled, render children directly
  if (!shouldAnimate) {
    return <>{children}</>;
  }

  const variants: Variants = {
    hidden: {
      opacity: 0,
      scale: initialScale,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: animationDuration / 1000, // Convert to seconds for framer-motion
        delay: totalDelay / 1000,
        ease: easing,
      },
    },
  };

  return (
    <AnimatePresence>
      <motion.div
        className={className}
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={variants}
        style={{ 
          transformOrigin: origin,
          display: 'inline-flex' 
        }}
        viewport={{ once, amount: threshold }}
        onAnimationComplete={() => { 
          if (onAnimationComplete) onAnimationComplete(); 
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default ScaleIn; 
















