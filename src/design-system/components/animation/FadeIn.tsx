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
import { motion, AnimatePresence, Variants } from 'framer-motion';

import { FadeInProps } from '../../types/animation.types';
import { resolveDuration, applyGoldenRatioDuration } from '../../../utils/animation';
import { SACRED_EASINGS } from '../../../constants/sacred-geometry';

/**
 * FadeIn Component with ref forwarding
 * 
 * Animates its children with a fade effect using sacred timing
 */
export const FadeIn = React.forwardRef<HTMLDivElement, FadeInProps>(
  ({ 
    children,
    isVisible = true,
    duration = 'normal',
    delay = 0,
    easing = 'standard',
    useGoldenRatio = true,
    initialOpacity = 0,
    stayMounted = false,
    scale,
    ...rest
  }, ref) => {
    // Convert duration string to numerical value if needed
    const durationValue = resolveDuration(duration);
    
    // Apply golden ratio to duration if enabled, creating more natural timing
    const effectiveDuration = useGoldenRatio 
      ? applyGoldenRatioDuration(durationValue) 
      : durationValue;
    
    // Create animation variants based on props
    const variants: Variants = {
      visible: { 
        opacity: 1,
        scale: 1,
        transition: {
          duration: effectiveDuration,
          delay,
          ease: SACRED_EASINGS[easing as keyof typeof SACRED_EASINGS],
        }
      },
      hidden: { 
        opacity: initialOpacity,
        scale: scale || 1,
        transition: {
          duration: effectiveDuration,
          ease: SACRED_EASINGS[easing as keyof typeof SACRED_EASINGS],
        }
      }
    };
    
    return (
      <AnimatePresence mode="wait">
        {(isVisible || stayMounted) && (
          <motion.div
            ref={ref}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            exit="hidden"
            variants={variants}
            style={{
              display: (!isVisible && stayMounted) ? 'none' : undefined,
            }}
            {...rest}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
);

FadeIn.displayName = 'FadeIn';

export default FadeIn; 








