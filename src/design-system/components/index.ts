/**
 * Design System Components
 * 
 * This file exports all components from the design system, providing a single
 * entry point for importing any component needed for the application.
 */

// Re-export all components by category
export * from './layout';
export * from './typography';
export * from './button';
export * from './data-display';
export * from './navigation';
export * from './feedback';
export * from './form';
export * from './utility';

// Export specific premium components
export { default as PremiumButton } from './button/PremiumButton';
export { default as ServiceCard } from './data-display/ServiceCard';
export { default as TestimonialCard } from './data-display/TestimonialCard';
export { default as TeamMemberCard } from './data-display/TeamMemberCard';
export { default as ResourceCard } from './data-display/ResourceCard';

// Export types from premium components
export type { PremiumButtonProps } from './button/PremiumButton';
export type { ServiceCardProps } from './data-display/ServiceCard';
export type { TestimonialCardProps } from './data-display/TestimonialCard';
export type { TeamMemberCardProps, SocialLink, SocialPlatform } from './data-display/TeamMemberCard';
export type { ResourceCardProps } from './data-display/ResourceCard'; 