# Validation Schemas and Sacred Geometry

## Overview

In the Recovery Office booking system, validation schemas play a critical role in ensuring data integrity and providing a harmonious user experience. Our validation system is based on the [Zod](https://github.com/colinhacks/zod) validation library, enhanced with sacred geometry principles to create natural, balanced validation rules and timing.

## Sacred Geometry Integration

Sacred geometry principles are woven throughout our validation system in several key ways:

### 1. Fibonacci Sequence for Field Limitations

Field length restrictions follow the Fibonacci sequence (0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377...) to create natural, harmonious boundaries:

```typescript
// Example from confirmationStep.schema.ts
promoCode: z.string()
  .max(FIBONACCI[8], `Promo code cannot exceed ${FIBONACCI[8]} characters`)
  .optional(),

// Example from clientInformation.schema.ts  
additionalNotes: z.string()
  .max(FIBONACCI[13], `Additional notes cannot exceed ${FIBONACCI[13]} characters`)
  .optional(),
```

This creates a natural progression of size limitations (21 characters for promo codes, 233 for notes) that align with sacred proportions found in nature.

### 2. Golden Ratio (PHI) for Validation Timing

Validation timing is based on the Golden Ratio (PHI ≈ 1.618) and its inverse (PHI_INVERSE ≈ 0.618) to create naturally pleasing timing patterns:

```typescript
// Example from dateSelection.schema.ts
setTimeout(() => {
  // Validation logic
}, SACRED_TIMING.fast * PHI_INVERSE);
```

This creates a responsive yet natural feeling validation experience, where timing relates to the fundamental sacred proportions found throughout nature.

### 3. Fibonacci Backoff for Retry Logic

When validating against remote APIs, retry attempts follow a Fibonacci sequence timing pattern:

```typescript
// Example from apiRetry.ts
const fibonacciNumber = getFibonacciByIndex(attempt + 3);
let delay = options.baseDelay * fibonacciNumber * PHI_INVERSE;
```

This creates a naturally expanding delay between retries (2, 3, 5, 8, 13...), providing optimal spacing that feels balanced and proportional.

## Schema Implementation

Each booking step has its own dedicated validation schema implementing sacred geometry principles:

### Service Selection Schema

```typescript
// serviceSelection.schema.ts
export const serviceSelectionSchema = z.object({
  serviceId: z.string({
    required_error: "Please select a service",
  }).min(1, "Please select a service"),
  
  // Additional fields using Fibonacci constraints
});
```

### Date Selection Schema

```typescript
// dateSelection.schema.ts
export const dateSelectionSchema = z.object({
  selectedDate: z.string({
    required_error: "Please select a date",
  }).refine(val => {
    // Date validation logic with sacred timing
  }, "Please select a valid date"),
  
  selectedTimeSlot: z.string({
    required_error: "Please select a time slot",
  }).min(1, "Please select a time slot"),
  
  // Other fields with Fibonacci limits
});
```

### Client Information Schema

```typescript
// clientInformation.schema.ts
export const clientInformationSchema = z.object({
  firstName: z.string({
    required_error: "First name is required",
  }).min(2, "First name must be at least 2 characters")
    .max(FIBONACCI[9], "First name cannot exceed 34 characters"),
  
  // Additional fields using Fibonacci and PHI-based validation
});
```

### Confirmation Step Schema

```typescript
// confirmationStep.schema.ts
export const confirmationStepSchema = z.object({
  detailsConfirmed: z.literal(true, {
    errorMap: () => ({ message: "You must confirm the booking details" })
  }),
  
  // Payment and policy fields with sacred geometry validation
});
```

## Validation Process

The validation process incorporates sacred geometry in timing and structure:

1. **Field-Level Validation**: Each field is validated with PHI-based timing
2. **Form-Level Validation**: Complete forms follow Fibonacci-sequence timing
3. **Error Feedback**: Error messages appear with golden ratio timing
4. **Retry Logic**: API validation uses Fibonacci backoff patterns

## Implementation Example

Here's a complete example from the Confirmation step validation:

```typescript
/**
 * Field-specific validation for real-time feedback
 * Uses PHI-based timing for a natural, harmonious validation experience
 */
export const validateField = (field: keyof ConfirmationStepData, value: any): Promise<string | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      try {
        const fieldSchema = confirmationStepSchema.shape[field];
        fieldSchema.parse(value);
        resolve(null);
      } catch (error) {
        if (error instanceof z.ZodError) {
          resolve(error.errors[0]?.message || `Invalid ${field}`);
        } else {
          resolve(`Invalid ${field}`);
        }
      }
    }, SACRED_TIMING.fast * PHI_INVERSE); // Use PHI_INVERSE for quick yet harmonious response
  });
};
```

## Benefits

Our sacred geometry approach to validation provides several benefits:

1. **Natural User Experience**: Validation timing feels natural and harmonious
2. **Balanced Field Limits**: Character limits follow natural proportions
3. **Optimized Retry Logic**: Retries expand at natural intervals
4. **Harmony with Design**: Validation harmonizes with the layout's sacred geometry

## Integration with Sacred Timing

All validation timings are synchronized with our global sacred timing constants:

```typescript
// From sacred-geometry.ts
export const SACRED_TIMING = {
  fastest: FIBONACCI[4],           // 3ms
  faster: FIBONACCI[5],            // 5ms
  fast: FIBONACCI[6],              // 8ms
  normal: FIBONACCI[7],            // 13ms
  slow: FIBONACCI[8],              // 21ms
  slower: FIBONACCI[9],            // 34ms
  slowest: FIBONACCI[10],          // 55ms
  animation: {
    veryFast: FIBONACCI[7],        // 13ms
    fast: FIBONACCI[8],            // 21ms
    normal: FIBONACCI[9],          // 34ms
    slow: FIBONACCI[10],           // 55ms
    verySlow: FIBONACCI[11],       // 89ms
  }
};
```

## Implementation in Components

Components integrate with these validation schemas using custom hooks:

```typescript
// Example usage in DateSelectionStep.tsx
const { validateField, errors, resetErrors } = useBookingStepValidation(
  BookingStepId.DATE_SELECTION,
  dateSelectionSchema
);

// Later in the component
validateField('selectedDate', formattedDate);
```

This creates a cohesive system where validation, UI components, and business logic all follow the same sacred geometry principles, resulting in a naturally harmonious user experience.

## Advanced Validation with Sacred Geometry

Beyond basic field validation, we implement more advanced sacred geometry patterns:

### Nested Golden Rectangle Validation

For complex objects like addresses, we apply nested golden rectangle proportions:

```typescript
const addressSchema = z.object({
  street: z.string().max(FIBONACCI[10]), // 55 chars
  city: z.string().max(FIBONACCI[9]),    // 34 chars
  state: z.string().max(FIBONACCI[8]),   // 21 chars
  zip: z.string().max(FIBONACCI[6]),     // 8 chars
});
```

This creates a natural visual hierarchy when displayed in forms.

### Cross-Field Validation with PHI Relationships

Fields that relate to each other follow PHI-based relationships:

```typescript
z.object({
  // ...
}).refine(
  (data) => {
    // Validate that two fields follow a PHI relationship
    return data.field1.length <= data.field2.length * PHI_INVERSE;
  },
  {
    message: "Fields must maintain a harmonious relationship",
    path: ["field2"]
  }
);
```

## Conclusion

By applying sacred geometry principles to our validation system, we create a naturally balanced, harmonious experience for users. This approach seamlessly integrates with our overall sacred geometry design philosophy, creating a cohesive system that feels natural and intuitive. 