/**
 * Type definitions for feature section components
 * These types are used throughout the website for various feature sections
 * All follow sacred geometry principles in their layout and proportions
 */

/**
 * Service item type for Services component
 */
export interface ServiceItem {
  /** Unique identifier for the service */
  id: string;
  
  /** Display title of the service */
  title: string;
  
  /** Description of the service */
  description: string;
  
  /** Icon name to display (matches icon library) */
  icon: string;
  
  /** Path to the service detail page */
  url: string;
  
  /** Accent color for the service item */
  accentColor: string;
  
  /** Optional additional attributes */
  [key: string]: any;
}

/**
 * Testimonial item type for Testimonials component
 */
export interface TestimonialItem {
  /** Unique identifier for the testimonial */
  id: string;
  
  /** Testimonial text content */
  content: string;
  
  /** Author of the testimonial */
  author: string;
  
  /** Role or description of the author */
  authorRole?: string;
  
  /** Optional avatar image URL */
  avatar?: string;
  
  /** Rating (1-5) */
  rating: number;
  
  /** Accent color for the testimonial */
  accentColor?: string;
  
  /** Optional date of the testimonial */
  date?: string;
  
  /** Optional additional attributes */
  [key: string]: any;
}

/**
 * Team member type for Team component
 */
export interface TeamMember {
  /** Unique identifier for the team member */
  id: string;
  
  /** Full name of the team member */
  name: string;
  
  /** Role or position of the team member */
  role: string;
  
  /** URL to the team member's photo */
  photoUrl: string;
  
  /** Biographical information */
  bio: string;
  
  /** List of specialties or areas of expertise */
  specialties: string[];
  
  /** Accent color for styling */
  accentColor?: string;
  
  /** Professional credentials */
  credentials?: string[];
  
  /** Optional social media links */
  social?: {
    linkedin?: string;
    twitter?: string;
    email?: string;
    [key: string]: string | undefined;
  };
  
  /** Optional additional attributes */
  [key: string]: any;
}

/**
 * Props for the Hero component
 */
export interface HeroProps {
  /** Main heading text */
  heading: string;
  
  /** Subheading or supporting text */
  subheading?: string;
  
  /** Background configuration */
  background?: {
    /** Background image URL */
    image?: string;
    
    /** Background color */
    color?: string;
    
    /** Overlay color (with opacity) */
    overlay?: string;
  };
  
  /** Alignment of hero content */
  align?: 'left' | 'center' | 'right';
  
  /** Minimum height of hero section */
  minHeight?: string;
  
  /** Whether to animate the hero section */
  animated?: boolean;
  
  /** Botanical decoration configuration */
  botanical?: {
    /** Type of botanical element */
    type: 'flowerOfLife' | 'oliveBranch' | 'vesicaPiscis' | 'fibonacciSpiral';
    
    /** Position of botanical element */
    position: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'center';
    
    /** Opacity of botanical element */
    opacity: number;
    
    /** Whether to animate the botanical element */
    animated: boolean;
  };
  
  /** CTA buttons configuration */
  buttons?: Array<{
    /** Button text */
    label: string;
    
    /** Button variant */
    variant: 'primary' | 'secondary' | 'outline';
    
    /** Link destination */
    href: string;
  }>;
  
  /** Children to render inside the hero */
  children?: React.ReactNode;
}

/**
 * Props for the Services component
 */
export interface ServicesProps {
  /** Array of service items to display */
  services: ServiceItem[];
  
  /** Display style for services */
  displayStyle?: 'grid' | 'list' | 'carousel';
  
  /** Number of columns for grid layout */
  columns?: 1 | 2 | 3 | 4;
  
  /** Whether to animate the services */
  animated?: boolean;
  
  /** Whether to use botanical decorations */
  botanical?: boolean;
  
  /** Call to action configuration */
  cta?: {
    /** CTA button text */
    label: string;
    
    /** Link destination */
    url: string;
  };
}

/**
 * Props for the Testimonials component
 */
export interface TestimonialsProps {
  /** Array of testimonial items to display */
  testimonials: TestimonialItem[];
  
  /** Display style for testimonials */
  displayStyle?: 'grid' | 'list' | 'carousel';
  
  /** Whether to animate the testimonials */
  animated?: boolean;
  
  /** Whether to use botanical decorations */
  botanical?: boolean;
}

/**
 * Props for the Team component
 */
export interface TeamProps {
  /** Array of team members to display */
  members: TeamMember[];
  
  /** Display style for team members */
  displayStyle?: 'grid' | 'list';
  
  /** Number of columns for grid layout */
  columns?: 1 | 2 | 3 | 4;
  
  /** Whether to animate the team display */
  animated?: boolean;
  
  /** Whether to use botanical decorations */
  botanical?: boolean;
  
  /** Call to action configuration */
  cta?: {
    /** CTA button text */
    label: string;
    
    /** Link destination */
    url: string;
  };
}

/**
 * Props for the Contact component
 */
export interface ContactProps {
  /** Title for the contact section */
  title: string;
  
  /** Subtitle for the contact section */
  subtitle?: string;
  
  /** Text for the primary button */
  buttonText: string;
  
  /** Link for the primary button */
  buttonLink: string;
  
  /** Text for the secondary button */
  secondaryButtonText?: string;
  
  /** Link for the secondary button */
  secondaryButtonLink?: string;
  
  /** Whether to show contact information */
  showContactInfo?: boolean;
  
  /** Whether to animate the contact section */
  animated?: boolean;
  
  /** Botanical decoration configuration */
  botanical?: {
    /** Type of botanical element */
    type: string;
    
    /** Position of botanical element */
    position: string;
    
    /** Opacity of botanical element */
    opacity: number;
    
    /** Whether to animate the botanical element */
    animated: boolean;
  };
} 