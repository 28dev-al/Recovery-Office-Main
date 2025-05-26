/**
 * Premium Financial Design System
 * 
 * This file exports all premium components and theming for financial services websites.
 * Import from this file to ensure a consistent premium financial look and feel.
 */

// Export premium theme and ThemeProvider
export { premiumTheme } from './theme/theme.premium';
export { ThemeProvider } from './theme';

// Export premium components
export { PremiumNavBar } from './components/navigation';
export { PremiumFooter } from './components/footer';
export { PremiumLayout, PageSection } from './components/layout';

// Export types
export type { 
  PremiumNavBarItem, 
  PremiumNavBarCTA, 
  PremiumNavBarProps 
} from './components/navigation/PremiumNavBar';

export type {
  PremiumFooterProps,
  PremiumSocialLinkProps,
  FooterColumnProps
} from './components/footer/PremiumFooter';

export type {
  PremiumLayoutProps
} from './components/layout/PremiumLayout';

export type {
  PageSectionProps,
  PageSectionSize
} from './components/layout/PageSection';

// Re-export common components that work well with the premium theme
export { 
  Button,
  IconButton
} from './components/button';

export {
  Box,
  Container,
  Flex,
  Grid,
  Stack,
  Divider
} from './components/layout';

export {
  Text,
  Heading,
  Paragraph
} from './components/typography';

// For convenience, also export the underlying theme tokens
export { PREMIUM_COLORS, PREMIUM_TYPOGRAPHY, PREMIUM_SPACING } from './tokens'; 