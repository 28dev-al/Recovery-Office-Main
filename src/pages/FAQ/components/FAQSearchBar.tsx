import React, { useState, useCallback, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { quickAnswers } from '../data/quickAnswers';
import { QuickAnswer } from '../types/faq.types';

// Import design system tokens
const PREMIUM_SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32
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
    lg: '1.125rem'
  },
  weights: {
    normal: 400,
    medium: 500,
    semibold: 600
  }
};

const SearchContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: ${PREMIUM_SPACING.md}px ${PREMIUM_SPACING.xl}px;
  padding-right: 120px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  font-size: ${TYPOGRAPHY.sizes.lg};
  color: ${PREMIUM_COLORS.text};
  transition: all 0.3s ease;

  &::placeholder {
    color: ${PREMIUM_COLORS.textLight};
  }

  &:focus {
    outline: none;
    border-color: ${PREMIUM_COLORS.secondary};
    box-shadow: 0 0 0 3px rgba(214, 158, 46, 0.1);
  }

  @media (max-width: 768px) {
    font-size: ${TYPOGRAPHY.sizes.md};
    padding: ${PREMIUM_SPACING.md}px;
    padding-right: 100px;
  }
`;

const SearchButton = styled.button`
  position: absolute;
  right: ${PREMIUM_SPACING.sm}px;
  top: 50%;
  transform: translateY(-50%);
  background: ${PREMIUM_COLORS.secondary};
  color: ${PREMIUM_COLORS.white};
  border: none;
  border-radius: 8px;
  padding: ${PREMIUM_SPACING.sm}px ${PREMIUM_SPACING.md}px;
  font-weight: ${TYPOGRAPHY.weights.semibold};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #b7791f;
  }

  &:focus {
    outline: 2px solid ${PREMIUM_COLORS.white};
    outline-offset: 2px;
  }

  @media (max-width: 768px) {
    padding: ${PREMIUM_SPACING.sm}px;
    font-size: ${TYPOGRAPHY.sizes.sm};
  }
`;

const SearchFilters = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${PREMIUM_SPACING.sm}px;
  margin-top: ${PREMIUM_SPACING.md}px;
  justify-content: center;

  @media (max-width: 768px) {
    gap: ${PREMIUM_SPACING.xs}px;
  }
`;

const FilterChip = styled.button<{ active: boolean }>`
  background: ${props => props.active ? PREMIUM_COLORS.secondary : 'rgba(255, 255, 255, 0.8)'};
  color: ${props => props.active ? PREMIUM_COLORS.white : PREMIUM_COLORS.text};
  border: 1px solid ${props => props.active ? PREMIUM_COLORS.secondary : 'rgba(255, 255, 255, 0.5)'};
  border-radius: 20px;
  padding: ${PREMIUM_SPACING.sm}px ${PREMIUM_SPACING.md}px;
  font-size: ${TYPOGRAPHY.sizes.sm};
  font-weight: ${TYPOGRAPHY.weights.medium};
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &:hover {
    background: ${props => props.active ? '#b7791f' : 'rgba(255, 255, 255, 0.95)'};
    transform: translateY(-1px);
  }

  &:focus {
    outline: 2px solid ${PREMIUM_COLORS.white};
    outline-offset: 2px;
  }

  @media (max-width: 768px) {
    padding: ${PREMIUM_SPACING.xs}px ${PREMIUM_SPACING.sm}px;
    font-size: 0.75rem;
  }
`;

const SuggestionsList = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: ${PREMIUM_COLORS.white};
  border: 1px solid ${PREMIUM_COLORS.border};
  border-radius: 8px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  max-height: 300px;
  overflow-y: auto;
  z-index: 10;
  margin-top: ${PREMIUM_SPACING.sm}px;
`;

const SuggestionItem = styled.div`
  padding: ${PREMIUM_SPACING.md}px;
  border-bottom: 1px solid ${PREMIUM_COLORS.highlight};
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${PREMIUM_COLORS.highlight};
  }

  &:last-child {
    border-bottom: none;
  }

  .suggestion-question {
    font-weight: ${TYPOGRAPHY.weights.semibold};
    color: ${PREMIUM_COLORS.primary};
    margin-bottom: ${PREMIUM_SPACING.xs}px;
  }

  .suggestion-answer {
    font-size: ${TYPOGRAPHY.sizes.sm};
    color: ${PREMIUM_COLORS.textLight};
    line-height: 1.4;
  }

  .suggestion-cta {
    font-size: ${TYPOGRAPHY.sizes.sm};
    color: ${PREMIUM_COLORS.secondary};
    font-weight: ${TYPOGRAPHY.weights.medium};
    margin-top: ${PREMIUM_SPACING.xs}px;
  }
`;

const filterCategories = [
  'Consultation',
  'Fees',
  'Cryptocurrency',
  'Timeline',
  'Success Rates',
  'International',
  'Security'
];

interface FAQSearchBarProps {
  placeholder?: string;
  onSearch?: (query: string, filters: string[]) => void;
  onSuggestionSelect?: (suggestion: QuickAnswer) => void;
}

export const FAQSearchBar: React.FC<FAQSearchBarProps> = ({
  placeholder = "Search frequently asked questions...",
  onSearch,
  onSuggestionSelect
}) => {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<QuickAnswer[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const toggleFilter = useCallback((filter: string) => {
    setFilters(prev => {
      const newFilters = prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter];
      
      // Trigger search with new filters
      if (onSearch) {
        onSearch(query, newFilters);
      }
      
      return newFilters;
    });
  }, [query, onSearch]);

  const handleSearch = useCallback(() => {
    if (onSearch) {
      onSearch(query, filters);
    }
    setShowSuggestions(false);
  }, [query, filters, onSearch]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    // Generate suggestions based on input
    if (value.length > 2) {
      const matchingSuggestions = quickAnswers.filter(answer =>
        answer.trigger.some(trigger => 
          trigger.toLowerCase().includes(value.toLowerCase())
        ) || answer.question.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 5);
      
      setSuggestions(matchingSuggestions);
      setShowSuggestions(matchingSuggestions.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, []);

  const handleSuggestionClick = useCallback((suggestion: QuickAnswer) => {
    setQuery(suggestion.question);
    setShowSuggestions(false);
    
    if (onSuggestionSelect) {
      onSuggestionSelect(suggestion);
    }
  }, [onSuggestionSelect]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  }, [handleSearch]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <SearchContainer ref={searchRef}>
      <div style={{ position: 'relative' }}>
        <SearchInput
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
        />
        <SearchButton onClick={handleSearch}>
          Search
        </SearchButton>
        
        {showSuggestions && suggestions.length > 0 && (
          <SuggestionsList>
            {suggestions.map(suggestion => (
              <SuggestionItem
                key={suggestion.id}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <div className="suggestion-question">{suggestion.question}</div>
                <div className="suggestion-answer">{suggestion.answer}</div>
                <div className="suggestion-cta">{suggestion.cta}</div>
              </SuggestionItem>
            ))}
          </SuggestionsList>
        )}
      </div>
      
      <SearchFilters>
        {filterCategories.map(filter => (
          <FilterChip
            key={filter}
            active={filters.includes(filter)}
            onClick={() => toggleFilter(filter)}
          >
            {filter}
          </FilterChip>
        ))}
      </SearchFilters>
    </SearchContainer>
  );
}; 