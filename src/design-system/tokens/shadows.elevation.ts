/**
 * Premium Shadow Tokens
 * 
 * This file defines shadow values for creating depth and elevation in the UI.
 * Shadows help establish hierarchy and focus within the interface.
 * 
 * The system uses a consistent approach to shadow strength and direction,
 * creating a coherent elevation system throughout the application.
 */

// Shadow color with varying opacity for consistent look
const shadowColor = 'rgba(0, 0, 0, 0.1)';
const sharpShadowColor = 'rgba(0, 0, 0, 0.07)';
const ambientShadowColor = 'rgba(0, 0, 0, 0.05)';

// Premium shadow elevation system
export const PREMIUM_SHADOWS = {
  // No shadow - flat elements
  none: 'none',
  
  // Subtle - for hover states and subtle elements (cards, buttons)
  xs: `0 1px 2px ${shadowColor}, 0 1px 1px ${ambientShadowColor}`,
  
  // Low - for cards, dropdowns, and other elevated components
  sm: `0 2px 4px ${shadowColor}, 0 1px 2px ${ambientShadowColor}`,
  
  // Medium - for floating elements (popovers, tooltips)
  md: `0 4px 6px ${shadowColor}, 0 2px 4px ${ambientShadowColor}`,
  
  // High - for modals and dialogs
  lg: `0 10px 15px ${shadowColor}, 0 4px 6px ${ambientShadowColor}`,
  
  // Highest - for important focus elements
  xl: `0 20px 25px ${shadowColor}, 0 10px 10px ${ambientShadowColor}`,
  
  // Inner shadow for pressed states
  inner: `inset 0 2px 4px ${ambientShadowColor}`,
  
  // Component-specific shadows
  card: `0 2px 4px ${shadowColor}, 0 1px 2px ${ambientShadowColor}`,
  button: `0 1px 2px ${shadowColor}`,
  dropdown: `0 4px 6px ${shadowColor}, 0 1px 3px ${sharpShadowColor}`,
  modal: `0 10px 25px ${shadowColor}, 0 5px 10px ${ambientShadowColor}`,
  tooltip: `0 4px 6px ${shadowColor}, 0 2px 4px ${ambientShadowColor}`,
  navbar: `0 2px 4px ${ambientShadowColor}`,
  
  // Focus state shadows - includes brand color
  focus: {
    primary: '0 0 0 3px rgba(10, 33, 79, 0.4)', // Navy focus
    gold: '0 0 0 3px rgba(212, 175, 55, 0.4)',  // Gold accent focus
    error: '0 0 0 3px rgba(239, 68, 68, 0.4)'   // Error focus
  }
};

export default PREMIUM_SHADOWS; 