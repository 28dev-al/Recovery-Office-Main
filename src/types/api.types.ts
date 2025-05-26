/**
 * API Type Definitions
 * 
 * This file contains TypeScript interfaces and types for all API interactions.
 * It provides strong typing for requests, responses, and error handling
 * based on the Recovery Office API structure.
 */

import { z } from 'zod';
import { ServiceType } from './service.types'; // Import from single source of truth

// Re-export ServiceType for backward compatibility
export { ServiceType };

/**
 * Base API Response interface that all responses extend
 */
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  timestamp: string;
}

/**
 * API Error Response
 */
export interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
  timestamp: string;
}

/**
 * Common HTTP Status Codes
 */
export enum HttpStatusCode {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  TOO_MANY_REQUESTS = 429,
  UNPROCESSABLE_ENTITY = 422,
  INTERNAL_SERVER_ERROR = 500,
  SERVICE_UNAVAILABLE = 503,
  GATEWAY_TIMEOUT = 504,
}

/**
 * API Error Codes
 */
export enum ApiErrorCode {
  // Authentication errors
  AUTH_INVALID_CREDENTIALS = 'AUTH_INVALID_CREDENTIALS',
  AUTH_TOKEN_EXPIRED = 'AUTH_TOKEN_EXPIRED',
  AUTH_TOKEN_INVALID = 'AUTH_TOKEN_INVALID',
  
  // Validation errors
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  INVALID_REQUEST_FORMAT = 'INVALID_REQUEST_FORMAT',
  
  // Resource errors
  RESOURCE_NOT_FOUND = 'RESOURCE_NOT_FOUND',
  RESOURCE_ALREADY_EXISTS = 'RESOURCE_ALREADY_EXISTS',
  RESOURCE_CONFLICT = 'RESOURCE_CONFLICT',
  
  // Server errors
  SERVER_ERROR = 'SERVER_ERROR',
  SERVICE_UNAVAILABLE = 'SERVICE_UNAVAILABLE',
  
  // Business logic errors
  BUSINESS_RULE_VIOLATION = 'BUSINESS_RULE_VIOLATION',
  BOOKING_CONFLICT = 'BOOKING_CONFLICT',
  BOOKING_UNAVAILABLE = 'BOOKING_UNAVAILABLE',
  
  // Network and client errors
  NETWORK_ERROR = 'NETWORK_ERROR',
  CLIENT_ERROR = 'CLIENT_ERROR',
  UNEXPECTED_ERROR = 'UNEXPECTED_ERROR',

  TOO_MANY_REQUESTS = 'TOO_MANY_REQUESTS',
  GATEWAY_TIMEOUT = 'GATEWAY_TIMEOUT',
}

/**
 * API Error class for consistent error handling
 */
export class ApiError extends Error {
  public readonly code: ApiErrorCode;
  public readonly statusCode: HttpStatusCode;
  public readonly details?: Record<string, unknown>;

  constructor(
    code: ApiErrorCode,
    message: string,
    statusCode: HttpStatusCode = HttpStatusCode.INTERNAL_SERVER_ERROR,
    details?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
    this.statusCode = statusCode;
    // Only assign details if it's not undefined
    if (details !== undefined) {
      this.details = details;
    }
    
    // This is needed to properly extend Error in TypeScript
    Object.setPrototypeOf(this, ApiError.prototype);
  }

  /**
   * Create an ApiError from an error response
   */
  static fromResponse(response: ApiErrorResponse, statusCode: HttpStatusCode): ApiError {
    return new ApiError(
      response.error.code as ApiErrorCode,
      response.error.message,
      statusCode,
      response.error.details
    );
  }
}

/**
 * API Request Options
 */
export interface ApiRequestOptions {
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean | undefined>;
  timeout?: number;
  cache?: RequestCache;
  withCredentials?: boolean;
}

/**
 * Pagination Parameters
 */
export interface PaginationParams {
  page: number;
  limit: number;
  sort?: string;
  order?: 'asc' | 'desc';
}

/**
 * Paginated Response
 */
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

// ======================================================================
// Service Specific Types
// ======================================================================

/**
 * Booking API Types
 */

// Booking Status
export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  RESCHEDULED = 'rescheduled',
}

// Client Information Schema
export const clientInfoSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  dateOfBirth: z.string().optional(),
  preferredContactMethod: z.enum(['email', 'phone', 'text']),
  additionalNotes: z.string().optional(),
});

export type ClientInfo = z.infer<typeof clientInfoSchema>;

// Create Booking Request
export const createBookingRequestSchema = z.object({
  serviceType: z.nativeEnum(ServiceType),
  startTime: z.string().datetime({ offset: true }),
  endTime: z.string().datetime({ offset: true }),
  clientInfo: clientInfoSchema,
  isNewClient: z.boolean(),
});

export type CreateBookingRequest = z.infer<typeof createBookingRequestSchema>;

// Booking Response Object
export interface BookingResponse {
  id: string;
  serviceType: ServiceType;
  startTime: string;
  endTime: string;
  duration: number;
  status: BookingStatus;
  clientInfo: ClientInfo;
  createdAt: string;
  updatedAt: string;
  confirmationCode: string;
}

// Get Available Slots Request
export const availableSlotsRequestSchema = z.object({
  serviceType: z.nativeEnum(ServiceType),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
  duration: z.number().min(15).max(120).optional(),
});

export type AvailableSlotsRequest = z.infer<typeof availableSlotsRequestSchema>;

// Available Time Slot
export interface TimeSlot {
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

/**
 * Newsletter API Types
 */

// Newsletter Subscription Request
export const newsletterSubscriptionSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  firstName: z.string().min(2, 'First name must be at least 2 characters').optional(),
  lastName: z.string().min(2, 'Last name must be at least 2 characters').optional(),
  interests: z.array(z.string()).optional(),
  consent: z.boolean().refine(val => val === true, 'You must consent to receive emails'),
});

export type NewsletterSubscriptionRequest = z.infer<typeof newsletterSubscriptionSchema>;

// Newsletter Subscription Response
export interface NewsletterSubscriptionResponse {
  id: string;
  email: string;
  subscriptionDate: string;
  status: 'active' | 'pending' | 'unsubscribed';
}

/**
 * Contact API Types
 */

// Contact Form Submission
export const contactFormSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(20, 'Message must be at least 20 characters'),
  serviceInterest: z.string().optional(),
  referralSource: z.string().optional(),
  consent: z.boolean().refine(val => val === true, 'You must consent to our privacy policy'),
});

export type ContactFormRequest = z.infer<typeof contactFormSchema>;

// Contact Form Response
export interface ContactFormResponse {
  id: string;
  receivedAt: string;
  estimatedResponseTime: string;
}

/**
 * Testimonial API Types
 */

// Testimonial
export interface Testimonial {
  id: string;
  name: string;
  title?: string;
  content: string;
  rating: number;
  date: string;
  serviceType: ServiceType;
  isVerified: boolean;
  avatarUrl?: string;
}

// Testimonial Request Params
export interface TestimonialRequestParams extends PaginationParams {
  minRating?: number;
  serviceType?: ServiceType;
  verifiedOnly?: boolean;
}

/**
 * Team Member API Types
 */

// Specialization
export enum Specialization {
  PHYSICAL_THERAPY = 'physical_therapy',
  HOLISTIC_HEALING = 'holistic_healing',
  REHABILITATION = 'rehabilitation',
  SPORTS_MEDICINE = 'sports_medicine',
  NUTRITIONAL_COUNSELING = 'nutritional_counseling',
  MASSAGE_THERAPY = 'massage_therapy',
  ACUPUNCTURE = 'acupuncture',
}

// Team Member
export interface TeamMember {
  id: string;
  firstName: string;
  lastName: string;
  title: string;
  specializations: Specialization[];
  bio: string;
  imageUrl: string;
  education: string[];
  certifications: string[];
  yearsOfExperience: number;
  isAcceptingNewClients: boolean;
}

/**
 * Type guard functions
 */

/**
 * Type guard to check if a response is an error response
 */
export function isApiErrorResponse(response: unknown): response is ApiErrorResponse {
  return (
    response !== null &&
    typeof response === 'object' &&
    'success' in response &&
    (response as ApiErrorResponse).success === false &&
    'error' in response &&
    typeof (response as ApiErrorResponse).error === 'object' &&
    'code' in (response as ApiErrorResponse).error &&
    typeof (response as ApiErrorResponse).error.code === 'string' &&
    'message' in (response as ApiErrorResponse).error &&
    typeof (response as ApiErrorResponse).error.message === 'string'
  );
}

/**
 * Type guard to check if a response is a successful response
 */
export function isApiSuccessResponse<T>(response: unknown): response is ApiResponse<T> {
  return (
    response !== null &&
    typeof response === 'object' &&
    'success' in response &&
    (response as ApiResponse<T>).success === true &&
    'data' in response &&
    'timestamp' in response &&
    typeof (response as ApiResponse<T>).timestamp === 'string'
  );
}

/**
 * Type guard to check if a response is paginated
 */
export function isPaginatedResponse<T>(response: unknown): response is PaginatedResponse<T> {
  return (
    response !== null &&
    typeof response === 'object' &&
    'items' in response &&
    Array.isArray((response as PaginatedResponse<T>).items) &&
    'total' in response &&
    typeof (response as PaginatedResponse<T>).total === 'number' &&
    'page' in response &&
    typeof (response as PaginatedResponse<T>).page === 'number' &&
    'limit' in response &&
    typeof (response as PaginatedResponse<T>).limit === 'number' &&
    'totalPages' in response &&
    typeof (response as PaginatedResponse<T>).totalPages === 'number' &&
    'hasNextPage' in response &&
    typeof (response as PaginatedResponse<T>).hasNextPage === 'boolean' &&
    'hasPrevPage' in response &&
    typeof (response as PaginatedResponse<T>).hasPrevPage === 'boolean'
  );
} 






