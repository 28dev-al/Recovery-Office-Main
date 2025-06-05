import React from 'react';
import { LastUpdatedContainer } from '../styles/PrivacyPolicyStyles';

export const LastUpdated: React.FC = () => {
  // In a real application, this would come from a CMS or database
  const effectiveDate = new Date('2024-01-15'); // Current date for this example
  const version = '2.1';
  
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <LastUpdatedContainer>
      <strong>Effective Date:</strong> {formatDate(effectiveDate)} 
      <span style={{ margin: '0 16px', opacity: 0.7 }}>|</span>
      <strong>Version:</strong> {version}
      <span style={{ margin: '0 16px', opacity: 0.7 }}>|</span>
      <strong>Next Review:</strong> {formatDate(new Date(effectiveDate.getFullYear() + 1, effectiveDate.getMonth(), effectiveDate.getDate()))}
    </LastUpdatedContainer>
  );
}; 