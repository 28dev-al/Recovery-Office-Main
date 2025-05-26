import React from 'react';
import styled from 'styled-components';
import { PREMIUM_SPACING, PREMIUM_COLORS, PREMIUM_TYPOGRAPHY, PREMIUM_BREAKPOINTS } from '../../../design-system/tokens';
import { Container } from '../../../design-system/components/layout/Container';
import { Grid } from '../../../design-system/components/layout/Grid';
import { GridItem } from '../../../design-system/components/layout/GridItem';
import { Box } from '../../../design-system/components/layout/Box';
import { FadeIn, ScaleFade } from '../../../animation';

const RegulatorySection = styled.section`
  padding: ${PREMIUM_SPACING.xxl}px 0;
  background-color: ${PREMIUM_COLORS.SEMANTIC_COLORS.background.secondary};
  position: relative;
  overflow: hidden;
  
  /* Subtle security pattern background */
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      radial-gradient(circle at 10% 10%, rgba(10, 33, 79, 0.03) 0%, rgba(10, 33, 79, 0) 50%),
      repeating-linear-gradient(45deg, rgba(212, 175, 55, 0.02) 0px, rgba(212, 175, 55, 0.02) 1px, transparent 1px, transparent 10px);
    z-index: 0;
  }
`;

const SectionHeader = styled.div`
  text-align: center;
  max-width: 800px;
  margin: 0 auto ${PREMIUM_SPACING.xl}px;
  position: relative;
  z-index: 1;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: ${PREMIUM_SPACING.md}px;
  color: ${PREMIUM_COLORS.BASE_COLORS.forest[700]};
  font-family: ${PREMIUM_TYPOGRAPHY.fontFamily.heading};
  
  ${PREMIUM_BREAKPOINTS.down('md')} {
    font-size: 2rem;
  }
`;

const SectionDescription = styled.p`
  font-size: 1.125rem;
  color: ${PREMIUM_COLORS.SEMANTIC_COLORS.text.secondary};
  line-height: 1.6;
  margin: 0 auto;
`;

const SecurityBadge = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${PREMIUM_SPACING.lg}px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  height: 100%;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.03);
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.09);
  }
  
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background-color: ${PREMIUM_COLORS.BASE_COLORS.gold[500]};
    opacity: 0.8;
  }
`;

const BadgeIcon = styled.div`
  width: 80px;
  height: 80px;
  margin-bottom: ${PREMIUM_SPACING.md}px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.3s ease;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    transition: transform 0.3s ease;
  }
  
  ${SecurityBadge}:hover & {
    transform: scale(1.05);
  }
  
  ${SecurityBadge}:focus-within & {
    transform: scale(1.05);
  }
`;

const BadgeName = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 ${PREMIUM_SPACING.xs}px;
  color: ${PREMIUM_COLORS.SEMANTIC_COLORS.text.primary};
  text-align: center;
`;

const BadgeDescription = styled.p`
  font-size: 0.9375rem;
  color: ${PREMIUM_COLORS.SEMANTIC_COLORS.text.secondary};
  line-height: 1.6;
  margin: 0 0 ${PREMIUM_SPACING.md}px;
  text-align: center;
  flex-grow: 1;
`;

const VerificationNumber = styled.div`
  font-family: ${PREMIUM_TYPOGRAPHY.fontFamily.mono};
  font-size: 0.875rem;
  font-weight: 500;
  padding: ${PREMIUM_SPACING.xs}px ${PREMIUM_SPACING.sm}px;
  background: ${PREMIUM_COLORS.BASE_COLORS.forest[50]};
  border-radius: 4px;
  color: ${PREMIUM_COLORS.BASE_COLORS.forest[700]};
  margin-bottom: ${PREMIUM_SPACING.sm}px;
  letter-spacing: 0.03em;
`;

const VerificationDate = styled.div`
  font-size: 0.75rem;
  color: ${PREMIUM_COLORS.SEMANTIC_COLORS.text.tertiary};
  margin-bottom: ${PREMIUM_SPACING.md}px;
`;

const VerifyButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  color: ${PREMIUM_COLORS.BASE_COLORS.forest[600]};
  border: 1px solid ${PREMIUM_COLORS.BASE_COLORS.forest[200]};
  padding: ${PREMIUM_SPACING.xs}px ${PREMIUM_SPACING.md}px;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: 500;
  margin-top: ${PREMIUM_SPACING.sm}px;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  
  &:hover {
    background-color: ${PREMIUM_COLORS.BASE_COLORS.forest[50]};
    color: ${PREMIUM_COLORS.BASE_COLORS.forest[700]};
    border-color: ${PREMIUM_COLORS.BASE_COLORS.forest[300]};
  }
`;

const TrustSeal = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: ${PREMIUM_SPACING.xl}px;
  padding: ${PREMIUM_SPACING.md}px;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border: 1px solid ${PREMIUM_COLORS.SEMANTIC_COLORS.border.light};
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
  }

  ${PREMIUM_BREAKPOINTS.down('md')} {
    flex-direction: column;
    text-align: center;
  }
`;

const TrustSealText = styled.p`
  font-size: 0.9375rem;
  color: ${PREMIUM_COLORS.SEMANTIC_COLORS.text.secondary};
  margin: 0 ${PREMIUM_SPACING.md}px;
  flex-grow: 1;

  strong {
    color: ${PREMIUM_COLORS.BASE_COLORS.forest[700]};
  }

  ${PREMIUM_BREAKPOINTS.down('md')} {
    margin: ${PREMIUM_SPACING.sm}px 0;
  }
`;

const SecurityIcon = () => (
  <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M12 22C12 22 20 18 20 12V4L12 2L4 4V12C4 18 12 22 12 22Z" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

const VerifyIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M7 11L10 14L17 7" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <circle 
      cx="12" 
      cy="12" 
      r="10" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

const TrustSealIcon = () => (
  <img
    src="https://images2.imgbox.com/76/52/QPp2QELR_o.png"
    alt="Secure Process Icon"
    width="64"
    height="64"
    style={{ objectFit: 'contain' }}
  />
);

const ExternalLinkIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M18 13V19C18 19.5304 17.7893 20.0391 17.4142 20.4142C17.0391 20.7893 16.5304 21 16 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V8C3 7.46957 3.21071 6.96086 3.58579 6.58579C3.96086 6.21071 4.46957 6 5 6H11" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M15 3H21V9" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M10 14L21 3" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

// Regulatory credentials data
const REGULATORY_CREDENTIALS = [
  {
    id: 1,
    name: "Financial Conduct Authority (FCA)",
    description: "Authorized and regulated by the UK's Financial Conduct Authority, ensuring compliance with rigorous financial standards",
    verificationNumber: "FRN: 987654",
    verificationDate: "Last verified: April 12, 2023",
    verifyUrl: "https://register.fca.org.uk/",
    icon: SecurityIcon,
  },
  {
    id: 2,
    name: "BaFin Registration",
    description: "Registered with Germany's Federal Financial Supervisory Authority, meeting strict financial recovery protocols",
    verificationNumber: "ID: BaF2023-4872",
    verificationDate: "Last verified: June 23, 2023",
    verifyUrl: "https://www.bafin.de/EN/PublikationenDaten/Datenbanken/datenbanken_node_en.html",
    icon: SecurityIcon,
  },
  {
    id: 3,
    name: "International Association of Financial Crime Investigators",
    description: "Certified member of the IAFCI, demonstrating commitment to ethical financial crime investigation standards",
    verificationNumber: "Member ID: IAFCI-32584",
    verificationDate: "Last verified: March 8, 2023",
    verifyUrl: "https://www.iafci.org/",
    icon: SecurityIcon,
  },
  {
    id: 4,
    name: "Cyber Essentials Plus",
    description: "Certified under the UK government-backed Cyber Essentials Plus scheme, ensuring the highest level of data protection",
    verificationNumber: "Cert: CE-P-4392576",
    verificationDate: "Last verified: February 15, 2023",
    verifyUrl: "https://www.ncsc.gov.uk/cyberessentials/",
    icon: SecurityIcon,
  }
];

interface PremiumRegulatoryProps {
  title?: string;
  description?: string;
  credentials?: typeof REGULATORY_CREDENTIALS;
}

export const PremiumRegulatory: React.FC<PremiumRegulatoryProps> = ({
  title = "Regulatory Accreditation & Compliance",
  description = "We maintain the highest standards of regulatory compliance and security to protect your financial recovery process",
  credentials = REGULATORY_CREDENTIALS
}) => {
  return (
    <RegulatorySection>
      <Container>
        <SectionHeader>
          <FadeIn>
            <SectionTitle>{title}</SectionTitle>
            <SectionDescription>{description}</SectionDescription>
          </FadeIn>
        </SectionHeader>
        
        <Grid
          templateColumns={{
            base: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            lg: 'repeat(4, 1fr)'
          }}
          gap={PREMIUM_SPACING.lg}
        >
          {credentials.map((credential, index) => (
            <GridItem key={credential.id}>
              <FadeIn delay={index * 0.1}>
                <SecurityBadge>
                  <ScaleFade initialScale={0.9} delay={index * 0.15}>
                    <BadgeIcon>
                      <credential.icon />
                    </BadgeIcon>
                  </ScaleFade>
                  
                  <BadgeName>{credential.name}</BadgeName>
                  <BadgeDescription>{credential.description}</BadgeDescription>
                  
                  <Box mt="auto">
                    <VerificationNumber>{credential.verificationNumber}</VerificationNumber>
                    <VerificationDate>{credential.verificationDate}</VerificationDate>
                    
                    <VerifyButton href={credential.verifyUrl} target="_blank" rel="noopener noreferrer">
                      <VerifyIcon />
                      Verify Credentials
                      <ExternalLinkIcon />
                    </VerifyButton>
                  </Box>
                </SecurityBadge>
              </FadeIn>
            </GridItem>
          ))}
        </Grid>
        
        <FadeIn delay={0.3}>
          <TrustSeal>
            <Box color="primary.600">
              <TrustSealIcon />
            </Box>
            <TrustSealText>
              <strong>100% Compliance Verified:</strong> Our regulatory credentials are regularly audited and verified by independent third parties to ensure complete compliance with international financial recovery standards.
            </TrustSealText>
            <VerifyButton href="https://www.fca.org.uk/firms/financial-services-register" target="_blank" rel="noopener noreferrer">
              <VerifyIcon />
              Verify All Credentials
              <ExternalLinkIcon />
            </VerifyButton>
          </TrustSeal>
        </FadeIn>
      </Container>
    </RegulatorySection>
  );
};

export default PremiumRegulatory; 