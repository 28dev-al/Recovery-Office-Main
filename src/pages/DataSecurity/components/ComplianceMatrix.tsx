import React from 'react';
import { SecurityFrameworkContainer, ComplianceTable, ComplianceHighlight, CertificationGrid, CertificationCard } from '../styles/DataSecurityStyles';

interface ComplianceStandard {
  standard: string;
  description: string;
  status: 'certified' | 'compliant' | 'in-progress';
  lastAudit: string;
  nextReview: string;
}

const complianceStandards: ComplianceStandard[] = [
  {
    standard: "ISO 27001:2013",
    description: "Information Security Management System",
    status: "certified",
    lastAudit: "November 2023",
    nextReview: "November 2024"
  },
  {
    standard: "ISO 27002:2022",
    description: "Information Security Controls",
    status: "compliant",
    lastAudit: "December 2023",
    nextReview: "June 2024"
  },
  {
    standard: "SOC 2 Type II",
    description: "Service Organization Control",
    status: "certified",
    lastAudit: "October 2023",
    nextReview: "October 2024"
  },
  {
    standard: "PCI DSS",
    description: "Payment Card Industry Data Security",
    status: "compliant",
    lastAudit: "January 2024",
    nextReview: "January 2025"
  },
  {
    standard: "NIST Cybersecurity Framework",
    description: "Comprehensive cybersecurity guidelines",
    status: "compliant",
    lastAudit: "December 2023",
    nextReview: "June 2024"
  },
  {
    standard: "ISO 22301:2019",
    description: "Business Continuity Management",
    status: "in-progress",
    lastAudit: "N/A",
    nextReview: "March 2024"
  }
];

export const ComplianceMatrix: React.FC = () => {
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'certified':
        return 'status-certified';
      case 'compliant':
        return 'status-compliant';
      case 'in-progress':
        return 'status-in-progress';
      default:
        return '';
    }
  };

  const getStatusDisplay = (status: string) => {
    switch (status) {
      case 'certified':
        return '✅ Certified';
      case 'compliant':
        return '✓ Compliant';
      case 'in-progress':
        return '🔄 In Progress';
      default:
        return status;
    }
  };

  return (
    <SecurityFrameworkContainer id="security-standards">
      <h2>2. International Security Standards</h2>
      
      <ComplianceHighlight>
        <h4>Multi-Framework Compliance Approach</h4>
        <p>
          We maintain compliance with multiple international security frameworks to ensure 
          comprehensive protection that meets global best practices for financial services 
          and high-value consultancy operations.
        </p>
      </ComplianceHighlight>

      <h3>Current Certification & Compliance Status</h3>
      <ComplianceTable>
        <thead>
          <tr>
            <th>Standard</th>
            <th>Description</th>
            <th>Status</th>
            <th>Last Audit</th>
            <th>Next Review</th>
          </tr>
        </thead>
        <tbody>
          {complianceStandards.map((standard, index) => (
            <tr key={index}>
              <td className="standard-name">{standard.standard}</td>
              <td>{standard.description}</td>
              <td className={`compliance-status ${getStatusClass(standard.status)}`}>
                {getStatusDisplay(standard.status)}
              </td>
              <td>{standard.lastAudit}</td>
              <td>{standard.nextReview}</td>
            </tr>
          ))}
        </tbody>
      </ComplianceTable>

      <h3>Security Framework Implementation</h3>
      <CertificationGrid>
        <CertificationCard>
          <h4>🔒 ISO 27001 ISMS</h4>
          <ul>
            <li>Risk assessment and treatment</li>
            <li>Security policy framework</li>
            <li>Incident management procedures</li>
            <li>Continuous improvement process</li>
            <li>Management review and audit</li>
          </ul>
        </CertificationCard>

        <CertificationCard>
          <h4>🛡️ SOC 2 Controls</h4>
          <ul>
            <li>Security controls effectiveness</li>
            <li>Availability and processing integrity</li>
            <li>Confidentiality protection measures</li>
            <li>Privacy controls implementation</li>
            <li>Third-party audit verification</li>
          </ul>
        </CertificationCard>

        <CertificationCard>
          <h4>💳 PCI DSS Compliance</h4>
          <ul>
            <li>Secure payment processing</li>
            <li>Cardholder data protection</li>
            <li>Network security measures</li>
            <li>Regular security testing</li>
            <li>Information security policies</li>
          </ul>
        </CertificationCard>

        <CertificationCard>
          <h4>🏛️ NIST Framework</h4>
          <ul>
            <li>Identify: Asset and risk management</li>
            <li>Protect: Access controls and training</li>
            <li>Detect: Monitoring and anomaly detection</li>
            <li>Respond: Incident response planning</li>
            <li>Recover: Business continuity procedures</li>
          </ul>
        </CertificationCard>
      </CertificationGrid>

      <ComplianceHighlight>
        <h4>Continuous Compliance Monitoring</h4>
        <p>
          Our compliance team conducts quarterly self-assessments and annual third-party audits 
          to ensure ongoing adherence to all security standards. Any gaps or recommendations 
          are addressed within 30 days with full documentation and verification.
        </p>
      </ComplianceHighlight>
    </SecurityFrameworkContainer>
  );
}; 