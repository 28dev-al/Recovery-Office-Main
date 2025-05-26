/**
 * VisuallyHidden Component
 * 
 * A component that hides content visually but keeps it accessible to screen readers.
 * This is an important accessibility tool for providing context to screen reader users
 * while not affecting the visual layout of the page.
 */

import * as React from 'react';
import styled from 'styled-components';

export interface VisuallyHiddenProps {
  /**
   * The content to be visually hidden
   */
  children: React.ReactNode;
  
  /**
   * Whether content should be focusable
   * @default false
   */
  isFocusable?: boolean;
  
  /**
   * ARIA live attribute for announcements
   * @default undefined
   */
  'aria-live'?: 'polite' | 'assertive' | 'off';
  
  /**
   * Whether ARIA live region should announce all changes
   * @default undefined
   */
  'aria-atomic'?: boolean;
  
  /**
   * Additional CSS class name
   */
  className?: string;
  
  /**
   * ID for the element
   */
  id?: string;
}

// Using standard visually-hidden CSS technique
// This makes content invisible to sighted users but available to screen readers
const HiddenSpan = styled.span<{ $isFocusable?: boolean }>`
  border: 0;
  clip: rect(0, 0, 0, 0);
  height: 1px;
  width: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  word-wrap: normal;
  
  // Restore visibility on focus if focusable
  ${props => props.$isFocusable && `
    &:focus,
    &:active {
      clip: auto;
      height: auto;
      width: auto;
      margin: 0;
      overflow: visible;
      position: static;
      white-space: normal;
    }
  `}
`;

/**
 * VisuallyHidden Component
 * 
 * Hides content visually while keeping it accessible to screen readers
 */
export const VisuallyHidden: React.FC<VisuallyHiddenProps> = ({
  children,
  isFocusable = false,
  'aria-live': ariaLive,
  'aria-atomic': ariaAtomic,
  className,
  id,
  ...rest
}) => {
  const ariaProps = {
    ...(ariaLive && { 'aria-live': ariaLive }),
    ...(ariaAtomic !== undefined && { 'aria-atomic': ariaAtomic })
  };
  
  return (
    <HiddenSpan 
      $isFocusable={isFocusable}
      className={className}
      id={id}
      tabIndex={isFocusable ? 0 : undefined}
      {...ariaProps}
      {...rest}
    >
      {children}
    </HiddenSpan>
  );
};

export default VisuallyHidden; 