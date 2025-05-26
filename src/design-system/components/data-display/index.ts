/**
 * Data Display Components
 * 
 * This file exports all data display components from a single entry point
 * to provide consistent imports throughout the application.
 * 
 * All of these components implement sacred geometry principles
 * for sizing, proportions, and visual harmony.
 */

export { default as Card } from './Card';
export { default as List } from './List';
export { default as Tag } from './Tag';
export { default as ServiceCard } from './ServiceCard';
export { default as TestimonialCard } from './TestimonialCard';
export { default as TeamMemberCard } from './TeamMemberCard';
export { default as ResourceCard } from './ResourceCard';

export * from './dataDisplayUtils';

// Export prop types
export type { CardProps } from './Card';
export type { ServiceCardProps } from './ServiceCard';
export type { TestimonialCardProps } from './TestimonialCard';
export type { TeamMemberCardProps, SocialLink, SocialPlatform } from './TeamMemberCard';
export type { ResourceCardProps } from './ResourceCard';

/**
 * Data Display Components Index
 * 
 * This file exports all data display components from a single entry point
 * to provide consistent imports throughout the application.
 * 
 * These components are designed for displaying financial and business data
 * following sacred geometry principles.
 */

export { PremiumTable } from './PremiumTable';
export type { PremiumTableProps, PremiumTableColumn } from './PremiumTable'; 





