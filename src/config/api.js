export const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://recovery-office-backend-production.up.railway.app/api'  // Railway backend
  : 'https://recovery-office-backend-production.up.railway.app/api'; // Use Railway for dev too

console.log('[API Config] Environment:', process.env.NODE_ENV);
console.log('[API Config] API Base URL:', API_BASE_URL);

export const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  console.log(`[API] Making request to: ${url}`);

  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[API] HTTP ${response.status}:`, errorText);
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    console.log(`[API] Success:`, data);
    return data;
  } catch (error) {
    console.error(`[API] Request failed to ${url}:`, error);
    throw error;
  }
};

// Booking API functions
export const bookingApi = {
  createClient: async (clientData) => {
    console.log('[BookingAPI] Creating client with data:', clientData);
    return await apiRequest('/clients', {
      method: 'POST',
      body: JSON.stringify(clientData)
    });
  },

  createBooking: async (bookingData) => {
    console.log('[BookingAPI] Creating booking with data:', bookingData);
    return await apiRequest('/bookings', {
      method: 'POST',
      body: JSON.stringify(bookingData)
    });
  },

  getBooking: async (bookingId) => {
    console.log('[BookingAPI] Fetching booking:', bookingId);
    return await apiRequest(`/bookings/${bookingId}`);
  },

  getServices: async () => {
    console.log('[BookingAPI] Fetching services');
    return await apiRequest('/services');
  }
};
