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
import { PREMIUM_COLORS } from '../../../design-system/tokens/colors.premium';

interface Step {
  id: number;
  title: string;
  subtitle: string;
  isCompleted: boolean;
  isActive: boolean;
}

export const ProfessionalBookingWizard: React.FC = () => {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedService, setSelectedService] = useState<ServiceData | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [clientInfo, setClientInfo] = useState<ClientInformation | null>(null);

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
      <ProgressContainer>
        {steps.map((step, index) => (
          <StepItem key={step.id} isLast={index === steps.length - 1}>
            <StepIndicator 
              active={step.isActive} 
              completed={step.isCompleted}
              onClick={() => validateStep(step.id) && setCurrentStep(step.id)}
              disabled={!validateStep(step.id)}
            >
              <StepNumber active={step.isActive} completed={step.isCompleted}>
                {step.isCompleted ? '✓' : step.id}
              </StepNumber>
              <StepLabel>
                <StepTitle completed={step.isCompleted}>{step.title.split('.').pop()}</StepTitle>
                <StepSubtitle>{step.subtitle}</StepSubtitle>
              </StepLabel>
            </StepIndicator>
            {index < steps.length - 1 && <StepConnector completed={step.isCompleted} />}
          </StepItem>
        ))}
      </ProgressContainer>

      <StepContainer>
        {renderStep()}
      </StepContainer>
    </WizardContainer>
  );
};

const WizardContainer = styled.div`
  width: 100%;
`;

const ProgressContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 60px;
  position: relative;
  padding: 0 10px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
    margin-left: 10px;
    margin-bottom: 40px;
  }
`;

const StepItem = styled.div<{ isLast: boolean }>`
  display: flex;
  align-items: center;
  position: relative;
  width: ${props => props.isLast ? 'auto' : '100%'};
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const StepIndicator = styled.div<{ active: boolean; completed: boolean; disabled: boolean }>`
  display: flex;
  align-items: center;
  cursor: ${props => (props.disabled ? 'not-allowed' : props.completed ? 'pointer' : props.active ? 'default' : 'not-allowed')};
  transition: all 0.3s ease;
  z-index: 2;
  opacity: ${props => props.disabled ? 0.6 : 1};
  
  &:hover {
    transform: ${props => (!props.disabled && props.completed) ? 'translateY(-2px)' : 'none'};
  }
`;

const StepNumber = styled.div<{ active: boolean; completed: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 18px;
  margin-right: 12px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  
  ${({ active, completed }) => {
    if (completed) {
      return `
        background: ${PREMIUM_COLORS.BASE_COLORS.gold[500]};
        color: white;
      `;
    }
    if (active) {
      return `
        background: ${PREMIUM_COLORS.BASE_COLORS.navy[500]};
        color: white;
      `;
    }
    return `
      background: #e2e8f0;
      color: #718096;
      box-shadow: none;
    `;
  }}
`;

const StepLabel = styled.div`
  @media (max-width: 768px) {
    margin-left: 8px;
  }
`;

const StepTitle = styled.span<{ completed: boolean }>`
  display: block;
  font-weight: 700;
  font-size: 15px;
  transition: color 0.3s ease;
  color: ${props => (props.completed ? PREMIUM_COLORS.BASE_COLORS.gold[500] : PREMIUM_COLORS.BASE_COLORS.navy[500])};
  
  @media (max-width: 992px) {
    font-size: 14px;
  }
`;

const StepSubtitle = styled.span`
  display: block;
  font-size: 13px;
  color: ${PREMIUM_COLORS.SEMANTIC_COLORS.text.tertiary};
  
  @media (max-width: 992px) {
    display: none;
  }
`;

const StepConnector = styled.div<{ completed: boolean }>`
  height: 2px;
  background: ${props => (props.completed ? PREMIUM_COLORS.BASE_COLORS.gold[500] : '#e2e8f0')};
  flex-grow: 1;
  margin: 0 4px;
  transition: background-color 0.3s ease;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const StepContainer = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.05);
  min-height: 500px;
  overflow: hidden;
`; 