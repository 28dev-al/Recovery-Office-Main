/**
 * Testimonials Section Component
 * 
 * Showcases client testimonials with sacred geometry principles in design.
 * Uses golden ratio for layout and includes botanical elements.
 */

import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { Section } from '../../../design-system/components/layout/Section';
import SectionTitle from '../../../design-system/components/typography/SectionTitle';
import { Text } from '../../../design-system/components/typography/Text';
import { Box } from '../../../design-system/components/layout';
import { Card } from '../../../design-system/components/data-display';
import { Button } from '../../../design-system/components/button';
import { PHI, PHI_INVERSE, SACRED_SPACING } from '../../../constants/sacred-geometry';
import { VesicaPiscis, FlowerOfLife } from '../../../design-system/botanical';
import { FadeIn } from '../../../animation';

const StyledSection = styled(Section)`
  position: relative;
  overflow: hidden;
  background: linear-gradient(
    to bottom,
    rgba(245, 247, 250, 0.9),
    rgba(235, 242, 248, 0.8)
  );
  padding: ${SACRED_SPACING.xl}px 0;
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${SACRED_SPACING.md}px;
`;

const TestimonialCard = styled(Card)`
  position: relative;
  border-radius: 8px;
  padding: ${SACRED_SPACING.lg}px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease-in-out;
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-${SACRED_SPACING.xs}px);
  }
`;

const QuoteSymbol = styled.div`
  position: absolute;
  top: ${-SACRED_SPACING.md * PHI_INVERSE}px;
  left: ${SACRED_SPACING.md}px;
  font-size: ${SACRED_SPACING.xl * PHI}px;
  color: rgba(74, 110, 179, 0.1);
  font-family: serif;
  line-height: 1;
`;

const BackgroundDecoration = styled.div`
  position: absolute;
  top: ${SACRED_SPACING.xl}px;
  right: ${-SACRED_SPACING.xl * 0.5}px;
  opacity: 0.05;
  transform: rotate(${PHI * 30}deg);
  z-index: 0;
`;

const testmonialData = [
  {
    id: 'testimonial-1',
    text: "The approach at Recovery Office is unlike anything I've experienced before. The attention to detail in how they structured my therapy plan—following what they call sacred geometry principles—made a noticeable difference in my recovery time.",
    author: "Sarah M.",
    location: "Portland, OR",
    treatmentType: "Post-surgery rehabilitation",
    rating: 5,
    accentColor: "#4a6eb3"
  },
  {
    id: 'testimonial-2',
    text: "I was skeptical at first about the whole sacred geometry concept, but after just three sessions, I became a believer. There's something about the way the exercises are designed that feels intuitive to my body. My chronic pain has decreased dramatically.",
    author: "Michael L.",
    location: "Chicago, IL",
    treatmentType: "Chronic back pain",
    rating: 5,
    accentColor: "#63a98c"
  },
  {
    id: 'testimonial-3',
    text: "The team at Recovery Office truly understands the connection between mind and body healing. Their unique approach that incorporates sacred proportions into therapy has accelerated my recovery in ways traditional physical therapy never did.",
    author: "Jennifer K.",
    location: "Austin, TX",
    treatmentType: "Sports injury",
    rating: 5,
    accentColor: "#86b378"
  },
  {
    id: 'testimonial-4',
    text: "What makes Recovery Office special is how they personalize everything. My therapeutic program was designed specifically for me using golden ratio proportions, and I could feel the difference immediately. The botanical elements they incorporate also create a naturally healing environment.",
    author: "David R.",
    location: "Seattle, WA",
    treatmentType: "Stroke recovery",
    rating: 5,
    accentColor: "#b37c4a"
  },
  {
    id: 'testimonial-5',
    text: "After trying multiple traditional therapy options with limited success, I found Recovery Office. Their approach is refreshingly different and effective. The integration of sacred geometry principles into my exercise routine has improved my mobility beyond what I thought possible.",
    author: "Emma T.",
    location: "Boston, MA",
    treatmentType: "Joint rehabilitation",
    rating: 5,
    accentColor: "#5d6e8f"
  },
  {
    id: 'testimonial-6',
    text: "Recovery Office has transformed my understanding of what healing can be. The sacred geometry principles they apply might sound unusual at first, but the results speak for themselves. My recovery has been noticeably faster and more complete.",
    author: "Robert J.",
    location: "Denver, CO",
    treatmentType: "Post-accident recovery",
    rating: 5,
    accentColor: "#d4a76a"
  }
];

const TestimonialsSection: React.FC = () => {
  const [visibleTestimonials, setVisibleTestimonials] = useState(3);
  
  const handleLoadMore = () => {
    setVisibleTestimonials(Math.min(testmonialData.length, visibleTestimonials + 3));
  };
  
  return (
    <StyledSection id="testimonials">
      <BackgroundDecoration>
        <VesicaPiscis size="xl" />
      </BackgroundDecoration>
      
      <ContentContainer>
        <SectionTitle 
          title="Client Testimonials" 
          subtitle="Experiences from those we've helped"
          decoratorBefore={<VesicaPiscis size="sm" opacity={0.3} />}
        />
        
        <Box 
          mt={SACRED_SPACING.lg} 
          display="grid" 
          gridTemplateColumns={{ _xs: "1fr", _sm: "1fr", _md: "1fr 1fr", _lg: "1fr 1fr 1fr" }}
          gap={SACRED_SPACING.lg * PHI}
        >
          {testmonialData.slice(0, visibleTestimonials).map((testimonial, index) => (
            <FadeIn key={testimonial.id} delay={index * 0.1}>
              <TestimonialCard elevation={3}>
                <QuoteSymbol>&quot;</QuoteSymbol>
                <Box position="relative" zIndex={1}>
                  <Box display="flex" justifyContent="flex-end" mb={SACRED_SPACING.sm}>
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} style={{ color: '#f9c846', marginLeft: '2px' }}>★</span>
                    ))}
                  </Box>
                  
                  <Text size="md" fontStyle="italic" mb={SACRED_SPACING.md}>
                    {testimonial.text}
                  </Text>
                  
                  <Box mt="auto" pt={SACRED_SPACING.sm}>
                    <Box 
                      display="flex" 
                      alignItems="center"
                      style={{ 
                        borderTop: `1px solid rgba(0,0,0,0.1)`,
                        paddingTop: SACRED_SPACING.sm 
                      }}
                    >
                      <Box 
                        mr={SACRED_SPACING.sm}
                        width={`${SACRED_SPACING.md * PHI}px`}
                        height={`${SACRED_SPACING.md * PHI}px`}
                      >
                        <FlowerOfLife
                          size="xs"
                          color={testimonial.accentColor}
                          opacity={0.8}
                        />
                      </Box>
                      <Box>
                        <Text 
                          size="md" 
                          fontWeight="600" 
                          style={{
                            color: testimonial.accentColor
                          }}
                        >
                          {testimonial.author}
                        </Text>
                        <Text size="sm" color="grey">
                          {testimonial.location} • {testimonial.treatmentType}
                        </Text>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </TestimonialCard>
            </FadeIn>
          ))}
        </Box>
        
        {visibleTestimonials < testmonialData.length && (
          <Box textAlign="center" mt={SACRED_SPACING.lg}>
            <Button 
              variant="secondary" 
              size="medium"
              onClick={handleLoadMore}
            >
              Load More Testimonials
            </Button>
          </Box>
        )}
        
        <Box mt={SACRED_SPACING.xl * PHI} textAlign="center">
          <Text size="lg" fontWeight="600">
            Ready to start your recovery journey?
          </Text>
          <Text size="md" mt={SACRED_SPACING.sm}>
            Experience the difference our sacred geometry approach can make.
          </Text>
          
          <Box mt={SACRED_SPACING.md} display="flex" justifyContent="center" gap={SACRED_SPACING.md}>
            <Button 
              variant="primary" 
              size="large"
              href="/booking"
            >
              Book a Consultation
            </Button>
            <Button 
              variant="outline" 
              size="large"
              href="/contact"
            >
              Contact Us
            </Button>
          </Box>
        </Box>
      </ContentContainer>
    </StyledSection>
  );
};

export default TestimonialsSection; 











