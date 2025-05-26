/**
 * Span Component
 * 
 * A typography component for inline text styling that implements sacred geometry
 * principles. It is designed to be used within other text components to
 * style specific parts of the text differently.
 */

import * as React from 'react';
import styled from 'styled-components';
import { BoxProps } from '../../types';
import Text from './Text';

// Interface for Span props
interface SpanProps extends BoxProps {
  /**
   * Preset text size
   */
  size?: 'xs' | 'sm' | 'base' | 'md' | 'lg' | 'xl';
  
  /**
   * Whether text should be italicized
   * @default false
   */
  italic?: boolean;
  
  /**
   * Font weight
   */
  weight?: 'light' | 'regular' | 'medium' | 'semiBold' | 'bold' | 'black';
  
  /**
   * The font variation to apply
   * @default 'normal'
   */
  variant?: 'normal' | 'smallcaps' | 'monospace' | 'serif' | 'accent';
  
  /**
   * Whether to underline the text
   * @default false
   */
  underline?: boolean;
  
  /**
   * Whether to strikethrough the text
   * @default false
   */
  strikethrough?: boolean;
  
  /**
   * Whether to highlight the text with a background color
   * @default false
   */
  highlight?: boolean;
  
  /**
   * The highlight color to use (if highlight is true)
   * @default '#FFF9C4' (light yellow)
   */
  highlightColor?: string;
  
  /**
   * The content of the span
   */
  children: React.ReactNode;
}

// Create the styled span component with all style variants
const StyledSpan = styled(Text)<SpanProps>`
  // Apply variant-specific styles
  ${props => {
    switch (props.variant) {
      case 'smallcaps':
        return `
          font-variant: small-caps;
          letter-spacing: 0.05em;
        `;
      case 'monospace':
        return `
          font-family: ${props.theme.typography.fontFamily.mono};
          font-size: 0.95em;
        `;
      case 'serif':
        return `
          font-family: ${props.theme.typography.fontFamily.heading};
        `;
      case 'accent':
        return `
          color: ${props.theme.colors.accent.gold};
          font-weight: ${props.theme.typography.fontWeight.semiBold};
        `;
      default:
        return '';
    }
  }}
  
  // Text decoration styles
  ${props => props.underline && `
    text-decoration: underline;
    text-decoration-thickness: 0.1em;
    text-underline-offset: 0.1em;
  `}
  
  ${props => props.strikethrough && `
    text-decoration: line-through;
    text-decoration-thickness: 0.1em;
  `}
  
  // Highlight styles
  ${props => props.highlight && `
    background-color: ${props.highlightColor || '#FFF9C4'};
    padding: 0 0.2em;
    border-radius: 0.1em;
  `}
`;

/**
 * Span Component with ref forwarding
 * 
 * Creates inline text styling elements
 */
export const Span = React.forwardRef<HTMLSpanElement, SpanProps>(
  ({ 
    size,
    italic = false,
    weight,
    variant = 'normal',
    underline = false,
    strikethrough = false,
    highlight = false,
    highlightColor,
    children,
    ...rest 
  }, ref) => {
    return (
      <StyledSpan
        as="span"
        size={size}
        italic={italic}
        weight={weight}
        variant={variant}
        underline={underline}
        strikethrough={strikethrough}
        highlight={highlight}
        highlightColor={highlightColor}
        ref={ref}
        {...rest}
      >
        {children}
      </StyledSpan>
    );
  }
);

Span.displayName = 'Span';

export default Span; 





