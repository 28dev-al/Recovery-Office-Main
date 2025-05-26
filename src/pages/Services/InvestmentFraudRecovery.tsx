import React from 'react';
import ServiceDetailTemplate from './detail-template';

// Icons for benefits section
const SecurityIcon = () => (
  <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ExpertiseIcon = () => (
  <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 21V5C16 3.89543 15.1046 3 14 3H10C8.89543 3 8 3.89543 8 5V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="14" r="2" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const SpeedIcon = () => (
  <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const InvestmentFraudRecovery = () => {
  const serviceData = {
    title: "Investment Fraud Recovery",
    tagline: "Expert assistance in recovering losses from investment fraud and securities scams",
    headerImage: "/assets/images/services/investment-fraud-recovery.jpg",
    description: "Recovery Office specializes in helping victims of investment fraud reclaim their lost assets. Our team of financial recovery experts, legal professionals, and forensic accountants work together to identify fraudulent activity, build compelling cases, and navigate the complex recovery procedures to maximize your chances of compensation. We handle Ponzi schemes, securities fraud, investment misrepresentation, and other deceptive financial practices.",
    
    process: [
      {
        step: 1,
        title: "Case Assessment",
        description: "We begin with a comprehensive evaluation of your case, reviewing all documents, communications, and transactions to determine the nature of the fraud and recovery potential."
      },
      {
        step: 2,
        title: "Evidence Collection",
        description: "Our team gathers and analyzes evidence, working with forensic accountants to trace assets and document the full extent of the fraudulent activity."
      },
      {
        step: 3,
        title: "Recovery Strategy",
        description: "We develop a tailored recovery strategy that may include negotiation with involved parties, regulatory complaints, civil litigation, or participation in class action lawsuits."
      },
      {
        step: 4,
        title: "Claim Representation",
        description: "Our specialists represent your interests throughout the recovery process, handling all communications, paperwork, and procedural requirements."
      },
      {
        step: 5,
        title: "Asset Recovery",
        description: "We work diligently to recover your assets through all available channels, ensuring you receive the maximum possible compensation for your losses."
      }
    ],
    
    benefits: [
      {
        icon: <SecurityIcon />,
        title: "Secure Asset Tracing",
        description: "Our advanced forensic techniques allow us to trace and locate hidden assets across multiple jurisdictions and financial institutions."
      },
      {
        icon: <ExpertiseIcon />,
        title: "Regulatory Expertise",
        description: "We navigate complex financial regulations and recovery procedures, maximizing your chances of successful recovery through the proper channels."
      },
      {
        icon: <SpeedIcon />,
        title: "Expedited Process",
        description: "Our established relationships with regulators and financial institutions help streamline the recovery process, reducing delays and complications."
      }
    ],
    
    pricing: {
      title: "Contingency Fee Structure",
      rate: "From 20%",
      description: "We typically work on a contingency basis for investment fraud recovery cases.",
      features: [
        "No upfront costs",
        "You pay only if we recover your assets",
        "Fee is a percentage of recovered amount",
        "All case expenses covered",
        "Free initial consultation"
      ]
    },
    
    faq: [
      {
        question: "How long does the investment fraud recovery process typically take?",
        answer: "The recovery timeline varies significantly depending on the complexity of the fraud, the number of parties involved, and the legal procedures required. Simple cases might resolve in 6-12 months, while more complex international cases can take 2-3 years. During your consultation, we'll provide a more specific estimate based on your circumstances."
      },
      {
        question: "What types of investment fraud do you handle?",
        answer: "We handle a comprehensive range of investment fraud cases, including Ponzi schemes, pyramid schemes, securities fraud, boiler room scams, forex fraud, cryptocurrency scams, misrepresentation of investment returns, unauthorized trading, and embezzlement by financial advisors or managers."
      },
      {
        question: "How much of my lost investment can I expect to recover?",
        answer: "Recovery amounts vary widely depending on the specific circumstances of your case, including how long ago the fraud occurred, what assets remain accessible, and whether multiple victims are involved. Recovery rates typically range from 30-70% of losses, though some cases may result in full recovery or lower percentages. We'll provide a realistic assessment during our initial consultation."
      },
      {
        question: "What documentation do I need to begin the recovery process?",
        answer: "You should gather all documentation related to your investment, including account statements, contracts, prospectuses, emails, text messages, recorded phone calls, marketing materials, wire transfer receipts, and any communications with the investment provider. Don't worry if you don't have everything – we can help determine what's most important for your specific case."
      },
      {
        question: "Can I pursue recovery if the investment was made years ago?",
        answer: "Yes, though time limitations do apply. Most jurisdictions have statutes of limitations for fraud claims ranging from 2-6 years, though these can sometimes be extended if the fraud was concealed. Even with older cases, recovery options may exist through regulatory actions or bankruptcy proceedings. We'll evaluate your case regardless of when the investment occurred."
      }
    ],
    
    relatedServices: [
      {
        id: "pension-scam-recovery",
        title: "Pension Scam Recovery",
        description: "Specialized assistance for victims of pension liberation scams and fraudulent pension investment schemes.",
        image: "/assets/images/services/pension-recovery.jpg"
      },
      {
        id: "cryptocurrency-recovery",
        title: "Cryptocurrency Recovery",
        description: "Expert help recovering assets lost to cryptocurrency scams, fraudulent exchanges, and digital wallet theft.",
        image: "/assets/images/services/crypto-recovery.jpg"
      },
      {
        id: "financial-advisor-misconduct",
        title: "Financial Advisor Misconduct",
        description: "Assistance with cases involving breach of fiduciary duty, unauthorized trading, and misrepresentation by advisors.",
        image: "/assets/images/services/advisor-misconduct.jpg"
      }
    ]
  };

  return <ServiceDetailTemplate {...serviceData} />;
};

export default InvestmentFraudRecovery; 