import React from 'react';
import styled from 'styled-components';
// import { BlogSearch } from './BlogSearch'; // TODO: Create BlogSearch component

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
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;

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

const SearchContainer = styled.div`
  max-width: 800px;
  margin: 0 auto ${PREMIUM_SPACING.xxl}px;
`;

const PopularTopics = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${PREMIUM_SPACING.md}px;
  margin-top: ${PREMIUM_SPACING.lg}px;

  @media (max-width: 768px) {
    gap: ${PREMIUM_SPACING.sm}px;
  }
`;

const TopicTag = styled.a`
  background: rgba(255, 255, 255, 0.15);
  color: ${PREMIUM_COLORS.white};
  padding: ${PREMIUM_SPACING.sm}px ${PREMIUM_SPACING.lg}px;
  border-radius: 20px;
  text-decoration: none;
  font-size: ${TYPOGRAPHY.sizes.md};
  font-weight: ${TYPOGRAPHY.weights.medium};
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);

  &:hover {
    background: rgba(255, 255, 255, 0.25);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  &:focus {
    outline: 2px solid ${PREMIUM_COLORS.secondary};
    outline-offset: 2px;
  }

  @media (max-width: 768px) {
    font-size: ${TYPOGRAPHY.sizes.sm};
    padding: ${PREMIUM_SPACING.sm}px ${PREMIUM_SPACING.md}px;
  }
`;

const TrustIndicators = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${PREMIUM_SPACING.xl}px;
  max-width: 900px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: ${PREMIUM_SPACING.lg}px;
  }
`;

const TrustBadge = styled.div`
  text-align: center;
  padding: ${PREMIUM_SPACING.lg}px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);

  strong {
    font-size: ${TYPOGRAPHY.sizes.xxl};
    font-weight: ${TYPOGRAPHY.weights.bold};
    color: ${PREMIUM_COLORS.secondary};
    display: block;
    margin-bottom: ${PREMIUM_SPACING.sm}px;
  }

  span {
    font-size: ${TYPOGRAPHY.sizes.md};
    opacity: 0.9;
  }

  @media (max-width: 768px) {
    padding: ${PREMIUM_SPACING.md}px;
    
    strong {
      font-size: ${TYPOGRAPHY.sizes.xl};
    }
    
    span {
      font-size: ${TYPOGRAPHY.sizes.sm};
    }
  }
`;

const ExpertiseHighlight = styled.div`
  background: rgba(214, 158, 46, 0.15);
  border: 1px solid rgba(214, 158, 46, 0.3);
  border-radius: 12px;
  padding: ${PREMIUM_SPACING.lg}px;
  margin-bottom: ${PREMIUM_SPACING.xl}px;
  backdrop-filter: blur(10px);

  .highlight-label {
    font-size: ${TYPOGRAPHY.sizes.sm};
    font-weight: ${TYPOGRAPHY.weights.semibold};
    color: ${PREMIUM_COLORS.secondary};
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: ${PREMIUM_SPACING.sm}px;
  }

  .highlight-text {
    font-size: ${TYPOGRAPHY.sizes.lg};
    font-weight: ${TYPOGRAPHY.weights.medium};
    line-height: 1.4;
  }

  @media (max-width: 768px) {
    padding: ${PREMIUM_SPACING.md}px;
    
    .highlight-text {
      font-size: ${TYPOGRAPHY.sizes.md};
    }
  }
`;

interface BlogHeroProps {
  onSearch?: (query: string) => void;
  onCategoryFilter?: (category: string) => void;
}

export const BlogHero: React.FC<BlogHeroProps> = ({ onSearch, onCategoryFilter }) => {
  const handleTopicClick = (category: string) => {
    if (onCategoryFilter) {
      onCategoryFilter(category);
    }
  };

  const handleSearchSubmit = (_query: string) => {
    // TODO: Implement when BlogSearch component is ready
    if (onSearch) {
      // onSearch(query);
    }
  };

  return (
    <HeroContainer>
      <HeroContent>
        <HeroTitle>Financial Asset Recovery Insights</HeroTitle>
        <HeroSubtitle>
          Expert analysis, case studies, and recovery strategies from UK's leading 
          financial asset recovery specialists
        </HeroSubtitle>
        <HeroDescription>
          Stay informed with the latest insights from our team of experts who have 
          recovered over £500M in client assets across cryptocurrency, investment fraud, 
          and international recovery cases.
        </HeroDescription>

        <ExpertiseHighlight>
          <div className="highlight-label">Industry Authority</div>
          <div className="highlight-text">
            Insights from 5 specialist experts with combined 60+ years of recovery experience 
            and £365M+ in successful asset recoveries
          </div>
        </ExpertiseHighlight>

        <SearchContainer>
          {/* <BlogSearch 
            placeholder="Search recovery insights, case studies, fraud types..."
            onSearch={handleSearchSubmit}
          /> */}
          
          <PopularTopics>
            <TopicTag 
              href="/blog/category/investment-fraud"
              onClick={(e) => {
                e.preventDefault();
                handleTopicClick('investment-fraud');
              }}
            >
              Investment Fraud
            </TopicTag>
            <TopicTag 
              href="/blog/category/cryptocurrency"
              onClick={(e) => {
                e.preventDefault();
                handleTopicClick('cryptocurrency');
              }}
            >
              Cryptocurrency Recovery
            </TopicTag>
            <TopicTag 
              href="/blog/category/romance-scams"
              onClick={(e) => {
                e.preventDefault();
                handleTopicClick('romance-scams');
              }}
            >
              Romance Scams
            </TopicTag>
            <TopicTag 
              href="/blog/category/case-studies"
              onClick={(e) => {
                e.preventDefault();
                handleTopicClick('case-studies');
              }}
            >
              Case Studies
            </TopicTag>
          </PopularTopics>
        </SearchContainer>

        <TrustIndicators>
          <TrustBadge>
            <strong>£500M+</strong>
            <span>Assets Recovered</span>
          </TrustBadge>
          <TrustBadge>
            <strong>2,500+</strong>
            <span>Cases Resolved</span>
          </TrustBadge>
          <TrustBadge>
            <strong>98%</strong>
            <span>Client Satisfaction</span>
          </TrustBadge>
          <TrustBadge>
            <strong>185+</strong>
            <span>Expert Articles</span>
          </TrustBadge>
        </TrustIndicators>
      </HeroContent>
    </HeroContainer>
  );
}; 