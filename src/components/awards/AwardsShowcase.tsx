/**
 * AwardsShowcase Component
 * 
 * Displays a collection of awards in a visually appealing grid or carousel.
 * Implements sacred geometry principles for layout and animations.
 */

import * as React from 'react';
import styled, { css, DefaultTheme } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import AwardBadge, { AwardBadgeProps } from './AwardBadge';
import { Text } from '../../design-system/components/typography/Text';
import { Heading } from '../../design-system/components/typography/Heading';
import { Box } from '../../design-system/components/layout/Box';
import { Grid } from '../../design-system/components/layout/Grid';
import { getFibonacciByIndex } from '../../utils/getFibonacciByIndex';
import { PHI, SACRED_SPACING } from '../../constants/sacred-geometry';
import { BotanicalElement } from '../../design-system/components/botanical/BotanicalElement';

// Award display types
export type AwardsDisplayMode = 'grid' | 'carousel' | 'featured';
export type AwardsLayout = 'horizontal' | 'vertical';

export interface Award extends Omit<AwardBadgeProps, 'onClick'> {
  id: string;
  description?: string;
  detailsUrl?: string;
}

export interface AwardsShowcaseProps {
  /** Collection of awards to display */
  awards: Award[];
  
  /** Optional showcase title */
  title?: string;
  
  /** Optional showcase description */
  description?: string;
  
  /** Display mode for the awards */
  displayMode?: AwardsDisplayMode;
  
  /** Layout direction */
  layout?: AwardsLayout;
  
  /** Max number of awards to show at once */
  maxVisible?: number;
  
  /** Show more details when award is clicked */
  showDetailsOnClick?: boolean;
  
  /** Enable hover animations */
  animateOnHover?: boolean;
  
  /** Show botanical decorations */
  showBotanical?: boolean;
  
  /** Additional classes */
  className?: string;
  
  /** Callback when an award is selected */
  onAwardSelect?: (award: Award) => void;
}

// Make sure Typescript is aware of the custom props
type StyledProps<P> = P & { theme?: DefaultTheme };

const ShowcaseContainer = styled.div<{
  $layout: AwardsLayout;
}>`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${SACRED_SPACING.md}px;
`;

const AwardsGrid = styled(Grid)<{
  $displayMode: AwardsDisplayMode;
}>`
  --min-column-width: ${getFibonacciByIndex(9)}px;
  
  display: grid;
  grid-template-columns: repeat(
    auto-fill, 
    minmax(var(--min-column-width), 1fr)
  );
  gap: ${SACRED_SPACING.lg}px;
  
  ${(props: StyledProps<{$displayMode: AwardsDisplayMode}>) => props.$displayMode === 'featured' && `
    grid-template-columns: repeat(3, 1fr);
    
    @media (max-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }
    
    @media (max-width: 480px) {
      grid-template-columns: 1fr;
    }
  `}
`;

const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  padding: ${SACRED_SPACING.md}px 0;
`;

const CarouselTrack = styled(motion.div)`
  display: flex;
  gap: ${SACRED_SPACING.md}px;
  padding: 0 ${SACRED_SPACING.sm}px;
`;

const AwardContainer = styled(motion.div)<{
  $isActive?: boolean;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${SACRED_SPACING.md}px;
  border-radius: ${SACRED_SPACING.sm}px;
  transition: all 0.3s ease;
  
  ${(props: StyledProps<{$isActive?: boolean}>) => props.$isActive && `
    box-shadow: 0 ${getFibonacciByIndex(4)}px ${getFibonacciByIndex(6)}px rgba(0, 0, 0, 0.1);
    background-color: rgba(255, 255, 255, 0.8);
  `}
`;

const AwardDescription = styled(Text)`
  margin-top: ${SACRED_SPACING.sm}px;
  text-align: center;
  max-width: ${getFibonacciByIndex(10)}px;
  opacity: 0.9;
  line-height: ${1 * PHI};
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: ${SACRED_SPACING.md}px;
  margin-top: ${SACRED_SPACING.md}px;
`;

const NavButton = styled.button`
  width: ${getFibonacciByIndex(7)}px;
  height: ${getFibonacciByIndex(7)}px;
  border-radius: 50%;
  background: #fff;
  border: 1px solid #ddd;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  
  &:hover {
    background: #f5f5f5;
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
  
  svg {
    width: ${getFibonacciByIndex(5)}px;
    height: ${getFibonacciByIndex(5)}px;
  }
`;

const BotanicalDecoration = styled.div<{
  $position: 'left' | 'right' | 'top' | 'bottom';
}>`
  position: absolute;
  opacity: 0.15;
  pointer-events: none;
  z-index: -1;
  
  ${(props: StyledProps<{$position: 'left' | 'right' | 'top' | 'bottom'}>) => props.$position === 'left' && css`
    left: -${getFibonacciByIndex(8)}px;
    top: 50%;
    transform: translateY(-50%) rotate(-90deg);
  `}
  
  ${(props: StyledProps<{$position: 'left' | 'right' | 'top' | 'bottom'}>) => props.$position === 'right' && css`
    right: -${getFibonacciByIndex(8)}px;
    top: 50%;
    transform: translateY(-50%) rotate(90deg);
  `}
  
  ${(props: StyledProps<{$position: 'left' | 'right' | 'top' | 'bottom'}>) => props.$position === 'top' && css`
    top: -${getFibonacciByIndex(7)}px;
    left: 50%;
    transform: translateX(-50%);
  `}
  
  ${(props: StyledProps<{$position: 'left' | 'right' | 'top' | 'bottom'}>) => props.$position === 'bottom' && css`
    bottom: -${getFibonacciByIndex(7)}px;
    left: 50%;
    transform: translateX(-50%) rotate(180deg);
  `}
`;

// Framer motion variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1 * PHI,
      delayChildren: 0.2,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.43, 0.13, 0.23, 0.96] // Easing curve based on PHI
    }
  }
};

// AwardsShowcase component implementation
const AwardsShowcase: React.FC<AwardsShowcaseProps> = ({
  awards,
  title,
  description,
  displayMode = 'grid',
  layout = 'horizontal',
  maxVisible = 6,
  showDetailsOnClick = true,
  animateOnHover = true,
  showBotanical = false,
  className,
  onAwardSelect
}) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [selectedAward, setSelectedAward] = React.useState<Award | null>(null);
  
  const handleNext = () => {
    setCurrentIndex(prev => 
      (prev + maxVisible >= awards.length) ? 0 : prev + maxVisible
    );
  };
  
  const handlePrev = () => {
    setCurrentIndex(prev => 
      (prev - maxVisible < 0) ? Math.max(0, awards.length - maxVisible) : prev - maxVisible
    );
  };
  
  const handleAwardClick = (award: Award) => {
    if (showDetailsOnClick) {
      setSelectedAward(selectedAward?.id === award.id ? null : award);
    }
    
    if (onAwardSelect) {
      onAwardSelect(award);
    }
  };
  
  const visibleAwards = displayMode === 'carousel' 
    ? awards.slice(currentIndex, currentIndex + maxVisible)
    : awards;
  
  const renderAward = (award: Award, index: number) => (
    <AwardContainer
      key={award.id}
      $isActive={selectedAward?.id === award.id}
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      custom={index}
      whileHover={animateOnHover ? { y: -5, transition: { duration: 0.2 } } : {}}
    >
      <AwardBadge
        {...award}
        onClick={() => handleAwardClick(award)}
        animated={selectedAward?.id === award.id}
        showBotanical={showBotanical}
      />
      
      {selectedAward?.id === award.id && award.description && (
        <AwardDescription>
          {award.description}
        </AwardDescription>
      )}
    </AwardContainer>
  );
  
  return (
    <ShowcaseContainer $layout={layout} className={className}>
      {/* Title and description */}
      {(title || description) && (
        <Box mb={SACRED_SPACING.md}>
          {title && <Heading as="h3" mb={SACRED_SPACING.xs}>{title}</Heading>}
          {description && <Text>{description}</Text>}
        </Box>
      )}
      
      {/* Botanical decorations */}
      {showBotanical && (
        <>
          <BotanicalDecoration $position="left">
            <BotanicalElement width={120} height={120}>
              <path
                d="M10,90 Q30,40 50,90 Q70,40 90,90"
                stroke="currentColor"
                fill="none"
                strokeWidth={2}
              />
            </BotanicalElement>
          </BotanicalDecoration>
          <BotanicalDecoration $position="right">
            <BotanicalElement width={120} height={120}>
              <path
                d="M10,90 Q30,40 50,90 Q70,40 90,90"
                stroke="currentColor"
                fill="none"
                strokeWidth={2} 
              />
            </BotanicalElement>
          </BotanicalDecoration>
        </>
      )}
      
      {/* Awards display based on mode */}
      {displayMode === 'grid' && (
        <AwardsGrid
          $displayMode={displayMode}
          as={motion.div}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {visibleAwards.map((award, index) => renderAward(award, index))}
        </AwardsGrid>
      )}
      
      {displayMode === 'featured' && (
        <AwardsGrid
          $displayMode={displayMode}
          as={motion.div}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {visibleAwards.slice(0, 3).map((award, index) => renderAward(award, index))}
        </AwardsGrid>
      )}
      
      {displayMode === 'carousel' && (
        <>
          <CarouselContainer>
            <AnimatePresence mode="wait">
              <CarouselTrack
                key={currentIndex}
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -100, opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {visibleAwards.map((award, index) => renderAward(award, index))}
              </CarouselTrack>
            </AnimatePresence>
          </CarouselContainer>
          
          {/* Navigation buttons for carousel */}
          <NavigationButtons>
            <NavButton onClick={handlePrev} aria-label="Previous awards">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </NavButton>
            <NavButton onClick={handleNext} aria-label="Next awards">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </NavButton>
          </NavigationButtons>
        </>
      )}
    </ShowcaseContainer>
  );
};

export default AwardsShowcase; 















