/**
 * TabNavigation Component
 * 
 * A component that provides tab-based navigation with sacred geometry principles
 * for spacing, transitions, and animations.
 */

import * as React from 'react';
import { useState, useEffect } from 'react';
import styled, { DefaultTheme } from 'styled-components';

// Import sacred geometry constants
import { 
  PHI, 
  PHI_INVERSE,
  SACRED_RADIUS,
  getFibonacciByIndex
} from '../../../constants/sacred-geometry';

// Import components
import Link from './Link';
import { Box, Flex } from '../layout';
import { BotanicalElement } from '../botanical';
import { SmallFlourish } from '../botanical/SmallFlourish';

// TypeScript interfaces
export interface TabItem {
  /** The tab label */
  label: string;
  /** The tab content or URL */
  content: React.ReactNode | string;
  /** Whether the tab is active */
  isActive?: boolean;
  /** Optional icon to display */
  icon?: React.ReactNode;
  /** Whether the tab is disabled */
  isDisabled?: boolean;
}

export interface TabNavigationProps {
  /** Array of tab items */
  tabs: TabItem[];
  /** The active tab index */
  activeIndex?: number;
  /** Callback when tab is changed */
  onChange?: (index: number) => void;
  /** Whether the tabs are vertical */
  isVertical?: boolean;
  /** Whether to show botanical decorations */
  withBotanical?: boolean;
  /** Variant style for the tabs */
  variant?: 'default' | 'pills' | 'underlined' | 'buttons';
  /** Color scheme for the tabs */
  colorScheme?: 'primary' | 'secondary' | 'accent' | 'neutral';
  /** Size of the tabs */
  size?: 'sm' | 'md' | 'lg';
  /** Whether the tabs fill the container width */
  isFull?: boolean;
  /** Whether to animate tab transitions */
  animated?: boolean;
  /** Additional className */
  className?: string;
  /** Test ID for testing */
  'data-testid'?: string;
}

/**
 * TabNavigation Component
 * 
 * A component that provides tab-based navigation with sacred geometry principles.
 */
const TabNavigation: React.FC<TabNavigationProps> = ({
  tabs,
  activeIndex = 0,
  onChange,
  isVertical = false,
  withBotanical = false,
  variant = 'default',
  colorScheme = 'primary',
  size = 'md',
  isFull = false,
  animated = true,
  className,
  'data-testid': testId = 'sacred-tabs',
}) => {
  // State for the active tab
  const [activeTab, setActiveTab] = useState(activeIndex);
  
  // Update active tab when activeIndex prop changes
  useEffect(() => {
    setActiveTab(activeIndex);
  }, [activeIndex]);
  
  // Handle tab click
  const handleTabClick = (index: number) => {
    if (tabs[index]?.isDisabled) return;
    
    setActiveTab(index);
    if (onChange) onChange(index);
  };
  
  // Get tab content
  const getTabContent = () => {
    const tab = tabs[activeTab];
    if (!tab) return null;
    
    // If content is a React node, return it
    if (React.isValidElement(tab.content)) {
      return tab.content;
    }
    
    // If content is a string (URL), it's a link-based tab, return null
    return null;
  };
  
  return (
    <Container
      className={className}
      data-testid={testId}
    >
      {/* Tab Navigation */}
      <TabList
        $isVertical={isVertical}
        $variant={variant}
        $isFull={isFull}
        $size={size}
      >
        {tabs.map((tab, index) => {
          const isActive = index === activeTab;
          const isLink = typeof tab.content === 'string';
          
          return (
            <TabItem
              key={`tab-${index}`}
              $isActive={isActive}
              $isDisabled={tab.isDisabled}
              $variant={variant}
              $colorScheme={colorScheme}
              $size={size}
              $isVertical={isVertical}
            >
              {isLink ? (
                <Link
                  href={tab.content as string}
                  isActive={isActive}
                  variant="navigation"
                  withHoverEffect={!tab.isDisabled}
                >
                  {tab.icon && <TabIcon>{tab.icon}</TabIcon>}
                  <TabLabel>{tab.label}</TabLabel>
                </Link>
              ) : (
                <TabButton
                  onClick={() => handleTabClick(index)}
                  disabled={tab.isDisabled}
                  type="button"
                  $isActive={isActive}
                  $variant={variant}
                  $colorScheme={colorScheme}
                >
                  {tab.icon && <TabIcon>{tab.icon}</TabIcon>}
                  <TabLabel>{tab.label}</TabLabel>
                </TabButton>
              )}
              
              {/* Botanical accent for active tab */}
              {withBotanical && isActive && (
                <TabBotanical>
                  <SmallFlourish
                    width="20px"
                    height="20px"
                    opacity={0.1}
                    color={colorScheme === 'primary' 
                      ? 'var(--primary-color)' 
                      : colorScheme === 'secondary'
                        ? 'var(--secondary-color)'
                        : 'currentColor'
                    }
                  />
                </TabBotanical>
              )}
            </TabItem>
          );
        })}
      </TabList>
      
      {/* Tab Content (only for tab panel style) */}
      {!isVertical && !tabs.some(tab => typeof tab.content === 'string') && (
        <TabContent $animated={animated}>
          {getTabContent()}
        </TabContent>
      )}
    </Container>
  );
};

// Styled components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

interface TabListProps {
  $isVertical: boolean;
  $variant: string;
  $isFull: boolean;
  $size: string;
}

const TabList = styled.div<TabListProps>`
  display: flex;
  flex-direction: ${({ $isVertical }) => $isVertical ? 'column' : 'row'};
  ${({ $isFull }) => $isFull && 'width: 100%;'}
  justify-content: ${({ $isFull }) => $isFull ? 'space-between' : 'flex-start'};
  border-bottom: ${({ $variant, $isVertical, theme }) => 
    $variant === 'underlined' && !$isVertical 
      ? `${getFibonacciByIndex(3)}px solid ${theme.colors.background[200] || '#e0e0e0'}` 
      : 'none'
  };
  margin-bottom: ${({ $isVertical }) => $isVertical ? '0' : `${getFibonacciByIndex(6)}px`};
`;

interface TabItemProps {
  $isActive: boolean;
  $isDisabled?: boolean;
  $variant: string;
  $colorScheme: string;
  $size: string;
  $isVertical: boolean;
}

const TabItem = styled.div<TabItemProps>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ $size }) => {
    const base = getFibonacciByIndex(5); // 5px
    
    switch ($size) {
      case 'sm': return `${base * PHI_INVERSE}px ${base}px`;
      case 'lg': return `${base * PHI}px ${base * PHI * PHI}px`;
      default: return `${base}px ${base * PHI}px`;
    }
  }};
  
  ${({ $isActive }) => $isActive && 'flex: 1;'}
  
  margin-right: ${({ $isVertical }) => $isVertical ? '0' : `${getFibonacciByIndex(5)}px`};
  margin-bottom: ${({ $isVertical }) => $isVertical ? `${getFibonacciByIndex(5)}px` : '0'};
  
  /* Pill style */
  ${({ $variant, $isActive, $colorScheme, theme }) => {
    // Type guard and safe color access
    const colorKey = ($colorScheme === 'primary' || $colorScheme === 'secondary') 
      ? $colorScheme 
      : 'primary';
    
    return $variant === 'pills' && `
      border-radius: ${getFibonacciByIndex(6)}px;
      background-color: ${$isActive 
        ? (theme.colors[colorKey]?.[100] || '#e8f5e9')
        : 'transparent'
      };
      color: ${$isActive 
        ? (theme.colors[colorKey]?.[700] || '#2e7d32')
        : (theme.colors.text?.secondary || '#757575')
      };
    `;
  }}
  
  /* Underlined style */
  ${({ $variant, $isActive, $colorScheme, theme }) => {
    // Type guard and safe color access
    const colorKey = ($colorScheme === 'primary' || $colorScheme === 'secondary') 
      ? $colorScheme 
      : 'primary';
    
    return $variant === 'underlined' && `
      border-bottom: ${getFibonacciByIndex(3)}px solid ${
        $isActive 
        ? (theme.colors[colorKey]?.[500] || '#4caf50') 
        : 'transparent'
      };
      color: ${$isActive 
        ? (theme.colors[colorKey]?.[700] || '#2e7d32')
        : (theme.colors.text?.secondary || '#757575')
      };
    `;
  }}
  
  /* Button style */
  ${({ $variant, $isActive, $colorScheme, theme }) => {
    // Type guard and safe color access
    const colorKey = ($colorScheme === 'primary' || $colorScheme === 'secondary') 
      ? $colorScheme 
      : 'primary';
    
    return $variant === 'buttons' && `
      border-radius: ${getFibonacciByIndex(5)}px;
      background-color: ${$isActive 
        ? (theme.colors[colorKey]?.[500] || '#4caf50')
        : (theme.colors.background?.[100] || '#f5f5f5')
      };
      color: ${$isActive 
        ? (theme.colors.background?.[50] || '#ffffff')
        : (theme.colors.text?.primary || '#212121')
      };
      box-shadow: ${$isActive 
        ? `0 ${getFibonacciByIndex(3)}px ${getFibonacciByIndex(5)}px rgba(0, 0, 0, 0.1)` 
        : 'none'
      };
    `;
  }}
  
  /* Disabled state */
  ${({ $isDisabled, theme }) => $isDisabled && `
    opacity: 0.5;
    cursor: not-allowed;
    color: ${theme.colors.text?.disabled || '#bdbdbd'};
  `}
  
  transition: all 0.2s cubic-bezier(${PHI_INVERSE}, 0, ${1 - PHI_INVERSE}, 1);
`;

interface TabButtonProps {
  $isActive: boolean;
  $variant: string;
  $colorScheme: string;
}

const TabButton = styled.button<TabButtonProps>`
  background: none;
  border: none;
  font-family: inherit;
  font-size: inherit;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0;
  color: inherit;
  
  &:disabled {
    cursor: not-allowed;
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 ${getFibonacciByIndex(3)}px ${({ theme, $colorScheme }) => {
      // Type guard and safe color access
      const colorKey = ($colorScheme === 'primary' || $colorScheme === 'secondary') 
        ? $colorScheme 
        : 'primary';
      return theme.colors[colorKey]?.[300] || '#a5d6a7';
    }};
    border-radius: ${getFibonacciByIndex(3)}px;
  }
`;

const TabIcon = styled.span`
  display: inline-flex;
  align-items: center;
  margin-right: ${getFibonacciByIndex(5)}px;
`;

const TabLabel = styled.span`
  display: inline-block;
`;

const TabBotanical = styled.div`
  position: absolute;
  bottom: ${-getFibonacciByIndex(5)}px;
  right: ${getFibonacciByIndex(5)}px;
  transform: rotate(${PHI * 30}deg) scale(0.5);
  opacity: 0.5;
  pointer-events: none;
`;

interface TabContentProps {
  $animated: boolean;
}

const TabContent = styled.div<TabContentProps>`
  padding: ${getFibonacciByIndex(6)}px;
  border-radius: ${getFibonacciByIndex(5)}px;
  background-color: ${props => props.theme.colors.background?.[50] || '#ffffff'};
  
  ${({ $animated }) => $animated && `
    animation: fadeIn 0.3s cubic-bezier(${PHI_INVERSE}, 0, ${1 - PHI_INVERSE}, 1);
    
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(${getFibonacciByIndex(4)}px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `}
`;

export default TabNavigation; 







