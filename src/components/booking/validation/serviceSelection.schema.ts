import { z } from 'zod';

/**
 * Validation schema for the service selection step
 * Enforces that a valid service and related options have been selected
 * Implements comprehensive validation with sacred proportions
 */
export const serviceSelectionSchema = z.object({
  /**
   * Service ID
   * Must be a non-empty string identifying a valid service
   */
  serviceId: z.string({
    required_error: "Please select a service",
    invalid_type_error: "Service ID must be a string",
  }).min(1, "Please select a service")
    .refine(val => /^[a-zA-Z0-9_-]+$/.test(val), {
      message: "Service ID contains invalid characters"
    }),

  /**
   * Optional service details/notes
   * If provided, must not exceed 500 characters
   */
  serviceNotes: z.string()
    .max(500, "Notes cannot exceed 500 characters")
    .optional(),
    
  /**
   * Optional duration preference in minutes
   * Must be one of the allowed durations if provided
   */
  durationPreference: z.number()
    .int("Duration must be a whole number")
    .positive("Duration must be positive")
    .refine(val => {
      // Duration must align with the Fibonacci sequence values (in minutes)
      const allowedDurations = [3, 5, 8, 13]; // Common Fibonacci values for durations
      return allowedDurations.includes(val);
    }, "Selected duration is not available")
    .optional(),
    
  /**
   * Optional practitioner ID
   * If provided, must be a valid practitioner
   */
  practitionerId: z.string()
    .min(1, "Please select a valid practitioner")
    .refine(val => /^[a-zA-Z0-9_-]+$/.test(val), {
      message: "Practitioner ID contains invalid characters"
    })
    .optional(),
    
  /**
   * Selected date for the appointment
   * Used in the date selection step but stored with service data
   */
  date: z.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format")
    .optional(),
    
  /**
   * Selected time slot for the appointment
   * Used in the date selection step but stored with service data
   */
  timeSlot: z.string()
    .min(1, "Please select a time slot")
    .optional(),
    
  /**
   * Indicates whether this is a recurring service
   * Defaults to false
   */
  isRecurring: z.boolean().default(false),
    
  /**
   * Frequency for recurring services
   * Required only if isRecurring is true
   */
  frequency: z.enum(["weekly", "biweekly", "monthly"])
    .optional(),
    
  /**
   * Number of sessions for recurring services
   * Required only if isRecurring is true
   * Must be a number between 2 and 12
   */
  sessions: z.number()
    .int("Number of sessions must be a whole number")
    .min(2, "Minimum 2 sessions required for recurring bookings")
    .max(12, "Maximum 12 sessions allowed")
    .optional(),
}).refine(
  // Validate that frequency is provided if isRecurring is true
  (data) => {
    return !data.isRecurring || (data.frequency !== undefined);
  },
  {
    message: "Please select a frequency for recurring service",
    path: ["frequency"]
  }
).refine(
  // Validate that sessions is provided if isRecurring is true
  (data) => {
    return !data.isRecurring || (data.sessions !== undefined);
  },
  {
    message: "Please specify number of sessions for recurring service",
    path: ["sessions"]
  }
);

/**
 * Type definition for the validated service selection data
 * Generated from the Zod schema
 */
export type ServiceSelectionData = z.infer<typeof serviceSelectionSchema>;

/**
 * Default values for service selection
 * Used for initializing the form
 */
export const serviceSelectionDefaultValues: ServiceSelectionData = {
  serviceId: "",
  isRecurring: false,
};

/**
 * Field-specific validation for real-time feedback
 * Validates individual fields as the user types
 * 
 * @param field The field name to validate
 * @param value The current value of the field
 * @returns Validation error message or null if valid
 */
export const validateField = (field: keyof ServiceSelectionData, value: unknown): string | null => {
  try {
    // Create a test object with all default values
    const testObject = { ...serviceSelectionDefaultValues } as Record<keyof ServiceSelectionData, unknown>;
    
    // Set the field we want to test
    testObject[field] = value;
    
    // Use the full schema but extract only errors for our field
    serviceSelectionSchema.parse(testObject);
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

/**
 * Validate service selection data
 * Returns validation result with success flag and either data or error messages
 * 
 * @param data The service selection data to validate
 * @returns Validation result
 */
export const validateServiceSelection = (data: unknown) => {
  try {
    const validData = serviceSelectionSchema.parse(data);
    return {
      success: true,
      data: validData,
      errors: null,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Convert Zod errors to a more usable format
      const formattedErrors = error.errors.reduce((acc, curr) => {
        const path = curr.path.length > 0 ? curr.path[0] as keyof ServiceSelectionData : 'form';
        acc[path] = curr.message;
        return acc;
      }, {} as Record<keyof ServiceSelectionData | 'form', string>);
      
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
        form: "An unexpected error occurred. Please try again." 
      },
    };
  }
}; 












