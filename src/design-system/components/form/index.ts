/**
 * Form Components Index
 * 
 * This file exports all form components from a single entry point
 * to provide consistent imports throughout the application.
 * 
 * All form components implement sacred geometry principles
 * to create harmonious, balanced user inputs.
 */

export { default as FormControl } from './FormControl';
export { default as FormLabel } from './FormLabel';
export { default as FormError } from './FormError';
export { default as Input } from './Input';
export { default as TextArea } from './TextArea';
// For backwards compatibility with existing codebase
export { default as Textarea } from './TextArea';
export { default as Select } from './Select';
export { default as Checkbox } from './Checkbox';
export { default as Radio } from './Radio';
export { default as DatePicker } from './DatePicker';
export { default as TimePicker } from './TimePicker';
export { default as CurrencyInput } from './CurrencyInput';
export { default as PercentageInput } from './PercentageInput';

// Export types from the styled.types.ts file
export type {
  InputProps,
  FormControlProps,
  FormLabelProps,
  FormErrorProps,
  SelectProps,
  CheckboxProps,
  RadioProps,
  TextAreaProps,
  DatePickerProps,
  TimePickerProps
} from '../../types/styled.types'; 

// Export specialized form input types
export type { CurrencyInputProps } from './CurrencyInput';
export type { PercentageInputProps } from './PercentageInput';





