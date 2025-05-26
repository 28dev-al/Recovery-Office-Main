/**
 * IconButton Component
 * 
 * A variant of the Button component optimized for displaying icons.
 * Implements perfect square proportions based on sacred geometry principles.
 * 
 * The IconButton maintains perfect golden ratio-based dimensions
 * and balanced sacred geometry proportions for visual harmony.
 */

import * as React from 'react';
import styled, { css, DefaultTheme } from 'styled-components';

import { PHI, PHI_INVERSE, FIBONACCI } from '../../../constants/sacred-geometry';

/**
 * IconButton props interface
 */
export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button variant affecting styles and colors */
  variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'accent' | 'premium';
  
  /** Size of the button */
  size?: 'sm' | 'md' | 'lg';
  
  /** Whether the button is disabled */
  isDisabled?: boolean;
  
  /** Whether the button is in a loading state */
  isLoading?: boolean;
  
  /** Whether to render with a circular shape */
  isRound?: boolean;
  
  /** Whether to maintain equal width and height (square) */
  isSquare?: boolean;
  
  /** Aria label for accessibility (required) */
  'aria-label': string;
  
  /** Custom class name */
  className?: string;
  
  /** Icon element to display */
  icon: React.ReactNode;
  
  /** Optional tooltip text */
  tooltip?: string;
  
  /** Light background mode */
  onLightBackground?: boolean;
}

/**
 * IconButton Component
 * 
 * A button that displays an icon with touch-friendly target size
 * and appropriate spacing based on sacred geometry principles.
 */
const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({
    variant = 'primary',
    size = 'md',
    isDisabled = false,
    isLoading = false,
    isRound = false,
    isSquare = true,
    'aria-label': ariaLabel,
    className,
    icon,
    tooltip,
    onLightBackground = true,
    ...rest
  }, ref) => {
    return (
      <StyledButton
        ref={ref}
        type="button"
        $variant={variant}
        $size={size}
        $isDisabled={isDisabled || isLoading}
        $isRound={isRound}
        $isSquare={isSquare}
        $isLoading={isLoading}
        $onLightBackground={onLightBackground}
        disabled={isDisabled || isLoading}
        aria-label={ariaLabel}
        title={tooltip || ariaLabel}
        className={className}
        {...rest}
      >
        {isLoading ? (
          <LoadingSpinner $size={size} />
        ) : (
          <IconContainer $size={size}>
            {icon}
          </IconContainer>
        )}
      </StyledButton>
    );
  }
);

IconButton.displayName = 'IconButton';

// Styled components
interface StyledButtonProps {
  $variant: string;
  $size: string;
  $isDisabled: boolean;
  $isRound: boolean;
  $isSquare: boolean;
  $isLoading: boolean;
  $onLightBackground: boolean;
}

// Get size-specific styling
const getSizeStyles = (size: string, theme: DefaultTheme, isSquare: boolean) => {
  // Calculate minimum touch target size
  // Mobile devices need at least 44px touch targets
  const minimumTouchSize = 44;
  
  let dimensions;
  switch (size) {
    case 'sm':
      dimensions = {
        size: Math.max(FIBONACCI[7], minimumTouchSize - FIBONACCI[5]),
        iconSize: FIBONACCI[6],
      };
      break;
    case 'lg':
      dimensions = {
        size: Math.max(FIBONACCI[9], minimumTouchSize + FIBONACCI[5]),
        iconSize: FIBONACCI[8],
      };
      break;
    case 'md':
    default:
      dimensions = {
        size: Math.max(FIBONACCI[8], minimumTouchSize),
        iconSize: FIBONACCI[7],
      };
  }
  
  return css`
    ${isSquare ? `
      width: ${dimensions.size}px;
      height: ${dimensions.size}px;
      min-width: ${dimensions.size}px;
      min-height: ${dimensions.size}px;
    ` : `
      padding: 0 ${FIBONACCI[5]}px;
      height: ${dimensions.size}px;
      min-height: ${dimensions.size}px;
    `}
    
    svg {
      width: ${dimensions.iconSize}px;
      height: ${dimensions.iconSize}px;
    }
  `;
};

// Get variant-specific styling
const getVariantStyles = (variant: string, theme: DefaultTheme, onLightBackground: boolean) => {
  switch(variant) {
    case 'primary':
      return css`
        background-color: ${theme.colors.primary[500]};
        color: ${theme.colors.white};
        
        &:hover:not(:disabled) {
          background-color: ${theme.colors.primary[600]};
        }
        
        &:focus {
          outline: none;
          box-shadow: 0 0 0 2px ${theme.colors.primary[300]};
        }
        
        &:active:not(:disabled) {
          background-color: ${theme.colors.primary[700]};
        }
        
        &:disabled {
          background-color: ${theme.colors.background[300]};
          color: ${theme.colors.text.disabled};
        }
      `;
    case 'secondary':
      return css`
        background-color: ${theme.colors.background[100]};
        color: ${theme.colors.text.primary};
        border: 1px solid ${theme.colors.background[300]};
        
        &:hover:not(:disabled) {
          background-color: ${theme.colors.background[200]};
        }
        
        &:focus {
          outline: none;
          box-shadow: 0 0 0 2px ${theme.colors.background[400]};
        }
        
        &:active:not(:disabled) {
          background-color: ${theme.colors.background[300]};
        }
        
        &:disabled {
          background-color: ${theme.colors.background[100]};
          color: ${theme.colors.text.disabled};
          border-color: ${theme.colors.background[200]};
        }
      `;
    case 'tertiary':
      return css`
        background-color: ${onLightBackground ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.1)'};
        color: ${onLightBackground ? theme.colors.text.primary : theme.colors.white};
        
        &:hover:not(:disabled) {
          background-color: ${onLightBackground ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.2)'};
        }
        
        &:focus {
          outline: none;
          box-shadow: 0 0 0 2px ${onLightBackground ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.2)'};
        }
        
        &:active:not(:disabled) {
          background-color: ${onLightBackground ? 'rgba(0, 0, 0, 0.15)' : 'rgba(255, 255, 255, 0.25)'};
        }
        
        &:disabled {
          background-color: ${onLightBackground ? 'rgba(0, 0, 0, 0.03)' : 'rgba(255, 255, 255, 0.05)'};
          color: ${onLightBackground ? theme.colors.text.disabled : 'rgba(255, 255, 255, 0.4)'};
        }
      `;
    case 'ghost':
      return css`
        background-color: transparent;
        color: ${onLightBackground ? theme.colors.text.primary : theme.colors.white};
        
        &:hover:not(:disabled) {
          background-color: ${onLightBackground ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.1)'};
        }
        
        &:focus {
          outline: none;
          box-shadow: 0 0 0 2px ${onLightBackground ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)'};
        }
        
        &:active:not(:disabled) {
          background-color: ${onLightBackground ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.15)'};
        }
        
        &:disabled {
          color: ${onLightBackground ? theme.colors.text.disabled : 'rgba(255, 255, 255, 0.4)'};
        }
      `;
    case 'accent':
      return css`
        background-color: ${theme.colors.accent.gold};
        color: ${theme.colors.text.dark};
        
        &:hover:not(:disabled) {
          background-color: ${theme.colors.accent.copper};
        }
        
        &:focus {
          outline: none;
          box-shadow: 0 0 0 2px ${theme.colors.accent.gold}80;
        }
        
        &:active:not(:disabled) {
          background-color: ${theme.colors.accent.copper};
        }
        
        &:disabled {
          background-color: ${theme.colors.background[300]};
          color: ${theme.colors.text.disabled};
        }
      `;
    case 'premium':
      return css`
        background: linear-gradient(135deg, ${theme.colors.accent.gold}, ${theme.colors.accent.copper});
        color: ${theme.colors.text.dark};
        border: 1px solid ${theme.colors.accent.gold};
        box-shadow: ${theme.shadows.xs};
        
        &:hover:not(:disabled) {
          box-shadow: ${theme.shadows.sm};
          filter: brightness(1.1);
        }
        
        &:focus {
          outline: none;
          box-shadow: 0 0 0 2px ${theme.colors.accent.gold}80;
        }
        
        &:active:not(:disabled) {
          filter: brightness(0.9);
          box-shadow: ${theme.shadows.inner};
        }
        
        &:disabled {
          background: ${theme.colors.background[300]};
          border-color: ${theme.colors.background[200]};
          color: ${theme.colors.text.disabled};
          box-shadow: none;
        }
      `;
    default:
      return css`
        background-color: ${theme.colors.primary[500]};
        color: ${theme.colors.white};
      `;
  }
};

const StyledButton = styled.button<StyledButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: ${props => props.$isDisabled ? 'not-allowed' : 'pointer'};
  transition: all 0.2s cubic-bezier(${PHI_INVERSE}, 0, ${1 - PHI_INVERSE}, 1);
  flex-shrink: 0;
  border: none;
  border-radius: ${props => props.$isRound ? '50%' : props.theme.radius.sm}px;
  opacity: ${props => props.$isDisabled ? 0.6 : 1};
  
  ${props => getSizeStyles(props.$size, props.theme, props.$isSquare)}
  ${props => getVariantStyles(props.$variant, props.theme, props.$onLightBackground)}
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
  }
  
  &:active:not(:disabled) {
    transform: translateY(1px);
  }
`;

interface IconContainerProps {
  $size: string;
}

const IconContainer = styled.span<IconContainerProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 0;
`;

interface LoadingSpinnerProps {
  $size: string;
}

const LoadingSpinner = styled.span<LoadingSpinnerProps>`
  width: ${props => props.$size === 'sm' ? '14px' : props.$size === 'lg' ? '24px' : '18px'};
  height: ${props => props.$size === 'sm' ? '14px' : props.$size === 'lg' ? '24px' : '18px'};
  position: relative;
  
  &:before {
    content: '';
    box-sizing: border-box;
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 2px solid transparent;
    border-top-color: currentColor;
    border-bottom-color: currentColor;
    animation: spin ${PHI * 0.618}s cubic-bezier(${PHI_INVERSE}, 0, ${PHI_INVERSE}, 1) infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export default IconButton; 








