/**
 * ContactTestimonials Section Component
 * 
 * Displays selected testimonials related to client experience using sacred geometry principles.
 * Features carousel layout and botanical decorations.
 */

import * as React from 'react';
import { useState, useCallback } from 'react';
import { Box, Container } from '../../../design-system/components/layout';
import { Section, SectionTitle, SectionContent } from '../../../design-system/components/layout/Section';
import { Text } from '../../../design-system/components/typography';
import { Card } from '../../../design-system/components/data-display';
import { Button } from '../../../design-system/components/button';
import { OliveBranch, VesicaPiscis } from '../../../design-system/botanical';

import { ScrollReveal, FadeIn } from '../../../animation';
import { PHI } from '../../../constants/sacred-geometry';

// Testimonial data interface
interface Testimonial {
  id: string;
  text: string;
  author: string;
  location: string;
  experience: string;
  rating: number;
}

interface ContactTestimonialsProps {
  /**
   * Background color for the section
   */
  backgroundColor?: string;
  /**
   * Optional custom testimonials data
   */
  testimonials?: Testimonial[];
}

// Default testimonials with focus on client experience
const defaultTestimonials: Testimonial[] = [
  {
    id: 't1',
    text: "From the moment I reached out to Recovery Office, their care and attention to detail was evident. The team took time to understand my needs before my first session, and the intake process was seamless. Their communication is excellent!",
    author: "Rebecca M.",
    location: "Oakland, CA",
    experience: "First-time client",
    rating: 5
  },
  {
    id: 't2',
    text: "I was hesitant to try a therapy approach based on sacred geometry, but the team at Recovery Office made the introduction so welcoming. They respond quickly to all messages and are incredibly accommodating with scheduling.",
    author: "Michael K.",
    location: "Golden Springs, CA",
    experience: "Regular client - 6 months",
    rating: 5
  },
  {
    id: 't3',
    text: "What impressed me most about Recovery Office was how personalized the entire experience felt. From my first phone call to ongoing sessions, they remember small details and tailor everything to my specific needs.",
    author: "Sophia J.",
    location: "San Francisco, CA",
    experience: "Long-term client - 2 years",
    rating: 5
  }
];

// Testimonial Card component
const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => (
  <Card
    elevation={2}
    padding={`${PHI * 24}px`}
    borderRadius="8px"
    style={{
      position: 'relative',
      backgroundColor: 'white',
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }}
  >
    {/* Quote symbol */}
    <div
      style={{
        position: 'absolute',
        top: `${PHI * 8}px`,
        left: `${PHI * 8}px`,
        fontSize: `${PHI * PHI * 20}px`,
        lineHeight: '1',
        fontFamily: 'serif',
        color: 'rgba(74, 110, 179, 0.1)'
      }}
    >
      "
    </div>
    
    {/* Rating stars */}
    <Box
      display="flex"
      justifyContent="flex-end"
      mb={`${PHI * 8}px`}
    >
      {[...Array(testimonial.rating)].map((_, i) => (
        <Text key={`star-${i}`} style={{ color: '#f9c846', marginLeft: '2px', fontSize: '18px' }}>★</Text>
      ))}
    </Box>
    
    {/* Testimonial text */}
    <div
      style={{
        fontVariant: 'body2',
        fontSize: 'md',
        fontStyle: 'italic',
        marginBottom: `${PHI * 16}px`,
        paddingLeft: `${PHI * 8}px`,
        flex: 1
      }}
    >
      {testimonial.text}
    </div>
    
    {/* Author information */}
    <Box
      pt={`${PHI * 8}px`}
      style={{
        borderTop: '1px solid rgba(0,0,0,0.05)'
      }}
    >
      <Text
        variant="subtitle2"
        style={{
          fontWeight: 600,
          color: '#4a6eb3'
        }}
      >
        {testimonial.author}
      </Text>
      <Text
        variant="body2"
        style={{
          fontSize: 'sm',
          color: 'gray.600'
        }}
      >
        {testimonial.location} • {testimonial.experience}
      </Text>
    </Box>
  </Card>
);

const ContactTestimonials: React.FC<ContactTestimonialsProps> = ({
  backgroundColor = "#ffffff",
  testimonials = defaultTestimonials
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Calculate total number of testimonials
  const testimonialCount = testimonials.length;
  
  // Handle next testimonial
  const handleNext = useCallback(() => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonialCount);
  }, [testimonialCount]);
  
  // Handle previous testimonial
  const handlePrev = useCallback(() => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonialCount) % testimonialCount);
  }, [testimonialCount]);

  return (
    <Section backgroundColor={backgroundColor}>
      <Container>
        <ScrollReveal>
          <Box position="relative">
            {/* Decorative botanical element */}
            <Box
              position="absolute"
              top={`${-PHI * 30}px`}
              right={`${-PHI * 20}px`}
              opacity={0.05}
              zIndex={0}
            >
              <OliveBranch size="xl" />
            </Box>
            
            <SectionTitle 
              title="Client Experiences" 
              subtitle="What our clients say about working with us"
              decoratorBefore={<VesicaPiscis size="sm" opacity={0.3} />}
            />
            
            <SectionContent>
              {/* Mobile view - single testimonial with navigation */}
              <div
                style={{ 
                  display: 'block',
                  position: 'relative'
                }}
                className="mobile-testimonial"
              >
                <FadeIn key={testimonials[activeIndex]?.id || `testimonial-${activeIndex}`}>
                  <TestimonialCard testimonial={testimonials[activeIndex]} />
                </FadeIn>
                
                {/* Navigation controls */}
                <Box 
                  display="flex" 
                  justifyContent="center" 
                  mt={`${PHI * 16}px`}
                  gap={`${PHI * 8}px`}
                >
                  <Button
                    variant="outline"
                    size="small"
                    onClick={handlePrev}
                    aria-label="Previous testimonial"
                  >
                    Previous
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="small"
                    onClick={handleNext}
                    aria-label="Next testimonial"
                  >
                    Next
                  </Button>
                </Box>
              </div>
              
              {/* Tablet/Desktop view - all testimonials in grid */}
              <div
                style={{ 
                  display: 'none',
                  gridTemplateColumns: `repeat(${testimonials.length}, 1fr)`,
                  gap: `${PHI * 24}px`
                }}
                className="desktop-testimonial"
              >
                {testimonials.map((testimonial) => (
                  <FadeIn key={testimonial.id}>
                    <TestimonialCard testimonial={testimonial} />
                  </FadeIn>
                ))}
              </div>
              
              {/* Call to action */}
              <Box
                mt={`${PHI * 32}px`}
                textAlign="center"
              >
                <Button
                  variant="secondary"
                  size="medium"
                  as="a"
                  href="/testimonials"
                  aria-label="View all client testimonials"
                >
                  View All Testimonials
                </Button>
              </Box>
            </SectionContent>
          </Box>
        </ScrollReveal>
      </Container>
    </Section>
  );
};

export default ContactTestimonials; 












