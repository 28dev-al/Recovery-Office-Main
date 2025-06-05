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
  border: '#e2e8f0',
  white: '#ffffff',
  highlight: '#edf2f7'
};

const TYPOGRAPHY = {
  sizes: {
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    xxl: '1.5rem'
  },
  weights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700
  }
};

const ResourcesContainer = styled.section`
  background: ${PREMIUM_COLORS.highlight};
  border-radius: 16px;
  padding: ${PREMIUM_SPACING.xxl}px ${PREMIUM_SPACING.xl}px;

  @media (max-width: 768px) {
    padding: ${PREMIUM_SPACING.xl}px ${PREMIUM_SPACING.lg}px;
    border-radius: 12px;
  }
`;

const ResourcesHeader = styled.div`
  text-align: center;
  margin-bottom: ${PREMIUM_SPACING.xxl}px;

  @media (max-width: 768px) {
    margin-bottom: ${PREMIUM_SPACING.xl}px;
  }
`;

const ResourcesTitle = styled.h2`
  font-size: ${TYPOGRAPHY.sizes.xxl};
  font-weight: ${TYPOGRAPHY.weights.bold};
  color: ${PREMIUM_COLORS.primary};
  margin-bottom: ${PREMIUM_SPACING.md}px;

  @media (max-width: 768px) {
    font-size: ${TYPOGRAPHY.sizes.xl};
  }
`;

const ResourcesSubtitle = styled.p`
  font-size: ${TYPOGRAPHY.sizes.lg};
  color: ${PREMIUM_COLORS.textLight};
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto;

  @media (max-width: 768px) {
    font-size: ${TYPOGRAPHY.sizes.md};
  }
`;

const ResourcesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${PREMIUM_SPACING.xl}px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: ${PREMIUM_SPACING.lg}px;
  }
`;

const ResourceCard = styled.a`
  background: ${PREMIUM_COLORS.white};
  border: 1px solid ${PREMIUM_COLORS.border};
  border-radius: 12px;
  padding: ${PREMIUM_SPACING.xl}px;
  text-decoration: none;
  transition: all 0.3s ease;
  display: block;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    border-color: ${PREMIUM_COLORS.secondary};
  }

  &:focus {
    outline: 2px solid ${PREMIUM_COLORS.secondary};
    outline-offset: 2px;
  }
`;

const ResourceIcon = styled.div`
  width: 48px;
  height: 48px;
  background: ${PREMIUM_COLORS.secondary}15;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  margin-bottom: ${PREMIUM_SPACING.lg}px;
`;

const ResourceTitle = styled.h3`
  font-size: ${TYPOGRAPHY.sizes.lg};
  font-weight: ${TYPOGRAPHY.weights.semibold};
  color: ${PREMIUM_COLORS.primary};
  margin-bottom: ${PREMIUM_SPACING.sm}px;
  line-height: 1.3;
`;

const ResourceDescription = styled.p`
  font-size: ${TYPOGRAPHY.sizes.md};
  color: ${PREMIUM_COLORS.textLight};
  line-height: 1.5;
  margin-bottom: ${PREMIUM_SPACING.lg}px;
`;

const ResourceCTA = styled.div`
  display: flex;
  align-items: center;
  color: ${PREMIUM_COLORS.secondary};
  font-weight: ${TYPOGRAPHY.weights.medium};
  font-size: ${TYPOGRAPHY.sizes.md};

  .cta-arrow {
    margin-left: ${PREMIUM_SPACING.sm}px;
    transition: transform 0.3s ease;
  }

  ${ResourceCard}:hover & .cta-arrow {
    transform: translateX(4px);
  }
`;

const resources = [
  {
    id: 'services',
    icon: '🔍',
    title: 'Our Services',
    description: 'Explore our comprehensive financial asset recovery services including cryptocurrency, investment fraud, and international recovery.',
    href: '/services',
    cta: 'View Services'
  },
  {
    id: 'about',
    icon: '👥',
    title: 'About Recovery Office',
    description: 'Learn about our expert team, proven methodology, and track record in recovering assets for high-net-worth individuals.',
    href: '/about',
    cta: 'Learn More'
  },
  {
    id: 'booking',
    icon: '📅',
    title: 'Book Consultation',
    description: 'Schedule your £2,500 expert consultation to get personalized guidance on your specific financial recovery case.',
    href: '/booking',
    cta: 'Schedule Now'
  },
  {
    id: 'contact',
    icon: '💬',
    title: 'Contact Us',
    description: 'Get in touch with our team for general inquiries, urgent matters, or to discuss your case confidentially.',
    href: '/contact',
    cta: 'Contact Team'
  },
  {
    id: 'data-security',
    icon: '🔒',
    title: 'Security Standards',
    description: 'Review our enterprise-grade data security measures and compliance frameworks that protect your information.',
    href: '/data-security',
    cta: 'Security Info'
  },
  {
    id: 'privacy',
    icon: '📋',
    title: 'Privacy Policy',
    description: 'Understand how we collect, use, and protect your personal and financial information in compliance with UK GDPR.',
    href: '/privacy-policy',
    cta: 'Read Policy'
  }
];

export const RelatedResources: React.FC = () => {
  return (
    <ResourcesContainer>
      <ResourcesHeader>
        <ResourcesTitle>Related Resources</ResourcesTitle>
        <ResourcesSubtitle>
          Explore additional information about our services, team, and approach to 
          financial asset recovery consultation.
        </ResourcesSubtitle>
      </ResourcesHeader>
      
      <ResourcesGrid>
        {resources.map((resource) => (
          <ResourceCard 
            key={resource.id} 
            href={resource.href}
            aria-label={`Learn more about ${resource.title}`}
          >
            <ResourceIcon>{resource.icon}</ResourceIcon>
            <ResourceTitle>{resource.title}</ResourceTitle>
            <ResourceDescription>{resource.description}</ResourceDescription>
            <ResourceCTA>
              <span>{resource.cta}</span>
              <span className="cta-arrow">→</span>
            </ResourceCTA>
          </ResourceCard>
        ))}
      </ResourcesGrid>
    </ResourcesContainer>
  );
}; 