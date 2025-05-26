/**
 * Quick Actions Component
 * Provides quick access to common admin tasks
 */

import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// Styled Components
const ActionsContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 32px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
`;

const ActionsHeader = styled.div`
  margin-bottom: 20px;
`;

const ActionsTitle = styled.h3`
  color: #1a365d;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 8px 0;
`;

const ActionsSubtitle = styled.p`
  color: #718096;
  font-size: 0.875rem;
  margin: 0;
`;

const ActionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ActionButton = styled.button<{ $color: string; $bgColor: string }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  background: ${props => props.$bgColor};
  border: 2px solid ${props => props.$color};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
  width: 100%;

  &:hover {
    background: ${props => props.$color};
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const ActionIcon = styled.div<{ $color: string }>`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: ${props => props.$color};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  flex-shrink: 0;
`;

const ActionContent = styled.div`
  flex: 1;
`;

const ActionTitle = styled.div`
  font-weight: 600;
  font-size: 0.875rem;
  color: #1a365d;
  margin-bottom: 4px;
`;

const ActionDescription = styled.div`
  font-size: 0.75rem;
  color: #718096;
  line-height: 1.3;
`;

const StatsRow = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid #e2e8f0;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
  }
`;

const QuickStat = styled.div`
  flex: 1;
  text-align: center;
  padding: 12px;
  background: #f7fafc;
  border-radius: 8px;
`;

const QuickStatValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a365d;
  margin-bottom: 4px;
`;

const QuickStatLabel = styled.div`
  font-size: 0.75rem;
  color: #718096;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const QuickActions: React.FC = () => {
  const navigate = useNavigate();

  const actions = [
    {
      title: 'New Booking',
      description: 'Create a new client booking',
      icon: '📅',
      color: '#1a365d',
      bgColor: 'rgba(26, 54, 93, 0.1)',
      onClick: () => navigate('/booking')
    },
    {
      title: 'Add Client',
      description: 'Register a new client',
      icon: '👤',
      color: '#38a169',
      bgColor: 'rgba(56, 161, 105, 0.1)',
      onClick: () => navigate('/dashboard/clients/new')
    },
    {
      title: 'View Calendar',
      description: 'Check schedule and availability',
      icon: '🗓️',
      color: '#d69e2e',
      bgColor: 'rgba(214, 158, 46, 0.1)',
      onClick: () => navigate('/dashboard/calendar')
    },
    {
      title: 'Generate Report',
      description: 'Create business reports',
      icon: '📊',
      color: '#805ad5',
      bgColor: 'rgba(128, 90, 213, 0.1)',
      onClick: () => navigate('/dashboard/reports')
    },
    {
      title: 'Manage Services',
      description: 'Edit service offerings',
      icon: '💼',
      color: '#e53e3e',
      bgColor: 'rgba(229, 62, 62, 0.1)',
      onClick: () => navigate('/dashboard/services')
    },
    {
      title: 'System Settings',
      description: 'Configure system preferences',
      icon: '⚙️',
      color: '#718096',
      bgColor: 'rgba(113, 128, 150, 0.1)',
      onClick: () => navigate('/dashboard/settings')
    }
  ];

  const quickStats = [
    {
      value: '12',
      label: 'Pending Approvals'
    },
    {
      value: '5',
      label: 'Today\'s Appointments'
    },
    {
      value: '3',
      label: 'Urgent Cases'
    },
    {
      value: '98%',
      label: 'System Uptime'
    }
  ];

  return (
    <ActionsContainer>
      <ActionsHeader>
        <ActionsTitle>Quick Actions</ActionsTitle>
        <ActionsSubtitle>
          Frequently used admin functions for efficient workflow management
        </ActionsSubtitle>
      </ActionsHeader>

      <ActionsGrid>
        {actions.map((action, index) => (
          <ActionButton
            key={index}
            $color={action.color}
            $bgColor={action.bgColor}
            onClick={action.onClick}
          >
            <ActionIcon $color={action.color}>
              {action.icon}
            </ActionIcon>
            <ActionContent>
              <ActionTitle>{action.title}</ActionTitle>
              <ActionDescription>{action.description}</ActionDescription>
            </ActionContent>
          </ActionButton>
        ))}
      </ActionsGrid>

      <StatsRow>
        {quickStats.map((stat, index) => (
          <QuickStat key={index}>
            <QuickStatValue>{stat.value}</QuickStatValue>
            <QuickStatLabel>{stat.label}</QuickStatLabel>
          </QuickStat>
        ))}
      </StatsRow>
    </ActionsContainer>
  );
};

export default QuickActions; 