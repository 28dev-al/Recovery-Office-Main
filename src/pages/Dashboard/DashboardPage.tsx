import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { DashboardLayout } from '../../components/dashboard/DashboardLayout';
import { dashboardApi, type OverviewStats, type RecentBooking, type Activity } from '../../services/dashboardApi';

const DashboardContent = styled.div`
  padding: 24px;
  max-width: 1400px;
  margin: 0 auto;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
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

const StatIcon = styled.div`
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #d69e2e 0%, #f6ad3a 100%);
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

const SectionGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const Section = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const SectionHeader = styled.div`
  padding: 20px 24px;
  border-bottom: 1px solid #e2e8f0;
  background: #f8fafc;
`;

const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #1a365d;
  margin: 0;
`;

const SectionContent = styled.div`
  padding: 24px;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
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

const ErrorContainer = styled.div`
  background: #fed7d7;
  border: 1px solid #feb2b2;
  border-radius: 8px;
  padding: 16px;
  color: #c53030;
  text-align: center;
`;

const BookingItem = styled.div`
  padding: 12px 0;
  border-bottom: 1px solid #e2e8f0;

  &:last-child {
    border-bottom: none;
  }
`;

const BookingClient = styled.div`
  font-weight: 600;
  color: #1a365d;
  margin-bottom: 4px;
`;

const BookingService = styled.div`
  font-size: 14px;
  color: #4a5568;
  margin-bottom: 4px;
`;

const BookingMeta = styled.div`
  font-size: 12px;
  color: #718096;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StatusBadge = styled.span<{ status: string }>`
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;

  ${({ status }) => {
    switch (status) {
      case 'confirmed':
        return 'background: #c6f6d5; color: #2f855a;';
      case 'pending':
        return 'background: #fed7d7; color: #c53030;';
      case 'completed':
        return 'background: #bee3f8; color: #2b6cb0;';
      default:
        return 'background: #e2e8f0; color: #4a5568;';
    }
  }}
`;

const ActivityItem = styled.div`
  padding: 12px 0;
  border-bottom: 1px solid #e2e8f0;

  &:last-child {
    border-bottom: none;
  }
`;

const ActivityDescription = styled.div`
  font-weight: 600;
  color: #1a365d;
  font-size: 14px;
  margin-bottom: 4px;
`;

const ActivityTime = styled.div`
  font-size: 12px;
  color: #718096;
`;

const EmptyState = styled.div`
  text-align: center;
  color: #4a5568;
  padding: 40px;
  font-style: italic;
`;

// Utility functions for data formatting
const formatDate = (dateString: string) => {
  if (!dateString) return 'Not set';
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  } catch {
    return 'Invalid date';
  }
};

const formatTime = (timeString: string) => {
  if (!timeString || timeString === 'TBD') return 'To be confirmed';
  return timeString;
};

const formatCurrency = (amount: number) => {
  if (!amount || amount === 0) return 'Quote required';
  return `£${amount.toLocaleString()}`;
};

const getClientName = (booking: RecentBooking) => {
  // Try different ways to get client name
  if (booking.clientName && booking.clientName !== 'Unknown Client') {
    return booking.clientName;
  }
  return 'Client name pending';
};

export const DashboardPage: React.FC = () => {
  const [overviewStats, setOverviewStats] = useState<OverviewStats | null>(null);
  const [recentBookings, setRecentBookings] = useState<RecentBooking[]>([]);
  const [recentActivities, setRecentActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log('[Dashboard] Fetching data from Railway backend...');
        
        const [statsResult, bookingsResult, activitiesResult] = await Promise.all([
          dashboardApi.getOverviewStats(),
          dashboardApi.getRecentBookings(10),
          dashboardApi.getRecentActivities(15)
        ]);

        console.log('[Dashboard] API Results:', { statsResult, bookingsResult, activitiesResult });

        if (statsResult?.data) {
          setOverviewStats(statsResult.data);
          console.log('[Dashboard] Stats loaded:', statsResult.data);
        }

        if (bookingsResult?.data) {
          setRecentBookings(Array.isArray(bookingsResult.data) ? bookingsResult.data : []);
          console.log('[Dashboard] Bookings loaded:', bookingsResult.data.length);
        }

        if (activitiesResult?.data) {
          setRecentActivities(Array.isArray(activitiesResult.data) ? activitiesResult.data : []);
          console.log('[Dashboard] Activities loaded:', activitiesResult.data.length);
        }

      } catch (error) {
        console.error('[Dashboard] Error loading data:', error);
        setError('Failed to load dashboard data. Please check backend connection.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <DashboardContent>
          <LoadingContainer>
            <LoadingSpinner />
            <div>Loading dashboard data...</div>
          </LoadingContainer>
        </DashboardContent>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <DashboardContent>
          <ErrorContainer>
            <h3>Dashboard Error</h3>
            <p>{error}</p>
            <button onClick={() => window.location.reload()}>Retry</button>
          </ErrorContainer>
        </DashboardContent>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <DashboardContent>
        <StatsGrid>
          <StatCard>
            <StatIcon>📊</StatIcon>
            <StatValue>
              {typeof overviewStats?.totalBookings === 'number' 
                ? overviewStats.totalBookings 
                : overviewStats?.totalBookings?.thisMonth || 0}
            </StatValue>
            <StatLabel>Total Bookings</StatLabel>
          </StatCard>

          <StatCard>
            <StatIcon>💰</StatIcon>
            <StatValue>
              £{(typeof overviewStats?.totalRevenue === 'number' 
                ? overviewStats.totalRevenue 
                : overviewStats?.totalRevenue?.amount || 0).toLocaleString()}
            </StatValue>
            <StatLabel>Total Revenue</StatLabel>
          </StatCard>
          
          <StatCard>
            <StatIcon>👥</StatIcon>
            <StatValue>
              {typeof overviewStats?.activeClients === 'number' 
                ? overviewStats.activeClients 
                : overviewStats?.activeClients?.count || 0}
            </StatValue>
            <StatLabel>Active Clients</StatLabel>
          </StatCard>
          
          <StatCard>
            <StatIcon>📈</StatIcon>
            <StatValue>
              {(typeof overviewStats?.successRate === 'number' 
                ? overviewStats.successRate 
                : overviewStats?.successRate?.percentage || 0).toFixed(1)}%
            </StatValue>
            <StatLabel>Success Rate</StatLabel>
          </StatCard>
        </StatsGrid>

        <SectionGrid>
          <Section>
            <SectionHeader>
              <SectionTitle>Recent Bookings ({recentBookings.length})</SectionTitle>
            </SectionHeader>
            <SectionContent>
              {recentBookings.length > 0 ? (
                <div>
                  {recentBookings.map((booking) => (
                    <BookingItem key={booking._id}>
                      <BookingClient>{getClientName(booking)}</BookingClient>
                      <BookingService>{booking.serviceName}</BookingService>
                      <BookingMeta>
                        <span>{formatDate(booking.date)}</span>
                        <StatusBadge status={booking.status}>{booking.status}</StatusBadge>
                      </BookingMeta>
                    </BookingItem>
                  ))}
                </div>
              ) : (
                <EmptyState>No recent bookings found</EmptyState>
              )}
            </SectionContent>
          </Section>

          <Section>
            <SectionHeader>
              <SectionTitle>Recent Activities ({recentActivities.length})</SectionTitle>
            </SectionHeader>
            <SectionContent>
              {recentActivities.length > 0 ? (
                <div>
                  {recentActivities.map((activity) => (
                    <ActivityItem key={activity._id}>
                      <ActivityDescription>{activity.description}</ActivityDescription>
                      <ActivityTime>
                        {formatTime(activity.timestamp)}
                      </ActivityTime>
                    </ActivityItem>
                  ))}
                </div>
              ) : (
                <EmptyState>No recent activities found</EmptyState>
              )}
            </SectionContent>
          </Section>
        </SectionGrid>
      </DashboardContent>
    </DashboardLayout>
  );
};

export default DashboardPage; 