/**
 * ValidationSchema Tests
 * 
 * Utility functions for testing validation in financial forms.
 */

import { 
  validators, 
  validateField, 
  validateForm, 
  ValidationSchema, 
  ValidationRule 
} from '../ValidationSchema';

/**
 * Run tests for a specific validator
 */
export function testValidator(
  validator: ValidationRule, 
  validValues: any[], 
  invalidValues: any[],
  context?: Record<string, any>
): { passed: boolean; failedTests: string[] } {
  const failedTests: string[] = [];
  
  // Test valid values
  for (const value of validValues) {
    const result = validator.validator(value, context);
    if (result !== null) {
      failedTests.push(`Expected value "${value}" to be valid, but it failed with message: ${result.message}`);
    }
  }
  
  // Test invalid values
  for (const value of invalidValues) {
    const result = validator.validator(value, context);
    if (result === null) {
      failedTests.push(`Expected value "${value}" to be invalid, but it passed validation`);
    }
  }
  
  return {
    passed: failedTests.length === 0,
    failedTests
  };
}

/**
 * Run tests for a validation schema
 */
export function testValidationSchema(
  schema: ValidationSchema,
  validForms: Record<string, any>[],
  invalidForms: Array<{ form: Record<string, any>, expectedErrors: string[] }>,
  context?: Record<string, any>
): { passed: boolean; failedTests: string[] } {
  const failedTests: string[] = [];
  
  // Test valid forms
  for (const form of validForms) {
    const errors = validateForm(form, schema, context);
    const hasErrors = Object.values(errors).some(error => error !== null);
    
    if (hasErrors) {
      failedTests.push(`Expected form to be valid, but it failed with errors: ${JSON.stringify(errors)}`);
    }
  }
  
  // Test invalid forms
  for (const { form, expectedErrors } of invalidForms) {
    const errors = validateForm(form, schema, context);
    const errorFields = Object.entries(errors)
      .filter(([_, error]) => error !== null)
      .map(([field, _]) => field);
    
    // Check if all expected error fields are present
    for (const expectedField of expectedErrors) {
      if (!errorFields.includes(expectedField)) {
        failedTests.push(`Expected error for field "${expectedField}", but none was found`);
      }
    }
    
    // Check if there are any unexpected error fields
    for (const field of errorFields) {
      if (!expectedErrors.includes(field)) {
        failedTests.push(`Unexpected error for field "${field}"`);
      }
    }
  }
  
  return {
    passed: failedTests.length === 0,
    failedTests
  };
}

/**
 * Basic tests for built-in validators
 */
export const basicValidatorTests = {
  /**
   * Test the required validator
   */
  testRequiredValidator(): { passed: boolean; failedTests: string[] } {
    const validator = validators.required();
    
    return testValidator(
      validator,
      ['value', 0, false, {}], // Valid values (non-empty)
      [undefined, null, '']    // Invalid values (empty)
    );
  },
  
  /**
   * Test the min validator
   */
  testMinValidator(): { passed: boolean; failedTests: string[] } {
    const validator = validators.min(5);
    
    return testValidator(
      validator,
      [5, 6, 10, '5', '10', '5.5'], // Valid values (>= 5)
      [4, 0, -1, '4', '4.9', '0']   // Invalid values (< 5)
    );
  },
  
  /**
   * Test the max validator
   */
  testMaxValidator(): { passed: boolean; failedTests: string[] } {
    const validator = validators.max(10);
    
    return testValidator(
      validator,
      [10, 9, 0, -5, '10', '9.9', '0', '-5'], // Valid values (<= 10)
      [11, 10.1, '11', '10.1']                // Invalid values (> 10)
    );
  },
  
  /**
   * Test the email validator
   */
  testEmailValidator(): { passed: boolean; failedTests: string[] } {
    const validator = validators.email();
    
    return testValidator(
      validator,
      ['test@example.com', 'user.name@domain.co.uk', 'name+tag@domain.com'], // Valid emails
      ['test', 'test@', '@example.com', 'test@example', 'test@.com']         // Invalid emails
    );
  },
  
  /**
   * Test the currency validator
   */
  testCurrencyValidator(): { passed: boolean; failedTests: string[] } {
    const validator = validators.currency();
    
    return testValidator(
      validator,
      ['100', '1,000', '1,000.50', '$1000', '1.5', '-100', '0'], // Valid currency values
      ['abc', '1,00,0', '$', '.']                                // Invalid currency values
    );
  },
  
  /**
   * Test the date validator
   */
  testDateValidator(): { passed: boolean; failedTests: string[] } {
    const validator = validators.date();
    
    return testValidator(
      validator,
      [new Date(), '2023-01-01', '2023/01/01', '01/01/2023'], // Valid dates
      ['not a date', '13/13/2023', '2023-13-13']              // Invalid dates
    );
  },
  
  /**
   * Test the credit card validator
   */
  testCreditCardValidator(): { passed: boolean; failedTests: string[] } {
    const validator = validators.creditCard();
    
    return testValidator(
      validator,
      ['4111111111111111', '4111-1111-1111-1111', '4111 1111 1111 1111'], // Valid card numbers (Visa test)
      ['411111111111', '41111111111111111111', 'abcd1234efgh5678']       // Invalid card numbers
    );
  },
  
  /**
   * Run all basic validator tests
   */
  runAll(): { allPassed: boolean; results: Record<string, { passed: boolean; failedTests: string[] }> } {
    const results = {
      required: this.testRequiredValidator(),
      min: this.testMinValidator(),
      max: this.testMaxValidator(),
      email: this.testEmailValidator(),
      currency: this.testCurrencyValidator(),
      date: this.testDateValidator(),
      creditCard: this.testCreditCardValidator()
    };
    
    const allPassed = Object.values(results).every(result => result.passed);
    
    return { allPassed, results };
  }
}; 