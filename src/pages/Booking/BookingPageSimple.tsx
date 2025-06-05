/**
 * Professional BookingPage with Complete Step Implementation
 * 
 * Full booking wizard with all steps implemented using professional components.
 * Features complete backend integration and error handling.
 * 
 * FIXED: Removed PremiumLayout wrapper to prevent duplicate header issue.
 * The layout is already provided by App.tsx ConditionalLayout.
 * 
 * SEO OPTIMIZED: Added conversion-focused content, trust signals, and proper meta tags
 * for improved Google Ads performance and booking conversions.
 */

import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { ProfessionalBookingWizard } from './components/ProfessionalBookingWizard';
import DynamicSEO from '../../components/SEO/DynamicSEO';

// Extend Window interface for dataLayer only
declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

// Google Tag Manager conversion tracking utility
const trackBookingEvent = (eventName: string, parameters: Record<string, string | number> = {}) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      event_category: 'booking',
      event_label: 'financial_recovery_consultation',
      currency: 'GBP',
      ...parameters
    });
  }
};

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  max-width: 100vw;
  overflow-x: hidden;
  box-sizing: border-box;
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, #1a365d 0%, #2c5282 100%);
  color: white;
  text-align: center;
  padding: 80px 20px 60px;
`;

const HeroTitle = styled.h1`
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 16px;

  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 20px;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto 32px;
`;

const TrustSignals = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 24px;
  max-width: 800px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
`;

const TrustItem = styled.div`
  text-align: center;
  padding: 16px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  backdrop-filter: blur(10px);
`;

const TrustNumber = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #d69e2e;
  margin-bottom: 4px;
`;

const TrustLabel = styled.div`
  font-size: 14px;
  opacity: 0.9;
`;

const BookingContent = styled.div`
  max-width: 1000px;
  margin: -40px auto 0;
  padding: 0 20px 80px;
  position: relative;
  z-index: 1;
`;

const BenefitsSection = styled.section`
  background: white;
  border-radius: 16px;
  padding: 40px;
  margin-bottom: 32px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
`;

const BenefitsTitle = styled.h2`
  font-size: 32px;
  font-weight: 700;
  color: #1a365d;
  text-align: center;
  margin-bottom: 32px;
`;

const BenefitsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 20px;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const BenefitItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #d69e2e;
`;

const BenefitIcon = styled.div`
  width: 24px;
  height: 24px;
  background: #d69e2e;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 14px;
  flex-shrink: 0;
  margin-top: 2px;
`;

const BenefitText = styled.div`
  flex: 1;
`;

const BenefitTitle = styled.strong`
  display: block;
  color: #1a365d;
  font-weight: 600;
  margin-bottom: 4px;
`;

const BenefitDescription = styled.span`
  color: #4a5568;
  font-size: 14px;
  line-height: 1.5;
`;

const ProcessSection = styled.section`
  background: white;
  border-radius: 16px;
  padding: 40px;
  margin-bottom: 32px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
`;

const ProcessTitle = styled.h3`
  font-size: 24px;
  font-weight: 600;
  color: #1a365d;
  text-align: center;
  margin-bottom: 24px;
`;

const ProcessList = styled.ol`
  list-style: none;
  padding: 0;
  margin: 0;
  counter-reset: step-counter;
`;

const ProcessStep = styled.li`
  counter-increment: step-counter;
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 20px;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;
  
  &:before {
    content: counter(step-counter);
    background: #1a365d;
    color: white;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    flex-shrink: 0;
  }
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const StepContent = styled.div`
  flex: 1;
`;

const StepTitle = styled.strong`
  display: block;
  color: #1a365d;
  font-weight: 600;
  margin-bottom: 4px;
`;

const StepDescription = styled.span`
  color: #4a5568;
  font-size: 14px;
  line-height: 1.5;
`;

const ComplianceSection = styled.section`
  background: #1a365d;
  color: white;
  border-radius: 16px;
  padding: 40px;
  margin-bottom: 32px;
  text-align: center;
`;

const ComplianceTitle = styled.h3`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 24px;
`;

const ComplianceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 24px;
  margin-top: 24px;
`;

const ComplianceItem = styled.div`
  padding: 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  backdrop-filter: blur(10px);
`;

const ComplianceLabel = styled.div`
  font-weight: 600;
  color: #d69e2e;
  margin-bottom: 8px;
`;

const ComplianceValue = styled.div`
  font-size: 14px;
  opacity: 0.9;
`;

export const BookingPageSimple: React.FC = () => {
  const { t } = useTranslation();
  
  // Track booking page view for conversion analytics
  useEffect(() => {
    trackBookingEvent('booking_page_view', {
      page_title: 'Financial Recovery Consultation Booking',
      page_location: window.location.href,
      content_group1: 'booking_funnel'
    });
  }, []);
  
  return (
    <>
      <DynamicSEO 
        page="booking"
        isTransactional={true}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Financial Recovery Consultation Booking",
          "provider": {
            "@type": "FinancialService",
            "name": "Recovery Office",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "2nd Floor, 3 Piccadilly Place, London Road",
              "addressLocality": "Manchester",
              "addressRegion": "Greater Manchester",
              "postalCode": "M1 3BN",
              "addressCountry": "GB"
            },
            "telephone": "+44 7451 263472",
            "email": "info@recovery-office.com"
          },
          "offers": {
            "@type": "Offer",
            "price": "Free Initial Consultation",
            "priceCurrency": "GBP",
            "availability": "InStock",
            "availabilityStarts": new Date().toISOString(),
            "validFrom": new Date().toISOString()
          },
          "bookingAgent": {
            "@type": "Organization",
            "name": "Recovery Office",
            "telephone": "+44 7451 263472",
            "url": "https://recovery-office-online.netlify.app"
          },
          "category": "Financial Recovery Services",
          "serviceType": "Asset Recovery Consultation"
        }}
      />
      
      <Container>
        <HeroSection>
          <HeroTitle>{t('booking.title', 'Book Your Financial Recovery Consultation')}</HeroTitle>
          <HeroSubtitle>
            {t('booking.subtitle', 'Secure online booking with FCA regulated specialists. Free initial assessment with 24-hour response time.')}
          </HeroSubtitle>
          
          <TrustSignals>
            <TrustItem>
              <TrustNumber>{t('booking.trust.fcaRegulated', 'FCA')}</TrustNumber>
              <TrustLabel>Regulated Firm</TrustLabel>
            </TrustItem>
            <TrustItem>
              <TrustNumber>£500M+</TrustNumber>
              <TrustLabel>{t('booking.trust.assetsRecovered', 'Assets Recovered')}</TrustLabel>
            </TrustItem>
            <TrustItem>
              <TrustNumber>98%</TrustNumber>
              <TrustLabel>{t('booking.trust.satisfaction', 'Client Satisfaction')}</TrustLabel>
            </TrustItem>
            <TrustItem>
              <TrustNumber>24h</TrustNumber>
              <TrustLabel>Response Time</TrustLabel>
            </TrustItem>
          </TrustSignals>
        </HeroSection>

        <BookingContent>
          <BenefitsSection id="booking-benefits-section">
            <BenefitsTitle>{t('booking.benefits.title', 'Why Book With Recovery Office?')}</BenefitsTitle>
            <BenefitsList>
              <BenefitItem>
                <BenefitIcon>✓</BenefitIcon>
                <BenefitText>
                  <BenefitTitle>Free Initial Consultation:</BenefitTitle>
                  <BenefitDescription>{t('booking.benefits.freeConsultation', 'No obligation 60-minute assessment')}</BenefitDescription>
                </BenefitText>
              </BenefitItem>
              <BenefitItem>
                <BenefitIcon>🏛️</BenefitIcon>
                <BenefitText>
                  <BenefitTitle>FCA Regulated Service:</BenefitTitle>
                  <BenefitDescription>{t('booking.benefits.fcaRegulated', 'Fully authorized financial recovery specialists')}</BenefitDescription>
                </BenefitText>
              </BenefitItem>
              <BenefitItem>
                <BenefitIcon>⚡</BenefitIcon>
                <BenefitText>
                  <BenefitTitle>24-Hour Response:</BenefitTitle>
                  <BenefitDescription>{t('booking.benefits.fastResponse', 'Immediate confirmation and case assignment')}</BenefitDescription>
                </BenefitText>
              </BenefitItem>
              <BenefitItem>
                <BenefitIcon>💰</BenefitIcon>
                <BenefitText>
                  <BenefitTitle>Success-Based Fees:</BenefitTitle>
                  <BenefitDescription>{t('booking.benefits.successFees', 'Only pay when we recover your assets')}</BenefitDescription>
                </BenefitText>
              </BenefitItem>
              <BenefitItem>
                <BenefitIcon>🔒</BenefitIcon>
                <BenefitText>
                  <BenefitTitle>Absolute Confidentiality:</BenefitTitle>
                  <BenefitDescription>{t('booking.benefits.confidential', 'Bank-level security and discretion')}</BenefitDescription>
                </BenefitText>
              </BenefitItem>
              <BenefitItem>
                <BenefitIcon>📈</BenefitIcon>
                <BenefitText>
                  <BenefitTitle>Proven Results:</BenefitTitle>
                  <BenefitDescription>{t('booking.benefits.proven', '£500M+ recovered for clients since 2019')}</BenefitDescription>
                </BenefitText>
              </BenefitItem>
            </BenefitsList>
          </BenefitsSection>

          <ProcessSection id="booking-process-section">
            <ProcessTitle>{t('booking.process.title', 'Your Booking Process')}</ProcessTitle>
            <ProcessList>
              <ProcessStep>
                <StepContent>
                  <StepTitle>Select Service:</StepTitle>
                  <StepDescription>{t('booking.process.step1', 'Choose your recovery need (cryptocurrency, investment fraud, etc.)')}</StepDescription>
                </StepContent>
              </ProcessStep>
              <ProcessStep>
                <StepContent>
                  <StepTitle>Pick Date & Time:</StepTitle>
                  <StepDescription>{t('booking.process.step2', 'Select convenient consultation slot')}</StepDescription>
                </StepContent>
              </ProcessStep>
              <ProcessStep>
                <StepContent>
                  <StepTitle>Provide Details:</StepTitle>
                  <StepDescription>{t('booking.process.step3', 'Secure form with case information')}</StepDescription>
                </StepContent>
              </ProcessStep>
              <ProcessStep>
                <StepContent>
                  <StepTitle>Confirmation:</StepTitle>
                  <StepDescription>{t('booking.process.step4', 'Immediate booking confirmation and preparation materials')}</StepDescription>
                </StepContent>
              </ProcessStep>
            </ProcessList>
          </ProcessSection>

          <ComplianceSection id="booking-compliance-section">
            <ComplianceTitle>Professional Credentials & Compliance</ComplianceTitle>
            <p><strong>FCA Regulated</strong> - Firm Reference: <strong>836358</strong></p>
            <p><strong>£500M+ Recovered</strong> for clients since 2019</p>
            <p><strong>98% Client Satisfaction</strong> rate with verified reviews</p>
            
            <ComplianceGrid>
              <ComplianceItem>
                <ComplianceLabel>FCA Regulated</ComplianceLabel>
                <ComplianceValue>Authorized financial services firm</ComplianceValue>
              </ComplianceItem>
              <ComplianceItem>
                <ComplianceLabel>GDPR Compliant</ComplianceLabel>
                <ComplianceValue>Enterprise data protection</ComplianceValue>
              </ComplianceItem>
              <ComplianceItem>
                <ComplianceLabel>ISO 27001</ComplianceLabel>
                <ComplianceValue>Information security certified</ComplianceValue>
              </ComplianceItem>
              <ComplianceItem>
                <ComplianceLabel>24/7 Support</ComplianceLabel>
                <ComplianceValue>Emergency consultation available</ComplianceValue>
              </ComplianceItem>
            </ComplianceGrid>
          </ComplianceSection>

          <ProfessionalBookingWizard />
        </BookingContent>
      </Container>
    </>
  );
};

export default BookingPageSimple; 