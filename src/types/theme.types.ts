/**
 * Theme Type Definitions
 * 
 * This file contains type definitions for the theme system using sacred geometry principles.
 */

import { RadiusSize, SpacingSize, FontSize, LineHeight, LetterSpacing } from '../constants/sacred-geometry';

export interface ThemeColors {
  primary: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
    950: string;
  };
  secondary: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
    950: string;
  };
  background: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
    950: string;
    paper: string; // Background for paper-like elements like cards, dialogs
  };
  text: {
    primary: string;
    secondary: string;
    tertiary: string;
    light: string;
    dark: string;
    disabled: string;
  };
  divider: string; // For horizontal/vertical dividers 
  accent: {
    gold: string;
    copper: string;
    teal: string;
    lavender: string;
    rose: string;
  };
  success: {
    light: string;
    main: string;
    dark: string;
  };
  warning: {
    light: string;
    main: string;
    dark: string;
  };
  error: {
    light: string;
    main: string;
    dark: string;
  };
  info: {
    light: string;
    main: string;
    dark: string;
  };
}

export interface ThemeBreakpoints {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export interface ThemeShadows {
  none: string;
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export interface ThemeSpacing {
  base: number;
  values: Record<SpacingSize, number>;
}

export interface ThemeRadii {
  values: Record<RadiusSize, number | string>;
}

export interface ThemeTypography {
  fontFamilies: {
    heading: string;
    body: string;
    monospace: string;
  };
  fontSizes: Record<FontSize, number>;
  fontWeights: {
    light: number;
    regular: number;
    medium: number;
    semibold: number;
    bold: number;
  };
  lineHeights: Record<LineHeight, number>;
  letterSpacings: Record<LetterSpacing, string>;
}

export interface ThemeSacredGeometry {
  phi: number;
  phiInverse: number;
  fibonacci: number[];
  goldenSectionMajor: number;
  goldenSectionMinor: number;
}

export interface Theme {
  mode: 'light' | 'dark';
  colors: ThemeColors;
  breakpoints: ThemeBreakpoints;
  spacing: ThemeSpacing;
  radii: ThemeRadii;
  shadows: ThemeShadows;
  typography: ThemeTypography;
  sacredGeometry: ThemeSacredGeometry;
  zIndices: {
    hide: number;
    base: number;
    dropdown: number;
    sticky: number;
    overlay: number;
    modal: number;
    tooltip: number;
  };
} 