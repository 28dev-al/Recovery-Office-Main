import React, { useState, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { Container } from '../../../design-system/components/layout/Container';
import { RecoveryOfficeLogo } from '../../branding';

// --- TopBar for regulatory info ---
const TopBar = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.colors.primary[800]};
  color: ${({ theme }) => theme.colors.accent.gold};
  font-size: 0.95rem;
  padding: 6px 0;
  text-align: center;
  letter-spacing: 0.01em;
  font-weight: 500;
`;

// --- Main Navbar ---
const NavbarWrapper = styled.header<{ $scrolled: boolean }>`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1200;
  background: ${({ $scrolled }) =>
    $scrolled
      ? css`rgba(10, 33, 79, 0.98)`
      : css`rgba(10, 33, 79, 0.92)`};
  box-shadow: ${({ $scrolled }) =>
    $scrolled ? '0 4px 24px rgba(0,0,0,0.10)' : 'none'};
  backdrop-filter: ${({ $scrolled }) =>
    $scrolled ? 'blur(10px)' : 'blur(6px)'};
  transition: all 0.25s cubic-bezier(.4,0,.2,1);
`;

const NavInner = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 72px;
  padding-top: 0;
  padding-bottom: 0;
`;

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  padding: 0 8px 0 0;
  min-width: 140px;
  text-decoration: none;
  transition: filter 0.2s;
  &:hover img {
    filter: drop-shadow(0 2px 8px #D4AF37aa) brightness(1.1);
    transform: scale(1.04) rotate(-2deg);
  }
`;

const NavLinks = styled.nav<{ $open?: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  @media (max-width: 900px) {
    display: none;
  }
`;

const NavLinkStyled = styled(Link)<{ $active?: boolean }>`
  color: ${({ theme }) => theme.colors.white};
  font-size: 1.08rem;
  font-weight: 500;
  padding: 8px 18px;
  border-radius: 6px;
  text-decoration: none;
  position: relative;
  background: none;
  transition: color 0.18s, background 0.18s;
  outline: none;
  border: none;
  ${({ $active, theme }) =>
    $active &&
    css`
      color: ${theme.colors.accent.gold};
      background: rgba(212, 175, 55, 0.08);
    `}
  &:hover, &:focus {
    color: ${({ theme }) => theme.colors.accent.gold};
    background: rgba(212, 175, 55, 0.10);
    text-decoration: underline;
  }
`;

// --- Dropdown ---
const DropdownWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const DropdownToggle = styled.button<{ $open: boolean }>`
  color: ${({ theme }) => theme.colors.white};
  font-size: 1.08rem;
  font-weight: 500;
  padding: 8px 18px;
  border-radius: 6px;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  outline: none;
  transition: color 0.18s, background 0.18s;
  ${({ $open, theme }) =>
    $open &&
    css`
      color: ${theme.colors.accent.gold};
      background: rgba(212, 175, 55, 0.10);
    `}
  &:hover, &:focus {
    color: ${({ theme }) => theme.colors.accent.gold};
    background: rgba(212, 175, 55, 0.10);
    text-decoration: underline;
  }
`;

const DropdownMenu = styled.div<{ $open: boolean }>`
  position: absolute;
  top: 110%;
  left: 0;
  min-width: 320px;
  background: ${({ theme }) => theme.colors.background[50]};
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(10,33,79,0.13), 0 1.5px 0 #D4AF37;
  padding: 16px 0;
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  pointer-events: ${({ $open }) => ($open ? 'auto' : 'none')};
  transform: translateY(${({ $open }) => ($open ? '0' : '10px')});
  transition: opacity 0.18s, transform 0.18s;
  z-index: 100;
`;

const DropdownItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 28px;
  color: ${({ theme }) => theme.colors.primary[700]};
  font-size: 1.08rem;
  font-weight: 500;
  text-decoration: none;
  background: none;
  border: none;
  transition: background 0.15s, color 0.15s;
  outline: none;
  &:hover, &:focus {
    background: ${({ theme }) => theme.colors.background[100]};
    color: ${({ theme }) => theme.colors.accent.gold};
    text-decoration: underline;
  }
`;

const DropdownIcon = styled.img`
  width: 32px;
  height: 32px;
  margin-right: 12px;
  object-fit: contain;
  vertical-align: middle;
`;

// --- Book Consultation Button ---
const BookButton = styled(Link)`
  background: ${({ theme }) => theme.colors.accent.gold};
  color: ${({ theme }) => theme.colors.primary[900]};
  font-weight: 700;
  font-size: 1.08rem;
  padding: 10px 28px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(212,175,55,0.10);
  margin-left: 18px;
  text-decoration: none;
  transition: background 0.18s, color 0.18s, box-shadow 0.18s;
  outline: none;
  border: none;
  position: relative;
  overflow: hidden;
  &:hover, &:focus {
    background: linear-gradient(90deg, #D4AF37 80%, #F8F7F0 100%);
    color: #333333;
    box-shadow: 0 4px 24px rgba(212,175,55,0.18);
  }
`;

// --- Hamburger & Mobile Drawer ---
const Hamburger = styled.button`
  display: none;
  @media (max-width: 900px) {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    background: none;
    border: none;
    color: ${({ theme }) => theme.colors.white};
    font-size: 2rem;
    margin-left: 8px;
    cursor: pointer;
    outline: none;
  }
`;

const MobileDrawer = styled.div<{ $open: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  width: 320px;
  height: 100vh;
  background: ${({ theme }) => theme.colors.primary[900]};
  box-shadow: -4px 0 24px rgba(10,33,79,0.18);
  z-index: 2000;
  transform: translateX(${({ $open }) => ($open ? '0' : '100%')});
  transition: transform 0.22s cubic-bezier(.4,0,.2,1);
  display: flex;
  flex-direction: column;
  padding: 32px 0 0 0;
`;

const MobileNavLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-top: 32px;
`;

const MobileDropdown = styled.div`
  display: flex;
  flex-direction: column;
`;

const MobileDropdownToggle = styled.button<{ $open: boolean }>`
  color: ${({ theme }) => theme.colors.white};
  font-size: 1.08rem;
  font-weight: 500;
  padding: 14px 28px;
  background: none;
  border: none;
  text-align: left;
  display: flex;
  align-items: center;
  gap: 8px;
  outline: none;
  cursor: pointer;
  ${({ $open, theme }) =>
    $open &&
    css`
      color: ${theme.colors.accent.gold};
      background: rgba(212, 175, 55, 0.10);
    `}
`;

const MobileDropdownMenu = styled.div<{ $open: boolean }>`
  display: ${({ $open }) => ($open ? 'flex' : 'none')};
  flex-direction: column;
  background: ${({ theme }) => theme.colors.background[100]};
  border-radius: 0 0 12px 12px;
  box-shadow: 0 4px 16px rgba(10,33,79,0.10);
  margin: 0 0 8px 0;
`;

const MobileDropdownItem = styled(Link)`
  color: ${({ theme }) => theme.colors.primary[700]};
  font-size: 1.08rem;
  font-weight: 500;
  padding: 14px 36px;
  text-decoration: none;
  background: none;
  border: none;
  outline: none;
  &:hover, &:focus {
    background: ${({ theme }) => theme.colors.background[200]};
    color: ${({ theme }) => theme.colors.accent.gold};
    text-decoration: underline;
  }
`;

const MobileBookButton = styled(BookButton)`
  margin: 32px 24px 0 24px;
  font-size: 1.15rem;
  padding: 16px 0;
  text-align: center;
`;

// --- Data ---
const RECOVERY_DROPDOWN = [
  {
    label: 'Investment Fraud Recovery',
    to: '/services#investment-fraud',
    icon: 'https://images2.imgbox.com/76/6d/BSPbxZsR_o.png',
    alt: 'Investment Fraud Recovery Icon'
  },
  {
    label: 'Cryptocurrency Recovery',
    to: '/services#crypto-recovery',
    icon: 'https://images2.imgbox.com/ba/78/wNqfvrmO_o.png',
    alt: 'Cryptocurrency Recovery Icon'
  },
  {
    label: 'Financial Scam Recovery',
    to: '/services#financial-scams',
    icon: 'https://images2.imgbox.com/e7/0f/yfQ894Tl_o.png',
    alt: 'Financial Scam Recovery Icon'
  },
  {
    label: 'Regulatory Complaint Assistance',
    to: '/services#regulatory-assistance',
    icon: 'https://images2.imgbox.com/f2/e9/tDfdd3sR_o.png',
    alt: 'Regulatory Complaint Assistance Icon'
  },
];

// --- Main Component ---
export const PremiumNavbar: React.FC = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Scroll effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    if (!dropdownOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [dropdownOpen]);

  // Keyboard accessibility for dropdown
  const handleDropdownKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') setDropdownOpen(false);
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const first = dropdownRef.current?.querySelector('a');
      (first as HTMLElement)?.focus();
    }
  };

  // Keyboard accessibility for mobile dropdown
  const handleMobileDropdownKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') setMobileDropdownOpen(false);
  };

  // --- Render ---
  return (
    <>
      {/* TopBar (optional, can be toggled off) */}
      <TopBar>
        FCA Regulated • Firm Reference: 836358 • Emergency: <a href="tel:+447451263372" style={{ color: '#D4AF37', textDecoration: 'underline' }}>+44 7451 263372</a>
      </TopBar>
      <NavbarWrapper $scrolled={scrolled}>
        <NavInner>
          {/* Logo */}
          <LogoLink to="/" aria-label="Recovery Office - Financial Asset Recovery">
            <RecoveryOfficeLogo variant="white" size="medium" showText={true} />
          </LogoLink>

          {/* Desktop Nav */}
          <NavLinks>
            <NavLinkStyled to="/services" $active={location.pathname.startsWith('/services')}>Services</NavLinkStyled>
            <DropdownWrapper ref={dropdownRef}>
              <DropdownToggle
                $open={dropdownOpen}
                aria-haspopup="true"
                aria-expanded={dropdownOpen}
                aria-controls="recovery-dropdown"
                onClick={() => setDropdownOpen((v) => !v)}
                onKeyDown={handleDropdownKey}
              >
                Recovery Process
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: 4 }}>
                  <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </DropdownToggle>
              <DropdownMenu $open={dropdownOpen} id="recovery-dropdown">
                {RECOVERY_DROPDOWN.map((item) => (
                  <DropdownItem
                    to={item.to}
                    key={item.label}
                    tabIndex={dropdownOpen ? 0 : -1}
                    role="menuitem"
                  >
                    <DropdownIcon 
                      src={item.icon} 
                      alt={item.alt} 
                      width="32" 
                      height="32" 
                      aria-hidden="true" 
                    />
                    {item.label}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </DropdownWrapper>
            <NavLinkStyled to="/about" $active={location.pathname.startsWith('/about')}>About</NavLinkStyled>
            <NavLinkStyled to="/contact" $active={location.pathname.startsWith('/contact')}>Contact</NavLinkStyled>
          </NavLinks>

          {/* Book Consultation CTA */}
          <BookButton to="/booking" tabIndex={0} aria-label="Book a Consultation">
            Book Consultation
          </BookButton>

          {/* Hamburger for mobile */}
          <Hamburger
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-drawer"
            onClick={() => setMobileOpen((v) => !v)}
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect y="7" width="32" height="3.5" rx="1.75" fill="currentColor" />
              <rect y="14" width="32" height="3.5" rx="1.75" fill="currentColor" />
              <rect y="21" width="32" height="3.5" rx="1.75" fill="currentColor" />
            </svg>
          </Hamburger>
        </NavInner>

        {/* Mobile Drawer */}
        <MobileDrawer $open={mobileOpen} id="mobile-drawer" aria-hidden={!mobileOpen}>
          <LogoLink to="/" aria-label="Recovery Office - Financial Asset Recovery" style={{ margin: '0 0 0 24px' }}>
            <RecoveryOfficeLogo variant="white" size="small" showText={false} />
          </LogoLink>
          <MobileNavLinks>
            <NavLinkStyled to="/services" $active={location.pathname.startsWith('/services')} onClick={() => setMobileOpen(false)}>
              Services
            </NavLinkStyled>
            <MobileDropdown>
              <MobileDropdownToggle
                $open={mobileDropdownOpen}
                aria-haspopup="true"
                aria-expanded={mobileDropdownOpen}
                aria-controls="mobile-recovery-dropdown"
                onClick={() => setMobileDropdownOpen((v) => !v)}
                onKeyDown={handleMobileDropdownKey}
              >
                Recovery Process
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: 4 }}>
                  <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </MobileDropdownToggle>
              <MobileDropdownMenu $open={mobileDropdownOpen} id="mobile-recovery-dropdown">
                {RECOVERY_DROPDOWN.map((item) => (
                  <MobileDropdownItem
                    to={item.to}
                    key={item.label}
                    tabIndex={mobileDropdownOpen ? 0 : -1}
                    onClick={() => setMobileOpen(false)}
                  >
                    <DropdownIcon 
                      src={item.icon} 
                      alt={item.alt} 
                      width="32" 
                      height="32" 
                    />
                    {item.label}
                  </MobileDropdownItem>
                ))}
              </MobileDropdownMenu>
            </MobileDropdown>
            <NavLinkStyled to="/about" $active={location.pathname.startsWith('/about')} onClick={() => setMobileOpen(false)}>
              About
            </NavLinkStyled>
            <NavLinkStyled to="/contact" $active={location.pathname.startsWith('/contact')} onClick={() => setMobileOpen(false)}>
              Contact
            </NavLinkStyled>
          </MobileNavLinks>
          <MobileBookButton to="/booking" tabIndex={0} aria-label="Book a Consultation" onClick={() => setMobileOpen(false)}>
            Book Consultation
          </MobileBookButton>
        </MobileDrawer>
      </NavbarWrapper>
    </>
  );
};

export default PremiumNavbar; 