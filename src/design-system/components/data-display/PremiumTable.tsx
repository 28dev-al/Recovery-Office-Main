/**
 * PremiumTable Component
 * 
 * A table component for displaying financial data with premium styling
 * and functionality including sorting, filtering, and pagination.
 * 
 * Follows sacred geometry principles for spacing and proportions.
 */

import * as React from 'react';
import { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { Box } from '../layout';
import { Text } from '../typography/Text';
import { PHI_INVERSE } from '../../../constants/sacred-geometry';

// Column definition for the table
export interface PremiumTableColumn<T> {
  /**
   * Unique identifier for the column
   */
  id: string;
  
  /**
   * Header text to display
   */
  header: React.ReactNode;
  
  /**
   * Optional header tooltip/helper text
   */
  headerTooltip?: string;
  
  /**
   * Function to render the cell content
   */
  cell: (row: T, index: number) => React.ReactNode;
  
  /**
   * Function to get the raw value for sorting/filtering
   */
  accessor?: (row: T) => string | number | boolean | Date | null | undefined;
  
  /**
   * Whether this column is sortable
   * @default false
   */
  sortable?: boolean;
  
  /**
   * Whether this column is filterable
   * @default false
   */
  filterable?: boolean;
  
  /**
   * Width of the column (in pixels or CSS units)
   */
  width?: string | number;
  
  /**
   * Text alignment for the column
   * @default 'left'
   */
  align?: 'left' | 'center' | 'right';
  
  /**
   * Whether to highlight this column (useful for totals/important data)
   * @default false
   */
  highlight?: boolean;
}

// Props for the table component
export interface PremiumTableProps<T> {
  /**
   * Array of data objects to display
   */
  data: T[];
  
  /**
   * Column definitions
   */
  columns: PremiumTableColumn<T>[];
  
  /**
   * Optional key getter for row identification
   * @default (row, index) => index
   */
  getRowKey?: (row: T, index: number) => string | number;
  
  /**
   * Whether to enable sorting
   * @default true
   */
  sortable?: boolean;
  
  /**
   * Initial sort configuration
   */
  initialSort?: {
    columnId: string;
    direction: 'asc' | 'desc';
  };
  
  /**
   * Whether to enable pagination
   * @default true
   */
  paginated?: boolean;
  
  /**
   * Number of rows per page
   * @default 10
   */
  rowsPerPage?: number;
  
  /**
   * Whether to show a loading state
   * @default false
   */
  loading?: boolean;
  
  /**
   * Component to display when there's no data
   */
  emptyStateComponent?: React.ReactNode;
  
  /**
   * Whether to enable row selection
   * @default false
   */
  selectable?: boolean;
  
  /**
   * Callback when row selection changes
   */
  onSelectionChange?: (selectedRows: T[]) => void;
  
  /**
   * Whether to enable row hover effects
   * @default true
   */
  rowHover?: boolean;
  
  /**
   * Whether to show alternating row colors
   * @default true
   */
  striped?: boolean;
  
  /**
   * Whether the table has a border
   * @default true
   */
  bordered?: boolean;
  
  /**
   * Visual variant of the table
   * @default 'default'
   */
  variant?: 'default' | 'compact' | 'comfortable';
  
  /**
   * Whether to enable sticky header
   * @default false
   */
  stickyHeader?: boolean;
  
  /**
   * Maximum height for the table with scrolling
   */
  maxHeight?: number | string;
  
  /**
   * Additional CSS class name
   */
  className?: string;
  
  /**
   * Data attribute for testing
   */
  'data-testid'?: string;
}

// Table container with sacred geometry proportions
const TableContainer = styled.div<{
  $maxHeight?: number | string;
  $variant: 'default' | 'compact' | 'comfortable';
  $bordered: boolean;
}>`
  width: 100%;
  overflow: auto;
  position: relative;
  
  ${props => props.$maxHeight && `
    max-height: ${typeof props.$maxHeight === 'number' ? `${props.$maxHeight}px` : props.$maxHeight};
  `}
  
  ${props => props.$bordered && `
    border: 1px solid ${props.theme.colors.background[300]};
    border-radius: ${props.theme.radius.md}px;
  `}
`;

// Premium styled table
const StyledTable = styled.table<{
  $variant: 'default' | 'compact' | 'comfortable';
  $striped: boolean;
  $bordered: boolean;
}>`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  font-family: ${props => props.theme.typography.fontFamily.body};
  
  /* Variant-specific styles */
  ${props => {
    switch (props.$variant) {
      case 'compact':
        return `
          font-size: ${props.theme.typography.fontSize.sm}px;
        `;
      case 'comfortable':
        return `
          font-size: ${props.theme.typography.fontSize.md}px;
        `;
      case 'default':
      default:
        return `
          font-size: ${props.theme.typography.fontSize.base}px;
        `;
    }
  }}
  
  /* Border styles */
  ${props => props.$bordered && `
    border-radius: ${props.theme.radius.md}px;
    overflow: hidden;
  `}
`;

// Table header
const TableHead = styled.thead<{
  $variant: 'default' | 'compact' | 'comfortable';
  $sticky: boolean;
}>`
  background-color: ${props => props.theme.colors.background[100]};
  
  /* Sticky header */
  ${props => props.$sticky && `
    position: sticky;
    top: 0;
    z-index: 1;
  `}
`;

// Table header cell
const TableHeaderCell = styled.th<{
  $align: 'left' | 'center' | 'right';
  $sortable: boolean;
  $sorted: boolean;
  $sortDirection?: 'asc' | 'desc';
  $width?: string | number;
  $variant: 'default' | 'compact' | 'comfortable';
}>`
  padding: ${props => {
    switch (props.$variant) {
      case 'compact':
        return `${props.theme.spacing.xs}px ${props.theme.spacing.sm}px`;
      case 'comfortable':
        return `${props.theme.spacing.md}px ${props.theme.spacing.lg}px`;
      case 'default':
      default:
        return `${props.theme.spacing.sm}px ${props.theme.spacing.md}px`;
    }
  }};
  text-align: ${props => props.$align};
  font-weight: ${props => props.theme.typography.fontWeight.semiBold};
  color: ${props => props.theme.colors.text.primary};
  border-bottom: 1px solid ${props => props.theme.colors.background[300]};
  white-space: nowrap;
  
  ${props => props.$width && `
    width: ${typeof props.$width === 'number' ? `${props.$width}px` : props.$width};
  `}
  
  /* Sortable header styles */
  ${props => props.$sortable && `
    cursor: pointer;
    user-select: none;
    position: relative;
    
    &:hover {
      background-color: ${props.theme.colors.background[200]};
    }
    
    &::after {
      content: '';
      display: inline-block;
      margin-left: ${props.theme.spacing.xxs}px;
      width: 0;
      height: 0;
      
      /* Sort direction indicator */
      ${!props.$sorted && `
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        border-bottom: 4px solid ${props.theme.colors.text.tertiary};
        opacity: 0.3;
      `}
      
      ${props.$sorted && props.$sortDirection === 'asc' && `
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        border-bottom: 4px solid ${props.theme.colors.primary[500]};
      `}
      
      ${props.$sorted && props.$sortDirection === 'desc' && `
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        border-top: 4px solid ${props.theme.colors.primary[500]};
      `}
    }
  `}
`;

// Table body
const TableBody = styled.tbody`
  background-color: ${props => props.theme.colors.white};
`;

// Table row
const TableRow = styled.tr<{
  $striped: boolean;
  $index: number;
  $rowHover: boolean;
  $selected: boolean;
  $variant: 'default' | 'compact' | 'comfortable';
}>`
  ${props => props.$striped && props.$index % 2 === 1 && `
    background-color: ${props.theme.colors.background[50]};
  `}
  
  ${props => props.$selected && `
    background-color: ${props.theme.colors.primary[50]};
  `}
  
  ${props => props.$rowHover && `
    transition: background-color 0.15s ease-in-out;
    
    &:hover {
      background-color: ${props.theme.colors.background[100]};
    }
  `}
`;

// Table cell
const TableCell = styled.td<{
  $align: 'left' | 'center' | 'right';
  $highlight: boolean;
  $variant: 'default' | 'compact' | 'comfortable';
}>`
  padding: ${props => {
    switch (props.$variant) {
      case 'compact':
        return `${props.theme.spacing.xs}px ${props.theme.spacing.sm}px`;
      case 'comfortable':
        return `${props.theme.spacing.md}px ${props.theme.spacing.lg}px`;
      case 'default':
      default:
        return `${props.theme.spacing.sm}px ${props.theme.spacing.md}px`;
    }
  }};
  text-align: ${props => props.$align};
  color: ${props => props.$highlight ? props.theme.colors.primary[700] : props.theme.colors.text.primary};
  font-weight: ${props => props.$highlight ? props.theme.typography.fontWeight.medium : 'inherit'};
  border-bottom: 1px solid ${props => props.theme.colors.background[200]};
`;

// Loading overlay
const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${props => props.theme.colors.white + '80'}; /* 80 = 50% opacity in hex */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
`;

// Empty state container
const EmptyState = styled.div`
  padding: ${props => props.theme.spacing.lg}px;
  text-align: center;
  color: ${props => props.theme.colors.text.secondary};
`;

// Pagination container
const PaginationContainer = styled.div<{
  $variant: 'default' | 'compact' | 'comfortable';
}>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: ${props => props.theme.spacing.sm}px;
  padding: ${props => {
    switch (props.$variant) {
      case 'compact':
        return `${props.theme.spacing.xs}px ${props.theme.spacing.sm}px`;
      case 'comfortable':
        return `${props.theme.spacing.md}px ${props.theme.spacing.lg}px`;
      case 'default':
      default:
        return `${props.theme.spacing.sm}px ${props.theme.spacing.md}px`;
    }
  }};
`;

// Page info text
const PageInfo = styled.div`
  font-size: ${props => props.theme.typography.fontSize.sm}px;
  color: ${props => props.theme.colors.text.secondary};
`;

// Pagination control button
const PaginationButton = styled.button<{
  $disabled: boolean;
}>`
  width: ${props => props.theme.spacing.lg * 1.5}px;
  height: ${props => props.theme.spacing.lg * 1.5}px;
  background-color: ${props => props.$disabled ? 'transparent' : props.theme.colors.background[100]};
  border: 1px solid ${props => props.$disabled ? props.theme.colors.background[200] : props.theme.colors.background[300]};
  border-radius: ${props => props.theme.radius.sm}px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${props => props.$disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.$disabled ? 0.5 : 1};
  
  &:hover:not(:disabled) {
    background-color: ${props => props.theme.colors.background[200]};
  }
`;

// Default empty state component
const DefaultEmptyState = () => (
  <EmptyState>
    <Text variant="body2" color="secondary">No data to display</Text>
  </EmptyState>
);

// Loading spinner animation
const LoadingSpinner = styled.div`
  width: ${props => props.theme.spacing.xl}px;
  height: ${props => props.theme.spacing.xl}px;
  border: 2px solid ${props => props.theme.colors.background[300]};
  border-top: 2px solid ${props => props.theme.colors.primary[500]};
  border-radius: 50%;
  animation: spin 1s cubic-bezier(${PHI_INVERSE}, 0, ${1 - PHI_INVERSE}, 1) infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

/**
 * Premium Table Component
 */
export function PremiumTable<T>({
  data,
  columns,
  getRowKey = (_, index) => index,
  sortable = true,
  initialSort,
  paginated = true,
  rowsPerPage = 10,
  loading = false,
  emptyStateComponent = <DefaultEmptyState />,
  selectable = false,
  onSelectionChange,
  rowHover = true,
  striped = true,
  bordered = true,
  variant = 'default',
  stickyHeader = false,
  maxHeight,
  className,
  'data-testid': testId = 'premium-table',
}: PremiumTableProps<T>) {
  // State for selected rows
  const [selectedRows, setSelectedRows] = useState<T[]>([]);
  
  // State for sorting
  const [sortConfig, setSortConfig] = useState<{
    columnId: string;
    direction: 'asc' | 'desc';
  } | null>(initialSort || null);
  
  // State for pagination
  const [currentPage, setCurrentPage] = useState(0);
  
  // Handle row selection
  const handleSelectRow = (row: T) => {
    if (!selectable) return;
    
    const isSelected = selectedRows.some((selectedRow, index) => 
      getRowKey(selectedRow, index) === getRowKey(row, data.indexOf(row))
    );
    
    let updatedSelection;
    if (isSelected) {
      updatedSelection = selectedRows.filter((selectedRow, index) => 
        getRowKey(selectedRow, index) !== getRowKey(row, data.indexOf(row))
      );
    } else {
      updatedSelection = [...selectedRows, row];
    }
    
    setSelectedRows(updatedSelection);
    
    if (onSelectionChange) {
      onSelectionChange(updatedSelection);
    }
  };
  
  // Handle column sort
  const handleSort = (columnId: string) => {
    if (!sortable) return;
    
    let direction: 'asc' | 'desc' = 'asc';
    
    if (sortConfig && sortConfig.columnId === columnId) {
      direction = sortConfig.direction === 'asc' ? 'desc' : 'asc';
    }
    
    setSortConfig({ columnId, direction });
  };
  
  // Sorted and filtered data
  const processedData = useMemo(() => {
    const result = [...data];
    
    // Apply sorting
    if (sortable && sortConfig) {
      const column = columns.find(col => col.id === sortConfig.columnId);
      
      if (column && column.accessor) {
        result.sort((a, b) => {
          const valueA = column.accessor!(a);
          const valueB = column.accessor!(b);
          
          // Handle null or undefined values
          if (valueA == null && valueB == null) return 0;
          if (valueA == null) return sortConfig.direction === 'asc' ? -1 : 1;
          if (valueB == null) return sortConfig.direction === 'asc' ? 1 : -1;
          
          // Handle different value types
          if (typeof valueA === 'string' && typeof valueB === 'string') {
            return sortConfig.direction === 'asc' 
              ? valueA.localeCompare(valueB) 
              : valueB.localeCompare(valueA);
          }
          
          if (valueA < valueB) return sortConfig.direction === 'asc' ? -1 : 1;
          if (valueA > valueB) return sortConfig.direction === 'asc' ? 1 : -1;
          return 0;
        });
      }
    }
    
    return result;
  }, [data, columns, sortable, sortConfig]);
  
  // Paginated data
  const paginatedData = useMemo(() => {
    if (!paginated) return processedData;
    
    const startIndex = currentPage * rowsPerPage;
    return processedData.slice(startIndex, startIndex + rowsPerPage);
  }, [processedData, paginated, currentPage, rowsPerPage]);
  
  // Calculate total pages
  const totalPages = Math.ceil(processedData.length / rowsPerPage);
  
  // Reset to first page when data changes
  useEffect(() => {
    setCurrentPage(0);
  }, [data]);
  
  // Check if a row is selected
  const isRowSelected = (row: T, index: number) => {
    return selectedRows.some(
      (selectedRow, selectedIndex) => 
        getRowKey(selectedRow, selectedIndex) === getRowKey(row, index)
    );
  };
  
  // Pagination controls
  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  return (
    <div className={className} data-testid={testId}>
      <TableContainer 
        $maxHeight={maxHeight} 
        $variant={variant} 
        $bordered={bordered}
      >
        {loading && (
          <LoadingOverlay>
            <LoadingSpinner />
          </LoadingOverlay>
        )}
        
        <StyledTable 
          $variant={variant} 
          $striped={striped} 
          $bordered={bordered}
        >
          <TableHead $variant={variant} $sticky={stickyHeader}>
            <tr>
              {columns.map(column => (
                <TableHeaderCell
                  key={column.id}
                  $align={column.align || 'left'}
                  $sortable={sortable && (column.sortable !== false)}
                  $sorted={!!(sortConfig && sortConfig.columnId === column.id)}
                  $sortDirection={sortConfig && sortConfig.columnId === column.id ? sortConfig.direction : undefined}
                  $width={column.width}
                  $variant={variant}
                  onClick={() => column.sortable !== false && handleSort(column.id)}
                  title={column.headerTooltip}
                >
                  {column.header}
                </TableHeaderCell>
              ))}
            </tr>
          </TableHead>
          
          <TableBody>
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length}>
                  {emptyStateComponent}
                </td>
              </tr>
            ) : (
              paginatedData.map((row, index) => (
                <TableRow
                  key={getRowKey(row, index)}
                  $striped={striped}
                  $index={index}
                  $rowHover={rowHover}
                  $selected={isRowSelected(row, index)}
                  $variant={variant}
                  onClick={() => selectable && handleSelectRow(row)}
                  style={{ cursor: selectable ? 'pointer' : 'default' }}
                >
                  {columns.map(column => (
                    <TableCell
                      key={column.id}
                      $align={column.align || 'left'}
                      $highlight={!!column.highlight}
                      $variant={variant}
                    >
                      {column.cell(row, index)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </StyledTable>
      </TableContainer>
      
      {paginated && processedData.length > 0 && (
        <PaginationContainer $variant={variant}>
          <PageInfo>
            Showing {currentPage * rowsPerPage + 1} to {Math.min((currentPage + 1) * rowsPerPage, processedData.length)} of {processedData.length} entries
          </PageInfo>
          
          <div>
            <PaginationButton 
              $disabled={currentPage === 0} 
              onClick={handlePrevPage}
              disabled={currentPage === 0}
              aria-label="Previous page"
            >
              ←
            </PaginationButton>
            <Box as="span" ml={2} mr={2}>
              Page {currentPage + 1} of {Math.max(1, totalPages)}
            </Box>
            <PaginationButton 
              $disabled={currentPage >= totalPages - 1} 
              onClick={handleNextPage}
              disabled={currentPage >= totalPages - 1}
              aria-label="Next page"
            >
              →
            </PaginationButton>
          </div>
        </PaginationContainer>
      )}
    </div>
  );
} 