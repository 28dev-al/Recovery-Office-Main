/**
 * Feature Section Type Definitions
 * 
 * This file defines TypeScript interfaces for feature section components
 * to ensure consistency and type safety throughout the application.
 */

import * as React from 'react';
import { BoxProps } from './styled.types';
import { BotanicalDecoration, BotanicalElementType } from './botanical.types';
import { SectionProps } from '../components/layout/Section';

/**
 * Button configuration for feature sections
 */
export interface FeatureButton {
  /** Button label text */
  label: string;
  
  /** Button link URL */
  href?: string;
  
  /** Button variant */
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost';
  
  /** Button click handler (alternative to href) */
  onClick?: () => void;
  
  /** Optional icon to display alongside the button text */
  icon?: React.ReactNode;
  
  /** Position of the icon (left or right) */
  iconPosition?: 'left' | 'right';
}

/**
 * Background configuration for hero and feature sections
 */
export interface FeatureBackground {
  /** CSS color or gradient */
  color?: string;
  
  /** Background image URL */
  image?: string;
  
  /** Image overlay color (with opacity) */
  overlay?: string;
  
  /** Background position */
  position?: string;
  
  /** Background size */
  size?: string;
}

/* ===== Hero Component Types ===== */

/**
 * Props for the Hero component
 */
export interface HeroProps extends BoxProps {
  /** Main heading text */
  heading: string;
  
  /** Optional subheading text */
  subheading?: string;
  
  /** Hero background color or image */
  background?: FeatureBackground;
  
  /** Minimum height of the hero section (in vh units or pixels) */
  minHeight?: string | number;
  
  /** Content alignment */
  align?: 'left' | 'center' | 'right';
  
  /** Whether to use a split layout (content on left/right with golden ratio) */
  split?: boolean;
  
  /** Content for the secondary column when using split layout */
  secondaryContent?: React.ReactNode;
  
  /** Whether to reverse the split layout (content on right instead of left) */
  reverseSplit?: boolean;
  
  /** Call-to-action buttons */
  buttons?: FeatureButton[];
  
  /** Whether to include animations */
  animated?: boolean;
  
  /** Botanical elements configuration */
  botanical?: BotanicalDecoration;
  
  /** Additional custom content to display below the heading and subheading */
  children?: React.ReactNode;
  
  /** Optional inline styles */
  style?: React.CSSProperties;
}

/* ===== Contact Component Types ===== */

/**
 * Contact option for the Contact component
 */
export interface ContactOption {
  /** Icon for the contact option */
  icon: React.ReactNode;
  
  /** Label for the contact option */
  label: string;
  
  /** Value (e.g., email address, phone number) */
  value: string;
  
  /** URL for clickable options (e.g., mailto:, tel:) */
  url?: string;
}

/**
 * Form field configuration for the Contact component
 */
export interface ContactFormField {
  /** Field name/identifier */
  name: string;
  
  /** Field label */
  label: string;
  
  /** Type of field */
  type: 'text' | 'email' | 'tel' | 'textarea';
  
  /** Whether the field is required */
  required?: boolean;
  
  /** Placeholder text */
  placeholder?: string;
  
  /** Help text displayed below the field */
  helpText?: string;
}

/**
 * Props for the Contact component
 */
export interface ContactProps extends BoxProps {
  /** Section title */
  title: string;
  
  /** Optional section subtitle */
  subtitle?: string;
  
  /** Form fields configuration */
  formFields?: ContactFormField[];
  
  /** Contact information options */
  contactOptions?: ContactOption[];
  
  /** Layout style for the form and contact information */
  layout?: 'split' | 'stacked';
  
  /** Form submission URL */
  formAction?: string;
  
  /** Submit button text */
  submitText?: string;
  
  /** Background color or gradient */
  backgroundColor?: string;
  
  /** Whether to add animation to section elements */
  animated?: boolean;
  
  /** Botanical decoration configuration */
  botanical?: BotanicalDecoration;
  
  /** Custom form submission handler */
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  
  /** Optional additional class name */
  className?: string;
}

/* ===== Team Component Types ===== */

/**
 * Team member configuration for Team component
 */
export interface TeamMember {
  /** Unique identifier for the team member */
  id: string;
  
  /** Team member's name */
  name: string;
  
  /** Team member's role or position */
  role: string;
  
  /** Team member's photo URL */
  photoUrl: string;
  
  /** Team member's bio/description */
  bio?: string;
  
  /** Optional contact/social links */
  links?: {
    /** Link type (e.g., linkedin, email, website) */
    type: 'linkedin' | 'email' | 'website' | 'twitter' | 'instagram';
    
    /** URL or email address */
    url: string;
    
    /** Optional label */
    label?: string;
  }[];
  
  /** Optional accent color for the team member card */
  accentColor?: string;
  
  /** Optional specialties or areas of expertise */
  specialties?: string[];
  
  /** Optional certifications or credentials */
  credentials?: string[];
}

/**
 * Call-to-action configuration for feature sections
 */
export interface FeatureCTA {
  /** Button text */
  label: string;
  
  /** Button URL */
  url: string;
  
  /** Button variant */
  variant?: 'primary' | 'secondary' | 'accent' | 'outline';
}

/**
 * Props for the Team component
 */
export interface TeamProps extends BoxProps {
  /** Section title */
  title: string;
  
  /** Optional section subtitle */
  subtitle?: string;
  
  /** Array of team members to display */
  members: TeamMember[];
  
  /** Style of team display */
  displayStyle?: 'grid' | 'list' | 'featured';
  
  /** Number of columns for grid layout (defaults to Fibonacci-based responsive grid) */
  columns?: 2 | 3 | 4;
  
  /** Background color or gradient */
  backgroundColor?: string;
  
  /** Whether to show detailed bio information */
  showDetailedBio?: boolean;
  
  /** Whether to add animation to team member cards */
  animated?: boolean;
  
  /** Botanical decoration configuration */
  botanical?: BotanicalDecoration;
  
  /** Call-to-action button */
  cta?: FeatureCTA;
  
  /** Optional additional class name */
  className?: string;
  
  /** Optional inline styles */
  style?: React.CSSProperties;
}

/* ===== Services Component Types ===== */

/**
 * Service item configuration for Services component
 */
export interface ServiceItem {
  /** Unique identifier for the service */
  id: string;
  
  /** Title of the service */
  title: string;
  
  /** Description of the service */
  description: string;
  
  /** Optional icon or image for the service */
  icon?: React.ReactNode;
  
  /** URL for the service detail page */
  url?: string;
  
  /** Optional additional content */
  content?: React.ReactNode;
  
  /** Optional accent color for the service card */
  accentColor?: string;
  
  /** Optional botanical decoration type */
  botanicalAccent?: BotanicalElementType | 'none';
}

/**
 * Props for the Services component
 */
export interface ServicesProps extends BoxProps {
  /** Section title */
  title: string;
  
  /** Optional section subtitle */
  subtitle?: string;
  
  /** Array of service items to display */
  services: ServiceItem[];
  
  /** Style of service display */
  displayStyle?: 'grid' | 'featured' | 'alternating';
  
  /** Number of columns in grid layout (defaults to Fibonacci-based responsive grid) */
  columns?: 1 | 2 | 3 | 4;
  
  /** Background color or gradient */
  backgroundColor?: string;
  
  /** Whether to add animation to service items */
  animated?: boolean;
  
  /** Botanical decoration configuration */
  botanical?: BotanicalDecoration;
  
  /** Call-to-action button for the services section */
  cta?: FeatureCTA;
  
  /** Optional additional class name */
  className?: string;
  
  /** Optional inline styles */
  style?: React.CSSProperties;
}

/* ===== Testimonials Component Types ===== */

/**
 * Testimonial item configuration for Testimonials component
 */
export interface TestimonialItem {
  /** Unique identifier for the testimonial */
  id: string;
  
  /** Testimonial content/quote */
  content: string;
  
  /** Author/client name */
  author: string;
  
  /** Optional author role or description */
  authorRole?: string;
  
  /** Optional rating (1-5) */
  rating?: number;
  
  /** Optional author image URL */
  authorImage?: string;
  
  /** Optional accent color for the testimonial card */
  accentColor?: string;
}

/**
 * Props for the Testimonials component
 */
export interface TestimonialsProps extends BoxProps {
  /** Section title */
  title: string;
  
  /** Optional section subtitle */
  subtitle?: string;
  
  /** Array of testimonial items to display */
  testimonials: TestimonialItem[];
  
  /** Style of testimonial display */
  displayStyle?: 'grid' | 'carousel' | 'featured';
  
  /** Background color or gradient */
  backgroundColor?: string;
  
  /** Whether to add animation to testimonial items */
  animated?: boolean;
  
  /** Botanical decoration configuration */
  botanical?: BotanicalDecoration;
  
  /** Call-to-action button */
  cta?: FeatureCTA;
  
  /** Optional additional class name */
  className?: string;
  
  /** Optional inline styles */
  style?: React.CSSProperties;
} 