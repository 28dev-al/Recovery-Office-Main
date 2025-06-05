import React from 'react';
import { Helmet } from 'react-helmet-async';
import { PolicySection } from './components/PolicySection';
import { DataRightsTable } from './components/DataRightsTable';
import { ContactDetails } from './components/ContactDetails';
import { LastUpdated } from './components/LastUpdated';
import {
  PolicyContainer,
  PolicyHeader,
  PolicyTitle,
  PolicySubtitle,
  TableOfContents,
  TOCLink,
  SectionDivider,
  LegalNotice,
  DataCategoryCard,
  DataCategoryGrid,
  SecurityFeature,
  SecurityGrid
} from './styles/PrivacyPolicyStyles';

export const PrivacyPolicyPage: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Helmet>
        <title>Privacy Policy | Recovery Office - Financial Data Protection</title>
        <meta 
          name="description" 
          content="Recovery Office Privacy Policy - How we protect your financial recovery consultation data with UK GDPR compliance and professional confidentiality." 
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://recovery-office-online.netlify.app/privacy-policy" />
      </Helmet>

      <PolicyContainer>
        <PolicyHeader>
          <PolicyTitle>Privacy Policy & Data Protection</PolicyTitle>
          <PolicySubtitle>
            How Recovery Office protects your confidential financial information
          </PolicySubtitle>
          <LastUpdated />
        </PolicyHeader>

        <TableOfContents>
          <h3>Table of Contents</h3>
          <TOCLink onClick={() => scrollToSection('data-controller')}>
            1. Data Controller Information
          </TOCLink>
          <TOCLink onClick={() => scrollToSection('information-collection')}>
            2. Information We Collect
          </TOCLink>
          <TOCLink onClick={() => scrollToSection('data-usage')}>
            3. How We Use Your Information
          </TOCLink>
          <TOCLink onClick={() => scrollToSection('legal-basis')}>
            4. Legal Basis for Processing
          </TOCLink>
          <TOCLink onClick={() => scrollToSection('data-sharing')}>
            5. Data Sharing and Third Parties
          </TOCLink>
          <TOCLink onClick={() => scrollToSection('international-transfers')}>
            6. International Data Transfers
          </TOCLink>
          <TOCLink onClick={() => scrollToSection('data-retention')}>
            7. Data Retention
          </TOCLink>
          <TOCLink onClick={() => scrollToSection('your-rights')}>
            8. Your Rights Under UK GDPR
          </TOCLink>
          <TOCLink onClick={() => scrollToSection('security-measures')}>
            9. Security Measures
          </TOCLink>
          <TOCLink onClick={() => scrollToSection('cookies')}>
            10. Cookies and Tracking
          </TOCLink>
          <TOCLink onClick={() => scrollToSection('professional-confidentiality')}>
            11. Professional Confidentiality
          </TOCLink>
          <TOCLink onClick={() => scrollToSection('contact-us')}>
            12. Contact Our Data Protection Team
          </TOCLink>
        </TableOfContents>

        <SectionDivider />

        <PolicySection 
          id="data-controller"
          title="1. Data Controller Information"
        >
          <p>
            <strong>Recovery Office Limited</strong> is the data controller responsible for your personal information.
            We are a specialist financial asset recovery consultancy regulated in accordance with UK financial 
            services standards and operating in alignment with Financial Conduct Authority (FCA) guidelines.
          </p>
          
          <LegalNotice>
            <h4>Company Details</h4>
            <ul>
              <li><strong>Company Name:</strong> Recovery Office Limited</li>
              <li><strong>Business Type:</strong> Financial Asset Recovery Consultancy</li>
              <li><strong>Registration:</strong> England and Wales</li>
              <li><strong>Registered Address:</strong> [To be provided by legal team]</li>
              <li><strong>Email:</strong> info@recovery-office.com</li>
              <li><strong>Phone:</strong> +44 (0) 20 XXXX XXXX</li>
            </ul>
          </LegalNotice>

          <p>
            As a financial services firm, we maintain enhanced data protection standards that exceed 
            standard GDPR requirements. Our data protection practices are designed to safeguard the 
            confidential nature of financial recovery consultations and comply with professional 
            standards expected in the financial services sector.
          </p>
        </PolicySection>

        <PolicySection 
          id="information-collection"
          title="2. Information We Collect"
        >
          <p>
            We collect and process personal information necessary to deliver our financial recovery 
            consultation services. The information we collect falls into the following categories:
          </p>

          <DataCategoryGrid>
            <DataCategoryCard>
              <h4>Personal Identifiers</h4>
              <ul>
                <li>Full name and preferred title</li>
                <li>Email address and phone number</li>
                <li>Postal address and billing information</li>
                <li>Date of birth (for identity verification)</li>
              </ul>
              <div className="legal-basis">
                <strong>Legal Basis:</strong> Contract performance and legitimate interests
              </div>
            </DataCategoryCard>

            <DataCategoryCard>
              <h4>Financial Information</h4>
              <ul>
                <li>Details of financial losses and assets affected</li>
                <li>Asset types (cryptocurrency, investments, etc.)</li>
                <li>Incident details and timeline</li>
                <li>Recovery goals and expectations</li>
                <li>Financial institution details (when relevant)</li>
              </ul>
              <div className="legal-basis">
                <strong>Legal Basis:</strong> Contract performance and legal obligations
              </div>
            </DataCategoryCard>

            <DataCategoryCard>
              <h4>Technical Data</h4>
              <ul>
                <li>IP address and browser information</li>
                <li>Session data and booking preferences</li>
                <li>Website usage analytics</li>
                <li>Device and connection information</li>
              </ul>
              <div className="legal-basis">
                <strong>Legal Basis:</strong> Legitimate interests
              </div>
            </DataCategoryCard>

            <DataCategoryCard>
              <h4>Communication Records</h4>
              <ul>
                <li>Consultation notes and recordings (with consent)</li>
                <li>Email correspondence</li>
                <li>Phone call logs</li>
                <li>Case documentation and progress notes</li>
              </ul>
              <div className="legal-basis">
                <strong>Legal Basis:</strong> Contract performance and legal obligations
              </div>
            </DataCategoryCard>
          </DataCategoryGrid>
        </PolicySection>

        <PolicySection 
          id="data-usage"
          title="3. How We Use Your Information"
        >
          <p>We process your personal information for the following purposes:</p>
          
          <ul>
            <li><strong>Consultation Delivery:</strong> Providing financial recovery consultation services and case management</li>
            <li><strong>Client Communication:</strong> Keeping you informed about your case progress and available services</li>
            <li><strong>Legal and Regulatory Compliance:</strong> Meeting FCA requirements and anti-money laundering (AML) obligations</li>
            <li><strong>Service Improvement:</strong> Analyzing service effectiveness and developing enhanced recovery methodologies</li>
            <li><strong>Security and Fraud Prevention:</strong> Protecting against unauthorized access and fraudulent activities</li>
            <li><strong>Financial Reporting:</strong> Maintaining accurate records for regulatory and tax purposes</li>
            <li><strong>Professional Development:</strong> Training our specialists (with anonymized data only)</li>
          </ul>

          <LegalNotice>
            <strong>Marketing Communications:</strong> We will only send marketing communications 
            with your explicit consent. You can withdraw this consent at any time by contacting 
            our data protection team or using the unsubscribe links in our emails.
          </LegalNotice>
        </PolicySection>

        <PolicySection 
          id="legal-basis"
          title="4. Legal Basis for Processing"
        >
          <p>
            Under UK GDPR, we must have a legal basis for processing your personal information. 
            We rely on the following legal bases:
          </p>

          <ul>
            <li>
              <strong>Contract Performance:</strong> Processing necessary for performing consultation 
              agreements and delivering recovery services
            </li>
            <li>
              <strong>Legal Obligations:</strong> Compliance with FCA regulations, AML requirements, 
              and other financial services legislation
            </li>
            <li>
              <strong>Legitimate Interests:</strong> Service improvement, security measures, and 
              business operations (balanced against your privacy rights)
            </li>
            <li>
              <strong>Consent:</strong> Marketing communications and optional service enhancements 
              (which you can withdraw at any time)
            </li>
            <li>
              <strong>Vital Interests:</strong> Protecting against fraud or in emergency situations 
              affecting financial security
            </li>
          </ul>
        </PolicySection>

        <PolicySection 
          id="data-sharing"
          title="5. Data Sharing and Third Parties"
        >
          <p>
            We maintain strict confidentiality standards and do not sell your personal information. 
            We may share your information only in the following limited circumstances:
          </p>

          <h4>Professional Service Providers</h4>
          <ul>
            <li><strong>Secure Hosting Services:</strong> Railway (backend) and Netlify (frontend) for website infrastructure</li>
            <li><strong>Database Services:</strong> MongoDB Atlas for secure data storage</li>
            <li><strong>Payment Processing:</strong> Authorized payment processors for consultation fees</li>
            <li><strong>Email Services:</strong> Secure email providers for client communications</li>
          </ul>

          <h4>Legal and Regulatory Authorities</h4>
          <ul>
            <li>When required by law or court order</li>
            <li>To comply with regulatory investigations</li>
            <li>To protect against fraud or criminal activity</li>
            <li>In response to valid requests from law enforcement</li>
          </ul>

          <h4>Recovery Specialists and Partners</h4>
          <ul>
            <li>Specialized recovery professionals (with your explicit consent)</li>
            <li>Legal advisors working on your case</li>
            <li>Forensic investigators (when necessary for case resolution)</li>
          </ul>

          <LegalNotice>
            <strong>Third-Party Safeguards:</strong> All third parties we work with are contractually 
            bound to maintain the same high standards of data protection and confidentiality that we uphold.
          </LegalNotice>
        </PolicySection>

        <PolicySection 
          id="international-transfers"
          title="6. International Data Transfers"
        >
          <p>
            Some of our service providers may process your data outside the UK. We ensure appropriate 
            safeguards are in place for any international data transfers:
          </p>

          <ul>
            <li><strong>Adequacy Decisions:</strong> Transfers to countries with adequate data protection as determined by the UK government</li>
            <li><strong>Standard Contractual Clauses:</strong> EU/UK standard contractual clauses for transfers to other countries</li>
            <li><strong>Service Provider Commitments:</strong> Contractual guarantees from providers like MongoDB Atlas and Railway</li>
            <li><strong>Data Residency Controls:</strong> Where possible, data is stored within the UK/EU region</li>
          </ul>

          <p>
            For specific information about where your data is processed, please contact our 
            data protection team.
          </p>
        </PolicySection>

        <PolicySection 
          id="data-retention"
          title="7. Data Retention"
        >
          <p>
            We retain your personal information only as long as necessary for the purposes outlined 
            in this policy and to meet our legal obligations:
          </p>

          <ul>
            <li><strong>Client Consultation Records:</strong> 7 years from last contact (financial services requirement)</li>
            <li><strong>Financial Transaction Records:</strong> 7 years (regulatory requirement)</li>
            <li><strong>Marketing Consent Records:</strong> Until consent is withdrawn</li>
            <li><strong>Technical Logs and Analytics:</strong> 12 months maximum</li>
            <li><strong>Security Incident Records:</strong> 3 years for monitoring and prevention</li>
            <li><strong>Legal Correspondence:</strong> Duration of legal matter plus 7 years</li>
          </ul>

          <LegalNotice>
            <strong>Legal Hold Exception:</strong> We may retain information longer if required 
            by ongoing legal proceedings, regulatory investigations, or court orders.
          </LegalNotice>
        </PolicySection>

        <PolicySection 
          id="your-rights"
          title="8. Your Rights Under UK GDPR"
        >
          <p>
            As a data subject, you have significant rights regarding your personal information. 
            The table below outlines your rights and how to exercise them:
          </p>
          
          <DataRightsTable />

          <LegalNotice>
            <strong>Right to Complain:</strong> You have the right to lodge a complaint with the 
            Information Commissioner's Office (ICO) if you believe your data protection rights 
            have been violated. Visit <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer">ico.org.uk</a> 
            or call 0303 123 1113.
          </LegalNotice>
        </PolicySection>

        <PolicySection 
          id="security-measures"
          title="9. Security Measures"
        >
          <p>
            We implement comprehensive security measures to protect your personal information, 
            reflecting the sensitive nature of financial recovery consultations:
          </p>

          <SecurityGrid>
            <SecurityFeature>
              <h4>🔒 Encryption</h4>
              <ul>
                <li>End-to-end encryption for sensitive communications</li>
                <li>TLS 1.3 for all data transmission</li>
                <li>AES-256 encryption for data at rest</li>
              </ul>
            </SecurityFeature>

            <SecurityFeature>
              <h4>🛡️ Access Controls</h4>
              <ul>
                <li>Multi-factor authentication for all staff</li>
                <li>Role-based access permissions</li>
                <li>Regular access reviews and audits</li>
              </ul>
            </SecurityFeature>

            <SecurityFeature>
              <h4>🏗️ Infrastructure Security</h4>
              <ul>
                <li>Enterprise-grade hosting with Railway and Netlify</li>
                <li>Regular security updates and patches</li>
                <li>DDoS protection and monitoring</li>
              </ul>
            </SecurityFeature>

            <SecurityFeature>
              <h4>📊 Monitoring</h4>
              <ul>
                <li>24/7 security monitoring and alerting</li>
                <li>Regular penetration testing</li>
                <li>Incident response procedures</li>
              </ul>
            </SecurityFeature>
          </SecurityGrid>

          <p>
            In the unlikely event of a data breach, we will notify you and the ICO within 
            72 hours as required by UK GDPR, along with guidance on steps to protect yourself.
          </p>
        </PolicySection>

        <PolicySection 
          id="cookies"
          title="10. Cookies and Tracking"
        >
          <p>
            We use cookies and similar technologies to enhance your experience on our website. 
            Here's what we use and why:
          </p>

          <h4>Essential Cookies</h4>
          <ul>
            <li>Booking system functionality and session management</li>
            <li>Security features and fraud prevention</li>
            <li>Load balancing and performance optimization</li>
          </ul>

          <h4>Analytics Cookies (with your consent)</h4>
          <ul>
            <li>Website usage analytics to improve our services</li>
            <li>Performance monitoring and optimization</li>
            <li>User journey analysis for better client experience</li>
          </ul>

          <LegalNotice>
            <strong>Your Cookie Choices:</strong> You can manage your cookie preferences through 
            your browser settings. Note that disabling essential cookies may affect website functionality. 
            We do not use third-party advertising cookies.
          </LegalNotice>
        </PolicySection>

        <PolicySection 
          id="professional-confidentiality"
          title="11. Professional Confidentiality"
        >
          <p>
            Beyond our legal obligations under UK GDPR, we maintain enhanced confidentiality 
            standards appropriate for financial recovery consultations:
          </p>

          <ul>
            <li><strong>Professional Privilege:</strong> Communications may be subject to legal professional privilege</li>
            <li><strong>Confidentiality Agreements:</strong> All staff sign comprehensive confidentiality agreements</li>
            <li><strong>Secure Communications:</strong> Encrypted channels for all sensitive discussions</li>
            <li><strong>Information Compartmentalization:</strong> Access to case information strictly limited to assigned specialists</li>
            <li><strong>Anonymous Reporting:</strong> Internal case discussions use anonymized information where possible</li>
          </ul>

          <p>
            These enhanced measures reflect our commitment to maintaining the highest standards 
            of confidentiality expected in the financial services sector.
          </p>
        </PolicySection>

        <ContactDetails />

        <SectionDivider />

        <LegalNotice>
          <h3>Legal Disclaimers and Updates</h3>
          <p>
            <strong>Right to Update:</strong> We reserve the right to update this Privacy Policy 
            to reflect changes in our practices or legal requirements. We will notify you of 
            material changes via email or prominent website notice.
          </p>
          <p>
            <strong>Governing Law:</strong> This Privacy Policy is governed by the laws of England and Wales. 
            Any disputes will be subject to the exclusive jurisdiction of the English courts.
          </p>
          <p>
            <strong>Contact for Legal Matters:</strong> For legal inquiries regarding this Privacy Policy, 
            contact our legal team at legal@recovery-office.com.
          </p>
        </LegalNotice>
      </PolicyContainer>
    </>
  );
}; 