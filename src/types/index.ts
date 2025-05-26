/**
 * Type Definitions
 * 
 * This file exports all types used throughout the application
 */

// Export common types
export * from './general.types';

// Import API types with renamed schemas
import {
  // Enums (these should be regular exports)
  HttpStatusCode, ApiErrorCode, BookingStatus, ServiceType, Specialization,
  
  // Value exports
  ApiError, isApiErrorResponse, isApiSuccessResponse, isPaginatedResponse,
  clientInfoSchema as apiClientInfoSchema,
  
  // Type-only exports
  type ApiResponse, type ApiErrorResponse, type ApiRequestOptions, 
  type PaginationParams, type PaginatedResponse, type CreateBookingRequest, 
  type BookingResponse, type AvailableSlotsRequest, type TimeSlot, 
  type NewsletterSubscriptionRequest, type NewsletterSubscriptionResponse, 
  type ContactFormRequest, type ContactFormResponse, type Testimonial, 
  type TestimonialRequestParams, type TeamMember, type ClientInfo
} from './api.types';

// Import booking types with renamed schema
import {
  // Enums (these should be regular exports)
  BookingStepId, BookingActionType,
  
  // Value exports
  serviceSelectionSchema, dateSelectionSchema, confirmationSchema,
  clientInfoSchema as bookingClientInfoSchema,
  isStepComplete, canProceedToNextStep,
  
  // Type-only exports
  type BookingTimeSlot, type BookingDate, type ServiceOption,
  type ClientInformation, type BookingFormState, type BookingStepMeta,
  type BookingAction, type ServiceSelectionFormData, type DateSelectionFormData, 
  type ClientInfoFormData, type ConfirmationFormData, type CompleteBookingData,
  type BookingInterfaceProps, type BookingControlsProps, type ProgressIndicatorProps,
  type BookingStepProps
} from './booking.types';

// Re-export all imports
// Regular value exports
export {
  // API enums and values
  HttpStatusCode, ApiErrorCode, BookingStatus, ServiceType, Specialization,
  ApiError, isApiErrorResponse, isApiSuccessResponse, isPaginatedResponse,
  apiClientInfoSchema,
  
  // Booking enums and values
  BookingStepId, BookingActionType,
  serviceSelectionSchema, dateSelectionSchema, confirmationSchema,
  bookingClientInfoSchema,
  isStepComplete, canProceedToNextStep
};

// Type-only exports using the 'export type' syntax
export type {
  // API types
  ApiResponse, ApiErrorResponse, ApiRequestOptions, PaginationParams, 
  PaginatedResponse, CreateBookingRequest, BookingResponse, AvailableSlotsRequest, 
  TimeSlot, NewsletterSubscriptionRequest, NewsletterSubscriptionResponse, 
  ContactFormRequest, ContactFormResponse, Testimonial, TestimonialRequestParams, 
  TeamMember, ClientInfo,
  
  // Booking types
  BookingTimeSlot, BookingDate, ServiceOption, ClientInformation, BookingFormState, 
  BookingStepMeta, BookingAction, ServiceSelectionFormData, DateSelectionFormData, 
  ClientInfoFormData, ConfirmationFormData, CompleteBookingData, BookingInterfaceProps, 
  BookingControlsProps, ProgressIndicatorProps, BookingStepProps
};

// Additional type exports will be added as they are implemented
// export * from './booking.types'; 





