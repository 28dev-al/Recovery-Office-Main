import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { PREMIUM_SPACING } from '../../../design-system/tokens';
import { Container } from '../../../design-system/components/layout/Container';
import { Box } from '../../../design-system/components/layout/Box';

const TeamSection = styled.section`
  padding: 64px 0;
  background-color: #F8F7F0;
  position: relative;
  overflow: hidden;
`;

const TeamHeader = styled.div`
  text-align: center;
  max-width: 700px;
  margin: 0 auto ${PREMIUM_SPACING.xl}px;
  position: relative;
  z-index: 1;
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

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
  @media (min-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 1100px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const TeamMemberCard = styled.div`
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 4px 24px rgba(10,64,33,0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px 24px 24px 24px;
  min-height: 520px;
  transition: box-shadow 0.25s, transform 0.25s;
  position: relative;
  outline: none;
  &:hover, &:focus-within {
    box-shadow: 0 12px 32px rgba(10,64,33,0.16);
    transform: translateY(-6px) scale(1.02);
  }
`;

const MemberPhoto = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto 20px auto;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  border: 4px solid #E6F4EA;
  background: #f3f3f3;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    display: block;
    transition: transform 0.3s ease;
    
    /* Professional centering and aspect ratio */
    margin-left: auto;
    margin-right: auto;
  }
  
  ${TeamMemberCard}:hover & img {
    transform: scale(1.05);
  }
`;

const MemberName = styled.h3`
  font-family: 'Inter', ${props => props.theme.typography.fontFamily.heading};
  font-size: 1.2em;
  font-weight: 700;
  color: #0A214F;
  text-align: center;
  margin: 0 0 8px 0;
`;

const MemberRole = styled.p`
  font-size: 1rem;
  color: #3A5A40;
  text-align: center;
  margin: 0 0 12px 0;
  font-weight: 500;
  position: relative;
  padding-bottom: 10px;
  &:after {
    content: '';
    display: block;
    margin: 10px auto 0 auto;
    width: 40px;
    height: 2px;
    background: #D4AF37;
    border-radius: 1px;
  }
`;

const MemberBio = styled.p`
  font-size: 1rem;
  color: #333;
  text-align: center;
  line-height: 1.18;
  margin: 0 0 18px 0;
`;

const SpecialtiesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
  margin: 12px 0 0 0;
`;

const Specialty = styled.span`
  background: #E6F4EA;
  color: #0A4021;
  border-radius: 16px;
  padding: 6px 16px;
  font-size: 0.92em;
  font-weight: 500;
  letter-spacing: 0.01em;
  box-shadow: 0 1px 2px rgba(10,64,33,0.04);
`;

const ContactButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #D4AF37;
  color: #fff;
  font-weight: 700;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  margin: 24px 0 0 0;
  padding: 14px 0;
  width: 100%;
  box-shadow: 0 2px 8px rgba(212,175,55,0.10);
  text-decoration: none;
  transition: background 0.18s, box-shadow 0.18s, transform 0.12s;
  outline: none;
  &:hover, &:focus {
    background: linear-gradient(90deg, #D4AF37 80%, #F8F7F0 100%);
    color: #0A4021;
    box-shadow: 0 4px 24px rgba(212,175,55,0.18);
    transform: translateY(-2px) scale(1.03);
  }
  svg {
    margin-right: 10px;
    color: #fff;
  }
`;

const DetailToggle = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #0A4021;
  font-size: 0.98em;
  font-weight: 600;
  margin: 0 auto 10px auto;
  display: flex;
  align-items: center;
  outline: none;
  transition: color 0.18s;
  &:hover, &:focus {
    color: #D4AF37;
    text-decoration: underline;
  }
  svg {
    margin-left: 6px;
    transition: transform 0.2s;
  }
`;

// Email icon
const EmailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M22 6L12 13L2 6" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

// Chevron icon
const ChevronIcon = ({ isOpen }: { isOpen: boolean }) => (
  <svg 
    width="16" 
    height="16" 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
  >
    <path 
      d="M6 9L12 15L18 9" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

const DEFAULT_TEAM_DATA = [
  {
    id: 1,
    name: "Alex Bianchi",
    role: "Senior Recovery Specialist",
    bioKey: "team.alex",
    defaultBio: "Alex specializes in recovering stolen cryptocurrencies and investigating investment fraud schemes. His expertise in blockchain analysis has helped clients recover millions in digital assets.",
    image: "https://thumbs2.imgbox.com/19/6e/IkBypXFa_t.jpg",
    credentials: ["Certified Fraud Examiner", "Blockchain Analysis Expert", "7+ Years Experience"],
    contact: "+44 7451 263473",
    email: "alex.bianchi@recovery-office.com"
  },
  {
    id: 2,
    name: "Mark Marandola",
    role: "Operations Director",
    bioKey: "team.mark",
    defaultBio: "Mark leads our asset recovery operations with extensive experience in tracing funds through complex financial networks. He has successfully recovered assets from sophisticated scam operations.",
    image: "https://thumbs2.imgbox.com/08/a1/0hipVxE9_t.jpg",
    credentials: ["Asset Recovery Specialist", "Financial Investigation Lead", "10+ Years Experience"],
    contact: "+44 7451 263474",
    email: "mark.marandola@recovery-office.com"
  },
  {
    id: 3,
    name: "Jessica Davies",
    role: "Compliance Manager",
    bioKey: "team.jessica",
    defaultBio: "Jessica ensures all recovery operations comply with FCA regulations and assists clients in filing formal complaints with regulatory bodies. Her legal background strengthens our compliance framework.",
    image: "https://thumbs2.imgbox.com/89/bc/3wKZe9Zg_t.jpg",
    credentials: ["FCA Compliance Expert", "Legal Background", "Regulatory Specialist"],
    contact: "+44 7451 263475",
    email: "jessica.davies@recovery-office.com"
  },
  {
    id: 4,
    name: "Claire Lee",
    role: "Technical Recovery Lead",
    bioKey: "team.claire",
    defaultBio: "Claire brings advanced technical expertise in blockchain forensics and cryptocurrency tracking. Her deep understanding of digital networks and forensic techniques enables Recovery Office to trace even the most sophisticated crypto thefts.",
    image: "https://i.ibb.co/zWnfY53d/claire-lee.jpg",
    credentials: ["Blockchain Forensics Expert", "Cryptocurrency Recovery Specialist", "Digital Asset Investigator"],
    contact: "+44 7451 263476",
    email: "claire.lee@recovery-office.com"
  }
];

interface PremiumTeamProps {
  title?: string;
  description?: string;
  teamMembers?: typeof DEFAULT_TEAM_DATA;
  backgroundColor?: string;
}

export const PremiumTeam: React.FC<PremiumTeamProps> = ({
  title = "Our Expert Team",
  description = "Meet the specialists dedicated to recovering your assets",
  teamMembers = DEFAULT_TEAM_DATA,
  backgroundColor
}) => {
  const { t } = useTranslation();
  const [expandedMember, setExpandedMember] = useState<number | null>(null);
  
  const toggleMemberDetails = (memberId: number) => {
    setExpandedMember(expandedMember === memberId ? null : memberId);
  };
  
  // Function to translate credentials from English to German
  const translateCredential = (credential: string): string => {
    const credentialMap: { [key: string]: string } = {
      "Certified Fraud Examiner": t('team.qualifications.certifiedFraudExaminer', 'Certified Fraud Examiner'),
      "Blockchain Analysis Expert": t('team.qualifications.blockchainAnalysisExpert', 'Blockchain Analysis Expert'),
      "7+ Years Experience": `7+ ${t('team.qualifications.experience', 'Years Experience')}`,
      "Asset Recovery Specialist": t('team.qualifications.assetRecoverySpecialist', 'Asset Recovery Specialist'),
      "Financial Investigation Lead": t('team.qualifications.financialInvestigationLead', 'Financial Investigation Lead'),
      "10+ Years Experience": `10+ ${t('team.qualifications.experience', 'Years Experience')}`,
      "FCA Compliance Expert": t('team.qualifications.fcaComplianceExpert', 'FCA Compliance Expert'),
      "Legal Background": t('team.qualifications.legalBackground', 'Legal Background'),
      "Regulatory Specialist": t('team.qualifications.regulatorySpecialist', 'Regulatory Specialist'),
      "Blockchain Forensics Expert": t('team.qualifications.blockchainForensicsExpert', 'Blockchain Forensics Expert'),
      "Cryptocurrency Recovery Specialist": t('team.qualifications.cryptocurrencyRecoverySpecialist', 'Cryptocurrency Recovery Specialist'),
      "Digital Asset Investigator": t('team.qualifications.digitalAssetInvestigator', 'Digital Asset Investigator')
    };
    
    return credentialMap[credential] || credential;
  };
  
  // Function to handle image load errors
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    // Set a fallback background color if image fails
    e.currentTarget.style.display = 'none';
    if (e.currentTarget.parentElement) {
      e.currentTarget.parentElement.style.backgroundColor = '#E6F4EA';
      e.currentTarget.parentElement.style.display = 'flex';
      e.currentTarget.parentElement.style.alignItems = 'center';
      e.currentTarget.parentElement.style.justifyContent = 'center';
      e.currentTarget.parentElement.innerHTML = '<div style="color: #0A4021; font-weight: 600; font-size: 2rem;">👤</div>';
    }
  };
  
  return (
    <TeamSection style={backgroundColor ? { backgroundColor } : {}}>
      <Container>
        <TeamHeader>
          <SectionTitle>{title}</SectionTitle>
          <SectionDescription>{description}</SectionDescription>
        </TeamHeader>
        
        <TeamGrid>
          {teamMembers.map((member) => (
            <TeamMemberCard
              key={member.id}
              tabIndex={0}
              aria-label={`Team member: ${member.name}`}
            >
              <MemberPhoto>
                <img 
                  src={member.image} 
                  alt={`${member.name} - ${member.role}`} 
                  loading="lazy"
                  onError={handleImageError}
                />
              </MemberPhoto>
              <MemberName>{member.name}</MemberName>
              <MemberRole>{member.role}</MemberRole>
              <MemberBio>
                {member.bioKey ? t(member.bioKey, member.defaultBio || '') : member.defaultBio}
              </MemberBio>
              <DetailToggle
                onClick={() => toggleMemberDetails(member.id)}
                aria-expanded={expandedMember === member.id}
                aria-controls={`details-${member.id}`}
              >
                {expandedMember === member.id ? 'Hide details' : t('buttons.showCredentials', 'Show credentials & specialties')}
                <ChevronIcon isOpen={expandedMember === member.id} />
              </DetailToggle>
              {expandedMember === member.id && (
                <Box data-id={`details-${member.id}`} style={{ marginTop: '1rem' }}>
                  <SpecialtiesList>
                    {member.credentials.map((credential, credIndex) => (
                      <Specialty key={credIndex}>{translateCredential(credential)}</Specialty>
                    ))}
                  </SpecialtiesList>
                  <ContactButton
                    href={`mailto:${member.email}`}
                    aria-label={`Contact ${member.name} directly by email`}
                  >
                    <EmailIcon />
                    {t('buttons.contactDirectly', 'Contact directly')}
                  </ContactButton>
                </Box>
              )}
              <SpecialtiesList>
                {member.credentials.map((credential, credIndex) => (
                  <Specialty key={credIndex}>{translateCredential(credential)}</Specialty>
                ))}
              </SpecialtiesList>
            </TeamMemberCard>
          ))}
        </TeamGrid>
      </Container>
    </TeamSection>
  );
};

export default PremiumTeam; 