/**
 * API Utilities
 * 
 * Helper functions for API interactions that incorporate sacred geometry principles
 * for timing, retries, and error handling.
 */

import { PHI, getFibonacciByIndex } from '../constants/sacred-geometry';
import { ApiError, ApiErrorCode, HttpStatusCode, isApiErrorResponse } from '../types/api.types';

// Custom error interface to avoid using 'any'
interface ErrorWithMessage {
  message: string;
  response?: {
    status?: number;
    data?: unknown;
  };
}

/**
 * Retry a function with exponential backoff based on Fibonacci sequence
 * 
 * @param fn - Async function to retry
 * @param operationName - Name of the operation being retried (for logging)
 * @param maxRetries - Maximum number of retry attempts (default: 3)
 * @param initialBackoffIndex - Initial Fibonacci index for backoff timing (default: 8, which is 21)
 * @returns Promise that resolves with the function result or rejects with the last error
 */
export const retryWithFibonacci = async <T>(
  fn: () => Promise<T>,
  operationName: string = 'API operation',
  maxRetries: number = 3,
  initialBackoffIndex: number = 8
): Promise<T> => {
  let retryCount = 0;
  let lastError: Error | ErrorWithMessage | ApiError | unknown;
  
  while (retryCount <= maxRetries) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      
      // Log the error with operation details
      console.error(`${operationName} failed (attempt ${retryCount + 1}/${maxRetries + 1}):`, error);
      
      // Don't retry if this is a client error (4xx except for specific retryable errors)
      if (error instanceof ApiError) {
        const statusCode = error.statusCode;
        
        // Don't retry for client errors (except timeout, too many requests)
        const isClientError = statusCode >= 400 && statusCode < 500;
        const isRetryableError = 
          statusCode === HttpStatusCode.TOO_MANY_REQUESTS || 
          statusCode === HttpStatusCode.GATEWAY_TIMEOUT;
        
        if (isClientError && !isRetryableError) {
          console.log(`${operationName} failed with non-retryable error (${error.code}). Not retrying.`);
          throw error;
        }
      }
      
      retryCount++;
      
      if (retryCount > maxRetries) {
        console.warn(`${operationName} exceeded maximum retry attempts (${maxRetries})`);
        break;
      }
      
      // Calculate wait time using Fibonacci sequence (21, 34, 55 × 10ms)
      const waitTime = getFibonacciByIndex(initialBackoffIndex + retryCount) * 10;
      
      // Add a small random jitter based on PHI for distributed systems
      const jitter = Math.random() * PHI * 10;
      const totalWaitTime = waitTime + jitter;
      
      console.log(`${operationName} retrying in ${Math.round(totalWaitTime)}ms (retry ${retryCount}/${maxRetries})`);
      
      // Wait before next retry
      await new Promise(resolve => setTimeout(resolve, totalWaitTime));
    }
  }
  
  throw lastError instanceof ApiError ? lastError : new ApiError(
    ApiErrorCode.UNEXPECTED_ERROR,
    typeof lastError === 'object' && lastError !== null && 'message' in lastError 
      ? String(lastError.message) 
      : 'Maximum retries exceeded',
    HttpStatusCode.SERVICE_UNAVAILABLE
  );
};

/**
 * Categorize and format API errors for consistent handling
 * 
 * @param error - The error object to categorize
 * @returns A properly typed ApiError
 */
export const categorizeError = (error: unknown): ApiError => {
  // If it's already an ApiError, return it
  if (error instanceof ApiError) {
    return error;
  }
  
  // Cast to error with message interface to avoid using 'any'
  const errorWithMessage = error as ErrorWithMessage;
  
  // Network errors
  if (error instanceof TypeError && errorWithMessage.message.includes('Network')) {
    return new ApiError(
      ApiErrorCode.NETWORK_ERROR,
      'Unable to connect to the server. Please check your internet connection.',
      HttpStatusCode.SERVICE_UNAVAILABLE
    );
  }
  
  // Timeout errors
  if (errorWithMessage.message && errorWithMessage.message.includes('timeout')) {
    return new ApiError(
      ApiErrorCode.GATEWAY_TIMEOUT,
      'The request timed out. Please try again later.',
      HttpStatusCode.GATEWAY_TIMEOUT
    );
  }
  
  // Parse errors from API responses
  if (errorWithMessage.response && errorWithMessage.response.data) {
    const { data } = errorWithMessage.response;
    
    if (isApiErrorResponse(data)) {
      return new ApiError(
        data.error.code as ApiErrorCode,
        data.error.message || 'An error occurred',
        errorWithMessage.response.status || HttpStatusCode.INTERNAL_SERVER_ERROR,
        data.error.details
      );
    }
  }
  
  // Default to unexpected error
  return new ApiError(
    ApiErrorCode.UNEXPECTED_ERROR,
    errorWithMessage.message || 'An unexpected error occurred',
    HttpStatusCode.INTERNAL_SERVER_ERROR
  );
};

/**
 * Format error message for user display
 * 
 * @param error - The error to format
 * @returns A user-friendly error message
 */
export const formatErrorMessage = (error: unknown): string => {
  const apiError = categorizeError(error);
  
  // Return the error message with optional details
  return apiError.message;
}; 





