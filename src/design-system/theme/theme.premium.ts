/**
 * Premium Theme Configuration
 * 
 * This file constructs the premium theme object using the new token system.
 * The structure follows the existing theme pattern but replaces the values
 * with professionally designed financial service aesthetic.
 */

import {
  PHI,
  PHI_INVERSE,
  FIBONACCI,
  GOLDEN_SECTIONS,
  ANIMATION_TIMING,
  SACRED_EASINGS
} from "../../constants/sacred-geometry";

import {
  PREMIUM_COLORS,
  PREMIUM_SPACING,
  PREMIUM_TYPOGRAPHY,
  PREMIUM_BREAKPOINTS,
  PREMIUM_SHADOWS
} from '../tokens';

import { RecoveryOfficeTheme } from '../types';

/**
 * The premium theme configuration
 */
export const premiumTheme: RecoveryOfficeTheme = {
  colors: {
    primary: PREMIUM_COLORS.BASE_COLORS.forest,
    secondary: PREMIUM_COLORS.BASE_COLORS.ivory,
    neutral: {
      white: '#FFFFFF',
      ivory: '#F8F7F0',
      light: '#F5F5F5',
      gray: '#666666',
      dark: '#1A1A1A',
      darkGray: '#333333',
      black: '#000000',
      50: '#F9FAFB',
      100: '#F3F4F6',
      200: '#E5E7EB',
      300: '#D1D5DB',
      400: '#9CA3AF',
      500: '#6B7280',
      600: '#4B5563',
      700: '#374151',
      800: '#1F2937',
      900: '#111827'
    },
    background: {
      50: PREMIUM_COLORS.SEMANTIC_COLORS.background.secondary,
      100: PREMIUM_COLORS.SEMANTIC_COLORS.background.tertiary,
      200: PREMIUM_COLORS.BASE_COLORS.gray[200],
      300: PREMIUM_COLORS.BASE_COLORS.gray[300],
      400: PREMIUM_COLORS.BASE_COLORS.gray[400],
      500: PREMIUM_COLORS.BASE_COLORS.gray[500],
      600: PREMIUM_COLORS.BASE_COLORS.gray[600],
      700: PREMIUM_COLORS.SEMANTIC_COLORS.background.dark,
      800: PREMIUM_COLORS.BASE_COLORS.forest[800],
      900: PREMIUM_COLORS.BASE_COLORS.forest[900],
      950: PREMIUM_COLORS.BASE_COLORS.forest[950],
      paper: PREMIUM_COLORS.SEMANTIC_COLORS.background.paper,
    },
    white: '#FFFFFF',
    text: {
      primary: PREMIUM_COLORS.SEMANTIC_COLORS.text.primary,
      secondary: PREMIUM_COLORS.SEMANTIC_COLORS.text.secondary,
      tertiary: PREMIUM_COLORS.SEMANTIC_COLORS.text.tertiary,
      light: PREMIUM_COLORS.SEMANTIC_COLORS.text.inverse,
      dark: PREMIUM_COLORS.SEMANTIC_COLORS.text.primary,
      disabled: PREMIUM_COLORS.SEMANTIC_COLORS.text.disabled
    },
    divider: PREMIUM_COLORS.SEMANTIC_COLORS.border.light,
    accent: {
      gold: PREMIUM_COLORS.BASE_COLORS.gold[500],
      copper: PREMIUM_COLORS.BASE_COLORS.gold[600],
      teal: PREMIUM_COLORS.BASE_COLORS.forest[400],
      lavender: '#A992E2',
      rose: '#E27992'
    },
    success: {
      light: '#4ADE80',
      main: '#10B981',
      dark: '#059669'
    },
    feedback: {
      success: {
        light: '#4ADE80',
        main: '#10B981',
        dark: '#059669'
      },
      warning: {
        light: '#FCD34D',
        main: '#F59E0B',
        dark: '#D97706'
      },
      error: {
        light: '#F87171',
        main: '#EF4444',
        dark: '#DC2626'
      },
      info: {
        light: PREMIUM_COLORS.BASE_COLORS.forest[300],
        main: PREMIUM_COLORS.BASE_COLORS.forest[500],
        dark: PREMIUM_COLORS.BASE_COLORS.forest[700]
      }
    },
    gradients: {
      primary: `linear-gradient(45deg, ${PREMIUM_COLORS.BASE_COLORS.forest[600]} 0%, ${PREMIUM_COLORS.BASE_COLORS.forest[500]} 100%)`,
      secondary: `linear-gradient(45deg, ${PREMIUM_COLORS.BASE_COLORS.forest[400]} 0%, ${PREMIUM_COLORS.BASE_COLORS.forest[300]} 100%)`,
      light: `linear-gradient(45deg, ${PREMIUM_COLORS.SEMANTIC_COLORS.background.primary} 0%, ${PREMIUM_COLORS.SEMANTIC_COLORS.background.secondary} 100%)`,
      gold: `linear-gradient(45deg, ${PREMIUM_COLORS.BASE_COLORS.gold[500]} 0%, ${PREMIUM_COLORS.BASE_COLORS.gold[300]} 100%)`
    },
    alpha: {
      high: 0.87,
      medium: 0.6,
      low: 0.38,
      slight: 0.24,
      minimal: 0.12,
      ultraLight: 0.05
    }
  },
  spacing: {
    none: PREMIUM_SPACING.none,
    xxxs: PREMIUM_SPACING.xxs,
    xxs: PREMIUM_SPACING.xxs,
    xs: PREMIUM_SPACING.xs,
    sm: PREMIUM_SPACING.sm,
    md: PREMIUM_SPACING.md,
    lg: PREMIUM_SPACING.lg,
    xl: PREMIUM_SPACING.xl,
    xxl: PREMIUM_SPACING.xxl,
    xxxl: PREMIUM_SPACING.xxxl,
    buttonPadding: PREMIUM_SPACING.buttonPadding.y,
    inputPadding: PREMIUM_SPACING.inputPadding.y,
    cardPadding: PREMIUM_SPACING.cardPadding,
    sectionPadding: PREMIUM_SPACING.sectionPadding.md,
    containerPadding: PREMIUM_SPACING.containerPadding.md,
    rem: PREMIUM_SPACING.rem,
    cssVar: {
      none: 'var(--spacing-none)',
      xxxs: 'var(--spacing-xxxs)',
      xxs: 'var(--spacing-xxs)',
      xs: 'var(--spacing-xs)',
      sm: 'var(--spacing-sm)',
      md: 'var(--spacing-md)',
      lg: 'var(--spacing-lg)',
      xl: 'var(--spacing-xl)',
      xxl: 'var(--spacing-xxl)',
      xxxl: 'var(--spacing-xxxl)'
    }
  },
  typography: {
    fontFamily: {
      heading: PREMIUM_TYPOGRAPHY.fontFamily.heading,
      body: PREMIUM_TYPOGRAPHY.fontFamily.body,
      mono: PREMIUM_TYPOGRAPHY.fontFamily.mono
    },
    fontSize: {
      xs: PREMIUM_TYPOGRAPHY.fontSize.values.xs,
      sm: PREMIUM_TYPOGRAPHY.fontSize.values.sm,
      base: PREMIUM_TYPOGRAPHY.fontSize.values.base,
      md: PREMIUM_TYPOGRAPHY.fontSize.values.md,
      lg: PREMIUM_TYPOGRAPHY.fontSize.values.lg,
      xl: PREMIUM_TYPOGRAPHY.fontSize.values.xl,
      xxl: PREMIUM_TYPOGRAPHY.fontSize.values.xxl,
      rem: {
        xs: PREMIUM_TYPOGRAPHY.fontSize.xs,
        sm: PREMIUM_TYPOGRAPHY.fontSize.sm,
        base: PREMIUM_TYPOGRAPHY.fontSize.base,
        md: PREMIUM_TYPOGRAPHY.fontSize.md,
        lg: PREMIUM_TYPOGRAPHY.fontSize.lg,
        xl: PREMIUM_TYPOGRAPHY.fontSize.xl,
        xxl: PREMIUM_TYPOGRAPHY.fontSize.xxl
      },
      responsive: PREMIUM_TYPOGRAPHY.fontSize.responsive
    },
    fontWeight: {
      light: PREMIUM_TYPOGRAPHY.fontWeight.light,
      regular: PREMIUM_TYPOGRAPHY.fontWeight.regular,
      medium: PREMIUM_TYPOGRAPHY.fontWeight.medium,
      semiBold: PREMIUM_TYPOGRAPHY.fontWeight.semibold,
      bold: PREMIUM_TYPOGRAPHY.fontWeight.bold,
      black: PREMIUM_TYPOGRAPHY.fontWeight.black
    },
    lineHeight: {
      tight: PREMIUM_TYPOGRAPHY.lineHeight.tight,
      base: PREMIUM_TYPOGRAPHY.lineHeight.base,
      relaxed: PREMIUM_TYPOGRAPHY.lineHeight.relaxed,
      spacious: PREMIUM_TYPOGRAPHY.lineHeight.spacious
    },
    letterSpacing: {
      tight: PREMIUM_TYPOGRAPHY.letterSpacing.tight,
      normal: PREMIUM_TYPOGRAPHY.letterSpacing.normal,
      wide: PREMIUM_TYPOGRAPHY.letterSpacing.wide,
      wider: PREMIUM_TYPOGRAPHY.letterSpacing.wider,
      widest: PREMIUM_TYPOGRAPHY.letterSpacing.widest
    },
    textTransform: {
      uppercase: 'uppercase',
      lowercase: 'lowercase',
      capitalize: 'capitalize',
      none: 'none'
    },
    textDecoration: {
      underline: 'underline',
      lineThrough: 'line-through',
      none: 'none'
    },
    fontStyle: {
      normal: 'normal',
      italic: 'italic'
    }
  },
  breakpoints: {
    values: PREMIUM_BREAKPOINTS.values,
    up: PREMIUM_BREAKPOINTS.up,
    down: PREMIUM_BREAKPOINTS.down,
    between: PREMIUM_BREAKPOINTS.between,
    only: PREMIUM_BREAKPOINTS.only,
    custom: (value: number) => PREMIUM_BREAKPOINTS.up(value),
    print: PREMIUM_BREAKPOINTS.print,
    hover: PREMIUM_BREAKPOINTS.hover,
    reducedMotion: PREMIUM_BREAKPOINTS.reducedMotion,
    prefersDark: PREMIUM_BREAKPOINTS.prefersDark,
    prefersLight: PREMIUM_BREAKPOINTS.prefersLight,
    xs: PREMIUM_BREAKPOINTS.values.xs,
    sm: PREMIUM_BREAKPOINTS.values.sm,
    md: PREMIUM_BREAKPOINTS.values.md,
    lg: PREMIUM_BREAKPOINTS.values.lg,
    xl: PREMIUM_BREAKPOINTS.values.xl,
    xxl: PREMIUM_BREAKPOINTS.values.xxl
  },
  radius: {
    none: 0,
    xs: 2,
    sm: 4,
    md: 6,
    lg: 8,
    xl: 12,
    circle: '50%',
    button: 4,
    input: 4,
    card: 8,
    badge: 4,
    modal: 8,
    tooltip: 4,
    rem: {
      none: '0rem',
      xs: '0.125rem',
      sm: '0.25rem',
      md: '0.375rem',
      lg: '0.5rem',
      xl: '0.75rem',
      circle: '50%'
    },
    cssVar: {
      none: 'var(--radius-none)',
      xs: 'var(--radius-xs)',
      sm: 'var(--radius-sm)',
      md: 'var(--radius-md)',
      lg: 'var(--radius-lg)',
      xl: 'var(--radius-xl)',
      circle: 'var(--radius-circle)'
    }
  },
  shadows: PREMIUM_SHADOWS,
  sacredGeometry: {
    PHI,
    PHI_INVERSE,
    FIBONACCI,
    GOLDEN_SECTIONS,
    ANIMATION_TIMING: {
      ...ANIMATION_TIMING,
      stagger: {
        quick: ANIMATION_TIMING.quick / 2,
        standard: ANIMATION_TIMING.standard / 2,
        slow: ANIMATION_TIMING.slow / 2
      }
    },
    SACRED_EASINGS: {
      standard: SACRED_EASINGS.standard as unknown as [number, number, number, number],
      easeIn: [PHI_INVERSE, 0, 1, 1] as [number, number, number, number],
      easeOut: [0, 0, 1 - PHI_INVERSE, 1] as [number, number, number, number],
      botanical: [0.175, 0.885, 0.32, 1.275] as [number, number, number, number],
      golden: SACRED_EASINGS.golden as unknown as [number, number, number, number]
    }
  },
  mode: 'premium' as const
} as unknown as RecoveryOfficeTheme;

export default premiumTheme; 