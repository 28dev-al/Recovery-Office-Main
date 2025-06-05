import React from 'react';
import { PaymentGrid, PaymentCard } from '../styles/TermsOfServiceStyles';

interface PaymentTerm {
  title: string;
  amount: string;
  schedule: string;
  details: string[];
}

const paymentTerms: PaymentTerm[] = [
  {
    title: "Initial Consultation",
    amount: "£2,500",
    schedule: "50% upon booking, 50% before consultation",
    details: [
      "90-120 minute video conference",
      "Written assessment report included",
      "Recommended action plan",
      "Specialist partner introductions"
    ]
  },
  {
    title: "Extended Investigation",
    amount: "£7,500 - £25,000",
    schedule: "30% deposit, 40% at midpoint, 30% on completion",
    details: [
      "2-4 week investigation period",
      "Detailed evidence analysis",
      "Asset tracing report",
      "Recovery options assessment"
    ]
  },
  {
    title: "Expert Witness Services",
    amount: "£500/hour",
    schedule: "50% advance payment, balance monthly",
    details: [
      "Court testimony preparation",
      "Expert report writing",
      "Legal proceeding support",
      "Professional credentials verification"
    ]
  },
  {
    title: "Additional Services",
    amount: "Variable",
    schedule: "Case-specific terms",
    details: [
      "Weekend consultations: +£500",
      "Expedited service: +25%",
      "International travel: Actual costs",
      "Rush delivery: +£1,000"
    ]
  }
];

export const PaymentTermsGrid: React.FC = () => {
  return (
    <>
      <h4>Fee Structure and Payment Schedule</h4>
      <PaymentGrid>
        {paymentTerms.map((term, index) => (
          <PaymentCard key={index}>
            <h4>{term.title}</h4>
            <div className="amount">{term.amount}</div>
            <div className="details">{term.schedule}</div>
            <ul>
              {term.details.map((detail, detailIndex) => (
                <li key={detailIndex}>{detail}</li>
              ))}
            </ul>
          </PaymentCard>
        ))}
      </PaymentGrid>

      <h4>Accepted Payment Methods</h4>
      <ul>
        <li><strong>Bank Transfer:</strong> Preferred method for UK clients (2-3 business days)</li>
        <li><strong>Corporate Credit Card:</strong> Visa, Mastercard, American Express</li>
        <li><strong>Escrow Services:</strong> Available for high-value engagements (£50,000+)</li>
        <li><strong>International Wire:</strong> Swift transfers accepted (additional fees may apply)</li>
        <li><strong>Cryptocurrency:</strong> Bitcoin and Ethereum accepted for certain services</li>
      </ul>

      <h4>Currency and Exchange Rates</h4>
      <ul>
        <li>All fees quoted in British Pounds (GBP) unless otherwise specified</li>
        <li>Other currencies accepted by arrangement with prevailing exchange rates</li>
        <li>Foreign exchange costs borne by client for non-GBP payments</li>
        <li>Rates fixed at time of booking confirmation</li>
      </ul>
    </>
  );
}; 