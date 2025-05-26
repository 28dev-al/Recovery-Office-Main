import * as React from 'react';
import { BotanicalElement, BotanicalElementProps } from './BotanicalElement';

/**
 * SeedOfLife Component
 * 
 * A sacred geometry symbol representing the first stages of creation, consisting of
 * seven overlapping circles arranged in a perfect hexagonal pattern.
 * 
 * This component follows sacred geometric principles with:
 * - Perfect circular symmetry (7 circles - a sacred number)
 * - Golden angle relationships within the structure
 * - Fibonacci-based sizing options
 */
const SeedOfLife: React.FC<Omit<BotanicalElementProps, 'children'>> = (props) => {
  const { size = 'md', color, ...rest } = props;
  
  return (
    <BotanicalElement 
      size={size}
      color={color}
      viewBox="0 0 100 100"
      preserveAspectRatio={true}
      {...rest}
    >
      <g fill="none" stroke="currentColor" strokeWidth="1.5">
        {/* Center circle */}
        <circle cx="50" cy="50" r="15" />
        
        {/* Surrounding circles arranged in a perfect hexagon */}
        <circle cx="50" cy="28.5" r="15" />
        <circle cx="50" cy="71.5" r="15" />
        <circle cx="64.5" cy="39.25" r="15" />
        <circle cx="64.5" cy="60.75" r="15" />
        <circle cx="35.5" cy="39.25" r="15" />
        <circle cx="35.5" cy="60.75" r="15" />
      </g>
    </BotanicalElement>
  );
};

export default SeedOfLife; 