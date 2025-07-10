/**
 * Team Component
 * 
 * A feature section for displaying team members in a grid layout following sacred
 * geometry principles. The component supports various display styles and botanical
 * accents for visual harmony.
 */

import * as React from 'react';
import styled from 'styled-components';
import { DefaultTheme } from 'styled-components';
import { getFibonacciByIndex } from '../../../constants/sacred-geometry';
import { PHI, PHI_INVERSE, FIBONACCI } from '../../../constants/sacred-geometry';
import { Box } from '../layout/Box';
import { Section, SectionTitle } from '../layout/Section';
import Card from '../data-display/Card';
import { Text } from '../typography/Text';
import { Heading } from '../typography/Heading';
import { BotanicalElement } from '../botanical';
import { BotanicalPosition } from '../botanical/botanicalUtils';
import { FadeIn, ScaleFade } from '../animation';
import { Button } from '../button/Button';
import { TeamProps, TeamMember, FeatureCTA } from '../../types/feature-sections.types';
import { BotanicalDecoration, BotanicalElementType } from '../../types/botanical.types';

// Reexport the types for external use
export type { TeamProps, TeamMember } from '../../types/feature-sections.types';

// Section container with background styling
const TeamSection = styled(Section)<{ $backgroundColor?: string }>`
  position: relative;
  background: ${props => props.$backgroundColor || 'transparent'};
  padding: ${getFibonacciByIndex(8)}px 0;
  overflow: hidden;
`;

// Team grid with golden ratio proportions
const TeamGrid = styled.div<{ $columns: number }>`
  display: grid;
  grid-template-columns: repeat(${props => props.$columns}, 1fr);
  gap: ${getFibonacciByIndex(6)}px;
  margin-top: ${getFibonacciByIndex(7)}px;
  
  @media (max-width: ${props => props.theme.breakpoints.lg}px) {
    grid-template-columns: repeat(${props => Math.min(props.$columns - 1, 2)}, 1fr);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.md}px) {
    grid-template-columns: repeat(1, 1fr);
    gap: ${getFibonacciByIndex(5)}px;
  }
`;

// Team member card with golden ratio proportions
const MemberCard = styled(Card)<{ $accentColor?: string }>`
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  
  /* Use sacred proportions for padding */
  padding: 0;
  
  /* Accent bar if color provided */
  ${props => props.$accentColor && `
    border-top: 3px solid ${props.$accentColor};
  `}
  
  /* Hover effect with sacred geometry timing */
  transition: transform 0.3s cubic-bezier(${PHI_INVERSE}, 0, ${PHI_INVERSE}, 1);
  
  &:hover {
    transform: translateY(-${getFibonacciByIndex(2)}px);
  }
`;

// Photo container with golden ratio aspect ratio
const PhotoContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: ${PHI_INVERSE * 100}%; /* Golden ratio aspect ratio */
  overflow: hidden;
`;

const Photo = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
  
  /* Specific positioning for each team member based on their photo */
  &[alt*="Alex Bianchi"] {
    object-position: center 35%; /* Alex's photo needs more room for his face */
  }
  
  &[alt*="Mark Marandola"] {
    object-position: center 40%; /* Mark's photo composition needs different positioning */
  }
  
  &[alt*="Jessica Davies"] {
    object-position: center 25%; /* Jessica's photo works well with standard positioning */
  }
  
  &[alt*="Claire Lee"] {
    object-position: center 30%; /* Claire's photo needs slight adjustment */
  }
  
  /* Fallback for any other photos */
  &:not([alt*="Alex Bianchi"]):not([alt*="Mark Marandola"]):not([alt*="Jessica Davies"]):not([alt*="Claire Lee"]) {
    object-position: center 25%;
  }
`;

// Content container with sacred spacing
const ContentContainer = styled.div`
  padding: ${getFibonacciByIndex(5)}px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

// Member name with proper typography
const MemberName = styled(Heading)`
  margin-bottom: ${getFibonacciByIndex(3)}px;
  
  /* Apply sacred geometry to line height */
  line-height: ${PHI};
`;

// Member role with decreased opacity using golden ratio
const MemberRole = styled(Text)`
  margin-bottom: ${getFibonacciByIndex(4)}px;
  /* Apply golden ratio to opacity for visual harmony */
  opacity: ${PHI_INVERSE + 0.2};
`;

// Bio text with proper line height
const MemberBio = styled(Text)`
  margin-top: ${getFibonacciByIndex(4)}px;
  /* Apply sacred geometry to line height */
  line-height: ${PHI};
  flex: 1;
`;

// Specialties list with sacred spacing
const SpecialtiesList = styled.div`
  margin-top: ${getFibonacciByIndex(4)}px;
  display: flex;
  flex-wrap: wrap;
  gap: ${getFibonacciByIndex(2)}px;
`;

const SpecialtyTag = styled.div`
  background-color: rgba(0, 0, 0, 0.05);
  padding: ${getFibonacciByIndex(2)}px ${getFibonacciByIndex(3)}px;
  border-radius: ${getFibonacciByIndex(2)}px;
  font-size: 0.8em;
`;

// Links container with sacred spacing
const LinksContainer = styled.div`
  display: flex;
  gap: ${getFibonacciByIndex(3)}px;
  margin-top: ${getFibonacciByIndex(4)}px;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${getFibonacciByIndex(5)}px;
  height: ${getFibonacciByIndex(5)}px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.05);
  color: ${props => props.theme.colors.primary[500] ?? 1};
  
  &:hover {
    background-color: ${props => props.theme.colors.primary[500] ?? 1};
    color: white;
  }
`;

// List layout styles
const MemberListItem = styled.div`
  display: flex;
  margin-bottom: ${getFibonacciByIndex(6)}px;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    flex-direction: column;
  }
`;

const MemberListPhoto = styled.div`
  width: ${getFibonacciByIndex(9)}px;
  min-width: ${getFibonacciByIndex(9)}px;
  height: ${getFibonacciByIndex(9)}px;
  overflow: hidden;
  margin-right: ${getFibonacciByIndex(6)}px;
  border-radius: ${getFibonacciByIndex(2)}px;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    width: 100%;
    min-width: auto;
    height: auto;
    aspect-ratio: ${PHI};
    margin-right: 0;
    margin-bottom: ${getFibonacciByIndex(5)}px;
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    image-rendering: -webkit-optimize-contrast;
    image-rendering: crisp-edges;
    
    /* Specific positioning for each team member based on their photo */
    &[alt*="Alex Bianchi"] {
      object-position: center 35%; /* Alex's photo needs more room for his face */
    }
    
    &[alt*="Mark Marandola"] {
      object-position: center 40%; /* Mark's photo composition needs different positioning */
    }
    
    &[alt*="Jessica Davies"] {
      object-position: center 25%; /* Jessica's photo works well with standard positioning */
    }
    
    &[alt*="Claire Lee"] {
      object-position: center 30%; /* Claire's photo needs slight adjustment */
    }
    
    /* Fallback for any other photos */
    &:not([alt*="Alex Bianchi"]):not([alt*="Mark Marandola"]):not([alt*="Jessica Davies"]):not([alt*="Claire Lee"]) {
      object-position: center 25%;
    }
  }
`;

const MemberListContent = styled.div`
  flex: 1;
`;

// Featured layout styles
const FeaturedContainer = styled.div`
  margin-top: ${getFibonacciByIndex(7)}px;
`;

const FeaturedMember = styled.div`
  display: flex;
  margin-bottom: ${getFibonacciByIndex(7)}px;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    flex-direction: column;
  }
`;

const FeaturedPhotoContainer = styled.div`
  width: 40%;
  padding-right: ${getFibonacciByIndex(6)}px;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    width: 100%;
    padding-right: 0;
    padding-bottom: ${getFibonacciByIndex(6)}px;
  }
`;

const FeaturedContentContainer = styled.div`
  flex: 1;
`;

const RegularTeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${getFibonacciByIndex(6)}px;
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

// CTA container
const CTAContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${getFibonacciByIndex(7)}px;
`;

/**
 * Team component for displaying team members in various layouts,
 * following sacred geometry principles for spacing and proportions.
 */
const Team: React.FC<TeamProps> = ({
  title,
  subtitle,
  members,
  displayStyle = 'grid',
  columns = 3,
  backgroundColor,
  showDetailedBio = false,
  animated = true,
  botanical,
  cta,
  className,
  style,
}) => {
  /**
   * Get the appropriate social media icon based on link type
   */
  const getSocialIcon = (type: string) => {
    switch (type) {
      case 'linkedin':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 3H5C3.895 3 3 3.895 3 5V19C3 20.105 3.895 21 5 21H19C20.105 21 21 20.105 21 19V5C21 3.895 20.105 3 19 3ZM9 17H6.477V10H9V17ZM7.694 8.717C6.923 8.717 6.408 8.203 6.408 7.517C6.408 6.831 6.922 6.317 7.779 6.317C8.55 6.317 9.065 6.831 9.065 7.517C9.065 8.203 8.551 8.717 7.694 8.717ZM18 17H15.558V13.174C15.558 12.116 14.907 11.872 14.663 11.872C14.419 11.872 13.605 12.035 13.605 13.174C13.605 13.337 13.605 17 13.605 17H11.082V10H13.605V10.977C13.93 10.407 14.581 10 15.802 10C17.023 10 18 10.977 18 13.174V17Z" />
          </svg>
        );
      case 'email':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" />
          </svg>
        );
      case 'website':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.99 2C6.47 2 2 6.48 2 12C2 17.52 6.47 22 11.99 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 11.99 2ZM18.92 8H15.97C15.65 6.75 15.19 5.55 14.59 4.44C16.43 5.07 17.96 6.35 18.92 8ZM12 4.04C12.83 5.24 13.48 6.57 13.91 8H10.09C10.52 6.57 11.17 5.24 12 4.04ZM4.26 14C4.1 13.36 4 12.69 4 12C4 11.31 4.1 10.64 4.26 10H7.64C7.56 10.66 7.5 11.32 7.5 12C7.5 12.68 7.56 13.34 7.64 14H4.26ZM5.08 16H8.03C8.35 17.25 8.81 18.45 9.41 19.56C7.57 18.93 6.04 17.66 5.08 16ZM8.03 8H5.08C6.04 6.34 7.57 5.07 9.41 4.44C8.81 5.55 8.35 6.75 8.03 8ZM12 19.96C11.17 18.76 10.52 17.43 10.09 16H13.91C13.48 17.43 12.83 18.76 12 19.96ZM14.34 14H9.66C9.57 13.34 9.5 12.68 9.5 12C9.5 11.32 9.57 10.65 9.66 10H14.34C14.43 10.65 14.5 11.32 14.5 12C14.5 12.68 14.43 13.34 14.34 14ZM14.59 19.56C15.19 18.45 15.65 17.25 15.97 16H18.92C17.96 17.65 16.43 18.93 14.59 19.56ZM16.36 14C16.44 13.34 16.5 12.68 16.5 12C16.5 11.32 16.44 10.66 16.36 10H19.74C19.9 10.64 20 11.31 20 12C20 12.69 19.9 13.36 19.74 14H16.36Z" />
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
      default:
        return null;
    }
  };
  
  /**
   * Render an individual team member card
   */
  const renderMemberCard = (member: TeamMember, index: number) => {
    const content = (
      <MemberCard $accentColor={member.accentColor}>
        <PhotoContainer>
          <Photo src={member.photoUrl} alt={member.name} />
        </PhotoContainer>
        
        <ContentContainer>
          <MemberName variant="h4">{member.name}</MemberName>
          <MemberRole variant="subtitle2">{member.role}</MemberRole>
          
          {showDetailedBio && member.bio && (
            <MemberBio variant="body2">{member.bio}</MemberBio>
          )}
          
          {member.specialties && member.specialties.length > 0 && (
            <SpecialtiesList>
              {member.specialties.map((specialty, idx) => (
                <SpecialtyTag key={idx}>{specialty}</SpecialtyTag>
              ))}
            </SpecialtiesList>
          )}
          
          {member.links && member.links.length > 0 && (
            <LinksContainer>
              {member.links.map((link, idx) => (
                <SocialLink 
                  key={idx} 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label={link.label || link.type}
                >
                  {getSocialIcon(link.type)}
                </SocialLink>
              ))}
            </LinksContainer>
          )}
        </ContentContainer>
      </MemberCard>
    );
    
    if (animated) {
      return (
        <ScaleFade key={member.id} delay={index * 0.1}>
          {content}
        </ScaleFade>
      );
    }
    
    return <div key={member.id}>{content}</div>;
  };
  
  /**
   * Render a team member in list format
   */
  const renderMemberListItem = (member: TeamMember, index: number) => {
    const content = (
      <MemberListItem key={member.id}>
        <MemberListPhoto>
          <img src={member.photoUrl} alt={member.name} />
        </MemberListPhoto>
        
        <MemberListContent>
          <MemberName variant="h4">{member.name}</MemberName>
          <MemberRole variant="subtitle2">{member.role}</MemberRole>
          
          {member.bio && (
            <MemberBio variant="body2">{member.bio}</MemberBio>
          )}
          
          {member.specialties && member.specialties.length > 0 && (
            <SpecialtiesList>
              {member.specialties.map((specialty, idx) => (
                <SpecialtyTag key={idx}>{specialty}</SpecialtyTag>
              ))}
            </SpecialtiesList>
          )}
          
          {member.links && member.links.length > 0 && (
            <LinksContainer>
              {member.links.map((link, idx) => (
                <SocialLink 
                  key={idx} 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label={link.label || link.type}
                >
                  {getSocialIcon(link.type)}
                </SocialLink>
              ))}
            </LinksContainer>
          )}
        </MemberListContent>
      </MemberListItem>
    );
    
    if (animated) {
      return (
        <FadeIn key={member.id} delay={index * 0.1}>
          {content}
        </FadeIn>
      );
    }
    
    return content;
  };
  
  /**
   * Render team members in a grid layout
   */
  const renderGrid = () => {
    return (
      <TeamGrid $columns={columns}>
        {members.map((member, index) => renderMemberCard(member, index))}
      </TeamGrid>
    );
  };
  
  /**
   * Render team members in a list layout
   */
  const renderList = () => {
    return (
      <div>
        {members.map((member, index) => renderMemberListItem(member, index))}
      </div>
    );
  };
  
  /**
   * Render team with a featured member and grid
   */
  const renderFeatured = () => {
    if (members.length === 0) return null;
    
    const [featured, ...rest] = members;
    
    return (
      <FeaturedContainer>
        <FeaturedMember>
          <FeaturedPhotoContainer>
            <PhotoContainer>
              <Photo src={featured.photoUrl} alt={featured.name} />
            </PhotoContainer>
          </FeaturedPhotoContainer>
          
          <FeaturedContentContainer>
            <MemberName variant="h3">{featured.name}</MemberName>
            <MemberRole variant="subtitle1">{featured.role}</MemberRole>
            
            {featured.bio && (
              <MemberBio variant="body1">{featured.bio}</MemberBio>
            )}
            
            {featured.specialties && featured.specialties.length > 0 && (
              <SpecialtiesList>
                {featured.specialties.map((specialty, idx) => (
                  <SpecialtyTag key={idx}>{specialty}</SpecialtyTag>
                ))}
              </SpecialtiesList>
            )}
            
            {featured.links && featured.links.length > 0 && (
              <LinksContainer>
                {featured.links.map((link, idx) => (
                  <SocialLink 
                    key={idx} 
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label={link.label || link.type}
                  >
                    {getSocialIcon(link.type)}
                  </SocialLink>
                ))}
              </LinksContainer>
            )}
          </FeaturedContentContainer>
        </FeaturedMember>
        
        {rest.length > 0 && (
          <RegularTeamGrid>
            {rest.map((member, index) => renderMemberCard(member, index + 1))}
          </RegularTeamGrid>
        )}
      </FeaturedContainer>
    );
  };
  
  /**
   * Render team based on the selected display style
   */
  const renderTeam = () => {
    switch (displayStyle) {
      case 'list':
        return renderList();
      case 'featured':
        return renderFeatured();
      case 'grid':
      default:
        return renderGrid();
    }
  };
  
  return (
    <TeamSection
      $backgroundColor={backgroundColor}
      className={className}
      style={style}
    >
      {botanical && typeof botanical !== 'boolean' && (
        <BotanicalElement
          variant={botanical.type}
          size={botanical.size || 'lg'}
          opacity={botanical.opacity || 0.1}
        />
      )}
      
      {botanical && typeof botanical === 'boolean' && (
        <BotanicalElement
          variant="oliveBranch"
          size="lg"
          opacity={0.1}
        />
      )}
      
      <SectionTitle title={title} subtitle={subtitle} align="center" />
      
      {renderTeam()}
      
      {cta && (
        <CTAContainer>
          <Button variant={cta.variant || 'primary'} href={cta.url}>
            {cta.label}
          </Button>
        </CTAContainer>
      )}
    </TeamSection>
  );
};

export default Team; 







