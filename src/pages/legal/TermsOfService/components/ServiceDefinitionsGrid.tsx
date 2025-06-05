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
  success: '#38a169'
};

const ServiceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: ${PREMIUM_SPACING.xl}px;
  margin: ${PREMIUM_SPACING.xl}px 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: ${PREMIUM_SPACING.lg}px;
  }
`;

const ServiceCard = styled.div`
  background: ${PREMIUM_COLORS.surface};
  border: 2px solid ${PREMIUM_COLORS.border};
  border-radius: 12px;
  padding: ${PREMIUM_SPACING.xl}px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    border-color: ${PREMIUM_COLORS.secondary};
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, ${PREMIUM_COLORS.secondary}, ${PREMIUM_COLORS.primary});
  }
`;

const ServiceHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${PREMIUM_SPACING.md}px;
  margin-bottom: ${PREMIUM_SPACING.lg}px;
`;

const ServiceIcon = styled.div`
  font-size: 2rem;
  opacity: 0.8;
  flex-shrink: 0;
`;

const ServiceTitle = styled.h4`
  color: ${PREMIUM_COLORS.primary};
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
  line-height: 1.3;
`;

const ServiceDetails = styled.div`
  background: ${PREMIUM_COLORS.highlight};
  padding: ${PREMIUM_SPACING.lg}px;
  border-radius: 8px;
  margin: ${PREMIUM_SPACING.lg}px 0;
  border-left: 4px solid ${PREMIUM_COLORS.secondary};

  h5 {
    color: ${PREMIUM_COLORS.primary};
    font-size: 1rem;
    font-weight: 600;
    margin: 0 0 ${PREMIUM_SPACING.md}px 0;
  }

  p {
    margin: ${PREMIUM_SPACING.xs}px 0;
    font-size: 0.9rem;
    color: ${PREMIUM_COLORS.text};

    strong {
      color: ${PREMIUM_COLORS.primary};
      font-weight: 600;
    }
  }
`;

const ServiceDescription = styled.div`
  color: ${PREMIUM_COLORS.textSecondary};
  font-size: 1rem;
  line-height: 1.6;
  margin-top: ${PREMIUM_SPACING.lg}px;
`;

const FeeHighlight = styled.div`
  background: ${PREMIUM_COLORS.secondary}20;
  color: ${PREMIUM_COLORS.primary};
  padding: ${PREMIUM_SPACING.md}px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 1.125rem;
  text-align: center;
  margin-top: ${PREMIUM_SPACING.lg}px;
  border: 1px solid ${PREMIUM_COLORS.secondary}40;
`;

const DeliverablesList = styled.ul`
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
      content: '✓';
      color: ${PREMIUM_COLORS.success};
      font-weight: bold;
      flex-shrink: 0;
      margin-top: 2px;
    }
  }
`;

const ValueProposition = styled.div`
  background: linear-gradient(135deg, ${PREMIUM_COLORS.primary}10 0%, ${PREMIUM_COLORS.secondary}10 100%);
  padding: ${PREMIUM_SPACING.md}px;
  border-radius: 8px;
  margin-top: ${PREMIUM_SPACING.lg}px;
  font-size: 0.9rem;
  color: ${PREMIUM_COLORS.text};
  font-style: italic;
  text-align: center;
`;

interface ServiceDefinition {
  title: string;
  icon: string;
  duration: string;
  deliverables: string[];
  fee: string;
  description: string;
  valueProposition: string;
  scope: string;
}

const serviceDefinitions: ServiceDefinition[] = [
  {
    title: 'Initial Consultation',
    icon: '🎯',
    duration: '90-120 minutes via secure video conference',
    deliverables: [
      'Comprehensive written assessment report (10-15 pages)',
      'Personalized recovery strategy with timeline',
      'Risk assessment and probability analysis',
      'Specialist partner recommendations',
      'Priority action items with deadlines',
      '30 days of follow-up support included'
    ],
    fee: '£2,500 (exclusive of VAT)',
    description: 'Our flagship service designed for high-net-worth individuals who have experienced significant financial losses and need expert guidance on recovery options and next steps.',
    valueProposition: 'Most clients recover 3-5x the consultation fee through improved strategy and specialist introductions',
    scope: 'Suitable for losses of £100,000 to £50,000,000+'
  },
  {
    title: 'Extended Investigation Service',
    icon: '🔍',
    duration: '2-4 weeks depending on case complexity',
    deliverables: [
      'Detailed investigation report (25-50 pages)',
      'Comprehensive evidence compilation',
      'Blockchain and transaction analysis',
      'Asset tracing documentation',
      'Legal pathway recommendations',
      'Recovery probability assessment'
    ],
    fee: '£7,500 - £25,000 (case dependent)',
    description: 'In-depth investigation combining traditional financial investigation techniques with cutting-edge blockchain analysis and digital forensics.',
    valueProposition: 'Advanced investigation techniques often uncover assets and pathways missed by conventional approaches',
    scope: 'Complex cases requiring technical analysis'
  },
  {
    title: 'Strategic Recovery Implementation',
    icon: '⚡',
    duration: 'Variable timeline based on case complexity',
    deliverables: [
      'Regular progress reports (weekly/monthly)',
      'Coordination with legal and technical partners',
      'Strategic case management and oversight',
      'Real-time strategy adjustments',
      'Final outcome documentation',
      'Lessons learned report'
    ],
    fee: 'From £15,000 (minimum engagement)',
    description: 'End-to-end case management where we coordinate with specialist partners to implement recovery strategies under our strategic oversight.',
    valueProposition: 'Coordinated approach significantly improves success rates compared to fragmented efforts',
    scope: 'High-value cases with multiple recovery pathways'
  },
  {
    title: 'Expert Witness Services',
    icon: '⚖️',
    duration: 'Per legal proceeding requirements',
    deliverables: [
      'Expert witness reports meeting court standards',
      'Professional court testimony',
      'Technical evidence preparation',
      'Cross-examination preparation and support',
      'Case strategy consultation with legal teams'
    ],
    fee: '£500/hour + preparation time',
    description: 'Professional expert witness services for legal proceedings involving financial asset recovery, cryptocurrency disputes, and investment fraud cases.',
    valueProposition: 'Specialized expertise in financial recovery often decisive in complex legal proceedings',
    scope: 'Legal proceedings requiring technical expertise'
  }
];

export const ServiceDefinitionsGrid: React.FC = () => {
  return (
    <ServiceGrid>
      {serviceDefinitions.map((service, index) => (
        <ServiceCard key={index}>
          <ServiceHeader>
            <ServiceIcon>{service.icon}</ServiceIcon>
            <ServiceTitle>{service.title}</ServiceTitle>
          </ServiceHeader>

          <ServiceDetails>
            <h5>Service Details</h5>
            <p><strong>Duration:</strong> {service.duration}</p>
            <p><strong>Scope:</strong> {service.scope}</p>
          </ServiceDetails>

          <div>
            <h5 style={{ 
              color: PREMIUM_COLORS.primary, 
              margin: `${PREMIUM_SPACING.md}px 0 ${PREMIUM_SPACING.sm}px 0`,
              fontSize: '1rem',
              fontWeight: 600
            }}>
              Deliverables Included:
            </h5>
            <DeliverablesList>
              {service.deliverables.map((deliverable, idx) => (
                <li key={idx}>{deliverable}</li>
              ))}
            </DeliverablesList>
          </div>

          <ServiceDescription>
            {service.description}
          </ServiceDescription>

          <ValueProposition>
            💡 {service.valueProposition}
          </ValueProposition>

          <FeeHighlight>
            {service.fee}
          </FeeHighlight>
        </ServiceCard>
      ))}
    </ServiceGrid>
  );
}; 