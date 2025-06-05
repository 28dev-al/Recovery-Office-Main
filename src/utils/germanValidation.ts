/**
 * German Form Validation Utilities
 * Professional validation for DACH market forms
 */

import { validateGermanPhone } from './germanFormatting';

export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

export interface FormValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

/**
 * German email validation with common German providers
 */
export const validateGermanEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!emailRegex.test(email)) {
    return false;
  }
  
  const domain = email.split('@')[1]?.toLowerCase();
  
  // Additional validation for suspicious domains
  if (domain && domain.includes('temp') || domain.includes('disposable')) {
    return false;
  }
  
  return true;
};

/**
 * Validate German business registration number
 */
export const validateGermanBusinessNumber = (number: string): boolean => {
  const clean = number.replace(/[\s-]/g, '');
  
  // German business registration patterns
  const patterns = [
    /^HRB[0-9]{1,6}$/, // Handelsregister B
    /^HRA[0-9]{1,6}$/, // Handelsregister A
    /^[0-9]{8,9}$/, // Simple business number
  ];
  
  return patterns.some(pattern => pattern.test(clean.toUpperCase()));
};

/**
 * Validate loss amount for German market
 */
export const validateLossAmount = (amount: string): ValidationError | null => {
  const cleanAmount = amount.replace(/[^\d.,]/g, '');
  const numericAmount = parseFloat(cleanAmount.replace(',', '.'));
  
  if (isNaN(numericAmount)) {
    return {
      field: 'lossAmount',
      message: 'Bitte geben Sie einen gültigen Verlustbetrag ein',
      code: 'INVALID_AMOUNT'
    };
  }
  
  if (numericAmount < 1000) {
    return {
      field: 'lossAmount',
      message: 'Der Mindestbetrag für unsere Dienstleistungen beträgt €1.000',
      code: 'AMOUNT_TOO_LOW'
    };
  }
  
  if (numericAmount > 50000000) {
    return {
      field: 'lossAmount',
      message: 'Bitte kontaktieren Sie uns direkt für Fälle über €50 Millionen',
      code: 'AMOUNT_TOO_HIGH'
    };
  }
  
  return null;
};

/**
 * Validate German case description
 */
export const validateCaseDescription = (description: string): ValidationError | null => {
  if (!description || description.trim().length === 0) {
    return {
      field: 'caseDescription',
      message: 'Bitte beschreiben Sie Ihren Fall kurz',
      code: 'REQUIRED'
    };
  }
  
  if (description.length < 20) {
    return {
      field: 'caseDescription',
      message: 'Bitte geben Sie mindestens 20 Zeichen für die Fallbeschreibung ein',
      code: 'TOO_SHORT'
    };
  }
  
  if (description.length > 2000) {
    return {
      field: 'caseDescription',
      message: 'Die Fallbeschreibung darf nicht länger als 2000 Zeichen sein',
      code: 'TOO_LONG'
    };
  }
  
  // Check for suspicious content
  const suspiciousPatterns = [
    /spam/i, /bitcoin.*gift/i, /prince.*nigeria/i, /lottery.*winner/i,
    /urgent.*transfer/i, /inheritance.*claim/i
  ];
  
  if (suspiciousPatterns.some(pattern => pattern.test(description))) {
    return {
      field: 'caseDescription',
      message: 'Ihre Beschreibung enthält verdächtige Inhalte. Bitte kontaktieren Sie uns direkt.',
      code: 'SUSPICIOUS_CONTENT'
    };
  }
  
  return null;
};

/**
 * Comprehensive contact form validation for German market
 */
export const validateGermanContactForm = (data: {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  company?: string;
  caseType?: string;
  lossAmount?: string;
  urgency?: string;
  description?: string;
  gdprConsent?: boolean;
  contactMethod?: string;
}): FormValidationResult => {
  const errors: ValidationError[] = [];
  
  // Required field validation
  if (!data.firstName?.trim()) {
    errors.push({
      field: 'firstName',
      message: 'Vorname ist erforderlich',
      code: 'REQUIRED'
    });
  } else if (data.firstName.length < 2) {
    errors.push({
      field: 'firstName',
      message: 'Vorname muss mindestens 2 Zeichen lang sein',
      code: 'TOO_SHORT'
    });
  }
  
  if (!data.lastName?.trim()) {
    errors.push({
      field: 'lastName',
      message: 'Nachname ist erforderlich',
      code: 'REQUIRED'
    });
  } else if (data.lastName.length < 2) {
    errors.push({
      field: 'lastName',
      message: 'Nachname muss mindestens 2 Zeichen lang sein',
      code: 'TOO_SHORT'
    });
  }
  
  // Email validation
  if (!data.email?.trim()) {
    errors.push({
      field: 'email',
      message: 'E-Mail-Adresse ist erforderlich',
      code: 'REQUIRED'
    });
  } else if (!validateGermanEmail(data.email)) {
    errors.push({
      field: 'email',
      message: 'Bitte geben Sie eine gültige E-Mail-Adresse ein',
      code: 'INVALID_EMAIL'
    });
  }
  
  // Phone validation
  if (!data.phone?.trim()) {
    errors.push({
      field: 'phone',
      message: 'Telefonnummer ist erforderlich',
      code: 'REQUIRED'
    });
  } else if (!validateGermanPhone(data.phone)) {
    errors.push({
      field: 'phone',
      message: 'Bitte geben Sie eine gültige Telefonnummer ein (Deutschland, Österreich oder Schweiz)',
      code: 'INVALID_PHONE'
    });
  }
  
  // Case type validation
  if (!data.caseType?.trim()) {
    errors.push({
      field: 'caseType',
      message: 'Bitte wählen Sie einen Falltyp aus',
      code: 'REQUIRED'
    });
  }
  
  // Loss amount validation
  if (data.lossAmount) {
    const lossError = validateLossAmount(data.lossAmount);
    if (lossError) {
      errors.push(lossError);
    }
  }
  
  // Case description validation
  if (data.description) {
    const descriptionError = validateCaseDescription(data.description);
    if (descriptionError) {
      errors.push(descriptionError);
    }
  }
  
  // GDPR consent validation
  if (!data.gdprConsent) {
    errors.push({
      field: 'gdprConsent',
      message: 'Sie müssen der Datenschutzerklärung zustimmen',
      code: 'GDPR_REQUIRED'
    });
  }
  
  // Contact method validation
  if (!data.contactMethod?.trim()) {
    errors.push({
      field: 'contactMethod',
      message: 'Bitte wählen Sie eine bevorzugte Kontaktmethode',
      code: 'REQUIRED'
    });
  }
  
  // Company validation (if provided)
  if (data.company && data.company.length > 0 && data.company.length < 2) {
    errors.push({
      field: 'company',
      message: 'Firmenname muss mindestens 2 Zeichen lang sein',
      code: 'TOO_SHORT'
    });
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Validate booking form for German market
 */
export const validateGermanBookingForm = (data: {
  serviceId?: string;
  selectedDate?: string;
  selectedTime?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  caseType?: string;
  urgency?: string;
  description?: string;
  gdprConsent?: boolean;
}): FormValidationResult => {
  const errors: ValidationError[] = [];
  
  // Service selection validation
  if (!data.serviceId?.trim()) {
    errors.push({
      field: 'serviceId',
      message: 'Bitte wählen Sie einen Service aus',
      code: 'REQUIRED'
    });
  }
  
  // Date and time validation
  if (!data.selectedDate?.trim()) {
    errors.push({
      field: 'selectedDate',
      message: 'Bitte wählen Sie ein Datum aus',
      code: 'REQUIRED'
    });
  } else {
    const selectedDate = new Date(data.selectedDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      errors.push({
        field: 'selectedDate',
        message: 'Das gewählte Datum liegt in der Vergangenheit',
        code: 'DATE_IN_PAST'
      });
    }
    
    // Check if date is too far in the future (more than 6 months)
    const sixMonthsFromNow = new Date();
    sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6);
    
    if (selectedDate > sixMonthsFromNow) {
      errors.push({
        field: 'selectedDate',
        message: 'Termine können nur bis zu 6 Monate im Voraus gebucht werden',
        code: 'DATE_TOO_FAR'
      });
    }
  }
  
  if (!data.selectedTime?.trim()) {
    errors.push({
      field: 'selectedTime',
      message: 'Bitte wählen Sie eine Uhrzeit aus',
      code: 'REQUIRED'
    });
  }
  
  // Use contact form validation for common fields
  const contactValidation = validateGermanContactForm({
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    phone: data.phone,
    caseType: data.caseType,
    description: data.description,
    gdprConsent: data.gdprConsent
  });
  
  // Merge errors
  errors.push(...contactValidation.errors);
  
  // Urgency validation
  if (!data.urgency?.trim()) {
    errors.push({
      field: 'urgency',
      message: 'Bitte wählen Sie eine Dringlichkeitsstufe aus',
      code: 'REQUIRED'
    });
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Get error message in German based on error code
 */
export const getGermanErrorMessage = (code: string): string => {
  const errorMessages: Record<string, string> = {
    REQUIRED: 'Dieses Feld ist erforderlich',
    INVALID_EMAIL: 'Bitte geben Sie eine gültige E-Mail-Adresse ein',
    INVALID_PHONE: 'Bitte geben Sie eine gültige Telefonnummer ein',
    TOO_SHORT: 'Eingabe ist zu kurz',
    TOO_LONG: 'Eingabe ist zu lang',
    INVALID_AMOUNT: 'Ungültiger Betrag',
    AMOUNT_TOO_LOW: 'Betrag ist zu niedrig',
    AMOUNT_TOO_HIGH: 'Betrag ist zu hoch',
    DATE_IN_PAST: 'Datum liegt in der Vergangenheit',
    DATE_TOO_FAR: 'Datum liegt zu weit in der Zukunft',
    GDPR_REQUIRED: 'Zustimmung zur Datenschutzerklärung erforderlich',
    SUSPICIOUS_CONTENT: 'Verdächtige Inhalte erkannt',
    INVALID_BUSINESS_NUMBER: 'Ungültige Geschäftsnummer',
    INVALID_VAT: 'Ungültige USt-IdNr.',
    INVALID_POSTAL_CODE: 'Ungültige Postleitzahl'
  };
  
  return errorMessages[code] || 'Ungültige Eingabe';
};

/**
 * Format validation errors for display
 */
export const formatValidationErrors = (errors: ValidationError[]): Record<string, string> => {
  const formatted: Record<string, string> = {};
  
  errors.forEach(error => {
    formatted[error.field] = error.message;
  });
  
  return formatted;
};

/**
 * Check if form data contains personal information that needs special handling
 */
export const containsPersonalData = (data: Record<string, unknown>): boolean => {
  const personalDataFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'dateOfBirth'];
  
  return personalDataFields.some(field => {
    const fieldValue = data[field];
    return fieldValue && 
           typeof fieldValue === 'string' && 
           (fieldValue as string).toString().trim().length > 0;
  });
};

export default {
  validateGermanEmail,
  validateGermanBusinessNumber,
  validateLossAmount,
  validateCaseDescription,
  validateGermanContactForm,
  validateGermanBookingForm,
  getGermanErrorMessage,
  formatValidationErrors,
  containsPersonalData
}; 