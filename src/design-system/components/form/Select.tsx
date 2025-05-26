// TODO: This file contains direct document access without SSR checks
/**
 * Select Component
 * 
 * A dropdown selection component that implements sacred geometry principles
 * for proportions, spacing, and visual harmony.
 * 
 * The Select component creates a harmonious user interface element
 * using Golden Ratio and Fibonacci-based measurements.
 */

import * as React from 'react';
import { useState, useEffect, useMemo, useRef, useCallback } from 'react';;
import styled from 'styled-components';
import { DefaultTheme } from 'styled-components';
import { Box } from '../layout';
import { SelectProps } from '../../types';
import { PHI, PHI_INVERSE, SACRED_EASINGS } from '../../../constants/sacred-geometry';
import { radius, spacing } from '../../tokens';

// Size-specific styles
const getSizeStyles = (size: 'sm' | 'md' | 'lg', theme: DefaultTheme) => {
  switch (size) {
    case 'sm':
      return {
        fontSize: theme.typography.fontSize.sm,
        padding: `${theme.spacing.xxs}px ${theme.spacing.xs}px`,
        height: 8 * PHI * 3, // ~38.8px (based on Fibonacci and Golden Ratio)
        borderRadius: theme.radius.xs,
        iconSize: theme.typography.fontSize.base,
        arrowSize: 8,
      };
    case 'lg':
      return {
        fontSize: theme.typography.fontSize.md,
        padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
        height: 13 * PHI * 3, // ~63px (based on Fibonacci and Golden Ratio)
        borderRadius: theme.radius.md,
        iconSize: theme.typography.fontSize.lg,
        arrowSize: 13,
      };
    case 'md':
    default:
      return {
        fontSize: theme.typography.fontSize.base,
        padding: `${theme.spacing.xxs}px ${theme.spacing.sm}px`,
        height: 8 * PHI * 4, // ~51.8px (based on Fibonacci and Golden Ratio)
        borderRadius: theme.radius.sm,
        iconSize: theme.typography.fontSize.md,
        arrowSize: 10,
      };
  }
};

// Styled select container with sacred geometry proportions
const SelectContainer = styled(Box)<{
  isDisabled?: boolean;
  isInvalid?: boolean;
  isValidating?: boolean;
  hasFocus?: boolean;
  hasValue?: boolean;
  componentSize?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
}>`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  transition: all 0.3s cubic-bezier(${props => SACRED_EASINGS.standard.join(', ')});
  cursor: ${props => props.isDisabled ? 'not-allowed' : 'pointer'};
  
  /* Size-specific styles */
  ${props => {
    const sizeStyles = getSizeStyles(props.componentSize || 'md', props.theme);
    return `
      height: ${sizeStyles.height}px;
      border-radius: ${sizeStyles.borderRadius}px;
    `;
  }}
  
  /* States */
  background-color: ${props => props.theme.colors.background[50] ?? 1};
  border: 1px solid ${props => {
    if (props.isInvalid) return props.theme.colors.feedback.error.main;
    if (props.hasFocus) return props.theme.colors.primary[500] ?? 1;
    if (props.isValidating) return props.theme.colors.feedback.info.main;
    return props.theme.colors.background[300] ?? 1;
  }};
  
  /* Focus state with golden ratio-based glow */
  ${props => props.hasFocus && !props.isDisabled && `
    box-shadow: 0 0 0 ${PHI_INVERSE * 5}px ${props.isInvalid 
      ? props.theme.colors.feedback.error.light + '40'  // 40 = 25% opacity in hex
      : props.theme.colors.primary[200] ?? 1 + '40'};        // 40 = 25% opacity in hex
  `}
  
  /* Disabled state */
  ${props => props.isDisabled && `
    opacity: ${PHI_INVERSE};
    cursor: not-allowed;
    background-color: ${props.theme.colors.background[100] ?? 1};
  `}
  
  /* Invalid state */
  ${props => props.isInvalid && `
    border-color: ${props.theme.colors.feedback.error.main};
  `}
  
  /* Validating state */
  ${props => props.isValidating && `
    border-color: ${props.theme.colors.feedback.info.main};
  `}
`;

// Styled select element (hidden native select for accessibility)
const StyledSelect = styled.select<{
  isDisabled?: boolean;
  componentSize?: 'sm' | 'md' | 'lg';
}>`
  position: absolute;
  opacity: 0;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  cursor: ${props => props.isDisabled ? 'not-allowed' : 'pointer'};
  z-index: 1;
`;

// Custom select display
const SelectDisplay = styled.div<{
  componentSize?: 'sm' | 'md' | 'lg';
  hasValue?: boolean;
}>`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  position: relative;
  padding-right: ${props => props.theme.spacing.xl}px; // Space for arrow
  
  /* Size-specific styles */
  ${props => {
    const sizeStyles = getSizeStyles(props.componentSize || 'md', props.theme);
    return `
      font-size: ${sizeStyles.fontSize}px;
      padding-left: ${sizeStyles.padding.split(' ')[1]};
    `;
  }}
  
  /* Placeholder style */
  color: ${props => props.hasValue 
    ? props.theme.colors.text.primary 
    : props.theme.colors.text.tertiary};
  
  /* Placeholder with golden ratio opacity */
  opacity: ${props => props.hasValue ? 1 : PHI_INVERSE};
  
  /* Prevent text overflow */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

// Arrow icon with sacred proportions
const SelectArrow = styled.div<{
  componentSize?: 'sm' | 'md' | 'lg';
  isOpen?: boolean;
}>`
  position: absolute;
  right: ${props => props.theme.spacing.sm}px;
  top: 50%;
  transform: translateY(-50%) ${props => props.isOpen ? 'rotate(180deg)' : 'rotate(0)'};
  pointer-events: none;
  transition: transform 0.3s cubic-bezier(${props => SACRED_EASINGS.standard.join(', ')});
  
  /* Arrow shape using golden ratio proportions */
  &::before {
    content: '';
    display: block;
    width: 0;
    height: 0;
    border-left: ${props => getSizeStyles(props.componentSize || 'md', props.theme).arrowSize / 2}px solid transparent;
    border-right: ${props => getSizeStyles(props.componentSize || 'md', props.theme).arrowSize / 2}px solid transparent;
    border-top: ${props => getSizeStyles(props.componentSize || 'md', props.theme).arrowSize * PHI_INVERSE}px solid ${props => props.theme.colors.text.secondary};
  }
`;

// Custom dropdown with sacred geometry proportions
const SelectDropdown = styled.div<{
  isOpen?: boolean;
  componentSize?: 'sm' | 'md' | 'lg';
}>`
  position: absolute;
  top: calc(100% + 5px);
  left: 0;
  width: 100%;
  background-color: ${props => props.theme.colors.background[50] ?? 1};
  border-radius: ${props => getSizeStyles(props.componentSize || 'md', props.theme).borderRadius}px;
  border: 1px solid ${props => props.theme.colors.background[300] ?? 1};
  box-shadow: ${props => props.theme.shadows.md};
  z-index: 10;
  max-height: ${props => getSizeStyles(props.componentSize || 'md', props.theme).height * 5}px;
  overflow-y: auto;
  display: ${props => props.isOpen ? 'block' : 'none'};
  
  /* Use golden ratio for dropdown animation */
  transform-origin: top center;
  animation: ${props => props.isOpen ? 'selectDropdownOpen' : 'none'} 0.3s cubic-bezier(${props => SACRED_EASINGS.standard.join(', ')});
  
  @keyframes selectDropdownOpen {
    from {
      opacity: 0;
      transform: scaleY(0.618) translateY(-10px); /* Use PHI_INVERSE for natural scale */
    }
    to {
      opacity: 1;
      transform: scaleY(1) translateY(0);
    }
  }
`;

// Option item in dropdown
const SelectOption = styled.div<{
  isSelected?: boolean;
  isDisabled?: boolean;
  componentSize?: 'sm' | 'md' | 'lg';
}>`
  padding: ${props => {
    const { padding } = getSizeStyles(props.componentSize || 'md', props.theme);
    return padding;
  }};
  cursor: ${props => props.isDisabled ? 'not-allowed' : 'pointer'};
  background-color: ${props => props.isSelected ? props.theme.colors.primary[100] ?? 1 : 'transparent'};
  color: ${props => {
    if (props.isDisabled) return props.theme.colors.text.disabled;
    if (props.isSelected) return props.theme.colors.primary[700] ?? 1;
    return props.theme.colors.text.primary;
  }};
  
  opacity: ${props => props.isDisabled ? PHI_INVERSE : 1};
  
  &:hover {
    background-color: ${props => {
      if (props.isDisabled) return 'transparent';
      if (props.isSelected) return props.theme.colors.primary[200] ?? 1;
      return props.theme.colors.background[100] ?? 1;
    }};
  }
`;

// Optgroup in dropdown
const SelectOptGroup = styled.div<{
  componentSize?: 'sm' | 'md' | 'lg';
}>`
  padding: ${props => {
    const { padding } = getSizeStyles(props.componentSize || 'md', props.theme);
    return padding;
  }};
  font-weight: ${props => props.theme.typography.fontWeight.semiBold};
  color: ${props => props.theme.colors.text.secondary};
  background-color: ${props => props.theme.colors.background[100] ?? 1};
  position: sticky;
  top: 0;
  z-index: 1;
`;

/**
 * Select Component with ref forwarding
 * 
 * Creates a select dropdown with sacred geometry proportions
 */
export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ 
    id,
    name,
    value,
    defaultValue,
    placeholder = 'Select an option',
    disabled = false,
    required = false,
    isInvalid = false,
    isValidating = false,
    size = 'md',
    onChange,
    onFocus,
    onBlur,
    options = [],
    isClearable = false,
    isSearchable = false,
    useSacredDropdown = true,
    ...rest 
  }, ref) => {
    // Internal select ref
    const internalRef = useRef<HTMLSelectElement>(null);
    
    // State for focus and dropdown
    const [hasFocus, setHasFocus] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState<string | number | undefined>(value || defaultValue);
    const dropdownRef = useRef<HTMLDivElement>(null);
    
    // Combine the internal ref with the forwarded ref
    const combinedRef = useCallback((node: HTMLSelectElement) => {
      if (node) {
        // Use type assertion to handle the read-only property
        (internalRef as React.MutableRefObject<HTMLSelectElement | null>).current = node;
        
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          // Safe cast since we're checking ref exists
          (ref as React.MutableRefObject<HTMLSelectElement | null>).current = node;
        }
      }
    }, [ref]);
    
    // Update internal state when value prop changes
    useEffect(() => {
      if (value !== undefined) {
        setSelectedValue(value);
      }
    }, [value]);
    
    // Get the label of the selected option
    const getSelectedLabel = () => {
      const selectedOption = options.find(opt => opt.value === selectedValue);
      return selectedOption ? selectedOption.label : placeholder;
    };
    
    // Handle native select change
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newValue = e.target.value;
      setSelectedValue(newValue);
      
      if (onChange) {
        // The updated SelectProps interface now accepts both types, so we can directly pass the event
        onChange(e);
      }
    };
    
    // Handle focus events
    const handleFocus = (e: React.FocusEvent<HTMLSelectElement>) => {
      setHasFocus(true);
      if (useSacredDropdown) {
        setIsOpen(true);
      }
      
      if (onFocus) {
        // The updated interface accepts both event types
        onFocus(e);
      }
    };
    
    // Handle blur events
    const handleBlur = (e: React.FocusEvent<HTMLSelectElement>) => {
      // Don't blur immediately if using custom dropdown
      if (!useSacredDropdown) {
        setHasFocus(false);
      }
      
      if (onBlur) {
        // The updated interface accepts both event types
        onBlur(e);
      }
    };
    
    // Handle custom option click
    const handleCustomOptionClick = (optionValue: string | number, isDisabled = false) => {
      if (isDisabled) return;
      
      setSelectedValue(optionValue);
      setIsOpen(false);
      setHasFocus(false);
      
      // Update the native select for form submission
      if (internalRef.current) {
        internalRef.current.value = String(optionValue);
        
        // Create and dispatch a change event
        const event = new Event('change', { bubbles: true });
        internalRef.current.dispatchEvent(event);
        
        // Call the onChange handler if provided
        if (onChange) {
          // We need to create a synthetic React event
          const syntheticEvent = {
            target: internalRef.current,
            currentTarget: internalRef.current,
            type: 'change',
            bubbles: true,
            cancelable: true,
            defaultPrevented: false,
            timeStamp: Date.now(),
            preventDefault: () => {},
            stopPropagation: () => {},
            nativeEvent: event
          } as React.ChangeEvent<HTMLSelectElement>;
          
          onChange(syntheticEvent);
        }
      }
    };
    
    // Handle outside clicks to close dropdown
    useEffect(() => {
      if (!useSacredDropdown) return;
      
      const handleOutsideClick = (e: MouseEvent) => {
        if (
          dropdownRef.current && 
          !dropdownRef.current.contains(e.target as Node) &&
          internalRef.current && 
          !internalRef.current.contains(e.target as Node)
        ) {
          setIsOpen(false);
          setHasFocus(false);
        }
      };
      
      if (isOpen) {
        document.addEventListener('mousedown', handleOutsideClick);
      }
      
      return () => {
        document.removeEventListener('mousedown', handleOutsideClick);
      };
    }, [isOpen, useSacredDropdown]);
    
    // Group options by group
    const groupedOptions = useMemo(() => {
      const groups: Record<string, typeof options> = { default: [] };
      
      options.forEach(option => {
        const group = option.group || 'default';
        if (!groups[group]) {
          groups[group] = [];
        }
        groups[group].push(option);
      });
      
      return groups;
    }, [options]);
    
    return (
      <SelectContainer
        isDisabled={disabled}
        isInvalid={isInvalid}
        isValidating={isValidating}
        hasFocus={hasFocus}
        hasValue={!!selectedValue}
        componentSize={size}
        onClick={() => {
          if (!disabled && useSacredDropdown) {
            setIsOpen(!isOpen);
            if (!hasFocus) {
              setHasFocus(true);
            }
          }
        }}
      >
        {/* Hidden native select for accessibility and form submission */}
        <StyledSelect
          id={id}
          name={name}
          ref={combinedRef}
          value={selectedValue}
          defaultValue={defaultValue}
          disabled={disabled}
          required={required}
          aria-invalid={isInvalid}
          onChange={handleSelectChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          componentSize={size}
          {...rest}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option 
              key={option.value} 
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </StyledSelect>
        
        {/* Custom select display */}
        <SelectDisplay
          componentSize={size}
          hasValue={!!selectedValue}
        >
          {getSelectedLabel()}
          
          {/* Dropdown arrow */}
          <SelectArrow 
            componentSize={size}
            isOpen={isOpen}
          />
        </SelectDisplay>
        
        {/* Custom dropdown */}
        {useSacredDropdown && (
          <SelectDropdown
            ref={dropdownRef}
            isOpen={isOpen}
            componentSize={size}
          >
            {/* Default "placeholder" option */}
            <SelectOption 
              componentSize={size}
              isSelected={!selectedValue}
              onClick={() => handleCustomOptionClick('')}
            >
              {placeholder}
            </SelectOption>
            
            {/* Render options by group */}
            {Object.entries(groupedOptions).map(([groupName, groupOptions]) => (
              groupName !== 'default' ? (
                <React.Fragment key={groupName}>
                  <SelectOptGroup componentSize={size}>
                    {groupName}
                  </SelectOptGroup>
                  {groupOptions.map(option => (
                    <SelectOption
                      key={option.value}
                      componentSize={size}
                      isSelected={selectedValue === option.value}
                      isDisabled={option.disabled}
                      onClick={() => handleCustomOptionClick(option.value, option.disabled)}
                    >
                      {option.label}
                    </SelectOption>
                  ))}
                </React.Fragment>
              ) : (
                groupOptions.map(option => (
                  <SelectOption
                    key={option.value}
                    componentSize={size}
                    isSelected={selectedValue === option.value}
                    isDisabled={option.disabled}
                    onClick={() => handleCustomOptionClick(option.value, option.disabled)}
                  >
                    {option.label}
                  </SelectOption>
                ))
              )
            ))}
          </SelectDropdown>
        )}
      </SelectContainer>
    );
  }
);

Select.displayName = 'Select';

export default Select; 






