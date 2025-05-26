/**
 * Footer Component
 * 
 * A footer component that displays site information and links.
 * Uses sacred geometry principles for spacing and composition.
 */

import * as React from 'react';
import styled from 'styled-components';
import { Text } from '../typography/Text';
import { Container } from '../layout/Container';
import FooterLinks from './FooterLinks';
import FooterNewsletter from './FooterNewsletter';
import FooterSocial, { SocialLinkProps } from './FooterSocial';
import { BotanicalElement } from '../botanical/BotanicalElement';
import { BotanicalPosition, BotanicalSize } from '../botanical/botanicalUtils';
import { PHI_INVERSE } from '../../../constants/sacred-geometry';
import { getFibonacciByIndex } from '../../../utils/getFibonacciByIndex';

export interface FooterProps {
  /** Company logo React element */
  logo?: React.ReactNode;
  
  /** Company name */
  companyName: string;
  
  /** Copyright text (defaults to "© [current year] [companyName]. All rights reserved.") */
  copyrightText?: string;
  
  /** Array of link sections for the footer */
  linkSections?: Array<{
    title: string;
    links: Array<{
      label: string;
      url: string;
    }>;
  }>;
  
  /** Array of social media links */
  socialLinks?: SocialLinkProps[];
  
  /** Whether to show the newsletter signup form */
  showNewsletter?: boolean;
  
  /** Title for the newsletter section */
  newsletterTitle?: string;
  
  /** Description for the newsletter section */
  newsletterDescription?: string;
  
  /** URL for the privacy policy page */
  privacyPolicyUrl?: string;
  
  /** URL for the terms of service page */
  termsOfServiceUrl?: string;
  
  /** Botanical decoration configuration */
  botanical?: {
    type: 'oliveBranch' | 'flowerOfLife' | 'vesicaPiscis' | 'fibonacciSpiral' | 'oliveLeaf' | 'smallFlourish';
    position: BotanicalPosition;
    size?: BotanicalSize;
    opacity?: number;
  };
  
  /** Additional className */
  className?: string;
  
  /** Additional style */
  style?: React.CSSProperties;
}

// Main footer container with appropriate spacing and borders
const FooterContainer = styled.footer`
  position: relative;
  width: 100%;
  padding: ${getFibonacciByIndex(7)}px 0 ${getFibonacciByIndex(5)}px;
  background-color: ${props => props.theme.colors.primary[900] ?? '#111'};
  color: ${props => props.theme.colors.white};
  overflow: hidden;
`;

// Upper section with links and newsletter
const UpperSection = styled.div`
  display: grid;
  grid-template-columns: ${PHI_INVERSE * 100}% ${(1 - PHI_INVERSE) * 100}%;
  gap: ${getFibonacciByIndex(6)}px;
  margin-bottom: ${getFibonacciByIndex(7)}px;
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    gap: ${getFibonacciByIndex(7)}px;
  }
`;

// Lower section with logo, copyright, and social
const LowerSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding-top: ${getFibonacciByIndex(6)}px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

// Logo container with spacing
const LogoContainer = styled.div`
  margin-bottom: ${getFibonacciByIndex(5)}px;
  max-width: 120px;
`;

// Company name with appropriate typography
const CompanyName = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  margin-bottom: ${getFibonacciByIndex(3)}px;
`;

// Copyright text with reduced opacity using golden ratio
const Copyright = styled(Text)`
  opacity: ${PHI_INVERSE};
  margin-bottom: ${getFibonacciByIndex(6)}px;
`;

// Legal links with proper spacing
const LegalLinks = styled.div`
  display: flex;
  gap: ${getFibonacciByIndex(5)}px;
  margin-top: ${getFibonacciByIndex(4)}px;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    flex-direction: column;
    gap: ${getFibonacciByIndex(3)}px;
    align-items: center;
  }
`;

// Legal link styling
const LegalLink = styled.a`
  color: ${props => props.theme.colors.white};
  opacity: ${PHI_INVERSE};
  text-decoration: none;
  transition: opacity 0.2s;
  
  &:hover {
    opacity: 1;
  }
`;

/**
 * Footer component for website footers using sacred geometry principles.
 * Includes support for multiple link sections, newsletter signup, and social links.
 */
const Footer: React.FC<FooterProps> = ({
  logo,
  companyName,
  copyrightText = `© ${new Date().getFullYear()} ${companyName}. All rights reserved.`,
  linkSections = [],
  socialLinks = [],
  showNewsletter = true,
  newsletterTitle = "Stay Updated",
  newsletterDescription = "Subscribe to our newsletter for the latest updates and exclusive content.",
  privacyPolicyUrl = "/privacy-policy",
  termsOfServiceUrl = "/terms-of-service",
  botanical,
  className,
  style
}) => {
  // Filter social links to only use supported platforms
  const validSocialLinks = socialLinks.filter(
    link => ['facebook', 'twitter', 'instagram', 'linkedin', 'youtube', 'pinterest'].includes(link.platform as string)
  ) as SocialLinkProps[];

  return (
    <FooterContainer className={className} style={style}>
      {botanical && (
        <BotanicalElement 
          variant={botanical.type} 
          size={botanical.size} 
          opacity={botanical.opacity || 0.05}
        />
      )}
      
      <Container>
        <UpperSection>
          {linkSections.length > 0 && (
            <FooterLinks sections={linkSections} />
          )}
          
          {showNewsletter && (
            <FooterNewsletter 
              title={newsletterTitle} 
              description={newsletterDescription} 
            />
          )}
        </UpperSection>
        
        <LowerSection>
          {logo && (
            <LogoContainer>
              {logo}
            </LogoContainer>
          )}
          
          <CompanyName>{companyName}</CompanyName>
          <Copyright>{copyrightText}</Copyright>
          
          {validSocialLinks.length > 0 && (
            <FooterSocial links={validSocialLinks} />
          )}
          
          <LegalLinks>
            {privacyPolicyUrl && (
              <LegalLink href={privacyPolicyUrl}>
                Privacy Policy
              </LegalLink>
            )}
            
            {termsOfServiceUrl && (
              <LegalLink href={termsOfServiceUrl}>
                Terms of Service
              </LegalLink>
            )}
          </LegalLinks>
        </LowerSection>
      </Container>
    </FooterContainer>
  );
};

export default Footer; 








