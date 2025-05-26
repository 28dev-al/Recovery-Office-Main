/**
 * Theme Type Definitions
 * 
 * This file defines TypeScript interfaces for the theme object used with styled-components.
 * It ensures type safety when accessing theme values throughout the application.
 */

import { DefaultTheme, Interpolation, ThemedStyledProps } from 'styled-components';
import { BreakpointKey } from '../tokens/breakpoints';
import { DetailedHTMLProps, ButtonHTMLAttributes, RefObject } from 'react';

/**
 * Theme color definitions
 */
export interface ThemeColors {
  border: any;
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
    light: Interpolation<ThemedStyledProps<Omit<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "ref"> & { ref?: ((instance: HTMLButtonElement | null) => void) | RefObject<HTMLButtonElement> | null | undefined; } & { isSecondary?: boolean | undefined; }, DefaultTheme>>;
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
    paper: string;
  };
  text: {
    main: Interpolation<ThemedStyledProps<Omit<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "ref"> & { ref?: ((instance: HTMLButtonElement | null) => void) | RefObject<HTMLButtonElement> | null | undefined; } & { isSecondary?: boolean | undefined; }, DefaultTheme>>;
    primary: string;
    secondary: string;
    tertiary: string;
    light: string;
    dark: string;
    disabled: string;
  };
  white: string;
  accent: {
    main: Interpolation<ThemedStyledProps<Omit<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "ref"> & { ref?: ((instance: HTMLButtonElement | null) => void) | RefObject<HTMLButtonElement> | null | undefined; } & { isSecondary?: boolean | undefined; }, DefaultTheme>>;
    dark: Interpolation<ThemedStyledProps<Omit<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "ref"> & { ref?: ((instance: HTMLButtonElement | null) => void) | RefObject<HTMLButtonElement> | null | undefined; } & { isSecondary?: boolean | undefined; }, DefaultTheme>>;
    gold: string;
    copper: string;
    teal: string;
    lavender: string;
    rose: string;
  };
  feedback: {
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
  };
  gradients: {
    primary: string;
    secondary: string;
    light: string;
    gold: string;
  };
  alpha: {
    high: number;
    medium: number;
    low: number;
    slight: number;
    minimal: number;
    ultraLight: number;
  };
  error: {
    light: string;
    main: string;
    dark: string;
  };
  divider: string;
  success: {
    light: string;
    main: string;
    dark: string;
  };
}

/**
 * Theme spacing definitions
 */
export interface ThemeSpacing {
  none: number;
  xxxs: number;
  xxs: number;
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
  xxxl: number;
  buttonPadding: number;
  inputPadding: number;
  cardPadding: number;
  sectionPadding: number;
  containerPadding: number;
  rem: {
    none: string;
    xxxs: string;
    xxs: string;
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
    xxxl: string;
  };
  cssVar: {
    none: string;
    xxxs: string;
    xxs: string;
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
    xxxl: string;
  };
}

/**
 * Theme typography definitions
 */
export interface ThemeTypography {
  fontFamily: {
    heading: string;
    body: string;
    mono: string;
  };
  fontSize: {
    xs: number;
    sm: number;
    base: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
    rem: {
      xs: string;
      sm: string;
      base: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
    };
  };
  fontWeight: {
    light: number;
    regular: number;
    medium: number;
    semiBold: number;
    bold: number;
    black: number;
  };
  lineHeight: {
    tight: number;
    base: number;
    relaxed: number;
    spacious: number;
  };
  letterSpacing: {
    tight: string;
    normal: string;
    wide: string;
    wider: string;
    widest: string;
  };
  textTransform: {
    uppercase: string;
    lowercase: string;
    capitalize: string;
    none: string;
  };
  textDecoration: {
    underline: string;
    lineThrough: string;
    none: string;
  };
  fontStyle: {
    normal: string;
    italic: string;
  };
}

/**
 * Theme breakpoint definitions
 */
export interface ThemeBreakpoints {
  values: Record<BreakpointKey, number>;
  up: (key: BreakpointKey) => string;
  down: (key: BreakpointKey) => string;
  between: (start: BreakpointKey, end: BreakpointKey) => string;
  only: (key: BreakpointKey) => string;
  custom: (minWidth: number) => string;
  print: string;
  hover: string;
  reducedMotion: string;
  prefersDark: string;
  prefersLight: string;
  
  // Direct access to breakpoint values
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
}

/**
 * Theme radius definitions
 */
export interface ThemeRadius {
  none: number;
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  circle: string;
  button: number;
  input: number;
  card: number;
  badge: number;
  modal: number;
  tooltip: number;
  rem: {
    none: string;
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    circle: string;
  };
  cssVar: {
    none: string;
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    circle: string;
  };
}

/**
 * Theme shadow definitions
 */
export interface ThemeShadows {
  none: string;
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
  layered: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  button: string;
  card: string;
  modal: string;
  dropdown: string;
  tooltip: string;
  inner: {
    sm: string;
    md: string;
    lg: string;
  };
  directional: {
    top: string;
    right: string;
    bottom: string;
    left: string;
  };
  colored: {
    primary: string;
    success: string;
    warning: string;
    error: string;
  };
  cssVar: {
    none: string;
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
  };
}

/**
 * Interface for the sacred geometry mathematical constants
 */
export interface ThemeSacredGeometry {
  PHI: number;
  PHI_INVERSE: number;
  FIBONACCI: Record<number, number>;
  GOLDEN_SECTIONS: {
    major: number;
    minor: number;
  };
  ANIMATION_TIMING: {
    quick: number;
    standard: number;
    slow: number;
    stagger: {
      quick: number;
      standard: number;
      slow: number;
    };
  };
  SACRED_EASINGS: {
    standard: [number, number, number, number];
    easeIn: [number, number, number, number];
    easeOut: [number, number, number, number];
    botanical: [number, number, number, number];
    goldenEaseIn: (t: number) => number;
    goldenEaseOut: (t: number) => number;
    goldenEaseInOut: (t: number) => number;
  };
}

/**
 * Complete theme definition
 */
export interface RecoveryOfficeTheme {
  colors: ThemeColors;
  spacing: ThemeSpacing;
  typography: ThemeTypography;
  breakpoints: ThemeBreakpoints;
  radius: ThemeRadius;
  shadows: ThemeShadows;
  sacredGeometry: ThemeSacredGeometry;
  mode: 'light' | 'dark' | 'premium';
}

// Extend the DefaultTheme from styled-components to use our custom theme
declare module 'styled-components' {
  export interface DefaultTheme extends RecoveryOfficeTheme {}
} 





