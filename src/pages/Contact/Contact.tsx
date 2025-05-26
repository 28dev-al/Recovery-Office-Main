import * as React from 'react';
import { Hero } from '../../design-system/components/feature-sections';
import { FlowerOfLife, OliveBranch, VesicaPiscis } from '../../design-system/botanical';
import { Box, Container, Grid } from '../../design-system/components/layout';
import { Section, SectionTitle, SectionContent } from '../../design-system/components/layout/Section';
import { Text, Paragraph, Heading } from '../../design-system/components/typography';
import { Card } from '../../design-system/components/data-display';
import { 
  FormControl, 
  FormLabel, 
  FormError,
  Input, 
  TextArea,
  Select
} from '../../design-system/components/form';
import { Button } from '../../design-system/components/button';
import { ScrollReveal } from '../../animation';
import { PHI, PHI_INVERSE } from '../../constants/sacred-geometry';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

/**
 * Contact Page Component
 * 
 * This component represents the contact page of the Recovery Office website.
 * It includes a contact form and office information.
 * Design follows sacred geometry principles throughout.
 */
const ContactPage: React.FC = () => {
  // Hero section background
  const heroBackgroundUrl = 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1920&q=80';

  // Form validation schema using Zod
  const contactFormSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    phone: z.string().optional(),
    subject: z.string().min(3, "Please select a subject"),
    message: z.string().min(10, "Message must be at least 10 characters")
  });

  type ContactFormData = z.infer<typeof contactFormSchema>;

  // React Hook Form setup
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting },
    reset
  } = useForm<ContactFormData>();

  // Form submission handler
  const onSubmit = async (data: ContactFormData) => {
    // Simulating API call with timeout
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Form submitted:', data);
    
    // Reset form after submission
    reset();
    
    // Show success message (in a real app, use a toast notification)
    alert('Thank you for your message. We will get back to you soon.');
  };

  return (
    <Box as="main">
      {/* Hero Section */}
      <Hero
        heading="Contact Us"
        subheading="Connect with our team of specialists"
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
          Reach out to us with any questions about our services or to schedule 
          a consultation with one of our specialists.
        </Text>
      </Hero>

      {/* Contact Form Section */}
      <ScrollReveal>
        <Section backgroundColor="#ffffff">
          <Container>
            <Grid 
              gridTemplateColumns={{ xs: "1fr", md: `${PHI}fr ${PHI_INVERSE}fr` }}
              gap={`${PHI * 32}px`}
              padding={`${PHI * 24}px 0`}
            >
              {/* Contact Form */}
              <Box>
                <SectionTitle 
                  title="Send Us a Message" 
                  subtitle="We&apos;ll respond within 24 hours"
                  size="medium"
                  align="left"
                  decoratorBefore={<OliveBranch size="sm" opacity={0.3} />}
                />
                
                <form 
                  onSubmit={handleSubmit(onSubmit)}
                  style={{ marginTop: `${PHI * 16}px` }}
                >
                  <Grid gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr" }} gap={`${PHI * 16}px`}>
                    <FormControl isInvalid={!!errors.name}>
                      <FormLabel htmlFor="name">Name</FormLabel>
                      <Input 
                        id="name" 
                        placeholder="Your full name" 
                        {...register('name')}
                      />
                      {errors.name && <FormError>{errors.name.message}</FormError>}
                    </FormControl>

                    <FormControl isInvalid={!!errors.email}>
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <Input 
                        id="email" 
                        placeholder="Your email address" 
                        type="email" 
                        {...register('email')}
                      />
                      {errors.email && <FormError>{errors.email.message}</FormError>}
                    </FormControl>
                  </Grid>

                  <Grid gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr" }} gap={`${PHI * 16}px`} mt={4}>
                    <FormControl isInvalid={!!errors.phone}>
                      <FormLabel htmlFor="phone">Phone (Optional)</FormLabel>
                      <Input 
                        id="phone" 
                        placeholder="Your phone number" 
                        {...register('phone')}
                      />
                      {errors.phone && <FormError>{errors.phone.message}</FormError>}
                    </FormControl>

                    <FormControl isInvalid={!!errors.subject}>
                      <FormLabel htmlFor="subject">Subject</FormLabel>
                      <Select 
                        id="subject" 
                        {...register('subject')}
                      >
                        <option value="">Select a subject</option>
                        <option value="consultation">Book a Consultation</option>
                        <option value="services">Services Inquiry</option>
                        <option value="pricing">Pricing Information</option>
                        <option value="support">Support</option>
                        <option value="other">Other</option>
                      </Select>
                      {errors.subject && <FormError>{errors.subject.message}</FormError>}
                    </FormControl>
                  </Grid>

                  <FormControl isInvalid={!!errors.message} mt={4}>
                    <FormLabel htmlFor="message">Message</FormLabel>
                    <TextArea 
                      id="message" 
                      placeholder="How can we help you?" 
                      rows={5} 
                      {...register('message')}
                    />
                    {errors.message && <FormError>{errors.message.message}</FormError>}
                  </FormControl>

                  <Box mt={`${PHI * 24}px`}>
                    <Button 
                      type="submit" 
                      variant="primary" 
                      size="large"
                      width="100%"
                      isLoading={isSubmitting}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </Box>
                </form>
              </Box>

              {/* Contact Information */}
              <Box>
                <SectionTitle 
                  title="Contact Information" 
                  subtitle="Ways to reach us"
                  size="medium"
                  align="left"
                  decoratorBefore={<VesicaPiscis size="sm" opacity={0.3} />}
                />
                
                <Box mt={4}>
                  <Card
                    elevation={2}
                    padding={`${PHI * 24}px`}
                    borderRadius="8px"
                    style={{
                      backgroundColor: 'white',
                      borderLeft: `4px solid #4a6eb3`
                    }}
                  >
                    <Box marginBottom={`${PHI * 24}px`}>
                      <Heading as="h3" variant="h5" marginBottom={`${PHI * 8}px`}>
                        Main Office
                      </Heading>
                      <Text variant="body2">
                        123 Harmony Way, Suite 618<br />
                        Golden Springs, CA 91234
                      </Text>
                    </Box>
                    
                    <Box marginBottom={`${PHI * 24}px`}>
                      <Heading as="h3" variant="h5" marginBottom={`${PHI * 8}px`}>
                        Contact Details
                      </Heading>
                      <Box marginBottom={`${PHI * 8}px`}>
                        <Text variant="subtitle2">Email:</Text>
                        <Text variant="body2">
                          <a href="mailto:info@recoveryoffice.com" style={{ color: '#4a6eb3' }}>
                            info@recoveryoffice.com
                          </a>
                        </Text>
                      </Box>
                      <Box marginBottom={`${PHI * 8}px`}>
                        <Text variant="subtitle2">Phone:</Text>
                        <Text variant="body2">
                          <a href="tel:+1-555-123-4567" style={{ color: '#4a6eb3' }}>
                            (555) 123-4567
                          </a>
                        </Text>
                      </Box>
                      <Box>
                        <Text variant="subtitle2">Fax:</Text>
                        <Text variant="body2">(555) 123-4568</Text>
                      </Box>
                    </Box>
                    
                    <Box marginBottom={`${PHI * 24}px`}>
                      <Heading as="h3" variant="h5" marginBottom={`${PHI * 8}px`}>
                        Hours of Operation
                      </Heading>
                      <Box marginBottom={`${PHI * 4}px`}>
                        <Text variant="subtitle2" display="inline" marginRight={`${PHI * 8}px`}>
                          Monday - Friday:
                        </Text>
                        <Text variant="body2" display="inline">
                          9:00 AM - 6:00 PM
                        </Text>
                      </Box>
                      <Box marginBottom={`${PHI * 4}px`}>
                        <Text variant="subtitle2" display="inline" marginRight={`${PHI * 8}px`}>
                          Saturday:
                        </Text>
                        <Text variant="body2" display="inline">
                          10:00 AM - 3:00 PM
                        </Text>
                      </Box>
                      <Box>
                        <Text variant="subtitle2" display="inline" marginRight={`${PHI * 8}px`}>
                          Sunday:
                        </Text>
                        <Text variant="body2" display="inline">
                          Closed
                        </Text>
                      </Box>
                    </Box>
                    
                    <Box>
                      <Heading as="h3" variant="h5" marginBottom={`${PHI * 8}px`}>
                        Follow Us
                      </Heading>
                      <Box display="flex" gap={`${PHI * 8}px`}>
                        <Button variant="outline" size="small">LinkedIn</Button>
                        <Button variant="outline" size="small">Twitter</Button>
                        <Button variant="outline" size="small">Instagram</Button>
                      </Box>
                    </Box>
                  </Card>
                </Box>
              </Box>
            </Grid>
          </Container>
        </Section>
      </ScrollReveal>

      {/* Map Section */}
      <ScrollReveal>
        <Section backgroundColor="#f0f4f8">
          <Container>
            <SectionTitle 
              title="Visit Our Office" 
              subtitle="Located in the heart of Golden Springs"
              decoratorBefore={<FlowerOfLife size="sm" opacity={0.15} />}
              decoratorAfter={<FlowerOfLife size="sm" opacity={0.15} />}
            />
            <SectionContent>
              <Box 
                height={`${PHI * 300}px`} 
                borderRadius="8px" 
                overflow="hidden" 
                style={{
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                }}
              >
                {/* Map would go here - using a placeholder */}
                <Box 
                  width="100%" 
                  height="100%" 
                  display="flex" 
                  alignItems="center" 
                  justifyContent="center" 
                  backgroundColor="#dde4ed"
                >
                  <Text variant="subtitle1">Interactive Map Would Be Displayed Here</Text>
                </Box>
              </Box>
            </SectionContent>
          </Container>
        </Section>
      </ScrollReveal>

      {/* FAQ Section */}
      <ScrollReveal>
        <Section backgroundColor="#ffffff">
          <Container>
            <SectionTitle 
              title="Frequently Asked Questions" 
              subtitle="Quick answers to common inquiries"
              decoratorBefore={<OliveBranch size="sm" opacity={0.3} />}
              decoratorAfter={<OliveBranch size="sm" opacity={0.3} mirror />}
            />
            <SectionContent>
              <Grid 
                gridTemplateColumns={{ xs: "1fr", sm: "1fr", md: "1fr 1fr" }}
                gap={`${PHI * 24}px`}
              >
                <Card padding={`${PHI * 16}px`} borderRadius="8px">
                  <Heading as="h3" variant="h5" marginBottom={`${PHI * 8}px`}>
                    What are your hours of operation?
                  </Heading>
                  <Paragraph variant="body2">
                    We are open Monday through Friday from 9:00 AM to 6:00 PM, and Saturday from 10:00 AM to 3:00 PM.
                    We are closed on Sundays and major holidays.
                  </Paragraph>
                </Card>
                
                <Card padding={`${PHI * 16}px`} borderRadius="8px">
                  <Heading as="h3" variant="h5" marginBottom={`${PHI * 8}px`}>
                    How do I schedule a consultation?
                  </Heading>
                  <Paragraph variant="body2">
                    You can schedule a consultation by calling our office, using our online booking system, 
                    or sending us a message through this contact form. We aim to respond to all inquiries within 24 hours.
                  </Paragraph>
                </Card>
                
                <Card padding={`${PHI * 16}px`} borderRadius="8px">
                  <Heading as="h3" variant="h5" marginBottom={`${PHI * 8}px`}>
                    Do you accept insurance?
                  </Heading>
                  <Paragraph variant="body2">
                    We accept most major insurance plans. Please contact our office with your insurance information, 
                    and we will verify your coverage and benefits before your appointment.
                  </Paragraph>
                </Card>
                
                <Card padding={`${PHI * 16}px`} borderRadius="8px">
                  <Heading as="h3" variant="h5" marginBottom={`${PHI * 8}px`}>
                    What if I need to cancel or reschedule?
                  </Heading>
                  <Paragraph variant="body2">
                    We understand that schedules change. We request at least 24 hours' notice for cancellations or 
                    rescheduling. You can call our office or use our online system to make these changes.
                  </Paragraph>
                </Card>
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
          </Container>
        </Section>
      </ScrollReveal>

      {/* Booking CTA */}
      <ScrollReveal>
        <Section 
          backgroundColor="linear-gradient(135deg, #4a6eb3 0%, #2a4073 100%)"
          style={{
            color: 'white',
            paddingTop: `${PHI * 32}px`,
            paddingBottom: `${PHI * 32}px`
          }}
        >
          <Container>
            <Box textAlign="center">
              <Heading as="h2" variant="h2" style={{ color: 'white', marginBottom: `${PHI * 16}px` }}>
                Ready to Experience Our Approach?
              </Heading>
              <Text variant="body1" style={{ 
                maxWidth: `${PHI * 500}px`, 
                margin: '0 auto', 
                marginBottom: `${PHI * 24}px` 
              }}>
                Schedule a consultation today and discover how our sacred geometry-based 
                approach can help you achieve balance and harmony.
              </Text>
              <Button 
                variant="accent" 
                size="large"
                href="/booking"
              >
                Book a Consultation
              </Button>
            </Box>
          </Container>
        </Section>
      </ScrollReveal>
    </Box>
  );
};

export default ContactPage; 






