// TODO: This file contains direct document access without SSR checks
/**
 * DatePicker Component
 * 
 * A date selection component that implements sacred geometry principles
 * for calendar layout, proportions, and visual harmony.
 * 
 * The DatePicker creates a harmonious calendar interface using 
 * Golden Ratio and Fibonacci-based measurements for optimal visual balance.
 */

import * as React from 'react';
import { useState, useEffect, useMemo, useRef, useCallback } from 'react';;
import styled from 'styled-components';
import { DefaultTheme } from 'styled-components';
import { Box, Flex, Grid } from '../layout';
import { Typography, Text } from '../typography';
import { Button } from '../button';
import { Input } from './Input';
import { 
  PHI, 
  PHI_INVERSE, 
  FIBONACCI, 
  GOLDEN_SECTIONS,
  SACRED_EASINGS 
} from '../../../constants/sacred-geometry';
import { DatePickerProps } from '../../types';
import { FadeIn, SlideIn } from '../animation';
import { getFibonacciByIndex } from '../../../utils/getFibonacciByIndex';

// Constants for sacred geometry calendar
const DAYS_IN_WEEK = 7;
const FIBONACCI_8 = getFibonacciByIndex(8); // 21
const FIBONACCI_7 = getFibonacciByIndex(7); // 13

// Helper functions for date manipulation
const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

const getFirstDayOfMonth = (year: number, month: number): number => {
  return new Date(year, month, 1).getDay();
};

// Format date to string based on format pattern
const formatDate = (date: Date, format: string = 'MM/dd/yyyy'): string => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString();
  const yearShort = year.slice(-2);
  
  let result = format;
  result = result.replace(/dd/g, day);
  result = result.replace(/MM/g, month);
  result = result.replace(/yyyy/g, year);
  result = result.replace(/yy/g, yearShort);
  
  return result;
};

// Parse string to date
const parseDate = (dateString: string, format: string = 'MM/dd/yyyy'): Date | null => {
  if (!dateString) return null;
  
  try {
    const parts = dateString.split(/[/.-]/);
    const formatParts = format.split(/[/.-]/);
    
    const dayIndex = formatParts.findIndex(part => part.includes('d'));
    const monthIndex = formatParts.findIndex(part => part.includes('M'));
    const yearIndex = formatParts.findIndex(part => part.includes('y'));
    
    if (dayIndex === -1 || monthIndex === -1 || yearIndex === -1) {
      return null;
    }
    
    const day = parseInt(parts[dayIndex] || '1', 10);
    const month = parseInt(parts[monthIndex] || '1', 10) - 1; // JavaScript months are 0-indexed
    const year = parseInt(parts[yearIndex] || '2000', 10);
    
    const date = new Date(year, month, day);
    if (isNaN(date.getTime())) {
      return null;
    }
    
    return date;
  } catch (error) {
    return null;
  }
};

// Size-specific styles using sacred geometry
const getSizeStyles = (size: 'sm' | 'md' | 'lg', theme: DefaultTheme) => {
  switch (size) {
    case 'sm':
      return {
        fontSize: theme.typography.fontSize.sm,
        daySize: getFibonacciByIndex(6), // 8px
        spacing: theme.spacing.xs,
        calendarWidth: getFibonacciByIndex(10) * PHI, // ~890px
      };
    case 'lg':
      return {
        fontSize: theme.typography.fontSize.md,
        daySize: getFibonacciByIndex(8), // 21px
        spacing: theme.spacing.md,
        calendarWidth: getFibonacciByIndex(11) * PHI, // ~1450px
      };
    case 'md':
    default:
      return {
        fontSize: theme.typography.fontSize.base,
        daySize: getFibonacciByIndex(7), // 13px
        spacing: theme.spacing.sm,
        calendarWidth: getFibonacciByIndex(10), // 55px
      };
  }
};

// Styled components for the calendar UI
const CalendarContainer = styled(Box)<{
  componentSize?: 'sm' | 'md' | 'lg';
}>`
  position: absolute;
  z-index: 10;
  margin-top: 8px;
  background-color: ${props => props.theme.colors.background[50] ?? 1};
  border-radius: ${props => props.theme.radius.md}px;
  box-shadow: ${props => props.theme.shadows.md};
  overflow: hidden;
  width: ${props => getSizeStyles(props.componentSize || 'md', props.theme).calendarWidth}px;
  border: 1px solid ${props => props.theme.colors.background[200] ?? 1};
`;

const CalendarHeader = styled(Flex)`
  padding: ${props => props.theme.spacing.sm}px;
  border-bottom: 1px solid ${props => props.theme.colors.background[200] ?? 1};
  justify-content: space-between;
  align-items: center;
`;

const CalendarGrid = styled(Grid)<{
  componentSize?: 'sm' | 'md' | 'lg';
}>`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: ${props => props.theme.spacing.xs}px;
  padding: ${props => props.theme.spacing.sm}px;
`;

const DayCell = styled(Box)<{
  isToday?: boolean;
  isSelected?: boolean;
  isDisabled?: boolean;
  inCurrentMonth?: boolean;
  componentSize?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${props => props.isDisabled ? 'not-allowed' : 'pointer'};
  border-radius: ${props => props.theme.radius.sm}px;
  opacity: ${props => {
    if (props.isDisabled) return PHI_INVERSE * PHI_INVERSE; // ~0.38
    if (!props.inCurrentMonth) return PHI_INVERSE; // ~0.618
    return 1;
  }};
  
  /* Size based on Fibonacci */
  ${props => {
    const sizeStyles = getSizeStyles(props.componentSize || 'md', props.theme);
    const cellSize = sizeStyles.daySize * PHI; // Apply golden ratio
    return `
      width: ${cellSize}px;
      height: ${cellSize}px;
      font-size: ${sizeStyles.fontSize}px;
    `;
  }}
  
  /* States */
  ${props => props.isToday && !props.isSelected && `
    border: 1px solid ${props.theme.colors.primary[400] ?? 1};
  `}
  
  ${props => props.isSelected && `
    background-color: ${props.theme.colors.primary[500] ?? 1};
    color: ${props.theme.colors.text.light};
  `}
  
  ${props => !props.isDisabled && !props.isSelected && `
    &:hover {
      background-color: ${props.theme.colors.primary[100] ?? 1};
    }
  `}
  
  transition: all 0.2s cubic-bezier(${props => SACRED_EASINGS.standard.join(', ')});
`;

const DayHeader = styled(Text)<{
  componentSize?: 'sm' | 'md' | 'lg';
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  color: ${props => props.theme.colors.text.secondary};
  
  /* Size based on Fibonacci */
  ${props => {
    const sizeStyles = getSizeStyles(props.componentSize || 'md', props.theme);
    const cellSize = sizeStyles.daySize * PHI; // Apply golden ratio
    return `
      width: ${cellSize}px;
      height: ${cellSize}px;
      font-size: ${sizeStyles.fontSize}px;
    `;
  }}
`;

const MonthYearSelector = styled(Flex)`
  gap: ${props => props.theme.spacing.sm}px;
`;

/**
 * DatePicker Component with ref forwarding
 * 
 * Creates a date input with dropdown calendar using sacred geometry principles
 */
export const DatePicker = React.forwardRef<HTMLInputElement, DatePickerProps>(
  ({
    id,
    name,
    value,
    defaultValue,
    onChange,
    minDate,
    maxDate,
    dateFormat = 'MM/dd/yyyy',
    size = 'md',
    placeholder = 'Select a date',
    disabled = false,
    readOnly = false,
    required = false,
    isInvalid = false,
    isValidating = false,
    useSacredGeometry = true,
    ...rest
  }, ref) => {
    // State for calendar visibility
    const [isOpen, setIsOpen] = useState(false);
    
    // State for current month and year displayed in calendar
    const [currentMonth, setCurrentMonth] = useState(
      value ? value.getMonth() : defaultValue ? defaultValue.getMonth() : new Date().getMonth()
    );
    const [currentYear, setCurrentYear] = useState(
      value ? value.getFullYear() : defaultValue ? defaultValue.getFullYear() : new Date().getFullYear()
    );
    
    // State for input value
    const [inputValue, setInputValue] = useState(
      value ? formatDate(value, dateFormat) : 
      defaultValue ? formatDate(defaultValue, dateFormat) : ''
    );
    
    // State for selected date
    const [selectedDate, setSelectedDate] = useState<Date | null>(
      value || defaultValue || null
    );
    
    // References
    const inputRef = useRef<HTMLInputElement>(null);
    const calendarRef = useRef<HTMLDivElement>(null);
    
    // Update input value when value prop changes
    useEffect(() => {
      if (value) {
        setSelectedDate(value);
        setInputValue(formatDate(value, dateFormat));
        setCurrentMonth(value.getMonth());
        setCurrentYear(value.getFullYear());
      }
    }, [value, dateFormat]);
    
    // Close calendar when clicking outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          calendarRef.current && 
          !calendarRef.current.contains(event.target as Node) &&
          inputRef.current && 
          !inputRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };
      
      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
      }
      
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [isOpen]);
    
    // Handle date selection
    const handleSelectDate = (date: Date) => {
      setSelectedDate(date);
      setInputValue(formatDate(date, dateFormat));
      setIsOpen(false);
      
      if (onChange) {
        onChange(date);
      }
      
      // Focus back on input after selection
      if (inputRef.current) {
        inputRef.current.focus();
      }
    };
    
    // Handle manual input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInputValue(newValue);
      
      // Try to parse the input as a date
      const parsedDate = parseDate(newValue, dateFormat);
      if (parsedDate) {
        setSelectedDate(parsedDate);
        setCurrentMonth(parsedDate.getMonth());
        setCurrentYear(parsedDate.getFullYear());
        
        if (onChange) {
          onChange(parsedDate);
        }
      } else {
        setSelectedDate(null);
      }
    };
    
    // Toggle calendar on input focus
    const handleInputFocus = () => {
      if (!disabled && !readOnly) {
        setIsOpen(true);
      }
    };
    
    // Navigate to previous month
    const goToPreviousMonth = () => {
      setCurrentMonth(prevMonth => {
        if (prevMonth === 0) {
          setCurrentYear(prevYear => prevYear - 1);
          return 11;
        }
        return prevMonth - 1;
      });
    };
    
    // Navigate to next month
    const goToNextMonth = () => {
      setCurrentMonth(prevMonth => {
        if (prevMonth === 11) {
          setCurrentYear(prevYear => prevYear + 1);
          return 0;
        }
        return prevMonth + 1;
      });
    };
    
    // Render the days of the week headers
    const renderDaysOfWeek = () => {
      const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
      return dayNames.map((day, index) => (
        <DayHeader key={index} componentSize={size}>
          {day}
        </DayHeader>
      ));
    };
    
    // Render the calendar days
    const renderDays = () => {
      const daysInMonth = getDaysInMonth(currentYear, currentMonth);
      const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);
      
      // Get days from previous month to fill the first week
      const daysFromPrevMonth = firstDayOfMonth;
      const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
      const prevMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
      const daysInPrevMonth = getDaysInMonth(prevMonthYear, prevMonth);
      
      // Get days for next month to fill the last week
      const totalDaysToShow = Math.ceil((daysInMonth + firstDayOfMonth) / 7) * 7;
      const daysFromNextMonth = totalDaysToShow - daysInMonth - daysFromPrevMonth;
      
      const days: React.ReactNode[] = [];
      
      // Add days from previous month
      for (let i = daysInPrevMonth - daysFromPrevMonth + 1; i <= daysInPrevMonth; i++) {
        const date = new Date(prevMonthYear, prevMonth, i);
        const isDisabled = (
          (minDate && date < new Date(minDate.setHours(0, 0, 0, 0))) ||
          (maxDate && date > new Date(maxDate.setHours(23, 59, 59, 999)))
        );
        
        days.push(
          <DayCell
            key={`prev-${i}`}
            componentSize={size}
            inCurrentMonth={false}
            isDisabled={isDisabled}
            onClick={() => !isDisabled && handleSelectDate(date)}
          >
            {i}
          </DayCell>
        );
      }
      
      // Add days from current month
      const today = new Date();
      const isToday = (date: Date) => 
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear();
      
      const isSelected = (date: Date): boolean => {
        return selectedDate !== null &&
          date.getDate() === selectedDate.getDate() &&
          date.getMonth() === selectedDate.getMonth() &&
          date.getFullYear() === selectedDate.getFullYear();
      };
      
      for (let i = 1; i <= daysInMonth; i++) {
        const date = new Date(currentYear, currentMonth, i);
        const disabled = (
          (minDate && date < new Date(minDate.setHours(0, 0, 0, 0))) ||
          (maxDate && date > new Date(maxDate.setHours(23, 59, 59, 999)))
        );
        
        days.push(
          <DayCell
            key={i}
            componentSize={size}
            inCurrentMonth={true}
            isToday={isToday(date)}
            isSelected={isSelected(date)}
            isDisabled={disabled}
            onClick={() => !disabled && handleSelectDate(date)}
          >
            {i}
          </DayCell>
        );
      }
      
      // Add days from next month
      const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
      const nextMonthYear = currentMonth === 11 ? currentYear + 1 : currentYear;
      
      for (let i = 1; i <= daysFromNextMonth; i++) {
        const date = new Date(nextMonthYear, nextMonth, i);
        const isDisabled = (
          (minDate && date < new Date(minDate.setHours(0, 0, 0, 0))) ||
          (maxDate && date > new Date(maxDate.setHours(23, 59, 59, 999)))
        );
        
        days.push(
          <DayCell
            key={`next-${i}`}
            componentSize={size}
            inCurrentMonth={false}
            isDisabled={isDisabled}
            onClick={() => !isDisabled && handleSelectDate(date)}
          >
            {i}
          </DayCell>
        );
      }
      
      return days;
    };
    
    // Get month name by index
    const getMonthName = (month: number): string => {
      const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
      return monthNames[month] || 'January'; // Use 'January' as fallback instead of 1
    };
    
    // Combine the ref with the internal ref
    const combinedRef = useCallback((node: HTMLInputElement) => {
      if (node) {
        // Use type assertion to handle the read-only property
        (inputRef as React.MutableRefObject<HTMLInputElement | null>).current = node;
        
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
        }
      }
    }, [ref]);
    
    return (
      <Box position="relative">
        <Input
          id={id}
          name={name}
          value={inputValue}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          isInvalid={isInvalid}
          isValidating={isValidating}
          size={size}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          ref={combinedRef}
          {...rest}
        />
        
        {isOpen && !disabled && !readOnly && (
          <FadeIn isVisible={isOpen} duration={0.2}>
            <CalendarContainer ref={calendarRef} componentSize={size}>
              <CalendarHeader>
                                <Button                   variant="ghost"                   size="sm"                   onClick={goToPreviousMonth}                  aria-label="Previous month"                >                  &lt;                </Button>
                
                <MonthYearSelector>
                  <Text>{getMonthName(currentMonth)}</Text>
                  <Text>{currentYear}</Text>
                </MonthYearSelector>
                
                                <Button                   variant="ghost"                   size="sm"                   onClick={goToNextMonth}                  aria-label="Next month"                >                  &gt;                </Button>
              </CalendarHeader>
              
              <CalendarGrid componentSize={size}>
                {renderDaysOfWeek()}
                {renderDays()}
              </CalendarGrid>
            </CalendarContainer>
          </FadeIn>
        )}
      </Box>
    );
  }
);

DatePicker.displayName = 'DatePicker';

export default DatePicker; 









