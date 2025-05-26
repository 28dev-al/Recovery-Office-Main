/**
 * Typography Tokens
 * 
 * This file defines the typography values used in the Recovery Office design system.
 * All typography values are derived from sacred geometry principles, using the Fibonacci sequence
 * and golden ratio for natural, harmonious proportions.
 */

import { SACRED_TYPOGRAPHY } from "../../constants/sacred-geometry";
import { pxToRem } from "../../utils/sacredGeometry";

/**
 * Font family definitions
 */
export const fontFamily = {
  // Primary font for body text - natural, organic feeling
  primary: "'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  
  // Secondary font for headings - elegant, structured
  secondary: "'Playfair Display', Georgia, serif",
  
  // Monospace font for code and technical content
  mono: "'SF Mono', 'Monaco', 'Inconsolata', 'Fira Mono', 'Droid Sans Mono', 'Source Code Pro', monospace",
};

/**
 * Font weight definitions
 */
export const fontWeight = {
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
};

/**
 * Font size values derived from sacred geometry
 * Base size (16px) with scaling factors based on the golden ratio (PHI)
 */
export const fontSize = {
  // Base values from SACRED_TYPOGRAPHY
  values: SACRED_TYPOGRAPHY.fontSizes,
  
  // Converted to rem values
  xs: pxToRem(SACRED_TYPOGRAPHY.fontSizes.xs),      // 0.625rem (10px)
  sm: pxToRem(SACRED_TYPOGRAPHY.fontSizes.sm),      // 0.8125rem (13px)
  base: pxToRem(SACRED_TYPOGRAPHY.fontSizes.base),  // 1rem (16px)
  md: pxToRem(SACRED_TYPOGRAPHY.fontSizes.md),      // 1.3125rem (21px)
  lg: pxToRem(SACRED_TYPOGRAPHY.fontSizes.lg),      // 1.625rem (26px)
  xl: pxToRem(SACRED_TYPOGRAPHY.fontSizes.xl),      // 2.625rem (42px)
  xxl: pxToRem(SACRED_TYPOGRAPHY.fontSizes.xxl),    // 4.25rem (68px)
};

/**
 * Line height values
 * Key values based on golden ratio (1.618) and sacred proportions
 */
export const lineHeight = {
  // From SACRED_TYPOGRAPHY
  values: SACRED_TYPOGRAPHY.lineHeights,
  
  // Named values
  none: 1,
  tight: SACRED_TYPOGRAPHY.lineHeights.tight,       // 1.2
  base: SACRED_TYPOGRAPHY.lineHeights.base,         // 1.5
  relaxed: SACRED_TYPOGRAPHY.lineHeights.relaxed,   // 1.618 (golden ratio)
  spacious: SACRED_TYPOGRAPHY.lineHeights.spacious, // 1.8
};

/**
 * Letter spacing values
 */
export const letterSpacing = {
  // From SACRED_TYPOGRAPHY
  values: SACRED_TYPOGRAPHY.letterSpacing,
  
  // Named values
  tighter: '-0.05em',
  tight: '-0.025em',
  normal: '0',
  wide: '0.025em',
  wider: '0.05em',
  widest: '0.1em',
};

/**
 * Complete typography tokens combining all typography elements
 */
export const typography = {
  fontFamily,
  fontWeight,
  fontSize,
  lineHeight,
  letterSpacing,
};

export default typography; 







