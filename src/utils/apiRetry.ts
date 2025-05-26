/**
 * API Retry Utility with Sacred Geometry Principles
 * 
 * Implements Fibonacci sequence backoff for API retry attempts, creating
 * a natural progression of wait times that follows sacred proportions.
 */

import { FIBONACCI, PHI_INVERSE, FibonacciIndex } from '../constants/sacred-geometry';

/**
 * Interface for retry options
 */
interface RetryOptions {
  /** Maximum number of retry attempts (default: 5) */
  maxRetries?: number;
  
  /** Base delay in milliseconds for first retry (default: 300) */
  baseDelay?: number;
  
  /** Maximum delay between retries in milliseconds (default: 10000) */
  maxDelay?: number;
  
  /** Jitter factor to add randomness to retry timing (default: 0.1) */
  jitter?: number;
  
  /** Function that determines if an error is retryable */
  isRetryable?: (error: any) => boolean;
  
  /** Callback for each retry attempt */
  onRetry?: (attempt: number, delay: number, error: any) => void;
}

/**
 * Default retry options
 */
const defaultRetryOptions: Required<RetryOptions> = {
  maxRetries: 5,
  baseDelay: 300,
  maxDelay: 10000,
  jitter: 0.1,
  isRetryable: () => true,
  onRetry: () => {},
};

/**
 * Get Fibonacci value by index position
 * @param index - Index position (0-based)
 * @returns Fibonacci value at that position
 */
export const getFibonacciByIndex = (index: number): number => {
  // Convert index to the corresponding key in the FIBONACCI object
  const fibKeys = Object.keys(FIBONACCI).map(Number).sort((a, b) => a - b);
  // Ensure the index is valid
  const safeIndex = Math.max(0, Math.min(index, fibKeys.length - 1));
  // Return the Fibonacci value
  return FIBONACCI[fibKeys[safeIndex] as unknown as FibonacciIndex] ?? 1;
};

/**
 * Calculate delay time using Fibonacci sequence
 * 
 * @param attempt - Current retry attempt (0-indexed)
 * @param options - Retry options
 * @returns Delay time in milliseconds
 */
export function calculateFibonacciDelay(attempt: number, options: Required<RetryOptions>): number {
  // Use Fibonacci number at position (attempt + 3) to get reasonable initial delays
  // F(3) = 2, F(4) = 3, F(5) = 5, F(6) = 8, etc.
  const fibonacciNumber = getFibonacciByIndex(attempt + 3);
  
  // Scale by baseDelay and apply golden ratio factor for harmonic progression
  let delay = options.baseDelay * fibonacciNumber * PHI_INVERSE;
  
  // Apply jitter to prevent synchronized retries
  // Use PHI-based jitter for natural randomness
  if (options.jitter > 0) {
    const jitterFactor = 1 - options.jitter + (Math.random() * options.jitter * 2);
    delay *= jitterFactor;
  }
  
  // Ensure delay doesn't exceed maximum
  return Math.min(delay, options.maxDelay);
}

/**
 * Fetches data with Fibonacci backoff retry for failed requests
 * 
 * @param fn - Async function that makes the API request
 * @param options - Retry options
 * @returns Promise that resolves with the API response or rejects after max retries
 */
export async function fetchWithRetry<T>(
  fn: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  // Merge provided options with defaults
  const retryOptions = { ...defaultRetryOptions, ...options };
  
  let attempt = 0;
  
  async function attemptRequest(): Promise<T> {
    try {
      return await fn();
    } catch (error) {
      attempt++;
      
      // Check if we should retry
      if (
        attempt <= retryOptions.maxRetries &&
        retryOptions.isRetryable(error)
      ) {
        // Calculate delay based on Fibonacci sequence
        const delay = calculateFibonacciDelay(attempt, retryOptions as Required<RetryOptions>);
        
        // Call retry callback
        retryOptions.onRetry(attempt, delay, error);
        
        // Wait for the calculated delay
        await new Promise(resolve => setTimeout(resolve, delay));
        
        // Attempt again
        return attemptRequest();
      }
      
      // Max retries exceeded or non-retryable error
      throw error;
    }
  }
  
  return attemptRequest();
}

/**
 * Creates a retryable fetch function with the specified options
 * 
 * @param options - Default retry options for all requests
 * @returns Configured fetch function with retry capability
 */
export function createRetryableFetch(options: RetryOptions = {}) {
  return async function<T>(url: string, fetchOptions?: RequestInit): Promise<T> {
    return fetchWithRetry<T>(
      async () => {
        const response = await fetch(url, fetchOptions);
        
        if (!response.ok) {
          const error: any = new Error(`HTTP error ${response.status}`);
          error.status = response.status;
          error.statusText = response.statusText;
          error.response = response;
          throw error;
        }
        
        return response.json();
      },
      options
    );
  };
}

/**
 * Determines if an error should be retried based on HTTP status code
 * 
 * @param error - The error to evaluate
 * @returns Whether the request should be retried
 */
export function isRetryableHttpError(error: any): boolean {
  // No status means network error, which is retryable
  if (!error.status) return true;
  
  // 429 Too Many Requests
  // 500, 502, 503, 504 Server errors
  return [429, 500, 502, 503, 504].includes(error.status);
}

/**
 * Utility to create a retryable API client with common retry configuration
 * 
 * @param baseUrl - Base URL for API requests
 * @param options - Default retry options
 * @returns API client with Fibonacci backoff retry
 */
export function createSacredGeometryApiClient(baseUrl: string, options: RetryOptions = {}) {
  const defaultOptions: RetryOptions = {
    maxRetries: getFibonacciByIndex(4), // Default max retries = 3
    baseDelay: 300, // Base delay in ms
    maxDelay: 10000, // Max delay = 10 seconds
    jitter: PHI_INVERSE, // Use golden ratio inverse (≈0.618) for natural jitter
    isRetryable: isRetryableHttpError,
    ...options,
  };
  
  const retryableFetch = createRetryableFetch(defaultOptions);
  
  return {
    /**
     * GET request with Fibonacci backoff retry
     * 
     * @param path - API endpoint path
     * @param options - Additional fetch options
     * @returns Promise with response data
     */
    async get<T>(path: string, options: RequestInit = {}): Promise<T> {
      const url = `${baseUrl}${path}`;
      return retryableFetch<T>(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        ...options,
      });
    },
    
    /**
     * POST request with Fibonacci backoff retry
     * 
     * @param path - API endpoint path
     * @param data - Request body data
     * @param options - Additional fetch options
     * @returns Promise with response data
     */
    async post<T>(path: string, data: any, options: RequestInit = {}): Promise<T> {
      const url = `${baseUrl}${path}`;
      return retryableFetch<T>(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        ...options,
      });
    },
    
    /**
     * PUT request with Fibonacci backoff retry
     * 
     * @param path - API endpoint path
     * @param data - Request body data
     * @param options - Additional fetch options
     * @returns Promise with response data
     */
    async put<T>(path: string, data: any, options: RequestInit = {}): Promise<T> {
      const url = `${baseUrl}${path}`;
      return retryableFetch<T>(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        ...options,
      });
    },
    
    /**
     * DELETE request with Fibonacci backoff retry
     * 
     * @param path - API endpoint path
     * @param options - Additional fetch options
     * @returns Promise with response data
     */
    async delete<T>(path: string, options: RequestInit = {}): Promise<T> {
      const url = `${baseUrl}${path}`;
      return retryableFetch<T>(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        ...options,
      });
    }
  };
} 





