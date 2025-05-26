/**
 * Portal Component
 * 
 * A component that creates a portal to render children outside the DOM hierarchy.
 * Used by modal and other overlay components.
 */

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export interface PortalProps {
  /**
   * The content to render in the portal
   */
  children: React.ReactNode;
  
  /**
   * The DOM node to mount the portal to
   * @default document.body
   */
  container?: HTMLElement;
}

/**
 * Portal component for rendering content outside the normal DOM hierarchy
 * Useful for modals, tooltips, dropdown menus, etc.
 */
export const Portal: React.FC<PortalProps> = ({
  children,
  container = typeof document !== 'undefined' ? document.body : undefined
}) => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);
  
  return mounted && container ? createPortal(children, container) : null;
};

export default Portal; 