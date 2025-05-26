/**
 * Alert Component
 * 
 * A component for displaying important messages to users.
 * The Alert follows sacred geometry principles with golden ratio proportions,
 * Fibonacci-based spacing, and sacred timing for animations.
 */

import * as React from 'react';
import { useState, useEffect } from 'react';;
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { getFibonacciByIndex } from '../../../utils/getFibonacciByIndex';
import { 
  PHI, 
  PHI_INVERSE, 
  SACRED_RADIUS,
  SACRED_SPACING,
  ANIMATION_TIMING,
  SACRED_EASINGS
} from '../../../constants/sacred-geometry';

// Alert variants
export type AlertStatus = 'info' | 'success' | 'warning' | 'error';

// Alert variants - visual treatment
export type AlertVariant = 'subtle' | 'solid' | 'left-accent' | 'top-accent' | 'outline';

// Alert props interface
export interface AlertProps {
  /** The status of the alert */
  status?: AlertStatus;
  /** The variant of the alert */
  variant?: AlertVariant;
  /** The title of the alert */
  title?: React.ReactNode;
  /** The description of the alert */
  description?: React.ReactNode;
  /** Whether to show the icon */
  showIcon?: boolean;
  /** Whether the alert is dismissible */
  isDismissible?: boolean;
  /** Callback fired when the alert is dismissed */
  onDismiss?: () => void;
  /** Whether the component should auto-dismiss */
  autoHideDuration?: number;
  /** Element to be placed before the title */
  icon?: React.ReactNode;
  /** Additional CSS class */
  className?: string;
  /** Whether the alert is visible */
  isVisible?: boolean;
  /** Custom z-index for the alert */
  zIndex?: number;
  /** Children to be rendered inside the alert (main content) */
  children?: React.ReactNode;
}

// Status color maps based on alert type
const statusColorMap = {
  info: {
    bg: '#EBF8FF',
    solidBg: '#4299E1',
    border: '#BEE3F8',
    color: '#2B6CB0',
    iconColor: '#3182CE'
  },
  success: {
    bg: '#F0FFF4',
    solidBg: '#48BB78',
    border: '#C6F6D5',
    color: '#2F855A',
    iconColor: '#38A169'
  },
  warning: {
    bg: '#FFFAF0',
    solidBg: '#ED8936',
    border: '#FEEBC8',
    color: '#C05621',
    iconColor: '#DD6B20'
  },
  error: {
    bg: '#FFF5F5',
    solidBg: '#F56565',
    border: '#FED7D7',
    color: '#C53030',
    iconColor: '#E53E3E'
  }
};

// Status icons for different alert types
const StatusIcon = ({ status }: { status: AlertStatus }) => {
  switch (status) {
    case 'info':
      return (
        <svg viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8C11 7.44772 11.4477 7 12 7ZM12 10C12.5523 10 13 10.4477 13 11V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V11C11 10.4477 11.4477 10 12 10Z" />
        </svg>
      );
    case 'success':
      return (
        <svg viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM16.7071 10.7071C17.0976 10.3166 17.0976 9.68342 16.7071 9.29289C16.3166 8.90237 15.6834 8.90237 15.2929 9.29289L11 13.5858L8.70711 11.2929C8.31658 10.9024 7.68342 10.9024 7.29289 11.2929C6.90237 11.6834 6.90237 12.3166 7.29289 12.7071L10.2929 15.7071C10.6834 16.0976 11.3166 16.0976 11.7071 15.7071L16.7071 10.7071Z" />
        </svg>
      );
    case 'warning':
      return (
        <svg viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor">
          <path fillRule="evenodd" clipRule="evenodd" d="M12.8944 3.06357L22.7019 20.7098C23.0726 21.3704 22.5894 22.1449 21.8474 22.1449H2.15256C1.41063 22.1449 0.927442 21.3704 1.29805 20.7098L11.1056 3.06357C11.4757 2.40352 12.5243 2.40352 12.8944 3.06357ZM12 8C12.5523 8 13 8.44772 13 9V14C13 14.5523 12.5523 15 12 15C11.4477 15 11 14.5523 11 14V9C11 8.44772 11.4477 8 12 8ZM12 18C12.5523 18 13 17.5523 13 17C13 16.4477 12.5523 16 12 16C11.4477 16 11 16.4477 11 17C11 17.5523 11.4477 18 12 18Z" />
        </svg>
      );
    case 'error':
      return (
        <svg viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM9.70711 8.29289C9.31658 7.90237 8.68342 7.90237 8.29289 8.29289C7.90237 8.68342 7.90237 9.31658 8.29289 9.70711L10.5858 12L8.29289 14.2929C7.90237 14.6834 7.90237 15.3166 8.29289 15.7071C8.68342 16.0976 9.31658 16.0976 9.70711 15.7071L12 13.4142L14.2929 15.7071C14.6834 16.0976 15.3166 16.0976 15.7071 15.7071C16.0976 15.3166 16.0976 14.6834 15.7071 14.2929L13.4142 12L15.7071 9.70711C16.0976 9.31658 16.0976 8.68342 15.7071 8.29289C15.3166 7.90237 14.6834 7.90237 14.2929 8.29289L12 10.5858L9.70711 8.29289Z" />
        </svg>
      );
    default:
      return null;
  }
};

// Styled Alert container component
const AlertContainer = styled(motion.div)<{
  status: AlertStatus;
  variant: AlertVariant;
  showIcon: boolean;
  isDismissible: boolean;
  zIndex?: number;
}>`
  position: relative;
  display: flex;
  width: 100%;
  align-items: flex-start;
  border-radius: ${SACRED_RADIUS.md}px;
  padding: ${SACRED_SPACING.md}px;
  box-sizing: border-box;
  overflow: hidden;
  z-index: ${props => props.zIndex || 'auto'};

  /* Variant-specific styling */
  ${props => {
    const colors = statusColorMap[props.status];
    
    switch (props.variant) {
      case 'solid':
        return `
          background-color: ${colors.solidBg};
          color: white;
        `;
      case 'left-accent':
        return `
          background-color: ${colors.bg};
          color: ${colors.color};
          border-left: ${getFibonacciByIndex(4)}px solid ${colors.solidBg};
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
        `;
      case 'top-accent':
        return `
          background-color: ${colors.bg};
          color: ${colors.color};
          border-top: ${getFibonacciByIndex(4)}px solid ${colors.solidBg};
          border-top-left-radius: 0;
          border-top-right-radius: 0;
        `;
      case 'outline':
        return `
          background-color: transparent;
          color: ${colors.color};
          border: 1px solid ${colors.border};
        `;
      case 'subtle':
      default:
        return `
          background-color: ${colors.bg};
          color: ${colors.color};
        `;
    }
  }}

  /* Apply golden ratio to padding when icon is present */
  ${props => props.showIcon && `
    padding-left: ${SACRED_SPACING.md * PHI}px;
  `}
`;

// Icon container with sacred proportions
const IconContainer = styled.div<{ status: AlertStatus; variant: AlertVariant }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: ${getFibonacciByIndex(7)}px;
  height: ${getFibonacciByIndex(7)}px;
  margin-right: ${SACRED_SPACING.md}px;
  border-radius: 50%;
  color: ${props => props.variant === 'solid' ? 'white' : statusColorMap[props.status].iconColor};
`;

// Content container with flexible layout
const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
`;

// Alert title with golden ratio typography
const AlertTitle = styled.div`
  font-weight: 600;
  font-size: ${getFibonacciByIndex(6) * PHI}px;
  margin-bottom: ${props => props.children ? SACRED_SPACING.xs * PHI_INVERSE : 0}px;
  line-height: ${PHI + 0.2};
`;

// Alert description with proper line height
const AlertDescription = styled.div`
  font-size: ${getFibonacciByIndex(6)}px;
  line-height: ${PHI};
`;

// Close button with sacred proportions
const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  padding: ${SACRED_SPACING.xs}px;
  margin-left: ${SACRED_SPACING.sm}px;
  cursor: pointer;
  flex-shrink: 0;
  width: ${getFibonacciByIndex(6) * PHI}px;
  height: ${getFibonacciByIndex(6) * PHI}px;
  border-radius: 50%;
  color: inherit;
  opacity: 0.7;
  transition: opacity 0.2s ease;
  
  &:hover {
    opacity: 1;
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(66, 153, 225, 0.3);
  }
  
  svg {
    width: ${getFibonacciByIndex(5) * PHI}px;
    height: ${getFibonacciByIndex(5) * PHI}px;
  }
`;

// Animation variants using sacred timing
const alertAnimationVariants = {
  hidden: { 
    opacity: 0,
    y: -SACRED_SPACING.md,
    scale: PHI_INVERSE,
  },
  visible: { 
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: ANIMATION_TIMING.standard / 1000,
      ease: SACRED_EASINGS.standard
    }
  },
  exit: { 
    opacity: 0,
    x: SACRED_SPACING.xl,
    transition: {
      duration: ANIMATION_TIMING.quick / 1000,
      ease: SACRED_EASINGS.standard
    }
  }
};

/**
 * Alert Component with ref forwarding
 * 
 * Displays status messages to users with sacred geometry proportions
 */
export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      status = 'info',
      variant = 'subtle',
      title,
      description,
      children,
      showIcon = true,
      isDismissible = false,
      onDismiss,
      autoHideDuration,
      icon,
      className,
      isVisible = true,
      zIndex,
      ...rest
    },
    ref
  ) => {
    const [visible, setVisible] = useState(isVisible);

    // Handle auto-dismiss functionality
    useEffect(() => {
      setVisible(isVisible);
    }, [isVisible]);

    useEffect(() => {
      if (autoHideDuration && visible) {
        const timer = setTimeout(() => {
          setVisible(false);
          if (onDismiss) onDismiss();
        }, autoHideDuration);
        
        return () => clearTimeout(timer);
      }
    }, [autoHideDuration, visible, onDismiss]);

    // Handle dismiss action
    const handleDismiss = () => {
      setVisible(false);
      if (onDismiss) onDismiss();
    };

    // Render the status icon or custom icon
    const renderIcon = () => {
      if (icon) return <IconContainer status={status} variant={variant}>{icon}</IconContainer>;
      if (showIcon) return <IconContainer status={status} variant={variant}><StatusIcon status={status} /></IconContainer>;
      return null;
    };

    // Render close button if alert is dismissible
    const renderCloseButton = () => {
      if (!isDismissible) return null;
      
      return (
        <CloseButton onClick={handleDismiss} aria-label="Close alert">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </CloseButton>
      );
    };

    // Use either description or children for content
    const content = description || children;

    return (
      <AnimatePresence>
        {visible && (
          <AlertContainer
            ref={ref}
            status={status}
            variant={variant}
            showIcon={showIcon && (!!icon || true)}
            isDismissible={isDismissible}
            className={className}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={alertAnimationVariants}
            zIndex={zIndex}
            {...rest}
          >
            {renderIcon()}
            
            <ContentContainer>
              {title && <AlertTitle>{title}</AlertTitle>}
              {content && <AlertDescription>{content}</AlertDescription>}
            </ContentContainer>
            
            {renderCloseButton()}
          </AlertContainer>
        )}
      </AnimatePresence>
    );
  }
);

Alert.displayName = 'Alert';

export default Alert; 










