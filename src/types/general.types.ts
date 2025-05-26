/**
 * General Types
 * 
 * This file contains shared type definitions used throughout the application.
 * These types incorporate sacred geometry principles where applicable.
 */

import { ReactNode, CSSProperties } from 'react';
import { PHI, PHI_INVERSE } from '../constants/sacred-geometry';

// Component common props
export interface BaseComponentProps {
  className?: string;
  id?: string;
}

// Component props with children
export interface BaseComponentWithChildrenProps extends BaseComponentProps {
  children?: ReactNode;
}

// Sacred geometry measurement
export type SacredUnit = 'px' | 'rem' | '%' | 'vh' | 'vw' | 'ratio';

export interface SacredMeasurement {
  value: number;
  unit: SacredUnit;
}

// Sacred ratio measurement with reference value
export interface SacredRatioMeasurement {
  value: number;
  unit: 'ratio';
  reference?: number;
}

// Combined sacred measurement type
export type SacredDimension = 
  | { value: number; unit: 'px' | 'rem' | '%' | 'vh' | 'vw' }
  | SacredRatioMeasurement;

// Children prop type
export interface WithChildren {
  children: ReactNode;
}

// Sacred position
export interface SacredPosition {
  x: SacredDimension;
  y: SacredDimension;
}

// Sacred spacing configuration for components
export interface SacredSpacing {
  spacing?: number | string;
  spacingType?: 'fibonacci' | 'golden-ratio' | 'custom';
  spacingMultiplier?: number;
}

// Sacred geometry configuration for components
export interface SacredGeometryConfig {
  usePhi?: boolean;
  phiDirection?: 'horizontal' | 'vertical' | 'both';
  useGoldenRatio?: boolean;
  useFibonacci?: boolean;
  goldenRatioSection?: 'major' | 'minor' | 'both';
}

// Direction for animations and layouts
export type Direction = 'up' | 'down' | 'left' | 'right';

// Responsive breakpoint keys
export type BreakpointKey = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

// Responsive values
export type ResponsiveValue<T> = {
  [key in BreakpointKey]?: T;
} & {
  base: T;
};

// Size variants
export type SizeVariant = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

// Component variant types
export type VariantType = 'primary' | 'secondary' | 'tertiary' | 'accent';

// Common animation types based on sacred geometry principles
export type SacredAnimationType = 'fade' | 'slide' | 'scale' | 'rotate' | 'golden-spiral';

// Animation configuration using sacred numbers
export interface SacredAnimationConfig {
  type: SacredAnimationType;
  duration?: number;
  delay?: number;
  easing?: 'standard' | 'easeIn' | 'easeOut' | 'botanical';
  usePhi?: boolean;
  useFibonacci?: boolean;
}

// Golden Spiral parameters
export interface GoldenSpiralParams {
  rotations: number;
  scale: number;
  direction?: 'clockwise' | 'counterclockwise';
}

// Type guard for responsive value
export const isResponsiveValue = <T>(value: T | ResponsiveValue<T>): value is ResponsiveValue<T> => {
  return typeof value === 'object' && value !== null && 'base' in value;
};

// Type guard for sacred ratio measurement
export const isSacredRatioMeasurement = (
  measurement: SacredDimension
): measurement is SacredRatioMeasurement => {
  return measurement.unit === 'ratio';
};

// Convert a standard measurement to golden ratio enhanced measurement
export const toGoldenRatio = (value: number): number => {
  return value * PHI;
};

// Convert a standard measurement to inverse golden ratio
export const toGoldenRatioInverse = (value: number): number => {
  return value * PHI_INVERSE;
}; 





