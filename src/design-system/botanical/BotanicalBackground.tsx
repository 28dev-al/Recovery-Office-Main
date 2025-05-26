/**
 * BotanicalBackground Component
 * 
 * A component that provides decorative botanical elements for page backgrounds.
 * Uses sacred geometry principles to create visually harmonious background decorations.
 */

import * as React from 'react';
import styled from 'styled-components';
import { Box } from '../components/layout/Box';
import { FlowerOfLife } from './FlowerOfLife';
import { OliveBranch } from './OliveBranch';
import { VesicaPiscis } from './VesicaPiscis';
import { FibonacciSpiral } from './FibonacciSpiral';
import { GOLDEN_SECTIONS } from '../../constants/sacred-geometry';

export interface BotanicalBackgroundProps {
  /**
   * Background variant/theme
   * @default 'default'
   */
  variant?: 'default' | 'minimal' | 'abundant' | 'geometric';
  
  /**
   * Base opacity for all elements
   * @default 0.1
   */
  opacity?: number;
  
  /**
   * Whether to use animation
   * @default true
   */
  animated?: boolean;
  
  /**
   * Color theme to use
   * @default 'primary'
   */
  colorTheme?: 'primary' | 'secondary' | 'accent';
  
  /**
   * Z-index for the background
   * @default 0
   */
  zIndex?: number;
}

const BackgroundContainer = styled(Box)<{ $zIndex?: number }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: ${props => props.$zIndex ?? 0};
`;

const TopLeftDecoration = styled.div`
  position: absolute;
  top: ${GOLDEN_SECTIONS.minor * 100}%;
  left: 0;
  transform: translate(-30%, -50%);
`;

const BottomRightDecoration = styled.div`
  position: absolute;
  bottom: ${GOLDEN_SECTIONS.minor * 100}%;
  right: 0;
  transform: translate(30%, 50%);
`;

const CenterDecoration = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

/**
 * BotanicalBackground Component
 * 
 * Provides decorative botanical elements for backgrounds
 */
export const BotanicalBackground: React.FC<BotanicalBackgroundProps> = ({
  variant = 'default',
  opacity = 0.1,
  colorTheme = 'primary',
  zIndex = 0
}) => {
  // Determine color based on theme
  const getColor = () => {
    switch (colorTheme) {
      case 'primary':
        return 'rgba(10, 64, 33, 0.8)'; // Dark green
      case 'secondary':
        return 'rgba(129, 151, 111, 0.8)'; // Sage green
      case 'accent':
        return 'rgba(180, 156, 95, 0.8)'; // Golden accent
      default:
        return 'rgba(10, 64, 33, 0.8)';
    }
  };
  
  const color = getColor();
  
  const renderElements = () => {
    switch (variant) {
      case 'minimal':
        return (
          <>
            <CenterDecoration>
              <FlowerOfLife 
                size={300} 
                color={color} 
                opacity={opacity} 
                rings={2}
              />
            </CenterDecoration>
          </>
        );
        
      case 'abundant':
        return (
          <>
            <TopLeftDecoration>
              <OliveBranch 
                size={200} 
                color={color} 
                opacity={opacity} 
                leafCount={7}
              />
            </TopLeftDecoration>
            
            <BottomRightDecoration>
              <OliveBranch 
                size={200} 
                color={color} 
                opacity={opacity} 
                leafCount={7} 
                mirror
              />
            </BottomRightDecoration>
            
            <CenterDecoration>
              <FlowerOfLife 
                size={400} 
                color={color} 
                opacity={opacity * 0.7} 
                rings={3}
              />
            </CenterDecoration>
          </>
        );
        
      case 'geometric':
        return (
          <>
            <TopLeftDecoration>
              <VesicaPiscis 
                size={150} 
                color={color} 
                opacity={opacity}
              />
            </TopLeftDecoration>
            
            <BottomRightDecoration>
              <FibonacciSpiral 
                size={200} 
                color={color} 
                opacity={opacity}
              />
            </BottomRightDecoration>
            
            <CenterDecoration>
              <FlowerOfLife 
                size={350} 
                color={color} 
                opacity={opacity * 0.5} 
                rings={2}
              />
            </CenterDecoration>
          </>
        );
        
      default: // 'default'
        return (
          <>
            <TopLeftDecoration>
              <OliveBranch 
                size={150} 
                color={color} 
                opacity={opacity} 
                rotation={15}
              />
            </TopLeftDecoration>
            
            <BottomRightDecoration>
              <OliveBranch 
                size={150} 
                color={color} 
                opacity={opacity} 
                mirror 
                rotation={-15}
              />
            </BottomRightDecoration>
            
            <CenterDecoration>
              <FlowerOfLife 
                size={350} 
                color={color} 
                opacity={opacity * 0.6} 
                rings={2}
              />
            </CenterDecoration>
          </>
        );
    }
  };
  
  return (
    <BackgroundContainer $zIndex={zIndex} aria-hidden="true">
      {renderElements()}
    </BackgroundContainer>
  );
};

export default BotanicalBackground; 