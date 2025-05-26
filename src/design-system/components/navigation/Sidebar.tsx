/**
 * Sidebar Component
 * 
 * A sidebar navigation component that follows sacred geometry principles
 * for spacing, transitions, and animations.
 */

import * as React from 'react';
import { useState } from 'react';
import styled, { DefaultTheme } from 'styled-components';

// Import sacred geometry constants
import { PHI, PHI_INVERSE } from '../../../constants/sacred-geometry';
import { getFibonacciByIndex } from '../../../utils/getFibonacciByIndex';

// Import components
import Link from './Link';
import { Box, Flex } from '../layout';
import { BotanicalElement } from '../botanical';
import { Text } from '../typography';
import { Button } from '../button';

// TypeScript interfaces
export interface SidebarItem {
  /** The item label */
  label: string;
  /** The item URL or path */
  path: string;
  /** Whether the item is active (current page) */
  isActive?: boolean;
  /** Optional icon to display */
  icon?: React.ReactNode;
  /** Optional subItems for nested navigation */
  subItems?: Array<{
    label: string;
    path: string;
    isActive?: boolean;
    icon?: React.ReactNode;
  }>;
}

export interface SidebarProps {
  /** Array of sidebar items */
  items: SidebarItem[];
  /** Title for the sidebar */
  title?: string;
  /** Whether to show botanical decorations */
  withBotanical?: boolean;
  /** The type of botanical decoration to show */
  botanicalVariant?: 'oliveBranch' | 'flowerOfLife' | 'vesicaPiscis' | 'fibonacciSpiral' | 'oliveLeaf' | 'smallFlourish';
  /** Background color variant */
  variant?: 'light' | 'dark' | 'primary' | 'secondary' | 'transparent';
  /** Whether the sidebar is collapsible */
  collapsible?: boolean;
  /** Initial collapsed state */
  initiallyCollapsed?: boolean;
  /** The width of the sidebar */
  width?: string | number;
  /** Maximum height of the sidebar */
  maxHeight?: string | number;
  /** Footer content */
  footer?: React.ReactNode;
  /** Additional className */
  className?: string;
  /** Test ID for testing */
  'data-testid'?: string;
}

/**
 * Sidebar Component
 * 
 * A sidebar navigation component that uses sacred geometry principles
 * for dimensions, spacing, and animations.
 */
const Sidebar: React.FC<SidebarProps> = ({
  items,
  title,
  withBotanical = true,
  botanicalVariant = 'oliveBranch',
  variant = 'light',
  collapsible = false,
  initiallyCollapsed = false,
  width = `${Math.round(getFibonacciByIndex(11) * PHI)}px`, // Golden ratio width
  maxHeight = '100%',
  footer,
  className,
  'data-testid': testId = 'sacred-sidebar',
}) => {
  // State for collapsed state
  const [isCollapsed, setIsCollapsed] = useState(initiallyCollapsed);
  
  // Toggle collapsed state
  const toggleCollapsed = () => {
    setIsCollapsed(!isCollapsed);
  };
  
  // Render the botanical decoration
  const renderBotanical = () => {
    switch (botanicalVariant) {
      case 'oliveBranch':
        return (
          <BotanicalElement
            variant="oliveBranch"
            size="md"
            opacity={0.1}
            colorScheme="primary"
            decorative
          />
        );
      case 'flowerOfLife':
        return (
          <BotanicalElement
            variant="flowerOfLife"
            size="md"
            opacity={0.05}
            colorScheme="primary"
            decorative
          />
        );
      case 'vesicaPiscis':
      case 'smallFlourish':
      default:
        return (
          <BotanicalElement
            variant="smallFlourish"
            size="md"
            opacity={0.1}
            colorScheme="primary"
            decorative
          />
        );
    }
  };
  
  return (
    <Container
      className={className}
      data-testid={testId}
      $variant={variant}
      $width={isCollapsed ? `${getFibonacciByIndex(9)}px` : width} // Collapse to a smaller width
      $maxHeight={maxHeight}
    >
      {/* Header with title and collapse toggle */}
      {(title || collapsible) && (
        <Header>
          {!isCollapsed && title && <Title>{title}</Title>}
          
          {collapsible && (
            <CollapseButton 
              onClick={toggleCollapsed}
              aria-expanded={!isCollapsed}
              title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              <CollapseIcon $isCollapsed={isCollapsed}>
                {isCollapsed ? '→' : '←'}
              </CollapseIcon>
            </CollapseButton>
          )}
        </Header>
      )}
      
      {/* Navigation items */}
      <NavItems $isCollapsed={isCollapsed}>
        {items.map((item, index) => (
          <NavItemContainer key={`nav-${index}`}>
            <NavItem
              $isActive={item.isActive || false}
              $hasSubItems={!!item.subItems?.length}
              $isCollapsed={isCollapsed}
              href={item.path}
            >
              {item.icon && <ItemIcon>{item.icon}</ItemIcon>}
              {!isCollapsed && <ItemLabel>{item.label}</ItemLabel>}
            </NavItem>
            
            {/* Subitems */}
            {!isCollapsed && item.subItems && item.subItems.length > 0 && (
              <SubItemsContainer>
                {item.subItems.map((subItem, subIndex) => (
                  <SubItem
                    key={`subnav-${index}-${subIndex}`}
                    $isActive={subItem.isActive || false}
                    href={subItem.path}
                  >
                    {subItem.icon && <SubItemIcon>{subItem.icon}</SubItemIcon>}
                    <SubItemLabel>{subItem.label}</SubItemLabel>
                  </SubItem>
                ))}
              </SubItemsContainer>
            )}
          </NavItemContainer>
        ))}
      </NavItems>
      
      {/* Footer content */}
      {!isCollapsed && footer && (
        <Footer>
          {footer}
        </Footer>
      )}
      
      {/* Botanical decoration */}
      {withBotanical && !isCollapsed && (
        <BotanicalContainer>
          {renderBotanical()}
        </BotanicalContainer>
      )}
    </Container>
  );
};

// Styled components
interface ContainerProps {
  $variant: string;
  $width: string | number;
  $maxHeight: string | number;
}

const Container = styled.aside<ContainerProps>`
  display: flex;
  flex-direction: column;
  width: ${({ $width }) => typeof $width === 'number' ? `${$width}px` : $width};
  max-height: ${({ $maxHeight }) => typeof $maxHeight === 'number' ? `${$maxHeight}px` : $maxHeight};
  background-color: ${({ theme, $variant }) => {
    switch ($variant) {
      case 'dark':
        return theme.colors.background[900] ?? 1;
      case 'primary':
        return theme.colors.primary[50] ?? 1;
      case 'secondary':
        return theme.colors.secondary[50] ?? 1;
      case 'transparent':
        return 'transparent';
      case 'light':
      default:
        return theme.colors.background[50] ?? 1;
    }
  }};
  color: ${({ theme, $variant }) => {
    switch ($variant) {
      case 'dark':
        return theme.colors.text.light;
      case 'primary':
      case 'secondary':
      case 'transparent':
      case 'light':
      default:
        return theme.colors.text.primary;
    }
  }};
  border-right: 1px solid ${props => props.theme.colors.background[200] ?? 1};
  padding: ${getFibonacciByIndex(6)}px; // 8px
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
  transition: width 0.3s cubic-bezier(${PHI_INVERSE}, 0, ${1 - PHI_INVERSE}, 1);
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: ${getFibonacciByIndex(7)}px; // 13px
  margin-bottom: ${getFibonacciByIndex(6)}px; // 8px
  border-bottom: 1px solid ${props => props.theme.colors.background[200] ?? 1};
`;

const Title = styled.h3`
  font-size: ${getFibonacciByIndex(7)}px; // 13px
  font-weight: ${props => props.theme.typography.fontWeight.semiBold};
  margin: 0;
`;

const CollapseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: ${getFibonacciByIndex(4)}px; // 3px
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background-color: ${props => props.theme.colors.background[100] ?? 1};
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 ${getFibonacciByIndex(3)}px ${props => props.theme.colors.primary[300] ?? 1};
  }
`;

interface CollapseIconProps {
  $isCollapsed: boolean;
}

const CollapseIcon = styled.span<CollapseIconProps>`
  display: inline-flex;
  transition: transform 0.3s cubic-bezier(${PHI_INVERSE}, 0, ${1 - PHI_INVERSE}, 1);
  transform: ${({ $isCollapsed }) => $isCollapsed ? 'rotate(0)' : 'rotate(0)'};
  font-size: ${getFibonacciByIndex(6)}px; // 8px
`;

interface NavItemsProps {
  $isCollapsed: boolean;
}

const NavItems = styled.div<NavItemsProps>`
  display: flex;
  flex-direction: column;
  padding-right: ${({ $isCollapsed }) => $isCollapsed ? '0' : `${getFibonacciByIndex(5)}px`}; // 5px
  margin-bottom: ${getFibonacciByIndex(8)}px; // 21px
`;

const NavItemContainer = styled.div`
  margin-bottom: ${getFibonacciByIndex(5)}px; // 5px
`;

interface NavItemProps {
  $isActive: boolean;
  $hasSubItems: boolean;
  $isCollapsed: boolean;
}

const NavItem = styled(Link)<NavItemProps>`
  display: flex;
  align-items: center;
  padding: ${getFibonacciByIndex(5)}px; // 5px
  border-radius: ${getFibonacciByIndex(5)}px; // 5px
  color: ${({ theme, $isActive }) => $isActive ? theme.colors.primary[700] ?? 1 : theme.colors.text.primary};
  background-color: ${({ theme, $isActive }) => $isActive ? theme.colors.primary[50] ?? 1 : 'transparent'};
  font-weight: ${({ $isActive, theme }) => $isActive ? theme.typography.fontWeight.semiBold : theme.typography.fontWeight.regular};
  text-decoration: none;
  position: relative;
  transition: all 0.2s cubic-bezier(${PHI_INVERSE}, 0, ${1 - PHI_INVERSE}, 1);
  
  &:hover {
    background-color: ${props => props.theme.colors.background[100] ?? 1};
    color: ${props => props.theme.colors.primary[600] ?? 1};
  }
  
  /* Right arrow for items with subitems */
  ${({ $hasSubItems, $isCollapsed }) => !$isCollapsed && $hasSubItems && `
    &:after {
      content: '→';
      position: absolute;
      right: ${getFibonacciByIndex(5)}px; // 5px
      opacity: 0.5;
    }
  `}
  
  /* Add focus style */
  &:focus {
    outline: none;
    box-shadow: 0 0 0 ${getFibonacciByIndex(3)}px ${props => props.theme.colors.primary[300] ?? 1};
  }
  
  /* Different justify-content when collapsed */
  justify-content: ${({ $isCollapsed }) => $isCollapsed ? 'center' : 'flex-start'};
`;

const ItemIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: ${getFibonacciByIndex(5)}px; // 5px
  font-size: ${getFibonacciByIndex(6) * PHI}px; // Golden ratio enhanced
`;

const ItemLabel = styled.span`
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SubItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: ${getFibonacciByIndex(8)}px; // 21px
  margin-top: ${getFibonacciByIndex(4)}px; // 3px
`;

interface SubItemProps {
  $isActive: boolean;
}

const SubItem = styled(Link)<SubItemProps>`
  display: flex;
  align-items: center;
  padding: ${getFibonacciByIndex(4)}px ${getFibonacciByIndex(5)}px; // 3px 5px
  color: ${({ theme, $isActive }) => $isActive ? theme.colors.primary[600] ?? 1 : theme.colors.text.secondary};
  font-weight: ${({ $isActive, theme }) => $isActive ? theme.typography.fontWeight.medium : theme.typography.fontWeight.regular};
  font-size: ${getFibonacciByIndex(6) * PHI_INVERSE}px; // Golden ratio based size
  text-decoration: none;
  border-radius: ${getFibonacciByIndex(4)}px; // 3px
  transition: all 0.2s cubic-bezier(${PHI_INVERSE}, 0, ${1 - PHI_INVERSE}, 1);
  
  &:hover {
    background-color: ${props => props.theme.colors.background[50] ?? 1};
    color: ${props => props.theme.colors.primary[600] ?? 1};
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 ${getFibonacciByIndex(2)}px ${props => props.theme.colors.primary[300] ?? 1};
  }
  
  /* Left border for active state */
  ${({ $isActive, theme }) => $isActive && `
    border-left: ${getFibonacciByIndex(3)}px solid ${theme.colors.primary[300] ?? 1};
    padding-left: ${getFibonacciByIndex(4)}px;
  `}
`;

const SubItemIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: ${getFibonacciByIndex(4)}px; // 3px
  font-size: ${getFibonacciByIndex(5)}px; // 5px
  opacity: 0.7;
`;

const SubItemLabel = styled.span`
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Footer = styled.div`
  padding-top: ${getFibonacciByIndex(6)}px; // 8px
  margin-top: auto;
  border-top: 1px solid ${props => props.theme.colors.background[200] ?? 1};
`;

const BotanicalContainer = styled.div`
  position: absolute;
  bottom: ${getFibonacciByIndex(5)}px; // 5px
  right: ${getFibonacciByIndex(5)}px; // 5px
  z-index: 0;
  opacity: 0.1;
  pointer-events: none;
`;

export default Sidebar; 







