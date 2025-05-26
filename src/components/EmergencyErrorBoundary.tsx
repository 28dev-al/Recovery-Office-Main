import React from 'react';
import styled from 'styled-components';

interface EmergencyErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
  renderCount: number;
}

interface EmergencyErrorBoundaryProps {
  children: React.ReactNode;
}

const ErrorContainer = styled.div`
  padding: 40px;
  text-align: center;
  background: #fee;
  border: 2px solid #f00;
  border-radius: 12px;
  margin: 20px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const ErrorIcon = styled.div`
  font-size: 64px;
  margin-bottom: 20px;
`;

const ErrorTitle = styled.h2`
  color: #d00;
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 16px;
`;

const ErrorMessage = styled.p`
  color: #800;
  font-size: 16px;
  margin-bottom: 24px;
  line-height: 1.5;
`;

const ErrorDetails = styled.div`
  background: #f9f9f9;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 24px;
  text-align: left;
  
  h4 {
    margin: 0 0 8px 0;
    color: #666;
  }
  
  p {
    margin: 4px 0;
    color: #666;
    font-size: 14px;
  }
`;

const ErrorActions = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
`;

const ErrorButton = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 12px 24px;
  background: ${props => props.variant === 'secondary' ? '#666' : '#d00'};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  
  &:hover {
    background: ${props => props.variant === 'secondary' ? '#555' : '#b00'};
  }
`;

const TechnicalDetails = styled.details`
  margin-top: 24px;
  padding: 16px;
  background: #f0f0f0;
  border-radius: 8px;
  text-align: left;
  
  summary {
    cursor: pointer;
    font-weight: bold;
    color: #666;
    margin-bottom: 8px;
  }
  
  pre {
    margin: 8px 0;
    padding: 12px;
    background: white;
    border: 1px solid #ddd;
    border-radius: 4px;
    overflow-x: auto;
    font-size: 12px;
    white-space: pre-wrap;
    word-wrap: break-word;
  }
`;

export class EmergencyErrorBoundary extends React.Component<EmergencyErrorBoundaryProps, EmergencyErrorBoundaryState> {
  private renderCountRef = 0;
  private lastErrorTime = 0;
  private errorLoopThreshold = 3;
  private errorLoopTimeWindow = 1000; // 1 second

  constructor(props: EmergencyErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      renderCount: 0
    };
  }

  static getDerivedStateFromError(error: Error): Partial<EmergencyErrorBoundaryState> {
    return {
      hasError: true,
      error: error
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.renderCountRef += 1;
    const now = Date.now();
    
    console.error('🚨 [EMERGENCY ERROR BOUNDARY] Caught error:', error);
    console.error('🚨 [EMERGENCY ERROR BOUNDARY] Error info:', errorInfo);
    console.error(`🚨 [EMERGENCY ERROR BOUNDARY] Render count: ${this.renderCountRef}`);

    // Detect error loops
    if (now - this.lastErrorTime < this.errorLoopTimeWindow) {
      console.error('🚨 [EMERGENCY] RAPID ERROR DETECTED - Possible error loop');
      
      if (this.renderCountRef > this.errorLoopThreshold) {
        console.error('🚨 [EMERGENCY] ERROR LOOP DETECTED - FORCING RELOAD');
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    }

    this.lastErrorTime = now;
    this.setState({
      error,
      errorInfo,
      renderCount: this.renderCountRef
    });
  }

  handleRestart = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      renderCount: 0
    });
    this.renderCountRef = 0;
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <ErrorContainer>
          <ErrorIcon>💥</ErrorIcon>
          <ErrorTitle>Recovery Office System Error</ErrorTitle>
          <ErrorMessage>
            The booking system encountered a critical error and has been stopped to prevent data corruption.
          </ErrorMessage>
          
          <ErrorDetails>
            <h4>Error: {this.state.error?.message}</h4>
            <p>Render Count: {this.state.renderCount}</p>
            {this.state.renderCount > this.errorLoopThreshold && (
              <p style={{ color: '#d00', fontWeight: 'bold' }}>
                ⚠️ Error loop detected - System will reload automatically
              </p>
            )}
          </ErrorDetails>

          <ErrorActions>
            <ErrorButton onClick={this.handleRestart}>
              Try to Restart Component
            </ErrorButton>
            
            <ErrorButton variant="secondary" onClick={this.handleReload}>
              Reload Application
            </ErrorButton>
          </ErrorActions>

          <TechnicalDetails>
            <summary>Technical Details (for developers)</summary>
            <pre>{JSON.stringify({
              error: this.state.error?.toString(),
              stack: this.state.error?.stack,
              componentStack: this.state.errorInfo?.componentStack,
              renderCount: this.state.renderCount,
              timestamp: new Date().toISOString(),
              userAgent: navigator.userAgent,
              url: window.location.href
            }, null, 2)}</pre>
          </TechnicalDetails>
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
} 