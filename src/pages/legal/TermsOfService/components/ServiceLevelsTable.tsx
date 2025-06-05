import React from 'react';
import { LegalTable } from '../styles/TermsOfServiceStyles';

interface ServiceLevel {
  metric: string;
  standard: string;
  premium: string;
  notes: string;
}

const serviceLevels: ServiceLevel[] = [
  {
    metric: "Initial Response Time",
    standard: "Within 4 business hours",
    premium: "Within 2 business hours",
    notes: "During UK business hours (9:00-18:00 GMT)"
  },
  {
    metric: "Consultation Scheduling",
    standard: "Within 5 business days",
    premium: "Within 48 hours",
    notes: "Subject to calendar availability"
  },
  {
    metric: "Report Delivery",
    standard: "Within 5 business days",
    premium: "Within 3 business days",
    notes: "Post-consultation delivery"
  },
  {
    metric: "Follow-up Response",
    standard: "Within 2 business days",
    premium: "Within 1 business day",
    notes: "For client queries and clarifications"
  },
  {
    metric: "Emergency Support",
    standard: "Best effort",
    premium: "Within 4 hours",
    notes: "For urgent security-related matters"
  },
  {
    metric: "Technical Support",
    standard: "Within 1 business day",
    premium: "Within 4 hours",
    notes: "For booking and system issues"
  }
];

export const ServiceLevelsTable: React.FC = () => {
  return (
    <LegalTable>
      <thead>
        <tr>
          <th>Service Metric</th>
          <th>Standard Service</th>
          <th>Premium Service</th>
          <th>Notes</th>
        </tr>
      </thead>
      <tbody>
        {serviceLevels.map((level, index) => (
          <tr key={index}>
            <td className="metric-name">{level.metric}</td>
            <td>{level.standard}</td>
            <td><strong>{level.premium}</strong></td>
            <td style={{ fontSize: '0.875rem', color: '#4a5568' }}>{level.notes}</td>
          </tr>
        ))}
      </tbody>
    </LegalTable>
  );
}; 