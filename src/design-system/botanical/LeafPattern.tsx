/**
 * LeafPattern Component
 * 
 * A decorative pattern component that arranges multiple olive leaves
 * in a harmonious pattern based on sacred geometry principles.
 * 
 * This component creates aesthetic arrangements of leaves using
 * golden ratio proportions and fibonacci-based positioning.
 */

import * as React from 'react';
import { forwardRef } from 'react';

import { OliveLeaf } from './OliveLeaf';

import BotanicalElement, { BotanicalElementProps } from './BotanicalElement';

import { PHI, PHI_INVERSE, getFibonacciByIndex } from '../../constants/sacred-geometry';


/**
 * LeafPattern component props
 */
export interface LeafPatternProps extends Omit<BotanicalElementProps, 'children'> {
  /**
   * The density of leaves in the pattern (higher = more leaves)
   * @default 'medium'
   */
  density?: 'low' | 'medium' | 'high';
  
  /**
   * The overall size of the pattern
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';
  
  /**
   * Whether to animate the pattern subtly
   * @default false
   */
  animated?: boolean;
  
  /**
   * Optional rotation of the entire pattern in degrees
   * @default 0
   */
  rotation?: number;
  
  /**
   * Whether to use a spiral arrangement based on golden ratio
   * @default true
   */
  spiralArrangement?: boolean;
}

/**
 * Calculate the number of leaves based on density using Fibonacci sequence
 */
const getLeafCount = (density: 'low' | 'medium' | 'high'): number => {
  switch (density) {
    case 'low':
      return getFibonacciByIndex(5); // 5
    case 'high':
      return getFibonacciByIndex(8); // 21
    case 'medium':
    default:
      return getFibonacciByIndex(7); // 13
  }
};

/**
 * Get size multiplier based on size prop
 */
const getSizeMultiplier = (size: 'small' | 'medium' | 'large'): number => {
  switch (size) {
    case 'small':
      return 0.7;
    case 'large':
      return 1.3;
    case 'medium':
    default:
      return 1;
  }
};

/**
 * Generate a leaf pattern using golden ratio and Fibonacci-based positioning
 */
const generateLeafPattern = (
  density: 'low' | 'medium' | 'high',
  size: 'small' | 'medium' | 'large',
  spiralArrangement: boolean
): React.ReactNode => {
  const elements: JSX.Element[] = [];
  const leafCount = getLeafCount(density);
  const sizeMultiplier = getSizeMultiplier(size);
  
  // Define the viewbox parameters
  const viewBoxSize = 100;
  const center = viewBoxSize / 2;
  
  for (let i = 0; i < leafCount; i++) {
    // Calculate position using either spiral or radial arrangement
    let x: number, y: number, rotation: number;
    
    if (spiralArrangement) {
      // Golden spiral arrangement (using golden angle: ~137.5 degrees)
      const goldenAngle = 360 * PHI_INVERSE * PHI_INVERSE; // ~137.5 degrees
      const angle = i * goldenAngle;
      
      // Radius increases with sqrt(i) to maintain even density
      const radius = Math.sqrt(i) * (viewBoxSize / 4 * PHI_INVERSE);
      
      // Convert polar to cartesian coordinates
      const radians = angle * (Math.PI / 180);
      x = center + radius * Math.cos(radians);
      y = center + radius * Math.sin(radians);
      
      // Rotate leaf to follow the spiral
      rotation = angle + 90;
    } else {
      // Radial arrangement with Fibonacci-based positioning
      const angle = (i / leafCount) * 360;
      
      // Use PHI to vary distance from center
      const distanceMultiplier = 0.3 + (0.7 * ((i % 3) * PHI_INVERSE));
      const radius = (viewBoxSize / 3) * distanceMultiplier;
      
      // Convert polar to cartesian coordinates
      const radians = angle * (Math.PI / 180);
      x = center + radius * Math.cos(radians);
      y = center + radius * Math.sin(radians);
      
      // Point leaves outward from center
      rotation = angle;
    }
    
    // Vary leaf size using golden ratio
    const leafSizeVariation = 0.5 + ((i % 3) * PHI_INVERSE * 0.5);
    const leafSize = leafSizeVariation * sizeMultiplier;
    
    // Vary slenderness slightly for natural appearance
    const slenderness = 0.25 + (Math.sin(i * PHI) * 0.1);
    
    // Alternate mirroring based on position
    const mirror = i % 2 === 0;
    
    // Generate leaf with calculated properties
    elements.push(
      <g
        key={`leaf-${i}`}
        transform={`translate(${x}, ${y})`}
      >
        <OliveLeaf
          leafSize={leafSize}
          slenderness={slenderness}
          rotation={rotation}
          mirror={mirror}
          midribIntensity={0.6 + (Math.random() * 0.3)}
          width={leafSize * 20}
          height={leafSize * 20}
          opacity={0.8 + (Math.random() * 0.2)}
        />
      </g>
    );
  }
  
  return elements;
};

/**
 * Get animation CSS based on animated prop
 */
const getAnimationStyles = (animated: boolean) => {
  if (!animated) return '';
  
  return `
    @keyframes gentle-sway {
      0%, 100% { transform: rotate(0deg); }
      50% { transform: rotate(3deg); }
    }
    
    g {
      transform-origin: center;
      animation: gentle-sway ${8 * PHI}s ease-in-out infinite;
      animation-delay: calc(var(--leaf-index, 0) * 0.5s);
    }
    
    g:nth-child(odd) {
      animation-direction: alternate-reverse;
    }
  `;
};

/**
 * LeafPattern Component with ref forwarding
 * 
 * Creates a pattern of leaves arranged according to sacred geometry principles
 */
export const LeafPattern = forwardRef<SVGSVGElement, LeafPatternProps>(
  ({ 
    density = 'medium',
    size = 'medium',
    animated = false,
    rotation = 0,
    spiralArrangement = true,
    ...rest 
  }, ref) => {
    return (
      <BotanicalElement
        ref={ref}
        decorative={true}
        viewBox="0 0 100 100"
        {...rest}
      >
        <style>
          {getAnimationStyles(animated)}
        </style>
        
        <g 
          transform={`rotate(${rotation}, 50, 50)`}
          style={{ transformOrigin: 'center' }}
        >
          {generateLeafPattern(density, size, spiralArrangement)}
        </g>
      </BotanicalElement>
    );
  }
);

LeafPattern.displayName = 'LeafPattern';

export default LeafPattern; 













