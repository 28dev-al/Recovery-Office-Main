import * as React from 'react';
import styled, { css } from 'styled-components';
import { Text } from '../typography/Text';
import { Container } from '../layout/Container';
import { Box, Flex, Grid, GridItem } from '../layout';
import { BotanicalElement } from '../botanical/BotanicalElement';
import { PHI, PHI_INVERSE } from '../../../constants/sacred-geometry';
import { getFibonacciByIndex } from '../../../utils/getFibonacciByIndex';

// Premium social media icons import would go here
// This is a simplified version without icon implementation

/**
 * Social media link properties
 */
export interface PremiumSocialLinkProps {
  /** Social media platform */
  platform: 'facebook' | 'twitter' | 'linkedin' | 'instagram' | 'youtube';
  /** URL to the social media profile */
  url: string;
  /** Optional label for the link */
  label?: string;
  /** Optional aria-label for accessibility */
  ariaLabel?: string;
}

/**
 * Footer column properties
 */
export interface FooterColumnProps {
  /** Title of the column */
  title: string;
  /** Links in the column */
  links: Array<{
    label: string;
    url: string;
    isHighlighted?: boolean;
  }>;
}

/**
 * Premium Footer properties
 */
export interface PremiumFooterProps {
  /** Company logo React element */
  logo?: React.ReactNode;
  
  /** Company name */
  companyName: string;
  
  /** Copyright text (defaults to "© [current year] [companyName]. All rights reserved.") */
  copyrightText?: string;
  
  /** Disclaimer text typically used for financial services */
  disclaimerText?: string;
  
  /** Array of link columns for the footer */
  columns?: FooterColumnProps[];
  
  /** Array of social media links */
  socialLinks?: PremiumSocialLinkProps[];
  
  /** Whether to show the newsletter signup form */
  showNewsletter?: boolean;
  
  /** Title for the newsletter section */
  newsletterTitle?: string;
  
  /** Description for the newsletter section */
  newsletterDescription?: string;
  
  /** Privacy policy URL */
  privacyPolicyUrl?: string;
  
  /** Terms of service URL */
  termsOfServiceUrl?: string;
  
  /** Additional legal links */
  legalLinks?: Array<{
    label: string;
    url: string;
  }>;
  
  /** Optional regulatory information (financial services) */
  regulatoryInfo?: {
    /** Company registration info */
    registrationInfo?: string;
    /** Regulatory body name */
    regulatoryBody?: string;
    /** Regulatory body URL */
    regulatoryBodyUrl?: string;
    /** Additional regulatory text */
    additionalInfo?: string;
    /** Regulatory badges/logos as React nodes */
    badges?: React.ReactNode;
  };
  
  /** Botanical decoration configuration */
  botanical?: {
    enabled: boolean;
    position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    variant?: 'oliveLeaf' | 'smallFlourish' | 'flowerOfLife';
  };
  
  /** Additional className */
  className?: string;
  
  /** Additional style */
  style?: React.CSSProperties;
}

/**
 * PremiumFooter Component
 * 
 * A footer component designed specifically for financial services websites,
 * including support for regulatory information, legal disclaimers, and
 * a professional, premium appearance.
 */
const PremiumFooter: React.FC<PremiumFooterProps> = ({
  logo,
  companyName,
  copyrightText = `© ${new Date().getFullYear()} ${companyName}. All rights reserved.`,
  disclaimerText,
  columns = [],
  socialLinks = [],
  showNewsletter = false,
  newsletterTitle = "Stay Informed",
  newsletterDescription = "Subscribe to our newsletter for financial news and insights.",
  privacyPolicyUrl = "/privacy-policy",
  termsOfServiceUrl = "/terms-of-service",
  legalLinks = [],
  regulatoryInfo,
  botanical = { enabled: false },
  className,
  style
}) => {
  return (
    <FooterContainer className={className} style={style}>
      {botanical.enabled && (
        <BotanicalAccent position={botanical.position || 'bottom-right'}>
          <BotanicalElement
            variant={botanical.variant || 'smallFlourish'}
            size="md"
            opacity={0.04}
            colorScheme="primary"
          />
        </BotanicalAccent>
      )}
      
      <Container>
        <UpperSection>
          <FooterBranding>
            {logo && <LogoContainer>{logo}</LogoContainer>}
            <CompanyInfo>
              <CompanyName>{companyName}</CompanyName>
              {regulatoryInfo?.registrationInfo && (
                <RegistrationInfo>{regulatoryInfo.registrationInfo}</RegistrationInfo>
              )}
            </CompanyInfo>
            
            {socialLinks && socialLinks.length > 0 && (
              <SocialLinksContainer>
                {socialLinks.map((link, index) => (
                  <SocialLink 
                    key={`social-${index}`} 
                    href={link.url}
                    aria-label={link.ariaLabel || `${companyName} on ${link.platform}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    platform={link.platform}
                  >
                    <SocialIcon platform={link.platform} />
                  </SocialLink>
                ))}
              </SocialLinksContainer>
            )}
          </FooterBranding>
          
          <FooterColumns>
            {columns.map((column, colIndex) => (
              <FooterColumn key={`col-${colIndex}`}>
                <ColumnTitle>{column.title}</ColumnTitle>
                <ColumnLinks>
                  {column.links.map((link, linkIndex) => (
                    <ColumnLink 
                      key={`link-${colIndex}-${linkIndex}`}
                      href={link.url}
                      $isHighlighted={link.isHighlighted}
                    >
                      {link.label}
                    </ColumnLink>
                  ))}
                </ColumnLinks>
              </FooterColumn>
            ))}
            
            {showNewsletter && (
              <NewsletterColumn>
                <ColumnTitle>{newsletterTitle}</ColumnTitle>
                <NewsletterDescription>
                  {newsletterDescription}
                </NewsletterDescription>
                <NewsletterForm>
                  <NewsletterInput
                    type="email"
                    placeholder="Your email address"
                    aria-label="Email address for newsletter"
                  />
                  <NewsletterButton>Subscribe</NewsletterButton>
                </NewsletterForm>
              </NewsletterColumn>
            )}
          </FooterColumns>
        </UpperSection>
        
        {regulatoryInfo && (
          <RegulatorySection>
            <RegulatoryText>
              {regulatoryInfo.regulatoryBody && (
                <span>
                  Regulated by{' '}
                  {regulatoryInfo.regulatoryBodyUrl ? (
                    <RegulatoryLink 
                      href={regulatoryInfo.regulatoryBodyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {regulatoryInfo.regulatoryBody}
                    </RegulatoryLink>
                  ) : (
                    regulatoryInfo.regulatoryBody
                  )}
                  .{' '}
                </span>
              )}
              {regulatoryInfo.additionalInfo}
            </RegulatoryText>
            
            {regulatoryInfo.badges && (
              <RegulatoryBadges>
                {regulatoryInfo.badges}
              </RegulatoryBadges>
            )}
          </RegulatorySection>
        )}
        
        {disclaimerText && (
          <DisclaimerSection>
            <Disclaimer>{disclaimerText}</Disclaimer>
          </DisclaimerSection>
        )}
        
        <LowerSection>
          <CopyrightText>{copyrightText}</CopyrightText>
          
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
            
            {legalLinks.map((link, index) => (
              <LegalLink key={`legal-${index}`} href={link.url}>
                {link.label}
              </LegalLink>
            ))}
          </LegalLinks>
        </LowerSection>
      </Container>
    </FooterContainer>
  );
};

// Styled components
const FooterContainer = styled.footer`
  position: relative;
  width: 100%;
  background-color: ${props => props.theme.colors.primary[900]};
  color: ${props => props.theme.colors.white};
  padding: ${getFibonacciByIndex(9)}px 0 ${getFibonacciByIndex(7)}px;
  overflow: hidden;
`;

interface BotanicalAccentProps {
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

const BotanicalAccent = styled.div<BotanicalAccentProps>`
  position: absolute;
  pointer-events: none;
  opacity: 0.05;
  z-index: 0;
  
  ${props => {
    switch (props.position) {
      case 'top-left':
        return css`
          top: ${getFibonacciByIndex(7)}px;
          left: ${getFibonacciByIndex(7)}px;
          transform: rotate(${-25 * PHI_INVERSE}deg);
        `;
      case 'top-right':
        return css`
          top: ${getFibonacciByIndex(7)}px;
          right: ${getFibonacciByIndex(7)}px;
          transform: rotate(${25 * PHI_INVERSE}deg);
        `;
      case 'bottom-left':
        return css`
          bottom: ${getFibonacciByIndex(7)}px;
          left: ${getFibonacciByIndex(7)}px;
          transform: rotate(${25 * PHI_INVERSE}deg);
        `;
      case 'bottom-right':
      default:
        return css`
          bottom: ${getFibonacciByIndex(7)}px;
          right: ${getFibonacciByIndex(7)}px;
          transform: rotate(${-25 * PHI_INVERSE}deg);
        `;
    }
  }}
`;

const UpperSection = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${getFibonacciByIndex(8)}px;
  margin-bottom: ${getFibonacciByIndex(8)}px;
  
  @media (min-width: ${props => props.theme.breakpoints.values.md}px) {
    grid-template-columns: ${PHI_INVERSE * 100}% ${(1 - PHI_INVERSE) * 100}%;
  }
`;

const FooterBranding = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const LogoContainer = styled.div`
  margin-bottom: ${getFibonacciByIndex(6)}px;
  max-width: 180px;
`;

const CompanyInfo = styled.div`
  margin-bottom: ${getFibonacciByIndex(7)}px;
`;

const CompanyName = styled.div`
  font-family: ${props => props.theme.typography.fontFamily.heading};
  font-size: ${props => props.theme.typography.fontSize.md}px;
  font-weight: ${props => props.theme.typography.fontWeight.semiBold};
  margin-bottom: ${getFibonacciByIndex(4)}px;
`;

const RegistrationInfo = styled.div`
  font-size: ${props => props.theme.typography.fontSize.xs}px;
  opacity: ${PHI_INVERSE};
`;

const SocialLinksContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${getFibonacciByIndex(5)}px;
  margin-top: ${getFibonacciByIndex(6)}px;
`;

interface SocialLinkProps {
  platform: string;
}

const SocialLink = styled.a<SocialLinkProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${getFibonacciByIndex(8)}px;
  height: ${getFibonacciByIndex(8)}px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  transition: all 0.2s;
  
  &:hover {
    background-color: ${props => {
      switch (props.platform) {
        case 'facebook':
          return '#1877F2';
        case 'twitter':
          return '#1DA1F2';
        case 'linkedin':
          return '#0A66C2';
        case 'instagram':
          return '#E4405F';
        case 'youtube':
          return '#FF0000';
        default:
          return props.theme.colors.accent.gold;
      }
    }};
    transform: translateY(-1px);
  }
`;

// A simplified placeholder for proper icon system
const SocialIcon = styled.div<SocialLinkProps>`
  width: ${getFibonacciByIndex(6)}px;
  height: ${getFibonacciByIndex(6)}px;
  background-color: white;
  mask-size: contain;
  mask-repeat: no-repeat;
  mask-position: center;
  
  ${props => {
    switch (props.platform) {
      case 'facebook':
        return css`mask-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M9 8H6v4h3v12h5V12h3.6l.4-4h-4V6.3c0-1 .2-1.3 1.6-1.3H18V0h-3.8C10.7 0 9 1.7 9 5v3z"/></svg>');`;
      case 'twitter':
        return css`mask-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M24 4.6a10 10 0 0 1-2.8.8 5 5 0 0 0 2.2-2.7c-.9.5-2 1-3 1.2A5 5 0 0 0 11.7 8 14 14 0 0 1 1.7 3.1 5 5 0 0 0 3.2 9.7 4.9 4.9 0 0 1 1 9v.1a5 5 0 0 0 4 4.9 5 5 0 0 1-2.2.1 5 5 0 0 0 4.6 3.4A10 10 0 0 1 0 20a14 14 0 0 0 7.6 2.2c9 0 14-7.5 14-14V7.5A10 10 0 0 0 24 4.6z"/></svg>');`;
      case 'linkedin':
        return css`mask-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20.4 20.5h-3.6v-5.6c0-1.3 0-3-1.9-3-1.8 0-2.1 1.4-2.1 2.9v5.7H9.4V9h3.4v1.6h.1c.5-1 1.6-1.9 3.4-1.9 3.6 0 4.3 2.4 4.3 5.5v6.3zM5.3 7.4a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2zm1.8 13.1H3.5V9h3.6v11.5zM22.2 0H1.8C.8 0 0 .8 0 1.7v20.6c0 1 .8 1.7 1.8 1.7h20.4c1 0 1.8-.8 1.8-1.7V1.7c0-1-.8-1.7-1.8-1.7z"/></svg>');`;
      case 'instagram':
        return css`mask-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2 0 1.8.2 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2 0 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c0 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3 0-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2 0-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2 0-1.3-.1-1.7-.1-4.9s0-3.6.1-4.9c0-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4 1.3-.1 1.7-.1 4.9-.1M12 0C8.7 0 8.3 0 7.1.1 5.8.1 5 .3 4.2.6c-.8.3-1.5.7-2.1 1.4C1.5 2.6 1 3.3.8 4.1.5 5 .3 5.8.3 7.1.1 8.3.1 8.7.1 12s0 3.7.1 4.9c0 1.3.2 2.1.5 2.9.3.8.7 1.5 1.4 2.1.7.7 1.3 1.1 2.1 1.4.8.3 1.6.5 2.9.5 1.2.1 1.6.1 4.9.1s3.7 0 4.9-.1c1.3-.1 2.1-.2 2.9-.5.8-.3 1.5-.7 2.1-1.4.7-.7 1.1-1.3 1.4-2.1.3-.8.5-1.6.5-2.9.1-1.2.1-1.6.1-4.9s0-3.7-.1-4.9c-.1-1.3-.2-2.1-.5-2.9-.3-.8-.7-1.5-1.4-2.1-.7-.7-1.3-1.1-2.1-1.4-.8-.3-1.6-.5-2.9-.5C15.7.1 15.3.1 12 0zm0 5.8a6.2 6.2 0 1 0 0 12.4 6.2 6.2 0 0 0 0-12.4zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm7.9-10.3a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/></svg>');`;
      case 'youtube':
        return css`mask-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M23.8 7.2s-.2-1.7-1-2.4c-.9-1-1.9-1-2.4-1-3.4-.2-8.4-.2-8.4-.2s-5 0-8.4.2c-.5.1-1.5.1-2.4 1-.7.7-1 2.4-1 2.4S0 9.1 0 11.1v1.8c0 1.9.2 3.9.2 3.9s.2 1.7 1 2.4c.9 1 2.1.9 2.6 1 1.9.2 8.2.2 8.2.2s5 0 8.4-.3c.5 0 1.5-.1 2.4-1 .7-.7 1-2.4 1-2.4s.2-1.9.2-3.9V11c0-1.9-.2-3.8-.2-3.8zM9.5 15.1V8.4l6.5 3.4-6.5 3.3z"/></svg>');`;
      default:
        return '';
    }
  }}
`;

const FooterColumns = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: ${getFibonacciByIndex(7)}px;
`;

const FooterColumn = styled.div``;

const ColumnTitle = styled.h3`
  font-family: ${props => props.theme.typography.fontFamily.heading};
  font-size: ${props => props.theme.typography.fontSize.sm}px;
  font-weight: ${props => props.theme.typography.fontWeight.semiBold};
  letter-spacing: 0.5px;
  margin-bottom: ${getFibonacciByIndex(6)}px;
  color: ${props => props.theme.colors.white};
`;

const ColumnLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${getFibonacciByIndex(5)}px;
`;

interface ColumnLinkProps {
  $isHighlighted?: boolean;
}

const ColumnLink = styled.a<ColumnLinkProps>`
  color: ${props => props.$isHighlighted 
    ? props.theme.colors.accent.gold
    : 'rgba(255, 255, 255, 0.8)'
  };
  text-decoration: none;
  font-size: ${props => props.theme.typography.fontSize.sm}px;
  transition: all 0.2s;
  
  &:hover {
    color: ${props => props.$isHighlighted 
      ? props.theme.colors.accent.gold
      : props.theme.colors.white
    };
    text-decoration: ${props => props.$isHighlighted ? 'none' : 'underline'};
    transform: translateX(${getFibonacciByIndex(3)}px);
  }
`;

const NewsletterColumn = styled.div`
  grid-column: span 2;
`;

const NewsletterDescription = styled.p`
  font-size: ${props => props.theme.typography.fontSize.sm}px;
  line-height: 1.5;
  margin-bottom: ${getFibonacciByIndex(6)}px;
  color: rgba(255, 255, 255, 0.8);
`;

const NewsletterForm = styled.form`
  display: flex;
  flex-direction: column;
  
  @media (min-width: ${props => props.theme.breakpoints.values.sm}px) {
    flex-direction: row;
  }
`;

const NewsletterInput = styled.input`
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: ${props => props.theme.radius.input}px;
  color: ${props => props.theme.colors.white};
  padding: ${getFibonacciByIndex(5)}px ${getFibonacciByIndex(6)}px;
  font-size: ${props => props.theme.typography.fontSize.sm}px;
  width: 100%;
  margin-bottom: ${getFibonacciByIndex(5)}px;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
  
  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.3);
  }
  
  @media (min-width: ${props => props.theme.breakpoints.values.sm}px) {
    margin-bottom: 0;
    margin-right: ${getFibonacciByIndex(5)}px;
  }
`;

const NewsletterButton = styled.button`
  background-color: ${props => props.theme.colors.accent.gold};
  color: ${props => props.theme.colors.primary[900]};
  border: none;
  border-radius: ${props => props.theme.radius.button}px;
  padding: ${getFibonacciByIndex(5)}px ${getFibonacciByIndex(7)}px;
  font-size: ${props => props.theme.typography.fontSize.sm}px;
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: ${props => props.theme.colors.accent.copper};
    transform: translateY(-1px);
  }
`;

const RegulatorySection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${getFibonacciByIndex(6)}px;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: ${props => props.theme.radius.md}px;
  margin-bottom: ${getFibonacciByIndex(8)}px;
  
  @media (min-width: ${props => props.theme.breakpoints.values.md}px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const RegulatoryText = styled.div`
  font-size: ${props => props.theme.typography.fontSize.xs}px;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.7);
  
  @media (min-width: ${props => props.theme.breakpoints.values.md}px) {
    margin-right: ${getFibonacciByIndex(7)}px;
  }
`;

const RegulatoryLink = styled.a`
  color: ${props => props.theme.colors.accent.gold};
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const RegulatoryBadges = styled.div`
  display: flex;
  align-items: center;
  gap: ${getFibonacciByIndex(6)}px;
  margin-top: ${getFibonacciByIndex(6)}px;
  
  @media (min-width: ${props => props.theme.breakpoints.values.md}px) {
    margin-top: 0;
  }
`;

const DisclaimerSection = styled.div`
  margin-bottom: ${getFibonacciByIndex(8)}px;
`;

const Disclaimer = styled.p`
  font-size: ${props => props.theme.typography.fontSize.xs}px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.6);
  padding: ${getFibonacciByIndex(5)}px;
  border-left: 2px solid ${props => props.theme.colors.accent.gold};
  background-color: rgba(0, 0, 0, 0.1);
`;

const LowerSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding-top: ${getFibonacciByIndex(6)}px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  
  @media (min-width: ${props => props.theme.breakpoints.values.md}px) {
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
  }
`;

const CopyrightText = styled(Text)`
  color: rgba(255, 255, 255, 0.5);
  font-size: ${props => props.theme.typography.fontSize.xs}px;
  margin-bottom: ${getFibonacciByIndex(5)}px;
  
  @media (min-width: ${props => props.theme.breakpoints.values.md}px) {
    margin-bottom: 0;
  }
`;

const LegalLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${getFibonacciByIndex(6)}px;
  
  @media (min-width: ${props => props.theme.breakpoints.values.md}px) {
    justify-content: flex-end;
  }
`;

const LegalLink = styled.a`
  color: rgba(255, 255, 255, 0.5);
  text-decoration: none;
  font-size: ${props => props.theme.typography.fontSize.xs}px;
  transition: color 0.2s;
  
  &:hover {
    color: ${props => props.theme.colors.white};
  }
`;

export default PremiumFooter; 