/**
 * ErrorBoundary Component
 * 
 * A React error boundary that catches JavaScript errors anywhere in its child component tree,
 * logs those errors, and displays a fallback UI instead of crashing the whole app.
 * 
 * @example
 * ```tsx
 * <ErrorBoundary fallback={<ErrorMessage>Something went wrong</ErrorMessage>}>
 *   <YourComponent />
 * </ErrorBoundary>
 * ```
 */

import * as React from 'react';
import styled from 'styled-components';
import { ApiError } from '../../types/api.types';

interface ErrorBoundaryProps {
  /**
   * Components that this error boundary wraps
   */
  children: React.ReactNode;
  
  /**
   * Optional custom component to render when an error occurs
   */
  fallback?: React.ReactNode;
  
  /**
   * Optional callback that runs when an error is caught
   */
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  
  /**
   * Whether to reset the error state when the component re-renders
   * @default false
   */
  resetOnChange?: boolean;
  
  /**
   * Whether to show technical error details
   * @default false
   */
  showDetails?: boolean;
  
  /**
   * Enable this to catch JS promise rejections
   * @default true 
   */
  catchUnhandledPromises?: boolean;
  
  /**
   * Name of the component being wrapped for better error reporting
   */
  componentName?: string;
}

interface ErrorBoundaryState {
  /**
   * Whether an error has been caught
   */
  hasError: boolean;
  
  /**
   * The error that was caught, if any
   */
  error: Error | null;
  
  /**
   * Component stack trace
   */
  errorInfo: React.ErrorInfo | null;
  
  /**
   * Additional error metadata to help with debugging
   */
  errorMeta: Record<string, unknown>;
}

const ErrorContainer = styled.div`
  padding: 32px;
  border-radius: 12px;
  background-color: #fcf7f7;
  border: 1px solid #f5e1e1;
  margin: 24px 0;
  text-align: center;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const ErrorTitle = styled.h2`
  color: #0A4021;
  margin-bottom: 16px;
  font-size: 1.5rem;
`;

const ErrorMessage = styled.div`
  color: #D4AF37;
  margin-bottom: 24px;
  font-weight: 500;
`;

const ErrorDetails = styled.details`
  margin-top: 16px;
  text-align: left;
  
  summary {
    cursor: pointer;
    margin-bottom: 8px;
    color: #666;
    font-weight: 500;
  }
  
  pre {
    background: #f8f8f8;
    padding: 12px;
    border-radius: 4px;
    overflow: auto;
    font-size: 0.9rem;
    color: #333;
    border: 1px solid #eee;
  }
`;

const RetryButton = styled.button`
  background: #0A4021;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  margin-top: 16px;
  
  &:hover {
    background: #0b4f28;
  }
`;

const ErrorMetadataTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 12px;
  font-size: 13px;
  
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  
  th {
    background-color: #f2f2f2;
    font-weight: 600;
  }
  
  tr:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

/**
 * Enhanced error message formatter 
 * Extracts useful information from different error types
 */
const getErrorDetails = (error: unknown): { message: string; type: string; meta: Record<string, unknown> } => {
  // Default values
  let message = 'An unknown error occurred';
  let type = 'Unknown';
  const meta: Record<string, unknown> = {};
  
  if (error instanceof Error) {
    message = error.message;
    type = error.constructor.name;
    
    // Add stack trace if available
    if (error.stack) {
      meta.stack = error.stack;
    }
    
    // For ApiErrors, extract additional information
    if (error instanceof ApiError) {
      meta.code = error.code;
      meta.statusCode = error.statusCode;
      if (error.details) {
        meta.details = error.details;
      }
    }
    
    // For other error types with custom properties
    Object.getOwnPropertyNames(error).forEach(prop => {
      if (prop !== 'message' && prop !== 'stack' && prop !== 'name') {
        try {
          meta[prop] = (error as any)[prop];
        } catch (e) {
          // Ignore properties that can't be accessed
        }
      }
    });
  } else if (typeof error === 'string') {
    message = error;
    type = 'String';
  } else if (error === null) {
    message = 'Null error';
    type = 'Null';
  } else if (error === undefined) {
    message = 'Undefined error';
    type = 'Undefined';
  } else if (typeof error === 'object') {
    type = 'Object';
    try {
      message = JSON.stringify(error);
      meta.value = error;
    } catch (e) {
      message = 'Unserializable object error';
    }
  } else {
    type = typeof error;
    message = String(error);
  }
  
  return { message, type, meta };
};

/**
 * Default fallback UI shown when an error occurs
 */
const DefaultErrorFallback: React.FC<{ 
  error: Error | null; 
  errorInfo: React.ErrorInfo | null;
  errorMeta: Record<string, unknown>;
  showDetails?: boolean;
  onReset?: () => void;
  componentName?: string;
}> = ({ error, errorInfo, errorMeta, showDetails = false, onReset, componentName }) => {
  const errorDetails = error ? getErrorDetails(error) : { message: 'Unknown error', type: 'Unknown', meta: {} };
  const isBookingError = 
    window.location.pathname.includes('/booking') || 
    componentName?.toLowerCase().includes('booking') ||
    error?.message?.toLowerCase().includes('booking') ||
    error?.message?.toLowerCase().includes('context') ||
    error?.stack?.toLowerCase().includes('booking');
  
  // Show development mode indicator
  const isDevMode = process.env.NODE_ENV === 'development';
  
  // Combine all metadata
  const allMeta = { ...errorDetails.meta, ...errorMeta };
  
  return (
  <ErrorContainer>
      <ErrorTitle>
        {isBookingError ? 'Booking System Error' : 'Something went wrong'}
        {isDevMode && <span style={{ fontSize: '12px', color: '#999', marginLeft: '8px' }}>(Dev Mode)</span>}
      </ErrorTitle>
      
    <ErrorMessage>
        {isBookingError 
          ? 'We apologize for the inconvenience. Our team has been notified and is working to resolve this issue with our booking system.'
          : errorDetails.message}
    </ErrorMessage>
      
    <p>
        {isBookingError 
          ? 'Please try refreshing the page or return to the homepage to explore other services.'
          : 'Please try refreshing the page or contact support if the problem persists.'}
    </p>
    
      {(showDetails || isDevMode) && (
      <ErrorDetails>
          <summary>Technical Details {componentName && `(${componentName})`}</summary>
          
          <h4>Error Information</h4>
          <ErrorMetadataTable>
            <thead>
              <tr>
                <th>Property</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Error Type</td>
                <td>{errorDetails.type}</td>
              </tr>
              <tr>
                <td>Message</td>
                <td>{errorDetails.message}</td>
              </tr>
              <tr>
                <td>URL</td>
                <td>{window.location.href}</td>
              </tr>
              <tr>
                <td>Time</td>
                <td>{new Date().toISOString()}</td>
              </tr>
              <tr>
                <td>Component</td>
                <td>{componentName || 'Unknown'}</td>
              </tr>
              <tr>
                <td>Path</td>
                <td>{window.location.pathname}</td>
              </tr>
            </tbody>
          </ErrorMetadataTable>
          
          {/* Display all collected metadata */}
          {Object.keys(allMeta).length > 0 && (
            <>
              <h4>Error Metadata</h4>
              <ErrorMetadataTable>
                <thead>
                  <tr>
                    <th>Property</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(allMeta).map(([key, value]) => {
                    // Skip the stack trace as it's shown separately
                    if (key === 'stack') return null;
                    
                    let displayValue = '';
                    try {
                      displayValue = typeof value === 'object' 
                        ? JSON.stringify(value, null, 2)
                        : String(value);
                    } catch (e) {
                      displayValue = '[Unable to display value]';
                    }
                    
                    return (
                      <tr key={key}>
                        <td>{key}</td>
                        <td style={{ wordBreak: 'break-all' }}>{displayValue}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </ErrorMetadataTable>
            </>
          )}
          
          {error && error.stack && (
            <>
              <h4>Stack Trace</h4>
              <pre>{error.stack}</pre>
            </>
          )}
        
        {errorInfo && (
            <>
            <h4>Component Stack</h4>
            <pre>{errorInfo.componentStack}</pre>
            </>
        )}
      </ErrorDetails>
    )}
    
    {onReset && (
      <RetryButton onClick={onReset}>
        Try Again
      </RetryButton>
    )}
  </ErrorContainer>
);
};

/**
 * Error Boundary component that catches errors in its children
 */
export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null,
      errorInfo: null,
      errorMeta: {}
    };
    
    this.resetErrorBoundary = this.resetErrorBoundary.bind(this);
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    // Update state so the next render shows the fallback UI
    return { 
      hasError: true, 
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // Update state with error info for the UI
    this.setState({ errorInfo });
    
    // Enhanced error logging with component name
    const componentName = this.props.componentName || 'unknown';
    console.group(`[ErrorBoundary:${componentName}] Error caught:`);
    console.error('Error:', error);
    console.error('Component stack:', errorInfo.componentStack);
    
    // Log additional information for debugging
    const meta: Record<string, unknown> = {
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      component: componentName
    };
    
    // Check if this is a booking-related error
    if (window.location.pathname.includes('/booking') || 
        componentName.toLowerCase().includes('booking') || 
        error.message.toLowerCase().includes('booking') ||
        error.message.toLowerCase().includes('context') ||
        error.stack?.toLowerCase().includes('booking')) {
      console.warn('[ErrorBoundary] Error occurred in the booking flow!');
      meta.isBookingError = true;
      
      // Try to extract useful information from the URL
      const searchParams = new URLSearchParams(window.location.search);
      const step = searchParams.get('step');
      if (step) {
        console.info('Current booking step:', step);
        meta.bookingStep = step;
      }
      
      // Log any booking context data available in localStorage
      try {
        const bookingStorage = localStorage.getItem('recovery_office_booking');
        if (bookingStorage) {
          const parsedStorage = JSON.parse(bookingStorage);
          console.info('Booking storage data:', parsedStorage);
          meta.bookingStorage = parsedStorage;
        }
      } catch (e) {
        console.error('Error accessing booking storage:', e);
      }
      
      // Check for missing service icons/images by inspecting error message and stack
      if (error.message.includes('image') || 
          error.message.includes('icon') || 
          error.message.includes('src') ||
          error.stack?.includes('image') ||
          error.stack?.includes('icon')) {
        console.warn('[ErrorBoundary] Possible image loading error detected');
        meta.possibleImageError = true;
        
        // Check document for failed image requests
        try {
          const failedImages = Array.from(document.querySelectorAll('img'))
            .filter(img => !img.complete || img.naturalHeight === 0)
            .map(img => ({ 
              src: img.src, 
              alt: img.alt,
              parentComponent: img.closest('[data-testid]')?.getAttribute('data-testid') || 'unknown'
            }));
          
          if (failedImages.length > 0) {
            console.warn('[ErrorBoundary] Failed images detected:', failedImages);
            meta.failedImages = failedImages;
          }
        } catch (imgErr) {
          console.error('Error checking for failed images:', imgErr);
        }
      }
      
      // Log additional diagnostic information for booking errors
      try {
        // Check if React DevTools are installed
        const hasDevTools = (typeof window !== 'undefined' && 
                           window.__REACT_DEVTOOLS_GLOBAL_HOOK__ && 
                           window.__REACT_DEVTOOLS_GLOBAL_HOOK__.renderers &&
                           Object.keys(window.__REACT_DEVTOOLS_GLOBAL_HOOK__.renderers).length > 0);
        
        console.info('React DevTools available:', hasDevTools);
        meta.hasReactDevTools = hasDevTools;
        
        // Check if the document is fully loaded
        console.info('Document ready state:', document.readyState);
        meta.documentReadyState = document.readyState;
        
        // Check network status
        console.info('Network status:', navigator.onLine ? 'online' : 'offline');
        meta.isOnline = navigator.onLine;
        
        // Check for any network errors in the console
        if (window.performance) {
          const resources = window.performance.getEntriesByType('resource');
          const failedResources = resources.filter((r: any) => r.responseStatus >= 400);
          
          if (failedResources.length > 0) {
            console.warn('[ErrorBoundary] Failed network requests detected:', 
              failedResources.map((r: any) => ({ 
                name: r.name, 
                status: r.responseStatus 
              }))
            );
            meta.failedResources = failedResources;
          }
        }
      } catch (diagError) {
        console.error('Error collecting diagnostic information:', diagError);
      }
    }
    
    // For ApiErrors, log additional details
    if (error instanceof ApiError) {
      console.error('API Error:', {
        code: error.code,
        statusCode: error.statusCode,
        details: error.details
      });
      
      // Add API error specific metadata
      meta.apiErrorCode = error.code;
      meta.apiStatusCode = error.statusCode;
      if (error.details) {
        meta.apiErrorDetails = error.details;
      }
    }
    
    // Update state with metadata
    this.setState({ errorMeta: meta });
    
    console.groupEnd();
    
    // Send error to monitoring service (if available)
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'exception', {
        description: `${error.name} in ${componentName}: ${error.message}`,
        fatal: true
      });
    }
    
    // Call the onError callback if provided
    this.props.onError?.(error, errorInfo);
  }
  
  componentDidMount(): void {
    if (this.props.catchUnhandledPromises !== false && typeof window !== 'undefined') {
      this.unhandledRejectionHandler = (event: PromiseRejectionEvent) => {
        console.error('[ErrorBoundary] Unhandled promise rejection caught:', event.reason);
        
        // Don't update state if the error was already caught by React
        if (!this.state.hasError) {
          // Prepare the error
          const error = event.reason instanceof Error 
            ? event.reason 
            : new Error(String(event.reason));
          
          // Extra metadata for promise rejections
          const meta = {
            isPromiseRejection: true,
            timestamp: new Date().toISOString(),
            url: window.location.href,
            componentName: this.props.componentName || 'unknown'
          };
          
          this.setState({
            hasError: true,
            error,
            errorInfo: null,
            errorMeta: meta
          });
          
          // Call the onError callback with the promise rejection
          if (this.props.onError) {
            const errorInfo = { componentStack: 'Promise rejection (no component stack available)' } as React.ErrorInfo;
            this.props.onError(error, errorInfo);
          }
        }
      };
      
      window.addEventListener('unhandledrejection', this.unhandledRejectionHandler);
    }
  }
  
  componentWillUnmount(): void {
    if (this.unhandledRejectionHandler && typeof window !== 'undefined') {
      window.removeEventListener('unhandledrejection', this.unhandledRejectionHandler);
    }
  }
  
  componentDidUpdate(prevProps: ErrorBoundaryProps): void {
    // Reset the error state if children changed and resetOnChange is true
    if (
      this.props.resetOnChange && 
      this.state.hasError && 
      prevProps.children !== this.props.children
    ) {
      this.resetErrorBoundary();
    }
  }
  
  resetErrorBoundary(): void {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      errorMeta: {}
    });
  }
  
  private unhandledRejectionHandler?: (event: PromiseRejectionEvent) => void;

  render(): React.ReactNode {
    if (this.state.hasError) {
      // Render fallback UI if provided, otherwise render the default fallback
      if (this.props.fallback) {
        return this.props.fallback;
      }
      
      return (
        <DefaultErrorFallback 
          error={this.state.error} 
          errorInfo={this.state.errorInfo}
          errorMeta={this.state.errorMeta}
          showDetails={this.props.showDetails}
          onReset={this.resetErrorBoundary}
          componentName={this.props.componentName}
        />
      );
    }

    return this.props.children;
  }
}

// For TypeScript
declare global {
  interface Window {
    gtag?: (command: string, action: string, params: object) => void;
    // Add React DevTools global hook
    __REACT_DEVTOOLS_GLOBAL_HOOK__?: {
      renderers: Record<string, unknown>;
      [key: string]: unknown;
    };
  }
}

export default ErrorBoundary; 