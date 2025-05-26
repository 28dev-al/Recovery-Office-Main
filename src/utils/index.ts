/**
 * Utility functions index
 * 
 * This file exports all utility functions to provide clean imports
 * throughout the application.
 */

// Export sacred geometry utilities with explicit naming to avoid conflicts
import {
  goldenRatioSegment,
  goldenRatioScale,
  closestFibonacci,
  pxToRem,
  createSpacing,
  createSacredBezier,
  goldenRectangleHeight,
  isSacredPoint,
  fibonacciGridColumns,
  // Explicitly rename these functions to avoid naming conflicts
  generateGoldenSpiralPoints as generateGoldenSpiralPointsGeometry,
  getFibonacciValues as getFibonacciValuesGeometry
} from './sacredGeometry';

export {
  goldenRatioSegment,
  goldenRatioScale,
  closestFibonacci,
  pxToRem,
  createSpacing,
  createSacredBezier,
  goldenRectangleHeight,
  isSacredPoint,
  fibonacciGridColumns,
  // Export the renamed functions for use when geometric accuracy is needed
  generateGoldenSpiralPointsGeometry,
  getFibonacciValuesGeometry
};

// Export animation utilities with explicit naming to avoid conflicts
import {
  resolveDuration,
  applyGoldenRatioDuration,
  getSacredEasingCss,
  calculateStaggerDelay,
  goldenSpring,
  responsiveAnimationDelay,
  prefersReducedMotion,
  getAccessibleAnimationSettings,
  // Export these as the primary versions for animation purposes
  generateGoldenSpiralPoints,
  getFibonacciValues,
} from './animation';

export {
  resolveDuration,
  applyGoldenRatioDuration,
  getSacredEasingCss,
  calculateStaggerDelay,
  goldenSpring,
  responsiveAnimationDelay,
  prefersReducedMotion,
  getAccessibleAnimationSettings,
  // Export the animation versions as the default versions
  generateGoldenSpiralPoints,
  getFibonacciValues,
};

// Export performance utilities
export * from './animationPerformance';

// Export props mapping utilities
export * from './propsMapping';

// Explicitly export the preferred getFibonacciByIndex implementation
export { getFibonacciByIndex } from './getFibonacciByIndex';






