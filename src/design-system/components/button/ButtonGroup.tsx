/**
 * ButtonGroup Component
 * 
 * A component for grouping buttons with consistent spacing and layout.
 * Implements Fibonacci-based spacing and golden ratio alignment principles.
 * 
 * The ButtonGroup provides options for horizontal or vertical alignment
 * and automatically applies consistent spacing between buttons.
 */

import * as React from 'react';
import styled from 'styled-components';
import { Box } from '../layout';
import { BoxProps } from '../../types';
import { spacing } from '../../tokens';

// Define a type for spacing keys to allow indexing
type SpacingToken = keyof typeof spacing;

/**
 * ButtonGroup component props
 */
export interface ButtonGroupProps extends BoxProps {
  /**
   * The direction of the button group
   * @default 'horizontal'
   */
  direction?: 'horizontal' | 'vertical';
  
  /**
   * The spacing between buttons (uses Fibonacci spacing values)
   * @default 'xs'
   */
  spacing?: SpacingToken | number;
  
  /**
   * Whether all buttons in the group should be the same size
   * @default false
   */
  isAttached?: boolean;
  
  /**
   * Whether all buttons should occupy equal space
   * @default false
   */
  isEqual?: boolean;
  
  /**
   * Alignment of the buttons within the group
   * @default 'center'
   */
  alignment?: 'start' | 'center' | 'end' | 'space-between' | 'space-around';
  
  /**
   * The content of the button group (should be Button components)
   */
  children: React.ReactNode;
}

// Styled button group wrapper
const StyledButtonGroup = styled(Box)<{
  direction?: 'horizontal' | 'vertical';
  isAttached?: boolean;
  spacingValue: number | string;
  alignment?: string;
  isEqual?: boolean;
}>`
  display: flex;
  flex-direction: ${props => props.direction === 'vertical' ? 'column' : 'row'};
  
  // Alignment mapping
  justify-content: ${props => {
    switch (props.alignment) {
      case 'start': return 'flex-start';
      case 'end': return 'flex-end';
      case 'space-between': return 'space-between';
      case 'space-around': return 'space-around';
      case 'center':
      default: return 'center';
    }
  }};
  
  // Apply spacing when not attached
  ${props => !props.isAttached && `
    gap: ${typeof props.spacingValue === 'number' 
      ? `${props.spacingValue}px` 
      : props.spacingValue};
  `}
  
  // Attached buttons styling
  ${props => props.isAttached && `
    // Remove border radius from adjacent buttons
    & > button:not(:first-child):not(:last-child) {
      border-radius: 0;
      ${props.direction === 'horizontal' ? `
        border-left-width: 0;
      ` : `
        border-top-width: 0;
      `}
    }
    
    // Special styling for first and last buttons when attached
    & > button:first-child {
      ${props.direction === 'horizontal' ? `
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      ` : `
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
      `}
    }
    
    & > button:last-child {
      ${props.direction === 'horizontal' ? `
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        border-left-width: 0;
      ` : `
        border-top-left-radius: 0;
        border-top-right-radius: 0;
        border-top-width: 0;
      `}
    }
  `}
  
  // Equal width/height buttons
  ${props => props.isEqual && `
    & > button {
      flex: 1;
      ${props.direction === 'horizontal' ? 'width: 100%;' : 'height: 100%;'}
    }
  `}
`;

/**
 * ButtonGroup Component with ref forwarding
 * 
 * Groups buttons with consistent spacing based on sacred geometry
 */
export const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ 
    direction = 'horizontal',
    spacing: spacingProp = 'xs',
    isAttached = false,
    isEqual = false,
    alignment = 'center',
    children,
    ...rest 
  }, ref) => {
    // Get spacing value - can be a key from spacing tokens or a direct value
    const getSpacingValue = (): string | number => {
      if (typeof spacingProp === 'string') {
        // Hard-code common spacing values to avoid type issues
        switch(spacingProp) {
          case 'none': return 0;
          case 'xxxs': return 1;
          case 'xxs': return 2;
          case 'xs': return 5;
          case 'sm': return 8;
          case 'md': return 13;
          case 'lg': return 21;
          case 'xl': return 34;
          case 'xxl': return 55;
          case 'xxxl': return 89;
          default: return 8; // Default to sm (8px)
        }
      }
      return typeof spacingProp === 'number' ? spacingProp : 8;
    };
    
    // Calculate spacing value
    const spacingValue = getSpacingValue();
    
    // Apply common props to all child buttons
    const childrenWithProps = React.Children.map(children, child => {
      if (React.isValidElement(child)) {
        // Clone the child with modified props if needed
        const newProps: Record<string, unknown> = {};
        
        // Only add size prop if buttons are attached
        if (isAttached) {
          newProps.size = child.props.size || 'md';
        }
        
        // Add appropriate style props
        const styleProps = {
          ...(child.props.style || {}),
        };
        
        if (isEqual && direction === 'horizontal') {
          styleProps.flex = 1;
        }
        
        if (isEqual && direction === 'vertical') {
          styleProps.width = '100%';
        }
        
        newProps.style = styleProps;
        
        return React.cloneElement(child, newProps);
      }
      return child;
    });
    
    return (
      <StyledButtonGroup
        ref={ref}
        direction={direction}
        spacingValue={spacingValue}
        isAttached={isAttached}
        isEqual={isEqual}
        alignment={alignment}
        aria-label="Button group"
        {...rest}
      >
        {childrenWithProps}
      </StyledButtonGroup>
    );
  }
);

ButtonGroup.displayName = 'ButtonGroup';

export default ButtonGroup; 






