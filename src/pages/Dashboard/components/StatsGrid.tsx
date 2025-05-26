/**
 * Statistics Grid Component
 * Displays key metrics cards for Recovery Office dashboard
 */

import React from 'react';
import styled from 'styled-components';
import { OverviewStats } from '../../../services/dashboardApi';

interface StatsGridProps {
  stats: OverviewStats;
  loading?: boolean;
}

// Styled Components
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
`;

const StatCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }
`;

const StatHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const StatIcon = styled.div<{ $color: string }>`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  background: ${props => props.$color};
  color: white;
`;

const StatTitle = styled.h3`
  color: #718096;
  font-size: 0.875rem;
  font-weight: 500;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #1a365d;
  margin: 8px 0;
  line-height: 1.2;
`;

const StatSubValue = styled.div`
  font-size: 0.875rem;
  color: #718096;
  margin-bottom: 12px;
`;

const StatChange = styled.div<{ $positive: boolean }>`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.875rem;
  font-weight: 600;
  color: ${props => props.$positive ? '#38a169' : '#e53e3e'};
`;

const ChangeIcon = styled.span<{ $positive: boolean }>`
  font-size: 12px;
  transform: ${props => props.$positive ? 'rotate(0deg)' : 'rotate(180deg)'};
`;

const LoadingSkeleton = styled.div`
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: 4px;
  height: 20px;
  margin: 8px 0;

  @keyframes loading {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;

const StatCardSkeleton = styled(StatCard)`
  &:hover {
    transform: none;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
`;

// Format currency
const formatCurrency = (amount: number, currency: string = 'GBP'): string => {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Format percentage
const formatPercentage = (value: number): string => {
  return `${value.toFixed(1)}%`;
};

// Format number with commas
const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('en-GB').format(value);
};

// Loading skeleton component
const StatCardSkeletonComponent: React.FC = () => (
  <StatCardSkeleton>
    <StatHeader>
      <div>
        <LoadingSkeleton style={{ width: '120px', height: '14px' }} />
        <LoadingSkeleton style={{ width: '80px', height: '32px', margin: '8px 0' }} />
        <LoadingSkeleton style={{ width: '100px', height: '14px' }} />
      </div>
      <LoadingSkeleton style={{ width: '48px', height: '48px', borderRadius: '12px' }} />
    </StatHeader>
  </StatCardSkeleton>
);

export const StatsGrid: React.FC<StatsGridProps> = ({ stats, loading = false }) => {
  if (loading) {
    return (
      <GridContainer>
        {Array.from({ length: 5 }).map((_, index) => (
          <StatCardSkeletonComponent key={index} />
        ))}
      </GridContainer>
    );
  }

  const statsConfig = [
    {
      title: 'Total Bookings',
      value: formatNumber(stats.totalBookings.thisMonth),
      subValue: `${formatNumber(stats.totalBookings.today)} today, ${formatNumber(stats.totalBookings.thisWeek)} this week`,
      change: stats.totalBookings.change,
      icon: '📅',
      color: '#1a365d'
    },
    {
      title: 'Total Revenue',
      value: formatCurrency(stats.totalRevenue.amount, stats.totalRevenue.currency),
      subValue: stats.totalRevenue.period,
      change: stats.totalRevenue.change,
      icon: '💰',
      color: '#d69e2e'
    },
    {
      title: 'Active Clients',
      value: formatNumber(stats.activeClients.count),
      subValue: 'Currently engaged',
      change: stats.activeClients.change,
      icon: '👥',
      color: '#38a169'
    },
    {
      title: 'Success Rate',
      value: formatPercentage(stats.successRate.percentage),
      subValue: 'Completed cases',
      change: stats.successRate.change,
      icon: '✅',
      color: '#805ad5'
    },
    {
      title: 'Avg Case Value',
      value: formatCurrency(stats.averageCaseValue.amount, stats.averageCaseValue.currency),
      subValue: 'Per case',
      change: stats.averageCaseValue.change,
      icon: '📊',
      color: '#e53e3e'
    }
  ];

  return (
    <GridContainer>
      {statsConfig.map((stat, index) => (
        <StatCard key={index}>
          <StatHeader>
            <div>
              <StatTitle>{stat.title}</StatTitle>
              <StatValue>{stat.value}</StatValue>
              <StatSubValue>{stat.subValue}</StatSubValue>
              <StatChange $positive={stat.change >= 0}>
                <ChangeIcon $positive={stat.change >= 0}>▲</ChangeIcon>
                {Math.abs(stat.change)}% vs last period
              </StatChange>
            </div>
            <StatIcon $color={stat.color}>
              {stat.icon}
            </StatIcon>
          </StatHeader>
        </StatCard>
      ))}
    </GridContainer>
  );
};

export default StatsGrid; 