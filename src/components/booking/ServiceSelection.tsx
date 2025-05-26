import * as React from 'react';
import { useBooking } from '../../context/BookingContext';
import { ServiceOption } from '../../types/booking.types';
import { ServiceType } from '../../types/service.types';

import styled from 'styled-components';
import { RecoveryOfficeTheme } from '../../design-system/types/theme.types';
import { getFibonacciByIndex } from '../../utils/getFibonacciByIndex';
import { PHI } from '../../constants/sacred-geometry';


// Mock services data (replace with API call in production)
const mockServices: ServiceOption[] = [
  {
    id: '1',
    name: 'Initial Consultation',
    description: 'First-time assessment and treatment planning.',
    duration: 60,
    price: 120,
    type: ServiceType.INITIAL_CONSULTATION
  },
  {
    id: '2',
    name: 'Follow-up Session',
    description: 'Regular treatment session for existing clients.',
    duration: 45, 
    price: 90,
    type: ServiceType.FOLLOW_UP
  },
  {
    id: '3',
    name: 'Deep Tissue Massage',
    description: 'Focused massage therapy for chronic muscle tension.',
    duration: 60,
    price: 100,
    type: ServiceType.SPECIALIZED_TREATMENT
  },
  {
    id: '4',
    name: 'Rehabilitation Package',
    description: '5-session package for comprehensive rehabilitation.',
    duration: 45,
    price: 400,
    type: ServiceType.COMPREHENSIVE_ASSESSMENT
  }
];

// Styled components using sacred geometry
const ServicesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(${getFibonacciByIndex(8)}px, 1fr));
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

const ServiceSelection: React.FC = () => {
  const { selectedService, setSelectedService, currentStep, setCurrentStep } = useBooking();
  const [services, setServices] = React.useState<ServiceOption[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  
  React.useEffect(() => {
    // In a real application, this would be an API call
    // For now, we'll simulate an API call with setTimeout
    const fetchServices = async () => {
      try {
        setLoading(true);
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, getFibonacciByIndex(7)));
        setServices(mockServices);
        setError(null);
      } catch (err) {
        setError('Failed to load services. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchServices();
  }, []);
  
  const handleServiceSelection = (service: ServiceOption) => {
    setSelectedService(service);
  };
  
  const handleContinue = () => {
    setCurrentStep(currentStep + 1);
  };
  
  if (loading) {
    return <div>Loading services...</div>;
  }
  
  if (error) {
    return <div>{error}</div>;
  }
  
  return (
    <div>
      <h2>Select a Service</h2>
      <ServicesContainer>
        {services.map((service) => (
          <ServiceCard 
            key={service.id}
            $selected={selectedService?.id === service.id}
            onClick={() => handleServiceSelection(service)}
          >
            <ServiceName>{service.name}</ServiceName>
            <ServiceDescription>{service.description}</ServiceDescription>
            <ServiceDetails>
              <ServiceDuration>{service.duration} min</ServiceDuration>
              <ServicePrice>${service.price}</ServicePrice>
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
















