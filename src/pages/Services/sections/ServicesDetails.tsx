import * as React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ScrollReveal } from '../../../animation';
import { PHI, PHI_INVERSE, SACRED_SPACING } from '../../../constants/sacred-geometry';
import { Container } from '../../../design-system/components/layout';
import { Section } from '../../../design-system/components/layout/Section';
import { Text, Paragraph, Heading } from '../../../design-system/components/typography';
import { Card } from '../../../design-system/components/data-display';
import { Button } from '../../../design-system/components/button';
import { PREMIUM_COLORS } from '../../../design-system/tokens/colors.premium';
import { Service } from './ServicesOverview';

/**
 * ServicesDetails component properties
 */
interface ServicesDetailsProps {
  /** Array of service objects to display */
  services: Service[];
}

const ServiceSection = styled.div`
  width: 100%;
  padding-top: ${SACRED_SPACING.xxl}px;
  padding-bottom: ${SACRED_SPACING.xxl}px;
`;

const ServiceHeader = styled.div`
  width: 100%;
  padding-bottom: ${PHI * 12}px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  margin-bottom: ${PHI * 32}px;
  display: flex;
  align-items: center;
`;

const ServiceIcon = styled.div<{ $backgroundColor: string }>`
  width: 64px;
  height: 64px;
  margin-right: 24px;
  background-color: ${props => props.$backgroundColor};
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  }
  
  img {
    width: 40px;
    height: 40px;
    object-fit: contain;
  }
`;

const ServiceContent = styled.div`
  display: grid;
  grid-template-columns: 1fr ${PHI_INVERSE}fr;
  gap: ${PHI * 32}px;
  width: 100%;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ServiceDescription = styled.div`
  margin-bottom: ${SACRED_SPACING.xl}px;
`;

const ServiceBenefits = styled.div`
  margin-top: ${PHI * 32}px;
  margin-bottom: ${PHI * 32}px;
`;

const BenefitsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${PHI * 12}px;
`;

const BenefitItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
`;

const CheckIcon = styled.div`
  color: ${PREMIUM_COLORS.BASE_COLORS.forest[600]};
  margin-top: 4px;
  flex-shrink: 0;
`;

const ServiceDetailsCard = styled(Card)<{ $accentColor: string }>`
  background-color: white;
  border-top: 4px solid ${props => props.$accentColor};
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.07);
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.1);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 4px;
    background: ${props => props.$accentColor};
    opacity: 0.7;
  }
`;

const DetailItem = styled.div`
  margin-bottom: ${PHI * 20}px;
  padding-bottom: ${PHI * 12}px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  
  &:last-child {
    border-bottom: none;
  }
`;

const DetailLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: ${PHI * 6}px;
`;

const DetailValue = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const DetailIcon = styled.div`
  color: ${PREMIUM_COLORS.BASE_COLORS.forest[600]};
  flex-shrink: 0;
`;

const DetailPricing = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const PriceItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 6px 0;
`;

const CtaButton = styled(Button)`
  background: linear-gradient(to right, ${PREMIUM_COLORS.BASE_COLORS.gold[500]}, ${PREMIUM_COLORS.BASE_COLORS.gold[400]});
  border: none;
  box-shadow: 0 4px 12px rgba(212, 175, 55, 0.2);
  transition: all 0.3s ease;
  width: 100%;
  margin-top: ${PHI * 16}px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(212, 175, 55, 0.3);
  }
`;

const TrustBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background-color: ${PREMIUM_COLORS.BASE_COLORS.ivory[100]};
  border-radius: 4px;
  border: 1px solid ${PREMIUM_COLORS.BASE_COLORS.ivory[300]};
  margin-top: ${PHI * 16}px;
`;

const TrustIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${PREMIUM_COLORS.BASE_COLORS.forest[600]};
`;

const TrustText = styled(Text)`
  font-size: 0.75rem;
  font-weight: 500;
  color: ${PREMIUM_COLORS.BASE_COLORS.gray[700]};
`;

// Professional service icon mapping using client's actual images
const SERVICE_ICONS: { [key: string]: string } = {
  'recovery-consultation': 'https://images2.imgbox.com/e7/0f/yfQ894Tl_o.png', // Financial Scam Recovery image
  'investment-fraud': 'https://images2.imgbox.com/76/6d/BSPbxZsR_o.png', // Investment Fraud Recovery image
  'crypto-recovery': 'https://images2.imgbox.com/ba/78/wNqfvrmO_o.png', // Cryptocurrency Recovery image  
  'regulatory-assistance': 'https://images2.imgbox.com/f2/e9/tDfdd3sR_o.png', // Regulatory Complaint Assistance image
  
  // Additional mappings for consistency across different ID formats
  'cryptocurrency': 'https://images2.imgbox.com/ba/78/wNqfvrmO_o.png',
  'cryptocurrency-recovery': 'https://images2.imgbox.com/ba/78/wNqfvrmO_o.png',
  'financial-scam-recovery': 'https://images2.imgbox.com/e7/0f/yfQ894Tl_o.png', 
  'investment-fraud-recovery': 'https://images2.imgbox.com/76/6d/BSPbxZsR_o.png',
  'regulatory-complaint-assistance': 'https://images2.imgbox.com/f2/e9/tDfdd3sR_o.png'
};

/**
 * ServicesDetails Component
 * 
 * Displays detailed information about each service including
 * description, benefits, pricing, and duration. Layout follows
 * sacred geometry principles with golden ratio proportions.
 */
const ServicesDetails: React.FC<ServicesDetailsProps> = ({ services }) => {
  const { t } = useTranslation();
  
  // Helper function to get service data by key
  const getServiceData = (serviceId: string) => {
    const serviceKeyMap: { [key: string]: string } = {
      'recovery-consultation': 'recoveryConsultation',
      'investment-fraud': 'investmentFraud',
      'crypto-recovery': 'cryptocurrency',
      'regulatory-assistance': 'regulatoryComplaint',
      'cryptocurrency': 'cryptocurrency',
      'cryptocurrency-recovery': 'cryptocurrency',
      'financial-scam-recovery': 'recoveryConsultation',
      'investment-fraud-recovery': 'investmentFraud',
      'regulatory-complaint-assistance': 'regulatoryComplaint'
    };
    
    return serviceKeyMap[serviceId] || 'recoveryConsultation';
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
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
    <>
      {services.map((service, index) => {
        const serviceKey = getServiceData(service.id);
        
        return (
          <ScrollReveal key={service.id} threshold={0.1}>
            <Section 
              id={service.id}
              backgroundColor={index % 2 === 0 ? PREMIUM_COLORS.BASE_COLORS.ivory[50] : "#FFFFFF"}
            >
              <Container>
                <ServiceSection>
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={containerVariants}
                  >
                    <motion.div variants={itemVariants}>
                      <ServiceHeader>
                        <ServiceIcon $backgroundColor={service.accentColor}>
                          {SERVICE_ICONS[service.id] ? (
                            <img 
                              src={SERVICE_ICONS[service.id]} 
                              alt={t(`services.${serviceKey}.title`)} 
                              style={{
                                width: '40px',
                                height: '40px',
                                objectFit: 'contain'
                              }}
                              onError={() => {
                                console.error(`Failed to load service icon for ${service.id}:`, SERVICE_ICONS[service.id]);
                                console.log('Available icons:', Object.keys(SERVICE_ICONS));
                              }}
                              onLoad={() => {
                                console.log(`Successfully loaded icon for ${service.id}`);
                              }}
                            />
                          ) : (
                            <div style={{ color: 'white', fontSize: '24px' }}>
                              {(() => {
                                console.log(`No icon found for service ID: ${service.id}`, 'Available:', Object.keys(SERVICE_ICONS));
                                return '📄';
                              })()}
                            </div>
                          )}
                        </ServiceIcon>
                        <Heading as="h2" mb={0} color={PREMIUM_COLORS.BASE_COLORS.forest[700]}>
                          {t(`services.${serviceKey}.title`)}
                        </Heading>
                      </ServiceHeader>
                    </motion.div>
                  
                    <ServiceContent>
                      <motion.div variants={itemVariants}>
                        <ServiceDescription>
                          <Paragraph 
                            size="base" 
                            lineHeight={1.7}
                            color={PREMIUM_COLORS.BASE_COLORS.gray[700]}
                          >
                            {t(`services.${serviceKey}.longDescription`)}
                          </Paragraph>
                        </ServiceDescription>
                        
                        <ServiceBenefits>
                          <Heading 
                            as="h3" 
                            mb={`${PHI * 16}px`}
                            color={PREMIUM_COLORS.BASE_COLORS.forest[600]}
                          >
                            {t('services.serviceDetails.keyBenefits')}
                          </Heading>
                          <BenefitsList>
                            {(() => {
                              const benefits = t(`services.${serviceKey}.keyBenefits`, { returnObjects: true });
                              // Handle benefits as array instead of object
                              if (Array.isArray(benefits)) {
                                return (benefits as string[]).map((benefit: string, idx: number) => (
                                  <BenefitItem key={idx}>
                                    <CheckIcon>
                                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                        <path 
                                          d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" 
                                          fill="currentColor" 
                                        />
                                      </svg>
                                    </CheckIcon>
                                    <Text 
                                      size="sm" 
                                      color={PREMIUM_COLORS.BASE_COLORS.gray[700]}
                                      lineHeight={1.5}
                                    >
                                      {benefit}
                                    </Text>
                                  </BenefitItem>
                                ));
                              }
                              // Fallback for object-style benefits (backwards compatibility)
                              else if (typeof benefits === 'object' && benefits !== null) {
                                const benefitsObj = benefits as Record<string, string>;
                                return Object.keys(benefitsObj)
                                  .filter(key => key !== 'title')
                                  .map((benefitKey, idx) => (
                                    <BenefitItem key={idx}>
                                      <CheckIcon>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                          <path 
                                            d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" 
                                            fill="currentColor" 
                                          />
                                        </svg>
                                      </CheckIcon>
                                      <Text 
                                        size="sm" 
                                        color={PREMIUM_COLORS.BASE_COLORS.gray[700]}
                                        lineHeight={1.5}
                                      >
                                        {benefitsObj[benefitKey]}
                                      </Text>
                                    </BenefitItem>
                                  ));
                              }
                              // Fallback for missing benefits
                              else {
                                return (
                                  <BenefitItem>
                                    <CheckIcon>
                                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                        <path 
                                          d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" 
                                          fill="currentColor" 
                                        />
                                      </svg>
                                    </CheckIcon>
                                    <Text 
                                      size="sm" 
                                      color={PREMIUM_COLORS.BASE_COLORS.gray[700]}
                                      lineHeight={1.5}
                                    >
                                      Professional consultation service with expert guidance
                                    </Text>
                                  </BenefitItem>
                                );
                              }
                            })()}
                          </BenefitsList>
                        </ServiceBenefits>
                      </motion.div>
                      
                      <motion.div variants={itemVariants}>
                        <ServiceDetailsCard 
                          elevation={2}
                          padding={`${PHI * 32}px`}
                          borderRadius="8px"
                          $accentColor={service.accentColor}
                        >
                          <Heading 
                            as="h3" 
                            mb={`${PHI * 24}px`}
                            color={PREMIUM_COLORS.BASE_COLORS.forest[700]}
                          >
                            {t('services.serviceDetails.title')}
                          </Heading>
                          
                          <DetailItem>
                            <DetailLabel>
                              <DetailIcon>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                  <path 
                                    d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" 
                                    fill="currentColor" 
                                  />
                                  <path 
                                    d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z" 
                                    fill="currentColor" 
                                  />
                                </svg>
                              </DetailIcon>
                              <Text 
                                weight="medium" 
                                size="sm" 
                                color={PREMIUM_COLORS.BASE_COLORS.gray[700]}
                              >
                                {t('services.serviceDetails.duration')}:
                              </Text>
                            </DetailLabel>
                            <DetailValue>
                              <Text 
                                size="sm"
                                color={PREMIUM_COLORS.BASE_COLORS.gray[600]}
                              >
                                {service.duration}
                              </Text>
                            </DetailValue>
                          </DetailItem>
                          
                          <DetailItem>
                            <DetailLabel>
                              <DetailIcon>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                  <path 
                                    d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" 
                                    fill="currentColor" 
                                  />
                                </svg>
                              </DetailIcon>
                              <Text 
                                weight="medium" 
                                size="sm"
                                color={PREMIUM_COLORS.BASE_COLORS.gray[700]}
                              >
                                {t('services.serviceDetails.pricing')}:
                              </Text>
                            </DetailLabel>
                            <DetailPricing>
                              {'initial' in service.pricing ? (
                                <>
                                  <PriceItem>
                                    <Text size="sm" color={PREMIUM_COLORS.BASE_COLORS.gray[600]}>
                                      {t('services.serviceDetails.initialSession')}:
                                    </Text>
                                    <Text 
                                      size="sm" 
                                      weight="medium"
                                      color={PREMIUM_COLORS.BASE_COLORS.gray[800]}
                                    >
                                      ${service.pricing.initial}
                                    </Text>
                                  </PriceItem>
                                  <PriceItem>
                                    <Text size="sm" color={PREMIUM_COLORS.BASE_COLORS.gray[600]}>
                                      {t('services.serviceDetails.followUpSessions')}:
                                    </Text>
                                    <Text 
                                      size="sm" 
                                      weight="medium"
                                      color={PREMIUM_COLORS.BASE_COLORS.gray[800]}
                                    >
                                      ${service.pricing.followUp}
                                    </Text>
                                  </PriceItem>
                                </>
                              ) : (
                                <>
                                  <PriceItem>
                                    <Text size="sm" color={PREMIUM_COLORS.BASE_COLORS.gray[600]}>
                                      Workshop:
                                    </Text>
                                    <Text 
                                      size="sm" 
                                      weight="medium"
                                      color={PREMIUM_COLORS.BASE_COLORS.gray[800]}
                                    >
                                      ${service.pricing.workshop} per person
                                    </Text>
                                  </PriceItem>
                                  <PriceItem>
                                    <Text size="sm" color={PREMIUM_COLORS.BASE_COLORS.gray[600]}>
                                      Private Session:
                                    </Text>
                                    <Text 
                                      size="sm" 
                                      weight="medium"
                                      color={PREMIUM_COLORS.BASE_COLORS.gray[800]}
                                    >
                                      ${service.pricing.privateSession}
                                    </Text>
                                  </PriceItem>
                                </>
                              )}
                            </DetailPricing>
                          </DetailItem>
                          
                          <DetailItem>
                            <DetailLabel>
                              <DetailIcon>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                  <path 
                                    d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" 
                                    fill="currentColor" 
                                  />
                                </svg>
                              </DetailIcon>
                              <Text 
                                weight="medium" 
                                size="sm"
                                color={PREMIUM_COLORS.BASE_COLORS.gray[700]}
                              >
                                {t('services.serviceDetails.location')}:
                              </Text>
                            </DetailLabel>
                            <DetailValue>
                              <Text 
                                size="sm"
                                color={PREMIUM_COLORS.BASE_COLORS.gray[600]}
                              >
                                Recovery Office - {t('services.serviceDetails.inPersonOrVirtual')}
                              </Text>
                            </DetailValue>
                          </DetailItem>
                          
                          <CtaButton 
                            variant="primary" 
                            href={`/booking?service=${service.id}`}
                            size="lg"
                            aria-label={`${t('services.serviceDetails.bookThisService')} ${t(`services.${serviceKey}.title`)}`}
                          >
                            {t('services.serviceDetails.bookThisService')}
                          </CtaButton>
                          
                          <TrustBadge>
                            <TrustIcon>
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <path 
                                  d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" 
                                  fill="currentColor" 
                                />
                              </svg>
                            </TrustIcon>
                            <TrustText>
                              {t('booking.confirmation.secureConfidential')}
                            </TrustText>
                          </TrustBadge>
                        </ServiceDetailsCard>
                      </motion.div>
                    </ServiceContent>
                  </motion.div>
                </ServiceSection>
              </Container>
            </Section>
          </ScrollReveal>
        );
      })}
    </>
  );
};

export default ServicesDetails; 










