import React from 'react';
import { useTranslation } from 'react-i18next';
import DynamicSEO from '../../components/SEO/DynamicSEO';
import GoogleAnalytics from '../../components/tracking/GoogleAnalytics';
import { 
  SecurityShield, 
  ComplianceBadge 
} from '../../design-system/components/utility/FinancialIcons';
import { 
  Box, 
  Container, 
  GoldenSection 
} from '../../design-system/components/layout';
import { 
  Section, 
  SectionTitle
} from '../../design-system/components/layout/Section';
import { Text, Paragraph } from '../../design-system/components/typography';
import { 
  ScrollReveal 
} from '../../animation';

// Import our premium components
import PremiumHero from '../../components/sections/premium/PremiumHero';
import { PremiumServicesSection } from '../../components/sections/premium/PremiumServicesSection';
import { PremiumTestimonials } from '../../components/sections/premium/PremiumTestimonials';
import { PremiumTeam } from '../../components/sections/premium/PremiumTeam';
import { RecoveryTimeline } from '../../components/sections/premium/RecoveryTimeline';
import { RegulatoryPanel } from '../../components/sections/premium/RegulatoryPanel';
import PremiumBookingCTA from './sections/HomeCallToAction';
import PremiumStatistics from '../../components/sections/premium/PremiumStatistics';

/**
 * Home Page Component with Full German Language Support
 * 
 * This component represents the main landing page of the Recovery Office website.
 * Supports multilingual content through i18next with German formatting and professional terminology.
 */
const Home: React.FC = () => {
  const { t, i18n } = useTranslation();

  return (
    <Box as="main">
      {/* NEW: Fixed SEO Implementation */}
      <DynamicSEO 
        page="home"
        isTransactional={false}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Recovery Office",
          "alternateName": "Recovery Office Limited",
          "description": "UK's premier financial asset recovery consultancy specializing in cryptocurrency recovery, investment fraud, and regulatory compliance assistance.",
          "slogan": "Excellence in Financial Recovery",
          "knowsAbout": [
            "Financial Asset Recovery",
            "Cryptocurrency Recovery", 
            "Investment Fraud Recovery",
            "Blockchain Forensics",
            "Regulatory Compliance",
            "FCA Regulation"
          ],
          "hasCredential": [
            {
              "@type": "EducationalOccupationalCredential",
              "name": "FCA Authorization",
              "credentialCategory": "Financial Services Authorization",
              "recognizedBy": {
                "@type": "Organization",
                "name": "Financial Conduct Authority"
              }
            }
          ]
        }}
      />
      
      {/* Google Analytics 4 & Conversion Tracking */}
      <GoogleAnalytics 
        pageTitle="Recovery Office Homepage"
        pagePath="/"
        isTransactional={false}
        serviceType="Financial Recovery Services"
      />
      
      {/* Premium Hero Section with Translation Support */}
      <PremiumHero
        title={
          <>
            <span className="accent">{t('hero.title').split(' ').slice(0, 2).join(' ')}</span>{' '}
            {t('hero.title').split(' ').slice(2).join(' ')}
          </>
        }
        subtitle={t('hero.subtitle')}
        primaryButtonText={t('hero.ctaPrimary')}
        primaryButtonUrl="/booking"
        secondaryButtonText={t('hero.ctaSecondary')}
        secondaryButtonUrl="/services"
        showLogo={true}
      />

      {/* Premium Trust Statistics Section */}
      <ScrollReveal>
        <PremiumStatistics />
      </ScrollReveal>

      {/* Premium Services Section */}
      <ScrollReveal>
        <PremiumServicesSection 
          title={t('services.title')}
          description={t('services.subtitle')}
        />
      </ScrollReveal>

      {/* Recovery Timeline Section */}
      <ScrollReveal>
        <RecoveryTimeline 
          title={i18n.language === 'de' ? 'Unser Rückgewinnungsprozess' : 'Our Recovery Process'}
          description={i18n.language === 'de' ? 'Ein systematischer Ansatz zur Rückgewinnung Ihrer finanziellen Vermögenswerte' : 'A systematic approach to recovering your financial assets'}
        />
      </ScrollReveal>

      {/* About Section with German Content */}
      <ScrollReveal>
        <Section backgroundColor="#ffffff">
          <Container>
            <GoldenSection
              rightContent={
                <Box position="relative" width="100%" height="100%">
                  <Box 
                    position="absolute" 
                    top="50%" 
                    left="50%" 
                    transform="translate(-50%, -50%)"
                  >
                    <SecurityShield 
                      size="lg"
                      opacity={0.8}
                    />
                  </Box>
                </Box>
              }
            >
              <SectionTitle 
                title={i18n.language === 'de' ? 'Unser Regulierter Ansatz' : 'Our Regulated Approach'}
                subtitle={i18n.language === 'de' ? 'Rückgewinnung unterstützt durch regulatorische Compliance' : 'Recovery backed by regulatory compliance'}
                size="medium"
                align="left"
                decoratorBefore={<ComplianceBadge size="sm" opacity={0.5} />}
              />
              <Box mt={4}>
                <Paragraph variant="body1">
                  {i18n.language === 'de' 
                    ? 'Unter Verwendung von Prinzipien aus Finanzvorschriften und Industriestandards erstellen wir umfassende Rückgewinnungsstrategien, die Ihre Chancen auf die Rückgewinnung verlorener Vermögenswerte maximieren und gleichzeitig die vollständige Einhaltung geltender Gesetze gewährleisten.'
                    : 'Using principles derived from financial regulations and industry best practices, we create comprehensive recovery strategies that maximize your chances of recovering lost assets while ensuring full compliance with applicable laws.'
                  }
                </Paragraph>
                <Paragraph variant="body1">
                  {i18n.language === 'de'
                    ? 'Unser Ansatz schafft einen systematischen Weg zur Rückgewinnung und bietet Klarheit und Transparenz während des gesamten Prozesses. Unsere Methoden wurden durch Jahre erfolgreicher Falllösungen und regulatorischer Anpassung verfeinert.'
                    : 'Our approach creates a systematic pathway to recovery, offering clarity and transparency throughout the process. Our methods have been refined through years of successful case resolutions and regulatory adaptation.'
                  }
                </Paragraph>
                <Box mt={4} display="flex" alignItems="center">
                  <ComplianceBadge size="sm" opacity={0.7} style={{ marginRight: '8px' }} />
                  <Text variant="subtitle2">
                    {i18n.language === 'de' 
                      ? 'Regulierte Expertise in jedem Aspekt der Rückgewinnung'
                      : 'Regulated expertise in every aspect of recovery'
                    }
                  </Text>
                </Box>
              </Box>
            </GoldenSection>
          </Container>
        </Section>
      </ScrollReveal>

      {/* Regulatory Panel Section */}
      <ScrollReveal>
        <RegulatoryPanel />
      </ScrollReveal>

      {/* Premium Testimonials Section */}
      <ScrollReveal>
        <PremiumTestimonials 
          title={i18n.language === 'de' ? 'Kundenerfahrungen' : 'Client Experiences'}
          description={i18n.language === 'de' ? 'Entdecken Sie, wie unser Ansatz anderen geholfen hat' : 'Discover how our approach has helped others'}
        />
      </ScrollReveal>

      {/* Premium Team Section */}
      <ScrollReveal>
        <PremiumTeam 
          title={i18n.language === 'de' ? 'Unser Expertenteam' : 'Our Expert Team'}
          description={i18n.language === 'de' ? 'Lernen Sie unsere erfahrenen Spezialisten kennen, die sich Ihrer finanziellen Rückgewinnung widmen' : 'Meet our experienced specialists committed to your financial recovery'}
        />
      </ScrollReveal>

      {/* Premium Booking CTA Section */}
      <ScrollReveal>
        <PremiumBookingCTA />
      </ScrollReveal>
    </Box>
  );
};

export default Home; 






