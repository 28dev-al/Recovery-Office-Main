/**
 * Form Validation Index
 * 
 * This file exports all form validation components and utilities
 * to provide consistent imports throughout the application.
 */

export { default as ValidationMessage } from './ValidationMessage';
export type { ValidationMessageProps } from './ValidationMessage';

export { 
  validators,
  validateField,
  validateForm,
  hasErrors 
} from './ValidationSchema';

export type { 
  ValidationError,
  ValidatorFn,
  ValidationRule,
  ValidationSchema 
} from './ValidationSchema'; 