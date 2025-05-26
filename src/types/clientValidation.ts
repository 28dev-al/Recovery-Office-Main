/**
 * Client Information Validation Schema
 * 
 * Comprehensive validation for Recovery Office client information collection
 * Meeting financial industry standards and GDPR compliance requirements
 */

import { z } from 'zod';

export const clientInfoSchema = z.object({
  // Personal Information (Required)
  firstName: z.string()
    .min(1, 'First name is required')
    .max(50, 'First name must be less than 50 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Please enter a valid first name'),
  
  lastName: z.string()
    .min(1, 'Last name is required')
    .max(50, 'Last name must be less than 50 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Please enter a valid last name'),
  
  email: z.string()
    .email('Please enter a valid email address')
    .min(1, 'Email is required'),
  
  phone: z.string()
    .min(10, 'Please enter a valid phone number')
    .regex(/^[+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number'),
  
  // Case Information (Required)
  caseType: z.enum([
    'investment-fraud',
    'cryptocurrency-recovery', 
    'financial-scam',
    'regulatory-complaint'
  ], { errorMap: () => ({ message: 'Please select a case type' }) }),
  
  estimatedLoss: z.number()
    .positive('Loss amount must be greater than 0')
    .max(100000000, 'Please contact us directly for amounts over £100M')
    .optional(),
  
  // Contact Preferences (Required)
  preferredContact: z.enum(['email', 'phone', 'both'], {
    errorMap: () => ({ message: 'Please select a preferred contact method' })
  }),
  
  urgencyLevel: z.enum(['standard', 'urgent', 'emergency'], {
    errorMap: () => ({ message: 'Please select urgency level' })
  }),
  
  // Optional Information
  company: z.string().max(100, 'Company name must be less than 100 characters').optional(),
  additionalNotes: z.string().max(1000, 'Notes must be less than 1000 characters').optional(),
  
  // Legal Requirements (Required)
  consentToContact: z.boolean().refine(val => val === true, {
    message: 'Consent to contact is required to proceed'
  }),
  
  privacyPolicyAccepted: z.boolean().refine(val => val === true, {
    message: 'Privacy policy acceptance is required'
  }),
  
  dataProcessingAgreed: z.boolean().refine(val => val === true, {
    message: 'Data processing agreement is required'
  })
});

export type ClientInformation = z.infer<typeof clientInfoSchema>;

// Case type options for UI
export const caseTypeOptions = [
  { value: 'investment-fraud', label: 'Investment Fraud Recovery' },
  { value: 'cryptocurrency-recovery', label: 'Cryptocurrency Recovery' },
  { value: 'financial-scam', label: 'Financial Scam Recovery' },
  { value: 'regulatory-complaint', label: 'Regulatory Complaint Assistance' }
] as const;

// Urgency level options with descriptions
export const urgencyLevelOptions = [
  { value: 'standard', label: 'Standard (1-2 weeks)', description: 'Normal processing time' },
  { value: 'urgent', label: 'Urgent (3-5 days)', description: 'Priority handling required' },
  { value: 'emergency', label: 'Emergency (24-48 hours)', description: 'Critical situation requiring immediate attention' }
] as const;

// Contact method options
export const contactMethodOptions = [
  { value: 'email', label: 'Email', description: 'Professional written communication' },
  { value: 'phone', label: 'Phone Call', description: 'Direct voice consultation' },
  { value: 'both', label: 'Both Email & Phone', description: 'Maximum flexibility and communication' }
] as const; 