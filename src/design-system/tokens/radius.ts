/**
 * Radius Tokens
 * 
 * This file defines the border radius values used in the Recovery Office design system.
 * All radius values are derived from sacred geometry principles, using the Fibonacci sequence
 * for natural, harmonious proportions.
 */

import { SACRED_RADIUS } from "../../constants/sacred-geometry";

/**
 * Radius scale derived from sacred geometry
 * Each value corresponds to a value in the Fibonacci sequence
 */
export const radius = {
  // Raw pixel values directly from SACRED_RADIUS
  values: SACRED_RADIUS,
  
  // Convert to rem values for consistent scaling with text
  none: SACRED_RADIUS.none,
  xs: SACRED_RADIUS.xs,
  sm: SACRED_RADIUS.sm,
  md: SACRED_RADIUS.md,
  lg: SACRED_RADIUS.lg,
  xl: SACRED_RADIUS.xl,
  xxl: SACRED_RADIUS.xxl,
  circle: SACRED_RADIUS.circle,
  
  // Special values for specific components
  button: SACRED_RADIUS.md,
  input: SACRED_RADIUS.sm,
  card: SACRED_RADIUS.md,
  badge: SACRED_RADIUS.sm,
  modal: SACRED_RADIUS.md,
  tooltip: SACRED_RADIUS.sm,
  pill: '999px',
};

export default radius; 







