// TODO: This file contains direct document access without SSR checks
import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

// Import sacred geometry constants
import { PHI_INVERSE, getFibonacciByIndex } from '../../../constants/sacred-geometry';

// Import Link component
import Link from './Link';

// TypeScript interfaces
export interface NavigationItemProps {
  /** The navigation item's label */
  label: string;
  /** The navigation item's URL */
  href: string;
  /** Whether the item is active (current page) */
  isActive?: boolean;
  /** Whether it's a primary action (e.g., Contact Us button) */
  isPrimary?: boolean;
  /** Whether to display with button styling */
  isButton?: boolean;
  /** The variant of the navigation item */
  variant?: 'primary' | 'secondary' | 'accent' | 'subtle';
  /** Optional icon to display */
  icon?: React.ReactNode;
  /** Whether to show the icon before or after the label */
  iconPosition?: 'left' | 'right';
  /** Whether the link should have a hover effect */
  withHoverEffect?: boolean;
  /** Optional subItems for dropdown menus */
  subItems?: Array<{
    label: string;
    href: string;
    isActive?: boolean;
  }>;
  /** Additional className */
  className?: string;
  /** Optional onClick handler */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

/**
 * NavigationItem Component
 * 
 * A component for creating navigation items with sacred geometry proportions
 * and support for active states, icons, and dropdown functionality.
 */
const NavigationItem: React.FC<NavigationItemProps> = ({
  label,
  href,
  isActive = false,
  isPrimary = false,
  isButton = false,
  variant = 'primary',
  icon,
  iconPosition = 'left',
  withHoverEffect = true,
  subItems,
  className,
  onClick,
}) => {
  // Handle dropdown functionality
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const hasDropdown = subItems && subItems.length > 0;
  
  // Toggle dropdown
  const handleToggleDropdown = () => {
    if (hasDropdown) {
      setIsDropdownOpen(!isDropdownOpen);
    }
  };
  
  // Close dropdown when clicking outside
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);
  
  // Generate navigation item content with icon
  const itemContent = (
    <>
      {icon && iconPosition === 'left' && <IconWrapper $position={iconPosition}>{icon}</IconWrapper>}
      <span>{label}</span>
      {icon && iconPosition === 'right' && <IconWrapper $position={iconPosition}>{icon}</IconWrapper>}
      {hasDropdown && (
        <DropdownIndicator $isOpen={isDropdownOpen}>
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </DropdownIndicator>
      )}
    </>
  );
  
  return (
    <Container 
      ref={dropdownRef}
      className={className}
      $hasDropdown={hasDropdown || false}
      $isOpen={isDropdownOpen || false}
    >
      {isButton ? (
        <ButtonStyled
          onClick={(event) => {
            if (onClick) onClick(event);
            handleToggleDropdown();
          }}
          $isPrimary={isPrimary}
          $variant={variant}
          $withHoverEffect={withHoverEffect}
          $isActive={isActive}
          $hasDropdown={hasDropdown || false}
        >
          {itemContent}
        </ButtonStyled>
      ) : (
        <Link
          href={href}
          isActive={isActive}
          variant={isPrimary ? 'accent' : 'navigation'}
          withHoverEffect={withHoverEffect}
          isNavLink={true}
          onClick={(event) => {
            if (hasDropdown) {
              event.preventDefault();
              handleToggleDropdown();
            }
            if (onClick) onClick(event);
          }}
        >
          {itemContent}
        </Link>
      )}
      
      {/* Dropdown menu */}
      {hasDropdown && (
        <Dropdown $isOpen={isDropdownOpen}>
          {subItems?.map((item, index) => (
            <DropdownItem key={`${item.label}-${index}`}>
              <Link
                href={item.href}
                isActive={item.isActive}
                variant="subtle"
                withHoverEffect={true}
                size="sm"
              >
                {item.label}
              </Link>
            </DropdownItem>
          ))}
        </Dropdown>
      )}
    </Container>
  );
};

// Styled components
interface ContainerProps {
  $hasDropdown: boolean;
  $isOpen: boolean;
}

const Container = styled.div<ContainerProps>`
  position: relative;
  display: inline-block;
  
  /* Add extra padding for dropdown items */
  ${({ $hasDropdown }) => $hasDropdown && `
    padding-right: ${getFibonacciByIndex(5)}px;
  `}
`;

interface IconWrapperProps {
  $position: string;
}

const IconWrapper = styled.span<IconWrapperProps>`
  display: inline-flex;
  align-items: center;
  margin-${({ $position }) => $position === 'left' ? 'right' : 'left'}: ${getFibonacciByIndex(4)}px;
`;

interface DropdownIndicatorProps {
  $isOpen: boolean;
}

const DropdownIndicator = styled.span<DropdownIndicatorProps>`
  display: inline-flex;
  align-items: center;
  margin-left: ${getFibonacciByIndex(4)}px;
  transform: rotate(${({ $isOpen }) => $isOpen ? '180deg' : '0deg'});
  transition: transform 0.2s cubic-bezier(${PHI_INVERSE}, 0, ${1 - PHI_INVERSE}, 1);
`;

interface ButtonStyledProps {
  $isPrimary: boolean;
  $variant: string;
  $withHoverEffect: boolean;
  $isActive: boolean;
  $hasDropdown: boolean;
}

const ButtonStyled = styled.button<ButtonStyledProps>`
  /* Base styles */
  display: inline-flex;
  align-items: center;
  background: none;
  border: none;
  font-family: inherit;
  cursor: pointer;
  padding: ${getFibonacciByIndex(4)}px ${getFibonacciByIndex(6)}px;
  font-size: ${getFibonacciByIndex(6)}px;
  font-weight: ${({ $isActive }) => $isActive ? '600' : '400'};
  border-radius: ${getFibonacciByIndex(4)}px;
  
  /* Colors based on variant and primary state */
  color: ${({ theme, $variant, $isPrimary, $isActive }) => {
    if ($isPrimary) {
      return theme.colors.text.light;
    }
    
    // For non-primary buttons
    switch ($variant) {
      case 'primary':
        return $isActive ? theme.colors.primary[500] ?? 1 : theme.colors.text.primary;
      case 'secondary':
        return $isActive ? theme.colors.secondary[500] ?? 1 : theme.colors.text.secondary;
      case 'accent':
        return theme.colors.accent.gold;
      case 'subtle':
        return theme.colors.text.tertiary;
      default:
        return theme.colors.text.primary;
    }
  }};
  
  /* Background for primary buttons */
  background-color: ${({ theme, $isPrimary, $variant }) => {
    if (!$isPrimary) return 'transparent';
    
    switch ($variant) {
      case 'primary': return theme.colors.primary[500] ?? 1;
      case 'secondary': return theme.colors.secondary[500] ?? 1;
      case 'accent': return theme.colors.accent.gold;
      default: return theme.colors.primary[500] ?? 1;
    }
  }};
  
  /* Hover styles */
  &:hover {
    background-color: ${({ theme, $isPrimary, $variant }) => {
      if (!$isPrimary) return 'rgba(0, 0, 0, 0.05)';
      
      switch ($variant) {
        case 'primary': return theme.colors.primary[600] ?? 1;
        case 'secondary': return theme.colors.secondary[600] ?? 1;
        case 'accent': return theme.colors.accent.copper;
        default: return theme.colors.primary[600] ?? 1;
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
  }
  
  /* Transition using golden ratio cubic-bezier */
  transition: all 0.2s cubic-bezier(${PHI_INVERSE}, 0, ${1 - PHI_INVERSE}, 1);
`;

interface DropdownProps {
  $isOpen: boolean;
}

const Dropdown = styled.div<DropdownProps>`
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 10;
  min-width: 200px;
  background-color: ${props => props.theme.colors.background[50] ?? 1};
  border-radius: ${getFibonacciByIndex(4)}px;
  box-shadow: 0 ${getFibonacciByIndex(4)}px ${getFibonacciByIndex(7)}px rgba(0, 0, 0, 0.1);
  padding: ${getFibonacciByIndex(5)}px 0;
  opacity: ${({ $isOpen }) => $isOpen ? 1 : 0};
  visibility: ${({ $isOpen }) => $isOpen ? 'visible' : 'hidden'};
  transform: translateY(${({ $isOpen }) => $isOpen ? 0 : `-${getFibonacciByIndex(5)}px`});
  transition: all 0.2s cubic-bezier(${PHI_INVERSE}, 0, ${1 - PHI_INVERSE}, 1);
`;

const DropdownItem = styled.div`
  padding: ${getFibonacciByIndex(4)}px ${getFibonacciByIndex(6)}px;
  white-space: nowrap;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

export default NavigationItem; 









