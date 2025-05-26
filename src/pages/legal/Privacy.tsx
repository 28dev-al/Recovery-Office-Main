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
 * Privacy Policy Page Component
 * 
 * This component displays the privacy policy for Recovery Office.
 * Design follows sacred geometry principles throughout with golden ratio spacing.
 */
const PrivacyPage: React.FC = () => {
  // Hero section background
  const heroBackgroundUrl = 'https://images.unsplash.com/photo-1517999144091-3d9dca6d1e43?auto=format&fit=crop&w=1920&q=80';

  const lastUpdated = 'June 15, 2023';

  return (
    <Box as="main">
      {/* Hero Section */}
      <Hero
        heading="Privacy Policy"
        subheading="How we protect and handle your information"
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
          At Recovery Office, we value your privacy and are committed to protecting 
          your personal information. This policy explains how we collect, use, and 
          safeguard your data.
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
                This Privacy Policy describes how Recovery Office (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) 
                collects, uses, and shares information about you when you use our website, 
                services, and applications (collectively, the &quot;Services&quot;). By using our 
                Services, you agree to the collection, use, and sharing of your information 
                as described in this Privacy Policy.
              </Paragraph>
              
              <Paragraph variant="body1" mb={`${PHI * 24}px`}>
                We may change this Privacy Policy from time to time. If we make changes, 
                we will notify you by revising the date at the top of the policy and, in 
                some cases, we may provide you with additional notice. We encourage you to 
                review the Privacy Policy whenever you access the Services to stay informed 
                about our information practices and the ways you can help protect your privacy.
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
              {/* Information We Collect */}
              <SectionTitle 
                title="Information We Collect" 
                size="medium"
                align="left"
                decoratorBefore={<ComplianceBadge size="sm" opacity={0.3} />}
              />
              
              <Box mb={`${PHI * 32}px`}>
                <Heading as="h3" variant="h4" mb={`${PHI * 16}px`}>
                  Information You Provide to Us
                </Heading>
                <Paragraph variant="body2" mb={`${PHI * 16}px`}>
                  We collect information you provide directly to us. For example, we collect 
                  information when you:
                </Paragraph>
                <Box as="ul" pl={`${PHI * 16}px`} mb={`${PHI * 16}px`}>
                  <Box as="li" mb={`${PHI * 8}px`}>
                    <Text variant="body2">Create an account or profile</Text>
                  </Box>
                  <Box as="li" mb={`${PHI * 8}px`}>
                    <Text variant="body2">Schedule appointments or consultations</Text>
                  </Box>
                  <Box as="li" mb={`${PHI * 8}px`}>
                    <Text variant="body2">Fill out forms or surveys</Text>
                  </Box>
                  <Box as="li" mb={`${PHI * 8}px`}>
                    <Text variant="body2">Communicate with us via email, phone, or other means</Text>
                  </Box>
                  <Box as="li" mb={`${PHI * 8}px`}>
                    <Text variant="body2">Submit financial information for recovery purposes</Text>
                  </Box>
                  <Box as="li">
                    <Text variant="body2">Provide payment information</Text>
                  </Box>
                </Box>
                <Paragraph variant="body2">
                  This information may include your name, email address, phone number, postal 
                  address, financial information, payment information, and any other information 
                  you choose to provide.
                </Paragraph>
                
                <Heading as="h3" variant="h4" mt={`${PHI * 24}px`} mb={`${PHI * 16}px`}>
                  Information We Collect Automatically
                </Heading>
                <Paragraph variant="body2" mb={`${PHI * 16}px`}>
                  When you access or use our Services, we may automatically collect information 
                  about you, including:
                </Paragraph>
                <Box as="ul" pl={`${PHI * 16}px`} mb={`${PHI * 16}px`}>
                  <Box as="li" mb={`${PHI * 8}px`}>
                    <Text variant="body2" fontWeight="bold" as="span">Log Information:</Text>
                    <Text variant="body2" as="span"> We collect log information about your use of our Services, including your browser type, access times, pages viewed, and IP address.</Text>
                  </Box>
                  <Box as="li" mb={`${PHI * 8}px`}>
                    <Text variant="body2" fontWeight="bold" as="span">Device Information:</Text>
                    <Text variant="body2" as="span"> We collect information about the device you use to access our Services, including the hardware model, operating system, and unique device identifiers.</Text>
                  </Box>
                  <Box as="li">
                    <Text variant="body2" fontWeight="bold" as="span">Cookies and Similar Technologies:</Text>
                    <Text variant="body2" as="span"> We use cookies and similar technologies to collect information about your interactions with our Services and other websites.</Text>
                  </Box>
                </Box>
              </Box>
              
              {/* How We Use Information */}
              <SectionTitle 
                title="How We Use Information" 
                size="medium"
                align="left"
                decoratorBefore={<AssetRecovery size="sm" opacity={0.3} />}
              />
              
              <Box mb={`${PHI * 32}px`}>
                <Paragraph variant="body2" mb={`${PHI * 16}px`}>
                  We may use the information we collect for various purposes, including to:
                </Paragraph>
                <Box as="ul" pl={`${PHI * 16}px`} mb={`${PHI * 16}px`}>
                  <Box as="li" mb={`${PHI * 8}px`}>
                    <Text variant="body2">Provide, maintain, and improve our Services</Text>
                  </Box>
                  <Box as="li" mb={`${PHI * 8}px`}>
                    <Text variant="body2">Process and complete transactions</Text>
                  </Box>
                  <Box as="li" mb={`${PHI * 8}px`}>
                    <Text variant="body2">Schedule and manage appointments</Text>
                  </Box>
                  <Box as="li" mb={`${PHI * 8}px`}>
                    <Text variant="body2">Develop personalized recovery plans</Text>
                  </Box>
                  <Box as="li" mb={`${PHI * 8}px`}>
                    <Text variant="body2">Send technical notices, updates, security alerts, and administrative messages</Text>
                  </Box>
                  <Box as="li" mb={`${PHI * 8}px`}>
                    <Text variant="body2">Respond to your comments, questions, and requests</Text>
                  </Box>
                  <Box as="li" mb={`${PHI * 8}px`}>
                    <Text variant="body2">Provide customer service and support</Text>
                  </Box>
                  <Box as="li">
                    <Text variant="body2">Comply with legal and regulatory requirements</Text>
                  </Box>
                </Box>
              </Box>
              
              {/* Sharing of Information */}
              <SectionTitle 
                title="Sharing of Information" 
                size="medium"
                align="left"
                decoratorBefore={<SecurityShield size="sm" opacity={0.3} />}
              />
              
              <Box mb={`${PHI * 32}px`}>
                <Paragraph variant="body2" mb={`${PHI * 16}px`}>
                  We may share information about you as follows:
                </Paragraph>
                <Box as="ul" pl={`${PHI * 16}px`} mb={`${PHI * 16}px`}>
                  <Box as="li" mb={`${PHI * 8}px`}>
                    <Text variant="body2" fontWeight="bold" as="span">With Service Providers:</Text>
                    <Text variant="body2" as="span"> We may share your information with third-party vendors, consultants, and other service providers who perform services on our behalf, such as payment processing, data analysis, and customer service.</Text>
                  </Box>
                  <Box as="li" mb={`${PHI * 8}px`}>
                    <Text variant="body2" fontWeight="bold" as="span">For Legal Reasons:</Text>
                    <Text variant="body2" as="span"> We may share information if we believe disclosure is necessary to comply with applicable laws, regulations, legal processes, or governmental requests.</Text>
                  </Box>
                  <Box as="li" mb={`${PHI * 8}px`}>
                    <Text variant="body2" fontWeight="bold" as="span">With Your Consent:</Text>
                    <Text variant="body2" as="span"> We may share information with third parties when you give us consent to do so, such as when you choose to share your information with other financial recovery providers.</Text>
                  </Box>
                  <Box as="li">
                    <Text variant="body2" fontWeight="bold" as="span">Business Transfers:</Text>
                    <Text variant="body2" as="span"> We may share your information in connection with a merger, reorganization, acquisition, or sale of all or a portion of our business.</Text>
                  </Box>
                </Box>
                <Paragraph variant="body2">
                  We take your privacy seriously and do not sell your personal information to third parties.
                </Paragraph>
              </Box>
              
              {/* Data Security */}
              <SectionTitle 
                title="Data Security" 
                size="medium"
                align="left"
                decoratorBefore={<ComplianceBadge size="sm" opacity={0.3} />}
              />
              
              <Box mb={`${PHI * 32}px`}>
                <Paragraph variant="body2" mb={`${PHI * 16}px`}>
                  We take reasonable measures to help protect the information we collect from loss, theft, misuse, 
                  and unauthorized access, disclosure, alteration, and destruction. However, no security system is 
                  impenetrable, and we cannot guarantee the security of our systems or your information.
                </Paragraph>
                <Paragraph variant="body2">
                  We implement appropriate physical, technical, and administrative safeguards designed to protect 
                  your personal financial information in accordance with HIPAA regulations and other applicable privacy laws.
                </Paragraph>
              </Box>
              
              {/* Your Rights and Choices */}
              <SectionTitle 
                title="Your Rights and Choices" 
                size="medium"
                align="left"
                decoratorBefore={<AssetRecovery size="sm" opacity={0.3} />}
              />
              
              <Box mb={`${PHI * 32}px`}>
                <Paragraph variant="body2" mb={`${PHI * 16}px`}>
                  You have several rights regarding your personal information:
                </Paragraph>
                <Box as="ul" pl={`${PHI * 16}px`} mb={`${PHI * 16}px`}>
                  <Box as="li" mb={`${PHI * 8}px`}>
                    <Text variant="body2" fontWeight="bold" as="span">Access:</Text>
                    <Text variant="body2" as="span"> You have the right to access personal information we hold about you.</Text>
                  </Box>
                  <Box as="li" mb={`${PHI * 8}px`}>
                    <Text variant="body2" fontWeight="bold" as="span">Correction:</Text>
                    <Text variant="body2" as="span"> You have the right to request that we correct inaccurate or incomplete information about you.</Text>
                  </Box>
                  <Box as="li" mb={`${PHI * 8}px`}>
                    <Text variant="body2" fontWeight="bold" as="span">Deletion:</Text>
                    <Text variant="body2" as="span"> In certain circumstances, you have the right to request deletion of your personal information.</Text>
                  </Box>
                  <Box as="li" mb={`${PHI * 8}px`}>
                    <Text variant="body2" fontWeight="bold" as="span">Restriction:</Text>
                    <Text variant="body2" as="span"> You have the right to request that we restrict the processing of your information.</Text>
                  </Box>
                  <Box as="li">
                    <Text variant="body2" fontWeight="bold" as="span">Objection:</Text>
                    <Text variant="body2" as="span"> You have the right to object to the processing of your personal information.</Text>
                  </Box>
                </Box>
                <Paragraph variant="body2">
                  To exercise any of these rights, please contact us using the information provided at the end of this policy.
                </Paragraph>
              </Box>
              
              {/* Contact Information */}
              <SectionTitle 
                title="Contact Us" 
                size="medium"
                align="left"
                decoratorBefore={<SecurityShield size="sm" opacity={0.3} />}
              />
              
              <Box>
                <Paragraph variant="body2" mb={`${PHI * 16}px`}>
                  If you have any questions about this Privacy Policy or our privacy practices, please contact us at:
                </Paragraph>
                <Card
                  padding={`${PHI * 24}px`}
                  borderRadius="8px"
                  backgroundColor="white"
                  borderLeft={`4px solid #4a6eb3`}
                >
                  <Text variant="body2" mb={`${PHI * 8}px`} fontWeight="bold">
                    Recovery Office
                  </Text>
                  <Text variant="body2" mb={`${PHI * 8}px`}>
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

      {/* CTA Section */}
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
                Need More Information?
              </Heading>
              <Paragraph variant="body1" mb={`${PHI * 24}px`}>
                If you have questions about our privacy practices or would like to learn more about how we protect your data, our team is here to help.
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
                  Contact Us
                </Button>
                <Button 
                  variant="outline" 
                  size="md"
                  href="/faq"
                >
                  View FAQ
                </Button>
              </Box>
            </Box>
          </Container>
        </Section>
      </ScrollReveal>
    </Box>
  );
};

export default PrivacyPage; 







