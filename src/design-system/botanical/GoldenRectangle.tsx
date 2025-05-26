/**
 * GoldenRectangle Component
 * 
 * A component that renders a golden rectangle - a rectangle whose sides are in the 
 * golden ratio (1:1.618). The golden rectangle is considered one of the most visually 
 * pleasing geometric shapes and appears throughout nature and classical architecture.
 * 
 * This component provides a way to create sacred geometry-based rectangles for 
 * layouts, decorative elements, or educational purposes.
 */

import * as React from 'react';
import BotanicalElement, { BotanicalElementProps } from './BotanicalElement';
import { PHI, PHI_INVERSE } from '../../constants/sacred-geometry';


/**
 * GoldenRectangle component props
 */
export interface GoldenRectangleProps extends Omit<BotanicalElementProps, 'children'> {
  /**
   * The width of the rectangle
   * @default 60
   */
  width?: number;
  
  /**
   * Whether to show the golden ratio subdivisions
   * @default false
   */
  showSubdivisions?: boolean;
  
  /**
   * Number of subdivisions to show (when showSubdivisions is true)
   * @default 3
   */
  subdivisionCount?: number;
  
  /**
   * Whether to show the golden spiral within the rectangle
   * @default false
   */
  showSpiral?: boolean;
  
  /**
   * Optional rotation of the entire rectangle in degrees
   * @default 0
   */
  rotation?: number;
  
  /**
   * Whether to use a horizontal (landscape) golden rectangle
   * When true, width is longer than height (1.618:1)
   * When false, height is longer than width (1:1.618)
   * @default true
   */
  horizontal?: boolean;
}

/**
 * Generates the golden rectangle SVG elements
 */
const generateGoldenRectangle = (
  width: number = 60,
  showSubdivisions: boolean = false,
  subdivisionCount: number = 3,
  showSpiral: boolean = false,
  horizontal: boolean = true
): React.ReactNode => {
  const elements: React.ReactElement[] = [];
  
  // Calculate height based on golden ratio
  const height = horizontal ? width / PHI : width * PHI;
  
  // Calculate the rectangle position to center it in the viewBox
  const x = horizontal ? (100 - width) / 2 : (100 - width) / 2;
  const y = horizontal ? (100 - height) / 2 : (100 - height) / 2;
  
  // Create the main rectangle
  elements.push(
    <rect
      key="golden-rectangle"
      x={x}
      y={y}
      width={width}
      height={height}
      className="golden-rectangle"
    />
  );
  
  // Add subdivisions if requested
  if (showSubdivisions) {
    let currentX = x;
    let currentY = y;
    let currentWidth = width;
    let currentHeight = height;
    
    for (let i = 0; i < subdivisionCount; i++) {
      if (horizontal) {
        // Calculate square size (equal to height)
        const squareSize = currentHeight;
        
        // Draw the square on the left side
        elements.push(
          <rect
            key={`subdivision-square-${i}`}
            x={currentX}
            y={currentY}
            width={squareSize}
            height={squareSize}
            className="golden-subdivision"
            fill="none"
            strokeDasharray="3,2"
          />
        );
        
        // Add the golden ratio point at ~61.8% of the square size
        elements.push(
          <circle
            key={`golden-point-${i}`}
            cx={currentX + squareSize * PHI_INVERSE}
            cy={currentY + squareSize * PHI_INVERSE}
            r={1}
            className="golden-point"
          />
        );
        
        // Move to the next rectangle
        currentX += squareSize;
        currentWidth -= squareSize;
        currentHeight = currentWidth / PHI;
        currentY = y + (height - currentHeight) / 2;
      } else {
        // Calculate square size (equal to width)
        const squareSize = currentWidth;
        
        // Draw the square on the top
        elements.push(
          <rect
            key={`subdivision-square-${i}`}
            x={currentX}
            y={currentY}
            width={squareSize}
            height={squareSize}
            className="golden-subdivision"
            fill="none"
            strokeDasharray="3,2"
          />
        );
        
        // Add the golden ratio point at ~61.8% of the square size
        elements.push(
          <circle
            key={`golden-point-${i}`}
            cx={currentX + squareSize * PHI_INVERSE}
            cy={currentY + squareSize * PHI_INVERSE}
            r={1}
            className="golden-point"
          />
        );
        
        // Move to the next rectangle
        currentY += squareSize;
        currentHeight -= squareSize;
        currentWidth = currentHeight / PHI;
        currentX = x + (width - currentWidth) / 2;
      }
    }
  }
  
  // Add spiral if requested
  if (showSpiral) {
    let currentX = x;
    let currentY = y;
    let currentWidth = width;
    let currentHeight = height;
    
    // Create a path for the golden spiral
    let spiralPath = '';
    
    for (let i = 0; i < (subdivisionCount > 0 ? subdivisionCount : 3); i++) {
      if (horizontal) {
        // Calculate square size (equal to height)
        const squareSize = currentHeight;
        
        // Add arc to spiral path
        if (i === 0) {
          // Start at bottom right of the square
          spiralPath += `M ${currentX + squareSize},${currentY + squareSize} `;
        }
        
        // Add quarter circle arc
        spiralPath += `A ${squareSize},${squareSize} 0 0,0 ${currentX},${currentY} `;
        
        // Move to the next rectangle
        currentX += squareSize;
        currentWidth -= squareSize;
        currentHeight = currentWidth / PHI;
        currentY = y + (height - currentHeight) / 2;
      } else {
        // Calculate square size (equal to width)
        const squareSize = currentWidth;
        
        // Add arc to spiral path
        if (i === 0) {
          // Start at bottom right of the square
          spiralPath += `M ${currentX + squareSize},${currentY + squareSize} `;
        }
        
        // Add quarter circle arc
        spiralPath += `A ${squareSize},${squareSize} 0 0,0 ${currentX},${currentY} `;
        
        // Move to the next rectangle
        currentY += squareSize;
        currentHeight -= squareSize;
        currentWidth = currentHeight / PHI;
        currentX = x + (width - currentWidth) / 2;
      }
    }
    
    elements.push(
      <path
        key="golden-spiral"
        d={spiralPath}
        fill="none"
        className="golden-spiral"
      />
    );
  }
  
  return elements;
};

/**
 * GoldenRectangle Component with ref forwarding
 * 
 * Creates a rectangle with the golden ratio (1:1.618) proportions
 */
export const GoldenRectangle = React.forwardRef<SVGSVGElement, GoldenRectangleProps>(
  ({ 
    width = 60,
    showSubdivisions = false,
    subdivisionCount = 3,
    showSpiral = false,
    rotation = 0,
    horizontal = true,
    viewBox = '0 0 100 100',
    ...rest 
  }, ref) => {
    return (
      <BotanicalElement
        viewBox={viewBox}
        ref={ref}
        {...rest}
      >
        <g 
          transform={`rotate(${rotation}, 50, 50)`}
          style={{ transformOrigin: 'center' }}
        >
          {generateGoldenRectangle(
            width,
            showSubdivisions,
            subdivisionCount,
            showSpiral,
            horizontal
          )}
        </g>
      </BotanicalElement>
    );
  }
);

GoldenRectangle.displayName = 'GoldenRectangle';

export default GoldenRectangle; 







