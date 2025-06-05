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
  info: '#3182ce'
};

const ProcessContainer = styled.div`
  margin: ${PREMIUM_SPACING.xl}px 0;
`;

const ProcessTimeline = styled.div`
  position: relative;
  padding-left: ${PREMIUM_SPACING.xl}px;
  margin: ${PREMIUM_SPACING.xl}px 0;

  &::before {
    content: '';
    position: absolute;
    left: ${PREMIUM_SPACING.lg}px;
    top: 0;
    bottom: 0;
    width: 3px;
    background: linear-gradient(180deg, ${PREMIUM_COLORS.secondary}, ${PREMIUM_COLORS.primary});
  }

  @media (max-width: 768px) {
    padding-left: ${PREMIUM_SPACING.lg}px;

    &::before {
      left: ${PREMIUM_SPACING.md}px;
    }
  }
`;

const ProcessStep = styled.div<{ stepNumber: number }>`
  position: relative;
  margin-bottom: ${PREMIUM_SPACING.xxxl}px;
  
  &::before {
    content: '${props => props.stepNumber}';
    position: absolute;
    left: -${PREMIUM_SPACING.xl + 12}px;
    top: ${PREMIUM_SPACING.sm}px;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: ${PREMIUM_COLORS.secondary};
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 1rem;
    box-shadow: 0 0 0 4px ${PREMIUM_COLORS.surface}, 0 0 0 6px ${PREMIUM_COLORS.secondary}40;

    @media (max-width: 768px) {
      left: -${PREMIUM_SPACING.lg + 12}px;
    }
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const StepCard = styled.div`
  background: ${PREMIUM_COLORS.surface};
  border: 2px solid ${PREMIUM_COLORS.border};
  border-radius: 12px;
  padding: ${PREMIUM_SPACING.xl}px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    border-color: ${PREMIUM_COLORS.secondary};
  }
`;

const StepHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${PREMIUM_SPACING.md}px;
  margin-bottom: ${PREMIUM_SPACING.lg}px;
`;

const StepIcon = styled.div`
  font-size: 1.5rem;
  flex-shrink: 0;
`;

const StepTitle = styled.h4`
  color: ${PREMIUM_COLORS.primary};
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
  line-height: 1.3;
`;

const StepDetails = styled.div`
  background: ${PREMIUM_COLORS.highlight};
  padding: ${PREMIUM_SPACING.lg}px;
  border-radius: 8px;
  margin: ${PREMIUM_SPACING.md}px 0;
  border-left: 4px solid ${PREMIUM_COLORS.secondary};

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

const RequirementsList = styled.ul`
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
      content: '📋';
      flex-shrink: 0;
      margin-top: 2px;
    }
  }
`;

const CostBreakdown = styled.div`
  background: linear-gradient(135deg, ${PREMIUM_COLORS.info}10 0%, ${PREMIUM_COLORS.info}05 100%);
  border: 1px solid ${PREMIUM_COLORS.info}40;
  border-radius: 8px;
  padding: ${PREMIUM_SPACING.lg}px;
  margin-top: ${PREMIUM_SPACING.lg}px;

  h5 {
    color: ${PREMIUM_COLORS.info};
    margin: 0 0 ${PREMIUM_SPACING.sm}px 0;
    font-size: 1rem;
    font-weight: 600;
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

const JurisdictionInfo = styled.div`
  background: ${PREMIUM_COLORS.surface};
  border: 2px solid ${PREMIUM_COLORS.border};
  border-radius: 12px;
  padding: ${PREMIUM_SPACING.xl}px;
  margin: ${PREMIUM_SPACING.xl}px 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

  h4 {
    color: ${PREMIUM_COLORS.primary};
    font-size: 1.125rem;
    margin: 0 0 ${PREMIUM_SPACING.lg}px 0;
    display: flex;
    align-items: center;
    gap: ${PREMIUM_SPACING.md}px;
  }

  .jurisdiction-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: ${PREMIUM_SPACING.lg}px;
    margin-top: ${PREMIUM_SPACING.lg}px;
  }

  .jurisdiction-item {
    background: ${PREMIUM_COLORS.highlight};
    padding: ${PREMIUM_SPACING.md}px;
    border-radius: 8px;
    border-left: 4px solid ${PREMIUM_COLORS.secondary};

    h5 {
      color: ${PREMIUM_COLORS.primary};
      margin: 0 0 ${PREMIUM_SPACING.sm}px 0;
      font-size: 1rem;
    }

    p {
      margin: 0;
      font-size: 0.9rem;
      color: ${PREMIUM_COLORS.text};
    }
  }
`;

interface DisputeStep {
  title: string;
  icon: string;
  timeframe: string;
  description: string;
  requirements: string[];
  costInfo: string;
  nextStep: string;
}

const disputeSteps: DisputeStep[] = [
  {
    title: 'Good Faith Negotiation',
    icon: '🤝',
    timeframe: '30 days from written notice',
    description: 'Both parties attempt to resolve the dispute through direct negotiation without formal proceedings.',
    requirements: [
      'Written notice of dispute must be provided',
      'Specific details of the disagreement',
      'Proposed resolution or remedy sought',
      'Both parties must engage in good faith discussions'
    ],
    costInfo: 'No cost - internal resolution attempt',
    nextStep: 'If unresolved after 30 days, proceed to mediation'
  },
  {
    title: 'Professional Mediation',
    icon: '⚖️',
    timeframe: '60 days from mediation commencement',
    description: 'Formal mediation through the Centre for Effective Dispute Resolution (CEDR) in London.',
    requirements: [
      'Joint appointment of CEDR mediator',
      'Preparation of mediation briefs',
      'Attendance at mediation session in London',
      'Good faith participation in mediation process'
    ],
    costInfo: 'Mediation costs: £3,000-£8,000 (shared equally between parties)',
    nextStep: 'If mediation fails, proceed to arbitration'
  },
  {
    title: 'Binding Arbitration',
    icon: '🏛️',
    timeframe: '6-12 months from arbitration commencement',
    description: 'Final resolution through London Court of International Arbitration (LCIA) rules.',
    requirements: [
      'Appointment of arbitrator(s) through LCIA',
      'Formal arbitration pleadings and evidence',
      'Arbitration hearing in London',
      'Legal representation recommended'
    ],
    costInfo: 'Arbitration costs: £15,000-£50,000+ (loser pays principle)',
    nextStep: 'Final and binding decision - no further appeal'
  }
];

const jurisdictionDetails = [
  {
    title: 'Governing Law',
    description: 'All disputes governed by the laws of England and Wales'
  },
  {
    title: 'Court Jurisdiction',
    description: 'English courts retain jurisdiction for enforcement and interim relief'
  },
  {
    title: 'International Clients',
    description: 'Special provisions for international clients under LCIA rules'
  },
  {
    title: 'Emergency Procedures',
    description: 'Emergency arbitrator available for urgent matters within 48 hours'
  }
];

export const DisputeResolutionProcess: React.FC = () => {
  return (
    <ProcessContainer>
      <h3 style={{ 
        color: PREMIUM_COLORS.primary, 
        fontSize: '1.25rem', 
        marginBottom: `${PREMIUM_SPACING.lg}px`,
        textAlign: 'center'
      }}>
        Professional Dispute Resolution Process
      </h3>

      <p style={{ 
        textAlign: 'center', 
        color: PREMIUM_COLORS.textSecondary, 
        fontSize: '1rem',
        marginBottom: `${PREMIUM_SPACING.xl}px`,
        fontStyle: 'italic'
      }}>
        Our three-tier dispute resolution framework ensures fair and professional resolution of any disagreements
      </p>

      <ProcessTimeline>
        {disputeSteps.map((step, index) => (
          <ProcessStep key={index} stepNumber={index + 1}>
            <StepCard>
              <StepHeader>
                <StepIcon>{step.icon}</StepIcon>
                <StepTitle>{step.title}</StepTitle>
              </StepHeader>

              <StepDetails>
                <h5>Timeframe & Process</h5>
                <p><strong>Duration:</strong> {step.timeframe}</p>
                <p>{step.description}</p>
              </StepDetails>

              <div>
                <h5 style={{ 
                  color: PREMIUM_COLORS.primary, 
                  fontSize: '1rem', 
                  fontWeight: 600,
                  margin: `${PREMIUM_SPACING.md}px 0 ${PREMIUM_SPACING.sm}px 0`
                }}>
                  Requirements:
                </h5>
                <RequirementsList>
                  {step.requirements.map((requirement, idx) => (
                    <li key={idx}>{requirement}</li>
                  ))}
                </RequirementsList>
              </div>

              <CostBreakdown>
                <h5>💰 Cost Information</h5>
                <p>{step.costInfo}</p>
              </CostBreakdown>

              <div style={{ 
                marginTop: `${PREMIUM_SPACING.lg}px`,
                padding: `${PREMIUM_SPACING.md}px`,
                background: PREMIUM_COLORS.highlight,
                borderRadius: '6px',
                fontSize: '0.9rem',
                color: PREMIUM_COLORS.text,
                fontStyle: 'italic'
              }}>
                <strong style={{ color: PREMIUM_COLORS.primary }}>Next Step:</strong> {step.nextStep}
              </div>
            </StepCard>
          </ProcessStep>
        ))}
      </ProcessTimeline>

      <JurisdictionInfo>
        <h4>
          <span>🌍</span>
          Jurisdiction & Governing Law
        </h4>
        <p style={{ 
          color: PREMIUM_COLORS.textSecondary, 
          marginBottom: `${PREMIUM_SPACING.lg}px`,
          fontSize: '1rem'
        }}>
          All disputes are resolved under English law with specialized procedures for international clients.
        </p>
        
        <div className="jurisdiction-grid">
          {jurisdictionDetails.map((item, index) => (
            <div key={index} className="jurisdiction-item">
              <h5>{item.title}</h5>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </JurisdictionInfo>

      <div style={{
        background: `linear-gradient(135deg, ${PREMIUM_COLORS.warning}15 0%, ${PREMIUM_COLORS.warning}08 100%)`,
        border: `1px solid ${PREMIUM_COLORS.warning}`,
        borderLeft: `4px solid ${PREMIUM_COLORS.warning}`,
        borderRadius: '12px',
        padding: `${PREMIUM_SPACING.xl}px`,
        marginTop: `${PREMIUM_SPACING.xl}px`
      }}>
        <h4 style={{ 
          color: PREMIUM_COLORS.warning, 
          margin: `0 0 ${PREMIUM_SPACING.md}px 0`,
          display: 'flex',
          alignItems: 'center',
          gap: `${PREMIUM_SPACING.sm}px`
        }}>
          ⚠️ Important Cost Allocation Notice
        </h4>
        <p style={{ margin: 0, color: PREMIUM_COLORS.text }}>
          <strong>Loser Pays Principle:</strong> The unsuccessful party in mediation or arbitration bears the costs 
          of the proceedings, including the other party's reasonable legal fees and administrative costs. 
          This encourages good faith participation and discourages frivolous disputes.
          <br /><br />
          <strong>Early Settlement Incentive:</strong> Parties are encouraged to resolve disputes early to 
          minimize costs. Settlement discussions remain confidential and cannot be used in subsequent proceedings.
        </p>
      </div>
    </ProcessContainer>
  );
}; 