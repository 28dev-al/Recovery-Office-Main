/**
 * Client Activity Component
 * Displays recent client activities and system events
 */

import React from 'react';
import styled from 'styled-components';
import { Activity } from '../../../services/dashboardApi';

interface ClientActivityProps {
  activities: Activity[];
  loading?: boolean;
}

// Styled Components
const ActivityContainer = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
  overflow: hidden;
`;

const ActivityHeader = styled.div`
  padding: 20px 24px;
  border-bottom: 1px solid #e2e8f0;
`;

const ActivityTitle = styled.h3`
  color: #1a365d;
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 4px 0;
`;

const ActivitySubtitle = styled.p`
  color: #718096;
  font-size: 0.875rem;
  margin: 0;
`;

const ActivityList = styled.div`
  max-height: 400px;
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f7fafc;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #e2e8f0;
    border-radius: 2px;
  }
`;

const ActivityItem = styled.div`
  padding: 16px 24px;
  border-bottom: 1px solid #f7fafc;
  display: flex;
  gap: 12px;
  transition: background-color 0.2s ease;

  &:hover {
    background: #f7fafc;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const ActivityIcon = styled.div<{ $type: string }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  flex-shrink: 0;
  margin-top: 2px;
  
  ${props => {
    switch (props.$type) {
      case 'booking_created':
      case 'booking_updated':
        return `
          background: rgba(26, 54, 93, 0.1);
          color: #1a365d;
        `;
      case 'client_registered':
        return `
          background: rgba(56, 161, 105, 0.1);
          color: #38a169;
        `;
      case 'payment_received':
        return `
          background: rgba(56, 161, 105, 0.1);
          color: #38a169;
        `;
      case 'service':
        return `
          background: rgba(214, 158, 46, 0.1);
          color: #d69e2e;
        `;
      case 'system':
        return `
          background: rgba(128, 90, 213, 0.1);
          color: #805ad5;
        `;
      default:
        return `
          background: rgba(113, 128, 150, 0.1);
          color: #718096;
        `;
    }
  }}
`;

const ActivityContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const ActivityTitleText = styled.div`
  font-weight: 600;
  font-size: 0.875rem;
  color: #1a365d;
  margin-bottom: 2px;
  line-height: 1.3;
`;

const ActivityDescription = styled.div`
  font-size: 0.75rem;
  color: #718096;
  line-height: 1.4;
  margin-bottom: 4px;
`;

const ActivityTime = styled.div`
  font-size: 0.75rem;
  color: #a0aec0;
`;

const LoadingState = styled.div`
  padding: 40px 24px;
  text-align: center;
  color: #718096;
`;

const EmptyState = styled.div`
  padding: 40px 24px;
  text-align: center;
  color: #718096;
`;

const EmptyIcon = styled.div`
  font-size: 32px;
  margin-bottom: 12px;
`;

const EmptyTitle = styled.h4`
  color: #4a5568;
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 8px 0;
`;

const EmptyDescription = styled.p`
  color: #718096;
  font-size: 0.875rem;
  margin: 0;
  line-height: 1.4;
`;

// Get icon for activity type
const getActivityIcon = (type: string): string => {
  switch (type) {
    case 'booking_created':
    case 'booking_updated':
      return '📅';
    case 'client_registered':
      return '👤';
    case 'payment_received':
      return '💰';
    case 'service':
      return '💼';
    case 'system':
      return '⚙️';
    default:
      return '📝';
  }
};

// Format relative time
const formatRelativeTime = (timestamp: string): string => {
  const now = new Date();
  const activityTime = new Date(timestamp);
  const diffInMinutes = Math.floor((now.getTime() - activityTime.getTime()) / (1000 * 60));

  if (diffInMinutes < 1) {
    return 'Just now';
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`;
  } else if (diffInMinutes < 1440) {
    const hours = Math.floor(diffInMinutes / 60);
    return `${hours}h ago`;
  } else {
    const days = Math.floor(diffInMinutes / 1440);
    return `${days}d ago`;
  }
};

export const ClientActivity: React.FC<ClientActivityProps> = ({ 
  activities, 
  loading = false 
}) => {
  if (loading) {
    return (
      <ActivityContainer>
        <ActivityHeader>
          <ActivityTitle>Recent Activity</ActivityTitle>
          <ActivitySubtitle>Loading activity feed...</ActivitySubtitle>
        </ActivityHeader>
        <LoadingState>
          Loading activities...
        </LoadingState>
      </ActivityContainer>
    );
  }

  if (activities.length === 0) {
    return (
      <ActivityContainer>
        <ActivityHeader>
          <ActivityTitle>Recent Activity</ActivityTitle>
          <ActivitySubtitle>No recent activity</ActivitySubtitle>
        </ActivityHeader>
        <EmptyState>
          <EmptyIcon>📋</EmptyIcon>
          <EmptyTitle>No Recent Activity</EmptyTitle>
          <EmptyDescription>
            Client activities and system events will appear here as they occur.
          </EmptyDescription>
        </EmptyState>
      </ActivityContainer>
    );
  }

  return (
    <ActivityContainer>
      <ActivityHeader>
        <ActivityTitle>Recent Activity</ActivityTitle>
        <ActivitySubtitle>
          Latest {activities.length} system activities
        </ActivitySubtitle>
      </ActivityHeader>

      <ActivityList>
        {activities.map((activity) => (
          <ActivityItem key={activity._id}>
            <ActivityIcon $type={activity.type}>
              {getActivityIcon(activity.type)}
            </ActivityIcon>
            <ActivityContent>
              <ActivityTitleText>{activity.clientName}</ActivityTitleText>
              <ActivityDescription>{activity.description}</ActivityDescription>
              <ActivityTime>{formatRelativeTime(activity.timestamp)}</ActivityTime>
            </ActivityContent>
          </ActivityItem>
        ))}
      </ActivityList>
    </ActivityContainer>
  );
};

export default ClientActivity; 