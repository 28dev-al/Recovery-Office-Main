// Client-specific types and utilities
// Note: ClientInformation interface is now in types/booking.ts

import type { ClientInformation } from './booking';

// Re-export ClientInformation from the canonical location
export type { ClientInformation } from './booking';

// Client-specific partial type for forms
export interface PartialClientInformation {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  company?: string;
  dateOfBirth?: string;
  preferredContactMethod?: 'text' | 'email' | 'phone';
  preferredContact?: 'email' | 'phone';
  contactPreference?: string;
  isNewClient?: boolean;
  caseType?: 'investment-fraud' | 'cryptocurrency-recovery' | 'financial-scam' | 'regulatory-complaint';
  caseDescription?: string;
  estimatedLoss?: 'under-10k' | '10k-50k' | '50k-100k' | '100k-500k' | '500k-1m' | 'over-1m';
  urgencyLevel?: 'low' | 'medium' | 'high' | 'critical';
  additionalNotes?: string;
  notes?: string;
  consentToContact?: boolean;
  privacyPolicyAccepted?: boolean;
  dataProcessingAgreed?: boolean;
  hasReportedToPolice?: boolean;
  hasReportedToAuthorities?: boolean;
  totalLossAmount?: number;
  dateOfIncident?: string;
  approximateLossAmount?: string;
  incidentDate?: string;
  financialInstitution?: string;
  fraudType?: 'investment_fraud' | 'bank_fraud' | 'credit_card_fraud' | 'identity_theft' | 'pension_scam' | 'mortgage_fraud' | 'insurance_fraud' | 'tax_fraud' | 'other';
}

// Alias for backward compatibility
export type ClientInfo = ClientInformation;

// Default client information for initial forms  
export const defaultClientInformation = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  preferredContactMethod: 'email' as const,
  preferredContact: 'email' as const,
  isNewClient: true,
  caseType: 'investment-fraud' as const,
  estimatedLoss: 'under-10k' as const,
  urgencyLevel: 'medium' as const,
  consentToContact: false,
  privacyPolicyAccepted: false,
  dataProcessingAgreed: false
}; 