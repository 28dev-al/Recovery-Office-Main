import * as React from 'react';
import styled from 'styled-components';
import { Hero } from '../../design-system/components/feature-sections';
import { Section } from '../../design-system/components/layout/Section';
import SectionTitle from '../../design-system/components/layout/Section/SectionTitle';
import { Text, Paragraph } from '../../design-system/components/typography';
import { Button } from '../../design-system/components/button';
import { Card } from '../../design-system/components/data-display';
import { SecurityShield, ComplianceBadge, AssetRecovery } from '../../design-system/components/utility/FinancialIcons';
import { PHI, PHI_INVERSE, SACRED_TIMING } from '../../constants/sacred-geometry';
import { theme } from '../../design-system/theme';
import { Container, Box } from '../../design-system/components/layout';
import { motion } from 'framer-motion';

// Used for lists
const ListItem = ({ children }: { children: React.ReactNode }) => (
  <Box as="li" mb={`${PHI * 0.5}rem`}>
    {children}
  </Box>
);

const AccessibilityPage = styled.div`
  width: 100%;
  position: relative;
  overflow: hidden;
`;

const StyledSection = styled(Section)`
  position: relative;
  z-index: 1;
`;

const IconContainer = styled.div`
  position: absolute;
  top: ${PHI * 5}rem;
  right: ${PHI * -3}rem;
  opacity: 0.15;
  transform: scale(${PHI * 2}) rotate(${PHI * 10}deg);
  z-index: -1;
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(${PHI * 16}rem, 1fr));
  gap: ${PHI * 1.5}rem;
  margin-top: ${PHI * 2}rem;
`;

const SpecialCard = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: ${PHI}rem;
`;

const Accessibility = () => {
  return (
    <AccessibilityPage>
      <Hero 
        heading="Accessibility Statement"
        subheading="Our commitment to an inclusive and accessible experience for all"
        background={{
          image: "/images/accessibility-hero.jpg",
          overlay: `rgba(${theme.colors.primary[900] ?? 1}, 0.7)`
        }}
        minHeight="30vh"
        animated={true}
      />

      <StyledSection 
        backgroundColor={theme.colors.background[100] ?? 1}
        pt={`${PHI * 4}rem`}
        pb={`${PHI * 4}rem`}
      >
        <Container>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: PHI_INVERSE, delay: PHI_INVERSE * 0.3 }}
          >
            <SectionTitle 
              title="Our Commitment" 
              subtitle="Creating an accessible financial services platform for everyone"
              align="left"
              size="large"
            />
            <Paragraph mb={`${PHI * 2}rem`}>
              Recovery Office is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone, and applying the relevant accessibility standards to ensure we provide equal access to all of our users.
            </Paragraph>

            <IconContainer>
              <SecurityShield size="lg" opacity={0.3} />
            </IconContainer>
          </motion.div>
        </Container>
      </StyledSection>

      <StyledSection
        backgroundColor={theme.colors.background[200] ?? 1}
        pt={`${PHI * 4}rem`}
        pb={`${PHI * 4}rem`}
      >
        <Container>
          <SectionTitle 
            title="Conformance Status" 
            subtitle="Our standards and compliance efforts"
            align="center"
            decoratorBefore={<ComplianceBadge size="sm" />}
            decoratorAfter={<ComplianceBadge size="sm" />}
          />
          
          <Paragraph mb={`${PHI * 2}rem`}>
            The Web Content Accessibility Guidelines (WCAG) defines requirements for designers and developers to improve accessibility for people with disabilities. It defines three levels of conformance: Level A, Level AA, and Level AAA. Recovery Office is partially conformant with WCAG 2.1 level AA. Partially conformant means that some parts of the content do not fully conform to the accessibility standard.
          </Paragraph>

          <CardContainer>
            <SpecialCard padding={`${PHI * 1.5}rem`}>
              <Text variant="h4" color={theme.colors.primary[700] ?? 1}>Our Accessibility Features</Text>
              <Box as="ul" pl={`${PHI}rem`}>
                <ListItem>Semantic HTML structure for screen reader navigation</ListItem>
                <ListItem>Keyboard accessible navigation and functionality</ListItem>
                <ListItem>Adequate color contrast ratios (WCAG AA compliant)</ListItem>
                <ListItem>Text resizing without loss of content or functionality</ListItem>
                <ListItem>Alternative text for all informative images</ListItem>
                <ListItem>Aria landmarks for improved screen reader navigation</ListItem>
              </Box>
            </SpecialCard>

            <SpecialCard padding={`${PHI * 1.5}rem`}>
              <Text variant="h4" color={theme.colors.primary[700] ?? 1}>Known Limitations</Text>
              <Box as="ul" pl={`${PHI}rem`}>
                <ListItem>Some third-party content may not be fully accessible</ListItem>
                <ListItem>Some older PDF documents may not be fully accessible</ListItem>
                <ListItem>Some video content may not have complete captions</ListItem>
                <ListItem>Complex data visualizations may have limited accessibility</ListItem>
              </Box>
            </SpecialCard>
          </CardContainer>
        </Container>
      </StyledSection>

      <StyledSection
        backgroundColor={theme.colors.background[100] ?? 1}
        pt={`${PHI * 4}rem`}
        pb={`${PHI * 4}rem`}
      >
        <Container>
          <SectionTitle 
            title="Feedback and Assistance" 
            subtitle="We welcome your accessibility comments"
            align="center"
          />
          
          <Paragraph mb={`${PHI * 2}rem`}>
            We welcome your feedback on the accessibility of Recovery Office website and services. Please let us know if you encounter accessibility barriers or have suggestions for improvement. We are committed to continuously improving our accessibility.
          </Paragraph>

          <Paragraph mb={`${PHI * 2}rem`}>
            If you have specific questions about the accessibility of this site, or need assistance with any part of our website, please contact us by:
          </Paragraph>

          <CardContainer>
            <SpecialCard padding={`${PHI * 1.5}rem`}>
              <Text variant="h4" color={theme.colors.primary[700] ?? 1}>Contact Information</Text>
              <Box as="ul" pl={`${PHI}rem`}>
                <ListItem><strong>Email:</strong> accessibility@recoveryoffice.com</ListItem>
                <ListItem><strong>Phone:</strong> (555) 123-4567</ListItem>
                <ListItem><strong>Address:</strong> 123 Financial Street, Recovery City, RC 12345</ListItem>
              </Box>
              <Box mt={`${PHI}rem`} alignSelf="flex-start">
                <Button 
                  variant="primary" 
                  size="md"
                  href="/contact"
                >
                  Contact Us
                </Button>
              </Box>
            </SpecialCard>
          </CardContainer>
        </Container>
      </StyledSection>

      <StyledSection
        backgroundColor={theme.colors.primary[50] ?? 1}
        pt={`${PHI * 4}rem`}
        pb={`${PHI * 4}rem`}
      >
        <Container>
          <SectionTitle 
            title="Accessibility Assessment" 
            subtitle="How we evaluate our website"
            align="left"
          />
          
          <Paragraph mb={`${PHI * 2}rem`}>
            Recovery Office assesses the accessibility of our website using a combination of automated and manual evaluation methods. We conduct regular audits using:
          </Paragraph>

          <Box as="ul" pl={`${PHI * 2}rem`} mb={`${PHI * 2}rem`}>
            <ListItem>Automated testing tools to identify potential accessibility issues</ListItem>
            <ListItem>Manual testing with assistive technologies like screen readers</ListItem>
            <ListItem>User testing with individuals who have various disabilities</ListItem>
            <ListItem>Expert reviews by accessibility specialists</ListItem>
          </Box>

          <Paragraph mb={`${PHI * 2}rem`}>
            We are committed to addressing identified issues and continuously improving our website's accessibility. Our internal testing and remediation process is ongoing to ensure we maintain and enhance accessibility over time.
          </Paragraph>

          <Text variant="h4" color={theme.colors.primary[700] ?? 1} mb={`${PHI}rem`} mt={`${PHI * 2}rem`}>
            Legal Disclaimer
          </Text>
          <Paragraph mb={`${PHI}rem`}>
            Recovery Office strives to ensure that its services are accessible to people with disabilities. However, we cannot guarantee that all content provided by third parties will be fully accessible.
          </Paragraph>
          <Paragraph>
            This accessibility statement was last updated on December 10, 2023.
          </Paragraph>
        </Container>
      </StyledSection>
    </AccessibilityPage>
  );
};

export default Accessibility; 







