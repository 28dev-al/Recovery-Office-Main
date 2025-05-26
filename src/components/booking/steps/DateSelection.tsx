import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { PHI, PHI_INVERSE, SACRED_SPACING, FIBONACCI, SACRED_RADIUS } from '../../../constants/sacred-geometry';
import { getFibonacciByIndex } from '../../../utils/getFibonacciByIndex';

/**
 * Time slot interface
 * 
 * @interface TimeSlot
 * @property {string} id - Unique identifier for the time slot
 * @property {string} time - Display time (e.g., "10:00 AM")
 * @property {boolean} available - Whether the slot is available
 */
interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

/**
 * Props for the DateSelection component
 * 
 * @interface DateSelectionProps
 * @property {Date} selectedDate - Currently selected date
 * @property {(date: Date) => void} onDateChange - Handler for date selection
 * @property {string | null} selectedTimeSlotId - Currently selected time slot ID
 * @property {(timeSlotId: string) => void} onTimeSlotChange - Handler for time slot selection
 * @property {(date: Date) => TimeSlot[]} getAvailableTimeSlots - Function to get available time slots for a date
 */
interface DateSelectionProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  selectedTimeSlotId: string | null;
  onTimeSlotChange: (timeSlotId: string) => void;
  getAvailableTimeSlots: (date: Date) => TimeSlot[];
}

/**
 * Container for the date selection component
 * Uses sacred spacing for margins and padding
 */
const Container = styled.div`
  width: 100%;
  padding: ${SACRED_SPACING.md}px 0;
`;

/**
 * Title for the date selection section
 * Uses golden ratio for line height
 */
const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: ${SACRED_SPACING.lg}px;
  line-height: ${PHI};
  color: ${props => props.theme.colors.text.primary};
`;

/**
 * Description for the date selection section
 * Uses PHI for line height and margin calculations
 */
const SectionDescription = styled.p`
  margin-bottom: ${SACRED_SPACING.xl}px;
  line-height: ${PHI};
  color: ${props => props.theme.colors.text.secondary};
`;

/**
 * Layout grid for calendar and time slots
 * Uses golden ratio for layout proportions
 */
const DateSelectionLayout = styled.div`
  display: grid;
  grid-template-columns: ${PHI_INVERSE * 100}% ${(1 - PHI_INVERSE) * 100}%;
  gap: ${SACRED_SPACING.lg}px;
  width: 100%;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

/**
 * Calendar container
 * Uses Fibonacci spacing and golden ratio for calendar cells
 */
const CalendarContainer = styled.div`
  background-color: ${props => props.theme.colors.background[50]};
  border-radius: ${SACRED_RADIUS.md}px;
  padding: ${SACRED_SPACING.md}px;
  border: 1px solid ${props => props.theme.colors.divider};
`;

/**
 * Calendar header with month and navigation
 * Uses Fibonacci spacing
 */
const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${SACRED_SPACING.md}px;
`;

/**
 * Month display in the calendar header
 */
const CalendarMonth = styled.h3`
  font-size: 1.25rem;
  color: ${props => props.theme.colors.text.primary};
`;

/**
 * Button for calendar navigation
 * Uses Fibonacci dimensions
 */
const NavButton = styled.button`
  width: ${getFibonacciByIndex(7)}px;
  height: ${getFibonacciByIndex(7)}px;
  border-radius: 50%;
  border: 1px solid ${props => props.theme.colors.divider};
  background-color: ${props => props.theme.colors.background[50]};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ${getFibonacciByIndex(6) * 10}ms ease-in-out;
  
  &:hover {
    background-color: ${props => props.theme.colors.background[100]};
  }
`;

/**
 * Grid for weekday headers
 * Uses Fibonacci for gap and sacred spacing
 */
const WeekdayHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: ${getFibonacciByIndex(4)}px;
  margin-bottom: ${SACRED_SPACING.xs}px;
`;

/**
 * Individual weekday cell
 * Uses golden ratio for text styling
 */
const Weekday = styled.div`
  text-align: center;
  font-size: 0.875rem;
  color: ${props => props.theme.colors.text.secondary};
  padding: ${SACRED_SPACING.xxs}px;
  font-weight: 500;
`;

/**
 * Grid for calendar days
 * Uses Fibonacci for gap and dimensions
 */
const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: ${getFibonacciByIndex(4)}px;
`;

/**
 * Calendar day cell
 * Uses sacred geometry for styling and interactions
 */
interface CalendarDayProps {
  $isSelected?: boolean;
  $isToday?: boolean;
  $isCurrentMonth?: boolean;
  $isDisabled?: boolean;
}

const CalendarDay = styled.div<CalendarDayProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1;
  border-radius: ${SACRED_RADIUS.sm}px;
  cursor: ${props => props.$isDisabled ? 'not-allowed' : 'pointer'};
  font-weight: ${props => props.$isToday || props.$isSelected ? '600' : '400'};
  opacity: ${props => (props.$isCurrentMonth && !props.$isDisabled) ? 1 : 0.3};
  background-color: ${props => {
    if (props.$isSelected) return props.theme.colors.primary[200];
    if (props.$isToday) return props.theme.colors.background[100];
    return 'transparent';
  }};
  color: ${props => {
    if (props.$isSelected) return props.theme.colors.primary[700];
    if (props.$isDisabled) return props.theme.colors.text.disabled;
    return props.theme.colors.text.primary;
  }};
  border: 1px solid ${props => {
    if (props.$isSelected) return props.theme.colors.primary[500];
    if (props.$isToday) return props.theme.colors.divider;
    return 'transparent';
  }};
  transition: all ${getFibonacciByIndex(5) * 10}ms ease-in-out;
  
  &:hover {
    background-color: ${props => {
      if (props.$isDisabled) return 'transparent';
      if (props.$isSelected) return props.theme.colors.primary[200];
      return props.theme.colors.background[100];
    }};
    transform: ${props => props.$isDisabled ? 'none' : `scale(${PHI_INVERSE + 0.5})`};
  }
`;

/**
 * Time slots container
 * Uses sacred spacing and golden ratio for layout
 */
const TimeSlotsContainer = styled.div`
  background-color: ${props => props.theme.colors.background[50]};
  border-radius: ${SACRED_RADIUS.md}px;
  padding: ${SACRED_SPACING.md}px;
  border: 1px solid ${props => props.theme.colors.divider};
`;

/**
 * Time slots header
 * Uses golden ratio for typography
 */
const TimeSlotsHeader = styled.h3`
  font-size: 1.125rem;
  margin-bottom: ${SACRED_SPACING.md}px;
  color: ${props => props.theme.colors.text.primary};
  line-height: ${PHI};
`;

/**
 * Grid for time slots
 * Uses Fibonacci for spacing and grid layout
 */
const TimeSlotsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: ${SACRED_SPACING.xs}px;
`;

/**
 * Individual time slot
 * Uses sacred geometry for styling and interactions
 */
interface TimeSlotButtonProps {
  $isSelected: boolean;
  $isAvailable: boolean;
}

const TimeSlotButton = styled.button<TimeSlotButtonProps>`
  padding: ${SACRED_SPACING.xs}px;
  border-radius: ${SACRED_RADIUS.sm}px;
  background-color: ${props => {
    if (!props.$isAvailable) return props.theme.colors.background[200];
    if (props.$isSelected) return props.theme.colors.primary[200];
    return props.theme.colors.background[50];
  }};
  border: 1px solid ${props => {
    if (!props.$isAvailable) return props.theme.colors.divider;
    if (props.$isSelected) return props.theme.colors.primary[500];
    return props.theme.colors.divider;
  }};
  color: ${props => {
    if (!props.$isAvailable) return props.theme.colors.text.disabled;
    if (props.$isSelected) return props.theme.colors.primary[700];
    return props.theme.colors.text.primary;
  }};
  font-size: 0.875rem;
  cursor: ${props => props.$isAvailable ? 'pointer' : 'not-allowed'};
  transition: all ${getFibonacciByIndex(5) * 10}ms ease-in-out;
  
  &:hover {
    background-color: ${props => {
      if (!props.$isAvailable) return props.theme.colors.background[200];
      if (props.$isSelected) return props.theme.colors.primary[200];
      return props.theme.colors.background[100];
    }};
    transform: ${props => props.$isAvailable ? `translateY(-${getFibonacciByIndex(3)}px)` : 'none'};
  }
`;

/**
 * No time slots message
 * Uses golden ratio for typography
 */
const NoTimeSlotsMessage = styled.p`
  color: ${props => props.theme.colors.text.disabled};
  font-style: italic;
  line-height: ${PHI};
  text-align: center;
  padding: ${SACRED_SPACING.md}px;
`;

/**
 * DateSelection component
 * Allows users to select a date and time for their booking
 * Implements sacred geometry principles throughout
 */
const DateSelection: React.FC<DateSelectionProps> = ({
  selectedDate,
  onDateChange,
  selectedTimeSlotId,
  onTimeSlotChange,
  getAvailableTimeSlots,
}) => {
  // State for viewing month in calendar
  const [viewDate, setViewDate] = useState<Date>(selectedDate);
  
  // Get available time slots for the selected date
  const availableTimeSlots = getAvailableTimeSlots(selectedDate);
  
  // Helper functions for date calculation
  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();
  
  // Calculate calendar values
  const currentYear = viewDate.getFullYear();
  const currentMonth = viewDate.getMonth();
  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);
  
  // Current date for comparing with calendar days
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // Create calendar days
  const calendarDays = [];
  
  // Add previous month's days
  const prevMonthDays = [];
  if (firstDayOfMonth > 0) {
    const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const prevMonthYear = prevMonth === 11 ? currentYear - 1 : currentYear;
    const daysInPrevMonth = getDaysInMonth(prevMonthYear, prevMonth);
    
    for (let i = 0; i < firstDayOfMonth; i++) {
      const day = daysInPrevMonth - firstDayOfMonth + i + 1;
      prevMonthDays.push({
        date: new Date(prevMonthYear, prevMonth, day),
        isCurrentMonth: false
      });
    }
  }
  
  // Add current month's days
  const currentMonthDays = [];
  for (let i = 1; i <= daysInMonth; i++) {
    currentMonthDays.push({
      date: new Date(currentYear, currentMonth, i),
      isCurrentMonth: true
    });
  }
  
  // Add days from the next month if needed
  const totalDays = prevMonthDays.length + currentMonthDays.length;
  const nextMonthDays = [];
  const daysNeeded = 42 - totalDays; // 6 rows of 7 days
  
  if (daysNeeded > 0) {
    const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
    const nextMonthYear = nextMonth === 0 ? currentYear + 1 : currentYear;
    
    for (let i = 1; i <= daysNeeded; i++) {
      nextMonthDays.push({
        date: new Date(nextMonthYear, nextMonth, i),
        isCurrentMonth: false
      });
    }
  }
  
  // Combine all days
  calendarDays.push(...prevMonthDays, ...currentMonthDays, ...nextMonthDays);
  
  // Calendar navigation handlers
  const goToPrevMonth = () => {
    const date = new Date(viewDate);
    date.setMonth(date.getMonth() - 1);
    setViewDate(date);
  };
  
  const goToNextMonth = () => {
    const date = new Date(viewDate);
    date.setMonth(date.getMonth() + 1);
    setViewDate(date);
  };
  
  // Date selection handler
  const handleDateSelect = (date: Date) => {
    date.setHours(0, 0, 0, 0);
    onDateChange(date);
  };
  
  // Time slot selection handler
  const handleTimeSlotSelect = (timeSlotId: string) => {
    onTimeSlotChange(timeSlotId);
  };
  
  // Format month and year for display
  const formatMonthYear = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(date);
  };
  
  // Check if a date is selectable (not in the past)
  const isDateSelectable = (date: Date) => {
    return date >= today;
  };
  
  // Check if a date is the selected date
  const isDateSelected = (date: Date) => {
    return date.toDateString() === selectedDate.toDateString();
  };
  
  // Check if a date is today
  const isDateToday = (date: Date) => {
    return date.toDateString() === today.toDateString();
  };
  
  return (
    <Container>
      <SectionTitle>Choose Date & Time</SectionTitle>
      <SectionDescription>
        Select a date and time for your consultation. We'll send you a confirmation email with all the details.
      </SectionDescription>
      
      <DateSelectionLayout>
        <CalendarContainer>
          <CalendarHeader>
            <NavButton onClick={goToPrevMonth} aria-label="Previous Month">
              &lt;
            </NavButton>
            <CalendarMonth>{formatMonthYear(viewDate)}</CalendarMonth>
            <NavButton onClick={goToNextMonth} aria-label="Next Month">
              &gt;
            </NavButton>
          </CalendarHeader>
          
          <WeekdayHeader>
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <Weekday key={day}>{day}</Weekday>
            ))}
          </WeekdayHeader>
          
          <DaysGrid>
            {calendarDays.map((day, index) => (
              <CalendarDay
                key={`day-${index}`}
                $isCurrentMonth={day.isCurrentMonth}
                $isToday={isDateToday(day.date)}
                $isSelected={isDateSelected(day.date)}
                $isDisabled={!isDateSelectable(day.date)}
                onClick={() => isDateSelectable(day.date) && handleDateSelect(day.date)}
                aria-label={day.date.toLocaleDateString()}
                aria-selected={isDateSelected(day.date)}
                aria-disabled={!isDateSelectable(day.date)}
              >
                {day.date.getDate()}
              </CalendarDay>
            ))}
          </DaysGrid>
        </CalendarContainer>
        
        <TimeSlotsContainer>
          <TimeSlotsHeader>
            Available Times{selectedDate ? ` for ${selectedDate.toLocaleDateString()}` : ''}
          </TimeSlotsHeader>
          
          {availableTimeSlots.length > 0 ? (
            <TimeSlotsGrid>
              {availableTimeSlots.map(slot => (
                <TimeSlotButton
                  key={slot.id}
                  $isSelected={slot.id === selectedTimeSlotId}
                  $isAvailable={slot.available}
                  onClick={() => slot.available && handleTimeSlotSelect(slot.id)}
                  disabled={!slot.available}
                  aria-label={`Time slot at ${slot.time}`}
                  aria-pressed={slot.id === selectedTimeSlotId}
                >
                  {slot.time}
                </TimeSlotButton>
              ))}
            </TimeSlotsGrid>
          ) : (
            <NoTimeSlotsMessage>
              {selectedDate 
                ? 'No time slots available for the selected date. Please choose another date.'
                : 'Please select a date to view available times.'}
            </NoTimeSlotsMessage>
          )}
        </TimeSlotsContainer>
      </DateSelectionLayout>
    </Container>
  );
};

export default DateSelection; 














