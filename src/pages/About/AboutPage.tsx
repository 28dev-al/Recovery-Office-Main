import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export const AboutPage: React.FC = () => {
  return (
    <Container>
      <Helmet>
        <title>About Recovery Office - Leading Financial Recovery Specialists | Manchester, UK</title>
        <meta name="description" content="Recovery Office is the UK's premier financial recovery firm based in Manchester. Specializing in cryptocurrency theft, investment fraud, and complex asset recovery. Company Number: 06621703. Call +44 7451 263372." />
        <meta name="keywords" content="financial recovery, cryptocurrency recovery, investment fraud, asset recovery, UK financial specialists, Manchester, Recovery Office" />
        <meta name="author" content="Recovery Office" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="About Recovery Office - Leading Financial Recovery Specialists" />
        <meta property="og:description" content="Recovery Office is the UK's premier financial recovery firm based in Manchester. Specializing in cryptocurrency theft, investment fraud, and complex asset recovery." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://recovery-office-online.netlify.app/about" />
        <link rel="canonical" href="https://recovery-office-online.netlify.app/about" />
      </Helmet>

      {/* Premium Hero Section */}
      <HeroSection>
        <HeroContent>
          <div>
            <HeroBadge>Established 2019</HeroBadge>
            <HeroTitle>Leading Financial Recovery Specialists</HeroTitle>
            <HeroSubtitle>
              We are the UK's premier financial recovery firm, specializing in cryptocurrency theft, 
              investment fraud, and complex asset recovery cases. Our team has successfully recovered 
              over £50 million for clients worldwide.
            </HeroSubtitle>
            <HeroStats>
              <StatItem>
                <StatNumber>£50M+</StatNumber>
                <StatLabel>Assets Recovered</StatLabel>
              </StatItem>
              <StatItem>
                <StatNumber>2,500+</StatNumber>
                <StatLabel>Cases Resolved</StatLabel>
              </StatItem>
              <StatItem>
                <StatNumber>87%</StatNumber>
                <StatLabel>Success Rate</StatLabel>
              </StatItem>
              <StatItem>
                <StatNumber>24/7</StatNumber>
                <StatLabel>Expert Support</StatLabel>
              </StatItem>
            </HeroStats>
          </div>
          <HeroImageWrapper>
            <HeroImage 
              src="https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?auto=format&fit=crop&w=800&q=80"
              alt="Professional financial recovery team"
            />
          </HeroImageWrapper>
        </HeroContent>
      </HeroSection>

      {/* Company Story Section */}
      <StorySection>
        <ContentWrapper>
          <SectionHeader>
            <SectionBadge>Our Story</SectionBadge>
            <SectionTitle>Built on Trust, Driven by Results</SectionTitle>
          </SectionHeader>
          <StoryGrid>
            <StoryContent>
              <StoryText>
                Recovery Office was founded in 2019 by a consortium of cybersecurity experts, 
                financial investigators, and former law enforcement professionals who recognized 
                the critical need for specialized recovery services in the rapidly evolving 
                digital asset landscape.
              </StoryText>
              <StoryText>
                As cryptocurrency adoption accelerated, so did sophisticated fraud schemes targeting 
                innocent investors. Our founders, having witnessed countless victims lose life savings 
                to elaborate scams, decided to combine their expertise to fight back against financial 
                crime and help victims reclaim their stolen assets.
              </StoryText>
              <StoryText>
                Today, we operate as the UK's leading financial recovery firm, with offices in London, 
                Manchester, and Edinburgh. Our multidisciplinary team includes blockchain forensics 
                specialists, legal professionals, and financial investigators who work exclusively 
                on asset recovery cases.
              </StoryText>
            </StoryContent>
            <StoryFeatures>
              <FeatureItem>
                <FeatureIcon>🏛️</FeatureIcon>
                <FeatureTitle>FCA Regulated</FeatureTitle>
                <FeatureDescription>
                  Fully regulated by the Financial Conduct Authority for investment advisory services
                </FeatureDescription>
              </FeatureItem>
              <FeatureItem>
                <FeatureIcon>🛡️</FeatureIcon>
                <FeatureTitle>ISO 27001 Certified</FeatureTitle>
                <FeatureDescription>
                  Information security management certified to international standards
                </FeatureDescription>
              </FeatureItem>
              <FeatureItem>
                <FeatureIcon>⚖️</FeatureIcon>
                <FeatureTitle>Legal Compliance</FeatureTitle>
                <FeatureDescription>
                  All recovery operations conducted within strict legal frameworks
                </FeatureDescription>
              </FeatureItem>
            </StoryFeatures>
          </StoryGrid>
        </ContentWrapper>
      </StorySection>

      {/* Leadership Team Section */}
      <TeamSection>
        <ContentWrapper>
          <SectionHeader>
            <SectionBadge>Leadership Team</SectionBadge>
            <SectionTitle>Meet Our Experts</SectionTitle>
            <SectionSubtitle>
              Industry veterans with decades of combined experience in financial recovery, 
              cybersecurity, and legal compliance.
            </SectionSubtitle>
          </SectionHeader>
          <TeamGrid>
            <TeamMember>
              <MemberImage 
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80"
                alt="David Richardson, CEO"
              />
              <MemberInfo>
                <MemberName>David Richardson</MemberName>
                <MemberTitle>Chief Executive Officer</MemberTitle>
                <MemberBio>
                  Former Financial Crimes Unit Director with 15+ years in asset recovery. 
                  MBA Finance, Cambridge University.
                </MemberBio>
                <MemberCredentials>
                  <Credential>Certified Fraud Examiner (CFE)</Credential>
                  <Credential>Chartered Financial Analyst (CFA)</Credential>
                </MemberCredentials>
              </MemberInfo>
            </TeamMember>

            <TeamMember>
              <MemberImage 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
                alt="Dr. Sarah Chen, CTO"
              />
              <MemberInfo>
                <MemberName>Dr. Sarah Chen</MemberName>
                <MemberTitle>Chief Technology Officer</MemberTitle>
                <MemberBio>
                  Blockchain forensics pioneer with 12+ years in cybersecurity. 
                  PhD Computer Science, Imperial College London.
                </MemberBio>
                <MemberCredentials>
                  <Credential>Certified Information Systems Auditor (CISA)</Credential>
                  <Credential>Certified Ethical Hacker (CEH)</Credential>
                </MemberCredentials>
              </MemberInfo>
            </TeamMember>

            <TeamMember>
              <MemberImage 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80"
                alt="James Morton QC, Legal Director"
              />
              <MemberInfo>
                <MemberName>James Morton QC</MemberName>
                <MemberTitle>Legal Director</MemberTitle>
                <MemberBio>
                  Queen's Counsel specializing in financial crime and asset recovery. 
                  20+ years at the London Bar.
                </MemberBio>
                <MemberCredentials>
                  <Credential>Queen's Counsel (QC)</Credential>
                  <Credential>Solicitor of England & Wales</Credential>
                </MemberCredentials>
              </MemberInfo>
            </TeamMember>
          </TeamGrid>
        </ContentWrapper>
      </TeamSection>

      {/* Expertise & Certifications */}
      <ExpertiseSection>
        <ContentWrapper>
          <SectionHeader>
            <SectionBadge>Our Expertise</SectionBadge>
            <SectionTitle>Industry-Leading Capabilities</SectionTitle>
          </SectionHeader>
          <ExpertiseGrid>
            <ExpertiseCard>
              <CardIcon>🔍</CardIcon>
              <CardTitle>Blockchain Forensics</CardTitle>
              <CardDescription>
                Advanced transaction tracing using industry-leading tools like Chainalysis, 
                Elliptic, and proprietary analysis software to track stolen cryptocurrency 
                across multiple blockchain networks.
              </CardDescription>
              <CardTools>
                <Tool>Chainalysis Reactor</Tool>
                <Tool>Elliptic Investigator</Tool>
                <Tool>CipherTrace Arsenal</Tool>
              </CardTools>
            </ExpertiseCard>

            <ExpertiseCard>
              <CardIcon>⚖️</CardIcon>
              <CardTitle>Legal Recovery</CardTitle>
              <CardDescription>
                Comprehensive legal strategies including freezing orders, Norwich Pharmacal 
                orders, and cross-border asset recovery through established international 
                legal networks.
              </CardDescription>
              <CardTools>
                <Tool>High Court Freezing Orders</Tool>
                <Tool>International Legal Network</Tool>
                <Tool>Mutual Legal Assistance</Tool>
              </CardTools>
            </ExpertiseCard>

            <ExpertiseCard>
              <CardIcon>🏦</CardIcon>
              <CardTitle>Financial Intelligence</CardTitle>
              <CardDescription>
                Deep expertise in traditional banking systems, offshore structures, and 
                modern financial instruments to trace assets across diverse financial 
                ecosystems.
              </CardDescription>
              <CardTools>
                <Tool>SWIFT Network Analysis</Tool>
                <Tool>Offshore Structure Investigation</Tool>
                <Tool>Asset Mapping & Valuation</Tool>
              </CardTools>
            </ExpertiseCard>
          </ExpertiseGrid>
        </ContentWrapper>
      </ExpertiseSection>

      {/* Success Metrics & Social Proof */}
      <MetricsSection>
        <ContentWrapper>
          <MetricsGrid>
            <MetricCard>
              <MetricNumber>£50M+</MetricNumber>
              <MetricLabel>Total Assets Recovered</MetricLabel>
              <MetricDescription>Successfully returned to victims since 2019</MetricDescription>
            </MetricCard>
            <MetricCard>
              <MetricNumber>2,500+</MetricNumber>
              <MetricLabel>Cases Completed</MetricLabel>
              <MetricDescription>Across 45 countries worldwide</MetricDescription>
            </MetricCard>
            <MetricCard>
              <MetricNumber>87%</MetricNumber>
              <MetricLabel>Success Rate</MetricLabel>
              <MetricDescription>Industry-leading recovery success</MetricDescription>
            </MetricCard>
            <MetricCard>
              <MetricNumber>48hrs</MetricNumber>
              <MetricLabel>Average Response</MetricLabel>
              <MetricDescription>Emergency case assessment time</MetricDescription>
            </MetricCard>
          </MetricsGrid>
        </ContentWrapper>
      </MetricsSection>

      {/* Contact Information Section */}
      <ContactSection>
        <ContentWrapper>
          <SectionHeader>
            <SectionBadge>Contact Our Manchester Office</SectionBadge>
            <SectionTitle>Get In Touch</SectionTitle>
          </SectionHeader>
          <ContactGrid>
            <ContactCard>
              <ContactIcon>🏢</ContactIcon>
              <ContactTitle>Head Office</ContactTitle>
              <ContactDetails>
                <ContactLine>2nd Floor, 3 Piccadilly Place</ContactLine>
                <ContactLine>London Road</ContactLine>
                <ContactLine>Manchester, M1 3BN</ContactLine>
                <ContactLine>United Kingdom</ContactLine>
              </ContactDetails>
            </ContactCard>
            
            <ContactCard>
              <ContactIcon>📞</ContactIcon>
              <ContactTitle>Emergency Hotline</ContactTitle>
              <ContactDetails>
                <ContactLink href="tel:+447451263372">+44 7451 263372</ContactLink>
                <ContactNote>Available 24/7 for urgent cases</ContactNote>
              </ContactDetails>
            </ContactCard>
            
            <ContactCard>
              <ContactIcon>📧</ContactIcon>
              <ContactTitle>Email Support</ContactTitle>
              <ContactDetails>
                <ContactLink href="mailto:info@recovery-office.com">info@recovery-office.com</ContactLink>
                <ContactNote>Response within 2 hours</ContactNote>
              </ContactDetails>
            </ContactCard>
            
            <ContactCard>
              <ContactIcon>🏛️</ContactIcon>
              <ContactTitle>Company Registration</ContactTitle>
              <ContactDetails>
                <ContactLine>Company Number: 06621703</ContactLine>
                <ContactLine>Firm Reference: 836358</ContactLine>
                <ContactNote>Registered in England and Wales</ContactNote>
              </ContactDetails>
            </ContactCard>
          </ContactGrid>
        </ContentWrapper>
      </ContactSection>

      {/* Call to Action */}
      <CTASection>
        <ContentWrapper>
          <CTAContent>
            <CTATitle>Ready to Recover Your Assets?</CTATitle>
            <CTASubtitle>
              Our expert team is standing by to provide a confidential consultation 
              and assessment of your case. Don't let fraudsters get away with your money.
            </CTASubtitle>
            <CTAButtons>
              <PrimaryCTA to="/booking">Book Free Consultation</PrimaryCTA>
              <SecondaryCTA href="tel:+447451263372">Emergency Hotline: +44 7451 263372</SecondaryCTA>
            </CTAButtons>
            <CTANote>
              💬 Confidential consultation • 🕐 24/7 emergency support • 🔒 No recovery, no fee
            </CTANote>
          </CTAContent>
        </ContentWrapper>
      </CTASection>
    </Container>
  );
};

// Premium Styled Components
const Container = styled.div`
  min-height: 100vh;
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

const SectionSubtitle = styled.p`
  font-size: 18px;
  color: #4a5568;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
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

const TeamSection = styled.section`
  padding: 120px 0;
  background: #f7fafc;
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 48px;
`;

const TeamMember = styled.div`
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 16px 48px rgba(0, 0, 0, 0.12);
  }
`;

const MemberImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const MemberInfo = styled.div`
  padding: 32px;
`;

const MemberName = styled.h3`
  font-size: 24px;
  font-weight: 600;
  color: #1a365d;
  margin-bottom: 8px;
`;

const MemberTitle = styled.div`
  font-size: 16px;
  color: #d69e2e;
  font-weight: 500;
  margin-bottom: 16px;
`;

const MemberBio = styled.p`
  font-size: 16px;
  color: #4a5568;
  line-height: 1.6;
  margin-bottom: 16px;
`;

const MemberCredentials = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Credential = styled.div`
  font-size: 14px;
  color: #2d3748;
  background: #edf2f7;
  padding: 4px 8px;
  border-radius: 4px;
  display: inline-block;
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
  color: #d69e2e;
  background: rgba(214, 158, 46, 0.1);
  padding: 6px 12px;
  border-radius: 6px;
  display: inline-block;
`;

const MetricsSection = styled.section`
  padding: 80px 0;
  background: #1a365d;
  color: white;
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 48px;
`;

const MetricCard = styled.div`
  text-align: center;
`;

const MetricNumber = styled.div`
  font-size: 48px;
  font-weight: 700;
  color: #d69e2e;
  margin-bottom: 12px;
`;

const MetricLabel = styled.div`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
`;

const MetricDescription = styled.div`
  font-size: 14px;
  opacity: 0.8;
`;

const CTASection = styled.section`
  padding: 120px 0;
  background: linear-gradient(135deg, #d69e2e 0%, #f6d55c 100%);
  color: #1a365d;
`;

const CTAContent = styled.div`
  text-align: center;
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
  line-height: 1.6;
  margin-bottom: 48px;
  opacity: 0.9;
`;

const CTAButtons = styled.div`
  display: flex;
  gap: 24px;
  justify-content: center;
  margin-bottom: 32px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const PrimaryCTA = styled(Link)`
  background: #1a365d;
  color: white;
  padding: 16px 32px;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background: #2c5282;
    transform: translateY(-2px);
  }
`;

const SecondaryCTA = styled.a`
  background: transparent;
  color: #1a365d;
  padding: 16px 32px;
  border: 2px solid #1a365d;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background: #1a365d;
    color: white;
  }
`;

const CTANote = styled.div`
  font-size: 16px;
  opacity: 0.8;
`;

const ContactSection = styled.section`
  padding: 120px 0;
  background: #f7fafc;
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 32px;
`;

const ContactCard = styled.div`
  background: white;
  padding: 32px;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  }
`;

const ContactIcon = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
`;

const ContactTitle = styled.h3`
  font-size: 20px;
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
  font-size: 16px;
  color: #4a5568;
  line-height: 1.5;
`;

const ContactLink = styled.a`
  font-size: 18px;
  font-weight: 600;
  color: #d69e2e;
  text-decoration: none;
  
  &:hover {
    color: #1a365d;
    text-decoration: underline;
  }
`;

const ContactNote = styled.div`
  font-size: 14px;
  color: #718096;
  font-style: italic;
`;

export default AboutPage; 