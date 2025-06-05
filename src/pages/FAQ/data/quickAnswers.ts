import { QuickAnswer } from '../types/faq.types';

export const quickAnswers: QuickAnswer[] = [
  {
    id: 'consultation-cost',
    trigger: ['fee', 'cost', 'price', 'consultation fee', 'how much'],
    question: 'What does the consultation cost?',
    answer: '£2,500 for a comprehensive 90-120 minute consultation including detailed written assessment report.',
    cta: 'View Fee Structure',
    category: 'fees-payment'
  },
  {
    id: 'recovery-timeline',
    trigger: ['time', 'how long', 'timeline', 'duration', 'when'],
    question: 'How long does recovery take?',
    answer: 'Typical recovery cases take 6-18 months, depending on complexity and jurisdiction. Cryptocurrency cases average 8-14 months.',
    cta: 'Learn About Timelines',
    category: 'success-rates'
  },
  {
    id: 'success-chances',
    trigger: ['success', 'rate', 'chances', 'probability', 'likelihood'],
    question: 'What are my chances of recovery?',
    answer: 'Success rates range from 25-85% depending on case type. Investment fraud: 68%, cryptocurrency: 73%, romance scams: 58%.',
    cta: 'Book Consultation',
    category: 'success-rates'
  },
  {
    id: 'cryptocurrency-recovery',
    trigger: ['crypto', 'bitcoin', 'ethereum', 'cryptocurrency', 'digital assets'],
    question: 'Can you recover cryptocurrency?',
    answer: 'Yes, we have a 73% success rate for cryptocurrency recovery over £100K. We handle exchange failures, fraud, and technical issues.',
    cta: 'Crypto Recovery Info',
    category: 'asset-types'
  },
  {
    id: 'international-cases',
    trigger: ['international', 'overseas', 'cross-border', 'foreign', 'global'],
    question: 'Do you handle international cases?',
    answer: 'Yes, we handle international recovery with partners in 25+ jurisdictions. EU cases: 64% success, US cases: 58% success.',
    cta: 'International Services',
    category: 'international-cases'
  },
  {
    id: 'consultation-preparation',
    trigger: ['prepare', 'preparation', 'documents', 'bring', 'needed'],
    question: 'How do I prepare for consultation?',
    answer: 'Bring all communication records, transaction documents, screenshots, and complete our pre-consultation questionnaire.',
    cta: 'Preparation Guide',
    category: 'consultation-process'
  },
  {
    id: 'security-confidentiality',
    trigger: ['secure', 'confidential', 'privacy', 'safe', 'protection'],
    question: 'Is your process secure?',
    answer: 'Yes, we use end-to-end encryption, ISO 27001 security standards, and maintain professional confidentiality with £10M indemnity insurance.',
    cta: 'Security Standards',
    category: 'consultation-process'
  },
  {
    id: 'payment-methods',
    trigger: ['payment', 'pay', 'bank transfer', 'credit card', 'how to pay'],
    question: 'How can I pay for services?',
    answer: 'We accept bank transfers (preferred), corporate credit cards, escrow services, and international wire transfers.',
    cta: 'Payment Options',
    category: 'fees-payment'
  },
  {
    id: 'minimum-loss-amount',
    trigger: ['minimum', 'threshold', 'small', 'amount', 'too little'],
    question: 'Is there a minimum loss amount?',
    answer: 'We focus on cases with losses of £100,000+ where our expertise provides the greatest value. Smaller cases may be referred to partners.',
    cta: 'Case Assessment',
    category: 'consultation-process'
  },
  {
    id: 'regulatory-status',
    trigger: ['regulated', 'FCA', 'authorized', 'licensed', 'registration'],
    question: 'Are you regulated by the FCA?',
    answer: 'We operate as specialist consultants in accordance with FCA principles. We coordinate with regulated professionals for legal representation.',
    cta: 'Regulatory Info',
    category: 'legal-regulatory'
  }
];

export default quickAnswers; 