/**
 * Dashboard API Service
 * Integrates with existing MongoDB backend for Recovery Office admin panel
 */

const API_BASE_URL = 'https://recovery-office-backend-production.up.railway.app/api';

// Simple interfaces - no duplicates
interface OverviewStats {
  totalBookings: {
    thisMonth: number;
    today: number;
    thisWeek: number;
    change: number;
  } | number; // Support both object and number formats
  totalRevenue: {
    amount: number;
    currency: string;
    period: string;
    change: number;
  } | number; // Support both object and number formats
  activeClients: {
    count: number;
    change: number;
  } | number; // Support both object and number formats
  successRate: {
    percentage: number;
    change: number;
  } | number; // Support both object and number formats
  averageBookingValue: number;
  todayBookings: number;
  statusBreakdown: Record<string, number>;
  averageCaseValue?: {
    amount: number;
    currency: string;
    change: number;
  };
}

interface RecentBooking {
  _id: string;
  id: string;
  clientName: string;
  serviceName: string;
  date: string;
  time: string;
  status: string;
  value: number;
  urgency: string;
  createdAt: string;
}

interface Activity {
  _id: string;
  type: string;
  clientName: string;
  description: string;
  timestamp: string;
  metadata: Record<string, unknown>;
}

interface AnalyticsData {
  bookingStats: {
    totalRevenue: number;
    statusCounts: Record<string, number>;
  };
  topServices: ServicePopularityData[];
}

interface ServicePopularityData {
  serviceId: string;
  name: string;
  bookingCount: number;
  revenue: number;
}

interface ClientData {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  status: string;
  createdAt: string;
}

// Add ChartData interface for dashboard components
interface ChartData {
  bookingTrends: {
    labels: string[];
    datasets: Array<{
      data: number[];
      label: string;
      borderColor?: string;
      backgroundColor?: string;
    }>;
  };
  servicePopularity: {
    labels: string[];
    datasets: Array<{
      data: number[];
      label: string;
      backgroundColor?: string[];
    }>;
  };
  revenueBreakdown: {
    labels: string[];
    datasets: Array<{
      data: number[];
      label: string;
      backgroundColor?: string[];
    }>;
  };
}

// Simple API request function
async function makeDashboardRequest<T>(endpoint: string): Promise<{ data: T } | null> {
  const url = `${API_BASE_URL}/dashboard${endpoint}`;
  
  try {
    console.log(`[Dashboard API] Request: ${url}`);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      mode: 'cors'
    });

    if (!response.ok) {
      console.error(`[Dashboard API] HTTP ${response.status} for ${endpoint}`);
      return null;
    }

    const result = await response.json();
    console.log(`[Dashboard API] Success: ${endpoint}`);
    
    return result.data ? { data: result.data } : { data: result };
    
  } catch (error) {
    console.error(`[Dashboard API] Error ${endpoint}:`, error);
    return null;
  }
}

// Export clean API object
export const dashboardApi = {
  getOverviewStats: () => makeDashboardRequest<OverviewStats>('/analytics'),
  
  getRecentBookings: (limit = 10) => {
    const result = makeDashboardRequest<RecentBooking[]>(`/bookings?limit=${limit}`);
    
    // Add debugging to see the actual data structure
    result.then(data => {
      if (data?.data && Array.isArray(data.data)) {
        console.log('[Dashboard API] Booking data structure analysis:');
        data.data.forEach((booking, index) => {
          console.log(`[Dashboard API] Booking ${index + 1}:`, {
            _id: booking._id,
            clientName: booking.clientName,
            firstName: (booking as any).firstName,
            lastName: (booking as any).lastName,
            value: booking.value,
            price: (booking as any).price,
            totalAmount: (booking as any).totalAmount,
            estimatedValue: (booking as any).estimatedValue,
            clientInfo: (booking as any).clientInfo,
            rawBooking: booking
          });
        });
      }
    }).catch(error => {
      console.error('[Dashboard API] Error analyzing booking data:', error);
    });

    return result;
  },
  
  getRecentActivities: (limit = 20) => makeDashboardRequest<Activity[]>(`/activities?limit=${limit}`),
  getAnalyticsData: () => makeDashboardRequest('/analytics/dashboard'),
  getServicePopularity: () => makeDashboardRequest('/analytics/service-popularity'),
  getClients: (limit = 20) => makeDashboardRequest<ClientData[]>(`/clients?limit=${limit}`)
};

// Export types for other components
export type { OverviewStats, RecentBooking, Activity, AnalyticsData, ServicePopularityData, ClientData, ChartData };

// The legacy DashboardAPI class and its methods (including mock data) are removed.
// If any specific utility functions from the class are needed, they should be refactored 
// as standalone functions or integrated elsewhere. 
