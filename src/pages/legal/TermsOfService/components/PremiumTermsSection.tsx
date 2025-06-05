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

const SectionContainer = styled.section`
  margin-bottom: ${PREMIUM_SPACING.xxxl}px;
  scroll-margin-top: ${PREMIUM_SPACING.xl}px;

  &:last-child {
    margin-bottom: 0;
  }

  @media print {
    page-break-inside: avoid;
    margin-bottom: ${PREMIUM_SPACING.xl}px;
  }
`;

const SectionTitle = styled.h2`
  color: ${PREMIUM_COLORS.primary};
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 ${PREMIUM_SPACING.lg}px 0;
  padding-bottom: ${PREMIUM_SPACING.sm}px;
  border-bottom: 3px solid ${PREMIUM_COLORS.secondary};
  line-height: 1.3;

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const SectionContent = styled.div`
  color: ${PREMIUM_COLORS.text};
  
  > p:first-of-type {
    font-size: 1.1rem;
    line-height: 1.6;
    margin-bottom: ${PREMIUM_SPACING.xl}px;
    color: ${PREMIUM_COLORS.text};
  }
`;

interface PremiumTermsSectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
}

export const PremiumTermsSection: React.FC<PremiumTermsSectionProps> = ({
  id,
  title,
  children
}) => {
  return (
    <SectionContainer id={id}>
      <SectionTitle>{title}</SectionTitle>
      <SectionContent>
        {children}
      </SectionContent>
    </SectionContainer>
  );
}; 