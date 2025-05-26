import React, { useState } from 'react';
import styled from 'styled-components';
import { PHI } from '../../constants/sacred-geometry';

// Search container
const SearchContainer = styled.div`
  margin-bottom: ${PHI * 24}px;
`;

// Search form
const SearchForm = styled.form`
  position: relative;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

// Search input
const SearchInput = styled.input`
  width: 100%;
  padding: 14px 16px 14px 48px;
  border-radius: 30px;
  font-size: 1rem;
  border: 2px solid ${props => props.theme.colors.border.light};
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary[300]};
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
  
  &::placeholder {
    color: ${props => props.theme.colors.text.secondary};
  }
`;

// Search icon
const SearchIcon = styled.div`
  position: absolute;
  top: 50%;
  left: 16px;
  transform: translateY(-50%);
  color: ${props => props.theme.colors.text.secondary};
`;

// Search button
const SearchButton = styled.button`
  position: absolute;
  top: 50%;
  right: 8px;
  transform: translateY(-50%);
  border: none;
  background-color: ${props => props.theme.colors.primary[600]};
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: ${props => props.theme.colors.primary[700]};
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${props => props.theme.colors.primary[200]};
  }
`;

// Search icon component
const IconSearch = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

interface BlogSearchProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  initialQuery?: string;
}

const BlogSearch: React.FC<BlogSearchProps> = ({
  onSearch,
  placeholder = "Search for articles, guides, and resources...",
  initialQuery = ""
}) => {
  const [query, setQuery] = useState(initialQuery);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query.trim());
  };
  
  return (
    <SearchContainer>
      <SearchForm onSubmit={handleSubmit}>
        <SearchIcon>
          <IconSearch />
        </SearchIcon>
        
        <SearchInput
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder={placeholder}
          aria-label="Search blog"
        />
        
        <SearchButton type="submit">
          Search
        </SearchButton>
      </SearchForm>
    </SearchContainer>
  );
};

export default BlogSearch; 