import * as React from 'react';
import { SEO } from '../../components/common';
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

/**
 * Home Page Component
 * 
 * This component represents the main landing page of the Recovery Office website.
 */
const Home: React.FC = () => {
  return (
    <Box as="main">
      <SEO 
        title="Home"
        description="Recovery Office provides premium financial recovery services backed by regulatory compliance and expert specialists."
        canonical="https://recoveryoffice.com"
      />
      
      {/* Premium Hero Section */}
      <PremiumHero
        title="Financial Asset Recovery Experts"
        subtitle="Professional services helping individuals and businesses recover lost financial assets with regulatory expertise and proven methodology."
        primaryButtonText="Book a Consultation"
        primaryButtonUrl="/booking"
        secondaryButtonText="Learn More"
        secondaryButtonUrl="/services"
        showLogo={true}
      />

      {/* Premium Services Section */}
      <ScrollReveal>
        <PremiumServicesSection 
          title="Our Services"
          description="Comprehensive recovery services that combine regulatory expertise with advanced techniques"
        />
      </ScrollReveal>

      {/* Recovery Timeline Section */}
      <ScrollReveal>
        <RecoveryTimeline 
          title="Our Recovery Process"
          description="A systematic approach to recovering your financial assets"
        />
      </ScrollReveal>

      {/* About Section */}
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
                title="Our Regulated Approach" 
                subtitle="Recovery backed by regulatory compliance"
                size="medium"
                align="left"
                decoratorBefore={<ComplianceBadge size="sm" opacity={0.5} />}
              />
              <Box mt={4}>
                <Paragraph variant="body1">
                  Using principles derived from financial regulations and industry best practices,
                  we create comprehensive recovery strategies that maximize your chances of recovering
                  lost assets while ensuring full compliance with applicable laws.
                </Paragraph>
                <Paragraph variant="body1">
                  Our approach creates a systematic pathway to recovery, offering clarity and transparency
                  throughout the process. Our methods have been refined through years of successful
                  case resolutions and regulatory adaptation.
                </Paragraph>
                <Box mt={4} display="flex" alignItems="center">
                  <ComplianceBadge size="sm" opacity={0.7} style={{ marginRight: '8px' }} />
                  <Text variant="subtitle2">Regulated expertise in every aspect of recovery</Text>
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
          title="Client Experiences"
          description="Discover how our approach has helped others"
        />
      </ScrollReveal>

      {/* Premium Team Section */}
      <ScrollReveal>
        <PremiumTeam 
          title="Our Expert Team"
          description="Meet our experienced specialists committed to your financial recovery"
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






