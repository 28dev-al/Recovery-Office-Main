/**
 * ToastManager Component
 * 
 * A manager component that initializes the toast system and makes it available throughout the application.
 * This component should be rendered once at the application root to set up the toast manager.
 */

import * as React from 'react';
import { useEffect } from 'react';;
import { ToastProvider, useToast, setToastManager, ToastOptions } from './Toast';

interface ToastManagerProps {
  children: React.ReactNode;
  defaultOptions?: ToastOptions;
}

/**
 * ToastManager initializes the toast system and makes it available throughout the application.
 * It assigns the toast manager instance to a global variable for use outside of React components.
 */
export const ToastManager: React.FC<ToastManagerProps> = ({ 
  children, 
  defaultOptions 
}) => {
  return (
    <ToastProvider defaultOptions={defaultOptions}>
      <ToastInitializer />
      {children}
    </ToastProvider>
  );
};

/**
 * Internal component that initializes the global toast manager on mount
 */
const ToastInitializer: React.FC = () => {
  const toastManager = useToast();
  
  useEffect(() => {
    // Set the toast manager for global access
    setToastManager(toastManager);
    
    return () => {
      // Clean up on unmount (although this shouldn't happen in practice)
      setToastManager(null as any);
    };
  }, [toastManager]);
  
  return null;
};

export default ToastManager; 






