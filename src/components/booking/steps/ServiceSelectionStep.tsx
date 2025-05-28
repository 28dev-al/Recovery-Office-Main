/**
 * Service Selection Step - Fixed Version
 * 
 * Properly handles service selection with data persistence
 */

import React, { useState } from 'react';
import styled from 'styled-components';
import { useBookingState } from '../../../hooks/useBookingState';
import { useBooking } from '../../../context/BookingContext';

interface ServiceData {
  _id?: string;
  id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
  category: string;
  isDevelopmentFallback?: boolean;
}

interface ServiceSelectionStepProps {
  onServiceSelect: (service: ServiceData) => void;
  onNext?: () => void;
  onComplete?: () => void;
}

export const ServiceSelectionStep: React.FC<ServiceSelectionStepProps> = ({
  onServiceSelect,
  onNext,
  onComplete
}) => {
  const bookingState = useBookingState();
  const { state: bookingContext } = useBooking();
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);

  // CRITICAL FIX: Use real services from BookingContext instead of hardcoded fake ones
  const services = bookingContext.availableServices || [];

  console.log('[ServiceSelection] Available services:', services);
  console.log('[ServiceSelection] Services count:', services.length);

  // CRITICAL: Add validation to ensure we have real MongoDB ObjectIds
  const validateService = (service: ServiceData) => {
    const hasValidObjectId = service._id && /^[0-9a-fA-F]{24}$/.test(service._id);
    const isNotFallback = !service.isDevelopmentFallback;
    
    console.log('[ServiceSelection] Validating service:', {
      name: service.name,
      _id: service._id,
      hasValidObjectId,
      isNotFallback,
      isValid: hasValidObjectId && isNotFallback
    });
    
    return hasValidObjectId && isNotFallback;
  };

  const handleServiceSelection = (service: ServiceData) => {
    console.log('[ServiceSelection] Service selected:', service.name);
    
    // CRITICAL: Validate that we're using a real service with valid MongoDB ObjectId
    if (!validateService(service)) {
      console.error('[ServiceSelection] Invalid service selected - not a real MongoDB service:', service);
      alert('Error: Invalid service selected. Please refresh the page and try again.');
      return;
    }
    
    console.log('[ServiceSelection] Service validation passed - using real MongoDB ObjectId:', service._id);

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

  // Show loading while services are being fetched
  if (services.length === 0) {
    return (
      <LoadingContainer>
        <LoadingSpinner />
        <LoadingText>Loading services from database...</LoadingText>
      </LoadingContainer>
    );
  }

  // Filter out any fallback services to ensure we only show real ones
  const realServices = services.filter(service => validateService(service));
  
  if (realServices.length === 0) {
    return (
      <ErrorContainer>
        <ErrorText>Unable to load services from database. Please refresh the page.</ErrorText>
        <RetryButton onClick={() => window.location.reload()}>
          Refresh Page
        </RetryButton>
      </ErrorContainer>
    );
  }

  return (
    <SelectionContainer>
      <StepHeader>
        <StepTitle>Select Your Service</StepTitle>
        <StepDescription>Choose the recovery service you need</StepDescription>
      </StepHeader>

      <ServicesGrid>
        {realServices.map((service) => (
          <ServiceCard
            key={service._id}
            onClick={() => handleServiceSelection(service)}
            selected={selectedServiceId === service._id}
          >
            <ServiceIcon>{getServiceIcon(service.id, service.name, service.category)}</ServiceIcon>
            <ServiceName>{service.name}</ServiceName>
            <ServiceDescription>{service.description}</ServiceDescription>
            <ServiceDetails>
              <ServiceDuration>{service.duration} minutes</ServiceDuration>
              <ServicePrice>£{service.price.toLocaleString()}</ServicePrice>
            </ServiceDetails>
            {/* Debug info in development */}
            {process.env.NODE_ENV === 'development' && (
              <DebugInfo>
                ID: {service._id} (Real: {validateService(service) ? 'Yes' : 'No'})
              </DebugInfo>
            )}
          </ServiceCard>
        ))}
      </ServicesGrid>
    </SelectionContainer>
  );
};

const getServiceIcon = (serviceId: string | undefined, serviceName: string | undefined, category: string | undefined): string => {
  console.log('[ServiceSelection] Getting icon for:', { serviceId, serviceName, category });

  // Professional icons based on actual MongoDB service data
  switch (serviceId) {
    case '6833842b0a231982cf5ed0fe': // Cryptocurrency Recovery
      return '₿'; // Bitcoin symbol - instantly recognizable for crypto recovery
      
    case '6833842b0a231982cf5ed0ff': // Investment Fraud Recovery  
      return '🛡️'; // Shield - represents protection and fraud prevention
      
    case '6833842b0a231982cf5ed100': // Financial Scam Recovery
      return '🔒'; // Lock - represents security and protection from scams
      
    case '6833842b0a231982cf5ed101': // Regulatory Complaint Assistance
      return '⚖️'; // Scales of justice - represents legal/regulatory matters
      
    default:
      // Fallback based on service name if ObjectId doesn't match
      if (serviceName?.toLowerCase().includes('crypto')) return '₿';
      if (serviceName?.toLowerCase().includes('investment') && serviceName?.toLowerCase().includes('fraud')) return '🛡️';
      if (serviceName?.toLowerCase().includes('scam')) return '🔒';
      if (serviceName?.toLowerCase().includes('regulatory') || serviceName?.toLowerCase().includes('complaint')) return '⚖️';
      
      return '🏢'; // Fallback
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
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  width: 80px;
  margin: 0 auto 20px;
  border-radius: 50%;
  background: linear-gradient(135deg, #1a365d 0%, #2c5282 100%);
  color: #d69e2e;
  box-shadow: 0 4px 12px rgba(26, 54, 93, 0.3);
  transition: all 0.3s ease;

  /* Professional hover effect */
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 20px rgba(214, 158, 46, 0.4);
  }
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

const DebugInfo = styled.div`
  font-size: 12px;
  color: #6b7280;
  margin-top: 8px;
`;

export default ServiceSelectionStep; 