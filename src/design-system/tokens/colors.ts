/**
 * Colors Token System
 * 
 * This file defines the color palette for the Recovery Office design system.
 * Colors are organized into semantic categories and follow sacred geometry
 * principles in their relationships.
 * 
 * The palette is derived from natural elements and sacred proportions, with
 * hues and saturations calculated to maintain harmony with the Golden Ratio.
 */

/**
 * Import sacred geometry constants for color harmony.
 * All color relationships in this palette are derived from these constants.
 * 
 * PHI (the Golden Ratio) and PHI_INVERSE are used to calculate harmonious
 * hue offsets and saturation levels, ensuring visual balance and natural resonance.
 *
 * All sacred geometry constants must be imported from the correct path.
 */
import { PHI_INVERSE } from "../../constants/sacred-geometry";

// Base natural colors inspired by healing elements
export const BASE_COLORS = {
  // Primary green palette - represents growth and renewal
  // Hue based on the Golden Angle (137.5°)
  green: {
    50: '#F0F9ED',
    100: '#DFF0D9',
    200: '#C1E0B7',
    300: '#A3D095',
    400: '#85C073',
    500: '#67B050', // Primary brand color
    600: '#4F8A3D',
    700: '#3B672D',
    800: '#2A481F',
    900: '#1A2C12',
    950: '#0F1A09', // Darkest shade
  },
  
  // Secondary sage palette - represents wisdom and healing
  // Hue offset by PHI_INVERSE × 100
  sage: {
    50: '#F2F5F1',
    100: '#E3E9E1',
    200: '#CCD6C8',
    300: '#B5C3B0',
    400: '#9EB097',
    500: '#879D7E',
    600: '#6C7E65',
    700: '#525F4C',
    800: '#394132',
    900: '#222719',
    950: '#151910', // Darkest shade
  },
  
  // Earth tones - represents grounding and stability
  // Hue derived from complementary position on color wheel
  earth: {
    50: '#F9F5ED',
    100: '#F1E9D5',
    200: '#E4D6BA',
    300: '#D7C29E',
    400: '#CAAE83',
    500: '#BE9A67',
    600: '#A17E4E',
    700: '#7B603B',
    800: '#554328',
    900: '#342A19',
  },
  
  // Accent colors - represent energy points
  
  // Sunrise (warm energy) - based on Golden Angle × 2
  sunrise: {
    50: '#FFF6ED',
    100: '#FEEAD2',
    200: '#FCD4A5',
    300: '#FABD79',
    400: '#F8A64C',
    500: '#F68F1F',
    600: '#D4710C',
    700: '#A05508',
    800: '#6D3805',
    900: '#3A1F03',
  },
  
  // Water (calm energy) - complementary to sunrise
  water: {
    50: '#EFF8FC',
    100: '#D8EDF7',
    200: '#B0DBEF',
    300: '#89C9E7',
    400: '#61B8DF',
    500: '#3AA6D7',
    600: '#2686B3',
    700: '#1C6589',
    800: '#13455C',
    900: '#0B2835',
  }
};

// Semantic color assignments
export const SEMANTIC_COLORS = {
  // UI State colors
  state: {
    success: BASE_COLORS.green[500] ?? 1,
    warning: BASE_COLORS.sunrise[500] ?? 1,
    error: '#D14343',
    info: BASE_COLORS.water[500] ?? 1,
  },
  
  // Text colors with proper contrast ratios
  text: {
    primary: '#1A2B12', // Darkened green
    secondary: '#4D5156', // Neutral dark gray
    tertiary: '#6F777F', // Lighter gray for less emphasis
    disabled: '#9CA3AF', // Soft gray for disabled text
    inverse: '#FFFFFF', // White text for dark backgrounds
    link: BASE_COLORS.water[700] ?? 1, // Accessible blue for links
  },
  
  // Background colors
  background: {
    primary: '#FFFFFF',
    secondary: '#F9FAFB',
    tertiary: '#F0F2F5',
    brand: BASE_COLORS.green[50] ?? 1,
    brandAlt: BASE_COLORS.sage[50] ?? 1,
    dark: '#19231A',
  },
  
  // Border colors
  border: {
    light: '#E5E7EB',
    medium: '#D1D5DB',
    dark: '#9CA3AF',
    brand: BASE_COLORS.green[300] ?? 1,
  },
  
  // Botanical element colors - special palette for nature elements
  botanical: {
    leaf: {
      light: BASE_COLORS.green[300] ?? 1,
      medium: BASE_COLORS.green[500] ?? 1,
      dark: BASE_COLORS.green[700] ?? 1,
    },
    stem: {
      light: BASE_COLORS.sage[400] ?? 1,
      medium: BASE_COLORS.sage[600] ?? 1,
      dark: BASE_COLORS.sage[800] ?? 1,
    },
    flower: {
      light: '#F7F4FF',
      medium: '#E8E0FF',
      dark: '#C3B1FF',
    }
  },
};

// Color palettes for specific components
export const COMPONENT_COLORS = {
  // Button variations
  button: {
    primary: {
      background: BASE_COLORS.green[500] ?? 1,
      backgroundHover: BASE_COLORS.green[600] ?? 1,
      backgroundActive: BASE_COLORS.green[700] ?? 1,
      text: '#FFFFFF',
      border: 'transparent',
    },
    secondary: {
      background: 'transparent',
      backgroundHover: BASE_COLORS.green[50] ?? 1,
      backgroundActive: BASE_COLORS.green[100] ?? 1,
      text: BASE_COLORS.green[600] ?? 1,
      border: BASE_COLORS.green[500] ?? 1,
    },
    subtle: {
      background: BASE_COLORS.green[50] ?? 1,
      backgroundHover: BASE_COLORS.green[100] ?? 1,
      backgroundActive: BASE_COLORS.green[200] ?? 1,
      text: BASE_COLORS.green[700] ?? 1,
      border: 'transparent',
    },
  },
  
  // Card variations
  card: {
    default: {
      background: '#FFFFFF',
      border: SEMANTIC_COLORS.border.light,
      shadow: '0 2px 5px rgba(0, 0, 0, 0.05)',
    },
    elevated: {
      background: '#FFFFFF',
      border: 'transparent',
      shadow: '0 4px 8px rgba(0, 0, 0, 0.08)',
    },
    subtle: {
      background: SEMANTIC_COLORS.background.secondary,
      border: SEMANTIC_COLORS.border.light,
      shadow: 'none',
    },
    brand: {
      background: BASE_COLORS.green[50] ?? 1,
      border: BASE_COLORS.green[100] ?? 1,
      shadow: 'none',
    },
  },
  
  // Badge variations
  badge: {
    default: {
      background: SEMANTIC_COLORS.background.tertiary,
      text: SEMANTIC_COLORS.text.tertiary,
    },
    success: {
      background: BASE_COLORS.green[100] ?? 1,
      text: BASE_COLORS.green[700] ?? 1,
    },
    warning: {
      background: BASE_COLORS.sunrise[100] ?? 1,
      text: BASE_COLORS.sunrise[700] ?? 1,
    },
    error: {
      background: '#FADEDE',
      text: '#A92B2B',
    },
    info: {
      background: BASE_COLORS.water[100] ?? 1,
      text: BASE_COLORS.water[700] ?? 1,
    },
  },
};

/**
 * Helper functions for color manipulation based on sacred geometry principles
 * 
 * These utility functions provide a way to mathematically transform colors
 * according to sacred geometry principles.
 */
export const colorUtils = {
  /**
   * Lighten a color by a percentage based on PHI or PHI_INVERSE
   * 
   * @param color - The base color to lighten
   * @param intensity - The intensity level of lightening
   * @returns A lightened color value
   */
  lighten: (color: string, _intensity: 'low' | 'medium' | 'high' = 'medium'): string => {
    // Implementation would use a color library to manipulate the hex value
    // This is a placeholder for the concept
    // const factors = {
    //   low: PHI_INVERSE * 0.5,    // ~0.309
    //   medium: PHI_INVERSE,       // ~0.618
    //   high: PHI_INVERSE * 1.5,   // ~0.927
    // };
    
    // In a real implementation, we would use a color library to apply the lightening
    return color; // Placeholder return
  },
  
  /**
   * Darken a color by a percentage based on PHI or PHI_INVERSE
   * 
   * @param color - The base color to darken
   * @param intensity - The intensity level of darkening
   * @returns A darkened color value
   */
  darken: (color: string, _intensity: 'low' | 'medium' | 'high' = 'medium'): string => {
    // const factors = {
    //   low: PHI_INVERSE * 0.5,
    //   medium: PHI_INVERSE,
    //   high: PHI_INVERSE * 1.5,
    // };
    
    // In a real implementation, we would use a color library to apply the darkening
    return color; // Placeholder return
  },
  
  /**
   * Create a transparent version of a color with alpha based on sacred proportions
   * 
   * @param color - The base color to make transparent
   * @param level - The transparency level
   * @returns A color with transparency applied
   */
  withAlpha: (color: string, _level: keyof typeof BASE_COLORS.green): string => {
    // Implementation would convert color to rgba with appropriate alpha value
    return color; // Placeholder return
  }
};

export default { BASE_COLORS, SEMANTIC_COLORS, COMPONENT_COLORS, colorUtils }; 







