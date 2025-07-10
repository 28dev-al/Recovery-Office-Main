import React from 'react';
import ServiceDetailTemplate from './detail-template';
import { formatCurrencyCAD } from '../../utils/formatters';

// Icons for benefits section
const BlockchainIcon = () => (
  <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 10L12 7L17 10L12 13L7 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M17 10V14L12 17L7 14V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 7V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 17V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M17 14L21 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 16L7 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const TechExpertIcon = () => (
  <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="6" width="18" height="15" rx="2" stroke="currentColor" strokeWidth="2"/>
    <path d="M8 14H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M8 17H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M8 3V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M16 3V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const GlobalNetworkIcon = () => (
  <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
    <path d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22" stroke="currentColor" strokeWidth="2"/>
    <path d="M12 2C9.49872 4.73835 8.07725 8.29203 8 12C8.07725 15.708 9.49872 19.2616 12 22" stroke="currentColor" strokeWidth="2"/>
    <path d="M2 12H22" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const CryptocurrencyRecovery = () => {
  const serviceData = {
    title: "Cryptocurrency Recovery",
    tagline: "Specialized services to trace and recover stolen or lost digital assets",
    headerImage: "/assets/images/services/cryptocurrency-recovery.jpg",
    description: "Recovery Office provides cutting-edge cryptocurrency recovery services for victims of exchange hacks, wallet breaches, scam investments, and other crypto-related frauds. Our team of blockchain analysts, digital forensics experts, and legal professionals work together to trace digital assets across the blockchain and implement effective recovery strategies. We stay at the forefront of crypto forensics to provide the most advanced recovery options available.",
    
    process: [
      {
        step: 1,
        title: "Technical Analysis",
        description: "We conduct a detailed blockchain analysis to trace your cryptocurrency transactions, identifying the path of your assets and the current location of funds where possible."
      },
      {
        step: 2,
        title: "Exchange Coordination",
        description: "We leverage our established relationships with major cryptocurrency exchanges to flag and potentially freeze stolen assets when they appear on these platforms."
      },
      {
        step: 3,
        title: "Legal Strategy Development",
        description: "Our legal experts develop a tailored recovery strategy that may include exchange requests, law enforcement involvement, or civil proceedings depending on your specific case."
      },
      {
        step: 4,
        title: "Formal Recovery Actions",
        description: "We implement the recovery strategy, which might involve formal legal notices, court orders for exchange information, or international asset tracing efforts."
      },
      {
        step: 5,
        title: "Asset Retrieval",
        description: "Once assets are located and secured through legal channels, we assist in the process of returning the recovered cryptocurrency to your control."
      }
    ],
    
    benefits: [
      {
        icon: <BlockchainIcon />,
        title: "Advanced Blockchain Analysis",
        description: "Our specialized forensic tools can trace cryptocurrency transactions across multiple blockchains and through mixers or tumblers that attempt to obscure transaction trails."
      },
      {
        icon: <TechExpertIcon />,
        title: "Technical Recovery Methods",
        description: "For certain situations involving compromised wallets or technical issues, our experts can implement solutions to recover access or bypass security vulnerabilities."
      },
      {
        icon: <GlobalNetworkIcon />,
        title: "International Recovery Network",
        description: "Our global network of crypto-legal experts can pursue recovery actions in multiple jurisdictions where exchanges or counterparties may be located."
      }
    ],
    
    pricing: {
      title: "Mixed Fee Structure",
      rate: `From ${formatCurrencyCAD(2250)} + %`,
      description: "Our crypto recovery services typically involve an initial technical assessment fee plus a success-based percentage.",
      features: [
        "Initial technical assessment fee",
        "Success fee based on recovery amount",
        "Transparent cost structure",
        "No hidden fees",
        "Fees tailored to case complexity"
      ]
    },
    
    faq: [
      {
        question: "Can you recover cryptocurrency lost in a scam investment?",
        answer: "Yes, we can often recover cryptocurrency lost in scams, though success depends on various factors. Our approach involves tracing the assets through blockchain analysis, identifying if they've been moved to exchanges, and pursuing legal remedies against identifiable parties. We've had successful recoveries from investment scams, fake exchanges, and fraudulent projects, but each case is evaluated on its specific circumstances."
      },
      {
        question: "How long does cryptocurrency recovery take?",
        answer: "The recovery timeline varies widely based on the specifics of your case. The initial tracing and analysis typically takes 1-2 weeks. If your assets are identified on a cooperative exchange, recovery might take 1-3 months. Cases requiring legal action in multiple jurisdictions can extend to 6-18 months. We provide timeline estimates specific to your situation after our initial assessment."
      },
      {
        question: "What information do you need to start the recovery process?",
        answer: "To begin, we need transaction hashes/IDs, wallet addresses involved, dates and amounts of transfers, any communications with scammers/exchanges, and details of how the loss occurred. Screenshots of transactions, emails, messages, and any documents related to the investment or exchange are also helpful. The more information you can provide, the better we can assess recovery possibilities."
      },
      {
        question: "Can you recover cryptocurrency from hard wallets or forgotten passwords?",
        answer: "For hardware wallet issues and forgotten passwords, we offer technical recovery services separate from our fraud recovery practice. We can assist with certain types of wallet recovery, seed phrase reconstruction, and specialized password recovery for specific wallet types. These services have varying success rates depending on the specific circumstances and are evaluated case-by-case."
      },
      {
        question: "What types of cryptocurrency can you recover?",
        answer: "We specialize in recovering major cryptocurrencies including Bitcoin, Ethereum, and other popular altcoins. Our capabilities extend to tokens on the Ethereum, Binance Smart Chain, and other major networks. Recovery possibilities vary by blockchain, with Bitcoin and Ethereum offering the most robust tracing capabilities. For newer or more obscure cryptocurrencies, we evaluate recovery feasibility during our initial assessment."
      }
    ],
    
    relatedServices: [
      {
        id: "investment-fraud-recovery",
        title: "Investment Fraud Recovery",
        description: "Comprehensive recovery services for victims of investment scams, Ponzi schemes, and securities fraud.",
        image: "/assets/images/services/investment-fraud-recovery.jpg"
      },
      {
        id: "digital-forensics",
        title: "Digital Forensics",
        description: "Expert digital investigation services to trace online frauds, document digital evidence, and support legal proceedings.",
        image: "/assets/images/services/digital-forensics.jpg"
      },
      {
        id: "cross-border-recovery",
        title: "Cross-Border Recovery",
        description: "Specialized recovery services for international fraud cases involving multiple jurisdictions.",
        image: "/assets/images/services/cross-border-recovery.jpg"
      }
    ]
  };

  return <ServiceDetailTemplate {...serviceData} />;
};

export default CryptocurrencyRecovery; 