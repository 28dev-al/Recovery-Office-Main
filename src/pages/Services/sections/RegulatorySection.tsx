import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollReveal } from '../../../animation';
import PremiumRegulatory from '../../../components/sections/premium/PremiumRegulatory';

const ServicesRegulatorySection: React.FC = () => {
  const { t } = useTranslation();

  const SERVICES_REGULATORY_CREDENTIALS = [
    {
      id: 1,
      name: t('credentials.fca.title'),
      description: t('credentials.fca.description'),
      verificationNumber: t('credentials.fca.reference'),
      verificationDate: t('credentials.fca.lastVerified'),
      verifyUrl: "https://register.fca.org.uk/",
      icon: "https://i.ibb.co/twTqPfY3/FCA-Badge-resize.png"
    },
    {
      id: 2,
      name: t('credentials.cyberEssentials.title'),
      description: t('credentials.cyberEssentials.description'),
      verificationNumber: t('credentials.cyberEssentials.reference'),
      verificationDate: t('credentials.cyberEssentials.lastVerified'),
      verifyUrl: "https://www.ncsc.gov.uk/cyberessentials/",
      icon: "https://i.ibb.co/PsLSqdfk/Cyberessentials-Badge-resize.png"
    },
    {
      id: 3,
      name: t('credentials.iafci.title'),
      description: t('credentials.iafci.description'),
      verificationNumber: t('credentials.iafci.reference'),
      verificationDate: t('credentials.iafci.lastVerified'),
      verifyUrl: "https://www.iafci.org/",
      icon: "https://images2.imgbox.com/07/b8/FqD1iMOl_o.png"
    },
    {
      id: 4,
      name: t('credentials.bafin.title'),
      description: t('credentials.bafin.description'),
      verificationNumber: t('credentials.bafin.reference'),
      verificationDate: t('credentials.bafin.lastVerified'),
      verifyUrl: "https://www.bafin.de/EN/PublikationenDaten/Datenbanken/datenbanken_node_en.html",
      icon: "https://images2.imgbox.com/bf/bf/cfuajGnV_o.png"
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