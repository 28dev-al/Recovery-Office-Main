import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Box } from '../../design-system/components/layout/Box';
import { PHI } from '../../constants/sacred-geometry';

// Category filter styles
const CategoriesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${PHI * 8}px;
  margin-bottom: ${PHI * 20}px;
  
  @media (max-width: ${props => props.theme.breakpoints.md}px) {
    justify-content: center;
  }
`;

interface CategoryItemProps {
  isActive: boolean;
}

const CategoryItem = styled.button<CategoryItemProps>`
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  background-color: ${props => props.isActive ? props.theme.colors.primary[600] : 'white'};
  color: ${props => props.isActive ? 'white' : props.theme.colors.text.secondary};
  border: 1px solid ${props => props.isActive ? props.theme.colors.primary[600] : props.theme.colors.border.light};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  
  &:hover {
    background-color: ${props => props.isActive ? props.theme.colors.primary[700] : props.theme.colors.background.light};
    border-color: ${props => props.isActive ? props.theme.colors.primary[700] : props.theme.colors.primary[200]};
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${props => props.theme.colors.primary[200]};
  }
`;

const CategoriesTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 ${PHI * 8}px 0 0;
  color: ${props => props.theme.colors.text.primary};
  display: flex;
  align-items: center;
  
  @media (max-width: ${props => props.theme.breakpoints.md}px) {
    width: 100%;
    margin-bottom: ${PHI * 8}px;
    justify-content: center;
  }
`;

export interface BlogCategory {
  id: string;
  name: string;
  count?: number;
}

interface BlogCategoriesProps {
  categories: BlogCategory[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

const BlogCategories: React.FC<BlogCategoriesProps> = ({
  categories,
  activeCategory,
  onCategoryChange
}) => {
  return (
    <Box mb={4}>
      <CategoriesContainer>
        <CategoriesTitle>Filter by:</CategoriesTitle>
        
        <CategoryItem
          isActive={activeCategory === 'all'}
          onClick={() => onCategoryChange('all')}
        >
          All Articles
        </CategoryItem>
        
        {categories.map(category => (
          <CategoryItem
            key={category.id}
            isActive={activeCategory === category.id}
            onClick={() => onCategoryChange(category.id)}
          >
            {category.name}
            {category.count !== undefined && ` (${category.count})`}
          </CategoryItem>
        ))}
      </CategoriesContainer>
    </Box>
  );
};

export default BlogCategories; 