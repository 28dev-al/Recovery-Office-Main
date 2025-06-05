/**
 * Analytics Page
 * Comprehensive business intelligence and reporting for Recovery Office
 */

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { dashboardApi, type AnalyticsData } from '../../services/dashboardApi';

export const AnalyticsPage: React.FC = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const result = await dashboardApi.getAnalyticsData();
        if (result?.data) {
          setAnalyticsData(result.data as AnalyticsData);
        }
      } catch (error) {
        console.error('[Analytics] Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) return <LoadingContainer>Loading...</LoadingContainer>;

  return (
    <Container>
      <h1>Analytics Dashboard</h1>
      {analyticsData && (
            <div>
          <p>Revenue: £{analyticsData.bookingStats.totalRevenue.toLocaleString()}</p>
          <h3>Top Services:</h3>
            <div>
            {analyticsData.topServices.map((service) => (
              <ServiceItem key={service.serviceId || service.name}>
                {service.name}: {service.bookingCount} bookings
              </ServiceItem>
            ))}
          </div>
            </div>
      )}
      {!analyticsData && !loading && <p>No analytics data available.</p>}
    </Container>
  );
};

const Container = styled.div`
  padding: 24px;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
  font-size: 18px;
`;

const ServiceItem = styled.div`
  padding: 8px;
  border-bottom: 1px solid #eee;
`;

export default AnalyticsPage; 
