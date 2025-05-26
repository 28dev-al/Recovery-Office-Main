/**
 * Flex Component
 * 
 * Extends the Box component with flexbox properties.
 * Uses sacred geometry principles for spacing, alignment, and distribution.
 * 
 * The Flex component is designed to provide a simple and consistent API
 * for creating flex layouts that adhere to the sacred geometry principles.
 */

import * as React from 'react';
import Box from './Box';
import { BoxProps, FlexProps } from '../../types/styled.types';

/**
 * Flex Component with ref forwarding
 * Provides a simplified API for flexbox layouts
 */
export const Flex = React.forwardRef<HTMLDivElement, BoxProps & FlexProps>(
  (
    { 
      flexDirection = 'row', 
      alignItems = 'stretch', 
      justifyContent = 'flex-start', 
      flexWrap = 'nowrap',
      gap,
      borderRadius,
      children,
      ...rest 
    }, 
    ref
  ) => {
    // Ensure borderRadius has 'px' suffix if it's a number
    const formattedBorderRadius = typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius;
    
    return (
      <Box
        display="flex"
        flexDirection={flexDirection}
        alignItems={alignItems}
        justifyContent={justifyContent}
        flexWrap={flexWrap}
        gap={gap}
        borderRadius={formattedBorderRadius}
        ref={ref}
        {...rest}
      >
        {children}
      </Box>
    );
  }
);

Flex.displayName = 'Flex';

export default Flex; 





