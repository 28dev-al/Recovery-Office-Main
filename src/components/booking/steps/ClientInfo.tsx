/**
 * ClientInfo Component
 * 
 * Reusable component for collecting client information in the booking flow.
 * Uses sacred geometry principles for form layout and spacing.
 */

import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { Box } from '../../../design-system/components/layout/Box';
import { Flex } from '../../../design-system/components/layout/Flex';
import { Heading } from '../../../design-system/components/typography/Heading';
import { Button } from '../../../design-system/components/button/Button';
import { ErrorMessage } from '../../../design-system/components/feedback/ErrorMessage';
import { SACRED_SPACING, SACRED_RADIUS } from '../../../constants/sacred-geometry';
import { ClientInformation } from '../../../types/booking.types';

// Define prop interfaces for styled components to prevent type errors
interface FormInputProps {
  hasError?: boolean;
}

/**
 * Styled form label
 */
const FormLabel = styled.label`
  display: block;
  margin-bottom: ${SACRED_SPACING.xs}px;
  font-weight: 500;
  color: ${props => props.theme.colors.text.primary};
`;

/**
 * Styled form input with error state styling
 */
const FormInput = styled.input<FormInputProps>`
  width: 100%;
  padding: ${SACRED_SPACING.sm}px ${SACRED_SPACING.md}px;
  border-radius: ${SACRED_RADIUS.sm}px;
  border: 1px solid ${props => 
    props.hasError 
      ? props.theme.colors.error.main 
      : props.theme.colors.border.light
  };
  font-size: 1rem;
  background-color: #FFFFFF;
  
  &:focus {
    outline: none;
    border-color: ${props => 
      props.hasError 
        ? props.theme.colors.error.main 
        : props.theme.colors.primary[500]
    };
    box-shadow: 0 0 0 2px ${props => 
      props.hasError 
        ? props.theme.colors.error.light 
        : props.theme.colors.primary[200]
    };
  }
`;

/**
 * Styled textarea with error state styling
 */
const FormTextArea = styled.textarea<FormInputProps>`
  width: 100%;
  padding: ${SACRED_SPACING.sm}px ${SACRED_SPACING.md}px;
  border-radius: ${SACRED_RADIUS.sm}px;
  border: 1px solid ${props => 
    props.hasError 
      ? props.theme.colors.error.main 
      : props.theme.colors.border.light
  };
  min-height: 100px;
  font-family: inherit;
  font-size: 1rem;
  background-color: #FFFFFF;
  
  &:focus {
    outline: none;
    border-color: ${props => 
      props.hasError 
        ? props.theme.colors.error.main 
        : props.theme.colors.primary[500]
    };
    box-shadow: 0 0 0 2px ${props => 
      props.hasError 
        ? props.theme.colors.error.light 
        : props.theme.colors.primary[200]
    };
  }
`;

/**
 * Styled form section
 */
const FormSection = styled(Box)`
  margin-bottom: ${SACRED_SPACING.lg}px;
`;

/**
 * Styled form row
 */
const FormRow = styled(Flex)`
  margin-bottom: ${SACRED_SPACING.md}px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

/**
 * Styled form group
 */
const FormGroup = styled(Box)`
  margin-bottom: ${SACRED_SPACING.md}px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

/**
 * Props for the ClientInfo component
 */
interface ClientInfoProps {
  initialData?: ClientInformation;
  onSubmit: (data: ClientInformation) => void;
  onCancel?: () => void;
  className?: string;
}

/**
 * ClientInfo Component
 * Collects detailed information about the client
 */
const ClientInfo: React.FC<ClientInfoProps> = ({
  initialData,
  onSubmit,
  onCancel,
  className
}) => {
  // Form state with default values
  const [formData, setFormData] = useState<ClientInformation>({
    firstName: initialData?.firstName || '',
    lastName: initialData?.lastName || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    preferredContactMethod: initialData?.preferredContactMethod || 'email',
    isNewClient: initialData?.isNewClient !== undefined ? initialData.isNewClient : true,
    additionalNotes: initialData?.additionalNotes || ''
  });
  
  // Form validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  // Validate form data
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };
  
  return (
    <Box className={className} data-testid="client-info-form">
      <form onSubmit={handleSubmit} noValidate>
        <FormSection>
          <Heading as="h3" style={{ marginBottom: '1rem' }}>
            Personal Information
          </Heading>
          
          <FormRow flexDirection="column" style={{ marginLeft: '-0.5rem', marginRight: '-0.5rem' }}>
            <FormGroup flex="1" padding="0 0.5rem">
              <FormLabel htmlFor="firstName">First Name *</FormLabel>
              <FormInput
                id="firstName"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                hasError={!!errors.firstName}
                aria-invalid={!!errors.firstName}
                aria-describedby={errors.firstName ? "firstName-error" : undefined}
                required
              />
              {errors.firstName && (
                <ErrorMessage id="firstName-error">{errors.firstName}</ErrorMessage>
              )}
            </FormGroup>
            
            <FormGroup flex="1" padding="0 0.5rem">
              <FormLabel htmlFor="lastName">Last Name *</FormLabel>
              <FormInput
                id="lastName"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                hasError={!!errors.lastName}
                aria-invalid={!!errors.lastName}
                aria-describedby={errors.lastName ? "lastName-error" : undefined}
                required
              />
              {errors.lastName && (
                <ErrorMessage id="lastName-error">{errors.lastName}</ErrorMessage>
              )}
            </FormGroup>
          </FormRow>
          
          <FormGroup>
            <FormLabel htmlFor="email">Email Address *</FormLabel>
            <FormInput
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              hasError={!!errors.email}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              required
            />
            {errors.email && (
              <ErrorMessage id="email-error">{errors.email}</ErrorMessage>
            )}
          </FormGroup>
          
          <FormGroup>
            <FormLabel htmlFor="phone">Phone Number *</FormLabel>
            <FormInput
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              hasError={!!errors.phone}
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "phone-error" : undefined}
              required
            />
            {errors.phone && (
              <ErrorMessage id="phone-error">{errors.phone}</ErrorMessage>
            )}
          </FormGroup>
          
          <FormGroup>
            <FormLabel htmlFor="additionalNotes">Additional Notes</FormLabel>
            <FormTextArea
              id="additionalNotes"
              name="additionalNotes"
              value={formData.additionalNotes || ''}
              onChange={handleChange}
              hasError={!!errors.additionalNotes}
              aria-invalid={!!errors.additionalNotes}
              aria-describedby={errors.additionalNotes ? "additionalNotes-error" : undefined}
            />
            {errors.additionalNotes && (
              <ErrorMessage id="additionalNotes-error">{errors.additionalNotes}</ErrorMessage>
            )}
          </FormGroup>
        </FormSection>
        
        <Flex justifyContent="space-between" style={{ marginTop: `${SACRED_SPACING.lg}px` }}>
          {onCancel && (
            <Button 
              type="button" 
              variant="outline"
              onClick={onCancel}
            >
              Back
            </Button>
          )}
          
          <Button 
            type="submit" 
            variant="primary"
            style={{ marginLeft: onCancel ? 'auto' : '0' }}
          >
            Continue
          </Button>
        </Flex>
      </form>
    </Box>
  );
};

export default ClientInfo; 












