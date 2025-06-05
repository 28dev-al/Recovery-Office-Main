import React, { useState } from 'react';
import styled from 'styled-components';
import { FAQQuestion } from '../types/faq.types';

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
  success: '#38a169',
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
    xl: '1.25rem'
  },
  weights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700
  }
};

const AccordionContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const AccordionItem = styled.div`
  background: ${PREMIUM_COLORS.white};
  border: 1px solid ${PREMIUM_COLORS.border};
  border-radius: 12px;
  margin-bottom: ${PREMIUM_SPACING.lg}px;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    transform: translateY(-1px);
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const AccordionHeader = styled.div<{ isActive: boolean; urgencyLevel: string }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${PREMIUM_SPACING.lg}px;
  cursor: pointer;
  background: ${props => props.isActive ? 
    props.urgencyLevel === 'high' ? '#fee' :
    props.urgencyLevel === 'medium' ? '#fef7e0' :
    PREMIUM_COLORS.highlight : PREMIUM_COLORS.white};
  border-left: 4px solid ${props => 
    props.urgencyLevel === 'high' ? '#e53e3e' :
    props.urgencyLevel === 'medium' ? '#ed8936' :
    props.isActive ? PREMIUM_COLORS.primary : 'transparent'};
  transition: all 0.3s ease;

  &:hover {
    background: ${props => 
      props.urgencyLevel === 'high' ? '#fee5e5' :
      props.urgencyLevel === 'medium' ? '#fef0d9' :
      PREMIUM_COLORS.highlight};
  }

  &:focus {
    outline: 2px solid ${PREMIUM_COLORS.secondary};
    outline-offset: 2px;
  }
`;

const QuestionText = styled.h3<{ urgencyLevel: string }>`
  font-size: ${TYPOGRAPHY.sizes.lg};
  font-weight: ${TYPOGRAPHY.weights.semibold};
  color: ${props => 
    props.urgencyLevel === 'high' ? '#c53030' :
    props.urgencyLevel === 'medium' ? '#dd6b20' :
    PREMIUM_COLORS.primary};
  margin: 0;
  flex: 1;
  line-height: 1.4;
  text-align: left;

  @media (max-width: 768px) {
    font-size: ${TYPOGRAPHY.sizes.md};
  }
`;

const QuestionMeta = styled.div`
  display: flex;
  align-items: center;
  gap: ${PREMIUM_SPACING.md}px;
  margin-left: ${PREMIUM_SPACING.lg}px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: ${PREMIUM_SPACING.sm}px;
    margin-left: ${PREMIUM_SPACING.md}px;
  }
`;

const UrgencyBadge = styled.span<{ urgencyLevel: string }>`
  padding: ${PREMIUM_SPACING.xs}px ${PREMIUM_SPACING.sm}px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: ${TYPOGRAPHY.weights.medium};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background: ${props => 
    props.urgencyLevel === 'high' ? '#fed7d7' :
    props.urgencyLevel === 'medium' ? '#feebc8' :
    '#e6fffa'};
  color: ${props => 
    props.urgencyLevel === 'high' ? '#c53030' :
    props.urgencyLevel === 'medium' ? '#dd6b20' :
    PREMIUM_COLORS.success};

  @media (max-width: 768px) {
    font-size: 0.6875rem;
    padding: ${PREMIUM_SPACING.xs}px;
  }
`;

const LastUpdated = styled.span`
  font-size: ${TYPOGRAPHY.sizes.sm};
  color: ${PREMIUM_COLORS.textLight};
  font-weight: ${TYPOGRAPHY.weights.medium};

  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
`;

const ExpandIcon = styled.div<{ isActive: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${props => props.isActive ? PREMIUM_COLORS.primary : PREMIUM_COLORS.border};
  color: ${props => props.isActive ? PREMIUM_COLORS.white : PREMIUM_COLORS.textLight};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: bold;
  transition: all 0.3s ease;
  transform: ${props => props.isActive ? 'rotate(45deg)' : 'rotate(0deg)'};

  @media (max-width: 768px) {
    width: 28px;
    height: 28px;
    font-size: 16px;
  }
`;

const AccordionContent = styled.div<{ isActive: boolean }>`
  max-height: ${props => props.isActive ? '2000px' : '0'};
  opacity: ${props => props.isActive ? 1 : 0};
  overflow: hidden;
  transition: max-height 0.5s ease, opacity 0.3s ease, padding 0.3s ease;
  padding: ${props => props.isActive ? `0 ${PREMIUM_SPACING.lg}px ${PREMIUM_SPACING.lg}px` : '0'};
`;

const AnswerContent = styled.div`
  color: ${PREMIUM_COLORS.text};
  line-height: 1.7;
  font-size: ${TYPOGRAPHY.sizes.md};

  p {
    margin-bottom: ${PREMIUM_SPACING.md}px;
  }

  p:last-child {
    margin-bottom: 0;
  }

  strong {
    color: ${PREMIUM_COLORS.primary};
    font-weight: ${TYPOGRAPHY.weights.semibold};
  }

  ul, ol {
    margin: ${PREMIUM_SPACING.md}px 0;
    padding-left: ${PREMIUM_SPACING.xl}px;
  }

  li {
    margin-bottom: ${PREMIUM_SPACING.sm}px;
  }

  h4 {
    color: ${PREMIUM_COLORS.primary};
    font-size: ${TYPOGRAPHY.sizes.lg};
    font-weight: ${TYPOGRAPHY.weights.semibold};
    margin: ${PREMIUM_SPACING.lg}px 0 ${PREMIUM_SPACING.md}px 0;
  }
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${PREMIUM_SPACING.sm}px;
  margin-top: ${PREMIUM_SPACING.lg}px;
  padding-top: ${PREMIUM_SPACING.lg}px;
  border-top: 1px solid ${PREMIUM_COLORS.highlight};
`;

const Tag = styled.span`
  background: ${PREMIUM_COLORS.highlight};
  color: ${PREMIUM_COLORS.textLight};
  padding: ${PREMIUM_SPACING.xs}px ${PREMIUM_SPACING.sm}px;
  border-radius: 12px;
  font-size: ${TYPOGRAPHY.sizes.sm};
  font-weight: ${TYPOGRAPHY.weights.medium};
`;

const RelatedQuestions = styled.div`
  margin-top: ${PREMIUM_SPACING.lg}px;
  padding-top: ${PREMIUM_SPACING.lg}px;
  border-top: 1px solid ${PREMIUM_COLORS.highlight};

  h5 {
    color: ${PREMIUM_COLORS.primary};
    font-size: ${TYPOGRAPHY.sizes.md};
    font-weight: ${TYPOGRAPHY.weights.semibold};
    margin-bottom: ${PREMIUM_SPACING.md}px;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin-bottom: ${PREMIUM_SPACING.sm}px;
  }

  a {
    color: ${PREMIUM_COLORS.secondary};
    text-decoration: none;
    font-weight: ${TYPOGRAPHY.weights.medium};
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
`;

interface FAQAccordionProps {
  questions: FAQQuestion[];
  defaultOpenId?: string;
  onQuestionClick?: (questionId: string) => void;
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({
  questions,
  defaultOpenId,
  onQuestionClick
}) => {
  const [activeId, setActiveId] = useState<string | null>(defaultOpenId || null);

  const toggleQuestion = (questionId: string) => {
    setActiveId(prev => prev === questionId ? null : questionId);
    
    if (onQuestionClick) {
      onQuestionClick(questionId);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent, questionId: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleQuestion(questionId);
    }
  };

  const formatAnswer = (answer: string) => {
    // Convert markdown-like formatting to HTML structure
    return answer.split('\n').map((line, index) => {
      if (line.startsWith('**') && line.endsWith('**')) {
        return <h4 key={index}>{line.slice(2, -2)}</h4>;
      }
      if (line.startsWith('- ')) {
        return <li key={index}>{line.slice(2)}</li>;
      }
      if (line.trim() === '') {
        return <br key={index} />;
      }
      return <p key={index}>{line}</p>;
    });
  };

  return (
    <AccordionContainer>
      {questions.map((question) => (
        <AccordionItem key={question.id}>
          <AccordionHeader
            isActive={activeId === question.id}
            urgencyLevel={question.urgencyLevel}
            onClick={() => toggleQuestion(question.id)}
            onKeyPress={(e) => handleKeyPress(e, question.id)}
            tabIndex={0}
            role="button"
            aria-expanded={activeId === question.id}
            aria-controls={`content-${question.id}`}
          >
            <QuestionText urgencyLevel={question.urgencyLevel}>
              {question.question}
            </QuestionText>
            
            <QuestionMeta>
              <UrgencyBadge urgencyLevel={question.urgencyLevel}>
                {question.urgencyLevel}
              </UrgencyBadge>
              <LastUpdated>
                Updated {new Date(question.lastUpdated).toLocaleDateString()}
              </LastUpdated>
              <ExpandIcon isActive={activeId === question.id}>
                +
              </ExpandIcon>
            </QuestionMeta>
          </AccordionHeader>
          
          <AccordionContent
            isActive={activeId === question.id}
            id={`content-${question.id}`}
            aria-labelledby={`header-${question.id}`}
          >
            <AnswerContent>
              {formatAnswer(question.answer)}
            </AnswerContent>
            
            {question.tags.length > 0 && (
              <TagsContainer>
                {question.tags.map((tag, index) => (
                  <Tag key={index}>{tag}</Tag>
                ))}
              </TagsContainer>
            )}
            
            {question.relatedQuestions.length > 0 && (
              <RelatedQuestions>
                <h5>Related Questions</h5>
                <ul>
                  {question.relatedQuestions.map((relatedId, index) => (
                    <li key={index}>
                      <a onClick={() => toggleQuestion(relatedId)}>
                        {/* This would need to be populated with actual question titles */}
                        View related question: {relatedId}
                      </a>
                    </li>
                  ))}
                </ul>
              </RelatedQuestions>
            )}
          </AccordionContent>
        </AccordionItem>
      ))}
    </AccordionContainer>
  );
}; 