import styled from 'styled-components';

// Design system tokens
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
  surface: '#ffffff',
  border: '#e2e8f0',
  highlight: '#edf2f7',
  text: '#2d3748',
  textSecondary: '#4a5568',
  textLight: '#718096',
  warning: '#d69e2e',
  success: '#38a169',
  error: '#e53e3e'
};

const TYPOGRAPHY = {
  fontFamily: {
    primary: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    mono: 'SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'
  },
  sizes: {
    xs: '0.75rem',     // 12px
    sm: '0.875rem',    // 14px
    md: '1rem',        // 16px
    lg: '1.125rem',    // 18px
    xl: '1.25rem',     // 20px
    xxl: '1.5rem',     // 24px
    xxxl: '2rem',      // 32px
    xxxxl: '2.5rem'    // 40px
  },
  weights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700
  },
  lineHeights: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.7
  }
};

// Main container
export const TermsContainer = styled.div`
  background: linear-gradient(135deg, ${PREMIUM_COLORS.background} 0%, #f8fafc 100%);
  min-height: 100vh;
  font-family: ${TYPOGRAPHY.fontFamily.primary};
  color: ${PREMIUM_COLORS.text};
  line-height: ${TYPOGRAPHY.lineHeights.relaxed};
`;

// Layout components
export const ContentLayout = styled.div`
  display: grid;
  grid-template-columns: 350px 1fr;
  gap: ${PREMIUM_SPACING.xl}px;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 ${PREMIUM_SPACING.lg}px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: ${PREMIUM_SPACING.lg}px;
  }

  @media (max-width: 768px) {
    padding: 0 ${PREMIUM_SPACING.md}px;
  }
`;

export const MainContent = styled.main`
  background: ${PREMIUM_COLORS.surface};
  border-radius: 12px;
  padding: ${PREMIUM_SPACING.xl}px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  
  h1 {
    color: ${PREMIUM_COLORS.primary};
    font-size: ${TYPOGRAPHY.sizes.xxxl};
    font-weight: ${TYPOGRAPHY.weights.bold};
    margin: 0 0 ${PREMIUM_SPACING.lg}px 0;
    letter-spacing: -0.02em;
    line-height: ${TYPOGRAPHY.lineHeights.tight};
  }

  h2 {
    color: ${PREMIUM_COLORS.primary};
    font-size: ${TYPOGRAPHY.sizes.xxl};
    font-weight: ${TYPOGRAPHY.weights.semibold};
    margin: ${PREMIUM_SPACING.xxl}px 0 ${PREMIUM_SPACING.lg}px 0;
    border-bottom: 3px solid ${PREMIUM_COLORS.secondary};
    padding-bottom: ${PREMIUM_SPACING.sm}px;
    line-height: ${TYPOGRAPHY.lineHeights.tight};
  }

  h3 {
    color: ${PREMIUM_COLORS.text};
    font-size: ${TYPOGRAPHY.sizes.xl};
    font-weight: ${TYPOGRAPHY.weights.semibold};
    margin: ${PREMIUM_SPACING.xl}px 0 ${PREMIUM_SPACING.md}px 0;
    line-height: ${TYPOGRAPHY.lineHeights.normal};
  }

  h4 {
    color: ${PREMIUM_COLORS.primary};
    font-size: ${TYPOGRAPHY.sizes.lg};
    font-weight: ${TYPOGRAPHY.weights.medium};
    margin: ${PREMIUM_SPACING.lg}px 0 ${PREMIUM_SPACING.sm}px 0;
    line-height: ${TYPOGRAPHY.lineHeights.normal};
  }

  p {
    color: ${PREMIUM_COLORS.textSecondary};
    font-size: ${TYPOGRAPHY.sizes.md};
    line-height: ${TYPOGRAPHY.lineHeights.relaxed};
    margin-bottom: ${PREMIUM_SPACING.md}px;
  }

  ul, ol {
    color: ${PREMIUM_COLORS.textSecondary};
    font-size: ${TYPOGRAPHY.sizes.md};
    line-height: ${TYPOGRAPHY.lineHeights.relaxed};
    margin: ${PREMIUM_SPACING.md}px 0;
    padding-left: ${PREMIUM_SPACING.xl}px;

    li {
      margin-bottom: ${PREMIUM_SPACING.sm}px;
    }

    li strong {
      color: ${PREMIUM_COLORS.primary};
    }
  }

  @media (max-width: 768px) {
    padding: ${PREMIUM_SPACING.lg}px;

    h1 {
      font-size: ${TYPOGRAPHY.sizes.xxl};
    }

    h2 {
      font-size: ${TYPOGRAPHY.sizes.xl};
    }

    h3 {
      font-size: ${TYPOGRAPHY.sizes.lg};
    }
  }
`;

// Section components
export const SectionDivider = styled.hr`
  border: none;
  height: 2px;
  background: linear-gradient(90deg, ${PREMIUM_COLORS.secondary}, transparent);
  margin: ${PREMIUM_SPACING.xxxl}px 0;
`;

// Professional cards and containers
export const ProfessionalCard = styled.div`
  background: ${PREMIUM_COLORS.surface};
  border: 1px solid ${PREMIUM_COLORS.border};
  border-radius: 12px;
  padding: ${PREMIUM_SPACING.xl}px;
  margin: ${PREMIUM_SPACING.lg}px 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }

  h4 {
    margin-top: 0;
  }

  @media (max-width: 768px) {
    padding: ${PREMIUM_SPACING.lg}px;
  }
`;

// Company information grid
export const CompanyInfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${PREMIUM_SPACING.lg}px;
  margin-top: ${PREMIUM_SPACING.lg}px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: ${PREMIUM_SPACING.md}px;
  }
`;

export const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${PREMIUM_SPACING.xs}px;
  padding: ${PREMIUM_SPACING.md}px;
  background: ${PREMIUM_COLORS.highlight};
  border-radius: 8px;
  border-left: 4px solid ${PREMIUM_COLORS.secondary};
`;

export const InfoLabel = styled.span`
  font-size: ${TYPOGRAPHY.sizes.sm};
  font-weight: ${TYPOGRAPHY.weights.semibold};
  color: ${PREMIUM_COLORS.primary};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const InfoValue = styled.span`
  font-size: ${TYPOGRAPHY.sizes.md};
  color: ${PREMIUM_COLORS.text};
  font-weight: ${TYPOGRAPHY.weights.medium};
`;

// Credentials list
export const CredentialsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${PREMIUM_SPACING.lg}px;
`;

export const CredentialItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${PREMIUM_SPACING.md}px;
  padding: ${PREMIUM_SPACING.lg}px;
  background: ${PREMIUM_COLORS.highlight};
  border-radius: 12px;
  border-left: 4px solid ${PREMIUM_COLORS.secondary};
  transition: all 0.3s ease;

  &:hover {
    background: ${PREMIUM_COLORS.border};
    transform: translateX(4px);
  }
`;

export const CredentialIcon = styled.div`
  font-size: ${TYPOGRAPHY.sizes.xl};
  flex-shrink: 0;
  margin-top: ${PREMIUM_SPACING.xs}px;
`;

export const CredentialContent = styled.div`
  color: ${PREMIUM_COLORS.text};
  font-size: ${TYPOGRAPHY.sizes.md};
  line-height: ${TYPOGRAPHY.lineHeights.relaxed};

  strong {
    color: ${PREMIUM_COLORS.primary};
    font-weight: ${TYPOGRAPHY.weights.semibold};
  }
`;

// Notice components
export const ImportantNotice = styled.div`
  background: linear-gradient(135deg, ${PREMIUM_COLORS.warning}15 0%, ${PREMIUM_COLORS.warning}08 100%);
  border: 1px solid ${PREMIUM_COLORS.warning};
  border-left: 4px solid ${PREMIUM_COLORS.warning};
  border-radius: 12px;
  padding: ${PREMIUM_SPACING.xl}px;
  margin: ${PREMIUM_SPACING.xl}px 0;

  h4 {
    color: ${PREMIUM_COLORS.warning};
    margin: 0 0 ${PREMIUM_SPACING.md}px 0;
    display: flex;
    align-items: center;
    gap: ${PREMIUM_SPACING.sm}px;
    font-size: ${TYPOGRAPHY.sizes.lg};
  }

  p {
    margin: 0;
    color: ${PREMIUM_COLORS.text};
    font-size: ${TYPOGRAPHY.sizes.md};
  }

  ul {
    margin: ${PREMIUM_SPACING.md}px 0 0 0;
    color: ${PREMIUM_COLORS.text};
  }
`;

export const LegalHighlight = styled.div`
  background: linear-gradient(135deg, ${PREMIUM_COLORS.primary}10 0%, ${PREMIUM_COLORS.primary}05 100%);
  border: 1px solid ${PREMIUM_COLORS.primary}40;
  border-left: 4px solid ${PREMIUM_COLORS.primary};
  border-radius: 12px;
  padding: ${PREMIUM_SPACING.xl}px;
  margin: ${PREMIUM_SPACING.xl}px 0;

  h3, h4 {
    color: ${PREMIUM_COLORS.primary};
    margin-top: 0;
    margin-bottom: ${PREMIUM_SPACING.md}px;
  }

  p {
    margin-bottom: ${PREMIUM_SPACING.md}px;
    color: ${PREMIUM_COLORS.text};
  }

  p:last-child {
    margin-bottom: 0;
  }

  ul {
    margin: ${PREMIUM_SPACING.md}px 0;
    color: ${PREMIUM_COLORS.text};
  }

  strong {
    color: ${PREMIUM_COLORS.primary};
  }
`;

// Table components
export const ProfessionalTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: ${PREMIUM_SPACING.xl}px 0;
  background: ${PREMIUM_COLORS.surface};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

  thead {
    background: ${PREMIUM_COLORS.primary};

    th {
      color: white;
      padding: ${PREMIUM_SPACING.lg}px;
      text-align: left;
      font-weight: ${TYPOGRAPHY.weights.semibold};
      font-size: ${TYPOGRAPHY.sizes.md};
      border-bottom: none;
    }
  }

  tbody {
    tr {
      border-bottom: 1px solid ${PREMIUM_COLORS.border};
      transition: background-color 0.2s ease;

      &:hover {
        background-color: ${PREMIUM_COLORS.highlight};
      }

      &:last-child {
        border-bottom: none;
      }
    }

    td {
      padding: ${PREMIUM_SPACING.lg}px;
      color: ${PREMIUM_COLORS.text};
      vertical-align: top;
      font-size: ${TYPOGRAPHY.sizes.md};

      strong {
        color: ${PREMIUM_COLORS.primary};
        font-weight: ${TYPOGRAPHY.weights.semibold};
      }
    }
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

// Service grid components
export const ServiceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: ${PREMIUM_SPACING.xl}px;
  margin: ${PREMIUM_SPACING.xl}px 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: ${PREMIUM_SPACING.lg}px;
  }
`;

export const ServiceCard = styled.div`
  background: ${PREMIUM_COLORS.surface};
  border: 2px solid ${PREMIUM_COLORS.border};
  border-radius: 12px;
  padding: ${PREMIUM_SPACING.xl}px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    border-color: ${PREMIUM_COLORS.secondary};
  }

  h4 {
    color: ${PREMIUM_COLORS.primary};
    font-size: ${TYPOGRAPHY.sizes.xl};
    margin: 0 0 ${PREMIUM_SPACING.lg}px 0;
    display: flex;
    align-items: center;
    gap: ${PREMIUM_SPACING.md}px;
  }

  .service-icon {
    font-size: ${TYPOGRAPHY.sizes.xxl};
    opacity: 0.8;
  }

  .service-details {
    background: ${PREMIUM_COLORS.highlight};
    padding: ${PREMIUM_SPACING.md}px;
    border-radius: 8px;
    margin: ${PREMIUM_SPACING.md}px 0;

    p {
      margin: ${PREMIUM_SPACING.xs}px 0;
      font-size: ${TYPOGRAPHY.sizes.sm};

      strong {
        color: ${PREMIUM_COLORS.primary};
      }
    }
  }

  .service-description {
    color: ${PREMIUM_COLORS.textSecondary};
    font-size: ${TYPOGRAPHY.sizes.md};
    line-height: ${TYPOGRAPHY.lineHeights.relaxed};
    margin-top: ${PREMIUM_SPACING.md}px;
  }

  .fee-highlight {
    background: ${PREMIUM_COLORS.secondary}20;
    color: ${PREMIUM_COLORS.primary};
    padding: ${PREMIUM_SPACING.sm}px ${PREMIUM_SPACING.md}px;
    border-radius: 6px;
    font-weight: ${TYPOGRAPHY.weights.semibold};
    font-size: ${TYPOGRAPHY.sizes.lg};
    text-align: center;
    margin-top: ${PREMIUM_SPACING.md}px;
  }
`;

// Timeline components
export const TimelineContainer = styled.div`
  position: relative;
  padding-left: ${PREMIUM_SPACING.xl}px;
  margin: ${PREMIUM_SPACING.xl}px 0;

  &::before {
    content: '';
    position: absolute;
    left: ${PREMIUM_SPACING.md}px;
    top: 0;
    bottom: 0;
    width: 2px;
    background: ${PREMIUM_COLORS.secondary};
  }
`;

export const TimelineStep = styled.div`
  position: relative;
  margin-bottom: ${PREMIUM_SPACING.xl}px;
  
  &::before {
    content: '';
    position: absolute;
    left: -${PREMIUM_SPACING.xl + 6}px;
    top: ${PREMIUM_SPACING.sm}px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: ${PREMIUM_COLORS.secondary};
    border: 3px solid ${PREMIUM_COLORS.surface};
    box-shadow: 0 0 0 3px ${PREMIUM_COLORS.secondary}40;
  }

  h4 {
    color: ${PREMIUM_COLORS.primary};
    margin: 0 0 ${PREMIUM_SPACING.sm}px 0;
  }

  p {
    margin: 0;
    color: ${PREMIUM_COLORS.textSecondary};
  }
`;

// Contact section components
export const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${PREMIUM_SPACING.xl}px;
  margin: ${PREMIUM_SPACING.xl}px 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: ${PREMIUM_SPACING.lg}px;
  }
`;

export const ContactCard = styled.div`
  background: ${PREMIUM_COLORS.surface};
  border: 2px solid ${PREMIUM_COLORS.border};
  border-radius: 12px;
  padding: ${PREMIUM_SPACING.xl}px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    border-color: ${PREMIUM_COLORS.secondary};
  }

  h4 {
    color: ${PREMIUM_COLORS.primary};
    margin: 0 0 ${PREMIUM_SPACING.lg}px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${PREMIUM_SPACING.md}px;
  }

  .contact-icon {
    font-size: ${TYPOGRAPHY.sizes.xl};
  }

  .contact-details {
    text-align: left;
    
    p {
      margin: ${PREMIUM_SPACING.sm}px 0;
      
      strong {
        color: ${PREMIUM_COLORS.primary};
      }
    }
  }
`;

// Responsive utilities
export const ResponsiveHide = styled.div<{ breakpoint: 'mobile' | 'tablet' | 'desktop' }>`
  @media (max-width: ${props => {
    switch (props.breakpoint) {
      case 'mobile': return '768px';
      case 'tablet': return '1024px';
      case 'desktop': return '1200px';
      default: return '768px';
    }
  }}) {
    display: none;
  }
`;

export const ResponsiveShow = styled.div<{ breakpoint: 'mobile' | 'tablet' | 'desktop' }>`
  display: none;
  
  @media (max-width: ${props => {
    switch (props.breakpoint) {
      case 'mobile': return '768px';
      case 'tablet': return '1024px';
      case 'desktop': return '1200px';
      default: return '768px';
    }
  }}) {
    display: block;
  }
`;

// Print styles
export const PrintOptimized = styled.div`
  @media print {
    background: white !important;
    color: black !important;
    box-shadow: none !important;
    border: 1px solid black !important;
    page-break-inside: avoid;
  }
`; 