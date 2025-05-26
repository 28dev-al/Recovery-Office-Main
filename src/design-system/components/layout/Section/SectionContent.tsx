import * as React from 'react';
import styled from 'styled-components';
import { PHI, PHI_INVERSE } from '../../../../constants/sacred-geometry';
import { lightTheme as theme } from '../../../theme';

export interface SectionContentProps {
  /** The content to be displayed */
  children: React.ReactNode;
  
  /** Alignment of the content */
  align?: 'left' | 'center' | 'right';
  
  /** Whether content should span full width or follow golden ratio width constraints */
  fullWidth?: boolean;
  
  /** Additional styles to apply */
  style?: React.CSSProperties;
  
  /** Optional className for the container */
  className?: string;
  
  /** Number of columns to display content in */
  columns?: 1 | 2 | 3 | 5 | 8;
  
  /** Gap between columns using Fibonacci sequence values */
  columnGap?: 1 | 2 | 3 | 5 | 8 | 13;
}

/**
 * Calculate column width based on sacred geometry
 * Using golden ratio to determine width proportions
 */
const getColumnWidth = (columns: number, fullWidth: boolean) => {
  if (columns === 1) return '100%';
  
  // For multiple columns, apply PHI-based relationships
  if (fullWidth) {
    return `calc(${100 / columns}% - ${theme.spacing.md}px)`;
  }
  
  // For non-fullWidth, apply additional golden ratio constraint
  return `calc(${(100 * PHI_INVERSE) / columns}% - ${theme.spacing.lg}px)`;
};

/**
 * Get column gap value from Fibonacci sequence
 */
const getColumnGap = (gap: SectionContentProps['columnGap']) => {
  const gapMapping = {
    1: theme.spacing.xs,
    2: theme.spacing.sm,
    3: theme.spacing.md,
    5: theme.spacing.lg,
    8: theme.spacing.xl,
    13: theme.spacing.xxl
  };
  
  return gapMapping[gap || 3];
};

const ContentContainer = styled.div<{
  align: 'left' | 'center' | 'right';
  fullWidth: boolean;
  columns: number;
  columnGap: number;
}>`
  width: 100%;
  display: ${props => props.columns > 1 ? 'grid' : 'block'};
  
  /* Apply grid layout if using columns */
  ${props => props.columns > 1 ? `
    grid-template-columns: repeat(
      ${props.columns}, 
      ${getColumnWidth(props.columns, props.fullWidth)}
    );
    grid-gap: ${props.columnGap}px;
    
    /* Responsive adjustment to ensure proper display on small screens */
    @media (max-width: ${theme.breakpoints.values.md}px) {
      grid-template-columns: 1fr;
    }
  ` : ''}
  
  /* Apply alignment based on props */
  text-align: ${props => props.align};
  
  /* Apply golden ratio constraints for non-fullWidth content */
  ${props => !props.fullWidth && props.columns === 1 ? `
    max-width: ${100 * PHI_INVERSE}%;
    margin: 0 ${props.align === 'center' ? 'auto' : 
              props.align === 'right' ? '0 0 auto' : '0 auto 0'};
  ` : ''}
  
  /* Apply vertical rhythm using Fibonacci spacing */
  > * + * {
    margin-top: ${theme.spacing.lg}px;
  }
  
  /* Cancel top margin for grid items */
  ${props => props.columns > 1 ? `
    > * { 
      margin-top: 0;
    }
  ` : ''}
`;

/**
 * SectionContent component that follows sacred geometry principles
 * 
 * This component provides a consistent content layout with proper spacing
 * based on golden ratio and Fibonacci sequence values.
 */
const SectionContent = React.forwardRef<HTMLDivElement, SectionContentProps>(
  ({
    children,
    align = 'left',
    fullWidth = false,
    style,
    className,
    columns = 1,
    columnGap = 3,
  }, ref) => {
    return (
      <ContentContainer
        align={align}
        fullWidth={fullWidth}
        columns={columns}
        columnGap={getColumnGap(columnGap)}
        style={style}
        className={className}
        ref={ref}
      >
        {children}
      </ContentContainer>
    );
  }
);

SectionContent.displayName = 'SectionContent';

export default SectionContent; 







