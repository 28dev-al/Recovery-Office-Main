/**
 * Fibonacci Utilities
 * 
 * This file contains utility functions for working with the Fibonacci sequence,
 * following sacred geometry principles throughout the application.
 */

import { PHI } from '../constants/sacred-geometry';

/**
 * Fibonacci sequence up to a certain limit
 * Memoized for performance
 */
export const FIBONACCI_SEQUENCE = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765];

/**
 * Get the nth Fibonacci number
 * 
 * @param n - Position in the Fibonacci sequence (0-indexed)
 * @returns The nth Fibonacci number
 */
export const getFibonacciNumber = (n: number): number => {
  // Handle edge cases
  if (n < 0) return 0;
  if (n < FIBONACCI_SEQUENCE.length) return FIBONACCI_SEQUENCE[n] || 0;
  
  // For larger numbers, approximate using Binet's formula
  // (this avoids issues with recursion for large n values)
  return Math.round((Math.pow(PHI, n) - Math.pow(1 - PHI, n)) / Math.sqrt(5));
};

/**
 * Find the closest Fibonacci number to a given value
 * 
 * @param value - The target value
 * @param options - Options for the search
 * @returns The closest Fibonacci number
 */
export const findClosestFibonacci = (
  value: number, 
  options: { 
    floor?: boolean; // When true, returns the largest Fibonacci number ≤ value
    ceiling?: boolean; // When true, returns the smallest Fibonacci number ≥ value
  } = {}
): number => {
  const { floor, ceiling } = options;
  
  if (value <= 0) return 0;
  
  // Find the closest Fibonacci number
  let index = 0;
  while (index < FIBONACCI_SEQUENCE.length - 1 && (FIBONACCI_SEQUENCE[index] || 0) < value) {
    index++;
  }
  
  if ((FIBONACCI_SEQUENCE[index] || 0) === value) {
    return FIBONACCI_SEQUENCE[index] || 0;
  }
  
  if (floor && (FIBONACCI_SEQUENCE[index] || 0) > value) {
    return FIBONACCI_SEQUENCE[Math.max(0, index - 1)] || 0;
  }
  
  if (ceiling && (FIBONACCI_SEQUENCE[index] || 0) < value) {
    return FIBONACCI_SEQUENCE[Math.min(FIBONACCI_SEQUENCE.length - 1, index + 1)] || 0;
  }
  
  // Return the closest Fibonacci number
  const lower = FIBONACCI_SEQUENCE[Math.max(0, index - 1)] || 0;
  const higher = FIBONACCI_SEQUENCE[Math.min(FIBONACCI_SEQUENCE.length - 1, index)] || 0;
  
  return Math.abs(value - lower) < Math.abs(value - higher) ? lower : higher;
};

/**
 * Generate a Fibonacci sequence up to a maximum value
 * 
 * @param max - Maximum value for the sequence
 * @returns Array of Fibonacci numbers up to max
 */
export const generateFibonacciSequence = (max: number): number[] => {
  if (max <= 0) return [0];
  
  const sequence = [0, 1];
  while (sequence[sequence.length - 1] + sequence[sequence.length - 2] <= max) {
    sequence.push(sequence[sequence.length - 1] + sequence[sequence.length - 2]);
  }
  
  return sequence;
};

/**
 * Check if a number is a Fibonacci number
 * 
 * @param num - Number to check
 * @returns True if the number is in the Fibonacci sequence
 */
export const isFibonacciNumber = (num: number): boolean => {
  // A number is a Fibonacci number if and only if one or both of
  // (5*n^2 + 4) or (5*n^2 - 4) is a perfect square
  const isPerfectSquare = (n: number): boolean => {
    const sqrt = Math.sqrt(n);
    return sqrt === Math.floor(sqrt);
  };
  
  return isPerfectSquare(5 * num * num + 4) || isPerfectSquare(5 * num * num - 4);
};

/**
 * Calculate the next Fibonacci number after a given value
 * 
 * @param currentValue - Current value
 * @returns Next Fibonacci number after currentValue
 */
export const getNextFibonacci = (currentValue: number): number => {
  for (let i = 0; i < FIBONACCI_SEQUENCE.length; i++) {
    if ((FIBONACCI_SEQUENCE[i] || 0) > currentValue) {
      return FIBONACCI_SEQUENCE[i] || 0;
    }
  }
  
  // If currentValue is larger than our predefined sequence,
  // approximate using PHI
  return Math.round(currentValue * PHI);
};

/**
 * Calculate the previous Fibonacci number before a given value
 * 
 * @param currentValue - Current value
 * @returns Previous Fibonacci number before currentValue
 */
export const getPrevFibonacci = (currentValue: number): number => {
  for (let i = FIBONACCI_SEQUENCE.length - 1; i >= 0; i--) {
    if ((FIBONACCI_SEQUENCE[i] || 0) < currentValue) {
      return FIBONACCI_SEQUENCE[i] || 0;
    }
  }
  
  // If currentValue is smaller than the smallest Fibonacci number
  return 0;
};

export default {
  getFibonacciNumber,
  findClosestFibonacci,
  generateFibonacciSequence,
  isFibonacciNumber,
  getNextFibonacci,
  getPrevFibonacci,
  FIBONACCI_SEQUENCE
}; 





