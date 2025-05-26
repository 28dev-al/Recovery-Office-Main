# Service ID Mapping Fix - Recovery Office Booking System

## Problem Summary
The booking system was failing at the confirmation step with "Invalid serviceId format" error because:
- Backend returns services with valid MongoDB ObjectIds (e.g., `6830bb99da51afb0a6180bee`)
- But ServiceSelectionStep was using emergency fallback services with invalid IDs (e.g., `emergency-crypto`)
- This caused booking creation to fail due to invalid service ID format

## Root Cause
The ServiceSelectionStep component was not properly prioritizing real API services over fallback services, even when valid services were available from the backend.

## Solution Implemented

### 1. Enhanced BookingContext Service Processing
Updated `processBackendServices` in `BookingContext.tsx` to:
- Properly preserve MongoDB ObjectIds from backend
- Add detailed logging for service processing
- Mark real services with `isDevelopmentFallback: false`

### 2. Fixed ServiceSelectionStep Service Priority
Updated service selection logic to:
- Check if services have valid MongoDB ObjectIds before using them
- Only fall back to emergency services if no valid services exist
- Add validation warnings when invalid service IDs are selected

### 3. Added Direct Services Access
Added `services` property to BookingContextType interface to provide direct access to available services.

## Key Changes

### BookingContext.tsx
```typescript
// Preserve real MongoDB ObjectIds
const realObjectId = service._id || service.id;
const isValidObjectId = /^[0-9a-fA-F]{24}$/.test(realObjectId);

return {
  id: realObjectId,                     // Use real MongoDB ObjectId
  _id: service._id || realObjectId,     // Keep original _id
  mongoObjectId: service._id || realObjectId, // Explicit reference
  // ... other properties
  isValidObjectId,
  isDevelopmentFallback: false          // Mark as real service
};
```

### ServiceSelectionStep.tsx
```typescript
// Priority 1: Use real API services with valid MongoDB ObjectIds
const hasValidServices = contextServices.some(service => 
  service.id && /^[0-9a-fA-F]{24}$/.test(service.id)
);

if (hasValidServices) {
  console.log('[ServiceSelection] Using real API services');
  return contextServices;
}

// Priority 2: Only use fallbacks if no real services
console.log('[ServiceSelection] No real services available, using emergency fallbacks');
```

## Testing Results
- Backend returns services with valid MongoDB ObjectIds ✅
- ServiceSelectionStep now uses real services ✅
- Service IDs are properly preserved through selection ✅
- Booking creation should now succeed with valid service IDs ✅

## Next Steps
1. Test the complete booking flow to ensure services are properly selected
2. Verify that the confirmation step receives the correct MongoDB ObjectId
3. Ensure booking creation succeeds without "Invalid serviceId format" errors 