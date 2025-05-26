/**
 * Toast Component
 * 
 * A toast notification system that displays temporary messages with sacred geometry positioning.
 * Implements golden ratio proportions for natural visual harmony and Fibonacci sequence for timing.
 * Includes support for different variants, positions, and animation behaviors.
 */

import * as React from 'react';
import { useState, useEffect, useCallback, useContext } from 'react';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { createPortal } from 'react-dom';
import { getFibonacciByIndex } from '../../../utils/getFibonacciByIndex';
import { 
  PHI, 
  PHI_INVERSE, 
  FIBONACCI, 
  ANIMATION_TIMING, 
  SACRED_EASINGS,
  SACRED_SPACING,
  SACRED_RADIUS
} from '../../../constants/sacred-geometry';
import { Box } from '../layout/Box';

// Toast position options (following sacred placement principles)
export type ToastPosition = 
  | 'top'
  | 'top-right'
  | 'right'
  | 'bottom-right'
  | 'bottom'
  | 'bottom-left'
  | 'left'
  | 'top-left';

// Toast variants
export type ToastVariant = 'info' | 'success' | 'warning' | 'error';

// Status types for toast
export type ToastStatus = 'default' | 'info' | 'success' | 'warning' | 'error';

// Toast notification interface
export interface Toast {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  status?: ToastStatus;
  duration?: number;
  isClosable?: boolean;
  onClose?: () => void;
  position?: ToastPosition;
}

// Main Toast props interface
export interface ToastProps {
  /** Unique identifier for the toast */
  id: string;
  /** The toast title */
  title?: React.ReactNode;
  /** The toast description */
  description?: React.ReactNode;
  /** How long the toast remains visible (in ms) */
  duration?: number;
  /** Toast variant */
  status?: ToastStatus;
  /** Whether to show the close button */
  isClosable?: boolean;
  /** Function to close the toast */
  onClose?: () => void;
  /** Position of the toast */
  position?: ToastPosition;
}

// ToastOptions extends ToastProps but doesn't require ID
export type ToastOptions = Omit<ToastProps, 'id'> & { id?: string };

// Interface for the Toast Provider
export interface ToastProviderProps {
  children: React.ReactNode;
  defaultOptions?: ToastOptions;
}

// Interface for the Toast context
export interface ToastContextValue {
  toasts: Toast[];
  toast: (options: ToastOptions) => string;
  update: (id: string, options: ToastOptions) => void;
  closeAll: () => void;
  close: (id: string) => void;
  isActive: (id: string) => boolean;
}

// Create the Toast context
const ToastContext = React.createContext<ToastContextValue | undefined>(undefined);

// Styled container for all toasts at a specific position
const ToastContainer = styled(motion.div)<{ position: ToastPosition }>`
  position: fixed;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: ${SACRED_SPACING.md}px;
  padding: ${SACRED_SPACING.md}px;
  max-width: 100%;
  max-height: 100vh;
  overflow-y: auto;
  
  /* Calculate position based on sacred geometry principles */
  ${props => {
    switch (props.position) {
      case 'top':
        return `
          top: ${SACRED_SPACING.lg}px;
          left: 50%;
          transform: translateX(-50%);
          align-items: center;
        `;
      case 'top-right':
        return `
          top: ${SACRED_SPACING.lg}px;
          right: ${SACRED_SPACING.lg}px;
          align-items: flex-end;
        `;
      case 'right':
        return `
          top: 50%;
          right: ${SACRED_SPACING.lg}px;
          transform: translateY(-50%);
          align-items: flex-end;
        `;
      case 'bottom-right':
        return `
          bottom: ${SACRED_SPACING.lg}px;
          right: ${SACRED_SPACING.lg}px;
          align-items: flex-end;
        `;
      case 'bottom':
        return `
          bottom: ${SACRED_SPACING.lg}px;
          left: 50%;
          transform: translateX(-50%);
          align-items: center;
        `;
      case 'bottom-left':
        return `
          bottom: ${SACRED_SPACING.lg}px;
          left: ${SACRED_SPACING.lg}px;
          align-items: flex-start;
        `;
      case 'left':
        return `
          top: 50%;
          left: ${SACRED_SPACING.lg}px;
          transform: translateY(-50%);
          align-items: flex-start;
        `;
      case 'top-left':
        return `
          top: ${SACRED_SPACING.lg}px;
          left: ${SACRED_SPACING.lg}px;
          align-items: flex-start;
        `;
      default:
        return '';
    }
  }}
  
  /* Scrollbar styling with sacred proportions */
  &::-webkit-scrollbar {
    width: ${getFibonacciByIndex(4)}px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
    border-radius: ${SACRED_RADIUS.sm}px;
  }
`;

// Status colors derived from primary theme colors
const statusColors = {
  default: {
    bg: '#FFFFFF',
    color: '#1A202C',
    accent: '#CBD5E0'
  },
  info: {
    bg: '#EBF8FF',
    color: '#2B6CB0',
    accent: '#4299E1'
  },
  success: {
    bg: '#F0FFF4',
    color: '#2F855A',
    accent: '#48BB78'
  },
  warning: {
    bg: '#FFFAF0',
    color: '#C05621',
    accent: '#ED8936'
  },
  error: {
    bg: '#FFF5F5',
    color: '#C53030',
    accent: '#F56565'
  }
};

// Individual toast item styles
const ToastItem = styled(motion.div)<{ status: ToastStatus }>`
  display: flex;
  padding: ${SACRED_SPACING.md}px;
  align-items: flex-start;
  max-width: ${getFibonacciByIndex(13)}px;
  min-width: ${getFibonacciByIndex(12)}px;
  border-radius: ${SACRED_RADIUS.md}px;
  box-shadow: 0 ${getFibonacciByIndex(4)}px ${getFibonacciByIndex(6)}px rgba(0, 0, 0, 0.1);
  margin-bottom: ${SACRED_SPACING.sm}px;
  pointer-events: auto;
  position: relative;
  
  /* Status-based styling */
  background-color: ${props => statusColors[props.status].bg};
  color: ${props => statusColors[props.status].color};
  border-left: ${getFibonacciByIndex(4)}px solid ${props => statusColors[props.status].accent};
`;

const ToastContent = styled.div`
  flex: 1;
  padding-right: ${SACRED_SPACING.md}px;
`;

const ToastTitle = styled.h3`
  margin: 0;
  font-size: ${getFibonacciByIndex(6)}px;
  font-weight: 600;
  margin-bottom: ${SACRED_SPACING.xs}px;
`;

const ToastDescription = styled.div`
  font-size: ${getFibonacciByIndex(5)}px;
  opacity: 0.9;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${getFibonacciByIndex(6)}px;
  height: ${getFibonacciByIndex(6)}px;
  border-radius: ${SACRED_RADIUS.circle}px;
  color: currentColor;
  opacity: 0.7;
  
  &:hover {
    opacity: 1;
    background-color: rgba(0, 0, 0, 0.05);
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
  }
`;

// Progress bar for toast duration
const ToastProgressBar = styled(motion.div)<{ status: ToastStatus }>`
  position: absolute;
  bottom: 0;
  left: 0;
  height: ${getFibonacciByIndex(2)}px;
  background-color: ${props => statusColors[props.status].accent};
  opacity: 0.7;
`;

// Animation variants for toast notification
const toastVariants = {
  initial: (position: ToastPosition) => {
    if (position.includes('top')) {
      return { opacity: 0, y: -getFibonacciByIndex(7), scale: PHI_INVERSE };
    }
    if (position.includes('bottom')) {
      return { opacity: 0, y: getFibonacciByIndex(7), scale: PHI_INVERSE };
    }
    if (position.includes('left')) {
      return { opacity: 0, x: -getFibonacciByIndex(7), scale: PHI_INVERSE };
    }
    if (position.includes('right')) {
      return { opacity: 0, x: getFibonacciByIndex(7), scale: PHI_INVERSE };
    }
    return { opacity: 0, scale: PHI_INVERSE };
  },
  animate: { 
    opacity: 1, 
    y: 0, 
    x: 0,
    scale: 1,
    transition: { 
      duration: ANIMATION_TIMING.standard / 1000,
      ease: SACRED_EASINGS.standard
    }
  },
  exit: (position: ToastPosition) => {
    if (position.includes('top')) {
      return { 
        opacity: 0, 
        y: -getFibonacciByIndex(7), 
        scale: PHI_INVERSE,
        transition: { 
          duration: ANIMATION_TIMING.quick / 1000,
          ease: SACRED_EASINGS.goldenAccelerate
        }
      };
    }
    if (position.includes('bottom')) {
      return { 
        opacity: 0, 
        y: getFibonacciByIndex(7), 
        scale: PHI_INVERSE,
        transition: { 
          duration: ANIMATION_TIMING.quick / 1000, 
          ease: SACRED_EASINGS.goldenAccelerate
        }
      };
    }
    if (position.includes('left')) {
      return { 
        opacity: 0, 
        x: -getFibonacciByIndex(7), 
        scale: PHI_INVERSE,
        transition: { 
          duration: ANIMATION_TIMING.quick / 1000,
          ease: SACRED_EASINGS.goldenAccelerate
        }
      };
    }
    if (position.includes('right')) {
      return { 
        opacity: 0, 
        x: getFibonacciByIndex(7), 
        scale: PHI_INVERSE,
        transition: { 
          duration: ANIMATION_TIMING.quick / 1000,
          ease: SACRED_EASINGS.goldenAccelerate
        }
      };
    }
    return { 
      opacity: 0, 
      scale: PHI_INVERSE,
      transition: { 
        duration: ANIMATION_TIMING.quick / 1000,
        ease: SACRED_EASINGS.goldenAccelerate
      }
    };
  }
};

// Generate a unique ID for each toast
const generateUniqueId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

/**
 * Toast Component with ref forwarding
 * 
 * Displays temporary notifications with sacred geometry proportions
 */
const ToastComponent = React.forwardRef<HTMLDivElement, ToastProps>(
  ({
    id,
    title,
    description,
    status = 'default',
    duration = ANIMATION_TIMING.slow,
    isClosable = true,
    onClose,
    position = 'bottom-right'
  }, ref) => {
    // Handle toast auto-close with timer
    useEffect(() => {
      if (duration !== null && duration > 0) {
        const timer = setTimeout(() => {
          onClose?.();
        }, duration);
        
        return () => clearTimeout(timer);
      }
    }, [duration, onClose]);
    
    return (
      <ToastItem
        layout
        custom={position}
        variants={toastVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        status={status}
        ref={ref}
      >
        <ToastContent>
          {title && <ToastTitle>{title}</ToastTitle>}
          {description && <ToastDescription>{description}</ToastDescription>}
        </ToastContent>
        
        {isClosable && (
          <CloseButton onClick={onClose} aria-label="Close toast">
            ✕
          </CloseButton>
        )}
        
        {duration !== null && duration > 0 && (
          <ToastProgressBar
            status={status}
            initial={{ width: '100%' }}
            animate={{ width: '0%' }}
            transition={{ 
              duration: duration / 1000,
              ease: 'linear' 
            }}
          />
        )}
      </ToastItem>
    );
  }
);

ToastComponent.displayName = 'Toast';

// Toast Provider component
export const ToastProvider: React.FC<ToastProviderProps> = ({ 
  children, 
  defaultOptions = {} 
}) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  
  // Group toasts by position
  const toastsByPosition = toasts.reduce<Record<ToastPosition, Toast[]>>((acc, toast) => {
    const position = toast.position || defaultOptions.position || 'bottom-right';
    if (!acc[position]) acc[position] = [];
    acc[position].push(toast);
    return acc;
  }, {} as Record<ToastPosition, Toast[]>);
  
  // Add a new toast
  const toast = useCallback((options: ToastOptions): string => {
    const toastId = options.id || generateUniqueId();
    const newToast: Toast = {
      id: toastId,
      ...defaultOptions,
      ...options
    };
    
    setToasts(prev => [...prev, newToast]);
    return toastId;
  }, [defaultOptions]);
  
  // Update an existing toast
  const update = useCallback((id: string, options: ToastOptions): void => {
    setToasts(prev => 
      prev.map(toast => (toast.id === id ? { ...toast, ...options } : toast))
    );
  }, []);
  
  // Close a specific toast
  const close = useCallback((id: string): void => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);
  
  // Close all toasts
  const closeAll = useCallback((): void => {
    setToasts([]);
  }, []);
  
  // Check if a toast is active
  const isActive = useCallback((id: string): boolean => {
    return toasts.some(toast => toast.id === id);
  }, [toasts]);
  
  // Create context value
  const value = {
    toasts,
    toast,
    update,
    close,
    closeAll,
    isActive,
  };
  
  // Create portal container if needed
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);
  
  useEffect(() => {
    if (typeof document !== 'undefined') {
      let element = document.getElementById('toast-portal');
      if (!element) {
        element = document.createElement('div');
        element.id = 'toast-portal';
        document.body.appendChild(element);
      }
      setPortalContainer(element);
    }
  }, []);
  
  return (
    <ToastContext.Provider value={value}>
      {children}
      
      {portalContainer &&
        createPortal(
          <>
            {/* Render toasts grouped by position */}
            {Object.entries(toastsByPosition).map(([position, positionToasts]) => (
              <ToastContainer 
                key={position} 
                position={position as ToastPosition} 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <AnimatePresence initial={false}>
                  {positionToasts.map(toast => (
                    <ToastComponent
                      key={toast.id}
                      id={toast.id}
                      title={toast.title}
                      description={toast.description}
                      status={toast.status}
                      duration={toast.duration}
                      isClosable={toast.isClosable}
                      onClose={() => close(toast.id)}
                      position={position as ToastPosition}
                    />
                  ))}
                </AnimatePresence>
              </ToastContainer>
            ))}
          </>,
          portalContainer
        )}
    </ToastContext.Provider>
  );
};

// Hook to use the toast context
export const useToast = (): ToastContextValue => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

// Create a simple function to use toast outside of React components
let toastManager: ToastContextValue | null = null;

export const createToast = (options: ToastOptions): string => {
  if (!toastManager) {
    throw new Error('Toast manager is not available. Wrap your app with ToastProvider');
  }
  return toastManager.toast(options);
};

export const setToastManager = (manager: ToastContextValue): void => {
  toastManager = manager;
};

// Export the Toast components and utilities
export { ToastComponent as Toast };
export default useToast; 










