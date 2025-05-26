/**
 * Premium Color Tokens
 * 
 * This file defines premium color tokens for the Recovery Office redesign.
 * The palette is designed specifically for a professional financial recovery service.
 */

// Base color palette
export const PREMIUM_BASE_COLORS = {
  // Primary: Deep Navy - conveys trust, stability and financial authority
  navy: {
    50: '#E8EDF4',
    100: '#C7D2E3',
    200: '#A5B7D1',
    300: '#839BBF',
    400: '#617FAD',
    500: '#0A214F', // Primary brand color
    600: '#091D46',
    700: '#081A3D',
    800: '#061633',
    900: '#05122A',
    950: '#040E21'
  },
  
  // Primary: Forest Green - conveys trust, stability and financial growth
  forest: {
    50: '#E6F0EB',
    100: '#C1D9CD',
    200: '#9BC2AE',
    300: '#75AB8F',
    400: '#4A8D6A',
    500: '#0A4021', // Primary brand color
    600: '#093A1E',
    700: '#07311A',
    800: '#052815',
    900: '#031F10',
    950: '#02180D'
  },
  
  // Secondary: Ivory - creates clean, premium space
  ivory: {
    50: '#FFFFFE',
    100: '#FEFDFB',
    200: '#FCFBF6',
    300: '#FAF9F2',
    400: '#F9F8F1',
    500: '#F8F7F0', // Main secondary color
    600: '#E9E6D4',
    700: '#DAD5B8',
    800: '#CBC49D',
    900: '#BCB381',
    950: '#A79F69'
  },
  
  // Accent: Gold - suggests premium service
  gold: {
    50: '#FBF8E9',
    100: '#F6EEC7',
    200: '#F1E4A5',
    300: '#ECDA82',
    400: '#E7D15F',
    500: '#D4AF37', // Main accent color
    600: '#BF9A22',
    700: '#A9861E',
    800: '#93721A',
    900: '#7C5D15',
    950: '#634A12'
  },
  
  // Supporting: Gray - for text and subtle elements
  gray: {
    50: '#F9F9F9',
    100: '#F0F0F0',
    200: '#E4E4E4',
    300: '#D1D1D1',
    400: '#B4B4B4',
    500: '#9A9A9A',
    600: '#6E6E6E',
    700: '#525252',
    800: '#333333', // Main text color
    900: '#212121',
    950: '#121212'
  }
};

// Semantic color mappings
export const PREMIUM_SEMANTIC_COLORS = {
  text: {
    primary: PREMIUM_BASE_COLORS.gray[800],
    secondary: PREMIUM_BASE_COLORS.gray[600],
    tertiary: PREMIUM_BASE_COLORS.gray[500],
    inverse: PREMIUM_BASE_COLORS.ivory[50],
    disabled: PREMIUM_BASE_COLORS.gray[400],
    highlight: PREMIUM_BASE_COLORS.gold[500],
    link: PREMIUM_BASE_COLORS.forest[500],
    linkHover: PREMIUM_BASE_COLORS.forest[600]
  },
  background: {
    primary: '#FFFFFF',
    secondary: PREMIUM_BASE_COLORS.ivory[500],
    tertiary: PREMIUM_BASE_COLORS.ivory[300],
    inverse: PREMIUM_BASE_COLORS.forest[900],
    dark: PREMIUM_BASE_COLORS.forest[800],
    brand: PREMIUM_BASE_COLORS.ivory[50],
    accent: PREMIUM_BASE_COLORS.gold[50],
    paper: '#FFFFFF'
  },
  border: {
    light: PREMIUM_BASE_COLORS.ivory[600],
    medium: PREMIUM_BASE_COLORS.gray[300],
    dark: PREMIUM_BASE_COLORS.gray[400],
    accent: PREMIUM_BASE_COLORS.gold[300]
  },
  state: {
    info: PREMIUM_BASE_COLORS.forest[400],
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    hover: {
      primary: PREMIUM_BASE_COLORS.forest[600],
      secondary: PREMIUM_BASE_COLORS.ivory[600],
      accent: PREMIUM_BASE_COLORS.gold[600]
    },
    active: {
      primary: PREMIUM_BASE_COLORS.forest[700],
      secondary: PREMIUM_BASE_COLORS.ivory[700],
      accent: PREMIUM_BASE_COLORS.gold[700]
    },
    focus: {
      outline: PREMIUM_BASE_COLORS.gold[300]
    }
  }
};

// Combined premium colors export
export const PREMIUM_COLORS = {
  BASE_COLORS: PREMIUM_BASE_COLORS,
  SEMANTIC_COLORS: PREMIUM_SEMANTIC_COLORS
};

export default PREMIUM_COLORS; 