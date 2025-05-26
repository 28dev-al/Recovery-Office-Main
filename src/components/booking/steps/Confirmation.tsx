import * as React from 'react';
import styled from 'styled-components';
import { DefaultTheme } from 'styled-components';
import { PHI, PHI_INVERSE, SACRED_SPACING, FIBONACCI, SACRED_RADIUS } from '../../../constants/sacred-geometry';
import { FlowerOfLife } from '../../../design-system/botanical';
import { getFibonacciByIndex } from '../../../utils/getFibonacciByIndex';
import { Button as DesignButton } from '../../../design-system/components/button/Button';

/**
 * Booking summary data
 * 
 * @interface BookingSummary
 * @property {string} serviceName - Name of the selected service
 * @property {string} serviceDescription - Description of the selected service
 * @property {string} dateTime - Formatted date and time of the booking
 * @property {string} firstName - Client's first name
 * @property {string} lastName - Client's last name
 * @property {string} email - Client's email address
 * @property {string} phone - Client's phone number
 * @property {string} [message] - Optional additional message
 */
interface BookingSummary {
  serviceName: string;
  serviceDescription: string;
  dateTime: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message?: string;
}

/**
 * Props for the Confirmation component
 * 
 * @interface ConfirmationProps
 * @property {BookingSummary} bookingSummary - Summary of the booking details
 */
interface ConfirmationProps {
  bookingSummary: BookingSummary;
}

/**
 * Container for the confirmation component
 * Uses sacred spacing for margins
 */
const Container = styled.div`
  width: 100%;
  padding: ${SACRED_SPACING.md}px 0;
  position: relative;
`;

/**
 * Title for the confirmation section
 * Uses golden ratio for line height
 */
const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: ${SACRED_SPACING.lg}px;
  line-height: ${PHI};
  color: ${(props: { theme: DefaultTheme }) => props.theme.colors.text.dark};
  text-align: center;
`;

/**
 * Description for the confirmation section
 * Uses PHI for line height and margins
 */
const SectionDescription = styled.p`
  margin-bottom: ${SACRED_SPACING.xl}px;
  line-height: ${PHI};
  color: ${(props: { theme: DefaultTheme }) => props.theme.colors.text.main};
  text-align: center;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

/**
 * Background botanical element
 * Uses sacred positioning
 */
const BackgroundBotanical = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0.05;
  z-index: -1;
  pointer-events: none;
`;

/**
 * Card containing the summary information
 * Uses golden rectangle proportions
 */
const SummaryCard = styled.div`
  background-color: ${(props: { theme: DefaultTheme }) => props.theme.colors.background.light};
  border-radius: ${SACRED_RADIUS.md}px;
  padding: ${SACRED_SPACING.lg}px;
  border: 1px solid ${(props: { theme: DefaultTheme }) => props.theme.colors.border.light};
  max-width: 600px;
  margin: 0 auto ${SACRED_SPACING.xl}px;
  box-shadow: 0 ${getFibonacciByIndex(5)}px ${getFibonacciByIndex(7)}px rgba(0, 0, 0, 0.05);
`;

/**
 * Section within the summary card
 * Uses Fibonacci spacing
 */
const SummarySection = styled.div`
  margin-bottom: ${SACRED_SPACING.lg}px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

/**
 * Section title
 * Uses PHI for typography and spacing
 */
const SummarySectionTitle = styled.h3`
  font-size: 1.125rem;
  margin-bottom: ${SACRED_SPACING.xs}px;
  color: ${(props: { theme: DefaultTheme }) => props.theme.colors.text.dark};
  line-height: ${PHI};
  border-bottom: 1px solid ${(props: { theme: DefaultTheme }) => props.theme.colors.border.light};
  padding-bottom: ${SACRED_SPACING.xs}px;
`;

/**
 * Data row in the summary
 * Uses Fibonacci for spacing
 */
const SummaryRow = styled.div`
  display: flex;
  margin-bottom: ${SACRED_SPACING.xs}px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

/**
 * Label in a summary row
 * Uses golden ratio for width proportion
 */
const SummaryLabel = styled.div`
  width: ${100 * PHI_INVERSE}%;
  font-weight: 500;
  color: ${(props: { theme: DefaultTheme }) => props.theme.colors.text.main};
  padding-right: ${SACRED_SPACING.sm}px;
`;

/**
 * Value in a summary row
 * Complement to the label width
 */
const SummaryValue = styled.div`
  width: ${100 * (1 - PHI_INVERSE)}%;
  color: ${(props: { theme: DefaultTheme }) => props.theme.colors.text.dark};
`;

/**
 * Info box with additional instructions
 * Uses Fibonacci and sacred spacing
 */
const InfoBox = styled.div`
  background-color: ${(props: { theme: DefaultTheme }) => `${props.theme.colors.background.light}33`}; // 20% opacity
  border-radius: ${SACRED_RADIUS.sm}px;
  padding: ${SACRED_SPACING.md}px;
  margin-bottom: ${SACRED_SPACING.lg}px;
  border-left: ${getFibonacciByIndex(4)}px solid ${(props: { theme: DefaultTheme }) => props.theme.colors.accent.main};
`;

/**
 * Info box title
 * Uses golden ratio for typography
 */
const InfoBoxTitle = styled.h4`
  font-size: 1rem;
  margin-bottom: ${SACRED_SPACING.xs}px;
  color: ${(props: { theme: DefaultTheme }) => props.theme.colors.accent.dark};
  line-height: ${PHI};
`;

/**
 * Info box text
 * Uses PHI for line height
 */
const InfoBoxText = styled.p`
  font-size: 0.875rem;
  line-height: ${PHI};
  color: ${(props: { theme: DefaultTheme }) => props.theme.colors.text.main};
`;

/**
 * Styled button with light variant support
 */
const Button = styled(DesignButton)`
  /* Add any custom styles for the light variant */
  ${(props) => props.variant === 'light' && `
    background-color: rgba(255, 255, 255, 0.8);
    color: ${props.theme.colors.text.primary};
    border: 1px solid ${props.theme.colors.border.light};
    
    &:hover {
      background-color: rgba(255, 255, 255, 0.9);
    }
  `}
`;

/**
 * Confirmation component
 * Shows booking summary and confirmation details
 * Implements sacred geometry principles throughout
 */
const Confirmation: React.FC<ConfirmationProps> = ({
  bookingSummary
}) => {
  return (
    <Container>
      <BackgroundBotanical>
        <FlowerOfLife size={600} color="currentColor" />
      </BackgroundBotanical>
      
      <SectionTitle>Review Your Booking</SectionTitle>
      <SectionDescription>
        Please review your booking details below. When you're ready, click the Submit button to confirm your consultation.
      </SectionDescription>
      
      <SummaryCard>
        <SummarySection>
          <SummarySectionTitle>Service Details</SummarySectionTitle>
          <SummaryRow>
            <SummaryLabel>Service:</SummaryLabel>
            <SummaryValue>{bookingSummary.serviceName}</SummaryValue>
          </SummaryRow>
          <SummaryRow>
            <SummaryLabel>Description:</SummaryLabel>
            <SummaryValue>{bookingSummary.serviceDescription}</SummaryValue>
          </SummaryRow>
          <SummaryRow>
            <SummaryLabel>Date & Time:</SummaryLabel>
            <SummaryValue>{bookingSummary.dateTime}</SummaryValue>
          </SummaryRow>
        </SummarySection>
        
        <SummarySection>
          <SummarySectionTitle>Personal Information</SummarySectionTitle>
          <SummaryRow>
            <SummaryLabel>Name:</SummaryLabel>
            <SummaryValue>{`${bookingSummary.firstName} ${bookingSummary.lastName}`}</SummaryValue>
          </SummaryRow>
          <SummaryRow>
            <SummaryLabel>Email:</SummaryLabel>
            <SummaryValue>{bookingSummary.email}</SummaryValue>
          </SummaryRow>
          <SummaryRow>
            <SummaryLabel>Phone:</SummaryLabel>
            <SummaryValue>{bookingSummary.phone}</SummaryValue>
          </SummaryRow>
          
          {bookingSummary.message && (
            <SummaryRow>
              <SummaryLabel>Additional Info:</SummaryLabel>
              <SummaryValue>{bookingSummary.message}</SummaryValue>
            </SummaryRow>
          )}
        </SummarySection>
      </SummaryCard>
      
      <InfoBox>
        <InfoBoxTitle>What Happens Next?</InfoBoxTitle>
        <InfoBoxText>
          After submitting your booking, you'll receive a confirmation email with all the details.
          One of our financial recovery experts will also contact you 24 hours before your
          consultation to confirm your appointment and answer any preliminary questions.
        </InfoBoxText>
      </InfoBox>
    </Container>
  );
};

export default Confirmation; 












