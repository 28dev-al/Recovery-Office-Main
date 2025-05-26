import * as React from 'react';
import styled from 'styled-components';
import { DefaultTheme } from 'styled-components';
import { PHI_INVERSE, getFibonacciByIndex } from '../../../constants/sacred-geometry';
import { BoxProps } from '../../types/styled.types';

// TypeScript interfaces
export interface LinkProps {
  /** The link content */
  children: React.ReactNode;
  /** URL to navigate to */
  href: string;
  /** Whether the link is active (current page) */
  isActive?: boolean;
  /** Variant style for the link */
  variant?: 'primary' | 'secondary' | 'accent' | 'footer' | 'navigation' | 'subtle';
  /** Whether to underline the link */
  underline?: 'none' | 'hover' | 'always';
  /** Link size */
  size?: 'sm' | 'md' | 'lg';
  /** Whether the link opens in a new tab */
  openInNewTab?: boolean;
  /** Whether the link should have a hover effect */
  withHoverEffect?: boolean;
  /** Whether the link is part of navigation */
  isNavLink?: boolean;
  /** Additional className */
  className?: string;
  /** Optional onClick handler */
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  /** Any additional props */
  [prop: string]: any;
}

/**
 * Link Component
 * 
 * A component for creating links that follow sacred geometry principles
 * for spacing, transitions, and hover effects.
 */
const Link: React.FC<LinkProps> = ({
  children,
  href,
  isActive = false,
  variant = 'primary',
  underline = 'hover',
  size = 'md',
  openInNewTab = false,
  withHoverEffect = true,
  isNavLink = false,
  className,
  onClick,
  ...rest
}) => {
  // Determine external link properties
  const isExternal = href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:');
  const target = openInNewTab || isExternal ? '_blank' : undefined;
  const rel = openInNewTab || isExternal ? 'noopener noreferrer' : undefined;
  
  return (
    <StyledLink
      href={href}
      target={target}
      rel={rel}
      $isActive={isActive}
      $variant={variant}
      $underline={underline}
      $size={size}
      $withHoverEffect={withHoverEffect}
      $isNavLink={isNavLink}
      className={className}
      onClick={onClick}
      {...rest}
    >
      {children}
    </StyledLink>
  );
};

// Helper function to get size styles based on Fibonacci sequence
const getSizeStyles = (size: string) => {
  switch (size) {
    case 'sm':
      return {
        fontSize: `${getFibonacciByIndex(5)}px`, // 5px
        padding: `${getFibonacciByIndex(3)}px ${getFibonacciByIndex(4)}px`, // 2px 3px
      };
    case 'lg':
      return {
        fontSize: `${getFibonacciByIndex(7)}px`, // 13px
        padding: `${getFibonacciByIndex(5)}px ${getFibonacciByIndex(6)}px`, // 5px 8px
      };
    case 'md':
    default:
      return {
        fontSize: `${getFibonacciByIndex(6)}px`, // 8px
        padding: `${getFibonacciByIndex(4)}px ${getFibonacciByIndex(5)}px`, // 3px 5px
      };
  }
};

// Styled components
interface StyledLinkProps {
  $isActive: boolean;
  $variant: string;
  $underline: string;
  $size: string;
  $withHoverEffect: boolean;
  $isNavLink: boolean;
}

const StyledLink = styled.a<StyledLinkProps>`
  /* Base styles */
  display: inline-block;
  text-decoration: ${({ $underline }) => 
    $underline === 'always' ? 'underline' : 'none'
  };
  font-weight: ${({ $isActive }) => $isActive ? '600' : '400'};
  cursor: pointer;
  
  /* Size based on Fibonacci sequence */
  ${({ $size }) => {
    const styles = getSizeStyles($size);
    return `
      font-size: ${styles.fontSize};
      padding: ${$size === 'sm' ? '0' : styles.padding};
    `;
  }}
  
  /* Colors based on variant */
  color: ${({ theme, $variant, $isActive }) => {
    // Define color based on variant and active state
    switch ($variant) {
      case 'primary':
        return $isActive ? theme.colors.primary[500] ?? 1 : theme.colors.text.primary;
      case 'secondary':
        return $isActive ? theme.colors.secondary[500] ?? 1 : theme.colors.text.secondary;
      case 'accent':
        return theme.colors.accent.gold;
      case 'footer':
        return theme.colors.text.light;
      case 'navigation':
        return $isActive ? theme.colors.primary[500] ?? 1 : theme.colors.text.primary;
      case 'subtle':
        return theme.colors.text.tertiary;
      default:
        return theme.colors.text.primary;
    }
  }};
  
  /* Active state styles */
  ${({ $isActive, $variant, theme }) => $isActive && `
    position: relative;
    
    /* For primary navigation links, add a bottom border at golden ratio position */
    ${$variant === 'navigation' ? `
      &:after {
        content: '';
        position: absolute;
        bottom: 0;
        left: ${PHI_INVERSE * 100}%;
        right: ${PHI_INVERSE * 100}%;
        height: ${getFibonacciByIndex(3)}px;
        background-color: ${theme.colors.primary[500] ?? 1};
        border-radius: ${getFibonacciByIndex(2)}px;
      }
    ` : ''}
  `}
  
  /* Hover styles */
  &:hover {
    /* Underline effect */
    text-decoration: ${({ $underline }) => 
      $underline === 'none' ? 'none' : 'underline'
    };
    
    /* Color change on hover */
    color: ${({ theme, $variant }) => {
      switch ($variant) {
        case 'primary':
          return theme.colors.primary[600] ?? 1;
        case 'secondary':
          return theme.colors.secondary[600] ?? 1;
        case 'accent':
          return theme.colors.accent.copper;
        case 'footer':
          return theme.colors.background[100] ?? 1;
        case 'navigation':
          return theme.colors.primary[600] ?? 1;
        case 'subtle':
          return theme.colors.text.secondary;
        default:
          return theme.colors.primary[600] ?? 1;
      }
    }};
    
    /* Scale effect when enabled */
    transform: ${({ $withHoverEffect }) => 
      $withHoverEffect ? `scale(${1 + (PHI_INVERSE * 0.05)})` : 'none'
    };
  }
  
  /* Focus styles for accessibility */
  &:focus {
    outline: none;
    box-shadow: 0 0 0 ${getFibonacciByIndex(3)}px ${props => props.theme.colors.primary[300] ?? 1};
    border-radius: ${getFibonacciByIndex(3)}px;
  }
  
  /* Transition using golden ratio cubic-bezier */
  transition: all 0.2s cubic-bezier(${PHI_INVERSE}, 0, ${1 - PHI_INVERSE}, 1);
  
  /* Navigation-specific styles */
  ${({ $isNavLink }) => $isNavLink && `
    display: inline-flex;
    align-items: center;
    height: ${getFibonacciByIndex(9)}px; /* 34px */
    margin: 0 ${getFibonacciByIndex(5)}px; /* 0 5px */
  `}
`;

export default Link; 









