// TODO: This file contains direct window access without SSR checks
import * as React from 'react';
import { useState, useEffect } from 'react';
import styled, { DefaultTheme } from 'styled-components';

// Import sacred geometry constants
import { PHI, PHI_INVERSE } from '../../../constants/sacred-geometry';
import { getFibonacciByIndex } from '../../../utils/getFibonacciByIndex';

// Import components
import NavigationItem from './NavigationItem';
import { OliveBranch, BotanicalDecorator } from '../botanical';
import { ScrollReveal } from '../../components/animation';

// Types
export interface SideNavigationItem {
  /** The navigation item's label */
  label: string;
  /** The navigation item's URL */
  path: string;
  /** Whether the item is active (current page) */
  isActive?: boolean;
  /** Optional icon to display */
  icon?: React.ReactNode;
  /** Optional subItems for dropdown menus */
  subItems?: Array<{
    label: string;
    path: string;
    isActive?: boolean;
  }>;
}

export interface SideNavigationProps {
  /** Array of navigation items */
  items: SideNavigationItem[];
  /** Title for the side navigation */
  title?: string;
  /** Whether to show botanical decorators */
  withBotanical?: boolean;
  /** The type of botanical decoration to use */
  botanicalType?: 'oliveBranch' | 'flowerOfLife' | 'vesicaPiscis' | 'fibonacciSpiral' | 'oliveLeaf';
  /** Whether to show dividers between sections */
  withDividers?: boolean;
  /** Background color variant */
  variant?: 'primary' | 'secondary' | 'light' | 'dark' | 'transparent';
  /** Whether to use animation effects */
  animated?: boolean;
  /** Whether the side navigation is collapsible (for mobile) */
  collapsible?: boolean;
  /** Whether the navigation is initially collapsed (when collapsible) */
  initiallyCollapsed?: boolean;
  /** Whether to show items in compact style */
  compact?: boolean;
  /** The width of the side navigation (can use golden ratio) */
  width?: string | number;
  /** Maximum height (with scrolling if content exceeds) */
  maxHeight?: string | number;
  /** Additional className */
  className?: string;
  /** Additional style properties */
  style?: React.CSSProperties;
  /** Test ID for testing */
  'data-testid'?: string;
}

/**
 * SideNavigation Component
 * 
 * A vertical navigation component that displays a list of navigation items
 * with optional botanical decorations and animations.
 * Follows sacred geometry principles for spacing and proportions.
 */
const SideNavigation: React.FC<SideNavigationProps> = ({
  items,
  title,
  withBotanical = true,
  botanicalType = 'oliveBranch',
  withDividers = false,
  variant = 'light',
  animated = true,
  collapsible = false,
  initiallyCollapsed = false,
  compact = false,
  width = `${Math.round(getFibonacciByIndex(11) * PHI)}px`, // Golden ratio based width
  maxHeight = '100%',
  className,
  style,
  'data-testid': testId = 'sacred-side-navigation',
}) => {
  // State for collapsible behavior
  const [isCollapsed, setIsCollapsed] = useState(initiallyCollapsed);
  
  // Handle window resize for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      // Auto-collapse when screen is narrow
      if (window.innerWidth < getFibonacciByIndex(12)) { // 144px (based on Fibonacci sequence)
        setIsCollapsed(true);
      }
    };
    
    // Add resize listener
    window.addEventListener('resize', handleResize);
    
    // Initial check
    handleResize();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Toggle collapsed state
  const toggleCollapsed = () => {
    setIsCollapsed(!isCollapsed);
  };
  
  // Helper function to get background color
  const getContainerBackgroundColor = () => {
    switch (variant) {
      case 'primary':
        return '#1a365d'; // Dark blue
      case 'secondary':
        return '#2c5282'; // Medium blue
      case 'dark':
        return '#1a202c'; // Dark gray
      case 'transparent':
        return 'transparent';
      case 'light':
      default:
        return '#f9f9f9'; // Light gray
    }
  };

  // Helper function to get text color
  const getContainerTextColor = () => {
    switch (variant) {
      case 'primary':
      case 'secondary':
      case 'dark':
        return '#ffffff'; // White
      case 'transparent':
      case 'light':
      default:
        return '#1a202c'; // Dark gray
    }
  };

  // Create style object for the container
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    width: typeof width === 'number' ? `${width}px` : width,
    maxHeight: typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight,
    overflowY: 'auto',
    backgroundColor: getContainerBackgroundColor(),
    color: getContainerTextColor(),
    borderRadius: `${getFibonacciByIndex(5)}px`, // 5px
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    padding: compact ? `${getFibonacciByIndex(5)}px` : `${getFibonacciByIndex(6)}px`, // 5px or 8px
    position: 'relative'
  };
  
  return (
    <div className={className} style={style} data-testid={testId}>
      <nav style={containerStyle}>
        {/* Title with toggle button for collapsible nav */}
        {(title || collapsible) && (
          <TitleContainer>
            {title && <Title>{title}</Title>}
            
            {collapsible && (
              <CollapseButton onClick={toggleCollapsed} aria-expanded={!isCollapsed}>
                <StyledCollapseIcon isCollapsed={isCollapsed}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d={isCollapsed ? "M12 5v14M5 12h14" : "M5 12h14"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </StyledCollapseIcon>
              </CollapseButton>
            )}
          </TitleContainer>
        )}
        
        {/* Navigation items */}
        <StyledNavItemsContainer isCollapsed={isCollapsed}>
          {items.map((item, index) => {
            const delay = animated ? index * (PHI_INVERSE * 0.1) : 0;
            
            return (
              <React.Fragment key={`${item.label}-${index}`}>
                {/* Add dividers between items when enabled */}
                {withDividers && index > 0 && <Divider />}
                
                {/* Navigation item with animation */}
                <StyledNavItemWrapper compact={compact}>
                  {animated ? (
                    <ScrollReveal
                      delay={delay}
                      distance={getFibonacciByIndex(5)}
                      variant="slide-right"
                    >
                      <NavigationItem
                        label={item.label}
                        href={item.path}
                        isActive={item.isActive}
                        icon={item.icon}
                        subItems={item.subItems?.map(subItem => ({
                          label: subItem.label,
                          href: subItem.path,
                          isActive: subItem.isActive
                        }))}
                      />
                    </ScrollReveal>
                  ) : (
                    <NavigationItem
                      label={item.label}
                      href={item.path}
                      isActive={item.isActive}
                      icon={item.icon}
                      subItems={item.subItems?.map(subItem => ({
                        label: subItem.label,
                        href: subItem.path,
                        isActive: subItem.isActive
                      }))}
                    />
                  )}
                </StyledNavItemWrapper>
              </React.Fragment>
            );
          })}
        </StyledNavItemsContainer>
        
        {/* Botanical decorator */}
        {withBotanical && (
          <BotanicalDecorator
            botanicalType={botanicalType}
            position="bottomRight"
            size="md"
            opacity={0.15}
            colorScheme="primary"
            decorative
          >
            {null}
          </BotanicalDecorator>
        )}
      </nav>
    </div>
  );
};

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${getFibonacciByIndex(6)}px; // 8px
  padding-bottom: ${getFibonacciByIndex(5)}px; // 5px
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const Title = styled.h3`
  font-size: ${getFibonacciByIndex(7)}px; // 13px
  font-weight: 600;
  margin: 0;
  padding: 0;
`;

interface CollapseIconProps {
  isCollapsed: boolean;
}

const StyledCollapseIcon = styled.span<CollapseIconProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transform: rotate(${({ isCollapsed }) => isCollapsed ? '0' : '45'}deg);
  transition: transform 0.2s cubic-bezier(${PHI_INVERSE}, 0, ${1 - PHI_INVERSE}, 1);
`;

const CollapseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${getFibonacciByIndex(8)}px; // 21px
  height: ${getFibonacciByIndex(8)}px; // 21px
  border-radius: 50%;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 ${getFibonacciByIndex(3)}px rgba(66, 153, 225, 0.5); // 2px
  }
`;

interface NavItemsContainerProps {
  isCollapsed: boolean;
}

const StyledNavItemsContainer = styled.div<NavItemsContainerProps>`
  display: ${({ isCollapsed }) => isCollapsed ? 'none' : 'flex'};
  flex-direction: column;
  overflow-y: auto;
`;

interface NavItemWrapperProps {
  compact: boolean;
}

const StyledNavItemWrapper = styled.div<NavItemWrapperProps>`
  margin-bottom: ${({ compact }) => compact ? `${getFibonacciByIndex(4)}px` : `${getFibonacciByIndex(5)}px`}; // 3px or 5px
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const Divider = styled.div`
  height: 1px;
  background-color: rgba(0, 0, 0, 0.1);
  margin: ${getFibonacciByIndex(5)}px 0; // 5px
`;

export default SideNavigation; 









