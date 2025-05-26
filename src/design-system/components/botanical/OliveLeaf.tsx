/**
 * OliveLeaf Component
 * 
 * A component that renders a single olive leaf, designed according to
 * sacred geometry principles. The leaf shape is based on the golden ratio
 * and Fibonacci-derived curves for a harmonious appearance.
 * 
 * This component can be used independently or as part of a larger composition.
 */

import * as React from 'react';
import { forwardRef } from 'react';
import { PHI, PHI_INVERSE } from '../../../constants/sacred-geometry';
import BotanicalElement, { BotanicalElementProps } from './BotanicalElement';

/**
 * OliveLeaf component props
 */
export interface OliveLeafProps extends Omit<BotanicalElementProps, 'children'> {
  /**
   * The size of the leaf
   * @default 1
   */
  leafSize?: number;
  
  /**
   * The slenderness of the leaf (higher values = more slender)
   * @default 0.3
   */
  slenderness?: number;
  
  /**
   * Optional rotation of the leaf in degrees
   * @default 0
   */
  rotation?: number;
  
  /**
   * The intensity of the leaf's midrib
   * @default 0.7
   */
  midribIntensity?: number;
  
  /**
   * Whether to mirror the leaf (flip horizontally)
   * @default false
   */
  mirror?: boolean;
}

/**
 * Generates an olive leaf SVG path using sacred geometry
 */
const generateOliveLeaf = (
  size: number = 1,
  slenderness: number = 0.3,
  midribIntensity: number = 0.7,
  mirror: boolean = false
): React.ReactNode => {
  const elements: JSX.Element[] = [];
  const viewBoxWidth = 100;
  const viewBoxHeight = 100;
  const centerX = viewBoxWidth / 2;
  const centerY = viewBoxHeight / 2;
  
  // Scale leaf based on size parameter
  const leafLength = 40 * size;
  const leafWidth = leafLength * slenderness * PHI_INVERSE;
  
  // Begin leaf from the stem point
  const startX = centerX;
  const startY = centerY + (leafLength / 2);
  const tipY = centerY - (leafLength / 2);
  
  // Control points for the leaf edges using golden ratio proportions
  const cp1xBase = leafWidth * PHI;
  const cp1x = mirror ? startX - cp1xBase : startX + cp1xBase;
  const cp1y = startY - (leafLength * PHI_INVERSE);
  
  const cp2xBase = leafWidth;
  const cp2x = mirror ? startX - cp2xBase : startX + cp2xBase;
  const cp2y = tipY + (leafLength * 0.382); // 0.382 is derived from PHI - 1
  
  // Left side control points (mirror of right side)
  const cp3xBase = leafWidth;
  const cp3x = mirror ? startX + cp3xBase : startX - cp3xBase;
  const cp3y = cp2y;
  
  const cp4xBase = leafWidth * PHI;
  const cp4x = mirror ? startX + cp4xBase : startX - cp4xBase;
  const cp4y = cp1y;
  
  // Create the leaf outline path
  const leafPath = `
    M ${startX},${startY}
    C ${cp1x},${cp1y} ${cp2x},${cp2y} ${centerX},${tipY}
    C ${cp3x},${cp3y} ${cp4x},${cp4y} ${startX},${startY}
  `;
  
  elements.push(
    <path
      key="leaf-outline"
      d={leafPath}
      stroke="currentColor"
      strokeWidth={size * 0.5}
      fill="none"
      className="olive-leaf-outline"
    />
  );
  
  // Add the midrib (center vein)
  if (midribIntensity > 0) {
    const midribPath = `M ${startX},${startY} L ${centerX},${tipY}`;
    elements.push(
      <path
        key="leaf-midrib"
        d={midribPath}
        stroke="currentColor"
        strokeWidth={size * 0.3 * midribIntensity}
        strokeOpacity={0.7}
        fill="none"
        className="olive-leaf-midrib"
      />
    );
    
    // Add lateral veins using the golden ratio for positioning
    const veinsCount = 3;
    for (let i = 1; i <= veinsCount; i++) {
      // Position each vein using golden ratio proportions
      const t = i / (veinsCount + 1);
      const tGolden = t * PHI_INVERSE; // Apply golden ratio to spacing
      
      // Calculate point on midrib for vein start
      const veinStartX = startX;
      const veinStartY = startY - (leafLength * tGolden);
      
      // Calculate control and end points for right vein
      const veinRightEndX = mirror ? startX - (leafWidth * 0.8 * (1 - tGolden)) : startX + (leafWidth * 0.8 * (1 - tGolden));
      const veinRightEndY = veinStartY - (leafLength * 0.05 * tGolden);
      const veinRightCpX = mirror ? startX - (leafWidth * 0.4 * (1 - tGolden)) : startX + (leafWidth * 0.4 * (1 - tGolden));
      const veinRightCpY = veinStartY - (leafLength * 0.02 * tGolden);
      
      // Calculate control and end points for left vein
      const veinLeftEndX = mirror ? startX + (leafWidth * 0.8 * (1 - tGolden)) : startX - (leafWidth * 0.8 * (1 - tGolden));
      const veinLeftEndY = veinRightEndY;
      const veinLeftCpX = mirror ? startX + (leafWidth * 0.4 * (1 - tGolden)) : startX - (leafWidth * 0.4 * (1 - tGolden));
      const veinLeftCpY = veinRightCpY;
      
      // Draw the right vein
      elements.push(
        <path
          key={`vein-right-${i}`}
          d={`M ${veinStartX},${veinStartY} Q ${veinRightCpX},${veinRightCpY} ${veinRightEndX},${veinRightEndY}`}
          stroke="currentColor"
          strokeWidth={size * 0.15 * midribIntensity * (1 - (t * 0.3))}
          strokeOpacity={0.5}
          fill="none"
          className="olive-leaf-vein"
        />
      );
      
      // Draw the left vein
      elements.push(
        <path
          key={`vein-left-${i}`}
          d={`M ${veinStartX},${veinStartY} Q ${veinLeftCpX},${veinLeftCpY} ${veinLeftEndX},${veinLeftEndY}`}
          stroke="currentColor"
          strokeWidth={size * 0.15 * midribIntensity * (1 - (t * 0.3))}
          strokeOpacity={0.5}
          fill="none"
          className="olive-leaf-vein"
        />
      );
    }
  }
  
  return elements;
};

/**
 * OliveLeaf Component with ref forwarding
 * 
 * Creates a mathematically harmonious olive leaf based on sacred geometry
 */
export const OliveLeaf = forwardRef<SVGSVGElement, OliveLeafProps>(
  ({ 
    leafSize = 1,
    slenderness = 0.3,
    rotation = 0,
    midribIntensity = 0.7,
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
          {generateOliveLeaf(
            leafSize,
            slenderness,
            midribIntensity,
            mirror
          )}
        </g>
      </BotanicalElement>
    );
  }
);

OliveLeaf.displayName = 'OliveLeaf';

export default OliveLeaf; 







