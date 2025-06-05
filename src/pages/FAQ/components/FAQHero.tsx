import React from 'react';
import styled from 'styled-components';
import { FAQSearchBar } from './FAQSearchBar';

// Import design system tokens
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
  text: '#2d3748',
  textLight: '#4a5568',
  white: '#ffffff'
};

const TYPOGRAPHY = {
  sizes: {
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    xxl: '1.5rem',
    xxxl: '2rem',
    xxxxl: '2.5rem'
  },
  weights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700
  }
};

const HeroContainer = styled.section`
  background: linear-gradient(135deg, ${PREMIUM_COLORS.primary} 0%, #2c5282 100%);
  color: ${PREMIUM_COLORS.white};
  padding: ${PREMIUM_SPACING.xxxl}px ${PREMIUM_SPACING.lg}px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M30 30c0-11.046 8.954-20 20-20s20 8.954 20 20-8.954 20-20 20-20-8.954-20-20zm0-30C13.431 0 0 13.431 0 30s13.431 30 30 30 30-13.431 30-30S46.569 0 30 0z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") repeat;
    pointer-events: none;
  }

  @media (max-width: 768px) {
    padding: ${PREMIUM_SPACING.xxl}px ${PREMIUM_SPACING.md}px;
  }
`;

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
  position: relative;
  z-index: 1;
`;

const HeroTitle = styled.h1`
  font-size: ${TYPOGRAPHY.sizes.xxxxl};
  font-weight: ${TYPOGRAPHY.weights.bold};
  margin-bottom: ${PREMIUM_SPACING.lg}px;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: ${TYPOGRAPHY.sizes.xxxl};
  }
`;

const HeroSubtitle = styled.p`
  font-size: ${TYPOGRAPHY.sizes.xl};
  font-weight: ${TYPOGRAPHY.weights.medium};
  margin-bottom: ${PREMIUM_SPACING.md}px;
  opacity: 0.9;

  @media (max-width: 768px) {
    font-size: ${TYPOGRAPHY.sizes.lg};
  }
`;

const HeroDescription = styled.p`
  font-size: ${TYPOGRAPHY.sizes.lg};
  line-height: 1.6;
  margin-bottom: ${PREMIUM_SPACING.xxl}px;
  opacity: 0.8;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    font-size: ${TYPOGRAPHY.sizes.md};
    margin-bottom: ${PREMIUM_SPACING.xl}px;
  }
`;

const HeroActions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${PREMIUM_SPACING.lg}px;
  margin-bottom: ${PREMIUM_SPACING.xxl}px;

  @media (max-width: 768px) {
    gap: ${PREMIUM_SPACING.md}px;
    margin-bottom: ${PREMIUM_SPACING.xl}px;
  }
`;

const ConsultationButton = styled.a`
  display: inline-flex;
  align-items: center;
  background: ${PREMIUM_COLORS.secondary};
  color: ${PREMIUM_COLORS.white};
  padding: ${PREMIUM_SPACING.md}px ${PREMIUM_SPACING.xl}px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: ${TYPOGRAPHY.weights.semibold};
  font-size: ${TYPOGRAPHY.sizes.lg};
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(214, 158, 46, 0.3);

  &:hover {
    background: #b7791f;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(214, 158, 46, 0.4);
  }

  &:focus {
    outline: 2px solid ${PREMIUM_COLORS.white};
    outline-offset: 2px;
  }
`;

const TrustIndicators = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${PREMIUM_SPACING.xl}px;
  max-width: 800px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: ${PREMIUM_SPACING.lg}px;
  }
`;

const Indicator = styled.div`
  text-align: center;
  padding: ${PREMIUM_SPACING.lg}px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  backdrop-filter: blur(10px);

  .indicator-value {
    font-size: ${TYPOGRAPHY.sizes.xxl};
    font-weight: ${TYPOGRAPHY.weights.bold};
    color: ${PREMIUM_COLORS.secondary};
    display: block;
    margin-bottom: ${PREMIUM_SPACING.sm}px;
  }

  .indicator-label {
    font-size: ${TYPOGRAPHY.sizes.md};
    opacity: 0.9;
  }
`;

interface FAQHeroProps {
  onSearch?: (query: string) => void;
}

export const FAQHero: React.FC<FAQHeroProps> = ({ onSearch }) => {
  return (
    <HeroContainer>
      <HeroContent>
        <HeroTitle>Frequently Asked Questions</HeroTitle>
        <HeroSubtitle>
          Expert guidance for complex financial asset recovery scenarios
        </HeroSubtitle>
        <HeroDescription>
          Get immediate answers to your questions about our premium consultation
          services, or schedule a confidential discussion with our specialists
          who have recovered over £500M in client assets.
        </HeroDescription>
        
        <HeroActions>
          <FAQSearchBar 
            placeholder="Search our knowledge base..."
            onSearch={onSearch}
          />
          <ConsultationButton href="/booking">
            Schedule Consultation
          </ConsultationButton>
        </HeroActions>

        <TrustIndicators>
          <Indicator>
            <span className="indicator-value">£500M+</span>
            <span className="indicator-label">Assets Recovered</span>
          </Indicator>
          <Indicator>
            <span className="indicator-value">98%</span>
            <span className="indicator-label">Client Satisfaction</span>
          </Indicator>
          <Indicator>
            <span className="indicator-value">24-Hour</span>
            <span className="indicator-label">Response Time</span>
          </Indicator>
        </TrustIndicators>
      </HeroContent>
    </HeroContainer>
  );
}; 