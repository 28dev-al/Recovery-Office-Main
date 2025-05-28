import React from 'react';
import styled from 'styled-components';
import { useBookingState } from '../../../hooks/useBookingState';
import ServiceSelectionStep from '../../../components/booking/steps/ServiceSelectionStep';
import DateSelectionStep from '../../../components/booking/steps/DateSelectionStep';
import ClientInfoStep from '../../../components/booking/steps/ClientInfoStep';
import ConfirmationStep from '../../../components/booking/steps/ConfirmationStep';

interface Step {
  id: number;
  title: string;
  subtitle: string;
  isCompleted: boolean;
  isActive: boolean;
}

export const ProfessionalBookingWizard: React.FC = () => {
  const {
    selectedService,
    selectedDate,
    selectedTimeSlot,
    clientInfo,
    currentStep,
    setSelectedService,
    setClientInfo,
    setCurrentStep,
    validateStep
  } = useBookingState();
  
  // Always log current state for debugging
  console.log('[Wizard] Current state:', {
    step: currentStep,
    hasService: !!selectedService,
    serviceName: selectedService?.name,
    hasDate: !!selectedDate,
    hasTime: !!selectedTimeSlot,
    hasClient: !!clientInfo
  });

  const steps: Step[] = [
    {
      id: 1,
      title: 'Select Service',
      subtitle: 'Choose your recovery service',
      isCompleted: !!selectedService,
      isActive: currentStep === 1
    },
    {
      id: 2,
      title: 'Date & Time',
      subtitle: 'Schedule your consultation',
      isCompleted: !!selectedDate && !!selectedTimeSlot,
      isActive: currentStep === 2
    },
    {
      id: 3,
      title: 'Your Information',
      subtitle: 'Provide consultation details',
      isCompleted: !!clientInfo?.firstName && !!clientInfo?.email,
      isActive: currentStep === 3
    },
    {
      id: 4,
      title: 'Confirmation',
      subtitle: 'Review and confirm booking',
      isCompleted: false, // Will be completed when booking is submitted
      isActive: currentStep === 4
    }
  ];

  const handleNext = () => {
    if (currentStep < 4 && validateStep(currentStep + 1)) {
      setCurrentStep(currentStep + 1);
    } else {
      console.error('[Wizard] Cannot proceed to next step. Validation failed.');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <ServiceSelectionStep
            onServiceSelect={(service) => {
              setSelectedService(service);
              // Auto-advance to next step
              setTimeout(() => setCurrentStep(2), 100);
            }}
            onNext={handleNext}
          />
        );

      case 2:
        return (
          <DateSelectionStep
            selectedService={selectedService}
            onComplete={() => {
              handleNext();
            }}
            onBack={handleBack}
          />
        );

      case 3:
        return (
          <ClientInfoStep
            onComplete={(info) => {
              if (info) {
                setClientInfo(info);
                setCurrentStep(4);
              }
            }}
            onBack={handleBack}
            data={{
              selectedService,
              selectedDate: selectedDate || undefined,
              selectedTimeSlot,
              clientInfo
            }}
          />
        );

      case 4:
        return (
          <ConfirmationStep
            bookingData={{
              service: selectedService,
              date: selectedDate || '',
              timeSlot: { 
                id: 'selected-slot',
                startTime: selectedTimeSlot || '',
                endTime: '',
                duration: 60,
                available: true
              },
              clientInfo: clientInfo || {}
            }}
            onBack={handleBack}
          />
        );

      default:
        return <div>Invalid step</div>;
    }
  };

  return (
    <WizardContainer>
      <ProgressIndicator>
        {steps.map((step) => (
          <StepIndicator 
            key={step.id}
            active={step.isActive} 
            completed={step.isCompleted}
          >
            {step.id}. {step.title}
          </StepIndicator>
        ))}
      </ProgressIndicator>

      <StepContainer>
        {renderStep()}
      </StepContainer>

      {/* Debug Panel (remove in production) */}
      <DebugPanel>
        <h4>Debug Info:</h4>
        <p>Step: {currentStep}</p>
        <p>Service: {selectedService?.name || 'None'}</p>
        <p>Date: {selectedDate || 'None'}</p>
        <p>Time: {selectedTimeSlot || 'None'}</p>
        <p>Valid Next: {validateStep(currentStep + 1) ? 'Yes' : 'No'}</p>
      </DebugPanel>
    </WizardContainer>
  );
};

const WizardContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const ProgressIndicator = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
  padding: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const StepIndicator = styled.div<{ active: boolean; completed: boolean }>`
  padding: 12px 20px;
  border-radius: 6px;
  font-weight: 600;
  font-size: 14px;

  ${({ active, completed }) => {
    if (completed) return 'background: #38a169; color: white;';
    if (active) return 'background: #d69e2e; color: white;';
    return 'background: #e2e8f0; color: #4a5568;';
  }}
`;

const StepContainer = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  min-height: 500px;
`;

const DebugPanel = styled.div`
  margin-top: 20px;
  padding: 16px;
  background: #f7fafc;
  border-radius: 8px;
  font-size: 12px;

  h4 {
    margin-bottom: 8px;
    color: #1a365d;
  }

  p {
    margin: 4px 0;
    color: #4a5568;
  }
`; 