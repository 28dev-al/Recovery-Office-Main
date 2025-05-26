/**
 * Philosophy Section Component
 * 
 * Explains the core philosophy of Recovery Office based on sacred geometry principles.
 * Uses golden ratio for layout and includes botanical elements.
 */

import * as React from 'react';
import styled from 'styled-components';
import { Section } from '../../../design-system/components/layout/Section';
import SectionTitle from '../../../design-system/components/typography/SectionTitle';
import { Text } from '../../../design-system/components/typography/Text';
import { Box, GoldenSection } from '../../../design-system/components/layout';
import { Card } from '../../../design-system/components/data-display';
import { PHI, PHI_INVERSE, SACRED_SPACING } from '../../../constants/sacred-geometry';
import { FlowerOfLife, SeedOfLife, TreeOfLife } from '../../../design-system/botanical';
import { ScrollReveal } from '../../../animation';

const StyledSection = styled(Section)`
  position: relative;
  overflow: hidden;
  background: linear-gradient(
    to right,
    rgba(246, 248, 250, 0.8),
    rgba(240, 244, 248, 0.9)
  );
  padding: ${SACRED_SPACING.xl}px 0;
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${SACRED_SPACING.md}px;
`;

const PhilosophyCard = styled(Card)`
  margin-bottom: ${SACRED_SPACING.lg}px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  
  &:hover {
    transform: translateY(-${SACRED_SPACING.xs * PHI_INVERSE}px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.09);
  }
`;

const BackgroundDecoration = styled.div`
  position: absolute;
  bottom: ${-SACRED_SPACING.xl * 0.5}px;
  left: ${-SACRED_SPACING.xl * 0.3}px;
  opacity: 0.05;
  transform: rotate(${-PHI * 10}deg);
  z-index: 0;
`;

const philosophyPrinciples = [
  {
    id: 'sacred-geometry',
    title: 'Sacred Geometry',
    content: 'We believe the mathematical patterns found throughout nature provide a framework for optimal healing. These patterns—from the Golden Ratio to the Fibonacci sequence—inform our therapeutic approach on every level.',
    icon: 'flowerOfLife',
    accentColor: '#4a6eb3'
  },
  {
    id: 'holistic-balance',
    title: 'Holistic Balance',
    content: 'True recovery requires harmony between body, mind, and spirit. Our therapies address the physical symptoms while also restoring energetic and psychological balance through sacred proportions.',
    icon: 'seedOfLife',
    accentColor: '#63a98c'
  },
  {
    id: 'natural-harmony',
    title: 'Natural Harmony',
    content: 'By aligning our therapeutic practices with the same proportions found in nature, we tap into the inherent healing intelligence of the universe. This creates a resonance that accelerates recovery.',
    icon: 'treeOfLife',
    accentColor: '#86b378'
  }
];

const PhilosophySection: React.FC = () => {
  return (
    <StyledSection id="philosophy">
      <BackgroundDecoration>
        <FlowerOfLife size="xxl" />
      </BackgroundDecoration>
      
      <ContentContainer>
        <SectionTitle 
          title="Our Philosophy" 
          subtitle="The sacred principles that guide our approach"
        />
        
        <Box mt={SACRED_SPACING.lg}>
          <Text size="lg" textAlign="center" style={{ maxWidth: '800px', margin: '0 auto', marginBottom: SACRED_SPACING.lg }}>
            Recovery Office is founded on the understanding that the same mathematical principles
            that create harmony in the universe can be applied to therapeutic practices.
          </Text>
          
          <GoldenSection
            leftContent={
              <Box 
                position="relative" 
                width="100%" 
                height="100%" 
                display="flex" 
                alignItems="center" 
                justifyContent="center"
              >
                <FlowerOfLife
                  size="xl"
                  color="#4a6eb3"
                  fill="rgba(0,0,0,0)"
                  opacity={0.7}
                />
              </Box>
            }
          >
            <Text size="md">
              Our approach merges ancient wisdom with modern therapeutic practices. We recognize that
              the same sacred proportions found in natural systems—from galaxies to seashells, from flower
              petals to human DNA—can be applied to healing methodologies to create greater harmony
              and more efficient recovery.
            </Text>
            <Text size="md" mt={SACRED_SPACING.md}>
              By incorporating these principles into our therapeutic environments, exercises, and
              procedures, we create a resonance that naturally facilitates the body's own healing capabilities.
              This isn't just theoretical—our research has demonstrated measurable improvements in
              recovery outcomes when sacred geometry principles are thoughtfully applied.
            </Text>
          </GoldenSection>
          
          <Box 
            mt={SACRED_SPACING.xl} 
            display="grid" 
            gridTemplateColumns={{ _xs: "1fr", _md: "1fr 1fr 1fr" }}
            gap={SACRED_SPACING.lg}
          >
            {philosophyPrinciples.map((principle, index) => (
              <ScrollReveal key={principle.id} delay={index * 0.15}>
                <PhilosophyCard
                  elevation={2}
                  padding={`${SACRED_SPACING.lg}px`}
                  style={{
                    borderTop: `4px solid ${principle.accentColor}`
                  }}
                >
                  <Box 
                    marginBottom={SACRED_SPACING.md}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    height={`${SACRED_SPACING.xl * PHI}px`}
                  >
                    {principle.icon === 'flowerOfLife' && <FlowerOfLife size="md" opacity={0.8} />}
                    {principle.icon === 'seedOfLife' && <SeedOfLife size="md" opacity={0.8} />}
                    {principle.icon === 'treeOfLife' && <TreeOfLife size="md" opacity={0.8} />}
                  </Box>
                  <Text 
                    variant="h4" 
                    textAlign="center"
                    style={{ 
                      marginBottom: SACRED_SPACING.sm,
                      color: principle.accentColor
                    }}
                  >
                    {principle.title}
                  </Text>
                  <Text variant="body2" textAlign="center">
                    {principle.content}
                  </Text>
                </PhilosophyCard>
              </ScrollReveal>
            ))}
          </Box>
          
          <Box mt={SACRED_SPACING.xl} textAlign="center">
            <Text size="lg" fontWeight="500" color="#4a6eb3">
              &quot;Harmony in healing comes from aligning with the mathematical principles that govern our universe.&quot;
            </Text>
            <Text size="md" mt={SACRED_SPACING.sm} fontStyle="italic">
              &mdash; Dr. Elizabeth Harper, Founder
            </Text>
          </Box>
        </Box>
      </ContentContainer>
    </StyledSection>
  );
};

export default PhilosophySection; 











