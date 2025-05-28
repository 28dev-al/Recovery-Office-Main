/**
 * Service Selection Step - Fixed Version
 * 
 * Properly handles service selection with data persistence
 */

import React, { useState } from 'react';
import styled from 'styled-components';
import { useBookingState } from '../../../hooks/useBookingState';

interface ServiceSelectionStepProps {
  onServiceSelect: (service: any) => void;
  onNext?: () => void;
  onComplete?: () => void;
}

export const ServiceSelectionStep: React.FC<ServiceSelectionStepProps> = ({
  onServiceSelect,
  onNext,
  onComplete
}) => {
  const bookingState = useBookingState();
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);

    // Use fallback services directly
  const services = [
      {
        _id: '507f1f77bcf86cd799439011',
        id: 'cryptocurrency-recovery',
        name: 'Cryptocurrency Recovery',
        description: 'Expert recovery of stolen Bitcoin, Ethereum, and other digital assets',
        duration: 60,
        price: 750,
        category: 'crypto'
      },
      {
        _id: '507f1f77bcf86cd799439012',
        id: 'investment-fraud-recovery',
        name: 'Investment Fraud Recovery',
        description: 'Recovery services for victims of investment scams and Ponzi schemes',
        duration: 60,
        price: 750,
        category: 'fraud'
      },
      {
        _id: '507f1f77bcf86cd799439013',
        id: 'regulatory-assistance',
        name: 'Regulatory Assistance',
        description: 'Professional assistance with financial regulatory matters',
        duration: 45,
        price: 500,
        category: 'regulatory'
      },
      {
        _id: '507f1f77bcf86cd799439014',
        id: 'professional-negligence',
        name: 'Professional Negligence',
        description: 'Legal action against negligent financial professionals',
        duration: 90,
        price: 950,
        category: 'legal'
      }
    ];

    console.log('[ServiceSelection] Available services:', services);
    console.log('[ServiceSelection] Services count:', services.length);

    const handleServiceSelection = (service: any) => {
      console.log('[ServiceSelection] Service selected:', service.name);

      setSelectedServiceId(service._id);
      bookingState.setSelectedService(service);
      onServiceSelect(service);

    // Move to next step
    setTimeout(() => {
      if (onNext) {
        onNext();
      } else if (onComplete) {
        onComplete();
      }
    }, 100);
  };

  if (services.length === 0) {
    return (
      <LoadingContainer>
        <LoadingSpinner />
        <LoadingText>Loading services...</LoadingText>
      </LoadingContainer>
    );
  }

  return (
    <SelectionContainer>
      <StepHeader>
        <StepTitle>Select Your Service</StepTitle>
        <StepDescription>Choose the recovery service you need</StepDescription>
      </StepHeader>

      <ServicesGrid>
        {services.map((service) => (
          <ServiceCard
            key={service._id}
            onClick={() => handleServiceSelection(service)}
            selected={selectedServiceId === service._id}
          >
            <ServiceIcon>{getServiceIcon(service.id, service.category)}</ServiceIcon>
            <ServiceName>{service.name}</ServiceName>
            <ServiceDescription>{service.description}</ServiceDescription>
            <ServiceDetails>
              <ServiceDuration>{service.duration} minutes</ServiceDuration>
              <ServicePrice>£{service.price.toLocaleString()}</ServicePrice>
            </ServiceDetails>
          </ServiceCard>
        ))}
      </ServicesGrid>

      {services.length === 0 && (
        <NoServicesMessage>
          No services available at the moment. Please try again later.
        </NoServicesMessage>
      )}
    </SelectionContainer>
  );
};

const getServiceIcon = (serviceId: string | undefined, category: string | undefined): string => {
  // First check by specific service ID for exact matches
  switch (serviceId) {
    case 'cryptocurrency-recovery':
      return '₿'; // Bitcoin symbol
    case 'investment-fraud-recovery':
    case 'financial-scam-recovery':
      return '🛡️'; // Shield for fraud protection
    case 'regulatory-assistance':
    case 'regulatory-complaint-assistance':
      return '⚖️'; // Scales of justice
    case 'professional-negligence':
      return '📋'; // Professional documents
    default:
      break;
  }
  
  // Fallback to category-based matching
  switch (category) {
    case 'crypto':
    case 'cryptocurrency':
      return '₿';
    case 'fraud':
    case 'investment-fraud':
    case 'scam':
      return '🛡️';
    case 'regulatory':
      return '⚖️';
    case 'legal':
    case 'professional-negligence':
      return '📋';
    default:
      return '🏢'; // Default icon for undefined or unknown categories
  }
};

// Styled Components
const SelectionContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const StepHeader = styled.div`
  text-align: center;
  margin-bottom: 48px;
`;

const StepTitle = styled.h2`
  font-size: 32px;
  color: #1a365d;
  margin-bottom: 12px;
  font-weight: 700;
`;

const StepDescription = styled.p`
  font-size: 18px;
  color: #6b7280;
  max-width: 600px;
  margin: 0 auto;
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
`;

const ServiceCard = styled.div<{ selected: boolean }>`
  background: white;
  border: 2px solid ${({ selected }) => selected ? '#d69e2e' : '#e5e7eb'};
  border-radius: 12px;
  padding: 32px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;

  &:hover {
    border-color: #d69e2e;
    transform: translateY(-4px);
    box-shadow: 0 16px 48px rgba(0, 0, 0, 0.1);
  }

  ${({ selected }) => selected && `
    background: #fef3c7;
    border-color: #d69e2e;
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(214, 158, 46, 0.2);
  `}
`;

const ServiceIcon = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
`;

const ServiceName = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: #1a365d;
  margin-bottom: 12px;
`;

const ServiceDescription = styled.p`
  font-size: 14px;
  color: #6b7280;
  line-height: 1.5;
  margin-bottom: 20px;
`;

const ServiceDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #e5e7eb;
`;

const ServiceDuration = styled.span`
  font-size: 14px;
  color: #6b7280;
`;

const ServicePrice = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: #d69e2e;
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
`;

const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid #e5e7eb;
  border-top: 4px solid #d69e2e;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LoadingText = styled.p`
  font-size: 16px;
  color: #6b7280;
`;

const ErrorContainer = styled.div`
  text-align: center;
  padding: 80px 20px;
`;

const ErrorText = styled.p`
  font-size: 16px;
  color: #dc2626;
  margin-bottom: 24px;
`;

const RetryButton = styled.button`
  background: #d69e2e;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #b8851f;
    transform: translateY(-1px);
  }
`;

const NoServicesMessage = styled.div`
  text-align: center;
  padding: 40px;
  color: #6b7280;
  font-size: 16px;
`;

export default ServiceSelectionStep; 