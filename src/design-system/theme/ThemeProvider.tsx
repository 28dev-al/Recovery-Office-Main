/**
 * Theme Provider
 * 
 * This component provides the theme to all components in the application.
 * It uses styled-components' ThemeProvider to inject the theme into the component tree.
 */

import React, { createContext, useContext, useMemo } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './theme';
import { premiumTheme } from './theme.premium';
import { RecoveryOfficeTheme } from '../types';
import GlobalStyles from './globalStyles';

// Define a type for theme path values
type ThemeValueType = string | number | boolean | object | null | undefined;

// Helper function to safely access theme properties with fallbacks
export const getThemeValue = (
  theme: Record<string, unknown>,
  path: string, 
  fallback: ThemeValueType = null
): ThemeValueType => {
  try {
    return path.split('.').reduce<ThemeValueType>((acc, part) => {
      if (acc === null || acc === undefined || typeof acc !== 'object') {
        return fallback;
      }
      
      const currentAcc = acc as Record<string, unknown>;
      const result = currentAcc[part];
      
      // Ensure we return the correct type
      return result !== undefined ? (result as ThemeValueType) : fallback;
    }, theme as ThemeValueType);
  } catch (error) {
    console.warn(`Error accessing theme path: ${path}`, error);
    return fallback;
  }
};

// Create a wrapper for the theme to safely access properties
export const createSafeTheme = (theme: Partial<RecoveryOfficeTheme>): RecoveryOfficeTheme => {
  if (!theme) return premiumTheme;
  
  // Deep clone the theme to avoid modifying the original
  const safeTheme = JSON.parse(JSON.stringify(theme));
  
  // Ensure critical paths exist
  if (!safeTheme.colors) safeTheme.colors = {};
  if (!safeTheme.colors.text) safeTheme.colors.text = {};
  if (!safeTheme.colors.primary) safeTheme.colors.primary = {};
  if (!safeTheme.colors.secondary) safeTheme.colors.secondary = {};
  if (!safeTheme.colors.background) safeTheme.colors.background = {};
  if (!safeTheme.colors.feedback) safeTheme.colors.feedback = {};
  if (!safeTheme.colors.gradients) safeTheme.colors.gradients = {};
  
  // Add light value to ensure it exists
  if (!safeTheme.colors.text.light) {
    safeTheme.colors.text.light = '#FFFFFF';
  }
  
  return safeTheme as RecoveryOfficeTheme;
};

// Theme context with default
export const ThemeContext = createContext<{
  theme: RecoveryOfficeTheme;
  toggleTheme: () => void;
  setMode: (mode: 'light' | 'dark' | 'premium') => void;
  getThemeValue: (path: string, fallback?: ThemeValueType) => ThemeValueType;
}>({
  theme: premiumTheme,
  toggleTheme: () => {},
  setMode: () => {},
  getThemeValue: (path: string, fallback = null) => fallback
});

/**
 * Props for the ThemeProvider component
 */
interface ThemeProviderProps {
  /**
   * The children components to render within the theme provider
   */
  children: React.ReactNode;
  
  /**
   * Optional initial mode (light, dark, or premium)
   * @default 'premium'
   */
  initialMode?: 'light' | 'dark' | 'premium';
  
  /**
   * Backward compatibility prop (use initialMode instead)
   * @deprecated Use initialMode instead
   */
  mode?: 'light' | 'dark' | 'premium';
}

/**
 * The ThemeProvider component
 * 
 * This component wraps the application and provides the theme context
 * to all styled components. It also applies the global styles.
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  initialMode = 'premium',
  mode
}) => {
  // Store the current theme mode in state
  // Give priority to mode prop for backward compatibility
  const [currentMode, setCurrentMode] = React.useState<'light' | 'dark' | 'premium'>(
    mode || initialMode
  );

  // Memoize the theme object
  const theme = useMemo(() => {
    let selectedTheme;
    switch (currentMode) {
      case 'dark':
        selectedTheme = darkTheme;
        break;
      case 'premium':
        selectedTheme = premiumTheme;
        break;
      default:
        selectedTheme = lightTheme;
    }
    
    // Apply safety wrapper to prevent crashes
    return createSafeTheme(selectedTheme);
  }, [currentMode]);

  // Toggle between light and dark modes
  const toggleTheme = () => {
    setCurrentMode((prevMode) => {
      // Skip the premium mode when toggling
      if (prevMode === 'light') return 'dark';
      if (prevMode === 'dark') return 'light';
      return 'light';
    });
  };

  // Set mode directly
  const setMode = (newMode: 'light' | 'dark' | 'premium') => {
    setCurrentMode(newMode);
  };
  
  // Function to safely get theme values
  const getThemeValueFn = (path: string, fallback: ThemeValueType = null) => {
    return getThemeValue(theme as unknown as Record<string, unknown>, path, fallback);
  };

  // Render the provider with the current theme
  return (
    <ThemeContext.Provider value={{ 
      theme, 
      toggleTheme, 
      setMode,
      getThemeValue: getThemeValueFn 
    }}>
      <StyledThemeProvider theme={theme}>
        <GlobalStyles />
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme
export const useTheme = () => useContext(ThemeContext);

export default ThemeProvider; 





