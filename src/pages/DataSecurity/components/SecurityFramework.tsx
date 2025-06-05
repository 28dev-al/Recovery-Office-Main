import React from 'react';
import { SecurityFrameworkContainer, ComplianceHighlight, SecurityNotice, CertificationGrid, CertificationCard } from '../styles/DataSecurityStyles';

export const SecurityFramework: React.FC = () => {
  return (
    <SecurityFrameworkContainer id="regulatory-compliance">
      <h2>1. UK Regulatory Compliance Framework</h2>
      
      <ComplianceHighlight>
        <h4>Financial Services Regulatory Alignment</h4>
        <p>
          Recovery Office operates in accordance with UK financial services regulatory principles, 
          maintaining data protection and security standards that meet or exceed requirements for 
          financial advisory and consultancy services.
        </p>
      </ComplianceHighlight>

      <h3>Primary Regulatory Frameworks</h3>
      <ul>
        <li><strong>UK Data Protection Act 2018:</strong> Comprehensive compliance with UK GDPR requirements</li>
        <li><strong>FCA Principles for Business:</strong> Alignment with Financial Conduct Authority guidelines</li>
        <li><strong>Money Laundering Regulations 2017:</strong> Full AML/KYC compliance framework</li>
        <li><strong>Electronic Commerce Regulations 2002:</strong> Secure electronic transaction processing</li>
        <li><strong>Computer Misuse Act 1990:</strong> Protection against unauthorized access and cyber threats</li>
      </ul>

      <h3>Professional Standards Compliance</h3>
      <ul>
        <li><strong>Professional Confidentiality:</strong> Legal professional privilege standards where applicable</li>
        <li><strong>Financial Advisory Standards:</strong> Client confidentiality and data protection best practices</li>
        <li><strong>Anti-Money Laundering:</strong> Enhanced due diligence and monitoring procedures</li>
        <li><strong>Counter-Terrorism Financing:</strong> Compliance with UK counter-terrorism regulations</li>
      </ul>

      <CertificationGrid>
        <CertificationCard>
          <h4>🇬🇧 UK GDPR Compliance</h4>
          <ul>
            <li>Data Protection Impact Assessments (DPIA)</li>
            <li>Privacy by Design implementation</li>
            <li>Data subject rights management</li>
            <li>Breach notification procedures (72 hours)</li>
            <li>Data Protection Officer appointment</li>
          </ul>
        </CertificationCard>

        <CertificationCard>
          <h4>⚖️ FCA Alignment</h4>
          <ul>
            <li>Client confidentiality standards</li>
            <li>Fair treatment of clients</li>
            <li>Professional competence requirements</li>
            <li>Record keeping and documentation</li>
            <li>Financial crime prevention measures</li>
          </ul>
        </CertificationCard>
      </CertificationGrid>

      <SecurityNotice>
        <h4>Enhanced Due Diligence</h4>
        <p>
          Given the nature of asset recovery consultations, we implement enhanced due diligence 
          procedures that exceed standard business requirements, including source of funds 
          verification, beneficial ownership identification, and ongoing monitoring for high-risk indicators.
        </p>
      </SecurityNotice>
    </SecurityFrameworkContainer>
  );
}; 