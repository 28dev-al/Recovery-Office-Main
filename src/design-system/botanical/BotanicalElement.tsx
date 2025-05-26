/**
 * BotanicalElement Component
 * 
 * A base component for creating botanical SVG elements that follow sacred geometry principles.
 * This component provides common functionality and styling for all botanical elements.
 * 
 * Each botanical element derived from this base will implement specific mathematical
 * principles from sacred geometry to create harmonious, nature-inspired visuals.
 */

import * as React from 'react';
import styled from 'styled-components';
import { Box } from '../../design-system/components/layout/Box';
import { BoxProps } from '../../design-system/types/styled.types';
import { PHI, PHI_INVERSE } from '../../constants/sacred-geometry';

/**
 * BotanicalElement component props
 */
export interface BotanicalElementProps extends Omit<BoxProps, 'as'> {
  /**
   * The width of the botanical element
   * @default '100%'
   */
  width?: string | number;
  
  /**
   * The height of the botanical element
   * @default '100%'
   */
  height?: string | number;
  
  /**
   * The size of the botanical element (affects both width and height)
   * @default undefined
   */
  size?: number | string;
  
  /**
   * The viewBox for the SVG
   * @default '0 0 100 100'
   */
  viewBox?: string;
  
  /**
   * The color of the botanical element
   * Uses currentColor by default to inherit from parent
   * @default 'currentColor'
   */
  color?: string;
  
  /**
   * The stroke width to use for the SVG paths
   * @default 1
   */
  strokeWidth?: number;
  
  /**
   * The fill mode for the SVG
   * @default 'none'
   */
  fill?: string;
  
  /**
   * Whether the SVG should preserve aspect ratio
   * @default true
   */
  preserveAspectRatio?: boolean;
  
  /**
   * Opacity of the botanical element
   * @default 1
   */
  opacity?: number;
  
  /**
   * Whether the element is purely decorative (affects accessibility)
   * @default true
   */
  decorative?: boolean;
  
  /**
   * Accessible description for non-decorative elements
   */
  description?: string;
  
  /**
   * Whether to use golden ratio proportions for the SVG
   * @default true
   */
  useGoldenRatio?: boolean;
  
  /**
   * Custom inline styles
   */
  style?: React.CSSProperties;
  
  /**
   * The content of the botanical element (SVG paths, circles, etc.)
   */
  children: React.ReactNode;
}

/**
 * Styled SVG component with sacred geometry principles
 */
const StyledSvg = styled.svg<{ children?: React.ReactNode;
  useGoldenRatio?: boolean;
}>`
  // Apply sacred geometry proportions when useGoldenRatio is true
  ${props => props.useGoldenRatio && `
    // If width is larger than height, make height = width / PHI
    // Otherwise, make width = height / PHI
    aspect-ratio: ${PHI} / 1;
  `}
  
  // Ensure smooth rendering of SVG paths
  shape-rendering: geometricPrecision;
  
  // Optional: add subtle glow effect to emphasize sacred geometry
  path {
    transition: all 0.3s cubic-bezier(${PHI_INVERSE}, 0, ${PHI_INVERSE}, 1);
  }
  
  // Sacred geometry animations on hover (subtle)
  &:hover path {
    filter: drop-shadow(0 0 1px currentColor);
  }
`;

/**
 * BotanicalElement Component with ref forwarding
 * 
 * Base component for all botanical SVG elements
 */
export const BotanicalElement = React.forwardRef<SVGSVGElement, BotanicalElementProps>(
  ({ 
    width = '100%',
    height = '100%',
    size,
    viewBox = '0 0 100 100',
    color = 'currentColor',
    strokeWidth = 1,
    fill = 'none',
    preserveAspectRatio = true,
    opacity = 1,
    decorative = true,
    description,
    useGoldenRatio = true,
    style,
    children,
    ...rest 
  }, ref) => {
    // If size is provided, use it for both width and height
    const finalWidth = size !== undefined ? size : width;
    const finalHeight = size !== undefined ? size : height;
    
    // Determine the appropriate preserveAspectRatio attribute
    const aspectRatio = preserveAspectRatio ? 'xMidYMid meet' : 'none';
    
    // Accessibility attributes
    const a11yProps = decorative 
      ? { 'aria-hidden': true as const } 
      : { role: 'img' as const };
    
    // Merge styles
    const mergedStyles = {
      ...style
    };
    
    return (
      <Box display="inline-block" width={finalWidth} height={finalHeight} {...rest}>
        <StyledSvg
          ref={ref}
          xmlns="http://www.w3.org/2000/svg"
          viewBox={viewBox}
          preserveAspectRatio={aspectRatio}
          useGoldenRatio={useGoldenRatio}
          opacity={opacity}
          stroke={color}
          strokeWidth={strokeWidth}
          fill={fill}
          style={mergedStyles}
          {...a11yProps}
        >
          {/* Add description for accessibility if provided and element is not decorative */}
          {!decorative && description && (
            <desc>{description}</desc>
          )}
          
          {/* SVG content */}
          {children}
        </StyledSvg>
      </Box>
    );
  }
);

BotanicalElement.displayName = 'BotanicalElement';

export default BotanicalElement; 











