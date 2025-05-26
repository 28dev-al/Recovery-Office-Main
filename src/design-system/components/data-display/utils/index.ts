/**
 * Data Display Utilities Index
 * 
 * Exports utilities for working with financial data display components.
 */

// Export basic data formatters
export {
  truncateText,
  createFibonacciGrid,
  goldenRatioImageDimensions,
  getColorIntensity,
  groupInFibonacciChunks,
  calculateIdealLineHeight
} from './dataFormatters';

// Export financial formatters with more specific naming
export {
  formatCurrency as formatFinancialCurrency,
  formatNumber as formatFinancialNumber,
  formatDate as formatFinancialDate,
  formatPercentage,
  formatRatio,
  formatDelta
} from './financialFormatters';

// Export format options type
export type { FormatOptions } from './financialFormatters';





