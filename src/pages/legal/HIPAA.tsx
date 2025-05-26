import * as React from 'react';
import { Hero } from '../../design-system/components/feature-sections';
import { SecurityShield, ComplianceBadge, AssetRecovery } from '../../design-system/components/utility/FinancialIcons';
import { Box, Container } from '../../design-system/components/layout';
import { Section, SectionTitle } from '../../design-system/components/layout/Section';
import { Text, Paragraph, Heading } from '../../design-system/components/typography';
import { Button } from '../../design-system/components/button';
import { Card } from '../../design-system/components/data-display';
import { ScrollReveal } from '../../animation';
import { PHI } from '../../constants/sacred-geometry';

/**
 * HIPAA Compliance Page Component
 * 
 * This component displays the HIPAA compliance information for Recovery Office.
 * Design follows sacred geometry principles throughout with golden ratio spacing.
 */
const HIPAAPage: React.FC = () => {
  // Hero section background
  const heroBackgroundUrl = 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1920&q=80';

  const lastUpdated = 'January 15, 2024';

  return (
    <Box as="main">
      {/* Hero Section */}
      <Hero
        heading="HIPAA Compliance"
        subheading="Our commitment to protecting your personal information"
        background={{
          image: heroBackgroundUrl,
          overlay: 'rgba(21, 45, 85, 0.8)'
        }}
        align="center"
        minHeight="40vh"
        animated={true}
      >
        <Text 
          variant="body1" 
          maxWidth={`${PHI * 400}px`} 
          m="0 auto" 
          color="white"
        >
          At Recovery Office, we adhere to the highest standards of client privacy and data protection
          in accordance with the Health Insurance Portability and Accountability Act (HIPAA).
        </Text>
      </Hero>

      {/* Introduction Section */}
      <ScrollReveal>
        <Section backgroundColor="#ffffff">
          <Container>
            <Box 
              maxWidth="800px" 
              m="0 auto" 
              pt={`${PHI * 24}px`}
              pb={`${PHI * 24}px`}
            >
              <Box 
                display="flex" 
                alignItems="center" 
                mb={`${PHI * 16}px`}
              >
                <SecurityShield size="sm" opacity={0.6} style={{ marginRight: `${PHI * 12}px` }} />
                <Text variant="caption" fontStyle="italic">
                  Last Updated: {lastUpdated}
                </Text>
              </Box>
              
              <Paragraph variant="body1" mb={`${PHI * 24}px`}>
                This HIPAA Compliance Statement describes how Recovery Office may use and disclose your 
                Protected Health Information (PHI) to carry out treatment, payment, or financial operations, 
                and for other purposes permitted or required by law. It also describes your rights to access 
                and control your PHI.
              </Paragraph>
              
              <Paragraph variant="body1" mb={`${PHI * 24}px`}>
                &quot;Protected Health Information&quot; (PHI) is information about you, including demographic information, 
                that may identify you and that relates to your financial history or current financial situation
                and related recovery services.
              </Paragraph>
            </Box>
          </Container>
        </Section>
      </ScrollReveal>

      {/* Main Content Sections */}
      <ScrollReveal>
        <Section backgroundColor="#f8f9fa">
          <Container>
            <Box 
              maxWidth="800px" 
              m="0 auto" 
              pt={`${PHI * 24}px`}
              pb={`${PHI * 24}px`}
            >
              {/* Uses and Disclosures */}
              <SectionTitle 
                title="Uses and Disclosures of Protected Health Information" 
                size="medium"
                align="left"
                decoratorBefore={<ComplianceBadge size="sm" opacity={0.3} />}
              />
              
              <Box mb={`${PHI * 32}px`}>
                <Heading as="h3" variant="h4" mb={`${PHI * 16}px`}>
                  Treatment
                </Heading>
                <Paragraph variant="body2" mb={`${PHI * 16}px`}>
                  We will use and disclose your Protected Health Information (PHI) to provide, coordinate, or manage your financial recovery
                  and any related services. This includes coordinating or managing your case with a third party. For example, 
                  your PHI may be provided to a financial institution to whom you have been referred to ensure the provider has the 
                  necessary information to assist you.
                </Paragraph>
                
                <Heading as="h3" variant="h4" mt={`${PHI * 24}px`} mb={`${PHI * 16}px`}>
                  Payment
                </Heading>
                <Paragraph variant="body2" mb={`${PHI * 16}px`}>
                  Your PHI will be used, as needed, to obtain payment for your recovery services. For example, obtaining approval 
                  for a recovery plan may require that your relevant PHI be disclosed to the financial institution to obtain approval for the treatment.
                </Paragraph>

                <Heading as="h3" variant="h4" mt={`${PHI * 24}px`} mb={`${PHI * 16}px`}>
                  Financial Operations
                </Heading>
                <Paragraph variant="body2" mb={`${PHI * 16}px`}>
                  We may use or disclose, as needed, your PHI in order to support the business activities of our practice. These 
                  activities include, but are not limited to, quality assessment, employee review, training of financial specialists, 
                  licensing, and conducting or arranging for other business activities.
                </Paragraph>
              </Box>
              
              {/* Your Rights */}
              <SectionTitle 
                title="Your Rights" 
                size="medium"
                align="left"
                decoratorBefore={<AssetRecovery size="sm" opacity={0.3} />}
              />
              
              <Box mb={`${PHI * 32}px`}>
                <Heading as="h3" variant="h4" mb={`${PHI * 16}px`}>
                  Right to Access Your PHI
                </Heading>
                <Paragraph variant="body2" mb={`${PHI * 16}px`}>
                  You have the right to inspect and obtain a copy of the PHI that may be used to make decisions about your case. 
                  Usually, this includes financial and billing records. You must submit your 
                  request in writing to access your PHI. If you request a copy of the information, we may charge a fee for the costs 
                  of copying, mailing, or other supplies associated with your request.
                </Paragraph>
                
                <Heading as="h3" variant="h4" mt={`${PHI * 24}px`} mb={`${PHI * 16}px`}>
                  Right to Amend
                </Heading>
                <Paragraph variant="body2" mb={`${PHI * 16}px`}>
                  If you feel that the PHI we have about you is incorrect or incomplete, you may ask us to amend the information. 
                  You have the right to request an amendment for as long as the information is kept by or for our practice. Your 
                  request must be made in writing and submitted to our Privacy Officer. You must provide us with a reason that 
                  supports your request for amendment.
                </Paragraph>
                
                <Heading as="h3" variant="h4" mt={`${PHI * 24}px`} mb={`${PHI * 16}px`}>
                  Right to an Accounting of Disclosures
                </Heading>
                <Paragraph variant="body2" mb={`${PHI * 16}px`}>
                  You have the right to request an &quot;accounting of disclosures.&quot; This is a list of the disclosures we made of 
                  your information for purposes other than recovery services, payment, business operations, or disclosures 
                  you expressly authorized.
                </Paragraph>

                <Heading as="h3" variant="h4" mt={`${PHI * 24}px`} mb={`${PHI * 16}px`}>
                  Right to Request Restrictions
                </Heading>
                <Paragraph variant="body2" mb={`${PHI * 16}px`}>
                  You have the right to request a restriction or limitation on the PHI we use or disclose about you for treatment, 
                  payment, or operations. You also have the right to request a limit on the information we disclose 
                  about you to someone who is involved in your case or the payment for your services, like a family member or friend.
                </Paragraph>

                <Heading as="h3" variant="h4" mt={`${PHI * 24}px`} mb={`${PHI * 16}px`}>
                  Right to Request Confidential Communications
                </Heading>
                <Paragraph variant="body2" mb={`${PHI * 16}px`}>
                  You have the right to request that we communicate with you about financial matters in a certain way or at a certain 
                  location. For example, you can ask that we only contact you at work or by mail.
                </Paragraph>
              </Box>
              
              {/* Data Security */}
              <SectionTitle 
                title="Data Security" 
                size="medium"
                align="left"
                decoratorBefore={<SecurityShield size="sm" opacity={0.3} />}
              />
              
              <Box mb={`${PHI * 32}px`}>
                <Paragraph variant="body2" mb={`${PHI * 16}px`}>
                  Recovery Office implements a variety of security measures to maintain the safety of your PHI. We use state-of-the-art 
                  technology and encryption to protect your personal information, including:
                </Paragraph>
                <Box as="ul" pl={`${PHI * 16}px`} mb={`${PHI * 16}px`}>
                  <Box as="li" mb={`${PHI * 8}px`}>
                    <Text variant="body2">End-to-end encryption for all electronic PHI</Text>
                  </Box>
                  <Box as="li" mb={`${PHI * 8}px`}>
                    <Text variant="body2">Role-based access controls for all staff members</Text>
                  </Box>
                  <Box as="li" mb={`${PHI * 8}px`}>
                    <Text variant="body2">Regular security assessments and penetration testing</Text>
                  </Box>
                  <Box as="li" mb={`${PHI * 8}px`}>
                    <Text variant="body2">Staff training on HIPAA compliance and data security</Text>
                  </Box>
                  <Box as="li" mb={`${PHI * 8}px`}>
                    <Text variant="body2">Secure disposal of physical documents containing PHI</Text>
                  </Box>
                  <Box as="li">
                    <Text variant="body2">Business Associate Agreements with all third-party vendors who may access PHI</Text>
                  </Box>
                </Box>
                <Paragraph variant="body2">
                  We regularly review and update our security policies and procedures to ensure that we are always using the best 
                  available practices for protecting your information.
                </Paragraph>
              </Box>
              
              {/* Contact Information */}
              <SectionTitle 
                title="Contact Us" 
                size="medium"
                align="left"
                decoratorBefore={<ComplianceBadge size="sm" opacity={0.3} />}
              />
              
              <Box>
                <Paragraph variant="body2" mb={`${PHI * 16}px`}>
                  If you have any questions about this HIPAA Compliance Statement or would like to submit a request regarding your PHI, please contact:
                </Paragraph>
                <Card
                  padding={`${PHI * 24}px`}
                  borderRadius="8px"
                  backgroundColor="white"
                  borderLeft={`4px solid #4a6eb3`}
                >
                  <Text variant="body2" mb={`${PHI * 8}px`} fontWeight="bold">
                    Privacy Officer
                  </Text>
                  <Text variant="body2" mb={`${PHI * 8}px`}>
                    Recovery Office<br />
                    123 Financial Street, Suite 618<br />
                    Recovery City, RC 91234
                  </Text>
                  <Text variant="body2" mb={`${PHI * 8}px`}>
                    Email: privacy@recoveryoffice.com
                  </Text>
                  <Text variant="body2">
                    Phone: (555) 123-4567
                  </Text>
                </Card>
              </Box>
            </Box>
          </Container>
        </Section>
      </ScrollReveal>

      {/* Agreement Section */}
      <ScrollReveal>
        <Section 
          backgroundColor="#ffffff"
          pt={`${PHI * 32}px`}
          pb={`${PHI * 32}px`}
        >
          <Container>
            <Box 
              textAlign="center"
              maxWidth="600px"
              m="0 auto"
            >
              <Heading as="h2" variant="h3" mb={`${PHI * 16}px`}>
                Changes to This Statement
              </Heading>
              <Paragraph variant="body1" mb={`${PHI * 24}px`}>
                We reserve the right to change our HIPAA Compliance Statement at any time. Any revised statement will be effective 
                for all PHI that we maintain. We will notify you of any material changes by posting the new statement prominently 
                on our website and providing a copy upon request.
              </Paragraph>
              <Box 
                display="flex" 
                justifyContent="center" 
                gap={`${PHI * 16}px`}
              >
                <Button 
                  variant="primary" 
                  size="md"
                  href="/contact"
                >
                  Contact Our Privacy Officer
                </Button>
                <Button 
                  variant="outline" 
                  size="md"
                  href="/privacy"
                >
                  Privacy Policy
                </Button>
              </Box>
            </Box>
          </Container>
        </Section>
      </ScrollReveal>
    </Box>
  );
};

export default HIPAAPage; 







