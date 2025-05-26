// TODO: This file contains direct document access without SSR checks
/**
 * TimePicker Component
 * 
 * A time selection component that implements sacred geometry principles
 * for visual proportions, harmony and balance.
 * 
 * The TimePicker uses the Golden Ratio and Fibonacci numbers to create
 * a harmonious time selection interface with optimal visual balance.
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
  SACRED_EASINGS 
} from '../../../constants/sacred-geometry';
import { TimePickerProps } from '../../types';
import { FadeIn, SlideIn } from '../animation';
import { getFibonacciByIndex } from '../../../utils/getFibonacciByIndex';

// Helper functions for time manipulation
const formatTime = (hours: number, minutes: number, use24Hour: boolean = false): string => {
  const formattedHours = use24Hour ? 
    hours.toString().padStart(2, '0') : 
    (hours % 12 || 12).toString().padStart(2, '0');
    
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const period = use24Hour ? '' : (hours >= 12 ? ' PM' : ' AM');
  
  return `${formattedHours}:${formattedMinutes}${period}`;
};

const parseTime = (timeString: string, use24Hour: boolean = false): { hours: number, minutes: number } | null => {
  if (!timeString) return null;
  
  // Try parsing time in hh:mm format (with optional AM/PM)
  const timeRegex = use24Hour ? 
    /^(\d{1,2}):(\d{2})$/ : 
    /^(\d{1,2}):(\d{2})\s*(AM|PM)?$/i;
    
  const match = timeString.match(timeRegex);
  
  if (match) {
    let hours = parseInt(match[1] || '0', 10);
    const minutes = parseInt(match[2] || '0', 10);
    const rawPeriod = match[3] || '';
    const period = rawPeriod.toUpperCase();
    
    // Handle 12-hour format
    if (!use24Hour && period) {
      if (period === 'PM' && hours < 12) {
        hours += 12;
      } else if (period === 'AM' && hours === 12) {
        hours = 0;
      }
    }
    
    // Validate hours and minutes
    if (
      (use24Hour && (hours >= 0 && hours < 24)) || 
      (!use24Hour && (hours >= 0 && hours < 24)) &&
      (minutes >= 0 && minutes < 60)
    ) {
      return { hours, minutes };
    }
  }
  
  return null;
};

// Size-specific styles using sacred geometry
const getSizeStyles = (size: 'sm' | 'md' | 'lg', theme: DefaultTheme) => {
  switch (size) {
    case 'sm':
      return {
        fontSize: theme.typography.fontSize.sm,
        cellSize: getFibonacciByIndex(6), // 8px
        spacing: theme.spacing.xs,
        pickerWidth: getFibonacciByIndex(9) * PHI, // ~144px
      };
    case 'lg':
      return {
        fontSize: theme.typography.fontSize.md,
        cellSize: getFibonacciByIndex(8), // 21px
        spacing: theme.spacing.md,
        pickerWidth: getFibonacciByIndex(10) * PHI, // ~235px
      };
    case 'md':
    default:
      return {
        fontSize: theme.typography.fontSize.base,
        cellSize: getFibonacciByIndex(7), // 13px
        spacing: theme.spacing.sm,
        pickerWidth: getFibonacciByIndex(9), // 34px
      };
  }
};

// Generate hours for selection based on the use24Hour option
const generateHours = (use24Hour: boolean): number[] => {
  return Array.from({ length: use24Hour ? 24 : 12 }, (_, i) => use24Hour ? i : i + 1);
};

// Generate minutes for selection based on step
const generateMinutes = (step: number): number[] => {
  const minutes = [];
  for (let i = 0; i < 60; i += step) {
    minutes.push(i);
  }
  return minutes;
};

// Styled components for the time picker UI
const TimePickerContainer = styled(Box)<{
  componentSize?: 'sm' | 'md' | 'lg';
}>`
  position: absolute;
  z-index: 10;
  margin-top: 8px;
  background-color: ${props => props.theme.colors.background[50] ?? 1};
  border-radius: ${props => props.theme.radius.md}px;
  box-shadow: ${props => props.theme.shadows.md};
  overflow: hidden;
  width: ${props => getSizeStyles(props.componentSize || 'md', props.theme).pickerWidth}px;
  border: 1px solid ${props => props.theme.colors.background[200] ?? 1};
`;

const TimePickerGrid = styled(Grid)<{
  size?: 'sm' | 'md' | 'lg';
  columns?: number;
}>`
  display: grid;
  grid-template-columns: repeat(${props => props.columns || 4}, 1fr);
  gap: ${props => props.theme.spacing.xs}px;
  padding: ${props => props.theme.spacing.sm}px;
  max-height: ${props => getFibonacciByIndex(9) * PHI}px; /* Golden ratio height */
  overflow-y: auto;

  /* Scrollbar styling */
  &::-webkit-scrollbar {
    width: ${props => getFibonacciByIndex(4)}px; /* 3px */
  }
  
  &::-webkit-scrollbar-track {
    background: ${props => props.theme.colors.background[100] ?? 1};
    border-radius: ${props => props.theme.radius.sm}px;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: ${props => props.theme.colors.primary[300] ?? 1};
    border-radius: ${props => props.theme.radius.sm}px;
  }
`;

const TimePickerHeader = styled(Flex)`
  padding: ${props => props.theme.spacing.sm}px;
  border-bottom: 1px solid ${props => props.theme.colors.background[200] ?? 1};
  justify-content: space-between;
  align-items: center;
`;

const TimeCell = styled(Box)<{
  isSelected?: boolean;
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: ${props => props.theme.radius.sm}px;
  
  /* Size based on Fibonacci */
  ${props => {
    const sizeStyles = getSizeStyles(props.size || 'md', props.theme);
    const cellSize = sizeStyles.cellSize * PHI; // Apply golden ratio
    return `
      width: ${cellSize}px;
      height: ${cellSize}px;
      font-size: ${sizeStyles.fontSize}px;
    `;
  }}
  
  /* States */
  ${props => props.isSelected && `
    background-color: ${props.theme.colors.primary[500] ?? 1};
    color: ${props.theme.colors.text.light};
  `}
  
  &:hover {
    background-color: ${props => !props.isSelected ? props.theme.colors.primary[100] ?? 1 : props.theme.colors.primary[600] ?? 1};
  }
  
  transition: all 0.2s cubic-bezier(${props => SACRED_EASINGS.standard.join(', ')});
`;

const PeriodSelector = styled(Box)<{
  isSelected?: boolean;
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: ${props => props.theme.radius.sm}px;
  padding: ${props => props.theme.spacing.xs}px ${props => props.theme.spacing.sm}px;
  
  /* States */
  ${props => props.isSelected && `
    background-color: ${props.theme.colors.primary[500] ?? 1};
    color: ${props.theme.colors.text.light};
  `}
  
  &:hover {
    background-color: ${props => !props.isSelected ? props.theme.colors.primary[100] ?? 1 : props.theme.colors.primary[600] ?? 1};
  }
  
  transition: all 0.2s cubic-bezier(${props => SACRED_EASINGS.standard.join(', ')});
`;

/**
 * TimePicker Component with ref forwarding
 * 
 * Creates a time input with dropdown time picker using sacred geometry principles
 */
export const TimePicker = React.forwardRef<HTMLInputElement, TimePickerProps>(
  ({
    id,
    name,
    value,
    defaultValue,
    onChange,
    use24Hour = false,
    step = 5,
    size = 'md',
    placeholder = 'Select a time',
    disabled = false,
    readOnly = false,
    required = false,
    isInvalid = false,
    isValidating = false,
    useGoldenRatioGrid = true,
    ...rest
  }, ref) => {
    // State for time picker visibility
    const [isOpen, setIsOpen] = useState(false);
    
    // State for selected time (hours and minutes)
    const [selectedHours, setSelectedHours] = useState<number | null>(null);
    const [selectedMinutes, setSelectedMinutes] = useState<number | null>(null);
    
    // State for input value
    const [inputValue, setInputValue] = useState(value || defaultValue || '');
    
    // References
    const inputRef = useRef<HTMLInputElement>(null);
    const pickerRef = useRef<HTMLDivElement>(null);
    
    // Parse initial time value
    const parseInitialTime = (): { hours: number, minutes: number } => {
      if (value) {
        const parsedTime = parseTime(value, use24Hour);
        if (parsedTime) {
          return parsedTime;
        }
      }
      
      if (defaultValue) {
        const parsedTime = parseTime(defaultValue, use24Hour);
        if (parsedTime) {
          return parsedTime;
        }
      }
      
      // Default to current time
      const now = new Date();
      const currentHours = now.getHours();
      const currentMinutes = now.getMinutes();
      
      // Round minutes to nearest step
      const roundedMinutes = Math.round(currentMinutes / step) * step;
      
      return { 
        hours: currentHours, 
        minutes: roundedMinutes >= 60 ? 0 : roundedMinutes 
      };
    };
    
    // Initialize selected time
    useEffect(() => {
      const initialTime = parseInitialTime();
      setSelectedHours(initialTime.hours);
      setSelectedMinutes(initialTime.minutes);
    }, []);
    
    // Update input value when value prop changes
    useEffect(() => {
      if (value) {
        setInputValue(value);
        const parsedTime = parseTime(value, use24Hour);
        if (parsedTime) {
          setSelectedHours(parsedTime.hours);
          setSelectedMinutes(parsedTime.minutes);
        }
      }
    }, [value, use24Hour]);
    
    // Close time picker when clicking outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          pickerRef.current && 
          !pickerRef.current.contains(event.target as Node) &&
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
    
    // Handle time selection
    const handleSelectTime = (hours: number, minutes: number) => {
      setSelectedHours(hours);
      setSelectedMinutes(minutes);
      
      const formattedTime = formatTime(hours, minutes, use24Hour);
      setInputValue(formattedTime);
      
      if (onChange) {
        onChange(formattedTime);
      }
      
      setIsOpen(false);
    };
    
    // Handle hour selection
    const handleSelectHour = (hour: number) => {
      setSelectedHours(hour);
      if (selectedMinutes !== null) {
        applyTimeSelection();
      }
    };
    
    // Handle minute selection
    const handleSelectMinute = (minute: number) => {
      setSelectedMinutes(minute);
      if (selectedHours !== null) {
        applyTimeSelection();
      }
    };
    
    // Handle AM/PM selection
    const handleSelectPeriod = (isPM: boolean) => {
      if (selectedHours !== null) {
        const newHours = isPM ? 
          (selectedHours % 12) + 12 : 
          selectedHours % 12;
        
        setSelectedHours(newHours);
        applyTimeSelection();
      }
    };
    
    // Handle input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInputValue(newValue);
      
      const parsedTime = parseTime(newValue, use24Hour);
      if (parsedTime) {
        setSelectedHours(parsedTime.hours);
        setSelectedMinutes(parsedTime.minutes);
        
        if (onChange) {
          onChange(newValue);
        }
      } else if (newValue === '') {
        setSelectedHours(null);
        setSelectedMinutes(null);
        
        if (onChange) {
          onChange(null);
        }
      }
    };
    
    // Toggle time picker on input focus
    const handleInputFocus = () => {
      if (!disabled && !readOnly) {
        setIsOpen(true);
        
        // If no time is selected, set default to current time
        if (selectedHours === null || selectedMinutes === null) {
          const initialTime = parseInitialTime();
          setSelectedHours(initialTime.hours);
          setSelectedMinutes(initialTime.minutes);
        }
      }
    };
    
    // Apply the current hour and minute selection
    const applyTimeSelection = () => {
      if (selectedHours !== null && selectedMinutes !== null) {
        const formattedTime = formatTime(selectedHours, selectedMinutes, use24Hour);
        setInputValue(formattedTime);
        
        if (onChange) {
          onChange(formattedTime);
        }
      }
    };
    
    // Render hour selection grid
    const renderHours = () => {
      const hours = generateHours(use24Hour);
      
      return hours.map(hour => {
        const displayHour = use24Hour ? 
          hour.toString().padStart(2, '0') : 
          hour.toString();
          
        const isSelected = selectedHours === (use24Hour ? hour : (hour === 12 ? 0 : hour));
        
        return (
          <TimeCell 
            key={hour} 
            size={size}
            isSelected={isSelected}
            onClick={() => handleSelectHour(use24Hour ? hour : (hour === 12 ? 0 : hour))}
          >
            {displayHour}
          </TimeCell>
        );
      });
    };
    
    // Render minute selection grid
    const renderMinutes = () => {
      const minutes = generateMinutes(step);
      
      return minutes.map(minute => {
        const displayMinute = minute.toString().padStart(2, '0');
        const isSelected = selectedMinutes === minute;
        
        return (
          <TimeCell 
            key={minute} 
            size={size}
            isSelected={isSelected}
            onClick={() => handleSelectMinute(minute)}
          >
            {displayMinute}
          </TimeCell>
        );
      });
    };
    
    // Fix the ref assignment issue
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
            <TimePickerContainer ref={pickerRef} componentSize={size}>
              <TimePickerHeader>
                <Text fontWeight="medium">Select Time</Text>
                
                {!use24Hour && (
                  <Flex gap={2}>
                    <PeriodSelector 
                      isSelected={selectedHours !== null && selectedHours < 12}
                      onClick={() => handleSelectPeriod(false)}
                    >
                      AM
                    </PeriodSelector>
                    <PeriodSelector 
                      isSelected={selectedHours !== null && selectedHours >= 12}
                      onClick={() => handleSelectPeriod(true)}
                    >
                      PM
                    </PeriodSelector>
                  </Flex>
                )}
              </TimePickerHeader>
              
              <Flex>
                {/* Hours column */}
                <Box flex="1">
                  <Text textAlign="center" mb={1}>Hours</Text>
                  <TimePickerGrid 
                    size={size}
                    columns={useGoldenRatioGrid ? 3 : 4}
                  >
                    {renderHours()}
                  </TimePickerGrid>
                </Box>
                
                {/* Minutes column */}
                <Box flex="1">
                  <Text textAlign="center" mb={1}>Minutes</Text>
                  <TimePickerGrid 
                    size={size}
                    columns={useGoldenRatioGrid ? 3 : 4}
                  >
                    {renderMinutes()}
                  </TimePickerGrid>
                </Box>
              </Flex>
              
              <Flex justifyContent="flex-end" p={2}>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setIsOpen(false)}
                >
                  Done
                </Button>
              </Flex>
            </TimePickerContainer>
          </FadeIn>
        )}
      </Box>
    );
  }
);

TimePicker.displayName = 'TimePicker';

export default TimePicker; 









