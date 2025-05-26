/**
 * ErrorDisplay Component
 * 
 * A component that displays error states with a message and retry button.
 * Implements sacred geometry principles for layout and spacing.
 */

import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { Box } from '../layout/Box';
import { Flex } from '../layout/Flex';
import { Text } from '../typography/Text';
import { Heading } from '../typography/Heading';
import { Button } from '../button/Button';
import { SACRED_SPACING, SACRED_RADIUS } from '../../../constants/sacred-geometry';
import { ApiErrorCode } from '../../../types/api.types';

export interface ErrorDisplayProps {
  /**
   * The error title to display
   */
  title?: string;
  
  /**
   * The error message to display
   */
  message: string;
  
  /**
   * Optional error code to better categorize the error
   */
  errorCode?: ApiErrorCode | string;
  
  /**
   * Optional callback to retry the operation
   */
  onRetry?: () => void;
  
  /**
   * Optional additional details (for debugging or tech details)
   */
  details?: Record<string, unknown>;
  
  /**
   * Error context - where the error occurred
   */
  context?: string;
  
  /**
   * Visual severity level
   * @default "error"
   */
  severity?: 'error' | 'warning' | 'info';
  
  /**
   * Whether to show detailed technical information
   * @default false in production, true in development
   */
  showTechnicalDetails?: boolean;
  
  /**
   * Additional class name
   */
  className?: string;
  
  /**
   * Whether to show the retry button
   * @default true
   */
  showRetry?: boolean;
  
  /**
   * Text for the retry button
   * @default "Try Again"
   */
  retryText?: string;
  
  /**
   * Whether to show an icon
   * @default true
   */
  showIcon?: boolean;
  
  /**
   * Variant for the error display
   * @default "default"
   */
  variant?: 'default' | 'danger' | 'warning' | 'success' | 'info';
}

const ErrorContainer = styled(Box).attrs({
  role: 'alert',
  'aria-live': 'assertive'
})<{ $severity: 'error' | 'warning' | 'info' }>`
  padding: 16px;
  border-radius: 8px;
  border-left: 4px solid;
  border-color: ${({ $severity, theme }) => {
    switch ($severity) {
      case 'warning':
        return theme.colors.feedback.warning.main;
      case 'info':
        return theme.colors.feedback.info.main;
      case 'error':
      default:
        return theme.colors.feedback.error.main;
    }
  }};
  background-color: ${({ $severity, theme }) => {
    switch ($severity) {
      case 'warning':
        return theme.colors.feedback.warning.light;
      case 'info':
        return theme.colors.feedback.info.light;
      case 'error':
      default:
        return theme.colors.feedback.error.light;
    }
  }};
  margin-bottom: 24px;
`;

const ErrorTitle = styled(Text)`
  font-weight: 600;
  margin-bottom: 8px;
`;

const ErrorMessage = styled(Text)`
  margin-bottom: 16px;
`;

const RetryButton = styled(Button)`
  margin-right: 8px;
`;

const TechnicalDetailsToggle = styled(Button)`
  font-size: 12px;
  padding: 4px 8px;
`;

const TechnicalDetailsPanel = styled(Box)`
  margin-top: 16px;
  padding: 12px;
  background-color: rgba(0, 0, 0, 0.03);
  border-radius: 4px;
  font-family: monospace;
  font-size: 12px;
  white-space: pre-wrap;
  overflow-x: auto;
  max-height: 200px;
  overflow-y: auto;
`;

// Add a specific function to categorize booking errors
const categorizeBookingError = (message: string, errorCode?: string): { 
  category: string; 
  userMessage: string;
  isBookingError: boolean;
} => {
  // Default values
  let category = 'general';
  let userMessage = 'An error occurred with our booking system. Please try again.';
  let isBookingError = false;
  
  // Check if this is a booking error based on the message or code
  const bookingKeywords = [
    'booking', 'appointment', 'slot', 'schedule', 'context', 'provider', 
    'availability', 'calendar', 'time'
  ];
  
  isBookingError = bookingKeywords.some(keyword => 
    message.toLowerCase().includes(keyword) || 
    (errorCode && errorCode.toLowerCase().includes(keyword))
  );
  
  if (isBookingError) {
    // Categorize booking errors for better user feedback
    if (message.includes('context') || message.includes('provider') || message.includes('undefined')) {
      category = 'initialization';
      userMessage = 'The booking system failed to initialize properly. Please refresh the page or try again later.';
    } else if (message.includes('fetch') || message.includes('network') || message.includes('api')) {
      category = 'network';
      userMessage = 'We\'re having trouble connecting to our booking service. Please check your connection and try again.';
    } else if (message.includes('slot') || message.includes('time') || message.includes('date')) {
      category = 'availability';
      userMessage = 'There was an issue with the selected time slot. Please try selecting a different time.';
    } else if (message.includes('payment') || message.includes('transaction')) {
      category = 'payment';
      userMessage = 'There was an issue processing your payment information. Please try again.';
    } else if (message.includes('validation') || message.includes('required')) {
      category = 'validation';
      userMessage = 'Some required information is missing or invalid. Please check all fields and try again.';
    }
  }
  
  return { category, userMessage, isBookingError };
};

// Enhance the getUserFriendlyMessage function to include booking errors
const getUserFriendlyMessage = (errorCode?: ApiErrorCode | string, defaultMessage: string = ''): string => {
  if (!errorCode) {
    // Try to categorize the error message
    const { isBookingError, userMessage } = categorizeBookingError(defaultMessage);
    if (isBookingError) return userMessage;
    return defaultMessage;
  }
  
  // Existing code for API error codes
  switch (errorCode) {
    case ApiErrorCode.NETWORK_ERROR:
      return 'Unable to connect to our servers. Please check your internet connection and try again.';
      
    case ApiErrorCode.BOOKING_CONFLICT:
      return 'This time slot is no longer available. Please select a different time.';
      
    case ApiErrorCode.BOOKING_UNAVAILABLE:
      return 'The selected booking option is currently unavailable. Please try a different time or service.';
      
    case ApiErrorCode.SERVICE_UNAVAILABLE:
      return 'Our booking service is temporarily unavailable. Please try again in a few minutes.';
      
    case ApiErrorCode.GATEWAY_TIMEOUT:
      return 'The request timed out. Please try again when you have a stronger connection.';
      
    case ApiErrorCode.AUTH_TOKEN_EXPIRED:
    case ApiErrorCode.AUTH_TOKEN_INVALID:
      return 'Your session has expired. Please refresh the page and try again.';
      
    case ApiErrorCode.VALIDATION_ERROR:
      return 'There was an issue with the information provided. Please check all fields and try again.';
      
    case ApiErrorCode.TOO_MANY_REQUESTS:
      return 'Too many requests. Please wait a moment before trying again.';
      
    default:
      // If no specific mapping, try to categorize the error message
      const { isBookingError, userMessage } = categorizeBookingError(defaultMessage, errorCode);
      if (isBookingError) return userMessage;
      return defaultMessage;
  }
};

// Add debugging information display for development mode
const DebugInfoPanel = styled.div`
  background-color: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 4px;
  padding: 8px;
  margin-top: 8px;
  font-family: monospace;
  font-size: 12px;
  white-space: pre-wrap;
  max-height: 200px;
  overflow-y: auto;
`;

// Add variant-specific styling
const getVariantStyles = (variant: ErrorDisplayProps['variant']) => {
  switch (variant) {
    case 'danger':
      return { borderColor: 'var(--color-danger)', iconColor: 'var(--color-danger)' };
    case 'warning':
      return { borderColor: 'var(--color-warning)', iconColor: 'var(--color-warning)' };
    case 'success':
      return { borderColor: 'var(--color-success)', iconColor: 'var(--color-success)' };
    case 'info':
      return { borderColor: 'var(--color-info)', iconColor: 'var(--color-info)' };
    default:
      return { borderColor: 'var(--color-error)', iconColor: 'var(--color-error)' };
  }
};

/**
 * Error Display Component
 * 
 * Displays an error message with optional retry functionality
 * and technical details in development mode.
 */
export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  title,
  message,
  errorCode,
  onRetry,
  details,
  context,
  severity = 'error',
  showTechnicalDetails = process.env.NODE_ENV === 'development',
  className,
  showRetry = true,
  retryText = 'Try Again',
  showIcon = true,
  variant = 'default'
}) => {
  const [showDetails, setShowDetails] = useState(false);
  
  // Determine if this is a booking-related error
  const { isBookingError, category, userMessage } = categorizeBookingError(message, errorCode);
  
  // Get appropriate error title
  const errorTitle = title || (isBookingError ? 'Booking System Error' : 'An Error Occurred');
  
  // Get user-friendly message
  const userFriendlyMessage = getUserFriendlyMessage(errorCode, message);
  
  // Format technical details as JSON
  const formattedDetails = React.useMemo(() => {
    try {
      const detailsObj = {
        errorCode,
        message,
        context,
        category: isBookingError ? category : 'general',
        timestamp: new Date().toISOString(),
        url: typeof window !== 'undefined' ? window.location.href : undefined,
        isBookingError,
        ...details
      };
      
      return JSON.stringify(detailsObj, null, 2);
    } catch (err) {
      return `Error formatting details: ${err instanceof Error ? err.message : String(err)}`;
    }
  }, [errorCode, message, context, details, isBookingError, category]);
  
  // Generate additional debug info for development mode
  const debugInfo = React.useMemo(() => {
    if (process.env.NODE_ENV !== 'development') return null;
    
    try {
      return {
        browser: navigator.userAgent,
        windowDimensions: {
          width: window.innerWidth,
          height: window.innerHeight
        },
        networkStatus: navigator.onLine ? 'online' : 'offline',
        pathname: window.location.pathname,
        search: window.location.search
      };
    } catch (err) {
      return { error: 'Failed to collect debug info' };
    }
  }, []);
  
  // Update the container with variant-specific styling
  const variantStyles = getVariantStyles(variant);
  
  return (
    <ErrorContainer 
      $severity={severity} 
      className={className} 
      style={{ 
        borderColor: variantStyles.borderColor
      }}
    >
      <ErrorTitle variant="h6" color={`feedback.${severity}.main`}>
        {errorTitle}
      </ErrorTitle>
      
      <ErrorMessage>
        {userFriendlyMessage}
        
        {isBookingError && (
          <Text as="div" style={{ marginTop: '8px', fontSize: '14px' }}>
            {onRetry 
              ? 'Please try again or contact our support if the problem persists.' 
              : 'Please try again later or contact our support team for assistance.'}
        </Text>
        )}
      </ErrorMessage>
        
      <Box>
        {showRetry && onRetry && (
          <RetryButton 
            variant="primary" 
            size="sm" 
            onClick={onRetry}
          >
            {retryText}
          </RetryButton>
        )}
        
        {showTechnicalDetails && (
          <TechnicalDetailsToggle 
            variant="ghost" 
            size="sm" 
            onClick={() => setShowDetails(!showDetails)}
          >
            {showDetails ? 'Hide' : 'Show'} Technical Details
          </TechnicalDetailsToggle>
        )}
      </Box>
      
      {showDetails && showTechnicalDetails && (
        <>
          <TechnicalDetailsPanel>
            {formattedDetails}
          </TechnicalDetailsPanel>
          
          {process.env.NODE_ENV === 'development' && debugInfo && (
            <DebugInfoPanel>
              <div>Debug Info (dev only):</div>
              {JSON.stringify(debugInfo, null, 2)}
            </DebugInfoPanel>
          )}
        </>
      )}
    </ErrorContainer>
  );
};

export default ErrorDisplay; 