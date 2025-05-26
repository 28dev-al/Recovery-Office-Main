import * as React from 'react';
import styled from 'styled-components';

// Import base card component
import Card, { CardProps } from './Card';

// Import sacred geometry constants
import { PHI, PHI_INVERSE, FIBONACCI } from '../../../constants/sacred-geometry';

// Import components
import { Box, Flex } from '../layout';
import { Text } from '../typography';

/**
 * Social media platform types for team member profiles
 */
export type SocialPlatform = 'linkedin' | 'twitter' | 'email' | 'phone' | 'website';

/**
 * Social media link interface
 */
export interface SocialLink {
  platform: SocialPlatform;
  url: string;
  label?: string;
}

export interface TeamMemberCardProps extends Omit<CardProps, 'children'> {
  /** Team member's name */
  name: string;
  
  /** Team member's job title */
  title: string;
  
  /** Team member's photo URL */
  photoUrl: string;
  
  /** Team member's biography */
  bio?: string;
  
  /** Team member's credentials or certifications */
  credentials?: string[];
  
  /** Team member's skills or specialties */
  specialties?: string[];
  
  /** Team member's social media links */
  socialLinks?: SocialLink[];
  
  /** Accent color for the team member's card */
  accentColor?: string;
  
  /** Whether the card should have hover effects */
  interactive?: boolean;
  
  /** Image aspect ratio (1 for square, 4/3, 16/9, etc.) */
  imageAspectRatio?: number;
}

/**
 * TeamMemberCard Component
 * 
 * A specialized card component for displaying team member profiles
 * with professional financial services styling.
 */
const TeamMemberCard: React.FC<TeamMemberCardProps> = ({
  name,
  title,
  photoUrl,
  bio,
  credentials = [],
  specialties = [],
  socialLinks = [],
  accentColor,
  interactive = true,
  imageAspectRatio = 1,
  variant = 'primary',
  elevated = true,
  ...restProps
}) => {
  // Function to generate the proper icon for each social platform
  const getSocialIcon = (platform: SocialPlatform) => {
    switch (platform) {
      case 'linkedin':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M6 9H2V21H6V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M4 6C5.10457 6 6 5.10457 6 4C6 2.89543 5.10457 2 4 2C2.89543 2 2 2.89543 2 4C2 5.10457 2.89543 6 4 6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'twitter':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M23 3.01006C22.0424 3.68553 20.9821 4.20217 19.86 4.54006C19.2577 3.84757 18.4573 3.35675 17.567 3.13398C16.6767 2.91122 15.7395 2.96725 14.8821 3.29451C14.0247 3.62177 13.2884 4.20446 12.773 4.96377C12.2575 5.72309 11.9877 6.62239 12 7.54006V8.54006C10.2426 8.58562 8.50127 8.19587 6.93101 7.4055C5.36074 6.61513 4.01032 5.44869 3 4.01006C3 4.01006 -1 13.0101 8 17.0101C5.94053 18.408 3.48716 19.109 1 19.0101C10 24.0101 21 19.0101 21 7.51006C20.9991 7.23151 20.9723 6.95365 20.92 6.68006C21.9406 5.67355 22.6608 4.40277 23 3.01006Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'email':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'phone':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4741 21.8325 20.7293C21.7209 20.9845 21.5573 21.2136 21.3521 21.4019C21.1468 21.5901 20.905 21.7335 20.6412 21.8227C20.3773 21.9119 20.0976 21.9451 19.82 21.92C16.7428 21.5856 13.787 20.5341 11.19 18.85C8.77383 17.3147 6.72534 15.2662 5.19 12.85C3.49997 10.2412 2.44824 7.27097 2.12 4.18C2.09501 3.90344 2.12788 3.62476 2.2165 3.36162C2.30513 3.09849 2.44757 2.85738 2.63477 2.65322C2.82196 2.44906 3.04981 2.28637 3.30379 2.17524C3.55778 2.06411 3.83214 2.00729 4.11 2H7.11C7.59531 1.99522 8.06579 2.16708 8.43376 2.48353C8.80173 2.79999 9.04208 3.23945 9.11 3.72C9.23662 4.68007 9.47144 5.62273 9.81 6.53C9.94455 6.88792 9.97366 7.27691 9.8939 7.65088C9.81415 8.02485 9.62886 8.36811 9.36 8.64L8.09 9.91C9.51355 12.4135 11.5865 14.4865 14.09 15.91L15.36 14.64C15.6319 14.3711 15.9752 14.1858 16.3491 14.1061C16.7231 14.0263 17.1121 14.0554 17.47 14.19C18.3773 14.5286 19.3199 14.7634 20.28 14.89C20.7658 14.9585 21.2094 15.2032 21.5265 15.5775C21.8437 15.9518 22.0122 16.4296 22 16.92Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'website':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      default:
        return null;
    }
  };
  
  return (
    <StyledTeamMemberCard
      variant={variant}
      elevated={elevated}
      interactive={interactive}
      $accentColor={accentColor}
      $hasImage={!!photoUrl}
      {...restProps}
    >
      <CardContent>
        <PhotoContainer $aspectRatio={imageAspectRatio}>
          <MemberPhoto src={photoUrl} alt={name} />
          {accentColor && <PhotoOverlay $accentColor={accentColor} />}
        </PhotoContainer>
        
        <ContentContainer>
          <NameContainer>
            <MemberName>{name}</MemberName>
            <MemberTitle>{title}</MemberTitle>
          </NameContainer>
          
          {bio && (
            <MemberBio>
              {bio}
            </MemberBio>
          )}
          
          {credentials.length > 0 && (
            <CredentialsContainer>
              {credentials.map((credential, index) => (
                <Credential key={`credential-${index}`}>
                  {credential}
                </Credential>
              ))}
            </CredentialsContainer>
          )}
          
          {specialties.length > 0 && (
            <SpecialtiesContainer>
              <SpecialtiesLabel>Specialties:</SpecialtiesLabel>
              <SpecialtiesList>
                {specialties.map((specialty, index) => (
                  <Specialty key={`specialty-${index}`}>
                    {specialty}
                  </Specialty>
                ))}
              </SpecialtiesList>
            </SpecialtiesContainer>
          )}
          
          {socialLinks.length > 0 && (
            <SocialLinksContainer>
              {socialLinks.map((link, index) => (
                <SocialLinkItem 
                  key={`social-${index}`}
                  href={link.url}
                  target={link.platform !== 'phone' && link.platform !== 'email' ? '_blank' : undefined}
                  rel={link.platform !== 'phone' && link.platform !== 'email' ? 'noopener noreferrer' : undefined}
                  $accentColor={accentColor}
                >
                  <SocialIcon>
                    {getSocialIcon(link.platform)}
                  </SocialIcon>
                  {link.label && <SocialLabel>{link.label}</SocialLabel>}
                </SocialLinkItem>
              ))}
            </SocialLinksContainer>
          )}
        </ContentContainer>
      </CardContent>
    </StyledTeamMemberCard>
  );
};

// Styled components
interface StyledTeamMemberCardProps {
  $accentColor?: string;
  $hasImage: boolean;
}

const StyledTeamMemberCard = styled(Card)<StyledTeamMemberCardProps>`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(${PHI_INVERSE}, 0, ${1 - PHI_INVERSE}, 1);
  
  &:hover {
    transform: translateY(-${FIBONACCI[4]}px);
    box-shadow: ${props => props.theme.shadows.lg};
  }
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

interface PhotoContainerProps {
  $aspectRatio: number;
}

const PhotoContainer = styled.div<PhotoContainerProps>`
  position: relative;
  width: 100%;
  padding-top: ${props => `calc(100% / ${props.$aspectRatio})`};
  overflow: hidden;
`;

const MemberPhoto = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s cubic-bezier(${PHI_INVERSE}, 0, ${1 - PHI_INVERSE}, 1);
  
  ${StyledTeamMemberCard}:hover & {
    transform: scale(${1 + PHI_INVERSE * 0.1});
  }
`;

interface PhotoOverlayProps {
  $accentColor: string;
}

const PhotoOverlay = styled.div<PhotoOverlayProps>`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: ${FIBONACCI[5]}px;
  background-color: ${props => props.$accentColor};
  opacity: 0.8;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: ${FIBONACCI[6]}px;
`;

const NameContainer = styled.div`
  margin-bottom: ${FIBONACCI[5]}px;
`;

const MemberName = styled.h3`
  font-family: ${props => props.theme.typography.fontFamily.heading};
  font-size: ${props => props.theme.typography.fontSize.lg}px;
  font-weight: ${props => props.theme.typography.fontWeight.semiBold};
  margin: 0 0 ${FIBONACCI[3]}px 0;
  color: ${props => props.theme.colors.text.primary};
`;

const MemberTitle = styled.div`
  font-size: ${props => props.theme.typography.fontSize.md}px;
  color: ${props => props.theme.colors.primary[600]};
  font-style: italic;
`;

const MemberBio = styled.p`
  font-size: ${props => props.theme.typography.fontSize.sm}px;
  line-height: 1.6;
  color: ${props => props.theme.colors.text.primary};
  margin: 0 0 ${FIBONACCI[6]}px 0;
`;

const CredentialsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${FIBONACCI[4]}px;
  margin-bottom: ${FIBONACCI[5]}px;
`;

const Credential = styled.span`
  display: inline-block;
  padding: ${FIBONACCI[3]}px ${FIBONACCI[5]}px;
  background-color: ${props => props.theme.colors.background[100]};
  border-radius: ${props => props.theme.radius.sm}px;
  font-size: ${props => props.theme.typography.fontSize.xs}px;
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  color: ${props => props.theme.colors.text.secondary};
`;

const SpecialtiesContainer = styled.div`
  margin-bottom: ${FIBONACCI[6]}px;
`;

const SpecialtiesLabel = styled.div`
  font-size: ${props => props.theme.typography.fontSize.sm}px;
  font-weight: ${props => props.theme.typography.fontWeight.semiBold};
  margin-bottom: ${FIBONACCI[4]}px;
  color: ${props => props.theme.colors.text.primary};
`;

const SpecialtiesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${FIBONACCI[3]}px ${FIBONACCI[4]}px;
`;

const Specialty = styled.span`
  font-size: ${props => props.theme.typography.fontSize.xs}px;
  color: ${props => props.theme.colors.text.secondary};
  
  &:not(:last-child)::after {
    content: '•';
    display: inline-block;
    margin-left: ${FIBONACCI[4]}px;
    color: ${props => props.theme.colors.text.tertiary};
  }
`;

const SocialLinksContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${FIBONACCI[4]}px;
  margin-top: auto;
  padding-top: ${FIBONACCI[5]}px;
  border-top: 1px solid ${props => props.theme.colors.background[200]};
`;

interface SocialLinkItemProps {
  $accentColor?: string;
}

const SocialLinkItem = styled.a<SocialLinkItemProps>`
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  color: ${props => props.theme.colors.text.secondary};
  transition: color 0.2s ease;
  
  &:hover {
    color: ${props => props.$accentColor || props.theme.colors.primary[500]};
  }
`;

const SocialIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SocialLabel = styled.span`
  margin-left: ${FIBONACCI[3]}px;
  font-size: ${props => props.theme.typography.fontSize.xs}px;
`;

export default TeamMemberCard; 