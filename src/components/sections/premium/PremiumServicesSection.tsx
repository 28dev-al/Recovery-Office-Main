import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { PREMIUM_SPACING } from '../../../design-system/tokens';
import { PREMIUM_COLORS } from '../../../design-system/tokens/colors.premium';
import { Container } from '../../../design-system/components/layout/Container';
import { Grid } from '../../../design-system/components/layout/Grid';
import { GridItem } from '../../../design-system/components/layout/GridItem';
import { PremiumServiceCard } from '../../../design-system/components/cards/PremiumServiceCard';
import { Button } from '../../../design-system/components/button/Button';

const ServicesContainer = styled.section`
  padding: ${PREMIUM_SPACING.xxl}px 0;
  background-color: ${props => props.theme.colors.background[50]};
  position: relative;
  overflow: hidden;
  
  /* Subtle grid pattern background */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      linear-gradient(rgba(255, 255, 255, 0.6) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.6) 1px, transparent 1px);
    background-size: 40px 40px;
    opacity: 0.3;
    z-index: 0;
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
`;

const SectionHeader = styled.div`
  text-align: center;
  max-width: 700px;
  margin: 0 auto ${PREMIUM_SPACING.xl}px;
  position: relative;
`;

const SectionTitleWrapper = styled.div`
  position: relative;
  display: inline-block;
  margin-bottom: ${PREMIUM_SPACING.md}px;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 30%;
    width: 40%;
    height: 3px;
    background: linear-gradient(90deg, 
      transparent, 
      ${PREMIUM_COLORS.BASE_COLORS.gold[500]}, 
      transparent
    );
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: ${PREMIUM_SPACING.md}px;
  color: ${PREMIUM_COLORS.BASE_COLORS.forest[700]};
  font-family: 'Playfair Display', serif;
  
  @media (max-width: ${props => props.theme.breakpoints.md}px) {
    font-size: 2rem;
  }
`;

const SectionDescription = styled.p`
  font-size: 1.125rem;
  color: ${PREMIUM_COLORS.BASE_COLORS.gray[600]};
  line-height: 1.6;
  margin: 0 auto;
`;

const ActionContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${PREMIUM_SPACING.xl}px;
`;

const PrimaryCTA = styled(Button)`
  background: linear-gradient(to right, ${PREMIUM_COLORS.BASE_COLORS.forest[600]}, ${PREMIUM_COLORS.BASE_COLORS.forest[700]});
  border: none;
  box-shadow: 0 4px 12px rgba(10, 64, 33, 0.2);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(10, 64, 33, 0.3);
  }
`;

const ServiceBadge = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${PREMIUM_SPACING.md}px;
  gap: 24px;
  flex-wrap: wrap;
`;

const RegulatoryBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  background-color: rgba(10, 33, 79, 0.03);
  border: 1px solid rgba(10, 33, 79, 0.1);
  border-radius: 4px;
`;

const BadgeText = styled.span`
  font-size: 0.75rem;
  font-weight: 500;
  color: ${PREMIUM_COLORS.BASE_COLORS.gray[600]};
`;

// Define our professional financial service offerings with improved icons
const DEFAULT_SERVICE_DATA = [
  {
    id: 'consultation',
    icon: 'https://images2.imgbox.com/e7/0f/yfQ894Tl_o.png',
    title: 'Financial Scam Recovery',
    description: 'Personalized assessment and recovery planning for victims of financial scams.',
    href: '/services/consultation',
  },
  {
    id: 'investment-fraud',
    icon: 'https://images2.imgbox.com/76/6d/BSPbxZsR_o.png',
    title: 'Investment Fraud Recovery',
    description: 'Specialized recovery services for victims of investment fraud and scams.',
    href: '/services/investment-fraud',
  },
  {
    id: 'cryptocurrency',
    icon: 'https://images2.imgbox.com/ba/78/wNqfvrmO_o.png',
    title: 'Cryptocurrency Recovery',
    description: 'Expert assistance in recovering lost or stolen cryptocurrency assets.',
    href: '/services/cryptocurrency',
  },
  {
    id: 'regulatory',
    icon: 'https://images2.imgbox.com/f2/e9/tDfdd3sR_o.png',
    title: 'Regulatory Complaint Assistance',
    description: 'Navigate complex regulatory procedures to maximize your recovery potential.',
    href: '/services/regulatory',
  },
];

interface ServiceData {
  id: string;
  icon: string;
  title: string;
  description: string;
  href: string;
}

interface PremiumServicesSectionProps {
  title?: string;
  description?: string;
  services?: ServiceData[];
  backgroundColor?: string;
  showCta?: boolean;
  ctaText?: string;
  ctaUrl?: string;
}

export const PremiumServicesSection: React.FC<PremiumServicesSectionProps> = ({
  title = 'Our Services',
  description = 'Comprehensive recovery services that combine regulatory expertise with advanced techniques',
  services = DEFAULT_SERVICE_DATA,
  backgroundColor,
  showCta = true,
  ctaText = 'Book a Free Consultation',
  ctaUrl = '/booking',
}) => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0] }
    }
  };
  
  return (
    <ServicesContainer style={backgroundColor ? { backgroundColor } : {}}>
      <ContentWrapper>
        <Container>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
          >
            <SectionHeader>
              <motion.div variants={itemVariants}>
                <SectionTitleWrapper>
                  <SectionTitle>{title}</SectionTitle>
                </SectionTitleWrapper>
                <SectionDescription>{description}</SectionDescription>
              </motion.div>
            </SectionHeader>
            
            <Grid 
              templateColumns={{
                base: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
                lg: 'repeat(4, 1fr)'
              }}
              gap={PREMIUM_SPACING.lg}
            >
              {services.map((service, index) => (
                <GridItem key={service.id}>
                  <motion.div 
                    variants={itemVariants}
                    transition={{ delay: index * 0.1 }}
                  >
                    <PremiumServiceCard
                      icon={service.icon}
                      title={service.title}
                      description={service.description}
                      href={service.href}
                    />
                  </motion.div>
                </GridItem>
              ))}
            </Grid>
            
            {showCta && (
              <motion.div variants={itemVariants}>
                <ActionContainer>
                  <PrimaryCTA 
                    to={ctaUrl}
                    variant="primary"
                    size="lg"
                  >
                    {ctaText}
                  </PrimaryCTA>
                </ActionContainer>
              </motion.div>
            )}
            
            <motion.div variants={itemVariants}>
              <ServiceBadge>
                <RegulatoryBadge>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L2 7v9c0 5 5 8 10 8s10-3 10-8V7L12 2z" 
                      stroke={PREMIUM_COLORS.BASE_COLORS.forest[600]} 
                      strokeWidth="2" 
                      fill="none" 
                    />
                    <path d="M9 12l2 2 4-4" 
                      stroke={PREMIUM_COLORS.BASE_COLORS.gold[500]} 
                      strokeWidth="2"
                    />
                  </svg>
                  <BadgeText>FCA Regulated Service</BadgeText>
                </RegulatoryBadge>
                
                <RegulatoryBadge>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" 
                      stroke={PREMIUM_COLORS.BASE_COLORS.forest[600]} 
                      strokeWidth="2" 
                      fill="none" 
                    />
                    <path d="M9 12l2 2 4-4" 
                      stroke={PREMIUM_COLORS.BASE_COLORS.gold[500]} 
                      strokeWidth="2"
                    />
                  </svg>
                  <BadgeText>Confidential & Secure</BadgeText>
                </RegulatoryBadge>
              </ServiceBadge>
            </motion.div>
          </motion.div>
        </Container>
      </ContentWrapper>
    </ServicesContainer>
  );
};

export default PremiumServicesSection; 