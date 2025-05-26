/**
 * Mission Section Component
 * 
 * Displays the mission and purpose of Recovery Office with a focus on financial asset recovery.
 */

import * as React from 'react';
import styled from 'styled-components';
import { Section } from '../../../design-system/components/layout/Section';
import { Box, Container, GoldenSection } from '../../../design-system/components/layout';
import { Text, Paragraph } from '../../../design-system/components/typography';
import SectionTitle from '../../../design-system/components/layout/Section/SectionTitle';
import { ScrollReveal } from '../../../animation';
import { VesicaPiscis } from '../../../design-system/botanical';
import { PREMIUM_SPACING } from '../../../design-system/tokens';

// Professional mission image
const MissionImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

// Accent text for key points
const AccentText = styled(Text)`
  color: ${props => props.theme.colors.primary[600]};
  font-weight: 600;
`;

const MissionSection: React.FC = () => {
  return (
    <ScrollReveal>
      <Section id="our-mission" backgroundColor="#ffffff">
        <Container>
          <GoldenSection
            rightContent={
              <Box 
                position="relative" 
                width="100%" 
                height="100%" 
                display="flex" 
                alignItems="center" 
                justifyContent="center"
              >
                <MissionImage 
                  src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80"
                  alt="Financial recovery professionals in meeting"
                />
              </Box>
            }
          >
            <SectionTitle 
              title="Our Mission" 
              subtitle="Recovering assets with integrity and expertise"
              size="large"
              align="left"
              decoratorBefore={<VesicaPiscis size="small" opacity={0.3} />}
            />
            <Box mt={PREMIUM_SPACING.md}>
              <Paragraph variant="body1">
                Recovery Office was founded with a clear mission: to help people recover financial 
                assets lost to fraud, scams, and failed investments. Our founders recognized the 
                devastating impact of financial fraud on individuals and businesses, and the lack of 
                specialized services to assist victims.
              </Paragraph>
              
              <Box mt={PREMIUM_SPACING.md}>
                <AccentText mb={PREMIUM_SPACING.xs}>What sets us apart:</AccentText>
                <Paragraph variant="body1">
                  Our comprehensive approach combines legal expertise, financial knowledge, technical skills, 
                  and regulatory relationships. We understand that successful recovery requires a multi-faceted 
                  strategy tailored to each unique case.
                </Paragraph>
              </Box>
              
              <Box mt={PREMIUM_SPACING.md}>
                <AccentText mb={PREMIUM_SPACING.xs}>Our commitment to clients:</AccentText>
                <Paragraph variant="body1">
                  We maintain the highest standards of integrity, confidentiality, and professional conduct 
                  while leveraging our expertise to maximize recovery potential. Our focus is not just on recovering 
                  assets but also on providing clear communication and support throughout what can be a stressful process.
                </Paragraph>
              </Box>
              
              <Box 
                mt={PREMIUM_SPACING.lg} 
                p={PREMIUM_SPACING.md} 
                borderLeft="4px solid" 
                borderColor="primary.600"
                bg="background.secondary"
              >
                <Text variant="h5" mb={PREMIUM_SPACING.xs}>Our Recovery Approach</Text>
                <Text variant="body2">
                  We believe in strategic persistence, regulatory expertise, and technological innovation 
                  to achieve the best possible outcomes for our clients. Each case is unique, and we adapt our 
                  methods accordingly while always maintaining the highest ethical standards.
                </Text>
              </Box>
            </Box>
          </GoldenSection>
        </Container>
      </Section>
    </ScrollReveal>
  );
};

export default MissionSection; 