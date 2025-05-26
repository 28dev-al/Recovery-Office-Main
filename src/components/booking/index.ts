export { default as ServiceSelection } from './ServiceSelection';
export { default as DateTimeSelection } from './DateTimeSelection';
export { default as CustomerInfoForm } from './CustomerInfoForm';
export { default as BookingSummary } from './BookingSummary';
// The following export is commented out because the module does not exist or is missing type declarations.
// Please implement BookingProgress.tsx and its type declarations in the booking directory to enable this export.
// export { default as BookingProgress } from './BookingProgress';
export { default as BookingControls } from './BookingControls';
export { default as ProgressIndicator } from './ProgressIndicator';
export { default as BookingInterface } from './BookingInterface';
export { default as MobileCalendarModal } from './MobileCalendarModal';

// Export the step components
export * from './steps';

// Export specific validation schemas to avoid name conflicts
export {
  serviceSelectionSchema,
  serviceSelectionDefaultValues,
  validateServiceSelection,
  validateField as validateServiceField,
  type ServiceSelectionData
} from './validation/serviceSelection.schema';

export {
  dateSelectionSchema,
  dateSelectionDefaultValues,
  validateDateSelection,
  validateField as validateDateField,
  type DateSelectionData
} from './validation/dateSelection.schema';

export {
  clientInfoSchema,
  clientInfoDefaultValues,
  validateClientInfo,
  validateField as validateClientInfoField,
  type ClientInfoData
} from './validation/clientInfo.schema';

export {
  confirmationStepSchema,
  confirmationStepDefaultValues,
  validateConfirmationStep,
  validateField as validateConfirmationField,
  type ConfirmationStepData
} from './validation/confirmationStep.schema';

// Also export client information aliases
export {
  clientInformationSchema,
  clientInformationDefaultValues,
  validateClientInformation,
  validateClientInformationField,
  type ClientInformationData
} from './validation';

// We'll uncomment these when implemented
// export { default as MobileCalendarModal } from './MobileCalendarModal'; 











