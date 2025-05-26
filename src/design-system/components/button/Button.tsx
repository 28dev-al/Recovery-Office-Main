/**
 * Button Component
 * 
 * A button component that implements sacred geometry principles for
 * sizing, proportions, and visual harmony. This button component
 * supports multiple variants, sizes, and states while maintaining
 * perfect golden ratio proportions.
 */

import * as React from 'react';
import styled, { css, DefaultTheme } from 'styled-components';
import { PHI, PHI_INVERSE } from '../../../constants/sacred-geometry';
import { Box } from '../layout';
import { BoxProps } from '../../../design-system/types';

/**
 * Button component props
 */
export interface ButtonProps extends Omit<BoxProps, 'as'> {
  /**
   * The variant of the button
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost' | 'link' | 'light';
  
  /**
   * The size of the button
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg' | 'large' | 'medium' | 'small';
  
  /**
   * Whether the button is in a loading state
   * @default false
   */
  isLoading?: boolean;
  
  /**
   * Whether the button is disabled
   * @default false
   */
  isDisabled?: boolean;
  
  /**
   * @deprecated Use isDisabled instead
   * HTML standard disabled attribute (automatically mapped to isDisabled)
   */
  disabled?: boolean;
  
  /**
   * Whether the button takes up the full width of its container
   * @default false
   */
  isFullWidth?: boolean;
  
  /**
   * Whether to use sacred geometry proportions for the button
   * @default true
   */
  useSacredProportions?: boolean;
  
  /**
   * Optional icon to display before the button text
   */
  leftIcon?: React.ReactNode;
  
  /**
   * Optional icon to display after the button text
   */
  rightIcon?: React.ReactNode;
  
  /**
   * The button type attribute
   * @default 'button'
   */
  type?: 'button' | 'submit' | 'reset';
  
  /**
   * Callback fired when the button is clicked
   */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  
  /**
   * The href attribute for link buttons
   */
  href?: string;
  
  /**
   * For integration with react-router-dom Link component
   */
  to?: string;
  
  /**
   * Polymorphic as prop for rendering different elements
   * Useful for rendering the button as a link or other component
   */
  as?: React.ElementType;
  
  /**
   * Custom inline styles
   */
  style?: React.CSSProperties;
  
  /**
   * The content of the button
   */
  children: React.ReactNode;
}

/**
 * Get size-specific styles based on button size
 */
const getSizeStyles = (size: 'sm' | 'md' | 'lg' | 'small' | 'medium' | 'large', theme: DefaultTheme) => {
  // Map alternative size names to standard sizes
  let normalizedSize: 'sm' | 'md' | 'lg';
  switch (size) {
    case 'small':
      normalizedSize = 'sm';
      break;
    case 'medium':
      normalizedSize = 'md';
      break;
    case 'large':
      normalizedSize = 'lg';
      break;
    default:
      normalizedSize = size;
  }
  
  // Base heights derived from Fibonacci sequence
  const baseHeights = {
    sm: 34, // Fibonacci number
    md: 42, // Derived from Golden Ratio
    lg: 55, // Fibonacci number
  };
  
  // Font sizes based on typography scale
  const fontSizes = {
    sm: theme.typography.fontSize.sm,
    md: theme.typography.fontSize.md,
    lg: theme.typography.fontSize.lg,
  };
  
  // Padding following sacred proportion
  const horizontalPadding = {
    sm: Math.round(baseHeights.sm * PHI_INVERSE * 0.5),
    md: Math.round(baseHeights.md * PHI_INVERSE * 0.5),
    lg: Math.round(baseHeights.lg * PHI_INVERSE * 0.5),
  };
  
  // Border radius based on golden ratio
  const borderRadius = {
    sm: Math.round(baseHeights.sm * PHI_INVERSE * 0.2),
    md: Math.round(baseHeights.md * PHI_INVERSE * 0.2), 
    lg: Math.round(baseHeights.lg * PHI_INVERSE * 0.2),
  };
  
  // Icon size and gap
  const iconSize = Math.round(baseHeights[normalizedSize] ?? 1 * PHI_INVERSE * 0.8);
  const iconGap = Math.round(horizontalPadding[normalizedSize] ?? 1 * PHI_INVERSE);
  
  return {
    height: `${baseHeights[normalizedSize] ?? 1}px`,
    padding: `0 ${horizontalPadding[normalizedSize] ?? 1}px`,
    fontSize: fontSizes[normalizedSize] ?? 1,
    borderRadius: `${borderRadius[normalizedSize] ?? 1}px`,
    iconSize,
    iconGap,
  };
};

/**
 * Gets the appropriate colors for each button variant and state
 */
const getVariantStyles = (
  variant: ButtonProps['variant'], 
  theme: DefaultTheme, 
  isDisabled = false
) => {
  if (isDisabled) {
    return css`
      background-color: ${theme.colors.background[200] ?? 1};
      color: ${theme.colors.text.disabled};
      border-color: ${theme.colors.background[300] ?? 1};
      cursor: not-allowed;
      opacity: ${PHI_INVERSE};
      box-shadow: none;
      
      &:hover, &:focus, &:active {
        background-color: ${theme.colors.background[200] ?? 1};
        color: ${theme.colors.text.disabled};
        border-color: ${theme.colors.background[300] ?? 1};
        box-shadow: none;
        transform: none;
      }
    `;
  }
  
  switch (variant) {
    case 'primary':
      return css`
        background-color: ${theme.colors.primary[500] ?? 1};
        color: white;
        border: none;
        box-shadow: ${theme.shadows.button};
        
        &:hover {
          background-color: ${theme.colors.primary[600] ?? 1};
          transform: translateY(-1px);
          box-shadow: ${theme.shadows.sm};
        }
        
        &:focus {
          outline: none;
          box-shadow: 0 0 0 3px ${theme.colors.primary[300] ?? 1};
        }
        
        &:active {
          background-color: ${theme.colors.primary[700] ?? 1};
          transform: translateY(1px);
          box-shadow: ${theme.shadows.xs};
        }
      `;
    case 'secondary':
      return css`
        background-color: ${theme.colors.secondary[500] ?? 1};
        color: white;
        border: none;
        box-shadow: ${theme.shadows.button};
        
        &:hover {
          background-color: ${theme.colors.secondary[600] ?? 1};
          transform: translateY(-1px);
          box-shadow: ${theme.shadows.sm};
        }
        
        &:focus {
          outline: none;
          box-shadow: 0 0 0 3px ${theme.colors.secondary[300] ?? 1};
        }
        
        &:active {
          background-color: ${theme.colors.secondary[700] ?? 1};
          transform: translateY(1px);
          box-shadow: ${theme.shadows.xs};
        }
      `;
    case 'accent':
      return css`
        background-color: ${theme.colors.accent.gold};
        color: ${theme.colors.text.dark};
        border: none;
        box-shadow: ${theme.shadows.button};
        
        &:hover {
          background-color: ${theme.colors.accent.copper};
          transform: translateY(-1px);
          box-shadow: ${theme.shadows.sm};
        }
        
        &:focus {
          outline: none;
          box-shadow: 0 0 0 3px ${theme.colors.accent.gold}80;
        }
        
        &:active {
          background-color: ${theme.colors.accent.copper};
          transform: translateY(1px);
          box-shadow: ${theme.shadows.xs};
        }
      `;
    case 'light':
      return css`
        background-color: rgba(255, 255, 255, 0.15);
        color: white;
        border: 1px solid rgba(255, 255, 255, 0.3);
        box-shadow: ${theme.shadows.xs};
        
        &:hover {
          background-color: rgba(255, 255, 255, 0.25);
          transform: translateY(-1px);
          box-shadow: ${theme.shadows.sm};
        }
        
        &:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.3);
        }
        
        &:active {
          background-color: rgba(255, 255, 255, 0.2);
          transform: translateY(1px);
          box-shadow: none;
        }
      `;
    case 'outline':
      return css`
        background-color: transparent;
        color: ${theme.colors.primary[500] ?? 1};
        border: 1px solid ${theme.colors.primary[500] ?? 1};
        
        &:hover {
          background-color: ${theme.colors.primary[50] ?? 1};
          color: ${theme.colors.primary[600] ?? 1};
          transform: translateY(-1px);
        }
        
        &:focus {
          outline: none;
          box-shadow: 0 0 0 3px ${theme.colors.primary[200] ?? 1};
        }
        
        &:active {
          background-color: ${theme.colors.primary[100] ?? 1};
          color: ${theme.colors.primary[700] ?? 1};
          transform: translateY(1px);
        }
      `;
    case 'ghost':
      return css`
        background-color: transparent;
        color: ${theme.colors.text.primary};
        border: none;
        
        &:hover {
          background-color: ${theme.colors.background[200] ?? 1};
          transform: translateY(-1px);
        }
        
        &:focus {
          outline: none;
          box-shadow: 0 0 0 3px ${theme.colors.background[300] ?? 1};
        }
        
        &:active {
          background-color: ${theme.colors.background[300] ?? 1};
          transform: translateY(1px);
        }
      `;
    case 'link':
      return css`
        background-color: transparent;
        color: ${theme.colors.primary[500] ?? 1};
        border: none;
        padding: 0;
        height: auto;
        text-decoration: none;
        box-shadow: none;
        
        &:hover {
          color: ${theme.colors.primary[600] ?? 1};
          text-decoration: underline;
          transform: none;
        }
        
        &:focus {
          outline: none;
          text-decoration: underline;
          box-shadow: none;
        }
        
        &:active {
          color: ${theme.colors.primary[700] ?? 1};
          transform: none;
        }
      `;
    default:
      return css`
        background-color: ${theme.colors.primary[500] ?? 1};
        color: white;
        border: none;
        box-shadow: ${theme.shadows.button};
        
        &:hover {
          background-color: ${theme.colors.primary[600] ?? 1};
          transform: translateY(-1px);
          box-shadow: ${theme.shadows.sm};
        }
        
        &:focus {
          outline: none;
          box-shadow: 0 0 0 3px ${theme.colors.primary[300] ?? 1};
        }
        
        &:active {
          background-color: ${theme.colors.primary[700] ?? 1};
          transform: translateY(1px);
          box-shadow: ${theme.shadows.xs};
        }
      `;
  }
};

/**
 * Loading spinner that follows golden ratio proportions
 */
const LoadingSpinner = styled.span<{ children?: React.ReactNode; size: 'sm' | 'md' | 'lg' }>`
  position: relative;
  display: inline-block;
  
  width: ${props => {
    const sizeStyles = getSizeStyles(props.size, props.theme);
    return `${sizeStyles.iconSize}px`;
  }};
  
  height: ${props => {
    const sizeStyles = getSizeStyles(props.size, props.theme);
    return `${sizeStyles.iconSize}px`;
  }};
  
  &::before {
    content: '';
    box-sizing: border-box;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    margin-top: -50%;
    margin-left: -50%;
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

// Loading text that only shows on screens above sm breakpoint
const LoadingText = styled.span`
  display: none;
  
  @media (min-width: ${props => props.theme.breakpoints.values.sm}px) {
    display: inline;
  }
`;

// Button content container for consistent alignment
const ButtonContentContainer = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Icon wrapper for positioning
const IconWrapper = styled.span<{ position: 'left' | 'right' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

// Styled Button component
const StyledButton = styled(Box)<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  white-space: nowrap;
  vertical-align: middle;
  line-height: 1.2;
  font-weight: ${props => props.theme.typography.fontWeight.semiBold};
  font-family: ${props => props.theme.typography.fontFamily.body};
  transition: all 0.2s cubic-bezier(${PHI_INVERSE}, 0, ${PHI_INVERSE}, 1);
  cursor: pointer;
  overflow: hidden;
  outline: none;
  margin: 0;
  
  // Size styles
  ${props => {
    // Normalize size value
    let normalizedSize = props.size || 'md';
    if (normalizedSize === 'medium') normalizedSize = 'md';
    if (normalizedSize === 'large') normalizedSize = 'lg';
    
    const sizeStyles = getSizeStyles(normalizedSize as 'sm' | 'md' | 'lg', props.theme);
    return css`
      height: ${sizeStyles.height};
      padding: ${sizeStyles.padding};
      font-size: ${sizeStyles.fontSize};
      border-radius: ${sizeStyles.borderRadius};
    `;
  }}
  
  // Apply variant styles
  ${props => getVariantStyles(props.variant, props.theme, props.isDisabled)}
  
  // Full width style
  ${props => props.isFullWidth && css`
    width: 100%;
  `}
  
  // When button has icons, add appropriate spacing
  & > *:not(:last-child) {
    margin-right: ${props => {
      const normalizedSize = props.size === 'medium' ? 'md' : (props.size === 'large' ? 'lg' : (props.size || 'md')) as 'sm' | 'md' | 'lg';
      const sizeStyles = getSizeStyles(normalizedSize, props.theme);
      return `${sizeStyles.iconGap}px`;
    }};
  }
  
  // Sacred proportions adjustments
  ${props => props.useSacredProportions && css`
    // Create perfect golden ratio between height and width
    // by ensuring the minimum width is PHI * height
    min-width: ${() => {
      const normalizedSize = props.size === 'medium' ? 'md' : (props.size === 'large' ? 'lg' : (props.size || 'md')) as 'sm' | 'md' | 'lg';
      const sizeStyles = getSizeStyles(normalizedSize, props.theme);
      const height = parseInt(sizeStyles.height, 10);
      return `${Math.round(height * PHI)}px`;
    }};
  `}
`;

/**
 * Button Component with ref forwarding
 * 
 * Implements sacred geometry principles for sizes, proportions, and styling
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    variant = 'primary',
    size = 'md',
    isLoading = false,
    isDisabled: propIsDisabled,
    disabled: propDisabled, // Accept standard HTML disabled prop for compatibility
    isFullWidth = false,
    useSacredProportions = true,
    leftIcon,
    rightIcon,
    type = 'button',
    children,
    onClick,
    href,
    as,
    ...rest 
  }, ref) => {
    // Use isDisabled if provided, otherwise use disabled (mapped from HTML standard prop)
    const isDisabled = propIsDisabled !== undefined ? propIsDisabled : propDisabled;
    
    // Normalize size
    const normalizedSize = size === 'medium' ? 'md' : (size === 'large' ? 'lg' : size);
    
    // Create button content with loading indicator and icons
    const renderButtonContent = () => {
      if (isLoading) {
        return (
          <ButtonContentContainer>
            <LoadingSpinner size={normalizedSize as 'sm' | 'md' | 'lg'} />
            <LoadingText>Loading...</LoadingText>
          </ButtonContentContainer>
        );
      }
      
      return (
        <ButtonContentContainer>
          {leftIcon && <IconWrapper position="left">{leftIcon}</IconWrapper>}
          {children}
          {rightIcon && <IconWrapper position="right">{rightIcon}</IconWrapper>}
        </ButtonContentContainer>
      );
    };
    
    // Handle click events
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (isDisabled || isLoading) return;
      if (onClick) onClick(e);
    };
    
    // Determine the element type
    const elementType = href ? 'a' : (as || 'button');
    
    // Additional props for specific element types
    const elementProps: Record<string, unknown> = {};
    if (href) {
      elementProps.href = href;
    }
    if (elementType === 'button' && !href) {
      elementProps.type = type;
    }
    
    return (
      <StyledButton
        as={elementType}
        ref={ref}
        variant={variant}
        size={normalizedSize}
        isFullWidth={isFullWidth}
        isDisabled={isDisabled}
        isLoading={isLoading}
        onClick={handleClick}
        useSacredProportions={useSacredProportions}
        {...elementProps}
        {...rest}
      >
        {renderButtonContent()}
      </StyledButton>
    );
  }
);

Button.displayName = 'Button';

export default Button; 









