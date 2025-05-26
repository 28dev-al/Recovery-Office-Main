import * as React from 'react';

import styled from 'styled-components';
import { ScrollReveal } from '../../../animation';
import { SecurityShield, ComplianceBadge } from '../../../design-system/components/utility/FinancialIcons';
import { PHI, SACRED_SPACING, getFibonacciByIndex } from '../../../constants/sacred-geometry';
import { Section, SectionTitle, SectionContent } from '../../../design-system/components/layout/Section';
import { Container } from '../../../design-system/components/layout';
import { Grid } from '../../../design-system/components/layout';
import { Box } from '../../../design-system/components/layout';
import { Text, Heading } from '../../../design-system/components/typography';
import { Card } from '../../../design-system/components/data-display';

/**
 * Service interface defining the structure of a service item
 */
export interface Service {
  /** Unique identifier for the service */
  id: string;
  /** Service name */
  title: string;
  /** Short description */
  description: string;
  /** Icon identifier */
  icon: string;
  /** URL path to the service details */
  path: string;
  /** Accent color for UI elements */
  accentColor: string;
  /** Detailed description */
  longDescription: string;
  /** List of service benefits */
  benefits: string[];
  /** Service pricing information */
  pricing: {
    initial?: number;
    followUp?: number;
    workshop?: number;
    privateSession?: number;
    initialReview?: number;
  };
  /** Duration information */
  duration: string;
}

/**
 * ServicesOverview component properties
 */
interface ServicesOverviewProps {
  /** Array of service objects to display */
  services: Service[];
  /** Title for the section */
  title?: string;
  /** Subtitle for the section */
  subtitle?: string;
  /** Background color */
  backgroundColor?: string;
}

const StyledSection = styled(Section)`
  padding: ${SACRED_SPACING.xxl}px 0;
  position: relative;
  overflow: hidden;
`;

const BotanicalDecoration = styled.div`
  position: absolute;
  opacity: 0.1;
  z-index: 0;
`;

const TopLeftDecoration = styled(BotanicalDecoration)`
  top: -${getFibonacciByIndex(8)}px;
  left: -${getFibonacciByIndex(8)}px;
  transform: rotate(${PHI * 10}deg);
`;

const BottomRightDecoration = styled(BotanicalDecoration)`
  bottom: -${getFibonacciByIndex(8)}px;
  right: -${getFibonacciByIndex(8)}px;
  transform: rotate(-${PHI * 10}deg);
`;

const ServiceCard = styled(Card)`
  padding: ${SACRED_SPACING.lg}px;
  height: 100%;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const ServiceIcon = styled.div<{ accentColor: string }>`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${props => props.accentColor};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
`;

// Service grid wrapper to handle mapping services to grid items
const ServiceGridWrapper: React.FC<{ 
  services: Service[]; 
  columns: number; 
  animated?: boolean;
}> = ({ services, columns, animated = false }) => {
  return (
    <Grid 
      columns={columns} 
      gap={SACRED_SPACING.lg}
    >
      {services.map((service) => (
        <Box key={service.id}>
          <ServiceCard>
            <ServiceIcon accentColor={service.accentColor}>
              {service.icon.charAt(0).toUpperCase()}
            </ServiceIcon>
            <Heading as="h3" mb={2}>
              {service.title}
            </Heading>
            <Text size="sm" mb={3}>
              {service.description}
            </Text>
          </ServiceCard>
        </Box>
      ))}
    </Grid>
  );
};

/**
 * ServicesOverview Component
 * 
 * Displays a grid of all services with decorative SecurityShield elements.
 * Layout and spacing follow organized principles for visual harmony.
 */
const ServicesOverview: React.FC<ServicesOverviewProps> = ({
  services,
  title = "Our Recovery Approach",
  subtitle = "Discover our financial recovery services",
  backgroundColor = "#f8f9fa"
}) => {
  return (
    <StyledSection backgroundColor={backgroundColor}>
      <TopLeftDecoration>
        <SecurityShield size="lg" opacity={0.3} />
      </TopLeftDecoration>
      
      <BottomRightDecoration>
        <ComplianceBadge size="lg" opacity={0.3} />
      </BottomRightDecoration>
      
      <Container>
        <ScrollReveal>
          <SectionTitle 
            title={title} 
            subtitle={subtitle}
            decoratorBefore={<SecurityShield size="sm" opacity={0.15} />}
            decoratorAfter={<ComplianceBadge size="sm" opacity={0.15} />}
          />
        </ScrollReveal>
        
        <ScrollReveal delay={0.1 * PHI}>
          <SectionContent>
            <ServiceGridWrapper 
              services={services}
              columns={2}
              animated={true}
            />
          </SectionContent>
        </ScrollReveal>
      </Container>
    </StyledSection>
  );
};

export default ServicesOverview; 














