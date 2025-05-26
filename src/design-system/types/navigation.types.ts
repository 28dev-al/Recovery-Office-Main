/**
 * Navigation Type Definitions
 * 
 * This file defines TypeScript interfaces for navigation components
 * to ensure consistency and type safety throughout the application.
 */

import * as React from 'react';
import { BoxProps } from './styled.types';

/**
 * Common link/navigation item interface
 */
export interface NavigationItemBase {
  /** The display label */
  label: string;
  /** The URL path */
  href: string;
  /** Whether the item is active (current page) */
  isActive?: boolean;
  /** Optional icon to display */
  icon?: React.ReactNode;
  /** Optional onClick handler */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

/**
 * Link component properties
 */
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
}

/**
 * Navigation item properties with extended functionality
 */
export interface NavigationItemProps extends NavigationItemBase {
  /** Whether it's a primary action (e.g., Contact Us button) */
  isPrimary?: boolean;
  /** Whether to display with button styling */
  isButton?: boolean;
  /** The variant of the navigation item */
  variant?: 'primary' | 'secondary' | 'accent' | 'subtle';
  /** Whether to show the icon before or after the label */
  iconPosition?: 'left' | 'right';
  /** Whether the link should have a hover effect */
  withHoverEffect?: boolean;
  /** Optional subItems for dropdown menus */
  subItems?: Array<NavigationItemBase>;
  /** Additional className */
  className?: string;
}

/**
 * Breadcrumb item definition
 */
export interface BreadcrumbItem extends NavigationItemBase {
  // BreadcrumbItem inherits all properties from NavigationItemBase
}

/**
 * Breadcrumbs component properties
 */
export interface BreadcrumbsProps extends BoxProps {
  /** The array of breadcrumb items */
  items: BreadcrumbItem[];
  /** Whether to show a home icon for the first item */
  showHomeIcon?: boolean;
  /** Whether to use a botanical element as separator */
  botanicalSeparator?: boolean;
  /** Custom separator element */
  separator?: React.ReactNode;
  /** Whether to truncate long paths */
  truncate?: boolean;
  /** Maximum width for each breadcrumb (for truncation) */
  maxItemWidth?: number | string;
  /** Whether to use micro animations */
  animated?: boolean;
  /** Max items to show before collapsing (responsive) */
  maxVisibleItems?: number;
}

/**
 * NavBar component properties
 */
export interface NavBarProps extends Omit<BoxProps, 'position'> {
  /** The brand/logo element */
  logo?: React.ReactNode;
  /** Array of navigation items */
  items: NavigationItemProps[];
  /** Whether the navbar is transparent (for hero sections) */
  transparent?: boolean;
  /** Whether the navbar is sticky */
  sticky?: boolean;
  /** Whether the navbar has a shadow */
  shadow?: boolean;
  /** The position of the navbar */
  navPosition?: 'top' | 'bottom';
  /** Navbar variant */
  variant?: 'primary' | 'secondary' | 'minimal';
  /** Whether to show a mobile menu on smaller screens */
  mobileMenu?: boolean;
  /** Custom mobile menu trigger icon */
  menuIcon?: React.ReactNode;
  /** Whether to collapse the menu on scroll */
  collapseOnScroll?: boolean;
}

/**
 * Sidebar component properties
 */
export interface SidebarProps extends Omit<BoxProps, 'position'> {
  /** Array of navigation items */
  items: NavigationItemProps[];
  /** Logo or header content for the sidebar */
  logo?: React.ReactNode;
  /** Whether the sidebar is expanded */
  expanded?: boolean;
  /** Function to toggle sidebar expansion */
  onToggle?: () => void;
  /** Whether the sidebar is collapsible */
  collapsible?: boolean;
  /** The position of the sidebar */
  sidePosition?: 'left' | 'right';
  /** The width of the sidebar when expanded */
  width?: string | number;
  /** The width of the sidebar when collapsed */
  collapsedWidth?: string | number;
  /** The variant/style of the sidebar */
  variant?: 'light' | 'dark' | 'primary';
}

/**
 * SideNavigation component properties
 */
export interface SideNavigationProps extends BoxProps {
  /** Array of navigation items */
  items: NavigationItemProps[];
  /** The currently active item key */
  activeItemKey?: string;
  /** The variant/style of the navigation */
  variant?: 'vertical' | 'horizontal';
  /** Whether to expand submenus on hover */
  expandOnHover?: boolean;
  /** Maximum expanded levels */
  maxExpandedLevels?: number;
}

/**
 * StickyNavigation component properties
 */
export interface StickyNavigationProps extends BoxProps {
  /** Array of navigation items */
  items: NavigationItemProps[];
  /** The offset from the top of the viewport */
  offset?: number;
  /** Whether to highlight active section */
  highlightActive?: boolean;
  /** Whether to smooth scroll to sections */
  smoothScroll?: boolean;
  /** The threshold for activating items */
  threshold?: number;
  /** The time to debounce scroll events */
  scrollDebounce?: number;
} 