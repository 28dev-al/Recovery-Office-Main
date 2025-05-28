import { useState, useCallback } from 'react';

// Define proper types instead of 'any'
interface ServiceData {
  _id: string;
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  category: string;
}

interface ClientInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  preferredContactMethod?: string;
  fraudType?: string;
  approximateLossAmount?: string;
  additionalNotes?: string;
  [key: string]: unknown;
}

// CRITICAL: Use a single global state reference
let GLOBAL_BOOKING_STATE: {
  selectedService: ServiceData | null;
  selectedDate: string | null;
  selectedTimeSlot: string | null;
  clientInfo: ClientInfo | null;
  currentStep: number;
} = {
  selectedService: null,
  selectedDate: null,
  selectedTimeSlot: null,
  clientInfo: null,
  currentStep: 1
};

// CRITICAL: Global state setters that update the single reference
const GLOBAL_SETTERS = {
  setService: (service: ServiceData | null) => {
    console.log('[GlobalState] Setting service:', service?.name);
    GLOBAL_BOOKING_STATE = { ...GLOBAL_BOOKING_STATE, selectedService: service };
    console.log('[GlobalState] New state after service:', GLOBAL_BOOKING_STATE);
  },

  setDate: (date: string) => {
    console.log('[GlobalState] Setting date:', date);
    GLOBAL_BOOKING_STATE = { ...GLOBAL_BOOKING_STATE, selectedDate: date };
    console.log('[GlobalState] New state after date:', GLOBAL_BOOKING_STATE);
  },

  setTimeSlot: (timeSlot: string) => {
    console.log('[GlobalState] Setting time slot:', timeSlot);
    GLOBAL_BOOKING_STATE = { ...GLOBAL_BOOKING_STATE, selectedTimeSlot: timeSlot };
    console.log('[GlobalState] New state after time slot:', GLOBAL_BOOKING_STATE);
  },

  setClientInfo: (clientInfo: ClientInfo | null) => {
    console.log('[GlobalState] Setting client info:', clientInfo);
    GLOBAL_BOOKING_STATE = { ...GLOBAL_BOOKING_STATE, clientInfo };
    console.log('[GlobalState] New state after client info:', GLOBAL_BOOKING_STATE);
  },

  setStep: (step: number) => {
    console.log('[GlobalState] Setting step:', step);
    GLOBAL_BOOKING_STATE = { ...GLOBAL_BOOKING_STATE, currentStep: step };
    console.log('[GlobalState] New state after step:', GLOBAL_BOOKING_STATE);
  }
};

export const useBookingState = () => {
  // Force re-render trigger
  const [, forceUpdate] = useState({});
  const triggerUpdate = () => forceUpdate({});

  const setSelectedService = useCallback((service: ServiceData | null) => {
    GLOBAL_SETTERS.setService(service);
    triggerUpdate();
  }, []);

  const setSelectedDate = useCallback((date: string) => {
    GLOBAL_SETTERS.setDate(date);
    triggerUpdate();
  }, []);

  const setSelectedTimeSlot = useCallback((timeSlot: string) => {
    GLOBAL_SETTERS.setTimeSlot(timeSlot);
    triggerUpdate();
  }, []);

  const setClientInfo = useCallback((clientInfo: ClientInfo | null) => {
    GLOBAL_SETTERS.setClientInfo(clientInfo);
    triggerUpdate();
  }, []);

  const setCurrentStep = useCallback((step: number) => {
    GLOBAL_SETTERS.setStep(step);
    triggerUpdate();
  }, []);

  const validateStep = useCallback((step: number): boolean => {
    console.log('[GlobalState] Validating step', step, 'with state:', GLOBAL_BOOKING_STATE);

    switch (step) {
      case 1: return true;
      case 2: return !!GLOBAL_BOOKING_STATE.selectedService;
      case 3: return !!(GLOBAL_BOOKING_STATE.selectedService && GLOBAL_BOOKING_STATE.selectedDate && GLOBAL_BOOKING_STATE.selectedTimeSlot);
      case 4: return !!(GLOBAL_BOOKING_STATE.selectedService && GLOBAL_BOOKING_STATE.selectedDate && GLOBAL_BOOKING_STATE.selectedTimeSlot && GLOBAL_BOOKING_STATE.clientInfo);
      default: return false;
    }
  }, []);

  const resetBooking = useCallback(() => {
    console.log('[GlobalState] Resetting booking');
    GLOBAL_BOOKING_STATE = {
      selectedService: null,
      selectedDate: null,
      selectedTimeSlot: null,
      clientInfo: null,
      currentStep: 1
    };
    triggerUpdate();
  }, []);

  // Return the current global state
  return {
    ...GLOBAL_BOOKING_STATE,
    setSelectedService,
    setSelectedDate,
    setSelectedTimeSlot,
    setClientInfo,
    setCurrentStep,
    validateStep,
    resetBooking
  };
}; 