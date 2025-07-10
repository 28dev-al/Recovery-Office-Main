import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PremiumNavBar from '../../design-system/components/navigation/PremiumNavBar';
import PremiumFooter from '../../design-system/components/footer/PremiumFooter';
import { RecoveryOfficeLogo } from '../branding';
import LanguageSwitcher from '../common/LanguageSwitcher';
import { COMPANY_PROFILE_CA } from '../../constants/companyProfile.ca';

interface PremiumLayoutProps {
  children: React.ReactNode;
}

export const PremiumLayout: React.FC<PremiumLayoutProps> = ({ children }) => {
  // Navigation items
  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { 
      label: 'Services', 
      href: '/services',
      subItems: [
        { label: 'Investment Fraud Recovery', href: '/services/investment-fraud-recovery' },
        { label: 'Cryptocurrency Recovery', href: '/services/cryptocurrency-recovery' },
        { label: 'Regulatory Assistance', href: '/services/regulatory-assistance' }
      ]
    },
    { label: 'FAQ', href: '/faq' },
    { label: 'Contact', href: '/contact' }
  ];

  // CTA buttons
  const ctas = [
    { label: 'Book Consultation', href: '/booking', isPrimary: true, variant: 'filled' as const }
  ];

  // Logo component wrapped in Link
  const logo = (
    <Link to="/" style={{ textDecoration: 'none' }}>
      <RecoveryOfficeLogo 
        size="medium" 
        variant="horizontal"
        showText={true}
        showCredentials={false}
      />
    </Link>
  );

  // Footer props
  const footerProps = {
    companyName: 'Recovery Office',
    companyInfo: {
      name: 'Recovery Office',
      description: 'Canada\'s premier financial asset recovery specialists',
      address: COMPANY_PROFILE_CA.address,
      email: COMPANY_PROFILE_CA.email,
      registrationNumber: COMPANY_PROFILE_CA.businessNumber,
      regulator: COMPANY_PROFILE_CA.regulatorPrimary
    },
    links: {
      services: [
        { label: 'Investment Fraud Recovery', href: '/services/investment-fraud-recovery' },
        { label: 'Cryptocurrency Recovery', href: '/services/cryptocurrency-recovery' },
        { label: 'Regulatory Assistance', href: '/services/regulatory-assistance' }
      ],
      company: [
        { label: 'About Us', href: '/about' },
        { label: 'Our Team', href: '/about#team' },
        { label: 'Testimonials', href: '/about#testimonials' },
        { label: 'Contact', href: '/contact' }
      ],
      legal: [
        { label: 'Privacy Policy', href: '/privacy-policy' },
        { label: 'Terms of Service', href: '/terms-of-service' },
        { label: 'Cookie Policy', href: '/cookie-policy' }
      ]
    },
    socialLinks: [
      { platform: 'linkedin' as const, url: 'https://linkedin.com/company/recovery-office' },
      { platform: 'twitter' as const, url: 'https://twitter.com/recoveryoffice' }
    ]
  };

  return (
    <LayoutContainer>
      <NavbarContainer>
        <PremiumNavBar 
          items={navItems}
          logo={logo}
          ctas={ctas}
          showLoginButton={false}
          isSticky={true}
          animateOnScroll={true}
        />
        <LanguageSwitcherContainer>
          <LanguageSwitcher />
        </LanguageSwitcherContainer>
      </NavbarContainer>
      <MainContent>
        {children}
      </MainContent>
      <PremiumFooter {...footerProps} />
    </LayoutContainer>
  );
};

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const NavbarContainer = styled.div`
  position: relative;
`;

const LanguageSwitcherContainer = styled.div`
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
  z-index: 1001;
  
  @media (max-width: 992px) {
    top: 20px;
    right: 70px;
    transform: none;
  }
`;

const MainContent = styled.main`
  flex: 1;
`; 