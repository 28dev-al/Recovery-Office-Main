import * as React from 'react';
import styled, { css, DefaultTheme } from 'styled-components';

// Import sacred geometry constants
import { PHI, PHI_INVERSE, FIBONACCI } from '../../../constants/sacred-geometry';

// Forward ref to maintain compatibility with forms and other components
export interface PremiumButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button variant defining the visual style and importance */
  variant?: 'primary' | 'secondary' | 'tertiary' | 'text' | 'outline' | 'gold';
  
  /** Button size */
  size?: 'sm' | 'md' | 'lg';
  
  /** Whether the button is in loading state */
  isLoading?: boolean;
  
  /** Whether the button is disabled */
  isDisabled?: boolean;
  
  /** Whether the button takes up the full width of its container */
  isFullWidth?: boolean;
  
  /** Left icon */
  leftIcon?: React.ReactNode;
  
  /** Right icon */
  rightIcon?: React.ReactNode;
  
  /** URL for link buttons */
  href?: string;
  
  /** Target attribute for link buttons */
  target?: string;
  
  /** Rel attribute for link buttons */
  rel?: string;
  
  /** Children elements (button content) */
  children: React.ReactNode;
  
  /** Optional CSS class name */
  className?: string;
  
  /** Callback when clicked */
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  
  /** Whether to show subtle hover animation */
  withHoverAnimation?: boolean;
}

/**
 * Premium Button Component
 * 
 * A button component for financial services UI with premium styling,
 * following a clear visual hierarchy to guide users to the right actions.
 */
const PremiumButton = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  PremiumButtonProps
>(({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  isDisabled = false,
  isFullWidth = false,
  leftIcon,
  rightIcon,
  href,
  target,
  rel,
  children,
  className,
  onClick,
  withHoverAnimation = true,
  ...rest
}, ref) => {
  // Determine if this should be an anchor element
  const isAnchor = !!href && !isDisabled;
  
  // Handle click with loading state check
  const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    if (isDisabled || isLoading) {
      e.preventDefault();
      return;
    }
    
    if (onClick) {
      onClick(e);
    }
  };
  
  // Determine the component's DOM element
  const Component = isAnchor ? 'a' : 'button';
  
  return (
    <StyledButton
      as={Component}
      className={className}
      $variant={variant}
      $size={size}
      $isLoading={isLoading}
      $isDisabled={isDisabled}
      $isFullWidth={isFullWidth}
      $withHoverAnimation={withHoverAnimation}
      disabled={isDisabled || isLoading}
      href={isAnchor ? href : undefined}
      target={isAnchor ? target : undefined}
      rel={isAnchor ? rel : undefined}
      onClick={handleClick}
      ref={ref as any}
      {...rest}
    >
      {isLoading && (
        <LoadingSpinner $size={size} />
      )}
      <ButtonContent $isLoading={isLoading}>
        {leftIcon && <IconWrapper>{leftIcon}</IconWrapper>}
        <ButtonText>{children}</ButtonText>
        {rightIcon && <IconWrapper>{rightIcon}</IconWrapper>}
      </ButtonContent>
    </StyledButton>
  );
});

// Use named export for better debugging
PremiumButton.displayName = 'PremiumButton';

// Styled components
interface StyledButtonProps {
  $variant: string;
  $size: string;
  $isLoading: boolean;
  $isDisabled: boolean;
  $isFullWidth: boolean;
  $withHoverAnimation: boolean;
}

// Get size-specific styling
const getSizeStyles = (size: string, theme: DefaultTheme) => {
  switch (size) {
    case 'sm':
      return css`
        height: ${FIBONACCI[8]}px; /* 21px */
        padding: 0 ${FIBONACCI[6]}px;
        font-size: ${theme.typography.fontSize.sm}px;
        border-radius: ${theme.radius.sm}px;
      `;
    case 'lg':
      return css`
        height: ${FIBONACCI[10]}px; /* 55px */
        padding: 0 ${FIBONACCI[8]}px;
        font-size: ${theme.typography.fontSize.md}px;
        border-radius: ${theme.radius.md}px;
      `;
    case 'md':
    default:
      return css`
        height: ${FIBONACCI[9]}px; /* 34px */
        padding: 0 ${FIBONACCI[7]}px;
        font-size: ${theme.typography.fontSize.base}px;
        border-radius: ${theme.radius.sm}px;
      `;
  }
};

// Get variant-specific styling with states
const getVariantStyles = (variant: string, theme: DefaultTheme) => {
  switch (variant) {
    case 'primary':
      return css`
        background-color: ${theme.colors.primary[600]};
        color: ${theme.colors.white};
        border: none;
        box-shadow: ${theme.shadows.sm};
        
        &:hover:not(:disabled) {
          background-color: ${theme.colors.primary[700]};
          box-shadow: ${theme.shadows.md};
        }
        
        &:focus {
          outline: none;
          box-shadow: 0 0 0 3px ${theme.colors.primary[300]};
        }
        
        &:active:not(:disabled) {
          background-color: ${theme.colors.primary[800]};
          box-shadow: ${theme.shadows.inner};
          transform: translateY(1px);
        }
        
        &:disabled {
          background-color: ${theme.colors.background[300]};
          color: ${theme.colors.text.disabled};
          box-shadow: none;
          cursor: not-allowed;
          opacity: 0.6;
        }
      `;
    case 'secondary':
      return css`
        background-color: ${theme.colors.background[100]};
        color: ${theme.colors.text.primary};
        border: 1px solid ${theme.colors.background[300]};
        box-shadow: ${theme.shadows.xs};
        
        &:hover:not(:disabled) {
          background-color: ${theme.colors.background[200]};
          border-color: ${theme.colors.background[400]};
        }
        
        &:focus {
          outline: none;
          box-shadow: 0 0 0 3px ${theme.colors.background[300]};
        }
        
        &:active:not(:disabled) {
          background-color: ${theme.colors.background[300]};
          box-shadow: ${theme.shadows.inner};
          transform: translateY(1px);
        }
        
        &:disabled {
          background-color: ${theme.colors.background[100]};
          color: ${theme.colors.text.disabled};
          border-color: ${theme.colors.background[200]};
          box-shadow: none;
          cursor: not-allowed;
          opacity: 0.6;
        }
      `;
    case 'tertiary':
      return css`
        background-color: transparent;
        color: ${theme.colors.primary[600]};
        border: none;
        
        &:hover:not(:disabled) {
          background-color: ${theme.colors.primary[50]};
          color: ${theme.colors.primary[700]};
        }
        
        &:focus {
          outline: none;
          box-shadow: 0 0 0 2px ${theme.colors.primary[100]};
        }
        
        &:active:not(:disabled) {
          background-color: ${theme.colors.primary[100]};
          color: ${theme.colors.primary[800]};
          transform: translateY(1px);
        }
        
        &:disabled {
          color: ${theme.colors.text.disabled};
          cursor: not-allowed;
          opacity: 0.6;
        }
      `;
    case 'text':
      return css`
        background-color: transparent;
        color: ${theme.colors.text.primary};
        border: none;
        padding: 0;
        height: auto;
        
        &:hover:not(:disabled) {
          color: ${theme.colors.primary[600]};
          text-decoration: underline;
        }
        
        &:focus {
          outline: none;
          text-decoration: underline;
        }
        
        &:active:not(:disabled) {
          color: ${theme.colors.primary[700]};
        }
        
        &:disabled {
          color: ${theme.colors.text.disabled};
          cursor: not-allowed;
          opacity: 0.6;
        }
      `;
    case 'outline':
      return css`
        background-color: transparent;
        color: ${theme.colors.primary[600]};
        border: 1px solid ${theme.colors.primary[600]};
        
        &:hover:not(:disabled) {
          background-color: ${theme.colors.primary[50]};
        }
        
        &:focus {
          outline: none;
          box-shadow: 0 0 0 3px ${theme.colors.primary[100]};
        }
        
        &:active:not(:disabled) {
          background-color: ${theme.colors.primary[100]};
          transform: translateY(1px);
        }
        
        &:disabled {
          color: ${theme.colors.text.disabled};
          border-color: ${theme.colors.background[300]};
          cursor: not-allowed;
          opacity: 0.6;
        }
      `;
    case 'gold':
      return css`
        background-color: ${theme.colors.accent.gold};
        color: ${theme.colors.text.dark};
        border: none;
        box-shadow: ${theme.shadows.sm};
        
        &:hover:not(:disabled) {
          background-color: ${theme.colors.accent.copper};
          box-shadow: ${theme.shadows.md};
        }
        
        &:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba(${theme.colors.accent.gold}, 0.5);
        }
        
        &:active:not(:disabled) {
          background-color: ${theme.colors.accent.gold};
          box-shadow: ${theme.shadows.inner};
          transform: translateY(1px);
        }
        
        &:disabled {
          background-color: ${theme.colors.background[300]};
          color: ${theme.colors.text.disabled};
          box-shadow: none;
          cursor: not-allowed;
          opacity: 0.6;
        }
      `;
    default:
      return css`
        background-color: ${theme.colors.primary[600]};
        color: ${theme.colors.white};
        border: none;
      `;
  }
};

// Main button component styling
const StyledButton = styled.button<StyledButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: ${props => (props.$isDisabled || props.$isLoading) ? 'not-allowed' : 'pointer'};
  transition: all 0.2s cubic-bezier(${PHI_INVERSE}, 0, ${1 - PHI_INVERSE}, 1);
  white-space: nowrap;
  font-family: ${props => props.theme.typography.fontFamily.body};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  letter-spacing: 0.3px;
  text-decoration: none;
  width: ${props => props.$isFullWidth ? '100%' : 'auto'};
  
  ${props => getSizeStyles(props.$size, props.theme)}
  ${props => getVariantStyles(props.$variant, props.theme)}
  
  ${props => props.$withHoverAnimation && !props.$isDisabled && css`
    &:hover {
      transform: translateY(-2px);
    }
    
    &:active {
      transform: translateY(1px);
    }
  `}
  
  /* Loading state styles */
  ${props => props.$isLoading && css`
    cursor: wait;
    opacity: 0.8;
  `}
`;

interface ButtonContentProps {
  $isLoading: boolean;
}

const ButtonContent = styled.span<ButtonContentProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${props => props.$isLoading ? '0.5' : '1'};
`;

const ButtonText = styled.span`
  display: inline-block;
`;

const IconWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  
  &:first-child {
    margin-right: ${FIBONACCI[5]}px;
  }
  
  &:last-child {
    margin-left: ${FIBONACCI[5]}px;
  }
`;

interface LoadingSpinnerProps {
  $size: string;
}

const LoadingSpinner = styled.span<LoadingSpinnerProps>`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: ${props => props.$size === 'sm' ? '14px' : props.$size === 'lg' ? '24px' : '18px'};
  height: ${props => props.$size === 'sm' ? '14px' : props.$size === 'lg' ? '24px' : '18px'};
  
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

export default PremiumButton; 