/**
 * ValidationMessage Component
 * 
 * A premium component for displaying form validation messages
 * with appropriate styling for financial applications.
 */

import * as React from 'react';
import styled from 'styled-components';
import { PHI, PHI_INVERSE } from '../../../../constants/sacred-geometry';
import { Box } from '../../layout';

// SVG icons for validation states
const ErrorIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="8" r="7.5" stroke="currentColor" />
    <path d="M8 4V9" stroke="currentColor" strokeLinecap="round" />
    <circle cx="8" cy="11.5" r="0.5" fill="currentColor" />
  </svg>
);

const SuccessIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="8" r="7.5" stroke="currentColor" />
    <path d="M5 8L7 10L11 6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const WarningIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.79285 2.79311C8.62849 2.51578 8.32463 2.34375 7.99967 2.34375C7.67471 2.34375 7.37085 2.51578 7.20649 2.79311L1.54387 12.6718C1.38607 12.9356 1.39607 13.2609 1.5697 13.5137C1.74334 13.7665 2.04848 13.9141 2.37705 13.9141H13.6223C13.9509 13.9141 14.256 13.7665 14.4296 13.5137C14.6033 13.2609 14.6133 12.9356 14.4555 12.6718L8.79285 2.79311Z" stroke="currentColor" />
    <path d="M8 6V9.5" stroke="currentColor" strokeLinecap="round" />
    <circle cx="8" cy="11.5" r="0.5" fill="currentColor" />
  </svg>
);

const InfoIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="8" r="7.5" stroke="currentColor" />
    <circle cx="8" cy="5" r="0.5" fill="currentColor" />
    <path d="M8 7V12" stroke="currentColor" strokeLinecap="round" />
  </svg>
);

// Validation message props
export interface ValidationMessageProps {
  /**
   * The validation message to display
   */
  message: React.ReactNode;
  
  /**
   * The type of validation message
   * @default 'error'
   */
  type?: 'error' | 'warning' | 'success' | 'info';
  
  /**
   * Whether to show an icon
   * @default true
   */
  showIcon?: boolean;
  
  /**
   * Size of the validation message
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';
  
  /**
   * Additional className
   */
  className?: string;
  
  /**
   * Data attribute for testing
   */
  'data-testid'?: string;
}

// Styled validation message container
const ValidationContainer = styled.div<{
  type: 'error' | 'warning' | 'success' | 'info';
  size: 'sm' | 'md' | 'lg';
}>`
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: ${props => props.theme.spacing.xs}px;
  padding: ${props => props.theme.spacing.xxs}px ${props => props.theme.spacing.xs}px;
  border-radius: ${props => props.theme.radius.xs}px;
  font-family: ${props => props.theme.typography.fontFamily.body};
  
  /* Size-specific styles */
  ${props => {
    switch (props.size) {
      case 'sm':
        return `
          font-size: ${props.theme.typography.fontSize.xs}px;
          min-height: ${props.theme.spacing.md * 1.25}px;
        `;
      case 'lg':
        return `
          font-size: ${props.theme.typography.fontSize.sm}px;
          min-height: ${props.theme.spacing.lg * 1.25}px;
        `;
      case 'md':
      default:
        return `
          font-size: ${props.theme.typography.fontSize.sm}px;
          min-height: ${props.theme.spacing.md * 1.5}px;
        `;
    }
  }}
  
  /* Type-specific styles */
  ${props => {
    switch (props.type) {
      case 'error':
        return `
          color: ${props.theme.colors.feedback.error.main};
          background-color: ${props.theme.colors.feedback.error.light}10; /* 10 = 6% opacity in hex */
        `;
      case 'warning':
        return `
          color: ${props.theme.colors.feedback.warning.main};
          background-color: ${props.theme.colors.feedback.warning.light}10;
        `;
      case 'success':
        return `
          color: ${props.theme.colors.feedback.success.main};
          background-color: ${props.theme.colors.feedback.success.light}10;
        `;
      case 'info':
      default:
        return `
          color: ${props.theme.colors.feedback.info.main};
          background-color: ${props.theme.colors.feedback.info.light}10;
        `;
    }
  }}
`;

// Styled icon container
const IconContainer = styled.div<{
  size: 'sm' | 'md' | 'lg';
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${props => props.theme.spacing.xs}px;
  flex-shrink: 0;
  
  /* Size-specific styles */
  ${props => {
    switch (props.size) {
      case 'sm':
        return `
          width: ${props.theme.spacing.sm * PHI}px;
          height: ${props.theme.spacing.sm * PHI}px;
        `;
      case 'lg':
        return `
          width: ${props.theme.spacing.md * PHI}px;
          height: ${props.theme.spacing.md * PHI}px;
        `;
      case 'md':
      default:
        return `
          width: ${props.theme.spacing.md}px;
          height: ${props.theme.spacing.md}px;
        `;
    }
  }}
`;

// Styled message text
const MessageText = styled.div`
  flex: 1;
  line-height: ${PHI};
`;

/**
 * ValidationMessage Component
 * 
 * A component for displaying form validation messages with
 * appropriate styling and icons for financial applications.
 */
const ValidationMessage: React.FC<ValidationMessageProps> = ({
  message,
  type = 'error',
  showIcon = true,
  size = 'md',
  className,
  'data-testid': testId = 'validation-message',
}) => {
  // Select the appropriate icon based on type
  const renderIcon = () => {
    switch (type) {
      case 'error':
        return <ErrorIcon />;
      case 'warning':
        return <WarningIcon />;
      case 'success':
        return <SuccessIcon />;
      case 'info':
      default:
        return <InfoIcon />;
    }
  };
  
  return (
    <ValidationContainer 
      type={type} 
      size={size} 
      className={className}
      data-testid={testId}
      role={type === 'error' ? 'alert' : 'status'}
      aria-live={type === 'error' ? 'assertive' : 'polite'}
    >
      {showIcon && (
        <IconContainer size={size}>
          {renderIcon()}
        </IconContainer>
      )}
      <MessageText>{message}</MessageText>
    </ValidationContainer>
  );
};

export default ValidationMessage; 