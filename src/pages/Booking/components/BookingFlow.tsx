import React, { useState } from 'react';
import styled from 'styled-components';
import ServiceSelectionStep from '../../../components/booking/steps/ServiceSelectionStep';
import DateSelectionStep from '../../../components/booking/steps/DateSelectionStep';
import ClientInfoStep from '../../../components/booking/steps/ClientInfoStep';
import { BookingConfirmationStep } from '../../../components/booking/steps/BookingConfirmationStep';
import { ServiceOption, BookingTimeSlot } from '../../../types/booking.types';
import { ClientInformation } from '../../../types/booking';

interface BookingData {
  selectedService?: ServiceOption;
  selectedDate?: string;
  selectedTimeSlot?: BookingTimeSlot;
  clientInfo?: ClientInformation;
  bookingReference?: string;
}

export const BookingFlow: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState<BookingData>({});



  const handleStepBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <ServiceSelectionStep
            onServiceSelect={(service) => {
              setBookingData(prev => ({ ...prev, selectedService: service }));
            }}
            onNext={() => {
              setCurrentStep(2);
            }}
            onBack={currentStep > 1 ? () => setCurrentStep(1) : undefined}
          />
        );
      
      case 2:
        return (
          <DateSelectionStep
            onComplete={(data) => {
              if (data?.selectedDate && data?.selectedTimeSlot) {
                setBookingData(prev => ({ 
                  ...prev, 
                  selectedDate: data.selectedDate,
                  selectedTimeSlot: data.selectedTimeSlot as unknown as BookingTimeSlot
                }));
                setCurrentStep(3);
              }
            }}
            onBack={handleStepBack}
            initialData={bookingData}
            selectedService={bookingData.selectedService!}
          />
        );
      
      case 3:
        return (
          <ClientInfoStep
            onComplete={(clientInfo) => {
              if (clientInfo) {
                setBookingData(prev => ({ ...prev, clientInfo }));
                setCurrentStep(4);
              }
            }}
            onBack={handleStepBack}
            initialData={{ clientInfo: bookingData.clientInfo }}
          />
        );
      
      case 4:
        return (
          <BookingConfirmationStep
            onComplete={(data) => {
              if (data?.bookingReference) {
                setBookingData(prev => ({ ...prev, bookingReference: data.bookingReference }));
              }
            }}
            bookingData={{
              selectedService: bookingData.selectedService!,
              selectedDate: bookingData.selectedDate!,
              selectedTimeSlot: bookingData.selectedTimeSlot!,
              clientInfo: bookingData.clientInfo!
            }}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <FlowContainer>
      <StepContainer>
        {renderCurrentStep()}
      </StepContainer>
    </FlowContainer>
  );
};

// Styled Components
const FlowContainer = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  overflow: hidden;
`;

const StepContainer = styled.div`
  padding: 40px;
  
  @media (max-width: 768px) {
    padding: 24px;
  }
`; 