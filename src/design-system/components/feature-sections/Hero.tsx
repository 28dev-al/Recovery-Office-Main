/**
 * Hero Component
 * 
 * A full-width hero section that incorporates sacred geometry principles for
 * spacing, proportions, and visual harmony. This component serves as the primary
 * banner/header for pages and includes support for botanical elements.
 */

import * as React from 'react';
import styled from 'styled-components';
import { DefaultTheme } from 'styled-components';

import { PHI, PHI_INVERSE, getFibonacciByIndex } from '../../../constants/sacred-geometry';
import { Section } from '../layout/Section';
import { Box } from '../layout/Box';
import { Heading } from '../typography/Heading';
import { Text } from '../typography/Text';
import { Button } from '../button/Button';
import { BotanicalElement } from '../botanical';
import { BotanicalPosition } from '../botanical/botanicalUtils';
import { FadeIn, SlideIn } from '../animation';
import { HeroProps, FeatureButton } from '../../types/feature-sections.types';
import { BotanicalDecoration } from '../../types/botanical.types';

// Reexport the type for external use
export type { HeroProps, FeatureButton } from '../../types/feature-sections.types';

/**
 * Calculate content width based on split layout
 */
const getContentWidth = (split: boolean): string => {
  return split ? `${PHI_INVERSE * 100}%` : '100%';
};

const HeroContainer = styled(Section)<{
  $minHeight: string | number;
  $hasBackgroundImage: boolean;
  $backgroundImage?: string;
  $backgroundOverlay?: string;
  $backgroundPosition?: string;
  $backgroundSize?: string;
}>`
  position: relative;
  min-height: ${props => 
    typeof props.$minHeight === 'number' 
    ? `${props.$minHeight}px` 
    : props.$minHeight
  };
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  
  /* Background image styling */
  ${props => props.$hasBackgroundImage && props.$backgroundImage && `
    background-image: url(${props.$backgroundImage});
    background-position: ${props.$backgroundPosition || 'center'};
    background-size: ${props.$backgroundSize || 'cover'};
    background-repeat: no-repeat;
    
    /* Overlay */
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: ${props.$backgroundOverlay || 'rgba(0, 0, 0, 0.4)'};
      z-index: 1;
    }
  `}
  
  /* Ensure content is above overlay */
  & > * {
    position: relative;
    z-index: 2;
  }
`;

const ContentContainer = styled.div<{ 
  $align: 'left' | 'center' | 'right';
  $split: boolean;
  $reversed: boolean;
}>`
  display: flex;
  flex-direction: column;
  align-items: ${props => {
    switch (props.$align) {
      case 'left': return 'flex-start';
      case 'right': return 'flex-end';
      case 'center': return 'center';
      default: return 'flex-start';
    }
  }};
  text-align: ${props => props.$align};
  width: 100%;
  
  /* Apply golden ratio for split layout */
  ${props => props.$split && `
    display: flex;
    flex-direction: row;
    ${props.$reversed ? 'flex-direction: row-reverse;' : ''}
    
    @media (max-width: ${props.theme.breakpoints.md}px) {
      flex-direction: column;
      ${props.$reversed ? 'flex-direction: column;' : ''}
    }
  `}
`;

const PrimaryContent = styled.div<{
  $split: boolean;
  $align: 'left' | 'center' | 'right';
}>`
  width: ${props => getContentWidth(props.$split)};
  padding: ${props => getFibonacciByIndex(6)}px;
  
  @media (max-width: ${props => props.theme.breakpoints.md}px) {
    width: 100%;
    padding: ${getFibonacciByIndex(5)}px;
  }
  
  /* Apply golden ratio spacing between elements */
  & > * + * {
    margin-top: ${getFibonacciByIndex(7)}px;
  }
`;

const SecondaryContent = styled.div`
  width: ${PHI_INVERSE * 100}%;
  padding: ${getFibonacciByIndex(6)}px;
  
  @media (max-width: ${props => props.theme.breakpoints.md}px) {
    width: 100%;
    padding: ${getFibonacciByIndex(5)}px;
    margin-top: ${getFibonacciByIndex(7)}px;
  }
`;

const HeadingWrapper = styled.div`
  margin-bottom: ${getFibonacciByIndex(6)}px;
`;

const SubheadingWrapper = styled.div`
  margin-bottom: ${getFibonacciByIndex(7)}px;
  opacity: 0.9;
`;

const ButtonsContainer = styled.div<{ $align: 'left' | 'center' | 'right' }>`
  display: flex;
  flex-direction: row;
  justify-content: ${props => {
    switch (props.$align) {
      case 'left': return 'flex-start';
      case 'right': return 'flex-end';
      case 'center': return 'center';
      default: return 'flex-start';
    }
  }};
  flex-wrap: wrap;
  gap: ${getFibonacciByIndex(4)}px;
`;

const BotanicalContainer = styled.div<{
  $position: BotanicalPosition;
}>`
  position: absolute;
  z-index: 1;
  
  ${props => {
    switch (props.$position) {
      case 'topLeft':
        return `
          top: 0;
          left: 0;
        `;
      case 'topRight':
        return `
          top: 0;
          right: 0;
        `;
      case 'bottomLeft':
        return `
          bottom: 0;
          left: 0;
        `;
      case 'bottomRight':
        return `
          bottom: 0;
          right: 0;
        `;
      case 'leftCenter':
        return `
          top: 50%;
          left: 0;
          transform: translateY(-50%);
        `;
      case 'rightCenter':
        return `
          top: 50%;
          right: 0;
          transform: translateY(-50%);
        `;
      case 'topCenter':
        return `
          top: 0;
          left: 50%;
          transform: translateX(-50%);
        `;
      case 'bottomCenter':
        return `
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
        `;
      case 'center':
        return `
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        `;
      default:
        return '';
    }
  }}
`;

/**
 * Hero component for creating visually striking page headers
 * using sacred geometry principles for proportions and spacing.
 */
const Hero: React.FC<HeroProps> = ({
  heading,
  subheading,
  background = {},
  minHeight = '80vh',
  align = 'left',
  split = false,
  secondaryContent,
  reverseSplit = false,
  buttons = [],
  animated = true,
  botanical,
  children,
  className,
  style,
  ...boxProps
}) => {
  // Determine if we have a background image
  const hasBackgroundImage = !!background.image;
  
  /**
   * Render the heading content with animation if enabled
   */
  const renderHeadingContent = () => {
    const content = (
      <>
        <HeadingWrapper>
          <Heading
            variant="h1"
            textAlign={align}
          >
            {heading}
          </Heading>
        </HeadingWrapper>
        
        {subheading && (
          <SubheadingWrapper>
            <Text
              variant="subtitle1"
              textAlign={align}
            >
              {subheading}
            </Text>
          </SubheadingWrapper>
        )}
        
        {children}
        
        {buttons.length > 0 && (
          <ButtonsContainer $align={align}>
            {buttons.map((button, index) => (
              <Button
                key={index}
                variant={button.variant || 'primary'}
                href={button.href}
                onClick={button.onClick}
                leftIcon={button.icon && button.iconPosition === 'left' ? button.icon : undefined}
                rightIcon={button.icon && button.iconPosition === 'right' ? button.icon : undefined}
              >
                {button.label}
              </Button>
            ))}
          </ButtonsContainer>
        )}
      </>
    );
    
    if (animated) {
      return <FadeIn delay={0.2}>{content}</FadeIn>;
    }
    
    return content;
  };
  
  /**
   * Render the secondary content with animation if enabled
   */
  const renderSecondaryContentSection = () => {
    if (!secondaryContent) return null;
    
    if (animated) {
      return (
        <SecondaryContent>
          <SlideIn direction={reverseSplit ? 'left' : 'right'}>
            {secondaryContent}
          </SlideIn>
        </SecondaryContent>
      );
    }
    
    return <SecondaryContent>{secondaryContent}</SecondaryContent>;
  };
  
  return (
    <HeroContainer
      $minHeight={minHeight}
      $hasBackgroundImage={hasBackgroundImage}
      $backgroundImage={background.image}
      $backgroundOverlay={background.overlay}
      $backgroundPosition={background.position}
      $backgroundSize={background.size}
      className={className}
      {...boxProps}
    >
      {/* Botanical element if specified */}
      {botanical && typeof botanical !== 'boolean' && (
        <BotanicalContainer $position={botanical.position}>
          <BotanicalElement
            variant={botanical.type}
            size={botanical.size || 'lg'}
            opacity={botanical.opacity || 0.1}
          />
        </BotanicalContainer>
      )}
      
      {/* Use default botanical if prop is just true */}
      {botanical && typeof botanical === 'boolean' && (
        <BotanicalContainer $position="bottomRight">
          <BotanicalElement
            variant="oliveBranch"
            size="lg"
            opacity={0.1}
          />
        </BotanicalContainer>
      )}
      
      <ContentContainer
        $align={align}
        $split={split}
        $reversed={reverseSplit}
      >
        <PrimaryContent $split={split} $align={align}>
          {renderHeadingContent()}
        </PrimaryContent>
        
        {split && renderSecondaryContentSection()}
      </ContentContainer>
    </HeroContainer>
  );
};

export default Hero; 








