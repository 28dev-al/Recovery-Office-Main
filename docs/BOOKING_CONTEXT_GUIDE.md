# BookingContext Implementation Guide

## Overview

The BookingContext provides state management for the entire booking system, managing user interactions, API connections, and data flow throughout the booking process. It implements sacred geometry principles for timing, animations, and layout proportions.

## Sacred Geometry Implementation

The BookingContext leverages several sacred geometry principles:

1. **Golden Ratio (PHI) Based Timing**: Animations and transitions use PHI (≈1.618) to create visually pleasing, natural-feeling interactions.
2. **Fibonacci Sequence for Delays**: API request delays and retries follow Fibonacci sequence intervals for a natural rhythm.
3. **Sacred Timing Constants**: Uses predefined sacred timing constants like SACRED_TIMING.normal, SACRED_TIMING.slow, etc.
4. **Proportional Error Handling**: Error handling follows Golden Ratio principles in its timeout proportions.

## Core State Structure

The BookingContext maintains a comprehensive state object:

```typescript
interface ExtendedBookingFormState {
  currentStep: BookingStepId;
  availableServices: ServiceOption[];
  availableTimeSlots: TimeSlot[];
  availableDates: BookingDate[];
  completedSteps: Set<BookingStepId>;
  selectedService?: ServiceOption;
  selectedDate?: string;
  selectedTimeSlot?: BookingTimeSlot;
  selectedTime?: string;
  customerInfo?: ClientInformation;
  loading: boolean;
  loadingState: LoadingState;
  apiError: ApiErrorState | null;
  bookingComplete: boolean;
  bookingReference?: string;
}
```

## Key Features

1. **Resource-Specific Loading States**: Tracks loading state for each API resource (services, dates, timeSlots, etc.)
2. **Granular Error Handling**: Categorizes and handles API errors by resource type
3. **Step Validation**: Validates each booking step before proceeding to the next
4. **API Interaction Layer**: Provides a clean interface to the booking service API
5. **Sacred Timing Integration**: Uses sacred geometry principles for timings

## Usage Patterns

### Basic Context Usage

```typescript
import { useBooking } from '@context/BookingContext';

function MyComponent() {
  const { 
    state, 
    goToNextStep, 
    selectService,
    isResourceLoading 
  } = useBooking();
  
  // Access state values
  const { currentStep, selectedService } = state;
  
  // Check if resources are loading
  const isLoadingServices = isResourceLoading('services');
  
  // Use actions
  const handleServiceSelect = (service) => {
    selectService(service);
    goToNextStep();
  };
  
  return (
    // Component JSX
  );
}
```

### API Data Fetching

```typescript
const { 
  fetchAvailableServices, 
  fetchAvailableDates,
  isResourceLoading,
  hasApiError,
  getApiErrorForResource
} = useBooking();

// Load data on component mount
useEffect(() => {
  fetchAvailableServices();
}, [fetchAvailableServices]);

// Handle loading states
if (isResourceLoading('services')) {
  return <LoadingSpinner />;
}

// Handle errors
const serviceError = getApiErrorForResource('services');
if (serviceError) {
  return <ErrorMessage message={serviceError} />;
}
```

### Form Submission

```typescript
const { submitBooking } = useBooking();

const handleSubmit = async (formData) => {
  try {
    const bookingReference = await submitBooking(
      serviceData,
      clientData,
      confirmationData
    );
    // Handle success
  } catch (error) {
    // Handle error
  }
};
```

## Step Navigation

The BookingContext provides methods for navigating between booking steps:

```typescript
const { 
  goToStep,
  goToNextStep,
  goToPreviousStep,
  canProceedToStep
} = useBooking();

// Check if user can proceed to a specific step
const canGoToConfirmation = canProceedToStep(BookingStepId.CONFIRMATION);

// Navigate directly to a step
const handleGoToDateSelection = () => {
  goToStep(BookingStepId.DATE_SELECTION);
};

// Navigate to next/previous step
const handleNext = () => goToNextStep();
const handleBack = () => goToPreviousStep();
```

## API Error Handling

The BookingContext provides comprehensive error handling:

```typescript
const {
  hasApiError,
  getApiErrorForResource,
  isResourceLoading
} = useBooking();

// Component code
if (hasApiError()) {
  const datesError = getApiErrorForResource('dates');
  if (datesError) {
    return (
      <ErrorDisplay
        title="Unable to load dates"
        message={datesError}
        actionItems={[{ label: "Try Again", onClick: handleRetry }]}
      />
    );
  }
}
```

## Sacred Geometry Integration

The BookingContext uses sacred geometry principles throughout:

1. **Toast Notification Duration**: Uses `SACRED_TIMING.slow` for success messages and `SACRED_TIMING.normal` for info messages
2. **Loading States**: Follows Fibonacci sequence for loading state transitions
3. **Animation Timing**: Uses PHI-based timing for transitions between steps

## Implementation Patterns by Step

### Service Selection Step

```typescript
const { availableServices, selectedService, selectService } = useBooking();

// Handle service selection
const handleServiceSelect = (service) => {
  selectService(service);
};
```

### Date Selection Step

```typescript
const { 
  selectedService, 
  selectedDate, 
  selectDate,
  fetchAvailableDates 
} = useBooking();

// Load dates when service changes
useEffect(() => {
  if (selectedService?.id) {
    fetchAvailableDates('', '', selectedService.id);
  }
}, [selectedService, fetchAvailableDates]);

// Handle date selection
const handleDateSelect = (date) => {
  selectDate(date.toISOString());
};
```

### Client Information Step

```typescript
const { clientInfo, setClientInfo } = useBooking();

// Update client information
const handleClientInfoChange = (info) => {
  setClientInfo(info);
};
```

### Confirmation Step

```typescript
const { 
  selectedService, 
  selectedDate, 
  selectedTimeSlot, 
  clientInfo, 
  submitBooking 
} = useBooking();

// Submit booking
const handleSubmit = async () => {
  if (selectedService && selectedDate && selectedTimeSlot && clientInfo) {
    try {
      await submitBooking(
        { serviceId: selectedService.id, date: selectedDate },
        clientInfo,
        {} // confirmation data
      );
    } catch (error) {
      // Handle error
    }
  }
};
```

## Provider Setup

The BookingProvider must wrap any components that need access to the booking state:

```typescript
// In your app layout
import { BookingProvider } from '@context/BookingContext';

function App() {
  return (
    <BookingProvider>
      <BookingInterface />
    </BookingProvider>
  );
}
```

## Best Practices

1. **Always use destructuring** to get only the needed values and functions from the context
2. **Memoize handlers** that update context state to prevent unnecessary re-renders
3. **Handle loading and error states** for each API resource
4. **Use the correct action methods** for each state update (e.g., selectService instead of direct state manipulation)
5. **Validate steps** before proceeding to the next one
6. **Check canProceedToStep** before enabling navigation buttons
7. **Follow sacred timing principles** for animations and transitions 