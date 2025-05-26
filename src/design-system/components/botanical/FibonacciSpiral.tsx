/**
 * FibonacciSpiral Component
 * 
 * A component that renders a Fibonacci spiral, which is a golden spiral 
 * approximated using a sequence of quarter-circles connected end-to-end.
 * 
 * The Fibonacci spiral grows by a factor approximately equal to the golden ratio
 * with each quarter turn, creating a mathematically accurate representation
 * of nature's growth patterns.
 */

import * as React from 'react';
import BotanicalElement, { BotanicalElementProps } from './BotanicalElement';

/**
 * FibonacciSpiral component props
 */
export interface FibonacciSpiralProps extends Omit<BotanicalElementProps, 'children'> {
  /**
   * The number of quarter-turns in the spiral
   * @default 10
   */
  iterations?: number;
  
  /**
   * The size of the smallest square in the sequence
   * @default 1
   */
  startSize?: number;
  
  /**
   * Whether to show the Fibonacci squares in the background
   * @default false
   */
  showSquares?: boolean;
  
  /**
   * Whether to reflect the spiral (mirror image)
   * @default false
   */
  reflect?: boolean;
  
  /**
   * Optional rotation of the entire pattern in degrees
   * @default 0
   */
  rotation?: number;
} 

/**
 * Generates a Fibonacci spiral with the given parameters
 */
const generateFibonacciSpiral = (
  iterations: number = 10,
  startSize: number = 1,
  showSquares: boolean = false,
  reflect: boolean = false
): React.ReactNode => {
  const elements: JSX.Element[] = [];
  const scale = 0.1; // Scale factor to fit within viewBox
  
  // Generate a sequence of Fibonacci numbers starting with startSize
  const fibonacciSequence: number[] = [startSize, startSize];
  for (let i = 2; i < iterations + 2; i++) {
    fibonacciSequence.push(fibonacciSequence[i - 1] + fibonacciSequence[i - 2]);
  }
  
  // Create an array to hold the squares
  const squares: { x: number; y: number; size: number; }[] = [];
  
  // Starting position at the center of the viewBox
  let x = 50;
  let y = 50;
  
  // Generate squares and their positions
  for (let i = 0; i < iterations; i++) {
    const size = fibonacciSequence[i] ?? 1 * scale;
    
    // Determine position based on the current iteration
    // This follows the pattern of a Fibonacci spiral
    const quadrant = i % 4;
    
    switch (quadrant) {
      case 0: // Top right quadrant
        squares.push({ x, y: y - size, size });
        x += size;
        break;
      case 1: // Bottom right quadrant
        squares.push({ x, y, size });
        y += size;
        break;
      case 2: // Bottom left quadrant
        x -= size;
        squares.push({ x, y, size });
        break;
      case 3: // Top left quadrant
        y -= size;
        squares.push({ x, y, size });
        break;
    }
  }
  
  // If requested, show the Fibonacci squares
  if (showSquares) {
    squares.forEach((square, index) => {
      elements.push(
        <rect
          key={`square-${index}`}
          x={square.x}
          y={square.y}
          width={square.size}
          height={square.size}
          fill="none"
          strokeDasharray="2,1"
          className="fibonacci-square"
        />
      );
    });
  }
  
  // Create the spiral path using a sequence of quarter-circle arcs
  let spiralPath = '';
  
  for (let i = 0; i < iterations - 1; i++) {
    const square = squares[i];
    const nextSquare = squares[i + 1];
    // Type guards for square and nextSquare
    if (!square || !nextSquare) continue;
    const size = square.size;
    
    let startX, startY, endX, endY, radiusX, radiusY;
    const quadrant = i % 4;
    
    switch (quadrant) {
      case 0: // Top right quadrant
        startX = square.x + size;
        startY = square.y + size;
        endX = nextSquare.x;
        endY = nextSquare.y + nextSquare.size;
        radiusX = size;
        radiusY = size;
        spiralPath += `${i === 0 ? 'M' : 'L'} ${startX},${startY} A ${radiusX},${radiusY} 0 0,${reflect ? 0 : 1} ${endX},${endY} `;
        break;
      case 1: // Bottom right quadrant
        startX = square.x;
        startY = square.y + size;
        endX = nextSquare.x;
        endY = nextSquare.y;
        radiusX = size;
        radiusY = size;
        spiralPath += `L ${startX},${startY} A ${radiusX},${radiusY} 0 0,${reflect ? 0 : 1} ${endX},${endY} `;
        break;
      case 2: // Bottom left quadrant
        startX = square.x;
        startY = square.y;
        endX = nextSquare.x + nextSquare.size;
        endY = nextSquare.y;
        radiusX = size;
        radiusY = size;
        spiralPath += `L ${startX},${startY} A ${radiusX},${radiusY} 0 0,${reflect ? 0 : 1} ${endX},${endY} `;
        break;
      case 3: // Top left quadrant
        startX = square.x + size;
        startY = square.y;
        endX = nextSquare.x + nextSquare.size;
        endY = nextSquare.y + nextSquare.size;
        radiusX = size;
        radiusY = size;
        spiralPath += `L ${startX},${startY} A ${radiusX},${radiusY} 0 0,${reflect ? 0 : 1} ${endX},${endY} `;
        break;
    }
  }
  
  // Add the spiral path
  elements.push(
    <path
      key="spiral"
      d={spiralPath}
      fill="none"
      className="fibonacci-spiral"
    />
  );
  
  return elements;
}; 

/**
 * FibonacciSpiral Component with ref forwarding
 * 
 * Creates a mathematically accurate Fibonacci spiral
 */
export const FibonacciSpiral = React.forwardRef<SVGSVGElement, FibonacciSpiralProps>(
  ({ 
    iterations = 10,
    startSize = 1,
    showSquares = false,
    reflect = false,
    rotation = 0,
    viewBox = '0 0 100 100',
    ...rest 
  }, ref) => {
    return (
      <BotanicalElement
        viewBox={viewBox}
        ref={ref}
        {...rest}
      >
        <g 
          transform={`rotate(${rotation}, 50, 50)`}
          style={{ transformOrigin: 'center' }}
        >
          {generateFibonacciSpiral(
            iterations,
            startSize,
            showSquares,
            reflect
          )}
        </g>
      </BotanicalElement>
    );
  }
);

FibonacciSpiral.displayName = 'FibonacciSpiral';

export default FibonacciSpiral; 






