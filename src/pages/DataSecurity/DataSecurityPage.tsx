import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SecurityFramework } from './components/SecurityFramework';
import { ComplianceMatrix } from './components/ComplianceMatrix';
import { EncryptionStandards } from './components/EncryptionStandards';
import { AuditProcedures } from './components/AuditProcedures';
import {
  SecurityContainer,
  SecurityHeader,
  SecurityTitle,
  SecuritySubtitle,
  TableOfContents,
  TOCLink,
  SectionDivider,
  SecurityNotice,
  ComplianceHighlight,
  LastUpdated,
  CertificationGrid,
  CertificationCard
} from './styles/DataSecurityStyles';

export const DataSecurityPage: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Helmet>
        <title>Data Security & Compliance Standards | Recovery Office</title>
        <meta 
          name="description" 
          content="Enterprise-grade data security and compliance standards for Recovery Office financial asset recovery consultancy. UK regulatory compliance and ISO 27001 security framework." 
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://recovery-office-online.netlify.app/data-security" />
      </Helmet>

      <SecurityContainer>
        <SecurityHeader>
          <SecurityTitle>Data Security & Compliance Standards</SecurityTitle>
          <SecuritySubtitle>
            Enterprise-Grade Protection for Your Financial Recovery Consultation
          </SecuritySubtitle>
          <LastUpdated>
            <strong>Last Updated:</strong> 15 January 2024 | <strong>Version:</strong> 3.1 | <strong>Next Review:</strong> July 2024
          </LastUpdated>
          <SecurityNotice>
            <h4>🔒 Client Confidentiality Commitment</h4>
            <p>
              Your financial information is protected by enterprise-grade security measures, professional 
              confidentiality standards, and comprehensive compliance frameworks designed specifically 
              for high-value financial recovery consultations.
            </p>
          </SecurityNotice>
        </SecurityHeader>

        <TableOfContents>
          <h3>Security & Compliance Framework</h3>
          <TOCLink onClick={() => scrollToSection('regulatory-compliance')}>
            1. UK Regulatory Compliance Framework
          </TOCLink>
          <TOCLink onClick={() => scrollToSection('security-standards')}>
            2. International Security Standards
          </TOCLink>
          <TOCLink onClick={() => scrollToSection('technical-security')}>
            3. Technical Security Measures
          </TOCLink>
          <TOCLink onClick={() => scrollToSection('encryption-protocols')}>
            4. Encryption & Data Protection Protocols
          </TOCLink>
          <TOCLink onClick={() => scrollToSection('access-controls')}>
            5. Access Controls & Authentication
          </TOCLink>
          <TOCLink onClick={() => scrollToSection('monitoring-detection')}>
            6. Security Monitoring & Threat Detection
          </TOCLink>
          <TOCLink onClick={() => scrollToSection('data-handling')}>
            7. Data Handling & Retention Procedures
          </TOCLink>
          <TOCLink onClick={() => scrollToSection('incident-response')}>
            8. Incident Response & Business Continuity
          </TOCLink>
          <TOCLink onClick={() => scrollToSection('professional-standards')}>
            9. Professional Confidentiality Standards
          </TOCLink>
          <TOCLink onClick={() => scrollToSection('audit-compliance')}>
            10. Audit Procedures & Compliance Verification
          </TOCLink>
          <TOCLink onClick={() => scrollToSection('client-rights')}>
            11. Your Security & Privacy Rights
          </TOCLink>
          <TOCLink onClick={() => scrollToSection('contact-security')}>
            12. Security Contact & Incident Reporting
          </TOCLink>
        </TableOfContents>

        <SectionDivider />

        <SecurityFramework />

        <ComplianceMatrix />

        <EncryptionStandards />

        <section id="access-controls">
          <h2>5. Access Controls & Authentication</h2>
          
          <ComplianceHighlight>
            <h4>Zero Trust Security Model</h4>
            <p>
              Recovery Office implements a comprehensive zero trust security framework where 
              every access request is verified, encrypted, and logged regardless of location or user credentials.
            </p>
          </ComplianceHighlight>

          <h3>Multi-Factor Authentication (MFA)</h3>
          <ul>
            <li><strong>Client Access:</strong> Mandatory MFA for all client portal access using authenticator apps and hardware tokens</li>
            <li><strong>Staff Authentication:</strong> Biometric authentication combined with hardware security keys</li>
            <li><strong>Administrative Access:</strong> Privileged Access Management (PAM) with time-limited elevated permissions</li>
            <li><strong>Emergency Access:</strong> Secure break-glass procedures with full audit trails</li>
          </ul>

          <h3>Role-Based Access Control (RBAC)</h3>
          <ul>
            <li><strong>Principle of Least Privilege:</strong> Staff access limited to minimum required for job function</li>
            <li><strong>Segregation of Duties:</strong> Critical operations require dual authorization</li>
            <li><strong>Regular Access Reviews:</strong> Quarterly review and certification of all user access rights</li>
            <li><strong>Automated Provisioning:</strong> Standardized access provisioning and de-provisioning processes</li>
          </ul>

          <CertificationGrid>
            <CertificationCard>
              <h4>Identity Management</h4>
              <ul>
                <li>Single Sign-On (SSO) with SAML 2.0</li>
                <li>Directory services integration</li>
                <li>Session management and timeout controls</li>
                <li>Concurrent session limitations</li>
              </ul>
            </CertificationCard>

            <CertificationCard>
              <h4>Access Monitoring</h4>
              <ul>
                <li>Real-time access logging and monitoring</li>
                <li>Behavioral analytics for anomaly detection</li>
                <li>Failed authentication alerting</li>
                <li>Privileged user activity monitoring</li>
              </ul>
            </CertificationCard>
          </CertificationGrid>
        </section>

        <section id="monitoring-detection">
          <h2>6. Security Monitoring & Threat Detection</h2>
          
          <SecurityNotice>
            <h4>24/7 Security Operations Center (SOC)</h4>
            <p>
              Our dedicated security team monitors all systems continuously, with advanced threat 
              detection capabilities and immediate incident response protocols.
            </p>
          </SecurityNotice>

          <h3>Advanced Threat Detection</h3>
          <ul>
            <li><strong>SIEM Integration:</strong> Security Information and Event Management system with correlation rules</li>
            <li><strong>Behavioral Analytics:</strong> AI-powered user and entity behavior analytics (UEBA)</li>
            <li><strong>Threat Intelligence:</strong> Integration with global threat intelligence feeds</li>
            <li><strong>Endpoint Detection:</strong> Advanced endpoint detection and response (EDR) on all devices</li>
            <li><strong>Network Monitoring:</strong> Deep packet inspection and network traffic analysis</li>
          </ul>

          <h3>Incident Classification & Response Times</h3>
          <ul>
            <li><strong>Critical (P1):</strong> Data breach or system compromise - 15 minutes</li>
            <li><strong>High (P2):</strong> Security policy violation - 1 hour</li>
            <li><strong>Medium (P3):</strong> Suspicious activity detected - 4 hours</li>
            <li><strong>Low (P4):</strong> Security configuration issue - 24 hours</li>
          </ul>
        </section>

        <section id="data-handling">
          <h2>7. Data Handling & Retention Procedures</h2>
          
          <h3>Data Classification Framework</h3>
          <ul>
            <li><strong>Strictly Confidential:</strong> Client financial data, recovery strategies, personal information</li>
            <li><strong>Confidential:</strong> Internal business processes, staff information, vendor contracts</li>
            <li><strong>Internal Use:</strong> Company policies, training materials, internal communications</li>
            <li><strong>Public:</strong> Marketing materials, public announcements, website content</li>
          </ul>

          <h3>Financial Services Data Retention</h3>
          <ul>
            <li><strong>Client Consultation Records:</strong> 7 years (UK financial services requirement)</li>
            <li><strong>Financial Transaction Records:</strong> 7 years (regulatory mandate)</li>
            <li><strong>AML/KYC Documentation:</strong> 5 years from relationship end</li>
            <li><strong>Security Logs:</strong> 1 year for operational logs, 3 years for security incidents</li>
            <li><strong>Backup Data:</strong> 30-day retention for daily backups, 1 year for quarterly archives</li>
          </ul>

          <ComplianceHighlight>
            <h4>Secure Data Disposal</h4>
            <p>
              All data disposal follows NIST 800-88 guidelines with cryptographic erasure for electronic 
              media and physical destruction for paper documents. Certificates of destruction are 
              maintained for audit purposes.
            </p>
          </ComplianceHighlight>
        </section>

        <section id="incident-response">
          <h2>8. Incident Response & Business Continuity</h2>
          
          <h3>Incident Response Framework</h3>
          <ul>
            <li><strong>Preparation:</strong> Documented procedures, trained response team, communication plans</li>
            <li><strong>Detection & Analysis:</strong> Automated detection with human analysis and triage</li>
            <li><strong>Containment:</strong> Immediate isolation of affected systems and data</li>
            <li><strong>Eradication:</strong> Complete removal of threats and security vulnerabilities</li>
            <li><strong>Recovery:</strong> Systematic restoration of services with enhanced monitoring</li>
            <li><strong>Lessons Learned:</strong> Post-incident review and security improvement implementation</li>
          </ul>

          <h3>Business Continuity Planning</h3>
          <ul>
            <li><strong>Recovery Time Objective (RTO):</strong> 4 hours for critical consultation services</li>
            <li><strong>Recovery Point Objective (RPO):</strong> 1 hour maximum data loss</li>
            <li><strong>Disaster Recovery Site:</strong> Geographically separated backup facility</li>
            <li><strong>Alternative Communication:</strong> Secure channels for client communication during incidents</li>
          </ul>
        </section>

        <section id="professional-standards">
          <h2>9. Professional Confidentiality Standards</h2>
          
          <SecurityNotice>
            <h4>Enhanced Professional Standards</h4>
            <p>
              As a financial services consultancy, we maintain confidentiality standards that exceed 
              standard business requirements, incorporating elements from legal professional privilege 
              and financial advisory confidentiality frameworks.
            </p>
          </SecurityNotice>

          <h3>Staff Security Requirements</h3>
          <ul>
            <li><strong>Background Checks:</strong> Enhanced DBS checks for all staff handling client data</li>
            <li><strong>Confidentiality Agreements:</strong> Comprehensive NDAs with post-employment obligations</li>
            <li><strong>Security Training:</strong> Monthly security awareness training and annual certifications</li>
            <li><strong>Clean Desk Policy:</strong> Mandatory secure storage of all confidential materials</li>
            <li><strong>Bring Your Own Device (BYOD):</strong> Prohibited for accessing client data</li>
          </ul>

          <h3>Third-Party Security Requirements</h3>
          <ul>
            <li><strong>Vendor Assessment:</strong> Security assessments for all third-party providers</li>
            <li><strong>Data Processing Agreements:</strong> GDPR-compliant agreements with all processors</li>
            <li><strong>Security Questionnaires:</strong> Annual security reviews for critical vendors</li>
            <li><strong>Right to Audit:</strong> Contractual audit rights for high-risk third parties</li>
          </ul>
        </section>

        <AuditProcedures />

        <section id="client-rights">
          <h2>11. Your Security & Privacy Rights</h2>
          
          <h3>Data Subject Rights (UK GDPR)</h3>
          <ul>
            <li><strong>Right of Access:</strong> Request copies of your personal data within 30 days</li>
            <li><strong>Right of Rectification:</strong> Correct inaccurate or incomplete information</li>
            <li><strong>Right of Erasure:</strong> Request deletion (subject to legal retention requirements)</li>
            <li><strong>Right to Restrict Processing:</strong> Limit how we use your data</li>
            <li><strong>Right to Data Portability:</strong> Receive your data in machine-readable format</li>
            <li><strong>Right to Object:</strong> Object to processing for marketing or legitimate interests</li>
          </ul>

          <h3>Financial Services Specific Rights</h3>
          <ul>
            <li><strong>Consultation Recording Access:</strong> Request access to consultation recordings and notes</li>
            <li><strong>Third-Party Disclosure:</strong> Information about any disclosures to regulators or law enforcement</li>
            <li><strong>Security Incident Notification:</strong> Notification within 72 hours if your data is compromised</li>
            <li><strong>Data Protection Officer Contact:</strong> Direct access to our DPO for privacy concerns</li>
          </ul>

          <ComplianceHighlight>
            <h4>Exercising Your Rights</h4>
            <p>
              Contact our Data Protection Officer at dpo@recovery-office.com with identity verification. 
              Most requests are processed within 30 days, with complex requests potentially requiring 
              up to 90 days with appropriate notification.
            </p>
          </ComplianceHighlight>
        </section>

        <section id="contact-security">
          <h2>12. Security Contact & Incident Reporting</h2>
          
          <CertificationGrid>
            <CertificationCard>
              <h4>Security Team</h4>
              <p><strong>Email:</strong> security@recovery-office.com</p>
              <p><strong>Phone:</strong> +44 (0) 20 XXXX XXXX</p>
              <p><strong>Response Time:</strong> 15 minutes (critical), 4 hours (standard)</p>
              <p><strong>Available:</strong> 24/7 for security incidents</p>
            </CertificationCard>

            <CertificationCard>
              <h4>Data Protection Officer</h4>
              <p><strong>Email:</strong> dpo@recovery-office.com</p>
              <p><strong>Phone:</strong> +44 (0) 20 XXXX XXXX</p>
              <p><strong>Response Time:</strong> 48 hours</p>
              <p><strong>Available:</strong> Monday-Friday, 9:00-18:00 GMT</p>
            </CertificationCard>

            <CertificationCard>
              <h4>Incident Reporting</h4>
              <p><strong>Email:</strong> incidents@recovery-office.com</p>
              <p><strong>Emergency Line:</strong> +44 (0) 20 XXXX XXXX</p>
              <p><strong>Secure Portal:</strong> Available via client dashboard</p>
              <p><strong>For:</strong> Security concerns, data breaches, privacy violations</p>
            </CertificationCard>

            <CertificationCard>
              <h4>Compliance Inquiries</h4>
              <p><strong>Email:</strong> compliance@recovery-office.com</p>
              <p><strong>Phone:</strong> +44 (0) 20 XXXX XXXX</p>
              <p><strong>For:</strong> Regulatory questions, audit requests, certification verification</p>
              <p><strong>Available:</strong> Business hours only</p>
            </CertificationCard>
          </CertificationGrid>

          <SecurityNotice>
            <h4>Emergency Security Contacts</h4>
            <p>
              <strong>Critical Security Incidents:</strong> Call our 24/7 security hotline immediately. 
              Do not email sensitive incident details - use our secure incident reporting portal 
              accessible through your client dashboard.
            </p>
            <p>
              <strong>Suspected Data Breach:</strong> Report immediately to incidents@recovery-office.com 
              with "URGENT - SECURITY INCIDENT" in the subject line. Our security team will respond 
              within 15 minutes during business hours, 1 hour outside business hours.
            </p>
          </SecurityNotice>
        </section>

        <SectionDivider />

        <ComplianceHighlight>
          <h4>Continuous Security Improvement</h4>
          <p>
            <strong>Regular Updates:</strong> This page is reviewed quarterly and updated to reflect 
            changes in security technologies, regulatory requirements, and industry best practices.
          </p>
          <p>
            <strong>Client Feedback:</strong> We welcome feedback on our security measures and are 
            committed to continuous improvement based on client needs and security developments.
          </p>
          <p>
            <strong>Transparency:</strong> While we cannot disclose specific security implementation 
            details for obvious reasons, we are committed to transparent communication about our 
            security framework and compliance standards.
          </p>
        </ComplianceHighlight>
      </SecurityContainer>
    </>
  );
}; 