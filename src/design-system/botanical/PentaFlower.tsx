/**
 * PentaFlower Component
 * 
 * A component that renders a five-pointed floral pattern based on the pentagram and golden ratio.
 * This sacred geometry pattern combines the harmonious proportions of the pentagon with the
 * flowing organic nature of botanical elements.
 * 
 * The pentagram is deeply connected to the golden ratio, as the ratio of the 
 * diagonal to the side of a regular pentagon is exactly the golden ratio (PHI).
 */

import * as React from 'react';
import BotanicalElement, { BotanicalElementProps } from './BotanicalElement';
import { PHI_INVERSE } from '../../constants/sacred-geometry';

/**
 * PentaFlower component props
 */
export interface PentaFlowerProps extends Omit<BotanicalElementProps, 'children'> {
  /**
   * The radius of the pattern
   * @default 40
   */
  radius?: number;
  
  /**
   * Number of layers in the flower pattern
   * @default 2
   */
  layers?: number;
  
  /**
   * Whether to show the pentagram in the center
   * @default true
   */
  showPentagram?: boolean;
  
  /**
   * Whether to show sacred geometry guidelines
   * @default false
   */
  showGuides?: boolean;
  
  /**
   * Optional rotation of the entire pattern in degrees
   * @default 0
   */
  rotation?: number;
  
  /**
   * The petal shape - more natural or more geometric
   * @default 'natural'
   */
  petalStyle?: 'natural' | 'geometric';
}

/**
 * Calculate the points of a regular pentagon with given radius
 */
const calculatePentagonPoints = (
  centerX: number, 
  centerY: number, 
  radius: number
): { x: number; y: number }[] => {
  const points: { x: number; y: number }[] = [];
  
  for (let i = 0; i < 5; i++) {
    // Each point is 72 degrees (360/5) apart, starting from the top (270 degrees)
    const angle = (Math.PI * 2 * i / 5) + (Math.PI * 3 / 2);
    
    points.push({
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle)
    });
  }
  
  return points;
};

/**
 * Generates the PentaFlower SVG elements
 */
const generatePentaFlower = (
  radius: number = 40,
  layers: number = 2,
  showPentagram: boolean = true,
  showGuides: boolean = false,
  petalStyle: 'natural' | 'geometric' = 'natural'
): React.ReactNode => {
  const elements: React.ReactElement[] = [];
  const centerX = 50;
  const centerY = 50;
  
  // Calculate pentagon points
  const pentagonPoints = calculatePentagonPoints(centerX, centerY, radius);
  
  // Show pentagram in the center if requested
  if (showPentagram) {
    const pentagramPath = pentagonPoints.map((point, i) => {
      return `${i === 0 ? 'M' : 'L'} ${point.x},${point.y} ${
        i === 0 ? `L ${pentagonPoints[2]?.x ?? 0},${pentagonPoints[2]?.y ?? 0}` : ''
      } ${
        i === 1 ? `L ${pentagonPoints[4]?.x ?? 0},${pentagonPoints[4]?.y ?? 0}` : ''
      } ${
        i === 2 ? `L ${pentagonPoints[0]?.x ?? 0},${pentagonPoints[0]?.y ?? 0}` : ''
      } ${
        i === 3 ? `L ${pentagonPoints[1]?.x ?? 0},${pentagonPoints[1]?.y ?? 0}` : ''
      } ${
        i === 4 ? `L ${pentagonPoints[3]?.x ?? 0},${pentagonPoints[3]?.y ?? 0} Z` : ''
      }`;
    }).join(' ');
    
    elements.push(
      <path
        key="pentagram"
        d={pentagramPath}
        className="pentaflower-pentagram"
        fill="none"
      />
    );
  }
  
  // Add flower petals around each pentagon point
  for (let layer = 0; layer < layers; layer++) {
    const layerRadius = radius * (1 + (layer * PHI_INVERSE));
    const layerPentagonPoints = calculatePentagonPoints(centerX, centerY, layerRadius);
    
    // Create petals
    for (let i = 0; i < 5; i++) {
      const point = layerPentagonPoints[i] || { x: 0, y: 0 };
      
      // Calculate control points for the petal curves
      const petalSize = layerRadius * PHI_INVERSE;
      
      // Calculate angle to center
      const angleToCenter = Math.atan2(centerY - point.y, centerX - point.x);
      
      // Calculate petal tip point (outside the pentagon)
      const tipDistance = petalSize * (petalStyle === 'natural' ? 1.5 : 1);
      const tipX = point.x - Math.cos(angleToCenter) * tipDistance;
      const tipY = point.y - Math.sin(angleToCenter) * tipDistance;
      
      // Calculate control points for the curves
      const cp1Distance = petalSize * 0.6;
      const cp1Angle = angleToCenter + (Math.PI / 5); // Slight angle offset
      const cp1X = point.x - Math.cos(cp1Angle) * cp1Distance;
      const cp1Y = point.y - Math.sin(cp1Angle) * cp1Distance;
      
      const cp2Distance = petalSize * 0.6;
      const cp2Angle = angleToCenter - (Math.PI / 5); // Slight angle offset in other direction
      const cp2X = point.x - Math.cos(cp2Angle) * cp2Distance;
      const cp2Y = point.y - Math.sin(cp2Angle) * cp2Distance;
      
      // Create the petal path
      if (petalStyle === 'natural') {
        elements.push(
          <path
            key={`petal-${layer}-${i}`}
            d={`
              M ${point.x},${point.y}
              C ${cp1X},${cp1Y} ${tipX + petalSize * 0.3},${tipY} ${tipX},${tipY}
              C ${tipX - petalSize * 0.3},${tipY} ${cp2X},${cp2Y} ${point.x},${point.y}
              Z
            `}
            className={`pentaflower-petal layer-${layer}`}
          />
        );
      } else {
        // More geometric petal style
        elements.push(
          <path
            key={`petal-${layer}-${i}`}
            d={`
              M ${point.x},${point.y}
              Q ${cp1X},${cp1Y} ${tipX},${tipY}
              Q ${cp2X},${cp2Y} ${point.x},${point.y}
              Z
            `}
            className={`pentaflower-petal layer-${layer}`}
          />
        );
      }
    }
  }
  
  // Add central circle
  elements.push(
    <circle
      key="center"
      cx={centerX}
      cy={centerY}
      r={radius * PHI_INVERSE * 0.5}
      className="pentaflower-center"
    />
  );
  
  // Show sacred geometry guides if requested
  if (showGuides) {
    // Show pentagon
    const pentagonPath = pentagonPoints.map((point, i) => {
      return `${i === 0 ? 'M' : 'L'} ${point.x},${point.y}`;
    }).join(' ') + ' Z';
    
    elements.push(
      <path
        key="pentagon-guide"
        d={pentagonPath}
        className="pentaflower-guide"
        fill="none"
        strokeDasharray="3,2"
      />
    );
    
    // Show golden ratio circle
    elements.push(
      <circle
        key="golden-circle"
        cx={centerX}
        cy={centerY}
        r={radius * PHI_INVERSE}
        className="pentaflower-guide"
        fill="none"
        strokeDasharray="3,2"
      />
    );
    
    // Show center point
    elements.push(
      <circle
        key="center-point"
        cx={centerX}
        cy={centerY}
        r={1}
        className="pentaflower-guide-point"
      />
    );
  }
  
  return elements;
};

/**
 * PentaFlower Component with ref forwarding
 * 
 * Creates a five-pointed floral pattern based on the pentagram and golden ratio
 */
export const PentaFlower = React.forwardRef<SVGSVGElement, PentaFlowerProps>(
  ({ 
    radius = 40,
    layers = 2,
    showPentagram = true,
    showGuides = false,
    rotation = 0,
    petalStyle = 'natural',
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
          {generatePentaFlower(
            radius,
            layers,
            showPentagram,
            showGuides,
            petalStyle
          )}
        </g>
      </BotanicalElement>
    );
  }
);

PentaFlower.displayName = 'PentaFlower';

export default PentaFlower; 







