/**
 * DateSelectionStep Component
 * 
 * Simplified appointment scheduling interface that doesn't crash.
 * Removed problematic styled-components keyframes and complex animations.
 */

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
import { useBookingState } from '../../../hooks/useBookingState';

interface DateSelectionStepProps {
  // Required props
  selectedService: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  
  // Optional callback props  
  onComplete?: () => void;
  onBack?: () => void;
  
  // Optional data props
  initialData?: {
    selectedDate?: string;
    selectedTimeSlot?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  } | any; // eslint-disable-line @typescript-eslint/no-explicit-any
  
  // Optional state props
  isLoading?: boolean;
}

// Simple styled components WITHOUT keyframes or animations
const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 32px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
`;

const Title = styled.h2`
  color: #0A214F;
  font-size: 28px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 32px;
`;

const Content = styled.div`
  display: grid;
  gap: 32px;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const Section = styled.div`
  padding: 24px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #f8f9fa;
`;

const SectionTitle = styled.h3`
  color: #0A214F;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
`;

// Simple loading without animations
const LoadingMessage = styled.div`
  text-align: center;
  padding: 40px;
  color: #6b7280;
  font-size: 16px;
`;

const TimeSlotsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 12px;
  margin-top: 16px;
`;

const TimeSlotButton = styled.button<{ selected?: boolean; available?: boolean }>`
  padding: 12px;
  border: 2px solid ${({ selected, available }) => {
    if (!available) return '#e5e7eb';
    if (selected) return '#0A214F';
    return '#d1d5db';
  }};
  background: ${({ selected, available }) => {
    if (!available) return '#f3f4f6';
    if (selected) return '#0A214F';
    return 'white';
  }};
  color: ${({ selected, available }) => {
    if (!available) return '#9ca3af';
    if (selected) return 'white';
    return '#0A214F';
  }};
  border-radius: 8px;
  cursor: ${({ available }) => available ? 'pointer' : 'not-allowed'};
  font-weight: 500;
  min-height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  /* Simple hover without complex animations */
  &:hover:not(:disabled) {
    opacity: 0.8;
  }
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid #e5e7eb;
`;

const Button = styled.button<{ variant?: 'primary' | 'outline' }>`
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  
  ${({ variant }) => variant === 'primary' ? `
    background: #0A214F;
    color: white;
    border: 2px solid #0A214F;
  ` : `
    background: transparent;
    color: #0A214F;
    border: 2px solid #0A214F;
  `}

  &:hover {
    opacity: 0.8;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const DateGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
  margin-top: 16px;
`;

const DateButton = styled.button<{ selected?: boolean }>`
  padding: 8px 4px;
  border: ${({ selected }) => selected ? '2px solid #0A214F' : '1px solid #d1d5db'};
  background: ${({ selected }) => selected ? '#0A214F' : 'white'};
  color: ${({ selected }) => selected ? 'white' : '#0A214F'};
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  min-height: 40px;
  
  &:hover {
    opacity: 0.8;
  }
`;

const SelectedServiceBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #f0f9ff;
  border: 1px solid #0ea5e9;
  padding: 8px 16px;
  border-radius: 8px;
  margin-bottom: 24px;
  font-size: 14px;
  color: #0369a1;
  justify-content: center;
`;

export const DateSelectionStep: React.FC<DateSelectionStepProps> = ({
  onComplete,
  onBack,
  selectedService,
  initialData,
  isLoading = false
}) => {
  // CRITICAL FIX: Use the global booking state
  const {
    selectedDate: globalSelectedDate,
    selectedTimeSlot: globalSelectedTimeSlot,
    setSelectedDate: setGlobalSelectedDate,
    setSelectedTimeSlot: setGlobalSelectedTimeSlot
  } = useBookingState();

  // Helper functions to get initial values from props or global state
  const getInitialDate = () => {
    if (globalSelectedDate) return new Date(globalSelectedDate);
    const dateValue = initialData?.selectedDate;
    return dateValue ? new Date(dateValue) : null;
  };

  const getInitialTimeSlot = () => {
    return globalSelectedTimeSlot || initialData?.selectedTimeSlot || null;
  };

  // Initialize local state with global state or fallbacks
  const [selectedDate, setSelectedDate] = useState<Date | null>(getInitialDate());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(getInitialTimeSlot());
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [timeSlots, setTimeSlots] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Get current service
  const currentService = selectedService || {
    name: 'Financial Recovery Consultation',
    duration: 60
  };

  // Simple date selection (today + next 30 days, excluding weekends)
  const availableDates = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i + 1);
    return date;
  }).filter(date => {
    // Only weekdays
    const dayOfWeek = date.getDay();
    return dayOfWeek !== 0 && dayOfWeek !== 6;
  });

  // Load time slots when date selected
  useEffect(() => {
    if (selectedDate) {
      console.log('[DateSelection] Loading slots for:', format(selectedDate, 'yyyy-MM-dd'));
      setLoading(true);
      setSelectedTimeSlot(null); // Reset time slot

      // Simple timeout to simulate API call - no complex API calls that can fail
      setTimeout(() => {
        const businessHours = [
          '09:00-10:00', '10:00-11:00', '11:00-12:00',
          '14:00-15:00', '15:00-16:00', '16:00-17:00'
        ];
        
        const slots = businessHours.map((time, index) => ({
          id: `slot-${index}`,
          time,
          available: Math.random() > 0.3, // Random availability for demo
          expert: index % 2 === 0 ? 'Dr. Sarah Mitchell' : 'Dr. Michael Chen',
          type: 'Initial Consultation'
        }));
        
        console.log('[DateSelection] Generated slots:', slots.length);
        setTimeSlots(slots);
        setLoading(false);
      }, 800);
    } else {
      setTimeSlots([]);
      setLoading(false);
    }
  }, [selectedDate]);

  // Show loading state if isLoading prop is true (after all hooks)
  if (isLoading) {
    return (
      <Container>
        <LoadingMessage>Loading available dates and times...</LoadingMessage>
      </Container>
    );
  }

  const handleDateSelect = (date: Date) => {
    const dateString = format(date, 'yyyy-MM-dd');
    console.log('[DateSelection] Date selected:', dateString);
    setSelectedDate(date);
    
    // CRITICAL: Save to global state immediately
    setGlobalSelectedDate(dateString);
  };

  const handleTimeSlotSelect = (timeSlot: string) => {
    console.log('[DateSelection] Time slot selected:', timeSlot);
    setSelectedTimeSlot(timeSlot);
    
    // CRITICAL: Save to global state immediately
    setGlobalSelectedTimeSlot(timeSlot);
  };

  // Handle the case where onComplete might not be provided
  const handleContinue = () => {
    if (selectedDate && selectedTimeSlot) {
      const stepData = {
        selectedDate: format(selectedDate, 'yyyy-MM-dd'),
        selectedTimeSlot: selectedTimeSlot,
        service: currentService
      };
      
      console.log('[DateSelection] Completing with data:', stepData);
      
      // Double-check global state is saved before proceeding
      console.log('[DateSelection] Global state before next:', {
        savedDate: globalSelectedDate,
        savedTimeSlot: globalSelectedTimeSlot
      });
      
      // Call onComplete if provided
      onComplete?.();
    }
  };

  const isDateSelected = (date: Date): boolean => {
    return selectedDate !== null && format(selectedDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd');
  };

  console.log('[DateSelection] Render - Service:', currentService?.name, 'Date:', selectedDate, 'Slot:', selectedTimeSlot);

  return (
    <Container>
      <Title>Choose Your Consultation Date & Time</Title>
      
      {currentService && (
        <SelectedServiceBadge>
          ✓ {currentService.name} - {currentService.duration} minutes
        </SelectedServiceBadge>
      )}

      <Content>
        <Section>
          <SectionTitle>Select Date</SectionTitle>
          <DateGrid>
            {availableDates.slice(0, 14).map(date => (
              <DateButton
                key={date.toISOString()}
                selected={isDateSelected(date)}
                onClick={() => handleDateSelect(date)}
                title={format(date, 'EEEE, MMMM do, yyyy')}
              >
                {format(date, 'MMM d')}
              </DateButton>
            ))}
          </DateGrid>
        </Section>

        <Section>
          <SectionTitle>Available Times</SectionTitle>
          {!selectedDate && (
            <div style={{ textAlign: 'center', color: '#6b7280', padding: '40px 0' }}>
              Please select a date first
            </div>
          )}
          
          {selectedDate && loading && (
            <LoadingMessage>Loading available times for {format(selectedDate, 'EEEE, MMMM do')}...</LoadingMessage>
          )}
          
          {selectedDate && !loading && timeSlots.length === 0 && (
            <div style={{ textAlign: 'center', color: '#6b7280', padding: '40px 0' }}>
              No available times for this date
            </div>
          )}
          
          {selectedDate && !loading && timeSlots.length > 0 && (
            <TimeSlotsGrid>
              {timeSlots.map(slot => (
                <TimeSlotButton
                  key={slot.id}
                  selected={selectedTimeSlot === slot.time}
                  available={slot.available}
                  disabled={!slot.available}
                  onClick={() => slot.available && handleTimeSlotSelect(slot.time)}
                  title={slot.available ? `Available with ${slot.expert}` : 'Not available'}
                >
                  <div style={{ fontWeight: 'bold' }}>{slot.time}</div>
                  <div style={{ fontSize: '12px', marginTop: '4px' }}>
                    {slot.available ? slot.expert : 'Unavailable'}
                  </div>
                </TimeSlotButton>
              ))}
            </TimeSlotsGrid>
          )}
        </Section>
      </Content>

      <Actions>
        {onBack && (
          <Button variant="outline" onClick={onBack}>
            Back
          </Button>
        )}
        
        <Button 
          variant="primary" 
          onClick={handleContinue}
          disabled={!selectedDate || !selectedTimeSlot}
        >
          Continue
        </Button>
      </Actions>

      {/* Debug info */}
      {process.env.NODE_ENV === 'development' && (
        <div style={{ 
          marginTop: '24px', 
          padding: '12px', 
          background: '#f3f4f6', 
          borderRadius: '6px', 
          fontSize: '12px',
          color: '#6b7280'
        }}>
          Debug: Date={selectedDate ? format(selectedDate, 'yyyy-MM-dd') : 'none'} | 
          Slot={selectedTimeSlot || 'none'} | 
          Slots={timeSlots.length} | 
          Loading={loading.toString()} |
          IsLoading={isLoading.toString()} |
          HasInitialData={!!initialData}
        </div>
      )}
    </Container>
  );
};

export default DateSelectionStep; 
















