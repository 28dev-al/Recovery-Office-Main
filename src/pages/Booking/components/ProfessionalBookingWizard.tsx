import React, { useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { ServiceSelectionStep } from '../../../components/booking/steps/ServiceSelectionStep';
import { DateSelectionStep } from '../../../components/booking/steps/DateSelectionStep';
import ClientInfoStep from '../../../components/booking/steps/ClientInfoStep';
import { ConfirmationStep } from '../../../components/booking/steps/ConfirmationStep';
import { ServiceData } from '../../../types/service';
import { ClientInformation } from '../../../types/client';
import { BookingTimeSlot } from '../../../types/booking.types';

interface Step {
  id: number;
  title: string;
  subtitle: string;
  isCompleted: boolean;
  isActive: boolean;
}

export const ProfessionalBookingWizard: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedService, setSelectedService] = useState<ServiceData | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [clientInfo, setClientInfo] = useState<ClientInformation | null>(null);

  // 🇬🇧 ENGLISH LANGUAGE VERIFICATION - Add console debugging
  console.log('🇬🇧 LANGUAGE CHECK:', i18n.language);
  console.log('🇬🇧 Step 1 text:', t('booking.steps.selectService'));
  console.log('🇬🇧 Step 2 text:', t('booking.steps.dateTime'));

  if (i18n.language === 'en') {
    console.log('🇬🇧 ENGLISH MODE - Steps should show English text');
  } else if (i18n.language === 'de') {
    console.log('🇩🇪 GERMAN MODE - Steps should show German text');
  }

  // Enhanced validation function with proper state checking
  const validateStep = (stepNumber: number): boolean => {
    switch (stepNumber) {
      case 1: return true; // Always allow going to service selection
      case 2: return selectedService !== null && selectedService !== undefined; // Need service for date selection
      case 3: return selectedDate !== null && selectedTimeSlot !== null; // Need date/time for client info
      case 4: return !!(clientInfo && clientInfo.firstName && clientInfo.lastName && clientInfo.email && clientInfo.phone); // Need client info for confirmation
      default: return false;
    }
  };

  const steps: Step[] = [
    {
      id: 1,
      title: t('booking.steps.selectService', '1. Select Service'),
      subtitle: 'Choose your recovery service',
      isCompleted: selectedService !== null,
      isActive: currentStep === 1
    },
    {
      id: 2,
      title: t('booking.steps.dateTime', '2. Date & Time'),
      subtitle: 'Schedule your consultation',
      isCompleted: !!(selectedDate && selectedTimeSlot),
      isActive: currentStep === 2
    },
    {
      id: 3,
      title: t('booking.steps.information', '3. Your Information'),
      subtitle: 'Provide consultation details',
      isCompleted: !!(clientInfo?.firstName && clientInfo?.email),
      isActive: currentStep === 3
    },
    {
      id: 4,
      title: t('booking.steps.confirmation', '4. Confirmation'),
      subtitle: 'Review and confirm booking',
      isCompleted: false, // Will be completed when booking is submitted
      isActive: currentStep === 4
    }
  ];

  const handleNext = () => {
    const canProceed = validateStep(currentStep + 1);
    
    if (currentStep < 4 && canProceed) {
      setCurrentStep(currentStep + 1);
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
        return selectedService ? (
          <DateSelectionStep
            selectedService={selectedService}
            onComplete={(data?: {
              selectedDate?: string;
              selectedTimeSlot?: string;
              date?: string;
              timeSlot?: string;
              service?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
            }) => {
              // Update state immediately and synchronously
              let dateToSave: string | null = null;
              let timeToSave: string | null = null;
              
              // Handle different data formats that might be passed
              if (data) {
                if (data.selectedDate) {
                  dateToSave = data.selectedDate;
                }
                if (data.selectedTimeSlot) {
                  timeToSave = data.selectedTimeSlot;
                }
                // Alternative property names
                if (data.date && !data.selectedDate) {
                  dateToSave = data.date;
                }
                if (data.timeSlot && !data.selectedTimeSlot) {
                  timeToSave = data.timeSlot;
                }
              }
              
              // Update state
              if (dateToSave) setSelectedDate(dateToSave);
              if (timeToSave) setSelectedTimeSlot(timeToSave);
              
              // Auto-advance if we have both date and time
              if (dateToSave && timeToSave) {
                setTimeout(() => setCurrentStep(3), 100);
              }
            }}
            onBack={handleBack}
          />
        ) : null;

      case 3:
        return (
          <ClientInfoStep
            onComplete={(info?: ClientInformation) => {
              if (info) {
                setClientInfo(info);
                setCurrentStep(4);
              }
            }}
            onBack={handleBack}
            data={{
              selectedService: selectedService,
              selectedDate: selectedDate || undefined,
              selectedTimeSlot: selectedTimeSlot || undefined,
              clientInfo: clientInfo as any // eslint-disable-line @typescript-eslint/no-explicit-any
            }}
          />
        );

      case 4:
        // Only render confirmation if we have all required data
        if (!selectedService || !selectedDate || !selectedTimeSlot) {
          return <div>Missing required booking data. Please go back and complete all steps.</div>;
        }

        return (
          <ConfirmationStep
            bookingData={{
              service: selectedService,
              date: selectedDate,
              timeSlot: { 
                id: 'selected-slot',
                startTime: selectedTimeSlot,
                endTime: '',
                duration: 60,
                available: true
              } as BookingTimeSlot,
              clientInfo: clientInfo as any // eslint-disable-line @typescript-eslint/no-explicit-any
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