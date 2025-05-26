/**
 * ConfirmationStep Component - Phase 3 Enhanced
 * 
 * Professional booking confirmation and submission system for financial recovery consultations.
 * Features complete backend integration, success confirmation, and comprehensive error handling.
 */

import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useBooking } from '../../../context/BookingContext';
import { ConfirmationStepProps } from '../../../types/booking.types';
import { PREMIUM_SPACING } from '../../../design-system/tokens/spacing';
import { PREMIUM_COLORS } from '../../../design-system/tokens/colors.premium';
import { ErrorDisplay } from '../../../design-system/components/feedback/ErrorDisplay';
import { LoadingOverlay } from '../../../design-system/components/feedback/LoadingOverlay';
import { 
  FiCheckCircle, 
  FiFileText, 
  FiEdit, 
  FiCalendar, 
  FiUser, 
  FiShield, 
  FiDownload,
  FiMail,
  FiPhone
} from 'react-icons/fi';
import { vlog, verror, vsuccess } from '../../../utils/debugLogger';
import apiClient from '../../../services/api.client';
import { 
  caseTypeOptions, 
  urgencyLevelOptions, 
  contactMethodOptions 
} from '../../../types/clientValidation';

// Wrapper components for React Icons
const CheckCircleIcon: React.FC<{ size?: number }> = FiCheckCircle as React.FC<{ size?: number }>;
const FileTextIcon: React.FC<{ size?: number }> = FiFileText as React.FC<{ size?: number }>;
const EditIcon: React.FC<{ size?: number }> = FiEdit as React.FC<{ size?: number }>;
const CalendarIcon: React.FC<{ size?: number }> = FiCalendar as React.FC<{ size?: number }>;
const UserIcon: React.FC<{ size?: number }> = FiUser as React.FC<{ size?: number }>;
const ShieldIcon: React.FC<{ size?: number }> = FiShield as React.FC<{ size?: number }>;
const DownloadIcon: React.FC<{ size?: number }> = FiDownload as React.FC<{ size?: number }>;
const MailIcon: React.FC<{ size?: number }> = FiMail as React.FC<{ size?: number }>;
const PhoneIcon: React.FC<{ size?: number }> = FiPhone as React.FC<{ size?: number }>;

// API Response types
interface ApiResponse<T = unknown> {
  success?: boolean;
  data?: T;
  message?: string;
  error?: string;
}

interface ClientResponse {
  _id?: string;
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface BookingResponse {
  _id?: string;
  id?: string;
  reference?: string;
  clientId: string;
  serviceId: string;
  date: string;
  timeSlot: string;
  status?: string;
}

// Submission state interface
interface SubmissionStateData {
  status: 'idle' | 'submitting' | 'success' | 'error';
  bookingRef?: string;
  error?: string;
}

// Professional Styled Components
const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: ${PREMIUM_SPACING.xl}px ${PREMIUM_SPACING.lg}px;
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: ${PREMIUM_SPACING.xl}px;
  padding-bottom: ${PREMIUM_SPACING.lg}px;
  border-bottom: 1px solid ${PREMIUM_COLORS.BASE_COLORS.ivory[300]};
`;

const Title = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: 32px;
  font-weight: 700;
  color: ${PREMIUM_COLORS.BASE_COLORS.forest[500]};
  margin: 0 0 ${PREMIUM_SPACING.sm}px 0;
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: ${PREMIUM_COLORS.BASE_COLORS.gray[600]};
  margin: 0;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const ContentGrid = styled.div`
  display: grid;
  gap: ${PREMIUM_SPACING.xl}px;
  
  @media (min-width: 768px) {
    grid-template-columns: 2fr 1fr;
  }
`;

const SummaryCard = styled.div`
  background: white;
  border: 1px solid ${PREMIUM_COLORS.BASE_COLORS.ivory[300]};
  border-radius: 12px;
  padding: ${PREMIUM_SPACING.xl}px;
  margin-bottom: ${PREMIUM_SPACING.lg}px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  
  &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
    transition: box-shadow 0.2s ease;
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${PREMIUM_SPACING.lg}px;
  padding-bottom: ${PREMIUM_SPACING.md}px;
  border-bottom: 2px solid ${PREMIUM_COLORS.BASE_COLORS.gold[500]};
`;

const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: ${PREMIUM_COLORS.BASE_COLORS.forest[500]};
  margin: 0;
  display: flex;
  align-items: center;
  gap: ${PREMIUM_SPACING.sm}px;
`;

const EditButton = styled.button`
  background: none;
  border: 1px solid ${PREMIUM_COLORS.BASE_COLORS.ivory[300]};
  color: ${PREMIUM_COLORS.BASE_COLORS.gray[600]};
  padding: ${PREMIUM_SPACING.xs}px ${PREMIUM_SPACING.sm}px;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: ${PREMIUM_COLORS.BASE_COLORS.forest[300]};
    color: ${PREMIUM_COLORS.BASE_COLORS.forest[500]};
  }
`;

const DetailRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${PREMIUM_SPACING.md}px;
  padding: ${PREMIUM_SPACING.sm}px 0;
  border-bottom: 1px solid ${PREMIUM_COLORS.BASE_COLORS.ivory[200]};
  
  &:last-child {
    border-bottom: none;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: ${PREMIUM_SPACING.xs}px;
  }
`;

const DetailLabel = styled.div`
  font-size: 14px;
  color: ${PREMIUM_COLORS.BASE_COLORS.gray[600]};
  font-weight: 500;
`;

const DetailValue = styled.div`
  font-size: 14px;
  color: ${PREMIUM_COLORS.BASE_COLORS.gray[800]};
  font-weight: 600;
  
  @media (max-width: 768px) {
    text-align: left;
  }
`;

const PricingCard = styled.div`
  background: linear-gradient(135deg, ${PREMIUM_COLORS.BASE_COLORS.forest[50]} 0%, #ffffff 100%);
  border: 1px solid ${PREMIUM_COLORS.BASE_COLORS.forest[200]};
  border-radius: 12px;
  padding: ${PREMIUM_SPACING.lg}px;
  margin-bottom: ${PREMIUM_SPACING.lg}px;
`;

const PricingHeader = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: ${PREMIUM_COLORS.BASE_COLORS.forest[700]};
  margin: 0 0 ${PREMIUM_SPACING.md}px 0;
  text-align: center;
`;

const PricingRow = styled.div<{ $isTotal?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${PREMIUM_SPACING.sm}px 0;
  border-bottom: ${props => props.$isTotal ? 
    `2px solid ${PREMIUM_COLORS.BASE_COLORS.forest[300]}` : 
    `1px solid ${PREMIUM_COLORS.BASE_COLORS.ivory[300]}`};
  
  &:last-child {
    border-bottom: none;
  }
`;

const PricingLabel = styled.span<{ $isTotal?: boolean }>`
  font-size: ${props => props.$isTotal ? '16px' : '14px'};
  font-weight: ${props => props.$isTotal ? '600' : '500'};
  color: ${props => props.$isTotal ? 
    PREMIUM_COLORS.BASE_COLORS.forest[700] : 
    PREMIUM_COLORS.BASE_COLORS.gray[600]};
`;

const PricingValue = styled.span<{ $isTotal?: boolean }>`
  font-size: ${props => props.$isTotal ? '18px' : '14px'};
  font-weight: 600;
  color: ${props => props.$isTotal ? 
    PREMIUM_COLORS.BASE_COLORS.forest[700] : 
    PREMIUM_COLORS.BASE_COLORS.gray[800]};
`;

const PricingNote = styled.p`
  font-size: 12px;
  color: ${PREMIUM_COLORS.BASE_COLORS.gray[500]};
  text-align: center;
  margin: ${PREMIUM_SPACING.md}px 0 0 0;
  font-style: italic;
`;

const SubmissionStateDisplay = styled.div<{ $status: 'submitting' | 'success' | 'error' }>`
  background: ${props => {
    switch (props.$status) {
      case 'submitting': return '#f0f9ff';
      case 'success': return '#f0fdf4';
      case 'error': return '#fef2f2';
      default: return 'white';
    }
  }};
  border: 1px solid ${props => {
    switch (props.$status) {
      case 'submitting': return '#bfdbfe';
      case 'success': return '#bbf7d0';
      case 'error': return '#fecaca';
      default: return PREMIUM_COLORS.BASE_COLORS.ivory[300];
    }
  }};
  border-radius: 12px;
  padding: ${PREMIUM_SPACING.lg}px;
  margin: ${PREMIUM_SPACING.lg}px 0;
  text-align: center;
`;

const SubmissionIcon = styled.div<{ $status: 'submitting' | 'success' | 'error' }>`
  font-size: 48px;
  margin-bottom: ${PREMIUM_SPACING.md}px;
  color: ${props => {
    switch (props.$status) {
      case 'submitting': return '#3b82f6';
      case 'success': return '#16a34a';
      case 'error': return '#dc2626';
      default: return PREMIUM_COLORS.BASE_COLORS.gray[500];
    }
  }};
`;

const SubmissionTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 ${PREMIUM_SPACING.sm}px 0;
  color: ${PREMIUM_COLORS.BASE_COLORS.gray[800]};
`;

const SubmissionMessage = styled.p`
  font-size: 14px;
  color: ${PREMIUM_COLORS.BASE_COLORS.gray[600]};
  margin: 0;
  line-height: 1.5;
`;

const BookingReference = styled.div`
  background: ${PREMIUM_COLORS.BASE_COLORS.forest[100]};
  border: 1px solid ${PREMIUM_COLORS.BASE_COLORS.forest[300]};
  border-radius: 8px;
  padding: ${PREMIUM_SPACING.md}px;
  margin: ${PREMIUM_SPACING.md}px 0;
  text-align: center;
`;

const ReferenceLabel = styled.div`
  font-size: 12px;
  color: ${PREMIUM_COLORS.BASE_COLORS.forest[600]};
  font-weight: 500;
  margin-bottom: 4px;
`;

const ReferenceNumber = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: ${PREMIUM_COLORS.BASE_COLORS.forest[700]};
  letter-spacing: 1px;
`;

const NextStepsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: ${PREMIUM_SPACING.lg}px 0 0 0;
  text-align: left;
`;

const NextStepItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: ${PREMIUM_SPACING.sm}px;
  margin-bottom: ${PREMIUM_SPACING.md}px;
  font-size: 14px;
  color: ${PREMIUM_COLORS.BASE_COLORS.gray[700]};
  line-height: 1.5;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const ContactSection = styled.div`
  background: ${PREMIUM_COLORS.BASE_COLORS.ivory[50]};
  border-radius: 8px;
  padding: ${PREMIUM_SPACING.lg}px;
  margin-top: ${PREMIUM_SPACING.lg}px;
`;

const ContactTitle = styled.h4`
  font-size: 16px;
  font-weight: 600;
  color: ${PREMIUM_COLORS.BASE_COLORS.gray[800]};
  margin: 0 0 ${PREMIUM_SPACING.md}px 0;
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${PREMIUM_SPACING.sm}px;
`;

const ContactMethod = styled.div`
  display: flex;
  align-items: center;
  gap: ${PREMIUM_SPACING.xs}px;
  font-size: 14px;
  color: ${PREMIUM_COLORS.BASE_COLORS.gray[700]};
`;

const ContactNote = styled.p`
  font-size: 12px;
  color: ${PREMIUM_COLORS.BASE_COLORS.gray[500]};
  margin: ${PREMIUM_SPACING.sm}px 0 0 0;
  font-style: italic;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${PREMIUM_SPACING.md}px;
  justify-content: center;
  margin-top: ${PREMIUM_SPACING.xl}px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ActionButton = styled.button<{ $variant: 'primary' | 'secondary' }>`
  padding: ${PREMIUM_SPACING.md}px ${PREMIUM_SPACING.xl}px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${PREMIUM_SPACING.sm}px;
  min-width: 160px;
  
  ${props => props.$variant === 'primary' ? `
    background: ${PREMIUM_COLORS.BASE_COLORS.forest[500]};
    color: white;
    border: 2px solid ${PREMIUM_COLORS.BASE_COLORS.forest[500]};
    
    &:hover:not(:disabled) {
      background: ${PREMIUM_COLORS.BASE_COLORS.forest[600]};
      border-color: ${PREMIUM_COLORS.BASE_COLORS.forest[600]};
      transform: translateY(-1px);
    }
  ` : `
    background: white;
    color: ${PREMIUM_COLORS.BASE_COLORS.gray[700]};
    border: 2px solid ${PREMIUM_COLORS.BASE_COLORS.ivory[300]};
    
    &:hover:not(:disabled) {
      border-color: ${PREMIUM_COLORS.BASE_COLORS.forest[300]};
      color: ${PREMIUM_COLORS.BASE_COLORS.forest[600]};
    }
  `}
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const ConfirmationStep: React.FC<ConfirmationStepProps> = ({
  onComplete,
  onBack,
  isLoading = false,
  bookingData
}) => {
  const { state, goToStep } = useBooking();
  const [submissionState, setSubmissionState] = useState<SubmissionStateData>({ status: 'idle' });
  const [isGeneratingCalendar, setIsGeneratingCalendar] = useState(false);

  // CRITICAL: Enhanced validation logic to check multiple data sources
  const validateAndExtractBookingData = () => {
    console.log('[Confirmation] Validating booking data from all sources:', {
      contextState: {
        selectedService: state.selectedService,
        selectedDate: state.selectedDate,
        selectedTimeSlot: state.selectedTimeSlot,
        clientInfo: state.clientInfo
      },
      propsBookingData: bookingData
    });

    // Extract data from multiple sources - props take precedence over context state
    const serviceData = bookingData?.service || state.selectedService;
    const dateData = bookingData?.date || state.selectedDate;
    const timeSlotData = bookingData?.timeSlot || state.selectedTimeSlot;
    const clientInfoData = bookingData?.clientInfo || state.clientInfo;

    console.log('[Confirmation] Extracted data:', {
      serviceData: serviceData?.name,
      dateData,
      timeSlotData,
      clientInfoData: clientInfoData?.firstName
    });

    // Validation checks
    const validationResults = {
      hasService: !!serviceData,
      hasDate: !!dateData,
      hasTimeSlot: !!timeSlotData,
      hasClientInfo: !!clientInfoData,
      hasRequiredClientFields: !!(clientInfoData?.firstName && clientInfoData?.lastName && clientInfoData?.email)
    };

    console.log('[Confirmation] Validation results:', validationResults);

    const isValid = Object.values(validationResults).every(Boolean);

    return {
      isValid,
      validationResults,
      finalBookingData: {
        selectedService: serviceData,
        selectedDate: dateData,
        selectedTimeSlot: timeSlotData,
        clientInfo: clientInfoData
      }
    };
  };

  // Validate data and extract final booking data
  const { isValid, validationResults, finalBookingData } = validateAndExtractBookingData();

  // CRITICAL: Show validation error with enhanced debugging if data is incomplete
  if (!isValid) {
    return (
      <Container>
        <Header>
          <Title>⚠️ Incomplete Booking Information</Title>
          <Subtitle>Please complete all previous steps before confirming your booking.</Subtitle>
        </Header>

        <SubmissionStateDisplay $status="error">
          <SubmissionIcon $status="error">❌</SubmissionIcon>
          <SubmissionTitle>Missing Required Information</SubmissionTitle>
          <SubmissionMessage>
            Some required booking information is missing. Please review the details below.
          </SubmissionMessage>

          <div style={{ background: '#fff', border: '1px solid #fca5a5', borderRadius: '8px', padding: '16px', margin: '24px 0', textAlign: 'left' }}>
            <h4 style={{ color: '#dc2626', fontSize: '16px', fontWeight: '600', marginBottom: '12px' }}>Missing Information:</h4>
            <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
              {!validationResults.hasService && (
                <li style={{ color: '#7f1d1d', fontSize: '14px', marginBottom: '8px', paddingLeft: '8px' }}>❌ Service selection required</li>
              )}
              {!validationResults.hasDate && (
                <li style={{ color: '#7f1d1d', fontSize: '14px', marginBottom: '8px', paddingLeft: '8px' }}>❌ Date selection required</li>
              )}
              {!validationResults.hasTimeSlot && (
                <li style={{ color: '#7f1d1d', fontSize: '14px', marginBottom: '8px', paddingLeft: '8px' }}>❌ Time slot selection required</li>
              )}
              {!validationResults.hasClientInfo && (
                <li style={{ color: '#7f1d1d', fontSize: '14px', marginBottom: '8px', paddingLeft: '8px' }}>❌ Client information required</li>
              )}
              {!validationResults.hasRequiredClientFields && (
                <li style={{ color: '#7f1d1d', fontSize: '14px', marginBottom: '8px', paddingLeft: '8px' }}>❌ Complete client details required</li>
              )}
            </ul>
          </div>

          <ActionButtons>
            {onBack && (
              <ActionButton $variant="secondary" onClick={onBack}>
                Back to Previous Step
              </ActionButton>
            )}
            
            <ActionButton $variant="primary" onClick={() => window.location.reload()}>
              Start Over
            </ActionButton>
          </ActionButtons>

          {process.env.NODE_ENV === 'development' && (
            <div style={{ background: '#f3f4f6', border: '1px solid #d1d5db', borderRadius: '8px', padding: '16px', textAlign: 'left', fontSize: '12px', marginTop: '24px' }}>
              <h4 style={{ color: '#374151', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>Debug Information:</h4>
              <pre style={{ margin: '0', whiteSpace: 'pre-wrap', wordBreak: 'break-word', fontFamily: 'monospace', fontSize: '11px' }}>
                {JSON.stringify({
                  hasBookingDataProp: !!bookingData,
                  bookingDataKeys: bookingData ? Object.keys(bookingData) : [],
                  contextState: {
                    hasService: !!state.selectedService,
                    hasDate: !!state.selectedDate,
                    hasTimeSlot: !!state.selectedTimeSlot,
                    hasClientInfo: !!state.clientInfo
                  },
                  validationResults,
                  extractedService: finalBookingData?.selectedService?.name,
                  extractedDate: finalBookingData?.selectedDate,
                  extractedTimeSlot: finalBookingData?.selectedTimeSlot,
                  extractedClient: finalBookingData?.clientInfo?.firstName
                }, null, 2)}
              </pre>
            </div>
          )}
        </SubmissionStateDisplay>
      </Container>
    );
  }

  // Enhanced formatting functions with proper error handling
  const formatDate = (dateString: string) => {
    try {
      if (!dateString || dateString === 'undefined') {
        return 'Date not selected';
      }
      
      // Handle different date format possibilities
      let dateObj;
      if (dateString.includes('T') || dateString.includes('Z')) {
        // ISO string
        dateObj = new Date(dateString);
      } else if (dateString.includes('-') && dateString.length === 10) {
        // YYYY-MM-DD format
        dateObj = new Date(dateString + 'T00:00:00');
      } else {
        // Try direct parsing
        dateObj = new Date(dateString);
      }
      
      if (isNaN(dateObj.getTime())) {
        console.warn('[Confirmation] Invalid date string:', dateString);
        return dateString; // Return original if can't parse
      }
      
      return dateObj.toLocaleDateString('en-GB', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      console.error('[Confirmation] Date formatting error:', error, 'for date:', dateString);
      return dateString || 'Invalid date';
    }
  };

  const formatTime = (timeSlotData: any) => {
    try {
      if (!timeSlotData) {
        return 'Time not selected';
      }
      
      // Handle different time slot data structures
      if (typeof timeSlotData === 'string') {
        // If it's already formatted like "10:00-11:00"
        if (timeSlotData.includes('-') && !timeSlotData.includes('Invalid')) {
          return timeSlotData;
        }
        
        // If it's an ISO string
        if (timeSlotData.includes('T') || timeSlotData.includes('Z')) {
          const date = new Date(timeSlotData);
          if (!isNaN(date.getTime())) {
            return date.toLocaleTimeString('en-GB', {
              hour: 'numeric',
              minute: '2-digit',
              hour12: false
            });
          }
        }
        
        return timeSlotData;
      }
      
      // Handle time slot objects
      if (timeSlotData.startTime && timeSlotData.endTime) {
        const start = new Date(timeSlotData.startTime);
        const end = new Date(timeSlotData.endTime);
        
        if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
          const startTime = start.toLocaleTimeString('en-GB', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: false
          });
          const endTime = end.toLocaleTimeString('en-GB', {
            hour: 'numeric', 
            minute: '2-digit',
            hour12: false
          });
          return `${startTime}-${endTime}`;
        }
      }
      
      // Handle simple time slot format
      if (timeSlotData.time) {
        return timeSlotData.time;
      }
      
      return 'Time not available';
    } catch (error) {
      console.error('[Confirmation] Time formatting error:', error, 'for timeSlot:', timeSlotData);
      return 'Time format error';
    }
  };

  const formatCurrency = (amount: number | string) => {
    const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(numAmount);
  };

  const getCaseTypeLabel = (caseType: string) => {
    return caseTypeOptions.find(opt => opt.value === caseType)?.label || caseType;
  };

  const getUrgencyLabel = (urgency: string) => {
    return urgencyLevelOptions.find(opt => opt.value === urgency)?.label || urgency;
  };

  const getContactMethodLabel = (method: string) => {
    switch (method) {
      case 'email': return 'Email';
      case 'phone': return 'Phone';
      case 'text': return 'Text Message';
      default: return method;
    }
  };

  const getFraudTypeLabel = (fraudType?: string) => {
    if (!fraudType) return 'General Recovery';
    
    switch (fraudType) {
      case 'investment_fraud': return 'Investment Fraud';
      case 'bank_fraud': return 'Bank Fraud';
      case 'credit_card_fraud': return 'Credit Card Fraud';
      case 'identity_theft': return 'Identity Theft';
      case 'pension_scam': return 'Pension Scam';
      case 'mortgage_fraud': return 'Mortgage Fraud';
      case 'insurance_fraud': return 'Insurance Fraud';
      case 'tax_fraud': return 'Tax Fraud';
      default: return 'Financial Recovery';
    }
  };

  // Enhanced backend submission with proper error handling
  const submitBooking = async () => {
    try {
      setSubmissionState({ status: 'submitting' });
      
      // COMPREHENSIVE DEBUGGING - Let's see exactly what we have
      console.log('====== BOOKING SUBMISSION DEBUG START ======');
      console.log('[DEBUG] Starting booking submission...');
      console.log('[DEBUG] finalBookingData:', finalBookingData);
      console.log('[DEBUG] finalBookingData.selectedService:', finalBookingData?.selectedService);
      console.log('[DEBUG] finalBookingData.selectedDate:', finalBookingData?.selectedDate);
      console.log('[DEBUG] finalBookingData.selectedTimeSlot:', finalBookingData?.selectedTimeSlot);
      console.log('[DEBUG] finalBookingData.clientInfo:', finalBookingData?.clientInfo);
      
      // Check if we have all required data
      if (!finalBookingData) {
        throw new Error('DEBUG: finalBookingData is null or undefined');
      }
      
      if (!finalBookingData.selectedService) {
        throw new Error('DEBUG: selectedService is missing');
      }
      
      if (!finalBookingData.selectedDate) {
        throw new Error('DEBUG: selectedDate is missing');
      }
      
      if (!finalBookingData.selectedTimeSlot) {
        throw new Error('DEBUG: selectedTimeSlot is missing');
      }
      
      if (!finalBookingData.clientInfo) {
        throw new Error('DEBUG: clientInfo is missing');
      }
      
      // Check individual client info fields
      console.log('[DEBUG] clientInfo breakdown:');
      console.log('  firstName:', finalBookingData.clientInfo.firstName);
      console.log('  lastName:', finalBookingData.clientInfo.lastName);
      console.log('  email:', finalBookingData.clientInfo.email);
      console.log('  phone:', finalBookingData.clientInfo.phone);
      console.log('  preferredContactMethod:', finalBookingData.clientInfo.preferredContactMethod);
      console.log('  fraudType:', finalBookingData.clientInfo.fraudType);
      console.log('  approximateLossAmount:', finalBookingData.clientInfo.approximateLossAmount);
      console.log('  additionalNotes:', finalBookingData.clientInfo.additionalNotes);
      
      // Check required fields exist
      if (!finalBookingData.clientInfo.firstName) {
        throw new Error('DEBUG: firstName is missing from clientInfo');
      }
      if (!finalBookingData.clientInfo.lastName) {
        throw new Error('DEBUG: lastName is missing from clientInfo');
      }
      if (!finalBookingData.clientInfo.email) {
        throw new Error('DEBUG: email is missing from clientInfo');
      }
      if (!finalBookingData.clientInfo.phone) {
        throw new Error('DEBUG: phone is missing from clientInfo');
      }
      
      console.log('[DEBUG] All required fields present, constructing client payload...');
      
      // Step 1: Prepare client payload with all required fields - WITH SAFE ACCESS
      const clientPayload = {
        firstName: finalBookingData.clientInfo.firstName,
        lastName: finalBookingData.clientInfo.lastName,
        email: finalBookingData.clientInfo.email.toLowerCase(),
        phone: finalBookingData.clientInfo.phone,
        preferredContactMethod: finalBookingData.clientInfo.preferredContactMethod || 'email',
        gdprConsent: true,
        marketingConsent: false,
        // Additional fields that might be needed - SAFE ACCESS
        notes: finalBookingData.clientInfo.additionalNotes || '',
        caseType: finalBookingData.clientInfo.fraudType || 'other',
        estimatedLoss: finalBookingData.clientInfo.approximateLossAmount ? 
          parseInt(finalBookingData.clientInfo.approximateLossAmount.toString()) : 0,
        urgencyLevel: 'standard' // Default value
      };
      
      console.log('[DEBUG] Client payload constructed:', clientPayload);
      console.log('[DEBUG] Making client creation request...');
      
      // Make client creation request with proper error handling
      const clientResponse = await fetch('http://localhost:5000/api/clients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(clientPayload),
        mode: 'cors'
      });
      
      console.log('[DEBUG] Client response status:', clientResponse.status);
      
      if (!clientResponse.ok) {
        const errorText = await clientResponse.text();
        console.error('[DEBUG] Client creation failed:', errorText);
        throw new Error(`Client creation failed: ${clientResponse.status} - ${errorText}`);
      }
      
      const clientData = await clientResponse.json();
      console.log('[DEBUG] Client created successfully:', clientData);
      
      // Extract client ID from response
      const clientId = clientData.data?._id || clientData.data?.id || clientData._id || clientData.id;
      
      if (!clientId) {
        console.error('[DEBUG] No client ID returned:', clientData);
        throw new Error('Failed to create client record - no ID returned');
      }
      
      console.log('[DEBUG] Client ID extracted:', clientId);
      
      // Step 2: Prepare booking payload
      console.log('[DEBUG] Formatting time slot...');
      const timeSlotString = formatTime(finalBookingData.selectedTimeSlot);
      console.log('[DEBUG] Time slot formatted:', timeSlotString);
      
      const bookingPayload = {
        clientId: clientId,
        serviceId: finalBookingData.selectedService.id,
        serviceName: finalBookingData.selectedService.name,
        date: finalBookingData.selectedDate,
        timeSlot: timeSlotString,
        notes: finalBookingData.clientInfo.additionalNotes || `${finalBookingData.selectedService.name} consultation`,
        estimatedValue: finalBookingData.clientInfo.approximateLossAmount ? 
          parseInt(finalBookingData.clientInfo.approximateLossAmount.toString()) : 0,
        status: 'confirmed'
      };
      
      console.log('[DEBUG] Booking payload constructed:', bookingPayload);
      console.log('[DEBUG] Making booking creation request...');
      
      // Make booking creation request
      const bookingResponse = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(bookingPayload),
        mode: 'cors'
      });
      
      console.log('[DEBUG] Booking response status:', bookingResponse.status);
      
      if (!bookingResponse.ok) {
        const errorText = await bookingResponse.text();
        console.error('[DEBUG] Booking creation failed:', errorText);
        throw new Error(`Booking creation failed: ${bookingResponse.status} - ${errorText}`);
      }
      
      const bookingData = await bookingResponse.json();
      console.log('[DEBUG] Booking created successfully:', bookingData);
      
      // Extract booking reference
      const bookingRef = bookingData.data?.reference || 
                        bookingData.data?._id || 
                        bookingData.data?.id ||
                        bookingData.reference ||
                        bookingData._id ||
                        bookingData.id ||
                        `RO-${Date.now()}`;
      
      console.log('[DEBUG] Booking reference extracted:', bookingRef);
      
      // Step 3: Update success state
      setSubmissionState({
        status: 'success',
        bookingRef: bookingRef
      });
      
      console.log('[DEBUG] Booking process completed successfully with reference:', bookingRef);
      console.log('====== BOOKING SUBMISSION DEBUG END ======');
      
      // Call onComplete callback after a brief delay
      setTimeout(() => {
        onComplete?.({ 
          bookingReference: bookingRef,
          confirmationSent: true 
        });
      }, 2000);
      
    } catch (error: unknown) {
      console.error('====== BOOKING SUBMISSION ERROR ======');
      console.error('[ERROR] Booking submission failed:', error);
      console.error('[ERROR] Error type:', typeof error);
      console.error('[ERROR] Error name:', (error as any)?.constructor?.name);
      console.error('[ERROR] Error message:', (error as any)?.message);
      console.error('[ERROR] Error stack:', (error as any)?.stack);
      console.error('====== ERROR DEBUG END ======');
      
      let errorMessage = 'Booking submission failed. Please try again.';
      
      if (error instanceof Error) {
        // Show the actual error message for debugging
        errorMessage = `ERROR: ${error.message}`;
        
        if (error.message.includes('fetch failed') || error.message.includes('Failed to fetch')) {
          errorMessage = 'Unable to connect to our booking system. Please check your internet connection and try again.';
        } else if (error.message.includes('CORS')) {
          errorMessage = 'Connection security issue. Please contact our support team.';
        } else if (error.message.includes('network')) {
          errorMessage = 'Network error. Please check your connection and try again.';
        } else if (error.message.includes('400')) {
          errorMessage = 'Please check your information and try again.';
        } else if (error.message.includes('500')) {
          errorMessage = 'Our booking system is temporarily unavailable. Please try again in a few minutes.';
        } else if (error.message.includes('duplicate') || error.message.includes('already exists')) {
          errorMessage = 'A booking with this information already exists. Please contact us if you need to make changes.';
        }
      }
      
      setSubmissionState({
        status: 'error',
        error: errorMessage
      });
    }
  };

  // Calendar file generation
  const generateCalendarFile = () => {
    try {
      setIsGeneratingCalendar(true);
      vlog('[Confirmation] Generating calendar file...');
      
      const startDate = new Date(finalBookingData.selectedTimeSlot!.startTime);
      const endDate = new Date(finalBookingData.selectedTimeSlot!.endTime);
      
      const icsContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Recovery Office//Booking System//EN',
        'BEGIN:VEVENT',
        `UID:${submissionState.bookingRef || Date.now()}@recoveryoffice.com`,
        `DTSTART:${startDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
        `DTEND:${endDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
        `SUMMARY:Recovery Office Consultation - ${finalBookingData.selectedService!.name}`,
        `DESCRIPTION:Professional consultation session for ${finalBookingData.selectedService!.name}`,
        'LOCATION:Recovery Office (Details in confirmation email)',
        'STATUS:CONFIRMED',
        'END:VEVENT',
        'END:VCALENDAR'
      ].join('\r\n');
      
      const blob = new Blob([icsContent], { type: 'text/calendar' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `recovery-office-appointment-${submissionState.bookingRef || 'booking'}.ics`;
      link.click();
      URL.revokeObjectURL(url);
      
      vsuccess('[Confirmation] Calendar file generated successfully');
    } catch (error) {
      verror('[Confirmation] Error generating calendar file:', error);
    } finally {
      setIsGeneratingCalendar(false);
    }
  };

  if (isLoading) {
    return <LoadingOverlay message="Preparing confirmation..." />;
  }

  // Show submission states
  if (submissionState.status === 'submitting') {
    return (
      <Container>
        <SubmissionStateDisplay $status="submitting">
          <SubmissionIcon $status="submitting">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              ⏳
            </motion.div>
          </SubmissionIcon>
          <SubmissionTitle>Processing Your Booking...</SubmissionTitle>
          <SubmissionMessage>
            Please wait while we confirm your consultation appointment. 
            This may take a few moments.
          </SubmissionMessage>
        </SubmissionStateDisplay>
      </Container>
    );
  }

  if (submissionState.status === 'success') {
    return (
      <Container>
        <SubmissionStateDisplay $status="success">
          <SubmissionIcon $status="success">✓</SubmissionIcon>
          <SubmissionTitle>Booking Confirmed!</SubmissionTitle>
          <SubmissionMessage>
            Your consultation has been successfully scheduled. We'll be in touch soon.
          </SubmissionMessage>
          
          <BookingReference>
            <ReferenceLabel>Booking Reference:</ReferenceLabel>
            <ReferenceNumber>{submissionState.bookingRef}</ReferenceNumber>
          </BookingReference>
          
          <NextStepsList>
            <NextStepItem>
              📧 You'll receive a detailed confirmation email within 5 minutes
            </NextStepItem>
            <NextStepItem>
              📅 A calendar invitation will be sent with meeting details
            </NextStepItem>
            <NextStepItem>
              📞 Our team will contact you 24 hours before your appointment
            </NextStepItem>
            <NextStepItem>
              📋 Please prepare any relevant documents for your consultation
            </NextStepItem>
          </NextStepsList>
          
          <ContactSection>
            <ContactTitle>Need to make changes?</ContactTitle>
            <ContactInfo>
              <ContactMethod>
                <PhoneIcon size={14} />
                Call us: +44 20 7123 4567
              </ContactMethod>
              <ContactMethod>
                <MailIcon size={14} />
                Email us: bookings@recoveryoffice.com
              </ContactMethod>
              <ContactNote>
                Quote your booking reference: {submissionState.bookingRef}
              </ContactNote>
            </ContactInfo>
          </ContactSection>
          
          <ActionButtons>
            <ActionButton 
              $variant="secondary" 
              onClick={generateCalendarFile}
              disabled={isGeneratingCalendar}
            >
              <DownloadIcon size={16} />
              {isGeneratingCalendar ? 'Generating...' : 'Add to Calendar'}
            </ActionButton>
          </ActionButtons>
        </SubmissionStateDisplay>
      </Container>
    );
  }

  if (submissionState.status === 'error') {
    return (
      <Container>
        <SubmissionStateDisplay $status="error">
          <SubmissionIcon $status="error">⚠️</SubmissionIcon>
          <SubmissionTitle>Booking Failed</SubmissionTitle>
          <SubmissionMessage>
            {submissionState.error}
          </SubmissionMessage>
          
          <ActionButtons>
            <ActionButton 
              $variant="secondary" 
              onClick={() => setSubmissionState({ status: 'idle' })}
            >
              Try Again
            </ActionButton>
            <ActionButton 
              $variant="primary" 
              onClick={() => window.location.href = 'mailto:bookings@recoveryoffice.com'}
            >
              Contact Support
            </ActionButton>
          </ActionButtons>
        </SubmissionStateDisplay>
      </Container>
    );
  }

  // Main confirmation display
  return (
    <Container>
      <Header>
        <Title>Review & Confirm Your Consultation</Title>
        <Subtitle>
          Please review your consultation details below. Once confirmed, you'll receive 
          an email confirmation with all the necessary information.
        </Subtitle>
      </Header>

      <ContentGrid>
        {/* Left Column - Booking Summary */}
        <div>
          {/* Service Summary */}
          <SummaryCard>
            <CardHeader>
              <SectionTitle>
                <FileTextIcon size={20} />
                Service Details
              </SectionTitle>
              <EditButton onClick={() => goToStep(0)}>
                <EditIcon size={12} />
                Edit
              </EditButton>
            </CardHeader>
            
            <DetailRow>
              <DetailLabel>Service Type</DetailLabel>
              <DetailValue>{finalBookingData.selectedService!.name}</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>Duration</DetailLabel>
              <DetailValue>{finalBookingData.selectedService!.duration} minutes</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>Consultation Fee</DetailLabel>
              <DetailValue>
                {finalBookingData.selectedService!.price ? 
                  formatCurrency(finalBookingData.selectedService!.price) : 
                  'Complimentary'
                }
              </DetailValue>
            </DetailRow>
          </SummaryCard>

          {/* Appointment Summary */}
          <SummaryCard>
            <CardHeader>
              <SectionTitle>
                <CalendarIcon size={20} />
                Date & Time
              </SectionTitle>
              <EditButton onClick={() => goToStep(1)}>
                <EditIcon size={12} />
                Edit
              </EditButton>
            </CardHeader>
            
            <DetailRow>
              <DetailLabel>Date</DetailLabel>
              <DetailValue>{formatDate(finalBookingData.selectedDate!)}</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>Time</DetailLabel>
              <DetailValue>
                {formatTime(finalBookingData.selectedTimeSlot)}
              </DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>Timezone</DetailLabel>
              <DetailValue>Greenwich Mean Time (GMT)</DetailValue>
            </DetailRow>
          </SummaryCard>

          {/* Client Information Summary */}
          <SummaryCard>
            <CardHeader>
              <SectionTitle>
                <UserIcon size={20} />
                Your Information
              </SectionTitle>
              <EditButton onClick={() => goToStep(2)}>
                <EditIcon size={12} />
                Edit
              </EditButton>
            </CardHeader>
            
            <DetailRow>
              <DetailLabel>Name</DetailLabel>
              <DetailValue>{finalBookingData.clientInfo!.firstName} {finalBookingData.clientInfo!.lastName}</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>Email</DetailLabel>
              <DetailValue>{finalBookingData.clientInfo!.email}</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>Phone</DetailLabel>
              <DetailValue>{finalBookingData.clientInfo!.phone}</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>Case Type</DetailLabel>
              <DetailValue>{getCaseTypeLabel(finalBookingData.clientInfo!.fraudType || 'other')}</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>Preferred Contact</DetailLabel>
              <DetailValue>{getContactMethodLabel(finalBookingData.clientInfo!.preferredContactMethod || 'email')}</DetailValue>
            </DetailRow>
          </SummaryCard>
        </div>

        {/* Right Column - Pricing & Actions */}
        <div>
          {/* Pricing Breakdown */}
          <PricingCard>
            <PricingHeader>Investment Summary</PricingHeader>
            <PricingRow>
              <PricingLabel>Consultation Fee:</PricingLabel>
              <PricingValue>
                {finalBookingData.selectedService!.price ? 
                  formatCurrency(finalBookingData.selectedService!.price) : 
                  'Free'
                }
              </PricingValue>
            </PricingRow>
            <PricingRow>
              <PricingLabel>Duration:</PricingLabel>
              <PricingValue>{finalBookingData.selectedService!.duration} minutes</PricingValue>
            </PricingRow>
            <PricingRow $isTotal>
              <PricingLabel $isTotal>Total Investment:</PricingLabel>
              <PricingValue $isTotal>
                {finalBookingData.selectedService!.price ? 
                  formatCurrency(finalBookingData.selectedService!.price) : 
                  'Free'
                }
              </PricingValue>
            </PricingRow>
            <PricingNote>
              Payment will be processed after your consultation. We accept all major payment methods.
            </PricingNote>
          </PricingCard>

          {/* Security & Trust */}
          <SummaryCard>
            <SectionTitle>
              <ShieldIcon size={20} />
              Secure & Confidential
            </SectionTitle>
            <DetailRow>
              <DetailLabel>Data Protection</DetailLabel>
              <DetailValue>GDPR Compliant</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>Encryption</DetailLabel>
              <DetailValue>256-bit SSL</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>Confidentiality</DetailLabel>
              <DetailValue>Professional Standards</DetailValue>
            </DetailRow>
          </SummaryCard>

          {/* Action Buttons */}
          <ActionButtons>
            {onBack && (
              <ActionButton $variant="secondary" onClick={onBack}>
                ← Back
              </ActionButton>
            )}
            <ActionButton 
              $variant="primary" 
              onClick={submitBooking}
              disabled={submissionState.status !== 'idle'}
            >
              <CheckCircleIcon size={16} />
              Confirm Booking
            </ActionButton>
          </ActionButtons>
        </div>
      </ContentGrid>
    </Container>
  );
};

export default ConfirmationStep; 

















