/**
 * Container Component
 * 
 * A layout component that provides a centered container with width constraints
 * based on sacred geometry principles. The Container helps maintain optimal
 * content width and padding across different viewport sizes.
 * 
 * The maximum widths follow Fibonacci-based values and golden ratio proportions
 * to create harmonious, balanced layouts.
 */

import { forwardRef } from 'react';
import * as React from 'react';
import Box from './Box';
import { ContainerProps } from '../../types/styled.types';

// Define sacred grid values locally based on the constants in sacred-geometry.ts
const CONTAINER_WIDTHS = {
  // Maximum width - 1440px (Fibonacci value combinations)
  maxWidth: 1440,
  gutter: {
    xs: 8,  // Fibonacci value
    sm: 13, // Fibonacci value
    md: 21, // Fibonacci value
    lg: 34, // Fibonacci value
  }
};

/**
 * Container Component with ref forwarding
 * 
 * Creates a centered container with sacred-geometry-based proportions
 */
export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ 
    children, 
    maxWidth = 'lg',
    fluid = false,
    centerContent = false,
    ...rest 
  }, ref) => {
    // Determine the max-width value based on the maxWidth prop
    const getMaxWidth = () => {
      if (fluid) return '100%';
      
      // Use predefined max-width values based on sacred geometry
      switch (maxWidth) {
        case 'xs':
          // Small dialogs, mobile components
          return CONTAINER_WIDTHS.maxWidth / 3; // ~480px
        case 'sm':
          // Narrow content, forms, etc.
          return CONTAINER_WIDTHS.maxWidth / 2; // ~720px
        case 'md':
          // General content, standard width
          return CONTAINER_WIDTHS.maxWidth * 0.618; // ~890px (Golden ratio of max width)
        case 'lg':
          // Default width, main content
          return CONTAINER_WIDTHS.maxWidth * 0.89; // ~1282px (Based on Fibonacci ratio 89%)
        case 'xl':
          // Wide content, but still constrained
          return CONTAINER_WIDTHS.maxWidth; // 1440px (Full sacred grid width)
        default:
          // If a custom value is provided, use it directly
          return maxWidth;
      }
    };

    // Apply Fibonacci-based padding that scales with viewport size
    // This creates a harmonious responsive behavior
    return (
      <Box
        width="100%"
        maxWidth={getMaxWidth()}
        mx="auto" // Center horizontally
        _xs={{ px: CONTAINER_WIDTHS.gutter.xs }} // 8px on mobile (Fibonacci)
        _md={{ px: CONTAINER_WIDTHS.gutter.md }} // 21px on tablet (Fibonacci)
        _lg={{ px: CONTAINER_WIDTHS.gutter.lg }} // 34px on desktop (Fibonacci)
        display={centerContent ? 'flex' : undefined}
        flexDirection={centerContent ? 'column' : undefined}
        alignItems={centerContent ? 'center' : undefined}
        ref={ref}
        {...rest}
      >
        {children}
      </Box>
    );
  }
);

Container.displayName = 'Container';

export default Container;






