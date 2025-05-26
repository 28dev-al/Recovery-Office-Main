/**
 * Awards Components Exports
 * 
 * This file exports all award-related components and their associated types.
 * These components are used to display awards, certifications, and recognitions
 * throughout the Recovery Office website.
 */

import AwardBadge from './AwardBadge';
import AwardsShowcase from './AwardsShowcase';
import AwardsSection from './AwardsSection';

// Export types
export type { 
  AwardBadgeProps,
  AwardBadgeShape,
  AwardBadgeVariant,
  AwardBadgeSize 
} from './AwardBadge';

export type {
  Award,
  AwardsDisplayMode,
  AwardsLayout,
  AwardsShowcaseProps
} from './AwardsShowcase';

// Export components
export { 
  AwardBadge,
  AwardsShowcase,
  AwardsSection
};

// Default export
export default {
  AwardBadge,
  AwardsShowcase,
  AwardsSection
}; 











