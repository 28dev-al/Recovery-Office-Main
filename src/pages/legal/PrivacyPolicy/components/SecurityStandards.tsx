import React from 'react';
import styled from 'styled-components';
import { securityFrameworks } from '../data/dataCategoriesConfig';

const PREMIUM_SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64
};

const PREMIUM_COLORS = {
  primary: '#1a365d',
  secondary: '#d69e2e',
  background: '#f7fafc',
  border: '#e2e8f0',
  highlight: '#edf2f7',
  text: '#2d3748'
};

const SecurityContainer = styled.div`
  margin: ${PREMIUM_SPACING.xl}px 0;
`;

const SecurityGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${PREMIUM_SPACING.xl}px;
  margin: ${PREMIUM_SPACING.xl}px 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: ${PREMIUM_SPACING.lg}px;
  }
`;

const SecurityCategory = styled.div`
  background: white;
  border: 2px solid ${PREMIUM_COLORS.border};
  border-radius: 12px;
  padding: ${PREMIUM_SPACING.xl}px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  }

  h4 {
    color: ${PREMIUM_COLORS.primary};
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: ${PREMIUM_SPACING.lg}px;
    margin-top: 0;
    display: flex;
    align-items: center;
    gap: ${PREMIUM_SPACING.md}px;
  }
`;

const SecurityMeasures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const Measure = styled.li`
  background: ${PREMIUM_COLORS.highlight};
  padding: ${PREMIUM_SPACING.md}px;
  border-radius: 8px;
  margin-bottom: ${PREMIUM_SPACING.md}px;
  border-left: 4px solid ${PREMIUM_COLORS.secondary};

  strong {
    color: ${PREMIUM_COLORS.primary};
    display: block;
    margin-bottom: ${PREMIUM_SPACING.xs}px;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const ComplianceFrameworks = styled.div`
  background: linear-gradient(135deg, ${PREMIUM_COLORS.primary} 0%, #2c5282 100%);
  color: white;
  padding: ${PREMIUM_SPACING.xl}px;
  border-radius: 12px;
  margin-top: ${PREMIUM_SPACING.xl}px;

  h4 {
    color: white;
    font-size: 1.25rem;
    margin-bottom: ${PREMIUM_SPACING.lg}px;
    margin-top: 0;
    text-align: center;
  }
`;

const FrameworkList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${PREMIUM_SPACING.lg}px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Framework = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: ${PREMIUM_SPACING.lg}px;
  border-radius: 8px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);

  strong {
    color: ${PREMIUM_COLORS.secondary};
    display: block;
    margin-bottom: ${PREMIUM_SPACING.sm}px;
    font-size: 1.1rem;
  }

  p {
    margin: 0;
    color: #e2e8f0;
    font-size: 0.9rem;
    line-height: 1.5;
  }
`;

const SecurityIcon = styled.span`
  font-size: 1.5rem;
  opacity: 0.8;
`;

const IncidentResponse = styled.div`
  background: #fff5f5;
  border: 2px solid #fed7d7;
  border-radius: 12px;
  padding: ${PREMIUM_SPACING.xl}px;
  margin-top: ${PREMIUM_SPACING.xl}px;

  h4 {
    color: #c53030;
    margin-top: 0;
    margin-bottom: ${PREMIUM_SPACING.lg}px;
    display: flex;
    align-items: center;
    gap: ${PREMIUM_SPACING.md}px;
  }
`;

const ResponseStep = styled.div`
  background: white;
  padding: ${PREMIUM_SPACING.md}px;
  border-radius: 8px;
  margin-bottom: ${PREMIUM_SPACING.md}px;
  border-left: 4px solid #fc8181;

  strong {
    color: #c53030;
    display: block;
    margin-bottom: ${PREMIUM_SPACING.xs}px;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

export const SecurityStandards: React.FC = () => {
  return (
    <SecurityContainer>
      <h3 style={{ 
        color: PREMIUM_COLORS.primary, 
        fontSize: '1.5rem', 
        marginBottom: `${PREMIUM_SPACING.lg}px`,
        textAlign: 'center'
      }}>
        Enterprise-Grade Security Framework
      </h3>
      
      <SecurityGrid>
        <SecurityCategory>
          <h4>
            <SecurityIcon>🔒</SecurityIcon>
            Data Encryption Standards
          </h4>
          <SecurityMeasures>
            <Measure>
              <strong>Data at Rest:</strong>
              AES-256 encryption for all stored data including consultation records, financial information, and client communications
            </Measure>
            <Measure>
              <strong>Data in Transit:</strong>
              TLS 1.3 for all communications between client devices and our servers
            </Measure>
            <Measure>
              <strong>Database Security:</strong>
              MongoDB Atlas encryption with customer-managed keys and field-level encryption for sensitive data
            </Measure>
            <Measure>
              <strong>Backup Encryption:</strong>
              End-to-end encrypted automated backups with secure key management
            </Measure>
          </SecurityMeasures>
        </SecurityCategory>
        
        <SecurityCategory>
          <h4>
            <SecurityIcon>🛡️</SecurityIcon>
            Access Control Systems
          </h4>
          <SecurityMeasures>
            <Measure>
              <strong>Multi-Factor Authentication:</strong>
              Required for all system access with time-based one-time passwords (TOTP)
            </Measure>
            <Measure>
              <strong>Role-Based Access:</strong>
              Principle of least privilege implementation with granular permissions
            </Measure>
            <Measure>
              <strong>Session Management:</strong>
              JWT tokens with secure expiration and automatic logout for inactive sessions
            </Measure>
            <Measure>
              <strong>Audit Logging:</strong>
              Comprehensive access and activity tracking with tamper-proof logs
            </Measure>
          </SecurityMeasures>
        </SecurityCategory>

        <SecurityCategory>
          <h4>
            <SecurityIcon>🏗️</SecurityIcon>
            Infrastructure Security
          </h4>
          <SecurityMeasures>
            <Measure>
              <strong>Cloud Security:</strong>
              Enterprise-grade hosting with Railway and Netlify providing SOC 2 Type II compliance
            </Measure>
            <Measure>
              <strong>Network Protection:</strong>
              DDoS protection, Web Application Firewall (WAF), and intrusion detection systems
            </Measure>
            <Measure>
              <strong>Vulnerability Management:</strong>
              Regular security updates, patches, and automated vulnerability scanning
            </Measure>
            <Measure>
              <strong>Secure Development:</strong>
              Security code reviews, dependency scanning, and secure coding practices
            </Measure>
          </SecurityMeasures>
        </SecurityCategory>
        
        <SecurityCategory>
          <h4>
            <SecurityIcon>📊</SecurityIcon>
            Monitoring & Detection
          </h4>
          <SecurityMeasures>
            <Measure>
              <strong>24/7 Security Monitoring:</strong>
              Real-time security event monitoring with automated alerting systems
            </Measure>
            <Measure>
              <strong>Anomaly Detection:</strong>
              AI-powered behavioral analysis to detect unusual access patterns
            </Measure>
            <Measure>
              <strong>Penetration Testing:</strong>
              Annual third-party security assessments and vulnerability testing
            </Measure>
            <Measure>
              <strong>Security Information and Event Management (SIEM):</strong>
              Centralized logging and correlation of security events
            </Measure>
          </SecurityMeasures>
        </SecurityCategory>
      </SecurityGrid>
      
      <ComplianceFrameworks>
        <h4>Compliance & Certification Standards</h4>
        <FrameworkList>
          {securityFrameworks.map((framework, index) => (
            <Framework key={index}>
              <strong>{framework.framework}</strong>
              <p>{framework.description}</p>
              <div style={{ 
                marginTop: `${PREMIUM_SPACING.md}px`,
                padding: `${PREMIUM_SPACING.sm}px`,
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '6px',
                fontSize: '0.8rem'
              }}>
                <strong style={{ fontSize: '0.8rem', color: PREMIUM_COLORS.secondary }}>
                  Implementation:
                </strong>
                <br />
                {framework.implementation}
              </div>
            </Framework>
          ))}
        </FrameworkList>
      </ComplianceFrameworks>

      <IncidentResponse>
        <h4>
          <SecurityIcon>🚨</SecurityIcon>
          Data Breach Response Protocol
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: `${PREMIUM_SPACING.lg}px` }}>
          <ResponseStep>
            <strong>Immediate Response (0-1 hours):</strong>
            Contain the incident, assess the scope, and activate the incident response team
          </ResponseStep>
          <ResponseStep>
            <strong>Investigation (1-24 hours):</strong>
            Forensic analysis to determine cause, affected data, and potential impact
          </ResponseStep>
          <ResponseStep>
            <strong>Notification (24-72 hours):</strong>
            Notify ICO within 72 hours and affected individuals without undue delay
          </ResponseStep>
          <ResponseStep>
            <strong>Remediation & Recovery:</strong>
            Implement fixes, restore services, and enhance security measures to prevent recurrence
          </ResponseStep>
        </div>
        <div style={{ 
          background: 'white',
          padding: `${PREMIUM_SPACING.md}px`,
          borderRadius: '8px',
          marginTop: `${PREMIUM_SPACING.lg}px`,
          borderLeft: '4px solid #fc8181'
        }}>
          <strong style={{ color: '#c53030' }}>Emergency Contact:</strong>
          <br />
          In case of suspected data breach, contact our Security Team immediately at{' '}
          <a href="mailto:security@recovery-office.com" style={{ color: '#c53030', fontWeight: 600 }}>
            security@recovery-office.com
          </a>
          {' '}or call our 24/7 security hotline: +44 (0) 20 XXXX XXXX
        </div>
      </IncidentResponse>
    </SecurityContainer>
  );
}; 