/**
 * Booking Context
 * 
 * Provides booking state management for the entire application.
 * Implements sacred geometry principles for timing and animations.
 */

import * as React from 'react';
import { 
  createContext, 
  useContext, 
  useReducer, 
  ReactNode, 
  useCallback, 
  useEffect,
  useState,
  useRef
} from 'react';
import { 
  BookingFormState, 
  BookingAction, 
  BookingActionType,
  BookingStepId,
  ServiceOption,
  BookingTimeSlot,
  ClientInformation,
  BookingDate,
  CompleteBookingData,
  canProceedToNextStep
} from '../types/booking.types';

import { TimeSlot } from '../types/api.types';
import { ServiceType as UnifiedServiceType, mapCategoryToServiceType } from '../types/service.types';
import { categorizeError } from '../utils/apiUtils';
import { useToast } from '../hooks/useToast';
import { bookingService } from '../services/booking';
import { ClientInformationData } from '../components/booking/validation/clientInformation.schema';
import { ServiceSelectionData } from '../components/booking/validation/serviceSelection.schema';
import { ConfirmationStepData } from '../components/booking/validation/confirmationStep.schema';

// CRITICAL: Add global context instance management to prevent infinite mounting
let globalBookingContextInstance: BookingContextType | null = null;
let globalContextMountCount = 0;

// More specific loading state tracking
interface LoadingState {
  services: boolean;
  dates: boolean;
  timeSlots: boolean;
  booking: boolean;
  cancellation: boolean;
  rescheduling: boolean;
  paymentIntent: boolean;
}

// Extended state to track API errors
interface ApiErrorState {
  code?: string;
  message?: string;
  details?: Record<string, unknown>;
  resource?: string;
}

// Extended action types for more specific API state management
/* eslint-disable @typescript-eslint/no-unused-vars */
enum ExtendedBookingActionType {
  SET_AVAILABLE_SERVICES = 'SET_AVAILABLE_SERVICES',
  SET_AVAILABLE_TIME_SLOTS = 'SET_AVAILABLE_TIME_SLOTS',
  SET_API_ERROR = 'SET_API_ERROR',
  CLEAR_API_ERROR = 'CLEAR_API_ERROR',
  SET_LOADING_RESOURCE = 'SET_LOADING_RESOURCE',
}
/* eslint-enable @typescript-eslint/no-unused-vars */

// Extended action type that includes API-specific actions
type ContextBookingAction = BookingAction | {
  type: ExtendedBookingActionType.SET_AVAILABLE_SERVICES;
  payload: ServiceOption[];
} | {
  type: ExtendedBookingActionType.SET_AVAILABLE_TIME_SLOTS;
  payload: TimeSlot[];
} | {
  type: ExtendedBookingActionType.SET_API_ERROR;
  payload: ApiErrorState;
} | {
  type: ExtendedBookingActionType.CLEAR_API_ERROR;
} | {
  type: ExtendedBookingActionType.SET_LOADING_RESOURCE;
  payload: {
    resource: keyof LoadingState;
    isLoading: boolean;
  };
};

// Extended form state with API-specific states
interface ExtendedBookingFormState extends BookingFormState {
  availableServices: ServiceOption[];
  availableTimeSlots: TimeSlot[];
  loadingState: LoadingState;
  apiError: ApiErrorState | null;
  bookingComplete: boolean;
  bookingReference?: string;
  selectedService?: ServiceOption;
  selectedDate?: string;
  selectedTime?: string;
  customerInfo?: ClientInformation;
}

// Initial state for the booking context
const initialBookingState: ExtendedBookingFormState = {
  currentStep: BookingStepId.SERVICE_SELECTION,
  loading: false,
  availableDates: [],
  availableServices: [],
  availableTimeSlots: [],
  completedSteps: new Set(),
  loadingState: {
    services: false,
    dates: false,
    timeSlots: false,
    booking: false,
    cancellation: false,
    rescheduling: false,
    paymentIntent: false,
  },
  apiError: null,
  bookingComplete: false,
};

/**
 * Main BookingContext interface that defines all available methods and state
 */
/* eslint-disable @typescript-eslint/no-unused-vars */
export interface BookingContextType {
  state: ExtendedBookingFormState;
  // Navigation actions
  goToStep: (stepId: BookingStepId) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  // Data actions
  selectService: (service: ServiceOption) => void;
  selectDate: (date: string) => void;
  selectTimeSlot: (timeSlot: BookingTimeSlot) => void;
  setClientInfo: (clientInfo: ClientInformation) => void;
  // State management
  setAvailableDates: (dates: BookingDate[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string) => void;
  clearError: () => void;
  completeStep: (stepId: BookingStepId) => void;
  setBookingReference: (reference: string) => void;
  resetForm: () => void;
  // API actions
  fetchAvailableServices: (forceRefresh?: boolean) => Promise<void>;
  fetchAvailableDates: (startDate: string, endDate: string, serviceType?: string, forceRefresh?: boolean) => Promise<void>;
  fetchAvailableTimeSlots: (date: string, serviceType: string, forceRefresh?: boolean) => Promise<void>;
  submitBooking: (
    serviceData: ServiceSelectionData,
    clientData: ClientInformationData,
    confirmationData: ConfirmationStepData
  ) => Promise<string>;
  cancelBooking: (bookingId: string, reason?: string) => Promise<void>;
  rescheduleBooking: (bookingId: string, newDate: string, newTimeSlot: string) => Promise<void>;
  createPaymentIntent: (serviceType: UnifiedServiceType, duration: number) => Promise<{ clientSecret: string, paymentIntentId: string }>;
  // Helper methods
  canProceedToStep: (stepId: BookingStepId) => boolean;
  getCompleteBookingData: () => CompleteBookingData | null;
  isResourceLoading: (resource: keyof LoadingState) => boolean;
  hasApiError: () => boolean;
  getApiErrorForResource: (resource: string) => string | null;
  // Direct access to services
  services: ServiceOption[];
  // Backward compatibility properties for components that use old pattern
  currentStep: BookingStepId;
  nextStep: () => void;
  previousStep: () => void;
  selectedServices: ServiceOption[];
  selectedService: ServiceOption | undefined;
  setSelectedService: (service: ServiceOption) => void;
  selectedDate: string | undefined;
  setSelectedDate: (date: string) => void;
  selectedTime: string | undefined;
  setSelectedTime: (time: string) => void;
  setCurrentStep: (step: BookingStepId) => void;
  customerInfo: ClientInformation | undefined;
  setCustomerInfo: (info: ClientInformation) => void;
  completeBooking: () => Promise<void>;
  bookingComplete: boolean;
  bookingReference: string | undefined;
  updateFormData: (data: Record<string, unknown>) => void;
  recoverFromError: () => boolean;
  // Add utility methods
  clearCache: () => void;
  refreshServices: () => Promise<void>;
}
/* eslint-enable @typescript-eslint/no-unused-vars */

// Create the context with undefined initial value
const BookingContext = createContext<BookingContextType | undefined>(undefined);

/**
 * Custom error logger for booking context
 * Provides detailed error information for debugging
 */
function logContextError(component: string, error: unknown, additionalInfo: Record<string, unknown> = {}) {
  console.error(`[BookingContext:${component}] Error:`, error);
  
  // Log with stack trace if available
  if (error instanceof Error) {
    console.error(`[BookingContext:${component}] Error details:`, {
      message: error.message,
      stack: error.stack,
      name: error.name,
      ...additionalInfo
    });
  } else {
    console.error(`[BookingContext:${component}] Unknown error type:`, String(error), additionalInfo);
  }
  
  // Log browser and environment information for debugging
  console.debug(`[BookingContext:${component}] Environment:`, {
    userAgent: navigator.userAgent,
    url: window.location.href,
    timestamp: new Date().toISOString()
  });
}

// Enhanced reducer for booking state
function bookingReducer(state: ExtendedBookingFormState, action: ContextBookingAction): ExtendedBookingFormState {
  switch (action.type) {
    case BookingActionType.SET_STEP:
      return {
        ...state,
        currentStep: action.payload,
      };
    
    case BookingActionType.SELECT_SERVICE:
      return {
        ...state,
        selectedService: action.payload,
        completedSteps: new Set(Array.from(state.completedSteps).concat([BookingStepId.SERVICE_SELECTION])),
      };
    
    case BookingActionType.SELECT_DATE:
      return {
        ...state,
        selectedDate: action.payload,
        // Don't mark as complete until time slot is also selected
      };
    
    case BookingActionType.SELECT_TIME_SLOT:
      return {
        ...state,
        selectedTimeSlot: action.payload,
        selectedTime: action.payload.startTime, // Add for backward compatibility
        completedSteps: new Set(Array.from(state.completedSteps).concat([BookingStepId.DATE_SELECTION])),
      };
    
    case BookingActionType.SET_CLIENT_INFO:
      return {
        ...state,
        clientInfo: action.payload,
        customerInfo: action.payload, // Add for backward compatibility
        completedSteps: new Set(Array.from(state.completedSteps).concat([BookingStepId.CLIENT_INFORMATION])),
      };
    
    case BookingActionType.SET_AVAILABLE_DATES:
      return {
        ...state,
        availableDates: action.payload,
      };
    
    case BookingActionType.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    
    case BookingActionType.SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    
    case BookingActionType.CLEAR_ERROR:
      return {
        ...state,
        error: undefined,
      };
    
    case BookingActionType.COMPLETE_STEP:
      return {
        ...state,
        completedSteps: new Set(Array.from(state.completedSteps).concat([action.payload])),
      };

    case BookingActionType.SET_BOOKING_REFERENCE:
      return {
        ...state,
        bookingReference: action.payload,
        bookingComplete: true,
      };
    
    case BookingActionType.RESET_FORM:
      return {
        ...initialBookingState,
      };
    
    case ExtendedBookingActionType.SET_AVAILABLE_SERVICES:
      return {
        ...state,
        availableServices: action.payload,
      };
    
    case ExtendedBookingActionType.SET_AVAILABLE_TIME_SLOTS:
      return {
        ...state,
        availableTimeSlots: action.payload,
      };
    
    case ExtendedBookingActionType.SET_API_ERROR:
      return {
        ...state,
        apiError: action.payload,
      };
    
    case ExtendedBookingActionType.CLEAR_API_ERROR:
      return {
        ...state,
        apiError: null,
      };
    
    case ExtendedBookingActionType.SET_LOADING_RESOURCE:
      return {
        ...state,
        loadingState: {
          ...state.loadingState,
          [action.payload.resource]: action.payload.isLoading,
        },
      };
    
    default:
      return state;
  }
}

interface BookingProviderProps {
  children: ReactNode;
}

// Provider component for the booking context
export const BookingProvider: React.FC<BookingProviderProps> = ({ 
  children 
}) => {
  const currentMountId = useRef(++globalContextMountCount);

  // CRITICAL: Prevent multiple simultaneous instances
  if (globalBookingContextInstance && currentMountId.current > 1) {
    console.warn(`🚨 [BookingContext] Preventing duplicate mount #${currentMountId.current} - using existing instance`);
    return React.createElement(
      BookingContext.Provider,
      { value: globalBookingContextInstance },
      children
    );
  }

  console.log(`[BookingContext] 🚀 Creating SINGLE instance (Mount #${currentMountId.current})`);
  
  // Get toast utilities with error handling
  let errorToast: (title: string, message: string) => void;
  let successToast: (title: string, message: string) => void;

  try {
    const toastUtils = useToast();
    errorToast = toastUtils.errorToast;
    successToast = toastUtils.successToast;
  } catch (error) {
    logContextError("useToast", error);
    // Fallback toast functions that log to console
    errorToast = (title: string, message: string) => {
      console.error(`[Toast Error] ${title}: ${message}`);
    };
    successToast = (title: string, message: string) => {
      console.log(`[Toast Success] ${title}: ${message}`);
    };
  }
  
  // Ensure the initial state is properly set with all required properties
  const safeInitialState: ExtendedBookingFormState = {
    ...initialBookingState,
    currentStep: BookingStepId.SERVICE_SELECTION,
    loading: false,
    availableDates: [],
    availableServices: [],
    availableTimeSlots: [],
    completedSteps: new Set(),
    loadingState: {
      services: false,
      dates: false,
      timeSlots: false,
      booking: false,
      cancellation: false,
      rescheduling: false,
      paymentIntent: false,
    },
    apiError: null,
    bookingComplete: false,
  };
  
  // Initialize reducer with safe default state
  const [state, dispatch] = useReducer(bookingReducer, safeInitialState);
  
  // CRITICAL: Add controlled fetching flags
  const [isInitialized, setIsInitialized] = useState(false);
  const [fetchInProgress, setFetchInProgress] = useState(false);
  const initializationAttempts = useRef(0);
  const [lastFetchTime, setLastFetchTime] = useState(0);
  const [initializationComplete, setInitializationComplete] = useState(false);
  
  const CACHE_DURATION = 60000; // 1 minute cache
  
  // CRITICAL: Declare helper functions BEFORE fetchAvailableServices
  
  // Create fallback services for development
  const createFallbackServices = useCallback((): ServiceOption[] => {
    console.log('[BookingContext] 🔧 Creating fallback services for development...');
    return [
      {
        id: 'fallback-crypto',
        _id: 'fallback-crypto',
        mongoObjectId: 'fallback-crypto',
        name: 'Cryptocurrency Recovery',
        description: 'Specialized recovery for lost or stolen cryptocurrency',
        duration: 75,
        price: 750,
        formattedPrice: '£750',
        formattedDuration: '1 hour 15 minutes',
        category: 'recovery',
        type: UnifiedServiceType.CRYPTOCURRENCY_RECOVERY,
        icon: '/icons/services/crypto.svg',
        isActive: true,
        availableForNewClients: true,
        isValidObjectId: false,
        isDevelopmentFallback: true,
        debugInfo: {
          fallbackService: true,
          processedAt: new Date().toISOString()
        }
      },
      {
        id: 'fallback-fraud',
        _id: 'fallback-fraud',
        mongoObjectId: 'fallback-fraud',
        name: 'Investment Fraud Recovery',
        description: 'Comprehensive recovery service for investment fraud cases',
        duration: 90,
        price: 500,
        formattedPrice: '£500',
        formattedDuration: '1 hour 30 minutes',
        category: 'recovery',
        type: UnifiedServiceType.INVESTMENT_FRAUD_RECOVERY,
        icon: '/icons/services/fraud.svg',
        isActive: true,
        availableForNewClients: true,
        isValidObjectId: false,
        isDevelopmentFallback: true,
        debugInfo: {
          fallbackService: true,
          processedAt: new Date().toISOString()
        }
      },
      {
        id: 'fallback-consultation',
        _id: 'fallback-consultation',
        mongoObjectId: 'fallback-consultation',
        name: 'Initial Consultation',
        description: 'Comprehensive assessment of your recovery case',
        duration: 60,
        price: 0,
        formattedPrice: 'Free',
        formattedDuration: '1 hour',
        category: 'consultation',
        type: UnifiedServiceType.INITIAL_CONSULTATION,
        icon: '/icons/services/consultation.svg',
        isActive: true,
        availableForNewClients: true,
        isValidObjectId: false,
        isDevelopmentFallback: true,
        debugInfo: {
          fallbackService: true,
          processedAt: new Date().toISOString()
        }
      },
      {
        id: 'fallback-investigation',
        _id: 'fallback-investigation',
        mongoObjectId: 'fallback-investigation',
        name: 'Financial Investigation',
        description: 'Comprehensive financial investigation services',
        duration: 120,
        price: 600,
        formattedPrice: '£600',
        formattedDuration: '2 hours',
        category: 'investigation',
        type: UnifiedServiceType.FINANCIAL_INVESTIGATION,
        icon: '/icons/services/investigation.svg',
        isActive: true,
        availableForNewClients: true,
        isValidObjectId: false,
        isDevelopmentFallback: true,
        debugInfo: {
          fallbackService: true,
          processedAt: new Date().toISOString()
        }
      }
    ];
  }, []);

  // Process backend services function
  const processBackendServices = useCallback((backendServices: unknown[]): ServiceOption[] => {
    console.log('[BookingContext] Processing backend services:', backendServices.length);

    return backendServices.map((service: any, index: number) => {
      // Extract real MongoDB ObjectId - prioritize _id over id
      const realObjectId = service._id || service.id;
      const isValidObjectId = /^[0-9a-fA-F]{24}$/.test(realObjectId);

      console.log(`[BookingContext] Processing service ${index + 1}:`, {
        name: service.name,
        _id: service._id,
        id: service.id,
        realObjectId,
        isValidObjectId
      });

      // Map category to ServiceType using helper function
      const serviceType = mapCategoryToServiceType(service.category || service.type || 'recovery');

      // CRITICAL: Preserve the real MongoDB ObjectId
      return {
        id: realObjectId,                     // Use real MongoDB ObjectId
        _id: service._id || realObjectId,     // Keep original _id
        mongoObjectId: service._id || realObjectId, // Explicit reference
        name: service.name || `Service ${index + 1}`,
        description: service.description || 'Recovery service',
        duration: service.duration || 60,
        price: service.price || 500,
        formattedPrice: service.formattedPrice || `£${service.price || 500}`,
        formattedDuration: service.formattedDuration || `${service.duration || 60} minutes`,
        icon: service.icon || '/default-icon.png',
        category: service.category || 'recovery',
        type: serviceType,
        isActive: service.isActive !== false,
        availableForNewClients: true,
        isValidObjectId,
        isDevelopmentFallback: false          // Mark as real service, not fallback
      } as ServiceOption;
    });
  }, []);

  // CRITICAL: Controlled service fetching with graceful fallbacks - DECLARE BEFORE USE
  const fetchAvailableServices = useCallback(async (forceRefresh: boolean = false) => {
    // Prevent duplicate fetches
    if (fetchInProgress) {
      console.log('[BookingContext] 🔄 Fetch already in progress - skipping');
      return;
    }

    // Use cached services unless force refresh
    if (!forceRefresh && state.availableServices.length > 0 && Date.now() - lastFetchTime < CACHE_DURATION) {
      console.log('[BookingContext] ✅ Using cached services');
      return;
    }

    // Prevent excessive initialization attempts
    if (initializationAttempts.current >= 3) {
      console.warn('[BookingContext] ⚠️ Maximum initialization attempts reached - using fallback services');
      const fallbackServices = createFallbackServices();
      // Use dispatch directly instead of setAvailableServices
      dispatch({ type: ExtendedBookingActionType.SET_AVAILABLE_SERVICES, payload: fallbackServices });
      setIsInitialized(true);
      return;
    }

    initializationAttempts.current++;

    try {
      setFetchInProgress(true);
      // Use dispatch directly instead of setResourceLoading
      dispatch({
        type: ExtendedBookingActionType.SET_LOADING_RESOURCE,
        payload: { resource: 'services', isLoading: true }
      });
      // Use dispatch directly instead of clearApiError
      dispatch({ type: ExtendedBookingActionType.CLEAR_API_ERROR });
      
      console.log('[BookingContext] === FETCHING SERVICES START ===');
      console.log('[BookingContext] 📡 Fetching services from API...');
      
      const { apiClient } = await import('../services/api');
      const response = await apiClient.getServices();
      
      console.log('[BookingContext] Raw API response:', response);
      console.log('[BookingContext] Response structure check:');
      console.log('  - response.data exists:', !!(response && typeof response === 'object' && 'data' in response));
      console.log('  - response.data.data exists:', !!(response && typeof response === 'object' && 'data' in response && 
                  response.data && typeof response.data === 'object' && 'data' in response.data));
      console.log('  - response.data type:', response && typeof response === 'object' && 'data' in response ? 
                  typeof (response as any).data : 'undefined');

      // FIX: Handle both possible response formats
      let servicesArray: any[] | null = null;

      // Check if services are in response.data.data (wrapped format)
      if (response && typeof response === 'object' && 'data' in response && 
          response.data && typeof response.data === 'object' && 'data' in response.data && 
          Array.isArray((response.data as any).data)) {
        console.log('[BookingContext] ✅ Found services in response.data.data format');
        servicesArray = (response.data as any).data;
      }
      // Check if services are directly in response.data (direct format)  
      else if (response && typeof response === 'object' && 'data' in response && 
               Array.isArray((response as any).data)) {
        console.log('[BookingContext] ✅ Found services in response.data format');
        servicesArray = (response as any).data;
      }
      // Check if the entire response is the services array
      else if (Array.isArray(response)) {
        console.log('[BookingContext] ✅ Found services in direct response format');
        servicesArray = response;
      }

      if (servicesArray && servicesArray.length > 0) {
        console.log(`[BookingContext] Processing ${servicesArray.length} services from API`);
        
        // Validate first service has MongoDB ObjectId
        const firstService = servicesArray[0];
        console.log('[BookingContext] First service validation:', {
          hasId: !!firstService.id,
          hasMongoId: !!firstService._id,
          idLength: firstService.id?.length,
          isValidObjectId: /^[0-9a-fA-F]{24}$/.test(firstService.id || firstService._id)
        });
        
        // Process services with graceful fallbacks
        const backendServices = servicesArray;
        
        if (backendServices.length > 0) {
          console.log('[BookingContext] Processing backend services...');
          const processedServices = processBackendServices(backendServices);
          
          console.log('[BookingContext] === PROCESSED SERVICES DEBUG ===');
          processedServices.forEach((service, index) => {
            console.log(`[BookingContext] Service ${index + 1}:`, {
              name: service.name,
              id: service.id,
              isValidObjectId: service.isValidObjectId,
              isDevelopmentFallback: service.isDevelopmentFallback
            });
          });
          
          console.log(`✅ [BookingContext] Services processed: ${processedServices.length}`);
          
          // Use dispatch directly instead of setAvailableServices
          dispatch({ type: ExtendedBookingActionType.SET_AVAILABLE_SERVICES, payload: processedServices });
          console.log('[BookingContext] Services set in state:', processedServices.length);
          setIsInitialized(true);
          setLastFetchTime(Date.now());
        } else {
          console.warn('[BookingContext] No services returned from API');
          throw new Error('No services available');
        }
      } else {
        console.warn('[BookingContext] Invalid response data format:', response);
        throw new Error(`No valid services found in API response. Response structure: ${JSON.stringify(response, null, 2)}`);
      }

    } catch (err: unknown) {
      console.error('❌ [BookingContext] Service fetch failed:', err);
      
      // CRITICAL: Don't crash on fetch errors
      const errorMessage = err instanceof Error ? err.message : String(err);
      if (!errorMessage.includes('Rate limited')) {
        errorToast('Failed to load services', 'Using fallback services for now');
        
        // Provide fallback services for development
        const fallbackServices = createFallbackServices();
        // Use dispatch directly instead of setAvailableServices
        dispatch({ type: ExtendedBookingActionType.SET_AVAILABLE_SERVICES, payload: fallbackServices });
        setIsInitialized(true);
      }
    } finally {
      setFetchInProgress(false);
      // Use dispatch directly instead of setResourceLoading
      dispatch({
        type: ExtendedBookingActionType.SET_LOADING_RESOURCE,
        payload: { resource: 'services', isLoading: false }
      });
      setInitializationComplete(true);
      console.log('[BookingContext] === FETCHING SERVICES END ===');
    }
  }, [fetchInProgress, state.availableServices.length, lastFetchTime, errorToast, createFallbackServices, processBackendServices]);
  
  useEffect(() => {
    // Log successful provider initialization
    console.log("[BookingContext] Provider mounted, initial state:", {
      currentStep: state.currentStep,
      loadingState: state.loadingState,
      hasError: state.apiError !== null || state.error !== undefined,
      mountId: currentMountId.current
    });
    
    // Mark as initialized
    setIsInitialized(true);
    
    return () => {
      console.log(`[BookingContext] 🧹 Unmounting instance (Mount #${currentMountId.current})`);
      if (currentMountId.current === globalContextMountCount) {
        globalBookingContextInstance = null;
        console.log('[BookingContext] Cleared global instance');
      }
    };
  }, [state]);
  
  // CRITICAL: Fetch services on mount
  useEffect(() => {
    console.log('[BookingContext] === INITIAL SERVICES FETCH ===');
    console.log('[BookingContext] isInitialized:', isInitialized);
    console.log('[BookingContext] initializationComplete:', initializationComplete);
    console.log('[BookingContext] availableServices.length:', state.availableServices.length);
    
    if (isInitialized && !initializationComplete && state.availableServices.length === 0) {
      console.log('[BookingContext] 🚀 Triggering initial service fetch...');
      fetchAvailableServices();
    }
  }, [isInitialized, initializationComplete, state.availableServices.length, fetchAvailableServices]);
  
  // Recovery mechanism for corrupted state
  const recoverFromError = useCallback(() => {
    console.info('[BookingContext] Attempting to recover from booking context error');
    
    try {
      // Reset form state to initial values
      dispatch({ type: BookingActionType.RESET_FORM });
      
      // Clear any localStorage data that might be corrupted
      try {
        localStorage.removeItem('recovery_office_booking');
      } catch (storageError) {
        console.warn('[BookingContext] Could not access localStorage:', storageError);
      }
      
      // Show a toast to inform the user
      successToast(
        "Booking Reset", 
        "The booking process has been reset due to an error. Please try again."
      );
      
      return true;
    } catch (error) {
      logContextError("recoverFromError", error);
      return false;
    }
  }, [successToast]);
  
  // Handle initialization errors with retries
  useEffect(() => {
    if (!isInitialized && initializationAttempts.current < 3) {
      console.log(`[BookingContext] Initialization attempt ${initializationAttempts.current + 1}`);
      initializationAttempts.current += 1;
      
      // If we've tried multiple times and still not initialized, try recovery
      if (initializationAttempts.current >= 2) {
        console.warn('[BookingContext] Multiple initialization attempts failed, trying recovery');
        recoverFromError();
      }
    }
  }, [isInitialized, recoverFromError]);
  
  // Safely wrap API operations with error handling
  const safeApiCall = useCallback(async <T,>(
    operation: () => Promise<T>,
    operationName: string,
    loadingResource?: keyof LoadingState
  ): Promise<T | null> => {
    // Set loading state if resource name provided
    if (loadingResource) {
      try {
        dispatch({
          type: ExtendedBookingActionType.SET_LOADING_RESOURCE,
          payload: { resource: loadingResource, isLoading: true }
        });
      } catch (error) {
        logContextError(`safeApiCall:${operationName}:setLoading`, error);
      }
    }
    
    try {
      console.log(`[BookingContext] Starting API operation: ${operationName}`);
      const result = await operation();
      console.log(`[BookingContext] API operation successful: ${operationName}`);
      return result;
    } catch (error) {
      logContextError(`safeApiCall:${operationName}`, error);
      
      // Attempt to categorize and display the error
      try {
        const apiError = categorizeError(error);
        setApiError({
          code: apiError.code,
          message: apiError.message,
          details: apiError.details,
          resource: loadingResource || 'unknown'
        });
      } catch (metaError) {
        logContextError(`safeApiCall:${operationName}:errorHandling`, metaError);
        // Fallback error handling if categorizeError fails
        errorToast("Operation Failed", "An unexpected error occurred. Please try again.");
      }
      
      return null;
    } finally {
      // Reset loading state if resource name provided
      if (loadingResource) {
        try {
          dispatch({
            type: ExtendedBookingActionType.SET_LOADING_RESOURCE,
            payload: { resource: loadingResource, isLoading: false }
          });
        } catch (error) {
          logContextError(`safeApiCall:${operationName}:clearLoading`, error);
        }
      }
    }
  }, [errorToast]);
  
  // Step navigation methods
  const goToStep = useCallback((stepId: BookingStepId) => {
    dispatch({ type: BookingActionType.SET_STEP, payload: stepId });
  }, []);
  
  const goToNextStep = useCallback(() => {
    const { currentStep } = state;
    const nextStepId = currentStep + 1;
    
    // Validate that next step is valid
    if (nextStepId <= BookingStepId.SUCCESS) {
      goToStep(nextStepId as BookingStepId);
    }
  }, [state, goToStep]);
  
  const goToPreviousStep = useCallback(() => {
    const { currentStep } = state;
    const prevStepId = currentStep - 1;
    
    // Validate that previous step is valid
    if (prevStepId >= BookingStepId.SERVICE_SELECTION) {
      goToStep(prevStepId as BookingStepId);
    }
  }, [state, goToStep]);
  
  // Data action methods
  const selectService = useCallback((service: ServiceOption) => {
    dispatch({ type: BookingActionType.SELECT_SERVICE, payload: service });
  }, []);
  
  const selectDate = useCallback((date: string) => {
    dispatch({ type: BookingActionType.SELECT_DATE, payload: date });
  }, []);
  
  const selectTimeSlot = useCallback((timeSlot: BookingTimeSlot) => {
    dispatch({ type: BookingActionType.SELECT_TIME_SLOT, payload: timeSlot });
  }, []);
  
  const setClientInfo = useCallback((clientInfo: ClientInformation) => {
    dispatch({ type: BookingActionType.SET_CLIENT_INFO, payload: clientInfo });
  }, []);

  // State management methods
  const setAvailableDates = useCallback((dates: BookingDate[]) => {
    dispatch({ type: BookingActionType.SET_AVAILABLE_DATES, payload: dates });
  }, []);

  const setLoading = useCallback((loading: boolean) => {
    dispatch({ type: BookingActionType.SET_LOADING, payload: loading });
  }, []);

  const setError = useCallback((error: string) => {
    dispatch({ type: BookingActionType.SET_ERROR, payload: error });
  }, []);

  const clearError = useCallback(() => {
    dispatch({ type: BookingActionType.CLEAR_ERROR });
  }, []);

  const completeStep = useCallback((stepId: BookingStepId) => {
    dispatch({ type: BookingActionType.COMPLETE_STEP, payload: stepId });
  }, []);

  const setBookingReference = useCallback((reference: string) => {
    dispatch({ type: BookingActionType.SET_BOOKING_REFERENCE, payload: reference });
  }, []);

  const resetForm = useCallback(() => {
    dispatch({ type: BookingActionType.RESET_FORM });
  }, []);

  // API-related actions
  const setAvailableTimeSlots = useCallback((slots: TimeSlot[]) => {
    dispatch({ type: ExtendedBookingActionType.SET_AVAILABLE_TIME_SLOTS, payload: slots });
  }, []);

  const setAvailableServices = useCallback((services: ServiceOption[]) => {
    dispatch({ type: ExtendedBookingActionType.SET_AVAILABLE_SERVICES, payload: services });
  }, []);

  const setApiError = useCallback((error: ApiErrorState) => {
    dispatch({ type: ExtendedBookingActionType.SET_API_ERROR, payload: error });
    
    if (error.message) {
      errorToast("API Error", error.message);
    }
  }, [errorToast]);

  const clearApiError = useCallback(() => {
    dispatch({ type: ExtendedBookingActionType.CLEAR_API_ERROR });
  }, []);

  const setResourceLoading = useCallback((resource: keyof LoadingState, isLoading: boolean) => {
    dispatch({
      type: ExtendedBookingActionType.SET_LOADING_RESOURCE,
      payload: { resource, isLoading }
    });
  }, []);

  // Helper methods
  const canProceedToStep = useCallback((stepId: BookingStepId): boolean => {
    return canProceedToNextStep(state, stepId);
  }, [state]);

  const getCompleteBookingData = useCallback((): CompleteBookingData | null => {
    const { selectedService, selectedDate, selectedTimeSlot, clientInfo } = state;
    
    // Check if all required data is present
    if (!selectedService || !selectedDate || !selectedTimeSlot || !clientInfo) {
      return null;
    }
    
    return {
      service: selectedService,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      clientInfo: clientInfo,
    };
  }, [state]);
  
  const isResourceLoading = useCallback((resource: keyof LoadingState): boolean => {
    return Boolean(state.loadingState[resource] ?? false);
  }, [state.loadingState]);
  
  const hasApiError = useCallback((): boolean => {
    return state.apiError !== null;
  }, [state.apiError]);
  
  const getApiErrorForResource = useCallback((resource: string): string | null => {
    if (state.apiError && state.apiError.resource === resource) {
      return state.apiError.message || null;
    }
    return null;
  }, [state.apiError]);

  // Backward compatibility methods
  const nextStep = useCallback(() => {
    goToNextStep();
  }, [goToNextStep]);

  const previousStep = useCallback(() => {
    goToPreviousStep();
  }, [goToPreviousStep]);

  const setSelectedService = useCallback((service: ServiceOption) => {
    selectService(service);
  }, [selectService]);

  const setSelectedDate = useCallback((date: string) => {
    selectDate(date);
  }, [selectDate]);

  const setSelectedTime = useCallback((time: string) => {
    // Create a minimal time slot object for compatibility
    const timeSlot: BookingTimeSlot = {
      id: time,
      startTime: time,
      endTime: '',
      duration: 0,
      available: true
    };
    selectTimeSlot(timeSlot);
  }, [selectTimeSlot]);

  const setCurrentStep = useCallback((step: BookingStepId) => {
    goToStep(step);
  }, [goToStep]);

  const setCustomerInfo = useCallback((info: ClientInformation) => {
    setClientInfo(info);
  }, [setClientInfo]);

  // For backward compatibility with older components
  const completeBooking = useCallback(async () => {
    // Implementation would depend on the complete booking process
    // This is a placeholder for backward compatibility
    return Promise.resolve();
  }, []);
  
  const updateFormData = useCallback((_data: Record<string, unknown>) => {
    // This is a placeholder for backward compatibility
    console.log('updateFormData called with', _data);
  }, []);

  // Add missing function implementations for context completeness
  const fetchAvailableDates = useCallback(async (
    startDate: string,
    endDate: string,
    serviceType?: string,
    _forceRefresh = false
  ): Promise<void> => {
    console.log('[BookingContext] fetchAvailableDates called', { startDate, endDate, serviceType });
    // Implementation can be added later - this is a stub to prevent TypeScript errors
    return Promise.resolve();
  }, []);

  const fetchAvailableTimeSlots = useCallback(async (
    date: string,
    serviceType: string,
    _forceRefresh = false
  ): Promise<void> => {
    console.log('[BookingContext] fetchAvailableTimeSlots called', { date, serviceType });
    // Implementation can be added later - this is a stub to prevent TypeScript errors
    return Promise.resolve();
  }, []);

  const submitBooking = useCallback(async (
    serviceData: ServiceSelectionData,
    clientData: ClientInformationData,
    confirmationData: ConfirmationStepData
  ): Promise<string> => {
    console.log('[BookingContext] submitBooking called', { serviceData, clientData, confirmationData });
    // Implementation can be added later - this is a stub to prevent TypeScript errors
    return Promise.resolve('booking-ref-' + Date.now());
  }, []);

  const cancelBooking = useCallback(async (
    bookingId: string,
    reason?: string
  ): Promise<void> => {
    console.log('[BookingContext] cancelBooking called', { bookingId, reason });
    // Implementation can be added later - this is a stub to prevent TypeScript errors
    return Promise.resolve();
  }, []);

  const rescheduleBooking = useCallback(async (
    bookingId: string,
    newDate: string,
    newTimeSlot: string
  ): Promise<void> => {
    console.log('[BookingContext] rescheduleBooking called', { bookingId, newDate, newTimeSlot });
    // Implementation can be added later - this is a stub to prevent TypeScript errors
    return Promise.resolve();
  }, []);

  const createPaymentIntent = useCallback(async (
    serviceType: UnifiedServiceType,
    duration: number
  ): Promise<{ clientSecret: string, paymentIntentId: string }> => {
    console.log('[BookingContext] createPaymentIntent called', { serviceType, duration });
    // Implementation can be added later - this is a stub to prevent TypeScript errors
    return Promise.resolve({
      clientSecret: 'pi_test_' + Date.now(),
      paymentIntentId: 'pi_' + Date.now()
    });
  }, []);

  // Context value with safe defaults and error handlers
  const contextValue: BookingContextType = {
    state,
    goToStep: goToStep || (() => console.error("goToStep not available")),
    goToPreviousStep: goToPreviousStep || (() => console.error("goToPreviousStep not available")),
    goToNextStep: goToNextStep || (() => console.error("goToNextStep not available")),
    selectService: selectService || (() => console.error("selectService not available")),
    selectDate: selectDate || (() => console.error("selectDate not available")),
    selectTimeSlot: selectTimeSlot || (() => console.error("selectTimeSlot not available")),
    setClientInfo: setClientInfo || (() => console.error("setClientInfo not available")),
    setAvailableDates: setAvailableDates || (() => console.error("setAvailableDates not available")),
    setLoading: setLoading || (() => console.error("setLoading not available")),
    setError: setError || (() => console.error("setError not available")),
    clearError: clearError || (() => console.error("clearError not available")),
    completeStep: completeStep || (() => console.error("completeStep not available")),
    setBookingReference: setBookingReference || (() => console.error("setBookingReference not available")),
    resetForm: resetForm || (() => console.error("resetForm not available")),
    fetchAvailableServices: fetchAvailableServices || (() => Promise.reject("fetchAvailableServices not available")),
    fetchAvailableDates: fetchAvailableDates || (() => Promise.reject("fetchAvailableDates not available")),
    fetchAvailableTimeSlots: fetchAvailableTimeSlots || (() => Promise.reject("fetchAvailableTimeSlots not available")),
    submitBooking: submitBooking || (() => Promise.reject("submitBooking not available")),
    cancelBooking: cancelBooking || (() => Promise.reject("cancelBooking not available")),
    rescheduleBooking: rescheduleBooking || (() => Promise.reject("rescheduleBooking not available")),
    createPaymentIntent: createPaymentIntent || (() => Promise.reject("createPaymentIntent not available")),
    canProceedToStep: canProceedToStep || (() => false),
    getCompleteBookingData: getCompleteBookingData || (() => null),
    isResourceLoading: isResourceLoading || (() => false),
    hasApiError: hasApiError || (() => false),
    getApiErrorForResource: getApiErrorForResource || (() => null),
    currentStep: state.currentStep,
    nextStep: nextStep || (() => console.error("nextStep not available")),
    previousStep: previousStep || (() => console.error("previousStep not available")),
    selectedServices: state.availableServices || [],
    selectedService: state.selectedService,
    setSelectedService: setSelectedService || (() => console.error("setSelectedService not available")),
    selectedDate: state.selectedDate,
    setSelectedDate: setSelectedDate || (() => console.error("setSelectedDate not available")),
    selectedTime: state.selectedTime,
    setSelectedTime: setSelectedTime || (() => console.error("setSelectedTime not available")),
    setCurrentStep: setCurrentStep || (() => console.error("setCurrentStep not available")),
    customerInfo: state.customerInfo,
    setCustomerInfo: setCustomerInfo || (() => console.error("setCustomerInfo not available")),
    completeBooking: completeBooking || (() => Promise.reject("completeBooking not available")),
    bookingComplete: state.bookingComplete || false,
    bookingReference: state.bookingReference,
    updateFormData: updateFormData || (() => console.error("updateFormData not available")),
    recoverFromError: recoverFromError || (() => false),
    // Add utility methods
    clearCache: () => {
      setFetchInProgress(false);
      setLastFetchTime(0);
      setInitializationComplete(false);
      console.log('[BookingContext] Cache cleared');
    },
    refreshServices: () => fetchAvailableServices(true),
    services: state.availableServices || []
  };

  // Store global instance
  globalBookingContextInstance = contextValue;

  // Safely create the context provider
  try {
  return React.createElement(
    BookingContext.Provider,
    { value: contextValue },
    children
  );
  } catch (error) {
    logContextError("ProviderRender", error);
    
    // Emergency fallback rendering using React.createElement to avoid JSX compilation issues
    return React.createElement(
      'div',
      { style: { padding: '20px', color: 'red', backgroundColor: '#ffeeee', borderRadius: '8px', margin: '16px' } },
      React.createElement('h3', null, 'Booking System Error'),
      React.createElement('p', null, "We're experiencing technical difficulties with our booking system. Please try again later or contact support."),
      process.env.NODE_ENV === 'development' && React.createElement(
        'details',
        null,
        React.createElement('summary', null, 'Developer Details'),
        React.createElement('pre', null, error instanceof Error ? `${error.message}\n${error.stack}` : String(error)),
        React.createElement(
          'div',
          null,
          React.createElement('strong', null, 'Initialization Attempts:'),
          ' ',
          initializationAttempts.current
        ),
        React.createElement(
          'div',
          null,
          React.createElement('strong', null, 'State:'),
          ' ',
          JSON.stringify({
                hasState: !!state,
                currentStep: state?.currentStep,
                hasError: state?.apiError !== null || state?.error !== undefined
          }, null, 2)
        )
      )
    );
  }
};

/**
 * Custom hook to use the booking context
 * @returns The booking context
 * @throws Error if used outside a BookingProvider
 */
export const useBooking = (): BookingContextType => {
  const context = useContext(BookingContext);
  
  if (!context) {
    const error = new Error('useBooking must be used within a BookingProvider');
    logContextError("useBooking", error, { 
      component: "useBooking hook",
      path: window.location.pathname
    });
    throw error;
  }
  
  return context;
};

// Export as useBookingContext for compatibility with different import patterns
export const useBookingContext = useBooking;

export default BookingContext; 







