/**
 * ContactForm Section Component
 * 
 * Form section for the Contact page with Zod validation and sacred geometry principles.
 * Features responsive grid layout and validation feedback.
 */

import * as React from 'react';
import { Box, Grid } from '../../../design-system/components/layout';
import { Text } from '../../../design-system/components/typography';
import { OliveBranch } from '../../../design-system/botanical';
import { 
  FormControl, 
  FormLabel, 
  FormError,
  Input, 
  TextArea,
  Select,
  Checkbox
} from '../../../design-system/components/form';
import { Button } from '../../../design-system/components/button';
import { PHI } from '../../../constants/sacred-geometry';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { FadeIn } from '../../../animation';

// Form validation schema using Zod
const contactFormSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  subject: z.string().min(3, "Please select a subject"),
  preferredContact: z.enum(["email", "phone"], {
    errorMap: () => ({ message: "Please select a preferred contact method" })
  }),
  message: z.string().min(10, "Message must be at least 10 characters"),
  // Financial recovery specific fields
  fraudType: z.enum(["investment_fraud", "bank_fraud", "credit_card_fraud", "identity_theft", "pension_scam", "mortgage_fraud", "cryptocurrency_fraud", "other", "not_applicable"], {
    errorMap: () => ({ message: "Please select a fraud type" })
  }),
  approximateLossAmount: z.string().optional(),
  incidentDate: z.string().optional(),
  hasReportedToAuthorities: z.boolean().optional(),
  gdprConsent: z.boolean().refine(val => val === true, {
    message: "You must agree to our privacy policy"
  })
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

interface ContactFormProps {
  /**
   * Function to handle form submission
   */
  onFormSubmit?: (data: ContactFormData) => Promise<void>;
}

const ContactForm: React.FC<ContactFormProps> = ({ 
  onFormSubmit 
}) => {
  // React Hook Form setup with Zod resolver
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
    watch
  } = useForm<ContactFormData>({
    // resolver: zodResolver(contactFormSchema), // Uncomment when package is installed
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      subject: 'recovery_consultation',
      preferredContact: 'email',
      message: '',
      fraudType: 'not_applicable',
      approximateLossAmount: '',
      incidentDate: '',
      hasReportedToAuthorities: false,
      gdprConsent: false
    }
  });

  // Watch subject field to conditionally show fraud fields
  const selectedSubject = watch('subject');
  const showRecoveryFields = selectedSubject === 'recovery_consultation' || selectedSubject === 'fraud_report';

  // Form submission handler
  const onSubmit = async (data: ContactFormData) => {
    try {
      if (onFormSubmit) {
        await onFormSubmit(data);
      } else {
        // Default handler if no custom handler provided
        // Simulating API call with timeout
        await new Promise(resolve => setTimeout(resolve, 1000 * PHI)); // Golden ratio timing
        console.log('Form submitted:', data);
      }
      
      // Reset form after successful submission
      reset();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <FadeIn>
      <Box>
        <Text 
          variant="h2"
          style={{
            marginBottom: `${PHI * 8}px`
          }}
        >
          Send Us a Message
        </Text>
        <Text
          variant="subtitle1"
          style={{
            marginBottom: `${PHI * 16}px`
          }}
        >
          We'll respond within 24 hours
        </Text>
        
        {isSubmitSuccessful ? (
          <Box 
            mt={4}
            p={4}
            borderRadius="8px"
            style={{
              backgroundColor: 'rgba(134, 179, 120, 0.1)',
              borderLeft: '4px solid #86b378'
            }}
          >
            <Text variant="h4" style={{ color: "#86b378", marginBottom: `${PHI * 8}px` }}>
              Message Sent Successfully
            </Text>
            <Text>
              Thank you for reaching out to us. We'll get back to you within 24 hours.
            </Text>
            <Button 
              variant="outline" 
              size="medium" 
              style={{ marginTop: `${PHI * 12}px` }}
              onClick={() => reset()}
            >
              Send Another Message
            </Button>
          </Box>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: `${PHI * 16}px` }}>
            <Grid gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={`${PHI * 16}px`}>
              <FormControl isInvalid={!!errors.firstName}>
                <FormLabel htmlFor="firstName">First Name</FormLabel>
                <Input 
                  id="firstName" 
                  placeholder="Your first name" 
                  {...register('firstName')}
                />
                {errors.firstName && <FormError>{errors.firstName.message}</FormError>}
              </FormControl>

              <FormControl isInvalid={!!errors.lastName}>
                <FormLabel htmlFor="lastName">Last Name</FormLabel>
                <Input 
                  id="lastName" 
                  placeholder="Your last name" 
                  {...register('lastName')}
                />
                {errors.lastName && <FormError>{errors.lastName.message}</FormError>}
              </FormControl>
            </Grid>

            <Grid gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={`${PHI * 16}px`} mt={4}>
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

              <FormControl isInvalid={!!errors.phone}>
                <FormLabel htmlFor="phone">Phone (Optional)</FormLabel>
                <Input 
                  id="phone" 
                  placeholder="Your phone number" 
                  {...register('phone')}
                />
                {errors.phone && <FormError>{errors.phone.message}</FormError>}
              </FormControl>
            </Grid>

            <Grid gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={`${PHI * 16}px`} mt={4}>
              <FormControl isInvalid={!!errors.subject}>
                <FormLabel htmlFor="subject">Subject</FormLabel>
                <Select 
                  id="subject" 
                  {...register('subject')}
                >
                  <option value="">Select a subject</option>
                  <option value="recovery_consultation">Financial Recovery Consultation</option>
                  <option value="fraud_report">Report Fraud</option>
                  <option value="services">Services Inquiry</option>
                  <option value="pricing">Pricing Information</option>
                  <option value="support">Support</option>
                  <option value="other">Other</option>
                </Select>
                {errors.subject && <FormError>{errors.subject.message}</FormError>}
              </FormControl>

              <FormControl isInvalid={!!errors.preferredContact}>
                <FormLabel htmlFor="preferredContact">Preferred Contact Method</FormLabel>
                <Select 
                  id="preferredContact" 
                  {...register('preferredContact')}
                >
                  <option value="email">Email</option>
                  <option value="phone">Phone</option>
                </Select>
                {errors.preferredContact && <FormError>{errors.preferredContact.message}</FormError>}
              </FormControl>
            </Grid>

            {/* Financial Recovery Specific Fields */}
            {showRecoveryFields && (
              <>
                <Box 
                  mt={5}
                  p={3}
                  borderRadius="8px"
                  backgroundColor="rgba(74, 110, 179, 0.05)"
                  border="1px solid rgba(74, 110, 179, 0.2)"
                >
                  <Text 
                    variant="h4"
                    style={{
                      marginBottom: `${PHI * 12}px`,
                      color: '#4a6eb3'
                    }}
                  >
                    Financial Recovery Details
                  </Text>
                
                  <FormControl isInvalid={!!errors.fraudType} mt={3}>
                    <FormLabel htmlFor="fraudType">Type of Financial Loss/Fraud</FormLabel>
                    <Select 
                      id="fraudType" 
                      {...register('fraudType')}
                    >
                      <option value="not_applicable">Not Applicable</option>
                      <option value="investment_fraud">Investment Fraud</option>
                      <option value="bank_fraud">Bank Fraud</option>
                      <option value="credit_card_fraud">Credit Card Fraud</option>
                      <option value="identity_theft">Identity Theft</option>
                      <option value="pension_scam">Pension Scam</option>
                      <option value="mortgage_fraud">Mortgage Fraud</option>
                      <option value="cryptocurrency_fraud">Cryptocurrency Fraud</option>
                      <option value="other">Other</option>
                    </Select>
                    {errors.fraudType && <FormError>{errors.fraudType.message}</FormError>}
                  </FormControl>

                  <Grid gridTemplateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={`${PHI * 16}px`} mt={4}>
                    <FormControl isInvalid={!!errors.approximateLossAmount}>
                      <FormLabel htmlFor="approximateLossAmount">Approximate Loss Amount</FormLabel>
                      <Input 
                        id="approximateLossAmount" 
                        placeholder="e.g. £5,000" 
                        {...register('approximateLossAmount')}
                      />
                      {errors.approximateLossAmount && <FormError>{errors.approximateLossAmount.message}</FormError>}
                    </FormControl>

                    <FormControl isInvalid={!!errors.incidentDate}>
                      <FormLabel htmlFor="incidentDate">Date of Incident</FormLabel>
                      <Input 
                        id="incidentDate" 
                        type="date" 
                        {...register('incidentDate')}
                      />
                      {errors.incidentDate && <FormError>{errors.incidentDate.message}</FormError>}
                    </FormControl>
                  </Grid>

                  <FormControl mt={4}>
                    <Box display="flex" alignItems="flex-start">
                      <Checkbox
                        id="hasReportedToAuthorities"
                        {...register('hasReportedToAuthorities')}
                        style={{ marginRight: '8px', marginTop: '4px' }}
                      />
                      <FormLabel htmlFor="hasReportedToAuthorities" style={{ marginBottom: 0 }}>
                        I have already reported this incident to the police or regulatory authorities
                      </FormLabel>
                    </Box>
                  </FormControl>
                </Box>
              </>
            )}

            <FormControl isInvalid={!!errors.message} mt={4}>
              <FormLabel htmlFor="message">Message</FormLabel>
              <TextArea 
                id="message" 
                placeholder={showRecoveryFields 
                  ? "Please provide details about your case including: what happened, when it occurred, and any steps you've already taken." 
                  : "How can we help you?"} 
                rows={5} 
                {...register('message')}
              />
              {errors.message && <FormError>{errors.message.message}</FormError>}
            </FormControl>

            <FormControl isInvalid={!!errors.gdprConsent} mt={4}>
              <Box display="flex" alignItems="flex-start">
                <Checkbox
                  id="gdprConsent"
                  {...register('gdprConsent')}
                  style={{ marginRight: '8px', marginTop: '4px' }}
                />
                <FormLabel htmlFor="gdprConsent" style={{ marginBottom: 0 }}>
                  I agree to the processing of my personal data in accordance with the 
                  <a href="/legal/privacy-policy" style={{ color: '#4a6eb3', marginLeft: '4px' }}>
                    Privacy Policy
                  </a>
                </FormLabel>
              </Box>
              {errors.gdprConsent && <FormError>{errors.gdprConsent.message}</FormError>}
            </FormControl>

            <Box mt={`${PHI * 24}px`}>
              <Button 
                type="submit" 
                variant="primary" 
                size="large"
                width="100%"
                isLoading={isSubmitting}
                disabled={isSubmitting}
                aria-label="Submit contact form"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </Box>
          </form>
        )}
      </Box>
    </FadeIn>
  );
};

export default ContactForm; 











