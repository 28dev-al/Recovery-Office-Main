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
    if (this.container) return;
    
    this.container = document.createElement('div');
    this.container.id = 'visual-debugger';
    this.container.style.cssText = `
      position: fixed;
      top: 10px;
      right: 10px;
      width: 350px;
      max-height: 500px;
      background: rgba(0, 0, 0, 0.9);
      color: #00ff00;
      padding: 12px;
      border-radius: 8px;
      font-family: 'Courier New', monospace;
      font-size: 11px;
      overflow-y: auto;
      z-index: 999999;
      white-space: pre-wrap;
      word-wrap: break-word;
      border: 1px solid #333;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    `;
    
    // Add header with controls
    const header = document.createElement('div');
    header.style.cssText = `
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
      padding-bottom: 8px;
      border-bottom: 1px solid #333;
      color: #fff;
      font-weight: bold;
    `;
    
    const title = document.createElement('span');
    title.textContent = '🐛 Debug Logger';
    
    const controls = document.createElement('div');
    controls.style.cssText = 'display: flex; gap: 8px;';
    
    const clearBtn = document.createElement('button');
    clearBtn.textContent = 'Clear';
    clearBtn.style.cssText = `
      background: #dc3545;
      color: white;
      border: none;
      padding: 2px 6px;
      border-radius: 3px;
      font-size: 10px;
      cursor: pointer;
    `;
    clearBtn.onclick = () => this.clear();
    
    const hideBtn = document.createElement('button');
    hideBtn.textContent = 'Hide';
    hideBtn.style.cssText = `
      background: #6c757d;
      color: white;
      border: none;
      padding: 2px 6px;
      border-radius: 3px;
      font-size: 10px;
      cursor: pointer;
    `;
    hideBtn.onclick = () => this.hide();
    
    controls.appendChild(clearBtn);
    controls.appendChild(hideBtn);
    header.appendChild(title);
    header.appendChild(controls);
    
    this.container.appendChild(header);
    
    // Add content area
    const content = document.createElement('div');
    content.id = 'debug-content';
    content.style.cssText = `
      max-height: 400px;
      overflow-y: auto;
      line-height: 1.4;
    `;
    this.container.appendChild(content);
    
    document.body.appendChild(this.container);
    
    // Add global show function
    (window as unknown as Window & {showDebugger: () => void}).showDebugger = () => this.show();
    
    this.log('🚀 Visual Debugger initialized');
  }

  static log(message: string, data?: unknown) {
    // Still try regular console
    try {
      console.log(message, data);
    } catch {
      // Console might not be available
    }
    
    this.init();
    
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = `[${timestamp}] ${message}`;
    
    if (data !== undefined) {
      const dataStr = typeof data === 'object' ? 
        JSON.stringify(data, null, 2) : 
        String(data);
      this.logs.push(`${logEntry}\n${dataStr}`);
    } else {
      this.logs.push(logEntry);
    }
    
    // Keep only last maxLogs entries
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs);
    }
    
    this.updateDisplay();
  }

  static error(message: string, error?: unknown) {
    const errorStr = error instanceof Error ? 
      `${error.message}\n${error.stack}` : 
      String(error);
    
    this.log(`❌ ERROR: ${message}`, errorStr);
  }

  static warn(message: string, data?: unknown) {
    this.log(`⚠️ WARNING: ${message}`, data);
  }

  static info(message: string, data?: unknown) {
    this.log(`ℹ️ INFO: ${message}`, data);
  }

  static success(message: string, data?: unknown) {
    this.log(`✅ SUCCESS: ${message}`, data);
  }

  private static updateDisplay() {
    if (!this.container) return;
    
    const content = this.container.querySelector('#debug-content');
    if (content) {
      content.innerHTML = this.logs
        .slice()
        .reverse()
        .map(log => `<div style="margin-bottom: 8px; padding: 4px; background: rgba(255,255,255,0.05); border-radius: 3px;">${this.escapeHtml(log)}</div>`)
        .join('');
      
      // Auto-scroll to top (since we reverse the logs)
      content.scrollTop = 0;
    }
  }

  private static escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  static clear() {
    this.logs = [];
    this.updateDisplay();
    this.log('🧹 Debug log cleared');
  }

  static hide() {
    if (this.container) {
      this.container.style.display = 'none';
    }
  }

  static show() {
    if (this.container) {
      this.container.style.display = 'block';
    } else {
      this.init();
    }
  }

  static toggle() {
    if (!this.container) {
      this.init();
      return;
    }
    
    if (this.container.style.display === 'none') {
      this.show();
    } else {
      this.hide();
    }
  }

  static setPosition(position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left') {
    if (!this.container) return;
    
    // Reset all position styles
    this.container.style.top = 'auto';
    this.container.style.bottom = 'auto';
    this.container.style.left = 'auto';
    this.container.style.right = 'auto';
    
    switch (position) {
      case 'top-right':
        this.container.style.top = '10px';
        this.container.style.right = '10px';
        break;
      case 'top-left':
        this.container.style.top = '10px';
        this.container.style.left = '10px';
        break;
      case 'bottom-right':
        this.container.style.bottom = '10px';
        this.container.style.right = '10px';
        break;
      case 'bottom-left':
        this.container.style.bottom = '10px';
        this.container.style.left = '10px';
        break;
    }
  }
}

// Global shortcuts for easier use
export const vlog = (message: string, data?: unknown) => VisualDebugger.log(message, data);
export const verror = (message: string, error?: unknown) => VisualDebugger.error(message, error);
export const vwarn = (message: string, data?: unknown) => VisualDebugger.warn(message, data);
export const vinfo = (message: string, data?: unknown) => VisualDebugger.info(message, data);
export const vsuccess = (message: string, data?: unknown) => VisualDebugger.success(message, data);

// Auto-initialize in development
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

  log(message: string, ...args: any[]) {
    const count = this.logCounts.get(message) || 0;

    if (count < this.MAX_LOGS_PER_MESSAGE) {
      console.log(message, ...args);
      this.logCounts.set(message, count + 1);
    } else if (count === this.MAX_LOGS_PER_MESSAGE) {
      console.log(`🚨 [DEBUG] Message "${message}" suppressed - too many occurrences`);
      this.logCounts.set(message, count + 1);
    }
    // Silent after max reached
  }

  error(message: string, ...args: any[]) {
    const count = this.logCounts.get(message) || 0;

    if (count < this.MAX_LOGS_PER_MESSAGE) {
      console.error(message, ...args);
      this.logCounts.set(message, count + 1);
    } else if (count === this.MAX_LOGS_PER_MESSAGE) {
      console.error(`🚨 [DEBUG] Error "${message}" suppressed - too many occurrences`);
      this.logCounts.set(message, count + 1);
    }
  }

  warn(message: string, ...args: any[]) {
    const count = this.logCounts.get(message) || 0;

    if (count < this.MAX_LOGS_PER_MESSAGE) {
      console.warn(message, ...args);
      this.logCounts.set(message, count + 1);
    } else if (count === this.MAX_LOGS_PER_MESSAGE) {
      console.warn(`🚨 [DEBUG] Warning "${message}" suppressed - too many occurrences`);
      this.logCounts.set(message, count + 1);
    }
  }

  info(message: string, ...args: any[]) {
    const count = this.logCounts.get(message) || 0;

    if (count < this.MAX_LOGS_PER_MESSAGE) {
      console.info(message, ...args);
      this.logCounts.set(message, count + 1);
    } else if (count === this.MAX_LOGS_PER_MESSAGE) {
      console.info(`🚨 [DEBUG] Info "${message}" suppressed - too many occurrences`);
      this.logCounts.set(message, count + 1);
    }
  }

  // Get statistics about suppressed messages
  getStats() {
    const stats = Array.from(this.logCounts.entries()).map(([message, count]) => ({
      message,
      count,
      suppressed: count > this.MAX_LOGS_PER_MESSAGE
    }));

    return {
      totalMessages: this.logCounts.size,
      suppressedMessages: stats.filter(s => s.suppressed).length,
      details: stats
    };
  }

  // Manual reset for testing
  reset() {
    this.logCounts.clear();
  }
}

export const debugLogger = new ConsoleManager();

// Convenience functions for common patterns
export const logWithSpamProtection = (message: string, ...args: any[]) => {
  debugLogger.log(message, ...args);
};

export const errorWithSpamProtection = (message: string, ...args: any[]) => {
  debugLogger.error(message, ...args);
};

export const warnWithSpamProtection = (message: string, ...args: any[]) => {
  debugLogger.warn(message, ...args);
}; 