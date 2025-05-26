/**
 * AwardsSection Component
 * 
 * A complete section for displaying awards recognition on the website.
 * Uses professional 8-point grid system for spacing and alignment.
 */

import * as React from 'react';
import styled from 'styled-components';
import { PREMIUM_SPACING } from '@design-system/tokens/spacing';

import { Section } from '@design-system/components/layout/Section';
import { Box } from '@design-system/components/layout/Box';
import SectionTitle from '@design-system/components/layout/Section/SectionTitle';
import { Text } from '@design-system/components/typography/Text';
import { FadeIn } from '@design-system/components/animation/FadeIn';
import AwardsShowcase from './AwardsShowcase';
import { Award } from './AwardsShowcase';

// Icons import from Feather icons with proper type handling
import { FiStar, FiAward, FiGift, FiFileText, FiShield } from 'react-icons/fi';

// Wrapper components for React Icons to resolve TypeScript issues
const StarIcon: React.FC = FiStar as React.FC;
const AwardIcon: React.FC = FiAward as React.FC;
const GiftIcon: React.FC = FiGift as React.FC;
const FileTextIcon: React.FC = FiFileText as React.FC;
const ShieldIcon: React.FC = FiShield as React.FC;

// Props interface for the AwardsSection component
interface AwardsSectionProps {
  /** Title of the awards section */
  title?: string;
  
  /** Subtitle or description */
  subtitle?: string;
  
  /** Custom intro text */
  introText?: string;
  
  /** List of awards to display */
  awards?: Award[];
  
  /** Whether to show an initial featured award */
  showFeatured?: boolean;
  
  /** Background color for the section */
  backgroundColor?: string;
  
  /** Text color for the section */
  textColor?: string;
  
  /** Additional CSS class */
  className?: string;
}

const StyledSection = styled(Section)<{
  $backgroundColor?: string;
  $textColor?: string;
}>`
  position: relative;
  padding: ${PREMIUM_SPACING.xl * 2}px 0;
  background-color: ${props => props.$backgroundColor || 'transparent'};
  color: ${props => props.$textColor || 'inherit'};
  overflow: hidden;
`;

const ContentContainer = styled.div`
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${PREMIUM_SPACING.lg}px;
`;

const IntroContent = styled.div`
  text-align: center;
  margin-bottom: ${PREMIUM_SPACING.xl}px;
`;

const IntroText = styled(Text)`
  max-width: 800px;
  margin: ${PREMIUM_SPACING.md}px auto 0;
  font-size: 18px;
  line-height: 1.6;
`;

// Professional decorative elements for financial services
const ProfessionalAccent = styled.div`
  position: absolute;
  width: 100px;
  height: 2px;
  background: linear-gradient(90deg, #D4AF37 0%, transparent 100%);
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
`;

// Financial recovery awards data
const sampleAwards: Award[] = [
  {
    id: 'award-1',
    title: 'Excellence in Financial Recovery',
    description: 'Awarded for outstanding contribution to financial asset recovery services and client success rates',
    year: 2023,
    issuedBy: 'Financial Recovery Association',
    variant: 'gold',
    shape: 'circle',
    icon: <StarIcon />,
    detailsUrl: '/awards/excellence-recovery'
  },
  {
    id: 'award-2',
    title: 'Best Asset Recovery Firm',
    description: 'Recognized as the top asset recovery firm in the region for client satisfaction and recovery success',
    year: 2022,
    issuedBy: 'Financial Services Awards',
    variant: 'gold',
    shape: 'shield',
    icon: <ShieldIcon />,
    detailsUrl: '/awards/best-firm'
  },
  {
    id: 'award-3',
    title: 'Innovation in Recovery Technology',
    description: 'Pioneering new approaches to financial asset recovery through advanced technology and methodology',
    year: 2021,
    issuedBy: 'FinTech Innovation Board',
    variant: 'silver',
    shape: 'laurel',
    icon: <AwardIcon />,
    detailsUrl: '/awards/innovation-tech'
  },
  {
    id: 'award-4',
    title: 'Regulatory Compliance Excellence',
    description: 'Meeting and exceeding industry standards for compliance, security, and ethical business practices',
    year: 2020,
    issuedBy: 'Financial Conduct Authority',
    variant: 'certification',
    shape: 'ribbon',
    icon: <FileTextIcon />,
    detailsUrl: '/awards/compliance-excellence'
  },
  {
    id: 'award-5',
    title: 'Client Trust & Security Award',
    description: 'Commitment to maintaining the highest standards of client confidentiality and data security',
    year: 2019,
    issuedBy: 'Financial Security Institute',
    variant: 'recognition',
    shape: 'circle',
    customColor: '#0A4021',
    icon: <GiftIcon />,
    detailsUrl: '/awards/client-trust'
  }
];

// AwardsSection component implementation
const AwardsSection: React.FC<AwardsSectionProps> = ({
  title = 'Our Recognition & Awards',
  subtitle = 'Celebrating Excellence in Financial Recovery',
  introText = 'We are honored to be recognized by leading financial regulatory bodies and industry organizations for our commitment to excellence, innovation, and integrity in financial asset recovery services.',
  awards = sampleAwards,
  showFeatured = true,
  backgroundColor,
  textColor,
  className
}) => {
  // Handle award click
  const handleAwardClick = (award: Award) => {
    console.log('Award clicked:', award.title);
    // You could navigate to the award details page or open a modal here
    if (award.detailsUrl) {
      // window.location.href = award.detailsUrl;
      console.log('Navigating to:', award.detailsUrl);
    }
  };

  return (
    <StyledSection 
      $backgroundColor={backgroundColor} 
      $textColor={textColor}
      className={className}
    >
      <ContentContainer>
        {/* Section intro */}
        <IntroContent>
          <ProfessionalAccent />
          <FadeIn duration={600}>
            <SectionTitle title={title} />
            {subtitle && (
              <Text 
                size="lg"
                mt={PREMIUM_SPACING.sm}
                fontWeight="medium"
                style={{ color: '#0A214F' }}
              >
                {subtitle}
              </Text>
            )}
            {introText && (
              <IntroText>{introText}</IntroText>
            )}
          </FadeIn>
        </IntroContent>
        
        {/* Featured award showcase */}
        {showFeatured && awards.length > 0 && (
          <Box mb={PREMIUM_SPACING.xl}>
            <AwardsShowcase 
              awards={[awards[0]]} 
              displayMode="featured"
              showDetailsOnClick={true}
              showBotanical={false}
              onAwardSelect={handleAwardClick}
            />
          </Box>
        )}
        
        {/* All awards showcase */}
        <AwardsShowcase 
          awards={awards}
          displayMode="grid"
          showDetailsOnClick={true}
          showBotanical={false}
          onAwardSelect={handleAwardClick}
        />
      </ContentContainer>
    </StyledSection>
  );
};

export default AwardsSection;
