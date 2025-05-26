/**
 * BookingErrorBoundary Component
 * 
 * Error boundary specifically designed for the booking system.
 * Prevents component errors from crashing the entire booking page.
 */

import React, { Component, ErrorInfo, ReactNode } from 'react';
import styled from 'styled-components';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  componentName?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

export class BookingErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const { componentName = 'BookingComponent' } = this.props;
    
    console.error(`[BookingErrorBoundary] ${componentName} error:`, error);
    console.error(`[BookingErrorBoundary] ${componentName} error info:`, errorInfo);
    
    this.setState({
      error,
      errorInfo
    });
  }

  handleRetry = () => {
    this.setState({ 
      hasError: false, 
      error: undefined, 
      errorInfo: undefined 
    });
  };

  render() {
    if (this.state.hasError) {
      // Return custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error fallback
      return (
        <ErrorFallback>
          <ErrorIcon>⚠️</ErrorIcon>
          <ErrorTitle>Component Loading Error</ErrorTitle>
          <ErrorMessage>
            We're having trouble loading this section of the booking system. 
            This won't affect other parts of your booking process.
          </ErrorMessage>
          <ErrorDetails>
            <summary>Technical Details (Click to expand)</summary>
            <ErrorCode>
              <strong>Component:</strong> {this.props.componentName || 'Unknown'}
              <br />
              <strong>Error:</strong> {this.state.error?.message || 'Unknown error'}
              <br />
              <strong>Stack:</strong>
              <pre>{this.state.error?.stack}</pre>
            </ErrorCode>
          </ErrorDetails>
          <ErrorActions>
            <RetryButton onClick={this.handleRetry}>
              Try Again
            </RetryButton>
            <ReloadButton onClick={() => window.location.reload()}>
              Reload Page
            </ReloadButton>
          </ErrorActions>
        </ErrorFallback>
      );
    }

    return this.props.children;
  }
}

// Styled Components
const ErrorFallback = styled.div`
  padding: 32px;
  text-align: center;
  background: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  margin: 16px;
  max-width: 600px;
  margin: 16px auto;
`;

const ErrorIcon = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
`;

const ErrorTitle = styled.h3`
  color: #dc3545;
  margin: 0 0 16px 0;
  font-size: 20px;
  font-weight: 600;
`;

const ErrorMessage = styled.p`
  color: #6c757d;
  margin: 0 0 24px 0;
  line-height: 1.5;
  font-size: 16px;
`;

const ErrorDetails = styled.details`
  text-align: left;
  margin: 16px 0;
  
  summary {
    cursor: pointer;
    color: #6c757d;
    font-size: 14px;
    margin-bottom: 8px;
  }
`;

const ErrorCode = styled.div`
  background: #f1f3f4;
  padding: 12px;
  border-radius: 4px;
  font-family: monospace;
  font-size: 12px;
  color: #495057;
  
  pre {
    white-space: pre-wrap;
    word-break: break-word;
    margin: 8px 0 0 0;
    max-height: 200px;
    overflow-y: auto;
  }
`;

const ErrorActions = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-top: 24px;
`;

const RetryButton = styled.button`
  background: #0A214F;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: background-color 0.2s ease;
  
  &:hover {
    background: #0a1a3a;
  }
  
  &:focus {
    outline: 2px solid #0A214F;
    outline-offset: 2px;
  }
`;

const ReloadButton = styled.button`
  background: #6c757d;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: background-color 0.2s ease;
  
  &:hover {
    background: #5a6268;
  }
  
  &:focus {
    outline: 2px solid #6c757d;
    outline-offset: 2px;
  }
`;

// Simple loading fallback component
export const SimpleLoader: React.FC<{ message?: string }> = ({ 
  message = "Loading..." 
}) => (
  <SimpleLoaderContainer>
    <SimpleSpinner />
    <SimpleLoaderText>{message}</SimpleLoaderText>
  </SimpleLoaderContainer>
);

const SimpleLoaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  min-height: 200px;
`;

const SimpleSpinner = styled.div`
  width: 32px;
  height: 32px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #0A214F;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const SimpleLoaderText = styled.div`
  margin-top: 16px;
  color: #6c757d;
  font-size: 14px;
`;

export default BookingErrorBoundary; 