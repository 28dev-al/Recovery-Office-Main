import * as React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// Import sacred geometry constants
import { PHI, PHI_INVERSE, FIBONACCI } from '../../../constants/sacred-geometry';
import { getFibonacciByIndex } from '../../../utils/getFibonacciByIndex';

// TypeScript interfaces
export interface TagProps {
  /** The tag's content */
  children: React.ReactNode;
  /** Variant style for the tag */
  variant?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error';
  /** Size of the tag */
  size?: 'sm' | 'md' | 'lg';
  /** Whether the tag should be removable */
  removable?: boolean;
  /** Function to call when remove button is clicked */
  onRemove?: () => void;
  /** Whether to round the tag fully (pill shape) */
  rounded?: boolean;
  /** Whether the tag should have a sacred aspect ratio */
  golden?: boolean;
  /** Whether the tag should have a subtle animation on hover */
  animate?: boolean;
  /** Additional className */
  className?: string;
  /** Test ID for testing */
  'data-testid'?: string;
}

/**
 * Tag Component with ref forwarding
 * 
 * A component for displaying tags/badges with sacred geometry 
 * proportions and optional animations.
 */
const Tag = React.forwardRef<HTMLDivElement, TagProps>(
  ({
    children,
    variant = 'primary',
    size = 'md',
    removable = false,
    onRemove,
    rounded = false,
    golden = false,
    animate = false,
    className,
    'data-testid': testId = 'sacred-tag',
  }, ref) => {
    // Animation variants
    const animationVariants = {
      initial: { scale: 1 },
      hover: { scale: 1 + (PHI_INVERSE * 0.05) }, // Subtle phi-based scale
    };
  
    return (
      <StyledTag
        as={animate ? motion.div : 'div'}
        $variant={variant}
        $size={size}
        $rounded={rounded}
        $golden={golden}
        className={className}
        data-testid={testId}
        ref={ref}
        // Framer motion props
        initial={animate ? "initial" : undefined}
        whileHover={animate ? "hover" : undefined}
        variants={animate ? animationVariants : undefined}
        transition={{ duration: 0.2, ease: [PHI_INVERSE, 0, 1 - PHI_INVERSE, 1] }}
      >
        <TagContent>{children}</TagContent>
        
        {removable && (
          <RemoveButton 
            onClick={onRemove}
            $size={size}
            $variant={variant}
            aria-label="Remove tag"
          >
            ×
          </RemoveButton>
        )}
      </StyledTag>
    );
  }
);

Tag.displayName = 'Tag';

// Helper function to get size values based on Fibonacci sequence
const getSizeStyles = (size: string) => {
  switch (size) {
    case 'sm':
      return {
        fontSize: `${getFibonacciByIndex(5) - 1}px`, // 4px
        height: `${getFibonacciByIndex(7)}px`, // 13px
        padding: `0 ${getFibonacciByIndex(5)}px`, // 0 5px
      };
    case 'lg':
      return {
        fontSize: `${getFibonacciByIndex(6)}px`, // 8px
        height: `${getFibonacciByIndex(9)}px`, // 34px
        padding: `0 ${getFibonacciByIndex(7)}px`, // 0 13px
      };
    case 'md':
    default:
      return {
        fontSize: `${getFibonacciByIndex(6) - 2}px`, // 6px
        height: `${getFibonacciByIndex(8)}px`, // 21px
        padding: `0 ${getFibonacciByIndex(6)}px`, // 0 8px
      };
  }
};

// Styled components
interface StyledTagProps {
  $variant: string;
  $size: string;
  $rounded: boolean;
  $golden: boolean;
}

const StyledTag = styled.div<StyledTagProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  
  /* Size based on Fibonacci sequence */
  ${({ $size }) => {
    const styles = getSizeStyles($size);
    return `
      font-size: ${styles.fontSize};
      height: ${styles.height};
      padding: ${styles.padding};
    `;
  }}
  
  /* Golden ratio width-to-height ratio if enabled */
  ${({ $golden, $size }) => {
    if (!$golden) return '';
    
    const styles = getSizeStyles($size);
    const heightValue = parseInt(styles.height, 10);
    
    return `
      width: ${heightValue * PHI}px;
    `;
  }}
  
  /* Border radius - either pill or sacred proportion */
  border-radius: ${({ $rounded, $size }) => {
    if ($rounded) return '9999px';
    
    // Sacred geometry border radius based on height
    const styles = getSizeStyles($size);
    const heightValue = parseInt(styles.height, 10);
    
    return `${heightValue * PHI_INVERSE / 2}px`;
  }};
  
  /* Colors based on variant */
  background-color: ${({ theme, $variant }) => {
    switch ($variant) {
      case 'primary': return theme.colors.primary[500] ?? 1;
      case 'secondary': return theme.colors.secondary[500] ?? 1;
      case 'accent': return theme.colors.accent.gold;
      case 'success': return theme.colors.feedback.success.main;
      case 'warning': return theme.colors.feedback.warning.main;
      case 'error': return theme.colors.feedback.error.main;
      default: return theme.colors.primary[500] ?? 1;
    }
  }};
  
  color: ${({ theme, $variant }) => {
    // Choose contrasting text color
    switch ($variant) {
      case 'primary':
      case 'secondary':
      case 'accent':
      case 'error':
        return theme.colors.text.light;
      case 'warning':
        return theme.colors.text.dark;
      default:
        return theme.colors.text.light;
    }
  }};
  
  /* Transition using golden ratio cubic-bezier */
  transition: all 0.2s cubic-bezier(${PHI_INVERSE}, 0, ${1 - PHI_INVERSE}, 1);
  
  /* Basic styling */
  font-weight: 600;
  letter-spacing: 0.5px;
  white-space: nowrap;
  user-select: none;
`;

const TagContent = styled.span`
  display: flex;
  align-items: center;
`;

interface RemoveButtonProps {
  $variant: string;
  $size: string;
}

const RemoveButton = styled.button<RemoveButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  margin-left: ${({ $size }) => 
    $size === 'sm' ? `${getFibonacciByIndex(4)}px` : // 3px
    $size === 'lg' ? `${getFibonacciByIndex(6)}px` : // 8px
    `${getFibonacciByIndex(5)}px` // 5px (medium)
  };
  
  /* Size based on parent tag */
  font-size: ${({ $size }) => 
    $size === 'sm' ? `${getFibonacciByIndex(6)}px` : // 8px
    $size === 'lg' ? `${getFibonacciByIndex(8)}px` : // 21px
    `${getFibonacciByIndex(7)}px` // 13px (medium)
  };
  
  /* Inherit text color from tag */
  color: inherit;
  opacity: 0.7;
  
  /* Hover state */
  &:hover {
    opacity: 1;
  }
  
  /* Sacred geometry transition */
  transition: opacity 0.2s cubic-bezier(${PHI_INVERSE}, 0, ${1 - PHI_INVERSE}, 1);
  
  /* Focus styles for accessibility */
  &:focus {
    outline: none;
    opacity: 1;
  }
`;

export default Tag; 









