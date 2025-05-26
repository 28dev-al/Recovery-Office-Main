// TODO: This file contains direct document access without SSR checks
// TODO: This file contains direct window access without SSR checks
import * as React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';

// Import sacred geometry constants
import { PHI_INVERSE } from '../../../constants/sacred-geometry';
import { getFibonacciByIndex } from '../../../utils/getFibonacciByIndex';

// Import components
import NavBar, { NavBarItem, NavBarCTA, NavBarProps } from './NavBar';

// TypeScript interfaces
export interface StickyNavigationProps extends Omit<NavBarProps, 'isTransparent'> {
  /** Whether to start as transparent and become solid on scroll */
  startTransparent?: boolean;
  /** Scroll threshold to trigger transparency change (in pixels) */
  transparencyThreshold?: number;
  /** Whether to show a scroll progress indicator */
  showScrollProgress?: boolean;
  /** Shape of the scroll indicator */
  scrollIndicatorShape?: 'line' | 'fibonacci' | 'circle';
  /** Color variant for the scroll indicator */
  scrollIndicatorVariant?: 'primary' | 'secondary' | 'accent';
  /** Thickness of the scroll indicator in pixels */
  scrollIndicatorThickness?: number;
  /** Whether to shrink the navbar on scroll */
  shrinkOnScroll?: boolean;
  /** Whether to include botanical accents */
  withBotanicalAccents?: boolean;
  /** Additional className */
  className?: string;
  /** Test ID for testing */
  'data-testid'?: string;
}

/**
 * StickyNavigation Component
 * 
 * A navigation wrapper that adds sticky behavior with scroll-based
 * animations following sacred geometry principles.
 */
const StickyNavigation: React.FC<StickyNavigationProps> = ({
  startTransparent = false,
  transparencyThreshold = 100,
  showScrollProgress = false,
  scrollIndicatorShape = 'line',
  scrollIndicatorVariant = 'primary',
  scrollIndicatorThickness = getFibonacciByIndex(3), // 2px
  shrinkOnScroll = true,
  withBotanicalAccents = false,
  className,
  'data-testid': testId = 'sacred-sticky-navigation',
  ...navBarProps
}) => {
  // Scroll state
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      // Update scrolled state based on threshold
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsScrolled(scrollTop > transparencyThreshold);
      
      // Calculate scroll progress
      if (showScrollProgress) {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = Math.max(0, Math.min(1, scrollTop / windowHeight));
        setScrollProgress(progress);
      }
    };
    
    // Add event listener
    window.addEventListener('scroll', handleScroll);
    
    // Initial check
    handleScroll();
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [transparencyThreshold, showScrollProgress]);
  
  // Generate progress indicator styles
  const getProgressIndicatorStyle = (): React.CSSProperties => {
    const baseStyle: React.CSSProperties = {
      position: 'absolute',
      bottom: 0,
      left: 0,
      height: `${scrollIndicatorThickness}px`,
      width: `${scrollProgress * 100}%`,
      backgroundColor: scrollIndicatorVariant === 'primary' ? '#3498db' : 
                       scrollIndicatorVariant === 'secondary' ? '#2ecc71' : 
                       '#f39c12', // Default to accent color
      transition: `width 0.1s cubic-bezier(${PHI_INVERSE}, 0, ${1 - PHI_INVERSE}, 1)`
    };

    // Apply shape-specific styles
    if (scrollIndicatorShape === 'circle') {
      return {
        ...baseStyle,
        width: `${scrollIndicatorThickness * 2}px`,
        height: `${scrollIndicatorThickness * 2}px`,
        borderRadius: '50%',
        left: `calc(${scrollProgress * 100}% - ${scrollIndicatorThickness}px)`,
        bottom: `-${scrollIndicatorThickness}px`,
        transition: `left 0.1s cubic-bezier(${PHI_INVERSE}, 0, ${1 - PHI_INVERSE}, 1)`
      };
    }

    if (scrollIndicatorShape === 'fibonacci') {
      return {
        ...baseStyle,
        backgroundImage: `linear-gradient(
          to right,
          rgba(255, 255, 255, 0.1) ${getFibonacciByIndex(5)}px,
          rgba(255, 255, 255, 0.2) ${getFibonacciByIndex(6)}px,
          rgba(255, 255, 255, 0.1) ${getFibonacciByIndex(7)}px,
          transparent ${getFibonacciByIndex(8)}px
        )`,
        backgroundSize: `${getFibonacciByIndex(9)}px 100%`,
        backgroundRepeat: 'repeat-x',
      };
    }

    return baseStyle;
  };
  
  return (
    <Container 
      className={className} 
      data-testid={testId}
      $isScrolled={isScrolled}
      $shrinkOnScroll={shrinkOnScroll}
    >
      {/* NavBar component */}
      <NavBar
        {...navBarProps}
        isTransparent={startTransparent && !isScrolled}
        showBotanical={withBotanicalAccents}
      />
      
      {/* Scroll progress indicator */}
      {showScrollProgress && (
        <div
          style={getProgressIndicatorStyle()}
          role="progressbar"
          aria-valuenow={scrollProgress * 100}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Page scroll progress"
        />
      )}
    </Container>
  );
};

// Styled components
interface ContainerProps {
  $isScrolled: boolean;
  $shrinkOnScroll: boolean;
}

const Container = styled.div<ContainerProps>`
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 1000;
  transition: all 0.3s cubic-bezier(${PHI_INVERSE}, 0, ${1 - PHI_INVERSE}, 1);
  
  /* Add shadow when scrolled */
  box-shadow: ${({ theme, $isScrolled }) => 
    $isScrolled ? theme.shadows.md : 'none'
  };
  
  /* Shrink effect when scrolled */
  ${({ $isScrolled, $shrinkOnScroll }) => 
    $isScrolled && $shrinkOnScroll ? `
      transform: scale(${1 - (PHI_INVERSE * 0.05)});
    ` : ''
  }
`;

export default StickyNavigation; 









