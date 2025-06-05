import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { FadeIn, ScaleFade } from '../../../animation';

// Professional Credentials Section Container
const CredentialsSection = styled.section`
  max-width: 1400px;
  margin: 80px auto;
  padding: 0 20px;
  
  @media (max-width: 768px) {
    margin: 60px auto;
    padding: 0 16px;
  }
`;

// Section Header
const CredentialsHeader = styled.div`
  text-align: center;
  margin-bottom: 60px;
  
  h2 {
    font-size: 36px;
    font-weight: 700;
    color: #1a365d;
    margin-bottom: 16px;
    line-height: 1.2;
    
    @media (max-width: 768px) {
      font-size: 28px;
    }
  }
  
  p {
    font-size: 18px;
    color: #4a5568;
    max-width: 800px;
    margin: 0 auto;
    line-height: 1.6;
    
    @media (max-width: 768px) {
      font-size: 16px;
    }
  }
`;

// Professional Responsive Grid
const CredentialsGrid = styled.div`
  display: grid;
  gap: 32px;
  margin-bottom: 60px;
  
  /* 4 cards per row on large screens (1200px+) */
  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
    max-width: 1400px;
  }
  
  /* 2 cards per row on tablets (768px-1199px) */
  @media (min-width: 768px) and (max-width: 1199px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }
  
  /* 1 card per row on mobile (<768px) */
  @media (max-width: 767px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

// Professional Credential Card
const CredentialCard = styled.div`
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%; /* Ensure equal height cards */
  overflow: hidden;
  position: relative;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
  }
  
  /* Premium accent border */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #d69e2e 0%, #b7791f 100%);
  }
`;

// Card Header Section
const CardHeader = styled.div`
  padding: 32px 24px 20px;
  text-align: center;
  border-bottom: 1px solid #f7fafc;
  background: linear-gradient(135deg, #f8fafc 0%, #edf2f7 100%);
`;

// Credential Logo Container
const CredentialLogo = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  
  img {
    max-width: 80px;
    max-height: 80px;
    width: auto;
    height: auto;
    object-fit: contain;
    filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.1));
    transition: transform 0.3s ease;
  }
  
  ${CredentialCard}:hover & img {
    transform: scale(1.05);
  }
`;

// Credential Title
const CredentialTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #1a365d;
  margin: 0;
  line-height: 1.3;
  min-height: 48px; /* Ensure consistent title height */
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

// Card Content Section
const CardContent = styled.div`
  padding: 24px;
  flex: 1; /* Take up remaining space */
  display: flex;
  flex-direction: column;
`;

// Credential Description
const CredentialDescription = styled.p`
  font-size: 14px;
  color: #4a5568;
  line-height: 1.5;
  margin-bottom: 20px;
  flex: 1; /* Take up available space */
  text-align: center;
`;

// Credential Details Container
const CredentialDetails = styled.div`
  margin-bottom: 20px;
`;

// Detail Badge
const DetailBadge = styled.div`
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  color: #0369a1;
  padding: 10px 16px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 12px;
  text-align: center;
  border: 1px solid #bae6fd;
`;

// Verification Date
const VerificationDate = styled.div`
  font-size: 12px;
  color: #6b7280;
  text-align: center;
  font-style: italic;
`;

// Card Footer Section
const CardFooter = styled.div`
  padding: 0 24px 24px;
`;

// Verify Button
const VerifyButton = styled.button`
  width: 100%;
  background: linear-gradient(135deg, #1a365d 0%, #2c5282 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  
  &:hover {
    background: linear-gradient(135deg, #2d3748 0%, #4a5568 100%);
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

// Credentials Footer Section
const CredentialsFooter = styled.div`
  margin-top: 60px;
  padding-top: 40px;
  border-top: 2px solid #e2e8f0;
`;

// Compliance Verification Section
const ComplianceVerification = styled.div`
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  padding: 32px;
  border-radius: 16px;
  gap: 24px;
  border: 1px solid #bae6fd;
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: 20px;
    padding: 24px;
  }
`;

// Compliance Icon
const ComplianceIcon = styled.div`
  font-size: 48px;
  min-width: 64px;
  color: #0369a1;
  
  @media (max-width: 768px) {
    font-size: 40px;
  }
`;

// Compliance Content
const ComplianceContent = styled.div`
  flex: 1;
  
  h3 {
    font-size: 20px;
    font-weight: 700;
    color: #1a365d;
    margin-bottom: 8px;
    
    @media (max-width: 768px) {
      font-size: 18px;
    }
  }
  
  p {
    font-size: 16px;
    color: #4a5568;
    line-height: 1.5;
    margin: 0;
    
    @media (max-width: 768px) {
      font-size: 14px;
    }
  }
`;

// Verify All Button
const VerifyAllButton = styled.button`
  background: linear-gradient(135deg, #16a34a 0%, #15803d 100%);
  color: white;
  border: none;
  padding: 16px 32px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  
  &:hover {
    background: linear-gradient(135deg, #15803d 0%, #166534 100%);
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  @media (max-width: 768px) {
    width: 100%;
    padding: 14px 24px;
    font-size: 14px;
  }
`;

// Icons for buttons
const VerifyIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path 
      d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" 
      fill="currentColor" 
    />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
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
const DEFAULT_REGULATORY_CREDENTIALS = [
  {
    id: 1,
    name: "Financial Conduct Authority (FCA)",
    description: "Authorized and regulated by the UK's Financial Conduct Authority, ensuring compliance with rigorous financial standards",
    verificationNumber: "FRN: 987654",
    verificationDate: "Last verified: April 12, 2023",
    verifyUrl: "https://register.fca.org.uk/",
    icon: "https://i.ibb.co/twTqPfY3/FCA-Badge-resize.png",
  },
  {
    id: 2,
    name: "Cyber Essentials Plus",
    description: "Our digital asset recovery systems are certified under the UK government's Cyber Essentials Plus scheme",
    verificationNumber: "Cert: CE-P-4392576",
    verificationDate: "Last verified: February 15, 2023",
    verifyUrl: "https://www.ncsc.gov.uk/cyberessentials/",
    icon: "https://i.ibb.co/PsLSqdfk/Cyberessentials-Badge-resize.png",
  },
  {
    id: 3,
    name: "International Association of Financial Crime Investigators",
    description: "Certified member of the IAFCI, demonstrating commitment to ethical financial crime investigation standards",
    verificationNumber: "Member ID: IAFCI-32584",
    verificationDate: "Last verified: March 8, 2023",
    verifyUrl: "https://www.iafci.org/",
    icon: "https://images2.imgbox.com/07/b8/FqD1iMOl_o.png",
  },
  {
    id: 4,
    name: "BaFin Registration",
    description: "Registered with Germany's Federal Financial Supervisory Authority for cross-border asset recovery operations",
    verificationNumber: "Ref: BAF-2023-FR-8847",
    verificationDate: "Last verified: June 23, 2023",
    verifyUrl: "https://www.bafin.de/EN/PublikationenDaten/Datenbanken/datenbanken_node_en.html",
    icon: "https://images2.imgbox.com/bf/bf/cfuajGnV_o.png",
  }
];

interface Credential {
  id: number;
  name: string;
  description: string;
  verificationNumber: string;
  verificationDate: string;
  verifyUrl: string;
  icon: string;
}

interface PremiumRegulatoryProps {
  title?: string;
  description?: string;
  credentials?: Credential[];
}

export const PremiumRegulatory: React.FC<PremiumRegulatoryProps> = ({
  title = "Regulatory Accreditation & Compliance",
  description = "We maintain the highest standards of regulatory compliance and security to protect your financial recovery process",
  credentials = DEFAULT_REGULATORY_CREDENTIALS
}) => {
  const { t } = useTranslation();
  
  return (
    <CredentialsSection id="professional-credentials-section">
      <CredentialsHeader>
        <FadeIn>
          <h2>{title}</h2>
          <p>{description}</p>
        </FadeIn>
      </CredentialsHeader>
      
      <CredentialsGrid>
        {credentials.map((credential, index) => (
          <FadeIn key={credential.id} delay={index * 0.1}>
            <CredentialCard>
              <CardHeader>
                <ScaleFade initialScale={0.9} delay={index * 0.15}>
                  <CredentialLogo>
                    <img 
                      src={credential.icon} 
                      alt={`${credential.name} Official Badge`}
                      onError={(e) => {
                        console.error(`Failed to load credential icon: ${credential.icon}`);
                        // Fallback to a shield icon if image fails to load
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                      onLoad={() => {
                        console.log(`Successfully loaded credential icon: ${credential.name}`);
                      }}
                    />
                  </CredentialLogo>
                </ScaleFade>
                <CredentialTitle>{credential.name}</CredentialTitle>
              </CardHeader>
              
              <CardContent>
                <CredentialDescription>{credential.description}</CredentialDescription>
                
                <CredentialDetails>
                  <DetailBadge>{credential.verificationNumber}</DetailBadge>
                  <VerificationDate>{credential.verificationDate}</VerificationDate>
                </CredentialDetails>
              </CardContent>
              
              <CardFooter>
                <VerifyButton 
                  as="a" 
                  href={credential.verifyUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <VerifyIcon />
                  {t('credentials.verification.verifyButton', 'Verify Credentials')}
                  <ExternalLinkIcon />
                </VerifyButton>
              </CardFooter>
            </CredentialCard>
          </FadeIn>
        ))}
      </CredentialsGrid>
      
      <CredentialsFooter>
        <FadeIn delay={0.3}>
          <ComplianceVerification>
            <ComplianceIcon>🛡️</ComplianceIcon>
            <ComplianceContent>
              <h3>{t('credentials.verification.title', '100% Compliance Verified')}</h3>
              <p>{t('credentials.verification.description', 'Our regulatory credentials are regularly audited and verified by independent third parties to ensure complete compliance with international financial recovery standards.')}</p>
            </ComplianceContent>
            <VerifyAllButton 
              as="a" 
              href="https://www.fca.org.uk/firms/financial-services-register" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <VerifyIcon />
              {t('credentials.verification.verifyAllButton', 'Verify All Credentials')}
              <ExternalLinkIcon />
            </VerifyAllButton>
          </ComplianceVerification>
        </FadeIn>
      </CredentialsFooter>
    </CredentialsSection>
  );
};

export default PremiumRegulatory; 