import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { bookingApi } from '../../../config/api';
import { ClientInformation } from '../../../types/booking';
import { COMPANY_PROFILE_CA } from '../../../constants/companyProfile.ca';

interface BookingConfirmationStepProps {
  bookingData: {
    selectedService: {
      id: string;
      name: string;
      duration: number;
      price: number;
    };
    selectedDate: string;
    selectedTimeSlot: {
      startTime: string;
    };
    clientInfo: ClientInformation;
  };
  onComplete?: (data: { bookingReference: string }) => void;
  onBack?: () => void;
}

export const BookingConfirmationStep: React.FC<BookingConfirmationStepProps> = ({
  bookingData,
  onComplete
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingReference, setBookingReference] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!bookingReference) {
      submitBooking();
    }
  }, []);

  const submitBooking = async () => {
    try {
      setIsSubmitting(true);
      setError(null);

      // Create booking payload
      const bookingPayload = {
        service: {
          id: bookingData.selectedService.id,
          name: bookingData.selectedService.name,
          duration: bookingData.selectedService.duration,
          price: bookingData.selectedService.price
        },
        scheduledDate: bookingData.selectedDate,
        timeSlot: bookingData.selectedTimeSlot.startTime,
        client: bookingData.clientInfo,
        status: 'pending',
        createdAt: new Date().toISOString()
      };

      // Submit to API
      const response = await bookingApi.createBooking(bookingPayload) as { bookingReference?: string };
      const reference = response.bookingReference || `RO-${Date.now()}`;
      
      setBookingReference(reference);
      
      // Notify parent component
      if (onComplete) {
        onComplete({ bookingReference: reference });
      }
    } catch (err) {
      setError('There was an error submitting your booking. Please try again or contact support.');
      if (process.env.NODE_ENV === 'development') {
        console.error('Booking submission error:', err);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitting) {
    return (
      <Container>
        <LoadingState>
          <LoadingIcon>⏳</LoadingIcon>
          <LoadingTitle>Processing Your Booking...</LoadingTitle>
          <LoadingMessage>
            Please wait while we confirm your consultation appointment.
          </LoadingMessage>
        </LoadingState>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <ErrorState>
          <ErrorIcon>⚠️</ErrorIcon>
          <ErrorTitle>Booking Failed</ErrorTitle>
          <ErrorMessage>{error}</ErrorMessage>
          <ActionButtons>
            <Button onClick={submitBooking}>Try Again</Button>
            <Button variant="secondary" onClick={() => window.location.href = 'mailto:info@recovery-office.com'}>
              Contact Support
            </Button>
          </ActionButtons>
        </ErrorState>
      </Container>
    );
  }

  if (bookingReference) {
    return (
      <Container>
        <SuccessState>
          <SuccessIcon>✅</SuccessIcon>
          <SuccessTitle>Consultation Booked Successfully!</SuccessTitle>
          <SuccessMessage>
            Thank you for booking with Recovery Office. We've received your consultation request and will contact you shortly.
          </SuccessMessage>

          <BookingDetails>
            <DetailTitle>Booking Details</DetailTitle>
            <DetailRow>
              <DetailLabel>Service:</DetailLabel>
              <DetailValue>{bookingData.selectedService.name}</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>Date & Time:</DetailLabel>
              <DetailValue>
                {new Date(bookingData.selectedDate).toLocaleDateString()} at{' '}
                {new Date(bookingData.selectedTimeSlot.startTime).toLocaleTimeString()}
              </DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>Booking Reference:</DetailLabel>
              <DetailValue>{bookingReference}</DetailValue>
            </DetailRow>
          </BookingDetails>

          <ContactInfo>
            <ContactTitle>Need to Contact Us?</ContactTitle>
            <ContactItem>
              📅 Priority Support: <strong>Book Another Consultation</strong>
            </ContactItem>
            <ContactItem>
              📧 Email: <strong>{COMPANY_PROFILE_CA.email}</strong>
            </ContactItem>
          </ContactInfo>

          <NextSteps>
            <StepsTitle>What Happens Next?</StepsTitle>
            <Step>
              <StepNumber>1</StepNumber>
              <StepText>We'll review your case details before the consultation</StepText>
            </Step>
            <Step>
              <StepNumber>2</StepNumber>
              <StepText>You'll receive a confirmation email with consultation details</StepText>
            </Step>
            <Step>
              <StepNumber>3</StepNumber>
              <StepText>Our expert will conduct your consultation at the scheduled time</StepText>
            </Step>
          </NextSteps>

          <ActionButton href="/">
            Return to Homepage
          </ActionButton>
        </SuccessState>
      </Container>
    );
  }

  return null;
};

// Styled Components
const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const LoadingState = styled.div`
  text-align: center;
  padding: 60px 20px;
`;

const LoadingIcon = styled.div`
  font-size: 48px;
  margin-bottom: 24px;
  animation: pulse 2s infinite;

  @keyframes pulse {
    0% { opacity: 1; }
    50% { opacity: 0.5; }
    100% { opacity: 1; }
  }
`;

const LoadingTitle = styled.h2`
  font-size: 28px;
  color: #1a365d;
  margin-bottom: 12px;
`;

const LoadingMessage = styled.p`
  font-size: 18px;
  color: #6b7280;
`;

const ErrorState = styled.div`
  text-align: center;
  padding: 60px 20px;
`;

const ErrorIcon = styled.div`
  font-size: 48px;
  margin-bottom: 24px;
`;

const ErrorTitle = styled.h2`
  font-size: 28px;
  color: #e53e3e;
  margin-bottom: 12px;
`;

const ErrorMessage = styled.p`
  font-size: 18px;
  color: #6b7280;
  margin-bottom: 32px;
`;

const SuccessState = styled.div`
  text-align: center;
`;

const SuccessIcon = styled.div`
  font-size: 64px;
  margin-bottom: 24px;
`;

const SuccessTitle = styled.h2`
  font-size: 32px;
  color: #1a365d;
  margin-bottom: 16px;
`;

const SuccessMessage = styled.p`
  font-size: 18px;
  color: #6b7280;
  margin-bottom: 40px;
  line-height: 1.6;
`;

const BookingDetails = styled.div`
  background: #f9fafb;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 32px;
  text-align: left;
`;

const DetailTitle = styled.h3`
  font-size: 20px;
  color: #1a365d;
  margin-bottom: 16px;
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #e5e7eb;

  &:last-child {
    border-bottom: none;
  }
`;

const DetailLabel = styled.span`
  font-weight: 600;
  color: #4b5563;
`;

const DetailValue = styled.span`
  color: #1f2937;
`;

const ContactInfo = styled.div`
  background: #fef3c7;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 32px;
  text-align: left;
`;

const ContactTitle = styled.h3`
  font-size: 18px;
  color: #92400e;
  margin-bottom: 12px;
`;

const ContactItem = styled.p`
  color: #78350f;
  margin-bottom: 8px;

  strong {
    color: #92400e;
  }
`;

const NextSteps = styled.div`
  margin-bottom: 40px;
  text-align: left;
`;

const StepsTitle = styled.h3`
  font-size: 20px;
  color: #1a365d;
  margin-bottom: 20px;
`;

const Step = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 16px;
`;

const StepNumber = styled.div`
  width: 32px;
  height: 32px;
  background: #d69e2e;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  flex-shrink: 0;
`;

const StepText = styled.p`
  color: #4b5563;
  line-height: 1.5;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
`;

const Button = styled.button<{ variant?: string }>`
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  ${({ variant }) => variant === 'secondary' ? `
    background: white;
    color: #1a365d;
    border: 2px solid #e5e7eb;
    
    &:hover {
      background: #f9fafb;
    }
  ` : `
    background: #d69e2e;
    color: white;
    border: none;
    
    &:hover {
      background: #b8851f;
    }
  `}
`;

const ActionButton = styled.a`
  display: inline-block;
  background: #d69e2e;
  color: white;
  padding: 16px 32px;
  border-radius: 8px;
  text-decoration: none;
  font-size: 16px;
  font-weight: 600;
  transition: all 0.2s ease;

  &:hover {
    background: #b8851f;
    transform: translateY(-1px);
  }
`;

export default BookingConfirmationStep; 