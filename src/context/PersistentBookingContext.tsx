import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

// Prevent multiple provider instances - SINGLETON PATTERN
let globalBookingState: any = null;
let globalBookingActions: any = null;
let globalStateSetters: any = null;

interface BookingData {
  selectedService: any | null;
  selectedDate: string | null;
  selectedTimeSlot: any | null;
  clientInfo: any | null;
  availableServices: any[];
  currentStep: number;
}

interface BookingActions {
  setSelectedService: (service: any) => void;
  setSelectedDate: (date: string) => void;
  setSelectedTimeSlot: (timeSlot: any) => void;
  setClientInfo: (clientInfo: any) => void;
  setAvailableServices: (services: any[]) => void;
  setCurrentStep: (step: number) => void;
  resetBooking: () => void;
}

const BookingContext = createContext<(BookingData & BookingActions) | null>(null);

export const PersistentBookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const instanceRef = useRef(Math.random().toString(36));
  
  // Initialize state only once globally
  const [bookingData, setBookingData] = useState<BookingData>(() => {
    if (globalBookingState) {
      console.log('[PersistentBooking] Using existing global state:', globalBookingState);
      return globalBookingState;
    }
    
    const initialState = {
      selectedService: null,
      selectedDate: null,
      selectedTimeSlot: null,
      clientInfo: null,
      availableServices: [],
      currentStep: 1
    };
    
    console.log('[PersistentBooking] Creating new global state:', initialState);
    globalBookingState = initialState;
    return initialState;
  });

  // Create persistent actions that update both local and global state
  const createPersistentActions = (): BookingActions => {
    return {
      setSelectedService: (service: any) => {
        console.log('[PersistentBooking] PERSISTENT: Setting service:', service?.name);
        const newState = { ...globalBookingState, selectedService: service };
        globalBookingState = newState;
        setBookingData(newState);
        
        // Also update all other instances
        if (globalStateSetters?.setBookingData) {
          globalStateSetters.setBookingData(newState);
        }
      },
      
      setSelectedDate: (date: string) => {
        console.log('[PersistentBooking] PERSISTENT: Setting date:', date);
        const newState = { ...globalBookingState, selectedDate: date };
        globalBookingState = newState;
        setBookingData(newState);
        
        if (globalStateSetters?.setBookingData) {
          globalStateSetters.setBookingData(newState);
        }
      },
      
      setSelectedTimeSlot: (timeSlot: any) => {
        console.log('[PersistentBooking] PERSISTENT: Setting time slot:', timeSlot);
        const newState = { ...globalBookingState, selectedTimeSlot: timeSlot };
        globalBookingState = newState;
        setBookingData(newState);
        
        if (globalStateSetters?.setBookingData) {
          globalStateSetters.setBookingData(newState);
        }
      },
      
      setClientInfo: (clientInfo: any) => {
        console.log('[PersistentBooking] PERSISTENT: Setting client info:', clientInfo);
        const newState = { ...globalBookingState, clientInfo };
        globalBookingState = newState;
        setBookingData(newState);
        
        if (globalStateSetters?.setBookingData) {
          globalStateSetters.setBookingData(newState);
        }
      },
      
      setAvailableServices: (services: any[]) => {
        console.log('[PersistentBooking] PERSISTENT: Setting available services:', services.length);
        const newState = { ...globalBookingState, availableServices: services };
        globalBookingState = newState;
        setBookingData(newState);
        
        if (globalStateSetters?.setBookingData) {
          globalStateSetters.setBookingData(newState);
        }
      },
      
      setCurrentStep: (step: number) => {
        console.log('[PersistentBooking] PERSISTENT: Setting current step:', step);
        const newState = { ...globalBookingState, currentStep: step };
        globalBookingState = newState;
        setBookingData(newState);
        
        if (globalStateSetters?.setBookingData) {
          globalStateSetters.setBookingData(newState);
        }
      },
      
      resetBooking: () => {
        console.log('[PersistentBooking] PERSISTENT: Resetting booking');
        const initialState = {
          selectedService: null,
          selectedDate: null,
          selectedTimeSlot: null,
          clientInfo: null,
          availableServices: [],
          currentStep: 1
        };
        globalBookingState = initialState;
        setBookingData(initialState);
        
        if (globalStateSetters?.setBookingData) {
          globalStateSetters.setBookingData(initialState);
        }
      }
    };
  };

  // Use singleton pattern for actions
  if (!globalBookingActions) {
    globalBookingActions = createPersistentActions();
    globalStateSetters = { setBookingData };
  }

  // Update global state setters reference
  useEffect(() => {
    globalStateSetters = { setBookingData };
  }, []);

  // Sync local state with global state on mount
  useEffect(() => {
    if (globalBookingState && JSON.stringify(bookingData) !== JSON.stringify(globalBookingState)) {
      console.log('[PersistentBooking] Syncing with global state');
      setBookingData(globalBookingState);
    }
  }, []);

  console.log('[PersistentBooking] Provider instance:', instanceRef.current, 'State:', {
    hasService: !!bookingData.selectedService,
    serviceName: bookingData.selectedService?.name,
    hasDate: !!bookingData.selectedDate,
    hasTime: !!bookingData.selectedTimeSlot,
    currentStep: bookingData.currentStep
  });

  const contextValue = {
    ...bookingData,
    ...globalBookingActions
  };

  return (
    <BookingContext.Provider value={contextValue}>
      {children}
    </BookingContext.Provider>
  );
};

export const usePersistentBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('usePersistentBooking must be used within PersistentBookingProvider');
  }
  return context;
};

export default PersistentBookingProvider; 