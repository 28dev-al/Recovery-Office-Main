import { GuidancePath } from '../types/faq.types';

export const guidancePaths: GuidancePath[] = [
  {
    id: 'investment-fraud',
    title: 'Investment Fraud Recovery',
    description: 'Ponzi schemes, fake investment platforms, unauthorized trading, and financial advisor negligence',
    questionsCount: 15,
    avgConsultationTime: '120 minutes',
    successRate: '68%',
    icon: 'InvestmentIcon',
    color: '#1a365d',
    filterTags: ['investment-fraud', 'ponzi', 'platforms', 'negligence', 'unauthorized-trading']
  },
  {
    id: 'cryptocurrency-losses',
    title: 'Cryptocurrency Recovery',
    description: 'Exchange failures, wallet compromises, token scams, DeFi fraud, and blockchain analysis',
    questionsCount: 18,
    avgConsultationTime: '90 minutes',
    successRate: '73%',
    icon: 'CryptoIcon',
    color: '#d69e2e',
    filterTags: ['cryptocurrency', 'blockchain', 'exchange', 'wallet', 'defi', 'tokens']
  },
  {
    id: 'romance-scams',
    title: 'Romance Scam Recovery',
    description: 'Online relationship fraud, fake profiles, emotional manipulation, and social engineering',
    questionsCount: 10,
    avgConsultationTime: '105 minutes',
    successRate: '58%',
    icon: 'HeartIcon',
    color: '#e53e3e',
    filterTags: ['romance-scam', 'social-engineering', 'emotional-manipulation', 'fake-profiles']
  },
  {
    id: 'international-fraud',
    title: 'International Asset Recovery',
    description: 'Cross-border fraud, offshore schemes, multi-jurisdictional cases, and regulatory coordination',
    questionsCount: 12,
    avgConsultationTime: '135 minutes',
    successRate: '54%',
    icon: 'GlobalIcon',
    color: '#805ad5',
    filterTags: ['international', 'cross-border', 'offshore', 'multi-jurisdiction']
  },
  {
    id: 'professional-negligence',
    title: 'Professional Negligence Claims',
    description: 'Financial advisor misconduct, unsuitable advice, unauthorized trading, and breach of fiduciary duty',
    questionsCount: 8,
    avgConsultationTime: '110 minutes',
    successRate: '81%',
    icon: 'ScaleIcon',
    color: '#38a169',
    filterTags: ['professional-negligence', 'advisor-misconduct', 'fiduciary-breach', 'unsuitable-advice']
  },
  {
    id: 'business-fraud',
    title: 'Business & Commercial Fraud',
    description: 'B2B fraud, invoice scams, CEO fraud, supply chain fraud, and commercial disputes',
    questionsCount: 9,
    avgConsultationTime: '100 minutes',
    successRate: '64%',
    icon: 'BusinessIcon',
    color: '#3182ce',
    filterTags: ['business-fraud', 'commercial-fraud', 'invoice-scam', 'ceo-fraud', 'supply-chain']
  },
  {
    id: 'technical-recovery',
    title: 'Technical Asset Recovery',
    description: 'Lost passwords, corrupted wallets, technical failures, and digital forensics requirements',
    questionsCount: 7,
    avgConsultationTime: '75 minutes',
    successRate: '85%',
    icon: 'TechIcon',
    color: '#ed8936',
    filterTags: ['technical-recovery', 'lost-passwords', 'wallet-corruption', 'digital-forensics']
  },
  {
    id: 'high-value-cases',
    title: 'High-Value Recovery (£1M+)',
    description: 'Complex large-scale fraud, institutional losses, and sophisticated recovery strategies',
    questionsCount: 11,
    avgConsultationTime: '150 minutes',
    successRate: '71%',
    icon: 'DiamondIcon',
    color: '#9f7aea',
    filterTags: ['high-value', 'institutional', 'complex-fraud', 'large-scale']
  }
];

export default guidancePaths; 