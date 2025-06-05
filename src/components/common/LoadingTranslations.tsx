import React from 'react';
import styled, { keyframes } from 'styled-components';
import { PREMIUM_COLORS } from '../../design-system/tokens/colors.premium';
import { PREMIUM_SPACING } from '../../design-system/tokens/spacing';

const LoadingTranslations: React.FC = () => {
  return (
    <LoadingContainer>
      <LoadingContent>
        <LogoText>Recovery Office</LogoText>
        <Spinner />
        <LoadingText>Loading translations...</LoadingText>
      </LoadingContent>
    </LoadingContainer>
  );
};

// Animations
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const fadeIn = keyframes`
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
`;

// Styled Components
const LoadingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, ${PREMIUM_COLORS.BASE_COLORS.ivory[50]} 0%, #ffffff 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const LoadingContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${PREMIUM_SPACING.lg}px;
  animation: ${fadeIn} 0.5s ease-out;
`;

const LogoText = styled.h1`
  font-family: 'Playfair Display', serif;
  font-size: 32px;
  font-weight: 700;
  color: ${PREMIUM_COLORS.BASE_COLORS.forest[500]};
  margin: 0;
  letter-spacing: -0.5px;
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid ${PREMIUM_COLORS.BASE_COLORS.ivory[300]};
  border-top: 3px solid ${PREMIUM_COLORS.BASE_COLORS.forest[500]};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const LoadingText = styled.p`
  font-size: 14px;
  color: ${PREMIUM_COLORS.BASE_COLORS.gray[600]};
  margin: 0;
  font-weight: 500;
`;

export default LoadingTranslations; 