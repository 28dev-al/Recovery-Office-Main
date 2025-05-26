/**
 * Financial Recovery Service Types
 * 
 * Type definitions specific to financial recovery services
 */

// Financial Recovery Service Categories
export enum FinancialServiceCategory {
  FRAUD_RECOVERY = 'fraud-recovery',
  CRYPTO_RECOVERY = 'crypto-recovery',
  SCAM_RECOVERY = 'scam-recovery',
  REGULATORY = 'regulatory'
}

// Financial Recovery Service Types
export enum FinancialServiceType {
  INVESTMENT_FRAUD_RECOVERY = 'investment-fraud-recovery',
  CRYPTOCURRENCY_RECOVERY = 'cryptocurrency-recovery',
  FINANCIAL_SCAM_RECOVERY = 'financial-scam-recovery',
  REGULATORY_COMPLAINT_ASSISTANCE = 'regulatory-complaint-assistance'
}

// Financial Service Option
export interface FinancialServiceOption {
  id: string;
  type: FinancialServiceType;
  name: string;
  description: string;
  duration: number;
  price?: number;
  category: FinancialServiceCategory;
  features: string[];
  icon?: string;
  isActive?: boolean;
}

// Financial Case Information
export interface FinancialCaseInfo {
  caseType: FinancialServiceType;
  estimatedLoss?: number;
  incidentDate?: string;
  hasDocumentation?: boolean;
  hasPreviousRecoveryAttempts?: boolean;
  additionalDetails?: string;
} 