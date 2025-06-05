import * as React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { ScrollReveal } from '../../../animation';
import { Button } from '../../../design-system/components/button';
import { Container } from '../../../design-system/components/layout/Container';
import { Section, SectionContent } from '../../../design-system/components/layout/Section';
import { RecoveryTimeline } from '../../../components/sections/premium/RecoveryTimeline';
import { PREMIUM_SPACING } from '../../../design-system/tokens';

/**
 * ServicesProcess component properties
 */
interface ServicesProcessProps {
  /** Section background color */
  backgroundColor?: string;
  /** Call to action button text */
  ctaText?: string;
  /** Call to action button URL */
  ctaUrl?: string;
}

const CtaContainer = styled.div`
  background: linear-gradient(135deg, #4a6eb3 0%, #2a4073 100%);
  padding: ${PREMIUM_SPACING.xl}px;
  border-radius: 8px;
  color: white;
  text-align: center;
  margin-top: ${PREMIUM_SPACING.xxl}px;
`;

const CtaHeading = styled.h2`
  margin-bottom: ${PREMIUM_SPACING.lg}px;
  font-size: 1.75rem;
  font-weight: 600;
`;

const CtaText = styled.p`
  margin-bottom: ${PREMIUM_SPACING.xl}px;
  font-size: 1.125rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
`;

/**
 * ServicesProcess Component
 * 
 * Displays the step-by-step recovery process timeline
 * with a call to action section.
 */
const ServicesProcess: React.FC<ServicesProcessProps> = ({
  backgroundColor = "#f9fafb",
  ctaText,
  ctaUrl = "/booking"
}) => {
  const { t } = useTranslation();
  
  return (
    <Section backgroundColor={backgroundColor}>
      <Container>
        <SectionContent>
          <RecoveryTimeline 
            title={t('services.processTitle')}
            description={t('services.processSubtitle')}
          />
          
          <ScrollReveal threshold={0.2}>
            <CtaContainer>
              <CtaHeading>{t('services.ctaTitle')}</CtaHeading>
              <CtaText>
                {t('services.ctaSubtitle')}
              </CtaText>
              <Button 
                variant="accent" 
                size="lg"
                href={ctaUrl}
              >
                {ctaText || t('services.bookConsultation')}
              </Button>
            </CtaContainer>
          </ScrollReveal>
        </SectionContent>
      </Container>
    </Section>
  );
};

export default ServicesProcess; 














