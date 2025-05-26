import { FIBONACCI, FibonacciIndex } from '../constants/sacred-geometry';

/**
 * Utility function to get Fibonacci number by index
 * 
 * Based on the sacred geometry principles, returns the Fibonacci number
 * at a given index. The sequence starts with 0, 1, 1, 2, 3, 5, 8, 13, 21, ...
 * 
 * @param index - The index in the Fibonacci sequence (0-indexed)
 * @returns The Fibonacci number at the given index
 */
export function getFibonacciByIndex(index: number): number {
  // Since FIBONACCI is a Record<number, number> and not an array, we need
  // to handle this differently
  const fibKeys = Object.keys(FIBONACCI).map(Number).sort((a, b) => a - b);
  
  if (index >= 0 && index < fibKeys.length) {
    const key = fibKeys[index] ?? 1;
    return FIBONACCI[key as unknown as FibonacciIndex];
  }
  
  // For indices beyond our predefined values, calculate dynamically
  if (index < 0) {
    throw new Error('Fibonacci index must be non-negative');
  }
  
  let prev = 0;
  let curr = 1;
  
  for (let i = 2; i <= index; i++) {
    const next = prev + curr;
    prev = curr;
    curr = next;
  }
  
  return index === 0 ? 0 : curr;
}

export default getFibonacciByIndex;






