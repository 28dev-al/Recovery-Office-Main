import * as React from 'react';
import styled from 'styled-components';

import { SACRED_SPACING } from '../../../constants/sacred-geometry';
import { Section, SectionTitle, SectionContent } from '../../../design-system/components/layout/Section';
import { Container } from '../../../design-system/components/layout';
import { Card } from '../../../design-system/components/data-display';
import { FlowerOfLife } from '../../../design-system/botanical';
import { Heading, Paragraph } from '../../../design-system/components/typography';
import { getFibonacciByIndex } from '../../../utils/getFibonacciByIndex';
import type { Service } from './ServicesOverview';

/**
 * ServicesList component properties
 */
export interface ServicesListProps {
  /** Array of service objects to display */
  services: Service[];
  /** Section title */
  title?: string;
  /** Section subtitle */
  subtitle?: string;
  /** Background color */
  backgroundColor?: string;
}

const StyledSection = styled(Section)`
  padding: ${SACRED_SPACING.xxl}px 0;
  position: relative;
  overflow: hidden;
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${SACRED_SPACING.xl}px;
  margin-top: ${SACRED_SPACING.xl}px;
`;

const ServiceCard = styled(Card)<{ $accentColor: string }>`
  display: flex;
  flex-direction: column;
  border-left: 4px solid ${props => props.$accentColor};
  padding: ${SACRED_SPACING.xl}px;
  background: #fff;
  border-radius: ${SACRED_SPACING.md}px;
  box-shadow: 0 ${SACRED_SPACING.xs}px ${SACRED_SPACING.lg}px rgba(0,0,0,0.05);
  position: relative;
`;

const ServiceIcon = styled.div<{ $accentColor: string }>`
  width: ${getFibonacciByIndex(7)}px;
  height: ${getFibonacciByIndex(7)}px;
  background: ${props => props.$accentColor};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: ${getFibonacciByIndex(5)}px;
  margin-bottom: ${SACRED_SPACING.md}px;
`;

const TitleWrapper = styled.div`
  margin-bottom: ${SACRED_SPACING.sm}px;
`;
const DescWrapper = styled.div`
  margin-bottom: ${SACRED_SPACING.md}px;
`;

/**
 * ServicesList Component
 *
 * Displays a vertical list of services with sacred geometry-based spacing and layout.
 * Each service is shown in a card with accent color, icon, title, description, and a CTA button.
 */
const ServicesList: React.FC<ServicesListProps> = ({
  services,
  title = 'Our Services',
  subtitle = 'Explore our offerings designed with sacred geometry principles',
  backgroundColor = '#f8f9fa',
}) => {
  return (
    <StyledSection backgroundColor={backgroundColor}>
      <Container>
        <SectionTitle
          title={title}
          subtitle={subtitle}
          decoratorBefore={<FlowerOfLife size="sm" opacity={0.15} />}
          decoratorAfter={<FlowerOfLife size="sm" opacity={0.15} />}
        />
        <SectionContent>
          <ListContainer>
            {services.map(service => (
              <ServiceCard key={service.id} $accentColor={service.accentColor}>
                <ServiceIcon $accentColor={service.accentColor}>
                  {service.icon.charAt(0).toUpperCase()}
                </ServiceIcon>
                <TitleWrapper>
                  <Heading as="h3">{service.title}</Heading>
                </TitleWrapper>
                <DescWrapper>
                  <Paragraph>{service.description}</Paragraph>
                </DescWrapper>
                <a
                  href={service.path}
                  style={{
                    display: 'inline-block',
                    background: service.accentColor,
                    color: '#fff',
                    padding: `${SACRED_SPACING.sm}px ${SACRED_SPACING.lg}px`,
                    borderRadius: SACRED_SPACING.xs,
                    textDecoration: 'none',
                    fontWeight: 600,
                    marginTop: SACRED_SPACING.md,
                    alignSelf: 'flex-start',
                  }}
                >
                  Learn More
                </a>
              </ServiceCard>
            ))}
          </ListContainer>
        </SectionContent>
      </Container>
    </StyledSection>
  );
};

export default ServicesList; 







