// Define proper API response types
export interface APIResponse<T = unknown> {
  status: string;
  message?: string;
  data?: T;
  results?: number;
  error?: string;
}

export interface DashboardResponse {
  data: {
    data: {
      totalBookings: number;
      totalRevenue: number;
      activeClients: number;
      successRate: number;
      recentActivity: Array<unknown>;
    };
  };
}

export interface BookingsResponse {
  data: {
    data: BookingData[];
  };
}

export interface ClientsResponse {
  data: {
    data: ClientData[];
  };
}

export interface BookingData {
  _id: string;
  clientId: string;
  serviceId: string;
  serviceName: string;
  date: string;
  timeSlot: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  estimatedValue: number;
  reference: string;
  createdAt: string;
  clientInfo?: {
    name?: string;
    firstName?: string;
    lastName?: string;
  };
  service?: {
    name?: string;
    price?: number;
  };
  selectedDate?: string;
  selectedTime?: string;
  totalAmount?: number;
}

export interface ClientData {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  caseType: string;
  estimatedLoss: number;
  urgencyLevel: string;
  createdAt: string;
  name?: string;
  lossAmount?: number;
  status?: 'active' | 'inactive' | 'pending';
  lastContact?: string;
  marketingConsent?: boolean;
  notes?: string;
}

// Real-time update types
export interface RealTimeUpdate {
  type: 'booking' | 'client' | 'service' | 'analytics';
  action: 'create' | 'update' | 'delete';
  data: unknown;
  timestamp: string;
}

// Type guard for real-time updates
export function isRealTimeUpdate(data: unknown): data is RealTimeUpdate {
  return (
    typeof data === 'object' &&
    data !== null &&
    'type' in data &&
    typeof (data as RealTimeUpdate).type === 'string' &&
    ['booking', 'client', 'service', 'analytics'].includes((data as RealTimeUpdate).type)
  );
}

// Activity types
export interface Activity {
  _id: string;
  type: 'booking_created' | 'booking_updated' | 'client_registered' | 'payment_received';
  clientName: string;
  description: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

// Dashboard stats types
export interface DashboardStats {
  totalBookings: number;
  totalRevenue: number;
  activeClients: number;
  successRate: number;
  change: {
    bookings: number;
    revenue: number;
    clients: number;
    successRate: number;
  };
}

export interface BookingAnalytics {
  period: string;
  bookings: number;
  revenue: number;
  completionRate: number;
} 