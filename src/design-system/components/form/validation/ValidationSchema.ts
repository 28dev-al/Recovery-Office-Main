/**
 * ValidationSchema Utility
 * 
 * A utility for creating and managing validation schemas for financial forms.
 * Implements common validation patterns used in financial applications.
 */

// Define validation error types
export type ValidationError = {
  message: string;
  type: 'error' | 'warning' | 'info';
};

// Define validator function type
export type ValidatorFn = (value: any, context?: Record<string, any>) => ValidationError | null;

// Define validation rule object
export type ValidationRule = {
  validator: ValidatorFn;
  message: string;
  type?: 'error' | 'warning' | 'info';
};

// Define validation schema type
export type ValidationSchema = Record<string, ValidationRule[]>;

/**
 * Common validators for financial forms
 */
export const validators = {
  /**
   * Required field validator
   */
  required: (message = 'This field is required'): ValidationRule => ({
    validator: (value) => {
      if (value === undefined || value === null || value === '') {
        return { message, type: 'error' };
      }
      return null;
    },
    message,
    type: 'error',
  }),
  
  /**
   * Minimum value validator
   */
  min: (min: number, message?: string): ValidationRule => ({
    validator: (value) => {
      if (value === undefined || value === null || value === '') return null;
      const numValue = parseFloat(value);
      if (isNaN(numValue) || numValue < min) {
        return { 
          message: message || `Value must be at least ${min}`, 
          type: 'error' 
        };
      }
      return null;
    },
    message: message || `Value must be at least ${min}`,
    type: 'error',
  }),
  
  /**
   * Maximum value validator
   */
  max: (max: number, message?: string): ValidationRule => ({
    validator: (value) => {
      if (value === undefined || value === null || value === '') return null;
      const numValue = parseFloat(value);
      if (isNaN(numValue) || numValue > max) {
        return { 
          message: message || `Value must be at most ${max}`, 
          type: 'error' 
        };
      }
      return null;
    },
    message: message || `Value must be at most ${max}`,
    type: 'error',
  }),
  
  /**
   * Range validator
   */
  range: (min: number, max: number, message?: string): ValidationRule => ({
    validator: (value) => {
      if (value === undefined || value === null || value === '') return null;
      const numValue = parseFloat(value);
      if (isNaN(numValue) || numValue < min || numValue > max) {
        return { 
          message: message || `Value must be between ${min} and ${max}`, 
          type: 'error' 
        };
      }
      return null;
    },
    message: message || `Value must be between ${min} and ${max}`,
    type: 'error',
  }),
  
  /**
   * Email validator
   */
  email: (message = 'Please enter a valid email address'): ValidationRule => ({
    validator: (value) => {
      if (value === undefined || value === null || value === '') return null;
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailPattern.test(value)) {
        return { message, type: 'error' };
      }
      return null;
    },
    message,
    type: 'error',
  }),
  
  /**
   * Phone number validator
   */
  phone: (message = 'Please enter a valid phone number'): ValidationRule => ({
    validator: (value) => {
      if (value === undefined || value === null || value === '') return null;
      // Simplified phone validation - could be extended for international formats
      const phonePattern = /^\+?[0-9]{10,15}$/;
      if (!phonePattern.test(value.replace(/\D/g, ''))) {
        return { message, type: 'error' };
      }
      return null;
    },
    message,
    type: 'error',
  }),
  
  /**
   * Currency validator
   */
  currency: (message = 'Please enter a valid monetary amount'): ValidationRule => ({
    validator: (value) => {
      if (value === undefined || value === null || value === '') return null;
      
      // Allow for currency formatting with commas and decimals
      const cleanValue = typeof value === 'string' 
        ? value.replace(/[^0-9.-]/g, '')
        : value.toString();
        
      const numValue = parseFloat(cleanValue);
      if (isNaN(numValue)) {
        return { message, type: 'error' };
      }
      return null;
    },
    message,
    type: 'error',
  }),
  
  /**
   * Percentage validator
   */
  percentage: (message = 'Please enter a valid percentage'): ValidationRule => ({
    validator: (value) => {
      if (value === undefined || value === null || value === '') return null;
      
      // Allow for percentage formatting
      const cleanValue = typeof value === 'string' 
        ? value.replace(/[^0-9.-]/g, '')
        : value.toString();
        
      const numValue = parseFloat(cleanValue);
      if (isNaN(numValue)) {
        return { message, type: 'error' };
      }
      return null;
    },
    message,
    type: 'error',
  }),
  
  /**
   * Date validator
   */
  date: (message = 'Please enter a valid date'): ValidationRule => ({
    validator: (value) => {
      if (value === undefined || value === null || value === '') return null;
      
      let date: Date;
      if (value instanceof Date) {
        date = value;
      } else {
        date = new Date(value);
      }
      
      if (isNaN(date.getTime())) {
        return { message, type: 'error' };
      }
      return null;
    },
    message,
    type: 'error',
  }),
  
  /**
   * Future date validator
   */
  futureDate: (message = 'Please enter a future date'): ValidationRule => ({
    validator: (value) => {
      if (value === undefined || value === null || value === '') return null;
      
      let date: Date;
      if (value instanceof Date) {
        date = value;
      } else {
        date = new Date(value);
      }
      
      if (isNaN(date.getTime())) {
        return { message: 'Please enter a valid date', type: 'error' };
      }
      
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (date < today) {
        return { message, type: 'error' };
      }
      return null;
    },
    message,
    type: 'error',
  }),
  
  /**
   * Past date validator
   */
  pastDate: (message = 'Please enter a past date'): ValidationRule => ({
    validator: (value) => {
      if (value === undefined || value === null || value === '') return null;
      
      let date: Date;
      if (value instanceof Date) {
        date = value;
      } else {
        date = new Date(value);
      }
      
      if (isNaN(date.getTime())) {
        return { message: 'Please enter a valid date', type: 'error' };
      }
      
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (date > today) {
        return { message, type: 'error' };
      }
      return null;
    },
    message,
    type: 'error',
  }),
  
  /**
   * Credit card number validator
   */
  creditCard: (message = 'Please enter a valid credit card number'): ValidationRule => ({
    validator: (value) => {
      if (value === undefined || value === null || value === '') return null;
      
      // Remove spaces and dashes
      const cardNumber = value.toString().replace(/[\s-]/g, '');
      
      // Check if the card number contains only digits
      if (!/^\d+$/.test(cardNumber)) {
        return { message, type: 'error' };
      }
      
      // Check length (most credit cards are between 13-19 digits)
      if (cardNumber.length < 13 || cardNumber.length > 19) {
        return { message, type: 'error' };
      }
      
      // Luhn algorithm (checksum) for credit card validation
      let sum = 0;
      let double = false;
      
      for (let i = cardNumber.length - 1; i >= 0; i--) {
        let digit = parseInt(cardNumber.charAt(i), 10);
        
        if (double) {
          digit *= 2;
          if (digit > 9) {
            digit -= 9;
          }
        }
        
        sum += digit;
        double = !double;
      }
      
      if (sum % 10 !== 0) {
        return { message, type: 'error' };
      }
      
      return null;
    },
    message,
    type: 'error',
  }),
  
  /**
   * Custom validator creator
   */
  custom: (validatorFn: ValidatorFn, message: string, type: 'error' | 'warning' | 'info' = 'error'): ValidationRule => ({
    validator: validatorFn,
    message,
    type,
  }),
};

/**
 * Validate a form value against a set of rules
 */
export function validateField(
  value: any,
  rules: ValidationRule[],
  context?: Record<string, any>
): ValidationError | null {
  for (const rule of rules) {
    const error = rule.validator(value, context);
    if (error) {
      return error;
    }
  }
  return null;
}

/**
 * Validate an entire form against a schema
 */
export function validateForm(
  values: Record<string, any>,
  schema: ValidationSchema,
  context?: Record<string, any>
): Record<string, ValidationError | null> {
  const errors: Record<string, ValidationError | null> = {};
  
  for (const [field, rules] of Object.entries(schema)) {
    errors[field] = validateField(values[field], rules, { ...context, values });
  }
  
  return errors;
}

/**
 * Check if a form has any errors
 */
export function hasErrors(errors: Record<string, ValidationError | null>): boolean {
  return Object.values(errors).some(error => error && error.type === 'error');
} 