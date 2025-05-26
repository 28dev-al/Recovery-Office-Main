import { z } from 'zod';
import { clientInfoSchema } from '../clientInfo.schema';
import { dateSelectionSchema } from '../dateSelection.schema';
import { serviceSelectionSchema } from '../serviceSelection.schema';
import { confirmationStepSchema } from '../confirmationStep.schema';

describe('Client Info Schema Validation', () => {
  it('should validate valid client information', () => {
    const validClientInfo = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '555-123-4567',
      dateOfBirth: '1990-01-01',
      address: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      acceptedTerms: true,
      specialRequests: 'None'
    };

    const result = clientInfoSchema.safeParse(validClientInfo);
    expect(result.success).toBe(true);
  });

  it('should validate client info with minimum required fields', () => {
    const minimalClientInfo = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '555-123-4567',
      acceptedTerms: true
    };

    const result = clientInfoSchema.safeParse(minimalClientInfo);
    expect(result.success).toBe(true);
  });

  it('should reject invalid email formats', () => {
    const invalidEmail = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'not-an-email',
      phone: '555-123-4567',
      acceptedTerms: true
    };

    const result = clientInfoSchema.safeParse(invalidEmail);
    expect(result.success).toBe(false);
    
    if (!result.success) {
      expect(result.error.issues[0].path).toContain('email');
    }
  });

  it('should reject invalid phone formats', () => {
    const invalidPhone = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '123', // Too short
      acceptedTerms: true
    };

    const result = clientInfoSchema.safeParse(invalidPhone);
    expect(result.success).toBe(false);
    
    if (!result.success) {
      expect(result.error.issues[0].path).toContain('phone');
    }
  });

  it('should require terms acceptance', () => {
    const termsNotAccepted = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '555-123-4567',
      acceptedTerms: false
    };

    const result = clientInfoSchema.safeParse(termsNotAccepted);
    expect(result.success).toBe(false);
    
    if (!result.success) {
      expect(result.error.issues[0].path).toContain('acceptedTerms');
    }
  });

  it('should validate with optional date of birth if provided', () => {
    const withValidDOB = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '555-123-4567',
      dateOfBirth: '1990-01-01',
      acceptedTerms: true
    };

    const result = clientInfoSchema.safeParse(withValidDOB);
    expect(result.success).toBe(true);
  });

  it('should reject invalid date of birth formats', () => {
    const invalidDOB = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '555-123-4567',
      dateOfBirth: 'not-a-date',
      acceptedTerms: true
    };

    const result = clientInfoSchema.safeParse(invalidDOB);
    expect(result.success).toBe(false);
    
    if (!result.success) {
      expect(result.error.issues[0].path).toContain('dateOfBirth');
    }
  });
});

describe('Date Selection Schema Validation', () => {
  it('should validate valid date selection', () => {
    const validDateSelection = {
      selectedDate: '2023-05-15',
      selectedTimeSlotId: 'timeslot-123'
    };

    const result = dateSelectionSchema.safeParse(validDateSelection);
    expect(result.success).toBe(true);
  });

  it('should reject invalid date formats', () => {
    const invalidDate = {
      selectedDate: 'not-a-date',
      selectedTimeSlotId: 'timeslot-123'
    };

    const result = dateSelectionSchema.safeParse(invalidDate);
    expect(result.success).toBe(false);
    
    if (!result.success) {
      expect(result.error.issues[0].path).toContain('selectedDate');
    }
  });

  it('should reject missing time slot', () => {
    const missingTimeSlot = {
      selectedDate: '2023-05-15'
    };

    const result = dateSelectionSchema.safeParse(missingTimeSlot);
    expect(result.success).toBe(false);
    
    if (!result.success) {
      expect(result.error.issues[0].path).toContain('selectedTimeSlotId');
    }
  });

  it('should reject dates in the past', () => {
    const pastDate = {
      selectedDate: '2020-01-01', // Past date
      selectedTimeSlotId: 'timeslot-123'
    };

    const result = dateSelectionSchema.safeParse(pastDate);
    expect(result.success).toBe(false);
    
    if (!result.success) {
      expect(result.error.issues[0].path).toContain('selectedDate');
    }
  });

  it('should reject dates too far in the future', () => {
    // Calculate a date 6 months from now
    const sixMonthsLater = new Date();
    sixMonthsLater.setMonth(sixMonthsLater.getMonth() + 6);
    sixMonthsLater.setDate(sixMonthsLater.getDate() + 1); // Add one more day to exceed limit
    
    const futureDateString = sixMonthsLater.toISOString().split('T')[0];
    
    const farFutureDate = {
      selectedDate: futureDateString,
      selectedTimeSlotId: 'timeslot-123'
    };

    const result = dateSelectionSchema.safeParse(farFutureDate);
    expect(result.success).toBe(false);
    
    if (!result.success) {
      expect(result.error.issues[0].path).toContain('selectedDate');
    }
  });

  it('should reject empty time slot IDs', () => {
    const emptyTimeSlot = {
      selectedDate: '2023-05-15',
      selectedTimeSlotId: ''
    };

    const result = dateSelectionSchema.safeParse(emptyTimeSlot);
    expect(result.success).toBe(false);
    
    if (!result.success) {
      expect(result.error.issues[0].path).toContain('selectedTimeSlotId');
    }
  });
});

describe('Service Selection Schema Validation', () => {
  it('should validate valid service selection', () => {
    const validServiceSelection = {
      selectedServiceId: 'service-123',
      preferredDuration: 60,
      preferredPractitionerId: 'practitioner-456'
    };

    const result = serviceSelectionSchema.safeParse(validServiceSelection);
    expect(result.success).toBe(true);
  });

  it('should validate service selection with only required fields', () => {
    const minimalServiceSelection = {
      selectedServiceId: 'service-123'
    };

    const result = serviceSelectionSchema.safeParse(minimalServiceSelection);
    expect(result.success).toBe(true);
  });

  it('should reject missing service ID', () => {
    const missingServiceId = {
      preferredDuration: 60
    };

    const result = serviceSelectionSchema.safeParse(missingServiceId);
    expect(result.success).toBe(false);
    
    if (!result.success) {
      expect(result.error.issues[0].path).toContain('selectedServiceId');
    }
  });

  it('should reject empty service ID', () => {
    const emptyServiceId = {
      selectedServiceId: ''
    };

    const result = serviceSelectionSchema.safeParse(emptyServiceId);
    expect(result.success).toBe(false);
    
    if (!result.success) {
      expect(result.error.issues[0].path).toContain('selectedServiceId');
    }
  });

  it('should validate with optional duration if provided', () => {
    const withDuration = {
      selectedServiceId: 'service-123',
      preferredDuration: 90
    };

    const result = serviceSelectionSchema.safeParse(withDuration);
    expect(result.success).toBe(true);
  });

  it('should validate with optional practitioner if provided', () => {
    const withPractitioner = {
      selectedServiceId: 'service-123',
      preferredPractitionerId: 'practitioner-456'
    };

    const result = serviceSelectionSchema.safeParse(withPractitioner);
    expect(result.success).toBe(true);
  });

  it('should reject invalid duration values', () => {
    const invalidDuration = {
      selectedServiceId: 'service-123',
      preferredDuration: -30 // Negative duration
    };

    const result = serviceSelectionSchema.safeParse(invalidDuration);
    expect(result.success).toBe(false);
    
    if (!result.success) {
      expect(result.error.issues[0].path).toContain('preferredDuration');
    }
  });
});

describe('Confirmation Step Schema Validation', () => {
  it('should validate valid confirmation details', () => {
    const validConfirmation = {
      paymentMethod: 'credit_card',
      paymentIntentId: 'pi_123456789',
      acceptedCancellationPolicy: true
    };

    const result = confirmationStepSchema.safeParse(validConfirmation);
    expect(result.success).toBe(true);
  });

  it('should validate confirmation with only required fields', () => {
    const minimalConfirmation = {
      paymentMethod: 'pay_at_appointment',
      acceptedCancellationPolicy: true
    };

    const result = confirmationStepSchema.safeParse(minimalConfirmation);
    expect(result.success).toBe(true);
  });

  it('should require payment intent ID for credit card payments', () => {
    const missingPaymentIntent = {
      paymentMethod: 'credit_card',
      acceptedCancellationPolicy: true
    };

    const result = confirmationStepSchema.safeParse(missingPaymentIntent);
    expect(result.success).toBe(false);
    
    if (!result.success) {
      expect(result.error.issues[0].path).toContain('paymentIntentId');
    }
  });

  it('should not require payment intent ID for pay at appointment', () => {
    const payAtAppointment = {
      paymentMethod: 'pay_at_appointment',
      acceptedCancellationPolicy: true
    };

    const result = confirmationStepSchema.safeParse(payAtAppointment);
    expect(result.success).toBe(true);
  });

  it('should reject when cancellation policy not accepted', () => {
    const policyNotAccepted = {
      paymentMethod: 'pay_at_appointment',
      acceptedCancellationPolicy: false
    };

    const result = confirmationStepSchema.safeParse(policyNotAccepted);
    expect(result.success).toBe(false);
    
    if (!result.success) {
      expect(result.error.issues[0].path).toContain('acceptedCancellationPolicy');
    }
  });

  it('should reject invalid payment methods', () => {
    const invalidPaymentMethod = {
      paymentMethod: 'invalid_method',
      acceptedCancellationPolicy: true
    };

    const result = confirmationStepSchema.safeParse(invalidPaymentMethod);
    expect(result.success).toBe(false);
    
    if (!result.success) {
      expect(result.error.issues[0].path).toContain('paymentMethod');
    }
  });

  it('should validate with optional notes if provided', () => {
    const withNotes = {
      paymentMethod: 'pay_at_appointment',
      acceptedCancellationPolicy: true,
      additionalNotes: 'Please call before appointment'
    };

    const result = confirmationStepSchema.safeParse(withNotes);
    expect(result.success).toBe(true);
  });
}); 











