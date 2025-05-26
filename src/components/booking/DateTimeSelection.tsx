import * as React from 'react';
import { useBooking } from '../../context/BookingContext';

import styled from 'styled-components';
import { format, addDays, isSameDay, startOfDay, addMinutes, parseISO } from 'date-fns';
import { getFibonacciByIndex } from '../../utils/getFibonacciByIndex';
import { PHI } from '../../constants/sacred-geometry';
import { useState } from 'react';
import { RecoveryOfficeTheme } from '../../design-system/types/theme.types';
import { BookingTimeSlot } from '../../types/booking.types';

// Styled components using sacred geometry principles
const Container = styled.div`
  width: 100%;
  max-width: ${getFibonacciByIndex(12)}px;
  margin: 0 auto;
`;

const CalendarContainer = styled.div`
  margin-bottom: ${getFibonacciByIndex(7)}px;
`;

const WeekContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: ${getFibonacciByIndex(4)}px;
  margin-bottom: ${getFibonacciByIndex(6)}px;
`;

const DayButton = styled.button<{ isSelected: boolean; isAvailable: boolean }>`
  height: ${getFibonacciByIndex(8)}px;
  border-radius: ${getFibonacciByIndex(4)}px;
  border: 1px solid ${(props: { isSelected: boolean; theme: RecoveryOfficeTheme }) => 
    props.isSelected ? props.theme.colors.primary[500] : props.theme.colors.border.main};
  background-color: ${(props: { isSelected: boolean; isAvailable: boolean; theme: RecoveryOfficeTheme }) => {
    if (props.isSelected) return props.theme.colors.primary[100];
    if (!props.isAvailable) return props.theme.colors.background[200];
    return props.theme.colors.background[100];
  }};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: ${(props: { isAvailable: boolean }) => props.isAvailable ? 'pointer' : 'not-allowed'};
  transition: all ${getFibonacciByIndex(5) * 10}ms ease-in-out;
  padding: ${getFibonacciByIndex(4)}px;
  
  &:hover {
    transform: ${(props: { isAvailable: boolean }) => props.isAvailable ? `scale(${1 + (1 / PHI) * 0.05})` : 'none'};
    box-shadow: ${(props: { isAvailable: boolean }) => props.isAvailable ? 
      `0 ${getFibonacciByIndex(3)}px ${getFibonacciByIndex(5)}px rgba(0, 0, 0, 0.1)` : 'none'};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const DayName = styled.span`
  font-size: ${getFibonacciByIndex(4)}px;
  margin-bottom: ${getFibonacciByIndex(2)}px;
  color: ${({ theme }: { theme: RecoveryOfficeTheme }) => theme.colors.text.secondary};
`;

const DayNumber = styled.span`
  font-size: ${getFibonacciByIndex(5)}px;
  font-weight: bold;
  color: ${({ theme }: { theme: RecoveryOfficeTheme }) => theme.colors.text.primary};
`;

const TimeSlotsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(${getFibonacciByIndex(8)}px, 1fr));
  gap: ${getFibonacciByIndex(5)}px;
  margin-bottom: ${getFibonacciByIndex(7)}px;
`;

const TimeSlot = styled.button<{ isSelected: boolean }>`
  padding: ${getFibonacciByIndex(5)}px;
  border-radius: ${getFibonacciByIndex(4)}px;
  border: 1px solid ${(props: { isSelected: boolean; theme: RecoveryOfficeTheme }) => 
    props.isSelected ? props.theme.colors.primary[500] : props.theme.colors.border.main};
  background-color: ${(props: { isSelected: boolean; theme: RecoveryOfficeTheme }) => 
    props.isSelected ? props.theme.colors.primary[100] : props.theme.colors.background[100]};
  cursor: pointer;
  transition: all ${getFibonacciByIndex(5) * 10}ms ease-in-out;
  
  &:hover {
    transform: scale(${1 + (1 / PHI) * 0.05});
    box-shadow: 0 ${getFibonacciByIndex(3)}px ${getFibonacciByIndex(5)}px rgba(0, 0, 0, 0.1);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TimeText = styled.span`
  font-size: ${getFibonacciByIndex(5)}px;
  color: ${({ theme }: { theme: RecoveryOfficeTheme }) => theme.colors.text.primary};
`;

const NavigationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${getFibonacciByIndex(6)}px;
`;

const NavigationButton = styled.button`
  padding: ${getFibonacciByIndex(4)}px ${getFibonacciByIndex(6)}px;
  background-color: ${({ theme }: { theme: RecoveryOfficeTheme }) => theme.colors.background[100]};
  border: 1px solid ${({ theme }: { theme: RecoveryOfficeTheme }) => theme.colors.border.main};
  border-radius: ${getFibonacciByIndex(3)}px;
  cursor: pointer;
  transition: all ${getFibonacciByIndex(5) * 10}ms ease;
  
  &:hover {
    background-color: ${({ theme }: { theme: RecoveryOfficeTheme }) => theme.colors.background[200]};
  }
`;

const ActionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${getFibonacciByIndex(7)}px;
`;

const Button = styled.button<{ isPrimary?: boolean }>`
  padding: ${getFibonacciByIndex(4)}px ${getFibonacciByIndex(6)}px;
  background-color: ${(props: { isPrimary?: boolean; theme: RecoveryOfficeTheme }) => 
    props.isPrimary ? props.theme.colors.primary[500] : props.theme.colors.background[100]};
  color: ${(props: { isPrimary?: boolean; theme: RecoveryOfficeTheme }) => 
    props.isPrimary ? 'white' : props.theme.colors.text.primary};
  border: 1px solid ${(props: { isPrimary?: boolean; theme: RecoveryOfficeTheme }) => 
    props.isPrimary ? props.theme.colors.primary[500] : props.theme.colors.border.main};
  border-radius: ${getFibonacciByIndex(3)}px;
  font-size: ${getFibonacciByIndex(5)}px;
  cursor: pointer;
  transition: all ${getFibonacciByIndex(5) * 10}ms ease;
  
  &:hover {
    background-color: ${(props: { isPrimary?: boolean; theme: RecoveryOfficeTheme }) => 
      props.isPrimary ? props.theme.colors.primary[700] : props.theme.colors.background[200]};
  }
  
  &:disabled {
    background-color: ${({ theme }: { theme: RecoveryOfficeTheme }) => theme.colors.text.disabled};
    border-color: ${({ theme }: { theme: RecoveryOfficeTheme }) => theme.colors.text.disabled};
    cursor: not-allowed;
  }
`;

// Generate mock time slots for a given date
const generateMockTimeSlots = (selectedDate: string, serviceDuration: number = 60): BookingTimeSlot[] => {
  const slots: BookingTimeSlot[] = [];
  const startTime = 9; // 9 AM
  const endTime = 17; // 5 PM
  
  const dateObj = parseISO(selectedDate);
  const startOfSelectedDay = startOfDay(dateObj);
  
  // Generate time slots every 'serviceDuration' minutes
  for (let hour = startTime; hour < endTime; hour++) {
    for (let minute = 0; minute < 60; minute += serviceDuration) {
      // Skip some slots randomly to simulate unavailability
      if (Math.random() > 0.3) {
        const start = addMinutes(startOfSelectedDay, hour * 60 + minute);
        const end = addMinutes(start, serviceDuration);
        
        slots.push({
          id: `slot-${hour}-${minute}`,
          startTime: start.toISOString(),
          endTime: end.toISOString(),
          duration: serviceDuration,
          available: true
        });
      }
    }
  }
  
  return slots;
};

const DateTimeSelection: React.FC = () => {
  const { 
    selectedService, 
    selectedDate, 
    setSelectedDate, 
    selectedTime, 
    setSelectedTime, 
    currentStep, 
    setCurrentStep 
  } = useBooking();
  
  const [availableDates, setAvailableDates] = React.useState<string[]>([]);
  const [availableTimeSlots, setAvailableTimeSlots] = useState<BookingTimeSlot[]>([]);
  const [weekStart, setWeekStart] = useState<Date>(new Date());
  
  // Generate available dates for the next 14 days
  React.useEffect(() => {
    const dates: string[] = [];
    const today = new Date();
    
    for (let i = 0; i < 14; i++) {
      // Skip weekends for this example
      const day = addDays(today, i);
      const dayOfWeek = day.getDay();
      
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        dates.push(day.toISOString().split('T')[0]);
      }
    }
    
    setAvailableDates(dates);
  }, []);
  
  // Generate time slots when a date is selected
  React.useEffect(() => {
    if (selectedDate && selectedService) {
      const slots = generateMockTimeSlots(selectedDate, selectedService.duration);
      setAvailableTimeSlots(slots);
    } else {
      setAvailableTimeSlots([]);
    }
  }, [selectedDate, selectedService]);
  
  // Navigate to next week
  const handleNextWeek = () => {
    setWeekStart(addDays(weekStart, 7));
  };
  
  // Navigate to previous week
  const handlePrevWeek = () => {
    const today = new Date();
    const newStart = addDays(weekStart, -7);
    
    // Don't allow navigating to past weeks
    if (newStart >= today) {
      setWeekStart(newStart);
    } else {
      setWeekStart(today);
    }
  };
  
  // Get the visible days for the current week view
  const visibleDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  
  const handleDateSelection = (date: Date) => {
    const formattedDate = date.toISOString().split('T')[0];
    setSelectedDate(formattedDate);
    setSelectedTime(''); // Reset time when date changes
  };
  
  const handleTimeSelection = (time: BookingTimeSlot) => {
    setSelectedTime(time.startTime);
  };
  
  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };
  
  const handleContinue = () => {
    if (selectedDate && selectedTime) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const isDayAvailable = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return availableDates.includes(dateString);
  };
  
  return (
    <Container>
      <h2>Select Date & Time</h2>
      
      <CalendarContainer>
        <NavigationContainer>
          <NavigationButton onClick={handlePrevWeek}>Previous Week</NavigationButton>
          <span>{format(weekStart, 'MMMM yyyy')}</span>
          <NavigationButton onClick={handleNextWeek}>Next Week</NavigationButton>
        </NavigationContainer>
        
        <WeekContainer>
          {visibleDays.map(date => {
            const available = isDayAvailable(date);
            const isSelected = selectedDate ? isSameDay(date, parseISO(selectedDate)) : false;
            
            return (
              <DayButton 
                key={date.toISOString()}
                isSelected={isSelected}
                isAvailable={available}
                onClick={() => available && handleDateSelection(date)}
                disabled={!available}
              >
                <DayName>{format(date, 'EEE')}</DayName>
                <DayNumber>{format(date, 'd')}</DayNumber>
              </DayButton>
            );
          })}
        </WeekContainer>
      </CalendarContainer>
      
      {selectedDate && (
        <>
          <h3>Available Times for {format(parseISO(selectedDate), 'MMMM d, yyyy')}</h3>
          {availableTimeSlots.length > 0 ? (
            <TimeSlotsContainer>
              {availableTimeSlots.map(time => (
                <TimeSlot 
                  key={time.id}
                  isSelected={selectedTime === time.startTime}
                  onClick={() => handleTimeSelection(time)}
                >
                  <TimeText>{format(parseISO(time.startTime), 'h:mm a')}</TimeText>
                </TimeSlot>
              ))}
            </TimeSlotsContainer>
          ) : (
            <p>No available time slots for this date. Please select another date.</p>
          )}
        </>
      )}
      
      <ActionContainer>
        <Button onClick={handleBack}>Back</Button>
        <Button 
          isPrimary 
          onClick={handleContinue}
          disabled={!selectedDate || !selectedTime}
        >
          Continue
        </Button>
      </ActionContainer>
    </Container>
  );
};

export default DateTimeSelection; 
















