/**
 * Asset Map
 * 
 * This file provides a centralized repository of asset references
 * for the application. It allows easy swapping of assets across the site
 * and ensures consistent image usage.
 */

// Base path to assets directory
const ASSET_BASE_PATH = '/assets';

// Financial imagery paths
export const PREMIUM_IMAGES = {
  // Hero section images
  hero: {
    default: `${ASSET_BASE_PATH}/images/hero/financial-office.jpg`,
    secondary: `${ASSET_BASE_PATH}/images/hero/financial-consultation.jpg`,
    tertiary: `${ASSET_BASE_PATH}/images/hero/financial-papers.jpg`
  },
  
  // Team/staff imagery
  team: {
    advisor1: `${ASSET_BASE_PATH}/images/team/financial-advisor-1.jpg`,
    advisor2: `${ASSET_BASE_PATH}/images/team/financial-advisor-2.jpg`,
    advisor3: `${ASSET_BASE_PATH}/images/team/financial-advisor-3.jpg`,
    advisor4: `${ASSET_BASE_PATH}/images/team/financial-advisor-4.jpg`,
    director: `${ASSET_BASE_PATH}/images/team/financial-director.jpg`,
    support: `${ASSET_BASE_PATH}/images/team/support-staff.jpg`
  },
  
  // Service imagery
  services: {
    consultation: `${ASSET_BASE_PATH}/images/services/financial-consultation.jpg`,
    recovery: `${ASSET_BASE_PATH}/images/services/asset-recovery.jpg`,
    planning: `${ASSET_BASE_PATH}/images/services/financial-planning.jpg`,
    protection: `${ASSET_BASE_PATH}/images/services/wealth-protection.jpg`
  },
  
  // Testimonial imagery
  testimonials: {
    client1: `${ASSET_BASE_PATH}/images/testimonials/client-1.jpg`,
    client2: `${ASSET_BASE_PATH}/images/testimonials/client-2.jpg`,
    client3: `${ASSET_BASE_PATH}/images/testimonials/client-3.jpg`
  },
  
  // About page imagery
  about: {
    office: `${ASSET_BASE_PATH}/images/about/office-interior.jpg`,
    teamMeeting: `${ASSET_BASE_PATH}/images/about/team-meeting.jpg`,
    history: `${ASSET_BASE_PATH}/images/about/company-history.jpg`
  },
  
  // Contact page imagery
  contact: {
    office: `${ASSET_BASE_PATH}/images/contact/office-exterior.jpg`,
    map: `${ASSET_BASE_PATH}/images/contact/location-map.jpg`
  },
  
  // Award/recognition imagery
  awards: {
    financial: `${ASSET_BASE_PATH}/images/awards/financial-excellence.png`,
    service: `${ASSET_BASE_PATH}/images/awards/service-quality.png`,
    trust: `${ASSET_BASE_PATH}/images/awards/trusted-advisor.png`
  },
  
  // Placeholder/pattern images
  patterns: {
    geometric: `${ASSET_BASE_PATH}/images/patterns/geometric-pattern.svg`,
    grid: `${ASSET_BASE_PATH}/images/patterns/grid-pattern.svg`,
    dots: `${ASSET_BASE_PATH}/images/patterns/dot-pattern.svg`
  },
  
  // Background images
  backgrounds: {
    light: `${ASSET_BASE_PATH}/images/backgrounds/light-background.jpg`,
    dark: `${ASSET_BASE_PATH}/images/backgrounds/dark-background.jpg`,
    geometric: `${ASSET_BASE_PATH}/images/backgrounds/geometric-background.svg`,
    gradient: `${ASSET_BASE_PATH}/images/backgrounds/gradient-background.jpg`
  },
  
  // Icons
  icons: {
    logo: `https://images2.imgbox.com/35/e0/Cif1Ufej_o.png`, // Main Logo (white bg)
    favicon: `https://images2.imgbox.com/86/72/GE2VLjan_o.png`, // Primary Logo (dark bg)
    touchIcon: `https://thumbs2.imgbox.com/b4/12/cwxWZPzq_t.png` // Primary Logo (dark bg)
  }
};

// Default export
export default PREMIUM_IMAGES; 