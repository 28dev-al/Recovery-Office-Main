/**
 * GoldenSection Component
 * 
 * Implements a layout based on the Golden Ratio (PHI = 1.618).
 * This component creates sections that follow the divine proportion,
 * creating aesthetically pleasing and harmonious layouts.
 * 
 * The component supports both horizontal and vertical golden sections,
 * as well as more complex sacred geometry patterns.
 */

import * as React from 'react';
import { Grid } from './Grid';
import Box from './Box';
import { GoldenSectionProps } from '../../types';
import { PHI, PHI_INVERSE } from '../../../constants/sacred-geometry';

/**
 * GoldenSection Component with ref forwarding
 * Creates layouts based on the divine proportion (Golden Ratio)
 */
export const GoldenSection = React.forwardRef<HTMLDivElement, GoldenSectionProps>(
  ({ 
    direction = 'horizontal',
    reverseOrder = false,
    children,
    rightContent,
    leftContent,
    ...rest 
  }, ref) => {
    // Determine if we're using horizontal or vertical layout
    const isHorizontal = direction === 'horizontal';
    
    // Handle both children and leftContent/rightContent props
    const childrenArray = React.Children.toArray(children);
    
    // Determine primary and secondary content
    let primaryContent: React.ReactNode;
    let secondaryContent: React.ReactNode;
    
    // If leftContent/rightContent are provided, use them
    if (leftContent !== undefined || rightContent !== undefined) {
      primaryContent = leftContent;
      secondaryContent = rightContent;
    } 
    // Otherwise use children (if there are exactly 2)
    else if (childrenArray.length === 2) {
      [primaryContent, secondaryContent] = reverseOrder 
        ? [childrenArray[1], childrenArray[0]]
        : [childrenArray[0], childrenArray[1]];
    }
    // Fallback if neither condition is met
    else if (childrenArray.length !== 2 && !(leftContent || rightContent)) {
      console.warn(
        'GoldenSection requires either exactly two children OR leftContent/rightContent props ' +
        'for proper Golden Ratio implementation'
      );
      return <Box ref={ref} {...rest}>{children}</Box>;
    }
    
    // Set up grid properties based on direction
    const gridTemplateColumns = isHorizontal 
      ? `${PHI_INVERSE * 100}% ${(1 - PHI_INVERSE) * 100}%` 
      : undefined;
      
    const gridTemplateRows = !isHorizontal 
      ? `${PHI_INVERSE * 100}% ${(1 - PHI_INVERSE) * 100}%` 
      : undefined;
    
    return (
      <Grid
        templateColumns={gridTemplateColumns}
        templateRows={gridTemplateRows}
        ref={ref}
        {...rest}
      >
        <Box 
          className="golden-section-primary"
          width={isHorizontal ? '100%' : undefined}
          height={!isHorizontal ? '100%' : undefined}
        >
          {primaryContent}
        </Box>
        <Box 
          className="golden-section-secondary"
          width={isHorizontal ? '100%' : undefined}
          height={!isHorizontal ? '100%' : undefined}
        >
          {secondaryContent}
        </Box>
      </Grid>
    );
  }
);

GoldenSection.displayName = 'GoldenSection';

export default GoldenSection; 








