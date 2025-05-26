/**
 * Performance Charts Component
 * Displays business analytics charts for Recovery Office dashboard
 */

import React, { useState } from 'react';
import styled from 'styled-components';
import { ChartData } from '../../../services/dashboardApi';

interface PerformanceChartsProps {
  data: ChartData;
  loading?: boolean;
}

// Styled Components
const ChartsContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  margin-bottom: 32px;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;

const ChartCard = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
  overflow: hidden;
`;

const ChartHeader = styled.div`
  padding: 20px 24px;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ChartTitle = styled.h3`
  color: #1a365d;
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0;
`;

const ChartSubtitle = styled.p`
  color: #718096;
  font-size: 0.875rem;
  margin: 4px 0 0 0;
`;

const PeriodSelector = styled.div`
  display: flex;
  gap: 8px;
`;

const PeriodButton = styled.button<{ $active: boolean }>`
  padding: 6px 12px;
  border: 1px solid ${props => props.$active ? '#1a365d' : '#e2e8f0'};
  background: ${props => props.$active ? '#1a365d' : 'white'};
  color: ${props => props.$active ? 'white' : '#4a5568'};
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #1a365d;
    background: ${props => props.$active ? '#1a365d' : '#f7fafc'};
  }
`;

const ChartContent = styled.div`
  padding: 24px;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MockChart = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 2px dashed #e2e8f0;
`;

const ChartPlaceholder = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
  opacity: 0.5;
`;

const ChartPlaceholderText = styled.div`
  color: #718096;
  font-size: 0.875rem;
  text-align: center;
  line-height: 1.4;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 16px;
  padding: 16px 24px;
  background: #f7fafc;
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  color: #1a365d;
  margin-bottom: 4px;
`;

const StatLabel = styled.div`
  font-size: 0.75rem;
  color: #718096;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const LoadingState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  color: #718096;
`;

const TwoColumnGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const PerformanceCharts: React.FC<PerformanceChartsProps> = ({ 
  data, 
  loading = false 
}) => {
  const [bookingPeriod, setBookingPeriod] = useState('30d');
  const [revenuePeriod, setRevenuePeriod] = useState('30d');

  if (loading) {
    return (
      <ChartsContainer>
        <ChartCard>
          <ChartHeader>
            <div>
              <ChartTitle>Booking Trends</ChartTitle>
              <ChartSubtitle>Loading chart data...</ChartSubtitle>
            </div>
          </ChartHeader>
          <LoadingState>Loading booking trends...</LoadingState>
        </ChartCard>
        <ChartCard>
          <ChartHeader>
            <div>
              <ChartTitle>Service Performance</ChartTitle>
              <ChartSubtitle>Loading performance data...</ChartSubtitle>
            </div>
          </ChartHeader>
          <LoadingState>Loading service data...</LoadingState>
        </ChartCard>
      </ChartsContainer>
    );
  }

  return (
    <>
      <ChartsContainer>
        {/* Booking Trends Chart */}
        <ChartCard>
          <ChartHeader>
            <div>
              <ChartTitle>Booking Trends</ChartTitle>
              <ChartSubtitle>Daily booking volume over time</ChartSubtitle>
            </div>
            <PeriodSelector>
              <PeriodButton 
                $active={bookingPeriod === '7d'}
                onClick={() => setBookingPeriod('7d')}
              >
                7D
              </PeriodButton>
              <PeriodButton 
                $active={bookingPeriod === '30d'}
                onClick={() => setBookingPeriod('30d')}
              >
                30D
              </PeriodButton>
              <PeriodButton 
                $active={bookingPeriod === '90d'}
                onClick={() => setBookingPeriod('90d')}
              >
                90D
              </PeriodButton>
            </PeriodSelector>
          </ChartHeader>
          <ChartContent>
            <MockChart>
              <ChartPlaceholder>📈</ChartPlaceholder>
              <ChartPlaceholderText>
                Booking trends chart would display here<br />
                Showing {data.bookingTrends.labels.length} data points
              </ChartPlaceholderText>
            </MockChart>
          </ChartContent>
          <StatsGrid>
            <StatItem>
              <StatValue>
                {data.bookingTrends.datasets[0]?.data.reduce((a, b) => a + b, 0) || 0}
              </StatValue>
              <StatLabel>Total Bookings</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue>
                {Math.round((data.bookingTrends.datasets[0]?.data.reduce((a, b) => a + b, 0) || 0) / 
                (data.bookingTrends.labels.length || 1))}
              </StatValue>
              <StatLabel>Daily Average</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue>+12%</StatValue>
              <StatLabel>Growth Rate</StatLabel>
            </StatItem>
          </StatsGrid>
        </ChartCard>

        {/* Service Popularity Chart */}
        <ChartCard>
          <ChartHeader>
            <div>
              <ChartTitle>Service Popularity</ChartTitle>
              <ChartSubtitle>Most requested services</ChartSubtitle>
            </div>
          </ChartHeader>
          <ChartContent>
            <MockChart>
              <ChartPlaceholder>🥧</ChartPlaceholder>
              <ChartPlaceholderText>
                Service popularity pie chart<br />
                {data.servicePopularity.labels.length} services tracked
              </ChartPlaceholderText>
            </MockChart>
          </ChartContent>
          <StatsGrid>
            {data.servicePopularity.labels.slice(0, 3).map((label, index) => (
              <StatItem key={label}>
                <StatValue>
                  {data.servicePopularity.datasets[0]?.data[index] || 0}
                </StatValue>
                <StatLabel>{label}</StatLabel>
              </StatItem>
            ))}
          </StatsGrid>
        </ChartCard>
      </ChartsContainer>

      {/* Revenue Breakdown */}
      <TwoColumnGrid>
        <ChartCard>
          <ChartHeader>
            <div>
              <ChartTitle>Revenue Breakdown</ChartTitle>
              <ChartSubtitle>Revenue by service type</ChartSubtitle>
            </div>
            <PeriodSelector>
              <PeriodButton 
                $active={revenuePeriod === '30d'}
                onClick={() => setRevenuePeriod('30d')}
              >
                30D
              </PeriodButton>
              <PeriodButton 
                $active={revenuePeriod === '90d'}
                onClick={() => setRevenuePeriod('90d')}
              >
                90D
              </PeriodButton>
            </PeriodSelector>
          </ChartHeader>
          <ChartContent>
            <MockChart>
              <ChartPlaceholder>💰</ChartPlaceholder>
              <ChartPlaceholderText>
                Revenue breakdown chart<br />
                Total: £{data.revenueBreakdown.datasets[0]?.data.reduce((a, b) => a + b, 0).toLocaleString() || '0'}
              </ChartPlaceholderText>
            </MockChart>
          </ChartContent>
        </ChartCard>

        <ChartCard>
          <ChartHeader>
            <div>
              <ChartTitle>Performance Metrics</ChartTitle>
              <ChartSubtitle>Key business indicators</ChartSubtitle>
            </div>
          </ChartHeader>
          <ChartContent>
            <StatsGrid style={{ padding: '24px', background: 'white', height: '100%' }}>
              <StatItem>
                <StatValue>94.2%</StatValue>
                <StatLabel>Success Rate</StatLabel>
              </StatItem>
              <StatItem>
                <StatValue>4.8</StatValue>
                <StatLabel>Avg Rating</StatLabel>
              </StatItem>
              <StatItem>
                <StatValue>£5,250</StatValue>
                <StatLabel>Avg Case Value</StatLabel>
              </StatItem>
              <StatItem>
                <StatValue>12.5%</StatValue>
                <StatLabel>Growth Rate</StatLabel>
              </StatItem>
              <StatItem>
                <StatValue>156</StatValue>
                <StatLabel>Active Clients</StatLabel>
              </StatItem>
              <StatItem>
                <StatValue>98%</StatValue>
                <StatLabel>Uptime</StatLabel>
              </StatItem>
            </StatsGrid>
          </ChartContent>
        </ChartCard>
      </TwoColumnGrid>
    </>
  );
};

export default PerformanceCharts; 