import * as React from 'react';
import { useState, useEffect } from 'react';
import { useBooking } from '../../context/BookingContext';
import { getFibonacciByIndex } from '../../utils/getFibonacciByIndex';
import { z } from 'zod';
import styled from 'styled-components';
import { DefaultTheme } from 'styled-components';
import { RecoveryOfficeTheme } from '../../design-system/types/theme.types';

// Define Zod schema for form validation
const customerInfoSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  notes: z.string().optional(),
  preferredContactMethod: z.enum(['email', 'phone', 'text']).default('email'),
  isNewClient: z.boolean().default(true),
});

type CustomerInfo = z.infer<typeof customerInfoSchema>;
type FormErrors = Partial<Record<keyof CustomerInfo, string>>;

const FormContainer = styled.div`
  margin-bottom: ${getFibonacciByIndex(8)}px;
`;

const SectionTitle = styled.h2`
  font-size: ${getFibonacciByIndex(7)}px;
  margin-bottom: ${getFibonacciByIndex(6)}px;
  text-align: center;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(${getFibonacciByIndex(10)}px, 1fr));
  gap: ${getFibonacciByIndex(5)}px;
`;

const FormGroup = styled.div`
  margin-bottom: ${getFibonacciByIndex(5)}px;
`;

const FormLabel = styled.label<{ $hasError: boolean }>`
  display: block;
  margin-bottom: ${getFibonacciByIndex(3)}px;
  font-weight: 500;
  color: ${(props: { theme: RecoveryOfficeTheme; $hasError: boolean }) => 
    props.$hasError ? props.theme.colors.feedback.error.main : props.theme.colors.text.primary};
`;

const FormInput = styled.input<{ $hasError: boolean }>`
  width: 100%;
  padding: ${getFibonacciByIndex(4)}px;
  border: 1px solid ${(props: { theme: RecoveryOfficeTheme; $hasError: boolean }) => 
    props.$hasError ? props.theme.colors.feedback.error.main : props.theme.colors.border.main};
  border-radius: ${getFibonacciByIndex(3)}px;
  transition: all ${getFibonacciByIndex(3)}ms ease-in-out;
  
  &:focus {
    outline: none;
    border-color: ${(props: { theme: RecoveryOfficeTheme }) => props.theme.colors.primary[500]};
    box-shadow: 0 0 0 1px ${(props: { theme: RecoveryOfficeTheme }) => props.theme.colors.primary[500]};
  }
`;

const Select = styled.select<{ $hasError: boolean }>`
  width: 100%;
  padding: ${getFibonacciByIndex(4)}px;
  border: 1px solid ${(props: { theme: RecoveryOfficeTheme; $hasError: boolean }) => 
    props.$hasError ? props.theme.colors.feedback.error.main : props.theme.colors.border.main};
  border-radius: ${getFibonacciByIndex(3)}px;
  transition: all ${getFibonacciByIndex(3)}ms ease-in-out;
  
  &:focus {
    outline: none;
    border-color: ${(props: { theme: RecoveryOfficeTheme }) => props.theme.colors.primary[500]};
    box-shadow: 0 0 0 1px ${(props: { theme: RecoveryOfficeTheme }) => props.theme.colors.primary[500]};
  }
`;

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  margin-right: ${getFibonacciByIndex(3)}px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-weight: 500;
  color: ${(props: { theme: RecoveryOfficeTheme }) => props.theme.colors.text.primary};
`;

const TextArea = styled.textarea<{ $hasError: boolean }>`
  width: 100%;
  padding: ${getFibonacciByIndex(4)}px;
  border: 1px solid ${(props: { theme: RecoveryOfficeTheme; $hasError: boolean }) => 
    props.$hasError ? props.theme.colors.feedback.error.main : props.theme.colors.border.main};
  border-radius: ${getFibonacciByIndex(3)}px;
  transition: all ${getFibonacciByIndex(3)}ms ease-in-out;
  min-height: ${getFibonacciByIndex(9)}px;
  
  &:focus {
    outline: none;
    border-color: ${(props: { theme: RecoveryOfficeTheme }) => props.theme.colors.primary[500]};
    box-shadow: 0 0 0 1px ${(props: { theme: RecoveryOfficeTheme }) => props.theme.colors.primary[500]};
  }
`;

const ErrorMessage = styled.p`
  color: ${(props: { theme: RecoveryOfficeTheme }) => props.theme.colors.feedback.error.main};
  font-size: ${getFibonacciByIndex(4)}px;
  margin-top: ${getFibonacciByIndex(2)}px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${getFibonacciByIndex(7)}px;
`;

const Button = styled.button<{ $isPrimary?: boolean }>`
  padding: ${getFibonacciByIndex(4)}px ${getFibonacciByIndex(6)}px;
  border-radius: ${getFibonacciByIndex(3)}px;
  font-weight: 500;
  cursor: pointer;
  transition: all ${getFibonacciByIndex(3)}ms ease-in-out;
  
  background-color: ${(props: { theme: RecoveryOfficeTheme; $isPrimary?: boolean }) => 
    props.$isPrimary ? props.theme.colors.primary[500] : 'transparent'};
  color: ${(props: { theme: RecoveryOfficeTheme; $isPrimary?: boolean }) => 
    props.$isPrimary ? 'white' : props.theme.colors.text.primary};
  border: 1px solid ${(props: { theme: RecoveryOfficeTheme; $isPrimary?: boolean }) => 
    props.$isPrimary ? 'transparent' : props.theme.colors.border.main};
  
  &:hover {
    background-color: ${(props: { theme: RecoveryOfficeTheme; $isPrimary?: boolean }) => 
      props.$isPrimary ? props.theme.colors.primary[600] : props.theme.colors.background.light};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const CustomerInfoForm: React.FC = () => {
  const { state, setClientInfo, goToPreviousStep, goToNextStep } = useBooking();
  
  // Initialize form state from context or with defaults
  const [formData, setFormData] = useState<CustomerInfo>({
    firstName: state.clientInfo?.firstName || '',
    lastName: state.clientInfo?.lastName || '',
    email: state.clientInfo?.email || '',
    phone: state.clientInfo?.phone || '',
    notes: state.clientInfo?.additionalNotes || '',
    preferredContactMethod: state.clientInfo?.preferredContactMethod || 'email',
    isNewClient: state.clientInfo?.isNewClient !== false, // Default to true if not set
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [touchedFields, setTouchedFields] = useState<Set<keyof CustomerInfo>>(new Set());
  const [isValid, setIsValid] = React.useState(false);
  
  // Validate form when data changes
  React.useEffect(() => {
    const result = customerInfoSchema.safeParse(formData);
    
    if (result.success) {
      setErrors({});
      setIsValid(true);
    } else {
      const formattedErrors: FormErrors = {};
      result.error.errors.forEach((error) => {
        const path = error.path[0] as keyof CustomerInfo;
        formattedErrors[path] = error.message;
      });
      setErrors(formattedErrors);
      setIsValid(false);
    }
  }, [formData]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
    
    // Mark field as touched
    setTouchedFields((prev) => new Set(prev).add(name as keyof CustomerInfo));
  };
  
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name } = e.target;
    setTouchedFields((prev) => new Set(prev).add(name as keyof CustomerInfo));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched
    const allFields = new Set<keyof CustomerInfo>([
      'firstName', 'lastName', 'email', 'phone', 'notes', 'preferredContactMethod', 'isNewClient'
    ]);
    setTouchedFields(allFields);
    
    // Validate form
    const result = customerInfoSchema.safeParse(formData);
    
    if (result.success) {
      // Update context with form data
      setClientInfo({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        additionalNotes: formData.notes || '',
        preferredContactMethod: formData.preferredContactMethod,
        isNewClient: formData.isNewClient,
      });
      goToNextStep();
    }
  };
  
  // Check if a field has an error and has been touched
  const hasError = (field: keyof CustomerInfo) => {
    return touchedFields.has(field) && Boolean(errors[field]);
  };
  
  // Get error message for a field
  const getErrorMessage = (field: keyof CustomerInfo) => {
    return hasError(field) ? errors[field] : '';
  };
  
  return (
    <FormContainer>
      <SectionTitle>Your Information</SectionTitle>
      
      <form onSubmit={handleSubmit}>
        <FormGrid>
          <FormGroup>
            <FormLabel 
              htmlFor="firstName"
              $hasError={hasError('firstName')}
            >
              First Name*
            </FormLabel>
            <FormInput
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              $hasError={hasError('firstName')}
              aria-invalid={hasError('firstName')}
              aria-describedby={hasError('firstName') ? 'firstName-error' : undefined}
            />
            {hasError('firstName') && (
              <ErrorMessage id="firstName-error">{getErrorMessage('firstName')}</ErrorMessage>
            )}
          </FormGroup>
          
          <FormGroup>
            <FormLabel 
              htmlFor="lastName"
              $hasError={hasError('lastName')}
            >
              Last Name*
            </FormLabel>
            <FormInput
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              $hasError={hasError('lastName')}
              aria-invalid={hasError('lastName')}
              aria-describedby={hasError('lastName') ? 'lastName-error' : undefined}
            />
            {hasError('lastName') && (
              <ErrorMessage id="lastName-error">{getErrorMessage('lastName')}</ErrorMessage>
            )}
          </FormGroup>
          
          <FormGroup>
            <FormLabel 
              htmlFor="email"
              $hasError={hasError('email')}
            >
              Email*
            </FormLabel>
            <FormInput
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              $hasError={hasError('email')}
              aria-invalid={hasError('email')}
              aria-describedby={hasError('email') ? 'email-error' : undefined}
            />
            {hasError('email') && (
              <ErrorMessage id="email-error">{getErrorMessage('email')}</ErrorMessage>
            )}
          </FormGroup>
          
          <FormGroup>
            <FormLabel 
              htmlFor="phone"
              $hasError={hasError('phone')}
            >
              Phone*
            </FormLabel>
            <FormInput
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              $hasError={hasError('phone')}
              aria-invalid={hasError('phone')}
              aria-describedby={hasError('phone') ? 'phone-error' : undefined}
            />
            {hasError('phone') && (
              <ErrorMessage id="phone-error">{getErrorMessage('phone')}</ErrorMessage>
            )}
          </FormGroup>
          
          <FormGroup>
            <FormLabel 
              htmlFor="preferredContactMethod"
              $hasError={hasError('preferredContactMethod')}
            >
              Preferred Contact Method*
            </FormLabel>
            <Select
              id="preferredContactMethod"
              name="preferredContactMethod"
              value={formData.preferredContactMethod}
              onChange={handleChange}
              onBlur={handleBlur}
              $hasError={hasError('preferredContactMethod')}
              aria-invalid={hasError('preferredContactMethod')}
              aria-describedby={hasError('preferredContactMethod') ? 'preferredContactMethod-error' : undefined}
            >
              <option value="email">Email</option>
              <option value="phone">Phone</option>
              <option value="text">Text Message</option>
            </Select>
            {hasError('preferredContactMethod') && (
              <ErrorMessage id="preferredContactMethod-error">{getErrorMessage('preferredContactMethod')}</ErrorMessage>
            )}
          </FormGroup>
          
          <FormGroup>
            <CheckboxLabel htmlFor="isNewClient">
              <Checkbox
                id="isNewClient"
                name="isNewClient"
                checked={formData.isNewClient}
                onChange={handleChange}
              />
              I am a new client
            </CheckboxLabel>
          </FormGroup>
          
          <FormGroup style={{ gridColumn: '1 / -1' }}>
            <FormLabel 
              htmlFor="notes"
              $hasError={hasError('notes')}
            >
              Additional Notes
            </FormLabel>
            <TextArea
              id="notes"
              name="notes"
              value={formData.notes || ''}
              onChange={handleChange}
              onBlur={handleBlur}
              $hasError={hasError('notes')}
              aria-describedby={hasError('notes') ? 'notes-error' : undefined}
            />
            {hasError('notes') && (
              <ErrorMessage id="notes-error">{getErrorMessage('notes')}</ErrorMessage>
            )}
          </FormGroup>
        </FormGrid>
        
        <ButtonContainer>
          <Button 
            type="button" 
            onClick={goToPreviousStep}
          >
            Back
          </Button>
          <Button 
            type="submit" 
            $isPrimary 
            disabled={!isValid}
          >
            Continue
          </Button>
        </ButtonContainer>
      </form>
    </FormContainer>
  );
};

export default CustomerInfoForm; 
















