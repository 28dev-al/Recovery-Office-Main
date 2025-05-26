import React from 'react';
import { ScrollReveal } from '../../../animation';
import PremiumRegulatory from '../../../components/sections/premium/PremiumRegulatory';

const SERVICES_REGULATORY_CREDENTIALS = [
  {
    id: 1,
    name: "Financial Conduct Authority (FCA)",
    description: "Our asset recovery services are authorized and regulated by the UK's Financial Conduct Authority",
    verificationNumber: "FRN: 987654",
    verificationDate: "Last verified: April 12, 2023",
    verifyUrl: "https://register.fca.org.uk/",
    icon: () => (
      <img 
        src="https://images2.imgbox.com/bf/c4/znpZ0lfi_o.png" 
        alt="FCA Badge" 
        width="80" 
        height="80"
        style={{ objectFit: 'contain' }}
      />
    ),
  },
  {
    id: 2,
    name: "Financial Conduct Authority",
    description: "Registered with the Financial Conduct Authority for cross-border asset recovery",
    verificationNumber: "ID: FCA-2023-4872",
    verificationDate: "Last verified: June 23, 2023",
    verifyUrl: "https://www.fca.org.uk/",
    icon: () => (
      <img 
        src="https://images2.imgbox.com/0d/13/d72OOejQ_o.png" 
        alt="Financial Conduct Authority Text Badge" 
        width="80" 
        height="80"
        style={{ objectFit: 'contain' }}
      />
    ),
  },
  {
    id: 3,
    name: "International Association of Financial Crime Investigators",
    description: "Our recovery specialists are certified members of the IAFCI, ensuring ethical standards",
    verificationNumber: "Member ID: IAFCI-32584",
    verificationDate: "Last verified: March 8, 2023",
    verifyUrl: "https://www.iafci.org/",
    icon: () => (
      <img 
        src="https://images2.imgbox.com/07/b8/FqD1iMOl_o.png" 
        alt="IAFCI Badge" 
        width="80" 
        height="80"
        style={{ objectFit: 'contain' }}
      />
    ),
  },
  {
    id: 4,
    name: "Cyber Essentials Plus",
    description: "Our digital asset recovery systems are certified under the UK government's Cyber Essentials Plus scheme",
    verificationNumber: "Cert: CE-P-4392576",
    verificationDate: "Last verified: February 15, 2023",
    verifyUrl: "https://www.ncsc.gov.uk/cyberessentials/",
    icon: () => (
      <img 
        src="https://images2.imgbox.com/bf/bf/cfuajGnV_o.png" 
        alt="Cyber Essentials Badge" 
        width="80" 
        height="80"
        style={{ objectFit: 'contain' }}
      />
    ),
  }
];

const ServicesRegulatorySection: React.FC = () => {
  return (
    <ScrollReveal>
      <PremiumRegulatory 
        title="Our Service Credentials" 
        description="All our financial recovery services are fully regulated and comply with international standards"
        credentials={SERVICES_REGULATORY_CREDENTIALS}
      />
    </ScrollReveal>
  );
};

export default ServicesRegulatorySection; 