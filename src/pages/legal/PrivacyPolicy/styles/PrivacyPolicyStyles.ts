import styled from 'styled-components';

// Import design system tokens
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
  success: '#38a169',
  error: '#e53e3e',
  background: '#f7fafc',
  text: '#2d3748',
  textLight: '#4a5568',
  border: '#e2e8f0',
  highlight: '#edf2f7'
};

const TYPOGRAPHY = {
  sizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    xxl: '1.5rem',
    xxxl: '2rem'
  },
  weights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700
  }
};

export const PolicyContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${PREMIUM_SPACING.xl}px ${PREMIUM_SPACING.lg}px;
  color: ${PREMIUM_COLORS.text};
  line-height: 1.7;
  font-size: ${TYPOGRAPHY.sizes.md};

  @media (max-width: 768px) {
    padding: ${PREMIUM_SPACING.lg}px ${PREMIUM_SPACING.md}px;
  }

  @media print {
    max-width: none;
    padding: ${PREMIUM_SPACING.md}px;
    color: black;
  }
`;

export const PolicyHeader = styled.header`
  text-align: center;
  margin-bottom: ${PREMIUM_SPACING.xxxl}px;
  padding: ${PREMIUM_SPACING.xxl}px 0;
  background: linear-gradient(135deg, ${PREMIUM_COLORS.primary} 0%, #2c5282 100%);
  border-radius: 12px;
  color: white;
  margin-left: -${PREMIUM_SPACING.lg}px;
  margin-right: -${PREMIUM_SPACING.lg}px;

  @media (max-width: 768px) {
    margin-left: -${PREMIUM_SPACING.md}px;
    margin-right: -${PREMIUM_SPACING.md}px;
    padding: ${PREMIUM_SPACING.xl}px ${PREMIUM_SPACING.lg}px;
  }
`;

export const PolicyTitle = styled.h1`
  font-size: ${TYPOGRAPHY.sizes.xxxl};
  font-weight: ${TYPOGRAPHY.weights.bold};
  margin-bottom: ${PREMIUM_SPACING.md}px;
  color: white;

  @media (max-width: 768px) {
    font-size: ${TYPOGRAPHY.sizes.xxl};
  }
`;

export const PolicySubtitle = styled.p`
  font-size: ${TYPOGRAPHY.sizes.lg};
  color: #e2e8f0;
  font-weight: ${TYPOGRAPHY.weights.medium};
  margin-bottom: ${PREMIUM_SPACING.lg}px;

  @media (max-width: 768px) {
    font-size: ${TYPOGRAPHY.sizes.md};
  }
`;

export const TableOfContents = styled.nav`
  background: ${PREMIUM_COLORS.highlight};
  border: 2px solid ${PREMIUM_COLORS.border};
  border-radius: 8px;
  padding: ${PREMIUM_SPACING.xl}px;
  margin-bottom: ${PREMIUM_SPACING.xxxl}px;

  h3 {
    color: ${PREMIUM_COLORS.primary};
    font-size: ${TYPOGRAPHY.sizes.xl};
    font-weight: ${TYPOGRAPHY.weights.semibold};
    margin-bottom: ${PREMIUM_SPACING.lg}px;
    margin-top: 0;
  }

  @media print {
    page-break-inside: avoid;
  }
`;

export const TOCLink = styled.button`
  display: block;
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  color: ${PREMIUM_COLORS.primary};
  padding: ${PREMIUM_SPACING.sm}px 0;
  margin-bottom: ${PREMIUM_SPACING.xs}px;
  cursor: pointer;
  font-size: ${TYPOGRAPHY.sizes.md};
  transition: all 0.3s ease;
  text-decoration: none;

  &:hover {
    color: ${PREMIUM_COLORS.secondary};
    padding-left: ${PREMIUM_SPACING.md}px;
    transform: translateX(4px);
  }

  &:focus {
    outline: 2px solid ${PREMIUM_COLORS.secondary};
    outline-offset: 2px;
  }

  @media print {
    color: black;
  }
`;

export const SectionDivider = styled.hr`
  border: none;
  height: 2px;
  background: linear-gradient(90deg, ${PREMIUM_COLORS.secondary}, transparent);
  margin: ${PREMIUM_SPACING.xxxl}px 0;
`;

export const LegalNotice = styled.div`
  background: #fff8e1;
  border-left: 4px solid ${PREMIUM_COLORS.secondary};
  padding: ${PREMIUM_SPACING.lg}px;
  margin: ${PREMIUM_SPACING.xl}px 0;
  border-radius: 0 8px 8px 0;

  h4 {
    color: ${PREMIUM_COLORS.primary};
    margin-top: 0;
    margin-bottom: ${PREMIUM_SPACING.md}px;
  }

  p {
    margin-bottom: ${PREMIUM_SPACING.md}px;
  }

  p:last-child {
    margin-bottom: 0;
  }

  ul {
    margin: ${PREMIUM_SPACING.md}px 0;
    padding-left: ${PREMIUM_SPACING.xl}px;
  }

  li {
    margin-bottom: ${PREMIUM_SPACING.sm}px;
  }

  a {
    color: ${PREMIUM_COLORS.primary};
    text-decoration: underline;

    &:hover {
      color: ${PREMIUM_COLORS.secondary};
    }
  }
`;

export const DataCategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${PREMIUM_SPACING.xl}px;
  margin: ${PREMIUM_SPACING.xl}px 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: ${PREMIUM_SPACING.lg}px;
  }
`;

export const DataCategoryCard = styled.div`
  background: white;
  border: 2px solid ${PREMIUM_COLORS.border};
  border-radius: 8px;
  padding: ${PREMIUM_SPACING.xl}px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  }

  h4 {
    color: ${PREMIUM_COLORS.primary};
    font-size: ${TYPOGRAPHY.sizes.lg};
    font-weight: ${TYPOGRAPHY.weights.semibold};
    margin-bottom: ${PREMIUM_SPACING.md}px;
    margin-top: 0;
  }

  ul {
    margin: ${PREMIUM_SPACING.md}px 0;
    padding-left: ${PREMIUM_SPACING.xl}px;
  }

  li {
    margin-bottom: ${PREMIUM_SPACING.sm}px;
    color: ${PREMIUM_COLORS.text};
  }

  .legal-basis {
    background: ${PREMIUM_COLORS.highlight};
    padding: ${PREMIUM_SPACING.md}px;
    border-radius: 4px;
    margin-top: ${PREMIUM_SPACING.lg}px;
    font-size: ${TYPOGRAPHY.sizes.sm};
    color: ${PREMIUM_COLORS.textLight};
  }

  @media print {
    box-shadow: none;
    border: 1px solid black;
  }
`;

export const SecurityGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${PREMIUM_SPACING.lg}px;
  margin: ${PREMIUM_SPACING.xl}px 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const SecurityFeature = styled.div`
  background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
  border: 1px solid ${PREMIUM_COLORS.border};
  border-radius: 8px;
  padding: ${PREMIUM_SPACING.lg}px;
  text-align: center;

  h4 {
    color: ${PREMIUM_COLORS.primary};
    font-size: ${TYPOGRAPHY.sizes.lg};
    margin-bottom: ${PREMIUM_SPACING.md}px;
    margin-top: 0;
  }

  ul {
    text-align: left;
    margin: ${PREMIUM_SPACING.md}px 0;
    padding-left: ${PREMIUM_SPACING.xl}px;
  }

  li {
    margin-bottom: ${PREMIUM_SPACING.sm}px;
    color: ${PREMIUM_COLORS.text};
  }
`;

export const ContactSection = styled.section`
  background: linear-gradient(135deg, ${PREMIUM_COLORS.primary} 0%, #2c5282 100%);
  color: white;
  padding: ${PREMIUM_SPACING.xxl}px;
  border-radius: 12px;
  margin: ${PREMIUM_SPACING.xxxl}px 0;

  h3 {
    color: white;
    font-size: ${TYPOGRAPHY.sizes.xl};
    margin-bottom: ${PREMIUM_SPACING.xl}px;
    text-align: center;
  }
`;

export const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${PREMIUM_SPACING.xl}px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: ${PREMIUM_SPACING.lg}px;
  }
`;

export const ContactItem = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: ${PREMIUM_SPACING.lg}px;
  backdrop-filter: blur(10px);

  strong {
    display: block;
    color: ${PREMIUM_COLORS.secondary};
    font-size: ${TYPOGRAPHY.sizes.lg};
    margin-bottom: ${PREMIUM_SPACING.md}px;
  }

  p {
    margin-bottom: ${PREMIUM_SPACING.sm}px;
    color: #e2e8f0;
  }

  p:last-child {
    margin-bottom: 0;
  }
`;

export const RightsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: ${PREMIUM_SPACING.xl}px 0;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  th {
    background: ${PREMIUM_COLORS.primary};
    color: white;
    padding: ${PREMIUM_SPACING.lg}px;
    text-align: left;
    font-weight: ${TYPOGRAPHY.weights.semibold};
    font-size: ${TYPOGRAPHY.sizes.md};
  }

  td {
    padding: ${PREMIUM_SPACING.lg}px;
    border-bottom: 1px solid ${PREMIUM_COLORS.border};
    vertical-align: top;
  }

  tr:nth-child(even) {
    background: ${PREMIUM_COLORS.highlight};
  }

  tr:hover {
    background: rgba(214, 158, 46, 0.1);
  }

  .right-name {
    font-weight: ${TYPOGRAPHY.weights.semibold};
    color: ${PREMIUM_COLORS.primary};
  }

  .how-to-exercise {
    font-size: ${TYPOGRAPHY.sizes.sm};
    color: ${PREMIUM_COLORS.textLight};
  }

  @media (max-width: 768px) {
    font-size: ${TYPOGRAPHY.sizes.sm};

    th, td {
      padding: ${PREMIUM_SPACING.md}px;
    }
  }

  @media print {
    box-shadow: none;
    border: 1px solid black;
  }
`;

export const LastUpdatedContainer = styled.div`
  background: rgba(255, 255, 255, 0.2);
  padding: ${PREMIUM_SPACING.md}px ${PREMIUM_SPACING.lg}px;
  border-radius: 8px;
  backdrop-filter: blur(10px);
  text-align: center;
  font-size: ${TYPOGRAPHY.sizes.sm};
  color: #e2e8f0;

  strong {
    color: ${PREMIUM_COLORS.secondary};
  }
`; 