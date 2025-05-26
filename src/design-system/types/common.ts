/**
 * Common Design System Type Definitions
 * 
 * This file contains common TypeScript interfaces and types used across
 * the design system components. It helps ensure consistency in props and 
 * styling throughout the design system.
 */

import { ReactNode, HTMLAttributes, CSSProperties } from 'react';
import { DefaultTheme } from 'styled-components';
import { SacredGeometryConfig, SacredSpacing } from '../../types/general.types';

/**
 * Base props for all design system components
 */
export interface DesignSystemComponentProps {
  /** Optional className for styled-components */
  className?: string;
  
  /** Optional inline style overrides */
  style?: CSSProperties;
  
  /** Optional id attribute */
  id?: string;
  
  /** Data attributes for testing or third-party libraries */
  [key: `data-${string}`]: string | undefined;
}

/**
 * Props for components that can include children
 */
export interface WithChildrenProps extends DesignSystemComponentProps {
  /** React children */
  children?: ReactNode;
}

/**
 * Props for components with sacred geometry principles
 */
export interface SacredComponentProps extends DesignSystemComponentProps {
  /** Configuration for sacred geometry properties */
  sacredGeometry?: SacredGeometryConfig;
  
  /** Whether to use golden ratio proportions */
  useGoldenRatio?: boolean;
  
  /** Whether to use Fibonacci sequence for spacing */
  useFibonacciSpacing?: boolean;
  
  /** Sacred spacing configuration */
  sacredSpacing?: SacredSpacing;
}

/**
 * Props for polymorphic components
 */
export interface PolymorphicProps<T extends React.ElementType = 'div'> extends DesignSystemComponentProps {
  /** HTML element or React component to render */
  as?: T;
  
  /** Additional props for the rendered element */
  [key: string]: any;
}

/**
 * Props for components with spacing
 */
export interface SpacingProps extends DesignSystemComponentProps {
  /** Margin (all sides) */
  margin?: number | string;
  
  /** Margin top */
  marginTop?: number | string;
  
  /** Margin right */
  marginRight?: number | string;
  
  /** Margin bottom */
  marginBottom?: number | string;
  
  /** Margin left */
  marginLeft?: number | string;
  
  /** Horizontal margin (left and right) */
  marginX?: number | string;
  
  /** Vertical margin (top and bottom) */
  marginY?: number | string;
  
  /** Padding (all sides) */
  padding?: number | string;
  
  /** Padding top */
  paddingTop?: number | string;
  
  /** Padding right */
  paddingRight?: number | string;
  
  /** Padding bottom */
  paddingBottom?: number | string;
  
  /** Padding left */
  paddingLeft?: number | string;
  
  /** Horizontal padding (left and right) */
  paddingX?: number | string;
  
  /** Vertical padding (top and bottom) */
  paddingY?: number | string;
}

/**
 * Props for components with dimensions
 */
export interface DimensionProps extends DesignSystemComponentProps {
  /** Width of the component */
  width?: number | string;
  
  /** Height of the component */
  height?: number | string;
  
  /** Minimum width */
  minWidth?: number | string;
  
  /** Maximum width */
  maxWidth?: number | string;
  
  /** Minimum height */
  minHeight?: number | string;
  
  /** Maximum height */
  maxHeight?: number | string;
}

/**
 * Common transition properties
 */
export interface TransitionProps {
  /** Transition duration in ms */
  transitionDuration?: number;
  
  /** Transition timing function */
  transitionEasing?: 'standard' | 'easeIn' | 'easeOut' | 'botanical';
  
  /** Transition delay in ms */
  transitionDelay?: number;
}

/**
 * Common color props
 */
export interface ColorProps {
  /** Text color */
  color?: string;
  
  /** Background color */
  backgroundColor?: string;
  
  /** Background color (shorthand) */
  bg?: string;
  
  /** Color variant (uses theme colors) */
  variant?: 'primary' | 'secondary' | 'tertiary' | 'accent';
}

/**
 * Common event handler props
 */
export interface EventHandlerProps {
  /** Click event handler */
  onClick?: (event: React.MouseEvent) => void;
  
  /** Mouse enter event handler */
  onMouseEnter?: (event: React.MouseEvent) => void;
  
  /** Mouse leave event handler */
  onMouseLeave?: (event: React.MouseEvent) => void;
  
  /** Focus event handler */
  onFocus?: (event: React.FocusEvent) => void;
  
  /** Blur event handler */
  onBlur?: (event: React.FocusEvent) => void;
}

/**
 * Props for theme-aware components
 */
export interface ThemedComponentProps {
  /** Theme object from styled-components */
  theme: DefaultTheme;
}

/**
 * Common component sizes
 */
export type ComponentSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Common component variants
 */
export type ComponentVariant = 'primary' | 'secondary' | 'tertiary' | 'accent';

/**
 * Common component states
 */
export interface ComponentStateProps {
  /** Whether the component is disabled */
  disabled?: boolean;
  
  /** Whether the component is in a loading state */
  loading?: boolean;
  
  /** Whether the component is active */
  active?: boolean;
  
  /** Whether the component has an error */
  error?: boolean;
  
  /** Whether the component is focused */
  focused?: boolean;
}

/**
 * Common responsive props
 */
export type ResponsiveProp<T> = T | { xs?: T; sm?: T; md?: T; lg?: T; xl?: T };

/**
 * Element reference props
 */
export interface RefProps<T = any> {
  /** Ref object for the component */
  ref?: React.Ref<T>;
}

/**
 * Sacred grid props
 */
export interface SacredGridProps extends DesignSystemComponentProps {
  /** Number of columns */
  columns?: number | ResponsiveProp<number>;
  
  /** Whether to use Fibonacci sequence for columns */
  useFibonacciColumns?: boolean;
  
  /** Gap between grid items */
  gap?: number | string | ResponsiveProp<number | string>;
  
  /** Column gap */
  columnGap?: number | string | ResponsiveProp<number | string>;
  
  /** Row gap */
  rowGap?: number | string | ResponsiveProp<number | string>;
}

/**
 * Typography props
 */
export interface TypographyProps extends WithChildrenProps {
  /** Font size */
  fontSize?: number | string | ResponsiveProp<number | string>;
  
  /** Font weight */
  fontWeight?: 'light' | 'regular' | 'medium' | 'semiBold' | 'bold' | 'black' | number;
  
  /** Line height */
  lineHeight?: number | string;
  
  /** Letter spacing */
  letterSpacing?: number | string;
  
  /** Text alignment */
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  
  /** Text transformation */
  textTransform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase';
  
  /** Whether to truncate text with ellipsis */
  truncate?: boolean;
} 