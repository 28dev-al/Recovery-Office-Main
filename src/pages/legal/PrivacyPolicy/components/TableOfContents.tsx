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
  highlight: '#edf2f7'
};

const TOCContainer = styled.nav`
  background: ${PREMIUM_COLORS.highlight};
  border: 2px solid ${PREMIUM_COLORS.border};
  border-radius: 12px;
  padding: ${PREMIUM_SPACING.xl}px;
  margin-bottom: ${PREMIUM_SPACING.xxxl}px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

  h3 {
    color: ${PREMIUM_COLORS.primary};
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: ${PREMIUM_SPACING.lg}px;
    margin-top: 0;
    text-align: center;
  }

  @media print {
    page-break-inside: avoid;
  }
`;

const TOCGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${PREMIUM_SPACING.lg}px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const TOCSection = styled.div`
  background: white;
  border-radius: 8px;
  padding: ${PREMIUM_SPACING.lg}px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.button`
  display: block;
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  color: ${PREMIUM_COLORS.primary};
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: ${PREMIUM_SPACING.md}px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    color: ${PREMIUM_COLORS.secondary};
    transform: translateX(4px);
  }

  &:focus {
    outline: 2px solid ${PREMIUM_COLORS.secondary};
    outline-offset: 2px;
  }
`;

const SubsectionList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const SubsectionItem = styled.li`
  margin-bottom: ${PREMIUM_SPACING.xs}px;
`;

const SubsectionLink = styled.button`
  display: block;
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  color: #4a5568;
  font-size: 0.9rem;
  padding: ${PREMIUM_SPACING.xs}px 0 ${PREMIUM_SPACING.xs}px ${PREMIUM_SPACING.md}px;
  cursor: pointer;
  transition: all 0.3s ease;
  border-left: 2px solid transparent;

  &:hover {
    color: ${PREMIUM_COLORS.secondary};
    border-left-color: ${PREMIUM_COLORS.secondary};
    padding-left: ${PREMIUM_SPACING.lg}px;
  }

  &:focus {
    outline: 2px solid ${PREMIUM_COLORS.secondary};
    outline-offset: 2px;
  }
`;

interface TOCItem {
  id: string;
  title: string;
  subsections: string[];
}

const tableOfContents: TOCItem[] = [
  {
    id: 'company-information',
    title: '1. Data Controller Information',
    subsections: [
      'Company Details',
      'Registration Information', 
      'Contact Details',
      'Data Protection Officer'
    ]
  },
  {
    id: 'data-collection',
    title: '2. Information We Collect',
    subsections: [
      'Consultation Data',
      'Financial Information',
      'Technical Data',
      'Communication Records'
    ]
  },
  {
    id: 'legal-basis',
    title: '3. Legal Basis for Processing',
    subsections: [
      'Contract Performance',
      'Legal Obligations',
      'Legitimate Interests',
      'Consent-Based Processing'
    ]
  },
  {
    id: 'data-usage',
    title: '4. How We Use Your Information',
    subsections: [
      'Consultation Delivery',
      'Case Management',
      'Communication',
      'Legal Compliance'
    ]
  },
  {
    id: 'data-sharing',
    title: '5. Data Sharing & Third Parties',
    subsections: [
      'No Sale Policy',
      'Professional Partners',
      'Legal Requirements',
      'International Transfers'
    ]
  },
  {
    id: 'security-measures',
    title: '6. Enterprise Security Standards',
    subsections: [
      'Technical Safeguards',
      'Organizational Measures',
      'Access Controls',
      'Incident Response'
    ]
  },
  {
    id: 'data-retention',
    title: '7. Data Retention Schedule',
    subsections: [
      'Consultation Records',
      'Financial Documentation',
      'Technical Logs',
      'Legal Hold Procedures'
    ]
  },
  {
    id: 'your-rights',
    title: '8. Your Rights Under UK GDPR',
    subsections: [
      'Access Rights',
      'Rectification',
      'Erasure',
      'Data Portability'
    ]
  },
  {
    id: 'professional-standards',
    title: '9. Professional Confidentiality',
    subsections: [
      'Enhanced Confidentiality',
      'Professional Privilege',
      'Conflict Management',
      'Ethical Standards'
    ]
  },
  {
    id: 'contact-information',
    title: '10. Contact & Complaints',
    subsections: [
      'Data Protection Team',
      'Request Procedures',
      'ICO Complaints',
      'Resolution Process'
    ]
  }
];

export const TableOfContents: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });
    }
  };

  return (
    <TOCContainer>
      <h3>Privacy Policy Navigation</h3>
      <TOCGrid>
        {tableOfContents.map((section) => (
          <TOCSection key={section.id}>
            <SectionTitle onClick={() => scrollToSection(section.id)}>
              {section.title}
            </SectionTitle>
            <SubsectionList>
              {section.subsections.map((subsection, index) => (
                <SubsectionItem key={index}>
                  <SubsectionLink 
                    onClick={() => scrollToSection(section.id)}
                  >
                    {subsection}
                  </SubsectionLink>
                </SubsectionItem>
              ))}
            </SubsectionList>
          </TOCSection>
        ))}
      </TOCGrid>
    </TOCContainer>
  );
}; 