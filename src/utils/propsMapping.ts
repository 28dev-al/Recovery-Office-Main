/**
 * Props Mapping Utilities
 * 
 * Utilities for mapping between different prop naming conventions
 * to ensure consistency across the application.
 */

import * as React from 'react';
// Removing unused PHI import
// import { PHI } from '../constants/sacred-geometry';

/**
 * Interface for the mapped props
 */
interface MappedProps {
  isDisabled?: boolean;
  alignment?: string;
  [key: string]: any;
}

/**
 * Maps common prop names to their design system equivalents
 * 
 * This utility helps maintain consistency between standard HTML attributes
 * and our design system's prop naming conventions.
 * 
 * @param props Original props object
 * @returns Mapped props object with design system naming conventions
 */
export const mapToDSProps = <T extends Record<string, any>>(props: T): Partial<T> & MappedProps => {
  // Create a properly typed copy of props
  const mappedProps = { ...props } as Partial<T> & MappedProps;
  
  // Map disabled -> isDisabled (maintaining sacred proportions in transition)
  if ('disabled' in props && !('isDisabled' in props)) {
    mappedProps.isDisabled = props.disabled;
    delete mappedProps.disabled;
  }
  
  // Map align -> alignment (maintaining sacred proportions in naming)
  if ('align' in props && !('alignment' in props)) {
    mappedProps.alignment = props.align;
    delete mappedProps.align;
  }
  
  // Add more mappings as needed, following sacred geometry principles
  // (e.g., maintaining proportional naming conventions)
  
  return mappedProps;
};

/**
 * Creates a component wrapper that maps standard props to design system props
 * 
 * @param Component The component to wrap
 * @returns A wrapped component with prop mapping
 */
export const withPropMapping = <P extends Record<string, any>>(
  Component: React.ComponentType<P>
): React.FC<Omit<P, 'isDisabled' | 'alignment'> & { disabled?: boolean; align?: string }> => {
  const WrappedComponent: React.FC<any> = (props) => {
    const mappedProps = mapToDSProps(props);
    return React.createElement(Component, mappedProps as P);
  };
  
  // Preserve display name using a clear naming convention
  const displayName = Component.displayName || Component.name;
  WrappedComponent.displayName = `PropMapped${displayName}`;
  
  return WrappedComponent;
};

/**
 * Creates a version of Button that accepts both disabled and isDisabled props
 * 
 * This higher-order function wraps specific components to make them 
 * backward compatible with standard HTML attributes.
 * 
 * @param ButtonComponent The Button component to wrap
 * @returns A wrapped Button component that accepts both prop formats
 */
export const createCompatibleButton = <P extends Record<string, any>>(
  ButtonComponent: React.ComponentType<P>
): React.FC<P & { disabled?: boolean }> => {
  const CompatibleButton: React.FC<P & { disabled?: boolean }> = ({
    disabled,
    isDisabled,
    ...props
  }: any) => {
    // Use isDisabled if provided, otherwise use disabled
    const effectiveDisabled = isDisabled !== undefined ? isDisabled : disabled;
    
    // Create properly typed props object
    const buttonProps = {
      ...props,
      isDisabled: effectiveDisabled
    } as P;
    
    return React.createElement(ButtonComponent, buttonProps);
  };
  
  // Set display name with clear naming convention
  CompatibleButton.displayName = `${ButtonComponent.displayName || 'Button'}Compatible`;
  
  return CompatibleButton;
}; 





