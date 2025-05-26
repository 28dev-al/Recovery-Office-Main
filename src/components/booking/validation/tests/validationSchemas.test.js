"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var clientInfo_schema_1 = require("../clientInfo.schema");
var dateSelection_schema_1 = require("../dateSelection.schema");
var serviceSelection_schema_1 = require("../serviceSelection.schema");
var confirmationStep_schema_1 = require("../confirmationStep.schema");
describe('Client Info Schema Validation', function () {
    it('should validate valid client information', function () {
        var validClientInfo = {
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
        var result = clientInfo_schema_1.clientInfoSchema.safeParse(validClientInfo);
        expect(result.success).toBe(true);
    });
    it('should validate client info with minimum required fields', function () {
        var minimalClientInfo = {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            phone: '555-123-4567',
            acceptedTerms: true
        };
        var result = clientInfo_schema_1.clientInfoSchema.safeParse(minimalClientInfo);
        expect(result.success).toBe(true);
    });
    it('should reject invalid email formats', function () {
        var invalidEmail = {
            firstName: 'John',
            lastName: 'Doe',
            email: 'not-an-email',
            phone: '555-123-4567',
            acceptedTerms: true
        };
        var result = clientInfo_schema_1.clientInfoSchema.safeParse(invalidEmail);
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.issues[0].path).toContain('email');
        }
    });
    it('should reject invalid phone formats', function () {
        var invalidPhone = {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            phone: '123', // Too short
            acceptedTerms: true
        };
        var result = clientInfo_schema_1.clientInfoSchema.safeParse(invalidPhone);
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.issues[0].path).toContain('phone');
        }
    });
    it('should require terms acceptance', function () {
        var termsNotAccepted = {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            phone: '555-123-4567',
            acceptedTerms: false
        };
        var result = clientInfo_schema_1.clientInfoSchema.safeParse(termsNotAccepted);
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.issues[0].path).toContain('acceptedTerms');
        }
    });
    it('should validate with optional date of birth if provided', function () {
        var withValidDOB = {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            phone: '555-123-4567',
            dateOfBirth: '1990-01-01',
            acceptedTerms: true
        };
        var result = clientInfo_schema_1.clientInfoSchema.safeParse(withValidDOB);
        expect(result.success).toBe(true);
    });
    it('should reject invalid date of birth formats', function () {
        var invalidDOB = {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            phone: '555-123-4567',
            dateOfBirth: 'not-a-date',
            acceptedTerms: true
        };
        var result = clientInfo_schema_1.clientInfoSchema.safeParse(invalidDOB);
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.issues[0].path).toContain('dateOfBirth');
        }
    });
});
describe('Date Selection Schema Validation', function () {
    it('should validate valid date selection', function () {
        var validDateSelection = {
            selectedDate: '2023-05-15',
            selectedTimeSlotId: 'timeslot-123'
        };
        var result = dateSelection_schema_1.dateSelectionSchema.safeParse(validDateSelection);
        expect(result.success).toBe(true);
    });
    it('should reject invalid date formats', function () {
        var invalidDate = {
            selectedDate: 'not-a-date',
            selectedTimeSlotId: 'timeslot-123'
        };
        var result = dateSelection_schema_1.dateSelectionSchema.safeParse(invalidDate);
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.issues[0].path).toContain('selectedDate');
        }
    });
    it('should reject missing time slot', function () {
        var missingTimeSlot = {
            selectedDate: '2023-05-15'
        };
        var result = dateSelection_schema_1.dateSelectionSchema.safeParse(missingTimeSlot);
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.issues[0].path).toContain('selectedTimeSlotId');
        }
    });
    it('should reject dates in the past', function () {
        var pastDate = {
            selectedDate: '2020-01-01', // Past date
            selectedTimeSlotId: 'timeslot-123'
        };
        var result = dateSelection_schema_1.dateSelectionSchema.safeParse(pastDate);
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.issues[0].path).toContain('selectedDate');
        }
    });
    it('should reject dates too far in the future', function () {
        // Calculate a date 6 months from now
        var sixMonthsLater = new Date();
        sixMonthsLater.setMonth(sixMonthsLater.getMonth() + 6);
        sixMonthsLater.setDate(sixMonthsLater.getDate() + 1); // Add one more day to exceed limit
        var futureDateString = sixMonthsLater.toISOString().split('T')[0];
        var farFutureDate = {
            selectedDate: futureDateString,
            selectedTimeSlotId: 'timeslot-123'
        };
        var result = dateSelection_schema_1.dateSelectionSchema.safeParse(farFutureDate);
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.issues[0].path).toContain('selectedDate');
        }
    });
    it('should reject empty time slot IDs', function () {
        var emptyTimeSlot = {
            selectedDate: '2023-05-15',
            selectedTimeSlotId: ''
        };
        var result = dateSelection_schema_1.dateSelectionSchema.safeParse(emptyTimeSlot);
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.issues[0].path).toContain('selectedTimeSlotId');
        }
    });
});
describe('Service Selection Schema Validation', function () {
    it('should validate valid service selection', function () {
        var validServiceSelection = {
            selectedServiceId: 'service-123',
            preferredDuration: 60,
            preferredPractitionerId: 'practitioner-456'
        };
        var result = serviceSelection_schema_1.serviceSelectionSchema.safeParse(validServiceSelection);
        expect(result.success).toBe(true);
    });
    it('should validate service selection with only required fields', function () {
        var minimalServiceSelection = {
            selectedServiceId: 'service-123'
        };
        var result = serviceSelection_schema_1.serviceSelectionSchema.safeParse(minimalServiceSelection);
        expect(result.success).toBe(true);
    });
    it('should reject missing service ID', function () {
        var missingServiceId = {
            preferredDuration: 60
        };
        var result = serviceSelection_schema_1.serviceSelectionSchema.safeParse(missingServiceId);
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.issues[0].path).toContain('selectedServiceId');
        }
    });
    it('should reject empty service ID', function () {
        var emptyServiceId = {
            selectedServiceId: ''
        };
        var result = serviceSelection_schema_1.serviceSelectionSchema.safeParse(emptyServiceId);
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.issues[0].path).toContain('selectedServiceId');
        }
    });
    it('should validate with optional duration if provided', function () {
        var withDuration = {
            selectedServiceId: 'service-123',
            preferredDuration: 90
        };
        var result = serviceSelection_schema_1.serviceSelectionSchema.safeParse(withDuration);
        expect(result.success).toBe(true);
    });
    it('should validate with optional practitioner if provided', function () {
        var withPractitioner = {
            selectedServiceId: 'service-123',
            preferredPractitionerId: 'practitioner-456'
        };
        var result = serviceSelection_schema_1.serviceSelectionSchema.safeParse(withPractitioner);
        expect(result.success).toBe(true);
    });
    it('should reject invalid duration values', function () {
        var invalidDuration = {
            selectedServiceId: 'service-123',
            preferredDuration: -30 // Negative duration
        };
        var result = serviceSelection_schema_1.serviceSelectionSchema.safeParse(invalidDuration);
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.issues[0].path).toContain('preferredDuration');
        }
    });
});
describe('Confirmation Step Schema Validation', function () {
    it('should validate valid confirmation details', function () {
        var validConfirmation = {
            paymentMethod: 'credit_card',
            paymentIntentId: 'pi_123456789',
            acceptedCancellationPolicy: true
        };
        var result = confirmationStep_schema_1.confirmationStepSchema.safeParse(validConfirmation);
        expect(result.success).toBe(true);
    });
    it('should validate confirmation with only required fields', function () {
        var minimalConfirmation = {
            paymentMethod: 'pay_at_appointment',
            acceptedCancellationPolicy: true
        };
        var result = confirmationStep_schema_1.confirmationStepSchema.safeParse(minimalConfirmation);
        expect(result.success).toBe(true);
    });
    it('should require payment intent ID for credit card payments', function () {
        var missingPaymentIntent = {
            paymentMethod: 'credit_card',
            acceptedCancellationPolicy: true
        };
        var result = confirmationStep_schema_1.confirmationStepSchema.safeParse(missingPaymentIntent);
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.issues[0].path).toContain('paymentIntentId');
        }
    });
    it('should not require payment intent ID for pay at appointment', function () {
        var payAtAppointment = {
            paymentMethod: 'pay_at_appointment',
            acceptedCancellationPolicy: true
        };
        var result = confirmationStep_schema_1.confirmationStepSchema.safeParse(payAtAppointment);
        expect(result.success).toBe(true);
    });
    it('should reject when cancellation policy not accepted', function () {
        var policyNotAccepted = {
            paymentMethod: 'pay_at_appointment',
            acceptedCancellationPolicy: false
        };
        var result = confirmationStep_schema_1.confirmationStepSchema.safeParse(policyNotAccepted);
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.issues[0].path).toContain('acceptedCancellationPolicy');
        }
    });
    it('should reject invalid payment methods', function () {
        var invalidPaymentMethod = {
            paymentMethod: 'invalid_method',
            acceptedCancellationPolicy: true
        };
        var result = confirmationStep_schema_1.confirmationStepSchema.safeParse(invalidPaymentMethod);
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.issues[0].path).toContain('paymentMethod');
        }
    });
    it('should validate with optional notes if provided', function () {
        var withNotes = {
            paymentMethod: 'pay_at_appointment',
            acceptedCancellationPolicy: true,
            additionalNotes: 'Please call before appointment'
        };
        var result = confirmationStep_schema_1.confirmationStepSchema.safeParse(withNotes);
        expect(result.success).toBe(true);
    });
});
