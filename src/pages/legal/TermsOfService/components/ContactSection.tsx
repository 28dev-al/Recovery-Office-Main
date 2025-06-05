import React from 'react';
import { ContactContainer, ContactGrid, ContactCard } from '../styles/TermsOfServiceStyles';

export const ContactSection: React.FC = () => {
  return (
    <ContactContainer id="contact-legal">
      <h3>Legal and Contract Inquiries</h3>
      <ContactGrid>
        <ContactCard>
          <h4>Contract Administration</h4>
          <p><strong>Email:</strong> legal@recovery-office.com</p>
          <p><strong>Phone:</strong> +44 (0) 20 XXXX XXXX</p>
          <p><strong>Response Time:</strong> Within 48 hours</p>
          <p><strong>Available:</strong> Monday - Friday, 9:00 AM - 6:00 PM GMT</p>
        </ContactCard>

        <ContactCard>
          <h4>Dispute Resolution</h4>
          <p><strong>Email:</strong> disputes@recovery-office.com</p>
          <p><strong>Phone:</strong> +44 (0) 20 XXXX XXXX</p>
          <p><strong>Postal Address:</strong> [Legal Notice Address]</p>
          <p><strong>For:</strong> Contract disputes and formal notices</p>
        </ContactCard>

        <ContactCard>
          <h4>Billing and Payments</h4>
          <p><strong>Email:</strong> billing@recovery-office.com</p>
          <p><strong>Phone:</strong> +44 (0) 20 XXXX XXXX</p>
          <p><strong>Response Time:</strong> Within 24 hours</p>
          <p><strong>For:</strong> Payment queries and invoice support</p>
        </ContactCard>

        <ContactCard>
          <h4>Compliance and Regulatory</h4>
          <p><strong>Email:</strong> compliance@recovery-office.com</p>
          <p><strong>Phone:</strong> +44 (0) 20 XXXX XXXX</p>
          <p><strong>For:</strong> AML, KYC, and regulatory inquiries</p>
          <p><strong>Available:</strong> Business hours only</p>
        </ContactCard>
      </ContactGrid>

      <div style={{ 
        marginTop: '32px', 
        textAlign: 'center', 
        background: 'rgba(255, 255, 255, 0.1)', 
        padding: '24px', 
        borderRadius: '8px' 
      }}>
        <h4 style={{ color: '#d69e2e', marginTop: 0 }}>Legal Notice Address</h4>
        <p style={{ margin: '8px 0', color: '#e2e8f0' }}>
          Recovery Office Limited<br/>
          Legal Department<br/>
          [Professional address for legal notices]<br/>
          London, UK<br/>
          [Postcode]
        </p>
        
        <h4 style={{ color: '#d69e2e', marginTop: '24px', marginBottom: '8px' }}>Business Hours</h4>
        <p style={{ margin: 0, color: '#e2e8f0' }}>
          Monday - Friday: 9:00 AM - 6:00 PM GMT<br/>
          Saturday: Emergency legal matters only<br/>
          Sunday: Closed (emergency contact available)
        </p>

        <h4 style={{ color: '#d69e2e', marginTop: '24px', marginBottom: '8px' }}>Important Notice</h4>
        <p style={{ margin: 0, color: '#e2e8f0', fontSize: '0.875rem' }}>
          All formal legal notices must be sent to our legal notice address by registered post 
          or secure email. Electronic communications to legal@recovery-office.com are 
          acknowledged within 48 hours during business hours.
        </p>
      </div>
    </ContactContainer>
  );
}; 