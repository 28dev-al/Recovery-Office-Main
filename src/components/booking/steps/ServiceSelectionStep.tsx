/**
 * ServiceSelectionStep - Emergency Fixed Version with Render Circuit Breaker
 * Prevents infinite render loops and provides stable service selection
 */

import React, { useState, useEffect, useRef, useMemo, useCallback, memo } from 'react';
import styled from 'styled-components';

import { ServiceOption } from '../../../types/booking.types';

// Emergency: Import bookingContext safely
// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface BookingContextType {
  services?: ServiceOption[];
  availableServices?: ServiceOption[];
  loading?: boolean;
  error?: string | null;
  fetchAvailableServices?: (forceRefresh?: boolean) => Promise<void>;
  isInitialized?: boolean;
}

let useBookingContext: () => BookingContextType;
try {
  const contextModule = require('../../../context/BookingContext');
  useBookingContext = contextModule.useBookingContext || contextModule.useBooking || contextModule.default;
} catch (error) {
  console.error('[ServiceSelection] Failed to import BookingContext:', error);
  useBookingContext = () => ({ 
    availableServices: [], 
    loading: false, 
    error: null, 
    fetchAvailableServices: () => Promise.resolve(),
    isInitialized: false 
  });
}

// CRITICAL: Emergency render circuit breaker constants
const EMERGENCY_RENDER_LIMIT = 10;
const EMERGENCY_RESET_TIMEOUT = 5000; // 5 seconds

// Types  
// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface ServiceSelectionStepProps {
  // Required props
  onServiceSelect: (service: ServiceOption) => void;
  
  // Optional callback props (used by different parent components)
  onComplete?: (data?: ServiceOption) => void;
  onBack?: () => void;
  onDataChange?: (data: { selectedService: ServiceOption }) => void;
  
  // Optional data props
  initialData?: {
    selectedService?: ServiceOption;
  };
  
  // Optional state props
  isLoading?: boolean;
  loading?: boolean;
  
  // Optional service prop
  selectedService?: ServiceOption;
}

// Emergency Styled Components
const EmergencyStopContainer = styled.div`
  padding: 40px;
  text-align: center;
  background: #fee;
  border: 2px solid #f00;
  border-radius: 12px;
  margin: 20px;
`;

const EmergencyIcon = styled.div`
  font-size: 64px;
  margin-bottom: 20px;
`;

const EmergencyTitle = styled.h2`
  color: #d00;
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 16px;
`;

const EmergencyMessage = styled.p`
  color: #800;
  font-size: 16px;
  margin-bottom: 24px;
  line-height: 1.5;
`;

const EmergencyActions = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-bottom: 24px;
`;

const EmergencyButton = styled.button`
  padding: 12px 24px;
  background: #d00;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  
  &:hover {
    background: #b00;
  }
`;

const EmergencyDebug = styled.div`
  text-align: left;
  background: #f9f9f9;
  padding: 16px;
  border-radius: 8px;
  font-family: monospace;
  font-size: 12px;
  white-space: pre-wrap;
`;

// Regular Styled Components
const StyledServiceSelection = styled.div`
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
`;

const ServiceHeader = styled.div`
  text-align: center;
  margin-bottom: 32px;
  
  h2 {
    color: #0A214F;
    font-size: 2rem;
    margin-bottom: 8px;
  }
  
  p {
    color: #666;
    font-size: 1.1rem;
  }
`;

const RenderDebugInfo = styled.div`
  margin-top: 8px;
  padding: 8px;
  background: #f0f0f0;
  border-radius: 4px;
  font-size: 12px;
  color: #666;
  font-family: monospace;
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
`;

const LoadingContainer = styled.div`
  text-align: center;
  padding: 60px 20px;
  
  p {
    margin: 16px 0 8px 0;
    color: #666;
  }
  
  small {
    color: #999;
  }
`;

const ErrorContainer = styled.div`
  text-align: center;
  padding: 60px 20px;
  background: #fff8f8;
  border: 1px solid #ffdddd;
  border-radius: 8px;
  
  h3 {
    color: #dc3545;
    margin-bottom: 16px;
  }
  
  p {
    color: #666;
    margin-bottom: 24px;
  }
`;

const EmptyContainer = styled.div`
  text-align: center;
  padding: 60px 20px;
  background: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  
  h3 {
    color: #495057;
    margin-bottom: 16px;
  }
  
  p {
    color: #666;
    margin-bottom: 24px;
  }
`;

// Service card component
const ServiceCardContainer = styled.div<{ $isSelected: boolean }>`
  background: white;
  border: 2px solid ${props => props.$isSelected ? '#0A214F' : '#e9ecef'};
  border-radius: 8px;
  padding: 24px;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  
  &:hover {
    border-color: #0A214F;
    box-shadow: 0 4px 12px rgba(10, 33, 79, 0.1);
    transform: translateY(-2px);
  }
`;

const ServiceTitle = styled.h3`
  color: #0A214F;
  font-size: 1.3rem;
  margin: 0 0 12px 0;
`;

const ServiceDescription = styled.p`
  color: #666;
  margin-bottom: 16px;
  line-height: 1.5;
`;

const ServiceMeta = styled.div`
  margin-bottom: 8px;
  
  strong {
    color: #333;
  }
  
  small {
    color: #999;
    font-family: monospace;
  }
`;

const SimpleButton = styled.button<{ variant?: 'primary' | 'outline' }>`
  background: ${props => props.variant === 'outline' ? 'transparent' : '#0A214F'};
  color: ${props => props.variant === 'outline' ? '#0A214F' : 'white'};
  border: 2px solid #0A214F;
  padding: 12px 24px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.2s ease;
  margin: 8px;
  
  &:hover {
    background: ${props => props.variant === 'outline' ? '#0A214F' : '#051A3E'};
    color: white;
  }
`;

// Service card component
interface BookingServiceCardProps {
  service: ServiceOption;
  isSelected: boolean;
  onClick: () => void;
}

const BookingServiceCard: React.FC<BookingServiceCardProps> = memo(({ service, isSelected, onClick }) => {
  return (
    <ServiceCardContainer $isSelected={isSelected} onClick={onClick}>
      <ServiceTitle>{service.name}</ServiceTitle>
      <ServiceDescription>{service.description}</ServiceDescription>
      
      <div>
        <ServiceMeta>
          <strong>Duration:</strong> {service.duration} minutes
        </ServiceMeta>
        <ServiceMeta>
          <strong>Price:</strong> £{service.price}
        </ServiceMeta>
        <ServiceMeta>
          <small>ID: {service.id}</small>
        </ServiceMeta>
      </div>
    </ServiceCardContainer>
  );
});

// Main component
export const ServiceSelectionStep: React.FC<ServiceSelectionStepProps> = ({
  onServiceSelect,
  onComplete, 
  onBack,
  onDataChange,
  initialData,
  isLoading = false,
  loading: externalLoading = false,
  selectedService
}) => {
  // EMERGENCY: Render counting and circuit breaker - MUST BE FIRST
  const renderCountRef = useRef(0);
  const lastResetRef = useRef(Date.now());
  const isEmergencyStoppedRef = useRef(false);
  
  const [emergencyStop, setEmergencyStop] = useState(false);
  const [renderCount, setRenderCount] = useState(0);

  // Get booking context - MUST BE BEFORE ANY CONDITIONAL LOGIC
  const bookingContext = useBookingContext();
  
  // All other state hooks
  const [hasInitialized, setHasInitialized] = useState(false);
  const [initializationAttempts, setInitializationAttempts] = useState(0);
  const MAX_INITIALIZATION_ATTEMPTS = 3;

  // Use selectedService from props or initialData
  const initialSelectedService = selectedService || initialData?.selectedService || null;
  const [localSelectedService, setLocalSelectedService] = useState<ServiceOption | null>(initialSelectedService);

  // CRITICAL: Emergency render circuit breaker - MUST BE EARLY
  useEffect(() => {
    renderCountRef.current += 1;
    const now = Date.now();
    
    // Reset counter every 5 seconds
    if (now - lastResetRef.current > EMERGENCY_RESET_TIMEOUT) {
      renderCountRef.current = 1;
      lastResetRef.current = now;
      if (isEmergencyStoppedRef.current) {
        console.log('🔄 [EMERGENCY] Resetting render circuit breaker');
        isEmergencyStoppedRef.current = false;
        setEmergencyStop(false);
      }
    }
    
    // Emergency stop if too many renders
    if (renderCountRef.current > EMERGENCY_RENDER_LIMIT && !isEmergencyStoppedRef.current) {
      console.error('🚨 [EMERGENCY] INFINITE RENDER LOOP DETECTED - ACTIVATING CIRCUIT BREAKER');
      console.error(`🚨 [EMERGENCY] Render count: ${renderCountRef.current} in ${now - lastResetRef.current}ms`);
      isEmergencyStoppedRef.current = true;
      setEmergencyStop(true);
      setRenderCount(renderCountRef.current);
    }
  }, []); // Empty dependency array to prevent infinite loops

  console.log('[ServiceSelection] === CONTEXT DEBUG START ===');
  console.log('[ServiceSelection] bookingContext exists:', !!bookingContext);
  console.log('[ServiceSelection] bookingContext.services exists:', !!bookingContext?.services);
  console.log('[ServiceSelection] bookingContext.services length:', bookingContext?.services?.length);
  console.log('[ServiceSelection] bookingContext.state?.loading:', bookingContext?.loading);
  
  if (bookingContext?.services && bookingContext.services.length > 0) {
    console.log('[ServiceSelection] Available services from context:');
    bookingContext.services.forEach((service: ServiceOption, index: number) => {
      console.log(`  Service ${index + 1}: ${service.name} (ID: ${service.id}, Valid: ${service.isValidObjectId})`);
    });
  }
  
  const { 
    services = [],
    availableServices = [], 
    loading: contextLoading = false, 
    error, 
    fetchAvailableServices
  } = bookingContext || {};
  
  // Combine loading states
  const loading = contextLoading || externalLoading || isLoading;

  // CRITICAL: Memoize services with emergency fallback
  const servicesToDisplay = useMemo(() => {
    console.log('[ServiceSelection] === SERVICES VALIDATION START ===');
    
    try {
      // Check if context has valid services
      if (bookingContext?.services && 
          Array.isArray(bookingContext.services) && 
          bookingContext.services.length > 0) {
        
        // Validate services have real MongoDB ObjectIds
        const validServices = bookingContext.services.filter(service => {
          const hasValidId = /^[0-9a-fA-F]{24}$/.test(service.id);
          console.log(`[ServiceSelection] Service "${service.name}": ID=${service.id}, Valid=${hasValidId}`);
          return hasValidId;
        });

        if (validServices.length > 0) {
          console.log(`[ServiceSelection] ✅ Using ${validServices.length} real API services with valid MongoDB ObjectIds`);
          return validServices;
        } else {
          console.warn('[ServiceSelection] ⚠️ All context services have invalid ObjectIds');
        }
      } else {
        console.log('[ServiceSelection] ❌ No services in context:', {
          exists: !!bookingContext?.services,
          isArray: Array.isArray(bookingContext?.services),
          length: bookingContext?.services?.length
        });
      }
      
      // PRIORITY 2: Check availableServices as fallback
      const contextServices = services.length > 0 ? services : availableServices;
      
      if (contextServices && Array.isArray(contextServices) && contextServices.length > 0) {
        // Check if these are real services with MongoDB ObjectIds
        const hasValidServices = contextServices.some(service => 
          service.id && /^[0-9a-fA-F]{24}$/.test(service.id)
        );
        
        if (hasValidServices) {
          console.log('[ServiceSelection] Using services from state:', contextServices.length);
          console.log('[ServiceSelection] First service ID:', contextServices[0]?.id);
          console.log('[ServiceSelection] First service details:', {
            id: contextServices[0]?.id,
            _id: contextServices[0]?._id,
            name: contextServices[0]?.name,
            isValidObjectId: /^[0-9a-fA-F]{24}$/.test(contextServices[0]?.id || '')
          });
          return contextServices;
        }
      }
      
      // PRIORITY 3: Only use fallbacks if no real services available
      console.log('[ServiceSelection] 🔄 Falling back to emergency services');
      const emergencyServices: ServiceOption[] = [
        {
          id: 'emergency-crypto',
          _id: 'emergency-crypto',
          name: 'Cryptocurrency Recovery',
          description: 'Emergency fallback service for cryptocurrency recovery',
          duration: 75,
          price: 750,
          formattedPrice: '£750',
          formattedDuration: '1 hour 15 minutes',
          type: 'recovery' as ServiceOption['type'],
          category: 'recovery',
          isActive: true,
          isDevelopmentFallback: true
        },
        {
          id: 'emergency-fraud',
          _id: 'emergency-fraud',
          name: 'Investment Fraud Recovery',
          description: 'Emergency fallback service for investment fraud',
          duration: 90,
          price: 500,
          formattedPrice: '£500',
          formattedDuration: '1 hour 30 minutes',
          type: 'recovery' as ServiceOption['type'],
          category: 'recovery',
          isActive: true,
          isDevelopmentFallback: true
        }
      ];
      
      return emergencyServices;
      } catch (error) {
      console.error('[ServiceSelection] Error processing services:', error);
      return [];
    }
  }, [bookingContext?.services, services, availableServices]); // Depend on all service sources
  
  console.log('[ServiceSelection] Final services to display:', servicesToDisplay.length);
  console.log('[ServiceSelection] === CONTEXT DEBUG END ===');

  // CRITICAL: Stable initialization with attempt limiting
  useEffect(() => {
    if (!hasInitialized && 
        initializationAttempts < MAX_INITIALIZATION_ATTEMPTS &&
        !loading &&
        servicesToDisplay.length === 0) {
      
      console.log('[ServiceSelection] Attempting initialization...');
      setInitializationAttempts(prev => prev + 1);
      
      if (fetchAvailableServices) {
        fetchAvailableServices().catch((err: Error) => {
          console.error('[ServiceSelection] Initialization failed:', err);
        });
      }
      
      // Set initialized after first attempt to prevent loops
      setHasInitialized(true);
    }
  }, [hasInitialized, initializationAttempts, servicesToDisplay.length, loading, fetchAvailableServices]); // Include fetchAvailableServices

  // CRITICAL: Stable service selection handler
  const handleServiceSelect = useCallback((service: ServiceOption) => {
    try {
      console.log('[ServiceSelection] Service selected:', service.name);
      console.log('[ServiceSelection] Service ID:', service.id);
      console.log('[ServiceSelection] Service ID length:', service.id?.length);
      console.log('[ServiceSelection] Is MongoDB ObjectId format:', /^[0-9a-fA-F]{24}$/.test(service.id || ''));
      
      // Validate service ID format before selection
      if (!/^[0-9a-fA-F]{24}$/.test(service.id || '')) {
        console.error('[ServiceSelection] WARNING: Selected service has invalid MongoDB ObjectId:', service.id);
        // In development, show warning but allow selection
        if (process.env.NODE_ENV === 'development') {
          alert(`Warning: Service ID "${service.id}" is not a valid MongoDB ObjectId. This will cause booking to fail.`);
        }
      }
      
      setLocalSelectedService(service);
      onServiceSelect(service);
      onDataChange?.({ selectedService: service });
      onComplete?.(service);
    } catch (error) {
      console.error('[ServiceSelection] Error handling service selection:', error);
    }
  }, [onServiceSelect, onDataChange, onComplete]);

  // EMERGENCY: If infinite loop detected, show emergency UI
  if (emergencyStop) {
    return (
      <EmergencyStopContainer>
        <EmergencyIcon>🚨</EmergencyIcon>
        <EmergencyTitle>System Emergency Stop</EmergencyTitle>
        <EmergencyMessage>
          Infinite render loop detected ({renderCount} renders). System has been stopped to prevent browser crash.
        </EmergencyMessage>
        
        <EmergencyActions>
          <EmergencyButton onClick={() => {
            window.location.reload();
          }}>
            Restart Application
          </EmergencyButton>
          
          <EmergencyButton onClick={() => {
            isEmergencyStoppedRef.current = false;
            setEmergencyStop(false);
            renderCountRef.current = 0;
            lastResetRef.current = Date.now();
          }}>
            Try to Continue (Risky)
          </EmergencyButton>
        </EmergencyActions>
        
        <EmergencyDebug>
          <strong>Debug Information</strong>
          {JSON.stringify({
            renderCount: renderCount,
            timeSinceLastReset: Date.now() - lastResetRef.current,
            emergencyStop: emergencyStop,
            location: window.location.href
          }, null, 2)}
        </EmergencyDebug>
      </EmergencyStopContainer>
    );
  }

  // Error fallback UI
  if (error) {
    return (
      <StyledServiceSelection>
        <ErrorContainer>
          <h3>Service Loading Error</h3>
          <p>{error}</p>
          <SimpleButton 
            variant="primary"
            onClick={() => {
              console.log('[ServiceSelection] Retrying service fetch...');
              setInitializationAttempts(0);
              setHasInitialized(false);
              fetchAvailableServices?.(true);
            }}
          >
            Retry Loading Services
          </SimpleButton>
          {onBack && (
            <SimpleButton variant="outline" onClick={onBack}>
              Go Back
            </SimpleButton>
          )}
        </ErrorContainer>
      </StyledServiceSelection>
    );
  }

  // Loading state
  if (loading && servicesToDisplay.length === 0) {
    return (
      <StyledServiceSelection>
        <LoadingContainer>
          <p>Loading available services...</p>
          <small>Attempt #{initializationAttempts}</small>
          {initializationAttempts >= MAX_INITIALIZATION_ATTEMPTS && (
            <p style={{ color: '#dc3545', marginTop: '16px' }}>
              Unable to load services. Using emergency fallback.
            </p>
          )}
        </LoadingContainer>
      </StyledServiceSelection>
    );
  }

  // Empty state
  if (servicesToDisplay.length === 0) {
    return (
      <StyledServiceSelection>
        <EmptyContainer>
          <h3>No Services Available</h3>
          <p>Unable to load services at this time.</p>
          
          <SimpleButton 
            variant="primary"
            onClick={() => {
              console.log('[ServiceSelection] Manual service retry...');
              setInitializationAttempts(0);
              setHasInitialized(false);
              fetchAvailableServices?.(true);
            }}
          >
            Retry Loading
          </SimpleButton>
        </EmptyContainer>
      </StyledServiceSelection>
    );
  }

  // Main services display
  return (
    <StyledServiceSelection>
      <ServiceHeader>
        <h2>Choose Your Recovery Service</h2>
        <p>Select the service that best fits your needs</p>
      </ServiceHeader>

      <ServicesGrid>
        {servicesToDisplay.map((service: ServiceOption) => (
          <BookingServiceCard
            key={service.id || service._id}
            service={service}
            isSelected={localSelectedService?.id === service.id}
            onClick={() => handleServiceSelect(service)}
          />
        ))}
      </ServicesGrid>

      <RenderDebugInfo>
        Renders: {renderCountRef.current} | Services: {servicesToDisplay.length} | 
        Initialized: {hasInitialized.toString()} | Attempts: {initializationAttempts}
      </RenderDebugInfo>
    </StyledServiceSelection>
  );
};

// Export both default and named to satisfy all import patterns
export default ServiceSelectionStep; 