import React from 'react';
import { ServiceDetailTemplate } from './ServiceDetailTemplate';

export const RegulatoryComplaintPage: React.FC = () => {
  const serviceData = {
    title: "Regulatory Complaint Assistance",
    subtitle: "Professional assistance with FCA complaints, ombudsman services, and regulatory enforcement for financial misconduct",
    description: "Our regulatory experts help you navigate complex complaint procedures with the Financial Conduct Authority (FCA), Financial Ombudsman Service, and other regulatory bodies. We ensure your complaint is properly documented, submitted, and pursued for maximum compensation.",
    features: [
      "FCA complaint preparation and submission",
      "Financial Ombudsman Service representation",
      "Regulatory enforcement assistance",
      "Compensation claim optimization",
      "Professional misconduct reporting",
      "Compliance violation documentation",
      "Regulatory appeal procedures",
      "Multi-jurisdiction complaint coordination"
    ],
    process: [
      {
        step: 1,
        title: "Complaint Assessment",
        description: "Comprehensive review of your case to determine regulatory violations and the best complaint strategy for maximum compensation."
      },
      {
        step: 2,
        title: "Documentation Preparation",
        description: "Professional preparation of complaint documentation, evidence compilation, and regulatory submission materials."
      },
      {
        step: 3,
        title: "Regulatory Submission",
        description: "Strategic submission to appropriate regulatory bodies including FCA, FOS, and international regulatory authorities."
      },
      {
        step: 4,
        title: "Compensation Recovery",
        description: "Successful pursuit of regulatory compensation, enforcement action, and financial redress through official channels."
      }
    ],
    pricing: {
      consultation: "FREE",
      recovery: "Success Fee Only"
    },
    successRate: "89%",
    averageRecovery: "£95K",
    testimonial: {
      text: "Recovery Office helped me file a successful FCA complaint against my former financial advisor. Their expertise in regulatory procedures resulted in £45,000 compensation that I never thought possible.",
      author: "David L., Edinburgh",
      amount: "£45,000"
    },
    seoTitle: "Regulatory Complaint Assistance | FCA Complaints | Recovery Office UK",
    seoDescription: "Professional regulatory complaint assistance by Recovery Office. 89% success rate with FCA complaints, ombudsman services. Expert regulatory enforcement. Call +44 7451 263372.",
    seoKeywords: "regulatory complaint assistance, FCA complaints, financial ombudsman service, regulatory enforcement, compensation claims, professional misconduct, compliance violations"
  };

  return <ServiceDetailTemplate serviceData={serviceData} />;
};

export default RegulatoryComplaintPage; 