/**
 * Botanical Type Definitions
 * 
 * This file defines TypeScript interfaces for botanical elements
 * to ensure consistency and type safety throughout the application.
 */

import { BotanicalPosition } from '../components/botanical';

/**
 * Available botanical element types
 */
export type BotanicalElementType = 
  | 'flowerOfLife' 
  | 'vesicaPiscis' 
  | 'fibonacciSpiral' 
  | 'oliveBranch' 
  | 'oliveLeaf'
  | 'smallFlourish';

/**
 * Available botanical element sizes
 */
export type BotanicalSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

/**
 * Size for LeafPattern component
 */
export type LeafPatternSize = 'small' | 'medium' | 'large';

/**
 * Variants for SmallFlourish component
 */
export type SmallFlourishVariant = 'spiral' | 'curved' | 'angular' | 'wave';

/**
 * Props for botanical decorations
 * Allows for both boolean and detailed configuration
 */
export type BotanicalProps = {
  /**
   * Type of botanical element to display
   */
  type: BotanicalElementType;
  
  /**
   * Position of the botanical element
   */
  position: BotanicalPosition;
  
  /**
   * Size of the botanical element
   * @default 'md'
   */
  size?: BotanicalSize;
  
  /**
   * Opacity of the botanical element
   * @default 0.8
   */
  opacity?: number;
  
  /**
   * Whether to animate the botanical element
   * @default false
   */
  animated?: boolean;
  
  /**
   * Rotation angle in degrees
   * @default 0
   */
  rotation?: number;
};

/**
 * Type for components that can accept botanical decoration
 * Can be either a boolean (to use defaults) or a detailed configuration
 */
export type BotanicalDecoration = BotanicalProps | boolean; 