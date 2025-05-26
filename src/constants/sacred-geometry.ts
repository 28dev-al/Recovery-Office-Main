/**
 * Sacred Geometry Constants
 * 
 * This file contains constants based on sacred geometry principles
 * to be used throughout the application for consistent proportions,
 * spacing, and visual harmony.
 */

// Golden Ratio (Phi) and its inverse
export const PHI = 1.618033988749895;
export const PHI_INVERSE = 0.618033988749895;

// Type definitions for sacred geometry constants
export type FibonacciIndex = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 21 | 34 | 55 | 89 | 144 | 233 | 377 | 610 | 987;
export type FibonacciValue = 1 | 2 | 3 | 5 | 8 | 13 | 21 | 34 | 55 | 89 | 144 | 233 | 377 | 610 | 987;

// Fibonacci sequence (common values used in design)
export const FIBONACCI: Record<FibonacciIndex, FibonacciValue> = {
  1: 1,
  2: 1,
  3: 2,
  4: 3,
  5: 5,
  6: 8,
  7: 13,
  8: 21,
  9: 34,
  10: 55,
  11: 89,
  12: 144,
  13: 233,
  21: 8,
  34: 34,
  55: 55,
  89: 89,
  144: 144,
  233: 233,
  377: 377,
  610: 610,
  987: 987
} as const;

// Get Fibonacci keys as a sorted array
export const getFibonacciKeys = (): number[] => {
  return Object.keys(FIBONACCI)
    .map(Number)
    .sort((a, b) => a - b);
};

// Get Fibonacci values as a sorted array
export const getFibonacciValues = (): number[] => {
  const keys = getFibonacciKeys();
  return keys.map(key => FIBONACCI[key as unknown as FibonacciIndex] ?? 1);
};

/**
 * Get Fibonacci value by index position
 * @param index - Index position (1-based)
 * @returns Fibonacci value at that position
 */
export const getFibonacciByIndex = (index: number): number => {
  const values = getFibonacciValues();
  // Safety checks for out-of-bounds access
  if (values.length === 0) return 1; // Default fallback
  if (index < 0) return values[0] || 1;
  if (index >= values.length) return values[values.length - 1] || 1;
  return values[index] || 1;
};

// Sacred proportions (based on golden ratio)
export const SACRED_PROPORTIONS = {
  xs: PHI_INVERSE * 0.5,
  sm: PHI_INVERSE,
  md: 1,
  lg: PHI,
  xl: PHI * PHI,
  xxl: PHI * PHI * PHI
} as const;

// Sacred spacing for margins and padding (based on Fibonacci sequence)
export const SACRED_SPACING = {
  none: 0,
  xxxs: 1,
  xxs: 2,
  xs: 5,
  sm: 8,
  md: 13,
  lg: 21,
  xl: 34,
  xxl: 55,
  xxxl: 89
} as const;

// Sacred geometry border radius values (based on Fibonacci sequence and golden ratio)
export const SACRED_RADII = {
  none: 0,
  sm: 3,
  md: 5,
  lg: 8,
  xl: 13,
  full: '50%',
  golden: `${PHI_INVERSE * 100}%` // approx 61.8%
} as const;

// Sacred geometry-based font sizes (based on Fibonacci sequence)
export const SACRED_FONT_SIZES = {
  xs: 13,
  sm: 16,
  md: 21,
  lg: 34,
  xl: 55,
  xxl: 89
} as const;

// Sacred geometry-based font weights
export const SACRED_FONT_WEIGHTS = {
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700
} as const;

// Animation timings based on golden ratio (seconds)
export const ANIMATION_TIMING = {
  instant: 0,
  quick: 0.3,
  standard: 0.3 * PHI, // approx 0.485s
  slow: 0.3 * PHI * PHI, // approx 0.785s
  slower: 0.3 * PHI * PHI * PHI // approx 1.27s
} as const;

// Cubic bezier easing functions based on golden ratio principles
export const SACRED_EASINGS = {
  // Standard easings
  standard: [PHI_INVERSE, 0, 1 - PHI_INVERSE, 1], // Balance between ease-out and ease-in-out
  
  // Golden ratio based easings
  golden: [0, PHI_INVERSE, 1 - PHI_INVERSE, 1],
  goldenAccelerate: [PHI_INVERSE, 0, PHI_INVERSE, 1],
  goldenDecelerate: [1 - PHI_INVERSE, 0, 1, 1],
  
  // Natural motion easings
  naturalSpring: [0.5, 1.6 * PHI_INVERSE, 0.4, 0.8],
  naturalBounce: [0.5, 1.8 * PHI_INVERSE, 0.65, 1.15],
  
  // Sharp easings
  sharpIn: [0.75, 0, 0.9, PHI_INVERSE],
  sharpOut: [0.1, 1 - PHI_INVERSE, 0.25, 1]
} as const;

// Export animation-related hooks and utilities
export * from '../utils/animation';

// Types for sacred grid system
export type GridColumnSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type GridGutterSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type GridContainerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Sacred grid system based on golden ratio and Fibonacci
 * Used for layout composition and spacing
 */
export const SACRED_GRID = {
  // Base grid value in pixels (based on 8px)
  base: 8,
  
  // Columns based on Fibonacci numbers
  columns: {
    xs: 3,  // Small screen - 3 columns
    sm: 5,  // Medium screen - 5 columns
    md: 8,  // Large screen - 8 columns
    lg: 13, // Extra large screen - 13 columns
    xl: 21  // XXL screen - 21 columns
  },
  
  // Gutter values in pixels based on Fibonacci sequence
  gutters: {
    xs: 8,   // Fibonacci[6]
    sm: 13,  // Fibonacci[7]
    md: 21,  // Fibonacci[8]
    lg: 34,  // Fibonacci[9]
    xl: 55   // Fibonacci[10]
  },
  
  // Container max widths based on golden ratio relationships
  containers: {
    xs: 610,  // Fibonacci[14]
    sm: 720,  // Custom
    md: 890,  // ~PHI * 550
    lg: 1280, // ~PHI * 790
    xl: 1440  // Custom
  }
};

// Types for sacred radius values
export type RadiusSize = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'circle';

/**
 * Sacred radius values for consistent border radius
 * Based on Fibonacci sequence
 */
export const SACRED_RADIUS: Record<RadiusSize, number | string> = {
  none: 0,
  xs: 2,    // Fibonacci[2.5]
  sm: 3,    // Fibonacci[3]
  md: 5,    // Fibonacci[4]
  lg: 8,    // Fibonacci[6]
  xl: 13,   // Fibonacci[7]
  xxl: 21,  // Fibonacci[8]
  circle: '50%'
};

// Types for sacred spacing
export type SpacingSize = 'none' | 'xxxs' | 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl';
export type ComponentSize = 'sm' | 'md' | 'lg';

/**
 * Sacred spacing system for margins and padding
 * Based on Fibonacci sequence
 */
export const SACRED_SPACING_SYSTEM = {
  // Base spacing values following Fibonacci sequence
  none: 0,
  xxxs: 1,    // Fibonacci[1]
  xxs: 2,     // Fibonacci[2]
  xs: 3,      // Fibonacci[3]
  sm: 5,      // Fibonacci[4]
  md: 8,      // Fibonacci[6]
  lg: 13,     // Fibonacci[7]
  xl: 21,     // Fibonacci[8]
  xxl: 34,    // Fibonacci[9]
  xxxl: 55,   // Fibonacci[10]
  
  // Component-specific spacing based on Fibonacci
  buttonPadding: {
    sm: 5,    // Fibonacci[4]
    md: 8,    // Fibonacci[6]
    lg: 13    // Fibonacci[7]
  },
  
  inputPadding: {
    sm: 5,    // Fibonacci[4]
    md: 8,    // Fibonacci[6]
    lg: 13    // Fibonacci[7]
  },
  
  cardPadding: {
    sm: 8,    // Fibonacci[6]
    md: 13,   // Fibonacci[7]
    lg: 21    // Fibonacci[8]
  },
  
  sectionPadding: {
    sm: 21,   // Fibonacci[8]
    md: 34,   // Fibonacci[9]
    lg: 55    // Fibonacci[10]
  }
};

// Types for typography
export type FontSize = 'xs' | 'sm' | 'base' | 'md' | 'lg' | 'xl' | 'xxl';
export type LineHeight = 'tight' | 'base' | 'relaxed' | 'spacious';
export type LetterSpacing = 'tight' | 'normal' | 'wide' | 'wider' | 'widest';

/**
 * Sacred typography system
 * Font sizes and line heights based on golden ratio and Fibonacci
 */
export const SACRED_TYPOGRAPHY = {
  // Base font size in pixels
  baseFontSize: 16,
  
  // Font size scale based on PHI (golden ratio)
  fontSizes: {
    xs: 10,    // base / PHI
    sm: 13,    // Fibonacci[7]
    base: 16,  // Base font size
    md: 21,    // base * PHI (approximately)
    lg: 26,    // md * PHI (approximately)
    xl: 42,    // lg * PHI (approximately)
    xxl: 68    // xl * PHI (approximately)
  },
  
  // Line heights based on PHI
  lineHeights: {
    tight: 1.2,
    base: 1.5,
    relaxed: 1.618, // PHI
    spacious: 1.8
  },
  
  // Letter spacing values
  letterSpacing: {
    tight: '-0.05em',
    normal: '0',
    wide: '0.05em',
    wider: '0.1em',
    widest: '0.2em'
  }
};

// Type for easing functions
export type EasingType = 'standard' | 'easeIn' | 'easeOut' | 'botanical';
export type CubicBezierPoints = [number, number, number, number];

/**
 * Sacred animation easing curves based on golden ratio
 * These values create natural, harmonious motion
 */
export const SACRED_EASINGS_CURVES: Record<EasingType, CubicBezierPoints> = {
  // Standard easing - cubic-bezier with golden ratio influence
  standard: [0.618, 0, 0.382, 1], // Based on PHI and PHI_INVERSE
  
  // Ease in - cubic-bezier with golden ratio influence
  easeIn: [0.618, 0, 1, 1],
  
  // Ease out - cubic-bezier with golden ratio influence
  easeOut: [0, 0, 0.382, 1],
  
  // Botanical motion - specialized for plant-inspired animations
  botanical: [0.175, 0.885, 0.32, 1.275]
};

/**
 * Function-based easing functions using golden ratio principles
 * These provide more advanced control over animations
 */
export const goldenEaseIn = (t: number): number => {
  return 1 - Math.pow(1 - t, PHI);
};

export const goldenEaseOut = (t: number): number => {
  return Math.pow(t, PHI_INVERSE);
};

export const goldenEaseInOut = (t: number): number => {
  return t < 0.5
    ? goldenEaseIn(t * 2) / 2
    : 0.5 + goldenEaseOut((t - 0.5) * 2) / 2;
};

// Types for animation timing
export type AnimationSpeed = 'quick' | 'standard' | 'slow';

/**
 * Animation timing based on Fibonacci sequence
 * Durations in milliseconds
 */
export const ANIMATION_TIMING_DURATIONS = {
  // Base durations following Fibonacci sequence (in ms)
  quick: 380,    // ~Fibonacci[12]
  standard: 610, // Fibonacci[14]
  slow: 990,     // ~Fibonacci[16]
  
  // Stagger timing for sequential animations
  stagger: {
    quick: 50,   // Fibonacci[4] * 10
    standard: 80, // Fibonacci[6] * 10
    slow: 130    // Fibonacci[7] * 10
  }
};

/**
 * Golden sections for dividing space according to the golden ratio
 */
export const GOLDEN_SECTIONS = {
  major: PHI_INVERSE, // 0.618
  minor: 1 - PHI_INVERSE // 0.382
};

/**
 * Sacred timing alias for backward compatibility
 * @deprecated Use ANIMATION_TIMING instead
 */
export const SACRED_TIMING = ANIMATION_TIMING_DURATIONS;






