/**
 * Design Components Index
 * 
 * Central export point for professional design components
 */

// Export individual components using default exports
export { default as BotanicalElement } from './BotanicalElement';
export { default as BotanicalBackground } from './BotanicalBackground';
export { default as FlowerOfLife } from './FlowerOfLife';
export { default as OliveBranch } from './OliveBranch';
export { default as OliveLeaf } from './OliveLeaf';
export { default as VesicaPiscis } from './VesicaPiscis';
export { default as FibonacciSpiral } from './FibonacciSpiral';
export { default as SeedOfLife } from './SeedOfLife';
export { default as TreeOfLife } from './TreeOfLife';
export { default as PentaFlower } from './PentaFlower';
export { default as LeafPattern } from './LeafPattern';
export { default as SmallFlourish } from './SmallFlourish';
export { default as GoldenRectangle } from './GoldenRectangle';

// Export types
export type { BotanicalBackgroundProps } from './BotanicalBackground';
export type { BotanicalElementProps } from './BotanicalElement';
export type { BotanicalSize, BotanicalPositionOptions } from './botanicalUtils';
export type BotanicalPosition = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'center' | 'centerLeft' | 'centerRight' | 'topCenter' | 'bottomCenter';

// Utilities
export { getBotanicalPositionStyles, getBotanicalSize, createBotanicalContainer } from './botanicalUtils'; 