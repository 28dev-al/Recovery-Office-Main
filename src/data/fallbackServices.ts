/**
 * Fallback Services Data
 * 
 * Used when API calls fail to ensure the application remains functional
 */

import { 
  FinancialServiceType, 
  FinancialServiceCategory, 
  FinancialServiceOption 
} from '../types/financial.types';

export const fallbackServices: FinancialServiceOption[] = [
  {
    id: FinancialServiceType.INVESTMENT_FRAUD_RECOVERY,
    name: 'Investment Fraud Recovery',
    description: 'Comprehensive recovery service for investment fraud cases',
    duration: 90,
    price: 0, // Free consultation
    icon: 'https://images2.imgbox.com/76/6d/BSPbxZsR_o.png',
    features: [
      'Detailed case assessment',
      'Asset tracing and investigation',
      'Legal pathway recommendations',
      'Recovery strategy development',
      'Regulatory complaint assistance'
    ],
    isActive: true,
    category: FinancialServiceCategory.FRAUD_RECOVERY,
    type: FinancialServiceType.INVESTMENT_FRAUD_RECOVERY
  },
  {
    id: FinancialServiceType.CRYPTOCURRENCY_RECOVERY,
    name: 'Cryptocurrency Recovery',
    description: 'Specialized recovery for lost or stolen cryptocurrency',
    duration: 75,
    price: 0,
    icon: 'https://images2.imgbox.com/ba/78/wNqfvrmO_o.png',
    features: [
      'Blockchain analysis and tracing',
      'Exchange cooperation protocols',
      'Wallet recovery procedures',
      'Smart contract investigation',
      'Cross-border recovery coordination'
    ],
    isActive: true,
    category: FinancialServiceCategory.CRYPTO_RECOVERY,
    type: FinancialServiceType.CRYPTOCURRENCY_RECOVERY
  },
  {
    id: FinancialServiceType.FINANCIAL_SCAM_RECOVERY,
    name: 'Financial Scam Recovery',
    description: 'Recovery assistance for various financial scams and fraud',
    duration: 60,
    price: 0,
    icon: 'https://images2.imgbox.com/e7/0f/yfQ894Tl_o.png',
    features: [
      'Scam verification and documentation',
      'Financial institution coordination',
      'Evidence collection and preservation',
      'Recovery timeline development',
      'Ongoing case management'
    ],
    isActive: true,
    category: FinancialServiceCategory.SCAM_RECOVERY,
    type: FinancialServiceType.FINANCIAL_SCAM_RECOVERY
  },
  {
    id: FinancialServiceType.REGULATORY_COMPLAINT_ASSISTANCE,
    name: 'Regulatory Complaint Assistance',
    description: 'Help with filing complaints to regulatory bodies',
    duration: 45,
    price: 0,
    icon: 'https://images2.imgbox.com/f2/e9/tDfdd3sR_o.png',
    features: [
      'Regulatory jurisdiction assessment',
      'Complaint preparation and filing',
      'Documentation organization',
      'Follow-up coordination',
      'Multi-jurisdiction submissions'
    ],
    isActive: true,
    category: FinancialServiceCategory.REGULATORY,
    type: FinancialServiceType.REGULATORY_COMPLAINT_ASSISTANCE
  }
]; 