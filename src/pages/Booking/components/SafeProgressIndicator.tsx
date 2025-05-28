import React from 'react';
import styled from 'styled-components';

interface Step {
  id: number;
  title: string;
  subtitle: string;
  isCompleted: boolean;
  isActive: boolean;
}

interface SafeProgressIndicatorProps {
  steps: Step[];
  currentStep: number;
}

export const SafeProgressIndicator: React.FC<SafeProgressIndicatorProps> = ({
  steps,
  currentStep
}) => {
  // Safe validation to prevent undefined errors
  if (!steps || !Array.isArray(steps) || steps.length === 0) {
    return null;
  }

  return (
    <ProgressContainer>
      <ProgressBar>
        <ProgressFill
          style={{
            width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`
          }}
        />
      </ProgressBar>

      <StepsContainer>
        {steps.map((step, index) => (
          <StepItem key={step.id || index}>
            <StepCircle
              $isCompleted={step.isCompleted}
              $isActive={step.isActive}
            >
              {step.isCompleted ? '✓' : step.id}
            </StepCircle>
            
            <StepContent>
              <StepTitle $isActive={step.isActive}>
                {step.title}
              </StepTitle>
              <StepSubtitle>
                {step.subtitle}
              </StepSubtitle>
            </StepContent>
          </StepItem>
        ))}
      </StepsContainer>
    </ProgressContainer>
  );
};

// Safe styled components
const ProgressContainer = styled.div`
  position: relative;
  padding: 0 20px;
`;

const ProgressBar = styled.div`
  height: 4px;
  background: #e2e8f0;
  border-radius: 2px;
  margin-bottom: 32px;
  position: relative;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #d69e2e 0%, #f6d55c 100%);
  border-radius: 2px;
  transition: width 0.3s ease;
`;

const StepsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
`;

const StepItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  flex: 1;
  max-width: 200px;
`;

const StepCircle = styled.div<{ $isCompleted: boolean; $isActive: boolean }>`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 12px;
  transition: all 0.3s ease;

  ${({ $isCompleted }) => $isCompleted && `
    background: #38a169;
    color: white;
  `}

  ${({ $isActive, $isCompleted }) => $isActive && !$isCompleted && `
    background: #d69e2e;
    color: white;
  `}

  ${({ $isActive, $isCompleted }) => !$isActive && !$isCompleted && `
    background: #e2e8f0;
    color: #4a5568;
  `}
`;

const StepContent = styled.div`
  max-width: 120px;
`;

const StepTitle = styled.div<{ $isActive: boolean }>`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 4px;
  color: ${({ $isActive }) => $isActive ? '#1a365d' : '#4a5568'};
`;

const StepSubtitle = styled.div`
  font-size: 12px;
  color: #718096;
  line-height: 1.3;
`; 