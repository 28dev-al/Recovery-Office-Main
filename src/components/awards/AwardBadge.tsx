/**
 * AwardBadge Component
 * 
 * Displays decorative award badges with various shapes and styles.
 * Uses sacred geometry principles for proportions and visual harmony.
 */

import * as React from 'react';
import styled, { css, keyframes, DefaultTheme } from 'styled-components';
import { Text } from '../../design-system/components/typography/Text';
import { 
  PHI, 
  SACRED_SPACING 
} from '../../constants/sacred-geometry';
import { getFibonacciByIndex } from "../../utils/getFibonacciByIndex";
import { BotanicalElement } from '../../design-system/components/botanical/BotanicalElement';
import { ReactNode } from 'react';

// Award badge shapes
export type AwardBadgeShape = 'circle' | 'shield' | 'star' | 'ribbon' | 'laurel' | 'medal';

// Award badge variants
export type AwardBadgeVariant = 
  | 'gold' 
  | 'silver' 
  | 'bronze' 
  | 'platinum' 
  | 'certification' 
  | 'recognition'
  | 'custom';

// Award badge sizes
export type AwardBadgeSize = 'small' | 'medium' | 'large' | 'xlarge';

// Props interface for the AwardBadge component
export interface AwardBadgeProps {
  /** The shape of the award badge */
  shape?: AwardBadgeShape;
  
  /** The variant/material of the badge */
  variant?: AwardBadgeVariant;
  
  /** The size of the badge */
  size?: AwardBadgeSize;
  
  /** Title of the award */
  title?: string;
  
  /** Year the award was received */
  year?: number;
  
  /** Organization that issued the award */
  issuedBy?: string;
  
  /** Optional icon to display inside the badge */
  icon?: ReactNode;
  
  /** Optional custom color (for custom variant) */
  customColor?: string;
  
  /** Whether the badge should pulse/glow */
  animated?: boolean;
  
  /** Whether to add botanical decorations */
  showBotanical?: boolean;
  
  /** Click handler for the badge */
  onClick?: () => void;
  
  /** Additional CSS class */
  className?: string;
}

// Badge size mappings based on Fibonacci sequence
const sizeMap = {
  small: {
    badge: () => getFibonacciByIndex(7),
    icon: () => getFibonacciByIndex(6),
    title: () => getFibonacciByIndex(4),
    info: () => getFibonacciByIndex(3)
  },
  medium: {
    badge: () => getFibonacciByIndex(8),
    icon: () => getFibonacciByIndex(7),
    title: () => getFibonacciByIndex(5),
    info: () => getFibonacciByIndex(4)
  },
  large: {
    badge: () => getFibonacciByIndex(9),
    icon: () => getFibonacciByIndex(8),
    title: () => getFibonacciByIndex(6),
    info: () => getFibonacciByIndex(5)
  },
  xlarge: {
    badge: () => getFibonacciByIndex(10),
    icon: () => getFibonacciByIndex(9),
    title: () => getFibonacciByIndex(7),
    info: () => getFibonacciByIndex(6)
  }
};

// Color mappings for badge variants
const variantColorMap = {
  gold: {
    primary: '#FFD700',
    secondary: '#F5A623',
    text: '#5E4B10'
  },
  silver: {
    primary: '#C0C0C0',
    secondary: '#A9A9A9',
    text: '#333333'
  },
  bronze: {
    primary: '#CD7F32',
    secondary: '#A46628',
    text: '#3E2912'
  },
  platinum: {
    primary: '#E5E4E2',
    secondary: '#B4B4B4',
    text: '#333333'
  },
  certification: {
    primary: '#2B7EC1',
    secondary: '#1C5D9C',
    text: '#FFFFFF'
  },
  recognition: {
    primary: '#7B5EA7',
    secondary: '#5B4880',
    text: '#FFFFFF'
  },
  custom: {
    primary: '#4CAF50',
    secondary: '#388E3C',
    text: '#FFFFFF'
  }
};

// Animations for the badges
const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(255, 215, 0, 0.4);
  }
  70% {
    box-shadow: 0 0 0 ${getFibonacciByIndex(6)}px rgba(255, 215, 0, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(255, 215, 0, 0);
  }
`;

const shine = keyframes`
  0% {
    background-position: -${getFibonacciByIndex(9)}px;
  }
  40%, 100% {
    background-position: ${getFibonacciByIndex(10)}px;
  }
`;

// Make sure Typescript is aware of the custom props
type StyledProps<P> = P & { theme?: DefaultTheme };

// Styled components for the badge
const BadgeContainer = styled.div<{
  $animated?: boolean;
  $size: AwardBadgeSize;
}>`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: transform ${getFibonacciByIndex(5) * 10}ms ease;
  
  &:hover {
    transform: scale(${1 + (1 / PHI) * 0.1});
  }
`;

interface BadgeWrapperProps {
  $variant: AwardBadgeVariant;
  $shape: AwardBadgeShape;
  $size: AwardBadgeSize;
  $animated?: boolean;
  $customColor?: string;
}
const BadgeWrapper = styled.div<BadgeWrapperProps>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props: StyledProps<BadgeWrapperProps>) => sizeMap[props.$size].badge()}px;
  height: ${(props: StyledProps<BadgeWrapperProps>) => sizeMap[props.$size].badge()}px;
  background: ${(props: StyledProps<BadgeWrapperProps>) => props.$customColor || variantColorMap[props.$variant].primary};
  color: ${(props: StyledProps<BadgeWrapperProps>) => variantColorMap[props.$variant].text};
  
  ${(props: StyledProps<BadgeWrapperProps>) => props.$shape === 'circle' && css`
    border-radius: 50%;
  `}
  
  ${(props: StyledProps<BadgeWrapperProps>) => props.$shape === 'shield' && css`
    clip-path: polygon(
      50% 0%, 
      100% 25%, 
      100% 75%, 
      50% 100%, 
      0% 75%, 
      0% 25%
    );
  `}
  
  ${(props: StyledProps<BadgeWrapperProps>) => props.$shape === 'star' && css`
    clip-path: polygon(
      50% 0%, 
      61.8% 35.4%, 
      98.2% 35.4%, 
      68.2% 57.3%, 
      79.1% 91.3%, 
      50% 70%, 
      20.9% 91.3%, 
      31.8% 57.3%, 
      1.8% 35.4%, 
      38.2% 35.4%
    );
  `}
  
  ${(props: StyledProps<BadgeWrapperProps>) => props.$shape === 'ribbon' && css`
    clip-path: polygon(
      0% 0%, 
      100% 0%, 
      100% 70%, 
      50% 100%, 
      0% 70%
    );
  `}
  
  ${(props: StyledProps<BadgeWrapperProps>) => props.$shape === 'medal' && css`
    border-radius: 50%;
    border: ${getFibonacciByIndex(3)}px solid ${(props: StyledProps<BadgeWrapperProps>) => variantColorMap[props.$variant].secondary};
  `}
  
  ${(props: StyledProps<BadgeWrapperProps>) => props.$shape === 'laurel' && css`
    border-radius: 50%;
    &::before, &::after {
      content: '';
      position: absolute;
      width: ${(props: StyledProps<BadgeWrapperProps>) => sizeMap[props.$size].badge() * 0.8}px;
      height: ${(props: StyledProps<BadgeWrapperProps>) => sizeMap[props.$size].badge() * 0.8}px;
      border: ${getFibonacciByIndex(2)}px solid ${(props: StyledProps<BadgeWrapperProps>) => variantColorMap[props.$variant].secondary};
      border-radius: 50% 50% 50% 50% / 50% 50% 50% 50%;
    }
    &::before {
      left: -${getFibonacciByIndex(5)}px;
      clip-path: polygon(100% 0%, 100% 100%, 50% 100%, 50% 0%);
    }
    &::after {
      right: -${getFibonacciByIndex(5)}px;
      clip-path: polygon(0% 0%, 0% 100%, 50% 100%, 50% 0%);
    }
  `}
  
  ${(props: StyledProps<BadgeWrapperProps>) => props.$animated && css`
    animation: ${pulse} ${getFibonacciByIndex(8) * 100}ms infinite;
    background: linear-gradient(
      90deg, 
      ${props.$customColor || variantColorMap[props.$variant].primary} 0%, 
      ${(props: StyledProps<BadgeWrapperProps>) => variantColorMap[props.$variant].secondary} 50%,
      ${props.$customColor || variantColorMap[props.$variant].primary} 100%
    );
    background-size: ${getFibonacciByIndex(10)}px;
    animation: ${shine} ${getFibonacciByIndex(10) * 100}ms infinite linear;
  `}
  
  box-shadow: 0 ${getFibonacciByIndex(3)}px ${getFibonacciByIndex(5)}px rgba(0, 0, 0, 0.2);
`;

const IconWrapper = styled.div<{
  $size: AwardBadgeSize;
}>`
  font-size: ${(props: StyledProps<{$size: AwardBadgeSize}>) => sizeMap[props.$size].icon()}px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BadgeInfo = styled.div`
  margin-top: ${SACRED_SPACING.sm}px;
  text-align: center;
  max-width: ${getFibonacciByIndex(9)}px;
`;

const BadgeTitle = styled(Text)<{
  $size: AwardBadgeSize;
}>`
  font-size: ${(props: StyledProps<{$size: AwardBadgeSize}>) => sizeMap[props.$size].title()}px;
  font-weight: 600;
  margin-bottom: ${SACRED_SPACING.xs}px;
  line-height: ${1 * PHI};
`;

const BadgeDetails = styled(Text)<{
  $size: AwardBadgeSize;
}>`
  font-size: ${(props: StyledProps<{$size: AwardBadgeSize}>) => sizeMap[props.$size].info()}px;
  color: #666;
  line-height: ${1 * PHI};
`;

interface BotanicalDecorationProps {
  $variant: AwardBadgeVariant;
  $size: AwardBadgeSize;
}
const BotanicalDecoration = styled.div<BotanicalDecorationProps>`
  position: absolute;
  opacity: 0.2;
  color: ${(props: StyledProps<BotanicalDecorationProps>) => variantColorMap[props.$variant].secondary};
  pointer-events: none;
`;

const LeftBotanical = styled(BotanicalDecoration)`
  left: -${getFibonacciByIndex(6)}px;
  top: 50%;
  transform: translateY(-50%) rotate(-90deg);
`;

const RightBotanical = styled(BotanicalDecoration)`
  right: -${getFibonacciByIndex(6)}px;
  top: 50%;
  transform: translateY(-50%) rotate(90deg);
`;

// AwardBadge component implementation
const AwardBadge: React.FC<AwardBadgeProps> = ({
  shape = 'circle',
  variant = 'gold',
  size = 'medium',
  title,
  year,
  issuedBy,
  icon,
  customColor,
  animated = false,
  showBotanical = false,
  onClick,
  className
}) => {
  return (
    <BadgeContainer 
      $animated={animated}
      $size={size}
      onClick={onClick}
      className={className}
    >
      <BadgeWrapper
        $variant={variant}
        $shape={shape}
        $size={size}
        $animated={animated}
        $customColor={customColor ?? ''}
      >
        {/* Award icon or symbol */}
        <IconWrapper $size={size}>
          {icon}
        </IconWrapper>
        
        {/* Botanical decorations if enabled */}
        {showBotanical && (
          <>
            <LeftBotanical $variant={variant} $size={size}>
              <BotanicalElement 
                width={sizeMap[size].badge() * 0.7}
                height={sizeMap[size].badge() * 0.7}
              >
                <path 
                  d="M10,90 Q30,40 50,90 Q70,40 90,90" 
                  stroke="currentColor" 
                  fill="none" 
                  strokeWidth={2}
                />
              </BotanicalElement>
            </LeftBotanical>
            <RightBotanical $variant={variant} $size={size}>
              <BotanicalElement 
                width={sizeMap[size].badge() * 0.7}
                height={sizeMap[size].badge() * 0.7} 
              >
                <path 
                  d="M10,90 Q30,40 50,90 Q70,40 90,90" 
                  stroke="currentColor" 
                  fill="none" 
                  strokeWidth={2} 
                />
              </BotanicalElement>
            </RightBotanical>
          </>
        )}
      </BadgeWrapper>
      
      {/* Badge information */}
      {(title || year || issuedBy) && (
        <BadgeInfo>
          {title && (
            <BadgeTitle $size={size}>{title}</BadgeTitle>
          )}
          {(year || issuedBy) && (
            <BadgeDetails $size={size}>
              {issuedBy && <span>{issuedBy}</span>}
              {issuedBy && year && <span> · </span>}
              {year && <span>{year}</span>}
            </BadgeDetails>
          )}
        </BadgeInfo>
      )}
    </BadgeContainer>
  );
};

export default AwardBadge; 














