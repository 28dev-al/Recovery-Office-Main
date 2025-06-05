import React, { useState, useCallback } from 'react';
import styled from 'styled-components';

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
  text: '#2d3748',
  textLight: '#4a5568',
  border: '#e2e8f0',
  white: '#ffffff'
};

const TYPOGRAPHY = {
  sizes: {
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
    font-size: 0.875rem;
  }
`;

interface BlogSearchProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
}

export const BlogSearch: React.FC<BlogSearchProps> = ({
  placeholder = "Search blog posts...",
  onSearch
}) => {
  const [query, setQuery] = useState('');

  const handleSearch = useCallback(() => {
    if (onSearch && query.trim()) {
      onSearch(query.trim());
    }
  }, [query, onSearch]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  }, [handleSearch]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }, []);

  return (
    <SearchContainer>
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
    </SearchContainer>
  );
}; 