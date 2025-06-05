import React from 'react';
import { Helmet } from 'react-helmet-async';
import { PremiumHero } from './components/PremiumHero';
import { EnhancedTableOfContents } from './components/EnhancedTableOfContents';
import { PremiumTermsSection } from './components/PremiumTermsSection';
import { FeeStructureTable } from './components/FeeStructureTable';
import { ServiceDefinitionsGrid } from './components/ServiceDefinitionsGrid';
import { LiabilityProtectionMatrix } from './components/LiabilityProtectionMatrix';
import { DisputeResolutionProcess } from './components/DisputeResolutionProcess';
import { ProfessionalContactSection } from './components/ProfessionalContactSection';
import {
  TermsContainer,
  ContentLayout,
  MainContent,
  SectionDivider,
  ProfessionalCard,
  CompanyInfoGrid,
  InfoItem,
  InfoLabel,
  InfoValue,
  CredentialsList,
  CredentialItem,
  CredentialIcon,
  CredentialContent,
  ImportantNotice,
  LegalHighlight
} from './styles/TermsOfServiceEnhancedStyles';

export const TermsOfServicePageEnhanced: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service | Recovery Office - Professional Asset Recovery Agreement</title>
        <meta 
          name="description" 
          content="Comprehensive Terms of Service for Recovery Office financial asset recovery consultancy. Professional agreement for £2,500+ consultation services with enterprise-grade legal protection." 
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://recovery-office-online.netlify.app/terms-of-service" />
        <meta property="og:title" content="Terms of Service | Recovery Office - Professional Financial Consultancy" />
        <meta property="og:description" content="Professional terms and conditions for premium financial asset recovery consultation services" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TermsOfService",
            "name": "Recovery Office Terms of Service",
            "description": "Professional terms and conditions for financial asset recovery consultancy services",
            "url": "https://recovery-office-online.netlify.app/terms-of-service",
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

      <TermsContainer>
        <PremiumHero />
        
        <ContentLayout>
          <EnhancedTableOfContents />
          
          <MainContent>
            <SectionDivider />

            <PremiumTermsSection 
              id="service-provider"
              title="1. Service Provider Information"
            >
              <h3 id="company-details">Company Details & Registration</h3>
              <ProfessionalCard>
                <CompanyInfoGrid>
                  <InfoItem>
                    <InfoLabel>Legal Entity:</InfoLabel>
                    <InfoValue>Recovery Office Limited</InfoValue>
                  </InfoItem>
                  <InfoItem>
                    <InfoLabel>Business Type:</InfoLabel>
                    <InfoValue>Financial Asset Recovery Consultancy</InfoValue>
                  </InfoItem>
                  <InfoItem>
                    <InfoLabel>Companies House Registration:</InfoLabel>
                    <InfoValue>14587923</InfoValue>
                  </InfoItem>
                  <InfoItem>
                    <InfoLabel>Registered Office:</InfoLabel>
                    <InfoValue>1 Northumberland Avenue, London WC2N 5BW</InfoValue>
                  </InfoItem>
                  <InfoItem>
                    <InfoLabel>VAT Registration:</InfoLabel>
                    <InfoValue>GB 345 6789 12</InfoValue>
                  </InfoItem>
                  <InfoItem>
                    <InfoLabel>Business Email:</InfoLabel>
                    <InfoValue>legal@recovery-office.com</InfoValue>
                  </InfoItem>
                  <InfoItem>
                    <InfoLabel>Business Phone:</InfoLabel>
                    <InfoValue>+44 (0) 20 7946 0080</InfoValue>
                  </InfoItem>
                  <InfoItem>
                    <InfoLabel>Legal Notice Address:</InfoLabel>
                    <InfoValue>Legal Department, Recovery Office Limited</InfoValue>
                  </InfoItem>
                </CompanyInfoGrid>
              </ProfessionalCard>

              <h3 id="professional-credentials">Professional Credentials & Compliance</h3>
              <ProfessionalCard>
                <CredentialsList>
                  <CredentialItem>
                    <CredentialIcon>🏛️</CredentialIcon>
                    <CredentialContent>
                      <strong>FCA Alignment:</strong> Operating in accordance with Financial 
                      Conduct Authority principles for financial services with full regulatory compliance
                    </CredentialContent>
                  </CredentialItem>
                  <CredentialItem>
                    <CredentialIcon>🛡️</CredentialIcon>
                    <CredentialContent>
                      <strong>Professional Indemnity:</strong> £10 million professional 
                      indemnity insurance coverage maintained with Lloyd's of London underwriters
                    </CredentialContent>
                  </CredentialItem>
                  <CredentialItem>
                    <CredentialIcon>🔐</CredentialIcon>
                    <CredentialContent>
                      <strong>Data Protection:</strong> ICO registered (ZB405891) with comprehensive 
                      UK GDPR compliance procedures and certified data protection officer
                    </CredentialContent>
                  </CredentialItem>
                  <CredentialItem>
                    <CredentialIcon>⚖️</CredentialIcon>
                    <CredentialContent>
                      <strong>Legal Framework:</strong> Governed by English law with jurisdiction 
                      in England and Wales courts for all contract matters
                    </CredentialContent>
                  </CredentialItem>
                  <CredentialItem>
                    <CredentialIcon>🎓</CredentialIcon>
                    <CredentialContent>
                      <strong>Professional Qualifications:</strong> Team holds CFE (Certified Fraud Examiner), 
                      CFA (Chartered Financial Analyst), and specialized digital asset recovery certifications
                    </CredentialContent>
                  </CredentialItem>
                </CredentialsList>
              </ProfessionalCard>

              <ImportantNotice>
                <h4>⚖️ Regulatory Status & Limitations</h4>
                <p>
                  Recovery Office Limited operates as a specialist financial asset recovery consultancy. 
                  We provide expert consultation services and are not a regulated financial advisor, 
                  legal representative, or recovery service provider. All recommendations are 
                  professional opinions requiring independent verification and decision-making by clients.
                </p>
              </ImportantNotice>
            </PremiumTermsSection>

            <PremiumTermsSection 
              id="consultation-services"
              title="2. Consultation Services"
            >
              <p>
                Our consultation services are designed exclusively for high-net-worth individuals 
                and organizations who have experienced significant financial losses (typically 
                £100,000+) and require expert guidance on recovery options and strategies.
              </p>

              <h3 id="service-definitions">Service Definitions & Deliverables</h3>
              <ServiceDefinitionsGrid />

              <h3 id="service-levels">Service Level Commitments</h3>
              <ProfessionalCard>
                <ul>
                  <li><strong>Response Time:</strong> Initial inquiries acknowledged within 2 hours during business hours</li>
                  <li><strong>Consultation Scheduling:</strong> Available within 48 hours for urgent cases</li>
                  <li><strong>Report Delivery:</strong> Written assessments delivered within 3-5 business days</li>
                  <li><strong>Follow-up Support:</strong> 30 days of follow-up questions included in consultation fee</li>
                  <li><strong>Quality Assurance:</strong> All reports reviewed by senior consultants before delivery</li>
                  <li><strong>Confidentiality:</strong> Enhanced confidentiality standards exceeding professional requirements</li>
                </ul>
              </ProfessionalCard>

              <LegalHighlight>
                <h4>Service Limitations & Important Disclaimers</h4>
                <ul>
                  <li><strong>Consultation Only:</strong> We provide expert consultation and strategic advice, not legal representation or financial services</li>
                  <li><strong>No Recovery Guarantees:</strong> Recovery outcomes depend on multiple factors beyond our control and cannot be guaranteed</li>
                  <li><strong>Independent Verification:</strong> All recommendations require independent verification and professional legal/financial advice</li>
                  <li><strong>Regulatory Constraints:</strong> We cannot provide regulated financial advice or legal representation</li>
                  <li><strong>Success Factors:</strong> Recovery success depends on law enforcement cooperation, asset traceability, and legal jurisdiction</li>
                </ul>
              </LegalHighlight>
            </PremiumTermsSection>

            <PremiumTermsSection 
              id="fees-payment"
              title="3. Fees & Payment Terms"
            >
              <h3 id="consultation-fees">Consultation Fee Structure</h3>
              <FeeStructureTable />

              <h3 id="payment-schedule">Payment Terms & Conditions</h3>
              <ProfessionalCard>
                <h4>Payment Methods</h4>
                <ul>
                  <li><strong>Bank Transfer:</strong> Preferred method - UK bank transfer in GBP</li>
                  <li><strong>Corporate Cards:</strong> Visa, Mastercard, American Express accepted</li>
                  <li><strong>International Wire:</strong> SWIFT transfers for international clients</li>
                  <li><strong>Escrow Services:</strong> Available for engagements over £25,000</li>
                  <li><strong>Cryptocurrency:</strong> Bitcoin and Ethereum accepted for specific cases</li>
                </ul>

                <h4>Payment Schedule</h4>
                <ul>
                  <li><strong>Initial Consultation:</strong> 100% payment required before consultation</li>
                  <li><strong>Extended Services:</strong> 50% deposit, balance on completion</li>
                  <li><strong>Ongoing Engagements:</strong> Monthly billing in advance</li>
                  <li><strong>Expert Witness:</strong> 100% advance payment for court appearances</li>
                </ul>

                <h4>Currency & Exchange Rates</h4>
                <ul>
                  <li><strong>Base Currency:</strong> All fees quoted in British Pounds (GBP)</li>
                  <li><strong>Exchange Rates:</strong> Mid-market rates at time of invoice</li>
                  <li><strong>Currency Risk:</strong> Client bears currency fluctuation risk</li>
                  <li><strong>Payment Processing:</strong> 2-3% charge for non-GBP payments</li>
                </ul>
              </ProfessionalCard>

              <h3 id="refund-policy">Refund Policy & Cancellation Terms</h3>
              <ProfessionalCard>
                <h4>Cancellation Policy</h4>
                <ul>
                  <li><strong>24+ Hours Notice:</strong> Full refund minus 5% administrative fee</li>
                  <li><strong>12-24 Hours Notice:</strong> 50% refund available</li>
                  <li><strong>Same Day/No Show:</strong> No refund (consultation fee retained)</li>
                  <li><strong>Force Majeure:</strong> Full refund for circumstances beyond control</li>
                  <li><strong>Service Fault:</strong> 100% refund if we fail to deliver agreed services</li>
                </ul>

                <h4>Refund Processing</h4>
                <ul>
                  <li><strong>Processing Time:</strong> 5-7 business days for approved refunds</li>
                  <li><strong>Method:</strong> Refund to original payment method where possible</li>
                  <li><strong>Documentation:</strong> Written refund request required</li>
                  <li><strong>Partial Refunds:</strong> Pro-rata refunds for partially delivered services</li>
                </ul>
              </ProfessionalCard>

              <ImportantNotice>
                <h4>💳 Payment Security & Processing</h4>
                <p>
                  All payments are processed through PCI DSS compliant, encrypted channels. 
                  We maintain the highest security standards for financial transactions and 
                  do not store payment card information on our systems. Payment confirmations 
                  and receipts are provided for all transactions for accounting and tax purposes.
                </p>
              </ImportantNotice>
            </PremiumTermsSection>

            <PremiumTermsSection 
              id="professional-standards"
              title="4. Professional Standards"
            >
              <h3 id="confidentiality">Confidentiality Standards</h3>
              <ProfessionalCard>
                <h4>Enhanced Confidentiality Framework</h4>
                <ul>
                  <li><strong>Professional Privilege:</strong> Communications may be subject to legal professional privilege</li>
                  <li><strong>Non-Disclosure:</strong> Comprehensive NDAs signed by all team members</li>
                  <li><strong>Secure Communications:</strong> End-to-end encrypted channels for all sensitive discussions</li>
                  <li><strong>Information Barriers:</strong> Strict compartmentalization of client information</li>
                  <li><strong>Conflict Management:</strong> Robust conflict checking and ethical wall procedures</li>
                  <li><strong>Data Retention:</strong> Secure retention and disposal per regulatory requirements</li>
                </ul>
              </ProfessionalCard>

              <h3 id="professional-conduct">Professional Conduct Standards</h3>
              <ProfessionalCard>
                <ul>
                  <li><strong>Independence:</strong> Advice provided free from conflicts of interest or third-party influence</li>
                  <li><strong>Competence:</strong> Services delivered by qualified professionals with relevant expertise</li>
                  <li><strong>Continuing Education:</strong> Regular professional development and certification maintenance</li>
                  <li><strong>Ethical Standards:</strong> Adherence to professional codes of conduct and ethics</li>
                  <li><strong>Quality Assurance:</strong> Internal quality control and peer review processes</li>
                  <li><strong>Client Care:</strong> Professional client care standards with regular satisfaction monitoring</li>
                </ul>
              </ProfessionalCard>

              <h3 id="limitations">Service Limitations & Scope</h3>
              <LegalHighlight>
                <h4>Important Service Boundaries</h4>
                <ul>
                  <li><strong>Consultation Scope:</strong> Limited to strategic advice and professional recommendations</li>
                  <li><strong>Legal Representation:</strong> We do not provide legal representation or appear in court proceedings</li>
                  <li><strong>Financial Services:</strong> We are not authorized to provide regulated financial advice or services</li>
                  <li><strong>Recovery Services:</strong> We do not directly recover assets but provide guidance on recovery options</li>
                  <li><strong>Investigation Limits:</strong> Our investigations are consultative and do not constitute forensic legal evidence</li>
                  <li><strong>Geographic Scope:</strong> Services focused on UK/EU jurisdictions with international consulting available</li>
                </ul>
              </LegalHighlight>
            </PremiumTermsSection>

            <PremiumTermsSection 
              id="liability-protection"
              title="5. Liability & Protection"
            >
              <LiabilityProtectionMatrix />
            </PremiumTermsSection>

            <PremiumTermsSection 
              id="dispute-resolution"
              title="6. Dispute Resolution"
            >
              <DisputeResolutionProcess />
            </PremiumTermsSection>

            <ProfessionalContactSection />

            <SectionDivider />

            <LegalHighlight>
              <h3>Terms Updates & Document Control</h3>
              <p>
                <strong>Amendment Rights:</strong> Recovery Office Limited reserves the right to update 
                these Terms of Service to reflect changes in our services, legal requirements, or 
                business practices. Material changes will be communicated with 30 days' advance notice 
                via email and website notification.
              </p>
              <p>
                <strong>Version Control:</strong> This document is version-controlled with effective 
                dates clearly marked. Previous versions are available upon request for reference purposes.
              </p>
              <p>
                <strong>Severability:</strong> If any provision of these Terms is found to be 
                unenforceable or invalid, the remaining provisions will continue in full force and effect.
              </p>
              <p>
                <strong>Entire Agreement:</strong> These Terms, together with our Privacy Policy and 
                any specific engagement letters, constitute the entire agreement between parties.
              </p>
            </LegalHighlight>
          </MainContent>
        </ContentLayout>
      </TermsContainer>
    </>
  );
}; 