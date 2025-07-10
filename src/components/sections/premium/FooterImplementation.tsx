/**
 * Premium, responsive, accessible footer for Recovery Office
 */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { PremiumFooter } from '../../../design-system/components/footer';
import { COMPANY_PROFILE_CA } from '../../../constants/companyProfile.ca';

// --- SVGs ---
const LogoComponent = () => (
  <img 
    src="https://images2.imgbox.com/86/72/GE2VLjan_o.png" 
    alt="Recovery Office – Financial Asset Recovery" 
    style={{ width: 'auto', maxHeight: '40px', objectFit: 'contain' }}
  />
);

const FooterImplementation: React.FC = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  
  // Columns for footer content
  const primaryColumns = [
    {
      title: t('footer.services.title', 'Services'),
      links: [
        { label: t('footer.services.cryptocurrencyRecovery', 'Cryptocurrency Recovery'), url: '/services/cryptocurrency-recovery' },
        { label: t('footer.services.investmentFraudRecovery', 'Investment Fraud Recovery'), url: '/services/investment-fraud-recovery' },
        { label: t('footer.services.financialScamRecovery', 'Financial Scam Recovery'), url: '/services/financial-scam-recovery' },
        { label: t('footer.services.regulatoryComplaintAssistance', 'Regulatory Complaint Assistance'), url: '/services/regulatory-assistance' },
      ]
    },
    {
      title: t('footer.company.title', 'Company'),
      links: [
        { label: t('footer.company.aboutUs', 'About Us'), url: '/about' },
        { label: t('footer.company.ourTeam', 'Our Team'), url: '/about#team' },
        { label: t('footer.company.contactUs', 'Contact Us'), url: '/contact' },
        { label: t('footer.company.bookConsultation', 'Book Consultation'), url: '/booking', isHighlighted: true },
      ]
    },
    {
      title: t('footer.contactInformation.title', 'Contact Information'),
      links: [
        { label: `📍 ${t('footer.contactInformation.address', COMPANY_PROFILE_CA.address)}`, url: '#' },
        { label: `📧 ${t('footer.contactInformation.email', COMPANY_PROFILE_CA.email)}`, url: `mailto:${COMPANY_PROFILE_CA.email}` },
      ]
    },
    {
      title: t('footer.resources.title', 'Resources'),
      links: [
        { label: t('footer.resources.faq', 'FAQ'), url: '/faq' },
        { label: t('footer.resources.blog', 'Blog'), url: '/blog' },
        { label: t('footer.resources.emergencyConsultation', 'Emergency Consultation'), url: '/booking', isHighlighted: true },
        { label: t('footer.resources.clientPortal', 'Client Portal'), url: '/dashboard' },
      ]
    }
  ];
  
  // Legal/utility links shown in bottom bar
  const legalLinks = [
    { label: t('navigation.privacyPolicy', 'Privacy Policy'), url: '/privacy' },
    { label: t('navigation.termsOfService', 'Terms of Service'), url: '/terms' },
    { label: t('footer.accessibility', 'Accessibility'), url: '/accessibility' },
  ];
  
  // Social media links
  const socialLinks = [
    { platform: 'linkedin' as const, url: 'https://linkedin.com/company/recovery-office', ariaLabel: 'Connect with Recovery Office on LinkedIn' },
    { platform: 'twitter' as const, url: 'https://twitter.com/recoveryoffice', ariaLabel: 'Follow Recovery Office on Twitter' },
    { platform: 'facebook' as const, url: 'https://facebook.com/recoveryoffice', ariaLabel: 'Visit Recovery Office on Facebook' }
  ];
  
  // Real regulatory information
  const regulatoryInfo = {
    registrationInfo: `Business Number: ${COMPANY_PROFILE_CA.businessNumber}`,
    regulatoryBody: COMPANY_PROFILE_CA.regulatorPrimary,
    regulatoryBodyUrl: 'https://www.ciro.ca',
    additionalInfo: t('footer.regulatoryDisclaimer', 'Recovery Office provides professional financial asset recovery services across Canada. All operations are conducted within Canadian federal and provincial regulatory frameworks.')
  };

  // Company disclaimer for financial services
  const disclaimerText = t('footer.generalDisclaimer', "Recovery Office specializes in financial asset recovery services. While we maintain high success rates, recovery outcomes depend on individual case circumstances. All consultations are confidential and we operate on a no recovery, no fee basis for qualifying cases. Recovery Office is committed to helping victims of financial fraud reclaim their stolen assets through legal and ethical means.");
  
  return (
    <PremiumFooter
      logo={<LogoComponent />}
      companyName="Recovery Office Canada"
      columns={primaryColumns}
      legalLinks={legalLinks}
      socialLinks={socialLinks}
      regulatoryInfo={regulatoryInfo}
      disclaimerText={disclaimerText}
      copyrightText={t('footer.copyright', `© ${currentYear} Recovery Office. All rights reserved. Incorporated in Ontario, Canada.`)}
      botanical={{ enabled: true, position: 'bottom-right', variant: 'smallFlourish' }}
    />
  );
};

export default FooterImplementation; 