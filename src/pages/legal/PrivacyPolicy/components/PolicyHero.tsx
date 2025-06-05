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
  text: '#2d3748'
};

const HeroContainer = styled.div`
  background: linear-gradient(135deg, ${PREMIUM_COLORS.primary} 0%, #2c5282 100%);
  color: white;
  padding: ${PREMIUM_SPACING.xxxl}px ${PREMIUM_SPACING.xl}px;
  border-radius: 12px;
  margin-bottom: ${PREMIUM_SPACING.xxxl}px;
  text-align: center;

  @media (max-width: 768px) {
    padding: ${PREMIUM_SPACING.xxl}px ${PREMIUM_SPACING.lg}px;
  }
`;

const ProfessionalHeader = styled.div`
  margin-bottom: ${PREMIUM_SPACING.xl}px;

  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: ${PREMIUM_SPACING.md}px;
    color: white;

    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: #e2e8f0;
  font-weight: 500;
  margin-bottom: ${PREMIUM_SPACING.xl}px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    font-size: 1.125rem;
  }
`;

const CompanyCredentials = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${PREMIUM_SPACING.lg}px;
  margin-bottom: ${PREMIUM_SPACING.xl}px;
  background: rgba(255, 255, 255, 0.1);
  padding: ${PREMIUM_SPACING.xl}px;
  border-radius: 8px;
  backdrop-filter: blur(10px);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: ${PREMIUM_SPACING.md}px;
  }
`;

const Credential = styled.div`
  text-align: center;

  strong {
    display: block;
    color: ${PREMIUM_COLORS.secondary};
    font-size: 1.125rem;
    margin-bottom: ${PREMIUM_SPACING.xs}px;
  }

  span {
    color: #e2e8f0;
    font-size: 0.9rem;
  }
`;

const PolicyMetadata = styled.div`
  display: flex;
  justify-content: center;
  gap: ${PREMIUM_SPACING.lg}px;
  margin-bottom: ${PREMIUM_SPACING.xl}px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: ${PREMIUM_SPACING.md}px;
  }
`;

const MetadataItem = styled.div`
  text-align: center;
  font-size: 0.9rem;

  strong {
    color: ${PREMIUM_COLORS.secondary};
  }

  span {
    color: #e2e8f0;
  }
`;

const QuickActions = styled.div`
  display: flex;
  justify-content: center;
  gap: ${PREMIUM_SPACING.md}px;
  flex-wrap: wrap;
`;

const ActionButton = styled.a`
  background: ${PREMIUM_COLORS.secondary};
  color: ${PREMIUM_COLORS.primary};
  padding: ${PREMIUM_SPACING.md}px ${PREMIUM_SPACING.lg}px;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;

  &:hover {
    background: #b7791f;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(214, 158, 46, 0.3);
  }
`;

export const PolicyHero: React.FC = () => {
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const effectiveDate = new Date('2025-06-02');
  const nextReview = new Date('2025-12-01');

  return (
    <HeroContainer>
      <ProfessionalHeader>
        <h1>Privacy Policy & Data Protection Notice</h1>
        <Subtitle>
          Enterprise-Grade Protection for Your Financial Recovery Consultation
        </Subtitle>
        <CompanyCredentials>
          <Credential>
            <strong>Recovery Office Limited</strong>
            <span>UK Financial Asset Recovery Consultancy</span>
          </Credential>
          <Credential>
            <strong>Companies House:</strong>
            <span>14587923</span>
          </Credential>
          <Credential>
            <strong>ICO Registration:</strong>
            <span>ZB405891</span>
          </Credential>
        </CompanyCredentials>
      </ProfessionalHeader>

      <PolicyMetadata>
        <MetadataItem>
          <strong>Effective Date:</strong>
          <span> {formatDate(effectiveDate)}</span>
        </MetadataItem>
        <MetadataItem>
          <strong>Version:</strong>
          <span> 3.1</span>
        </MetadataItem>
        <MetadataItem>
          <strong>Next Review:</strong>
          <span> {formatDate(nextReview)}</span>
        </MetadataItem>
        <MetadataItem>
          <strong>Governing Law:</strong>
          <span> England and Wales</span>
        </MetadataItem>
      </PolicyMetadata>

      <QuickActions>
        <ActionButton href="#your-rights">Your Rights</ActionButton>
        <ActionButton href="#contact-dpo">Contact DPO</ActionButton>
        <ActionButton href="#data-request">Data Request</ActionButton>
      </QuickActions>
    </HeroContainer>
  );
}; 