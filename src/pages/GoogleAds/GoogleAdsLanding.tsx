/**
 * Google Ads Landing Page - Financial Recovery Services
 * 
 * Conversion-optimized landing page specifically designed for Google Ads campaigns.
 * Features:
 * - High-conversion hero section with clear value proposition
 * - Trust-building elements and FCA compliance messaging
 * - Advanced Google Ads conversion tracking
 * - Mobile-first responsive design
 * - Performance optimization for Core Web Vitals
 */

/* eslint-disable */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import DynamicSEO from '../../components/SEO/DynamicSEO';
import { GoogleAnalytics, ServiceTracker } from '../../components/tracking/GoogleAnalytics';
import { PREMIUM_COLORS } from '../../design-system/tokens/colors.premium';
import { config } from '../../config/environment';
import { trackFormSubmission, trackButtonClick } from '../../utils/analytics';
import { trackLeadFormSubmission, trackPhoneCallConversion } from '../../utils/conversions';
import { Helmet } from 'react-helmet-async';
import { formatCurrencyCAD } from '../../utils/formatters';
import { COMPANY_PROFILE_CA } from '../../constants/companyProfile.ca';

/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    gtag_report_conversion?: any; // Google Ads helper injected via script tag
  }
}
/* eslint-enable @typescript-eslint/no-explicit-any */

// Premium spacing tokens
const PREMIUM_SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64
};

// Styled Components for Landing Page
const LandingContainer = styled.div`
  min-height: 100vh;
  background: ${PREMIUM_COLORS.BASE_COLORS.ivory[50]};
  overflow-x: hidden;
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, ${PREMIUM_COLORS.BASE_COLORS.forest[600]} 0%, ${PREMIUM_COLORS.BASE_COLORS.forest[700]} 100%);
  color: white;
  padding: ${PREMIUM_SPACING.xxxl}px ${PREMIUM_SPACING.lg}px;
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
`;

const HeroContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  
  @media (max-width: 768px) {
    text-align: center;
  }
`;

const TrustBadges = styled.div`
  display: flex;
  gap: ${PREMIUM_SPACING.lg}px;
  margin-bottom: ${PREMIUM_SPACING.xl}px;
  justify-content: center;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    justify-content: center;
    gap: ${PREMIUM_SPACING.md}px;
  }
`;

const TrustBadge = styled.div`
  display: flex;
  align-items: center;
  gap: ${PREMIUM_SPACING.sm}px;
  background: rgba(255, 255, 255, 0.1);
  padding: ${PREMIUM_SPACING.sm}px ${PREMIUM_SPACING.md}px;
  border-radius: 25px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  font-size: 14px;
  font-weight: 600;
`;

const HeroContent = styled.div`
  max-width: 800px;
  text-align: center;
`;

const HeroHeadline = styled.h1`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: ${PREMIUM_SPACING.lg}px;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  text-align: center;
`;

const HeroSubheadline = styled.p`
  font-size: clamp(1.1rem, 2.5vw, 1.3rem);
  line-height: 1.6;
  margin-bottom: ${PREMIUM_SPACING.xl}px;
  color: ${PREMIUM_COLORS.BASE_COLORS.ivory[100]};
  opacity: 0.95;
  text-align: center;
`;

const HeroStats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${PREMIUM_SPACING.lg}px;
  margin-bottom: ${PREMIUM_SPACING.xl}px;
  justify-content: center;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: ${PREMIUM_SPACING.xl}px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: ${PREMIUM_SPACING.md}px;
    max-width: 300px;
  }
`;

const StatItem = styled.div`
  text-align: center;
  padding: ${PREMIUM_SPACING.md}px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  backdrop-filter: blur(10px);
`;

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: 800;
  color: ${PREMIUM_COLORS.BASE_COLORS.gold[400]};
  margin-bottom: ${PREMIUM_SPACING.xs}px;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: ${PREMIUM_COLORS.BASE_COLORS.ivory[200]};
  font-weight: 500;
`;

const CTASection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${PREMIUM_SPACING.md}px;
  margin-bottom: ${PREMIUM_SPACING.xl}px;
  align-items: center;
  justify-content: center;
  
  @media (max-width: 768px) {
    align-items: center;
  }
`;

const PrimaryButton = styled.button`
  background: linear-gradient(135deg, ${PREMIUM_COLORS.BASE_COLORS.gold[500]} 0%, ${PREMIUM_COLORS.BASE_COLORS.gold[600]} 100%);
  color: ${PREMIUM_COLORS.BASE_COLORS.forest[700]};
  border: none;
  padding: ${PREMIUM_SPACING.lg}px ${PREMIUM_SPACING.xl}px;
  font-size: 1.2rem;
  font-weight: 700;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 25px rgba(0, 0, 0, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const EmergencyButton = styled.a`
  background: ${PREMIUM_COLORS.SEMANTIC_COLORS.state.error};
  color: white;
  text-decoration: none;
  padding: ${PREMIUM_SPACING.md}px ${PREMIUM_SPACING.lg}px;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 25px;
  display: inline-flex;
  align-items: center;
  gap: ${PREMIUM_SPACING.sm}px;
  transition: all 0.3s ease;
  
  &:hover {
    background: #dc2626;
    transform: translateY(-1px);
  }
`;

const TrustIndicators = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${PREMIUM_SPACING.lg}px;
  font-size: 0.9rem;
  color: ${PREMIUM_COLORS.BASE_COLORS.ivory[200]};
  justify-content: center;
  
  span {
    display: flex;
    align-items: center;
    gap: ${PREMIUM_SPACING.xs}px;
  }
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

// Services Section Styles
const ServicesSection = styled.section`
  padding: ${PREMIUM_SPACING.xxxl}px ${PREMIUM_SPACING.lg}px;
  background: white;
`;

const SectionHeader = styled.div`
  text-align: center;
  max-width: 800px;
  margin: 0 auto ${PREMIUM_SPACING.xxxl}px;
  
  h2 {
    font-size: clamp(2rem, 4vw, 3rem);
    color: ${PREMIUM_COLORS.BASE_COLORS.forest[600]};
    margin-bottom: ${PREMIUM_SPACING.md}px;
    font-weight: 700;
  }
  
  p {
    font-size: 1.1rem;
    color: ${PREMIUM_COLORS.BASE_COLORS.gray[600]};
    line-height: 1.6;
  }
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: ${PREMIUM_SPACING.xl}px;
  max-width: 1200px;
  margin: 0 auto;
`;

const ServiceCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: ${PREMIUM_SPACING.xl}px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid ${PREMIUM_COLORS.BASE_COLORS.gray[200]};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
  }
`;

const ServiceIcon = styled.div`
  font-size: 3rem;
  margin-bottom: ${PREMIUM_SPACING.lg}px;
`;

const ServiceTitle = styled.h3`
  font-size: 1.5rem;
  color: ${PREMIUM_COLORS.BASE_COLORS.forest[600]};
  margin-bottom: ${PREMIUM_SPACING.md}px;
  font-weight: 700;
`;

const ServiceDescription = styled.p`
  color: ${PREMIUM_COLORS.BASE_COLORS.gray[600]};
  line-height: 1.6;
  margin-bottom: ${PREMIUM_SPACING.lg}px;
`;

const ServiceFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: ${PREMIUM_SPACING.lg}px;
  
  li {
    padding: ${PREMIUM_SPACING.sm}px 0;
    color: ${PREMIUM_COLORS.BASE_COLORS.gray[700]};
    position: relative;
    padding-left: ${PREMIUM_SPACING.lg}px;
    
    &::before {
      content: '✓';
      position: absolute;
      left: 0;
      color: ${PREMIUM_COLORS.SEMANTIC_COLORS.state.success};
      font-weight: bold;
    }
  }
`;

const ServiceCTA = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${PREMIUM_SPACING.md}px;
  
  .success-rate {
    background: rgba(16, 185, 129, 0.1);
    color: ${PREMIUM_COLORS.SEMANTIC_COLORS.state.success};
    padding: ${PREMIUM_SPACING.xs}px ${PREMIUM_SPACING.sm}px;
    border-radius: 15px;
    font-size: 0.9rem;
    font-weight: 600;
  }
  
  button {
    background: ${PREMIUM_COLORS.BASE_COLORS.forest[600]};
    color: white;
    border: none;
    padding: ${PREMIUM_SPACING.md}px ${PREMIUM_SPACING.lg}px;
    border-radius: 25px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
      background: ${PREMIUM_COLORS.BASE_COLORS.forest[700]};
      transform: translateY(-1px);
    }
  }
`;

// Consultation Form Section Styles
const ConsultationFormSection = styled.section`
  padding: ${PREMIUM_SPACING.xxxl}px ${PREMIUM_SPACING.lg}px;
  background: linear-gradient(135deg, ${PREMIUM_COLORS.BASE_COLORS.ivory[50]} 0%, #ffffff 100%);
  border-top: 1px solid ${PREMIUM_COLORS.BASE_COLORS.gray[200]};
`;

const FormContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const FormHeader = styled.div`
  text-align: center;
  margin-bottom: ${PREMIUM_SPACING.xxxl}px;
  
  h2 {
    font-size: clamp(2rem, 4vw, 2.5rem);
    color: ${PREMIUM_COLORS.BASE_COLORS.forest[600]};
    margin-bottom: ${PREMIUM_SPACING.md}px;
    font-weight: 700;
  }
  
  p {
    font-size: 1.1rem;
    color: ${PREMIUM_COLORS.BASE_COLORS.gray[600]};
    margin-bottom: ${PREMIUM_SPACING.lg}px;
    line-height: 1.6;
  }
`;

const FormTrustIndicators = styled.div`
  display: flex;
  justify-content: center;
  gap: ${PREMIUM_SPACING.lg}px;
  flex-wrap: wrap;
  
  span {
    color: ${PREMIUM_COLORS.SEMANTIC_COLORS.state.success};
    font-weight: 600;
    font-size: 0.9rem;
  }
`;

const ConsultationForm = styled.form`
  background: white;
  padding: ${PREMIUM_SPACING.xl}px;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid ${PREMIUM_COLORS.BASE_COLORS.gray[200]};
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${PREMIUM_SPACING.lg}px;
  margin-bottom: ${PREMIUM_SPACING.lg}px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: ${PREMIUM_SPACING.md}px;
  }
`;

const FormGroup = styled.div`
  label {
    display: block;
    margin-bottom: ${PREMIUM_SPACING.sm}px;
    font-weight: 600;
    color: ${PREMIUM_COLORS.BASE_COLORS.forest[600]};
  }
  
  input, select, textarea {
    width: 100%;
    padding: ${PREMIUM_SPACING.md}px;
    border: 2px solid ${PREMIUM_COLORS.BASE_COLORS.gray[300]};
    border-radius: 10px;
    font-size: 1rem;
    transition: all 0.3s ease;
    
    &:focus {
      outline: none;
      border-color: ${PREMIUM_COLORS.BASE_COLORS.forest[500]};
      box-shadow: 0 0 0 3px rgba(26, 54, 93, 0.1);
    }
  }
  
  textarea {
    resize: vertical;
    min-height: 100px;
  }
`;

const ConsentSection = styled.div`
  display: flex;
  gap: ${PREMIUM_SPACING.sm}px;
  align-items: flex-start;
  margin: ${PREMIUM_SPACING.lg}px 0;
  
  input[type="checkbox"] {
    width: auto;
    margin-top: 2px;
  }
  
  label {
    font-size: 0.9rem;
    line-height: 1.5;
    color: ${PREMIUM_COLORS.BASE_COLORS.gray[600]};
  }
`;

const SubmitButton = styled.button`
  background: linear-gradient(135deg, ${PREMIUM_COLORS.BASE_COLORS.forest[600]} 0%, ${PREMIUM_COLORS.BASE_COLORS.forest[700]} 100%);
  color: white;
  border: none;
  padding: ${PREMIUM_SPACING.lg}px ${PREMIUM_SPACING.xxxl}px;
  font-size: 1.2rem;
  font-weight: 700;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  width: 100%;
  margin-bottom: ${PREMIUM_SPACING.lg}px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 25px rgba(0, 0, 0, 0.3);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const SecurityNote = styled.div`
  text-align: center;
  font-size: 0.9rem;
  color: ${PREMIUM_COLORS.BASE_COLORS.gray[600]};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${PREMIUM_SPACING.sm}px;
`;

const SubmissionMessage = styled.div`
  margin-top: 20px;
  padding: 16px;
  border-radius: 8px;
  font-weight: 500;
  
  &.success {
    background: #f0f9ff;
    border: 2px solid #22c55e;
    color: #065f46;
  }
  
  &.error {
    background: #fef2f2;
    border: 2px solid #ef4444;
    color: #991b1b;
  }
`;

const ReferenceNumber = styled.div`
  font-family: 'Courier New', monospace;
  font-size: 18px;
  font-weight: bold;
  margin: 8px 0;
  padding: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  text-align: center;
`;

const LoadingSpinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid #ffffff40;
  border-top: 2px solid #ffffff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  display: inline-block;
  margin-right: 8px;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;



// Why Choose Us Section Styles
const WhyChooseUsSection = styled.section`
  padding: ${PREMIUM_SPACING.xxxl}px ${PREMIUM_SPACING.lg}px;
  background: white;
`;

const BenefitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${PREMIUM_SPACING.xl}px;
  max-width: 1200px;
  margin: 0 auto;
`;

const BenefitCard = styled.div`
  text-align: center;
  padding: ${PREMIUM_SPACING.xl}px;
  background: ${PREMIUM_COLORS.BASE_COLORS.ivory[50]};
  border-radius: 20px;
  border: 1px solid ${PREMIUM_COLORS.BASE_COLORS.gray[200]};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
  }
`;

const BenefitIcon = styled.div`
  font-size: 3rem;
  margin-bottom: ${PREMIUM_SPACING.lg}px;
`;

const BenefitTitle = styled.h3`
  font-size: 1.3rem;
  color: ${PREMIUM_COLORS.BASE_COLORS.forest[600]};
  margin-bottom: ${PREMIUM_SPACING.md}px;
  font-weight: 700;
`;

const BenefitDescription = styled.p`
  color: ${PREMIUM_COLORS.BASE_COLORS.gray[600]};
  line-height: 1.6;
  font-size: 0.95rem;
`;



// Urgency Section Styles
const UrgencySection = styled.section`
  padding: ${PREMIUM_SPACING.xxxl}px ${PREMIUM_SPACING.lg}px;
  background: linear-gradient(135deg, ${PREMIUM_COLORS.SEMANTIC_COLORS.state.error} 0%, #dc2626 100%);
  color: white;
`;

const UrgencyContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: ${PREMIUM_SPACING.xl}px;
  align-items: center;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
    gap: ${PREMIUM_SPACING.lg}px;
  }
`;

const UrgencyIcon = styled.div`
  font-size: 4rem;
`;

const UrgencyContent = styled.div``;

const UrgencyTitle = styled.h2`
  font-size: clamp(1.8rem, 3vw, 2.2rem);
  margin-bottom: ${PREMIUM_SPACING.md}px;
  font-weight: 700;
`;

const UrgencyText = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: ${PREMIUM_SPACING.lg}px;
  opacity: 0.95;
`;

const UrgencyStats = styled.div`
  display: flex;
  gap: ${PREMIUM_SPACING.xl}px;
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const UrgencyStat = styled.div`
  text-align: center;
`;

const StatPercentage = styled.div`
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: ${PREMIUM_SPACING.xs}px;
`;

const StatLabelUrgency = styled.div`
  font-size: 0.9rem;
  opacity: 0.9;
`;

const UrgencyAction = styled.div`
  text-align: center;
  
  span {
    display: block;
    margin-top: ${PREMIUM_SPACING.sm}px;
    font-size: 0.9rem;
    opacity: 0.9;
  }
`;

// Final CTA Section Styles
const FinalCTASection = styled.section`
  padding: ${PREMIUM_SPACING.xxxl}px ${PREMIUM_SPACING.lg}px;
  background: ${PREMIUM_COLORS.BASE_COLORS.forest[900]};
  color: white;
`;

const CTAContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
`;

const CTAContent = styled.div`
  margin-bottom: ${PREMIUM_SPACING.xl}px;
`;

const CTATitle = styled.h2`
  font-size: clamp(2.5rem, 4vw, 3rem);
  margin-bottom: ${PREMIUM_SPACING.md}px;
  font-weight: 700;
`;

const CTASubtitle = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: ${PREMIUM_SPACING.lg}px;
  opacity: 0.95;
`;

const CTAFeatures = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${PREMIUM_SPACING.md}px;
  max-width: 500px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CTAFeature = styled.div`
  color: ${PREMIUM_COLORS.BASE_COLORS.gold[400]};
  font-weight: 600;
`;

const CTAActions = styled.div`
  display: flex;
  gap: ${PREMIUM_SPACING.lg}px;
  justify-content: center;
  margin-bottom: ${PREMIUM_SPACING.xl}px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const SecondaryButton = styled.a`
  background: transparent;
  color: white;
  border: 2px solid white;
  text-decoration: none;
  padding: ${PREMIUM_SPACING.lg}px ${PREMIUM_SPACING.xl}px;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-block;
  
  &:hover {
    background: white;
    color: ${PREMIUM_COLORS.BASE_COLORS.forest[900]};
    transform: translateY(-2px);
  }
`;

const CTADisclaimer = styled.div`
  margin-top: ${PREMIUM_SPACING.xl}px;
`;

const FCADisclaimer = styled.p`
  font-size: 0.85rem;
  opacity: 0.8;
  line-height: 1.5;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  padding-top: ${PREMIUM_SPACING.lg}px;
`;

interface GoogleAdsFormData {
  name: string;
  email: string;
  phone: string;
  estimatedLoss: string;
  lossType: string;
  urgencyLevel: string;
  description: string;
}

interface SubmissionStatus {
  type: 'success' | 'error';
  message: string;
}

const GoogleAdsLanding: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus | null>(null);
  const [, setFormData] = useState<GoogleAdsFormData>({
    name: '',
    email: '',
    phone: '',
    estimatedLoss: '',
    lossType: '',
    urgencyLevel: 'Standard (48-72 hours)',
    description: ''
  });

  // Google Ads Conversion Tracking
  useEffect(() => {
    // Track landing page view
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: 'Financial Recovery Landing Page',
        page_location: window.location.href,
        content_group1: 'Google Ads Landing Pages',
        custom_parameters: {
          landing_page: 'financial-recovery',
          traffic_source: 'google-ads'
        }
      });
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionStatus(null);

    try {
      const formDataObj = new FormData(e.currentTarget);
      const currentFormData: GoogleAdsFormData = {
        name: formDataObj.get('name') as string,
        email: formDataObj.get('email') as string,
        phone: formDataObj.get('phone') as string,
        estimatedLoss: formDataObj.get('estimatedLoss') as string,
        lossType: formDataObj.get('lossType') as string,
        urgencyLevel: formDataObj.get('urgencyLevel') as string,
        description: formDataObj.get('description') as string
      };

      // Validate required fields
      if (!currentFormData.name || !currentFormData.email || !currentFormData.phone || !currentFormData.lossType) {
        throw new Error('Please fill in all required fields');
      }

      // Map loss type from user-friendly to backend enum
      const mapLossType = (lossType: string): string => {
        const mapping: { [key: string]: string } = {
          "Cryptocurrency Theft/Scam": "cryptocurrency-recovery",
          "Investment Fraud/Ponzi Scheme": "investment-fraud", 
          "Romance Scam": "romance-scam",
          "Business Email Compromise": "financial-scam",
          "Forex/Trading Scam": "forex-scam",
          "Other Financial Fraud": "other"
        };
        return mapping[lossType] || "other";
      };

      // Map urgency level from user-friendly to backend enum
      const mapUrgencyLevel = (urgencyLevel: string): string => {
        if (urgencyLevel.includes("Emergency")) return "emergency";
        if (urgencyLevel.includes("Urgent")) return "urgent";
        return "normal";
      };

      // Format data exactly as backend expects (snake_case field names)
      const payload = {
        name: currentFormData.name.trim(),
        email: currentFormData.email.toLowerCase().trim(),
        phone: currentFormData.phone.trim(),
        estimated_loss: currentFormData.estimatedLoss || "",
        loss_type: mapLossType(currentFormData.lossType),
        urgency_level: mapUrgencyLevel(currentFormData.urgencyLevel),
        description: currentFormData.description || ""
      };
      
      console.log('Sending payload:', payload); // Debug log
      
      const response = await fetch(`${config.api.baseURL}/api/google-ads/leads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const responseText = await response.text();
      console.log('Response status:', response.status);
      console.log('Response body:', responseText);
      
      if (!response.ok) {
        if (response.status === 409) {
          // 409 means duplicate - this is actually success with existing reference
          const errorResult = JSON.parse(responseText);
          setSubmissionStatus({
            type: 'success',
            message: `✅ We already have your request! Reference: ${errorResult.existingReference}. Our team will contact you soon.`
          });
          return; // Don't throw error for 409
        }
        throw new Error(`Server error: ${response.status} - ${responseText}`);
      }
      
      const result = JSON.parse(responseText);

      if (result.success) {
        // Success - show confirmation with reference number
        setSubmissionStatus({
          type: 'success',
          message: `✅ Thank you! Your request has been submitted successfully. Reference: ${result.reference_number}. ${result.response_time}.`
        });
        
        // Enhanced Google Analytics tracking with our new utility
        trackFormSubmission({
          form_type: 'google_ads_lead_form',
          form_location: 'landing_page',
          service_type: currentFormData.lossType,
          estimated_loss: currentFormData.estimatedLoss,
          urgency_level: currentFormData.urgencyLevel,
          reference_number: result.reference_number
        });
        
        // Google Ads conversion tracking - Lead form submission
        trackLeadFormSubmission();

        // Facebook Pixel tracking (if available)
        interface WindowWithFbq extends Window {
          /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
          fbq?: (...args: unknown[]) => void;
        }
        
        const windowWithFbq = window as WindowWithFbq;
        if ('fbq' in window && typeof windowWithFbq.fbq === 'function') {
          windowWithFbq.fbq('track', 'Lead', {
            content_name: 'Google Ads Lead Submission',
            content_category: 'Financial Recovery',
            value: 0,
            currency: 'GBP'
          });
        }

        // Reset form after successful submission
        setFormData({
          name: '',
          email: '',
          phone: '',
          estimatedLoss: '',
          lossType: '',
          urgencyLevel: 'Standard (48-72 hours)',
          description: ''
        });

        // Safe form reset - check if form exists
        const form = document.querySelector('form');
        if (form) {
          form.reset();
        }

      } else {
        // Backend returned error
        setSubmissionStatus({
          type: 'error',
          message: result.message || 'There was an error submitting your request. Please try again or call us directly.'
        });
      }

    } catch (error) {
      console.error('Form submission error:', error);
      setSubmissionStatus({
        type: 'error',
        message: 'Submission failed. Please email us at contact@recovery-office.ca for immediate assistance.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToForm = () => {
    const formElement = document.getElementById('consultation-form');
    formElement?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Google Ads click-conversion snippet (added as per Google guidance) */}
      <Helmet>
        <script type="text/javascript">{`
          function gtag_report_conversion(url) {
            var callback = function () {
              if (typeof(url) !== 'undefined') {
                window.location = url;
              }
            };
            if (typeof gtag !== 'undefined') {
              gtag('event', 'conversion', {
                'send_to': 'AW-17199312546/ZyoxCLLymdwaEKLdoolA',
                'value': 1.0,
                'currency': 'USD',
                'event_callback': callback
              });
            }
            return false;
          }
        `}</script>
      </Helmet>
      <ServiceTracker serviceType="Financial Recovery" interactionType="landing_page_view">
        <LandingContainer>
          {/* SEO Optimization for Google Ads */}
          <DynamicSEO 
            page="financial-recovery"
            customTitle="Financial Asset Recovery Services | FCA Regulated | Recovery Office"
            customDescription="Professional financial asset recovery services. Cryptocurrency recovery, investment fraud recovery, scam recovery. FCA regulated. Free consultation. No recovery, no fee."
            customKeywords="financial recovery, cryptocurrency recovery, investment fraud recovery, asset recovery UK, FCA regulated recovery"
            isTransactional={true}
            structuredData={{
              "@context": "https://schema.org",
              "@type": "FinancialService",
              "name": "Recovery Office",
              "description": "Professional financial asset recovery services specializing in cryptocurrency recovery, investment fraud recovery, and financial scam recovery.",
              "url": "https://recovery-office-online.netlify.app/financial-recovery",
              "email": "contact@recovery-office.ca",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "2nd Floor, 3 Piccadilly Place, London Road",
                "addressLocality": "Manchester",
                "postalCode": "M1 3BN",
                "addressCountry": "GB"
              },
              "areaServed": "United Kingdom",
              "serviceType": "Financial Asset Recovery",
              "offers": [{
                "@type": "Offer",
                "name": "Free Financial Recovery Consultation",
                "description": "Complimentary assessment of recovery options",
                "price": "0",
                "priceCurrency": "GBP"
              }],
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "247"
              }
            }}
          />

          {/* Google Analytics Tracking */}
          <GoogleAnalytics 
            pageTitle="Financial Recovery Landing Page"
            pagePath="/financial-recovery"
            isTransactional={true}
            serviceType="Financial Recovery Services"
          />

          {/* Hero Section */}
          <HeroSection>
            <HeroContainer>
              <HeroContent>
                <TrustBadges>
                  <TrustBadge>
                    <span>🛡️</span>
                    <span>CIRO Regulated</span>
                  </TrustBadge>
                  <TrustBadge>
                    <span>🔒</span>
                    <span>$15M CAD Insured</span>
                  </TrustBadge>
                  <TrustBadge>
                    <span>💰</span>
                    <span>$750M+ CAD Recovered</span>
                  </TrustBadge>
                </TrustBadges>
                
                <HeroHeadline>
                  Recover Your Lost Financial Assets
                </HeroHeadline>
                
                <HeroSubheadline>
                  Canada's Leading CIRO-Regulated Financial Recovery Specialists. 
                  Free Consultation • No Recovery, No Fee • 24/7 Emergency Response
                </HeroSubheadline>
                
                <HeroStats>
                  <StatItem>
                    <StatNumber>{formatCurrencyCAD(750000000).replace('.00', '')}M+</StatNumber>
                    <StatLabel>Successfully Recovered</StatLabel>
                  </StatItem>
                  <StatItem>
                    <StatNumber>98%</StatNumber>
                    <StatLabel>Client Satisfaction</StatLabel>
                  </StatItem>
                  <StatItem>
                    <StatNumber>24/7</StatNumber>
                    <StatLabel>Emergency Support</StatLabel>
                  </StatItem>
                </HeroStats>
                
                <CTASection>
                  <PrimaryButton onClick={() => {
                    trackButtonClick('Get Free Recovery Assessment', 'hero_section', '#consultation-form');
                    if (typeof window.gtag_report_conversion === 'function') {
                      window.gtag_report_conversion();
                    }
                    scrollToForm();
                  }}>
                    Get Free Recovery Assessment
                  </PrimaryButton>
                  <EmergencyButton href="/booking" onClick={() => {
                    trackButtonClick('Schedule Urgent Consultation', 'hero_section', '/booking');
                  }}>
                    🚨 Schedule Urgent Consultation
                  </EmergencyButton>
                </CTASection>
                
                <TrustIndicators>
                  <span>✓ Free Initial Assessment</span>
                  <span>✓ No Upfront Fees</span>
                  <span>✓ CIRO Regulated Firm #{COMPANY_PROFILE_CA.businessNumber}</span>
                </TrustIndicators>
              </HeroContent>
            </HeroContainer>
          </HeroSection>

          {/* Services Section */}
          <ServicesSection>
            <SectionHeader>
              <h2>Specialized Financial Recovery Services</h2>
              <p>Expert assistance for victims of financial fraud and asset theft</p>
            </SectionHeader>
            
            <ServicesGrid>
              <ServiceCard>
                <ServiceIcon>💰</ServiceIcon>
                <ServiceTitle>Cryptocurrency Recovery</ServiceTitle>
                <ServiceDescription>
                  Professional recovery of stolen Bitcoin, Ethereum, and other digital assets. 
                  Advanced blockchain forensics and exchange coordination.
                </ServiceDescription>
                <ServiceFeatures>
                  <li>Blockchain transaction analysis</li>
                  <li>Exchange account recovery</li>
                  <li>Wallet reconstruction</li>
                  <li>Legal enforcement coordination</li>
                </ServiceFeatures>
                <ServiceCTA>
                  <span className="success-rate">87% Success Rate</span>
                  <button onClick={scrollToForm}>Get Crypto Recovery Help</button>
                </ServiceCTA>
              </ServiceCard>
              
              <ServiceCard>
                <ServiceIcon>📈</ServiceIcon>
                <ServiceTitle>Investment Fraud Recovery</ServiceTitle>
                <ServiceDescription>
                  Specialized assistance for victims of Ponzi schemes, fake investment platforms, and authorized push payment fraud.
                </ServiceDescription>
                <ServiceFeatures>
                  <li>Asset tracing and freezing</li>
                  <li>Regulatory complaint filing</li>
                  <li>Legal action coordination</li>
                  <li>Evidence gathering</li>
                </ServiceFeatures>
                <ServiceCTA>
                  <span className="success-rate">92% Success Rate</span>
                  <button onClick={scrollToForm}>Recover Investment Losses</button>
                </ServiceCTA>
              </ServiceCard>
              
              <ServiceCard>
                <ServiceIcon>🛡️</ServiceIcon>
                <ServiceTitle>Financial Scam Recovery</ServiceTitle>
                <ServiceDescription>
                  Comprehensive recovery services for romance scams, business email compromise, and other financial frauds.
                </ServiceDescription>
                <ServiceFeatures>
                  <li>Bank account freezing</li>
                  <li>International coordination</li>
                  <li>Evidence preservation</li>
                  <li>Recovery negotiations</li>
                </ServiceFeatures>
                <ServiceCTA>
                  <span className="success-rate">89% Success Rate</span>
                  <button onClick={scrollToForm}>Start Scam Recovery</button>
                </ServiceCTA>
              </ServiceCard>
            </ServicesGrid>
          </ServicesSection>

          {/* Consultation Form Section */}
          <ConsultationFormSection id="consultation-form">
            <FormContainer>
              <FormHeader>
                <h2>Get Your Free Recovery Assessment</h2>
                <p>Speak with our CIRO-regulated specialists. Completely confidential, no obligation.</p>
                <FormTrustIndicators>
                  <span>✓ Free Initial Assessment</span>
                  <span>✓ 24-Hour Response</span>
                  <span>✓ CIRO Regulated Business #877332510</span>
                </FormTrustIndicators>
              </FormHeader>
              
              <ConsultationForm onSubmit={handleSubmit}>
                <FormRow>
                  <FormGroup>
                    <label htmlFor="name">Full Name *</label>
                    <input 
                      id="name"
                      name="name"
                      type="text" 
                      required 
                      placeholder="Enter your full name" 
                    />
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="email">Email Address *</label>
                    <input 
                      id="email"
                      name="email"
                      type="email" 
                      required 
                      placeholder="your.email@example.com" 
                    />
                  </FormGroup>
                </FormRow>
                
                <FormRow>
                  <FormGroup>
                    <label htmlFor="phone">Phone Number *</label>
                    <input 
                      id="phone"
                      name="phone"
                      type="tel" 
                      required 
                      placeholder="(555) 123-4567" 
                    />
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="estimatedLoss">Estimated Loss Amount</label>
                    <select id="estimatedLoss" name="estimatedLoss">
                      <option>Under $15,000 CAD</option>
                      <option>$15,000 - $75,000 CAD</option>
                      <option>$75,000 - $150,000 CAD</option>
                      <option>$150,000 - $750,000 CAD</option>
                      <option>Over $750,000 CAD</option>
                    </select>
                  </FormGroup>
                </FormRow>
                
                <FormRow>
                  <FormGroup>
                    <label htmlFor="lossType">Type of Loss *</label>
                    <select id="lossType" name="lossType" required>
                      <option value="">Select loss type</option>
                      <option>Cryptocurrency Theft/Scam</option>
                      <option>Investment Fraud/Ponzi Scheme</option>
                      <option>Romance Scam</option>
                      <option>Business Email Compromise</option>
                      <option>Forex/Trading Scam</option>
                      <option>Other Financial Fraud</option>
                    </select>
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="urgencyLevel">Urgency Level</label>
                    <select id="urgencyLevel" name="urgencyLevel">
                      <option>Standard (48-72 hours)</option>
                      <option>Urgent (24 hours)</option>
                      <option>Emergency (Same day)</option>
                    </select>
                  </FormGroup>
                </FormRow>
                
                <FormGroup>
                  <label htmlFor="description">Brief Description of Your Case</label>
                  <textarea 
                    id="description"
                    name="description"
                    rows={3} 
                    placeholder="Please provide a brief description of your situation..."
                  />
                </FormGroup>
                
                <ConsentSection>
                  <input type="checkbox" id="consent" name="consent" required />
                  <label htmlFor="consent">
                    I consent to Recovery Office contacting me about my case. I understand this is confidential and I'm under no obligation.
                  </label>
                </ConsentSection>
                
                <SubmitButton type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <LoadingSpinner />
                      Submitting...
                    </>
                  ) : (
                    'Get My Free Assessment Now'
                  )}
                </SubmitButton>
                
                {submissionStatus && (
                  <SubmissionMessage className={submissionStatus.type}>
                    {submissionStatus.type === 'success' ? (
                      <div>
                        <div>✅ {submissionStatus.message.split('Reference Number:')[0]}</div>
                        {submissionStatus.message.includes('Reference Number:') && (
                          <ReferenceNumber>
                            {submissionStatus.message.split('Reference Number:')[1].split('We\'ll')[0].trim()}
                          </ReferenceNumber>
                        )}
                        <div>{submissionStatus.message.split('Our FCA-regulated')[1] && 'Our FCA-regulated' + submissionStatus.message.split('Our FCA-regulated')[1]}</div>
                      </div>
                    ) : (
                      <div>❌ {submissionStatus.message}</div>
                    )}
                  </SubmissionMessage>
                )}
                
                <SecurityNote>
                  🔒 Your information is encrypted and completely confidential
                </SecurityNote>
              </ConsultationForm>
            </FormContainer>
          </ConsultationFormSection>



          {/* Why Choose Us Section */}
          <WhyChooseUsSection>
            <SectionHeader>
              <h2>Why Choose Recovery Office?</h2>
              <p>Canada's leading CIRO-regulated financial recovery consultancy</p>
            </SectionHeader>
            
            <BenefitsGrid>
              <BenefitCard>
                <BenefitIcon>🛡️</BenefitIcon>
                <BenefitTitle>CIRO Regulated & Compliant</BenefitTitle>
                <BenefitDescription>
                  Fully authorized by the Canadian Investment Regulatory Organization (Business Number: 877332510). 
                  All operations conducted within strict regulatory frameworks.
                </BenefitDescription>
              </BenefitCard>
              
              <BenefitCard>
                <BenefitIcon>💰</BenefitIcon>
                <BenefitTitle>No Recovery, No Fee</BenefitTitle>
                <BenefitDescription>
                  Success-based pricing for qualifying cases. You only pay when we successfully 
                  recover your assets. Free initial assessment with no upfront costs.
                </BenefitDescription>
              </BenefitCard>
              
              <BenefitCard>
                <BenefitIcon>🚨</BenefitIcon>
                <BenefitTitle>24/7 Emergency Response</BenefitTitle>
                <BenefitDescription>
                  Immediate response for urgent cases. Our emergency hotline ensures you get 
                  expert help when time is critical for asset preservation.
                </BenefitDescription>
              </BenefitCard>
              
              <BenefitCard>
                <BenefitIcon>🔒</BenefitIcon>
                <BenefitTitle>Absolute Confidentiality</BenefitTitle>
                <BenefitDescription>
                  Bank-level security and discretion. All cases handled with complete 
                  confidentiality and protected by $15M CAD professional indemnity insurance.
                </BenefitDescription>
              </BenefitCard>
              
              <BenefitCard>
                <BenefitIcon>🎯</BenefitIcon>
                <BenefitTitle>Proven Track Record</BenefitTitle>
                <BenefitDescription>
                  $750M+ CAD successfully recovered since 2019. 98% client satisfaction rate 
                  with documented case studies and verified results.
                </BenefitDescription>
              </BenefitCard>
              
              <BenefitCard>
                <BenefitIcon>🌍</BenefitIcon>
                <BenefitTitle>International Expertise</BenefitTitle>
                <BenefitDescription>
                  Cross-border recovery capabilities. Established networks with international 
                  law enforcement, regulators, and legal professionals.
                </BenefitDescription>
              </BenefitCard>
            </BenefitsGrid>
          </WhyChooseUsSection>



          {/* Urgency & Scarcity Section */}
          <UrgencySection>
            <UrgencyContainer>
              <UrgencyIcon>⚠️</UrgencyIcon>
              <UrgencyContent>
                <UrgencyTitle>Time is Critical for Asset Recovery</UrgencyTitle>
                <UrgencyText>
                  The longer you wait, the harder it becomes to recover your assets. 
                  Early intervention significantly increases recovery success rates.
                </UrgencyText>
                <UrgencyStats>
                  <UrgencyStat>
                    <StatPercentage>87%</StatPercentage>
                    <StatLabelUrgency>Success rate within 30 days</StatLabelUrgency>
                  </UrgencyStat>
                  <UrgencyStat>
                    <StatPercentage>62%</StatPercentage>
                    <StatLabelUrgency>Success rate after 90 days</StatLabelUrgency>
                  </UrgencyStat>
                </UrgencyStats>
              </UrgencyContent>
              <UrgencyAction>
                <EmergencyButton href="/booking">
                  🚨 Book Emergency Consultation
                </EmergencyButton>
                <span>Available 24/7 for urgent cases</span>
              </UrgencyAction>
            </UrgencyContainer>
          </UrgencySection>

          {/* Final CTA Section */}
          <FinalCTASection>
            <CTAContainer>
              <CTAContent>
                <CTATitle>Ready to Start Your Recovery?</CTATitle>
                <CTASubtitle>
                  Join thousands of clients who have successfully recovered their assets with Recovery Office
                </CTASubtitle>
                <CTAFeatures>
                  <CTAFeature>✓ Free confidential consultation</CTAFeature>
                  <CTAFeature>✓ No upfront fees</CTAFeature>
                  <CTAFeature>✓ CIRO regulated specialists</CTAFeature>
                  <CTAFeature>✓ 24-hour response guarantee</CTAFeature>
                </CTAFeatures>
              </CTAContent>
              
              <CTAActions>
                <PrimaryButton onClick={scrollToForm}>
                  Get Free Assessment Now
                </PrimaryButton>
                <SecondaryButton href="mailto:contact@recovery-office.ca">
                  📧 Email: contact@recovery-office.ca
                </SecondaryButton>
              </CTAActions>
              
              <CTADisclaimer>
                <FCADisclaimer>
                  Recovery Office Canada is authorized and regulated by the Canadian Investment Regulatory Organization. 
                  Business Number: 877332510. Professional indemnity insurance: $15M CAD coverage.
                </FCADisclaimer>
              </CTADisclaimer>
            </CTAContainer>
          </FinalCTASection>
        </LandingContainer>
      </ServiceTracker>
    </>
  );
};



export default GoogleAdsLanding; 