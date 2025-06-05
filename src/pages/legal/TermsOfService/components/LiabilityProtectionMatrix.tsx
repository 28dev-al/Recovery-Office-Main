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

const LiabilityContainer = styled.div`
  margin: ${PREMIUM_SPACING.xl}px 0;
`;

const MatrixGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: ${PREMIUM_SPACING.xl}px;
  margin: ${PREMIUM_SPACING.xl}px 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: ${PREMIUM_SPACING.lg}px;
  }
`;

const LiabilityCard = styled.div<{ variant?: 'covered' | 'limited' | 'excluded' }>`
  background: ${PREMIUM_COLORS.surface};
  border: 2px solid ${props => {
    switch (props.variant) {
      case 'covered': return PREMIUM_COLORS.success;
      case 'limited': return PREMIUM_COLORS.warning;
      case 'excluded': return PREMIUM_COLORS.error;
      default: return PREMIUM_COLORS.border;
    }
  }};
  border-radius: 12px;
  padding: ${PREMIUM_SPACING.xl}px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${props => {
      switch (props.variant) {
        case 'covered': return PREMIUM_COLORS.success;
        case 'limited': return PREMIUM_COLORS.warning;
        case 'excluded': return PREMIUM_COLORS.error;
        default: return PREMIUM_COLORS.secondary;
      }
    }};
  }

  position: relative;
  overflow: hidden;
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${PREMIUM_SPACING.md}px;
  margin-bottom: ${PREMIUM_SPACING.lg}px;
`;

const StatusIcon = styled.div<{ variant?: 'covered' | 'limited' | 'excluded' }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  background: ${props => {
    switch (props.variant) {
      case 'covered': return PREMIUM_COLORS.success + '20';
      case 'limited': return PREMIUM_COLORS.warning + '20';
      case 'excluded': return PREMIUM_COLORS.error + '20';
      default: return PREMIUM_COLORS.highlight;
    }
  }};
  color: ${props => {
    switch (props.variant) {
      case 'covered': return PREMIUM_COLORS.success;
      case 'limited': return PREMIUM_COLORS.warning;
      case 'excluded': return PREMIUM_COLORS.error;
      default: return PREMIUM_COLORS.primary;
    }
  }};
`;

const CardTitle = styled.h4`
  color: ${PREMIUM_COLORS.primary};
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0;
  line-height: 1.3;
`;

const CoverageDetails = styled.div`
  background: ${PREMIUM_COLORS.highlight};
  padding: ${PREMIUM_SPACING.lg}px;
  border-radius: 8px;
  margin: ${PREMIUM_SPACING.md}px 0;

  h5 {
    color: ${PREMIUM_COLORS.primary};
    font-size: 1rem;
    font-weight: 600;
    margin: 0 0 ${PREMIUM_SPACING.sm}px 0;
  }

  p {
    margin: ${PREMIUM_SPACING.xs}px 0;
    font-size: 0.9rem;
    color: ${PREMIUM_COLORS.text};

    strong {
      color: ${PREMIUM_COLORS.primary};
    }
  }
`;

const LimitationsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: ${PREMIUM_SPACING.md}px 0;

  li {
    display: flex;
    align-items: flex-start;
    gap: ${PREMIUM_SPACING.sm}px;
    margin-bottom: ${PREMIUM_SPACING.sm}px;
    color: ${PREMIUM_COLORS.text};
    font-size: 0.9rem;

    &::before {
      content: '•';
      color: ${PREMIUM_COLORS.secondary};
      font-weight: bold;
      flex-shrink: 0;
      margin-top: 2px;
    }
  }
`;

const InsuranceTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: ${PREMIUM_SPACING.xl}px 0;
  background: ${PREMIUM_COLORS.surface};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

  thead {
    background: ${PREMIUM_COLORS.primary};

    th {
      color: white;
      padding: ${PREMIUM_SPACING.lg}px;
      text-align: left;
      font-weight: 600;
      font-size: 1rem;
    }
  }

  tbody {
    tr {
      border-bottom: 1px solid ${PREMIUM_COLORS.border};

      &:hover {
        background-color: ${PREMIUM_COLORS.highlight};
      }

      &:last-child {
        border-bottom: none;
      }
    }

    td {
      padding: ${PREMIUM_SPACING.lg}px;
      color: ${PREMIUM_COLORS.text};
      vertical-align: top;

      strong {
        color: ${PREMIUM_COLORS.primary};
        font-weight: 600;
      }
    }
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;

    th, td {
      padding: ${PREMIUM_SPACING.md}px;
    }
  }
`;

const ImportantNotice = styled.div`
  background: linear-gradient(135deg, ${PREMIUM_COLORS.warning}15 0%, ${PREMIUM_COLORS.warning}08 100%);
  border: 1px solid ${PREMIUM_COLORS.warning};
  border-left: 4px solid ${PREMIUM_COLORS.warning};
  border-radius: 12px;
  padding: ${PREMIUM_SPACING.xl}px;
  margin: ${PREMIUM_SPACING.xl}px 0;

  h4 {
    color: ${PREMIUM_COLORS.warning};
    margin: 0 0 ${PREMIUM_SPACING.md}px 0;
    display: flex;
    align-items: center;
    gap: ${PREMIUM_SPACING.sm}px;
  }

  p {
    margin: 0;
    color: ${PREMIUM_COLORS.text};
  }
`;

interface LiabilityItem {
  title: string;
  variant: 'covered' | 'limited' | 'excluded';
  icon: string;
  coverage: string;
  limitations: string[];
  details: string;
}

const liabilityMatrix: LiabilityItem[] = [
  {
    title: 'Professional Negligence',
    variant: 'covered',
    icon: '🛡️',
    coverage: 'Up to £10 million coverage',
    limitations: [
      'Must be direct result of our professional advice',
      'Claim must be notified within 12 months',
      'Subject to policy terms and conditions',
      'Excess of £25,000 applies per claim'
    ],
    details: 'Full professional indemnity insurance coverage for errors, omissions, or negligent acts in the provision of professional services.'
  },
  {
    title: 'Consultation Advice',
    variant: 'limited',
    icon: '💼',
    coverage: 'Limited to consultation fees paid',
    limitations: [
      'Maximum liability capped at fees paid for specific service',
      'No liability for implementation of recommendations',
      'Client must follow advice exactly as provided',
      'No guarantee of recovery outcomes'
    ],
    details: 'We provide professional consultation only. Implementation and outcomes depend on factors beyond our control.'
  },
  {
    title: 'Market Forces & External Factors',
    variant: 'excluded',
    icon: '📈',
    coverage: 'No coverage provided',
    limitations: [
      'Cryptocurrency price volatility',
      'Market conditions and liquidity',
      'Regulatory changes or interventions',
      'Third-party actions or failures',
      'Force majeure events'
    ],
    details: 'We cannot control or accept liability for external market conditions, regulatory changes, or third-party actions.'
  },
  {
    title: 'Technology & System Failures',
    variant: 'limited',
    icon: '💻',
    coverage: 'Business continuity measures in place',
    limitations: [
      'Maximum 24-hour delay for alternative service delivery',
      'No liability for data loss due to client system failures',
      'Internet connectivity issues excluded',
      'Third-party platform failures excluded'
    ],
    details: 'We maintain robust technology infrastructure but cannot guarantee 100% uptime or control third-party systems.'
  },
  {
    title: 'Criminal Activity & Fraud',
    variant: 'excluded',
    icon: '🚫',
    coverage: 'No coverage for criminal losses',
    limitations: [
      'No liability for losses due to criminal activity',
      'Cannot recover assets from criminal organizations',
      'No guarantee of law enforcement cooperation',
      'Subject to anti-money laundering regulations'
    ],
    details: 'We provide guidance on reporting and recovery options but cannot guarantee outcomes in criminal matters.'
  },
  {
    title: 'Client Implementation Failures',
    variant: 'excluded',
    icon: '⚠️',
    coverage: 'Client responsibility',
    limitations: [
      'Failure to follow provided recommendations',
      'Delays in taking recommended actions',
      'Incomplete information provided to us',
      'Failure to engage recommended specialists'
    ],
    details: 'Successful outcomes depend on client implementation of our recommendations within specified timeframes.'
  }
];

const insuranceCoverage = [
  {
    type: 'Professional Indemnity',
    coverage: '£10,000,000',
    provider: 'Lloyd\'s of London Syndicate',
    renewal: 'Annual (Next: June 2025)',
    excess: '£25,000 per claim'
  },
  {
    type: 'Public Liability',
    coverage: '£2,000,000',
    provider: 'AXA Business Insurance',
    renewal: 'Annual (Next: June 2025)',
    excess: '£1,000 per claim'
  },
  {
    type: 'Cyber Liability',
    coverage: '£5,000,000',
    provider: 'CFC Underwriting',
    renewal: 'Annual (Next: June 2025)',
    excess: '£10,000 per claim'
  },
  {
    type: 'Directors & Officers',
    coverage: '£1,000,000',
    provider: 'Hiscox Business Insurance',
    renewal: 'Annual (Next: June 2025)',
    excess: '£5,000 per claim'
  }
];

export const LiabilityProtectionMatrix: React.FC = () => {
  return (
    <LiabilityContainer>
      <h3 style={{ 
        color: PREMIUM_COLORS.primary, 
        fontSize: '1.25rem', 
        marginBottom: `${PREMIUM_SPACING.lg}px`,
        textAlign: 'center'
      }}>
        Liability Protection & Insurance Coverage
      </h3>

      <MatrixGrid>
        {liabilityMatrix.map((item, index) => (
          <LiabilityCard key={index} variant={item.variant}>
            <CardHeader>
              <StatusIcon variant={item.variant}>
                {item.icon}
              </StatusIcon>
              <CardTitle>{item.title}</CardTitle>
            </CardHeader>

            <CoverageDetails>
              <h5>Coverage Level</h5>
              <p><strong>{item.coverage}</strong></p>
            </CoverageDetails>

            <div style={{ marginBottom: `${PREMIUM_SPACING.md}px` }}>
              <h5 style={{ 
                color: PREMIUM_COLORS.primary, 
                fontSize: '1rem', 
                fontWeight: 600,
                margin: `0 0 ${PREMIUM_SPACING.sm}px 0`
              }}>
                Important Limitations:
              </h5>
              <LimitationsList>
                {item.limitations.map((limitation, idx) => (
                  <li key={idx}>{limitation}</li>
                ))}
              </LimitationsList>
            </div>

            <div style={{ 
              color: PREMIUM_COLORS.textSecondary, 
              fontSize: '0.9rem', 
              lineHeight: 1.6,
              fontStyle: 'italic'
            }}>
              {item.details}
            </div>
          </LiabilityCard>
        ))}
      </MatrixGrid>

      <h4 style={{ 
        color: PREMIUM_COLORS.primary, 
        fontSize: '1.125rem', 
        margin: `${PREMIUM_SPACING.xxl}px 0 ${PREMIUM_SPACING.lg}px 0`
      }}>
        Professional Insurance Coverage
      </h4>

      <InsuranceTable>
        <thead>
          <tr>
            <th>Insurance Type</th>
            <th>Coverage Amount</th>
            <th>Provider</th>
            <th>Renewal Date</th>
            <th>Excess</th>
          </tr>
        </thead>
        <tbody>
          {insuranceCoverage.map((insurance, index) => (
            <tr key={index}>
              <td><strong>{insurance.type}</strong></td>
              <td><strong>{insurance.coverage}</strong></td>
              <td>{insurance.provider}</td>
              <td>{insurance.renewal}</td>
              <td>{insurance.excess}</td>
            </tr>
          ))}
        </tbody>
      </InsuranceTable>

      <ImportantNotice>
        <h4>⚖️ Important Legal Disclaimers</h4>
        <p>
          <strong>Time Limitation:</strong> Any claims against Recovery Office Limited must be 
          notified in writing within 12 months of the consultation or service delivery. 
          Claims not notified within this period are time-barred. 
          <br /><br />
          <strong>Governing Law:</strong> All liability limitations and insurance coverage 
          are subject to English law and the exclusive jurisdiction of English courts.
          <br /><br />
          <strong>Recovery Disclaimer:</strong> While we provide expert guidance, we cannot 
          guarantee recovery outcomes. Success depends on multiple factors including 
          law enforcement cooperation, asset traceability, and legal jurisdiction.
        </p>
      </ImportantNotice>
    </LiabilityContainer>
  );
}; 