import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { PREMIUM_SPACING } from '../../../design-system/tokens';
import { Button } from '../../../design-system/components/button/Button';
import { Box } from '../../../design-system/components/layout/Box';
import { Container } from '../../../design-system/components/layout/Container';
import { PREMIUM_COLORS } from '../../../design-system/tokens/colors.premium';

// Abstract background pattern using premium colors
const BackgroundPattern = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    linear-gradient(135deg, 
      ${PREMIUM_COLORS.BASE_COLORS.forest[700]} 0%,
      ${PREMIUM_COLORS.BASE_COLORS.forest[800]} 100%);
  opacity: 0.9;
  z-index: 1;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23${PREMIUM_COLORS.BASE_COLORS.gold[500].replace('#', '')}' fill-opacity='0.07'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    opacity: 0.2;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 30% 40%, rgba(10, 64, 33, 0.4) 0%, rgba(10, 33, 64, 0) 70%),
               radial-gradient(circle at 70% 60%, rgba(212, 175, 55, 0.15) 0%, rgba(212, 175, 55, 0) 70%);
  }
`;

const HeroSection = styled.section`
  position: relative;
  min-height: 85vh;
  color: white;
  padding: 160px 0 120px;
  overflow: hidden;
  display: flex;
  align-items: center;
  background-color: ${PREMIUM_COLORS.BASE_COLORS.gray[800]};
  
  @media (max-width: ${props => props.theme.breakpoints.md}px) {
    min-height: 70vh;
    padding: 140px 0 100px;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}px) {
    padding: 120px 0 80px;
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
`;

const HeroContent = styled(motion.div)`
  max-width: 750px;
  position: relative;
`;

const HeroLogo = styled(motion.img)`
  width: 180px;
  max-width: 100%;
  height: auto;
  margin-bottom: ${PREMIUM_SPACING.xl}px;
  filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.3));
  
  @media (max-width: ${props => props.theme.breakpoints.md}px) {
    width: 150px;
    margin-bottom: ${PREMIUM_SPACING.lg}px;
  }
`;

const HeroTitle = styled(motion.h1)`
  font-family: 'Playfair Display', serif;
  font-size: 4.5rem;
  font-weight: 700;
  margin-bottom: ${PREMIUM_SPACING.md}px;
  line-height: 1.2;
  text-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  
  @media (max-width: ${props => props.theme.breakpoints.md}px) {
    font-size: 3.5rem;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}px) {
    font-size: 2.75rem;
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.4rem;
  line-height: 1.6;
  margin-bottom: ${PREMIUM_SPACING.xl}px;
  opacity: 0.9;
  max-width: 700px;
  color: ${PREMIUM_COLORS.BASE_COLORS.ivory[100]};
  
  @media (max-width: ${props => props.theme.breakpoints.sm}px) {
    font-size: 1.2rem;
  }
`;

const HeroButtons = styled(motion.div)`
  display: flex;
  gap: ${PREMIUM_SPACING.md}px;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}px) {
    flex-direction: column;
    gap: ${PREMIUM_SPACING.sm}px;
  }
`;

const PrimaryCTA = styled(Button)`
  background: linear-gradient(to right, ${PREMIUM_COLORS.BASE_COLORS.gold[500]}, ${PREMIUM_COLORS.BASE_COLORS.gold[400]});
  border: none;
  box-shadow: 0 4px 12px rgba(212, 175, 55, 0.3);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(212, 175, 55, 0.4);
  }
`;

const SecondaryButton = styled(Button)`
  border: 2px solid ${PREMIUM_COLORS.BASE_COLORS.ivory[100]};
  background-color: transparent;
  color: ${PREMIUM_COLORS.BASE_COLORS.ivory[100]};
  transition: all 0.3s ease;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

// Subtle line accent
const AccentLine = styled(motion.div)`
  position: absolute;
  top: 20%;
  left: -100px;
  width: 200px;
  height: 2px;
  background: linear-gradient(90deg, 
    transparent, 
    ${PREMIUM_COLORS.BASE_COLORS.gold[500]}, 
    transparent
  );
  opacity: 0.5;
  z-index: 1;
`;

interface PremiumHeroProps {
  /**
   * Hero title
   */
  title: string;
  
  /**
   * Hero subtitle/description
   */
  subtitle: string;
  
  /**
   * Primary CTA text
   */
  primaryButtonText?: string;
  
  /**
   * Primary CTA URL
   */
  primaryButtonUrl?: string;
  
  /**
   * Secondary CTA text
   */
  secondaryButtonText?: string;
  
  /**
   * Secondary CTA URL
   */
  secondaryButtonUrl?: string;
  
  /**
   * Whether to show the logo
   */
  showLogo?: boolean;
}

const PremiumHero: React.FC<PremiumHeroProps> = ({
  title,
  subtitle,
  primaryButtonText = 'Book Consultation',
  primaryButtonUrl = '/booking',
  secondaryButtonText = 'Learn More',
  secondaryButtonUrl = '/services',
  showLogo = true
}) => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1.0] }
    }
  };
  
  return (
    <HeroSection>
      {/* Premium background with abstract pattern */}
      <BackgroundPattern />
      
      {/* Decorative accent line */}
      <AccentLine 
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: 200, opacity: 0.5 }}
        transition={{ duration: 1.5, delay: 1 }}
      />
      
      <ContentWrapper>
        <Container>
          <Box display="flex" flexDirection="column" alignItems="flex-start">
            <HeroContent
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              {showLogo && (
                <HeroLogo 
                  src="https://images2.imgbox.com/86/72/GE2VLjan_o.png" 
                  alt="Recovery Office – Financial Asset Recovery" 
                  variants={itemVariants}
                />
              )}
              
              <HeroTitle variants={itemVariants}>
                {title}
              </HeroTitle>
              
              <HeroSubtitle variants={itemVariants}>
                {subtitle}
              </HeroSubtitle>
              
              <HeroButtons variants={itemVariants}>
                {primaryButtonText && (
                  <PrimaryCTA 
                    to={primaryButtonUrl}
                    variant="primary"
                    size="lg"
                  >
                    {primaryButtonText}
                  </PrimaryCTA>
                )}
                
                {secondaryButtonText && (
                  <SecondaryButton 
                    to={secondaryButtonUrl}
                    variant="outline"
                    size="lg"
                  >
                    {secondaryButtonText}
                  </SecondaryButton>
                )}
              </HeroButtons>
            </HeroContent>
          </Box>
        </Container>
      </ContentWrapper>
    </HeroSection>
  );
};

export default PremiumHero; 