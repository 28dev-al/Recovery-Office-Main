/**
 * Feature Sections Components Export
 * 
 * This file exports all feature section components and their types from the design system.
 */

// Export Hero component and types
import Hero from './Hero';
export { Hero };
export type { HeroProps } from '../../types/feature-sections.types';

// Export Services component and types
import Services from './Services';
export { Services };
export type { ServicesProps, ServiceItem } from '../../types/feature-sections.types';

// Export Team component and types
import Team from './Team';
export { Team };
export type { TeamProps, TeamMember } from '../../types/feature-sections.types';

// Export Testimonials component and types
import Testimonials from './Testimonials';
export { Testimonials as TestimonialsSection };
export type { TestimonialsProps, TestimonialItem } from '../../types/feature-sections.types';

// Export Contact component and types
import Contact from './Contact';
export { Contact };
export type { ContactProps, ContactOption, ContactFormField } from '../../types/feature-sections.types';

// Export common types
export type { FeatureButton, FeatureBackground, FeatureCTA } from '../../types/feature-sections.types';





