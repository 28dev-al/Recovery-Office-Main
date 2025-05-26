/**
 * OliveBranch Component
 * 
 * A component that renders an olive branch, a symbol of peace and harmony,
 * designed according to sacred geometry principles.
 * 
 * The olive branch uses Fibonacci-based curves and proportions
 * to create a mathematically harmonious representation of nature.
 */

import * as React from 'react';
import { PHI, PHI_INVERSE } from '../../../constants/sacred-geometry';
import BotanicalElement, { BotanicalElementProps } from './BotanicalElement';

// Define FIBONACCI as an array for indexOf compatibility
const FIBONACCI = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89];

/**
 * OliveBranch component props
 */
export interface OliveBranchProps extends Omit<BotanicalElementProps, 'children'> {
  /**
   * The number of leaves on the branch
   * @default 5
   */
  leafCount?: number;
  
  /**
   * The size of the leaves relative to the branch
   * @default 1
   */
  leafSize?: number;
  
  /**
   * The curvature of the main branch
   * @default 0.3
   */
  curvature?: number;
  
  /**
   * Whether to include small olives on the branch
   * @default true
   */
  includeOlives?: boolean;
  
  /**
   * The fill color of the olives, if included
   * @default 'currentColor'
   */
  oliveFill?: string;
  
  /**
   * Optional rotation of the entire branch in degrees
   * @default 0
   */
  rotation?: number;
  
  /**
   * Whether to mirror the branch (flip horizontally)
   * @default false
   */
  mirror?: boolean;
}

/**
 * Calculate a point on a cubic bezier curve at position t (0-1)
 */
const calculateCubicBezierPoint = (
  p0: number,
  p1: number,
  p2: number,
  p3: number,
  t: number
): number => {
  const t2 = t * t;
  const t3 = t2 * t;
  const mt = 1 - t;
  const mt2 = mt * mt;
  const mt3 = mt2 * mt;
  
  return (
    p0 * mt3 +
    3 * p1 * mt2 * t +
    3 * p2 * mt * t2 +
    p3 * t3
  );
};

/**
 * Calculate the tangent of a cubic bezier curve at position t (0-1)
 */
const calculateCubicBezierTangent = (
  p0: number,
  p1: number,
  p2: number,
  p3: number,
  t: number
): number => {
  const t2 = t * t;
  const mt = 1 - t;
  const mt2 = mt * mt;
  
  return (
    3 * mt2 * (p1 - p0) +
    6 * mt * t * (p2 - p1) +
    3 * t2 * (p3 - p2)
  );
};

/**
 * Generates the SVG paths for an olive branch using sacred geometry
 */
const generateOliveBranch = (
  leafCount: number = 5,
  leafSize: number = 1,
  curvature: number = 0.3,
  includeOlives: boolean = true,
  oliveFill: string = 'currentColor',
  mirror: boolean = false
): React.ReactNode => {
  const elements: JSX.Element[] = [];
  const viewBoxWidth = 100;
  const viewBoxHeight = 100;
  const centerY = viewBoxHeight / 2;
  
  // Calculate the main branch curve using golden ratio proportions
  const branchLength = viewBoxWidth * 0.7; // 70% of viewbox width
  const startX = mirror ? viewBoxWidth - (viewBoxWidth * 0.15) : viewBoxWidth * 0.15;
  const startY = centerY + (viewBoxHeight * 0.1);
  const endX = mirror ? viewBoxWidth * 0.15 : viewBoxWidth - (viewBoxWidth * 0.15);
  const endY = centerY - (viewBoxHeight * 0.1);
  
  // Control points for the main branch curve (based on golden ratio)
  const cp1x = startX + (mirror ? -branchLength * PHI_INVERSE * curvature : branchLength * PHI_INVERSE * curvature);
  const cp1y = startY - (viewBoxHeight * 0.2);
  const cp2x = endX + (mirror ? branchLength * PHI_INVERSE * curvature : -branchLength * PHI_INVERSE * curvature);
  const cp2y = endY + (viewBoxHeight * 0.1);
  
  // Create the main branch path
  const branchPath = `M ${startX},${startY} C ${cp1x},${cp1y} ${cp2x},${cp2y} ${endX},${endY}`;
  elements.push(
    <path
      key="main-branch"
      d={branchPath}
      stroke="currentColor"
      strokeWidth={leafSize * 1.5}
      fill="none"
      strokeLinecap="round"
      className="olive-branch-stem"
    />
  );
  
  // Generate leaves along the branch using Fibonacci spacing
  for (let i = 0; i < leafCount; i++) {
    // Position each leaf using Fibonacci-based distribution
    const t = i / (leafCount - 1);
    const mirroredT = mirror ? 1 - t : t;
    
    // Calculate position along the cubic bezier curve
    const leafPositionX = calculateCubicBezierPoint(startX, cp1x, cp2x, endX, mirroredT);
    const leafPositionY = calculateCubicBezierPoint(startY, cp1y, cp2y, endY, mirroredT);
    
    // Alternate leaves on each side of the branch
    const side = i % 2 === 0 ? 1 : -1;
    
    // Gradually decrease leaf size along the branch using golden ratio
    const sizeMultiplier = 1 - (t * (1 - PHI_INVERSE));
    const currentLeafSize = leafSize * sizeMultiplier * 10;
    
    // Calculate leaf angle based on tangent to the branch curve
    const tangentX = calculateCubicBezierTangent(startX, cp1x, cp2x, endX, mirroredT);
    const tangentY = calculateCubicBezierTangent(startY, cp1y, cp2y, endY, mirroredT);
    const angle = Math.atan2(tangentY, tangentX) * (180 / Math.PI);
    
    // Add some natural variation to each leaf
    const angleVariation = (Math.sin(i * PHI) * 20) + (side * 40);
    const finalAngle = mirror ? angle + 180 + angleVariation : angle + angleVariation;
    
    // Create an olive leaf shape using a combination of curves
    elements.push(
      <g
        key={`leaf-${i}`}
        transform={`translate(${leafPositionX}, ${leafPositionY}) rotate(${finalAngle})`}
        className="olive-leaf"
      >
        <path
          d={`
            M 0,0 
            C ${currentLeafSize * 0.2},${-currentLeafSize * 0.1} ${currentLeafSize * 0.4},${-currentLeafSize * 0.3} ${currentLeafSize * 0.618},${-currentLeafSize * 0.1} 
            S ${currentLeafSize},${-currentLeafSize * 0.05} ${currentLeafSize * PHI},0 
            S ${currentLeafSize},${currentLeafSize * 0.05} ${currentLeafSize * 0.618},${currentLeafSize * 0.1} 
            S ${currentLeafSize * 0.4},${currentLeafSize * 0.3} ${currentLeafSize * 0.2},${currentLeafSize * 0.1} 
            S 0,0 0,0
          `}
          stroke="currentColor"
          strokeWidth={leafSize * 0.5}
          fill="none"
        />
      </g>
    );
    
    // Add olives to some of the leaves based on Fibonacci indices
    if (includeOlives && FIBONACCI.indexOf(i + 1) !== -1) {
      const oliveSize = currentLeafSize * 0.3;
      elements.push(
        <circle
          key={`olive-${i}`}
          cx={leafPositionX + (side * oliveSize * (mirror ? -1 : 1))}
          cy={leafPositionY - (oliveSize * 0.5)}
          r={oliveSize}
          fill={oliveFill}
          opacity={0.9}
          className="olive-fruit"
        />
      );
    }
  }
  
  return elements;
};

/**
 * OliveBranch Component with ref forwarding
 * 
 * Creates a mathematically harmonious olive branch design based on sacred geometry
 */
export const OliveBranch = React.forwardRef<SVGSVGElement, OliveBranchProps>(
  ({ 
    leafCount = 5,
    leafSize = 1,
    curvature = 0.3,
    includeOlives = true,
    oliveFill = 'currentColor',
    rotation = 0,
    mirror = false,
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
          {generateOliveBranch(
            leafCount,
            leafSize,
            curvature,
            includeOlives,
            oliveFill,
            mirror
          )}
        </g>
      </BotanicalElement>
    );
  }
);

OliveBranch.displayName = 'OliveBranch';

export default OliveBranch;