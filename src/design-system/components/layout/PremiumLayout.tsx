import * as React from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { Box } from './Box';
import { Container } from './Container';
import PremiumNavBar, { PremiumNavBarItem, PremiumNavBarCTA } from '../navigation/PremiumNavBar';
import PremiumFooter, { FooterColumnProps, PremiumSocialLinkProps } from '../footer/PremiumFooter';
import { BotanicalElement } from '../botanical/BotanicalElement';
import Breadcrumbs, { BreadcrumbItem } from '../navigation/Breadcrumbs';
import { PHI, PHI_INVERSE, getFibonacciByIndex } from '../../../constants/sacred-geometry';

/**
 * Interface for the Premium layout configuration
 */
export interface PremiumLayoutProps {
  /** The page content */
  children: React.ReactNode;
  
  /** The site logo component */
  logo: React.ReactNode;
  
  /** The company name */
  companyName: string;
  
  /** Optional page title to display in SEO and breadcrumbs */
  pageTitle?: string;
  
  /** Optional page description for SEO */
  pageDescription?: string;
  
  /** Navigation items for the navbar */
  navItems: PremiumNavBarItem[];
  
  /** Call-to-action buttons for the navbar */
  navCTAs?: PremiumNavBarCTA[];
  
  /** Whether to use a transparent navbar (for hero sections) */
  transparentNavbar?: boolean;
  
  /** Whether to enable breadcrumbs */
  showBreadcrumbs?: boolean;
  
  /** Custom breadcrumbs if not using auto-generated ones */
  customBreadcrumbs?: Array<{
    label: string;
    path: string;
  }>;
  
  /** Footer link columns */
  footerColumns: FooterColumnProps[];
  
  /** Social media links for the footer */
  socialLinks?: PremiumSocialLinkProps[];
  
  /** Optional disclaimer text for the footer */
  disclaimerText?: string;
  
  /** Optional regulatory information for the footer */
  regulatoryInfo?: {
    registrationInfo?: string;
    regulatoryBody?: string;
    regulatoryBodyUrl?: string;
    additionalInfo?: string;
    badges?: React.ReactNode;
  };
  
  /** Whether to show the newsletter signup in footer */
  showNewsletter?: boolean;
  
  /** Whether to show botanical elements */
  showBotanical?: boolean;
  
  /** Additional legal links for the footer */
  legalLinks?: Array<{
    label: string;
    url: string;
  }>;
  
  /** Additional CSS class */
  className?: string;
}

/**
 * PremiumLayout Component
 * 
 * A consistent page layout structure for financial services websites,
 * featuring the premium navbar, footer, and content area.
 */
const PremiumLayout: React.FC<PremiumLayoutProps> = ({
  children,
  logo,
  companyName,
  pageTitle,
  pageDescription,
  navItems,
  navCTAs = [],
  transparentNavbar = false,
  showBreadcrumbs = true,
  customBreadcrumbs,
  footerColumns,
  socialLinks = [],
  disclaimerText,
  regulatoryInfo,
  showNewsletter = true,
  showBotanical = true,
  legalLinks = [],
  className,
}) => {
  // Current location for breadcrumbs
  const location = useLocation();
  
  // Auto-generate breadcrumbs based on current path
  const autoBreadcrumbs = React.useMemo(() => {
    if (customBreadcrumbs) return customBreadcrumbs;
    
    const pathSegments = location.pathname.split('/').filter(Boolean);
    
    // Start with home
    const crumbs: BreadcrumbItem[] = [{ label: 'Home', path: '/' }];
    
    // Add each path segment
    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      
      // Format the label with capitalization and replacing hyphens
      const label = segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      // Add the breadcrumb (last one has no href)
      if (index === pathSegments.length - 1 && pageTitle) {
        crumbs.push({ label: pageTitle, path: currentPath, isActive: true });
      } else {
        crumbs.push({ label, path: currentPath });
      }
    });
    
    return crumbs;
  }, [location.pathname, customBreadcrumbs, pageTitle]);
  
  return (
    <LayoutWrapper className={className}>
      {/* Header with NavBar */}
      <PremiumNavBar
        logo={logo}
        items={navItems}
        ctas={navCTAs}
        isTransparent={transparentNavbar}
        showBotanical={showBotanical}
        isSticky={true}
        animateOnScroll={true}
      />
      
      {/* Main content area */}
      <MainContent>
        {/* Breadcrumbs (if enabled) */}
        {showBreadcrumbs && autoBreadcrumbs.length > 1 && (
          <BreadcrumbsContainer>
            <Container>
              <Breadcrumbs items={autoBreadcrumbs} />
            </Container>
          </BreadcrumbsContainer>
        )}
        
        {/* Page content */}
        <ContentWrapper>
          {children}
        </ContentWrapper>
      </MainContent>
      
      {/* Footer */}
      <PremiumFooter
        logo={logo}
        companyName={companyName}
        columns={footerColumns}
        socialLinks={socialLinks}
        showNewsletter={showNewsletter}
        disclaimerText={disclaimerText}
        regulatoryInfo={regulatoryInfo}
        legalLinks={legalLinks}
        botanical={{
          enabled: showBotanical,
          position: 'bottom-right',
          variant: 'smallFlourish'
        }}
      />
    </LayoutWrapper>
  );
};

// Styled components
const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${props => props.theme.colors.background[50]};
  color: ${props => props.theme.colors.text.primary};
`;

const MainContent = styled.main`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const BreadcrumbsContainer = styled.div`
  padding: ${getFibonacciByIndex(5)}px 0;
  background-color: ${props => props.theme.colors.background[100]};
  border-bottom: 1px solid ${props => props.theme.colors.divider};
`;

const ContentWrapper = styled.div`
  flex: 1;
  width: 100%;
`;

export default PremiumLayout; 