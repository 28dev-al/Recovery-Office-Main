/**
 * Global Styles
 * 
 * This file defines the global styles applied to the entire application.
 * It sets up CSS variables, resets, and base styles following sacred geometry principles.
 */

import { createGlobalStyle, DefaultTheme } from 'styled-components';
import { pxToRem } from "../../utils/sacredGeometry";

/**
 * Global styles component using styled-components
 */
export const GlobalStyles = createGlobalStyle<{ theme: DefaultTheme }>`
  /* CSS Variables for theme values */
  :root {
    /* Colors */
    --primary-50: ${props => props.theme.colors.primary[50] ?? 1};
    --primary-100: ${props => props.theme.colors.primary[100] ?? 1};
    --primary-200: ${props => props.theme.colors.primary[200] ?? 1};
    --primary-300: ${props => props.theme.colors.primary[300] ?? 1};
    --primary-400: ${props => props.theme.colors.primary[400] ?? 1};
    --primary-500: ${props => props.theme.colors.primary[500] ?? 1};
    --primary-600: ${props => props.theme.colors.primary[600] ?? 1};
    --primary-700: ${props => props.theme.colors.primary[700] ?? 1};
    --primary-800: ${props => props.theme.colors.primary[800] ?? 1};
    --primary-900: ${props => props.theme.colors.primary[900] ?? 1};
    --primary-950: ${props => props.theme.colors.primary[950] ?? 1};
    
    --secondary-50: ${props => props.theme.colors.secondary[50] ?? 1};
    --secondary-100: ${props => props.theme.colors.secondary[100] ?? 1};
    --secondary-200: ${props => props.theme.colors.secondary[200] ?? 1};
    --secondary-300: ${props => props.theme.colors.secondary[300] ?? 1};
    --secondary-400: ${props => props.theme.colors.secondary[400] ?? 1};
    --secondary-500: ${props => props.theme.colors.secondary[500] ?? 1};
    --secondary-600: ${props => props.theme.colors.secondary[600] ?? 1};
    --secondary-700: ${props => props.theme.colors.secondary[700] ?? 1};
    --secondary-800: ${props => props.theme.colors.secondary[800] ?? 1};
    --secondary-900: ${props => props.theme.colors.secondary[900] ?? 1};
    --secondary-950: ${props => props.theme.colors.secondary[950] ?? 1};
    
    --background-50: ${props => props.theme.colors.background[50] ?? 1};
    --background-100: ${props => props.theme.colors.background[100] ?? 1};
    --background-200: ${props => props.theme.colors.background[200] ?? 1};
    --background-300: ${props => props.theme.colors.background[300] ?? 1};
    --background-400: ${props => props.theme.colors.background[400] ?? 1};
    --background-500: ${props => props.theme.colors.background[500] ?? 1};
    --background-600: ${props => props.theme.colors.background[600] ?? 1};
    --background-700: ${props => props.theme.colors.background[700] ?? 1};
    --background-800: ${props => props.theme.colors.background[800] ?? 1};
    --background-900: ${props => props.theme.colors.background[900] ?? 1};
    --background-950: ${props => props.theme.colors.background[950] ?? 1};
    
    --text-primary: ${props => props.theme.colors.text.primary};
    --text-secondary: ${props => props.theme.colors.text.secondary};
    --text-tertiary: ${props => props.theme.colors.text.tertiary};
    --text-light: ${props => props.theme.colors.text.light};
    --text-dark: ${props => props.theme.colors.text.dark};
    --text-disabled: ${props => props.theme.colors.text.disabled};
    
    /* Spacing */
    --spacing-none: ${props => props.theme.spacing.none}px;
    --spacing-xxxs: ${props => props.theme.spacing.xxxs}px;
    --spacing-xxs: ${props => props.theme.spacing.xxs}px;
    --spacing-xs: ${props => props.theme.spacing.xs}px;
    --spacing-sm: ${props => props.theme.spacing.sm}px;
    --spacing-md: ${props => props.theme.spacing.md}px;
    --spacing-lg: ${props => props.theme.spacing.lg}px;
    --spacing-xl: ${props => props.theme.spacing.xl}px;
    --spacing-xxl: ${props => props.theme.spacing.xxl}px;
    --spacing-xxxl: ${props => props.theme.spacing.xxxl}px;
    
    /* Typography */
    --font-family-heading: ${props => props.theme.typography.fontFamily.heading};
    --font-family-body: ${props => props.theme.typography.fontFamily.body};
    --font-family-mono: ${props => props.theme.typography.fontFamily.mono};
    
    --font-size-xs: ${props => pxToRem(props.theme.typography.fontSize.xs)};
    --font-size-sm: ${props => pxToRem(props.theme.typography.fontSize.sm)};
    --font-size-base: ${props => pxToRem(props.theme.typography.fontSize.base)};
    --font-size-md: ${props => pxToRem(props.theme.typography.fontSize.md)};
    --font-size-lg: ${props => pxToRem(props.theme.typography.fontSize.lg)};
    --font-size-xl: ${props => pxToRem(props.theme.typography.fontSize.xl)};
    --font-size-xxl: ${props => pxToRem(props.theme.typography.fontSize.xxl)};
    
    /* Radius */
    --radius-none: ${props => props.theme.radius.none}px;
    --radius-xs: ${props => props.theme.radius.xs}px;
    --radius-sm: ${props => props.theme.radius.sm}px;
    --radius-md: ${props => props.theme.radius.md}px;
    --radius-lg: ${props => props.theme.radius.lg}px;
    --radius-xl: ${props => props.theme.radius.xl}px;
    --radius-circle: ${props => props.theme.radius.circle};
    
    /* Sacred Geometry Constants */
    --phi: ${props => props.theme.sacredGeometry.PHI};
    --phi-inverse: ${props => props.theme.sacredGeometry.PHI_INVERSE};
  }
  
  /* Reset and Base Styles */
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  html {
    font-size: ${props => props.theme.typography.fontSize.base}px;
    line-height: ${props => props.theme.typography.lineHeight.base};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  body {
    font-family: ${props => props.theme.typography.fontFamily.body};
    color: ${props => props.theme.colors.text.primary};
    background-color: ${props => props.theme.colors.background[500] ?? 1};
    margin: 0;
    padding: 0;
    transition: background-color 0.3s ease;
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-family: ${props => props.theme.typography.fontFamily.heading};
    font-weight: ${props => props.theme.typography.fontWeight.bold};
    line-height: ${props => props.theme.typography.lineHeight.tight};
    margin-bottom: ${props => props.theme.spacing.md}px;
  }
  
  h1 {
    font-size: clamp(2.25rem, 7vw, ${props => props.theme.typography.fontSize.xxl});
  }
  
  h2 {
    font-size: clamp(2rem, 5vw, ${props => props.theme.typography.fontSize.xl});
  }
  
  h3 {
    font-size: clamp(1.75rem, 4.5vw, ${props => props.theme.typography.fontSize.lg});
  }
  
  h4 {
    font-size: clamp(1.5rem, 4vw, ${props => props.theme.typography.fontSize.md});
  }
  
  h5 {
    font-size: clamp(1.25rem, 3.5vw, ${props => props.theme.typography.fontSize.base});
  }
  
  h6 {
    font-size: clamp(1.125rem, 3vw, ${props => props.theme.typography.fontSize.sm});
  }
  
  p {
    margin-bottom: ${props => props.theme.spacing.md}px;
    max-width: 70ch; /* Optimal reading width based on Golden Ratio */
  }
  
  a {
    color: ${props => props.theme.colors.primary[600] ?? 1};
    text-decoration: none;
    transition: color 0.3s ease;
    
    &:hover {
      color: ${props => props.theme.colors.primary[800] ?? 1};
    }
    
    &:focus {
      outline: ${props => props.theme.radius.xs}px solid ${props => props.theme.colors.primary[300] ?? 1};
      outline-offset: 2px;
    }
  }
  
  img, svg {
    max-width: 100%;
    height: auto;
  }
  
  button, input, select, textarea {
    font-family: ${props => props.theme.typography.fontFamily.body};
    font-size: ${props => props.theme.typography.fontSize.rem.base};
  }
  
  button {
    cursor: pointer;
    border: none;
    background: none;
    
    &:focus {
      outline: ${props => props.theme.radius.xs}px solid ${props => props.theme.colors.primary[300] ?? 1};
      outline-offset: 2px;
    }
  }
  
  ul, ol {
    margin-bottom: ${props => props.theme.spacing.md}px;
    padding-left: ${props => props.theme.spacing.lg}px;
  }
  
  /* Accessibility */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }
  
  /* Focus visible utility for better keyboard navigation */
  .js-focus-visible :focus:not(.focus-visible) {
    outline: none;
  }
  
  /* Reduced motion preferences */
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`;

export default GlobalStyles; 







