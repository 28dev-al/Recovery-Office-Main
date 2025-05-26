import * as React from 'react';
import styled from 'styled-components';

// Import base card component
import Card, { CardProps } from './Card';

// Import sacred geometry constants
import { PHI, PHI_INVERSE, FIBONACCI } from '../../../constants/sacred-geometry';

// Import components
import { Box, Flex } from '../layout';
import { Text } from '../typography';
import { Button } from '../button';

export interface ResourceCardProps extends Omit<CardProps, 'children'> {
  /** Resource title */
  title: string;
  
  /** Short summary or excerpt */
  summary: string;
  
  /** Cover image URL */
  imageUrl?: string;
  
  /** Author name */
  author?: string;
  
  /** Author avatar URL */
  authorAvatarUrl?: string;
  
  /** Publication date as string */
  publicationDate?: string;
  
  /** Read time in minutes */
  readTime?: number;
  
  /** Category or type of resource */
  category?: string;
  
  /** Tags associated with this resource */
  tags?: string[];
  
  /** URL to the full resource */
  url?: string;
  
  /** Action button text */
  ctaText?: string;
  
  /** Whether to truncate text with ellipsis */
  truncate?: boolean;
  
  /** Truncation length for title (characters) */
  titleMaxLength?: number;
  
  /** Truncation length for summary (characters) */
  summaryMaxLength?: number;
  
  /** Maximum number of tags to show */
  maxTags?: number;
  
  /** Whether the card should have hover effects */
  interactive?: boolean;
  
  /** Custom background color for card */
  backgroundColor?: string;
  
  /** Action to take when card is clicked */
  onClick?: () => void;
}

/**
 * ResourceCard Component
 * 
 * A specialized card component for displaying articles, blog posts, and
 * other resources with consistent styling and metadata.
 */
const ResourceCard: React.FC<ResourceCardProps> = ({
  title,
  summary,
  imageUrl,
  author,
  authorAvatarUrl,
  publicationDate,
  readTime,
  category,
  tags = [],
  url,
  ctaText = "Read More",
  truncate = true,
  titleMaxLength = 70,
  summaryMaxLength = 140,
  maxTags = 3,
  interactive = true,
  backgroundColor,
  variant = 'primary',
  elevated = true,
  onClick,
  ...restProps
}) => {
  // Function to truncate strings
  const truncateString = (str: string, maxLength: number) => {
    if (!truncate) return str;
    if (str.length <= maxLength) return str;
    return `${str.substring(0, maxLength)}...`;
  };
  
  // Calculate which tags to show
  const visibleTags = maxTags ? tags.slice(0, maxTags) : tags;
  const hiddenTagsCount = Math.max(0, tags.length - visibleTags.length);
  
  const handleCardClick = () => {
    if (onClick) {
      onClick();
    } else if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };
  
  return (
    <StyledResourceCard
      variant={variant}
      elevated={elevated}
      interactive={interactive}
      backgroundColor={backgroundColor}
      onClick={interactive ? handleCardClick : undefined}
      {...restProps}
    >
      <CardContent>
        {imageUrl && (
          <ImageContainer>
            <CardImage src={imageUrl} alt={title} />
            {category && <CategoryTag>{category}</CategoryTag>}
          </ImageContainer>
        )}
        
        <ContentContainer>
          <MetaContainer>
            {publicationDate && <PublishedDate>{publicationDate}</PublishedDate>}
            {readTime && <ReadTime>{readTime} min read</ReadTime>}
          </MetaContainer>
          
          <TitleContainer>
            <CardTitle>{truncateString(title, titleMaxLength)}</CardTitle>
          </TitleContainer>
          
          <SummaryContainer>
            <CardSummary>{truncateString(summary, summaryMaxLength)}</CardSummary>
          </SummaryContainer>
          
          {tags.length > 0 && (
            <TagsContainer>
              {visibleTags.map((tag, index) => (
                <Tag key={`tag-${index}`}>{tag}</Tag>
              ))}
              {hiddenTagsCount > 0 && (
                <MoreTagsLabel>+{hiddenTagsCount} more</MoreTagsLabel>
              )}
            </TagsContainer>
          )}
          
          <FooterContainer>
            {author && (
              <AuthorContainer>
                {authorAvatarUrl && (
                  <AuthorAvatar src={authorAvatarUrl} alt={author} />
                )}
                <AuthorName>{author}</AuthorName>
              </AuthorContainer>
            )}
            
            {url && ctaText && (
              <CtaButton 
                variant="outline" 
                size="sm"
                href={url}
                onClick={(e) => e.stopPropagation()}
              >
                {ctaText}
              </CtaButton>
            )}
          </FooterContainer>
        </ContentContainer>
      </CardContent>
    </StyledResourceCard>
  );
};

// Styled components
const StyledResourceCard = styled(Card)`
  transition: all 0.3s cubic-bezier(${PHI_INVERSE}, 0, ${1 - PHI_INVERSE}, 1);
  height: 100%;
  
  &:hover {
    transform: translateY(-${FIBONACCI[4]}px);
    box-shadow: ${props => props.theme.shadows.lg};
  }
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  overflow: hidden;
  border-top-left-radius: ${props => props.theme.radius.md}px;
  border-top-right-radius: ${props => props.theme.radius.md}px;
`;

const CardImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s cubic-bezier(${PHI_INVERSE}, 0, ${1 - PHI_INVERSE}, 1);
  
  ${StyledResourceCard}:hover & {
    transform: scale(${1 + PHI_INVERSE * 0.1});
  }
`;

const CategoryTag = styled.div`
  position: absolute;
  top: ${FIBONACCI[5]}px;
  left: ${FIBONACCI[5]}px;
  padding: ${FIBONACCI[3]}px ${FIBONACCI[5]}px;
  background-color: ${props => props.theme.colors.primary[500]};
  color: white;
  font-size: ${props => props.theme.typography.fontSize.xs}px;
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  border-radius: ${props => props.theme.radius.sm}px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: ${props => props.theme.shadows.sm};
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: ${FIBONACCI[6]}px;
`;

const MetaContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${FIBONACCI[5]}px;
`;

const PublishedDate = styled.span`
  font-size: ${props => props.theme.typography.fontSize.xs}px;
  color: ${props => props.theme.colors.text.tertiary};
  
  &:after {
    content: '•';
    display: inline-block;
    margin: 0 ${FIBONACCI[4]}px;
  }
`;

const ReadTime = styled.span`
  font-size: ${props => props.theme.typography.fontSize.xs}px;
  color: ${props => props.theme.colors.text.tertiary};
`;

const TitleContainer = styled.div`
  margin-bottom: ${FIBONACCI[5]}px;
`;

const CardTitle = styled.h3`
  font-family: ${props => props.theme.typography.fontFamily.heading};
  font-size: ${props => props.theme.typography.fontSize.lg}px;
  font-weight: ${props => props.theme.typography.fontWeight.semiBold};
  margin: 0;
  color: ${props => props.theme.colors.text.primary};
  line-height: 1.3;
`;

const SummaryContainer = styled.div`
  margin-bottom: ${FIBONACCI[5]}px;
  flex: 1;
`;

const CardSummary = styled.p`
  font-size: ${props => props.theme.typography.fontSize.sm}px;
  line-height: 1.6;
  color: ${props => props.theme.colors.text.secondary};
  margin: 0;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${FIBONACCI[4]}px;
  margin-bottom: ${FIBONACCI[6]}px;
`;

const Tag = styled.span`
  display: inline-block;
  padding: ${FIBONACCI[2]}px ${FIBONACCI[5]}px;
  background-color: ${props => props.theme.colors.background[100]};
  border-radius: ${props => props.theme.radius.sm}px;
  font-size: ${props => props.theme.typography.fontSize.xs}px;
  color: ${props => props.theme.colors.text.secondary};
`;

const MoreTagsLabel = styled.span`
  font-size: ${props => props.theme.typography.fontSize.xs}px;
  color: ${props => props.theme.colors.text.secondary};
  opacity: 0.7;
`;

const FooterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  padding-top: ${FIBONACCI[5]}px;
  border-top: 1px solid ${props => props.theme.colors.background[100]};
`;

const AuthorContainer = styled.div`
  display: flex;
  align-items: center;
`;

const AuthorAvatar = styled.img`
  width: ${FIBONACCI[7]}px;
  height: ${FIBONACCI[7]}px;
  border-radius: 50%;
  margin-right: ${FIBONACCI[4]}px;
  object-fit: cover;
  border: 1px solid ${props => props.theme.colors.background[200] ?? 1};
`;

const AuthorName = styled.span`
  font-size: ${props => props.theme.typography.fontSize.sm}px;
  color: ${props => props.theme.colors.text.primary};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
`;

const CtaButton = styled(Button)`
  padding: ${FIBONACCI[3]}px ${FIBONACCI[6]}px;
  font-size: ${props => props.theme.typography.fontSize.xs}px;
`;

export default ResourceCard; 