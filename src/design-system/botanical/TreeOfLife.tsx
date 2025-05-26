import * as React from 'react';
import { BotanicalElement, BotanicalElementProps } from './BotanicalElement';

/**
 * TreeOfLife Component
 * 
 * A sacred geometry symbol representing the connection between heaven and earth, 
 * consisting of 10 nodes (sephirot) connected in a specific pattern.
 * 
 * This component follows sacred geometric principles with:
 * - Golden ratio proportions for node placement
 * - Symmetry and balance in the overall structure
 * - Connection patterns that represent cosmic principles
 */
const TreeOfLife: React.FC<Omit<BotanicalElementProps, 'children'>> = (props) => {
  const { size = 'md', color, ...rest } = props;
  
  return (
    <BotanicalElement 
      size={size}
      color={color}
      viewBox="0 0 100 140"
      preserveAspectRatio={true}
      {...rest}
    >
      <g fill="none" stroke="currentColor" strokeWidth="1.5">
        {/* The 10 sephirot (nodes) */}
        <circle cx="50" cy="10" r="7" /> {/* Keter */}
        <circle cx="30" cy="25" r="7" /> {/* Chokmah */}
        <circle cx="70" cy="25" r="7" /> {/* Binah */}
        <circle cx="50" cy="40" r="7" /> {/* Daat (optional) */}
        <circle cx="20" cy="55" r="7" /> {/* Chesed */}
        <circle cx="80" cy="55" r="7" /> {/* Geburah */}
        <circle cx="50" cy="70" r="7" /> {/* Tiferet */}
        <circle cx="30" cy="85" r="7" /> {/* Netzach */}
        <circle cx="70" cy="85" r="7" /> {/* Hod */}
        <circle cx="50" cy="100" r="7" /> {/* Yesod */}
        <circle cx="50" cy="130" r="7" /> {/* Malkuth */}
        
        {/* Connection lines between the sephirot */}
        <path d="M50,17 L30,25 L50,40 L70,25 L50,17" />
        <path d="M30,32 L20,55 L50,70 L80,55 L70,32" />
        <path d="M20,62 L30,85 L50,100 L70,85 L80,62" />
        <path d="M50,77 L50,130" />
        
        {/* Middle pillar */}
        <path d="M50,17 L50,40 L50,70 L50,100" />
        
        {/* Left pillar */}
        <path d="M30,32 L30,85" />
        
        {/* Right pillar */}
        <path d="M70,32 L70,85" />
      </g>
    </BotanicalElement>
  );
};

export default TreeOfLife; 