import * as React from 'react';
import styled from 'styled-components';

// Import botanical components and utilities
import { BotanicalElement } from './index';
import { 
  BotanicalPosition, 
  BotanicalSize,
  getBotanicalPositionStyles,
  getBotanicalSize,
  accessibleBotanical
} from './botanicalUtils';

// TypeScript interfaces
export interface BotanicalDecoratorProps {
  /** The container content */
  children: React.ReactNode;
  /** The type of botanical element to display */
  botanicalType?: 'oliveBranch' | 'flowerOfLife' | 'vesicaPiscis' | 'fibonacciSpiral' | 'oliveLeaf' | 'smallFlourish';
  /** Position of the botanical element */
  position?: BotanicalPosition;
  /** Size of the botanical element */
  size?: BotanicalSize;
  /** Opacity of the botanical element */
  opacity?: number;
  /** Color scheme for the botanical element */
  colorScheme?: 'primary' | 'secondary' | 'accent' | 'light';
  /** Rotation angle in degrees */
  rotation?: number;
  /** Optional z-index */
  zIndex?: number;
  /** Whether the botanical element should animate on hover */
  animateOnHover?: boolean;
  /** Whether to show the botanical element on mobile */
  showOnMobile?: boolean;
  /** Whether this is purely decorative (for accessibility) */
  decorative?: boolean;
  /** Additional className for the container */
  className?: string;
  /** Additional style for the container */
  style?: React.CSSProperties;
  /** Test ID for testing */
  'data-testid'?: string;
}

/**
 * BotanicalDecorator Component
 * 
 * A container component that adds a botanical element at a specified position.
 * Makes it easy to add botanical decorations to any content.
 */
const BotanicalDecorator = React.forwardRef<HTMLDivElement, BotanicalDecoratorProps>(
  ({
    children,
    botanicalType = 'oliveBranch',
    position = 'bottom-right',
    size = 'md',
    opacity = 0.15,
    colorScheme = 'primary',
    rotation = 0,
    zIndex = 0,
    animateOnHover = false,
    showOnMobile = true,
    decorative = true,
    className,
    style,
    'data-testid': testId = 'botanical-decorator',
  }, ref) => {
    return (
      <Container 
        className={className} 
        style={style}
        data-testid={testId}
        $animateOnHover={animateOnHover}
        $showOnMobile={showOnMobile}
        ref={ref}
      >
        {children}
        
        <BotanicalWrapper
          style={getBotanicalPositionStyles({ 
            position, 
            rotation, 
            zIndex,
            animate: animateOnHover 
          })}
          $size={size}
          $animateOnHover={animateOnHover}
          aria-hidden={decorative}
        >
          <BotanicalElement
            variant={botanicalType}
            size={size}
            opacity={opacity}
            colorScheme={colorScheme}
            withAnimation={animateOnHover}
          />
        </BotanicalWrapper>
      </Container>
    );
  }
);

BotanicalDecorator.displayName = 'BotanicalDecorator';

// Styled components
interface ContainerProps {
  $animateOnHover: boolean;
  $showOnMobile: boolean;
}

const Container = styled.div<ContainerProps>`
  position: relative;
  
  /* Hide on mobile if specified */
  ${({ $showOnMobile }) => !$showOnMobile && `
    @media (max-width: 768px) {
      .botanical-decorator-element {
        display: none;
      }
    }
  `}
  
  /* Hover animation for botanical element */
  ${({ $animateOnHover }) => $animateOnHover && `
    &:hover .botanical-decorator-element {
      transform: scale(${1 + (0.618 * 0.2)});
      opacity: ${1 - (0.618 * 0.5)};
    }
  `}
`;

interface BotanicalWrapperProps {
  $size: BotanicalSize;
  $animateOnHover: boolean;
}

const BotanicalWrapper = styled.div<BotanicalWrapperProps>`
  /* Size based on preset */
  width: ${({ $size }) => getBotanicalSize($size)}px;
  height: ${({ $size }) => getBotanicalSize($size)}px;
  
  /* Class for targeting in hover state */
  class-name: botanical-decorator-element;
  
  /* Transition for hover animations */
  ${({ $animateOnHover }) => $animateOnHover && `
    transition: all 0.3s cubic-bezier(0.618, 0, 0.382, 1);
  `}
  
  /* Accessibility styles */
  ${accessibleBotanical.decorative}
  ${accessibleBotanical.reduceMotion}
  ${accessibleBotanical.highContrast}
`;

export default BotanicalDecorator; 







