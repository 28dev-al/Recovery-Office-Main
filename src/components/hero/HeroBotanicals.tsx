/**
 * HeroBotanicals Component
 * 
 * Displays decorative botanical elements in the hero section,
 * implementing sacred geometry principles for positioning and animation.
 */

import * as React from 'react';
import styled from 'styled-components';
import { Box } from '@design-system/components/layout/Box';
import { OliveBranch } from '@design-system/botanical/OliveBranch';
import { FibonacciSpiral } from '@design-system/botanical/FibonacciSpiral';
import { VesicaPiscis } from '@design-system/botanical/VesicaPiscis';
import { 
  SACRED_SPACING, 
  PHI
} from '@constants/sacred-geometry';
import { BASE_COLORS } from '@design-system/tokens/colors';
import { FadeIn } from "@design-system/components/animation/FadeIn";
import { ParallaxLayer } from "@design-system/components/animation/ParallaxLayer";

// Define missing constants
const PHI_INVERSE = 1 / PHI;
const SACRED_ANGLES = {
  goldenAngle: 137.5,
  rightAngle: 90,
  complementaryAngle: 137.5
};
const SACRED_TIMING = {
  fast: 300,
  medium: 500,
  slow: 800,
  slower: 1200
};

const BotanicalsWrapper = styled(Box)`
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
  
  @media (max-width: ${props => props.theme.breakpoints.md}px) {
    display: none;
  }
`;

const OliveBranchWrapper = styled(Box)`
  position: absolute;
  top: ${50 * PHI_INVERSE}%;
  right: ${SACRED_SPACING.lg}px;
  transform: rotate(${SACRED_ANGLES.goldenAngle}deg);
  z-index: 3;
`;

const SpiralWrapper = styled(Box)`
  position: absolute;
  bottom: ${SACRED_SPACING.xxl}px;
  left: ${SACRED_SPACING.xl}px;
  opacity: 0.7;
  z-index: 2;
`;

const VesicaWrapper = styled(Box)`
  position: absolute;
  top: ${SACRED_SPACING.xxl}px;
  left: ${50 * PHI_INVERSE}%;
  opacity: 0.5;
  z-index: 1;
`;

interface HeroBotanicalsProps {
  /**
   * Additional CSS class
   */
  className?: string;
}

/**
 * HeroBotanicals Component
 * 
 * Displays decorative botanical elements in the hero section.
 * Elements are positioned and animated according to sacred geometry principles.
 */
export const HeroBotanicals: React.FC<HeroBotanicalsProps> = ({ className }) => {
  return (
    <BotanicalsWrapper className={className}>
      {/* Olive Branch */}
      <ParallaxLayer 
        speed={-0.2} 
      >
        <FadeIn delay={SACRED_TIMING.medium} duration={SACRED_TIMING.slower}>
          <OliveBranchWrapper>
            <OliveBranch 
              width={350} 
              color={BASE_COLORS.green[300] ?? 1} 
              opacity={0.8}
            />
          </OliveBranchWrapper>
        </FadeIn>
      </ParallaxLayer>
      
      {/* Fibonacci Spiral */}
      <ParallaxLayer 
        speed={0.1} 
      >
        <FadeIn delay={SACRED_TIMING.slow} duration={SACRED_TIMING.slower}>
          <SpiralWrapper>
            <FibonacciSpiral 
              iterations={5} 
              startSize={100}
              showSquares={false}
              color={BASE_COLORS.green[400] ?? 1} 
              opacity={0.3} 
            />
          </SpiralWrapper>
        </FadeIn>
      </ParallaxLayer>
      
      {/* Vesica Piscis */}
      <ParallaxLayer 
        speed={0.05} 
      >
        <FadeIn delay={SACRED_TIMING.fast} duration={SACRED_TIMING.slow}>
          <VesicaWrapper>
            <VesicaPiscis 
              width={200}
              rotation={45}
              color={BASE_COLORS.green[300] ?? 1} 
              opacity={0.4}
            />
          </VesicaWrapper>
        </FadeIn>
      </ParallaxLayer>
    </BotanicalsWrapper>
  );
};

export default HeroBotanicals; 








