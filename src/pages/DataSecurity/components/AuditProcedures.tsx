import React from 'react';
import { SecurityFrameworkContainer, ComplianceHighlight, SecurityNotice, CertificationGrid, CertificationCard, ComplianceTable } from '../styles/DataSecurityStyles';

interface AuditSchedule {
  auditType: string;
  frequency: string;
  lastCompleted: string;
  nextScheduled: string;
  auditor: string;
}

const auditSchedule: AuditSchedule[] = [
  {
    auditType: "ISO 27001 Certification Audit",
    frequency: "Annual",
    lastCompleted: "November 2023",
    nextScheduled: "November 2024",
    auditor: "BSI Group (External)"
  },
  {
    auditType: "SOC 2 Type II Audit",
    frequency: "Annual",
    lastCompleted: "October 2023",
    nextScheduled: "October 2024",
    auditor: "KPMG (External)"
  },
  {
    auditType: "PCI DSS Assessment",
    frequency: "Annual",
    lastCompleted: "January 2024",
    nextScheduled: "January 2025",
    auditor: "Trustwave (External)"
  },
  {
    auditType: "Internal Security Audit",
    frequency: "Quarterly",
    lastCompleted: "December 2023",
    nextScheduled: "March 2024",
    auditor: "Internal Security Team"
  },
  {
    auditType: "Penetration Testing",
    frequency: "Bi-annual",
    lastCompleted: "September 2023",
    nextScheduled: "March 2024",
    auditor: "Rapid7 (External)"
  },
  {
    auditType: "Vulnerability Assessment",
    frequency: "Monthly",
    lastCompleted: "January 2024",
    nextScheduled: "February 2024",
    auditor: "Automated + Internal Review"
  }
];

export const AuditProcedures: React.FC = () => {
  return (
    <SecurityFrameworkContainer id="audit-compliance">
      <h2>10. Audit Procedures & Compliance Verification</h2>
      
      <ComplianceHighlight>
        <h4>Comprehensive Audit Framework</h4>
        <p>
          Our audit procedures combine internal assessments, external certifications, and 
          continuous monitoring to ensure ongoing compliance with all security standards 
          and regulatory requirements.
        </p>
      </ComplianceHighlight>

      <h3>Audit Schedule & Timeline</h3>
      <ComplianceTable>
        <thead>
          <tr>
            <th>Audit Type</th>
            <th>Frequency</th>
            <th>Last Completed</th>
            <th>Next Scheduled</th>
            <th>Auditor</th>
          </tr>
        </thead>
        <tbody>
          {auditSchedule.map((audit, index) => (
            <tr key={index}>
              <td className="standard-name">{audit.auditType}</td>
              <td>{audit.frequency}</td>
              <td>{audit.lastCompleted}</td>
              <td>{audit.nextScheduled}</td>
              <td>{audit.auditor}</td>
            </tr>
          ))}
        </tbody>
      </ComplianceTable>

      <h3>Internal Audit Procedures</h3>
      <ul>
        <li><strong>Risk Assessment Reviews:</strong> Quarterly comprehensive risk assessments with mitigation planning</li>
        <li><strong>Policy Compliance Checks:</strong> Monthly reviews of policy adherence across all departments</li>
        <li><strong>Access Control Audits:</strong> Bi-weekly reviews of user access rights and permissions</li>
        <li><strong>Incident Response Testing:</strong> Quarterly tabletop exercises and incident simulation</li>
        <li><strong>Security Awareness Assessment:</strong> Monthly phishing simulations and training effectiveness reviews</li>
      </ul>

      <h3>External Certification Audits</h3>
      <ul>
        <li><strong>ISO 27001 Surveillance:</strong> Annual third-party certification maintenance audits</li>
        <li><strong>SOC 2 Type II:</strong> Independent examination of security controls effectiveness</li>
        <li><strong>PCI DSS Assessment:</strong> Annual compliance validation by Qualified Security Assessor (QSA)</li>
        <li><strong>Penetration Testing:</strong> Bi-annual external security testing by certified ethical hackers</li>
      </ul>

      <CertificationGrid>
        <CertificationCard>
          <h4>📋 Internal Audits</h4>
          <ul>
            <li>Monthly compliance spot checks</li>
            <li>Quarterly comprehensive reviews</li>
            <li>Annual management system audits</li>
            <li>Continuous monitoring and alerting</li>
            <li>Real-time dashboard reporting</li>
          </ul>
        </CertificationCard>

        <CertificationCard>
          <h4>🔍 External Audits</h4>
          <ul>
            <li>Independent third-party assessments</li>
            <li>Certified auditor requirements</li>
            <li>Comprehensive scope coverage</li>
            <li>Detailed findings and recommendations</li>
            <li>Remediation tracking and validation</li>
          </ul>
        </CertificationCard>

        <CertificationCard>
          <h4>🔒 Security Testing</h4>
          <ul>
            <li>Penetration testing (bi-annual)</li>
            <li>Vulnerability assessments (monthly)</li>
            <li>Security code reviews</li>
            <li>Social engineering assessments</li>
            <li>Physical security evaluations</li>
          </ul>
        </CertificationCard>

        <CertificationCard>
          <h4>📊 Compliance Monitoring</h4>
          <ul>
            <li>Real-time compliance dashboards</li>
            <li>Automated policy enforcement</li>
            <li>Exception reporting and tracking</li>
            <li>Trend analysis and forecasting</li>
            <li>Management reporting and KPIs</li>
          </ul>
        </CertificationCard>
      </CertificationGrid>

      <h3>Audit Documentation & Records</h3>
      <ul>
        <li><strong>Audit Plans:</strong> Detailed scope, methodology, and timeline documentation</li>
        <li><strong>Evidence Collection:</strong> Systematic gathering and preservation of audit evidence</li>
        <li><strong>Findings Reports:</strong> Comprehensive documentation of all audit findings and observations</li>
        <li><strong>Remediation Plans:</strong> Detailed corrective action plans with timelines and ownership</li>
        <li><strong>Follow-up Verification:</strong> Validation of remediation effectiveness and closure</li>
      </ul>

      <SecurityNotice>
        <h4>Continuous Improvement Process</h4>
        <p>
          All audit findings are analyzed for systemic issues and root causes. Our continuous 
          improvement process ensures that lessons learned from audits are incorporated into 
          security policies, procedures, and training programs to prevent recurrence.
        </p>
      </SecurityNotice>

      <h3>Audit Results Transparency</h3>
      <ul>
        <li><strong>Client Communication:</strong> Summary reports available to clients upon request</li>
        <li><strong>Regulatory Reporting:</strong> Compliance status reporting to relevant authorities</li>
        <li><strong>Management Reviews:</strong> Quarterly security posture reviews with executive leadership</li>
        <li><strong>Board Reporting:</strong> Annual comprehensive security and compliance reporting</li>
      </ul>

      <ComplianceHighlight>
        <h4>Third-Party Validation</h4>
        <p>
          Our security and compliance programs are validated by leading independent auditors 
          including BSI Group, KPMG, and Trustwave. We maintain active certifications and 
          provide verification letters to clients upon request.
        </p>
      </ComplianceHighlight>
    </SecurityFrameworkContainer>
  );
}; 