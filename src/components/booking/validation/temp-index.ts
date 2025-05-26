/**
 * Booking Validation Schemas Index
 * 
 * This file exports all validation schemas for the booking system.
 * Each schema uses Zod for validation and implements sacred geometry principles.
 */

// Export service selection schema
export { 
  serviceSelectionSchema,
  serviceSelectionDefaultValues,
  validateServiceSelection,
  validateField as validateServiceField
} from './serviceSelection.schema';
export type { ServiceSelectionData } from './serviceSelection.schema';

// Export date selection schema
export {
  dateSelectionSchema,
  dateSelectionDefaultValues,
  validateDateSelection,
  validateField as validateDateField
} from './dateSelection.schema';
export type { DateSelectionData } from './dateSelection.schema';

// Export client info schema
export {
  clientInfoSchema,
  clientInfoDefaultValues,
  validateClientInfo,
  validateField as validateClientInfoField
} from './clientInfo.schema';
export type { ClientInfoData } from './clientInfo.schema';

// Export confirmation step schema
export {
  confirmationStepSchema,
  confirmationStepDefaultValues,
  validateConfirmationStep,
  validateField as validateConfirmationField
} from './confirmationStep.schema';
export type { ConfirmationStepData } from './confirmationStep.schema';

// Alias the client information schema to match the import in other files
import {
  clientInfoSchema as clientInformationSchema,
  clientInfoDefaultValues as clientInformationDefaultValues,
  validateClientInfo as validateClientInformation,
  validateField as validateClientInformationField
} from './clientInfo.schema';
import type { ClientInfoData as ClientInformationData } from './clientInfo.schema';

// Re-export client information schema with alias names
export {
  clientInformationSchema,
  clientInformationDefaultValues,
  validateClientInformation,
  validateClientInformationField
};
export type { ClientInformationData };
