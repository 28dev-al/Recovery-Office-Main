import * as React from 'react';
import styled, { css, DefaultTheme } from 'styled-components';

import Box from '../Box';
import Container from '../Container';
import { PHI, PHI_INVERSE } from '../../../../constants/sacred-geometry';

/**
 * Botanical element positioning options for Section component
 */
export type BotanicalPosition = 
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'center-left'
  | 'center-right'
  | 'top-center'
  | 'bottom-center'
  | 'none';

/**
 * Section variant types defining different visual styles
 */
export type SectionVariant = 
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'accent'
  | 'light'
  | 'dark'
  | 'transparent';

/**
 * Section component props
 */
export interface SectionProps {
  backgroundColor?: string;
  /** Visual style variant */
  variant?: SectionVariant;
  
  /** Children elements to render inside the section */
  children: React.ReactNode;
  
  /** Optional ID for the section */
  id?: string;
  
  /** Full width section that spans the entire viewport width */
  fullWidth?: boolean;
  
  /** Minimum height of the section (expressed in vh units) */
  minHeight?: number;
  
  /** Maximum width constraint */
  maxWidth?: string | number;
  
  /** Control whether the section has padding */
  hasPadding?: boolean;
  
  /** Position of botanical element */
  botanicalPosition?: BotanicalPosition;
  
  /** Custom botanical element to render */
  botanicalElement?: React.ReactNode;
  
  /** Text alignment within the section */
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  
  /** Section background image URL */
  backgroundImage?: string;
  
  /** Additional styles to apply */
  style?: React.CSSProperties;
  
  /** Additional class name */
  className?: string;
  
  /** Padding Top */
  pt?: string | number;
  
  /** Padding Bottom */
  pb?: string | number;
}

/**
 * Get background color based on variant
 */
const getBackgroundColor = (variant: SectionVariant, theme: DefaultTheme) => {
  switch (variant) {
    case 'primary':
      return theme.colors.primary[500] ?? 1;
    case 'secondary':
      return theme.colors.secondary[500] ?? 1;
    case 'tertiary':
      return theme.colors.secondary[700] ?? 1;
    case 'accent':
      return theme.colors.accent.gold;
    case 'light':
      return theme.colors.background[100] ?? 1;
    case 'dark':
      return theme.colors.background[800] ?? 1;
    case 'transparent':
      return 'transparent';
    default:
      return theme.colors.background[100] ?? 1;
  }
};

/**
 * Get text color based on variant to ensure contrast
 */
const getTextColor = (variant: SectionVariant, theme: DefaultTheme) => {
  switch (variant) {
    case 'primary':
    case 'secondary':
    case 'tertiary':
    case 'accent':
    case 'dark':
      return theme.colors.text.light;
    case 'light':
    case 'transparent':
      return theme.colors.text.dark;
    default:
      return theme.colors.text.primary;
  }
};

/**
 * Calculate padding values using Fibonacci sequence
 * Creates pleasing, sacred geometry-based spacing
 */
const getSectionPadding = (hasPadding: boolean, theme: DefaultTheme) => {
  if (!hasPadding) return '0';
  
  // Using Fibonacci-based spacing units
  return css`
    padding: ${theme.spacing.xl}px ${theme.spacing.lg}px;
    
    @media (min-width: ${theme.breakpoints.values.sm}px) {
      padding: ${theme.spacing.xl}px ${theme.spacing.xl}px;
    }
    
    @media (min-width: ${theme.breakpoints.values.md}px) {
      padding: ${theme.spacing.xxl}px ${theme.spacing.xl}px;
    }
    
    @media (min-width: ${theme.breakpoints.values.lg}px) {
      padding: ${theme.spacing.xxxl}px ${theme.spacing.xxl}px;
    }
  `;
};

/**
 * Position the botanical element according to the specified position
 */
const getBotanicalElementPosition = (position: BotanicalPosition) => {
  switch (position) {
    case 'top-left':
      return css`
        top: 0;
        left: 0;
        transform: translate(-${PHI_INVERSE * 100}%, -${PHI_INVERSE * 100}%);
      `;
    case 'top-right':
      return css`
        top: 0;
        right: 0;
        transform: translate(${PHI_INVERSE * 100}%, -${PHI_INVERSE * 100}%);
      `;
    case 'bottom-left':
      return css`
        bottom: 0;
        left: 0;
        transform: translate(-${PHI_INVERSE * 100}%, ${PHI_INVERSE * 100}%);
      `;
    case 'bottom-right':
      return css`
        bottom: 0;
        right: 0;
        transform: translate(${PHI_INVERSE * 100}%, ${PHI_INVERSE * 100}%);
      `;
    case 'center-left':
      return css`
        top: 50%;
        left: 0;
        transform: translate(-${PHI_INVERSE * 100}%, -50%);
      `;
    case 'center-right':
      return css`
        top: 50%;
        right: 0;
        transform: translate(${PHI_INVERSE * 100}%, -50%);
      `;
    case 'top-center':
      return css`
        top: 0;
        left: 50%;
        transform: translate(-50%, -${PHI_INVERSE * 100}%);
      `;
    case 'bottom-center':
      return css`
        bottom: 0;
        left: 50%;
        transform: translate(-50%, ${PHI_INVERSE * 100}%);
      `;
    default:
      return '';
  }
};

interface StyledSectionProps {
  variant: SectionVariant;
  hasPadding: boolean;
  minHeight?: number;
  fullWidth: boolean;
  maxWidth?: string | number;
  textAlign: 'left' | 'center' | 'right' | 'justify';
  backgroundImage?: string;
  backgroundColor?: string;
  pt?: string | number;
  pb?: string | number;
}

const StyledSection = styled.section<StyledSectionProps>`
  position: relative;
  width: 100%;
  overflow: hidden;
  background-color: ${props => props.backgroundColor || getBackgroundColor(props.variant, props.theme)};
  color: ${props => getTextColor(props.variant, props.theme)};
  text-align: ${props => props.textAlign};
  min-height: ${props => props.minHeight ? `${props.minHeight}vh` : 'auto'};
  ${props => getSectionPadding(props.hasPadding, props.theme)}
  
  /* Apply custom padding if provided */
  ${props => props.pt && `padding-top: ${props.pt};`}
  ${props => props.pb && `padding-bottom: ${props.pb};`}
  
  /* Apply background image if provided */
  ${props => props.backgroundImage && css`
    background-image: url(${props.backgroundImage});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  `}
  
  /* Apply golden ratio to container max-width if not full width */
  ${props => !props.fullWidth && !props.maxWidth && css`
    .section-container {
      max-width: ${1440 * PHI_INVERSE}px;
      margin: 0 auto;
    }
  `}
  
  /* Apply custom max-width if provided */
  ${props => !props.fullWidth && props.maxWidth && css`
    .section-container {
      max-width: ${typeof props.maxWidth === 'number' ? `${props.maxWidth}px` : props.maxWidth};
      margin: 0 auto;
    }
  `}
`;

// Styled div for botanical elements
const BotanicalWrapper = styled.div<{ position: BotanicalPosition }>`
  position: absolute;
  z-index: 0;
  pointer-events: none;
  ${props => getBotanicalElementPosition(props.position)}
`;

/**
 * Section component that follows sacred geometry principles
 * 
 * Creates harmonious section layouts with proper spacing and proportions
 */
export const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({
    children,
    variant = 'light',
    id,
    fullWidth = false,
    minHeight,
    maxWidth,
    hasPadding = true,
    botanicalPosition = 'none',
    botanicalElement,
    textAlign = 'left',
    backgroundImage,
    backgroundColor,
    style,
    className,
    pt,
    pb,
  }, ref) => {
    return (
      <StyledSection
        variant={variant}
        hasPadding={hasPadding}
        minHeight={minHeight}
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        textAlign={textAlign}
        backgroundImage={backgroundImage}
        backgroundColor={backgroundColor}
        id={id}
        className={className}
        pt={pt}
        pb={pb}
        style={style}
        ref={ref}
      >
        {/* Container to apply width constraints */}
        <div className="section-container">
          {/* Main content container */}
          <div className="section-content">
            {children}
          </div>
        </div>
        
        {/* Botanical decorative element if provided */}
        {botanicalPosition !== 'none' && botanicalElement && (
          <div className={`botanical-element botanical-${botanicalPosition}`}>
            {botanicalElement}
          </div>
        )}
      </StyledSection>
    );
  }
);

Section.displayName = 'Section';

/**
 * Props for SectionContent component
 */
interface SectionContentProps {
  maxWidth?: string | number;
  spacing?: string | number;
  children: React.ReactNode;
}

/**
 * SectionContent component for adding standardized content containers
 * within Section components with golden ratio proportions
 */
export const SectionContent = styled(Container)<SectionContentProps>`
  width: 100%;
  max-width: ${props => props.maxWidth || '1200px'};
  margin-left: auto;
  margin-right: auto;
  padding: 0 ${props => props.theme.spacing.md}px;
  
  @media (min-width: ${props => props.theme.breakpoints.values.md}px) {
    padding: 0 ${props => props.theme.spacing.lg}px;
  }
  
  /* Apply golden ratio proportions to create harmony */
  & > * + * {
    margin-top: ${props => props.spacing || `${props.theme.spacing.lg}px`};
  }
  
  /* Golden ratio proportion for spacing between section titles and content */
  & > h2 + * {
    margin-top: ${21 * PHI_INVERSE}px;
  }
`; 










