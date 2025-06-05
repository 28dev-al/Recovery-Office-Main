import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

interface ServiceDetailProps {
  serviceData: {
    title: string;
    subtitle: string;
    description: string;
    features: string[];
    process: {
      step: number;
      title: string;
      description: string;
    }[];
    pricing: {
      consultation: string;
      recovery: string;
    };
    successRate: string;
    averageRecovery: string;
    testimonial?: {
      text: string;
      author: string;
      amount: string;
    };
    seoTitle?: string;
    seoDescription?: string;
    seoKeywords?: string;
  };
}

export const ServiceDetailTemplate: React.FC<ServiceDetailProps> = ({ serviceData }) => {

  return (
    <Container>
      <Helmet>
        <title>{serviceData.seoTitle || serviceData.title}</title>
        <meta name="description" content={serviceData.seoDescription || serviceData.description} />
        <meta name="keywords" content={serviceData.seoKeywords || ''} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={serviceData.title} />
        <meta property="og:description" content={serviceData.description} />
        <meta property="og:type" content="service" />
        <link rel="canonical" href={`https://recovery-office-online.netlify.app/services/${serviceData.title.toLowerCase().replace(/\s+/g, '-')}`} />
      </Helmet>

      <HeroSection>
        <HeroContent>
          <Breadcrumb>
            <BreadcrumbLink to="/">Home</BreadcrumbLink>
            <BreadcrumbSeparator>→</BreadcrumbSeparator>
            <BreadcrumbLink to="/services">Services</BreadcrumbLink>
            <BreadcrumbSeparator>→</BreadcrumbSeparator>
            <BreadcrumbCurrent>{serviceData.title}</BreadcrumbCurrent>
          </Breadcrumb>

          <HeroTitle>{serviceData.title}</HeroTitle>
          <HeroSubtitle>{serviceData.subtitle}</HeroSubtitle>
          
          <HeroStats>
            <StatItem>
              <StatNumber>{serviceData.successRate}</StatNumber>
              <StatLabel>Success Rate</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>{serviceData.averageRecovery}</StatNumber>
              <StatLabel>Average Recovery</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>24/7</StatNumber>
              <StatLabel>Support</StatLabel>
            </StatItem>
          </HeroStats>
          
          <HeroActions>
            <PrimaryButton to="/booking">
              Book Consultation
            </PrimaryButton>
            <SecondaryButton href="tel:+447451263472">
              Call Now: +44 7451 263472
            </SecondaryButton>
          </HeroActions>
        </HeroContent>
        
        <HeroImage>
          <ImagePlaceholder>
            <ImageIcon>🏢</ImageIcon>
            <ImageText>Professional Service</ImageText>
          </ImagePlaceholder>
        </HeroImage>
      </HeroSection>

      <ServiceContent>
        <ContentSection>
          <SectionTitle>Our Service</SectionTitle>
          <Description>{serviceData.description}</Description>
          
          <FeaturesList>
            {serviceData.features.map((feature, index) => (
              <FeatureItem key={index}>
                <FeatureIcon>✓</FeatureIcon>
                <FeatureText>{feature}</FeatureText>
              </FeatureItem>
            ))}
          </FeaturesList>
        </ContentSection>

        <ProcessSection>
          <SectionTitle>Our Process</SectionTitle>
          <ProcessGrid>
            {serviceData.process.map((step, index) => (
              <ProcessCard key={index}>
                <ProcessNumber>{step.step}</ProcessNumber>
                <ProcessTitle>{step.title}</ProcessTitle>
                <ProcessDescription>{step.description}</ProcessDescription>
              </ProcessCard>
            ))}
          </ProcessGrid>
        </ProcessSection>

        <PricingSection>
          <SectionTitle>Transparent Pricing</SectionTitle>
          <PricingGrid>
            <PricingCard>
              <PricingTitle>Consultation</PricingTitle>
              <PricingPrice>{serviceData.pricing.consultation}</PricingPrice>
              <PricingFeatures>
                <PricingFeature>Initial case assessment</PricingFeature>
                <PricingFeature>Strategy recommendations</PricingFeature>
                <PricingFeature>No obligation consultation</PricingFeature>
              </PricingFeatures>
              <PricingButton to="/booking">Book Now</PricingButton>
            </PricingCard>

            <PricingCard $featured>
              <PricingBadge>Recommended</PricingBadge>
              <PricingTitle>Recovery Service</PricingTitle>
              <PricingPrice>{serviceData.pricing.recovery}</PricingPrice>
              <PricingFeatures>
                <PricingFeature>Complete case handling</PricingFeature>
                <PricingFeature>Legal representation</PricingFeature>
                <PricingFeature>No win, no fee guarantee</PricingFeature>
              </PricingFeatures>
              <PricingButton to="/booking" $primary>Start Recovery</PricingButton>
            </PricingCard>
          </PricingGrid>
        </PricingSection>

        {serviceData.testimonial && (
          <TestimonialSection>
            <TestimonialCard>
              <TestimonialText>"{serviceData.testimonial.text}"</TestimonialText>
              <TestimonialAuthor>
                <AuthorName>{serviceData.testimonial.author}</AuthorName>
                <RecoveryAmount>Recovered: {serviceData.testimonial.amount}</RecoveryAmount>
              </TestimonialAuthor>
            </TestimonialCard>
          </TestimonialSection>
        )}

        <CTASection>
          <CTAContent>
            <CTATitle>Ready to Start Your Recovery?</CTATitle>
            <CTAText>
              Don't let time limits prevent you from recovering what's rightfully yours. 
              Contact our expert team today for a free consultation.
            </CTAText>
            <CTAButtons>
              <CTAButton to="/booking" $primary>
                Book Free Consultation
              </CTAButton>
              <CTAExternalLink href="tel:+447451263472">
                Call Now: +44 7451 263472
              </CTAExternalLink>
            </CTAButtons>
            <CTANote>
              Free consultation • No win, no fee • Professional service
            </CTANote>
          </CTAContent>
        </CTASection>
      </ServiceContent>
    </Container>
  );
};

// Safe styled components with theme fallbacks
const Container = styled.div`
  min-height: 100vh;
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, #1a365d 0%, #2c5282 100%);
  color: white;
  padding: 120px 0 80px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  max-width: 1200px;
  margin: 0 auto;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 80px 24px 60px;
    gap: 32px;
  }
`;

const HeroContent = styled.div`
  padding: 0 24px;
`;

const Breadcrumb = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
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

const HeroTitle = styled.h1`
  font-size: 48px;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 16px;

  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 20px;
  line-height: 1.6;
  opacity: 0.9;
  margin-bottom: 32px;
`;

const HeroStats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-bottom: 32px;
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

const HeroImage = styled.div`
  padding: 0 24px;
  display: flex;
  justify-content: center;
`;

const ImagePlaceholder = styled.div`
  width: 400px;
  height: 300px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px solid rgba(255, 255, 255, 0.2);
`;

const ImageIcon = styled.div`
  font-size: 64px;
  margin-bottom: 16px;
`;

const ImageText = styled.div`
  font-size: 18px;
  font-weight: 600;
`;

const ServiceContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
`;

const ContentSection = styled.section`
  padding: 80px 0;
`;

const SectionTitle = styled.h2`
  font-size: 36px;
  font-weight: 700;
  color: #1a365d;
  text-align: center;
  margin-bottom: 32px;
`;

const Description = styled.p`
  font-size: 18px;
  line-height: 1.8;
  color: #4a5568;
  max-width: 800px;
  margin: 0 auto 48px;
  text-align: center;
`;

const FeaturesList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  max-width: 800px;
  margin: 0 auto;
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const FeatureIcon = styled.div`
  width: 24px;
  height: 24px;
  background: #38a169;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
`;

const FeatureText = styled.div`
  font-size: 16px;
  color: #4a5568;
`;

const ProcessSection = styled.section`
  padding: 80px 0;
  background: #f7fafc;
  margin: 0 -24px;
  padding-left: 24px;
  padding-right: 24px;
`;

const ProcessGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 32px;
  max-width: 1000px;
  margin: 0 auto;
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
`;

const PricingSection = styled.section`
  padding: 80px 0;
`;

const PricingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 32px;
  max-width: 800px;
  margin: 0 auto;
`;

const PricingCard = styled.div<{ $featured?: boolean }>`
  background: white;
  padding: 40px;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  position: relative;
  border: ${({ $featured }) => $featured ? 
    `3px solid #d69e2e` : 
    '1px solid #e2e8f0'};

  ${({ $featured }) => $featured && `
    transform: scale(1.05);
  `}
`;

const PricingBadge = styled.div`
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: #d69e2e;
  color: white;
  padding: 8px 24px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
`;

const PricingTitle = styled.h3`
  font-size: 24px;
  font-weight: 600;
  color: #1a365d;
  margin-bottom: 16px;
`;

const PricingPrice = styled.div`
  font-size: 36px;
  font-weight: 700;
  color: #d69e2e;
  margin-bottom: 24px;
`;

const PricingFeatures = styled.div`
  margin-bottom: 32px;
`;

const PricingFeature = styled.div`
  padding: 8px 0;
  color: #4a5568;
  border-bottom: 1px solid #e2e8f0;

  &:last-child {
    border-bottom: none;
  }
`;

const PricingButton = styled(Link)<{ $primary?: boolean }>`
  display: inline-block;
  padding: 16px 32px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;

  ${({ $primary }) => $primary ? `
    background: #d69e2e;
    color: #1a365d;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(214, 158, 46, 0.3);
    }
  ` : `
    background: transparent;
    color: #1a365d;
    border: 2px solid #1a365d;

    &:hover {
      background: #1a365d;
      color: white;
    }
  `}
`;

const TestimonialSection = styled.section`
  padding: 80px 0;
  background: #f7fafc;
`;

const TestimonialCard = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background: white;
  padding: 48px;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  text-align: center;
`;

const TestimonialText = styled.blockquote`
  font-size: 20px;
  font-style: italic;
  color: #4a5568;
  line-height: 1.8;
  margin-bottom: 32px;
`;

const TestimonialAuthor = styled.div`
  text-align: center;
`;

const AuthorName = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #1a365d;
  margin-bottom: 8px;
`;

const RecoveryAmount = styled.div`
  font-size: 16px;
  color: #38a169;
  font-weight: 600;
`;

const CTASection = styled.section`
  padding: 120px 0;
  background: linear-gradient(135deg, #d69e2e 0%, #f6d55c 100%);
  color: #1a365d;
`;

const CTAContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  padding: 0 24px;
`;

const CTATitle = styled.h2`
  font-size: 42px;
  font-weight: 700;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

const CTAText = styled.p`
  font-size: 20px;
  line-height: 1.6;
  margin-bottom: 48px;
  opacity: 0.9;
`;

const CTAButtons = styled.div`
  display: flex;
  gap: 24px;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 24px;
`;

const CTAButton = styled(Link)<{ $primary?: boolean }>`
  padding: 18px 36px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  font-size: 16px;
  transition: all 0.3s ease;

  ${({ $primary }) => $primary ? `
    background: #1a365d;
    color: white;

    &:hover {
      background: #2c5282;
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(26, 54, 93, 0.3);
    }
  ` : `
    background: transparent;
    color: #1a365d;
    border: 2px solid #1a365d;

    &:hover {
      background: #1a365d;
      color: white;
    }
  `}
`;

const CTAExternalLink = styled.a`
  padding: 18px 36px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  font-size: 16px;
  background: transparent;
  color: #1a365d;
  border: 2px solid #1a365d;
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

export default ServiceDetailTemplate;