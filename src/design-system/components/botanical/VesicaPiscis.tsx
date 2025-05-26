/**
 * VesicaPiscis Component
 * 
 * A component that renders the Vesica Piscis sacred geometry pattern.
 * The Vesica Piscis is formed by the intersection of two circles with the
 * same radius, where the center of each circle lies on the circumference of
 * the other.
 * 
 * This shape is fundamental to sacred geometry and symbolizes the
 * intersection of the physical and spiritual worlds, as well as
 * creation, unity, and divine proportions.
 */

import * as React from 'react';
import BotanicalElement, { BotanicalElementProps } from './BotanicalElement';
import { PHI } from '../../../constants/sacred-geometry';

/**
 * VesicaPiscis component props
 */
export interface VesicaPiscisProps extends Omit<BotanicalElementProps, 'children'> {
  /**
   * The radius of each circle
   * @default 30
   */
  radius?: number;
  
  /**
   * Whether to show the two circles creating the vesica piscis
   * @default true
   */
  showCircles?: boolean;
  
  /**
   * Whether to show the vesica piscis shape (the almond-shaped intersection)
   * @default true
   */
  showVesica?: boolean;
  
  /**
   * The fill color of the vesica piscis shape
   * @default 'none'
   */
  vesicaFill?: string;
  
  /**
   * Optional rotation of the entire pattern in degrees
   * @default 0
   */
  rotation?: number;
  
  /**
   * Whether to show the golden ratio dimensions of the vesica piscis
   * @default false
   */
  showGoldenRatio?: boolean;
}

/**
 * Calculate the vesica piscis path based on sacred geometry
 */
const calculateVesicaPiscis = (
  radius: number = 30,
  showVesica: boolean = true,
  showCircles: boolean = true,
  showGoldenRatio: boolean = false
): React.ReactNode => {
  // Center points of the two circles
  const center1 = { x: 50 - radius / 2, y: 50 };
  const center2 = { x: 50 + radius / 2, y: 50 };
  
  // Calculate the intersection points of the two circles
  const intersectionHeight = Math.sqrt(4 * radius * radius - radius * radius);
  const intersectionTop = { x: 50, y: 50 - intersectionHeight / 2 };
  const intersectionBottom = { x: 50, y: 50 + intersectionHeight / 2 };
  
  const elements: JSX.Element[] = [];
  
  // Draw the two circles
  if (showCircles) {
    elements.push(
      <circle
        key="circle1"
        cx={center1.x}
        cy={center1.y}
        r={radius}
        className="vesica-circle-left"
      />
    );
    
    elements.push(
      <circle
        key="circle2"
        cx={center2.x}
        cy={center2.y}
        r={radius}
        className="vesica-circle-right"
      />
    );
  }
  
  // Draw the vesica piscis shape (the intersection)
  if (showVesica) {
    const vesicaPath = `
      M ${intersectionTop.x},${intersectionTop.y}
      A ${radius},${radius} 0 0,1 ${intersectionBottom.x},${intersectionBottom.y}
      A ${radius},${radius} 0 0,1 ${intersectionTop.x},${intersectionTop.y}
      Z
    `;
    
    elements.push(
      <path
        key="vesica"
        d={vesicaPath}
        className="vesica-shape"
      />
    );
  }
  
  // Draw golden ratio indicators
  if (showGoldenRatio) {
    // The width/height ratio of the vesica piscis is related to the square root of 3
    // When properly constructed, it contains significant golden ratio proportions
    const vesicaHeight = intersectionHeight;
    
    // Horizontal line through center representing width
    elements.push(
      <line
        key="width-line"
        x1={center1.x}
        y1={50}
        x2={center2.x}
        y2={50}
        strokeDasharray="2,1"
        className="vesica-golden-ratio"
      />
    );
    
    // Vertical line through center representing height
    elements.push(
      <line
        key="height-line"
        x1={50}
        y1={intersectionTop.y}
        x2={50}
        y2={intersectionBottom.y}
        strokeDasharray="2,1"
        className="vesica-golden-ratio"
      />
    );
    
    // Add golden ratio division lines
    // The height of the vesica piscis divided by PHI gives a significant golden section
    const goldenSection = vesicaHeight / PHI;
    elements.push(
      <line
        key="golden-section"
        x1={center1.x}
        y1={50 - goldenSection / 2}
        x2={center2.x}
        y2={50 - goldenSection / 2}
        strokeDasharray="2,1"
        className="vesica-golden-ratio"
        stroke="gold"
      />
    );
    
    elements.push(
      <line
        key="golden-section-2"
        x1={center1.x}
        y1={50 + goldenSection / 2}
        x2={center2.x}
        y2={50 + goldenSection / 2}
        strokeDasharray="2,1"
        className="vesica-golden-ratio"
        stroke="gold"
      />
    );
  }
  
  return elements;
};

/**
 * VesicaPiscis Component with ref forwarding
 * 
 * Creates the Vesica Piscis sacred geometry pattern
 */
export const VesicaPiscis = React.forwardRef<SVGSVGElement, VesicaPiscisProps>(
  ({ 
    radius = 30,
    showCircles = true,
    showVesica = true,
    vesicaFill = 'none',
    rotation = 0,
    showGoldenRatio = false,
    viewBox = '0 0 100 100',
    ...rest 
  }, ref) => {
    return (
      <BotanicalElement
        viewBox={viewBox}
        ref={ref}
        fill={vesicaFill}
        {...rest}
      >
        <g 
          transform={`rotate(${rotation}, 50, 50)`}
          style={{ transformOrigin: 'center' }}
        >
          {calculateVesicaPiscis(
            radius,
            showVesica,
            showCircles,
            showGoldenRatio
          )}
        </g>
      </BotanicalElement>
    );
  }
);

VesicaPiscis.displayName = 'VesicaPiscis';

export default VesicaPiscis;

 






