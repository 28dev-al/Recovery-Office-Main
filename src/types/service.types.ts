/**
 * Service Type Definitions - Single Source of Truth
 * 
 * This file contains the canonical ServiceType enum used throughout the Recovery Office application.
 * All ServiceType imports should reference this file to avoid conflicts.
 */

export enum ServiceType {
  // Financial Recovery Services (for Recovery Office)
  CRYPTOCURRENCY_RECOVERY = 'cryptocurrency-recovery',
  INVESTMENT_FRAUD_RECOVERY = 'investment-fraud-recovery',
  FINANCIAL_SCAM_RECOVERY = 'financial-scam-recovery',
  REGULATORY_COMPLAINT = 'regulatory-complaint',
  LEGAL_CONSULTATION = 'legal-consultation',
  FINANCIAL_INVESTIGATION = 'financial-investigation',
  
  // Legacy consultation types (maintain compatibility)
  INITIAL_CONSULTATION = 'initial-consultation',
  FOLLOW_UP = 'follow-up',
  SPECIALIZED_TREATMENT = 'specialized-treatment',
  COMPREHENSIVE_ASSESSMENT = 'comprehensive-assessment',
  
  // Generic types for fallbacks
  RECOVERY = 'recovery',
  CONSULTATION = 'consultation',
  INVESTIGATION = 'investigation',
  LEGAL = 'legal'
}

// Export type union for backwards compatibility
export type ServiceTypeString = 
  | 'cryptocurrency-recovery'
  | 'investment-fraud-recovery'
  | 'financial-scam-recovery'
  | 'regulatory-complaint'
  | 'legal-consultation'
  | 'financial-investigation'
  | 'initial-consultation'
  | 'follow-up'
  | 'specialized-treatment'
  | 'comprehensive-assessment'
  | 'recovery'
  | 'consultation'
  | 'investigation'
  | 'legal';

// Helper function to validate ServiceType
export const isValidServiceType = (value: string): value is ServiceType => {
  return Object.values(ServiceType).includes(value as ServiceType);
};

// Helper function to get display name
export const getServiceTypeDisplayName = (type: ServiceType): string => {
  const displayNames: Record<ServiceType, string> = {
    [ServiceType.CRYPTOCURRENCY_RECOVERY]: 'Cryptocurrency Recovery',
    [ServiceType.INVESTMENT_FRAUD_RECOVERY]: 'Investment Fraud Recovery',
    [ServiceType.FINANCIAL_SCAM_RECOVERY]: 'Financial Scam Recovery',
    [ServiceType.REGULATORY_COMPLAINT]: 'Regulatory Complaint',
    [ServiceType.LEGAL_CONSULTATION]: 'Legal Consultation',
    [ServiceType.FINANCIAL_INVESTIGATION]: 'Financial Investigation',
    [ServiceType.INITIAL_CONSULTATION]: 'Initial Consultation',
    [ServiceType.FOLLOW_UP]: 'Follow-up Session',
    [ServiceType.SPECIALIZED_TREATMENT]: 'Specialized Treatment',
    [ServiceType.COMPREHENSIVE_ASSESSMENT]: 'Comprehensive Assessment',
    [ServiceType.RECOVERY]: 'Recovery Service',
    [ServiceType.CONSULTATION]: 'Consultation',
    [ServiceType.INVESTIGATION]: 'Investigation',
    [ServiceType.LEGAL]: 'Legal Service'
  };
  return displayNames[type] || type;
};

// Helper function to map category strings to ServiceType
export const mapCategoryToServiceType = (category: string): ServiceType => {
  const categoryLower = category.toLowerCase();
  
  switch (categoryLower) {
    case 'cryptocurrency':
    case 'crypto':
      return ServiceType.CRYPTOCURRENCY_RECOVERY;
    case 'fraud':
    case 'investment-fraud':
      return ServiceType.INVESTMENT_FRAUD_RECOVERY;
    case 'scam':
    case 'financial-scam':
      return ServiceType.FINANCIAL_SCAM_RECOVERY;
    case 'regulatory':
    case 'complaint':
      return ServiceType.REGULATORY_COMPLAINT;
    case 'legal':
      return ServiceType.LEGAL_CONSULTATION;
    case 'investigation':
      return ServiceType.FINANCIAL_INVESTIGATION;
    case 'initial':
    case 'initial-consultation':
      return ServiceType.INITIAL_CONSULTATION;
    case 'follow-up':
    case 'followup':
      return ServiceType.FOLLOW_UP;
    case 'specialized':
    case 'treatment':
      return ServiceType.SPECIALIZED_TREATMENT;
    case 'assessment':
    case 'comprehensive':
      return ServiceType.COMPREHENSIVE_ASSESSMENT;
    case 'consultation':
      return ServiceType.CONSULTATION;
    case 'recovery':
    default:
      return ServiceType.RECOVERY;
  }
}; 