import * as React from 'react';
import { useState } from 'react';
import { Hero } from '../../design-system/components/feature-sections';
import { FlowerOfLife, OliveBranch, VesicaPiscis } from '../../design-system/botanical';
import { Box, Container } from '../../design-system/components/layout';
import { Section, SectionTitle, SectionContent } from '../../design-system/components/layout/Section';
import { Text, Paragraph, Heading } from '../../design-system/components/typography';
import { Button } from '../../design-system/components/button';
import { Card } from '../../design-system/components/data-display';
import { ScrollReveal, FadeIn } from '../../animation';
import { PHI } from '../../constants/sacred-geometry';


/**
 * FAQ Page Component
 * 
 * This component displays frequently asked questions organized by categories.
 * Design follows sacred geometry principles throughout with golden ratio spacing.
 */
const FAQPage: React.FC = () => {
  // State for tracking which FAQ items are expanded
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  // Toggle expanded state of an FAQ item
  const toggleExpanded = (id: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !(prev[id] || false)
    }));
  };

  // Hero section background
  const heroBackgroundUrl = 'https://images.unsplash.com/photo-1515847049296-a281d6401047?auto=format&fit=crop&w=1920&q=80';

  // FAQ Categories with questions and answers
  const faqCategories = [
    {
      id: 'general',
      title: 'General Information',
      icon: <FlowerOfLife size="sm" opacity={0.8} />,
      color: '#4a6eb3',
      questions: [
        {
          id: 'general-1',
          question: 'What is Recovery Office?',
          answer: 'Recovery Office is a therapeutic center that integrates sacred geometry principles into healing and recovery practices. We offer a range of services including recovery consultation, therapeutic sessions, botanical therapy, and sacred education.'
        },
        {
          id: 'general-2',
          question: 'What is sacred geometry and how does it relate to recovery?',
          answer: 'Sacred geometry refers to the mathematical patterns and proportions found throughout nature. These patterns (like the golden ratio and Fibonacci sequence) create harmony and balance. We incorporate these principles in our therapeutic approaches to facilitate recovery by aligning with the natural order that exists within our bodies and the universe.'
        },
        {
          id: 'general-3',
          question: 'Is this approach scientifically validated?',
          answer: 'Our approach combines traditional therapeutic techniques with principles observed throughout nature. While some aspects have been studied scientifically, we continue to conduct research to further validate and improve our methods. Our Research Director, Dr. Robert Mitchell, leads these initiatives.'
        },
        {
          id: 'general-4',
          question: 'Do I need prior knowledge of sacred geometry to benefit from your services?',
          answer: 'No prior knowledge is required. Our specialists will guide you through the process and explain relevant concepts as needed. All therapeutic methods are designed to be accessible regardless of your familiarity with sacred geometry principles.'
        }
      ]
    },
    {
      id: 'services',
      title: 'Services & Treatments',
      icon: <OliveBranch size="sm" opacity={0.8} />,
      color: '#63a98c',
      questions: [
        {
          id: 'services-1',
          question: 'Which service is right for me?',
          answer: 'We recommend starting with a Recovery Consultation, where our specialists will assess your needs and recommend the most appropriate services. Each person&apos;s journey is unique, and we customize our approach accordingly.'
        },
        {
          id: 'services-2',
          question: 'How long are the sessions?',
          answer: 'Session durations vary by service: Recovery Consultations are 90 minutes, Therapeutic Sessions are 60 minutes, Botanical Therapy sessions are 75 minutes, and Sacred Education sessions are 60 minutes for private sessions and 2 hours for workshops.'
        },
        {
          id: 'services-3',
          question: 'How many sessions will I need?',
          answer: 'The number of sessions varies based on individual needs and goals. During your initial consultation, we&apos;ll discuss a recommended treatment plan and timeline. Many clients see improvements within 4-6 sessions, while others benefit from ongoing support.'
        },
        {
          id: 'services-4',
          question: 'Can I combine different services?',
          answer: 'Yes, many clients benefit from a combination of our services. For example, you might participate in therapeutic sessions while also learning to apply sacred geometry principles through our educational program. Your treatment plan can be adjusted as your needs evolve.'
        }
      ]
    },
    {
      id: 'booking',
      title: 'Booking & Appointments',
      icon: <VesicaPiscis size="sm" opacity={0.8} />,
      color: '#86b378',
      questions: [
        {
          id: 'booking-1',
          question: 'How do I schedule an appointment?',
          answer: 'You can schedule appointments through our online booking system, by calling our office, or by submitting a request through our contact form. We aim to respond to all booking requests within 24 hours.'
        },
        {
          id: 'booking-2',
          question: 'What is your cancellation policy?',
          answer: 'We request at least 24 hours&apos; notice for cancellations or rescheduling. Late cancellations or no-shows may incur a fee of 50% of the service price. We understand that emergencies happen and will consider circumstances on a case-by-case basis.'
        },
        {
          id: 'booking-3',
          question: 'Do you offer virtual sessions?',
          answer: 'Yes, we offer virtual options for many of our services, including consultations, therapeutic sessions, and sacred education. Botanical therapy typically requires in-person visits, though we can provide guidance on home practices virtually.'
        },
        {
          id: 'booking-4',
          question: 'How far in advance should I book?',
          answer: 'We recommend booking at least one week in advance to ensure availability, especially for initial consultations. For ongoing sessions, you can book multiple appointments in advance to secure your preferred time slots.'
        }
      ]
    },
    {
      id: 'payment',
      title: 'Payment & Insurance',
      icon: <FlowerOfLife size="sm" opacity={0.8} />,
      color: '#d4a76a',
      questions: [
        {
          id: 'payment-1',
          question: 'What payment methods do you accept?',
          answer: 'We accept all major credit cards, health savings accounts (HSA), flexible spending accounts (FSA), and cash. Payment is due at the time of service unless other arrangements have been made.'
        },
        {
          id: 'payment-2',
          question: 'Do you accept insurance?',
          answer: 'We accept several major insurance plans. Please contact our office with your insurance information, and we&apos;ll verify your coverage and benefits before your appointment. We can also provide documentation for out-of-network reimbursement.'
        },
        {
          id: 'payment-3',
          question: 'Do you offer package discounts?',
          answer: 'Yes, we offer discounted packages for clients who commit to multiple sessions. These packages can provide savings of 10-15% compared to individual session pricing. Ask about our current package options during your consultation.'
        },
        {
          id: 'payment-4',
          question: 'What is your pricing structure?',
          answer: 'Our pricing varies by service. Initial consultations are $150, therapeutic sessions range from $95-$120, botanical therapy sessions are $80-$135, and sacred education sessions range from $45 for group workshops to $90 for private sessions. Detailed pricing is available on our Services page.'
        }
      ]
    }
  ];

  return (
    <Box as="main">
      {/* Hero Section */}
      <Hero
        heading="Frequently Asked Questions"
        subheading="Find answers to common questions about our services and approach"
        background={{
          image: heroBackgroundUrl,
          overlay: 'rgba(21, 45, 85, 0.7)'
        }}
        align="center"
        minHeight="50vh"
        animated={true}
        botanical={{
          type: 'flowerOfLife',
          position: 'bottomRight',
          opacity: 0.15,
          animated: true
        }}
      >
        <Text variant="body1" style={{ maxWidth: `${PHI * 400}px`, margin: '0 auto', color: 'white' }}>
          Browse our comprehensive FAQ section to learn more about our sacred geometry-based 
          therapeutic approaches, booking process, and payment options.
        </Text>
      </Hero>

      {/* Main FAQ Categories Section */}
      <Section backgroundColor="#ffffff">
        <Container>
          <SectionTitle 
            title="Browse by Category" 
            subtitle="Select a topic to explore related questions"
            decoratorBefore={<FlowerOfLife size="sm" opacity={0.15} />}
            decoratorAfter={<FlowerOfLife size="sm" opacity={0.15} />}
          />
          <SectionContent>
            <Box 
              display="grid" 
              gridTemplateColumns={{ xs: "1fr", sm: "1fr", md: "1fr 1fr" }}
              gap={`${PHI * 24}px`}
              marginBottom={`${PHI * 48}px`}
            >
              {faqCategories.map(category => (
                <ScrollReveal key={category.id}>
                  <Card
                    elevation={1}
                    padding={`${PHI * 24}px`}
                    borderRadius="8px"
                    style={{
                      backgroundColor: 'white',
                      borderTop: `4px solid ${category.color}`
                    }}
                  >
                    <Box 
                      display="flex" 
                      alignItems="center" 
                      marginBottom={`${PHI * 16}px`}
                    >
                      <Box marginRight={`${PHI * 8}px`}>
                        {category.icon}
                      </Box>
                      <Heading as="h2" variant="h3">
                        {category.title}
                      </Heading>
                    </Box>

                    <Box>
                      {category.questions.map(faq => (
                        <Box 
                          key={faq.id}
                          marginBottom={`${PHI * 16}px`}
                          padding={`${PHI * 16}px`}
                          borderRadius="8px"
                          backgroundColor="#f8f9fa"
                        >
                          <div 
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              cursor: 'pointer'
                            }}
                            onClick={() => toggleExpanded(faq.id)}
                          >
                            <Heading 
                              as="h3" 
                              variant="h5" 
                              style={{ margin: 0 }}
                            >
                              {faq.question}
                            </Heading>
                            <div 
                              style={{
                                fontSize: '24px',
                                transition: 'transform 0.3s ease',
                                transform: expandedItems[faq.id] ? 'rotate(45deg)' : 'rotate(0)'
                              }}
                            >
                              +
                            </div>
                          </div>
                          
                          {expandedItems[faq.id] && (
                            <FadeIn>
                              <Box 
                                marginTop={`${PHI * 16}px`}
                                paddingTop={`${PHI * 16}px`}
                                borderTop="1px solid rgba(0,0,0,0.1)"
                              >
                                <Paragraph variant="body2">
                                  {faq.answer}
                                </Paragraph>
                              </Box>
                            </FadeIn>
                          )}
                        </Box>
                      ))}
                    </Box>
                  </Card>
                </ScrollReveal>
              ))}
            </Box>
          </SectionContent>
        </Container>
      </Section>

      {/* Still Have Questions Section */}
      <ScrollReveal>
        <Section 
          backgroundColor="#f0f4f8"
          style={{
            paddingTop: `${PHI * 32}px`,
            paddingBottom: `${PHI * 32}px`
          }}
        >
          <Container>
            <Box 
              display="flex" 
              flexDirection="column" 
              alignItems="center" 
              textAlign="center"
            >
              <VesicaPiscis size="md" opacity={0.6} style={{ marginBottom: `${PHI * 16}px` }} />
              
              <Heading 
                as="h2" 
                variant="h2" 
                style={{ marginBottom: `${PHI * 16}px` }}
              >
                Still Have Questions?
              </Heading>
              
              <Paragraph 
                variant="body1" 
                style={{ 
                  maxWidth: `${PHI * 500}px`, 
                  marginBottom: `${PHI * 24}px` 
                }}
              >
                If you couldn't find the answer to your question, our team is here to help.
                Contact us directly and we'll be happy to assist you.
              </Paragraph>
              
              <Box 
                display="flex" 
                gap={`${PHI * 16}px`}
              >
                <Button 
                  variant="primary" 
                  size="large"
                  href="/contact"
                >
                  Contact Us
                </Button>
                
                <Button 
                  variant="outline" 
                  size="large"
                  href="/booking"
                >
                  Book a Consultation
                </Button>
              </Box>
            </Box>
          </Container>
        </Section>
      </ScrollReveal>

      {/* FAQ Keywords Section */}
      <ScrollReveal>
        <Section 
          backgroundColor="#ffffff"
          style={{
            paddingTop: `${PHI * 32}px`,
            paddingBottom: `${PHI * 32}px`
          }}
        >
          <Container>
            <SectionTitle 
              title="Common Topics" 
              subtitle="Browse keywords related to our services and approach"
              decoratorBefore={<OliveBranch size="sm" opacity={0.3} />}
              decoratorAfter={<OliveBranch size="sm" opacity={0.3} mirror />}
            />
            
            <SectionContent>
              <Box 
                display="flex" 
                flexWrap="wrap" 
                justifyContent="center" 
                gap={`${PHI * 8}px`}
              >
                {[
                  'Sacred Geometry', 'Golden Ratio', 'Therapy', 'Recovery', 'Consultation',
                  'Botanical Healing', 'Education', 'Sessions', 'Pricing', 'Insurance',
                  'Appointments', 'Virtual Sessions', 'Packages', 'Research', 'Methods',
                  'Benefits', 'Practitioners', 'Harmony', 'Balance', 'Wellbeing'
                ].map(keyword => (
                  <Box 
                    key={keyword}
                    padding={`${PHI * 8}px ${PHI * 16}px`}
                    borderRadius="full"
                    backgroundColor="#f0f4f8"
                    border="1px solid rgba(0,0,0,0.1)"
                  >
                    <Text variant="body2">
                      {keyword}
                    </Text>
                  </Box>
                ))}
              </Box>
            </SectionContent>
          </Container>
        </Section>
      </ScrollReveal>
    </Box>
  );
};

export default FAQPage; 








