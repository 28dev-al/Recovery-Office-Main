/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Google Analytics 4 & GTM Integration for Financial Services
 * 
 * Comprehensive tracking setup for Recovery Office including:
 * - GA4 enhanced ecommerce for consultation bookings
 * - Custom events for form submissions
 * - Call tracking integration
 * - Google Ads conversion tracking
 * - FCA compliance event tracking
 * 
 * Note: Uses 'any' types for Google Analytics API integration
 */

import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

// Configuration for different environments
const GA4_MEASUREMENT_ID = process.env.REACT_APP_GA4_MEASUREMENT_ID || 'G-XXXXXXXXXX';
const GTM_CONTAINER_ID = process.env.REACT_APP_GTM_CONTAINER_ID || 'GTM-XXXXXXX';
const GOOGLE_ADS_CONVERSION_ID = process.env.REACT_APP_GOOGLE_ADS_CONVERSION_ID || 'AW-XXXXXXXXX';

interface GoogleAnalyticsProps {
  /** Page title for tracking */
  pageTitle?: string;
  /** Page path for tracking */
  pagePath?: string;
  /** Whether this is a transactional page */
  isTransactional?: boolean;
  /** Service type for enhanced tracking */
  serviceType?: string;
}

/**
 * Google Analytics 4 Component with Enhanced Ecommerce
 */
export const GoogleAnalytics: React.FC<GoogleAnalyticsProps> = ({
  pageTitle,
  pagePath,
  isTransactional = false,
  serviceType
}) => {
  useEffect(() => {
    // Initialize GA4 dataLayer
    (window as any).dataLayer = (window as any).dataLayer || [];
    function gtag(...args: unknown[]) {
      (window as any).dataLayer.push(args);
    }

    // GA4 Configuration
    gtag('js', new Date());
    gtag('config', GA4_MEASUREMENT_ID, {
      page_title: pageTitle,
      page_location: window.location.href,
      page_path: pagePath || window.location.pathname,
      custom_map: {
        'custom_parameter_1': 'service_type',
        'custom_parameter_2': 'client_type',
        'custom_parameter_3': 'loss_amount_range'
      },
      enhanced_ecommerce: true,
      // Financial services specific settings
      anonymize_ip: true,
      allow_google_signals: false, // For financial services compliance
      allow_ad_personalization_signals: false
    });

    // Google Ads Conversion Tracking Configuration
    gtag('config', GOOGLE_ADS_CONVERSION_ID);

    // Track page view with service context
    gtag('event', 'page_view', {
      event_category: 'engagement',
      event_label: pageTitle,
      service_type: serviceType,
      is_transactional: isTransactional,
      page_title: pageTitle,
      page_location: window.location.href
    });

    // Store gtag function globally for other components
    (window as any).gtag = gtag;

  }, [pageTitle, pagePath, isTransactional, serviceType]);

  return (
    <Helmet>
      {/* Google Tag Manager */}
      <script>{`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${GTM_CONTAINER_ID}');
      `}</script>

      {/* Google Analytics 4 */}
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`}></script>
      
      {/* Google Ads Conversion Tracking */}
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_CONVERSION_ID}`}></script>

      {/* Enhanced Ecommerce Setup */}
      <script>{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        
        // Enhanced Ecommerce for Financial Services
        gtag('config', '${GA4_MEASUREMENT_ID}', {
          enhanced_ecommerce: true,
          custom_map: {
            'custom_parameter_1': 'service_type',
            'custom_parameter_2': 'consultation_type',
            'custom_parameter_3': 'loss_amount_category'
          }
        });

        // Financial Services Custom Events Setup
        window.trackConsultationBooking = function(serviceType, consultationFee, lossAmount) {
          gtag('event', 'begin_checkout', {
            event_category: 'financial_services',
            event_label: 'consultation_booking_started',
            currency: 'GBP',
            value: consultationFee,
            items: [{
              item_id: 'consultation_' + serviceType.toLowerCase().replace(/\\s+/g, '_'),
              item_name: serviceType + ' Consultation',
              item_category: 'Financial Recovery Services',
              item_variant: lossAmount,
              quantity: 1,
              price: consultationFee
            }],
            service_type: serviceType,
            loss_amount_range: lossAmount,
            consultation_fee: consultationFee
          });
        };

        window.trackConsultationCompleted = function(serviceType, consultationFee, bookingReference) {
          gtag('event', 'purchase', {
            event_category: 'financial_services',
            event_label: 'consultation_booking_completed',
            transaction_id: bookingReference,
            currency: 'GBP',
            value: consultationFee,
            items: [{
              item_id: 'consultation_' + serviceType.toLowerCase().replace(/\\s+/g, '_'),
              item_name: serviceType + ' Consultation',
              item_category: 'Financial Recovery Services',
              quantity: 1,
              price: consultationFee
            }],
            service_type: serviceType,
            booking_reference: bookingReference
          });

          // Google Ads Conversion
          gtag('event', 'conversion', {
            'send_to': '${GOOGLE_ADS_CONVERSION_ID}/consultation_booking',
            'value': consultationFee,
            'currency': 'GBP',
            'transaction_id': bookingReference
          });
        };

        window.trackFormSubmission = function(formType, formLocation) {
          gtag('event', 'form_submit', {
            event_category: 'lead_generation',
            event_label: formType,
            form_type: formType,
            form_location: formLocation
          });
        };

        window.trackPhoneCall = function(phoneNumber, callSource) {
          gtag('event', 'phone_call', {
            event_category: 'lead_generation',
            event_label: 'phone_call_initiated',
            phone_number: phoneNumber,
            call_source: callSource
          });

          // Google Ads Call Conversion
          gtag('event', 'conversion', {
            'send_to': '${GOOGLE_ADS_CONVERSION_ID}/phone_call'
          });
        };

        window.trackServiceInterest = function(serviceType, interactionType) {
          gtag('event', 'service_interest', {
            event_category: 'engagement',
            event_label: serviceType,
            service_type: serviceType,
            interaction_type: interactionType
          });
        };

        // FCA Compliance Tracking
        window.trackComplianceView = function(complianceType) {
          gtag('event', 'compliance_view', {
            event_category: 'regulatory_compliance',
            event_label: complianceType,
            compliance_type: complianceType
          });
        };
      `}</script>

      {/* Google Search Console Verification */}
      <meta name="google-site-verification" content="RECOVERY_OFFICE_GSC_VERIFICATION_CODE" />
      
      {/* Bing Webmaster Tools Verification */}
      <meta name="msvalidate.01" content="RECOVERY_OFFICE_BING_VERIFICATION_CODE" />
      
      {/* Google My Business Verification */}
      <meta name="google-business-verification" content="RECOVERY_OFFICE_GMB_VERIFICATION_CODE" />
    </Helmet>
  );
};

// Call Tracking Component
export const CallTrackingNumber: React.FC<{
  defaultNumber: string;
  source: string;
  className?: string;
}> = ({ defaultNumber, source, className }) => {
  const handleCallClick = () => {
    if ((window as any).trackPhoneCall) {
      (window as any).trackPhoneCall(defaultNumber, source);
    }
  };

  return (
    <a 
      href={`tel:${defaultNumber}`}
      className={className}
      onClick={handleCallClick}
    >
      {defaultNumber}
    </a>
  );
};

// Enhanced Form Tracking Hook
export const useFormTracking = () => {
  const trackFormStart = (formType: string, formLocation: string) => {
    if ((window as any).gtag) {
      (window as any).gtag('event', 'form_start', {
        event_category: 'lead_generation',
        event_label: formType,
        form_type: formType,
        form_location: formLocation
      });
    }
  };

  const trackFormSubmission = (formType: string, formLocation: string, formData?: {
    serviceType: string;
    consultationFee: number;
    estimatedLoss: string;
  }) => {
    if ((window as any).trackFormSubmission) {
      (window as any).trackFormSubmission(formType, formLocation);
      
      // Enhanced tracking for booking forms
      if (formType === 'consultation_booking' && formData) {
        if ((window as any).trackConsultationBooking) {
          (window as any).trackConsultationBooking(
            formData.serviceType,
            formData.consultationFee,
            formData.estimatedLoss
          );
        }
      }
    }
  };

  const trackFormError = (formType: string, errorType: string) => {
    if ((window as any).gtag) {
      (window as any).gtag('event', 'form_error', {
        event_category: 'form_interaction',
        event_label: formType,
        error_type: errorType
      });
    }
  };

  return {
    trackFormStart,
    trackFormSubmission,
    trackFormError
  };
};

// Service Interest Tracking Component
export const ServiceTracker: React.FC<{
  serviceType: string;
  children: React.ReactNode;
  interactionType?: string;
}> = ({ serviceType, children, interactionType = 'view' }) => {
  useEffect(() => {
    if ((window as any).trackServiceInterest) {
      (window as any).trackServiceInterest(serviceType, interactionType);
    }
  }, [serviceType, interactionType]);

  return <>{children}</>;
};

export default GoogleAnalytics; 