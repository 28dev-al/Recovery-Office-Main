/**
 * Production Console Log Removal Utility
 * Removes debug console logs in production builds while keeping critical warnings and errors
 */

// Setup production console log filtering
export const setupProductionConsole = () => {
  // Only remove console logs in production
  if (process.env.NODE_ENV === 'production') {
    // Keep console.warn and console.error for critical issues
    const originalWarn = console.warn;
    const originalError = console.error;
    
    // Override debug methods with no-ops
    console.log = () => {};
    console.debug = () => {};
    console.info = () => {};
    
    // Restore critical methods
    console.warn = originalWarn;
    console.error = originalError;
    
    // Single production message
    console.log('🚀 Recovery Office - Production Build Loaded');
  } else {
    // Development build indicator
    console.log('🔧 Recovery Office - Development Build');
    console.log('📋 Debug logging enabled for development');
  }
};

// Development-safe debug logger
export const debugLog = (message, ...args) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(message, ...args);
  }
};

// Development-safe error logger (always shows)
export const errorLog = (message, ...args) => {
  console.error('[Recovery Office Error]', message, ...args);
};

// Development-safe warning logger (always shows)
export const warnLog = (message, ...args) => {
  console.warn('[Recovery Office Warning]', message, ...args);
}; 