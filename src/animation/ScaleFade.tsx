/**
 * ScaleFade Component
 * 
 * A component that combines scaling and fading animations for smooth
 * entrance and exit animations, using sacred geometry principles.
 * 
 * The component applies the Golden Ratio (PHI) to create naturally
 * pleasing animations with harmonious timing and proportions.
 */

import { forwardRef } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { PHI, PHI_INVERSE, SACRED_EASINGS } from '../constants/sacred-geometry';
import { ScaleFadeProps } from './animation.d';
import { resolveDuration, applyGoldenRatioDuration } from '../utils/animation';

/**
 * ScaleFade Component with ref forwarding
 * 
 * Combines scale and fade animations with sacred geometry principles
 */
export const ScaleFade = forwardRef<HTMLDivElement, ScaleFadeProps>(
  ({ 
    children,
    isVisible = true,
    duration = 'normal',
    delay = 0,
    easing = 'standard',
    initialScale = PHI_INVERSE, // Golden ratio inverse (0.618) for natural scaling
    finalScale = 1,
    initialOpacity = 0,
    stayMounted = false,
    transformOrigin = 'center',
    reverse = false,
    ...rest
  }, ref) => {
    // Convert duration string to numerical value if needed
    const durationValue = resolveDuration(duration);
    
    // Apply golden ratio to duration for natural timing
    const effectiveDuration = applyGoldenRatioDuration(durationValue);
    
    // For reverse animation, swap the scale values
    const scaleValues = reverse
      ? { initial: finalScale, final: initialScale }
      : { initial: initialScale, final: finalScale };
    
    // Get the easing function from SACRED_EASINGS
    const easingValues = SACRED_EASINGS[easing];
    // Ensure the easing value is an array
    const easingFunction = Array.isArray(easingValues) 
      ? easingValues 
      : [PHI_INVERSE, 0, 1 - PHI_INVERSE, 1]; // Default fallback
    
    // Create animation variants with sacred timing
    const variants: Variants = {
      visible: { 
        opacity: 1,
        scale: scaleValues.final,
        transition: {
          opacity: {
            duration: effectiveDuration,
            delay,
            ease: easingFunction,
          },
          scale: {
            duration: effectiveDuration * PHI, // Slightly longer for scale (golden ratio)
            delay,
            ease: easingFunction,
          }
        }
      },
      hidden: { 
        opacity: initialOpacity,
        scale: scaleValues.initial,
        transition: {
          opacity: {
            duration: effectiveDuration * PHI_INVERSE, // Slightly shorter for fade out
            ease: easingFunction,
          },
          scale: {
            duration: effectiveDuration,
            ease: easingFunction,
          }
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
              transformOrigin,
              display: (!isVisible && stayMounted) ? 'none' : undefined,
              willChange: 'transform, opacity' // Performance optimization
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

ScaleFade.displayName = 'ScaleFade';

export default ScaleFade; 














