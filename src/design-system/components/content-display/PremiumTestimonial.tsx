/**
 * PremiumTestimonial Component
 * 
 * A premium testimonial component for displaying client quotes and testimonials
 * with professional styling for financial services.
 */

import * as React from 'react';
import styled from 'styled-components';
import { 
  PROFESSIONAL_EASINGS, 
  ANIMATION_DURATION 
} from '../../../constants/professional-animations';

// Types for testimonial props
export interface PremiumTestimonialProps {
  /**
   * The testimonial quote content
   */
  quote: string;
  
  /**
   * The name of the person giving the testimonial
   */
  name: string;
  
  /**
   * The title or position of the person
   */
  title?: string;
  
  /**
   * Company or organization name
   */
  company?: string;
  
  /**
   * Rating value (1-5)
   */
  rating?: number;
  
  /**
   * Avatar image URL or element
   */
  avatar?: string | React.ReactNode;
  
  /**
   * Company logo URL or element
   */
  companyLogo?: string | React.ReactNode;
  
  /**
   * Visual variant of the testimonial
   * @default 'card'
   */
  variant?: 'card' | 'simple' | 'featured';
  
  /**
   * Alignment of the testimonial
   * @default 'left'
   */
  align?: 'left' | 'center' | 'right';
  
  /**
   * Size of the testimonial
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';
  
  /**
   * Whether to show verification badge
   * @default false
   */
  verified?: boolean;
  
  /**
   * Source of the testimonial (e.g. "Google Reviews")
   */
  source?: string;
  
  /**
   * Link to the testimonial source
   */
  sourceLink?: string;
  
  /**
   * Additional class name
   */
  className?: string;
  
  /**
   * Data attribute for testing
   */
  'data-testid'?: string;
}

// Testimonial container
const TestimonialContainer = styled.div<{
  $variant: 'card' | 'simple' | 'featured';
  $align: 'left' | 'center' | 'right';
  $size: 'sm' | 'md' | 'lg';
}>`
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: ${props => props.$align};
  
  /* Variant-specific styles */
  ${props => {
    switch (props.$variant) {
      case 'card':
        return `
          padding: ${props.theme.spacing.lg}px;
          background-color: ${props.theme.colors.background[50]};
          border-radius: ${props.theme.radius.md}px;
          box-shadow: ${props.theme.shadows.sm};
        `;
      case 'featured':
        return `
          padding: ${props.theme.spacing.xl}px;
          background-color: ${props.theme.colors.background[100]};
          border-radius: ${props.theme.radius.lg}px;
          box-shadow: ${props.theme.shadows.md};
          border-top: 3px solid ${props.theme.colors.primary[500]};
        `;
      case 'simple':
      default:
        return `
          padding: ${props.theme.spacing.md}px 0;
        `;
    }
  }}
  
  /* Size-specific styles */
  ${props => {
    switch (props.$size) {
      case 'sm':
        return `
          max-width: 400px;
          font-size: ${props.theme.typography.fontSize.sm}px;
        `;
      case 'lg':
        return `
          max-width: 800px;
          font-size: ${props.theme.typography.fontSize.md}px;
        `;
      case 'md':
      default:
        return `
          max-width: 600px;
          font-size: ${props.theme.typography.fontSize.base}px;
        `;
    }
  }}
  
  /* Add transition for hover effects */
  transition: transform ${ANIMATION_DURATION.standard}s cubic-bezier(${PROFESSIONAL_EASINGS.standard.join(', ')}),
              box-shadow ${ANIMATION_DURATION.standard}s cubic-bezier(${PROFESSIONAL_EASINGS.standard.join(', ')});

  /* Add subtle hover effect for card variants */
  ${props => (props.$variant === 'card' || props.$variant === 'featured') && `
    &:hover {
      transform: translateY(-2px);
      box-shadow: ${props.theme.shadows.md};
    }
  `}
`;

// Quote container with quotes icon
const QuoteContainer = styled.div<{
  $variant: 'card' | 'simple' | 'featured';
  $align: 'left' | 'center' | 'right';
}>`
  position: relative;
  margin-bottom: ${props => props.theme.spacing.md}px;
  
  /* Add quote icons based on variant */
  ${props => props.$variant === 'featured' && `
    &::before {
      content: '"';
      position: absolute;
      top: -${props.theme.spacing.xl}px;
      ${props.$align === 'left' 
        ? `left: -${props.theme.spacing.md}px;` 
        : props.$align === 'right' 
          ? `right: -${props.theme.spacing.md}px;`
          : ''
      }
      font-size: ${props.theme.spacing.xl * 2}px;
      line-height: 1;
      font-family: ${props.theme.typography.fontFamily.heading};
      color: ${props.theme.colors.primary[300]};
      opacity: 0.5;
    }
  `}
`;

// Quote text
const Quote = styled.blockquote<{
  $variant: 'card' | 'simple' | 'featured';
  $size: 'sm' | 'md' | 'lg';
}>`
  margin: 0;
  padding: 0;
  color: ${props => props.theme.colors.text.primary};
  font-style: italic;
  line-height: 1.5;
  
  /* Size-specific styles */
  ${props => {
    switch (props.$size) {
      case 'sm':
        return `
          font-size: ${props.theme.typography.fontSize.sm}px;
          margin-bottom: ${props.theme.spacing.sm}px;
        `;
      case 'lg':
        return `
          font-size: ${props.theme.typography.fontSize.lg}px;
          margin-bottom: ${props.theme.spacing.lg}px;
        `;
      case 'md':
      default:
        return `
          font-size: ${props.theme.typography.fontSize.md}px;
          margin-bottom: ${props.theme.spacing.md}px;
        `;
    }
  }}
  
  /* Variant-specific styles */
  ${props => {
    switch (props.$variant) {
      case 'featured':
        return `
          font-weight: ${props.theme.typography.fontWeight.medium};
        `;
      default:
        return '';
    }
  }}
`;

// Citation container
const Citation = styled.footer<{
  $variant: 'card' | 'simple' | 'featured';
  $align: 'left' | 'center' | 'right';
}>`
  display: flex;
  flex-direction: ${props => props.$align === 'center' ? 'column' : 'row'};
  align-items: ${props => props.$align === 'center' ? 'center' : 'flex-start'};
  gap: ${props => props.theme.spacing.sm}px;
  margin-top: ${props => props.theme.spacing.md}px;
`;

// Avatar container
const AvatarContainer = styled.div<{
  $size: 'sm' | 'md' | 'lg';
}>`
  overflow: hidden;
  flex-shrink: 0;
  
  /* Size-specific styles */
  ${props => {
    switch (props.$size) {
      case 'sm':
        return `
          width: ${props.theme.spacing.xl}px;
          height: ${props.theme.spacing.xl}px;
          border-radius: ${props.theme.radius.circle};
        `;
      case 'lg':
        return `
          width: ${props.theme.spacing.xl * 2}px;
          height: ${props.theme.spacing.xl * 2}px;
          border-radius: ${props.theme.radius.circle};
        `;
      case 'md':
      default:
        return `
          width: ${props.theme.spacing.xl * 1.5}px;
          height: ${props.theme.spacing.xl * 1.5}px;
          border-radius: ${props.theme.radius.circle};
        `;
    }
  }}
  
  /* Add border for more polish */
  border: 2px solid ${props => props.theme.colors.background[300]};
`;

// Avatar image
const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

// Author info container
const AuthorInfo = styled.div<{
  $align: 'left' | 'center' | 'right';
}>`
  display: flex;
  flex-direction: column;
  text-align: ${props => props.$align};
`;

// Author name
const AuthorName = styled.div<{
  $size: 'sm' | 'md' | 'lg';
}>`
  font-weight: ${props => props.theme.typography.fontWeight.semiBold};
  font-family: ${props => props.theme.typography.fontFamily.heading};
  color: ${props => props.theme.colors.text.primary};
  
  /* Size-specific styles */
  ${props => {
    switch (props.$size) {
      case 'sm':
        return `font-size: ${props.theme.typography.fontSize.sm}px;`;
      case 'lg':
        return `font-size: ${props.theme.typography.fontSize.md}px;`;
      case 'md':
      default:
        return `font-size: ${props.theme.typography.fontSize.base}px;`;
    }
  }}
`;

// Author title and company
const AuthorTitle = styled.div<{
  $size: 'sm' | 'md' | 'lg';
}>`
  color: ${props => props.theme.colors.text.secondary};
  margin-top: ${props => props.theme.spacing.xxs}px;
  
  /* Size-specific styles */
  ${props => {
    switch (props.$size) {
      case 'sm':
        return `font-size: ${props.theme.typography.fontSize.xs}px;`;
      case 'lg':
        return `font-size: ${props.theme.typography.fontSize.sm}px;`;
      case 'md':
      default:
        return `font-size: ${props.theme.typography.fontSize.sm}px;`;
    }
  }}
`;

// Rating container
const RatingContainer = styled.div<{
  $size: 'sm' | 'md' | 'lg';
  $align: 'left' | 'center' | 'right';
}>`
  display: flex;
  justify-content: ${props => 
    props.$align === 'center' ? 'center' : 
    props.$align === 'right' ? 'flex-end' : 'flex-start'
  };
  margin-top: ${props => props.theme.spacing.sm}px;
  gap: ${props => props.theme.spacing.xxs}px;
`;

// Star icon component for rating
const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M8 1L10.1 5.3L15 6.1L11.5 9.4L12.5 14.3L8 12L3.5 14.3L4.5 9.4L1 6.1L5.9 5.3L8 1Z" 
      fill={filled ? "currentColor" : "none"} 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

// Company logo container
const CompanyLogoContainer = styled.div<{
  $variant: 'card' | 'simple' | 'featured';
  $size: 'sm' | 'md' | 'lg';
  $align: 'left' | 'center' | 'right';
}>`
  margin-top: ${props => props.theme.spacing.md}px;
  display: flex;
  justify-content: ${props => 
    props.$align === 'center' ? 'center' : 
    props.$align === 'right' ? 'flex-end' : 'flex-start'
  };
  
  /* Size-specific styles */
  ${props => {
    switch (props.$size) {
      case 'sm':
        return `
          max-height: ${props.theme.spacing.lg}px;
        `;
      case 'lg':
        return `
          max-height: ${props.theme.spacing.xl}px;
        `;
      case 'md':
      default:
        return `
          max-height: ${props.theme.spacing.lg * 1.25}px;
        `;
    }
  }}
  
  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    opacity: 0.85;
  }
`;

// Verification badge
const VerificationBadge = styled.div<{
  $size: 'sm' | 'md' | 'lg';
}>`
  display: inline-flex;
  align-items: center;
  background-color: ${props => props.theme.colors.background[100]};
  border: 1px solid ${props => props.theme.colors.feedback.success.main};
  color: ${props => props.theme.colors.feedback.success.main};
  padding: 2px 6px;
  border-radius: ${props => props.theme.radius.sm}px;
  margin-left: ${props => props.theme.spacing.xs}px;
  
  /* Size-specific styles */
  ${props => {
    switch (props.$size) {
      case 'sm':
        return `font-size: ${props.theme.typography.fontSize.xs}px;`;
      case 'lg':
        return `font-size: ${props.theme.typography.fontSize.sm}px;`;
      case 'md':
      default:
        return `font-size: ${props.theme.typography.fontSize.xs}px;`;
    }
  }}
  
  /* Checkmark icon */
  &::before {
    content: '';
    display: inline-block;
    width: 10px;
    height: 10px;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 10 10' fill='none'%3E%3Cpath d='M2 5L4 7L8 3' stroke='%2310B981' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: center;
    margin-right: 4px;
  }
`;

// Source container for testimonial attribution
const SourceContainer = styled.div<{
  $size: 'sm' | 'md' | 'lg';
  $align: 'left' | 'center' | 'right';
}>`
  margin-top: ${props => props.theme.spacing.sm}px;
  display: flex;
  justify-content: ${props => 
    props.$align === 'center' ? 'center' : 
    props.$align === 'right' ? 'flex-end' : 'flex-start'
  };
  font-size: ${props => {
    switch (props.$size) {
      case 'sm': return props.theme.typography.fontSize.xs;
      case 'lg': return props.theme.typography.fontSize.sm;
      case 'md':
      default: return props.theme.typography.fontSize.xs;
    }
  }}px;
  color: ${props => props.theme.colors.text.secondary};
  
  a {
    color: ${props => props.theme.colors.primary[600]};
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

/**
 * PremiumTestimonial Component
 * 
 * A premium testimonial component for displaying client quotes with
 * professional styling for financial services.
 */
export const PremiumTestimonial: React.FC<PremiumTestimonialProps> = ({
  quote,
  name,
  title,
  company,
  rating,
  avatar,
  companyLogo,
  variant = 'card',
  align = 'left',
  size = 'md',
  verified = false,
  source,
  sourceLink,
  className,
  'data-testid': testId = 'premium-testimonial',
}) => {
  // Render the avatar element based on the prop type
  const renderAvatar = () => {
    if (!avatar) return null;
    
    if (typeof avatar === 'string') {
      return <AvatarImage src={avatar} alt={`${name}'s avatar`} />;
    } else {
      return avatar;
    }
  };
  
  // Render the company logo based on the prop type
  const renderCompanyLogo = () => {
    if (!companyLogo) return null;
    
    if (typeof companyLogo === 'string') {
      return <img src={companyLogo} alt={company ? `${company} logo` : 'Company logo'} />;
    } else {
      return companyLogo;
    }
  };
  
  // Render the rating stars
  const renderRating = () => {
    if (!rating || rating < 1 || rating > 5) return null;
    
    return (
      <RatingContainer $size={size} $align={align}>
        {[1, 2, 3, 4, 5].map(starIndex => (
          <StarIcon 
            key={`star-${starIndex}`} 
            filled={starIndex <= Math.round(rating)} 
          />
        ))}
      </RatingContainer>
    );
  };
  
  // Render source attribution
  const renderSource = () => {
    if (!source) return null;
    
    return (
      <SourceContainer $size={size} $align={align}>
        {sourceLink ? (
          <a href={sourceLink} target="_blank" rel="noopener noreferrer">
            Source: {source}
          </a>
        ) : (
          <>Source: {source}</>
        )}
      </SourceContainer>
    );
  };
  
  return (
    <TestimonialContainer
      $variant={variant}
      $align={align}
      $size={size}
      className={className}
      data-testid={testId}
    >
      <QuoteContainer $variant={variant} $align={align}>
        <Quote $variant={variant} $size={size}>
          {quote}
        </Quote>
      </QuoteContainer>
      
      {renderRating()}
      
      <Citation $variant={variant} $align={align}>
        {avatar && (
          <AvatarContainer $size={size}>
            {renderAvatar()}
          </AvatarContainer>
        )}
        
        <AuthorInfo $align={align}>
          <AuthorName $size={size}>
            {name}
            {verified && <VerificationBadge $size={size}>Verified</VerificationBadge>}
          </AuthorName>
          {(title || company) && (
            <AuthorTitle $size={size}>
              {title}{title && company ? ', ' : ''}{company}
            </AuthorTitle>
          )}
        </AuthorInfo>
      </Citation>
      
      {companyLogo && (
        <CompanyLogoContainer $variant={variant} $size={size} $align={align}>
          {renderCompanyLogo()}
        </CompanyLogoContainer>
      )}
      
      {renderSource()}
    </TestimonialContainer>
  );
};

export default PremiumTestimonial; 