import * as React from 'react';
import { useEffect } from 'react';
import { Hero, Team } from '../../design-system/components/feature-sections';
import { Box, Container } from '../../design-system/components/layout';
import { Section, SectionTitle } from '../../design-system/components/layout/Section';
import { Text, Heading } from '../../design-system/components/typography';
import { PremiumButton } from '../../design-system/components/button';
import { ScrollReveal } from '../../animation';
import { PHI } from '../../constants/sacred-geometry';
import { FlowerOfLife } from '../../design-system/botanical';
import { useTheme } from '../../design-system/theme/ThemeProvider';

// Import section components
import { 
  AwardsSection, 
  TestimonialsSection, 
  FAQSection, 
  RegulatorySection, 
  ValuesSection,
  MissionSection,
  TimelineSection
} from './sections';

// Define team member type
interface TeamMember {
  id: string;
  name: string;
  role: string;
  photoUrl: string;
  bio: string;
  specialties: string[];
  links: Array<{ type: 'linkedin' | 'twitter' | 'website'; url: string }>;
  accentColor: string;
  credentials: string[];
}

/**
 * About Page Component
 * 
 * This component represents the about page of the Recovery Office website.
 * It displays the company mission, values, team members, and regulatory compliance
 * information for the financial recovery services.
 */
const AboutPage: React.FC = () => {
  // Access theme context
  const { theme } = useTheme();
  
  // Verify theme is loaded correctly
  useEffect(() => {
    if (theme) {
      console.log('Theme loaded in About page:', theme.mode);
    }
  }, [theme]);
  
  // Check if the theme is available to avoid errors
  if (!theme) {
    return (
      <Box p={8} textAlign="center">
        <Heading as="h2" variant="h3">
          Loading theme...
        </Heading>
        <Text>Please wait while we initialize the theme.</Text>
      </Box>
    );
  }
  
  // Team members data
  const teamMembers: TeamMember[] = [
    {
      id: 'tm1',
      name: 'Dr. Elizabeth Harper',
      role: 'Financial Recovery Director',
      photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
      bio: 'With over 15 years of experience in financial recovery and regulatory compliance, Dr. Harper specializes in complex investment fraud cases. Her expertise has helped recover over $50 million in assets for clients across various sectors.',
      specialties: ['Investment Fraud', 'Regulatory Compliance', 'Asset Recovery Strategy'],
      links: [
        { type: 'linkedin', url: 'https://linkedin.com' },
        { type: 'twitter', url: 'https://twitter.com' }
      ],
      accentColor: '#4a6eb3',
      credentials: ['Ph.D. in Financial Law', 'Certified Fraud Examiner (CFE)']
    },
    {
      id: 'tm2',
      name: 'James Anderson',
      role: 'Technical Recovery Specialist',
      photoUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
      bio: 'James leads our technical recovery team, specializing in cryptocurrency tracing and digital forensics. His innovative approaches to tracking and recovering digital assets have made him a leader in this emerging field.',
      specialties: ['Cryptocurrency Recovery', 'Digital Forensics', 'Blockchain Analysis'],
      links: [
        { type: 'linkedin', url: 'https://linkedin.com' },
        { type: 'twitter', url: 'https://twitter.com' }
      ],
      accentColor: '#86b378',
      credentials: ['M.S. in Computer Science', 'Certified Cryptocurrency Investigator']
    },
    {
      id: 'tm3',
      name: 'Sarah Williams',
      role: 'Client Relations Manager',
      photoUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80',
      bio: 'Sarah ensures our clients receive clear communication throughout the recovery process. Her background in financial education helps clients understand the complex procedures involved in asset recovery.',
      specialties: ['Client Advocacy', 'Recovery Planning', 'Financial Education'],
      links: [
        { type: 'linkedin', url: 'https://linkedin.com' },
        { type: 'website', url: 'https://example.com' }
      ],
      accentColor: '#d4a76a',
      credentials: ['Certified Financial Educator', 'Dispute Resolution Certified']
    },
    {
      id: 'tm4',
      name: 'Michael Chen',
      role: 'Legal Recovery Advisor',
      photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80',
      bio: 'Michael specializes in the legal aspects of financial recovery, including court proceedings, regulatory filings, and cross-border asset recovery issues. His expertise is crucial for cases requiring legal intervention.',
      specialties: ['Legal Proceedings', 'Cross-Border Recovery', 'Regulatory Filings'],
      links: [
        { type: 'linkedin', url: 'https://linkedin.com' },
        { type: 'website', url: 'https://example.com/research' }
      ],
      accentColor: '#5d6e8f',
      credentials: ['J.D. Financial Law', 'International Asset Recovery Certified']
    }
  ];

  // Hero section background
  const heroBackgroundUrl = 'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?auto=format&fit=crop&w=1920&q=80';

  return (
    <Box as="main">
      {/* Hero Section */}
      <Hero
        heading="About Recovery Office"
        subheading="Experts in financial asset recovery and investment fraud resolution"
        background={{
          image: heroBackgroundUrl,
          overlay: 'rgba(21, 45, 85, 0.8)'
        }}
        align="center"
        minHeight="60vh"
        animated={true}
        botanical={{
          type: 'flowerOfLife',
          position: 'bottomRight',
          opacity: 0.15,
          animated: true
        }}
      >
        <Text variant="body1" style={{ maxWidth: `${PHI * 400}px`, margin: '0 auto', color: 'white' }}>
          Recovery Office specializes in helping individuals and businesses recover 
          financial assets lost to fraud, scams, and failed investments. Our team 
          combines legal expertise, financial knowledge, and technical skills to 
          maximize recovery potential.
        </Text>
      </Hero>

      {/* Mission Section */}
      <MissionSection />

      {/* Core Values Section */}
      <ValuesSection />

      {/* Timeline Section */}
      <ScrollReveal>
        <div id="history">
          <TimelineSection />
        </div>
      </ScrollReveal>

      {/* Enhanced Regulatory Section */}
      <ScrollReveal>
        <div id="regulatory">
          <Section backgroundColor="#ffffff">
            <Container>
              <SectionTitle 
                title="Regulatory Compliance" 
                subtitle="Operating to the highest standards of regulatory compliance"
                align="center"
              />
              <Box maxWidth="800px" mx="auto" mb={5}>
                <Text variant="body1" textAlign="center">
                  We maintain strict compliance with all applicable financial regulations across multiple jurisdictions.
                  Our services are authorized by relevant regulatory bodies, including the Financial Conduct Authority (FCA),
                  which ensures we operate with transparency, fairness, and accountability.
                </Text>
              </Box>
              <RegulatorySection />
            </Container>
          </Section>
        </div>
      </ScrollReveal>

      {/* Team Section */}
      <div id="team">
        <Team 
          title="Our Recovery Experts"
          subtitle="Meet the specialists who will handle your case"
          members={teamMembers}
          backgroundColor="#f9fafb"
          displayStyle="grid"
          columns={4}
          showDetailedBio={true}
          animated={true}
          botanical={{
            type: 'flowerOfLife',
            position: 'bottomRight',
            opacity: 0.15
          }}
        />
      </div>

      {/* Testimonials Section - Reusing existing component */}
      <TestimonialsSection />

      {/* CTA Section */}
      <ScrollReveal>
        <Section 
          backgroundColor="#0A214F"
          style={{
            padding: `${PHI * 48}px 0`,
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <Box 
            position="absolute" 
            right={`${PHI * 16}px`} 
            bottom={`-${PHI * 32}px`}
            opacity={0.08}
            zIndex={0}
          >
            <FlowerOfLife size="xxl" color="#ffffff" />
          </Box>
          
          <Container centerContent>
            <Box 
              textAlign="center" 
              maxWidth="800px" 
              zIndex={1}
              position="relative"
            >
              <Heading 
                as="h2" 
                variant="h2"
                mb={4}
                color="white"
              >
                Ready to Recover Your Assets?
              </Heading>
              
              <Text 
                variant="body1" 
                mb={5}
                color="rgba(255, 255, 255, 0.9)"
              >
                Our financial recovery experts are ready to evaluate your case and develop 
                a strategic recovery plan. Schedule your confidential consultation today 
                to take the first step toward recovering your assets.
              </Text>
              
              <PremiumButton 
                size="lg" 
                variant="gold" 
                href="/booking"
              >
                Book Your Consultation
              </PremiumButton>
            </Box>
          </Container>
        </Section>
      </ScrollReveal>

      {/* Awards Section - Reusing existing component */}
      <AwardsSection />

      {/* FAQ Section - Reusing existing component */}
      <FAQSection />
    </Box>
  );
};

export default AboutPage;