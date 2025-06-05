import * as React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ScrollReveal } from '../../animation';
import { Container } from '../../design-system/components/layout';
import { Text, Heading } from '../../design-system/components/typography';
import { Button } from '../../design-system/components/button';
import { Card } from '../../design-system/components/data-display';
import { PREMIUM_COLORS } from '../../design-system/tokens/colors.premium';
import { PREMIUM_SPACING } from '../../design-system/tokens';

// Premium Corporate Styled Components
const AboutContainer = styled.main`
  background: linear-gradient(135deg, ${PREMIUM_COLORS.BASE_COLORS.ivory[50]} 0%, ${PREMIUM_COLORS.BASE_COLORS.ivory[100]} 100%);
  min-height: 100vh;
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, ${PREMIUM_COLORS.BASE_COLORS.forest[800]} 0%, ${PREMIUM_COLORS.BASE_COLORS.forest[900]} 100%);
  color: white;
  padding: ${PREMIUM_SPACING.xxxl * 2}px 0;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23${PREMIUM_COLORS.BASE_COLORS.gold[500].replace('#', '')}' fill-opacity='0.08'%3E%3Cpath d='M50 0v100M0 50h100M75 0v100M25 0v100M0 75h100M0 25h100'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    opacity: 0.2;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const EstablishedBadge = styled.div`
  display: inline-block;
  background: rgba(212, 175, 55, 0.15);
  color: ${PREMIUM_COLORS.BASE_COLORS.gold[300]};
  padding: 12px 32px;
  border-radius: 30px;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: ${PREMIUM_SPACING.xl}px;
  border: 1px solid rgba(212, 175, 55, 0.3);
  backdrop-filter: blur(10px);
`;

const HeroTitle = styled(motion.h1)`
  font-size: clamp(3rem, 6vw, 5rem);
  font-weight: 700;
  margin-bottom: ${PREMIUM_SPACING.lg}px;
  font-family: 'Playfair Display', serif;
  line-height: 1.1;
`;

const HeroSubtitle = styled(motion.h2)`
  font-size: clamp(1.5rem, 3vw, 2.25rem);
  color: ${PREMIUM_COLORS.BASE_COLORS.gold[300]};
  margin-bottom: ${PREMIUM_SPACING.xl}px;
  font-weight: 400;
`;

const HeroDescription = styled(motion.p)`
  font-size: 1.25rem;
  line-height: 1.7;
  margin-bottom: ${PREMIUM_SPACING.xxl}px;
  color: rgba(255, 255, 255, 0.9);
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
`;

const StatsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: ${PREMIUM_SPACING.lg}px;
  margin-top: ${PREMIUM_SPACING.xl}px;
`;

const StatCard = styled(Card)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  text-align: center;
  padding: ${PREMIUM_SPACING.xl}px;
  color: white;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-8px);
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  }
`;

const StatValue = styled.div`
  font-size: 2.5rem;
  font-weight: 800;
  color: ${PREMIUM_COLORS.BASE_COLORS.gold[300]};
  margin-bottom: ${PREMIUM_SPACING.sm}px;
  font-family: 'Playfair Display', serif;
`;

const StatLabel = styled.div`
  font-size: 0.9375rem;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
  letter-spacing: 0.5px;
`;

const CorporateSection = styled.section`
  padding: ${PREMIUM_SPACING.xxxl * 1.5}px 0;
  
  &:nth-child(even) {
    background-color: white;
  }
`;

const SectionHeader = styled.div`
  text-align: center;
  max-width: 900px;
  margin: 0 auto ${PREMIUM_SPACING.xxl}px;
`;

const SectionTitle = styled(Heading)`
  font-size: clamp(2.5rem, 4vw, 3.5rem);
  color: ${PREMIUM_COLORS.BASE_COLORS.forest[700]};
  margin-bottom: ${PREMIUM_SPACING.lg}px;
  font-family: 'Playfair Display', serif;
  text-align: center;
`;

const SectionSubtitle = styled(Text)`
  font-size: 1.25rem;
  color: ${PREMIUM_COLORS.BASE_COLORS.gray[600]};
  line-height: 1.6;
  text-align: center;
`;

const CorporateGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: ${PREMIUM_SPACING.xl}px;
  margin-top: ${PREMIUM_SPACING.xl}px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CorporateCard = styled(Card)`
  padding: ${PREMIUM_SPACING.xxl}px;
  height: 100%;
  transition: all 0.3s ease;
  border: 1px solid ${PREMIUM_COLORS.BASE_COLORS.gray[200]};
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
    border-color: ${PREMIUM_COLORS.BASE_COLORS.gold[300]};
  }
`;

const CapabilitiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${PREMIUM_SPACING.xl}px;
  margin-top: ${PREMIUM_SPACING.xl}px;
`;

const CapabilityCard = styled(Card)`
  padding: ${PREMIUM_SPACING.xl}px;
  text-align: center;
  transition: all 0.3s ease;
  border-top: 4px solid ${PREMIUM_COLORS.BASE_COLORS.gold[500]};
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.1);
  }
`;

const CapabilityIcon = styled.div`
  font-size: 3.5rem;
  margin-bottom: ${PREMIUM_SPACING.lg}px;
  color: ${PREMIUM_COLORS.BASE_COLORS.gold[500]};
`;

const ValuesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${PREMIUM_SPACING.lg}px;
  margin-top: ${PREMIUM_SPACING.xl}px;
`;

const ValueCard = styled(Card)`
  padding: ${PREMIUM_SPACING.lg}px;
  text-align: center;
  transition: all 0.3s ease;
  border-left: 4px solid ${PREMIUM_COLORS.BASE_COLORS.forest[600]};
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
  }
`;

const RegulatoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: ${PREMIUM_SPACING.lg}px;
  margin-top: ${PREMIUM_SPACING.xl}px;
`;

const RegulatoryCard = styled(Card)`
  padding: ${PREMIUM_SPACING.lg}px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
  }
`;

const SectorsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${PREMIUM_SPACING.lg}px;
  margin-top: ${PREMIUM_SPACING.xl}px;
`;

const SectorCard = styled(Card)`
  padding: ${PREMIUM_SPACING.lg}px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
  }
`;

const GuaranteesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${PREMIUM_SPACING.lg}px;
  margin-top: ${PREMIUM_SPACING.xl}px;
`;

const GuaranteeCard = styled(Card)`
  padding: ${PREMIUM_SPACING.lg}px;
  text-align: center;
  transition: all 0.3s ease;
  border-top: 3px solid ${PREMIUM_COLORS.BASE_COLORS.forest[500]};
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
  }
`;

const CTASection = styled.section`
  background: linear-gradient(135deg, ${PREMIUM_COLORS.BASE_COLORS.forest[700]} 0%, ${PREMIUM_COLORS.BASE_COLORS.forest[900]} 100%);
  color: white;
  padding: ${PREMIUM_SPACING.xxxl * 1.5}px 0;
  text-align: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23${PREMIUM_COLORS.BASE_COLORS.gold[500].replace('#', '')}' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    opacity: 0.3;
  }
`;

const CTAContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
`;

const CTAButton = styled(Button)`
  background: linear-gradient(to right, ${PREMIUM_COLORS.BASE_COLORS.gold[500]}, ${PREMIUM_COLORS.BASE_COLORS.gold[400]});
  border: none;
  padding: 20px 40px;
  font-size: 1.25rem;
  margin-top: ${PREMIUM_SPACING.xl}px;
  color: white;
  font-weight: 600;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 30px rgba(212, 175, 55, 0.4);
  }
`;

/**
 * Premium Corporate About Page Component
 * 
 * Sophisticated corporate About page that positions Recovery Office
 * as the UK's leading financial asset recovery consultancy.
 * Focuses on institutional credibility, regulatory excellence,
 * and corporate capabilities - NO TEAM INFORMATION.
 */
const AboutPage: React.FC = () => {
  const { t } = useTranslation();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1.0] }
    }
  };

  return (
    <AboutContainer>
      {/* Premium Corporate Hero Section */}
      <HeroSection>
        <Container>
          <HeroContent>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              <motion.div variants={itemVariants}>
                <EstablishedBadge>{t('about.hero.establishedBadge')}</EstablishedBadge>
              </motion.div>
              
              <HeroTitle variants={itemVariants}>
                {t('about.hero.title')}
              </HeroTitle>
              
              <HeroSubtitle variants={itemVariants}>
                {t('about.hero.subtitle')}
              </HeroSubtitle>
              
              <HeroDescription variants={itemVariants}>
                {t('about.hero.description')}
              </HeroDescription>
              
              <StatsGrid variants={itemVariants}>
                <StatCard>
                  <StatValue>£500M+</StatValue>
                  <StatLabel>{t('about.metrics.assetsUnderRecovery')}</StatLabel>
                </StatCard>
                <StatCard>
                  <StatValue>98%</StatValue>
                  <StatLabel>{t('about.metrics.clientSatisfaction')}</StatLabel>
                </StatCard>
                <StatCard>
                  <StatValue>FCA</StatValue>
                  <StatLabel>{t('about.metrics.fcaRegulated')}</StatLabel>
                </StatCard>
                <StatCard>
                  <StatValue>24/7</StatValue>
                  <StatLabel>{t('about.metrics.expertResponse')}</StatLabel>
                </StatCard>
                <StatCard>
                  <StatValue>100%</StatValue>
                  <StatLabel>{t('about.metrics.zeroBreach')}</StatLabel>
                </StatCard>
              </StatsGrid>
            </motion.div>
          </HeroContent>
        </Container>
      </HeroSection>

      {/* Corporate Mission & Vision Section */}
      <CorporateSection>
        <Container>
      <ScrollReveal>
            <CorporateGrid>
              <CorporateCard>
                <Heading as="h2" mb={4} color={PREMIUM_COLORS.BASE_COLORS.forest[700]}>
                  {t('about.corporateMission.title')}
                </Heading>
                <Text size="lg" lineHeight={1.7} color={PREMIUM_COLORS.BASE_COLORS.gray[700]}>
                  {t('about.corporateMission.content')}
                </Text>
              </CorporateCard>
              
              <CorporateCard>
                <Heading as="h2" mb={4} color={PREMIUM_COLORS.BASE_COLORS.forest[700]}>
                  {t('about.vision.title')}
                </Heading>
                <Text size="lg" lineHeight={1.7} color={PREMIUM_COLORS.BASE_COLORS.gray[700]}>
                  {t('about.vision.content')}
                </Text>
              </CorporateCard>
            </CorporateGrid>
      </ScrollReveal>
        </Container>
      </CorporateSection>

      {/* Corporate Values Section */}
      <CorporateSection>
        <Container>
      <ScrollReveal>
            <SectionHeader>
              <SectionTitle>{t('about.values.title')}</SectionTitle>
            </SectionHeader>
            
            <ValuesGrid>
              {Object.entries(t('about.values', { returnObjects: true }) as Record<string, { title?: string; description?: string }>)
                .filter(([key]) => key !== 'title')
                .map(([key, value]) => (
                  <ValueCard key={key}>
                    <Heading as="h3" mb={3} color={PREMIUM_COLORS.BASE_COLORS.forest[700]}>
                      {value.title}
                    </Heading>
                    <Text color={PREMIUM_COLORS.BASE_COLORS.gray[700]}>
                      {value.description}
                    </Text>
                  </ValueCard>
                ))}
            </ValuesGrid>
          </ScrollReveal>
        </Container>
      </CorporateSection>

      {/* Core Capabilities Section */}
      <CorporateSection>
            <Container>
          <ScrollReveal>
            <SectionHeader>
              <SectionTitle>{t('about.capabilities.title')}</SectionTitle>
              <SectionSubtitle>{t('about.capabilities.subtitle')}</SectionSubtitle>
            </SectionHeader>
            
            <CapabilitiesGrid>
              <CapabilityCard>
                <CapabilityIcon>🔍</CapabilityIcon>
                <Heading as="h3" mb={3} color={PREMIUM_COLORS.BASE_COLORS.forest[700]}>
                  {t('about.capabilities.forensics.title')}
                </Heading>
                <Text color={PREMIUM_COLORS.BASE_COLORS.gray[700]}>
                  {t('about.capabilities.forensics.description')}
                </Text>
              </CapabilityCard>
              
              <CapabilityCard>
                <CapabilityIcon>⚖️</CapabilityIcon>
                <Heading as="h3" mb={3} color={PREMIUM_COLORS.BASE_COLORS.forest[700]}>
                  {t('about.capabilities.advocacy.title')}
                </Heading>
                <Text color={PREMIUM_COLORS.BASE_COLORS.gray[700]}>
                  {t('about.capabilities.advocacy.description')}
                </Text>
              </CapabilityCard>
              
              <CapabilityCard>
                <CapabilityIcon>🏛️</CapabilityIcon>
                <Heading as="h3" mb={3} color={PREMIUM_COLORS.BASE_COLORS.forest[700]}>
                  {t('about.capabilities.legal.title')}
                </Heading>
                <Text color={PREMIUM_COLORS.BASE_COLORS.gray[700]}>
                  {t('about.capabilities.legal.description')}
                </Text>
              </CapabilityCard>
              
              <CapabilityCard>
                <CapabilityIcon>🌍</CapabilityIcon>
                <Heading as="h3" mb={3} color={PREMIUM_COLORS.BASE_COLORS.forest[700]}>
                  {t('about.capabilities.international.title')}
                </Heading>
                <Text color={PREMIUM_COLORS.BASE_COLORS.gray[700]}>
                  {t('about.capabilities.international.description')}
                </Text>
              </CapabilityCard>
            </CapabilitiesGrid>
          </ScrollReveal>
            </Container>
      </CorporateSection>

      {/* Regulatory Framework Section */}
      <CorporateSection>
        <Container>
          <ScrollReveal>
            <SectionHeader>
              <SectionTitle>{t('about.regulatory.title')}</SectionTitle>
              <SectionSubtitle>{t('about.regulatory.subtitle')}</SectionSubtitle>
            </SectionHeader>
            
            <RegulatoryGrid>
              {Object.entries(t('about.regulatory.frameworks', { returnObjects: true }) as Record<string, string>).map(([key, value]) => (
                <RegulatoryCard key={key}>
                  <Text weight="medium" color={PREMIUM_COLORS.BASE_COLORS.forest[700]} size="lg">
                    ✓ {value}
                  </Text>
                </RegulatoryCard>
              ))}
            </RegulatoryGrid>
      </ScrollReveal>
        </Container>
      </CorporateSection>

      {/* Client Sectors Section */}
      <CorporateSection>
        <Container>
          <ScrollReveal>
            <SectionHeader>
              <SectionTitle>{t('about.sectors.title')}</SectionTitle>
              <SectionSubtitle>{t('about.sectors.subtitle')}</SectionSubtitle>
            </SectionHeader>
            
            <SectorsGrid>
              {Object.entries(t('about.sectors', { returnObjects: true }) as Record<string, { title?: string; description?: string }>)
                .filter(([key]) => !['title', 'subtitle'].includes(key))
                .map(([key, sector]) => (
                  <SectorCard key={key}>
                    <Heading as="h4" mb={3} color={PREMIUM_COLORS.BASE_COLORS.forest[700]}>
                      {sector.title}
                    </Heading>
                    <Text color={PREMIUM_COLORS.BASE_COLORS.gray[700]}>
                      {sector.description}
                    </Text>
                  </SectorCard>
                ))}
            </SectorsGrid>
          </ScrollReveal>
        </Container>
      </CorporateSection>

      {/* Corporate Commitment Section */}
      <CorporateSection>
        <Container>
      <ScrollReveal>
            <SectionHeader>
              <SectionTitle>{t('about.commitment.title')}</SectionTitle>
              <SectionSubtitle>{t('about.commitment.subtitle')}</SectionSubtitle>
            </SectionHeader>
            
            <GuaranteesGrid>
              {Object.entries(t('about.commitment.guarantees', { returnObjects: true }) as Record<string, { title: string; description: string }>).map(([key, guarantee]) => (
                <GuaranteeCard key={key}>
                  <Heading as="h4" mb={3} color={PREMIUM_COLORS.BASE_COLORS.forest[700]}>
                    {guarantee.title}
                  </Heading>
                  <Text color={PREMIUM_COLORS.BASE_COLORS.gray[700]}>
                    {guarantee.description}
                  </Text>
                </GuaranteeCard>
              ))}
            </GuaranteesGrid>
          </ScrollReveal>
        </Container>
      </CorporateSection>

      {/* Premium CTA Section */}
      <CTASection>
        <Container>
          <ScrollReveal>
            <CTAContent>
              <Heading as="h2" mb={4} color="white">
                {t('about.cta.title')}
              </Heading>
              <Text size="xl" color="rgba(255, 255, 255, 0.9)">
                {t('about.cta.subtitle')}
              </Text>
              <CTAButton 
                variant="primary" 
                size="lg" 
                href="/booking"
              >
                {t('about.cta.button')}
              </CTAButton>
            </CTAContent>
          </ScrollReveal>
          </Container>
      </CTASection>
    </AboutContainer>
  );
};

export default AboutPage;