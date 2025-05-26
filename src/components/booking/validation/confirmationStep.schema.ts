import { z } from 'zod';
import { PHI, FIBONACCI, PHI_INVERSE, ANIMATION_TIMING } from '../../../constants/sacred-geometry';

import { getFibonacciByIndex } from '../../../utils/getFibonacciByIndex';

/**
 * Validation schema for the confirmation step of the booking process
 * Uses Zod schema validation with sacred geometry principles:
 * - PHI (Golden Ratio) for validation timing
 * - Fibonacci sequence for field length validations
 * - Sacred proportions for validation rules
 */
export const confirmationStepSchema = z.object({
  /**
   * Whether the user has confirmed their booking details are correct
   * Must be true to proceed - a foundational requirement like PHI is foundational to sacred geometry
   */
  detailsConfirmed: z.literal(true, {
    errorMap: () => ({ message: "You must confirm the booking details" })
  }),
  
  /**
   * Payment method selection
   * Must be one of the supported payment methods
   * The options form a balanced system like the golden rectangle's proportions
   */
  paymentMethod: z.enum(['credit_card', 'debit_card', 'paypal', 'in_person'], {
    required_error: "Please select a payment method",
    invalid_type_error: "Invalid payment method selected",
  }),
  
  /**
   * Whether the user agrees to the cancellation policy
   * Must be true to proceed - fundamental agreement like the fundamental properties of PHI
   */
  cancellationPolicyAgreed: z.literal(true, {
    errorMap: () => ({ message: "You must agree to the cancellation policy" })
  }),
  
  /**
   * Optional promotional code
   * If provided, must be a string with reasonable length
   * Maximum length is Fibonacci[8] = 21 characters
   */
  promoCode: z.string()
    .max(FIBONACCI[8], `Promo code cannot exceed ${FIBONACCI[8]} characters`)
    .optional(),
  
  /**
   * Payment processing status - internal field
   * Used to track payment processing state
   */
  paymentProcessed: z.boolean().optional(),
  
  /**
   * Payment intent ID from payment processor
   * Used to track the payment transaction
   */
  paymentIntentId: z.string().optional(),
  
  /**
   * Optional special requests or notes for the appointment
   * Maximum length is Fibonacci[13] = 233 characters,
   * maintaining harmony and proportion like the Golden Spiral
   */
  specialRequests: z.string()
    .max(FIBONACCI[13], `Special requests cannot exceed ${FIBONACCI[13]} characters`)
    .optional(),
  
  /**
   * Whether the user wants to receive reminders
   * Default is true - like the natural tendency toward golden ratio in nature
   */
  receiveReminders: z.boolean().optional().default(true),
  
  /**
   * Optional preferred reminder method
   * Three options form a balanced relationship like the PHI proportions
   */
  reminderMethod: z.enum(['email', 'sms', 'both']).optional(),
});

/**
 * Type definition for confirmation step data
 * Generated from the Zod schema
 */
export type ConfirmationStepData = z.infer<typeof confirmationStepSchema>;

/**
 * Default values for confirmation step form
 * Initial state before sacred proportions are applied
 */
export const confirmationStepDefaultValues: Partial<ConfirmationStepData> = {
  detailsConfirmed: undefined,
  paymentMethod: 'credit_card',
  cancellationPolicyAgreed: undefined,
  promoCode: '',
  paymentProcessed: false,
  specialRequests: '',
  receiveReminders: true,
  reminderMethod: 'email',
};

/**
 * Fibonacci-based timeout for validation
 * Uses Fibonacci sequence for natural-feeling timeouts
 * 
 * @param index The Fibonacci index to use for timeout calculation
 * @returns Timeout in milliseconds
 */
const getFibonacciTimeout = (index: number): number => {
  return getFibonacciByIndex(index) * (PHI * 10); // Scale by PHI for natural timing
};

/**
 * Validate confirmation step data
 * Returns validation result with success flag and either data or error messages
 * Uses sacred geometry principles for validation timing and error formatting
 * 
 * @param data The confirmation step data to validate
 */
export const validateConfirmationStep = (data: unknown) => {
  return new Promise((resolve) => {
    // Use Fibonacci timing for validation process
    setTimeout(() => {
      try {
        const validData = confirmationStepSchema.parse(data);
        resolve({
          success: true,
          data: validData,
          errors: null,
        });
      } catch (error) {
        if (error instanceof z.ZodError) {
          // Convert Zod errors to a more usable format
          // Use sacred geometry principles to structure the error object
          const formattedErrors = error.errors.reduce((acc, curr) => {
            const path = curr.path.length > 0 ? curr.path[0] as keyof ConfirmationStepData : 'form';
            acc[path] = curr.message;
            return acc;
          }, {} as Partial<Record<keyof ConfirmationStepData | 'form', string>>);
          
          resolve({
            success: false,
            data: null,
            errors: formattedErrors,
          });
        } else {
          // Handle unexpected errors
          resolve({
            success: false,
            data: null,
            errors: { 
              form: "An unexpected error occurred. Please try again.",
            },
          });
        }
      }
    }, getFibonacciTimeout(5)); // Use Fibonacci[5] = 5 * PHI*10 ms for validation timing
  });
};

/**
 * Field-specific validation for real-time feedback
 * Validates individual fields as the user interacts with the form
 * Uses PHI-based timing for a natural, harmonious validation experience
 * 
 * @param field The field name to validate
 * @param value The current value of the field
 * @returns Validation error message or null if valid
 */
export const validateField = (field: keyof ConfirmationStepData, value: unknown): Promise<string | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      try {
        // Special case handling for boolean literal fields
        if (field === 'detailsConfirmed' || field === 'cancellationPolicyAgreed') {
          if (value !== true) {
            const message = field === 'detailsConfirmed' 
              ? "You must confirm the booking details" 
              : "You must agree to the cancellation policy";
            resolve(message);
            return;
          }
          resolve(null);
          return;
        }

        // Create a test object with all default values
        const testObject = { ...confirmationStepDefaultValues } as Record<keyof ConfirmationStepData, unknown>;
        
        // Set the field we want to test
        testObject[field] = value;
        
        // Use the full schema but extract only errors for our field
        confirmationStepSchema.parse(testObject);
        resolve(null);
      } catch (error) {
        if (error instanceof z.ZodError) {
          // Find errors related to our field
          const fieldError = error.errors.find(err => {
            return err.path.length > 0 && err.path[0] === field;
          });
          
          resolve(fieldError?.message || null);
        } else {
          resolve(`Invalid ${field}`);
        }
      }
    }, ANIMATION_TIMING.quick * PHI_INVERSE); // Use PHI_INVERSE for a quick yet harmonious response
  });
}; 












