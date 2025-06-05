import React from 'react';
import { RightsTable } from '../styles/PrivacyPolicyStyles';

interface GDPRRight {
  right: string;
  description: string;
  howToExercise: string;
  timeframe: string;
}

const gdprRights: GDPRRight[] = [
  {
    right: "Access",
    description: "Request copies of your personal data and information about how we process it",
    howToExercise: "Contact our data protection team with identification verification",
    timeframe: "1 month"
  },
  {
    right: "Rectification",
    description: "Correct inaccurate or incomplete personal information",
    howToExercise: "Submit correction request with supporting documentation",
    timeframe: "1 month"
  },
  {
    right: "Erasure (Right to be Forgotten)",
    description: "Request deletion of your personal data (subject to legal exceptions)",
    howToExercise: "Submit erasure request (subject to retention requirements)",
    timeframe: "1 month"
  },
  {
    right: "Restriction of Processing",
    description: "Limit how we process your data while maintaining storage",
    howToExercise: "Contact data protection team with specific restriction request",
    timeframe: "1 month"
  },
  {
    right: "Data Portability",
    description: "Receive your data in a structured, machine-readable format",
    howToExercise: "Request data export in standard format (JSON/CSV)",
    timeframe: "1 month"
  },
  {
    right: "Object to Processing",
    description: "Object to processing based on legitimate interests or direct marketing",
    howToExercise: "Submit objection with reasons (automatic for marketing)",
    timeframe: "Immediate for marketing"
  },
  {
    right: "Withdraw Consent",
    description: "Withdraw consent for processing based on your consent",
    howToExercise: "Use unsubscribe links or contact data protection team",
    timeframe: "Immediate"
  },
  {
    right: "Automated Decision Making",
    description: "Not be subject to automated decision-making with legal effects",
    howToExercise: "Request human review of automated decisions",
    timeframe: "1 month"
  }
];

export const DataRightsTable: React.FC = () => {
  return (
    <RightsTable>
      <thead>
        <tr>
          <th>Your Right</th>
          <th>What This Means</th>
          <th>How to Exercise</th>
          <th>Response Time</th>
        </tr>
      </thead>
      <tbody>
        {gdprRights.map((right, index) => (
          <tr key={index}>
            <td className="right-name">{right.right}</td>
            <td>{right.description}</td>
            <td className="how-to-exercise">{right.howToExercise}</td>
            <td>{right.timeframe}</td>
          </tr>
        ))}
      </tbody>
    </RightsTable>
  );
}; 