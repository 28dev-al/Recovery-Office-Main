import * as React from 'react';
import { useState, useCallback, useEffect, useRef } from 'react';
import { ThemeProvider, useTheme } from '../../design-system/theme/ThemeProvider';
import PremiumBookingPage from './BookingPage';
import { ErrorBoundary } from '../../components/common/ErrorBoundary';
import { Box, Container } from '../../design-system/components/layout';
import { Heading, Text } from '../../design-system/components/typography';
import { Button } from '../../design-system/components/button/Button';
import { useNavigate } from 'react-router-dom';
import { PREMIUM_COLORS } from '../../design-system/tokens/colors.premium';
import styled from 'styled-components';

// Custom fallback component for booking-specific errors
const BookingErrorFallback = styled(Container)`
  max-width: 700px;
  margin: 80px auto;
  padding: 40px;
  text-align: center;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  border-top: 4px solid ${PREMIUM_COLORS.BASE_COLORS.gold[500]};
`;

const ErrorIcon = styled.div`
  width: 64px;
  height: 64px;
  margin: 0 auto 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fcf0f0;
  color: #e53e3e;
`;

// Debug indicator for development mode
const DevModeIndicator = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 12px;
  z-index: 9999;
`;

// Technical details panel for developers
const TechnicalDetails = styled.div`
  margin: 24px auto;
  padding: 16px;
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  text-align: left;
  max-width: 600px;
  overflow: auto;
  max-height: 300px;
  font-family: monospace;
  font-size: 12px;
  white-space: pre-wrap;
  word-break: break-word;
`;

// Error state capture for debugging
interface ErrorState {
  timestamp: string;
  error: Error | null;
  componentStack?: string;
  windowLocation?: string;
  navigatorInfo?: {
    userAgent: string;
    language: string;
    onLine: boolean;
  };
  bookingContext?: any;
}

/**
 * BookingErrorHandler - Provides a custom fallback UI for booking errors
 */
const BookingErrorHandler: React.FC<{ error: Error; componentStack?: string }> = ({ error, componentStack }) => {
  const navigate = useNavigate();
  const [showTechDetails, setShowTechDetails] = useState(false);
  const errorStateRef = useRef<ErrorState>({
    timestamp: new Date().toISOString(),
    error: error,
    componentStack,
    windowLocation: window.location.href,
    navigatorInfo: {
      userAgent: navigator.userAgent,
      language: navigator.language,
      onLine: navigator.onLine
    }
  });
  
  // Log the error for easier debugging
  useEffect(() => {
    console.error('[BookingErrorHandler] Rendering error fallback:', error);
    console.error('[BookingErrorHandler] Component stack:', componentStack);
    
    // Attempt to safely get booking context state from localStorage
    try {
      const bookingStorage = localStorage.getItem('recovery_office_booking');
      if (bookingStorage) {
        const parsedStorage = JSON.parse(bookingStorage);
        errorStateRef.current.bookingContext = parsedStorage;
      }
    } catch (e) {
      console.error('[BookingErrorHandler] Failed to get booking storage:', e);
    }
    
    // Log additional diagnostic information
    console.error('[BookingErrorHandler] Window location:', window.location.href);
    console.error('[BookingErrorHandler] Navigator info:', {
      userAgent: navigator.userAgent,
      language: navigator.language,
      onLine: navigator.onLine
    });
  }, [error, componentStack]);
  
  const handleReturnHome = useCallback(() => {
    navigate('/');
  }, [navigate]);
  
  const handleResetBooking = useCallback(() => {
    try {
      // Clear any booking data in localStorage
      localStorage.removeItem('recovery_office_booking');
      // Reload the page to get a fresh state
      window.location.reload();
    } catch (e) {
      console.error('[BookingErrorHandler] Failed to reset booking:', e);
      // Fallback to returning home
      navigate('/');
    }
  }, [navigate]);
  
  // Special handling for different error types
  const errorType = error.name;
  const isApiError = errorType.includes('ApiError') || error.message.includes('API');
  const isNetworkError = error.message.includes('network') || 
                         error.message.includes('connection') || 
                         error.message.toLowerCase().includes('failed to fetch');
  const isContextError = error.message.includes('Context') || error.message.includes('Provider');
  
  let errorTitle = 'Booking System Error';
  let errorMessage = error.message;
  
  // Provide more user-friendly messages based on error type
  if (isApiError) {
    errorTitle = 'Service Temporarily Unavailable';
    errorMessage = 'We\'re having trouble connecting to our booking service. Please try again later.';
  } else if (isNetworkError) {
    errorTitle = 'Network Connection Issue';
    errorMessage = 'Please check your internet connection and try again.';
  } else if (isContextError) {
    errorTitle = 'Booking System Initialization Error';
    errorMessage = 'The booking system could not be properly initialized. Please try refreshing the page.';
  }

  // Format error stack for display
  const formattedStack = error.stack 
    ? error.stack.split('\n').slice(0, 10).join('\n') 
    : 'No stack trace available';
  
  const formattedComponentStack = componentStack 
    ? componentStack.split('\n').map(line => line.trim()).join('\n') 
    : 'No component stack available';
  
  return (
    <BookingErrorFallback>
      <ErrorIcon>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <path d="M12 4a8 8 0 100 16 8 8 0 000-16z" stroke="currentColor" strokeWidth="2" />
          <path d="M12 12V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <circle cx="12" cy="16" r="1" fill="currentColor" />
        </svg>
      </ErrorIcon>
      
      <Heading as="h1" color={PREMIUM_COLORS.BASE_COLORS.forest[700]} marginBottom="16px">
        {errorTitle}
      </Heading>
      
      <Text marginBottom="24px">
        {errorMessage}
      </Text>
      
      <Box display="flex" justifyContent="center" gap="16px">
        <Button 
          onClick={handleReturnHome}
          variant="secondary"
        >
          Return to Home
        </Button>
        
        <Button 
          onClick={handleResetBooking}
          variant="primary"
        >
          Reset Booking Process
        </Button>
      </Box>
      
      {process.env.NODE_ENV === 'development' && (
        <>
          <Box marginTop="24px">
            <Button 
              onClick={() => setShowTechDetails(!showTechDetails)}
              variant="ghost"
              size="sm"
            >
              {showTechDetails ? 'Hide' : 'Show'} Technical Details (Development Only)
            </Button>
          </Box>
          
          {showTechDetails && (
            <TechnicalDetails>
              <strong>Error:</strong> {error.toString()}
              
              <div style={{ marginTop: '12px' }}>
                <strong>Error Type:</strong> {errorType}
              </div>
              
              <div style={{ marginTop: '12px' }}>
                <strong>Error Stack:</strong>
                <pre>{formattedStack}</pre>
              </div>
              
              <div style={{ marginTop: '12px' }}>
                <strong>Component Stack:</strong>
                <pre>{formattedComponentStack}</pre>
              </div>
              
              <div style={{ marginTop: '12px' }}>
                <strong>URL:</strong> {window.location.href}
              </div>
              
              <div style={{ marginTop: '12px' }}>
                <strong>Error State:</strong>
                <pre>{JSON.stringify(errorStateRef.current, null, 2)}</pre>
              </div>
            </TechnicalDetails>
          )}
          
          <DevModeIndicator>
            Development Mode
          </DevModeIndicator>
        </>
      )}
    </BookingErrorFallback>
  );
};

/**
 * BookingPageWrapper
 * 
 * A container component that:
 * 1. Provides the ThemeProvider context
 * 2. Provides the BookingProvider context
 * 3. Wraps the booking page in an error boundary
 * 
 * This ensures proper context initialization and error handling for the booking flow.
 */
export const BookingPageWrapper: React.FC = () => {
  // Access the theme context for theming
  const theme = useTheme();
  
  // Track error state
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [componentStack, setComponentStack] = useState<string | undefined>(undefined);
  
  // Handle error logging
  const handleError = useCallback((error: Error, errorInfo: React.ErrorInfo) => {
    console.error('[BookingPageWrapper] Caught error:', error);
    console.error('[BookingPageWrapper] Component stack:', errorInfo.componentStack);
    
    // Set local error state for custom handling
    setHasError(true);
    setError(error);
    setComponentStack(errorInfo.componentStack || undefined);
    
    // Log to analytics if available
    if (window.gtag) {
      window.gtag('event', 'booking_error', {
        error_type: error.name,
        error_message: error.message,
        page: window.location.pathname
      });
    }
    
    // Attempt to recover storage in case of corruption
    try {
      localStorage.removeItem('recovery_office_booking');
      console.log('[BookingPageWrapper] Cleared booking storage to prevent further errors');
    } catch (e) {
      console.warn('[BookingPageWrapper] Failed to clear storage:', e);
    }
  }, []);
  
  // Log initial render and any dependencies
  useEffect(() => {
    console.log('[BookingPageWrapper] Mounting wrapper with theme:', theme);
    
    // Check for localStorage availability
    try {
      localStorage.setItem('booking_test', 'test');
      localStorage.removeItem('booking_test');
      console.log('[BookingPageWrapper] Local storage is available');
    } catch (e) {
      console.warn('[BookingPageWrapper] Local storage is not available:', e);
    }
    
    return () => {
      console.log('[BookingPageWrapper] Unmounting wrapper');
    };
  }, [theme]);
  
  return (
    <ThemeProvider>
      <ErrorBoundary 
        onError={handleError}
        componentName="BookingPageWrapper"
        catchUnhandledPromises={true}
        showDetails={process.env.NODE_ENV === 'development'}
        fallback={
          error ? <BookingErrorHandler error={error} componentStack={componentStack} /> : (
            <BookingErrorFallback>
              <ErrorIcon>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M12 4a8 8 0 100 16 8 8 0 000-16z" stroke="currentColor" strokeWidth="2" />
                  <path d="M12 12V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="12" cy="16" r="1" fill="currentColor" />
                </svg>
              </ErrorIcon>
              <Heading as="h1" color={PREMIUM_COLORS.BASE_COLORS.forest[700]} marginBottom="16px">
                Booking System Error
              </Heading>
              <Text marginBottom="24px">
                We encountered an unexpected error with the booking system. Please try again later.
              </Text>
              <Button onClick={() => window.location.href = '/'} variant="primary">
                Return to Home
              </Button>
            </BookingErrorFallback>
          )
        }
      >
        <Box 
          minHeight="100vh" 
          display="flex" 
          flexDirection="column" 
          bg={PREMIUM_COLORS.BASE_COLORS.ivory[50]}
        >
          {/* Development mode indicator */}
          {process.env.NODE_ENV === 'development' && (
            <>
              <Box 
                p={2} 
                bg="#fff3cd" 
                color="#856404" 
                textAlign="center"
                style={{ fontSize: '14px', fontWeight: '500' }}
                display={hasError ? 'none' : 'block'}
              >
                DEV MODE: Booking page mounted with error tracking enabled
              </Box>
              <DevModeIndicator>
                DEV MODE
              </DevModeIndicator>
            </>
          )}
          
          <PremiumBookingPage />
        </Box>
      </ErrorBoundary>
    </ThemeProvider>
  );
}; 