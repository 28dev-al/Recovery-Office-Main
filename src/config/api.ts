const getApiBaseUrl = (): string => {
  // Production environment detection
  if (process.env.NODE_ENV === 'production') {
    // Use Netlify Functions for production
    return `${window.location.origin}/.netlify/functions`;
  }

  // Development environment
  return process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
};

export const API_CONFIG = {
  BASE_URL: getApiBaseUrl(),
  ENDPOINTS: {
    SERVICES: '/services',
    BOOKINGS: '/bookings',
    CLIENTS: '/clients',
    AVAILABILITY: '/availability',
    HEALTH: '/health',
    DASHBOARD: '/dashboard'
  },
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3
};

// Production-ready API request function
export const apiRequest = async <T = unknown>(
  endpoint: string, 
  options: Partial<{
    method: string;
    headers: Record<string, string>;
    body: string;
  }> = {}
): Promise<T> => {
  const url = `${API_CONFIG.BASE_URL}${endpoint}`;
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
    ...options.headers
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers: defaultHeaders
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    // Only log errors in development
    if (process.env.NODE_ENV === 'development') {
      console.error('API Request failed:', error);
    }
    throw error;
  }
};

// Specific API functions
export const bookingApi = {
  createBooking: async (bookingData: Record<string, unknown>) => {
    return apiRequest(API_CONFIG.ENDPOINTS.BOOKINGS, {
      method: 'POST',
      body: JSON.stringify(bookingData)
    });
  },

  getServices: async () => {
    return apiRequest(API_CONFIG.ENDPOINTS.SERVICES);
  },

  getAvailability: async (serviceId: string, date: string) => {
    return apiRequest(`${API_CONFIG.ENDPOINTS.AVAILABILITY}?serviceId=${serviceId}&date=${date}`);
  },

  createClient: async (clientData: Record<string, unknown>) => {
    return apiRequest(API_CONFIG.ENDPOINTS.CLIENTS, {
      method: 'POST',
      body: JSON.stringify(clientData)
    });
  }
}; 