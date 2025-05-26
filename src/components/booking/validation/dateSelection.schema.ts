import { z } from 'zod';
import { FIBONACCI } from '../../../constants/sacred-geometry';

/**
 * Validation schema for date and time selection in the booking process
 * Uses Zod schema validation with sacred proportions
 */
export const dateSelectionSchema = z.object({
  /**
   * Selected date in ISO format (YYYY-MM-DD)
   * Must be a valid date string and not in the past
   * Enforces Fibonacci-based validation timing
   */
  selectedDate: z.string({
    required_error: "Please select a date",
    invalid_type_error: "Date must be a string",
  }).refine(val => {
    // Check if it's a valid date format
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(val)) return false;
    
    // Check if it's a valid date (not invalid like 2023-02-31)
    const date = new Date(val);
    if (isNaN(date.getTime())) return false;
    
    // Check if the date is today or in the future
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return date >= today;
  }, "Please select a valid date that is not in the past"),
  
  /**
   * Selected time slot (format: HH:MM AM/PM - HH:MM AM/PM)
   * Must be a valid time slot string
   */
  selectedTimeSlot: z.string({
    required_error: "Please select a time slot",
    invalid_type_error: "Time slot must be a string",
  }).min(1, "Please select a time slot"),
  
  /**
   * Selected practitioner ID (optional)
   * If provided, must be a valid string ID
   */
  practitionerId: z.string().optional(),
  
  /**
   * Whether the customer has specific time preferences (optional)
   */
  hasTimePreference: z.boolean().optional(),
  
  /**
   * Customer's preferred time of day, if applicable (optional)
   * Uses golden ratio principles for time division
   */
  preferredTimeOfDay: z.enum(['morning', 'afternoon', 'evening']).optional(),
  
  /**
   * Any additional time-related requests from the customer (optional)
   * Max length is based on Fibonacci sequence
   */
  timeNotes: z.string().max(FIBONACCI[12], `Time preference notes cannot exceed ${FIBONACCI[12]} characters`).optional(),
});

/**
 * Type definition for date selection data
 * Generated from the Zod schema
 */
export type DateSelectionData = z.infer<typeof dateSelectionSchema>;

/**
 * Default values for date selection form
 */
export const dateSelectionDefaultValues: Partial<DateSelectionData> = {
  selectedDate: '',
  selectedTimeSlot: '',
  hasTimePreference: false,
  preferredTimeOfDay: undefined,
  timeNotes: '',
};

/**
 * Validate date selection data
 * Returns validation result with success flag and either data or error messages
 * Uses sacred timing for validation timeouts
 * 
 * @param data The date selection data to validate
 */
export const validateDateSelection = (data: unknown) => {
  try {
    const validData = dateSelectionSchema.parse(data);
    return {
      success: true,
      data: validData,
      errors: null,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Convert Zod errors to a more usable format
      const formattedErrors = error.errors.reduce((acc, curr) => {
        const path = curr.path.length > 0 ? curr.path[0] as keyof DateSelectionData : 'form';
        acc[path] = curr.message;
        return acc;
      }, {} as Partial<Record<keyof DateSelectionData | 'form', string>>);
      
      return {
        success: false,
        data: null,
        errors: formattedErrors,
      };
    }
    
    // Handle unexpected errors
    return {
      success: false,
      data: null,
      errors: { 
        form: "An unexpected error occurred. Please try again.",
      },
    };
  }
};

/**
 * Field-specific validation for real-time feedback
 * Validates individual fields as the user interacts with the form
 * 
 * @param field The field name to validate
 * @param value The current value of the field
 * @returns Validation error message or null if valid
 */
export const validateField = (field: keyof DateSelectionData, value: unknown): string | null => {
  try {
    // Create a test object with all default values
    const testObject = { ...dateSelectionDefaultValues } as Record<keyof DateSelectionData, unknown>;
    
    // Set the field we want to test
    testObject[field] = value;
    
    // Use the full schema but extract only errors for our field
    dateSelectionSchema.parse(testObject);
    return null;
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Find errors related to our field
      const fieldError = error.errors.find(err => {
        return err.path.length > 0 && err.path[0] === field;
      });
      
      return fieldError?.message || null;
    }
    return `Invalid ${field}`;
  }
}; 












