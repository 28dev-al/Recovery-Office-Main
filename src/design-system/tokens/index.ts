/**
 * Design System Tokens
 * 
 * This file exports all design tokens from a single entry point
 * to provide consistent imports across the application.
 */

// Re-export all tokens
import colors from './colors';
import spacing from './spacing';
import typography from './typography';
import breakpoints from './breakpoints';
import radius from './radius';
import shadows from './shadows';

// Import premium tokens
import PREMIUM_COLORS from './colors.premium';
import PREMIUM_SPACING from './spacing.8pt';
import PREMIUM_TYPOGRAPHY from './typography.premium';
import PREMIUM_BREAKPOINTS from './breakpoints.v2';
import PREMIUM_SHADOWS from './shadows.elevation';

export {
  // Original tokens
  colors,
  spacing,
  typography,
  breakpoints,
  radius,
  shadows,
  
  // Premium tokens
  PREMIUM_COLORS,
  PREMIUM_SPACING,
  PREMIUM_TYPOGRAPHY,
  PREMIUM_BREAKPOINTS,
  PREMIUM_SHADOWS
};

// Default export for backward compatibility
export default {
  colors,
  spacing,
  typography,
  breakpoints,
  radius,
  shadows
};

// Re-export types
export type { BreakpointKey } from './breakpoints'; 





