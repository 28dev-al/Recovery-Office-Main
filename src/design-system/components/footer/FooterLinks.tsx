/**
 * FooterLinks Component
 * 
 * A component that displays a group of links in the footer,
 * following sacred geometry principles for spacing and layout.
 */

import * as React from 'react';
import styled from 'styled-components';
import { DefaultTheme } from 'styled-components';
import { PHI_INVERSE, SACRED_SPACING_SYSTEM, getFibonacciByIndex } from '../../../constants/sacred-geometry';

import { Heading } from '../typography/Heading';
import { Text } from '../typography/Text';

// Define the types locally since they're not exported properly
interface FooterLink {
  label: string;
  url: string;
  external?: boolean;
}

export interface FooterLinkSection {
  title: string;
  links: FooterLink[];
}

interface FooterLinksProps {
  /** Array of link sections */
  sections: FooterLinkSection[];
  
  /** Optional class name */
  className?: string;
}

// Container for all link sections
const LinksContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${SACRED_SPACING_SYSTEM.lg}px;
`;

// Individual link section
const LinkSection = styled.div`
  margin-bottom: ${SACRED_SPACING_SYSTEM.lg}px;
`;

// Section heading with golden ratio underline
const SectionTitle = styled(Heading)`
  margin-bottom: ${SACRED_SPACING_SYSTEM.sm}px;
  padding-bottom: ${SACRED_SPACING_SYSTEM.xs}px;
  position: relative;
  font-size: 1.1rem;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: ${PHI_INVERSE * 100}%;
    height: 2px;
    background-color: ${props => props.theme.colors.primary[300] ?? 1};
    opacity: 0.5;
  }
`;

// Links list with Fibonacci spacing
const LinksList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  
  li + li {
    margin-top: ${SACRED_SPACING_SYSTEM.xs}px;
  }
`;

// Individual link item
const LinkItem = styled.li`
  transition: transform 0.2s;
  
  &:hover {
    transform: translateX(${SACRED_SPACING_SYSTEM.xxs}px);
  }
`;

// Link styling
const Link = styled.a`
  color: ${props => props.theme.colors.text.light};
  opacity: ${PHI_INVERSE};
  text-decoration: none;
  display: inline-block;
  transition: opacity 0.2s;
  
  &:hover {
    opacity: 1;
  }
`;

/**
 * FooterLinks component that displays organized link sections in the footer
 * with sacred geometry proportions and subtle animations.
 */
const FooterLinks: React.FC<FooterLinksProps> = ({ sections, className }) => {
  return (
    <LinksContainer className={className}>
      {sections.map((section, index) => (
        <LinkSection key={`section-${index}`}>
          <SectionTitle as="h4">
            {section.title}
          </SectionTitle>
          
          <LinksList>
            {section.links.map((link, linkIndex) => (
              <LinkItem key={`link-${linkIndex}`}>
                <Link 
                  href={link.url}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                >
                  {link.label}
                </Link>
              </LinkItem>
            ))}
          </LinksList>
        </LinkSection>
      ))}
    </LinksContainer>
  );
};

export default FooterLinks; 








