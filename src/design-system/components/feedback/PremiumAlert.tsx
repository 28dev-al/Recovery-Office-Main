/**
 * PremiumAlert Component
 * 
 * A premium alert component for financial notices and important information
 * with professional styling for financial services websites.
 */

import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { Box } from '../layout';
import { 
  PROFESSIONAL_EASINGS, 
  ANIMATION_DURATION 
} from '../../../constants/professional-animations';

// Types for alert variations
export type AlertStatus = 'info' | 'success' | 'warning' | 'error' | 'neutral';
export type AlertVariant = 'solid' | 'subtle' | 'outline' | 'left-accent';

// Props for the alert component
export interface PremiumAlertProps {
  /**
   * The main content of the alert
   */
  children: React.ReactNode;
  
  /**
   * The title of the alert (optional)
   */
  title?: React.ReactNode;
  
  /**
   * The status of the alert, affects styling and icon
   * @default 'info'
   */
  status?: AlertStatus;
  
  /**
   * The visual variant of the alert
   * @default 'subtle'
   */
  variant?: AlertVariant;
  
  /**
   * Whether the alert can be dismissed
   * @default false
   */
  dismissible?: boolean;
  
  /**
   * Callback when the alert is dismissed
   */
  onDismiss?: () => void;
  
  /**
   * Whether to show an icon based on status
   * @default true
   */
  showIcon?: boolean;
  
  /**
   * Custom icon to override the default status icon
   */
  icon?: React.ReactNode;
  
  /**
   * Size of the alert
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';
  
  /**
   * Additional class name
   */
  className?: string;
  
  /**
   * Data attribute for testing
   */
  'data-testid'?: string;
}

// Status icon SVGs for different alert types
const StatusIcon = {
  info: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="2"/>
      <circle cx="10" cy="6" r="1" fill="currentColor"/>
      <path d="M10 9V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  success: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="2"/>
      <path d="M6 10L9 13L14 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  warning: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 1L19 18H1L10 1Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10 7V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="10" cy="15" r="1" fill="currentColor"/>
    </svg>
  ),
  error: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="2"/>
      <path d="M13 7L7 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M7 7L13 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  neutral: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="2"/>
      <path d="M10 6V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M6 10H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )
};

// Financial service specific alert icons
const FinancialStatusIcon = {
  fraud: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2"/>
      <path d="M8 8L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M12 8L8 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M10 16V18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M10 2V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M16 10H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M2 10H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  regulatory: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 18L2 7L10 2L18 7V18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6 10L9 13L14 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  security: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 18C10 18 17 14.5 17 10V4.5L10 2L3 4.5V10C3 14.5 10 18 10 18Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7 10L9 12L13 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
};

// Close icon for dismissible alerts
const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 4L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M4 4L12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

// Get colors based on status
const getStatusColors = (status: AlertStatus, theme: any) => {
  switch (status) {
    case 'info':
      return {
        color: theme.colors.feedback.info.main,
        bg: theme.colors.feedback.info.light,
        borderColor: theme.colors.feedback.info.main,
        textColor: theme.colors.feedback.info.dark
      };
    case 'success':
      return {
        color: theme.colors.feedback.success.main,
        bg: theme.colors.feedback.success.light,
        borderColor: theme.colors.feedback.success.main,
        textColor: theme.colors.feedback.success.dark
      };
    case 'warning':
      return {
        color: theme.colors.feedback.warning.main,
        bg: theme.colors.feedback.warning.light,
        borderColor: theme.colors.feedback.warning.main,
        textColor: theme.colors.feedback.warning.dark
      };
    case 'error':
      return {
        color: theme.colors.feedback.error.main,
        bg: theme.colors.feedback.error.light,
        borderColor: theme.colors.feedback.error.main,
        textColor: theme.colors.feedback.error.dark
      };
    case 'neutral':
    default:
      return {
        color: theme.colors.text.secondary,
        bg: theme.colors.background[100],
        borderColor: theme.colors.background[300],
        textColor: theme.colors.text.primary
      };
  }
};

// Styled alert container
const AlertContainer = styled.div<{
  $status: AlertStatus;
  $variant: AlertVariant;
  $size: 'sm' | 'md' | 'lg';
}>`
  position: relative;
  display: flex;
  width: 100%;
  overflow: hidden;
  border-radius: ${props => props.theme.radius.md}px;
  
  /* Size-specific styles */
  ${props => {
    switch (props.$size) {
      case 'sm':
        return `
          font-size: ${props.theme.typography.fontSize.sm}px;
          padding: ${props.theme.spacing.sm}px;
        `;
      case 'lg':
        return `
          font-size: ${props.theme.typography.fontSize.md}px;
          padding: ${props.theme.spacing.lg}px;
        `;
      case 'md':
      default:
        return `
          font-size: ${props.theme.typography.fontSize.base}px;
          padding: ${props.theme.spacing.md}px;
        `;
    }
  }}
  
  /* Variant-specific styles */
  ${props => {
    const colors = getStatusColors(props.$status, props.theme);
    
    switch (props.$variant) {
      case 'solid':
        return `
          background-color: ${colors.color};
          color: ${props.theme.colors.white};
        `;
      case 'outline':
        return `
          background-color: transparent;
          border: 1px solid ${colors.borderColor};
          color: ${colors.textColor};
        `;
      case 'left-accent':
        return `
          background-color: ${colors.bg};
          border-left: 4px solid ${colors.color};
          color: ${colors.textColor};
        `;
      case 'subtle':
      default:
        return `
          background-color: ${colors.bg};
          color: ${colors.textColor};
        `;
    }
  }}
`;

// Styled icon container
const IconContainer = styled.div<{
  $status: AlertStatus;
  $variant: AlertVariant;
  $size: 'sm' | 'md' | 'lg';
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-right: ${props => props.theme.spacing.sm}px;
  
  /* Size-specific styles */
  ${props => {
    switch (props.$size) {
      case 'sm':
        return `
          width: ${props.theme.spacing.md * 1.25}px;
          height: ${props.theme.spacing.md * 1.25}px;
        `;
      case 'lg':
        return `
          width: ${props.theme.spacing.lg * 1.5}px;
          height: ${props.theme.spacing.lg * 1.5}px;
        `;
      case 'md':
      default:
        return `
          width: ${props.theme.spacing.lg}px;
          height: ${props.theme.spacing.lg}px;
        `;
    }
  }}
  
  /* Status-specific color */
  color: ${props => {
    const colors = getStatusColors(props.$status, props.theme);
    return props.$variant === 'solid' ? props.theme.colors.white : colors.color;
  }};
`;

// Styled content container
const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

// Styled title
const AlertTitle = styled.div<{
  $status: AlertStatus;
  $variant: AlertVariant;
  $size: 'sm' | 'md' | 'lg';
}>`
  font-weight: ${props => props.theme.typography.fontWeight.semiBold};
  font-family: ${props => props.theme.typography.fontFamily.heading};
  margin-bottom: ${props => props.theme.spacing.xs}px;
  
  /* Size-specific styles */
  ${props => {
    switch (props.$size) {
      case 'sm':
        return `font-size: ${props.theme.typography.fontSize.sm}px;`;
      case 'lg':
        return `font-size: ${props.theme.typography.fontSize.lg}px;`;
      case 'md':
      default:
        return `font-size: ${props.theme.typography.fontSize.md}px;`;
    }
  }}
`;

// Styled message
const AlertMessage = styled.div<{
  $hasTitle: boolean;
}>`
  line-height: 1.5;
  opacity: ${props => props.$hasTitle ? 0.9 : 1};
`;

// Styled close button
const CloseButton = styled.button<{
  $status: AlertStatus;
  $variant: AlertVariant;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  padding: ${props => props.theme.spacing.xxs}px;
  margin-left: ${props => props.theme.spacing.sm}px;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  transition: all ${ANIMATION_DURATION.standard}s cubic-bezier(${PROFESSIONAL_EASINGS.standard.join(', ')});
  
  /* Status-specific color */
  color: ${props => {
    const colors = getStatusColors(props.$status, props.theme);
    return props.$variant === 'solid' ? props.theme.colors.white : colors.color;
  }};
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${props => {
      const colors = getStatusColors(props.$status, props.theme);
      return props.$variant === 'solid' ? 'rgba(255, 255, 255, 0.4)' : colors.bg;
    }};
  }
`;

/**
 * Premium Alert Component
 * 
 * A premium alert component for financial notices and important information
 * with professional styling for financial services websites.
 */
export const PremiumAlert: React.FC<PremiumAlertProps> = ({
  children,
  title,
  status = 'info',
  variant = 'subtle',
  dismissible = false,
  onDismiss,
  showIcon = true,
  icon,
  size = 'md',
  className,
  'data-testid': testId = 'premium-alert',
}) => {
  // Track if alert is dismissed when no external control is provided
  const [isDismissed, setIsDismissed] = useState(false);
  
  // Handle dismiss action
  const handleDismiss = () => {
    if (onDismiss) {
      onDismiss();
    } else {
      setIsDismissed(true);
    }
  };
  
  // If dismissed internally and no external control, don't render
  if (isDismissed && !onDismiss) {
    return null;
  }
  
  // Determine which icon to display
  const statusIcon = icon || StatusIcon[status];
  
  return (
    <AlertContainer
      $status={status}
      $variant={variant}
      $size={size}
      className={className}
      data-testid={testId}
      role={status === 'error' ? 'alert' : 'status'}
    >
      {showIcon && (
        <IconContainer $status={status} $variant={variant} $size={size}>
          {statusIcon}
        </IconContainer>
      )}
      
      <ContentContainer>
        {title && (
          <AlertTitle $status={status} $variant={variant} $size={size}>
            {title}
          </AlertTitle>
        )}
        
        <AlertMessage $hasTitle={!!title}>
          {children}
        </AlertMessage>
      </ContentContainer>
      
      {dismissible && (
        <CloseButton 
          onClick={handleDismiss}
          aria-label="Close alert"
          $status={status}
          $variant={variant}
        >
          <CloseIcon />
        </CloseButton>
      )}
    </AlertContainer>
  );
};

// Additional financial industry specific variants
export const FraudAlert: React.FC<Omit<PremiumAlertProps, 'status' | 'icon'>> = (props) => (
  <PremiumAlert 
    {...props}
    status="error"
    icon={FinancialStatusIcon.fraud}
  />
);

export const RegulatoryAlert: React.FC<Omit<PremiumAlertProps, 'status' | 'icon'>> = (props) => (
  <PremiumAlert 
    {...props}
    status="info"
    icon={FinancialStatusIcon.regulatory}
  />
);

export const SecurityAlert: React.FC<Omit<PremiumAlertProps, 'status' | 'icon'>> = (props) => (
  <PremiumAlert 
    {...props}
    status="warning"
    icon={FinancialStatusIcon.security}
  />
);

export default PremiumAlert; 