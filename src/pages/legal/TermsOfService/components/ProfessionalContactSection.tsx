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
  surface: '#ffffff',
  border: '#e2e8f0',
  highlight: '#edf2f7',
  text: '#2d3748',
  textSecondary: '#4a5568',
  success: '#38a169',
  warning: '#f56500',
  error: '#e53e3e'
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

const BusinessHours = styled.div`
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

  .hours-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: ${PREMIUM_SPACING.lg}px;
  }

  .hours-item {
    text-align: center;
    padding: ${PREMIUM_SPACING.md}px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 8px;

    .department {
      color: ${PREMIUM_COLORS.secondary};
      font-weight: 600;
      margin-bottom: ${PREMIUM_SPACING.xs}px;
    }

    .time {
      color: #e2e8f0;
      font-size: 0.9rem;
    }
  }
`;

const LegalNotice = styled.div`
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
    font-size: 0.95rem;
    line-height: 1.6;
  }

  .legal-address {
    background: rgba(255, 255, 255, 0.1);
    padding: ${PREMIUM_SPACING.md}px;
    border-radius: 8px;
    margin-top: ${PREMIUM_SPACING.lg}px;

    strong {
      color: #fef2f2;
      display: block;
      margin-bottom: ${PREMIUM_SPACING.sm}px;
    }

    p {
      color: #fecaca;
      margin: 0;
      font-size: 0.9rem;
    }
  }
`;

export const ProfessionalContactSection: React.FC = () => {
  const handleEmailContact = (email: string, subject: string) => {
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}`;
    window.open(mailtoLink, '_blank');
  };

  return (
    <ContactContainer id="contact-legal">
      <h3>Legal & Business Contact Information</h3>
      
      <ContactGrid>
        <ContactCard priority="primary">
          <h4>
            ⚖️ Legal Department
          </h4>
          <ContactDetails>
            <Detail>
              <strong>Contract Administration:</strong>
              <span>
                <a href="mailto:legal@recovery-office.com">legal@recovery-office.com</a>
              </span>
            </Detail>
            <Detail>
              <strong>Response Time:</strong>
              <span>Within 48 hours during business days</span>
            </Detail>
            <Detail>
              <strong>Legal Notices:</strong>
              <span>Formal legal notices must be sent via registered post</span>
            </Detail>
            <Detail>
              <strong>Contract Queries:</strong>
              <span>Terms interpretation and contract modifications</span>
            </Detail>
            <Detail>
              <strong>Languages:</strong>
              <span>English (primary), French, German available</span>
            </Detail>
          </ContactDetails>
          <ContactButton 
            onClick={() => handleEmailContact('legal@recovery-office.com', 'Legal Inquiry - Terms of Service')}
          >
            Contact Legal Team
          </ContactButton>
        </ContactCard>
        
        <ContactCard>
          <h4>
            💼 Business Operations
          </h4>
          <ContactDetails>
            <Detail>
              <strong>Billing & Payments:</strong>
              <span>
                <a href="mailto:billing@recovery-office.com">billing@recovery-office.com</a>
              </span>
            </Detail>
            <Detail>
              <strong>Response Time:</strong>
              <span>Within 24 hours for billing matters</span>
            </Detail>
            <Detail>
              <strong>Invoice Queries:</strong>
              <span>Payment processing and invoice disputes</span>
            </Detail>
            <Detail>
              <strong>Refund Requests:</strong>
              <span>Processing cancellations and refund requests</span>
            </Detail>
          </ContactDetails>
          <ContactButton 
            onClick={() => handleEmailContact('billing@recovery-office.com', 'Billing Inquiry - [Your Reference]')}
          >
            Contact Billing
          </ContactButton>
        </ContactCard>
        
        <ContactCard>
          <h4>
            🔄 Dispute Resolution
          </h4>
          <ContactDetails>
            <Detail>
              <strong>Dispute Management:</strong>
              <span>
                <a href="mailto:disputes@recovery-office.com">disputes@recovery-office.com</a>
              </span>
            </Detail>
            <Detail>
              <strong>Formal Complaints:</strong>
              <span>Structured complaint handling process</span>
            </Detail>
            <Detail>
              <strong>Mediation Coordination:</strong>
              <span>CEDR mediation scheduling and coordination</span>
            </Detail>
            <Detail>
              <strong>Resolution Timeframe:</strong>
              <span>Initial response within 5 business days</span>
            </Detail>
          </ContactDetails>
          <ContactButton 
            onClick={() => handleEmailContact('disputes@recovery-office.com', 'Dispute Resolution Inquiry')}
          >
            File Complaint
          </ContactButton>
        </ContactCard>

        <ContactCard>
          <h4>
            📞 Emergency Contact
          </h4>
          <ContactDetails>
            <Detail>
              <strong>Urgent Matters:</strong>
              <span>
                <a href="mailto:urgent@recovery-office.com">urgent@recovery-office.com</a>
              </span>
            </Detail>
            <Detail>
              <strong>Phone (Business Hours):</strong>
              <span>+44 (0) 20 7946 0080</span>
            </Detail>
            <Detail>
              <strong>Emergency Line:</strong>
              <span>+44 (0) 20 7946 0999 (urgent matters only)</span>
            </Detail>
            <Detail>
              <strong>Use For:</strong>
              <p>Security incidents, urgent legal matters, time-critical contract issues</p>
            </Detail>
          </ContactDetails>
          <ContactButton 
            onClick={() => handleEmailContact('urgent@recovery-office.com', 'Urgent Matter - [Brief Description]')}
          >
            Emergency Contact
          </ContactButton>
        </ContactCard>
      </ContactGrid>

      <BusinessHours>
        <h4>Business Hours & Availability</h4>
        <div className="hours-grid">
          <div className="hours-item">
            <div className="department">Legal Department</div>
            <div className="time">Monday-Friday: 9:00 AM - 6:00 PM GMT</div>
          </div>
          <div className="hours-item">
            <div className="department">Billing Support</div>
            <div className="time">Monday-Friday: 9:00 AM - 5:00 PM GMT</div>
          </div>
          <div className="hours-item">
            <div className="department">General Inquiries</div>
            <div className="time">Monday-Friday: 9:00 AM - 6:00 PM GMT</div>
          </div>
          <div className="hours-item">
            <div className="department">Emergency Line</div>
            <div className="time">24/7 for urgent matters only</div>
          </div>
        </div>
      </BusinessHours>

      <LegalNotice>
        <h4>
          🏛️ Formal Legal Notice Address
        </h4>
        <p>
          All formal legal notices, court documents, and official correspondence must be sent to our registered office address:
        </p>
        <div className="legal-address">
          <strong>Recovery Office Limited - Legal Department</strong>
          <p>
            1 Northumberland Avenue<br />
            London WC2N 5BW<br />
            United Kingdom
          </p>
        </div>
        <p style={{ fontSize: '0.9rem', marginTop: `${PREMIUM_SPACING.lg}px` }}>
          <strong>Important:</strong> Email communications are for general inquiries only. 
          Legal notices requiring formal service must be delivered via registered post or 
          professional process service to be legally effective under English law.
        </p>
      </LegalNotice>
    </ContactContainer>
  );
}; 