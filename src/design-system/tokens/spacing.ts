/**
 * Professional Spacing Tokens
 * 
 * Professional 8-point grid spacing system for consistent layout and alignment
 * across all components in the Recovery Office application.
 */

// Base unit for 8-point grid system
const BASE_UNIT = 8;

/**
 * Premium spacing scale following professional design standards
 * All values are multiples of 8px for consistent grid alignment
 */
export const PREMIUM_SPACING = {
  /** 0px - No spacing */
  none: 0,
  
  /** 4px - Minimal micro spacing */
  xxxs: BASE_UNIT / 2,
  
  /** 6px - Tiny spacing for very tight layouts */
  xxs: (BASE_UNIT * 3) / 4,
  
  /** 8px - Minimal spacing for tight layouts */
  xs: BASE_UNIT,
  
  /** 16px - Small spacing for component padding */
  sm: BASE_UNIT * 2,
  
  /** 24px - Medium spacing for section gaps */
  md: BASE_UNIT * 3,
  
  /** 32px - Large spacing for component separation */
  lg: BASE_UNIT * 4,
  
  /** 48px - Extra large spacing for major sections */
  xl: BASE_UNIT * 6,
  
  /** 64px - Double extra large for page-level spacing */
  xxl: BASE_UNIT * 8,
  
  /** 128px - Extra massive spacing for hero sections */
  xxxl: BASE_UNIT * 16,
  
  /** 96px - Massive spacing for hero sections */
  massive: BASE_UNIT * 12
};

/**
 * Professional grid system for layout structure
 */
export const PROFESSIONAL_GRID = {
  /** Standard 12-column grid */
  columns: 12,
  
  /** Gutter between columns */
  gutter: PREMIUM_SPACING.md,
  
  /** Page margins */
  margin: PREMIUM_SPACING.lg,
  
  /** Maximum content width */
  maxWidth: 1200,
  
  /** Container padding */
  containerPadding: PREMIUM_SPACING.lg
};

/**
 * Responsive breakpoints for professional design
 */
export const PREMIUM_BREAKPOINTS = {
  /** Mobile devices */
  sm: '576px',
  
  /** Tablets */
  md: '768px',
  
  /** Desktop */
  lg: '992px',
  
  /** Large desktop */
  xl: '1200px',
  
  /** Extra large screens */
  xxl: '1400px'
};

/**
 * Component-specific spacing presets
 */
export const COMPONENT_SPACING = {
  /** Button internal padding */
  button: {
    sm: `${PREMIUM_SPACING.xs}px ${PREMIUM_SPACING.sm}px`,
    md: `${PREMIUM_SPACING.sm}px ${PREMIUM_SPACING.md}px`,
    lg: `${PREMIUM_SPACING.md}px ${PREMIUM_SPACING.lg}px`
  },
  
  /** Card padding */
  card: {
    sm: PREMIUM_SPACING.sm,
    md: PREMIUM_SPACING.md,
    lg: PREMIUM_SPACING.lg
  },
  
  /** Section padding */
  section: {
    sm: PREMIUM_SPACING.lg,
    md: PREMIUM_SPACING.xl,
    lg: PREMIUM_SPACING.xxl
  },
  
  /** Form field spacing */
  form: {
    fieldGap: PREMIUM_SPACING.sm,
    sectionGap: PREMIUM_SPACING.lg,
    labelMargin: PREMIUM_SPACING.xs
  }
};

// Export default spacing for convenience
export default PREMIUM_SPACING; 







