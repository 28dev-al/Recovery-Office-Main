/**
 * Shadow Tokens
 * 
 * This file defines the shadow values used in the Recovery Office design system.
 * All shadow values are derived from sacred geometry principles, using Fibonacci sequence
 * for natural, harmonious shadow depth and spread.
 */

import { PHI_INVERSE } from "../../constants/sacred-geometry";
import { getFibonacciByIndex } from "../../utils/sacredGeometry";
import { BASE_COLORS } from './colors';

/**
 * Calculate shadow blur radius based on depth level
 * Using Fibonacci sequence for natural progression
 * 
 * @param level - Shadow depth level (1-5)
 * @returns Blur radius in pixels
 */
const getShadowBlur = (level: number): number => {
  // Ensure level is between 1 and 5
  const safeLevel = Math.max(1, Math.min(5, level));
  
  // Map level to Fibonacci index
  // Add 4 to get reasonable starting value (3 = 2px, 4 = 3px, etc.)
  const fibIndex = safeLevel + 4;
  
  // Get Fibonacci value at index
  return getFibonacciByIndex(fibIndex);
};

/**
 * Calculate shadow spread based on depth level
 * Using PHI_INVERSE to create natural relationship with blur
 * 
 * @param level - Shadow depth level (1-5)
 * @returns Shadow spread in pixels
 */
const getShadowSpread = (level: number): number => {
  const blur = getShadowBlur(level);
  // Apply PHI_INVERSE for harmonious relationship
  return Math.round(blur * PHI_INVERSE);
};

/**
 * Shadow tokens for different elevation levels
 * Elevation system based on Fibonacci sequence
 */
export const shadows = {
  // No shadow
  none: 'none',
  
  // Subtle surface separation (buttons, cards)
  xs: `0 1px ${getShadowBlur(1)}px ${getShadowSpread(1)}px rgba(0, 0, 0, 0.05)`,
  
  // Light elevation (cards, dropdowns)
  sm: `0 2px ${getShadowBlur(2)}px ${getShadowSpread(2)}px rgba(0, 0, 0, 0.07)`,
  
  // Medium elevation (modals, popovers)
  md: `0 3px ${getShadowBlur(3)}px ${getShadowSpread(3)}px rgba(0, 0, 0, 0.09)`,
  
  // High elevation (dialogs, sidebars)
  lg: `0 5px ${getShadowBlur(4)}px ${getShadowSpread(4)}px rgba(0, 0, 0, 0.11)`,
  
  // Maximum elevation (full-screen modals)
  xl: `0 8px ${getShadowBlur(5)}px ${getShadowSpread(5)}px rgba(0, 0, 0, 0.13)`,
  
  // Inner shadow (input focus, buttons pressed)
  inset: `inset 0 2px ${getShadowBlur(1)}px rgba(0, 0, 0, 0.08)`,
  
  // Focused element shadow
  focus: `0 0 0 2px rgba(103, 176, 80, 0.3)`, // Brand green with opacity
};

/**
 * Helper function to create focus ring shadows with brand colors
 * 
 * @param color - The color to use for the focus ring
 * @param width - The width of the focus ring in pixels (defaults to Fibonacci 3px)
 * @returns The focus ring shadow value
 */
export const createFocusRing = (
  color: string | number = BASE_COLORS.green[500] ?? '#0A4021', 
  width: number = getFibonacciByIndex(4)
): string => {
  const colorStr = typeof color === 'number' ? `#0A4021` : color;
  return `0 0 0 ${width}px ${colorStr}`;
};

/**
 * Helper function to create a glow effect shadow
 * 
 * @param color - The color to use for the glow
 * @param intensity - The intensity of the glow (0-1)
 * @returns The glow shadow value
 */
export const createGlow = (
  color: string | number = BASE_COLORS.green[500] ?? '#0A4021',
  intensity: number = PHI_INVERSE
): string => {
  const colorStr = typeof color === 'number' ? `#0A4021` : color;
  const blurRadius = getFibonacciByIndex(7);
  return `0 0 ${blurRadius}px rgba(${hexToRgb(colorStr)}, ${intensity})`;
};

/**
 * Helper function to convert hex color to RGB
 * 
 * @param hex - The hex color to convert
 * @returns RGB values as string "r, g, b"
 */
const hexToRgb = (hex: string): string => {
  // Remove # if present
  const cleanHex = hex.startsWith('#') ? hex.slice(1) : hex;
  
  // Parse hex values
  const r = parseInt(cleanHex.substr(0, 2), 16);
  const g = parseInt(cleanHex.substr(2, 2), 16);
  const b = parseInt(cleanHex.substr(4, 2), 16);
  
  return `${r}, ${g}, ${b}`;
};

export default shadows; 










