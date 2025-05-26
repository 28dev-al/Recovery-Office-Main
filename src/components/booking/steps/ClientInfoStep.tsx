/**
 * ClientInfoStep Component - Comprehensive Implementation
 * 
 * Professional client information collection form for financial recovery consultations.
 * Fixed data validation logic to support multiple usage patterns and data flow scenarios.
 */

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useBooking } from '../../../context/BookingContext';
import { 
  clientInfoSchema, 
  ClientInformation, 
  caseTypeOptions, 
  urgencyLevelOptions, 
  contactMethodOptions 
} from '../../../types/clientValidation';
import { PREMIUM_SPACING } from '../../../design-system/tokens/spacing';
import { PREMIUM_COLORS } from '../../../design-system/tokens/colors.premium';
import { LoadingOverlay } from '../../../design-system/components/feedback/LoadingOverlay';
import { ErrorDisplay } from '../../../design-system/components/feedback/ErrorDisplay';
import { 
  FiUser, 
  FiMail, 
  FiPhone, 
  FiShield, 
  FiAlertCircle, 
  FiCheckCircle, 
  FiDollarSign,
  FiClock,
  FiMessageCircle
} from 'react-icons/fi';
import { vlog, verror, vsuccess } from '../../../utils/debugLogger';

// Updated interface to support all usage patterns
interface ClientInfoStepProps {
  // Required callback
  onComplete: (data?: any) => void;
  
  // Optional callbacks
  onBack?: () => void;
  onDataChange?: (data: any) => void;
  
  // Data props (multiple patterns supported)
  data?: any;
  initialData?: any;
  selectedService?: any;
  
  // State props
  isLoading?: boolean;
}

// Wrapper components for React Icons to resolve TypeScript issues
const UserIcon: React.FC<{ size?: number }> = FiUser as React.FC<{ size?: number }>;
const MailIcon: React.FC<{ size?: number }> = FiMail as React.FC<{ size?: number }>;
const PhoneIcon: React.FC<{ size?: number }> = FiPhone as React.FC<{ size?: number }>;
const ShieldIcon: React.FC<{ size?: number }> = FiShield as React.FC<{ size?: number }>;
const AlertCircleIcon: React.FC<{ size?: number }> = FiAlertCircle as React.FC<{ size?: number }>;
const CheckCircleIcon: React.FC<{ size?: number }> = FiCheckCircle as React.FC<{ size?: number }>;
const DollarSignIcon: React.FC<{ size?: number }> = FiDollarSign as React.FC<{ size?: number }>;
const ClockIcon: React.FC<{ size?: number }> = FiClock as React.FC<{ size?: number }>;
const MessageCircleIcon: React.FC<{ size?: number }> = FiMessageCircle as React.FC<{ size?: number }>;

// Professional Styled Components
const FormContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${PREMIUM_SPACING.lg}px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
`;

const FormHeader = styled.div`
  text-align: center;
  margin-bottom: ${PREMIUM_SPACING.xl}px;
  border-bottom: 1px solid ${PREMIUM_COLORS.BASE_COLORS.ivory[300]};
  padding-bottom: ${PREMIUM_SPACING.lg}px;
`;

const FormTitle = styled.h2`
  font-family: 'Playfair Display', serif;
  color: ${PREMIUM_COLORS.BASE_COLORS.forest[500]};
  font-size: 28px;
  font-weight: 700;
  margin: 0 0 ${PREMIUM_SPACING.sm}px 0;
`;

const FormSubtitle = styled.p`
  color: ${PREMIUM_COLORS.BASE_COLORS.gray[600]};
  font-size: 16px;
  line-height: 1.5;
  margin: 0 0 ${PREMIUM_SPACING.lg}px 0;
`;

const SecurityBadge = styled.div`
  display: flex;
  align-items: center;
  gap: ${PREMIUM_SPACING.sm}px;
  background: ${PREMIUM_COLORS.BASE_COLORS.forest[50]};
  border: 1px solid ${PREMIUM_COLORS.BASE_COLORS.forest[200]};
  padding: ${PREMIUM_SPACING.md}px;
  border-radius: 8px;
  font-size: 14px;
  color: ${PREMIUM_COLORS.BASE_COLORS.forest[700]};
  text-align: left;
`;

const FormBody = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${PREMIUM_SPACING.xl}px;
`;

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${PREMIUM_SPACING.md}px;
`;

const SectionTitle = styled.h3`
  color: ${PREMIUM_COLORS.BASE_COLORS.forest[500]};
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 ${PREMIUM_SPACING.sm}px 0;
  border-bottom: 2px solid ${PREMIUM_COLORS.BASE_COLORS.gold[500]};
  display: inline-flex;
  align-items: center;
  gap: ${PREMIUM_SPACING.sm}px;
  padding-bottom: 4px;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${PREMIUM_SPACING.md}px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Label = styled.label`
  color: ${PREMIUM_COLORS.BASE_COLORS.gray[700]};
  font-weight: 500;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: ${PREMIUM_SPACING.xs}px;
`;

const RequiredMark = styled.span`
  color: #dc2626;
  font-weight: 600;
`;

const Input = styled.input<{ hasError?: boolean }>`
  padding: ${PREMIUM_SPACING.md}px;
  border: 2px solid ${({ hasError }) => hasError ? '#dc2626' : PREMIUM_COLORS.BASE_COLORS.ivory[300]};
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: ${PREMIUM_COLORS.BASE_COLORS.forest[400]};
    box-shadow: 0 0 0 3px rgba(34, 82, 43, 0.1);
  }
  
  &::placeholder {
    color: ${PREMIUM_COLORS.BASE_COLORS.gray[400]};
  }
`;

const Select = styled.select<{ hasError?: boolean }>`
  padding: ${PREMIUM_SPACING.md}px;
  border: 2px solid ${({ hasError }) => hasError ? '#dc2626' : PREMIUM_COLORS.BASE_COLORS.ivory[300]};
  border-radius: 8px;
  font-size: 16px;
  background: white;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: ${PREMIUM_COLORS.BASE_COLORS.forest[400]};
    box-shadow: 0 0 0 3px rgba(34, 82, 43, 0.1);
  }
`;

const TextArea = styled.textarea`
  padding: ${PREMIUM_SPACING.md}px;
  border: 2px solid ${PREMIUM_COLORS.BASE_COLORS.ivory[300]};
  border-radius: 8px;
  font-size: 16px;
  resize: vertical;
  min-height: 100px;
  font-family: inherit;
  
  &:focus {
    outline: none;
    border-color: ${PREMIUM_COLORS.BASE_COLORS.forest[400]};
    box-shadow: 0 0 0 3px rgba(34, 82, 43, 0.1);
  }
  
  &::placeholder {
    color: ${PREMIUM_COLORS.BASE_COLORS.gray[400]};
  }
`;

const ErrorMessage = styled.span`
  color: #dc2626;
  font-size: 12px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const HelpText = styled.span`
  color: ${PREMIUM_COLORS.BASE_COLORS.gray[500]};
  font-size: 12px;
  font-style: italic;
`;

const CharacterCount = styled.span`
  color: ${PREMIUM_COLORS.BASE_COLORS.gray[400]};
  font-size: 12px;
  text-align: right;
`;

const CheckboxField = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${PREMIUM_SPACING.sm}px;
`;

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  width: 18px;
  height: 18px;
  margin-top: 2px;
  cursor: pointer;
  accent-color: ${PREMIUM_COLORS.BASE_COLORS.forest[500]};
`;

const CheckboxLabel = styled.label<{ hasError?: boolean }>`
  color: ${({ hasError }) => hasError ? '#dc2626' : PREMIUM_COLORS.BASE_COLORS.gray[700]};
  font-size: 14px;
  line-height: 1.5;
  cursor: pointer;
`;

const Link = styled.a`
  color: ${PREMIUM_COLORS.BASE_COLORS.forest[500]};
  text-decoration: underline;
  
  &:hover {
    color: ${PREMIUM_COLORS.BASE_COLORS.gold[500]};
  }
`;

const SuccessFeedback = styled.div`
  display: flex;
  align-items: center;
  gap: ${PREMIUM_SPACING.sm}px;
  padding: ${PREMIUM_SPACING.lg}px;
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 8px;
  color: #166534;
  font-weight: 500;
`;

const FormActions = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${PREMIUM_SPACING.md}px;
  margin-top: ${PREMIUM_SPACING.lg}px;
  padding-top: ${PREMIUM_SPACING.lg}px;
  border-top: 1px solid ${PREMIUM_COLORS.BASE_COLORS.ivory[300]};
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const BackButton = styled.button`
  padding: ${PREMIUM_SPACING.md}px ${PREMIUM_SPACING.lg}px;
  border: 2px solid ${PREMIUM_COLORS.BASE_COLORS.ivory[300]};
  border-radius: 8px;
  background: white;
  color: ${PREMIUM_COLORS.BASE_COLORS.gray[700]};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover:not(:disabled) {
    border-color: ${PREMIUM_COLORS.BASE_COLORS.forest[300]};
    color: ${PREMIUM_COLORS.BASE_COLORS.forest[500]};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const SubmitButton = styled.button<{ isLoading?: boolean }>`
  padding: ${PREMIUM_SPACING.md}px ${PREMIUM_SPACING.xl}px;
  border: none;
  border-radius: 8px;
  background: ${({ disabled }) => disabled ? 
    PREMIUM_COLORS.BASE_COLORS.gray[300] : 
    PREMIUM_COLORS.BASE_COLORS.forest[500]};
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.2s ease;
  
  &:hover:not(:disabled) {
    background: ${PREMIUM_COLORS.BASE_COLORS.forest[600]};
    transform: translateY(-1px);
  }
  
  &:disabled {
    opacity: 0.7;
  }
`;

// Error display styled components
const ErrorContainer = styled.div`
  text-align: center;
  padding: 48px;
  background: #fef2f2;
  border: 1px solid #fca5a5;
  border-radius: 12px;
`;

const ErrorIcon = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
`;

const ErrorTitle = styled.h2`
  color: #dc2626;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 8px;
`;

const ErrorActions = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-bottom: 24px;
`;

const DebugInfo = styled.div`
  background: #f3f4f6;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 16px;
  text-align: left;
  font-size: 12px;

  pre {
    margin: 8px 0 0 0;
    white-space: pre-wrap;
    word-break: break-word;
  }
`;

const ClientInfoStep: React.FC<ClientInfoStepProps> = ({ 
  onComplete,
  onBack, 
  isLoading = false,
  initialData,
  data,
  selectedService,
  onDataChange
}) => {
  const { state, setClientInfo } = useBooking();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessFeedback, setShowSuccessFeedback] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  // CRITICAL: Enhanced validation logic to check multiple data sources
  const validatePreviousSteps = () => {
    console.log('[ClientInfo] Validating previous steps with all data sources:', {
      contextState: {
        selectedService: state.selectedService,
        selectedDate: state.selectedDate,
        selectedTimeSlot: state.selectedTimeSlot
      },
      propsData: {
        selectedService,
        dataSelectedService: data?.selectedService,
        dataSelectedDate: data?.selectedDate,
        dataSelectedTimeSlot: data?.selectedTimeSlot,
        initialDataService: initialData?.selectedService,
        initialDataDate: initialData?.selectedDate,
        initialDataTimeSlot: initialData?.selectedTimeSlot
      }
    });

    // Check if we have service selection from any source
    const serviceData = state.selectedService || 
                       selectedService || 
                       data?.selectedService || 
                       initialData?.selectedService;

    // Check if we have date/time selection from any source
    const dateData = state.selectedDate || 
                     data?.selectedDate || 
                     initialData?.selectedDate;
                     
    const timeData = state.selectedTimeSlot || 
                     data?.selectedTimeSlot || 
                     initialData?.selectedTimeSlot;

    if (!serviceData) {
      console.warn('[ClientInfo] Missing service selection from all sources');
      return false;
    }

    if (!dateData || !timeData) {
      console.warn('[ClientInfo] Missing date/time selection from all sources');
      return false;
    }

    console.log('[ClientInfo] Validation passed - all previous steps complete');
    return true;
  };

  // Validate on component mount and when data changes
  useEffect(() => {
    const isValid = validatePreviousSteps();
    if (!isValid) {
      setValidationError('Please complete the previous steps before providing your information.');
    } else {
      setValidationError(null);
    }
  }, [state, data, selectedService, initialData]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid }
  } = useForm<ClientInformation>({
    resolver: zodResolver(clientInfoSchema),
    defaultValues: initialData?.clientInfo || 
                   data?.clientInfo || 
                   state.clientInfo || {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      caseType: undefined,
      estimatedLoss: undefined,
      preferredContact: undefined,
      urgencyLevel: undefined,
      company: '',
      additionalNotes: '',
      consentToContact: false,
      privacyPolicyAccepted: false,
      dataProcessingAgreed: false
    },
    mode: 'onChange' // Real-time validation
  });

  // Watch case type for conditional fields
  const selectedCaseType = watch('caseType');
  const urgencyLevel = watch('urgencyLevel');
  const additionalNotes = watch('additionalNotes');

  const onSubmit = async (formData: ClientInformation) => {
    try {
      setIsSubmitting(true);
      vlog('[ClientInfo] Submitting form data:', formData);
      
      // Validate data one more time
      const validatedData = clientInfoSchema.parse(formData);
      
      // Transform data for booking context
      const clientData = {
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        email: validatedData.email,
        phone: validatedData.phone,
        preferredContactMethod: validatedData.preferredContact as 'email' | 'phone' | 'text',
        isNewClient: true,
        additionalNotes: validatedData.additionalNotes || '',
        // Financial recovery specific fields
        caseDescription: `${validatedData.caseType} - Estimated loss: £${validatedData.estimatedLoss || 'Unknown'}`,
        approximateLossAmount: validatedData.estimatedLoss?.toString() || '',
        fraudType: 'other' as const,
        hasReportedToAuthorities: false,
        company: validatedData.company || '',
        urgencyLevel: validatedData.urgencyLevel
      };
      
      // Save to booking context
      setClientInfo(clientData);
      
      // Call onDataChange if provided
      onDataChange?.({ clientInfo: validatedData });
      
      vlog('[ClientInfo] Data saved to booking context');
      
      // Show success feedback
      setShowSuccessFeedback(true);
      
      // Brief success display before proceeding
      setTimeout(() => {
        vsuccess('[ClientInfo] Form submission successful');
        onComplete?.({ clientInfo: validatedData });
      }, 1500);
      
    } catch (error) {
      verror('[ClientInfo] Form submission failed:', error);
      setValidationError('Form submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show loading state if isLoading prop is true
  if (isLoading) {
    return <LoadingOverlay message="Loading client information form..." />;
  }

  // CRITICAL: Show error state if validation fails with enhanced debugging
  if (validationError) {
    return (
      <FormContainer>
        <ErrorContainer>
          <ErrorIcon>⚠️</ErrorIcon>
          <ErrorTitle>Incomplete Booking Information</ErrorTitle>
          <ErrorMessage>{validationError}</ErrorMessage>
          
          <ErrorActions>
            {onBack && (
              <BackButton onClick={onBack}>
                Back to Date Selection
              </BackButton>
            )}
            
            <SubmitButton onClick={() => window.location.reload()}>
              Try Again
            </SubmitButton>
          </ErrorActions>

          {process.env.NODE_ENV === 'development' && (
            <DebugInfo>
              <h4>Debug Information:</h4>
              <pre>{JSON.stringify({
                contextState: {
                  hasService: !!state.selectedService,
                  hasDate: !!state.selectedDate,
                  hasTime: !!state.selectedTimeSlot,
                  service: state.selectedService?.name,
                  date: state.selectedDate,
                  timeSlot: state.selectedTimeSlot
                },
                propsData: {
                  hasSelectedService: !!selectedService,
                  hasData: !!data,
                  hasInitialData: !!initialData,
                  dataKeys: data ? Object.keys(data) : [],
                  initialDataKeys: initialData ? Object.keys(initialData) : [],
                  serviceFromProps: selectedService?.name,
                  dateFromData: data?.selectedDate,
                  timeFromData: data?.selectedTimeSlot
                }
              }, null, 2)}</pre>
            </DebugInfo>
          )}
        </ErrorContainer>
      </FormContainer>
    );
  }

  return (
    <FormContainer>
      <FormHeader>
        <FormTitle>Your Information</FormTitle>
        <FormSubtitle>
          Please provide your details so we can prepare for your consultation. 
          All information is securely encrypted and GDPR compliant.
        </FormSubtitle>
        
        <SecurityBadge>
          <ShieldIcon size={18} />
          <div>
            <strong>Secure & Confidential:</strong> 256-bit encryption protects your data. 
            We never share client information with third parties.
          </div>
        </SecurityBadge>
      </FormHeader>

      <FormBody onSubmit={handleSubmit(onSubmit)}>
        {/* Personal Information Section */}
        <FormSection>
          <SectionTitle>
            <UserIcon size={20} />
            Personal Information
          </SectionTitle>
          
          <FormRow>
            <FormField>
              <Label htmlFor="firstName">
                First Name <RequiredMark>*</RequiredMark>
              </Label>
              <Input
                {...register('firstName')}
                id="firstName"
                hasError={!!errors.firstName}
                placeholder="Enter your first name"
              />
              {errors.firstName && (
                <ErrorMessage>
                  <AlertCircleIcon size={14} />
                  {errors.firstName.message}
                </ErrorMessage>
              )}
            </FormField>

            <FormField>
              <Label htmlFor="lastName">
                Last Name <RequiredMark>*</RequiredMark>
              </Label>
              <Input
                {...register('lastName')}
                id="lastName"
                hasError={!!errors.lastName}
                placeholder="Enter your last name"
              />
              {errors.lastName && (
                <ErrorMessage>
                  <AlertCircleIcon size={14} />
                  {errors.lastName.message}
                </ErrorMessage>
              )}
            </FormField>
          </FormRow>

          <FormRow>
            <FormField>
              <Label htmlFor="email">
                <MailIcon size={14} />
                Email Address <RequiredMark>*</RequiredMark>
              </Label>
              <Input
                {...register('email')}
                type="email"
                id="email"
                hasError={!!errors.email}
                placeholder="your.email@example.com"
              />
              {errors.email && (
                <ErrorMessage>
                  <AlertCircleIcon size={14} />
                  {errors.email.message}
                </ErrorMessage>
              )}
            </FormField>

            <FormField>
              <Label htmlFor="phone">
                <PhoneIcon size={14} />
                Phone Number <RequiredMark>*</RequiredMark>
              </Label>
              <Input
                {...register('phone')}
                type="tel"
                id="phone"
                hasError={!!errors.phone}
                placeholder="+44 1234 567890"
              />
              {errors.phone && (
                <ErrorMessage>
                  <AlertCircleIcon size={14} />
                  {errors.phone.message}
                </ErrorMessage>
              )}
            </FormField>
          </FormRow>
        </FormSection>

        {/* Case Information Section */}
        <FormSection>
          <SectionTitle>
            <DollarSignIcon size={20} />
            Case Information
          </SectionTitle>
          
          <FormField>
            <Label htmlFor="caseType">
              Type of Case <RequiredMark>*</RequiredMark>
            </Label>
            <Select {...register('caseType')} id="caseType" hasError={!!errors.caseType}>
              <option value="">Please select your case type</option>
              {caseTypeOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
            {errors.caseType && (
              <ErrorMessage>
                <AlertCircleIcon size={14} />
                {errors.caseType.message}
              </ErrorMessage>
            )}
          </FormField>

          {/* Conditional field based on case type */}
          <AnimatePresence>
            {selectedCaseType && selectedCaseType !== 'regulatory-complaint' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <FormField>
                  <Label htmlFor="estimatedLoss">
                    Estimated Financial Loss (£)
                  </Label>
                  <Input
                    {...register('estimatedLoss', { valueAsNumber: true })}
                    type="number"
                    id="estimatedLoss"
                    hasError={!!errors.estimatedLoss}
                    placeholder="e.g., 50000"
                    min="0"
                    step="1000"
                  />
                  {errors.estimatedLoss && (
                    <ErrorMessage>
                      <AlertCircleIcon size={14} />
                      {errors.estimatedLoss.message}
                    </ErrorMessage>
                  )}
                  <HelpText>
                    This helps us assign the most suitable specialist for your case
                  </HelpText>
                </FormField>
              </motion.div>
            )}
          </AnimatePresence>

          <FormRow>
            <FormField>
              <Label htmlFor="urgencyLevel">
                <ClockIcon size={14} />
                Urgency Level <RequiredMark>*</RequiredMark>
              </Label>
              <Select {...register('urgencyLevel')} id="urgencyLevel" hasError={!!errors.urgencyLevel}>
                <option value="">Select urgency</option>
                {urgencyLevelOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
              {errors.urgencyLevel && (
                <ErrorMessage>
                  <AlertCircleIcon size={14} />
                  {errors.urgencyLevel.message}
                </ErrorMessage>
              )}
              {urgencyLevel && (
                <HelpText>
                  {urgencyLevelOptions.find(opt => opt.value === urgencyLevel)?.description}
                </HelpText>
              )}
            </FormField>

            <FormField>
              <Label htmlFor="preferredContact">
                <MessageCircleIcon size={14} />
                Preferred Contact Method <RequiredMark>*</RequiredMark>
              </Label>
              <Select {...register('preferredContact')} id="preferredContact" hasError={!!errors.preferredContact}>
                <option value="">Select contact method</option>
                {contactMethodOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
              {errors.preferredContact && (
                <ErrorMessage>
                  <AlertCircleIcon size={14} />
                  {errors.preferredContact.message}
                </ErrorMessage>
              )}
            </FormField>
          </FormRow>
        </FormSection>

        {/* Optional Information */}
        <FormSection>
          <SectionTitle>Additional Information (Optional)</SectionTitle>
          
          <FormField>
            <Label htmlFor="company">Company/Organization</Label>
            <Input
              {...register('company')}
              id="company"
              placeholder="Your company name (if applicable)"
            />
          </FormField>

          <FormField>
            <Label htmlFor="additionalNotes">Additional Notes</Label>
            <TextArea
              {...register('additionalNotes')}
              id="additionalNotes"
              placeholder="Any additional information about your case that might be helpful..."
              rows={4}
            />
            <CharacterCount>
              {additionalNotes?.length || 0}/1000 characters
            </CharacterCount>
          </FormField>
        </FormSection>

        {/* Legal Consents */}
        <FormSection>
          <SectionTitle>
            <ShieldIcon size={20} />
            Legal Agreements
          </SectionTitle>
          
          <CheckboxField>
            <Checkbox
              {...register('consentToContact')}
              id="consentToContact"
            />
            <CheckboxLabel htmlFor="consentToContact" hasError={!!errors.consentToContact}>
              <RequiredMark>*</RequiredMark> I consent to being contacted by Recovery Office 
              regarding my case via my preferred contact method
            </CheckboxLabel>
            {errors.consentToContact && (
              <ErrorMessage>
                <AlertCircleIcon size={14} />
                {errors.consentToContact.message}
              </ErrorMessage>
            )}
          </CheckboxField>

          <CheckboxField>
            <Checkbox
              {...register('privacyPolicyAccepted')}
              id="privacyPolicyAccepted"
            />
            <CheckboxLabel htmlFor="privacyPolicyAccepted" hasError={!!errors.privacyPolicyAccepted}>
              <RequiredMark>*</RequiredMark> I have read and accept the{' '}
              <Link href="/privacy-policy" target="_blank" rel="noopener noreferrer">
                Privacy Policy
              </Link>
            </CheckboxLabel>
            {errors.privacyPolicyAccepted && (
              <ErrorMessage>
                <AlertCircleIcon size={14} />
                {errors.privacyPolicyAccepted.message}
              </ErrorMessage>
            )}
          </CheckboxField>

          <CheckboxField>
            <Checkbox
              {...register('dataProcessingAgreed')}
              id="dataProcessingAgreed"
            />
            <CheckboxLabel htmlFor="dataProcessingAgreed" hasError={!!errors.dataProcessingAgreed}>
              <RequiredMark>*</RequiredMark> I agree to the processing of my personal 
              data for case management and consultation purposes in accordance with GDPR
            </CheckboxLabel>
            {errors.dataProcessingAgreed && (
              <ErrorMessage>
                <AlertCircleIcon size={14} />
                {errors.dataProcessingAgreed.message}
              </ErrorMessage>
            )}
          </CheckboxField>
        </FormSection>

        {/* Success Feedback */}
        <AnimatePresence>
          {showSuccessFeedback && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <SuccessFeedback>
                <CheckCircleIcon size={24} />
                <div>
                  <strong>Information validated successfully!</strong>
                  <div>Proceeding to booking confirmation...</div>
                </div>
              </SuccessFeedback>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form Actions */}
        <FormActions>
          {onBack && (
            <BackButton
              type="button"
              onClick={onBack}
              disabled={isSubmitting}
            >
              ← Back to Date Selection
            </BackButton>
          )}
          
          <SubmitButton
            type="submit"
            disabled={!isValid || isSubmitting}
            isLoading={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  style={{ display: 'inline-block', marginRight: '8px' }}
                >
                  ⏳
                </motion.div>
                Validating Information...
              </>
            ) : (
              'Continue to Confirmation →'
            )}
          </SubmitButton>
        </FormActions>
      </FormBody>
    </FormContainer>
  );
};

export default ClientInfoStep; 