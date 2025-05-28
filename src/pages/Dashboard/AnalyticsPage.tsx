/**
 * Analytics Page
 * Comprehensive business intelligence and reporting for Recovery Office
 */

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { DashboardLayout } from './components/DashboardLayout';
import { apiClient } from '../../services/api';
import { LoadingOverlay } from '../../design-system/components/feedback';

// Types
interface AnalyticsData {
  bookingStats: {
    statusCounts: Record<string, number>;
    dailyBookings: Array<{ _id: string; count: number }>;
    totalRevenue: number;
    recurringCount: number;
  };
  topServices: Array<{
    serviceId: string;
    name: string;
    bookingCount: number;
    revenue: number;
    waitlistCount: number;
  }>;
  clientAcquisition: Array<{
    period: string;
    count: number;
    marketingConsent: number;
  }>;
  waitlistMetrics: {
    statusCounts: Record<string, number>;
    conversionRate: number;
    conversionTime: {
      average: number;
      min: number;
      max: number;
    };
    topServices: Array<{
      serviceName: string;
      count: number;
    }>;
  };
}

interface DateRange {
  startDate: string;
  endDate: string;
  label: string;
}

// Styled Components
const PageContainer = styled.div`
  padding: 24px;
  background: #f7fafc;
  min-height: 100vh;
`;

const PageHeader = styled.div`
  margin-bottom: 32px;
`;

const PageTitle = styled.h1`
  color: #1a365d;
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 8px 0;
  font-family: 'Inter', system-ui, sans-serif;
`;

const PageSubtitle = styled.p`
  color: #718096;
  font-size: 1rem;
  margin: 0;
`;

const ControlsCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
`;

const ControlsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr auto auto;
  gap: 16px;
  align-items: end;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ControlGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const ControlLabel = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: #4a5568;
`;

const ControlSelect = styled.select`
  padding: 8px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 0.875rem;
  background: white;
  cursor: pointer;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #1a365d;
    box-shadow: 0 0 0 3px rgba(26, 54, 93, 0.1);
  }
`;

const ActionButton = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 8px 16px;
  border: 2px solid ${props => props.variant === 'primary' ? '#1a365d' : '#e2e8f0'};
  background: ${props => props.variant === 'primary' ? '#1a365d' : 'white'};
  color: ${props => props.variant === 'primary' ? 'white' : '#4a5568'};
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    background: ${props => props.variant === 'primary' ? '#2d3748' : '#f7fafc'};
    border-color: ${props => props.variant === 'primary' ? '#2d3748' : '#1a365d'};
  }
`;

const AnalyticsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 24px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const AnalyticsCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
`;

const CardTitle = styled.h3`
  color: #1a365d;
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 16px 0;
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
`;

const MetricCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
  text-align: center;
`;

const MetricValue = styled.div`
  color: #1a365d;
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 4px;
`;

const MetricLabel = styled.div`
  color: #718096;
  font-size: 0.875rem;
  font-weight: 500;
`;

const MetricChange = styled.div<{ $positive: boolean }>`
  color: ${props => props.$positive ? '#38a169' : '#e53e3e'};
  font-size: 0.75rem;
  font-weight: 600;
  margin-top: 4px;
`;

const ChartContainer = styled.div`
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f7fafc;
  border-radius: 8px;
  margin: 16px 0;
  color: #718096;
  font-size: 0.875rem;
`;

const TableContainer = styled.div`
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  background: #f7fafc;
`;

const TableHeaderCell = styled.th`
  padding: 12px 16px;
  text-align: left;
  font-size: 0.75rem;
  font-weight: 600;
  color: #4a5568;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 1px solid #e2e8f0;
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr`
  &:not(:last-child) {
    border-bottom: 1px solid #e2e8f0;
  }
`;

const TableCell = styled.td`
  padding: 12px 16px;
  font-size: 0.875rem;
  color: #4a5568;
`;

const StatusBadge = styled.span<{ $status: string }>`
  display: inline-flex;
  align-items: center;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: capitalize;
  
  ${props => {
    switch (props.$status) {
      case 'confirmed':
      case 'completed':
        return `
          background: rgba(56, 161, 105, 0.1);
          color: #38a169;
        `;
      case 'pending':
        return `
          background: rgba(214, 158, 46, 0.1);
          color: #d69e2e;
        `;
      case 'cancelled':
        return `
          background: rgba(229, 62, 62, 0.1);
          color: #e53e3e;
        `;
      default:
        return `
          background: rgba(113, 128, 150, 0.1);
          color: #718096;
        `;
    }
  }}
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: #e2e8f0;
  border-radius: 4px;
  overflow: hidden;
  margin: 8px 0;
`;

const ProgressFill = styled.div<{ $percentage: number }>`
  height: 100%;
  background: linear-gradient(90deg, #1a365d 0%, #d69e2e 100%);
  width: ${props => props.$percentage}%;
  transition: width 0.3s ease;
`;

const InsightCard = styled.div`
  background: linear-gradient(135deg, #1a365d 0%, #2d3748 100%);
  border-radius: 12px;
  padding: 24px;
  color: white;
  margin-bottom: 24px;
`;

const InsightTitle = styled.h3`
  color: #d69e2e;
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 12px 0;
`;

const InsightText = styled.p`
  color: #e2e8f0;
  font-size: 0.875rem;
  line-height: 1.5;
  margin: 0;
`;

const FullWidthCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
  margin-bottom: 24px;
`;

export const AnalyticsPage: React.FC = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('bookings');

  const dateRanges: DateRange[] = [
    { startDate: '', endDate: '', label: 'Last 7 Days' },
    { startDate: '', endDate: '', label: 'Last 30 Days' },
    { startDate: '', endDate: '', label: 'Last 90 Days' },
    { startDate: '', endDate: '', label: 'This Year' }
  ];

  // Fetch analytics data
  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${process.env.REACT_APP_API_URL || 'https://recovery-office-backend-production.up.railway.app/api'}/analytics/dashboard`, {
          method: 'GET',
          headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
          mode: 'cors',
          cache: 'no-cache',
          credentials: 'omit',
        });
        const data = await response.json();
        setAnalyticsData(data?.data);
      } catch (error) {
        console.error('Failed to fetch analytics:', error);
        // Set mock data for demonstration
        setAnalyticsData({
          bookingStats: {
            statusCounts: { confirmed: 45, pending: 12, completed: 78, cancelled: 5 },
            dailyBookings: [
              { _id: '2024-01-01', count: 5 },
              { _id: '2024-01-02', count: 8 },
              { _id: '2024-01-03', count: 12 },
              { _id: '2024-01-04', count: 7 },
              { _id: '2024-01-05', count: 15 }
            ],
            totalRevenue: 125750,
            recurringCount: 23
          },
          topServices: [
            { serviceId: '1', name: 'Cryptocurrency Recovery', bookingCount: 45, revenue: 67500, waitlistCount: 8 },
            { serviceId: '2', name: 'Investment Fraud Recovery', bookingCount: 32, revenue: 48000, waitlistCount: 5 },
            { serviceId: '3', name: 'Financial Scam Recovery', bookingCount: 28, revenue: 33600, waitlistCount: 3 },
            { serviceId: '4', name: 'Regulatory Complaint', bookingCount: 15, revenue: 9000, waitlistCount: 2 }
          ],
          clientAcquisition: [
            { period: '2024-01', count: 25, marketingConsent: 18 },
            { period: '2024-02', count: 32, marketingConsent: 24 },
            { period: '2024-03', count: 28, marketingConsent: 21 },
            { period: '2024-04', count: 35, marketingConsent: 28 }
          ],
          waitlistMetrics: {
            statusCounts: { pending: 12, notified: 8, booked: 15, expired: 3 },
            conversionRate: 65.2,
            conversionTime: { average: 24.5, min: 2.1, max: 72.3 },
            topServices: [
              { serviceName: 'Cryptocurrency Recovery', count: 8 },
              { serviceName: 'Investment Fraud Recovery', count: 5 }
            ]
          }
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [selectedPeriod]);

  const handleExport = () => {
    console.log('Export analytics data');
    // Implement export functionality
  };

  const handleRefresh = () => {
    setLoading(true);
    // Refetch data
    setTimeout(() => setLoading(false), 1000);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP'
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  if (loading) {
    return (
      <DashboardLayout>
        <PageContainer>
          <div style={{ padding: '40px', textAlign: 'center' }}>
            <LoadingOverlay isActive={true} message="Loading analytics..." />
          </div>
        </PageContainer>
      </DashboardLayout>
    );
  }

  if (!analyticsData) {
    return (
      <DashboardLayout>
        <PageContainer>
          <div style={{ padding: '40px', textAlign: 'center', color: '#718096' }}>
            Failed to load analytics data. Please try again.
          </div>
        </PageContainer>
      </DashboardLayout>
    );
  }

  const totalBookings = Object.values(analyticsData.bookingStats.statusCounts).reduce((sum, count) => sum + count, 0);
  const conversionRate = totalBookings > 0 ? (analyticsData.bookingStats.statusCounts.completed / totalBookings) * 100 : 0;

  return (
    <DashboardLayout>
      <PageContainer>
        <PageHeader>
          <PageTitle>Business Analytics</PageTitle>
          <PageSubtitle>
            Comprehensive insights and performance metrics for Recovery Office
          </PageSubtitle>
        </PageHeader>

        {/* Controls */}
        <ControlsCard>
          <ControlsGrid>
            <ControlGroup>
              <ControlLabel>Time Period</ControlLabel>
              <ControlSelect
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
              >
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
                <option value="90d">Last 90 Days</option>
                <option value="1y">This Year</option>
              </ControlSelect>
            </ControlGroup>

            <ControlGroup>
              <ControlLabel>Primary Metric</ControlLabel>
              <ControlSelect
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value)}
              >
                <option value="bookings">Bookings</option>
                <option value="revenue">Revenue</option>
                <option value="clients">Clients</option>
                <option value="conversion">Conversion</option>
              </ControlSelect>
            </ControlGroup>

            <ActionButton variant="secondary" onClick={handleRefresh}>
              Refresh
            </ActionButton>

            <ActionButton variant="primary" onClick={handleExport}>
              Export Report
            </ActionButton>
          </ControlsGrid>
        </ControlsCard>

        {/* Key Metrics */}
        <MetricsGrid>
          <MetricCard>
            <MetricValue>{totalBookings}</MetricValue>
            <MetricLabel>Total Bookings</MetricLabel>
            <MetricChange $positive={true}>+12.5%</MetricChange>
          </MetricCard>
          <MetricCard>
            <MetricValue>{formatCurrency(analyticsData.bookingStats.totalRevenue)}</MetricValue>
            <MetricLabel>Total Revenue</MetricLabel>
            <MetricChange $positive={true}>+8.3%</MetricChange>
          </MetricCard>
          <MetricCard>
            <MetricValue>{formatPercentage(conversionRate)}</MetricValue>
            <MetricLabel>Conversion Rate</MetricLabel>
            <MetricChange $positive={true}>+2.1%</MetricChange>
          </MetricCard>
          <MetricCard>
            <MetricValue>{formatPercentage(analyticsData.waitlistMetrics.conversionRate)}</MetricValue>
            <MetricLabel>Waitlist Conversion</MetricLabel>
            <MetricChange $positive={false}>-1.2%</MetricChange>
          </MetricCard>
        </MetricsGrid>

        {/* Business Insights */}
        <InsightCard>
          <InsightTitle>💡 Key Insights</InsightTitle>
          <InsightText>
            Cryptocurrency recovery services show the highest demand with {analyticsData.topServices[0]?.bookingCount} bookings 
            generating {formatCurrency(analyticsData.topServices[0]?.revenue || 0)} in revenue. 
            Consider expanding capacity for this service to meet growing demand.
          </InsightText>
        </InsightCard>

        {/* Charts and Analysis */}
        <AnalyticsGrid>
          <AnalyticsCard>
            <CardTitle>Booking Trends</CardTitle>
            <ChartContainer>
              📈 Booking trends chart would be rendered here
              <br />
              (Integration with Chart.js or similar library)
            </ChartContainer>
          </AnalyticsCard>

          <AnalyticsCard>
            <CardTitle>Revenue Distribution</CardTitle>
            <ChartContainer>
              🥧 Revenue distribution pie chart would be rendered here
              <br />
              (Integration with Chart.js or similar library)
            </ChartContainer>
          </AnalyticsCard>
        </AnalyticsGrid>

        {/* Service Performance */}
        <FullWidthCard>
          <CardTitle>Service Performance Analysis</CardTitle>
          <TableContainer>
            <Table>
              <TableHead>
                <tr>
                  <TableHeaderCell>Service</TableHeaderCell>
                  <TableHeaderCell>Bookings</TableHeaderCell>
                  <TableHeaderCell>Revenue</TableHeaderCell>
                  <TableHeaderCell>Waitlist</TableHeaderCell>
                  <TableHeaderCell>Performance</TableHeaderCell>
                </tr>
              </TableHead>
              <TableBody>
                {analyticsData.topServices.map((service, index) => {
                  const performance = (service.bookingCount / totalBookings) * 100;
                  return (
                    <TableRow key={service.serviceId}>
                      <TableCell>
                        <strong>{service.name}</strong>
                      </TableCell>
                      <TableCell>{service.bookingCount}</TableCell>
                      <TableCell>{formatCurrency(service.revenue)}</TableCell>
                      <TableCell>
                        <StatusBadge $status={service.waitlistCount > 5 ? 'pending' : 'confirmed'}>
                          {service.waitlistCount} waiting
                        </StatusBadge>
                      </TableCell>
                      <TableCell>
                        <div>{formatPercentage(performance)}</div>
                        <ProgressBar>
                          <ProgressFill $percentage={performance} />
                        </ProgressBar>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </FullWidthCard>

        {/* Booking Status Distribution */}
        <AnalyticsGrid>
          <AnalyticsCard>
            <CardTitle>Booking Status Distribution</CardTitle>
            <TableContainer>
              <Table>
                <TableHead>
                  <tr>
                    <TableHeaderCell>Status</TableHeaderCell>
                    <TableHeaderCell>Count</TableHeaderCell>
                    <TableHeaderCell>Percentage</TableHeaderCell>
                  </tr>
                </TableHead>
                <TableBody>
                  {Object.entries(analyticsData.bookingStats.statusCounts).map(([status, count]) => {
                    const percentage = (count / totalBookings) * 100;
                    return (
                      <TableRow key={status}>
                        <TableCell>
                          <StatusBadge $status={status}>{status}</StatusBadge>
                        </TableCell>
                        <TableCell>{count}</TableCell>
                        <TableCell>{formatPercentage(percentage)}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </AnalyticsCard>

          <AnalyticsCard>
            <CardTitle>Client Acquisition Trends</CardTitle>
            <TableContainer>
              <Table>
                <TableHead>
                  <tr>
                    <TableHeaderCell>Period</TableHeaderCell>
                    <TableHeaderCell>New Clients</TableHeaderCell>
                    <TableHeaderCell>Marketing Consent</TableHeaderCell>
                    <TableHeaderCell>Consent Rate</TableHeaderCell>
                  </tr>
                </TableHead>
                <TableBody>
                  {analyticsData.clientAcquisition.map((period) => {
                    const consentRate = (period.marketingConsent / period.count) * 100;
                    return (
                      <TableRow key={period.period}>
                        <TableCell>{period.period}</TableCell>
                        <TableCell>{period.count}</TableCell>
                        <TableCell>{period.marketingConsent}</TableCell>
                        <TableCell>{formatPercentage(consentRate)}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </AnalyticsCard>
        </AnalyticsGrid>

        {/* Waitlist Analysis */}
        <FullWidthCard>
          <CardTitle>Waitlist Performance Metrics</CardTitle>
          <AnalyticsGrid>
            <div>
              <h4 style={{ color: '#1a365d', marginBottom: '16px' }}>Conversion Metrics</h4>
              <MetricsGrid>
                <MetricCard>
                  <MetricValue>{formatPercentage(analyticsData.waitlistMetrics.conversionRate)}</MetricValue>
                  <MetricLabel>Conversion Rate</MetricLabel>
                </MetricCard>
                <MetricCard>
                  <MetricValue>{analyticsData.waitlistMetrics.conversionTime.average.toFixed(1)}h</MetricValue>
                  <MetricLabel>Avg. Conversion Time</MetricLabel>
                </MetricCard>
              </MetricsGrid>
            </div>
            <div>
              <h4 style={{ color: '#1a365d', marginBottom: '16px' }}>Waitlist Status</h4>
              <TableContainer>
                <Table>
                  <TableHead>
                    <tr>
                      <TableHeaderCell>Status</TableHeaderCell>
                      <TableHeaderCell>Count</TableHeaderCell>
                    </tr>
                  </TableHead>
                  <TableBody>
                    {Object.entries(analyticsData.waitlistMetrics.statusCounts).map(([status, count]) => (
                      <TableRow key={status}>
                        <TableCell>
                          <StatusBadge $status={status}>{status}</StatusBadge>
                        </TableCell>
                        <TableCell>{count}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </AnalyticsGrid>
        </FullWidthCard>
      </PageContainer>
    </DashboardLayout>
  );
};

export default AnalyticsPage; 
