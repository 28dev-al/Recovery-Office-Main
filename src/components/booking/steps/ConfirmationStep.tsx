/**
 * ConfirmationStep Component - Professional Production Ready
 * 
 * Professional booking confirmation system for financial recovery consultations.
 * Features premium layout, complete German translations, and professional branding.
 */

import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useBooking } from '../../../context/BookingContext';
import { ConfirmationStepProps } from '../../../types/booking.types';
import { LoadingOverlay } from '../../../design-system/components/feedback/LoadingOverlay';

// Submission state interface
interface SubmissionStateData {
  status: 'idle' | 'submitting' | 'success' | 'error';
  bookingRef?: string;
  error?: string;
}

// Professional Styled Components
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 40px;

  h1 {
  font-size: 32px;
    color: #1a365d;
    margin-bottom: 16px;
    font-family: 'Playfair Display', serif;
  font-weight: 700;
  }

  p {
  font-size: 16px;
    color: #4a5568;
  line-height: 1.6;
  }
`;

const ContentGrid = styled.div`
  display: grid;
    grid-template-columns: 2fr 1fr;
  gap: 40px;
  margin-bottom: 40px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const ProfessionalCard = styled.div`
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.2s ease;
  
  &:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 2px solid #f7fafc;
  
  h3 {
  font-size: 18px;
    color: #1a365d;
  margin: 0;
    font-weight: 700;
  display: flex;
  align-items: center;
    gap: 8px;
  }
`;

const EditButton = styled.button`
  background: white;
  border: 1px solid #e2e8f0;
  color: #4a5568;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: #1a365d;
    color: #1a365d;
  }
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #f7fafc;
  
  &:last-child {
    border-bottom: none;
  }
`;

const Label = styled.span`
  font-weight: 600;
  color: #4a5568;
  font-size: 14px;
`;

const Value = styled.span`
  color: #1a365d;
  font-weight: 500;
  font-size: 14px;
`;

const FreeValue = styled.span`
  color: #38a169;
  font-weight: 700;
  font-size: 16px;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #f7fafc;
  
  &:last-child {
    border-bottom: none;
  }
`;

const SummaryDivider = styled.div`
  height: 2px;
  background: #e2e8f0;
  margin: 12px 0;
`;

const SummaryTotal = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-top: 2px solid #1a365d;
  margin-top: 12px;
  font-size: 18px;
  font-weight: 700;
`;

const SecurityItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #f7fafc;
  
  &:last-child {
    border-bottom: none;
  }
`;

const SecurityLabel = styled.span`
  font-weight: 600;
  color: #4a5568;
  font-size: 14px;
`;

const SecurityValue = styled.span`
  color: #38a169;
  font-weight: 600;
  font-size: 14px;
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const BackButton = styled.button`
  background: white;
  border: 2px solid #e2e8f0;
  color: #4a5568;
  padding: 16px 32px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: #f7fafc;
    border-color: #1a365d;
    color: #1a365d;
  }
`;

const ConfirmButton = styled.button`
  background: #38a169;
  border: 2px solid #38a169;
  color: white;
  padding: 16px 32px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &:hover {
    background: #2f855a;
    border-color: #2f855a;
      transform: translateY(-1px);
    }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

// Submission state styled components
const SubmissionStateDisplay = styled.div<{ $status: 'submitting' | 'success' | 'error' }>`
  background: ${props => {
    switch (props.$status) {
      case 'submitting': return 'linear-gradient(135deg, #f0f9ff 0%, #ffffff 100%)';
      case 'success': return 'linear-gradient(135deg, #f0fdf4 0%, #ffffff 100%)';
      case 'error': return 'linear-gradient(135deg, #fef2f2 0%, #ffffff 100%)';
      default: return 'white';
    }
  }};
  border: 2px solid ${props => {
    switch (props.$status) {
      case 'submitting': return '#3b82f6';
      case 'success': return '#16a34a';
      case 'error': return '#dc2626';
      default: return '#e2e8f0';
    }
  }};
  border-radius: 16px;
  padding: 40px;
  text-align: center;
`;

const SubmissionIcon = styled.div<{ $status: 'submitting' | 'success' | 'error' }>`
  font-size: 64px;
  margin-bottom: 24px;
  color: ${props => {
    switch (props.$status) {
      case 'submitting': return '#3b82f6';
      case 'success': return '#16a34a';
      case 'error': return '#dc2626';
      default: return '#4a5568';
    }
  }};
`;

const SubmissionTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;
  margin: 0 0 16px 0;
  color: #1a365d;
`;

const SubmissionMessage = styled.p`
  font-size: 16px;
  color: #4a5568;
  margin: 0;
  line-height: 1.6;
`;

export const ConfirmationStep: React.FC<ConfirmationStepProps> = ({
  onComplete,
  onBack,
  isLoading: propIsLoading = false, 
  bookingData: propBookingData
}) => {
  const { 
    resetForm,
    goToStep
  } = useBooking();
  
  const { i18n } = useTranslation();
  const [submissionState, setSubmissionState] = useState<SubmissionStateData>({ status: 'idle' });

  const finalBookingData = propBookingData;

  // German translation functions
  const getGermanServiceName = (serviceName: string): string => {
    const mapping: Record<string, string> = {
      'Cryptocurrency Recovery': 'Kryptowährungs-Rückgewinnung',
      'Investment Fraud Recovery': 'Anlagebetrug-Rückgewinnung',
      'Financial Scam Recovery': 'Finanzbetrug-Rückgewinnung',
      'Regulatory Assistance': 'Regulatorische Beschwerde-Unterstützung'
    };
    return i18n.language === 'de' ? (mapping[serviceName] || serviceName) : serviceName;
  };

  const getGermanCaseType = (caseType: string): string => {
    const mapping: Record<string, string> = {
      'investment-fraud': 'Anlagebetrug',
      'cryptocurrency-recovery': 'Kryptowährungs-Rückgewinnung',
      'financial-scam': 'Finanzbetrug',
      'regulatory-complaint': 'Regulatorische Beschwerde',
      'other': 'Sonstiges'
    };
    return i18n.language === 'de' ? (mapping[caseType] || mapping['other']) : caseType;
  };

  const getGermanContactMethod = (method: string): string => {
    const mapping: Record<string, string> = {
      'email': 'E-Mail',
      'phone': 'Telefon',
      'text': 'SMS',
      'both': 'Beides'
    };
    return i18n.language === 'de' ? (mapping[method] || method) : method;
  };

  const formatDateForLanguage = (dateString: string): string => {
    if (!dateString) return i18n.language === 'de' ? 'Nicht angegeben' : 'Not specified';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return dateString;
      }
      
      if (i18n.language === 'de') {
        return date.toLocaleDateString('de-DE', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
      } else {
      return date.toLocaleDateString('en-GB', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      }
    } catch {
      return dateString;
    }
  };

  const formatTimeForLanguage = (timeSlotData: string | { startTime?: string; slot?: string; time?: string } | unknown): string => {
    if (!timeSlotData) return i18n.language === 'de' ? 'Nicht angegeben' : 'Not specified';
    
    let timeString = '';
    
    // Handle string input
      if (typeof timeSlotData === 'string') {
      if (timeSlotData.includes('{') || timeSlotData.includes('startTime')) {
        try {
          const parsed = JSON.parse(timeSlotData);
          if (parsed.startTime) {
            timeString = parsed.startTime;
          }
        } catch {
          const timeMatch = timeSlotData.match(/(\d{2}:\d{2})/);
          if (timeMatch) {
            timeString = timeMatch[1];
          }
        }
      } else {
        timeString = timeSlotData;
      }
    }
    
    // Handle object input
    if (typeof timeSlotData === 'object' && timeSlotData !== null) {
      const timeObj = timeSlotData as { startTime?: string; slot?: string; time?: string };
      if (timeObj.startTime) {
        timeString = timeObj.startTime;
      } else if (timeObj.slot) {
        timeString = timeObj.slot;
      }
    }
    
    if (!timeString) {
      return i18n.language === 'de' ? 'Zeit nicht angegeben' : 'Time not specified';
    }
    
    // Add German formatting
    if (i18n.language === 'de') {
      if (timeString.includes('-')) {
        return `${timeString} Uhr GMT`;
      } else {
    // Convert single time to range (assume 90-minute consultations)
        const [hours, minutes] = timeString.split(':').map(Number);
    const endHour = hours + 1;
    const endMin = minutes + 30;
    const formatTime = (h: number, m: number) => 
      `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
        return `${formatTime(hours, minutes)}–${formatTime(endHour, endMin)} Uhr GMT`;
      }
    } else {
      return timeString.includes('-') ? `${timeString} GMT` : `${timeString} GMT`;
    }
  };

  const submitBooking = async () => {
    setSubmissionState({ status: 'submitting' });

    const { service: serviceToSubmit, date: dateToSubmit, timeSlot: timeSlotToSubmit, clientInfo: clientInfoToSubmit } = finalBookingData;

    if (!serviceToSubmit || !serviceToSubmit.name) { 
      setSubmissionState({ status: 'error', error: i18n.language === 'de' ? 'Service-Auswahl ungültig' : 'Service selection invalid' });
      return;
    }

    if (!clientInfoToSubmit || !clientInfoToSubmit.firstName || !clientInfoToSubmit.email) {
      setSubmissionState({ status: 'error', error: i18n.language === 'de' ? 'Kundeninformationen unvollständig' : 'Client information incomplete' });
      return;
    }

    try {
      // Service ID mapping
      const getServiceIdFromName = (serviceName: string): string => {
        const serviceMapping: Record<string, string> = {
          'Cryptocurrency Recovery': '6833842b0a231982cf5ed0fe',
          'Investment Fraud Recovery': '6833842b0a231982cf5ed0ff', 
          'Financial Scam Recovery': '6833842b0a231982cf5ed100',
          'Regulatory Assistance': '6833842b0a231982cf5ed101'
        };
        return serviceMapping[serviceName] || '6833842b0a231982cf5ed0fe';
      };

      // Loss amount parsing
      const parseLossAmount = (lossAmount?: string): number => {
        if (!lossAmount) return 0;
        const amounts: Record<string, number> = {
          'under-10k': 5000,
          '10k-100k': 50000,
          '100k-500k': 250000,
          '500k-1m': 750000,
          '1m-5m': 2500000,
          '5m+': 10000000
        };
        return amounts[lossAmount] || 0;
      };

      // Service type mapping
      const mapServiceTypeToCase = (serviceType: string): string => {
        const mapping: Record<string, string> = {
          'consultation': 'other',
          'cryptocurrency': 'cryptocurrency-recovery', 
          'investment': 'investment-fraud',
          'scam': 'financial-scam',
          'regulatory': 'regulatory-complaint',
          'Cryptocurrency Recovery': 'cryptocurrency-recovery',
          'Investment Fraud Recovery': 'investment-fraud',
          'Financial Scam Recovery': 'financial-scam',
          'Regulatory Assistance': 'regulatory-complaint'
        };
        return mapping[serviceType] || 'other';
      };

      // STEP 1: Create Client First
      const clientPayload = {
        firstName: clientInfoToSubmit.firstName,
        lastName: clientInfoToSubmit.lastName,
        email: clientInfoToSubmit.email,
        phone: clientInfoToSubmit.phone,
        gdprConsent: true,
        preferredContactMethod: clientInfoToSubmit.preferredContactMethod || 'email',
        caseType: mapServiceTypeToCase(serviceToSubmit.name),
        estimatedLoss: parseLossAmount(clientInfoToSubmit.estimatedLoss),
        urgencyLevel: 'standard',
        company: clientInfoToSubmit.company || ''
      };
      
      const { bookingApi } = await import('../../../config/api');
      const clientResponse = await bookingApi.createClient(clientPayload);
      
      const client = (clientResponse as { data?: { _id: string } }).data || clientResponse as { _id: string };
      
      if (!client || !client._id) {
        throw new Error(i18n.language === 'de' ? 'Kundenprofil konnte nicht erstellt werden' : 'Failed to create client profile');
      }
      
      // STEP 2: Create Booking with Client ID
      const formatTimeSlot = (selectedTime: string): string => {
        if (!selectedTime) return 'TBD';
        if (selectedTime.includes('-')) {
          return selectedTime;
        }
        const [hours, minutes] = selectedTime.split(':').map(Number);
        const startHour = hours;
        const startMin = minutes;
        const endHour = hours + 1;
        const endMin = minutes + 30;
        const formatTime = (h: number, m: number) => 
          `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
        return `${formatTime(startHour, startMin)}-${formatTime(endHour, endMin)}`;
      };

      const timeSlotValue = timeSlotToSubmit as { startTime?: string; time?: string } | string;
      const timeSlotString = typeof timeSlotValue === 'string' 
        ? timeSlotValue 
        : timeSlotValue?.startTime || timeSlotValue?.time || String(timeSlotToSubmit);

      const bookingPayload = {
        clientId: client._id,
        serviceId: getServiceIdFromName(serviceToSubmit.name),
        serviceName: serviceToSubmit.name,
        date: new Date(dateToSubmit).toISOString(),
        timeSlot: formatTimeSlot(timeSlotString),
        urgencyLevel: 'standard',
        estimatedValue: parseLossAmount(clientInfoToSubmit.estimatedLoss),
        notes: clientInfoToSubmit.notes || clientInfoToSubmit.additionalNotes || `${serviceToSubmit.name} consultation request`
      };
      
      const bookingResponse = await bookingApi.createBooking(bookingPayload);
      const booking = (bookingResponse as { data?: { _id: string } }).data || bookingResponse as { _id: string; reference?: string };
      
      if (!booking || !booking._id) {
        throw new Error(i18n.language === 'de' ? 'Buchung konnte nicht erstellt werden' : 'Failed to create booking');
      }
      
      const bookingRef = booking._id || (booking as { reference?: string }).reference;
      
      setSubmissionState({
        status: 'success',
        bookingRef: bookingRef
      });
      
      resetForm();

      if (onComplete) {
        onComplete({ 
          bookingReference: bookingRef,
          clientId: client._id,
          confirmationSent: true 
        });
      }

    } catch (error: unknown) {
      let submitError = i18n.language === 'de' ? 
        'Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es erneut.' :
        'An unexpected error occurred during booking. Please try again.';
      
      const errorMessage = error instanceof Error ? error.message : String(error);
      if (errorMessage) {
        if (errorMessage.includes('Client')) {
          submitError = i18n.language === 'de' ? 
            'Kundenprofil konnte nicht erstellt werden. Bitte überprüfen Sie Ihre Informationen und versuchen Sie es erneut.' :
            'Failed to create your client profile. Please check your information and try again.';
        } else if (errorMessage.includes('Booking')) {
          submitError = i18n.language === 'de' ? 
            'Buchung konnte nicht erstellt werden. Ihr Profil wurde erfolgreich erstellt. Bitte versuchen Sie die Buchung erneut.' :
            'Failed to create booking. Your profile was created successfully. Please try booking again.';
        }
      }
      
      setSubmissionState({
        status: 'error',
        error: submitError
      });
    }
  };

  if (propIsLoading) {
    return <LoadingOverlay message={i18n.language === 'de' ? 'Bestätigung wird vorbereitet...' : 'Preparing confirmation...'} />;
  }

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
          <SubmissionTitle>
            {i18n.language === 'de' ? 'Ihre Buchung wird bearbeitet...' : 'Processing Your Booking...'}
          </SubmissionTitle>
          <SubmissionMessage>
            {i18n.language === 'de' ? 
              'Bitte warten Sie, während wir Ihren Beratungstermin bestätigen. Dies kann einen Moment dauern.' :
              'Please wait while we confirm your consultation appointment. This may take a few moments.'
            }
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
          <SubmissionTitle>
            {i18n.language === 'de' ? 'Buchung bestätigt!' : 'Booking Confirmed!'}
          </SubmissionTitle>
          <SubmissionMessage>
            {i18n.language === 'de' ? 
              'Ihre Beratung wurde erfolgreich geplant. Wir werden uns bald bei Ihnen melden.' :
              'Your consultation has been successfully scheduled. We\'ll be in touch soon.'
            }
          </SubmissionMessage>
        </SubmissionStateDisplay>
      </Container>
    );
  }

  if (submissionState.status === 'error') {
    return (
      <Container>
        <SubmissionStateDisplay $status="error">
          <SubmissionIcon $status="error">⚠️</SubmissionIcon>
          <SubmissionTitle>
            {i18n.language === 'de' ? 'Buchung fehlgeschlagen' : 'Booking Failed'}
          </SubmissionTitle>
          <SubmissionMessage>{submissionState.error}</SubmissionMessage>
          
          <ActionButtons>
            <BackButton onClick={() => setSubmissionState({ status: 'idle' })}>
              {i18n.language === 'de' ? 'Erneut versuchen' : 'Try Again'}
            </BackButton>
          </ActionButtons>
        </SubmissionStateDisplay>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <h1>
          {i18n.language === 'de' ? 'Überprüfen & Bestätigen Sie Ihre Beratung' : 'Review & Confirm Your Consultation'}
        </h1>
        <p>
          {i18n.language === 'de' ? 
            'Bitte überprüfen Sie Ihre Beratungsdetails unten. Nach der Bestätigung erhalten Sie eine E-Mail-Bestätigung mit allen notwendigen Informationen.' :
            'Please review your consultation details below. Once confirmed, you\'ll receive an email confirmation with all the necessary information.'
          }
        </p>
      </Header>

      <ContentGrid>
        <LeftColumn>
          {/* Service Details Card */}
          <ProfessionalCard>
            <CardHeader>
              <h3>
                📋 {i18n.language === 'de' ? 'Service-Details' : 'Service Details'}
              </h3>
              <EditButton onClick={() => goToStep(0)}>
                {i18n.language === 'de' ? 'Bearbeiten' : 'Edit'}
              </EditButton>
            </CardHeader>
            <CardContent>
              <InfoRow>
                <Label>{i18n.language === 'de' ? 'Service-Typ' : 'Service Type'}:</Label>
                <Value>{getGermanServiceName(finalBookingData.service!.name)}</Value>
              </InfoRow>
              <InfoRow>
                <Label>{i18n.language === 'de' ? 'Dauer' : 'Duration'}:</Label>
                <Value>75 {i18n.language === 'de' ? 'Minuten' : 'minutes'}</Value>
              </InfoRow>
              <InfoRow>
                <Label>{i18n.language === 'de' ? 'Beratungsgebühr' : 'Consultation Fee'}:</Label>
                <FreeValue>{i18n.language === 'de' ? 'KOSTENLOS' : 'FREE'}</FreeValue>
              </InfoRow>
            </CardContent>
          </ProfessionalCard>
          
          {/* Date Time Card */}
          <ProfessionalCard>
            <CardHeader>
              <h3>
                📅 {i18n.language === 'de' ? 'Datum & Uhrzeit' : 'Date & Time'}
              </h3>
              <EditButton onClick={() => goToStep(1)}>
                {i18n.language === 'de' ? 'Bearbeiten' : 'Edit'}
              </EditButton>
            </CardHeader>
            <CardContent>
              <InfoRow>
                <Label>{i18n.language === 'de' ? 'Datum' : 'Date'}:</Label>
                <Value>{formatDateForLanguage(finalBookingData.date!)}</Value>
              </InfoRow>
              <InfoRow>
                <Label>{i18n.language === 'de' ? 'Uhrzeit' : 'Time'}:</Label>
                <Value>{formatTimeForLanguage(finalBookingData.timeSlot)}</Value>
              </InfoRow>
              <InfoRow>
                <Label>{i18n.language === 'de' ? 'Zeitzone' : 'Timezone'}:</Label>
                <Value>Greenwich Mean Time (GMT)</Value>
              </InfoRow>
            </CardContent>
          </ProfessionalCard>
          
          {/* Personal Info Card */}
          <ProfessionalCard>
            <CardHeader>
              <h3>
                👤 {i18n.language === 'de' ? 'Persönliche Informationen' : 'Personal Information'}
              </h3>
              <EditButton onClick={() => goToStep(2)}>
                {i18n.language === 'de' ? 'Bearbeiten' : 'Edit'}
              </EditButton>
            </CardHeader>
            <CardContent>
              <InfoRow>
                <Label>{i18n.language === 'de' ? 'Name' : 'Name'}:</Label>
                <Value>{finalBookingData.clientInfo!.firstName} {finalBookingData.clientInfo!.lastName}</Value>
              </InfoRow>
              <InfoRow>
                <Label>{i18n.language === 'de' ? 'E-Mail' : 'Email'}:</Label>
                <Value>{finalBookingData.clientInfo!.email}</Value>
              </InfoRow>
              <InfoRow>
                <Label>{i18n.language === 'de' ? 'Telefon' : 'Phone'}:</Label>
                <Value>{finalBookingData.clientInfo!.phone}</Value>
              </InfoRow>
              <InfoRow>
                <Label>{i18n.language === 'de' ? 'Fall-Typ' : 'Case Type'}:</Label>
                <Value>{getGermanCaseType(finalBookingData.clientInfo!.caseType || 'other')}</Value>
              </InfoRow>
              <InfoRow>
                <Label>{i18n.language === 'de' ? 'Bevorzugter Kontakt' : 'Preferred Contact'}:</Label>
                <Value>{getGermanContactMethod(finalBookingData.clientInfo!.preferredContactMethod || 'email')}</Value>
              </InfoRow>
            </CardContent>
          </ProfessionalCard>
        </LeftColumn>
        
        <RightColumn>
          {/* Summary Card */}
          <ProfessionalCard>
            <CardHeader>
              <h3>
                💰 {i18n.language === 'de' ? 'Investitions-Zusammenfassung' : 'Investment Summary'}
              </h3>
            </CardHeader>
            <CardContent>
              <SummaryRow>
                <Label>{i18n.language === 'de' ? 'Beratungsgebühr' : 'Consultation Fee'}:</Label>
                <FreeValue>{i18n.language === 'de' ? 'Kostenfrei' : 'Complimentary'}</FreeValue>
              </SummaryRow>
              <SummaryRow>
                <Label>{i18n.language === 'de' ? 'Dauer' : 'Duration'}:</Label>
                <Value>75 {i18n.language === 'de' ? 'Min.' : 'mins'}</Value>
              </SummaryRow>
              <SummaryDivider />
              <SummaryTotal>
                <Label>{i18n.language === 'de' ? 'Gesamtkosten' : 'Total Cost'}:</Label>
                <FreeValue>{i18n.language === 'de' ? 'KOSTENLOS' : 'FREE'}</FreeValue>
              </SummaryTotal>
              
              <div style={{ 
                background: '#f0fdf4',
                border: '1px solid #bbf7d0',
                borderRadius: '8px',
                padding: '16px',
                marginTop: '16px',
                textAlign: 'center',
                fontSize: '14px',
                color: '#166534',
                fontWeight: '500'
              }}>
                {i18n.language === 'de' ? 
                  'Die Zahlung wird nach Ihrer Beratung bearbeitet. Wir akzeptieren alle gängigen Zahlungsmethoden.' :
                  'Payment will be processed after your consultation. We accept all major payment methods.'
                }
              </div>
            </CardContent>
          </ProfessionalCard>
          
          {/* Security Card */}
          <ProfessionalCard>
            <CardHeader>
              <h3>
                🛡️ {i18n.language === 'de' ? 'Sicher & Vertraulich' : 'Secure & Confidential'}
              </h3>
            </CardHeader>
            <CardContent>
              <div style={{
                background: '#f0f9ff',
                border: '1px solid #bfdbfe',
                borderRadius: '8px',
                padding: '12px',
                marginBottom: '16px',
                textAlign: 'center',
                fontSize: '14px',
                color: '#1e40af',
                fontWeight: '600'
              }}>
                🛡️ {i18n.language === 'de' ? 'Unternehmensklasse-Sicherheit' : 'Enterprise-Grade Security'}
              </div>
              
              <SecurityItem>
                <SecurityLabel>{i18n.language === 'de' ? 'Datenschutz' : 'Data Protection'}:</SecurityLabel>
                <SecurityValue>{i18n.language === 'de' ? 'DSGVO-konform' : 'GDPR Compliant'}</SecurityValue>
              </SecurityItem>
              <SecurityItem>
                <SecurityLabel>{i18n.language === 'de' ? 'Verschlüsselung' : 'Encryption'}:</SecurityLabel>
                <SecurityValue>256-bit SSL</SecurityValue>
              </SecurityItem>
              <SecurityItem>
                <SecurityLabel>{i18n.language === 'de' ? 'Vertraulichkeit' : 'Confidentiality'}:</SecurityLabel>
                <SecurityValue>{i18n.language === 'de' ? 'Professionelle Standards' : 'Professional Standards'}</SecurityValue>
              </SecurityItem>
            </CardContent>
          </ProfessionalCard>
        </RightColumn>
      </ContentGrid>

          <ActionButtons>
            {onBack && (
          <BackButton onClick={onBack}>
            {i18n.language === 'de' ? '← Zurück' : '← Back'}
          </BackButton>
        )}
        <ConfirmButton 
              onClick={submitBooking}
              disabled={submissionState.status !== 'idle'}
            >
          ✓ {i18n.language === 'de' ? 'Buchung bestätigen' : 'Confirm Booking'}
        </ConfirmButton>
          </ActionButtons>
    </Container>
  );
};

export default ConfirmationStep; 

















