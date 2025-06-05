/**
 * German SEO Component
 * Professional SEO optimization for the DACH market
 */

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

interface GermanSEOProps {
  page: string;
  customTitle?: string;
  customDescription?: string;
  customKeywords?: string[];
  image?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
  structuredData?: Record<string, unknown>;
}

export const GermanSEO: React.FC<GermanSEOProps> = ({
  page,
  customTitle,
  customDescription,
  customKeywords = [],
  image = '/assets/images/recovery-office-og-image.jpg',
  canonicalUrl,
  noIndex = false,
  structuredData
}) => {
  const { t, i18n } = useTranslation();
  
  // Get base URL for canonical and alternate URLs
  const baseUrl = 'https://recovery-office-online.netlify.app';
  const currentPath = window.location.pathname;
  
  // Build SEO data
  const title = customTitle || t(`meta.${page}.title`) || t('meta.title');
  const description = customDescription || t(`meta.${page}.description`) || t('meta.description');
  
  // German-specific keywords for financial recovery
  const germanKeywords = [
    'Finanzielle Vermögensrückgewinnung',
    'Kryptowährungs Rückgewinnung',
    'Anlagebetrug Beratung',
    'Recovery Office Deutschland',
    'Betrugsfall Experten',
    'Finanzielle Verluste zurückholen',
    'BaFin konforme Beratung',
    'DSGVO konforme Rückgewinnung',
    'Professionelle Vermögensrückgewinnung',
    'Deutsche Finanzberatung'
  ];
  
  const allKeywords = [...germanKeywords, ...customKeywords];
  
  // Build canonical URL
  const canonical = canonicalUrl || `${baseUrl}${currentPath}`;
  
  // Build alternate URLs for language versions
  const alternateUrls = {
    en: `${baseUrl}${currentPath.replace('/de', '')}`,
    de: `${baseUrl}/de${currentPath}`
  };
  
  // Default structured data for organization
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "name": "Recovery Office",
    "description": i18n.language === 'de' 
      ? "Professionelle Finanzielle Vermögensrückgewinnung in Deutschland"
      : "Professional Financial Asset Recovery Services",
    "url": baseUrl,
    "logo": `${baseUrl}/assets/images/recovery-office-logo.png`,
    "image": `${baseUrl}${image}`,
    "telephone": "+44 7451 263472",
    "email": "info@recovery-office.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2nd Floor, 3 Piccadilly Place, London Road",
      "addressLocality": "Manchester",
      "postalCode": "M1 3BN",
      "addressCountry": "GB"
    },
    "sameAs": [
      "https://linkedin.com/company/recovery-office",
      "https://twitter.com/recoveryoffice"
    ],
    "serviceType": [
      i18n.language === 'de' ? "Kryptowährungs-Rückgewinnung" : "Cryptocurrency Recovery",
      i18n.language === 'de' ? "Anlagebetrug-Rückgewinnung" : "Investment Fraud Recovery",
      i18n.language === 'de' ? "Finanzielle Vermögensrückgewinnung" : "Financial Asset Recovery"
    ],
    "areaServed": [
      {
        "@type": "Country",
        "name": "United Kingdom"
      },
      {
        "@type": "Country", 
        "name": "Germany"
      },
      {
        "@type": "Country",
        "name": "Austria"
      },
      {
        "@type": "Country",
        "name": "Switzerland"
      }
    ],
    "hasCredential": [
      {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "Professional License",
        "recognizedBy": {
          "@type": "Organization",
          "name": "Financial Conduct Authority (FCA)"
        }
      }
    ]
  };
  
  // Merge custom structured data
  const finalStructuredData = structuredData 
    ? { ...defaultStructuredData, ...structuredData }
    : defaultStructuredData;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <html lang={i18n.language} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={allKeywords.join(', ')} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonical} />
      
      {/* Language Alternates */}
      <link rel="alternate" hrefLang="en" href={alternateUrls.en} />
      <link rel="alternate" hrefLang="de" href={alternateUrls.de} />
      <link rel="alternate" hrefLang="x-default" href={alternateUrls.en} />
      
      {/* Robots */}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Open Graph Meta Tags */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${baseUrl}${image}`} />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content="Recovery Office" />
      <meta property="og:locale" content={i18n.language === 'de' ? 'de_DE' : 'en_GB'} />
      {i18n.language === 'de' && <meta property="og:locale:alternate" content="en_GB" />}
      {i18n.language === 'en' && <meta property="og:locale:alternate" content="de_DE" />}
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${baseUrl}${image}`} />
      <meta name="twitter:site" content="@recoveryoffice" />
      
      {/* German-specific Meta Tags */}
      {i18n.language === 'de' && (
        <>
          <meta name="DC.language" content="de" />
          <meta name="geo.region" content="DE" />
          <meta name="geo.placename" content="Deutschland" />
          <meta name="ICBM" content="51.1657, 10.4515" />
          <meta name="author" content="Recovery Office Deutschland" />
          <meta name="publisher" content="Recovery Office Limited" />
          <meta name="copyright" content="© 2025 Recovery Office Limited" />
        </>
      )}
      
      {/* Business/Contact Information */}
      <meta name="contact" content="info@recovery-office.com" />
      <meta name="reply-to" content="info@recovery-office.com" />
      <meta name="owner" content="Recovery Office Limited" />
      <meta name="url" content={baseUrl} />
      <meta name="identifier-URL" content={baseUrl} />
      <meta name="directory" content="submission" />
      <meta name="category" content="Financial Services" />
      <meta name="coverage" content="Worldwide" />
      <meta name="distribution" content="Global" />
      <meta name="rating" content="General" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(finalStructuredData)}
      </script>
      
      {/* Additional German Market Meta Tags */}
      {i18n.language === 'de' && (
        <>
          <meta name="expires" content="never" />
          <meta name="revisit-after" content="1 day" />
          <meta name="audience" content="All" />
          <meta name="page-topic" content="Finanzielle Vermögensrückgewinnung" />
          <meta name="page-type" content="Beratungsdienstleistung" />
          <meta name="subject" content="Professionelle Finanzielle Vermögensrückgewinnungsberatung" />
        </>
      )}
    </Helmet>
  );
};

/**
 * Specialized SEO components for different page types
 */

export const HomePageSEO: React.FC = () => {
  const { i18n } = useTranslation();
  
  const structuredData = {
    "@type": "WebSite",
    "potentialAction": {
      "@type": "SearchAction",
      "target": `https://recovery-office-online.netlify.app/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };
  
  return (
    <GermanSEO 
      page="home"
      structuredData={structuredData}
      customKeywords={i18n.language === 'de' ? [
        'Finanzielle Vermögensrückgewinnung Deutschland',
        'Kryptowährungs Verlust Hilfe',
        'Anlagebetrug Experten Deutschland',
        'Recovery Office Manchester',
        'Betrug Opfer Hilfe'
      ] : []}
    />
  );
};

export const ServicesPageSEO: React.FC = () => {
  const { i18n } = useTranslation();
  
  const structuredData = {
    "@type": "Service",
    "serviceType": i18n.language === 'de' 
      ? "Finanzielle Vermögensrückgewinnungsdienste"
      : "Financial Asset Recovery Services",
    "provider": {
      "@type": "Organization",
      "name": "Recovery Office"
    }
  };
  
  return (
    <GermanSEO 
      page="services"
      structuredData={structuredData}
      customKeywords={i18n.language === 'de' ? [
        'Rückgewinnungsdienste Deutschland',
        'Professionelle Finanzberatung',
        'Vermögensverlust Hilfe',
        'Betrugsfall Beratung'
      ] : []}
    />
  );
};

export const BookingPageSEO: React.FC = () => {
  const { i18n } = useTranslation();
  
  return (
    <GermanSEO 
      page="booking"
      customKeywords={i18n.language === 'de' ? [
        'Beratung buchen Deutschland',
        'Finanzielle Rückgewinnung Termin',
        '£2500 Beratung buchen',
        'Recovery Office Buchung'
      ] : []}
    />
  );
};

export const ContactPageSEO: React.FC = () => {
  const { i18n } = useTranslation();
  
  const structuredData = {
    "@type": "ContactPage",
    "mainEntity": {
      "@type": "Organization",
      "name": "Recovery Office",
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+44 7451 263472",
          "contactType": "customer service",
          "availableLanguage": ["English", "German"],
          "areaServed": ["GB", "DE", "AT", "CH"]
        }
      ]
    }
  };
  
  return (
    <GermanSEO 
      page="contact"
      structuredData={structuredData}
      customKeywords={i18n.language === 'de' ? [
        'Recovery Office Kontakt',
        'Finanzielle Rückgewinnung Kontakt Deutschland',
        'Beratung anfragen',
        'Experten kontaktieren'
      ] : []}
    />
  );
};

export default GermanSEO; 