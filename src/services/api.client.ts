/**
 * API Client
 * 
 * A centralized client for making API requests with enhanced error handling,
 * timeout support, and recovery mechanisms based on sacred geometry principles.
 */

import { 
  ApiResponse, 
  ApiErrorResponse, 
  ApiError, 
  ApiErrorCode, 
  HttpStatusCode, 
  ApiRequestOptions,
  isApiErrorResponse
} from '../types/api.types';
import { retryWithFibonacci, categorizeError } from '../utils/apiUtils';
import { PHI, SACRED_TIMING } from '../constants/sacred-geometry';

// Default base URL - fallback to localhost in development
const API_BASE_URL = process.env.REACT_APP_API_URL || 
  (process.env.NODE_ENV === 'development' ? 'https://recovery-office-backend-production.up.railway.app/api' : '/api');

// Default request timeout in milliseconds (based on sacred timing constants)
const DEFAULT_TIMEOUT = SACRED_TIMING.slow;

// Network request timeout error
class TimeoutError extends Error {
  constructor(message: string = 'Request timed out') {
    super(message);
    this.name = 'TimeoutError';
  }
}

/**
 * API Client class for making HTTP requests to the API with enhanced error handling.
 */
export class ApiClient {
  private static instance: ApiClient;
  private baseUrl: string;
  private defaultOptions: ApiRequestOptions;
  private debugMode: boolean;
  
  /**
   * Private constructor to enforce singleton pattern
   */
  private constructor() {
    this.baseUrl = API_BASE_URL;
    this.defaultOptions = {
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
      },
      timeout: DEFAULT_TIMEOUT,
      withCredentials: true
    };
    
    // Enable debug mode in development
    this.debugMode = process.env.NODE_ENV === 'development' || 
                    window.localStorage.getItem('recovery_debug') === 'true';
                    
    this.logDebug('API Client initialized', { baseUrl: this.baseUrl });
  }
  
  /**
   * Get the singleton instance of the API client
   */
  public static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }
    
    return ApiClient.instance;
  }
  
  /**
   * Configure the API client
   */
  public configure(config: { baseUrl?: string; defaultOptions?: ApiRequestOptions }): void {
    if (config.baseUrl) {
      this.baseUrl = config.baseUrl;
    }
    
    if (config.defaultOptions) {
      this.defaultOptions = {
        ...this.defaultOptions,
        ...config.defaultOptions
      };
    }
    
    this.logDebug('API Client configured', { baseUrl: this.baseUrl, options: this.defaultOptions });
  }
  
  /**
   * Set an authorization token for all requests
   */
  public setAuthToken(token: string | null): void {
    if (token) {
      this.defaultOptions.headers = {
        ...this.defaultOptions.headers,
        'Authorization': `Bearer ${token}`
      };
      this.logDebug('Auth token set');
    } else {
      // Remove the Authorization header if token is null
      const { Authorization, ...headers } = this.defaultOptions.headers || {};
      this.defaultOptions.headers = headers;
      this.logDebug('Auth token cleared');
    }
  }
  
  /**
   * Make a GET request
   */
  public async get<T>(endpoint: string, options?: ApiRequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>('GET', endpoint, undefined, options);
  }
  
  /**
   * Make a POST request
   */
  public async post<T>(endpoint: string, data?: unknown, options?: ApiRequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>('POST', endpoint, data, options);
  }
  
  /**
   * Make a PUT request
   */
  public async put<T>(endpoint: string, data?: unknown, options?: ApiRequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>('PUT', endpoint, data, options);
  }
  
  /**
   * Make a PATCH request
   */
  public async patch<T>(endpoint: string, data?: unknown, options?: ApiRequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>('PATCH', endpoint, data, options);
  }
  
  /**
   * Make a DELETE request
   */
  public async delete<T>(endpoint: string, options?: ApiRequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>('DELETE', endpoint, undefined, options);
  }
  
  /**
   * Make a request to the API with timeout and error handling
   * 
   * @param method - HTTP method (GET, POST, PUT, DELETE)
   * @param endpoint - API endpoint (will be appended to the base URL)
   * @param data - Optional request body for POST, PUT, PATCH requests
   * @param options - Optional request options
   * @returns Promise that resolves with the API response or rejects with an ApiError
   */
  private async request<T>(
    method: string,
    endpoint: string,
    data?: unknown,
    options?: ApiRequestOptions
  ): Promise<ApiResponse<T>> {
    const isBookingEndpoint = endpoint.toLowerCase().includes('booking');
    const isServicesEndpoint = endpoint.toLowerCase().includes('services');
    const isPriority = isBookingEndpoint || isServicesEndpoint;
    
    // Track start time for debug logging
    const startTime = Date.now();
    
    // Merge default options with provided options
    const mergedOptions: ApiRequestOptions = {
      ...this.defaultOptions,
      ...options,
      headers: {
        ...this.defaultOptions.headers,
        ...options?.headers
      }
    };
    
    // Add special tracking header for booking-related endpoints
    if (isBookingEndpoint) {
      mergedOptions.headers = {
        ...mergedOptions.headers,
        'X-Recovery-Booking-Flow': 'true'
      };
    }
    
    // Set timeout based on endpoint priority
    const timeout = mergedOptions.timeout || (isPriority ? DEFAULT_TIMEOUT * 1.5 : DEFAULT_TIMEOUT);
    
    // Build the URL with query parameters if provided
    let url = `${this.baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
    
    if (mergedOptions.params) {
      const queryParams = new URLSearchParams();
      
      for (const [key, value] of Object.entries(mergedOptions.params)) {
        if (value !== undefined) {
          queryParams.append(key, String(value));
        }
      }
      
      const queryString = queryParams.toString();
      if (queryString) {
        url += `?${queryString}`;
      }
    }
    
    // Log request in debug mode
    this.logDebug(`${method} ${endpoint} - Request`, {
      url,
      method,
      data,
      options: mergedOptions,
      isBookingEndpoint
    });
    
    try {
      // Use retry mechanism for booking and service-related endpoints
      const requestFn = async (): Promise<ApiResponse<T>> => {
        // Build the fetch request
        const fetchOptions: RequestInit = {
          method,
          headers: mergedOptions.headers as Record<string, string>,
          credentials: mergedOptions.withCredentials ? 'include' : 'same-origin',
          cache: mergedOptions.cache || 'default'
        };
        
        // Add body for non-GET requests if data is provided
        if (method !== 'GET' && data !== undefined) {
          fetchOptions.body = JSON.stringify(data);
        }
        
        // Create abort controller for timeout
        const controller = new AbortController();
        fetchOptions.signal = controller.signal;
        
        // Set timeout
        const timeoutId = setTimeout(() => {
          controller.abort();
        }, timeout);
        
        try {
          // Make the request
          const response = await fetch(url, fetchOptions);
          
          // Parse the response
          let responseData: unknown;
          let textContent: string | null = null;
          
          try {
            // First check if we can get JSON directly
            if (response.headers.get('content-type')?.includes('application/json')) {
              responseData = await response.json();
            } else {
              // If not JSON, get text content first and store it
              textContent = await response.text();
              
              // If response is empty, return a basic success/error response
              if (!textContent) {
                if (response.ok) {
                  responseData = { success: true, data: null, timestamp: new Date().toISOString() };
                } else {
                  const errorResponse = {
                    success: false as const,
                    error: {
                      code: `HTTP_${response.status}`,
                      message: response.statusText || 'Unknown error',
                    },
                    timestamp: new Date().toISOString()
                  };
                  throw ApiError.fromResponse(errorResponse, response.status);
                }
              } else {
                // Try to parse as JSON if it looks like JSON
                try {
                  if (textContent.trim().startsWith('{') || textContent.trim().startsWith('[')) {
                    responseData = JSON.parse(textContent);
                  } else {
                    // Return text response
                    responseData = { success: response.ok, data: textContent, timestamp: new Date().toISOString() };
                  }
                } catch (parseError) {
                  // Return text response if JSON parsing fails
                  responseData = { success: response.ok, data: textContent, timestamp: new Date().toISOString() };
                }
              }
            }
            
            // Check if response is an error
            if (isApiErrorResponse(responseData)) {
              throw ApiError.fromResponse(responseData as ApiErrorResponse, response.status);
            }
            
            // Return the response data
            return responseData as ApiResponse<T>;
          } catch (e) {
            // If JSON parsing fails but we haven't tried text yet
            if (!textContent && e instanceof SyntaxError) {
              textContent = await response.text();
              
              // If response is empty, return a basic success/error response
              if (!textContent) {
                if (response.ok) {
                  return { success: true, data: null, timestamp: new Date().toISOString() } as ApiResponse<T>;
                } else {
                  const errorResponse = {
                    success: false as const,
                    error: {
                      code: `HTTP_${response.status}`,
                      message: response.statusText || 'Unknown error',
                    },
                    timestamp: new Date().toISOString()
                  };
                  throw ApiError.fromResponse(errorResponse, response.status);
                }
              } else {
                // Return text response
                return { success: response.ok, data: textContent, timestamp: new Date().toISOString() } as ApiResponse<T>;
              }
            }
            
            // Re-throw any other errors
            throw e;
          }
        } finally {
          // Clear the timeout
          clearTimeout(timeoutId);
        }
      };
      
      // Use retry mechanism for booking and services endpoints
      const maxRetries = isPriority ? 3 : 1;
      const operationName = `${method} ${endpoint}${isBookingEndpoint ? ' (Booking)' : ''}`;
      
      // Execute the request with retries if appropriate
      const result = isPriority 
        ? await retryWithFibonacci(requestFn, operationName, maxRetries)
        : await requestFn();
      
      // Log success response in debug mode
      const endTime = Date.now();
      this.logDebug(`${method} ${endpoint} - Success (${endTime - startTime}ms)`, {
        response: result,
        duration: endTime - startTime
      });
      
      return result;
    } catch (error) {
      // Handle AbortController timeout
      if (error instanceof DOMException && error.name === 'AbortError') {
        error = new TimeoutError(`Request to ${endpoint} timed out after ${timeout}ms`);
      }
      
      // Log error in debug mode
      const endTime = Date.now();
      this.logDebug(`${method} ${endpoint} - Error (${endTime - startTime}ms)`, {
        error,
        duration: endTime - startTime
      });
      
      // Special debug logging for booking endpoints
      if (isBookingEndpoint) {
        console.error(`[API Client] Booking endpoint error: ${endpoint}`, {
          error,
          method,
          url,
          data
        });
      }
      
      // Categorize and rethrow the error
      throw categorizeError(error);
    }
  }
  
  /**
   * Log debug messages
   */
  private logDebug(message: string, data?: unknown): void {
    if (this.debugMode) {
      console.log(`[API Client] ${message}`, data);
    }
  }
}

/**
 * Default API client instance
 */
const apiClient = ApiClient.getInstance();

export default apiClient; 





