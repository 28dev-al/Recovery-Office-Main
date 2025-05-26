// TODO: This file contains direct window access without SSR checks
import * as React from 'react';
import { useState, useEffect } from 'react';;
import styled, { DefaultTheme } from 'styled-components';

// Import sacred geometry constants
import { PHI, PHI_INVERSE, getFibonacciByIndex } from '../../../constants/sacred-geometry';

// Import components
import NavigationItem from './NavigationItem';
import { Box, Flex } from '../layout';
import { BotanicalElement } from '../botanical';

// TypeScript interfaces
export interface NavBarItem {
  /** The navigation item's label */
  label: string;
  /** The navigation item's URL */
  href: string;
  /** Whether the item is active (current page) */
  isActive?: boolean;
  /** Whether it's a primary action */
  isPrimary?: boolean;
  /** Optional icon to display */
  icon?: React.ReactNode;
  /** Optional subItems for dropdown menus */
  subItems?: Array<{
    label: string;
    href: string;
    isActive?: boolean;
  }>;
}

export interface NavBarCTA {
  /** The CTA label */
  label: string;
  /** The CTA URL */
  href: string;
  /** Whether it's a primary CTA */
  isPrimary?: boolean;
  /** Optional icon to display */
  icon?: React.ReactNode;
}

export interface NavBarProps {
  /** Array of navigation items */
  items: NavBarItem[];
  /** Logo component to display */
  logo: React.ReactNode;
  /** Optional array of CTA buttons */
  ctas?: NavBarCTA[];
  /** Whether the navbar is transparent (for hero sections) */
  isTransparent?: boolean;
  /** Whether to display botanical accents */
  showBotanical?: boolean;
  /** Whether to display regulatory badges */
  showRegulatoryBadges?: boolean;
  /** The regulatory badges to display */
  regulatoryBadges?: React.ReactNode;
  /** Whether to enable mobile menu */
  mobileEnabled?: boolean;
  /** The mobile breakpoint in pixels */
  mobileBreakpoint?: number;
  /** Additional className */
  className?: string;
  /** Whether the navbar is for desktop or not */
  isDesktop?: boolean;
  /** Test ID for testing */
  'data-testid'?: string;
}

/**
 * NavBar Component
 * 
 * A navigation bar component that follows sacred geometry principles
 * for spacing, proportions, and animations.
 */
const NavBar: React.FC<NavBarProps> = ({
  items,
  logo,
  ctas = [],
  isTransparent = false,
  showBotanical = false,
  showRegulatoryBadges = false,
  regulatoryBadges,
  mobileEnabled = true,
  mobileBreakpoint = 768,
  className,
  isDesktop = true,
  'data-testid': testId = 'sacred-navbar',
}) => {
  // Mobile menu state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < mobileBreakpoint);
    };
    
    // Set initial state
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [mobileBreakpoint]);
  
  // Close mobile menu when resizing to desktop
  useEffect(() => {
    if (!isMobile && isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  }, [isMobile, isMobileMenuOpen]);
  
  return (
    <Container 
      className={className} 
      data-testid={testId}
      $isTransparent={isTransparent}
    >
      <NavContainer>
        {/* Logo */}
        <LogoContainer>
          {logo}
          
          {/* Botanical accent for logo */}
          {showBotanical && (
            <BotanicalAccent>
              <BotanicalElement
                variant="smallFlourish"
                size="xs"
                opacity={0.15}
                colorScheme="primary"
              />
            </BotanicalAccent>
          )}
        </LogoContainer>
        
        {/* Desktop navigation */}
        {isDesktop && !isMobile && (
          <DesktopNav $isTransparent={isTransparent}>
            {/* Navigation items */}
            <NavItems>
              {items.map((item, index) => (
                <NavigationItem
                  key={`nav-item-${index}`}
                  label={item.label}
                  href={item.href}
                  isActive={item.isActive}
                  isPrimary={item.isPrimary}
                  icon={item.icon}
                  subItems={item.subItems}
                />
              ))}
            </NavItems>
            
            {/* CTAs */}
            {ctas.length > 0 && (
              <CTAContainer>
                {ctas.map((cta, index) => (
                  <NavigationItem
                    key={`cta-${index}`}
                    label={cta.label}
                    href={cta.href}
                    isPrimary={cta.isPrimary}
                    isButton={true}
                    icon={cta.icon}
                  />
                ))}
              </CTAContainer>
            )}
          </DesktopNav>
        )}
        
        {/* Mobile menu toggle */}
        {mobileEnabled && isMobile && (
          <MobileMenuToggle 
            onClick={toggleMobileMenu}
            $isOpen={isMobileMenuOpen}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            <ToggleBar $isOpen={isMobileMenuOpen} $index={1} />
            <ToggleBar $isOpen={isMobileMenuOpen} $index={2} />
            <ToggleBar $isOpen={isMobileMenuOpen} $index={3} />
          </MobileMenuToggle>
        )}
      </NavContainer>
      
      {/* Regulatory badges */}
      {showRegulatoryBadges && (
        <RegulatoryBadgeContainer>
          {regulatoryBadges}
        </RegulatoryBadgeContainer>
      )}
      
      {/* Mobile menu */}
      {mobileEnabled && isMobile && (
        <MobileMenu 
          $isOpen={isMobileMenuOpen}
          $isTransparent={isTransparent}
        >
          {/* Mobile navigation items */}
          <MobileNavItems>
            {items.map((item, index) => (
              <MobileNavItem key={`mobile-nav-item-${index}`}>
                <NavigationItem
                  label={item.label}
                  href={item.href}
                  isActive={item.isActive}
                  isPrimary={false}
                  icon={item.icon}
                  subItems={item.subItems}
                  onClick={() => setIsMobileMenuOpen(false)}
                />
              </MobileNavItem>
            ))}
            
            {/* Mobile CTAs */}
            {ctas.length > 0 && (
              <MobileCTAContainer>
                {ctas.map((cta, index) => (
                  <MobileNavItem key={`mobile-cta-${index}`}>
                    <NavigationItem
                      label={cta.label}
                      href={cta.href}
                      isPrimary={cta.isPrimary}
                      isButton={true}
                      icon={cta.icon}
                      onClick={() => setIsMobileMenuOpen(false)}
                    />
                  </MobileNavItem>
                ))}
              </MobileCTAContainer>
            )}
          </MobileNavItems>
          
          {/* Mobile botanical accent */}
          {showBotanical && (
            <MobileBotanicalAccent>
              <BotanicalElement
                variant="flowerOfLife"
                size="md"
                opacity={0.05}
                colorScheme="primary"
              />
            </MobileBotanicalAccent>
          )}
        </MobileMenu>
      )}
    </Container>
  );
};

// Styled components
interface ContainerProps {
  $isTransparent: boolean;
}

const Container = styled.header<ContainerProps>`
  position: relative;
  width: 100%;
  background-color: ${({ theme, $isTransparent }) => 
    $isTransparent ? 'transparent' : theme.colors.background[50] ?? 1
  };
  box-shadow: ${({ theme, $isTransparent }) => 
    $isTransparent ? 'none' : theme.shadows.sm
  };
  z-index: 100;
`;

const NavContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${getFibonacciByIndex(10)}px; /* 55px */
  padding: 0 ${getFibonacciByIndex(7)}px; /* 0 13px */
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  
  @media (min-width: 992px) {
    padding: 0 ${getFibonacciByIndex(8)}px; /* 0 21px */
    height: ${getFibonacciByIndex(11)}px; /* 89px */
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  height: 100%;
  z-index: 1;
`;

const BotanicalAccent = styled.div`
  position: absolute;
  bottom: ${-getFibonacciByIndex(5)}px;
  left: ${-getFibonacciByIndex(5)}px;
  transform: rotate(${-45 * PHI_INVERSE}deg);
  z-index: -1;
`;

interface DesktopNavProps {
  $isTransparent: boolean;
}

const DesktopNav = styled.nav<DesktopNavProps>`
  display: flex;
  align-items: center;
`;

const NavItems = styled.div`
  display: flex;
  align-items: center;
  margin-right: ${getFibonacciByIndex(7)}px; /* 13px */
`;

const CTAContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: ${getFibonacciByIndex(5)}px; /* 5px */
  
  & > * + * {
    margin-left: ${getFibonacciByIndex(5)}px; /* 5px */
  }
`;

const RegulatoryBadgeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 0;
  right: ${getFibonacciByIndex(8)}px; /* 21px */
  transform: translateY(50%);
`;

interface MobileMenuToggleProps {
  $isOpen: boolean;
}

const MobileMenuToggle = styled.button<MobileMenuToggleProps>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: ${getFibonacciByIndex(8)}px; /* 21px */
  height: ${getFibonacciByIndex(7)}px; /* 13px */
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 110;
`;

interface ToggleBarProps {
  $isOpen: boolean;
  $index: number;
}

const ToggleBar = styled.span<ToggleBarProps>`
  width: 100%;
  height: ${getFibonacciByIndex(3)}px; /* 2px */
  background-color: ${props => props.theme.colors.text.primary};
  border-radius: ${getFibonacciByIndex(2)}px; /* 1px */
  transition: all 0.3s cubic-bezier(${PHI_INVERSE}, 0, ${1 - PHI_INVERSE}, 1);
  
  /* Transform based on open state */
  ${({ $isOpen, $index }) => {
    if ($isOpen) {
      if ($index === 1) {
        return `
          transform: translateY(${getFibonacciByIndex(5)}px) rotate(45deg);
        `;
      }
      if ($index === 2) {
        return `
          opacity: 0;
        `;
      }
      if ($index === 3) {
        return `
          transform: translateY(-${getFibonacciByIndex(5)}px) rotate(-45deg);
        `;
      }
    }
    return '';
  }}
`;

interface MobileMenuProps {
  $isOpen: boolean;
  $isTransparent: boolean;
}

const MobileMenu = styled.div<MobileMenuProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: ${props => props.theme.colors.background[50] ?? 1};
  z-index: 100;
  padding-top: ${getFibonacciByIndex(11)}px; /* 89px */
  overflow-y: auto;
  opacity: ${({ $isOpen }) => $isOpen ? 1 : 0};
  visibility: ${({ $isOpen }) => $isOpen ? 'visible' : 'hidden'};
  transform: translateY(${({ $isOpen }) => $isOpen ? 0 : `-${getFibonacciByIndex(7)}px`});
  transition: all 0.3s cubic-bezier(${PHI_INVERSE}, 0, ${1 - PHI_INVERSE}, 1);
`;

const MobileNavItems = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${getFibonacciByIndex(8)}px ${getFibonacciByIndex(7)}px; /* 21px 13px */
`;

const MobileNavItem = styled.div`
  margin-bottom: ${getFibonacciByIndex(7)}px; /* 13px */
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const MobileCTAContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${getFibonacciByIndex(8)}px; /* 21px */
  padding-top: ${getFibonacciByIndex(7)}px; /* 13px */
  border-top: 1px solid ${props => props.theme.colors.background[200] ?? 1};
`;

const MobileBotanicalAccent = styled.div`
  position: absolute;
  bottom: ${getFibonacciByIndex(7)}px; /* 13px */
  right: ${getFibonacciByIndex(7)}px; /* 13px */
  opacity: 0.1;
  transform: rotate(${45 * PHI_INVERSE}deg);
  pointer-events: none;
`;

export default NavBar; 









