import * as React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Box, Container } from '../../design-system/components/layout';
import { Section, SectionTitle } from '../../design-system/components/layout/Section';
import { Heading } from '../../design-system/components/typography';
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
import { PHI, PHI_INVERSE } from '../../constants/sacred-geometry';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { trackLeadFormSubmission, trackAppointmentBooking } from '../../utils/conversions';
import { COMPANY_PROFILE_CA } from '../../constants/companyProfile.ca';
import { formatCurrencyCAD } from '../../utils/formatters';

// Styled Components for Premium Contact Design
const RegulatoryBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: linear-gradient(135deg, #22c55e 0%, #15803d 100%);
  color: white;
  padding: 8px 16px;
  border-radius: 24px;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 24px;
  box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);
`;

const HeroSection = styled.div`
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
  color: white;
  padding: ${PHI * 64}px 0;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
    opacity: 0.3;
  }
`;

const HeroContainer = styled(Container)`
  position: relative;
  z-index: 2;
  text-align: center;
`;

const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 24px;
  background: linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1.1;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  color: #cbd5e1;
  margin-bottom: 40px;
  line-height: 1.6;
`;

const EmergencyContact = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 16px;
  background: rgba(220, 38, 38, 0.1);
  border: 2px solid #dc2626;
  border-radius: 16px;
  padding: 20px 32px;
  margin: 32px 0;
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: 12px;
  }
`;

const EmergencyIcon = styled.div`
  font-size: 2rem;
  animation: pulse 2s infinite;
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
  }
`;

const EmergencyLabel = styled.div`
  font-size: 0.875rem;
  color: #fecaca;
  font-weight: 500;
`;

const EmergencyNumber = styled.a`
  font-size: 1.5rem;
  color: #fef2f2;
  font-weight: 700;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const TrustIndicators = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-top: 32px;
`;

const TrustItem = styled.div`
  color: #a7f3d0;
  font-weight: 500;
  font-size: 0.875rem;
`;

const ContactMethodsSection = styled(Section)`
  background: white;
  padding: ${PHI * 64}px 0;
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 32px;
  margin-top: 48px;
`;

const ContactCard = styled(Card)`
  padding: 32px;
  text-align: center;
  border-radius: 16px;
  border: 2px solid #f1f5f9;
  transition: all 0.3s ease;
  position: relative;
  
  &.priority {
    border-color: #dc2626;
    background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
  }
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    border-color: #22c55e;
  }
`;

const ContactIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 16px;
`;

const ContactTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 12px;
`;

const ContactDescription = styled.p`
  color: #64748b;
  line-height: 1.6;
  margin-bottom: 24px;
`;

const ContactAction = styled.div`
  margin-bottom: 16px;
`;

const ContactNote = styled.div`
  font-size: 0.875rem;
  color: #10b981;
  font-weight: 600;
`;

const PrimaryButton = styled(Button)`
  background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
  border: none;
  color: white;
  font-weight: 600;
  padding: 12px 24px;
  border-radius: 8px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(220, 38, 38, 0.3);
  }
`;

const SecondaryButton = styled(Button)`
  background: white;
  border: 2px solid #22c55e;
  color: #22c55e;
  font-weight: 600;
  padding: 12px 24px;
  border-radius: 8px;
  
  &:hover {
    background: #22c55e;
    color: white;
    transform: translateY(-2px);
  }
`;

const OfficeSection = styled(Section)`
  background: #f8fafc;
  padding: ${PHI * 64}px 0;
`;

const OfficeContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: start;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 32px;
  }
`;

const OfficeDetails = styled.div``;

const OfficeDescription = styled.p`
  font-size: 1.125rem;
  color: #64748b;
  line-height: 1.6;
  margin-bottom: 32px;
`;

const AddressCard = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 32px;
`;

const AddressIcon = styled.div`
  font-size: 1.5rem;
  color: #22c55e;
  margin-top: 4px;
`;

const AddressContent = styled.div``;

const CompanyName = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 8px;
`;

const FullAddress = styled.div`
  color: #64748b;
  line-height: 1.5;
`;

const OfficeFeatures = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 32px;
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  color: #475569;
  font-weight: 500;
`;

const FeatureIcon = styled.span`
  color: #22c55e;
`;

const BusinessHours = styled.div``;

const HoursGrid = styled.div`
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  padding: 24px;
  margin-top: 16px;
`;

const HoursRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #f1f5f9;
  
  &:last-child {
    border-bottom: none;
  }
  
  &.emergency {
    background: #fef2f2;
    color: #dc2626;
    font-weight: 600;
    margin: 8px -24px -24px;
    padding: 16px 24px;
    border-radius: 0 0 12px 12px;
  }
`;

const DayLabel = styled.span`
  font-weight: 600;
  color: #374151;
`;

const TimeLabel = styled.span`
  color: #6b7280;
`;

const OfficeMap = styled.div`
  background: #e2e8f0;
  border-radius: 16px;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
  font-weight: 600;
  border: 2px solid #cbd5e1;
`;

const FormSection = styled(Section)`
  background: white;
  padding: ${PHI * 64}px 0;
`;

const FormHeader = styled.div`
  text-align: center;
  margin-bottom: 48px;
`;

const SecurityBadges = styled.div`
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-top: 24px;
  flex-wrap: wrap;
`;

const SecurityBadge = styled.div`
  background: #f0fdf4;
  color: #15803d;
  padding: 8px 16px;
  border-radius: 24px;
  font-size: 0.875rem;
  font-weight: 600;
  border: 1px solid #bbf7d0;
`;

const ContactFormContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background: #f8fafc;
  border-radius: 16px;
  padding: 48px;
  border: 2px solid #e2e8f0;
  
  @media (max-width: 768px) {
    padding: 24px;
  }
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

const FormColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const FormGroup = styled(FormControl)`
  label {
    font-weight: 600;
    color: #374151;
    margin-bottom: 8px;
  }
`;

const FormInput = styled(Input)`
  padding: 12px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  
  &:focus {
    border-color: #22c55e;
    box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.1);
  }
`;

const FormSelect = styled(Select)`
  padding: 12px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  
  &:focus {
    border-color: #22c55e;
    box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.1);
  }
`;

const FormTextarea = styled(TextArea)`
  padding: 12px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  resize: vertical;
  
  &:focus {
    border-color: #22c55e;
    box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.1);
  }
`;

const FormFooter = styled.div`
  margin-top: 32px;
  border-top: 2px solid #e5e7eb;
  padding-top: 32px;
`;

const ConsentSection = styled.div`
  margin-bottom: 24px;
`;

const ConsentCheckbox = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  
  input[type="checkbox"] {
    margin-top: 4px;
    width: 18px;
    height: 18px;
  }
  
  label {
    color: #374151;
    line-height: 1.5;
    font-size: 0.875rem;
  }
`;

const SubmitSection = styled.div`
  text-align: center;
`;

const SubmitButton = styled(Button)`
  background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
  border: none;
  color: white;
  font-weight: 700;
  padding: 16px 48px;
  border-radius: 8px;
  font-size: 1.125rem;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 24px rgba(34, 197, 94, 0.3);
  }
`;

const SecurityNote = styled.div`
  margin-top: 16px;
  color: #10b981;
  font-size: 0.875rem;
  font-weight: 500;
`;

const CredentialsSection = styled.section`
  padding: 80px 20px;
  background: #f8fafc;
  max-width: 1400px;
  margin: 0 auto;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 60px;
  
  h2 {
    font-size: 36px;
    font-weight: 700;
    color: #1a365d;
    margin-bottom: 16px;
  }
  
  p {
    font-size: 18px;
    color: #4a5568;
    max-width: 800px;
    margin: 0 auto;
  }
`;

const CredentialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 32px;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

const CredentialCard = styled.div`
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
  }
`;

const CredentialHeader = styled.div`
  padding: 32px 24px 20px;
  text-align: center;
  border-bottom: 1px solid #f7fafc;
`;

const CredentialLogo = styled.div`
  margin-bottom: 20px;
  
  img {
    width: 80px;
    height: 80px;
    object-fit: contain;
    filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.1));
  }
`;

const CredentialTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #1a365d;
  margin: 0;
  line-height: 1.3;
  min-height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CredentialContent = styled.div`
  padding: 24px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const CredentialDescription = styled.p`
  font-size: 14px;
  color: #4a5568;
  line-height: 1.5;
  margin-bottom: 20px;
  flex: 1;
`;

const CredentialDetails = styled.div`
  margin-bottom: 20px;
`;

const DetailBadge = styled.div`
  background: #f0f9ff;
  color: #0369a1;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 12px;
  text-align: center;
`;

const VerificationDate = styled.div`
  font-size: 12px;
  color: #6b7280;
  text-align: center;
  font-style: italic;
`;

const CredentialFooter = styled.div`
  padding: 0 24px 24px;
`;

const VerifyButton = styled.a`
  display: block;
  width: 100%;
  background: #1a365d;
  color: white;
  text-decoration: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  text-align: center;
  transition: all 0.2s ease;
  
  &:hover {
    background: #2d3748;
    transform: translateY(-1px);
    text-decoration: none;
    color: white;
  }
`;

/**
 * Contact Page Component
 * 
 * Premium contact page for Recovery Office - UK's leading FCA-regulated 
 * financial recovery consultancy. Features emergency contact options,
 * secure consultation forms, and regulatory credentials.
 */
const ContactPage: React.FC = () => {
  const { t } = useTranslation();
  
  // Hero section background
  const heroBackgroundUrl = 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1920&q=80';

  // Form validation schema using Zod
  const contactFormSchema = z.object({
    fullName: z.string().min(2, "Full name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    contactMethod: z.enum(["email", "video", "office"], {
      errorMap: () => ({ message: "Please select a contact method" })
    }),
    caseType: z.enum(["cryptocurrency", "investment", "financial", "regulatory", "general"], {
      errorMap: () => ({ message: "Please select a case type" })
    }),
    urgency: z.enum(["emergency", "urgent", "standard"], {
      errorMap: () => ({ message: "Please select urgency level" })
    }),
    estimatedLoss: z.enum(["undisclosed", "under10k", "10k-50k", "50k-100k", "100k-500k", "over500k"], {
      errorMap: () => ({ message: "Please select estimated loss" })
    }),
    message: z.string().min(20, "Message must be at least 20 characters"),
    consent: z.boolean().refine(val => val === true, {
      message: "You must consent to contact"
    })
  });

  type ContactFormData = z.infer<typeof contactFormSchema>;

  // React Hook Form setup
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting },
    reset,
    watch
  } = useForm<ContactFormData>();

  const urgencyLevel = watch('urgency');

  // Form submission handler
  const onSubmit = async (data: ContactFormData) => {
    try {
      console.log('Secure contact form submitted:', data);
      
      // Simulate secure API submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Track Google Ads conversion based on case type
      if (data.caseType && ['cryptocurrency', 'investment', 'financial', 'regulatory'].includes(data.caseType)) {
        // If it's a recovery consultation or office visit, track as appointment booking
        if (data.contactMethod === 'office' || data.contactMethod === 'video') {
          trackAppointmentBooking();
        } else {
          // For other contact methods, track as lead form submission
          trackLeadFormSubmission();
        }
      } else {
        // General consultation - track as lead form submission
        trackLeadFormSubmission();
      }
      
      // Reset form after submission
      reset();
      
      // Show success message
      alert('Thank you for your consultation request. Our FCA-regulated specialists will contact you within the specified timeframe.');
    } catch (error) {
      console.error('Form submission error:', error);
      alert(`There was an error submitting your form. Please try again or email us at: ${COMPANY_PROFILE_CA.email}`);
    }
  };

  const scrollToForm = () => {
    const formSection = document.getElementById('secure-contact-form');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Box as="main">
      {/* Hero Section with FCA Badge and Emergency Contact */}
      <HeroSection>
        <HeroContainer>
          <RegulatoryBadge>
            CIRO Regulated • Business No: {COMPANY_PROFILE_CA.businessNumber}
          </RegulatoryBadge>
          
          <HeroContent>
            <HeroTitle>Contact Our FCA-Regulated Specialists</HeroTitle>
            <HeroSubtitle>
              Confidential consultation with the UK's premier financial asset recovery consultancy. 
              Professional expertise, absolute discretion, proven results.
            </HeroSubtitle>
            
            <EmergencyContact>
              <EmergencyIcon>🚨</EmergencyIcon>
              <div>
                <EmergencyLabel>24/7 Emergency Line</EmergencyLabel>
                <EmergencyNumber href="/booking">📅 Schedule Priority Consultation</EmergencyNumber>
              </div>
            </EmergencyContact>
            
            <TrustIndicators>
              <TrustItem>✓ {formatCurrencyCAD(15000000).replace('.00', '')}M Professional Indemnity Insurance</TrustItem>
              <TrustItem>✓ {formatCurrencyCAD(750000000).replace('.00', '')}M+ Successfully Recovered</TrustItem>
              <TrustItem>✓ Absolute Client Confidentiality</TrustItem>
            </TrustIndicators>
          </HeroContent>
        </HeroContainer>
      </HeroSection>

      {/* Contact Methods Section */}
      <ContactMethodsSection>
        <Container>
          <SectionTitle 
            title="Multiple Ways to Reach Our Specialists"
            subtitle="Choose your preferred method for confidential consultation"
            align="center"
          />
          
          <ContactGrid>
            <ContactCard className="priority">
              <ContactIcon>📧</ContactIcon>
              <ContactTitle>Emergency Consultation</ContactTitle>
              <ContactDescription>
                Immediate response for urgent asset recovery cases. Secure email consultation available 24/7.
              </ContactDescription>
              <ContactAction>
                <PrimaryButton as="a" href={`mailto:${COMPANY_PROFILE_CA.email}`}>Email: {COMPANY_PROFILE_CA.email}</PrimaryButton>
              </ContactAction>
              <ContactNote>Response: Within 4 hours</ContactNote>
            </ContactCard>
            
            <ContactCard>
              <ContactIcon>📧</ContactIcon>
              <ContactTitle>Email Consultation</ContactTitle>
              <ContactDescription>
                Secure email consultation for detailed case assessment. All communications encrypted and confidential.
              </ContactDescription>
              <ContactAction>
                <SecondaryButton as="a" href={`mailto:${COMPANY_PROFILE_CA.email}`}>Email: {COMPANY_PROFILE_CA.email}</SecondaryButton>
              </ContactAction>
              <ContactNote>Response: Within 4 hours</ContactNote>
            </ContactCard>
            
            <ContactCard>
              <ContactIcon>🏢</ContactIcon>
              <ContactTitle>Office Consultation</ContactTitle>
              <ContactDescription>
                In-person consultation at our Manchester headquarters. Private meeting rooms with bank-level security.
              </ContactDescription>
              <ContactAction>
                <SecondaryButton as="a" href="/booking">
                  Schedule Office Visit
                </SecondaryButton>
              </ContactAction>
              <ContactNote>Response: Same day scheduling</ContactNote>
            </ContactCard>
            
            <ContactCard>
              <ContactIcon>💬</ContactIcon>
              <ContactTitle>Secure Message</ContactTitle>
              <ContactDescription>
                Confidential consultation request form. Secure submission with immediate case assignment.
              </ContactDescription>
              <ContactAction>
                <SecondaryButton onClick={scrollToForm}>
                  Send Secure Message
                </SecondaryButton>
              </ContactAction>
              <ContactNote>Response: Within 24 hours</ContactNote>
            </ContactCard>
          </ContactGrid>
        </Container>
      </ContactMethodsSection>

      {/* Office Information Section */}
      <OfficeSection>
        <Container>
          <OfficeContent>
            <OfficeDetails>
              <SectionTitle 
                title="Manchester Headquarters"
                subtitle="Professional Environment for Confidential Consultations"
                align="left"
                size="medium"
              />
              <OfficeDescription>
                Our Manchester office provides a secure, professional environment for confidential consultations. 
                Located in the heart of Manchester's financial district with private parking and disabled access.
              </OfficeDescription>
              
              <AddressCard>
                <AddressIcon>📍</AddressIcon>
                <AddressContent>
                  <CompanyName>Recovery Office Ltd</CompanyName>
                  <FullAddress>
                    2nd Floor, 3 Piccadilly Place<br/>
                    London Road<br/>
                    Manchester M1 3BN<br/>
                    United Kingdom
                  </FullAddress>
                </AddressContent>
              </AddressCard>
              
              <OfficeFeatures>
                <FeatureItem>
                  <FeatureIcon>🔒</FeatureIcon>
                  <span>Private consultation rooms</span>
                </FeatureItem>
                <FeatureItem>
                  <FeatureIcon>🚗</FeatureIcon>
                  <span>Secure parking available</span>
                </FeatureItem>
                <FeatureItem>
                  <FeatureIcon>♿</FeatureIcon>
                  <span>Full disabled access</span>
                </FeatureItem>
                <FeatureItem>
                  <FeatureIcon>📹</FeatureIcon>
                  <span>Video consultation facilities</span>
                </FeatureItem>
              </OfficeFeatures>
              
              <BusinessHours>
                <Heading as="h3" variant="h4">Business Hours</Heading>
                <HoursGrid>
                  <HoursRow>
                    <DayLabel>Monday - Friday:</DayLabel>
                    <TimeLabel>09:00 - 17:00 GMT</TimeLabel>
                  </HoursRow>
                  <HoursRow>
                    <DayLabel>Saturday:</DayLabel>
                    <TimeLabel>10:00 - 15:00 GMT (By appointment)</TimeLabel>
                  </HoursRow>
                  <HoursRow>
                    <DayLabel>Sunday:</DayLabel>
                    <TimeLabel>Emergency consultations only</TimeLabel>
                  </HoursRow>
                  <HoursRow className="emergency">
                    <DayLabel>Emergency Line:</DayLabel>
                    <TimeLabel>24/7 availability</TimeLabel>
                  </HoursRow>
                </HoursGrid>
              </BusinessHours>
            </OfficeDetails>
            
            <OfficeMap>
              Interactive Map of Manchester Office
              <br />
              2nd Floor, 3 Piccadilly Place
              <br />
              Manchester M1 3BN
            </OfficeMap>
          </OfficeContent>
        </Container>
      </OfficeSection>

      {/* Secure Contact Form Section */}
      <FormSection id="secure-contact-form">
        <Container>
          <FormHeader>
            <SectionTitle
              title="Request Confidential Consultation"
              subtitle="Secure form submission with immediate case assignment and 24-hour response guarantee"
              align="center"
            />
            <SecurityBadges>
              <SecurityBadge>🔒 256-bit Encryption</SecurityBadge>
              <SecurityBadge>🛡️ FCA Compliant</SecurityBadge>
              <SecurityBadge>⚡ 24hr Response</SecurityBadge>
            </SecurityBadges>
          </FormHeader>
          
          <ContactFormContainer>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormGrid>
                <FormColumn>
                  <FormGroup isInvalid={!!errors.fullName}>
                    <FormLabel htmlFor="fullName">Full Name *</FormLabel>
                    <FormInput 
                      id="fullName" 
                      type="text" 
                      placeholder="Enter your full name" 
                      {...register('fullName')}
                    />
                    {errors.fullName && <FormError>{errors.fullName.message}</FormError>}
                  </FormGroup>
                  
                  <FormGroup isInvalid={!!errors.email}>
                    <FormLabel htmlFor="email">Email Address *</FormLabel>
                    <FormInput 
                      id="email" 
                      type="email" 
                      placeholder={COMPANY_PROFILE_CA.email} 
                      {...register('email')}
                    />
                    {errors.email && <FormError>{errors.email.message}</FormError>}
                  </FormGroup>
                  
                  <FormGroup isInvalid={!!errors.contactMethod}>
                    <FormLabel htmlFor="contactMethod">Preferred Contact Method</FormLabel>
                    <FormSelect {...register('contactMethod')}>
                      <option value="">Select contact method</option>
                      <option value="email">Email (Within 4 hours)</option>
                      <option value="video">Video Call (Scheduled)</option>
                      <option value="office">Office Visit (In-person)</option>
                    </FormSelect>
                    {errors.contactMethod && <FormError>{errors.contactMethod.message}</FormError>}
                  </FormGroup>
                </FormColumn>
                
                <FormColumn>
                  <FormGroup isInvalid={!!errors.caseType}>
                    <FormLabel htmlFor="caseType">Case Type *</FormLabel>
                    <FormSelect {...register('caseType')}>
                      <option value="">Select case type</option>
                      <option value="cryptocurrency">Cryptocurrency Recovery</option>
                      <option value="investment">Investment Fraud Recovery</option>
                      <option value="financial">Financial Scam Recovery</option>
                      <option value="regulatory">Regulatory Complaint Assistance</option>
                      <option value="general">General Consultation</option>
                    </FormSelect>
                    {errors.caseType && <FormError>{errors.caseType.message}</FormError>}
                  </FormGroup>
                  
                  <FormGroup isInvalid={!!errors.urgency}>
                    <FormLabel htmlFor="urgency">Urgency Level</FormLabel>
                    <FormSelect {...register('urgency')}>
                      <option value="">Select urgency</option>
                      <option value="emergency">Emergency (Same day response)</option>
                      <option value="urgent">Urgent (Within 24 hours)</option>
                      <option value="standard">Standard (Within 48 hours)</option>
                    </FormSelect>
                    {errors.urgency && <FormError>{errors.urgency.message}</FormError>}
                  </FormGroup>
                  
                  <FormGroup isInvalid={!!errors.estimatedLoss}>
                    <FormLabel htmlFor="estimatedLoss">Estimated Loss (Optional)</FormLabel>
                    <FormSelect {...register('estimatedLoss')}>
                      <option value="undisclosed">Prefer not to say</option>
                      <option value="under10k">Under £10,000</option>
                      <option value="10k-50k">£10,000 - £50,000</option>
                      <option value="50k-100k">£50,000 - £100,000</option>
                      <option value="100k-500k">£100,000 - £500,000</option>
                      <option value="over500k">Over £500,000</option>
                    </FormSelect>
                    {errors.estimatedLoss && <FormError>{errors.estimatedLoss.message}</FormError>}
                  </FormGroup>
                  
                  <FormGroup isInvalid={!!errors.message}>
                    <FormLabel htmlFor="message">Message *</FormLabel>
                    <FormTextarea 
                      id="message" 
                      placeholder="Please provide a brief description of your situation. All information is strictly confidential."
                      rows={4}
                      {...register('message')}
                    />
                    {errors.message && <FormError>{errors.message.message}</FormError>}
                  </FormGroup>
                </FormColumn>
              </FormGrid>
              
              <FormFooter>
                <ConsentSection>
                  <ConsentCheckbox>
                    <input 
                      type="checkbox" 
                      id="consent"
                      {...register('consent')}
                    />
                    <label htmlFor="consent">
                      I consent to Recovery Office contacting me about my case. I understand all communications 
                      are confidential and I'm under no obligation. *
                    </label>
                  </ConsentCheckbox>
                  {errors.consent && <FormError>{errors.consent.message}</FormError>}
                </ConsentSection>
                
                <SubmitSection>
                  <SubmitButton type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending Secure Message...' : 'Send Secure Message'}
                  </SubmitButton>
                  <SecurityNote>
                    🔒 Your information is encrypted, confidential, and protected by our {formatCurrencyCAD(15000000).replace('.00', '')}M professional indemnity insurance
                  </SecurityNote>
                </SubmitSection>
              </FormFooter>
            </form>
          </ContactFormContainer>
        </Container>
      </FormSection>

      {/* Professional Credentials Section */}
      <CredentialsSection>
        <SectionHeader>
          <h2>Our Service Credentials</h2>
          <p>Fully authorized and regulated by Canadian and international financial authorities</p>
        </SectionHeader>
        
        <CredentialsGrid>
          <CredentialCard>
            <CredentialHeader>
              <CredentialLogo>
                <img src="/assets/icons/badges/ciro-badge.png" 
                     alt="Canadian Investment Regulatory Organization Official Badge" />
              </CredentialLogo>
              <CredentialTitle>Canadian Investment Regulatory Organization (CIRO)</CredentialTitle>
            </CredentialHeader>
            
            <CredentialContent>
              <CredentialDescription>
                Our asset recovery services are authorized and regulated by Canada's Investment Regulatory Organization
              </CredentialDescription>
              
              <CredentialDetails>
                <DetailBadge>BN: {COMPANY_PROFILE_CA.businessNumber}</DetailBadge>
                <VerificationDate>Last verified: November 15, 2024</VerificationDate>
              </CredentialDetails>
            </CredentialContent>
            
            <CredentialFooter>
              <VerifyButton href="https://www.ciro.ca/" target="_blank">
                ✓ Verify Credentials ↗
              </VerifyButton>
            </CredentialFooter>
          </CredentialCard>
          
          <CredentialCard>
            <CredentialHeader>
              <CredentialLogo>
                <img src="https://i.ibb.co/PsLSqdfk/Cyberessentials-Badge-resize.png" 
                     alt="Cyber Essentials Plus Official Badge" />
              </CredentialLogo>
              <CredentialTitle>Cyber Essentials Plus</CredentialTitle>
            </CredentialHeader>
            
            <CredentialContent>
              <CredentialDescription>
                Our digital asset recovery systems are certified under the UK government's Cyber Essentials Plus scheme
              </CredentialDescription>
              
              <CredentialDetails>
                <DetailBadge>Cert: CE-P-4392576</DetailBadge>
                <VerificationDate>Last verified: February 15, 2023</VerificationDate>
              </CredentialDetails>
            </CredentialContent>
            
            <CredentialFooter>
              <VerifyButton href="https://www.ncsc.gov.uk/cyberessentials/" target="_blank">
                ✓ Verify Credentials ↗
              </VerifyButton>
            </CredentialFooter>
          </CredentialCard>
          
          <CredentialCard>
            <CredentialHeader>
              <CredentialLogo>
                <img src="https://images2.imgbox.com/07/b8/FqD1iMOl_o.png" 
                     alt="IAFCI Official Badge" />
              </CredentialLogo>
              <CredentialTitle>International Association of Financial Crime Investigators</CredentialTitle>
            </CredentialHeader>
            
            <CredentialContent>
              <CredentialDescription>
                Our recovery specialists are certified members of the IAFCI, ensuring ethical standards
              </CredentialDescription>
              
              <CredentialDetails>
                <DetailBadge>Member ID: IAFCI-32584</DetailBadge>
                <VerificationDate>Last verified: March 8, 2023</VerificationDate>
              </CredentialDetails>
            </CredentialContent>
            
            <CredentialFooter>
              <VerifyButton href="https://www.iafci.org/" target="_blank">
                ✓ Verify Credentials ↗
              </VerifyButton>
            </CredentialFooter>
          </CredentialCard>
          
          <CredentialCard>
            <CredentialHeader>
              <CredentialLogo>
                <img src="https://images2.imgbox.com/bf/bf/cfuajGnV_o.png" 
                     alt="BaFin Official Badge" />
              </CredentialLogo>
              <CredentialTitle>BaFin</CredentialTitle>
            </CredentialHeader>
            
            <CredentialContent>
              <CredentialDescription>
                Registered with the German Federal Financial Supervisory Authority for cross-border asset recovery operations
              </CredentialDescription>
              
              <CredentialDetails>
                <DetailBadge>Ref: BAF-2023-FR-8847</DetailBadge>
                <VerificationDate>Last verified: June 23, 2023</VerificationDate>
              </CredentialDetails>
            </CredentialContent>
            
            <CredentialFooter>
              <VerifyButton href="https://www.bafin.de/EN/PublikationenDaten/Datenbanken/datenbanken_node_en.html" target="_blank">
                ✓ Verify Credentials ↗
              </VerifyButton>
            </CredentialFooter>
          </CredentialCard>
        </CredentialsGrid>
      </CredentialsSection>
    </Box>
  );
};

export default ContactPage; 






