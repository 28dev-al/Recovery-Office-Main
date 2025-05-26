/**
 * SmallFlourish Component
 * 
 * A decorative botanical element that creates a small, elegant flourish
 * based on sacred geometry principles. These flourishes can be used
 * as subtle decorative elements throughout the application.
 * 
 * The design uses golden ratio curves and Fibonacci spacing to create
 * a visually harmonious decoration.
 */

import * as React from 'react';
import { forwardRef } from 'react';
import BotanicalElement, { BotanicalElementProps } from './BotanicalElement';
import { SmallFlourishVariant } from '../../types/botanical.types';

// Define constants locally until we fix the constants directory
const PHI = 1.618033988749895;
const PHI_INVERSE = 0.618033988749895;
const FIBONACCI = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89];

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
 * SmallFlourish component props
 *
 * TypeScript fix: Redefine 'variant' by omitting it from BotanicalElementProps to allow SmallFlourishVariant
 */
export interface SmallFlourishProps extends Omit<BotanicalElementProps, 'children' | 'variant'> {
  /**
   * The style variant of the flourish
   * @default 'curved'
   */
  variant?: SmallFlourishVariant;
  
  /**
   * The flourish complexity level
   * @default 1
   */
  complexity?: number;
  
  /**
   * Optional rotation of the flourish in degrees
   * @default 0
   */
  rotation?: number;
  
  /**
   * Whether to mirror the flourish horizontally
   * @default false
   */
  mirror?: boolean;
  
  /**
   * The level of detail in the flourish
   * @default 1
   */
  detailLevel?: number;
}

/**
 * Generates a decorative flourish SVG path using sacred geometry
 */
const generateSmallFlourish = (
  variant: 'curved' | 'angular' | 'spiral' | 'wave' = 'curved',
  complexity: number = 1, 
  mirror: boolean = false,
  detailLevel: number = 1
): React.ReactNode => {
  const elements: JSX.Element[] = [];
  const viewBoxWidth = 100;
  const viewBoxHeight = 60;
  const centerX = viewBoxWidth / 2;
  const centerY = viewBoxHeight / 2;
  
  // Scale to fit within the viewBox
  const scale = 0.8;
  
  // Calculate the flourish dimensions
  switch (variant) {
    case 'curved': {
      // A curved flourish based on Fibonacci proportions
      const curveLength = viewBoxWidth * scale;
      const startX = mirror ? (viewBoxWidth - (viewBoxWidth * scale * 0.1)) : (viewBoxWidth * scale * 0.1);
      const startY = centerY;
      const endX = mirror ? (viewBoxWidth * scale * 0.1) : (viewBoxWidth - (viewBoxWidth * scale * 0.1));
      const endY = centerY;
      
      // Control points using golden ratio
      const cp1x = startX + (mirror ? -curveLength * 0.2 : curveLength * 0.2);
      const cp1y = startY - (viewBoxHeight * 0.3 * complexity);
      const cp2x = endX + (mirror ? curveLength * 0.2 : -curveLength * 0.2);
      const cp2y = endY - (viewBoxHeight * 0.3 * complexity);
      
      // Create the main flourish curve
      const flourishPath = `M ${startX},${startY} C ${cp1x},${cp1y} ${cp2x},${cp2y} ${endX},${endY}`;
      elements.push(
        <path
          key="main-flourish"
          d={flourishPath}
          stroke="currentColor"
          strokeWidth={1}
          fill="none"
          strokeLinecap="round"
          className="flourish-main"
        />
      );
      
      // Add decorative elements along the curve
      if (detailLevel > 0) {
        // Number of decorative elements based on complexity and Fibonacci
        const decorationCount = FIBONACCI[3 + Math.floor(complexity)]; // 3-8 elements
        
        for (let i = 0; i < decorationCount; i++) {
          const t = i / (decorationCount - 1);
          const mirroredT = mirror ? 1 - t : t;
          
          // Calculate position along the cubic bezier curve
          const decorX = calculateCubicBezierPoint(startX, cp1x, cp2x, endX, mirroredT);
          const decorY = calculateCubicBezierPoint(startY, cp1y, cp2y, endY, mirroredT);
          
          // Size based on golden ratio and position
          const sizeMultiplier = Math.sin(t * Math.PI) * detailLevel;
          const decorSize = 3 * sizeMultiplier;
          
          // Create a decorative element (dot, small curve, etc.)
          const shouldCreateLeaf = FIBONACCI.indexOf(i + 2) !== -1;
          
          if (shouldCreateLeaf && detailLevel > 0.5) {
            // Create a small leaf-like decoration
            const angle = Math.atan2(
              calculateCubicBezierTangent(startY, cp1y, cp2y, endY, mirroredT),
              calculateCubicBezierTangent(startX, cp1x, cp2x, endX, mirroredT)
            ) * (180 / Math.PI) + (mirror ? 180 : 0);
            
            // Small curved line on alternating sides
            const side = i % 2 === 0 ? 1 : -1;
            const leafLength = decorSize * PHI;
            
            elements.push(
              <g
                key={`decoration-${i}`}
                transform={`translate(${decorX}, ${decorY}) rotate(${angle})`}
                className="flourish-decoration"
              >
                <path
                  d={`
                    M 0,0 
                    Q ${leafLength * 0.5},${side * leafLength * 0.3} ${leafLength},0
                  `}
                  stroke="currentColor"
                  strokeWidth={0.7 * detailLevel}
                  fill="none"
                  strokeLinecap="round"
                />
              </g>
            );
          } else {
            // Simple dot at Fibonacci positions
            elements.push(
              <circle
                key={`dot-${i}`}
                cx={decorX}
                cy={decorY}
                r={0.8 * sizeMultiplier}
                fill="currentColor"
                className="flourish-dot"
              />
            );
          }
        }
      }
      break;
    }
    
    case 'angular': {
      // An angular flourish with golden ratio proportions
      const length = viewBoxWidth * scale;
      const startX = mirror ? (viewBoxWidth - (viewBoxWidth * scale * 0.1)) : (viewBoxWidth * scale * 0.1);
      const startY = centerY;
      const endX = mirror ? (viewBoxWidth * scale * 0.1) : (viewBoxWidth - (viewBoxWidth * scale * 0.1));
      const endY = centerY;
      
      // Calculate points using golden ratio segments
      const points = [
        { x: startX, y: startY },
        { x: startX + (mirror ? -length * 0.2 : length * 0.2), y: startY - (viewBoxHeight * 0.15 * complexity) },
        { x: startX + (mirror ? -length * 0.4 : length * 0.4), y: startY - (viewBoxHeight * 0.3 * complexity) },
        { x: startX + (mirror ? -length * 0.6 : length * 0.6), y: startY - (viewBoxHeight * 0.15 * complexity * PHI_INVERSE) },
        { x: startX + (mirror ? -length * 0.8 : length * 0.8), y: startY - (viewBoxHeight * 0.25 * complexity) },
        { x: endX, y: endY }
      ];
      
      // Create the angular path
      let angularPath = `M ${points[0]?.x ?? 0},${points[0]?.y ?? 0}`;
      for (let i = 1; i < points.length; i++) {
        angularPath += ` L ${points[i]?.x ?? 0},${points[i]?.y ?? 0}`;
      }
      
      elements.push(
        <path
          key="main-flourish"
          d={angularPath}
          stroke="currentColor"
          strokeWidth={1}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="flourish-main"
        />
      );
      
      // Add decorative elements at the joints if detail level is high enough
      if (detailLevel > 0.5) {
        for (let i = 1; i < points.length - 1; i++) {
          const decorSize = 2 * detailLevel * (i % 2 === 0 ? 1 : 0.7);
          
          elements.push(
            <circle
              key={`joint-${i}`}
              cx={points[i]?.x ?? 0}
              cy={points[i]?.y ?? 0}
              r={decorSize}
              fill="currentColor"
              className="flourish-joint"
            />
          );
        }
      }
      break;
    }
    
    case 'spiral': {
      // A small spiral flourish based on golden ratio
      const radius = (viewBoxHeight / 2) * 0.7 * complexity;
      const centerOffsetX = mirror ? -viewBoxWidth * 0.2 : viewBoxWidth * 0.2;
      
      // Create a spiral path
      let spiralPath = `M ${centerX + centerOffsetX},${centerY}`;
      
      // Number of spiral segments based on complexity
      const turns = 1 + complexity;
      const segments = 30 * detailLevel;
      
      for (let i = 1; i <= segments; i++) {
        const angle = (i / segments) * turns * Math.PI * 2;
        const distance = radius * (1 - Math.exp(-angle * PHI_INVERSE * 0.3));
        const x = centerX + centerOffsetX + (mirror ? -1 : 1) * distance * Math.cos(angle);
        const y = centerY + distance * Math.sin(angle);
        
        spiralPath += ` L ${x},${y}`;
      }
      
      elements.push(
        <path
          key="spiral-flourish"
          d={spiralPath}
          stroke="currentColor"
          strokeWidth={1}
          fill="none"
          strokeLinecap="round"
          className="flourish-spiral"
        />
      );
      
      // Add a decorative dot at the center
      elements.push(
        <circle
          key="spiral-center"
          cx={centerX + centerOffsetX}
          cy={centerY}
          r={1.5 * detailLevel}
          fill="currentColor"
          className="flourish-center"
        />
      );
      break;
    }
    
    case 'wave': {
      // A wave flourish with golden ratio wave heights
      const startX = mirror ? (viewBoxWidth - (viewBoxWidth * scale * 0.1)) : (viewBoxWidth * scale * 0.1);
      const startY = centerY;
      const endX = mirror ? (viewBoxWidth * scale * 0.1) : (viewBoxWidth - (viewBoxWidth * scale * 0.1));
      
      // Wave parameters based on golden ratio
      const waveCount = 1 + Math.floor(complexity * 2);
      const waveHeight = (viewBoxHeight * 0.15) * complexity;
      
      // Create the wave path
      let wavePath = `M ${startX},${startY}`;
      
      for (let i = 0; i <= waveCount; i++) {
        const t = i / waveCount;
        const x = startX + (endX - startX) * t;
        
        // Alternate wave direction and decrease amplitude toward the ends
        const amplitude = waveHeight * Math.sin(t * Math.PI);
        const y = centerY + amplitude * (i % 2 === 0 ? 1 : -1);
        
        if (i === 0) {
          wavePath += ` L ${x},${y}`;
        } else {
          // Control points for smooth wave
          const cpx = startX + (endX - startX) * (t - 0.5 / waveCount);
          const cpy = centerY + amplitude * (i % 2 === 0 ? -1 : 1);
          
          wavePath += ` Q ${cpx},${cpy} ${x},${y}`;
        }
      }
      
      elements.push(
        <path
          key="wave-flourish"
          d={wavePath}
          stroke="currentColor"
          strokeWidth={1}
          fill="none"
          strokeLinecap="round"
          className="flourish-wave"
        />
      );
      
      // Add decorative dots at wave peaks if detail level is high enough
      if (detailLevel > 0.5) {
        for (let i = 0; i < waveCount; i++) {
          const t = (i + 0.5) / waveCount;
          const x = startX + (endX - startX) * t;
          
          // Calculate peak position
          const amplitude = waveHeight * Math.sin(t * Math.PI);
          const y = centerY + amplitude * (i % 2 === 0 ? -1 : 1);
          
          elements.push(
            <circle
              key={`peak-${i}`}
              cx={x}
              cy={y}
              r={1.2 * detailLevel}
              fill="currentColor"
              className="flourish-peak"
            />
          );
        }
      }
      break;
    }
  }
  
  return elements;
};

/**
 * SmallFlourish Component with ref forwarding
 * 
 * Creates an elegant decorative flourish based on sacred geometry principles
 */
export const SmallFlourish = forwardRef<SVGSVGElement, SmallFlourishProps>(
  ({ 
    variant = 'curved',
    complexity = 1,
    rotation = 0,
    mirror = false,
    detailLevel = 1,
    viewBox = '0 0 100 60',
    ...rest 
  }, ref) => {
    return (
      <BotanicalElement
        viewBox={viewBox}
        ref={ref}
        {...rest}
      >
        <g 
          transform={`rotate(${rotation}, 50, 30)`}
          style={{ transformOrigin: 'center' }}
        >
          {generateSmallFlourish(
            variant,
            complexity,
            mirror,
            detailLevel
          )}
        </g>
      </BotanicalElement>
    );
  }
);

SmallFlourish.displayName = 'SmallFlourish';

export default SmallFlourish;

