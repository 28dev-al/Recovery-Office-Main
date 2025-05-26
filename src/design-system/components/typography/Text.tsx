/**
 * Text Component
 * 
 * A typography component for general text that implements sacred geometry
 * principles for font sizing, line height, and spacing.
 * 
 * Line heights follow the Golden Ratio (1.618) for optimal readability and harmony.
 */

import * as React from 'react';
import styled, { DefaultTheme } from 'styled-components';
import { AsProps, BoxProps, TextProps as StyleTextProps } from '../../types';
import Box from '../layout/Box';

// Interface for Text props
export interface TextProps extends BoxProps, StyleTextProps {
  /**
   * The HTML element to render the text as
   * @default 'span'
   */
  as?: 'span' | 'p' | 'div' | 'label' | 'strong' | 'em' | 'small' | 'del' | 'ins';
  
  /**
   * Preset text size based on the typography system
   * @default 'base'
   */
  size?: 'xs' | 'sm' | 'base' | 'md' | 'lg' | 'xl';
  
  /**
   * Typography variant, for compatibility with Typography component
   */
  variant?: 'body1' | 'body2' | 'subtitle1' | 'subtitle2' | 'caption' | 'overline' | 'button' | string;
  
  /**
   * Whether to truncate text with ellipsis when it overflows
   * @default false
   */
  truncate?: boolean;
  
  /**
   * Number of lines after which to truncate text with ellipsis
   * @default undefined (no limit)
   */
  noOfLines?: number;
  
  /**
   * Whether text should be italicized
   * @default false
   */
  italic?: boolean;
  
  /**
   * Font weight using the theme's weight scale
   * @default 'regular'
   */
  weight?: 'light' | 'regular' | 'medium' | 'semiBold' | 'bold' | 'black';
  
  /**
   * The color of the text (from the theme's color tokens)
   * @default 'text.primary'
   */
  color?: string;
  
  /**
   * Margin bottom, provided for compatibility with direct style props
   */
  marginBottom?: string | number;
  
  /**
   * The content of the text
   */
  children: React.ReactNode;
}

// Create the styled text component with all style variants
const StyledText = styled(Box)<TextProps>`
  // Base text styles
  font-family: ${props => props.theme.typography.fontFamily.body};
  margin: 0;
  ${props => props.marginBottom && `margin-bottom: ${props.marginBottom};`}
  
  // Size styles
  font-size: ${props => {
    const size = props.size || 'base';
    return props.theme.typography.fontSize.rem[size] ?? 1;
  }};
  
  // Weight styles
  font-weight: ${props => {
    const weight = props.weight || 'regular';
    return props.theme.typography.fontWeight[weight] ?? 1;
  }};
  
  // Line height based on sacred geometry (Golden Ratio 1.618)
  line-height: ${props => {
    // If it's a heading or small text, use tighter line height
    if (props.size === 'lg' || props.size === 'xl' || props.size === 'xs') {
      return props.theme.typography.lineHeight.tight;
    }
    
    // For body text, use the base line height (Golden Ratio)
    return props.theme.typography.lineHeight.base;
  }};
  
  // Italic style if enabled
  font-style: ${props => props.italic ? 'italic' : 'normal'};
  
  // Truncation styles if enabled
  ${props => props.truncate && `
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
  `}
  
  // Multi-line truncation if noOfLines is specified
  ${props => props.noOfLines && !props.truncate && `
    display: -webkit-box;
    -webkit-line-clamp: ${props.noOfLines};
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  `}
`;

// Map variant to size and weight
const resolveVariantProps = (variant?: string): { size?: string; weight?: string; italic?: boolean; } => {
  if (!variant) return {};
  
  switch (variant) {
    case 'body1':
      return { size: 'base' };
    case 'body2':
      return { size: 'sm' };
    case 'subtitle1':
      return { size: 'md', weight: 'medium' };
    case 'subtitle2':
      return { size: 'base', weight: 'medium' };
    case 'caption':
      return { size: 'xs' };
    case 'overline':
      return { size: 'xs', weight: 'medium' };
    case 'button':
      return { size: 'sm', weight: 'medium' };
    case 'quote':
      return { italic: true, weight: 'medium' };
    default:
      return {};
  }
};

/**
 * Text Component with ref forwarding
 * 
 * Creates text elements with harmonious proportions based on sacred geometry
 */
export const Text = React.forwardRef<HTMLElement, TextProps>(
  (props, ref) => {
    const { 
      as = 'span',
      size = 'base',
      variant,
      truncate = false,
      noOfLines,
      italic = false,
      weight = 'regular',
      color = 'text.primary',
      marginBottom,
      children,
      ...rest 
    } = props;
    
    // Apply variant-based styling if a variant is provided
    const variantProps = resolveVariantProps(variant);
    
    // Ensure size and weight are properly typed
    const resolvedSize = (variantProps.size || size) as 'xs' | 'sm' | 'base' | 'md' | 'lg' | 'xl';
    const resolvedWeight = (variantProps.weight || weight) as 'light' | 'regular' | 'medium' | 'semiBold' | 'bold' | 'black';
    
    return (
      <StyledText
        as={as}
        size={resolvedSize}
        truncate={truncate}
        noOfLines={noOfLines}
        italic={variantProps.italic || italic}
        weight={resolvedWeight}
        color={color}
        marginBottom={marginBottom}
        ref={ref as React.Ref<HTMLDivElement>}
        {...rest}
      >
        {children}
      </StyledText>
    );
  }
);

Text.displayName = 'Text';

export default Text; 





