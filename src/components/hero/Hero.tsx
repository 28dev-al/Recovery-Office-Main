/**
 * Hero Component
 * 
 * Main hero section component implementing sacred geometry principles
 * for layout, spacing, and proportions.
 */

import * as React from 'react';
import styled from 'styled-components';
import { Box } from '@design-system/components/layout/Box';
import { Container } from '@design-system/components/layout/Container';
import { GoldenSection } from '@design-system/components/layout/GoldenSection';
import { PHI } from '@constants/sacred-geometry';

import { HeroContent } from './HeroContent';
import { HeroBotanicals } from './HeroBotanicals';

// Define the sacred aspect ratios
const SACRED_ASPECT_RATIOS = {
  goldenRectangle: PHI, // 1.618:1
  goldenRectangleLandscape: 1 / PHI, // 1:1.618
  square: 1, // 1:1
  fourByThree: 4 / 3, // 4:3
  sixteenByNine: 16 / 9, // 16:9
  twentyOneByNine: 21 / 9 // 21:9
};

interface HeroWrapperProps {
  /**
   * Background image URL
   */
  bgImage?: string;
  
  /**
   * Custom height (number of pixels or CSS value like '100vh')
   */
  height?: string | number;
  
  /**
   * Background color
   */
  bgColor?: string;
}

const HeroWrapper = styled(Box)<HeroWrapperProps>`
  position: relative;
  height: ${props => 
    typeof props.height === 'number' 
      ? `${props.height}px` 
      : props.height || '100vh'};
  overflow: hidden;
  background-color: ${props => 
    props.bgColor ? props.bgColor : (props.theme.colors.primary[900] ?? 1)};
  background-image: ${props => 
    props.bgImage ? `url(${props.bgImage})` : 'none'};
  background-size: cover;
  background-position: center;
  
  /* Ensure minimum height follows golden ratio relative to viewport width */
  min-height: ${props => props.theme.breakpoints.md * SACRED_ASPECT_RATIOS.goldenRectangle}px;
  
  /* Overlay gradient */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to bottom right,
      rgba(0, 0, 0, 0.7),
      rgba(0, 0, 0, 0.3)
    );
    z-index: 1;
  }
`;

const HeroContainer = styled(Container)`
  height: 100%;
  position: relative;
  z-index: 2;
`;

interface HeroProps {
  /**
   * Background image URL
   */
  bgImage?: string;
  
  /**
   * Custom height (number of pixels or CSS value like '100vh')
   */
  height?: string | number;
  
  /**
   * Background color (if no image)
   */
  bgColor?: string;
  
  /**
   * Hero title
   */
  title: string;
  
  /**
   * Hero subtitle
   */
  subtitle?: string;
  
  /**
   * Call to action button text
   */
  ctaText?: string;
  
  /**
   * Call to action button link
   */
  ctaLink?: string;
  
  /**
   * Secondary call to action button text
   */
  secondaryCtaText?: string;
  
  /**
   * Secondary call to action button link
   */
  secondaryCtaLink?: string;
  
  /**
   * Should the golden section be reversed
   */
  reverseLayout?: boolean;
  
  /**
   * Additional CSS class
   */
  className?: string;
}

/**
 * Hero Component
 * 
 * Main hero section built using sacred geometry principles for layout and proportion.
 * Features a golden ratio section layout, botanical decorations, and harmonious text sizing.
 */
export const Hero: React.FC<HeroProps> = ({ 
  bgImage,
  height = '100vh',
  bgColor,
  title,
  subtitle,
  ctaText,
  ctaLink,
  secondaryCtaText,
  secondaryCtaLink,
  reverseLayout = false,
  className
}) => {
  return (
    <HeroWrapper 
      className={className}
      bgImage={bgImage}
      height={height}
      bgColor={bgColor}
    >
      <HeroContainer>
        <GoldenSection 
          height="100%" 
          direction="horizontal"
          reverseOrder={reverseLayout}
        >
          {/* Hero Content Section */}
          <HeroContent
            title={title}
            subtitle={subtitle}
            ctaText={ctaText}
            ctaLink={ctaLink}
            secondaryCtaText={secondaryCtaText}
            secondaryCtaLink={secondaryCtaLink}
          />
          
          {/* Botanical Decorations */}
          <HeroBotanicals />
        </GoldenSection>
      </HeroContainer>
    </HeroWrapper>
  );
};

export default Hero; 








