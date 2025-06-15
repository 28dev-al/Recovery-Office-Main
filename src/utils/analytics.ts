/**
 * Google Analytics Tracking Utility for Recovery Office
 * 
 * Comprehensive analytics tracking for financial services compliance
 * using Google Analytics 4 with gtag.js (ID: G-ZDYZSX1PBX)
 * 
 * Features:
 * - Page view tracking for React SPA
 * - Form submission and conversion tracking
 * - Phone call tracking
 * - Service interaction tracking
 * - FCA compliance event tracking
 */

// Google Analytics Configuration
const GA_TRACKING_ID = 'G-ZDYZSX1PBX';

// Type definitions for event tracking
interface PageViewProps {
  page_title: string;
  page_location: string;
  page_path: string;
}

interface EventProps {
  eventName: string;
  eventCategory?: string;
  eventLabel?: string;
  value?: number;
  params?: Record<string, unknown>;
}

interface ConversionProps {
  eventName: string;
  value?: number;
  currency?: string;
  transaction_id?: string;
  params?: Record<string, unknown>;
}

interface FormSubmissionProps {
  form_type: string;
  form_location: string;
  service_type?: string;
  estimated_loss?: string;
  urgency_level?: string;
  reference_number?: string;
}

/**
 * Track page views for single-page application routing
 */
export const trackPageView = ({ page_title, page_location, page_path }: PageViewProps): void => {
  if (typeof window === 'undefined' || typeof (window as any).gtag === 'undefined') {
    console.warn('Google Analytics gtag is not available');
    return;
  }

  try {
    (window as any).gtag('config', GA_TRACKING_ID, {
      page_title,
      page_location,
      page_path,
      anonymize_ip: true,
      allow_ad_personalization_signals: false
    });

    // Also send as a page_view event for better tracking
    (window as any).gtag('event', 'page_view', {
      page_title,
      page_location,
      page_path,
      event_category: 'engagement'
    });
  } catch (error) {
    console.error('Error tracking page view:', error);
  }
};

/**
 * Track custom events with enhanced parameters
 */
export const trackEvent = ({ eventName, eventCategory = 'engagement', eventLabel, value, params = {} }: EventProps): void => {
  if (typeof window === 'undefined' || typeof window.gtag === 'undefined') {
    console.warn('Google Analytics gtag is not available');
    return;
  }

  try {
    window.gtag('event', eventName, {
      event_category: eventCategory,
      event_label: eventLabel,
      value,
      ...params
    });
  } catch (error) {
    console.error('Error tracking event:', error);
  }
};

/**
 * Track conversion events for Google Ads
 */
export const trackConversion = ({ eventName, value, currency = 'GBP', transaction_id, params = {} }: ConversionProps): void => {
  if (typeof window === 'undefined' || typeof window.gtag === 'undefined') {
    console.warn('Google Analytics gtag is not available');
    return;
  }

  try {
    window.gtag('event', eventName, {
      currency,
      value,
      transaction_id,
      event_category: 'conversion',
      ...params
    });

    // Also track as a conversion for Google Ads if it's a lead or purchase
    if (eventName === 'lead_submission' || eventName === 'consultation_booking') {
      window.gtag('event', 'conversion', {
        send_to: `${GA_TRACKING_ID}/conversion`,
        value,
        currency,
        transaction_id
      });
    }
  } catch (error) {
    console.error('Error tracking conversion:', error);
  }
};

/**
 * Track form submissions with detailed context
 */
export const trackFormSubmission = ({
  form_type,
  form_location,
  service_type,
  estimated_loss,
  urgency_level,
  reference_number
}: FormSubmissionProps): void => {
  if (typeof window === 'undefined' || typeof window.gtag === 'undefined') {
    console.warn('Google Analytics gtag is not available');
    return;
  }

  try {
    // Track the form submission event
    window.gtag('event', 'form_submit', {
      event_category: 'lead_generation',
      event_label: form_type,
      form_type,
      form_location,
      service_type,
      estimated_loss,
      urgency_level
    });

    // Track as a lead conversion
    window.gtag('event', 'lead_submission', {
      event_category: 'conversion',
      event_label: form_type,
      value: 1,
      currency: 'GBP',
      transaction_id: reference_number,
      form_type,
      service_type,
      estimated_loss,
      urgency_level
    });

    // Track service interest
    if (service_type) {
      trackEvent({
        eventName: 'service_interest',
        eventCategory: 'engagement',
        eventLabel: service_type,
        params: {
          service_type,
          interaction_type: 'form_submission',
          estimated_loss,
          urgency_level
        }
      });
    }
  } catch (error) {
    console.error('Error tracking form submission:', error);
  }
};

/**
 * Track phone call clicks for call tracking
 */
export const trackPhoneCall = (phoneNumber: string, callSource: string): void => {
  if (typeof window === 'undefined' || typeof window.gtag === 'undefined') {
    console.warn('Google Analytics gtag is not available');
    return;
  }

  try {
    window.gtag('event', 'phone_call', {
      event_category: 'lead_generation',
      event_label: 'phone_call_initiated',
      phone_number: phoneNumber,
      call_source: callSource
    });

    // Track as conversion
    trackConversion({
      eventName: 'phone_call',
      value: 1,
      params: {
        phone_number: phoneNumber,
        call_source: callSource
      }
    });
  } catch (error) {
    console.error('Error tracking phone call:', error);
  }
};

/**
 * Track button clicks and CTA interactions
 */
export const trackButtonClick = (buttonText: string, buttonLocation: string, targetUrl?: string): void => {
  trackEvent({
    eventName: 'click',
    eventCategory: 'engagement',
    eventLabel: buttonText,
    params: {
      button_text: buttonText,
      button_location: buttonLocation,
      target_url: targetUrl
    }
  });
};

/**
 * Track scroll depth for engagement measurement
 */
export const trackScrollDepth = (scrollPercentage: number, pageTitle: string): void => {
  // Only track at 25%, 50%, 75%, and 90% scroll depths
  const milestones = [25, 50, 75, 90];
  if (milestones.includes(scrollPercentage)) {
    trackEvent({
      eventName: 'scroll',
      eventCategory: 'engagement',
      eventLabel: `${scrollPercentage}%`,
      params: {
        scroll_depth: scrollPercentage,
        page_title: pageTitle
      }
    });
  }
};

/**
 * Track file downloads (PDFs, documents)
 */
export const trackFileDownload = (fileName: string, fileType: string): void => {
  trackEvent({
    eventName: 'file_download',
    eventCategory: 'engagement',
    eventLabel: fileName,
    params: {
      file_name: fileName,
      file_type: fileType
    }
  });
};

/**
 * Track video interactions
 */
export const trackVideoInteraction = (videoTitle: string, action: 'play' | 'pause' | 'complete', currentTime?: number): void => {
  trackEvent({
    eventName: 'video_' + action,
    eventCategory: 'engagement',
    eventLabel: videoTitle,
    params: {
      video_title: videoTitle,
      video_current_time: currentTime
    }
  });
};

/**
 * Track search queries on the website
 */
export const trackSearch = (searchTerm: string, searchLocation: string): void => {
  trackEvent({
    eventName: 'search',
    eventCategory: 'engagement',
    eventLabel: searchTerm,
    params: {
      search_term: searchTerm,
      search_location: searchLocation
    }
  });
};

/**
 * Track consultation booking steps for funnel analysis
 */
export const trackBookingStep = (step: string, stepNumber: number, serviceType?: string): void => {
  trackEvent({
    eventName: 'booking_step',
    eventCategory: 'conversion_funnel',
    eventLabel: step,
    params: {
      step_name: step,
      step_number: stepNumber,
      service_type: serviceType
    }
  });
};

/**
 * Track regulatory compliance interactions (FCA badge clicks, etc.)
 */
export const trackComplianceInteraction = (complianceType: string, action: string): void => {
  trackEvent({
    eventName: 'compliance_interaction',
    eventCategory: 'regulatory_compliance',
    eventLabel: complianceType,
    params: {
      compliance_type: complianceType,
      compliance_action: action
    }
  });
};

/**
 * Enhanced error tracking for debugging
 */
export const trackError = (errorType: string, errorMessage: string, errorLocation: string): void => {
  trackEvent({
    eventName: 'exception',
    eventCategory: 'error',
    eventLabel: errorType,
    params: {
      error_type: errorType,
      error_message: errorMessage,
      error_location: errorLocation,
      fatal: false
    }
  });
};

// Analytics utility is ready for use
export default {
  trackPageView,
  trackEvent,
  trackFormSubmission,
  trackPhoneCall,
  trackButtonClick
}; 