/**
 * Visual Debugger Utility
 * 
 * Provides on-screen debugging when console is not available or working properly.
 * Displays logs in a fixed overlay for real-time debugging.
 */

export class VisualDebugger {
  private static container: HTMLElement | null = null;
  private static logs: string[] = [];
  private static maxLogs = 50;

  static init() {
    // DISABLED: Visual debugger overlay disabled for production
    return;
  }

  static log(message: string, data?: unknown) {
    // Silent operation - no visual overlay
    try {
      if (process.env.NODE_ENV === 'development') {
        console.log(message, data);
      }
    } catch {
      // Silent
    }
  }

  static error(message: string, error?: unknown) {
    try {
      if (process.env.NODE_ENV === 'development') {
        console.error(message, error);
      }
    } catch {
      // Silent
    }
  }

  static warn(message: string, data?: unknown) {
    try {
      if (process.env.NODE_ENV === 'development') {
        console.warn(message, data);
      }
    } catch {
      // Silent
    }
  }

  static info(message: string, data?: unknown) {
    try {
      if (process.env.NODE_ENV === 'development') {
        console.info(message, data);
      }
    } catch {
      // Silent
    }
  }

  static success(message: string, data?: unknown) {
    try {
      if (process.env.NODE_ENV === 'development') {
        console.log(`✅ ${message}`, data);
      }
    } catch {
      // Silent
    }
  }

  private static updateDisplay() {
    // DISABLED: No visual display
    return;
  }

  private static escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  static clear() {
    this.logs = [];
  }

  static hide() {
    // DISABLED: No visual component to hide
    return;
  }

  static show() {
    // DISABLED: No visual component to show
    return;
  }

  static toggle() {
    // DISABLED: No visual component to toggle
    return;
  }

  static setPosition() {
    // DISABLED: No visual component to position
    return;
  }
}

// Global shortcuts for easier use - now silent
export const vlog = (message: string, data?: unknown) => VisualDebugger.log(message, data);
export const verror = (message: string, error?: unknown) => VisualDebugger.error(message, error);
export const vwarn = (message: string, data?: unknown) => VisualDebugger.warn(message, data);
export const vinfo = (message: string, data?: unknown) => VisualDebugger.info(message, data);
export const vsuccess = (message: string, data?: unknown) => VisualDebugger.success(message, data);

// DISABLED: Auto-initialization completely disabled
/*
if (process.env.NODE_ENV === 'development') {
  // Add global access
  const windowWithDebugger = window as unknown as Window & {
    VisualDebugger: typeof VisualDebugger;
    vlog: typeof vlog;
    verror: typeof verror;
    vwarn: typeof vwarn;
    vinfo: typeof vinfo;
    vsuccess: typeof vsuccess;
  };
  
  windowWithDebugger.VisualDebugger = VisualDebugger;
  windowWithDebugger.vlog = vlog;
  windowWithDebugger.verror = verror;
  windowWithDebugger.vwarn = vwarn;
  windowWithDebugger.vinfo = vinfo;
  windowWithDebugger.vsuccess = vsuccess;
  
  // Auto-show in development
  setTimeout(() => {
    VisualDebugger.init();
  }, 1000);
}
*/

/**
 * Console Spam Prevention Utility
 * Prevents infinite console logging that degrades application performance
 */

class ConsoleManager {
  private logCounts: Map<string, number> = new Map();
  private readonly MAX_LOGS_PER_MESSAGE = 5;
  private readonly RESET_INTERVAL = 30000; // 30 seconds

  constructor() {
    // Reset log counts every 30 seconds
    setInterval(() => {
      this.logCounts.clear();
    }, this.RESET_INTERVAL);
  }

  log(message: string, ...args: unknown[]) {
    const count = this.logCounts.get(message) || 0;

    if (count < this.MAX_LOGS_PER_MESSAGE) {
      if (process.env.NODE_ENV === 'development') {
        console.log(message, ...args);
      }
      this.logCounts.set(message, count + 1);
    } else if (count === this.MAX_LOGS_PER_MESSAGE) {
      if (process.env.NODE_ENV === 'development') {
        console.log(`🚨 [DEBUG] Message "${message}" suppressed - too many occurrences`);
      }
      this.logCounts.set(message, count + 1);
    }
    // Silent after max reached
  }

  error(message: string, ...args: unknown[]) {
    const count = this.logCounts.get(message) || 0;

    if (count < this.MAX_LOGS_PER_MESSAGE) {
      if (process.env.NODE_ENV === 'development') {
        console.error(message, ...args);
      }
      this.logCounts.set(message, count + 1);
    } else if (count === this.MAX_LOGS_PER_MESSAGE) {
      if (process.env.NODE_ENV === 'development') {
        console.error(`🚨 [DEBUG] Error "${message}" suppressed - too many occurrences`);
      }
      this.logCounts.set(message, count + 1);
    }
  }

  warn(message: string, ...args: unknown[]) {
    const count = this.logCounts.get(message) || 0;

    if (count < this.MAX_LOGS_PER_MESSAGE) {
      if (process.env.NODE_ENV === 'development') {
        console.warn(message, ...args);
      }
      this.logCounts.set(message, count + 1);
    } else if (count === this.MAX_LOGS_PER_MESSAGE) {
      if (process.env.NODE_ENV === 'development') {
        console.warn(`🚨 [DEBUG] Warning "${message}" suppressed - too many occurrences`);
      }
      this.logCounts.set(message, count + 1);
    }
  }

  info(message: string, ...args: unknown[]) {
    const count = this.logCounts.get(message) || 0;

    if (count < this.MAX_LOGS_PER_MESSAGE) {
      if (process.env.NODE_ENV === 'development') {
        console.info(message, ...args);
      }
      this.logCounts.set(message, count + 1);
    } else if (count === this.MAX_LOGS_PER_MESSAGE) {
      if (process.env.NODE_ENV === 'development') {
        console.info(`🚨 [DEBUG] Info "${message}" suppressed - too many occurrences`);
      }
      this.logCounts.set(message, count + 1);
    }
  }
}

export const debugLogger = new ConsoleManager();

// Convenience functions for common patterns
export const logWithSpamProtection = (message: string, ...args: unknown[]) => {
  debugLogger.log(message, ...args);
}; 