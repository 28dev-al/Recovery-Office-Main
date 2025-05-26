/**
 * Booking Type Definitions
 * 
 * This file contains TypeScript interfaces and types for the booking system.
 * It provides strong typing for booking form fields, state management,
 * and validation schemas based on sacred geometry principles.
 */

import { z } from 'zod';
import { getFibonacciByIndex } from '../utils/getFibonacciByIndex';
import { BookingStatus } from './api.types';
import { ServiceType } from './service.types'; // Import from single source of truth

// ======================================================================
// Base Booking Types
// ======================================================================

/**
 * Booking Step IDs
 * Follows a natural progression aligned with the Fibonacci sequence for flow
 */
export enum BookingStepId {
  SERVICE_SELECTION = 0,
  DATE_SELECTION = 1,
  CLIENT_INFORMATION = 2,
  CONFIRMATION = 3,
  SUCCESS = 4
}

/**
 * Booking Time Slot
 */
export interface BookingTimeSlot {
  id: string;
  startTime: string;  // ISO date string
  endTime: string;    // ISO date string
  duration: number;   // in minutes
  available: boolean;
}

/**
 * Booking Date
 */
export interface BookingDate {
  date: string;       // YYYY-MM-DD format
  dayOfWeek: number;  // 0-6, where 0 is Sunday
  available: boolean;
  slots: BookingTimeSlot[];
}

/**
 * Service Option
 */
export interface ServiceOption {
  id: string;
  _id?: string;
  mongoObjectId?: string;
  name: string;
  description: string;
  duration: number;
  price: number;
  formattedPrice?: string;
  formattedDuration?: string;
  icon?: string;
  image?: string;
  category?: string;
  type: ServiceType; // Use unified ServiceType from service.types.ts
  isActive?: boolean;
  isValidObjectId?: boolean;
  isDevelopmentFallback?: boolean;

  // Additional properties that might be used
  availableForNewClients?: boolean;
  slug?: string;
  createdAt?: string;
  updatedAt?: string;

  // Debug info
  debugInfo?: {
    originalId?: string;
    mongoId?: string;
    processedAt?: string;
    fallbackUsed?: boolean;
    fallbackService?: boolean;
  };
}

/**
 * Client Information
 */
export interface ClientInformation {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth?: string;
  preferredContactMethod: 'email' | 'phone' | 'text';
  isNewClient: boolean;
  additionalNotes?: string;
  notes?: string;
  contactPreference?: string;
  // Financial recovery specific fields
  caseDescription?: string;
  approximateLossAmount?: string;
  incidentDate?: string;
  financialInstitution?: string;
  fraudType?: 'investment_fraud' | 'bank_fraud' | 'credit_card_fraud' | 'identity_theft' | 'pension_scam' | 'mortgage_fraud' | 'insurance_fraud' | 'tax_fraud' | 'other';
  hasReportedToAuthorities?: boolean;
}

// ======================================================================
// Booking Component Props Interfaces
// ======================================================================

/**
 * Common interface for all booking step components
 * Follows sacred geometry principles for consistent component structures
 */
export interface BookingStepComponentProps {
  /**
   * Called when the step is completed and ready to move to the next step
   * @param data The step-specific data collected
   */
  onComplete?: <T>(data: T) => void;
  
  /**
   * Alternative to onComplete for simpler implementation
   */
  onNext?: () => void;
  
  /**
   * Called when the user wants to navigate back to the previous step
   */
  onBack?: () => void;
  
  /**
   * If the step is currently in a loading state (e.g., API operations)
   */
  isLoading?: boolean;
  
  /**
   * Optional className for styling
   */
  className?: string;
  
  /**
   * Optional initial data for the step
   */
  initialData?: unknown;
}

/**
 * Service Selection Step Props
 * Props specific to service selection step
 */
export interface ServiceSelectionStepProps extends BookingStepComponentProps {
  /**
   * Initial service selection (if coming back to edit)
   */
  initialData?: {
    selectedService?: ServiceOption;
  };
}

/**
 * Date Selection Step Props
 * Props specific to date and time selection step
 */
export interface DateSelectionStepProps extends BookingStepComponentProps {
  /**
   * Initial date selection (if coming back to edit)
   */
  initialData?: {
    selectedDate?: string;
    selectedTimeSlot?: BookingTimeSlot;
  };
  
  /**
   * Selected service (required to fetch available dates)
   */
  selectedService: ServiceOption;
}

/**
 * Client Information Step Props
 * Props specific to client information collection step
 */
export interface ClientInformationStepProps extends BookingStepComponentProps {
  /**
   * Initial client information (if coming back to edit)
   */
  initialData?: {
    clientInfo?: ClientInformation;
  };
}

/**
 * Confirmation Step Props
 * Props specific to booking confirmation step
 */
export interface ConfirmationStepProps extends BookingStepComponentProps {
  /**
   * Complete booking data to confirm
   */
  bookingData: {
    service: ServiceOption;
    date: string;
    timeSlot: BookingTimeSlot;
    clientInfo: ClientInformation;
  };
}

// ======================================================================
// Booking State Types
// ======================================================================

/**
 * Booking Form State
 * Contains the complete state of the booking process
 */
export interface BookingFormState {
  currentStep: BookingStepId;
  selectedService?: ServiceOption;
  selectedDate?: string;
  selectedTimeSlot?: BookingTimeSlot;
  clientInfo?: ClientInformation;
  loading: boolean;
  error?: string;
  availableDates: BookingDate[];
  completedSteps: Set<BookingStepId>;
  bookingReference?: string;
}

/**
 * Booking Step Metadata
 * Contains information about each step in the booking process
 */
export interface BookingStepMeta {
  id: BookingStepId;
  title: string;
  subtitle?: string;
  order: number;
  isOptional: boolean;
}

/**
 * All booking steps with their metadata
 */
export const BOOKING_STEPS: Record<BookingStepId, BookingStepMeta> = {
  [BookingStepId.SERVICE_SELECTION]: {
    id: BookingStepId.SERVICE_SELECTION,
    title: 'Select Service',
    subtitle: 'Choose the service you need',
    order: getFibonacciByIndex(3), // 2
    isOptional: false,
  },
  [BookingStepId.DATE_SELECTION]: {
    id: BookingStepId.DATE_SELECTION,
    title: 'Select Date & Time',
    subtitle: 'Choose when you want to book',
    order: getFibonacciByIndex(5), // 5
    isOptional: false,
  },
  [BookingStepId.CLIENT_INFORMATION]: {
    id: BookingStepId.CLIENT_INFORMATION,
    title: 'Your Information',
    subtitle: 'Tell us about yourself',
    order: getFibonacciByIndex(8), // 13
    isOptional: false,
  },
  [BookingStepId.CONFIRMATION]: {
    id: BookingStepId.CONFIRMATION,
    title: 'Confirm Booking',
    subtitle: 'Review and confirm your appointment',
    order: getFibonacciByIndex(13), // 21
    isOptional: false,
  },
  [BookingStepId.SUCCESS]: {
    id: BookingStepId.SUCCESS,
    title: 'Booking Complete',
    subtitle: 'Your appointment has been scheduled',
    order: getFibonacciByIndex(21), // 34
    isOptional: false,
  },
};

// ======================================================================
// Booking Action Types
// ======================================================================

/**
 * Booking Action Types
 */
export enum BookingActionType {
  SET_STEP = 'SET_STEP',
  SELECT_SERVICE = 'SELECT_SERVICE',
  SELECT_DATE = 'SELECT_DATE',
  SELECT_TIME_SLOT = 'SELECT_TIME_SLOT',
  SET_CLIENT_INFO = 'SET_CLIENT_INFO',
  SET_AVAILABLE_DATES = 'SET_AVAILABLE_DATES',
  SET_LOADING = 'SET_LOADING',
  SET_ERROR = 'SET_ERROR',
  CLEAR_ERROR = 'CLEAR_ERROR',
  COMPLETE_STEP = 'COMPLETE_STEP',
  SET_BOOKING_REFERENCE = 'SET_BOOKING_REFERENCE',
  RESET_FORM = 'RESET_FORM',
}

/**
 * Discriminated union for booking actions
 */
export type BookingAction =
  | { type: BookingActionType.SET_STEP; payload: BookingStepId }
  | { type: BookingActionType.SELECT_SERVICE; payload: ServiceOption }
  | { type: BookingActionType.SELECT_DATE; payload: string }
  | { type: BookingActionType.SELECT_TIME_SLOT; payload: BookingTimeSlot }
  | { type: BookingActionType.SET_CLIENT_INFO; payload: ClientInformation }
  | { type: BookingActionType.SET_AVAILABLE_DATES; payload: BookingDate[] }
  | { type: BookingActionType.SET_LOADING; payload: boolean }
  | { type: BookingActionType.SET_ERROR; payload: string }
  | { type: BookingActionType.CLEAR_ERROR }
  | { type: BookingActionType.COMPLETE_STEP; payload: BookingStepId }
  | { type: BookingActionType.SET_BOOKING_REFERENCE; payload: string }
  | { type: BookingActionType.RESET_FORM };

/**
 * All possible actions that can be dispatched to the booking reducer
 */
export type ExtendedBookingAction =
  | { type: 'SET_STEP'; payload: BookingStepId }
  | { type: 'UPDATE_FORM_DATA'; payload: Partial<BookingFormData> }
  | { type: 'RESET_FORM' }
  // Services loading states
  | { type: 'LOAD_SERVICES_START' }
  | { type: 'LOAD_SERVICES_SUCCESS'; payload: Service[] }
  | { type: 'LOAD_SERVICES_ERROR'; payload: string }
  // Available dates loading states
  | { type: 'LOAD_AVAILABLE_DATES_START' }
  | { type: 'LOAD_AVAILABLE_DATES_SUCCESS'; payload: AvailableDate[] }
  | { type: 'LOAD_AVAILABLE_DATES_ERROR'; payload: string }
  // Available time slots loading states
  | { type: 'LOAD_AVAILABLE_TIME_SLOTS_START' }
  | { type: 'LOAD_AVAILABLE_TIME_SLOTS_SUCCESS'; payload: AvailableTimeSlot[] }
  | { type: 'LOAD_AVAILABLE_TIME_SLOTS_ERROR'; payload: string }
  // Payment intent states
  | { type: 'CREATE_PAYMENT_INTENT_START' }
  | { type: 'CREATE_PAYMENT_INTENT_SUCCESS'; payload: { paymentIntentId: string } }
  | { type: 'CREATE_PAYMENT_INTENT_ERROR'; payload: string }
  // Booking submission states
  | { type: 'SUBMIT_BOOKING_START' }
  | { type: 'SUBMIT_BOOKING_SUCCESS'; payload: BookingResponse }
  | { type: 'SUBMIT_BOOKING_ERROR'; payload: string }
  // Booking cancellation states
  | { type: 'CANCEL_BOOKING_START' }
  | { type: 'CANCEL_BOOKING_SUCCESS' }
  | { type: 'CANCEL_BOOKING_ERROR'; payload: string }
  // Booking reschedule states
  | { type: 'RESCHEDULE_BOOKING_START' }
  | { type: 'RESCHEDULE_BOOKING_SUCCESS'; payload: BookingResponse }
  | { type: 'RESCHEDULE_BOOKING_ERROR'; payload: string };

// ======================================================================
// Booking Validation Schemas (Zod)
// ======================================================================

/**
 * Service Selection Validation Schema
 */
export const serviceSelectionSchema = z.object({
  serviceId: z.string({
    required_error: 'Please select a service',
  }),
});

export type ServiceSelectionFormData = z.infer<typeof serviceSelectionSchema>;

/**
 * Date Selection Validation Schema
 */
export const dateSelectionSchema = z.object({
  date: z.string({
    required_error: 'Please select a date',
  }).regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'),
  
  timeSlotId: z.string({
    required_error: 'Please select a time slot',
  }),
});

export type DateSelectionFormData = z.infer<typeof dateSelectionSchema>;

/**
 * Client Information Validation Schema
 */
export const clientInfoSchema = z.object({
  firstName: z.string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name cannot exceed 50 characters'),
  
  lastName: z.string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name cannot exceed 50 characters'),
  
  email: z.string()
    .email('Please enter a valid email address'),
  
  phone: z.string()
    .min(10, 'Phone number must be at least 10 digits')
    .max(15, 'Phone number cannot exceed 15 digits'),
  
  dateOfBirth: z.string().optional(),
  
  preferredContactMethod: z.enum(['email', 'phone', 'text'], {
    required_error: 'Please select a preferred contact method',
  }),
  
  isNewClient: z.boolean(),
  
  additionalNotes: z.string().max(500, 'Notes cannot exceed 500 characters').optional(),
  
  privacyConsent: z.literal(true, {
    errorMap: () => ({ message: 'You must consent to our privacy policy' }),
  }),
});

export type ClientInfoFormData = z.infer<typeof clientInfoSchema>;

/**
 * Confirmation Validation Schema
 */
export const confirmationSchema = z.object({
  termsAccepted: z.literal(true, {
    errorMap: () => ({ message: 'You must accept the terms and conditions' }),
  }),
});

export type ConfirmationFormData = z.infer<typeof confirmationSchema>;

/**
 * Complete Booking Data - all data needed to create a booking
 */
export interface CompleteBookingData {
  service: ServiceOption;
  date: string;
  timeSlot: BookingTimeSlot;
  clientInfo: ClientInformation;
}

// ======================================================================
// Booking Component Props
// ======================================================================

/**
 * Booking Interface Props
 */
export interface BookingInterfaceProps {
  initialStep?: BookingStepId;
  onComplete?: (bookingData: CompleteBookingData) => void;
  onCancel?: () => void;
  className?: string;
}

/**
 * Booking Controls Props
 */
export interface BookingControlsProps {
  onNext?: () => void;
  onBack?: () => void;
  onCancel?: () => void;
  nextLabel?: string;
  backLabel?: string;
  cancelLabel?: string;
  isNextDisabled?: boolean;
  isBackDisabled?: boolean;
  isLoading?: boolean;
  className?: string;
}

/**
 * Progress Indicator Props
 */
export interface ProgressIndicatorProps {
  steps: BookingStepMeta[];
  currentStep: BookingStepId;
  completedSteps: Set<BookingStepId>;
  className?: string;
}

/**
 * Booking Step Component Props - Base interface for all step components
 */
export interface BookingStepProps {
  onComplete: (stepData: unknown) => void;
  onBack: () => void;
  isLoading: boolean;
  className?: string;
}

// Type guard to check if a booking step is complete
export const isStepComplete = (
  state: BookingFormState,
  step: BookingStepId
): boolean => {
  return state.completedSteps.has(step);
};

// Type guard to check if a booking can proceed to the next step
export const canProceedToNextStep = (
  state: BookingFormState,
  currentStep: BookingStepId
): boolean => {
  switch (currentStep) {
    case BookingStepId.SERVICE_SELECTION:
      return !!state.selectedService;
    case BookingStepId.DATE_SELECTION:
      return !!state.selectedDate && !!state.selectedTimeSlot;
    case BookingStepId.CLIENT_INFORMATION:
      return !!state.clientInfo;
    case BookingStepId.CONFIRMATION:
      return true;
    case BookingStepId.SUCCESS:
      return true;
    default:
      return false;
  }
};

/**
 * Service interface
 * Describes a service offered by the recovery office
 */
export interface Service {
  id: string;
  type: ServiceType;
  name: string;
  description: string;
  duration: number; // in minutes
  price: number;
  imageUrl?: string;
  practitioners: Practitioner[];
}

/**
 * Practitioner interface
 * Describes a practitioner who provides services
 */
export interface Practitioner {
  id: string;
  name: string;
  title: string;
  specialties: ServiceType[];
  bio: string;
  imageUrl?: string;
}

/**
 * AvailableDate interface
 * Represents a date that is available for booking
 */
export interface AvailableDate {
  date: string; // ISO string
  hasAvailability: boolean;
}

/**
 * AvailableDateResponse interface
 * Response for available dates query
 */
export interface AvailableDateResponse {
  dates: AvailableDate[];
  firstAvailableDate: string | null;
}

/**
 * AvailableTimeSlot interface
 * Represents a time slot that is available for booking
 */
export interface AvailableTimeSlot {
  startTime: string; // ISO string
  endTime: string; // ISO string
  practitionerId?: string;
  isAvailable: boolean;
}

/**
 * AddressInfo interface
 * Client address information
 */
export interface AddressInfo {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

/**
 * EmergencyContact interface
 * Client emergency contact information
 */
export interface EmergencyContact {
  name: string;
  phone: string;
  relationship: string;
}

/**
 * ClientInfo interface
 * Complete client information for booking
 */
export interface ClientInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: AddressInfo;
  healthInformation?: string;
  emergencyContact?: EmergencyContact;
  specialRequests?: string;
  marketingOptIn: boolean;
}

/**
 * BookingFormData interface
 * Complete form data for the booking process
 */
export interface BookingFormData {
  // Service Selection Step
  serviceId: string;
  practitionerId?: string;
  
  // Date Selection Step
  date: string;
  timeSlot: string;
  
  // Client Information Step
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: AddressInfo;
  healthInformation?: string;
  emergencyContact?: EmergencyContact;
  specialRequests?: string;
  
  // Confirmation Step
  termsAccepted: boolean;
  cancellationPolicyAccepted: boolean;
  paymentMethod: string;
  paymentIntentId: string;
  marketingOptIn: boolean;
}

/**
 * BookingRequest interface
 * The data sent to the API to create a booking
 */
export interface BookingRequest {
  serviceId: string;
  practitionerId?: string;
  date: string;
  timeSlot: string;
  client: ClientInfo;
  paymentIntentId: string;
  paymentMethod: string;
}

/**
 * BookingResponse interface
 * The data returned from the API after creating a booking
 */
export interface BookingResponse {
  id: string;
  status: BookingStatus;
  service: Service;
  practitioner?: Practitioner;
  startTime: string; // ISO string
  endTime: string; // ISO string
  client: ClientInfo;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
  paymentStatus: 'paid' | 'pending' | 'failed';
  confirmationCode: string;
  totalAmount: number;
}

/**
 * PaymentIntentResponse interface
 * Response when creating a payment intent
 */
export interface PaymentIntentResponse {
  paymentIntentId: string;
  clientSecret: string;
  amount: number;
  currency: string;
}

/**
 * BookingContextState interface
 * The state managed by the booking context
 */
export interface BookingContextState {
  // Current step and navigation
  currentStep: BookingStepId;
  
  // Form data
  formData: Partial<BookingFormData>;
  
  // API resources
  services: Service[];
  availableDates: AvailableDate[];
  availableTimeSlots: AvailableTimeSlot[];
  
  // Loading states
  loadingServices: boolean;
  loadingAvailableDates: boolean;
  loadingAvailableTimeSlots: boolean;
  loadingPaymentIntent: boolean;
  submittingBooking: boolean;
  cancellingBooking: boolean;
  reschedulingBooking: boolean;
  
  // Error handling
  errors: {
    services?: string;
    availableDates?: string;
    availableTimeSlots?: string;
    paymentIntent?: string;
    bookingSubmission?: string;
    bookingCancellation?: string;
    bookingReschedule?: string;
  };
  
  // Success states
  bookingComplete: boolean;
  bookingConfirmation?: BookingResponse;
} 





