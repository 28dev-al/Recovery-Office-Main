/**
 * Stack Component
 * 
 * A component for stacking child elements with consistent spacing.
 * Uses sacred geometry principles to determine spacing and alignment.
 */

import * as React from 'react';
import { forwardRef } from 'react';
import Flex from './Flex';
import { StackProps, AsProps } from '../../types/styled.types';
import Box from './Box';
import { spacing } from '../../tokens';

/**
 * Stack Component with ref forwarding
 */
export const Stack = React.forwardRef<HTMLDivElement, AsProps<HTMLDivElement> & StackProps>(
  ({ 
    children, 
    direction = 'vertical',
    spacing: spacingProp = 'md',
    align,
    justify,
    divider,
    shouldWrap = false,
    ...rest 
  }, ref) => {
    const flexDirection = direction === 'vertical' ? 'column' : 'row';
    
    const getAlignment = () => {
      if (direction === 'vertical') {
        return {
          alignItems: align || 'stretch',
          justifyContent: justify || 'flex-start',
        };
      }
      return {
        alignItems: align || 'center',
        justifyContent: justify || 'flex-start',
      };
    };
    
    // Fixed spacing value handling
    const getSpacingValue = (): string | number => {
      if (typeof spacingProp === 'string') {
        // Check if spacingProp is a key in the spacing object
        if (spacingProp in spacing) {
          const sacredValue = spacing[spacingProp as keyof typeof spacing];
          return typeof sacredValue === 'number' ? sacredValue : spacingProp;
        }
        return spacingProp;
      }
      return spacingProp;
    };
    
    const childrenWithDividers = () => {
      if (!divider) return children;
      
      return React.Children.map(children, (child, index) => {
        if (index === 0) return child;
        
        return (
          <>
            {React.cloneElement(divider as React.ReactElement, {
              key: `divider-${index}`
            })}
            {child}
          </>
        );
      });
    };

    const alignmentProps = getAlignment();
    
    return (
      <Flex
        flexDirection={flexDirection}
        gap={getSpacingValue()} // Now returns string | number
        flexWrap={shouldWrap ? 'wrap' : 'nowrap'}
        alignItems={alignmentProps.alignItems}
        justifyContent={alignmentProps.justifyContent}
        ref={ref}
        {...rest}
      >
        {divider ? childrenWithDividers() : children}
      </Flex>
    );
  }
);

Stack.displayName = 'Stack';

export default Stack;






