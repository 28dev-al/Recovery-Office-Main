import React from 'react';
import styled from 'styled-components';
import { FAQCategory } from '../types/faq.types';

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
  background: '#f7fafc',
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

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: ${PREMIUM_SPACING.xl}px;
  margin: ${PREMIUM_SPACING.xxl}px 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: ${PREMIUM_SPACING.lg}px;
    margin: ${PREMIUM_SPACING.xl}px 0;
  }
`;

const CategoryCard = styled.div<{ color: string }>`
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
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
    border-color: ${props => props.color};

    .category-icon {
      transform: scale(1.1);
    }
  }

  &:focus {
    outline: 2px solid ${props => props.color};
    outline-offset: 2px;
  }
`;

const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${PREMIUM_SPACING.lg}px;
`;

const CategoryIcon = styled.div<{ color: string }>`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: ${props => props.color}15;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${PREMIUM_SPACING.md}px;
  transition: transform 0.3s ease;
  font-size: 24px;

  &.category-icon {
    /* Target for hover animation */
  }
`;

const CategoryTitle = styled.h3`
  font-size: ${TYPOGRAPHY.sizes.xl};
  font-weight: ${TYPOGRAPHY.weights.semibold};
  color: ${PREMIUM_COLORS.primary};
  margin: 0;
  line-height: 1.3;
`;

const CategoryDescription = styled.p`
  font-size: ${TYPOGRAPHY.sizes.md};
  color: ${PREMIUM_COLORS.textLight};
  line-height: 1.5;
  margin-bottom: ${PREMIUM_SPACING.lg}px;
`;

const CategoryMetrics = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${PREMIUM_SPACING.md}px;
  margin-bottom: ${PREMIUM_SPACING.lg}px;
`;

const MetricItem = styled.div`
  text-align: center;
  padding: ${PREMIUM_SPACING.md}px;
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
    font-size: ${TYPOGRAPHY.sizes.sm};
    color: ${PREMIUM_COLORS.textLight};
  }
`;

const CategoryCTA = styled.div<{ color: string }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: ${PREMIUM_SPACING.md}px;
  border-top: 1px solid ${PREMIUM_COLORS.highlight};

  .cta-text {
    font-size: ${TYPOGRAPHY.sizes.md};
    font-weight: ${TYPOGRAPHY.weights.medium};
    color: ${props => props.color};
  }

  .cta-arrow {
    font-size: ${TYPOGRAPHY.sizes.lg};
    color: ${props => props.color};
    transition: transform 0.3s ease;
  }

  ${CategoryCard}:hover & .cta-arrow {
    transform: translateX(4px);
  }
`;

// Icon mapping for different categories
const CategoryIcons: Record<string, string> = {
  'consultation-process': '💼',
  'asset-types': '💎',
  'fees-payment': '💳',
  'success-rates': '📊',
  'legal-regulatory': '⚖️',
  'international-cases': '🌍'
};

interface FAQCategoryGridProps {
  categories: FAQCategory[];
  onCategorySelect: (categoryId: string) => void;
}

export const FAQCategoryGrid: React.FC<FAQCategoryGridProps> = ({
  categories,
  onCategorySelect
}) => {
  const handleCategoryClick = (categoryId: string) => {
    onCategorySelect(categoryId);
  };

  const handleKeyPress = (e: React.KeyboardEvent, categoryId: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onCategorySelect(categoryId);
    }
  };

  return (
    <CategoryGrid>
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          color={category.color}
          onClick={() => handleCategoryClick(category.id)}
          onKeyPress={(e) => handleKeyPress(e, category.id)}
          tabIndex={0}
          role="button"
          aria-label={`Browse ${category.title} questions`}
        >
          <CategoryHeader>
            <CategoryIcon color={category.color} className="category-icon">
              {CategoryIcons[category.id] || '📋'}
            </CategoryIcon>
            <CategoryTitle>{category.title}</CategoryTitle>
          </CategoryHeader>
          
          <CategoryDescription>
            {category.description}
          </CategoryDescription>
          
          <CategoryMetrics>
            <MetricItem>
              <span className="metric-value">{category.questionsCount}</span>
              <span className="metric-label">Questions</span>
            </MetricItem>
            <MetricItem>
              <span className="metric-value">{category.avgReadTime}</span>
              <span className="metric-label">Read Time</span>
            </MetricItem>
          </CategoryMetrics>
          
          <CategoryCTA color={category.color}>
            <span className="cta-text">Explore Questions</span>
            <span className="cta-arrow">→</span>
          </CategoryCTA>
        </CategoryCard>
      ))}
    </CategoryGrid>
  );
}; 