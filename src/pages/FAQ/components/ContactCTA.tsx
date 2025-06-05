import React from 'react';
import styled from 'styled-components';

// Import design system tokens
const PREMIUM_SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48
};

const PREMIUM_COLORS = {
  primary: '#1a365d',
  secondary: '#d69e2e',
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
    xxxl: '2rem'
  },
  weights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700
  }
};

const CTAContainer = styled.section`
  background: linear-gradient(135deg, ${PREMIUM_COLORS.primary} 0%, #2c5282 100%);
  border-radius: 20px;
  padding: ${PREMIUM_SPACING.xxl}px ${PREMIUM_SPACING.xl}px;
  text-align: center;
  color: ${PREMIUM_COLORS.white};
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
    padding: ${PREMIUM_SPACING.xl}px ${PREMIUM_SPACING.lg}px;
    border-radius: 16px;
  }
`;

const CTAContent = styled.div`
  position: relative;
  z-index: 1;
  max-width: 800px;
  margin: 0 auto;
`;

const CTABadge = styled.div`
  display: inline-block;
  background: ${PREMIUM_COLORS.secondary};
  color: ${PREMIUM_COLORS.white};
  padding: ${PREMIUM_SPACING.sm}px ${PREMIUM_SPACING.lg}px;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: ${TYPOGRAPHY.weights.semibold};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: ${PREMIUM_SPACING.lg}px;
`;

const CTATitle = styled.h2`
  font-size: ${TYPOGRAPHY.sizes.xxxl};
  font-weight: ${TYPOGRAPHY.weights.bold};
  margin-bottom: ${PREMIUM_SPACING.lg}px;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: ${TYPOGRAPHY.sizes.xxl};
  }
`;

const CTADescription = styled.p`
  font-size: ${TYPOGRAPHY.sizes.lg};
  line-height: 1.6;
  margin-bottom: ${PREMIUM_SPACING.xl}px;
  opacity: 0.9;

  @media (max-width: 768px) {
    font-size: ${TYPOGRAPHY.sizes.md};
    margin-bottom: ${PREMIUM_SPACING.lg}px;
  }
`;

const CTAButtons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${PREMIUM_SPACING.lg}px;
  margin-bottom: ${PREMIUM_SPACING.xl}px;

  @media (min-width: 640px) {
    flex-direction: row;
    justify-content: center;
  }

  @media (max-width: 768px) {
    gap: ${PREMIUM_SPACING.md}px;
    margin-bottom: ${PREMIUM_SPACING.lg}px;
  }
`;

const PrimaryButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: ${PREMIUM_COLORS.secondary};
  color: ${PREMIUM_COLORS.white};
  padding: ${PREMIUM_SPACING.lg}px ${PREMIUM_SPACING.xl}px;
  border-radius: 12px;
  text-decoration: none;
  font-weight: ${TYPOGRAPHY.weights.semibold};
  font-size: ${TYPOGRAPHY.sizes.lg};
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px rgba(214, 158, 46, 0.3);
  min-width: 200px;

  &:hover {
    background: #b7791f;
    transform: translateY(-2px);
    box-shadow: 0 6px 24px rgba(214, 158, 46, 0.4);
  }

  &:focus {
    outline: 2px solid ${PREMIUM_COLORS.white};
    outline-offset: 2px;
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 300px;
  }
`;

const SecondaryButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  color: ${PREMIUM_COLORS.white};
  border: 2px solid rgba(255, 255, 255, 0.3);
  padding: ${PREMIUM_SPACING.lg}px ${PREMIUM_SPACING.xl}px;
  border-radius: 12px;
  text-decoration: none;
  font-weight: ${TYPOGRAPHY.weights.semibold};
  font-size: ${TYPOGRAPHY.sizes.lg};
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  min-width: 200px;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.5);
    transform: translateY(-2px);
  }

  &:focus {
    outline: 2px solid ${PREMIUM_COLORS.white};
    outline-offset: 2px;
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 300px;
  }
`;

const CTAFooter = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${PREMIUM_SPACING.xl}px;
  text-align: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: ${PREMIUM_SPACING.lg}px;
  }
`;

const FooterItem = styled.div`
  .footer-value {
    font-size: ${TYPOGRAPHY.sizes.xl};
    font-weight: ${TYPOGRAPHY.weights.bold};
    color: ${PREMIUM_COLORS.secondary};
    display: block;
    margin-bottom: ${PREMIUM_SPACING.xs}px;
  }

  .footer-label {
    font-size: ${TYPOGRAPHY.sizes.md};
    opacity: 0.8;
  }

  @media (max-width: 768px) {
    .footer-value {
      font-size: ${TYPOGRAPHY.sizes.lg};
    }

    .footer-label {
      font-size: ${TYPOGRAPHY.sizes.sm};
    }
  }
`;

export const ContactCTA: React.FC = () => {
  return (
    <CTAContainer>
      <CTAContent>
        <CTABadge>Expert Consultation Available</CTABadge>
        
        <CTATitle>
          Still Have Questions About Your Case?
        </CTATitle>
        
        <CTADescription>
          Our senior recovery specialists are ready to provide personalized guidance 
          for your specific situation. Get expert assessment, strategy recommendations, 
          and a clear path forward in your asset recovery journey.
        </CTADescription>
        
        <CTAButtons>
          <PrimaryButton href="/booking">
            Schedule Consultation - £2,500
          </PrimaryButton>
          <SecondaryButton href="/contact">
            Contact Our Team
          </SecondaryButton>
        </CTAButtons>
        
        <CTAFooter>
          <FooterItem>
            <span className="footer-value">90-120 min</span>
            <span className="footer-label">Expert Consultation</span>
          </FooterItem>
          <FooterItem>
            <span className="footer-value">5 Days</span>
            <span className="footer-label">Written Assessment</span>
          </FooterItem>
          <FooterItem>
            <span className="footer-value">24 Hours</span>
            <span className="footer-label">Response Time</span>
          </FooterItem>
        </CTAFooter>
      </CTAContent>
    </CTAContainer>
  );
}; 