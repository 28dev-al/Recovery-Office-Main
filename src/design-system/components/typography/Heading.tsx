/**
 * Heading Component
 * 
 * A typography component for headings (h1-h6) that implements spacing
 * principles for font sizing, spacing, and visual hierarchy.
 */

import * as React from 'react';
import styled, { DefaultTheme } from 'styled-components';
import { typography } from '../../tokens';
import { BoxProps, AsProps } from '../../types';
import Box from '../layout/Box';
import { PHI } from '../../../constants/sacred-geometry';

// Heading level type (h1-h6)
export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

// Create a type that omits 'display' from BoxProps to avoid collision with our boolean display prop
type BoxPropsWithoutDisplay = Omit<BoxProps, 'display'>;

// Basic typography presets for headings if not available in tokens
const headingPresets = {
  h1: {
    fontSize: '2.5rem',
    fontWeight: 700,
    lineHeight: String(PHI),
  },
  h2: {
    fontSize: '2rem',
    fontWeight: 700,
    lineHeight: String(PHI),
  },
  h3: {
    fontSize: '1.75rem',
    fontWeight: 600,
    lineHeight: String(PHI),
  },
  h4: {
    fontSize: '1.5rem',
    fontWeight: 600,
    lineHeight: String(PHI),
  },
  h5: {
    fontSize: '1.25rem',
    fontWeight: 600,
    lineHeight: String(PHI),
  },
  h6: {
    fontSize: '1rem',
    fontWeight: 600,
    lineHeight: String(PHI),
  }
};

// Interface for Heading props
export interface HeadingProps extends BoxPropsWithoutDisplay {
  /**
   * The heading level (h1-h6)
   * @default 'h2'
   */
  as?: HeadingLevel;
  
  /**
   * Typography variant, for compatibility with Typography component
   */
  variant?: HeadingLevel | 'display1' | 'display2' | string;
  
  /**
   * Whether to truncate text with ellipsis when it overflows
   * @default false
   */
  truncate?: boolean;
  
  /**
   * Whether to use the display font style (more pronounced serif for key headings)
   * @default false
   */
  display?: boolean;
  
  /**
   * Whether to use a decorative underline based on Golden Ratio
   * @default false
   */
  underlined?: boolean;
  
  /**
   * The color of the heading (from the theme)
   */
  color?: string;
  
  /**
   * CSS display property (to restore this from BoxProps)
   */
  cssDisplay?: string;
  
  /**
   * Margin bottom, provided for compatibility with direct style props
   */
  marginBottom?: string | number;
  
  /**
   * The content of the heading
   */
  children: React.ReactNode;
}

/**
 * Heading Component
 * 
 * Creates headings with harmonious proportions
 */
export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  (props, ref) => {
    const { 
      as = 'h2',
      variant,
      truncate = false,
      display = false,
      underlined = false,
      color = 'text.primary',
      cssDisplay,
      marginBottom,
      children,
      ...rest 
    } = props;
    
    // Determine the actual heading level based on variant or as prop
    const headingLevel: HeadingLevel = (variant && variant.match(/^h[1-6]$/)) 
      ? variant as HeadingLevel 
      : as;
      
    // Determine if we should use display style
    const useDisplayStyle = display || variant === 'display1' || variant === 'display2';
    
    // Get the typography preset for the heading level
    const presetStyles = headingPresets[headingLevel] ?? {};
    
    // Create a CSS string with all styles
    let cssString = `
      font-family: ${useDisplayStyle ? "'Playfair Display', serif" : 'var(--font-family-heading)'};
      margin: 0;
      display: ${cssDisplay || 'block'};
      ${marginBottom ? `margin-bottom: ${marginBottom};` : ''}
      
      ${truncate ? `
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      ` : ''}
      
      ${underlined ? `
        position: relative;
        
        &::after {
          content: '';
          position: absolute;
          bottom: -0.5rem;
          left: 0;
          width: 61.8%;
          height: 2px;
          background-color: currentColor;
          opacity: 0.7;
        }
      ` : ''}
    `;
    
    // Set the correct HTML element based on the 'as' prop
    const actualElement = headingLevel;
    
    // Create a typed Styled Box component
    const StyledBox = styled(Box).attrs<{ as: HeadingLevel }>(() => ({
      as: actualElement,
    }))`
      ${cssString}
    `;
    
    // Return the StyledBox with props applied
    return (
      <StyledBox
        color={color}
        ref={ref}
        {...rest}
        {...presetStyles}
      >
        {children}
      </StyledBox>
    );
  }
);

Heading.displayName = 'Heading';

export default Heading; 





