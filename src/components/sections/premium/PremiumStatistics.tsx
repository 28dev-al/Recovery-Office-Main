import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const StatisticsSection = styled.section`
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  padding: 80px 0;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('/pattern-overlay.png') repeat;
    opacity: 0.05;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 1;
`;

const StatisticsHeader = styled.div`
  text-align: center;
  margin-bottom: 60px;
`;

const MainTitle = styled.h2`
  font-size: 48px;
  font-weight: 700;
  color: #1a365d;
  margin-bottom: 16px;
  letter-spacing: -0.02em;
  
  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

const Subtitle = styled.p`
  font-size: 20px;
  color: #4a5568;
  font-weight: 400;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const StatisticsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
  margin-top: 60px;
`;

const StatCard = styled(motion.div)`
  background: white;
  border-radius: 16px;
  padding: 40px 24px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }
`;

const StatValue = styled.div`
  font-size: 56px;
  font-weight: 800;
  color: #1a365d;
  margin-bottom: 12px;
  line-height: 1;
  
  @media (max-width: 768px) {
    font-size: 48px;
  }
`;

const StatLabel = styled.div`
  font-size: 16px;
  color: #4a5568;
  font-weight: 600;
  margin-bottom: 16px;
  
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const StatIcon = styled.div`
  font-size: 24px;
  opacity: 0.7;
`;

interface PremiumStatisticsProps {
  backgroundColor?: string;
}

export const PremiumStatistics: React.FC<PremiumStatisticsProps> = ({ 
  backgroundColor 
}) => {
  const { t } = useTranslation();
  
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
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        duration: 0.6, 
        ease: [0.25, 0.1, 0.25, 1.0] 
      }
    }
  };

  const statisticsData = [
    {
      value: '£500M+',
      labelKey: 'statistics.assetsRecovered',
      icon: '💰'
    },
    {
      value: '98%',
      labelKey: 'statistics.satisfaction',
      icon: '⭐'
    },
    {
      value: '2,500+',
      labelKey: 'statistics.casesResolved',
      icon: '📈'
    },
    {
      value: '24h',
      labelKey: 'statistics.responseTime',
      icon: '⚡'
    }
  ];

  return (
    <StatisticsSection style={backgroundColor ? { background: backgroundColor } : {}}>
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <StatisticsHeader>
            <motion.div variants={itemVariants}>
              <MainTitle>{t('statistics.mainTitle')}</MainTitle>
              <Subtitle>{t('statistics.subtitle')}</Subtitle>
            </motion.div>
          </StatisticsHeader>
          
          <StatisticsGrid>
            {statisticsData.map((stat, index) => (
              <StatCard
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <StatValue>{stat.value}</StatValue>
                <StatLabel>{t(stat.labelKey)}</StatLabel>
                <StatIcon>{stat.icon}</StatIcon>
              </StatCard>
            ))}
          </StatisticsGrid>
        </motion.div>
      </Container>
    </StatisticsSection>
  );
};

export default PremiumStatistics; 