/**
 * Recovery Office Services Data
 * 
 * Complete service definitions for the Recovery Office booking system
 */

import { ServiceOption } from '../types/booking.types';
import { ServiceType } from '../types/service.types';

export const RECOVERY_SERVICES: ServiceOption[] = [
  {
    id: 'cryptocurrency-recovery',
    _id: 'cryptocurrency-recovery',
    mongoObjectId: 'cryptocurrency-recovery',
    name: 'Cryptocurrency Recovery',
    description: 'Expert recovery of stolen Bitcoin, Ethereum, and other digital assets through blockchain analysis and legal action',
    duration: 75,
    price: 750,
    formattedPrice: '£750',
    formattedDuration: '1 hour 15 minutes',
    category: 'crypto',
    type: ServiceType.CRYPTOCURRENCY_RECOVERY,
    icon: '/icons/services/crypto.svg',
    isActive: true,
    availableForNewClients: true,
    isValidObjectId: false,
    isDevelopmentFallback: false
  },
  {
    id: 'investment-fraud-recovery',
    _id: 'investment-fraud-recovery', 
    mongoObjectId: 'investment-fraud-recovery',
    name: 'Investment Fraud Recovery',
    description: 'Recovery services for victims of investment scams, Ponzi schemes, and fraudulent financial advisors',
    duration: 90,
    price: 750,
    formattedPrice: '£750',
    formattedDuration: '1 hour 30 minutes',
    category: 'fraud',
    type: ServiceType.INVESTMENT_FRAUD_RECOVERY,
    icon: '/icons/services/fraud.svg',
    isActive: true,
    availableForNewClients: true,
    isValidObjectId: false,
    isDevelopmentFallback: false
  },
  {
    id: 'regulatory-assistance',
    _id: 'regulatory-assistance',
    mongoObjectId: 'regulatory-assistance', 
    name: 'Regulatory Assistance',
    description: 'Professional assistance with financial regulatory matters, FCA complaints, and ombudsman services',
    duration: 60,
    price: 500,
    formattedPrice: '£500',
    formattedDuration: '1 hour',
    category: 'regulatory',
    type: ServiceType.REGULATORY_COMPLAINT,
    icon: '/icons/services/regulatory.svg',
    isActive: true,
    availableForNewClients: true,
    isValidObjectId: false,
    isDevelopmentFallback: false
  },
  {
    id: 'professional-negligence',
    _id: 'professional-negligence',
    mongoObjectId: 'professional-negligence',
    name: 'Professional Negligence',
    description: 'Legal action against negligent financial professionals, advisors, and institutions',
    duration: 90,
    price: 950,
    formattedPrice: '£950',
    formattedDuration: '1 hour 30 minutes',
    category: 'legal',
    type: ServiceType.LEGAL_CONSULTATION,
    icon: '/icons/services/legal.svg',
    isActive: true,
    availableForNewClients: true,
    isValidObjectId: false,
    isDevelopmentFallback: false
  }
];

// Export individual services for easy access
export const CRYPTOCURRENCY_RECOVERY = RECOVERY_SERVICES[0];
export const INVESTMENT_FRAUD_RECOVERY = RECOVERY_SERVICES[1];
export const REGULATORY_ASSISTANCE = RECOVERY_SERVICES[2];
export const PROFESSIONAL_NEGLIGENCE = RECOVERY_SERVICES[3];

// Export service count for validation
export const TOTAL_SERVICES = RECOVERY_SERVICES.length;

// Export service IDs for easy reference
export const SERVICE_IDS = RECOVERY_SERVICES.map(service => service.id);

// Export default for easy importing
export default RECOVERY_SERVICES; 