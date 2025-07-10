import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import DynamicSEO from '../../components/SEO/DynamicSEO';
import { formatCurrencyCAD } from '../../utils/formatters';
import { COMPANY_PROFILE_CA } from '../../constants/companyProfile.ca';

export const AboutPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Container id="about-page-container">
      <DynamicSEO 
        page="about"
        isTransactional={false}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "mainEntity": {
            "@type": "FinancialService",
            "name": "Recovery Office",
            "foundingDate": "2019",
            "founder": {
              "@type": "Organization",
              "name": "Recovery Office Limited"
            },
            "speciality": [
              "Cryptocurrency Recovery",
              "Investment Fraud Recovery", 
              "Financial Scam Recovery",
              "Regulatory Compliance"
            ],
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "2nd Floor, 3 Piccadilly Place, London Road",
              "addressLocality": "Manchester",
              "addressRegion": "Greater Manchester",
              "postalCode": "M1 3BN",
              "addressCountry": "GB"
            }
          }
        }}
      />

      {/* Premium Hero Section */}
      <HeroSection id="about-hero-section">
        <HeroContent>
          <div>
            <HeroBadge>
              {t('about.hero.establishedBadge', 'Established 2019')}
            </HeroBadge>
            <HeroTitle>
              {t('about.hero.title', 'About Recovery Office')}
            </HeroTitle>
            <HeroSubtitle>
              {t('about.hero.subtitle', 'The UK\'s Premier Financial Asset Recovery Consultancy')}
            </HeroSubtitle>
            <HeroStats>
              <StatItem>
                <StatNumber>{formatCurrencyCAD(750000000).replace('.00', '')}+</StatNumber>
                <StatLabel>{t('about.metrics.assetsUnderRecovery', 'Assets Recovered')}</StatLabel>
              </StatItem>
              <StatItem>
                <StatNumber>2,500+</StatNumber>
                <StatLabel>{t('statistics.casesResolved', 'Cases Resolved')}</StatLabel>
              </StatItem>
              <StatItem>
                <StatNumber>98%</StatNumber>
                <StatLabel>{t('about.metrics.clientSatisfaction', 'Client Satisfaction')}</StatLabel>
              </StatItem>
              <StatItem>
                <StatNumber>24/7</StatNumber>
                <StatLabel>{t('about.metrics.expertResponse', 'Expert Support')}</StatLabel>
              </StatItem>
            </HeroStats>
          </div>
          <HeroImageWrapper>
            <HeroImage 
              src="https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?auto=format&fit=crop&w=800&q=80"
              alt="Recovery Office Manchester headquarters building"
              width="800"
              height="400"
              loading="lazy"
              decoding="async"
            />
          </HeroImageWrapper>
        </HeroContent>
      </HeroSection>

      {/* Company Story Section */}
      <StorySection id="about-story-section">
        <ContentWrapper>
          <SectionHeader>
            <SectionBadge>{t('about.story.badge', 'Our Story')}</SectionBadge>
            <SectionTitle>{t('about.story.title', 'Built on Trust, Driven by Results')}</SectionTitle>
          </SectionHeader>
          <StoryGrid>
            <StoryContent>
              <StoryText>
                {t('about.story.content', 'Recovery Office was founded in 2019 by a consortium of cybersecurity experts, financial investigators, and former law enforcement professionals who recognized the critical need for specialized recovery services in the rapidly evolving digital asset landscape. As cryptocurrency adoption accelerated, so did sophisticated fraud schemes targeting innocent investors. Our founders, having witnessed countless victims lose life savings to elaborate scams, decided to combine their expertise to fight back against financial crime and help victims reclaim their stolen assets. Today, we operate as Canada\'s leading financial recovery firm with offices in Toronto, Vancouver, and Montreal.')}
              </StoryText>
              
              {/* Add proper list markup for SEO */}
              <h3>Our Key Achievements</h3>
              <ul>
                <li><strong>{formatCurrencyCAD(750000000).replace('.00', '')}+ Assets Successfully Recovered</strong> since 2019 establishment</li>
                <li><strong>98% Client Satisfaction Rate</strong> across all recovery services</li>
                <li><strong>2,500+ Cases Resolved</strong> with professional expertise</li>
                <li><strong>24/7 Emergency Response</strong> for urgent financial recovery cases</li>
                <li><strong>CIRO Regulated Operations</strong> ensuring compliance and trust</li>
                <li><strong>Zero Security Breaches</strong> maintaining client confidentiality</li>
              </ul>
            </StoryContent>
            <StoryFeatures>
              <FeatureItem>
                <FeatureIcon>🏛️</FeatureIcon>
                <FeatureTitle>{t('credentials.ciro.title', 'CIRO Regulated')}</FeatureTitle>
                <FeatureDescription>
                  {t('about.story.ciroDescription', 'Fully regulated by the Canadian Investment Regulatory Organization for investment advisory services')}
                </FeatureDescription>
              </FeatureItem>
              <FeatureItem>
                <FeatureIcon>🛡️</FeatureIcon>
                <FeatureTitle>{t('about.regulatory.frameworks.iso27001', 'ISO 27001 Certified')}</FeatureTitle>
                <FeatureDescription>
                  {t('about.story.isoDescription', 'Information security management certified to international standards')}
                </FeatureDescription>
              </FeatureItem>
              <FeatureItem>
                <FeatureIcon>⚖️</FeatureIcon>
                <FeatureTitle>{t('about.story.legalTitle', 'Legal Compliance')}</FeatureTitle>
                <FeatureDescription>
                  {t('about.story.legalDescription', 'All recovery operations conducted within strict legal frameworks')}
                </FeatureDescription>
              </FeatureItem>
            </StoryFeatures>
          </StoryGrid>
        </ContentWrapper>
      </StorySection>

      {/* Expertise & Certifications */}
      <ExpertiseSection id="about-expertise-section">
        <ContentWrapper>
          <SectionHeader>
            <SectionBadge>{t('about.capabilities.badge', 'Our Expertise')}</SectionBadge>
            <SectionTitle>{t('about.capabilities.title', 'Our Core Capabilities')}</SectionTitle>
          </SectionHeader>
          
          {/* Add strong importance elements and list structure */}
          <h3>Professional Capabilities & Technologies</h3>
          <ExpertiseGrid>
            <ExpertiseCard>
              <CardIcon>🔍</CardIcon>
              <CardTitle>{t('about.capabilities.forensics.title', 'Advanced Digital Forensics')}</CardTitle>
              <CardDescription>
                {t('about.capabilities.forensics.description', 'Blockchain analysis, cryptocurrency tracing, and digital evidence recovery using institutional-grade forensic tools')}
              </CardDescription>
              <CardTools>
                <Tool><strong>{t('about.capabilities.toolsBlockchain', 'Chainalysis Reactor')}</strong></Tool>
                <Tool><strong>{t('about.capabilities.toolsElliptic', 'Elliptic Investigator')}</strong></Tool>
                <Tool><strong>{t('about.capabilities.toolsCipher', 'CipherTrace Arsenal')}</strong></Tool>
              </CardTools>
            </ExpertiseCard>

            <ExpertiseCard>
              <CardIcon>⚖️</CardIcon>
              <CardTitle>{t('about.capabilities.advocacy.title', 'Regulatory Advocacy')}</CardTitle>
              <CardDescription>
                {t('about.capabilities.advocacy.description', 'Strategic coordination with CIRO, international regulatory bodies, and law enforcement agencies')}
              </CardDescription>
              <CardTools>
                <Tool><strong>{t('about.capabilities.toolsFreeze', 'High Court Freezing Orders')}</strong></Tool>
                <Tool><strong>{t('about.capabilities.toolsNetwork', 'International Legal Network')}</strong></Tool>
                <Tool><strong>{t('about.capabilities.toolsAssist', 'Mutual Legal Assistance')}</strong></Tool>
              </CardTools>
            </ExpertiseCard>

            <ExpertiseCard>
              <CardIcon>🏦</CardIcon>
              <CardTitle>{t('about.capabilities.legal.title', 'Legal Coordination')}</CardTitle>
              <CardDescription>
                {t('about.capabilities.legal.description', 'Collaboration with leading law firms specializing in financial crime and asset recovery')}
              </CardDescription>
              <CardTools>
                <Tool><strong>{t('about.capabilities.toolsSwift', 'SWIFT Network Analysis')}</strong></Tool>
                <Tool><strong>{t('about.capabilities.toolsOffshore', 'Offshore Structure Investigation')}</strong></Tool>
                <Tool><strong>{t('about.capabilities.toolsMapping', 'Asset Mapping & Valuation')}</strong></Tool>
              </CardTools>
            </ExpertiseCard>
          </ExpertiseGrid>
        </ContentWrapper>
      </ExpertiseSection>

      {/* Success Metrics & Social Proof */}
      <MetricsSection id="about-metrics-section">
        <ContentWrapper>
          <h2>Our Professional Track Record</h2>
          <MetricsGrid>
            <MetricCard>
              <MetricNumber>{formatCurrencyCAD(750000000).replace('.00', '')}+</MetricNumber>
              <MetricLabel>{t('about.metrics.assetsUnderRecovery', 'Assets Under Recovery')}</MetricLabel>
              <MetricDescription>{t('statistics.mainTitle', 'Trusted by High-Net-Worth Clients Worldwide')}</MetricDescription>
            </MetricCard>
            <MetricCard>
              <MetricNumber>98%</MetricNumber>
              <MetricLabel>{t('about.metrics.clientSatisfaction', 'Client Satisfaction Rate')}</MetricLabel>
              <MetricDescription>{t('about.metrics.fcaRegulated', 'Regulated & Compliant')}</MetricDescription>
            </MetricCard>
            <MetricCard>
              <MetricNumber>CIRO</MetricNumber>
              <MetricLabel>{t('about.metrics.ciroRegulated', 'CIRO Regulated')}</MetricLabel>
              <MetricDescription><strong>Recovery Office is CIRO regulated</strong> with business number <strong>{COMPANY_PROFILE_CA.businessNumber}</strong></MetricDescription>
            </MetricCard>
            <MetricCard>
              <MetricNumber>100%</MetricNumber>
              <MetricLabel>{t('about.metrics.zeroBreach', 'Zero Breach Record')}</MetricLabel>
              <MetricDescription>We have successfully recovered <strong>over {formatCurrencyCAD(750000000).replace('.00', '')} million</strong> for our clients</MetricDescription>
            </MetricCard>
          </MetricsGrid>
        </ContentWrapper>
      </MetricsSection>

      {/* Contact Information Section */}
      <ContactSection id="about-contact-section">
        <ContentWrapper>
          <SectionHeader>
            <SectionBadge>{t('contact.offices.uk.title', 'Head Office United Kingdom')}</SectionBadge>
            <SectionTitle>{t('contact.title', 'Contact Our Experts')}</SectionTitle>
          </SectionHeader>
          <ContactGrid>
            <ContactCard>
              <ContactIcon>🏢</ContactIcon>
              <ContactTitle>{t('contact.offices.uk.title', 'Head Office')}</ContactTitle>
              <ContactDetails>
                <ContactLine>{t('contact.offices.uk.address', '2nd Floor, 3 Piccadilly Place')}</ContactLine>
                <ContactLine>London Road</ContactLine>
                <ContactLine>Manchester, M1 3BN</ContactLine>
                <ContactLine>United Kingdom</ContactLine>
              </ContactDetails>
            </ContactCard>
            
            <ContactCard>
              <ContactIcon>📞</ContactIcon>
              <ContactTitle>{t('contact.info.consultation', 'Priority Consultation')}</ContactTitle>
              <ContactDetails>
                <ContactLink href="/booking">{t('contact.booking', 'Schedule Consultation')}</ContactLink>
                <ContactNote>{t('contact.info.availability', 'Available 24/7 for urgent cases')}</ContactNote>
              </ContactDetails>
            </ContactCard>
            
            <ContactCard>
              <ContactIcon>📧</ContactIcon>
              <ContactTitle>{t('contact.info.email', 'Email Support')}</ContactTitle>
              <ContactDetails>
                <ContactLink href="mailto:info@recovery-office.com">{t('contact.offices.uk.email', 'info@recovery-office.com')}</ContactLink>
                <ContactNote>{t('contact.info.response', 'Response within 2 hours')}</ContactNote>
              </ContactDetails>
            </ContactCard>
            
            <ContactCard>
              <ContactIcon>🏛️</ContactIcon>
              <ContactTitle>{t('footer.companiesHouse', 'Company Registration')}</ContactTitle>
              <ContactDetails>
                <ContactLine>{t('footer.companiesHouse', 'Companies House: 14587923')}</ContactLine>
                <ContactLine><strong>Firm Reference: 836358</strong></ContactLine>
                <ContactNote>{t('footer.allRightsReserved', 'Registered in England and Wales')}</ContactNote>
              </ContactDetails>
            </ContactCard>
          </ContactGrid>
        </ContentWrapper>
      </ContactSection>

      {/* Call to Action */}
      <CTASection id="about-cta-section">
        <ContentWrapper>
          <CTAContent>
            <CTATitle>{t('about.cta.title', 'Ready to Discuss Your Case?')}</CTATitle>
            <CTASubtitle>
              {t('about.cta.subtitle', 'Schedule a confidential consultation with our recovery specialists.')}
            </CTASubtitle>
            <CTAButtons>
              <PrimaryCTA to="/booking">
                {t('about.cta.button', 'Book Professional Consultation')}
              </PrimaryCTA>
              <SecondaryCTA href="mailto:contact@recovery-office.ca">
                Email Recovery Office Directly
              </SecondaryCTA>
            </CTAButtons>
            <CTANote>
              {t('footer.disclaimer', 'Professional financial recovery consultation services')}
            </CTANote>
          </CTAContent>
        </ContentWrapper>
      </CTASection>
    </Container>
  );
};

// Premium Styled Components with responsive design
const Container = styled.div`
  min-height: 100vh;
  max-width: 100vw;
  overflow-x: hidden;
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, #1a365d 0%, #2c5282 50%, #1a365d 100%);
  color: white;
  padding: 100px 0;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>') repeat;
    opacity: 0.05;
  }
`;

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: center;
  position: relative;
  z-index: 1;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 32px;
    text-align: center;
  }
`;

const HeroBadge = styled.div`
  display: inline-block;
  background: rgba(214, 158, 46, 0.2);
  color: #d69e2e;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 24px;
  border: 1px solid rgba(214, 158, 46, 0.3);
`;

const HeroTitle = styled.h1`
  font-size: 56px;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 24px;
  
  @media (max-width: 768px) {
    font-size: 42px;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 20px;
  line-height: 1.6;
  opacity: 0.9;
  margin-bottom: 48px;
  
  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const HeroStats = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: #d69e2e;
  margin-bottom: 8px;
`;

const StatLabel = styled.div`
  font-size: 14px;
  opacity: 0.8;
`;

const HeroImageWrapper = styled.div`
  position: relative;
`;

const HeroImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
`;

const StorySection = styled.section`
  padding: 120px 0;
  background: white;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 80px;
`;

const SectionBadge = styled.div`
  display: inline-block;
  background: #f7fafc;
  color: #d69e2e;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 16px;
  border: 1px solid #e2e8f0;
`;

const SectionTitle = styled.h2`
  font-size: 48px;
  font-weight: 700;
  color: #1a365d;
  margin-bottom: 16px;
  
  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

const StoryGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 80px;
  align-items: start;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 48px;
  }
`;

const StoryContent = styled.div``;

const StoryText = styled.p`
  font-size: 18px;
  line-height: 1.8;
  color: #4a5568;
  margin-bottom: 32px;
`;

const StoryFeatures = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const FeatureItem = styled.div`
  padding: 24px;
  background: #f7fafc;
  border-radius: 12px;
  border-left: 4px solid #d69e2e;
`;

const FeatureIcon = styled.div`
  font-size: 32px;
  margin-bottom: 12px;
`;

const FeatureTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1a365d;
  margin-bottom: 8px;
`;

const FeatureDescription = styled.p`
  font-size: 14px;
  color: #4a5568;
  line-height: 1.5;
`;

const ExpertiseSection = styled.section`
  padding: 120px 0;
  background: white;
`;

const ExpertiseGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 48px;
`;

const ExpertiseCard = styled.div`
  padding: 40px;
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 16px;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #d69e2e;
    transform: translateY(-4px);
    box-shadow: 0 16px 48px rgba(0, 0, 0, 0.1);
  }
`;

const CardIcon = styled.div`
  font-size: 48px;
  margin-bottom: 24px;
`;

const CardTitle = styled.h3`
  font-size: 24px;
  font-weight: 600;
  color: #1a365d;
  margin-bottom: 16px;
`;

const CardDescription = styled.p`
  font-size: 16px;
  color: #4a5568;
  line-height: 1.6;
  margin-bottom: 24px;
`;

const CardTools = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Tool = styled.div`
  font-size: 14px;
  color: #2d3748;
  padding: 8px 12px;
  background: #edf2f7;
  border-radius: 6px;
`;

const MetricsSection = styled.section`
  padding: 120px 0;
  background: #f7fafc;
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 32px;
  margin-top: 48px;
`;

const MetricCard = styled.div`
  text-align: center;
  padding: 32px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
`;

const MetricNumber = styled.div`
  font-size: 36px;
  font-weight: 700;
  color: #d69e2e;
  margin-bottom: 8px;
`;

const MetricLabel = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #1a365d;
  margin-bottom: 8px;
`;

const MetricDescription = styled.div`
  font-size: 14px;
  color: #4a5568;
  line-height: 1.5;
`;

const ContactSection = styled.section`
  padding: 120px 0;
  background: white;
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 32px;
`;

const ContactCard = styled.div`
  padding: 32px;
  background: #f7fafc;
  border-radius: 16px;
  text-align: center;
`;

const ContactIcon = styled.div`
  font-size: 32px;
  margin-bottom: 16px;
`;

const ContactTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1a365d;
  margin-bottom: 16px;
`;

const ContactDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ContactLine = styled.div`
  font-size: 14px;
  color: #4a5568;
`;

const ContactLink = styled.a`
  font-size: 16px;
  font-weight: 600;
  color: #d69e2e;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const ContactNote = styled.div`
  font-size: 12px;
  color: #718096;
  font-style: italic;
`;

const CTASection = styled.section`
  padding: 120px 0;
  background: linear-gradient(135deg, #1a365d 0%, #2c5282 100%);
  color: white;
  text-align: center;
`;

const CTAContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const CTATitle = styled.h2`
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 24px;
  
  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

const CTASubtitle = styled.p`
  font-size: 20px;
  opacity: 0.9;
  margin-bottom: 48px;
`;

const CTAButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-bottom: 32px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const PrimaryCTA = styled(Link)`
  background: #d69e2e;
  color: white;
  padding: 16px 32px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    background: #b7791f;
    transform: translateY(-2px);
  }
`;

const SecondaryCTA = styled.a`
  background: transparent;
  color: white;
  padding: 16px 32px;
  border: 2px solid white;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    background: white;
    color: #1a365d;
  }
`;

const CTANote = styled.p`
  font-size: 14px;
  opacity: 0.7;
  margin: 0;
`;

export default AboutPage; 