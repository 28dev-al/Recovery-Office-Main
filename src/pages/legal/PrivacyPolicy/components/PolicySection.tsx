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
  text: '#2d3748',
  border: '#e2e8f0'
};

const TYPOGRAPHY = {
  sizes: {
    xl: '1.25rem',
    xxl: '1.5rem'
  },
  weights: {
    semibold: 600
  }
};

const SectionContainer = styled.section`
  margin-bottom: ${PREMIUM_SPACING.xxxl}px;
  scroll-margin-top: ${PREMIUM_SPACING.xxl}px; /* For smooth scrolling anchor links */

  @media print {
    page-break-inside: avoid;
    margin-bottom: ${PREMIUM_SPACING.xl}px;
  }
`;

const SectionHeader = styled.h2`
  color: ${PREMIUM_COLORS.primary};
  font-size: ${TYPOGRAPHY.sizes.xxl};
  font-weight: ${TYPOGRAPHY.weights.semibold};
  margin: ${PREMIUM_SPACING.xxxl}px 0 ${PREMIUM_SPACING.xl}px 0;
  border-bottom: 2px solid ${PREMIUM_COLORS.secondary};
  padding-bottom: ${PREMIUM_SPACING.sm}px;

  @media (max-width: 768px) {
    font-size: ${TYPOGRAPHY.sizes.xl};
    margin: ${PREMIUM_SPACING.xxl}px 0 ${PREMIUM_SPACING.lg}px 0;
  }

  @media print {
    color: black;
    border-bottom: 1px solid black;
  }
`;

const SectionContent = styled.div`
  line-height: 1.7;

  p {
    margin-bottom: ${PREMIUM_SPACING.lg}px;
    color: ${PREMIUM_COLORS.text};
  }

  p:last-child {
    margin-bottom: 0;
  }

  ul, ol {
    margin: ${PREMIUM_SPACING.lg}px 0;
    padding-left: ${PREMIUM_SPACING.xl}px;
  }

  li {
    margin-bottom: ${PREMIUM_SPACING.md}px;
    color: ${PREMIUM_COLORS.text};
  }

  h3 {
    color: ${PREMIUM_COLORS.primary};
    font-size: ${TYPOGRAPHY.sizes.xl};
    margin: ${PREMIUM_SPACING.xl}px 0 ${PREMIUM_SPACING.lg}px 0;
  }

  h4 {
    color: ${PREMIUM_COLORS.primary};
    margin: ${PREMIUM_SPACING.lg}px 0 ${PREMIUM_SPACING.md}px 0;
  }

  strong {
    color: ${PREMIUM_COLORS.primary};
    font-weight: ${TYPOGRAPHY.weights.semibold};
  }

  a {
    color: ${PREMIUM_COLORS.primary};
    text-decoration: underline;

    &:hover {
      color: ${PREMIUM_COLORS.secondary};
    }
  }

  @media print {
    p, li, h3, h4, strong {
      color: black;
    }

    a {
      color: black;
      text-decoration: underline;
    }
  }
`;

interface PolicySectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
}

export const PolicySection: React.FC<PolicySectionProps> = ({ 
  id, 
  title, 
  children 
}) => {
  return (
    <SectionContainer id={id}>
      <SectionHeader>{title}</SectionHeader>
      <SectionContent>
        {children}
      </SectionContent>
    </SectionContainer>
  );
}; 