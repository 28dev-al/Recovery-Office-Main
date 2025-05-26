/**
 * FAQ Section Component
 * 
 * Displays frequently asked questions about Recovery Office with
 * expandable accordions following sacred geometry principles.
 */

import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { Section } from '../../../design-system/components/layout/Section';
import SectionTitle from '../../../design-system/components/typography/SectionTitle';
import { Text } from '../../../design-system/components/typography/Text';
import { Box } from '../../../design-system/components/layout';
import { Button } from '../../../design-system/components/button';
import { PHI, PHI_INVERSE, SACRED_SPACING } from '../../../constants/sacred-geometry';
import { FlowerOfLife } from '../../../design-system/botanical';
import { FadeIn } from '../../../animation';

const StyledSection = styled(Section)`
  position: relative;
  overflow: hidden;
  background: linear-gradient(
    to right,
    rgba(248, 250, 252, 0.9),
    rgba(242, 247, 250, 0.8)
  );
  padding: ${SACRED_SPACING.xl}px 0;
`;

const ContentContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 0 ${SACRED_SPACING.md}px;
`;

const FAQItem = styled.div<{ isActive: boolean }>`
  margin-bottom: ${SACRED_SPACING.md}px;
  border-radius: 8px;
  background-color: white;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, ${props => props.isActive ? 0.08 : 0.05});
  transition: box-shadow 0.3s ease, transform 0.3s ease;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transform: translateY(-${SACRED_SPACING.xs * PHI_INVERSE}px);
  }
`;

const FAQHeader = styled.div<{ isActive: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${SACRED_SPACING.md}px;
  cursor: pointer;
  background-color: ${props => props.isActive ? 'rgba(74, 110, 179, 0.05)' : 'white'};
  border-left: ${props => props.isActive ? '4px solid #4a6eb3' : '4px solid transparent'};
  transition: background-color 0.3s ease, border-left 0.3s ease;
`;

const FAQContent = styled.div<{ isActive: boolean }>`
  padding: ${props => props.isActive ? `${SACRED_SPACING.md}px` : '0 ${SACRED_SPACING.md}px'};
  max-height: ${props => props.isActive ? '500px' : '0'};
  opacity: ${props => props.isActive ? 1 : 0};
  transition: max-height 0.5s ease, opacity 0.3s ease, padding 0.3s ease;
  overflow: hidden;
  border-top: ${props => props.isActive ? '1px solid rgba(0, 0, 0, 0.05)' : 'none'};
`;

const IconButton = styled.div<{ isActive: boolean }>`
  width: ${SACRED_SPACING.md * PHI}px;
  height: ${SACRED_SPACING.md * PHI}px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: ${props => props.isActive ? '#4a6eb3' : 'rgba(0, 0, 0, 0.05)'};
  color: ${props => props.isActive ? 'white' : '#555'};
  font-size: 18px;
  transition: background-color 0.3s ease, color 0.3s ease;
`;

const BackgroundDecoration = styled.div`
  position: absolute;
  bottom: ${-SACRED_SPACING.xl}px;
  right: ${SACRED_SPACING.xl * 2}px;
  opacity: 0.04;
  transform: rotate(${PHI * 10}deg);
  z-index: 0;
`;

const faqData = [
  {
    id: 'faq-1',
    question: 'What is sacred geometry and how does it apply to recovery?',
    answer: 'Sacred geometry refers to the mathematical patterns that occur throughout nature and the universe. These patterns—like the Golden Ratio (1.618), Fibonacci sequence, and perfect symmetries—appear in everything from galaxies to seashells to the human body. At Recovery Office, we apply these principles to our therapeutic practices, creating exercises, environments, and treatment plans that align with these natural proportions. Research suggests that when therapeutic movements and environments follow these natural ratios, the body responds more effectively, potentially accelerating recovery and improving outcomes.'
  },
  {
    id: 'faq-2',
    question: 'Is your approach based on scientific evidence?',
    answer: 'Yes, our approach combines traditional evidence-based therapeutic practices with research on how sacred geometry principles affect healing and recovery. Dr. Elizabeth Harper, our founder, has published peer-reviewed research on the effects of proportional movement patterns in rehabilitation. Our research department continuously studies and documents the efficacy of our methods. While some aspects of our approach draw from traditional wisdom, we rigorously test all our methods and only implement those that demonstrate measurable benefits for our clients.'
  },
  {
    id: 'faq-3',
    question: 'What types of conditions do you typically treat?',
    answer: 'We work with a wide range of conditions including physical injuries (sports injuries, post-surgical recovery, accident rehabilitation), chronic pain conditions, neurological recovery (stroke rehabilitation, balance disorders), stress-related physical conditions, and general wellness optimization. Our unique approach has shown particular efficacy for complex conditions that haven\'t responded well to conventional approaches alone. We create customized treatment plans tailored to each client\'s specific needs, incorporating sacred geometry principles in ways most relevant to their condition.'
  },
  {
    id: 'faq-4',
    question: 'What can I expect during my first visit?',
    answer: 'Your first visit begins with a comprehensive assessment that looks beyond your immediate symptoms to understand holistic patterns affecting your condition. You\'ll meet with a therapeutic specialist who will evaluate your physical condition, movement patterns, and how your symptoms manifest. We\'ll explain how sacred geometry principles apply to your specific situation and create an initial treatment plan. You\'ll experience some introductory therapeutic techniques during this session. The appointment typically lasts 90 minutes, allowing ample time for discussion, evaluation, and introduction to our approach.'
  },
  {
    id: 'faq-5',
    question: 'Does insurance cover your services?',
    answer: 'Many of our services are eligible for insurance coverage, as they build upon evidence-based therapeutic practices. We currently accept several major insurance providers and can provide superbills for reimbursement from others. Our client relations team will verify your coverage before your first appointment and explain any potential out-of-pocket costs. Some of our specialized services that go beyond conventional therapy may not be covered by insurance; we\'ll clearly identify these in your treatment plan discussions.'
  },
  {
    id: 'faq-6',
    question: 'Do I need any special preparation before sessions?',
    answer: 'We recommend wearing comfortable clothing that allows for free movement. Arriving hydrated and having eaten a light meal 1-2 hours before your session is ideal. For your first visit, bringing any relevant medical records, imaging results, or previous treatment notes can be helpful. We also provide a pre-appointment questionnaire that helps us understand your history and goals. Most importantly, come with an open mind—our approach may differ from previous therapeutic experiences you\'ve had.'
  },
  {
    id: 'faq-7',
    question: 'How is your approach different from traditional physical therapy?',
    answer: 'While we incorporate many evidence-based techniques from traditional physical therapy, our approach differs in several key ways: 1) We integrate sacred geometry principles into movement patterns and exercises, 2) Our treatment environments are designed using these same principles to enhance healing, 3) We incorporate botanical elements that have been selected for their therapeutic properties, 4) We address not just physical symptoms but the harmonious relationship between body systems, and 5) We place greater emphasis on teaching clients how to maintain harmony in their daily movements and environments beyond our sessions.'
  }
];

const FAQSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  
  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  
  return (
    <StyledSection id="faq">
      <BackgroundDecoration>
        <FlowerOfLife size="xl" />
      </BackgroundDecoration>
      
      <ContentContainer>
        <SectionTitle 
          title="Frequently Asked Questions" 
          subtitle="Learn more about our approach and services"
        />
        
        <Box mt={SACRED_SPACING.lg}>
          {faqData.map((faq, index) => (
            <FadeIn key={faq.id} delay={index * 0.05}>
              <FAQItem isActive={activeIndex === index}>
                <FAQHeader 
                  isActive={activeIndex === index}
                  onClick={() => toggleFAQ(index)}
                >
                  <Text 
                    size="md" 
                    fontWeight={activeIndex === index ? '600' : '500'}
                    style={{ 
                      color: activeIndex === index ? '#4a6eb3' : 'inherit',
                      flex: 1
                    }}
                  >
                    {faq.question}
                  </Text>
                  <IconButton isActive={activeIndex === index}>
                    {activeIndex === index ? '−' : '+'}
                  </IconButton>
                </FAQHeader>
                <FAQContent isActive={activeIndex === index}>
                  <Text size="md" lineHeight={1.6}>
                    {faq.answer}
                  </Text>
                </FAQContent>
              </FAQItem>
            </FadeIn>
          ))}
        </Box>
        
        <Box 
          mt={SACRED_SPACING.xl} 
          textAlign="center"
          padding={`${SACRED_SPACING.lg * PHI}px ${SACRED_SPACING.lg}px`}
          borderRadius="8px"
          style={{ 
            background: 'rgba(255, 255, 255, 0.7)',
            border: '1px solid rgba(0, 0, 0, 0.05)'
          }}
        >
          <Text size="lg" fontWeight="500">
            Have more questions about our approach?
          </Text>
          <Text size="md" mt={SACRED_SPACING.sm} mb={SACRED_SPACING.md}>
            Our team is here to help you understand how sacred geometry principles can enhance your recovery journey.
          </Text>
          <Box display="flex" justifyContent="center" gap={SACRED_SPACING.md}>
            <Button 
              variant="primary" 
              size="medium"
              href="/contact"
            >
              Contact Us
            </Button>
            <Button 
              variant="outline" 
              size="medium"
              href="/faq"
            >
              View All FAQs
            </Button>
          </Box>
        </Box>
      </ContentContainer>
    </StyledSection>
  );
};

export default FAQSection; 











