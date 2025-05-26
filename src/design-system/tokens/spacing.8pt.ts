/**
 * Premium Spacing Tokens
 * 
 * This file defines spacing values based on an 8-point grid system,
 * providing consistent and harmonious spacing throughout the application.
 * 
 * The 8-point grid offers several advantages:
 * - Easy division and multiplication for responsive design
 * - Compatible with most screen sizes (divisible by 2)
 * - Creates visual rhythm and consistency
 */

import { pxToRem } from "../../utils/sacredGeometry";

// 8-point grid base spacing values
export const PREMIUM_SPACING_VALUES = {
  // Core spacing values
  0: 0,
  4: 4,   // Half base unit - for very tight spacing
  8: 8,   // Base unit
  16: 16, // 2x base
  24: 24, // 3x base
  32: 32, // 4x base
  40: 40, // 5x base
  48: 48, // 6x base
  64: 64, // 8x base
  80: 80, // 10x base
  96: 96, // 12x base
  128: 128, // 16x base

  // Semantic spacings based on the 8-point grid
  xxs: 4,
  xs: 8,
  sm: 16,
  md: 24,
  lg: 32,
  xl: 48,
  xxl: 64,
  xxxl: 80
};

// Convert spacing values to rem for better accessibility
export const PREMIUM_SPACING_REM = {
  0: "0",
  4: pxToRem(4),
  8: pxToRem(8),
  16: pxToRem(16),
  24: pxToRem(24),
  32: pxToRem(32),
  40: pxToRem(40),
  48: pxToRem(48),
  64: pxToRem(64),
  80: pxToRem(80),
  96: pxToRem(96),
  128: pxToRem(128),
  
  // Named values 
  xxs: pxToRem(4),
  xs: pxToRem(8),
  sm: pxToRem(16),
  md: pxToRem(24),
  lg: pxToRem(32),
  xl: pxToRem(48),
  xxl: pxToRem(64),
  xxxl: pxToRem(80)
};

// Export combined spacing object
export const PREMIUM_SPACING = {
  // Raw spacing values in pixels
  values: PREMIUM_SPACING_VALUES,
  
  // Rem values for responsive design
  rem: PREMIUM_SPACING_REM,
  
  // Named spacing values
  none: 0,
  xxs: 4,
  xs: 8,
  sm: 16,
  md: 24,
  lg: 32,
  xl: 48,
  xxl: 64,
  xxxl: 80,
  
  // Common component spacings
  buttonPadding: { x: 16, y: 8 },
  inputPadding: { x: 16, y: 8 },
  cardPadding: 24,
  containerPadding: { sm: 16, md: 24, lg: 32 },
  sectionPadding: { sm: 48, md: 64, lg: 80 }
};

export default PREMIUM_SPACING; 