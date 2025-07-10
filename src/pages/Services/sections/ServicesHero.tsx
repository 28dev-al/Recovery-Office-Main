import * as React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { PHI_INVERSE, SACRED_SPACING } from '../../../constants/sacred-geometry';
import { Button } from '../../../design-system/components/button/Button';
import { PREMIUM_COLORS } from '../../../design-system/tokens/colors.premium';
import { Container } from '../../../design-system/components/layout/Container';

/**
 * ServicesHero component properties
 */
interface ServicesHeroProps {
  /** Main title for the hero section */
  title?: string;
  /** Subtitle or description text */
  subtitle?: string;
  /** Primary CTA text */
  ctaText?: string;
  /** Primary CTA URL */
  ctaUrl?: string;
}

const HeroContainer = styled.section`
  position: relative;
  width: 100%;
  height: 60vh;
  min-height: 500px;
  max-height: 700px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  color: #fff;
  background-color: ${PREMIUM_COLORS.BASE_COLORS.forest[800]};
  
  /* Fix container to accommodate text properly */
  min-height: auto !important;
  height: auto !important;
  padding: 40px 20px !important;
  
  /* German language-specific adjustments */
  html[lang="de"] & {
    min-height: 600px;
    max-height: 800px;
    height: 70vh;
    padding-top: 60px;
    padding-bottom: 80px;
    
    @media (max-width: 768px) {
      min-height: 500px;
      padding-top: 40px;
      padding-bottom: 60px;
    }
    
    @media (min-width: 769px) and (max-width: 1024px) {
      min-height: 550px;
    }
  }
`;

const HeroBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    linear-gradient(135deg, 
      ${PREMIUM_COLORS.BASE_COLORS.forest[700]} 0%,
      ${PREMIUM_COLORS.BASE_COLORS.forest[900]} 100%);
  z-index: 1;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23${PREMIUM_COLORS.BASE_COLORS.gold[500].replace('#', '')}' fill-opacity='0.07'%3E%3Cpath d='M50 0v100M0 50h100M75 0v100M25 0v100M0 75h100M0 25h100'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    opacity: 0.15;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 30% 40%, rgba(10, 33, 79, 0.6) 0%, rgba(10, 33, 79, 0) 70%),
               radial-gradient(circle at 70% 60%, rgba(212, 175, 55, 0.2) 0%, rgba(212, 175, 55, 0) 70%);
  }
`;

const HeroContent = styled(motion.div)`
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: ${900 * PHI_INVERSE}px;
  padding: 0 ${SACRED_SPACING.lg}px;
  text-align: center;
  
  /* German language-specific container adjustments */
  html[lang="de"] & {
    max-width: 1200px;
    padding: 0 2rem;
    
    @media (max-width: 768px) {
      padding: 0 1.5rem;
    }
  }
`;

const HeroTitle = styled(motion.h1)`
  font-family: 'Playfair Display', serif;
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  margin-bottom: ${SACRED_SPACING.md}px;
  line-height: 1.2 !important;
  font-weight: 700;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  
  padding: 20px 0 !important;
  margin-top: 10px !important;
  overflow: visible !important;
  text-overflow: unset !important;
  min-height: fit-content;
  height: auto;
  
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    left: 25%;
    bottom: -12px;
    width: 50%;
    height: 3px;
    background: linear-gradient(to right, transparent, ${PREMIUM_COLORS.BASE_COLORS.gold[500]}, transparent);
  }
  
  html[lang="de"] & {
    font-size: clamp(2.25rem, 4.5vw, 3.25rem);
    line-height: 1.1 !important;
    margin-bottom: 2rem;
    letter-spacing: -0.02em;
    font-weight: 600;
    hyphens: auto;
    word-break: break-word;
    padding: 25px 0 !important;
    
    @media (max-width: 768px) {
      font-size: clamp(1.875rem, 4vw, 2.5rem);
      margin-bottom: 1.5rem;
      padding: 20px 0 !important;
    }
    
    @media (min-width: 769px) and (max-width: 1024px) {
      font-size: clamp(2.5rem, 4.5vw, 3rem);
    }
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: clamp(1.125rem, 2vw, 1.25rem);
  margin-bottom: ${SACRED_SPACING.xl}px;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6 !important;
  opacity: 0.9;
  color: ${PREMIUM_COLORS.BASE_COLORS.ivory[100]};
  
  padding: 10px 0 15px 0 !important;
  margin-top: 5px !important;
  overflow: visible !important;
  text-overflow: unset !important;
  
  html[lang="de"] & {
    font-size: clamp(1rem, 2vw, 1.2rem);
    line-height: 1.6 !important;
    max-width: 900px;
    margin: 0 auto 3rem;
    text-align: center;
    hyphens: auto;
    word-break: break-word;
    letter-spacing: -0.01em;
    padding: 15px 0 20px 0 !important;
    
    @media (max-width: 768px) {
      font-size: clamp(0.95rem, 2vw, 1.1rem);
      max-width: 95%;
      margin-bottom: 2rem;
      line-height: 1.5 !important;
      padding: 12px 0 18px 0 !important;
    }
    
    @media (min-width: 769px) and (max-width: 1024px) {
      font-size: clamp(1.05rem, 2vw, 1.15rem);
      max-width: 85%;
    }
  }
`;

const ButtonContainer = styled(motion.div)`
  margin-bottom: ${SACRED_SPACING.lg}px;
  
  /* German language-specific button spacing */
  html[lang="de"] & {
    margin-top: 3rem;
    margin-bottom: 2rem;
    
    @media (max-width: 768px) {
      margin-top: 2rem;
      margin-bottom: 1.5rem;
    }
  }
`;

const BadgesContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  margin-top: 32px;
  gap: 16px;
  flex-wrap: wrap;
  
  /* German language-specific badge adjustments */
  html[lang="de"] & {
    margin-top: 3rem;
    gap: 1.5rem;
    
    @media (max-width: 768px) {
      margin-top: 2rem;
      gap: 1rem;
    }
  }
`;

const Badge = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  
  /* German language-specific badge adjustments */
  html[lang="de"] & {
    padding: 0.75rem 1.5rem;
    
    @media (max-width: 768px) {
      padding: 0.625rem 1.25rem;
    }
  }
`;

const BadgeText = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  white-space: nowrap;
  
  /* German language-specific badge text adjustments */
  html[lang="de"] & {
    font-size: 0.85rem;
    letter-spacing: -0.01em;
    
    @media (max-width: 768px) {
      font-size: 0.8rem;
    }
  }
`;

const PrimaryCTA = styled(Button)`
  background: linear-gradient(to right, ${PREMIUM_COLORS.BASE_COLORS.gold[500]}, ${PREMIUM_COLORS.BASE_COLORS.gold[400]});
  border: none;
  box-shadow: 0 4px 12px rgba(212, 175, 55, 0.3);
  transition: all 0.3s ease;
  padding: 12px 28px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(212, 175, 55, 0.4);
  }
  
  /* German language-specific button adjustments */
  html[lang="de"] & {
    padding: 14px 32px;
    font-size: 1rem;
    
    @media (max-width: 768px) {
      padding: 12px 24px;
      font-size: 0.95rem;
    }
  }
`;

/**
 * ServicesHero Component
 * 
 * A premium hero section specifically designed for the Services page,
 * featuring an abstract financial background, professional typography,
 * and trust-building regulatory badges with German-specific layout optimizations.
 */
export const ServicesHero: React.FC<ServicesHeroProps> = ({
  title,
  subtitle,
  ctaText,
  ctaUrl = "/booking"
}) => {
  const { t, i18n } = useTranslation();
  
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
    <HeroContainer className={`hero-section ${i18n.language === 'de' ? 'hero-section--german' : ''}`}>
      <HeroBackground />
      
      <Container>
        <HeroContent
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="hero-container"
        >
          <HeroTitle variants={itemVariants} className="hero-title">
            {title || t('services.heroTitle')}
          </HeroTitle>
          
          <HeroSubtitle variants={itemVariants} className="hero-subtitle">
            {subtitle || t('services.heroSubtitle')}
          </HeroSubtitle>
          
          <ButtonContainer variants={itemVariants} className="hero-buttons">
            <PrimaryCTA 
              to={ctaUrl}
              variant="primary"
              size="lg"
            >
              {ctaText || t('services.bookConsultation')}
            </PrimaryCTA>
          </ButtonContainer>
          
          <BadgesContainer variants={itemVariants} className="certification-badges">
            <Badge className="certification-badge">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7v9c0 5 5 8 10 8s10-3 10-8V7L12 2z" stroke="#FFFFFF" strokeWidth="2" fill="none" />
                <path d="M9 12l2 2 4-4" stroke={PREMIUM_COLORS.BASE_COLORS.gold[500]} strokeWidth="2" />
              </svg>
              <BadgeText>{t('services.ciroRegulated')}</BadgeText>
            </Badge>
            
            <Badge className="certification-badge">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#FFFFFF" strokeWidth="2" fill="none" />
                <path d="M9 12l2 2 4-4" stroke={PREMIUM_COLORS.BASE_COLORS.gold[500]} strokeWidth="2" />
              </svg>
              <BadgeText>{t('services.pipedaCompliant')}</BadgeText>
            </Badge>
            
            <Badge className="certification-badge">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M4 6h16v12H4V6z" stroke="#FFFFFF" strokeWidth="2" fill="none" />
                <path d="M12 14.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" stroke={PREMIUM_COLORS.BASE_COLORS.gold[500]} strokeWidth="2" fill="none" />
              </svg>
              <BadgeText>{t('services.cybersecureCanada')}</BadgeText>
            </Badge>
          </BadgesContainer>
        </HeroContent>
      </Container>
    </HeroContainer>
  );
};

// Remove the default export to avoid conflicts with the named export
// export default ServicesHero; 











