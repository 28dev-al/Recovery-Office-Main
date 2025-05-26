/**
 * Professional BookingPage with Complete Step Implementation
 * 
 * Full booking wizard with all steps implemented using professional components.
 * Features complete backend integration and error handling.
 */

import React, { useState } from 'react';
import styled from 'styled-components';
import { ServiceTest } from '../../components/debug/ServiceTest';
import ServiceSelectionStep from '../../components/booking/steps/ServiceSelectionStep';
import DateSelectionStep from '../../components/booking/steps/DateSelectionStep';
import ClientInfoStep from '../../components/booking/steps/ClientInfoStep';
import ConfirmationStep from '../../components/booking/steps/ConfirmationStep';
import { BookingErrorBoundary, SimpleLoader } from '../../components/booking/BookingErrorBoundary';
import { vlog, vsuccess } from '../../utils/debugLogger';
import { ServiceOption, BookingTimeSlot, ClientInformation } from '../../types/booking.types';

interface BookingData {
  selectedService?: ServiceOption;
  selectedDate?: string;
  selectedTimeSlot?: BookingTimeSlot;
  clientInfo?: ClientInformation;
  bookingReference?: string;
}

const BookingPageSimple: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [bookingData, setBookingData] = useState<BookingData>({});
  const [showDebugConsole, setShowDebugConsole] = useState(true);

  const steps = [
    {
      title: 'Select Service',
      component: 'service-selection'
    },
    {
      title: 'Choose Date & Time',
      component: 'date-selection'
    },
    {
      title: 'Your Information',
      component: 'client-info'
    },
    {
      title: 'Confirmation',
      component: 'confirmation'
    }
  ];

  // Handle service selection
  const handleServiceSelect = (service: ServiceOption) => {
    console.log('[BookingPageSimple] Service selected:', service.name);
    setBookingData(prev => ({ ...prev, selectedService: service }));
  };

  const handleStepComplete = (stepData?: unknown) => {
    vlog('[BookingPageSimple] Step completed', { step: currentStep, data: stepData });
    
    // Process step data based on current step
    if (stepData && typeof stepData === 'object') {
      const data = stepData as Record<string, unknown>;
      
      switch (currentStep) {
        case 0: // Service Selection
          if ('selectedService' in data) {
            setBookingData(prev => ({ ...prev, selectedService: data.selectedService as ServiceOption }));
          }
          break;
          
        case 1: // Date Selection
          if ('selectedDate' in data && 'selectedTimeSlot' in data) {
            setBookingData(prev => ({ 
              ...prev, 
              selectedDate: data.selectedDate as string,
              selectedTimeSlot: data.selectedTimeSlot as BookingTimeSlot
            }));
          }
          break;
          
        case 2: // Client Info
          if ('clientInfo' in data) {
            setBookingData(prev => ({ ...prev, clientInfo: data.clientInfo as ClientInformation }));
          }
          break;
          
        case 3: // Confirmation
          if ('bookingReference' in data) {
            setBookingData(prev => ({ ...prev, bookingReference: data.bookingReference as string }));
            vsuccess('[BookingPageSimple] Booking completed successfully!');
            return; // Don't advance to next step after completion
          }
          break;
      }
      
      vlog('[BookingPageSimple] Updated booking data', bookingData);
    }
    
    // Advance to next step
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => {
        const nextStep = prev + 1;
        vsuccess(`[BookingPageSimple] Moving to step ${nextStep + 1}: ${steps[nextStep].title}`);
        return nextStep;
      });
    } else {
      vsuccess('[BookingPageSimple] Booking process completed!');
    }
  };

  const handleStepBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => {
        const prevStep = prev - 1;
        vlog(`[BookingPageSimple] Going back to step ${prevStep + 1}: ${steps[prevStep].title}`);
        return prevStep;
      });
    }
  };

  const renderCurrentStep = () => {
    const currentStepComponent = steps[currentStep]?.component;

    switch (currentStepComponent) {
      case 'service-selection':
        return (
          <BookingErrorBoundary componentName="ServiceSelectionStep" fallback={<SimpleLoader message="Loading service selection..." />}>
            <ServiceSelectionStep
              onComplete={handleStepComplete}
              onBack={currentStep > 0 ? handleStepBack : undefined}
              initialData={bookingData}
              onServiceSelect={handleServiceSelect}
            />
          </BookingErrorBoundary>
        );
      
      case 'date-selection':
        if (!bookingData.selectedService) {
          return (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <h3>Please select a service first</h3>
              <p>You need to select a service before choosing a date and time.</p>
              <button onClick={handleStepBack} style={{ 
                background: '#0A214F', 
                color: 'white', 
                border: 'none', 
                padding: '12px 24px', 
                borderRadius: '6px', 
                cursor: 'pointer' 
              }}>
                ← Back to Service Selection
              </button>
            </div>
          );
        }
        
        return (
          <BookingErrorBoundary componentName="DateSelectionStep" fallback={<SimpleLoader message="Loading date selection..." />}>
            <DateSelectionStep
              onComplete={handleStepComplete}
              onBack={currentStep > 0 ? handleStepBack : undefined}
              initialData={bookingData}
              selectedService={bookingData.selectedService}
            />
          </BookingErrorBoundary>
        );
      
      case 'client-info':
        return (
          <BookingErrorBoundary componentName="ClientInfoStep" fallback={<SimpleLoader message="Loading client information..." />}>
            <ClientInfoStep
              onComplete={handleStepComplete}
              onBack={currentStep > 0 ? handleStepBack : undefined}
              initialData={bookingData}
            />
          </BookingErrorBoundary>
        );
      
      case 'confirmation':
        if (!bookingData.selectedService || !bookingData.selectedDate || !bookingData.selectedTimeSlot || !bookingData.clientInfo) {
          return (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <h3>Please complete all previous steps</h3>
              <p>You need to complete service selection, date/time selection, and client information before proceeding to confirmation.</p>
              <button onClick={handleStepBack} style={{ 
                background: '#0A214F', 
                color: 'white', 
                border: 'none', 
                padding: '12px 24px', 
                borderRadius: '6px', 
                cursor: 'pointer' 
              }}>
                ← Back
              </button>
            </div>
          );
        }
        
        return (
          <BookingErrorBoundary componentName="ConfirmationStep" fallback={<SimpleLoader message="Loading confirmation..." />}>
            <ConfirmationStep
              onComplete={handleStepComplete}
              onBack={currentStep > 0 ? handleStepBack : undefined}
              bookingData={{
                service: bookingData.selectedService,
                date: bookingData.selectedDate,
                timeSlot: bookingData.selectedTimeSlot,
                clientInfo: bookingData.clientInfo
              }}
            />
          </BookingErrorBoundary>
        );
      
      default:
        return (
          <div>
            <h3>Unknown Step</h3>
            <p>Step component not recognized: {currentStepComponent}</p>
          </div>
        );
    }
  };

  return (
    <PageContainer>
      <PageHeader>
        <MainTitle>Recovery Office - Book Your Consultation</MainTitle>
        <Subtitle>Professional financial asset recovery consultation booking</Subtitle>
        
        <DebugControls>
          <DebugButton onClick={() => setShowDebugConsole(!showDebugConsole)}>
            {showDebugConsole ? 'Hide' : 'Show'} Debug Console
          </DebugButton>
          <DebugButton onClick={() => {
            setCurrentStep(0);
            setBookingData({});
            vlog('[BookingPageSimple] Reset booking process');
          }}>
            Reset Booking
          </DebugButton>
        </DebugControls>
      </PageHeader>

      {/* Debug Console */}
      {showDebugConsole && (
        <BookingErrorBoundary componentName="ServiceTest" fallback={<div>Debug console failed to load</div>}>
          <ServiceTest autoStart={false} />
        </BookingErrorBoundary>
      )}

      {/* Step Indicator */}
      <StepIndicator>
        <StepIndicatorTitle>Booking Progress</StepIndicatorTitle>
        <StepsList>
          {steps.map((step, index) => (
            <StepItem 
              key={index} 
              $active={index === currentStep}
              $completed={index < currentStep}
              onClick={() => {
                if (index <= currentStep) {
                  setCurrentStep(index);
                  vlog(`[BookingPageSimple] Jumped to step ${index + 1}: ${step.title}`);
                }
              }}
            >
              <StepNumber $active={index === currentStep} $completed={index < currentStep}>
                {index < currentStep ? '✓' : index + 1}
              </StepNumber>
              <StepName $active={index === currentStep}>
                {step.title}
              </StepName>
            </StepItem>
          ))}
        </StepsList>
      </StepIndicator>

      {/* Main Content */}
      <MainContent>
        <ContentCard>
          {renderCurrentStep()}
        </ContentCard>
      </MainContent>

      {/* Debug Info Panel */}
      <DebugPanel>
        <DebugTitle>Booking Progress Information</DebugTitle>
        <DebugInfo>
          <div><strong>Current Step:</strong> {currentStep + 1} of {steps.length} - {steps[currentStep]?.title}</div>
          <div><strong>Selected Service:</strong> {bookingData.selectedService?.name || 'None'}</div>
          <div><strong>Selected Date:</strong> {bookingData.selectedDate || 'None'}</div>
          <div><strong>Selected Time:</strong> {bookingData.selectedTimeSlot ? 
            `${new Date(bookingData.selectedTimeSlot.startTime).toLocaleTimeString()} - ${new Date(bookingData.selectedTimeSlot.endTime).toLocaleTimeString()}` : 
            'None'}</div>
          <div><strong>Client Name:</strong> {bookingData.clientInfo ? 
            `${bookingData.clientInfo.firstName} ${bookingData.clientInfo.lastName}` : 
            'None'}</div>
          <div><strong>Booking Reference:</strong> {bookingData.bookingReference || 'Pending'}</div>
          <div><strong>Complete Booking Data:</strong></div>
          <pre>{JSON.stringify(bookingData, null, 2)}</pre>
        </DebugInfo>
      </DebugPanel>
    </PageContainer>
  );
};

// Styled Components
const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: system-ui, -apple-system, sans-serif;
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 32px;
  padding: 24px;
  background: linear-gradient(135deg, #0A214F 0%, #1a365d 100%);
  color: white;
  border-radius: 12px;
`;

const MainTitle = styled.h1`
  margin: 0 0 8px 0;
  font-size: 28px;
  font-weight: 700;
`;

const Subtitle = styled.p`
  margin: 0 0 16px 0;
  opacity: 0.9;
  font-size: 16px;
`;

const DebugControls = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
`;

const DebugButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const StepIndicator = styled.div`
  background: white;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 24px;
`;

const StepIndicatorTitle = styled.h3`
  margin: 0 0 16px 0;
  font-size: 18px;
  color: #495057;
`;

const StepsList = styled.div`
  display: flex;
  justify-content: space-between;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
  }
`;

const StepItem = styled.div<{ $active: boolean; $completed: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: ${props => props.$active || props.$completed ? 'pointer' : 'default'};
  opacity: ${props => props.$active || props.$completed ? 1 : 0.6};
`;

const StepNumber = styled.div<{ $active: boolean; $completed: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${props => 
    props.$completed ? '#28a745' : 
    props.$active ? '#0A214F' : '#e9ecef'};
  color: ${props => props.$active || props.$completed ? 'white' : '#6c757d'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
`;

const StepName = styled.span<{ $active: boolean }>`
  font-weight: ${props => props.$active ? 600 : 400};
  color: ${props => props.$active ? '#0A214F' : '#6c757d'};
  
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const MainContent = styled.div`
  margin-bottom: 24px;
`;

const ContentCard = styled.div`
  background: white;
  border: 1px solid #dee2e6;
  border-radius: 12px;
  padding: 32px;
  min-height: 400px;
`;

const DebugPanel = styled.div`
  background: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  padding: 20px;
  margin-top: 24px;
`;

const DebugTitle = styled.h4`
  margin: 0 0 16px 0;
  color: #495057;
`;

const DebugInfo = styled.div`
  font-family: monospace;
  font-size: 12px;
  color: #6c757d;
  
  div {
    margin-bottom: 8px;
  }
  
  pre {
    background: white;
    padding: 12px;
    border-radius: 4px;
    border: 1px solid #dee2e6;
    overflow-x: auto;
    margin-top: 8px;
  }
`;

export default BookingPageSimple; 