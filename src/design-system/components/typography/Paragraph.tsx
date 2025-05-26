/**
 * Paragraph Component
 * 
 * A typography component optimized for long-form text that implements sacred geometry
 * principles for line height, paragraph spacing, and optimal reading width.
 * 
 * Reading width follows the golden ratio principles for maximum readability and comfort.
 */

import * as React from 'react';
import styled, { DefaultTheme } from 'styled-components';
import { PHI } from '../../../constants/sacred-geometry';
import { typography, spacing } from '../../tokens';
import { AsProps, BoxProps } from '../../types';
import Text from './Text';

// Interface for Paragraph props
interface ParagraphProps extends BoxProps {
  /**
   * Preset text size
   * @default 'base'
   */
  size?: 'sm' | 'base' | 'md' | 'lg';
  
  /**
   * Typography variant, for compatibility with Typography component
   */
  variant?: 'body1' | 'body2' | string;
  
  /**
   * Whether to use optimal reading width based on the Golden Ratio
   * @default true
   */
  useOptimalWidth?: boolean;
  
  /**
   * Whether to hyphenate text for better line breaks
   * @default false
   */
  hyphenate?: boolean;
  
  /**
   * Whether to use a drop cap for the first letter
   * @default false
   */
  dropCap?: boolean;
  
  /**
   * Whether to add small indentation to the first line
   * @default false
   */
  indent?: boolean;
  
  /**
   * Margin bottom, provided for compatibility with direct style props
   */
  marginBottom?: string | number;
  
  /**
   * The content of the paragraph
   */
  children: React.ReactNode;
}

// Create the styled paragraph component with all style variants
const StyledParagraph = styled(Text)<ParagraphProps>`
  // Paragraph specific styles
  display: block;
  margin-bottom: ${props => props.marginBottom || props.theme.spacing.md}px;
  
  // Apply the golden-ratio-based optimal reading width
  ${props => props.useOptimalWidth && `
    max-width: ${65 * PHI}ch; // Research suggests 65-75ch is optimal (using PHI for sacred harmony)
  `}
  
  // Hyphenation for better text flow
  ${props => props.hyphenate && `
    hyphens: auto;
    hyphenate-limit-chars: 6 3 2;
    hyphenate-limit-lines: 2;
  `}
  
  // Drop cap styling for first letter
  ${props => props.dropCap && `
    &::first-letter {
      initial-letter: ${Math.round(PHI * 1.5)};
      margin-right: ${props.theme.spacing.xs}px;
      font-family: ${props.theme.typography.fontFamily.heading};
      font-weight: ${props.theme.typography.fontWeight.bold};
      color: ${props.theme.colors.primary[800] ?? 1};
      float: left;
      line-height: 1;
    }
  `}
  
  // First line indentation for visual rhythm
  ${props => props.indent && `
    text-indent: ${props.theme.spacing.md}px;
  `}
`;

/**
 * Paragraph Component with ref forwarding
 * 
 * Creates paragraph elements with optimal reading properties based on sacred geometry
 */
export const Paragraph = React.forwardRef<HTMLParagraphElement, AsProps<HTMLParagraphElement> & ParagraphProps>(
  ({ 
    size = 'base',
    variant,
    useOptimalWidth = true,
    hyphenate = false,
    dropCap = false,
    indent = false,
    marginBottom,
    children,
    ...rest 
  }, ref) => {
    // If variant is provided, map it to a size
    const resolvedSize = variant ? (variant === 'body1' ? 'base' : 'sm') : size;

    return (
      <StyledParagraph
        as="p"
        size={resolvedSize}
        useOptimalWidth={useOptimalWidth}
        hyphenate={hyphenate}
        dropCap={dropCap}
        indent={indent}
        marginBottom={marginBottom}
        ref={ref}
        {...rest}
      >
        {children}
      </StyledParagraph>
    );
  }
);

Paragraph.displayName = 'Paragraph';

export default Paragraph; 






