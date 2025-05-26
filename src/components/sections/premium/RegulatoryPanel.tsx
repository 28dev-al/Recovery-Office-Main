import React from 'react';
import styled from 'styled-components';
import { PREMIUM_SPACING } from '../../../design-system/tokens';
import { Container } from '../../../design-system/components/layout/Container';
import { Grid } from '../../../design-system/components/layout/Grid';
import { GridItem } from '../../../design-system/components/layout/GridItem';

const PanelSection = styled.section`
  padding: ${PREMIUM_SPACING.xl}px 0;
  background-color: ${props => props.theme.colors.primary[900]};
  color: white;
`;

const PanelTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: 600;
  margin-bottom: ${PREMIUM_SPACING.md}px;
  text-align: center;
  color: white;
`;

const CredentialCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: ${PREMIUM_SPACING.lg}px;
  height: 100%;
  display: flex;
  flex-direction: column;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
  }
`;

const IconContainer = styled.div`
  margin-bottom: ${PREMIUM_SPACING.md}px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    height: 64px;
    width: auto;
    max-width: 100%;
    object-fit: contain;
    transition: transform 0.3s ease;
  }
  
  &:hover img {
    transform: scale(1.05);
  }
`;

const CredentialTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: ${PREMIUM_SPACING.sm}px;
  color: white;
`;

const CredentialDescription = styled.p`
  font-size: 0.9375rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
`;

const DisclaimerText = styled.p`
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.6);
  text-align: center;
  margin-top: ${PREMIUM_SPACING.xl}px;
  font-style: italic;
`;

const RegistrationNumber = styled.div`
  display: inline-flex;
  align-items: center;
  margin-top: ${PREMIUM_SPACING.sm}px;
  padding: 4px 10px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.9);
  
  svg {
    margin-right: 6px;
    height: 16px;
    width: 16px;
    color: ${props => props.theme.colors.accent.gold};
  }
`;

// Registration Icon component
const RegistrationIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M9 11L11 13L15 9M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

// Sample regulatory credentials data
const REGULATORY_CREDENTIALS = [
  {
    id: 1,
    title: "Financial Conduct Authority",
    description: "We are authorized and regulated by the Financial Conduct Authority (FCA) to provide financial recovery services.",
    icon: <img src="https://images2.imgbox.com/bf/c4/znpZ0lfi_o.png" alt="FCA Badge" />,
    registrationNumber: "FCA #765432"
  },
  {
    id: 2,
    title: "Cyber Essentials Certified",
    description: "Our systems and data handling procedures are certified under the UK government's Cyber Essentials scheme.",
    icon: <img src="https://images2.imgbox.com/5b/32/3z5cUJT0_o.png" alt="Cyber Essentials Certified Badge" />,
    registrationNumber: "CE #ZA123456"
  },
  {
    id: 3,
    title: "International Association of Financial Crime Investigators",
    description: "Member of the IAFCI, providing specialized expertise in financial fraud investigation and asset recovery.",
    icon: <img src="https://images2.imgbox.com/07/b8/FqD1iMOl_o.png" alt="IAFCI Badge" />,
    registrationNumber: "IAFCI #987654"
  }
];

interface RegulatoryPanelProps {
  title?: string;
  credentials?: typeof REGULATORY_CREDENTIALS;
  disclaimer?: string;
}

export const RegulatoryPanel: React.FC<RegulatoryPanelProps> = ({
  title = "Our Regulatory Credentials",
  credentials = REGULATORY_CREDENTIALS,
  disclaimer = "Recovery Office Ltd is authorized and regulated by the Financial Conduct Authority in respect of regulated recovery activities."
}) => {
  return (
    <PanelSection>
      <Container>
        <PanelTitle>{title}</PanelTitle>
        
        <Grid
          templateColumns={{
            base: 'repeat(1, 1fr)',
            md: 'repeat(3, 1fr)'
          }}
          gap={PREMIUM_SPACING.lg}
        >
          {credentials.map(credential => (
            <GridItem key={credential.id}>
              <CredentialCard>
                <IconContainer>
                  {credential.icon}
                </IconContainer>
                
                <CredentialTitle>{credential.title}</CredentialTitle>
                <CredentialDescription>{credential.description}</CredentialDescription>
                
                <RegistrationNumber>
                  <RegistrationIcon />
                  {credential.registrationNumber}
                </RegistrationNumber>
              </CredentialCard>
            </GridItem>
          ))}
        </Grid>
        
        <DisclaimerText>{disclaimer}</DisclaimerText>
      </Container>
    </PanelSection>
  );
};

export default RegulatoryPanel; 