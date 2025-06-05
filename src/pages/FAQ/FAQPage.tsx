import React, { useState, useCallback, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import { FAQHero } from './components/FAQHero';
import { FAQCategoryGrid } from './components/FAQCategoryGrid';
import { FAQAccordion } from './components/FAQAccordion';
import { PersonalizedGuidance } from './components/PersonalizedGuidance';
import { ContactCTA } from './components/ContactCTA';
import { RelatedResources } from './components/RelatedResources';
import { faqCategories } from './data/faqCategories';
import { guidancePaths } from './data/guidancePaths';
import { quickAnswers } from './data/quickAnswers';
import { QuickAnswer } from './types/faq.types';

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
  border: '#e2e8f0',
  white: '#ffffff',
  highlight: '#edf2f7'
};

const TYPOGRAPHY = {
  sizes: {
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

const FAQContainer = styled.div`
  background: linear-gradient(135deg, ${PREMIUM_COLORS.background} 0%, ${PREMIUM_COLORS.white} 100%);
  min-height: 100vh;
`;

const MainContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${PREMIUM_SPACING.lg}px;

  @media (max-width: 768px) {
    padding: 0 ${PREMIUM_SPACING.md}px;
  }
`;

const Section = styled.section`
  margin: ${PREMIUM_SPACING.xxxl}px 0;

  @media (max-width: 768px) {
    margin: ${PREMIUM_SPACING.xxl}px 0;
  }
`;

const SectionTitle = styled.h2`
  font-size: ${TYPOGRAPHY.sizes.xxxl};
  font-weight: ${TYPOGRAPHY.weights.bold};
  color: ${PREMIUM_COLORS.primary};
  text-align: center;
  margin-bottom: ${PREMIUM_SPACING.xl}px;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: ${TYPOGRAPHY.sizes.xxl};
    margin-bottom: ${PREMIUM_SPACING.lg}px;
  }
`;

const SectionSubtitle = styled.p`
  font-size: ${TYPOGRAPHY.sizes.lg};
  color: ${PREMIUM_COLORS.textLight};
  text-align: center;
  margin-bottom: ${PREMIUM_SPACING.xxl}px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: ${TYPOGRAPHY.sizes.md};
    margin-bottom: ${PREMIUM_SPACING.xl}px;
  }
`;

const SearchResults = styled.div`
  background: ${PREMIUM_COLORS.white};
  border: 1px solid ${PREMIUM_COLORS.border};
  border-radius: 12px;
  padding: ${PREMIUM_SPACING.xl}px;
  margin-bottom: ${PREMIUM_SPACING.xl}px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

  h3 {
    color: ${PREMIUM_COLORS.primary};
    font-size: ${TYPOGRAPHY.sizes.xl};
    font-weight: ${TYPOGRAPHY.weights.semibold};
    margin-bottom: ${PREMIUM_SPACING.lg}px;
  }

  .results-count {
    color: ${PREMIUM_COLORS.textLight};
    font-size: ${TYPOGRAPHY.sizes.md};
    margin-bottom: ${PREMIUM_SPACING.lg}px;
  }
`;

const QuickAnswerCard = styled.div`
  background: linear-gradient(135deg, ${PREMIUM_COLORS.secondary}15 0%, ${PREMIUM_COLORS.primary}05 100%);
  border: 1px solid ${PREMIUM_COLORS.secondary}30;
  border-radius: 12px;
  padding: ${PREMIUM_SPACING.xl}px;
  margin-bottom: ${PREMIUM_SPACING.xl}px;

  .quick-answer-badge {
    background: ${PREMIUM_COLORS.secondary};
    color: ${PREMIUM_COLORS.white};
    padding: ${PREMIUM_SPACING.xs}px ${PREMIUM_SPACING.md}px;
    border-radius: 16px;
    font-size: 0.75rem;
    font-weight: ${TYPOGRAPHY.weights.semibold};
    text-transform: uppercase;
    letter-spacing: 0.5px;
    display: inline-block;
    margin-bottom: ${PREMIUM_SPACING.md}px;
  }

  .quick-question {
    font-size: ${TYPOGRAPHY.sizes.lg};
    font-weight: ${TYPOGRAPHY.weights.semibold};
    color: ${PREMIUM_COLORS.primary};
    margin-bottom: ${PREMIUM_SPACING.md}px;
  }

  .quick-answer {
    font-size: ${TYPOGRAPHY.sizes.md};
    color: ${PREMIUM_COLORS.text};
    line-height: 1.6;
    margin-bottom: ${PREMIUM_SPACING.lg}px;
  }

  .quick-cta {
    display: inline-flex;
    align-items: center;
    background: ${PREMIUM_COLORS.secondary};
    color: ${PREMIUM_COLORS.white};
    padding: ${PREMIUM_SPACING.sm}px ${PREMIUM_SPACING.lg}px;
    border-radius: 8px;
    text-decoration: none;
    font-weight: ${TYPOGRAPHY.weights.medium};
    transition: all 0.3s ease;

    &:hover {
      background: #b7791f;
      transform: translateY(-1px);
    }
  }
`;

const BackToCategories = styled.button`
  background: ${PREMIUM_COLORS.primary};
  color: ${PREMIUM_COLORS.white};
  border: none;
  padding: ${PREMIUM_SPACING.md}px ${PREMIUM_SPACING.xl}px;
  border-radius: 8px;
  font-weight: ${TYPOGRAPHY.weights.semibold};
  cursor: pointer;
  margin-bottom: ${PREMIUM_SPACING.xl}px;
  transition: all 0.3s ease;

  &:hover {
    background: #2d5a87;
    transform: translateY(-1px);
  }

  &:focus {
    outline: 2px solid ${PREMIUM_COLORS.secondary};
    outline-offset: 2px;
  }
`;

export const FAQPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchFilters, setSearchFilters] = useState<string[]>([]);
  const [quickAnswer, setQuickAnswer] = useState<QuickAnswer | null>(null);

  // Get selected category data
  const currentCategory = useMemo(() => {
    return selectedCategory ? faqCategories.find(cat => cat.id === selectedCategory) : null;
  }, [selectedCategory]);

  // Filter questions based on search
  const filteredQuestions = useMemo(() => {
    if (!currentCategory) return [];

    let questions = currentCategory.questions;

    // Apply search query filter
    if (searchQuery.length > 2) {
      questions = questions.filter(q => 
        q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Apply category filters
    if (searchFilters.length > 0) {
      questions = questions.filter(q =>
        q.tags.some(tag => 
          searchFilters.some(filter => 
            tag.toLowerCase().includes(filter.toLowerCase())
          )
        )
      );
    }

    return questions;
  }, [currentCategory, searchQuery, searchFilters]);

  // Handle search functionality
  const handleSearch = useCallback((query: string, filters: string[] = []) => {
    setSearchQuery(query);
    setSearchFilters(filters);
    
    // Check for quick answers
    const matchingQuickAnswer = quickAnswers.find(answer =>
      answer.trigger.some(trigger => 
        query.toLowerCase().includes(trigger.toLowerCase())
      )
    );
    
    setQuickAnswer(matchingQuickAnswer || null);

    // If there's a category match, auto-select it
    if (matchingQuickAnswer?.category && !selectedCategory) {
      setSelectedCategory(matchingQuickAnswer.category);
    }
  }, [selectedCategory]);

  // Handle category selection
  const handleCategorySelect = useCallback((categoryId: string) => {
    setSelectedCategory(categoryId);
    setQuickAnswer(null);
    
    // Scroll to questions section
    setTimeout(() => {
      const questionsSection = document.getElementById('questions-section');
      if (questionsSection) {
        questionsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }, []);

  // Handle question click analytics
  const handleQuestionClick = useCallback((questionId: string) => {
    // Analytics tracking would go here
    console.log('Question clicked:', questionId);
  }, []);

  // Reset to category view
  const handleBackToCategories = useCallback(() => {
    setSelectedCategory(null);
    setSearchQuery('');
    setSearchFilters([]);
    setQuickAnswer(null);
  }, []);

  return (
    <>
      <Helmet>
        <title>FAQ - Expert Financial Asset Recovery Guidance | Recovery Office</title>
        <meta 
          name="description" 
          content="Get expert answers about cryptocurrency recovery, investment fraud consultation, fees, success rates, and international asset recovery from Recovery Office specialists." 
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://recovery-office-online.netlify.app/faq" />
        
        {/* Structured data for FAQ */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqCategories.flatMap(category => 
              category.questions.map(question => ({
                "@type": "Question",
                "name": question.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": question.answer
                }
              }))
            )
          })}
        </script>
      </Helmet>

      <FAQContainer>
        <FAQHero onSearch={handleSearch} />
        
        <MainContent>
          {/* Quick Answer Display */}
          {quickAnswer && (
            <QuickAnswerCard>
              <div className="quick-answer-badge">Quick Answer</div>
              <div className="quick-question">{quickAnswer.question}</div>
              <div className="quick-answer">{quickAnswer.answer}</div>
              <a href="/booking" className="quick-cta">{quickAnswer.cta}</a>
            </QuickAnswerCard>
          )}

          {/* Search Results Display */}
          {(searchQuery.length > 2 || searchFilters.length > 0) && selectedCategory && (
            <SearchResults>
              <h3>Search Results</h3>
              <div className="results-count">
                Found {filteredQuestions.length} {filteredQuestions.length === 1 ? 'question' : 'questions'}
                {searchQuery && ` matching "${searchQuery}"`}
                {searchFilters.length > 0 && ` with filters: ${searchFilters.join(', ')}`}
              </div>
            </SearchResults>
          )}

          {!selectedCategory ? (
            <>
              {/* Category Grid */}
              <Section>
                <SectionTitle>Browse by Category</SectionTitle>
                <SectionSubtitle>
                  Select a topic to explore expert guidance tailored to your specific 
                  financial asset recovery needs and circumstances.
                </SectionSubtitle>
                <FAQCategoryGrid 
                  categories={faqCategories}
                  onCategorySelect={handleCategorySelect}
                />
              </Section>

              {/* Personalized Guidance */}
              <Section>
                <SectionTitle>Find Your Recovery Path</SectionTitle>
                <SectionSubtitle>
                  Get personalized guidance based on your specific type of financial loss
                  with success rates and consultation times tailored to your situation.
                </SectionSubtitle>
                <PersonalizedGuidance 
                  guidancePaths={guidancePaths}
                  onPathSelect={handleCategorySelect}
                />
              </Section>
            </>
          ) : (
            <>
              {/* Questions Section */}
              <Section id="questions-section">
                <BackToCategories onClick={handleBackToCategories}>
                  ← Back to All Categories
                </BackToCategories>
                
                <SectionTitle>{currentCategory?.title}</SectionTitle>
                <SectionSubtitle>{currentCategory?.description}</SectionSubtitle>
                
                <FAQAccordion 
                  questions={filteredQuestions}
                  onQuestionClick={handleQuestionClick}
                />
                
                {filteredQuestions.length === 0 && (searchQuery || searchFilters.length > 0) && (
                  <div style={{ textAlign: 'center', padding: `${PREMIUM_SPACING.xxl}px` }}>
                    <p style={{ fontSize: TYPOGRAPHY.sizes.lg, color: PREMIUM_COLORS.textLight }}>
                      No questions found matching your search criteria.
                    </p>
                    <p style={{ fontSize: TYPOGRAPHY.sizes.md, color: PREMIUM_COLORS.textLight }}>
                      Try adjusting your search terms or browse all questions in this category.
                    </p>
                  </div>
                )}
              </Section>
            </>
          )}

          {/* Contact CTA */}
          <Section>
            <ContactCTA />
          </Section>

          {/* Related Resources */}
          <Section>
            <RelatedResources />
          </Section>
        </MainContent>
      </FAQContainer>
    </>
  );
}; 