/**
 * Testimonials Component
 * 
 * A feature section for displaying client testimonials in golden ratio cards with
 * sacred geometry spacing and proportions. Includes support for various display styles
 * and botanical accents.
 */

import * as React from 'react';
import styled from 'styled-components';
import { PHI, PHI_INVERSE, FIBONACCI, getFibonacciByIndex } from '../../../constants/sacred-geometry';
import { Box } from '../layout/Box';
import { Section, SectionTitle } from '../layout/Section';
import { Text } from '../typography/Text';
import { BotanicalElement } from '../botanical';
import { BotanicalPosition } from '../botanical/botanicalUtils';
import { Heading } from '../typography/Heading';
import { FadeIn, SlideIn } from '../animation';
import { Button } from '../button/Button';
import Card from '../data-display/Card';
import { TestimonialItem, TestimonialsProps } from '../../types/feature-sections.types';
import { BotanicalDecoration } from '../../types/botanical.types';

// Re-export types
export type { TestimonialsProps, TestimonialItem } from '../../types/feature-sections.types';

// Section container with background styling
const TestimonialsSection = styled(Section)<{ $backgroundColor?: string }>`
  position: relative;
  background: ${props => props.$backgroundColor || 'transparent'};
  padding: ${getFibonacciByIndex(8)}px 0;
  overflow: hidden;
`;

// Grid container for testimonials using golden ratio proportions
const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(${getFibonacciByIndex(9)}px, 1fr));
  gap: ${getFibonacciByIndex(6)}px;
  margin-top: ${getFibonacciByIndex(7)}px;
  
  @media (max-width: ${props => props.theme.breakpoints.md}px) {
    grid-template-columns: repeat(auto-fill, minmax(${getFibonacciByIndex(8)}px, 1fr));
    gap: ${getFibonacciByIndex(5)}px;
  }
`;

// Individual testimonial card with golden ratio proportions
const TestimonialCard = styled(Card)<{ $accentColor?: string }>`
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  
  /* Use golden ratio for content/footer proportion */
  padding: ${getFibonacciByIndex(6)}px;
  
  /* Accent bar on left side if color provided */
  ${props => props.$accentColor && `
    border-left: 3px solid ${props.$accentColor};
  `}
  
  /* Use golden ratio for optimal line height */
  line-height: ${PHI};
  
  /* Box shadow adheres to Fibonacci sequence */
  box-shadow: 0 ${getFibonacciByIndex(2)}px ${getFibonacciByIndex(5)}px rgba(0, 0, 0, 0.05);
  
  /* Hover effect with sacred geometry timing */
  transition: transform 0.3s cubic-bezier(${PHI_INVERSE}, 0, ${PHI_INVERSE}, 1);
  
  &:hover {
    transform: translateY(-${getFibonacciByIndex(2)}px);
  }
`;

// Quote icon with sacred proportions
const QuoteIcon = styled.div`
  position: absolute;
  top: ${getFibonacciByIndex(4)}px;
  right: ${getFibonacciByIndex(4)}px;
  opacity: 0.1;
  font-size: ${getFibonacciByIndex(7)}px;
  line-height: 1;
  
  /* Use golden ratio for width/height proportion */
  width: ${getFibonacciByIndex(6)}px;
  height: ${getFibonacciByIndex(6) * PHI_INVERSE}px;
`;

// Content area with proper spacing
const TestimonialContent = styled(Text)`
  flex: 1;
  margin-bottom: ${getFibonacciByIndex(5)}px;
  position: relative;
  z-index: 1;
  
  /* Adding quotation marks with sacred spacing */
  &::before {
    content: '"';
    position: absolute;
    top: -${getFibonacciByIndex(5)}px;
    left: -${getFibonacciByIndex(3)}px;
    font-size: ${getFibonacciByIndex(7)}px;
    opacity: 0.2;
    font-family: serif;
  }
`;

// Author section with golden ratio spacing
const AuthorSection = styled.div`
  display: flex;
  align-items: center;
  margin-top: auto;
  padding-top: ${getFibonacciByIndex(5)}px;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
`;

// Author image container with golden circle
const AuthorImageContainer = styled.div`
  width: ${getFibonacciByIndex(6)}px;
  height: ${getFibonacciByIndex(6)}px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: ${getFibonacciByIndex(4)}px;
  flex-shrink: 0;
  
  /* Golden ratio box shadow */
  box-shadow: 0 ${getFibonacciByIndex(1)}px ${getFibonacciByIndex(3)}px rgba(0, 0, 0, 0.1);
`;

// Author name with proper typography
const AuthorName = styled(Text)`
  font-weight: 600;
`;

// Author role with decreased opacity using golden ratio
const AuthorRole = styled(Text)`
  opacity: ${PHI_INVERSE};
`;

// Star rating component with Fibonacci spacing
const RatingContainer = styled.div`
  display: flex;
  margin-bottom: ${getFibonacciByIndex(4)}px;
`;

const Star = styled.div<{ $filled: boolean }>`
  color: ${props => props.$filled ? '#FFD700' : '#E0E0E0'};
  margin-right: ${getFibonacciByIndex(2)}px;
`;

// Call-to-action container with centered alignment
const CTAContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${getFibonacciByIndex(7)}px;
`;

// Carousel container with proper sizing
const CarouselContainer = styled.div`
  display: flex;
  overflow-x: auto;
  margin: ${getFibonacciByIndex(7)}px -${getFibonacciByIndex(3)}px 0;
  padding: 0 ${getFibonacciByIndex(3)}px;
  scroll-snap-type: x mandatory;
  
  /* Hide scrollbar while maintaining functionality */
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
  
  /* Apply Fibonacci spacing between carousel items */
  & > * {
    margin-right: ${getFibonacciByIndex(6)}px;
    min-width: 80%;
    scroll-snap-align: center;
    
    @media (min-width: ${props => props.theme.breakpoints.md}) {
      min-width: 60%;
    }
    
    @media (min-width: ${props => props.theme.breakpoints.lg}) {
      min-width: 40%;
    }
    
    &:last-child {
      margin-right: 0;
    }
  }
`;

// Featured testimonial layout
const FeaturedContainer = styled.div`
  margin-top: ${getFibonacciByIndex(7)}px;
`;

const FeaturedTestimonial = styled(TestimonialCard)`
  margin-bottom: ${getFibonacciByIndex(6)}px;
  padding: ${getFibonacciByIndex(7)}px;
  
  ${TestimonialContent} {
    font-size: 1.2rem;
    line-height: ${PHI * 1.1};
  }
`;

const SecondaryTestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(${getFibonacciByIndex(9)}px, 1fr));
  gap: ${getFibonacciByIndex(5)}px;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: repeat(auto-fill, minmax(${getFibonacciByIndex(8)}px, 1fr));
  }
`;

/**
 * Testimonials component for displaying client endorsements in various layouts,
 * following sacred geometry principles for spacing and proportions.
 */
const Testimonials: React.FC<TestimonialsProps> = ({
  title,
  subtitle,
  testimonials,
  displayStyle = 'grid',
  backgroundColor,
  animated = true,
  botanical,
  cta,
  className,
  style,
}) => {
  /**
   * Render the star rating component
   */
  const renderRating = (rating: number) => {
    return (
      <RatingContainer>
        {[1, 2, 3, 4, 5].map(star => (
          <Star key={star} $filled={star <= rating}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
            </svg>
          </Star>
        ))}
      </RatingContainer>
    );
  };
  
  /**
   * Render an individual testimonial card
   */
  const renderTestimonialCard = (testimonial: TestimonialItem, index: number) => {
    const content = (
      <TestimonialCard $accentColor={testimonial.accentColor}>
        <QuoteIcon>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.29 16.29C6.58 16.58 7 16.69 7.38 16.56C7.76 16.42 8 16.07 8 15.67V13C8 12.45 7.55 12 7 12H4C3.45 12 3 11.55 3 11V8C3 7.45 3.45 7 4 7H7C8.1 7 9 7.9 9 9V15.67C9 16.95 8.22 18.12 7 18.66C5.78 19.2 4.39 19.05 3.34 18.29C2.9 17.97 2.82 17.35 3.14 16.91C3.46 16.46 4.08 16.37 4.52 16.7C5.12 17.15 5.95 17.05 6.29 16.29ZM15.3 16.29C15.59 16.58 16.01 16.69 16.39 16.56C16.77 16.42 17.01 16.07 17.01 15.67V13C17.01 12.45 16.56 12 16.01 12H13.01C12.46 12 12.01 11.55 12.01 11V8C12.01 7.45 12.46 7 13.01 7H16.01C17.11 7 18.01 7.9 18.01 9V15.67C18.01 16.95 17.23 18.12 16.01 18.66C14.79 19.2 13.4 19.05 12.35 18.29C11.91 17.97 11.83 17.35 12.15 16.91C12.47 16.46 13.09 16.37 13.53 16.7C14.13 17.15 14.95 17.05 15.3 16.29Z" />
          </svg>
        </QuoteIcon>
        
        {testimonial.rating && renderRating(testimonial.rating)}
        
        <TestimonialContent>
          {testimonial.content}
        </TestimonialContent>
        
        <AuthorSection>
          {testimonial.authorImage && (
            <AuthorImageContainer>
              <img 
                src={testimonial.authorImage} 
                alt={testimonial.author} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </AuthorImageContainer>
          )}
          <div>
            <AuthorName>{testimonial.author}</AuthorName>
            {testimonial.authorRole && (
              <AuthorRole>{testimonial.authorRole}</AuthorRole>
            )}
          </div>
        </AuthorSection>
      </TestimonialCard>
    );
    
    if (animated) {
      return (
        <FadeIn key={testimonial.id} delay={index * 0.1}>
          {content}
        </FadeIn>
      );
    }
    
    return <div key={testimonial.id}>{content}</div>;
  };
  
  /**
   * Render testimonials in a grid layout
   */
  const renderGrid = () => {
    return (
      <TestimonialsGrid>
        {testimonials.map((testimonial, index) => renderTestimonialCard(testimonial, index))}
      </TestimonialsGrid>
    );
  };
  
  /**
   * Render testimonials in a carousel layout
   */
  const renderCarousel = () => {
    return (
      <CarouselContainer>
        {testimonials.map((testimonial, index) => (
          <div key={testimonial.id}>
            {renderTestimonialCard(testimonial, index)}
          </div>
        ))}
      </CarouselContainer>
    );
  };
  
  /**
   * Render testimonials with a featured item and grid
   */
  const renderFeatured = () => {
    if (testimonials.length === 0) return null;
    
    const [featured, ...rest] = testimonials;
    
    const featuredContent = (
      <FeaturedTestimonial $accentColor={featured.accentColor}>
        <QuoteIcon>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.29 16.29C6.58 16.58 7 16.69 7.38 16.56C7.76 16.42 8 16.07 8 15.67V13C8 12.45 7.55 12 7 12H4C3.45 12 3 11.55 3 11V8C3 7.45 3.45 7 4 7H7C8.1 7 9 7.9 9 9V15.67C9 16.95 8.22 18.12 7 18.66C5.78 19.2 4.39 19.05 3.34 18.29C2.9 17.97 2.82 17.35 3.14 16.91C3.46 16.46 4.08 16.37 4.52 16.7C5.12 17.15 5.95 17.05 6.29 16.29ZM15.3 16.29C15.59 16.58 16.01 16.69 16.39 16.56C16.77 16.42 17.01 16.07 17.01 15.67V13C17.01 12.45 16.56 12 16.01 12H13.01C12.46 12 12.01 11.55 12.01 11V8C12.01 7.45 12.46 7 13.01 7H16.01C17.11 7 18.01 7.9 18.01 9V15.67C18.01 16.95 17.23 18.12 16.01 18.66C14.79 19.2 13.4 19.05 12.35 18.29C11.91 17.97 11.83 17.35 12.15 16.91C12.47 16.46 13.09 16.37 13.53 16.7C14.13 17.15 14.95 17.05 15.3 16.29Z" />
          </svg>
        </QuoteIcon>
        
        {featured.rating && renderRating(featured.rating)}
        
        <TestimonialContent variant="h5">
          {featured.content}
        </TestimonialContent>
        
        <AuthorSection>
          {featured.authorImage && (
            <AuthorImageContainer>
              <img 
                src={featured.authorImage} 
                alt={featured.author} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </AuthorImageContainer>
          )}
          <div>
            <AuthorName>{featured.author}</AuthorName>
            {featured.authorRole && (
              <AuthorRole>{featured.authorRole}</AuthorRole>
            )}
          </div>
        </AuthorSection>
      </FeaturedTestimonial>
    );
    
    return (
      <FeaturedContainer>
        {animated ? <FadeIn>{featuredContent}</FadeIn> : featuredContent}
        
        {rest.length > 0 && (
          <SecondaryTestimonialsGrid>
            {rest.map((testimonial, index) => renderTestimonialCard(testimonial, index + 1))}
          </SecondaryTestimonialsGrid>
        )}
      </FeaturedContainer>
    );
  };
  
  /**
   * Render testimonials based on the selected display style
   */
  const renderTestimonials = () => {
    switch (displayStyle) {
      case 'carousel':
        return renderCarousel();
      case 'featured':
        return renderFeatured();
      case 'grid':
      default:
        return renderGrid();
    }
  };
  
  return (
    <TestimonialsSection
      $backgroundColor={backgroundColor}
      className={className}
      style={style}
    >
      {botanical && typeof botanical !== 'boolean' && (
        <BotanicalElement
          variant={botanical.type}
          size={botanical.size || 'lg'}
          opacity={botanical.opacity || 0.1}
        />
      )}
      
      {botanical && typeof botanical === 'boolean' && (
        <BotanicalElement
          variant="oliveBranch"
          size="lg"
          opacity={0.1}
        />
      )}
      
      <SectionTitle 
        title={title} 
        subtitle={subtitle} 
        align="center"
      />
      
      {renderTestimonials()}
      
      {cta && (
        <CTAContainer>
          <Button variant={cta.variant || 'primary'} href={cta.url}>
            {cta.label}
          </Button>
        </CTAContainer>
      )}
    </TestimonialsSection>
  );
};

export default Testimonials; 







