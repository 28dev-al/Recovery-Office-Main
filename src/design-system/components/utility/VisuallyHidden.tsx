import React from 'react';
import styled from 'styled-components';

/**
 * Visually hidden component for accessibility.
 * Hides content visually while keeping it available for screen readers.
 */
const HiddenSpan = styled.span`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  width: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  word-wrap: normal;
`;

export interface VisuallyHiddenProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * The content to be visually hidden
   */
  children: React.ReactNode;
}

/**
 * VisuallyHidden component hides content visually while keeping it accessible to screen readers.
 * Use it for elements that should be announced by screen readers but not visible on screen.
 */
export const VisuallyHidden = React.forwardRef<HTMLSpanElement, VisuallyHiddenProps>(
  (props, ref) => {
    return <HiddenSpan ref={ref} {...props} />;
  }
);

VisuallyHidden.displayName = 'VisuallyHidden';

export default VisuallyHidden; 