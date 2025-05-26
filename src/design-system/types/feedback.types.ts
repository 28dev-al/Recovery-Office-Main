/**
 * Feedback Components Type Definitions
 * 
 * This file defines TypeScript interfaces for feedback components
 * to ensure consistency and type safety throughout the application.
 * These components follow sacred geometry principles for visual harmony.
 */

import * as React from 'react';
import { BoxProps } from './styled.types';
import { DefaultTheme } from 'styled-components';

/**
 * Animation easing function types that respect sacred geometry
 */
export interface AnimationConfig {
  /**
   * Animation variant for feedback components
   */
  animationVariant?: 'scale' | 'slide' | 'fade';
  
  /**
   * Easing function for animations based on sacred geometry
   */
  easingFunction?: 'goldenEaseIn' | 'goldenEaseOut' | 'goldenEaseInOut' | 'standard' | 'easeIn' | 'easeOut' | 'botanical';
  
  /**
   * Animation duration in milliseconds
   * Typically follows Fibonacci sequence values
   */
  duration?: number;
}

/**
 * Base props for Modal components with sacred geometry animation options
 */
export interface AnimatedModalProps extends Omit<BoxProps, 'position'> {
  /**
   * Whether the modal is currently open
   */
  isOpen: boolean;
  
  /**
   * Function called when the modal should close
   */
  onClose: () => void;
  
  /**
   * The size of the modal (follows sacred proportions)
   */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  
  /**
   * The position of the modal on the screen
   */
  position?: 'center' | 'top' | 'top-right' | 'right' | 'bottom-right' | 'bottom' | 'bottom-left' | 'left' | 'top-left';
  
  /**
   * Whether to close the modal when clicking outside
   */
  closeOnOverlayClick?: boolean;
  
  /**
   * Whether to close the modal when the Escape key is pressed
   */
  closeOnEsc?: boolean;
  
  /**
   * Animation configuration
   */
  animation?: AnimationConfig;
  
  /**
   * Whether the modal is non-scrollable
   */
  isCentered?: boolean;
  
  /**
   * Modal title content
   */
  title?: React.ReactNode;
  
  /**
   * Whether to include a close button
   */
  hasCloseButton?: boolean;
  
  /**
   * Whether to lock focus within the modal
   */
  trapFocus?: boolean;
  
  /**
   * Whether to block scrolling of the page content while modal is open
   */
  blockScrollOnMount?: boolean;
}

/**
 * Base props for Toast/Alert components
 */
export interface FeedbackAlertProps extends BoxProps {
  /**
   * Status of the alert - influences styling and icons
   */
  status?: 'info' | 'success' | 'warning' | 'error';
  
  /**
   * Variant of the alert styling
   */
  variant?: 'solid' | 'subtle' | 'outline' | 'left-accent';
  
  /**
   * Whether the alert can be dismissed by the user
   */
  isDismissible?: boolean;
  
  /**
   * Callback when the alert is dismissed
   */
  onDismiss?: () => void;
  
  /**
   * Whether to show an icon based on the status
   */
  showIcon?: boolean;
  
  /**
   * Title text for the alert
   */
  title?: React.ReactNode;
  
  /**
   * Animation configuration
   */
  animation?: AnimationConfig;
}

/**
 * Toast notification props with duration and positioning
 */
export interface ToastNotificationProps extends Omit<FeedbackAlertProps, 'position'> {
  /**
   * Duration in milliseconds that the toast appears
   * Uses Fibonacci sequence for timing
   */
  duration?: number;
  
  /**
   * Position of the toast
   */
  toastPosition?: 'top' | 'bottom' | 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  
  /**
   * Toast unique ID for management
   */
  id?: string;
}

/**
 * Toast manager component props
 */
export interface ToastManagerProps {
  /**
   * Child components
   */
  children: React.ReactNode;
  
  /**
   * Default options for all toasts
   */
  defaultOptions?: Partial<ToastNotificationProps>;
}

/**
 * Loading component props with sacred geometry animation
 */
export interface LoadingProps extends BoxProps {
  /**
   * Whether the loading component is visible
   */
  isLoading?: boolean;
  
  /**
   * Message to display during loading
   */
  message?: string;
  
  /**
   * Size of the loading indicator following golden ratio
   */
  size?: 'sm' | 'md' | 'lg' | number | string;
  
  /**
   * Whether to show botanical decorations
   */
  withBotanical?: boolean;
  
  /**
   * Animation configuration
   */
  animation?: AnimationConfig;
} 