import React from 'react';
import styled from 'styled-components';
import FooterImplementation from './FooterImplementation';

interface PremiumLayoutProps {
  children: React.ReactNode;
}

const MainContent = styled.main`
  /* No padding needed since the navbar is already properly positioned */
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const PremiumLayout: React.FC<PremiumLayoutProps> = ({ children }) => {
  return (
    <>
      <MainContent>
        {children}
      </MainContent>
      <FooterImplementation />
    </>
  );
};

export default PremiumLayout; 