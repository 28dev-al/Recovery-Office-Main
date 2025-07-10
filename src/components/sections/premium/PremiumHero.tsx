import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { PREMIUM_SPACING } from '../../../design-system/tokens';
import { Button } from '../../../design-system/components/button/Button';
import { Box } from '../../../design-system/components/layout/Box';
import { Container } from '../../../design-system/components/layout/Container';
import { RecoveryOfficeLogo } from '../../branding';
import { scrollToSection } from '../../../utils/scrollUtils';
import { debugLog } from '../../../utils/removeConsole';

// Abstract background pattern using premium colors
const BackgroundPattern = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg,
    #1a365d 0%,    /* Primary Navy */
    #2c5282 50%,   /* Lighter Navy */
    #1a365d 100%   /* Back to Primary Navy */
  );
  opacity: 1;
  z-index: 1;

  /* Add subtle financial pattern overlay */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background:
      radial-gradient(circle at 25% 25%, rgba(214, 158, 46, 0.08) 0%, transparent 50%),
      radial-gradient(circle at 75% 75%, rgba(214, 158, 46, 0.05) 0%, transparent 50%),
      linear-gradient(90deg, transparent 24%, rgba(214, 158, 46, 0.03) 25%, rgba(214, 158, 46, 0.03) 26%, transparent 27%, transparent 74%, rgba(214, 158, 46, 0.03) 75%, rgba(214, 158, 46, 0.03) 76%, transparent 77%, transparent);
    background-size: 60px 60px, 80px 80px, 40px 40px;
    z-index: 1;
  }

  /* Add professional geometric overlay */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image:
      linear-gradient(30deg, rgba(214, 158, 46, 0.1) 12%, transparent 12.5%, transparent 87%, rgba(214, 158, 46, 0.1) 87.5%),
      linear-gradient(150deg, rgba(214, 158, 46, 0.05) 12%, transparent 12.5%, transparent 87%, rgba(214, 158, 46, 0.05) 87.5%);
    background-size: 60px 104px, 120px 208px;
    pointer-events: none;
    z-index: 2;
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
  background-color: #1a365d; /* Fallback to primary navy */
  
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
  z-index: 3;
  width: 100%;
  
  /* Ensure text is always readable */
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const HeroContent = styled(motion.div)`
  max-width: 750px;
  position: relative;
`;

const HeroTitle = styled(motion.h1)`
  font-family: 'Playfair Display', serif;
  font-size: 4.5rem;
  font-weight: 700;
  margin-bottom: ${PREMIUM_SPACING.md}px;
  line-height: 1.2;
  text-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  
  /* Add gold accent to key words */
  .accent {
    color: #d69e2e;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  }
  
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
  opacity: 0.95;
  max-width: 700px;
  color: rgba(255, 255, 255, 0.9);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  
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
  background: linear-gradient(135deg, #d69e2e 0%, #f6d55c 100%);
  color: #1a365d;
  border: none;
  box-shadow: 0 4px 15px rgba(214, 158, 46, 0.3);
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 700;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(214, 158, 46, 0.4);
  }
`;

const SecondaryButton = styled(Button)`
  border: 2px solid rgba(255, 255, 255, 0.3);
  background-color: transparent;
  color: white;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  font-weight: 600;
  
  &:hover {
    border-color: #d69e2e;
    background: rgba(214, 158, 46, 0.1);
    transform: translateY(-2px);
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
    #d69e2e, 
    transparent
  );
  opacity: 0.5;
  z-index: 1;
`;

// Trust badges for credibility
const TrustBadges = styled(motion.div)`
  display: flex;
  gap: 32px;
  margin-top: 40px;
  flex-wrap: wrap;
  align-items: center;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}px) {
    gap: 16px;
    margin-top: 32px;
  }
`;

const TrustBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.9);
  
  .icon {
    color: #d69e2e;
    font-size: 16px;
  }
`;

interface PremiumHeroProps {
  /**
   * Hero title - can be string or JSX for styled text
   */
  title: string | React.ReactNode;
  
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
  const navigate = useNavigate();
  
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

  const handlePrimaryClick = () => {
    debugLog('[PremiumHero] Primary button clicked:', primaryButtonUrl);
    if (primaryButtonUrl.startsWith('/')) {
      navigate(primaryButtonUrl);
    } else {
      window.location.href = primaryButtonUrl;
    }
  };

  const handleSecondaryClick = () => {
    debugLog('[PremiumHero] Secondary button clicked:', secondaryButtonText);
    
    // If it's "Learn More", try to scroll to services section first
    if (secondaryButtonText.toLowerCase().includes('learn more')) {
      const servicesElement = document.getElementById('services-section');
      if (servicesElement) {
        scrollToSection('services-section');
        return;
      }
    }
    
    // Fallback to navigation
    if (secondaryButtonUrl.startsWith('/')) {
      navigate(secondaryButtonUrl);
    } else {
      window.location.href = secondaryButtonUrl;
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
                <motion.div 
                  variants={itemVariants}
                  style={{ marginBottom: PREMIUM_SPACING.xl }}
                >
                  <RecoveryOfficeLogo 
                    size="xl" 
                    variant="white"
                    showText={true}
                    showCredentials={false}
                  />
                </motion.div>
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
                    as="button"
                    onClick={handlePrimaryClick}
                  >
                    {primaryButtonText}
                  </PrimaryCTA>
                )}
                
                {secondaryButtonText && (
                  <SecondaryButton 
                    as="button"
                    onClick={handleSecondaryClick}
                  >
                    {secondaryButtonText}
                  </SecondaryButton>
                )}
              </HeroButtons>
              
              <TrustBadges variants={itemVariants}>
                <TrustBadge>
                  <span className="icon">🛡️</span>
                  CIRO Regulated
                </TrustBadge>
                <TrustBadge>
                  <span className="icon">⚖️</span>
                  Legal Compliance
                </TrustBadge>
                <TrustBadge>
                  <span className="icon">🏢</span>
                  Toronto Based
                </TrustBadge>
                <TrustBadge>
                  <span className="icon">💰</span>
                  No Recovery, No Fee
                </TrustBadge>
              </TrustBadges>
            </HeroContent>
          </Box>
        </Container>
      </ContentWrapper>
    </HeroSection>
  );
};

export default PremiumHero; 