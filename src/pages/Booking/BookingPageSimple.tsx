/**
 * Premium BookingPage with Enhanced User Experience
 * 
 * Enhanced booking wizard with premium design elements, improved UX,
 * and streamlined conversion-focused layout.
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
import { PREMIUM_COLORS } from '../../design-system/tokens/colors.premium';

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
      currency: 'CAD',
      ...parameters
    });
  }
};

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(145deg, #f8f9fa 0%, #edf2f7 100%);
  max-width: 100vw;
  overflow-x: hidden;
  box-sizing: border-box;
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, ${PREMIUM_COLORS.BASE_COLORS.navy[500]} 0%, ${PREMIUM_COLORS.BASE_COLORS.navy[700]} 100%);
  color: white;
  text-align: center;
  padding: 80px 20px 60px;
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 120px;
    background: linear-gradient(to top, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0) 100%);
    opacity: 0.3;
    pointer-events: none;
  }
`;

const HeroTitle = styled.h1`
  font-size: 52px;
  font-weight: 800;
  margin-bottom: 20px;
  background: linear-gradient(90deg, #FFFFFF 0%, #e2e8f0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;

  @media (max-width: 768px) {
    font-size: 40px;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 22px;
  opacity: 0.95;
  max-width: 650px;
  margin: 0 auto 40px;
  line-height: 1.6;
  font-weight: 300;
`;

const TrustSignals = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  max-width: 1000px;
  margin: 0 auto;
  
  @media (max-width: 960px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;

const TrustItem = styled.div`
  text-align: center;
  padding: 20px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.1);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  }
`;

const TrustNumber = styled.div`
  font-size: 28px;
  font-weight: 800;
  color: ${PREMIUM_COLORS.BASE_COLORS.gold[500]};
  margin-bottom: 8px;
`;

const TrustLabel = styled.div`
  font-size: 16px;
  opacity: 0.9;
  font-weight: 500;
`;

const BookingContent = styled.div`
  max-width: 1200px;
  margin: -80px auto 0;
  padding: 0 20px 100px;
  position: relative;
  z-index: 2;
  
  @media (max-width: 768px) {
    margin-top: -60px;
  }
`;

const BenefitsSection = styled.section`
  background: white;
  border-radius: 24px;
  padding: 50px;
  margin-bottom: 40px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.03);
  
  @media (max-width: 768px) {
    padding: 30px 20px;
  }
`;

const BenefitsTitle = styled.h2`
  font-size: 36px;
  font-weight: 800;
  color: ${PREMIUM_COLORS.BASE_COLORS.navy[500]};
  text-align: center;
  margin-bottom: 40px;
  position: relative;
  
  &::after {
    content: '';
    width: 80px;
    height: 3px;
    background: ${PREMIUM_COLORS.BASE_COLORS.gold[500]};
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 2px;
  }
`;

const BenefitsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 24px;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const BenefitItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 24px;
  background: #f8fafc;
  border-radius: 16px;
  border-left: 4px solid ${PREMIUM_COLORS.BASE_COLORS.gold[500]};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.08);
    background: #fff;
  }
`;

const BenefitIcon = styled.div`
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, ${PREMIUM_COLORS.BASE_COLORS.navy[500]} 0%, ${PREMIUM_COLORS.BASE_COLORS.navy[700]} 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 20px;
  flex-shrink: 0;
  margin-top: 2px;
  box-shadow: 0 8px 16px rgba(26, 54, 93, 0.2);
`;

const BenefitText = styled.div`
  flex: 1;
`;

const BenefitTitle = styled.strong`
  display: block;
  color: ${PREMIUM_COLORS.BASE_COLORS.navy[500]};
  font-weight: 700;
  font-size: 18px;
  margin-bottom: 8px;
`;

const BenefitDescription = styled.span`
  color: ${PREMIUM_COLORS.SEMANTIC_COLORS.text.secondary};
  font-size: 15px;
  line-height: 1.6;
`;

const ProcessSection = styled.section`
  background: white;
  border-radius: 24px;
  padding: 50px;
  margin-bottom: 40px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.03);
  
  @media (max-width: 768px) {
    padding: 30px 20px;
  }
`;

const ProcessTitle = styled.h3`
  font-size: 32px;
  font-weight: 700;
  color: ${PREMIUM_COLORS.BASE_COLORS.navy[500]};
  text-align: center;
  margin-bottom: 40px;
  position: relative;
  
  &::after {
    content: '';
    width: 60px;
    height: 3px;
    background: ${PREMIUM_COLORS.BASE_COLORS.gold[500]};
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 2px;
  }
`;

const ProcessList = styled.ol`
  list-style: none;
  padding: 0;
  margin: 0;
  counter-reset: step-counter;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
`;

const ProcessStep = styled.li`
  counter-increment: step-counter;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 30px 20px;
  background: #f8fafc;
  border-radius: 16px;
  position: relative;
  transition: all 0.3s ease;
  
  &::before {
    content: counter(step-counter);
    background: linear-gradient(135deg, ${PREMIUM_COLORS.BASE_COLORS.navy[500]} 0%, ${PREMIUM_COLORS.BASE_COLORS.navy[700]} 100%);
    color: white;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 24px;
    margin-bottom: 16px;
    box-shadow: 0 8px 20px rgba(26, 54, 93, 0.2);
  }
  
  &:not(:last-child)::after {
    content: '';
    position: absolute;
    top: 28px;
    right: -12px;
    width: 24px;
    height: 2px;
    background: ${PREMIUM_COLORS.BASE_COLORS.gold[500]};
    z-index: 1;
    
    @media (max-width: 1100px) {
      display: none;
    }
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.08);
    background: #fff;
  }
`;

const StepContent = styled.div`
  width: 100%;
`;

const StepTitle = styled.strong`
  display: block;
  color: ${PREMIUM_COLORS.BASE_COLORS.navy[500]};
  font-weight: 700;
  font-size: 20px;
  margin-bottom: 10px;
`;

const StepDescription = styled.span`
  color: ${PREMIUM_COLORS.SEMANTIC_COLORS.text.secondary};
  font-size: 15px;
  line-height: 1.5;
`;

const ComplianceSection = styled.section`
  background: linear-gradient(135deg, ${PREMIUM_COLORS.BASE_COLORS.navy[600]} 0%, ${PREMIUM_COLORS.BASE_COLORS.navy[800]} 100%);
  color: white;
  border-radius: 24px;
  padding: 50px;
  margin-bottom: 40px;
  text-align: center;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: ${PREMIUM_COLORS.BASE_COLORS.gold[500]};
  }
  
  @media (max-width: 768px) {
    padding: 30px 20px;
  }
`;

const ComplianceTitle = styled.h3`
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 30px;
  background: linear-gradient(90deg, #FFFFFF 0%, #e2e8f0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
`;

const ComplianceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 24px;
  margin-top: 32px;
`;

const ComplianceItem = styled.div`
  padding: 24px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.1);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }
`;

const ComplianceLabel = styled.div`
  font-weight: 700;
  color: ${PREMIUM_COLORS.BASE_COLORS.gold[500]};
  margin-bottom: 10px;
  font-size: 18px;
`;

const ComplianceValue = styled.div`
  font-size: 15px;
  opacity: 0.9;
  line-height: 1.5;
`;

const BookingWizardContainer = styled.div`
  position: relative;
  margin-top: 60px;
`;

const WizardHeader = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

const WizardTitle = styled.h2`
  font-size: 36px;
  font-weight: 800;
  color: ${PREMIUM_COLORS.BASE_COLORS.navy[500]};
  margin-bottom: 16px;
`;

const WizardSubtitle = styled.p`
  font-size: 18px;
  color: ${PREMIUM_COLORS.SEMANTIC_COLORS.text.secondary};
  max-width: 650px;
  margin: 0 auto;
  line-height: 1.6;
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
              "streetAddress": "Suite 2700, 1 First Canadian Place",
              "addressLocality": "Toronto",
              "addressRegion": "Ontario",
              "postalCode": "M5X 1A4",
              "addressCountry": "CA"
            },
            "email": "contact@recovery-office.com"
          },
          "offers": {
            "@type": "Offer",
            "price": "Free Initial Consultation",
            "priceCurrency": "CAD",
            "availability": "InStock",
            "availabilityStarts": new Date().toISOString(),
            "validFrom": new Date().toISOString()
          },
          "bookingAgent": {
            "@type": "Organization",
            "name": "Recovery Office Canada",
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
            {t('booking.subtitle', 'Secure online booking with CIRO regulated specialists. Free initial assessment with 24-hour response time.')}
          </HeroSubtitle>
          
          <TrustSignals>
            <TrustItem>
              <TrustNumber>{t('booking.trust.ciroRegulated', 'CIRO')}</TrustNumber>
              <TrustLabel>Regulated Firm</TrustLabel>
            </TrustItem>
            <TrustItem>
              <TrustNumber>$750M+ CAD</TrustNumber>
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
                  <BenefitTitle>CIRO Regulated Service:</BenefitTitle>
                  <BenefitDescription>{t('booking.benefits.ciroRegulated', 'Fully authorized financial recovery specialists')}</BenefitDescription>
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
                  <BenefitDescription>{t('booking.benefits.proven', '$750M+ CAD recovered for clients since 2019')}</BenefitDescription>
                </BenefitText>
              </BenefitItem>
            </BenefitsList>
          </BenefitsSection>

          <ProcessSection id="booking-process-section">
            <ProcessTitle>{t('booking.process.title', 'Your Booking Process')}</ProcessTitle>
            <ProcessList>
              <ProcessStep>
                <StepContent>
                  <StepTitle>Select Service</StepTitle>
                  <StepDescription>{t('booking.process.step1', 'Choose your recovery need (cryptocurrency, investment fraud, etc.)')}</StepDescription>
                </StepContent>
              </ProcessStep>
              <ProcessStep>
                <StepContent>
                  <StepTitle>Pick Date & Time</StepTitle>
                  <StepDescription>{t('booking.process.step2', 'Select convenient consultation slot')}</StepDescription>
                </StepContent>
              </ProcessStep>
              <ProcessStep>
                <StepContent>
                  <StepTitle>Provide Details</StepTitle>
                  <StepDescription>{t('booking.process.step3', 'Secure form with case information')}</StepDescription>
                </StepContent>
              </ProcessStep>
              <ProcessStep>
                <StepContent>
                  <StepTitle>Confirmation</StepTitle>
                  <StepDescription>{t('booking.process.step4', 'Immediate booking confirmation and preparation materials')}</StepDescription>
                </StepContent>
              </ProcessStep>
            </ProcessList>
          </ProcessSection>

          <ComplianceSection id="booking-compliance-section">
            <ComplianceTitle>Professional Credentials & Compliance</ComplianceTitle>
            <p><strong>CIRO Regulated</strong> - Business Number: <strong>877332510</strong></p>
            <p><strong>$750M+ CAD Recovered</strong> for clients since 2019</p>
            <p><strong>98% Client Satisfaction</strong> rate with verified reviews</p>
            
            <ComplianceGrid>
              <ComplianceItem>
                <ComplianceLabel>CIRO Regulated</ComplianceLabel>
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

          <BookingWizardContainer>
            <WizardHeader>
              <WizardTitle>Book Your Consultation Now</WizardTitle>
              <WizardSubtitle>Complete the booking process below to schedule your confidential financial recovery consultation</WizardSubtitle>
            </WizardHeader>
            <ProfessionalBookingWizard />
          </BookingWizardContainer>
        </BookingContent>
      </Container>
    </>
  );
};

export default BookingPageSimple; 