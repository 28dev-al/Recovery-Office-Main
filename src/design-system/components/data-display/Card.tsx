import * as React from 'react';
import styled from 'styled-components';
import { motion, Variants, MotionProps } from 'framer-motion';

// Import sacred geometry constants
import { PHI, PHI_INVERSE, FIBONACCI } from '../../../constants/sacred-geometry';

// Import design system components
import { Box } from '../layout';
import { BotanicalElement } from '../botanical';
import { BoxProps } from '../../types';

// TypeScript interfaces
export interface CardProps extends BoxProps {
  /** Elevation level of the card (shadow depth) */
  elevation?: number;
  
  /** Custom padding for the card */
  padding?: string | number;
  
  /** Border radius of the card */
  borderRadius?: string;
  
  /** The card's content */
  children: React.ReactNode;
  
  /** Variant style for the card */
  variant?: 'primary' | 'secondary' | 'tertiary' | 'outline';
  
  /** Whether to display a botanical element in the corner */
  withBotanical?: boolean;
  
  /** Type of botanical element to display */
  botanicalType?: 'oliveBranch' | 'flowerOfLife' | 'vesicaPiscis' | 'fibonacciSpiral';
  
  /** Position of the botanical element */
  botanicalPosition?: 'topRight' | 'topLeft' | 'bottomRight' | 'bottomLeft';
  
  /** Whether the card should have a raised effect */
  elevated?: boolean;
  
  /** Whether the card should have a hover effect */
  interactive?: boolean;
  
  /** Width of the card - can be a specific value or 'golden' for PHI-based ratio */
  width?: string | number | 'golden';
  
  /** Height of the card - 'golden' will create a golden rectangle */
  height?: string | number | 'golden';
  
  /** Background color for the card */
  backgroundColor?: string;
  
  /** Optional onClick handler for interactive cards */
  onClick?: () => void;
  
  /** Additional className */
  className?: string;
  
  /** Test ID for testing */
  'data-testid'?: string;
  
  /** Additional CSS styles */
  style?: React.CSSProperties;
}

/**
 * Card Component with ref forwarding
 * 
 * A container component that follows sacred geometry principles,
 * particularly the golden rectangle proportion for its dimensions.
 * Can optionally include botanical elements positioned according to 
 * the golden ratio points.
 */
const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({
    children,
    variant = 'primary',
    withBotanical = false,
    botanicalType = 'oliveBranch',
    botanicalPosition = 'bottomRight',
    elevated = false,
    interactive = false,
    width = '100%',
    height = 'auto',
    padding,
    borderRadius,
    backgroundColor,
    onClick,
    className,
    style,
    'data-testid': testId = 'sacred-card',
    ...restProps
  }, ref) => {
    // Calculate dimensions for golden rectangle if specified
    const calculatedWidth = width === 'golden' && typeof height === 'number' 
      ? height * PHI 
      : width;
      
    const calculatedHeight = height === 'golden' && typeof width === 'number' 
      ? width / PHI 
      : height;
  
    // Animation variants for interactive cards
    const interactiveVariants: Variants = {
      initial: { scale: 1 },
      hover: { scale: 1 + (PHI_INVERSE * 0.1) }, // Scale by phi-based factor
      tap: { scale: 1 - (PHI_INVERSE * 0.05) },
    };
  
    // Motion props that need to be passed conditionally
    const motionProps: MotionProps = interactive ? {
      initial: "initial",
      whileHover: "hover",
      whileTap: "tap",
      variants: interactiveVariants,
      transition: { duration: 0.3, ease: [PHI_INVERSE, 0, 1 - PHI_INVERSE, 1] }
    } : {};
  
    return (
      <StyledCard
        as={interactive ? motion.div : 'div'}
        $variant={variant}
        $elevated={elevated}
        $interactive={interactive}
        width={calculatedWidth}
        height={calculatedHeight}
        p={padding}
        borderRadius={borderRadius}
        backgroundColor={backgroundColor}
        onClick={interactive ? onClick : undefined}
        className={className}
        data-testid={testId}
        {...(interactive 
          ? { ...motionProps, ...restProps, style: style } 
          : { ...restProps, style: style as React.CSSProperties }
        )}
        ref={ref}
      >
        {children}
        
        {withBotanical && (
          <BotanicalWrapper $position={botanicalPosition}>
            <BotanicalElement 
              variant={botanicalType} 
              size="md"
              opacity={0.2}
              colorScheme={variant === 'primary' ? 'primary' : 'secondary'}
            />
          </BotanicalWrapper>
        )}
      </StyledCard>
    );
  }
);

Card.displayName = 'Card';

// Styled components
interface StyledCardProps extends BoxProps {
  $variant: string;
  $elevated: boolean;
  $interactive: boolean;
}

const StyledCard = styled(Box)<StyledCardProps>`
  position: relative;
  overflow: hidden;
  border-radius: ${({ theme, borderRadius }) => borderRadius || theme.radius.md}px;
  
  /* Fibonacci-based padding if not explicitly provided */
  padding: ${({ p, padding }) => p || padding || `${FIBONACCI[5] ?? 1}px`}; /* 8px by default */
  
  /* Color based on variant */
  background-color: ${({ theme, $variant, backgroundColor }) => 
    backgroundColor ? backgroundColor :
    $variant === 'primary' ? theme.colors.background[100] ?? 1 :
    $variant === 'secondary' ? theme.colors.background[200] ?? 1 :
    $variant === 'tertiary' ? theme.colors.background[300] ?? 1 :
    'transparent'
  };
  
  /* Border for outline variant */
  border: ${({ theme, $variant }) => 
    $variant === 'outline' ? `${FIBONACCI[3] ?? 1}px solid ${theme.colors.primary[200] ?? 1}` : 'none'
  };
  
  /* Elevation styles */
  box-shadow: ${({ theme, $elevated }) => 
    $elevated ? theme.shadows.md : 'none'
  };
  
  /* Interactive cursor */
  cursor: ${({ $interactive }) => $interactive ? 'pointer' : 'default'};
  
  /* Golden ratio transitions */
  transition: all 0.3s cubic-bezier(${PHI_INVERSE}, 0, ${1 - PHI_INVERSE}, 1);
`;

interface BotanicalWrapperProps {
  $position: string;
}

const BotanicalWrapper = styled.div<BotanicalWrapperProps>`
  position: absolute;
  z-index: 1;
  opacity: 0.2;
  
  /* Position based on golden ratio points */
  ${({ $position }) => {
    switch ($position) {
      case 'topRight':
        return `
          top: ${FIBONACCI[5] ?? 1}px;
          right: ${FIBONACCI[5] ?? 1}px;
          transform: rotate(${45 * PHI_INVERSE}deg);
        `;
      case 'topLeft':
        return `
          top: ${FIBONACCI[5] ?? 1}px;
          left: ${FIBONACCI[5] ?? 1}px;
          transform: rotate(${-45 * PHI_INVERSE}deg);
        `;
      case 'bottomRight':
        return `
          bottom: ${FIBONACCI[5] ?? 1}px;
          right: ${FIBONACCI[5] ?? 1}px;
          transform: rotate(${-45 * PHI_INVERSE}deg);
        `;
      case 'bottomLeft':
      default:
        return `
          bottom: ${FIBONACCI[5] ?? 1}px;
          left: ${FIBONACCI[5] ?? 1}px;
          transform: rotate(${45 * PHI_INVERSE}deg);
        `;
    }
  }}
`;

export default Card; 








