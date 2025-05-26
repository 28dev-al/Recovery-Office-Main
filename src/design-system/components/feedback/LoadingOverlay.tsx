/**
 * LoadingOverlay Component
 * 
 * A component that displays a loading state with an optional message.
 * It overlays the content and prevents interaction while loading.
 * Implements sacred geometry principles for loading indicators.
 */

import * as React from 'react';
import styled, { keyframes } from 'styled-components';

export interface LoadingOverlayProps {
  /**
   * The message to display
   */
  message?: string;
  
  /**
   * Whether the loading overlay is active
   * @default true
   */
  isActive?: boolean;
  
  /**
   * The z-index of the overlay
   * @default 10
   */
  zIndex?: number;
  
  /**
   * The background color of the overlay
   * @default 'rgba(255, 255, 255, 0.9)'
   */
  backgroundColor?: string;
  
  /**
   * The color of the spinner
   * @default '#0A214F'
   */
  spinnerColor?: string;
  
  /**
   * The color of the text
   * @default '#333333'
   */
  textColor?: string;
}

// Simple, robust rotation animation
const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

// Simple pulse animation without complex calculations
const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
`;

// Main overlay container
const LoadingContainer = styled.div<{ 
  $isActive?: boolean; 
  $zIndex?: number; 
  $backgroundColor?: string; 
}>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${props => props.$backgroundColor || 'rgba(255, 255, 255, 0.9)'};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: ${props => props.$zIndex || 10};
  opacity: ${props => props.$isActive ? 1 : 0};
  visibility: ${props => props.$isActive ? 'visible' : 'hidden'};
  transition: opacity 300ms ease, visibility 300ms ease;
`;

// Loading content wrapper
const LoadingContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  max-width: 300px;
  text-align: center;
`;

// Spinner component with safe fallback colors
const Spinner = styled.div<{ $spinnerColor?: string }>`
  width: 40px;
  height: 40px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid ${props => props.$spinnerColor || '#0A214F'};
  border-radius: 50%;
  animation: ${rotate} 1s linear infinite;
`;

// Loading text with safe styling
const LoadingText = styled.div<{ $textColor?: string }>`
  margin-top: 16px;
  color: ${props => props.$textColor || '#333333'};
  font-size: 16px;
  font-weight: 500;
  animation: ${pulse} 2s ease-in-out infinite;
`;

/**
 * LoadingOverlay Component
 * 
 * Displays a loading spinner with an optional message
 */
export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  message = "Loading...",
  isActive = true,
  zIndex = 10,
  backgroundColor = 'rgba(255, 255, 255, 0.9)',
  spinnerColor = '#0A214F',
  textColor = '#333333'
}) => {
  if (!isActive) {
    return null;
  }

  return (
    <LoadingContainer
      $isActive={isActive}
      $zIndex={zIndex}
      $backgroundColor={backgroundColor}
      role="dialog"
      aria-live="polite"
      aria-busy={isActive}
      aria-label="Loading"
    >
      <LoadingContent>
      <Spinner $spinnerColor={spinnerColor} />
      {message && (
          <LoadingText $textColor={textColor}>
          {message}
          </LoadingText>
      )}
      </LoadingContent>
    </LoadingContainer>
  );
};

export default LoadingOverlay; 