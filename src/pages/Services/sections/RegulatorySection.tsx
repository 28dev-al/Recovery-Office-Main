import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollReveal } from '../../../animation';
import PremiumRegulatory from '../../../components/sections/premium/PremiumRegulatory';

const ServicesRegulatorySection: React.FC = () => {
  const { t } = useTranslation();

  const SERVICES_REGULATORY_CREDENTIALS = [
    {
      id: 1,
      name: "CIRO Member Organization",
      description: "Regulated by the Canadian Investment Regulatory Organization for investment recovery services",
      verificationNumber: "BN: 877332510",
      verificationDate: "2024",
      verifyUrl: "https://www.ciro.ca/",
      icon: "/assets/icons/badges/ciro-badge.png"
    },
    {
      id: 2,
      name: "FINTRAC Registered",
      description: "Registered with Financial Transactions and Reports Analysis Centre of Canada",
      verificationNumber: "Registry ID: 3950042",
      verificationDate: "2024",
      verifyUrl: "https://www.fintrac-canafe.gc.ca/",
      icon: "/assets/icons/badges/fintrac-badge.png"
    },
    {
      id: 3,
      name: "FSRA Compliance",
      description: "Operates under Financial Services Regulatory Authority of Ontario guidelines",
      verificationNumber: "Ontario Registration",
      verificationDate: "2024",
      verifyUrl: "https://www.fsrao.ca/",
      icon: "/assets/icons/badges/fsra-badge.png"
    },
    {
      id: 4,
      name: "PIPEDA Compliant",
      description: "Full compliance with Personal Information Protection and Electronic Documents Act",
      verificationNumber: "Privacy Policy Verified",
      verificationDate: "2024",
      verifyUrl: "https://www.priv.gc.ca/",
      icon: "https://images2.imgbox.com/07/b8/FqD1iMOl_o.png"
    }
  ];

  return (
    <ScrollReveal>
      <PremiumRegulatory 
        title={t('credentials.title')}
        description={t('credentials.subtitle')}
        credentials={SERVICES_REGULATORY_CREDENTIALS}
      />
    </ScrollReveal>
  );
};

export default ServicesRegulatorySection; 