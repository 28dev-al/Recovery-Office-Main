import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { COMPANY_PROFILE_CA } from '../../constants/companyProfile.ca';
import { formatCurrencyCAD } from '../../utils/formatters';

export const CryptocurrencyRecoveryPage: React.FC = () => {
  return (
    <Container>
      <Helmet>
        <title>Cryptocurrency Recovery Services | Bitcoin Recovery | Recovery Office Canada</title>
        <meta name="description" content="Canada's leading cryptocurrency recovery specialists. Recover stolen Bitcoin, Ethereum, and digital assets. Expert blockchain forensics. Contact us for consultation." />
        <meta name="keywords" content="cryptocurrency recovery, Bitcoin recovery, Ethereum recovery, blockchain forensics, crypto theft recovery, exchange hack recovery, wallet theft, digital asset recovery" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Cryptocurrency Recovery Services | Recovery Office Canada" />
        <meta property="og:description" content="Professional cryptocurrency recovery services with 89% success rate. Expert blockchain forensics and legal recovery." />
        <meta property="og:type" content="service" />
        <link rel="canonical" href="https://recovery-office-online.netlify.app/services/cryptocurrency-recovery" />
      </Helmet>

      {/* Professional Hero Section */}
      <HeroSection>
        <HeroContent>
          <Breadcrumb>
            <BreadcrumbLink to="/">Home</BreadcrumbLink>
            <BreadcrumbSeparator>→</BreadcrumbSeparator>
            <BreadcrumbLink to="/services">Services</BreadcrumbLink>
            <BreadcrumbSeparator>→</BreadcrumbSeparator>
            <BreadcrumbCurrent>Cryptocurrency Recovery</BreadcrumbCurrent>
          </Breadcrumb>

          <HeroBadge>Canada's Leading Crypto Recovery Specialists</HeroBadge>
          <HeroTitle>Professional Cryptocurrency Recovery Services</HeroTitle>
          <HeroSubtitle>
            Expert recovery of stolen Bitcoin, Ethereum, and other digital assets. Our specialized team has successfully recovered over {formatCurrencyCAD(22500000)} in cryptocurrency for victims of theft, scams, and exchange failures across Canada and internationally.
          </HeroSubtitle>
          
          <HeroStats>
            <StatItem>
              <StatNumber>{formatCurrencyCAD(22500000).replace('.00', '')}+</StatNumber>
              <StatLabel>Crypto Recovered</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>89%</StatNumber>
              <StatLabel>Success Rate</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>1,200+</StatNumber>
              <StatLabel>Cases Resolved</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>24/7</StatNumber>
              <StatLabel>Emergency Support</StatLabel>
            </StatItem>
          </HeroStats>
          
          <HeroActions>
            <PrimaryButton to="/booking">
              📞 Book Emergency Consultation
            </PrimaryButton>
            <SecondaryButton href={`mailto:${COMPANY_PROFILE_CA.email}`}>
              Email Consultation: {COMPANY_PROFILE_CA.email}
            </SecondaryButton>
          </HeroActions>
          
          <TrustIndicators>
            <TrustItem>🛡️ CIRO Regulated</TrustItem>
            <TrustItem>⚖️ Legal Compliance</TrustItem>
            <TrustItem>🔒 Confidential Service</TrustItem>
            <TrustItem>💰 No Recovery, No Fee</TrustItem>
          </TrustIndicators>
        </HeroContent>
        
        <HeroVisual>
          <CryptoIcon>₿</CryptoIcon>
          <RecoveryBadge>Recovery Specialists</RecoveryBadge>
        </HeroVisual>
      </HeroSection>

      {/* Expertise Section */}
      <ExpertiseSection>
        <ContentWrapper>
          <SectionHeader>
            <SectionBadge>Our Expertise</SectionBadge>
            <SectionTitle>Comprehensive Cryptocurrency Recovery Solutions</SectionTitle>
            <SectionSubtitle>
              We specialize in all forms of cryptocurrency theft and recovery, using advanced blockchain forensics and legal strategies to reclaim your stolen digital assets.
            </SectionSubtitle>
          </SectionHeader>
          
          <ExpertiseGrid>
            <ExpertiseCard>
              <CardIcon>₿</CardIcon>
              <CardTitle>Bitcoin Recovery</CardTitle>
              <CardDescription>
                Expert recovery of stolen Bitcoin from exchange hacks, wallet compromises, romance scams, and fraudulent investment platforms. Our blockchain forensics team traces transactions across multiple addresses.
              </CardDescription>
              <RecoveryStats>
                <StatLine>Average Recovery: {formatCurrencyCAD(270000)}</StatLine>
                <StatLine>Success Rate: 91%</StatLine>
                <StatLine>Cases Handled: 450+</StatLine>
              </RecoveryStats>
            </ExpertiseCard>

            <ExpertiseCard>
              <CardIcon>⟐</CardIcon>
              <CardTitle>Ethereum & Token Recovery</CardTitle>
              <CardDescription>
                Specialized recovery of Ethereum, ERC-20 tokens, NFTs, and DeFi assets. We handle complex smart contract interactions and multi-signature wallet recoveries.
              </CardDescription>
              <RecoveryStats>
                <StatLine>Average Recovery: {formatCurrencyCAD(142500)}</StatLine>
                <StatLine>Success Rate: 87%</StatLine>
                <StatLine>Cases Handled: 320+</StatLine>
              </RecoveryStats>
            </ExpertiseCard>

            <ExpertiseCard>
              <CardIcon>🏦</CardIcon>
              <CardTitle>Exchange Recovery</CardTitle>
              <CardDescription>
                Recovery from failed, hacked, or fraudulent cryptocurrency exchanges. We work with international law enforcement and regulatory bodies for asset retrieval.
              </CardDescription>
              <RecoveryStats>
                <StatLine>Average Recovery: {formatCurrencyCAD(330000)}</StatLine>
                <StatLine>Success Rate: 78%</StatLine>
                <StatLine>Cases Handled: 280+</StatLine>
              </RecoveryStats>
            </ExpertiseCard>

            <ExpertiseCard>
              <CardIcon>🕵️</CardIcon>
              <CardTitle>Scam Investigation</CardTitle>
              <CardDescription>
                Investigation and recovery from cryptocurrency romance scams, fake ICOs, rug pulls, and fraudulent mining operations. Complete victim assistance and legal support.
              </CardDescription>
              <RecoveryStats>
                <StatLine>Average Recovery: {formatCurrencyCAD(97500)}</StatLine>
                <StatLine>Success Rate: 82%</StatLine>
                <StatLine>Cases Handled: 380+</StatLine>
              </RecoveryStats>
            </ExpertiseCard>
          </ExpertiseGrid>
        </ContentWrapper>
      </ExpertiseSection>

      {/* Recovery Process */}
      <ProcessSection>
        <ContentWrapper>
          <SectionHeader>
            <SectionBadge>Our Recovery Process</SectionBadge>
            <SectionTitle>Professional 4-Step Recovery Methodology</SectionTitle>
          </SectionHeader>
          
          <ProcessGrid>
            <ProcessCard>
              <ProcessNumber>1</ProcessNumber>
              <ProcessTitle>Emergency Assessment</ProcessTitle>
              <ProcessDescription>
                Immediate case evaluation within 2 hours. We analyze transaction records, assess recovery potential, and provide honest timeline estimates. No upfront costs.
              </ProcessDescription>
              <ProcessDuration>Response: 2 hours</ProcessDuration>
            </ProcessCard>

            <ProcessCard>
              <ProcessNumber>2</ProcessNumber>
              <ProcessTitle>Blockchain Forensics</ProcessTitle>
              <ProcessDescription>
                Advanced blockchain analysis using Chainalysis, Elliptic, and proprietary tools. We trace cryptocurrency movements across exchanges and identify recovery opportunities.
              </ProcessDescription>
              <ProcessDuration>Duration: 3-7 days</ProcessDuration>
            </ProcessCard>

            <ProcessCard>
              <ProcessNumber>3</ProcessNumber>
              <ProcessTitle>Legal Action</ProcessTitle>
              <ProcessDescription>
                Strategic legal proceedings including freezing orders, court injunctions, and international asset recovery. Our QC-led legal team handles all proceedings.
              </ProcessDescription>
              <ProcessDuration>Duration: 2-8 weeks</ProcessDuration>
            </ProcessCard>

            <ProcessCard>
              <ProcessNumber>4</ProcessNumber>
              <ProcessTitle>Asset Recovery</ProcessTitle>
              <ProcessDescription>
                Successful recovery and secure return of your cryptocurrency. We ensure proper KYC compliance and provide detailed recovery documentation.
              </ProcessDescription>
              <ProcessDuration>Completion: Variable</ProcessDuration>
            </ProcessCard>
          </ProcessGrid>
        </ContentWrapper>
      </ProcessSection>

      {/* Client Success Stories */}
      <TestimonialsSection>
        <ContentWrapper>
          <SectionHeader>
            <SectionBadge>Client Success Stories</SectionBadge>
            <SectionTitle>Real Recoveries, Real Results</SectionTitle>
          </SectionHeader>
          
          <TestimonialsGrid>
            <TestimonialCard>
              <TestimonialText>
                "Recovery Office recovered {formatCurrencyCAD(510000)} worth of Bitcoin stolen in a romance scam. Their expertise and determination saved my retirement funds. Professional service throughout."
              </TestimonialText>
              <TestimonialAuthor>
                <AuthorInfo>
                  <AuthorName>Margaret T.</AuthorName>
                  <AuthorLocation>Toronto, ON</AuthorLocation>
                </AuthorInfo>
                <RecoveryAmount>Recovered: {formatCurrencyCAD(510000)}</RecoveryAmount>
              </TestimonialAuthor>
            </TestimonialCard>

            <TestimonialCard>
              <TestimonialText>
                "When our company lost 15 BTC to an exchange hack, Recovery Office worked tirelessly for 6 months to recover our assets. Outstanding technical expertise."
              </TestimonialText>
              <TestimonialAuthor>
                <AuthorInfo>
                  <AuthorName>David Chen</AuthorName>
                  <AuthorLocation>Vancouver, BC</AuthorLocation>
                </AuthorInfo>
                <RecoveryAmount>Recovered: {formatCurrencyCAD(420000)}</RecoveryAmount>
              </TestimonialAuthor>
            </TestimonialCard>

            <TestimonialCard>
              <TestimonialText>
                "Lost {formatCurrencyCAD(225000)} to a fake DeFi platform. Recovery Office's blockchain forensics team traced the funds and we recovered 85%. Highly recommended."
              </TestimonialText>
              <TestimonialAuthor>
                <AuthorInfo>
                  <AuthorName>Sarah Williams</AuthorName>
                  <AuthorLocation>Calgary, AB</AuthorLocation>
                </AuthorInfo>
                <RecoveryAmount>Recovered: {formatCurrencyCAD(191250)}</RecoveryAmount>
              </TestimonialAuthor>
            </TestimonialCard>
          </TestimonialsGrid>
        </ContentWrapper>
      </TestimonialsSection>

      {/* Emergency CTA */}
      <EmergencyCTA>
        <ContentWrapper>
          <CTAContent>
            <CTAIcon>🚨</CTAIcon>
            <CTATitle>Time is Critical in Cryptocurrency Recovery</CTATitle>
            <CTAText>
              Every hour counts when cryptocurrency is stolen. Our emergency response team is standing by 24/7 to begin immediate blockchain forensics and legal action to maximize your recovery chances.
            </CTAText>
            <CTAButtons>
              <ConsultationButton to="/booking">
                Book Immediate Consultation
              </ConsultationButton>
            </CTAButtons>
            <CTANote>
              💬 Confidential consultation • 🕐 24/7 emergency response • 🔒 No recovery, no fee • ⚖️ Legal compliance guaranteed
            </CTANote>
          </CTAContent>
        </ContentWrapper>
      </EmergencyCTA>
    </Container>
  );
};

// Comprehensive styled components with safe theme access
const Container = styled.div`
  min-height: 100vh;
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, #1a365d 0%, #2c5282 100%);
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
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y="50" font-size="40" fill="%23d69e2e" opacity="0.05">₿</text></svg>') repeat;
    background-size: 80px 80px;
  }
`;

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  display: grid;
  grid-template-columns: 2fr 1fr;
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

const Breadcrumb = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  font-size: 14px;
`;

const BreadcrumbLink = styled(Link)`
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;

  &:hover {
    color: #d69e2e;
  }
`;

const BreadcrumbSeparator = styled.span`
  margin: 0 8px;
  color: rgba(255, 255, 255, 0.6);
`;

const BreadcrumbCurrent = styled.span`
  color: #d69e2e;
`;

const HeroBadge = styled.div`
  display: inline-block;
  background: rgba(214, 158, 46, 0.2);
  color: #d69e2e;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 16px;
  border: 1px solid rgba(214, 158, 46, 0.3);
`;

const HeroTitle = styled.h1`
  font-size: 48px;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 18px;
  line-height: 1.6;
  opacity: 0.9;
  margin-bottom: 32px;
  max-width: 600px;
`;

const HeroStats = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin-bottom: 32px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #d69e2e;
  margin-bottom: 4px;
`;

const StatLabel = styled.div`
  font-size: 12px;
  opacity: 0.8;
`;

const HeroActions = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
`;

const PrimaryButton = styled(Link)`
  background: #d69e2e;
  color: #1a365d;
  padding: 16px 32px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(214, 158, 46, 0.3);
  }
`;

const SecondaryButton = styled.a`
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

const TrustIndicators = styled.div`
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
`;

const TrustItem = styled.div`
  font-size: 14px;
  opacity: 0.9;
`;

const HeroVisual = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CryptoIcon = styled.div`
  font-size: 120px;
  color: #d69e2e;
  margin-bottom: 16px;
`;

const RecoveryBadge = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 12px 24px;
  border-radius: 25px;
  font-weight: 600;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const ExpertiseSection = styled.section`
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
  font-size: 42px;
  font-weight: 700;
  color: #1a365d;
  margin-bottom: 16px;

  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

const SectionSubtitle = styled.p`
  font-size: 18px;
  color: #4a5568;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
`;

const ExpertiseGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 32px;
`;

const ExpertiseCard = styled.div`
  background: white;
  padding: 40px;
  border-radius: 16px;
  border: 2px solid #e2e8f0;
  transition: all 0.3s ease;

  &:hover {
    border-color: #d69e2e;
    transform: translateY(-4px);
    box-shadow: 0 16px 48px rgba(0, 0, 0, 0.1);
  }
`;

const CardIcon = styled.div`
  font-size: 48px;
  color: #d69e2e;
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

const RecoveryStats = styled.div`
  border-top: 1px solid #e2e8f0;
  padding-top: 16px;
`;

const StatLine = styled.div`
  font-size: 14px;
  color: #4a5568;
  margin-bottom: 4px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const ProcessSection = styled.section`
  padding: 120px 0;
  background: #f7fafc;
`;

const ProcessGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 32px;
`;

const ProcessCard = styled.div`
  background: white;
  padding: 32px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
`;

const ProcessNumber = styled.div`
  width: 48px;
  height: 48px;
  background: #d69e2e;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 700;
  margin: 0 auto 16px;
`;

const ProcessTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: #1a365d;
  margin-bottom: 12px;
`;

const ProcessDescription = styled.p`
  font-size: 14px;
  line-height: 1.6;
  color: #4a5568;
  margin-bottom: 12px;
`;

const ProcessDuration = styled.div`
  font-size: 12px;
  color: #d69e2e;
  font-weight: 600;
`;

const TestimonialsSection = styled.section`
  padding: 120px 0;
  background: white;
`;

const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 32px;
`;

const TestimonialCard = styled.div`
  background: #f7fafc;
  padding: 32px;
  border-radius: 16px;
  border-left: 4px solid #d69e2e;
`;

const TestimonialText = styled.blockquote`
  font-size: 16px;
  line-height: 1.6;
  color: #4a5568;
  font-style: italic;
  margin-bottom: 24px;

  &::before, &::after {
    content: '"';
    font-size: 20px;
    color: #d69e2e;
  }
`;

const TestimonialAuthor = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const AuthorInfo = styled.div``;

const AuthorName = styled.div`
  font-weight: 600;
  color: #1a365d;
  margin-bottom: 4px;
`;

const AuthorLocation = styled.div`
  font-size: 14px;
  color: #4a5568;
`;

const RecoveryAmount = styled.div`
  font-size: 14px;
  color: #38a169;
  font-weight: 600;
`;

const EmergencyCTA = styled.section`
  padding: 80px 0;
  background: linear-gradient(135deg, #d69e2e 0%, #f6d55c 100%);
  color: #1a365d;
`;

const CTAContent = styled.div`
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
`;

const CTAIcon = styled.div`
  font-size: 64px;
  margin-bottom: 24px;
`;

const CTATitle = styled.h2`
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 16px;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const CTAText = styled.p`
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 32px;
  opacity: 0.9;
`;

const CTAButtons = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
`;

const ConsultationButton = styled(Link)`
  background: transparent;
  color: #1a365d;
  padding: 18px 32px;
  border: 2px solid #1a365d;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    background: #1a365d;
    color: white;
  }
`;

const CTANote = styled.div`
  font-size: 14px;
  opacity: 0.8;
`;

export default CryptocurrencyRecoveryPage; 