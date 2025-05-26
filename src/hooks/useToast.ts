/**
 * useToast Hook
 * 
 * This is a wrapper around the Toast component that provides toast functionality
 * without directly importing JSX components, which helps avoid JSX-related TypeScript errors.
 */

import { useState, useCallback } from 'react';

// Toast types
export type ToastType = 'info' | 'success' | 'warning' | 'error';

export interface ToastOptions {
  type?: ToastType;
  title?: string;
  message: string;
  description?: string;
  status?: 'info' | 'success' | 'warning' | 'error';
  duration?: number;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
  onClose?: () => void;
  isClosable?: boolean;
}

// Internal state for toast management
export interface ToastState extends ToastOptions {
  id: string;
  visible: boolean;
}

/**
 * A hook that provides toast notification functionality
 * This avoids direct JSX imports which can cause TypeScript compilation issues
 */
export const useToast = () => {
  const [toasts, setToasts] = useState<ToastState[]>([]);
  
  // Generate a unique ID for each toast
  const generateId = useCallback(() => {
    return `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }, []);
  
  // Add a new toast notification
  const showToast = useCallback((options: ToastOptions) => {
    const id = generateId();
    
    // Handle backward compatibility for status/type and description/message
    const type = options.type || options.status || 'info';
    const message = options.message || options.description || '';
    
    const newToast: ToastState = {
      id,
      visible: true,
      type,
      title: options.title,
      message,
      duration: options.duration || 5000,
      position: options.position || 'top-right',
      onClose: options.onClose,
      isClosable: options.isClosable,
    };
    
    setToasts(prevToasts => [...prevToasts, newToast]);
    
    // Auto-close after duration
    if (newToast.duration !== Infinity) {
      setTimeout(() => {
        closeToast(id);
      }, newToast.duration);
    }
    
    return id;
  }, [generateId]);
  
  // Close toast by ID
  const closeToast = useCallback((id: string) => {
    setToasts(prevToasts => 
      prevToasts.map(toast => 
        toast.id === id ? { ...toast, visible: false } : toast
      )
    );
    
    // Remove from array after animation completes
    setTimeout(() => {
      setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));
    }, 300); // Animation duration
  }, []);
  
  // Convenience methods for different toast types
  const successToast = useCallback((titleOrMessage: string, descriptionOrOptions?: string | Omit<ToastOptions, 'message' | 'type' | 'title'>, duration?: number) => {
    // Handle different argument patterns
    if (typeof descriptionOrOptions === 'string') {
      // If second argument is a string, it's a description
      return showToast({
        title: titleOrMessage,
        message: descriptionOrOptions,
        type: 'success',
        duration: duration || 5000
      });
    } else {
      // Otherwise it's options or undefined
      return showToast({
        ...descriptionOrOptions,
        message: titleOrMessage,
        type: 'success'
      });
    }
  }, [showToast]);
  
  const errorToast = useCallback((titleOrMessage: string, descriptionOrOptions?: string | Omit<ToastOptions, 'message' | 'type' | 'title'>, duration?: number) => {
    // Handle different argument patterns
    if (typeof descriptionOrOptions === 'string') {
      // If second argument is a string, it's a description
      return showToast({
        title: titleOrMessage,
        message: descriptionOrOptions,
        type: 'error',
        duration: duration || 5000
      });
    } else {
      // Otherwise it's options or undefined
      return showToast({
        ...descriptionOrOptions,
        message: titleOrMessage,
        type: 'error'
      });
    }
  }, [showToast]);
  
  const warningToast = useCallback((titleOrMessage: string, descriptionOrOptions?: string | Omit<ToastOptions, 'message' | 'type' | 'title'>, duration?: number) => {
    // Handle different argument patterns
    if (typeof descriptionOrOptions === 'string') {
      // If second argument is a string, it's a description
      return showToast({
        title: titleOrMessage,
        message: descriptionOrOptions,
        type: 'warning',
        duration: duration || 5000
      });
    } else {
      // Otherwise it's options or undefined
      return showToast({
        ...descriptionOrOptions,
        message: titleOrMessage,
        type: 'warning'
      });
    }
  }, [showToast]);
  
  const infoToast = useCallback((titleOrMessage: string, descriptionOrOptions?: string | Omit<ToastOptions, 'message' | 'type' | 'title'>, duration?: number) => {
    // Handle different argument patterns
    if (typeof descriptionOrOptions === 'string') {
      // If second argument is a string, it's a description
      return showToast({
        title: titleOrMessage,
        message: descriptionOrOptions,
        type: 'info',
        duration: duration || 5000
      });
    } else {
      // Otherwise it's options or undefined
      return showToast({
        ...descriptionOrOptions,
        message: titleOrMessage,
        type: 'info'
      });
    }
  }, [showToast]);
  
  // Function to directly show a toast (for compatibility with old usage)
  const toast = useCallback((options: ToastOptions) => {
    return showToast(options);
  }, [showToast]);
  
  return {
    toasts,
    showToast,
    closeToast,
    successToast,
    errorToast,
    warningToast,
    infoToast,
    toast
  };
};

export default useToast; 





