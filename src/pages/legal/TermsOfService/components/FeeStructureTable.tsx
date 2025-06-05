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

const TableContainer = styled.div`
  margin: ${PREMIUM_SPACING.xl}px 0;
  overflow-x: auto;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    margin: ${PREMIUM_SPACING.lg}px 0;
  }
`;

const FeeTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: ${PREMIUM_COLORS.surface};
  border-radius: 12px;
  overflow: hidden;

  thead {
    background: ${PREMIUM_COLORS.primary};

    th {
      color: white;
      padding: ${PREMIUM_SPACING.lg}px;
      text-align: left;
      font-weight: 600;
      font-size: 1rem;
      border-bottom: none;

      @media (max-width: 768px) {
        padding: ${PREMIUM_SPACING.md}px;
        font-size: 0.9rem;
      }
    }
  }

  tbody {
    tr {
      border-bottom: 1px solid ${PREMIUM_COLORS.border};
      transition: background-color 0.2s ease;

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
      font-size: 1rem;

      @media (max-width: 768px) {
        padding: ${PREMIUM_SPACING.md}px;
        font-size: 0.9rem;
      }

      strong {
        color: ${PREMIUM_COLORS.primary};
        font-weight: 600;
      }
    }
  }

  @media print {
    box-shadow: none;
    border: 1px solid black;
  }
`;

const ServiceTitle = styled.div`
  font-weight: 600;
  color: ${PREMIUM_COLORS.primary};
  font-size: 1.1rem;
  margin-bottom: ${PREMIUM_SPACING.xs}px;
`;

const ServiceDescription = styled.div`
  color: ${PREMIUM_COLORS.textSecondary};
  font-size: 0.9rem;
  line-height: 1.5;
`;

const FeeHighlight = styled.div`
  background: ${PREMIUM_COLORS.secondary}20;
  color: ${PREMIUM_COLORS.primary};
  padding: ${PREMIUM_SPACING.sm}px ${PREMIUM_SPACING.md}px;
  border-radius: 6px;
  font-weight: 700;
  font-size: 1.1rem;
  text-align: center;
  border: 1px solid ${PREMIUM_COLORS.secondary}40;
`;

const Duration = styled.div`
  color: ${PREMIUM_COLORS.text};
  font-weight: 500;
  margin-bottom: ${PREMIUM_SPACING.xs}px;

  strong {
    color: ${PREMIUM_COLORS.primary};
  }
`;

const Deliverables = styled.div`
  color: ${PREMIUM_COLORS.textSecondary};
  font-size: 0.9rem;
  line-height: 1.5;

  ul {
    margin: ${PREMIUM_SPACING.xs}px 0 0 0;
    padding-left: ${PREMIUM_SPACING.lg}px;

    li {
      margin-bottom: ${PREMIUM_SPACING.xs}px;
    }
  }
`;

const PremiumBadge = styled.span`
  background: ${PREMIUM_COLORS.success};
  color: white;
  padding: ${PREMIUM_SPACING.xs}px ${PREMIUM_SPACING.sm}px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-left: ${PREMIUM_SPACING.sm}px;
`;

interface FeeStructureItem {
  service: string;
  description: string;
  duration: string;
  deliverables: string[];
  fee: string;
  isPremium?: boolean;
}

const feeStructure: FeeStructureItem[] = [
  {
    service: 'Initial Consultation',
    description: 'Comprehensive case assessment for high-net-worth individuals',
    duration: '90-120 minutes via secure video conference',
    deliverables: [
      'Written assessment report (10-15 pages)',
      'Recommended action plan with timelines',
      'Specialist partner introductions where appropriate',
      '30 days follow-up support included'
    ],
    fee: '£2,500',
    isPremium: true
  },
  {
    service: 'Extended Investigation Service',
    description: 'In-depth case investigation and evidence analysis',
    duration: '2-4 weeks depending on complexity',
    deliverables: [
      'Detailed investigation report (25-50 pages)',
      'Evidence compilation and analysis',
      'Asset tracing documentation',
      'Recovery strategy recommendations',
      'Legal pathway analysis'
    ],
    fee: '£7,500 - £25,000'
  },
  {
    service: 'Strategic Recovery Implementation',
    description: 'Coordinated recovery efforts with specialist partners',
    duration: 'Variable based on case complexity',
    deliverables: [
      'Regular progress reports (weekly/monthly)',
      'Coordination with legal and technical partners',
      'Case management and strategic oversight',
      'Final outcome summary and documentation'
    ],
    fee: '£15,000 minimum'
  },
  {
    service: 'Expert Witness Services',
    description: 'Professional expert witness for legal proceedings',
    duration: 'Per legal proceeding requirements',
    deliverables: [
      'Expert witness reports',
      'Court testimony and appearances',
      'Technical evidence preparation',
      'Cross-examination preparation'
    ],
    fee: '£500/hour + preparation'
  },
  {
    service: 'Ongoing Advisory Retainer',
    description: 'Monthly retainer for ongoing case support',
    duration: 'Monthly engagement with dedicated consultant',
    deliverables: [
      'Monthly consultation sessions (2 hours)',
      'Unlimited email and phone support',
      'Case monitoring and updates',
      'Priority access to specialist services'
    ],
    fee: '£5,000/month',
    isPremium: true
  }
];

export const FeeStructureTable: React.FC = () => {
  return (
    <TableContainer>
      <FeeTable>
        <thead>
          <tr>
            <th>Service</th>
            <th>Duration & Scope</th>
            <th>Deliverables</th>
            <th>Professional Fee</th>
          </tr>
        </thead>
        <tbody>
          {feeStructure.map((item, index) => (
            <tr key={index}>
              <td>
                <ServiceTitle>
                  {item.service}
                  {item.isPremium && <PremiumBadge>Premium</PremiumBadge>}
                </ServiceTitle>
                <ServiceDescription>
                  {item.description}
                </ServiceDescription>
              </td>
              
              <td>
                <Duration>
                  <strong>Duration:</strong> {item.duration}
                </Duration>
              </td>
              
              <td>
                <Deliverables>
                  <ul>
                    {item.deliverables.map((deliverable, idx) => (
                      <li key={idx}>{deliverable}</li>
                    ))}
                  </ul>
                </Deliverables>
              </td>
              
              <td>
                <FeeHighlight>
                  {item.fee}
                </FeeHighlight>
                <div style={{ 
                  fontSize: '0.8rem', 
                  color: PREMIUM_COLORS.textSecondary, 
                  marginTop: `${PREMIUM_SPACING.sm}px`,
                  textAlign: 'center'
                }}>
                  {item.fee.includes('£2,500') ? 'Most Popular' : 
                   item.fee.includes('minimum') ? 'Case Dependent' : 
                   'Plus VAT'}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </FeeTable>
    </TableContainer>
  );
}; 