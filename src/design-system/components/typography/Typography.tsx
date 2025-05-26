/**
 * Typography Component
 * 
 * A unified typography component that encapsulates all text variants
 * following sacred geometry principles. It provides a consistent API
 * for different typography needs throughout the application.
 */

import * as React from 'react';
import { BoxProps } from '../../types';
import Heading from './Heading';
import Text from './Text';
import Paragraph from './Paragraph';
import BlockQuote from './BlockQuote';

/**
 * Typography variant types
 */
export type TypographyVariant = 
  | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'  // Headings
  | 'body1' | 'body2'                         // Body text
  | 'subtitle1' | 'subtitle2'                 // Subtitles
  | 'caption' | 'overline'                    // Supporting text
  | 'button'                                  // Button text
  | 'display1' | 'display2'                   // Large display text
  | 'quote';                                  // Blockquote text

/**
 * Typography component props
 */
interface TypographyProps extends Omit<BoxProps, 'display'> {
  /**
   * The typography variant to use
   * @default 'body1'
   */
  variant?: TypographyVariant;
  
  /**
   * Whether to use a Golden Ratio harmonized font size
   * @default true
   */
  harmonized?: boolean;
  
  /**
   * Whether to truncate text with ellipsis when it overflows
   * @default false
   */
  truncate?: boolean;
  
  /**
   * Number of lines after which to truncate text with ellipsis
   * @default undefined (no limit)
   */
  noOfLines?: number | undefined;
  
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
   * Color from the theme
   */
  color?: string;
  
  /**
   * Whether to use Golden Ratio derived margin spacings
   * @default true
   */
  sacredSpacing?: boolean;
  
  /**
   * CSS display property (to replace the display prop we omitted)
   */
  cssDisplay?: string;
  
  /**
   * The content of the typography component
   */
  children: React.ReactNode;
}

/**
 * Typography Component
 * 
 * Creates harmonious typography elements based on sacred geometry principles
 */
export const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({
    variant = 'body1',
    harmonized = true,
    truncate = false,
    noOfLines,
    italic = false,
    weight,
    color,
    sacredSpacing = true,
    cssDisplay,
    children,
    ...rest
  }, ref) => {
    // Helper to get margin values based on variant and sacredSpacing option
    const getMargin = () => {
      if (!sacredSpacing) return undefined;
      
      // Apply variant-specific margins
      switch (variant) {
        case 'h1':
          return { mb: '1.618rem' };
        case 'h2':
          return { mb: '1.382rem' };
        case 'h3':
          return { mb: '1.236rem' };
        case 'h4':
        case 'h5':
        case 'h6':
          return { mb: '1rem' };
        case 'body1':
        case 'body2':
          return { mb: '1rem' };
        case 'quote':
          return { my: '1.618rem' };
        default:
          return undefined;
      }
    };
    
    const marginProps = getMargin();
    
    if (variant.startsWith('h')) {
      // Heading level (h1-h6)
      return (
        <Heading
          {...rest}
          {...marginProps}
          display={variant === 'h1' || variant === 'h2'}
          truncate={truncate}
          color={color}
          cssDisplay={cssDisplay}
          ref={ref as React.Ref<HTMLHeadingElement>}
        >
          {children}
        </Heading>
      );
    }
    
    if (variant === 'display1' || variant === 'display2') {
      // Display heading styles
      return (
        <Heading
          {...rest}
          {...marginProps}
          as={variant === 'display1' ? 'h1' : 'h2'}
          display={true}
          truncate={truncate}
          color={color}
          cssDisplay={cssDisplay}
          ref={ref as React.Ref<HTMLHeadingElement>}
        >
          {children}
        </Heading>
      );
    }
    
    if (variant === 'body1' || variant === 'body2') {
      // Body text using Paragraph component
      return (
        <Paragraph
          {...rest}
          {...marginProps}
          size={variant === 'body1' ? 'base' : 'sm'}
          useOptimalWidth={harmonized}
          color={color}
          ref={ref as React.Ref<HTMLParagraphElement>}
        >
          {children}
        </Paragraph>
      );
    }
    
    if (variant === 'quote') {
      // Quote text
      return (
        <BlockQuote
          {...rest}
          {...marginProps as any}
          variant="default"
          size="md"
          ref={ref as React.Ref<HTMLQuoteElement>}
        >
          {children}
        </BlockQuote>
      );
    }
    
    if (variant === 'subtitle1' || variant === 'subtitle2') {
      // Subtitle text
      return (
        <Text
          {...rest}
          {...marginProps}
          size={variant === 'subtitle1' ? 'md' : 'base'}
          weight={weight || 'medium'}
          color={color || 'text.secondary'}
          ref={ref}
        >
          {children}
        </Text>
      );
    }
    
    // Default Text component for other variants
    return (
      <Text
        {...rest}
        {...marginProps}
        size={
          variant === 'caption' || variant === 'overline' ? 'xs' :
          variant === 'button' ? 'sm' : 'base'
        }
        italic={italic}
        weight={weight || (variant === 'button' ? 'medium' : 'regular')}
        textTransform={variant === 'overline' ? 'uppercase' : undefined}
        letterSpacing={variant === 'overline' ? '0.1em' : undefined}
        truncate={truncate}
        noOfLines={noOfLines}
        color={color}
        ref={ref}
      >
        {children}
      </Text>
    );
  }
);

Typography.displayName = 'Typography';

export default Typography; 





