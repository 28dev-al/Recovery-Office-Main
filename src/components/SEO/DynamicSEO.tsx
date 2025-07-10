/**
 * Dynamic SEO Component for FCA-Regulated Financial Services
 * 
 * Comprehensive SEO optimization specifically designed for:
 * - Google Ads compliance for UK financial services
 * - FCA regulatory requirements
 * - YMYL (Your Money Your Life) content standards
 * - E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) signals
 * - Geographic targeting for UK market
 * - International SEO with hreflang support
 */

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { COMPANY_PROFILE_CA } from '../../constants/companyProfile.ca';

interface DynamicSEOProps {
  /** Page identifier for translation lookup */
  page: string;
  /** Custom title override */
  customTitle?: string;
  /** Custom description override */
  customDescription?: string;
  /** Custom keywords override */
  customKeywords?: string;
  /** Whether this is a transactional page */
  isTransactional?: boolean;
  /** Service data for enhanced schema */
  serviceData?: {
    name: string;
    price: string;
    duration: string;
    category: string;
  };
  /** Custom structured data */
  structuredData?: Record<string, unknown>;
}

/**
 * Enhanced SEO Component with Google Ads Compliance
 */
const DynamicSEO: React.FC<DynamicSEOProps> = ({
  page,
  customTitle,
  customDescription,
  customKeywords,
  isTransactional = false,
  serviceData,
  structuredData
}) => {
  const { t, i18n } = useTranslation();
  
  // Get optimized title and description from translations or custom overrides
  const title = customTitle || t(`meta.${page}.title`, `Recovery Office | Financial Asset Recovery UK`);
  const description = customDescription || t(`meta.${page}.description`, 'Professional financial recovery specialists. Expert cryptocurrency recovery, investment fraud assistance, and scam resolution. FCA regulated.');
  const keywords = customKeywords || t(`meta.${page}.keywords`, 'financial recovery, asset recovery, cryptocurrency recovery, investment fraud, FCA regulated, UK');
  
  // Build canonical URL based on current language and path
  const baseUrl = 'https://recovery-office-online.netlify.app';
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
  
  // Handle canonical URLs properly for different languages
  let canonicalUrl: string;
  let germanUrl: string;
  
  if (currentPath.startsWith('/de')) {
    // Currently on German page
    const basePath = currentPath.replace(/^\/de/, ''); // Remove /de prefix
    canonicalUrl = `${baseUrl}${basePath}`; // English canonical
    germanUrl = `${baseUrl}/de${basePath}`; // German alternative
  } else {
    // Currently on English page
    canonicalUrl = `${baseUrl}${currentPath}`; // English canonical
    germanUrl = `${baseUrl}/de${currentPath}`; // German alternative
  }
  
  // Optimize meta description length (must be under 160 characters)
  const optimizedDescription = description.length > 159 
    ? description.substring(0, 156) + '...'
    : description;

  // Default structured data for Recovery Office
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "name": "Recovery Office Canada",
    "alternateName": "Recovery Office Canada Inc.",
    "description": "Canada's premier CIRO-regulated financial asset recovery consultancy",
    "url": canonicalUrl,
    "logo": "https://images2.imgbox.com/86/72/GE2VLjan_o.png",
    "image": "https://images2.imgbox.com/86/72/GE2VLjan_o.png",
    "email": COMPANY_PROFILE_CA.email,
    "foundingDate": "2019",
    "slogan": "Excellence in Financial Recovery",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": COMPANY_PROFILE_CA.address.split(',')[0],
      "addressLocality": "Toronto",
      "addressRegion": "Ontario", 
      "postalCode": "M5X 1A4",
      "addressCountry": "CA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 43.6532,
      "longitude": -79.3832
    },
    "hasCredential": {
      "@type": "EducationalOccupationalCredential",
      "name": "CIRO Authorization",
      "credentialCategory": "Financial Services Authorization",
      "recognizedBy": {
        "@type": "Organization",
        "name": "Canadian Investment Regulatory Organization",
        "url": "https://www.ciro.ca/"
      }
    },
    "areaServed": {
      "@type": "Country",
      "name": "Canada"
    },
    "serviceType": [
      "Financial Asset Recovery",
      "Cryptocurrency Recovery", 
      "Investment Fraud Recovery",
      "Financial Scam Recovery",
      "Regulatory Compliance"
    ]
  };

  // Enhanced service-specific structured data
  const serviceStructuredData = serviceData ? {
    ...defaultStructuredData,
    "@type": "Service",
    "name": serviceData.name,
    "category": serviceData.category,
    "offers": {
      "@type": "Offer",
      "price": serviceData.price.replace('£', ''),
      "priceCurrency": "CAD",
      "availability": "InStock",
      "validFrom": new Date().toISOString(),
      "priceValidUntil": new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
      "eligibleRegion": "CA"
    },
    "provider": defaultStructuredData,
    "additionalType": "FinancialService"
  } : defaultStructuredData;

  const finalStructuredData = structuredData || serviceStructuredData;

  return (
    <Helmet>
      {/* Primary Meta Tags - Optimized for Google Ads */}
      <title>{title}</title>
      <meta name="description" content={optimizedDescription} />
      <meta name="keywords" content={keywords} />
      
      {/* Canonical URLs - Critical for SEO */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Hreflang for International SEO */}
      <link rel="alternate" hrefLang="en" href={canonicalUrl} />
      <link rel="alternate" hrefLang="de" href={germanUrl} />
      <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />
      
      {/* Language Meta Tag */}
      <html lang={i18n.language} />
      
      {/* FCA Compliance & Regulatory Meta Tags */}
      <meta name="ciro-regulated" content="true" />
      <meta name="business-number" content={COMPANY_PROFILE_CA.businessNumber} />
      <meta name="regulatory-body" content="Canadian Investment Regulatory Organization" />
      <meta name="business-type" content="Financial Services" />
      <meta name="service-category" content="Asset Recovery" />
      
      {/* Geographic Targeting - Toronto/Canada Focus */}
      <meta name="geo.region" content="CA-ON" />
      <meta name="geo.placename" content="Toronto, Ontario, Canada" />
      <meta name="ICBM" content="43.6532, -79.3832" />
      <meta name="geo.position" content="43.6532;-79.3832" />
      
      {/* YMYL Content Signals */}
      <meta name="content-category" content="YMYL" />
      <meta name="expertise-level" content="Expert" />
      <meta name="authoritativeness" content="CIRO-Regulated" />
      <meta name="trustworthiness" content="Professional" />
      
      {/* Enhanced Open Graph - Optimized for Social Sharing */}
      <meta property="og:type" content={isTransactional ? "website" : "article"} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={optimizedDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content="Recovery Office" />
      <meta property="og:image" content="https://images2.imgbox.com/86/72/GE2VLjan_o.png" />
      <meta property="og:image:alt" content="Recovery Office - Canadian Financial Asset Recovery Specialists" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content={i18n.language === 'de' ? 'de_CA' : 'en_CA'} />
      <meta property="og:locale:alternate" content={i18n.language === 'de' ? 'en_CA' : 'fr_CA'} />
      
      {/* Twitter Cards - Required for Social Media */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@recoveryoffice" />
      <meta name="twitter:creator" content="@recoveryoffice" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={optimizedDescription} />
      <meta name="twitter:image" content="https://images2.imgbox.com/86/72/GE2VLjan_o.png" />
      <meta name="twitter:image:alt" content="Recovery Office - Canadian Financial Asset Recovery Specialists" />
      <meta name="twitter:url" content={canonicalUrl} />
      
      {/* Business & Contact Information */}
      <meta name="business-name" content="Recovery Office Canada Inc." />
      <meta name="contact-email" content={COMPANY_PROFILE_CA.email} />
      <meta name="business-hours" content="24/7" />
      <meta name="emergency-contact" content="true" />
      
      {/* Mobile & Accessibility - REMOVED DUPLICATE VIEWPORT TAG */}
      {/* Viewport is already defined in index.html */}
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      
      {/* Security Headers - X-Frame-Options moved to _headers file */}
      <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
      
      {/* Google Search Console Verification */}
      <meta name="google-site-verification" content="RECOVERY_OFFICE_GSC_VERIFICATION_CODE" />
      
      {/* Bing Webmaster Tools Verification */}
      <meta name="msvalidate.01" content="RECOVERY_OFFICE_BING_VERIFICATION_CODE" />
      
      {/* Google My Business Verification */}
      <meta name="google-business-verification" content="RECOVERY_OFFICE_GMB_VERIFICATION_CODE" />
      
      {/* Structured Data - Enhanced for Financial Services */}
      <script type="application/ld+json">
        {JSON.stringify(finalStructuredData)}
      </script>
      
      {/* Preconnect to External Domains for Performance */}
      <link rel="preconnect" href="https://www.googletagmanager.com" />
      <link rel="preconnect" href="https://www.google-analytics.com" />
      <link rel="preconnect" href="https://images2.imgbox.com" />
      
      {/* DNS Prefetch for Performance */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      
      {/* Robots Meta - Allow indexing for SEO */}
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      
      {/* Additional SEO Meta Tags */}
      <meta name="author" content="Recovery Office Canada Inc." />
      <meta name="publisher" content="Recovery Office Canada Inc." />
      <meta name="copyright" content="© 2024 Recovery Office Canada Inc. All rights reserved." />
      <meta name="application-name" content="Recovery Office" />
      <meta name="msapplication-TileColor" content="#1a365d" />
      <meta name="theme-color" content="#1a365d" />
    </Helmet>
  );
};

export default DynamicSEO; 