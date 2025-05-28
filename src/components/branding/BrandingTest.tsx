import React from 'react';
import styled from 'styled-components';
import RecoveryOfficeLogo from './RecoveryOfficeLogo';
import { AppIcon } from './AppIcon';

const TestContainer = styled.div`
  padding: 40px;
  background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
  min-height: 100vh;
`;

const Section = styled.div`
  margin-bottom: 40px;
  padding: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  color: #1a365d;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  margin-bottom: 20px;
`;

const LogoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
`;

const LogoItem = styled.div`
  padding: 20px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  text-align: center;
`;

const DarkBackground = styled.div`
  background: #1a365d;
  padding: 20px;
  border-radius: 8px;
  margin: 10px 0;
`;

const IconGrid = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  flex-wrap: wrap;
`;

export const BrandingTest: React.FC = () => {
  return (
    <TestContainer>
      <Title>Recovery Office - Professional Branding Test</Title>
      
      <Section>
        <Title>Logo Variants</Title>
        <LogoGrid>
          <LogoItem>
            <h4>Default (Light Background)</h4>
            <RecoveryOfficeLogo variant="default" size="large" showText={true} />
          </LogoItem>
          
          <LogoItem>
            <h4>Symbol Only</h4>
            <RecoveryOfficeLogo variant="symbol" size="large" showText={false} />
          </LogoItem>
          
          <LogoItem>
            <h4>White (Dark Background)</h4>
            <DarkBackground>
              <RecoveryOfficeLogo variant="white" size="large" showText={true} />
            </DarkBackground>
          </LogoItem>
        </LogoGrid>
      </Section>

      <Section>
        <Title>Logo Sizes</Title>
        <LogoGrid>
          <LogoItem>
            <h4>Small (32px)</h4>
            <RecoveryOfficeLogo variant="default" size="small" showText={true} />
          </LogoItem>
          
          <LogoItem>
            <h4>Medium (40px)</h4>
            <RecoveryOfficeLogo variant="default" size="medium" showText={true} />
          </LogoItem>
          
          <LogoItem>
            <h4>Large (48px)</h4>
            <RecoveryOfficeLogo variant="default" size="large" showText={true} />
          </LogoItem>
          
          <LogoItem>
            <h4>XL (64px)</h4>
            <RecoveryOfficeLogo variant="default" size="xl" showText={true} />
          </LogoItem>
        </LogoGrid>
      </Section>

      <Section>
        <Title>Logo with/without Text</Title>
        <LogoGrid>
          <LogoItem>
            <h4>With Text</h4>
            <RecoveryOfficeLogo variant="default" size="large" showText={true} />
          </LogoItem>
          
          <LogoItem>
            <h4>Icon Only</h4>
            <RecoveryOfficeLogo variant="default" size="large" showText={false} />
          </LogoItem>
        </LogoGrid>
      </Section>

      <Section>
        <Title>App Icons</Title>
        <IconGrid>
          <div>
            <h4>Default (32px)</h4>
            <AppIcon size={32} variant="default" />
          </div>
          
          <div>
            <h4>Large (64px)</h4>
            <AppIcon size={64} variant="default" />
          </div>
          
          <div>
            <h4>White Variant</h4>
            <DarkBackground>
              <AppIcon size={48} variant="white" />
            </DarkBackground>
          </div>
        </IconGrid>
      </Section>

      <Section>
        <Title>Navigation Preview</Title>
        <DarkBackground>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0' }}>
            <RecoveryOfficeLogo variant="white" size="medium" showText={true} />
            <div style={{ color: 'white', display: 'flex', gap: '20px', alignItems: 'center' }}>
              <span>Services</span>
              <span>About</span>
              <span>Contact</span>
              <button style={{ 
                background: '#d69e2e', 
                color: '#1a365d', 
                border: 'none', 
                padding: '8px 16px', 
                borderRadius: '6px',
                fontWeight: '600'
              }}>
                Book Consultation
              </button>
            </div>
          </div>
        </DarkBackground>
      </Section>
    </TestContainer>
  );
}; 