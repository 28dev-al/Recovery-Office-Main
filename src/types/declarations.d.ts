/**
 * Global Type Declarations
 * 
 * This file contains global type declarations for the Recovery Office project.
 * It includes declarations for static assets, third-party libraries, and custom types
 * that need to be made available throughout the application.
 */

// ---------------------------------
// Image and Asset Declarations
// ---------------------------------

// Declare SVG imports
declare module '*.svg' {
  import React = require('react');
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

// Declare image file imports
declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.jpeg' {
  const content: string;
  export default content;
}

declare module '*.gif' {
  const content: string;
  export default content;
}

declare module '*.webp' {
  const content: string;
  export default content;
}

// ---------------------------------
// Font Declarations
// ---------------------------------

declare module '*.woff' {
  const content: string;
  export default content;
}

declare module '*.woff2' {
  const content: string;
  export default content;
}

declare module '*.ttf' {
  const content: string;
  export default content;
}

declare module '*.eot' {
  const content: string;
  export default content;
}

// ---------------------------------
// Other File Type Declarations
// ---------------------------------

declare module '*.json' {
  const content: any;
  export default content;
}

declare module '*.css' {
  const content: Record<string, string>;
  export default content;
}

// ---------------------------------
// Environment Variables
// ---------------------------------

interface ImportMetaEnv {
  VITE_API_URL: string;
  VITE_APP_NAME: string;
  VITE_AUTH_DOMAIN: string;
  VITE_AUTH_CLIENT_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// ---------------------------------
// Global Namespace Declarations
// ---------------------------------

interface Window {
  // Add any window-specific globals here
  recoveryOfficeConfig?: {
    apiBase: string;
    debug: boolean;
    featureFlags: Record<string, boolean>;
  };
}

// ---------------------------------
// Third-Party Library Extensions
// ---------------------------------

// Add any third-party library type augmentations here

// ---------------------------------
// Utility Type Declarations
// ---------------------------------

/**
 * Make specific properties of T optional
 */
type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/**
 * Make specific properties of T required
 */
type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

/**
 * Make properties of T nullable
 */
type Nullable<T> = { [K in keyof T]: T[K] | null };

/**
 * Make all properties of T deeply recursive
 */
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer U>
    ? Array<DeepPartial<U>>
    : T[P] extends ReadonlyArray<infer U>
    ? ReadonlyArray<DeepPartial<U>>
    : T[P] extends object
    ? DeepPartial<T[P]>
    : T[P];
}; 