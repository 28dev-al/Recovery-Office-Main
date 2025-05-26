/**
 * FlowerOfLife Component
 * 
 * A component that renders the Flower of Life sacred geometry pattern.
 * The Flower of Life is a geometric pattern composed of multiple evenly-spaced,
 * overlapping circles arranged in a flower-like pattern with six-fold symmetry.
 * 
 * This pattern is found throughout nature and is considered one of the
 * fundamental patterns of sacred geometry, thought to represent creation and the 
 * interconnectedness of all life.
 */

import * as React from 'react';
import BotanicalElement, { BotanicalElementProps } from './BotanicalElement';


/**
 * FlowerOfLife component props
 */
export interface FlowerOfLifeProps extends Omit<BotanicalElementProps, 'children'> {
  /**
   * The number of rings in the Flower of Life
   * @default 3
   */
  rings?: number;
  
  /**
   * The radius of each circle
   * @default 10
   */
  radius?: number;
  
  /**
   * Whether to show the seed of life (innermost 7 circles)
   * @default true
   */
  showSeedOfLife?: boolean;
  
  /**
   * Whether to show the central circle
   * @default true
   */
  showCenter?: boolean;
  
  /**
   * Optional fill color for the center circle
   */
  centerFill?: string;
  
  /**
   * Optional rotation of the entire pattern in degrees
   * @default 0
   */
  rotation?: number;
  
  /**
   * Primary color for the element (alias for color prop)
   */
  primaryColor?: string;
  
  /**
   * Secondary color for accents (if applicable)
   */
  secondaryColor?: string;
  
  /**
   * Whether the element should animate
   * @default false
   */
  animated?: boolean;
}

/**
 * Generates the paths for the Flower of Life pattern
 */
const generateFlowerOfLife = (
  rings: number = 3,
  radius: number = 10,
  showSeedOfLife: boolean = true,
  showCenter: boolean = true,
  centerFill: string = 'none'
): React.ReactNode => {
  const circles: JSX.Element[] = [];
  const center = { x: 50, y: 50 }; // Center of the viewBox
  
  // Helper function to calculate distance between two points
  const distance = (x1: number, y1: number, x2: number, y2: number): number => {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  };
  
  // Create center circle
  if (showCenter) {
    circles.push(
      <circle
        key="center"
        cx={center.x}
        cy={center.y}
        r={radius}
        fill={centerFill}
        className="flower-center"
      />
    );
  }
  
  // Create first ring of 6 circles (Seed of Life when combined with center)
  const firstRingRadius = radius * 2; // Distance from center to first ring circles
  const firstRingCircles: { cx: number; cy: number }[] = [];
  
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i; // 60 degrees in radians
    const cx = center.x + firstRingRadius * Math.cos(angle);
    const cy = center.y + firstRingRadius * Math.sin(angle);
    
    firstRingCircles.push({ cx, cy });
    
    if (showSeedOfLife || rings > 1) {
      circles.push(
        <circle
          key={`ring1-${i}`}
          cx={cx}
          cy={cy}
          r={radius}
          className="flower-ring-1"
        />
      );
    }
  }
  
  // Create additional rings if requested
  if (rings > 1) {
    const processedPoints = new Set<string>();
    // Add center and first ring to processed points
    processedPoints.add(`${center.x},${center.y}`);
    firstRingCircles.forEach(({cx, cy}) => {
      processedPoints.add(`${cx},${cy}`);
    });
    
    // Function to create a circle at a point if it hasn't been processed yet
    const createCircleAtPoint = (cx: number, cy: number, ringIndex: number): void => {
      const pointKey = `${cx.toFixed(3)},${cy.toFixed(3)}`;
      if (!processedPoints.has(pointKey)) {
        // Only add the circle if it's within the desired number of rings
        if (ringIndex <= rings) {
          circles.push(
            <circle
              key={`ring${ringIndex}-${circles.length}`}
              cx={cx}
              cy={cy}
              r={radius}
              className={`flower-ring-${ringIndex}`}
            />
          );
        }
        processedPoints.add(pointKey);
      }
    };
    
    // Create all other circles using the principle of intersection
    // For each pair of existing circles, if they intersect, add circles at their intersection points
    for (let ringIndex = 2; ringIndex <= rings; ringIndex++) {
      const currentPoints: { cx: number; cy: number }[] = [];
      
      // Get all current circles
      const allCircles = [...firstRingCircles, { cx: center.x, cy: center.y }];
      
      // Find new intersection points from existing circles
      for (let i = 0; i < allCircles.length; i++) {
        for (let j = i + 1; j < allCircles.length; j++) {
          const circle1 = allCircles[i] || { cx: 0, cy: 0 };
          const circle2 = allCircles[j] || { cx: 0, cy: 0 };
          
          // Calculate distance between circle centers
          const d = distance(circle1.cx, circle1.cy, circle2.cx, circle2.cy);
          
          // If circles intersect (d < 2r but d > 0)
          if (d < 2 * radius * 1.01 && d > 0.1) { // Small buffer for floating point
            // Calculate intersection points using circle intersection formula
            const a = (radius * radius - radius * radius + d * d) / (2 * d);
            const h = Math.sqrt(radius * radius - a * a);
            
            const x2 = circle1.cx + a * (circle2.cx - circle1.cx) / d;
            const y2 = circle1.cy + a * (circle2.cy - circle1.cy) / d;
            
            // Get the two intersection points
            const intersect1 = {
              cx: x2 + h * (circle2.cy - circle1.cy) / d,
              cy: y2 - h * (circle2.cx - circle1.cx) / d
            };
            
            const intersect2 = {
              cx: x2 - h * (circle2.cy - circle1.cy) / d,
              cy: y2 + h * (circle2.cx - circle1.cx) / d
            };
            
            // Add these points if they're within our viewBox boundaries (with some margin)
            const margin = radius * 2;
            if (intersect1.cx >= 0 - margin && intersect1.cx <= 100 + margin &&
                intersect1.cy >= 0 - margin && intersect1.cy <= 100 + margin) {
              createCircleAtPoint(intersect1.cx, intersect1.cy, ringIndex);
              currentPoints.push(intersect1);
            }
            
            if (intersect2.cx >= 0 - margin && intersect2.cx <= 100 + margin &&
                intersect2.cy >= 0 - margin && intersect2.cy <= 100 + margin) {
              createCircleAtPoint(intersect2.cx, intersect2.cy, ringIndex);
              currentPoints.push(intersect2);
            }
          }
        }
      }
      
      // Add current points to allCircles for next iteration
      allCircles.push(...currentPoints);
    }
  }
  
  return circles;
};

/**
 * FlowerOfLife Component with ref forwarding
 * 
 * Creates the Flower of Life sacred geometry pattern
 */
export const FlowerOfLife = React.forwardRef<SVGSVGElement, FlowerOfLifeProps>(
  ({ 
    rings = 3,
    radius = 10,
    showSeedOfLife = true,
    showCenter = true,
    centerFill = 'none',
    rotation = 0,
    viewBox = '0 0 100 100',
    color,
    primaryColor,
    secondaryColor,
    animated = false,
    ...rest 
  }, ref) => {
    // Use primaryColor as an alias for color if provided
    const finalColor = primaryColor || color;
    
    return (
      <BotanicalElement
        viewBox={viewBox}
        ref={ref}
        color={finalColor}
        {...rest}
      >
        <g 
          transform={`rotate(${rotation}, 50, 50)`}
          style={{ 
            transformOrigin: 'center',
            ...(animated && { animation: 'slow-spin 30s linear infinite' })
          }}
        >
          {generateFlowerOfLife(
            rings,
            radius,
            showSeedOfLife,
            showCenter,
            centerFill || secondaryColor || 'none'
          )}
        </g>
      </BotanicalElement>
    );
  }
);

FlowerOfLife.displayName = 'FlowerOfLife';

export default FlowerOfLife; 










