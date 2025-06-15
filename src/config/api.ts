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
    DASHBOARD: '/dashboard',
    GOOGLE_ADS_LEADS: '/google-ads/leads',
    GOOGLE_ADS_LEADS_STATS: '/google-ads/leads/stats'
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
    // Assuming the backend returns { success: boolean, data: BookingResponseType, message?: string }
    // And BookingResponseType is compatible with ConfirmationStep.BookingResponse
    // We need to define BookingResponseType or import it if it exists elsewhere.
    // For now, let's assume it returns a structure compatible with ConfirmationStep's local BookingResponse.
    // The key is that apiRequest will return THIS structure directly.
    // So, ConfirmationStep.tsx expects ApiResponse<BookingResponse>.
    // If apiRequest returns T directly, and T is what backend sends, then ConfirmationStep
    // should expect BookingResponse from the backend, not ApiResponse<BookingResponse> if backend doesn't wrap.

    // If backend sends: { _id: '...', reference: '...', ... }
    // Then in ConfirmationStep: const bookingDetails: BookingResponse = await bookingApi.createBooking(...)
    // bookingDetails._id

    // If backend sends: { data: { _id: '...', reference: '...', ... }, success: true }
    // Then in ConfirmationStep: const response: ApiResponse<BookingResponse> = await bookingApi.createBooking(...)
    // response.data._id

    // The current ConfirmationStep.tsx expects the latter. So apiRequest<ApiResponse<BookingResponse>>
    // where ConfirmationStep.BookingResponse is the T for ApiResponse's data field.
    type BackendBookingResponsePayload = {
        _id?: string;
        id?: string;
        reference?: string;
        clientId: string;
        serviceId: string;
        date: string;
        timeSlot: string;
        status?: string;
    };
    type BackendApiResponseWrapper = {
        success?: boolean;
        data?: BackendBookingResponsePayload; // This is the T for apiRequest
        message?: string;
        error?: string;
    };

    return apiRequest<BackendApiResponseWrapper>(API_CONFIG.ENDPOINTS.BOOKINGS, {
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
