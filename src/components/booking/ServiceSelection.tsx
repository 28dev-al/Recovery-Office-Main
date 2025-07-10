import * as React from 'react';
import { useBooking } from '../../context/BookingContext';
import { ServiceData } from '../../types/service';
import { ServicesAPI } from '../../services/servicesApi';

import styled from 'styled-components';
import { RecoveryOfficeTheme } from '../../design-system/types/theme.types';
import { getFibonacciByIndex } from '../../utils/getFibonacciByIndex';
import { PHI } from '../../constants/sacred-geometry';

// Styled components using sacred geometry
const ServicesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(${getFibonacciByIndex(8)}px, 1fr));
  gap: ${getFibonacciByIndex(5)}px;
  width: 100%;
  margin-bottom: ${getFibonacciByIndex(7)}px;
`;

const ServiceCard = styled.div<{ $selected: boolean }>`
  padding: ${getFibonacciByIndex(5)}px;
  border-radius: ${getFibonacciByIndex(4)}px;
  border: 1px solid ${({ $selected, theme }: { $selected: boolean; theme: RecoveryOfficeTheme }) => 
    $selected ? theme.colors.primary[500] : theme.colors.border.main};
  background-color: ${({ $selected, theme }: { $selected: boolean; theme: RecoveryOfficeTheme }) => 
    $selected ? theme.colors.primary[100] : theme.colors.background[100]};
  cursor: pointer;
  transition: all ${getFibonacciByIndex(5) * 10}ms ease-in-out;
  height: ${getFibonacciByIndex(10)}px;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: scale(${1 + (1 / PHI) * 0.05});
    box-shadow: 0 ${getFibonacciByIndex(3)}px ${getFibonacciByIndex(5)}px rgba(0, 0, 0, 0.1);
  }
`;

const ServiceName = styled.h3`
  margin: 0 0 ${getFibonacciByIndex(4)}px 0;
  font-size: ${getFibonacciByIndex(5)}px;
  color: ${({ theme }: { theme: RecoveryOfficeTheme }) => theme.colors.text.primary};
`;

const ServiceDescription = styled.p`
  margin: 0 0 ${getFibonacciByIndex(4)}px 0;
  color: ${({ theme }: { theme: RecoveryOfficeTheme }) => theme.colors.text.secondary};
  flex-grow: 1;
`;

const ServiceDetails = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: auto;
`;

const ServiceDuration = styled.span`
  font-size: ${getFibonacciByIndex(4)}px;
  color: ${({ theme }: { theme: RecoveryOfficeTheme }) => theme.colors.text.secondary};
`;

const ServicePrice = styled.span`
  font-size: ${getFibonacciByIndex(5)}px;
  font-weight: bold;
  color: ${({ theme }: { theme: RecoveryOfficeTheme }) => theme.colors.primary[500]};
`;

const ContinueButton = styled.button`
  padding: ${getFibonacciByIndex(4)}px ${getFibonacciByIndex(6)}px;
  background-color: ${({ theme }: { theme: RecoveryOfficeTheme }) => theme.colors.primary[500]};
  color: white;
  border: none;
  border-radius: ${getFibonacciByIndex(3)}px;
  font-size: ${getFibonacciByIndex(5)}px;
  cursor: pointer;
  margin-top: ${getFibonacciByIndex(6)}px;
  transition: background-color ${getFibonacciByIndex(5) * 10}ms ease;
  
  &:hover {
    background-color: ${({ theme }: { theme: RecoveryOfficeTheme }) => theme.colors.primary[700]};
  }
  
  &:disabled {
    background-color: ${({ theme }: { theme: RecoveryOfficeTheme }) => theme.colors.text.disabled};
    cursor: not-allowed;
  }
`;

const LoadingContainer = styled.div`
  text-align: center;
  padding: ${getFibonacciByIndex(6)}px;
`;

const ErrorContainer = styled.div`
  text-align: center;
  padding: ${getFibonacciByIndex(6)}px;
  color: #e53e3e;
`;

const ServiceSelection: React.FC = () => {
  const { selectedService, setSelectedService, currentStep, setCurrentStep } = useBooking();
  const [services, setServices] = React.useState<ServiceData[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  
  React.useEffect(() => {
    // PRODUCTION: Use real API call to Railway backend
    const fetchRealServices = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('[ServiceSelection] Fetching real services from production backend...');
        
        const servicesAPI = new ServicesAPI();
        const realServices = await servicesAPI.getServices();
        
        console.log('[ServiceSelection] Real services loaded:', realServices.length);
        setServices(realServices);
        
      } catch (error) {
        console.error('[ServiceSelection] Production error loading services:', error);
        setError(`Production Error: ${error instanceof Error ? error.message : 'Failed to load services from backend'}`);
        setServices([]); // No mock fallback - production should show error
      } finally {
        setLoading(false);
      }
    };
    
    fetchRealServices();
  }, []);
  
  const handleServiceSelection = (service: ServiceData) => {
    setSelectedService(service);
  };
  
  const handleContinue = () => {
    setCurrentStep(currentStep + 1);
  };
  
  if (loading) {
    return (
      <LoadingContainer>
        <div>Loading services from production backend...</div>
        <div>Connecting to Railway API...</div>
      </LoadingContainer>
    );
  }
  
  if (error) {
    return (
      <ErrorContainer>
        <div>{error}</div>
        <div>Backend: https://recovery-office-backend-production.up.railway.app</div>
        <button onClick={() => window.location.reload()}>Retry</button>
      </ErrorContainer>
    );
  }
  
  if (services.length === 0) {
    return (
      <ErrorContainer>
        <div>No services available from production backend</div>
        <div>Please contact support if this issue persists</div>
      </ErrorContainer>
    );
  }
  
  return (
    <div>
      <h2>Select a Service</h2>
      <ServicesContainer>
        {services.map((service) => (
          <ServiceCard 
            key={service._id}
            $selected={selectedService?._id === service._id}
            onClick={() => handleServiceSelection(service)}
          >
            <ServiceName>{service.name}</ServiceName>
            <ServiceDescription>{service.description}</ServiceDescription>
            <ServiceDetails>
              <ServiceDuration>{service.duration} min</ServiceDuration>
              <ServicePrice>${service.price} CAD</ServicePrice>
            </ServiceDetails>
          </ServiceCard>
        ))}
      </ServicesContainer>
      <ContinueButton 
        onClick={handleContinue}
        disabled={!selectedService}
      >
        Continue
      </ContinueButton>
    </div>
  );
};

export default ServiceSelection; 
















