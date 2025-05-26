import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { PHI } from '../../constants/sacred-geometry';
import { formatDate } from '../../utils/formatDate';
import { BlogArticle } from './types';

// Card container
const CardContainer = styled(motion.article)`
  display: flex;
  flex-direction: column;
  height: 100%;
  border-radius: 8px;
  overflow: hidden;
  background-color: white;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
  }
`;

// Card image
const CardImage = styled.div`
  position: relative;
  height: 0;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  overflow: hidden;
  
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  
  ${CardContainer}:hover & img {
    transform: scale(1.05);
  }
`;

// Category tag
const CategoryTag = styled.span`
  position: absolute;
  top: 16px;
  left: 16px;
  padding: 6px 12px;
  background-color: ${props => props.theme.colors.primary[600]};
  color: white;
  font-size: 0.75rem;
  font-weight: 500;
  border-radius: 20px;
  z-index: 1;
`;

// Card content
const CardContent = styled.div`
  padding: ${PHI * 16}px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

// Card meta
const CardMeta = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${PHI * 8}px;
  color: ${props => props.theme.colors.text.secondary};
  font-size: 0.85rem;
`;

// Card date
const CardDate = styled.span`
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 6px;
  }
`;

// Card title
const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 ${PHI * 10}px;
  line-height: 1.4;
  color: ${props => props.theme.colors.text.primary};
  
  a {
    color: inherit;
    text-decoration: none;
    
    &:hover {
      color: ${props => props.theme.colors.primary[600]};
    }
  }
`;

// Card excerpt
const CardExcerpt = styled.p`
  font-size: 0.95rem;
  line-height: 1.6;
  color: ${props => props.theme.colors.text.secondary};
  margin: 0 0 ${PHI * 16}px;
  flex-grow: 1;
`;

// Read more link
const ReadMoreLink = styled(Link)`
  font-size: 0.9rem;
  font-weight: 500;
  color: ${props => props.theme.colors.primary[600]};
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  align-self: flex-start;
  
  svg {
    margin-left: 6px;
    transition: transform 0.2s ease;
  }
  
  &:hover {
    color: ${props => props.theme.colors.primary[700]};
    
    svg {
      transform: translateX(4px);
    }
  }
`;

// Author info
const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  margin-top: ${PHI * 16}px;
  padding-top: ${PHI * 16}px;
  border-top: 1px solid ${props => props.theme.colors.border.light};
`;

const AuthorAvatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 12px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const AuthorName = styled.span`
  font-size: 0.9rem;
  font-weight: 500;
  color: ${props => props.theme.colors.text.primary};
`;

// Icons
const CalendarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
    <path d="M16 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M8 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M3 10H21" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

interface ArticleCardProps {
  article: BlogArticle;
  delay?: number;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, delay = 0 }) => {
  const {
    id,
    title,
    slug,
    excerpt,
    date,
    category,
    image,
    author
  } = article;
  
  const formattedDate = formatDate(date);
  
  return (
    <CardContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: delay * 0.1 }}
    >
      <CardImage>
        <img src={image} alt={title} />
        <CategoryTag>{category.name}</CategoryTag>
      </CardImage>
      
      <CardContent>
        <CardMeta>
          <CardDate>
            <CalendarIcon />
            {formattedDate}
          </CardDate>
        </CardMeta>
        
        <CardTitle>
          <Link to={`/blog/${slug}`}>{title}</Link>
        </CardTitle>
        
        <CardExcerpt>{excerpt}</CardExcerpt>
        
        <ReadMoreLink to={`/blog/${slug}`}>
          Read more <ArrowRightIcon />
        </ReadMoreLink>
        
        {author && (
          <AuthorInfo>
            <AuthorAvatar>
              <img src={author.avatar} alt={author.name} />
            </AuthorAvatar>
            <AuthorName>{author.name}</AuthorName>
          </AuthorInfo>
        )}
      </CardContent>
    </CardContainer>
  );
};

export default ArticleCard; 