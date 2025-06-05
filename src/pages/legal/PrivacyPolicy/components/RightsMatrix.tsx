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

const RightsContainer = styled.div`
  margin: ${PREMIUM_SPACING.xl}px 0;
`;

const RightsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: ${PREMIUM_SPACING.lg}px 0;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  th {
    background: ${PREMIUM_COLORS.primary};
    color: white;
    padding: ${PREMIUM_SPACING.lg}px;
    text-align: left;
    font-weight: 600;
    font-size: 1rem;
    position: sticky;
    top: 0;
    z-index: 10;
  }

  td {
    padding: ${PREMIUM_SPACING.lg}px;
    border-bottom: 1px solid ${PREMIUM_COLORS.border};
    vertical-align: top;
  }

  tr:nth-child(even) {
    background: ${PREMIUM_COLORS.highlight};
  }

  tr:hover {
    background: rgba(214, 158, 46, 0.1);
  }

  tr:last-child td {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;

    th, td {
      padding: ${PREMIUM_SPACING.md}px;
    }
  }

  @media print {
    box-shadow: none;
    border: 1px solid black;
  }
`;

const RightName = styled.strong`
  color: ${PREMIUM_COLORS.primary};
  font-size: 1.1rem;
  display: block;
  margin-bottom: ${PREMIUM_SPACING.xs}px;
`;

const ArticleReference = styled.span`
  background: ${PREMIUM_COLORS.secondary}20;
  color: ${PREMIUM_COLORS.primary};
  padding: 2px ${PREMIUM_SPACING.xs}px;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 600;
`;

const ResponseTime = styled.div`
  background: #e6fffa;
  color: #2c7a7b;
  padding: ${PREMIUM_SPACING.sm}px;
  border-radius: 6px;
  border-left: 3px solid #38a169;
  font-weight: 600;
  text-align: center;
`;

const HowToExercise = styled.div`
  background: ${PREMIUM_COLORS.highlight};
  padding: ${PREMIUM_SPACING.md}px;
  border-radius: 6px;
  font-size: 0.9rem;
  
  strong {
    color: ${PREMIUM_COLORS.primary};
  }
`;

const Limitations = styled.div`
  background: #fff5f5;
  color: #c53030;
  padding: ${PREMIUM_SPACING.md}px;
  border-radius: 6px;
  border-left: 3px solid #fc8181;
  font-size: 0.9rem;
  
  strong {
    color: #9b2c2c;
  }
`;

const ExerciseButton = styled.button`
  background: ${PREMIUM_COLORS.secondary};
  color: white;
  border: none;
  padding: ${PREMIUM_SPACING.sm}px ${PREMIUM_SPACING.md}px;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  margin-top: ${PREMIUM_SPACING.sm}px;

  &:hover {
    background: #b7791f;
    transform: translateY(-1px);
  }
`;

interface DataRight {
  name: string;
  article: string;
  description: string;
  howToExercise: string;
  responseTime: string;
  limitations: string;
  emailSubject: string;
}

const dataRights: DataRight[] = [
  {
    name: 'Right of Access',
    article: 'Article 15',
    description: 'Request copies of your personal data and information about how we process it, including purposes, categories, recipients, and retention periods.',
    howToExercise: 'Email dpo@recovery-office.com with identity verification documents. Include specific details about the information you want to access.',
    responseTime: '30 days maximum',
    limitations: 'We may charge a reasonable fee for excessive or repetitive requests. Identity verification required.',
    emailSubject: 'Subject Access Request - [Your Name]'
  },
  {
    name: 'Right to Rectification',
    article: 'Article 16',
    description: 'Request correction of inaccurate or incomplete personal data we hold about you.',
    howToExercise: 'Submit correction request with supporting evidence to dpo@recovery-office.com. Include details of inaccurate information.',
    responseTime: '30 days maximum',
    limitations: 'Must provide evidence for factual corrections. Cannot modify professional opinions or assessments.',
    emailSubject: 'Data Rectification Request - [Your Name]'
  },
  {
    name: 'Right to Erasure',
    article: 'Article 17',
    description: 'Request deletion of personal data ("right to be forgotten") when processing is no longer necessary or lawful.',
    howToExercise: 'Submit deletion request with justification to dpo@recovery-office.com. Specify data to be deleted.',
    responseTime: '30 days maximum',
    limitations: 'Cannot delete data required for legal obligations, financial services regulations, or ongoing legal matters.',
    emailSubject: 'Data Erasure Request - [Your Name]'
  },
  {
    name: 'Right to Restriction',
    article: 'Article 18',
    description: 'Request limitation of how we process your personal data while maintaining the data on our systems.',
    howToExercise: 'Email dpo@recovery-office.com with specific restriction requirements and justification.',
    responseTime: '30 days maximum',
    limitations: 'May continue processing for legal claims, protection of rights, or public interest reasons.',
    emailSubject: 'Data Processing Restriction - [Your Name]'
  },
  {
    name: 'Right to Data Portability',
    article: 'Article 20',
    description: 'Receive personal data you provided to us in a structured, machine-readable format for transfer to another controller.',
    howToExercise: 'Request structured data export through dpo@recovery-office.com. Specify preferred format.',
    responseTime: '30 days maximum',
    limitations: 'Only applies to data you provided and processed by automated means. Does not include derived or inferred data.',
    emailSubject: 'Data Portability Request - [Your Name]'
  },
  {
    name: 'Right to Object',
    article: 'Article 21',
    description: 'Object to processing based on legitimate interests, direct marketing, or processing for statistical purposes.',
    howToExercise: 'Submit objection with compelling grounds to dpo@recovery-office.com. Include reason for objection.',
    responseTime: '30 days maximum',
    limitations: 'Must demonstrate compelling legitimate grounds. Cannot object to processing required for contract performance.',
    emailSubject: 'Processing Objection - [Your Name]'
  }
];

export const RightsMatrix: React.FC = () => {
  const handleRightRequest = (emailSubject: string, rightName: string) => {
    const email = 'dpo@recovery-office.com';
    const body = `Dear Data Protection Officer,

I am writing to exercise my ${rightName} under UK GDPR.

Client Details:
- Full Name: [Your Full Name]
- Email: [Your Email Address]
- Phone: [Your Phone Number]
- Case Reference (if applicable): [Reference Number]

Request Details:
[Please describe your specific request here]

Identity Verification:
I have attached/will provide the following identity verification documents:
- [List verification documents]

I understand this request will be processed within 30 days as required by UK GDPR.

Thank you for your assistance.

Best regards,
[Your Name]`;

    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink, '_blank');
  };

  return (
    <RightsContainer>
      <h3 style={{ color: PREMIUM_COLORS.primary, fontSize: '1.5rem', marginBottom: `${PREMIUM_SPACING.lg}px` }}>
        Your Data Protection Rights Under UK GDPR
      </h3>
      
      <RightsTable>
        <thead>
          <tr>
            <th>Right</th>
            <th>Description</th>
            <th>How to Exercise</th>
            <th>Response Time</th>
            <th>Limitations</th>
          </tr>
        </thead>
        <tbody>
          {dataRights.map((right, index) => (
            <tr key={index}>
              <td>
                <RightName>{right.name}</RightName>
                <ArticleReference>{right.article}</ArticleReference>
              </td>
              
              <td>
                {right.description}
              </td>
              
              <td>
                <HowToExercise>
                  <strong>Process:</strong><br />
                  {right.howToExercise}
                </HowToExercise>
                <ExerciseButton 
                  onClick={() => handleRightRequest(right.emailSubject, right.name)}
                >
                  Exercise This Right
                </ExerciseButton>
              </td>
              
              <td>
                <ResponseTime>
                  {right.responseTime}
                </ResponseTime>
              </td>
              
              <td>
                <Limitations>
                  <strong>Important:</strong><br />
                  {right.limitations}
                </Limitations>
              </td>
            </tr>
          ))}
        </tbody>
      </RightsTable>
      
      <div style={{ 
        background: PREMIUM_COLORS.highlight, 
        padding: `${PREMIUM_SPACING.lg}px`, 
        borderRadius: '8px',
        marginTop: `${PREMIUM_SPACING.xl}px`,
        borderLeft: `4px solid ${PREMIUM_COLORS.secondary}`
      }}>
        <h4 style={{ color: PREMIUM_COLORS.primary, marginTop: 0 }}>
          Important Notes About Your Rights
        </h4>
        <ul style={{ margin: 0, paddingLeft: `${PREMIUM_SPACING.lg}px` }}>
          <li style={{ marginBottom: `${PREMIUM_SPACING.sm}px` }}>
            <strong>Identity Verification:</strong> For security, we require identity verification for all data protection requests
          </li>
          <li style={{ marginBottom: `${PREMIUM_SPACING.sm}px` }}>
            <strong>Response Time:</strong> We will acknowledge your request within 48 hours and respond within 30 days
          </li>
          <li style={{ marginBottom: `${PREMIUM_SPACING.sm}px` }}>
            <strong>Complex Requests:</strong> May require additional time (up to 60 days) with notification
          </li>
          <li style={{ marginBottom: `${PREMIUM_SPACING.sm}px` }}>
            <strong>Right to Complain:</strong> You can lodge complaints with the ICO at{' '}
            <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" style={{ color: PREMIUM_COLORS.primary }}>
              ico.org.uk
            </a>{' '}
            or call 0303 123 1113
          </li>
        </ul>
      </div>
    </RightsContainer>
  );
}; 