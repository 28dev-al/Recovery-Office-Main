/**
 * Premium Breakpoint Tokens
 * 
 * This file defines breakpoints for responsive design based on industry standards.
 * These breakpoints create a consistent responsive experience across devices.
 */

// Standard responsive breakpoints
export const PREMIUM_BREAKPOINT_VALUES = {
  xs: 0,       // Mobile small - Default
  sm: 576,     // Mobile large (portrait phones)
  md: 768,     // Tablets 
  lg: 992,     // Desktops, laptops
  xl: 1200,    // Large desktops
  xxl: 1400    // Extra large desktops
};

// Container max widths that correspond to breakpoints
export const PREMIUM_CONTAINER_WIDTHS = {
  sm: 540,     // Small container width
  md: 720,     // Medium container width
  lg: 960,     // Large container width
  xl: 1140,    // Extra large container width
  xxl: 1320    // Extra extra large container width
};

/**
 * Generate media query string for given breakpoint
 * @param breakpoint - The breakpoint key or custom value
 * @param direction - 'up' for min-width, 'down' for max-width
 * @returns Media query string
 */
const createMediaQuery = (
  breakpoint: keyof typeof PREMIUM_BREAKPOINT_VALUES | number,
  direction: 'up' | 'down' = 'up'
): string => {
  const getValue = (): number => {
    if (typeof breakpoint === 'number') return breakpoint;
    return PREMIUM_BREAKPOINT_VALUES[breakpoint] || 0;
  };

  const value = getValue();
  
  // For 'down' media queries, subtract 0.02px to avoid overlapping 
  // with the 'up' media query at the same breakpoint
  const adjustedValue = direction === 'down' ? value - 0.02 : value;
  
  return direction === 'up'
    ? `@media (min-width: ${adjustedValue}px)`
    : `@media (max-width: ${adjustedValue}px)`;
};

// Responsive breakpoint utility functions
export const PREMIUM_BREAKPOINTS = {
  // Raw values
  values: PREMIUM_BREAKPOINT_VALUES,
  container: PREMIUM_CONTAINER_WIDTHS,
  
  // Media query generators
  up: (key: keyof typeof PREMIUM_BREAKPOINT_VALUES | number) => 
    createMediaQuery(key, 'up'),
    
  down: (key: keyof typeof PREMIUM_BREAKPOINT_VALUES | number) => 
    createMediaQuery(key, 'down'),
    
  between: (
    lower: keyof typeof PREMIUM_BREAKPOINT_VALUES | number,
    upper: keyof typeof PREMIUM_BREAKPOINT_VALUES | number
  ) => {
    const lowerValue = typeof lower === 'number' 
      ? lower 
      : PREMIUM_BREAKPOINT_VALUES[lower] || 0;
      
    const upperValue = typeof upper === 'number'
      ? upper - 0.02 // Subtract to avoid overlap
      : PREMIUM_BREAKPOINT_VALUES[upper] - 0.02 || 0;
      
    return `@media (min-width: ${lowerValue}px) and (max-width: ${upperValue}px)`;
  },
  
  only: (key: keyof typeof PREMIUM_BREAKPOINT_VALUES) => {
    const keys = Object.keys(PREMIUM_BREAKPOINT_VALUES) as Array<keyof typeof PREMIUM_BREAKPOINT_VALUES>;
    const keyIndex = keys.indexOf(key);
    
    if (keyIndex === -1 || keyIndex === keys.length - 1) {
      return createMediaQuery(key, 'up');
    }
    
    const nextKey = keys[keyIndex + 1];
    return PREMIUM_BREAKPOINTS.between(key, nextKey);
  },
  
  // Special media queries
  print: '@media print',
  hover: '@media (hover: hover)',
  touch: '@media (hover: none)',
  reducedMotion: '@media (prefers-reduced-motion: reduce)',
  prefersDark: '@media (prefers-color-scheme: dark)',
  prefersLight: '@media (prefers-color-scheme: light)'
};

export default PREMIUM_BREAKPOINTS; 