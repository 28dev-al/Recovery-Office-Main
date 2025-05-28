// Export the recovery theme configuration that integrates with the existing premium theme
export const recoveryThemeOverrides = {
  colors: {
    // Add the missing 'light' property that's causing the error
    light: '#f7fafc',
    // Override specific colors for Recovery Office branding
    primary: '#1a365d',
    accent: '#d69e2e',
    text: '#2d3748',
    background: '#ffffff',
    dark: '#1a202c',
    success: '#38a169',
    warning: '#ed8936',
    error: '#e53e3e',
    border: '#e2e8f0',
    surface: '#ffffff'
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px'
  },
  typography: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    fontSizeBase: '16px',
    lineHeight: '1.5'
  },
  breakpoints: {
    mobile: '768px',
    tablet: '1024px',
    desktop: '1200px'
  }
};

// Re-export the theme type from the design system
export type { RecoveryOfficeTheme as RecoveryTheme } from '../design-system/types';

export default recoveryThemeOverrides; 