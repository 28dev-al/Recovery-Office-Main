/**
 * HomeServices Component
 * 
 * Displays services section on the home page with sacred geometry principles
 * for layout, animations, and design.
 */

import * as React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Grid } from '../../../design-system/components/layout';
import { Heading, Text, Paragraph } from '../../../design-system/components/typography';
import { Button } from '../../../design-system/components/button';
import { Card } from '../../../design-system/components/data-display';
import { Section, SectionHeading } from '../../../components/section';
import { FadeIn, ScrollReveal, ScaleFade } from '../../../animation';
import { FlowerOfLife, OliveBranch } from '../../../design-system/botanical';
import { SACRED_SPACING, PHI, PHI_INVERSE, ANIMATION_TIMING } from '../../../constants/sacred-geometry';


// Service type definition
interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  link: string;
  color: string;
}

// Styled components
const ServiceCard = styled(Card)<{ $accentColor: string }>`
  height: 100%;
  transition: transform 0.3s cubic-bezier(${PHI_INVERSE}, 0, ${PHI_INVERSE}, 1);
  border-top: 3px solid ${props => props.$accentColor};
  border-radius: ${PHI_INVERSE * 10}px;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-${SACRED_SPACING.xs}px);
    box-shadow: 0 ${SACRED_SPACING.sm}px ${SACRED_SPACING.md}px rgba(0, 0, 0, 0.1);
  }
`;

const ServiceIconContainer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${SACRED_SPACING.xl}px;
  height: ${SACRED_SPACING.xl}px;
  border-radius: 50%;
  margin-bottom: ${SACRED_SPACING.md}px;
  
  img {
    width: ${SACRED_SPACING.lg}px;
    height: ${SACRED_SPACING.lg}px;
  }
`;

const BotanicalDecoration = styled(Box)`
  position: absolute;
  z-index: 0;
  opacity: 0.07;
  
  &.top-right {
    top: ${SACRED_SPACING.lg}px;
    right: ${SACRED_SPACING.lg}px;
    transform: rotate(${45}deg);
  }
  
  &.bottom-left {
    bottom: ${SACRED_SPACING.lg}px;
    left: ${SACRED_SPACING.lg}px;
    transform: rotate(${-45}deg);
  }
`;

/**
 * HomeServices Component
 * 
 * Showcases the company's services using sacred geometry principles
 * for layout proportions, animations, and visual harmony.
 */
const HomeServices: React.FC = () => {
  const navigate = useNavigate();
  
  // Services data
  const services: Service[] = [
    {
      id: 'service-1',
      title: 'Recovery Consultation',
      description: 'Expert guidance through the financial recovery process with personalized strategies based on your unique situation.',
      icon: '/assets/icons/consultation.svg',
      link: '/services#recovery-consultation',
      color: '#0A4021' // primary.dark
    },
    {
      id: 'service-2',
      title: 'Investment Fraud Recovery',
      description: 'Specialized assistance in recovering assets from investment scams, Ponzi schemes, and securities fraud.',
      icon: '/assets/icons/investment.svg',
      link: '/services#investment-fraud',
      color: '#1A6845' // primary.main
    },
    {
      id: 'service-3',
      title: 'Regulatory Compliance',
      description: 'Navigate complex regulatory frameworks to ensure your recovery process follows all legal requirements.',
      icon: '/assets/icons/compliance.svg',
      link: '/services#regulatory-compliance',
      color: '#2C8262' // primary.light
    },
    {
      id: 'service-4',
      title: 'Digital Asset Recovery',
      description: 'Specialized techniques for recovering cryptocurrency and digital assets lost to fraud or theft.',
      icon: '/assets/icons/digital.svg',
      link: '/services#digital-recovery',
      color: '#0A4021' // primary.dark
    }
  ];

  const handleServiceClick = (link: string) => {
    navigate(link);
  };

  return (
    <Section
      variant="light"
      pt={SACRED_SPACING.xxl}
      pb={SACRED_SPACING.xxl}
      id="services"
    >
      <Container>
        <Box position="relative">
          {/* Botanical decorations */}
          <BotanicalDecoration className="top-right">
            <FlowerOfLife width={200} opacity={0.15} />
          </BotanicalDecoration>
          
          <BotanicalDecoration className="bottom-left">
            <OliveBranch width={180} opacity={0.15} />
          </BotanicalDecoration>
          
          {/* Section heading */}
          <ScrollReveal>
            <SectionHeading
              title="Our Services"
              subtitle="Expert financial recovery solutions guided by sacred principles"
              align="center"
              size="large"
              marginBottom={SACRED_SPACING.xl}
            />
          </ScrollReveal>
          
          {/* Services grid - using Fibonacci sequence for spacing */}
          <Grid
            gridTemplateColumns={{
              base: '1fr',
              md: 'repeat(2, 1fr)',
              lg: 'repeat(4, 1fr)'
            }}
            gap={SACRED_SPACING.lg}
            marginTop={SACRED_SPACING.xl}
          >
            {services.map((service, index) => (
              <ScaleFade 
                key={service.id}
                delay={ANIMATION_TIMING.quick * (index % 4)}
                duration={ANIMATION_TIMING.standard}
              >
                <ServiceCard
                  $accentColor={service.color}
                  onClick={() => handleServiceClick(service.link)}
                  padding={SACRED_SPACING.lg}
                  cursor="pointer"
                >
                  <ServiceIconContainer
                    backgroundColor={`${service.color}1A`} // 10% opacity
                  >
                    <img src={service.icon} alt={service.title} />
                  </ServiceIconContainer>
                  
                  <Heading
                    as="h3"
                    variant="h4"
                    marginBottom={SACRED_SPACING.sm}
                  >
                    {service.title}
                  </Heading>
                  
                  <Paragraph
                    variant="body2"
                    marginBottom={SACRED_SPACING.md}
                  >
                    {service.description}
                  </Paragraph>
                  
                  <Text
                    variant="caption"
                    color="primary.main"
                    fontWeight="medium"
                  >
                    Learn more →
                  </Text>
                </ServiceCard>
              </ScaleFade>
            ))}
          </Grid>
          
          {/* Call to action */}
          <Box
            display="flex"
            justifyContent="center"
            marginTop={SACRED_SPACING.xl * PHI} // Golden ratio enhanced spacing
          >
            <FadeIn delay={ANIMATION_TIMING.standard}>
              <Button
                variant="primary"
                size="large"
                onClick={() => navigate('/services')}
              >
                Explore All Services
              </Button>
            </FadeIn>
          </Box>
        </Box>
      </Container>
    </Section>
  );
};

export default HomeServices; 









