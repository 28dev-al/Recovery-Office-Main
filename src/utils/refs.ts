/**
 * Refs Utilities
 * 
 * This module provides utility functions for handling React refs,
 * especially for combining multiple refs into a single ref callback.
 * This is particularly useful for components with ref forwarding
 * that also need to maintain internal refs.
 */

import { Ref, MutableRefObject, RefCallback } from 'react';

/**
 * Set a single ref, safely handling different ref types
 * 
 * @param ref The ref to set (can be a callback function or ref object)
 * @param value The value to set the ref to
 */
export function setRef<T>(ref: Ref<T> | undefined, value: T): void {
  if (typeof ref === 'function') {
    ref(value);
  } else if (ref) {
    (ref as MutableRefObject<T>).current = value;
  }
}

/**
 * Merges multiple refs into a single ref callback
 * Useful for components that need to combine an externally forwarded ref
 * with internal refs
 * 
 * @param refs Array of refs to merge
 * @returns A ref callback that sets all provided refs
 */
export function mergeRefs<T>(refs: Array<Ref<T> | undefined>): RefCallback<T> {
  return (value: T) => {
    refs.forEach(ref => {
      if (ref) setRef(ref, value);
    });
  };
}

/**
 * Creates a callback ref that updates a state setter function
 * Useful when you need to store the ref value in a state variable
 * 
 * @param setter State setter function to call with the ref value
 * @returns A ref callback that updates the state when the ref changes
 */
export function createRefCallback<T>(setter: (value: T | null) => void): RefCallback<T> {
  return (value: T | null) => {
    setter(value);
  };
}

/**
 * Type guard to check if a ref is a callback function
 * 
 * @param ref The ref to check
 * @returns True if the ref is a callback function
 */
export function isRefCallback<T>(ref: Ref<T>): ref is RefCallback<T> {
  return typeof ref === 'function';
}

/**
 * Type guard to check if a ref is a ref object
 * 
 * @param ref The ref to check
 * @returns True if the ref is a ref object
 */
export function isRefObject<T>(ref: Ref<T>): ref is MutableRefObject<T> {
  return ref !== null && typeof ref === 'object' && 'current' in ref;
} 





