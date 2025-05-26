/**
 * LoadingScreen Component
 * 
 * A component that displays a loading state with botanical animation.
 * Implements sacred geometry principles for loading indicators.
 */

import * as React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FlowerOfLife } from '../../botanical';
import { 
  PHI, 
  PHI_INVERSE, 
  SACRED_EASINGS 
} from '../../../constants/sacred-geometry';
import { getFibonacciByIndex } from '../../../utils/getFibonacciByIndex';

export interface LoadingScreenProps {
  /** Size of the loading indicator */
  size?: number | string;
  /** Optional loading message */
  message?: string;
  /** Whether to show botanical decorations */
  withBotanical?: boolean;
  /** Loading screen variant */
  variant?: 'fullscreen' | 'inline';
  /** Additional class name */
  className?: string;
}

const LoadingScreen = React.forwardRef<HTMLDivElement, LoadingScreenProps>(
  ({ 
    size = getFibonacciByIndex(9), // 34px
    message,
    withBotanical = true,
    variant = 'inline',
    className
  }, ref) => {
    return (
      <LoadingContainer
        $variant={variant}
        className={className}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: getFibonacciByIndex(6)! * 0.01, // 0.08s
          ease: SACRED_EASINGS.standard,
        }}
        ref={ref}
      >
        <LoadingContent>
          {withBotanical && (
            <BotanicalContainer
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: getFibonacciByIndex(9)! * 0.1, // 3.4s
                ease: SACRED_EASINGS.standard,
                repeat: Infinity,
                repeatType: "loop"
              }}
            >
              <FlowerOfLife size={size} opacity={0.8} />
            </BotanicalContainer>
          )}
          {message && (
            <LoadingMessage>
              {message}
            </LoadingMessage>
          )}
        </LoadingContent>
      </LoadingContainer>
    );
  }
);

LoadingScreen.displayName = 'LoadingScreen';

interface StyledLoadingProps {
  $variant: LoadingScreenProps['variant'];
}

const LoadingContainer = styled(motion.div)<StyledLoadingProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ $variant, theme }) => $variant === 'fullscreen' ? `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${theme.colors.background[50]}E6;
    z-index: ${getFibonacciByIndex(10)}; // 55
  ` : `
    width: 100%;
    height: 100%;
    min-height: ${getFibonacciByIndex(10)}px; // 55px
  `}
`;

const LoadingContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${getFibonacciByIndex(6)}px; // 8px
`;

const BotanicalContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  transform-origin: center;
`;

const LoadingMessage = styled.p`
  margin: 0;
  font-size: ${getFibonacciByIndex(6)}px; // 8px
  color: ${props => props.theme.colors.text.secondary};
  opacity: ${PHI_INVERSE}; // 0.618
`;

export default LoadingScreen; 
