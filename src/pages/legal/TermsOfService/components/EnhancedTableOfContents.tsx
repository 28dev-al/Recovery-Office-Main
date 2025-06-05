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

const TOCContainer = styled.nav`
  position: sticky;
  top: ${PREMIUM_SPACING.lg}px;
  background: white;
  border: 2px solid ${PREMIUM_COLORS.border};
  border-radius: 12px;
  padding: ${PREMIUM_SPACING.xl}px;
  margin-bottom: ${PREMIUM_SPACING.xxxl}px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  max-height: calc(100vh - ${PREMIUM_SPACING.xxl}px);
  overflow-y: auto;

  h3 {
    color: ${PREMIUM_COLORS.primary};
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: ${PREMIUM_SPACING.lg}px;
    margin-top: 0;
    text-align: center;
    border-bottom: 2px solid ${PREMIUM_COLORS.secondary};
    padding-bottom: ${PREMIUM_SPACING.sm}px;
  }

  @media (max-width: 1024px) {
    position: static;
    max-height: none;
    margin-bottom: ${PREMIUM_SPACING.xl}px;
  }

  @media print {
    page-break-inside: avoid;
    position: static;
  }
`;

const TOCDescription = styled.p`
  color: ${PREMIUM_COLORS.text};
  font-size: 0.9rem;
  text-align: center;
  margin-bottom: ${PREMIUM_SPACING.lg}px;
  margin-top: 0;
  font-style: italic;
`;

const TOCList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${PREMIUM_SPACING.md}px;
`;

const TOCSection = styled.div`
  background: ${PREMIUM_COLORS.highlight};
  border-radius: 8px;
  padding: ${PREMIUM_SPACING.lg}px;
  transition: all 0.3s ease;

  &:hover {
    background: ${PREMIUM_COLORS.border};
    transform: translateX(4px);
  }
`;

const TOCLink = styled.button`
  display: block;
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  color: ${PREMIUM_COLORS.primary};
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: ${PREMIUM_SPACING.md}px;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;

  &:hover {
    color: ${PREMIUM_COLORS.secondary};
  }

  &:focus {
    outline: 2px solid ${PREMIUM_COLORS.secondary};
    outline-offset: 2px;
  }
`;

const TOCSublinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${PREMIUM_SPACING.xs}px;
  margin-left: ${PREMIUM_SPACING.md}px;
`;

const TOCSublink = styled.button`
  display: block;
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  color: ${PREMIUM_COLORS.text};
  font-size: 0.875rem;
  padding: ${PREMIUM_SPACING.xs}px 0;
  cursor: pointer;
  transition: all 0.3s ease;
  border-left: 2px solid transparent;
  padding-left: ${PREMIUM_SPACING.sm}px;

  &:hover {
    color: ${PREMIUM_COLORS.secondary};
    border-left-color: ${PREMIUM_COLORS.secondary};
    padding-left: ${PREMIUM_SPACING.md}px;
  }

  &:focus {
    outline: 2px solid ${PREMIUM_COLORS.secondary};
    outline-offset: 2px;
  }
`;

interface TOCItem {
  id: string;
  title: string;
  subsections: Array<{
    id: string;
    title: string;
  }>;
}

const tableOfContents: TOCItem[] = [
  {
    id: 'service-provider',
    title: '1. Service Provider Information',
    subsections: [
      { id: 'company-details', title: 'Company Details & Registration' },
      { id: 'professional-credentials', title: 'Professional Credentials' }
    ]
  },
  {
    id: 'consultation-services',
    title: '2. Consultation Services',
    subsections: [
      { id: 'service-definitions', title: 'Service Definitions & Deliverables' },
      { id: 'service-levels', title: 'Service Level Commitments' }
    ]
  },
  {
    id: 'fees-payment',
    title: '3. Fees & Payment Terms',
    subsections: [
      { id: 'consultation-fees', title: 'Consultation Fee Structure' },
      { id: 'payment-schedule', title: 'Payment Terms & Conditions' },
      { id: 'refund-policy', title: 'Refund Policy & Cancellation' }
    ]
  },
  {
    id: 'professional-standards',
    title: '4. Professional Standards',
    subsections: [
      { id: 'confidentiality', title: 'Confidentiality Standards' },
      { id: 'professional-conduct', title: 'Professional Conduct' },
      { id: 'limitations', title: 'Service Limitations & Scope' }
    ]
  },
  {
    id: 'liability-protection',
    title: '5. Liability & Protection',
    subsections: [
      { id: 'limitation-liability', title: 'Limitation of Liability' },
      { id: 'professional-indemnity', title: 'Professional Indemnity' },
      { id: 'client-responsibilities', title: 'Client Responsibilities' }
    ]
  },
  {
    id: 'dispute-resolution',
    title: '6. Dispute Resolution',
    subsections: [
      { id: 'escalation-process', title: 'Escalation Process' },
      { id: 'mediation-arbitration', title: 'Mediation & Arbitration' },
      { id: 'jurisdiction', title: 'Jurisdiction & Governing Law' }
    ]
  }
];

export const EnhancedTableOfContents: React.FC = () => {
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
      <h3>Document Navigation</h3>
      <TOCDescription>
        Click any section to jump directly to that content
      </TOCDescription>
      
      <TOCList>
        {tableOfContents.map((section) => (
          <TOCSection key={section.id}>
            <TOCLink onClick={() => scrollToSection(section.id)}>
              {section.title}
            </TOCLink>
            <TOCSublinks>
              {section.subsections.map((subsection) => (
                <TOCSublink 
                  key={subsection.id}
                  onClick={() => scrollToSection(subsection.id)}
                >
                  {subsection.title}
                </TOCSublink>
              ))}
            </TOCSublinks>
          </TOCSection>
        ))}
      </TOCList>
    </TOCContainer>
  );
}; 