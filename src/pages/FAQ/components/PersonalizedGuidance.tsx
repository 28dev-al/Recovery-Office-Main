import React from 'react';
import styled from 'styled-components';
import { GuidancePath } from '../types/faq.types';

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
    xl: '1.25rem'
  },
  weights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700
  }
};

const GuidanceContainer = styled.div`
  margin: ${PREMIUM_SPACING.xxl}px 0;
`;

const GuidanceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: ${PREMIUM_SPACING.xl}px;
  margin-top: ${PREMIUM_SPACING.xl}px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: ${PREMIUM_SPACING.lg}px;
  }
`;

const GuidanceCard = styled.div<{ color: string }>`
  background: ${PREMIUM_COLORS.white};
  border: 2px solid ${PREMIUM_COLORS.border};
  border-radius: 16px;
  padding: ${PREMIUM_SPACING.xl}px;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${props => props.color};
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.12);
    border-color: ${props => props.color};
  }

  &:focus {
    outline: 2px solid ${props => props.color};
    outline-offset: 2px;
  }
`;

const PathHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${PREMIUM_SPACING.lg}px;
`;

const PathIcon = styled.div<{ color: string }>`
  width: 56px;
  height: 56px;
  border-radius: 16px;
  background: ${props => props.color}15;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${PREMIUM_SPACING.md}px;
  font-size: 28px;
`;

const PathContent = styled.div`
  flex: 1;
`;

const PathTitle = styled.h3`
  font-size: ${TYPOGRAPHY.sizes.xl};
  font-weight: ${TYPOGRAPHY.weights.semibold};
  color: ${PREMIUM_COLORS.primary};
  margin: 0 0 ${PREMIUM_SPACING.xs}px 0;
  line-height: 1.3;
`;

const PathSubtitle = styled.p`
  font-size: ${TYPOGRAPHY.sizes.sm};
  color: ${PREMIUM_COLORS.textLight};
  margin: 0;
  line-height: 1.4;
`;

const PathDescription = styled.p`
  font-size: ${TYPOGRAPHY.sizes.md};
  color: ${PREMIUM_COLORS.text};
  line-height: 1.5;
  margin-bottom: ${PREMIUM_SPACING.lg}px;
`;

const PathMetrics = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${PREMIUM_SPACING.md}px;
  margin-bottom: ${PREMIUM_SPACING.lg}px;
`;

const MetricItem = styled.div`
  text-align: center;
  padding: ${PREMIUM_SPACING.md}px ${PREMIUM_SPACING.sm}px;
  background: ${PREMIUM_COLORS.highlight};
  border-radius: 8px;

  .metric-value {
    font-size: ${TYPOGRAPHY.sizes.lg};
    font-weight: ${TYPOGRAPHY.weights.bold};
    color: ${PREMIUM_COLORS.primary};
    display: block;
    margin-bottom: ${PREMIUM_SPACING.xs}px;
  }

  .metric-label {
    font-size: 0.75rem;
    color: ${PREMIUM_COLORS.textLight};
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  @media (max-width: 768px) {
    padding: ${PREMIUM_SPACING.sm}px ${PREMIUM_SPACING.xs}px;

    .metric-value {
      font-size: ${TYPOGRAPHY.sizes.md};
    }

    .metric-label {
      font-size: 0.6875rem;
    }
  }
`;

const PathCTA = styled.div<{ color: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${PREMIUM_SPACING.md}px;
  background: ${props => props.color}10;
  border: 1px solid ${props => props.color}30;
  border-radius: 8px;
  color: ${props => props.color};
  font-weight: ${TYPOGRAPHY.weights.semibold};
  transition: all 0.3s ease;

  .cta-text {
    margin-right: ${PREMIUM_SPACING.sm}px;
  }

  .cta-arrow {
    transition: transform 0.3s ease;
  }

  ${GuidanceCard}:hover & {
    background: ${props => props.color}20;
    
    .cta-arrow {
      transform: translateX(4px);
    }
  }
`;

const pathIcons: Record<string, string> = {
  'investment-fraud': '📊',
  'cryptocurrency-losses': '₿',
  'romance-scams': '💔',
  'international-fraud': '🌍',
  'professional-negligence': '⚖️',
  'business-fraud': '🏢',
  'technical-recovery': '⚙️',
  'high-value-cases': '💎'
};

interface PersonalizedGuidanceProps {
  guidancePaths: GuidancePath[];
  onPathSelect: (pathId: string) => void;
}

export const PersonalizedGuidance: React.FC<PersonalizedGuidanceProps> = ({
  guidancePaths,
  onPathSelect
}) => {
  const handlePathClick = (pathId: string) => {
    // Map guidance path to corresponding FAQ category
    const categoryMapping: Record<string, string> = {
      'investment-fraud': 'asset-types',
      'cryptocurrency-losses': 'asset-types',
      'romance-scams': 'asset-types',
      'international-fraud': 'international-cases',
      'professional-negligence': 'legal-regulatory',
      'business-fraud': 'asset-types',
      'technical-recovery': 'asset-types',
      'high-value-cases': 'consultation-process'
    };

    const categoryId = categoryMapping[pathId] || 'consultation-process';
    onPathSelect(categoryId);
  };

  const handleKeyPress = (e: React.KeyboardEvent, pathId: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handlePathClick(pathId);
    }
  };

  return (
    <GuidanceContainer>
      <GuidanceGrid>
        {guidancePaths.map((path) => (
          <GuidanceCard
            key={path.id}
            color={path.color}
            onClick={() => handlePathClick(path.id)}
            onKeyPress={(e) => handleKeyPress(e, path.id)}
            tabIndex={0}
            role="button"
            aria-label={`Explore ${path.title} guidance`}
          >
            <PathHeader>
              <PathIcon color={path.color}>
                {pathIcons[path.id] || '📋'}
              </PathIcon>
              <PathContent>
                <PathTitle>{path.title}</PathTitle>
                <PathSubtitle>Success Rate: {path.successRate}</PathSubtitle>
              </PathContent>
            </PathHeader>
            
            <PathDescription>
              {path.description}
            </PathDescription>
            
            <PathMetrics>
              <MetricItem>
                <span className="metric-value">{path.questionsCount}</span>
                <span className="metric-label">Questions</span>
              </MetricItem>
              <MetricItem>
                <span className="metric-value">{path.avgConsultationTime}</span>
                <span className="metric-label">Avg Time</span>
              </MetricItem>
              <MetricItem>
                <span className="metric-value">{path.successRate}</span>
                <span className="metric-label">Success</span>
              </MetricItem>
            </PathMetrics>
            
            <PathCTA color={path.color}>
              <span className="cta-text">Explore Path</span>
              <span className="cta-arrow">→</span>
            </PathCTA>
          </GuidanceCard>
        ))}
      </GuidanceGrid>
    </GuidanceContainer>
  );
}; 