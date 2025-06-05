import React from 'react';
import styled from 'styled-components';

const PREMIUM_SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64
};

const PREMIUM_COLORS = {
  primary: '#1a365d',
  secondary: '#d69e2e',
  background: '#f7fafc',
  border: '#e2e8f0',
  highlight: '#edf2f7',
  text: '#2d3748'
};

const ContactContainer = styled.section`
  background: linear-gradient(135deg, ${PREMIUM_COLORS.primary} 0%, #2c5282 100%);
  color: white;
  padding: ${PREMIUM_SPACING.xxl}px;
  border-radius: 12px;
  margin: ${PREMIUM_SPACING.xxxl}px 0;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);

  h3 {
    color: white;
    font-size: 1.75rem;
    margin-bottom: ${PREMIUM_SPACING.xl}px;
    text-align: center;
    margin-top: 0;
  }

  @media (max-width: 768px) {
    padding: ${PREMIUM_SPACING.xl}px ${PREMIUM_SPACING.lg}px;
    
    h3 {
      font-size: 1.5rem;
    }
  }
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${PREMIUM_SPACING.xl}px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: ${PREMIUM_SPACING.lg}px;
  }
`;

const ContactCard = styled.div<{ priority?: 'primary' }>`
  background: ${props => props.priority === 'primary' ? 
    'rgba(214, 158, 46, 0.2)' : 
    'rgba(255, 255, 255, 0.1)'};
  border-radius: 12px;
  padding: ${PREMIUM_SPACING.xl}px;
  backdrop-filter: blur(10px);
  border: 2px solid ${props => props.priority === 'primary' ? 
    PREMIUM_COLORS.secondary : 
    'rgba(255, 255, 255, 0.2)'};
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
  }

  h4 {
    color: ${props => props.priority === 'primary' ? 
      PREMIUM_COLORS.secondary : 
      'white'};
    font-size: 1.25rem;
    margin-bottom: ${PREMIUM_SPACING.lg}px;
    margin-top: 0;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${PREMIUM_SPACING.md}px;
  }
`;

const ContactDetails = styled.div`
  space-y: ${PREMIUM_SPACING.md}px;
`;

const Detail = styled.div`
  margin-bottom: ${PREMIUM_SPACING.md}px;
  padding: ${PREMIUM_SPACING.md}px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  border-left: 4px solid ${PREMIUM_COLORS.secondary};

  strong {
    color: ${PREMIUM_COLORS.secondary};
    display: block;
    margin-bottom: ${PREMIUM_SPACING.xs}px;
  }

  span, p {
    color: #e2e8f0;
    margin: 0;
    font-size: 0.95rem;
  }

  a {
    color: ${PREMIUM_COLORS.secondary};
    text-decoration: none;
    font-weight: 600;

    &:hover {
      text-decoration: underline;
    }
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const ContactButton = styled.button`
  background: ${PREMIUM_COLORS.secondary};
  color: ${PREMIUM_COLORS.primary};
  border: none;
  padding: ${PREMIUM_SPACING.md}px ${PREMIUM_SPACING.lg}px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  margin-top: ${PREMIUM_SPACING.lg}px;
  font-size: 1rem;

  &:hover {
    background: #b7791f;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(214, 158, 46, 0.3);
  }
`;

const ProcessTimeline = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: ${PREMIUM_SPACING.xl}px;
  margin-top: ${PREMIUM_SPACING.xl}px;
  border: 1px solid rgba(255, 255, 255, 0.2);

  h4 {
    color: ${PREMIUM_COLORS.secondary};
    margin-top: 0;
    margin-bottom: ${PREMIUM_SPACING.lg}px;
    text-align: center;
    font-size: 1.25rem;
  }
`;

const TimelineStep = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${PREMIUM_SPACING.lg}px;
  padding: ${PREMIUM_SPACING.md}px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const StepNumber = styled.div`
  background: ${PREMIUM_COLORS.secondary};
  color: ${PREMIUM_COLORS.primary};
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  margin-right: ${PREMIUM_SPACING.md}px;
  flex-shrink: 0;
`;

const StepContent = styled.div`
  strong {
    color: ${PREMIUM_COLORS.secondary};
    display: block;
    margin-bottom: ${PREMIUM_SPACING.xs}px;
  }

  span {
    color: #e2e8f0;
    font-size: 0.9rem;
  }
`;

const EmergencyContact = styled.div`
  background: #7c2d12;
  border: 2px solid #dc2626;
  border-radius: 12px;
  padding: ${PREMIUM_SPACING.xl}px;
  margin-top: ${PREMIUM_SPACING.xl}px;
  text-align: center;

  h4 {
    color: #fecaca;
    margin-top: 0;
    margin-bottom: ${PREMIUM_SPACING.lg}px;
    font-size: 1.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${PREMIUM_SPACING.md}px;
  }

  p {
    color: #fecaca;
    margin-bottom: ${PREMIUM_SPACING.md}px;
    font-weight: 500;
  }

  a {
    color: #fef2f2;
    text-decoration: none;
    font-weight: 700;
    font-size: 1.1rem;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const ContactSection: React.FC = () => {
  const handleEmailContact = (email: string, subject: string) => {
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}`;
    window.open(mailtoLink, '_blank');
  };

  return (
    <ContactContainer id="contact-dpo">
      <h3>Data Protection & Privacy Contacts</h3>
      
      <ContactGrid>
        <ContactCard priority="primary">
          <h4>
            🛡️ Data Protection Officer
          </h4>
          <ContactDetails>
            <Detail>
              <strong>Name:</strong>
              <span>Sarah Mitchell, CIPP/E, CIPM</span>
              <p>Chartered Privacy Professional & Certified Information Privacy Manager</p>
            </Detail>
            <Detail>
              <strong>Email:</strong>
              <span>
                <a href="mailto:dpo@recovery-office.com">dpo@recovery-office.com</a>
              </span>
            </Detail>
            <Detail>
              <strong>Phone:</strong>
              <span>+44 (0) 20 7946 0001</span>
            </Detail>
            <Detail>
              <strong>Response Time:</strong>
              <span>Within 48 hours for all requests</span>
            </Detail>
            <Detail>
              <strong>Languages:</strong>
              <span>English, French, German</span>
            </Detail>
          </ContactDetails>
          <ContactButton 
            onClick={() => handleEmailContact('dpo@recovery-office.com', 'Data Protection Inquiry')}
          >
            Contact DPO Directly
          </ContactButton>
        </ContactCard>
        
        <ContactCard>
          <h4>
            📧 General Privacy Inquiries
          </h4>
          <ContactDetails>
            <Detail>
              <strong>Email:</strong>
              <span>
                <a href="mailto:privacy@recovery-office.com">privacy@recovery-office.com</a>
              </span>
            </Detail>
            <Detail>
              <strong>Subject Line Format:</strong>
              <span>"Privacy Inquiry - [Your Name] - [Topic]"</span>
            </Detail>
            <Detail>
              <strong>Response Time:</strong>
              <span>Within 5 business days</span>
            </Detail>
            <Detail>
              <strong>Best For:</strong>
              <p>General questions about data processing, cookie policies, and privacy practices</p>
            </Detail>
          </ContactDetails>
          <ContactButton 
            onClick={() => handleEmailContact('privacy@recovery-office.com', 'Privacy Inquiry - [Your Name] - [Topic]')}
          >
            Send Privacy Inquiry
          </ContactButton>
        </ContactCard>
        
        <ContactCard>
          <h4>
            ⚖️ Complaints & Escalation
          </h4>
          <ContactDetails>
            <Detail>
              <strong>Internal Complaints:</strong>
              <span>
                <a href="mailto:complaints@recovery-office.com">complaints@recovery-office.com</a>
              </span>
            </Detail>
            <Detail>
              <strong>ICO (UK Regulator):</strong>
              <span>
                <a href="mailto:casework@ico.org.uk">casework@ico.org.uk</a>
              </span>
            </Detail>
            <Detail>
              <strong>ICO Phone:</strong>
              <span>0303 123 1113</span>
            </Detail>
            <Detail>
              <strong>ICO Website:</strong>
              <span>
                <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer">ico.org.uk</a>
              </span>
            </Detail>
          </ContactDetails>
          <ContactButton 
            onClick={() => handleEmailContact('complaints@recovery-office.com', 'Data Protection Complaint - [Your Name]')}
          >
            File Complaint
          </ContactButton>
        </ContactCard>
      </ContactGrid>

      <ProcessTimeline>
        <h4>Data Protection Request Process</h4>
        <TimelineStep>
          <StepNumber>1</StepNumber>
          <StepContent>
            <strong>Request Submission (Day 0)</strong>
            <span>Submit your request via email with identity verification</span>
          </StepContent>
        </TimelineStep>
        <TimelineStep>
          <StepNumber>2</StepNumber>
          <StepContent>
            <strong>Acknowledgment (Within 48 hours)</strong>
            <span>We confirm receipt and provide reference number</span>
          </StepContent>
        </TimelineStep>
        <TimelineStep>
          <StepNumber>3</StepNumber>
          <StepContent>
            <strong>Processing (5-30 days)</strong>
            <span>We review your request and gather necessary information</span>
          </StepContent>
        </TimelineStep>
        <TimelineStep>
          <StepNumber>4</StepNumber>
          <StepContent>
            <strong>Response (Within 30 days)</strong>
            <span>Complete response with requested information or actions taken</span>
          </StepContent>
        </TimelineStep>
      </ProcessTimeline>

      <EmergencyContact>
        <h4>
          🚨 Emergency Data Protection Contact
        </h4>
        <p>
          For urgent data protection matters requiring immediate attention:
        </p>
        <div>
          <a href="mailto:emergency.privacy@recovery-office.com">
            emergency.privacy@recovery-office.com
          </a>
        </div>
        <div style={{ marginTop: `${PREMIUM_SPACING.md}px` }}>
          <strong>24/7 Emergency Line: +44 (0) 20 7946 0999</strong>
        </div>
        <p style={{ fontSize: '0.9rem', marginTop: `${PREMIUM_SPACING.md}px` }}>
          Use only for data breaches, security incidents, or time-critical privacy matters
        </p>
      </EmergencyContact>
    </ContactContainer>
  );
}; 