/**
 * GridItem Component
 * 
 * A component for grid cell items to be used within the Grid component.
 * Implements sacred geometry principles for sizing and spacing.
 */

import * as React from 'react';
import Box from './Box';
import { BoxProps } from '../../types/styled.types';

// GridItem specific props
export interface GridItemProps extends BoxProps {
  /**
   * The number of columns this item should span
   */
  colSpan?: number | string;
  
  /**
   * The number of rows this item should span
   */
  rowSpan?: number | string;
  
  /**
   * The column to start this item at
   */
  colStart?: number | string;
  
  /**
   * The row to start this item at
   */
  rowStart?: number | string;
  
  /**
   * The column to end this item at
   */
  colEnd?: number | string;
  
  /**
   * The row to end this item at
   */
  rowEnd?: number | string;
  
  /**
   * The grid area for this item
   */
  area?: string;
}

/**
 * GridItem Component with ref forwarding
 * Provides a simplified API for grid cell items
 */
export const GridItem = React.forwardRef<HTMLDivElement, GridItemProps>(
  ({
    colSpan,
    rowSpan,
    colStart,
    rowStart,
    colEnd,
    rowEnd,
    area,
    children,
    ...rest
  }, ref) => {
    return (
      <Box
        style={{
          gridColumn: colSpan ? `span ${colSpan}` : undefined,
          gridRow: rowSpan ? `span ${rowSpan}` : undefined,
          gridColumnStart: colStart,
          gridRowStart: rowStart,
          gridColumnEnd: colEnd,
          gridRowEnd: rowEnd,
          gridArea: area,
          ...(rest.style || {})
        }}
        ref={ref}
        {...rest}
      >
        {children}
      </Box>
    );
  }
);

GridItem.displayName = 'GridItem';

export default GridItem; 