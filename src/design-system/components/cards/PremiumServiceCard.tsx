import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PREMIUM_SPACING } from '../../../design-system/tokens';
import { PREMIUM_COLORS } from '../../../design-system/tokens/colors.premium';
import FallbackImage from '../../../design-system/components/utility/FallbackImage';

interface PremiumServiceCardProps {
  icon: string | React.ReactNode;
  title: string;
  description: string;
  href: string;
}

const CardContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  background-color: #FFFFFF;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
  position: relative;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(to right, 
      ${PREMIUM_COLORS.BASE_COLORS.forest[600]}, 
      ${PREMIUM_COLORS.BASE_COLORS.gold[500]}
    );
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover::after {
    opacity: 1;
  }
`;

const CardLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: ${PREMIUM_SPACING.lg}px;
  
  &:focus {
    outline: 2px solid ${PREMIUM_COLORS.BASE_COLORS.gold[500]};
    outline-offset: -2px;
  }
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  margin-bottom: ${PREMIUM_SPACING.md}px;
  transition: transform 0.3s ease;
  
  ${CardContainer}:hover & {
    transform: scale(1.05);
  }
`;

// Default SVG to show when an image fails to load
const DefaultServiceIcon = () => (
  <svg
    width="56"
    height="56"
    viewBox="0 0 56 56"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="56" height="56" rx="8" fill="#f0f5f9"/>
    <path
      d="M28 20v16M20 28h16"
      stroke="#0A4021"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 ${PREMIUM_SPACING.sm}px;
  color: ${PREMIUM_COLORS.BASE_COLORS.forest[700]};
  font-family: 'Playfair Display', serif;
  transition: color 0.3s ease;
  
  ${CardContainer}:hover & {
    color: ${PREMIUM_COLORS.BASE_COLORS.forest[600]};
  }
`;

const CardDescription = styled.p`
  font-size: 0.95rem;
  line-height: 1.6;
  color: ${PREMIUM_COLORS.BASE_COLORS.gray[600]};
  margin: 0;
  flex-grow: 1;
`;

const ArrowIndicator = styled.div`
  display: flex;
  align-items: center;
  margin-top: ${PREMIUM_SPACING.md}px;
  color: ${PREMIUM_COLORS.BASE_COLORS.gold[500]};
  font-size: 0.875rem;
  font-weight: 500;
  opacity: 0;
  transform: translateX(-8px);
  transition: opacity 0.3s ease, transform 0.3s ease;
  
  ${CardContainer}:hover & {
    opacity: 1;
    transform: translateX(0);
  }
  
  svg {
    margin-left: 4px;
  }
`;

export const PremiumServiceCard: React.FC<PremiumServiceCardProps> = ({
  icon,
  title,
  description,
  href,
}) => {
  const { t } = useTranslation();
  const handleImageError = (error: Error) => {
    console.warn(`[PremiumServiceCard] Failed to load icon for "${title}":`, error.message);
  };

  // Render icon based on type
  const renderIcon = () => {
    // If icon is a React component/element, render it directly
    if (React.isValidElement(icon)) {
      return icon;
    }
    
    // If icon is a string (URL), use FallbackImage
    if (typeof icon === 'string') {
      return (
        <FallbackImage 
          src={icon} 
          alt={`${title} Icon`}
          width="56"
          height="56"
          fallbackComponent={<DefaultServiceIcon />}
          onImageError={handleImageError}
        />
      );
    }
    
    // Fallback for any other type
    return <DefaultServiceIcon />;
  };

  return (
    <CardContainer>
      <CardLink to={href} aria-label={`Learn more about ${title}`}>
        <IconContainer>
          {renderIcon()}
        </IconContainer>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <ArrowIndicator>
          {t('buttons.learnMore', 'Learn more')}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z" fill="currentColor" />
          </svg>
        </ArrowIndicator>
      </CardLink>
    </CardContainer>
  );
};

export default PremiumServiceCard; 