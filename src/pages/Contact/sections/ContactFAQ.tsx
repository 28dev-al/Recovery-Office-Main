/**
 * ContactFAQ Section Component
 * 
 * Displays frequently asked questions related to contacting and visiting Recovery Office.
 * Features responsive grid layout and sacred geometry proportions.
 */

import * as React from 'react';
import { Box, Container, Grid } from '../../../design-system/components/layout';
import { Section, SectionTitle, SectionContent } from '../../../design-system/components/layout/Section';
import { Text, Paragraph, Heading } from '../../../design-system/components/typography';
import { Card } from '../../../design-system/components/data-display';
import { Button } from '../../../design-system/components/button';
import { OliveBranch } from '../../../design-system/botanical';
import { PHI } from '../../../constants/sacred-geometry';
import { ScrollReveal, FadeIn } from '../../../animation';

// FAQ item interface
interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

interface ContactFAQProps {
  /**
   * Background color for the section
   */
  backgroundColor?: string;
  /**
   * Optional custom FAQ items
   */
  faqItems?: FAQItem[];
}

// Default FAQ items related to contacting and visiting
const defaultFAQItems: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'What are your hours of operation?',
    answer: 'We are open Monday through Friday from 9:00 AM to 6:00 PM, and Saturday from 10:00 AM to 3:00 PM. We are closed on Sundays and major holidays.'
  },
  {
    id: 'faq-2',
    question: 'How do I schedule a consultation?',
    answer: 'You can schedule a consultation by calling our office, using our online booking system, or sending us a message through this contact form. We aim to respond to all inquiries within 24 hours.'
  },
  {
    id: 'faq-3',
    question: 'Do you accept insurance?',
    answer: 'We accept most major insurance plans. Please contact our office with your insurance information, and we will verify your coverage and benefits before your appointment.'
  },
  {
    id: 'faq-4',
    question: 'What if I need to cancel or reschedule?',
    answer: 'We understand that schedules change. We request at least 24 hours\' notice for cancellations or rescheduling. You can call our office or use our online system to make these changes.'
  }
];

const ContactFAQ: React.FC<ContactFAQProps> = ({
  backgroundColor = "#ffffff",
  faqItems = defaultFAQItems
}) => {
  return (
    <Section backgroundColor={backgroundColor}>
      <Container>
        <ScrollReveal>
          <SectionTitle 
            title="Frequently Asked Questions" 
            subtitle="Quick answers to common inquiries"
            decoratorBefore={<OliveBranch size="sm" opacity={0.3} />}
            decoratorAfter={<OliveBranch size="sm" opacity={0.3} mirror />}
          />
          <SectionContent>
            <Grid 
              gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr" }}
              gap={`${PHI * 24}px`}
            >
              {faqItems.map((faq, index) => (
                <FadeIn key={faq.id} delay={index * 0.1}>
                  <Card 
                    padding={`${PHI * 16}px`} 
                    borderRadius="8px"
                    elevation={2}
                    style={{
                      height: '100%',
                      borderTop: index % 2 === 0 ? '4px solid #4a6eb3' : '4px solid #86b378'
                    }}
                  >
                    <Heading 
                      as="h3" 
                      variant="h5" 
                      marginBottom={`${PHI * 8}px`}
                      style={{
                        color: index % 2 === 0 ? '#4a6eb3' : '#86b378'
                      }}
                    >
                      {faq.question}
                    </Heading>
                    <Paragraph variant="body2">
                      {faq.answer}
                    </Paragraph>
                  </Card>
                </FadeIn>
              ))}
            </Grid>
            
            <Box 
              textAlign="center" 
              marginTop={`${PHI * 32}px`}
            >
              <Paragraph variant="body1" marginBottom={`${PHI * 16}px`}>
                Have more questions? We're here to help.
              </Paragraph>
              <Button 
                variant="secondary" 
                size="medium"
                href="/faq"
              >
                View All FAQs
              </Button>
            </Box>
          </SectionContent>
        </ScrollReveal>
      </Container>
    </Section>
  );
};

export default ContactFAQ; 











