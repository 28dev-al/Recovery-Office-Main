/**
 * ScaleFade Component
 * 
 * A component that combines scaling and fading animations for smooth
 * entrance and exit animations, using sacred geometry principles.
 * 
 * The component applies the Golden Ratio (PHI) to create naturally
 * pleasing animations with harmonious timing and proportions.
 */

import * as React from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import styled from 'styled-components';

import { ScaleFadeProps } from '../../types/animation.types';
import { resolveDuration, applyGoldenRatioDuration } from '../../../utils/animation';
import { PHI, PHI_INVERSE, SACRED_EASINGS } from '../../../constants/sacred-geometry';

// Create styled motion.div that inherits Box styling system
const StyledMotionDiv = styled(motion.div)``;

/**
 * ScaleFade Component with ref forwarding
 * 
 * Combines scale and fade animations with sacred geometry principles
 */
export const ScaleFade = React.forwardRef<HTMLDivElement, ScaleFadeProps>(
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
    style,
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
    
    // Handle custom easing function or use predefined sacred easing
    const easingValue = typeof easing === 'function' 
      ? easing 
      : (SACRED_EASINGS[easing as keyof typeof SACRED_EASINGS] || SACRED_EASINGS.standard);
    
    // Create animation variants with sacred timing
    const variants: Variants = {
      visible: { 
        opacity: 1,
        scale: scaleValues.final,
        transition: {
          opacity: {
            duration: effectiveDuration,
            delay,
            ease: easingValue,
          },
          scale: {
            duration: effectiveDuration * PHI, // Slightly longer for scale (golden ratio)
            delay,
            ease: easingValue,
          }
        }
      },
      hidden: { 
        opacity: initialOpacity,
        scale: scaleValues.initial,
        transition: {
          opacity: {
            duration: effectiveDuration * PHI_INVERSE, // Slightly shorter for fade out
            ease: easingValue,
          },
          scale: {
            duration: effectiveDuration,
            ease: easingValue,
          }
        }
      }
    };
    
    return (
      <AnimatePresence mode="wait">
        {(isVisible || stayMounted) && (
          <StyledMotionDiv
            ref={ref}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            exit="hidden"
            variants={variants}
            style={{
              ...style,
              transformOrigin,
              display: (!isVisible && stayMounted) ? 'none' : undefined,
              willChange: 'transform, opacity' // Performance optimization
            }}
            {...rest}
          >
            {children}
          </StyledMotionDiv>
        )}
      </AnimatePresence>
    );
  }
);

ScaleFade.displayName = 'ScaleFade';

export default ScaleFade; 








