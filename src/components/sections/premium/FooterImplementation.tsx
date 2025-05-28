/**
 * Premium, responsive, accessible footer for Recovery Office
 */
import React from 'react';
import { PremiumFooter } from '../../../design-system/components/footer';

// --- SVGs ---
const LogoComponent = () => (
  <img 
    src="https://images2.imgbox.com/86/72/GE2VLjan_o.png" 
    alt="Recovery Office – Financial Asset Recovery" 
    style={{ width: 'auto', maxHeight: '40px', objectFit: 'contain' }}
  />
);

const FooterImplementation: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  // Columns for footer content
  const primaryColumns = [
    {
      title: 'Services',
      links: [
        { label: 'Cryptocurrency Recovery', url: '/services/cryptocurrency-recovery' },
        { label: 'Investment Fraud Recovery', url: '/services/investment-fraud-recovery' },
        { label: 'Financial Scam Recovery', url: '/services/financial-scam-recovery' },
        { label: 'Regulatory Complaint Assistance', url: '/services/regulatory-assistance' },
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', url: '/about' },
        { label: 'Our Team', url: '/about#team' },
        { label: 'Contact Us', url: '/contact' },
        { label: 'Book Consultation', url: '/booking', isHighlighted: true },
      ]
    },
    {
      title: 'Contact Information',
      links: [
        { label: '📍 2nd Floor, 3 Piccadilly Place', url: '#' },
        { label: 'London Road, Manchester M1 3BN', url: '#' },
        { label: '📞 +44 7451 263372', url: 'tel:+447451263372' },
        { label: '📧 info@recovery-office.com', url: 'mailto:info@recovery-office.com' },
      ]
    },
    {
      title: 'Resources',
      links: [
        { label: 'FAQ', url: '/faq' },
        { label: 'Blog', url: '/blog' },
        { label: 'Emergency Support', url: 'tel:+447451263372', isHighlighted: true },
        { label: 'Client Portal', url: '/dashboard' },
      ]
    }
  ];
  
  // Legal/utility links shown in bottom bar
  const legalLinks = [
    { label: 'Privacy Policy', url: '/privacy' },
    { label: 'Terms of Service', url: '/terms' },
    { label: 'HIPAA Compliance', url: '/hipaa' },
    { label: 'Accessibility', url: '/accessibility' },
  ];
  
  // Social media links
  const socialLinks = [
    { platform: 'linkedin' as const, url: 'https://linkedin.com/company/recovery-office', ariaLabel: 'Connect with Recovery Office on LinkedIn' },
    { platform: 'twitter' as const, url: 'https://twitter.com/recoveryoffice', ariaLabel: 'Follow Recovery Office on Twitter' },
    { platform: 'facebook' as const, url: 'https://facebook.com/recoveryoffice', ariaLabel: 'Visit Recovery Office on Facebook' }
  ];
  
  // Real regulatory information
  const regulatoryInfo = {
    registrationInfo: "Recovery Office is registered in England and Wales. Company Number: 06621703 | Firm Reference Number: 836358",
    regulatoryBody: "Financial Conduct Authority",
    regulatoryBodyUrl: "https://www.fca.org.uk/",
    additionalInfo: "Recovery Office provides professional financial asset recovery services. All recovery operations are conducted within strict legal frameworks and regulatory compliance standards."
  };

  // Company disclaimer for financial services
  const disclaimerText = "Recovery Office specializes in financial asset recovery services. While we maintain high success rates, recovery outcomes depend on individual case circumstances. All consultations are confidential and we operate on a no recovery, no fee basis for qualifying cases. Recovery Office is committed to helping victims of financial fraud reclaim their stolen assets through legal and ethical means.";
  
  return (
    <PremiumFooter
      logo={<LogoComponent />}
      companyName="Recovery Office"
      columns={primaryColumns}
      legalLinks={legalLinks}
      socialLinks={socialLinks}
      regulatoryInfo={regulatoryInfo}
      disclaimerText={disclaimerText}
      copyrightText={`© ${currentYear} Recovery Office. All rights reserved. Registered in England and Wales: 06621703`}
      botanical={{ enabled: true, position: 'bottom-right', variant: 'smallFlourish' }}
    />
  );
};

export default FooterImplementation; 