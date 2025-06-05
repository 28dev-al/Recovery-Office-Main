import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <SwitcherContainer>
      <LanguageButton
        onClick={() => changeLanguage('en')}
        $active={i18n.language === 'en'}
        aria-label="Switch to English"
      >
        EN
      </LanguageButton>
      
      <Separator>|</Separator>
      
      <LanguageButton
        onClick={() => changeLanguage('de')}
        $active={i18n.language === 'de'}
        aria-label="Switch to German"
      >
        DE
      </LanguageButton>
    </SwitcherContainer>
  );
};

// Professional styled components that integrate with the premium navbar
const SwitcherContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  padding: 4px 6px;
  margin-right: 16px;
  
  @media (max-width: 900px) {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    margin-right: 0;
    margin-top: 8px;
  }
`;

const LanguageButton = styled.button<{ $active: boolean }>`
  background: ${props => props.$active ? 'rgba(255, 255, 255, 0.9)' : 'transparent'};
  border: none;
  border-radius: 4px;
  padding: 6px 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.5px;
  color: ${props => props.$active ? '#1a365d' : 'rgba(255, 255, 255, 0.8)'};
  min-width: 32px;
  
  &:hover {
    background: ${props => props.$active ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.2)'};
    color: ${props => props.$active ? '#1a365d' : 'white'};
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:focus {
    outline: 2px solid rgba(212, 175, 55, 0.5);
    outline-offset: 2px;
  }
`;

const Separator = styled.span`
  color: rgba(255, 255, 255, 0.4);
  font-size: 12px;
  font-weight: 300;
  user-select: none;
`;

export default LanguageSwitcher; 