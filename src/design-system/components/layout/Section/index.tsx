import * as React from 'react';
import styled from 'styled-components';
import { PHI, PHI_INVERSE } from '../../../../constants/sacred-geometry';
import { theme } from '../../../theme';
import SectionTitle from './SectionTitle';
import SectionContent from './SectionContent';

export interface SectionProps {
  /** Main content to render within the section */
  children: React.ReactNode;
  
  /** Optional title for the section */
  title?: string;
  
  /** Optional subtitle for the section */
  subtitle?: string;
  
  /** Background color or variant */
  background?: 'primary' | 'secondary' | 'tertiary' | 'light' | 'dark' | 'transparent';
  
  /** Whether to add top/bottom border */
  bordered?: boolean | 'top' | 'bottom';
  
  /** Section size variant */
  size?: 'small' | 'medium' | 'large' | 'hero';
  
  /** Vertical padding - uses Fibonacci sequence values */
  padding?: 'small' | 'medium' | 'large' | 'none';
  
  /** Alignment for the section content */
  align?: 'left' | 'center' | 'right';
  
  /** Max width for the section container */
  maxWidth?: string;
  
  /** ID for the section (for navigation) */
  id?: string;
  
  /** Additional styles to apply */
  style?: React.CSSProperties;
  
  /** Optional className for the section */
  className?: string;
  
  /** Optional decorator element to display before title */
  decoratorBefore?: React.ReactNode;
  
  /** Optional decorator element to display after title */
  decoratorAfter?: React.ReactNode;
}

/**
 * Get padding values based on size and padding prop using Fibonacci sequence
 */
const getPaddingValue = (padding: 'small' | 'medium' | 'large' | 'none') => {
  switch (padding) {
    case 'small':
      return `${theme.spacing(5)} 0`; // 13px (Fibonacci: 13)
    case 'large':
      return `${theme.spacing(8)} 0`; // 34px (Fibonacci: 34)
    case 'none':
      return '0';
    case 'medium':
    default:
      return `${theme.spacing(5)} 0`; // 21px (Fibonacci: 21)
  }
};

/**
 * Get background styles based on background prop
 */
const getBackgroundStyles = (background: SectionProps['background']) => {
  switch (background) {
    case 'primary':
      return `
        background-color: ${theme.colors.primary};
        color: ${theme.colors.white};
      `;
    case 'secondary':
      return `
        background-color: ${theme.colors.secondary};
        color: ${theme.colors.white};
      `;
    case 'tertiary':
      return `
        background-color: ${theme.colors.tertiary};
        color: ${theme.colors.white};
      `;
    case 'light':
      return `
        background-color: ${theme.colors.background.light};
        color: ${theme.colors.text.primary};
      `;
    case 'dark':
      return `
        background-color: ${theme.colors.background.dark};
        color: ${theme.colors.white};
      `;
    case 'transparent':
    default:
      return `
        background-color: transparent;
        color: ${theme.colors.text.primary};
      `;
  }
};

/**
 * Get border styles based on bordered prop
 */
const getBorderStyles = (bordered: SectionProps['bordered']) => {
  if (!bordered) return '';
  
  const borderStyle = `1px solid ${theme.colors.border}`;
  
  if (bordered === 'top') {
    return `border-top: ${borderStyle};`;
  } else if (bordered === 'bottom') {
    return `border-bottom: ${borderStyle};`;
  } else {
    return `
      border-top: ${borderStyle};
      border-bottom: ${borderStyle};
    `;
  }
};

/**
 * Get max width based on size prop with golden ratio relationships
 */
const getMaxWidth = (size: SectionProps['size'], customMaxWidth?: string) => {
  if (customMaxWidth) return customMaxWidth;
  
  switch (size) {
    case 'small':
      return '800px'; // Base size
    case 'large':
      return '1440px'; // Base size * PHI^2
    case 'hero':
      return '100%'; // Full width
    case 'medium':
    default:
      return '1200px'; // Base size * PHI
  }
};

const SectionContainer = styled.section<{
  background: SectionProps['background'];
  bordered: SectionProps['bordered'];
  padding: SectionProps['padding'];
  size: SectionProps['size'];
  maxWidth?: string;
  align: SectionProps['align'];
}>`
  position: relative;
  width: 100%;
  ${props => getBackgroundStyles(props.background)}
  ${props => getBorderStyles(props.bordered)}
  padding: ${props => getPaddingValue(props.padding)};
  text-align: ${props => props.align};
  
  /* Container to maintain proper max-width */
  > div {
    max-width: ${props => getMaxWidth(props.size, props.maxWidth)};
    margin: 0 auto;
    padding: 0 ${theme.spacing(5)}; /* Maintain consistent horizontal padding */
    
    /* Apply golden ratio to spacing between title and content */
    > *:first-child + * {
      margin-top: ${props => props.title ? `${theme.spacing(5) * PHI_INVERSE}px` : 0};
    }
  }
`;

/**
 * Section component that follows sacred geometry principles
 * 
 * This component provides a consistent layout structure with proper spacing
 * based on golden ratio and Fibonacci sequence values.
 */
const Section: React.FC<SectionProps> = ({
  children,
  title,
  subtitle,
  background = 'transparent',
  bordered = false,
  size = 'medium',
  padding = 'medium',
  align = 'left',
  maxWidth,
  id,
  style,
  className,
  decoratorBefore,
  decoratorAfter,
}) => {
  return (
    <SectionContainer
      id={id}
      background={background}
      bordered={bordered}
      padding={padding}
      size={size}
      maxWidth={maxWidth}
      align={align}
      style={style}
      className={className}
    >
      <div>
        {title && (
          <SectionTitle
            title={title}
            subtitle={subtitle}
            align={align}
            size={size}
            decoratorBefore={decoratorBefore}
            decoratorAfter={decoratorAfter}
          />
        )}
        {children}
      </div>
    </SectionContainer>
  );
};

// Export sub-components along with main component
export { SectionTitle, SectionContent };
export default Section; 








