export interface DataCategory {
  category: string;
  description: string;
  dataTypes: string[];
  purposes: string[];
  legalBasis: string;
  retention: string;
  sensitivity: string;
}

export const dataCategories: DataCategory[] = [
  {
    category: 'Personal Identifiers',
    description: 'Information that directly identifies you as our client',
    dataTypes: [
      'Full legal name and any aliases',
      'Email address and phone numbers', 
      'Postal address and residency details',
      'Date of birth and age verification',
      'Government-issued identification numbers'
    ],
    purposes: [
      'Client identification and verification',
      'Consultation scheduling and delivery',
      'Professional communication',
      'Legal compliance (AML/KYC requirements)'
    ],
    legalBasis: 'Contract performance and legal obligations',
    retention: '7 years from last consultation (financial services requirement)',
    sensitivity: 'Standard personal data with enhanced protection'
  },
  {
    category: 'Financial Loss Information',
    description: 'Details about your financial circumstances and recovery case',
    dataTypes: [
      'Loss amounts and asset values',
      'Investment details and portfolio information',
      'Bank account and transaction details',
      'Cryptocurrency addresses and transaction histories',
      'Evidence of fraud or financial misconduct'
    ],
    purposes: [
      'Case assessment and recovery strategy development',
      'Expert consultation delivery',
      'Recovery option analysis',
      'Professional recommendations formulation'
    ],
    legalBasis: 'Contract performance and legitimate interests',
    retention: '7 years from case closure',
    sensitivity: 'Highly sensitive financial data - enhanced encryption'
  },
  {
    category: 'Consultation Records',
    description: 'Information generated during our professional consultations',
    dataTypes: [
      'Consultation notes and recordings (with consent)',
      'Assessment reports and recommendations',
      'Strategy documents and action plans',
      'Follow-up communications and updates'
    ],
    purposes: [
      'Service delivery and quality assurance',
      'Professional record keeping',
      'Ongoing case support',
      'Internal training and improvement'
    ],
    legalBasis: 'Contract performance and legitimate interests',
    retention: '7 years from consultation date',
    sensitivity: 'Professionally privileged information'
  },
  {
    category: 'Technical and Usage Data',
    description: 'Information about how you interact with our services',
    dataTypes: [
      'IP addresses and device identifiers',
      'Browser type and operating system',
      'Booking system usage patterns',
      'Website navigation and interaction data'
    ],
    purposes: [
      'Service delivery and system functionality',
      'Security monitoring and fraud prevention', 
      'System optimization and troubleshooting',
      'Analytics and service improvement'
    ],
    legalBasis: 'Legitimate interests and consent',
    retention: '12 months for technical logs, 24 months for analytics',
    sensitivity: 'Standard technical data with security monitoring'
  }
];

export const retentionSchedule = [
  {
    dataType: 'Client Consultation Records',
    retentionPeriod: '7 years from last consultation',
    legalRequirement: 'Financial services regulatory requirement',
    deletionMethod: 'Secure deletion with audit trail'
  },
  {
    dataType: 'Financial Transaction Records',
    retentionPeriod: '7 years from transaction date',
    legalRequirement: 'UK financial services regulations',
    deletionMethod: 'Secure deletion with audit trail'
  },
  {
    dataType: 'Marketing Consent Records',
    retentionPeriod: 'Until consent is withdrawn',
    legalRequirement: 'UK GDPR Article 7',
    deletionMethod: 'Immediate deletion upon withdrawal'
  },
  {
    dataType: 'Technical Logs and Analytics',
    retentionPeriod: '12 months maximum',
    legalRequirement: 'Data minimization principle',
    deletionMethod: 'Automated deletion with logging'
  },
  {
    dataType: 'Security Incident Records',
    retentionPeriod: '3 years for monitoring and prevention',
    legalRequirement: 'Information security best practices',
    deletionMethod: 'Secure archival then deletion'
  },
  {
    dataType: 'Legal Correspondence',
    retentionPeriod: 'Duration of legal matter plus 7 years',
    legalRequirement: 'Legal professional privilege',
    deletionMethod: 'Legal review then secure deletion'
  }
];

export const securityFrameworks = [
  {
    framework: 'ISO 27001',
    description: 'Information Security Management System certification',
    implementation: 'Annual external audits and continuous monitoring',
    relevance: 'Enterprise-grade information security standards'
  },
  {
    framework: 'SOC 2 Type II',
    description: 'Annual security and availability audits',
    implementation: 'Independent third-party security assessments',
    relevance: 'Trust and transparency for financial services'
  },
  {
    framework: 'UK Cyber Essentials Plus',
    description: 'Government-backed cybersecurity certification',
    implementation: 'Annual certification with technical verification',
    relevance: 'UK government cybersecurity standards'
  },
  {
    framework: 'FCA Compliance',
    description: 'Aligned with financial services security requirements',
    implementation: 'Continuous compliance monitoring and reporting',
    relevance: 'Financial services regulatory alignment'
  }
]; 