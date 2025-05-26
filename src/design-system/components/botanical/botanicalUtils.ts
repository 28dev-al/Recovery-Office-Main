import { CSSProperties } from 'react';
import { css } from 'styled-components';
import { 
  PHI_INVERSE,
  getFibonacciByIndex
} from '../../../constants/sacred-geometry';

/**
 * Botanical Utilities
 * 
 * This module provides utilities for positioning, scaling, and optimizing
 * botanical elements throughout the application. All utilities follow
 * sacred geometry principles to ensure harmonious integration.
 */

// ===== Positioning Utilities =====

/**
 * Available positions for botanical elements
 * Using kebab-case for consistency with other APIs
 */
export type BotanicalPosition = 
  | 'top-left' 
  | 'top-right' 
  | 'bottom-left' 
  | 'bottom-right' 
  | 'top-center' 
  | 'bottom-center' 
  | 'left-center' 
  | 'right-center' 
  | 'golden-left' 
  | 'golden-right' 
  | 'golden-top' 
  | 'golden-bottom'
  | 'center'
  // Legacy camelCase positions for backward compatibility
  | 'topLeft' 
  | 'topRight' 
  | 'bottomLeft' 
  | 'bottomRight' 
  | 'topCenter' 
  | 'bottomCenter' 
  | 'leftCenter' 
  | 'rightCenter' 
  | 'goldenLeft' 
  | 'goldenRight' 
  | 'goldenTop' 
  | 'goldenBottom';

/**
 * Normalize legacy camelCase position values to kebab-case
 */
export const normalizePosition = (position: BotanicalPosition): BotanicalPosition => {
  // Map legacy camelCase to kebab-case
  switch (position) {
    case 'topLeft': return 'top-left';
    case 'topRight': return 'top-right';
    case 'bottomLeft': return 'bottom-left';
    case 'bottomRight': return 'bottom-right';
    case 'topCenter': return 'top-center';
    case 'bottomCenter': return 'bottom-center';
    case 'leftCenter': return 'left-center';
    case 'rightCenter': return 'right-center';
    case 'goldenLeft': return 'golden-left';
    case 'goldenRight': return 'golden-right';
    case 'goldenTop': return 'golden-top';
    case 'goldenBottom': return 'golden-bottom';
    default: return position; // Already kebab-case or 'center'
  }
};

/**
 * Available size presets for botanical elements
 */
export type BotanicalSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

/**
 * Options for the getBotanicalPositionStyles function
 */
export interface BotanicalPositionOptions {
  /**
   * The position to place the botanical element
   */
  position: BotanicalPosition;
  
  /**
   * Optional rotation angle in degrees
   */
  rotation?: number;
  
  /**
   * Optional z-index
   */
  zIndex?: number;
  
  /**
   * Optional offset in pixels or CSS units
   */
  offset?: {
    x?: string | number;
    y?: string | number;
  };
  
  /**
   * Whether to apply a subtle animation
   */
  animate?: boolean;
}

/**
 * Get CSS position styles for placing botanical elements
 * 
 * @param options Positioning options
 * @returns CSS properties object
 */
export const getBotanicalPositionStyles = (
  options: BotanicalPositionOptions
): CSSProperties => {
  const { 
    position, 
    rotation = 0, 
    zIndex = 0,
    offset = { x: 0, y: 0 },
    animate = false
  } = options;
  
  // Convert number offsets to pixel values
  const xOffset = typeof offset.x === 'number' ? `${offset.x}px` : offset.x;
  const yOffset = typeof offset.y === 'number' ? `${offset.y}px` : offset.y;
  
  // Base styles
  const baseStyles: CSSProperties = {
    position: 'absolute',
    zIndex,
    transform: `rotate(${rotation}deg)`,
    ...(animate && { transition: `all 0.5s cubic-bezier(${PHI_INVERSE}, 0, ${1 - PHI_INVERSE}, 1)` })
  };
  
  // Normalize position to kebab-case format
  const normalizedPosition = normalizePosition(position);
  
  // Position-specific styles
  switch (normalizedPosition) {
    case 'top-left':
      return {
        ...baseStyles,
        top: yOffset,
        left: xOffset,
      };
      
    case 'top-right':
      return {
        ...baseStyles,
        top: yOffset,
        right: xOffset,
      };
      
    case 'bottom-left':
      return {
        ...baseStyles,
        bottom: yOffset,
        left: xOffset,
      };
      
    case 'bottom-right':
      return {
        ...baseStyles,
        bottom: yOffset,
        right: xOffset,
      };
      
    case 'top-center':
      return {
        ...baseStyles,
        top: yOffset,
        left: '50%',
        transform: `translateX(-50%) rotate(${rotation}deg)`,
      };
      
    case 'bottom-center':
      return {
        ...baseStyles,
        bottom: yOffset,
        left: '50%',
        transform: `translateX(-50%) rotate(${rotation}deg)`,
      };
      
    case 'left-center':
      return {
        ...baseStyles,
        left: xOffset,
        top: '50%',
        transform: `translateY(-50%) rotate(${rotation}deg)`,
      };
      
    case 'right-center':
      return {
        ...baseStyles,
        right: xOffset,
        top: '50%',
        transform: `translateY(-50%) rotate(${rotation}deg)`,
      };
      
    case 'golden-left':
      return {
        ...baseStyles,
        left: xOffset,
        top: `${PHI_INVERSE * 100}%`,
        transform: `translateY(-50%) rotate(${rotation}deg)`,
      };
      
    case 'golden-right':
      return {
        ...baseStyles,
        right: xOffset,
        top: `${PHI_INVERSE * 100}%`,
        transform: `translateY(-50%) rotate(${rotation}deg)`,
      };
      
    case 'golden-top':
      return {
        ...baseStyles,
        top: yOffset,
        left: `${PHI_INVERSE * 100}%`,
        transform: `translateX(-50%) rotate(${rotation}deg)`,
      };
      
    case 'golden-bottom':
      return {
        ...baseStyles,
        bottom: yOffset,
        left: `${PHI_INVERSE * 100}%`,
        transform: `translateX(-50%) rotate(${rotation}deg)`,
      };
      
    case 'center':
      return {
        ...baseStyles,
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
      };
      
    default:
      // Fallback to center position if not recognized
      return {
        ...baseStyles,
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
      };
  }
};

/**
 * Get the size in pixels for a botanical size preset
 * 
 * @param size Size preset
 * @returns Size in pixels
 */
export const getBotanicalSize = (size: BotanicalSize): number => {
  switch (size) {
    case 'xs': return getFibonacciByIndex(6); // 8px
    case 'sm': return getFibonacciByIndex(7); // 13px
    case 'md': return getFibonacciByIndex(8); // 21px
    case 'lg': return getFibonacciByIndex(9); // 34px
    case 'xl': return getFibonacciByIndex(10); // 55px
    case 'xxl': return getFibonacciByIndex(11); // 89px
    default: return getFibonacciByIndex(8); // 21px
  }
};

// ===== Responsive Scaling =====

/**
 * Breakpoint sizes for responsive scaling
 */
export const botanicalBreakpoints = {
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
};

/**
 * Creates a responsive scale factor for botanical elements
 * based on viewport size and the golden ratio
 */
export const responsiveBotanicalScale = css`
  /* Base size (mobile) */
  transform: scale(1);
  
  /* Scale up proportionally based on golden ratio at each breakpoint */
  @media (min-width: ${botanicalBreakpoints.sm}) {
    transform: scale(${1 + (PHI_INVERSE * 0.25)});
  }
  
  @media (min-width: ${botanicalBreakpoints.md}) {
    transform: scale(${1 + (PHI_INVERSE * 0.5)});
  }
  
  @media (min-width: ${botanicalBreakpoints.lg}) {
    transform: scale(${1 + (PHI_INVERSE * 0.75)});
  }
  
  @media (min-width: ${botanicalBreakpoints.xl}) {
    transform: scale(${1 + PHI_INVERSE});
  }
  
  /* Ensure smooth transitions */
  transition: transform 0.3s cubic-bezier(${PHI_INVERSE}, 0, ${1 - PHI_INVERSE}, 1);
`;

/**
 * Responsive hiding utilities for botanical elements
 */
export const responsiveBotanicalVisibility = {
  /**
   * Only show on mobile
   */
  mobileOnly: css`
    display: block;
    
    @media (min-width: ${botanicalBreakpoints.md}) {
      display: none;
    }
  `,
  
  /**
   * Only show on tablet and above
   */
  tabletUp: css`
    display: none;
    
    @media (min-width: ${botanicalBreakpoints.md}) {
      display: block;
    }
  `,
  
  /**
   * Only show on desktop
   */
  desktopOnly: css`
    display: none;
    
    @media (min-width: ${botanicalBreakpoints.lg}) {
      display: block;
    }
  `,
};

// ===== Accessibility =====

/**
 * Accessibility utilities for botanical elements
 */
export const accessibleBotanical = {
  /**
   * Hide botanical element from screen readers (for decorative elements)
   */
  decorative: css`
    aria-hidden: true;
  `,
  
  /**
   * Hide botanical elements when reduced motion is preferred
   */
  reduceMotion: css`
    @media (prefers-reduced-motion: reduce) {
      /* Use opacity instead of display:none to avoid layout shifts */
      opacity: 0.5;
      
      /* Disable any animations */
      animation: none !important;
      transition: none !important;
    }
  `,
  
  /**
   * Simplify botanical elements for high contrast mode
   */
  highContrast: css`
    @media (prefers-contrast: more) {
      /* Simplify the design by increasing stroke width and contrast */
      & path, & circle, & ellipse, & rect, & polygon {
        stroke-width: 2px !important;
        fill: transparent !important;
        stroke: currentColor !important;
      }
    }
  `,
};

/**
 * Create a BotanicalContainer component with a positioned botanical element
 * 
 * @example
 * const DecoratedBox = styled.div`
 *   ${createBotanicalContainer('oliveBranch', 'bottomRight')}
 * `;
 */
export const createBotanicalContainer = (
  botanicalType: string,
  position: BotanicalPosition,
  size: BotanicalSize = 'md'
) => {
  // Get position styles based on the provided position
  const positionStyles = getBotanicalPositionStyles({ position });
  
  // Convert to CSS template literal
  return css`
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      top: ${positionStyles.top || 'auto'};
      right: ${positionStyles.right || 'auto'};
      bottom: ${positionStyles.bottom || 'auto'};
      left: ${positionStyles.left || 'auto'};
      transform: ${positionStyles.transform || 'none'};
      z-index: ${positionStyles.zIndex || 0};
      width: ${getBotanicalSize(size)}px;
      height: ${getBotanicalSize(size)}px;
      background-image: url("data:image/svg+xml,..."); /* SVG content */
      background-size: contain;
      background-repeat: no-repeat;
      ${accessibleBotanical.decorative}
    }
  `;
}; 










