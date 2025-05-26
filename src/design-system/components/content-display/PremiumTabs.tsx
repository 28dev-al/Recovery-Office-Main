/**
 * PremiumTabs Component
 * 
 * A premium tabs component for organizing financial information
 * with professional styling and accessible navigation.
 */

import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { 
  PROFESSIONAL_EASINGS, 
  ANIMATION_DURATION, 
  TIMING_PATTERNS 
} from '../../../constants/professional-animations';

// Types for tab items
export interface TabItem {
  /**
   * Unique identifier for the tab
   */
  id: string;
  
  /**
   * The label to display in the tab
   */
  label: React.ReactNode;
  
  /**
   * The content to display when the tab is active
   */
  content: React.ReactNode;
  
  /**
   * Optional icon to display in the tab
   */
  icon?: React.ReactNode;
  
  /**
   * Whether this tab is disabled
   * @default false
   */
  disabled?: boolean;
  
  /**
   * Badge content to display (notification, count, etc.)
   */
  badge?: React.ReactNode;
}

// Props for the tabs component
export interface PremiumTabsProps {
  /**
   * Array of tab items
   */
  tabs: TabItem[];
  
  /**
   * ID of the initially active tab
   * @default first non-disabled tab
   */
  initialTabId?: string;
  
  /**
   * Variant of the tabs
   * @default 'underline'
   */
  variant?: 'underline' | 'contained' | 'outline';
  
  /**
   * Size of the tabs
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';
  
  /**
   * Tab bar position
   * @default 'top'
   */
  tabPosition?: 'top' | 'bottom' | 'left' | 'right';
  
  /**
   * Whether to animate the tab transition
   * @default true
   */
  animated?: boolean;
  
  /**
   * Callback when the active tab changes
   */
  onChange?: (tabId: string) => void;
  
  /**
   * Additional class name
   */
  className?: string;
  
  /**
   * Data attribute for testing
   */
  'data-testid'?: string;
}

// Styled tabs container
const TabsContainer = styled.div<{
  $tabPosition: 'top' | 'bottom' | 'left' | 'right';
}>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: ${props => props.$tabPosition === 'left' || props.$tabPosition === 'right' ? 'row' : 'column'};
  ${props => props.$tabPosition === 'right' && 'flex-direction: row-reverse;'}
  ${props => props.$tabPosition === 'bottom' && 'flex-direction: column-reverse;'}
  
  /* Vertical tabs require a minimum height */
  ${props => (props.$tabPosition === 'left' || props.$tabPosition === 'right') && `
    min-height: 300px;
  `}
  
  /* Add responsive styles for horizontal tabs */
  @media (max-width: ${props => props.theme.breakpoints.sm}px) {
    ${props => (props.$tabPosition === 'top' || props.$tabPosition === 'bottom') && `
      .tab-bar-scroll {
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        scrollbar-width: none; /* Firefox */
        
        &::-webkit-scrollbar {
          display: none; /* Chrome, Safari, Edge */
        }
      }
    `}
  }
`;

// Tab bar scroll container for horizontal scrolling on mobile
const TabBarScrollContainer = styled.div`
  display: flex;
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  
  /* Hide scrollbar but allow scrolling */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Edge */
  }
`;

// Styled tab bar
const TabBar = styled.div<{
  $variant: 'underline' | 'contained' | 'outline';
  $tabPosition: 'top' | 'bottom' | 'left' | 'right';
  $size: 'sm' | 'md' | 'lg';
}>`
  display: flex;
  flex-direction: ${props => props.$tabPosition === 'left' || props.$tabPosition === 'right' ? 'column' : 'row'};
  ${props => props.$tabPosition === 'left' || props.$tabPosition === 'right' ? 'flex-shrink: 0;' : ''}
  
  /* Sizing */
  ${props => {
    switch (props.$tabPosition) {
      case 'left':
      case 'right':
        return `
          ${props.$variant === 'contained' ? `
            background-color: ${props.theme.colors.background[50]};
            padding: ${props.theme.spacing.sm}px;
            border-radius: ${props.theme.radius.sm}px;
          ` : ''}
          width: ${props.$variant === 'contained' ? '220px' : '200px'};
        `;
      case 'top':
      case 'bottom':
      default:
        return `
          ${props.$variant === 'contained' ? `
            background-color: ${props.theme.colors.background[50]};
            padding: ${props.theme.spacing.sm}px;
            border-radius: ${props.theme.radius.sm}px;
          ` : ''}
        `;
    }
  }}
  
  /* Variant-specific styles */
  ${props => {
    switch (props.$variant) {
      case 'contained':
        return `
          background-color: ${props.theme.colors.background[50]};
        `;
      case 'outline':
        return `
          ${props.$tabPosition === 'top' && `border-bottom: 1px solid ${props.theme.colors.background[200]};`}
          ${props.$tabPosition === 'bottom' && `border-top: 1px solid ${props.theme.colors.background[200]};`}
          ${props.$tabPosition === 'left' && `border-right: 1px solid ${props.theme.colors.background[200]};`}
          ${props.$tabPosition === 'right' && `border-left: 1px solid ${props.theme.colors.background[200]};`}
        `;
      case 'underline':
      default:
        return `
          ${props.$tabPosition === 'top' && `border-bottom: 1px solid ${props.theme.colors.background[200]};`}
          ${props.$tabPosition === 'bottom' && `border-top: 1px solid ${props.theme.colors.background[200]};`}
          ${props.$tabPosition === 'left' && `border-right: 1px solid ${props.theme.colors.background[200]};`}
          ${props.$tabPosition === 'right' && `border-left: 1px solid ${props.theme.colors.background[200]};`}
        `;
    }
  }}
`;

// Styled tab item
const Tab = styled.button<{
  $variant: 'underline' | 'contained' | 'outline';
  $tabPosition: 'top' | 'bottom' | 'left' | 'right';
  $size: 'sm' | 'md' | 'lg';
  $isActive: boolean;
  $disabled: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: ${props => props.$tabPosition === 'left' || props.$tabPosition === 'right' ? 'flex-start' : 'center'};
  position: relative;
  background: none;
  border: none;
  cursor: ${props => props.$disabled ? 'not-allowed' : 'pointer'};
  transition: all ${ANIMATION_DURATION.standard}s cubic-bezier(${PROFESSIONAL_EASINGS.standard.join(', ')});
  white-space: nowrap;
  font-family: ${props => props.theme.typography.fontFamily.body};
  font-weight: ${props => props.$isActive ? props.theme.typography.fontWeight.semiBold : props.theme.typography.fontWeight.regular};
  color: ${props => props.$isActive ? props.theme.colors.primary[700] : props.theme.colors.text.primary};
  opacity: ${props => props.$disabled ? 0.5 : 1};
  
  /* Size-specific styles */
  ${props => {
    switch (props.$size) {
      case 'sm':
        return `
          font-size: ${props.theme.typography.fontSize.sm}px;
          padding: ${props.theme.spacing.xs}px ${props.theme.spacing.sm}px;
          ${props.$tabPosition === 'left' || props.$tabPosition === 'right' ? `
            padding: ${props.theme.spacing.sm}px ${props.theme.spacing.md}px;
            width: 100%;
          ` : ''}
        `;
      case 'lg':
        return `
          font-size: ${props.theme.typography.fontSize.md}px;
          padding: ${props.theme.spacing.md}px ${props.theme.spacing.lg}px;
          ${props.$tabPosition === 'left' || props.$tabPosition === 'right' ? `
            padding: ${props.theme.spacing.md}px ${props.theme.spacing.lg}px;
            width: 100%;
          ` : ''}
        `;
      case 'md':
      default:
        return `
          font-size: ${props.theme.typography.fontSize.base}px;
          padding: ${props.theme.spacing.sm}px ${props.theme.spacing.md}px;
          ${props.$tabPosition === 'left' || props.$tabPosition === 'right' ? `
            padding: ${props.theme.spacing.md}px ${props.theme.spacing.lg}px;
            width: 100%;
          ` : ''}
        `;
    }
  }}
  
  /* Variant-specific styles */
  ${props => {
    switch (props.$variant) {
      case 'contained':
        return `
          margin: ${props.theme.spacing.xxs}px;
          border-radius: ${props.theme.radius.sm}px;
          
          ${props.$isActive ? `
            background-color: ${props.theme.colors.white};
            box-shadow: ${props.theme.shadows.sm};
          ` : `
            &:hover:not(:disabled) {
              background-color: ${props.theme.colors.background[100]};
            }
          `}
        `;
      case 'outline':
        return `
          ${props.$isActive && `
            ${props.$tabPosition === 'top' && `border-top: 2px solid ${props.theme.colors.primary[500]};`}
            ${props.$tabPosition === 'bottom' && `border-bottom: 2px solid ${props.theme.colors.primary[500]};`}
            ${props.$tabPosition === 'left' && `border-left: 2px solid ${props.theme.colors.primary[500]};`}
            ${props.$tabPosition === 'right' && `border-right: 2px solid ${props.theme.colors.primary[500]};`}
            
            background-color: ${props.theme.colors.background[50]};
            z-index: 1;
          `}
          
          ${props.$tabPosition === 'top' && `
            border: 1px solid ${props.theme.colors.background[200]};
            border-bottom: none;
            border-top-left-radius: ${props.theme.radius.sm}px;
            border-top-right-radius: ${props.theme.radius.sm}px;
            margin-bottom: -1px;
          `}
          
          ${props.$tabPosition === 'bottom' && `
            border: 1px solid ${props.theme.colors.background[200]};
            border-top: none;
            border-bottom-left-radius: ${props.theme.radius.sm}px;
            border-bottom-right-radius: ${props.theme.radius.sm}px;
            margin-top: -1px;
          `}
          
          ${props.$tabPosition === 'left' && `
            border: 1px solid ${props.theme.colors.background[200]};
            border-right: none;
            border-top-left-radius: ${props.theme.radius.sm}px;
            border-bottom-left-radius: ${props.theme.radius.sm}px;
            margin-right: -1px;
          `}
          
          ${props.$tabPosition === 'right' && `
            border: 1px solid ${props.theme.colors.background[200]};
            border-left: none;
            border-top-right-radius: ${props.theme.radius.sm}px;
            border-bottom-right-radius: ${props.theme.radius.sm}px;
            margin-left: -1px;
          `}
          
          &:hover:not(:disabled) {
            background-color: ${props.theme.colors.background[50]};
          }
        `;
      case 'underline':
      default:
        return `
          ${props.$isActive && `
            ${props.$tabPosition === 'top' && `
              &::after {
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 2px;
                background-color: ${props.theme.colors.primary[500]};
              }
            `}
            
            ${props.$tabPosition === 'bottom' && `
              &::after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 2px;
                background-color: ${props.theme.colors.primary[500]};
              }
            `}
            
            ${props.$tabPosition === 'left' && `
              &::after {
                content: '';
                position: absolute;
                top: 0;
                right: 0;
                width: 2px;
                height: 100%;
                background-color: ${props.theme.colors.primary[500]};
              }
            `}
            
            ${props.$tabPosition === 'right' && `
              &::after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 2px;
                height: 100%;
                background-color: ${props.theme.colors.primary[500]};
              }
            `}
          `}
          
          &:hover:not(:disabled) {
            color: ${props.theme.colors.primary[600]};
          }
        `;
    }
  }}
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${props => props.theme.colors.primary[200]};
  }
`;

// Tab icon container
const TabIcon = styled.span<{
  $size: 'sm' | 'md' | 'lg';
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${props => props.theme.spacing.xs}px;
  
  /* Size-specific styles */
  ${props => {
    switch (props.$size) {
      case 'sm':
        return `
          width: ${props.theme.spacing.md}px;
          height: ${props.theme.spacing.md}px;
        `;
      case 'lg':
        return `
          width: ${props.theme.spacing.lg}px;
          height: ${props.theme.spacing.lg}px;
        `;
      case 'md':
      default:
        return `
          width: ${props.theme.spacing.md * 1.25}px;
          height: ${props.theme.spacing.md * 1.25}px;
        `;
    }
  }}
`;

// Tab badge
const TabBadge = styled.span<{
  $size: 'sm' | 'md' | 'lg';
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.colors.primary[500]};
  color: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.radius.circle};
  margin-left: ${props => props.theme.spacing.xs}px;
  
  /* Size-specific styles */
  ${props => {
    switch (props.$size) {
      case 'sm':
        return `
          min-width: ${props.theme.spacing.md}px;
          height: ${props.theme.spacing.md}px;
          font-size: ${props.theme.typography.fontSize.xs}px;
          padding: 0 ${props.theme.spacing.xxs}px;
        `;
      case 'lg':
        return `
          min-width: ${props.theme.spacing.lg}px;
          height: ${props.theme.spacing.lg}px;
          font-size: ${props.theme.typography.fontSize.sm}px;
          padding: 0 ${props.theme.spacing.xs}px;
        `;
      case 'md':
      default:
        return `
          min-width: ${props.theme.spacing.md * 1.25}px;
          height: ${props.theme.spacing.md * 1.25}px;
          font-size: ${props.theme.typography.fontSize.xs}px;
          padding: 0 ${props.theme.spacing.xxs}px;
        `;
    }
  }}
`;

// Tab content container
const TabContent = styled.div<{
  $isActive: boolean;
  $animated: boolean;
  $tabPosition: 'top' | 'bottom' | 'left' | 'right';
}>`
  flex: 1;
  padding: ${props => props.theme.spacing.md}px;
  
  /* Animated transitions */
  ${props => props.$animated && `
    transition: all ${TIMING_PATTERNS.tabs.transition}ms cubic-bezier(${PROFESSIONAL_EASINGS.standard.join(', ')});
    
    ${!props.$isActive ? `
      opacity: 0;
      ${props.$tabPosition === 'top' && 'transform: translateY(8px);'}
      ${props.$tabPosition === 'bottom' && 'transform: translateY(-8px);'}
      ${props.$tabPosition === 'left' && 'transform: translateX(8px);'}
      ${props.$tabPosition === 'right' && 'transform: translateX(-8px);'}
    ` : `
      opacity: 1;
      transform: translate(0);
    `}
  `}
  
  /* Hide inactive content if no animations */
  ${props => !props.$animated && !props.$isActive && `
    display: none;
  `}
`;

/**
 * Premium Tabs Component
 * 
 * A premium tabs component for organizing financial information
 * with professional styling for financial services websites.
 */
export const PremiumTabs: React.FC<PremiumTabsProps> = ({
  tabs,
  initialTabId,
  variant = 'underline',
  size = 'md',
  tabPosition = 'top',
  animated = true,
  onChange,
  className,
  'data-testid': testId = 'premium-tabs',
}) => {
  // Find first enabled tab
  const getFirstEnabledTabId = (): string => {
    const firstEnabledTab = tabs.find(tab => !tab.disabled);
    return firstEnabledTab ? firstEnabledTab.id : tabs[0]?.id || '';
  };
  
  // Initialize active tab
  const [activeTabId, setActiveTabId] = useState<string>(() => 
    initialTabId || getFirstEnabledTabId()
  );
  
  // Keep track of tabs for keyboard navigation
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  
  // Handle tab change
  const handleTabChange = (tabId: string) => {
    setActiveTabId(tabId);
    
    if (onChange) {
      onChange(tabId);
    }
  };
  
  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent, currentTabIndex: number) => {
    const enabledTabs = tabs.filter(tab => !tab.disabled);
    
    // Handle keyboard navigation for horizontal tabs
    if (tabPosition === 'top' || tabPosition === 'bottom') {
      switch (e.key) {
        case 'ArrowRight':
          e.preventDefault();
          if (currentTabIndex < enabledTabs.length - 1) {
            const nextTabId = enabledTabs[currentTabIndex + 1].id;
            handleTabChange(nextTabId);
            tabRefs.current[nextTabId]?.focus();
          }
          break;
        case 'ArrowLeft':
          e.preventDefault();
          if (currentTabIndex > 0) {
            const prevTabId = enabledTabs[currentTabIndex - 1].id;
            handleTabChange(prevTabId);
            tabRefs.current[prevTabId]?.focus();
          }
          break;
        case 'Home':
          e.preventDefault();
          if (enabledTabs.length > 0) {
            const firstTabId = enabledTabs[0].id;
            handleTabChange(firstTabId);
            tabRefs.current[firstTabId]?.focus();
          }
          break;
        case 'End':
          e.preventDefault();
          if (enabledTabs.length > 0) {
            const lastTabId = enabledTabs[enabledTabs.length - 1].id;
            handleTabChange(lastTabId);
            tabRefs.current[lastTabId]?.focus();
          }
          break;
      }
    }
    
    // Handle keyboard navigation for vertical tabs
    if (tabPosition === 'left' || tabPosition === 'right') {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          if (currentTabIndex < enabledTabs.length - 1) {
            const nextTabId = enabledTabs[currentTabIndex + 1].id;
            handleTabChange(nextTabId);
            tabRefs.current[nextTabId]?.focus();
          }
          break;
        case 'ArrowUp':
          e.preventDefault();
          if (currentTabIndex > 0) {
            const prevTabId = enabledTabs[currentTabIndex - 1].id;
            handleTabChange(prevTabId);
            tabRefs.current[prevTabId]?.focus();
          }
          break;
        case 'Home':
          e.preventDefault();
          if (enabledTabs.length > 0) {
            const firstTabId = enabledTabs[0].id;
            handleTabChange(firstTabId);
            tabRefs.current[firstTabId]?.focus();
          }
          break;
        case 'End':
          e.preventDefault();
          if (enabledTabs.length > 0) {
            const lastTabId = enabledTabs[enabledTabs.length - 1].id;
            handleTabChange(lastTabId);
            tabRefs.current[lastTabId]?.focus();
          }
          break;
      }
    }
  };
  
  // Reset active tab if initialTabId changes
  useEffect(() => {
    if (initialTabId && initialTabId !== activeTabId) {
      setActiveTabId(initialTabId);
    }
  }, [initialTabId]);
  
  // Reset active tab if tabs change and current active tab no longer exists
  useEffect(() => {
    const tabExists = tabs.some(tab => tab.id === activeTabId);
    if (!tabExists) {
      setActiveTabId(getFirstEnabledTabId());
    }
  }, [tabs]);
  
  // Scroll active tab into view on mobile
  useEffect(() => {
    if (tabPosition === 'top' || tabPosition === 'bottom') {
      const activeTabElement = tabRefs.current[activeTabId];
      if (activeTabElement) {
        // Use scrollIntoView with options for a smooth scroll
        activeTabElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  }, [activeTabId, tabPosition]);
  
  // Render tabs
  const renderTabs = () => {
    const tabElements = tabs.map((tab, index) => {
      const isActive = activeTabId === tab.id;
      const enabledTabs = tabs.filter(tab => !tab.disabled);
      const enabledIndex = enabledTabs.findIndex(t => t.id === tab.id);
      
      return (
        <Tab
          key={tab.id}
          $variant={variant}
          $tabPosition={tabPosition}
          $size={size}
          $isActive={isActive}
          $disabled={!!tab.disabled}
          onClick={() => !tab.disabled && handleTabChange(tab.id)}
          onKeyDown={(e) => !tab.disabled && handleKeyDown(e, enabledIndex)}
          disabled={tab.disabled}
          role="tab"
          aria-selected={isActive}
          aria-controls={`tab-panel-${tab.id}`}
          id={`tab-${tab.id}`}
          tabIndex={isActive ? 0 : -1}
          ref={(el) => {
            tabRefs.current[tab.id] = el;
          }}
        >
          {tab.icon && (
            <TabIcon $size={size}>
              {tab.icon}
            </TabIcon>
          )}
          <span>{tab.label}</span>
          {tab.badge && (
            <TabBadge $size={size}>
              {tab.badge}
            </TabBadge>
          )}
        </Tab>
      );
    });
    
    // Get aria orientation based on tab position
    const getAriaOrientation = () => {
      return tabPosition === 'left' || tabPosition === 'right' ? 'vertical' : 'horizontal';
    };
    
    // For horizontal tabs, wrap in scroll container
    if (tabPosition === 'top' || tabPosition === 'bottom') {
      return (
        <TabBarScrollContainer className="tab-bar-scroll">
          <TabBar 
            $variant={variant} 
            $tabPosition={tabPosition}
            $size={size}
            role="tablist"
            aria-orientation={getAriaOrientation()}
          >
            {tabElements}
          </TabBar>
        </TabBarScrollContainer>
      );
    }
    
    // For vertical tabs, no scroll container
    return (
      <TabBar 
        $variant={variant} 
        $tabPosition={tabPosition}
        $size={size}
        role="tablist"
        aria-orientation={getAriaOrientation()}
      >
        {tabElements}
      </TabBar>
    );
  };
  
  return (
    <TabsContainer 
      className={className} 
      data-testid={testId}
      $tabPosition={tabPosition}
    >
      {renderTabs()}
      
      {tabs.map(tab => (
        <TabContent
          key={tab.id}
          $isActive={activeTabId === tab.id}
          $animated={animated}
          $tabPosition={tabPosition}
          role="tabpanel"
          aria-labelledby={`tab-${tab.id}`}
          id={`tab-panel-${tab.id}`}
          hidden={!animated && activeTabId !== tab.id}
          tabIndex={0}
        >
          {tab.content}
        </TabContent>
      ))}
    </TabsContainer>
  );
};

export default PremiumTabs; 