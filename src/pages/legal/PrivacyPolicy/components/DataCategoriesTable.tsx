import React from 'react';
import styled from 'styled-components';
import { dataCategories, type DataCategory } from '../data/dataCategoriesConfig';

const PREMIUM_SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64
};

const PREMIUM_COLORS = {
  primary: '#1a365d',
  secondary: '#d69e2e',
  background: '#f7fafc',
  border: '#e2e8f0',
  highlight: '#edf2f7',
  text: '#2d3748'
};

const TableContainer = styled.div`
  margin: ${PREMIUM_SPACING.xl}px 0;
  overflow-x: auto;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const DataTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 12px;
  overflow: hidden;

  th {
    background: ${PREMIUM_COLORS.primary};
    color: white;
    padding: ${PREMIUM_SPACING.lg}px;
    text-align: left;
    font-weight: 600;
    font-size: 1rem;
    position: sticky;
    top: 0;
    z-index: 10;
  }

  td {
    padding: ${PREMIUM_SPACING.lg}px;
    border-bottom: 1px solid ${PREMIUM_COLORS.border};
    vertical-align: top;
  }

  tr:hover {
    background-color: ${PREMIUM_COLORS.highlight};
  }

  tr:last-child td {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    
    th, td {
      padding: ${PREMIUM_SPACING.md}px;
    }
  }
`;

const CategoryHeader = styled.td`
  background: linear-gradient(135deg, ${PREMIUM_COLORS.highlight} 0%, #e2e8f0 100%);
  font-weight: 600;
  color: ${PREMIUM_COLORS.primary};
  font-size: 1.125rem;
  border-left: 4px solid ${PREMIUM_COLORS.secondary};
`;

const DataTypeList = styled.ul`
  margin: 0;
  padding-left: ${PREMIUM_SPACING.lg}px;
  
  li {
    margin-bottom: ${PREMIUM_SPACING.xs}px;
    color: ${PREMIUM_COLORS.text};
  }
`;

const PurposeList = styled.ul`
  margin: 0;
  padding-left: ${PREMIUM_SPACING.lg}px;
  
  li {
    margin-bottom: ${PREMIUM_SPACING.xs}px;
    color: ${PREMIUM_COLORS.text};
  }
`;

const LegalBasisBadge = styled.span`
  background: ${PREMIUM_COLORS.secondary}20;
  color: ${PREMIUM_COLORS.primary};
  padding: ${PREMIUM_SPACING.xs}px ${PREMIUM_SPACING.sm}px;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: 500;
  display: inline-block;
  margin-bottom: ${PREMIUM_SPACING.xs}px;
`;

const RetentionInfo = styled.div`
  background: ${PREMIUM_COLORS.highlight};
  padding: ${PREMIUM_SPACING.md}px;
  border-radius: 6px;
  border-left: 3px solid ${PREMIUM_COLORS.secondary};
  font-size: 0.9rem;
  color: ${PREMIUM_COLORS.text};
  
  strong {
    color: ${PREMIUM_COLORS.primary};
  }
`;

const SensitivityIndicator = styled.div<{ level: 'standard' | 'high' | 'privileged' }>`
  display: inline-flex;
  align-items: center;
  padding: ${PREMIUM_SPACING.xs}px ${PREMIUM_SPACING.sm}px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  
  ${props => {
    switch (props.level) {
      case 'high':
        return `
          background: #fed7d7;
          color: #c53030;
          border: 1px solid #feb2b2;
        `;
      case 'privileged':
        return `
          background: #e6fffa;
          color: #2c7a7b;
          border: 1px solid #9ae6b4;
        `;
      default:
        return `
          background: #edf2f7;
          color: #4a5568;
          border: 1px solid #cbd5e0;
        `;
    }
  }}
  
  &::before {
    content: '●';
    margin-right: ${PREMIUM_SPACING.xs}px;
  }
`;

const getSensitivityLevel = (sensitivity: string): 'standard' | 'high' | 'privileged' => {
  if (sensitivity.includes('Highly sensitive')) return 'high';
  if (sensitivity.includes('privileged')) return 'privileged';
  return 'standard';
};

export const DataCategoriesTable: React.FC = () => {
  return (
    <TableContainer>
      <DataTable>
        <thead>
          <tr>
            <th>Data Category</th>
            <th>Data Types</th>
            <th>Processing Purposes</th>
            <th>Legal Basis</th>
            <th>Retention Period</th>
            <th>Sensitivity Level</th>
          </tr>
        </thead>
        <tbody>
          {dataCategories.map((category: DataCategory, index: number) => (
            <tr key={index}>
              <CategoryHeader>
                <strong>{category.category}</strong>
                <div style={{ fontSize: '0.9rem', marginTop: `${PREMIUM_SPACING.xs}px`, fontWeight: 'normal' }}>
                  {category.description}
                </div>
              </CategoryHeader>
              
              <td>
                <DataTypeList>
                  {category.dataTypes.map((dataType, idx) => (
                    <li key={idx}>{dataType}</li>
                  ))}
                </DataTypeList>
              </td>
              
              <td>
                <PurposeList>
                  {category.purposes.map((purpose, idx) => (
                    <li key={idx}>{purpose}</li>
                  ))}
                </PurposeList>
              </td>
              
              <td>
                <LegalBasisBadge>
                  {category.legalBasis}
                </LegalBasisBadge>
              </td>
              
              <td>
                <RetentionInfo>
                  <strong>Retention:</strong><br />
                  {category.retention}
                </RetentionInfo>
              </td>
              
              <td>
                <SensitivityIndicator level={getSensitivityLevel(category.sensitivity)}>
                  {getSensitivityLevel(category.sensitivity) === 'high' ? 'High Security' :
                   getSensitivityLevel(category.sensitivity) === 'privileged' ? 'Privileged' : 
                   'Standard'}
                </SensitivityIndicator>
                <div style={{ fontSize: '0.8rem', marginTop: `${PREMIUM_SPACING.xs}px`, color: '#4a5568' }}>
                  {category.sensitivity}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </DataTable>
    </TableContainer>
  );
}; 