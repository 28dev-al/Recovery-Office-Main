import { z } from 'zod';



/**
 * Address information schema
 * Validates client address data
 */
const addressInfoSchema = z.object({
  street: z.string().min(3, "Street address must be at least 3 characters").max(100, "Street address cannot exceed 100 characters"),
  city: z.string().min(2, "City name must be at least 2 characters").max(50, "City name cannot exceed 50 characters"),
  state: z.string().min(2, "State/Province must be at least 2 characters").max(50, "State/Province cannot exceed 50 characters"),
  postalCode: z.string().min(3, "Postal code must be at least 3 characters").max(20, "Postal code cannot exceed 20 characters"),
  country: z.string().min(2, "Country must be at least 2 characters").max(50, "Country cannot exceed 50 characters")
});

/**
 * Emergency contact schema
 * Validates emergency contact information
 */
const emergencyContactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name cannot exceed 100 characters"),
  phone: z.string()
    .regex(
      /^(\+\d{1,3})?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
      "Please enter a valid phone number (e.g., +1 555-123-4567 or (555) 123-4567)"
    ),
  relationship: z.string().min(2, "Relationship must be at least 2 characters").max(50, "Relationship cannot exceed 50 characters")
}).optional();

/**
 * Validation schema for client information in the booking process
 * Uses Zod schema validation with sacred proportions
 */
export const clientInformationSchema = z.object({
  /**
   * First name
   * Must be a non-empty string with reasonable length and character constraints
   */
  firstName: z.string({
    required_error: "First name is required",
    invalid_type_error: "First name must be a string",
  }).min(2, "First name must be at least 2 characters")
    .max(50, "First name cannot exceed 50 characters")
    .regex(/^[a-zA-Z\s-']+$/, "First name can only contain letters, spaces, hyphens, and apostrophes")
    .transform(val => val.trim()),
  
  /**
   * Last name
   * Must be a non-empty string with reasonable length and character constraints
   */
  lastName: z.string({
    required_error: "Last name is required",
    invalid_type_error: "Last name must be a string",
  }).min(2, "Last name must be at least 2 characters")
    .max(50, "Last name cannot exceed 50 characters")
    .regex(/^[a-zA-Z\s-']+$/, "Last name can only contain letters, spaces, hyphens, and apostrophes")
    .transform(val => val.trim()),
  
  /**
   * Email address
   * Must be a valid email format
   */
  email: z.string({
    required_error: "Email is required",
    invalid_type_error: "Email must be a string",
  }).min(5, "Email must be at least 5 characters")
    .max(100, "Email cannot exceed 100 characters")
    .email("Please enter a valid email address")
    .transform(val => val.trim().toLowerCase()),
  
  /**
   * Phone number
   * Must follow a valid phone number format
   */
  phone: z.string({
    required_error: "Phone number is required",
    invalid_type_error: "Phone number must be a string",
  }).min(10, "Phone number must be at least 10 digits")
    .regex(
      /^(\+\d{1,3})?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
      "Please enter a valid phone number (e.g., +1 555-123-4567 or (555) 123-4567)"
    )
    .transform(val => val.replace(/\s+/g, ' ').trim()),
  
  /**
   * Preferred contact method
   * Must be one of the allowed values
   */
  preferredContactMethod: z.enum(["email", "phone", "text"], {
    required_error: "Please select a preferred contact method",
    invalid_type_error: "Invalid contact method selected",
  }),
  
  /**
   * Whether the client has visited before
   * Must be a boolean value
   */
  isReturningClient: z.boolean({
    required_error: "Please indicate if you have visited us before",
    invalid_type_error: "This field must be a boolean",
  }),
  
  /**
   * Financial recovery specific fields
   */
  
  /**
   * Type of financial fraud or loss experienced
   * Selection from predefined fraud categories
   */
  fraudType: z.enum([
    "investment_fraud", 
    "bank_fraud", 
    "credit_card_fraud", 
    "identity_theft", 
    "pension_scam", 
    "mortgage_fraud", 
    "insurance_fraud", 
    "tax_fraud", 
    "other"
  ], {
    required_error: "Please select the type of financial loss",
    invalid_type_error: "Invalid fraud type selected",
  }),
  
  /**
   * Case description - details about the financial loss
   * Must contain sufficient information to process the claim
   */
  caseDescription: z.string({
    required_error: "Please describe your financial recovery case",
    invalid_type_error: "Case description must be text",
  }).min(10, "Please provide at least 10 characters describing your case")
    .max(500, "Case description cannot exceed 500 characters"),
  
  /**
   * Approximate amount lost in the financial incident
   */
  approximateLossAmount: z.string({
    required_error: "Please provide an approximate loss amount",
    invalid_type_error: "Loss amount must be a value",
  }).min(1, "Please enter an approximate loss amount"),
  
  /**
   * Date when the financial incident occurred
   * Optional but helpful for case assessment
   */
  incidentDate: z.string().optional(),
  
  /**
   * Financial institution involved in the incident
   * Optional but helpful for case assessment
   */
  financialInstitution: z.string().max(100, "Financial institution name cannot exceed 100 characters").optional(),
  
  /**
   * Whether the incident has been reported to authorities
   * Important for claim processing
   */
  hasReportedToAuthorities: z.boolean().optional(),
  
  /**
   * How the client heard about us
   * Optional selection from predefined options
   */
  referralSource: z.enum([
    "google_search", 
    "social_media", 
    "friend_referral", 
    "doctor_referral", 
    "advertisement", 
    "other"
  ], {
    invalid_type_error: "Invalid referral source selected",
  }).optional(),
  
  /**
   * Additional details for the referral source
   * Optional text field, required if referral source is "other"
   */
  referralDetails: z.string()
    .max(200, "Referral details cannot exceed 200 characters")
    .optional(),
  
  /**
   * Additional notes or health information
   * Optional text field for any health concerns or special requests
   */
  additionalNotes: z.string()
    .max(500, "Additional notes cannot exceed 500 characters")
    .optional(),
  
  /**
   * Acceptance of privacy policy
   * Must be true to proceed
   */
  privacyPolicyAccepted: z.literal(true, {
    errorMap: () => ({ message: "You must accept the privacy policy" })
  }),
}).refine(
  // If referral source is "other", referral details must be provided
  (data) => {
    return data.referralSource !== "other" || 
           (data.referralDetails && data.referralDetails.trim().length > 0);
  },
  {
    message: "Please provide details about how you heard about us",
    path: ["referralDetails"]
  }
).refine(
  // If preferred contact method is phone or text, phone number must be provided
  (data) => {
    return data.preferredContactMethod === "email" || 
           (data.phone && data.phone.trim().length > 0);
  },
  {
    message: "Phone number is required for phone or text contact methods",
    path: ["phone"]
  }
).refine(
  // If preferred contact method is email, email must be provided
  (data) => {
    return data.preferredContactMethod !== "email" || 
           (data.email && data.email.trim().length > 0);
  },
  {
    message: "Email is required when Email is selected as preferred contact method",
    path: ["email"]
  }
);

/**
 * Type definition for client information data
 * Generated from the Zod schema
 */
export type ClientInformationData = z.infer<typeof clientInformationSchema>;

/**
 * Default values for client information form
 */
export const clientInformationDefaultValues: Partial<ClientInformationData> = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  preferredContactMethod: "email",
  isReturningClient: false,
  // Financial recovery specific defaults
  fraudType: "investment_fraud",
  caseDescription: "",
  approximateLossAmount: "",
  incidentDate: "",
  financialInstitution: "",
  hasReportedToAuthorities: false,
  // Other fields
  referralSource: undefined,
  referralDetails: "",
  additionalNotes: "",
  privacyPolicyAccepted: undefined,
};

/**
 * Validate client information data
 * Returns validation result with success flag and either data or error messages
 * 
 * @param data The client information data to validate
 */
export const validateClientInformation = (data: unknown) => {
  try {
    const validData = clientInformationSchema.parse(data);
    return {
      success: true,
      data: validData,
      errors: null,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Convert Zod errors to a more usable format
      const formattedErrors = error.errors.reduce((acc, curr) => {
        const path = curr.path.length > 0 ? curr.path[0] as keyof ClientInformationData : 'form';
        acc[path] = curr.message;
        return acc;
      }, {} as Partial<Record<keyof ClientInformationData | 'form', string>>);
      
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
export const validateField = (field: keyof ClientInformationData, value: any): string | null => {
  try {
    // Special case handling for boolean literal fields
    if (field === 'privacyPolicyAccepted') {
      if (value !== true) {
        return "You must accept the privacy policy";
      }
      return null;
    }

    // Create a test object with all default values
    const testObject = { ...clientInformationDefaultValues } as any;
    
    // Set the field we want to test
    testObject[field] = value;
    
    // Use the full schema but extract only errors for our field
    clientInformationSchema.parse(testObject);
    return null;
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Find errors related to our field
      const fieldError = error.errors.find(err => {
        return err.path.length > 0 && err.path[0] === field;
      });
      
      return fieldError?.message || null;
    }
    return null;
  }
}; 













