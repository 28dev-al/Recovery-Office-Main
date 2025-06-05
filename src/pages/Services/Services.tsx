import * as React from 'react';
import { useTranslation } from 'react-i18next';
import styled, { createGlobalStyle } from 'styled-components';
import { Box, Container } from '../../design-system/components/layout';
import { Section } from '../../design-system/components/layout/Section';
import { Text, Heading } from '../../design-system/components/typography';
import { Button } from '../../design-system/components/button';
import DynamicSEO from '../../components/SEO/DynamicSEO';
import GoogleAnalytics from '../../components/tracking/GoogleAnalytics';
import ConsultationPricingTable from '../../components/sections/ConsultationPricingTable';

import { ServicesHero } from './sections/ServicesHero';
import ServicesOverview, { Service } from './sections/ServicesOverview';
import ServicesProcess from './sections/ServicesProcess';
import ServicesDetails from './sections/ServicesDetails';
import ServicesRegulatorySection from './sections/RegulatorySection';

import { PHI } from '../../constants/sacred-geometry';

// Global styles to prevent background flashing and ensure stability
const ServicesGlobalStyles = createGlobalStyle`
  /* Prevent background flashing on page transitions */
  * {
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }
  
  /* Fix background painting issues */
  body {
    background: #f8fafc;
    background-attachment: scroll;
    -webkit-background-clip: border-box;
    background-clip: border-box;
  }
  
  /* Prevent layout shifts affecting backgrounds */
  img {
    max-width: 100%;
    height: auto;
    vertical-align: middle;
  }
  
  /* Fix iOS viewport issues */
  @supports (-webkit-touch-callout: none) {
    body {
      background-attachment: scroll !important;
    }
  }
  
  /* Chrome/Safari background fix */
  @supports (-webkit-appearance: none) {
    .services-page,
    .consultation-table,
    .credentials-section {
      -webkit-transform: translateZ(0);
      transform: translateZ(0);
      background-attachment: scroll !important;
    }
  }
  
  /* Firefox background fix */
  @supports (-moz-appearance: none) {
    .services-page {
      background-attachment: scroll;
    }
  }
  
  /* Edge/IE background fix */
  @supports (-ms-ime-align: auto) {
    .services-page {
      background-attachment: scroll;
      background-size: cover;
    }
  }
  
  /* iOS Safari specific fixes */
  @supports (-webkit-touch-callout: none) {
    .services-page,
    .consultation-table {
      background-attachment: scroll !important;
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }
  }
`;

// Professional Services Page Wrapper with stable backgrounds
const ServicesPageWrapper = styled.div`
  /* Ensure proper background attachment */
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  background-attachment: scroll; /* Changed from fixed to scroll */
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 100vh;
  width: 100%;
  position: relative;
  z-index: 1;
  
  /* Prevent background disappearing on scroll */
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
  will-change: transform;
  
  /* Fix mobile background issues */
  @media (max-width: 768px) {
    background-attachment: scroll;
    background-size: cover;
    background-position: center center;
    min-height: -webkit-fill-available;
    min-height: fill-available;
    
    /* Force GPU acceleration for mobile browsers */
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
  
  /* Fix Android Chrome issues */
  @supports (-webkit-appearance: none) {
    background-attachment: scroll;
  }
`;

// Enhanced Section wrapper for stable backgrounds
const StableSection = styled.div`
  position: relative;
  z-index: 2;
  background: transparent;
  width: 100%;
  
  /* Ensure sections don't lose background */
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
`;

// Enhanced Consultation Table wrapper
const ConsultationTableWrapper = styled.div`
  /* Ensure background doesn't disappear */
  background: white;
  background-color: white !important;
  background-attachment: scroll;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  margin: 40px auto;
  max-width: 1200px;
  position: relative;
  z-index: 10;
  
  /* Prevent disappearing on iOS/mobile */
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
  will-change: transform;
  
  /* Force background to stick */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: white;
    z-index: -1;
    border-radius: 16px;
  }
`;

// Debug component to identify background issues (remove after fixes)
const BackgroundDebugger: React.FC = () => {
  React.useEffect(() => {
    console.log('🔍 BACKGROUND DEBUG:');
    console.log('Page scroll position:', window.scrollY);
    console.log('Viewport dimensions:', window.innerWidth, 'x', window.innerHeight);
    console.log('Document height:', document.body.scrollHeight);
    
    // Check for missing background styles
    const elements = document.querySelectorAll('[class*="background"], [style*="background"]');
    elements.forEach(el => {
      const styles = window.getComputedStyle(el);
      console.log('Element background:', styles.background);
      console.log('Background image:', styles.backgroundImage);
      console.log('Background attachment:', styles.backgroundAttachment);
    });
    
    // Monitor scroll events for background issues
    const handleScroll = () => {
      const consultationTable = document.querySelector('.consultation-table');
      const credentialsSection = document.querySelector('.credentials-section');
      
      if (consultationTable) {
        const styles = window.getComputedStyle(consultationTable);
        console.log('Consultation table background on scroll:', styles.backgroundColor);
      }
      
      if (credentialsSection) {
        const styles = window.getComputedStyle(credentialsSection);
        console.log('Credentials section background on scroll:', styles.backgroundColor);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return null;
};

/**
 * Services Page Component
 * 
 * This component represents the services page of the Recovery Office website.
 * It displays the various services offered by Recovery Office, including
 * descriptions, benefits, and pricing information.
 * 
 * SEO Optimized: Single H1 tag, canonical URLs, structured data
 * BACKGROUND FIXED: Comprehensive background stability implementation
 */
const ServicesPage: React.FC = () => {
  const { t } = useTranslation();
  
  // Service data - mapped to be compatible with the Service interface
  const services: Service[] = [
    {
      id: 'recovery-consultation',
      title: t('services.recoveryConsultation.title'),
      description: t('services.recoveryConsultation.description'),
      longDescription: `Our Recovery Consultation service provides a comprehensive assessment of your financial situation and recovery goals. Our experienced consultants use industry best practices to create a strategic approach to your asset recovery journey. During this initial consultation, we will explore your financial history, current challenges, and objectives to develop a personalized recovery plan that aligns with your specific circumstances.`,
      icon: 'chart',
      path: '/services/recovery-consultation',
      benefits: [
        'Comprehensive financial assessment',
        'Personalized recovery plan development',
        'Integration of regulatory compliance principles',
        'Expert guidance from specialized consultants',
        'Strategic approach addressing all recovery options'
      ],
      duration: '60-90 minutes',
      pricing: {
        initial: 150,
        followUp: 90
      },
      accentColor: '#4a6eb3'
    },
    {
      id: 'investment-fraud',
      title: t('services.investmentFraud.title'),
      description: t('services.investmentFraud.description'),
      longDescription: `Our Investment Fraud Recovery service specializes in helping victims of fraudulent investment schemes recover their assets. We work with a network of legal professionals, regulatory bodies, and international agencies to trace funds and pursue recovery through various channels including court actions, regulatory complaints, and negotiated settlements.`,
      icon: 'shield',
      path: '/services/investment-fraud',
      benefits: [
        'Legal action against fraudulent operators',
        'Regulatory complaint filing assistance',
        'Asset tracing and recovery',
        'Evidence gathering and documentation',
        'International recovery coordination'
      ],
      duration: '75-90 minutes',
      pricing: {
        initial: 200,
        followUp: 120
      },
      accentColor: '#d69e2e'
    },
    {
      id: 'crypto-recovery',
      title: t('services.cryptocurrency.title'),
      description: t('services.cryptocurrency.description'),
      longDescription: `Our Cryptocurrency Recovery service provides specialized assistance for individuals who have lost access to digital assets or been victims of cryptocurrency fraud. Our team combines technical blockchain expertise with financial recovery strategies to trace and potentially recover your assets. We work with relevant authorities, exchanges, and forensic analysts to maximize your recovery chances while maintaining strict confidentiality.`,
      icon: 'leaf',
      path: '/services/crypto-recovery',
      benefits: [
        'Blockchain transaction analysis',
        'Cryptocurrency fraud investigation',
        'Exchange and wallet recovery assistance',
        'Strategic recovery planning',
        'Technical and regulatory expertise',
        'Confidential and secure process'
      ],
      duration: '60-75 minutes',
      pricing: {
        initial: 130,
        followUp: 110
      },
      accentColor: '#b47e4a'
    },
    {
      id: 'regulatory-complaint',
      title: t('services.regulatoryComplaint.title'),
      description: t('services.regulatoryComplaint.description'),
      longDescription: `Our Regulatory Complaint Assistance service helps clients navigate complex regulatory processes to file complaints against financial institutions, investment firms, and other regulated entities. We provide expert guidance on complaint preparation, regulatory requirements, and follow-up procedures to maximize your chances of successful resolution.`,
      icon: 'balance',
      path: '/services/regulatory-complaint',
      benefits: [
        'Regulatory compliance expertise',
        'Complaint preparation and filing',
        'Evidence review and organization',
        'Regulatory body liaison',
        'Follow-up and monitoring'
      ],
      duration: '45-60 minutes',
      pricing: {
        initial: 120,
        followUp: 80
      },
      accentColor: '#38a169'
    }
  ];

  return (
    <ServicesPageWrapper className="services-page">
      <ServicesGlobalStyles />
      <BackgroundDebugger />
      
      <Box as={'main'}>
        {/* SEO Optimization - Critical for Google Ads */}
        <DynamicSEO 
          page="services"
          customTitle="Financial Recovery Services | Recovery Office UK"
          customDescription="Professional financial recovery specialists. Expert cryptocurrency recovery, investment fraud assistance, and scam resolution. FCA regulated."
          customKeywords="financial recovery services, cryptocurrency recovery, investment fraud recovery, financial scam recovery, regulatory assistance, FCA regulated, UK"
          isTransactional={false}
          structuredData={{
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Financial Recovery Services",
            "provider": {
              "@type": "FinancialService",
              "name": "Recovery Office",
              "hasCredential": {
                "@type": "EducationalOccupationalCredential",
                "name": "FCA Authorization",
                "credentialCategory": "Financial Services Authorization"
              }
            },
            "serviceType": [
              "Cryptocurrency Recovery",
              "Investment Fraud Recovery", 
              "Financial Scam Recovery",
              "Regulatory Assistance"
            ],
            "areaServed": {
              "@type": "Country",
              "name": "United Kingdom"
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Recovery Services",
              "itemListElement": services.map(service => ({
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": service.title,
                  "description": service.description
                },
                "price": service.pricing.initial,
                "priceCurrency": "GBP"
              }))
            }
          }}
        />
        
        {/* Google Analytics 4 & Conversion Tracking */}
        <GoogleAnalytics 
          pageTitle="Financial Recovery Services Page"
          pagePath="/services"
          isTransactional={false}
          serviceType="Financial Recovery Services"
        />

        {/* Hero Section - Contains the ONLY H1 tag */}
        <StableSection>
          <ServicesHero />
        </StableSection>
        
        {/* Services Overview */}
        <StableSection>
          <ServicesOverview services={services} />
        </StableSection>
        
        {/* Services Process */}
        <StableSection>
          <ServicesProcess />
        </StableSection>
        
        {/* Services Details */}
        <StableSection>
          <ServicesDetails services={services} />
        </StableSection>
        
        {/* Professional Consultation Pricing Table with Enhanced Background */}
        <StableSection>
          <ConsultationTableWrapper className="consultation-table">
            <ConsultationPricingTable />
          </ConsultationTableWrapper>
        </StableSection>
        
        {/* Regulatory Section with Enhanced Background */}
        <StableSection className="credentials-section">
          <ServicesRegulatorySection />
        </StableSection>
        
        {/* CTA Section - Using H2 for proper hierarchy */}
        <StableSection>
          <Section 
            backgroundColor="#4a6eb3"
            style={{
              paddingTop: `${PHI * 48}px`,
              paddingBottom: `${PHI * 48}px`,
              position: 'relative',
              zIndex: 5
            }}
          >
            <Container>
              <Heading as="h2" mb={`${PHI * 16}px`} color="white" textAlign="center">
                {t('services.ctaTitle')}
              </Heading>
              <Text
                size="base"
                maxWidth={`${PHI * 500}px`}
                m="0 auto"
                mb={`${PHI * 32}px`}
                color="white"
                textAlign="center"
              >
                {t('services.ctaSubtitle')}
              </Text>
              <Box display="flex" justifyContent="center">
                <Button 
                  variant="accent" 
                  size="lg"
                  href="/booking"
                >
                  {t('services.bookConsultation')}
                </Button>
              </Box>
            </Container>
          </Section>
        </StableSection>
      </Box>
    </ServicesPageWrapper>
  );
};

export default ServicesPage; 







