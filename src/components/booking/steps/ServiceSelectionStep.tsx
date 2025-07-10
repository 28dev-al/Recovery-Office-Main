/**
 * Service Selection Step - Fixed Version
 * 
 * Properly handles service selection with data persistence
 */

import React, { useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useBookingState } from '../../../hooks/useBookingState';
import { useBooking } from '../../../context/BookingContext';
import { ServiceData, isValidService } from '../../../types/service';

interface ServiceSelectionStepProps {
  onServiceSelect: (service: ServiceData) => void;
  onNext?: () => void;
  onComplete?: () => void;
  onBack?: () => void;
}

export const ServiceSelectionStep: React.FC<ServiceSelectionStepProps> = ({
  onServiceSelect,
  onNext,
  onComplete,
  onBack: _onBack
}) => {
  const { t, i18n } = useTranslation();
  const bookingState = useBookingState();
  const { state: bookingContext } = useBooking();
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);

  // CRITICAL FIX: Use real services from BookingContext instead of hardcoded fake ones
  const services = bookingContext.availableServices || [];

  // 🇩🇪 FORCE CONSOLE VERIFICATION - GERMAN LANGUAGE CHECK
  console.log('🇩🇪 LANGUAGE CHECK:', i18n.language);
  console.log('🇩🇪 SHOULD SHOW GERMAN:', i18n.language === 'de');
  
  if (i18n.language === 'de') {
    console.log('🇩🇪 GERMAN ACTIVE - Cards should show German text');
  } else {
    console.log('🇬🇧 ENGLISH ACTIVE - Cards should show English text');
  }

  console.log('[ServiceSelection] Available services:', services);
  console.log('[ServiceSelection] Services count:', services.length);
  console.log('[ServiceSelection] Current language:', i18n.language);

  // 🇩🇪 FORCE GERMAN TRANSLATION - HARDCODED APPROACH
  const getServiceTitle = (serviceName: string): string => {
    if (i18n.language === 'de') {
      const germanTitles: { [key: string]: string } = {
        'Cryptocurrency Recovery': 'Kryptowährungs-Rückgewinnung',
        'Financial Scam Recovery': 'Finanzbetrug-Rückgewinnung',
        'Investment Fraud Recovery': 'Anlagebetrug-Rückgewinnung',
        'Regulatory Complaint Assistance': 'Regulatorische Beschwerde-Unterstützung',
        'Initial Consultation': 'Erstberatung',
        'Financial Investigation': 'Finanzielle Untersuchung'
      };
      return germanTitles[serviceName] || serviceName;
    }
    return serviceName;
  };

  const getServiceDescription = (originalDesc: string): string => {
    if (i18n.language === 'de') {
      const germanDescriptions: { [key: string]: string } = {
        'Specialized recovery for lost or stolen cryptocurrency including Bitcoin, Ethereum, and altcoins': 'Spezialisierte Rückgewinnung für verlorene oder gestohlene Kryptowährungen einschließlich Bitcoin, Ethereum und Altcoins',
        'Recovery assistance for various financial scams including romance scams and advance fee fraud': 'Rückgewinnungshilfe für verschiedene Finanzbetrug einschließlich Romance-Scams und Vorschussbetrug',
        'Comprehensive recovery service for victims of investment fraud and Ponzi schemes': 'Umfassender Rückgewinnungsservice für Opfer von Anlagebetrug und Ponzi-Schemata',
        'Expert guidance through regulatory complaint processes with financial authorities and ombudsman services': 'Expertenberatung bei regulatorischen Beschwerdeverfahren mit Finanzbehörden und Ombudsstellen',
        'Specialized recovery for lost or stolen cryptocurrency': 'Spezialisierte Rückgewinnung für verlorene oder gestohlene Kryptowährungen',
        'Comprehensive recovery service for investment fraud cases': 'Umfassender Rückgewinnungsservice für Anlagebetrug-Fälle',
        'Comprehensive assessment of your recovery case': 'Umfassende Bewertung Ihres Rückgewinnungsfalles',
        'Comprehensive financial investigation services': 'Umfassende finanzielle Ermittlungsdienstleistungen'
      };
      return germanDescriptions[originalDesc] || originalDesc;
    }
    return originalDesc;
  };

  const getDuration = (duration: number): string => {
    if (i18n.language === 'de') {
      return `${duration} Minuten`;
    }
    return `${duration} minutes`;
  };

  const getPrice = (serviceData: ServiceData): string => {
    if (i18n.language === 'de') {
      // FORCE EURO PRICING FOR GERMAN
      const euroPricing: { [key: string]: string } = {
        'Cryptocurrency Recovery': '€850',
        'Financial Scam Recovery': '€450',
        'Investment Fraud Recovery': '€650',
        'Regulatory Complaint Assistance': '€350',
        'Initial Consultation': '€0',
        'Financial Investigation': '€600'
      };
      return euroPricing[serviceData.name] || '€650';
    }
    return serviceData.formattedPrice || `£${serviceData.price || 500}`;
  };

  // Helper function to get translated service content with FORCED hardcoded translations
  const getTranslatedServiceContent = (service: ServiceData) => {
    const title = getServiceTitle(service.name);
    const description = getServiceDescription(service.description || '');
    const duration = getDuration(service.duration || 60);
    const price = getPrice(service);
    
    console.log(`🇩🇪 [ServiceSelection] FORCED TRANSLATION for: ${service.name}`, {
      originalTitle: service.name,
      translatedTitle: title,
      originalDescription: service.description,
      translatedDescription: description,
      duration: duration,
      price: price,
      language: i18n.language,
      isGerman: i18n.language === 'de'
    });
    
    return {
      title,
      description,
      duration,
      price
    };
  };

  // UPDATED: More permissive validation - allow fallback services for display but prefer real ones
  const validateService = (service: unknown): boolean => {
    if (!isValidService(service)) return false;
    
    const serviceData = service as ServiceData;
    
    console.log('[ServiceSelection] Validating service:', {
      name: serviceData.name,
      _id: serviceData._id,
      isDevelopmentFallback: serviceData.isDevelopmentFallback,
      isValid: true // Always allow for display, just mark the type
    });
    
    // Allow all services for display - we'll translate them regardless
    return true;
  };

  const handleServiceSelection = (service: ServiceData) => {
    // For production, prefer real services but allow fallback in development
    if (service.isDevelopmentFallback && process.env.NODE_ENV === 'production') {
      console.warn('[ServiceSelection] Using fallback service in production:', service.name);
    }

    if (service._id) {
      setSelectedServiceId(service._id);
    }
    
    // Update local state
    bookingState.setSelectedService(service);
    
    // Call parent callback
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

  // UPDATED: Show all services but prefer real ones
  const validServices = services.filter(service => validateService(service));
  const realServices = validServices.filter(service => !service.isDevelopmentFallback);
  const fallbackServices = validServices.filter(service => service.isDevelopmentFallback);
  
  // Use real services if available, otherwise use fallback services
  const servicesToShow = realServices.length > 0 ? realServices : fallbackServices;
  
  console.log('[ServiceSelection] Services breakdown:', {
    total: services.length,
    valid: validServices.length,
    real: realServices.length,
    fallback: fallbackServices.length,
    showing: servicesToShow.length
  });
  
  if (servicesToShow.length === 0) {
    return (
      <ErrorContainer>
        <ErrorText>Unable to load services. Please refresh the page.</ErrorText>
        <RetryButton onClick={() => window.location.reload()}>
          Refresh Page
        </RetryButton>
      </ErrorContainer>
    );
  }

  return (
    <SelectionContainer>
      <StepHeader>
        <StepTitle>{t('booking.serviceSelection.title', 'Select Your Service')}</StepTitle>
        <StepDescription>{t('booking.serviceSelection.description', 'Choose the recovery service you need')}</StepDescription>
      </StepHeader>

      <ServicesGrid>
        {servicesToShow.map((service) => {
          const translatedContent = getTranslatedServiceContent(service);
          
          console.log(`🇩🇪 [ServiceSelection] RENDERING SERVICE: ${service.name}`, {
            translatedTitle: translatedContent.title,
            translatedDescription: translatedContent.description,
            translatedDuration: translatedContent.duration,
            translatedPrice: translatedContent.price,
            language: i18n.language,
            isGerman: i18n.language === 'de'
          });
          
          return (
            <ServiceCard
              key={service._id}
              onClick={() => handleServiceSelection(service)}
              selected={selectedServiceId === service._id}
            >
              <ServiceIcon>{getServiceIcon(service.id, service.name, service.category)}</ServiceIcon>
              <ServiceName>{translatedContent.title}</ServiceName>
              <ServiceDescription>{translatedContent.description}</ServiceDescription>
              <ServiceDetails>
                <ServiceDuration>{translatedContent.duration}</ServiceDuration>
                <ServicePrice>{translatedContent.price}</ServicePrice>
              </ServiceDetails>
              {/* Debug info in development */}
              {process.env.NODE_ENV === 'development' && (
                <DebugInfo>
                  🇩🇪 Lang: {i18n.language} | Original: {service.name} | Translated: {translatedContent.title}
                </DebugInfo>
              )}
            </ServiceCard>
          );
        })}
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
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 30px;
  
  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const StepHeader = styled.div`
  text-align: center;
  margin-bottom: 48px;
`;

const StepTitle = styled.h2`
  font-size: 32px;
  color: #1a365d;
  margin-bottom: 16px;
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
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-bottom: 40px;
  
  @media (max-width: 650px) {
    grid-template-columns: 1fr;
  }
`;

const ServiceCard = styled.div<{ selected: boolean }>`
  background: white;
  border: 2px solid ${({ selected }) => selected ? '#d69e2e' : '#e5e7eb'};
  border-radius: 16px;
  padding: 32px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  text-align: center;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: ${({ selected }) => selected ? '4px' : '0'};
    background: linear-gradient(90deg, #d69e2e, #f6ad3a);
    transition: all 0.3s ease;
  }

  &:hover {
    border-color: #d69e2e;
    transform: translateY(-8px);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.12);
    
    &::after {
      height: 4px;
    }
  }

  ${({ selected }) => selected && `
    background: #fef9e7;
    border-color: #d69e2e;
    transform: translateY(-6px);
    box-shadow: 0 12px 40px rgba(214, 158, 46, 0.25);
  `}
`;

const ServiceIcon = styled.div`
  font-size: 48px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  width: 100px;
  margin: 0 auto 24px;
  border-radius: 50%;
  background: linear-gradient(135deg, #1a365d 0%, #2c5282 100%);
  color: #d69e2e;
  box-shadow: 0 8px 20px rgba(26, 54, 93, 0.3);
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);

  /* Premium hover effect */
  ${ServiceCard}:hover & {
    transform: scale(1.08) translateY(-5px);
    box-shadow: 0 15px 30px rgba(214, 158, 46, 0.4);
    background: linear-gradient(135deg, #1a365d 0%, #0A214F 100%);
  }
`;

const ServiceName = styled.h3`
  font-size: 22px;
  font-weight: 700;
  color: #1a365d;
  margin-bottom: 16px;
`;

const ServiceDescription = styled.p`
  font-size: 15px;
  color: #6b7280;
  line-height: 1.6;
  margin-bottom: 24px;
  flex-grow: 1;
`;

const ServiceDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #e5e7eb;
  margin-top: auto;
`;

const ServiceDuration = styled.span`
  font-size: 14px;
  color: #6b7280;
  display: flex;
  align-items: center;
  
  &::before {
    content: '🕒';
    margin-right: 6px;
    font-size: 16px;
  }
`;

const ServicePrice = styled.span`
  font-size: 22px;
  font-weight: 700;
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