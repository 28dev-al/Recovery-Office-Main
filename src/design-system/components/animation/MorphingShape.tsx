/**
 * MorphingShape Component
 * 
 * A component that animates between different SVG paths using sacred geometry principles
 * for timing and easing. Great for creating fluid, organic transitions between shapes.
 * 
 * This component uses golden ratio (PHI) for natural, harmonious animation
 * timing and easing functions derived from sacred geometry.
 */

import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Box from '../layout/Box';
import { 
  SACRED_EASINGS 
} from '../../../constants/sacred-geometry';
import { resolveDuration, applyGoldenRatioDuration } from '../../../utils/animation';
import { MorphingShapeProps } from '../../types/animation.types';

/**
 * MorphingShape Component with ref forwarding
 * 
 * Animates between SVG paths with sacred geometry timing
 */
export const MorphingShape = React.forwardRef<HTMLDivElement, MorphingShapeProps>(
  ({ 
    shapes,
    customPaths,
    activeIndex = 0,
    duration = 'normal',
    delay = 0,
    easing = 'standard',
    useGoldenRatio = true,
    fill = false,
    fillColor = "currentColor",
    strokeColor = "currentColor",
    strokeWidth = 0,
    viewBox = "0 0 100 100",
    preserveAspectRatio = "xMidYMid meet",
    cycle = false,
    cycleInterval = 5,
    ...rest
  }, ref) => {
    // Transform shapes or custom paths into an array of SVG path strings
    const paths = React.useMemo(() => {
      if (customPaths && customPaths.length > 0) {
        return customPaths;
      }
      
      // Default shapes if none provided
      if (!shapes || shapes.length === 0) {
        return [
          "M 50 10 L 90 50 L 50 90 L 10 50 Z", // Diamond
          "M 10 10 L 90 10 L 90 90 L 10 90 Z",  // Square
          "M 50 10 A 40 40 0 1 0 50 90 A 40 40 0 1 0 50 10" // Circle
        ];
      }
      
      // Map shape names to SVG path data
      return shapes.map(shape => {
        switch (shape) {
          case 'circle':
            return "M 50 10 A 40 40 0 1 0 50 90 A 40 40 0 1 0 50 10";
          case 'rectangle':
            return "M 10 20 L 90 20 L 90 80 L 10 80 Z";
          case 'triangle':
            return "M 50 10 L 90 90 L 10 90 Z";
          case 'hexagon':
            return "M 50 10 L 90 30 L 90 70 L 50 90 L 10 70 L 10 30 Z";
          case 'star':
            return "M 50 10 L 61 40 L 94 40 L 67 60 L 78 90 L 50 72 L 22 90 L 33 60 L 6 40 L 39 40 Z";
          case 'spiral':
            return "M 50 50 m 0 -25 a 25 25 0 1 0 15 45 a 15 15 0 1 1 -10 -27 a 8 8 0 1 0 5 15 a 4 4 0 1 1 -3 -7";
          default:
            return "M 50 10 L 90 50 L 50 90 L 10 50 Z"; // Default diamond
        }
      });
    }, [shapes, customPaths]);
    
    // State to track current and next paths for animation
    const [currentPathIndex, setCurrentPathIndex] = useState(activeIndex);
    const scope = useRef(null);
    
    // Convert duration string to numerical value if needed
    const durationValue = resolveDuration(duration);
    
    // Apply golden ratio to duration for natural timing
    const effectiveDuration = useGoldenRatio 
      ? applyGoldenRatioDuration(durationValue) 
      : durationValue;
    
    // Handle prop changes
    useEffect(() => {
      if (activeIndex !== currentPathIndex) {
        setCurrentPathIndex(activeIndex);
      }
    }, [activeIndex, currentPathIndex]);
    
    // Set up looping if enabled
    useEffect(() => {
      if (!cycle || paths.length <= 1) return;
      
      // Use Fibonacci-based interval timing
      const interval = setInterval(() => {
        setCurrentPathIndex(prevIndex => (prevIndex + 1) % paths.length);
      }, cycleInterval * 1000);
      
      return () => clearInterval(interval);
    }, [cycle, cycleInterval, paths.length]);
    
    // If no paths provided, render nothing
    if (!paths.length) return null;
    
    return (
      <Box
        ref={ref}
        {...rest}
      >
        <motion.svg
          ref={scope}
          viewBox={viewBox}
          width="100%"
          height="100%"
          preserveAspectRatio={preserveAspectRatio}
        >
          <motion.path
            d={paths[currentPathIndex % paths.length]}
            fill={fill ? fillColor : "none"}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            initial={false}
            animate={{
              d: paths[currentPathIndex % paths.length]
            }}
            transition={{
              duration: effectiveDuration,
              delay,
              ease: SACRED_EASINGS[easing as keyof typeof SACRED_EASINGS],
            }}
          />
        </motion.svg>
      </Box>
    );
  }
);

MorphingShape.displayName = 'MorphingShape';

export default MorphingShape; 







