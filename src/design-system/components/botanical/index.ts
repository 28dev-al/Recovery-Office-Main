/**
 * Botanical Components
 * 
 * This module exports botanical components and utilities that follow sacred geometry principles.
 * These elements are inspired by natural forms and mathematical patterns.
 */

// Components
export { default as BotanicalElement } from './BotanicalElement';
export { default as LeafPattern } from './LeafPattern';
export { default as FlowerOfLife } from './FlowerOfLife';
export { default as VesicaPiscis } from './VesicaPiscis';
export { default as FibonacciSpiral } from './FibonacciSpiral';
export { default as OliveBranch } from './OliveBranch';
export { default as OliveLeaf } from './OliveLeaf';
export { SmallFlourish } from './SmallFlourish';
export { default as BotanicalDecorator } from './BotanicalDecorator';

// Utilities
export {
  // Positioning utilities
  getBotanicalPositionStyles,
  getBotanicalSize,
  
  // Responsive utilities
  responsiveBotanicalScale,
  responsiveBotanicalVisibility,
  botanicalBreakpoints,
  
  // Accessibility utilities
  accessibleBotanical,
  
  // Creation utility
  createBotanicalContainer
} from './botanicalUtils';

// Types
export type {
  BotanicalPosition,
  BotanicalSize,
  BotanicalPositionOptions
} from './botanicalUtils';
export type { BotanicalDecoratorProps } from './BotanicalDecorator';

// Export types from the botanical components
export type { BotanicalElementProps } from './BotanicalElement';
export type { LeafPatternProps } from './LeafPattern';
export type { FlowerOfLifeProps } from './FlowerOfLife';
export type { OliveBranchProps } from './OliveBranch';
export type { OliveLeafProps } from './OliveLeaf';
export type { VesicaPiscisProps } from './VesicaPiscis';
export type { FibonacciSpiralProps } from './FibonacciSpiral';
export type { SmallFlourishProps } from './SmallFlourish'; 





