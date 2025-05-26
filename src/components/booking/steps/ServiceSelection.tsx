import * as React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { DefaultTheme } from 'styled-components';
import { PHI, PHI_INVERSE, SACRED_SPACING, SACRED_RADIUS } from '../../../constants/sacred-geometry';
import { getFibonacciByIndex } from '../../../utils/getFibonacciByIndex';
import { useBooking } from '../../../context/BookingContext';
import { ServiceOption, ServiceSelectionStepProps } from '../../../types/booking.types';
import { validateServiceSelection } from '../validation/serviceSelection.schema';
import BookingErrorLogger from '../BookingErrorLogger';
import FallbackImage from '../../../design-system/components/utility/FallbackImage';
import { BookingStepId } from '../../../types/booking.types';

// Fallback SVG for service icons
const ServiceIconFallback = () => (
  <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="56" height="56" rx="8" fill="#f0f5f9"/>
    <path d="M28 20v16M20 28h16" stroke="#0A4021" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

/**
 * Container for the service selection component
 * Uses sacred spacing for margins
 */
const Container = styled.div`
  width: 100%;
  padding: ${SACRED_SPACING.md}px 0;
`;

/**
 * Title for the service selection section
 * Uses golden ratio for line height
 */
const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: ${SACRED_SPACING.lg}px;
  line-height: ${PHI};
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors?.text?.dark || '#1a202c'};
`;

/**
 * Description for the service selection section
 * Uses PHI for line height and margin calculations
 */
const SectionDescription = styled.p`
  margin-bottom: ${SACRED_SPACING.xl}px;
  line-height: ${PHI};
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors?.text?.main || '#4a5568'};
`;

/**
 * Grid container for service cards
 * Uses Fibonacci for gap between items
 */
const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: ${SACRED_SPACING.md}px;
  width: 100%;
  margin-bottom: ${SACRED_SPACING.lg}px;
`;

/**
 * Service card component
 * Uses golden rectangle proportions and Fibonacci spacing
 */
const ServiceCard = styled.div`
  padding: ${SACRED_SPACING.md}px;
  border-radius: ${SACRED_RADIUS.sm}px;
  background-color: var(--card-bg-color);
  border: 1px solid var(--card-border-color);
  cursor: pointer;
  transition: all ${getFibonacciByIndex(6) * 10}ms ease-in-out;
  /* Golden rectangle proportion */
  min-height: calc(250px / ${PHI});
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-${getFibonacciByIndex(4)}px);
    box-shadow: 0 ${getFibonacciByIndex(5)}px ${getFibonacciByIndex(7)}px rgba(0, 0, 0, 0.05);
    border-color: var(--card-hover-border-color);
  }
  
  &:after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: ${getFibonacciByIndex(8)}px;
    height: ${getFibonacciByIndex(8)}px;
    background-color: var(--card-corner-color);
    clip-path: polygon(0 0, 100% 0, 100% 100%);
    transition: all ${getFibonacciByIndex(6) * 10}ms ease-in-out;
  }
`;

/**
 * Service icon container
 */
const ServiceIconContainer = styled.div`
  width: 56px;
  height: 56px;
  margin-bottom: ${SACRED_SPACING.sm}px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

/**
 * Service title component
 * Uses PHI-based spacing and line height
 */
const ServiceTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: ${SACRED_SPACING.xs}px;
  line-height: ${PHI};
  color: var(--title-color);
`;

/**
 * Service description component
 * Uses Fibonacci for margin and PHI for line height
 */
const ServiceDescription = styled.p`
  font-size: 0.875rem;
  margin-bottom: ${SACRED_SPACING.sm}px;
  line-height: ${PHI};
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors?.text?.main || '#4a5568'};
  /* Keep at golden ratio of total height */
  height: ${100 * PHI_INVERSE}%;
`;

/**
 * Service duration badge
 * Uses Fibonacci for dimensions and spacing
 */
const ServiceDuration = styled.span`
  display: inline-block;
  padding: ${getFibonacciByIndex(4)}px ${getFibonacciByIndex(5)}px;
  background-color: ${({ theme }: { theme: DefaultTheme }) => theme.colors?.background?.[200] || '#edf2f7'};
  border-radius: ${SACRED_RADIUS.xs}px;
  font-size: 0.75rem;
  font-weight: 500;
`;

/**
 * Error message component
 * Uses sacred spacing and colors for consistent appearance
 */
const ErrorMessage = styled.div`
  color: #e53e3e;
  font-size: 0.875rem;
  margin-bottom: ${SACRED_SPACING.md}px;
  padding: ${SACRED_SPACING.xs}px ${SACRED_SPACING.sm}px;
  background-color: #fed7d7;
  border-radius: ${SACRED_RADIUS.xs}px;
  border-left: 3px solid #e53e3e;
`;

/**
 * Continue button component
 * Uses sacred spacing for dimensions
 */
const ContinueButton = styled.button`
  background-color: ${({ theme }: { theme: DefaultTheme }) => theme.colors?.primary?.[600] || '#38a169'};
  color: white;
  border: none;
  border-radius: ${SACRED_RADIUS.sm}px;
  padding: ${SACRED_SPACING.sm}px ${SACRED_SPACING.lg}px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all ${getFibonacciByIndex(5) * 10}ms ease-in-out;
  
  &:hover {
    background-color: ${({ theme }: { theme: DefaultTheme }) => theme.colors?.primary?.[700] || '#2f855a'};
  }
  
  &:disabled {
    background-color: ${({ theme }: { theme: DefaultTheme }) => theme.colors?.text?.disabled || '#a0aec0'};
    cursor: not-allowed;
  }
`;

/**
 * ServiceSelection component
 * Allows users to select a service from available options
 * Uses sacred geometry principles throughout for harmonious design
 */
const ServiceSelection: React.FC<ServiceSelectionStepProps> = ({ 
  onComplete, 
  isLoading = false,
  className,
  initialData
}) => {
  const { 
    state,
    selectedService, 
    selectService, 
    isResourceLoading 
  } = useBooking();
  
  const availableServices = state.availableServices || [];
  const loadingServices = isResourceLoading ? isResourceLoading('services') : false;
  
  // Use local state for selected service (initialized from props or context)
  const [localSelectedService, setLocalSelectedService] = useState<ServiceOption | undefined>(
    initialData?.selectedService || selectedService
  );
  const [validationError, setValidationError] = useState<string>('');
  const [serviceLoadErrors, setServiceLoadErrors] = useState<Record<string, boolean>>({});
  
  // Log available services for debugging
  useEffect(() => {
    if (availableServices && availableServices.length > 0) {
      console.debug('[ServiceSelection] Available services:', 
        availableServices.map(s => ({
          id: s.id,
          name: s.name,
          hasImage: !!s.image
        }))
      );
    }
  }, [availableServices]);
  
  const handleSelectService = (service: ServiceOption) => {
    if (!service) {
      console.error('[ServiceSelection] Attempted to select undefined service');
      return;
    }
    
    try {
      setLocalSelectedService(service);
      selectService(service);
      setValidationError('');
      
      console.debug('[ServiceSelection] Selected service:', {
        id: service.id,
        name: service.name,
        hasImage: !!service.image
      });
    } catch (error) {
      console.error('[ServiceSelection] Error selecting service:', error);
      setValidationError('Error selecting service. Please try again.');
    }
  };

  const handleContinue = () => {
    try {
      if (!localSelectedService) {
        setValidationError('Please select a service to continue.');
        return;
      }
      
      // Validate the service selection
      const validation = validateServiceSelection({
        serviceId: localSelectedService.id,
        isRecurring: false
      });
      
      if (!validation.success) {
        // Safely access potential error messages
        const errorMessage = validation.errors 
          ? (validation.errors.form || (validation.errors as Record<string, string>).serviceId || 'Please select a valid service.')
          : 'Please select a valid service.';
        
        setValidationError(errorMessage);
        return;
      }
      
      // Proceed to next step with the selected service data
      if (onComplete) {
        onComplete({ selectedService: localSelectedService });
      }
    } catch (error) {
      console.error('[ServiceSelection] Error on continue:', error);
      const errorMessage = error instanceof Error ? error.message : 'Please select a service to continue.';
      setValidationError(errorMessage);
    }
  };
  
  const handleImageError = (serviceId: string, error: Error) => {
    console.warn(`[ServiceSelection] Failed to load service image for service ID: ${serviceId}`, error);
    setServiceLoadErrors(prev => ({ ...prev, [serviceId]: true }));
  };
  
  if (loadingServices || isLoading) {
    return (
      <BookingErrorLogger stepId={BookingStepId.SERVICE_SELECTION} componentName="ServiceSelection">
        <div>Loading available services...</div>
      </BookingErrorLogger>
    );
  }
  
  if (!availableServices || availableServices.length === 0) {
    return (
      <BookingErrorLogger stepId={BookingStepId.SERVICE_SELECTION} componentName="ServiceSelection">
        <div>No services available. Please try again later.</div>
      </BookingErrorLogger>
    );
  }
  
  return (
    <BookingErrorLogger stepId={BookingStepId.SERVICE_SELECTION} componentName="ServiceSelection">
      <Container className={className}>
        <SectionTitle>Select a Service</SectionTitle>
        <SectionDescription>
          Choose the financial recovery service that best fits your needs. Each service includes an initial consultation to assess your specific situation.
        </SectionDescription>
        
        {validationError && (
          <ErrorMessage role="alert">{validationError}</ErrorMessage>
        )}
        
        <ServicesGrid>
          {availableServices.map((service) => {
            if (!service || !service.id) {
              console.warn('[ServiceSelection] Skipping invalid service item:', service);
              return null;
            }
            
            const isSelected = localSelectedService?.id === service.id;
            const theme = {
              cardBgColor: isSelected ? 'var(--color-primary-100, #e6f3e6)' : 'var(--color-background-50, #f9f9f9)',
              cardBorderColor: isSelected ? 'var(--color-accent-main, #38a169)' : 'var(--color-border-light, #e2e8f0)',
              cardHoverBorderColor: isSelected ? 'var(--color-accent-main, #38a169)' : 'var(--color-border-main, #cbd5e0)',
              cardCornerColor: isSelected ? 'var(--color-accent-main, #38a169)' : 'transparent',
              titleColor: isSelected ? 'var(--color-accent-dark, #276749)' : 'var(--color-text-dark, #1a202c)'
            };
            
            return (
              <ServiceCard 
                key={service.id}
                onClick={() => handleSelectService(service)}
                role="button"
                aria-pressed={isSelected}
                style={{
                  '--card-bg-color': theme.cardBgColor,
                  '--card-border-color': theme.cardBorderColor,
                  '--card-hover-border-color': theme.cardHoverBorderColor,
                  '--card-corner-color': theme.cardCornerColor,
                  '--title-color': theme.titleColor
                } as React.CSSProperties}
                data-testid={`service-card-${service.id}`}
                onKeyDown={(e: React.KeyboardEvent) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleSelectService(service);
                  }
                }}
                tabIndex={0}
              >
                {service.image && (
                  <ServiceIconContainer>
                    <FallbackImage
                      src={service.image}
                      alt={`${service.name} icon`}
                      width={56}
                      height={56}
                      fallbackComponent={<ServiceIconFallback />}
                      onImageError={(error) => handleImageError(service.id, error)}
                    />
                  </ServiceIconContainer>
                )}
                <ServiceTitle>{service.name}</ServiceTitle>
                <ServiceDescription>{service.description}</ServiceDescription>
                <ServiceDuration>{service.duration} minutes</ServiceDuration>
                {isSelected && (
                  <div style={{ 
                    position: 'absolute', 
                    top: '8px', 
                    right: '8px',
                    color: 'var(--color-accent-dark, #276749)',
                    fontWeight: 'bold'
                  }}>
                    ✓ Selected
                  </div>
                )}
              </ServiceCard>
            );
          })}
        </ServicesGrid>
        
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <ContinueButton 
            onClick={handleContinue}
            disabled={!localSelectedService || isLoading}
            data-testid="continue-button"
            aria-label="Continue to next step"
          >
            Continue
          </ContinueButton>
        </div>
      </Container>
    </BookingErrorLogger>
  );
};

export default ServiceSelection; 












