import React from 'react';
import { ContactSection, ContactGrid, ContactItem } from '../styles/PrivacyPolicyStyles';

export const ContactDetails: React.FC = () => {
  return (
    <ContactSection id="contact-us">
      <h3>Contact Our Data Protection Team</h3>
      <ContactGrid>
        <ContactItem>
          <strong>Data Protection Officer</strong>
          <p>Email: dpo@recovery-office.com</p>
          <p>Phone: +44 (0) 20 XXXX XXXX</p>
          <p>Response time: Within 48 hours</p>
          <p>Available: Monday - Friday, 9:00 AM - 6:00 PM GMT</p>
        </ContactItem>

        <ContactItem>
          <strong>General Data Protection Inquiries</strong>
          <p>Email: privacy@recovery-office.com</p>
          <p>Phone: +44 (0) 20 XXXX XXXX</p>
          <p>Response time: Within 48 hours</p>
          <p>For: General privacy questions and concerns</p>
        </ContactItem>

        <ContactItem>
          <strong>Subject Access Requests</strong>
          <p>Email: sar@recovery-office.com</p>
          <p>Secure Portal: [To be implemented]</p>
          <p>Response time: Within 1 month</p>
          <p>Required: Photo ID and proof of address</p>
        </ContactItem>

        <ContactItem>
          <strong>Emergency Data Protection</strong>
          <p>Email: emergency.privacy@recovery-office.com</p>
          <p>Phone: +44 (0) 20 XXXX XXXX (24/7)</p>
          <p>For: Data breaches and urgent privacy concerns</p>
          <p>Response time: Within 2 hours</p>
        </ContactItem>
      </ContactGrid>

      <div style={{ marginTop: '32px', textAlign: 'center', background: 'rgba(255, 255, 255, 0.1)', padding: '24px', borderRadius: '8px' }}>
        <h4 style={{ color: '#d69e2e', marginTop: 0 }}>Postal Address</h4>
        <p style={{ margin: '8px 0', color: '#e2e8f0' }}>
          Recovery Office Limited<br/>
          Data Protection Department<br/>
          [Address to be provided by legal team]<br/>
          London, UK<br/>
          [Postcode]
        </p>
        
        <h4 style={{ color: '#d69e2e', marginTop: '24px', marginBottom: '8px' }}>Office Hours</h4>
        <p style={{ margin: 0, color: '#e2e8f0' }}>
          Monday - Friday: 9:00 AM - 6:00 PM GMT<br/>
          Saturday: 10:00 AM - 2:00 PM GMT<br/>
          Sunday: Emergency contacts only
        </p>
      </div>
    </ContactSection>
  );
}; 