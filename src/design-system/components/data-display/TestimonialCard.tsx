import * as React from 'react';
import styled from 'styled-components';

// Import base card component
import Card, { CardProps } from './Card';

// Import sacred geometry constants
import { PHI, PHI_INVERSE, FIBONACCI } from '../../../constants/sacred-geometry';

// Import components
import { Box, Flex } from '../layout';
import { Text } from '../typography';

// Star rating icons
const StarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 1.66675L12.575 6.88341L18.3334 7.72508L14.1667 11.7834L15.15 17.5167L10 14.8167L4.85002 17.5167L5.83335 11.7834L1.66669 7.72508L7.42502 6.88341L10 1.66675Z" 
    fill="currentColor" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const EmptyStarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 1.66675L12.575 6.88341L18.3334 7.72508L14.1667 11.7834L15.15 17.5167L10 14.8167L4.85002 17.5167L5.83335 11.7834L1.66669 7.72508L7.42502 6.88341L10 1.66675Z" 
    fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export interface TestimonialCardProps extends Omit<CardProps, 'children'> {
  /** Client's quote */
  quote: string;
  
  /** Client name */
  clientName: string;
  
  /** Client location or company */
  clientInfo?: string;
  
  /** Rating out of 5 */
  rating?: number;
  
  /** Avatar image URL */
  avatarUrl?: string;
  
  /** Date of the testimonial */
  date?: string;
  
  /** Verification badge */
  verified?: boolean;
  
  /** Whether to use a decorative quote mark */
  showQuoteMark?: boolean;
  
  /** Accent color for the testimonial */
  accentColor?: string;
}

/**
 * TestimonialCard Component
 * 
 * A specialized card component for displaying client testimonials with
 * professional financial services styling.
 */
const TestimonialCard: React.FC<TestimonialCardProps> = ({
  quote,
  clientName,
  clientInfo,
  rating = 5,
  avatarUrl,
  date,
  verified = false,
  showQuoteMark = true,
  accentColor,
  variant = 'primary',
  elevated = true,
  ...restProps
}) => {
  // Generate star rating
  const renderStars = () => {
    const stars = [];
    const roundedRating = Math.round(rating * 2) / 2; // Round to nearest 0.5
    
    for (let i = 1; i <= 5; i++) {
      if (i <= roundedRating) {
        stars.push(<StarContainer key={i} $delay={i * 0.1}><StarIcon /></StarContainer>);
      } else {
        stars.push(<StarContainer key={i} $delay={i * 0.1}><EmptyStarIcon /></StarContainer>);
      }
    }
    
    return stars;
  };
  
  return (
    <StyledTestimonialCard
      variant={variant}
      elevated={elevated}
      $accentColor={accentColor}
      {...restProps}
    >
      {showQuoteMark && <QuoteMark>❝</QuoteMark>}
      
      <CardContent>
        {rating > 0 && (
          <StarRating>
            {renderStars()}
          </StarRating>
        )}
        
        <TestimonialQuote>
          {quote}
        </TestimonialQuote>
        
        <ClientInfo>
          {avatarUrl && (
            <AvatarContainer>
              <Avatar src={avatarUrl} alt={clientName} />
            </AvatarContainer>
          )}
          
          <ClientDetails>
            <ClientName>
              {clientName}
              {verified && <VerifiedBadge>✓</VerifiedBadge>}
            </ClientName>
            
            {clientInfo && (
              <ClientMeta>
                {clientInfo}
              </ClientMeta>
            )}
          </ClientDetails>
          
          {date && (
            <TestimonialDate>
              {date}
            </TestimonialDate>
          )}
        </ClientInfo>
      </CardContent>
      
      {accentColor && <AccentCorner $accentColor={accentColor} />}
    </StyledTestimonialCard>
  );
};

// Styled components
interface StyledTestimonialCardProps {
  $accentColor?: string;
}

const StyledTestimonialCard = styled(Card)<StyledTestimonialCardProps>`
  position: relative;
  overflow: visible;
  padding: ${FIBONACCI[7]}px;
  transition: all 0.3s cubic-bezier(${PHI_INVERSE}, 0, ${1 - PHI_INVERSE}, 1);
  
  &:hover {
    transform: translateY(-${FIBONACCI[4]}px);
    box-shadow: ${props => props.theme.shadows.lg};
  }
`;

const CardContent = styled.div`
  position: relative;
  z-index: 2;
`;

interface StarContainerProps {
  $delay: number;
}

const StarContainer = styled.span<StarContainerProps>`
  display: inline-flex;
  color: ${props => props.theme.colors.accent.gold};
  margin-right: ${FIBONACCI[3]}px;
  opacity: 0;
  animation: fadeIn 0.5s ease forwards;
  animation-delay: ${props => props.$delay}s;
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  &:last-child {
    margin-right: 0;
  }
`;

const StarRating = styled.div`
  display: flex;
  margin-bottom: ${FIBONACCI[5]}px;
`;

const TestimonialQuote = styled.blockquote`
  font-size: ${props => props.theme.typography.fontSize.md}px;
  line-height: 1.6;
  color: ${props => props.theme.colors.text.primary};
  margin: 0 0 ${FIBONACCI[6]}px 0;
  padding: 0;
  font-style: italic;
  position: relative;
  z-index: 2;
`;

const ClientInfo = styled.div`
  display: flex;
  align-items: center;
  margin-top: auto;
`;

const AvatarContainer = styled.div`
  margin-right: ${FIBONACCI[5]}px;
`;

const Avatar = styled.img`
  width: ${FIBONACCI[8]}px;
  height: ${FIBONACCI[8]}px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid ${props => props.theme.colors.background[200] ?? 1};
`;

const ClientDetails = styled.div`
  flex: 1;
`;

const ClientName = styled.div`
  font-weight: ${props => props.theme.typography.fontWeight.semiBold};
  color: ${props => props.theme.colors.text.primary};
  display: flex;
  align-items: center;
`;

const VerifiedBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${FIBONACCI[5]}px;
  height: ${FIBONACCI[5]}px;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.primary[500]};
  color: white;
  font-size: 10px;
  margin-left: ${FIBONACCI[4]}px;
`;

const ClientMeta = styled.div`
  font-size: ${props => props.theme.typography.fontSize.sm}px;
  color: ${props => props.theme.colors.text.secondary};
  margin-top: ${FIBONACCI[3]}px;
`;

const TestimonialDate = styled.div`
  font-size: ${props => props.theme.typography.fontSize.xs}px;
  color: ${props => props.theme.colors.text.tertiary};
  margin-left: auto;
  align-self: flex-end;
`;

const QuoteMark = styled.span`
  position: absolute;
  top: ${FIBONACCI[4]}px;
  left: ${FIBONACCI[4]}px;
  font-size: ${FIBONACCI[11]}px;
  line-height: 1;
  font-family: ${props => props.theme.typography.fontFamily.heading};
  color: ${props => props.theme.colors.background[200] ?? 1};
  opacity: 0.3;
  z-index: 1;
`;

interface AccentCornerProps {
  $accentColor: string;
}

const AccentCorner = styled.div<AccentCornerProps>`
  position: absolute;
  top: 0;
  right: 0;
  width: ${FIBONACCI[7]}px;
  height: ${FIBONACCI[7]}px;
  background-color: ${props => props.$accentColor};
  clip-path: polygon(0 0, 100% 0, 100% 100%);
`;

export default TestimonialCard; 