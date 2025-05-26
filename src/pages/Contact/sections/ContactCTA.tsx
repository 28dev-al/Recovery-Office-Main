/**
 * ContactCTA Section Component
 * 
 * Call-to-action section for the Contact page encouraging users to book a consultation.
 * Features gradient background and sacred geometry proportions.
 */

import * as React from 'react';
import { Box, Container } from '../../../design-system/components/layout';
import { Section } from '../../../design-system/components/layout/Section';
import { Text, Heading } from '../../../design-system/components/typography';
import { Button } from '../../../design-system/components/button';
import { PHI } from '../../../constants/sacred-geometry';
import { ScrollReveal } from '../../../animation';

interface ContactCTAProps {
  /**
   * Heading text for the CTA
   */
  heading?: string;
  /**
   * Subheading text describing the value proposition
   */
  subheading?: string;
  /**
   * Button text for the CTA
   */
  buttonText?: string;
  /**
   * Button link for the CTA
   */
  buttonLink?: string;
  /**
   * Background gradient for the section
   */
  backgroundGradient?: string;
  
  /**
   * Optional children content
   */
  children?: React.ReactNode;
}

const ContactCTA: React.FC<ContactCTAProps> = ({
  heading = "Ready to Experience Our Approach?",
  subheading = "Schedule a consultation today and discover how our sacred geometry-based approach can help you achieve balance and harmony.",
  buttonText = "Book a Consultation",
  buttonLink = "/booking",
  backgroundGradient = "linear-gradient(135deg, #4a6eb3 0%, #2a4073 100%)"
}) => {
  return (
    <ScrollReveal>
      <Section 
        style={{
          background: backgroundGradient,
          color: 'white',
          paddingTop: `${PHI * 32}px`,
          paddingBottom: `${PHI * 32}px`
        }}
      >
        <Container>
          <Box textAlign="center">
            <Heading 
              as="h2" 
              variant="h2" 
              style={{ 
                color: 'white', 
                marginBottom: `${PHI * 16}px` 
              }}
            >
              {heading}
            </Heading>
            <Text 
              variant="body1" 
              style={{ 
                maxWidth: `${PHI * 500}px`, 
                margin: '0 auto', 
                marginBottom: `${PHI * 24}px` 
              }}
            >
              {subheading}
            </Text>
            <Button 
              variant="accent" 
              size="lg"
              href={buttonLink}
              aria-label={buttonText}
            >
              {buttonText}
            </Button>
          </Box>
        </Container>
      </Section>
    </ScrollReveal>
  );
};

export default ContactCTA; 










