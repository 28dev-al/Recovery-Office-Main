import React, { useState } from 'react';
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
  box-shadow: 0 2px 8px rgba(10, 64, 33, 0.08);
  border: 2px solid #F8F7F0;
  background: #f3f3f3;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
    display: block;
    transition: transform 0.3s ease;
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

// Financial recovery team members data
const TEAM_MEMBERS = [
  {
    id: 1,
    name: "Dr. Elizabeth Harper",
    role: "Recovery Specialist & Director",
    bio: "With over 15 years of experience in financial recovery, Dr. Harper specializes in complex investment fraud cases and regulatory compliance. She has led the recovery of over $50 million in assets for clients across various industries.",
    photoUrl: "https://images2.imgbox.com/1b/c8/iUrzV8lp_o.jpg",
    email: "elizabeth.harper@recoveryoffice.com",
    credentials: [
      "Ph.D. in Financial Law",
      "Certified Fraud Examiner (CFE)",
      "FCA Approved Person"
    ],
    specialties: ["Investment Fraud", "Regulatory Compliance", "Asset Recovery"],
    additionalInfo: "Dr. Harper regularly speaks at financial industry conferences and has published several papers on modern fraud recovery techniques. She previously served as an advisor to regulatory bodies on fraud prevention."
  },
  {
    id: 2,
    name: "James Anderson",
    role: "Technical Recovery Specialist",
    bio: "James leads our technical recovery team, with expertise in cryptocurrency tracing and digital forensics to track and recover digital assets. His innovative approaches have made him a leader in the emerging field of digital asset recovery.",
    photoUrl: "https://images2.imgbox.com/c7/f9/8sX1Bj08_o.jpg",
    email: "james.anderson@recoveryoffice.com",
    credentials: [
      "M.S. in Computer Science",
      "Certified Cryptocurrency Investigator",
      "Blockchain Forensics Certified"
    ],
    specialties: ["Cryptocurrency Recovery", "Digital Forensics", "Blockchain Analysis"],
    additionalInfo: "James has pioneered several crypto-tracing techniques that have become industry standards. He maintains close relationships with major exchanges to facilitate asset recovery from fraud cases."
  },
  {
    id: 3,
    name: "Sarah Williams",
    role: "Client Relations Manager",
    bio: "Sarah ensures our clients receive clear communication throughout the recovery process, specializing in client education and expectation management. Her background in financial education helps clients understand complex recovery procedures.",
    photoUrl: "https://images2.imgbox.com/fe/f2/zX6yMZVC_o.jpg",
    email: "sarah.williams@recoveryoffice.com",
    credentials: [
      "Certified Financial Educator",
      "B.A. in Communications",
      "Dispute Resolution Certified"
    ],
    specialties: ["Client Advocacy", "Recovery Planning", "Financial Education"],
    additionalInfo: "Sarah developed our client-centered communication protocols that ensure transparency throughout the recovery process. She specializes in helping clients understand complex financial recovery procedures."
  },
  {
    id: 4,
    name: "Michael Chen",
    role: "Legal Recovery Advisor",
    bio: "Michael specializes in the legal aspects of financial recovery, including court proceedings, regulatory filings, and cross-border asset recovery. His expertise is crucial for cases requiring legal intervention.",
    photoUrl: "https://images2.imgbox.com/a6/3a/9g8ECMM7_o.jpg",
    email: "michael.chen@recoveryoffice.com",
    credentials: [
      "J.D. Financial Law",
      "International Asset Recovery Certified",
      "Licensed Solicitor"
    ],
    specialties: ["Legal Proceedings", "Cross-Border Recovery", "Regulatory Filings"],
    additionalInfo: "Michael has successfully represented clients in complex financial recovery cases across multiple jurisdictions. His network of international legal partners enhances our global recovery capabilities."
  }
];

interface PremiumTeamProps {
  title?: string;
  description?: string;
  members?: typeof TEAM_MEMBERS;
}

export const PremiumTeam: React.FC<PremiumTeamProps> = ({
  title = "Our Expert Team",
  description = "Our specialists bring years of experience in financial recovery and regulatory compliance",
  members = TEAM_MEMBERS
}) => {
  const [expandedMember, setExpandedMember] = useState<number | null>(null);
  
  const toggleMemberDetails = (id: number) => {
    if (expandedMember === id) {
      setExpandedMember(null);
    } else {
      setExpandedMember(id);
    }
  };
  
  return (
    <TeamSection>
      <Container>
        <TeamHeader>
          <SectionTitle>{title}</SectionTitle>
          <SectionDescription>{description}</SectionDescription>
        </TeamHeader>
        
        <TeamGrid>
          {members.map((member) => (
            <TeamMemberCard
              key={member.id}
              tabIndex={0}
              aria-label={`Team member: ${member.name}`}
            >
              <MemberPhoto>
                <img 
                  src={member.photoUrl} 
                  srcSet={`${member.photoUrl} 1x, ${member.photoUrl} 2x`}
                  alt={`${member.name}, ${member.role}`} 
                  loading="lazy"
                />
              </MemberPhoto>
              <MemberName>{member.name}</MemberName>
              <MemberRole>{member.role}</MemberRole>
              <MemberBio>{member.bio}</MemberBio>
              <DetailToggle
                onClick={() => toggleMemberDetails(member.id)}
                aria-expanded={expandedMember === member.id}
                aria-controls={`details-${member.id}`}
              >
                {expandedMember === member.id ? 'Hide details' : 'Show credentials & specialties'}
                <ChevronIcon isOpen={expandedMember === member.id} />
              </DetailToggle>
              {expandedMember === member.id && (
                <Box data-id={`details-${member.id}`} style={{ marginTop: '1rem' }}>
                  <SpecialtiesList>
                    {member.credentials.map((credential, index) => (
                      <Specialty key={index}>{credential}</Specialty>
                    ))}
                  </SpecialtiesList>
                  {member.additionalInfo && (
                    <Box style={{ margin: '12px 0 0 0', fontSize: '0.92em', color: '#333' }}>
                      {member.additionalInfo}
                    </Box>
                  )}
                </Box>
              )}
              <SpecialtiesList>
                {member.specialties.map((specialty, index) => (
                  <Specialty key={index}>{specialty}</Specialty>
                ))}
              </SpecialtiesList>
              <ContactButton
                href={`mailto:${member.email}`}
                aria-label={`Contact ${member.name} directly by email`}
              >
                <EmailIcon />
                Contact directly
              </ContactButton>
            </TeamMemberCard>
          ))}
        </TeamGrid>
      </Container>
    </TeamSection>
  );
};

export default PremiumTeam; 