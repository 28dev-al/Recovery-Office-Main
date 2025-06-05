export interface AuthorProfile {
  id: string;
  name: string;
  title: string;
  slug: string;
  avatar: string;
  bio: string;
  expertise: string[];
  credentials: string[];
  experience: string;
  recoveredAmount: string;
  casesHandled: number;
  specializations: string[];
  contact: {
    email: string;
    linkedin?: string;
    phone?: string;
  };
  seoKeywords: string[];
  published: number;
  lastActive: string;
}

export const authorProfiles: { [key: string]: AuthorProfile } = {
  seniorCryptoSpecialist: {
    id: 'sarah-chen',
    name: 'Sarah Chen',
    title: 'Senior Cryptocurrency Recovery Specialist',
    slug: 'sarah-chen',
    avatar: '/assets/images/team/sarah-chen.jpg',
    bio: 'Sarah Chen is Recovery Office\'s leading cryptocurrency recovery specialist with over 12 years of experience in digital asset recovery and blockchain analysis. She has successfully recovered over £78M in cryptocurrency assets for clients, specializing in exchange failures, wallet compromises, and complex technical recovery scenarios.',
    expertise: [
      'Cryptocurrency Recovery',
      'Blockchain Analysis',
      'Exchange Failure Recovery',
      'Wallet Recovery',
      'DeFi Protocol Analysis',
      'Technical Asset Recovery'
    ],
    credentials: [
      'Certified Cryptocurrency Forensic Analyst (CCFA)',
      'Blockchain Investigation Professional (BIP)',
      'Digital Asset Recovery Specialist (DARS)',
      'MSc Cybersecurity & Digital Forensics, University College London',
      'Chartered Institute of Information Security (CIIS) Member'
    ],
    experience: '12+ years in digital asset recovery and cybersecurity',
    recoveredAmount: '£78M+',
    casesHandled: 450,
    specializations: [
      'Bitcoin & Ethereum Recovery',
      'Exchange Collapse Cases',
      'Smart Contract Vulnerabilities',
      'Cross-Chain Bridge Failures',
      'Privacy Coin Analysis'
    ],
    contact: {
      email: 'sarah.chen@recovery-office.com',
      linkedin: 'https://linkedin.com/in/sarah-chen-crypto-recovery'
    },
    seoKeywords: [
      'cryptocurrency recovery expert',
      'Bitcoin recovery specialist',
      'blockchain analysis expert',
      'digital asset recovery'
    ],
    published: 38,
    lastActive: '2024-01-16'
  },

  legalRecoveryDirector: {
    id: 'james-thornton',
    name: 'James Thornton',
    title: 'Legal Recovery Director & Senior Partner',
    slug: 'james-thornton',
    avatar: '/assets/images/team/james-thornton.jpg',
    bio: 'James Thornton leads Recovery Office\'s legal recovery division with 18 years of experience in financial litigation and asset recovery law. As a former Crown Prosecution Service specialist, he brings unique insights into complex fraud investigations and has secured over £125M in client recoveries through strategic legal action.',
    expertise: [
      'Investment Fraud Recovery',
      'Legal Asset Recovery',
      'Ponzi Scheme Litigation',
      'Professional Negligence Claims',
      'Regulatory Complaint Management',
      'International Recovery Law'
    ],
    credentials: [
      'Solicitor of the Supreme Court (England & Wales)',
      'Certified Fraud Examiner (CFE)',
      'Advanced Diploma in Financial Crime & Compliance',
      'LLM International Commercial Law, King\'s College London',
      'Former Crown Prosecution Service Specialist Prosecutor',
      'Law Society Financial Crime Panel Member'
    ],
    experience: '18+ years in financial litigation and fraud recovery',
    recoveredAmount: '£125M+',
    casesHandled: 320,
    specializations: [
      'Ponzi Scheme Recovery',
      'Professional Negligence',
      'Regulatory Complaints',
      'International Arbitration',
      'Freezing Orders & Asset Preservation'
    ],
    contact: {
      email: 'james.thornton@recovery-office.com',
      linkedin: 'https://linkedin.com/in/james-thornton-legal-recovery',
      phone: '+44 20 7946 0958'
    },
    seoKeywords: [
      'investment fraud lawyer',
      'Ponzi scheme recovery expert',
      'financial litigation specialist',
      'asset recovery lawyer UK'
    ],
    published: 45,
    lastActive: '2024-01-16'
  },

  internationalRecoveryDirector: {
    id: 'dr-maria-rodriguez',
    name: 'Dr. Maria Rodriguez',
    title: 'International Recovery Director',
    slug: 'dr-maria-rodriguez',
    avatar: '/assets/images/team/maria-rodriguez.jpg',
    bio: 'Dr. Maria Rodriguez leads international recovery operations with expertise spanning 25+ jurisdictions. With a PhD in International Financial Law and 15 years of cross-border recovery experience, she has successfully navigated complex international cases worth over £95M, specializing in offshore asset recovery and multi-jurisdictional fraud cases.',
    expertise: [
      'International Asset Recovery',
      'Cross-Border Fraud Investigation',
      'Offshore Asset Tracing',
      'Multi-Jurisdictional Recovery',
      'Regulatory Coordination',
      'International Compliance'
    ],
    credentials: [
      'PhD International Financial Law, University of Cambridge',
      'Master of Laws (LLM) International Finance Law',
      'Certified Anti-Money Laundering Specialist (CAMS)',
      'International Association of Financial Crimes Investigators (IAFCI)',
      'Former OECD Financial Crime Task Force Member',
      'Multilingual: English, Spanish, French, German, Mandarin'
    ],
    experience: '15+ years in international financial recovery',
    recoveredAmount: '£95M+',
    casesHandled: 180,
    specializations: [
      'Offshore Asset Recovery',
      'International Ponzi Schemes',
      'Cross-Border Romance Scams',
      'Regulatory Treaty Navigation',
      'International Arbitration'
    ],
    contact: {
      email: 'maria.rodriguez@recovery-office.com',
      linkedin: 'https://linkedin.com/in/dr-maria-rodriguez-international-recovery'
    },
    seoKeywords: [
      'international asset recovery expert',
      'cross-border recovery specialist',
      'offshore asset recovery',
      'international fraud recovery'
    ],
    published: 31,
    lastActive: '2024-01-15'
  },

  technicalForensicsLead: {
    id: 'michael-wright',
    name: 'Michael Wright',
    title: 'Technical Forensics Lead',
    slug: 'michael-wright',
    avatar: '/assets/images/team/michael-wright.jpg',
    bio: 'Michael Wright leads Recovery Office\'s technical forensics division, specializing in digital evidence recovery and technical asset restoration. With 14 years of experience in cybersecurity and digital forensics, he has recovered over £45M through technical analysis, wallet restoration, and advanced forensic techniques.',
    expertise: [
      'Digital Forensics',
      'Wallet Recovery',
      'Technical Asset Recovery',
      'Cybersecurity Analysis',
      'Evidence Preservation',
      'System Analysis'
    ],
    credentials: [
      'Certified Information Security Manager (CISM)',
      'Certified Computer Security Incident Handler (CSIH)',
      'Digital Forensics Professional (DFP)',
      'MSc Computer Security & Forensics, University of Edinburgh',
      'SANS Certified Incident Handler (GCIH)',
      'Certified Ethical Hacker (CEH)'
    ],
    experience: '14+ years in technical forensics and cybersecurity',
    recoveredAmount: '£45M+',
    casesHandled: 280,
    specializations: [
      'Wallet Password Recovery',
      'Corrupted File Recovery',
      'Digital Evidence Analysis',
      'System Compromise Investigation',
      'Technical Fraud Analysis'
    ],
    contact: {
      email: 'michael.wright@recovery-office.com',
      linkedin: 'https://linkedin.com/in/michael-wright-technical-forensics'
    },
    seoKeywords: [
      'digital forensics expert',
      'wallet recovery specialist',
      'technical asset recovery',
      'cybersecurity forensics'
    ],
    published: 22,
    lastActive: '2024-01-14'
  },

  romanceScamSpecialist: {
    id: 'dr-helen-davies',
    name: 'Dr. Helen Davies',
    title: 'Romance Scam Recovery Specialist',
    slug: 'dr-helen-davies',
    avatar: '/assets/images/team/helen-davies.jpg',
    bio: 'Dr. Helen Davies is Recovery Office\'s leading romance scam recovery specialist, combining psychological expertise with financial recovery strategies. With a PhD in Criminal Psychology and 10 years of specialized experience, she has helped recover over £22M for romance scam victims while providing expert testimony in landmark cases.',
    expertise: [
      'Romance Scam Recovery',
      'Victim Psychology',
      'Social Engineering Analysis',
      'Relationship Fraud Investigation',
      'Emotional Manipulation Assessment',
      'Victim Support Services'
    ],
    credentials: [
      'PhD Criminal Psychology, University of Manchester',
      'Certified Fraud Examiner (CFE)',
      'Licensed Clinical Psychologist',
      'Specialist Certificate in Financial Crime Psychology',
      'Romance Scam Expert Witness Certification',
      'International Association of Romance Scam Specialists (IARSS)'
    ],
    experience: '10+ years in romance scam recovery and victim support',
    recoveredAmount: '£22M+',
    casesHandled: 340,
    specializations: [
      'Online Dating Fraud',
      'Emotional Manipulation Recovery',
      'Social Engineering Investigation',
      'Victim Testimony Preparation',
      'Relationship Fraud Analysis'
    ],
    contact: {
      email: 'helen.davies@recovery-office.com',
      linkedin: 'https://linkedin.com/in/dr-helen-davies-romance-scam-specialist'
    },
    seoKeywords: [
      'romance scam expert',
      'dating fraud specialist',
      'relationship scam recovery',
      'emotional manipulation expert'
    ],
    published: 26,
    lastActive: '2024-01-13'
  }
};

export default authorProfiles; 