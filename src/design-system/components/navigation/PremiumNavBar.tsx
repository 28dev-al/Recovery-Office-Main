import * as React from 'react';
import { useState, useEffect } from 'react';
import styled, { DefaultTheme, css } from 'styled-components';

// Import sacred geometry constants
import { PHI, PHI_INVERSE, getFibonacciByIndex } from '../../../constants/sacred-geometry';

// Import components
import NavigationItem from './NavigationItem';
import { Box, Flex } from '../layout';
import { BotanicalElement } from '../botanical';
import { Button } from '../button/Button';

// TypeScript interfaces
export interface PremiumNavBarItem {
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
    icon?: React.ReactNode;
  }>;
}

export interface PremiumNavBarCTA {
  /** The CTA label */
  label: string;
  /** The CTA URL */
  href: string;
  /** Whether it's a primary CTA */
  isPrimary?: boolean;
  /** Button variant */
  variant?: 'filled' | 'outlined' | 'text';
  /** Optional icon to display */
  icon?: React.ReactNode;
}

export interface PremiumNavBarProps {
  /** Array of navigation items */
  items: PremiumNavBarItem[];
  /** Logo component to display */
  logo: React.ReactNode;
  /** Optional array of CTA buttons */
  ctas?: PremiumNavBarCTA[];
  /** Whether the navbar is transparent (for hero sections) */
  isTransparent?: boolean;
  /** Whether to display botanical accents */
  showBotanical?: boolean;
  /** Whether to enable mobile menu */
  mobileEnabled?: boolean;
  /** The mobile breakpoint in pixels */
  mobileBreakpoint?: number;
  /** Whether to use sticky positioning */
  isSticky?: boolean;
  /** Whether to animate on scroll */
  animateOnScroll?: boolean;
  /** Whether to show login/account button */
  showLoginButton?: boolean;
  /** Login button text */
  loginButtonText?: string;
  /** Login button URL */
  loginButtonUrl?: string;
  /** Additional className */
  className?: string;
  /** Whether the navbar is for desktop or not */
  isDesktop?: boolean;
  /** Test ID for testing */
  'data-testid'?: string;
}

/**
 * PremiumNavBar Component
 * 
 * A navigation bar component designed for financial services with premium styling
 * based on sacred geometry principles for spacing, proportions, and animations.
 */
const PremiumNavBar: React.FC<PremiumNavBarProps> = ({
  items,
  logo,
  ctas = [],
  isTransparent = false,
  showBotanical = false,
  mobileEnabled = true,
  mobileBreakpoint = 992,
  isSticky = true,
  animateOnScroll = true,
  showLoginButton = true,
  loginButtonText = "Login",
  loginButtonUrl = "/login",
  className,
  isDesktop = true,
  'data-testid': testId = 'premium-navbar',
}) => {
  // Mobile menu state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
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
  
  // Handle scroll animation
  useEffect(() => {
    if (!animateOnScroll) return;
    
    const handleScroll = () => {
      const isScrolled = window.scrollY > 30;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled, animateOnScroll]);
  
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
      $isTransparent={isTransparent && !scrolled}
      $isSticky={isSticky}
      $scrolled={scrolled}
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
                opacity={0.08}
                colorScheme="primary"
              />
            </BotanicalAccent>
          )}
        </LogoContainer>
        
        {/* Desktop navigation */}
        {isDesktop && !isMobile && (
          <DesktopNav $isTransparent={isTransparent && !scrolled}>
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
            <CTAContainer>
              {showLoginButton && (
                <LoginButton href={loginButtonUrl}>
                  {loginButtonText}
                </LoginButton>
              )}
              
              {ctas.map((cta, index) => (
                <CTAButton 
                  key={`cta-${index}`}
                  href={cta.href}
                  $isPrimary={cta.isPrimary}
                  $variant={cta.variant || 'filled'}
                >
                  {cta.icon && <span className="cta-icon">{cta.icon}</span>}
                  {cta.label}
                </CTAButton>
              ))}
            </CTAContainer>
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
      
      {/* Mobile menu */}
      {mobileEnabled && isMobile && (
        <MobileMenu 
          $isOpen={isMobileMenuOpen}
          $isTransparent={isTransparent && !scrolled}
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
          </MobileNavItems>
          
          {/* Mobile CTAs */}
          <MobileCTAContainer>
            {showLoginButton && (
              <MobileNavItem>
                <MobileLoginButton href={loginButtonUrl}>
                  {loginButtonText}
                </MobileLoginButton>
              </MobileNavItem>
            )}
            
            {ctas.map((cta, index) => (
              <MobileNavItem key={`mobile-cta-${index}`}>
                <MobileCTAButton 
                  href={cta.href}
                  $isPrimary={cta.isPrimary}
                  $variant={cta.variant || 'filled'}
                >
                  {cta.icon && <span className="cta-icon">{cta.icon}</span>}
                  {cta.label}
                </MobileCTAButton>
              </MobileNavItem>
            ))}
          </MobileCTAContainer>
          
          {/* Mobile botanical accent */}
          {showBotanical && (
            <MobileBotanicalAccent>
              <BotanicalElement
                variant="oliveLeaf"
                size="md"
                opacity={0.04}
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
  $isSticky: boolean;
  $scrolled: boolean;
}

const Container = styled.header<ContainerProps>`
  position: ${props => props.$isSticky ? 'sticky' : 'relative'};
  top: 0;
  width: 100%;
  background-color: ${({ theme, $isTransparent }) => 
    $isTransparent ? 'transparent' : theme.colors.background.paper
  };
  box-shadow: ${({ theme, $isTransparent, $scrolled }) => 
    $isTransparent && !$scrolled ? 'none' : theme.shadows.sm
  };
  z-index: 1000;
  transition: all 0.3s cubic-bezier(${PHI_INVERSE}, 0, ${1 - PHI_INVERSE}, 1);
  
  ${props => props.$scrolled && css`
    background-color: ${props.theme.colors.background.paper};
    box-shadow: ${props.theme.shadows.md};
  `}
`;

const NavContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${getFibonacciByIndex(10)}px; /* 55px */
  padding: 0 ${getFibonacciByIndex(7)}px; /* 0 13px */
  max-width: 1440px;
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
  justify-content: space-between;
  flex-grow: 1;
  margin-left: ${getFibonacciByIndex(9)}px; /* 34px */
`;

const NavItems = styled.div`
  display: flex;
  align-items: center;
`;

const CTAContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${getFibonacciByIndex(5)}px; /* 5px */
`;

interface CTAButtonProps {
  $isPrimary?: boolean;
  $variant: 'filled' | 'outlined' | 'text';
}

const CTAButton = styled.a<CTAButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${getFibonacciByIndex(5) * 0.8}px ${getFibonacciByIndex(7)}px;
  border-radius: ${props => props.theme.radius.button}px;
  font-family: ${props => props.theme.typography.fontFamily.body};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  font-size: ${props => props.theme.typography.fontSize.sm}px;
  text-decoration: none;
  transition: all 0.2s cubic-bezier(${PHI_INVERSE}, 0, ${1 - PHI_INVERSE}, 1);
  cursor: pointer;
  
  .cta-icon {
    margin-right: ${getFibonacciByIndex(4)}px;
    display: flex;
    align-items: center;
  }
  
  ${props => {
    if (props.$variant === 'filled') {
      return css`
        background-color: ${props.$isPrimary 
          ? props.theme.colors.accent.gold 
          : props.theme.colors.primary[600]};
        color: ${props.theme.colors.white};
        border: none;
        
        &:hover {
          background-color: ${props.$isPrimary 
            ? props.theme.colors.accent.copper
            : props.theme.colors.primary[700]};
          transform: translateY(-1px);
        }
      `;
    } else if (props.$variant === 'outlined') {
      return css`
        background-color: transparent;
        color: ${props.$isPrimary 
          ? props.theme.colors.accent.gold 
          : props.theme.colors.primary[600]};
        border: 1px solid ${props.$isPrimary 
          ? props.theme.colors.accent.gold 
          : props.theme.colors.primary[600]};
        
        &:hover {
          background-color: ${props.$isPrimary 
            ? `rgba(${props.theme.colors.accent.gold}, 0.1)`
            : `rgba(${props.theme.colors.primary[600]}, 0.1)`};
          transform: translateY(-1px);
        }
      `;
    } else {
      return css`
        background-color: transparent;
        color: ${props.$isPrimary 
          ? props.theme.colors.accent.gold 
          : props.theme.colors.primary[600]};
        border: none;
        padding: ${getFibonacciByIndex(4)}px ${getFibonacciByIndex(6)}px;
        
        &:hover {
          background-color: ${props.$isPrimary 
            ? `rgba(${props.theme.colors.accent.gold}, 0.1)`
            : `rgba(${props.theme.colors.primary[600]}, 0.1)`};
        }
      `;
    }
  }}
`;

const LoginButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${getFibonacciByIndex(4)}px ${getFibonacciByIndex(6)}px;
  border-radius: ${props => props.theme.radius.button}px;
  font-family: ${props => props.theme.typography.fontFamily.body};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  font-size: ${props => props.theme.typography.fontSize.sm}px;
  text-decoration: none;
  color: ${props => props.theme.colors.primary[700]};
  border: none;
  background-color: transparent;
  transition: all 0.2s cubic-bezier(${PHI_INVERSE}, 0, ${1 - PHI_INVERSE}, 1);
  
  &:hover {
    color: ${props => props.theme.colors.primary[900]};
    background-color: rgba(0, 0, 0, 0.05);
  }
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
  z-index: 1100;
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
  background-color: ${props => props.theme.colors.background.paper};
  z-index: 1000;
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
  padding: ${getFibonacciByIndex(7)}px; /* 13px */
  border-top: 1px solid ${props => props.theme.colors.background[200]};
`;

const MobileBotanicalAccent = styled.div`
  position: absolute;
  bottom: ${getFibonacciByIndex(7)}px; /* 13px */
  right: ${getFibonacciByIndex(7)}px; /* 13px */
  opacity: 0.1;
  transform: rotate(${45 * PHI_INVERSE}deg);
  pointer-events: none;
`;

const MobileCTAButton = styled(CTAButton)`
  width: 100%;
  justify-content: center;
  margin-top: ${getFibonacciByIndex(5)}px;
`;

const MobileLoginButton = styled(LoginButton)`
  width: 100%;
  justify-content: center;
  border: 1px solid ${props => props.theme.colors.background[300]};
  margin-bottom: ${getFibonacciByIndex(5)}px;
`;

export default PremiumNavBar; 