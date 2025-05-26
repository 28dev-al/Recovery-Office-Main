import React from 'react';
import styled from 'styled-components';
import { PREMIUM_SPACING } from '../../../design-system/tokens';
import { Container } from '../../../design-system/components/layout/Container';

const TimelineSection = styled.section`
  padding: ${PREMIUM_SPACING.xxl}px 0;
  background-color: #f9fafb;
`;

const TimelineHeader = styled.div`
  text-align: center;
  max-width: 700px;
  margin: 0 auto ${PREMIUM_SPACING.xl}px;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: ${PREMIUM_SPACING.md}px;
  color: ${props => props.theme.colors.primary[700]};
  font-family: ${props => props.theme.typography.fontFamily.heading};
  
  @media (max-width: ${props => props.theme.breakpoints.md}px) {
    font-size: 2rem;
  }
`;

const SectionDescription = styled.p`
  font-size: 1.125rem;
  color: ${props => props.theme.colors.text.secondary};
  line-height: 1.6;
  margin: 0 auto;
`;

const TimelineContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
  padding: ${PREMIUM_SPACING.lg}px 0;
  
  /* Vertical connecting line */
  &:before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    width: 4px;
    background: ${props => props.theme.colors.primary[200]};
    transform: translateX(-50%);
    
    @media (max-width: 768px) {
      left: 30px;
    }
  }
`;

const TimelineItem = styled.div<{ $isEven: boolean }>`
  display: flex;
  margin-bottom: ${PREMIUM_SPACING.xxl}px;
  position: relative;
  justify-content: ${props => props.$isEven ? 'flex-start' : 'flex-end'};
  
  &:last-child {
    margin-bottom: 0;
  }
  
  /* Horizontal connecting line */
  &:after {
    content: '';
    position: absolute;
    top: 30px;
    width: 40px;
    height: 4px;
    background: ${props => props.theme.colors.primary[200]};
    ${props => props.$isEven ? 'right: calc(50% + 30px);' : 'left: calc(50% + 30px);'}
    
    @media (max-width: 768px) {
      left: 30px;
      width: 40px;
    }
  }
  
  @media (max-width: 768px) {
    justify-content: flex-start;
    padding-left: 80px;
    
    &:after {
      left: 30px;
      width: 40px;
    }
  }
`;

const TimelineNumber = styled.div<{ $isEven: boolean }>`
  width: 60px;
  height: 60px;
  background: ${props => props.theme.colors.primary[700]};
  border-radius: 50%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 0;
  z-index: 2;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  
  @media (max-width: 768px) {
    left: 30px;
    transform: translateX(0);
  }
`;

const TimelineContent = styled.div<{ $isEven: boolean }>`
  background: white;
  border-radius: 8px;
  padding: ${PREMIUM_SPACING.lg}px;
  width: calc(45% - ${PREMIUM_SPACING.xl}px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  position: relative;
  border: 1px solid ${props => props.theme.colors.background[100]};
  margin-top: 30px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }
  
  /* Arrow pointer */
  &:before {
    content: '';
    position: absolute;
    top: 20px;
    ${props => props.$isEven 
      ? 'right: -10px; transform: rotate(45deg);' 
      : 'left: -10px; transform: rotate(-135deg);'
    }
    width: 20px;
    height: 20px;
    background: white;
    box-shadow: ${props => props.$isEven 
      ? '-2px 2px 3px rgba(0, 0, 0, 0.05)' 
      : '2px -2px 3px rgba(0, 0, 0, 0.05)'
    };
    border: ${props => props.$isEven 
      ? '0 solid transparent; border-bottom: 1px solid ${props.theme.colors.background[100]}; border-left: 1px solid ${props.theme.colors.background[100]}'
      : '0 solid transparent; border-top: 1px solid ${props.theme.colors.background[100]}; border-right: 1px solid ${props.theme.colors.background[100]}'
    };
    
    @media (max-width: 768px) {
      left: -10px;
      transform: rotate(-135deg);
      right: auto;
      box-shadow: 2px -2px 3px rgba(0, 0, 0, 0.05);
      border: 0 solid transparent;
      border-top: 1px solid ${props => props.theme.colors.background[100]};
      border-right: 1px solid ${props => props.theme.colors.background[100]};
    }
  }
  
  @media (max-width: 768px) {
    width: 100%;
    margin-top: 30px;
  }
`;

const TimelineTitle = styled.h3`
  color: ${props => props.theme.colors.primary[700]};
  margin-top: 0;
  margin-bottom: ${PREMIUM_SPACING.sm}px;
  font-size: 1.25rem;
  font-family: ${props => props.theme.typography.fontFamily.heading};
  font-weight: 600;
`;

const TimelineDescription = styled.p`
  margin: 0;
  line-height: 1.6;
  color: ${props => props.theme.colors.text.secondary};
`;

const TimelineIcon = styled.div`
  margin-bottom: ${PREMIUM_SPACING.sm}px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.colors.primary[50]};
  border-radius: 50%;
  width: 64px;
  height: 64px;
  margin-bottom: ${PREMIUM_SPACING.md}px;
  
  svg {
    height: 32px;
    width: 32px;
    color: ${props => props.theme.colors.accent.gold};
  }
`;

const StepStatus = styled.div<{ $completed: boolean }>`
  display: inline-flex;
  align-items: center;
  font-size: 0.875rem;
  margin-top: ${PREMIUM_SPACING.md}px;
  color: ${props => props.$completed ? props.theme.colors.primary[600] : props.theme.colors.text.secondary};
  
  svg {
    margin-right: ${PREMIUM_SPACING.xs}px;
    color: ${props => props.$completed ? props.theme.colors.accent.gold : props.theme.colors.primary[400]};
  }
`;

// Recovery process steps
const RECOVERY_STEPS = [
  {
    id: 1,
    title: "Initial Consultation",
    description: "We begin with a detailed assessment of your case, understanding what happened and collecting all relevant documentation.",
    completed: true,
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M14 10H16V18H14V10Z" fill="currentColor"/>
        <path d="M15 22C15.5523 22 16 21.5523 16 21C16 20.4477 15.5523 20 15 20C14.4477 20 14 20.4477 14 21C14 21.5523 14.4477 22 15 22Z" fill="currentColor"/>
      </svg>
    )
  },
  {
    id: 2,
    title: "Case Analysis",
    description: "Our specialists analyze your case against regulations and legal precedents to determine the optimal recovery strategy.",
    completed: true,
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 25H6C5.46957 25 4.96086 24.7893 4.58579 24.4142C4.21071 24.0391 4 23.5304 4 23V9C4 8.46957 4.21071 7.96086 4.58579 7.58579C4.96086 7.21071 5.46957 7 6 7H26C26.5304 7 27.0391 7.21071 27.4142 7.58579C27.7893 7.96086 28 8.46957 28 9V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M4 13H28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M22 27C24.7614 27 27 24.7614 27 22C27 19.2386 24.7614 17 22 17C19.2386 17 17 19.2386 17 22C17 24.7614 19.2386 27 22 27Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M28 28L26 26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    id: 3,
    title: "Recovery Planning",
    description: "We develop a customized recovery plan outlining the approach, timeline, and expected outcomes.",
    completed: false,
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 20C18.2091 20 20 18.2091 20 16C20 13.7909 18.2091 12 16 12C13.7909 12 12 13.7909 12 16C12 18.2091 13.7909 20 16 20Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 6V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 24V26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8.5 8.5L10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M22 22L23.5 23.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6 16H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M24 16H26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8.5 23.5L10 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M22 10L23.5 8.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    id: 4,
    title: "Execution & Recovery",
    description: "We implement the recovery strategy, engaging with relevant institutions, legal channels, and regulatory bodies.",
    completed: false,
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 16L14 20L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    id: 5,
    title: "Asset Return & Closure",
    description: "Once recovery is completed, we facilitate the secure return of assets and provide documentation for your records.",
    completed: false,
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 6V26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 14L16 6L24 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6 26H26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  }
];

// Completed step indicator
const CompletedIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 12L11 15L16 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

interface RecoveryTimelineProps {
  title?: string;
  description?: string;
  steps?: typeof RECOVERY_STEPS;
}

export const RecoveryTimeline: React.FC<RecoveryTimelineProps> = ({
  title = "Our Recovery Process",
  description = "A systematic approach to recovering your financial assets",
  steps = RECOVERY_STEPS
}) => {
  return (
    <TimelineSection>
      <Container>
        <TimelineHeader>
          <SectionTitle>{title}</SectionTitle>
          <SectionDescription>{description}</SectionDescription>
        </TimelineHeader>
        
        <TimelineContainer>
          {steps.map((step, index) => (
            <TimelineItem key={step.id} $isEven={index % 2 === 0}>
              <TimelineNumber $isEven={index % 2 === 0}>{step.id}</TimelineNumber>
              <TimelineContent $isEven={index % 2 === 0}>
                <TimelineIcon>{step.icon}</TimelineIcon>
                <TimelineTitle>{step.title}</TimelineTitle>
                <TimelineDescription>{step.description}</TimelineDescription>
                <StepStatus $completed={step.completed}>
                  {step.completed && <CompletedIcon />}
                  {step.completed ? 'Completed' : 'Future step'}
                </StepStatus>
              </TimelineContent>
            </TimelineItem>
          ))}
        </TimelineContainer>
      </Container>
    </TimelineSection>
  );
};

export default RecoveryTimeline; 