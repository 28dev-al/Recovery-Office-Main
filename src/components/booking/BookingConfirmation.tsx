import React from 'react';
import styled from 'styled-components';

const ConfirmationContainer = styled.div`
  background: white;
  border-radius: 16px;
  padding: 48px;
  max-width: 600px;
  margin: 0 auto;
  box-shadow: 0 20px 64px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const SuccessIcon = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #38a169 0%, #48bb78 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
  font-size: 36px;
  color: white;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 800;
  color: #1a365d;
  margin-bottom: 16px;
`;

const Subtitle = styled.p`
  font-size: 18px;
  color: #4a5568;
  margin-bottom: 32px;
  line-height: 1.6;
`;

const ReferenceBox = styled.div`
  background: #f0fff4;
  border: 2px solid #38a169;
  border-radius: 12px;
  padding: 24px;
  margin: 32px 0;
`;

const ReferenceLabel = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #38a169;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
`;

const ReferenceNumber = styled.div`
  font-size: 24px;
  font-weight: 800;
  color: #1a365d;
  font-family: 'Courier New', monospace;
`;

const EmailStatusSection = styled.div`
  background: #f8fafc;
  border-radius: 12px;
  padding: 24px;
  margin: 32px 0;
`;

const EmailStatusTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #1a365d;
  margin-bottom: 16px;
`;

const EmailStatusItem = styled.div<{ status: 'sent' | 'pending' | 'failed' }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  border-radius: 8px;
  margin: 8px 0;
  
  ${({ status }) => {
    switch (status) {
      case 'sent':
        return 'background: #c6f6d5; color: #2f855a;';
      case 'pending':
        return 'background: #fef5e7; color: #d69e2e;';
      case 'failed':
        return 'background: #fed7d7; color: #c53030;';
      default:
        return 'background: #e2e8f0; color: #4a5568;';
    }
  }}
`;

const StatusIcon = styled.span<{ status: 'sent' | 'pending' | 'failed' }>`
  font-size: 16px;
  margin-right: 8px;
  
  ${({ status }) => {
    switch (status) {
      case 'sent':
        return '✅';
      case 'pending':
        return '⏳';
      case 'failed':
        return '❌';
      default:
        return '❓';
    }
  }}
`;

const NextStepsSection = styled.div`
  background: #f7fafc;
  border-radius: 12px;
  padding: 24px;
  margin: 32px 0;
  text-align: left;
`;

const NextStepsTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #1a365d;
  margin-bottom: 16px;
  text-align: center;
`;

const StepsList = styled.ol`
  margin: 0;
  padding-left: 20px;
  
  li {
    font-size: 16px;
    color: #4a5568;
    line-height: 1.6;
    margin-bottom: 12px;
    
    strong {
      color: #1a365d;
    }
  }
`;

const ContactInfo = styled.div`
  background: #fff5f5;
  border: 1px solid #feb2b2;
  border-radius: 12px;
  padding: 20px;
  margin: 24px 0;
`;

const ContactTitle = styled.h4`
  font-size: 16px;
  font-weight: 700;
  color: #c53030;
  margin-bottom: 12px;
`;

const ContactDetails = styled.div`
  font-size: 14px;
  color: #4a5568;
  line-height: 1.6;
  
  a {
    color: #1a365d;
    text-decoration: none;
    font-weight: 600;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-top: 32px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 140px;

  ${({ variant }) => variant === 'primary' ? `
    background: linear-gradient(135deg, #d69e2e 0%, #f6ad3a 100%);
    color: white;
    border: none;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(214, 158, 46, 0.3);
    }
  ` : `
    background: white;
    color: #1a365d;
    border: 2px solid #1a365d;

    &:hover {
      background: #1a365d;
      color: white;
    }
  `}
`;

interface BookingConfirmationProps {
  bookingData: {
    reference: string;
    clientEmail: string;
    serviceName: string;
    confirmationEmailSent?: boolean;
    internalNotificationSent?: boolean;
  };
  onAddToCalendar?: () => void;
  onReturnHome?: () => void;
}

export const BookingConfirmation: React.FC<BookingConfirmationProps> = ({
  bookingData,
  onAddToCalendar,
  onReturnHome
}) => {
  const getEmailStatus = (sent?: boolean) => {
    if (sent === true) return 'sent';
    if (sent === false) return 'failed';
    return 'pending';
  };

  return (
    <ConfirmationContainer>
      <SuccessIcon>✓</SuccessIcon>
      
      <Title>Booking Confirmed!</Title>
      
      <Subtitle>
        Your consultation with Recovery Office has been successfully booked. 
        We will contact you within 24 hours to confirm the appointment details.
      </Subtitle>

      <ReferenceBox>
        <ReferenceLabel>Your Booking Reference</ReferenceLabel>
        <ReferenceNumber>{bookingData.reference}</ReferenceNumber>
      </ReferenceBox>

      <EmailStatusSection>
        <EmailStatusTitle>📧 Email Notifications</EmailStatusTitle>
        
        <EmailStatusItem status={getEmailStatus(bookingData.confirmationEmailSent)}>
          <div>
            <StatusIcon status={getEmailStatus(bookingData.confirmationEmailSent)} />
            Confirmation email to {bookingData.clientEmail}
          </div>
          <div style={{ fontSize: '12px', fontWeight: '600' }}>
            {getEmailStatus(bookingData.confirmationEmailSent).toUpperCase()}
          </div>
        </EmailStatusItem>
        
        <EmailStatusItem status={getEmailStatus(bookingData.internalNotificationSent)}>
          <div>
            <StatusIcon status={getEmailStatus(bookingData.internalNotificationSent)} />
            Internal notification to Recovery Office team
          </div>
          <div style={{ fontSize: '12px', fontWeight: '600' }}>
            {getEmailStatus(bookingData.internalNotificationSent).toUpperCase()}
          </div>
        </EmailStatusItem>
      </EmailStatusSection>

      <NextStepsSection>
        <NextStepsTitle>What Happens Next?</NextStepsTitle>
        <StepsList>
          <li>
            <strong>Confirmation Call:</strong> We will contact you within 24 hours to confirm your appointment details and answer any preliminary questions.
          </li>
          <li>
            <strong>Document Preparation:</strong> Please gather any relevant documentation related to your case, including transaction records, communications, and evidence.
          </li>
          <li>
            <strong>Consultation Meeting:</strong> Our specialist will conduct a comprehensive assessment of your situation and explain your recovery options.
          </li>
          <li>
            <strong>Action Plan:</strong> We will provide you with a detailed recovery strategy, timeline, and next steps if you choose to proceed.
          </li>
        </StepsList>
      </NextStepsSection>

      <ContactInfo>
        <ContactTitle>Need to Reschedule or Have Questions?</ContactTitle>
        <ContactDetails>
          Contact us immediately:<br/>
          📞 <a href="tel:+447451263472">+44 7451 263472</a><br/>
          📧 <a href="mailto:contact@recovery-office.com">contact@recovery-office.com</a><br/>
          📋 Reference: <strong>{bookingData.reference}</strong>
        </ContactDetails>
      </ContactInfo>

      <ActionButtons>
        {onAddToCalendar && (
          <Button variant="secondary" onClick={onAddToCalendar}>
            Add to Calendar
          </Button>
        )}
        <Button variant="primary" onClick={onReturnHome}>
          Return to Website
        </Button>
      </ActionButtons>

      <div style={{ 
        fontSize: '12px', 
        color: '#718096', 
        marginTop: '32px', 
        padding: '16px', 
        background: '#f7fafc', 
        borderRadius: '8px',
        fontStyle: 'italic'
      }}>
        <strong>Confidentiality Notice:</strong> This consultation is completely confidential and there is no obligation to proceed with our services. Recovery Office Limited is authorised and regulated by the Financial Conduct Authority (FCA Reference: 836358).
      </div>
    </ConfirmationContainer>
  );
}; 