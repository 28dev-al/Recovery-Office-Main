import React from 'react';
import { LiabilityGrid, LiabilityCard } from '../styles/TermsOfServiceStyles';

interface LiabilityTerm {
  category: string;
  limitation: string;
  exclusions: string[];
  coverage: string;
}

const liabilityTerms: LiabilityTerm[] = [
  {
    category: "Consultation Services",
    limitation: "Maximum: Total fees paid for consultation",
    exclusions: [
      "Consequential or indirect losses",
      "Loss of profits or business opportunities", 
      "Losses from failure to act on advice",
      "Third-party actions beyond our control"
    ],
    coverage: "Professional advice and recommendations"
  },
  {
    category: "Investigation Services", 
    limitation: "Maximum: 3x fees paid for investigation",
    exclusions: [
      "Accuracy of third-party information",
      "Changes in circumstances post-investigation",
      "Client's use of investigation results",
      "External recovery outcomes"
    ],
    coverage: "Investigation methodology and reporting"
  },
  {
    category: "Technology and Systems",
    limitation: "Maximum: £10,000 per incident",
    exclusions: [
      "Internet connectivity issues",
      "Client's technology failures", 
      "Force majeure events",
      "Scheduled maintenance periods"
    ],
    coverage: "System availability and data integrity"
  },
  {
    category: "Data and Confidentiality",
    limitation: "Professional indemnity insurance limits",
    exclusions: [
      "Authorized disclosure by client",
      "Information in public domain",
      "Legal or regulatory requirements",
      "Client's own data breaches"
    ],
    coverage: "Data protection and confidentiality"
  }
];

export const LiabilityMatrix: React.FC = () => {
  return (
    <>
      <p>
        Our liability is limited to provide certainty while maintaining professional 
        accountability. The following matrix outlines our liability limitations by service category:
      </p>

      <LiabilityGrid>
        {liabilityTerms.map((term, index) => (
          <LiabilityCard key={index}>
            <h4>{term.category}</h4>
            <div className="liability-limit">{term.limitation}</div>
            
            <p><strong>Coverage:</strong> {term.coverage}</p>
            
            <p><strong>Exclusions:</strong></p>
            <ul>
              {term.exclusions.map((exclusion, exclusionIndex) => (
                <li key={exclusionIndex}>{exclusion}</li>
              ))}
            </ul>
          </LiabilityCard>
        ))}
      </LiabilityGrid>

      <h4>General Liability Exclusions</h4>
      <ul>
        <li><strong>Acts of God:</strong> Natural disasters, pandemics, government actions</li>
        <li><strong>Market Forces:</strong> Economic downturns, currency fluctuations, market volatility</li>
        <li><strong>Criminal Activity:</strong> Fraudulent activity by third parties beyond our knowledge</li>
        <li><strong>Regulatory Changes:</strong> Changes in law or regulation affecting recovery options</li>
        <li><strong>Client Actions:</strong> Losses arising from client's independent decisions or actions</li>
        <li><strong>Limitation Period:</strong> Claims not notified within 12 months of service delivery</li>
      </ul>

      <h4>Insurance Coverage</h4>
      <ul>
        <li><strong>Professional Indemnity:</strong> £10 million with leading UK insurer</li>
        <li><strong>Public Liability:</strong> £2 million for general business operations</li>
        <li><strong>Cyber Liability:</strong> £5 million for data breaches and cyber incidents</li>
        <li><strong>Directors & Officers:</strong> £1 million for management liability</li>
      </ul>
    </>
  );
}; 