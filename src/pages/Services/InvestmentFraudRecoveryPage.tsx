import React from 'react';
import { ServiceDetailTemplate } from './ServiceDetailTemplate';
import { formatCurrencyCAD } from '../../utils/formatters';

export const InvestmentFraudRecoveryPage: React.FC = () => {
  const serviceData = {
    title: "Investment Fraud Recovery",
    subtitle: "Expert recovery services for victims of investment scams, Ponzi schemes, and fraudulent trading platforms",
    description: "Our specialized team has successfully recovered millions for victims of investment fraud. We use advanced forensic techniques, legal expertise, and international networks to trace and recover your stolen investments from fraudulent schemes, fake trading platforms, and Ponzi schemes.",
    features: [
      "Advanced blockchain forensic analysis",
      "International asset tracing capabilities", 
      "Legal action against fraudulent platforms",
      "Regulatory complaint filing assistance",
      "Recovery from offshore jurisdictions",
      "Ponzi scheme victim representation",
      "Binary options fraud recovery",
      "Forex scam investigation services"
    ],
    process: [
      {
        step: 1,
        title: "Case Assessment",
        description: "Free comprehensive evaluation of your case, including documentation review and recovery potential analysis."
      },
      {
        step: 2,
        title: "Investigation & Tracing",
        description: "Advanced forensic investigation to trace stolen funds and identify responsible parties using cutting-edge technology."
      },
      {
        step: 3,
        title: "Legal Action",
        description: "Strategic legal proceedings including freezing orders, court actions, and regulatory complaints across multiple jurisdictions."
      },
      {
        step: 4,
        title: "Asset Recovery",
        description: "Successful recovery and return of your stolen investments through negotiation, legal enforcement, or asset seizure."
      }
    ],
    pricing: {
      consultation: "FREE",
      recovery: "Success Fee Only"
    },
    successRate: "78%",
    averageRecovery: formatCurrencyCAD(675000).replace('.00', '') + "+",
    testimonial: {
      text: `Recovery Office helped me recover ${formatCurrencyCAD(345000)} from a binary options scam. Their expertise and determination made the impossible possible. I can't thank them enough.`,
      author: "Sarah M., Toronto",
      amount: formatCurrencyCAD(345000)
    },
    seoTitle: "Investment Fraud Recovery Services | Recovery Office Manchester UK",
    seoDescription: "Professional investment fraud recovery services by Recovery Office. Expert recovery from Ponzi schemes, fake trading platforms, forex scams. Free consultation available.",
    seoKeywords: "investment fraud recovery, Ponzi scheme recovery, binary options fraud, forex scam recovery, fraudulent trading platforms, investment scam help, UK financial recovery"
  };

  return <ServiceDetailTemplate serviceData={serviceData} />;
};

export default InvestmentFraudRecoveryPage; 