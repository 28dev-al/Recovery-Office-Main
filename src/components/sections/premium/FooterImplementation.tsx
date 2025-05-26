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
        { label: 'Investment Fraud Recovery', url: '/services/investment-fraud-recovery' },
        { label: 'Cryptocurrency Recovery', url: '/services/cryptocurrency-recovery' },
        { label: 'Financial Regulatory Assistance', url: '/services/regulatory-assistance' },
        { label: 'Professional Negligence Claims', url: '/services/professional-negligence' },
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', url: '/about' },
        { label: 'Our Team', url: '/about#team' },
        { label: 'Testimonials', url: '/about#testimonials' },
        { label: 'Careers', url: '/careers' },
      ]
    },
    {
      title: 'Resources',
      links: [
        { label: 'Case Studies', url: '/resources/case-studies' },
        { label: 'Blog', url: '/blog' },
        { label: 'FAQ', url: '/faq' },
        { label: 'Client Portal', url: 'https://portal.recoveryoffice.com' },
      ]
    }
  ];
  
  // Legal/utility links shown in bottom bar
  const legalLinks = [
    { label: 'Privacy Policy', url: '/privacy' },
    { label: 'Terms of Service', url: '/terms' },
    { label: 'Sitemap', url: '/sitemap' },
    { label: 'Accessibility', url: '/accessibility' },
  ];
  
  // Social media links
  const socialLinks = [
    { platform: 'twitter' as const, url: 'https://twitter.com', ariaLabel: 'Follow us on Twitter' },
    { platform: 'linkedin' as const, url: 'https://linkedin.com', ariaLabel: 'Connect with us on LinkedIn' },
    { platform: 'facebook' as const, url: 'https://facebook.com', ariaLabel: 'Visit our Facebook page' },
    { platform: 'instagram' as const, url: 'https://instagram.com', ariaLabel: 'Follow us on Instagram' }
  ];
  
  // Regulatory information
  const regulatoryInfo = {
    registrationInfo: "Registered Company No. 12345678",
    regulatoryBody: "Financial Conduct Authority",
    regulatoryBodyUrl: "https://www.fca.org.uk/",
    additionalInfo: "Our financial recovery services comply with international regulatory standards."
  };
  
  return (
    <PremiumFooter
      logo={<LogoComponent />}
      companyName="Recovery Office Ltd."
      columns={primaryColumns}
      legalLinks={legalLinks}
      socialLinks={socialLinks}
      regulatoryInfo={regulatoryInfo}
      copyrightText={`© ${currentYear} Recovery Office Ltd. All rights reserved.`}
      botanical={{ enabled: true, position: 'bottom-right', variant: 'smallFlourish' }}
    />
  );
};

export default FooterImplementation; 