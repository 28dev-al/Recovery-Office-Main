import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { formatCurrencyCAD } from '../../utils/formatters';
import { Helmet } from 'react-helmet-async';

export const RegulatoryAssistancePage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Regulatory Assistance & Compliance Support | Recovery Office UK</title>
        <meta name="description" content="Expert regulatory complaint assistance services. FCA complaints, ombudsman cases, compensation claims. FCA authorized firm - Recovery Office. Firm Reference: 836358. Call +44 7451 263472." />
        <meta name="keywords" content="regulatory assistance, FCA compliance, financial ombudsman, regulatory disputes, Recovery Office, UK financial regulation, FRN 836358" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Regulatory Assistance & Compliance Support | Recovery Office UK" />
        <meta property="og:description" content="Expert regulatory assistance with 94% success rate. FCA registered (836358). No Win, No Fee." />
        <meta property="og:type" content="service" />
        <link rel="canonical" href="https://recovery-office-online.netlify.app/services/regulatory-assistance" />
      </Helmet>
      <Container>
        {/* Professional Hero Section */}
        <HeroSection>
          <HeroContent>
            <Breadcrumb>
              <BreadcrumbLink to="/">Home</BreadcrumbLink>
              <BreadcrumbSeparator>→</BreadcrumbSeparator>
              <BreadcrumbLink to="/services">Services</BreadcrumbLink>
              <BreadcrumbSeparator>→</BreadcrumbSeparator>
              <BreadcrumbCurrent>Regulatory Assistance</BreadcrumbCurrent>
            </Breadcrumb>

            <HeroBadge>FCA Regulated Firm Reference: 836358</HeroBadge>
            <HeroTitle>Professional Regulatory Assistance & Compliance Support</HeroTitle>
            <HeroSubtitle>
              Expert regulatory compliance assistance, FCA complaint filing, and financial ombudsman representation. Our team of regulatory specialists has successfully resolved over 850 regulatory disputes, securing favorable outcomes for clients across all financial services sectors.
            </HeroSubtitle>
            
            <HeroStats>
              <StatItem>
                <StatNumber>850+</StatNumber>
                <StatLabel>Cases Resolved</StatLabel>
              </StatItem>
              <StatItem>
                <StatNumber>94%</StatNumber>
                <StatLabel>Success Rate</StatLabel>
              </StatItem>
              <StatItem>
                <StatNumber>{formatCurrencyCAD(4200000).replace('.00', '')}+</StatNumber>
                <StatLabel>Compensations Secured</StatLabel>
              </StatItem>
              <StatItem>
                <StatNumber>48hrs</StatNumber>
                <StatLabel>Response Time</StatLabel>
              </StatItem>
            </HeroStats>
            
            <HeroActions>
              <PrimaryButton to="/booking">
                📋 Book Regulatory Consultation
              </PrimaryButton>
              <SecondaryButton href="tel:+447451263472">
                Call Expert: +44 7451 263472
              </SecondaryButton>
            </HeroActions>
            
            <RegulatoryBadges>
              <Badge>🏛️ FCA Registered</Badge>
              <Badge>⚖️ Legal Compliance</Badge>
              <Badge>🛡️ Client Protection</Badge>
              <Badge>📋 No Win, No Fee</Badge>
            </RegulatoryBadges>
          </HeroContent>
          
          <HeroVisual>
            <RegulatoryIcon>⚖️</RegulatoryIcon>
            <RegulatoryBadge>Regulatory Specialists</RegulatoryBadge>
          </HeroVisual>
        </HeroSection>

        {/* Services Section */}
        <ServicesSection>
          <ContentWrapper>
            <SectionHeader>
              <SectionBadge>Our Regulatory Services</SectionBadge>
              <SectionTitle>Comprehensive Financial Regulatory Support</SectionTitle>
              <SectionSubtitle>
                We provide end-to-end regulatory assistance, from initial compliance advice to complex dispute resolution with UK financial regulators and ombudsman services.
              </SectionSubtitle>
            </SectionHeader>
            
            <ServicesGrid>
              <ServiceCard>
                <CardIcon>🏛️</CardIcon>
                <CardTitle>FCA Complaints & Disputes</CardTitle>
                <CardDescription>
                  Professional representation for FCA complaints against banks, investment firms, and financial advisors. We handle complex cases involving mis-selling, poor advice, and regulatory breaches.
                </CardDescription>
                <ServiceStats>
                  <StatLine>Average Compensation: {formatCurrencyCAD(67500)}</StatLine>
                  <StatLine>Success Rate: 96%</StatLine>
                  <StatLine>Cases Handled: 320+</StatLine>
                </ServiceStats>
              </ServiceCard>

              <ServiceCard>
                <CardIcon>🛡️</CardIcon>
                <CardTitle>Financial Ombudsman Service</CardTitle>
                <CardDescription>
                  Expert representation before the Financial Ombudsman Service (FOS) for banking disputes, insurance claims, and investment complaints with professional case preparation and advocacy.
                </CardDescription>
                <ServiceStats>
                  <StatLine>Average Compensation: {formatCurrencyCAD(57000)}</StatLine>
                  <StatLine>Success Rate: 92%</StatLine>
                  <StatLine>Cases Handled: 280+</StatLine>
                </ServiceStats>
              </ServiceCard>

              <ServiceCard>
                <CardIcon>📋</CardIcon>
                <CardTitle>Regulatory Compliance Advisory</CardTitle>
                <CardDescription>
                  Comprehensive compliance advice for financial services firms, including FCA authorization, regulatory reporting, and compliance framework implementation for growing businesses.
                </CardDescription>
                <ServiceStats>
                  <StatLine>Average Saving: {formatCurrencyCAD(127500)}</StatLine>
                  <StatLine>Success Rate: 98%</StatLine>
                  <StatLine>Firms Assisted: 150+</StatLine>
                </ServiceStats>
              </ServiceCard>

              <ServiceCard>
                <CardIcon>⚖️</CardIcon>
                <CardTitle>Financial Services Tribunals</CardTitle>
                <CardDescription>
                  Professional representation at Upper Tribunal (Tax and Chancery Chamber) for complex financial services disputes, regulatory penalties, and enforcement actions requiring specialist advocacy.
                </CardDescription>
                <ServiceStats>
                  <StatLine>Average Penalty Reduction: 65%</StatLine>
                  <StatLine>Success Rate: 88%</StatLine>
                  <StatLine>Tribunals Handled: 45+</StatLine>
                </ServiceStats>
              </ServiceCard>
            </ServicesGrid>
          </ContentWrapper>
        </ServicesSection>

        {/* Process Section */}
        <ProcessSection>
          <ContentWrapper>
            <SectionHeader>
              <SectionBadge>Our Regulatory Process</SectionBadge>
              <SectionTitle>Professional 5-Step Regulatory Resolution</SectionTitle>
            </SectionHeader>
            
            <ProcessGrid>
              <ProcessCard>
                <ProcessNumber>1</ProcessNumber>
                <ProcessTitle>Case Assessment</ProcessTitle>
                <ProcessDescription>
                  Comprehensive review of your regulatory issue, documentation analysis, and merit assessment. We provide honest advice on prospects and potential outcomes within 48 hours.
                </ProcessDescription>
                <ProcessDuration>Completion: 2 days</ProcessDuration>
              </ProcessCard>

              <ProcessCard>
                <ProcessNumber>2</ProcessNumber>
                <ProcessTitle>Regulatory Research</ProcessTitle>
                <ProcessDescription>
                  Detailed analysis of applicable regulations, precedent cases, and regulatory guidance. Our team identifies the strongest legal and regulatory arguments for your case.
                </ProcessDescription>
                <ProcessDuration>Duration: 1-2 weeks</ProcessDuration>
              </ProcessCard>

              <ProcessCard>
                <ProcessNumber>3</ProcessNumber>
                <ProcessTitle>Complaint Preparation</ProcessTitle>
                <ProcessDescription>
                  Professional drafting of regulatory complaints, evidence compilation, and submission to appropriate regulatory bodies including FCA, FOS, or relevant tribunals.
                </ProcessDescription>
                <ProcessDuration>Duration: 1-3 weeks</ProcessDuration>
              </ProcessCard>

              <ProcessCard>
                <ProcessNumber>4</ProcessNumber>
                <ProcessTitle>Regulatory Advocacy</ProcessTitle>
                <ProcessDescription>
                  Active representation throughout the regulatory process, including correspondence with regulators, hearing representation, and negotiation of settlements.
                </ProcessDescription>
                <ProcessDuration>Duration: 2-6 months</ProcessDuration>
              </ProcessCard>

              <ProcessCard>
                <ProcessNumber>5</ProcessNumber>
                <ProcessTitle>Resolution & Recovery</ProcessTitle>
                <ProcessDescription>
                  Successful resolution of your regulatory dispute, compensation recovery, and implementation of any required remedial actions by financial services firms.
                </ProcessDescription>
                <ProcessDuration>Completion: Variable</ProcessDuration>
              </ProcessCard>
            </ProcessGrid>
          </ContentWrapper>
        </ProcessSection>

        {/* Success Stories Section */}
        <TestimonialsSection>
          <ContentWrapper>
            <SectionHeader>
              <SectionBadge>Client Success Stories</SectionBadge>
              <SectionTitle>Regulatory Victories That Matter</SectionTitle>
            </SectionHeader>
            
            <TestimonialsGrid>
              <TestimonialCard>
                <TestimonialText>
                  "Recovery Office successfully challenged my bank's refusal to compensate for investment mis-selling. The CIRO complaint resulted in {formatCurrencyCAD(187500)} compensation plus costs. Their regulatory expertise was exceptional."
                </TestimonialText>
                <TestimonialAuthor>
                  <AuthorInfo>
                    <AuthorName>Robert Harrison</AuthorName>
                    <AuthorLocation>Toronto, ON</AuthorLocation>
                  </AuthorInfo>
                  <CompensationAmount>Compensation: {formatCurrencyCAD(187500)}</CompensationAmount>
                </TestimonialAuthor>
              </TestimonialCard>

              <TestimonialCard>
                <TestimonialText>
                  "When our insurance claim was wrongly denied, Recovery Office took our case to the Financial Ombudsman. They secured full settlement plus additional damages. Professional service throughout."
                </TestimonialText>
                <TestimonialAuthor>
                  <AuthorInfo>
                    <AuthorName>Jennifer Walsh</AuthorName>
                    <AuthorLocation>Vancouver, BC</AuthorLocation>
                  </AuthorInfo>
                  <CompensationAmount>Settlement: {formatCurrencyCAD(133500)}</CompensationAmount>
                </TestimonialAuthor>
              </TestimonialCard>

              <TestimonialCard>
                <TestimonialText>
                  "Recovery Office helped our firm navigate FCA authorization requirements, saving us months of delays and potential penalties. Their compliance expertise is invaluable for financial services businesses."
                </TestimonialText>
                <TestimonialAuthor>
                  <AuthorInfo>
                    <AuthorName>Michael Chen</AuthorName>
                    <AuthorLocation>Calgary, AB</AuthorLocation>
                  </AuthorInfo>
                  <CompensationAmount>Savings: {formatCurrencyCAD(225000)}</CompensationAmount>
                </TestimonialAuthor>
              </TestimonialCard>
            </TestimonialsGrid>
          </ContentWrapper>
        </TestimonialsSection>

        {/* Regulatory Bodies Section */}
        <RegulatoryBodiesSection>
          <ContentWrapper>
            <SectionHeader>
              <SectionBadge>Regulatory Expertise</SectionBadge>
              <SectionTitle>Comprehensive UK Financial Regulatory Coverage</SectionTitle>
            </SectionHeader>
            
            <RegulatoryGrid>
              <RegulatoryCard>
                <RegulatoryLogo>🏛️</RegulatoryLogo>
                <RegulatoryName>Financial Conduct Authority (FCA)</RegulatoryName>
                <RegulatoryDescription>
                  Consumer complaints, firm investigations, enforcement actions, and regulatory breaches across all FCA-regulated activities.
                </RegulatoryDescription>
                <ExpertiseAreas>
                  <Area>Consumer Credit Complaints</Area>
                  <Area>Investment Firm Disputes</Area>
                  <Area>Banking Regulation Issues</Area>
                  <Area>Insurance Disputes</Area>
                </ExpertiseAreas>
              </RegulatoryCard>

              <RegulatoryCard>
                <RegulatoryLogo>⚖️</RegulatoryLogo>
                <RegulatoryName>Financial Ombudsman Service (FOS)</RegulatoryName>
                <RegulatoryDescription>
                  Professional representation for banking, insurance, investment, and credit disputes with comprehensive case preparation and advocacy.
                </RegulatoryDescription>
                <ExpertiseAreas>
                  <Area>Banking Complaints</Area>
                  <Area>Insurance Claims</Area>
                  <Area>Investment Disputes</Area>
                  <Area>Pension Complaints</Area>
                </ExpertiseAreas>
              </RegulatoryCard>

              <RegulatoryCard>
                <RegulatoryLogo>🏦</RegulatoryLogo>
                <RegulatoryName>Prudential Regulation Authority (PRA)</RegulatoryName>
                <RegulatoryDescription>
                  Specialized assistance with prudential regulation matters, capital adequacy issues, and supervision requirements for banks and insurers.
                </RegulatoryDescription>
                <ExpertiseAreas>
                  <Area>Capital Requirements</Area>
                  <Area>Stress Testing</Area>
                  <Area>Supervisory Actions</Area>
                  <Area>Recovery Planning</Area>
                </ExpertiseAreas>
              </RegulatoryCard>

              <RegulatoryCard>
                <RegulatoryLogo>📋</RegulatoryLogo>
                <RegulatoryName>Upper Tribunal (Tax & Chancery)</RegulatoryName>
                <RegulatoryDescription>
                  Expert representation at financial services tribunals for complex regulatory penalty appeals and enforcement action challenges.
                </RegulatoryDescription>
                <ExpertiseAreas>
                  <Area>Penalty Appeals</Area>
                  <Area>Enforcement Challenges</Area>
                  <Area>Regulatory Disputes</Area>
                  <Area>Judicial Reviews</Area>
                </ExpertiseAreas>
              </RegulatoryCard>
            </RegulatoryGrid>
          </ContentWrapper>
        </RegulatoryBodiesSection>

        {/* Pricing Section */}
        <PricingSection>
          <ContentWrapper>
            <SectionHeader>
              <SectionBadge>Transparent Pricing</SectionBadge>
              <SectionTitle>No Win, No Fee Guarantee</SectionTitle>
            </SectionHeader>
            
            <PricingGrid>
              <PricingCard>
                <PricingTitle>Free Consultation</PricingTitle>
                <PricingPrice>{formatCurrencyCAD(0)}</PricingPrice>
                <PricingDescription>Initial regulatory case assessment</PricingDescription>
                <PricingFeatures>
                  <Feature>✓ 48-hour case review</Feature>
                  <Feature>✓ Regulatory merit assessment</Feature>
                  <Feature>✓ Prospects evaluation</Feature>
                  <Feature>✓ Strategy recommendations</Feature>
                  <Feature>✓ No obligation consultation</Feature>
                </PricingFeatures>
                <PricingButton to="/booking">
                  Book Free Assessment
                </PricingButton>
              </PricingCard>

              <PricingCard featured>
                <PricingBadge>Most Popular</PricingBadge>
                <PricingTitle>Success Fee Only</PricingTitle>
                <PricingPrice>20-30%</PricingPrice>
                <PricingDescription>Only charged upon successful resolution</PricingDescription>
                <PricingFeatures>
                  <Feature>✓ No upfront costs</Feature>
                  <Feature>✓ Complete regulatory representation</Feature>
                  <Feature>✓ Expert legal advocacy</Feature>
                  <Feature>✓ All tribunal appearances</Feature>
                  <Feature>✓ 100% no win, no fee guarantee</Feature>
                </PricingFeatures>
                <PricingButton to="/booking" primary>
                  Start Regulatory Case
                </PricingButton>
              </PricingCard>

              <PricingCard>
                <PricingTitle>Compliance Advisory</PricingTitle>
                <PricingPrice>{formatCurrencyCAD(525)}/hr</PricingPrice>
                <PricingDescription>Ongoing regulatory compliance support</PricingDescription>
                <PricingFeatures>
                  <Feature>✓ FCA authorization assistance</Feature>
                  <Feature>✓ Compliance framework design</Feature>
                  <Feature>✓ Regulatory reporting support</Feature>
                  <Feature>✓ Ongoing compliance monitoring</Feature>
                  <Feature>✓ Retainer arrangements available</Feature>
                </PricingFeatures>
                <PricingExternalButton href="tel:+447451263472">
                  Call for Quote
                </PricingExternalButton>
              </PricingCard>
            </PricingGrid>
            
            <GuaranteeNotice>
              ⚖️ <strong>100% No Win, No Fee Guarantee</strong> - If we don\'t secure a successful regulatory outcome, you owe us nothing. Our success depends on achieving results for you.
            </GuaranteeNotice>
          </ContentWrapper>
        </PricingSection>

        {/* Credentials & Compliance */}
        <CredentialsSection>
          <ContentWrapper>
            <CredentialsGrid>
              <CredentialCard>
                <CredentialIcon>🎓</CredentialIcon>
                <CredentialTitle>Qualified Legal Team</CredentialTitle>
                <CredentialDescription>
                  Our team includes qualified solicitors, barristers, and regulatory specialists with extensive experience in financial services law and regulation.
                </CredentialDescription>
              </CredentialCard>

              <CredentialCard>
                <CredentialIcon>🏛️</CredentialIcon>
                <CredentialTitle>FCA Registered Firm</CredentialTitle>
                <CredentialDescription>
                  Fully regulated by the Financial Conduct Authority under firm reference 836358 with comprehensive professional indemnity insurance coverage.
                </CredentialDescription>
              </CredentialCard>

              <CredentialCard>
                <CredentialIcon>📋</CredentialIcon>
                <CredentialTitle>Regulatory Expertise</CredentialTitle>
                <CredentialDescription>
                  Deep expertise in UK financial services regulation, regulatory compliance, and dispute resolution procedures across all regulatory bodies.
                </CredentialDescription>
              </CredentialCard>

              <CredentialCard>
                <CredentialIcon>🔒</CredentialIcon>
                <CredentialTitle>Client Confidentiality</CredentialTitle>
                <CredentialDescription>
                  Strict confidentiality protocols with legal professional privilege protection and comprehensive data protection compliance under GDPR.
                </CredentialDescription>
              </CredentialCard>
            </CredentialsGrid>
          </ContentWrapper>
        </CredentialsSection>

        {/* Urgent CTA */}
        <UrgentCTA>
          <ContentWrapper>
            <CTAContent>
              <CTAIcon>⚡</CTAIcon>
              <CTATitle>Time Limits Apply to Regulatory Complaints</CTATitle>
              <CTAText>
                Most regulatory complaints have strict time limits. FCA complaints must typically be made within 6 years of the issue, or 3 years from when you became aware. Don\'t let time limits prevent you from securing the compensation you deserve.
              </CTAText>
              <CTAButtons>
                <UrgentButton href="tel:+447451263472">
                  📞 Urgent Advice: +44 7451 263472
                </UrgentButton>
                <ConsultationButton to="/booking">
                  Book Immediate Assessment
                </ConsultationButton>
              </CTAButtons>
              <CTANote>
                📋 Free case assessment - ⏰ 48-hour response guarantee - ⚖️ No win, no fee - 🛡️ Full regulatory representation
              </CTANote>
            </CTAContent>
          </ContentWrapper>
        </UrgentCTA>
      </Container>
    </>
  );
};

// Styled Components
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
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y="50" font-size="40" fill="%23d69e2e" opacity="0.05">⚖️</text></svg>') repeat;
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

const RegulatoryBadges = styled.div`
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
`;

const Badge = styled.div`
  font-size: 14px;
  opacity: 0.9;
`;

const HeroVisual = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const RegulatoryIcon = styled.div`
  font-size: 120px;
  color: #d69e2e;
  margin-bottom: 16px;
`;

const RegulatoryBadge = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 12px 24px;
  border-radius: 25px;
  font-weight: 600;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const ServicesSection = styled.section`
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

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 32px;
`;

const ServiceCard = styled.div`
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

const ServiceStats = styled.div`
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

const CompensationAmount = styled.div`
  font-size: 14px;
  color: #38a169;
  font-weight: 600;
`;

const RegulatoryBodiesSection = styled.section`
  padding: 120px 0;
  background: #f7fafc;
`;

const RegulatoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 32px;
`;

const RegulatoryCard = styled.div`
  background: white;
  padding: 32px;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-4px);
  }
`;

const RegulatoryLogo = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
`;

const RegulatoryName = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: #1a365d;
  margin-bottom: 12px;
`;

const RegulatoryDescription = styled.p`
  font-size: 14px;
  color: #4a5568;
  line-height: 1.6;
  margin-bottom: 20px;
`;

const ExpertiseAreas = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Area = styled.div`
  font-size: 12px;
  color: #d69e2e;
  background: rgba(214, 158, 46, 0.1);
  padding: 4px 8px;
  border-radius: 4px;
`;

const PricingSection = styled.section`
  padding: 120px 0;
  background: white;
`;

const PricingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 32px;
  margin-bottom: 48px;
`;

const PricingCard = styled.div<{ featured?: boolean }>`
  background: white;
  padding: 40px;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  position: relative;
  border: ${({ featured }) => (featured ? `3px solid #d69e2e` : '1px solid #e2e8f0')};
  ${({ featured }) => featured && 'transform: scale(1.05);'}
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
  margin-bottom: 8px;
`;

const PricingPrice = styled.div`
  font-size: 36px;
  font-weight: 700;
  color: #d69e2e;
  margin-bottom: 8px;
`;

const PricingDescription = styled.div`
  font-size: 14px;
  color: #4a5568;
  margin-bottom: 24px;
`;

const PricingFeatures = styled.div`
  margin-bottom: 32px;
`;

const Feature = styled.div`
  padding: 6px 0;
  color: #4a5568;
  text-align: left;
`;

const PricingButton = styled(Link)<{ primary?: boolean }>`
  display: inline-block;
  padding: 16px 32px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;

  ${({ primary }) =>
    primary
      ? `
        background: #d69e2e;
        color: #1a365d;
        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(214, 158, 46, 0.3);
        }
      `
      : `
        background: transparent;
        color: #1a365d;
        border: 2px solid #1a365d;
        &:hover {
          background: #1a365d;
          color: white;
        }
      `};
`;

const PricingExternalButton = styled.a<{ primary?: boolean }>`
  display: inline-block;
  padding: 16px 32px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;

  ${({ primary }) =>
    primary
      ? `
        background: #d69e2e;
        color: #1a365d;
        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(214, 158, 46, 0.3);
        }
      `
      : `
        background: transparent;
        color: #1a365d;
        border: 2px solid #1a365d;
        &:hover {
          background: #1a365d;
          color: white;
        }
      `};
`;

const GuaranteeNotice = styled.div`
  text-align: center;
  background: white;
  padding: 24px;
  border-radius: 12px;
  border: 2px solid #38a169;
  color: #1a365d;
  font-size: 16px;
`;

const CredentialsSection = styled.section`
  padding: 80px 0;
  background: #1a365d;
  color: white;
`;

const CredentialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 32px;
`;

const CredentialCard = styled.div`
  text-align: center;
  padding: 24px;
`;

const CredentialIcon = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
`;

const CredentialTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 12px;
  color: #d69e2e;
`;

const CredentialDescription = styled.p`
  font-size: 14px;
  line-height: 1.5;
  opacity: 0.9;
`;

const UrgentCTA = styled.section`
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

const UrgentButton = styled.a`
  background: #1a365d;
  color: white;
  padding: 18px 32px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 700;
  font-size: 16px;
  transition: all 0.3s ease;

  &:hover {
    background: #2c5282; 
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(26, 54, 93, 0.3);
  }
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

export default RegulatoryAssistancePage; 