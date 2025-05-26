import * as React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// Import base card component
import Card, { CardProps } from './Card';

// Import sacred geometry constants
import { PHI, PHI_INVERSE, FIBONACCI } from '../../../constants/sacred-geometry';

// Import components
import { Box, Flex } from '../layout';
import { Text } from '../typography';
import { Button } from '../button';

export interface ServiceCardProps extends Omit<CardProps, 'children'> {
  /** Service title */
  title: string;
  
  /** Service description */
  description: string;
  
  /** Service icon */
  icon?: React.ReactNode;
  
  /** Action button text */
  ctaText?: string;
  
  /** Action button URL */
  ctaUrl?: string;
  
  /** Action button callback */
  onCtaClick?: () => void;
  
  /** Accent color for highlights */
  accentColor?: string;
  
  /** Image URL for the service */
  imageUrl?: string;
  
  /** Whether to display a styled border */
  withBorder?: boolean;
  
  /** Whether all cards in a row should have equal height */
  equalHeight?: boolean;
  
  /** Additional props to pass to the CTA button */
  buttonProps?: Record<string, any>;
}

/**
 * ServiceCard Component
 * 
 * A specialized card component for displaying services with consistent styling.
 * Built on sacred geometry principles for harmonious proportions.
 */
const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  icon,
  ctaText = "Learn More",
  ctaUrl,
  onCtaClick,
  accentColor,
  imageUrl,
  withBorder = false,
  equalHeight = true,
  variant = 'primary',
  interactive = true,
  elevated = true,
  buttonProps = {},
  ...restProps
}) => {
  // Handle button click event
  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card onClick from firing
    if (onCtaClick) onCtaClick();
  };
  
  return (
    <StyledServiceCard
      variant={variant}
      interactive={interactive}
      elevated={elevated}
      $accentColor={accentColor}
      $withBorder={withBorder}
      $equalHeight={equalHeight}
      $hasImage={!!imageUrl}
      {...restProps}
    >
      <CardContent>
        {imageUrl && (
          <ImageContainer>
            <CardImage src={imageUrl} alt={title} />
          </ImageContainer>
        )}
        
        <ContentContainer>
          {icon && <IconWrapper>{icon}</IconWrapper>}
          
          <TitleContainer>
            <CardTitle $accentColor={accentColor}>
              {title}
            </CardTitle>
          </TitleContainer>
          
          <DescriptionContainer>
            <StyledText color="text.secondary">
              {description}
            </StyledText>
          </DescriptionContainer>
          
          {(ctaText && (ctaUrl || onCtaClick)) && (
            <CtaContainer>
              <StyledButton
                variant={accentColor ? "outline" : "primary"}
                size="md"
                onClick={handleButtonClick}
                href={ctaUrl}
                {...buttonProps}
              >
                {ctaText}
              </StyledButton>
            </CtaContainer>
          )}
        </ContentContainer>
      </CardContent>
      
      {accentColor && <AccentBar $accentColor={accentColor} />}
    </StyledServiceCard>
  );
};

// Styled components
interface StyledServiceCardProps {
  $accentColor?: string;
  $withBorder: boolean;
  $equalHeight: boolean;
  $hasImage: boolean;
}

const StyledServiceCard = styled(Card)<StyledServiceCardProps>`
  display: flex;
  flex-direction: column;
  height: ${props => props.$equalHeight ? '100%' : 'auto'};
  min-height: ${props => props.$hasImage ? '450px' : '320px'};
  border: ${props => props.$withBorder ? `1px solid ${props.theme.colors.background[300] ?? 1}` : 'none'};
  transition: all 0.3s cubic-bezier(${PHI_INVERSE}, 0, ${1 - PHI_INVERSE}, 1);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.shadows.lg};
  }
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: ${FIBONACCI[6]}px;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${FIBONACCI[9]}px;
  height: ${FIBONACCI[9]}px;
  margin-bottom: ${FIBONACCI[5]}px;
  color: ${props => props.theme.colors.primary[500]};
  
  svg {
    width: 100%;
    height: 100%;
  }
`;

const TitleContainer = styled.div`
  margin-bottom: ${FIBONACCI[5]}px;
`;

interface CardTitleProps {
  $accentColor?: string;
}

const CardTitle = styled.h3<CardTitleProps>`
  font-family: ${props => props.theme.typography.fontFamily.heading};
  font-size: ${props => props.theme.typography.fontSize.lg}px;
  font-weight: ${props => props.theme.typography.fontWeight.semiBold};
  margin: 0 0 ${FIBONACCI[4]}px 0;
  color: ${props => props.$accentColor || props.theme.colors.text.primary};
  transition: color 0.3s ease;
`;

const DescriptionContainer = styled.div`
  flex: 1;
  margin-bottom: ${FIBONACCI[6]}px;
`;

const StyledText = styled(Text)`
  line-height: 1.6;
`;

const CtaContainer = styled.div`
  margin-top: auto;
`;

const StyledButton = styled(Button)`
  width: fit-content;
`;

const ImageContainer = styled.div`
  height: 200px;
  width: 100%;
  overflow: hidden;
  border-top-left-radius: ${props => props.theme.radius.md}px;
  border-top-right-radius: ${props => props.theme.radius.md}px;
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s cubic-bezier(${PHI_INVERSE}, 0, ${1 - PHI_INVERSE}, 1);
  
  ${StyledServiceCard}:hover & {
    transform: scale(${1 + PHI_INVERSE * 0.2});
  }
`;

interface AccentBarProps {
  $accentColor: string;
}

const AccentBar = styled.div<AccentBarProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background-color: ${props => props.$accentColor || props.theme.colors.primary[500]};
`;

export default ServiceCard; 