/**
 * Section Component Re-export
 * 
 * This file re-exports the Section components from the design system
 * to maintain backward compatibility with existing imports.
 */

// Import and re-export components
import { 
  Section, 
  SectionTitle, 
  SectionContent 
} from '../../design-system/components/layout/Section';

export { 
  Section, 
  SectionTitle, 
  SectionContent 
};

// Export type definitions
export type { SectionProps } from '../../design-system/components/layout/Section';

// Export SectionHeading as alias for SectionTitle for backward compatibility
export const SectionHeading = SectionTitle; 