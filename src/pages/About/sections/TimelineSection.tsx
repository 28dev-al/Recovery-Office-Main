import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Container } from '../../../design-system/components/layout/Container';
import SectionTitle from '../../../design-system/components/layout/Section/SectionTitle';
import { PREMIUM_SPACING } from '../../../design-system/tokens';
import { useInView } from 'react-intersection-observer';
import BotanicalDecorator from '../../../design-system/botanical/BotanicalDecorator';

// Styled components
const TimelineContainer = styled.section`
  padding: ${PREMIUM_SPACING.xxl}px 0;
  background-color: ${props => props.theme.colors.background.light};
  position: relative;
  overflow: hidden;
`;

const TimelineHeader = styled.div`
  text-align: center;
  margin-bottom: ${PREMIUM_SPACING.xl}px;
  position: relative;
  z-index: 2;
`;

const TimelineDescription = styled.p`
  font-size: 1.125rem;
  color: ${props => props.theme.colors.text.secondary};
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
`;

const Timeline = styled.div`
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${PREMIUM_SPACING.lg}px;
  
  &:before {
    content: '';
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 4px;
    margin-left: -2px;
    background: ${props => props.theme.colors.primary[100]};
    
    @media (max-width: ${props => props.theme.breakpoints.md}px) {
      left: 30px;
    }
  }
`;

interface TimelineItemProps {
  align: 'left' | 'right';
}

const TimelineItem = styled.div<TimelineItemProps>`
  position: relative;
  width: 50%;
  padding: 0 ${PREMIUM_SPACING.lg}px;
  box-sizing: border-box;
  margin-bottom: ${PREMIUM_SPACING.xl}px;
  
  ${props => props.align === 'left' ? `
    left: 0;
  ` : `
    left: 50%;
  `}
  
  &:last-child {
    margin-bottom: 0;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.md}px) {
    width: 100%;
    padding-left: 70px;
    padding-right: 0;
    left: 0;
  }
`;

const TimelineContent = styled(motion.div)`
  position: relative;
  padding: ${PREMIUM_SPACING.lg}px;
  border-radius: 8px;
  background: white;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  border: 1px solid ${props => props.theme.colors.border.light};
  
  &:before {
    content: '';
    position: absolute;
    top: 20px;
    width: 20px;
    height: 20px;
    background: white;
    transform: rotate(45deg);
  }
`;

const TimelineContentLeft = styled(TimelineContent)`
  &:before {
    right: -10px;
    border-right: 1px solid ${props => props.theme.colors.border.light};
    border-top: 1px solid ${props => props.theme.colors.border.light};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.md}px) {
    &:before {
      left: -10px;
      right: auto;
      border-left: 1px solid ${props => props.theme.colors.border.light};
      border-bottom: 1px solid ${props => props.theme.colors.border.light};
      border-right: none;
      border-top: none;
    }
  }
`;

const TimelineContentRight = styled(TimelineContent)`
  &:before {
    left: -10px;
    border-left: 1px solid ${props => props.theme.colors.border.light};
    border-bottom: 1px solid ${props => props.theme.colors.border.light};
  }
`;

const TimelineDot = styled.div`
  position: absolute;
  width: 24px;
  height: 24px;
  background: ${props => props.theme.colors.primary[600]};
  border-radius: 50%;
  top: 20px;
  
  &:before {
    content: '';
    position: absolute;
    width: 16px;
    height: 16px;
    background: ${props => props.theme.colors.accent.gold};
    border-radius: 50%;
    top: 4px;
    left: 4px;
  }
`;

const TimelineDotLeft = styled(TimelineDot)`
  right: -12px;
  
  @media (max-width: ${props => props.theme.breakpoints.md}px) {
    left: 24px;
    right: auto;
  }
`;

const TimelineDotRight = styled(TimelineDot)`
  left: -12px;
`;

const TimelineYear = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${props => props.theme.colors.primary[700]};
  margin-bottom: ${PREMIUM_SPACING.xs}px;
`;

const TimelineTitle = styled.h3`
  font-size: 1.5rem;
  margin: 0 0 ${PREMIUM_SPACING.sm}px;
  color: ${props => props.theme.colors.text.primary};
`;

const TimelineText = styled.p`
  font-size: 1rem;
  color: ${props => props.theme.colors.text.secondary};
  line-height: 1.6;
  margin: 0;
`;

// Timeline milestones data
const timelineData = [
  {
    year: '2014',
    title: 'Company Founded',
    description: 'Recovery Office was established with a focus on helping victims of financial fraud recover their assets. Initially specializing in investment fraud cases.'
  },
  {
    year: '2016',
    title: 'Expansion into Digital Asset Recovery',
    description: 'As cryptocurrency fraud began to rise, we developed specialized blockchain forensics capabilities and became one of the first firms to offer cryptocurrency recovery services.'
  },
  {
    year: '2018',
    title: 'International Operations',
    description: 'Opened offices in key financial centers across Europe and North America to better serve clients with cross-border financial recovery needs.'
  },
  {
    year: '2019',
    title: 'Regulatory Recognition',
    description: 'Received official recognition from financial regulatory authorities, establishing our firm as a trusted partner in combating financial fraud.'
  },
  {
    year: '2021',
    title: 'Advanced Analytics Department',
    description: 'Launched our Advanced Analytics department, utilizing AI and machine learning to enhance asset tracing capabilities and fraud detection methodologies.'
  },
  {
    year: '2023',
    title: 'Leading Recovery Provider',
    description: 'Recognized as a leading financial recovery provider with over £100 million in assets recovered for clients and a 70% success rate across all case types.'
  }
];

// Separate TimelineItem component to properly use the useInView hook
interface TimelineItemComponentProps {
  item: {
    year: string;
    title: string;
    description: string;
  };
  index: number;
}

const TimelineItemComponent: React.FC<TimelineItemComponentProps> = ({ item, index }) => {
  // Now useInView is properly called at the component level, not inside a callback
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  });
  
  const isEven = index % 2 === 0;
  const align = isEven ? 'left' : 'right';
  
  const variants = {
    hidden: { 
      opacity: 0, 
      x: isEven ? -30 : 30 
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.6, 
        delay: index * 0.2 
      }
    }
  };
  
  return (
    <TimelineItem align={align}>
      {isEven ? (
        <>
          <TimelineContentLeft
            ref={ref}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={variants}
          >
            <TimelineYear>{item.year}</TimelineYear>
            <TimelineTitle>{item.title}</TimelineTitle>
            <TimelineText>{item.description}</TimelineText>
          </TimelineContentLeft>
          <TimelineDotLeft />
        </>
      ) : (
        <>
          <TimelineContentRight
            ref={ref}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={variants}
          >
            <TimelineYear>{item.year}</TimelineYear>
            <TimelineTitle>{item.title}</TimelineTitle>
            <TimelineText>{item.description}</TimelineText>
          </TimelineContentRight>
          <TimelineDotRight />
        </>
      )}
    </TimelineItem>
  );
};

export const TimelineSection: React.FC = () => {
  return (
    <TimelineContainer>
      <BotanicalDecorator position="topRight" botanicalType="oliveLeaf" opacity={0.05}>
        <Container>
          <TimelineHeader>
            <SectionTitle title="Our Journey" marginBottom="1rem" />
            <TimelineDescription>
              Since our founding, Recovery Office has been at the forefront of financial recovery services,
              continuously adapting to new challenges in the financial fraud landscape and expanding our capabilities.
            </TimelineDescription>
          </TimelineHeader>
          
          <Timeline>
            {timelineData.map((item, index) => (
              <TimelineItemComponent key={index} item={item} index={index} />
            ))}
          </Timeline>
        </Container>
      </BotanicalDecorator>
    </TimelineContainer>
  );
};

export default TimelineSection; 