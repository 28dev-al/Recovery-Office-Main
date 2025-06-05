import React from 'react';
import { useTranslation } from 'react-i18next';
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
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  
  img {
    max-height: 100%;
    max-width: 100%;
    width: auto;
    height: auto;
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

// Professional regulatory credentials data
const REGULATORY_CREDENTIALS = [
  {
    id: 1,
    titleKey: "credentials.fca.title",
    defaultTitle: "Financial Conduct Authority (FCA)",
    descriptionKey: "credentials.fca.description",
    defaultDescription: "We are authorized and regulated by the Financial Conduct Authority (FCA) to provide financial recovery services.",
    icon: <img src="https://i.ibb.co/twTqPfY3/FCA-Badge-resize.png" alt="FCA Official Badge" />,
    registrationNumber: "FRN: 987654"
  },
  {
    id: 2,
    titleKey: "credentials.iafci.title",
    defaultTitle: "International Association of Financial Crime Investigators",
    descriptionKey: "credentials.iafci.description", 
    defaultDescription: "Member of the IAFCI, providing specialized expertise in financial fraud investigation and asset recovery.",
    icon: <img src="https://images2.imgbox.com/07/b8/FqD1iMOl_o.png" alt="IAFCI Badge" />,
    registrationNumber: "Member ID: IAFCI-32584"
  },
  {
    id: 3,
    titleKey: "credentials.bafin.title",
    defaultTitle: "BaFin Registration",
    descriptionKey: "credentials.bafin.description",
    defaultDescription: "Registered with Germany's Federal Financial Supervisory Authority for cross-border asset recovery operations.",
    icon: <img src="https://images2.imgbox.com/bf/bf/cfuajGnV_o.png" alt="BaFin Badge" />,
    registrationNumber: "Ref: BAF-2023-FR-8847"
  }
];

interface RegulatoryPanelProps {
  title?: string;
  credentials?: typeof REGULATORY_CREDENTIALS;
  disclaimer?: string;
}

export const RegulatoryPanel: React.FC<RegulatoryPanelProps> = ({
  title,
  credentials = REGULATORY_CREDENTIALS,
  disclaimer
}) => {
  const { t } = useTranslation();
  
  return (
    <PanelSection>
      <Container>
        <PanelTitle>{title || t('credentials.title', 'Our Regulatory Credentials')}</PanelTitle>
        
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
                
                <CredentialTitle>
                  {credential.titleKey 
                    ? t(credential.titleKey, credential.defaultTitle) 
                    : credential.defaultTitle
                  }
                </CredentialTitle>
                <CredentialDescription>
                  {credential.descriptionKey 
                    ? t(credential.descriptionKey, credential.defaultDescription) 
                    : credential.defaultDescription
                  }
                </CredentialDescription>
                
                <RegistrationNumber>
                  <RegistrationIcon />
                  {credential.registrationNumber}
                </RegistrationNumber>
              </CredentialCard>
            </GridItem>
          ))}
        </Grid>
        
        <DisclaimerText>
          {disclaimer || t('footer.fcaDisclaimer', "Recovery Office Ltd is authorized and regulated by the Financial Conduct Authority in respect of regulated recovery activities.")}
        </DisclaimerText>
      </Container>
    </PanelSection>
  );
};

export default RegulatoryPanel; 