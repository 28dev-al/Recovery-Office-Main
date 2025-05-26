/**
 * HeroContent Component
 * 
 * Displays text content and call-to-action buttons in the hero section,
 * implementing sacred geometry principles for typography and spacing.
 */

import * as React from 'react';
import styled from 'styled-components';
import { Box } from '@design-system/components/layout/Box';
import { Flex } from '@design-system/components/layout/Flex';
import { Heading } from '@design-system/components/typography/Heading';
import { Text } from '@design-system/components/typography/Text';
import { Button } from '@design-system/components/button/Button';
import { PHI } from '@constants/sacred-geometry';
import { FadeIn } from "@design-system/components/animation/FadeIn";
import { SlideIn } from "@design-system/components/animation/SlideIn";

// Define missing constants
const SACRED_SPACING = {
  none: 0,
  xxxs: 1,
  xxs: 2,
  xs: 5,
  sm: 8,
  md: 13,
  lg: 21,
  xl: 34,
  xxl: 55,
  xxxl: 89
};

const SACRED_TIMING = {
  fast: 300,
  medium: 500,
  slow: 800,
  slower: 1200
};

// Helper function to get Fibonacci number by index
function getFibonacciByIndex(index: number): number {
  const fibonacciNumbers = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377];
  return fibonacciNumbers[index] || index;
}

const ContentWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  color: ${props => props.theme.colors.text.light};
  padding: ${SACRED_SPACING.xl}px 0;
  max-width: ${props => props.theme.breakpoints.lg / PHI}px;
  
  @media (max-width: ${props => props.theme.breakpoints.md}px) {
    padding: ${SACRED_SPACING.xl}px ${SACRED_SPACING.md}px;
    align-items: center;
    text-align: center;
  }
`;

const HeroTitle = styled(Heading)`
  font-size: clamp(
    ${getFibonacciByIndex(9)}px, 
    ${getFibonacciByIndex(8) / 10}vw, 
    ${getFibonacciByIndex(10)}px
  );
  line-height: 1.2;
  margin-bottom: ${SACRED_SPACING.lg}px;
  
  @media (max-width: ${props => props.theme.breakpoints.md}px) {
    font-size: clamp(
      ${getFibonacciByIndex(8)}px, 
      ${getFibonacciByIndex(7) / 10}vw, 
      ${getFibonacciByIndex(9)}px
    );
  }
`;

const HeroSubtitle = styled(Text)`
  font-size: clamp(
    ${getFibonacciByIndex(7)}px, 
    ${getFibonacciByIndex(6) / 10}vw, 
    ${getFibonacciByIndex(8)}px
  );
  line-height: 1.5;
  margin-bottom: ${SACRED_SPACING.xl}px;
  max-width: 85%;
  
  @media (max-width: ${props => props.theme.breakpoints.md}px) {
    font-size: clamp(
      ${getFibonacciByIndex(6)}px, 
      ${getFibonacciByIndex(5) / 10}vw, 
      ${getFibonacciByIndex(7)}px
    );
    max-width: 100%;
  }
`;

const ButtonGroup = styled(Flex)`
  gap: ${SACRED_SPACING.md}px;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}px) {
    flex-direction: column;
    width: 100%;
    
    button {
      width: 100%;
    }
  }
`;

interface HeroContentProps {
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
   * Additional CSS class
   */
  className?: string;
}

/**
 * HeroContent Component
 * 
 * Displays the text content and call-to-action buttons in the hero section.
 * Implements sacred geometry principles for typography scale and spacing.
 */
export const HeroContent: React.FC<HeroContentProps> = ({ 
  title,
  subtitle,
  ctaText,
  ctaLink = '/booking',
  secondaryCtaText,
  secondaryCtaLink = '/contact',
  className
}) => {
  return (
    <ContentWrapper className={className}>
      <FadeIn duration={SACRED_TIMING.slower}>
        <SlideIn
          direction="up"
          distance={SACRED_SPACING.lg}
          duration={SACRED_TIMING.slow}
          delay={SACRED_TIMING.fast}
        >
          <HeroTitle as="h1">{title}</HeroTitle>
        </SlideIn>
        
        {subtitle && (
          <SlideIn
            direction="up"
            distance={SACRED_SPACING.md}
            duration={SACRED_TIMING.slow}
            delay={SACRED_TIMING.medium}
          >
            <HeroSubtitle>{subtitle}</HeroSubtitle>
          </SlideIn>
        )}
        
        {(ctaText || secondaryCtaText) && (
          <SlideIn
            direction="up"
            distance={SACRED_SPACING.sm}
            duration={SACRED_TIMING.slow}
            delay={SACRED_TIMING.slow}
          >
            <ButtonGroup>
              {ctaText && (
                <Button 
                  variant="primary" 
                  size="lg" 
                  as="a" 
                  href={ctaLink}
                >
                  {ctaText}
                </Button>
              )}
              
              {secondaryCtaText && (
                <Button 
                  variant="outline" 
                  size="lg" 
                  as="a" 
                  href={secondaryCtaLink}
                >
                  {secondaryCtaText}
                </Button>
              )}
            </ButtonGroup>
          </SlideIn>
        )}
      </FadeIn>
    </ContentWrapper>
  );
};

export default HeroContent; 










