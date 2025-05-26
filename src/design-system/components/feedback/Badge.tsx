/**
 * Badge Component
 * 
 * A compact component for status indicators and counters.
 * Implements sacred geometry principles for shape, spacing, and proportions.
 * Designed with golden circle proportions for visual harmony.
 */

import * as React from 'react';
import styled from 'styled-components';
import { getFibonacciByIndex } from '../../../utils/getFibonacciByIndex';
import { 
  PHI, 
  PHI_INVERSE, 
  FIBONACCI, 
  SACRED_SPACING, 
  SACRED_RADIUS 
} from '../../../constants/sacred-geometry';

// Badge variants
export type BadgeVariant = 'solid' | 'subtle' | 'outline';

// Badge sizes following Fibonacci sequence
export type BadgeSize = 'xs' | 'sm' | 'md' | 'lg';

// Badge shapes with golden proportions
export type BadgeShape = 'square' | 'rounded' | 'circle';

// Badge status colors
export type BadgeStatus = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';

// Badge props
export interface BadgeProps {
  /** Badge size based on Fibonacci sequence */
  size?: BadgeSize;
  /** Badge shape following sacred geometry */
  shape?: BadgeShape;
  /** Badge visual variant */
  variant?: BadgeVariant;
  /** Badge status determining color */
  status?: BadgeStatus;
  /** If true, uses the golden circle proportion */
  useGoldenCircle?: boolean;
  /** Additional CSS class */
  className?: string;
  /** Badge content */
  children?: React.ReactNode;
}

// Status colors with sacred proportions
const statusColors = {
  default: {
    bg: '#718096',
    color: 'white',
  },
  primary: {
    bg: '#4299e1',
    color: 'white',
  },
  secondary: {
    bg: '#805ad5',
    color: 'white',
  },
  success: {
    bg: '#38a169',
    color: 'white',
  },
  warning: {
    bg: '#dd6b20',
    color: 'white',
  },
  error: {
    bg: '#e53e3e',
    color: 'white',
  },
  info: {
    bg: '#3182ce',
    color: 'white',
  },
};

// Size mappings following Fibonacci sequence
const sizeMappings = {
  xs: {
    fontSize: getFibonacciByIndex(3),
    paddingY: SACRED_SPACING.xxs / 2,
    paddingX: SACRED_SPACING.xs / 2,
    height: getFibonacciByIndex(5),
  },
  sm: {
    fontSize: getFibonacciByIndex(4),
    paddingY: SACRED_SPACING.xxs,
    paddingX: SACRED_SPACING.xs,
    height: getFibonacciByIndex(6),
  },
  md: {
    fontSize: getFibonacciByIndex(5),
    paddingY: SACRED_SPACING.xs,
    paddingX: SACRED_SPACING.sm,
    height: getFibonacciByIndex(7),
  },
  lg: {
    fontSize: getFibonacciByIndex(6),
    paddingY: SACRED_SPACING.sm,
    paddingX: SACRED_SPACING.md,
    height: getFibonacciByIndex(8),
  },
};

// Get radius based on shape
const getRadius = (shape: BadgeShape, size: BadgeSize) => {
  switch (shape) {
    case 'square':
      return 0;
    case 'rounded':
      return SACRED_RADIUS.sm;
    case 'circle':
      return SACRED_RADIUS.circle;
    default:
      return SACRED_RADIUS.sm;
  }
};

// Get styles for variant
const getVariantStyle = (status: BadgeStatus, variant: BadgeVariant) => {
  const { bg, color } = statusColors[status] ?? 1;
  
  switch (variant) {
    case 'solid':
      return {
        background: bg,
        color: color,
        border: 'none',
      };
    case 'subtle':
      return {
        background: `${bg}${PHI_INVERSE.toFixed(2).substring(2)}`, // Using PHI_INVERSE for opacity
        color: bg,
        border: 'none',
      };
    case 'outline':
      return {
        background: 'transparent',
        color: bg,
        border: `${getFibonacciByIndex(1)}px solid ${bg}`,
      };
    default:
      return {
        background: bg,
        color: color,
        border: 'none',
      };
  }
};

// Styled Badge component
const StyledBadge = styled.span<{
  size: BadgeSize;
  shape: BadgeShape;
  variant: BadgeVariant;
  status: BadgeStatus;
  useGoldenCircle: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  line-height: 1;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  white-space: nowrap;
  vertical-align: middle;
  
  ${props => {
    const sizeData = sizeMappings[props.size];
    const style = getVariantStyle(props.status, props.variant);
    const radius = getRadius(props.shape, props.size);
    
    let width = 'auto';
    let aspectRatio = 'auto';
    
    // Apply golden circle proportions if enabled
    if (props.useGoldenCircle && props.shape === 'circle') {
      aspectRatio = '1 / 1';
    }
    
    return `
      font-size: ${sizeData.fontSize}px;
      padding: ${sizeData.paddingY}px ${sizeData.paddingX}px;
      height: ${sizeData.height}px;
      min-width: ${props.shape === 'circle' ? sizeData.height : 'auto'}px;
      border-radius: ${radius}px;
      background: ${style.background};
      color: ${style.color};
      border: ${style.border || 'none'};
      width: ${width};
      aspect-ratio: ${aspectRatio};
    `;
  }}
  
  transition: all 0.2s;
`;

// Badge component
export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      size = 'md',
      shape = 'rounded',
      variant = 'solid',
      status = 'default',
      useGoldenCircle = false,
      className,
      children,
      ...rest
    },
    ref
  ) => {
    return (
      <StyledBadge
        ref={ref}
        size={size}
        shape={shape}
        variant={variant}
        status={status}
        useGoldenCircle={useGoldenCircle}
        className={className}
        {...rest}
      >
        {children}
      </StyledBadge>
    );
  }
);

Badge.displayName = 'Badge';

export default Badge; 









