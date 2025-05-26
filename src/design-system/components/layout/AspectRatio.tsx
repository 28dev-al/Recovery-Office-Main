/**
 * AspectRatio Component
 * 
 * Maintains a specific aspect ratio for its children regardless of screen size.
 * Implements sacred geometry principles by supporting Golden Ratio and other
 * harmonious proportions.
 * 
 * This component is useful for creating consistently proportioned elements
 * like images, videos, cards, and other media containers.
 */

import * as React from 'react';
import styled from 'styled-components';
import Box from './Box';
import { PHI } from '../../../constants/sacred-geometry';
import { BoxProps } from '../../types/styled.types';

// Define the sacred aspect ratios if not already imported
const SACRED_ASPECT_RATIOS = {
  goldenRectangle: PHI, // 1.618:1
  goldenRectangleLandscape: 1 / PHI, // 1:1.618
  square: 1, // 1:1
  fourByThree: 4 / 3, // 4:3
  sixteenByNine: 16 / 9, // 16:9
  twentyOneByNine: 21 / 9 // 21:9
};

// Interface for AspectRatio props
interface AspectRatioProps extends BoxProps {
  /**
   * The aspect ratio to maintain (width:height)
   * Can be a number (e.g., 16/9 = 1.778) or a preset from sacred geometry
   * - "goldenRatio": Golden Rectangle (1:1.618)
   * - "goldenRatioLandscape": Landscape Golden Rectangle (1.618:1)
   * - "square": Perfect square (1:1)
   * - "4:3": Standard TV ratio
   * - "16:9": Widescreen ratio
   * - "21:9": Ultrawide ratio
   */
  ratio?: number | 'goldenRatio' | 'goldenRatioLandscape' | 'square' | '4:3' | '16:9' | '21:9';
  
  /**
   * The content to be displayed within the AspectRatio container
   */
  children: React.ReactNode;
}

// Container with aspect ratio padding technique
const AspectRatioContainer = styled(Box)<{ $paddingBottom: string }>`
  position: relative;
  width: 100%;
  
  &::before {
    content: '';
    display: block;
    padding-bottom: ${props => props.$paddingBottom};
  }
`;

const AspectRatioContent = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

/**
 * AspectRatio Component with ref forwarding
 * 
 * Creates a container with a specific aspect ratio based on sacred geometry principles
 */
export const AspectRatio = React.forwardRef<HTMLDivElement, AspectRatioProps>(
  ({ 
    ratio = 'goldenRatio', 
    children,
    ...rest 
  }, ref) => {
    // Calculate the padding-bottom percentage based on ratio
    const getPaddingBottom = (): string => {
      let aspectRatio: number;
      
      if (typeof ratio === 'number') {
        // Use the provided numeric ratio
        aspectRatio = ratio;
      } else {
        // Use a preset ratio
        switch (ratio) {
          case 'goldenRatio':
            // 1:1.618 (Golden Rectangle)
            aspectRatio = 1 / SACRED_ASPECT_RATIOS.goldenRectangle;
            break;
          case 'goldenRatioLandscape':
            // 1.618:1 (Landscape Golden Rectangle)
            aspectRatio = 1 / SACRED_ASPECT_RATIOS.goldenRectangleLandscape;
            break;
          case 'square':
            // 1:1 (Perfect Square)
            aspectRatio = 1;
            break;
          case '4:3':
            // 4:3 (Standard TV ratio)
            aspectRatio = 3 / 4;
            break;
          case '16:9':
            // 16:9 (Widescreen ratio)
            aspectRatio = 9 / 16;
            break;
          case '21:9':
            // 21:9 (Ultrawide ratio)
            aspectRatio = 9 / 21;
            break;
          default:
            // Default to Golden Ratio if unrecognized preset
            aspectRatio = 1 / PHI;
            break;
        }
      }
      
      // Convert ratio to percentage for padding-bottom
      return `${(1 / aspectRatio) * 100}%`;
    };

    return (
      <AspectRatioContainer 
        $paddingBottom={getPaddingBottom()} 
        ref={ref}
        {...rest}
      >
        <AspectRatioContent>
          {children}
        </AspectRatioContent>
      </AspectRatioContainer>
    );
  }
);

AspectRatio.displayName = 'AspectRatio';

export default AspectRatio; 







