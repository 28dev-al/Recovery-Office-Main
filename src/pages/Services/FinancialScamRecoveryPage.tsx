import React from 'react';
import { ServiceDetailTemplate } from './ServiceDetailTemplate';

export const FinancialScamRecoveryPage: React.FC = () => {
  const serviceData = {
    title: "Financial Scam Recovery",
    subtitle: "Expert recovery services for victims of romance scams, advance fee fraud, and sophisticated financial deception schemes",
    description: "Our experienced team specializes in recovering funds from complex financial scams including romance scams, advance fee fraud, business email compromise, and sophisticated deception schemes. We combine investigative expertise with legal action to trace and recover your stolen money.",
    features: [
      "Romance scam fund recovery",
      "Advance fee fraud investigation",
      "Business email compromise recovery",
      "Wire transfer fraud recovery",
      "Online dating scam assistance",
      "Lottery and prize scam recovery",
      "Employment scam fund recovery",
      "Social engineering fraud recovery"
    ],
    process: [
      {
        step: 1,
        title: "Scam Analysis",
        description: "Detailed analysis of the scam methodology, communication records, and financial transactions to build a recovery strategy."
      },
      {
        step: 2,
        title: "Fund Tracing",
        description: "Professional investigation to trace stolen funds through banking networks, payment processors, and international transfers."
      },
      {
        step: 3,
        title: "Legal Recovery",
        description: "Strategic legal action including bank recovery procedures, court orders, and international cooperation agreements."
      },
      {
        step: 4,
        title: "Fund Return",
        description: "Successful recovery and return of your stolen funds through legal enforcement and negotiated settlements."
      }
    ],
    pricing: {
      consultation: "FREE",
      recovery: "Success Fee Only"
    },
    successRate: "71%",
    averageRecovery: "£125K",
    testimonial: {
      text: "I lost £85,000 to a romance scammer who convinced me to invest in a fake trading platform. Recovery Office traced the money and recovered £67,000. They gave me hope when I had none.",
      author: "Jennifer R., Birmingham",
      amount: "£67,000"
    },
    seoTitle: "Financial Scam Recovery Services | Romance Scam Recovery | Recovery Office UK",
    seoDescription: "Expert financial scam recovery services. Recover funds from romance scams, advance fee fraud, wire transfer scams. Call +44 7451 263472.",
    seoKeywords: "financial scam recovery, romance scam recovery, advance fee fraud, wire transfer fraud, business email compromise, online dating scam, lottery scam recovery"
  };

  return <ServiceDetailTemplate serviceData={serviceData} />;
};

export default FinancialScamRecoveryPage; 