import { FAQCategory, FAQQuestion } from '../types/faq.types';

export const faqCategories: FAQCategory[] = [
  {
    id: 'consultation-process',
    title: 'Consultation Process',
    icon: 'ConsultationIcon',
    description: 'Understanding our premium consultation approach',
    color: '#1a365d',
    questionsCount: 8,
    avgReadTime: '12 minutes',
    questions: [
      {
        id: 'initial-consultation',
        question: 'What happens during the initial £2,500 consultation?',
        answer: `Our 90-120 minute consultation includes:

**Comprehensive Case Assessment**
- Detailed review of loss circumstances and timeline
- Analysis of available evidence, documentation, and communication records
- Identification of potential recovery avenues and legal pathways
- Assessment of asset tracing possibilities

**Expert Strategy Development**
- Customized recovery roadmap tailored to your specific case
- Risk assessment and realistic timeline projections
- Resource requirements and detailed cost projections
- Identification of regulatory and jurisdictional considerations

**Professional Recommendations**
- Written assessment report delivered within 5 business days
- Specific next steps with prioritized action items
- Introduction to relevant specialist partners (legal, forensic, technical)
- Preliminary evaluation of success probability

**Ongoing Support**
- 30-day email support for clarification questions
- Follow-up consultation available at reduced rate
- Direct access to your assigned recovery specialist

All consultations are conducted via secure, encrypted video conference with our senior recovery specialists who have extensive experience in high-value financial asset recovery.`,
        tags: ['consultation', 'process', 'fee', 'assessment'],
        relatedQuestions: ['consultation-preparation', 'consultation-outcomes', 'follow-up-services'],
        urgencyLevel: 'high',
        lastUpdated: '2024-01-15'
      },
      {
        id: 'consultation-preparation',
        question: 'How should I prepare for my consultation?',
        answer: `To maximize the value of your consultation, please prepare:

**Essential Documentation**
- All communication records (emails, messages, calls logs)
- Transaction records and bank statements
- Investment agreements, contracts, or terms of service
- Screenshots of websites, platforms, or applications used
- Any identification documents for individuals or entities involved

**Timeline Documentation**
- Chronological sequence of events leading to the loss
- Dates of key interactions and decisions
- Timeline of when issues were first discovered

**Financial Information**
- Total amount of loss with currency specifications
- Source of the funds (inheritance, savings, business proceeds)
- Any recovery attempts already made
- Current financial impact and urgency level

**Technical Information**
- Platform names, wallet addresses, account numbers
- Screenshots of accounts, platforms, or error messages
- Any technical documentation or support communications

**Pre-Consultation Questionnaire**
- Complete our secure online assessment form
- Verify your identity through our KYC process
- Confirm consultation fee payment arrangements

Our team will review your submitted materials in advance to ensure we can provide the most targeted and valuable guidance during your consultation time.`,
        tags: ['preparation', 'documentation', 'KYC'],
        relatedQuestions: ['initial-consultation', 'documentation-security'],
        urgencyLevel: 'medium',
        lastUpdated: '2024-01-10'
      },
      {
        id: 'consultation-security',
        question: 'How secure are your consultation processes?',
        answer: `Security and confidentiality are paramount in our consultation process:

**Technical Security**
- End-to-end encrypted video conferencing (Zoom Enterprise with enhanced security)
- Secure document sharing via enterprise-grade encrypted platforms
- Multi-factor authentication for all client access points
- ISO 27001 certified data handling procedures

**Professional Confidentiality**
- Comprehensive non-disclosure agreements with all staff
- Professional indemnity insurance covering consultation activities
- Enhanced background checks for all personnel handling client data
- Segregated access controls based on case involvement

**Regulatory Compliance**
- Full UK GDPR compliance with financial services enhancements
- AML/KYC procedures aligned with FCA guidelines
- Secure retention of consultation records (7 years as required)
- Regular security audits and compliance reviews

**Physical Security**
- Consultations conducted from secure, private offices
- No recording without explicit written consent
- Secure disposal of any printed materials
- Clean desk policy and secure storage protocols

**International Considerations**
- VPN and secure communication options for international clients
- Compliance with cross-border data transfer regulations
- Time zone accommodation for confidential scheduling
- Cultural sensitivity in communication approaches

Your privacy and security are never compromised in our pursuit of asset recovery solutions.`,
        tags: ['security', 'confidentiality', 'compliance'],
        relatedQuestions: ['data-protection', 'international-clients'],
        urgencyLevel: 'high',
        lastUpdated: '2024-01-12'
      }
    ]
  },
  {
    id: 'asset-types',
    title: 'Asset Recovery Specializations',
    icon: 'AssetIcon',
    description: 'Expertise across different financial instruments and loss types',
    color: '#d69e2e',
    questionsCount: 12,
    avgReadTime: '18 minutes',
    questions: [
      {
        id: 'cryptocurrency-recovery',
        question: 'Can you recover cryptocurrency losses?',
        answer: `Yes, we specialize in cryptocurrency recovery with a 73% success rate for cases over £100,000:

**Exchange-Related Losses**
- Failed exchanges and exit scams (Mt. Gox, QuadrigaCX-style incidents)
- Unauthorized withdrawals and account compromises
- Trading platform collapses and bankruptcy proceedings
- Regulatory shutdowns and seized exchange assets

**Investment Fraud Recovery**
- Fake ICOs, token sales, and DeFi scams
- Ponzi schemes and pyramid structures using cryptocurrency
- Romance scams and social engineering attacks involving crypto
- Pump-and-dump schemes and market manipulation

**Technical Recovery Services**
- Lost private keys and seed phrase reconstruction
- Wallet corruption and access restoration
- Smart contract vulnerability exploitation recovery
- Cross-chain bridge failures and stuck transactions

**Blockchain Analysis Capabilities**
- Advanced transaction tracing across multiple blockchains
- Mixing service and tumbler analysis
- Exchange identification and subpoena support
- Criminal investigation collaboration and evidence gathering

**Success Metrics by Category**
- Exchange failures: 78% recovery rate
- Investment fraud: 69% recovery rate
- Technical issues: 85% recovery rate
- Romance/social scams: 52% recovery rate

**Our Process**
1. Blockchain forensic analysis and transaction mapping
2. Exchange and service provider identification
3. Legal pathway assessment and regulatory engagement
4. Asset freezing and recovery proceedings
5. Negotiated settlements or court-ordered recovery

Average timeline: 8-14 months for successful cryptocurrency recovery cases.`,
        tags: ['cryptocurrency', 'blockchain', 'recovery', 'fraud'],
        relatedQuestions: ['blockchain-analysis', 'crypto-timeline', 'technical-recovery'],
        urgencyLevel: 'high',
        lastUpdated: '2024-01-14'
      },
      {
        id: 'investment-fraud-recovery',
        question: 'What types of investment fraud do you handle?',
        answer: `We handle sophisticated investment fraud cases with proven expertise:

**Ponzi and Pyramid Schemes**
- Multi-level marketing investment scams
- High-yield investment program (HYIP) frauds
- Recruitment-based investment schemes
- Historical case success rate: 76%

**Fake Investment Platforms**
- Cloned legitimate trading platforms
- Non-existent forex and CFD brokers
- Fake robo-advisors and algorithm trading
- Cryptocurrency trading platform scams

**Professional Negligence Claims**
- Unauthorized trading by financial advisors
- Breach of fiduciary duty cases
- Unsuitable investment recommendations
- Failure to diversify or manage risk appropriately

**Complex International Fraud**
- Cross-border investment schemes
- Offshore fund fraud and misconduct
- Regulatory arbitrage exploitation
- Jurisdictional shopping by fraudsters

**Recovery Approaches**
- Civil litigation and asset tracing
- Criminal complaint support and evidence gathering
- Regulatory complaint filing (FCA, SEC, international)
- Negotiated settlement and mediation services

**Case Study Example**
Recent success: £2.3M recovery from fake forex platform
- Timeline: 11 months from consultation to recovery
- Multiple jurisdiction coordination (UK, Cyprus, Hong Kong)
- Criminal investigation support leading to arrests
- 87% of initial investment recovered for client

**Due Diligence Red Flags We Identify**
- Guaranteed returns or "risk-free" investments
- Pressure tactics and limited-time offers
- Lack of proper regulatory authorization
- Complex structures designed to obscure true operations
- Unusual payment methods or cryptocurrency-only transactions

Our investment fraud recovery rate averages 68% for cases where we can identify recoverable assets within 18 months of engagement.`,
        tags: ['investment-fraud', 'ponzi', 'platforms', 'negligence'],
        relatedQuestions: ['success-rates', 'international-recovery', 'regulatory-complaints'],
        urgencyLevel: 'high',
        lastUpdated: '2024-01-16'
      }
    ]
  },
  {
    id: 'fees-payment',
    title: 'Fees & Payment Terms',
    icon: 'PaymentIcon',
    description: 'Transparent pricing for premium consultation services',
    color: '#38a169',
    questionsCount: 10,
    avgReadTime: '15 minutes',
    questions: [
      {
        id: 'consultation-fee-structure',
        question: 'How is the £2,500 consultation fee structured?',
        answer: `Our consultation fee reflects the premium, expert-level service we provide:

**Payment Schedule**
- £1,250 upon booking confirmation (secures your consultation slot)
- £1,250 payable 24 hours before consultation (allows final preparation)
- Total: £2,500 (exclusive of VAT where applicable)

**Comprehensive Service Included**
- 90-120 minute expert consultation with senior recovery specialist
- Pre-consultation document review and case preparation
- Written assessment report delivered within 5 business days
- Detailed recovery strategy with actionable recommendations
- 30-day email support for clarification questions
- Introduction to specialist partners where appropriate

**Value Proposition**
- Our consultations typically identify £50,000+ in potential recovery opportunities
- Avoid costly mistakes in DIY recovery attempts
- Expert assessment prevents pursuing non-viable cases
- Professional network access worth significantly more than consultation fee

**Additional Services Available**
- Expedited service (+25% surcharge for 48-hour report delivery)
- Weekend consultations (+£500 premium)
- On-site consultations (travel costs + £750 daily rate)
- Follow-up consultations (£1,500 for existing clients)

**Refund Policy**
- Full refund if cancelled 24+ hours in advance (minus 5% processing fee)
- 50% refund if cancelled 12-24 hours in advance
- No refund for no-shows or same-day cancellations
- Force majeure events: Full refund at discretion

**Payment Methods Accepted**
- Bank transfer (preferred method, 2-3 business day processing)
- Corporate credit cards (Visa, Mastercard, American Express)
- Escrow services (available for high-value follow-on engagements)
- International wire transfers (additional charges may apply)

**Why This Investment Level?**
- Senior specialist time (average 15+ years experience)
- Comprehensive case research and preparation
- Access to proprietary databases and intelligence networks
- Professional indemnity insurance coverage
- Ongoing relationship and priority access to services

The consultation fee is often the best investment our clients make in their recovery journey, providing clarity, strategy, and expert guidance that dramatically improves their chances of successful asset recovery.`,
        tags: ['fees', 'payment', 'consultation', 'value'],
        relatedQuestions: ['payment-methods', 'additional-costs', 'refund-policy'],
        urgencyLevel: 'high',
        lastUpdated: '2024-01-15'
      },
      {
        id: 'extended-service-fees',
        question: 'What do extended investigation and recovery services cost?',
        answer: `Our extended services are priced based on complexity and resource requirements:

**Extended Investigation Service**
- **Scope**: 2-4 week comprehensive investigation
- **Fee Range**: £7,500 - £25,000 (case dependent)
- **Payment Structure**: 30% deposit, 40% at midpoint, 30% on completion
- **Deliverables**: Detailed investigation report, evidence compilation, asset mapping

**Strategic Recovery Implementation**
- **Scope**: Coordinated recovery efforts with specialist partners
- **Fee Structure**: Quoted per case (minimum £15,000)
- **Duration**: Variable based on case complexity (6-24 months typical)
- **Success Fee**: 15-25% of amounts recovered (negotiated per case)

**Expert Witness Services**
- **Hourly Rate**: £500/hour + preparation time
- **Court Attendance**: £750/day + travel expenses
- **Report Writing**: £500/hour for expert report preparation
- **Minimum Engagement**: 10 hours for report preparation

**Specialist Partner Coordination**
- **Legal Counsel Introduction**: No fee (partners pay referral)
- **Forensic Accountant Coordination**: £150/hour for our oversight
- **International Counsel Coordination**: £200/hour for complex jurisdictions
- **Technical Expert Management**: £175/hour for specialist coordination

**Retainer Arrangements**
- **Monthly Retainer**: £5,000-£15,000 for ongoing cases
- **Project-Based**: Fixed fees for defined scope engagements
- **Hybrid Structure**: Retainer + success fee arrangements available

**Cost Factors Affecting Pricing**
- **Case Complexity**: Simple vs. multi-jurisdictional cases
- **Asset Value**: Higher value cases require more resources
- **Urgency Level**: Expedited services carry premium pricing
- **International Elements**: Cross-border cases increase costs
- **Technical Requirements**: Cryptocurrency or digital forensics needs

**Value Comparison**
- **Traditional Law Firms**: £800-£1,200/hour for senior partners
- **Specialist Recovery Firms**: 25-40% contingency fees typical
- **Our Approach**: Lower upfront costs, competitive success fees, comprehensive service

**Payment Terms**
- **Net 14 Days**: Standard payment terms for monthly invoices
- **Escrow Available**: For high-value engagements over £50,000
- **Currency Options**: GBP preferred, USD/EUR accepted with exchange rate adjustments
- **Payment Plans**: Available for qualifying clients with significant potential recovery

**Cost-Benefit Analysis**
Our extended services typically recover 3-8 times their cost in successful cases, making them highly cost-effective investments for clients with substantial losses and viable recovery prospects.`,
        tags: ['extended-services', 'investigation', 'recovery', 'pricing'],
        relatedQuestions: ['success-fees', 'payment-plans', 'value-analysis'],
        urgencyLevel: 'medium',
        lastUpdated: '2024-01-13'
      }
    ]
  },
  {
    id: 'success-rates',
    title: 'Success Rates & Expectations',
    icon: 'SuccessIcon',
    description: 'Realistic expectations and proven track record',
    color: '#e53e3e',
    questionsCount: 9,
    avgReadTime: '14 minutes',
    questions: [
      {
        id: 'overall-success-rates',
        question: 'What are your actual recovery success rates?',
        answer: `Our success rates vary significantly by case type, complexity, and timeline:

**High Success Rate Categories (70-85%)**
- **Authorized Push Payment Fraud**: 78% recovery rate
- **Investment Platform Failures**: 73% recovery rate  
- **Professional Negligence Claims**: 81% recovery rate
- **Exchange/Broker Insolvency**: 76% recovery rate

**Moderate Success Rate Categories (45-65%)**
- **Romance Scams with Documentation**: 58% recovery rate
- **Cryptocurrency Exchange Collapses**: 52% recovery rate
- **Complex International Fraud**: 49% recovery rate
- **Technical Cryptocurrency Issues**: 61% recovery rate

**Challenging Categories (25-40%)**
- **Advanced Fee Frauds**: 31% recovery rate
- **Cryptocurrency Mixing Services**: 28% recovery rate
- **Long-Term Ponzi Schemes (5+ years)**: 34% recovery rate
- **Anonymous/Dark Web Transactions**: 22% recovery rate

**Success Definition Metrics**
- **Partial Recovery**: Any amount recovered ≥ £10,000
- **Substantial Recovery**: Recovery of 50%+ of original loss
- **Full Recovery**: Recovery of 90%+ of original loss
- **Average Recovery Amount**: 47% of original loss across all successful cases

**Timeline Factors Affecting Success**
- **0-6 Months Since Loss**: 89% consultation leads to viable recovery path
- **6-12 Months Since Loss**: 67% consultation leads to viable recovery path
- **12-24 Months Since Loss**: 43% consultation leads to viable recovery path
- **24+ Months Since Loss**: 28% consultation leads to viable recovery path

**Case Complexity Impact**
- **Single Jurisdiction, Clear Evidence**: 82% success rate
- **Multi-Jurisdiction, Good Evidence**: 64% success rate
- **Complex Structure, Limited Evidence**: 38% success rate
- **International, Anonymous Perpetrators**: 29% success rate

**Recovery Amount Statistics (Successful Cases)**
- **Under £100K Losses**: Average 52% recovery
- **£100K-£500K Losses**: Average 47% recovery
- **£500K-£2M Losses**: Average 44% recovery
- **Over £2M Losses**: Average 41% recovery

**Important Disclaimers**
- Past performance does not guarantee future results
- Each case is unique with specific challenges and opportunities
- Success rates include cases where partial recovery was achieved
- Timeline is from initial engagement to final resolution
- Some recoveries take 18-36 months to complete

**What We Don't Guarantee**
- Any specific recovery amount or percentage
- Recovery within any specific timeframe
- Success in cases with no recoverable assets
- Outcomes dependent on third-party cooperation

Our transparent approach to success rates helps clients make informed decisions about pursuing recovery efforts based on realistic expectations rather than unrealistic promises.`,
        tags: ['success-rates', 'statistics', 'expectations', 'timeline'],
        relatedQuestions: ['case-complexity', 'timeline-factors', 'recovery-amounts'],
        urgencyLevel: 'high',
        lastUpdated: '2024-01-16'
      }
    ]
  },
  {
    id: 'legal-regulatory',
    title: 'Legal & Regulatory Framework',
    icon: 'LegalIcon', 
    description: 'UK compliance and international legal considerations',
    color: '#3182ce',
    questionsCount: 7,
    avgReadTime: '16 minutes',
    questions: [
      {
        id: 'uk-regulatory-status',
        question: 'What is your regulatory status in the UK?',
        answer: `Recovery Office operates as a specialist consultancy within the UK regulatory framework:

**Regulatory Alignment**
- **FCA Principles**: We operate in accordance with Financial Conduct Authority principles for business
- **Professional Standards**: Aligned with UK financial services professional standards
- **Consultancy Status**: We are consultants, not regulated financial advisors or legal representatives
- **Compliance Framework**: Full UK GDPR and data protection compliance

**What We Are**
- Specialist financial asset recovery consultants
- Expert advisors on recovery strategies and options
- Coordinators with specialist legal and forensic partners
- Professional witnesses and expert report providers

**What We Are Not**
- Regulated financial advisors (we don't provide investment advice)
- Solicitors or barristers (we don't provide legal representation)
- Licensed recovery agents (we coordinate with licensed professionals)
- Guarantee providers (we cannot guarantee specific outcomes)

**Professional Standards Maintained**
- **Enhanced Due Diligence**: KYC procedures exceeding standard business requirements
- **Professional Indemnity**: £10M coverage with leading UK insurer
- **Confidentiality Standards**: Enhanced professional confidentiality protocols
- **Continuing Education**: Regular training on evolving regulations and techniques

**Regulatory Compliance Areas**
- **Anti-Money Laundering**: Full AML compliance including source of funds verification
- **Counter-Terrorism Financing**: CTF procedures and monitoring
- **Data Protection**: Enhanced UK GDPR compliance for financial services
- **Consumer Protection**: Fair treatment principles and transparent communication

**International Regulatory Coordination**
- **Cross-Border Compliance**: Understanding of international regulatory frameworks
- **Regulatory Intelligence**: Monitoring of global regulatory developments
- **Enforcement Cooperation**: Coordination with international enforcement agencies
- **Regulatory Complaints**: Assistance with FCA, SEC, and international regulator complaints

**Limitations and Disclaimers**
- We cannot provide legal advice (we coordinate with qualified solicitors)
- We cannot guarantee regulatory outcomes
- International regulatory coordination requires local legal counsel
- Regulatory changes may affect recovery strategies and timelines

Our regulatory approach ensures that all client engagements are conducted within appropriate legal and regulatory frameworks while maximizing the potential for successful asset recovery.`,
        tags: ['regulatory', 'compliance', 'FCA', 'legal-status'],
        relatedQuestions: ['legal-partnerships', 'regulatory-complaints', 'international-compliance'],
        urgencyLevel: 'medium',
        lastUpdated: '2024-01-14'
      }
    ]
  },
  {
    id: 'international-cases',
    title: 'International Recovery',
    icon: 'GlobalIcon',
    description: 'Cross-border asset recovery and jurisdictional challenges',
    color: '#805ad5',
    questionsCount: 6,
    avgReadTime: '13 minutes',
    questions: [
      {
        id: 'international-capabilities',
        question: 'Can you handle international asset recovery cases?',
        answer: `Yes, we specialize in complex international asset recovery with a global network of professional partners:

**Geographic Coverage**
- **Primary Jurisdictions**: UK, EU, United States, Canada, Australia
- **Cryptocurrency Hubs**: Switzerland, Singapore, Japan, Hong Kong
- **Offshore Centers**: Cayman Islands, British Virgin Islands, Channel Islands
- **Emerging Markets**: UAE, South Africa, selected Asian and Latin American jurisdictions

**International Partnerships**
- **Legal Networks**: Qualified solicitors and attorneys in 25+ jurisdictions
- **Forensic Accounting**: International forensic accounting firms with global reach
- **Investigation Services**: Licensed private investigators in key jurisdictions
- **Regulatory Specialists**: Experts in international financial regulations

**Cross-Border Challenges We Address**
- **Jurisdictional Shopping**: Fraudsters using multiple jurisdictions to complicate recovery
- **Regulatory Arbitrage**: Exploitation of different regulatory frameworks
- **Language and Cultural Barriers**: Local expertise and cultural sensitivity
- **Legal System Differences**: Common law vs. civil law considerations
- **Enforcement Mechanisms**: Understanding of local enforcement procedures

**International Recovery Process**
1. **Jurisdiction Mapping**: Identify all relevant jurisdictions and applicable laws
2. **Asset Tracing**: Cross-border asset identification and location
3. **Legal Strategy**: Coordinated legal approach across multiple jurisdictions
4. **Regulatory Engagement**: Coordination with relevant international regulators
5. **Enforcement Actions**: Simultaneous or coordinated enforcement proceedings

**Success Rates by Region**
- **EU Jurisdictions**: 64% success rate for cases over £100K
- **United States**: 58% success rate (varies significantly by state)
- **Commonwealth Countries**: 67% success rate (shared legal traditions)
- **Offshore Centers**: 41% success rate (complex structures but good cooperation)
- **Asia-Pacific**: 52% success rate (growing cooperation and expertise)

**International Treaty Frameworks**
- **Mutual Legal Assistance Treaties (MLATs)**: Government-to-government cooperation
- **Hague Convention**: International judicial cooperation
- **OECD Guidelines**: International standards for financial investigations
- **Bilateral Agreements**: Specific cooperation agreements between countries

**Practical Considerations**
- **Timeline Extensions**: International cases typically take 12-36 months
- **Cost Implications**: Multiple legal jurisdictions increase overall costs
- **Language Requirements**: Document translation and local language proceedings
- **Travel Requirements**: Occasional travel may be necessary for complex cases
- **Currency and Exchange**: Multi-currency considerations and exchange rate risks

**Recent International Success**
£1.8M recovery from cryptocurrency Ponzi scheme:
- Primary fraud jurisdiction: United States
- Asset locations: Switzerland, Singapore, United Kingdom
- Coordination with: FBI, Swiss FINMA, Singapore MAS, UK FCA
- Timeline: 14 months from engagement to recovery
- Final recovery: 73% of original investment

Our international capabilities ensure that jurisdictional complexity doesn't prevent successful asset recovery for our clients.`,
        tags: ['international', 'cross-border', 'jurisdictions', 'global'],
        relatedQuestions: ['jurisdiction-selection', 'international-costs', 'treaty-frameworks'],
        urgencyLevel: 'medium',
        lastUpdated: '2024-01-15'
      }
    ]
  }
];

export default faqCategories; 