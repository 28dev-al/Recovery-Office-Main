/**
 * ClientInfoStep Component - Comprehensive Implementation
 * 
 * Professional client information collection form for financial recovery consultations.
 * Fixed data validation logic to support multiple usage patterns and data flow scenarios.
 */

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useBooking } from '../../../context/BookingContext';
import { ClientInformation } from '../../../types/booking';
import { z } from 'zod';

// Define the schema for form validation matching ClientInformation from booking.ts
const clientInfoSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  company: z.string().optional(),
  dateOfBirth: z.string().optional(),
  
  preferredContactMethod: z.enum(['text', 'email', 'phone']),
  preferredContact: z.enum(['email', 'phone']),
  contactPreference: z.string().optional(),
  
  isNewClient: z.boolean(),
  
  caseType: z.enum(['investment-fraud', 'cryptocurrency-recovery', 'financial-scam', 'regulatory-complaint']),
  caseDescription: z.string().optional(),
  estimatedLoss: z.enum(['under-10k', '10k-50k', '50k-100k', '100k-500k', '500k-1m', 'over-1m']),
  urgencyLevel: z.enum(['low', 'medium', 'high', 'critical']),
  
  additionalNotes: z.string().optional(),
  notes: z.string().optional(),
  
  consentToContact: z.boolean().refine(val => val === true, 'You must consent to contact'),
  privacyPolicyAccepted: z.boolean().refine(val => val === true, 'You must accept the privacy policy'),
  dataProcessingAgreed: z.boolean().refine(val => val === true, 'You must agree to data processing'),
  
  hasReportedToPolice: z.boolean().optional(),
  hasReportedToAuthorities: z.boolean().optional(),
  
  totalLossAmount: z.number().optional(),
  dateOfIncident: z.string().optional(),
  approximateLossAmount: z.string().optional(),
  incidentDate: z.string().optional(),
  financialInstitution: z.string().optional(),
  fraudType: z.enum(['investment_fraud', 'bank_fraud', 'credit_card_fraud', 'identity_theft', 'pension_scam', 'mortgage_fraud', 'insurance_fraud', 'tax_fraud', 'other']).optional()
});

// Define options for dropdowns with translation support
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getContactMethodOptions = (t: any) => [
  { value: 'email', label: t('booking.clientInfo.options.contactMethods.email') },
  { value: 'phone', label: t('booking.clientInfo.options.contactMethods.phone') },
  { value: 'text', label: t('booking.clientInfo.options.contactMethods.text') }
];
import { PREMIUM_SPACING } from '../../../design-system/tokens/spacing';
import { PREMIUM_COLORS } from '../../../design-system/tokens/colors.premium';
import { LoadingOverlay } from '../../../design-system/components/feedback/LoadingOverlay';

import { 
  FiUser, 
  FiMail, 
  FiPhone, 
  FiShield, 
  FiAlertCircle, 
  FiCheckCircle, 
  FiDollarSign,

  FiMessageCircle
} from 'react-icons/fi';
import { vlog, verror, vsuccess } from '../../../utils/debugLogger';

// Updated interface to support all usage patterns
interface ClientInfoStepProps {
  // Required callback
  onComplete: (data?: ClientInformation) => void;
  
  // Optional callbacks
  onBack?: () => void;
  onDataChange?: (data: ClientInformation) => void;
  
  // Data props (multiple patterns supported)
  data?: {
    selectedService?: unknown;
    selectedDate?: string;
    selectedTimeSlot?: unknown;
    clientInfo?: ClientInformation;
  };
  initialData?: {
    selectedService?: unknown;
    selectedDate?: string;
    selectedTimeSlot?: unknown;
    clientInfo?: ClientInformation;
  };
  selectedService?: unknown;
  
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

// Booking Summary Styled Components
const BookingSummary = styled.div`
  background: ${PREMIUM_COLORS.BASE_COLORS.forest[50]};
  border: 1px solid ${PREMIUM_COLORS.BASE_COLORS.forest[200]};
  border-radius: 12px;
  padding: ${PREMIUM_SPACING.lg}px;
  margin-bottom: ${PREMIUM_SPACING.xl}px;
`;

const SummaryTitle = styled.h3`
  color: ${PREMIUM_COLORS.BASE_COLORS.forest[500]};
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 ${PREMIUM_SPACING.md}px 0;
  display: flex;
  align-items: center;
  gap: ${PREMIUM_SPACING.sm}px;
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${PREMIUM_SPACING.sm}px 0;
  border-bottom: 1px solid ${PREMIUM_COLORS.BASE_COLORS.forest[100]};
  
  &:last-child {
    border-bottom: none;
  }
`;

const SummaryLabel = styled.span`
  color: ${PREMIUM_COLORS.BASE_COLORS.gray[600]};
  font-weight: 500;
`;

const SummaryValue = styled.span`
  color: ${PREMIUM_COLORS.BASE_COLORS.forest[700]};
  font-weight: 600;
`;

// Using the imported clientInfoSchema from validation module

const ClientInfoStep: React.FC<ClientInfoStepProps> = ({ 
  onComplete,
  onBack, 
  isLoading = false,
  initialData,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  data,
  selectedService,
  onDataChange
}) => {
  const { state, setClientInfo } = useBooking();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessFeedback, setShowSuccessFeedback] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const { t, i18n } = useTranslation();
  const [, forceUpdate] = useState({});

  // 🌍 DEBUG: Language switching debugging
  console.log('🌍 LANGUAGE DEBUG - ClientInfoStep:');
  console.log('🌍 Current language:', i18n.language);
  console.log('🌍 Available languages:', Object.keys(i18n.services.resourceStore.data || {}));
  console.log('🌍 German title translation:', t('clientInfo.formTitle'));
  console.log('🌍 English title for comparison:', i18n.getResource('en', 'translation', 'clientInfo.formTitle'));
  console.log('🌍 German title direct:', i18n.getResource('de', 'translation', 'clientInfo.formTitle'));
  
  // 🔄 Force re-render when language changes
  useEffect(() => {
    const handleLanguageChange = (lng: string) => {
      console.log('🌍 Language changed to:', lng);
      console.log('🌍 New translation for formTitle:', t('clientInfo.formTitle'));
      forceUpdate({}); // Trigger re-render
    };
    
    i18n.on('languageChanged', handleLanguageChange);
    return () => i18n.off('languageChanged', handleLanguageChange);
  }, [i18n, t]);

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
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      company: '',
      dateOfBirth: '',
      preferredContactMethod: 'email' as const,
      preferredContact: 'email' as const,
      contactPreference: '',
      isNewClient: true,
      caseType: 'investment-fraud' as const,
      caseDescription: '',
      estimatedLoss: 'under-10k' as const,
      urgencyLevel: 'medium' as const,
      additionalNotes: '',
      notes: '',
      consentToContact: false,
      privacyPolicyAccepted: false,
      dataProcessingAgreed: false,
      hasReportedToPolice: false,
      hasReportedToAuthorities: false,
      totalLossAmount: 0,
      dateOfIncident: '',
      approximateLossAmount: '',
      incidentDate: '',
      financialInstitution: '',
      fraudType: undefined
    },
    mode: 'onChange' // Real-time validation
  });

  // Watch fields for conditional logic
  const additionalNotes = watch('additionalNotes');

  const onSubmit = async (formData: ClientInformation) => {
    try {
      setIsSubmitting(true);
      vlog('[ClientInfo] Submitting form data:', formData);
      
      // Validate data one more time
      const validatedData = clientInfoSchema.parse(formData);
      
      // Transform data for booking context
      const clientData: ClientInformation = {
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        email: validatedData.email,
        phone: validatedData.phone,
        company: validatedData.company,
        dateOfBirth: validatedData.dateOfBirth,
        preferredContactMethod: validatedData.preferredContactMethod,
        preferredContact: validatedData.preferredContact,
        contactPreference: validatedData.contactPreference,
        isNewClient: validatedData.isNewClient,
        caseType: validatedData.caseType,
        caseDescription: validatedData.caseDescription,
        estimatedLoss: validatedData.estimatedLoss,
        urgencyLevel: validatedData.urgencyLevel,
        additionalNotes: validatedData.additionalNotes,
        notes: validatedData.notes,
        consentToContact: validatedData.consentToContact,
        privacyPolicyAccepted: validatedData.privacyPolicyAccepted,
        dataProcessingAgreed: validatedData.dataProcessingAgreed,
        hasReportedToPolice: validatedData.hasReportedToPolice,
        hasReportedToAuthorities: validatedData.hasReportedToAuthorities,
        totalLossAmount: validatedData.totalLossAmount,
        dateOfIncident: validatedData.dateOfIncident,
        approximateLossAmount: validatedData.approximateLossAmount,
        incidentDate: validatedData.incidentDate,
        financialInstitution: validatedData.financialInstitution,
        fraudType: validatedData.fraudType
      };
      
      // Save to booking context
      setClientInfo(clientData);
      
      // Call onDataChange if provided
      onDataChange?.(validatedData);
      
      vlog('[ClientInfo] Data saved to booking context');
      
      // Show success feedback
      setShowSuccessFeedback(true);
      
      // Brief success display before proceeding
      setTimeout(() => {
        vsuccess('[ClientInfo] Form submission successful');
        onComplete?.(validatedData);
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
          <ErrorTitle>{t('clientInfo.errorTitle')}</ErrorTitle>
          <ErrorMessage>{validationError}</ErrorMessage>
          
          <ErrorActions>
            {onBack && (
              <BackButton onClick={onBack}>
                {t('clientInfo.backButton')}
              </BackButton>
            )}
            
            <SubmitButton onClick={() => window.location.reload()}>
              {t('clientInfo.tryAgainButton')}
            </SubmitButton>
          </ErrorActions>

          {process.env.NODE_ENV === 'development' && (
            <DebugInfo>
              <h4>{t('clientInfo.debugInfoTitle')}</h4>
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
                  serviceFromProps: (selectedService as { name?: string })?.name,
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
      {/* Booking Summary */}
      {state.selectedService && (
        <BookingSummary>
          <SummaryTitle>{t('clientInfo.bookingSummaryTitle')}</SummaryTitle>
          <SummaryItem>
            <SummaryLabel>{t('clientInfo.serviceLabel')}:</SummaryLabel>
            <SummaryValue>{state.selectedService.name}</SummaryValue>
          </SummaryItem>
          <SummaryItem>
            <SummaryLabel>{t('clientInfo.priceLabel')}:</SummaryLabel>
            <SummaryValue>£{state.selectedService.price?.toLocaleString()}</SummaryValue>
          </SummaryItem>
          <SummaryItem>
            <SummaryLabel>{t('clientInfo.durationLabel')}:</SummaryLabel>
            <SummaryValue>{state.selectedService.duration} minutes</SummaryValue>
          </SummaryItem>
          {state.selectedDate && (
            <SummaryItem>
              <SummaryLabel>{t('clientInfo.dateLabel')}:</SummaryLabel>
              <SummaryValue>{state.selectedDate}</SummaryValue>
            </SummaryItem>
          )}
          {state.selectedTimeSlot && (
            <SummaryItem>
              <SummaryLabel>{t('clientInfo.timeLabel')}:</SummaryLabel>
              <SummaryValue>{state.selectedTimeSlot.startTime}</SummaryValue>
            </SummaryItem>
          )}
        </BookingSummary>
      )}

      <FormHeader>
        <FormTitle>{t('clientInfo.formTitle')}</FormTitle>
        <FormSubtitle>
          {t('clientInfo.formSubtitle')}
        </FormSubtitle>
        
        <SecurityBadge>
          <ShieldIcon size={18} />
          <div>
            <strong>{t('clientInfo.secureConfidential')}:</strong> 256-bit encryption protects your data. 
            {t('clientInfo.neverShare')}
          </div>
        </SecurityBadge>
      </FormHeader>

      <FormBody onSubmit={handleSubmit(onSubmit)}>
        {/* Personal Information Section */}
        <FormSection>
          <SectionTitle>
            <UserIcon size={20} />
            {t('clientInfo.personalInfoTitle')}
          </SectionTitle>
          
          <FormRow>
            <FormField>
              <Label htmlFor="firstName">
                {t('clientInfo.firstNameLabel')} <RequiredMark>*</RequiredMark>
              </Label>
              <Input
                {...register('firstName')}
                id="firstName"
                hasError={!!errors.firstName}
                placeholder={t('clientInfo.firstNamePlaceholder')}
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
                {t('clientInfo.lastNameLabel')} <RequiredMark>*</RequiredMark>
              </Label>
              <Input
                {...register('lastName')}
                id="lastName"
                hasError={!!errors.lastName}
                placeholder={t('clientInfo.lastNamePlaceholder')}
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
                {t('clientInfo.emailLabel')} <RequiredMark>*</RequiredMark>
              </Label>
              <Input
                {...register('email')}
                type="email"
                id="email"
                hasError={!!errors.email}
                placeholder={t('clientInfo.emailPlaceholder')}
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
                {t('clientInfo.phoneLabel')} <RequiredMark>*</RequiredMark>
              </Label>
              <Input
                {...register('phone')}
                type="tel"
                id="phone"
                hasError={!!errors.phone}
                placeholder={t('clientInfo.phonePlaceholder')}
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
            {t('clientInfo.caseInfoTitle')}
          </SectionTitle>
          
          <FormField>
            <Label htmlFor="caseType">
              {t('clientInfo.caseTypeLabel')} <RequiredMark>*</RequiredMark>
            </Label>
            <Select {...register('caseType')} id="caseType" hasError={!!errors.caseType}>
              <option value="investment-fraud">{t('clientInfo.investmentFraud')}</option>
              <option value="cryptocurrency-recovery">{t('clientInfo.cryptocurrencyRecovery')}</option>
              <option value="financial-scam">{t('clientInfo.financialScam')}</option>
              <option value="regulatory-complaint">{t('clientInfo.regulatoryComplaint')}</option>
            </Select>
            {errors.caseType && (
              <ErrorMessage>
                <AlertCircleIcon size={14} />
                {errors.caseType.message}
              </ErrorMessage>
            )}
          </FormField>

          <FormField>
            <Label htmlFor="estimatedLoss">
              {t('clientInfo.estimatedLossLabel')} <RequiredMark>*</RequiredMark>
            </Label>
            <Select {...register('estimatedLoss')} id="estimatedLoss" hasError={!!errors.estimatedLoss}>
              <option value="under-10k">{t('clientInfo.under10k')}</option>
              <option value="10k-50k">{t('clientInfo.10k50k')}</option>
              <option value="50k-100k">{t('clientInfo.50k100k')}</option>
              <option value="100k-500k">{t('clientInfo.100k500k')}</option>
              <option value="500k-1m">{t('clientInfo.500k1m')}</option>
              <option value="over-1m">{t('clientInfo.over1m')}</option>
            </Select>
            {errors.estimatedLoss && (
              <ErrorMessage>
                <AlertCircleIcon size={14} />
                {errors.estimatedLoss.message}
              </ErrorMessage>
            )}
            <HelpText>
              {t('clientInfo.estimatedLossHelp')}
            </HelpText>
          </FormField>

          <FormRow>
            <FormField>
              <Label htmlFor="preferredContactMethod">
                <MessageCircleIcon size={14} />
                {t('clientInfo.preferredContactMethodLabel')} <RequiredMark>*</RequiredMark>
              </Label>
              <Select {...register('preferredContactMethod')} id="preferredContactMethod" hasError={!!errors.preferredContactMethod}>
                <option value="">{t('clientInfo.selectContactMethod')}</option>
                {getContactMethodOptions(t).map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
              {errors.preferredContactMethod && (
                <ErrorMessage>
                  <AlertCircleIcon size={14} />
                  {errors.preferredContactMethod.message}
                </ErrorMessage>
              )}
            </FormField>

            <FormField>
              <Label htmlFor="urgencyLevel">
                <UserIcon size={14} />
                {t('clientInfo.urgencyLevelLabel')} <RequiredMark>*</RequiredMark>
              </Label>
              <Select {...register('urgencyLevel')} id="urgencyLevel" hasError={!!errors.urgencyLevel}>
                <option value="low">{t('clientInfo.low')}</option>
                <option value="medium">{t('clientInfo.medium')}</option>
                <option value="high">{t('clientInfo.high')}</option>
                <option value="critical">{t('clientInfo.critical')}</option>
              </Select>
              {errors.urgencyLevel && (
                <ErrorMessage>
                  <AlertCircleIcon size={14} />
                  {errors.urgencyLevel.message}
                </ErrorMessage>
              )}
            </FormField>
          </FormRow>
        </FormSection>

        {/* Optional Information */}
        <FormSection>
          <SectionTitle>{t('clientInfo.additionalInfoTitle')}</SectionTitle>
          
          <FormField>
            <Label htmlFor="company">{t('clientInfo.companyLabel')}</Label>
            <Input
              {...register('company')}
              id="company"
              placeholder={t('clientInfo.companyPlaceholder')}
            />
          </FormField>

          <FormField>
            <Label htmlFor="additionalNotes">{t('clientInfo.additionalNotesLabel')}</Label>
            <TextArea
              {...register('additionalNotes')}
              id="additionalNotes"
              placeholder={t('clientInfo.additionalNotesPlaceholder')}
              rows={4}
            />
            <CharacterCount>
              {additionalNotes?.length || 0}/{t('clientInfo.characterLimit')}
            </CharacterCount>
          </FormField>
        </FormSection>

        {/* Legal Consents */}
        <FormSection>
          <SectionTitle>
            <ShieldIcon size={20} />
            {t('clientInfo.legalAgreementsTitle')}
          </SectionTitle>
          
          <CheckboxField>
            <Checkbox
              {...register('consentToContact')}
              id="consentToContact"
            />
            <CheckboxLabel htmlFor="consentToContact" hasError={!!errors.consentToContact}>
              <RequiredMark>*</RequiredMark> {t('clientInfo.consentToContact')}
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
              <RequiredMark>*</RequiredMark> {t('booking.clientInfo.legal.privacy')}
              {' '}
              <Link href="/privacy-policy" target="_blank" rel="noopener noreferrer">
                {t('navigation.privacyPolicy')}
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
              <RequiredMark>*</RequiredMark> {t('clientInfo.dataProcessingAgreed')}
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
                  <strong>{t('clientInfo.successTitle')}</strong>
                  <div>{t('clientInfo.successSubtitle')}</div>
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
              {t('clientInfo.backButton')}
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
                {t('clientInfo.validatingInfo')}
              </>
            ) : (
              t('clientInfo.continueButton')
            )}
          </SubmitButton>
        </FormActions>
      </FormBody>
    </FormContainer>
  );
};

export default ClientInfoStep; 