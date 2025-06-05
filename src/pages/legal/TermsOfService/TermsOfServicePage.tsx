import React from 'react';
import { Helmet } from 'react-helmet-async';
import { TermsSection } from './components/TermsSection';
import { ServiceLevelsTable } from './components/ServiceLevelsTable';
import { PaymentTermsGrid } from './components/PaymentTermsGrid';
import { LiabilityMatrix } from './components/LiabilityMatrix';
import { ContactSection } from './components/ContactSection';
import {
  TermsContainer,
  TermsHeader,
  TermsTitle,
  TermsSubtitle,
  TableOfContents,
  TOCLink,
  SectionDivider,
  ImportantNotice,
  LegalHighlight,
  LastUpdated,
  ServiceDefinitionCard,
  ServiceDefinitionGrid
} from './styles/TermsOfServiceStyles';

export const TermsOfServicePage: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Helmet>
        <title>Terms of Service | Recovery Office - Asset Recovery Consultancy</title>
        <meta 
          name="description" 
          content="Professional terms and conditions for Recovery Office financial asset recovery consultation services. UK-based premium consultancy serving high-value cases." 
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://recovery-office-online.netlify.app/terms-of-service" />
      </Helmet>

      <TermsContainer>
        <TermsHeader>
          <TermsTitle>Terms of Service</TermsTitle>
          <TermsSubtitle>
            Professional Asset Recovery Consultation Agreement
          </TermsSubtitle>
          <LastUpdated>
            <strong>Effective Date:</strong> 15 January 2024 | <strong>Version:</strong> 2.1
          </LastUpdated>
          <ImportantNotice>
            <h4>⚖️ Legal Agreement</h4>
            <p>
              By booking our services, you agree to these terms. Please read carefully. 
              These terms constitute a legally binding agreement between you and Recovery Office Limited.
            </p>
          </ImportantNotice>
        </TermsHeader>

        <TableOfContents>
          <h3>Table of Contents</h3>
          <TOCLink onClick={() => scrollToSection('service-provider')}>
            1. Service Provider Information
          </TOCLink>
          <TOCLink onClick={() => scrollToSection('service-definitions')}>
            2. Service Definitions
          </TOCLink>
          <TOCLink onClick={() => scrollToSection('booking-payment')}>
            3. Booking and Payment Terms
          </TOCLink>
          <TOCLink onClick={() => scrollToSection('service-levels')}>
            4. Service Level Commitments
          </TOCLink>
          <TOCLink onClick={() => scrollToSection('professional-standards')}>
            5. Professional Standards and Limitations
          </TOCLink>
          <TOCLink onClick={() => scrollToSection('limitation-liability')}>
            6. Limitation of Liability
          </TOCLink>
          <TOCLink onClick={() => scrollToSection('intellectual-property')}>
            7. Intellectual Property
          </TOCLink>
          <TOCLink onClick={() => scrollToSection('data-protection')}>
            8. Data Protection and Privacy
          </TOCLink>
          <TOCLink onClick={() => scrollToSection('technology-terms')}>
            9. Technology and System Terms
          </TOCLink>
          <TOCLink onClick={() => scrollToSection('termination')}>
            10. Termination Clauses
          </TOCLink>
          <TOCLink onClick={() => scrollToSection('dispute-resolution')}>
            11. Dispute Resolution
          </TOCLink>
          <TOCLink onClick={() => scrollToSection('regulatory-compliance')}>
            12. Regulatory Compliance
          </TOCLink>
          <TOCLink onClick={() => scrollToSection('contact-legal')}>
            13. Legal Contact Information
          </TOCLink>
        </TableOfContents>

        <SectionDivider />

        <TermsSection 
          id="service-provider"
          title="1. Service Provider Information"
        >
          <LegalHighlight>
            <h4>Company Details</h4>
            <ul>
              <li><strong>Company Name:</strong> Recovery Office Limited</li>
              <li><strong>Business Type:</strong> Financial Asset Recovery Consultancy</li>
              <li><strong>Registration:</strong> Companies House Registration [NUMBER]</li>
              <li><strong>Registered Address:</strong> [Professional address for legal notices]</li>
              <li><strong>Legal Contact:</strong> legal@recovery-office.com</li>
              <li><strong>Phone:</strong> +44 (0) 20 XXXX XXXX</li>
              <li><strong>FCA Alignment:</strong> Operating in accordance with FCA principles for financial services</li>
            </ul>
          </LegalHighlight>

          <p>
            Recovery Office Limited provides specialist financial asset recovery consultation services 
            to high-net-worth individuals and organizations. We operate under UK law and maintain 
            professional standards aligned with financial services best practices.
          </p>

          <ImportantNotice>
            <h4>Regulatory Status</h4>
            <p>
              Recovery Office Limited is a consultancy firm operating in accordance with Financial 
              Conduct Authority (FCA) principles. We provide consultation services only and are not 
              a regulated financial advisor or legal representative.
            </p>
          </ImportantNotice>
        </TermsSection>

        <TermsSection 
          id="service-definitions"
          title="2. Service Definitions"
        >
          <p>
            Our consultation services are designed for clients who have experienced significant 
            financial losses (typically £100,000+) and require expert guidance on recovery options.
          </p>

          <ServiceDefinitionGrid>
            <ServiceDefinitionCard>
              <h4>Initial Consultation</h4>
              <div className="service-details">
                <p><strong>Duration:</strong> 90-120 minutes via secure video conference</p>
                <p><strong>Deliverables:</strong> Written assessment report and recommended action plan</p>
                <p><strong>Fee:</strong> £2,500 (exclusive of VAT)</p>
              </div>
              <div className="service-description">
                Comprehensive case assessment including loss analysis, recovery strategy development, 
                and recommended next steps with specialist partner introductions where appropriate.
              </div>
            </ServiceDefinitionCard>

            <ServiceDefinitionCard>
              <h4>Extended Investigation Service</h4>
              <div className="service-details">
                <p><strong>Duration:</strong> 2-4 weeks depending on complexity</p>
                <p><strong>Deliverables:</strong> Detailed investigation report with evidence analysis</p>
                <p><strong>Fee:</strong> £7,500 - £25,000 (case dependent)</p>
              </div>
              <div className="service-description">
                In-depth investigation of loss circumstances, asset tracing, and comprehensive 
                recovery options assessment with detailed evidence compilation.
              </div>
            </ServiceDefinitionCard>

            <ServiceDefinitionCard>
              <h4>Strategic Recovery Implementation</h4>
              <div className="service-details">
                <p><strong>Duration:</strong> Variable based on case complexity</p>
                <p><strong>Deliverables:</strong> Regular progress reports and final outcome summary</p>
                <p><strong>Fee:</strong> Quoted per case (minimum £15,000)</p>
              </div>
              <div className="service-description">
                Coordinated recovery efforts with specialist partners, ongoing case management, 
                and strategic implementation of recommended recovery actions.
              </div>
            </ServiceDefinitionCard>

            <ServiceDefinitionCard>
              <h4>Expert Witness Services</h4>
              <div className="service-details">
                <p><strong>Duration:</strong> Per legal proceeding requirements</p>
                <p><strong>Deliverables:</strong> Expert reports and court testimony</p>
                <p><strong>Fee:</strong> £500/hour + preparation time</p>
              </div>
              <div className="service-description">
                Professional expert witness services for legal proceedings involving financial 
                asset recovery, providing technical expertise and court testimony.
              </div>
            </ServiceDefinitionCard>
          </ServiceDefinitionGrid>
        </TermsSection>

        <TermsSection 
          id="booking-payment"
          title="3. Booking and Payment Terms"
        >
          <PaymentTermsGrid />

          <h4>Refund Policy</h4>
          <ul>
            <li><strong>Cancellation 24+ hours:</strong> Full refund minus 5% processing fee</li>
            <li><strong>Cancellation 12-24 hours:</strong> 50% refund available</li>
            <li><strong>No-show or same-day cancellation:</strong> No refund available</li>
            <li><strong>Force majeure:</strong> Full refund for circumstances beyond reasonable control</li>
          </ul>

          <ImportantNotice>
            <h4>Payment Security</h4>
            <p>
              All payments are processed through secure, encrypted channels. We accept bank transfers, 
              corporate credit cards, and escrow services for high-value engagements. Payment in GBP 
              is preferred; other currencies available by arrangement with applicable exchange rate charges.
            </p>
          </ImportantNotice>
        </TermsSection>

        <TermsSection 
          id="service-levels"
          title="4. Service Level Commitments"
        >
          <p>
            We maintain high service standards with defined response times and quality commitments:
          </p>
          
          <ServiceLevelsTable />

          <LegalHighlight>
            <h4>Service Level Guarantees</h4>
            <p>
              If we fail to meet our committed service levels, you may be entitled to a service credit 
              equivalent to 10% of fees paid for the affected service. Service credits are our sole 
              liability for service level failures.
            </p>
          </LegalHighlight>
        </TermsSection>

        <TermsSection 
          id="professional-standards"
          title="5. Professional Standards and Limitations"
        >
          <h4>Professional Standards</h4>
          <ul>
            <li><strong>Confidentiality:</strong> All client information maintained under strict professional confidentiality</li>
            <li><strong>Conflicts:</strong> Comprehensive conflict checking procedures implemented</li>
            <li><strong>Competence:</strong> Services provided by qualified financial recovery specialists</li>
            <li><strong>Independence:</strong> Independent advice free from third-party influence</li>
            <li><strong>Professional Development:</strong> Ongoing training and certification maintenance</li>
          </ul>

          <ImportantNotice>
            <h4>⚠️ Important Limitations</h4>
            <ul>
              <li><strong>Consultation Only:</strong> We provide consultation services, not legal representation</li>
              <li><strong>No Recovery Guarantees:</strong> Recovery outcomes cannot be guaranteed</li>
              <li><strong>Independent Verification:</strong> All recommendations subject to client's independent verification</li>
              <li><strong>External Factors:</strong> Recovery success dependent on multiple factors beyond our control</li>
              <li><strong>Regulatory Limitations:</strong> We cannot provide regulated financial advice</li>
            </ul>
          </ImportantNotice>

          <h4>Professional Qualifications</h4>
          <p>
            Our team holds relevant professional qualifications including certified fraud examiner (CFE), 
            chartered financial analyst (CFA), and specialized certifications in digital asset recovery 
            and financial investigation techniques.
          </p>
        </TermsSection>

        <TermsSection 
          id="limitation-liability"
          title="6. Limitation of Liability"
        >
          <LiabilityMatrix />

          <LegalHighlight>
            <h4>Professional Indemnity Insurance</h4>
            <p>
              We maintain professional indemnity insurance of £10 million with a leading UK insurer. 
              This insurance covers our professional services but does not guarantee recovery outcomes 
              or compensate for losses beyond our professional negligence.
            </p>
          </LegalHighlight>

          <ImportantNotice>
            <h4>Time Limitation for Claims</h4>
            <p>
              Any claims against Recovery Office Limited must be notified in writing within 12 months 
              of the consultation or service delivery. Claims not notified within this period are 
              time-barred and cannot be pursued.
            </p>
          </ImportantNotice>
        </TermsSection>

        <TermsSection 
          id="intellectual-property"
          title="7. Intellectual Property"
        >
          <h4>Client Rights</h4>
          <ul>
            <li><strong>Consultation Reports:</strong> Client owns rights to personalized consultation reports</li>
            <li><strong>Case Documentation:</strong> Client retains ownership of case-specific materials</li>
            <li><strong>Confidential Information:</strong> Client confidential information remains client property</li>
          </ul>

          <h4>Recovery Office Rights</h4>
          <ul>
            <li><strong>Proprietary Methodologies:</strong> We retain rights to our proprietary recovery methodologies</li>
            <li><strong>General Knowledge:</strong> Market knowledge and general expertise remain ours</li>
            <li><strong>System Technology:</strong> Our technology platforms and systems remain our property</li>
            <li><strong>Training Materials:</strong> Internal training and development materials are proprietary</li>
          </ul>

          <LegalHighlight>
            <h4>Use Restrictions</h4>
            <p>
              Clients may not reproduce, distribute, or commercialize our proprietary methodologies 
              without written consent. Client reports are for internal use only and may not be 
              used for commercial purposes without permission.
            </p>
          </LegalHighlight>
        </TermsSection>

        <TermsSection 
          id="data-protection"
          title="8. Data Protection and Privacy"
        >
          <p>
            Data protection is governed by our comprehensive Privacy Policy, which is incorporated 
            into these terms by reference. Key points include:
          </p>

          <ul>
            <li><strong>UK GDPR Compliance:</strong> Full compliance with UK data protection regulations</li>
            <li><strong>Retention Period:</strong> Client consultation data retained for 7 years per financial services regulations</li>
            <li><strong>Data Sharing:</strong> No data sharing without explicit consent except as legally required</li>
            <li><strong>Security Measures:</strong> Enterprise-grade security measures implemented</li>
            <li><strong>Client Rights:</strong> Full data subject rights under UK GDPR</li>
          </ul>

          <LegalHighlight>
            <h4>Financial Services Data Requirements</h4>
            <p>
              As a financial services consultancy, we are required to maintain certain records for 
              regulatory compliance. This may limit some data deletion rights during the mandatory 
              retention period.
            </p>
          </LegalHighlight>
        </TermsSection>

        <TermsSection 
          id="technology-terms"
          title="9. Technology and System Terms"
        >
          <h4>System Availability</h4>
          <ul>
            <li><strong>Uptime Target:</strong> 99.5% availability (excluding scheduled maintenance)</li>
            <li><strong>Support Hours:</strong> Monday-Friday 9:00-18:00 GMT</li>
            <li><strong>Maintenance Windows:</strong> Scheduled maintenance outside business hours with 48-hour notice</li>
          </ul>

          <h4>Technical Requirements</h4>
          <ul>
            <li><strong>Browser Requirements:</strong> Modern browser with video conferencing capability</li>
            <li><strong>Internet Connection:</strong> Stable broadband connection for video consultations</li>
            <li><strong>Security Software:</strong> Up-to-date antivirus and firewall protection</li>
          </ul>

          <h4>Data Backup and Recovery</h4>
          <ul>
            <li><strong>Backup Schedule:</strong> Daily automated backups with 30-day retention</li>
            <li><strong>Disaster Recovery:</strong> 99.9% data recovery capability</li>
            <li><strong>Business Continuity:</strong> Alternative service delivery methods available</li>
          </ul>
        </TermsSection>

        <TermsSection 
          id="termination"
          title="10. Termination Clauses"
        >
          <h4>Client Termination Rights</h4>
          <ul>
            <li>Client may terminate ongoing services at any time with 7 days written notice</li>
            <li>Single consultations cannot be terminated after delivery</li>
            <li>Prepaid fees for undelivered services will be refunded pro-rata</li>
          </ul>

          <h4>Recovery Office Termination Rights</h4>
          <ul>
            <li>We may terminate for breach of terms with 14 days notice and opportunity to cure</li>
            <li>Immediate termination for non-payment, illegal activity, or breach of confidentiality</li>
            <li>We reserve the right to refuse service for conflicts of interest</li>
          </ul>

          <h4>Effect of Termination</h4>
          <ul>
            <li><strong>Service Cessation:</strong> Immediate cessation of ongoing services</li>
            <li><strong>Final Invoice:</strong> Final invoice issued within 14 days</li>
            <li><strong>Data Handling:</strong> Data retention per privacy policy</li>
            <li><strong>Material Return:</strong> Return of client confidential materials within 30 days</li>
          </ul>

          <LegalHighlight>
            <h4>Survival of Terms</h4>
            <p>
              The following sections survive termination: Confidentiality obligations, 
              Limitation of liability, Intellectual property rights, and Dispute resolution procedures.
            </p>
          </LegalHighlight>
        </TermsSection>

        <TermsSection 
          id="dispute-resolution"
          title="11. Dispute Resolution"
        >
          <h4>Step 1: Good Faith Negotiation</h4>
          <p>
            Any disputes must first be subject to good faith negotiation between the parties for 
            30 days following written notice of the dispute.
          </p>

          <h4>Step 2: Mediation</h4>
          <p>
            If negotiation fails, disputes will be referred to binding mediation through the 
            Centre for Effective Dispute Resolution (CEDR) in London.
          </p>

          <h4>Step 3: Arbitration</h4>
          <p>
            Final disputes that cannot be resolved through mediation will be settled by arbitration 
            under the London Court of International Arbitration (LCIA) rules.
          </p>

          <h4>Jurisdiction and Governing Law</h4>
          <p>
            These terms are governed by English law. The English courts retain jurisdiction for 
            enforcement of arbitration awards and interim relief.
          </p>

          <LegalHighlight>
            <h4>Cost Allocation</h4>
            <p>
              The unsuccessful party in any dispute resolution process bears the costs of mediation 
              or arbitration, including the other party's reasonable legal fees.
            </p>
          </LegalHighlight>
        </TermsSection>

        <TermsSection 
          id="regulatory-compliance"
          title="12. Regulatory Compliance"
        >
          <h4>Anti-Money Laundering (AML)</h4>
          <ul>
            <li>Full KYC (Know Your Customer) procedures implemented</li>
            <li>Source of funds verification for large engagements</li>
            <li>Ongoing monitoring for suspicious activity</li>
            <li>Compliance with UK Money Laundering Regulations</li>
          </ul>

          <h4>Data Protection Compliance</h4>
          <ul>
            <li>UK GDPR and Data Protection Act 2018 compliance</li>
            <li>Regular data protection impact assessments</li>
            <li>Staff training on data handling procedures</li>
            <li>Third-party processor compliance verification</li>
          </ul>

          <h4>Professional Standards</h4>
          <ul>
            <li>Adherence to relevant professional body standards</li>
            <li>Continuing professional development requirements</li>
            <li>Regular compliance audits and reviews</li>
            <li>Professional conduct monitoring</li>
          </ul>

          <h4>Insurance and Financial Protection</h4>
          <ul>
            <li>Professional indemnity insurance: £10 million</li>
            <li>Public liability insurance: £2 million</li>
            <li>Cyber liability insurance: £5 million</li>
            <li>Annual insurance review and renewal</li>
          </ul>
        </TermsSection>

        <ContactSection />

        <SectionDivider />

        <ImportantNotice>
          <h4>Terms Updates and Modifications</h4>
          <p>
            <strong>Right to Update:</strong> We reserve the right to update these terms to reflect 
            changes in our services, legal requirements, or business practices. Material changes 
            will be communicated with 30 days notice.
          </p>
          <p>
            <strong>Acceptance of Changes:</strong> Continued use of our services after notice 
            constitutes acceptance of updated terms. If you do not agree to changes, you may 
            terminate our services without penalty.
          </p>
          <p>
            <strong>Version Control:</strong> The current version and effective date are displayed 
            at the top of this page. Previous versions are available upon request.
          </p>
        </ImportantNotice>
      </TermsContainer>
    </>
  );
}; 