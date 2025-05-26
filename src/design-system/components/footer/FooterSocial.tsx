/**
 * FooterSocial Component
 * 
 * A component that displays social media links in the footer
 * with sacred geometry principles applied to spacing and proportions.
 */

import * as React from 'react';
import styled from 'styled-components';
import { DefaultTheme } from 'styled-components';
import { PHI, PHI_INVERSE } from '../../../constants/sacred-geometry';
import { getFibonacciByIndex } from '../../../utils/getFibonacciByIndex';


export interface SocialLinkProps {
  /** Platform name */
  platform: 'facebook' | 'twitter' | 'instagram' | 'linkedin' | 'youtube' | 'pinterest';
  
  /** URL to profile */
  url: string;
}

interface FooterSocialProps {
  /** Array of social links */
  links: SocialLinkProps[];
  
  /** Optional class name */
  className?: string;
}

// Container for social links
const SocialLinksContainer = styled.div`
  display: flex;
  gap: ${getFibonacciByIndex(4)}px;
  justify-content: center;
  margin-bottom: ${getFibonacciByIndex(5)}px;
`;

// Individual social link
const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${getFibonacciByIndex(6)}px;
  height: ${getFibonacciByIndex(6)}px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.1);
  color: ${props => props.theme.colors.white};
  transition: transform 0.2s, background-color 0.2s;
                
    &:hover {
      background-color: rgba(255, 255, 255, 0.2);
      transform: scale(${PHI_INVERSE * PHI});
  }
`;

/**
 * Renders an SVG icon based on the platform
 */
const SocialIcon: React.FC<{ platform: SocialLinkProps['platform'] }> = ({ platform }) => {
  switch (platform) {
    case 'facebook':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 12C22 6.48 17.52 2 12 2C6.48 2 2 6.48 2 12C2 16.84 5.44 20.87 10 21.8V15H8V12H10V9.5C10 7.57 11.57 6 13.5 6H16V9H14C13.45 9 13 9.45 13 10V12H16V15H13V21.95C18.05 21.45 22 17.19 22 12Z" />
        </svg>
      );
    case 'twitter':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.46 6C21.69 6.35 20.86 6.58 20 6.69C20.88 6.16 21.56 5.32 21.88 4.31C21.05 4.81 20.13 5.16 19.16 5.36C18.37 4.5 17.26 4 16 4C13.65 4 11.73 5.92 11.73 8.29C11.73 8.63 11.77 8.96 11.84 9.27C8.28 9.09 5.11 7.38 3 4.79C2.63 5.42 2.42 6.16 2.42 6.94C2.42 8.43 3.17 9.75 4.33 10.5C3.62 10.5 2.96 10.3 2.38 10V10.03C2.38 12.11 3.86 13.85 5.82 14.24C5.46 14.34 5.08 14.39 4.69 14.39C4.42 14.39 4.15 14.36 3.89 14.31C4.43 16 6 17.26 7.89 17.29C6.43 18.45 4.58 19.13 2.56 19.13C2.22 19.13 1.88 19.11 1.54 19.07C3.44 20.29 5.7 21 8.12 21C16 21 20.33 14.46 20.33 8.79C20.33 8.6 20.33 8.42 20.32 8.23C21.16 7.63 21.88 6.87 22.46 6Z" />
        </svg>
      );
    case 'instagram':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2.163C15.204 2.163 15.584 2.175 16.85 2.233C20.102 2.381 21.621 3.924 21.769 7.152C21.827 8.417 21.838 8.797 21.838 12.001C21.838 15.206 21.826 15.585 21.769 16.85C21.62 20.075 20.105 21.621 16.85 21.769C15.584 21.827 15.206 21.839 12 21.839C8.796 21.839 8.416 21.827 7.151 21.769C3.891 21.62 2.38 20.07 2.232 16.849C2.174 15.584 2.162 15.205 2.162 12C2.162 8.796 2.175 8.417 2.232 7.151C2.381 3.924 3.896 2.38 7.151 2.232C8.417 2.175 8.796 2.163 12 2.163ZM12 0C8.741 0 8.333 0.014 7.053 0.072C2.695 0.272 0.273 2.69 0.073 7.052C0.014 8.333 0 8.741 0 12C0 15.259 0.014 15.668 0.072 16.948C0.272 21.306 2.69 23.728 7.052 23.928C8.333 23.986 8.741 24 12 24C15.259 24 15.668 23.986 16.948 23.928C21.302 23.728 23.73 21.31 23.927 16.948C23.986 15.668 24 15.259 24 12C24 8.741 23.986 8.333 23.928 7.053C23.732 2.699 21.311 0.273 16.949 0.073C15.668 0.014 15.259 0 12 0ZM12 5.838C8.597 5.838 5.838 8.597 5.838 12C5.838 15.403 8.597 18.163 12 18.163C15.403 18.163 18.162 15.404 18.162 12C18.162 8.597 15.403 5.838 12 5.838ZM12 16C9.791 16 8 14.21 8 12C8 9.791 9.791 8 12 8C14.209 8 16 9.791 16 12C16 14.21 14.209 16 12 16ZM18.406 4.155C17.61 4.155 16.965 4.8 16.965 5.595C16.965 6.39 17.61 7.035 18.406 7.035C19.201 7.035 19.845 6.39 19.845 5.595C19.845 4.8 19.201 4.155 18.406 4.155Z" />
        </svg>
      );
    case 'linkedin':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 3H5C3.895 3 3 3.895 3 5V19C3 20.105 3.895 21 5 21H19C20.105 21 21 20.105 21 19V5C21 3.895 20.105 3 19 3ZM9 17H6.477V10H9V17ZM7.694 8.717C6.923 8.717 6.408 8.203 6.408 7.517C6.408 6.831 6.922 6.317 7.779 6.317C8.55 6.317 9.065 6.831 9.065 7.517C9.065 8.203 8.551 8.717 7.694 8.717ZM18 17H15.558V13.174C15.558 12.116 14.907 11.872 14.663 11.872C14.419 11.872 13.605 12.035 13.605 13.174C13.605 13.337 13.605 17 13.605 17H11.082V10H13.605V10.977C13.93 10.407 14.581 10 15.802 10C17.023 10 18 10.977 18 13.174V17Z" />
        </svg>
      );
    case 'youtube':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M21.543 6.498C22 8.28 22 12 22 12C22 12 22 15.72 21.543 17.502C21.289 18.487 20.546 19.262 19.605 19.524C17.896 20 12 20 12 20C12 20 6.107 20 4.395 19.524C3.45 19.258 2.708 18.484 2.457 17.502C2 15.72 2 12 2 12C2 12 2 8.28 2.457 6.498C2.711 5.513 3.454 4.738 4.395 4.476C6.107 4 12 4 12 4C12 4 17.896 4 19.605 4.476C20.55 4.742 21.292 5.516 21.543 6.498ZM10 15.5L16 12L10 8.5V15.5Z" />
        </svg>
      );
    case 'pinterest':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.04 21.54C10 21.83 10.97 22 12 22C14.6522 22 17.1957 20.9464 19.0711 19.0711C20.9464 17.1957 22 14.6522 22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7362 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2C10.6868 2 9.38642 2.25866 8.17317 2.7612C6.95991 3.26375 5.85752 4.00035 4.92893 4.92893C3.05357 6.8043 2 9.34784 2 12C2 16.25 4.67 19.9 8.44 21.34C8.35 20.56 8.26 19.27 8.44 18.38L9.59 13.44C9.59 13.44 9.3 12.86 9.3 11.94C9.3 10.56 10.16 9.53 11.14 9.53C12 9.53 12.4 10.16 12.4 10.97C12.4 11.83 11.83 13.06 11.54 14.24C11.37 15.22 12.06 16.08 13.06 16.08C14.84 16.08 16.22 14.18 16.22 11.5C16.22 9.1 14.5 7.46 12.03 7.46C9.21 7.46 7.55 9.56 7.55 11.77C7.55 12.63 7.83 13.5 8.29 14.07C8.38 14.13 8.38 14.21 8.35 14.36L8.06 15.45C8.06 15.62 7.95 15.68 7.78 15.56C6.5 15 5.76 13.18 5.76 11.71C5.76 8.55 8 5.68 12.32 5.68C15.76 5.68 18.44 8.15 18.44 11.43C18.44 14.87 16.31 17.63 13.26 17.63C12.29 17.63 11.34 17.11 11 16.5L10.33 18.87C10.1 19.73 9.47 20.88 9.04 21.57V21.54Z" />
        </svg>
      );
    default:
      return null;
  }
};

/**
 * FooterSocial component for the footer area that displays social media links
 * using sacred geometry principles for spacing and animations.
 */
const FooterSocial: React.FC<FooterSocialProps> = ({ links, className }) => {
  return (
    <SocialLinksContainer className={className}>
        {links.map((link, index) => (
        <SocialLink
            key={`${link.platform}-${index}`}
          href={link.url}
            target="_blank"
            rel="noopener noreferrer"
          aria-label={`Follow us on ${link.platform}`}
        >
          <SocialIcon platform={link.platform} />
        </SocialLink>
      ))}
    </SocialLinksContainer>
  );
};

export default FooterSocial; 








