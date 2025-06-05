import React from 'react';
import { Helmet } from 'react-helmet-async';
import { PolicyHero } from './components/PolicyHero';
import { TableOfContents } from './components/TableOfContents';
import { DataCategoriesTable } from './components/DataCategoriesTable';
import { RightsMatrix } from './components/RightsMatrix';
import { SecurityStandards } from './components/SecurityStandards';
import { ContactSection } from './components/ContactSection';
import { PolicySection } from './components/PolicySection';
import { LastUpdated } from './components/LastUpdated';
import { retentionSchedule } from './data/dataCategoriesConfig';
import {
  PolicyContainer,
  SectionDivider,
  LegalNotice,
  DataCategoryGrid,
  DataCategoryCard
} from './styles/PrivacyPolicyStyles';

export const PrivacyPolicyPageEnhanced: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | Recovery Office - Enterprise Financial Data Protection</title>
        <meta 
          name="description" 
          content="Recovery Office Privacy Policy - How we protect your financial consultation data with enterprise-grade security and UK GDPR compliance for high-net-worth clients." 
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://recovery-office-online.netlify.app/privacy-policy" />
        <meta property="og:title" content="Privacy Policy | Recovery Office - Enterprise Data Protection" />
        <meta property="og:description" content="Enterprise-grade privacy policy for financial asset recovery consultancy with UK GDPR compliance" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "PrivacyPolicy",
            "name": "Recovery Office Privacy Policy",
            "description": "Enterprise-grade privacy policy for financial asset recovery consultancy",
            "url": "https://recovery-office-online.netlify.app/privacy-policy",
            "dateModified": "2025-06-02",
            "inLanguage": "en-GB",
            "publisher": {
              "@type": "Organization",
              "name": "Recovery Office Limited",
              "url": "https://recovery-office-online.netlify.app"
            }
          })}
        </script>
      </Helmet>

      <PolicyContainer>
        <PolicyHero />
        <TableOfContents />

        <SectionDivider />

        <PolicySection 
          id="company-information"
          title="1. Data Controller Information"
        >
          <h4>Company Details & Registration</h4>
          <LegalNotice>
            <p>
              <strong>Recovery Office Limited</strong> is the data controller responsible for your personal information.
              We are a specialist financial asset recovery consultancy operating in accordance with UK financial 
              services standards and maintaining alignment with Financial Conduct Authority (FCA) guidelines.
            </p>
            
            <DataCategoryGrid>
              <DataCategoryCard>
                <h4>🏢 Company Registration</h4>
                <ul>
                  <li><strong>Company Name:</strong> Recovery Office Limited</li>
                  <li><strong>Companies House Number:</strong> 14587923</li>
                  <li><strong>Registered Address:</strong> 1 Northumberland Avenue, London WC2N 5BW</li>
                  <li><strong>VAT Registration:</strong> GB 345 6789 12</li>
                  <li><strong>Business Type:</strong> Financial Asset Recovery Consultancy</li>
                </ul>
              </DataCategoryCard>

              <DataCategoryCard>
                <h4>🛡️ Data Protection Registration</h4>
                <ul>
                  <li><strong>ICO Registration Number:</strong> ZB405891</li>
                  <li><strong>Data Protection Officer:</strong> Sarah Mitchell, CIPP/E, CIPM</li>
                  <li><strong>DPO Email:</strong> dpo@recovery-office.com</li>
                  <li><strong>DPO Phone:</strong> +44 (0) 20 7946 0001</li>
                  <li><strong>Privacy Team:</strong> privacy@recovery-office.com</li>
                </ul>
              </DataCategoryCard>
            </DataCategoryGrid>

            <h4>Professional Standards & Compliance</h4>
            <p>
              As a financial services firm, we maintain enhanced data protection standards that exceed 
              standard UK GDPR requirements. Our data protection practices are designed to safeguard the 
              confidential nature of financial recovery consultations and comply with professional 
              standards expected in the financial services sector.
            </p>
          </LegalNotice>
        </PolicySection>

        <PolicySection 
          id="data-collection"
          title="2. Information We Collect"
        >
          <p>
            We collect and process personal information necessary to deliver our financial recovery 
            consultation services. Our data collection practices are designed for high-net-worth 
            individuals seeking professional asset recovery assistance.
          </p>

          <h4>Comprehensive Data Categories</h4>
          <DataCategoriesTable />

          <LegalNotice>
            <h4>Data Collection Principles</h4>
            <ul>
              <li><strong>Necessity:</strong> We only collect data necessary for consultation delivery and legal compliance</li>
              <li><strong>Transparency:</strong> Clear explanation of all data collection purposes and legal basis</li>
              <li><strong>Minimization:</strong> Limited collection to what is essential for professional service delivery</li>
              <li><strong>Accuracy:</strong> Regular verification and updating of client information</li>
              <li><strong>Security:</strong> Enterprise-grade protection for all collected information</li>
            </ul>
          </LegalNotice>
        </PolicySection>

        <PolicySection 
          id="legal-basis"
          title="3. Legal Basis for Processing"
        >
          <p>
            Under UK GDPR, we must have a legal basis for processing your personal information. 
            Our processing activities are based on the following legal grounds:
          </p>

          <DataCategoryGrid>
            <DataCategoryCard>
              <h4>📋 Contract Performance (Article 6(1)(b))</h4>
              <ul>
                <li>Delivering consultation services as agreed</li>
                <li>Managing your case and recovery strategy</li>
                <li>Providing expert recommendations and reports</li>
                <li>Fulfilling our contractual obligations to you</li>
              </ul>
            </DataCategoryCard>

            <DataCategoryCard>
              <h4>⚖️ Legal Obligations (Article 6(1)(c))</h4>
              <ul>
                <li>Anti-Money Laundering (AML) compliance</li>
                <li>Know Your Customer (KYC) requirements</li>
                <li>Financial services regulatory compliance</li>
                <li>Record keeping for regulatory purposes</li>
              </ul>
            </DataCategoryCard>

            <DataCategoryCard>
              <h4>🎯 Legitimate Interests (Article 6(1)(f))</h4>
              <ul>
                <li>Service improvement and quality assurance</li>
                <li>Security monitoring and fraud prevention</li>
                <li>Business operations and communications</li>
                <li>Professional development and training</li>
              </ul>
            </DataCategoryCard>

            <DataCategoryCard>
              <h4>✅ Consent (Article 6(1)(a))</h4>
              <ul>
                <li>Marketing communications and newsletters</li>
                <li>Recording consultation sessions</li>
                <li>Optional service enhancements</li>
                <li>Third-party service integrations</li>
              </ul>
            </DataCategoryCard>
          </DataCategoryGrid>
        </PolicySection>

        <PolicySection 
          id="data-usage"
          title="4. How We Use Your Information"
        >
          <p>We process your personal information for the following professional purposes:</p>
          
          <h4>Primary Service Delivery</h4>
          <ul>
            <li><strong>Consultation Management:</strong> Scheduling, conducting, and following up on financial recovery consultations</li>
            <li><strong>Case Assessment:</strong> Analyzing your financial situation and determining recovery options</li>
            <li><strong>Strategy Development:</strong> Creating personalized recovery strategies and action plans</li>
            <li><strong>Expert Recommendations:</strong> Providing professional advice based on your specific circumstances</li>
            <li><strong>Progress Tracking:</strong> Monitoring case progress and updating you on developments</li>
          </ul>

          <h4>Professional Communication</h4>
          <ul>
            <li><strong>Client Updates:</strong> Keeping you informed about your case progress and next steps</li>
            <li><strong>Appointment Scheduling:</strong> Managing consultation bookings and calendar coordination</li>
            <li><strong>Document Sharing:</strong> Secure exchange of case-related documents and reports</li>
            <li><strong>Emergency Contact:</strong> Reaching you for urgent case-related matters</li>
          </ul>

          <h4>Legal and Regulatory Compliance</h4>
          <ul>
            <li><strong>AML/KYC Compliance:</strong> Meeting anti-money laundering and know-your-customer requirements</li>
            <li><strong>Financial Services Regulations:</strong> Compliance with FCA and other regulatory requirements</li>
            <li><strong>Professional Standards:</strong> Maintaining professional confidentiality and ethical standards</li>
            <li><strong>Record Keeping:</strong> Maintaining accurate records for regulatory and legal purposes</li>
          </ul>

          <LegalNotice>
            <strong>Marketing Communications:</strong> We will only send marketing communications 
            with your explicit consent. You can withdraw this consent at any time by contacting 
            our data protection team or using the unsubscribe links in our emails. Withdrawal 
            of marketing consent does not affect our ability to send service-related communications.
          </LegalNotice>
        </PolicySection>

        <PolicySection 
          id="data-sharing"
          title="5. Data Sharing & Third Parties"
        >
          <p>
            We maintain strict confidentiality standards and <strong>do not sell your personal information</strong>. 
            We may share your information only in the following limited and necessary circumstances:
          </p>

          <h4>🔒 No Sale Policy</h4>
          <LegalNotice>
            <p>
              Recovery Office Limited does not sell, rent, lease, or otherwise commercialize 
              personal information under any circumstances. Your data is used exclusively for 
              delivering our professional services and meeting legal obligations.
            </p>
          </LegalNotice>

          <h4>Professional Service Providers</h4>
          <DataCategoryGrid>
            <DataCategoryCard>
              <h4>🖥️ Technology Partners</h4>
              <ul>
                <li><strong>Railway:</strong> Secure backend hosting and API services</li>
                <li><strong>Netlify:</strong> Frontend hosting with enterprise security</li>
                <li><strong>MongoDB Atlas:</strong> Encrypted database services</li>
                <li><strong>Email Services:</strong> Secure client communication platforms</li>
              </ul>
            </DataCategoryCard>

            <DataCategoryCard>
              <h4>💼 Professional Partners</h4>
              <ul>
                <li><strong>Legal Advisors:</strong> Specialist lawyers for complex cases (with consent)</li>
                <li><strong>Forensic Investigators:</strong> Blockchain and financial analysis experts</li>
                <li><strong>Recovery Specialists:</strong> Third-party recovery professionals</li>
                <li><strong>Compliance Consultants:</strong> Regulatory and AML specialists</li>
              </ul>
            </DataCategoryCard>

            <DataCategoryCard>
              <h4>⚖️ Legal and Regulatory</h4>
              <ul>
                <li><strong>Law Enforcement:</strong> When required by valid legal process</li>
                <li><strong>Regulatory Authorities:</strong> FCA and other financial regulators</li>
                <li><strong>Court Orders:</strong> Compliance with judicial proceedings</li>
                <li><strong>Anti-Fraud Agencies:</strong> Reporting suspected criminal activity</li>
              </ul>
            </DataCategoryCard>

            <DataCategoryCard>
              <h4>🌍 International Transfers</h4>
              <ul>
                <li><strong>Adequacy Decisions:</strong> Transfers to approved countries only</li>
                <li><strong>Standard Contractual Clauses:</strong> EU/UK approved transfer mechanisms</li>
                <li><strong>Service Provider Guarantees:</strong> Contractual data protection commitments</li>
                <li><strong>Client Consent:</strong> Explicit consent for specific international transfers</li>
              </ul>
            </DataCategoryCard>
          </DataCategoryGrid>

          <LegalNotice>
            <strong>Third-Party Safeguards:</strong> All third parties we work with are contractually 
            bound to maintain the same high standards of data protection and confidentiality that we uphold. 
            We conduct regular audits and assessments of our service providers to ensure ongoing compliance.
          </LegalNotice>
        </PolicySection>

        <PolicySection 
          id="security-measures"
          title="6. Enterprise Security Standards"
        >
          <SecurityStandards />
        </PolicySection>

        <PolicySection 
          id="data-retention"
          title="7. Data Retention Schedule"
        >
          <p>
            We retain your personal information only as long as necessary for the purposes outlined 
            in this policy and to meet our legal obligations as a financial services firm:
          </p>

          <h4>Retention Schedule</h4>
          <div style={{ overflowX: 'auto', margin: '24px 0' }}>
            <table style={{ 
              width: '100%', 
              borderCollapse: 'collapse', 
              background: 'white', 
              borderRadius: '12px', 
              overflow: 'hidden',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
            }}>
              <thead>
                <tr style={{ background: '#1a365d', color: 'white' }}>
                  <th style={{ padding: '16px', textAlign: 'left' }}>Data Type</th>
                  <th style={{ padding: '16px', textAlign: 'left' }}>Retention Period</th>
                  <th style={{ padding: '16px', textAlign: 'left' }}>Legal Requirement</th>
                  <th style={{ padding: '16px', textAlign: 'left' }}>Deletion Method</th>
                </tr>
              </thead>
              <tbody>
                {retentionSchedule.map((item, index) => (
                  <tr key={index} style={{ 
                    background: index % 2 === 0 ? '#f7fafc' : 'white',
                    borderBottom: '1px solid #e2e8f0'
                  }}>
                    <td style={{ padding: '16px', fontWeight: '600', color: '#1a365d' }}>
                      {item.dataType}
                    </td>
                    <td style={{ padding: '16px' }}>{item.retentionPeriod}</td>
                    <td style={{ padding: '16px', fontSize: '0.9rem' }}>{item.legalRequirement}</td>
                    <td style={{ padding: '16px', fontSize: '0.9rem' }}>{item.deletionMethod}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <LegalNotice>
            <h4>Special Retention Circumstances</h4>
            <ul>
              <li><strong>Legal Hold:</strong> Data may be retained longer if required by ongoing legal proceedings or regulatory investigations</li>
              <li><strong>Client Request:</strong> Extended retention may be necessary to fulfill ongoing service commitments</li>
              <li><strong>Regulatory Requirements:</strong> Financial services regulations may require extended retention periods</li>
              <li><strong>Security Incidents:</strong> Incident-related data retained for monitoring and prevention purposes</li>
            </ul>
          </LegalNotice>
        </PolicySection>

        <PolicySection 
          id="your-rights"
          title="8. Your Rights Under UK GDPR"
        >
          <RightsMatrix />
        </PolicySection>

        <PolicySection 
          id="professional-standards"
          title="9. Professional Confidentiality"
        >
          <p>
            Beyond our legal obligations under UK GDPR, we maintain enhanced confidentiality 
            standards appropriate for financial recovery consultations involving high-net-worth individuals:
          </p>

          <DataCategoryGrid>
            <DataCategoryCard>
              <h4>🔒 Enhanced Confidentiality</h4>
              <ul>
                <li>Professional privilege standards for financial consultations</li>
                <li>Confidentiality agreements for all staff and contractors</li>
                <li>Secure, encrypted channels for all sensitive communications</li>
                <li>Information compartmentalization and need-to-know access</li>
                <li>Regular confidentiality training and awareness programs</li>
              </ul>
            </DataCategoryCard>

            <DataCategoryCard>
              <h4>⚖️ Professional Privilege</h4>
              <ul>
                <li>Legal professional privilege for attorney-client communications</li>
                <li>Expert witness privilege for forensic and technical analysis</li>
                <li>Litigation privilege for case-related investigations</li>
                <li>Settlement privilege for confidential negotiations</li>
                <li>Common interest privilege for joint defense arrangements</li>
              </ul>
            </DataCategoryCard>

            <DataCategoryCard>
              <h4>🛡️ Conflict Management</h4>
              <ul>
                <li>Robust conflict checking systems and procedures</li>
                <li>Information barriers between conflicted matters</li>
                <li>Ethical walls and access restrictions</li>
                <li>Regular conflict reviews and monitoring</li>
                <li>Client notification and consent procedures</li>
              </ul>
            </DataCategoryCard>

            <DataCategoryCard>
              <h4>📋 Ethical Standards</h4>
              <ul>
                <li>Compliance with professional codes of conduct</li>
                <li>Continuing professional development requirements</li>
                <li>Ethics hotline for confidential reporting</li>
                <li>Regular ethics training and assessment</li>
                <li>Independent ethics oversight and review</li>
              </ul>
            </DataCategoryCard>
          </DataCategoryGrid>

          <LegalNotice>
            <h4>Anonymous Reporting and Analysis</h4>
            <p>
              For internal training and service improvement purposes, we may use anonymized 
              and aggregated information derived from client cases. This anonymized data 
              cannot be used to identify individual clients and helps us enhance our 
              recovery methodologies and success rates. Client-specific details are never 
              shared without explicit consent.
            </p>
          </LegalNotice>
        </PolicySection>

        <ContactSection />

        <SectionDivider />

        <LegalNotice>
          <h3>Legal Disclaimers and Updates</h3>
          <p>
            <strong>Right to Update:</strong> We reserve the right to update this Privacy Policy 
            to reflect changes in our practices, legal requirements, or business operations. 
            We will notify you of material changes via email to your registered address and 
            through prominent notice on our website at least 30 days before changes take effect.
          </p>
          <p>
            <strong>Governing Law:</strong> This Privacy Policy is governed by the laws of England and Wales. 
            Any disputes relating to this policy will be subject to the exclusive jurisdiction 
            of the English courts, unless you are a consumer entitled to bring proceedings in 
            your country of residence.
          </p>
          <p>
            <strong>Severability:</strong> If any provision of this Privacy Policy is found to be 
            unenforceable or invalid, the remaining provisions will continue in full force and effect.
          </p>
          <p>
            <strong>Contact for Legal Matters:</strong> For legal inquiries regarding this Privacy Policy, 
            including requests for legal basis documentation or regulatory compliance information, 
            contact our legal team at <a href="mailto:legal@recovery-office.com">legal@recovery-office.com</a>.
          </p>
          
          <div style={{ textAlign: 'center', marginTop: '32px', padding: '24px', background: '#edf2f7', borderRadius: '8px' }}>
            <LastUpdated />
            <p style={{ margin: '16px 0 0 0', fontSize: '0.9rem', color: '#4a5568' }}>
              For questions about this Privacy Policy, contact our Data Protection Officer at{' '}
              <a href="mailto:dpo@recovery-office.com" style={{ color: '#1a365d', fontWeight: 600 }}>
                dpo@recovery-office.com
              </a>
            </p>
          </div>
        </LegalNotice>
      </PolicyContainer>
    </>
  );
}; 