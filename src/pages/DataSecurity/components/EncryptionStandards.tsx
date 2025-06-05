import React from 'react';
import { SecurityFrameworkContainer, SecurityNotice, ComplianceHighlight, CertificationGrid, CertificationCard } from '../styles/DataSecurityStyles';

export const EncryptionStandards: React.FC = () => {
  return (
    <>
      <SecurityFrameworkContainer id="technical-security">
        <h2>3. Technical Security Measures</h2>
        
        <SecurityNotice>
          <h4>Enterprise-Grade Security Infrastructure</h4>
          <p>
            Our security infrastructure is designed and maintained by certified security professionals, 
            implementing defense-in-depth strategies with multiple layers of protection for client data 
            and business operations.
          </p>
        </SecurityNotice>

        <h3>Network Security Architecture</h3>
        <ul>
          <li><strong>Next-Generation Firewalls:</strong> Intrusion detection and prevention systems with real-time threat analysis</li>
          <li><strong>Network Segmentation:</strong> Isolated network zones for different data classification levels</li>
          <li><strong>VPN Access:</strong> Encrypted virtual private network for all remote access</li>
          <li><strong>DDoS Protection:</strong> Multi-layered distributed denial of service mitigation</li>
          <li><strong>Web Application Firewall:</strong> Protection against common web application attacks</li>
        </ul>

        <h3>Endpoint Security</h3>
        <ul>
          <li><strong>Endpoint Detection and Response (EDR):</strong> Advanced threat detection on all devices</li>
          <li><strong>Device Management:</strong> Mobile device management (MDM) for all business devices</li>
          <li><strong>Antivirus/Anti-malware:</strong> Enterprise-grade protection with real-time scanning</li>
          <li><strong>Application Control:</strong> Whitelisting and behavioral analysis of applications</li>
          <li><strong>Data Loss Prevention (DLP):</strong> Prevention of unauthorized data exfiltration</li>
        </ul>

        <CertificationGrid>
          <CertificationCard>
            <h4>🌐 Network Infrastructure</h4>
            <ul>
              <li>Redundant internet connections</li>
              <li>Load balancing and failover systems</li>
              <li>24/7 network operations center monitoring</li>
              <li>Regular penetration testing</li>
              <li>Vulnerability scanning and remediation</li>
            </ul>
          </CertificationCard>

          <CertificationCard>
            <h4>💻 Endpoint Protection</h4>
            <ul>
              <li>Zero-day threat protection</li>
              <li>Behavioral analysis and machine learning</li>
              <li>Centralized management and reporting</li>
              <li>Incident response automation</li>
              <li>Forensic investigation capabilities</li>
            </ul>
          </CertificationCard>
        </CertificationGrid>
      </SecurityFrameworkContainer>

      <SecurityFrameworkContainer id="encryption-protocols">
        <h2>4. Encryption & Data Protection Protocols</h2>
        
        <ComplianceHighlight>
          <h4>Military-Grade Encryption Standards</h4>
          <p>
            All client data is protected using AES-256 encryption at rest and TLS 1.3 in transit, 
            with additional layers of encryption for highly sensitive financial recovery data.
          </p>
        </ComplianceHighlight>

        <h3>Data Encryption Standards</h3>
        <ul>
          <li><strong>At Rest:</strong> AES-256 encryption for all stored data with hardware security modules (HSM)</li>
          <li><strong>In Transit:</strong> TLS 1.3 encryption for all data transmission with perfect forward secrecy</li>
          <li><strong>In Processing:</strong> Encrypted memory and secure enclaves for data processing</li>
          <li><strong>Backup Encryption:</strong> Full encryption of all backup data with separate key management</li>
          <li><strong>Database Encryption:</strong> Transparent data encryption (TDE) for database files</li>
        </ul>

        <h3>Key Management Framework</h3>
        <ul>
          <li><strong>Hardware Security Modules (HSM):</strong> FIPS 140-2 Level 3 certified key storage</li>
          <li><strong>Key Rotation:</strong> Automated key rotation every 90 days</li>
          <li><strong>Key Escrow:</strong> Secure key backup and recovery procedures</li>
          <li><strong>Access Controls:</strong> Role-based access to encryption keys</li>
          <li><strong>Audit Logging:</strong> Complete audit trail of all key operations</li>
        </ul>

        <h3>Advanced Security Features</h3>
        <ul>
          <li><strong>End-to-End Encryption:</strong> Client-to-server encryption for all sensitive communications</li>
          <li><strong>Digital Signatures:</strong> PKI-based digital signatures for document integrity</li>
          <li><strong>Tokenization:</strong> Sensitive data tokenization for secure processing</li>
          <li><strong>Secure Multi-Party Computation:</strong> Privacy-preserving data analysis</li>
          <li><strong>Homomorphic Encryption:</strong> Computation on encrypted data without decryption</li>
        </ul>

        <CertificationGrid>
          <CertificationCard>
            <h4>🔐 Encryption Technologies</h4>
            <ul>
              <li>AES-256-GCM symmetric encryption</li>
              <li>RSA-4096 and ECDSA asymmetric encryption</li>
              <li>SHA-3 cryptographic hash functions</li>
              <li>PBKDF2 password-based key derivation</li>
              <li>Quantum-resistant cryptography evaluation</li>
            </ul>
          </CertificationCard>

          <CertificationCard>
            <h4>🗝️ Key Management</h4>
            <ul>
              <li>FIPS 140-2 Level 3 HSM compliance</li>
              <li>Multi-factor authentication for key access</li>
              <li>Secure key generation and distribution</li>
              <li>Key lifecycle management</li>
              <li>Emergency key recovery procedures</li>
            </ul>
          </CertificationCard>

          <CertificationCard>
            <h4>📡 Secure Communications</h4>
            <ul>
              <li>TLS 1.3 with perfect forward secrecy</li>
              <li>Certificate pinning and validation</li>
              <li>Encrypted email with S/MIME</li>
              <li>Secure file transfer protocols</li>
              <li>End-to-end encrypted messaging</li>
            </ul>
          </CertificationCard>

          <CertificationCard>
            <h4>🛡️ Data Protection</h4>
            <ul>
              <li>Data masking and anonymization</li>
              <li>Secure data deletion and destruction</li>
              <li>Privacy-preserving analytics</li>
              <li>Differential privacy implementation</li>
              <li>Zero-knowledge proof systems</li>
            </ul>
          </CertificationCard>
        </CertificationGrid>

        <SecurityNotice>
          <h4>Quantum-Ready Security</h4>
          <p>
            We are actively evaluating and implementing quantum-resistant cryptographic algorithms 
            to ensure long-term security of client data against future quantum computing threats. 
            Our encryption standards are regularly updated to maintain state-of-the-art protection.
          </p>
        </SecurityNotice>
      </SecurityFrameworkContainer>
    </>
  );
}; 