/**
 * Parallax Component
 * 
 * A component that serves as a container for parallax scrolling effects.
 * This component creates a scrolling environment where child ParallaxLayer
 * components can move at different speeds based on sacred geometry principles.
 * 
 * The component applies the Golden Ratio (PHI) to create naturally
 * pleasing parallax depths and harmonious movement.
 */

import * as React from 'react';
import { useMemo } from 'react';;
import styled from 'styled-components';

import Box from '../layout/Box';
import { ParallaxProps } from '../../types/animation.types';
import { prefersReducedMotion } from '../../../utils/animation';
import { PHI, getFibonacciByIndex } from '../../../constants/sacred-geometry';

/**
 * Styled container for the parallax effect
 */
const ParallaxContainer = styled(Box)<{ $perspective: number; $enabled: boolean }>`
  position: relative;
  overflow: hidden;
  perspective: ${({ $perspective, $enabled }) => $enabled ? `${$perspective}px` : 'none'};
  transform-style: ${({ $enabled }) => $enabled ? 'preserve-3d' : 'flat'};
  will-change: ${({ $enabled }) => $enabled ? 'transform' : 'auto'};
`;

/**
 * Parallax Component with ref forwarding
 * 
 * Creates a container for parallax scrolling effects based on sacred geometry
 */
export const Parallax = React.forwardRef<HTMLDivElement, ParallaxProps>(
  ({ 
    children,
    enabled = true,
    useSacredGeometry = true,
    useGoldenRatio = true,
    perspective,
    ...rest
  }, ref) => {
    // Check for reduced motion preference
    const shouldReduceMotion = useMemo(() => prefersReducedMotion(), []);
    
    // Disable parallax effect if reduced motion is preferred
    const isEffectivelyEnabled = enabled && !shouldReduceMotion;
    
    // Calculate perspective based on Fibonacci sequence for sacred geometry
    const getPerspective = useMemo(() => {
      if (perspective) return perspective;
      
      // Use Fibonacci number for the base perspective
      const basePerspective = getFibonacciByIndex(13); // 233px
      
      // Apply golden ratio if enabled for more harmonious depth
      return useGoldenRatio ? basePerspective * PHI * 4 : basePerspective * 4;
    }, [perspective, useGoldenRatio]);
    
    return (
      <ParallaxContainer
        ref={ref}
        $perspective={getPerspective}
        $enabled={isEffectivelyEnabled}
        {...rest}
      >
        {/* Pass parallex enabled state to all children */}
        {React.Children.map(children, child => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              enabled: isEffectivelyEnabled,
              useSacredGeometry,
              useGoldenRatio,
              ...child.props,
            });
          }
          return child;
        })}
      </ParallaxContainer>
    );
  }
);

Parallax.displayName = 'Parallax';

export default Parallax; 






