export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  seoKeywords: string[];
  metaDescription: string;
  posts: number;
  featured: boolean;
  lastUpdated: string;
}

export const blogCategories: BlogCategory[] = [
  {
    id: 'investment-fraud',
    name: 'Investment Fraud Recovery',
    slug: 'investment-fraud',
    description: 'Expert guidance on recovering assets from Ponzi schemes, fake investment platforms, and unauthorized trading fraud',
    icon: 'InvestmentIcon',
    color: '#1a365d',
    seoKeywords: [
      'investment fraud recovery',
      'Ponzi scheme recovery',
      'fake investment recovery',
      'unauthorized trading recovery',
      'investment scam recovery UK'
    ],
    metaDescription: 'Expert investment fraud recovery guidance from UK specialists. Recover assets from Ponzi schemes, fake platforms, and unauthorized trading. £500M+ recovered.',
    posts: 45,
    featured: true,
    lastUpdated: '2024-01-16'
  },
  {
    id: 'cryptocurrency',
    name: 'Cryptocurrency Recovery',
    slug: 'cryptocurrency',
    description: 'Specialized cryptocurrency recovery from exchange failures, wallet compromises, and token scam fraud',
    icon: 'CryptoIcon',
    color: '#d69e2e',
    seoKeywords: [
      'cryptocurrency recovery',
      'Bitcoin recovery',
      'crypto exchange recovery',
      'wallet recovery',
      'cryptocurrency fraud recovery'
    ],
    metaDescription: 'Professional cryptocurrency recovery services. Recover Bitcoin, Ethereum, and other digital assets from exchange failures, scams, and technical issues.',
    posts: 38,
    featured: true,
    lastUpdated: '2024-01-15'
  },
  {
    id: 'romance-scams',
    name: 'Romance Scam Recovery',
    slug: 'romance-scams',
    description: 'Recovery strategies for online dating fraud, emotional manipulation, and relationship-based financial scams',
    icon: 'HeartIcon',
    color: '#e53e3e',
    seoKeywords: [
      'romance scam recovery',
      'dating fraud recovery',
      'online relationship scams',
      'emotional manipulation recovery',
      'romance fraud UK'
    ],
    metaDescription: 'Romance scam recovery expertise. Recover funds lost to online dating fraud, fake relationships, and emotional manipulation schemes.',
    posts: 22,
    featured: true,
    lastUpdated: '2024-01-14'
  },
  {
    id: 'case-studies',
    name: 'Case Studies',
    slug: 'case-studies',
    description: 'Real recovery success stories, detailed case analysis, and proven strategies from actual client cases',
    icon: 'CaseIcon',
    color: '#38a169',
    seoKeywords: [
      'asset recovery case studies',
      'financial recovery success stories',
      'recovery case analysis',
      'fraud recovery examples',
      'asset recovery testimonials'
    ],
    metaDescription: 'Real asset recovery case studies and success stories. Learn from actual client cases with detailed analysis and proven recovery strategies.',
    posts: 31,
    featured: true,
    lastUpdated: '2024-01-13'
  },
  {
    id: 'legal-insights',
    name: 'Legal Insights',
    slug: 'legal-insights',
    description: 'FCA regulations, legal precedents, compliance updates, and regulatory guidance for financial recovery',
    icon: 'LegalIcon',
    color: '#3182ce',
    seoKeywords: [
      'financial recovery law UK',
      'FCA regulations',
      'asset recovery legal advice',
      'financial fraud law',
      'recovery legal process'
    ],
    metaDescription: 'Expert legal insights on financial recovery. FCA regulations, legal precedents, and compliance guidance from UK recovery specialists.',
    posts: 18,
    featured: false,
    lastUpdated: '2024-01-12'
  },
  {
    id: 'prevention',
    name: 'Fraud Prevention',
    slug: 'fraud-prevention',
    description: 'Due diligence strategies, red flags identification, and prevention techniques for financial fraud',
    icon: 'ShieldIcon',
    color: '#805ad5',
    seoKeywords: [
      'financial fraud prevention',
      'investment scam prevention',
      'due diligence strategies',
      'fraud red flags',
      'investment safety UK'
    ],
    metaDescription: 'Expert fraud prevention strategies. Learn to identify red flags, conduct due diligence, and protect assets from financial scams.',
    posts: 26,
    featured: false,
    lastUpdated: '2024-01-11'
  },
  {
    id: 'international',
    name: 'International Recovery',
    slug: 'international',
    description: 'Cross-border asset recovery, jurisdictional challenges, and international recovery strategies',
    icon: 'GlobalIcon',
    color: '#ed8936',
    seoKeywords: [
      'international asset recovery',
      'cross-border recovery',
      'offshore asset recovery',
      'international fraud recovery',
      'global asset tracing'
    ],
    metaDescription: 'International asset recovery expertise. Cross-border recovery strategies, jurisdictional guidance, and global asset tracing services.',
    posts: 15,
    featured: false,
    lastUpdated: '2024-01-10'
  },
  {
    id: 'expert-analysis',
    name: 'Expert Analysis',
    slug: 'expert-analysis',
    description: 'Industry trends, market analysis, and expert commentary on financial recovery and fraud trends',
    icon: 'AnalysisIcon',
    color: '#9f7aea',
    seoKeywords: [
      'financial fraud trends',
      'recovery industry analysis',
      'fraud market insights',
      'financial crime trends',
      'recovery expert opinion'
    ],
    metaDescription: 'Expert analysis of financial fraud trends, recovery industry insights, and market commentary from leading UK specialists.',
    posts: 12,
    featured: false,
    lastUpdated: '2024-01-09'
  }
];

export default blogCategories; 