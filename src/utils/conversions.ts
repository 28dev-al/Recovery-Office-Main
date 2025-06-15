/**
 * Google Ads Conversion Tracking Utility
 * Recovery Office - Financial Services Conversion Events
 */

type WindowWithGtag = Window & {
  gtag: (...args: any[]) => void;
};

declare const window: WindowWithGtag;

/**
 * Track lead form submission conversion
 * Used for general contact forms and lead generation
 */
export const trackLeadFormSubmission = (): void => {
  try {
    if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-17199312546/vTApCPmL_tkaEKLdoolA',
        'event_category': 'form_submission',
        'event_label': 'lead_form'
      });
    } else {
      console.warn('Google Ads gtag is not defined - lead conversion not tracked');
    }
  } catch (error) {
    console.error('Error tracking lead form conversion:', error);
  }
};

/**
 * Track appointment booking conversion
 * Used for consultation bookings and high-value appointments
 */
export const trackAppointmentBooking = (): void => {
  try {
    if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-17199312546/ZWdUCKiO_tkaEKLdoolA',
        'event_category': 'appointment',
        'event_label': 'consultation_booking'
      });
    } else {
      console.warn('Google Ads gtag is not defined - appointment conversion not tracked');
    }
  } catch (error) {
    console.error('Error tracking appointment booking conversion:', error);
  }
};

/**
 * Track enhanced conversion with value for premium consultations
 * @param value - The estimated value of the consultation/recovery
 * @param currency - Currency code (default: GBP)
 */
export const trackPremiumConsultationBooking = (
  value?: number, 
  currency: string = 'GBP'
): void => {
  try {
    if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
      const conversionData: any = {
        'send_to': 'AW-17199312546/ZWdUCKiO_tkaEKLdoolA',
        'event_category': 'premium_appointment',
        'event_label': 'high_value_consultation'
      };

      // Add value if provided
      if (value && value > 0) {
        conversionData.value = value;
        conversionData.currency = currency;
      }

      window.gtag('event', 'conversion', conversionData);
    } else {
      console.warn('Google Ads gtag is not defined - premium consultation conversion not tracked');
    }
  } catch (error) {
    console.error('Error tracking premium consultation booking conversion:', error);
  }
};

/**
 * Track Google Ads phone call conversion
 * Used when users initiate phone calls from Google Ads
 */
export const trackPhoneCallConversion = (): void => {
  try {
    if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-17199312546/vTApCPmL_tkaEKLdoolA',
        'event_category': 'phone_call',
        'event_label': 'emergency_contact'
      });
    } else {
      console.warn('Google Ads gtag is not defined - phone call conversion not tracked');
    }
  } catch (error) {
    console.error('Error tracking phone call conversion:', error);
  }
};

/**
 * Check if Google Ads tracking is available
 * @returns boolean indicating if gtag is loaded
 */
export const isGoogleAdsTrackingAvailable = (): boolean => {
  return typeof window !== 'undefined' && typeof window.gtag !== 'undefined';
}; 