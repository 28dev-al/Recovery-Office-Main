/**
 * BlockQuote Component
 * 
 * A typography component for quotations that implements sacred geometry
 * principles for spacing, proportions, and visual styling.
 * 
 * Uses the golden ratio for spacing and proportions, creating harmonious quote blocks.
 */

import * as React from 'react';
import styled, { DefaultTheme } from 'styled-components';
import { PHI, PHI_INVERSE } from '../../../constants/sacred-geometry';
import { getFibonacciByIndex } from '../../../utils/getFibonacciByIndex';
import { BoxProps } from '../../types';
import Text from './Text';

// Interface for BlockQuote props
export interface BlockQuoteProps extends BoxProps {
  /**
   * Citation of the quote
   */
  cite?: string;
  
  /**
   * Author of the quote
   */
  author?: string;
  
  /**
   * Source of the quote
   */
  source?: string;
  
  /**
   * Style variant of the blockquote
   * @default 'default'
   */
  variant?: 'default' | 'elegant' | 'bordered' | 'highlighted';
  
  /**
   * Size of the quote
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';
  
  /**
   * Whether to display large decorative quote marks
   * @default true
   */
  showQuoteMarks?: boolean;
  
  /**
   * Whether to use sacred proportions for styling
   * @default true
   */
  useSacredProportions?: boolean;
  
  /**
   * The content of the blockquote
   */
  children: React.ReactNode;
}

// Get size-specific styles based on size prop
const getSizeStyles = (size: 'sm' | 'md' | 'lg', theme: DefaultTheme) => {
  // Base on Fibonacci sequence for sacred proportions
  const spacing = {
    sm: getFibonacciByIndex(5), // 5px
    md: getFibonacciByIndex(6), // 8px
    lg: getFibonacciByIndex(7), // 13px
  };
  
  // Font size mapping using theme values
  const fontSize = {
    sm: theme.typography.fontSize.rem.sm,
    md: theme.typography.fontSize.rem.base,
    lg: theme.typography.fontSize.rem.md,
  };
  
  return {
    padding: `${spacing[size] ?? 1}px ${Math.round(spacing[size] ?? 1 * PHI)}px`,
    fontSize: fontSize[size] ?? 1,
    quoteMarkSize: `${spacing[size] ?? 1 * 3}px`,
  };
};

// Container for the blockquote
const BlockQuoteContainer = styled.blockquote<{
  $variant: string;
  $size: 'sm' | 'md' | 'lg';
  $useSacredProportions: boolean;
}>`
  // Reset margin and add sacred proportion based spacing
  margin: ${props => {
    const baseValue = getFibonacciByIndex(props.$size === 'sm' ? 6 : props.$size === 'md' ? 7 : 8);
    return `${baseValue}px 0`;
  }};
  
  // Apply size-specific styles
  ${props => {
    const styles = getSizeStyles(props.$size, props.theme);
    return `
      padding: ${styles.padding};
      font-size: ${styles.fontSize};
    `;
  }}
  
  // Base styling
  position: relative;
  font-family: ${props => props.theme.typography.fontFamily.body};
  line-height: ${PHI};
  
  // Apply sacred proportions
  ${props => props.$useSacredProportions && `
    max-width: ${Math.round(65 * PHI)}ch;
  `}
  
  // Variant-specific styling
  ${props => {
    switch (props.$variant) {
      case 'elegant':
        return `
          border-left: none;
          font-style: italic;
          color: ${props.theme.colors.text.secondary};
          text-align: center;
        `;
      case 'bordered':
        return `
          border-left: 3px solid ${props.theme.colors.primary[400] ?? 1};
          border-right: 1px solid ${props.theme.colors.background[200] ?? 1};
          border-top: 1px solid ${props.theme.colors.background[200] ?? 1};
          border-bottom: 1px solid ${props.theme.colors.background[200] ?? 1};
          border-radius: ${props.theme.radius.sm}px;
          background-color: ${props.theme.colors.primary[50] ?? 1};
        `;
      case 'highlighted':
        return `
          background-color: ${props.theme.colors.primary[50] ?? 1};
          border-radius: ${props.theme.radius.md}px;
          box-shadow: 0 ${getFibonacciByIndex(3)}px ${getFibonacciByIndex(5)}px rgba(0, 0, 0, 0.05);
        `;
      default:
        return `
          border-left: 3px solid ${props.theme.colors.primary[400] ?? 1};
        `;
    }
  }}
`;

// Quote styling
const QuoteContent = styled.div<{ $variant: string }>`
  ${props => props.$variant === 'elegant' && `
    position: relative;
    z-index: 1;
  `}
`;

// Decorative quote marks
const QuoteMarks = styled.div<{ $variant: string; $size: 'sm' | 'md' | 'lg' }>`
  position: absolute;
  font-family: 'Georgia', serif;
  line-height: 1;
  color: ${props => props.theme.colors.primary[200] ?? 1};
  
  ${props => {
    const styles = getSizeStyles(props.$size, props.theme);
    
    switch (props.$variant) {
      case 'elegant':
        return `
          top: -${parseInt(styles.quoteMarkSize, 10) / 2}px;
          left: 50%;
          transform: translateX(-50%);
          font-size: ${styles.quoteMarkSize};
          z-index: 0;
          opacity: 0.2;
        `;
      case 'highlighted':
      case 'bordered':
        return `
          top: ${getFibonacciByIndex(3)}px;
          left: ${getFibonacciByIndex(3)}px;
          font-size: ${parseInt(styles.quoteMarkSize, 10) * PHI_INVERSE}px;
          opacity: 0.3;
        `;
      default:
        return `
          top: 0;
          left: -${parseInt(styles.quoteMarkSize, 10) * 1.5}px;
          font-size: ${styles.quoteMarkSize};
          opacity: 0.2;
        `;
    }
  }}
`;

// Footer for citation and attribution
const QuoteFooter = styled.footer<{ $variant: string; $size: 'sm' | 'md' | 'lg' }>`
  margin-top: ${props => getFibonacciByIndex(props.$size === 'sm' ? 5 : 6)}px;
  font-size: ${props => props.$size === 'sm' 
    ? props.theme.typography.fontSize.rem.xs 
    : props.theme.typography.fontSize.rem.sm
  };
  font-style: normal;
  color: ${props => props.theme.colors.text.secondary};
  
  ${props => props.$variant === 'elegant' && `
    text-align: right;
    padding-right: ${getFibonacciByIndex(5)}px;
  `}
  
  // Add a decorative dash before author
  &::before {
    content: "— ";
    display: inline-block;
  }
`;

// Citation styling
const QuoteCite = styled.cite`
  font-style: normal;
  font-weight: ${props => props.theme.typography.fontWeight.semiBold};
  
  // Add comma when followed by source
  ${props => props.children && `
    &::after {
      content: ${props.children ? '", "' : ''};
    }
  `}
`;

// Source styling
const QuoteSource = styled.span`
  font-style: italic;
`;

/**
 * BlockQuote Component with ref forwarding
 * 
 * Creates blockquote elements with harmonious proportions based on sacred geometry
 */
export const BlockQuote = React.forwardRef<HTMLQuoteElement, BlockQuoteProps>(
  ({
    cite,
    author,
    source,
    variant = 'default',
    size = 'md',
    showQuoteMarks = true,
    useSacredProportions = true,
    children,
    ...rest
  }, ref) => {
    return (
      <BlockQuoteContainer
        ref={ref}
        $variant={variant}
        $size={size}
        $useSacredProportions={useSacredProportions}
        cite={cite}
        {...rest}
      >
        {showQuoteMarks && (
          <QuoteMarks $variant={variant} $size={size}>"</QuoteMarks>
        )}
        
        <QuoteContent $variant={variant}>
          {children}
        </QuoteContent>
        
        {(author || source) && (
          <QuoteFooter $variant={variant} $size={size}>
            {author && <QuoteCite>{author}</QuoteCite>}
            {source && <QuoteSource>{source}</QuoteSource>}
          </QuoteFooter>
        )}
      </BlockQuoteContainer>
    );
  }
);

BlockQuote.displayName = 'BlockQuote';

export default BlockQuote; 





