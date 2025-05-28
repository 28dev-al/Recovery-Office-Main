const getApiBaseUrl = (): string => {
  // Always use Railway backend URL for both development and production
  return 'https://recovery-office-backend-production.up.railway.app/api';
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
  
  console.log(`[API-TS] Making request to: ${url}`);
  
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

    const data = await response.json();
    console.log(`[API-TS] Success:`, data);
    return data;
  } catch (error) {
    console.error('[API-TS] Request failed:', error);
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
