// TODO: This file contains direct document access without SSR checks
// TODO: This file contains direct window access without SSR checks
import * as React from 'react';
import { useContext } from 'react';;
import { createContext, useState, useEffect, ReactNode } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../design-system/theme/theme';
import GlobalStyles from '../design-system/theme/globalStyles';

// Define theme types
type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
  themeMode: ThemeMode;
  toggleTheme: () => void;
  setThemeMode: (mode: ThemeMode) => void;
}

// Create context with default values
const ThemeContext = createContext<ThemeContextType>({
  themeMode: 'light',
  toggleTheme: () => {},
  setThemeMode: () => {},
});

// Custom hook for using theme context
export const useTheme = () => useContext(ThemeContext);

interface ThemeProviderProps {
  children: ReactNode;
  initialTheme?: ThemeMode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, initialTheme = 'light' }) => {
  // State for theme mode
  const [themeMode, setThemeMode] = useState<ThemeMode>(initialTheme);
  
  // Get the appropriate theme object based on the mode
  const theme = themeMode === 'light' ? lightTheme : darkTheme;
  
  // Toggle between light and dark themes
  const toggleTheme = () => {
    setThemeMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'));
  };
  
  // Check for user preference on initial load
  useEffect(() => {
    // Check if window is defined (to avoid issues during SSR)
    if (typeof window === 'undefined') return;
    
    const prefersDarkMode = window.matchMedia && 
      window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (prefersDarkMode) {
      setThemeMode('dark');
    }
    
    // Listen for changes in system theme
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      setThemeMode(e.matches ? 'dark' : 'light');
    };
    
    // Add listener for theme changes with fallback for older browsers
    if (mediaQuery.addEventListener) {
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', handleChange);
      } else {
        // Fallback for older browsers
        mediaQuery.addListener(handleChange);
      }
      
      // Cleanup listener
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
      
      // Cleanup listener
      return () => mediaQuery.removeListener(handleChange);
    }
  }, []);
  
  // Apply theme to HTML element
  useEffect(() => {
    // Check if document is defined (to avoid issues during SSR)
    if (typeof document === 'undefined') return;
    
    document.documentElement.setAttribute('data-theme', themeMode);
  }, [themeMode]);
  
  // Create context value
  const contextValue: ThemeContextType = {
    themeMode,
    toggleTheme,
    setThemeMode,
  };
  
  return (
    <ThemeContext.Provider value={contextValue}>
      <StyledThemeProvider theme={theme}>
        <GlobalStyles />
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeContext; 







