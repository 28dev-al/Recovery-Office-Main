import * as React from 'react';
import styled, { DefaultTheme } from 'styled-components';
import { format } from 'date-fns';
import { useBooking } from '../../context/BookingContext';
import { getFibonacciByIndex } from '../../utils/getFibonacciByIndex';
import { BookingTimeSlot, ServiceOption, ClientInformation } from '../../types/booking.types';



// Styled components following sacred geometry principles
const Container = styled.div`
  width: 100%;
  max-width: ${getFibonacciByIndex(13)}px;
  margin: 0 auto;
  padding: ${getFibonacciByIndex(8)}px;
  background-color: ${(props) => props.theme.colors.background.light};
  border-radius: ${getFibonacciByIndex(5)}px;
  box-shadow: 0 ${getFibonacciByIndex(4)}px ${getFibonacciByIndex(6)}px rgba(0, 0, 0, 0.1);
`;

const Section = styled.div`
  margin-bottom: ${getFibonacciByIndex(8)}px;
  padding-bottom: ${getFibonacciByIndex(7)}px;
  border-bottom: 1px solid ${(props) => props.theme.colors.border.light};
  
  &:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
  }
`;

const SectionTitle = styled.h3`
  font-size: ${getFibonacciByIndex(7)}px;
  margin: 0 0 ${getFibonacciByIndex(6)}px 0;
  color: ${(props) => props.theme.colors.text.primary};
  font-weight: 600;
`;

const ContentRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${getFibonacciByIndex(5)}px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const Label = styled.span`
  font-weight: 500;
  color: ${(props) => props.theme.colors.text.secondary};
  flex: 0 0 38.2%; /* Based on inverse PHI ratio (1 - 1/PHI) */
`;

const Value = styled.span`
  flex: 0 0 61.8%; /* Based on PHI ratio (1/PHI) */
  text-align: right;
  color: ${(props) => props.theme.colors.text.primary};
`;

const ServiceItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${getFibonacciByIndex(5)}px 0;
  border-bottom: 1px dashed ${(props) => props.theme.colors.border.light};
  
  &:last-child {
    border-bottom: none;
  }
`;

const ServiceName = styled.span`
  font-weight: 500;
`;

const ServicePrice = styled.span`
  font-weight: 600;
`;

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: ${getFibonacciByIndex(6)}px;
  margin-top: ${getFibonacciByIndex(6)}px;
  border-top: 2px solid ${(props) => props.theme.colors.primary[500]};
  font-size: ${getFibonacciByIndex(6)}px;
  font-weight: 700;
`;

const ConfirmationMessage = styled.div`
  text-align: center;
  margin: ${getFibonacciByIndex(8)}px 0;
  padding: ${getFibonacciByIndex(7)}px;
  background-color: ${(props) => props.theme.colors.primary[100]};
  color: ${(props) => props.theme.colors.primary[700]};
  border-radius: ${getFibonacciByIndex(5)}px;
  font-size: ${getFibonacciByIndex(6)}px;
  font-weight: 600;
`;

const TextBlock = styled.div`
  margin-bottom: ${getFibonacciByIndex(5)}px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const CaseDescription = styled.p`
  background-color: ${(props) => props.theme.colors.background[100]};
  padding: ${getFibonacciByIndex(5)}px;
  border-radius: ${getFibonacciByIndex(3)}px;
  margin-top: ${getFibonacciByIndex(3)}px;
  margin-bottom: ${getFibonacciByIndex(5)}px;
  line-height: 1.5;
`;

// Helper function to format fraud type for display
const formatFraudType = (fraudType: string): string => {
  if (!fraudType) return 'Not specified';
  
  return fraudType
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const BookingSummary: React.FC = () => {
  const {
    state: {
      selectedService,
      selectedDate,
      selectedTimeSlot,
      clientInfo,
      bookingComplete,
      bookingReference
    }
  } = useBooking();
  
  // Calculate total price of all selected services
  const totalPrice = selectedService ? (selectedService.price || 0) : 0;
  
  // Format date for display
  const formattedDate = selectedDate 
    ? format(selectedDate, 'EEEE, MMMM do, yyyy')
    : 'Not selected';
    
  // For time, use selectedTimeSlot?.startTime
  const formattedTime = selectedTimeSlot ? new Date(selectedTimeSlot.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Not selected';
  
  // For services, use selectedService as an array if needed
  const selectedServices = selectedService ? [selectedService] : [];
  
  // Format incident date if available
  const formattedIncidentDate = clientInfo?.incidentDate 
    ? format(new Date(clientInfo.incidentDate), 'MMMM do, yyyy')
    : 'Not provided';
  
  if (bookingComplete && bookingReference) {
    return (
      <Container>
        <ConfirmationMessage>
          Your booking has been confirmed! <br />
          Reference number: {bookingReference}
        </ConfirmationMessage>
        
        <Section>
          <SectionTitle>Services Booked</SectionTitle>
          {selectedServices.map(service => (
            <ServiceItem key={service.id}>
              <ServiceName>{service.name}</ServiceName>
              <ServicePrice>${service.price?.toFixed(2) || 'N/A'}</ServicePrice>
            </ServiceItem>
          ))}
          <TotalRow>
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </TotalRow>
        </Section>
        
        <Section>
          <SectionTitle>Appointment Details</SectionTitle>
          <ContentRow>
            <Label>Date:</Label>
            <Value>{formattedDate}</Value>
          </ContentRow>
          <ContentRow>
            <Label>Time:</Label>
            <Value>{formattedTime}</Value>
          </ContentRow>
        </Section>
        
        {clientInfo && (
          <>
            <Section>
              <SectionTitle>Your Information</SectionTitle>
              <ContentRow>
                <Label>Name:</Label>
                <Value>{`${clientInfo.firstName} ${clientInfo.lastName}`}</Value>
              </ContentRow>
              <ContentRow>
                <Label>Email:</Label>
                <Value>{clientInfo.email}</Value>
              </ContentRow>
              <ContentRow>
                <Label>Phone:</Label>
                <Value>{clientInfo.phone}</Value>
              </ContentRow>
              <ContentRow>
                <Label>Preferred Contact:</Label>
                <Value>{clientInfo.preferredContactMethod}</Value>
              </ContentRow>
            </Section>
            
            {clientInfo.fraudType && (
              <Section>
                <SectionTitle>Financial Recovery Case Details</SectionTitle>
                <ContentRow>
                  <Label>Case Type:</Label>
                  <Value>{formatFraudType(clientInfo.fraudType)}</Value>
                </ContentRow>
                {clientInfo.approximateLossAmount && (
                  <ContentRow>
                    <Label>Loss Amount:</Label>
                    <Value>£{clientInfo.approximateLossAmount}</Value>
                  </ContentRow>
                )}
                {clientInfo.incidentDate && (
                  <ContentRow>
                    <Label>Incident Date:</Label>
                    <Value>{formattedIncidentDate}</Value>
                  </ContentRow>
                )}
                {clientInfo.financialInstitution && (
                  <ContentRow>
                    <Label>Financial Institution:</Label>
                    <Value>{clientInfo.financialInstitution}</Value>
                  </ContentRow>
                )}
                <ContentRow>
                  <Label>Reported to Authorities:</Label>
                  <Value>{clientInfo.hasReportedToAuthorities ? 'Yes' : 'No'}</Value>
                </ContentRow>
                {clientInfo.caseDescription && (
                  <TextBlock>
                    <Label>Case Description:</Label>
                    <CaseDescription>{clientInfo.caseDescription}</CaseDescription>
                  </TextBlock>
                )}
              </Section>
            )}
          </>
        )}
      </Container>
    );
  }
  
  return (
    <Container>
      <Section>
        <SectionTitle>Selected Services</SectionTitle>
        {selectedServices.length === 0 ? (
          <ContentRow>
            <span>No services selected</span>
          </ContentRow>
        ) : (
          <>
            {selectedServices.map(service => (
              <ServiceItem key={service.id}>
                <ServiceName>{service.name}</ServiceName>
                <ServicePrice>${service.price?.toFixed(2) || 'N/A'}</ServicePrice>
              </ServiceItem>
            ))}
            <TotalRow>
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </TotalRow>
          </>
        )}
      </Section>
      
      <Section>
        <SectionTitle>Appointment Details</SectionTitle>
        <ContentRow>
          <Label>Date:</Label>
          <Value>{formattedDate}</Value>
        </ContentRow>
        <ContentRow>
          <Label>Time:</Label>
          <Value>{formattedTime}</Value>
        </ContentRow>
      </Section>
      
      {clientInfo && (
        <>
          <Section>
            <SectionTitle>Your Information</SectionTitle>
            <ContentRow>
              <Label>Name:</Label>
              <Value>{`${clientInfo.firstName} ${clientInfo.lastName}`}</Value>
            </ContentRow>
            <ContentRow>
              <Label>Email:</Label>
              <Value>{clientInfo.email}</Value>
            </ContentRow>
            <ContentRow>
              <Label>Phone:</Label>
              <Value>{clientInfo.phone}</Value>
            </ContentRow>
            <ContentRow>
              <Label>Preferred Contact:</Label>
              <Value>{clientInfo.preferredContactMethod}</Value>
            </ContentRow>
          </Section>
          
          {clientInfo.fraudType && (
            <Section>
              <SectionTitle>Financial Recovery Case Details</SectionTitle>
              <ContentRow>
                <Label>Case Type:</Label>
                <Value>{formatFraudType(clientInfo.fraudType)}</Value>
              </ContentRow>
              {clientInfo.approximateLossAmount && (
                <ContentRow>
                  <Label>Loss Amount:</Label>
                  <Value>£{clientInfo.approximateLossAmount}</Value>
                </ContentRow>
              )}
              {clientInfo.incidentDate && (
                <ContentRow>
                  <Label>Incident Date:</Label>
                  <Value>{formattedIncidentDate}</Value>
                </ContentRow>
              )}
              {clientInfo.financialInstitution && (
                <ContentRow>
                  <Label>Financial Institution:</Label>
                  <Value>{clientInfo.financialInstitution}</Value>
                </ContentRow>
              )}
              <ContentRow>
                <Label>Reported to Authorities:</Label>
                <Value>{clientInfo.hasReportedToAuthorities ? 'Yes' : 'No'}</Value>
              </ContentRow>
              {clientInfo.caseDescription && (
                <TextBlock>
                  <Label>Case Description:</Label>
                  <CaseDescription>{clientInfo.caseDescription}</CaseDescription>
                </TextBlock>
              )}
            </Section>
          )}
        </>
      )}
    </Container>
  );
};

export default BookingSummary; 














