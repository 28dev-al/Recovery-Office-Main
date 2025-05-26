import { BookingStepId } from '../types/booking.types';

/**
 * Booking steps definition
 * Each step in the booking process with its ID, label, and optional description
 * Follows a logical progression from service selection to booking confirmation
 */
export const BOOKING_STEPS = [
  {
    id: BookingStepId.SERVICE_SELECTION,
    label: 'Select Service',
    description: 'Choose the service that best fits your needs'
  },
  {
    id: BookingStepId.DATE_SELECTION,
    label: 'Select Date & Time',
    description: 'Pick a convenient date and time for your appointment'
  },
  {
    id: BookingStepId.CLIENT_INFORMATION,
    label: 'Your Information',
    description: 'Provide your personal and contact details'
  },
  {
    id: BookingStepId.CONFIRMATION,
    label: 'Confirm & Pay',
    description: 'Review your booking and complete payment'
  },
  {
    id: BookingStepId.SUCCESS,
    label: 'Success',
    description: 'Your booking is confirmed'
  }
];

/**
 * Payment method options
 * Available payment methods for booking confirmation
 */
export const PAYMENT_METHODS = [
  {
    id: 'credit_card',
    label: 'Credit Card',
    description: 'Pay securely with your credit card'
  },
  {
    id: 'paypal',
    label: 'PayPal',
    description: 'Pay using your PayPal account'
  }
];

/**
 * Booking form default values
 * Initial values for the booking form
 */
export const DEFAULT_BOOKING_FORM_VALUES = {
  serviceId: '',
  practitionerId: '',
  date: '',
  timeSlot: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  dateOfBirth: '',
  address: {
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'US'
  },
  specialRequests: '',
  healthInformation: '',
  emergencyContact: {
    name: '',
    phone: '',
    relationship: ''
  },
  termsAccepted: false,
  cancellationPolicyAccepted: false,
  paymentMethod: '',
  paymentIntentId: '',
  marketingOptIn: false
};

/**
 * Booking time slot format options
 * For formatting time slots in the UI
 */
export const TIME_SLOT_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
  hour: 'numeric',
  minute: 'numeric',
  hour12: true
};

/**
 * Booking date format options
 * For formatting dates in the UI
 */
export const DATE_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
};

/**
 * Booking minimum date
 * Minimum date allowed for booking (today)
 */
export const BOOKING_MIN_DATE = new Date();

/**
 * Booking maximum date
 * Maximum date allowed for booking (90 days from today)
 */
export const BOOKING_MAX_DATE = new Date(
  new Date().setDate(new Date().getDate() + 90)
);

/**
 * Cancellation policy timeframe in hours
 * How many hours before the appointment a cancellation is allowed without fees
 */
export const CANCELLATION_POLICY_HOURS = 24;

/**
 * Cancellation fee percentage
 * Percentage of the service cost charged as a cancellation fee
 */
export const CANCELLATION_FEE_PERCENTAGE = 50; 





