import { debugLog } from './removeConsole';

/**
 * Smooth scroll to a section by ID
 */
export const scrollToSection = (sectionId: string) => {
  debugLog('[ScrollUtils] Scrolling to section:', sectionId);
  
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
    debugLog('[ScrollUtils] Successfully scrolled to:', sectionId);
  } else {
    debugLog('[ScrollUtils] Section not found:', sectionId);
  }
};

/**
 * Scroll to top of page
 */
export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

/**
 * Check if element is in viewport
 */
export const isElementInViewport = (element: Element) => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

/**
 * Add IDs to sections for smooth scrolling
 */
export const addSectionIds = () => {
  // Add services section ID if it doesn't exist
  const servicesSection = document.querySelector('[data-section="services"]');
  if (servicesSection && !servicesSection.id) {
    servicesSection.id = 'services-section';
  }
  
  // Add team section ID if it doesn't exist
  const teamSection = document.querySelector('[data-section="team"]');
  if (teamSection && !teamSection.id) {
    teamSection.id = 'team-section';
  }
  
  // Add about section ID if it doesn't exist
  const aboutSection = document.querySelector('[data-section="about"]');
  if (aboutSection && !aboutSection.id) {
    aboutSection.id = 'about-section';
  }
}; 