/**
 * HomeFeatures Component
 * 
 * Displays the key features of Recovery Office services using sacred geometry
 * principles for layout, animations, and design.
 */

import * as React from 'react';
import styled from 'styled-components';
import { Box, Container, Grid } from '../../../design-system/components/layout';
import { Heading, Text, Paragraph } from '../../../design-system/components/typography';
import { Section, SectionHeading } from '../../../components/section';
import { FadeIn, ScrollReveal, ScaleFade } from '../../../animation';
import { VesicaPiscis, FlowerOfLife } from '../../../design-system/botanical';
import { 
  SACRED_SPACING, 
  PHI, 
  PHI_INVERSE, 
  FIBONACCI
} from '../../../constants/sacred-geometry';
import { ANIMATION_TIMING } from '../../../constants/sacred-geometry';
import { getFibonacciByIndex } from '../../../utils/getFibonacciByIndex';

// Feature interface
interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

// Styled components
const FeaturesContainer = styled(Box)`
  position: relative;
  overflow: hidden;
  padding: ${SACRED_SPACING.xl}px 0;
`;

const FeatureCard = styled(Box)<{ $accentColor: string }>`
  padding: ${SACRED_SPACING.xl}px;
  background-color: white;
  border-radius: ${PHI_INVERSE * 10}px;
  box-shadow: 0 ${SACRED_SPACING.xs}px ${SACRED_SPACING.md}px rgba(0, 0, 0, 0.05);
  height: 100%;
  border-top: 3px solid ${props => props.$accentColor};
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-${SACRED_SPACING.xs}px);
    box-shadow: 0 ${SACRED_SPACING.md}px ${SACRED_SPACING.lg}px rgba(0, 0, 0, 0.1);
  }
`;

const FeatureIcon = styled(Box)<{ $bgColor: string }>`
  width: ${SACRED_SPACING.xl}px;
  height: ${SACRED_SPACING.xl}px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.$bgColor};
  margin-bottom: ${SACRED_SPACING.md}px;
  
  img {
    width: ${SACRED_SPACING.lg}px;
    height: ${SACRED_SPACING.lg}px;
  }
`;

const BotanicalBackground = styled(Box)`
  position: absolute;
  z-index: -1;
  opacity: 0.05;
  
  &.top-right {
    top: -${SACRED_SPACING.xxl}px;
    right: -${SACRED_SPACING.xxl}px;
  }
  
  &.bottom-left {
    bottom: -${SACRED_SPACING.xxl}px;
    left: -${SACRED_SPACING.xxl}px;
  }
`;

/**
 * HomeFeatures Component
 * 
 * Displays the key features of Recovery Office services using sacred geometry
 * for layout proportions, animations, and visual harmony.
 */
const HomeFeatures: React.FC = () => {
  // Features data
  const features: Feature[] = [
    {
      id: 'feature-1',
      title: 'Expert Guidance',
      description: 'Receive clear, transparent consultation backed by deep regulatory expertise and years of experience in financial recovery.',
      icon: '/assets/icons/expert.svg',
      color: '#0A4021' // primary.dark
    },
    {
      id: 'feature-2',
      title: 'Trust & Credibility',
      description: 'We leverage official FCA/BaFin compliance and oversight to assure clients of our legitimacy, security, and accountability.',
      icon: '/assets/icons/trust.svg',
      color: '#1A6845' // primary.main
    },
    {
      id: 'feature-3',
      title: 'Educational Resources',
      description: 'Access comprehensive resources that empower you with knowledge about financial recovery processes and fraud prevention.',
      icon: '/assets/icons/education.svg',
      color: '#2C8262' // primary.light
    },
    {
      id: 'feature-4',
      title: 'Transparent Process',
      description: 'Experience clear communication about fee structures, recovery timelines, and potential outcomes throughout your journey.',
      icon: '/assets/icons/transparency.svg',
      color: '#0A4021' // primary.dark
    },
    {
      id: 'feature-5',
      title: 'Global Expertise',
      description: 'Benefit from our international network and experience in recovering assets across jurisdictions and regulatory frameworks.',
      icon: '/assets/icons/global.svg',
      color: '#1A6845' // primary.main
    },
    {
      id: 'feature-6',
      title: 'Personalized Support',
      description: 'Receive individualized strategies and support tailored to your unique situation and financial recovery needs.',
      icon: '/assets/icons/support.svg',
      color: '#2C8262' // primary.light
    }
  ];

  return (
    <Section
      variant="light"
      pt={SACRED_SPACING.xxl}
      pb={SACRED_SPACING.xxl}
      id="features"
    >
      <Container>
        <FeaturesContainer>
          {/* Botanical backgrounds */}
          <BotanicalBackground className="top-right">
            <FlowerOfLife width={400} />
          </BotanicalBackground>
          
          <BotanicalBackground className="bottom-left">
            <VesicaPiscis width={350} />
          </BotanicalBackground>
          
          {/* Section heading */}
          <ScrollReveal>
            <SectionHeading
              title="Why Choose Recovery Office"
              subtitle="Our unique approach combines expertise with sacred principles"
              align="center"
              size="large"
              marginBottom={SACRED_SPACING.xl}
            />
          </ScrollReveal>
          
          {/* Features grid */}
          <Grid
            gridTemplateColumns={{
              base: '1fr',
              md: 'repeat(2, 1fr)',
              lg: 'repeat(3, 1fr)'
            }}
            gap={getFibonacciByIndex(8)} // 21px (Fibonacci sequence)
            marginTop={SACRED_SPACING.xl}
          >
            {features.map((feature, index) => (
              <ScaleFade 
                key={feature.id}
                delay={ANIMATION_TIMING.quick * (index % 3)}
                duration={ANIMATION_TIMING.standard}
              >
                <FeatureCard $accentColor={feature.color}>
                  <FeatureIcon $bgColor={`${feature.color}1A`}>
                    <img src={feature.icon} alt={feature.title} />
                  </FeatureIcon>
                  
                  <Heading
                    as="h3"
                    variant="h4"
                    marginBottom={SACRED_SPACING.sm}
                  >
                    {feature.title}
                  </Heading>
                  
                  <Paragraph
                    variant="body2"
                  >
                    {feature.description}
                  </Paragraph>
                </FeatureCard>
              </ScaleFade>
            ))}
          </Grid>
          
          {/* Additional information */}
          <Box
            marginTop={getFibonacciByIndex(10)} // 55px (Fibonacci sequence)
            textAlign="center"
          >
            <FadeIn delay={ANIMATION_TIMING.standard}>
              <Paragraph
                variant="body1"
                maxWidth={`${PHI * 500}px`}
                margin="0 auto"
                color="gray.700"
              >
                All our services incorporate sacred geometry principles, ensuring a harmonious and balanced approach to financial recovery.
                This unique methodology has helped us achieve successful outcomes for over 500 clients worldwide.
              </Paragraph>
            </FadeIn>
          </Box>
        </FeaturesContainer>
      </Container>
    </Section>
  );
};

export default HomeFeatures; 










