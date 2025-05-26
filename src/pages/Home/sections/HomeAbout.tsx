/**
 * HomeAbout Component
 * 
 * Displays about section on the home page with sacred geometry principles
 * for layout, animations, and design.
 */

import * as React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Box, Container } from '../../../design-system/components/layout';
import { GoldenSection } from '../../../design-system/components/layout/GoldenSection';
import { Heading, Text, Paragraph } from '../../../design-system/components/typography';
import { Button } from '../../../design-system/components/button';
import { Section, SectionHeading } from '../../../components/section';
import { FadeIn, ScrollReveal, SlideIn } from '../../../animation';
import { VesicaPiscis, FibonacciSpiral } from '../../../design-system/botanical';

import { 
  SACRED_SPACING, 
  PHI, 
  PHI_INVERSE,
  ANIMATION_TIMING
} from '../../../constants/sacred-geometry';

// Styled components
const AboutContainer = styled(Box)`
  position: relative;
  overflow: hidden;
`;

const ImageContainer = styled(Box)`
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 400px;
  border-radius: ${PHI_INVERSE * 10}px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, rgba(10, 64, 33, 0.5), rgba(42, 130, 98, 0.2));
  }
`;

const VesicaDecoration = styled(Box)`
  position: absolute;
  z-index: 0;
  
  &.top-left {
    top: -${SACRED_SPACING.lg}px;
    left: -${SACRED_SPACING.lg}px;
    transform: rotate(${45}deg);
    opacity: 0.15;
  }
`;

const SpiralDecoration = styled(Box)`
  position: absolute;
  z-index: 0;
  
  &.bottom-right {
    bottom: -${SACRED_SPACING.xl}px;
    right: -${SACRED_SPACING.xl}px;
    opacity: 0.1;
  }
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: ${SACRED_SPACING.md}px 0;
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: ${SACRED_SPACING.sm}px;
  
  &::before {
    content: '•';
    color: var(--color-primary-main);
    font-size: 1.5em;
    margin-right: ${SACRED_SPACING.sm}px;
  }
`;

/**
 * HomeAbout Component
 * 
 * Showcases information about the company using sacred geometry principles
 * for layout proportions, animations, and visual harmony.
 */
const HomeAbout: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <Section
      backgroundColor="linear-gradient(45deg, var(--color-primary-700), var(--color-primary-500))"
      variant="primary"
      pt={SACRED_SPACING.xxl}
      pb={SACRED_SPACING.xxl}
      id="about"
      textAlign="center"
    >
      <Container>
        <AboutContainer>
          {/* Section heading */}
          <ScrollReveal>
            <SectionHeading
              title="About Recovery Office"
              subtitle="Trusted financial recovery consultancy guided by sacred principles"
              align="center"
              size="large"
              marginBottom={SACRED_SPACING.xl}
            />
          </ScrollReveal>
          
          {/* Content with Golden Ratio layout */}
          <GoldenSection
            direction="horizontal"
            reverseOrder={false}
          >
            {/* Text content */}
            <Box padding={SACRED_SPACING.lg}>
              <SlideIn direction="left" delay={ANIMATION_TIMING.quick}>
                <Heading
                  as="h3"
                  variant="h3"
                  marginBottom={SACRED_SPACING.md}
                >
                  Our Mission
                </Heading>
                
                <Paragraph
                  variant="body1"
                  marginBottom={SACRED_SPACING.md}
                >
                  At Recovery Office, we provide expert guidance to individuals and businesses 
                  seeking to recover financial assets lost due to fraud, scams, or financial misconduct.
                  Our approach is rooted in sacred geometry principles, bringing natural harmony
                  and balance to the recovery process.
                </Paragraph>
                
                <Heading
                  as="h4"
                  variant="h4"
                  marginBottom={SACRED_SPACING.sm}
                  marginTop={SACRED_SPACING.lg}
                >
                  Core Values
                </Heading>
                
                <FeatureList>
                  <FeatureItem>
                    <Text variant="body2">Expert Guidance with deep regulatory expertise</Text>
                  </FeatureItem>
                  <FeatureItem>
                    <Text variant="body2">Trust & Credibility backed by official credentials</Text>
                  </FeatureItem>
                  <FeatureItem>
                    <Text variant="body2">Empowerment through education and resources</Text>
                  </FeatureItem>
                  <FeatureItem>
                    <Text variant="body2">Transparency in all processes and fee structures</Text>
                  </FeatureItem>
                </FeatureList>
                
                <Box
                  marginTop={SACRED_SPACING.lg}
                >
                  <Button
                    variant="outline"
                    size="medium"
                    onClick={() => navigate('/about')}
                  >
                    Learn More About Us
                  </Button>
                </Box>
              </SlideIn>
            </Box>
            
            {/* Image with decorations */}
            <Box position="relative">
              <FadeIn delay={ANIMATION_TIMING.standard}>
                <ImageContainer>
                  <img 
                    src="/assets/images/hero/about-image.jpg" 
                    alt="Recovery Office team" 
                  />
                  
                  <VesicaDecoration className="top-left">
                    <VesicaPiscis width={120} color="white" />
                  </VesicaDecoration>
                  
                  <SpiralDecoration className="bottom-right">
                    <FibonacciSpiral 
                      iterations={8} 
                      startSize={5} 
                      showSquares={false} 
                      color="white"
                    />
                  </SpiralDecoration>
                </ImageContainer>
              </FadeIn>
            </Box>
          </GoldenSection>
        </AboutContainer>
      </Container>
    </Section>
  );
};

export default HomeAbout; 









