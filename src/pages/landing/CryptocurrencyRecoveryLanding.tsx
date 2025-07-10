/**
 * Cryptocurrency Recovery Landing Page
 * 
 * Google Ads optimized landing page for cryptocurrency recovery campaigns.
 * Features:
 * - Conversion-optimized design
 * - FCA compliance messaging
 * - Advanced tracking integration
 * - Mobile-first responsive design
 * - A/B test ready structure
 */

import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import DynamicSEO from '../../components/SEO/DynamicSEO';
import { GoogleAnalytics, ServiceTracker, CallTrackingNumber } from '../../components/tracking/GoogleAnalytics';

export const CryptocurrencyRecoveryLanding: React.FC = () => {
  return (
    <ServiceTracker serviceType="Cryptocurrency Recovery" interactionType="landing_page_view">
      <Container>
        <DynamicSEO 
          page="cryptocurrency-recovery"
          customTitle="Recover Your Stolen Cryptocurrency | Expert Bitcoin Recovery Canada | Recovery Office"
          customDescription="Professional cryptocurrency recovery services for Bitcoin, Ethereum & all altcoins. CIRO regulated. Free consultation."
          customKeywords="cryptocurrency recovery, bitcoin recovery, stolen crypto, blockchain forensics, crypto theft recovery, CIRO regulated, Canada"
          isTransactional={true}
          serviceData={{
            name: "Cryptocurrency Recovery",
            price: "$1125 CAD",
            duration: "75 minutes",
            category: "Financial Recovery Services"
          }}
          structuredData={{
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Cryptocurrency Recovery Service",
            "provider": {
              "@type": "FinancialService",
              "name": "Recovery Office",
              "hasCredential": {
                "@type": "EducationalOccupationalCredential",
                "name": "CIRO Authorization",
                "credentialCategory": "Financial Services Authorization"
              }
            },
            "offers": {
              "@type": "Offer",
              "price": "1125",
              "priceCurrency": "CAD",
              "availability": "InStock",
              "eligibleRegion": "CA"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "127",
              "bestRating": "5"
            },
            "serviceOutput": {
              "@type": "Thing",
              "name": "Recovered Cryptocurrency Assets"
            }
          }}
        />
        
        <GoogleAnalytics 
          pageTitle="Cryptocurrency Recovery Landing Page"
          pagePath="/cryptocurrency-recovery"
          isTransactional={true}
          serviceType="Cryptocurrency Recovery"
        />

        {/* Hero Section - Conversion Optimized */}
        <HeroSection>
          <HeroContent>
            <UrgencyBadge>⚡ 89% Success Rate - Act Fast, Recovery Time Matters</UrgencyBadge>
            <HeroTitle>
              <Highlight>Recover Your Stolen Cryptocurrency</Highlight><br />
              Professional Bitcoin & Crypto Recovery Canada
            </HeroTitle>
            <HeroSubtitle>
              Expert blockchain forensics and legal recovery for Bitcoin, Ethereum, and all major cryptocurrencies. 
              <strong> CIRO regulated specialists</strong> with $75M+ CAD successfully recovered.
            </HeroSubtitle>
            
            <TrustRow>
              <TrustItem>
                <TrustIcon>🏛️</TrustIcon>
                <TrustText>FCA Regulated<br /><small>Firm Ref: 836358</small></TrustText>
              </TrustItem>
              <TrustItem>
                <TrustIcon>🔍</TrustIcon>
                <TrustText>Advanced Forensics<br /><small>Chainalysis & Elliptic</small></TrustText>
              </TrustItem>
              <TrustItem>
                <TrustIcon>⚖️</TrustIcon>
                <TrustText>Legal Recovery<br /><small>Court Orders & Freezing</small></TrustText>
              </TrustItem>
              <TrustItem>
                <TrustIcon>🛡️</TrustIcon>
                <TrustText>24/7 Emergency<br /><small>Immediate Response</small></TrustText>
              </TrustItem>
            </TrustRow>

            <CTAButtons>
              <PrimaryCTA to="/booking">
                📞 Book Free Consultation
                <CTASubtext>Response within 2 hours</CTASubtext>
              </PrimaryCTA>
              <SecondaryCTA>
                <CallTrackingNumber 
                  defaultNumber="+44 7451 263472"
                  source="crypto_landing_hero"
                />
                <CTASubtext>Emergency hotline 24/7</CTASubtext>
              </SecondaryCTA>
            </CTAButtons>
          </HeroContent>
          
          <HeroStats>
            <StatCard>
              <StatNumber>£50M+</StatNumber>
              <StatLabel>Recovered</StatLabel>
            </StatCard>
            <StatCard>
              <StatNumber>89%</StatNumber>
              <StatLabel>Success Rate</StatLabel>
            </StatCard>
            <StatCard>
              <StatNumber>24/7</StatNumber>
              <StatLabel>Emergency Response</StatLabel>
            </StatCard>
          </HeroStats>
        </HeroSection>

        {/* Problem Agitation Section */}
        <ProblemSection>
          <ContentWrapper>
            <ProblemTitle>⚠️ Time Is Critical for Cryptocurrency Recovery</ProblemTitle>
            <ProblemGrid>
              <ProblemCard>
                <ProblemIcon>🔥</ProblemIcon>
                <ProblemHeader>Every Hour Counts</ProblemHeader>
                <ProblemText>
                  Criminals are moving your crypto through complex mixing services. 
                  The longer you wait, the harder recovery becomes.
                </ProblemText>
              </ProblemCard>
              <ProblemCard>
                <ProblemIcon>❌</ProblemIcon>
                <ProblemHeader>DIY Recovery Fails</ProblemHeader>
                <ProblemText>
                  99% of self-recovery attempts fail. You need professional blockchain 
                  forensics and legal expertise to recover stolen cryptocurrency.
                </ProblemText>
              </ProblemCard>
              <ProblemCard>
                <ProblemIcon>🚫</ProblemIcon>
                <ProblemHeader>Scam Recovery Services</ProblemHeader>
                <ProblemText>
                  Beware of unregulated "recovery" services demanding upfront fees. 
                  Choose FCA regulated professionals with proven results.
                </ProblemText>
              </ProblemCard>
            </ProblemGrid>
          </ContentWrapper>
        </ProblemSection>

        {/* Solution Section */}
        <SolutionSection>
          <ContentWrapper>
            <SolutionHeader>
              <SolutionBadge>✅ PROVEN SOLUTION</SolutionBadge>
              <SolutionTitle>Professional Cryptocurrency Recovery Process</SolutionTitle>
            </SolutionHeader>
            
            <ProcessGrid>
              <ProcessStep>
                <StepNumber>1</StepNumber>
                <StepTitle>Immediate Assessment</StepTitle>
                <StepDescription>
                  Free consultation within 2 hours. We analyze your case using 
                  professional blockchain forensics tools (Chainalysis, Elliptic).
                </StepDescription>
              </ProcessStep>
              <ProcessStep>
                <StepNumber>2</StepNumber>
                <StepTitle>Blockchain Investigation</StepTitle>
                <StepDescription>
                  Advanced transaction analysis, wallet identification, and 
                  exchange tracing to follow your cryptocurrency trail.
                </StepDescription>
              </ProcessStep>
              <ProcessStep>
                <StepNumber>3</StepNumber>
                <StepTitle>Legal Recovery Action</StepTitle>
                <StepDescription>
                  Court orders, asset freezing, exchange cooperation, and 
                  international legal coordination for maximum recovery.
                </StepDescription>
              </ProcessStep>
              <ProcessStep>
                <StepNumber>4</StepNumber>
                <StepTitle>Asset Recovery</StepTitle>
                <StepDescription>
                  Secure return of your cryptocurrency through legal channels 
                  with full documentation and compliance procedures.
                </StepDescription>
              </ProcessStep>
            </ProcessGrid>
          </ContentWrapper>
        </SolutionSection>

        {/* Social Proof Section */}
        <TestimonialsSection>
          <ContentWrapper>
            <TestimonialsTitle>Real Recovery Success Stories</TestimonialsTitle>
            <TestimonialsGrid>
              <TestimonialCard>
                <Stars>⭐⭐⭐⭐⭐</Stars>
                <TestimonialText>
                  "Recovery Office recovered £2.3M in Bitcoin stolen from our company wallet. 
                  Professional, discrete, and incredibly effective. FCA regulation gave us confidence."
                </TestimonialText>
                <TestimonialAuthor>
                  Anonymous Client<br />
                  <small>Technology Company CEO</small>
                </TestimonialAuthor>
              </TestimonialCard>
              <TestimonialCard>
                <Stars>⭐⭐⭐⭐⭐</Stars>
                <TestimonialText>
                  "Lost £850K in a fake exchange scam. Recovery Office traced the funds through 
                  17 wallets and recovered 85% through legal action. Outstanding service."
                </TestimonialText>
                <TestimonialAuthor>
                  Verified Client<br />
                  <small>Private Investor</small>
                </TestimonialAuthor>
              </TestimonialCard>
              <TestimonialCard>
                <Stars>⭐⭐⭐⭐⭐</Stars>
                <TestimonialText>
                  "Attempted self-recovery for months with no results. Recovery Office 
                  succeeded in 6 weeks. Their blockchain forensics expertise is unmatched."
                </TestimonialText>
                <TestimonialAuthor>
                  Anonymous Client<br />
                  <small>Cryptocurrency Trader</small>
                </TestimonialAuthor>
              </TestimonialCard>
            </TestimonialsGrid>
          </ContentWrapper>
        </TestimonialsSection>

        {/* Pricing Section */}
        <PricingSection>
          <ContentWrapper>
            <PricingTitle>Transparent, Results-Based Pricing</PricingTitle>
            <PricingCard>
              <PricingHeader>
                <PricingName>Cryptocurrency Recovery Consultation</PricingName>
                <PricingPrice>£750</PricingPrice>
                <PricingDuration>75-minute expert assessment</PricingDuration>
              </PricingHeader>
              <PricingFeatures>
                <Feature>✅ Complete blockchain forensic analysis</Feature>
                <Feature>✅ Recovery probability assessment</Feature>
                <Feature>✅ Legal recovery strategy</Feature>
                <Feature>✅ No recovery, no additional fees</Feature>
                <Feature>✅ 24/7 emergency support included</Feature>
                <Feature>✅ FCA regulated professional service</Feature>
              </PricingFeatures>
              <PricingCTA to="/booking">Book Your Consultation Now</PricingCTA>
            </PricingCard>
          </ContentWrapper>
        </PricingSection>

        {/* Urgency CTA Section */}
        <UrgencySection>
          <ContentWrapper>
            <UrgencyContent>
              <UrgencyIcon>🚨</UrgencyIcon>
              <UrgencyTitle>Don't Lose Your Cryptocurrency Forever</UrgencyTitle>
              <UrgencyText>
                Every minute matters in cryptocurrency recovery. The longer you wait, 
                the more complex the trail becomes. Our experts are standing by 24/7.
              </UrgencyText>
              <UrgencyButtons>
                <UrgencyPrimaryCTA to="/booking">
                  🔥 Emergency Consultation - Book Now
                </UrgencyPrimaryCTA>
                <UrgencySecondaryCTA>
                  <CallTrackingNumber 
                    defaultNumber="+44 7451 263472"
                    source="crypto_landing_urgency"
                  />
                </UrgencySecondaryCTA>
              </UrgencyButtons>
              <UrgencyDisclaimer>
                FCA Regulated | No Recovery, No Fee | Absolute Confidentiality
              </UrgencyDisclaimer>
            </UrgencyContent>
          </ContentWrapper>
        </UrgencySection>
      </Container>
    </ServiceTracker>
  );
};

// Styled Components
const Container = styled.div`
  min-height: 100vh;
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, #1a365d 0%, #2c5282 50%, #d69e2e 100%);
  color: white;
  padding: 80px 0;
  position: relative;
  overflow: hidden;
`;

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  text-align: center;
`;

const UrgencyBadge = styled.div`
  display: inline-block;
  background: #e53e3e;
  color: white;
  padding: 12px 24px;
  border-radius: 25px;
  font-weight: 600;
  margin-bottom: 24px;
  animation: pulse 2s infinite;
  
  @keyframes pulse {
    0% { opacity: 1; }
    50% { opacity: 0.8; }
    100% { opacity: 1; }
  }
`;

const HeroTitle = styled.h1`
  font-size: 56px;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 24px;
  
  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

const Highlight = styled.span`
  color: #d69e2e;
`;

const HeroSubtitle = styled.p`
  font-size: 20px;
  line-height: 1.6;
  margin-bottom: 48px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const TrustRow = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin: 48px 0;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
`;

const TrustItem = styled.div`
  text-align: center;
`;

const TrustIcon = styled.div`
  font-size: 32px;
  margin-bottom: 8px;
`;

const TrustText = styled.div`
  font-size: 14px;
  font-weight: 600;
`;

const CTAButtons = styled.div`
  display: flex;
  gap: 24px;
  justify-content: center;
  align-items: center;
  margin: 48px 0;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const PrimaryCTA = styled(Link)`
  background: #e53e3e;
  color: white;
  padding: 20px 40px;
  border-radius: 12px;
  font-size: 20px;
  font-weight: 700;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.3s ease;
  box-shadow: 0 8px 24px rgba(229, 62, 62, 0.3);
  
  &:hover {
    background: #c53030;
    transform: translateY(-2px);
    box-shadow: 0 12px 32px rgba(229, 62, 62, 0.4);
  }
`;

const SecondaryCTA = styled.div`
  background: transparent;
  border: 2px solid white;
  color: white;
  padding: 20px 40px;
  border-radius: 12px;
  font-size: 20px;
  font-weight: 700;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.3s ease;
  
  &:hover {
    background: white;
    color: #1a365d;
  }
  
  a {
    color: inherit;
    text-decoration: none;
  }
`;

const CTASubtext = styled.small`
  font-size: 12px;
  font-weight: 400;
  margin-top: 4px;
  opacity: 0.9;
`;

const HeroStats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  max-width: 600px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    gap: 16px;
  }
`;

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 24px;
  border-radius: 12px;
  text-align: center;
  backdrop-filter: blur(10px);
`;

const StatNumber = styled.div`
  font-size: 32px;
  font-weight: 700;
  color: #d69e2e;
  margin-bottom: 8px;
`;

const StatLabel = styled.div`
  font-size: 14px;
  opacity: 0.9;
`;

const ProblemSection = styled.section`
  background: #f7fafc;
  padding: 80px 0;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
`;

const ProblemTitle = styled.h2`
  font-size: 36px;
  font-weight: 700;
  text-align: center;
  color: #e53e3e;
  margin-bottom: 48px;
`;

const ProblemGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProblemCard = styled.div`
  background: white;
  padding: 32px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const ProblemIcon = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
`;

const ProblemHeader = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: #1a365d;
  margin-bottom: 16px;
`;

const ProblemText = styled.p`
  color: #4a5568;
  line-height: 1.6;
`;

const SolutionSection = styled.section`
  background: white;
  padding: 80px 0;
`;

const SolutionHeader = styled.div`
  text-align: center;
  margin-bottom: 64px;
`;

const SolutionBadge = styled.div`
  display: inline-block;
  background: #38a169;
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 16px;
`;

const SolutionTitle = styled.h2`
  font-size: 36px;
  font-weight: 700;
  color: #1a365d;
`;

const ProcessGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProcessStep = styled.div`
  text-align: center;
`;

const StepNumber = styled.div`
  width: 64px;
  height: 64px;
  background: #d69e2e;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 700;
  margin: 0 auto 16px;
`;

const StepTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1a365d;
  margin-bottom: 12px;
`;

const StepDescription = styled.p`
  color: #4a5568;
  line-height: 1.6;
  font-size: 14px;
`;

const TestimonialsSection = styled.section`
  background: #1a365d;
  color: white;
  padding: 80px 0;
`;

const TestimonialsTitle = styled.h2`
  font-size: 36px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 48px;
`;

const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const TestimonialCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 32px;
  border-radius: 12px;
  backdrop-filter: blur(10px);
`;

const Stars = styled.div`
  font-size: 20px;
  margin-bottom: 16px;
`;

const TestimonialText = styled.p`
  line-height: 1.6;
  margin-bottom: 16px;
  font-style: italic;
`;

const TestimonialAuthor = styled.div`
  font-weight: 600;
  opacity: 0.9;
`;

const PricingSection = styled.section`
  background: #f7fafc;
  padding: 80px 0;
`;

const PricingTitle = styled.h2`
  font-size: 36px;
  font-weight: 700;
  color: #1a365d;
  text-align: center;
  margin-bottom: 48px;
`;

const PricingCard = styled.div`
  background: white;
  max-width: 600px;
  margin: 0 auto;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
`;

const PricingHeader = styled.div`
  background: #1a365d;
  color: white;
  padding: 32px;
  text-align: center;
`;

const PricingName = styled.h3`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 8px;
`;

const PricingPrice = styled.div`
  font-size: 48px;
  font-weight: 700;
  color: #d69e2e;
  margin-bottom: 8px;
`;

const PricingDuration = styled.div`
  opacity: 0.9;
`;

const PricingFeatures = styled.div`
  padding: 32px;
`;

const Feature = styled.div`
  padding: 12px 0;
  border-bottom: 1px solid #e2e8f0;
  font-weight: 500;
  
  &:last-child {
    border-bottom: none;
  }
`;

const PricingCTA = styled(Link)`
  display: block;
  background: #e53e3e;
  color: white;
  padding: 20px;
  text-align: center;
  font-size: 18px;
  font-weight: 700;
  text-decoration: none;
  transition: background 0.3s ease;
  
  &:hover {
    background: #c53030;
  }
`;

const UrgencySection = styled.section`
  background: linear-gradient(135deg, #e53e3e 0%, #c53030 100%);
  color: white;
  padding: 80px 0;
`;

const UrgencyContent = styled.div`
  text-align: center;
`;

const UrgencyIcon = styled.div`
  font-size: 64px;
  margin-bottom: 24px;
`;

const UrgencyTitle = styled.h2`
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 24px;
`;

const UrgencyText = styled.p`
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 32px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const UrgencyButtons = styled.div`
  display: flex;
  gap: 24px;
  justify-content: center;
  margin-bottom: 24px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const UrgencyPrimaryCTA = styled(Link)`
  background: white;
  color: #e53e3e;
  padding: 20px 40px;
  border-radius: 12px;
  font-size: 18px;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3);
  }
`;

const UrgencySecondaryCTA = styled.div`
  background: transparent;
  border: 2px solid white;
  color: white;
  padding: 20px 40px;
  border-radius: 12px;
  font-size: 18px;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background: white;
    color: #e53e3e;
  }
  
  a {
    color: inherit;
    text-decoration: none;
  }
`;

const UrgencyDisclaimer = styled.div`
  font-size: 14px;
  opacity: 0.9;
`;

export default CryptocurrencyRecoveryLanding; 