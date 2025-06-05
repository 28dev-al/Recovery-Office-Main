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
  warning: '#ed8936',
  info: '#3182ce',
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

export const SecurityContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${PREMIUM_SPACING.xl}px ${PREMIUM_SPACING.lg}px;
  background: ${PREMIUM_COLORS.background};
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
    background: white;
  }
`;

export const SecurityHeader = styled.header`
  text-align: center;
  margin-bottom: ${PREMIUM_SPACING.xxxl}px;
  padding: ${PREMIUM_SPACING.xxl}px;
  background: linear-gradient(135deg, ${PREMIUM_COLORS.info} 0%, ${PREMIUM_COLORS.primary} 100%);
  border-radius: 12px;
  color: white;

  @media (max-width: 768px) {
    padding: ${PREMIUM_SPACING.xl}px ${PREMIUM_SPACING.lg}px;
  }
`;

export const SecurityTitle = styled.h1`
  font-size: ${TYPOGRAPHY.sizes.xxxl};
  font-weight: ${TYPOGRAPHY.weights.bold};
  margin-bottom: ${PREMIUM_SPACING.md}px;
  color: white;

  @media (max-width: 768px) {
    font-size: ${TYPOGRAPHY.sizes.xxl};
  }
`;

export const SecuritySubtitle = styled.p`
  font-size: ${TYPOGRAPHY.sizes.lg};
  color: #e2e8f0;
  font-weight: ${TYPOGRAPHY.weights.medium};
  margin-bottom: ${PREMIUM_SPACING.lg}px;

  @media (max-width: 768px) {
    font-size: ${TYPOGRAPHY.sizes.md};
  }
`;

export const LastUpdated = styled.div`
  background: rgba(255, 255, 255, 0.2);
  padding: ${PREMIUM_SPACING.md}px ${PREMIUM_SPACING.lg}px;
  border-radius: 8px;
  backdrop-filter: blur(10px);
  font-size: ${TYPOGRAPHY.sizes.sm};
  margin-bottom: ${PREMIUM_SPACING.lg}px;

  strong {
    color: ${PREMIUM_COLORS.secondary};
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
  background: linear-gradient(90deg, ${PREMIUM_COLORS.info}, transparent);
  margin: ${PREMIUM_SPACING.xxxl}px 0;
`;

export const SecurityNotice = styled.div`
  background: #e3f2fd;
  border-left: 4px solid ${PREMIUM_COLORS.info};
  padding: ${PREMIUM_SPACING.lg}px;
  margin: ${PREMIUM_SPACING.xl}px 0;
  border-radius: 0 8px 8px 0;

  h4 {
    color: ${PREMIUM_COLORS.info};
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
`;

export const ComplianceHighlight = styled.div`
  background: #e8f5e8;
  border-left: 4px solid ${PREMIUM_COLORS.success};
  padding: ${PREMIUM_SPACING.lg}px;
  margin: ${PREMIUM_SPACING.xl}px 0;
  border-radius: 0 8px 8px 0;

  h4 {
    color: ${PREMIUM_COLORS.success};
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
`;

export const CertificationGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${PREMIUM_SPACING.xl}px;
  margin: ${PREMIUM_SPACING.xl}px 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: ${PREMIUM_SPACING.lg}px;
  }
`;

export const CertificationCard = styled.div`
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
    display: flex;
    align-items: center;
    gap: ${PREMIUM_SPACING.sm}px;
  }

  p {
    margin-bottom: ${PREMIUM_SPACING.sm}px;
    color: ${PREMIUM_COLORS.text};
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
    color: ${PREMIUM_COLORS.text};
  }

  strong {
    color: ${PREMIUM_COLORS.primary};
  }

  @media print {
    box-shadow: none;
    border: 1px solid black;
  }
`;

export const ComplianceTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: ${PREMIUM_SPACING.lg}px 0;
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
    background: rgba(49, 130, 206, 0.1);
  }

  .standard-name {
    font-weight: ${TYPOGRAPHY.weights.semibold};
    color: ${PREMIUM_COLORS.primary};
  }

  .compliance-status {
    font-weight: ${TYPOGRAPHY.weights.semibold};
  }

  .status-compliant {
    color: ${PREMIUM_COLORS.success};
  }

  .status-certified {
    color: ${PREMIUM_COLORS.info};
  }

  .status-in-progress {
    color: ${PREMIUM_COLORS.warning};
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

export const SecurityFrameworkContainer = styled.section`
  margin-bottom: ${PREMIUM_SPACING.xxxl}px;
  scroll-margin-top: ${PREMIUM_SPACING.xxl}px;

  h2 {
    color: ${PREMIUM_COLORS.primary};
    font-size: ${TYPOGRAPHY.sizes.xxl};
    font-weight: ${TYPOGRAPHY.weights.semibold};
    margin: ${PREMIUM_SPACING.xxxl}px 0 ${PREMIUM_SPACING.xl}px 0;
    border-left: 4px solid ${PREMIUM_COLORS.secondary};
    padding-left: ${PREMIUM_SPACING.md}px;
  }

  h3 {
    color: ${PREMIUM_COLORS.primary};
    font-size: ${TYPOGRAPHY.sizes.xl};
    margin: ${PREMIUM_SPACING.xl}px 0 ${PREMIUM_SPACING.lg}px 0;
  }

  h4 {
    color: ${PREMIUM_COLORS.primary};
    margin: ${PREMIUM_SPACING.lg}px 0 ${PREMIUM_SPACING.md}px 0;
  }

  ul {
    margin: ${PREMIUM_SPACING.lg}px 0;
    padding-left: ${PREMIUM_SPACING.xl}px;
  }

  li {
    margin-bottom: ${PREMIUM_SPACING.md}px;
    color: ${PREMIUM_COLORS.text};
  }

  strong {
    color: ${PREMIUM_COLORS.primary};
    font-weight: ${TYPOGRAPHY.weights.semibold};
  }

  @media (max-width: 768px) {
    h2 {
      font-size: ${TYPOGRAPHY.sizes.xl};
      margin: ${PREMIUM_SPACING.xxl}px 0 ${PREMIUM_SPACING.lg}px 0;
    }
  }

  @media print {
    page-break-inside: avoid;
    margin-bottom: ${PREMIUM_SPACING.xl}px;

    h2, h3, h4, strong {
      color: black;
      border-left: 2px solid black;
    }
  }
`; 