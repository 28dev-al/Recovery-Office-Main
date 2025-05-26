// TODO: This file contains direct window access without SSR checks
/**
 * Modal Component
 * 
 * A component for displaying content that requires user interaction in an overlay.
 * Implements sacred geometry principles for layout, spacing, and animations.
 * Designed with golden ratio proportions for visual harmony.
 */

import * as React from 'react';
import { useState, useEffect, useRef } from 'react';;
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import FocusLock from 'react-focus-lock';
import { RemoveScroll } from 'react-remove-scroll';
import { 
  PHI, 
  PHI_INVERSE, 
  FIBONACCI, 
  SACRED_SPACING, 
  SACRED_RADIUS,
  SACRED_EASINGS,
  ANIMATION_TIMING,
  getFibonacciByIndex
} from '../../../constants/sacred-geometry';
import { Box } from '../layout/Box';
import { Portal } from '../utility/Portal';

// Modal sizes based on sacred geometry
export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

// Modal positions
export type ModalPosition = 'center' | 'top' | 'top-right' | 'right' | 'bottom-right' | 'bottom' | 'bottom-left' | 'left' | 'top-left';

// Modal props
export interface ModalProps {
  /** Whether the modal is currently open */
  isOpen: boolean;
  /** Function called when the modal should close */
  onClose: () => void;
  /** The size of the modal (follows sacred proportions) */
  size?: ModalSize;
  /** The position of the modal on the screen */
  position?: ModalPosition;
  /** Whether to close the modal when clicking outside */
  closeOnOverlayClick?: boolean;
  /** Whether to close the modal when the Escape key is pressed */
  closeOnEsc?: boolean;
  /** Whether the modal is non-scrollable */
  isCentered?: boolean;
  /** Modal title content */
  title?: React.ReactNode;
  /** Whether to include a close button */
  hasCloseButton?: boolean;
  /** Additional class name */
  className?: string;
  /** Modal content */
  children: React.ReactNode;
  /** Initial focus element */
  initialFocusRef?: React.RefObject<HTMLElement>;
  /** Final focus element */
  finalFocusRef?: React.RefObject<HTMLElement>;
  /** Whether to lock focus within the modal */
  trapFocus?: boolean;
  /** Whether to block scrolling of the page content while modal is open */
  blockScrollOnMount?: boolean;
  /** Custom id for the modal */
  id?: string;
}

// Size mappings based on sacred geometry
const sizeMap: Record<ModalSize, string> = {
  sm: `${getFibonacciByIndex(9)}px`,
  md: `${getFibonacciByIndex(10)}px`,
  lg: `${getFibonacciByIndex(11)}px`,
  xl: `${getFibonacciByIndex(12)}px`,
  full: '100vw',
};

// Position styling using sacred geometry
const getPositionStyles = (position: ModalPosition) => {
  switch (position) {
    case 'top':
      return `
        align-items: center;
        justify-content: flex-start;
        padding-top: ${SACRED_SPACING.xl}px;
      `;
    case 'top-right':
      return `
        align-items: flex-end;
        justify-content: flex-start;
        padding-top: ${SACRED_SPACING.xl}px;
        padding-right: ${SACRED_SPACING.xl}px;
      `;
    case 'right':
      return `
        align-items: flex-end;
        justify-content: center;
        padding-right: ${SACRED_SPACING.xl}px;
      `;
    case 'bottom-right':
      return `
        align-items: flex-end;
        justify-content: flex-end;
        padding-bottom: ${SACRED_SPACING.xl}px;
        padding-right: ${SACRED_SPACING.xl}px;
      `;
    case 'bottom':
      return `
        align-items: center;
        justify-content: flex-end;
        padding-bottom: ${SACRED_SPACING.xl}px;
      `;
    case 'bottom-left':
      return `
        align-items: flex-start;
        justify-content: flex-end;
        padding-bottom: ${SACRED_SPACING.xl}px;
        padding-left: ${SACRED_SPACING.xl}px;
      `;
    case 'left':
      return `
        align-items: flex-start;
        justify-content: center;
        padding-left: ${SACRED_SPACING.xl}px;
      `;
    case 'top-left':
      return `
        align-items: flex-start;
        justify-content: flex-start;
        padding-top: ${SACRED_SPACING.xl}px;
        padding-left: ${SACRED_SPACING.xl}px;
      `;
    case 'center':
    default:
      return `
        align-items: center;
        justify-content: center;
      `;
  }
};

// Styled components for modal
const ModalOverlay = styled(motion.div)<{ $position: ModalPosition }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, ${PHI_INVERSE.toFixed(2)}); /* Using PHI_INVERSE for opacity */
  display: flex;
  z-index: 1000;
  
  ${props => getPositionStyles(props.$position)};
`;

const ModalContent = styled(motion.div)<{ size: ModalSize }>`
  background-color: white;
  border-radius: ${SACRED_RADIUS.lg}px;
  box-shadow: 0 ${getFibonacciByIndex(4)}px ${getFibonacciByIndex(6)}px rgba(0, 0, 0, 0.1);
  max-width: ${props => sizeMap[props.size]};
  width: 100%;
  max-height: ${props => props.size === 'full' ? '100vh' : `calc(100vh - ${SACRED_SPACING.xxl * 2}px)`};
  display: flex;
  flex-direction: column;
  position: relative;
  
  /* Apply golden ratio for height proportions when not full size */
  ${props => props.size !== 'full' && `
    /* Optional max-height to maintain the golden ratio */
    min-height: ${props.size === 'sm' 
                  ? getFibonacciByIndex(9) * PHI_INVERSE 
                  : props.size === 'md' 
                    ? getFibonacciByIndex(9) 
                    : props.size === 'lg' 
                      ? getFibonacciByIndex(9) * PHI 
                      : getFibonacciByIndex(10)}px;
  `}
`;

const ModalHeader = styled.header`
  padding: ${SACRED_SPACING.md}px ${SACRED_SPACING.lg}px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #E2E8F0;
`;

const ModalTitle = styled.h3`
  margin: 0;
  font-size: ${getFibonacciByIndex(6)}px;
  font-weight: 600;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${getFibonacciByIndex(7)}px;
  height: ${getFibonacciByIndex(7)}px;
  border-radius: ${SACRED_RADIUS.circle}px;
  color: #4A5568;
  
  &:hover {
    background-color: #E2E8F0;
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #4299E1;
  }
`;

const ModalBody = styled.div`
  padding: ${SACRED_SPACING.lg}px;
  flex: 1;
  overflow-y: auto;
`;

const ModalFooter = styled.footer`
  padding: ${SACRED_SPACING.md}px ${SACRED_SPACING.lg}px;
  display: flex;
  justify-content: flex-end;
  gap: ${SACRED_SPACING.sm}px;
  border-top: 1px solid #E2E8F0;
`;

// Animation variants for modal using sacred timing
const overlayVariants = {
  hidden: { 
    opacity: 0 
  },
  visible: { 
    opacity: 1,
    transition: { 
      duration: ANIMATION_TIMING.standard,
      ease: SACRED_EASINGS.standard
    }
  },
  exit: { 
    opacity: 0,
    transition: { 
      duration: ANIMATION_TIMING.quick,
      ease: SACRED_EASINGS.standard
    }
  }
};

const contentVariants = {
  hidden: { 
    opacity: 0, 
    y: getFibonacciByIndex(6),
    scale: PHI_INVERSE
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { 
      duration: ANIMATION_TIMING.standard,
      ease: SACRED_EASINGS.goldenDecelerate
    }
  },
  exit: { 
    opacity: 0, 
    y: getFibonacciByIndex(5) * -1,
    scale: PHI_INVERSE,
    transition: { 
      duration: ANIMATION_TIMING.quick,
      ease: SACRED_EASINGS.standard
    }
  }
};

/**
 * Modal Component with ref forwarding
 * 
 * Displays content in an overlay with sacred geometry proportions
 */
export const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      isOpen,
      onClose,
      size = 'md',
      position = 'center',
      closeOnOverlayClick = true,
      closeOnEsc = true,
      isCentered = true,
      title,
      hasCloseButton = true,
      className,
      children,
      initialFocusRef,
      finalFocusRef,
      trapFocus = true,
      blockScrollOnMount = true,
      id,
      ...rest
    },
    ref
  ) => {
    const [mounted, setMounted] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);
    
    // Handle click outside the modal content
    const handleOverlayClick = (e: React.MouseEvent) => {
      if (closeOnOverlayClick && e.target === e.currentTarget) {
        onClose();
      }
    };
    
    // Handle escape key press
    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (isOpen && closeOnEsc && e.key === 'Escape') {
          onClose();
        }
      };
      
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, closeOnEsc, onClose]);
    
    // Handle initial focus
    useEffect(() => {
      if (isOpen) {
        setMounted(true);
        if (initialFocusRef?.current) {
          initialFocusRef.current.focus();
        } else if (contentRef.current) {
          contentRef.current.focus();
        }
      }
      
      return () => {
        if (finalFocusRef?.current && isOpen) {
          finalFocusRef.current.focus();
        }
      };
    }, [isOpen, initialFocusRef, finalFocusRef]);
    
    // Define structure for different modal parts
    const modalHeader = title || hasCloseButton ? (
      <ModalHeader>
        {title && <ModalTitle>{title}</ModalTitle>}
        {hasCloseButton && (
          <CloseButton onClick={onClose} aria-label="Close">
            ✕
          </CloseButton>
        )}
      </ModalHeader>
    ) : null;
    
    // Check if children contains ModalBody and ModalFooter components
    const hasCustomStructure = React.Children.toArray(children).some(
      child => React.isValidElement(child) && 
      (child.type === ModalBody || child.type === ModalFooter)
    );
    
    const modalContent = hasCustomStructure ? (
      children
    ) : (
      <>
        <ModalBody>{children}</ModalBody>
      </>
    );
    
    return (
      <AnimatePresence>
        {isOpen && (
          <Portal>
            <RemoveScroll enabled={blockScrollOnMount && isOpen}>
              <FocusLock disabled={!trapFocus} returnFocus>
                <ModalOverlay
                  $position={position}
                  onClick={handleOverlayClick}
                  variants={overlayVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className={className}
                >
                  <ModalContent
                    ref={ref}
                    id={id}
                    tabIndex={-1}
                    role="dialog"
                    aria-modal="true"
                    size={size}
                    variants={contentVariants}
                  >
                    {modalHeader}
                    {modalContent}
                  </ModalContent>
                </ModalOverlay>
              </FocusLock>
            </RemoveScroll>
          </Portal>
        )}
      </AnimatePresence>
    );
  }
);

// Export modal subcomponents
export { ModalBody, ModalFooter };

Modal.displayName = 'Modal';

export default Modal; 










