// TODO: This file contains direct window access without SSR checks
/**
 * HomeTestimonials Component
 * 
 * Displays client testimonials on the home page using sacred geometry principles
 * for layout, animations, and design. Implements a carousel for multiple testimonials.
 */

import * as React from 'react';
import { useState, useEffect } from 'react';;
import styled from 'styled-components';
import { Box, Container, Flex } from '../../../design-system/components/layout';
import { Heading, Text, Paragraph } from '../../../design-system/components/typography';
import { Button } from '../../../design-system/components/button';
import { Section, SectionHeading } from '../../../components/section';
import { FadeIn, ScrollReveal } from '../../../animation';
import { OliveLeaf, FlowerOfLife } from '../../../design-system/botanical';
import { 
  SACRED_SPACING, 
  PHI, 
  PHI_INVERSE, 
  SACRED_EASINGS
} from '../../../constants/sacred-geometry';
import { ANIMATION_TIMING } from '../../../constants/sacred-geometry';

// Testimonial interface
interface Testimonial {
  id: string;
  quote: string;
  author: string;
  position: string;
  company: string;
  imageUrl: string;
  rating: number;
}

// Styled components
const TestimonialsContainer = styled(Box)`
  position: relative;
  overflow: hidden;
  padding: ${SACRED_SPACING.xl}px 0;
`;

const TestimonialCarousel = styled(Box)`
  position: relative;
  width: 100%;
  max-width: ${1200}px;
  margin: 0 auto;
  overflow: hidden;
`;

const TestimonialSlider = styled(Flex)<{ $translate: number }>`
  display: flex;
  transform: translateX(-${props => props.$translate}%);
  transition: transform 0.6s cubic-bezier(${SACRED_EASINGS.standard.join(', ')});
`;

const TestimonialCard = styled(Box)`
  flex: 0 0 100%;
  padding: ${SACRED_SPACING.lg}px;
  
  @media (min-width: 768px) {
    flex: 0 0 50%;
  }
  
  @media (min-width: 1024px) {
    flex: 0 0 ${100 * PHI_INVERSE}%; /* Golden ratio proportion */
  }
`;

const TestimonialContent = styled(Box)`
  background: white;
  padding: ${SACRED_SPACING.xl}px;
  border-radius: ${PHI_INVERSE * 10}px;
  box-shadow: 0 ${SACRED_SPACING.xs}px ${SACRED_SPACING.md}px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const QuoteIcon = styled(Box)`
  position: absolute;
  top: ${SACRED_SPACING.md}px;
  left: ${SACRED_SPACING.md}px;
  color: var(--color-primary-light);
  opacity: 0.2;
  font-size: ${SACRED_SPACING.xl}px;
  font-family: Georgia, serif;
`;

const AuthorContainer = styled(Flex)`
  margin-top: ${SACRED_SPACING.lg}px;
  align-items: center;
`;

const AuthorImage = styled.img`
  width: ${SACRED_SPACING.xl}px;
  height: ${SACRED_SPACING.xl}px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: ${SACRED_SPACING.md}px;
  border: 2px solid var(--color-primary-light);
`;

const RatingContainer = styled(Flex)`
  margin-top: ${SACRED_SPACING.sm}px;
`;

const StarIcon = styled.span<{ $active: boolean }>`
  color: ${props => props.$active ? 'var(--color-warning-main)' : 'var(--color-gray-300)'};
  margin-right: 2px;
`;

const CarouselControls = styled(Flex)`
  justify-content: center;
  margin-top: ${SACRED_SPACING.xl}px;
`;

const CarouselDot = styled.button<{ $active: boolean }>`
  width: ${SACRED_SPACING.xs}px;
  height: ${SACRED_SPACING.xs}px;
  border-radius: 50%;
  border: none;
  background-color: ${props => props.$active ? 'var(--color-primary-main)' : 'var(--color-gray-300)'};
  margin: 0 ${SACRED_SPACING.xs}px;
  padding: 0;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.$active ? 'var(--color-primary-dark)' : 'var(--color-gray-400)'};
  }
`;

const CarouselButton = styled(Button)`
  padding: ${SACRED_SPACING.xs}px ${SACRED_SPACING.sm}px;
  min-width: unset;
  margin: 0 ${SACRED_SPACING.sm}px;
`;

const BotanicalDecoration = styled(Box)`
  position: absolute;
  z-index: 0;
  opacity: 0.1;
  
  &.top-right {
    top: ${SACRED_SPACING.md}px;
    right: ${SACRED_SPACING.md}px;
    transform: rotate(${45}deg);
  }
  
  &.bottom-left {
    bottom: ${SACRED_SPACING.md}px;
    left: ${SACRED_SPACING.md}px;
    transform: rotate(${-45}deg);
  }
`;

/**
 * HomeTestimonials Component
 * 
 * Showcases client testimonials using sacred geometry principles
 * for layout proportions, animations, and visual harmony.
 */
const HomeTestimonials: React.FC = () => {
  // Sample testimonials data
  const testimonials: Testimonial[] = [
    {
      id: 't1',
      quote: "Recovery Office provided exceptional guidance throughout my financial recovery journey. Their expertise in regulatory frameworks and commitment to transparency made all the difference in reclaiming my assets.",
      author: "Michael J.",
      position: "Small Business Owner",
      company: "Crafted Designs",
      imageUrl: "/assets/images/testimonials/testimonial-1.jpg",
      rating: 5
    },
    {
      id: 't2',
      quote: "After losing significant investments to a sophisticated scam, I was devastated. The team at Recovery Office not only helped me recover 80% of my assets but also educated me on protecting myself from future fraud.",
      author: "Sarah L.",
      position: "Investment Professional",
      company: "Financial Horizons",
      imageUrl: "/assets/images/testimonials/testimonial-2.jpg",
      rating: 5
    },
    {
      id: 't3',
      quote: "What impressed me most about Recovery Office was their holistic approach. They didn't just focus on the recovery process but ensured I understood every step and gained knowledge to prevent future problems.",
      author: "James T.",
      position: "Retired Teacher",
      company: "",
      imageUrl: "/assets/images/testimonials/testimonial-3.jpg",
      rating: 4
    },
    {
      id: 't4',
      quote: "The professionalism and expertise of Recovery Office are unmatched. They navigated complex regulatory requirements with ease and recovered funds I thought were permanently lost to cryptocurrency fraud.",
      author: "Elena R.",
      position: "Technology Entrepreneur",
      company: "InnovateTech",
      imageUrl: "/assets/images/testimonials/testimonial-4.jpg",
      rating: 5
    }
  ];
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [translate, setTranslate] = useState(0);
  
  // Calculate how many testimonials to show at once based on screen size
  const [itemsPerView, setItemsPerView] = useState(1);
  
  // Update items per view based on window size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerView(3); // Show 3 on large screens (using golden ratio proportions)
      } else if (window.innerWidth >= 768) {
        setItemsPerView(2); // Show 2 on medium screens
      } else {
        setItemsPerView(1); // Show 1 on small screens
      }
    };
    
    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Update translate when current index changes
  useEffect(() => {
    setTranslate(currentIndex * (100 / itemsPerView));
  }, [currentIndex, itemsPerView]);
  
  // Handle navigation
  const goToPrev = () => {
    setCurrentIndex(prev => (prev > 0 ? prev - 1 : 0));
  };
  
  const goToNext = () => {
    setCurrentIndex(prev => (prev < testimonials.length - itemsPerView ? prev + 1 : prev));
  };
  
  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };
  
  // Generate rating stars
  const renderRating = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <StarIcon key={i} $active={i < rating}>★</StarIcon>
      );
    }
    return stars;
  };

  return (
    <Section
      variant="light"
      pt={SACRED_SPACING.xxl}
      pb={SACRED_SPACING.xxl}
      id="testimonials"
    >
      <Container>
        <TestimonialsContainer>
          {/* Botanical decorations */}
          <BotanicalDecoration className="top-right">
            <FlowerOfLife width={150} />
          </BotanicalDecoration>
          
          <BotanicalDecoration className="bottom-left">
            <OliveLeaf width={120} />
          </BotanicalDecoration>
          
          {/* Section heading */}
          <ScrollReveal>
            <SectionHeading
              title="Client Testimonials"
              subtitle="What our clients say about their recovery journey with us"
              align="center"
              size="large"
              marginBottom={SACRED_SPACING.xl}
            />
          </ScrollReveal>
          
          {/* Testimonials carousel */}
          <TestimonialCarousel>
            <TestimonialSlider $translate={translate}>
              {testimonials.map((testimonial, index) => (
                <TestimonialCard key={testimonial.id}>
                  <FadeIn delay={ANIMATION_TIMING.quick * (index % 3)}>
                    <TestimonialContent>
                      <QuoteIcon>"</QuoteIcon>
                      
                      <Paragraph
                        variant="body1"
                        style={{ fontStyle: 'italic' }}
                      >
                        {testimonial.quote}
                      </Paragraph>
                      
                      <RatingContainer>
                        {renderRating(testimonial.rating)}
                      </RatingContainer>
                      
                      <AuthorContainer>
                        <AuthorImage
                          src={testimonial.imageUrl}
                          alt={testimonial.author}
                        />
                        <Box>
                          <Text
                            variant="h6"
                            fontWeight="bold"
                          >
                            {testimonial.author}
                          </Text>
                          <Text
                            variant="caption"
                            color="gray.600"
                          >
                            {testimonial.position}
                            {testimonial.company && `, ${testimonial.company}`}
                          </Text>
                        </Box>
                      </AuthorContainer>
                    </TestimonialContent>
                  </FadeIn>
                </TestimonialCard>
              ))}
            </TestimonialSlider>
          </TestimonialCarousel>
          
          {/* Carousel controls */}
          <CarouselControls>
            <CarouselButton
              variant="outline"
              size="small"
              onClick={goToPrev}
              disabled={currentIndex === 0}
            >
              ←
            </CarouselButton>
            
            {Array.from({ length: testimonials.length - itemsPerView + 1 }).map((_, index) => (
              <CarouselDot
                key={index}
                $active={currentIndex === index}
                onClick={() => goToSlide(index)}
              />
            ))}
            
            <CarouselButton
              variant="outline"
              size="small"
              onClick={goToNext}
              disabled={currentIndex >= testimonials.length - itemsPerView}
            >
              →
            </CarouselButton>
          </CarouselControls>
        </TestimonialsContainer>
      </Container>
    </Section>
  );
};

export default HomeTestimonials; 











