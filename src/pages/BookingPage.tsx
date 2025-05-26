import * as React from 'react';
import styled from 'styled-components';
import { BookingProvider } from '../context/BookingContext';
import ServiceSelection from '../components/booking/ServiceSelection';
import DateTimeSelection from '../components/booking/DateTimeSelection';
import CustomerInfoForm from '../components/booking/CustomerInfoForm';
import BookingSummary from '../components/booking/BookingSummary';
import { BookingNavigation } from '../components/booking/BookingNavigation';
import { useBooking } from '../context/BookingContext';
import { getFibonacciByIndex } from '../utils/getFibonacciByIndex';
import { PHI } from '../constants/sacred-geometry';

// Styled components with sacred geometry principles
const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${getFibonacciByIndex(8)}px ${getFibonacciByIndex(7)}px;
  background-color: ${props => props.theme.colors.background[50]};
`;

const BookingContainer = styled.div`
  width: 100%;
  max-width: ${getFibonacciByIndex(13) * PHI}px;
  background-color: ${props => props.theme.colors.background[50]};
  border-radius: ${getFibonacciByIndex(6)}px;
  box-shadow: 0 ${getFibonacciByIndex(5)}px ${getFibonacciByIndex(8)}px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin: ${getFibonacciByIndex(8)}px 0;
`;

const Header = styled.header`
  padding: ${getFibonacciByIndex(8)}px;
  background-color: ${props => props.theme.colors.primary[500] ?? 1};
  color: ${props => props.theme.colors.white};
`;

const Title = styled.h1`
  font-size: ${getFibonacciByIndex(9)}px;
  margin-bottom: ${getFibonacciByIndex(5)}px;
  text-align: center;
`;

const Subtitle = styled.p`
  font-size: ${getFibonacciByIndex(6)}px;
  text-align: center;
  opacity: 0.9;
`;

const ContentContainer = styled.div`
  padding: ${getFibonacciByIndex(8)}px;
`;

const BookingPage: React.FC = () => {
  return (
    <BookingProvider>
      <PageContainer>
        <BookingContainer>
          <Header>
            <Title>Book Your Recovery Session</Title>
            <Subtitle>Select services, choose a time, and confirm your appointment</Subtitle>
          </Header>
          
          <ContentContainer>
            <BookingStepContent />
            <BookingNavigationWrapper />
          </ContentContainer>
        </BookingContainer>
      </PageContainer>
    </BookingProvider>
  );
};

// Component to render the appropriate content based on the current step
const BookingStepContent: React.FC = () => {
  const { currentStep, bookingComplete } = useBooking();
  
  // If booking is complete, only show the summary
  if (bookingComplete) {
    return <BookingSummary />;
  }
  
  // Otherwise show the appropriate step
  switch (currentStep) {
    case 0:
      return <ServiceSelection />;
    case 1:
      return <DateTimeSelection />;
    case 2:
      return <CustomerInfoForm />;
    case 3:
      return <BookingSummary />;
    default:
      return <ServiceSelection />;
  }
};

// Wrapper for BookingNavigation to provide the currentStepId
const BookingNavigationWrapper: React.FC = () => {
  const { currentStep } = useBooking();
  return <BookingNavigation currentStepId={currentStep} />;
};

export default BookingPage; 







