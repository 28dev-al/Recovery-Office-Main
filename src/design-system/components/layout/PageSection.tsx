import * as React from 'react';
import styled, { css } from 'styled-components';
import { Section, SectionProps } from './Section';
import { Container } from './Container';
import { Box } from './Box';
import { BotanicalElement } from '../botanical/BotanicalElement';
import { PHI, PHI_INVERSE, getFibonacciByIndex } from '../../../constants/sacred-geometry';

/**
 * PageSection variant types defining different section sizing options
 */
export type PageSectionSize = 'small' | 'medium' | 'large' | 'hero' | 'auto';

/**
 * PageSection component props extending SectionProps
 */
export interface PageSectionProps extends Omit<SectionProps, 'fullWidth'> {
  /** Content to render inside the section */
  children: React.ReactNode;
  
  /** Size preset determining vertical spacing */
  size?: PageSectionSize;
  
  /** Whether to constrain content width with container */
  useContainer?: boolean;
  
  /** Custom maximum width for the container */
  containerMaxWidth?: string | number;
  
  /** Optional background element (e.g., illustrated shapes) */
  backgroundElement?: React.ReactNode;
  
  /** Whether to show botanical elements */
  showBotanical?: boolean;
  
  /** Type of botanical element to display */
  botanicalType?: 'oliveLeaf' | 'smallFlourish' | 'flowerOfLife' | 'vesicaPiscis' | 'fibonacciSpiral';
  
  /** Position of the botanical element */
  botanicalPosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center-left' | 'center-right';
  
  /** Size of the botanical element */
  botanicalSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  
  /** Opacity of the botanical element */
  botanicalOpacity?: number;
  
  /** Whether section should have horizontal padding */
  horizontalPadding?: boolean;
  
  /** Unique ID for the section used for navigation/anchor links */
  id?: string;
  
  /** Additional class name */
  className?: string;
}

/**
 * PageSection Component
 * 
 * A consistent section component for financial website pages,
 * providing standardized spacing and container options.
 */
const PageSection: React.FC<PageSectionProps> = ({
  children,
  variant = 'light',
  size = 'medium',
  useContainer = true,
  containerMaxWidth,
  backgroundElement,
  showBotanical = false,
  botanicalType = 'smallFlourish',
  botanicalPosition = 'bottom-right',
  botanicalSize = 'md',
  botanicalOpacity = 0.07,
  horizontalPadding = true,
  backgroundColor,
  id,
  className,
  ...rest
}) => {
  // Determine section padding based on size
  const getSectionPadding = () => {
    switch (size) {
      case 'small':
        return {
          top: `${getFibonacciByIndex(9)}px`,
          bottom: `${getFibonacciByIndex(9)}px`
        };
      case 'large':
        return {
          top: `${getFibonacciByIndex(11)}px`,
          bottom: `${getFibonacciByIndex(11)}px`
        };
      case 'hero':
        return {
          top: `${getFibonacciByIndex(12)}px`,
          bottom: `${getFibonacciByIndex(12)}px`
        };
      case 'auto':
        return {
          top: '0',
          bottom: '0'
        };
      case 'medium':
      default:
        return {
          top: `${getFibonacciByIndex(10)}px`,
          bottom: `${getFibonacciByIndex(10)}px`
        };
    }
  };
  
  // Calculate padding values
  const padding = getSectionPadding();
  
  // Create the botanical element if enabled
  const botanicalElement = showBotanical ? (
    <BotanicalElement 
      variant={botanicalType}
      size={botanicalSize}
      opacity={botanicalOpacity}
      colorScheme={variant !== 'light' && variant !== 'transparent' ? 'light' : 'primary'}
    />
  ) : null;
  
  return (
    <StyledSection
      variant={variant}
      id={id}
      className={className}
      pt={padding.top}
      pb={padding.bottom}
      backgroundColor={backgroundColor}
      hasPadding={horizontalPadding}
      botanicalPosition={showBotanical ? botanicalPosition : 'none'}
      botanicalElement={botanicalElement}
      {...rest}
    >
      {/* Background element if provided */}
      {backgroundElement && (
        <BackgroundElementWrapper>
          {backgroundElement}
        </BackgroundElementWrapper>
      )}
      
      {/* Content container */}
      {useContainer ? (
        <StyledContainer maxWidth={containerMaxWidth}>
          {children}
        </StyledContainer>
      ) : (
        children
      )}
    </StyledSection>
  );
};

// Styled components
const StyledSection = styled(Section)`
  position: relative;
  overflow: hidden;
  
  /* Responsive padding adjustments */
  @media (max-width: ${props => props.theme.breakpoints.values.md}px) {
    padding-top: calc(${props => props.pt} * 0.8);
    padding-bottom: calc(${props => props.pb} * 0.8);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.values.sm}px) {
    padding-top: calc(${props => props.pt} * 0.6);
    padding-bottom: calc(${props => props.pb} * 0.6);
  }
`;

const StyledContainer = styled(Container)<{ maxWidth?: string | number }>`
  position: relative;
  z-index: 1;
  width: 100%;
  ${props => props.maxWidth && css`
    max-width: ${typeof props.maxWidth === 'number' ? `${props.maxWidth}px` : props.maxWidth};
  `}
`;

const BackgroundElementWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
`;

export default PageSection; 