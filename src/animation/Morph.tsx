/**
 * Morph Component
 * 
 * A component that animates between SVG paths by morphing from one
 * shape to another. Uses sacred geometry principles for timing and
 * easing to create naturally pleasing animations.
 */

import * as React from 'react';;
import { forwardRef } from 'react';
import { motion } from 'framer-motion';

import { Box } from '../design-system/components/layout';
import type { MorphProps } from './animation.d';
import { resolveDuration, applyGoldenRatioDuration } from '../utils/animation';
import { SACRED_EASINGS, PHI_INVERSE } from '../constants/sacred-geometry';

/**
 * Morph Component with ref forwarding
 * 
 * Morphs between SVG paths with sacred geometry timing
 */
export const Morph = forwardRef<HTMLDivElement, MorphProps>(
  ({ 
    paths,
    activeIndex = 0,
    duration = 'normal',
    delay = 0,
    easing = 'standard',
    fill = false,
    fillColor = "currentColor",
    strokeColor = "currentColor",
    strokeWidth = 2,
    width = "100%",
    height = "100%",
    viewBox = "0 0 100 100",
    preserveAspectRatio = "xMidYMid meet",
    useGoldenRatio = true,
    cycle = false,
    cycleInterval = 5,
    ...rest
  }, ref) => {
    // Ensure activeIndex is within bounds
    const safeActiveIndex = Math.max(0, Math.min(activeIndex, paths.length - 1));
    
    // State to track current path index
    const [currentIndex, setCurrentIndex] = React.useState(safeActiveIndex);
    
    // Update current index when activeIndex prop changes
    React.useEffect(() => {
      setCurrentIndex(safeActiveIndex);
    }, [safeActiveIndex]);
    
    // Set up automatic cycling if enabled
    React.useEffect(() => {
      if (!cycle || paths.length <= 1) return;
      
      const interval = setInterval(() => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % paths.length);
      }, cycleInterval * 1000);
      
      return () => clearInterval(interval);
    }, [cycle, cycleInterval, paths.length]);
    
    // Convert duration string to numerical value
    const durationValue = resolveDuration(duration);
    
    // Apply golden ratio to duration if enabled
    const effectiveDuration = useGoldenRatio 
      ? applyGoldenRatioDuration(durationValue) 
      : durationValue;
    
    // Get the easing function from SACRED_EASINGS
    const easingValues = SACRED_EASINGS[easing];
    // Ensure the easing value is an array
    const easingFunction = Array.isArray(easingValues) 
      ? easingValues 
      : [PHI_INVERSE, 0, 1 - PHI_INVERSE, 1]; // Default fallback
    
    return (
      <Box 
        ref={ref}
        width={width} 
        height={height}
        {...rest}
      >
        <svg
          width="100%"
          height="100%"
          viewBox={viewBox}
          preserveAspectRatio={preserveAspectRatio}
          overflow="visible"
        >
          <motion.path
            d={paths[currentIndex]}
            initial={false}
            animate={{ 
              d: paths[currentIndex] 
            }}
            style={{
              fill: fill ? fillColor : "none",
              stroke: strokeColor,
              strokeWidth
            }}
            transition={{
              d: {
                duration: effectiveDuration,
                delay,
                ease: easingFunction,
              }
            }}
          />
        </svg>
      </Box>
    );
  }
);

Morph.displayName = 'Morph';

export default Morph;

















