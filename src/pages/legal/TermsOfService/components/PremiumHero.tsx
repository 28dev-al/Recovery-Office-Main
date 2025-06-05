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

const HeroContainer = styled.section`
  background: linear-gradient(135deg, ${PREMIUM_COLORS.primary} 0%, #2c5282 100%);
  color: white;
  padding: ${PREMIUM_SPACING.xxxl}px ${PREMIUM_SPACING.lg}px;
  text-align: center;

  @media (max-width: 768px) {
    padding: ${PREMIUM_SPACING.xxl}px ${PREMIUM_SPACING.lg}px;
  }
`;

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;

  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: ${PREMIUM_SPACING.md}px;
    color: white;
    letter-spacing: -0.02em;

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

const DocumentMeta = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${PREMIUM_SPACING.lg}px;
  margin-bottom: ${PREMIUM_SPACING.xl}px;
  background: rgba(255, 255, 255, 0.1);
  padding: ${PREMIUM_SPACING.xl}px;
  border-radius: 12px;
  backdrop-filter: blur(10px);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: ${PREMIUM_SPACING.md}px;
  }
`;

const MetaItem = styled.div`
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

const ProfessionalNotice = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${PREMIUM_SPACING.lg}px;
  background: rgba(255, 255, 255, 0.1);
  padding: ${PREMIUM_SPACING.xl}px;
  border-radius: 12px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  text-align: left;
  max-width: 800px;
  margin: 0 auto;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: ${PREMIUM_SPACING.md}px;
    text-align: center;
  }
`;

const NoticeIcon = styled.div`
  font-size: 2rem;
  flex-shrink: 0;
  margin-top: ${PREMIUM_SPACING.xs}px;

  @media (max-width: 768px) {
    margin-top: 0;
  }
`;

const NoticeContent = styled.div`
  h3 {
    color: ${PREMIUM_COLORS.secondary};
    font-size: 1.25rem;
    font-weight: 600;
    margin: 0 0 ${PREMIUM_SPACING.md}px 0;
  }

  p {
    color: #e2e8f0;
    font-size: 1rem;
    line-height: 1.6;
    margin: 0;
  }
`;

export const PremiumHero: React.FC = () => {
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const effectiveDate = new Date('2025-06-02');

  return (
    <HeroContainer>
      <HeroContent>
        <h1>Terms of Service</h1>
        <Subtitle>
          Professional Asset Recovery Consultation Agreement
        </Subtitle>
        
        <DocumentMeta>
          <MetaItem>
            <strong>Effective Date:</strong>
            <span>{formatDate(effectiveDate)}</span>
          </MetaItem>
          <MetaItem>
            <strong>Version:</strong>
            <span>3.0</span>
          </MetaItem>
          <MetaItem>
            <strong>Document Type:</strong>
            <span>Professional Services Agreement</span>
          </MetaItem>
          <MetaItem>
            <strong>Governing Law:</strong>
            <span>England and Wales</span>
          </MetaItem>
        </DocumentMeta>

        <ProfessionalNotice>
          <NoticeIcon>⚖️</NoticeIcon>
          <NoticeContent>
            <h3>Important Legal Notice</h3>
            <p>
              By booking our consultation services, you agree to these comprehensive 
              terms. Please read carefully before proceeding with your booking. 
              This constitutes a legally binding agreement between you and Recovery Office Limited.
            </p>
          </NoticeContent>
        </ProfessionalNotice>
      </HeroContent>
    </HeroContainer>
  );
}; 