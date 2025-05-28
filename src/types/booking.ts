export interface ClientInformation {
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company?: string;
  dateOfBirth?: string;

  // Contact Preferences
  preferredContactMethod: 'text' | 'email' | 'phone';
  preferredContact: 'email' | 'phone';
  contactPreference?: string;

  // Client Status
  isNewClient: boolean;

  // Case Information
  caseType: 'investment-fraud' | 'cryptocurrency-recovery' | 'financial-scam' | 'regulatory-complaint';
  caseDescription?: string;
  estimatedLoss: 'under-10k' | '10k-50k' | '50k-100k' | '100k-500k' | '500k-1m' | 'over-1m';
  urgencyLevel: 'low' | 'medium' | 'high' | 'critical';

  // Additional Information
  additionalNotes?: string;
  notes?: string;

  // Legal/Compliance
  consentToContact: boolean;
  privacyPolicyAccepted: boolean;
  dataProcessingAgreed: boolean;

  // Investigation Details
  hasReportedToPolice?: boolean;
  hasReportedToAuthorities?: boolean;

  // Financial Details
  totalLossAmount?: number;
  dateOfIncident?: string;
  approximateLossAmount?: string;
  incidentDate?: string;
  financialInstitution?: string;
  fraudType?: 'investment_fraud' | 'bank_fraud' | 'credit_card_fraud' | 'identity_theft' | 'pension_scam' | 'mortgage_fraud' | 'insurance_fraud' | 'tax_fraud' | 'other';
}

export interface BookingFormData {
  selectedService?: ServiceOption;
  selectedDate?: string;
  selectedTimeSlot?: BookingTimeSlot;
  clientInfo?: ClientInformation;
}

export interface ExtendedBookingFormState extends BookingFormData {
  bookingReference?: string;
  status?: 'draft' | 'pending' | 'confirmed' | 'completed';
}

export interface ServiceOption {
  id: string;
  name: string;
  description: string;
  price?: string;
  duration?: string;
  type?: string;
  category?: string;
  icon?: string;
  image?: string;
}

export interface BookingTimeSlot {
  id: string;
  time: string;
  available: boolean;
  startTime?: string;
  endTime?: string;
  duration?: number;
} 