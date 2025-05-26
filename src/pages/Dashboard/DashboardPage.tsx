/**
 * Recovery Office Dashboard - Main Overview Page
 * Professional admin panel for financial recovery services
 */

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { DashboardLayout } from './components/DashboardLayout';
import { StatsGrid } from './components/StatsGrid';
import { RecentBookings } from './components/RecentBookings';
import { ClientActivity } from './components/ClientActivity';
import { QuickActions } from './components/QuickActions';
import { PerformanceCharts } from './components/PerformanceCharts';
import { dashboardApi } from '../../services/dashboardApi';
import { LoadingOverlay } from '../../design-system/components/feedback';
import { ErrorBoundary } from '../../components/common/ErrorBoundary';

// Types
interface OverviewStats {
  totalBookings: {
    today: number;
    thisWeek: number;
    thisMonth: number;
    change: number;
  };
  totalRevenue: {
    amount: number;
    currency: string;
    change: number;
    period: string;
  };
  activeClients: {
    count: number;
    change: number;
  };
  successRate: {
    percentage: number;
    change: number;
  };
  averageCaseValue: {
    amount: number;
    currency: string;
    change: number;
  };
}

interface DashboardData {
  stats: OverviewStats;
  recentBookings: any[];
  recentActivities: any[];
  chartData: any;
}

// Styled Components
const DashboardContainer = styled.div`
  padding: 24px;
  background: #f7fafc;
  min-height: 100vh;
`;

const DashboardHeader = styled.div`
  margin-bottom: 32px;
`;

const PageTitle = styled.h1`
  color: #1a365d;
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0 0 8px 0;
  font-family: 'Inter', system-ui, sans-serif;
`;

const PageSubtitle = styled.p`
  color: #718096;
  font-size: 1.1rem;
  margin: 0;
  font-weight: 400;
`;

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 24px;
  margin-bottom: 32px;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const ChartsSection = styled.div`
  margin-top: 32px;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const ErrorContainer = styled.div`
  background: #fed7d7;
  border: 1px solid #feb2b2;
  border-radius: 8px;
  padding: 16px;
  margin: 16px 0;
  color: #c53030;
  text-align: center;
`;

// Main Dashboard Component
export const DashboardPage: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // Fetch dashboard data
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [stats, recentBookings, recentActivities, chartData] = await Promise.all([
        dashboardApi.getOverviewStats(),
        dashboardApi.getRecentBookings(10),
        dashboardApi.getRecentActivities(20),
        dashboardApi.getChartData('30d')
      ]);

      setDashboardData({
        stats,
        recentBookings,
        recentActivities,
        chartData
      });

      setLastUpdated(new Date());
    } catch (err) {
      console.error('Failed to fetch dashboard data:', err);
      setError('Failed to load dashboard data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Auto-refresh every 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      fetchDashboardData();
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(interval);
  }, []);

  // Real-time updates subscription
  useEffect(() => {
    const unsubscribe = dashboardApi.subscribeToUpdates((update: unknown) => {
      console.log('Real-time update received:', update);
      // Type-safe handling of real-time updates
      if (typeof update === 'object' && update !== null && 'type' in update) {
        const typedUpdate = update as { type: string };
        if (typedUpdate.type === 'booking' || typedUpdate.type === 'client') {
          fetchDashboardData();
        }
      }
    });

    return unsubscribe;
  }, [fetchDashboardData]);

  if (loading && !dashboardData) {
    return (
      <DashboardLayout>
        <LoadingContainer>
          <LoadingOverlay isActive={true} message="Loading dashboard..." />
        </LoadingContainer>
      </DashboardLayout>
    );
  }

  if (error && !dashboardData) {
    return (
      <DashboardLayout>
        <ErrorContainer>
          <h3>Error Loading Dashboard</h3>
          <p>{error}</p>
          <button onClick={fetchDashboardData}>Retry</button>
        </ErrorContainer>
      </DashboardLayout>
    );
  }

  return (
    <ErrorBoundary>
      <DashboardLayout>
        <DashboardContainer>
          <DashboardHeader>
            <PageTitle>Recovery Office Dashboard</PageTitle>
            <PageSubtitle>
              Welcome back! Here's what's happening with your recovery services today.
              Last updated: {lastUpdated.toLocaleTimeString()}
            </PageSubtitle>
          </DashboardHeader>

          {/* Quick Actions */}
          <QuickActions />

          {/* Statistics Grid */}
          {dashboardData?.stats && (
            <StatsGrid stats={dashboardData.stats} loading={loading} />
          )}

          {/* Main Dashboard Grid */}
          <DashboardGrid>
            <MainContent>
              {/* Recent Bookings */}
              {dashboardData?.recentBookings && (
                <RecentBookings 
                  bookings={dashboardData.recentBookings}
                  loading={loading}
                />
              )}
            </MainContent>

            <Sidebar>
              {/* Client Activity Feed */}
              {dashboardData?.recentActivities && (
                <ClientActivity 
                  activities={dashboardData.recentActivities}
                  loading={loading}
                />
              )}
            </Sidebar>
          </DashboardGrid>

          {/* Performance Charts */}
          <ChartsSection>
            {dashboardData?.chartData && (
              <PerformanceCharts 
                data={dashboardData.chartData}
                loading={loading}
              />
            )}
          </ChartsSection>
        </DashboardContainer>
      </DashboardLayout>
    </ErrorBoundary>
  );
};

export default DashboardPage; 