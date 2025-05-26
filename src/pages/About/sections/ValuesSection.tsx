/**
 * Values Section Component
 * 
 * Displays the core values of Recovery Office with a focus on financial recovery principles.
 * Uses the existing design system for consistency.
 */

import * as React from 'react';
import styled from 'styled-components';
import { Section } from '../../../design-system/components/layout/Section';
import { Box, Container } from '../../../design-system/components/layout';
import { Text } from '../../../design-system/components/typography';
import { Card } from '../../../design-system/components/data-display';
import SectionTitle from '../../../design-system/components/layout/Section/SectionTitle';
import { PREMIUM_SPACING } from '../../../design-system/tokens';
import { ScrollReveal } from '../../../animation';
import { FlowerOfLife, VesicaPiscis, LeafPattern } from '../../../design-system/botanical';

const ValueCard = styled(Card)`
  height: 100%;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.09);
  }
`;

const values = [
  {
    id: 'integrity',
    title: 'Integrity',
    content: "We operate with complete transparency and ethical standards, providing honest assessments of recovery possibilities and maintaining clear communication throughout the process.",
    icon: 'flowerOfLife',
    color: '#4a6eb3'
  },
  {
    id: 'expertise',
    title: 'Expertise',
    content: "Our team combines specialized knowledge in financial systems, legal procedures, regulatory frameworks, and technical forensics to create comprehensive recovery strategies.",
    icon: 'vesicaPiscis',
    color: '#63a98c'
  },
  {
    id: 'tenacity',
    title: 'Tenacity',
    content: "We pursue recovery with determination and persistence, exploring all available avenues and refusing to give up when conventional approaches fail to deliver results.",
    icon: 'leafPattern',
    color: '#d4af37'
  },
  {
    id: 'confidentiality',
    title: 'Confidentiality',
    content: "We handle all cases with the utmost discretion, implementing robust security measures to protect sensitive information and client privacy throughout the recovery process.",
    icon: 'flowerOfLife',
    color: '#4a6eb3'
  },
  {
    id: 'innovation',
    title: 'Innovation',
    content: "We constantly develop new approaches to financial asset recovery, leveraging cutting-edge technologies and techniques to overcome emerging challenges in the financial landscape.",
    icon: 'vesicaPiscis',
    color: '#63a98c'
  },
  {
    id: 'client-focus',
    title: 'Client Focus',
    content: "We prioritize our clients' needs and objectives, tailoring our recovery strategies to their specific situations and maintaining transparent communication at every stage.",
    icon: 'leafPattern',
    color: '#d4af37'
  }
];

const ValuesSection: React.FC = () => {
  return (
    <ScrollReveal>
      <Section backgroundColor="#f9fafb">
        <Container>
          <SectionTitle 
            title="Our Core Values" 
            subtitle="The principles that guide our financial recovery services"
            align="center"
            decoratorBefore={<FlowerOfLife size="small" opacity={0.15} />}
          />
          
          <Box 
            mt={PREMIUM_SPACING.xl}
            display="grid" 
            gridTemplateColumns={{ _xs: "1fr", _sm: "1fr 1fr", _lg: "1fr 1fr 1fr" }}
            gap={PREMIUM_SPACING.lg}
          >
            {values.map((value, index) => (
              <ScrollReveal key={value.id} delay={index * 0.1}>
                <ValueCard
                  elevation={2}
                  padding={PREMIUM_SPACING.lg}
                  style={{
                    borderTop: `4px solid ${value.color}`
                  }}
                >
                  <Box 
                    marginBottom={PREMIUM_SPACING.md}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    height={80}
                  >
                    {value.icon === 'flowerOfLife' && <FlowerOfLife size="medium" color={value.color} opacity={0.8} />}
                    {value.icon === 'vesicaPiscis' && <VesicaPiscis size="medium" color={value.color} opacity={0.8} />}
                    {value.icon === 'leafPattern' && <LeafPattern size="medium" color={value.color} opacity={0.8} />}
                  </Box>
                  <Text 
                    variant="h4" 
                    textAlign="center"
                    style={{ 
                      marginBottom: PREMIUM_SPACING.sm,
                      color: value.color
                    }}
                  >
                    {value.title}
                  </Text>
                  <Text variant="body2" textAlign="center">
                    {value.content}
                  </Text>
                </ValueCard>
              </ScrollReveal>
            ))}
          </Box>
          
          <Box mt={PREMIUM_SPACING.xxl} maxWidth="800px" mx="auto" textAlign="center">
            <Text variant="body1" style={{ fontStyle: 'italic' }}>
              &quot;In the complex landscape of financial recovery, our values aren&apos;t just words&mdash;they&apos;re the foundation of every action we take and every strategy we develop.&quot;
            </Text>
            <Text variant="subtitle2" mt={PREMIUM_SPACING.sm} color="#4a6eb3">
              &mdash; Dr. Elizabeth Harper, Founder &amp; Director
            </Text>
          </Box>
        </Container>
      </Section>
    </ScrollReveal>
  );
};

export default ValuesSection; 