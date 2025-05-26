/**
 * Grid Component
 * 
 * Extends the Box component with CSS Grid properties.
 * Implements a grid system based on Fibonacci sequence and Golden Ratio.
 * 
 * The Grid component provides a consistent way to create grid layouts
 * that adhere to sacred geometry principles.
 */

import * as React from 'react';
import styled from 'styled-components';
import Box from './Box';
import { BoxProps } from '../../types/styled.types';
import { PHI, FIBONACCI, FibonacciIndex } from '../../../constants/sacred-geometry';

// Import GridItem for re-export
import GridItemComponent from './GridItem';
export const GridItem = GridItemComponent;

// Extended Grid Props to include special grid options
interface GridProps extends BoxProps {
  /**
   * Number of columns or specific template
   */
  columns?: number | 'golden' | 'fibonacci' | string;
  
  /**
   * Number of rows or specific template
   */
  rows?: string | number;
  
  /**
   * Spacing between grid cells
   */
  gap?: string | number;
  
  /**
   * Horizontal spacing between grid cells
   */
  columnGap?: string | number;
  
  /**
   * Vertical spacing between grid cells
   */
  rowGap?: string | number;
  
  /**
   * CSS grid-template-areas property
   */
  templateAreas?: string;
  
  /**
   * CSS grid-template-columns property
   * Can be a string or a responsive object with breakpoint keys
   */
  templateColumns?: string | Record<string, string>;
  
  /**
   * CSS grid-template-rows property
   */
  templateRows?: string;
  
  /**
   * CSS grid-auto-columns property 
   */
  autoColumns?: string;
  
  /**
   * CSS grid-auto-rows property
   */
  autoRows?: string;
  
  /**
   * CSS grid-auto-flow property
   */
  autoFlow?: string;
}

/**
 * Safely gets a Fibonacci value by numeric key
 * @param key - The numeric key to lookup in the Fibonacci sequence
 * @returns The Fibonacci value
 */
const getFibonacciValue = (key: number): number => {
  // Convert to string then to FibonacciIndex type for safe access
  // This is a workaround for TypeScript's type checking
  const safeKey = parseInt(key.toString()) as FibonacciIndex;
  
  // Default to 1 if the key doesn't exist in FIBONACCI
  return FIBONACCI[safeKey] ?? 1;
};

/**
 * Generates grid template columns based on Fibonacci sequence
 * @param columns - Number of columns or specific template
 * @returns CSS grid-template-columns value
 */
export const generateGridTemplateColumns = (columns: GridProps['columns']): string => {
  if (typeof columns === 'number') {
    // For numeric columns, create a Fibonacci-based grid
    return `repeat(${columns}, minmax(0, 1fr))`;
  }
  
  if (columns === 'golden') {
    // Golden ratio proportion: 1:φ (1:1.618)
    return `1fr ${PHI}fr`;
  }
  
  if (columns === 'fibonacci') {
    // Use first few Fibonacci numbers as column widths
    const fibKeys = Object.keys(FIBONACCI).map(Number).sort((a, b) => a - b);
    const fibWidths = fibKeys.slice(0, 4).map(k => `${getFibonacciValue(k)}fr`).join(' ');
    return fibWidths;
  }
  
  // Return custom template or undefined
  return columns || '';
};

/**
 * Processes the templateColumns prop to handle responsive objects
 * @param templateColumns - The template columns prop value
 * @returns CSS properties for template columns 
 */
const processTemplateColumns = (templateColumns: GridProps['templateColumns']) => {
  if (!templateColumns) return undefined;
  
  // If it's a string, use it directly
  if (typeof templateColumns === 'string') {
    return templateColumns;
  }
  
  // If it's a responsive object, create responsive styles with media queries
  if (typeof templateColumns === 'object') {
    // For direct Box prop usage, we'll handle this differently
    // The Box component will apply these styles through its responsive props system
    const baseValue = templateColumns.base || templateColumns.xs;
    
    // Return the base value, and the responsive styles will be handled by the Box component
    return baseValue;
  }
  
  return undefined;
};

/**
 * Grid Component with ref forwarding
 * Provides a simplified API for grid layouts based on sacred geometry
 */
export const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ 
    columns,
    rows,
    gap,
    columnGap,
    rowGap,
    templateAreas,
    templateColumns,
    templateRows,
    autoColumns,
    autoRows,
    autoFlow,
    children,
    ...rest 
  }, ref) => {
    // Generate grid template columns if the columns prop is provided
    const gridTemplateColumns = columns ? generateGridTemplateColumns(columns) : processTemplateColumns(templateColumns);
    
    // Create responsive props for grid template columns if needed
    const responsiveProps: Record<string, any> = {};
    
    // Handle responsive gridTemplateColumns
    if (templateColumns && typeof templateColumns === 'object') {
      Object.entries(templateColumns).forEach(([breakpoint, value]) => {
        if (breakpoint === 'base') return; // Skip base, already handled
        
        // Create responsive props following Box component's _breakpoint format
        const breakpointKey = `_${breakpoint}`;
        if (!responsiveProps[breakpointKey]) {
          responsiveProps[breakpointKey] = {};
        }
        
        responsiveProps[breakpointKey].gridTemplateColumns = value;
      });
    }
    
    // Set all grid properties on the Box component
    const gridProps = {
      display: "grid",
      gridTemplateColumns: gridTemplateColumns || undefined,
      gridTemplateRows: templateRows || (typeof rows === 'string' ? rows : undefined),
      gridTemplateAreas: templateAreas,
      gridGap: gap,
      gridRowGap: rowGap,
      gridColumnGap: columnGap
    };
    
    return (
      <Box
        ref={ref}
        {...gridProps}
        {...responsiveProps}
        {...rest}
      >
        {children}
      </Box>
    );
  }
);

Grid.displayName = 'Grid';

export default Grid; 








