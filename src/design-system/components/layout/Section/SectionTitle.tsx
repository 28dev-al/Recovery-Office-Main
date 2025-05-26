import * as React from 'react';
import styled from 'styled-components';
import { PHI, PHI_INVERSE } from '../../../../constants/sacred-geometry';
import { lightTheme as theme } from '../../../theme';
import Typography from '../../typography/Typography';
import Box from '../Box';
import { BoxProps } from '../../../types/styled.types';

export interface SectionTitleProps extends BoxProps {
  /** Main title text */
  title: string;
  
  /** Optional subtitle text */
  subtitle?: string;
  
  /** Alignment for the title */
  align?: 'left' | 'center' | 'right';
  
  /** Size variant that influences title size */
  size?: 'small' | 'medium' | 'large' | 'hero';
  
  /** Optional decorator element to display before title */
  decoratorBefore?: React.ReactNode;
  
  /** Optional decorator element to display after title */
  decoratorAfter?: React.ReactNode;
}

/**
 * Calculate title size based on section size using PHI relationships
 */
const getTitleSize = (size: SectionTitleProps['size']) => {
  switch (size) {
    case 'small':
      return 'h3';
    case 'large':
      return 'h1';
    case 'hero':
      return 'display1';
    case 'medium':
    default:
      return 'h2';
  }
};

/**
 * Calculate subtitle size based on section size using PHI relationships
 */
const getSubtitleSize = (size: SectionTitleProps['size']) => {
  switch (size) {
    case 'small':
      return 'body1';
    case 'large':
      return 'h4';
    case 'hero':
      return 'h3';
    case 'medium':
    default:
      return 'h5';
  }
};

const TitleContainer = styled(Box)<{
  $align: 'left' | 'center' | 'right';
}>`
  display: flex;
  flex-direction: column;
  align-items: ${props => {
    if (props.$align === 'center') return 'center';
    if (props.$align === 'right') return 'flex-end';
    return 'flex-start';
  }};
  text-align: ${props => props.$align};
  width: 100%;
  
  /* Apply PHI relationships to margin between title and subtitle */
  > *:first-child + * {
    margin-top: ${theme.spacing.md * PHI_INVERSE}px; /* Golden ratio proportion */
  }
`;

const DecoratorContainer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${theme.spacing.md}px;
`;

/**
 * SectionTitle component that follows sacred geometry principles
 * 
 * This component provides a consistent title structure with proper spacing
 * based on golden ratio and Fibonacci sequence values.
 */
const SectionTitle = React.forwardRef<HTMLDivElement, SectionTitleProps>(
  ({
    title,
    subtitle,
    align = 'left',
    size = 'medium',
    decoratorBefore,
    decoratorAfter,
    ...rest
  }, ref) => {
    const titleVariant = getTitleSize(size);
    const subtitleVariant = getSubtitleSize(size);
    
    return (
      <TitleContainer
        $align={align}
        ref={ref}
        {...rest}
      >
        {decoratorBefore && (
          <DecoratorContainer>
            {decoratorBefore}
          </DecoratorContainer>
        )}
        
        <Typography variant={titleVariant} color="inherit">
          {title}
        </Typography>
        
        {subtitle && (
          <Typography 
            variant={subtitleVariant} 
            color="textSecondary"
            style={{ 
              maxWidth: `${100 * PHI_INVERSE}%`, // Apply golden ratio to max width
              opacity: 0.9 // Subtle opacity difference for visual hierarchy
            }}
          >
            {subtitle}
          </Typography>
        )}
        
        {decoratorAfter && (
          <DecoratorContainer style={{ marginTop: theme.spacing.md }}>
            {decoratorAfter}
          </DecoratorContainer>
        )}
      </TitleContainer>
    );
  }
);

SectionTitle.displayName = 'SectionTitle';

export default SectionTitle; 







