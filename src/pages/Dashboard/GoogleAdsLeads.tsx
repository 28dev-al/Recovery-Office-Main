import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
import { DashboardLayout } from '../../components/dashboard/DashboardLayout';

// Google Ads Leads API Configuration
const GOOGLE_ADS_API = {
  // Base URL WITHOUT the trailing /api to avoid double prefix issues
  BASE_URL: process.env.REACT_APP_API_URL || 'https://recovery-office-backend-production.up.railway.app',
  ENDPOINTS: {
    LEADS: '/api/google-ads/leads',
    STATS: '/api/google-ads/leads/stats',
    UPDATE_LEAD: (id: string) => `/api/google-ads/leads/${id}`,
    LEAD_BY_REFERENCE: (ref: string) => `/api/google-ads/leads/reference/${ref}`
  }
};

// Interface for Google Ads Lead data structure
interface GoogleAdsLead {
  _id: string;
  name: string;
  email: string;
  phone: string;
  estimatedLoss: string;
  lossType: string;
  urgencyLevel: string;
  description: string;
  source: string;
  leadStatus: string;
  priority: string;
  contactAttempts: number;
  qualificationScore: number;
  ipAddress: string;
  userAgent: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmContent: string;
  utmTerm: string;
  confirmationSent: boolean;
  internalNotificationSent: boolean;
  referenceNumber: string;
  createdAt: string;
  updatedAt: string;
}

// Interface for lead statistics
interface LeadStats {
  totalLeads: number;
  newLeads: number;
  contactedLeads: number;
  convertedLeads: number;
  conversionRate: number;
  totalValue: number;
  avgQualificationScore: number;
  emergencyLeads: number;
}

// Interface for filters
interface LeadFilters {
  leadStatus: string;
  priority: string;
  lossType: string;
  dateFrom: string;
  dateTo: string;
  search: string;
  urgencyLevel: string;
  utmSource: string;
}

// Styled Components
const GoogleAdsLeadsContainer = styled.div`
  padding: 24px;
  max-width: 1400px;
  margin: 0 auto;
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
`;

const PageTitle = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #1a365d;
  margin: 0;
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 12px;
`;

const ActionButton = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  ${props => props.variant === 'primary' ? `
    background: linear-gradient(135deg, #d69e2e 0%, #f6ad3a 100%);
    color: white;
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(214, 158, 46, 0.3);
    }
  ` : `
    background: white;
    color: #4a5568;
    border: 1px solid #e2e8f0;
    &:hover {
      border-color: #d69e2e;
      color: #d69e2e;
    }
  `}
`;

// Statistics Grid
const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
`;

const StatCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }
`;

const StatIcon = styled.div<{ color: string }>`
  width: 48px;
  height: 48px;
  background: ${props => props.color};
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  margin-bottom: 16px;
  color: white;
`;

const StatValue = styled.div`
  font-size: 32px;
  font-weight: 800;
  color: #1a365d;
  margin-bottom: 8px;
`;

const StatLabel = styled.div`
  font-size: 14px;
  color: #4a5568;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

// Filters Section
const FiltersContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const FiltersTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #1a365d;
  margin: 0 0 16px 0;
`;

const FiltersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 16px;
`;

const FilterInput = styled.input`
  padding: 12px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #d69e2e;
    box-shadow: 0 0 0 3px rgba(214, 158, 46, 0.1);
  }
`;

const FilterSelect = styled.select`
  padding: 12px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #d69e2e;
    box-shadow: 0 0 0 3px rgba(214, 158, 46, 0.1);
  }
`;

const FilterActions = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`;

// Table Section
const TableContainer = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.thead`
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
`;

const TableHeaderCell = styled.th`
  padding: 16px 20px;
  text-align: left;
  font-weight: 600;
  color: #1a365d;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  cursor: pointer;
  user-select: none;
  
  &:hover {
    background: #e2e8f0;
  }
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr`
  border-bottom: 1px solid #e2e8f0;
  transition: background-color 0.3s ease;

  &:hover {
    background: #f8fafc;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const TableCell = styled.td`
  padding: 16px 20px;
  font-size: 14px;
  color: #4a5568;
`;

const LeadInfo = styled.div`
  .name {
    font-weight: 600;
    color: #1a365d;
    margin-bottom: 4px;
    cursor: pointer;
    
    &:hover {
      color: #d69e2e;
    }
  }
  .reference {
    font-size: 12px;
    color: #4a5568;
    font-family: monospace;
  }
`;

const ContactInfo = styled.div`
  .email {
    font-weight: 500;
    color: #1a365d;
    margin-bottom: 4px;
  }
  .phone {
    font-size: 12px;
    color: #4a5568;
  }
`;

const PriorityBadge = styled.span<{ priority: string }>`
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;

  ${({ priority }) => {
    switch (priority.toLowerCase()) {
      case 'emergency':
        return 'background: #ff4444; color: white;';
      case 'urgent':
        return 'background: #ff8800; color: white;';
      case 'high':
        return 'background: #ffd700; color: #333;';
      default:
        return 'background: #4CAF50; color: white;';
    }
  }}
`;

const StatusBadge = styled.span<{ status: string }>`
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;

  ${({ status }) => {
    switch (status.toLowerCase()) {
      case 'new':
        return 'background: #ff6b35; color: white;';
      case 'contacted':
        return 'background: #4CAF50; color: white;';
      case 'qualified':
        return 'background: #2196F3; color: white;';
      case 'converted':
        return 'background: #9C27B0; color: white;';
      case 'closed':
        return 'background: #607D8B; color: white;';
      default:
        return 'background: #e2e8f0; color: #4a5568;';
    }
  }}
`;

const UTMInfo = styled.div`
  font-size: 12px;
  .source {
    font-weight: 500;
    color: #1a365d;
    margin-bottom: 2px;
  }
  .medium {
    color: #4a5568;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
`;

const TableActionButton = styled.button<{ variant?: 'primary' | 'danger' }>`
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  ${props => props.variant === 'danger' ? `
    background: #e53e3e;
    color: white;
    &:hover { background: #c53030; }
  ` : `
    background: #d69e2e;
    color: white;
    &:hover { background: #b8851f; }
  `}
`;

// Loading and Empty States
const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
  background: white;
  border-radius: 12px;
  flex-direction: column;
  gap: 16px;
`;

const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid #e2e8f0;
  border-top: 3px solid #d69e2e;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #4a5568;
  background: white;
  border-radius: 12px;
`;

export const GoogleAdsLeads: React.FC = () => {
  const [leads, setLeads] = useState<GoogleAdsLead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<GoogleAdsLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<LeadStats>({
    totalLeads: 0,
    newLeads: 0,
    contactedLeads: 0,
    convertedLeads: 0,
    conversionRate: 0,
    totalValue: 0,
    avgQualificationScore: 0,
    emergencyLeads: 0
  });
  
  const [filters, setFilters] = useState<LeadFilters>({
    leadStatus: '',
    priority: '',
    lossType: '',
    dateFrom: '',
    dateTo: '',
    search: '',
    urgencyLevel: '',
    utmSource: ''
  });

  // Test API connection
  const testAPIConnection = async () => {
    try {
      console.log('[GoogleAdsLeads] Testing API connection...');
      console.log('[GoogleAdsLeads] BASE_URL:', GOOGLE_ADS_API.BASE_URL);
      console.log('[GoogleAdsLeads] LEADS endpoint:', GOOGLE_ADS_API.ENDPOINTS.LEADS);
      
      const testUrl = `${GOOGLE_ADS_API.BASE_URL}${GOOGLE_ADS_API.ENDPOINTS.LEADS}`;
      console.log('[GoogleAdsLeads] Full test URL:', testUrl);
      
      // Get token once to avoid inconsistency between multiple calls
      const token = localStorage.getItem('recovery-office-token');
      console.log('[GoogleAdsLeads] Using auth token:', token ? `${token.substring(0, 15)}...` : 'none');
      
      const response = await fetch(testUrl, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'X-Client-Version': '1.0.0',
          'X-Request-Source': 'dashboard',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
      });
      console.log('[GoogleAdsLeads] API test response status:', response.status);
      console.log('[GoogleAdsLeads] API test response ok:', response.ok);
      console.log('[GoogleAdsLeads] API test response headers:', response.headers);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('[GoogleAdsLeads] API test error response text:', errorText);
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const result = await response.json();
      console.log('[GoogleAdsLeads] API test successful:', result);
      return result;
    } catch (error) {
      console.error('[GoogleAdsLeads] API test failed:', error);
      throw error;
    }
  };

  // Fetch leads from backend
  const fetchLeads = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('[GoogleAdsLeads] Starting fetchLeads...');
      
      // First test API connection
      await testAPIConnection();
      
      const queryParams = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) queryParams.append(key, value);
      });
      
      const url = `${GOOGLE_ADS_API.BASE_URL}${GOOGLE_ADS_API.ENDPOINTS.LEADS}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      console.log('[GoogleAdsLeads] Fetching leads from:', url);
      
      // Get token once to avoid inconsistency between multiple calls
      const token = localStorage.getItem('recovery-office-token');
      
      const response = await fetch(url, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'X-Client-Version': '1.0.0',
          'X-Request-Source': 'dashboard',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
      });
      
      console.log('[GoogleAdsLeads] Fetch response status:', response.status);
      console.log('[GoogleAdsLeads] Fetch response ok:', response.ok);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('[GoogleAdsLeads] Fetch error response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
      
      const result = await response.json();
      console.log('[GoogleAdsLeads] Full API response:', result);
      console.log('[GoogleAdsLeads] Response success field:', result.success);
      console.log('[GoogleAdsLeads] Response data field:', result.data);
      console.log('[GoogleAdsLeads] Response data type:', typeof result.data);
      console.log('[GoogleAdsLeads] Response data length:', Array.isArray(result.data) ? result.data.length : 'Not an array');

      if (result.success) {
        if (Array.isArray(result.data)) {
          console.log('[GoogleAdsLeads] Setting leads:', result.data.length, 'leads');
          setLeads(result.data);
          setFilteredLeads(result.data);
          console.log('[GoogleAdsLeads] First lead sample:', result.data[0]);
        } else {
          console.warn('[GoogleAdsLeads] Data is not an array:', result.data);
          setLeads([]);
          setFilteredLeads([]);
        }
      } else {
        console.error('[GoogleAdsLeads] API returned success=false:', result);
        setError(`API Error: ${result.message || 'Unknown error'}`);
        setLeads([]);
        setFilteredLeads([]);
      }
    } catch (error) {
      console.error('[GoogleAdsLeads] Error fetching leads:', error);
      setError(`Failed to fetch leads: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setLeads([]);
      setFilteredLeads([]);
    } finally {
      setLoading(false);
    }
  };

  // Apply filters to leads
  const applyFilters = () => {
    let filtered = [...leads];

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(lead => 
        lead.name.toLowerCase().includes(searchLower) ||
        lead.email.toLowerCase().includes(searchLower) ||
        lead.referenceNumber.toLowerCase().includes(searchLower) ||
        lead.phone.includes(filters.search)
      );
    }

    if (filters.leadStatus) {
      filtered = filtered.filter(lead => lead.leadStatus === filters.leadStatus);
    }

    if (filters.priority) {
      filtered = filtered.filter(lead => lead.priority === filters.priority);
    }

    if (filters.lossType) {
      filtered = filtered.filter(lead => lead.lossType === filters.lossType);
    }

    if (filters.urgencyLevel) {
      filtered = filtered.filter(lead => lead.urgencyLevel === filters.urgencyLevel);
    }

    if (filters.utmSource) {
      filtered = filtered.filter(lead => lead.utmSource === filters.utmSource);
    }

    if (filters.dateFrom) {
      filtered = filtered.filter(lead => new Date(lead.createdAt) >= new Date(filters.dateFrom));
    }

    if (filters.dateTo) {
      filtered = filtered.filter(lead => new Date(lead.createdAt) <= new Date(filters.dateTo));
    }

    setFilteredLeads(filtered);
  };

  // Export leads to CSV
  const exportLeads = () => {
    const csvContent = [
      // Headers
      ['Reference', 'Name', 'Email', 'Phone', 'Loss Type', 'Estimated Loss', 'Priority', 'Status', 'UTM Source', 'UTM Campaign', 'Created Date'].join(','),
      // Data rows
      ...filteredLeads.map(lead => [
        lead.referenceNumber,
        `"${lead.name}"`,
        lead.email,
        lead.phone,
        `"${lead.lossType}"`,
        `"${lead.estimatedLoss}"`,
        lead.priority,
        lead.leadStatus,
        lead.utmSource || '',
        lead.utmCampaign || '',
        format(new Date(lead.createdAt), 'yyyy-MM-dd HH:mm:ss')
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `google-ads-leads-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Handle filter changes
  const handleFilterChange = (key: keyof LeadFilters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      leadStatus: '',
      priority: '',
      lossType: '',
      dateFrom: '',
      dateTo: '',
      search: '',
      urgencyLevel: '',
      utmSource: ''
    });
  };

  // Update lead status
  const handleUpdateStatus = async (leadId: string, newStatus: string) => {
    try {
      console.log(`[GoogleAdsLeads] Updating lead ${leadId} status to ${newStatus}`);
      
      // Get token once to avoid inconsistency between multiple calls
      const token = localStorage.getItem('recovery-office-token');
      
      const response = await fetch(`${GOOGLE_ADS_API.BASE_URL}${GOOGLE_ADS_API.ENDPOINTS.UPDATE_LEAD(leadId)}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'X-Client-Version': '1.0.0',
          'X-Request-Source': 'dashboard',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ status: newStatus })
      });

      const result = await response.json();
      
      if (result.success) {
        // Update local state
        setLeads(prev => prev.map(lead => 
          lead._id === leadId ? { ...lead, leadStatus: newStatus } : lead
        ));
        console.log('[GoogleAdsLeads] Lead status updated successfully');
      }
    } catch (error) {
      console.error('[GoogleAdsLeads] Error updating lead status:', error);
    }
  };

  // Fetch statistics from backend
  const fetchStats = async () => {
    try {
      console.log('[GoogleAdsLeads] Fetching stats...');
      
      // Get token once to avoid inconsistency between multiple calls
      const token = localStorage.getItem('recovery-office-token');
      
      const statsUrl = `${GOOGLE_ADS_API.BASE_URL}${GOOGLE_ADS_API.ENDPOINTS.STATS}`;
      console.log('[GoogleAdsLeads] Stats URL:', statsUrl);
      
      const response = await fetch(statsUrl, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'X-Client-Version': '1.0.0',
          'X-Request-Source': 'dashboard',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
      });
      
      console.log('[GoogleAdsLeads] Stats response status:', response.status);
      console.log('[GoogleAdsLeads] Stats response ok:', response.ok);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('[GoogleAdsLeads] Stats error response:', errorText);
        throw new Error(`Stats HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      console.log('[GoogleAdsLeads] Stats API response:', result);
      
      if (result.success && result.data && result.data.overview) {
        console.log('[GoogleAdsLeads] Setting stats from API:', result.data.overview);
        setStats(result.data.overview);
      } else {
        console.warn('[GoogleAdsLeads] Stats API response not as expected, calculating locally');
        calculateLocalStats();
      }
    } catch (error) {
      console.error('[GoogleAdsLeads] Error fetching stats, calculating locally:', error);
      calculateLocalStats();
    }
  };

  // Calculate stats from current leads (fallback)
  const calculateLocalStats = () => {
    console.log('[GoogleAdsLeads] Calculating local stats from', leads.length, 'leads');
    
    const newStats = leads.reduce((acc, lead) => {
      acc.totalLeads++;
      
      if (lead.leadStatus === 'new') acc.newLeads++;
      if (lead.leadStatus === 'contacted') acc.contactedLeads++;
      if (lead.leadStatus === 'converted') acc.convertedLeads++;
      if (lead.priority === 'emergency') acc.emergencyLeads++;
      
      acc.avgQualificationScore += lead.qualificationScore || 0;
      
      return acc;
    }, {
      totalLeads: 0,
      newLeads: 0,
      contactedLeads: 0,
      convertedLeads: 0,
      conversionRate: 0,
      totalValue: 0,
      avgQualificationScore: 0,
      emergencyLeads: 0
    });

    newStats.conversionRate = newStats.totalLeads > 0 ? (newStats.convertedLeads / newStats.totalLeads) * 100 : 0;
    newStats.avgQualificationScore = newStats.totalLeads > 0 ? newStats.avgQualificationScore / newStats.totalLeads : 0;

    console.log('[GoogleAdsLeads] Calculated local stats:', newStats);
    setStats(newStats);
  };

  // Effect hooks
  useEffect(() => {
    const initializeData = async () => {
      console.log('[GoogleAdsLeads] Initializing dashboard data...');
      await fetchLeads();
      await fetchStats();
    };
    
    initializeData();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, leads]);

  useEffect(() => {
    if (leads.length > 0) {
      console.log('[GoogleAdsLeads] Leads updated, recalculating stats locally as backup');
      calculateLocalStats();
    }
  }, [leads]);

  if (loading) {
    return (
      <DashboardLayout>
        <GoogleAdsLeadsContainer>
          <LoadingContainer>
            <LoadingSpinner />
            <div>Loading Google Ads leads...</div>
          </LoadingContainer>
        </GoogleAdsLeadsContainer>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <GoogleAdsLeadsContainer>
        <PageHeader>
          <PageTitle>Google Ads Leads ({filteredLeads.length})</PageTitle>
          <HeaderActions>
            <ActionButton onClick={exportLeads} variant="secondary">
              📊 Export CSV
            </ActionButton>
            <ActionButton onClick={async () => { await fetchLeads(); await fetchStats(); }} variant="primary">
              🔄 Refresh
            </ActionButton>
          </HeaderActions>
        </PageHeader>

        {/* Error Display */}
        {error && (
          <div style={{
            background: '#fed7d7',
            border: '1px solid #fc8181',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '24px',
            color: '#c53030'
          }}>
            <strong>Error:</strong> {error}
            <div style={{ marginTop: '8px', fontSize: '14px' }}>
              Please check the browser console for detailed error information.
            </div>
          </div>
        )}

        {/* Statistics Overview */}
        <StatsGrid>
          <StatCard>
            <StatIcon color="linear-gradient(135deg, #4CAF50 0%, #45a049 100%)">📊</StatIcon>
            <StatValue>{stats.totalLeads}</StatValue>
            <StatLabel>Total Leads</StatLabel>
          </StatCard>

          <StatCard>
            <StatIcon color="linear-gradient(135deg, #ff6b35 0%, #e55a31 100%)">🆕</StatIcon>
            <StatValue>{stats.newLeads}</StatValue>
            <StatLabel>New Leads</StatLabel>
          </StatCard>

          <StatCard>
            <StatIcon color="linear-gradient(135deg, #2196F3 0%, #1976D2 100%)">📞</StatIcon>
            <StatValue>{stats.contactedLeads}</StatValue>
            <StatLabel>Contacted</StatLabel>
          </StatCard>

          <StatCard>
            <StatIcon color="linear-gradient(135deg, #9C27B0 0%, #7B1FA2 100%)">💰</StatIcon>
            <StatValue>{stats.conversionRate.toFixed(1)}%</StatValue>
            <StatLabel>Conversion Rate</StatLabel>
          </StatCard>

          <StatCard>
            <StatIcon color="linear-gradient(135deg, #FF5722 0%, #D84315 100%)">🚨</StatIcon>
            <StatValue>{stats.emergencyLeads}</StatValue>
            <StatLabel>Emergency Leads</StatLabel>
          </StatCard>

          <StatCard>
            <StatIcon color="linear-gradient(135deg, #d69e2e 0%, #f6ad3a 100%)">⭐</StatIcon>
            <StatValue>{stats.avgQualificationScore.toFixed(1)}</StatValue>
            <StatLabel>Avg. Score</StatLabel>
          </StatCard>
        </StatsGrid>

        {/* Filters Section */}
        <FiltersContainer>
          <FiltersTitle>Filter & Search Leads</FiltersTitle>
          <FiltersGrid>
            <FilterInput
              type="text"
              placeholder="Search by name, email, or reference..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
            />
            
            <FilterSelect
              value={filters.leadStatus}
              onChange={(e) => handleFilterChange('leadStatus', e.target.value)}
            >
              <option value="">All Statuses</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="qualified">Qualified</option>
              <option value="converted">Converted</option>
              <option value="closed">Closed</option>
            </FilterSelect>

            <FilterSelect
              value={filters.priority}
              onChange={(e) => handleFilterChange('priority', e.target.value)}
            >
              <option value="">All Priorities</option>
              <option value="emergency">Emergency</option>
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="normal">Normal</option>
            </FilterSelect>

            <FilterSelect
              value={filters.lossType}
              onChange={(e) => handleFilterChange('lossType', e.target.value)}
            >
              <option value="">All Loss Types</option>
              <option value="cryptocurrency-recovery">Cryptocurrency</option>
              <option value="investment-fraud">Investment Fraud</option>
              <option value="romance-scam">Romance Scam</option>
              <option value="forex-scam">Forex Scam</option>
              <option value="business-email-compromise">Business Email</option>
              <option value="other-financial-fraud">Other Fraud</option>
            </FilterSelect>

            <FilterInput
              type="date"
              placeholder="From Date"
              value={filters.dateFrom}
              onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
            />

            <FilterInput
              type="date"
              placeholder="To Date"
              value={filters.dateTo}
              onChange={(e) => handleFilterChange('dateTo', e.target.value)}
            />
          </FiltersGrid>
          
          <FilterActions>
            <ActionButton onClick={clearFilters} variant="secondary">
              Clear Filters
            </ActionButton>
          </FilterActions>
        </FiltersContainer>

        {/* Leads Table */}
        <TableContainer>
          {filteredLeads.length > 0 ? (
            <Table>
              <TableHeader>
                <tr>
                  <TableHeaderCell>Lead Details</TableHeaderCell>
                  <TableHeaderCell>Contact Info</TableHeaderCell>
                  <TableHeaderCell>Loss Info</TableHeaderCell>
                  <TableHeaderCell>Priority</TableHeaderCell>
                  <TableHeaderCell>Status</TableHeaderCell>
                  <TableHeaderCell>UTM Data</TableHeaderCell>
                  <TableHeaderCell>Created</TableHeaderCell>
                  <TableHeaderCell>Actions</TableHeaderCell>
                </tr>
              </TableHeader>
              <TableBody>
                {filteredLeads.map((lead) => (
                  <TableRow key={lead._id}>
                    <TableCell>
                      <LeadInfo>
                        <div className="name">
                          {lead.name}
                        </div>
                        <div className="reference">{lead.referenceNumber}</div>
                      </LeadInfo>
                    </TableCell>
                    
                    <TableCell>
                      <ContactInfo>
                        <div className="email">{lead.email}</div>
                        <div className="phone">{lead.phone}</div>
                      </ContactInfo>
                    </TableCell>
                    
                    <TableCell>
                      <div style={{ fontSize: '14px' }}>
                        <div style={{ fontWeight: '600', marginBottom: '4px' }}>
                          {lead.estimatedLoss}
                        </div>
                        <div style={{ fontSize: '12px', color: '#4a5568' }}>
                          {lead.lossType}
                        </div>
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <PriorityBadge priority={lead.priority}>
                        {lead.priority}
                      </PriorityBadge>
                    </TableCell>
                    
                    <TableCell>
                      <StatusBadge status={lead.leadStatus}>
                        {lead.leadStatus}
                      </StatusBadge>
                    </TableCell>
                    
                    <TableCell>
                      <UTMInfo>
                        <div className="source">{lead.utmSource || 'Direct'}</div>
                        <div className="medium">{lead.utmMedium || 'N/A'}</div>
                      </UTMInfo>
                    </TableCell>
                    
                    <TableCell>
                      {format(new Date(lead.createdAt), 'MMM dd, yyyy HH:mm')}
                    </TableCell>
                    
                    <TableCell>
                      <ActionButtons>
                        <TableActionButton onClick={() => handleUpdateStatus(lead._id, 'contacted')}>
                          Contact
                        </TableActionButton>
                      </ActionButtons>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <EmptyState>
              <h3>No Google Ads leads found</h3>
              <p>No leads match your current filters. Try adjusting your search criteria.</p>
            </EmptyState>
          )}
        </TableContainer>
      </GoogleAdsLeadsContainer>
    </DashboardLayout>
  );
};

export default GoogleAdsLeads; 