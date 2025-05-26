/**
 * Recovery Office API Client
 * 
 * Enhanced with circuit breaker pattern, request deduplication, and proper error handling
 * to prevent infinite request loops and rate limiting issues.
 */

import { verror, vinfo } from '../utils/debugLogger';
import { 
  ServiceType,
  BookingStatus,
  TimeSlot,
  isApiErrorResponse,
  isApiSuccessResponse
} from '../types/api.types';

// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

console.log('[API] Base URL configured as:', API_BASE_URL);

// Local interfaces for request handling
interface RequestOptions {
  method?: string;
  headers?: Record<string, string>;
  body?: string;
  mode?: 'cors' | 'no-cors' | 'same-origin';
  cache?: 'default' | 'no-cache' | 'reload' | 'force-cache' | 'only-if-cached';
  credentials?: 'omit' | 'same-origin' | 'include';
  signal?: AbortSignal;
}

export interface ApiResponse<T = unknown> {
  data: T;
  status: number;
  message?: string;
}

export interface ApiError {
  message: string;
  status: number;
  code?: string;
  details?: Record<string, unknown>;
}

// Circuit breaker state interface
interface CircuitBreakerState {
  failures: number;
  lastFailure: number;
  isOpen: boolean;
  requestCount: number;
}

// Cache entry interface
interface CacheEntry {
  data: ApiResponse;
  timestamp: number;
}

class RecoveryOfficeAPI {
  private baseURL: string;
  private requestCache: Map<string, Promise<ApiResponse>> = new Map();
  private circuitBreaker: Map<string, CircuitBreakerState> = new Map();
  private readonly MAX_FAILURES = 3;
  private readonly CIRCUIT_TIMEOUT = 30000; // 30 seconds
  private readonly CACHE_DURATION = 60000; // 1 minute cache
  private dataCache: Map<string, CacheEntry> = new Map();

  constructor() {
    this.baseURL = API_BASE_URL;
    console.log('🔧 [API] Initializing with circuit breaker protection:', this.baseURL);
  }

  /**
   * Check if circuit breaker is open for an endpoint
   */
  private isCircuitOpen(endpoint: string): boolean {
    const circuit = this.circuitBreaker.get(endpoint);
    if (!circuit) return false;

    if (circuit.isOpen) {
      const timeSinceLastFailure = Date.now() - circuit.lastFailure;
      if (timeSinceLastFailure > this.CIRCUIT_TIMEOUT) {
        // Reset circuit breaker
        circuit.isOpen = false;
        circuit.failures = 0;
        console.log(`🔄 [API] Circuit breaker reset for ${endpoint}`);
        return false;
      }
      return true;
    }

    return false;
  }

  /**
   * Record a failure for circuit breaker
   */
  private recordFailure(endpoint: string): void {
    const circuit = this.circuitBreaker.get(endpoint) || { 
      failures: 0, 
      lastFailure: 0, 
      isOpen: false, 
      requestCount: 0 
    };
    
    circuit.failures += 1;
    circuit.lastFailure = Date.now();

    if (circuit.failures >= this.MAX_FAILURES) {
      circuit.isOpen = true;
      console.warn(`🚨 [API] Circuit breaker OPEN for ${endpoint} - too many failures (${circuit.failures})`);
    }

    this.circuitBreaker.set(endpoint, circuit);
  }

  /**
   * Record a success for circuit breaker
   */
  private recordSuccess(endpoint: string): void {
    const circuit = this.circuitBreaker.get(endpoint);
    if (circuit) {
      circuit.failures = 0;
      circuit.isOpen = false;
      circuit.requestCount += 1;
      this.circuitBreaker.set(endpoint, circuit);
    }
  }

  /**
   * Check if data is cached and fresh
   */
  private getCachedData(cacheKey: string): ApiResponse | null {
    const cached = this.dataCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      console.log(`🔄 [API] Using cached data for ${cacheKey}`);
      return cached.data;
    }
    return null;
  }

  /**
   * Cache data with timestamp
   */
  private setCachedData(cacheKey: string, data: ApiResponse): void {
    this.dataCache.set(cacheKey, {
      data,
      timestamp: Date.now()
    });
  }

  /**
   * Make a safe HTTP request with circuit breaker protection
   */
  private async makeRequest(endpoint: string, options: RequestOptions = {}): Promise<ApiResponse> {
    const url = `${this.baseURL}${endpoint}`;
    const method = options.method || 'GET';
    const cacheKey = `${method}:${endpoint}`;

    // Check circuit breaker
    if (this.isCircuitOpen(endpoint)) {
      console.warn(`🚨 [API] Circuit breaker is OPEN for ${endpoint} - rejecting request`);
      throw new Error('Service temporarily unavailable - too many recent failures');
    }

    // Check if request is already in flight (deduplication)
    if (this.requestCache.has(cacheKey)) {
      console.log(`🔄 [API] Returning cached request for ${endpoint}`);
      return this.requestCache.get(cacheKey)!;
    }

    // Check data cache for GET requests
    if (method === 'GET') {
      const cachedData = this.getCachedData(cacheKey);
      if (cachedData) {
        return cachedData;
      }
    }

    console.log(`📡 [API] Making fresh request to ${endpoint}`);

    const requestPromise = this.executeRequest(url, options)
      .then(response => {
        this.recordSuccess(endpoint);
        this.requestCache.delete(cacheKey);
        
        // Cache GET responses
        if (method === 'GET') {
          this.setCachedData(cacheKey, response);
        }
        
        return response;
      })
      .catch(error => {
        this.recordFailure(endpoint);
        this.requestCache.delete(cacheKey);
        throw error;
      });

    // Cache the promise to prevent duplicate requests
    this.requestCache.set(cacheKey, requestPromise);

    return requestPromise;
  }

  /**
   * Execute the actual HTTP request
   */
  private async executeRequest(url: string, options: RequestOptions): Promise<ApiResponse> {
    try {
      console.log(`📡 [API] Fetching: ${url}`);
      
      const response = await fetch(url, {
        ...options,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          ...options.headers,
        },
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'omit',
        signal: AbortSignal.timeout(10000), // 10 second timeout
      });

      if (response.status === 429) {
        const retryAfter = response.headers.get('Retry-After');
        const waitTime = retryAfter ? parseInt(retryAfter) * 1000 : 5000;
        console.warn(`⏳ [API] Rate limited - retry after ${waitTime}ms`);
        throw new Error(`Rate limited - retry after ${waitTime}ms`);
      }

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log(`✅ [API] Success: ${url}`);
      return {
        data: data,
        status: response.status,
        message: 'Request successful'
      };

    } catch (error) {
      console.error(`❌ [API] Failed: ${url}`, error);
      
      // Provide specific error messages
      if ((error as Error).name === 'TypeError' && (error as Error).message.includes('Failed to fetch')) {
        throw new Error('Network connection failed. Check if backend is accessible and CORS is configured.');
      }
      
      throw error;
    }
  }

  /**
   * Get all available services with circuit breaker protection
   */
  async getServices(): Promise<ApiResponse> {
    return await this.makeRequest('/services', { method: 'GET' });
  }

  /**
   * Create a new booking
   */
  async createBooking(bookingData: unknown): Promise<ApiResponse> {
    console.log('[API] Creating booking with data:', bookingData);
    
    try {
      vinfo('[API] Creating booking...', bookingData);
      
      return await this.makeRequest('/bookings', {
        method: 'POST',
        body: JSON.stringify(bookingData)
      });
    } catch (error) {
      console.error('[API] Failed to create booking:', error);
      verror('[API] Failed to create booking', error);
      throw new Error(`Unable to create booking: ${(error as Error).message}`);
    }
  }

  /**
   * Get available time slots for a service and date
   */
  async getAvailableSlots(serviceId: string, date: string): Promise<ApiResponse> {
    const params = new URLSearchParams({ serviceId, date });
    const endpoint = `/slots?${params}`;
    
    try {
      vinfo('[API] Fetching available slots...', { serviceId, date });
      return await this.makeRequest(endpoint, { method: 'GET' });
    } catch (error) {
      console.error('[API] Failed to fetch slots:', error);
      verror('[API] Failed to fetch available slots', error);
      throw new Error(`Unable to fetch slots: ${(error as Error).message}`);
    }
  }

  /**
   * Create a new client
   */
  async createClient(clientData: unknown): Promise<ApiResponse> {
    try {
      vinfo('[API] Creating client...', clientData);
      return await this.makeRequest('/clients', {
        method: 'POST',
        body: JSON.stringify(clientData)
      });
    } catch (error) {
      console.error('[API] Failed to create client:', error);
      verror('[API] Failed to create client', error);
      throw error;
    }
  }

  /**
   * Health check endpoint
   */
  async healthCheck(): Promise<ApiResponse> {
    try {
      vinfo('[API] Performing health check...');
      return await this.makeRequest('/health', { method: 'GET' });
    } catch (error) {
      console.error('[API] Health check failed:', error);
      verror('[API] Health check failed', error);
      throw new Error(`Health check failed: ${(error as Error).message}`);
    }
  }
  
  /**
   * Test API connectivity with detailed diagnostics
   */
  async testConnectivity(): Promise<ApiResponse> {
    console.log('[API] Starting connectivity test...');
    console.log('[API] Base URL:', this.baseURL);
    console.log('[API] Browser:', navigator.userAgent);
    
    try {
      vinfo('[API] Testing connectivity...');
      
      // Test health endpoint first
      const healthResponse = await this.healthCheck();
      
      // Test services endpoint
      const servicesResponse = await this.getServices();
      
      console.log('[API] Connectivity test successful');
      
      return {
        data: {
          health: healthResponse.data,
          services: servicesResponse.data,
          connectivity: 'success'
        },
        status: 200,
        message: 'API connectivity test successful'
      };
    } catch (error) {
      console.error('[API] Connectivity test failed:', error);
      verror('[API] Connectivity test failed', error);
      throw error;
    }
  }

  /**
   * PATCH method for updating resources
   */
  async patch(endpoint: string, data: unknown): Promise<ApiResponse> {
    try {
      console.log(`🔧 [API] PATCH request to: ${endpoint}`);
      
      return await this.makeRequest(endpoint, {
        method: 'PATCH',
        body: JSON.stringify(data)
      });
    } catch (error) {
      console.error(`❌ [API] PATCH Error for ${endpoint}:`, error);
      throw error;
    }
  }

  /**
   * DELETE method for removing resources
   */
  async delete(endpoint: string): Promise<ApiResponse> {
    try {
      console.log(`🗑️ [API] DELETE request to: ${endpoint}`);
      
      return await this.makeRequest(endpoint, {
        method: 'DELETE'
      });
    } catch (error) {
      console.error(`❌ [API] DELETE Error for ${endpoint}:`, error);
      throw error;
    }
  }

  /**
   * Clear all caches and reset circuit breakers (for debugging)
   */
  clearCache(): void {
    this.requestCache.clear();
    this.dataCache.clear();
    this.circuitBreaker.clear();
    console.log('🔄 [API] All caches and circuit breakers cleared');
  }

  /**
   * Get circuit breaker status for debugging
   */
  getCircuitBreakerStatus(): Record<string, CircuitBreakerState> {
    return Object.fromEntries(this.circuitBreaker.entries());
  }
}

// Create singleton instance
const apiClient = new RecoveryOfficeAPI();

// Export both the class and the instance
export { apiClient };
export const apiService = new RecoveryOfficeAPI();
export default apiClient;

// Export types for use in components
export type { 
  ServiceType, 
  BookingStatus, 
  TimeSlot, 
  isApiErrorResponse, 
  isApiSuccessResponse
};





