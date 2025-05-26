import * as React from 'react';
import { useState } from 'react';
import { useBooking } from '../../context/BookingContext';
import { getFibonacciByIndex } from '../../utils/getFibonacciByIndex';
import { PHI } from '../../constants/sacred-geometry';
import { RecoveryOfficeTheme } from '../../design-system/types/theme.types';

import styled from 'styled-components';
import { z } from 'zod';

// Styled components using sacred geometry principles
const Container = styled.div`
  width: 100%;
  max-width: ${getFibonacciByIndex(12)}px;
  margin: 0 auto;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${getFibonacciByIndex(6)}px;
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${getFibonacciByIndex(3)}px;
`;

const FieldRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(${getFibonacciByIndex(10)}px, 1fr));
  gap: ${getFibonacciByIndex(5)}px;
`;

const Label = styled.label`
  font-size: ${getFibonacciByIndex(5)}px;
  color: ${(props: { theme: RecoveryOfficeTheme }) => props.theme.colors.text.primary};
  font-weight: 500;
`;

const Input = styled.input<{ hasError?: boolean }>`
  padding: ${getFibonacciByIndex(5)}px;
  border-radius: ${getFibonacciByIndex(3)}px;
  border: 1px solid ${(props: { theme: RecoveryOfficeTheme; hasError?: boolean }) => 
    props.hasError ? props.theme.colors.feedback.error.main : '#DDDDDD'};
  font-size: ${getFibonacciByIndex(5)}px;
  transition: all ${getFibonacciByIndex(5) * 10}ms ease;
  width: 100%;
  
  &:focus {
    outline: none;
    border-color: ${(props: { theme: RecoveryOfficeTheme }) => props.theme.colors.primary[500]};
    box-shadow: 0 0 0 ${getFibonacciByIndex(2)}px ${(props: { theme: RecoveryOfficeTheme }) => props.theme.colors.primary[200]};
  }
`;

const TextArea = styled.textarea<{ hasError?: boolean }>`
  padding: ${getFibonacciByIndex(5)}px;
  border-radius: ${getFibonacciByIndex(3)}px;
  border: 1px solid ${(props: { theme: RecoveryOfficeTheme; hasError?: boolean }) => 
    props.hasError ? props.theme.colors.feedback.error.main : '#DDDDDD'};
  font-size: ${getFibonacciByIndex(5)}px;
  min-height: ${getFibonacciByIndex(9)}px;
  resize: vertical;
  transition: all ${getFibonacciByIndex(5) * 10}ms ease;
  width: 100%;
  
  &:focus {
    outline: none;
    border-color: ${(props: { theme: RecoveryOfficeTheme }) => props.theme.colors.primary[500]};
    box-shadow: 0 0 0 ${getFibonacciByIndex(2)}px ${(props: { theme: RecoveryOfficeTheme }) => props.theme.colors.primary[200]};
  }
`;

const ErrorMessage = styled.span`
  color: ${(props: { theme: RecoveryOfficeTheme }) => props.theme.colors.feedback.error.main};
  font-size: ${getFibonacciByIndex(4)}px;
  margin-top: ${getFibonacciByIndex(2)}px;
`;

const Checkbox = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${getFibonacciByIndex(4)}px;
  margin-top: ${getFibonacciByIndex(4)}px;
  
  input {
    margin-top: ${getFibonacciByIndex(2)}px;
  }
`;

const ActionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${getFibonacciByIndex(7)}px;
`;

const Button = styled.button<{ isPrimary?: boolean }>`
  padding: ${getFibonacciByIndex(4)}px ${getFibonacciByIndex(6)}px;
  background-color: ${(props: { theme: RecoveryOfficeTheme; isPrimary?: boolean }) => 
    props.isPrimary ? props.theme.colors.primary[500] : props.theme.colors.background[50]};
  color: ${(props: { theme: RecoveryOfficeTheme; isPrimary?: boolean }) => 
    props.isPrimary ? 'white' : props.theme.colors.text.primary};
  border: 1px solid ${(props: { theme: RecoveryOfficeTheme; isPrimary?: boolean }) => 
    props.isPrimary ? props.theme.colors.primary[500] : '#DDDDDD'};
  border-radius: ${getFibonacciByIndex(3)}px;
  font-size: ${getFibonacciByIndex(5)}px;
  cursor: pointer;
  transition: all ${getFibonacciByIndex(5) * 10}ms ease;
  
  &:hover {
    background-color: ${(props: { theme: RecoveryOfficeTheme; isPrimary?: boolean }) => 
      props.isPrimary ? props.theme.colors.primary[600] : props.theme.colors.background[100]};
    transform: scale(${1 + (1 / PHI) * 0.02});
  }
  
  &:disabled {
    background-color: #E0E0E0;
    border-color: #E0E0E0;
    cursor: not-allowed;
    transform: none;
  }
`;

const Select = styled.select<{ hasError?: boolean }>`
  padding: ${getFibonacciByIndex(5)}px;
  border-radius: ${getFibonacciByIndex(3)}px;
  border: 1px solid ${(props: { theme: RecoveryOfficeTheme; hasError?: boolean }) => 
    props.hasError ? props.theme.colors.feedback.error.main : '#DDDDDD'};
  font-size: ${getFibonacciByIndex(5)}px;
  transition: all ${getFibonacciByIndex(5) * 10}ms ease;
  width: 100%;
  
  &:focus {
    outline: none;
    border-color: ${(props: { theme: RecoveryOfficeTheme }) => props.theme.colors.primary[500]};
    box-shadow: 0 0 0 ${getFibonacciByIndex(2)}px ${(props: { theme: RecoveryOfficeTheme }) => props.theme.colors.primary[200]};
  }
`;

// Define validation schema using Zod
const customerSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().regex(/^\d{10}$/, "Please enter a valid 10-digit phone number"),
  preferredContactMethod: z.enum(["email", "phone", "text"], {
    required_error: "Please select a preferred contact method"
  }),
  isNewClient: z.boolean(),
  // Financial recovery specific fields
  caseDescription: z.string().min(10, "Please provide at least 10 characters describing your case").max(500, "Case description cannot exceed 500 characters"),
  approximateLossAmount: z.string().min(1, "Please provide an approximate loss amount"),
  incidentDate: z.string().optional(),
  financialInstitution: z.string().optional(),
  fraudType: z.enum(["investment_fraud", "bank_fraud", "credit_card_fraud", "identity_theft", "pension_scam", "mortgage_fraud", "insurance_fraud", "tax_fraud", "other"], {
    required_error: "Please select the type of fraud"
  }),
  hasReportedToAuthorities: z.boolean(),
  additionalNotes: z.string().optional()
});

// Define the type based on the schema
type CustomerInfo = z.infer<typeof customerSchema>;

const CustomerInformation: React.FC = () => {
  const { 
    customerInfo, 
    setCustomerInfo, 
    currentStep, 
    setCurrentStep,
    completeBooking
  } = useBooking();
  
  // Initialize form state with existing data or defaults
  const [formData, setFormData] = useState<CustomerInfo>({
    firstName: customerInfo?.firstName || '',
    lastName: customerInfo?.lastName || '',
    email: customerInfo?.email || '',
    phone: customerInfo?.phone || '',
    preferredContactMethod: customerInfo?.preferredContactMethod || 'email',
    isNewClient: customerInfo?.isNewClient || true,
    // Initialize financial recovery fields
    caseDescription: customerInfo?.caseDescription || '',
    approximateLossAmount: customerInfo?.approximateLossAmount || '',
    incidentDate: customerInfo?.incidentDate || '',
    financialInstitution: customerInfo?.financialInstitution || '',
    fraudType: customerInfo?.fraudType || 'investment_fraud',
    hasReportedToAuthorities: customerInfo?.hasReportedToAuthorities || false,
    additionalNotes: customerInfo?.additionalNotes || ''
  });
  
  // Separate termsAccepted state since it's not part of ClientInformation
  const [termsAccepted, setTermsAccepted] = useState(false);
  
  // State for tracking validation errors
  const [errors, setErrors] = useState<Partial<Record<keyof CustomerInfo | 'termsAccepted', string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof CustomerInfo | 'termsAccepted', boolean>>>({});
  
  // Handle input changes for text and select inputs
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    
    // Handle checkbox separately
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      
      if (name === 'termsAccepted') {
        setTermsAccepted(checked);
        
        // Clear error when user checks the box
        if (checked && errors.termsAccepted) {
          setErrors(prev => ({
            ...prev,
            termsAccepted: undefined
          }));
        }
        return;
      }
      
      // Handle other checkboxes
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
      
      // Mark field as touched
      setTouched(prev => ({
        ...prev,
        [name]: true
      }));
      
      return;
    }
    
    // Update form data for other input types
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Mark field as touched
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof CustomerInfo]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };
  
  // Handle blur event for validation
  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name } = e.target;
    
    // Mark field as touched
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    
    // Skip validation for termsAccepted (will be validated on submit)
    if (name === 'termsAccepted') return;
    
    // Validate individual field
    validateField(name as keyof CustomerInfo | 'termsAccepted');
  };
  
  // Validate a single field
  const validateField = (field: keyof CustomerInfo | 'termsAccepted') => {
    // Handle termsAccepted field separately since it's not in the schema
    if (field === 'termsAccepted') {
      if (!termsAccepted) {
        setErrors(prev => ({
          ...prev,
          termsAccepted: "You must accept the terms and conditions"
        }));
        return false;
      } else {
        setErrors(prev => ({
          ...prev,
          termsAccepted: undefined
        }));
        return true;
      }
    }
    
    try {
      // Create a partial schema for just this field
      const fieldSchema = z.object({ [field]: customerSchema.shape[field] });
      fieldSchema.parse({ [field]: formData[field as keyof CustomerInfo] });
      
      // Clear error if validation passes
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
      
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Set the error message for this field
        const fieldError = error.errors.find(e => e.path[0] === field);
        if (fieldError) {
          setErrors(prev => ({
            ...prev,
            [field]: fieldError.message
          }));
        }
      }
      
      return false;
    }
  };
  
  // Validate the entire form
  const validateForm = (): boolean => {
    try {
      customerSchema.parse(formData);
      
      // Also validate terms acceptance since it's not in the schema
      if (!termsAccepted) {
        setErrors(prev => ({
          ...prev,
          termsAccepted: "You must accept the terms and conditions"
        }));
        return false;
      }
      
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Convert Zod errors to our error format
        const newErrors: Partial<Record<keyof CustomerInfo, string>> = {};
        
        error.errors.forEach(err => {
          const field = err.path[0] as keyof CustomerInfo;
          newErrors[field] = err.message;
        });
        
        setErrors(newErrors);
        
        // Mark all fields with errors as touched
        const newTouched: Partial<Record<keyof CustomerInfo, boolean>> = { ...touched };
        Object.keys(newErrors).forEach(key => {
          newTouched[key as keyof CustomerInfo] = true;
        });
        setTouched(newTouched);
      }
      
      return false;
    }
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Save customer information to context
      setCustomerInfo({
        ...formData
      });
      
      // Move to next step
      setCurrentStep(currentStep + 1);
    }
  };
  
  // Handle back button click
  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };
  
  // Get field error
  const getFieldError = (field: keyof CustomerInfo | 'termsAccepted'): string | undefined => {
    return errors[field];
  };
  
  return (
    <Container>
      <h2>Your Information</h2>
      <p>Please fill in your details to help us with your financial recovery case.</p>
      
      <Form onSubmit={handleSubmit}>
        <FieldRow>
          <FieldGroup>
            <Label htmlFor="firstName">First Name*</Label>
            <Input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              hasError={!!getFieldError('firstName')}
            />
            {getFieldError('firstName') && (
              <ErrorMessage>{getFieldError('firstName')}</ErrorMessage>
            )}
          </FieldGroup>
          
          <FieldGroup>
            <Label htmlFor="lastName">Last Name*</Label>
            <Input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              hasError={!!getFieldError('lastName')}
            />
            {getFieldError('lastName') && (
              <ErrorMessage>{getFieldError('lastName')}</ErrorMessage>
            )}
          </FieldGroup>
        </FieldRow>
        
        <FieldRow>
          <FieldGroup>
            <Label htmlFor="email">Email*</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              hasError={!!getFieldError('email')}
            />
            {getFieldError('email') && (
              <ErrorMessage>{getFieldError('email')}</ErrorMessage>
            )}
          </FieldGroup>
          
          <FieldGroup>
            <Label htmlFor="phone">Phone*</Label>
            <Input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              hasError={!!getFieldError('phone')}
              placeholder="1234567890"
            />
            {getFieldError('phone') && (
              <ErrorMessage>{getFieldError('phone')}</ErrorMessage>
            )}
          </FieldGroup>
        </FieldRow>
        
        <FieldGroup>
          <Label htmlFor="preferredContactMethod">Preferred Contact Method*</Label>
          <Select
            id="preferredContactMethod"
            name="preferredContactMethod"
            value={formData.preferredContactMethod}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <option value="email">Email</option>
            <option value="phone">Phone</option>
            <option value="text">Text</option>
          </Select>
          {getFieldError('preferredContactMethod') && (
            <ErrorMessage>{getFieldError('preferredContactMethod')}</ErrorMessage>
          )}
        </FieldGroup>
        
        {/* Financial Recovery Specific Fields */}
        <FieldGroup>
          <Label htmlFor="fraudType">Type of Financial Loss*</Label>
          <Select
            id="fraudType"
            name="fraudType"
            value={formData.fraudType}
            onChange={handleChange}
            onBlur={handleBlur}
            hasError={!!getFieldError('fraudType')}
          >
            <option value="investment_fraud">Investment Fraud</option>
            <option value="bank_fraud">Bank Fraud</option>
            <option value="credit_card_fraud">Credit Card Fraud</option>
            <option value="identity_theft">Identity Theft</option>
            <option value="pension_scam">Pension Scam</option>
            <option value="mortgage_fraud">Mortgage Fraud</option>
            <option value="insurance_fraud">Insurance Fraud</option>
            <option value="tax_fraud">Tax Fraud</option>
            <option value="other">Other</option>
          </Select>
          {getFieldError('fraudType') && (
            <ErrorMessage>{getFieldError('fraudType')}</ErrorMessage>
          )}
        </FieldGroup>
        
        <FieldGroup>
          <Label htmlFor="caseDescription">Please describe your case*</Label>
          <TextArea
            id="caseDescription"
            name="caseDescription"
            value={formData.caseDescription}
            onChange={handleChange}
            onBlur={handleBlur}
            hasError={!!getFieldError('caseDescription')}
            placeholder="Please provide details about your financial loss, including how it occurred and any steps you've already taken."
          />
          {getFieldError('caseDescription') && (
            <ErrorMessage>{getFieldError('caseDescription')}</ErrorMessage>
          )}
        </FieldGroup>
        
        <FieldRow>
          <FieldGroup>
            <Label htmlFor="approximateLossAmount">Approximate Loss Amount (£)*</Label>
            <Input
              type="text"
              id="approximateLossAmount"
              name="approximateLossAmount"
              value={formData.approximateLossAmount}
              onChange={handleChange}
              onBlur={handleBlur}
              hasError={!!getFieldError('approximateLossAmount')}
              placeholder="e.g. 5000"
            />
            {getFieldError('approximateLossAmount') && (
              <ErrorMessage>{getFieldError('approximateLossAmount')}</ErrorMessage>
            )}
          </FieldGroup>
          
          <FieldGroup>
            <Label htmlFor="incidentDate">When did the incident occur?</Label>
            <Input
              type="date"
              id="incidentDate"
              name="incidentDate"
              value={formData.incidentDate}
              onChange={handleChange}
              onBlur={handleBlur}
              hasError={!!getFieldError('incidentDate')}
            />
            {getFieldError('incidentDate') && (
              <ErrorMessage>{getFieldError('incidentDate')}</ErrorMessage>
            )}
          </FieldGroup>
        </FieldRow>
        
        <FieldGroup>
          <Label htmlFor="financialInstitution">Financial Institution Involved</Label>
          <Input
            type="text"
            id="financialInstitution"
            name="financialInstitution"
            value={formData.financialInstitution}
            onChange={handleChange}
            onBlur={handleBlur}
            hasError={!!getFieldError('financialInstitution')}
            placeholder="e.g. Bank name, Investment firm, etc."
          />
          {getFieldError('financialInstitution') && (
            <ErrorMessage>{getFieldError('financialInstitution')}</ErrorMessage>
          )}
        </FieldGroup>
        
        <FieldGroup>
          <Checkbox>
            <input
              type="checkbox"
              id="hasReportedToAuthorities"
              name="hasReportedToAuthorities"
              checked={formData.hasReportedToAuthorities}
              onChange={handleChange}
            />
            <Label htmlFor="hasReportedToAuthorities">
              I have already reported this incident to the relevant authorities (police, FCA, Action Fraud, etc.)
            </Label>
          </Checkbox>
        </FieldGroup>
        
        <FieldGroup>
          <Label htmlFor="isNewClient">New Client*</Label>
          <Checkbox>
            <input
              type="checkbox"
              id="isNewClient"
              name="isNewClient"
              checked={formData.isNewClient}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Label htmlFor="isNewClient">I am a new client</Label>
          </Checkbox>
        </FieldGroup>
        
        <FieldGroup>
          <Label htmlFor="additionalNotes">Additional Notes (Optional)</Label>
          <TextArea
            id="additionalNotes"
            name="additionalNotes"
            value={formData.additionalNotes || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Any other information that might help us with your case"
          />
        </FieldGroup>
        
        <Checkbox>
          <input
            type="checkbox"
            id="termsAccepted"
            name="termsAccepted"
            checked={termsAccepted}
            onChange={handleChange}
          />
          <Label htmlFor="termsAccepted">
            I agree to the terms and conditions and consent to my data being used to process my financial recovery claim*
            {getFieldError('termsAccepted') && (
              <ErrorMessage>{getFieldError('termsAccepted')}</ErrorMessage>
            )}
          </Label>
        </Checkbox>
        
        <ActionContainer>
          <Button type="button" onClick={handleBack}>
            Back
          </Button>
          <Button type="submit" isPrimary>
            Continue
          </Button>
        </ActionContainer>
      </Form>
    </Container>
  );
};

export default CustomerInformation; 
















